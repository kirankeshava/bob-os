# Metrics Dashboard MVP — Implementation Plan + API Contracts (Next.js App Router + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T01:39:35.736Z

---

Goal
Ship a lightweight in-app metrics dashboard at /app/admin/metrics to help operators debug activation, review response performance, sync health, and alerts—using existing tables only (Review, DraftReply, Location, Integration, AlertEvent, AuditLog, WeeklyReport). No new paid tools required.

Scope (MVP)
A. Sync Health
- Per location: last sync time, last error, consecutive failures (approx), reviews fetched in last 7/30 days.
- Data sources: Location.lastGbpReviewSyncUpdateTime, Integration.lastSyncAt/lastError (if present), AlertEvent(type like INTEGRATION_SYNC_FAILED).

B. Activation Funnel (date-range)
Definitions (consistent, auditable):
- Ingested: Review.createdAt in range.
- Drafted: DraftReply.createdAt in range (or Review.firstDraftedAt if you later denormalize).
- Approved: DraftReply.approvedAt in range.
- Posted: DraftReply.postedAt in range AND postedStatus in {posted_manual, posted_api}.
- Rejected: DraftReply.rejectedAt in range.
- Median/avg response time: postedAt - Review.createdAt for posted drafts only. Exclude rejected and never-posted.

C. Alerts
- Count alerts by type and severity in date range.
- “Open” alerts: unresolved AlertEvents (if you track resolvedAt) else show last 30 days volume.

D. Export CSV
- Export current filtered dataset: reviews with sentiment, rating, status, draft status, timestamps, and location.

Route/UI plan
1) Page: /app/admin/metrics
- Server component reads query params: from, to, locationId (optional), source (optional), sentiment (optional).
- Renders 3 sections:
  1. Sync Health table (per location)
  2. Funnel KPI cards + small table
  3. Alerts table + chart-lite (can be simple grouped table for MVP)
- Adds “Export CSV” button linking to /api/admin/metrics.csv?from=...&to=...&locationId=...

2) API: /api/admin/metrics (GET)
Returns JSON:
{
  range: { from: string, to: string },
  filters: { locationId?: string },
  syncHealth: Array<{ locationId, locationName, source, enabled, lastSyncAt, lastError, lastLocationWatermark, failures30d, reviews7d, reviews30d }>,
  funnel: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    rejected: number,
    responseTimeAvgMinutes: number | null,
    responseTimeMedianMinutes: number | null
  },
  alerts: Array<{ type: string, severity: string, count: number }>,
  topThemes: Array<{ label: string, count: number }> // optional; can come from Review.categoryLabels
}

3) API: /api/admin/metrics.csv (GET)
Returns text/csv with a flat list of reviews in the filtered range.

RBAC / Auth
- Require logged-in user.
- Require membership in Business via UserBusinessMembership.
- If you already have “activeBusinessId” in session or subdomain routing, use that.
- For admin-only metrics, restrict to role=OWNER/ADMIN.

Validation
Use zod for query params:
- from/to ISO dates (default to last 30 days)
- locationId optional
- clamp range to max 180 days to avoid heavy queries

Prisma query approach (concrete)
Assume:
- Review has: id, businessId, locationId, source, rating, sentiment, categoryLabels (string[]), createdAt
- DraftReply has: id, reviewId, businessId, status, createdAt, approvedAt, rejectedAt, postedAt, postedStatus
- Location has: id, businessId, name, enabled, lastGbpReviewSyncUpdateTime
- Integration has: id, businessId, provider, enabled, lastSyncAt, lastError
- AlertEvent has: id, businessId, locationId?, type, severity, createdAt

A) Funnel counts (single business, optional location filter)
- Ingested:
  prisma.review.count({ where: { businessId, createdAt: { gte: from, lte: to }, ...(locationId?{locationId}:{} ) } })
- Drafted:
  prisma.draftReply.count({ where: { businessId, createdAt: { gte: from, lte: to }, review: { ...(locationId?{locationId}:{} ) } } })
- Approved:
  prisma.draftReply.count({ where: { businessId, approvedAt: { gte: from, lte: to }, review: { ...(locationId?{locationId}:{} ) } } })
- Posted:
  prisma.draftReply.count({ where: { businessId, postedAt: { gte: from, lte: to }, postedStatus: { in: ["posted_manual","posted_api"] }, review: { ...(locationId?{locationId}:{} ) } } })
- Rejected:
  prisma.draftReply.count({ where: { businessId, rejectedAt: { gte: from, lte: to }, review: { ...(locationId?{locationId}:{} ) } } })

B) Response time avg/median
Prisma doesn’t do median easily; use raw SQL for median, Prisma for average (or raw SQL for both).
Raw SQL example (Postgres) for median minutes:
WITH posted AS (
  SELECT EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60.0 AS minutes
  FROM "DraftReply" d
  JOIN "Review" r ON r.id = d."reviewId"
  WHERE d."businessId" = $1
    AND d."postedAt" BETWEEN $2 AND $3
    AND d."postedStatus" IN ('posted_manual','posted_api')
    AND ($4::text IS NULL OR r."locationId" = $4)
)
SELECT
  AVG(minutes) AS avg_minutes,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY minutes) AS median_minutes
FROM posted;

C) Sync health table
- Locations list:
  prisma.location.findMany({ where: { businessId }, select: { id, name, enabled, lastGbpReviewSyncUpdateTime } })
- Integration status:
  prisma.integration.findMany({ where: { businessId, enabled: true }, select: { provider, lastSyncAt, lastError } })
- Failure counts 30d:
  prisma.alertEvent.groupBy({ by: ["locationId"], where: { businessId, createdAt: { gte: subDays(now,30) }, type: "INTEGRATION_SYNC_FAILED" }, _count: { _all: true } })
- Reviews 7d/30d by location:
  prisma.review.groupBy({ by: ["locationId"], where: { businessId, createdAt: { gte: subDays(now,30) } }, _count: { _all: true } })
  and for 7d similarly.

D) Alerts by type
  prisma.alertEvent.groupBy({ by: ["type","severity"], where: { businessId, createdAt: { gte: from, lte: to }, ...(locationId?{locationId}:{} ) }, _count: { _all: true } })

E) Top themes (optional quick win)
If Review.categoryLabels is a string[] in Postgres:
Use raw SQL unnest:
SELECT label, COUNT(*)
FROM (
  SELECT UNNEST("categoryLabels") AS label
  FROM "Review"
  WHERE "businessId" = $1 AND "createdAt" BETWEEN $2 AND $3
    AND ($4::text IS NULL OR "locationId" = $4)
) t
GROUP BY label
ORDER BY COUNT(*) DESC
LIMIT 10;

CSV export columns (suggested)
- reviewId, source, locationName, rating, sentiment, categories, createdAt
- draftStatus (latest), approvedAt, postedAt, postedStatus
- responseTimeMinutes (if posted)
- reviewText (optional; consider truncation to avoid CSV bloat)

Implementation notes
- “Latest draft per review”: if multiple drafts exist, join the most recent by createdAt or use DraftReply.status fields. For CSV, pick latest draft via DISTINCT ON (reviewId) ORDER BY createdAt DESC in raw SQL.
- Keep queries fast by indexing: Review(businessId, createdAt), Review(locationId, createdAt), DraftReply(businessId, postedAt), AlertEvent(businessId, createdAt). Add only if needed.
- UI charts: MVP can be simple tables + KPI cards; avoid heavy chart libs initially.

Outreach/customer comms note (for later)
When sharing a metrics screenshot or onboarding doc, reference the public legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Acceptance criteria
- Owner/admin can open /app/admin/metrics and see data within 2s for a 30-day range.
- CSV export downloads and matches filters.
- RBAC prevents cross-business access.
- Metrics definitions match weekly report numbers (posted/response time) to avoid confusion.
