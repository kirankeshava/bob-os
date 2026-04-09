# Admin Metrics Dashboard — Implementation (Routes, APIs, KPI Definitions, and CSV Columns)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T21:05:48.763Z

---

## Goal
Provide an in-app dashboard for business owners/admins to understand: (1) whether review syncing is healthy, (2) whether the autopilot workflow is progressing (ingest → draft → approve → post), and (3) whether negative reviews/alerts are under SLA. This must reuse existing tables: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog.

## UI Route
### /app/admin/metrics
RBAC: require logged-in user with membership in the active Business. Admin-only optional; recommended: allow any member to view metrics.

### Filters (top bar)
- Date range: start, end (defaults last 30 days)
- Location: All locations or a specific locationId
- Source: All / Google / Yelp / Manual (optional; if implemented)
- Download CSV button (hits /api/admin/metrics.csv with the same query params)

### Panels
1) **Sync Health**
- Table per enabled Location:
  - Location name
  - Integration source (GBP/manual/yelp)
  - lastSyncAt (from Location.lastGbpSyncAt or Integration.lastSyncAt, whichever is implemented)
  - lastError (from Integration.lastError or location-scoped error state)
  - reviewsFetchedLastRun (if logged in AuditLog metadata)
  - status badge: Healthy (synced < 24h), Stale (24–72h), Failing (lastError present + stale)

2) **Activation Funnel** (selected range)
Definitions (range filter applies to Review.createdAt for “ingested”):
- Ingested: count(Review) created within range
- Drafted: count(Review) with >=1 DraftReply created within 24h of review ingest OR DraftReply.createdAt within range (choose one; recommended: DraftReply.createdAt within range)
- Approved: count(DraftReply) status=approved within range
- Posted: count(DraftReply) status in (posted_manual, posted_api) and postedAt within range
Display as counts + conversion rates.

3) **Response-time KPIs**
Compute using postedAt - reviewCreatedAt for posted drafts only.
- Median response time
- P90 response time
- Avg response time
- % responded within 24h
Exclude drafts that are rejected or never posted.

4) **Reputation & Volume**
- Reviews volume by day/week
- Avg rating (mean) trend
- Negative share = (sentiment=negative OR rating<=2) / total
- Alerts created count (negative SLA)

5) **Top Themes**
From Review.categoryLabels (service/price/staff/quality/cleanliness/wait_time/other) and/or extracted tags:
- Top categories overall
- Top categories among negative reviews

6) **Alerts / Escalations**
- Alerts created within range
- Alerts acknowledged/resolved (if statuses exist)
- Breakdown by type: sync_failure vs negative_review vs ocr_failure

## API Endpoints
### GET /api/admin/metrics
RBAC:
- Verify session
- Determine active businessId from session context
- Verify UserBusinessMembership
Query params:
- start=YYYY-MM-DD
- end=YYYY-MM-DD
- locationId=optional
- source=optional (google/yelp/manual)

Response JSON:
{
  "range": {"start": "...", "end": "..."},
  "filters": {"locationId": null, "source": "all"},
  "syncHealth": [{"locationId":"...","locationName":"...","source":"google","lastSyncAt":"...","lastError":null,"status":"healthy"}],
  "funnel": {"ingested": 0, "drafted": 0, "approved": 0, "posted": 0, "conversion": {"draftRate":0,"approveRate":0,"postRate":0}},
  "responseTime": {"medianMinutes": 0, "p90Minutes": 0, "avgMinutes": 0, "respondedWithin24hPct": 0},
  "reputation": {"reviewCount":0,"avgRating":0,"avgRatingPrevPeriod":0,"negativeSharePct":0},
  "themes": {"overall":[{"label":"service","count":0}],"negative":[{"label":"staff","count":0}]},
  "alerts": {"total":0,"byType":[{"type":"negative_review","count":0}]},
  "weeklyReports": {"sent":0,"lastSentAt":null}
}

Implementation notes:
- Use Prisma aggregate queries where possible; fall back to raw SQL for percentiles if needed.
- For percentiles without extensions, compute response times in JS by selecting posted drafts within range (bounded) and sorting; acceptable for MVP scale.
- Add caching headers optional (private, short TTL) once stable.
- Instrument with Sentry spans: metrics.query, and log timings.

### GET /api/admin/metrics.csv
Same RBAC + query validation. Returns text/csv.
Columns (stable names):
- business_id
- business_name
- range_start
- range_end
- location_id
- location_name
- reviews_ingested
- drafts_created
- drafts_approved
- drafts_posted
- draft_rate
- approve_rate
- post_rate
- avg_rating
- avg_rating_prev_period
- negative_share_pct
- median_response_minutes
- p90_response_minutes
- avg_response_minutes
- responded_within_24h_pct
- alerts_total
- alerts_negative_review
- alerts_sync_failure
- alerts_ocr_failure
- top_theme_overall_1
- top_theme_overall_1_count
- top_theme_negative_1
- top_theme_negative_1_count
- last_sync_at
- last_sync_error

CSV should include one row per location plus an “ALL_LOCATIONS” rollup row.

## KPI Computation Details
### Ingested
Review.createdAt between start and end AND matches filters.

### Drafted
DraftReply.createdAt between start and end AND DraftReply.review matches filters.

### Approved
DraftReply.status = 'approved' AND updatedAt between start/end (or approvedAt if present).

### Posted
DraftReply.status in ('posted_manual','posted_api') AND postedAt between start/end.

### Response time
For each posted draft:
minutes = (postedAt - Review.createdAt) / 60000
Compute median/p90/avg and within-24h share.

### Negative share
negative = Review.sentiment='negative' OR Review.rating <= 2 (configurable; use location/business thresholds if present)
negativeSharePct = negative / total * 100

### Top themes
From Review.categoryLabels array; aggregate counts. If missing, treat as 'other'.

## Reliability/Performance
- All queries must be scoped by businessId.
- Add query guards: cap max range to 365 days to prevent huge scans.
- Ensure indexes exist on:
  - Review(businessId, locationId, createdAt)
  - DraftReply(businessId, reviewId, createdAt, status, postedAt)
  - AlertEvent(businessId, createdAt, type)

## Pilot Verification Checklist (for next step)
1) Connect real GBP OAuth and select 2+ locations.
2) Run /api/cron/sync twice; confirm idempotency (no duplicates) and per-location watermarks.
3) Confirm a newly ingested review appears in queue, gets tagged, drafted, and can be approved.
4) Post manual audit recorded and response-time KPI updates in metrics.
5) Generate weekly report and confirm metrics align with dashboard counts.

## Customer-facing legitimacy links (for onboarding email)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support email: agent_bob_replit+review-bot@agentmail.to

This implementation keeps the MVP fast and reliable, avoids paid charting tools, and uses the existing data model and audit trail so that metrics are explainable and debuggable.