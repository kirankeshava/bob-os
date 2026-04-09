# In-App Metrics Dashboard (MVP) — Implementation Doc (Next.js App Router + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:50:05.787Z

---

Objective
Ship /app/admin/metrics to give each business owner/admin a real-time view of: (1) Sync health for Google/Yelp/manual ingestion, (2) Activation funnel from ingest → draft → approval → posted, (3) SLA/alerts volume and unresolved negative reviews. Must work with existing schema/tables and avoid new paid tooling.

Public legitimacy link to include in any future customer comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) Routes + RBAC
A) Page
- GET /app/admin/metrics
  - Server Component, requires authenticated user membership in current Business.
  - Query params:
    - from=YYYY-MM-DD (optional; default last 30 days)
    - to=YYYY-MM-DD (optional; default today)
    - locationId=string (optional; default all)

B) JSON API
- GET /api/admin/metrics?from&to&locationId
  - Returns a single JSON payload with summary cards + tables.

C) CSV export
- GET /api/admin/metrics.csv?from&to&locationId
  - Returns text/csv attachment with key rows (daily counts, funnel, alerts).

RBAC rules
- Only members of Business can access.
- If you have role separation (admin vs member), allow metrics read for both, but restrict “system” fields (raw errors) to admin.

2) Data definitions (critical to keep consistent)
Time window
- Use Review.createdAt for ingestion-time metrics (when review happened).
- Use AuditLog.createdAt for workflow actions (drafted/approved/posted).
- For response time, use: postedAt - Review.createdAt (or - firstSeenAt if you have it). In current build, use Review.createdAt and DraftReply.postedAt or AuditLog(POSTED_MANUAL). Exclude rejected drafts.

Funnel states
- Ingested: Review exists in DB within window.
- Drafted: At least one DraftReply created for that Review within window.
- Approved: DraftReply.status == 'approved' (or AuditLog action APPROVE_DRAFT) within window.
- Posted: DraftReply.status in ('posted_manual','posted_api') OR postedAt not null within window.

Negative review definition (for alerting / backlog)
- rating <= 2 OR sentiment == 'negative'.

3) Backend implementation details
Use zod to validate query params and normalize dates.

Example query validation (pseudo-code)
- from: optional string → Date at 00:00:00
- to: optional string → Date at 23:59:59
- locationId: optional string

3.1 Metrics: Sync health per location
Data sources:
- Location: last sync timestamps and last error fields you already store (e.g., lastGbpReviewSyncUpdateTime, lastSyncAt, lastSyncError)
- Integration: enabled/connected flags
- AlertEvent: sync failure events

Payload shape
{
  syncHealth: [
    {
      locationId,
      locationName,
      source: 'google'|'yelp'|'manual',
      enabled: boolean,
      lastSyncAt: string|null,
      lastError: string|null,
      lastReviewUpdateTimeWatermark: string|null,
      failures7d: number
    }
  ]
}

Prisma outline
- locations = findMany where businessId and (optionally locationId)
- failures7d = count AlertEvent where type in ('INTEGRATION_SYNC_FAILED','GBP_SYNC_FAILED','YELP_SYNC_FAILED') AND createdAt >= now-7d grouped by locationId

3.2 Metrics: Summary cards (date window)
Cards
- Reviews ingested
- Avg rating
- Negative share
- Median response time (hours)
- Approval rate (approved/drafted)
- Posting rate (posted/approved)

Prisma patterns
A) Reviews ingested + avg rating + negative share
- reviews = findMany where businessId, createdAt between from/to, and optionally locationId
- count = reviews.length
- avgRating = sum(rating)/count
- negativeCount = count where rating <= 2 OR sentiment == 'negative'
- negativeShare = negativeCount / count

Better: use aggregate queries
- prisma.review.aggregate({ _count: true, _avg: { rating: true }, where })
- prisma.review.count({ where: { ...where, OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }] } })

B) Draft/approve/post counts
- draftedCount: prisma.draftReply.count({ where: { businessId, createdAt between from/to, ...(location filter via review join) } })
Because DraftReply may not have locationId, join through Review.
In Prisma: where: { review: { businessId, locationId? , createdAt? (optional) } } depending on desired window.
Recommendation: for funnel, filter by Review.createdAt in window to keep cohort consistent.

Cohort-based funnel (recommended)
- Cohort = Reviews createdAt in [from,to]
- draftedCount = count distinct reviewId in DraftReply where reviewId in cohort
- approvedCount = count distinct reviewId where DraftReply.status='approved' or 'posted_*'
- postedCount = count distinct reviewId where status starts with 'posted'

Implementation approach
1) Get cohortReviewIds with prisma.review.findMany({ select: { id: true }, where: { businessId, createdAt: { gte: from, lte: to }, ...(locationId) } })
2) Use prisma.draftReply.groupBy({ by: ['reviewId'], where: { reviewId: { in: cohortIds } } }) to compute drafted distinct
3) Use prisma.draftReply.groupBy with where status in approved/posted for approved distinct
4) Use prisma.draftReply.groupBy with where status in posted_* for posted distinct

D) Response time median
Option 1 (fast, ok for MVP): compute in app memory
- Fetch posted drafts joined to Review.createdAt:
  prisma.draftReply.findMany({
    where: { status: { in: ['posted_manual','posted_api'] }, review: { id in cohortIds } },
    select: { postedAt: true, review: { select: { createdAt: true } } }
  })
- Compute hours = (postedAt - review.createdAt)
- median = p50

Option 2 (SQL percentile): only if you want raw SQL; not needed for MVP.

3.3 Metrics: Tables
A) Daily trend table (for charting)
- For each day in window:
  - reviewsCount
  - avgRating
  - negativeCount
  - postedCount
Implementation
- Generate date buckets in app (array of dates)
- For each day run groupBy OR one raw SQL groupBy DATE(createdAt)
MVP-friendly raw SQL (Postgres)
SELECT DATE("createdAt") as day,
       COUNT(*) as reviews,
       AVG(rating) as avg_rating,
       SUM(CASE WHEN rating <= 2 OR sentiment='negative' THEN 1 ELSE 0 END) as negative
FROM "Review"
WHERE "businessId" = $1 AND "createdAt" BETWEEN $2 AND $3
GROUP BY 1
ORDER BY 1;

B) Top themes (category labels)
Assuming Review has categoryLabels[] (or similar)
- Pull reviews in window, flatten labels, count frequency.
- Output top 5-10 themes.

C) Negative backlog (needs attention)
- List negative reviews with no posted reply and createdAt within last 30/60 days.
- Query:
  prisma.review.findMany({
    where: {
      businessId,
      ...(locationId),
      OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }],
      draftReplies: { none: { status: { in: ['posted_manual','posted_api'] } } }
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  })

D) Alerts table
- AlertEvent in window grouped by type + status.
- Show last 20 alerts with createdAt, type, message, resolvedAt.

4) API response contract (recommended)
{
  range: { from: string, to: string },
  filters: { locationId: string|null },
  cards: {
    reviewsIngested: number,
    avgRating: number|null,
    negativeShare: number,
    draftedDistinct: number,
    approvedDistinct: number,
    postedDistinct: number,
    medianResponseHours: number|null
  },
  tables: {
    daily: Array<{ day: string, reviews: number, avgRating: number|null, negative: number, posted: number }>,
    topThemes: Array<{ theme: string, count: number }>,
    negativeBacklog: Array<{ reviewId: string, locationName: string|null, rating: number, author: string|null, createdAt: string, snippet: string }>,
    alerts: Array<{ id: string, type: string, createdAt: string, message: string, resolvedAt: string|null }>
  },
  syncHealth: Array<{ locationId: string, locationName: string, source: string, enabled: boolean, lastSyncAt: string|null, lastError: string|null, failures7d: number }>
}

5) Frontend UI (fast + reliable)
/app/admin/metrics
Layout
- Header: “Metrics” + date range picker + location dropdown + Export CSV button.
- Row 1: Summary cards (6 cards).
- Row 2: Daily trend table (and optionally a small sparkline chart later).
- Row 3: Two columns: Top themes + Negative backlog.
- Row 4: Sync health table + Recent alerts.

Implementation tips
- Server Component fetches JSON from internal function directly (avoid extra HTTP hop) OR call /api/admin/metrics.
- Use simple HTML tables first; add chart lib later only if needed.

6) CSV export format
metrics_summary.csv
Sections separated by blank line.
- Summary row (from,to,reviews,avgRating,negativeShare,medianResponseHours)
- Daily rows
- Top themes rows
- Sync health rows

7) Instrumentation
- Wrap metrics API in try/catch, log correlationId, businessId, timing.
- On query errors, Sentry captureException with tags: route=metrics, businessId.

8) Acceptance criteria (MVP done)
- Logged-in business member can load /app/admin/metrics in <3s for 30-day range with up to 5k reviews.
- Metrics align with WeeklyReport definitions (same negative definition, response time excludes rejected).
- CSV export downloads and opens in Google Sheets.
- Sync health shows last sync and failures per location.

If you want a customer-facing “What this dashboard means” blurb later, we can add a short tooltip section and link to the public legitimacy URL above.