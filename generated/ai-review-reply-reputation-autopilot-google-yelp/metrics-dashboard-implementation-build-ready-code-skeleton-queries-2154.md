# Metrics Dashboard Implementation (Build-Ready Code Skeleton + Queries)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T19:56:54.108Z

---

# Metrics Dashboard (Next.js App Router) — Build-Ready Implementation

This artifact provides the concrete structure and code skeleton to implement the in-app metrics dashboard at **/app/admin/metrics**, with supporting APIs **/api/admin/metrics** and **/api/admin/metrics.csv**. It is designed to work with the existing Prisma models already in the MVP (Business, Location, Review, DraftReply, AlertEvent, AuditLog) and uses definitions consistent with the weekly KPI report generator.

## 1) Route Structure

- `app/app/admin/metrics/page.tsx` — server component page with filter controls and metric cards/tables
- `app/api/admin/metrics/route.ts` — returns JSON metrics (for UI)
- `app/api/admin/metrics.csv/route.ts` — returns CSV export (for debugging/sharing)

## 2) KPI Definitions (Consistency Rules)

- **Ingested reviews**: count of `Review` created in range (`Review.createdAt`), optionally filtered by `locationId`.
- **Drafted**: count of `DraftReply` created in range (`DraftReply.createdAt`).
- **Approved**: `DraftReply.status in ('approved','posted_manual','posted_api')` OR a dedicated approved status if present.
- **Posted**: `DraftReply.status in ('posted_manual','posted_api')`. Manual posting timestamp comes from `DraftReply.postedAt`.
- **Response time**: computed only for posted drafts: `DraftReply.postedAt - Review.createdAt`. Provide avg + median.
- **Negative share**: percent of reviews where `Review.rating <= 2 OR Review.sentiment='negative'`.
- **Top themes**: `Review.categories[]` (e.g., service/price/staff/cleanliness/wait_time/other), return top counts.
- **Sync health**: per Location: last sync timestamp + last error string (from existing integration health fields), and stale threshold detection.

## 3) API: /api/admin/metrics (JSON)

### Query
- `businessId` (required)
- `start` (optional ISO datetime, default now-30d)
- `end` (optional ISO datetime, default now)
- `locationId` (optional)

### Response Shape
```json
{
  "range": {"start":"...","end":"..."},
  "filters": {"businessId":"...","locationId":null},
  "cards": {
    "ingested": 0,
    "drafted": 0,
    "approved": 0,
    "posted": 0,
    "negativeShare": 0.0,
    "avgResponseHours": 0.0,
    "medianResponseHours": 0.0
  },
  "daily": [{"date":"YYYY-MM-DD","ingested":0,"posted":0,"negative":0}],
  "themes": [{"category":"service","count":0}],
  "alerts": {"total":0,"byType":[{"type":"negative_review","count":0}]},
  "syncHealth": [{"locationId":"...","name":"...","lastSyncAt":"...","stale":false,"lastError":null}]
}
```

### Implementation (route.ts skeleton)

```ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireBusinessMember } from '@/lib/rbac';

const Query = z.object({
  businessId: z.string().min(1),
  locationId: z.string().optional(),
  start: z.string().datetime().optional(),
  end: z.string().datetime().optional()
});

function toDateRange(q: z.infer<typeof Query>) {
  const end = q.end ? new Date(q.end) : new Date();
  const start = q.start ? new Date(q.start) : new Date(Date.now() - 30*24*3600*1000);
  return { start, end };
}

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const q = Query.parse(params);

  await requireBusinessMember(req, q.businessId);

  const { start, end } = toDateRange(q);
  const locationFilter = q.locationId ? { locationId: q.locationId } : {};

  // Reviews ingested
  const ingested = await prisma.review.count({
    where: { businessId: q.businessId, ...locationFilter, createdAt: { gte: start, lte: end } }
  });

  // Drafts created
  const drafted = await prisma.draftReply.count({
    where: { businessId: q.businessId, ...locationFilter, createdAt: { gte: start, lte: end } }
  });

  const approved = await prisma.draftReply.count({
    where: {
      businessId: q.businessId,
      ...locationFilter,
      createdAt: { gte: start, lte: end },
      status: { in: ['approved','posted_manual','posted_api'] }
    }
  });

  const posted = await prisma.draftReply.count({
    where: {
      businessId: q.businessId,
      ...locationFilter,
      postedAt: { gte: start, lte: end },
      status: { in: ['posted_manual','posted_api'] }
    }
  });

  // Response time stats (posted only)
  const postedRows = await prisma.draftReply.findMany({
    where: {
      businessId: q.businessId,
      ...locationFilter,
      postedAt: { not: null, gte: start, lte: end },
      status: { in: ['posted_manual','posted_api'] }
    },
    select: { postedAt: true, review: { select: { createdAt: true } } }
  });

  const responseHours = postedRows
    .map(r => (r.postedAt!.getTime() - r.review.createdAt.getTime()) / 36e5)
    .filter(x => Number.isFinite(x) && x >= 0)
    .sort((a,b) => a-b);

  const avgResponseHours = responseHours.length
    ? responseHours.reduce((a,b)=>a+b,0)/responseHours.length
    : 0;
  const medianResponseHours = responseHours.length
    ? responseHours[Math.floor(responseHours.length/2)]
    : 0;

  const negative = await prisma.review.count({
    where: {
      businessId: q.businessId,
      ...locationFilter,
      createdAt: { gte: start, lte: end },
      OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }]
    }
  });
  const negativeShare = ingested ? negative/ingested : 0;

  // Themes
  const themeRows = await prisma.review.findMany({
    where: { businessId: q.businessId, ...locationFilter, createdAt: { gte: start, lte: end } },
    select: { categories: true }
  });
  const counts: Record<string, number> = {};
  for (const r of themeRows) for (const c of (r.categories ?? [])) counts[c] = (counts[c]||0)+1;
  const themes = Object.entries(counts)
    .map(([category,count])=>({category,count}))
    .sort((a,b)=>b.count-a.count)
    .slice(0,8);

  // Alerts
  const alertTotal = await prisma.alertEvent.count({
    where: { businessId: q.businessId, createdAt: { gte: start, lte: end } }
  });
  const alertByType = await prisma.alertEvent.groupBy({
    by: ['type'],
    where: { businessId: q.businessId, createdAt: { gte: start, lte: end } },
    _count: { type: true }
  });

  // Sync health
  const locations = await prisma.location.findMany({
    where: { businessId: q.businessId, ...(q.locationId ? { id: q.locationId } : {}) },
    select: { id: true, name: true, lastSyncAt: true, lastError: true }
  });
  const staleCutoff = new Date(Date.now() - 48*3600*1000);
  const syncHealth = locations.map(l => ({
    locationId: l.id,
    name: l.name,
    lastSyncAt: l.lastSyncAt,
    lastError: l.lastError,
    stale: !l.lastSyncAt || l.lastSyncAt < staleCutoff
  }));

  // Daily rollups (simple implementation: fetch reviews and bucket by day)
  const dailyReviews = await prisma.review.findMany({
    where: { businessId: q.businessId, ...locationFilter, createdAt: { gte: start, lte: end } },
    select: { createdAt: true, rating: true, sentiment: true }
  });
  const dailyPosted = await prisma.draftReply.findMany({
    where: { businessId: q.businessId, ...locationFilter, postedAt: { gte: start, lte: end }, status: { in: ['posted_manual','posted_api'] } },
    select: { postedAt: true }
  });
  const dayKey = (d: Date) => d.toISOString().slice(0,10);
  const dailyMap: Record<string, {date:string, ingested:number, posted:number, negative:number}> = {};
  for (const r of dailyReviews) {
    const k = dayKey(r.createdAt);
    dailyMap[k] ||= { date: k, ingested: 0, posted: 0, negative: 0 };
    dailyMap[k].ingested++;
    if ((r.rating ?? 0) <= 2 || r.sentiment === 'negative') dailyMap[k].negative++;
  }
  for (const p of dailyPosted) {
    const k = dayKey(p.postedAt!);
    dailyMap[k] ||= { date: k, ingested: 0, posted: 0, negative: 0 };
    dailyMap[k].posted++;
  }
  const daily = Object.values(dailyMap).sort((a,b)=>a.date.localeCompare(b.date));

  return NextResponse.json({
    range: { start: start.toISOString(), end: end.toISOString() },
    filters: { businessId: q.businessId, locationId: q.locationId ?? null },
    cards: { ingested, drafted, approved, posted, negativeShare, avgResponseHours, medianResponseHours },
    daily,
    themes,
    alerts: { total: alertTotal, byType: alertByType.map(x => ({ type: x.type, count: x._count.type })) },
    syncHealth
  });
}
```

## 4) API: /api/admin/metrics.csv

Return a CSV with header rows including daily metrics and per-location sync health. Use the same query parsing/RBAC as JSON endpoint. Content-Type: `text/csv; charset=utf-8`.

## 5) UI Page: /app/admin/metrics

- Filters: date range picker (start/end), location dropdown, export CSV button
- Cards: Ingested, Drafted, Approved, Posted, Negative share, Avg/Median response time
- Tables:
  - Sync Health table (location, lastSyncAt, stale badge, lastError)
  - Daily trend table (date, ingested, posted, negative)
  - Top themes list
  - Alerts by type table

This completes a functional, operator-friendly dashboard that explains whether the system is working (sync health) and whether customers are getting value (funnel + response time + negative share), while keeping implementation fast and reliable.
