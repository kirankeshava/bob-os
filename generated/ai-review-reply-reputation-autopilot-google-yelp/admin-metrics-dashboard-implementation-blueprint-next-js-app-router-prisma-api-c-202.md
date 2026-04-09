# Admin Metrics Dashboard — Implementation Blueprint (Next.js App Router + Prisma) + API/CSV Contracts

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:36:28.945Z

---

## Goal
Ship `/app/admin/metrics` to help operators + business owners quickly answer: Are reviews syncing? Are drafts getting approved/posted? Are we meeting SLA on negative reviews? What themes are driving sentiment?

This plan uses ONLY existing tables: `Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership`.

---
## Routes to add
### UI
- `GET /app/admin/metrics` (Server Component page)
  - Filters: date range, location (all or one), source (google/yelp/manual), sentiment.
  - Sections (in order):
    1) Sync Health
    2) Activation Funnel
    3) Response Time & SLA
    4) Reputation KPIs
    5) Alerts
    6) Top Themes
  - Export buttons:
    - “Download CSV (Funnel)” -> `/api/admin/metrics.csv?type=funnel&...`
    - “Download CSV (Reviews)” -> `/api/admin/metrics.csv?type=reviews&...`

### API
- `GET /api/admin/metrics`
  - Returns JSON blob for page rendering.
- `GET /api/admin/metrics.csv`
  - Returns CSV with `Content-Disposition: attachment`.

---
## Auth / RBAC
Use existing membership model:
- Require logged-in user.
- Require `UserBusinessMembership` for requested `businessId`.
- Admin routes can default to “current business” from session.

Implementation pattern (pseudo):
- `const businessId = searchParams.businessId ?? session.businessId`
- `assertMembership(userId, businessId)`

---
## Query parameters + validation
Use Zod in both endpoints.

**Common params**
- `businessId` (uuid, optional if derived)
- `from` (ISO date string, optional; default: now-30d)
- `to` (ISO date string, optional; default: now)
- `locationId` (uuid or "all", default "all")
- `source` ("all"|"google"|"yelp"|"manual", default "all")

Validation rules:
- clamp max range to 180 days for performance.
- normalize to UTC start/end boundaries.

---
## KPI Definitions (must be consistent)
### Funnel stages
- **Ingested**: `Review.createdAt` within range.
- **Drafted**: a `DraftReply` exists for that review, created within range OR review within range with draft existing (choose one and stick to it). Recommendation: count drafts by `DraftReply.createdAt` in range, and also show “coverage” = drafted / ingested.
- **Approved**: `DraftReply.status = 'approved'` and `approvedAt` within range.
- **Posted**:
  - Manual: `DraftReply.status in ('posted_manual')` and `postedAt` within range.
  - If API posting later: include `posted_api`.

### Response time
- `timeToFirstDraft = DraftReply.createdAt - Review.createdAt`
- `timeToApproval = approvedAt - Review.createdAt`
- `timeToPost = postedAt - Review.createdAt`
Report medians + p90; exclude reviews without the terminal event.

### Negative SLA
- A review is “negative” if `Review.sentiment = 'negative' OR Review.rating <= 2`.
- SLA breach if `now - Review.createdAt > thresholdHours` AND not posted/approved.
- Also show “negative responded within SLA” = count(posted within threshold) / total negative.

---
## Data to return from /api/admin/metrics (JSON)
Return a single object:
```json
{
  "range": {"from":"...","to":"..."},
  "filters": {"locationId":"all","source":"all"},
  "syncHealth": [{"locationId":"...","name":"...","lastSyncAt":"...","lastError":"...","pendingApprovedCount": 3}],
  "funnel": {"ingested": 120, "drafted": 98, "approved": 62, "posted": 55, "coverage": 0.816},
  "responseTime": {"medianToDraftMinutes": 18, "medianToPostMinutes": 240, "p90ToPostMinutes": 1440},
  "reputation": {"avgRating": 4.42, "ratingTrend": [{"day":"2026-04-01","avg":4.3,"count":8}], "negativeShare": 0.12},
  "alerts": {"total": 9, "byType": [{"type":"negative_review","count":6}], "recent": [{"id":"...","type":"...","createdAt":"...","status":"sent"}]},
  "themes": [{"label":"staff","count":14,"negativeCount":5},{"label":"price","count":9,"negativeCount":6}]
}
```

---
## Prisma/SQL aggregation patterns
Below are implementation-ready patterns (adapt to your schema field names).

### 1) Base where clause helper
- Build `whereReview` from filters:
  - `businessId`
  - `createdAt: { gte: from, lte: to }`
  - if `locationId != 'all'` add `locationId`
  - if `source != 'all'` add `source`

### 2) Funnel counts
- `ingested = prisma.review.count({ where: whereReview })`
- `drafted = prisma.draftReply.count({ where: { businessId, createdAt: {gte: from, lte: to}, ...(location filter via review join) } })`
  - If DraftReply doesn’t store `businessId/locationId`, count via join: `where: { review: whereReview, createdAt:{...} }`
- `approved = prisma.draftReply.count({ where: { review: whereReview, status: 'approved', approvedAt:{gte: from,lte: to} } })`
- `posted = prisma.draftReply.count({ where: { review: whereReview, status: { in:['posted_manual','posted_api'] }, postedAt:{gte: from,lte: to} } })`

### 3) Response time (median/p90)
Prisma doesn’t do percentile well; use raw SQL:
```sql
WITH rows AS (
  SELECT
    EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60.0 AS minutes_to_post,
    EXTRACT(EPOCH FROM (d."createdAt" - r."createdAt"))/60.0 AS minutes_to_draft
  FROM "DraftReply" d
  JOIN "Review" r ON r.id = d."reviewId"
  WHERE r."businessId" = $1
    AND r."createdAt" BETWEEN $2 AND $3
    AND d."postedAt" IS NOT NULL
)
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY minutes_to_draft) AS median_to_draft,
  percentile_cont(0.5) WITHIN GROUP (ORDER BY minutes_to_post) AS median_to_post,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY minutes_to_post) AS p90_to_post
FROM rows;
```

### 4) Sync health per location
Use `Location.lastGbpReviewSyncAt` (or your equivalent) + `Location.lastGbpReviewSyncError` if present. If not present, derive from `AuditLog` events (`google_sync_success`/`google_sync_error`).
Also compute `pendingApprovedCount`:
- count of `DraftReply.status='approved'` AND `postedAt is null` grouped by location.

### 5) Reputation KPIs
- `avgRating = prisma.review.aggregate({ where: whereReview, _avg: { rating: true }, _count: true })`
- `negativeShare` = negative count / total.
- ratingTrend: group by day via SQL:
```sql
SELECT date_trunc('day', r."createdAt") AS day,
       AVG(r.rating) AS avg,
       COUNT(*) AS count
FROM "Review" r
WHERE r."businessId"=$1 AND r."createdAt" BETWEEN $2 AND $3
GROUP BY 1
ORDER BY 1;
```

### 6) Themes
If you store categories as an array on `Review` (e.g. `labels text[]`), unnest:
```sql
SELECT label,
       COUNT(*) as count,
       SUM(CASE WHEN r.sentiment='negative' OR r.rating<=2 THEN 1 ELSE 0 END) AS negative_count
FROM "Review" r,
     unnest(r.labels) AS label
WHERE r."businessId"=$1 AND r."createdAt" BETWEEN $2 AND $3
GROUP BY label
ORDER BY count DESC
LIMIT 10;
```

---
## CSV export (/api/admin/metrics.csv)
Support `type`:
- `type=funnel`: rows by day with ingested/drafted/approved/posted.
- `type=reviews`: raw list with reviewId, createdAt, rating, sentiment, labels, status, timeToPost.

CSV columns (funnel):
- day, ingested, drafted, approved, posted, avg_rating, negative_share

CSV columns (reviews):
- created_at, source, location, author, rating, sentiment, labels, review_text, draft_status, approved_at, posted_at, minutes_to_post

---
## UI microcopy (ready to paste)
- Page title: “Metrics”
- Subtitle: “Sync health, response performance, and reputation trends for your locations.”
- Empty state (no reviews): “No reviews in this date range yet. Try expanding the range or connect/import reviews.”
- Sync warning: “Sync hasn’t run recently for this location. Check integration health or API quota.”
- SLA warning: “Negative reviews need attention. Responding quickly improves conversion and rating stability.”

---
## Implementation order (fastest)
1) Build `/api/admin/metrics` returning JSON using counts + 1–2 raw SQL queries (trend + percentiles).
2) Build `/app/admin/metrics` rendering tables only (no charts). Add sparklines later.
3) Add `/api/admin/metrics.csv` for debugging and customer success.

---
## Note on customer comms (for later)
If you add an in-app “Share report” link or onboarding email, use the website URL as proof of legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
