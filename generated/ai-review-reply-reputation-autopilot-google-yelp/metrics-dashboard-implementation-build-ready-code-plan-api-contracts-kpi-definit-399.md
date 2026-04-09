# Metrics Dashboard Implementation (Build-Ready Code Plan + API Contracts + KPI Definitions)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:08:41.857Z

---

Below is the concrete implementation plan and code-level contract for the MVP Metrics Dashboard. It is designed to use ONLY existing tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, and membership RBAC.

1) ROUTES
A) UI Page
- Route: /app/admin/metrics
- Access: user must be member of selected Business (UserBusinessMembership). If multi-business, show selector.
- Controls:
  - Date range: dateFrom, dateTo (default: last 14 days). Hard cap: 90 days.
  - Location filter: locationId = ‘all’ or specific.
  - Export CSV button linking to /api/admin/metrics.csv?dateFrom=...&dateTo=...&locationId=...
- Sections:
  1) Sync Health table
     - Columns: Location, Integration source, lastSyncAt, lastError (truncated), consecutiveFailures, reviewsFetchedLast24h
  2) Activation Funnel
     - Cards: Ingested Reviews, Drafts Generated, Approved, Posted (manual)
     - Derived rates: Draft rate (drafted/ingested), Approval rate (approved/drafted), Post completion (posted/approved)
  3) Responsiveness + Alerts
     - Response time P50/P90 (hours) for posted reviews
     - Negative share (% reviews with sentiment=negative OR rating<=2)
     - Alerts count by type (SLA breach, sync failure, OCR failure) over range

2) API ENDPOINTS
A) GET /api/admin/metrics
- Query:
  - businessId (required)
  - dateFrom (ISO string, optional)
  - dateTo (ISO string, optional)
  - locationId (optional)
- Validation:
  - Parse to Date; if missing set defaults.
  - Ensure dateFrom < dateTo.
  - Ensure (dateTo - dateFrom) <= 90 days.
  - If locationId provided, verify it belongs to businessId.
- RBAC:
  - requireMembership(userId, businessId)
- Response JSON shape:
{
  "range": {"dateFrom": "2026-03-26", "dateTo": "2026-04-09"},
  "filters": {"businessId": "...", "locationId": "all"},
  "syncHealth": [
    {
      "locationId": "...",
      "locationName": "Downtown",
      "source": "google",
      "lastSyncAt": "2026-04-09T12:00:00Z",
      "lastError": null,
      "consecutiveFailures": 0,
      "reviewsFetchedLast24h": 3
    }
  ],
  "funnel": {
    "ingested": 120,
    "drafted": 98,
    "approved": 70,
    "posted": 55,
    "draftRate": 0.8167,
    "approvalRate": 0.7143,
    "postCompletionRate": 0.7857
  },
  "kpis": {
    "avgRating": 4.32,
    "negativeShare": 0.0833,
    "responseTimeHoursP50": 6.2,
    "responseTimeHoursP90": 28.7
  },
  "alerts": {
    "total": 9,
    "byType": {
      "SYNC_FAILURE": 2,
      "SLA_NEGATIVE_REVIEW": 5,
      "OCR_FAILURE": 2
    }
  },
  "timeseries": {
    "reviewsByDay": [{"date": "2026-04-01", "count": 6}],
    "avgRatingByWeek": [{"weekStart": "2026-03-31", "avgRating": 4.25}]
  }
}

B) GET /api/admin/metrics.csv
- Same query + validation + RBAC.
- Returns text/csv with sections separated by blank line.
- Also writes AuditLog event: METRICS_CSV_EXPORTED with params.

3) KPI DEFINITIONS (CONSISTENT + TESTED)
A) Ingested
- Count of Review where createdAt within [dateFrom, dateTo) AND businessId AND optional locationId.
- Note: createdAt is the time review was created on platform when known; otherwise ingestedAt fallback (stored as Review.createdAt if we use ingest time). Keep consistent.

B) Drafted
- Count of DraftReply where createdAt within range AND linked Review matches filters.

C) Approved
- Count of DraftReply where approvedAt within range AND linked Review matches filters.

D) Posted
- Count of DraftReply where status in (posted_manual, posted_api) AND postedAt within range.

E) Response time
- Compute only for posted drafts.
- responseTimeHours = (postedAt - Review.createdAt) in hours.
- Exclude rejected drafts and approved-not-posted.
- Percentiles: compute from array (small n) in app code, or via SQL approx if needed later.

F) Negative share
- negative = (Review.rating <= 2) OR (Review.sentiment == 'negative').
- negativeShare = negativeCount / ingestedCount.

4) PRISMA QUERY OUTLINE (PSEUDOCODE)
- const reviewWhere = { businessId, createdAt: { gte: dateFrom, lt: dateTo }, ...(locationId? {locationId}: {}) }
- ingested = prisma.review.count({ where: reviewWhere })
- avgRating = prisma.review.aggregate({ where: reviewWhere, _avg: { rating: true }})
- negativeCount = prisma.review.count({ where: { ...reviewWhere, OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }] } })
- drafted = prisma.draftReply.count({ where: { createdAt: { gte: dateFrom, lt: dateTo }, review: reviewWhere }})
- approved = prisma.draftReply.count({ where: { approvedAt: { gte: dateFrom, lt: dateTo }, review: reviewWhere }})
- posted = prisma.draftReply.count({ where: { postedAt: { gte: dateFrom, lt: dateTo }, status: { in: ['posted_manual','posted_api'] }, review: reviewWhere }})
- responseTimes: prisma.draftReply.findMany({ where: { postedAt: { gte: dateFrom, lt: dateTo }, status: { in: ['posted_manual','posted_api'] }, review: reviewWhere }, select: { postedAt: true, review: { select: { createdAt: true } } } }) then compute hours and percentile.
- syncHealth: join Location + Integration metadata already stored:
  - lastSyncAt, lastError, consecutiveFailures can live on Integration or Location; if mixed, normalize in mapper.
  - reviewsFetchedLast24h = prisma.review.count({ where: { businessId, locationId, createdAt: { gte: now-24h }, source: 'google' } })

5) INSTRUMENTATION
- Metrics endpoints:
  - Log: businessId, locationId, dateFrom/dateTo, userId, latencyMs.
  - Sentry: captureException with tags {route:'/api/admin/metrics', businessId}.
- CSV export:
  - Write AuditLog: actorId, businessId, action='METRICS_CSV_EXPORTED', metadata={dateFrom,dateTo,locationId}.

6) UI COPY (CUSTOMER-READABLE)
- Header: “Reputation Ops Dashboard”
- Subheader: “Track review intake, response throughput, and SLA/ingestion issues.”
- Sync Health helper text: “If a location shows repeated failures, reconnect Google or check permissions/scopes.”
- Funnel helper text: “Posted counts include manual posting confirmations to keep reporting accurate even when APIs are limited.”

This spec is intended to be pasted directly into the repo as /docs/metrics-dashboard.md and implemented with minimal new dependencies (tables + simple charts).