# In-App Metrics Dashboard (MVP) — Build Spec + API Contracts + Aggregation Logic

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T01:47:44.656Z

---

# Goal
Ship `/app/admin/metrics` so an owner/admin can quickly answer:
1) Are integrations syncing? (Google/Yelp/manual)
2) Are we responding fast enough? (SLA/response time)
3) Is the system converting reviews → drafts → approvals → posted replies?
4) What’s driving alerts/escalations?

This dashboard must use existing data only (no new services). Data sources: `Business`, `Location`, `Integration`, `Review`, `DraftReply`, `AlertEvent`, `AuditLog`, `WeeklyReport`.

---

# UX Scope (single page)
Route: `GET /app/admin/metrics`

## Filters (top bar)
- Date range: `start`, `end` (default last 14 days)
- Location: `locationId` (default All)
- Source: `source` (optional: google | yelp | manual)

All widgets below respect filters unless noted.

## Section A — Sync Health
1) **Location Sync Table** (always last 30 days regardless of selected date range; user can still filter by location)
   - Columns:
     - Location name
     - Integration source (google/yelp/manual)
     - `lastSyncAt`
     - `lastSuccessAt` (if tracked; otherwise derive from last successful ingest log)
     - `lastError` (Integration/health endpoint value)
     - `newReviews24h` (count)
     - `failures7d` (count of AlertEvents category=sync_failure)
   - Visual status:
     - Green: synced within 6h
     - Yellow: 6–24h
     - Red: >24h or lastError present

2) **Sync Errors (last 7d)**
   - Table of recent sync error events from `AlertEvent` (or logs if you store them): time, location, error message, retry count.

## Section B — Funnel KPIs
KPI Cards (selected date range):
- Reviews ingested
- Drafts generated
- Drafts approved
- Drafts posted (manual or API)
- Approval rate = approved / drafted
- Posting rate = posted / approved

Funnel table by day (sparkline optional):
- For each day: ingested, drafted, approved, posted

## Section C — Response/SLA
KPI cards:
- Median response time (review createdAt → postedAt)
- 90th percentile response time
- % negative reviews responded within SLA (e.g., 24h)
- Negative share (neg / total)

Tables:
- **Breached SLA reviews**: review, rating, sentiment, createdAt, age, current status (needs draft/needs approval/approved awaiting post)
- **Alert volume** by type: negative_review, sync_failure, ocr_failure, etc.

## Section D — Themes (quick debug)
- Top categories (service/price/staff/etc.) with counts
- Top keywords (optional simple frequency excluding stopwords) from Review text, for the date range

## Section E — Export
- Button: “Export CSV” which downloads metrics rows for the date range (daily totals + response times summary + per-location counts)

---

# Data Definitions (must be consistent)
Use these definitions everywhere:
- **Ingested review**: `Review.createdAt` within [start,end] AND matches filters (businessId, locationId, source)
- **Draft generated**: `DraftReply.createdAt` within [start,end] AND DraftReply.review matches filters
- **Approved**: DraftReply with `status='approved'` AND `approvedAt` within [start,end]
- **Posted**: DraftReply with `postedAt` within [start,end] AND `postedStatus in ('posted_manual','posted_api')`
- **Response time**:
  - Only for posted replies.
  - `postedAt - Review.createdAt` in minutes/hours.
  - Exclude rejected drafts and unposted approvals.
- **Negative review**:
  - `Review.sentiment='negative'` OR `Review.rating <= 2` (match your escalation rules; keep in code as a shared predicate)
- **SLA met**:
  - Negative review posted within `SLA_HOURS` (configurable per business or location; default 24)

---

# API Design
Prefer server components calling a server-only metrics function, but still create endpoints for CSV and potential future front-end charts.

## 1) JSON Metrics
`GET /api/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=all|<id>&source=all|google|yelp|manual`

Response:
```json
{
  "range": {"start":"2026-04-01","end":"2026-04-08"},
  "filters": {"locationId":"all","source":"all"},
  "kpis": {
    "ingested": 120,
    "drafted": 110,
    "approved": 84,
    "posted": 70,
    "approvalRate": 0.7636,
    "postingRate": 0.8333,
    "negativeShare": 0.18,
    "medianResponseMinutes": 410,
    "p90ResponseMinutes": 1680,
    "negativeSlaMetRate": 0.62
  },
  "timeseries": {
    "byDay": [
      {"day":"2026-04-01","ingested":10,"drafted":9,"approved":7,"posted":6,"negative":2},
      {"day":"2026-04-02","ingested":15,"drafted":14,"approved":10,"posted":9,"negative":3}
    ]
  },
  "tables": {
    "syncHealth": [
      {"locationId":"...","locationName":"Downtown","source":"google","lastSyncAt":"...","lastError":null,"newReviews24h":3,"failures7d":0}
    ],
    "slaBreaches": [
      {"reviewId":"...","locationName":"Downtown","rating":1,"sentiment":"negative","createdAt":"...","ageHours":52,"status":"approved_not_posted"}
    ],
    "alertsByType": [
      {"type":"negative_review","count":12},
      {"type":"sync_failure","count":2}
    ],
    "topCategories": [
      {"category":"service","count":18},
      {"category":"staff","count":12}
    ]
  }
}
```

RBAC:
- Require authenticated user
- Require `UserBusinessMembership` for `businessId` in session

Validation:
- `start <= end`
- max range 365 days
- locationId must belong to business

## 2) CSV Export
`GET /api/admin/metrics.csv?start=...&end=...&locationId=...&source=...`

CSV should include:
- day, ingested, drafted, approved, posted, negative
- plus summary rows at bottom OR separate metadata header comment lines

---

# Aggregation Logic (Prisma-friendly)
Assume:
- `Review`: id, businessId, locationId, source, rating, sentiment, categories[], createdAt
- `DraftReply`: id, reviewId, status, createdAt, approvedAt, postedAt, postedStatus
- `AlertEvent`: id, businessId, locationId?, type, createdAt
- `Location`: id, name, lastGbpReviewSyncUpdateTime, etc.
- `Integration`: lastSyncAt, lastError

## Base filters
- `businessId = session.businessId`
- optional `locationId`
- optional `source`
- date range filter uses relevant timestamp per metric (see definitions)

## KPI counts
- ingested = count Reviews where Review.createdAt in range
- drafted = count DraftReply where DraftReply.createdAt in range (join Review for filters)
- approved = count DraftReply where approvedAt in range
- posted = count DraftReply where postedAt in range AND postedStatus in (...)

### Implementation note
Because Prisma can struggle with grouped joins, it’s acceptable to use `prisma.$queryRaw` for the grouped time series and response-time percentiles.

## Time series by day
Postgres example:
```sql
WITH days AS (
  SELECT generate_series(date_trunc('day',$1::timestamptz), date_trunc('day',$2::timestamptz), interval '1 day') AS day
),
reviews AS (
  SELECT date_trunc('day', r."createdAt") AS day,
         count(*) AS ingested,
         count(*) FILTER (WHERE r.sentiment='negative' OR r.rating <= 2) AS negative
  FROM "Review" r
  WHERE r."businessId"=$3
    AND r."createdAt">=$1 AND r."createdAt"<=$2
    AND ($4::text IS NULL OR r."locationId"=$4::uuid)
    AND ($5::text IS NULL OR r."source"=$5)
  GROUP BY 1
),
drafts AS (
  SELECT date_trunc('day', d."createdAt") AS day,
         count(*) AS drafted
  FROM "DraftReply" d
  JOIN "Review" r ON r.id=d."reviewId"
  WHERE r."businessId"=$3
    AND d."createdAt">=$1 AND d."createdAt"<=$2
    AND ($4::text IS NULL OR r."locationId"=$4::uuid)
    AND ($5::text IS NULL OR r."source"=$5)
  GROUP BY 1
),
approved AS (
  SELECT date_trunc('day', d."approvedAt") AS day,
         count(*) AS approved
  FROM "DraftReply" d
  JOIN "Review" r ON r.id=d."reviewId"
  WHERE r."businessId"=$3
    AND d."approvedAt" IS NOT NULL
    AND d."approvedAt">=$1 AND d."approvedAt"<=$2
    AND ($4::text IS NULL OR r."locationId"=$4::uuid)
    AND ($5::text IS NULL OR r."source"=$5)
  GROUP BY 1
),
posted AS (
  SELECT date_trunc('day', d."postedAt") AS day,
         count(*) AS posted
  FROM "DraftReply" d
  JOIN "Review" r ON r.id=d."reviewId"
  WHERE r."businessId"=$3
    AND d."postedAt" IS NOT NULL
    AND d."postedAt">=$1 AND d."postedAt"<=$2
    AND d."postedStatus" IN ('posted_manual','posted_api')
    AND ($4::text IS NULL OR r."locationId"=$4::uuid)
    AND ($5::text IS NULL OR r."source"=$5)
  GROUP BY 1
)
SELECT d.day,
       COALESCE(rv.ingested,0) AS ingested,
       COALESCE(dr.drafted,0) AS drafted,
       COALESCE(ap.approved,0) AS approved,
       COALESCE(po.posted,0) AS posted,
       COALESCE(rv.negative,0) AS negative
FROM days d
LEFT JOIN reviews rv USING(day)
LEFT JOIN drafts dr USING(day)
LEFT JOIN approved ap USING(day)
LEFT JOIN posted po USING(day)
ORDER BY d.day;
```

## Response time percentiles
```sql
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) AS median_minutes,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) AS p90_minutes
FROM "DraftReply" d
JOIN "Review" r ON r.id=d."reviewId"
WHERE r."businessId"=$1
  AND d."postedAt" IS NOT NULL
  AND d."postedAt">=$2 AND d."postedAt"<=$3
  AND d."postedStatus" IN ('posted_manual','posted_api')
  AND ($4::text IS NULL OR r."locationId"=$4::uuid)
  AND ($5::text IS NULL OR r."source"=$5);
```

## Negative SLA met rate
Compute:
- denom = count of negative reviews created in range
- numer = count of negative reviews where exists posted reply within SLA hours

```sql
WITH neg AS (
  SELECT r.id, r."createdAt"
  FROM "Review" r
  WHERE r."businessId"=$1
    AND r."createdAt">=$2 AND r."createdAt"<=$3
    AND (r.sentiment='negative' OR r.rating<=2)
    AND ($4::text IS NULL OR r."locationId"=$4::uuid)
    AND ($5::text IS NULL OR r."source"=$5)
)
SELECT
  (SELECT count(*) FROM neg) AS negative_total,
  (SELECT count(*)
   FROM neg
   JOIN "DraftReply" d ON d."reviewId"=neg.id
   WHERE d."postedAt" IS NOT NULL
     AND d."postedStatus" IN ('posted_manual','posted_api')
     AND d."postedAt" <= neg."createdAt" + ($6::int || ' hours')::interval
  ) AS negative_sla_met;
```

## Sync health table
- Source from Integration + Location.
- `newReviews24h`: count Reviews createdAt > now()-24h by location.
- `failures7d`: count AlertEvents type in ('sync_failure') last 7d by location.

---

# UI Implementation Notes (fast path)
- Use server component page to fetch JSON from internal server function (avoid client waterfalls).
- Use minimal charting (optional): simple SVG bars or a tiny library; if you want zero deps, render a table + inline bars.
- Add a “Copy debug payload” button for support (JSON stringify response).

---

# Instrumentation
- Log each metrics request with: businessId, userId, range, locationId, source, durationMs.
- Sentry capture if query exceeds 2s or throws.

---

# Out-of-scope (post-MVP)
- Multi-business super-admin view
- Materialized aggregates / caching layer
- Automatic anomaly detection

This spec is intentionally MVP-tight: it gives immediate operational visibility for pilots (sync reliability + SLA compliance) while using only data you already collect.