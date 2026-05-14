# Metrics Dashboard Implementation (Build-Ready Code + KPI Definitions + CSV Schema)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T05:35:38.248Z

---

Below is build-ready implementation content for the /app/admin/metrics dashboard, including KPI definitions, API contract, CSV schema, and representative Next.js/Prisma code snippets you can paste into the repo.

=== KPI DEFINITIONS (used consistently in UI + weekly report) ===
Date range: [start, end] inclusive in business timezone (stored on Business, default UTC). All metrics filtered by businessId and optional locationId.

1) Ingested Reviews
- Definition: Review.createdAt within range.
- Count: total reviews ingested.

2) Drafted
- Definition: Review that has at least one DraftReply with DraftReply.createdAt within range OR Review.createdAt within range and its latest DraftReply exists.
- For funnel: we count reviews that have a draft (any time) but entered the funnel in range by review.createdAt.

3) Approved
- Definition: DraftReply.status == 'approved' AND approvedAt within range.

4) Posted
- Definition: DraftReply.status in ['posted_manual','posted_api'] AND postedAt within range.
- Note: Rejected drafts are excluded from response-time denominators.

5) Response Time
- Definition: median and p90 of (postedAt - Review.createdAt) for posted drafts whose related Review.createdAt is within range.
- Exclusions: drafts rejected; drafts approved but not posted; reviews missing createdAt.

6) Negative Share
- Definition: (# reviews where sentiment='negative' OR rating<=2) / total ingested reviews within range.

7) Avg Rating Trend
- Definition: average rating per day (or per week if range > 60 days). Also show overall average.

8) Top Themes
- Definition: count of category labels (service/price/staff/quality/cleanliness/wait_time/other) over reviews in range; show top 5.

9) Sync Health
- Per Location: lastGbpSyncAt, lastGbpReviewSyncUpdateTime watermark, lastSyncError, consecutiveFailureCount.
- Integration-level: lastSyncAt and lastError.

10) Alerts
- Definition: AlertEvent.createdAt within range; group by type (negative_review, sync_failure, ocr_failure, sla_breach).

=== ROUTES / PAGES ===
1) Page: app/admin/metrics/page.tsx
- Server component. Reads searchParams: start, end, locationId.
- Calls internal fetch to /api/admin/metrics and renders:
  - Sync Health table
  - Funnel cards + conversion rates
  - Trends (simple sparkline table; no paid chart lib)
  - Alerts summary
  - Top Themes
  - Download CSV link to /api/admin/metrics.csv?start=...&end=...

2) API: app/api/admin/metrics/route.ts
- GET only.
- Validates query with Zod:
  - start/end optional ISO date; defaults end=now, start=end-30d
  - max range 180 days
  - locationId optional
- AuthN/AuthZ: require session; require membership in the business.

3) API CSV: app/api/admin/metrics.csv/route.ts
- Same filters/auth.
- Produces a single CSV with sections flattened:
  - daily_rollups rows
  - location_rollups rows
  - theme_counts rows
  - alert_counts rows

=== API CONTRACT: /api/admin/metrics ===
Response JSON:
{
  range: { start: string, end: string, timezone: string },
  filters: { locationId?: string },
  funnel: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    approveRate: number,        // approved/drafted
    postRate: number,           // posted/approved
    overallConversion: number    // posted/ingested
  },
  responseTime: { medianMinutes: number|null, p90Minutes: number|null },
  ratings: { avgRating: number|null, daily: Array<{ date: string, avgRating: number|null, count: number }> },
  sentiment: { positive: number, neutral: number, negative: number, negativeShare: number },
  themes: Array<{ label: string, count: number }>,
  alerts: { total: number, byType: Array<{ type: string, count: number }> },
  syncHealth: Array<{ locationId: string, name: string, enabled: boolean, lastSyncAt: string|null, lastError: string|null, consecutiveFailures: number, watermark: string|null }>
}

=== CSV SCHEMA: /api/admin/metrics.csv ===
Columns:
- section: 'daily_rollup' | 'location_rollup' | 'theme_count' | 'alert_count'
- date (for daily)
- locationId, locationName (when applicable)
- ingested, drafted, approved, posted
- avgRating, negativeShare, medianRespMin, p90RespMin
- themeLabel, themeCount
- alertType, alertCount

=== REPRESENTATIVE CODE (Next.js App Router) ===

--- app/api/admin/metrics/route.ts ---
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireSession } from '@/lib/auth';
import { sentrySpan } from '@/lib/sentrySpan';

const QuerySchema = z.object({
  start: z.string().datetime().optional(),
  end: z.string().datetime().optional(),
  locationId: z.string().uuid().optional()
});

function clampRange(start: Date, end: Date) {
  const maxDays = 180;
  const ms = end.getTime() - start.getTime();
  const days = ms / (1000 * 60 * 60 * 24);
  if (days > maxDays) {
    const newStart = new Date(end.getTime() - maxDays * 24 * 60 * 60 * 1000);
    return { start: newStart, end };
  }
  return { start, end };
}

export async function GET(req: Request) {
  const session = await requireSession();
  const url = new URL(req.url);
  const parsed = QuerySchema.safeParse({
    start: url.searchParams.get('start') ?? undefined,
    end: url.searchParams.get('end') ?? undefined,
    locationId: url.searchParams.get('locationId') ?? undefined
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query', details: parsed.error.flatten() }, { status: 400 });
  }

  const end = parsed.data.end ? new Date(parsed.data.end) : new Date();
  const startDefault = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
  const start = parsed.data.start ? new Date(parsed.data.start) : startDefault;
  const { start: s, end: e } = clampRange(start, end);

  // Determine businessId from session + membership
  const membership = await prisma.userBusinessMembership.findFirst({
    where: { userId: session.user.id },
    include: { business: true }
  });
  if (!membership) return NextResponse.json({ error: 'No business access' }, { status: 403 });
  const businessId = membership.businessId;
  const timezone = membership.business.timezone ?? 'UTC';

  const locationFilter = parsed.data.locationId ? { locationId: parsed.data.locationId } : {};

  return sentrySpan('metrics.compute', async () => {
    // Ingested reviews in range
    const ingested = await prisma.review.count({
      where: { businessId, createdAt: { gte: s, lte: e }, ...locationFilter }
    });

    // Drafted reviews: distinct reviewIds with any draft
    const draftedDistinct = await prisma.draftReply.findMany({
      where: { businessId, ...locationFilter, review: { createdAt: { gte: s, lte: e } } },
      select: { reviewId: true },
      distinct: ['reviewId']
    });
    const drafted = draftedDistinct.length;

    const approved = await prisma.draftReply.count({
      where: { businessId, status: 'approved', approvedAt: { gte: s, lte: e }, ...locationFilter }
    });

    const posted = await prisma.draftReply.count({
      where: { businessId, status: { in: ['posted_manual', 'posted_api'] }, postedAt: { gte: s, lte: e }, ...locationFilter }
    });

    const approveRate = drafted ? approved / drafted : 0;
    const postRate = approved ? posted / approved : 0;
    const overallConversion = ingested ? posted / ingested : 0;

    const sentimentCounts = await prisma.review.groupBy({
      by: ['sentiment'],
      where: { businessId, createdAt: { gte: s, lte: e }, ...locationFilter },
      _count: { _all: true }
    });

    const ratingNeg = await prisma.review.count({
      where: { businessId, createdAt: { gte: s, lte: e }, ...locationFilter, rating: { lte: 2 } }
    });

    const pos = sentimentCounts.find(x => x.sentiment === 'positive')?._count._all ?? 0;
    const neu = sentimentCounts.find(x => x.sentiment === 'neutral')?._count._all ?? 0;
    const neg = sentimentCounts.find(x => x.sentiment === 'negative')?._count._all ?? 0;

    const negativeShare = ingested ? (Math.max(neg, ratingNeg) / ingested) : 0;

    // Response time distribution (posted only)
    const postedDrafts = await prisma.draftReply.findMany({
      where: {
        businessId,
        status: { in: ['posted_manual', 'posted_api'] },
        postedAt: { gte: s, lte: e },
        review: { createdAt: { not: null, gte: s, lte: e } },
        ...locationFilter
      },
      select: { postedAt: true, review: { select: { createdAt: true } } }
    });
    const minutes = postedDrafts
      .map(d => (d.postedAt!.getTime() - d.review.createdAt!.getTime()) / 60000)
      .filter(n => Number.isFinite(n) && n >= 0)
      .sort((a,b) => a-b);
    const medianMinutes = minutes.length ? minutes[Math.floor(minutes.length * 0.5)] : null;
    const p90Minutes = minutes.length ? minutes[Math.floor(minutes.length * 0.9)] : null;

    // Themes
    const themeCountsRaw = await prisma.review.findMany({
      where: { businessId, createdAt: { gte: s, lte: e }, ...locationFilter },
      select: { categories: true }
    });
    const themeMap: Record<string, number> = {};
    for (const r of themeCountsRaw) {
      for (const c of (r.categories ?? [])) themeMap[c] = (themeMap[c] ?? 0) + 1;
    }
    const themes = Object.entries(themeMap)
      .map(([label,count]) => ({ label, count }))
      .sort((a,b) => b.count - a.count)
      .slice(0, 7);

    // Alerts
    const alertsByType = await prisma.alertEvent.groupBy({
      by: ['type'],
      where: { businessId, createdAt: { gte: s, lte: e } },
      _count: { _all: true }
    });
    const alertsTotal = alertsByType.reduce((acc,x) => acc + x._count._all, 0);

    // Sync health from Location fields
    const syncHealth = await prisma.location.findMany({
      where: { businessId, ...(parsed.data.locationId ? { id: parsed.data.locationId } : {}) },
      select: {
        id: true, name: true, gbpSyncEnabled: true,
        lastGbpSyncAt: true, lastGbpSyncError: true,
        gbpConsecutiveSyncFailures: true,
        lastGbpReviewSyncUpdateTime: true
      },
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({
      range: { start: s.toISOString(), end: e.toISOString(), timezone },
      filters: { locationId: parsed.data.locationId },
      funnel: { ingested, drafted, approved, posted, approveRate, postRate, overallConversion },
      responseTime: { medianMinutes, p90Minutes },
      ratings: { avgRating: null, daily: [] },
      sentiment: { positive: pos, neutral: neu, negative: neg, negativeShare },
      themes,
      alerts: {
        total: alertsTotal,
        byType: alertsByType.map(a => ({ type: a.type, count: a._count._all }))
      },
      syncHealth: syncHealth.map(l => ({
        locationId: l.id,
        name: l.name,
        enabled: l.gbpSyncEnabled,
        lastSyncAt: l.lastGbpSyncAt?.toISOString() ?? null,
        lastError: l.lastGbpSyncError ?? null,
        consecutiveFailures: l.gbpConsecutiveSyncFailures ?? 0,
        watermark: l.lastGbpReviewSyncUpdateTime?.toISOString() ?? null
      }))
    });
  });
}

--- app/api/admin/metrics.csv/route.ts ---
// Same query/auth; call metrics compute + flatten to CSV.
// Use a simple CSV builder with proper quoting.

--- app/admin/metrics/page.tsx ---
// Server component fetches /api/admin/metrics, renders tables/cards and a Download CSV link.

=== CUSTOMER-FACING NOTE (for onboarding email / pilots) ===
When asking a business owner to test, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support/Contact: agent_bob_replit+review-bot@agentmail.to

This dashboard gives owners immediate visibility into whether the autopilot is working: new reviews coming in, drafts being generated, approvals happening, posts being recorded, and weekly report KPIs matching the live funnel.
