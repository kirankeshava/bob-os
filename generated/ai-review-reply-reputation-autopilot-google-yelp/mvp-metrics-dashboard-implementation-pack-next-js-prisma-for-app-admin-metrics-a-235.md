# MVP Metrics Dashboard — Implementation Pack (Next.js + Prisma) for /app/admin/metrics + /api/admin/metrics + CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:23:32.151Z

---

Below is a copy/paste-ready implementation pack for the in-app metrics dashboard. It assumes your existing stack: Next.js App Router, Prisma, Postgres, Tailwind, and your current models (Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, memberships).

Goal: A lightweight dashboard that helps you (and customers) answer:
1) Is syncing healthy? (GBP/Yelp/manual ingestion)
2) Is the product being used? (ingested → drafted → approved → posted)
3) Are we meeting SLA on negatives? (alerts + response time)
4) What ROI signals exist? (rating trend, response speed, negative share, top themes)

—
A) KPI DEFINITIONS (consistent + debuggable)

Time window
- All metrics accept from/to (ISO date). Default: last 14 days.
- Filter optionally by locationId; otherwise include all locations in the business.

Core counts
- ingestedReviews: Reviews.createdAt in window.
- draftedReviews: Reviews that have at least one DraftReply created in window OR whose first draft was created for a review created in window. (Choose one; for simplicity use DraftReply.createdAt in window.)
- approvedDrafts: DraftReply.status transitioned to APPROVED in window.
- postedDrafts: DraftReply.status in {POSTED_MANUAL, POSTED_API} with postedAt in window.

Response time
- responseTimeHoursAvg: avg(hours between Review.createdAt and DraftReply.postedAt) for posted drafts.
- responseTimeHoursP50/P90: percentiles if you want; optional. Can be computed in SQL with percentile_cont.
- Exclude rejected drafts and approved-but-never-posted.

Negatives + SLA
- negativeReviews: sentiment=NEGATIVE OR rating<=2 (match your escalation rule default).
- negativeShare: negativeReviews / ingestedReviews.
- slaBreaches: negative reviews older than N hours without a posted reply. (N from escalation rule, default 24h.)
- alertVolume: AlertEvents created in window by type (NEGATIVE_REVIEW, SYNC_FAILURE, OCR_FAILURE, etc.).

Themes
- topThemes: count of category labels from your tagging job in window (service/price/staff/quality/cleanliness/wait_time/other).

Rating trend
- avgRating: average rating in window.
- avgRatingPrev: average rating in preceding window of equal length.
- deltaAvgRating: avgRating - avgRatingPrev.

Sync health
- per location: lastSyncAt, lastError, consecutiveFailures (from Integration/Location fields you already store; or derive from AlertEvents).

—
B) API CONTRACT

1) GET /api/admin/metrics
Query params:
- from (optional ISO string)
- to (optional ISO string)
- locationId (optional)

Response JSON:
{
  range: { from, to },
  scope: { businessId, locationId?: string },
  funnel: {
    ingestedReviews: number,
    draftedReviews: number,
    approvedDrafts: number,
    postedDrafts: number,
    approvalRate: number,     // approvedDrafts / draftedReviews
    postRate: number          // postedDrafts / approvedDrafts
  },
  reputation: {
    avgRating: number | null,
    avgRatingPrev: number | null,
    deltaAvgRating: number | null,
    negativeReviews: number,
    negativeShare: number
  },
  responseTime: {
    avgHours: number | null,
    medianHours: number | null, // optional
    p90Hours: number | null     // optional
  },
  sla: {
    thresholdHours: number,
    openNegativeNoReply: number,
    breaches: number
  },
  themes: Array<{ label: string, count: number }>,
  alerts: Array<{ type: string, count: number }>,
  syncHealth: Array<{ locationId: string, locationName: string, source: 'google'|'yelp'|'manual', lastSyncAt: string|null, lastError: string|null, enabled: boolean }>
}

2) GET /api/admin/metrics.csv
Same query params. Returns CSV rows for easy export/share.
Columns (recommended):
- dateRangeFrom,dateRangeTo,businessId,locationId
- ingestedReviews,draftedReviews,approvedDrafts,postedDrafts,approvalRate,postRate
- avgRating,avgRatingPrev,deltaAvgRating,negativeReviews,negativeShare
- avgResponseHours,openNegativeNoReply,slaBreaches
- theme_service,theme_price,theme_staff,theme_quality,theme_cleanliness,theme_wait_time,theme_other
- alerts_negative_review,alerts_sync_failure,alerts_ocr_failure,alerts_other

—
C) RBAC + VALIDATION

RBAC rule:
- Requesting user must be a member of the business (UserBusinessMembership).
- Only allow admin routes for roles in {OWNER, ADMIN} if you have roles; otherwise membership is enough.

Validation:
Use zod:
- from/to optional; default last 14 days
- max range 180 days to protect DB
- locationId must belong to business

—
D) IMPLEMENTATION NOTES (Prisma + SQL)

Because this is analytics-like, use Prisma.$queryRaw for the heavy aggregations. Keep it simple and debuggable.

Pseudo-helpers:
- getBusinessIdFromSession()
- assertMembership(userId, businessId)
- parseDateRange(from,to)

Key queries (illustrative SQL; adjust table/column names to match your Prisma schema):

1) Funnel counts
- ingestedReviews:
  SELECT COUNT(*) FROM "Review"
  WHERE "businessId"=$1
    AND ( $2::uuid IS NULL OR "locationId"=$2 )
    AND "createdAt" BETWEEN $3 AND $4;

- draftedReviews (drafts created):
  SELECT COUNT(DISTINCT "reviewId") FROM "DraftReply"
  WHERE "businessId"=$1
    AND ( $2::uuid IS NULL OR "locationId"=$2 )
    AND "createdAt" BETWEEN $3 AND $4;

- approvedDrafts:
  SELECT COUNT(*) FROM "DraftReply"
  WHERE "businessId"=$1
    AND ( $2::uuid IS NULL OR "locationId"=$2 )
    AND "status"='APPROVED'
    AND "approvedAt" BETWEEN $3 AND $4;

- postedDrafts:
  SELECT COUNT(*) FROM "DraftReply"
  WHERE "businessId"=$1
    AND ( $2::uuid IS NULL OR "locationId"=$2 )
    AND "status" IN ('POSTED_MANUAL','POSTED_API')
    AND "postedAt" BETWEEN $3 AND $4;

2) Reputation
- avgRating:
  SELECT AVG("rating") FROM "Review" WHERE ...;
- avgRatingPrev: compute prev range by shifting dates.
- negativeReviews:
  SELECT COUNT(*) FROM "Review" WHERE ... AND ("sentiment"='NEGATIVE' OR "rating"<=2);

3) Response time
- avg hours:
  SELECT AVG(EXTRACT(EPOCH FROM ("postedAt"-r."createdAt"))/3600.0)
  FROM "DraftReply" d
  JOIN "Review" r ON r.id=d."reviewId"
  WHERE d."businessId"=$1
    AND d."status" IN ('POSTED_MANUAL','POSTED_API')
    AND d."postedAt" BETWEEN $3 AND $4
    AND ( $2::uuid IS NULL OR d."locationId"=$2 );

Optional median/p90:
  SELECT
    percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt"-r."createdAt"))/3600.0) AS p50,
    percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt"-r."createdAt"))/3600.0) AS p90
  FROM ...;

4) SLA open negatives + breaches
- Determine SLA threshold hours from EscalationRule (fallback 24).
- openNegativeNoReply: negative reviews created in window with no posted reply (ever) OR no posted reply within SLA.
Example breach logic:
  SELECT COUNT(*)
  FROM "Review" r
  LEFT JOIN LATERAL (
    SELECT MIN(d."postedAt") AS first_posted
    FROM "DraftReply" d
    WHERE d."reviewId"=r.id AND d."status" IN ('POSTED_MANUAL','POSTED_API')
  ) x ON true
  WHERE r."businessId"=$1
    AND ( $2::uuid IS NULL OR r."locationId"=$2 )
    AND (r."sentiment"='NEGATIVE' OR r."rating"<=2)
    AND r."createdAt" BETWEEN $3 AND $4
    AND (x.first_posted IS NULL OR x.first_posted > r."createdAt" + ($5 || ' hours')::interval);

5) Themes
If you store category labels on Review (e.g., review.categoryLabels as string[]), count via unnest:
  SELECT label, COUNT(*)
  FROM (
    SELECT unnest("categoryLabels") AS label
    FROM "Review"
    WHERE ... AND "createdAt" BETWEEN $3 AND $4
  ) t
  GROUP BY label
  ORDER BY COUNT(*) DESC
  LIMIT 8;

6) Alerts by type
  SELECT "type", COUNT(*)
  FROM "AlertEvent"
  WHERE "businessId"=$1
    AND ( $2::uuid IS NULL OR "locationId"=$2 )
    AND "createdAt" BETWEEN $3 AND $4
  GROUP BY "type";

7) Sync health per location
Use Location + Integration metadata you already track:
  SELECT l.id, l."name", l."syncEnabled" AS enabled,
         l."lastGbpSyncAt" AS lastSyncAt, l."lastGbpSyncError" AS lastError
  FROM "Location" l
  WHERE l."businessId"=$1
    AND ( $2::uuid IS NULL OR l.id=$2 )
  ORDER BY l."name" ASC;

—
E) UI ROUTE: /app/admin/metrics

Minimal UI sections (fast MVP):
1) Header filters: DateRange picker (from/to), Location dropdown (All + each location), Export CSV button.
2) Tiles row:
   - Reviews ingested
   - Avg rating (and delta)
   - Negative share
   - Avg response time
3) Funnel table:
   - Ingested → Drafted → Approved → Posted with rates.
4) Sync Health table:
   - Location, Enabled, Last Sync, Last Error, Source
5) Themes list:
   - Top categories with counts
6) Alerts table:
   - Alert type counts

Add a small “Prove legitimacy” footer link to your site:
- “Powered by AI Review Reply & Reputation Autopilot” linking to https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

—
F) CUSTOMER/INTERNAL COMMUNICATION SNIPPET (for the dashboard page)

If you want a short in-app blurb (non-marketing, trust-building):
“Metrics are calculated from your ingested reviews and reply activity. If you see missing reviews, check Sync Health or import via email/CSV/screenshot. Learn more: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

—
G) WHAT THIS ENABLES FOR SALES (immediate)

Once this dashboard exists, you can show prospects a live view of:
- How many reviews were handled this week
- How fast responses went out
- How many negatives were escalated
- What customers are complaining about (themes)
This supports outcome-based pricing and makes onboarding tangible in the first 24 hours.

If you want, next cycle I can produce the actual file-by-file code skeleton (route handlers + page component + CSV serializer) using your existing auth/membership helpers, but this pack should already let you implement in a few hours with minimal risk.