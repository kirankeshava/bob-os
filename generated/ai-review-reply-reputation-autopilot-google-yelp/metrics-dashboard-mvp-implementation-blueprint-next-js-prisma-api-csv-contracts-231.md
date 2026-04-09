# Metrics Dashboard MVP — Implementation Blueprint (Next.js + Prisma) + API/CSV Contracts

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:20:55.850Z

---

Overview
Ship /app/admin/metrics to give each business owner a single place to validate that the system is working: review ingestion volume, draft/approval/post funnel, response time, alert volume, and Google sync health. No new infrastructure; use Postgres + existing Prisma models.

Primary user
Local business owner/admin who wants proof the “AI Review Reply & Reputation Autopilot” is doing work and protecting reputation. (For trust, link the product site in-app: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

KPI definitions (make these consistent everywhere)
1) Ingested reviews: Review.createdAt within [from,to] (or Review.sourceCreatedAt if you store it; otherwise createdAt = ingestion time).
2) Drafted: Reviews with >=1 DraftReply created in range OR DraftReply.createdAt in range.
3) Approved: DraftReply.status == 'approved' AND DraftReply.approvedAt in range.
4) Posted: DraftReply.postedAt in range AND status in ('posted_manual','posted_api') depending on your enum.
5) Response time: for posted replies only: postedAt - Review.createdAt (or - Review.sourceCreatedAt). Exclude rejected/unposted.
6) Negative share: count(reviews where rating<=2 OR sentiment='negative') / total.
7) Top themes: Review.category labels distribution (service/price/staff/quality/cleanliness/wait_time/other).
8) Sync health: per Location: lastGbpSyncAt, lastError, consecutiveFailures, lastGbpReviewSyncUpdateTime watermark.

Routes
A) UI page
- GET /app/admin/metrics
  - Server component page that calls internal data function getMetrics({businessId, from, to, locationId?}).
  - Components:
    1. Filters bar: Date range (last 7/30/90/custom), Location dropdown, Source dropdown (all/google/yelp/manual) optional.
    2. Summary cards: Total reviews, Avg rating, Negative share, Median response time, Alerts count.
    3. Funnel table: Ingested → Drafted → Approved → Posted (counts + conversion %).
    4. Trend chart (simple): reviews per day + negative per day (can be rendered as table initially).
    5. Sync health table: location name, integration status, lastSyncAt, lastError, failures, “View logs” (link to filtered AuditLog page if exists).
    6. Top themes list with counts.
    7. Export button: links to /api/admin/metrics.csv?from=…&to=…&locationId=…

B) API endpoints
- GET /api/admin/metrics
  - Returns JSON for the dashboard.
  - Query params:
    - from: ISO date (required)
    - to: ISO date (required)
    - locationId: string (optional)
    - source: 'google'|'yelp'|'manual'|'all' (optional)
  - RBAC: user must be member of the business for the requested context (derive businessId from session + selected business if multi-tenant).

- GET /api/admin/metrics.csv
  - Returns text/csv with same filters; intended for debugging and customer success.

Data queries (Prisma-friendly patterns)
Assumptions: Review has businessId, locationId, rating, sentiment, categories (string[] or JSON), createdAt, source. DraftReply has reviewId, status, createdAt, approvedAt, postedAt. Location has lastGbpSyncAt/lastError/lastGbpReviewSyncUpdateTime.

1) Reviews aggregate
- totalReviews = count Review where businessId AND createdAt between from/to AND optional locationId/source
- avgRating = avg Review.rating for same filter
- negativeCount = count where (rating <= 2 OR sentiment='negative')
- negativeShare = negativeCount/totalReviews

2) Funnel counts
- draftedCount = count DraftReply where review.businessId AND DraftReply.createdAt between from/to AND optional filters via join review
- approvedCount = count DraftReply where status='approved' AND approvedAt between from/to
- postedCount = count DraftReply where postedAt between from/to AND status in ('posted_manual','posted_api')

3) Response time
- Fetch posted drafts with select { postedAt, review: { createdAt } } for range, compute:
  - medianMinutes
  - p90Minutes
  - avgMinutes
(Compute in JS for MVP; later move to SQL percentile_cont.)

4) Reviews per day trend
- Group by date(review.createdAt) using raw SQL for Postgres for speed:
  SELECT date_trunc('day', r."createdAt") as day,
         count(*) as total,
         sum(CASE WHEN r.rating <= 2 OR r.sentiment = 'negative' THEN 1 ELSE 0 END) as negative
  FROM "Review" r
  WHERE r."businessId" = $1 AND r."createdAt" BETWEEN $2 AND $3
  [AND r."locationId" = $4]
  GROUP BY 1 ORDER BY 1;

5) Top themes
If Review.categories is text[]:
  SELECT unnest(r.categories) as theme, count(*)
  FROM "Review" r
  WHERE ...
  GROUP BY 1 ORDER BY 2 DESC LIMIT 10;
If JSON, adapt accordingly.

6) Alerts volume
- count AlertEvent where businessId AND createdAt between from/to
- group by type/severity for table

7) Sync health
- locations = findMany Location where businessId, select:
  { id, name, gbpEnabled, lastGbpSyncAt, lastGbpSyncError, lastGbpReviewSyncUpdateTime }
- also show Integration status (connected/expired) if needed.

API response shape (JSON)
{
  range: { from, to },
  filters: { locationId, source },
  summary: {
    totalReviews, avgRating, negativeShare,
    draftedCount, approvedCount, postedCount,
    medianResponseMinutes, p90ResponseMinutes,
    alertsCount
  },
  funnel: {
    ingested: totalReviews,
    drafted: draftedCount,
    approved: approvedCount,
    posted: postedCount
  },
  trend: Array<{ day: string, total: number, negative: number }>,
  themes: Array<{ theme: string, count: number }>,
  alertsByType: Array<{ type: string, count: number }>,
  syncHealth: Array<{ locationId: string, locationName: string, lastSyncAt: string|null, lastError: string|null, watermark: string|null }>
}

CSV export
File: metrics_export.csv
Columns (one row per day):
- day
- total_reviews
- negative_reviews
- avg_rating_day (optional if easy)
- drafted
- approved
- posted
- alerts
Additionally: include header comment lines (prefixed with #) describing filters and the product URL for legitimacy:
- # Generated by AI Review Reply & Reputation Autopilot
- # https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- # Range: 2026-… to 2026-…

UI copy (concise, trust-building)
- Page title: “Metrics & Sync Health”
- Subtitle: “Visibility into review ingestion, replies, and SLA alerts. Exportable for reporting.”
- Empty state: “No data in this range yet. Try expanding to 30 days or connect Google Business Profile to start syncing reviews.”

Implementation notes
- Use Zod to validate from/to and clamp max range (e.g., 365 days) to avoid expensive queries.
- Ensure joins filter by businessId to prevent leakage across tenants.
- Cache: optional 60s in-memory cache per businessId+filters for dashboard loads; not required for MVP.
- Instrument metrics endpoint with structured logs (businessId, from/to, durationMs) and Sentry capture on errors.

Second pilot checklist (non-test GBP)
- Connect OAuth, select 2+ locations.
- Run /api/cron/sync every 15 minutes for 48 hours.
- Verify: edited review updates trigger re-tagging and new draft version; deleted reviews don’t crash sync; quota backoff generates at most one alert per failure window.
- Confirm weekly report email matches dashboard totals for the same date range.