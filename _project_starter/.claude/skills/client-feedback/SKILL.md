---
name: client-feedback
description: Use this skill to convert raw, unstructured client feedback (emails, voice notes, comments on a preview link) into a clean, prioritized, in-scope task list. Trigger when the user pastes client feedback, mentions "client said", "round of changes", "feedback list", or is in the test/polish phase.
---

# Client Feedback Triage

Turn messy client feedback into a clear, prioritized engineering plan — and protect scope.

## When to use

- Client returned the `08_Client_Feedback_Form` filled in.
- User pastes a long email/voice-note transcript with feedback.
- After preview link review.

## Process

1. **Read all feedback first.** Do not start fixing item-by-item.

2. **Classify each item** into one of:
   - `bug` — something broken (link doesn't work, mobile overflow)
   - `content` — copy / image / video swap (in-scope)
   - `design-tweak` — small visual adjustment (within tokens, in-scope)
   - `scope-change` — design-system change, new page, new feature, integration (out-of-scope)
   - `vague` — "make it pop", "feels off", "I don't love it" (needs clarification)

3. **Cross-check against `CLIENT_SCOPE.md`.** Anything in `scope-change` needs a quote, not a fix.

4. **Cluster `vague` items.** Ask the client one focused question per cluster — never more than 3 questions back.

5. **Prioritize the actionable items**:
   - `P0` blockers (anything broken)
   - `P1` content (copy + image swaps the client provided)
   - `P2` in-scope design tweaks
   - `P3` nice-to-haves

6. **Output a triage report** (see format below) and STOP. Wait for approval before fixing.

## Output format

```
## Feedback Triage — {date}

### P0 — Blockers (do first)
- [ ] {item} — file/section, 1-line fix idea

### P1 — Content updates
- [ ] {item}

### P2 — In-scope design tweaks
- [ ] {item}

### P3 — Nice-to-haves
- [ ] {item}

### Out of scope (needs separate quote)
- {item} — why it's out of scope, rough effort

### Needs clarification (questions for client)
1. {one focused question}
2. {one focused question}
```

## Reply-to-client template (after triage)

```
Hi {client},

Thanks for the feedback. Here's how we're handling it:

We'll take care of:
- {P0 + P1 + P2 highlights, plain language}

A couple of items go beyond the original scope and would need a separate small quote:
- {scope-change items}

Could you help us with these quick questions so we get it right first time?
1. {question}
2. {question}

We'll send the next preview by {date}.
```

## Constraints

- Never silently absorb scope changes. Flag, quote, then decide together.
- Don't promise a date in the reply unless you've added the work to MEMORY.md.
- Don't auto-implement anything from this skill — triage only.
