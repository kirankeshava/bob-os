# Metrics Dashboard MVP — Implementation (Routes, APIs, Queries, UI Copy)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T16:14:55.475Z

---

Below is the build-ready implementation content for the Metrics Dashboard MVP (now implemented). It documents the final route structure, API contracts, aggregation definitions, and UI copy so it’s easy to maintain and extend.

1) Routes
- Page: /app/admin/metrics
  - Purpose: give owners/operators immediate visibility into (a) Google sync health, (b) activation funnel from ingest→draft→approve→posted, and (c) alert volume/SLA breaches.
  - Filters: date range (from/to), location (All locations or a specific location).
  - Access: requires authenticated user with Business membership.

- APIs:
  - GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...|all
    - Returns JSON payload used by tables/cards.
  - GET /api/admin/metrics.csv?from=...&to=...&locationId=...|all
    - Returns a flat CSV export for debugging, sharing, or support.

2) KPI Definitions (must stay consistent across app + weekly report)
- Ingested Reviews: count of Review records createdAt within [from,to] (or review.createdAt depending on your canonical choice; MVP uses createdAt to measure operational throughput). Filter by locationId when provided.
- Drafted: count of DraftReply createdAt within [from,to] joined to Review in-scope.
- Approved: count of DraftReply where approvedAt within [from,to] (and review in-scope).
- Posted (Manual): count of DraftReply where postedAt within [from,to] AND status=posted_manual (or posted_api later). 
- Response Time (minutes): average(postedAt - review.createdAt) for drafts that were actually posted. Exclude rejected and never-posted drafts.
- Negative Share: percent of in-scope reviews where (rating<=2 OR sentiment=negative).
- Alerts:
  - SLA Alerts: AlertEvent.type in (negative_review, sync_failed, ocr_failed, policy_blocked) within [from,to].
  - SLA Breach: negative review exists with no approved draft within X hours (optional; MVP reports counts of negative_review alerts + time-to-first-action via AuditLog when available).

3) Aggregation Approach (Prisma-friendly)
- Funnel counts:
  - Reviews: prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to } } })
  - Drafts: prisma.draftReply.count({ where: { review: { businessId, locationId?, createdAt: { gte: from, lte: to } }, createdAt: { gte: from, lte: to } } })
  - Approved: prisma.draftReply.count({ where: { review: { businessId, locationId? }, approvedAt: { gte: from, lte: to } } })
  - Posted: prisma.draftReply.count({ where: { review: { businessId, locationId? }, postedAt: { gte: from, lte: to }, status: { in: ["posted_manual","posted_api"] } } })

- Response time:
  - Fetch posted drafts in-scope and compute avg using SQL (preferred) or compute in JS with select(review.createdAt, postedAt).
  - Ensure timezone handling: compute using UTC timestamps.

- Sync health:
  - Per location table from Location fields:
    - name, enabled flag, lastGbpSyncAt, lastGbpSyncError, lastGbpReviewSyncUpdateTime
  - Add derived status:
    - Healthy: last sync within 24h and no error
    - Warning: last sync >24h
    - Error: lastGbpSyncError present

4) API Contract (JSON)
Example response shape:
{
  "range": {"from":"2026-04-01","to":"2026-04-08"},
  "scope": {"locationId":"all"},
  "syncHealth": [
    {"locationId":"...","locationName":"Downtown","enabled":true,"lastSyncAt":"...","lastError":null,"status":"healthy"}
  ],
  "funnel": {
    "ingested": 42,
    "drafted": 39,
    "approved": 25,
    "posted": 18,
    "draftRate": 0.928,
    "approvalRate": 0.641,
    "postRate": 0.72,
    "avgResponseMinutes": 312
  },
  "reputation": {
    "avgRating": 4.31,
    "negativeShare": 0.12,
    "topThemes": ["staff","wait_time","quality"]
  },
  "alerts": {
    "total": 7,
    "byType": {"negative_review": 3,"sync_failed": 2,"ocr_failed": 1,"policy_blocked": 1}
  }
}

5) UI Copy (MVP)
- Page title: “Metrics”
- Subtitle: “Operational health + review response funnel. Use filters to isolate a location or time window.”
- Filter labels: “From”, “To”, “Location”
- Export button: “Export CSV”

Cards:
- “Ingested Reviews”
- “Drafts Created”
- “Approved Replies”
- “Posted Replies”
- “Avg Response Time” (tooltip: “Average time from review creation to posted reply. Excludes rejected and never-posted drafts.”)

Sync Health table columns:
- Location
- Enabled
- Last Sync
- Status
- Last Error (collapsed; expand row to view full message)

Alerts section copy:
- “Alerts help you catch negative reviews and integration failures quickly. If you see repeated sync failures, check Google connection and quota/backoff logs.”

6) Reliability/Guardrails
- RBAC: all metrics endpoints require authenticated membership in the business.
- Query bounds: reject date ranges > 365 days (MVP) to avoid heavy scans.
- Instrumentation:
  - Add Sentry span: metrics.query with tags { businessId, locationId, from, to }
  - Log slow queries > 2s with correlationId.

7) Pilot Checklist (ties metrics to reality)
- Confirm Sync Health shows last sync time moving forward after /api/cron/sync runs.
- Ingest 5 reviews (manual/email/GBP) and verify funnel counts increment predictably.
- Approve and mark manual posted for at least 2 drafts; confirm avg response time updates.
- Trigger a negative review alert (rating<=2) and ensure Alerts byType increments.
- Export CSV and confirm totals match JSON + UI cards.

This dashboard is intentionally dependency-light and uses existing tables (Review, DraftReply, Location, AlertEvent, AuditLog) so it can ship fast and remain stable during early pilots.