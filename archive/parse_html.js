const fs = require('fs');
const path = require('path');

function extractText(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf-8');
  
  // Remove script and style tags and their content
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Extract all text nodes between tags
  const textRegex = />([^<]+)</g;
  const texts = [];
  let match;
  
  while ((match = textRegex.exec(clean)) !== null) {
    const text = match[1].trim();
    if (text && text.length > 2 && !text.match(/^\s*$/)) {
      texts.push(text);
    }
  }
  
  // Extract image sources
  const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  const images = [];
  while ((match = imgRegex.exec(html)) !== null) {
    images.push(match[1]);
  }
  
  return { texts, images };
}

const files = [
  'Workshop – Commenhers.html',
  'Corporate Upcycling – Commenhers.html',
  'Social Impact – Commenhers.html'
];

files.forEach(file => {
  console.log(`\n${'='.repeat(80)}\n${file}\n${'='.repeat(80)}\n`);
  
  try {
    const { texts, images } = extractText(file);
    
    // Remove duplicates
    const uniqueTexts = [...new Set(texts)];
    
    console.log('VISIBLE CONTENT:\n');
    uniqueTexts.forEach((text, idx) => {
      if (idx < 200) { // Limit output
        console.log(text);
      }
    });
    
    console.log('\n\nIMAGES REFERENCED:\n');
    const uniqueImages = [...new Set(images)];
    uniqueImages.forEach(img => {
      console.log(img);
    });
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
});
