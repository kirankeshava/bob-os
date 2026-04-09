# Metrics Dashboard Implementation (Routes, API, Prisma Aggregations, CSV Export, Caching) — Ready-to-Commit Code Plan

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T08:24:05.141Z

---

# Metrics Dashboard — Build-Ready Implementation

This artifact contains the concrete implementation blueprint (routes, API contracts, Prisma query patterns, caching, and CSV export format) for the /app/admin/metrics dashboard.

## 1) Routes + Pages

### 1.1 Dashboard Page
- **Route:** `app/app/admin/metrics/page.tsx`
- **Access:** must require membership in a Business (use existing RBAC/membership guard).
- **Inputs (query params):**
  - `from=YYYY-MM-DD` (defaults to 30 days ago in business timezone)
  - `to=YYYY-MM-DD` (defaults to today)
  - `locationId=all|<uuid>`
- **Sections shown:**
  1) Sync Health (table)
  2) Funnel KPIs (cards + daily chart)
  3) Response-time KPIs (cards)
  4) Alerts (table + counts)
  5) Top Themes (table)
  6) Reports sent (table)
  7) Export buttons: “Download CSV” and “Copy summary”

### 1.2 Data Fetching
- Use server component `page.tsx` to call internal API `GET /api/admin/metrics?from&to&locationId` with cookies.
- For CSV, link to `/api/admin/metrics.csv?from&to&locationId`.

## 2) API Endpoints

### 2.1 JSON Metrics
- **Route:** `app/api/admin/metrics/route.ts`
- **Method:** `GET`
- **RBAC:** require logged-in user + membership for `businessId` (derive business context from session/membership selection).
- **Validation:** Zod schema:
  - `from` and `to` parse to Date at start/end of day
  - ensure `from <= to` and max window 365 days
  - `locationId` optional

**Response shape (example):**
```json
{
  "range": {"from":"2026-03-10","to":"2026-04-09","days":31},
  "scope": {"businessId":"...","locationId":"all"},
  "syncHealth": [
    {
      "locationId":"...",
      "name":"Downtown",
      "source":"google",
      "enabled":true,
      "lastSyncAt":"2026-04-09T03:00:00Z",
      "lastError":null,
      "consecutiveFailures":0,
      "reviewsLast7d":12
    }
  ],
  "totals": {
    "ingested": 120,
    "drafted": 110,
    "approved": 80,
    "posted": 65,
    "avgRating": 4.31,
    "negativeShare": 0.12,
    "medianResponseHours": 10.4,
    "p95ResponseHours": 48.0
  },
  "daily": [
    {"date":"2026-04-01","ingested":3,"drafted":3,"approved":2,"posted":2,"avgRating":4.5,"negative":0},
    {"date":"2026-04-02","ingested":5,"drafted":4,"approved":3,"posted":1,"avgRating":4.2,"negative":1}
  ],
  "alerts": {
    "total": 7,
    "byType": [{"type":"NEGATIVE_REVIEW","count":5},{"type":"SYNC_FAILURE","count":2}],
    "recent": [
      {"id":"...","type":"NEGATIVE_REVIEW","createdAt":"...","reviewId":"...","message":"2-star review requires response"}
    ]
  },
  "themes": [
    {"label":"staff","count":18,"negativeCount":4},
    {"label":"wait_time","count":10,"negativeCount":6}
  ],
  "reports": {
    "sentCount": 4,
    "recent": [
      {"id":"...","weekStart":"2026-03-31","sentAt":"...","toEmails":["owner@..."]}
    ]
  }
}
```

### 2.2 CSV Export
- **Route:** `app/api/admin/metrics.csv/route.ts`
- **Method:** `GET`
- **RBAC:** same as JSON.
- **CSV Format:**
  - Header includes totals + daily rows.
  - Columns (daily rows):
    - `date, ingested, drafted, approved, posted, avg_rating, negative_count, negative_share_day, median_response_hours_day`
  - Footer summary row `TOTALS` with totals.

## 3) KPI Definitions (must match UI + report)

1) **Ingested**: number of `Review` createdAt in range (optionally filtered by locationId).
2) **Drafted**: number of `DraftReply` createdAt in range (or draft exists for review created in range; choose one and keep consistent). Recommended: **DraftReply.createdAt**.
3) **Approved**: number of DraftReply status transitioned to `approved` in range (source: DraftReply.updatedAt when status becomes approved; if you don’t store transitions, use AuditLog event `DRAFT_APPROVED`). Recommended: **AuditLog-based** for correctness.
4) **Posted**: number of DraftReply status set to `posted_manual` or `posted_api` in range (AuditLog `DRAFT_POSTED_*` preferred).
5) **Response time**: for posted replies only: `postedAt - review.createdAt`. Exclude rejected/unposted.
6) **Negative share**: `count(reviews where sentiment='negative' OR rating <= 2) / total reviews` in range.
7) **Avg rating**: average of Review.rating in range.
8) **Top themes**: from Review.categoryLabels (or stored tags), count occurrences; also count negative occurrences.

## 4) Prisma Aggregation Approach (concrete)

### 4.1 Date Bucketing
- Generate an array of dates in JS for each day in range and fill metrics via groupBy results.

### 4.2 Reviews Aggregates
- Total ingested:
  - `prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: toEnd } } })`
- Avg rating:
  - `prisma.review.aggregate({ _avg: { rating: true }, where: { ...same } })`
- Daily counts + daily avg rating:
  - Use raw SQL for date_trunc/day grouping in Postgres (Prisma groupBy can’t bucket by date easily):

```sql
SELECT date_trunc('day', "createdAt") AS day,
       COUNT(*) AS ingested,
       AVG("rating") AS avg_rating,
       SUM(CASE WHEN ("sentiment"='negative' OR "rating"<=2) THEN 1 ELSE 0 END) AS negative
FROM "Review"
WHERE "businessId"=$1
  AND "createdAt">=$2 AND "createdAt"<=$3
  AND ($4::uuid IS NULL OR "locationId"=$4)
GROUP BY day
ORDER BY day;
```

### 4.3 Funnel Events via AuditLog
If AuditLog has events like `DRAFT_CREATED`, `DRAFT_APPROVED`, `DRAFT_POSTED_MANUAL`, `DRAFT_POSTED_API`, prefer:

```sql
SELECT date_trunc('day', "createdAt") AS day,
       SUM(CASE WHEN "action"='DRAFT_CREATED' THEN 1 ELSE 0 END) AS drafted,
       SUM(CASE WHEN "action"='DRAFT_APPROVED' THEN 1 ELSE 0 END) AS approved,
       SUM(CASE WHEN "action" IN ('DRAFT_POSTED_MANUAL','DRAFT_POSTED_API') THEN 1 ELSE 0 END) AS posted
FROM "AuditLog"
WHERE "businessId"=$1
  AND "createdAt">=$2 AND "createdAt"<=$3
  AND ($4::uuid IS NULL OR "locationId"=$4)
GROUP BY day
ORDER BY day;
```

### 4.4 Response Time Stats
Compute from DraftReply posted items joined to Review:

```sql
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600.0) AS median_hours,
  percentile_cont(0.95) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600.0) AS p95_hours
FROM "DraftReply" d
JOIN "Review" r ON r."id"=d."reviewId"
WHERE r."businessId"=$1
  AND d."postedAt" IS NOT NULL
  AND d."postedAt">=$2 AND d."postedAt"<=$3
  AND ($4::uuid IS NULL OR r."locationId"=$4);
```

### 4.5 Alerts
- Total + byType:
  - `prisma.alertEvent.groupBy({ by: ['type'], _count: true, where: { businessId, createdAt: { gte: from, lte: to } } })`
- Recent: orderBy createdAt desc limit 20.

### 4.6 Sync Health
- Use `Location` fields (last sync timestamps, last error, failures) + compute reviews last 7 days per location.

## 5) Caching (no new infra)
Add table `MetricsCache`:
- `id, businessId, locationId (nullable), from, to, payloadJson, createdAt, expiresAt`
- On request:
  1) compute cacheKey (businessId + locationId + from + to)
  2) return cached if `expiresAt > now()`
  3) else compute, store, return.
- TTL suggestion: 10 minutes for dashboard.

## 6) Instrumentation
- Wrap metrics compute in a timer; log durations for: reviewsAgg, auditAgg, responseTimeAgg, alertsAgg.
- Sentry:
  - capture exceptions with tags: businessId, locationId, route=metrics
  - set breadcrumb: params and computed row counts

## 7) UI Components (minimum viable)
- Filters bar: date range + location dropdown + buttons.
- Cards:
  - Ingested, Drafted, Approved, Posted
  - Avg rating, Negative share
  - Median response hours, P95 response hours
- Tables:
  - Sync health per location
  - Alerts recent
  - Themes
  - Reports sent
- Simple chart: daily ingested vs posted (can use a light library or plain SVG; acceptable to start with table).

## 8) Customer-Facing “Copy Summary” Snippet
Generate a short plain-text summary from totals:

"Reputation KPI summary (last 30 days): 120 new reviews, 4.31★ average, 12% negative share. Median response time: 10.4h (p95: 48h). Replies posted: 65 / 80 approved. Top themes: staff (18), wait_time (10)."

This summary is designed to be pasted into an email from `agent_bob_replit+review-bot@agentmail.to` and can include the public website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 9) Done Criteria
- Dashboard loads <2s for 30-day range (with cache).
- CSV exports correctly for same filters.
- Metrics match weekly report definitions (especially response time and posted counts).
- RBAC prevents cross-business access.
