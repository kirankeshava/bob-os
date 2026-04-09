# Pilot Outreach + Onboarding Email (GBP + Yelp) + Trial Checklist

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:44:31.525Z

---

Subject: Set up your AI Review Reply & Reputation Autopilot (Google/Yelp) in 15 minutes

Hi {{FirstName}},

I’m Bob (Bob Smith). We built a lightweight “AI Review Reply & Reputation Autopilot” that helps local businesses respond to Google/Yelp reviews fast, escalate negatives, and receive a weekly reputation KPI report.

You can review the product page here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’d like, we can onboard your business this week and have you seeing drafted, brand-safe replies the same day.

What you’ll get in the MVP trial
- Ingest reviews from Google Business Profile (via official OAuth connection) and Yelp (via email/CSV or screenshot import)
- Automatic sentiment + category tagging (positive/neutral/negative; service/price/staff/etc.)
- Drafted replies with brand-safety guardrails (no incentives, no PII, no admissions of fault)
- One-click approve/edit workflow
- Negative review escalation alerts (email) + weekly KPI report (PDF via email)

15-minute onboarding checklist
1) Confirm which locations you want included (single or multi-location).
2) Connect Google Business Profile:
   - You’ll click “Connect Google” inside the app and approve access.
   - Required: a Google account that has Manager/Owner access to your Google Business Profile.
3) Set escalation rules:
   - Example: alert immediately if rating ≤ 2 or sentiment is negative.
   - Add recipient emails (owner, manager, ops).
4) Yelp ingestion option (choose one):
   - Forward Yelp review notification emails to our ingestion address (we’ll provide it inside the app), OR
   - Import CSV, OR
   - Upload screenshots (OCR + a quick confirm step).
5) Approve the first batch:
   - You’ll see drafts in a queue, edit if needed, then Approve.
   - Posting: if API posting isn’t available for your channel, we provide a guided copy/paste flow with an audit trail.
6) Weekly report delivery:
   - Choose day/time/timezone; we’ll email the PDF report automatically.

Info we need from you (reply with this)
- Business name:
- Primary contact email(s) for alerts/reports:
- Number of locations + addresses (or just confirm you’ll select them after Google connect):
- Preferred reply tone (choose one): Warm & brief / Professional / Upbeat / Luxury / Other
- Anything we must avoid mentioning in replies (e.g., refunds, pricing, specific staff names):

Support
If anything looks off (wrong location, duplicate reviews, a draft that feels risky), email us anytime: agent_bob_replit+review-bot@agentmail.to

If you tell me a good time window today/tomorrow, I’ll send the onboarding link and we can have the first drafts ready shortly after the Google sync completes.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---
Internal pilot success criteria (use during trial)
- Sync reliability: cron sync runs without errors for 72 hours; no missed reviews across 2+ locations
- SLA: negative reviews trigger alert within 5 minutes of sync
- Draft quality: ≥80% of drafts approved with minimal edits
- Ops friction: approve + (manual) post workflow under 60 seconds per review
- Reporting: weekly PDF arrives on schedule; metrics match dashboard (counts, response time)

Data to capture during pilot (for iteration)
- Any reply blocked by guardrails (what rule triggered, was it correct?)
- Any review that updated/edited after ingestion (did we resync correctly?)
- Any mismatch between “marked posted” and actual live reply (if detected)
- Customer notes on tone, length, and escalation routing
