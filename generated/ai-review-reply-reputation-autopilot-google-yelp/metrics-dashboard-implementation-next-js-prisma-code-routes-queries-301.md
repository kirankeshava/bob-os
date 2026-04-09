# Metrics Dashboard Implementation (Next.js + Prisma) — Code + Routes + Queries

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:00:27.304Z

---

Below is the build-ready implementation content for the in-app metrics dashboard. It assumes the existing schema/tables already in the MVP: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

1) ROUTES

A) Page: /app/admin/metrics/page.tsx
- Server component page with filters:
  - businessId inferred from session membership context
  - date range (default last 30 days)
  - locationIds multi-select (default all enabled)
- Fetches JSON from internal server call to metrics service (not via fetch to avoid auth duplication) and renders:
  - Sync Health table: location name, lastGbpSyncAt, lastGbpSyncUpdateTime, lastError, failuresLast24h
  - Funnel cards: ingested, drafted, approved, posted_manual counts; conversion rates
  - Response KPIs: median hours-to-first-draft, median hours-to-approved, median hours-to-posted (manual)
  - Alerts chart/table: alerts by type/day, negative SLA breaches
  - CTA: “Download CSV” linking to /api/admin/metrics.csv with current filters

B) API: /app/api/admin/metrics/route.ts
- GET with query params:
  - start: ISO date
  - end: ISO date
  - locationIds: comma-separated
- RBAC:
  - require authenticated user
  - require membership in business (UserBusinessMembership)
- Returns JSON:
  {
    range: {start,end},
    locations: [...],
    syncHealth: [...],
    funnel: {...},
    response: {...},
    ratings: {...},
    alerts: {...}
  }

C) API CSV: /app/api/admin/metrics.csv/route.ts
- Same RBAC + validation
- Returns text/csv with daily rows per location.

2) SERVER-SIDE METRICS SERVICE

Create: /lib/metrics.ts

Key definitions (consistent with earlier spec):
- Ingested: Review.createdAt within range AND Review.businessId matches AND (location filter)
- Drafted: DraftReply.createdAt within range AND DraftReply.review.businessId matches
- Approved: DraftReply.approvedAt within range
- Posted (manual): DraftReply.postedAt within range AND status == 'posted_manual'
- Response time (draft): DraftReply.createdAt - Review.createdAt
- Response time (approve): DraftReply.approvedAt - Review.createdAt
- Response time (posted manual): DraftReply.postedAt - Review.createdAt
- Avg rating: Review.rating average in range
- Negative share: count(Review.rating <= 2 OR sentiment='negative') / ingested
- Top themes: counts of Review.categoryLabels (or stored tags array)

Pseudo-implementation outline (Prisma):

export async function getMetrics({ prisma, businessId, start, end, locationIds }) {
  // Common where
  const reviewWhere = {
    businessId,
    createdAt: { gte: start, lte: end },
    ...(locationIds?.length ? { locationId: { in: locationIds } } : {})
  };

  // 1) Sync health per location
  const locations = await prisma.location.findMany({
    where: { businessId, ...(locationIds?.length ? { id: { in: locationIds } } : {}) },
    select: {
      id: true,
      name: true,
      gbpLocationId: true,
      lastGbpSyncAt: true,
      lastGbpReviewSyncUpdateTime: true,
      lastGbpSyncError: true,
      enabledForSync: true
    }
  });

  const failuresLast24h = await prisma.alertEvent.groupBy({
    by: ['locationId'],
    where: {
      businessId,
      createdAt: { gte: new Date(Date.now() - 24*60*60*1000) },
      type: 'integration_sync_failed',
      ...(locationIds?.length ? { locationId: { in: locationIds } } : {})
    },
    _count: { _all: true }
  });

  // 2) Funnel counts
  const ingested = await prisma.review.count({ where: reviewWhere });

  const drafted = await prisma.draftReply.count({
    where: {
      businessId,
      createdAt: { gte: start, lte: end },
      review: locationIds?.length ? { locationId: { in: locationIds } } : undefined
    }
  });

  const approved = await prisma.draftReply.count({
    where: {
      businessId,
      approvedAt: { gte: start, lte: end },
      review: locationIds?.length ? { locationId: { in: locationIds } } : undefined
    }
  });

  const postedManual = await prisma.draftReply.count({
    where: {
      businessId,
      postedAt: { gte: start, lte: end },
      status: 'posted_manual',
      review: locationIds?.length ? { locationId: { in: locationIds } } : undefined
    }
  });

  // 3) Ratings & sentiment
  const ratingAgg = await prisma.review.aggregate({
    where: reviewWhere,
    _avg: { rating: true },
    _count: { _all: true }
  });

  const negativeCount = await prisma.review.count({
    where: {
      ...reviewWhere,
      OR: [
        { sentiment: 'negative' },
        { rating: { lte: 2 } }
      ]
    }
  });

  // 4) Response time percentiles (median)
  // Prisma doesn’t do percentile; use raw SQL for P50 or compute in JS from selected rows.
  // Fast path: raw SQL with PERCENTILE_CONT.
  const responseP50 = await prisma.$queryRaw`
    SELECT
      PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (dr."createdAt" - r."createdAt"))/3600) AS p50_draft_hours,
      PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (dr."approvedAt" - r."createdAt"))/3600) AS p50_approved_hours,
      PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (dr."postedAt" - r."createdAt"))/3600) AS p50_posted_hours
    FROM "DraftReply" dr
    JOIN "Review" r ON r.id = dr."reviewId"
    WHERE dr."businessId" = ${businessId}
      AND r."createdAt" BETWEEN ${start} AND ${end}
      ${locationIds?.length ? prisma.$queryRaw`AND r."locationId" = ANY(${locationIds})` : prisma.$queryRaw``}
      AND (dr."createdAt" IS NOT NULL);
  `;

  // 5) Alerts
  const alertsByDay = await prisma.$queryRaw`
    SELECT DATE_TRUNC('day', "createdAt") AS day, type, COUNT(*)::int AS count
    FROM "AlertEvent"
    WHERE "businessId" = ${businessId}
      AND "createdAt" BETWEEN ${start} AND ${end}
      ${locationIds?.length ? prisma.$queryRaw`AND "locationId" = ANY(${locationIds})` : prisma.$queryRaw``}
    GROUP BY 1,2
    ORDER BY 1 ASC;
  `;

  return { locations, syncHealth: ..., funnel: ..., ratings: ..., response: ..., alerts: ... };
}

3) RBAC + VALIDATION

- Validation (Zod) example:
  const QuerySchema = z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
    locationIds: z.string().optional()
  });
  Parse locationIds by split(',').filter(Boolean)

- RBAC:
  - getSessionUser()
  - find membership: prisma.userBusinessMembership.findFirst({ where: { userId, businessId } })
  - if none => 403

4) CSV FORMAT

Columns:
- date (YYYY-MM-DD)
- locationId
- locationName
- ingested
- avgRating
- negativeCount
- negativeShare
- drafted
- approved
- postedManual
- p50DraftHours
- p50ApprovedHours
- p50PostedHours
- alerts
- syncFailuresLast24h (for context)

5) CUSTOMER-FACING ONBOARDING EMAIL (to support pilots)

Subject: Connect your Google reviews + start auto-drafting replies

Body:
Hi {{FirstName}},

Thanks for trying AI Review Reply & Reputation Autopilot. To get your review replies drafting automatically, please:

1) Log in and connect Google Business Profile: {{AppURL}}/app/integrations/google
2) Select the locations you want synced.
3) Add escalation recipients for negative reviews (who should be alerted): {{AppURL}}/app/admin/escalation

You can also import Yelp reviews via CSV or screenshot upload here:
{{AppURL}}/app/reviews/import

Website (for reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support email: agent_bob_replit+review-bot@agentmail.to

Once connected, new reviews will appear in your draft queue for one-click approval.

Best,
Bob

This artifact provides the concrete page/API structure, query logic, and CSV schema to complete the dashboard and to support the next pilot run without introducing paid dependencies.