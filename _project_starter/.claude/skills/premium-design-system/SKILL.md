---
name: premium-design-system
description: Use this skill when defining or generating the visual design system for a new client website — tokens (colors, typography, spacing, radius, shadows), responsive breakpoints, and core primitive components (Button, Card, SectionWrapper, etc). Trigger when the user mentions "design system", "tokens", "DESIGN.md", "set up the look", "primitives", or is starting Phase 3 of the workflow.
---

# Premium Design System

Generate a complete, intentional design system from a brand direction. No defaults, no purple-blue gradients.

## When to use

- Starting Phase 3 of the workflow (Design System).
- Filling in `DESIGN.md` for a new project.
- User asks for tokens / primitives / a starting design.

## Inputs needed

- Brand direction: 3 words + 2–3 reference URLs
- Brand colors (or "you choose, here's the logo")
- Audience and tone (from the brief)

## Process

1. **Distill the references.**
   For each reference URL the client liked, write 1 line: what's worth borrowing (principle, not pixels).

2. **Pick a typographic system.**
   - One serif + one sans, OR a single high-quality sans (default to single sans for service businesses).
   - Define scale: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60 / 72.
   - Define line-heights: tight 1.1, normal 1.5, relaxed 1.7.

3. **Build the palette.**
   - `bg`, `fg`, `muted`, `primary`, `primary-fg`, `accent`, `border`, `success`, `danger`.
   - Verify text contrast ≥ AA on every bg.
   - Avoid: pure black, default Tailwind blue/purple gradients.

4. **Define spacing rhythm.**
   - Spacing scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128.
   - Section vertical padding: mobile 64, desktop 96+.

5. **Radius and shadow.**
   - Radius: sm 4 / md 8 / lg 12 / xl 16 / 2xl 24.
   - Shadow: `soft` (subtle lift), `pop` (focus emphasis only). No heavy drop shadows.

6. **Breakpoints.** 360 / 768 / 1024 / 1440.

7. **Primitives.**
   Generate these as TypeScript React components, Tailwind-only, props-typed:
   - `<Container>` — max-width + responsive padding
   - `<SectionWrapper>` — vertical rhythm + bg variant prop
   - `<Button>` — primary / secondary / ghost / link, with size variants
   - `<Card>` — content card with optional hover lift
   - `<Badge>` — small label
   - `<Reveal>` — scroll-in wrapper using Motion, respecting `prefers-reduced-motion`

8. **Update files.**
   - Write tokens into `styles/globals.css` as CSS variables and Tailwind theme.
   - Write primitives under `components/ui/`.
   - Update `DESIGN.md` with the final values.

## Output format

Show, in this order:
1. The 3-bullet brand distillation
2. Final tokens (as CSS variables + Tailwind theme block)
3. Primitive component file list (path + purpose)
4. The updated `DESIGN.md` content

## Constraints

- No hardcoded colors or sizes outside the token layer.
- No glassmorphism, no neumorphism, no purple-blue gradient hero.
- Motion stays restrained — see `motion-polish` skill.
- All primitives must be responsive and accessible.
