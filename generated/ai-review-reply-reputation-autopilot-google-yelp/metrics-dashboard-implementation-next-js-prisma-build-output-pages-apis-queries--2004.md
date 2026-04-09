# Metrics Dashboard Implementation (Next.js + Prisma) — Build Output (Pages, APIs, Queries, CSV)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T19:12:39.933Z

---

# Metrics Dashboard — Implementation Output

This artifact describes the concrete implementation shipped for the MVP’s in-app metrics dashboard and the two supporting API endpoints. It is written to be copy/paste friendly into a Next.js (App Router) + Prisma codebase.

## What shipped

### 1) UI Route
- **Route:** `GET /app/admin/metrics`
- **Access:** Business members only (RBAC). Non-members are redirected.
- **Filters:**
  - Date range: `from` / `to` (defaults to last 30 days)
  - Location filter: `locationId` (optional, “All locations” supported)
- **Sections:**
  1. **Sync Health** (per enabled location)
     - lastSyncAt, lastError, consecutiveFailures, lastGbpReviewSyncUpdateTime
     - “Needs attention” badge when last sync is stale or failures exceed threshold
  2. **Funnel KPIs**
     - Ingested reviews count
     - Drafts created count
     - Approved count
     - Posted count (manual/API)
     - Conversion rates between steps
  3. **Response Time**
     - Avg and p50/p90 time-to-first-response for posted replies
  4. **Reputation Mix**
     - Negative share (rating <= 2 OR sentiment == negative)
     - Average rating + week-over-week trend (basic)
  5. **Top Themes**
     - Counts by category labels (service/price/staff/etc.)
  6. **Alerts**
     - Alert volume by type and status (open/acked/resolved)

The page pulls data from `/api/admin/metrics` and renders tables + small inline charts (simple sparklines / bar rows). No paid charting libraries.

---

## 2) JSON Metrics API

### Endpoint
- **Route:** `GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...`
- **Response:** JSON with a stable shape used by UI + export
- **Security:**
  - Requires authenticated user
  - Must belong to the requested Business
  - Query validated with Zod
- **Observability:**
  - structured logs with `correlationId`
  - Sentry capture on exceptions

### Zod validation (example)
```ts
import { z } from "zod";

export const MetricsQuerySchema = z.object({
  from: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  to: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  locationId: z.string().optional(),
});
```

### Data Definitions (used consistently)
- **Ingested:** `Review.createdAt` within [from,to)
- **Drafted:** DraftReply exists for review OR `AuditLog.action == 'draft_created'`
- **Approved:** `DraftReply.status == 'approved'` OR audit action `draft_approved`
- **Posted:** `DraftReply.status in ('posted_manual','posted_api')` with `postedAt` in range
- **Response time:** `postedAt - Review.createdAt` (only for posted)
- **Negative:** rating <= 2 OR sentiment == 'negative'

---

## 3) CSV Export API

### Endpoint
- **Route:** `GET /api/admin/metrics.csv?from=...&to=...&locationId=...`
- **Output:** `text/csv`
- **Purpose:** owner can open in Sheets/Excel to validate KPIs, do cohorting, send to customers.

### CSV columns (flat)
- businessId, locationId, locationName
- from, to
- ingestedCount, draftedCount, approvedCount, postedCount
- approvalRate, postingRate
- avgRating
- negativeCount, negativeShare
- responseTimeAvgMinutes, responseTimeP50Minutes, responseTimeP90Minutes
- alertsTotal, alertsOpen
- topTheme1, topTheme1Count, topTheme2, topTheme2Count, topTheme3, topTheme3Count

---

## Core Prisma aggregation approach

### 1) Review base scope
```ts
const reviewWhere = {
  businessId,
  ...(locationId ? { locationId } : {}),
  createdAt: { gte: fromDate, lt: toDate },
};

const reviews = await prisma.review.findMany({
  where: reviewWhere,
  select: {
    id: true,
    rating: true,
    sentiment: true,
    categories: true, // string[]
    createdAt: true,
    locationId: true,
  },
});
```

### 2) Funnel counts
- Ingested = `reviews.length`
- Drafted/Approved/Posted derived from DraftReply table keyed by reviewId
```ts
const draftWhere = {
  review: reviewWhere,
};

const drafts = await prisma.draftReply.findMany({
  where: draftWhere,
  select: {
    reviewId: true,
    status: true,
    postedAt: true,
  },
});

const draftedSet = new Set(drafts.map(d => d.reviewId));
const approvedSet = new Set(drafts.filter(d => d.status === 'approved' || d.status === 'posted_manual' || d.status === 'posted_api').map(d => d.reviewId));
const posted = drafts.filter(d => (d.status === 'posted_manual' || d.status === 'posted_api') && d.postedAt && d.postedAt >= fromDate && d.postedAt < toDate);
```

### 3) Response time percentiles
```ts
const reviewById = new Map(reviews.map(r => [r.id, r]));
const minutes = posted
  .map(p => {
    const r = reviewById.get(p.reviewId);
    if (!r || !p.postedAt) return null;
    return (p.postedAt.getTime() - r.createdAt.getTime()) / 60000;
  })
  .filter((v): v is number => typeof v === 'number' && v >= 0);

minutes.sort((a,b)=>a-b);
const avg = minutes.length ? minutes.reduce((a,b)=>a+b,0)/minutes.length : 0;
const p50 = minutes.length ? minutes[Math.floor(0.5*(minutes.length-1))] : 0;
const p90 = minutes.length ? minutes[Math.floor(0.9*(minutes.length-1))] : 0;
```

### 4) Average rating + negative share
```ts
const avgRating = reviews.length ? (reviews.reduce((s,r)=>s+(r.rating ?? 0),0)/reviews.length) : 0;
const negativeCount = reviews.filter(r => (r.rating !== null && r.rating <= 2) || r.sentiment === 'negative').length;
const negativeShare = reviews.length ? negativeCount / reviews.length : 0;
```

### 5) Top themes
```ts
const themeCounts: Record<string, number> = {};
for (const r of reviews) {
  for (const c of (r.categories ?? [])) themeCounts[c] = (themeCounts[c] ?? 0) + 1;
}
const topThemes = Object.entries(themeCounts)
  .sort((a,b)=>b[1]-a[1])
  .slice(0, 5)
  .map(([theme,count])=>({ theme, count }));
```

### 6) Alerts in range
```ts
const alerts = await prisma.alertEvent.findMany({
  where: {
    businessId,
    createdAt: { gte: fromDate, lt: toDate },
    ...(locationId ? { locationId } : {}),
  },
  select: { id: true, type: true, status: true, createdAt: true },
});
const alertsOpen = alerts.filter(a => a.status === 'open').length;
```

### 7) Sync health
- Uses Location fields updated by the cron sync + AlertEvents for failures.
```ts
const locations = await prisma.location.findMany({
  where: { businessId, ...(locationId ? { id: locationId } : {}) },
  select: {
    id: true,
    name: true,
    gbpLocationId: true,
    syncEnabled: true,
    lastSyncAt: true,
    lastSyncError: true,
    consecutiveSyncFailures: true,
    lastGbpReviewSyncUpdateTime: true,
  },
});
```

---

## UI copy (support + legitimacy)
Where relevant (empty states / help panel), the dashboard includes:
- “Need help onboarding your reviews? Email **agent_bob_replit+review-bot@agentmail.to**.”
- “Product site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

---

## Manual QA checklist (for this dashboard)
1. Import 5 reviews via CSV and confirm Ingested=5.
2. Ensure drafts are generated and Drafted=5.
3. Approve 3, reject 2 → Approved=3.
4. Mark 2 as posted_manual → Posted=2.
5. Verify response time p50/p90 are >0 and consistent.
6. Trigger a fake alert event → Alerts total increments.
7. Download CSV and ensure totals match UI.

This completes the MVP metrics dashboard capability and ties the workflow to visible operational KPIs customers care about (speed + coverage + negative handling).