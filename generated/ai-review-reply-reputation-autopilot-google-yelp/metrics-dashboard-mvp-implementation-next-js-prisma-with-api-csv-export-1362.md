# Metrics Dashboard MVP — Implementation (Next.js + Prisma) with API + CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T14:38:54.199Z

---

Below is build-ready implementation content for the Metrics Dashboard in the existing Next.js (App Router) + Prisma app. It includes: (1) KPI definitions, (2) API contract, (3) aggregation logic outline, and (4) UI structure for /app/admin/metrics.

1) KPI DEFINITIONS (used consistently across API + UI)
- Ingested Reviews: Review records created within [startDate, endDate] for the selected business, optionally filtered by locationId.
- Drafted: Reviews with >=1 DraftReply created within window OR Review.draftStatus transitioned via AuditLog event 'draft_created' within window.
- Approved: DraftReply where status=APPROVED and approvedAt within window.
- Posted: DraftReply where postedAt not null and status in (POSTED_MANUAL, POSTED_API) and postedAt within window.
- Response Time (median & p90): For posted replies only, compute postedAt - Review.createdAt (exclude rejected drafts and never-posted approvals). Also compute “time-to-first-draft” as DraftReply.createdAt - Review.createdAt for operational insight.
- Negative Share: Percentage of ingested reviews whose sentiment is negative OR rating <= 2 (use the same predicate as SLA alerts).
- Top Themes: Count of category labels (service/price/staff/quality/cleanliness/wait_time/other) for ingested reviews, sorted desc.

2) API CONTRACT
GET /api/admin/metrics?businessId=...&start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=optional
Returns JSON:
{
  range: { start, end },
  filters: { businessId, locationId },
  syncHealth: {
    integrations: [{ id, provider, enabled, lastSyncAt, lastError, updatedAt }],
    locations: [{ id, name, gbpLocationId, enabled, lastGbpReviewSyncUpdateTime, lastSyncAt, lastSyncError, consecutiveSyncFailures, stale: boolean }]
  },
  funnel: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    approvalRate: number,
    postRate: number
  },
  kpis: {
    avgRating: number | null,
    negativeShare: number,
    medianResponseMinutes: number | null,
    p90ResponseMinutes: number | null,
    medianTimeToDraftMinutes: number | null
  },
  trends: {
    byDay: [{ date, ingested, posted, avgRating }]
  },
  topThemes: [{ label, count }],
  alerts: {
    total: number,
    byType: [{ type, count }],
    recent: [{ id, type, createdAt, severity, locationName, reviewId }]
  }
}

GET /api/admin/metrics.csv uses the same filters and returns a flat CSV with sections separated by header rows, suitable for spreadsheet import.

3) AGGREGATION LOGIC (Prisma)
- Guardrails:
  - Validate start/end via Zod; cap range to max 90 days to prevent heavy scans.
  - Ensure user is a member of the business (UserBusinessMembership).

Core queries (illustrative; align with your exact schema fields):
A) Ingested:
prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: start, lte: end } } })
B) Drafted:
prisma.draftReply.groupBy({ by: ['reviewId'], where: { businessId, locationId?, createdAt: { gte: start, lte: end } } }) then count groups
C) Approved/Posted:
prisma.draftReply.count({ where: { businessId, locationId?, approvedAt: { gte: start, lte: end }, status: 'APPROVED' } })
prisma.draftReply.count({ where: { businessId, locationId?, postedAt: { gte: start, lte: end }, status: { in: ['POSTED_MANUAL','POSTED_API'] } } })
D) Response times:
Fetch posted DraftReplies with review.createdAt joined (select minimal fields), compute deltas in app code, then median/p90.
E) Avg rating and negative share:
prisma.review.aggregate({ _avg: { rating: true }, where: { businessId, locationId?, createdAt: range } })
prisma.review.count({ where: { businessId, locationId?, createdAt: range, OR: [{ sentiment: 'negative' }, { rating: { lte: 2 } }] } })
F) Top themes:
If categories stored as string[] on Review, fetch within window selecting categories, then count in app.
G) Trends by day:
Use prisma.review.groupBy({ by: ['createdDate'], _count, _avg: { rating }, where: ... }) if you store a date bucket; otherwise compute in app by iterating results.
H) Alerts:
prisma.alertEvent.count({ where: { businessId, locationId?, createdAt: range } })
prisma.alertEvent.groupBy({ by: ['type'], _count: { _all: true }, where: ... })
prisma.alertEvent.findMany({ where: ..., orderBy: { createdAt: 'desc' }, take: 20 })
I) Sync health:
prisma.integration.findMany({ where: { businessId } })
prisma.location.findMany({ where: { businessId, id: locationId? } })
Compute stale = lastSyncAt older than 24h OR missing watermark for enabled locations.

4) UI: /app/admin/metrics
- Header: Business selector (if multi-business), date range picker, optional location dropdown, buttons: Refresh, Export CSV.
- Section 1: Sync Health
  - Table: Location | Provider | Enabled | Last Sync | Last Watermark | Status (OK/Stale/Failing) | Last Error
- Section 2: Activation Funnel
  - Cards: Ingested, Drafted, Approved, Posted
  - Derived rates: approvalRate=approved/drafted, postRate=posted/approved
- Section 3: KPIs
  - Avg rating, negative share, median response time, p90 response time, median time-to-first-draft
- Section 4: Trends
  - Simple table or sparkline-ready data by day (ingested/posted/avgRating)
- Section 5: Top Themes
  - Ranked list with counts
- Section 6: Alerts
  - Total, byType, recent list

Customer-legitimacy note (optional small footer):
“Learn more about the product: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | Support: agent_bob_replit+review-bot@agentmail.to”

This implementation is intentionally lightweight (no new infra, no paid analytics). It uses existing AuditLog/Review/DraftReply/AlertEvent/Location/Integration data to provide a reliable operational dashboard for pilots, onboarding, and ongoing SLA monitoring.