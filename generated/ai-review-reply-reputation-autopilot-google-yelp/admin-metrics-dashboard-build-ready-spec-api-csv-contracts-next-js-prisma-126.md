# Admin Metrics Dashboard — Build-Ready Spec + API/CSV Contracts (Next.js + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:42:55.661Z

---

# Admin Metrics Dashboard — Build-Ready Spec + API/CSV Contracts

Goal: ship `/app/admin/metrics` so you (and customers later) can quickly verify activation + reliability: Are reviews syncing? Are drafts being produced? Are they approved and posted quickly? Are negative reviews being escalated within SLA?

This dashboard must use existing tables only: `Business`, `Location`, `Integration`, `Review`, `DraftReply`, `AlertEvent`, `WeeklyReport`, `AuditLog`, `UserBusinessMembership`.

---

## 1) UX / Page Layout

Route: `/app/admin/metrics`

Filters (top bar):
- Date range: `start` + `end` (default last 30 days)
- Location dropdown: `locationId=all|<id>`
- Source filter (optional): `source=all|google|yelp|manual|ocr|email`

Sections:
1) **Sync Health (per location)**
   - Table columns:
     - Location name
     - Integration source (GBP/manual/etc.)
     - Last sync time (if GBP enabled)
     - Last sync error (truncated)
     - Reviews ingested (range)
     - Negative reviews (range)
   - Badge states: Healthy (synced < 6h), Warning (6–24h), Critical (>24h or lastError set)

2) **Activation Funnel (range, optional per-location)**
   - KPIs:
     - Ingested reviews
     - Drafts created
     - Drafts approved
     - Marked posted (manual/API)
   - Conversion rates:
     - Draft rate = drafts/ingested
     - Approval rate = approved/drafts
     - Posting rate = posted/approved

3) **Response Time & SLA**
   - Median response time (hours) from review createdAt → postedAt
   - Median time-to-approve (hours) from draft createdAt → approvedAt
   - Negative reviews responded within SLA (%):
     - SLA definition: if `rating <= 2 OR sentiment=negative` then must be posted within `Location.negativeSlaHours` (fallback 24)

4) **Themes & Sentiment**
   - Sentiment split: positive/neutral/negative counts
   - Top categories: `service, price, staff, quality, cleanliness, wait_time, other` with counts

5) **Alerts & Failures**
   - AlertEvent volume over time
   - Top alert types: `NEGATIVE_REVIEW`, `SYNC_FAILED`, `OCR_FAILED`, `POLICY_BLOCK`, etc.
   - “Open alerts” = alert events in last 7 days without a resolved marker (if no resolved field exists, treat all as informational and show latest)

6) Export
- Button: “Export CSV” calls `/api/admin/metrics.csv?start=...&end=...&locationId=...`

---

## 2) Definitions (to keep metrics consistent)

Use these canonical definitions across UI and weekly report:

- **Ingested**: `Review.createdAt` within range.
- **Drafted**: exists `DraftReply` for a review where `DraftReply.createdAt` within range OR review createdAt within range (pick one and stick to it).
  - Recommendation: count drafts by `Review.createdAt` range (ties funnel to new reviews). Use left joins.
- **Approved**: `DraftReply.status = 'approved'` AND `approvedAt` not null AND review createdAt in range.
- **Posted**: `DraftReply.postedAt` not null AND `postedStatus IN ('posted_manual','posted_api')` AND review createdAt in range.
- **Response time**: `postedAt - Review.createdAt` (exclude rejected or never posted).
- **Time-to-approve**: `approvedAt - DraftReply.createdAt`.

- **Negative review**: `Review.rating <= 2 OR Review.sentiment='negative'`.
- **Within SLA**: `postedAt` exists AND `postedAt - Review.createdAt <= slaHours`.

---

## 3) Data Requirements (fields)

Assumed existing (based on prior cycles):
- `Review`: id, businessId, locationId, source, rating, authorName, text, createdAt, sentiment, categories (array), rawPayload
- `DraftReply`: id, reviewId, status, createdAt, updatedAt, approvedAt, postedAt, postedStatus, content, model
- `Location`: id, businessId, name, gbpLocationId, isSyncEnabled, lastGbpReviewSyncUpdateTime, negativeSlaHours
- `Integration`: id, businessId, provider ('google'|'yelp'|'manual'), lastSyncAt, lastError
- `AlertEvent`: id, businessId, locationId?, type, severity, createdAt, payload
- `AuditLog`: businessId, actorUserId, action, entityType, entityId, createdAt, metadata

No schema changes required.

---

## 4) API Contracts

### 4.1 GET `/api/admin/metrics`
Auth: must be member of business via `UserBusinessMembership`.

Query params:
- `businessId` (optional if inferred from session default business)
- `start` ISO date
- `end` ISO date
- `locationId=all|<uuid>`
- `source=all|google|yelp|manual|ocr|email` (optional)

Response JSON:
```json
{
  "range": {"start":"2026-03-10","end":"2026-04-09"},
  "filters": {"locationId":"all","source":"all"},
  "syncHealth": [
    {
      "locationId":"...",
      "locationName":"Downtown",
      "provider":"google",
      "lastSyncAt":"2026-04-09T01:22:00Z",
      "lastError": null,
      "reviewsIngested": 42,
      "negativeReviews": 6
    }
  ],
  "funnel": {
    "ingested": 120,
    "drafted": 118,
    "approved": 90,
    "posted": 77,
    "draftRate": 0.983,
    "approvalRate": 0.763,
    "postingRate": 0.856
  },
  "timing": {
    "medianResponseHours": 6.4,
    "medianApprovalHours": 1.2,
    "negativeWithinSlaPct": 0.71
  },
  "sentiment": {"positive": 70,"neutral": 35,"negative": 15},
  "categories": [
    {"category":"service","count":31},
    {"category":"staff","count":24}
  ],
  "alerts": {
    "total": 9,
    "byType": [{"type":"NEGATIVE_REVIEW","count":5},{"type":"SYNC_FAILED","count":2}],
    "recent": [
      {"id":"...","type":"SYNC_FAILED","severity":"high","createdAt":"...","locationId":"..."}
    ]
  }
}
```

### 4.2 GET `/api/admin/metrics.csv`
Same query params. Returns CSV with multiple blocks or a “wide” CSV.

Recommendation: return a zip is slower; do a **wide CSV** with one row per location plus a summary row.

Columns:
- range_start, range_end
- location_id, location_name, provider
- last_sync_at, last_error
- ingested, negative
- drafted, approved, posted
- median_response_hours, median_approval_hours, negative_within_sla_pct
- sentiment_positive, sentiment_neutral, sentiment_negative
- top_categories (semicolon-separated `category:count`)
- alerts_total, alerts_by_type (semicolon-separated)

---

## 5) Aggregation Approach (Prisma + SQL-friendly)

### 5.1 Base review filter
Use a shared where-clause:
- `businessId = sessionBusinessId`
- `createdAt >= start AND createdAt < end`
- if `locationId != all` add `locationId`
- if `source != all` add `source`

### 5.2 Funnel counts (by review createdAt range)
- ingested: `count(Review)`
- drafted: count of reviews with at least 1 draft
- approved: count of reviews where latest draft is approved OR any draft approved
- posted: count of reviews where any draft posted

Simplest reliable logic (no “latest” requirement):
- drafted: `Review` where `DraftReply.some({})`
- approved: `Review` where `DraftReply.some({ status: 'approved', approvedAt: { not: null } })`
- posted: `Review` where `DraftReply.some({ postedAt: { not: null } })`

This avoids tricky “latest draft” semantics and matches operational reality.

### 5.3 Median calculations
Prisma doesn’t do median natively. Fast approach:
- Query list of response durations (hours) for posted drafts in range (bounded).
- Compute median in JS.

For response time dataset:
- Join `DraftReply` to `Review` where `Review.createdAt in range` and `DraftReply.postedAt != null`.
- Use `MIN(postedAt)` per review if multiple posted drafts exist (shouldn’t, but be defensive).

If you want SQL median (Postgres): `percentile_cont(0.5) within group (order by ...)`.

Example raw SQL:
```sql
select
  percentile_cont(0.5) within group (order by extract(epoch from (dr."postedAt" - r."createdAt"))/3600.0) as median_response_hours
from "DraftReply" dr
join "Review" r on r.id = dr."reviewId"
where r."businessId" = $1
  and r."createdAt" >= $2 and r."createdAt" < $3
  and dr."postedAt" is not null;
```

### 5.4 SLA compliance
For negative reviews in range:
- Compute `isNegative = rating<=2 OR sentiment='negative'`.
- SLA hours: location.negativeSlaHours (fallback 24).
- Count negative with postedAt and diffHours <= slaHours.

Implementation approach:
- Fetch negative reviews with locationId + createdAt.
- Fetch earliest postedAt per review.
- Join in JS with location SLA values.

### 5.5 Sentiment & categories
- Sentiment: groupBy Review.sentiment.
- Categories: if stored as array, easiest is raw SQL `unnest`.

Example raw SQL for array categories:
```sql
select cat as category, count(*)::int as count
from (
  select unnest(r."categories") as cat
  from "Review" r
  where r."businessId"=$1 and r."createdAt">=$2 and r."createdAt"<$3
) t
group by cat
order by count desc
limit 10;
```

### 5.6 Sync health per location
For each location in business:
- provider: if GBP enabled, show google; else manual
- lastSyncAt / lastError: from Integration(provider=google) OR from last health endpoint state; simplest:
  - store `Integration.lastSyncAt` and `Integration.lastError` already
  - but you also track per-location watermark `Location.lastGbpReviewSyncUpdateTime`
- Reviews ingested in range: count reviews by location.

---

## 6) Page Implementation Plan (Next.js App Router)

### 6.1 Server page
`app/app/admin/metrics/page.tsx`
- Read query params.
- Call internal fetch to `/api/admin/metrics` or import a server function `getMetrics()`.
- Render:
  - Summary cards
  - Tables
  - Export CSV link

Keep charts optional. If needed, use simple `<progress>` bars or sparkline later.

### 6.2 RBAC
- Enforce in API: verify session user is member of requested business.
- In UI: only show admin routes to `role in ('owner','admin')` if roles exist; if not, any member can view for MVP.

---

## 7) Instrumentation

Add audit events (already in place) for:
- `METRICS_VIEWED` with filters
- `METRICS_EXPORTED_CSV`

Use Sentry breadcrumbs:
- include businessId, date range, locationId

---

## 8) Customer-Facing Note (for future)
If you later share metrics screenshots with prospects, include the legitimacy link:
- https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

## 9) Acceptance Criteria
- Viewing `/app/admin/metrics` loads within <2s for 30-day range for a typical SMB (few hundred reviews)
- Numbers match weekly report definitions (ingested/posted/response time)
- CSV export works and is usable in Google Sheets
- Works with mixed ingestion sources (GBP + manual + email + OCR)
- No schema changes required
