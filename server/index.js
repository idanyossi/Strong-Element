import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, 'db.json');
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-this';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

// Ensure DB file exists
if (!existsSync(DB_PATH)) {
  writeFileSync(DB_PATH, JSON.stringify({ listings: [], agents: [], articles: [] }, null, 2));
}

const readDB = () => JSON.parse(readFileSync(DB_PATH, 'utf8'));
const writeDB = (data) => writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

const app = express();
app.use(cors());
app.use(express.json());

// ── Auth middleware ──────────────────────────────────────────────────────────
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

// ── Auth routes ──────────────────────────────────────────────────────────────
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

// ── Listings ─────────────────────────────────────────────────────────────────
app.get('/api/listings', (req, res) => {
  const db = readDB();
  let listings = [...db.listings];
  if (req.query.featured === 'true') {
    listings = listings.filter((l) => l.is_featured);
  }
  listings.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  res.json(listings);
});

app.post('/api/listings', requireAdmin, (req, res) => {
  const db = readDB();
  const listing = { ...req.body, id: Date.now().toString(), created_date: new Date().toISOString() };
  db.listings.push(listing);
  writeDB(db);
  res.json(listing);
});

app.delete('/api/listings/:id', requireAdmin, (req, res) => {
  const db = readDB();
  db.listings = db.listings.filter((l) => l.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ── Agents ───────────────────────────────────────────────────────────────────
app.get('/api/agents', (req, res) => {
  const db = readDB();
  const agents = [...db.agents].sort(
    (a, b) => new Date(b.created_date) - new Date(a.created_date)
  );
  res.json(agents);
});

app.post('/api/agents', requireAdmin, (req, res) => {
  const db = readDB();
  const agent = { ...req.body, id: Date.now().toString(), created_date: new Date().toISOString() };
  db.agents.push(agent);
  writeDB(db);
  res.json(agent);
});

app.delete('/api/agents/:id', requireAdmin, (req, res) => {
  const db = readDB();
  db.agents = db.agents.filter((a) => a.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ── Articles ─────────────────────────────────────────────────────────────────
app.get('/api/articles', (req, res) => {
  const db = readDB();
  const articles = db.articles
    .filter((a) => a.is_published)
    .sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  res.json(articles);
});

app.post('/api/articles', requireAdmin, (req, res) => {
  const db = readDB();
  const article = { ...req.body, id: Date.now().toString(), created_date: new Date().toISOString() };
  db.articles.push(article);
  writeDB(db);
  res.json(article);
});

app.delete('/api/articles/:id', requireAdmin, (req, res) => {
  const db = readDB();
  db.articles = db.articles.filter((a) => a.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
