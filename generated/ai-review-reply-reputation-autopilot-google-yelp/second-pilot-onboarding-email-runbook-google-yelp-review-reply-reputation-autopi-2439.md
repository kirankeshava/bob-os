# Second Pilot Onboarding Email + Runbook (Google/Yelp Review Reply & Reputation Autopilot MVP)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** script
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T21:24:17.248Z

---

Subject: Free 7‑day trial: We’ll draft & queue replies to your Google/Yelp reviews (with approvals)

Hi {{FirstName}},

I’m Bob Smith. We’re running a free 7‑day MVP pilot of our AI Review Reply & Reputation Autopilot.

What you get during the trial:
• New reviews ingested automatically from Google Business Profile (and Yelp via email/CSV/screenshot import)
• Brand‑safe draft replies generated automatically (with guardrails)
• A simple approval queue (one‑click approve/edit) before anything is posted
• Instant escalation alerts for negative reviews (so you can respond fast)
• A weekly KPI report (PDF + email): volume, rating trend, response time, negative share, top themes

How it works (2 minutes to start):
1) Open the app: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
2) Click “Connect Google” and authorize your Business Profile.
3) Select the location(s) you want to enable.
4) You’ll see drafts appear in the Review Queue. Approve/edit them, then use the guided “Copy/Paste” posting step (audit trail included).

If Yelp is important: forward Yelp review notification emails to us or upload a screenshot/CSV and we’ll ingest those too.

What I need from you:
• The best email(s) for escalation alerts (negative reviews)
• Your preferred reply tone (friendly/professional/brief) and any do‑not‑say rules
• Optional: a short ‘house style’ example of a reply you like

Reply here and I’ll get you set up today:
agent_bob_replit+review-bot@agentmail.to

—
Pilot runbook (internal checklist)

A) Pre-flight
1. Create Business + Locations in admin if not present.
2. Add escalation routing recipients + negative threshold (rating<=2 or sentiment=negative).
3. Invite owner via magic link (UserBusinessMembership).

B) Google Business Profile connection
1. Owner logs in -> Integrations -> Connect Google.
2. Confirm OAuth scopes granted and tokens stored.
3. Locations sync runs; owner selects enabled locations.
4. Verify /api/health/integrations shows lastSyncAt + no errors.

C) Ingestion and workflow validation
1. Trigger /api/cron/sync (or wait for scheduled cron).
2. Confirm new Reviews appear with raw payload stored.
3. Confirm tagging job ran (sentiment + categories) and DraftReply created.
4. Open review queue; approve 1–2 drafts; verify guardrail gate blocks unsafe content.
5. Use guided manual posting; confirm posted_manual timestamp + audit log.
6. Trigger negative review test (or import a negative review) and confirm escalation email alert.

D) Weekly report
1. Ensure business timezone + weekly day set.
2. Trigger /api/cron/weekly-reports for immediate validation.
3. Confirm PDF renders correctly and email deliverability (Gmail/Outlook).

E) Success criteria (24–72h)
• Sync health: each enabled location lastSyncAt < 6h and no repeated failures
• Funnel: >80% of ingested reviews drafted; >50% approved; response time improving
• Report: weekly email received and KPIs match expected counts

If any step fails, capture correlationId from logs/Sentry and link it in the issue note for rapid debugging.