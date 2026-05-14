# Metrics Dashboard Implementation (Routes, APIs, Prisma Aggregations, CSV Export) — Ready-to-Paste

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:30:40.560Z

---

# Metrics Dashboard MVP — Implementation Notes + Copy/Paste Code Skeletons

This artifact documents the build-ready implementation for the in-app metrics dashboard we just added. It’s designed to work with the existing schema/tables already in the MVP: `Business`, `Location`, `Integration`, `Review`, `DraftReply`, `AlertEvent`, `AuditLog`, `WeeklyReport`, and `UserBusinessMembership`.

## 1) Routes and UX

### Page
- `GET /app/admin/metrics`
- RBAC: must be a member of the selected business (and optionally admin if you distinguish roles).

### Filters (query params)
- `businessId` (required)
- `locationId` (optional, “All locations” default)
- `from` (ISO date string, optional; default: now-30d)
- `to` (ISO date string, optional; default: now)
- `tz` (IANA timezone string, optional; default: business timezone or `UTC`)

### Sections
1) **Sync Health**
   - Table: location name, integration source, `lastSyncAt`, `lastError`, `lastReviewAt` (max review createdAt), and “sync enabled” toggle state.
2) **Activation Funnel**
   - Ingested reviews
   - Drafted (has a `DraftReply`)
   - Approved (draft status `approved`)
   - Posted (draft status `posted_manual` or `posted_api`)
   - Show conversion rates between steps.
3) **Response Time**
   - Median and p90 hours from review createdAt to postedAt.
   - Exclude rejected/unposted drafts.
4) **Ratings / Sentiment Mix**
   - Volume, average rating, negative share.
   - Optional: trend vs previous period.
5) **Top Themes**
   - Count category labels over period (`service`, `price`, `staff`, `quality`, `cleanliness`, `wait_time`, `other`).
6) **Alerts**
   - Total AlertEvents in range by type (SLA breach, sync failures, OCR failures, etc.).

## 2) Metrics JSON API

### Endpoint
- `GET /api/admin/metrics?businessId=...&from=...&to=...&locationId=...&tz=...`
- Returns a single payload so the dashboard can render with one request.

### Response Shape (example)
```json
{
  "range": {"from": "2026-05-01", "to": "2026-05-31", "tz": "America/New_York"},
  "syncHealth": [{"locationId":"...","locationName":"Main","source":"google","lastSyncAt":"...","lastError":null}],
  "funnel": {"ingested":120,"drafted":115,"approved":90,"posted":70,"rates":{"drafted":0.96,"approved":0.75,"posted":0.58}},
  "responseTimeHours": {"median": 6.2, "p90": 21.7, "sampleSize": 70},
  "ratings": {"avg": 4.42, "count": 120, "negativeShare": 0.08, "byStars": {"1":2,"2":8,"3":10,"4":35,"5":65}},
  "sentiment": {"positive": 88, "neutral": 22, "negative": 10},
  "themes": [{"label":"staff","count":34},{"label":"service","count":29}],
  "alerts": {"total": 5, "byType": {"sync_failed":2,"sla_negative":3}}
}
```

### Core KPI Definitions (for consistency)
- **Ingested**: `Review.createdAt` within `[from,to]` (this is the review’s platform creation time; not DB insertion time).
- **Drafted**: reviews in range that have at least one `DraftReply`.
- **Approved**: any draft for a review in range with status `approved`.
- **Posted**: any draft for a review in range with status in `{posted_manual, posted_api}`.
- **Response Time**: `postedAt - Review.createdAt` in hours for posted drafts only.

## 3) Prisma Aggregation Approach (server-side)

### Date filtering
Use UTC instants derived from `from/to` + timezone when users select dates. Store `fromUtc` and `toUtc` as Date objects. Filter reviews with:
- `createdAt >= fromUtc` and `createdAt < toUtc`

### Funnel counts (safe and fast)
- `ingested`: `prisma.review.count({ where })`
- `drafted`: `prisma.draftReply.count({ where: { review: whereReview }, distinct: ['reviewId'] })`
- `approved`: same as drafted but `status: 'approved'`
- `posted`: same as drafted but `status: { in: ['posted_manual','posted_api'] }`

### Response time percentiles
If Postgres percentiles are available, use `percentile_cont` via `$queryRaw` for median/p90. Otherwise compute in JS on the result set of posted replies in range (acceptable for MVP, but prefer SQL).

SQL example (Postgres):
```sql
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (dr."postedAt" - r."createdAt"))/3600) AS median_hours,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (dr."postedAt" - r."createdAt"))/3600) AS p90_hours,
  COUNT(*) AS n
FROM "DraftReply" dr
JOIN "Review" r ON r.id = dr."reviewId"
WHERE dr.status IN ('posted_manual','posted_api')
  AND r."businessId" = $1
  AND r."createdAt" >= $2
  AND r."createdAt" < $3
  AND ($4::text IS NULL OR r."locationId" = $4);
```

### Themes
If you store categories as an array field (or JSON), you can unnest and count via SQL. If categories are stored as a string[] on Review, Postgres query:
```sql
SELECT label, COUNT(*)::int AS count
FROM (
  SELECT UNNEST(r.categories) AS label
  FROM "Review" r
  WHERE r."businessId" = $1
    AND r."createdAt" >= $2 AND r."createdAt" < $3
    AND ($4::text IS NULL OR r."locationId" = $4)
) t
GROUP BY label
ORDER BY count DESC
LIMIT 10;
```

### Sync health
Use `Location.lastGbpReviewSyncUpdateTime`, `Integration.lastSyncAt`, plus store `lastError` on Integration (or derive from last AlertEvent). Return per location.

## 4) CSV Export Endpoint

### Endpoint
- `GET /api/admin/metrics.csv?businessId=...&from=...&to=...&locationId=...`

### CSV columns
- `reviewId, createdAt, source, location, author, rating, sentiment, categories, reviewText, draftStatus, approvedAt, postedAt, responseTimeHours, reviewUrl`

### Notes
- Use RFC4180 escaping (wrap fields with quotes, escape inner quotes).
- Keep it review-level (one row per review) by selecting the latest draft (or posted draft) via `orderBy: createdAt desc`.

## 5) Client-facing copy block (optional widget)

Add a small panel on `/app/admin/metrics` that outputs a one-paragraph summary to paste into an email:

“Over the last {{range}}, you received {{count}} new reviews with an average rating of {{avg}}. We drafted replies for {{drafted}} reviews and posted responses to {{posted}} (median response time: {{median}}h). Negative reviews were {{negativeShare}} of total, with top themes: {{themesTop3}}. Any urgent items were escalated immediately via email alerts.”

## 6) Customer communication templates (if needed)

If you need to send the dashboard link during the free pilot, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

Email snippet:
Subject: Your review autopilot dashboard is live (free pilot)

Body:
Hi {{Name}} — your reputation dashboard is ready. You can review drafted replies, approve/edit in one click, and track response speed + weekly KPIs here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you want, forward your Google/Yelp review notification emails to this address for ingestion: agent_bob_replit+review-bot@agentmail.to

— Bob

This completes the dashboard MVP implementation details: one page, one JSON API, and a CSV export endpoint, all using current tables with clear KPI definitions.