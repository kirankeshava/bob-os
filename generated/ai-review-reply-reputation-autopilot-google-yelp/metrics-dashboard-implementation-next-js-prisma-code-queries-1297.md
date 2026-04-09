# Metrics Dashboard Implementation (Next.js + Prisma) — Code + Queries

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T14:43:01.370Z

---

# Metrics Dashboard Implementation (Build-Ready)

This artifact contains the concrete implementation plan and code skeleton for the metrics dashboard. It assumes the existing schema: Business, Location, Review, DraftReply, AlertEvent, AuditLog, WeeklyReport, UserBusinessMembership. It uses Next.js App Router with server components and Prisma.

## 1) Route structure
- `app/app/admin/metrics/page.tsx` (server component)
- `app/api/admin/metrics/route.ts` (JSON aggregates)
- `app/api/admin/metrics.csv/route.ts` (CSV export)

## 2) KPI definitions (single source of truth)
- **Ingested reviews**: `Review.createdAt` within `[start,end]` and belonging to business (+ optional location).
- **Negative reviews**: `Review.rating <= 2 OR Review.sentiment == 'negative'` within range.
- **Drafted**: reviews that have at least one `DraftReply` created within range OR reviews ingested within range that have a draft (depending on view). For simplicity, funnel is anchored to reviews ingested in range.
- **Approved**: `DraftReply.status == 'approved'` (latest draft per review) AND associated review ingested in range.
- **Posted**: `DraftReply.status IN ('posted_manual','posted_api')` AND `postedAt` not null AND associated review ingested in range.
- **Response time**: for posted replies only: `DraftReply.postedAt - Review.createdAt` (hours). Exclude rejected/unposted.
- **Sync health**: from `Location.lastGbpReviewSyncAt`, `Location.lastGbpReviewSyncUpdateTime`, plus most recent integration error stored on Integration or derived from AlertEvents.

## 3) API: /api/admin/metrics (JSON)
### Request
Query params:
- `businessId` (required)
- `start` ISO string (required)
- `end` ISO string (required)
- `locationId` (optional)

### Response shape
```json
{
  "range": {"start": "...", "end": "..."},
  "syncHealth": [{"locationId":"...","name":"...","enabled":true,"lastSyncAt":"...","lastError":"..."}],
  "kpis": {
    "reviews": 0,
    "avgRating": 0,
    "negativeCount": 0,
    "negativeShare": 0,
    "draftedCount": 0,
    "approvedCount": 0,
    "postedCount": 0,
    "medianResponseHours": 0,
    "p90ResponseHours": 0
  },
  "timeSeriesDaily": [{"date":"2026-04-01","reviews":1,"negative":0,"approved":1,"posted":1,"avgRating":4.5}],
  "alerts": {"total":0,"byType":[{"type":"SLA_NEGATIVE_REVIEW","count":0}]},
  "topThemes": [{"label":"staff","count":0}],
  "topLocations": [{"locationId":"...","name":"...","reviews":0,"avgRating":0,"negativeShare":0}]
}
```

## 4) Code: /api/admin/metrics/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireBusinessMember } from '@/lib/authz';
import { withSentry } from '@/lib/sentry';

const QuerySchema = z.object({
  businessId: z.string().uuid(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  locationId: z.string().uuid().optional()
});

function percentile(values: number[], p: number) {
  if (!values.length) return null;
  const sorted = [...values].sort((a,b)=>a-b);
  const idx = Math.ceil((p/100)*sorted.length)-1;
  return sorted[Math.max(0, Math.min(idx, sorted.length-1))];
}

export const GET = withSentry(async (req: NextRequest) => {
  const parsed = QuerySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { businessId, start, end, locationId } = parsed.data;
  await requireBusinessMember(req, businessId);

  const startDt = new Date(start);
  const endDt = new Date(end);

  const reviewWhere: any = {
    businessId,
    createdAt: { gte: startDt, lte: endDt },
    ...(locationId ? { locationId } : {})
  };

  // Base review metrics
  const [reviewsCount, avgRatingAgg, negativeCount] = await Promise.all([
    prisma.review.count({ where: reviewWhere }),
    prisma.review.aggregate({ where: reviewWhere, _avg: { rating: true } }),
    prisma.review.count({
      where: {
        ...reviewWhere,
        OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }]
      }
    })
  ]);

  // Funnel anchored to reviews ingested in range
  const reviewsInRange = await prisma.review.findMany({
    where: reviewWhere,
    select: { id: true, createdAt: true, rating: true }
  });
  const reviewIds = reviewsInRange.map(r => r.id);

  // Get latest draft per review (if multiple)
  const drafts = await prisma.draftReply.findMany({
    where: { reviewId: { in: reviewIds } },
    orderBy: [{ reviewId: 'asc' }, { createdAt: 'desc' }],
    select: { reviewId: true, status: true, postedAt: true, createdAt: true }
  });
  const latestByReview = new Map<string, {status: string; postedAt: Date | null; createdAt: Date}>();
  for (const d of drafts) {
    if (!latestByReview.has(d.reviewId)) latestByReview.set(d.reviewId, d as any);
  }

  let draftedCount = 0, approvedCount = 0, postedCount = 0;
  const responseHours: number[] = [];

  // Fetch createdAt for response time join
  const createdAtByReview = new Map(reviewsInRange.map(r => [r.id, r.createdAt] as const));

  for (const [rid, d] of latestByReview.entries()) {
    draftedCount++;
    if (d.status === 'approved') approvedCount++;
    if (d.status === 'posted_manual' || d.status === 'posted_api') {
      postedCount++;
      const createdAt = createdAtByReview.get(rid);
      if (createdAt && d.postedAt) {
        responseHours.push((d.postedAt.getTime() - createdAt.getTime()) / 36e5);
      }
    }
  }

  const medianResponseHours = percentile(responseHours, 50);
  const p90ResponseHours = percentile(responseHours, 90);

  // Sync health
  const locations = await prisma.location.findMany({
    where: { businessId, ...(locationId ? { id: locationId } : {}) },
    select: {
      id: true,
      name: true,
      gbpSyncEnabled: true,
      lastGbpReviewSyncAt: true,
      lastGbpReviewSyncUpdateTime: true,
      lastSyncError: true
    }
  });

  // Alerts
  const alertsWhere: any = {
    businessId,
    createdAt: { gte: startDt, lte: endDt },
    ...(locationId ? { locationId } : {})
  };
  const alertsTotal = await prisma.alertEvent.count({ where: alertsWhere });
  const alertsByType = await prisma.alertEvent.groupBy({
    by: ['type'],
    where: alertsWhere,
    _count: { type: true }
  });

  // Top themes (categories)
  const themeRows = await prisma.review.groupBy({
    by: ['category'],
    where: { ...reviewWhere, category: { not: null } },
    _count: { category: true },
    orderBy: { _count: { category: 'desc' } },
    take: 8
  });

  // Per-day timeseries (Postgres date_trunc)
  const timeSeriesDaily = await prisma.$queryRawUnsafe<any[]>(
    `
    select
      to_char(date_trunc('day', r."createdAt"), 'YYYY-MM-DD') as date,
      count(*)::int as reviews,
      avg(r.rating)::float as "avgRating",
      sum(case when (r.rating <= 2 or r.sentiment = 'negative') then 1 else 0 end)::int as negative
    from "Review" r
    where r."businessId" = $1
      and r."createdAt" >= $2
      and r."createdAt" <= $3
      ${locationId ? 'and r."locationId" = $4' : ''}
    group by 1
    order by 1 asc
    `,
    ...(locationId ? [businessId, startDt, endDt, locationId] : [businessId, startDt, endDt])
  );

  // Per-location rollup
  const topLocations = await prisma.$queryRawUnsafe<any[]>(
    `
    select
      l.id as "locationId",
      l.name as name,
      count(r.id)::int as reviews,
      avg(r.rating)::float as "avgRating",
      case when count(r.id) = 0 then 0
           else (sum(case when (r.rating <= 2 or r.sentiment = 'negative') then 1 else 0 end)::float / count(r.id)::float)
      end as "negativeShare"
    from "Location" l
    left join "Review" r on r."locationId" = l.id
      and r."createdAt" >= $2 and r."createdAt" <= $3
    where l."businessId" = $1
      ${locationId ? 'and l.id = $4' : ''}
    group by l.id
    order by reviews desc
    limit 10
    `,
    ...(locationId ? [businessId, startDt, endDt, locationId] : [businessId, startDt, endDt])
  );

  const payload = {
    range: { start, end },
    syncHealth: locations.map(l => ({
      locationId: l.id,
      name: l.name,
      enabled: l.gbpSyncEnabled,
      lastSyncAt: l.lastGbpReviewSyncAt,
      lastError: l.lastSyncError,
      lastUpdateTime: l.lastGbpReviewSyncUpdateTime
    })),
    kpis: {
      reviews: reviewsCount,
      avgRating: avgRatingAgg._avg.rating ?? null,
      negativeCount,
      negativeShare: reviewsCount ? negativeCount / reviewsCount : 0,
      draftedCount,
      approvedCount,
      postedCount,
      medianResponseHours,
      p90ResponseHours
    },
    timeSeriesDaily,
    alerts: {
      total: alertsTotal,
      byType: alertsByType.map(a => ({ type: a.type, count: a._count.type }))
    },
    topThemes: themeRows.map(t => ({ label: t.category, count: t._count.category })),
    topLocations
  };

  return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store' } });
});
```

## 5) CSV export: /api/admin/metrics.csv
Export `timeSeriesDaily` plus per-location rollups to help customers/debugging. Use `Content-Type: text/csv` and `Content-Disposition: attachment; filename="metrics-YYYY-MM-DD_to_YYYY-MM-DD.csv"`.

## 6) UI: /app/admin/metrics/page.tsx
Server component loads metrics from internal API (or calls shared service function). Render:
- Filter bar: date range (last 7/30/90), location dropdown
- KPI cards: Reviews, Avg rating, Negative share, Posted, Median response time
- Tables: Sync health, Alerts by type, Top themes, Top locations
- Export button linking to `/api/admin/metrics.csv?...`

## 7) Notes
- Keep computations consistent by anchoring funnel to reviews ingested in range.
- For high scale, move join logic to SQL, but MVP is fine.
- Ensure RBAC: only members of the Business can access endpoints.
- Log correlationId/requestId in metrics API for debugging.
