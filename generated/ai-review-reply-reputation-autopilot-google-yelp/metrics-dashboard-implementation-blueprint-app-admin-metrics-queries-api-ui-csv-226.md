# Metrics Dashboard Implementation Blueprint (/app/admin/metrics) — Queries, API, UI, CSV

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:15:59.712Z

---

Goal
Ship an in-app metrics dashboard that helps (a) you debug sync/automation health and (b) prove value to customers: responsiveness, rating/negative share, and volume. Must use existing DB tables and be reliable.

Primary URL
Website for legitimacy in any comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Scope: /app/admin/metrics
Sections (top → bottom)
1) Filters: date range (default last 30 days), location multi-select (default all), source filter (google/yelp/manual, default all), timezone display.
2) KPI Cards:
   - Reviews ingested
   - Drafts generated
   - Approved
   - Posted (manual/API)
   - Median response time (hours) for posted replies
   - Negative share (% of reviews rating<=2 OR sentiment=negative)
3) Sync Health:
   - Per location: lastSyncAt, lastErrorAt, lastErrorMsg, consecutiveFailures (derived), lastReviewUpdateTime watermark
4) Funnel table + conversion rates
5) Alerts summary: negative-review alerts + OCR failures + sync failures
6) Export CSV buttons: Metrics Summary CSV, Reviews CSV (optional), Alerts CSV

Data definitions (must be consistent)
A) Ingested review: Review.createdAt within date range (or Review.ingestedAt if exists; otherwise use createdAt + review source timestamp). If you have Review.ingestedAt, use that for operational funnel; use createdAt for reputation trend.
B) Drafted: DraftReply exists for Review (createdAt within range) OR AuditLog event draft_created. Prefer DraftReply.createdAt.
C) Approved: DraftReply.status == 'approved'. Approval timestamp derived from AuditLog where action='draft_approved' OR DraftReply.approvedAt if present.
D) Posted:
   - Manual: DraftReply.status in ('posted_manual','posted') with postedAt.
   - API: DraftReply.status='posted_api' if present.
E) Response time:
   response_time_hours = (postedAt - Review.createdAt) OR (postedAt - Review.ingestedAt for operational SLA). Pick ONE and label it. Recommended:
   - Operational response time: postedAt - ingestedAt (if available)
   - Customer-facing response time: postedAt - createdAt (review timestamp)
   For MVP, compute using Review.createdAt because it is always present.
   Exclude: Drafts rejected/never posted.
F) Negative review:
   negative = (Review.rating <= 2) OR (Review.sentiment == 'negative').
G) SLA breach:
   breach if negative AND now - Review.createdAt > thresholdHours AND not posted.

API routes
1) GET /api/admin/metrics?businessId=...&from=...&to=...&locationIds=...&sources=...
Returns JSON:
{
  kpis: { ingested, drafted, approved, posted, medianResponseHours, negativeShare },
  funnel: { ingested, drafted, approved, posted, draftedRate, approvedRate, postedRate },
  syncHealth: [{ locationId, locationName, source, lastSyncAt, lastErrorAt, lastErrorMsg, lastWatermarkUpdateTime }],
  alerts: { total, byType: { negative_review: n, sync_failed: n, ocr_failed: n }, rows: [...] },
  trends: { daily: [{ date, reviewCount, avgRating, negativeCount, postedCount, medianResponseHours }] }
}

2) GET /api/admin/metrics.csv (same query params)
Returns a flattened CSV with header rows for each section or separate endpoints:
- /api/admin/metrics/summary.csv
- /api/admin/metrics/alerts.csv
MVP: one CSV with sections separated by blank line and a section label row.

RBAC and validation
- Require authenticated user.
- Require UserBusinessMembership for businessId.
- Validate inputs with zod:
  - from/to ISO dates (limit max 180 days)
  - locationIds array optional
  - sources enum array optional
- Always apply businessId scoping.

Prisma aggregation approach (suggested)
Inputs:
const from = new Date(fromISO); const to = new Date(toISO);

1) Base where filters:
reviewWhere = {
  businessId,
  createdAt: { gte: from, lt: to },
  ...(locationIds?.length ? { locationId: { in: locationIds } } : {}),
  ...(sources?.length ? { source: { in: sources } } : {})
}

2) Ingested count:
prisma.review.count({ where: reviewWhere })

3) Drafted count:
prisma.draftReply.count({
  where: {
    review: reviewWhere
  }
})

4) Approved count:
prisma.draftReply.count({
  where: {
    status: 'approved',
    review: reviewWhere
  }
})

5) Posted count:
prisma.draftReply.count({
  where: {
    status: { in: ['posted_manual','posted_api','posted'] },
    review: reviewWhere
  }
})

6) Negative share:
negativeCount = prisma.review.count({ where: { ...reviewWhere, OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }] } })
negativeShare = negativeCount / ingested

7) Response time (median)
- Query posted drafts with join to review timestamps:
const posted = await prisma.draftReply.findMany({
  where: { status: { in: ['posted_manual','posted_api','posted'] }, postedAt: { not: null }, review: reviewWhere },
  select: { postedAt: true, review: { select: { createdAt: true } } }
})
Compute hours array and median in JS. (MVP acceptable; optimize later via SQL percentile_cont if needed.)

8) Trends (daily)
Option A (fast MVP): fetch reviews in range with select { createdAt, rating, sentiment } and bucket by date in JS.
Option B (SQL): raw query with date_trunc('day', createdAt) group by.

9) Sync health
Use Location fields you already have:
- Location.lastGbpSyncAt
- Location.lastGbpSyncError
- Location.lastGbpReviewSyncUpdateTime
Also include Yelp/manual if you store last sync.
Query:
prisma.location.findMany({ where: { businessId, ...(locationIds filter) }, select: { id,name, source, lastGbpSyncAt,lastGbpSyncError,lastGbpReviewSyncUpdateTime } })

10) Alerts summary
prisma.alertEvent.findMany({
  where: { businessId, createdAt: { gte: from, lt: to }, ...(locationIds filter) },
  orderBy: { createdAt: 'desc' },
  take: 50,
  select: { id,type,severity,createdAt,locationId,message,reviewId }
})
Also count by type via groupBy:
prisma.alertEvent.groupBy({ by: ['type'], _count: true, where: ... })

UI build plan (Next.js App Router)
- /app/admin/metrics/page.tsx (Server Component)
  - reads searchParams: from,to,locationIds,sources
  - calls internal fetch to /api/admin/metrics (or directly runs queries via server action)
  - renders:
    - <MetricsFilters /> (client)
    - <KpiCards />
    - <SyncHealthTable />
    - <FunnelTable />
    - <TrendsChart /> (optional; can start with a simple table)
    - <AlertsTable />
    - Export buttons linking to /api/admin/metrics.csv with same params

Minimal components (copy/paste oriented)
- components/admin/metrics/KpiCards.tsx
- components/admin/metrics/SyncHealthTable.tsx
- components/admin/metrics/FunnelTable.tsx
- components/admin/metrics/AlertsTable.tsx
- components/admin/metrics/MetricsFilters.tsx (client; updates query string)

Instrumentation
- Log metrics endpoint runtime + row counts.
- Add Sentry breadcrumb with businessId + date range.

Acceptance checklist
- Loads under 2s for 30 days of data for a typical SMB (<=5k reviews).
- Filters work and are business-scoped.
- KPIs match weekly report numbers (where overlapping).
- CSV download opens in Google Sheets.

Optional fast-follow
- Add “SLA breaches right now” widget: list negative reviews older than threshold with no posted reply.
- Add “Top themes” from existing category labels within range.
