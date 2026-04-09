# Metrics Dashboard (MVP) — Implementation Notes + API Contracts + KPI Definitions

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:38:43.582Z

---

Overview
This MVP adds a production-safe metrics dashboard to the existing app so we can (a) verify the system is working during pilots and (b) show business owners concrete ROI signals: response speed, volume handled, and negative-review SLA compliance.

Routes/UI
1) /app/admin/metrics
- RBAC: requires authenticated user with Business membership.
- Filters: dateFrom, dateTo, locationId (optional), source (optional: google|yelp|manual|ocr).
- Panels:
  A. Sync Health
    - Table: Location name, integration source, lastSyncAt, lastError (if any), last review watermark (Location.lastGbpReviewSyncUpdateTime), stale indicator (e.g., now-lastSyncAt > 24h).
    - Purpose: immediately surface broken integrations and stalled cron.
  B. Funnel KPIs (selected period)
    - Reviews ingested
    - Drafts generated
    - Approved replies
    - Posted (manual) count
    - Conversion rates: drafted/ingested, approved/drafted, posted/approved
  C. Response & SLA
    - Median time to first draft: Review.createdAt -> first DraftReply.createdAt
    - Median time to approve: DraftReply.createdAt -> DraftReply.approvedAt
    - Median time to post: DraftReply.approvedAt -> DraftReply.postedAt (manual)
    - Negative SLA breaches: count of negative reviews not approved within threshold hours (configurable)
  D. Alerts/Failures
    - Count of AlertEvent by type (sync_failed, ocr_failed, negative_review, policy_block)
    - Recent 20 alerts list with timestamps and status
  E. Themes
    - Top categories (service/price/staff/quality/cleanliness/wait_time/other) and top keywords (optional) based on stored Review.categoryLabels.

API Contracts
2) GET /api/admin/metrics?businessId=...&dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD&locationId=...&source=...
- Validated with Zod; default date range: last 30 days; max range: 90 days unless admin override.
- Response JSON:
{
  "range": {"from":"2026-03-10","to":"2026-04-09"},
  "filters": {"locationId":null,"source":null},
  "syncHealth": [
    {"locationId":"...","locationName":"Main St","source":"google","lastSyncAt":"...","lastError":null,"stale":false,"watermark":"..."}
  ],
  "funnel": {
    "ingested": 120,
    "drafted": 110,
    "approved": 85,
    "posted": 60,
    "rates": {"draftedPerIngested":0.92,"approvedPerDrafted":0.77,"postedPerApproved":0.71}
  },
  "sentiment": {"positive":70,"neutral":30,"negative":20,"negativeShare":0.166},
  "ratings": {"avg":4.42,"count":120},
  "timingMedians": {"toDraftMinutes":45,"toApproveMinutes":180,"toPostMinutes":600},
  "sla": {"negativeThresholdHours":6,"breaches":3},
  "themes": [{"label":"service","count":28},{"label":"staff","count":19}],
  "alerts": {"byType": {"sync_failed":1,"negative_review":12,"ocr_failed":0,"policy_block":2}, "recent": [/*...*/]}
}

3) GET /api/admin/metrics.csv?businessId=...&dateFrom=...&dateTo=...&locationId=...&source=...
- Returns text/csv with rows grouped by day and location.
- Columns:
  day, locationId, locationName, source, ingested, drafted, approved, posted, avgRating, negativeCount, negativeShare, medianToDraftMinutes, medianToApproveMinutes, medianToPostMinutes, alertsSyncFailed, alertsNegative, alertsPolicyBlock, alertsOcrFailed

KPI Definitions (must be consistent everywhere)
- Ingested: Review.createdAt within range.
- Drafted: DraftReply.createdAt within range AND DraftReply.reviewId belongs to a review in range (we keep both checks to avoid counting legacy drafts).
- Approved: DraftReply.approvedAt within range.
- Posted: DraftReply.postedAt within range AND status in ('posted_manual').
- Response time medians computed on the same population as counts; exclude rejected drafts from approval/post timing.
- Negative review: Review.sentiment='negative' OR Review.rating <= 2.
- SLA breach: negative review where no approved draft exists within threshold hours of Review.createdAt.

Data Sources / Queries
- Review table: rating, sentiment, categoryLabels, createdAt, source, locationId.
- DraftReply: createdAt, approvedAt, postedAt, status.
- AuditLog: used only for troubleshooting; primary KPI timing uses DraftReply timestamps to avoid expensive event reconstruction.
- AlertEvent: aggregated by type and time window.
- Location/Integration: for sync health.

Operational Notes
- Performance: enforce max 90-day range, use indexed columns (Review.createdAt, Review.locationId, DraftReply.approvedAt/postedAt). For medians, compute in application by fetching only timestamp pairs needed (or use Postgres percentile_cont if available).
- Reliability: metrics endpoints wrapped with Sentry spans and structured logs; return partial results if a non-critical section fails, and log the error.

Customer Communication (if asked during onboarding)
- Share legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Support/contact: agent_bob_replit+review-bot@agentmail.to

This artifact is intended to be paste-ready documentation for the code that was implemented: it defines the exact KPIs, API outputs, and how the dashboard should behave so pilots can be run without ambiguity.