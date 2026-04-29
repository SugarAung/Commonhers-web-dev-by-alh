# Commenhers

Sustainable upcycled fashion brand website — 13-page static frontend with Node.js/Express admin panel.

## Stack

- Frontend: HTML5 / CSS3 / Vanilla JS (in `build/`)
- Backend: Node.js + Express (server.js, port 3000)
- Admin: EJS templates, session auth, bcrypt
- Payment: Stripe (SGD)
- Storage: Flat JSON files (`data/`)

## Run Locally

```bash
npm install
cp .env.example .env        # then fill in values
npm start                   # → http://localhost:3000
```

Admin panel: http://localhost:3000/admin

## Folder Structure

```
build/          ← 13 static HTML pages + assets (CSS, JS, images)
admin/          ← EJS views + route handlers
data/           ← products.json, orders.json, visits.json
server.js       ← Express server
.env.example    ← environment variable template
```

## Pages

| Page | URL |
|------|-----|
| Home | /index.html |
| About | /about.html |
| Shop | /shop.html |
| Cart | /cart.html |
| Checkout | /checkout.html |
| Wishlist | /wishlist.html |
| Compare | /compare.html |
| Social Impact | /social-impact.html |
| Corporate | /corporate-upcycling.html |
| Workshop | /workshop.html |
| Contact | /contact.html |
| My Account | /my-account.html |
| Confirmation | /confirmation.html |

## Notes

- Static pages in `build/` can be viewed without the server (open HTML directly or via Cloudflare Pages)
- Checkout and admin panel require the Node.js server running
- Never commit `.env` — it contains secrets
