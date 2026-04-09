# MVP Metrics Dashboard — Build-Ready Implementation (Routes, APIs, Queries, UI)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T01:45:10.322Z

---

Goal
Ship /app/admin/metrics to give each business owner/admin a single page to confirm the system is working (sync health), see operational throughput (ingest→draft→approve→post funnel), monitor SLA/negative-review handling, and export a CSV for debugging.

Constraints
- No new paid tools or accounts.
- Use existing DB tables: Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog, WeeklyReport.
- Must support multi-location filtering and date ranges.
- RBAC: only members of the business can view.

URL + legitimacy reference
If you need to reference the product publicly (docs/help link), use:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Definitions (consistent KPIs)
Date range: [start, end] inclusive; default last 30 days.
Location filter: optional; if none, include all locations in business.

Review lifecycle
- Ingested: Review.createdAt within range (or Review.ingestedAt if present; if not present, use createdAt as MVP proxy).
- Drafted: DraftReply.createdAt within range AND DraftReply.reviewId belongs to filtered locations.
- Approved: DraftReply.status transitioned to APPROVED within range.
- Posted: DraftReply.postedAt within range OR status in {POSTED_MANUAL, POSTED_API} with postedAt set.

Response time
- responseTimeHours = postedAt - Review.createdAt (or ingestedAt if you add later). Exclude rejected/unposted.
- For SLA: negative reviews = (Review.rating <= 2 OR sentiment == 'negative').

Sync health
- Per location: last sync timestamp (Location.lastGbpReviewSyncUpdateTime or Integration.lastSyncAt if you store it), last error (Integration.lastError or most recent AlertEvent of type INTEGRATION_SYNC_FAILED).
- Display: status badge: Healthy (sync within 24h), Degraded (24–72h), Stale (>72h), Error (lastError present).

Routes / Pages
1) Page
- /app/admin/metrics
Server component page with client subcomponents for filters.

2) APIs
- GET /api/admin/metrics?businessId=...&start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=optional
Returns JSON metrics + time series.

- GET /api/admin/metrics.csv?businessId=...&start=...&end=...&locationId=optional
Returns a flat row export for reviews with joined draft/reply status.

Security / RBAC (required)
- Validate session user.
- Check UserBusinessMembership where userId + businessId.
- If not a member, 403.
- Validate query params with zod.

API JSON shape (recommendation)
{
  range: { start, end },
  filters: { locationId: string | null },
  syncHealth: {
    locations: Array<{ locationId, name, source: 'google'|'yelp'|'manual', lastSyncAt: string|null, lastError: string|null, status: 'healthy'|'degraded'|'stale'|'error' }>
  },
  funnel: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    approvalRate: number,   // approved/drafted
    postRate: number        // posted/approved
  },
  reputation: {
    avgRating: number|null,
    reviewVolume: number,
    negativeShare: number,
    medianResponseHours: number|null,
    p90ResponseHours: number|null
  },
  alerts: {
    total: number,
    negativeReviewAlerts: number,
    integrationErrors: number,
    ocrFailures: number
  },
  themes: Array<{ label: string, count: number }>,
  timeseries: {
    byWeek: Array<{ weekStart: string, reviewCount: number, avgRating: number|null, postedCount: number, medianResponseHours: number|null }>
  }
}

Prisma query plan (efficient enough for MVP)
Assumptions: Review has fields: businessId, locationId, rating, sentiment, categoryLabels (string[]/json), createdAt.
DraftReply has: reviewId, businessId, status, createdAt, approvedAt?, postedAt?, postedBy?.
AlertEvent has: businessId, type, createdAt.
Location has: id, name, businessId, lastGbpReviewSyncUpdateTime.
Integration has: businessId, provider, lastSyncAt?, lastError?.

1) Base where clauses
const locationWhere = locationId ? { locationId } : { locationId: { in: locationIdsForBusiness } };
const reviewWhere = { businessId, ...locationWhere, createdAt: { gte: start, lte: end } };

2) Funnel counts
- ingested = prisma.review.count({ where: reviewWhere })
- drafted = prisma.draftReply.count({ where: { businessId, createdAt: { gte: start, lte: end }, review: reviewWhere } })
- approved = prisma.draftReply.count({ where: { businessId, status: 'APPROVED', approvedAt: { gte: start, lte: end }, review: reviewWhere } })
- posted = prisma.draftReply.count({ where: { businessId, postedAt: { gte: start, lte: end }, status: { in: ['POSTED_MANUAL','POSTED_API'] }, review: reviewWhere } })
If you don’t store approvedAt yet, fallback to AuditLog events for action='draft.approve'. But for speed, add approvedAt on DraftReply when approving.

3) Reputation metrics
- avgRating = prisma.review.aggregate({ where: reviewWhere, _avg: { rating: true } })
- negativeShare = negativeCount / reviewCount
negativeCount = prisma.review.count({ where: { ...reviewWhere, OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }] } })

4) Response time distribution (median/p90)
Fetch posted drafts joined to reviews within range.
const posted = await prisma.draftReply.findMany({
  where: { businessId, postedAt: { gte: start, lte: end }, status: { in: ['POSTED_MANUAL','POSTED_API'] }, review: reviewWhere },
  select: { postedAt: true, review: { select: { createdAt: true } } }
});
Compute hours array in JS and derive median and p90. MVP acceptable volume (local businesses). If performance becomes an issue, move to SQL percentile later.

5) Themes (top labels)
If Review.categoryLabels is a string array:
Fetch reviews within range select categoryLabels and count labels in JS.
Alternatively if you store primaryCategory, can groupBy.

6) Alerts
prisma.alertEvent.count({ where: { businessId, createdAt: { gte: start, lte: end }, ...(type filter) } })
Types mapping example:
- negativeReviewAlerts: type in ['NEGATIVE_REVIEW','SLA_BREACH']
- integrationErrors: type in ['INTEGRATION_SYNC_FAILED','INTEGRATION_AUTH_FAILED']
- ocrFailures: type in ['OCR_FAILED']

7) Time series by week
MVP approach (simple): fetch all reviews in range with createdAt+rating and bucket by ISO week in JS; compute reviewCount and avgRating.
For postedCount/medianResponseHours: bucket posted drafts similarly.

CSV export (/api/admin/metrics.csv)
Columns:
- reviewId, source, locationName, reviewCreatedAt, rating, sentiment, categories, authorName
- reviewText (optional; if privacy, omit)
- draftStatus, draftedAt, approvedAt, postedAt, responseTimeHours
- escalationTriggered (boolean), alertCount

Implementation notes (Next.js App Router)
- Add server route handlers under /app/api/admin/metrics/route.ts and /app/api/admin/metrics.csv/route.ts
- Use zod for query validation.
- Use a shared function getBusinessContext(userId, businessId) for RBAC and location list.
- Add caching headers: no-store.

UI layout (/app/admin/metrics)
Header:
- Business selector (if user belongs to multiple)
- Date range picker (Last 7/30/90, custom)
- Location dropdown (All + each location)

Sections:
1) Sync Health table
Columns: Location | Source | Status | Last Sync | Last Error (truncated) | Action (link to Integrations)

2) Funnel cards
- Ingested | Drafted | Approved | Posted
- Rates: Approval rate, Post rate
Each card links to /app/reviews with pre-applied filters.

3) Reputation KPIs
- Avg rating, Review volume, Negative share
- Median response time, P90 response time

4) Alerts
Stacked counts by type with link to /app/admin/alerts (optional later; for MVP link to filtered table on same page).

5) Top themes
List of top category labels with counts.

6) Export
Button: “Download CSV” hits metrics.csv endpoint with same filters.

Instrumentation
- Log a metrics.request event with businessId, userId, filters, timing.
- Sentry captureException on query failures.

Acceptance checklist
- Member-only access enforced.
- Filters work: date range + location.
- Metrics match definitions and remain stable across reloads.
- CSV download opens in Google Sheets.
- Links from metrics to review queue filters work.

Owner execution notes
No spend required. If you later decide to add richer charts, you can use a free charting lib (e.g., Recharts) with no account creation. The MVP can ship with plain tables + sparklines and still be useful for pilots.
