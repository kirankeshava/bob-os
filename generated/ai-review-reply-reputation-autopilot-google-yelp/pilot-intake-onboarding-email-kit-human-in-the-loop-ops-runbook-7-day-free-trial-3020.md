# Pilot Intake + Onboarding Email Kit + Human-in-the-Loop Ops Runbook (7-Day Free Trial)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:10:46.113Z

---

## 1) Pilot Intake Form (copy-ready)
Use as a Google Form or paste into an embedded form on the site.

**Header**: Review Reply & Reputation Autopilot — 7-Day Free Trial

**Intro text**: Thanks for trying our free 7-day pilot. We’ll draft brand-safe replies to your Google/Yelp reviews, escalate urgent issues, and send a weekly KPI summary. To get started, complete this form and forward your review notification emails to: **agent_bob_replit+review-bot@agentmail.to**. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Business + Contacts
1. **Business name** (short answer)
2. **Website URL** (short answer)
3. **Primary contact name + role** (short answer)
4. **Primary email** (short answer)
5. **Primary phone (optional)** (short answer)
6. **Escalation contact email(s)** (short answer; allow multiple)
7. **Escalation contact phone (optional)** (short answer)

### Locations (multi-location supported)
8. **How many locations?** (1 / 2-3 / 4-10 / 10+)
9. **Location list** (paragraph; request: Location name, address, main phone)
10. **Do you want separate reporting per location?** (Yes/No)

### Review Platforms
11. **Which platforms should we support in the pilot?** (checkboxes: Google Business Profile, Yelp, Other)
12. **If Other, list platforms** (paragraph)

### Brand Voice + Policies
13. **Brand voice** (multiple choice): Friendly & casual / Professional & warm / Luxury & concise / Other (describe)
14. **Do you offer refunds/credits?** (Yes/No/Case-by-case)
15. **Anything we must NOT say?** (paragraph; e.g., admissions of fault, medical claims, legal statements)
16. **Signature name for replies** (short answer; e.g., “— Mike, Owner”)

### Approval + SLA
17. **Approval mode** (multiple choice): 
   - Autopilot drafts sent to me; I approve via email
   - Autopilot drafts; post without approval (only for 4–5 stars)
   - All replies require approval
18. **Target response SLA** (multiple choice): 4 hours / 12 hours / 24 hours / 48 hours
19. **After-hours handling** (multiple choice): Pause SLA / Keep SLA / Escalate only urgent

### Escalation Rules (defaults pre-checked)
20. **Escalate immediately when:** (checkboxes)
   - <3 stars
   - Mentions: refund, lawsuit, lawyer, HIPAA/medical privacy, injury, safety hazard, harassment, discrimination
   - Contains profanity or threats
   - Mentions a staff member by name
   - “Never coming back” / “scam” / “fraud”
21. **Anything else to escalate?** (paragraph)

### Permission
22. **Permission to use anonymized before/after metrics as a case study** (Yes/No)

---

## 2) Customer Onboarding Emails (copy/paste)
Send from: **agent_bob_replit+review-bot@agentmail.to**
Always include website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Email 1 — Welcome + next steps (send immediately)
**Subject:** Your Review Reply Autopilot pilot — quick setup

Hi {{FirstName}},

You’re set for the free 7-day pilot of **AI Review Reply & Reputation Autopilot**.

**Step 1 — Forward review notifications**
Please forward your review notification emails (Google Business Profile and/or Yelp) to:
**agent_bob_replit+review-bot@agentmail.to**

**Step 2 — Confirm locations + voice**
If you haven’t yet, complete the 2-minute intake so we reply in your brand voice and route escalations correctly.

What you’ll get during the pilot:
- Drafted, brand-safe replies for new reviews
- Escalations for urgent/negative reviews
- A weekly KPI email: review volume, avg rating trend, response time, and escalations

About us / legitimacy link: {{BusinessSite}}

Reply to this email with any “never say” phrases or policies (refunds, medical/legal constraints), and we’ll lock them into your reply guardrails.

— Bob
AI Review Reply & Reputation Autopilot
{{BusinessSite}}

### Email 2 — Setup help (send 2–4 hours later if no forwarding observed)
**Subject:** Need help forwarding Google/Yelp reviews?

Hi {{FirstName}},

Quick check-in—want me to help you set up forwarding for review notifications?

If you can forward (or BCC) Google/Yelp review emails to:
**agent_bob_replit+review-bot@agentmail.to**
…we can start drafting replies the same day.

If you tell me your email provider (Gmail / Outlook / other), I’ll send the exact steps.

Reference page: {{BusinessSite}}

— Bob

### Email 3 — Day 2 value ping (send day 2)
**Subject:** Draft replies ready (approval takes ~30 seconds)

Hi {{FirstName}},

We’re monitoring incoming reviews and drafting replies.

Workflow:
1) You receive a draft reply by email
2) You reply “APPROVE” (or paste edits)
3) We send you the exact posting link + final reply text for Google/Yelp

If you want lighter-touch, we can also do: **auto-post 4–5 star replies** and only request approval for anything <4 stars.

— Bob
{{BusinessSite}}

### Email 4 — Day 6 renewal / conversion ask (still free in week 1; position next steps)
**Subject:** Pilot recap + should we keep this running?

Hi {{FirstName}},

Your 7-day pilot is almost complete. If you want, I’ll send a quick recap:
- New reviews handled
- Avg rating trend
- Response time
- Any escalations / unresolved items

If the workflow is saving you time, reply with:
1) **“Keep running”** and your preferred ongoing approval mode (approve-all vs only negatives)
2) Any additional locations you want included

Legitimacy link: {{BusinessSite}}

— Bob

---

## 3) Internal Ops Runbook (human-in-the-loop autopilot)
Goal: Deliver “autopilot” outcomes while avoiding platform/API risk. We ingest forwarded emails, draft with guardrails, get approval (email), then provide manual link-out instructions for posting.

### Daily SLA Targets (default)
- First response draft sent within: **12 business hours** (or client-selected)
- Escalations: notify within **1 hour** of detection during business hours

### Step A — Intake & Triage (every 2–4 hours)
1. Open inbox: **agent_bob_replit+review-bot@agentmail.to**
2. For each new review notification:
   - Identify client + location (by recipient alias, subject line, or mapping)
   - Extract: platform (Google/Yelp), reviewer name, star rating (if present), review text, review URL (if present), date/time
   - If parsing fails: tag as **NEEDS INFO** and email client requesting (platform, rating, text, link)
3. Create a log row (even if in a spreadsheet initially):
   - client, location, platform, rating, review_text, received_at, status=NEW

### Step B — Sentiment + Escalation Rules
Assign sentiment (rule-based first; LLM optional):
- Positive: 4–5 stars OR contains praise keywords
- Neutral: 3 stars OR mixed sentiment
- Negative: <=2 stars OR strong negative keywords

**Escalate immediately** if ANY:
- Rating < 3
- Keywords: refund, chargeback, lawsuit, lawyer, HIPAA, privacy, injury, unsafe, hazard, discrimination, harassment, fraud, scam
- Threats/profanity
- Mentions staff member by name (optional but recommended)

Escalation action:
- Email escalation contacts with summary + recommended next step + suggested private-resolution script
- Mark status=ESCALATED and start SLA clock for owner response

### Step C — Draft Generation (brand-safe)
Use these reply rules:
- Thank them, acknowledge specifics without admitting liability
- Never mention private info, order numbers, health details
- Offer next step: phone/email to resolve offline for negatives
- Keep length: 2–6 sentences
- Close with signature per client

Draft templates:
- **5-star:** gratitude + specific + invite back
- **3–4 star:** appreciation + address mild issue + invite to contact
- **1–2 star:** apology + take offline + no admissions + escalation note

### Step D — Approval Workflow (email-based)
Send an approval email to the client contact:
- Include: platform, location, rating, review text, proposed reply
- Ask them to respond with one of:
  - “APPROVE”
  - “EDIT:” + edits
  - “REJECT” + reason

If no response within SLA threshold:
- Send reminder at 12h (or client SLA/2)
- Escalate at 24h (or client SLA) if negative or high-risk

### Step E — Posting (manual link-out)
Because Phase 1 avoids posting APIs:
- If review link exists: include it and instructions:
  - “Open link → Reply → paste final text → Post”
- If link missing: send steps to find review in Google Business Profile/Yelp and paste reply.

Log posted_at when client confirms posted (or if client provides screenshot).

### Step F — Weekly KPI Report (every Monday 9am local)
Per client + per location:
- Reviews received
- Replies drafted
- Replies approved
- Estimated posted (confirmed)
- Avg star rating (week) + change vs prior week
- Median time-to-draft, median time-to-approval, median time-to-post
- # escalations (and categories)
- Oldest unresolved review age

Send a simple email report + 3 recommended actions (e.g., request photos, ask happy customers for reviews, address recurring complaint theme).

### Step G — Multi-location Handling
- Every review must map to (client, location).
- If unknown location: ask client once, then update mapping.
- Reports can be consolidated + per-location breakdown.

---

## 4) One-paragraph explainer to paste anywhere
“AI Review Reply & Reputation Autopilot drafts brand-safe responses to your Google/Yelp reviews, escalates urgent negatives, and sends weekly reputation KPIs. No risky platform automation in phase 1—we ingest forwarded review emails, draft replies in your brand voice, and you approve by email in seconds. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | Contact: agent_bob_replit+review-bot@agentmail.to”