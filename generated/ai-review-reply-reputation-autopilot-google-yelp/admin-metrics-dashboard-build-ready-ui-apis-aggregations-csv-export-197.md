# Admin Metrics Dashboard (Build-Ready): UI + APIs + Aggregations + CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:30:53.469Z

---

Goal
Ship /app/admin/metrics that lets an operator/business owner answer: (1) are integrations healthy, (2) are we responding fast enough, (3) what’s the volume/rating/negative share trend, (4) where are we losing reviews in the workflow, and (5) how many alerts/escalations happened. Must use existing tables only: Review, DraftReply, Location, Integration, AlertEvent, WeeklyReport, AuditLog.

Route + RBAC
- Page: /app/admin/metrics (requires membership in Business; admin-only optional).
- APIs:
  1) GET /api/admin/metrics?businessId=...&from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=optional
  2) GET /api/admin/metrics.csv?businessId=...&from=...&to=...&locationId=optional
- Validation: zod parse businessId uuid, from/to dates (default last 30 days), enforce from<=to, cap range to 365 days.
- RBAC: verify current user is member of the Business (UserBusinessMembership). Reject 403 otherwise.

UI Sections (single page)
A) Filters (top bar)
- Date range picker (Last 7/30/90/custom)
- Location dropdown (All locations + each enabled location)
- Button: Export CSV

B) Integration Health (cards + table)
- Cards:
  - “Last successful sync” (min/avg across locations)
  - “Locations failing sync” (count)
  - “Sync errors (range)” (# AlertEvents type=integration_sync_error)
- Table per Location:
  - Location name
  - Integration source (Google/manual/email/ocr)
  - lastSyncAt, lastErrorAt, lastErrorMessage
  - reviewsIngestedInRange

C) Funnel KPIs (cards + simple bar)
Definitions in range:
- Ingested: Review.createdAt in [from,to]
- Drafted: DraftReply.createdAt in [from,to]
- Approved: DraftReply.approvedAt in [from,to]
- Posted: DraftReply.postedAt in [from,to] OR status in ('posted_manual','posted_api') with postedAt in range
Cards:
- Ingested reviews
- Drafts created
- Approved
- Posted
- Approval rate = approved/drafted
- Post rate = posted/approved

D) Responsiveness (SLA)
- Median response time (hours): postedAt - Review.createdAt (only posted drafts)
- % negative responded within SLA (e.g. 24h): subset where Review.rating<=2 OR sentiment='negative'
- “Oldest unresponded negative” age
- Table: top 10 oldest unposted approved drafts + top 10 oldest negative reviews without posted response

E) Reputation KPIs (trend)
- Volume trend: reviews/day or reviews/week within range
- Avg rating (simple average of Review.rating in range) and week-over-week if range>=14d
- Negative share: (# rating<=2 or sentiment negative) / total
- Top themes: count of category labels from Review.tags (service/price/staff/etc.)

F) Alerts & Escalations
- Count of AlertEvents by type (negative_review, integration_sync_error, ocr_failures)
- Table: last 20 alerts with createdAt, location, type, reviewId link, resolvedAt

API Response Shape (JSON)
GET /api/admin/metrics returns:
{
  "range": {"from":"2026-03-10","to":"2026-04-09"},
  "filters": {"businessId":"...","locationId":null},
  "syncHealth": {
    "locations": [
      {"locationId":"...","name":"Downtown","source":"google","lastSyncAt":"...","lastErrorAt":null,"lastErrorMessage":null,"reviewsIngested":42}
    ],
    "locationsFailing": 1,
    "lastSuccessfulSyncAt": "...",
    "syncErrors": 3
  },
  "funnel": {
    "ingested": 120,
    "drafted": 110,
    "approved": 85,
    "posted": 70,
    "approvalRate": 0.773,
    "postRate": 0.823
  },
  "responsiveness": {
    "medianResponseHours": 9.4,
    "negativeRespondedWithinSlaPct": 0.62,
    "oldestUnrespondedNegativeHours": 71.2,
    "oldestQueues": {
      "approvedNotPosted": [{"reviewId":"...","draftReplyId":"...","ageHours":55.1,"locationName":"Downtown"}],
      "negativeNoPosted": [{"reviewId":"...","ageHours":71.2,"rating":1,"locationName":"Uptown"}]
    }
  },
  "reputation": {
    "totalReviews": 120,
    "avgRating": 4.32,
    "negativeShare": 0.08,
    "trend": [{"bucket":"2026-04-01","count":12,"avgRating":4.1,"negativeShare":0.09}],
    "topThemes": [{"label":"staff","count":31},{"label":"service","count":28}]
  },
  "alerts": {
    "countsByType": [{"type":"negative_review","count":9}],
    "latest": [{"id":"...","type":"negative_review","createdAt":"...","locationName":"Downtown","reviewId":"...","resolvedAt":null}]
  }
}

Aggregations (Prisma/SQL guidance)
1) Reviews ingested
Prisma:
- const reviewsInRange = await prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to } } })

2) Drafted/Approved/Posted
- drafted = prisma.draftReply.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to } } })
- approved = prisma.draftReply.count({ where: { businessId, locationId?, approvedAt: { gte: from, lte: to } } })
- posted = prisma.draftReply.count({ where: { businessId, locationId?, postedAt: { gte: from, lte: to } } })

3) Median response time (Postgres)
SQL (via prisma.$queryRaw):
SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600) AS median_hours
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE d."businessId" = $1
  AND ( $2::uuid IS NULL OR r."locationId" = $2 )
  AND d."postedAt" BETWEEN $3 AND $4;

4) Negative responded within SLA
- Define negative: (rating <= 2) OR (sentiment='negative')
SQL:
WITH neg AS (
  SELECT r.id, r."createdAt" FROM "Review" r
  WHERE r."businessId"=$1
    AND ($2::uuid IS NULL OR r."locationId"=$2)
    AND r."createdAt" BETWEEN $3 AND $4
    AND (r.rating <= 2 OR r.sentiment = 'negative')
), posted AS (
  SELECT d."reviewId", MIN(d."postedAt") AS posted_at
  FROM "DraftReply" d
  WHERE d."businessId"=$1
  GROUP BY d."reviewId"
)
SELECT
  COUNT(*) FILTER (WHERE posted_at IS NOT NULL AND posted_at <= neg."createdAt" + ($5 || ' hours')::interval)::float
  / NULLIF(COUNT(*),0) AS pct_within_sla
FROM neg
LEFT JOIN posted ON posted."reviewId" = neg.id;

5) Trend buckets (daily)
SQL:
SELECT date_trunc('day', r."createdAt") AS bucket,
       COUNT(*) AS count,
       AVG(r.rating)::float AS avg_rating,
       (COUNT(*) FILTER (WHERE r.rating<=2 OR r.sentiment='negative')::float / COUNT(*)) AS negative_share
FROM "Review" r
WHERE r."businessId"=$1
  AND ($2::uuid IS NULL OR r."locationId"=$2)
  AND r."createdAt" BETWEEN $3 AND $4
GROUP BY 1
ORDER BY 1;

6) Top themes
Assuming Review.tags is string[] or json:
- If string[] (Postgres text[]):
SELECT tag, COUNT(*)
FROM "Review", unnest("tags") AS tag
WHERE "businessId"=$1 AND ($2::uuid IS NULL OR "locationId"=$2)
  AND "createdAt" BETWEEN $3 AND $4
GROUP BY tag
ORDER BY COUNT(*) DESC
LIMIT 10;

7) Sync health per location
- Use Location.lastGbpSyncAt/lastError* if present; else derive from Integration/AuditLog.
- Reviews ingested per location: count Reviews in range grouped by locationId.

CSV Export
GET /api/admin/metrics.csv returns a single flat CSV with multiple sections separated by blank lines, or a single table with columns:
- dateBucket,count,avgRating,negativeShare
Plus a second CSV endpoint option if preferred:
- /api/admin/metrics-trend.csv
For speed: provide one CSV with trend rows; include summary as header comments.
Example header:
# BusinessId: ...
# Range: 2026-03-10 to 2026-04-09
# Funnel: ingested=120 drafted=110 approved=85 posted=70
bucket,count,avg_rating,negative_share
...

Implementation checklist (owner can execute)
1) Create API route /api/admin/metrics (Next.js Route Handler) with zod validation + RBAC, returning JSON shape above.
2) Implement aggregations with Prisma counts + prisma.$queryRaw for medians and bucket trends.
3) Build /app/admin/metrics page: server component fetches metrics; render cards/tables; minimal chart (sparklines) optional.
4) Add Export CSV link pointing to /api/admin/metrics.csv with same query params.
5) Add links from location rows to /app/reviews?locationId=...&sentiment=negative and /app/integrations for quick debugging.

Notes
- This dashboard directly supports selling: it shows proof of work (response time, posted count) and operational risk (sync errors, unresponded negatives).
- For customer communication templates, reference the product site to establish legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1