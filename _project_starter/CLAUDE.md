# CLAUDE.md

> Persistent context for this project. Read this in full at the start of every session.
> Keep this file under ~200 lines. If it grows, move detail into `MEMORY.md` or `DESIGN.md`.

---

## WHY — Project Purpose

- **Client:** {Client name and business}
- **Goal of the website:** {One sentence — e.g. "Generate phone leads for a local service business"}
- **Primary visitor:** {Who and what they need}
- **Primary CTA:** {Call, WhatsApp, form, booking}

---

## WHAT — Tech & Structure

**Stack:**
- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui + Radix
- Motion (Framer Motion successor) for animations
- Lucide for icons
- Supabase (Auth, Postgres, Storage) — only if CMS scoped
- Cloudflare Pages for deploy
- GitHub for code

**Project structure:**
```
app/                # routes
components/         # ui primitives + sections
components/ui/      # shadcn components
lib/                # helpers, supabase client, utils
public/             # static assets
styles/globals.css  # tailwind layers + tokens
```

**Key files:**
- `MEMORY.md` — current project state, decisions, "where we are"
- `DESIGN.md` — design tokens and component rules
- `CLIENT_SCOPE.md` — locked deliverables, what's in/out

---

## HOW — Working Rules for Claude

### Workflow order (do not skip)
`Plan → Structure → Design System → Build → Test → Polish → Launch`

### Mandatory behavior
1. **Plan before code.** When given a feature, output a numbered plan and wait for my approval before editing files.
2. **Read `MEMORY.md` and `CLIENT_SCOPE.md`** at the start of every session before answering.
3. **Stay in scope.** If a request is outside `CLIENT_SCOPE.md`, flag it before doing it.
4. **Skeleton first.** Build functionality with placeholder visuals; apply design system at polish phase.
5. **Tokens before pages.** Never hardcode colors, sizes, or spacing — use the design tokens defined in `DESIGN.md`.
6. **Short responses.** Default to concise answers and code-only edits unless I ask for explanation.
7. **Update `MEMORY.md`** at the end of every meaningful session — what changed, what's next, open issues.

### Code rules
- TypeScript strict mode. No `any` unless justified inline.
- Server components by default; mark client components explicitly.
- Tailwind-only styling. No inline `style={{}}` except for dynamic values.
- Use shadcn primitives where they exist. Wrap, don't fork.
- Components must be responsive: 360, 768, 1024, 1440.
- Accessibility: semantic HTML, focus states, alt text, color contrast AA.
- Forms: validate with Zod, accessible error messages.

### Commands you can run
- `npm run dev` — local dev server
- `npm run lint` — lint
- `npm run typecheck` — TS check
- `npm run build` — production build
- Use Playwright MCP only at milestones (it costs credits).

### What NOT to do
- Don't run Playwright on every small change.
- Don't change tokens or design rules without my OK.
- Don't add libraries without asking.
- Don't generate placeholder lorem ipsum if real client copy is in `MEMORY.md`.
- Don't push to `main` directly. Work on branches.

---

## CMS Notes (only if scoped)

- **Editable fields:** {list}
- **Locked fields:** layout, tokens, components, code.
- Admin route: `/admin` with Supabase Auth, RLS on every table.

---

## Reference

- Skills available at `.claude/skills/` (see `06_Claude_Skills_Pack` originals).
- Standard prompts: `prompts.md` in `05_Claude_Code_Project_Starter`.
