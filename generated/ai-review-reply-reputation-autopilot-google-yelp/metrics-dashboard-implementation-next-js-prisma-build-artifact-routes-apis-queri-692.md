# Metrics Dashboard Implementation (Next.js + Prisma) — Build Artifact (Routes, APIs, Queries, UI)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T09:08:32.927Z

---

Below is the concrete build artifact for the in-app metrics dashboard, matching the existing MVP stack (Next.js App Router + Prisma/Postgres + Tailwind). It includes route structure, API contracts, Prisma aggregation logic, and the UI layout. This is designed to work without adding any paid services or new infrastructure.

1) Routes
- UI page (server component): /app/admin/metrics
- JSON API: /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=optional&tz=optional
- CSV export: /api/admin/metrics.csv?from=...&to=...&locationId=...&tz=...

2) Metric definitions (single source of truth)
- Ingested reviews: Review.createdAt in [from,to], optionally filtered by locationId.
- Drafted: DraftReply.createdAt in [from,to] where DraftReply.reviewId belongs to scoped reviews.
- Approved: AuditLog eventType in {draft.approved} in [from,to], scoped by business + optional location.
- Posted: DraftReply.status in {posted_manual, posted_api} AND DraftReply.postedAt in [from,to].
- Response time: for posted drafts, postedAt - Review.createdAt. Report avg + median; exclude rejected/never-posted.
- Negative share: (# reviews with sentiment=negative OR rating<=2) / total ingested.
- Ratings trend: daily buckets of avg(rating) and count.
- Top themes: count of category labels on reviews (service/price/staff/quality/cleanliness/wait_time/other).
- Sync health: for each enabled location, show lastGbpSyncAt, lastGbpError, consecutiveFailures, and lastGbpReviewSyncUpdateTime.
- Alerts: count of AlertEvent by type and day.

3) API response shape (/api/admin/metrics)
{
  range: { from, to, tz },
  scope: { businessId, locationId|null },
  kpis: {
    reviewsIngested: number,
    draftsCreated: number,
    draftsApproved: number,
    draftsPosted: number,
    approvalRate: number,      // approved/drafted
    postingRate: number,       // posted/approved
    avgRating: number|null,
    negativeShare: number,
    avgResponseHours: number|null,
    medianResponseHours: number|null
  },
  series: {
    ratingsByDay: Array<{ day: string, count: number, avgRating: number|null }>,
    volumeByDay: Array<{ day: string, count: number }>,
    alertsByDay: Array<{ day: string, count: number }>
  },
  breakdowns: {
    bySentiment: { positive: number, neutral: number, negative: number },
    topThemes: Array<{ theme: string, count: number }>,
    syncHealth: Array<{ locationId: string, locationName: string, enabled: boolean, lastSyncAt: string|null, lastError: string|null, consecutiveFailures: number }>
  }
}

4) Query strategy (Prisma)
Key idea: compute a scoped set of reviewIds first, then aggregate DraftReply and AuditLog against that set.
Pseudo-code (server-only):
- const reviews = await prisma.review.findMany({ where: { businessId, locationId?, createdAt: { gte: from, lte: to } }, select: { id, rating, sentiment, createdAt, categories } })
- reviewIds = reviews.map(r=>r.id)
- drafts = await prisma.draftReply.findMany({ where: { businessId, reviewId: { in: reviewIds }, createdAt: { gte: from, lte: to } }, select: { id, reviewId, status, postedAt, createdAt } })
- approvals = await prisma.auditLog.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to }, eventType: 'draft.approved' } })
- posted = drafts.filter(d=>d.postedAt && (d.status==='posted_manual'||d.status==='posted_api'))
- responseTimesHours = posted.map(d => (d.postedAt - reviewCreatedAt(d.reviewId))/3600000)
- median = computeMedian(responseTimesHours)

Ratings/volume/alerts series: use groupBy with date truncation via raw SQL for performance.
Example (Postgres) using prisma.$queryRaw:
- SELECT date_trunc('day', "createdAt" at time zone $tz) AS day, count(*) AS count, avg("rating") AS avg
  FROM "Review" WHERE "businessId"=$1 AND "createdAt">=$2 AND "createdAt"<=$3 AND (optional location)
  GROUP BY day ORDER BY day;

Sync health: prisma.location.findMany({ where: { businessId }, select: { id,name,enabled,lastGbpSyncAt,lastGbpError,gbpConsecutiveFailures,lastGbpReviewSyncUpdateTime } })

5) UI layout (/app/admin/metrics)
- Header: “Metrics” + filters (date range, location dropdown, Apply)
- KPI cards row: Reviews, Avg Rating, Negative Share, Avg Response Time, Posted Rate
- Charts row: Ratings Trend sparkline + Volume sparkline
- Tables:
  a) Sync Health per location (last sync, failures, last error)
  b) Funnel table (ingested, drafted, approved, posted) with conversion rates
  c) Top Themes list
  d) Alerts summary by type
- Buttons: “Export CSV” linking to /api/admin/metrics.csv with same query params

6) RBAC + validation
- Require authenticated user and membership in UserBusinessMembership for the requested businessId (resolved from session).
- Validate from/to with Zod; max range 180 days; if missing defaults to last 30 days.
- locationId must belong to the same business.

7) Instrumentation
- Add correlationId per request.
- Log query timings for: scopedReviewsMs, draftsMs, approvalsMs, seriesMs.
- Sentry span per API call and breadcrumb for filter params.

8) CSV export
Produce multiple CSV sections (or separate endpoints). Fastest: single CSV with “section” column.
Example rows:
section,kpi,value
kpi,reviewsIngested,123
kpi,avgRating,4.6
series_ratingsByDay,2026-04-01,count=5;avg=4.8
syncHealth,locationId=...,lastSyncAt=...,consecutiveFailures=0

9) Linkability (next polish)
- Add links from theme/sentiment rows to /app/reviews?sentiment=negative&from=...&to=...&locationId=...
- Add link from sync-health row to integration page.

This artifact is ready to paste into the repo as the implementation blueprint. It directly supports distribution/revenue by giving owners proof of impact (response time, negative share reduction, and sync reliability), and it reuses the existing data model so it can ship immediately without waiting on new integrations.