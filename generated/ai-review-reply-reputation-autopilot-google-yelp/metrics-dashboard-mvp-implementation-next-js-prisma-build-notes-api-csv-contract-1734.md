# Metrics Dashboard MVP — Implementation (Next.js + Prisma) Build Notes + API/CSV Contract

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T17:52:23.661Z

---

Below is the build-ready implementation content for the /app/admin/metrics dashboard and its supporting endpoints. This is written to match the existing stack (Next.js App Router + Prisma + Postgres + Tailwind) and current tables (Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership).

1) ROUTES / PAGES
A. Page: /app/admin/metrics
- RBAC: user must be a member of the Business (UserBusinessMembership). If your app has a currentBusiness context, use that; otherwise require businessId query param and validate membership.
- UI controls:
  - Date range: startDate, endDate (defaults: last 30 days).
  - Location filter: “All locations” plus enabled locations.
  - Source filter (optional): google | yelp | manual | ocr.
- Sections:
  1) Sync Health
     - Table per enabled location: location name, integration source, lastSyncAt, lastError (truncated), consecutiveFailures (if tracked) or lastFailureAt.
     - Status badge: OK (lastSyncAt < 24h, no lastError), WARN (lastSyncAt 24–72h or intermittent errors), FAIL (lastSyncAt > 72h or repeated errors).
  2) Activation Funnel
     - KPIs: Ingested Reviews, Drafted, Approved, Posted.
     - Conversion rates: drafted/ingested, approved/drafted, posted/approved.
  3) Response Time
     - Definitions:
       - FirstDraftTime = DraftReply.createdAt (earliest) minus Review.createdAt.
       - ApprovalTime = DraftReply.approvedAt minus Review.createdAt (for approved drafts).
       - PostedTime = DraftReply.postedAt minus Review.createdAt (for posted_manual or posted_api).
     - Display: median (p50) and p90 for PostedTime; plus “% responded within 24h/48h”.
  4) Reputation KPIs
     - Total reviews, average rating, negative share (rating<=2 OR sentiment=negative), neutral share, positive share.
     - Rating trend: compare avg rating in range vs previous equal-length period.
  5) Alerts
     - Count of AlertEvents in range grouped by type (negative_review, sync_failure, ocr_failure, sla_breach).
     - List last 10 alerts with timestamp + status (sent/acked).
  6) Themes
     - Top categories from tagging labels (service, price, staff, quality, cleanliness, wait_time, other) aggregated by count, optionally split by sentiment.

2) API: /api/admin/metrics (JSON)
A. Request (GET)
Query params:
- businessId (string, required unless inferred)
- start (ISO date string, optional)
- end (ISO date string, optional)
- locationId (string | 'all', optional)
- source (string, optional)
Validation (zod):
- start/end must be valid dates; end >= start; clamp max range (e.g., 180 days) to protect DB.

B. Response shape
{
  range: { start: string, end: string },
  filters: { businessId: string, locationId?: string, source?: string },
  syncHealth: Array<{ locationId: string, locationName: string, source: string, lastSyncAt: string | null, lastError: string | null }>,
  funnel: { ingested: number, drafted: number, approved: number, posted: number, draftedRate: number, approvedRate: number, postedRate: number },
  responseTime: { postedP50Hours: number | null, postedP90Hours: number | null, respondedWithin24hRate: number | null, respondedWithin48hRate: number | null },
  reputation: { total: number, avgRating: number | null, negativeShare: number | null, positiveShare: number | null, neutralShare: number | null, avgRatingPrev: number | null, avgRatingDelta: number | null },
  alerts: { total: number, byType: Record<string, number>, recent: Array<{ id: string, type: string, createdAt: string, status: string, summary: string }> },
  themes: Array<{ label: string, count: number, negativeCount: number, positiveCount: number }>
}

3) API: /api/admin/metrics.csv (CSV export)
- Same query params and validation/RBAC as JSON.
- Output: a single CSV file with section headers to emulate multiple tables without needing Excel libraries.
Example format:
"SECTION","SyncHealth"
"Location","Source","Last Sync","Last Error"
...
(blank line)
"SECTION","Funnel"
"Metric","Count"
...
(blank line)
"SECTION","ResponseTime"
"Metric","Value"
...
This opens cleanly in Google Sheets and is easy to email.

4) PRISMA / QUERY LOGIC (core)
Assume filters:
- whereReview: { businessId, createdAt: { gte: start, lte: end }, ...(locationId != all), ...(source) }

A. Ingested
- prisma.review.count({ where: whereReview })

B. Drafted
- prisma.draftReply.count({ where: { review: whereReview } })
If DraftReply is 1:1 with Review you can use Review.draftStatus; otherwise count distinct reviewId that has a draft.

C. Approved
- prisma.draftReply.count({ where: { approvedAt: { not: null }, review: whereReview } })

D. Posted
- prisma.draftReply.count({ where: { postedAt: { not: null }, review: whereReview } })

E. Response time percentiles
Fast path (Postgres): raw SQL with percentile_cont on epoch diff for posted drafts.
SQL example:
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600) AS p50_hours,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600) AS p90_hours
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE d."postedAt" IS NOT NULL
  AND r."businessId" = $1
  AND r."createdAt" BETWEEN $2 AND $3
  AND ($4::text IS NULL OR r."locationId" = $4);
Also compute respondedWithin24hRate and 48hRate as:
count(postedAt - createdAt <= 24h) / count(posted)

F. Reputation KPIs
- avgRating = prisma.review.aggregate({ where: whereReview, _avg: { rating: true } })
- negativeShare numerator: review where rating <= 2 OR sentiment='negative'
- positiveShare numerator: sentiment='positive' OR rating >= 4 (choose one definition; keep consistent)
- prev period: compute prevStart = start - (end-start), prevEnd = start; run same aggregate.

G. Themes
If categories are stored as array/JSON on Review (e.g., categoryLabels: string[]):
- Raw SQL using unnest to count labels in range. Example:
SELECT label, COUNT(*)::int AS count
FROM (
  SELECT unnest(r."categoryLabels") AS label
  FROM "Review" r
  WHERE r."businessId" = $1 AND r."createdAt" BETWEEN $2 AND $3
) t
GROUP BY label
ORDER BY count DESC
LIMIT 10;
Also compute negativeCount/positiveCount with CASE on sentiment.

H. Sync Health
If Location has last sync fields:
- prisma.location.findMany({ where: { businessId }, select: { id, name, integrationSource, lastGbpSyncAt, lastGbpSyncError, ... } })
Normalize into { lastSyncAt, lastError } per source.

I. Alerts
- prisma.alertEvent.count({ where: { businessId, createdAt: { gte: start, lte: end } } })
- groupBy type: prisma.alertEvent.groupBy({ by:['type'], _count:{_all:true}, where: ... })
- recent: findMany orderBy createdAt desc take 10

5) RBAC / SECURITY
- Both endpoints must verify:
  1) User is authenticated
  2) UserBusinessMembership exists for the requested businessId
- Avoid leaking other businesses’ data via locationId: validate locationId belongs to businessId.
- Clamp date range and add small cache headers:
  - JSON: Cache-Control: private, max-age=30
  - CSV: no-store or short TTL.

6) CUSTOMER-FACING NOTES (optional copy for onboarding)
If you share this feature during pilots, the simplest explanation is:
“Open Admin → Metrics to see: (1) whether review sync is healthy, (2) how many reviews we ingested and drafted responses for, (3) how fast you’re responding, and (4) top themes driving sentiment. Export CSV any time for your team.”

This completes the MVP observability loop: ingestion/sync reliability + workflow conversion + response time + alerting visibility, all without requiring any paid analytics stack.
