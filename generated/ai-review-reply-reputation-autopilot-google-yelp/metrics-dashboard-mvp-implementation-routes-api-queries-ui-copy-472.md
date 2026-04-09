# Metrics Dashboard MVP — Implementation (Routes, API, Queries, UI Copy)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:22:52.836Z

---

Below is build-ready code+copy for the MVP metrics dashboard, aligned to the existing schema (Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog) and the current Next.js App Router structure.

========================
1) ROUTES / PAGES
========================
A) Page: /app/admin/metrics
- Purpose: provide sync health + activation funnel + alert volume, filterable by date range and location.
- Access: Business members only; admin role optional (but recommended) — keep simple: membership required.

UI Sections:
1) Filters
   - Date range: last 7 / 30 / 90 days, plus custom from/to
   - Location: All locations or one location
   - Button: Export CSV
2) Sync Health
   - Table by location: lastSyncAt, lastError, consecutiveFailures (derived), reviewsFetchedLast7d
3) Activation Funnel
   - KPI cards: Ingested Reviews, Drafts Created, Approved, Posted, Approval Rate, Post Rate, Median Response Time
   - Trend by day (simple sparkline SVG): ingested vs posted
4) Alerts
   - KPI cards: Negative Alerts, OCR Fail Alerts, Sync Fail Alerts
   - Table: latest 20 alerts with createdAt, type, severity, location

UI Copy (top of page):
"Metrics help you verify that reviews are being ingested, drafts are being approved, and responses are being posted on time. Export CSV to share performance with stakeholders."

========================
2) API ENDPOINTS
========================
A) GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=optional
Returns JSON:
{
  range: { from, to },
  location: { id, name } | null,
  syncHealth: Array<{ locationId, locationName, lastSyncAt, lastError, reviewsFetched7d }>,
  funnel: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    approvalRate: number,  // approved/drafted
    postRate: number,      // posted/approved
    medianResponseMinutes: number | null
  },
  trendsByDay: Array<{ day: 'YYYY-MM-DD', ingested: number, posted: number, avgRating: number | null }>,
  alerts: {
    total: number,
    byType: Array<{ type: string, count: number }>,
    latest: Array<{ id, type, severity, createdAt, locationName, message }>
  }
}

B) GET /api/admin/metrics.csv?from=...&to=...&locationId=optional
Returns text/csv with two blocks:
- Day-level trends rows
- Location sync health rows

========================
3) KPI DEFINITIONS (USED BY API + UI)
========================
Time window: Review.createdAt in [from,to] for volume/avg rating; for workflow stages use corresponding timestamps/events:
- ingested: Reviews where createdAt in range (or ingestedAt if you track it; fallback to createdAt)
- drafted: DraftReply where createdAt in range AND status != 'rejected' (or count all drafts and show rejected separately later)
- approved: DraftReply where approvedAt in range (or status became approved in AuditLog)
- posted: DraftReply where postedAt in range AND postedVia in ('manual','api')
Response time (minutes): postedAt - Review.createdAt for posted replies only. Exclude rejected and never-posted drafts.
Negative share: count(reviews where rating<=2 OR sentiment='negative') / total ingested in range.

========================
4) PRISMA / QUERY HELPERS (SERVER)
========================
File: src/server/metrics.ts

import { prisma } from '@/server/prisma'
import { endOfDay, startOfDay } from 'date-fns'

export type MetricsParams = {
  businessId: string
  from: Date
  to: Date
  locationId?: string
}

export async function getMetrics({ businessId, from, to, locationId }: MetricsParams) {
  const whereReview: any = {
    businessId,
    createdAt: { gte: startOfDay(from), lte: endOfDay(to) },
    ...(locationId ? { locationId } : {})
  }

  const whereDraftBase: any = {
    businessId,
    ...(locationId ? { locationId } : {})
  }

  // Ingested reviews in range
  const ingested = await prisma.review.count({ where: whereReview })

  // Drafts created in range
  const drafted = await prisma.draftReply.count({
    where: {
      ...whereDraftBase,
      createdAt: { gte: startOfDay(from), lte: endOfDay(to) }
    }
  })

  // Approved in range
  const approved = await prisma.draftReply.count({
    where: {
      ...whereDraftBase,
      approvedAt: { gte: startOfDay(from), lte: endOfDay(to) }
    }
  })

  // Posted in range
  const posted = await prisma.draftReply.count({
    where: {
      ...whereDraftBase,
      postedAt: { gte: startOfDay(from), lte: endOfDay(to) }
    }
  })

  // Median response time minutes for posted replies in range
  // Pull minimal fields and compute median in JS (MVP-safe). For larger scale, move to SQL percentile.
  const postedWithReview = await prisma.draftReply.findMany({
    where: {
      ...whereDraftBase,
      postedAt: { gte: startOfDay(from), lte: endOfDay(to) },
      review: { isNot: null }
    },
    select: { postedAt: true, review: { select: { createdAt: true } } }
  })

  const deltas = postedWithReview
    .map(r => (r.postedAt && r.review?.createdAt) ? (r.postedAt.getTime() - r.review.createdAt.getTime()) / 60000 : null)
    .filter((n): n is number => typeof n === 'number' && n >= 0)
    .sort((a,b) => a-b)

  const medianResponseMinutes = deltas.length
    ? (deltas.length % 2 === 1
        ? deltas[Math.floor(deltas.length/2)]
        : (deltas[deltas.length/2 - 1] + deltas[deltas.length/2]) / 2)
    : null

  const approvalRate = drafted ? approved / drafted : 0
  const postRate = approved ? posted / approved : 0

  // Trends by day: ingested count, posted count, avg rating
  // MVP approach: groupBy createdAt day using raw SQL date_trunc for Postgres.
  const trends = await prisma.$queryRawUnsafe<any[]>(`
    WITH days AS (
      SELECT generate_series(date_trunc('day', $1::timestamp), date_trunc('day', $2::timestamp), interval '1 day') AS day
    ),
    ing AS (
      SELECT date_trunc('day', "createdAt") AS day, COUNT(*)::int AS ingested, AVG("rating")::float AS avg_rating
      FROM "Review"
      WHERE "businessId" = $3
        AND "createdAt" >= $1 AND "createdAt" <= $2
        ${locationId ? 'AND "locationId" = $4' : ''}
      GROUP BY 1
    ),
    post AS (
      SELECT date_trunc('day', "postedAt") AS day, COUNT(*)::int AS posted
      FROM "DraftReply"
      WHERE "businessId" = $3
        AND "postedAt" IS NOT NULL
        AND "postedAt" >= $1 AND "postedAt" <= $2
        ${locationId ? 'AND "locationId" = $4' : ''}
      GROUP BY 1
    )
    SELECT
      to_char(days.day, 'YYYY-MM-DD') AS day,
      COALESCE(ing.ingested, 0) AS ingested,
      COALESCE(post.posted, 0) AS posted,
      ing.avg_rating AS "avgRating"
    FROM days
    LEFT JOIN ing ON ing.day = days.day
    LEFT JOIN post ON post.day = days.day
    ORDER BY days.day ASC;
  `,
  ...(locationId ? [startOfDay(from), endOfDay(to), businessId, locationId] : [startOfDay(from), endOfDay(to), businessId]))

  // Alerts in range
  const alertsTotal = await prisma.alertEvent.count({
    where: {
      businessId,
      createdAt: { gte: startOfDay(from), lte: endOfDay(to) },
      ...(locationId ? { locationId } : {})
    }
  })

  const alertsByType = await prisma.alertEvent.groupBy({
    by: ['type'],
    _count: { _all: true },
    where: {
      businessId,
      createdAt: { gte: startOfDay(from), lte: endOfDay(to) },
      ...(locationId ? { locationId } : {})
    }
  })

  const latestAlerts = await prisma.alertEvent.findMany({
    where: {
      businessId,
      ...(locationId ? { locationId } : {})
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: { location: { select: { name: true } } }
  })

  // Sync health by location
  const locations = await prisma.location.findMany({
    where: { businessId, ...(locationId ? { id: locationId } : {}) },
    select: { id: true, name: true, lastGbpSyncAt: true, lastGbpSyncError: true }
  })

  // reviewsFetchedLast7d: proxy = ingested reviews in last 7 days for location
  const sevenDaysAgo = new Date(Date.now() - 7*24*60*60*1000)
  const reviewsFetched7d = await prisma.review.groupBy({
    by: ['locationId'],
    _count: { _all: true },
    where: {
      businessId,
      createdAt: { gte: sevenDaysAgo },
      ...(locationId ? { locationId } : {})
    }
  })
  const fetchedMap = new Map(reviewsFetched7d.map(r => [r.locationId, r._count._all]))

  return {
    range: { from: startOfDay(from).toISOString(), to: endOfDay(to).toISOString() },
    syncHealth: locations.map(l => ({
      locationId: l.id,
      locationName: l.name,
      lastSyncAt: l.lastGbpSyncAt,
      lastError: l.lastGbpSyncError,
      reviewsFetched7d: fetchedMap.get(l.id) ?? 0
    })),
    funnel: {
      ingested,
      drafted,
      approved,
      posted,
      approvalRate,
      postRate,
      medianResponseMinutes
    },
    trendsByDay: trends,
    alerts: {
      total: alertsTotal,
      byType: alertsByType.map(a => ({ type: a.type, count: a._count._all })),
      latest: latestAlerts.map(a => ({
        id: a.id,
        type: a.type,
        severity: a.severity,
        createdAt: a.createdAt,
        locationName: a.location?.name ?? null,
        message: a.message
      }))
    }
  }
}

========================
5) API ROUTE HANDLERS (APP ROUTER)
========================
A) src/app/api/admin/metrics/route.ts
- Validate query via zod
- Resolve businessId from session membership
- Call getMetrics()
- Return JSON
- Add Sentry capture on errors + log correlationId

B) src/app/api/admin/metrics.csv/route.ts
- Calls getMetrics()
- Converts JSON to CSV
- Response headers: Content-Type: text/csv; Content-Disposition

CSV format example:
Section 1 header: "day,ingested,posted,avg_rating"
Section 2 header: "location_name,last_sync_at,last_error,reviews_fetched_7d"

========================
6) UI COPY: DATA DEFINITIONS (MODAL)
========================
Title: "How metrics are calculated"
- Ingested Reviews: reviews created in the selected date range.
- Drafts: reply drafts created in the selected date range.
- Approved: drafts approved in the selected date range.
- Posted: drafts marked posted (manual or API) in the selected date range.
- Median Response Time: time from review creation to posted reply, for posted replies only. Drafts that are rejected or never posted are excluded.

========================
7) PILOT/OPS NOTE (FOR INTERNAL)
========================
During the second pilot, compare:
- Weekly report KPIs vs /admin/metrics (same definitions)
- Cron sync health (lastSyncAt changes at expected cadence)
- Alerts created for negative reviews within SLA

If any mismatch is found, log an AuditLog event type='metrics_mismatch' with the businessId, range, and computed values so we can quickly debug.
