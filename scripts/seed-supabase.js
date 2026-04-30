require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function seed() {
  console.log('Seeding Supabase...\n');

  // Products
  const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8'));
  const { error: pe } = await supabase.from('products').upsert(products);
  if (pe) console.error('products:', pe.message);
  else console.log(`✓ products: ${products.length} rows`);

  // Content
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/content.json'), 'utf8'));
  const { error: ce } = await supabase.from('site_content').upsert({ id: 1, data: content });
  if (ce) console.error('site_content:', ce.message);
  else console.log('✓ site_content: 1 row');

  // Visits
  const v = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/visits.json'), 'utf8'));
  const { error: ve } = await supabase.from('visits').upsert({
    id: 1,
    total: v.total || 0,
    today_date: v.today?.date || null,
    today_count: v.today?.count || 0,
    pages: v.pages || {}
  });
  if (ve) console.error('visits:', ve.message);
  else console.log('✓ visits: 1 row');

  // Customers (if any exist)
  const customersPath = path.join(__dirname, '../data/customers.json');
  if (fs.existsSync(customersPath)) {
    const customers = JSON.parse(fs.readFileSync(customersPath, 'utf8'));
    if (customers.length) {
      const { error: cue } = await supabase.from('customers').upsert(customers);
      if (cue) console.error('customers:', cue.message);
      else console.log(`✓ customers: ${customers.length} rows`);
    }
  }

  console.log('\nDone.');
}

seed().catch(console.error);
