# In-App Metrics Dashboard (MVP) — Build-Ready Implementation (Next.js + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:00:12.489Z

---

## Goal
Ship /app/admin/metrics to help operators verify ingestion → drafting → approval → posting is working, and to debug sync/alert issues. Must use existing tables: Review, DraftReply, Location, Integration, AlertEvent, AuditLog, WeeklyReport.

## Route Map
- UI Page: `app/app/admin/metrics/page.tsx`
- API JSON: `app/api/admin/metrics/route.ts` (GET)
- API CSV: `app/api/admin/metrics.csv/route.ts` (GET)

## Access Control (RBAC)
- Require signed-in user.
- User must be a member of the active Business (UserBusinessMembership).
- Optional: gate to admin role if you have roles; otherwise membership is sufficient for MVP.

## Query Parameters (shared by JSON + CSV)
- `businessId` (string, required unless derived from session context)
- `from` (ISO date string, optional; default: now-30d in business timezone)
- `to` (ISO date string, optional; default: now)
- `locationId` (string, optional; if omitted = all locations)
- `tz` (IANA timezone, optional; default: business.timezone or 'UTC')

Validation rules:
- Clamp range max to 180 days.
- If `from > to`, return 400.

## KPI Definitions (avoid ambiguity)
### Funnel counts (for selected range)
- Ingested: `Review.createdAt` within range.
- Drafted: count of reviews that have at least one DraftReply created within range OR DraftReply createdAt within range (pick one, see below).
  - Recommended: measure by review ingest cohort (more intuitive): drafted = reviews ingested in range that have DraftReply at any time.
- Approved: reviews ingested in range with a DraftReply that reached status `approved` at any time.
- Posted: reviews ingested in range with DraftReply.status in (`posted_manual`, `posted_api`) OR DraftReply.postedAt != null.

### Response time
- Response time per review = `DraftReply.postedAt - Review.createdAt` for the first posted reply.
- Exclude reviews never posted.
- Report: median, p90, average, and % posted within 24h/48h.

### Reputation metrics
- Volume: count reviews ingested in range.
- Avg rating: average(Review.rating) in range.
- Rating trend: daily (or weekly) avg rating series over range.
- Negative share: % reviews where (rating<=2 OR sentiment='negative').
- Top themes: aggregate Review.categories (array or JSON) counts.

### Sync health (per location)
- Last sync time: use `Location.lastGbpReviewsSyncAt` if present; otherwise derive from latest AuditLog where action='google_sync_success'.
- Last error: `Location.lastGbpSyncError` or latest AuditLog/AlertEvent.
- New reviews last 7d: count reviews in last 7d for that location.

### Alerts
- Count AlertEvents by type/severity in range.
- SLA breaches proxy: negative reviews older than X hours with no approved/posted reply.

## Data Needed on the UI
### 1) Summary cards
- Reviews ingested
- Drafts created
- Approved
- Posted
- Median response time
- Negative share

### 2) Funnel table
Rows: Ingested → Drafted → Approved → Posted
Columns: count, % of ingested

### 3) Trend charts (lightweight)
- Reviews per day
- Avg rating per day
- Negative share per day
Implementation note: for MVP, use server-rendered JSON + a simple sparkline component (or render as tables if no chart lib).

### 4) Sync health table
Columns: Location, Integration (Google/manual/Yelp), lastSyncAt, lastError, reviews7d, failures7d

### 5) Alerts table
Columns: createdAt, type, severity, location, message, status

### 6) Export CSV
Button exports the same metrics in a flat schema for debugging.

## API: /api/admin/metrics (GET) — Response Shape
```json
{
  "range": {"from":"...","to":"...","tz":"America/New_York"},
  "filters": {"locationId": null},
  "summary": {
    "ingested": 120,
    "drafted": 95,
    "approved": 70,
    "posted": 60,
    "avgRating": 4.42,
    "negativeShare": 0.11,
    "medianResponseHours": 8.5,
    "p90ResponseHours": 36.0,
    "postedWithin24h": 0.62
  },
  "funnel": [
    {"stage":"ingested","count":120},
    {"stage":"drafted","count":95},
    {"stage":"approved","count":70},
    {"stage":"posted","count":60}
  ],
  "timeseries": {
    "byDay": [
      {"day":"2026-04-01","reviews":4,"avgRating":4.75,"negativeShare":0.0,"posted":2}
    ]
  },
  "themes": [
    {"label":"staff","count":33},
    {"label":"wait_time","count":18}
  ],
  "syncHealth": [
    {"locationId":"...","locationName":"Downtown","source":"google","lastSyncAt":"...","lastError":null,"reviews7d":22,"failures7d":0}
  ],
  "alerts": [
    {"id":"...","createdAt":"...","type":"NEGATIVE_REVIEW","severity":"high","locationName":"Downtown","message":"2-star review requires response","status":"open"}
  ]
}
```

## Prisma/SQL Aggregation Notes (implementable snippets)
### Base where clause
- `whereReview`: { businessId, createdAt: { gte: from, lte: to }, ...(locationId? { locationId }: {}) }

### Ingested
- `prisma.review.count({ where: whereReview })`

### Drafted/Approved/Posted (cohort by ingested reviews)
1) Get ingested review IDs in range (can be a subquery in SQL; with Prisma do two-step for MVP if scale is small).
2) Drafted = `DraftReply` where reviewId in ids.
3) Approved = `DraftReply` where status='approved' AND reviewId in ids.
4) Posted = `DraftReply` where postedAt != null AND reviewId in ids.

Optimization (single SQL):
```sql
WITH ingested AS (
  SELECT id FROM "Review" WHERE "businessId"=$1 AND "createdAt" BETWEEN $2 AND $3 AND ($4::text IS NULL OR "locationId"=$4)
),
posted AS (
  SELECT DISTINCT ON ("reviewId") "reviewId", "postedAt" FROM "DraftReply"
  WHERE "reviewId" IN (SELECT id FROM ingested) AND "postedAt" IS NOT NULL
  ORDER BY "reviewId", "postedAt" ASC
)
SELECT
  (SELECT count(*) FROM ingested) as ingested,
  (SELECT count(DISTINCT "reviewId") FROM "DraftReply" WHERE "reviewId" IN (SELECT id FROM ingested)) as drafted,
  (SELECT count(DISTINCT "reviewId") FROM "DraftReply" WHERE "reviewId" IN (SELECT id FROM ingested) AND status='approved') as approved,
  (SELECT count(*) FROM posted) as posted,
  percentile_disc(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (posted."postedAt" - r."createdAt"))/3600) as median_hours
FROM posted
JOIN "Review" r ON r.id = posted."reviewId";
```

### Timeseries by day
- Group by date_trunc('day', Review.createdAt AT TIME ZONE tz)
- Compute: count(*), avg(rating), negative share.

### Themes
If categories stored as string[]: use SQL `unnest`.
```sql
SELECT label, count(*)
FROM (
  SELECT unnest("categories") as label
  FROM "Review" WHERE ...
) t
GROUP BY label
ORDER BY count(*) DESC
LIMIT 10;
```

### Sync health
For each location in business (optionally filtered), return:
- source: from enabled Integration mapping (google/manual/yelp)
- lastSyncAt: Location.lastGbpReviewsSyncAt (add if not present) or latest AuditLog entry.
- failures7d: count AlertEvent where type like 'GOOGLE_SYNC_FAILED' in last 7d.

## CSV Export Schema (/api/admin/metrics.csv)
A flat, debugging-friendly export:
Columns:
- day
- locationName
- reviews
- avgRating
- negativeShare
- drafted
- approved
- posted
- medianResponseHours (optional if you compute per day; else omit)
Plus a second section (or separate file) for sync health and alerts; for MVP, provide 3 query params to choose dataset:
- `dataset=timeseries|syncHealth|alerts` (default timeseries)

## UI Copy (small)
Header: “Metrics & Health”
Subheader: “Track review volume, response performance, sync reliability, and alerts.”
Footer note: “Posting may be manual (copy/paste) depending on platform permissions. Metrics reflect the system’s recorded actions.”

## Implementation Order (fastest)
1) Implement JSON endpoint with summary + funnel.
2) Implement UI with summary cards + funnel table.
3) Add sync health table.
4) Add timeseries (even as table).
5) Add CSV export.

## Optional customer-facing blurb (for pilot)
If asked what this dashboard is, point them to the product site for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
