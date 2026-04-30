const express = require('express');
const router = express.Router();
const supabase = require('../../lib/supabase');

function requireLogin(req, res, next) {
  if (req.session.admin) return next();
  res.redirect('/admin/login');
}

router.get('/orders', requireLogin, async (req, res) => {
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('createdAt', { ascending: false });
  res.render('orders', { orders: orders || [] });
});

router.post('/orders/:id/status', requireLogin, async (req, res) => {
  await supabase.from('orders').update({ status: req.body.status }).eq('id', req.params.id);
  res.redirect('/admin/orders');
});

module.exports = router;
