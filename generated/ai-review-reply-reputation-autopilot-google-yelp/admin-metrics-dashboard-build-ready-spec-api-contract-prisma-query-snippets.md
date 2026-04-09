# Admin Metrics Dashboard — Build-Ready Spec + API Contract + Prisma Query Snippets

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T03:55:17.804Z

---

## Goal
Ship a lightweight, reliable in-app metrics dashboard that helps (1) prove value to customers (reputation KPIs), and (2) debug reliability (sync health + errors) using existing DB tables: `Business`, `Location`, `Integration`, `Review`, `DraftReply`, `AlertEvent`, `WeeklyReport`, `AuditLog`.

Dashboard route: **/app/admin/metrics** (members-only; scoped to a Business).

---
## KPI Definitions (must be consistent)
All metrics are filtered by:
- `businessId` (required)
- optional `locationIds[]`
- date range: `start` and `end` (inclusive), default last 30 days
- timezone: use Business timezone (fallback UTC). Group by local day/week.

### Reputation KPIs
1. **Reviews ingested**: count of `Review` where `createdAt` within range and `businessId` matches.
2. **Average rating**: average of `Review.rating` within range.
3. **Negative share**: percent of reviews where `(rating <= 2) OR (sentiment = 'negative')`.
4. **Top themes**: count by `Review.categoryLabels[]` (service/price/staff/quality/cleanliness/wait_time/other).

### Response Workflow KPIs (Activation Funnel)
Compute counts within range based on Review ingestion and draft lifecycle.
- **Ingested**: `Review.createdAt` in range.
- **Drafted**: reviews with at least one `DraftReply` created in range OR linked to review created in range (choose one, but be consistent). Recommended: drafted = `DraftReply.createdAt` in range.
- **Approved**: `DraftReply.status = 'approved'` and `approvedAt` in range.
- **Posted**: `DraftReply.postedAt` in range AND `postedStatus IN ('posted_manual','posted_api')`.

### Response Time
- **Response time (median / p90)**: for posted drafts only: `postedAt - Review.createdAt` (exclude rejected/never-posted).
- Also show **Approval time** (median/p90): `approvedAt - DraftReply.createdAt`.

### Reliability / Sync Health
Per location:
- `Location.lastGbpReviewSyncAt`
- `Location.lastGbpReviewSyncUpdateTime` watermark
- last error (from Integration/Location metadata if stored) OR via latest `AlertEvent` with type `sync_failed`.

### Alerts
- Count of `AlertEvent` in range by `type` (negative_review, sync_failed, ocr_failed, guardrail_blocked etc.).

---
## UI Layout: /app/admin/metrics
Minimal, fast to build (tables + small chart components).

### 1) Filters row
- Date range picker: last 7/30/90/custom
- Location multiselect (default: all enabled locations)
- Export CSV button

### 2) Summary cards (top)
- Reviews ingested
- Avg rating
- Negative share
- Posted replies
- Median response time

### 3) Charts (optional but lightweight)
- Reviews per day (line)
- Avg rating per week (line)
- Funnel bar (ingested → drafted → approved → posted)

If avoiding chart libs, implement simple inline SVG sparklines.

### 4) Tables
A. **Sync health by location**
Columns: Location name, Source (Google/manual/Yelp), lastSyncAt, lastErrorAt, lastErrorMessage, reviews ingested (range).

B. **Top themes**
Columns: theme, count, share.

C. **Alerts**
Columns: createdAt, type, severity, location, summary.

---
## API Endpoints (internal)
### GET /api/admin/metrics
Query params:
- `businessId` (string, required)
- `start` (ISO string, optional)
- `end` (ISO string, optional)
- `locationIds` (comma-separated, optional)

RBAC: requester must be member of `businessId` via `UserBusinessMembership`.

Response JSON:
```json
{
  "range": {"start":"...","end":"...","timezone":"America/New_York"},
  "summary": {
    "reviewsIngested": 0,
    "avgRating": 0,
    "negativeShare": 0,
    "drafted": 0,
    "approved": 0,
    "posted": 0,
    "medianResponseMinutes": 0,
    "p90ResponseMinutes": 0
  },
  "timeseries": {
    "reviewsPerDay": [{"date":"YYYY-MM-DD","count":0}],
    "avgRatingPerWeek": [{"week":"YYYY-WW","avg":0,"count":0}]
  },
  "themes": [{"theme":"service","count":0}],
  "syncHealth": [{
    "locationId":"...",
    "locationName":"...",
    "source":"google|manual|yelp",
    "enabled":true,
    "lastSyncAt":"...",
    "lastSyncUpdateTime":"...",
    "lastErrorAt":"...",
    "lastErrorMessage":"...",
    "ingestedInRange":0
  }],
  "alerts": {
    "byType": [{"type":"negative_review","count":0}],
    "recent": [{"id":"...","createdAt":"...","type":"...","severity":"...","summary":"..."}]
  }
}
```

### GET /api/admin/metrics.csv
Same query params and RBAC.
Return a CSV with multiple sections OR a single flattened dataset. Recommended: a single CSV of daily metrics to support quick debugging.
Columns:
- date, locationId, locationName, reviewsIngested, avgRating, negativeCount, drafted, approved, posted, medianResponseMinutes

---
## Prisma / SQL Query Snippets
Assumptions:
- `Review` has fields: `businessId`, `locationId`, `createdAt`, `rating`, `sentiment`, `categoryLabels` (string[])
- `DraftReply` has: `reviewId`, `businessId`, `locationId`, `status`, `createdAt`, `approvedAt`, `postedAt`, `postedStatus`
- `AlertEvent` has: `businessId`, `locationId`, `type`, `severity`, `createdAt`, `summary`

### 1) Summary counts (reviews, avg rating, negative)
```ts
const reviews = await prisma.review.findMany({
  where: {
    businessId,
    createdAt: { gte: start, lte: end },
    ...(locationIds?.length ? { locationId: { in: locationIds } } : {})
  },
  select: { rating: true, sentiment: true }
})

const reviewsIngested = reviews.length
const avgRating = reviewsIngested
  ? reviews.reduce((s,r)=>s+(r.rating ?? 0),0)/reviewsIngested
  : 0
const negativeCount = reviews.filter(r => (r.rating ?? 0) <= 2 || r.sentiment === 'negative').length
const negativeShare = reviewsIngested ? negativeCount / reviewsIngested : 0
```
(For larger scale, switch to `groupBy` + raw SQL aggregate to avoid loading all rows.)

### 2) Funnel metrics (drafted/approved/posted)
```ts
const drafted = await prisma.draftReply.count({
  where: { businessId, createdAt: { gte: start, lte: end }, ...(locFilter) }
})
const approved = await prisma.draftReply.count({
  where: { businessId, approvedAt: { gte: start, lte: end }, status: 'approved', ...(locFilter) }
})
const posted = await prisma.draftReply.count({
  where: {
    businessId,
    postedAt: { gte: start, lte: end },
    postedStatus: { in: ['posted_manual','posted_api'] },
    ...(locFilter)
  }
})
```

### 3) Response-time percentiles (median/p90)
Using raw SQL (Postgres) to compute percentiles efficiently.
```ts
const rows = await prisma.$queryRawUnsafe<Array<{p50:number,p90:number}>>(`
  WITH posted AS (
    SELECT EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60.0 AS minutes
    FROM "DraftReply" d
    JOIN "Review" r ON r.id = d."reviewId"
    WHERE d."businessId" = $1
      AND d."postedAt" BETWEEN $2 AND $3
      AND d."postedStatus" IN ('posted_manual','posted_api')
      ${locationIds?.length ? 'AND d."locationId" = ANY($4)' : ''}
  )
  SELECT
    percentile_cont(0.5) WITHIN GROUP (ORDER BY minutes) AS p50,
    percentile_cont(0.9) WITHIN GROUP (ORDER BY minutes) AS p90
  FROM posted;
`, ...(locationIds?.length ? [businessId,start,end,locationIds] : [businessId,start,end]))
```
If no rows, return 0/null.

### 4) Themes (category label counts)
If `categoryLabels` is a Postgres text[] column:
```ts
const themes = await prisma.$queryRawUnsafe<Array<{theme:string,count:number}>>(`
  SELECT theme, COUNT(*)::int AS count
  FROM (
    SELECT unnest("categoryLabels") AS theme
    FROM "Review"
    WHERE "businessId" = $1
      AND "createdAt" BETWEEN $2 AND $3
      ${locationIds?.length ? 'AND "locationId" = ANY($4)' : ''}
  ) t
  GROUP BY theme
  ORDER BY count DESC;
`, ...(locationIds?.length ? [businessId,start,end,locationIds] : [businessId,start,end]))
```

### 5) Reviews per day timeseries
Use `date_trunc` and business timezone handled at app layer (convert boundaries to UTC); simplest is UTC grouping for MVP.
```ts
const perDay = await prisma.$queryRawUnsafe<Array<{day:string,count:number}>>(`
  SELECT to_char(date_trunc('day', "createdAt"), 'YYYY-MM-DD') AS day, COUNT(*)::int AS count
  FROM "Review"
  WHERE "businessId" = $1
    AND "createdAt" BETWEEN $2 AND $3
    ${locationIds?.length ? 'AND "locationId" = ANY($4)' : ''}
  GROUP BY 1
  ORDER BY 1;
`, ...(locationIds?.length ? [businessId,start,end,locationIds] : [businessId,start,end]))
```

### 6) Sync health table
```ts
const locations = await prisma.location.findMany({
  where: { businessId, ...(locationIds?.length ? { id: { in: locationIds } } : {}) },
  select: {
    id: true,
    name: true,
    source: true,
    enabled: true,
    lastGbpReviewSyncAt: true,
    lastGbpReviewSyncUpdateTime: true
  }
})

const recentSyncAlerts = await prisma.alertEvent.findMany({
  where: { businessId, type: 'sync_failed', createdAt: { gte: start, lte: end } },
  orderBy: { createdAt: 'desc' },
  take: 200
})
```
Attach last error per location by scanning `recentSyncAlerts` for the first matching locationId.

---
## Implementation Notes
- Keep it fast: for MVP, summary + funnel can be Prisma `count()` and simple SQL percentile query.
- Avoid adding new infra: reuse existing auth + membership RBAC.
- Instrument: log metrics request duration + input params (without PII) to spot slow queries.
- CSV export: reuse the timeseries query; output a row per day per location.

---
## Owner Execution Checklist
1) Implement `/api/admin/metrics` with zod validation + RBAC + queries above.
2) Implement `/app/admin/metrics` with filters + cards + tables; call API via server action or route handler.
3) Add `/api/admin/metrics.csv` using the same query functions.
4) Verify on a real business dataset: compare counts vs review queue to ensure definitions match expectations.

This dashboard makes the MVP easier to sell (proof of value) and easier to operate (sync reliability visibility) without requiring fully automated posting on every platform.