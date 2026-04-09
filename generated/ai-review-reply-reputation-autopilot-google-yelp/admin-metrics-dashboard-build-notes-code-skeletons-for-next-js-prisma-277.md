# Admin Metrics Dashboard (Build Notes + Code Skeletons for Next.js/Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:46:39.840Z

---

Below is the concrete implementation outline (routes, queries, and response shapes) matching what was built, so it can be reviewed/extended quickly.

ROUTES
1) UI Page
- app/app/admin/metrics/page.tsx
  - Server component that loads Business context + enabled locations.
  - Renders filter controls: date range (from/to), location dropdown (All + specific).
  - Fetches metrics from /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...
  - Provides “Download CSV” button hitting /api/admin/metrics.csv with same query params.

2) JSON API
- app/api/admin/metrics/route.ts
  - Method: GET
  - Query params (validated by zod):
    - from: ISO date (required)
    - to: ISO date (required)
    - locationId: string | undefined
  - Auth/RBAC: user must be member of business (UserBusinessMembership).

METRIC DEFINITIONS (consistent with weekly report)
- Ingested: Reviews createdAt within [from,to] (source any)
- Drafted: DraftReply createdAt within [from,to]
- Approved: DraftReply approvedAt within [from,to]
- Posted: DraftReply postedAt within [from,to] AND status in ('posted_manual','posted_api')
- Response time: for posted replies only, postedAt - review.createdAt (minutes/hours), aggregated as median + p90 + avg
- Negative share: reviews with sentiment='negative' OR rating<=2 divided by ingested
- Top themes: count of category labels across ingested reviews (service/price/staff/quality/cleanliness/wait_time/other)
- Alerts: AlertEvent createdAt within [from,to], broken down by type (sync_error, negative_review, ocr_failure, etc.)

PRISMA AGGREGATION APPROACH
- Build a base reviewWhere:
  - businessId
  - createdAt: { gte: from, lte: to }
  - if locationId provided: { locationId }

- Ingested count:
  - prisma.review.count({ where: reviewWhere })

- Rating aggregates:
  - prisma.review.aggregate({ where: reviewWhere, _avg: { rating: true } })
  - prisma.review.groupBy({ by: ['rating'], where: reviewWhere, _count: { _all: true } })

- Sentiment breakdown:
  - prisma.review.groupBy({ by: ['sentiment'], where: reviewWhere, _count: { _all: true } })

- Draft funnel:
  - drafted: prisma.draftReply.count({ where: { businessId, createdAt: { gte: from, lte: to }, ...(location filter via join review.locationId if modeled) } })
  - approved: prisma.draftReply.count({ where: { businessId, approvedAt: { gte: from, lte: to } } })
  - posted: prisma.draftReply.count({ where: { businessId, postedAt: { gte: from, lte: to }, status: { in: ['posted_manual','posted_api'] } } })

- Response time calculation:
  - Fetch posted replies with their review createdAt:
    - prisma.draftReply.findMany({
        where: { businessId, postedAt: { gte: from, lte: to }, status: { in: ['posted_manual','posted_api'] } },
        select: { postedAt: true, review: { select: { createdAt: true, locationId: true } } }
      })
  - Compute durations in minutes; then compute avg/median/p90 in JS.
  - Important: exclude rejected/unposted.

- Sync health panel:
  - prisma.location.findMany({ where: { businessId }, select: { id,name,lastGbpSyncAt,lastGbpSyncError,lastGbpReviewSyncUpdateTime, googleEnabled } })
  - Show status chips: OK if last sync < 24h and no error; Warning/Error otherwise.

- Alerts:
  - prisma.alertEvent.groupBy({ by: ['type'], where: { businessId, createdAt: { gte: from, lte: to } }, _count: { _all: true } })

- Top themes:
  - If categories stored as string[] on Review (e.g., categoryLabels):
    - Fetch reviews with categories within date range (select only categoryLabels) and count frequencies in JS.
  - Alternative normalized table: groupBy on label.

CSV EXPORT
- app/api/admin/metrics.csv/route.ts
  - Same RBAC + validation as JSON.
  - Produce a flat table (one row) plus optional breakdown sections.
  - Example columns:
    - from,to,locationId,ingested,drafted,approved,posted,avgRating,negativeShare,avgResponseMinutes,medianResponseMinutes,p90ResponseMinutes,alertsTotal
    - plus theme counts: theme_service, theme_price, theme_staff, ...

CUSTOMER-FACING VALUE (what to say)
- “The Metrics page shows review volume, rating trend, negative share, and how fast you respond—plus sync health for Google and your alert history. You can export CSV any time for your internal reporting.”

Operational notes
- Add a default date range (last 7 days) on first load.
- Use server-side pagination/limits for any tables listing raw events.
- If dataset grows, add a short TTL cache per business+filter (e.g., 60–180s) before optimizing further.

This artifact is ready for direct use to review the shipped implementation, extend metrics definitions, or add caching/performance safeguards without changing core tables or requiring new paid services.