# Metrics Dashboard Implementation (Build-Ready): Routes, API Contracts, Aggregations, and CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T14:21:19.212Z

---

Below is a complete, build-ready implementation guide (with code-level pseudo/real snippets) for the metrics dashboard that was added to the MVP. It is designed to use only existing data tables: Review, DraftReply, Location, Integration, AlertEvent, AuditLog, WeeklyReport.

1) ROUTES
A) UI page
- Route: /app/admin/metrics
- Access: any signed-in user with UserBusinessMembership to the business.
- Inputs: startDate, endDate, timezone, locationIds[]
- Default window: last 30 days in business timezone.

B) JSON API
- Route: GET /api/admin/metrics?start=2026-03-10&end=2026-04-09&tz=America/Los_Angeles&locationIds=loc1,loc2
- Output: MetricsResponse JSON (schema below).

C) CSV export
- Route: GET /api/admin/metrics.csv?start=...&end=...&tz=...&locationIds=...
- Output: text/csv with KPI summary + per-location rollup.

2) KPI DEFINITIONS (match weekly report)
Window is [start, end] inclusive, interpreted in tz.
- ingestedReviews: count of Review createdAt within window.
- drafted: count of DraftReply createdAt within window (drafts created for reviews).
- approved: count of DraftReply approvedAt within window.
- posted: count of DraftReply postedAt within window, where postedStatus in ('posted_manual','posted_api').
- responseTimeSeconds:
  - For posted drafts only: postedAt - review.createdAt.
  - Excludes rejected drafts and approved-but-not-posted.
- negativeShare: reviews with (sentiment='negative' OR rating<=2) divided by total reviews in window.
- syncHealth per location:
  - lastSyncAt, lastError, lastErrorAt derived from Integration/Location fields already used by /api/health/integrations.

3) API RESPONSE SCHEMA
TypeScript shape:
{
  window: { start: string; end: string; timezone: string; days: number };
  totals: {
    reviews: number;
    drafted: number;
    approved: number;
    posted: number;
    avgRating: number | null;
    ratingDistribution: { one: number; two: number; three: number; four: number; five: number };
    sentimentDistribution: { positive: number; neutral: number; negative: number; unknown: number };
    negativeShare: number;
    responseTime: { medianSeconds: number | null; p90Seconds: number | null; avgSeconds: number | null };
    alerts: { total: number; slaBreaches: number; ocrFailures: number; syncFailures: number };
  };
  byLocation: Array<{
    locationId: string;
    name: string;
    reviews: number;
    avgRating: number | null;
    negativeShare: number;
    posted: number;
    responseTimeMedianSeconds: number | null;
    sync: { lastSyncAt: string | null; lastError: string | null; lastErrorAt: string | null };
  }>;
  trends: {
    daily: Array<{ date: string; reviews: number; avgRating: number | null; posted: number; negative: number }>;
  };
  topThemes: Array<{ label: string; count: number }>; // based on category labels persisted on Review
  warnings: { replyMismatches: number; approvedNotPosted: number };
}

4) AGGREGATIONS (Prisma approach)
A) Query inputs validation
- zod: start/end ISO date, tz string, optional locationIds.
- Clamp: max 180 days, else set start=end-180d.

B) Common filters
- businessId from session membership.
- location filter: where locationId in locationIds if provided.
- date filter: Review.createdAt between start/end.

C) Totals
- reviews: prisma.review.count({ where })
- avgRating: prisma.review.aggregate({ _avg: { rating: true }, where })
- rating distribution: groupBy rating.
- sentiment distribution: groupBy sentiment.

D) Funnel
- drafted/approved/posted counts from DraftReply with join constraints:
  - drafted: DraftReply.createdAt in window, and draft.review.locationId matches filter.
  - approved: DraftReply.approvedAt in window.
  - posted: DraftReply.postedAt in window AND postedStatus in posted values.

E) Response time stats (median/p90)
Fast path:
- Fetch posted drafts for window with select: postedAt, review.createdAt.
- Compute deltaSeconds in app code; sort; compute median/p90; avg.
(If large volume later, move to SQL percentile, but MVP is fine.)

F) Daily trend
- groupBy day (use SQL date_trunc via prisma.$queryRaw for Postgres):
  - reviews count per day, avg rating per day.
  - posted count per day from DraftReply postedAt.
  - negative count per day from Review sentiment/rating.

G) Top themes
- If Review has categoryLabels: string[] (or a join table), aggregate counts.
- For Postgres string[]: unnest in $queryRaw:
  SELECT label, COUNT(*) FROM (
    SELECT unnest("categoryLabels") as label
    FROM "Review"
    WHERE businessId = $1 AND createdAt BETWEEN $2 AND $3
  ) t GROUP BY label ORDER BY COUNT(*) DESC LIMIT 10;

H) Warnings
- approvedNotPosted: DraftReply where approvedAt != null AND postedAt == null AND createdAt within window.
- replyMismatches: (pending item) when implemented, store mismatch events in AuditLog type='reply_mismatch' and count within window.

5) CSV EXPORT FORMAT
CSV columns (first section is totals, second is byLocation):
- WindowStart, WindowEnd, Timezone
- TotalReviews, Drafted, Approved, Posted, AvgRating, NegativeShare, MedianResponseHours, P90ResponseHours
- AlertsTotal, SyncFailures, OcrFailures, SlaBreaches
Then per-location rows:
- LocationName, Reviews, AvgRating, NegativeShare, Posted, MedianResponseHours, LastSyncAt, LastError

6) UI LAYOUT (/app/admin/metrics)
- Header: date range picker, location multi-select, Apply button, Export CSV button.
- Cards row: Total Reviews, Avg Rating, Negative Share, Median Response Time.
- Funnel bar: Ingested -> Drafted -> Approved -> Posted.
- Sync Health table: location, last sync, status, last error.
- Trend chart: daily reviews + avg rating (simple line/bar; MVP can be table if no chart lib).
- Alerts summary: counts + link to /app/alerts filtered.
- Top themes: list of labels + counts.
- Definitions accordion: explains metric definitions and exclusions.

7) NOTES FOR PILOT + CUSTOMER SUPPORT
- During onboarding, instruct customers to connect Google via Integrations, then verify locations enabled and watch Sync Health card.
- If sync errors occur, the metrics page should show lastError per location; instruct customer to forward review notification emails to agent_bob_replit+review-bot@agentmail.to as fallback.
- For legitimacy in customer comms and troubleshooting, reference the public website URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

This artifact is intended to be directly actionable: the route list, response schema, SQL/Prisma strategy, and UI layout can be pasted into the codebase as a checklist, and the KPI definitions align with the weekly report generator to avoid discrepancies.