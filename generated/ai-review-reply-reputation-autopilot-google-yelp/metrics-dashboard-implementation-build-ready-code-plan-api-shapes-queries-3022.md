# Metrics Dashboard Implementation (Build-Ready Code Plan + API Shapes + Queries)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:11:20.159Z

---

Below is the concrete implementation plan and code-level design for the /app/admin/metrics dashboard and its supporting endpoints. This is written to match the existing stack (Next.js App Router + Prisma + Postgres + Tailwind) and the current schema entities: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

1) Routes + RBAC
- Page: /app/admin/metrics
  - Server Component that resolves current user, business context, and enforces membership via UserBusinessMembership.
  - Reads search params: start, end (ISO), locationId (optional), tz (optional).
- API: /api/admin/metrics (GET)
  - Validates query params with Zod.
  - Resolves businessId from session + membership (never accept businessId from client).
- API: /api/admin/metrics.csv (GET)
  - Same params + RBAC.
  - Returns text/csv with Content-Disposition.

2) KPI Definitions (must stay consistent)
- Ingested: Reviews createdAt within date range (or ingestedAt if present; otherwise createdAt/firstSeenAt). Use Review.createdAt in MVP.
- Drafted: DraftReply createdAt within date range, joined to Review filters.
- Approved: DraftReply.approvedAt within date range.
- Posted: DraftReply.postedAt within date range AND status in {posted_manual, posted_api}.
- Avg response time: avg( postedAt - Review.createdAt ) for posted drafts only; exclude rejected/unposted.
- Negative share: count(reviews where sentiment='negative' OR rating<=2) / total reviews in range.
- Top themes: group by Review.categoryLabels (array) counting occurrences (limit 5).
- Sync health per location: Location.lastGbpSyncAt, Location.lastGbpSyncError, Location.lastGbpReviewSyncUpdateTime (watermark), plus count of reviews ingested last 7 days.
- Alerts: AlertEvent createdAt within range, grouped by type/severity.

3) API Response Shapes
GET /api/admin/metrics returns JSON:
{
  range: { start: string, end: string, tz: string },
  filters: { locationId?: string },
  funnel: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    approvalRate: number,   // approved/drafted
    postRate: number        // posted/approved
  },
  kpis: {
    avgRating: number|null,
    negativeShare: number|null,
    avgFirstResponseHours: number|null
  },
  trends: {
    reviewsByDay: Array<{ day: string, total: number, negative: number, avgRating: number|null }>,
    responseTimeByDay: Array<{ day: string, avgHours: number|null }>
  },
  themes: Array<{ label: string, count: number }>,
  alerts: {
    total: number,
    byType: Array<{ type: string, count: number }>
  },
  syncHealth: Array<{
    locationId: string,
    locationName: string,
    source: 'google'|'yelp'|'manual',
    enabled: boolean,
    lastSyncAt: string|null,
    lastError: string|null,
    watermark: string|null,
    reviewsLast7d: number
  }>
}

4) Prisma Query Strategy (fast + reliable)
- Always apply filters consistently:
  - businessId required.
  - locationId optional.
  - date range filter applied to the event timestamp relevant to each metric.

Example pseudo-code for aggregations (server-side):
- ingestedCount = prisma.review.count({ where: { businessId, ...(locationId?{locationId}:{ }), createdAt: { gte: start, lt: end } } })
- draftedCount = prisma.draftReply.count({ where: { businessId, ...(locationId?{locationId}:{ }), createdAt: { gte: start, lt: end } } })
- approvedCount = prisma.draftReply.count({ where: { businessId, ...(locationId?{locationId}:{ }), approvedAt: { gte: start, lt: end }, status: { in: ['approved','posted_manual','posted_api'] } } })
- postedCount = prisma.draftReply.count({ where: { businessId, ...(locationId?{locationId}:{ }), postedAt: { gte: start, lt: end }, status: { in: ['posted_manual','posted_api'] } } })
- avgRating = prisma.review.aggregate({ where: sameRangeFilter, _avg: { rating: true } })
- negativeShare = negativeCount / ingestedCount where negativeCount uses OR sentiment/rating filter.
- avgFirstResponseHours: use prisma.draftReply.findMany({ where: postedFilter, select: { postedAt: true, review: { select: { createdAt: true } } } }) then compute average in JS to avoid DB-specific interval math issues across providers.

Trends (by day):
- Use Postgres date_trunc('day', createdAt AT TIME ZONE tz) grouping via prisma.$queryRaw for correctness + speed.
- Provide day as YYYY-MM-DD.

Themes:
- If categoryLabels is string[] column: use unnest(categoryLabels) group by label in SQL via $queryRaw.
- If stored as JSON: use jsonb_array_elements_text.

Sync health:
- prisma.location.findMany({ where: { businessId }, select: { id,name, enabledSync, lastGbpSyncAt,lastGbpSyncError,lastGbpReviewSyncUpdateTime, integrationType } })
- Add reviewsLast7d via groupBy on Review.locationId with createdAt >= now-7d.

5) CSV Export
GET /api/admin/metrics.csv returns a simple flat export:
- Header rows: business, range, location filter.
- KPI rows: ingested,drafted,approved,posted,approvalRate,postRate,avgRating,negativeShare,avgFirstResponseHours.
- Trend table: day,totalReviews,negativeReviews,avgRating,avgResponseHours.
- Themes table: label,count.
- Alerts table: type,count.
- Sync health table: locationName,lastSyncAt,lastError,watermark,reviewsLast7d.

6) UI Components (Tailwind)
- Filter bar: date picker inputs + location select + Apply.
- KPI cards: Funnel counts + Avg rating + Negative share + Avg response time.
- Tables: Sync health + Alerts by type.
- Charts (optional lightweight): render trends as simple sparkline SVGs or plain tables first; keep reliability > polish.

7) Reliability + Instrumentation
- Wrap API handler in try/catch; send Sentry error with tags: businessId, locationId, route.
- Add timing logs for each query block.
- Set Cache-Control: private, max-age=30 to avoid re-computation on fast refresh while staying near-real-time.

8) Pilot Monitoring Checklist (how metrics will be used)
- During pilot, check /app/admin/metrics daily:
  - Sync health shows each location lastSyncAt within expected window.
  - Funnel ratios: drafted roughly equals ingested for new reviews; approved/posted should not stall.
  - Alerts count spikes correlate with negative share.
If any location shows lastError repeatedly, inspect /api/health/integrations and Sentry traces using correlationId from structured logs.

This plan is intended to be dropped into the existing codebase with minimal new dependencies, leveraging Prisma for counts/aggregates and $queryRaw only where time bucketing/array unnest is necessary. It keeps the system operationally observable so we can confidently run real-business pilots and debug issues quickly.