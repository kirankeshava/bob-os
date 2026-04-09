# Metrics Dashboard Implementation (Next.js + Prisma) — /app/admin/metrics + /api/admin/metrics(.csv)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T08:08:27.377Z

---

Overview
This artifact describes the concrete implementation for the in-app metrics dashboard for the AI Review Reply & Reputation Autopilot MVP. It uses ONLY existing tables (Business, Location, Review, DraftReply, AuditLog, AlertEvent, WeeklyReport) and adds two admin endpoints: a JSON API and a CSV export.

Routes
1) UI Page
- /app/admin/metrics
  - Server Component page that loads filters from searchParams (start, end, locationIds)
  - Renders: Sync Health panel, Funnel KPIs, Response Time/SLA, Alerts table, Themes table, Per-location breakdown, CSV export button.

2) APIs
- GET /api/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationIds=loc1,loc2
  - Returns JSON payload for dashboard.
- GET /api/admin/metrics.csv?start=...&end=...&locationIds=...
  - Returns CSV with the same aggregates plus per-day time series.

Auth/RBAC
- Both endpoints require an authenticated user.
- Must be a member of the Business in context (UserBusinessMembership).
- The business context comes from the session-selected businessId (or first membership). If your app already stores “activeBusinessId” in session/cookie, use that. Otherwise, add a simple selector later.

Input validation (zod)
- start: optional string; default to last 30 days
- end: optional string; default to today
- locationIds: optional comma-separated; default all enabled locations
- Enforce max range (e.g., 180 days) to avoid heavy queries.

KPI Definitions (must match weekly report)
- Ingested: count of Review.createdAt within range
- Drafted: count of DraftReply.createdAt within range
- Approved: count of DraftReply.approvedAt within range
- Posted: count of DraftReply.postedAt within range OR status in {posted_manual, posted_api} with postedAt in range
- Response time (primary): time from Review.createdAt to DraftReply.postedAt for posted replies
- Response time (SLA ops): time from DraftReply.approvedAt to DraftReply.postedAt to catch “stuck after approval”
- Negative share: count(reviews where sentiment=negative OR rating<=2) / total reviews in range
- Top themes: Review.categoryLabels frequency over range (service/price/staff/quality/cleanliness/wait_time/other)
- Alerts: AlertEvent.createdAt within range, grouped by type

Prisma query snippets (pseudo-realistic)
A) Base where clause
- businessId = active business
- createdAt between start/end (inclusive) for the appropriate entity
- locationId IN selected locations

B) Funnel counts
- Reviews ingested:
  prisma.review.count({ where: { businessId, locationId: { in: locationIds }, createdAt: { gte: start, lte: end } } })
- Drafted/Approved/Posted:
  prisma.draftReply.count({ where: { businessId, locationId: { in: locationIds }, createdAt: { gte: start, lte: end } } })
  prisma.draftReply.count({ where: { businessId, locationId: { in: locationIds }, approvedAt: { gte: start, lte: end } } })
  prisma.draftReply.count({ where: { businessId, locationId: { in: locationIds }, postedAt: { gte: start, lte: end }, status: { in: ["posted_manual","posted_api"] } } })

C) Response time aggregates
- Fetch posted replies joined to their review (keep selection minimal):
  prisma.draftReply.findMany({
    where: { businessId, locationId: { in: locationIds }, postedAt: { gte: start, lte: end }, status: { in: ["posted_manual","posted_api"] } },
    select: { postedAt: true, approvedAt: true, review: { select: { createdAt: true } } }
  })
- Compute in JS:
  responseMs = postedAt - review.createdAt
  opsMs = postedAt - approvedAt (only when approvedAt exists)
  Return avg + median (sort array for median). For large N, you can use percentile in SQL later, but MVP JS is fine.

D) Negative share
- totalReviews = review.count(...)
- negativeReviews = review.count({ where: { ... , OR: [{ sentiment: "negative" }, { rating: { lte: 2 } }] } })

E) Theme frequency
- If categoryLabels is stored as string[]:
  prisma.review.findMany({ where: { ... }, select: { categoryLabels: true } })
  Reduce counts in JS.

F) Alerts
- prisma.alertEvent.groupBy({ by: ["type"], where: { businessId, createdAt: { gte: start, lte: end } }, _count: true })
- Recent alerts table:
  prisma.alertEvent.findMany({ where: { businessId, createdAt: { gte: start, lte: end } }, orderBy: { createdAt: "desc" }, take: 50 })

G) Sync health
- Locations list with sync fields:
  prisma.location.findMany({ where: { businessId, id: { in: locationIds } }, select: { id: true, name: true, lastGbpSyncAt: true, lastGbpSyncError: true, gbpSyncFailureCount: true, lastGbpReviewSyncUpdateTime: true, gbpEnabled: true } })
- Add derived warning flags:
  - stale: lastGbpSyncAt older than 24h
  - failing: gbpSyncFailureCount >= 3

API response contract (JSON)
{
  range: { start, end },
  funnel: { ingested, drafted, approved, posted, approvalRate, postRate },
  sentiment: { negativeShare, avgRating },
  responseTime: { avgMinutes, medianMinutes, avgMinutesFromApproval },
  themes: [{ theme, count }],
  alerts: { byType: [{ type, count }], recent: [...] },
  syncHealth: { locations: [{ id, name, lastSyncAt, stale, failing, lastError }], summary: { staleCount, failingCount } },
  perLocation: [{ locationId, locationName, ingested, posted, negativeShare }]
}

CSV export
- One CSV with sections is messy; simplest MVP is a flat table “per-day per-location” plus a header row with businessId and range.
- Columns:
  date, locationId, locationName, reviewsIngested, draftsCreated, draftsApproved, draftsPosted, negativeReviews, avgRating
- This makes it easy to debug and import into Sheets.

UI component layout (Tailwind)
- Top bar: DateRangePicker, Location multi-select, Export CSV button
- Row 1: Sync Health card (with warnings) + Funnel card
- Row 2: Response Time card + Negative Share / Avg Rating card
- Row 3: Top Themes table + Recent Alerts table
- Bottom: Per-location breakdown table

Instrumentation
- Add correlationId per request (uuid) and log:
  { route: "metrics", businessId, locationIds, start, end, correlationId }
- Sentry breadcrumbs around Prisma queries; on error, include the correlationId in response.

Customer-facing reference (for templates or support)
If a customer asks what this product is, point them to:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

Acceptance checklist
- /app/admin/metrics loads for a member user and shows non-zero values with seeded data.
- Filters update URL searchParams and refresh counts.
- /api/admin/metrics returns JSON in <2s for 30-day range with 1k reviews.
- /api/admin/metrics.csv downloads and opens in Google Sheets.
- Sync health warnings appear when last sync >24h or failures >=3.

This completes the MVP metrics dashboard path without new infrastructure or paid services, and leverages existing tables + logging already in the product.