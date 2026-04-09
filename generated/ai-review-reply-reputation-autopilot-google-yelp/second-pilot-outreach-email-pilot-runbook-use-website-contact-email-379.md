# Second-Pilot Outreach Email + Pilot Runbook (Use website + contact email)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:41:21.109Z

---

Subject: Can we manage your Google/Yelp reviews for 7 days (you stay in control)

Hi {{FirstName}},

I’m Bob Smith. We built an “AI Review Reply & Reputation Autopilot” that helps local businesses respond to Google Business Profile and Yelp reviews quickly, consistently, and safely.

What it does:
- Ingests new reviews (Google API when possible; otherwise email/CSV/screenshot import)
- Tags sentiment + themes (staff/service/price/etc.)
- Drafts brand-safe replies using guarded templates
- Lets you approve/edit with one click (you are always in control)
- Escalates negative reviews immediately via email alert
- Sends a weekly reputation KPI report (PDF + email)

We’re looking for 1–2 pilot businesses this week to validate the workflow across multiple locations. The pilot is 7 days, and you can stop at any time.

What you’ll get during the pilot:
1) Same-day setup
2) Draft replies for every new review
3) Negative-review SLA alerts
4) A weekly KPI report (volume, rating trend, response time, negative share, top themes)

What we need from you:
- Access to connect Google Business Profile (OAuth) OR forward review notification emails
- A preferred “reply style” (friendly/professional/short)
- Escalation recipients for negative reviews (owner/manager)

You can view our product site here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dta1w77k.picard.replit.dev/sites/1

If you’re open to a pilot, reply with:
1) Business name
2) Number of locations
3) Best email(s) for alerts

Or email us directly at: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot

---

PILOT RUNBOOK (Internal)

Goal
Validate end-to-end reliability on a real (non-test) Google Business Profile with 2+ locations over 48–72 hours: review sync, tagging, drafting, approvals, manual posting audit, alerts, and weekly report generation.

Success criteria
- OAuth connection succeeds and location mapping is correct
- Cron sync runs without duplicate ingestion and without missing updates
- Negative reviews trigger alerts within SLA (configured threshold)
- Approval gate blocks unsafe content (PII/incentives/admissions of fault)
- Weekly report sends successfully and KPIs match the dashboard

Pre-flight checklist
1) Create Business + Locations in Admin
- Admin → Businesses: create business record and set timezone
- Admin → Locations: ensure each location is enabled for sync and has threshold settings

2) Confirm integration readiness
- Integrations: Connect Google (OAuth)
- Select locations to enable syncing
- Confirm /api/health/integrations shows lastSyncAt and no lastError

3) Configure escalation routing
- Admin → Escalation: set threshold (rating<=2 or sentiment=negative)
- Add escalation recipient emails
- Verify Resend sending domain/config is working in environment

Pilot execution steps (Day 0)
1) Connect Google Business Profile
- Login as the business owner
- Complete OAuth and confirm locations appear

2) Run initial sync
- Trigger /api/cron/sync (or wait for scheduled)
- Verify reviews appear in /app/reviews queue

3) Validate pipeline
- For 3–5 reviews: ensure tags populated, drafts generated
- Approve one draft, reject one draft, edit+approve one draft
- Mark one as manually posted via guided flow to create audit trail

4) Validate alerts
- Import or identify a negative review; ensure alert email is sent and AlertEvent is stored

Pilot execution steps (Days 1–3)
1) Cron stability
- Confirm sync continues across all enabled locations
- Watch for quota/backoff warnings and ensure consecutiveFailures resets on success

2) Edge cases
- If a review is edited: verify it is upserted and re-queued if changed materially
- If a review disappears: verify system does not break; log discrepancy

3) Weekly report
- Trigger /api/cron/weekly-reports (or wait for scheduled)
- Verify email delivery + PDF rendering; compare KPIs to /app/admin/metrics and CSV export

Data to collect
- Time to first draft per new review
- Approval rate, posting rate
- Any blocked approvals due to guardrails (and whether false positives)
- Any sync failures per location and error messages

Close-out
- Send results summary to pilot customer
- Ask 3 questions: (1) Were drafts usable? (2) Was approval flow fast? (3) What would make you pay monthly?

Notes
- If the business cannot connect Google OAuth, use email forwarding ingestion or screenshot OCR import as fallback.
- Always keep “manual posting” as the default path unless API reply posting is available and permitted for the account/location.
