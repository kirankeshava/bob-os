# Pilot Outreach + Onboarding Email (GBP + Yelp) + 15-min Setup Script

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:58:17.225Z

---

Subject: Quick setup: your AI Review Reply & Reputation Autopilot (Google/Yelp)

Hi {{FirstName}},

I’m Bob. I built a simple “Reputation Autopilot” that drafts brand-safe replies to your Google/Yelp reviews, escalates negatives fast, and sends a weekly KPI report so you can see impact without spending time in review inboxes.

You can see the app here (legitimacy/preview link):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

If you’re open to a short pilot, we can have this running in ~15 minutes:

What you’ll get during the pilot
- New reviews ingested automatically (Google Business Profile API when allowed)
- Sentiment + theme tagging (service/price/staff/etc.)
- Draft replies with brand-safe templates + guardrails (no incentives, no PII, no admissions)
- One-click approve/edit, plus an audit trail
- Negative-review SLA alerts (email) with escalation routing
- Weekly PDF/email KPI report (volume, avg rating trend, response time, negative share, themes)

What I need from you
1) The best email(s) to receive escalation alerts + weekly report
2) Your preferred reply tone (friendly/professional/brief), and any “never say” phrases
3) (Optional) A logo + a 1–2 sentence brand description for report branding

Google setup (preferred)
- You connect your Google Business Profile via OAuth inside the app.
- You choose which locations to sync.
- Reviews will begin syncing automatically; you’ll see drafts appear in the queue.

Yelp setup (fallback options)
Because Yelp’s official API is limited for reviews, we support:
- CSV import (we provide a template)
- Email-forwarding of Yelp notification emails
- Screenshot upload (OCR) for quick import when needed

To start, just reply “YES” and tell me:
- Business name
- Number of locations
- Which platform matters most (Google, Yelp, or both)

Or email me directly at: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob
AI Review Reply & Reputation Autopilot

---

15-minute onboarding call/script (internal checklist)

Goal: connect GBP (or set up fallback), confirm escalation + tone, verify end-to-end: ingest → tag → draft → approve → post/audit → alerts → report.

1) Confirm basics (2 min)
- Business name + locations
- Primary goal: respond faster, improve rating, prevent churn, win back unhappy customers
- Confirm who approves replies (owner/manager)

2) Connect Google Business Profile (5 min)
- Navigate: Integrations → Google → Connect
- OAuth approve scopes
- Select locations to enable syncing
- Click “Sync now” (or confirm next cron window)
- Verify: at least 1–5 reviews appear in queue

3) Set escalation rules (3 min)
- Define negative: rating ≤2 OR sentiment=negative
- Escalation recipients: {{emails}}
- SLA: alert immediately; optional reminder if not approved/posted within X hours

4) Configure reply style + guardrails (3 min)
- Tone: friendly/professional/short
- Sign-off format (e.g., “—The {{Business}} Team”)
- Disallowed phrases (refund promises, incentives, legal admissions)
- Confirm no PII policy

5) Prove workflow (2 min)
- Open one drafted reply → edit → Approve
- Mark as posted (manual copy/paste flow) to record audit
- Trigger a test negative alert (if available) or verify alert routing settings

6) Confirm weekly report (end)
- Confirm timezone + weekday
- Confirm report recipients
- Preview last week’s metrics in Admin → Metrics

Success criteria for pilot
- Drafts generated for 100% of new Google reviews
- Negative reviews alert within minutes of ingestion
- Median approval time reduced vs baseline
- Weekly report delivered reliably

Support channel
- Email: agent_bob_replit+review-bot@agentmail.to
- Include screenshots and the location name if anything looks off (sync issues are tracked per location).