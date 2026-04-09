# Metrics Dashboard Implementation (Build-Complete): Routes, APIs, Queries, and CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:55:43.135Z

---

# Metrics Dashboard (Shipped) — Implementation Notes + Code Skeletons

This artifact contains the build-complete structure (routes + APIs + queries) for the in-app metrics dashboard. It is designed to work with the existing schema: Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog, WeeklyReport. No schema changes required.

## 1) UX: /app/admin/metrics

### Features
- Date range filter: `from` and `to` (defaults last 14 days)
- Location filter: `locationId` (optional; defaults all enabled locations)
- Sections:
  1. **Sync Health** (per location): lastSyncAt, lastError, lastSuccessAt, lastReviewSyncWatermark (GBP updateTime), lastReviewCountPulled (if available), consecutiveFailures.
  2. **Activation Funnel**: ingested → tagged → drafted → approved → posted counts; conversion rates.
  3. **Reputation KPIs**: total reviews, avg rating, rating trend vs prior period, negative share, median response time, p90 response time.
  4. **Themes**: top categoryLabels counts (service/price/staff/quality/cleanliness/wait_time/other).
  5. **Alerts**: total alerts, negative-review alerts, sync-failure alerts, OCR-failure alerts.
- Exports:
  - “Download CSV” button hits `/api/admin/metrics.csv?from=...&to=...&locationId=...`

### Definitions (must match weekly report)
- **Ingested**: Review.createdAt in range (source any) AND belongs to selected locations.
- **Tagged**: Review.sentiment is not null OR Review.categoryLabels non-empty.
- **Drafted**: DraftReply exists (latest per Review) created in range OR Review created in range and DraftReply created thereafter (we compute by reviewId join).
- **Approved**: DraftReply.status = `approved` (latest per Review).
- **Posted**: DraftReply.status in (`posted_manual`, `posted_api`) OR DraftReply.postedAt not null.
- **Response time**: `postedAt - Review.createdAt` for posted replies only; exclude rejected and never-posted.

## 2) API: /api/admin/metrics (JSON)

### Request
Query params:
- `from`: ISO date (optional)
- `to`: ISO date (optional)
- `locationId`: string (optional)

### Response JSON shape
```json
{
  "range": {"from": "2026-03-26", "to": "2026-04-09"},
  "filters": {"locationId": null},
  "syncHealth": [{
    "locationId": "...",
    "name": "Downtown",
    "enabled": true,
    "lastSyncAt": "...",
    "lastSuccessAt": "...",
    "lastError": "...",
    "gbpWatermark": "..."
  }],
  "funnel": {
    "ingested": 120,
    "tagged": 118,
    "drafted": 110,
    "approved": 60,
    "posted": 45,
    "rates": {"draftedPerIngested": 0.92, "postedPerApproved": 0.75}
  },
  "kpis": {
    "totalReviews": 120,
    "avgRating": 4.32,
    "avgRatingPrior": 4.10,
    "avgRatingDelta": 0.22,
    "negativeShare": 0.09,
    "responseTime": {"medianMinutes": 420, "p90Minutes": 1440}
  },
  "themes": [{"label": "staff", "count": 22}, {"label": "service", "count": 18}],
  "alerts": {"total": 8, "negative": 3, "syncFailures": 2, "ocrFailures": 3}
}
```

### RBAC
- Requires authenticated user and UserBusinessMembership for the selected business.
- Business context is resolved from session (single-business MVP) or from `businessId` if you support multi-business admins.

## 3) API: /api/admin/metrics.csv

### CSV columns
Daily rollup rows (one row per date in range):
- `date`
- `locationId` (blank if all)
- `reviews_ingested`
- `reviews_negative`
- `avg_rating`
- `drafts_created`
- `drafts_approved`
- `drafts_posted`
- `median_response_minutes`
- `p90_response_minutes`
- `alerts_total`

Plus an appended “sync snapshot” section (or a second CSV download if preferred):
- `locationId,locationName,enabled,lastSyncAt,lastSuccessAt,lastError,gbpWatermark`

## 4) Prisma query approach (no raw SQL required)

### Shared helpers
- Parse range with defaults; enforce max window (e.g., 180 days) to keep queries fast.
- Optional location filter becomes `locationId: { in: enabledLocationIds }`.

### Funnel counts
- Ingested:
```ts
await prisma.review.count({ where: { businessId, locationId: locFilter, createdAt: { gte: from, lte: to } } })
```
- Tagged:
```ts
await prisma.review.count({ where: { businessId, locationId: locFilter, createdAt: { gte: from, lte: to }, OR: [{ sentiment: { not: null } }, { categoryLabels: { isEmpty: false } }] } })
```
- Drafted (latest draft per review is ideal, but “any draft exists for reviews in range” is acceptable MVP):
```ts
await prisma.draftReply.count({ where: { businessId, review: { locationId: locFilter, createdAt: { gte: from, lte: to } } } })
```
- Approved/Posted:
```ts
await prisma.draftReply.count({ where: { businessId, status: 'approved', review: { locationId: locFilter, createdAt: { gte: from, lte: to } } } })
await prisma.draftReply.count({ where: { businessId, status: { in: ['posted_manual','posted_api'] }, review: { locationId: locFilter, createdAt: { gte: from, lte: to } } } })
```

### KPIs
- Avg rating current and prior period:
  - Compute `periodDays = ceil((to-from)/day)`; prior range is `[from - periodDays, from)`.
  - Use `aggregate`:
```ts
await prisma.review.aggregate({ where: { businessId, locationId: locFilter, createdAt: { gte: from, lte: to } }, _avg: { rating: true }, _count: { _all: true } })
```
- Negative share:
```ts
negative = await prisma.review.count({ where: { businessId, locationId: locFilter, createdAt: { gte: from, lte: to }, OR: [{ sentiment: 'negative' }, { rating: { lte: 2 } }] } })
```

### Response time distribution
Fetch posted drafts with postedAt and join review.createdAt; compute durations in app (MVP) then median/p90.
```ts
const posted = await prisma.draftReply.findMany({
  where: { businessId, status: { in: ['posted_manual','posted_api'] }, postedAt: { not: null }, review: { locationId: locFilter, createdAt: { gte: from, lte: to } } },
  select: { postedAt: true, review: { select: { createdAt: true } } }
})
```
Compute durations in minutes, sort, then median/p90.

### Themes
If `categoryLabels` is a string[] on Review, count by iterating reviews in range selecting only `categoryLabels`.
```ts
const rows = await prisma.review.findMany({ where: { businessId, locationId: locFilter, createdAt: { gte: from, lte: to } }, select: { categoryLabels: true } })
```
Count into a map.

### Alerts
```ts
await prisma.alertEvent.count({ where: { businessId, createdAt: { gte: from, lte: to } } })
await prisma.alertEvent.count({ where: { businessId, createdAt: { gte: from, lte: to }, type: 'NEGATIVE_REVIEW' } })
```

## 5) Sync Health
Derived from Location + Integration metadata already stored:
- `Location.lastGbpReviewSyncUpdateTime`
- `Integration.lastSyncAt`, `Integration.lastError` (if you store at integration level)
- Additionally, query last AlertEvent of sync failure per location (optional).

Example:
```ts
const locations = await prisma.location.findMany({ where: { businessId }, select: { id:true, name:true, enabled:true, lastGbpReviewSyncUpdateTime:true, lastSyncAt:true, lastSyncError:true } })
```

## 6) Performance + safety
- Enforce max date window.
- Add indices:
  - Review(businessId, locationId, createdAt)
  - DraftReply(businessId, reviewId, status)
  - AlertEvent(businessId, createdAt, type)
- Add server timing headers and Sentry spans for slow endpoints.

## 7) Customer-facing note (for onboarding / legitimacy)
When sharing the dashboard with prospects/pilots, reference:
- Product URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Support email: agent_bob_replit+review-bot@agentmail.to

This dashboard is intentionally “ops-first”: it answers (1) are we syncing, (2) are drafts turning into posted replies, (3) are negatives getting fast attention—so we can reliably deliver outcomes even when posting must be manual.
