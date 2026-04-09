# Admin Metrics Dashboard — Endpoint + UI Build Kit (Next.js + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:30:32.664Z

---

Overview
Ship a lightweight /app/admin/metrics dashboard that answers: (1) is syncing healthy, (2) are reviews moving through the workflow, (3) are we meeting SLA on negatives, and (4) what’s the alert volume. This is intentionally “tables-first” (fast/reliable), with optional minimal charts.

Routes
1) UI: /app/admin/metrics
- Server Component page with tabs:
  - Sync Health
  - Funnel
  - Alerts
- Global filter bar:
  - Date range: start/end (defaults last 30 days)
  - Location filter (multi-select; defaults all)
  - Source filter (optional: google/yelp/manual)
  - Download CSV buttons per tab

2) API: /api/admin/metrics (JSON)
3) API: /api/admin/metrics.csv (CSV; supports tab=sync|funnel|alerts|reviews)

RBAC / Auth
- Require user to be authenticated AND have membership in the business.
- All queries scoped to businessId inferred from session (or selected business if multi-business admin is supported).

Request schema (zod)
- start: string (ISO date) optional
- end: string (ISO date) optional
- locationIds: string[] optional
- sources: ('google'|'yelp'|'manual')[] optional
- tz: string optional (IANA TZ; default from Business.timezone or 'UTC')
- tab: 'sync'|'funnel'|'alerts'|'reviews' (for CSV)

Core KPI Definitions (ensure consistency)
- ingested: Review.createdAt within date range
- drafted: DraftReply.createdAt within date range (or drafts whose review.createdAt is within range; pick one and keep consistent; recommended: draft.createdAt)
- approved: DraftReply.approvedAt within date range
- posted:
  - DraftReply.postedAt (API post OR manual post) within date range
- response time (minutes): postedAt - Review.createdAt (exclude rejected drafts; exclude never-posted)
- negative review: (Review.sentiment='negative') OR (rating <= 2)
- SLA breach: negative review with no posted reply within X hours (from Location.escalation/SLA config) OR AlertEvent created for SLA.

JSON response shape (/api/admin/metrics)
{
  range: { start, end, tz },
  filters: { locationIds, sources },
  syncHealth: {
    locations: [
      {
        locationId, name, source: 'google', enabled: boolean,
        lastSyncAt, lastErrorAt, lastErrorMessage,
        consecutiveFailures, watermarkUpdateTime,
        reviewsLast7d, reviewsLast30d
      }
    ],
    totals: { locationsEnabled, locationsFailing, last24hErrors }
  },
  funnel: {
    counts: { ingested, drafted, approved, posted, rejected },
    rates: { draftRate, approvalRate, postRate },
    responseTime: {
      medianMinutes, p90Minutes,
      buckets: [ { label: '0-1h', count }, { label: '1-4h', count }, ... ]
    },
    negative: { count, share, respondedWithinSla, slaBreaches }
  },
  alerts: {
    counts: { total, negativeReview, syncFailure, ocrFailure, guardrailBlocked },
    byDay: [ { date, total, negativeReview, syncFailure } ],
    recent: [ { id, type, createdAt, locationId, reviewId, status } ]
  },
  themes: {
    categories: [ { category: 'service', count, negativeShare } ... ],
    topPhrases: [ { phrase, count, sentiment } ]
  }
}

Prisma/SQL aggregation notes
Use Prisma.$queryRaw for performance and simplicity; keep all WHERE clauses scoped by businessId and optional filters.

1) Funnel counts
- Ingested:
  SELECT count(*) FROM Review r
   WHERE r.businessId=$1
     AND r.createdAt BETWEEN $start AND $end
     AND (location filter)
     AND (source filter)
- Drafted/Approved/Posted/Rejected:
  SELECT
    count(*) FILTER (WHERE d.createdAt BETWEEN $start AND $end) as drafted,
    count(*) FILTER (WHERE d.approvedAt BETWEEN $start AND $end) as approved,
    count(*) FILTER (WHERE d.postedAt BETWEEN $start AND $end) as posted,
    count(*) FILTER (WHERE d.rejectedAt BETWEEN $start AND $end) as rejected
  FROM DraftReply d
  JOIN Review r ON r.id=d.reviewId
  WHERE r.businessId=$1
    AND (location/source filters on r)

2) Response-time distribution
  SELECT
    percentile_cont(0.5) within group (order by extract(epoch from (d.postedAt - r.createdAt))/60) as median_minutes,
    percentile_cont(0.9) within group (order by extract(epoch from (d.postedAt - r.createdAt))/60) as p90_minutes
  FROM DraftReply d
  JOIN Review r ON r.id=d.reviewId
  WHERE r.businessId=$1
    AND d.postedAt IS NOT NULL
    AND d.rejectedAt IS NULL
    AND d.postedAt BETWEEN $start AND $end
    AND (filters)

Bucket counts (example):
  CASE
    WHEN minutes <= 60 THEN '0-1h'
    WHEN minutes <= 240 THEN '1-4h'
    WHEN minutes <= 1440 THEN '4-24h'
    ELSE '24h+'
  END

3) Negative share + SLA
Negative definition: (r.sentiment='negative' OR r.rating <= 2)
- negativeCount: count(*) where negative
- respondedWithinSla: count where negative AND d.postedAt <= r.createdAt + interval 'X hours'
SLA hours should be per-location; easiest MVP: use location.defaultSlaHours and compute per-row using join:
  JOIN Location l ON l.id=r.locationId
  ... d.postedAt <= r.createdAt + make_interval(hours => l.slaHours)
If make_interval is annoying, compare epoch seconds.

4) Sync health rollup
Use Integration + Location fields already present:
- Location.lastGbpSyncAt, Location.lastGbpSyncErrorAt, Location.lastGbpSyncErrorMessage, Location.lastGbpReviewSyncUpdateTime
Also count new reviews recently:
  SELECT r.locationId, count(*) as reviews_last_7d
  FROM Review r
  WHERE r.businessId=$1 AND r.createdAt >= now() - interval '7 days'
  GROUP BY r.locationId

5) Alerts
AlertEvent already exists; group by type and day:
  SELECT date_trunc('day', createdAt at time zone $tz) as day,
         type,
         count(*)
  FROM AlertEvent
  WHERE businessId=$1 AND createdAt BETWEEN $start AND $end
  GROUP BY 1,2

CSV Export Specs (/api/admin/metrics.csv)
- tab=sync columns:
  locationId, locationName, source, enabled, lastSyncAt, lastErrorAt, lastErrorMessage, consecutiveFailures, watermarkUpdateTime, reviewsLast7d, reviewsLast30d
- tab=funnel columns:
  start, end, ingested, drafted, approved, posted, rejected, draftRate, approvalRate, postRate, medianMinutes, p90Minutes, negativeCount, negativeShare, respondedWithinSla, slaBreaches
- tab=alerts columns:
  createdAt, type, status, locationId, reviewId, message
- tab=reviews columns (debugging):
  reviewId, createdAt, source, locationId, rating, sentiment, categories, hasDraft, draftStatus, approvedAt, postedAt

UI Copy (ready to paste)
Header: “Metrics”
Subheader: “Track review sync health, response SLAs, and workflow throughput. Download CSV for deeper analysis.”

Tab: Sync Health
- Table empty state: “No integrations connected yet. Connect Google Business Profile in Integrations to start automatic syncing.”

Tab: Funnel
- Helper text: “Counts reflect events occurring inside the selected date range. Response time is measured from review creation to posting (manual or API).”

Tab: Alerts
- Helper text: “Alerts are created for negative reviews, sync failures, OCR failures, and guardrail blocks. Configure routing in Admin → Escalation.”

If customer/outreach messaging is needed later
Reference site URL for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
(Use this in sales emails or onboarding instructions to show the app exists.)

Implementation checklist (fast path)
1) Build /api/admin/metrics with zod-validated query params; return JSON in the response shape above.
2) Build /api/admin/metrics.csv that calls the same aggregation functions but writes CSV rows (streaming Response).
3) Build /app/admin/metrics with server fetch to /api/admin/metrics, render 3 tables + filter form (use URLSearchParams).
4) Add “Download CSV” links to /api/admin/metrics.csv?tab=sync&start=... etc.
5) Add a small “last updated” timestamp and error banner if syncHealth.totals.locationsFailing > 0.

Done criteria
- Metrics page loads in <2s for a business with up to ~10k reviews.
- Counts match Weekly Report numbers for the same date window.
- CSV exports open cleanly in Google Sheets/Excel.