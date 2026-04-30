const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const supabase = require('../lib/supabase');

router.post('/api/customer/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }
  const { data: existing } = await supabase
    .from('customers')
    .select('id')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle();
  if (existing) {
    return res.status(409).json({ error: 'An account with that email already exists.' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const customer = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash,
    createdAt: new Date().toISOString()
  };
  const { error } = await supabase.from('customers').insert(customer);
  if (error) return res.status(500).json({ error: 'Registration failed.' });
  req.session.customer = { id: customer.id, name: customer.name, email: customer.email };
  res.json({ id: customer.id, name: customer.name, email: customer.email });
});

router.post('/api/customer/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle();
  if (!customer) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  const valid = await bcrypt.compare(password, customer.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  req.session.customer = { id: customer.id, name: customer.name, email: customer.email };
  res.json({ id: customer.id, name: customer.name, email: customer.email });
});

router.post('/api/customer/logout', (req, res) => {
  req.session.customer = null;
  res.json({ ok: true });
});

router.get('/api/customer/me', async (req, res) => {
  if (!req.session.customer) {
    return res.status(401).json({ error: 'Not logged in.' });
  }
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('email', req.session.customer.email.toLowerCase())
    .order('createdAt', { ascending: false });
  res.json({ customer: req.session.customer, orders: orders || [] });
});

module.exports = router;
