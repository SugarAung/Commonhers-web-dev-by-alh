const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const IMAGES_DIR = path.join(__dirname, '../../build/assets/images');
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGES_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase() + ext);
  }
});
const upload = multer({ storage: imgStorage, limits: { fileSize: 10 * 1024 * 1024 } });

const DATA_FILE = path.join(__dirname, '../../data/products.json');
const ORDERS_FILE = path.join(__dirname, '../../data/orders.json');
const VISITS_FILE = path.join(__dirname, '../../data/visits.json');

function readOrders() {
  try { return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8')); } catch { return []; }
}

function readVisits() {
  try { return JSON.parse(fs.readFileSync(VISITS_FILE, 'utf8')); }
  catch { return { total: 0, today: { date: '', count: 0 }, pages: {} }; }
}

function requireLogin(req, res, next) {
  if (req.session.admin) return next();
  res.redirect('/admin/login');
}

function readProducts() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

router.get('/dashboard', requireLogin, (req, res) => {
  const products = readProducts();
  const orders = readOrders();
  const visits = readVisits();
  const today = new Date().toISOString().slice(0, 10);
  const todayVisits = visits.today.date === today ? visits.today.count : 0;
  res.render('dashboard', { products, orders, totalVisits: visits.total, todayVisits });
});

router.get('/products', requireLogin, (req, res) => {
  const products = readProducts();
  res.render('products', { products });
});

router.get('/products/new', requireLogin, (req, res) => {
  res.render('product-form', { product: null, error: null });
});

router.post('/products', requireLogin, upload.single('imageFile'), (req, res) => {
  const products = readProducts();
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
  if (products.find(p => p.id === newProduct.id)) {
    return res.render('product-form', { product: null, error: 'A product with that name already exists.' });
  }
  products.push(newProduct);
  writeProducts(products);
  res.redirect('/admin/products');
});

router.get('/products/:id/edit', requireLogin, (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.redirect('/admin/products');
  res.render('product-form', { product, error: null });
});

router.post('/products/:id', requireLogin, upload.single('imageFile'), (req, res) => {
  const products = readProducts();
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.redirect('/admin/products');
  const { name, price, existingImage, category, soldOut } = req.body;
  const imagePath = req.file ? 'assets/images/' + req.file.filename : (existingImage || '');
  products[idx] = {
    id: req.params.id,
    name: name.trim(),
    price: parseFloat(price) || 0,
    image: imagePath,
    soldOut: soldOut === 'on',
    category: category ? category.trim() : 'uncategorised'
  };
  writeProducts(products);
  res.redirect('/admin/products');
});

router.post('/products/:id/delete', requireLogin, (req, res) => {
  const products = readProducts();
  const filtered = products.filter(p => p.id !== req.params.id);
  writeProducts(filtered);
  res.redirect('/admin/products');
});

module.exports = router;
