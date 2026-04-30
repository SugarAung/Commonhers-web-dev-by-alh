const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const supabase = require('../../lib/supabase');

const IMAGES_DIR = path.join(__dirname, '../../build/assets/images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGES_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase() + ext);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const IMAGE_FIELDS = [
  { name: 'index_commitments_image', maxCount: 1 },
  { name: 'index_impact_image', maxCount: 1 },
  { name: 'index_partners_image', maxCount: 1 },
  { name: 'index_whatwedo_card1_image', maxCount: 1 },
  { name: 'index_whatwedo_card2_image', maxCount: 1 },
  { name: 'about_commitments_image', maxCount: 1 },
  { name: 'about_whatwedo_card1_image', maxCount: 1 },
  { name: 'about_whatwedo_card2_image', maxCount: 1 },
  { name: 'about_impact_image', maxCount: 1 },
  { name: 'about_partners_image', maxCount: 1 },
  { name: 'social_impact_esg_image', maxCount: 1 },
  { name: 'social_impact_beneficiaries_image', maxCount: 1 },
  { name: 'social_impact_testimonial_image', maxCount: 1 },
  { name: 'corporate_casestudy1_image', maxCount: 1 },
  { name: 'corporate_casestudy2_image', maxCount: 1 },
  { name: 'corporate_casestudy3_image', maxCount: 1 },
  { name: 'corporate_casestudy4_image', maxCount: 1 },
  { name: 'corporate_casestudy5_image', maxCount: 1 },
  { name: 'corporate_collab_image', maxCount: 1 },
];

function requireLogin(req, res, next) {
  if (req.session.admin) return next();
  res.redirect('/admin/login');
}

router.get('/content', requireLogin, async (req, res) => {
  const { data } = await supabase.from('site_content').select('data').eq('id', 1).single();
  const content = data ? data.data : {};
  res.render('content', { content, saved: req.query.saved === '1' });
});

router.post('/content', requireLogin, upload.fields(IMAGE_FIELDS), async (req, res) => {
  const { data } = await supabase.from('site_content').select('data').eq('id', 1).single();
  const content = data ? { ...data.data } : {};
  const body = req.body;
  const files = req.files || {};

  function set(section, key, value) {
    if (!content[section]) content[section] = {};
    content[section][key] = value;
  }

  function img(fieldName, section, key) {
    if (files[fieldName] && files[fieldName][0]) {
      set(section, key, 'assets/images/' + files[fieldName][0].filename);
    } else if (body[fieldName] !== undefined) {
      set(section, key, body[fieldName]);
    }
  }

  // Global
  set('global', 'footer_tagline', body.global_footer_tagline || '');
  set('global', 'footer_instagram', body.global_footer_instagram || '');
  set('global', 'footer_linkedin', body.global_footer_linkedin || '');

  // Home
  set('index', 'hero_slide1_title', body.index_hero_slide1_title || '');
  set('index', 'hero_slide2_title', body.index_hero_slide2_title || '');
  set('index', 'hero_slide3_title', body.index_hero_slide3_title || '');
  set('index', 'story_body', body.index_story_body || '');
  img('index_commitments_image', 'index', 'commitments_image');
  img('index_impact_image', 'index', 'impact_image');
  img('index_partners_image', 'index', 'partners_image');
  img('index_whatwedo_card1_image', 'index', 'whatwedo_card1_image');
  img('index_whatwedo_card2_image', 'index', 'whatwedo_card2_image');

  // About
  set('about', 'hero_title', body.about_hero_title || '');
  set('about', 'hero_subtitle', body.about_hero_subtitle || '');
  set('about', 'story_body', body.about_story_body || '');
  img('about_commitments_image', 'about', 'commitments_image');
  img('about_whatwedo_card1_image', 'about', 'whatwedo_card1_image');
  img('about_whatwedo_card2_image', 'about', 'whatwedo_card2_image');
  img('about_impact_image', 'about', 'impact_image');
  img('about_partners_image', 'about', 'partners_image');

  // Social Impact
  set('social_impact', 'hero_title', body.social_impact_hero_title || '');
  set('social_impact', 'hero_subtitle', body.social_impact_hero_subtitle || '');
  set('social_impact', 'testimonial_body', body.social_impact_testimonial_body || '');
  img('social_impact_esg_image', 'social_impact', 'esg_image');
  img('social_impact_beneficiaries_image', 'social_impact', 'beneficiaries_image');
  img('social_impact_testimonial_image', 'social_impact', 'testimonial_image');

  // Corporate
  set('corporate', 'hero_title', body.corporate_hero_title || '');
  set('corporate', 'hero_subtitle', body.corporate_hero_subtitle || '');
  img('corporate_casestudy1_image', 'corporate', 'casestudy1_image');
  img('corporate_casestudy2_image', 'corporate', 'casestudy2_image');
  img('corporate_casestudy3_image', 'corporate', 'casestudy3_image');
  img('corporate_casestudy4_image', 'corporate', 'casestudy4_image');
  img('corporate_casestudy5_image', 'corporate', 'casestudy5_image');
  img('corporate_collab_image', 'corporate', 'collab_image');

  // Workshop
  set('workshop', 'hero_title', body.workshop_hero_title || '');
  set('workshop', 'hero_subtitle', body.workshop_hero_subtitle || '');
  set('workshop', 'video1_url', body.workshop_video1_url || '');
  set('workshop', 'video1_title', body.workshop_video1_title || '');
  set('workshop', 'video2_url', body.workshop_video2_url || '');
  set('workshop', 'video2_title', body.workshop_video2_title || '');
  set('workshop', 'video3_url', body.workshop_video3_url || '');
  set('workshop', 'video3_title', body.workshop_video3_title || '');

  // Contact
  set('contact', 'hero_title', body.contact_hero_title || '');
  set('contact', 'hero_subtitle', body.contact_hero_subtitle || '');
  set('contact', 'email', body.contact_email || '');
  set('contact', 'whatsapp', body.contact_whatsapp || '');
  set('contact', 'whatsapp_link', body.contact_whatsapp_link || '');
  set('contact', 'address', body.contact_address || '');

  // Shop
  set('shop', 'hero_title', body.shop_hero_title || '');
  set('shop', 'hero_subtitle', body.shop_hero_subtitle || '');

  await supabase.from('site_content').upsert({ id: 1, data: content });
  res.redirect('/admin/content?saved=1');
});

module.exports = router;
