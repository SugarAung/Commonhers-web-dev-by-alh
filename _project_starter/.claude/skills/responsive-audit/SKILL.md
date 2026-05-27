---
name: responsive-audit
description: Use this skill to systematically audit a website's responsive behavior across mobile, tablet, desktop, and large desktop, finding overflow, illegible text, broken layouts, and tap-target issues. Trigger when the user mentions "responsive audit", "mobile pass", "check breakpoints", "doesn't look right on phone", or is preparing for client preview or launch.
---

# Responsive Audit

A repeatable pass to verify the site works at every target breakpoint, not just the one you happen to be developing in.

## When to use

- Before client preview.
- After major layout changes.
- Before launch (final pass).

## Target viewports

| Device | Width × Height | Notes |
|--------|----------------|-------|
| Small phone | 360 × 740 | iPhone SE / older Android |
| Modern phone | 390 × 844 | iPhone 14/15 |
| Tablet | 768 × 1024 | iPad portrait |
| Desktop | 1280 × 800 | Standard laptop |
| Large desktop | 1440 × 900 | External monitor |

## Process

1. Run `npm run dev`.
2. For each route in scope, test all 5 viewports.
3. For each viewport, check the audit list below.
4. Record findings as a table — do not fix yet.
5. Group fixes by component (so each component is touched once).
6. Apply fixes, then re-run the audit on the affected viewports.

## Audit list (per page × viewport)

- [ ] No horizontal scroll
- [ ] Hero is legible without zoom (headline ≥ 28px on mobile)
- [ ] Body copy ≥ 16px on mobile, line length 50–75ch on desktop
- [ ] Tap targets ≥ 44×44px on mobile
- [ ] Nav: mobile menu opens, closes, links work, scroll-lock fine
- [ ] CTAs: visible above the fold on mobile
- [ ] Images: not stretched, not pixelated, lazy-loaded below fold
- [ ] Video embeds: 16:9 maintained, playable on mobile
- [ ] Forms: inputs full-width on mobile, error states visible
- [ ] Footer: contact info readable, links separated, not cramped
- [ ] Sticky elements (header / chat / cookie banner) don't cover content
- [ ] Section spacing rhythm holds across viewports

## Output format

```
| Page | Viewport | Issue | Severity | Fix idea |
|------|----------|-------|----------|----------|
| /    | 360px    | Hero headline overflows | High | Use clamp() font-size, reduce to 32px on <400 |
| /services | 768px | Cards stack awkwardly | Med | Switch to 2-col grid, gap-6 |
```

Severity: High / Med / Low.

## Constraints

- Do not "fix while auditing" — audit first, then batch fixes.
- Do not introduce new breakpoints; stick to 360/768/1024/1440.
- Use Tailwind responsive prefixes (`sm: md: lg: xl:`); avoid one-off media queries.
