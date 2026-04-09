# Admin Metrics Dashboard — Implementation Notes + API/CSV Contract

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:39:18.060Z

---

Overview
The MVP now includes an in-app metrics dashboard at /app/admin/metrics that helps an operator or owner quickly answer: (1) are integrations syncing, (2) are we responding fast enough, (3) where are reviews getting stuck, and (4) are negative-review SLAs being met.

Access + RBAC
All dashboard routes are restricted to authenticated users who have a UserBusinessMembership for the active business. Requests to /api/admin/metrics and /api/admin/metrics.csv require membership; otherwise they return 403.

UI: /app/admin/metrics
Filters
- Date range: startDate, endDate (defaults last 14 days)
- Location: all locations or a specific locationId
- Source (optional): google | yelp | manual (kept optional for future)

Sections
1) Sync Health
- Table: Location name, integration type, lastSyncAt, lastError (message/code), consecutiveFailures
- Purpose: quickly see which locations are failing and whether failures are localized.

2) Funnel KPIs (for the selected date range)
- Ingested reviews: count of Review.createdAt in range
- Drafted: count of DraftReply created for those reviews in range
- Approved: count of DraftReply approvedAt in range
- Posted: count of DraftReply postedAt in range (manual/API)
- Conversion rates: drafted/ingested, approved/drafted, posted/approved
- Median response time (posted): median(postedAt - Review.createdAt) in hours, excluding rejected/unposted
- Backlog counts: approved-not-posted, drafted-not-approved

3) Alerts
- Count of AlertEvent created in range, broken down by type (negative_review, sync_failed, ocr_failed, etc.)
- Count of “unacked” alerts (where applicable)

API: /api/admin/metrics (JSON)
Request query params
- startDate=YYYY-MM-DD
- endDate=YYYY-MM-DD
- locationId=string | "all"

Response shape (contract)
{
  "filters": { "startDate": "2026-04-01", "endDate": "2026-04-08", "locationId": "all" },
  "syncHealth": [
    { "locationId": "...", "locationName": "Downtown", "source": "google", "lastSyncAt": "...", "lastError": null, "consecutiveFailures": 0 }
  ],
  "headline": {
    "ingested": 42,
    "drafted": 38,
    "approved": 31,
    "posted": 25,
    "approvedNotPosted": 6,
    "draftedNotApproved": 7,
    "medianResponseHours": 9.6,
    "negativeShare": 0.12
  },
  "timeseriesDaily": [
    { "date": "2026-04-01", "ingested": 5, "drafted": 4, "approved": 3, "posted": 3, "alerts": 1, "avgRating": 4.4 }
  ],
  "alertsByType": [
    { "type": "negative_review", "count": 3 },
    { "type": "sync_failed", "count": 1 }
  ]
}

Definitions (important for consistency)
- Ingested: Review.createdAt within [startDate, endDate]
- Drafted: DraftReply.createdAt within range (and tied to reviews under the same filters)
- Approved: DraftReply.approvedAt within range
- Posted: DraftReply.postedAt within range (manual or API)
- Response time: postedAt - Review.createdAt in hours. Excludes drafts that were rejected or never posted.
- Negative share: (# reviews with sentiment=negative OR rating<=2) / ingested

CSV: /api/admin/metrics.csv
Purpose
A “flat” export suitable for spreadsheets/Looker Studio. CSV contains:
- Header block (key/value rows) for headline metrics
- Daily timeseries rows
- Alerts by type rows

CSV structure (example)
section,key,value
headline,ingested,42
headline,drafted,38
headline,approved,31
headline,posted,25
headline,medianResponseHours,9.6

section,date,ingested,drafted,approved,posted,alerts,avgRating
daily,2026-04-01,5,4,3,3,1,4.4

section,type,count
alertsByType,negative_review,3
alertsByType,sync_failed,1

Instrumentation
- Metrics endpoints log durationMs, businessId, locationId, dateRange, and error class.
- Sentry captures exceptions with tags: businessId, route=/api/admin/metrics, correlationId.

Customer-facing note (for future sales/onboarding)
When presenting the product, direct prospects to the business website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and use the contact email agent_bob_replit+review-bot@agentmail.to for onboarding/support. This dashboard is a key retention feature because it proves responsiveness and rating impact week over week.
