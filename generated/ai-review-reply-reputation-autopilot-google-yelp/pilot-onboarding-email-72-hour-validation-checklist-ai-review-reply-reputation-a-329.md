# Pilot Onboarding Email + 72-Hour Validation Checklist (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:19:00.987Z

---

Subject: Set up your AI Review Reply & Reputation Autopilot (Google/Yelp) — 15 minutes

Hi {{FirstName}},

I’m Bob from AI Review Reply & Reputation Autopilot. We help local businesses respond to Google/Yelp reviews quickly and safely: drafts are generated automatically, negative reviews are escalated immediately, and you get a weekly KPI report (ratings trend, response time, top themes).

You can review our app here (legitimacy + live workflow):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’d like to pilot this for your business, reply to this email with:
1) Your business name and Google Business Profile link
2) Which locations you want included (if multiple)
3) Escalation emails for negative reviews (owner/manager)

Then we’ll schedule a 15-minute setup where you:
- Connect Google Business Profile (OAuth)
- Select the locations to sync
- Choose your brand voice (friendly/professional) and escalation rules

What happens during the 72-hour pilot (no disruption to your current process):
- We ingest new reviews from Google automatically (plus Yelp via email/CSV/screenshot if needed)
- Draft replies appear in your Approval Queue
- You approve/edit with one click
- Posting is either via API (when available) or guided copy/paste with an audit trail
- Negative reviews trigger an immediate escalation email
- You receive an automated weekly KPI report (PDF + email)

Validation Checklist (internal / success criteria)

Day 0 — Setup (15–30 min)
[ ] Create business record + confirm timezone
[ ] Connect GBP integration (OAuth) and select locations
[ ] Run initial sync: confirm review counts match GBP within expected limits
[ ] Confirm ingestion sources enabled: Google API + fallback (email/CSV/screenshot OCR)
[ ] Configure escalation rule: negative sentiment OR rating <= 2, recipients = {{Recipients}}
[ ] Send test alert to recipients
[ ] Generate one weekly report manually (preview) and confirm formatting

Day 1 — Reliability
[ ] Cron sync runs at least 3 times without manual intervention
[ ] Verify watermarks per location advance (no duplicate floods, no missing new reviews)
[ ] If a review is edited on Google, confirm we upsert and re-tag/re-draft
[ ] Confirm Sentry shows no repeating ingestion errors; if any, capture correlationId and fix

Day 2 — Workflow Throughput
[ ] At least 5 reviews processed end-to-end: ingested → tagged → drafted → approved → posted (manual audit ok)
[ ] Measure response time KPI reflects posted replies only (excludes rejected/unposted drafts)
[ ] Confirm guardrails block unsafe drafts (PII/incentives/admissions) and require edits

Day 3 — Reporting + Outcomes
[ ] Weekly report cron runs in pilot timezone and delivers to Gmail/Outlook
[ ] Report includes: volume, avg rating trend, response time, negative share, top themes, per-location breakdown
[ ] Dashboard shows sync health and funnel counts consistent with database totals

If you want to start the pilot, reply here or email us at: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
