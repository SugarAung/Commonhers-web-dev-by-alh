# Project Starter Scaffold

Copy the contents of this folder into the **`code/`** directory of every new client project.

## What's inside

```
_project_starter/
├── CLAUDE.md              ← persistent context for Claude Code
├── MEMORY.md              ← session-by-session running log
├── DESIGN.md              ← design tokens + component rules
├── CLIENT_SCOPE.md        ← locked deliverables for this client
└── .claude/
    └── skills/            ← 7 reusable skills (auto-discovered)
        ├── client-discovery/
        ├── premium-design-system/
        ├── anti-vibe-ui-polish/
        ├── responsive-audit/
        ├── motion-polish/
        ├── client-feedback/
        └── launch-checklist/
```

## How to use it for a new client

```powershell
# 1. Make a project home for this client
mkdir D:\Web dev project\Clients\acme-bakery
cd    D:\Web dev project\Clients\acme-bakery
mkdir docs, assets, code

# 2. Drop the scaffold into the code folder
xcopy /E /I "D:\Web dev project\My workflow\_project_starter\*" ".\code\"

# 3. Scaffold Next.js inside `code` (or initialize whatever stack you're using)
cd code
npx create-next-app@latest . --ts --tailwind --eslint --app

# 4. Open Claude Code in the `code` folder
# Claude will auto-read CLAUDE.md, MEMORY.md, and discover the skills.
```

## What goes where, per project

| Lives in | Contents |
|----------|----------|
| `Clients/{name}/code/` | The Next.js app + scaffold files. This is the GitHub repo. Claude Code runs here. |
| `Clients/{name}/docs/` | The client's filled-in `02 Discovery`, `04 Scope`, `08 Feedback`, etc. Internal — not in the repo. |
| `Clients/{name}/assets/` | Logo, photos, videos the client sent. Move to Supabase Storage / `public/` once the build starts. |

## Updating the scaffold over time

When you improve a template inside `My workflow/05_Claude_Code_Project_Starter` or `My workflow/06_Claude_Skills_Pack`, re-sync this scaffold:

```powershell
# From the root of My workflow
copy "05_Claude_Code_Project_Starter\CLAUDE.md"        "_project_starter\CLAUDE.md" /Y
copy "05_Claude_Code_Project_Starter\MEMORY.md"        "_project_starter\MEMORY.md" /Y
copy "05_Claude_Code_Project_Starter\DESIGN.md"        "_project_starter\DESIGN.md" /Y
copy "05_Claude_Code_Project_Starter\CLIENT_SCOPE.md"  "_project_starter\CLIENT_SCOPE.md" /Y
xcopy /E /Y /I "06_Claude_Skills_Pack\*"               "_project_starter\.claude\skills\"
```

Active client projects don't auto-update — decide per-project whether to backport the new version.
