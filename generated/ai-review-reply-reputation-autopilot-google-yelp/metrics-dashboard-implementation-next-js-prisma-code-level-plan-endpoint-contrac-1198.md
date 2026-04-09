# Metrics Dashboard Implementation (Next.js + Prisma) — Code-Level Plan + Endpoint Contracts

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:49:21.775Z

---

Below is the build-ready implementation content (routes, endpoint contracts, and core query logic) for the Metrics Dashboard.

1) UI ROUTE
Route: /app/admin/metrics
- Server Component page that reads query params:
  - from=YYYY-MM-DD (default: last 30 days)
  - to=YYYY-MM-DD (default: today)
  - locationId=all|<uuid>
- Renders blocks:
  A) Sync Health (table)
     Columns: Location, Integration Source, Enabled, lastSyncAt, lastErrorAt, lastError, lastGbpReviewSyncUpdateTime
  B) Activation Funnel (counts + conversion rates)
     - Ingested reviews: Review.createdAt within range
     - Drafted: DraftReply.createdAt within range (or review has draft within range)
     - Approved: DraftReply.approvedAt within range
     - Posted: DraftReply.postedAt within range OR status in ('posted_manual','posted_api')
     Use consistent definitions and show both counts and % conversion from previous step.
  C) Response Time
     - median + p90 response time (minutes)
     - Definition: postedAt - review.createdAt
     - Exclude: rejected drafts, approved-but-unposted drafts, and reviews without posted draft
  D) Ratings/Sentiment Mix
     - avg rating, count by rating buckets (5,4,3,2,1)
     - negative share: sentiment=negative OR rating<=2
     - top themes: category counts from Review.categoryLabels
  E) Alerts
     - count of AlertEvent by type (NEGATIVE_REVIEW, SYNC_FAILURE, OCR_FAILURE)
     - list last 20 alerts with createdAt, type, location, summary

2) METRICS JSON ENDPOINT
Route: GET /api/admin/metrics?from&to&locationId
Auth/RBAC:
- Require authenticated user
- Require UserBusinessMembership for businessId context (from session)
Validation:
- Ensure from <= to and max range (e.g., 366 days)
Response contract:
{
  range: { from: string, to: string, timezone: string },
  filter: { locationId: string | null },
  syncHealth: Array<{
    locationId: string,
    locationName: string,
    source: 'google'|'yelp'|'manual',
    enabled: boolean,
    lastSyncAt: string|null,
    lastErrorAt: string|null,
    lastError: string|null,
    watermarkUpdateTime: string|null
  }>,
  funnel: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    conversion: { draftedPerIngested: number, approvedPerDrafted: number, postedPerApproved: number }
  },
  responseTime: {
    medianMinutes: number|null,
    p90Minutes: number|null,
    sampleSize: number
  },
  ratings: {
    avg: number|null,
    buckets: { '1': number,'2': number,'3': number,'4': number,'5': number },
    negativeShare: number
  },
  sentiment: { positive: number, neutral: number, negative: number },
  themes: Array<{ label: string, count: number }>,
  timeseries: {
    byDay: Array<{ date: string, ingested: number, posted: number, avgRating: number|null, negative: number }>
  },
  alerts: {
    byType: Record<string, number>,
    recent: Array<{ id: string, createdAt: string, type: string, locationName: string|null, summary: string }>
  }
}

3) CSV EXPORT ENDPOINT
Route: GET /api/admin/metrics.csv?from&to&locationId
- Content-Disposition: attachment; filename="reputation-metrics_<from>_<to>.csv"
- Columns (review-level + draft-derived):
  - reviewId, source, locationName, author, rating, createdAt, updateTime, sentiment, categories
  - reviewText (optional; include a toggle to exclude for privacy)
  - draftStatus, draftedAt, approvedAt, postedAt, responseTimeMinutes
  - escalated (boolean), alertCount
  - reviewUrl (if known)

4) CORE QUERY LOGIC (Prisma/SQL)
A) Base filters
- businessId from session
- location filter (optional)
- date range applied to Review.createdAt for ingestion-related metrics

B) Funnel counts
- ingested = count Reviews where createdAt in range
- drafted = count DraftReply where createdAt in range AND review.location belongs to business and passes location filter
- approved = count DraftReply where approvedAt in range
- posted = count DraftReply where postedAt in range OR status in posted states with postedAt in range (prefer postedAt)

C) Response time distribution
- Query drafts that are posted and map to their reviews:
  WHERE draft.postedAt IS NOT NULL
  AND draft.status IN ('posted_manual','posted_api')
  AND review.createdAt between from/to (or postedAt between from/to; choose and document)
- Compute minutes = EXTRACT(EPOCH FROM (postedAt - review.createdAt))/60
- median/p90: either in app (sort) for <=10k samples, or use SQL percentile_cont if Postgres:
  SELECT
    percentile_cont(0.5) WITHIN GROUP (ORDER BY minutes) AS median,
    percentile_cont(0.9) WITHIN GROUP (ORDER BY minutes) AS p90

D) Ratings and sentiment
- avg rating over Reviews in range
- buckets group by rating
- sentiment counts group by Review.sentiment
- negative share = (count where sentiment='negative' OR rating<=2) / ingested

E) Themes
- If categories stored as string[] on Review, unnest:
  SELECT label, COUNT(*) FROM (
    SELECT unnest("categoryLabels") AS label
    FROM "Review"
    WHERE businessId=? AND createdAt BETWEEN ? AND ?
  ) t GROUP BY label ORDER BY COUNT(*) DESC LIMIT 10;

F) Sync health
- Pull Location fields: enabledForSync, lastSyncAt, lastSyncErrorAt, lastSyncError, lastGbpReviewSyncUpdateTime
- Join Integration source if needed (google/yelp/manual)

G) Timeseries by day
- Postgres date_trunc('day', createdAt)
- Track ingested per day, posted per day (by postedAt), avg rating per day, negative per day

5) INSTRUMENTATION
- Add correlationId per request
- Log: businessId, from/to, locationId, execution time per section (syncHealthMs, funnelMs, responseMs, timeseriesMs)
- Sentry: captureException on query failures; add breadcrumbs with query params and counts

6) PILOT/QA CHECKS
- Create 20 synthetic reviews spanning sources (manual/email/OCR/google)
- Ensure dashboard shows:
  - Funnel numbers match expected
  - Response-time excludes rejected/unposted
  - Negative share reacts when rating<=2 even if sentiment tagging fails
  - CSV export opens correctly in Sheets/Excel

If customer communication is needed during pilot onboarding, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to
