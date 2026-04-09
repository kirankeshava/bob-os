# Metrics Dashboard Implementation (Build-Ready Code + Routes + Queries)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T12:46:57.117Z

---

Below is the concrete, paste-ready implementation outline for the in-app metrics dashboard that uses the existing Prisma schema (Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog). It assumes Next.js App Router with server components and API route handlers.

ROUTES
1) UI Page (RBAC protected)
- app/app/admin/metrics/page.tsx
- Shows filters: dateFrom/dateTo, locationId (or “All”), source filter (optional).
- Renders widgets:
  A. Sync Health: per-location lastSyncAt/lastError (Google), plus lastIngestAt per source.
  B. Funnel: ingested → drafted → approved → posted, conversion rates.
  C. Response Times: median/p90 response time for posted replies, plus “% posted within SLA hours”.
  D. Ratings + Sentiment mix: average rating, negative share, sentiment distribution.
  E. Themes: top categories (service/price/staff/quality/cleanliness/wait_time/other).
  F. Alerts: count by type/severity, and top escalated locations.
- Includes “Export CSV” button pointing to /api/admin/metrics.csv with same query params.

2) API JSON
- app/api/admin/metrics/route.ts
- Method: GET
- Validates query params with Zod:
  - businessId (implicit from session membership; do not accept arbitrary)
  - dateFrom/dateTo (optional; default last 30 days)
  - locationId (optional)
- Returns one JSON payload:
  {
    range: {from,to},
    syncHealth: { locations: [...], lastIngestBySource: {...}, recentSyncFailures7d: number },
    funnel: { ingested, drafted, approved, posted, rates: {...} },
    response: { medianMinutes, p90Minutes, withinSlaRate, slaHours },
    ratings: { avgRating, countByRating: {...}, sentiment: {...}, negativeShare },
    themes: { topCategories: [{category,count}] },
    alerts: { total, byType: [...], bySeverity: [...] },
    timeseriesDaily: [{date, ingested, drafted, approved, posted, avgRating, negativeShare, medianResponseMinutes}]
  }

3) API CSV Export
- app/api/admin/metrics.csv/route.ts
- Same filters; returns text/csv with header:
  date,ingested,drafted,approved,posted,avg_rating,negative_share,median_response_minutes
- Also includes a “totals” section at bottom or a second CSV endpoint for totals (optional).

RBAC / AUTH
- Require a logged-in user.
- Verify membership via UserBusinessMembership; reject if not a member.
- If you support multi-business users, require selecting activeBusinessId from session; do not trust query string.

METRIC DEFINITIONS (ENCODED IN CODE)
- ingested: Review.createdAt within range (or Review.ingestedAt if separate; otherwise createdAt when record inserted).
- drafted: reviews with DraftReply created within range OR reviews ingested within range that have at least one DraftReply (choose one definition; recommended: count distinct reviews with any DraftReply createdAt within range).
- approved: DraftReply.status == 'approved' and approvedAt within range.
- posted: DraftReply.status in ('posted_manual','posted_api') with postedAt within range.
- response time: For each review that has a posted draft, compute postedAt - Review.createdAt. Use the first posted draft per review (min postedAt). Exclude rejected/unposted drafts.
- negative share: count of reviews where rating <= 2 OR sentiment == 'negative' divided by total ingested (same denominator as selected ingested definition).

PRISMA/SQL AGGREGATIONS
A) Base where clause builder
- location filter: if locationId present, apply to Review.locationId.
- date filter: apply to Review.createdAt for ingestion-related counts; apply to DraftReply.*At fields for approval/posted counts.

B) Funnel counts
- ingested:
  prisma.review.count({ where: { businessId, ...(locationId?), createdAt: {gte: from, lte: to} } })
- drafted (distinct reviews with drafts created in range):
  Use SQL for distinct reviewId:
  SELECT COUNT(DISTINCT "reviewId") FROM "DraftReply" dr
  JOIN "Review" r ON r.id = dr."reviewId"
  WHERE r."businessId"=$1 AND (r."locationId"=$2 OR $2 IS NULL) AND dr."createdAt" BETWEEN $3 AND $4;
- approved:
  prisma.draftReply.count({ where: { review: {businessId, ...(locationId?)}, status: 'approved', approvedAt: {gte: from, lte: to} } })
- posted:
  prisma.draftReply.count({ where: { review: {businessId, ...(locationId?)}, status: {in:['posted_manual','posted_api']}, postedAt: {gte: from, lte: to} } })

C) Response time (median/p90)
- SQL recommended:
  WITH first_post AS (
    SELECT dr."reviewId", MIN(dr."postedAt") AS first_posted_at
    FROM "DraftReply" dr
    JOIN "Review" r ON r.id = dr."reviewId"
    WHERE r."businessId"=$1
      AND ($2::text IS NULL OR r."locationId"=$2)
      AND dr.status IN ('posted_manual','posted_api')
      AND dr."postedAt" BETWEEN $3 AND $4
    GROUP BY dr."reviewId"
  )
  SELECT
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (fp.first_posted_at - r."createdAt"))/60.0) AS median_minutes,
    PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (fp.first_posted_at - r."createdAt"))/60.0) AS p90_minutes
  FROM first_post fp
  JOIN "Review" r ON r.id = fp."reviewId";
- withinSlaRate:
  compute fraction where (first_posted_at - createdAt) <= slaHours; SLA can come from Location or Business config.

D) Ratings & sentiment
- avg rating:
  prisma.review.aggregate({ _avg: { rating: true }, where: { businessId, ...(locationId?), createdAt:{gte:from,lte:to}, rating: {not: null} } })
- countByRating (1..5): groupBy rating.
- sentiment distribution: groupBy sentiment.

E) Themes
- If categories stored as array on Review (e.g., categories JSON/array), use SQL to unnest; otherwise if single category field, groupBy.
  Example Postgres array unnest:
  SELECT cat, COUNT(*)
  FROM "Review" r, UNNEST(r.categories) AS cat
  WHERE r."businessId"=$1 AND (r."locationId"=$2 OR $2 IS NULL) AND r."createdAt" BETWEEN $3 AND $4
  GROUP BY cat ORDER BY COUNT(*) DESC LIMIT 10;

F) Sync health
- Locations table should have lastGbpReviewSyncAt and lastGbpReviewSyncUpdateTime (already added earlier); return those plus lastSyncError fields if present.
- recent sync failures: count AlertEvents where type='integration_sync_failed' in last 7 days.
- lastIngestBySource: max(createdAt) on Review filtered by source.

G) Daily time series
- Generate date buckets in SQL (generate_series) to avoid missing days:
  WITH days AS (
    SELECT generate_series(date_trunc('day',$3::timestamptz), date_trunc('day',$4::timestamptz), interval '1 day') AS day
  ), ing AS (
    SELECT date_trunc('day', r."createdAt") AS day, COUNT(*) AS ingested,
           AVG(r.rating) FILTER (WHERE r.rating IS NOT NULL) AS avg_rating,
           AVG(CASE WHEN (r.rating <= 2 OR r.sentiment='negative') THEN 1 ELSE 0 END) AS negative_share
    FROM "Review" r
    WHERE r."businessId"=$1 AND ($2::text IS NULL OR r."locationId"=$2) AND r."createdAt" BETWEEN $3 AND $4
    GROUP BY 1
  ), post_rt AS (
    -- median response minutes per day of postedAt
    WITH first_post AS (
      SELECT dr."reviewId", MIN(dr."postedAt") AS first_posted_at
      FROM "DraftReply" dr
      JOIN "Review" r ON r.id=dr."reviewId"
      WHERE r."businessId"=$1 AND ($2::text IS NULL OR r."locationId"=$2)
        AND dr.status IN ('posted_manual','posted_api') AND dr."postedAt" BETWEEN $3 AND $4
      GROUP BY dr."reviewId"
    )
    SELECT date_trunc('day', fp.first_posted_at) AS day,
           PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (fp.first_posted_at - r."createdAt"))/60.0) AS median_response_minutes,
           COUNT(*) AS posted
    FROM first_post fp
    JOIN "Review" r ON r.id=fp."reviewId"
    GROUP BY 1
  )
  SELECT d.day::date,
         COALESCE(ing.ingested,0) AS ingested,
         COALESCE(post_rt.posted,0) AS posted,
         ing.avg_rating,
         ing.negative_share,
         post_rt.median_response_minutes
  FROM days d
  LEFT JOIN ing ON ing.day=d.day
  LEFT JOIN post_rt ON post_rt.day=d.day
  ORDER BY d.day;
- drafted/approved daily counts can be added similarly using DraftReply.createdAt/approvedAt.

UI NOTES
- Keep it simple: use tables + a tiny sparkline (optional). Avoid heavy chart libs initially; a table with daily rows is enough.
- Provide “copy JSON” debug button for operators.

OPERATOR VALUE
This dashboard makes the MVP operational: you can prove the system is ingesting reviews (by source), see the queue conversion, identify locations failing sync, and confirm SLA performance—all without external analytics tooling.

If you want to present legitimacy in any customer-facing comms about metrics/weekly reporting, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to
