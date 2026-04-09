# Metrics Dashboard Implementation (Next.js + Prisma) — Build-Ready Code & KPI Definitions

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T14:28:42.159Z

---

Below is the build-ready implementation outline (routes, API code structure, Prisma queries) for the in-app metrics dashboard. It is designed to work with the existing schema: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, and memberships.

WEBSITE + CONTACT (for any customer-facing links/emails)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

1) KPI DEFINITIONS (single source of truth)
Date window: [start, end] inclusive.
- Ingested reviews: Reviews where Review.createdAt is within the window (or Review.ingestedAt if you track it; if not, use createdAt + sourceUpdatedAt where applicable).
- Drafted: DraftReply records created in window OR DraftReply linked to a Review created in window (choose one; recommend DraftReply.createdAt within window).
- Approved: DraftReply.status transitioned to APPROVED within window (use DraftReply.approvedAt if present, else AuditLog event “draft.approve”).
- Posted: DraftReply.status in {POSTED_API, POSTED_MANUAL} with postedAt within window.
- Response time: For posted replies only: postedAt - Review.createdAt. Exclude rejected/unposted drafts.
- Negative share: count(Reviews where sentiment=NEGATIVE OR rating<=2) / total reviews in window.
- Sync health: per location last sync time + last error from Location.lastGbpReviewSyncUpdateTime and Integration health fields (or AuditLog “google.sync.*” events).

2) ROUTES
A) Page route
- app/app/admin/metrics/page.tsx
  - Server component reads query params: start, end, locationId (optional), source (optional)
  - Calls internal fetch to /api/admin/metrics?start=...&end=...&locationId=...
  - Renders three cards + tables: Sync Health, Funnel, Alerts.

B) API routes
- app/api/admin/metrics/route.ts (GET)
- app/api/admin/metrics.csv/route.ts (GET)
Both must enforce RBAC (UserBusinessMembership). Require businessId context (from session) or accept businessId only for superadmin.

3) /api/admin/metrics (JSON) — CODE SKELETON
TypeScript pseudo-code (drop into Next.js Route Handler). Assumes you have: getSessionUser(), requireBusinessAccess(), prisma, and zod.

// app/api/admin/metrics/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireBusinessAccess } from '@/lib/rbac'
import { withCorrelation } from '@/lib/observability'

const Query = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
  locationId: z.string().uuid().optional()
})

export const GET = withCorrelation(async (req, ctx) => {
  const url = new URL(req.url)
  const parsed = Query.safeParse({
    start: url.searchParams.get('start'),
    end: url.searchParams.get('end'),
    locationId: url.searchParams.get('locationId') ?? undefined
  })
  if (!parsed.success) return NextResponse.json({ error: 'invalid_query', details: parsed.error.flatten() }, { status: 400 })

  const { start, end, locationId } = parsed.data
  const startDt = new Date(start)
  const endDt = new Date(end)

  const { userId, businessId } = await requireBusinessAccess(req)

  const locationWhere = {
    businessId,
    ...(locationId ? { id: locationId } : {})
  }

  // 1) Sync health (per location)
  const locations = await prisma.location.findMany({
    where: locationWhere,
    select: {
      id: true,
      name: true,
      enabledForSync: true,
      lastGbpReviewSyncUpdateTime: true,
      lastSyncAt: true,
      lastSyncError: true
    },
    orderBy: { name: 'asc' }
  })

  // 2) Funnel counts
  const reviewWhere = {
    businessId,
    ...(locationId ? { locationId } : {}),
    createdAt: { gte: startDt, lte: endDt }
  }
  const draftWhere = {
    businessId,
    ...(locationId ? { locationId } : {}),
    createdAt: { gte: startDt, lte: endDt }
  }

  const [ingestedCount, draftedCount, approvedCount, postedCount] = await Promise.all([
    prisma.review.count({ where: reviewWhere }),
    prisma.draftReply.count({ where: draftWhere }),
    prisma.draftReply.count({ where: { ...draftWhere, status: 'APPROVED' } }),
    prisma.draftReply.count({ where: { ...draftWhere, status: { in: ['POSTED_MANUAL','POSTED_API'] } } })
  ])

  // 3) Negative share
  const negativeCount = await prisma.review.count({
    where: {
      ...reviewWhere,
      OR: [
        { sentiment: 'NEGATIVE' },
        { rating: { lte: 2 } }
      ]
    }
  })

  // 4) Response time summary (posted only)
  const postedDrafts = await prisma.draftReply.findMany({
    where: {
      ...draftWhere,
      status: { in: ['POSTED_MANUAL','POSTED_API'] },
      postedAt: { not: null }
    },
    select: {
      postedAt: true,
      review: { select: { createdAt: true } }
    }
  })

  const responseMinutes = postedDrafts
    .map(d => (d.postedAt!.getTime() - d.review.createdAt.getTime()) / 60000)
    .filter(n => Number.isFinite(n) && n >= 0)
    .sort((a,b) => a-b)

  const pct = (arr:number[], p:number) => {
    if (!arr.length) return null
    const idx = Math.floor((p/100) * (arr.length - 1))
    return arr[idx]
  }

  const responseTime = {
    count: responseMinutes.length,
    medianMinutes: pct(responseMinutes, 50),
    p90Minutes: pct(responseMinutes, 90)
  }

  // 5) Top themes (categories) within window
  // Assumes Review has categoryLabels string[] or similar field; adjust to your schema.
  const reviewsForThemes = await prisma.review.findMany({
    where: reviewWhere,
    select: { categoryLabels: true }
  })
  const themeCounts: Record<string, number> = {}
  for (const r of reviewsForThemes) {
    for (const label of (r.categoryLabels ?? [])) {
      themeCounts[label] = (themeCounts[label] ?? 0) + 1
    }
  }
  const topThemes = Object.entries(themeCounts)
    .sort((a,b) => b[1]-a[1])
    .slice(0, 8)
    .map(([theme, count]) => ({ theme, count }))

  // 6) Alerts volume + recent
  const alertWhere = {
    businessId,
    ...(locationId ? { locationId } : {}),
    createdAt: { gte: startDt, lte: endDt }
  }
  const [alertCount, recentAlerts] = await Promise.all([
    prisma.alertEvent.count({ where: alertWhere }),
    prisma.alertEvent.findMany({
      where: alertWhere,
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { id: true, type: true, severity: true, createdAt: true, message: true, reviewId: true, locationId: true }
    })
  ])

  return NextResponse.json({
    window: { start, end },
    funnel: { ingestedCount, draftedCount, approvedCount, postedCount },
    negative: { negativeCount, negativeShare: ingestedCount ? negativeCount/ingestedCount : 0 },
    responseTime,
    topThemes,
    alerts: { alertCount, recentAlerts },
    syncHealth: locations
  })
})

4) /api/admin/metrics.csv (CSV EXPORT)
Implementation: call the same aggregation function used by JSON endpoint, then serialize to CSV.
Recommended: flatten into multiple sections separated by blank lines, or create a single “wide” row with key/value pairs.
Example CSV (wide row):
- start,end,locationId,ingested,drafted,approved,posted,negativeCount,negativeShare,medianResponseMinutes,p90ResponseMinutes,topTheme1,topTheme1Count,...
Plus a second table for sync health:
- locationName,enabledForSync,lastSyncAt,lastSyncError,lastGbpReviewSyncUpdateTime

5) UI: /app/admin/metrics/page.tsx
- Filters at top: date range picker (default last 7 days), location dropdown (All + each location).
- Cards:
  - Sync Health: table with status pill (OK/Failing/Disabled), last sync timestamp, last error.
  - Activation Funnel: counts + conversion rates (drafted/ingested, approved/drafted, posted/approved).
  - Alerts: total count + recent alerts list with link to review detail.

6) INSTRUMENTATION
- Wrap API handlers with correlationId; log timings for each query group (sync, funnel, alerts).
- On any exception: Sentry.captureException + return { error: 'internal' }.

7) NOTES / EDGE CASES
- If you don’t have DraftReply.approvedAt/postedAt columns, derive from AuditLog events. For correctness long-term, consider adding these timestamps to DraftReply.
- If Review.createdAt is the original review time from source, response time is meaningful. For OCR/manual imports where createdAt might be unknown, allow null and exclude from response-time metrics.

This artifact is intended to be directly pasteable into the codebase with minor adjustments for your exact schema field names and existing auth helpers. It keeps the MVP reliable (simple queries, minimal joins), while giving enough visibility to support pilots and identify drop-offs in the ingest→post workflow.