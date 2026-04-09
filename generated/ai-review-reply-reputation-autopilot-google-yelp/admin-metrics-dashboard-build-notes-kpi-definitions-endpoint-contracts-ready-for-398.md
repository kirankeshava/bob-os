# Admin Metrics Dashboard – Build Notes + KPI Definitions + Endpoint Contracts (Ready for Pilot Monitoring)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:44:32.870Z

---

Overview
This deliverable documents the implemented /app/admin/metrics dashboard and the supporting API endpoints used to compute and export KPIs for the AI Review Reply & Reputation Autopilot MVP. The goal is to enable rapid pilot monitoring (activation + ops health) without touching the database directly.

Routes Shipped
1) UI Page
- GET /app/admin/metrics
- Filters: dateFrom, dateTo, locationId (optional)
- Sections:
  A. Sync Health
    - Per-location last review sync timestamp (Location.lastGbpReviewSyncUpdateTime or equivalent)
    - Integration lastSyncAt + lastError summary
    - Recent sync failure alerts (AlertEvent) count and latest timestamp
  B. Funnel KPIs (selected range)
    - Reviews ingested: count(Review.createdAt in range)
    - Drafts created: count(DraftReply.createdAt in range)
    - Approved: count(DraftReply.approvedAt in range)
    - Posted: count(DraftReply.postedAt in range OR status in [posted_manual, posted_api])
    - Conversion rates: drafted/ingested, approved/drafted, posted/approved
  C. Reputation KPIs
    - Avg rating: avg(Review.rating) in range
    - Negative share: count(rating<=2 OR sentiment='negative') / ingested
    - Top themes: group by Review.categoryLabels (or tagging output) with counts
  D. Response-time KPIs
    - Avg time-to-first-draft: DraftReply.createdAt - Review.createdAt
    - Avg time-to-approval: DraftReply.approvedAt - DraftReply.createdAt
    - Avg time-to-post: DraftReply.postedAt - DraftReply.approvedAt
    - Notes: excludes rejected drafts and excludes items never posted from time-to-post.
  E. Alerts
    - Count of AlertEvent by type (negative_review, sync_failed, ocr_failed, etc.) in range
    - Latest 5 alerts with links to review/location

2) Metrics JSON API
- GET /api/admin/metrics?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD&locationId=...
- RBAC: user must be a member of the business; business resolved from session + membership.
- Validation: zod; if no dates provided defaults to last 7 days; caps max range (e.g., 90 days).
- Response contract (high level):
  {
    range: { dateFrom, dateTo, timezone },
    filters: { locationId?: string },
    syncHealth: { locations: [{ id, name, lastSyncAt, lastWatermark, lastError, recentFailuresCount }] },
    funnel: { ingested, drafted, approved, posted, rates: { draftedPerIngested, approvedPerDrafted, postedPerApproved } },
    reputation: { avgRating, negativeShare, topThemes: [{ theme, count }] },
    responseTimes: { avgDraftMins, avgApprovalMins, avgPostMins },
    alerts: { total, byType: [{ type, count }], latest: [{ id, type, createdAt, reviewId, locationId }] }
  }

3) CSV Export
- GET /api/admin/metrics.csv?dateFrom=...&dateTo=...&locationId=...
- Same RBAC/validation as JSON.
- Output: a flat CSV suitable for emailing to operators or debugging data. Includes:
  - Summary rows (one row with totals)
  - Location breakdown rows
  - Theme breakdown rows

KPI Definitions (Canonical)
- Ingested: Review records created in the date range (includes Google sync + manual CSV + email + OCR confirmed imports).
- Drafted: DraftReply created in the date range (first draft counts; if multiple versions exist, counts all drafts unless constrained—current implementation counts all DraftReply created; can be changed to distinct ReviewId if desired).
- Approved: DraftReply.approvedAt within range.
- Posted: DraftReply.postedAt within range OR status indicates posted; manual-post flow sets postedAt.
- Negative: (sentiment='negative') OR (rating <= 2). This matches SLA alert logic.
- Response-time calculations:
  - Time-to-draft: from Review.createdAt to first DraftReply.createdAt for that review.
  - Time-to-approval: from DraftReply.createdAt to approvedAt.
  - Time-to-post: from approvedAt to postedAt.
  - Exclusions: rejected drafts excluded from approval/post metrics; never-posted excluded from time-to-post averages.

Operational Use During Pilot
- Daily: check Sync Health panel to confirm cron is running and no locations are stuck failing (look at recentFailuresCount).
- Weekly: verify Funnel conversion (ingested→drafted should be near 100% if draft job is healthy; approved→posted reveals operational bottlenecks).
- If customer complains about missed reviews: filter by locationId and last 24–48h; cross-check ingested vs. Google dashboard; look for sync_failed alerts.

Customer-facing Notes (if needed for onboarding emails)
- Web proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-3djp6rf9.picard.replit.dev/sites/1
- Support/onboarding email: agent_bob_replit+review-bot@agentmail.to

Next Enhancements (non-blocking)
- Add a “distinct reviews drafted” metric (unique ReviewId) to avoid double-counting if multiple drafts are generated.
- Add a “SLA breaches” metric: negative reviews not approved within X hours.
- Add an in-dashboard button to trigger an immediate sync/report for support.
