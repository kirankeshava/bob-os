# Admin Metrics Dashboard (MVP) — Copy/Paste Implementation Plan + Code Skeleton (Next.js App Router + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T01:57:10.705Z

---

Below is a build-ready MVP metrics dashboard design for /app/admin/metrics that uses ONLY existing tables (Review, DraftReply, AuditLog, AlertEvent, Location, Business, UserBusinessMembership). It’s intentionally table-first (reliable) and can be enhanced later with charts.

--------------------------------------------------------------------
1) KPIs + Definitions (lock these so metrics are consistent)
--------------------------------------------------------------------
Time window: [start, end) (inclusive start, exclusive end). Default: last 30 days.
Filters: businessId (required), locationId (optional), source (optional: google|yelp|manual|email|ocr).

Entities:
- Review: ingested when created in DB.
- DraftReply: drafted when created (or when content first generated).
- Approved: DraftReply.status = 'approved'.
- Posted: DraftReply.status in ('posted_manual','posted_api') OR DraftReply.postedAt not null.

KPIs:
A) Sync Health
- lastSyncAt per Location (for GBP) and lastError (from Integration/Location fields you already store)
- reviewsIngested24h: count of Reviews created in last 24h
- syncFailures7d: count AlertEvent where type='integration_sync_failed' (or your equivalent) in last 7d

B) Funnel
- ingested: count Reviews.createdAt in window
- drafted: count DraftReply.createdAt in window (optionally join by reviewId)
- approved: count DraftReply.approvedAt in window OR status=approved and updatedAt in window
- posted: count DraftReply.postedAt in window
- approvalRate = approved/drafted
- postingRate = posted/approved

C) Response Time (hours)
- timeToFirstDraft: median/avg of (DraftReply.createdAt - Review.createdAt) for reviews with a draft
- timeToApproval: median/avg of (DraftReply.approvedAt - DraftReply.createdAt) where approvedAt exists
- timeToPost: median/avg of (DraftReply.postedAt - Review.createdAt) where postedAt exists
Important: exclude rejected drafts from approval/post metrics.

D) Reputation Snapshot
- avgRating: avg(Review.rating)
- negativeShare: % of reviews where (rating<=2 OR sentiment='negative')
- topThemes: group by category labels (service/price/staff/quality/cleanliness/wait_time/other) from your persisted tags

E) Alerts
- totalAlerts: count AlertEvent.createdAt in window
- negativeAlerts: count AlertEvent where type matches negative/escalation types
- SLA breaches: if you have an SLA rule, compute count of negative reviews not approved/posted within threshold (optional in MVP)

--------------------------------------------------------------------
2) Routes / Files
--------------------------------------------------------------------
A) Page route
- app/app/admin/metrics/page.tsx
- app/app/admin/metrics/MetricsFilters.tsx
- app/app/admin/metrics/MetricsTable.tsx

B) API routes
- app/api/admin/metrics/route.ts        (JSON)
- app/api/admin/metrics.csv/route.ts    (CSV download)

C) Shared server helpers
- lib/auth/rbac.ts                       (requireBusinessMember)
- lib/metrics/metrics.ts                 (all queries)
- lib/metrics/csv.ts                     (serialize)

--------------------------------------------------------------------
3) RBAC helper (server-side)
--------------------------------------------------------------------
lib/auth/rbac.ts

import { prisma } from '@/lib/prisma'
import { getSessionUser } from '@/lib/auth/session'

export async function requireBusinessMember(businessId: string) {
  const user = await getSessionUser()
  if (!user) throw new Error('UNAUTHORIZED')

  const membership = await prisma.userBusinessMembership.findFirst({
    where: { userId: user.id, businessId }
  })
  if (!membership) throw new Error('FORBIDDEN')
  return { user, membership }
}

--------------------------------------------------------------------
4) Query validation schema
--------------------------------------------------------------------
lib/metrics/schema.ts

import { z } from 'zod'

export const MetricsQuerySchema = z.object({
  businessId: z.string().min(1),
  start: z.string().datetime(),
  end: z.string().datetime(),
  locationId: z.string().optional(),
  source: z.enum(['google','yelp','manual','email','ocr']).optional(),
})

export type MetricsQuery = z.infer<typeof MetricsQuerySchema>

--------------------------------------------------------------------
5) Metrics queries (Prisma + $queryRaw for percentiles)
--------------------------------------------------------------------
lib/metrics/metrics.ts

import { prisma } from '@/lib/prisma'
import type { MetricsQuery } from './schema'

function whereReview(q: MetricsQuery) {
  return {
    businessId: q.businessId,
    ...(q.locationId ? { locationId: q.locationId } : {}),
    ...(q.source ? { source: q.source } : {}),
    createdAt: { gte: new Date(q.start), lt: new Date(q.end) },
  }
}

function whereDraft(q: MetricsQuery) {
  return {
    businessId: q.businessId,
    ...(q.locationId ? { locationId: q.locationId } : {}),
    createdAt: { gte: new Date(q.start), lt: new Date(q.end) },
  }
}

export async function getMetrics(q: MetricsQuery) {
  // Funnel counts
  const [ingested, drafted, approved, posted] = await Promise.all([
    prisma.review.count({ where: whereReview(q) }),
    prisma.draftReply.count({ where: whereDraft(q) }),
    prisma.draftReply.count({
      where: {
        ...whereDraft(q),
        status: 'approved',
      }
    }),
    prisma.draftReply.count({
      where: {
        businessId: q.businessId,
        ...(q.locationId ? { locationId: q.locationId } : {}),
        postedAt: { not: null },
        createdAt: { gte: new Date(q.start), lt: new Date(q.end) },
      }
    }),
  ])

  // Rating + negative share
  const ratingAgg = await prisma.review.aggregate({
    where: whereReview(q),
    _avg: { rating: true },
    _count: { _all: true },
  })

  const negativeCount = await prisma.review.count({
    where: {
      ...whereReview(q),
      OR: [
        { rating: { lte: 2 } },
        { sentiment: 'negative' },
      ]
    }
  })

  // Alerts
  const totalAlerts = await prisma.alertEvent.count({
    where: {
      businessId: q.businessId,
      ...(q.locationId ? { locationId: q.locationId } : {}),
      createdAt: { gte: new Date(q.start), lt: new Date(q.end) },
    }
  })

  // Top themes (assumes Review has categoryLabels string[] or json)
  // If your schema stores categories differently, adjust accordingly.
  const themeRows: Array<{ label: string; c: bigint }> = await prisma.$queryRaw`
    SELECT label, COUNT(*)::bigint as c
    FROM (
      SELECT UNNEST("categoryLabels") as label
      FROM "Review"
      WHERE "businessId" = ${q.businessId}
        AND "createdAt" >= ${new Date(q.start)}
        AND "createdAt" < ${new Date(q.end)}
        ${q.locationId ? prisma.$queryRaw`AND "locationId" = ${q.locationId}` : prisma.$queryRaw``}
        ${q.source ? prisma.$queryRaw`AND "source" = ${q.source}` : prisma.$queryRaw``}
    ) t
    GROUP BY label
    ORDER BY c DESC
    LIMIT 8;
  `

  // Response-time percentiles using SQL (median p50) if Postgres
  const responseTimes: Array<{
    metric: string;
    p50_hours: number | null;
    p90_hours: number | null;
    avg_hours: number | null;
  }> = await prisma.$queryRaw`
    WITH drafted AS (
      SELECT r.id as review_id,
             EXTRACT(EPOCH FROM (d."createdAt" - r."createdAt"))/3600.0 as hours
      FROM "Review" r
      JOIN "DraftReply" d ON d."reviewId" = r.id
      WHERE r."businessId" = ${q.businessId}
        AND r."createdAt" >= ${new Date(q.start)} AND r."createdAt" < ${new Date(q.end)}
        ${q.locationId ? prisma.$queryRaw`AND r."locationId" = ${q.locationId}` : prisma.$queryRaw``}
    ),
    posted AS (
      SELECT r.id as review_id,
             EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600.0 as hours
      FROM "Review" r
      JOIN "DraftReply" d ON d."reviewId" = r.id
      WHERE r."businessId" = ${q.businessId}
        AND d."postedAt" IS NOT NULL
        AND r."createdAt" >= ${new Date(q.start)} AND r."createdAt" < ${new Date(q.end)}
        ${q.locationId ? prisma.$queryRaw`AND r."locationId" = ${q.locationId}` : prisma.$queryRaw``}
    )
    SELECT 'timeToFirstDraft' as metric,
           percentile_cont(0.5) WITHIN GROUP (ORDER BY hours) as p50_hours,
           percentile_cont(0.9) WITHIN GROUP (ORDER BY hours) as p90_hours,
           AVG(hours) as avg_hours
    FROM drafted
    UNION ALL
    SELECT 'timeToPost' as metric,
           percentile_cont(0.5) WITHIN GROUP (ORDER BY hours) as p50_hours,
           percentile_cont(0.9) WITHIN GROUP (ORDER BY hours) as p90_hours,
           AVG(hours) as avg_hours
    FROM posted;
  `

  const approvalRate = drafted ? approved / drafted : null
  const postingRate = approved ? posted / approved : null
  const avgRating = ratingAgg._avg.rating ?? null
  const negativeShare = ratingAgg._count._all ? negativeCount / ratingAgg._count._all : null

  return {
    funnel: { ingested, drafted, approved, posted, approvalRate, postingRate },
    reputation: { avgRating, negativeShare, topThemes: themeRows.map(r => ({ label: r.label, count: Number(r.c) })) },
    alerts: { totalAlerts },
    responseTimes,
  }
}

--------------------------------------------------------------------
6) JSON API endpoint
--------------------------------------------------------------------
app/api/admin/metrics/route.ts

import { NextResponse } from 'next/server'
import { MetricsQuerySchema } from '@/lib/metrics/schema'
import { requireBusinessMember } from '@/lib/auth/rbac'
import { getMetrics } from '@/lib/metrics/metrics'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const parsed = MetricsQuerySchema.safeParse({
    businessId: searchParams.get('businessId'),
    start: searchParams.get('start'),
    end: searchParams.get('end'),
    locationId: searchParams.get('locationId') ?? undefined,
    source: (searchParams.get('source') ?? undefined) as any,
  })
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  await requireBusinessMember(parsed.data.businessId)
  const data = await getMetrics(parsed.data)
  return NextResponse.json(data)
}

--------------------------------------------------------------------
7) CSV export endpoint (minimal)
--------------------------------------------------------------------
app/api/admin/metrics.csv/route.ts

import { NextResponse } from 'next/server'
import { MetricsQuerySchema } from '@/lib/metrics/schema'
import { requireBusinessMember } from '@/lib/auth/rbac'
import { getMetrics } from '@/lib/metrics/metrics'

function toCSV(metrics: any) {
  const lines: string[] = []
  lines.push('section,key,value')
  const f = metrics.funnel
  lines.push(`funnel,ingested,${f.ingested}`)
  lines.push(`funnel,drafted,${f.drafted}`)
  lines.push(`funnel,approved,${f.approved}`)
  lines.push(`funnel,posted,${f.posted}`)
  lines.push(`funnel,approvalRate,${f.approvalRate ?? ''}`)
  lines.push(`funnel,postingRate,${f.postingRate ?? ''}`)

  const r = metrics.reputation
  lines.push(`reputation,avgRating,${r.avgRating ?? ''}`)
  lines.push(`reputation,negativeShare,${r.negativeShare ?? ''}`)

  for (const t of r.topThemes ?? []) {
    lines.push(`theme,${t.label},${t.count}`)
  }

  for (const rt of metrics.responseTimes ?? []) {
    lines.push(`responseTime,${rt.metric}.p50_hours,${rt.p50_hours ?? ''}`)
    lines.push(`responseTime,${rt.metric}.p90_hours,${rt.p90_hours ?? ''}`)
    lines.push(`responseTime,${rt.metric}.avg_hours,${rt.avg_hours ?? ''}`)
  }

  lines.push(`alerts,totalAlerts,${metrics.alerts.totalAlerts}`)
  return lines.join('\n')
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const parsed = MetricsQuerySchema.safeParse({
    businessId: searchParams.get('businessId'),
    start: searchParams.get('start'),
    end: searchParams.get('end'),
    locationId: searchParams.get('locationId') ?? undefined,
    source: (searchParams.get('source') ?? undefined) as any,
  })
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  await requireBusinessMember(parsed.data.businessId)
  const metrics = await getMetrics(parsed.data)
  const csv = toCSV(metrics)

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="metrics.csv"',
    }
  })
}

--------------------------------------------------------------------
8) Page UI (minimal, fast)
--------------------------------------------------------------------
app/app/admin/metrics/page.tsx (server component)
- Render filters (date range, location dropdown, source dropdown)
- Fetch /api/admin/metrics via server-side fetch with cache: no-store
- Render 3 cards (Funnel, Reputation, Response Times) + alerts summary
- Provide “Export CSV” link to /api/admin/metrics.csv with same query params

Implementation notes:
- Default start/end: last 30 days; compute on server to avoid TZ mismatch.
- If you track business timezone, render date presets in that TZ but send ISO timestamps.
- Keep charts optional: for MVP, tables are enough.

--------------------------------------------------------------------
9) Pilot readiness checklist (what dashboard should reveal)
--------------------------------------------------------------------
- Each enabled location shows a last sync timestamp within expected cadence.
- Funnel should show ingested > drafted > approved > posted.
- Negative share spikes should correlate with alert volume.

--------------------------------------------------------------------
10) Customer-facing legitimacy link (for any comms)
--------------------------------------------------------------------
When you reference the product in emails or onboarding, include:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

This plan requires no paid tooling. If you later want real charts quickly, you can add a lightweight chart lib, but MVP can ship with tables + CSV.
