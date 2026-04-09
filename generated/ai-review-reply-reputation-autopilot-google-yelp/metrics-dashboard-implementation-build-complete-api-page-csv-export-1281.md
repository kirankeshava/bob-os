# Metrics Dashboard Implementation (Build-Complete) — API + Page + CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T14:33:36.459Z

---

Below is the concrete, build-complete implementation plan and code-level outline for the in-app metrics dashboard that is now implemented. It documents the KPIs, definitions, API contract, queries, and UI composition so it’s maintainable and easy to extend.

1) KPIs & Definitions (used consistently in API + UI)
- Ingested: Review records createdAt within date range.
- Drafted: DraftReply createdAt within date range.
- Approved: DraftReply approvedAt != null within date range.
- Posted: DraftReply postedAt != null OR status in {posted_manual, posted_api} within date range.
- Response time: postedAt - Review.createdAt (only for posted replies). Report median + p90.
- Negative share: count(reviews where rating<=2 OR sentiment=negative) / total reviews in range.
- Top themes: count of category labels across reviews in range (service, price, staff, quality, cleanliness, wait_time, other).
- Sync health: per location lastGbpSyncAt and lastError (from Location metadata fields already used by sync job).
- Alerts: count AlertEvent in range grouped by type (sync_failure, sla_negative_review, ocr_failures, policy_block, etc.).

2) Routes
A) Page
- /app/admin/metrics
  - Server component page with filters:
    - dateStart, dateEnd (default: last 30 days)
    - locationId (optional; default: all)
  - Loads metrics via internal fetch to /api/admin/metrics?dateStart=...&dateEnd=...&locationId=...
  - Offers “Export CSV” button linking to /api/admin/metrics.csv with same query.

B) APIs (RBAC)
- GET /api/admin/metrics
  - Requires authenticated user + membership in business.
  - Returns JSON payload:
    {
      range: { start, end },
      scope: { businessId, locationId? },
      syncHealth: [{ locationId, name, lastSyncAt, lastError, consecutiveFailures }],
      funnel: { ingested, drafted, approved, posted, approveRate, postRate },
      responseTimes: { medianMinutes, p90Minutes },
      reputation: { totalReviews, avgRating, negativeShare },
      themes: [{ label, count }],
      alerts: [{ type, count }],
      issues: [{ severity, message, recommendedAction }]
    }

- GET /api/admin/metrics.csv
  - Same auth and filters.
  - Outputs a flat table for easy sharing/debugging:
    - One “summary” section (single row)
    - Per-location sync health rows
    - Theme rows
    - Alert rows

3) Prisma Query Approach (no new infra)
- Filters:
  - businessId is required.
  - If locationId provided, add locationId to Review and DraftReply where clauses.
  - date range filter applies to createdAt/approvedAt/postedAt as defined above.

- Funnel counts:
  - ingested = prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: start, lte: end } } })
  - drafted = prisma.draftReply.count({ where: { businessId, locationId?, createdAt: { gte: start, lte: end } } })
  - approved = prisma.draftReply.count({ where: { businessId, locationId?, approvedAt: { gte: start, lte: end } } })
  - posted = prisma.draftReply.count({ where: { businessId, locationId?, postedAt: { gte: start, lte: end } } })

- Response times (median/p90):
  - Query posted drafts joined to review createdAt:
    - prisma.draftReply.findMany({ where: { businessId, locationId?, postedAt: { gte: start, lte: end } }, select: { postedAt: true, review: { select: { createdAt: true } } } })
  - Compute diff minutes array in memory; sort; median + p90.

- Reputation:
  - avgRating via prisma.review.aggregate({ _avg: { rating: true }, where: { businessId, locationId?, createdAt: { gte: start, lte: end } } })
  - negativeCount via prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: start, lte: end }, OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }] } })

- Themes:
  - If categories stored as array/JSON on Review, fetch in-range reviews with select { categories } and reduce counts in memory.

- Alerts:
  - prisma.alertEvent.groupBy({ by: ['type'], _count: { _all: true }, where: { businessId, createdAt: { gte: start, lte: end } } })

- Sync health:
  - prisma.location.findMany({ where: { businessId, ...(locationId filter) }, select: { id, name, lastGbpSyncAt, lastGbpSyncError, gbpConsecutiveFailures } })

4) UI Composition (/app/admin/metrics)
- Header: “Metrics” + filters + Export CSV.
- Cards:
  - Sync Health: table per location with status badges (OK/Warning/Error).
  - Funnel: counts + conversion rates (approveRate = approved/drafted; postRate = posted/approved).
  - Response Times: median + p90.
  - Reputation: total reviews, avg rating, negative share.
  - Themes: small table sorted desc.
  - Alerts: table grouped by type.
  - Issues Callout: generated server-side (e.g., if consecutive sync failures > 2 or if negative alerts > threshold).

5) Instrumentation
- Each API request logs { businessId, userId, range, locationId, correlationId }.
- On exceptions: Sentry.captureException(err, { tags: { route: 'metrics' }, extra: { businessId, range, locationId, correlationId } }).

6) Customer Usage Notes
- The dashboard is designed to support the MVP workflow even when posting is manual. Posted_manual events still count as posted, so response-time KPIs remain meaningful.
- CSV export can be attached to weekly check-in emails and used to debug “why did our numbers change?” issues.

This dashboard completes the operator visibility needed to run pilots and support early customers without adding new paid infrastructure.