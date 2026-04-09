# Admin Metrics Dashboard — Implementation (Next.js + Prisma) Build Artifact

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:41:56.487Z

---

Below is the build-ready implementation content for the in-app metrics dashboard, including route structure, API contracts, Prisma queries/aggregations, and CSV export format. It is written to fit the existing MVP stack: Next.js App Router, Prisma/Postgres, AuditLog, Review, DraftReply, AlertEvent, Business, Location, Integration.

1) Routes/UI
A) Page: /app/admin/metrics
- Server Component that renders:
  - Filters: date range (start/end), optional location selector, quick presets (7d/30d/90d).
  - Cards:
    1) Reviews ingested: count
    2) Drafts generated: count
    3) Approved: count
    4) Posted: count (posted_manual now; future: posted_api)
    5) Median response time (createdAt -> postedAt), excluding rejected and never-posted
    6) Negative share (% rating<=2 or sentiment=negative)
  - Tables:
    - Sync Health table by location: location name, integration type, lastSyncAt, lastError, lastErrorAt, consecutiveFailures
    - Alerts table: last 20 AlertEvents with type, severity, createdAt, location, review link
  - Charts (simple, no paid libs required):
    - Daily time series for ingested/drafted/approved/posted (render as HTML table with sparkline-style bars using CSS widths). If a chart lib is already present, map to that.
- Data fetching:
  - Call internal server-side fetch to /api/admin/metrics with cookies/auth forwarded.

B) RBAC
- Require authenticated user.
- Require UserBusinessMembership for the requested businessId.
- If multiple businesses supported, default to user’s first membership.

2) API: /api/admin/metrics
Method: GET
Query params:
- businessId: string (required unless inferred)
- start: ISO date string (required)
- end: ISO date string (required)
- locationId: string (optional)
Response JSON (normalized for UI):
{
  "range": {"start":"2026-04-01","end":"2026-04-08"},
  "filters": {"businessId":"...","locationId":null},
  "cards": {
    "ingested": 120,
    "drafted": 110,
    "approved": 90,
    "posted": 70,
    "medianResponseMinutes": 240,
    "avgResponseMinutes": 410,
    "negativeShare": 0.12,
    "avgRating": 4.41
  },
  "series": {
    "days": ["2026-04-01","2026-04-02"],
    "ingested": [10,12],
    "drafted": [9,11],
    "approved": [7,10],
    "posted": [5,8],
    "avgRating": [4.2,4.6],
    "negativeCount": [1,0]
  },
  "syncHealth": [
    {
      "locationId":"...",
      "locationName":"Downtown",
      "integration": "google",
      "enabled": true,
      "lastSyncAt": "2026-04-08T10:12:00Z",
      "lastError": null,
      "lastErrorAt": null,
      "consecutiveFailures": 0
    }
  ],
  "alerts": [
    {"id":"...","type":"NEGATIVE_REVIEW","severity":"high","createdAt":"...","locationName":"Downtown","reviewId":"..."}
  ]
}

Validation rules:
- Clamp date range to max 366 days to prevent heavy queries.
- Ensure end >= start.
- If locationId provided, verify it belongs to businessId.

3) Aggregation definitions
A) Ingested
- Count of Review where businessId matches AND createdAt between [start,end) (or review.createdAt; if you track reviewCreatedAt separately, use that).
- If location filter applied, include locationId.

B) Drafted
- Count of DraftReply where review.businessId matches and DraftReply.createdAt between [start,end)
- Optionally de-dup: count distinct reviewId where latest draft exists; for MVP, raw DraftReply count is acceptable. Recommended: count distinct reviewId with at least one draft in range.

C) Approved
- Count of DraftReply with status = 'approved' AND approvedAt between [start,end)

D) Posted
- Count of DraftReply with status in ('posted_manual','posted_api') AND postedAt between [start,end)

E) Response time
- For each posted draft, responseMinutes = (postedAt - review.createdAt)
- Compute median and average for the selected range.
- Exclude DraftReply with status='rejected' or null postedAt.
- If multiple drafts exist per review, use the posted draft only; if multiple posted (rare), use earliest postedAt.

F) Negative share
- Negative review = rating <= 2 OR sentiment = 'negative'
- negativeShare = negativeCount / totalIngested (guard divide by zero)

G) Avg rating
- Average Review.rating for reviews created in range.

4) Prisma query approach (pseudocode)
- Reviews base filter:
  where: { businessId, ...(locationId?{locationId}:{}) , createdAt: { gte: start, lt: end } }
- Use groupBy for daily series:
  - If using Postgres, prefer raw SQL date_trunc('day', createdAt) for group. Prisma groupBy doesn’t support date trunc well; use prisma.$queryRaw.

Recommended raw SQL examples:
A) Daily ingested + avgRating + negativeCount
SELECT
  to_char(date_trunc('day', r."createdAt"), 'YYYY-MM-DD') as day,
  count(*)::int as ingested,
  avg(r."rating")::float as avg_rating,
  sum(CASE WHEN (r."rating" <= 2 OR r."sentiment" = 'negative') THEN 1 ELSE 0 END)::int as negative_count
FROM "Review" r
WHERE r."businessId" = $1
  AND r."createdAt" >= $2 AND r."createdAt" < $3
  AND ($4::text IS NULL OR r."locationId" = $4)
GROUP BY 1
ORDER BY 1;

B) Daily drafted/approved/posted (distinct by review)
Use DraftReply joined to Review for business/location scoping:
SELECT
  to_char(date_trunc('day', d."createdAt"), 'YYYY-MM-DD') as day,
  count(distinct d."reviewId")::int as drafted
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE r."businessId" = $1
  AND d."createdAt" >= $2 AND d."createdAt" < $3
  AND ($4::text IS NULL OR r."locationId" = $4)
GROUP BY 1
ORDER BY 1;

Repeat for approved (approvedAt) and posted (postedAt) with status constraints.

C) Cards counts can use Prisma count() with same where clauses for speed.

D) Response time distribution
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) as median_minutes,
  avg(EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) as avg_minutes
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE r."businessId" = $1
  AND d."postedAt" >= $2 AND d."postedAt" < $3
  AND d."postedAt" IS NOT NULL
  AND d."status" IN ('posted_manual','posted_api')
  AND ($4::text IS NULL OR r."locationId" = $4);

5) API: /api/admin/metrics.csv
Method: GET
Same query params as JSON.
CSV columns (flat, shareable):
- day
- ingested
- drafted
- approved
- posted
- avg_rating
- negative_count
Plus optional location rollup section appended after a blank line:
- location_name, ingested, posted, median_response_minutes, last_sync_at, last_error

Important: CSV should be generated server-side and returned with:
- Content-Type: text/csv
- Content-Disposition: attachment; filename="metrics-YYYYMMDD-YYYYMMDD.csv"

6) Reliability/Instrumentation
- Wrap each metrics handler in a timer; log duration + businessId + date range.
- Add Sentry spans: "metrics.query.series", "metrics.query.cards", "metrics.query.responseTime".
- Clamp date range and refuse >366 days.
- Add lightweight in-memory per-user rate limit (e.g., 30 req/min). If running serverless across instances, treat as best-effort; do not block pilots.

7) Customer-facing usage note (what this enables)
The metrics dashboard makes the product feel “alive” during trials: even when posting is manual copy/paste, customers can see responsiveness improving and alerts being handled. For customer comms or onboarding, link legitimacy proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

8) Owner testing checklist
- Create 2 locations under one business.
- Ingest 5 reviews into location A and 3 into location B across 3 different days.
- Ensure drafts exist for all; approve/posted_manual for some.
- Verify:
  - Total ingested equals 8 for the range.
  - Posted equals the number of posted_manual.
  - Median response time changes when you post older reviews.
  - Location filter changes counts appropriately.
  - CSV downloads and opens in Google Sheets.

This artifact is ready to paste into the repo as a build guide and aligns with the existing MVP data model and workflows.