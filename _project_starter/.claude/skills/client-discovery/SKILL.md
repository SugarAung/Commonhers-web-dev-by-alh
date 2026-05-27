---
name: client-discovery
description: Use this skill when starting a new client website project and the user has raw client answers (questionnaire responses, voice-note transcript, email replies) that need to be turned into a structured brief, sitemap, content inventory, and scope summary. Trigger when the user mentions "client brief", "discovery", "questionnaire answers", "kickoff", or pastes client responses.
---

# Client Discovery

Turn messy client answers into a clean, decision-ready brief.

## When to use

- User pastes raw client questionnaire answers.
- User has discovery notes from a call.
- User asks for a "brief" / "sitemap" / "content plan" from existing client info.

## Inputs you need

- Client answers from `02_Client_Discovery_Questionnaire`
- Asset inventory from `03_Client_Asset_Checklist`
- Reference websites the client shared

If any of those are missing, ask the user once — don't assume.

## Output

Produce a single Markdown document with these sections:

### 1. One-line Project Statement
"A {site type} for {audience} that {primary goal}, in a {3 brand words} style."

### 2. Goals & Success Metrics
- Primary goal (one)
- Secondary goals (max two)
- How we'll know it worked (e.g., calls per week, form submits)

### 3. Audience
- Who they are (1 short paragraph)
- What they need from this site
- What would scare them off

### 4. Sitemap
- List of pages
- Tag each page with: `Required` / `Optional` / `v2`
- For each page: 1-line purpose

### 5. Content Inventory
- For each page, list the sections in order
- Mark each section with: `Have content` / `Need content` / `Need to write together`

### 6. Design Direction
- 3 brand words
- Reference URLs the client liked + 1-line takeaway from each
- Initial palette (hex), font pairing, motion level (none / light / moderate)

### 7. Functional Scope
- Forms, CMS, integrations, gallery, video — only what's actually agreed

### 8. Out-of-Scope (explicit list)
- Anything that's likely to creep in: logo work, copywriting, e-commerce, multi-language, etc.

### 9. Open Questions for Client
- Numbered list. Limit to 5. Most-blocking first.

### 10. Suggested Timeline
- Discovery / Build / Feedback / Launch — rough week ranges only

## Constraints

- Do not invent client preferences. If unclear, put it in Open Questions.
- Keep prose tight. Use lists, not paragraphs, where possible.
- Do not promise SEO ranking, traffic, or conversion numbers.
