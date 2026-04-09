# Admin Metrics Dashboard — Implementation Blueprint (Next.js + Prisma) + API/CSV Contracts

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:28:36.059Z

---

## Goal
Ship `/app/admin/metrics` that answers: (1) Is sync healthy? (2) Are we converting reviews into posted replies quickly? (3) How many negative reviews/alerts are we handling? Must work with existing tables: `Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog`.

---
## KPI Definitions (canonical)
Use these definitions everywhere (dashboard + weekly report) to avoid confusion:

1) **Ingested reviews**: `Review.createdAt` within date range (created in our DB, regardless of original review date). For “real-world time”, optionally also display `Review.reviewCreatedAt` if present (from source).

2) **Drafted**: review has at least one `DraftReply` created in range OR latest draft exists and `DraftReply.createdAt` <= range end.

3) **Approved**: `DraftReply.status = 'approved'` and `DraftReply.approvedAt` in range.

4) **Posted**: `DraftReply.status IN ('posted_api','posted_manual')` and `DraftReply.postedAt` in range.

5) **Response time** (minutes): `postedAt - Review.reviewCreatedAt` if `reviewCreatedAt` exists else `postedAt - Review.createdAt`. Exclude drafts that are `rejected` or never posted.

6) **Negative share**: % of reviews in range where `Review.sentiment='negative' OR Review.rating<=2`.

7) **Sync health**: per location: `lastSyncAt`, `lastErrorAt`, `consecutiveFailures`, and “staleness” = now - lastSyncAt.

---
## Data Queries (Prisma-first; raw SQL acceptable for speed)
### 1) Sync Health Panel
**Input**: businessId, optional locationId.

- Locations list with integration status:
  - `Location`: id, name, enabled, `lastGbpReviewSyncAt`, `lastGbpReviewSyncUpdateTime`.
  - Latest integration error: query `AlertEvent` where type like `integration_sync_failed` grouped by location; or store lastError fields if already present.

Prisma approach:
- `prisma.location.findMany({ where: { businessId }, select: { id:true, name:true, gbpLocationId:true, lastGbpReviewSyncAt:true, lastGbpReviewSyncUpdateTime:true, enabled:true } })`
- `prisma.alertEvent.findMany({ where: { businessId, createdAt: { gte: start, lte: end }, type: { in: ['gbp_sync_failed','yelp_ingest_failed','ocr_failed'] } }, orderBy: { createdAt: 'desc' } })` then reduce per location.

Computed fields:
- stalenessHours = (now - lastGbpReviewSyncAt) / 3600000
- status chip:
  - GREEN: staleness < 6h and no errors last 24h
  - YELLOW: staleness 6–24h OR errors exist but resolved
  - RED: staleness > 24h OR consecutiveFailures >= N

### 2) Funnel Metrics (Ingested → Drafted → Approved → Posted)
Use a single date range (default last 7 days) and allow grouping by day.

Raw SQL (Postgres) example for daily funnel counts:
```sql
WITH days AS (
  SELECT generate_series($1::date, $2::date, interval '1 day')::date AS day
)
SELECT d.day,
  COALESCE(r.ingested,0) AS ingested,
  COALESCE(dr.drafted,0) AS drafted,
  COALESCE(ap.approved,0) AS approved,
  COALESCE(po.posted,0) AS posted
FROM days d
LEFT JOIN (
  SELECT date_trunc('day', "createdAt")::date AS day, count(*) AS ingested
  FROM "Review"
  WHERE "businessId"=$3 AND "createdAt">=$1 AND "createdAt"<=$2
  GROUP BY 1
) r USING(day)
LEFT JOIN (
  SELECT date_trunc('day', "createdAt")::date AS day, count(DISTINCT "reviewId") AS drafted
  FROM "DraftReply"
  WHERE "businessId"=$3 AND "createdAt">=$1 AND "createdAt"<=$2
  GROUP BY 1
) dr USING(day)
LEFT JOIN (
  SELECT date_trunc('day', "approvedAt")::date AS day, count(*) AS approved
  FROM "DraftReply"
  WHERE "businessId"=$3 AND "approvedAt" IS NOT NULL AND "approvedAt">=$1 AND "approvedAt"<=$2
  GROUP BY 1
) ap USING(day)
LEFT JOIN (
  SELECT date_trunc('day', "postedAt")::date AS day, count(*) AS posted
  FROM "DraftReply"
  WHERE "businessId"=$3 AND "postedAt" IS NOT NULL AND "postedAt">=$1 AND "postedAt"<=$2
    AND "status" IN ('posted_api','posted_manual')
  GROUP BY 1
) po USING(day)
ORDER BY d.day;
```
Add optional `locationId` filters by joining Review/DraftReply on locationId.

### 3) Response Time + SLA Compliance
Metrics:
- median response time (minutes)
- p90 response time
- % posted within 24h (or configured SLA)

Raw SQL:
```sql
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (dr."postedAt" - COALESCE(r."reviewCreatedAt", r."createdAt")))/60) AS median_minutes,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (dr."postedAt" - COALESCE(r."reviewCreatedAt", r."createdAt")))/60) AS p90_minutes,
  AVG(CASE WHEN dr."postedAt" <= COALESCE(r."reviewCreatedAt", r."createdAt") + ($1::int || ' hours')::interval THEN 1 ELSE 0 END)::float AS within_sla
FROM "DraftReply" dr
JOIN "Review" r ON r.id = dr."reviewId"
WHERE dr."businessId"=$2
  AND dr."postedAt" IS NOT NULL
  AND dr."status" IN ('posted_api','posted_manual')
  AND dr."postedAt">=$3 AND dr."postedAt"<=$4;
```

### 4) Negative Share + Top Themes
- Negative share:
```sql
SELECT
  COUNT(*) FILTER (WHERE r.sentiment='negative' OR r.rating<=2)::float / NULLIF(COUNT(*),0) AS negative_share,
  COUNT(*) FILTER (WHERE r.sentiment='negative' OR r.rating<=2) AS negative_count,
  COUNT(*) AS total
FROM "Review" r
WHERE r."businessId"=$1 AND r."createdAt">=$2 AND r."createdAt"<=$3;
```
- Top categories/themes:
If `Review.categories` is a text[] or jsonb array, count occurrences.
```sql
SELECT cat, COUNT(*) AS c
FROM "Review" r
CROSS JOIN LATERAL unnest(r.categories) AS cat
WHERE r."businessId"=$1 AND r."createdAt">=$2 AND r."createdAt"<=$3
GROUP BY cat
ORDER BY c DESC
LIMIT 8;
```

### 5) Alerts Volume + Types
```sql
SELECT type, COUNT(*)
FROM "AlertEvent"
WHERE "businessId"=$1 AND "createdAt">=$2 AND "createdAt"<=$3
GROUP BY type
ORDER BY COUNT(*) DESC;
```

---
## API Contracts
### `GET /api/admin/metrics`
Query params:
- `start` (ISO date/time)
- `end` (ISO)
- `locationId` optional
- `tz` optional (default business timezone)

Response JSON:
```json
{
  "range": {"start":"...","end":"...","tz":"America/Los_Angeles"},
  "syncHealth": [{"locationId":"...","name":"...","lastSyncAt":"...","stalenessHours":2.3,"status":"GREEN","lastError":"..."}],
  "funnelDaily": [{"day":"2026-04-01","ingested":12,"drafted":10,"approved":8,"posted":7}],
  "responseTime": {"medianMinutes": 320, "p90Minutes": 1440, "withinSla": 0.71, "slaHours": 24},
  "reputation": {"avgRating": 4.42, "negativeShare": 0.12, "negativeCount": 3, "total": 25, "topThemes": [{"theme":"staff","count":7}]},
  "alerts": {"total": 5, "byType": [{"type":"negative_review","count":3}]}
}
```
RBAC: require authenticated user is a `UserBusinessMembership` for this business.
Validation: zod schema for dates and `locationId` belongs to business.

### `GET /api/admin/metrics.csv`
Same query params. Returns a CSV with multiple sections separated by header rows (simple) OR a zipped multi-csv (avoid for MVP). MVP suggestion: one CSV for daily funnel + response-time summary in first rows.

---
## Page Structure: `/app/admin/metrics`
Server component layout:
1) Filters bar: date range picker (Last 7/30/90 + custom), location dropdown, export CSV button.
2) Cards row: Ingested, Drafted, Approved, Posted, Negative Share, Median Response Time.
3) Funnel chart/table: daily rows.
4) Sync health table: per location.
5) Alerts table: recent alerts (last 20) with type, location, createdAt, resolvedAt.

No new paid charting libs required: MVP can render tables + lightweight SVG sparkline or plain HTML bars.

---
## Instrumentation
Log when metrics endpoint is queried:
- `AuditLog`: action=`metrics_viewed`, metadata: range, locationId, userId.
Add Sentry breadcrumb for slow queries (>2s) with queryName.

---
## Owner Execution Notes
- This dashboard is internal/admin only; it will help debug pilots and prove ROI to customers.
- When you email pilot users, reference the website to build trust: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- If you need a customer-facing weekly report cover page, reuse the same KPI definitions above so numbers match exactly.
