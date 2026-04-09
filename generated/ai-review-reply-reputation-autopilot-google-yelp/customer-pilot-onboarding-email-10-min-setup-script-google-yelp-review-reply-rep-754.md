# Customer Pilot Onboarding Email + 10-Min Setup Script (Google/Yelp Review Reply & Reputation Autopilot MVP)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T09:43:30.063Z

---

Subject: Set up your Review Reply Autopilot (10 minutes) — we’ll draft replies + weekly KPI report

Hi {{FirstName}},

I’m Bob from AI Review Reply & Reputation Autopilot. We help local businesses respond to Google/Yelp reviews quickly with brand‑safe drafts, escalate negatives, and send a weekly reputation KPI report.

To get you set up for a pilot, here’s the fastest path (about 10 minutes):

1) Confirm your business details
Reply to this email with:
- Business name
- Primary contact email(s) for alerts
- Your preferred reply tone (choose one): Friendly / Professional / Warm & formal
- Anything we should never say in public replies (e.g., warranty wording, policy constraints)

2) Connect Google Business Profile (optional but recommended)
- Visit: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Sign in and go to Integrations → Google → Connect
- Select the locations you want to sync

If Google API access isn’t possible for your account, no problem—use one of the fallbacks below.

3) Choose an ingestion method (fallback options)
A) Forward review emails (easy)
- Forward Google/Yelp review notification emails to: agent_bob_replit+review-bot@agentmail.to
We’ll ingest them and start drafting replies automatically.

B) Upload a screenshot (works even without exports)
- Take a screenshot of the review and upload it in Reviews → Import → Screenshot
We’ll OCR it and ask you to confirm the extracted fields once.

C) Import CSV (bulk)
- Export your reviews (if available) and import via Reviews → Import → CSV

4) Approve replies (human-in-the-loop)
- You’ll see new reviews in the Draft Queue.
- Click a review → edit if needed → Approve.
- Posting: if API posting isn’t enabled, you’ll get a guided copy/paste flow with an audit trail so you can post in seconds.

5) Negative review escalation SLA
We’ll alert you when:
- Rating <= 2 OR sentiment is negative (configurable)
You can route alerts to yourself, a manager, or a shared inbox.

6) Weekly KPI report
Every week you’ll receive a PDF + email summary including:
- Review volume, average rating trend, negative share
- Response time metrics (avg/median)
- Top themes (service/price/staff/etc.)
- Per-location breakdown (if multiple locations)

Pilot success criteria (what we’re validating)
- Reviews are ingested reliably (Google API or fallback)
- Drafts are generated brand-safely and quickly
- Approval workflow is simple (approve/edit in one click)
- Negative review alerts arrive fast
- Weekly report matches what you care about (KPIs + themes)

If you want, reply with your preferred time window and I’ll guide you through setup over email step-by-step.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

---
Internal 10-minute setup script (for us)
1) Create Business + Locations in /app/admin/businesses and /app/admin/locations (or confirm auto-created via Google connect)
2) Add escalation routing in /app/admin/escalation (recipients, threshold)
3) Invite owner user via magic link; confirm membership
4) If Google connect: verify selected locations enabled; run /api/cron/sync once and confirm reviews appear
5) If email forwarding: send sample Yelp/Google notification to ingest endpoint and confirm parsed
6) Generate one draft, run guardrails, approve, mark manual post
7) Trigger weekly report for the business via /api/cron/weekly-reports (or dev trigger) and confirm email/PDF renders correctly
8) Confirm metrics page shows funnel + sync health

Notes on expectations
- We do not auto-post unless API access is enabled; otherwise we provide guided copy/paste with audit logs.
- Drafts are brand-safe by design (no PII, no incentives, no admissions of fault, no defamatory language). If content is risky, approval is blocked and we flag it for manual handling.