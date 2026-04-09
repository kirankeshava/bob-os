# Admin Metrics Dashboard — Implementation (Next.js + Prisma) Build Artifact

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T08:45:48.536Z

---

Below is the build-ready implementation content for the Admin Metrics Dashboard: route structure, KPI definitions, Prisma query strategy, and API/CSV contract. This is written to be pasted into the repo with minimal adaptation.

1) Routes
- /app/admin/metrics/page.tsx
  - Server component page.
  - Reads searchParams: from, to, locationId (optional), businessId (if multi-business admin).
  - Calls internal fetch to /api/admin/metrics?from=...&to=...&locationId=...
  - Renders sections:
    A) Sync Health: per-location lastSyncAt, lastError, failureCount7d, lastSuccessfulSyncAt
    B) Activation Funnel: counts and conversion rates
    C) Response Time: median (p50) and p90 time-to-first-response; plus “SLA breaches” count
    D) Reputation: total reviews, avg rating, WoW delta, negative share
    E) Themes: top categories from tagging (service/price/staff/quality/cleanliness/wait_time/other)
    F) Alerts: negative-review alerts and sync-failure alerts counts
  - Includes “Export CSV” link to /api/admin/metrics.csv with same query params.

2) KPI Definitions (must be consistent)
- ingested: Review.createdAt in range (or Review.sourceCreatedAt if present; pick one and document). Recommendation: use Review.createdAt (system ingest time) for funnel ops; use Review.sourceCreatedAt for reputation trend.
- drafted: DraftReply created for a review (DraftReply.createdAt in range OR reviewId belongs to ingested reviews in range; choose one). Recommendation: compute on review set, then see whether draft exists.
- approved: DraftReply.status in {approved, posted_manual, posted_api} and approvedAt in range.
- posted: DraftReply.status in {posted_manual, posted_api} and postedAt in range.
- response time: postedAt - Review.sourceCreatedAt (fallback Review.createdAt if sourceCreatedAt null). Exclude rejected drafts and never-posted drafts.
- negative share: (# reviews where sentiment=negative OR rating<=2) / total.
- sync failure rate: # AlertEvent.type=integration_sync_failed in range, grouped by location.

3) /api/admin/metrics (JSON contract)
Request query:
- from: ISO date (inclusive)
- to: ISO date (exclusive recommended)
- locationId: optional

Response JSON shape:
{
  range: { from, to },
  scope: { businessId, locationId?: string },
  syncHealth: Array<{ locationId, locationName, source: 'google'|'manual'|'yelp', lastSyncAt, lastSuccessfulSyncAt, lastError, failures7d: number }>,
  funnel: { ingested: number, drafted: number, approved: number, posted: number, draftedRate: number, approvedRate: number, postedRate: number },
  responseTime: { p50Hours: number|null, p90Hours: number|null, breaches: number },
  reputation: { totalReviews: number, avgRating: number|null, wowAvgRatingDelta: number|null, negativeShare: number, sentimentBreakdown: { positive: number, neutral: number, negative: number } },
  themes: Array<{ category: string, count: number }>,
  alerts: { negativeAlerts: number, syncFailureAlerts: number },
  series: {
    daily: Array<{ date: string, reviews: number, avgRating: number|null, negativeShare: number }>
  }
}

4) Prisma Aggregation Strategy (fast + reliable)
- Base filters:
  - businessId from session RBAC (UserBusinessMembership)
  - optional locationId
  - date range on Review.sourceCreatedAt for reputation series; date range on Review.createdAt for operational series (or keep both series to avoid confusion).

- Funnel counts:
  - reviewsIngested = count Reviews where createdAt in range
  - drafted = count Reviews (in ingested set) where exists DraftReply (any)
  - approved = count DraftReply where approvedAt in range AND status in approved/posted_*
  - posted = count DraftReply where postedAt in range AND status in posted_*

- Response time percentiles:
  - Query posted drafts in range with joined Review.sourceCreatedAt.
  - Compute durations in JS and compute p50/p90 (small datasets typical for local biz). If large, add a raw SQL percentile query later.

- Themes:
  - Group by Review.category (or tags array) for reviews in range; take top 5.

- Sync health:
  - For GBP locations: Location.lastGbpSyncAt, Location.lastGbpReviewSyncUpdateTime, Location.lastGbpSyncError fields (if present). If not present, infer from AuditLog/AlertEvent.
  - failures7d: count AlertEvent where type='integration_sync_failed' and locationId.

5) /api/admin/metrics.csv
CSV should include multiple sections separated by headers (or output multiple files later). MVP: one CSV with repeated rows per day + columns.
Columns:
- date, locationId(optional), reviews, avgRating, negativeShare, drafted, approved, posted, p50ResponseHours, p90ResponseHours, negativeAlerts, syncFailureAlerts

6) RBAC + Validation
- Both endpoints must:
  - Verify authenticated user
  - Verify membership to requested business
  - Validate from/to (max 180 days) and locationId belongs to business

7) Instrumentation
- Add structured logs with correlationId, businessId, range, locationId, durationMs.
- On errors: Sentry.captureException with tags { route: 'metrics', businessId }.

This implementation is intentionally table-first and server-rendered to minimize JS complexity and keep reliability high. The dashboard gives immediate operational leverage: owners can see whether reviews are flowing in, whether drafts are being approved/posted, and how quickly negative reviews are handled—directly tying the product’s workflow to reputation outcomes.