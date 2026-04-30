require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = require('./lib/supabase');

async function trackVisit(req, res, next) {
  next();
  const p = req.path;
  if (!p.endsWith('.html') && p !== '/') return;
  try {
    const { data: row } = await supabase.from('visits').select('*').eq('id', 1).single();
    const v = row || { total: 0, today_date: null, today_count: 0, pages: {} };
    const today = new Date().toISOString().slice(0, 10);
    const page = p === '/' ? '/index.html' : p;
    await supabase.from('visits').upsert({
      id: 1,
      total: (v.total || 0) + 1,
      today_date: today,
      today_count: v.today_date === today ? (v.today_count || 0) + 1 : 1,
      pages: { ...(v.pages || {}), [page]: ((v.pages || {})[page] || 0) + 1 }
    });
  } catch {}
}

const authRoutes = require('./admin/routes/auth');
const productsAdminRoutes = require('./admin/routes/products');
const ordersAdminRoutes = require('./admin/routes/orders');
const contentAdminRoutes = require('./admin/routes/content');
const customerRoutes = require('./routes/customers');

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
  cookie: { maxAge: 8 * 60 * 60 * 1000 }
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

app.get('/api/content', async (req, res) => {
  try {
    const { data, error } = await supabase.from('site_content').select('data').eq('id', 1).single();
    if (error) throw error;
    res.json(data.data);
  } catch {
    res.status(500).json({ error: 'Could not load content' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Could not load products' });
  }
});

app.post('/api/orders', async (req, res) => {
  const { name, email, phone, address, notes, items, total, paymentIntentId } = req.body;
  if (!name || !email || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const order = {
    id: Date.now().toString(),
    name, email, phone: phone || '', address, notes: notes || '',
    items, total: Number(total),
    paymentIntentId: paymentIntentId || null,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  try {
    const { error } = await supabase.from('orders').insert(order);
    if (error) throw error;
    res.json({ orderId: order.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---- Customer API ---- */
app.use(customerRoutes);

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
