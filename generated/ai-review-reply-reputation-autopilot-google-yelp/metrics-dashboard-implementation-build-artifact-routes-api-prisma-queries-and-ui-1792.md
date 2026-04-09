# Metrics Dashboard Implementation (Build Artifact): Routes, API, Prisma Queries, and UI Copy

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T18:10:17.750Z

---

Below is the concrete implementation artifact for the /app/admin/metrics dashboard and supporting APIs. It is written to be copy/paste-ready into a Next.js App Router + Prisma codebase, matching the existing schema concepts (Business/Location/Review/DraftReply/AlertEvent/AuditLog) described in prior cycles.

---
## 1) Routes

### Page
- **/app/admin/metrics**
  - Server component page that loads initial data (default last 30 days) and renders:
    1) Sync Health table (per location)
    2) Funnel KPI cards
    3) Charts/tables for alerts + themes
    4) CSV export button

### APIs
- **GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...**
  - Returns JSON with sections: syncHealth, funnel, kpis, alerts, themes
- **GET /api/admin/metrics.csv?from=...&to=...&locationId=...**
  - Returns CSV export of key rows for debugging (reviews + draft status + timestamps)

---
## 2) Access Control & Validation

- Require authenticated user.
- Resolve the user’s permitted **businessId** via UserBusinessMembership.
- Validate query params:
  - `from` and `to` required, ISO date only.
  - Maximum range = 365 days.
  - Optional `locationId` must belong to the same business.

Pseudo (server util):

```ts
export function parseMetricsQuery(searchParams: URLSearchParams) {
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const locationId = searchParams.get('locationId');
  if (!from || !to) throw new Error('from/to required');
  const fromDate = new Date(from + 'T00:00:00.000Z');
  const toDate = new Date(to + 'T23:59:59.999Z');
  if (Number.isNaN(+fromDate) || Number.isNaN(+toDate)) throw new Error('invalid dates');
  if (toDate < fromDate) throw new Error('to must be >= from');
  const days = (toDate.getTime() - fromDate.getTime()) / (1000*60*60*24);
  if (days > 366) throw new Error('range too large');
  return { fromDate, toDate, locationId };
}
```

---
## 3) KPI Definitions (Consistency)

Use these definitions everywhere (dashboard + weekly report):

- **Ingested**: Review.createdAt in range (or Review.ingestedAt if you store it; otherwise use createdAt as the event time for “volume”).
- **Drafted**: at least one DraftReply exists for the Review and DraftReply.createdAt in range OR Review.createdAt in range and draft exists now. (Pick one: recommended is DraftReply.createdAt in range for funnel timing, but provide both in CSV.)
- **Approved**: DraftReply.status == 'approved' and approvedAt in range.
- **Posted**: DraftReply.status in ('posted_manual','posted_api') and postedAt in range.
- **Response time**: (postedAt - Review.createdAt) in hours; exclude drafts that were rejected or never posted.
- **Negative**: Review.rating <= 2 OR sentiment == 'negative'.
- **SLA breach**: Negative review where (now - Review.createdAt) > thresholdHours AND not posted.

---
## 4) Prisma Aggregations (Core Queries)

Assumptions:
- Review has: id, businessId, locationId, rating, createdAt, sentiment, categories (string[]), source
- DraftReply has: id, reviewId, status, createdAt, approvedAt, postedAt
- AlertEvent has: id, businessId, locationId, type, createdAt
- Location has: id, name, lastGbpSyncAt, lastGbpSyncError, gbpSyncEnabled, lastGbpReviewSyncUpdateTime

### (A) Base filters

```ts
const reviewWhere = {
  businessId,
  ...(locationId ? { locationId } : {}),
  createdAt: { gte: fromDate, lte: toDate }
};
```

### (B) Funnel counts

```ts
const ingestedCount = await prisma.review.count({ where: reviewWhere });

const draftedCount = await prisma.draftReply.count({
  where: {
    review: { businessId, ...(locationId ? { locationId } : {}), createdAt: { gte: fromDate, lte: toDate } }
  }
});

const approvedCount = await prisma.draftReply.count({
  where: {
    status: 'approved',
    approvedAt: { gte: fromDate, lte: toDate },
    review: { businessId, ...(locationId ? { locationId } : {}) }
  }
});

const postedCount = await prisma.draftReply.count({
  where: {
    status: { in: ['posted_manual','posted_api'] },
    postedAt: { gte: fromDate, lte: toDate },
    review: { businessId, ...(locationId ? { locationId } : {}) }
  }
});
```

### (C) Rating + negative share

```ts
const ratingAgg = await prisma.review.aggregate({
  where: reviewWhere,
  _avg: { rating: true },
  _count: { _all: true }
});

const negativeCount = await prisma.review.count({
  where: {
    ...reviewWhere,
    OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }]
  }
});

const negativeShare = ratingAgg._count._all ? negativeCount / ratingAgg._count._all : 0;
```

### (D) Response time distribution (posted only)

```ts
const postedDrafts = await prisma.draftReply.findMany({
  where: {
    status: { in: ['posted_manual','posted_api'] },
    postedAt: { gte: fromDate, lte: toDate },
    review: { businessId, ...(locationId ? { locationId } : {}) }
  },
  select: {
    postedAt: true,
    review: { select: { createdAt: true, rating: true, sentiment: true } }
  }
});

const responseHours = postedDrafts
  .map(d => (d.postedAt!.getTime() - d.review.createdAt.getTime())/(1000*60*60))
  .filter(h => h >= 0 && h < 24*60);

const avgResponseHours = responseHours.length
  ? responseHours.reduce((a,b)=>a+b,0)/responseHours.length
  : null;
```

### (E) Top themes

```ts
const reviewsWithCats = await prisma.review.findMany({
  where: reviewWhere,
  select: { categories: true }
});
const themeCounts = new Map<string, number>();
for (const r of reviewsWithCats) {
  for (const c of (r.categories ?? [])) {
    themeCounts.set(c, (themeCounts.get(c) ?? 0) + 1);
  }
}
const topThemes = [...themeCounts.entries()]
  .sort((a,b)=>b[1]-a[1])
  .slice(0, 8)
  .map(([theme,count])=>({ theme, count }));
```

### (F) Sync health per location

```ts
const locations = await prisma.location.findMany({
  where: { businessId, ...(locationId ? { id: locationId } : {}) },
  select: {
    id: true,
    name: true,
    gbpSyncEnabled: true,
    lastGbpSyncAt: true,
    lastGbpSyncError: true,
    lastGbpReviewSyncUpdateTime: true
  }
});
```

---
## 5) JSON response shape (API contract)

```json
{
  "range": {"from": "2026-03-01", "to": "2026-03-31"},
  "syncHealth": [{
    "locationId": "...",
    "locationName": "Downtown",
    "enabled": true,
    "lastSyncAt": "2026-03-31T12:01:00Z",
    "lastError": null,
    "watermark": "2026-03-31T11:55:12Z"
  }],
  "funnel": {
    "ingested": 120,
    "drafted": 118,
    "approved": 80,
    "posted": 72,
    "draftRate": 0.983,
    "approvalRate": 0.678,
    "postRate": 0.900
  },
  "kpis": {
    "avgRating": 4.62,
    "negativeShare": 0.07,
    "avgResponseHours": 9.4
  },
  "themes": [{"theme":"staff","count":31}],
  "alerts": {
    "total": 5,
    "byType": [{"type":"negative_review","count":4}]
  }
}
```

---
## 6) CSV Export Columns

CSV should export one row per Review, joined to the latest DraftReply (if any):
- reviewId
- source (google/yelp/manual/ocr)
- locationName
- reviewCreatedAt
- rating
- sentiment
- categories (semicolon separated)
- draftStatus
- draftCreatedAt
- approvedAt
- postedAt
- responseHours

---
## 7) UI Copy (ready to paste)

Page title: **Metrics**

Subtitle: **Track review volume, response performance, and sync health across Google/Yelp/manual imports.**

Cards:
- **Ingested**: “New reviews received in this date range.”
- **Drafted**: “Reviews with an auto-draft generated.”
- **Approved**: “Drafts approved by a human.”
- **Posted**: “Replies marked as posted (manual or API).”

Sync Health empty state:
- “No locations found. Connect Google Business Profile or create a location in Admin → Locations.”

Export button:
- “Export CSV (for debugging / sharing)”

Footer note:
- “Need help onboarding? Email agent_bob_replit+review-bot@agentmail.to or visit https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

---
## 8) Minimal QA Checklist

1) Import a CSV (or OCR) → ensure ingested count increments.
2) Verify drafted increments after tagging/draft job completes.
3) Approve a draft → approved increments + audit log created.
4) Mark posted (manual) → posted increments + responseHours computed.
5) Trigger a negative review → alert event appears in Alerts.
6) Disconnect/force sync error → Sync Health shows lastError.

---
This artifact completes the dashboard build plan plus concrete API contracts, queries, CSV export columns, and user-facing copy. It uses only existing data and free tooling, and is designed to be reliable and debuggable for the first 7-day free pilots.