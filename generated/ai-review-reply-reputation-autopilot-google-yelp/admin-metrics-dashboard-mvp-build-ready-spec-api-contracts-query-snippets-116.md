# Admin Metrics Dashboard (MVP) — Build-Ready Spec + API Contracts + Query Snippets

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T02:23:04.505Z

---

## Goal
Ship **/app/admin/metrics** to let a business owner/admin quickly verify the system is working: reviews are syncing/ingesting, drafts are generated, approvals happen, replies get posted (manual or API), and negative reviews trigger alerts—without checking logs.

This dashboard must be **fast to build**, using existing tables:
- Review, DraftReply, Location, Integration
- AlertEvent, WeeklyReport, AuditLog

The dashboard should support:
- Date range filter (default: last 30 days)
- Location filter (All + per-location)
- Export CSV for debugging/ops

Website to reference in any “help” links: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

## Route + API Structure
### UI Route
- **GET /app/admin/metrics**
  - Server component page
  - Renders summary cards + tables
  - Calls internal API via server action or direct Prisma queries (either is fine; simplest is direct Prisma on server component)

### API Endpoints (recommended for reuse + CSV)
1) **GET /api/admin/metrics?businessId=...&start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=...**
- Returns JSON for all panels in one payload.
- RBAC: only UserBusinessMembership members.
- Validate query params with Zod.

2) **GET /api/admin/metrics.csv?businessId=...&start=...&end=...&locationId=...&type=funnel|alerts|reviews|sync**
- CSV export for ops/debugging.
- Same RBAC + validation.

---

## KPI Definitions (be explicit to avoid disputes)
### Review lifecycle
- **Ingested**: Review.createdAt within range (or reviewDate if you store both; use Review.createdAt as canonical ingestion timestamp for ops).
- **Drafted**: Review that has at least one DraftReply created within range.
- **Approved**: DraftReply.status transitioned to APPROVED within range (or DraftReply.approvedAt if present).
- **Posted**: DraftReply.status in {POSTED_MANUAL, POSTED_API} with postedAt within range.

### Response time
- Response time is computed only for posted replies:
  - postedAt - Review.reviewCreatedAt (preferred) else postedAt - Review.createdAt
- Exclude rejected drafts and reviews never posted.

### Negative share
- % of ingested reviews that are negative by either:
  - sentiment = negative OR rating <= 2

### SLA compliance (MVP)
- “Negative response SLA”: negative review posted within X hours (configurable per business or location).
- For MVP, show count of negative reviews not yet posted within SLA.

---

## UI Layout (MVP)
### Header
- Title: “Metrics”
- Filters:
  - Date range (start/end)
  - Location dropdown
  - Button: “Export CSV” (dropdown types)

### Panel 1 — Sync Health
Table columns:
- Location
- Source (Google / Yelp / Manual / Email / OCR)
- Last sync time (Location.lastGbpSyncAt or Integration.lastSyncAt)
- Last sync status (OK / Error)
- Last error message (truncate to 120 chars)
- Reviews ingested (range)

UI helper text:
- “If a location hasn’t synced recently, reviews may not be ingested. Use manual import (CSV/email/OCR) as a fallback.”

### Panel 2 — Activation Funnel (range)
Cards (big numbers):
- Ingested reviews
- Drafts generated
- Approved
- Posted
- Draft-to-post conversion (%)

Table breakdown (optional in MVP):
- By location: ingested, drafted, posted, negative share

### Panel 3 — Reputation KPIs (range)
Cards:
- Average rating (mean of ratings ingested in range)
- Rating trend vs previous period (delta)
- Negative share
- Median response time (posted)

### Panel 4 — Alerts & Escalations
Cards:
- Alerts created
- Alerts acknowledged
- Open alerts

Table columns:
- CreatedAt
- Severity
- Type (NEGATIVE_REVIEW, SYNC_FAILURE, OCR_FAILURE, etc.)
- Location
- Review link (if available)
- Status (OPEN/ACK/CLOSED)

### Panel 5 — Top Themes
Show top 5 categories (service/price/staff/quality/cleanliness/wait_time/other) for negative + all.
- Simple bar list: Theme + count + %

---

## Data Queries (Prisma-first; raw SQL where necessary)
Assumptions:
- Review has: id, businessId, locationId, source, rating, sentiment, categories (array), createdAt, reviewCreatedAt(optional), rawPayload
- DraftReply has: id, reviewId, businessId, locationId, status, createdAt, approvedAt(optional), postedAt(optional)
- AlertEvent has: id, businessId, locationId, type, severity, status, createdAt
- Location has: id, businessId, name, lastGbpReviewSyncUpdateTime, lastSyncAt(optional), lastSyncError(optional)

### 1) Funnel counts
Prisma-ish approach:
- ingested = count Reviews where businessId and createdAt between
- drafted = count distinct reviewId from DraftReply where createdAt between (or join to reviews in range if you want strict)
- approved = count DraftReply where approvedAt between OR AuditLog event=APPROVE within range
- posted = count DraftReply where postedAt between AND status in posted statuses

Recommended: compute posted using DraftReply.postedAt + status.

Raw SQL (Postgres) snippet for distinct drafted:
```sql
SELECT COUNT(DISTINCT dr."reviewId")
FROM "DraftReply" dr
JOIN "Review" r ON r.id = dr."reviewId"
WHERE r."businessId" = $1
  AND r."createdAt" BETWEEN $2 AND $3
  AND ($4::uuid IS NULL OR r."locationId" = $4);
```

### 2) Response time
```sql
SELECT
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY (dr."postedAt" - COALESCE(r."reviewCreatedAt", r."createdAt"))) AS median_response_interval,
  AVG(dr."postedAt" - COALESCE(r."reviewCreatedAt", r."createdAt")) AS avg_response_interval
FROM "DraftReply" dr
JOIN "Review" r ON r.id = dr."reviewId"
WHERE r."businessId" = $1
  AND dr."status" IN ('POSTED_MANUAL','POSTED_API')
  AND dr."postedAt" BETWEEN $2 AND $3
  AND ($4::uuid IS NULL OR r."locationId" = $4);
```

### 3) Rating average + trend
Compute current period avg and previous period avg:
- prevStart = start - (end-start)
- prevEnd = start

```sql
SELECT AVG(rating) FROM "Review"
WHERE "businessId"=$1 AND "createdAt" BETWEEN $2 AND $3;
```
Delta = current - previous.

### 4) Negative share
Negative if sentiment='negative' OR rating <=2.
```sql
SELECT
  SUM(CASE WHEN ("sentiment"='negative' OR "rating" <= 2) THEN 1 ELSE 0 END)::float / NULLIF(COUNT(*),0) AS negative_share
FROM "Review"
WHERE "businessId"=$1 AND "createdAt" BETWEEN $2 AND $3
  AND ($4::uuid IS NULL OR "locationId" = $4);
```

### 5) Top themes
If categories stored as text[]:
```sql
SELECT c AS category, COUNT(*)
FROM "Review" r, UNNEST(r."categories") c
WHERE r."businessId"=$1 AND r."createdAt" BETWEEN $2 AND $3
  AND ($4::uuid IS NULL OR r."locationId"=$4)
GROUP BY c
ORDER BY COUNT(*) DESC
LIMIT 10;
```
Optionally compute separately for negative subset.

### 6) Sync health
For Google-enabled locations:
- Use Location.lastGbpReviewSyncUpdateTime + Location.updatedAt or a dedicated lastSyncAt.
If not present, surface Integration.lastSyncAt.

Minimum viable table query:
- Locations for business
- For each location: lastSyncAt (nullable), lastSyncError (nullable)
- Reviews ingested in range per location

---

## JSON Response Shape (GET /api/admin/metrics)
```json
{
  "range": {"start":"2026-03-10","end":"2026-04-09"},
  "filters": {"locationId": null},
  "syncHealth": [
    {
      "locationId":"...",
      "locationName":"Main St",
      "source":"google",
      "lastSyncAt":"2026-04-09T10:00:00Z",
      "lastError":null,
      "ingestedCount":42
    }
  ],
  "funnel": {
    "ingested": 120,
    "drafted": 110,
    "approved": 95,
    "posted": 80,
    "draftToPostRate": 0.727
  },
  "reputation": {
    "avgRating": 4.42,
    "avgRatingPrev": 4.31,
    "avgRatingDelta": 0.11,
    "negativeShare": 0.08,
    "medianResponseHours": 6.5
  },
  "alerts": {
    "created": 12,
    "open": 3,
    "acknowledged": 7,
    "closed": 2,
    "items": [
      {"id":"...","type":"NEGATIVE_REVIEW","severity":"high","status":"open","createdAt":"...","locationName":"Main St","reviewId":"..."}
    ]
  },
  "themes": {
    "all": [{"category":"service","count":30}],
    "negative": [{"category":"staff","count":4}]
  }
}
```

---

## Copy (ready to paste into UI)
- Empty state (no data):
  - “No activity found in this date range. If you’re just getting started, connect Google Business Profile or import reviews via CSV, email forwarding, or screenshot OCR.”
  - “Need help? Share your setup details at: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

- Sync warning banner:
  - “Some locations haven’t synced recently. Reviews may be missing. Consider running a manual import or checking integration permissions.”

---

## Acceptance Criteria (done means MVP-shippable)
1) /app/admin/metrics loads for a business member and renders all panels in <2s for 10k reviews.
2) Date + location filters affect all numbers consistently.
3) CSV exports work and include headers, UTF-8, safe escaping.
4) No new services required; uses existing DB + Sentry logs already integrated.

---

## Implementation Notes (fast path)
- Prefer server component + direct Prisma for initial version; add /api/admin/metrics only if you want client-side charts.
- Use a lightweight chart approach (or none): numbers + tables are acceptable for MVP.
- Reuse existing RBAC helper (membership check). Add a single guard at the page and API level.
