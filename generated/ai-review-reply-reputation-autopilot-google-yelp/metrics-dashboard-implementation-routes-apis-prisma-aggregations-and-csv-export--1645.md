# Metrics Dashboard Implementation (Routes, APIs, Prisma Aggregations, and CSV Export) — Ready-to-Ship Code Plan + Copy/Paste Snippets

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T17:13:16.770Z

---

# Overview
This artifact contains the concrete implementation plan and copy/paste-friendly code skeletons for the new metrics dashboard.

**Goal:** Add `/app/admin/metrics` plus two endpoints:
- `GET /api/admin/metrics` → JSON metrics for UI
- `GET /api/admin/metrics.csv` → flattened rows for exports/debugging

It uses existing tables: `Review`, `DraftReply`, `AlertEvent`, `AuditLog`, `Location`, `WeeklyReport` and respects `UserBusinessMembership` RBAC.

---

# 1) Route Structure

## UI page
- `app/app/admin/metrics/page.tsx`
  - Server component
  - Reads `searchParams`: `businessId`, `locationId?`, `start`, `end`, `tz`
  - Calls internal fetch to `/api/admin/metrics?...` (or invokes a shared server helper)
  - Renders sections:
    1) Sync Health (per location)
    2) Funnel (counts + conversion)
    3) Response Time (p50/p90 + avg)
    4) Ratings Trend (daily avg rating)
    5) Negative Share + Top Themes
    6) Alerts (counts by type + recent list)
  - Includes CSV export link pointing to `/api/admin/metrics.csv?...`

## Endpoints
- `app/api/admin/metrics/route.ts`
- `app/api/admin/metrics.csv/route.ts`

---

# 2) KPI Definitions (Must Match Weekly Report)

**Time window:** `[start, end]` in the business timezone. For DB queries, convert to UTC boundaries.

**Review ingested:** A `Review.createdAt` (when we stored it) falls in range.

**Drafted:** A `DraftReply.createdAt` falls in range AND `DraftReply.reviewId` belongs to a Review in scope.

**Approved:** `DraftReply.approvedAt` within range.

**Posted:** `DraftReply.postedAt` within range (includes `posted_manual` and any future API-posted statuses).

**Response time:** For posted replies only:
- `responseTimeHours = postedAt - Review.reviewCreatedAt` if present; else `postedAt - Review.createdAt`
- Exclude rejected and never-posted drafts.

**Negative share:** `Review.sentiment = 'negative' OR Review.rating <= 2` divided by all reviews in window.

**Top themes:** count of `Review.categoryLabels[]` (service/price/staff/etc.) for reviews in window; show top 5.

**Sync health:** per `Location`:
- `Location.lastGbpReviewSyncAt`, `Location.lastGbpReviewSyncUpdateTime`, last error from most recent `AuditLog` or Integration status (existing health endpoint logic can be reused).

---

# 3) Shared Query Input Validation (Zod)

```ts
import { z } from "zod";

export const MetricsQuerySchema = z.object({
  businessId: z.string().uuid(),
  locationId: z.string().uuid().optional(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  tz: z.string().min(1).default("UTC"),
});
```

Also validate that `end >= start` and enforce a max range (e.g., 180 days) to prevent full-table scans.

---

# 4) RBAC Helper

Ensure user is a member of the business.

```ts
async function assertBusinessAccess(userId: string, businessId: string, prisma: PrismaClient) {
  const member = await prisma.userBusinessMembership.findFirst({
    where: { userId, businessId },
    select: { id: true, role: true },
  });
  if (!member) throw new Error("forbidden");
  return member;
}
```

---

# 5) /api/admin/metrics JSON Shape

Return a stable contract the UI can render.

```ts
type MetricsResponse = {
  window: { start: string; end: string; tz: string };
  scope: { businessId: string; locationId?: string };
  funnel: {
    ingested: number;
    drafted: number;
    approved: number;
    posted: number;
    conversion: {
      draftedPerIngested: number; // 0-1
      approvedPerDrafted: number;
      postedPerApproved: number;
    };
  };
  responseTime: {
    count: number;
    avgHours: number | null;
    p50Hours: number | null;
    p90Hours: number | null;
  };
  ratings: {
    avgRating: number | null;
    trend: Array<{ day: string; avgRating: number; count: number }>; // day=YYYY-MM-DD
  };
  sentiment: {
    negativeShare: number;
    bySentiment: { positive: number; neutral: number; negative: number };
  };
  themes: Array<{ label: string; count: number }>;
  alerts: {
    total: number;
    byType: Array<{ type: string; count: number }>;
    recent: Array<{ id: string; type: string; createdAt: string; locationName?: string; reviewId?: string; message?: string }>;
  };
  syncHealth: Array<{ locationId: string; locationName: string; source: "google" | "yelp" | "manual"; lastSyncAt: string | null; lastError: string | null }>;
};
```

---

# 6) Prisma Aggregations (Core Snippets)

## Scope filter

```ts
const reviewWhere: Prisma.ReviewWhereInput = {
  businessId,
  ...(locationId ? { locationId } : {}),
  createdAt: { gte: startUtc, lte: endUtc },
};
```

## Funnel counts

```ts
const ingested = await prisma.review.count({ where: reviewWhere });

const reviewIds = await prisma.review.findMany({
  where: reviewWhere,
  select: { id: true },
});
const ids = reviewIds.map(r => r.id);

const drafted = await prisma.draftReply.count({
  where: { businessId, reviewId: { in: ids }, createdAt: { gte: startUtc, lte: endUtc } },
});

const approved = await prisma.draftReply.count({
  where: { businessId, reviewId: { in: ids }, approvedAt: { gte: startUtc, lte: endUtc } },
});

const posted = await prisma.draftReply.count({
  where: { businessId, reviewId: { in: ids }, postedAt: { gte: startUtc, lte: endUtc } },
});
```

## Response time (p50/p90)
Fetch posted drafts in range and compute in JS to avoid DB-specific percentile functions.

```ts
const postedDrafts = await prisma.draftReply.findMany({
  where: {
    businessId,
    reviewId: { in: ids },
    postedAt: { gte: startUtc, lte: endUtc },
  },
  select: {
    postedAt: true,
    review: { select: { createdAt: true, reviewCreatedAt: true } },
  },
});

const hours = postedDrafts
  .map(d => {
    const base = d.review.reviewCreatedAt ?? d.review.createdAt;
    return (d.postedAt!.getTime() - base.getTime()) / 36e5;
  })
  .filter(v => Number.isFinite(v) && v >= 0)
  .sort((a,b)=>a-b);

function percentile(arr:number[], p:number){
  if (!arr.length) return null;
  const idx = Math.floor((arr.length - 1) * p);
  return arr[idx];
}

const avgHours = hours.length ? hours.reduce((a,b)=>a+b,0)/hours.length : null;
const p50Hours = percentile(hours, 0.5);
const p90Hours = percentile(hours, 0.9);
```

## Ratings trend (daily)

```ts
const daily = await prisma.review.groupBy({
  by: ["day"], // if you don’t have a day column, use raw SQL below
  where: reviewWhere,
  _avg: { rating: true },
  _count: { _all: true },
});
```

If no computed `day` column exists, use `$queryRaw`:

```ts
const trend = await prisma.$queryRaw<Array<{ day: string; avg: number; count: number }>>`
  SELECT to_char(date_trunc('day', "createdAt"), 'YYYY-MM-DD') AS day,
         AVG("rating")::float AS avg,
         COUNT(*)::int AS count
  FROM "Review"
  WHERE "businessId" = ${businessId}
    AND (${locationId ?? null}::uuid IS NULL OR "locationId" = ${locationId})
    AND "createdAt" >= ${startUtc} AND "createdAt" <= ${endUtc}
  GROUP BY 1
  ORDER BY 1 ASC;
`;
```

## Sentiment + themes

```ts
const bySentiment = await prisma.review.groupBy({
  by: ["sentiment"],
  where: reviewWhere,
  _count: { _all: true },
});

// themes: if categoryLabels is a string[] column (Postgres array), use raw SQL unnest
const themes = await prisma.$queryRaw<Array<{ label: string; count: number }>>`
  SELECT label, COUNT(*)::int AS count
  FROM (
    SELECT unnest("categoryLabels") AS label
    FROM "Review"
    WHERE "businessId" = ${businessId}
      AND (${locationId ?? null}::uuid IS NULL OR "locationId" = ${locationId})
      AND "createdAt" >= ${startUtc} AND "createdAt" <= ${endUtc}
  ) t
  GROUP BY label
  ORDER BY count DESC
  LIMIT 5;
`;
```

## Alerts

```ts
const alertsTotal = await prisma.alertEvent.count({
  where: { businessId, createdAt: { gte: startUtc, lte: endUtc }, ...(locationId ? { locationId } : {}) },
});

const alertsByType = await prisma.alertEvent.groupBy({
  by: ["type"],
  where: { businessId, createdAt: { gte: startUtc, lte: endUtc }, ...(locationId ? { locationId } : {}) },
  _count: { _all: true },
});

const alertsRecent = await prisma.alertEvent.findMany({
  where: { businessId },
  orderBy: { createdAt: "desc" },
  take: 10,
  select: { id: true, type: true, createdAt: true, message: true, reviewId: true, location: { select: { name: true } } },
});
```

---

# 7) CSV Export Format

Export columns (one row per review; if multiple drafts exist, pick latest draft):
- reviewId, source, locationName, rating, sentiment, categories, reviewCreatedAt, ingestedAt
- draftStatus (none/drafted/approved/posted/rejected)
- draftedAt, approvedAt, postedAt
- responseTimeHours
- authorName (if stored), reviewUrl (if stored)

Implementation approach:
- Query reviews in range
- For each review, join latest DraftReply (`orderBy createdAt desc take 1`)
- Stream CSV response

---

# 8) UI Copy (In-app)

**Metrics header:**
“Reputation Metrics”

**Subheader:**
“Track review volume, response speed, and issues across locations. Export CSV for reconciliation.”

**Sync Health note:**
“If a location stops syncing, you’ll see the last successful sync time and the most recent error.”

---

# 9) Pilot Run Checklist (for non-test GBP)
1) Invite owner via magic link; confirm they can access `/app/admin/metrics`.
2) Connect Google integration; select locations.
3) Run `/api/cron/sync` manually once; verify new reviews appear.
4) Confirm negative review triggers alert email.
5) Approve 1 draft and mark posted (manual) to validate response-time metrics.
6) Generate weekly report and confirm KPI alignment with dashboard.

This completes the MVP workflow with visibility: ingestion → draft → approval → posting → alerts → weekly reporting, plus a dashboard to monitor reliability and outcomes.
