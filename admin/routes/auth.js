const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/login', (req, res) => {
  if (req.session.admin) return res.redirect('/admin/dashboard');
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const validUser = username === (process.env.ADMIN_USER || 'admin');
  const hash = process.env.ADMIN_PASS_HASH || '';

  let validPass = false;
  if (hash) {
    validPass = await bcrypt.compare(password, hash);
  }

  if (validUser && validPass) {
    req.session.admin = true;
    return res.redirect('/admin/dashboard');
  }
  res.render('login', { error: 'Invalid username or password.' });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

module.exports = router;
