---
name: anti-vibe-ui-polish
description: Use this skill to detect and fix generic AI-template / "vibe-coded" UI patterns in a website before client preview or launch. Trigger when the user mentions "anti-vibe", "polish", "feels generic", "looks like AI made it", "make it premium", "tighten up the design", or is in the polish phase of the workflow.
---

# Anti-Vibe UI Polish

Find and remove the patterns that make a website look AI-generated or "templatey". Replace them with intentional, brand-rooted choices.

## When to use

- After skeleton + design system applied, before client preview.
- After client says "it feels generic" or "doesn't look premium".
- Before final launch.

## Tells of a generic AI-template build (look for these)

1. **Purple-blue gradient hero** with a centered headline + two stacked CTAs.
2. **Emoji-as-icon** sections (✨ Fast, 🚀 Scalable, 💡 Smart).
3. **Three-column "features" grid** with no visual rhythm change throughout the page.
4. **Stock-feeling icons** that don't relate to the brand.
5. **Glassmorphism / neumorphism** without a reason.
6. **Massive hero headline + tiny subhead** with no CTA hierarchy.
7. **Identical card components** repeated across every section.
8. **Inconsistent spacing rhythm** (one section is 96px, the next is 48px, with no logic).
9. **Multiple "primary" CTAs per section** competing for attention.
10. **Lorem ipsum or AI-flavored copy** ("Unlock the future of …").
11. **Default Tailwind grays** everywhere instead of the project palette.
12. **Hover effects added because the framework gave them**, not because they help.

## Process

1. Scan each section and rate against the 12 tells above.
2. Output a numbered findings list. For each finding:
   - File and line range
   - Which "tell" it matches
   - Suggested fix (1 sentence)
3. STOP and wait for approval per item — do not auto-fix.
4. After approval, apply fixes one section at a time and show diffs.

## Replacement principles

- **Hero:** real photo OR purposeful asymmetry, never a centered gradient hero.
- **Sections:** vary rhythm — alternate dense / spacious, light / dark, full-bleed / contained.
- **CTAs:** one clear primary per section, secondary as a link or ghost button.
- **Icons:** brand-relevant, custom or carefully picked from a single icon family.
- **Copy:** specific, plain, sounds like the client — no AI-marketing voice.

## Output format

```
### Finding 1
- Location: components/sections/Hero.tsx:12-46
- Tell: #1 (purple-blue gradient hero)
- Fix: replace with a left-aligned hero using client photo on right, single primary CTA

### Finding 2
…
```

## Constraints

- Do not change tokens or primitives without my OK.
- Do not invent client copy — if a section needs words, flag it as TODO.
- Do not auto-apply fixes — surface findings, then proceed only on approval.
