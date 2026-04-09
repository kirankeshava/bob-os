# Admin Metrics Dashboard — Implementation (Next.js + Prisma) Build Notes + API/CSV Output Contract

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:28:30.000Z

---

Overview
This artifact documents the implemented admin metrics dashboard for the AI Review Reply & Reputation Autopilot MVP. It includes page structure, API contracts, KPI definitions, and the CSV export schema so the system can be operated/debugged during pilots without additional tooling.

1) Page: /app/admin/metrics
Access control (RBAC): user must be a member of the selected Business (UserBusinessMembership). Non-members are redirected to onboarding/admin selection.

UI Controls
- Business selector (if user belongs to multiple)
- Location filter: All locations or a single Location
- Date range: startDate/endDate (default last 14 days)
- Quick presets: 7d / 14d / 30d
- Export button: downloads /api/admin/metrics.csv with the same filters

Sections
A. Sync Health
- Table per enabled location:
  - Location name
  - Integration type (GBP/manual/email/OCR)
  - lastSyncAt (derived from Location.lastGbpReviewSyncUpdateTime or Integration.lastSyncAt where applicable)
  - lastError summary (from Integration.lastError or latest AlertEvent for sync failures)
  - reviewsFetched (range) if available
- Status badges:
  - Healthy: synced within last 24h and no errors
  - Stale: no sync within last 24h
  - Erroring: last sync attempt failed or AlertEvent indicates repeated failures

B. Funnel KPIs (definitions)
All metrics computed within [startDate, endDate] and optionally scoped to a location.
- Ingested: count of Review records createdAt within range
- Drafted: count of DraftReply createdAt within range (any status)
- Approved: count of DraftReply where approvedAt within range
- Posted:
  - posted_api: DraftReply.status indicates posted via API
  - posted_manual: DraftReply.status indicates posted_manual
  - Total posted = posted_api + posted_manual
- Conversion rates:
  - drafted/ingested, approved/drafted, posted/approved
- Median response time:
  - For posted replies only
  - responseTimeHours = postedAt - Review.createdAt
  - Excludes rejected drafts and drafts never posted

C. Alerts
- Total AlertEvents in range
- Breakdown by type:
  - negative_review_sla
  - sync_failure
  - ocr_failure
- Top recipients (if stored) or count by rule

D. Top Themes & Sentiment
- Negative share: percentage of reviews with sentiment=negative
- Rating distribution: counts by 1..5 stars
- Top categories/themes: service/price/staff/quality/cleanliness/wait_time/other from stored tags

2) API: /api/admin/metrics
Method: GET
Auth: required; must be member of businessId
Query params:
- businessId (string, required)
- locationId (string, optional)
- start (ISO date string, required)
- end (ISO date string, required)

Response JSON (contract)
{
  "range": {"start": "2026-04-01", "end": "2026-04-08"},
  "scope": {"businessId": "...", "locationId": "...|null"},
  "syncHealth": [
    {
      "locationId": "...",
      "locationName": "Main St",
      "integration": "google",
      "enabled": true,
      "lastSyncAt": "2026-04-08T10:15:00Z"|null,
      "lastError": "429 quota"|null,
      "status": "healthy"|"stale"|"erroring"
    }
  ],
  "funnel": {
    "ingested": 120,
    "drafted": 110,
    "approved": 95,
    "posted": 80,
    "postedManual": 80,
    "postedApi": 0,
    "rates": {"draftedPerIngested": 0.92, "approvedPerDrafted": 0.86, "postedPerApproved": 0.84},
    "medianResponseTimeHours": 6.5
  },
  "sentiment": {
    "negativeShare": 0.12,
    "counts": {"positive": 90, "neutral": 15, "negative": 15},
    "ratingDistribution": {"1": 8, "2": 7, "3": 10, "4": 25, "5": 70}
  },
  "themes": [
    {"category": "service", "count": 34},
    {"category": "staff", "count": 22},
    {"category": "price", "count": 10}
  ],
  "alerts": {
    "total": 9,
    "byType": {"negative_review_sla": 6, "sync_failure": 2, "ocr_failure": 1}
  },
  "timeseriesDaily": [
    {
      "date": "2026-04-01",
      "ingested": 10,
      "drafted": 9,
      "approved": 7,
      "posted": 6,
      "negative": 1,
      "avgRating": 4.6
    }
  ]
}

Computation sources
- Review table: createdAt, rating, sentiment, categories/tags, locationId
- DraftReply table: createdAt, approvedAt, postedAt, status, reviewId
- AlertEvent table: createdAt, type, businessId, locationId
- Location/Integration tables: sync metadata (last sync watermark/time, lastError)

3) CSV Export: /api/admin/metrics.csv
Auth: required; must be member
Query params identical to /api/admin/metrics

CSV schema (header columns)
- date
- businessId
- locationId (blank for All)
- locationName (blank for All)
- ingested
- drafted
- approved
- posted
- negative
- neutral
- positive
- avgRating
- medianResponseTimeHours (daily median where computable, else blank)
- alertsTotal
- alertsNegativeSla
- alertsSyncFailure
- alertsOcrFailure

Notes on reliability / performance
- All queries are bounded by date range and optional locationId.
- Daily time series is generated by grouping Review.createdAt by day and joining DraftReply/AlertEvent daily aggregates in memory.
- Added basic safety limits: max range 90 days for interactive metrics; larger ranges require CSV export.
- Logging: each request logs businessId, locationId, start/end, and query durations; Sentry breadcrumb for any thrown validation or DB errors.

Operational usage
- During pilots, use Sync Health to quickly identify stale/erroring locations.
- Use Funnel KPIs to verify activation (reviews arriving, drafts produced, approvals/posted happening).
- Use Alerts to confirm SLA routing works for negative reviews.
- Use CSV export when debugging mismatches with customer expectations (e.g., “we posted but dashboard shows not posted”) by comparing daily totals.

Known gaps (next hardening targets)
- Reply reconciliation: for posted_manual, there is no external proof. Upcoming improvement: detect if GBP shows an owner reply via API and mark as posted_verified when possible.
- Edited/deleted reviews: GBP may change review text/rating; upcoming improvement: store review version history and mark ‘updated’ events for re-drafting.
- Yelp posting remains guided/manual; ingestion is via CSV/email/OCR.
