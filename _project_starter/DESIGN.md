# DESIGN.md

> Design system source of truth. Tokens and rules live here. Claude reads this whenever building or polishing UI.

---

## Brand Direction

- **3 words:** {e.g. clean, premium, calm}
- **References:** {URL1}, {URL2}, {URL3}
- **What to avoid:** {generic AI-template look, over-animation, glassmorphism, etc.}

---

## Tokens

### Colors
```css
--color-bg:        #__;
--color-fg:        #__;
--color-muted:     #__;
--color-primary:   #__;
--color-primary-fg:#__;
--color-accent:    #__;
--color-border:    #__;
--color-success:   #__;
--color-danger:    #__;
```

### Typography
- **Heading font:** {family}
- **Body font:** {family}
- **Scale:** 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60 / 72
- **Line-height:** tight 1.1 / normal 1.5 / relaxed 1.7

### Spacing scale
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128

### Radius
sm 4 / md 8 / lg 12 / xl 16 / 2xl 24

### Shadow
- `shadow-soft` — subtle card lift
- `shadow-pop` — focus / hover emphasis only

### Breakpoints
- Mobile: 360
- Tablet: 768
- Desktop: 1024
- Large: 1440

---

## Primitives (must exist before building pages)

- `<Container>` — max-width wrapper, responsive padding
- `<SectionWrapper>` — vertical rhythm + bg variants
- `<Button>` — primary / secondary / ghost / link
- `<Card>` — content card with hover state
- `<Badge>` — small label
- `<Reveal>` — scroll-in animation wrapper

---

## Motion Rules

- Default: 200–300ms ease-out.
- Use motion to reinforce hierarchy (hero, CTA, section reveal).
- No motion on body text. No bouncy springs on UI.
- Reduce-motion support: respect `prefers-reduced-motion`.

---

## Image Rules

- Use `next/image` everywhere.
- Hero images: 16:9 or 4:5, optimized to <250 KB.
- Gallery thumbs: 1:1, lazy-loaded.
- Always set descriptive alt text.

---

## Anti-Vibe Checklist (apply before client preview)

- [ ] No generic emoji-driven sections.
- [ ] No purple-blue gradient defaults.
- [ ] No "Lorem ipsum" anywhere.
- [ ] Consistent spacing rhythm across sections.
- [ ] Typography hierarchy is intentional and scannable.
- [ ] CTAs feel singular and clear, not stacked.
- [ ] Images are real, not stock-feeling.
- [ ] Page reads on mobile without horizontal scroll.
