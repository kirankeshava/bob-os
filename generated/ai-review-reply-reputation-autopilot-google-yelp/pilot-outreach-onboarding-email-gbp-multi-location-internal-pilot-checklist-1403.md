# Pilot Outreach + Onboarding Email (GBP Multi-Location) + Internal Pilot Checklist

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T15:04:41.341Z

---

Subject: Set up your AI Review Reply & Reputation Autopilot (Google/Yelp) — 15 minutes

Hi {FirstName},

I’m Bob Smith. I’m reaching out because many local businesses lose revenue when reviews go unanswered (or get answered inconsistently). We built a lightweight autopilot that:
- Ingests your Google Business Profile (and/or Yelp) reviews
- Tags sentiment + themes (service/price/staff/etc.)
- Drafts brand-safe replies you can approve in one click
- Escalates negative reviews immediately
- Sends a weekly KPI report (ratings trend, response times, top themes)

You can see the app here (live preview):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want, we can run a 7‑day pilot on one or more locations. Setup usually takes ~15 minutes.

What I need from you to start (pick one):
1) Google Business Profile connect: you’ll click “Connect Google” and authorize read access for reviews + location listing. We then sync reviews automatically.
2) If you can’t connect Google yet: forward review notification emails to our ingest address or upload a CSV/screenshot in the app.

During the pilot you’ll get:
- Draft replies within minutes of new reviews
- Negative-review alerts to the right person
- A weekly report by email with reputation KPIs

Reply with:
- Your business name
- The best email(s) to receive alerts and weekly reports
- Whether you have 1 location or multiple

Or if you prefer, email us directly at: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot

---
INTERNAL PILOT CHECKLIST (for Bob)

Goal: validate stability + time-to-value for a real multi-location GBP over 48 hours.

A) Pre-flight
1. Confirm pilot business has 2+ GBP locations and at least a few recent reviews.
2. Confirm stakeholder emails for: (a) negative SLA alerts, (b) weekly reports.
3. Create Business + Locations in admin (or let owner self-onboard via invite).

B) Integration setup
1. Have owner connect Google: /app/integrations/google/connect.
2. Ensure OAuth scopes granted; Integration record has refresh token + expiry.
3. Run location discovery; confirm gbpLocationIds mapped and enabled.
4. Trigger manual sync once (admin button or /api/cron/sync) and confirm:
   - Reviews created/upserted
   - Raw payload stored
   - Tagging job enqueued
   - Drafts generated

C) Workflow validation (time-to-value)
1. Open /app/reviews queue; confirm new reviews show sentiment + labels.
2. Open a negative review: confirm alert email fired + AlertEvent stored.
3. Approve/edit a draft; confirm guardrails (PII/banned phrases) block unsafe text.
4. Use “manual post” guided flow; confirm audit trail timestamp + user.

D) Cron + reliability
1. Confirm /api/cron/sync runs on schedule and respects per-business lock.
2. Verify no missed updates: edit a review (if possible) or add a new review; confirm incremental updateTime watermark behavior per location.
3. Check /api/health/integrations and Sentry for errors; ensure backoff on 429/5xx.

E) Reporting
1. Configure weekly report timezone + weekday.
2. Trigger /api/cron/weekly-reports once; verify email delivery + PDF rendering.
3. Cross-check dashboard metrics (/app/admin/metrics) align with report numbers.

F) Exit criteria (pilot success)
- New review → draft < 10 minutes
- Negative review → alert < 5 minutes
- Approval workflow used at least once
- Weekly report delivered successfully
- No missed reviews across 48 hours (2+ locations)

Notes to capture during pilot:
- Any reviews with existing public replies (reply mismatch)
- Any edge-case content (profanity, legal threats, medical/financial claims)
- Quota/backoff events and how often they occur
- UI friction points (connect, location select, approve/post)
