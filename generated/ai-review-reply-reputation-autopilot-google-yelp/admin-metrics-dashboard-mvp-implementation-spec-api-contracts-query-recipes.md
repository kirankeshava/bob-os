# Admin Metrics Dashboard (MVP) — Implementation Spec + API Contracts + Query Recipes

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:31:45.634Z

---

# Admin Metrics Dashboard (MVP)

Goal: ship **/app/admin/metrics** to give each business a clear view of (1) integration sync health, (2) activation funnel (ingested→drafted→approved→posted), (3) response-time KPIs, and (4) alert volume. Must use existing tables and be reliable/debuggable.

Website proof-of-legitimacy (share with pilots/customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

## 1) Page/Route Structure (Next.js App Router)

### Page
- **GET /app/admin/metrics**
  - Server component page with:
    - Business selector (if admin belongs to multiple businesses)
    - Date range picker (default last 30 days)
    - Location filter (All locations default)
    - Source filter (All / Google / Yelp / Manual)
    - Export CSV button

### Supporting endpoints
- **GET /api/admin/metrics?businessId=...&from=...&to=...&locationId=...&source=...**
  - Returns JSON payload for cards/tables
- **GET /api/admin/metrics.csv?businessId=...&from=...&to=...&locationId=...&source=...**
  - Returns CSV with key metrics + per-day breakdown (for debugging)

RBAC: user must be member of business (UserBusinessMembership). If not, return 403.

Validation: zod schema for query params.

---

## 2) KPI Definitions (consistent + auditable)

### Core entities
- **Review**: ingested review.
- **DraftReply**: generated response draft.
- **AuditLog**: source of truth for state changes (approved/rejected/posted_manual etc.).
- **AlertEvent**: negative review alerts and sync failure alerts.

### Funnel stages
Definitions should be deterministic and easy to compute:
1. **Ingested**: count of `Review` createdAt within range.
2. **Drafted**: count of `Review` with ≥1 `DraftReply` createdAt within range OR DraftReply linked to review; use DraftReply.createdAt filter primarily.
3. **Approved**: count of reviews where latest DraftReply reached status `approved` within range.
   - Prefer AuditLog event `draft.approved` timestamp if present.
4. **Posted**: count of drafts marked posted (manual or API) within range.
   - Use DraftReply.status in {`posted_manual`,`posted_api`} OR AuditLog event `draft.posted`.

### Response time
- **Response time (hours)** = time from Review.createdAt → first “posted” timestamp for that review.
- Exclude reviews with no posted event.
- Exclude rejected drafts and approved-but-never-posted.

### Negative share
- Negative if `Review.rating <= 2` OR `Review.sentiment = 'negative'`.
- Negative share = negativeCount / totalCount.

### Themes
- Use existing category labels: service/price/staff/quality/cleanliness/wait_time/other.
- Top themes = frequency of categories among negative reviews + overall.

### Sync health
Per location:
- lastSyncAt (from Location.lastGbpSyncAt or Integration metadata)
- lastError (from Integration.lastError or latest AlertEvent.type = `sync_failed`)
- watermark value (Location.lastGbpReviewSyncUpdateTime)
- review count ingested last 7 days

---

## 3) JSON Contract: /api/admin/metrics

### Request
Query params:
- businessId: string (required)
- from: ISO date string (optional; default now-30d)
- to: ISO date string (optional; default now)
- locationId: string (optional)
- source: 'google'|'yelp'|'manual'|'all' (optional; default all)

### Response
```json
{
  "range": {"from":"2026-03-10","to":"2026-04-09"},
  "filters": {"locationId": null, "source": "all"},
  "cards": {
    "reviewsIngested": 0,
    "draftsCreated": 0,
    "approved": 0,
    "posted": 0,
    "negativeShare": 0.0,
    "avgRating": 0.0,
    "medianResponseHours": null,
    "p90ResponseHours": null
  },
  "funnel": {
    "ingested": 0,
    "drafted": 0,
    "approved": 0,
    "posted": 0
  },
  "timeSeries": {
    "byDay": [
      {"date":"2026-04-01","ingested":0,"posted":0,"avgRating":null,"negativeShare":null}
    ]
  },
  "themes": {
    "overall": [{"label":"service","count":0}],
    "negative": [{"label":"staff","count":0}]
  },
  "alerts": {
    "total": 0,
    "byType": [{"type":"negative_review","count":0}],
    "recent": [
      {"id":"...","type":"negative_review","createdAt":"...","locationName":"...","reviewId":"...","message":"..."}
    ]
  },
  "syncHealth": {
    "locations": [
      {
        "locationId":"...",
        "name":"Main Location",
        "source":"google",
        "enabled": true,
        "lastSyncAt":"...",
        "lastError": null,
        "watermark":"2026-04-08T19:22:11Z",
        "ingested7d": 0
      }
    ]
  }
}
```

---

## 4) Query Recipes (Prisma-first; SQL where needed)

Assumptions about schema fields (adjust names to your Prisma schema):
- Review: id, businessId, locationId, source, rating, sentiment, categories (string[] or json), createdAt
- DraftReply: id, reviewId, businessId, status, createdAt, postedAt
- Location: id, businessId, name, source, enabled, lastGbpSyncAt, lastGbpReviewSyncUpdateTime
- AlertEvent: id, businessId, locationId, type, createdAt, message, reviewId
- AuditLog: id, businessId, actorUserId, action, entityType, entityId, createdAt, metadata(json)

### Base where clause helper
- businessId always required
- createdAt range filter on Review.createdAt and DraftReply.createdAt
- optional filters: locationId, source

### Cards: counts
- reviewsIngested:
  - `prisma.review.count({ where: { businessId, createdAt: {gte: from, lte: to}, ...(location/source filters) }})`
- draftsCreated:
  - `prisma.draftReply.count({ where: { businessId, createdAt: range, review: { ...reviewFilter }}})`
- approved:
  - Prefer AuditLog: `action='draft.approved'` within range and filtered to business/location/source via join through DraftReply.review.
  - If no join-friendly audit schema, fallback: `DraftReply.status='approved' AND updatedAt in range` (less accurate).
- posted:
  - `DraftReply.status in ['posted_manual','posted_api'] AND postedAt in range`.

### Avg rating
- `prisma.review.aggregate({ where: reviewFilter, _avg: { rating: true }})`

### Negative share
- negativeCount: `rating <= 2 OR sentiment='negative'`
- share = negativeCount / totalCount (guard divide-by-zero)

### Response times (median, p90)
Compute with SQL for percentile if Postgres:
- Create a CTE selecting reviews within filter + their first postedAt:
  - first postedAt per review = MIN(DraftReply.postedAt) where status posted.
- Compute EXTRACT(EPOCH FROM (postedAt - review.createdAt))/3600 as responseHours.
- Then percentile_disc(0.5) and percentile_disc(0.9) (or percentile_cont) over responseHours.
If Prisma-only, fetch responseHours list (bounded by date range) and compute median/p90 in JS.

### Time series by day
- Group reviews by date(review.createdAt): total ingested, avg rating.
- Group posted by date(DraftReply.postedAt): posted count.
- Merge into a continuous date list from from..to.

### Themes
If categories stored as array/json:
- Pull negative reviews’ categories and count occurrences.
- Also do overall category counts.
If categories stored as scalar label:
- groupBy label.

### Alerts
- total and byType: `prisma.alertEvent.groupBy({ by:['type'], _count:true, where: alertFilter })`
- recent: `findMany({ orderBy: {createdAt:'desc'}, take: 20 })`

### Sync health
- `prisma.location.findMany({ where: { businessId, ...(optional locationId) }})`
- For each location, compute ingested7d count.
- lastError can be from Location.lastSyncError field if present; otherwise query most recent sync_failed AlertEvent.

---

## 5) /app/admin/metrics UI Layout (MVP)

### Header
- Title: “Metrics”
- Subtext: “Track review response performance and integration health.”
- Filters row: Date range, Location, Source, Export CSV

### Section A: KPI Cards (4–8 cards)
- Reviews ingested
- Drafts created
- Approved
- Posted
- Avg rating
- Negative share
- Median response time
- P90 response time

Empty state: If no data, show “No reviews in this date range. Try expanding the range.”

### Section B: Funnel
- Simple horizontal funnel: Ingested → Drafted → Approved → Posted
- Show conversion % between steps.

### Section C: Trends
- Table-first (fast MVP): list last 14/30 days with ingested/posted/avgRating/negativeShare.
- Optional lightweight chart (later). MVP can be table.

### Section D: Themes
- Two small tables:
  - Top themes (overall)
  - Top themes (negative reviews)

### Section E: Alerts
- Cards: total alerts, negative_review alerts, sync_failed alerts.
- Recent alerts table: type, createdAt, location, message, link to review.

### Section F: Sync Health
- Per-location table:
  - Location name, source, enabled, lastSyncAt, watermark, ingested7d, status badge (OK/Delayed/Error)
- Status rules:
  - OK: lastSyncAt within 24h
  - Delayed: 24–72h
  - Error: lastError present OR lastSyncAt >72h

---

## 6) CSV Export Spec (/api/admin/metrics.csv)

Include:
- Summary rows (key,value)
- Then “Daily Breakdown” with columns:
  - date, ingested, posted, avgRating, negativeShare
- Then “Themes Overall” and “Themes Negative” sections.
- Then “Sync Health” section with per-location.

This makes it easy for operators to debug and share with customers.

---

## 7) Instrumentation
- Log a single event on metrics generation:
  - `metrics.viewed` with filters + businessId
- If query errors:
  - Sentry capture + return 500 with correlationId.

---

## 8) Quick Acceptance Checklist
- Loads in <2s for a business with ~5k reviews (last 30 days filtered will be smaller).
- Filters work (date range + location + source).
- Numbers match Weekly PDF report for same range (sanity check).
- CSV exports and opens in Google Sheets.
- RBAC prevents cross-business access.

This spec is intentionally table-first (reliable + fast). Charts can be layered later once correctness is proven.