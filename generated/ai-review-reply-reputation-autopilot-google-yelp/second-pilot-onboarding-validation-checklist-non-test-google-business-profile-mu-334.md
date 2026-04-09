# Second Pilot Onboarding + Validation Checklist (Non-Test Google Business Profile, Multi-Location)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:03:43.234Z

---

Objective
Validate that the MVP operates reliably for a real (non-test) Google Business Profile across multiple locations: OAuth permissions, incremental sync, tagging/drafting, approval workflow, manual posting audit trail, SLA alerts, and weekly KPI reports. This pilot should also surface edge cases (edited reviews, deleted reviews, pagination, quota, timezone issues) before customer rollout.

Pilot prerequisites (no spend)
1) Business website for legitimacy (share with pilot): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
2) Support contact email (for pilot comms + escalation): agent_bob_replit+review-bot@agentmail.to
3) Pilot business must have manager/owner access to their Google Business Profile.

Step-by-step onboarding (owner + pilot business)
1) Create Business + Locations in Admin
- Log in as admin.
- Go to /app/admin/businesses → Create Business.
- Go to /app/admin/locations → ensure at least two locations exist (or will be created from GBP sync). Set timezone and any per-location SLA thresholds.

2) Connect Google Business Profile
- Ask the pilot to log in and navigate to /app/integrations/google/connect.
- Complete OAuth. Confirm redirect success and that “Connected” status appears.
- Immediately run “Sync Locations” (UI step) and have the pilot select which locations to enable.

3) Verify review ingestion
- Trigger a sync (either wait for cron or run the sync route manually as admin).
- Confirm that reviews appear in /app/reviews with source=google and have raw payload stored.
- Confirm incremental behavior: run sync twice and verify no duplicates; edits/updates should upsert and update updateTime.

4) Verify tagging + drafting
- For newly ingested reviews, confirm sentiment + category labels appear (positive/neutral/negative; service/price/staff/etc.).
- Confirm DraftReply exists, with template-based brand-safe response.
- Spot-check at least 10 reviews across locations.

5) Verify approval + guardrails
- Attempt to approve a draft for a review containing PII or incentive-bait text (if available). Ensure approval is blocked with a clear policy message.
- Edit a draft and approve successfully; confirm AuditLog entries for edit + approval.

6) Verify posting workflow (manual)
- Use guided copy/paste flow.
- Mark as posted_manual.
- Confirm posted timestamp, user, and audit trail are recorded.

7) Verify SLA alerts + escalation
- Configure escalation recipients in /app/admin/escalation.
- Ensure negative reviews (sentiment=negative or rating<=2) trigger alert emails within expected SLA window.
- Validate email deliverability (Gmail + Outlook) and content includes review context and a direct link back to the review in-app.

8) Verify weekly KPI report
- Configure report schedule (weekday/timezone) for the pilot business.
- Run /api/cron/weekly-reports (or wait for schedule).
- Confirm email arrives with PDF attached.
- Validate KPIs: review volume, avg rating trend, response time (excluding rejected/unposted), negative share, top themes, per-location breakdown.

Stability run (48 hours)
- Let cron run normally for 2 days.
- Each day, check /app/admin/metrics:
  - Sync Health: last sync per location, last error, consecutive failures.
  - Funnel: ingested→drafted→approved→posted.
  - Alerts: any spikes, duplicates, or missed notifications.
- Confirm watermark correctness: no missed reviews and no churn duplicates.

Edge cases to test (record findings)
1) Edited review text after initial ingestion.
2) Review deleted (if GBP exposes state changes; otherwise note limitation).
3) Multiple locations with very different review volumes (ensure per-location watermark works).
4) Quota/backoff events (429/5xx) and recovery.
5) Reviews with profanity, legal threats, medical/financial claims—confirm drafting behavior and approval blocks.

Troubleshooting quick guide
- OAuth succeeds but no locations: confirm pilot Google account has access to the GBP account(s); re-run locations sync; check integration lastError.
- No reviews appearing: verify location enabled for sync; check /api/health/integrations and Sentry logs; confirm cron endpoint runs.
- Duplicates: check reviewId mapping (gbpReviewId) and that upsert keys are correct; confirm per-location watermark stored.
- Alerts not received: verify escalation recipients; check Resend sending logs; confirm AlertEvent records exist.

Success criteria
- At least 50 real reviews ingested across 2+ locations with no duplicates.
- 95%+ of ingested reviews receive a draft within minutes of sync.
- Guardrails block unsafe approvals; safe drafts approve and audit correctly.
- Negative review alerts fire reliably.
- Weekly report delivered with correct metrics and readable PDF.

Pilot communication template (send from agent_bob_replit+review-bot@agentmail.to)
Subject: Pilot: AI Review Reply & Reputation Autopilot — onboarding
Body:
Hi — this is Bob. Thanks for joining our pilot for the AI Review Reply & Reputation Autopilot.

You can see our app here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Support email: agent_bob_replit+review-bot@agentmail.to

Next steps:
1) Log in and connect your Google Business Profile (we’ll only read reviews + help draft replies).
2) Choose which locations to enable.
3) You’ll see new reviews appear in the queue with suggested replies; you can edit and approve.

If anything looks off (missing locations/reviews, email alerts not arriving), reply to this email and we’ll fix it quickly.

— Bob
