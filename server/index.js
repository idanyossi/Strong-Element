import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const MONGODB_URI = process.env.MONGODB_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// Fail fast on missing secrets instead of silently falling back to guessable defaults.
function assertRequiredEnv() {
  const missing = [];
  if (!JWT_SECRET) missing.push('JWT_SECRET');
  if (!ADMIN_USERNAME) missing.push('ADMIN_USERNAME');
  if (!ADMIN_PASSWORD) missing.push('ADMIN_PASSWORD');
  if (!MONGODB_URI) missing.push('MONGODB_URI');
  if (missing.length) {
    throw new Error(`Missing required environment variable(s): ${missing.join(', ')}. See .env.example.`);
  }
}

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      // Listing/agent/article images are admin-supplied external URLs (S3, Unsplash, etc).
      'img-src': ["'self'", 'data:', 'https:'],
      // React renders JSX style props as inline style="" attributes.
      'style-src': ["'self'", "'unsafe-inline'"],
      'connect-src': ["'self'"],
    },
  },
  // Would otherwise require every externally-hosted image to send a CORP header, breaking them.
  crossOriginEmbedderPolicy: false,
}));

// No legitimate cross-origin caller today (the frontend calls this API same-origin).
// Set CORS_ORIGIN in .env only if a separate trusted frontend needs access.
app.use(cors(CORS_ORIGIN ? { origin: CORS_ORIGIN } : { origin: false }));
app.use(express.json());

// ── MongoDB connection ────────────────────────────────────────────────────────
let db;

async function connectDB() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db('strong-element');
  console.log('Connected to MongoDB');
}

// Strip MongoDB _id from documents
const clean = ({ _id, ...doc }) => doc;

function logAndFail(res, context, err) {
  console.error(`[${context}]`, err);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
}

// ── Validation schemas ────────────────────────────────────────────────────────
// Parsing strips any key not listed here, closing off mass-assignment into MongoDB.
const listingSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional(),
  price: z.number().nonnegative(),
  property_type: z.enum(['apartment', 'house', 'villa', 'penthouse', 'commercial', 'land', 'building']),
  status: z.enum(['for_sale', 'for_rent', 'sold', 'rented']).default('for_sale'),
  bedrooms: z.number().nonnegative().optional(),
  bathrooms: z.number().nonnegative().optional(),
  area_sqft: z.number().nonnegative().optional(),
  city: z.string().max(100).optional(),
  neighborhood: z.string().max(100).optional(),
  address: z.string().max(300).optional(),
  image_url: z.string().max(2000).optional(),
  gallery_urls: z.array(z.string().max(2000)).optional(),
  features: z.array(z.string().max(100)).optional(),
  agent_id: z.string().max(100).optional(),
  is_featured: z.boolean().optional(),
  total_apartments: z.number().nonnegative().optional(),
  apartment_breakdown: z.array(z.object({ rooms: z.string(), count: z.number() })).optional(),
});

const agentSchema = z.object({
  name: z.string().min(1).max(200),
  title: z.string().max(200).optional(),
  email: z.string().max(200).optional(),
  phone: z.string().max(50).optional(),
  bio: z.string().max(3000).optional(),
  photo_url: z.string().max(2000).optional(),
  specializations: z.array(z.string().max(100)).optional(),
  years_experience: z.number().nonnegative().optional(),
  linkedin_url: z.string().max(2000).optional(),
});

const articleSchema = z.object({
  title: z.string().min(1).max(300),
  summary: z.string().max(1000).optional(),
  content: z.string().min(1).max(50000),
  cover_image_url: z.string().max(2000).optional(),
  category: z.enum(['market_insights', 'investment_tips', 'neighborhood_guides', 'company_news', 'guides']).default('market_insights'),
  author_name: z.string().max(200).optional(),
  is_published: z.boolean().optional(),
});

const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: 'Invalid request body', details: result.error.flatten() });
  }
  req.body = result.data;
  next();
};

// ── Auth middleware ───────────────────────────────────────────────────────────
const requireAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET);
    if (payload.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// ── Auth routes ───────────────────────────────────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again later.' },
});

app.post('/api/auth/login', loginLimiter, (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
    return res.json({ token, user: { username, role: 'admin' } });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/api/auth/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(auth.slice(7), JWT_SECRET);
    res.json({ username: payload.username, role: payload.role });
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// ── Listings ──────────────────────────────────────────────────────────────────
app.get('/api/listings', async (req, res) => {
  try {
    const filter = req.query.featured === 'true' ? { is_featured: true } : {};
    const listings = await db.collection('listings')
      .find(filter)
      .sort({ created_date: -1 })
      .toArray();
    res.json(listings.map(clean));
  } catch (err) {
    logAndFail(res, 'GET /api/listings', err);
  }
});

app.post('/api/listings', requireAdmin, validateBody(listingSchema), async (req, res) => {
  try {
    const listing = { ...req.body, id: Date.now().toString(), created_date: new Date().toISOString() };
    await db.collection('listings').insertOne(listing);
    res.json(clean(listing));
  } catch (err) {
    logAndFail(res, 'POST /api/listings', err);
  }
});

app.delete('/api/listings/:id', requireAdmin, async (req, res) => {
  try {
    await db.collection('listings').deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    logAndFail(res, 'DELETE /api/listings/:id', err);
  }
});

// ── Agents ────────────────────────────────────────────────────────────────────
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await db.collection('agents')
      .find()
      .sort({ created_date: -1 })
      .toArray();
    res.json(agents.map(clean));
  } catch (err) {
    logAndFail(res, 'GET /api/agents', err);
  }
});

app.post('/api/agents', requireAdmin, validateBody(agentSchema), async (req, res) => {
  try {
    const agent = { ...req.body, id: Date.now().toString(), created_date: new Date().toISOString() };
    await db.collection('agents').insertOne(agent);
    res.json(clean(agent));
  } catch (err) {
    logAndFail(res, 'POST /api/agents', err);
  }
});

app.delete('/api/agents/:id', requireAdmin, async (req, res) => {
  try {
    await db.collection('agents').deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    logAndFail(res, 'DELETE /api/agents/:id', err);
  }
});

// ── Articles ──────────────────────────────────────────────────────────────────
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await db.collection('articles')
      .find({ is_published: true })
      .sort({ created_date: -1 })
      .toArray();
    res.json(articles.map(clean));
  } catch (err) {
    logAndFail(res, 'GET /api/articles', err);
  }
});

app.post('/api/articles', requireAdmin, validateBody(articleSchema), async (req, res) => {
  try {
    const article = { ...req.body, id: Date.now().toString(), created_date: new Date().toISOString() };
    await db.collection('articles').insertOne(article);
    res.json(clean(article));
  } catch (err) {
    logAndFail(res, 'POST /api/articles', err);
  }
});

app.delete('/api/articles/:id', requireAdmin, async (req, res) => {
  try {
    await db.collection('articles').deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    logAndFail(res, 'DELETE /api/articles/:id', err);
  }
});

// ── Serve frontend in production ──────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
async function startServer() {
  assertRequiredEnv();
  await connectDB();
  // Add '0.0.0.0' right after PORT
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
