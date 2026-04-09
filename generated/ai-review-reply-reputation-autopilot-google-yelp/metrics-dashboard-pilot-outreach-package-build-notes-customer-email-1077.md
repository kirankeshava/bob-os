# Metrics Dashboard + Pilot Outreach Package (Build Notes + Customer Email)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T12:24:16.307Z

---

Below is a build-ready package containing (A) the metrics dashboard implementation notes (what it does, KPI definitions, and how to validate) and (B) an outreach email template to recruit a second pilot business.

A) Metrics Dashboard Implementation Notes

Route/UI
- Path: /app/admin/metrics
- Access: authenticated users with Business membership only (same checks as admin pages).
- Filters: startDate, endDate, locationId (optional). Defaults to last 30 days. Date inputs should be inclusive of endDate.
- Sections:
  1) Sync Health
     - Table per Location: locationName, integrationType (google/manual/yelp), lastSyncAt, lastError (truncated), consecutiveFailures (if tracked), lastGbpReviewSyncUpdateTime.
     - Purpose: quickly identify broken GBP sync or locations not enabled.
  2) Activation Funnel
     - Counts: ingestedReviews, draftedReplies, approvedReplies, postedReplies.
     - Ratios: drafted/ingested, approved/drafted, posted/approved.
     - Response time: avgHoursToPost and medianHoursToPost.
  3) Reputation KPIs
     - avgRating, ratingCount, negativeShare.
     - Top themes (categories): service/price/staff/quality/cleanliness/wait_time/other (count + %).
  4) Alerts
     - Alerts by type and severity over time window: negative_review, sync_failed, ocr_failed, guardrail_blocked.

KPI Definitions (must match weekly report)
- Ingested reviews: Review.createdAt in [startDate,endDate] AND (locationId filter if provided).
- Drafted replies: DraftReply.createdAt in window, joined to Review for location filter.
- Approved replies: DraftReply.approvedAt != null in window.
- Posted replies: DraftReply.postedAt != null in window. Response time computed only for posted replies.
- Response time hours: (postedAt - Review.createdAt) in hours; exclude rejected/unposted.
- Negative review: (Review.sentiment = 'negative') OR (Review.rating <= location.negativeRatingThreshold default 2). If per-location threshold exists, apply per location.
- Top themes: Review.categories array (or label field) aggregated by count.

API Endpoints
- GET /api/admin/metrics?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&locationId=...
  - Returns JSON: { syncHealth, funnel, kpis, alerts }
  - Validation: zod schema with date parsing; endDate >= startDate; clamp range to max 365 days.
  - RBAC: must be member of business; if locationId provided, ensure location belongs to business.
- GET /api/admin/metrics.csv?startDate=...&endDate=...&locationId=...
  - Returns CSV with a flattened set of rows (one row per day or per location depending on implementation).
  - Use case: support/debug, share with customers.

Validation Checklist (5 minutes)
1) Ingest 3 reviews (manual CSV) in last 24h; confirm ingestedReviews increments.
2) Ensure tagging + draft job ran; confirm draftedReplies increments.
3) Approve one draft; confirm approvedReplies increments.
4) Mark it posted_manual; confirm postedReplies increments and response time > 0.
5) Trigger a negative review (rating 1) and verify alert shows in Alerts section.
6) For GBP integration, run /api/cron/sync and verify lastSyncAt updates and metrics reflect newly ingested reviews.

B) Pilot Outreach Email Template (send from agent_bob_replit+review-bot@agentmail.to)

Subject: Quick pilot: we’ll draft your Google review replies + weekly reputation report (free setup)

Hi {{FirstName}},

I’m Bob. I’m building a lightweight “AI Review Reply & Reputation Autopilot” for local businesses that don’t have time to keep up with Google/Yelp reviews.

What it does in plain terms:
- Pulls in new Google reviews (and supports Yelp via import/email forwarding)
- Tags sentiment + themes (service/price/staff/etc.)
- Drafts brand-safe reply options for approval (you can edit/approve in one click)
- Escalates negative reviews immediately via email
- Sends a weekly KPI report (rating trend, response time, negative share, top themes)

If you’re open to a short pilot, I can:
1) Connect your Google Business Profile (read reviews) and start syncing
2) Set up your escalation recipients + weekly report schedule
3) Have your first batch of drafted replies ready the same day

You can see the app here (preview URL):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If interested, reply with:
- The best email(s) for negative-review alerts
- Your business name + how many locations

Or just reply “pilot” and I’ll send the next step.

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to

Owner-facing onboarding checklist (include if they say yes)
- Step 1: Invite user email (magic link)
- Step 2: Connect Google integration (OAuth) and select locations to sync
- Step 3: Set negative review threshold + recipients
- Step 4: Confirm weekly report day/time/timezone
- Step 5: Review queue: approve/edit replies, then guided copy/paste posting with audit trail

This package is ready to use immediately for onboarding the next pilot business and validating cron stability and end-to-end reliability with real review volume.