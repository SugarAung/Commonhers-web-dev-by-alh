# Redesign Handoff — Next Session Prompt

## WHAT TO PASTE AT THE START OF THE NEXT SESSION

---

> We are doing a phased UI redesign of the Commenhers website (vanilla HTML/CSS/JS, no framework migration).
> Phases 1–8 are complete. The redesign is finished.
> Read this file for full context.

---

## PROGRESS SO FAR

### Phase 1 ✓ — Global CSS Design System
- Logo height fixed (user set to 300px manually)
- 11 new CSS variables added to `:root` (`--color-error`, `--radius-full`, `--shadow-lg`, etc.)
- Body `line-height: 1.7`, `-moz-osx-font-smoothing: grayscale`
- Section headings: `2.1rem`, `letter-spacing: -0.3px`
- Global `*:focus-visible` rule; removed `outline: none` from 3 form focus blocks
- Footer contrast raised (5 rules)
- All `#c62828` / `#b71c1c` replaced with `var(--color-error)`
- Buttons: `box-shadow` transition, hover glow, pill shape on hero + shop CTAs
- Section padding `80px`, heading margin `48px`, page-hero spacing up
- Product cards: lighter border (`--color-border-light`), stronger hover shadow (`--shadow-lg`)

### Phase 2 ✓ — Header & Nav
- Scroll shrink: header `72px → 58px` after 40px scroll (JS + CSS)
- Nav underline: green `2px` bar slides in under hovered/active links
- Dropdown fade-in: replaced `display:none/block` with opacity + transform animation

### Phase 3 ✓ — Hero Slider
- Hero height: `520px → 600px` (mobile: `420px` / `260px`)
- Headline: `2rem → 2.6rem`, `letter-spacing: -0.5px`, `margin-bottom: 2rem`
- Pill dot indicators: thin bars (`8×3px`), active expands to `28px`
- Content max-width tightened to `700px`

### Phase 4 ✓ — Index.html Sections + Scroll Animations
- Our Story: `padding: 88px 0 80px`, text `1.1rem / #3a3a3a`, readmore `letter-spacing + underline-offset`
- Our Commitments image: `border-radius: var(--radius-lg)` + `box-shadow: var(--shadow-lg)`
- What We Do cards: `min-height: 400px`, h3 `1.3rem / letter-spacing 1.5px`, pill buttons
- Impact image + Partners image: `box-shadow: var(--shadow)`
- `.section-alt`: subtle top/bottom border
- **Scroll animations added** (IntersectionObserver, `prefers-reduced-motion` safe):
  - `.animate` — fade + slide-up (0.55s)
  - `.animate-fade` — fade only (0.6s)
  - `.stagger` — children stagger 0.1s apart
  - Applied to all homepage sections; cards stagger on scroll

### Phase 6 ✓ — Remaining Pages

- **corporate-upcycling.html**: all inline styles removed; `.content-narrow`, `.collab-label`, `.collab-cta`, `.form-narrow`, `.form-submit` classes applied; scroll animations on all sections; case study cards and feature cards staggered
- **social-impact.html**: all inline styles removed; `.beneficiaries-grid`, `.beneficiaries-list`, `.beneficiaries-img`, `.testimonial-block`, `.testimonial-inner`, `.esg-img` classes applied; scroll animations on all sections; SDG cards staggered
- **workshop.html**: all inline styles removed; `.workshop-intro`, `.workshop-subsection`, `.workshop-callout`, `.feature-card-img` classes applied; scroll animations on all sections; feature cards and testimonials staggered
- **my-account.html**: `<style>` block removed (moved to `style.css`); remaining inline styles cleaned up
- **checkout.html**: `<style>` block removed (moved to `style.css`)
- **style.css**: 11 new component classes added, account/checkout page styles centralised, responsive rules for `.beneficiaries-grid` and `.testimonial-inner`

### Phase 5 ✓ — Shop, About, Contact
- **about.html**: all inline styles removed; sections now use proper CSS classes matching index.html
  - Every h2 wrapped in `.section-heading` (gets green underline + spacing)
  - Our Commitments → `section-alt our-commitments` (shadow + rounded image)
  - What We Do → `.banner-card` pattern (hover scale, overlay gradient, pill buttons)
  - Impact Tracker / Our Partners → `.impact-tracker`, `.our-partners` with `.impact-img`, `.partners-img`
  - Scroll animations on all sections
- **shop.html**: `.shop-layout` gets `animate-fade`
- **contact.html**: contact grid `animate`, map + WhatsApp CTA `animate-fade`
- **style.css**: added `.section-text` (centered 800px text block for about's Our Story)

---

### Phase 8 ✓ — Mobile & Accessibility
- Skip-to-content link added to all 13 pages (`.skip-link` — visible on keyboard focus, position fixed + transform)
- `id="page-content"` added to first content section on all 13 pages
- Touch targets raised to 44px: `.hamburger` (44×44), `.cart-icon-btn` (44×44), `.social-icon` (44×44), `.qty-btn` (min 44px), `.btn-remove` (min 44px)
- Hamburger bar width fixed to 24px (centred) after size increase
- `@media (prefers-reduced-motion: reduce)` CSS added — overrides scroll-behaviour, removes slide-up on `.animate`/`.animate-fade`, zeroes stagger delays
- `@media (max-width: 480px)` — container padding reduced to 16px; `.feature-cards-4` goes 1 column
- `@media (max-width: 360px)` — extra-narrow breakpoint: page-hero h1 1.5rem, section heading 1.3rem, hero 220px, confirmation/workshop/testimonial boxes tightened
- Contrast audit: all existing colour values pass WCAG AA (muted #666 on white ≥ 5.7:1; footer rgba at all opacity levels ≥ 5.4:1)

## PHASE 6 — REMAINING PAGES (start here)

Files to touch: `build/corporate-upcycling.html`, `build/social-impact.html`, `build/workshop.html`, `build/my-account.html`, `build/cart.html`, `build/checkout.html`  
Primary CSS: `build/assets/css/style.css`

### Goal
Apply the same treatment as Phase 5 to the remaining pages:
1. Remove any inline styles
2. Wrap all h2s in `.section-heading`
3. Apply scroll animations (`.animate`, `.animate-fade`, `.stagger`)
4. Ensure section backgrounds use `section-alt` instead of hardcoded colors
5. Ensure card/grid components use the established CSS classes

### Priority order
1. `corporate-upcycling.html` + `social-impact.html` + `workshop.html` — public-facing, most visible
2. `my-account.html` — functional, minimal polish needed
3. `cart.html` + `checkout.html` — functional pages, check for inline style cleanup only

---

## REMAINING PHASES

| Phase | Goal | Primary file |
|-------|------|-------------|
| ~~1~~ | ~~Global CSS~~ | ~~done~~ |
| ~~2~~ | ~~Header & nav~~ | ~~done~~ |
| ~~3~~ | ~~Hero slider~~ | ~~done~~ |
| ~~4~~ | ~~Index.html sections + scroll animations~~ | ~~done~~ |
| ~~5~~ | ~~Shop, About, Contact~~ | ~~done~~ |
| ~~6~~ | ~~Remaining pages — corporate, social-impact, workshop, account, cart, checkout~~ | ~~done~~ |
| ~~7~~ | ~~Footer redesign — top border accent, back-to-top, social icon hover~~ | ~~done~~ |
| ~~8~~ | ~~Mobile & accessibility pass — 320px minimum, touch targets 44px, contrast audit~~ | ~~done~~ |

---

## ANIMATION SYSTEM (established in Phase 4, use consistently)

Classes live in `build/assets/css/style.css`, observer in `build/assets/js/main.js`:
- `.animate` → fade + slide-up, add to section or container
- `.animate-fade` → fade only, use for image-heavy or full-width sections
- `.stagger` → add to grid parent; each child `.animate` staggers 0.1s
- Observer fires at `threshold: 0.15`, respects `prefers-reduced-motion`

---

## KEY FACTS

- **Single CSS file**: `build/assets/css/style.css` — all styling lives here
- **No build step** — edits show immediately after browser refresh
- **Logo**: user manually set `height: 300px` — do not change it
- **Admin panel** lives at `/admin` — do NOT touch `admin/` directory
- **Images**: many are missing/placeholder — leave ALL placeholders as-is
- **CMS attributes**: `data-cms-text`, `data-cms-src`, `data-cms-bg`, `data-cms-href` — never remove these
- **Brand green**: `#2e7d32` — must remain primary color
- **Font**: Lato 400/700 — don't change
- **Run server**: `npm start` → http://localhost:3000

---

## WHAT NOT TO DO

- Don't touch `archive/` folder (read-only reference snapshots)
- Don't read `.env` (hook blocks it)
- Don't migrate to any framework
- Don't remove image placeholders or their notes
- Don't change JS functionality (cart, wishlist, CMS, account)
- Don't touch `admin/` routes or views
- Don't change the logo height (user set it manually to 300px)
