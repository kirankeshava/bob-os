# MVP Metrics Dashboard — Implementation Blueprint (Next.js App Router + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T01:28:35.161Z

---

Overview
Ship /app/admin/metrics to answer three operational questions quickly: (1) Are integrations healthy and syncing? (2) Are reviews moving through the workflow (ingested → drafted → approved → posted)? (3) Are negative reviews being escalated within SLA?

Audience + Access
- Roles: Business admin + members (must be in UserBusinessMembership).
- Page is under /app/admin/metrics and only shows data for the current user’s businessId.

UI Structure (Single page with tabs)
1) Header controls
- Date range: last 7/30/90/custom
- Location filter: All locations or single locationId
- Source filter: google | yelp | manual (optional)
- Export CSV button (downloads the currently filtered dataset)

2) Tab: “Sync Health”
Cards + table:
- Card: Locations enabled (count)
- Card: Last successful sync (min/median/max across locations)
- Card: Locations with error in last 24h
- Table columns per location:
  - Location name
  - Source(s) enabled
  - lastSyncAt (integration/location)
  - lastSyncStatus (ok/error)
  - lastError (truncated)
  - reviewsFetched (last run, if stored) else “—”

Data sources:
- Location.lastGbpReviewSyncUpdateTime (already exists)
- Integration.lastSyncAt / lastError if present; otherwise compute from AuditLog events for sync runs
- AlertEvent where type = INTEGRATION_SYNC_FAILED

3) Tab: “Workflow Funnel”
Cards + small chart/table:
Definitions (important for consistency)
- Ingested: Review.createdAt within date range
- Drafted: DraftReply.createdAt within range AND DraftReply.reviewId belongs to filtered reviews
- Approved: DraftReply.approvedAt within range
- Posted: DraftReply.postedAt within range OR status in ['posted_manual','posted_api']
- Response time: postedAt - Review.createdAt (only for posted drafts)

Cards:
- Reviews ingested
- Drafts generated
- Drafts approved
- Drafts posted
- Median response time (hours)
- % responded within 24h and 72h

Tables:
- Breakdown by sentiment (positive/neutral/negative)
- Breakdown by category labels (service/price/staff/quality/cleanliness/wait_time/other)

4) Tab: “Alerts & SLA”
Cards:
- Negative reviews (count)
- Alerts sent (count)
- Median time-to-first-alert (AlertEvent.createdAt - Review.createdAt)
- Open escalations (DraftReply blocked by guardrails OR negative not yet approved)

Table:
- Recent alerts list: time, location, review snippet, alert type, recipients

API Design
A) GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...&source=...
Response JSON:
{
  filters: { from, to, locationId, source },
  syncHealth: { locationsEnabled, lastSyncAtMin, lastSyncAtMedian, lastSyncAtMax, locationsWithErrors24h, rows: [...] },
  funnel: { ingested, drafted, approved, posted, medianResponseHours, pResponded24h, pResponded72h, bySentiment: {...}, byCategory: {...} },
  alerts: { negativeReviews, alertsSent, medianTimeToAlertHours, recent: [...] }
}

B) GET /api/admin/metrics.csv with same query params
CSV contains row-level exports for debugging:
- reviews.csv: reviewId, source, location, rating, sentiment, categories, createdAt, draftedAt, approvedAt, postedAt, responseHours
- alerts.csv: alertId, type, createdAt, reviewId, location, recipients
(Implementation can export only reviews by default; alerts optional or separate endpoint.)

Prisma Query Skeletons (copy/paste ready)
Assumptions:
- Tables: Review { id, businessId, locationId, source, rating, text, createdAt, sentiment, categories[] }
- DraftReply { id, reviewId, businessId, status, createdAt, approvedAt, postedAt }
- AlertEvent { id, businessId, reviewId, type, createdAt, payload }
- Location { id, businessId, name, enabled, lastGbpReviewSyncUpdateTime }

1) Filter builder
- from/to are Date objects.
- baseWhereReview = { businessId, createdAt: { gte: from, lte: to }, ...(locationId && { locationId }), ...(source && { source }) }

2) Funnel counts
- ingested = prisma.review.count({ where: baseWhereReview })
- drafted = prisma.draftReply.count({ where: { businessId, createdAt: { gte: from, lte: to }, review: baseWhereReview } })
- approved = prisma.draftReply.count({ where: { businessId, approvedAt: { gte: from, lte: to }, review: baseWhereReview } })
- posted = prisma.draftReply.count({ where: { businessId, postedAt: { gte: from, lte: to }, status: { in: ['posted_manual','posted_api'] }, review: baseWhereReview } })

3) Response time distribution
Fetch posted drafts joined to review createdAt:
- const postedDrafts = await prisma.draftReply.findMany({
    where: { businessId, postedAt: { not: null, gte: from, lte: to }, status: { in: ['posted_manual','posted_api'] }, review: baseWhereReview },
    select: { postedAt: true, review: { select: { createdAt: true } } }
  })
Compute responseHours = (postedAt - review.createdAt)/3600000.
Compute median + % under 24/72 in JS.

4) Sentiment + Category breakdown
- bySentiment group:
  prisma.review.groupBy({ by: ['sentiment'], where: baseWhereReview, _count: { _all: true } })
- categories: if stored as string[]:
  fetch reviews select categories then reduce counts in JS.

5) Alerts
- alertsSent = prisma.alertEvent.count({ where: { businessId, createdAt: { gte: from, lte: to }, ...(locationId && { review: { locationId } }) } })
- recent = prisma.alertEvent.findMany({ where: { businessId, createdAt: { gte: from, lte: to } }, orderBy: { createdAt: 'desc' }, take: 50, include: { review: { select: { rating: true, text: true, location: { select: { name: true } } } } } })

6) Negative reviews count
- negativeReviews = prisma.review.count({ where: { ...baseWhereReview, OR: [{ sentiment: 'negative' }, { rating: { lte: 2 } }] } })

7) Sync health (per location)
If you track last sync results in AuditLog, query latest per location; otherwise minimal:
- locations = prisma.location.findMany({ where: { businessId, ...(locationId && { id: locationId }) }, select: { id: true, name: true, enabled: true, lastGbpReviewSyncUpdateTime: true } })
- errors24h = prisma.alertEvent.count({ where: { businessId, type: 'INTEGRATION_SYNC_FAILED', createdAt: { gte: new Date(Date.now()-24*3600*1000) } } })

CSV Export
CSV columns for reviews export:
reviewId,source,locationName,rating,sentiment,categories,createdAt,draftedAt,approvedAt,postedAt,responseHours
Implementation:
- Query reviews within range + join latest draft times via DraftReply (use findMany with include + orderBy createdAt desc, or a separate map keyed by reviewId).
- Convert to CSV with a simple serializer (no new dependency required; or use a small utility).

Next.js Routing Plan
- Page: app/app/admin/metrics/page.tsx (Server Component)
  - Renders filters (client component for date picker) and calls /api/admin/metrics via fetch with cache: 'no-store'.
- API: app/api/admin/metrics/route.ts
  - Validates query params, checks membership, runs aggregations, returns JSON.
- API: app/api/admin/metrics.csv/route.ts
  - Same validation, returns text/csv with Content-Disposition attachment.

Instrumentation
- Add correlationId per request and log timings for each aggregation section.
- On API errors, capture in Sentry with tags: businessId, locationId, from/to.

Owner Execution Note
No paid tools are required to ship this dashboard. If charts are desired without adding dependencies, use simple HTML tables + sparklines; otherwise add a lightweight chart lib later.

If you later want to use this dashboard for customer comms, link to the product site for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1