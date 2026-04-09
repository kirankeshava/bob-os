# Admin Metrics Dashboard — Implementation Plan + API/Query Specs (Next.js + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:00:20.873Z

---

## Goal
Ship /app/admin/metrics that answers: (1) are integrations syncing, (2) are we responding fast enough, (3) where are reviews getting stuck (draft/approval/post), (4) how many negative reviews/alerts, and (5) what changed vs last period.

This dashboard must use existing tables only: Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog. It should match the weekly report KPI definitions.

---

## KPI Definitions (canonical)
Use these definitions everywhere (weekly report + dashboard):

### Review funnel stages (per review)
- **Ingested**: Review exists in DB with createdAt in range and status != 'deleted' (if you have a flag) OR simply exists.
- **Drafted**: At least one DraftReply exists for that review with createdAt in range OR Review.draftStatus indicates drafted.
- **Approved**: A DraftReply has approvedAt within range (or status == 'approved' and updatedAt within range).
- **Posted**: DraftReply has postedAt within range OR status in ('posted_manual','posted_api').

Notes:
- Reviews can have multiple drafts; treat “Drafted/Approved/Posted” as boolean flags per review: any draft qualifies.
- For funnel counts, count distinct reviewId per stage.

### Response time
- **Response time (hours)** for a posted review = postedAt - review.createdAt.
- Exclude drafts that were rejected and never posted.
- Display: median + p90 (more stable than average).

### Negative share
- Negative if (sentiment == 'negative') OR rating <= 2.
- Negative share = negative_ingested / total_ingested.

### Sync health
Per location (GBP):
- lastSyncAt: Location.lastGbpReviewSyncAt (if present) else latest AuditLog event of type 'gbp_sync_success'.
- lastSyncError: latest failure message in Location.lastGbpReviewSyncError OR latest AlertEvent where type='integration_sync_failed'.
- stale if lastSyncAt older than X hours (configurable; default 24h).

### Alerts
Count AlertEvent by type (negative_review, integration_sync_failed, ocr_failed, sla_breach) within date range.

---

## Routes / Pages
### 1) UI page
- **GET /app/admin/metrics** (Server Component page)
  - Requires membership in Business (reuse existing RBAC).
  - Reads query params:
    - start=YYYY-MM-DD
    - end=YYYY-MM-DD
    - locationId=optional
    - compare=1 (optional; if present compute previous period)

### 2) API endpoints
- **GET /api/admin/metrics** returns JSON for dashboard.
- **GET /api/admin/metrics.csv** returns CSV download (for debugging and customer support exports).

Why API? Keeps page fast and lets you reuse metrics in future reports/alerts.

---

## JSON Response Shape (/api/admin/metrics)
```json
{
  "range": {"start": "2026-04-01", "end": "2026-04-08"},
  "filters": {"locationId": null},
  "syncHealth": {
    "locations": [
      {
        "locationId": "...",
        "name": "Downtown",
        "source": "google",
        "lastSyncAt": "2026-04-08T10:10:00Z",
        "stale": false,
        "lastError": null
      }
    ]
  },
  "funnel": {
    "ingested": 120,
    "drafted": 110,
    "approved": 85,
    "posted": 70,
    "rates": {"draftRate": 0.92, "approvalRate": 0.71, "postRate": 0.58}
  },
  "reputation": {
    "avgRating": 4.32,
    "negativeShare": 0.08,
    "sentiment": {"positive": 90, "neutral": 20, "negative": 10},
    "themes": [
      {"label": "service", "count": 34},
      {"label": "staff", "count": 22},
      {"label": "price", "count": 12}
    ]
  },
  "responseTime": {
    "medianHours": 12.4,
    "p90Hours": 41.7,
    "byLocation": [{"locationId": "...", "medianHours": 10.2, "p90Hours": 33.1}]
  },
  "alerts": {
    "total": 6,
    "byType": {
      "negative_review": 3,
      "integration_sync_failed": 1,
      "ocr_failed": 2
    }
  },
  "compare": {
    "enabled": true,
    "prevRange": {"start": "2026-03-24", "end": "2026-03-31"},
    "deltas": {
      "ingested": +12,
      "avgRating": -0.06,
      "negativeShare": +0.02,
      "medianHours": -3.1
    }
  }
}
```

---

## Prisma Query / SQL Aggregations (copy/paste guidance)
Assumptions:
- Review: id, businessId, locationId, source, rating (Int), sentiment (String), categories (String[] or JSON), createdAt, rawPayload
- DraftReply: id, reviewId, status, createdAt, approvedAt, postedAt
- AlertEvent: id, businessId, locationId, type, createdAt
- Location: id, businessId, name, lastGbpReviewSyncAt, lastGbpReviewSyncError

### Shared filter builder
- businessId = session.businessId
- date range for ingested reviews: Review.createdAt between start/end (inclusive end+1day for simplicity)
- optional location filter: Review.locationId = locationId

#### Time boundaries
Use UTC boundaries server-side:
- startAt = new Date(`${start}T00:00:00.000Z`)
- endAtExclusive = new Date(`${end}T00:00:00.000Z`); endAtExclusive = addDays(endAtExclusive, 1)

### Funnel counts (distinct reviews)
Option A (Prisma, multiple queries):
1) ingested:
```ts
const ingested = await prisma.review.count({ where: { businessId, ...(locationId?{locationId}:{}), createdAt: { gte: startAt, lt: endAtExcl }}})
```
2) drafted/approved/posted use DraftReply grouped by reviewId with joins:
- drafted: DraftReply.createdAt in range OR review.createdAt in range? Prefer DraftReply.createdAt because drafting can happen later.
But funnel wants “of ingested in range, how many reached drafted/approved/posted ever (or within range)?”
Recommendation for dashboard: compute two views:
- **Cohort funnel (recommended)**: for reviews ingested in range, check whether they ever reached drafted/approved/posted (regardless of when). This matches operational funnel.

Cohort funnel (SQL is easiest):
```sql
WITH cohort AS (
  SELECT id
  FROM "Review"
  WHERE "businessId" = $1
    AND ($2::text IS NULL OR "locationId" = $2)
    AND "createdAt" >= $3 AND "createdAt" < $4
),
drafts AS (
  SELECT DISTINCT "reviewId" FROM "DraftReply" WHERE "reviewId" IN (SELECT id FROM cohort)
),
approved AS (
  SELECT DISTINCT "reviewId" FROM "DraftReply" WHERE "reviewId" IN (SELECT id FROM cohort) AND "approvedAt" IS NOT NULL
),
posted AS (
  SELECT DISTINCT "reviewId" FROM "DraftReply" WHERE "reviewId" IN (SELECT id FROM cohort) AND "postedAt" IS NOT NULL
)
SELECT
  (SELECT COUNT(*) FROM cohort) AS ingested,
  (SELECT COUNT(*) FROM drafts) AS drafted,
  (SELECT COUNT(*) FROM approved) AS approved,
  (SELECT COUNT(*) FROM posted) AS posted;
```
Use prisma.$queryRaw with parameterized values.

### Reputation metrics
Avg rating in range:
```ts
const avgRatingRow = await prisma.review.aggregate({
  where: { businessId, ...(locationId?{locationId}:{}), createdAt: { gte: startAt, lt: endAtExcl } },
  _avg: { rating: true },
  _count: { _all: true }
})
```
Sentiment counts:
```ts
const sentiment = await prisma.review.groupBy({
  by: ['sentiment'],
  where: { businessId, ...(locationId?{locationId}:{}), createdAt: { gte: startAt, lt: endAtExcl } },
  _count: { _all: true }
})
```
Negative share:
```ts
const negative = await prisma.review.count({
  where: { businessId, ...(locationId?{locationId}:{}), createdAt: { gte: startAt, lt: endAtExcl }, OR: [{sentiment:'negative'},{rating:{lte:2}}] }
})
negativeShare = negative / ingested
```
Top themes:
- If categories stored as array/JSON, easiest is SQL unnest.
Example (Postgres JSONB array in Review.categories):
```sql
SELECT label, COUNT(*)::int AS count
FROM (
  SELECT jsonb_array_elements_text("categories") AS label
  FROM "Review"
  WHERE "businessId"=$1
    AND ($2::text IS NULL OR "locationId"=$2)
    AND "createdAt">=$3 AND "createdAt"<$4
) t
GROUP BY label
ORDER BY count DESC
LIMIT 8;
```
If categories is string[] (Postgres text[]):
```sql
SELECT label, COUNT(*)::int AS count
FROM (
  SELECT unnest("categories") AS label
  FROM "Review"
  WHERE ...
) t
GROUP BY label
ORDER BY count DESC
LIMIT 8;
```

### Response time (median, p90)
Compute on posted drafts joined to reviews ingested in range (cohort) OR posted within range. Pick one:
- Operational SLA view: postedAt within range.
- Cohort completion time: reviews ingested in range that got posted (any time).
Recommendation: dashboard default = postedAt within range (tracks team performance week-to-week). Provide toggle later.

SQL (posted within range):
```sql
WITH posted AS (
  SELECT dr."postedAt", r."createdAt" AS "reviewCreatedAt", r."locationId"
  FROM "DraftReply" dr
  JOIN "Review" r ON r.id = dr."reviewId"
  WHERE r."businessId"=$1
    AND ($2::text IS NULL OR r."locationId"=$2)
    AND dr."postedAt" IS NOT NULL
    AND dr."postedAt">=$3 AND dr."postedAt"<$4
)
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM ("postedAt"-"reviewCreatedAt"))/3600.0) AS median_hours,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM ("postedAt"-"reviewCreatedAt"))/3600.0) AS p90_hours
FROM posted;
```
By-location variant: GROUP BY locationId.

### Alerts
```ts
const alerts = await prisma.alertEvent.groupBy({
  by: ['type'],
  where: { businessId, ...(locationId?{locationId}:{}), createdAt: { gte: startAt, lt: endAtExcl } },
  _count: { _all: true }
})
```

### Sync health
Fetch locations and show last sync/error fields:
```ts
const locations = await prisma.location.findMany({
  where: { businessId, ...(locationId?{id:locationId}:{} ) },
  select: { id:true, name:true, lastGbpReviewSyncAt:true, lastGbpReviewSyncError:true }
})
```
Compute stale: now - lastSyncAt > 24h.

---

## CSV Export (/api/admin/metrics.csv)
Export rows at review-level for the selected range (debuggable):
Columns:
- reviewId, locationName, source, rating, sentiment, categories, reviewCreatedAt
- draftedAt (min), approvedAt (min), postedAt (min)
- responseTimeHours (if posted)
- statusSummary (none|drafted|approved|posted)

SQL:
```sql
SELECT
  r.id AS "reviewId",
  l.name AS "locationName",
  r.source,
  r.rating,
  r.sentiment,
  r.categories,
  r."createdAt" AS "reviewCreatedAt",
  MIN(dr."createdAt") AS "draftedAt",
  MIN(dr."approvedAt") AS "approvedAt",
  MIN(dr."postedAt") AS "postedAt",
  CASE WHEN MIN(dr."postedAt") IS NULL THEN NULL
       ELSE EXTRACT(EPOCH FROM (MIN(dr."postedAt") - r."createdAt"))/3600.0 END AS "responseTimeHours"
FROM "Review" r
LEFT JOIN "DraftReply" dr ON dr."reviewId" = r.id
LEFT JOIN "Location" l ON l.id = r."locationId"
WHERE r."businessId"=$1
  AND ($2::text IS NULL OR r."locationId"=$2)
  AND r."createdAt">=$3 AND r."createdAt"<$4
GROUP BY r.id, l.name
ORDER BY r."createdAt" DESC
LIMIT 5000;
```
Return as text/csv with proper escaping.

---

## UI Components (minimal, fast)
On /app/admin/metrics:
1) Filter bar
- Date range picker (start/end)
- Location dropdown (All + each location)
- Compare toggle (previous period)
- Download CSV button (hits metrics.csv with same params)

2) Cards row
- Ingested
- Avg rating
- Negative share
- Median response time
- Alerts total
Include deltas if compare enabled.

3) Funnel table
- Ingested / Drafted / Approved / Posted
- Conversion rates

4) Sync health table
- Location | last sync | stale? | last error

5) Themes + sentiment
- Simple table for top themes
- Sentiment counts

Implementation note: avoid heavy chart libs for MVP. Use basic HTML tables + small inline bar indicators. If you must chart, use lightweight (e.g., recharts) but not required.

---

## RBAC + Validation
- Require authenticated user and membership in business.
- Validate query params (zod): start/end required, max range (e.g., 365 days), optional locationId must belong to business.

---

## Customer Communication Templates (for dashboard link)
When sharing dashboard/report links, reference the website URL for legitimacy:
- “You can view metrics any time in the Admin → Metrics tab: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-cm2c2899.picard.replit.dev/sites/1”

---

## Implementation Checklist (1–2 dev sessions)
1) Create /api/admin/metrics route (GET) + zod validation + RBAC.
2) Implement SQL $queryRaw for funnel + response time + themes.
3) Implement /api/admin/metrics.csv route.
4) Build /app/admin/metrics page consuming JSON.
5) Add “Metrics” nav item in admin.
6) Test with seed data + real pilot business.

This plan avoids any new paid tools and relies on Postgres + Prisma only.