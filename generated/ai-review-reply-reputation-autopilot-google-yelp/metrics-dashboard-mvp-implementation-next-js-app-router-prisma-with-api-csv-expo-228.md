# Metrics Dashboard MVP — Implementation (Next.js App Router + Prisma) with API + CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:18:13.277Z

---

Goal
Ship /app/admin/metrics to show (1) Sync Health, (2) Activation Funnel KPIs, (3) Alerts volume, and (4) Review sentiment/theme breakdown for a date range and (optional) location filter. Must use existing tables: Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog.

Routes (App Router)
1) UI Page
- /app/admin/metrics/page.tsx
  - Server Component shell: loads user + membership + businessId, renders filters + summary cards + tables.
  - Fetches metrics from /api/admin/metrics via server-side fetch (no client secret).

2) JSON API
- /app/api/admin/metrics/route.ts (GET)
  Query params:
  - businessId (required)
  - start (ISO date, required)
  - end (ISO date, required)
  - locationId (optional)
  - source (optional: 'google'|'yelp'|'manual'|'email'|'ocr')

  Response shape:
  {
    range: { start, end },
    filters: { businessId, locationId?, source? },
    syncHealth: {
      locations: Array<{ locationId, name, enabled, lastSyncAt, lastError, lastErrorAt, consecutiveFailures, lastGbpReviewSyncUpdateTime }>,
      integrationStatus: Array<{ integrationId, provider, enabled, lastSyncAt, lastError, lastErrorAt }>
    },
    funnel: {
      ingested: number,
      tagged: number,
      drafted: number,
      approved: number,
      posted: number,
      rejected: number,
      avgTimeToFirstDraftMins: number|null,
      avgTimeToApprovalMins: number|null,
      avgTimeToPostedMins: number|null,
      p50TimeToPostedMins: number|null,
      p90TimeToPostedMins: number|null
    },
    reputation: {
      reviewCount: number,
      avgRating: number|null,
      negativeShare: number|null,
      sentimentCounts: { positive: number, neutral: number, negative: number },
      themeCounts: Array<{ theme: string, count: number }>
    },
    alerts: {
      total: number,
      byType: Array<{ type: string, count: number }>,
      bySeverity: Array<{ severity: string, count: number }>
    }
  }

3) CSV Export
- /app/api/admin/metrics.csv/route.ts (GET)
  Same params as JSON.
  Output: a flat CSV for quick debugging and customer sharing.
  Suggested CSV tabs (single file):
  - Summary row(s)
  - Location sync rows
  - Daily counts rows (optional; if easy)

RBAC (Required)
- Only users with UserBusinessMembership for businessId can access.
- Enforce in both JSON and CSV routes.

Validation
Use zod in both routes:
- businessId: string uuid
- start/end: parseable date; ensure start <= end; max range e.g. 180 days to prevent heavy queries.
- locationId optional uuid
- source optional enum

KPI Definitions (consistent + simple)
- Ingested: Reviews createdAt within [start,end] for business (+ optional location/source).
- Tagged: Reviews where sentiment is not null AND taggedAt within range OR review created within range and sentiment present (choose one and document). Simpler: count reviews in range with sentiment not null.
- Drafted: DraftReply createdAt within range (and its Review matches filters).
- Approved: DraftReply status == 'approved' and approvedAt within range.
- Posted: DraftReply postedAt within range (manual or API); if you track posted status field, also require status in ('posted_manual','posted_api').
- Rejected: DraftReply status == 'rejected' and updatedAt within range.

Response time metrics (mins)
- Time to first draft: DraftReply.createdAt - Review.createdAt (use earliest draft per review).
- Time to approval: DraftReply.approvedAt - Review.createdAt (use approved draft).
- Time to posted: DraftReply.postedAt - Review.createdAt (use posted draft). Exclude never-posted.
- p50/p90: compute from array of mins for posted items (JS-side percentile is fine for MVP).

Data Access / Prisma Query Plan
Assumptions: tables have at least these fields:
- Review: id, businessId, locationId, source, createdAt, rating, sentiment, categories (string[]), rawPayload
- DraftReply: id, reviewId, status, createdAt, approvedAt, postedAt
- Location: id, businessId, name, enabled, lastSyncAt, lastError, lastErrorAt, consecutiveFailures, lastGbpReviewSyncUpdateTime
- Integration: id, businessId, provider, enabled, lastSyncAt, lastError, lastErrorAt
- AlertEvent: id, businessId, locationId?, type, severity, createdAt

Filters helper
const reviewWhere = {
  businessId,
  createdAt: { gte: start, lte: end },
  ...(locationId ? { locationId } : {}),
  ...(source ? { source } : {})
}

1) Reputation aggregates
- reviewCount: prisma.review.count({ where: reviewWhere })
- avgRating: prisma.review.aggregate({ where: reviewWhere, _avg: { rating: true }})
- sentimentCounts:
  prisma.review.groupBy({ where: reviewWhere, by: ['sentiment'], _count: { _all: true }})
- negativeShare: negativeCount / reviewCount (null if reviewCount==0)
- themeCounts:
  If categories is string[]: easiest is fetch only categories for reviews in range (select categories) and count in JS.
  prisma.review.findMany({ where: reviewWhere, select: { categories: true }}) then tally.

2) Funnel aggregates
- ingested: reviewCount (same)
- drafted: prisma.draftReply.count({ where: { review: reviewWhere } })
- approved: prisma.draftReply.count({ where: { review: reviewWhere, status: 'approved', approvedAt: { gte: start, lte: end } }})
- posted: prisma.draftReply.count({ where: { review: reviewWhere, postedAt: { gte: start, lte: end } }})
- rejected: prisma.draftReply.count({ where: { review: reviewWhere, status: 'rejected', updatedAt: { gte: start, lte: end } }})
- avg times:
  Fetch posted/approved/first-draft timing pairs using join selection:
  prisma.review.findMany({ where: reviewWhere, select: {
     createdAt: true,
     drafts: { select: { createdAt: true, approvedAt: true, postedAt: true, status: true }, orderBy: { createdAt: 'asc' } }
  }})
  Then compute:
  - firstDraftCreatedAt = drafts[0]?.createdAt
  - approvedAt = first draft with approvedAt
  - postedAt = first draft with postedAt
  Compute deltas in minutes; average and percentiles in JS.
  (MVP-friendly; optimize later with SQL window functions.)

3) Alerts aggregates
const alertWhere = {
  businessId,
  createdAt: { gte: start, lte: end },
  ...(locationId ? { locationId } : {})
}
- total: prisma.alertEvent.count({ where: alertWhere })
- byType: prisma.alertEvent.groupBy({ where: alertWhere, by: ['type'], _count: { _all: true }})
- bySeverity: prisma.alertEvent.groupBy({ where: alertWhere, by: ['severity'], _count: { _all: true }})

4) Sync health panel
- locations list:
  prisma.location.findMany({ where: { businessId }, select: { id, name, enabled, lastSyncAt, lastError, lastErrorAt, consecutiveFailures, lastGbpReviewSyncUpdateTime }})
- integration status:
  prisma.integration.findMany({ where: { businessId }, select: { id, provider, enabled, lastSyncAt, lastError, lastErrorAt }})

UI Spec (minimal, shippable)
Top filter bar:
- Date range picker (default last 7 days)
- Location dropdown (All + each location)
- Source dropdown (All + google/yelp/manual/email/ocr)
- Button: Export CSV (hits /api/admin/metrics.csv with same params)

Cards row:
- Reviews (count + avg rating)
- Negative share (%)
- Avg time to post (mins)
- Posted replies (count)

Tables:
1) Sync Health Table
Columns: Location | Enabled | Last Sync | Last Error | Consecutive Failures | GBP Watermark
2) Funnel Table
Rows: Ingested, Drafted, Approved, Posted, Rejected with counts + conversion rate (e.g., posted/ingested)
3) Alerts Table
Two small tables: by type, by severity
4) Themes
List top themes with counts (service, price, staff, quality, cleanliness, wait_time, other)

CSV Export Format
Header section:
- BusinessId, Start, End, LocationId, Source
- ReviewCount, AvgRating, NegativeShare, Drafted, Approved, Posted, AvgTimeToPostedMins
Then:
- “LOCATION_SYNC” rows: locationId,name,enabled,lastSyncAt,lastError,lastErrorAt,consecutiveFailures,lastGbpReviewSyncUpdateTime
- “ALERTS_BY_TYPE” rows: type,count
- “ALERTS_BY_SEVERITY” rows: severity,count
- “THEMES” rows: theme,count

Instrumentation
- Add structured log on metrics endpoint: businessId, range, filters, durationMs.
- Capture exceptions to Sentry with tags: route=admin-metrics.

Owner-executable next steps
1) Implement /api/admin/metrics route with zod validation + RBAC membership check.
2) Implement /app/admin/metrics page using the JSON response; start with tables, add tiny charts later.
3) Implement /api/admin/metrics.csv; ensure proper Content-Type text/csv and filename.
4) Verify with a seeded dataset and with at least one real pilot business.

Customer communication note (if you later message pilots)
For legitimacy, point prospects to the live app URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1