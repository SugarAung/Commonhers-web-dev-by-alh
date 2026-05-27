---
name: motion-polish
description: Use this skill to add restrained, intentional motion to a website — scroll reveals, hover transitions, page-load entrance, and CTA emphasis — without making it feel busy or AI-generic. Trigger when the user mentions "add animation", "motion polish", "feels static", "make it feel premium", or is in the polish phase.
---

# Motion Polish

Add motion that supports hierarchy and trust. Avoid motion-for-motion's-sake.

## When to use

- After visual polish but before launch.
- When the page feels "static" or "flat" but you can't say why.

## Motion principles (read first, every time)

1. **Motion reinforces hierarchy.** Bigger elements move first/longer; small elements get subtle motion.
2. **Default duration:** 200–300ms.
3. **Default easing:** `ease-out` for entries, `ease-in-out` for state changes.
4. **Reduced motion:** always respect `prefers-reduced-motion: reduce`.
5. **No springy/bouncy UI** unless the brand is playful and you've agreed it.
6. **Body copy doesn't animate.** Don't fade in paragraphs.
7. **One motion per intent.** A section reveal OR a hover lift, not both stacked.
8. **Hero gets the most motion budget.** Inner pages stay calm.

## Process

1. List the page sections in order.
2. For each section, decide:
   - `none` (most sections)
   - `enter` (subtle scroll-reveal on load)
   - `emphasis` (CTA pulse / underline draw / image parallax — sparing)
3. Use the `<Reveal>` primitive for `enter`. Use Motion variants for `emphasis`.
4. Add `prefers-reduced-motion` fallback that disables all non-essential motion.

## Recommended motion patterns

| Pattern | Where | Settings |
|---------|-------|----------|
| Fade + 8px rise | Section reveal on scroll | 300ms ease-out, threshold 0.2 |
| Hover lift | Cards | translateY(-2px) + shadow-pop, 200ms |
| Underline draw | Inline links | scaleX 0→1 from left, 200ms |
| Button press | All buttons | scale(0.98) on active, 100ms |
| Image parallax | Hero only | -10% to 10% Y, requestAnimationFrame, opt-in |

## Patterns to avoid

- Sequential "letter-by-letter" headline reveals.
- Logo / icon "popping in" with overshoot springs.
- Long page-load curtains.
- Auto-playing carousels.
- Hover effects on every element on the page.

## Output format

```
### Motion plan for {page}

| Section | Motion | Notes |
|---------|--------|-------|
| Hero | enter (fade + rise) | 400ms, headline first, CTA delayed 150ms |
| Trust strip | none | static, intentionally calm |
| Services | enter | per-card stagger 80ms |
| CTA | emphasis | underline draw on link hover |
```

Then apply, then verify with `prefers-reduced-motion: reduce` toggled on.

## Constraints

- No new motion library. Motion (Framer Motion) only.
- All animations must pass the reduced-motion check.
- Keep total page-weight increase from motion code ≤ 10 KB gzipped.
