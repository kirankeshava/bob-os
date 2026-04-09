# Metrics Dashboard Implementation (Routes, API Contracts, Queries, CSV) — Ready-to-Paste

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T15:45:24.763Z

---

# Metrics Dashboard MVP — Implementation Notes (Next.js App Router + Prisma)

## Goal
Add a lightweight, RBAC-protected metrics dashboard for each business showing:
- **Sync health** (per location)
- **Activation funnel** (Ingested → Drafted → Approved → Posted)
- **Response time KPIs** (median + p90, posted only)
- **Negative share** (rating<=2 OR sentiment=negative)
- **Alerts volume** (SLA escalations)
- **Top themes** (category tags)

No new infrastructure or paid services. Use existing tables: `Review`, `DraftReply`, `Location`, `AuditLog`, `AlertEvent`.

---

## Routes
### UI
- `GET /app/admin/metrics`
  - Server component page
  - Filters: `from`, `to`, `locationId` (optional), `source` (optional)
  - Sections: Sync Health table, KPI tiles, funnel table, themes table, alerts table

### APIs
- `GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...&source=google|yelp|manual`
  - Returns JSON payload used by dashboard

- `GET /api/admin/metrics.csv?from=...&to=...&locationId=...&source=...`
  - Exports CSV (event-style rows)

---

## Access Control (RBAC)
Requirement: user must be authenticated and a member of the business.
- Determine `businessId` from session context (or active business selector).
- Confirm `UserBusinessMembership` exists for `(userId, businessId)`.
- If not, return `403`.

This is applied in both `/api/admin/metrics` and `/api/admin/metrics.csv`, and the `/app/admin/metrics` page redirects if unauthorized.

---

## KPI Definitions (must match weekly report)
- **Ingested**: reviews createdAt within range (`Review.createdAt`)
- **Drafted**: reviews that have at least 1 `DraftReply` created within range OR draft exists for a review in range (use draft.createdAt filter for “work done”)
- **Approved**: `DraftReply.status='approved'` and `approvedAt` in range
- **Posted**: `DraftReply.status in ('posted_manual','posted_api')` and `postedAt` in range
- **Response time**: `postedAt - review.createdAt` for posted only; exclude rejected/unposted
- **Negative review**: `Review.rating <= 2 OR Review.sentiment='negative'`
- **Themes**: frequency of `Review.categories[]` (e.g., service, price, staff, quality, cleanliness, wait_time, other)

---

## API Contract
### GET /api/admin/metrics response
```json
{
  "range": {"from":"2026-04-01","to":"2026-04-08"},
  "filters": {"locationId": null, "source": null},
  "syncHealth": [
    {"locationId":"...","locationName":"Downtown","source":"google","enabled":true,"lastSyncAt":"...","lastError":"...","lastReviewSyncUpdateTime":"...","reviews30d":42}
  ],
  "kpis": {
    "ingested": 120,
    "drafted": 95,
    "approved": 70,
    "posted": 55,
    "avgRating": 4.62,
    "negativeShare": 0.083,
    "medianResponseHours": 12.4,
    "p90ResponseHours": 38.1
  },
  "funnelByDay": [
    {"day":"2026-04-01","ingested":10,"drafted":8,"approved":5,"posted":4}
  ],
  "topThemes": [
    {"theme":"service","count":31},
    {"theme":"staff","count":18}
  ],
  "alerts": {
    "total": 6,
    "byType": [{"type":"negative_review","count":5},{"type":"sync_failed","count":1}],
    "recent": [
      {"id":"...","type":"negative_review","createdAt":"...","locationName":"Downtown","reviewId":"...","status":"sent"}
    ]
  }
}
```

---

## Prisma Query Strategy (fast + simple)
### Shared where clause
- time window: `from <= createdAt < toPlusOne`
- optional: `locationId`
- optional: `source`

### Ingested
```ts
const ingested = await prisma.review.count({ where: reviewWhere });
```

### Drafted / Approved / Posted
```ts
const drafted = await prisma.draftReply.count({ where: draftWhere });
const approved = await prisma.draftReply.count({ where: { ...draftWhere, status: 'approved', approvedAt: { gte: from, lt: to } } });
const posted = await prisma.draftReply.count({ where: { ...draftWhere, status: { in: ['posted_manual','posted_api'] }, postedAt: { gte: from, lt: to } } });
```
Note: `draftWhere` should include `businessId` and optional `locationId`, and join via review relation or denormalized locationId if present.

### Response time distribution
Fetch posted replies (bounded) and compute in JS to avoid DB-specific percentile complexity:
```ts
const postedRows = await prisma.draftReply.findMany({
  where: { ...postedWhere },
  select: { postedAt: true, review: { select: { createdAt: true } } }
});
const hours = postedRows
  .filter(r => r.postedAt && r.review?.createdAt)
  .map(r => (r.postedAt!.getTime() - r.review.createdAt.getTime()) / 36e5)
  .filter(h => h >= 0 && isFinite(h));
// median + p90 helpers
```
Keep it safe for MVP by limiting range to <= 92 days (validate) to avoid heavy loads.

### Avg rating + negative share
```ts
const ratingAgg = await prisma.review.aggregate({
  where: reviewWhere,
  _avg: { rating: true },
  _count: { _all: true }
});
const negativeCount = await prisma.review.count({
  where: { ...reviewWhere, OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }] }
});
```

### Themes
If categories stored as string[] on Review, do a simple fetch/select then count in JS:
```ts
const cats = await prisma.review.findMany({ where: reviewWhere, select: { categories: true } });
const freq = new Map<string, number>();
for (const r of cats) for (const c of (r.categories ?? [])) freq.set(c, (freq.get(c) ?? 0) + 1);
```
Return top 8.

### Funnel by day
For MVP, compute buckets in JS by fetching day keys:
- Reviews: group by createdAt day for ingested
- DraftReplies: group by createdAt/approvedAt/postedAt day
If Postgres grouping is preferred, use `date_trunc('day', ...)` via `prisma.$queryRaw`.

---

## CSV Export Format
`/api/admin/metrics.csv` returns rows like:
- `type=review_ingested` with review fields
- `type=draft_created`, `draft_approved`, `draft_posted`
- `type=alert_event`

Columns:
- `type, occurredAt, locationName, source, reviewId, draftId, rating, sentiment, categories, status, details`

This keeps the export “tidy” and easy to pivot in Sheets.

---

## UI Structure (no chart libs)
`/app/admin/metrics` sections:
1. **Filter bar**: date range, location dropdown, source dropdown, export CSV link
2. **KPI tiles**: ingested/drafted/approved/posted, avgRating, negativeShare, median response hours
3. **Funnel table**: day rows with counts + simple ASCII/width bars using CSS
4. **Sync health table**: each location row with lastSyncAt, lastError, reviews30d
5. **Themes**: top themes list with counts
6. **Alerts**: total + recent list

---

## Instrumentation
Add structured logs for both endpoints:
- `businessId`, `userId`, `from`, `to`, `locationId`, `source`, `durationMs`
Capture errors to Sentry with tags: `feature=metrics`, `endpoint=/api/admin/metrics`.

---

## Customer-facing references (for any future outreach email)
If sending a “metrics snapshot” or onboarding email, include:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

This keeps communications consistent and credibility high.
