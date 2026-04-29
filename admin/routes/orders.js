const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const ORDERS_FILE = path.join(__dirname, '../../data/orders.json');

function requireLogin(req, res, next) {
  if (req.session.admin) return next();
  res.redirect('/admin/login');
}

function readOrders() {
  try { return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')); } catch { return []; }
}

router.get('/orders', requireLogin, (req, res) => {
  const orders = readOrders().reverse();
  res.render('orders', { orders });
});

router.post('/orders/:id/status', requireLogin, (req, res) => {
  const orders = readOrders();
  const order = orders.find(o => o.id === req.params.id);
  if (order) {
    order.status = req.body.status;
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
  }
  res.redirect('/admin/orders');
});

module.exports = router;
