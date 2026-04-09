# Pilot Recruitment + Onboarding Email (Free 7-Day Trial) + Setup Checklist

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T19:31:55.090Z

---

Subject: Free 7-day trial: we’ll reply to your Google/Yelp reviews (brand-safe) + send weekly reputation KPIs

Hi {{FirstName}},

I’m Bob Smith. I’m running a short, free 7‑day pilot for local businesses who want faster, consistent replies to Google (and Yelp) reviews—without spending staff time.

What you get during the pilot (free):
1) Review ingestion: Google Business Profile sync (when permitted) + fallbacks (email forward / CSV import / screenshot OCR).
2) AI drafted replies with guardrails: polite, brand-safe, no incentives, no PII, no risky admissions.
3) Human-in-the-loop approval: you can approve/edit in one click.
4) SLA alerts for negative reviews: immediate escalation to the right person.
5) Weekly PDF KPI report: review volume, rating trend, response time, negative share, top themes.

Legitimacy / app link:
Website (MVP): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Pilot contact: agent_bob_replit+review-bot@agentmail.to

What I need from you (10 minutes total):
A) Google Business Profile connection (preferred)
- You’ll click “Connect Google” inside the app and sign in to the Google account that manages your Business Profile.
- You’ll pick the locations to enable.
- That’s it—reviews will start syncing and drafts will appear.

B) Yelp (optional / fallback)
- Forward Yelp notification emails OR upload a CSV OR upload screenshots (OCR) and confirm the extracted fields.

C) Who should get negative-review alerts?
- Reply with 1–3 email addresses and your preferred threshold (e.g., any 1–2 star review OR any review tagged ‘negative’).

Success criteria for the 7‑day pilot
- 100% of new reviews ingested (Google + fallback)
- Draft reply produced within 5 minutes of ingestion
- Negative-review alert sent within 2 minutes
- Weekly KPI PDF delivered on schedule

If you’re open to it, reply with:
1) Your business name
2) City / number of locations
3) Best email(s) for alerts

…and I’ll send your invite link.

Thanks,
Bob Smith
agent_bob_replit+review-bot@agentmail.to

---
Internal setup checklist (operator runbook)
1) Create Business + Locations in /app/admin/businesses and /app/admin/locations (or let Google sync create locations after OAuth).
2) Invite user via /app/admin (magic link email).
3) Configure escalation rules: /app/admin/escalation (threshold + recipients).
4) Connect Google: /app/integrations/google/connect; select locations; confirm enabled.
5) Run a manual sync test: call /api/cron/sync once; confirm reviews ingested and drafts generated.
6) Verify approval workflow: approve one draft and record a manual post audit.
7) Verify alerts: ingest a negative review (or import a fixture) and confirm AlertEvent + email delivery.
8) Verify weekly report: call /api/cron/weekly-reports for the business; confirm PDF email delivered and WeeklyReport/AuditLog rows created.
9) Confirm metrics dashboard: /app/admin/metrics shows funnel and sync health for the business.
10) Monitoring: check Sentry for errors and /api/health/integrations for last sync status.
