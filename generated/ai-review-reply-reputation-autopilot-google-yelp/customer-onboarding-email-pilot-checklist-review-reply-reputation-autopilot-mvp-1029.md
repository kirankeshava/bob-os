# Customer Onboarding Email + Pilot Checklist (Review Reply & Reputation Autopilot MVP)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T12:26:49.272Z

---

Subject: Get your reviews on autopilot — connect Google/Yelp and start approving replies

Hi {{firstName}},

Thanks for trying the AI Review Reply & Reputation Autopilot. This MVP helps you respond to Google/Yelp reviews quickly and consistently, escalates negative reviews, and sends a weekly KPI report.

Legitimacy / product page (feel free to share internally): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support email: agent_bob_replit+review-bot@agentmail.to

---
SETUP (10–20 minutes)

1) Connect Google Business Profile (best automation)
- Go to Integrations → Google → Connect.
- Select the locations you want synced.
- New reviews will auto-import and appear in your Draft Queue.

2) Yelp ingestion (choose one)
A) CSV import
- Reviews → Import → Yelp CSV.
- Upload your file (we validate columns and show a preview).

B) Email forwarding
- Forward Yelp notification emails to your unique ingest address (shown in the app).

C) Screenshot OCR
- Reviews → Import → Screenshot.
- Upload a screenshot of a review; confirm the extracted fields.

3) Set escalation rules (negative review alerts)
- Admin → Escalation.
- Choose what counts as “negative” (ex: rating ≤ 2 or sentiment=negative).
- Add recipients (owner/manager emails). When a negative review arrives, we notify immediately.

4) Configure weekly report schedule
- Admin → Businesses.
- Pick weekday + timezone. You’ll receive a PDF + email summary including:
  • review volume + avg rating trend
  • response time
  • negative share
  • top themes (service/price/staff/etc.)

---
DAILY WORKFLOW (2–5 minutes/day)

1) Review Draft Queue
- Open Reviews → Queue.
- Click a review to see the suggested reply.

2) Approve / Edit
- Edit the draft if needed.
- Click Approve.

3) Post (two modes)
- If API posting is available: it will post automatically.
- Otherwise: the app shows a guided copy/paste step and records an audit trail (who posted + when).

Guardrails are enforced before approval (PII redaction + policy checks) to keep replies brand-safe.

---
PILOT CHECKLIST (so we know it’s working)

Day 0 (Setup)
- [ ] Google connected (or Yelp import configured)
- [ ] At least 1 location enabled
- [ ] Escalation recipients added
- [ ] Weekly report schedule set

Day 1–2 (Flow validation)
- [ ] At least 3 reviews ingested
- [ ] Draft replies generated for each
- [ ] At least 1 approved and marked posted (manual flow OK)
- [ ] Negative-review alert tested (we can simulate via manual import)

Day 3–7 (Stability)
- [ ] Cron sync running without errors (Admin → Metrics → Sync Health)
- [ ] Response-time KPI looks correct (ingested → posted)
- [ ] Weekly report delivered and readable on mobile

If anything looks off (missing reviews, duplicates, sync errors, or drafts blocked by guardrails), reply to this email with a screenshot of the issue and the location name. We can trace it quickly using the built-in audit logs.

Best,
Bob
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to
