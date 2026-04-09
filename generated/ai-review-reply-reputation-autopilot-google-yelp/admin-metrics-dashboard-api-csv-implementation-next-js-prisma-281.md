# Admin Metrics Dashboard + API/CSV — Implementation (Next.js + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:49:01.963Z

---

Below is build-ready implementation content for the Admin Metrics dashboard: routes, API contracts, Prisma queries, and UI structure. It assumes the existing schema described earlier (Business, Location, Review, DraftReply, AlertEvent, AuditLog, UserBusinessMembership) and Next.js App Router.

1) Routes
- Page: /app/admin/metrics
  - Server component that loads current user membership, business context, and renders filters + sections.
  - Calls /api/admin/metrics for JSON data (client fetch) OR uses server action to fetch directly (either approach OK). MVP uses client fetch for interactive filters.

- API: /api/admin/metrics (GET)
- CSV: /api/admin/metrics.csv (GET)

2) Query parameters (Zod)
- businessId: string (required)
- start: ISO date string (required)
- end: ISO date string (required)
- locationId: string (optional)

Definitions used across metrics:
- Ingested reviews: Review.createdAt within [start,end] AND (locationId filter matches if provided)
- Drafted: reviews with at least 1 DraftReply created within range OR Review.firstDraftedAt within range if you have a denormalized column (MVP computes from DraftReply)
- Approved: DraftReply.status == 'approved' and approvedAt within range
- Posted: DraftReply.postedAt not null AND postedAt within range AND postedStatus in ('posted_manual','posted_api')
- Response time: postedAt - approvedAt (or postedAt - review.createdAt if approvedAt missing). MVP uses approvedAt when available; else falls back to review.createdAt, and excludes rejected/unposted.
- Negative share: (rating <= 2 OR sentiment == 'negative') / total ingested
- Themes: aggregate Review.categoryLabels (or tags array) counts for top N.

3) API /api/admin/metrics (GET) — pseudo-code

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireBusinessMember } from '@/lib/rbac';

const MetricsQuery = z.object({
  businessId: z.string().min(1),
  start: z.string().datetime(),
  end: z.string().datetime(),
  locationId: z.string().min(1).optional()
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = MetricsQuery.safeParse({
    businessId: url.searchParams.get('businessId'),
    start: url.searchParams.get('start'),
    end: url.searchParams.get('end'),
    locationId: url.searchParams.get('locationId') ?? undefined
  });
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  const { businessId, start, end, locationId } = parsed.data;
  const startDt = new Date(start); const endDt = new Date(end);

  await requireBusinessMember({ req, businessId });

  const locationWhere = locationId ? { id: locationId } : { businessId };

  // Sync Health: last sync + last error per location
  const locations = await prisma.location.findMany({
    where: locationWhere,
    select: {
      id: true,
      name: true,
      source: true,
      gbpLocationId: true,
      lastGbpSyncAt: true,
      lastGbpSyncError: true,
      lastGbpReviewSyncUpdateTime: true
    },
    orderBy: { name: 'asc' }
  });

  // Reviews ingested
  const reviewsWhere = {
    businessId,
    ...(locationId ? { locationId } : {}),
    createdAt: { gte: startDt, lte: endDt }
  };

  const [totalIngested, avgRating] = await Promise.all([
    prisma.review.count({ where: reviewsWhere }),
    prisma.review.aggregate({ where: reviewsWhere, _avg: { rating: true } })
  ]);

  // Negative share
  const negativeCount = await prisma.review.count({
    where: {
      ...reviewsWhere,
      OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }]
    }
  });

  // Draft funnel: drafted, approved, posted
  // Drafted: any draft created for reviews in window OR drafts created in window for any review in business
  // MVP uses drafts created in window (better reflects workload)
  const draftsWhere = {
    businessId,
    ...(locationId ? { locationId } : {}),
    createdAt: { gte: startDt, lte: endDt }
  };
  const draftedCount = await prisma.draftReply.count({ where: draftsWhere });

  const approvedCount = await prisma.draftReply.count({
    where: {
      ...draftsWhere,
      status: 'approved'
    }
  });

  const postedCount = await prisma.draftReply.count({
    where: {
      businessId,
      ...(locationId ? { locationId } : {}),
      postedAt: { gte: startDt, lte: endDt },
      postedStatus: { in: ['posted_manual', 'posted_api'] }
    }
  });

  // Response time (minutes) for posted drafts in window
  const postedDrafts = await prisma.draftReply.findMany({
    where: {
      businessId,
      ...(locationId ? { locationId } : {}),
      postedAt: { gte: startDt, lte: endDt },
      postedStatus: { in: ['posted_manual', 'posted_api'] }
    },
    select: {
      approvedAt: true,
      postedAt: true,
      review: { select: { createdAt: true } }
    },
    take: 5000
  });

  const responseTimesMin = postedDrafts
    .map(d => {
      const start = d.approvedAt ?? d.review.createdAt;
      const end = d.postedAt;
      if (!start || !end) return null;
      return (end.getTime() - start.getTime()) / 60000;
    })
    .filter((v): v is number => v !== null && v >= 0 && v < 60 * 24 * 30);

  const avgResponseMin = responseTimesMin.length
    ? responseTimesMin.reduce((a,b)=>a+b,0) / responseTimesMin.length
    : null;

  // Alerts
  const alertsCount = await prisma.alertEvent.count({
    where: {
      businessId,
      ...(locationId ? { locationId } : {}),
      createdAt: { gte: startDt, lte: endDt }
    }
  });

  const alertsByType = await prisma.alertEvent.groupBy({
    by: ['type'],
    where: {
      businessId,
      ...(locationId ? { locationId } : {}),
      createdAt: { gte: startDt, lte: endDt }
    },
    _count: { type: true }
  });

  // Top themes
  // If categoryLabels stored as string[] in Review
  const reviewsForThemes = await prisma.review.findMany({
    where: reviewsWhere,
    select: { categoryLabels: true },
    take: 10000
  });
  const themeCounts: Record<string, number> = {};
  for (const r of reviewsForThemes) {
    for (const label of (r.categoryLabels ?? [])) {
      themeCounts[label] = (themeCounts[label] ?? 0) + 1;
    }
  }
  const topThemes = Object.entries(themeCounts)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,8)
    .map(([theme,count])=>({ theme, count }));

  // Simple trends (daily buckets)
  const days: { day: string; ingested: number; negative: number; avgRating: number | null }[] = [];
  for (let d = new Date(startDt); d <= endDt; d.setDate(d.getDate()+1)) {
    const dayStart = new Date(d); dayStart.setHours(0,0,0,0);
    const dayEnd = new Date(d); dayEnd.setHours(23,59,59,999);
    const [c, neg, avg] = await Promise.all([
      prisma.review.count({ where: { ...reviewsWhere, createdAt: { gte: dayStart, lte: dayEnd } } }),
      prisma.review.count({ where: { ...reviewsWhere, createdAt: { gte: dayStart, lte: dayEnd }, OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }] } }),
      prisma.review.aggregate({ where: { ...reviewsWhere, createdAt: { gte: dayStart, lte: dayEnd } }, _avg: { rating: true } })
    ]);
    days.push({
      day: dayStart.toISOString().slice(0,10),
      ingested: c,
      negative: neg,
      avgRating: avg._avg.rating ?? null
    });
  }

  return Response.json({
    businessId,
    start, end,
    summary: {
      totalIngested,
      avgRating: avgRating._avg.rating,
      negativeCount,
      negativeShare: totalIngested ? negativeCount / totalIngested : 0,
      draftedCount,
      approvedCount,
      postedCount,
      avgResponseMin,
      alertsCount
    },
    alertsByType: alertsByType.map(a => ({ type: a.type, count: a._count.type })),
    topThemes,
    locations,
    daily: days
  }, { headers: { 'Cache-Control': 'private, max-age=30' } });
}

4) CSV /api/admin/metrics.csv
- Uses the same data as JSON but flattens into rows:
  - One “Summary” section row
  - One row per location with lastSyncAt, lastError, ingested, negativeShare, postedCount
  - One row per top theme

Example columns:
section,businessId,locationId,locationName,start,end,totalIngested,avgRating,negativeShare,drafted,approved,posted,avgResponseMin,alerts,lastSyncAt,lastError,theme,themeCount

5) UI /app/admin/metrics
- Header: “Metrics” + date range picker + location dropdown + Export CSV button.
- Sections:
  A) Sync health table: location, last sync time, last watermark updateTime, last error, status badge.
  B) Funnel cards: ingested, drafted, approved, posted + conversion rates (posted/ingested etc.).
  C) Response KPIs: avg response time + posted count.
  D) Alerts: total + by type.
  E) Trends: small daily table + minimal SVG sparkline for ingested and avg rating.
  F) Top themes: bar list.

6) Owner-facing copy snippet for the Metrics page (in-app)
“Metrics reflect activity captured by Review Reply & Reputation Autopilot. If you post replies directly in Google/Yelp, mark them as posted in the app (or enable API posting when available) so response-time KPIs remain accurate. For support, contact agent_bob_replit+review-bot@agentmail.to or visit https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1.”

This implementation avoids new paid dependencies, relies on existing tables, and produces a dashboard that helps debug activation, sync reliability, and SLA compliance in real time.