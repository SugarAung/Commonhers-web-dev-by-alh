const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const supabase = require('../../lib/supabase');

const IMAGES_DIR = path.join(__dirname, '../../build/assets/images');
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGES_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase() + ext);
  }
});
const upload = multer({ storage: imgStorage, limits: { fileSize: 10 * 1024 * 1024 } });

function requireLogin(req, res, next) {
  if (req.session.admin) return next();
  res.redirect('/admin/login');
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

router.get('/dashboard', requireLogin, async (req, res) => {
  const [
    { data: products },
    { data: orders },
    { data: visitsRow }
  ] = await Promise.all([
    supabase.from('products').select('*'),
    supabase.from('orders').select('*'),
    supabase.from('visits').select('*').eq('id', 1).single()
  ]);
  const today = new Date().toISOString().slice(0, 10);
  const v = visitsRow || { total: 0, today_date: null, today_count: 0 };
  const todayVisits = v.today_date === today ? v.today_count : 0;
  res.render('dashboard', {
    products: products || [],
    orders: orders || [],
    totalVisits: v.total || 0,
    todayVisits
  });
});

router.get('/products', requireLogin, async (req, res) => {
  const { data: products } = await supabase.from('products').select('*');
  res.render('products', { products: products || [] });
});

router.get('/products/new', requireLogin, (req, res) => {
  res.render('product-form', { product: null, error: null });
});

router.post('/products', requireLogin, upload.single('imageFile'), async (req, res) => {
  const { name, price, existingImage, category, soldOut } = req.body;
  const imagePath = req.file ? 'assets/images/' + req.file.filename : (existingImage || '');
  const newProduct = {
    id: slugify(name),
    name: name.trim(),
    price: parseFloat(price) || 0,
    image: imagePath,
    soldOut: soldOut === 'on',
    category: category ? category.trim() : 'uncategorised'
  };
  const { data: existing } = await supabase.from('products').select('id').eq('id', newProduct.id).maybeSingle();
  if (existing) {
    return res.render('product-form', { product: null, error: 'A product with that name already exists.' });
  }
  await supabase.from('products').insert(newProduct);
  res.redirect('/admin/products');
});

router.get('/products/:id/edit', requireLogin, async (req, res) => {
  const { data: product } = await supabase.from('products').select('*').eq('id', req.params.id).maybeSingle();
  if (!product) return res.redirect('/admin/products');
  res.render('product-form', { product, error: null });
});

router.post('/products/:id', requireLogin, upload.single('imageFile'), async (req, res) => {
  const { name, price, existingImage, category, soldOut } = req.body;
  const imagePath = req.file ? 'assets/images/' + req.file.filename : (existingImage || '');
  await supabase.from('products').update({
    name: name.trim(),
    price: parseFloat(price) || 0,
    image: imagePath,
    soldOut: soldOut === 'on',
    category: category ? category.trim() : 'uncategorised'
  }).eq('id', req.params.id);
  res.redirect('/admin/products');
});

router.post('/products/:id/delete', requireLogin, async (req, res) => {
  await supabase.from('products').delete().eq('id', req.params.id);
  res.redirect('/admin/products');
});

module.exports = router;
