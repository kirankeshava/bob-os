# Metrics Dashboard Implementation (Next.js + Prisma) — Build-Ready Code & Routes

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:51:32.761Z

---

Below is a concrete, paste-ready implementation outline for the Metrics Dashboard (page + APIs + CSV export). It assumes the existing tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership. It also assumes you already have auth session helpers and a Prisma client.

1) Routes
- /app/admin/metrics/page.tsx (Server Component)
- /api/admin/metrics/route.ts (JSON)
- /api/admin/metrics.csv/route.ts (CSV)

2) Query params (shared)
- businessId: string (required)
- start: ISO date string (optional; default now-30d)
- end: ISO date string (optional; default now)
- locationId: string (optional)

3) KPI definitions
- ingested: Reviews.createdAt within range
- drafted: DraftReply.createdAt within range (or DraftReply.review.createdAt in range; pick one and be consistent; below uses DraftReply.createdAt)
- approved: DraftReply.approvedAt within range
- posted: DraftReply.postedAt within range (includes posted_manual; exclude null)
- response_time_minutes: median/avg over posted drafts where (postedAt - Review.createdAt) and DraftReply.status != 'rejected'
- negative_alerts: AlertEvent.createdAt within range where type='negative_review'
- sync_health: per Location lastGbpReviewSyncAt + lastError (if you store last error fields; otherwise derive from Integration/AuditLog)

4) API: /api/admin/metrics/route.ts (skeleton)
```ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth';

const QuerySchema = z.object({
  businessId: z.string().min(1),
  start: z.string().datetime().optional(),
  end: z.string().datetime().optional(),
  locationId: z.string().optional(),
});

export async function GET(req: Request) {
  const session = await requireSession();
  const url = new URL(req.url);
  const parsed = QuerySchema.safeParse({
    businessId: url.searchParams.get('businessId'),
    start: url.searchParams.get('start') ?? undefined,
    end: url.searchParams.get('end') ?? undefined,
    locationId: url.searchParams.get('locationId') ?? undefined,
  });
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { businessId, locationId } = parsed.data;
  const start = parsed.data.start ? new Date(parsed.data.start) : new Date(Date.now() - 30*24*60*60*1000);
  const end = parsed.data.end ? new Date(parsed.data.end) : new Date();

  // RBAC: ensure user is a member of the business
  const membership = await prisma.userBusinessMembership.findFirst({
    where: { userId: session.user.id, businessId }
  });
  if (!membership) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const reviewWhere: any = {
    businessId,
    createdAt: { gte: start, lte: end },
    ...(locationId ? { locationId } : {}),
  };

  const draftWhere: any = {
    businessId,
    createdAt: { gte: start, lte: end },
    ...(locationId ? { review: { locationId } } : {}),
  };

  const approvedWhere: any = {
    businessId,
    approvedAt: { gte: start, lte: end },
    ...(locationId ? { review: { locationId } } : {}),
  };

  const postedWhere: any = {
    businessId,
    postedAt: { gte: start, lte: end },
    status: { not: 'rejected' },
    ...(locationId ? { review: { locationId } } : {}),
  };

  const [
    ingested,
    drafted,
    approved,
    posted,
    negativeAlerts,
    locations,
  ] = await Promise.all([
    prisma.review.count({ where: reviewWhere }),
    prisma.draftReply.count({ where: draftWhere }),
    prisma.draftReply.count({ where: approvedWhere }),
    prisma.draftReply.count({ where: postedWhere }),
    prisma.alertEvent.count({ where: { businessId, createdAt: { gte: start, lte: end }, type: 'negative_review', ...(locationId ? { locationId } : {}) } }),
    prisma.location.findMany({ where: { businessId, ...(locationId ? { id: locationId } : {}) }, select: { id: true, name: true, source: true, lastGbpReviewSyncAt: true, lastGbpReviewSyncUpdateTime: true, lastSyncError: true } }),
  ]);

  // Response time stats: compute from posted drafts joined to review.createdAt
  const postedDrafts = await prisma.draftReply.findMany({
    where: postedWhere,
    select: { postedAt: true, review: { select: { createdAt: true } } },
    take: 5000,
  });
  const deltas = postedDrafts
    .filter(d => d.postedAt)
    .map(d => (d.postedAt!.getTime() - d.review.createdAt.getTime()) / 60000)
    .filter(m => Number.isFinite(m) && m >= 0);
  deltas.sort((a,b)=>a-b);
  const avg = deltas.length ? deltas.reduce((s,v)=>s+v,0)/deltas.length : null;
  const median = deltas.length ? deltas[Math.floor(deltas.length/2)] : null;

  // Daily time series (counts) using groupBy (by day via raw SQL for portability)
  const daily = await prisma.$queryRaw<Array<{ day: string; ingested: number; drafted: number; approved: number; posted: number; alerts: number }>>`
    WITH days AS (
      SELECT date_trunc('day', d)::date AS day
      FROM generate_series(${start}::timestamp, ${end}::timestamp, interval '1 day') d
    )
    SELECT
      days.day::text AS day,
      COALESCE(r.cnt,0)::int AS ingested,
      COALESCE(dr.cnt,0)::int AS drafted,
      COALESCE(ap.cnt,0)::int AS approved,
      COALESCE(po.cnt,0)::int AS posted,
      COALESCE(al.cnt,0)::int AS alerts
    FROM days
    LEFT JOIN (
      SELECT date_trunc('day', "createdAt")::date AS day, count(*) cnt
      FROM "Review" WHERE "businessId"=${businessId} AND "createdAt">=${start} AND "createdAt"<=${end}
      ${locationId ? prisma.$unsafeRaw`AND "locationId"=${locationId}` : prisma.$unsafeRaw``}
      GROUP BY 1
    ) r USING(day)
    LEFT JOIN (
      SELECT date_trunc('day', "createdAt")::date AS day, count(*) cnt
      FROM "DraftReply" WHERE "businessId"=${businessId} AND "createdAt">=${start} AND "createdAt"<=${end}
      GROUP BY 1
    ) dr USING(day)
    LEFT JOIN (
      SELECT date_trunc('day', "approvedAt")::date AS day, count(*) cnt
      FROM "DraftReply" WHERE "businessId"=${businessId} AND "approvedAt">=${start} AND "approvedAt"<=${end}
      GROUP BY 1
    ) ap USING(day)
    LEFT JOIN (
      SELECT date_trunc('day', "postedAt")::date AS day, count(*) cnt
      FROM "DraftReply" WHERE "businessId"=${businessId} AND "postedAt">=${start} AND "postedAt"<=${end} AND "status"<>'rejected'
      GROUP BY 1
    ) po USING(day)
    LEFT JOIN (
      SELECT date_trunc('day', "createdAt")::date AS day, count(*) cnt
      FROM "AlertEvent" WHERE "businessId"=${businessId} AND "createdAt">=${start} AND "createdAt"<=${end} AND "type"='negative_review'
      GROUP BY 1
    ) al USING(day)
    ORDER BY days.day ASC;
  `;

  return NextResponse.json({
    range: { start: start.toISOString(), end: end.toISOString() },
    filters: { businessId, locationId: locationId ?? null },
    kpis: { ingested, drafted, approved, posted, negativeAlerts, responseTime: { avgMinutes: avg, medianMinutes: median, n: deltas.length } },
    syncHealth: locations,
    daily,
  });
}
```

5) CSV: /api/admin/metrics.csv/route.ts
Return text/csv with headers: day,ingested,drafted,approved,posted,alerts plus a footer section with totals and response-time stats. Use the same RBAC + query parsing and call the JSON metrics internally (or share a computeMetrics() helper).

6) Page: /app/admin/metrics/page.tsx (server)
- Render filter form (start/end, location select)
- Fetch /api/admin/metrics with cookies/credentials via server-side fetch
- Display:
  - KPI cards (ingested/drafted/approved/posted, negative alerts)
  - Sync health table (location, last sync, last error)
  - Daily funnel chart (simple SVG/Canvas or table) and response-time stats
  - “Download CSV” link to /api/admin/metrics.csv?...

7) Notes
- Keep response-time computations capped (take: 5000) to avoid heavy loads; for large customers later, move to materialized daily rollups.
- Ensure location-scoped metrics apply consistently: if filtering by locationId, apply it to Review and DraftReply via relation filter (review.locationId).

This gives an immediately shippable dashboard that reuses existing data and helps customer onboarding (“is sync working?”) and value proof (response time + volume + alerts).