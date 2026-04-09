# MVP Metrics Dashboard — Build-Ready API Contract + Aggregation Plan (Next.js + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:54:05.830Z

---

# MVP Metrics Dashboard (Sync Health + Funnel + Alerts)

This document is a build-ready implementation plan for adding an in-app metrics dashboard at **/app/admin/metrics** with two supporting endpoints:

- **GET /api/admin/metrics** → JSON for UI
- **GET /api/admin/metrics.csv** → CSV export for debugging/customer support

It assumes the existing schema described in prior cycles: `Business`, `Location`, `Integration`, `Review`, `DraftReply`, `AlertEvent`, `WeeklyReport`, `AuditLog`, `UserBusinessMembership`.

---

## 1) Scope and Goals

**Goal:** Give operators (and eventually customers) immediate visibility into:

1) **Sync Health** (GBP/Yelp/manual ingestion reliability)
2) **Activation Funnel** (ingested → drafted → approved → posted)
3) **Operational Alerts** (negative review SLA, sync failures, OCR failures)

Constraints:
- No new paid services.
- Use only existing DB tables.
- Keep UI simple (tables + a few trend lines).

---

## 2) Permissions / RBAC

All endpoints/pages require:

- Logged-in user
- Membership: `UserBusinessMembership` must contain `(userId, businessId)`
- If you already have `role` (admin/member), restrict metrics to `admin` initially.

Implementation detail:
- In each API route, resolve `businessId` from query and verify membership.
- Return 403 if not authorized.

---

## 3) API: GET /api/admin/metrics

### Query params

- `businessId` (required)
- `start` (optional, ISO date) default: now - 30 days
- `end` (optional, ISO date) default: now
- `locationId` (optional) if provided, filter to a single location
- `source` (optional) enum: `google | yelp | manual | email | ocr | all` default: all

### Response shape (JSON)

```json
{
  "range": {"start": "2026-03-10", "end": "2026-04-09"},
  "filters": {"locationId": null, "source": "all"},
  "syncHealth": {
    "locations": [
      {
        "locationId": "loc_123",
        "name": "Downtown",
        "source": "google",
        "enabled": true,
        "lastSyncAt": "2026-04-09T02:10:22Z",
        "lastSyncStatus": "ok",
        "lastError": null,
        "newReviewsInRange": 12
      }
    ],
    "totals": {"locationsEnabled": 3, "locationsWithErrors": 1}
  },
  "funnel": {
    "counts": {
      "ingested": 120,
      "drafted": 110,
      "approved": 90,
      "posted": 72,
      "rejected": 6,
      "needsAttention": 22
    },
    "rates": {"draftRate": 0.92, "approveRate": 0.82, "postRate": 0.80},
    "sla": {
      "negativeReviews": 14,
      "negativeRespondedWithinHours": 8,
      "negativeSlaHours": 24,
      "negativeSlaHitRate": 0.57,
      "medianResponseHours": 9.4,
      "p90ResponseHours": 28.2
    }
  },
  "ratings": {
    "avgRating": 4.31,
    "avgRatingPrevPeriod": 4.22,
    "trendByWeek": [
      {"weekStart": "2026-03-10", "avgRating": 4.2, "count": 21},
      {"weekStart": "2026-03-17", "avgRating": 4.4, "count": 30}
    ],
    "negativeShare": 0.12
  },
  "themes": {
    "topCategories": [
      {"category": "staff", "count": 33, "share": 0.27},
      {"category": "service", "count": 29, "share": 0.24}
    ],
    "topNegativeCategories": [
      {"category": "wait_time", "count": 6, "share": 0.43}
    ]
  },
  "alerts": {
    "total": 18,
    "byType": [
      {"type": "NEGATIVE_REVIEW", "count": 9},
      {"type": "SYNC_FAILED", "count": 4},
      {"type": "OCR_FAILED", "count": 5}
    ],
    "recent": [
      {"id": "al_1", "type": "NEGATIVE_REVIEW", "createdAt": "2026-04-09T01:02:00Z", "locationId": "loc_123", "reviewId": "rev_9", "status": "open"}
    ]
  }
}
```

---

## 4) API: GET /api/admin/metrics.csv

Exports a **row-per-day** (or row-per-week) timeseries, depending on requested range.

### Columns (daily)

- `date`
- `locationId` (or `all`)
- `source`
- `reviews_ingested`
- `drafts_created`
- `approved`
- `posted`
- `avg_rating`
- `negative_share`
- `median_response_hours`
- `p90_response_hours`
- `alerts_total`

This is primarily for internal debugging and customer success.

---

## 5) KPI Definitions (be consistent everywhere)

### Core objects

- **Review ingested**: `Review.createdAt` within range (or `Review.createdAt` between start/end). If you prefer “review occurred date”, use `Review.reviewCreatedAt` if present; pick one and keep consistent.
- **Drafted**: `DraftReply.createdAt` within range.
- **Approved**: `DraftReply.approvedAt` within range.
- **Posted**: `DraftReply.postedAt` within range OR `DraftReply.status in ('posted_manual','posted_api')` with timestamp.
- **Rejected**: `DraftReply.rejectedAt` within range.

### Response time

Response time is computed on **posted drafts only**:

`responseHours = (DraftReply.postedAt - Review.createdAt)` in hours

Exclude:
- drafts that are rejected
- approved-but-not-posted
- reviews with missing timestamps

### Negative share

Negative = any of:
- `Review.rating <= 2` OR
- `Review.sentiment = 'negative'` (from tagger)

Negative share = negative reviews / total reviews (within range).

### SLA hit rate

Given business/location config: `negativeSlaHours` (default 24)

SLA hit = negative review that has **posted** reply with `responseHours <= negativeSlaHours`.

---

## 6) Aggregations: Prisma/SQL Patterns

### Base filters

Apply to all queries:

- `businessId = ?`
- `createdAt between start/end` (or `reviewCreatedAt`, choose one)
- if `locationId`, add `locationId = ?`
- if `source != all`, add `source = ?`

### Funnel counts (Prisma-style)

- ingested:
  - `prisma.review.count({ where: { businessId, createdAt: { gte: start, lte: end }, ...filters } })`
- drafted:
  - `prisma.draftReply.count({ where: { businessId, createdAt: { gte: start, lte: end }, ...filtersViaReviewJoin } })`

If DraftReply doesn’t store `locationId/source` directly, join through Review:
- `DraftReply` has `reviewId`
- include where: `{ review: { locationId, source } }`

### Response time percentiles

Use raw SQL for median/p90 in Postgres:

```sql
WITH posted AS (
  SELECT
    EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600.0 AS response_hours
  FROM "DraftReply" d
  JOIN "Review" r ON r.id = d."reviewId"
  WHERE d."postedAt" IS NOT NULL
    AND r."businessId" = $1
    AND r."createdAt" >= $2 AND r."createdAt" <= $3
    -- optional filters
)
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY response_hours) AS median,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY response_hours) AS p90
FROM posted;
```

### Weekly rating trend

```sql
SELECT
  date_trunc('week', r."createdAt")::date AS week_start,
  AVG(r.rating)::float AS avg_rating,
  COUNT(*)::int AS count
FROM "Review" r
WHERE r."businessId" = $1
  AND r."createdAt" >= $2 AND r."createdAt" <= $3
GROUP BY 1
ORDER BY 1;
```

### Theme counts

Assuming `Review.categoryLabels` is an array or a join table. If array text[]:

```sql
SELECT label, COUNT(*)::int AS count
FROM (
  SELECT unnest(r."categoryLabels") AS label
  FROM "Review" r
  WHERE r."businessId" = $1
    AND r."createdAt" >= $2 AND r."createdAt" <= $3
) t
GROUP BY label
ORDER BY count DESC
LIMIT 10;
```

For **topNegativeCategories**, add negative filter (`rating<=2 OR sentiment='negative'`).

### Sync health per location

Use `Location.lastSyncAt`, `Location.lastError`, `Location.syncEnabled` (or equivalent from earlier cycles). Add `newReviewsInRange` via review count per location.

---

## 7) UI Plan: /app/admin/metrics

### Layout (single page)

1) **Filters bar**
   - Date range picker (Last 7/30/90 + custom)
   - Location dropdown (All + each location)
   - Source dropdown (All, Google, Yelp, Email, OCR, Manual)
   - Button: “Export CSV” → hits `/api/admin/metrics.csv?...`

2) **Sync Health table**
   - Location, Source, Enabled, Last Sync, Status, Last Error, New Reviews (range)

3) **Funnel cards**
   - Ingested, Drafted, Approved, Posted, Needs attention

4) **SLA section**
   - Negative reviews, SLA hit rate, median + p90 response hours

5) **Ratings trend**
   - Small weekly chart (can be a simple SVG/HTML table initially)

6) **Themes**
   - Top categories and top negative categories tables

7) **Alerts**
   - Count by type + recent alerts list (last 20)

---

## 8) Instrumentation (minimal)

Add an `AuditLog` event when:
- Metrics endpoint called (optional; can be noisy)
- CSV export called

Log the query filters and runtime duration (ms) using existing structured logs.

---

## 9) Implementation Notes / Edge Cases

- If a business has zero posted replies, response-time percentiles are null.
- For small sample sizes, p90 may equal max; that’s fine.
- Use location timezone only for display; compute by UTC timestamps for now.
- Keep definitions consistent with weekly report KPIs to avoid customer confusion.

---

## 10) Customer-facing language (optional for later)

When you later expose this dashboard to customers, describe the product as:

“AI Review Reply & Reputation Autopilot — drafts and helps you post brand-safe replies to Google/Yelp reviews, escalates urgent negatives, and emails weekly KPI reports.”

Legitimacy link to share in onboarding emails and templates:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

(If you have a support email already, add it to the footer of the dashboard + reports for trust.)
