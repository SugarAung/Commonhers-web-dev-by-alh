---
name: launch-checklist
description: Use this skill to run the final pre-launch verification of a client website — code health, content, SEO, accessibility, performance, deploy, domain, SSL, and CMS — before sending the live site to the client. Trigger when the user mentions "launch", "go live", "ship it", "final QA", "pre-launch", or is in the final phase of the workflow.
---

# Launch Checklist

A repeatable pre-launch verification. Run every item; do not skip just because "it worked yesterday".

## When to use

- Within 24 hours of pushing to production.
- After client final approval.

## 1. Code health

- [ ] `npm run lint` — clean
- [ ] `npm run typecheck` — clean
- [ ] `npm run build` — clean, no warnings about images/server-only/etc
- [ ] No `console.log` left in app code
- [ ] No `TODO` / `FIXME` left in shipped code (move to MEMORY.md if deferred)
- [ ] All dependencies up-to-date enough; no critical CVEs

## 2. Content

- [ ] All client copy in place (no Lorem, no AI-flavored placeholder)
- [ ] All images compressed, correctly cropped, alt text on every one
- [ ] YouTube embeds use the right videos and lazy-load
- [ ] Phone, email, address, hours match the client's discovery answers
- [ ] Footer year and copyright correct
- [ ] Favicon in place (16, 32, 180, 512 sizes if needed)
- [ ] Open Graph image in place (1200×630)

## 3. SEO basics

- [ ] Each page has a unique `<title>` and meta description
- [ ] Canonical tags set
- [ ] `sitemap.xml` accessible
- [ ] `robots.txt` correct (allow in production, disallow on preview branches)
- [ ] Structured data (LocalBusiness / Organization / FAQ) where relevant
- [ ] Google Analytics or Plausible installed and verified

## 4. Forms & CTAs

- [ ] Contact form: validation works, submit works, email arrives at correct inbox
- [ ] WhatsApp button opens correct number with prefilled message (mobile)
- [ ] Phone CTA dials correct number on mobile
- [ ] All external links open in a new tab where appropriate
- [ ] No 404s on internal links (run a link checker)

## 5. CMS / Admin (if scoped)

- [ ] Auth login works for the client account
- [ ] RLS verified — non-owner cannot read/write
- [ ] Editing a field updates the live page
- [ ] Image upload works, optimized, alt-text field present
- [ ] Backup or export plan documented

## 6. Performance

- [ ] Lighthouse mobile: Perf ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] LCP under 2.5s on a 4G mobile profile
- [ ] No layout shift (CLS < 0.1)
- [ ] Fonts preloaded, font-display: swap

## 7. Accessibility

- [ ] Keyboard navigation reaches every interactive element
- [ ] Focus states visible everywhere
- [ ] Alt text on all images
- [ ] Color contrast AA across the site
- [ ] Headings in correct order (one H1 per page)

## 8. Responsive (run `responsive-audit` skill)

- [ ] Pass on 360 / 390 / 768 / 1280 / 1440

## 9. Playwright MCP final pass

Run only the scoped flow list (see `prompts.md` → Playwright Final QA prompt).

- [ ] All flows pass
- [ ] Screenshots saved for record

## 10. Deploy & domain

- [ ] Production build deploys to Cloudflare Pages from `main`
- [ ] Custom domain connected
- [ ] DNS propagated (verify from a different network / phone hotspot)
- [ ] SSL active, no mixed-content warnings
- [ ] `www` and apex both resolve correctly
- [ ] 404 page renders on bad URL

## 11. Smoke test on live domain

Use a real phone (not just devtools) and a different browser:
- [ ] Homepage loads quickly
- [ ] Mobile menu works
- [ ] Primary CTA fires
- [ ] Contact form delivers a real test email
- [ ] CMS login still works (if scoped)

## 12. Handover

- [ ] `09_Launch_Checklist` filled in and shared
- [ ] `10_Client_Handover_Guide` sent
- [ ] Loom walkthrough recorded (15 min) showing CMS basics
- [ ] Credentials documented in client's password manager (never in email)
- [ ] `MEMORY.md` updated with final state and maintenance notes

## Output format for the run

```
✅ Code health: pass
✅ Content: pass
⚠️  SEO: missing OG image on /about (will fix before publishing)
✅ Forms & CTAs: pass
…
```

End with: GO / NO-GO recommendation.

## Constraints

- A NO-GO on any P0 item blocks launch.
- Do not announce launch to the client until every box is checked.
