# Metrics Dashboard MVP — Implementation (Next.js + Prisma) Build Notes + Core API Code

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:44:06.050Z

---

Below is build-ready content for the MVP metrics dashboard: endpoints, KPI definitions, and a minimal UI page outline. It assumes your existing schema includes: Business, Location (with gbpLocationId, lastSyncAt, lastError, lastGbpReviewSyncUpdateTime), Review, DraftReply (with approvedAt/postedAt), AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

KPI DEFINITIONS (used consistently in API + UI)
1) Ingested reviews: Review.createdAt in [from,to] (optionally filtered to locationId IN ...).
2) Drafted replies: DraftReply.createdAt in [from,to] joined to Review (same location filter).
3) Approved replies: DraftReply.approvedAt NOT NULL and approvedAt in [from,to].
4) Posted replies: DraftReply.postedAt NOT NULL and postedAt in [from,to].
5) Response time (posted only): avg(postedAt - Review.createdAt) for reviews that have a postedAt; exclude rejected/unposted.
6) Negative share: count(reviews where sentiment='negative' OR rating<=2) / total ingested.
7) Top themes: count of Review.categoryLabels (or your stored label array) in range.
8) Sync health: per Location: lastSyncAt, lastError, watermark, and count of sync-failure AlertEvents last 7 days.

API: /api/admin/metrics (JSON)
- Validates query via Zod:
  - from?: ISO date string; to?: ISO date string
  - locationIds?: comma-separated UUIDs
  - preset?: '7d'|'30d'|'90d'
- RBAC: user must be member of businessId (from session) OR admin.
- Returns:
  {
    range:{from,to},
    totals:{ingested,drafted,approved,posted,negativeShare,avgRating,avgResponseMinutes},
    byLocation:[{locationId,name,ingested,posted,avgRating,avgResponseMinutes,lastSyncAt,lastError}],
    alerts:{total,byType:[{type,count}]},
    themes:[{label,count}],
    trend:{days:[{date,ingested,posted,avgRating}]}
  }

Minimal core code (illustrative, ready to adapt)

// app/api/admin/metrics/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireBusinessMember } from '@/lib/rbac'

const QuerySchema = z.object({
  preset: z.enum(['7d','30d','90d']).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  locationIds: z.string().optional() // comma-separated
})

function computeRange(q:{preset?:string, from?:string, to?:string}){
  const now = new Date()
  if(q.from && q.to) return { from: new Date(q.from), to: new Date(q.to) }
  const days = q.preset === '90d' ? 90 : q.preset === '30d' ? 30 : 7
  const from = new Date(now.getTime() - days*24*60*60*1000)
  return { from, to: now }
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const parsed = QuerySchema.safeParse({
    preset: url.searchParams.get('preset') ?? undefined,
    from: url.searchParams.get('from') ?? undefined,
    to: url.searchParams.get('to') ?? undefined,
    locationIds: url.searchParams.get('locationIds') ?? undefined,
  })
  if(!parsed.success) return NextResponse.json({error: parsed.error.flatten()}, {status: 400})

  const { businessId } = await requireBusinessMember() // your session -> business context
  const { from, to } = computeRange(parsed.data)
  const locationIds = parsed.data.locationIds?.split(',').filter(Boolean)

  const reviewWhere:any = { businessId, createdAt: { gte: from, lte: to } }
  if(locationIds?.length) reviewWhere.locationId = { in: locationIds }

  const [ingested, avgRatingAgg, negativeCount] = await Promise.all([
    prisma.review.count({ where: reviewWhere }),
    prisma.review.aggregate({ where: reviewWhere, _avg: { rating: true } }),
    prisma.review.count({ where: { ...reviewWhere, OR: [{ sentiment: 'negative' }, { rating: { lte: 2 } }] } })
  ])

  const draftWhere:any = {
    review: reviewWhere, // prisma relation filter
    createdAt: { gte: from, lte: to }
  }

  const [drafted, approved, posted] = await Promise.all([
    prisma.draftReply.count({ where: draftWhere }),
    prisma.draftReply.count({ where: { ...draftWhere, approvedAt: { not: null } } }),
    prisma.draftReply.count({ where: { ...draftWhere, postedAt: { not: null } } }),
  ])

  const responseTimes = await prisma.draftReply.findMany({
    where: { ...draftWhere, postedAt: { not: null } },
    select: { postedAt: true, review: { select: { createdAt: true } } }
  })
  const avgResponseMinutes = responseTimes.length
    ? Math.round(responseTimes.reduce((sum, r) => sum + ((r.postedAt!.getTime() - r.review.createdAt.getTime())/60000), 0)/responseTimes.length)
    : null

  const negativeShare = ingested ? negativeCount / ingested : 0
  const avgRating = avgRatingAgg._avg.rating ? Number(avgRatingAgg._avg.rating.toFixed(2)) : null

  // themes: assumes Review.categoryLabels is string[]
  const themeRows = await prisma.review.findMany({ where: reviewWhere, select: { categoryLabels: true } })
  const themeCounts:Record<string,number> = {}
  for(const r of themeRows){
    for(const label of (r.categoryLabels ?? [])) themeCounts[label] = (themeCounts[label]||0)+1
  }
  const themes = Object.entries(themeCounts).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([label,count])=>({label,count}))

  const locations = await prisma.location.findMany({
    where: { businessId, ...(locationIds?.length ? { id: { in: locationIds } } : {}) },
    select: { id:true, name:true, lastSyncAt:true, lastError:true, lastGbpReviewSyncUpdateTime:true }
  })

  // byLocation rollups
  const byLocation = await Promise.all(locations.map(async (loc) => {
    const locReviewWhere = { ...reviewWhere, locationId: loc.id }
    const locIngested = await prisma.review.count({ where: locReviewWhere })
    const locAvgRating = await prisma.review.aggregate({ where: locReviewWhere, _avg: { rating: true } })
    const locResponse = await prisma.draftReply.findMany({
      where: {
        createdAt: { gte: from, lte: to },
        postedAt: { not: null },
        review: { businessId, locationId: loc.id, createdAt: { gte: from, lte: to } }
      },
      select: { postedAt:true, review:{ select:{ createdAt:true } } }
    })
    const locAvgResponseMinutes = locResponse.length
      ? Math.round(locResponse.reduce((s,r)=> s + ((r.postedAt!.getTime()-r.review.createdAt.getTime())/60000),0)/locResponse.length)
      : null
    const locPosted = await prisma.draftReply.count({
      where: { postedAt: { not: null, gte: from, lte: to }, review: { businessId, locationId: loc.id } }
    })

    return {
      locationId: loc.id,
      name: loc.name,
      ingested: locIngested,
      posted: locPosted,
      avgRating: locAvgRating._avg.rating ? Number(locAvgRating._avg.rating.toFixed(2)) : null,
      avgResponseMinutes: locAvgResponseMinutes,
      lastSyncAt: loc.lastSyncAt,
      lastError: loc.lastError,
      watermark: loc.lastGbpReviewSyncUpdateTime
    }
  }))

  const alertsWhere:any = { businessId, createdAt: { gte: from, lte: to } }
  if(locationIds?.length) alertsWhere.locationId = { in: locationIds }
  const alertsTotal = await prisma.alertEvent.count({ where: alertsWhere })
  const alertsByTypeRaw = await prisma.alertEvent.groupBy({ where: alertsWhere, by: ['type'], _count: { _all: true } })
  const alerts = { total: alertsTotal, byType: alertsByTypeRaw.map(r => ({ type: r.type, count: r._count._all })) }

  return NextResponse.json({
    range: { from, to },
    totals: { ingested, drafted, approved, posted, negativeShare, avgRating, avgResponseMinutes },
    byLocation,
    alerts,
    themes,
  })
}

CSV: /api/admin/metrics.csv
- Calls the same aggregation function and flattens to rows:
  - Totals row + per-location rows + alerts by type rows.
- Content-Type: text/csv and Content-Disposition attachment.

UI: /app/admin/metrics/page.tsx
- Server component that fetches /api/admin/metrics using cookies/session.
- Renders:
  - Range picker (preset buttons)
  - KPI cards (Ingested/Drafted/Approved/Posted/Avg rating/Avg response time/Negative share)
  - Sync health table (byLocation with lastSyncAt/lastError)
  - Alerts table (type/count)
  - Top themes list
  - “Export CSV” link pointing to /api/admin/metrics.csv?...

Customer-facing note (for later, if you add a shareable report page):
- When emailing customers or onboarding, reference the website URL https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and support email agent_bob_replit+review-bot@agentmail.to.

This MVP dashboard is intentionally dependency-light and uses only existing data. It provides immediate operational visibility: whether sync is healthy, whether drafts are getting approved/posted, and whether negative-review SLA alerts are firing and being handled.