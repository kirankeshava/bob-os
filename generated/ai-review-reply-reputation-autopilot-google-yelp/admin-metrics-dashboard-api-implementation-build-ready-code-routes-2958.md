# Admin Metrics Dashboard + API Implementation (build-ready code & routes)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:49:11.824Z

---

Below is a build-ready implementation outline (routes + core queries) for the Metrics Dashboard shipped this cycle. It is designed to drop into the existing Next.js (App Router) + Prisma stack already in the repo.

---
## 1) Routes added

### UI
- `app/app/admin/metrics/page.tsx`
  - Server component; reads query params: `from`, `to`, `locationId`, `source`
  - Calls internal fetch to `/api/admin/metrics` (or directly imports query fn on server)
  - Renders sections:
    1) **Sync Health** (per location: lastSyncAt, lastError, consecutiveFailures)
    2) **Activation Funnel** (counts + conversion rates)
    3) **Response Time** (p50/p90, avg, % within SLA)
    4) **Ratings & Sentiment Mix** (avg rating, negative share)
    5) **Top Themes** (category labels from tagging)
    6) **Alerts** (count by type + last 10 events)
  - Empty states include CTA links to connect Google (`/app/integrations/google/connect`) and import (`/app/reviews/import`).

### APIs
- `app/api/admin/metrics/route.ts`
  - `GET` returns JSON for the dashboard
- `app/api/admin/metrics.csv/route.ts`
  - `GET` returns `text/csv` daily rollups

All endpoints enforce RBAC: user must be a `UserBusinessMembership` for the requested `businessId` (derived from session) or admin role.

---
## 2) Query params + validation (shared)

```ts
import { z } from "zod";

export const MetricsQuerySchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  locationId: z.string().uuid().optional(),
  source: z.enum(["google","yelp","manual","email","ocr"]).optional(),
});

export type MetricsQuery = z.infer<typeof MetricsQuerySchema>;
```
Defaults:
- `to = now`
- `from = now - 30 days`

---
## 3) KPI definitions (used consistently)

**Ingested**: `Review.createdAt` in range (and matches filters).

**Drafted**: review has at least one `DraftReply` created in range OR linked to an ingested review in range (we chose: `DraftReply.createdAt` in range for time series; plus a "total drafted for ingested reviews" card).

**Approved**: `DraftReply.approvedAt != null` (and approvedAt in range).

**Posted**: manual posting recorded by either:
- `DraftReply.status == 'posted_manual'` with `postedAt != null` in range, OR
- an `AuditLog` event `draft.posted_manual` in range.

**Response time**:
- `postedAt - approvedAt` (first approval to first post), excluding rejected and never-posted.
- Also compute `timeToFirstDraft = draft.createdAt - review.createdAt` (optional diagnostic).

**Negative share**:
- `sentiment == 'negative' OR rating <= 2` divided by total.

---
## 4) Core Prisma aggregations (server-side)

```ts
import { prisma } from "@/lib/prisma";

function buildReviewWhere({ from, to, locationId, source }: { from: Date; to: Date; locationId?: string; source?: string }) {
  return {
    createdAt: { gte: from, lte: to },
    ...(locationId ? { locationId } : {}),
    ...(source ? { source } : {}),
  };
}

export async function getMetrics(businessId: string, q: { from: Date; to: Date; locationId?: string; source?: string }) {
  const reviewWhere = {
    businessId,
    ...buildReviewWhere(q),
  };

  const [
    ingestedCount,
    ratingAgg,
    sentimentCounts,
    themeCounts,
    funnelDrafted,
    funnelApproved,
    funnelPosted,
    alertsByType,
    recentAlerts,
    locationHealth,
    responseTimes,
  ] = await Promise.all([
    prisma.review.count({ where: reviewWhere }),

    prisma.review.aggregate({
      where: reviewWhere,
      _avg: { rating: true },
      _count: { _all: true },
    }),

    prisma.review.groupBy({
      by: ["sentiment"],
      where: reviewWhere,
      _count: { _all: true },
    }),

    prisma.reviewTag.groupBy({
      // If tags are stored as a separate table; otherwise do JSON aggregation by raw SQL.
      by: ["label"],
      where: { review: reviewWhere },
      _count: { _all: true },
      orderBy: { _count: { _all: "desc" } },
      take: 10,
    }).catch(() => [] as any[]),

    prisma.draftReply.count({
      where: {
        review: { businessId, ...(q.locationId ? { locationId: q.locationId } : {}), ...(q.source ? { source: q.source } : {}) },
        createdAt: { gte: q.from, lte: q.to },
      },
    }),

    prisma.draftReply.count({
      where: {
        review: { businessId, ...(q.locationId ? { locationId: q.locationId } : {}), ...(q.source ? { source: q.source } : {}) },
        approvedAt: { not: null },
        approvedAt: { gte: q.from, lte: q.to },
      },
    }),

    prisma.draftReply.count({
      where: {
        review: { businessId, ...(q.locationId ? { locationId: q.locationId } : {}), ...(q.source ? { source: q.source } : {}) },
        status: "posted_manual",
        postedAt: { gte: q.from, lte: q.to },
      },
    }),

    prisma.alertEvent.groupBy({
      by: ["type"],
      where: {
        businessId,
        createdAt: { gte: q.from, lte: q.to },
        ...(q.locationId ? { locationId: q.locationId } : {}),
      },
      _count: { _all: true },
    }),

    prisma.alertEvent.findMany({
      where: {
        businessId,
        createdAt: { gte: q.from, lte: q.to },
        ...(q.locationId ? { locationId: q.locationId } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),

    prisma.location.findMany({
      where: { businessId, ...(q.locationId ? { id: q.locationId } : {}) },
      select: {
        id: true,
        name: true,
        lastGbpSyncAt: true,
        lastGbpSyncError: true,
        gbpConsecutiveSyncFailures: true,
        lastGbpReviewSyncUpdateTime: true,
      },
      orderBy: { name: "asc" },
    }),

    prisma.draftReply.findMany({
      where: {
        review: { businessId, ...(q.locationId ? { locationId: q.locationId } : {}), ...(q.source ? { source: q.source } : {}) },
        approvedAt: { not: null },
        postedAt: { not: null },
        approvedAt: { gte: q.from, lte: q.to },
      },
      select: { approvedAt: true, postedAt: true },
      take: 5000,
    }),
  ]);

  // Compute response time stats
  const deltasMinutes = responseTimes
    .map(r => (r.postedAt!.getTime() - r.approvedAt!.getTime()) / 60000)
    .filter(v => v >= 0 && v < 60 * 24 * 30);
  deltasMinutes.sort((a,b)=>a-b);
  const p50 = deltasMinutes.length ? deltasMinutes[Math.floor(deltasMinutes.length*0.5)] : null;
  const p90 = deltasMinutes.length ? deltasMinutes[Math.floor(deltasMinutes.length*0.9)] : null;
  const avg = deltasMinutes.length ? deltasMinutes.reduce((a,b)=>a+b,0)/deltasMinutes.length : null;

  const negativeCount = await prisma.review.count({
    where: {
      ...reviewWhere,
      OR: [{ sentiment: "negative" }, { rating: { lte: 2 } }],
    },
  });

  return {
    range: { from: q.from.toISOString(), to: q.to.toISOString() },
    funnel: {
      ingested: ingestedCount,
      drafted: funnelDrafted,
      approved: funnelApproved,
      posted: funnelPosted,
    },
    ratings: {
      avgRating: ratingAgg._avg.rating ?? null,
      negativeShare: ingestedCount ? negativeCount / ingestedCount : null,
      sentimentCounts,
    },
    responseTime: { p50Minutes: p50, p90Minutes: p90, avgMinutes: avg },
    topThemes: themeCounts,
    alerts: { byType: alertsByType, recent: recentAlerts },
    syncHealth: locationHealth,
  };
}
```

---
## 5) CSV export shape

Daily rollup rows:
- date (YYYY-MM-DD)
- locationId, locationName
- source
- ingestedCount
- draftedCount
- approvedCount
- postedCount
- avgRating
- negativeCount
- negativeShare
- p50ResponseMinutes

Implementation: generate dates between `from` and `to`, group by day with `createdAt`/`approvedAt`/`postedAt` buckets. For speed, this can use raw SQL (`date_trunc('day', ...)`) and return rows.

---
## 6) Pilot checklist (next action)

1) Connect a non-test GBP to ensure real-world permissions/scopes.
2) Enable 2+ locations; trigger `/api/cron/sync` 3–5 times across the day.
3) Confirm:
   - no duplicate reviews (upsert by gbpReviewId)
   - edited review updates propagate (updateTime watermark)
   - sync failures create AlertEvents and appear in Sync Health
4) Validate metrics:
   - ingested increments after sync
   - drafted/approved/posted counts match actions
   - response time values look reasonable

---
If you want, I can also produce the customer-facing onboarding email + quick-start steps that link to the live site (https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1) and support inbox (agent_bob_replit+review-bot@agentmail.to).