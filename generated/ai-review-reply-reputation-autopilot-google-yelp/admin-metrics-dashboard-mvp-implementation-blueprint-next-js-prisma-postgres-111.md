# Admin Metrics Dashboard (MVP) — Implementation Blueprint (Next.js + Prisma + Postgres)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:14:55.176Z

---

## Goal
Ship **/app/admin/metrics** that answers: (1) Is syncing healthy? (2) Are we converting ingested reviews into posted replies? (3) Are we responding fast enough, especially to negative reviews? (4) Are alerts firing and being acted on?

This is an internal/operator dashboard for each Business. It must use existing tables only: `Business`, `Location`, `Integration`, `Review`, `DraftReply`, `AlertEvent`, `WeeklyReport`, `AuditLog`.

---
## UI: /app/admin/metrics
### Filters (top bar)
- Date range: `from`, `to` (default: last 14 days)
- Location selector: `all | locationId`
- Source: `all | google | yelp | manual | email | ocr`
- Sentiment: `all | positive | neutral | negative`
- Button: **Export CSV** (links to `/api/admin/metrics.csv?...`)

### Section A — Sync Health (table)
Table by Location:
- Location name
- Source(s) enabled (Google, Yelp/manual)
- `lastSyncAt` (Google)
- `lastSyncStatus` (OK / Error)
- `lastError` (truncated)
- Reviews ingested in range
- % reviews tagged
- % reviews drafted

Data sources:
- `Location.lastGbpSyncAt`, `Location.lastGbpSyncError` (or equivalent fields you already log)
- `Review.createdAt` in range
- `Review.sentiment` not null indicates tagged
- `DraftReply` existence indicates drafted

### Section B — Activation Funnel (KPIs + small table)
KPI cards:
- Reviews ingested
- Drafts created
- Drafts approved
- Replies posted (manual + API)
- Overall conversion: posted / ingested

Funnel definitions (important to be consistent):
- **Ingested**: `Review.createdAt` in range
- **Drafted**: at least one `DraftReply` created for that review (use latest draft or any)
- **Approved**: latest draft status == `approved`
- **Posted**: latest draft `postedAt` not null OR status in (`posted_manual`,`posted_api`)

Also show breakdown:
- By sentiment (pos/neu/neg)
- By source (google/yelp/manual/email/ocr)

### Section C — Response Time & SLA
KPI cards:
- Median response time (posted only)
- P90 response time (posted only)
- Negative reviews: median response time
- Unanswered negative count (negative & no posted reply)

Response time definition:
- For posted replies only: `draft.postedAt - review.reviewCreatedAt` (prefer external review timestamp if stored; otherwise use `Review.createdAt` as fallback)
- Exclude rejected drafts and reviews with no posted reply

### Section D — Alerts & Escalations
Table of `AlertEvent` in range:
- createdAt
- location
- type (negative_review, sync_failure, ocr_failure, etc.)
- severity
- status (sent/ack/resolved if you track; else just show created)
- related review link

### Section E — Weekly Reports Audit
Table:
- Week start/end
- generatedAt
- emailedTo
- status (sent/fail)
- link to stored PDF (if stored) or regenerate button

---
## API Design
### GET /api/admin/metrics
Returns JSON for the dashboard. Query params:
- `from` ISO date
- `to` ISO date
- `locationId` optional
- `source` optional
- `sentiment` optional

Response shape:
```json
{
  "range": {"from":"...","to":"..."},
  "syncHealth": [{"locationId":"...","locationName":"...","lastSyncAt":"...","lastError":"...","ingested":12,"tagged":11,"drafted":10}],
  "funnel": {"ingested":120,"drafted":98,"approved":70,"posted":55,"bySentiment": {"positive":...,"neutral":...,"negative":...},"bySource": {...}},
  "responseTime": {"medianHours": 18.2, "p90Hours": 46.0, "negativeMedianHours": 9.1, "unansweredNegative": 7},
  "alerts": [{"id":"...","type":"sync_failure","severity":"high","createdAt":"...","locationName":"...","reviewId":"..."}],
  "weeklyReports": [{"id":"...","periodStart":"...","periodEnd":"...","sentAt":"...","status":"sent"}]
}
```

### GET /api/admin/metrics.csv
Returns a flattened CSV useful for debugging and sharing internally. Suggested columns:
- date
- location
- source
- sentiment
- ingested_count
- drafted_count
- approved_count
- posted_count
- median_response_hours
- p90_response_hours
- alerts_count

Implementation: compute daily aggregates over the range; keep it simple.

---
## RBAC & Validation
- Require logged-in user.
- Require membership in `UserBusinessMembership` for the `businessId` in session.
- Validate params with Zod:
  - `from`/`to` required, max range e.g. 90 days to protect DB
  - `locationId` must belong to business

---
## Queries / Aggregations (Prisma-first; SQL where needed)
Assumptions (adjust field names to match your schema):
- `Review`: `id`, `businessId`, `locationId`, `source`, `createdAt`, `reviewCreatedAt`, `rating`, `sentiment`, `categories` (array)
- `DraftReply`: `id`, `reviewId`, `status`, `createdAt`, `approvedAt`, `postedAt`
- `Location`: `id`, `businessId`, `name`, `lastGbpSyncAt`, `lastGbpSyncError`
- `AlertEvent`: `id`, `businessId`, `locationId`, `type`, `severity`, `createdAt`, `reviewId`

### 1) Sync Health per location
Prisma approach:
- Load locations for business (and optional location filter)
- For each location, compute counts:
  - ingested: `Review.count({ where: { businessId, locationId, createdAt: { gte: from, lte: to }, ...filters }})`
  - tagged: same but `sentiment: { not: null }`
  - drafted: count distinct reviewIds that have DraftReply created in range OR for reviews in range.

Recommended: drafted count should be based on reviews ingested in range:
- Fetch `reviewIds` in range (could be large; prefer SQL distinct join).

SQL snippet (Postgres) for drafted count by location:
```sql
SELECT r."locationId", COUNT(DISTINCT r.id) AS drafted
FROM "Review" r
JOIN "DraftReply" d ON d."reviewId" = r.id
WHERE r."businessId" = $1
  AND r."createdAt" BETWEEN $2 AND $3
GROUP BY r."locationId";
```

### 2) Funnel totals
Ingested:
```ts
const ingested = await prisma.review.count({ where: baseReviewWhere });
```
Drafted (distinct reviews with at least one draft): SQL join distinct (above but without group).

Approved / Posted based on latest draft per review.
Simplest MVP approximation (good enough for operator metrics):
- Count any draft with status approved in range for reviews in range.
- Count any draft with postedAt not null in range for reviews in range.

Better (still feasible) “latest draft per review” SQL:
```sql
WITH latest AS (
  SELECT DISTINCT ON (d."reviewId") d.*
  FROM "DraftReply" d
  JOIN "Review" r ON r.id = d."reviewId"
  WHERE r."businessId" = $1 AND r."createdAt" BETWEEN $2 AND $3
  ORDER BY d."reviewId", d."createdAt" DESC
)
SELECT
  COUNT(*) FILTER (WHERE true) AS drafted,
  COUNT(*) FILTER (WHERE latest.status = 'approved') AS approved,
  COUNT(*) FILTER (WHERE latest."postedAt" IS NOT NULL OR latest.status IN ('posted_manual','posted_api')) AS posted
FROM latest;
```

### 3) Response time distribution
Compute on posted latest drafts only:
```sql
WITH latest AS (
  SELECT DISTINCT ON (d."reviewId") d."reviewId", d."postedAt", d.status
  FROM "DraftReply" d
  JOIN "Review" r ON r.id = d."reviewId"
  WHERE r."businessId" = $1 AND r."createdAt" BETWEEN $2 AND $3
  ORDER BY d."reviewId", d."createdAt" DESC
), posted AS (
  SELECT r.id, r.sentiment,
         EXTRACT(EPOCH FROM (l."postedAt" - COALESCE(r."reviewCreatedAt", r."createdAt"))) / 3600.0 AS hours
  FROM latest l
  JOIN "Review" r ON r.id = l."reviewId"
  WHERE l."postedAt" IS NOT NULL OR l.status IN ('posted_manual','posted_api')
)
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY hours) AS median_hours,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY hours) AS p90_hours,
  percentile_cont(0.5) WITHIN GROUP (ORDER BY hours) FILTER (WHERE sentiment = 'negative') AS negative_median_hours
FROM posted;
```
Unanswered negative:
```sql
WITH latest AS (
  SELECT DISTINCT ON (d."reviewId") d."reviewId", d."postedAt", d.status
  FROM "DraftReply" d
  ORDER BY d."reviewId", d."createdAt" DESC
)
SELECT COUNT(*)
FROM "Review" r
LEFT JOIN latest l ON l."reviewId" = r.id
WHERE r."businessId" = $1
  AND r."createdAt" BETWEEN $2 AND $3
  AND (r.sentiment = 'negative' OR r.rating <= 2)
  AND (l."reviewId" IS NULL OR (l."postedAt" IS NULL AND l.status NOT IN ('posted_manual','posted_api')));
```

### 4) Alerts list
```ts
const alerts = await prisma.alertEvent.findMany({
  where: { businessId, createdAt: { gte: from, lte: to }, ...(locationId?{locationId}:{}) },
  orderBy: { createdAt: 'desc' },
  take: 200
});
```

### 5) Weekly reports
```ts
const weeklyReports = await prisma.weeklyReport.findMany({
  where: { businessId, periodStart: { gte: from }, periodEnd: { lte: to } },
  orderBy: { createdAt: 'desc' },
  take: 26
});
```

---
## Frontend Implementation Notes (fast path)
- Use a server component for the page that calls internal function `getMetrics(businessId, params)`.
- Render tables with simple HTML + Tailwind. Avoid heavy chart libs. If you want charts: use tiny sparkline (SVG) built-in.
- Provide deep links to existing pages:
  - Click location -> `/app/reviews?locationId=...`
  - Click alert with reviewId -> `/app/reviews/{id}`

---
## Optional: Customer-facing “Ops Snapshot” (later)
Once stable, you can share a read-only snapshot with customers, linking to your legitimacy website URL:
- https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
But MVP should keep this admin-only.

---
## Definition Checklist (so metrics don’t drift)
- A review is counted once by `Review.id`.
- Draft/approve/post are based on **latest** draft for the review.
- Response time uses `postedAt - reviewCreatedAt` (fallback to `Review.createdAt`).
- Negative = `sentiment='negative' OR rating<=2` (match your escalation rule default).

This blueprint is ready for direct implementation in Next.js + Prisma with minimal new code and no new services.