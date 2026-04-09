# Pilot Outreach Email + 20-Minute Onboarding Script (Google/Yelp Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** script
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:22:31.090Z

---

Subject: Want us to handle your Google/Yelp review replies this week (with approval + weekly KPI report)?

Hi {{FirstName}},

I’m Bob Smith. We’re piloting an MVP called “AI Review Reply & Reputation Autopilot” that drafts brand-safe responses to Google Business Profile (and Yelp) reviews, escalates negative reviews fast, and sends a weekly reputation KPI report (ratings trend, response time, negative share, and top themes).

You can view the app here for legitimacy/preview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-l5vctj3x.picard.replit.dev/sites/1

If you’re open to a quick pilot, the workflow is simple:
1) Connect Google Business Profile (read reviews + draft replies). 
2) New reviews land in an approval queue.
3) You approve/edit with one click.
4) We either post via API where allowed or provide a guided copy/paste step with an audit trail.
5) Negative reviews trigger immediate escalation alerts.
6) You get a weekly PDF KPI report by email.

What we need from you (20 minutes):
- A time for a quick setup call
- The email address that owns/manages your Google Business Profile
- (Optional) Yelp: forward review notification emails to our inbox or export/import via CSV

Reply to this email with 2–3 times that work, or send a single “yes” and we’ll send the onboarding link.

Contact: agent_bob_replit+review-bot@agentmail.to

— Bob Smith
AI Review Reply & Reputation Autopilot


20-minute onboarding call script (internal)

Goal: Connect GBP, enable locations, verify ingestion→draft queue→approval→manual post audit, configure SLA alerts, and confirm weekly report email.

Minute 0–3: Qualify + expectations
- “How many locations do you have? Who replies today? What’s the biggest pain—time, tone, or consistency?”
- “Do you want a conservative tone (short, professional) or warmer (more personable)?”
- Confirm escalation preference: “Any review ≤2 stars or negative sentiment triggers an alert—who should receive it?”

Minute 3–8: Account setup
- Add them as a user (magic link invite) and confirm they can log in.
- Navigate to Integrations → Google → Connect.
- Confirm the correct Google account is used.
- Select locations to enable syncing.

Minute 8–12: Verify sync and pipeline
- Run a sync (or wait for cron): confirm reviews appear.
- Open one newly ingested review: confirm sentiment/category tags.
- Confirm draft reply is generated and complies with guardrails.

Minute 12–15: Approval workflow + posting
- Have owner edit/approve one reply.
- If API posting is not enabled/available, demonstrate guided copy/paste posting step.
- Confirm audit trail shows who approved and when it was marked posted.

Minute 15–18: SLA alerts + routing
- Set thresholds: rating<=2 OR sentiment=negative.
- Add recipient emails and escalation rules.
- Trigger a test alert (simulate) to confirm deliverability.

Minute 18–20: Weekly report
- Confirm report recipients.
- Confirm timezone/day.
- Send a test weekly report so they see the format.

Close
- “For the next 7 days we’ll monitor sync health and reply drafts; if anything looks risky (legal threats/PII), it will be blocked from approval and escalated.”
- Confirm next check-in time.

Notes/guardrails to mention (if asked)
- We avoid incentives, admissions of fault, sensitive personal info, and risky legal/medical claims.
- Drafts are blocked from approval if policy checks detect PII or disallowed content.
