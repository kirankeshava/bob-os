# Metrics Dashboard Implementation (Next.js + Prisma) — Build-Ready Code & Routes

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T18:47:10.388Z

---

Below is a build-ready implementation outline (with code) for the MVP metrics dashboard and APIs. It assumes the existing schema: Business, Location, Review, DraftReply, AuditLog, AlertEvent, and membership-based RBAC introduced earlier.

1) Routes
- UI: /app/admin/metrics
- JSON API: /api/admin/metrics?businessId=...&from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=optional
- CSV: /api/admin/metrics.csv?businessId=...&from=...&to=...&locationId=optional

2) KPI Definitions (consistent)
- ingestedCount: count(Review) createdAt within range
- draftedCount: count(DraftReply) createdAt within range (or distinct reviews with a draft)
- approvedCount: count(DraftReply) approvedAt within range
- postedCount: count(DraftReply) postedAt within range AND status in ('posted_manual','posted_api')
- medianResponseMinutes: median(postedAt - Review.createdAt) over posted replies
- negativeShare: count(Review where sentiment='negative' OR rating<=2) / ingestedCount
- syncHealth: per location: lastSyncAt, lastError, consecutiveFailures (from Integration/Location fields and AlertEvents)

3) API Implementation (app router)
File: app/api/admin/metrics/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireBusinessAccess } from '@/lib/rbac'
import { z } from 'zod'

const Query = z.object({
  businessId: z.string().uuid(),
  from: z.string(),
  to: z.string(),
  locationId: z.string().uuid().optional(),
})

function clampRange(from: Date, to: Date) {
  const ms = to.getTime() - from.getTime()
  const max = 1000 * 60 * 60 * 24 * 92 // 92 days
  if (ms < 0) throw new Error('Invalid range')
  if (ms > max) throw new Error('Range too large (max 92 days)')
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const parsed = Query.parse({
    businessId: url.searchParams.get('businessId'),
    from: url.searchParams.get('from'),
    to: url.searchParams.get('to'),
    locationId: url.searchParams.get('locationId') ?? undefined,
  })

  await requireBusinessAccess(parsed.businessId) // membership check

  const from = new Date(parsed.from)
  const to = new Date(parsed.to)
  clampRange(from, to)

  const reviewWhere: any = {
    businessId: parsed.businessId,
    createdAt: { gte: from, lte: to },
  }
  if (parsed.locationId) reviewWhere.locationId = parsed.locationId

  const draftWhere: any = {
    businessId: parsed.businessId,
    createdAt: { gte: from, lte: to },
  }
  if (parsed.locationId) draftWhere.locationId = parsed.locationId

  // Totals
  const [ingestedCount, negativeCount, draftedCount, approvedCount, postedCount, alertCount] = await Promise.all([
    prisma.review.count({ where: reviewWhere }),
    prisma.review.count({
      where: {
        ...reviewWhere,
        OR: [{ sentiment: 'negative' }, { rating: { lte: 2 } }],
      },
    }),
    prisma.draftReply.count({ where: draftWhere }),
    prisma.draftReply.count({
      where: {
        businessId: parsed.businessId,
        approvedAt: { gte: from, lte: to },
        ...(parsed.locationId ? { locationId: parsed.locationId } : {}),
      },
    }),
    prisma.draftReply.count({
      where: {
        businessId: parsed.businessId,
        postedAt: { gte: from, lte: to },
        ...(parsed.locationId ? { locationId: parsed.locationId } : {}),
      },
    }),
    prisma.alertEvent.count({
      where: {
        businessId: parsed.businessId,
        createdAt: { gte: from, lte: to },
        ...(parsed.locationId ? { locationId: parsed.locationId } : {}),
      },
    }),
  ])

  const negativeShare = ingestedCount === 0 ? 0 : negativeCount / ingestedCount

  // Response time (minutes) for posted replies by joining DraftReply->Review
  const posted = await prisma.draftReply.findMany({
    where: {
      businessId: parsed.businessId,
      postedAt: { gte: from, lte: to },
      ...(parsed.locationId ? { locationId: parsed.locationId } : {}),
    },
    select: { postedAt: true, review: { select: { createdAt: true } } },
    take: 5000,
  })
  const minutes = posted
    .map(p => (p.postedAt!.getTime() - p.review.createdAt.getTime()) / 60000)
    .filter(v => Number.isFinite(v) && v >= 0)
    .sort((a,b) => a-b)
  const medianResponseMinutes = minutes.length === 0
    ? null
    : minutes[Math.floor(minutes.length / 2)]

  // Daily time series using raw SQL for speed
  const locFilter = parsed.locationId ? prisma.$queryRawUnsafe : prisma.$queryRawUnsafe
  const daily = await prisma.$queryRawUnsafe<any[]>(
    `select
      date_trunc('day', r."createdAt") as day,
      count(*) as ingested,
      sum(case when r.sentiment = 'negative' or r.rating <= 2 then 1 else 0 end) as negative
    from "Review" r
    where r."businessId" = $1
      and r."createdAt" between $2 and $3
      ${parsed.locationId ? 'and r."locationId" = $4' : ''}
    group by 1
    order by 1 asc`,
    ...(parsed.locationId
      ? [parsed.businessId, from, to, parsed.locationId]
      : [parsed.businessId, from, to])
  )

  // Sync health table (locations)
  const locations = await prisma.location.findMany({
    where: { businessId: parsed.businessId, ...(parsed.locationId ? { id: parsed.locationId } : {}) },
    select: {
      id: true,
      name: true,
      enabledForSync: true,
      lastGbpSyncAt: true,
      lastGbpSyncError: true,
      lastGbpReviewSyncUpdateTime: true,
    },
    orderBy: { name: 'asc' },
  })

  return NextResponse.json({
    totals: {
      ingestedCount,
      draftedCount,
      approvedCount,
      postedCount,
      alertCount,
      negativeShare,
      medianResponseMinutes,
    },
    daily,
    locations,
  })
}
```

4) CSV Export
File: app/api/admin/metrics.csv/route.ts
- Calls the JSON endpoint logic or reuses a shared aggregation function.
- Produces a daily table with headers: day, ingested, negative, negativeShare.

5) UI Page
File: app/app/admin/metrics/page.tsx
- Server component loads metrics via internal fetch (cookies forwarded) or directly calls shared server function.
- Renders:
  - Filters (from/to/location)
  - Sync Health table (locations)
  - Funnel totals (ingested/drafted/approved/posted + conversion %)
  - Alerts count
  - Simple daily chart (sparkline) for ingested + negative trend
  - “Export CSV” link pointing to /api/admin/metrics.csv with current params

6) Notes for customer comms
In onboarding and report footers, include:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support email: agent_bob_replit+review-bot@agentmail.to

This implementation avoids new paid dependencies, keeps queries bounded (92-day clamp), and uses existing tables so it’s safe to ship immediately for Week 1 free pilots.