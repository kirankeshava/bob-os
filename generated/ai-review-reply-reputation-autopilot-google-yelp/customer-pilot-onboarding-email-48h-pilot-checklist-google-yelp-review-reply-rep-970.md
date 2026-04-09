# Customer Pilot Onboarding Email + 48h Pilot Checklist (Google/Yelp Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:35:03.213Z

---

Subject: Get your reviews handled automatically in 15 minutes (Google + Yelp)

Hi {{FirstName}},

I’m Bob from AI Review Reply & Reputation Autopilot. We help local businesses respond to Google/Yelp reviews quickly and safely (with escalation for negatives), then send a weekly KPI report so you can track reputation impact.

You can see the app here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open to a quick pilot, here’s the fastest way to get value:

1) Connect your Google Business Profile
- Log in and go to Integrations → Google → Connect.
- Approve access, then select the locations you want to sync.

2) Set escalation + SLA alerts
- In Admin → Escalation, add the emails that should be notified for negative reviews (owner/manager).
- Choose the threshold (example: rating ≤ 2 OR sentiment=negative).

3) Review reply drafts (human-in-the-loop)
- Go to Reviews → Queue.
- For each review, you’ll see a brand-safe draft reply. You can edit and then click Approve.

4) Post replies
- If API posting isn’t enabled for your account, the app will guide copy/paste and record an audit trail (who posted + when).

5) Weekly reputation report
- You’ll receive a weekly email with a PDF summary: volume, average rating trend, response time, negative share, and top themes.

If you want, reply with:
- Your business name
- The best email(s) for escalation alerts
- The day/time (and timezone) you want weekly reports

Or reach us directly at: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot

---

48-HOUR PILOT CHECKLIST (internal)

Goal: Validate reliability + customer value with a real multi-location GBP account; verify ingestion→draft→approval→manual post audit→alerts→weekly report; confirm metrics dashboard surfaces issues.

A. Pre-flight (30 minutes)
1) Create Business + Location records (Admin → Businesses/Locations) if not already created.
2) Invite customer user via email magic link; confirm they can access only their Business.
3) Connect GBP integration with customer account:
   - Confirm OAuth scopes granted.
   - Confirm locations list loads and customer selects enabled locations.
4) Set escalation rule:
   - Recipients: owner + manager.
   - Threshold: rating<=2 OR sentiment=negative.
5) Verify weekly report schedule:
   - Set weekday + timezone.

B. Sync & ingestion validation (first 2 hours)
1) Trigger manual sync once (or wait for cron): /api/cron/sync
2) Confirm per-location watermark set: Location.lastGbpReviewSyncUpdateTime populated.
3) Confirm reviews appear in DB/UI:
   - New reviews have raw payload stored.
   - Tagging results: sentiment + category labels populated.
   - DraftReply created for each eligible review.
4) Confirm failure isolation:
   - If one location errors (quota/429/5xx), others still sync.
5) Confirm Sentry logging + correlationId present for one full pipeline.

C. Approval + posting audit (same day)
1) Approve 3–5 drafts (include at least 1 negative).
2) Validate guardrails:
   - Try to insert a phone/email in draft; approval should be blocked and logged.
   - Try banned phrase (e.g., incentive); approval should be blocked.
3) Mark as posted via guided copy/paste:
   - Ensure posted_manual timestamp + actor stored.
   - AuditLog entries for approve/edit/post present.

D. Alerts (same day)
1) Ensure at least one negative review triggers SLA alert.
2) Confirm AlertEvent recorded and email delivered.

E. Metrics dashboard validation (within 24 hours)
1) Open Admin → Metrics.
2) Confirm:
   - Sync Health shows last sync per location + last error (if any).
   - Funnel counts match reality: ingested → drafted → approved → posted.
   - Response time KPI excludes rejected/never-posted.
   - Alerts summary matches AlertEvent table.
3) Export CSV from /api/admin/metrics.csv and verify columns are sensible for customer sharing.

F. Stability check (48 hours)
1) Let cron run normally.
2) Verify no duplicate reviews (upsert by gbpReviewId).
3) Validate incremental updates: edit/update a review (if possible) and confirm it updates and re-queues tagging/drafting when changed.
4) Verify quota/backoff:
   - If 429 occurs, confirm exponential backoff and retry count caps.
   - Confirm AlertEvent is created if a location fails repeatedly.

Success criteria
- Customer receives at least 1 escalation alert for a negative review and confirms it’s actionable.
- Customer approves and posts at least 5 replies with minimal edits.
- Weekly report email delivers successfully and matches metrics dashboard.
- No missed reviews across multiple locations over 48h; no runaway cron concurrency (advisory lock works).