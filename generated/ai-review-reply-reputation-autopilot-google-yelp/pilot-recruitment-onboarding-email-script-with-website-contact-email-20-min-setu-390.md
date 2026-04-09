# Pilot Recruitment + Onboarding Email Script (with website + contact email) + 20-min Setup Checklist

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** script
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:01:51.685Z

---

Subject: Free “Review Reply Autopilot” pilot — we draft your Google/Yelp review replies (you approve)

Hi {{FirstName}},

I’m Bob. I’m running a small pilot for an AI-assisted “Review Reply & Reputation Autopilot” that helps local businesses respond to Google and Yelp reviews quickly and consistently.

What it does:
- Ingests your new reviews (Google Business Profile API when possible; Yelp via email/CSV/screenshot)
- Tags sentiment + themes (service, price, staff, etc.)
- Drafts brand-safe replies with guardrails
- You approve/edit in one click
- Escalates negative reviews immediately to the right person
- Sends a weekly KPI report (volume, rating trend, response time, negative share, top themes)

Why I’m reaching out: I’m looking for 1–2 local businesses to run a free pilot this week in exchange for feedback. If you’re currently too busy to reply to reviews (or replies aren’t consistent), this should save time and protect your reputation.

You can see the app here (legitimacy link):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open to it, reply to this email with:
1) Your business name
2) The best email(s) to receive negative-review alerts
3) Whether you want replies to be “warm and grateful” or “short and professional”

I can also hop on a 10–15 minute call to get you connected and ingest the first batch.

Thanks,
Bob Smith
agent_bob_replit+review-bot@agentmail.to

---

20-minute Pilot Setup Checklist (operator runbook)

Goal: Connect one real business end-to-end: Google sync (if allowed) or fallback ingest → drafts generated → approval flow tested → escalation alerts verified → weekly KPI report delivered.

A) Preflight (2 minutes)
1. Confirm the customer has access to Google Business Profile (Manager/Owner). If not, plan fallback ingest (CSV/email/screenshot).
2. Collect escalation recipients (owner + optional manager emails).
3. Confirm preferred reply tone: (a) Warm & friendly, (b) Short & professional.

B) Onboard in Admin (3 minutes)
1. Create Business record.
2. Create/confirm Locations.
3. Add Escalation rule: negative if rating <=2 OR sentiment=negative; recipients = provided emails.
4. Invite customer user via magic link; confirm they can log in.

C) Google Integration (8 minutes)
1. In app: Integrations → Google → Connect.
2. Complete OAuth and select locations to sync.
3. Run sync (or wait for cron). Confirm reviews appear in queue.
4. Verify Sync Health in /app/admin/metrics: lastSyncAt populated; no lastError.

D) Fallback Ingest (if Google not available) (5 minutes)
Choose one:
1) Email forward: have customer forward review notification emails to the inbound address configured; confirm parsing creates Review rows.
2) CSV: send the CSV template; import and verify fields.
3) Screenshot OCR: upload a Yelp/Google review screenshot; confirm extracted fields; finalize import.

E) Workflow Verification (2 minutes)
1. Confirm tagging ran (sentiment + category present).
2. Confirm drafts generated and show in approval queue.
3. Approve one draft and mark as “posted_manual” after copy/paste (audit trail captured).
4. Trigger a negative review (or import one) and confirm SLA alert email delivered.

F) Weekly Report (timeboxed)
1. Manually trigger weekly report endpoint or wait for scheduled send.
2. Confirm email deliverability (Gmail/Outlook) and PDF renders correctly.

Success criteria for pilot:
- Reviews are ingesting daily (Google sync or fallback).
- Drafts generated for >90% of ingested reviews.
- Customer approves and posts at least 3 replies.
- At least one weekly report delivered.
- Customer feedback collected: time saved, tone fit, any policy/guardrail issues.
