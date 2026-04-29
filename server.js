require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const ORDERS_FILE = path.join(__dirname, 'data/orders.json');
const VISITS_FILE = path.join(__dirname, 'data/visits.json');
const CONTENT_FILE = path.join(__dirname, 'data/content.json');

function trackVisit(req, res, next) {
  const p = req.path;
  if (!p.endsWith('.html') && p !== '/') return next();
  let v = { total: 0, today: { date: '', count: 0 }, pages: {} };
  try { v = JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8')); } catch {}
  const today = new Date().toISOString().slice(0, 10);
  if (v.today.date !== today) v.today = { date: today, count: 0 };
  v.total++;
  v.today.count++;
  const page = p === '/' ? '/index.html' : p;
  v.pages[page] = (v.pages[page] || 0) + 1;
  try { fs.writeFileSync(VISITS_FILE, JSON.stringify(v, null, 2)); } catch {}
  next();
}

const authRoutes = require('./admin/routes/auth');
const productsAdminRoutes = require('./admin/routes/products');
const ordersAdminRoutes = require('./admin/routes/orders');
const contentAdminRoutes = require('./admin/routes/content');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'admin/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 8 * 60 * 60 * 1000 } // 8 hours
}));

/* ---- Public API ---- */
app.get('/api/stripe-config', (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'sgd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/content', (req, res) => {
  try {
    const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
    res.json(content);
  } catch {
    res.status(500).json({ error: 'Could not load content' });
  }
});

app.get('/api/products', (req, res) => {
  try {
    const products = require('./data/products.json');
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Could not load products' });
  }
});

app.post('/api/orders', (req, res) => {
  const { name, email, phone, address, notes, items, total, paymentIntentId } = req.body;
  if (!name || !email || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  let orders = [];
  try { orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')); } catch {}
  const order = {
    id: Date.now().toString(),
    name, email, phone: phone || '', address, notes: notes || '',
    items, total: Number(total),
    paymentIntentId: paymentIntentId || null,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  res.json({ orderId: order.id });
});

/* ---- Admin routes ---- */
app.use('/admin', authRoutes);
app.use('/admin', productsAdminRoutes);
app.use('/admin', ordersAdminRoutes);
app.use('/admin', contentAdminRoutes);

app.get('/admin', (req, res) => res.redirect('/admin/dashboard'));

/* ---- Serve static frontend ---- */
app.use(trackVisit);
app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT, () => {
  console.log(`Commenhers running at http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
