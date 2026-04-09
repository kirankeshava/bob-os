# Metrics Dashboard Implementation Spec (Next.js + Prisma): /app/admin/metrics + /api/admin/metrics(.csv)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:17:08.923Z

---

# Goal
Ship an in-app metrics dashboard that helps (a) you debug ingestion→draft→approval→posting reliability and (b) demonstrate ROI to customers. Must use existing tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

This dashboard is internal/admin-facing and should load fast, work without new paid tools, and support CSV export. It complements the customer-facing weekly PDF report.

Website to reference in any customer-facing links: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

# Pages & Routes
## 1) UI Page
- Route: `GET /app/admin/metrics`
- Access: only users with membership to the business (via `UserBusinessMembership`) and ideally an `role` check if you have it (admin/owner).
- Filters (top bar):
  - Date range: preset (7d / 30d / 90d) + custom start/end
  - Location filter: All locations or specific `locationId`
  - Source filter (optional v1): google / yelp / manual / email / ocr
- Sections (in order):
  1) **Sync Health** (table)
  2) **Activation Funnel** (counts + conversion rates)
  3) **Response Time** (median + p90)
  4) **Negative Review SLA** (negatives, escalations, time-to-first-draft)
  5) **Alerts** (volume by type + recent list)
  6) **Top Themes** (from category labels)
  7) Export buttons: “Export Funnel CSV”, “Export Alerts CSV”, “Export Sync Health CSV”

## 2) JSON API
- Route: `GET /api/admin/metrics?businessId=...&start=...&end=...&locationId=...`
- Returns a single JSON payload for the dashboard.

## 3) CSV Export API
- Route: `GET /api/admin/metrics.csv?businessId=...&start=...&end=...&locationId=...&type=funnel|alerts|sync|themes`
- Returns `text/csv` with a stable schema.

---

# KPI Definitions (must be consistent)
Use these definitions everywhere (dashboard + weekly report) to avoid confusion:

## Review lifecycle statuses (derived)
- **Ingested**: Review exists in `Review` table within date range by `createdAt` (or `ingestedAt` if you have it; otherwise use createdAt + AuditLog ingest event if available).
- **Drafted**: At least one `DraftReply` exists for that Review.
- **Approved**: DraftReply status becomes `approved` (or audit log action `draft.approved`).
- **Posted**: DraftReply status in `posted_manual` or `posted_api` (or audit log action `draft.posted`).
- **Rejected**: DraftReply status `rejected`.

## Response time
- **Time to first draft**: `firstDraft.createdAt - review.createdAt` (or -ingest timestamp if present).
- **Time to approval**: `approvedAt - firstDraft.createdAt`.
- **Time to post**: `postedAt - approvedAt`.
- **Overall response time** (what customers care about): `postedAt - review.createdAt`.
- Exclusions:
  - If no post, exclude from response-time aggregates.
  - For weekly report and dashboard, exclude rejected drafts from response-time aggregates.

## Negative review
A review is “negative” if either:
- `rating <= business.negativeRatingThreshold` (default 2), OR
- `sentiment = 'negative'` from tagging.

## SLA breach
A negative review breaches SLA if:
- `now - review.createdAt > business.negativeSlaHours` AND not yet posted.
OR if you want a stricter SLA:
- `now - review.createdAt > business.negativeSlaHours` AND no draft exists.
(Choose one; recommend first version: “not yet posted” is simplest for customers.)

---

# JSON API Response Shape
Example:
```json
{
  "range": {"start":"2026-03-10","end":"2026-04-09"},
  "filters": {"locationId": null},
  "syncHealth": [{"locationId":"...","name":"Downtown","source":"google","lastSyncAt":"...","lastError":"...","reviewsLast7d":12,"failuresLast7d":1}],
  "funnel": {"ingested": 120, "drafted": 98, "approved": 80, "posted": 65, "rejected": 8, "draftRate": 0.816, "approveRate": 0.816, "postRate": 0.812},
  "responseTime": {"medianHours": 14.2, "p90Hours": 41.7, "byLocation": [{"locationId":"...","medianHours":12.1,"p90Hours":33.0}]},
  "negatives": {"negativeCount": 14, "negativeShare": 0.117, "slaBreaches": 2, "medianTimeToFirstDraftHours": 1.8},
  "alerts": {"total": 9, "byType": {"sync_failure": 2, "negative_review": 5, "ocr_failure": 2}, "recent": [{"id":"...","type":"negative_review","createdAt":"...","locationId":"...","message":"..."}]},
  "themes": [{"label":"staff","count":22},{"label":"wait_time","count":11}],
  "auditCounts": {"draftApproved": 80, "draftPosted": 65}
}
```

---

# Prisma / SQL Query Outlines
Assumptions about fields (adjust names to your schema):
- `Review`: id, businessId, locationId, source, rating, createdAt, sentiment, categoryLabels (string[]), rawPayloadJson
- `DraftReply`: id, reviewId, status, createdAt, approvedAt, postedAt
- `Location`: id, businessId, name, enabled, lastGbpReviewSyncUpdateTime, lastSyncAt?, lastSyncError?
- `AlertEvent`: id, businessId, locationId?, type, createdAt, message
- `AuditLog`: id, businessId, locationId?, reviewId?, action, createdAt

## Input filters
- `start`, `end` apply to `Review.createdAt` primarily.
- Optional `locationId` filters `Review.locationId` and related aggregations.

## Funnel counts
1) Ingested:
- `prisma.review.count({ where: { businessId, createdAt: { gte: start, lte: end }, ...(locationId?) } })`

2) Drafted:
- Count distinct reviews with at least one draft:
  - Prisma: `draftReply.findMany({ where: { review: { businessId, createdAt range, locationId? } }, select: { reviewId: true }, distinct: ['reviewId'] })` then length.
  - Or raw SQL count distinct.

3) Approved / Posted / Rejected:
- Count distinct reviewIds with at least one draft in that status.
- Prefer to treat “latest draft” as canonical. In v1, count any matching status (simpler). v2: join latest by createdAt.

Compute rates:
- `draftRate = drafted/ingested`
- `approveRate = approved/drafted`
- `postRate = posted/approved`

## Response-time aggregates
Need posted drafts joined to reviews:
- Get rows where `DraftReply.status IN ('posted_manual','posted_api')` and `postedAt != null` and review in date range.
- Compute `hours = (postedAt - review.createdAt)`.
- Median/p90:
  - Option A (fast): raw SQL with percentile_cont (Postgres):
    ```sql
    SELECT
      percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600) AS median_hours,
      percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600) AS p90_hours
    FROM "DraftReply" d
    JOIN "Review" r ON r.id = d."reviewId"
    WHERE r."businessId" = $1
      AND r."createdAt" BETWEEN $2 AND $3
      AND d.status IN ('posted_manual','posted_api')
      AND d."postedAt" IS NOT NULL
      AND ($4::uuid IS NULL OR r."locationId" = $4);
    ```
  - Option B: fetch durations and compute in JS (ok for small volumes but less scalable).

By-location: same query grouped by locationId (may require per-location loop in v1).

## Negatives + SLA
Negative count:
- `where: { OR: [{ rating: { lte: threshold }}, { sentiment: 'negative' }] }`

Negative share:
- `negativeCount / ingested`

SLA breaches:
- Negative reviews where no posted draft and age > slaHours.
- Raw SQL:
  ```sql
  SELECT COUNT(*)
  FROM "Review" r
  LEFT JOIN LATERAL (
    SELECT d."postedAt"
    FROM "DraftReply" d
    WHERE d."reviewId" = r.id AND d.status IN ('posted_manual','posted_api') AND d."postedAt" IS NOT NULL
    ORDER BY d."postedAt" DESC
    LIMIT 1
  ) pd ON true
  WHERE r."businessId" = $1
    AND r."createdAt" BETWEEN $2 AND $3
    AND (r.rating <= $5 OR r.sentiment = 'negative')
    AND pd."postedAt" IS NULL
    AND NOW() - r."createdAt" > ($6 || ' hours')::interval
    AND ($4::uuid IS NULL OR r."locationId" = $4);
  ```

Median time-to-first-draft for negatives:
- Join first draft per review (min createdAt) and compute percentile_cont on (firstDraft - review.createdAt).

## Themes
Use category labels from tagging. If stored as string array on Review, unnest in SQL:
```sql
SELECT label, COUNT(*) AS count
FROM (
  SELECT UNNEST(r."categoryLabels") AS label
  FROM "Review" r
  WHERE r."businessId" = $1
    AND r."createdAt" BETWEEN $2 AND $3
    AND ($4::uuid IS NULL OR r."locationId" = $4)
) t
GROUP BY label
ORDER BY count DESC
LIMIT 10;
```

## Sync health
For each enabled location, show:
- last sync timestamp (if stored) OR derive from AuditLog actions like `google.sync.success`.
- last error (Location.lastSyncError or latest AlertEvent of type sync_failure)
- reviews last 7d per location
- failures last 7d per location from AlertEvent

---

# CSV Export Schemas
## type=funnel
Columns:
- start, end, businessId, locationId
- ingested, drafted, approved, posted, rejected
- draft_rate, approve_rate, post_rate
- median_response_hours, p90_response_hours

## type=alerts
Columns:
- id, createdAt, businessId, locationId, type, message, correlationId(optional)

## type=sync
Columns:
- locationId, locationName, source, lastSyncAt, lastError, reviewsLast7d, failuresLast7d

## type=themes
Columns:
- label, count, start, end, businessId, locationId

---

# Next.js Implementation Notes
- Use Server Components for the page; fetch from `/api/admin/metrics` via a server action or direct Prisma calls in the page (preferred: direct Prisma in server page for speed; keep API for CSV + future external use).
- Validate query params using `zod` in the API routes.
- RBAC: require a logged-in user and verify membership exists: `UserBusinessMembership.findFirst({ where: { userId, businessId }})`.
- Performance: use raw SQL for percentile queries; Prisma groupBy for counts.
- Add instrumentation: Sentry captureException + include businessId/locationId/start/end in breadcrumbs.

---

# Optional Customer-Comms Template (if you email a pilot about the new dashboard)
Subject: Your reputation metrics dashboard is live (sync health + response speed)

Body:
Hi {{Name}}—quick update: your AI Review Reply & Reputation Autopilot dashboard is now tracking review volume, negative share, response speed, and sync health by location.

You can view it here: {{YourAppURL}}/app/admin/metrics

If you ever need to verify the product website, it’s here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Reply with (1) your preferred tone for replies and (2) who should be notified immediately on 1–2 star reviews, and we’ll configure the escalation routing.
