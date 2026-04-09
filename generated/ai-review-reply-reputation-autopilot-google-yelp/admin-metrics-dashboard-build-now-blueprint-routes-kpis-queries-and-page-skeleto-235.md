# Admin Metrics Dashboard (Build-Now Blueprint): Routes, KPIs, Queries, and Page Skeleton

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:40:01.267Z

---

Goal
Ship /app/admin/metrics that answers: (1) Is Google/Yelp/manual ingestion healthy per location? (2) Are we converting reviews → drafts → approvals → posted replies? (3) Are alerts/escalations under control? Must work with existing tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog.

Routes
1) UI: GET /app/admin/metrics
- Server Component page with filters: date range (from/to), locationId (optional), source (optional), sentiment (optional).
- Sections: Summary cards, Sync Health table, Funnel table, Response-time distribution, Alerts table, Top themes.

2) Data API (JSON): GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...&source=...
- Returns a single JSON payload for the page.

3) CSV Export: GET /api/admin/metrics.csv?from=...&to=...&locationId=...
- Exports a flat table with daily rollups + per-location rollups.

RBAC/Access
- Require logged-in user.
- Verify membership: UserBusinessMembership where userId + businessId.
- businessId resolved from session context (single-business MVP) or explicit param if multi-business admin.

Canonical KPI Definitions (important for consistency)
Time window: Reviews createdAt within [from,to].

Counts:
- ingested_reviews: Review where businessId AND createdAt in range AND (optional location/source filters)
- drafted_reviews: reviews that have at least one DraftReply (latest draft created) AND that DraftReply.createdAt in range OR Review.createdAt in range (choose one and stick to it)
  Recommended: attribute drafting to review; count drafted if exists any draft regardless of draft date, but filter reviews by createdAt window.
- approved_replies: DraftReply.status == 'approved' AND Review.createdAt in range
- posted_replies: DraftReply.status in ('posted_api','posted_manual') AND Review.createdAt in range

Rates:
- draft_rate = drafted_reviews / ingested_reviews
- approval_rate = approved_replies / drafted_reviews
- posting_rate = posted_replies / approved_replies

Response time:
- response_time_hours = (postedAt - Review.createdAt)
  postedAt: DraftReply.postedAt (or updatedAt when status becomes posted if postedAt is null).
  Exclude: rejected, never-posted, and drafts without posted timestamp.

Negative share:
- negative_reviews: Review.sentiment == 'negative' OR rating <= 2 (match your escalation default)
- negative_share = negative_reviews / ingested_reviews

Top themes:
- Use Review.categoryLabels (service/price/staff/quality/cleanliness/wait_time/other) counted across reviews in range.

Sync health:
- Per Location: lastGbpSyncAt, lastGbpError, lastGbpReviewSyncUpdateTime watermark, reviews_ingested_last_24h, consecutive_failures (if tracked) OR infer from AlertEvent types.

Data Model Assumptions
- Review has: id, businessId, locationId, source, rating, author, text, createdAt, sentiment, categoryLabels[], rawPayload, ocrRawText?
- DraftReply has: id, reviewId, status, content, createdAt, updatedAt, approvedAt?, postedAt?, postedByUserId?
- AlertEvent has: id, businessId, locationId?, type, severity, createdAt, payload
- Location has: id, businessId, name, gbpLocationId?, lastGbpReviewSyncUpdateTime?, lastSyncAt?, lastSyncError?

Prisma Query Blueprint (JSON endpoint)
Inputs: businessId, from, to, locationId?, source?

1) Base where for reviews:
reviewWhere = {
  businessId,
  createdAt: { gte: fromDate, lt: toDatePlus1 },
  ...(locationId ? { locationId } : {}),
  ...(source ? { source } : {}),
}

2) Ingested reviews count:
const ingested = await prisma.review.count({ where: reviewWhere })

3) Drafted/Approved/Posted counts (join via reviewId):
Approach A (simple, reliable): fetch reviewIds in range then aggregate DraftReply by those IDs.
- reviewIds = prisma.review.findMany({ where: reviewWhere, select: { id:true } })
- drafted = prisma.draftReply.groupBy({ by:['reviewId'], where:{ reviewId:{ in: ids } } }) then count groups
- approved = prisma.draftReply.count({ where:{ reviewId:{in:ids}, status:'approved' } }) BUT this double counts if multiple drafts; instead count distinct reviewId where latest draft is approved.
Recommended: add “latestDraftReplyId” on Review later. For MVP: compute latest in query:
- latestDrafts = prisma.draftReply.findMany({ where:{ reviewId:{in:ids} }, orderBy:[{reviewId:'asc'},{createdAt:'desc'}], distinct:['reviewId'], select:{reviewId:true,status:true,postedAt:true,createdAt:true,updatedAt:true} })
Then:
- drafted_reviews = latestDrafts.length
- approved_replies = count where status=='approved'
- posted_replies = count where status in ('posted_api','posted_manual')

4) Response time stats:
For latestDrafts where status posted:
- fetch Review.createdAt for those reviewIds (map)
- compute response_time_hours distribution buckets: <2h, 2-8h, 8-24h, 1-3d, >3d
- compute avg/median (median by sort; fine for MVP sizes)

5) Negative share:
negativeCount = prisma.review.count({ where:{ ...reviewWhere, OR:[{ sentiment:'negative' },{ rating:{ lte:2 } }] } })

6) Ratings trend (daily):
Group by day with raw SQL (Prisma.$queryRaw) for Postgres:
SELECT date_trunc('day', "createdAt") AS day,
       COUNT(*) AS reviews,
       AVG("rating") AS avg_rating
FROM "Review"
WHERE "businessId" = $1 AND "createdAt" >= $2 AND "createdAt" < $3
  AND ($4::text IS NULL OR "locationId" = $4)
GROUP BY 1 ORDER BY 1;

7) Top themes:
If categoryLabels is a text[] column in Postgres:
SELECT label, COUNT(*) AS cnt
FROM (
  SELECT unnest("categoryLabels") AS label
  FROM "Review"
  WHERE "businessId"=$1 AND "createdAt">=$2 AND "createdAt"<$3
) t
GROUP BY label ORDER BY cnt DESC LIMIT 10;

8) Alerts summary:
alerts = prisma.alertEvent.findMany({ where:{ businessId, createdAt:{gte:from,lt:to}, ...(locationId?{locationId}: {}) }, orderBy:{createdAt:'desc'}, take:50 })
alertCountsByType = group in JS or groupBy if supported.

9) Sync health table:
locations = prisma.location.findMany({ where:{ businessId }, select:{ id:true,name:true,lastSyncAt:true,lastSyncError:true,lastGbpReviewSyncUpdateTime:true, enabledSync:true } })
Plus recent ingestion per location last 24h:
SELECT "locationId", COUNT(*) as cnt
FROM "Review"
WHERE "businessId"=$1 AND "createdAt" >= now() - interval '24 hours'
GROUP BY "locationId";

JSON Response Shape
{
  range: { from, to },
  filters: { locationId, source },
  summary: {
    ingested, drafted_reviews, approved_reviews, posted_reviews,
    draft_rate, approval_rate, posting_rate,
    negative_count, negative_share,
    avg_response_hours, median_response_hours
  },
  responseTimeBuckets: [{ bucket:'<2h', count: X }, ...],
  ratingsDaily: [{ day:'2026-04-01', reviews: 12, avg_rating: 4.42 }, ...],
  themesTop: [{ label:'service', count: 18 }, ...],
  alerts: { countsByType: {...}, latest: [...] },
  syncHealth: [{ locationId,name,lastSyncAt,lastSyncError,watermark,last24hIngested }]
}

UI Skeleton (minimal dependencies)
- Use server-rendered tables + simple SVG sparkline for ratingsDaily (or plain table if speed).
- Components:
  - <MetricsFilters /> (from/to/location)
  - <SummaryCards /> (4–6 cards)
  - <SyncHealthTable />
  - <FunnelTable />
  - <ResponseTimeBucketsBar /> (simple div bars)
  - <AlertsTable />
  - <TopThemesList />
  - CSV export button linking to /api/admin/metrics.csv with same query params.

CSV Export Columns (rollup rows)
- date, locationId, locationName, ingested, drafted, approved, posted, negative, avg_rating, avg_response_hours, alerts_count
Also export a second section (or separate file later) for raw latest alerts.

Instrumentation
- Add AuditLog event: metrics_viewed (userId,businessId,filters)
- Log slow query timings; capture exceptions in Sentry.

Implementation Notes
- Keep computations based on “latest draft per review” to avoid double counting.
- If performance becomes an issue, add Review.latestDraftReplyId and update it on draft create/update; but do not block MVP on this.
- No paid services needed; all computed from existing DB + logs.
