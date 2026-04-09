# Admin Metrics Dashboard (MVP) — Implementation Spec + Queries + API/CSV (Build-Ready)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:22:45.099Z

---

Overview
Goal: Add /app/admin/metrics so a business owner/admin can see (a) Sync Health, (b) Activation Funnel KPIs from ingestion → drafted → approved → posted, and (c) Alert volumes. This uses existing data: Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, Location, Integration.

Primary user stories
1) As an admin, I can see which locations are syncing and when they last synced (and last error).
2) As an admin, I can see operational throughput: reviews ingested, drafts created, approvals, posted replies, plus response time.
3) As an admin, I can see reputation trend: avg rating, negative share, top themes.
4) As an admin, I can export metrics as CSV for debugging and sharing.

Route structure (Next.js App Router)
- /app/admin/metrics (page): server component, reads query params.
  Query params:
  - from=YYYY-MM-DD (optional; default last 30 days)
  - to=YYYY-MM-DD (optional; default today)
  - locationId=string | 'all' (optional; default all enabled locations)
  - source=google|yelp|manual|all (optional)
- /api/admin/metrics (GET): returns JSON payload for the dashboard.
- /api/admin/metrics.csv (GET): returns CSV (same metrics flattened + per-location rows).

RBAC
- Only users with UserBusinessMembership for the business may access.
- If you have roles: allow role in ['owner','admin','manager'].
- Business context: derive businessId from session + membership, not from client input.

Data definitions (consistent KPIs)
Time window: filter by Review.createdAt within [from, to] inclusive.
- ingested_count: number of Review records createdAt in window.
- drafted_count: number of DraftReply createdAt in window (or linked to reviews in window; choose one and keep consistent). Recommended: drafts linked to reviews in window.
- approved_count: DraftReply with approvedAt in window.
- posted_count: DraftReply with postedAt in window OR status in ['posted_manual','posted_api'].
- response_time_hours: for posted replies: postedAt - Review.createdAt.
- time_to_first_draft_hours: DraftReply.createdAt - Review.createdAt.
- negative_count: reviews where (sentiment='negative' OR rating<=2).
- negative_share: negative_count / ingested_count.
- avg_rating: average of Review.rating (where not null) in window.
- top_themes: aggregate Review.categoryLabels (existing tags) counts.
- alerts_count: AlertEvent createdAt in window (filter type='sla_negative_review' etc.).

Important: exclude rejected drafts from response-time KPIs.
- response_time should only include drafts that ended up posted.

UI layout (minimal but useful)
Section A: Filters
- Date range picker (from/to)
- Location dropdown (All + each location)
- Source dropdown (All/Google/Yelp/Manual)
- Export CSV button linking to /api/admin/metrics.csv?from=...&to=...&locationId=...

Section B: KPI cards (top row)
- Reviews ingested
- Avg rating
- Negative share
- Drafted / Approved / Posted counts
- Median response time (hours)

Section C: Sync Health table
Columns:
- Location
- Integration source
- Sync enabled
- Last sync at
- Last error (truncated)
- Consecutive failures (if tracked; else count recent failure AlertEvents)
- Reviews fetched last 7d (optional)

Section D: Funnel table (and tiny bar chart optional)
Rows: Ingested, Drafted, Approved, Posted
Columns: Count, % of ingested

Section E: Response time distribution
- Median, P75, P90
- Optional buckets: <1h, 1–4h, 4–24h, 24–72h, >72h

Section F: Reputation trend
- Weekly buckets within window:
  - avg rating per week
  - volume per week
  - negative share per week
(If charts are heavy, render as a table first.)

Section G: Top themes + Alerts
- Top themes (categoryLabels) list with counts
- Alerts by type list with counts

Implementation approach
Use a single server-side function to compute metrics:
- lib/metrics/getBusinessMetrics.ts
Inputs: businessId, from, to, locationId?, source?
Outputs: JSON structure used by UI and CSV.

Validation (zod)
- from/to: optional ISO date; enforce from <= to; max range 365 days.
- locationId: optional; if provided, must belong to business.
- source: enum('all','google','yelp','manual').

Prisma aggregation recipes (examples)
Assume schema fields:
- Review: id, businessId, locationId, source, rating (Int?), sentiment (String?), categoryLabels (String[]?), createdAt, rawPayload (Json?)
- DraftReply: id, reviewId, businessId, status, createdAt, approvedAt, postedAt
- Location: id, businessId, name, syncEnabled, lastGbpReviewSyncUpdateTime, gbpLocationId, lastSyncAt?, lastSyncError?
- AlertEvent: id, businessId, locationId?, type, createdAt
- AuditLog: id, businessId, entityType, entityId, action, createdAt, meta (Json?)

1) Base filters
const reviewWhere = {
  businessId,
  createdAt: { gte: from, lte: to },
  ...(locationId && locationId !== 'all' ? { locationId } : {}),
  ...(source && source !== 'all' ? { source } : {}),
};

2) Ingested + avg rating
- ingested_count: prisma.review.count({ where: reviewWhere })
- avg_rating: prisma.review.aggregate({ where: { ...reviewWhere, rating: { not: null } }, _avg: { rating: true } })

3) Negative count/share
negativeWhere = {
  ...reviewWhere,
  OR: [{ sentiment: 'negative' }, { rating: { lte: 2 } }],
};
negative_count = prisma.review.count({ where: negativeWhere })
negative_share = ingested_count > 0 ? negative_count/ingested_count : 0

4) Drafted/approved/posted linked to reviews in window
First get reviewIds (for performance, do it in DB with joins if possible; simplest MVP: fetch ids capped or use createdAt join).
Preferred: query DraftReply with review relation filter:
- drafted_count: prisma.draftReply.count({ where: { businessId, review: reviewWhere } })
- approved_count: prisma.draftReply.count({ where: { businessId, approvedAt: { gte: from, lte: to }, review: reviewWhere } })
- posted_count: prisma.draftReply.count({ where: { businessId, postedAt: { gte: from, lte: to }, status: { in: ['posted_manual','posted_api'] }, review: reviewWhere } })

5) Response time stats
Fetch posted drafts in window with review.createdAt and compute in JS (Prisma lacks percentile aggregation portably).
postedDrafts = prisma.draftReply.findMany({
  where: { businessId, postedAt: { gte: from, lte: to }, status: { in: ['posted_manual','posted_api'] }, review: reviewWhere },
  select: { postedAt: true, review: { select: { createdAt: true } } }
})
Compute hours = (postedAt - review.createdAt)/3600000
Then median/p75/p90 + bucket counts.

6) Time-to-first-draft stats
firstDrafts = prisma.draftReply.findMany({
  where: { businessId, review: reviewWhere },
  select: { createdAt: true, review: { select: { id: true, createdAt: true } } },
  orderBy: { createdAt: 'asc' }
})
Compute first draft per reviewId (map, first occurrence) and same percentile logic.

7) Top themes
If categoryLabels is a String[] on Review:
reviews = prisma.review.findMany({ where: reviewWhere, select: { categoryLabels: true } })
Count occurrences across all arrays; return top 10.
If stored differently (e.g., tags table), groupBy there.

8) Weekly buckets
Create weekStart for each review.createdAt in JS after fetching minimal fields (createdAt, rating, sentiment).
reviewsForTrend = prisma.review.findMany({ where: reviewWhere, select: { createdAt: true, rating: true, sentiment: true } })
Bucket by ISO week; compute volume, avg rating, negative share.

9) Alerts counts
alerts = prisma.alertEvent.groupBy({
  by: ['type'],
  where: { businessId, createdAt: { gte: from, lte: to }, ...(locationId!='all'?{locationId}:{}) },
  _count: { _all: true }
})

10) Sync health per location
locations = prisma.location.findMany({
  where: { businessId },
  select: { id: true, name: true, syncEnabled: true, lastGbpReviewSyncUpdateTime: true, gbpLocationId: true }
})
Optionally join Integration data if you track lastSyncAt/lastError there; otherwise compute “last sync” from AuditLog actions like 'gbp_sync_success' and last error from 'gbp_sync_failed'.
Example:
lastSyncEvents = prisma.auditLog.findMany({
  where: { businessId, entityType: 'Location', action: { in: ['gbp_sync_success','gbp_sync_failed'] }, createdAt: { gte: fromMinus90d } },
  orderBy: { createdAt: 'desc' }
})
Reduce to last success/error per location.

JSON response shape (/api/admin/metrics)
{
  range: { from, to },
  filters: { locationId, source },
  kpis: {
    ingested: number,
    avgRating: number | null,
    negativeCount: number,
    negativeShare: number,
    drafted: number,
    approved: number,
    posted: number,
    responseTime: { medianHours: number|null, p75Hours: number|null, p90Hours: number|null, buckets: Record<string, number> },
    timeToFirstDraft: { medianHours: number|null, p75Hours: number|null }
  },
  funnel: [
    { stage: 'ingested', count: number, pctOfIngested: 1 },
    { stage: 'drafted', count: number, pctOfIngested: number },
    { stage: 'approved', count: number, pctOfIngested: number },
    { stage: 'posted', count: number, pctOfIngested: number }
  ],
  trendWeekly: Array<{ weekStart: string, volume: number, avgRating: number|null, negativeShare: number }>,
  topThemes: Array<{ theme: string, count: number }>,
  alertsByType: Array<{ type: string, count: number }>,
  syncHealth: Array<{ locationId: string, locationName: string, source: 'google'|'yelp'|'manual', enabled: boolean, lastSyncAt: string|null, lastError: string|null }>
}

CSV export (/api/admin/metrics.csv)
Two-section CSV (simplest):
1) Summary rows (key,value)
2) Per-location sync health rows
3) Weekly trend rows
Example headers:
- summary: metric,value
- sync_health: locationId,locationName,source,enabled,lastSyncAt,lastError
- weekly_trend: weekStart,volume,avgRating,negativeShare

Implementation notes
- Keep charts optional: start with tables + KPI cards to ship fast.
- Use existing Tailwind components from the app; avoid adding chart libs unless already present.
- Performance: for large datasets, add an upper limit or move trend computations to SQL later. For MVP/local businesses, JS bucketing is fine.
- Instrumentation: add Sentry spans for getBusinessMetrics and include counts returned; log query duration.

Done criteria
- /app/admin/metrics loads for a business member, shows KPIs and sync health for chosen range.
- CSV export works and matches on-screen counts.
- No new paid tools required.

Customer-facing note (if you later want to share metrics screenshots)
Dashboard can be presented as part of the product legitimacy alongside the website URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
