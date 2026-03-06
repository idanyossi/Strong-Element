import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-this';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

// ── MongoDB connection ────────────────────────────────────────────────────────
let db;

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set in .env');
  }
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db('strong-element');
  console.log('Connected to MongoDB');
}

// Strip MongoDB _id from documents
const clean = ({ _id, ...doc }) => doc;

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
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '30d' });
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
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/listings', requireAdmin, async (req, res) => {
  try {
    const listing = { ...req.body, id: Date.now().toString(), created_date: new Date().toISOString() };
    await db.collection('listings').insertOne(listing);
    res.json(clean(listing));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/listings/:id', requireAdmin, async (req, res) => {
  try {
    await db.collection('listings').deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/agents', requireAdmin, async (req, res) => {
  try {
    const agent = { ...req.body, id: Date.now().toString(), created_date: new Date().toISOString() };
    await db.collection('agents').insertOne(agent);
    res.json(clean(agent));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/agents/:id', requireAdmin, async (req, res) => {
  try {
    await db.collection('agents').deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/articles', requireAdmin, async (req, res) => {
  try {
    const article = { ...req.body, id: Date.now().toString(), created_date: new Date().toISOString() };
    await db.collection('articles').insertOne(article);
    res.json(clean(article));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/articles/:id', requireAdmin, async (req, res) => {
  try {
    await db.collection('articles').deleteOne({ id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
