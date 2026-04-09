# Metrics Dashboard Implementation (Routes, APIs, and KPI Definitions) — Ready-to-Ship Code Plan + Copy

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:02:50.903Z

---

Below is the concrete, ready-to-implement structure for the metrics dashboard in the existing Next.js (App Router) + Prisma app. It assumes you already have membership-based RBAC (UserBusinessMembership), Location.lastSyncAt/lastError fields (or integration health endpoint), and Review/DraftReply/AlertEvent tables.

============================================================
1) KPI Definitions (single source of truth)
============================================================
Goal: metrics must match what operators care about and remain stable across ingestion methods.

Time window: [start, end) in business timezone (convert to UTC bounds in API).

Definitions:
- ingestedCount: number of Review records with createdAt within window.
- draftedCount: number of distinct reviews that have at least one DraftReply created within window OR (preferred) firstDraftAt within window.
- approvedCount: number of DraftReply where approvedAt within window.
- postedCount: number of DraftReply where postedAt within window (manual or API posting).
- negativeCount: Review where (rating <= 2) OR (sentiment = 'negative'), createdAt within window.
- responseTimeSeconds: for posted replies only, postedAt - Review.createdAt.
- responseTimeP50/P90: percentile stats over responseTimeSeconds.

Notes:
- A review can have multiple drafts; response time should use the first posted reply for that review (min(postedAt)).
- Exclude rejected drafts from response stats.
- If postedAt is null, the review is considered not responded.

============================================================
2) API: /api/admin/metrics (JSON)
============================================================
File: app/api/admin/metrics/route.ts

Responsibilities:
- Authenticate user.
- Resolve businessId from session + membership.
- Validate inputs: start, end (ISO), optional locationIds (array), optional grouping (daily|weekly), limit max range (e.g., 120 days).
- Return:
  a) summary KPIs
  b) funnel series
  c) sync health per location
  d) alerts breakdown

Pseudo-code (TypeScript):

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireBusinessMember } from '@/lib/rbac';
import * as Sentry from '@sentry/nextjs';

const Query = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
  locationIds: z.string().optional(), // comma-separated
});

export async function GET(req: NextRequest) {
  const t0 = Date.now();
  const user = await requireBusinessMember(req); // returns { userId, businessId }
  const url = new URL(req.url);
  const parsed = Query.parse({
    start: url.searchParams.get('start'),
    end: url.searchParams.get('end'),
    locationIds: url.searchParams.get('locationIds') ?? undefined,
  });

  const start = new Date(parsed.start);
  const end = new Date(parsed.end);
  const locationIds = parsed.locationIds ? parsed.locationIds.split(',').filter(Boolean) : null;

  Sentry.addBreadcrumb({
    category: 'metrics',
    message: 'metrics query',
    data: { businessId: user.businessId, start: parsed.start, end: parsed.end, locationIds },
  });

  // Shared where clauses
  const reviewWhere: any = {
    businessId: user.businessId,
    createdAt: { gte: start, lt: end },
    ...(locationIds ? { locationId: { in: locationIds } } : {}),
  };

  // 1) Ingested
  const ingestedCount = await prisma.review.count({ where: reviewWhere });

  // 2) Negative
  const negativeCount = await prisma.review.count({
    where: {
      ...reviewWhere,
      OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }],
    },
  });

  // 3) Drafted/Approved/Posted counts (distinct reviews)
  // draftedCount: reviews that have any draft created in window
  const draftedDistinct = await prisma.draftReply.findMany({
    where: {
      businessId: user.businessId,
      createdAt: { gte: start, lt: end },
      ...(locationIds ? { locationId: { in: locationIds } } : {}),
    },
    select: { reviewId: true },
    distinct: ['reviewId'],
  });
  const draftedCount = draftedDistinct.length;

  const approvedDistinct = await prisma.draftReply.findMany({
    where: {
      businessId: user.businessId,
      approvedAt: { gte: start, lt: end },
      ...(locationIds ? { locationId: { in: locationIds } } : {}),
    },
    select: { reviewId: true },
    distinct: ['reviewId'],
  });
  const approvedCount = approvedDistinct.length;

  const postedDistinct = await prisma.draftReply.findMany({
    where: {
      businessId: user.businessId,
      postedAt: { gte: start, lt: end },
      ...(locationIds ? { locationId: { in: locationIds } } : {}),
    },
    select: { reviewId: true },
    distinct: ['reviewId'],
  });
  const postedCount = postedDistinct.length;

  // 4) Response time percentiles (SQL is best)
  // Use raw SQL to compute min(postedAt) per review and percentile_disc.
  // Example for Postgres:
  const response = await prisma.$queryRawUnsafe<any[]>(`
    WITH first_posts AS (
      SELECT r.id AS "reviewId",
             r."createdAt" AS "reviewCreatedAt",
             MIN(d."postedAt") AS "firstPostedAt"
      FROM "Review" r
      JOIN "DraftReply" d ON d."reviewId" = r.id
      WHERE r."businessId" = $1
        AND r."createdAt" >= $2 AND r."createdAt" < $3
        AND d."postedAt" IS NOT NULL
        ${locationIds ? 'AND r."locationId" = ANY($4)' : ''}
      GROUP BY r.id
    )
    SELECT
      COUNT(*)::int AS "respondedCount",
      PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM ("firstPostedAt" - "reviewCreatedAt"))) AS "p50",
      PERCENTILE_DISC(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM ("firstPostedAt" - "reviewCreatedAt"))) AS "p90",
      AVG(EXTRACT(EPOCH FROM ("firstPostedAt" - "reviewCreatedAt"))) AS "avg"
    FROM first_posts;
  `,
  ...(locationIds ? [user.businessId, start, end, locationIds] : [user.businessId, start, end])
  );

  const respondedCount = response?.[0]?.respondedCount ?? 0;
  const responseP50 = Number(response?.[0]?.p50 ?? 0);
  const responseP90 = Number(response?.[0]?.p90 ?? 0);
  const responseAvg = Number(response?.[0]?.avg ?? 0);

  // 5) Avg rating
  const avgRatingAgg = await prisma.review.aggregate({
    where: reviewWhere,
    _avg: { rating: true },
  });
  const avgRating = avgRatingAgg._avg.rating ?? null;

  // 6) Alerts breakdown
  const alerts = await prisma.alertEvent.groupBy({
    by: ['type'],
    where: {
      businessId: user.businessId,
      createdAt: { gte: start, lt: end },
      ...(locationIds ? { locationId: { in: locationIds } } : {}),
    },
    _count: { _all: true },
  });

  // 7) Sync health per location
  const locations = await prisma.location.findMany({
    where: { businessId: user.businessId, ...(locationIds ? { id: { in: locationIds } } : {}) },
    select: { id: true, name: true, lastSyncAt: true, lastSyncError: true, lastGbpReviewSyncUpdateTime: true, syncEnabled: true },
    orderBy: { name: 'asc' },
  });

  const out = {
    window: { start: start.toISOString(), end: end.toISOString() },
    summary: {
      ingestedCount,
      draftedCount,
      approvedCount,
      postedCount,
      respondedCount,
      negativeCount,
      avgRating,
      responseTimeSeconds: { p50: responseP50, p90: responseP90, avg: responseAvg },
    },
    alerts: alerts.map(a => ({ type: a.type, count: a._count._all })),
    syncHealth: locations,
  };

  console.info('metrics.ok', { businessId: user.businessId, ms: Date.now() - t0 });
  return NextResponse.json(out);
}

============================================================
3) API: /api/admin/metrics.csv (export)
============================================================
File: app/api/admin/metrics.csv/route.ts

Export format: daily rows.
Columns:
- date
- ingested
- negative
- drafted
- approved
- posted
- avgRating
- responded
- p50ResponseSeconds
- p90ResponseSeconds
- alertsTotal

Implementation approach:
- Generate a date series in SQL and left join counts.
- Return text/csv with proper headers.

============================================================
4) Page: /app/admin/metrics
============================================================
File: app/app/admin/metrics/page.tsx (server component)

UI sections:
A) Filters: Date range picker, location multiselect, Apply button.
B) KPI tiles: Ingested, Drafted, Approved, Posted, Negative share, Avg rating, P50/P90 response time.
C) Sync Health table: location name, sync enabled, lastSyncAt, last error, watermark.
D) Alerts chart/table: counts by type.
E) CSV export button linking to /api/admin/metrics.csv?start=...&end=...&locationIds=...

Empty state copy (paste-ready):
- “No review activity in this window yet. Try expanding the date range or confirm your Google integration is connected.”

============================================================
5) Operator-facing copy (Definitions drawer)
============================================================
Title: “How these metrics are calculated”
Body (paste-ready):
- Ingested: Reviews received in the selected time window (Google sync, email forward, CSV, or screenshot OCR).
- Drafted: Reviews that have at least one AI draft created.
- Approved: Drafts that were approved by a human.
- Posted: Approved drafts marked as posted (manual copy/paste or API posting when available).
- Response time: Time from when the review was created to when the first reply was posted.
- Negative: Reviews with rating 1–2 or sentiment tagged as negative.

============================================================
6) Pilot/onboarding email template (references required assets)
============================================================
Subject: Get your review replies on autopilot (Google/Yelp) — setup in 10 minutes

Hi {{FirstName}},

Thanks for trying AI Review Reply & Reputation Autopilot. Here’s the quickest way to get value today:

1) Connect Google Business Profile
- Sign in and connect here: {{AppUrl}}/app/integrations/google/connect
- Select the locations you want to sync.

2) Add any extra reviews (optional)
- CSV import: {{AppUrl}}/app/reviews/import
- Screenshot import (if needed): {{AppUrl}}/app/reviews/import/screenshot
- Or forward review notification emails to: agent_bob_replit+review-bot@agentmail.to

3) Approve replies (1-click)
- Your draft queue is here: {{AppUrl}}/app/reviews
- Edit if needed → Approve → Post (guided copy/paste with audit trail).

You can view reputation KPIs anytime in Metrics:
- {{AppUrl}}/app/admin/metrics

If anything looks off (missing reviews, wrong location, etc.), reply to this email or contact support at agent_bob_replit+review-bot@agentmail.to.

Website (for reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
AI Review Reply & Reputation Autopilot

============================================================
7) Acceptance checklist (quick)
============================================================
- [ ] Metrics page loads for a member user; blocked for non-member.
- [ ] Counts match known fixtures (create 5 reviews, approve/post 3, negative 2, verify numbers).
- [ ] CSV export downloads and matches on-screen KPIs.
- [ ] Sync health table matches /api/health/integrations.
- [ ] Sentry receives breadcrumbs on failed queries.

This artifact is designed to be pasted directly into the repo with minimal adaptation to existing helpers (prisma, RBAC, session retrieval).