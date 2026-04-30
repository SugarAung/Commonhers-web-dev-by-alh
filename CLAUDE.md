# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Run server at http://localhost:3000
```

No build step — the `build/` directory is hand-authored static HTML. No linting or test suite exists.

To change the admin password:
```bash
node -e "require('bcrypt').hash('newpass',10).then(h=>console.log(h))"
# Paste output into .env as ADMIN_PASS_HASH
```

## Architecture

**Two separate systems share one Express server:**

1. **Static frontend** — `build/` served as static files. Vanilla JS, no framework, no bundler.
2. **Admin panel** — EJS templates at `admin/views/`, routes at `admin/routes/`, protected by session auth.

All persistent data is flat JSON in `data/`:
- `products.json` — product catalog (read by frontend via `/api/products`)
- `orders.json` — all customer orders (written by checkout, read by admin)
- `content.json` — CMS text + image fields (read by frontend via `/api/content`)
- `visits.json` — page view counters (written by server middleware on every HTML request)

**How the CMS works:** Admin edits content via the Content panel → saved to `data/content.json` → `build/assets/js/cms-content.js` fetches `/api/content` on page load and writes values into DOM elements using `data-cms-text`, `data-cms-src`, `data-cms-bg`, `data-cms-href` attributes.

**How the cart/checkout works:** Cart state lives in `localStorage` (`commenhers_cart`). Checkout page calls `/api/stripe-config` for the publishable key, creates a payment intent via `/api/create-payment-intent`, then on success POSTs to `/api/orders` to persist the order.

**Admin auth:** Single admin account only. Username + bcrypt hash stored in `.env` (`ADMIN_USER`, `ADMIN_PASS_HASH`). `requireLogin()` middleware is defined locally in each route file (not shared).

**Image uploads:** Multer saves uploaded files to `build/assets/images/` with a timestamp prefix. Used in both `admin/routes/products.js` and `admin/routes/content.js`.

## Key Constraints

- **Never edit files in `archive/`** — read-only Wayback Machine snapshots used as reference.
- **`.env` is protected** — a PreToolUse hook in `.claude/settings.json` blocks Claude from reading it.
- **No hot reload** — restart `npm start` after changing server.js or any admin route.
- **Cloudflare Pages** deploys `build/` automatically on push to `main`. Admin panel and Stripe only work locally (require Node server).
- **`data/` writes are synchronous** — `fs.writeFileSync` is used throughout; this is intentional for simplicity.
- **Images are gitignored** — `build/assets/images/` is excluded from git (files too large). Drop images manually on each machine.
