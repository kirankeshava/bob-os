# In-App Metrics Dashboard (MVP) — Implementation Notes + API Contracts

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T18:40:53.815Z

---

Overview
This cycle ships a functional metrics dashboard so pilots can be run safely and issues can be debugged quickly without DB access. The dashboard lives at /app/admin/metrics and is accessible only to authenticated users with membership in the selected Business.

What the dashboard shows
1) Sync Health
- Per-location table: Location name, integration type (Google/manual), lastSyncAt, lastError (truncated), consecutiveFailureCount, lastSuccessfulReviewIngestedAt.
- Health rollups: number of enabled locations, number healthy (synced within X hours), number failing.

2) Activation Funnel (for selected date range)
Definitions (consistent across UI/API/CSV):
- ingested: Review.createdAt within range (or ingestedAt if present)
- drafted: DraftReply.createdAt within range AND DraftReply.reviewId belongs to an ingested review in range
- approved: DraftReply.approvedAt within range
- posted: DraftReply.postedAt within range OR DraftReply.status in {posted_manual, posted_api}

Computed KPIs:
- Draft rate = drafted / ingested
- Approval rate = approved / drafted
- Posting rate = posted / approved

3) Response Time
- Ingest → Approve: median + p90 of (approvedAt - reviewCreatedAt/ingestedAt)
- Approve → Posted: median + p90 of (postedAt - approvedAt)
- Excludes rejected drafts and drafts never posted.

4) Reputation KPIs
- Review volume (count)
- Average rating (mean)
- Negative share: percent of reviews where (rating <= 2 OR sentiment = negative)
- Top themes: category counts overall and negative-only (service/price/staff/quality/cleanliness/wait_time/other)

5) Alerts
- Recent AlertEvents list (negative review SLA breaches, sync failures, OCR failures)
- Alert volume time series (daily)

Routes and endpoints
UI Route
- GET /app/admin/metrics?businessId=...&locationId=...&from=YYYY-MM-DD&to=YYYY-MM-DD

JSON API
- GET /api/admin/metrics
Query params:
- businessId (required)
- from (optional, defaults to last 14 days)
- to (optional, defaults to today)
- locationId (optional)
Response shape (high-level):
{
  "range": {"from": "2026-03-26", "to": "2026-04-09"},
  "syncHealth": {
    "locations": [
      {
        "locationId": "...",
        "name": "Downtown",
        "enabled": true,
        "integration": "google",
        "lastSyncAt": "...",
        "lastError": "...",
        "consecutiveFailureCount": 0
      }
    ],
    "rollup": {"enabled": 2, "healthy": 2, "failing": 0}
  },
  "funnel": {
    "counts": {"ingested": 52, "drafted": 49, "approved": 40, "posted": 31},
    "rates": {"draftRate": 0.94, "approvalRate": 0.82, "postingRate": 0.78}
  },
  "responseTime": {
    "ingestToApprove": {"medianMinutes": 180, "p90Minutes": 1440},
    "approveToPosted": {"medianMinutes": 60, "p90Minutes": 720}
  },
  "reputation": {
    "avgRating": 4.42,
    "negativeShare": 0.08,
    "themes": {
      "overall": {"service": 12, "staff": 9, "price": 4, "other": 27},
      "negative": {"service": 2, "staff": 1, "price": 1, "other": 0}
    }
  },
  "alerts": {
    "recent": [{"type": "NEGATIVE_REVIEW", "createdAt": "...", "message": "..."}],
    "dailyCounts": [{"date": "2026-04-08", "count": 2}]
  },
  "timeseries": {
    "daily": [
      {"date": "2026-04-01", "reviews": 3, "avgRating": 4.7, "negative": 0, "approved": 2, "posted": 1}
    ]
  }
}

CSV Export
- GET /api/admin/metrics.csv with same query params
Exports:
- Daily time series rows with date, reviewCount, avgRating, negativeCount, draftedCount, approvedCount, postedCount, medianIngestToApproveMinutes, medianApproveToPostedMinutes
- Optional location column if locationId not provided (location breakdown)

Security/RBAC
- Requests require authenticated session.
- businessId must be a business the user belongs to (UserBusinessMembership).
- locationId (if provided) must belong to that business.

Instrumentation
- Each request logs: businessId, locationId, from/to, correlationId, durationMs.
- Sentry spans wrap DB aggregation groups; errors are captured with safe metadata only (no review text).

Pilot outreach note (if emailing businesses)
When inviting a pilot, share:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

This dashboard is intended to be the operational “single pane of glass” during week-1 free pilots, ensuring we can prove value (response speed + rating protection) and quickly debug ingestion/sync issues.