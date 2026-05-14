# Metrics Dashboard Implementation (Next.js + Prisma) — Routes, API, and KPI Definitions

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:25:35.072Z

---

Below is build-ready implementation content for the in-app Metrics Dashboard, matching the shipped MVP workflow. It includes route structure, API contract, KPI definitions, and core Prisma query logic. It assumes existing tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, and membership RBAC.

1) ROUTES
A. UI page
- /app/admin/metrics/page.tsx
  - Server component reads query params: from, to, locationId (optional)
  - Fetches from internal API helper (direct function call preferred to avoid HTTP): getMetrics({businessId, from, to, locationId})
  - Renders sections:
    1) Sync Health
       - Table: Location name, enabled, lastSyncAt, lastError, lastReviewUpdateTime watermark, lastIngestedAt (max Review.createdAt in range)
    2) Activation Funnel (range totals + per-day trend)
       - Totals: ingested, drafted, approved, posted
       - Rates: drafted/ingested, approved/drafted, posted/approved
       - Median response time (hours) for posted replies
    3) Alerts + Reports
       - Alerts: total alerts, negative-review alerts, sync-failure alerts
       - Reports: weekly reports generated, last sent at
       - Button: Export CSV (links to /api/admin/metrics.csv?...)

B. APIs
- /api/admin/metrics (GET)
- /api/admin/metrics.csv (GET)
Both endpoints:
- Require authenticated user
- Require membership in the requested business
- Validate query params with zod

2) QUERY PARAMS + VALIDATION (shared)
- from: ISO date string, default = now-30d
- to: ISO date string, default = now
- locationId: optional string
Constraints:
- Max range 180 days (to prevent expensive scans)
- from < to
- If locationId present, it must belong to business

3) KPI DEFINITIONS (CONSISTENT, EXPLICIT)
- Ingested reviews: count of Review where businessId matches AND createdAt between [from,to] AND (locationId filter if set)
  Note: includes all sources (google/yelp/manual/email/ocr).
- Drafted: count of DraftReply where createdAt between [from,to] and linked Review matches filters.
  We treat “drafted” as having at least one DraftReply created.
- Approved: count of DraftReply where approvedAt between [from,to].
  If multiple drafts exist for a review, count approvals as the number of approved drafts (and also provide unique-review approval count in CSV).
- Posted: count of DraftReply where postedAt between [from,to] AND status in {posted_manual, posted_api}.
- Response time (hours): for posted drafts only: postedAt - approvedAt (fallback: postedAt - createdAt if approvedAt missing). Exclude rejected/unposted.
- Negative share: percent of ingested reviews in range where (sentiment=negative OR rating<=2).
- Top themes: based on Review.categoryLabels frequency (service/price/staff/etc.).

4) CORE METRICS FUNCTION (server-side, called by UI and APIs)
Pseudo-code in TypeScript (Prisma) showing the approach; replace names to match your schema exactly:

export async function getMetrics({ businessId, from, to, locationId }: {
  businessId: string;
  from: Date;
  to: Date;
  locationId?: string;
}) {
  const reviewWhere: any = {
    businessId,
    createdAt: { gte: from, lte: to },
    ...(locationId ? { locationId } : {}),
  };

  // 1) Totals
  const ingested = await prisma.review.count({ where: reviewWhere });

  const drafted = await prisma.draftReply.count({
    where: {
      review: reviewWhere,
      createdAt: { gte: from, lte: to }
    }
  });

  const approved = await prisma.draftReply.count({
    where: {
      review: reviewWhere,
      approvedAt: { gte: from, lte: to },
      status: { in: ["approved", "posted_manual", "posted_api"] }
    }
  });

  const posted = await prisma.draftReply.count({
    where: {
      review: reviewWhere,
      postedAt: { gte: from, lte: to },
      status: { in: ["posted_manual", "posted_api"] }
    }
  });

  // 2) Negative share and rating stats
  const ratingAgg = await prisma.review.aggregate({
    where: reviewWhere,
    _avg: { rating: true },
    _count: { _all: true }
  });

  const negativeCount = await prisma.review.count({
    where: {
      ...reviewWhere,
      OR: [{ sentiment: "negative" }, { rating: { lte: 2 } }]
    }
  });

  // 3) Response time distribution (posted only)
  // Use raw SQL for median for speed/accuracy.
  const responseTimes = await prisma.$queryRawUnsafe<{ median_hours: number | null }[]>(
    `SELECT
      percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM ("postedAt" - COALESCE("approvedAt","createdAt"))) / 3600.0) AS median_hours
     FROM "DraftReply" dr
     JOIN "Review" r ON r.id = dr."reviewId"
     WHERE r."businessId" = $1
       ${locationId ? 'AND r."locationId" = $2' : ''}
       AND dr."postedAt" BETWEEN $3 AND $4
       AND dr.status IN ('posted_manual','posted_api')
       AND dr."postedAt" IS NOT NULL;`,
    ...(locationId ? [businessId, locationId, from, to] : [businessId, from, to])
  );

  // 4) Themes: category label counts (simple in-app reduce)
  const themeRows = await prisma.review.findMany({
    where: reviewWhere,
    select: { categoryLabels: true }
  });
  const themeCounts: Record<string, number> = {};
  for (const row of themeRows) {
    for (const label of row.categoryLabels ?? []) {
      themeCounts[label] = (themeCounts[label] ?? 0) + 1;
    }
  }
  const topThemes = Object.entries(themeCounts)
    .sort((a,b) => b[1]-a[1])
    .slice(0, 8)
    .map(([theme, count]) => ({ theme, count }));

  // 5) Sync health (locations)
  const locations = await prisma.location.findMany({
    where: { businessId, ...(locationId ? { id: locationId } : {}) },
    select: {
      id: true,
      name: true,
      syncEnabled: true,
      lastGbpSyncAt: true,
      lastGbpSyncError: true,
      lastGbpReviewSyncUpdateTime: true
    }
  });

  // 6) Alerts and reports
  const alertsTotal = await prisma.alertEvent.count({
    where: {
      businessId,
      createdAt: { gte: from, lte: to },
      ...(locationId ? { locationId } : {})
    }
  });

  const alertsByType = await prisma.alertEvent.groupBy({
    by: ["type"],
    where: {
      businessId,
      createdAt: { gte: from, lte: to },
      ...(locationId ? { locationId } : {})
    },
    _count: { _all: true }
  });

  const reportsSent = await prisma.weeklyReport.count({
    where: {
      businessId,
      sentAt: { gte: from, lte: to }
    }
  });

  // 7) Per-day series for chart/table
  // Use raw SQL date bucket to avoid N+1.
  const daily = await prisma.$queryRawUnsafe<any[]>(
    `WITH days AS (
       SELECT generate_series(date_trunc('day',$1::timestamptz), date_trunc('day',$2::timestamptz), interval '1 day') AS day
     )
     SELECT
       d.day,
       COALESCE(r.ingested,0) as ingested,
       COALESCE(dr.drafted,0) as drafted,
       COALESCE(ap.approved,0) as approved,
       COALESCE(po.posted,0) as posted,
       COALESCE(al.alerts,0) as alerts
     FROM days d
     LEFT JOIN (
       SELECT date_trunc('day',"createdAt") as day, count(*) as ingested
       FROM "Review" WHERE "businessId"=$3 ${locationId ? 'AND "locationId"=$4' : ''}
       AND "createdAt" BETWEEN $1 AND $2
       GROUP BY 1
     ) r USING(day)
     LEFT JOIN (
       SELECT date_trunc('day',dr."createdAt") as day, count(*) as drafted
       FROM "DraftReply" dr
       JOIN "Review" r ON r.id=dr."reviewId"
       WHERE r."businessId"=$3 ${locationId ? 'AND r."locationId"=$4' : ''}
       AND dr."createdAt" BETWEEN $1 AND $2
       GROUP BY 1
     ) dr USING(day)
     LEFT JOIN (
       SELECT date_trunc('day',dr."approvedAt") as day, count(*) as approved
       FROM "DraftReply" dr
       JOIN "Review" r ON r.id=dr."reviewId"
       WHERE r."businessId"=$3 ${locationId ? 'AND r."locationId"=$4' : ''}
       AND dr."approvedAt" BETWEEN $1 AND $2
       GROUP BY 1
     ) ap USING(day)
     LEFT JOIN (
       SELECT date_trunc('day',dr."postedAt") as day, count(*) as posted
       FROM "DraftReply" dr
       JOIN "Review" r ON r.id=dr."reviewId"
       WHERE r."businessId"=$3 ${locationId ? 'AND r."locationId"=$4' : ''}
       AND dr."postedAt" BETWEEN $1 AND $2
       AND dr.status IN ('posted_manual','posted_api')
       GROUP BY 1
     ) po USING(day)
     LEFT JOIN (
       SELECT date_trunc('day',"createdAt") as day, count(*) as alerts
       FROM "AlertEvent" WHERE "businessId"=$3 ${locationId ? 'AND "locationId"=$4' : ''}
       AND "createdAt" BETWEEN $1 AND $2
       GROUP BY 1
     ) al USING(day)
     ORDER BY d.day ASC;`,
    ...(locationId ? [from, to, businessId, locationId] : [from, to, businessId])
  );

  return {
    range: { from, to, locationId: locationId ?? null },
    totals: {
      ingested,
      drafted,
      approved,
      posted,
      avgRating: ratingAgg._avg.rating,
      negativeShare: ingested ? negativeCount / ingested : 0,
      medianResponseHours: responseTimes?.[0]?.median_hours ?? null
    },
    topThemes,
    locations,
    alerts: {
      total: alertsTotal,
      byType: alertsByType.map(r => ({ type: r.type, count: r._count._all }))
    },
    reports: { sent: reportsSent },
    daily
  };
}

5) CSV EXPORT FORMAT (/api/admin/metrics.csv)
Return one row per day with:
- day (YYYY-MM-DD)
- locationId (or “ALL”)
- ingested, drafted, approved, posted
- avgRatingDay (optional if you want; otherwise omit)
- negativeCountDay, negativeShareDay
- alertsDay
- reportsSentDay
This is designed so a business owner can open in Sheets and validate quickly.

6) UI COPY SNIPPETS
Header: “Metrics (Last 30 days)”
Subheader: “Use this to verify syncing, monitor response SLAs, and spot reputation trends. Export CSV for audits.”
Sync health empty state: “No locations connected yet. Connect Google Business Profile or import reviews to start.”

This implementation intentionally avoids paid charting libraries and computes everything from your existing database tables, making it reliable to ship in the 7-day MVP window and useful for customer onboarding/troubleshooting.