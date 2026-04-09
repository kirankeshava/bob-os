# Pilot Outreach Email + Onboarding Checklist (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:46:50.080Z

---

Subject: Want us to handle your Google/Yelp review replies (with your approval)?

Hi {{FirstName}},

I’m Bob. We’re piloting an “AI Review Reply & Reputation Autopilot” that drafts brand-safe responses to Google (and optionally Yelp) reviews, routes negative reviews for fast escalation, and emails a weekly KPI report (rating trend, response time, negative share, top themes).

If you’re open to a quick pilot, here’s what you get in week 1:
- New reviews auto-ingest from Google Business Profile (or we can start with email forwarding/CSV/screenshot import)
- AI-drafted replies with guardrails (no incentives, no PII, brand-safe tone)
- One-click approve/edit workflow (nothing posts without approval)
- Negative review alerts (so you never miss a 1–2 star)
- Weekly PDF KPI report emailed to you

Legitimacy / demo app:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

What I need from you (10 minutes):
1) Confirm the best email(s) to receive negative-review alerts + weekly reports.
2) Choose onboarding path:
   A) Google: Connect your Google Business Profile (OAuth) and select locations to sync.
   B) Yelp: Forward review notification emails OR upload a CSV OR upload screenshots (OCR import).
3) Share your preferred “reply style” in 2–3 bullets (friendly/formal, short/long, sign-off name, etc.).

What you’ll see after setup:
- A review queue with filters (negative first) and drafted replies ready for approve/edit.
- An audit trail of what was approved and when.
- A metrics dashboard showing: ingested → drafted → approved → posted, response-time stats, alert volume, and top themes.

Pilot structure:
- Duration: 7 days
- Goal: 100% response coverage to new reviews (with your approval), and sub-24h SLA for negative reviews
- Your workload: approve/edit drafts a few minutes per day

If you reply with “YES”, I’ll send a one-time invite link and we can connect Google or start with forwarding a couple review emails/screenshots.

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to

---
Internal onboarding checklist (operator view)
1) Create Business + Locations in admin (or via Google sync).
2) Invite owner via magic link; confirm they can access /app/reviews.
3) Integrations:
   - Google: Connect OAuth, select locations, run initial sync, verify reviews appear.
   - Yelp fallback: set up email forwarding rule OR upload CSV template OR upload screenshots; confirm OCR confidence step.
4) Configuration:
   - Set negative thresholds (rating<=2 or sentiment=negative).
   - Add escalation recipients (owner + manager).
   - Set weekly report day/time + timezone.
5) QA workflow:
   - Confirm tagging runs (sentiment + categories).
   - Confirm drafts generate with templates.
   - Attempt approval of a draft containing PII/banned phrase to verify block.
   - Mark one as posted_manual and confirm response-time metrics update.
6) Reporting:
   - Trigger weekly report generation; verify email rendering + PDF attachment.
7) Metrics:
   - Visit /app/admin/metrics; verify funnel counts and sync health match expected.
   - Export CSV and validate daily rows are populated.
8) Support loop:
   - If sync errors occur, check AlertEvents and Sentry correlationId; fix root cause; re-run sync.