# Metrics Dashboard Implementation Notes + API Contract (Build Artifact)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T09:32:09.564Z

---

Overview
This artifact documents the implemented /app/admin/metrics dashboard, its KPIs/definitions, and the API contract for pulling metrics (JSON) and exporting CSV. It is designed to work with the existing schema: Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, and UserBusinessMembership.

Routes
1) UI
- GET /app/admin/metrics
  - Requires authenticated user with membership in selected Business.
  - Filters: dateFrom, dateTo, locationId (optional), source (optional: google|yelp|manual|ocr).
  - Sections:
    A) Sync Health table (per Location): lastGbpSyncAt, lastGbpReviewSyncUpdateTime, lastError (if any), consecutiveFailures (derived from recent AlertEvents).
    B) Funnel KPIs cards + trend: ingested, drafted, approved, posted; conversion rates between steps.
    C) Response Time: median and p90 time from Review.createdAt → DraftReply.postedAt (posted only), segmented by sentiment (negative vs non-negative).
    D) Alerts: alertCount, uniqueLocationsWithAlerts, top alert types/reasons.

2) APIs
- GET /api/admin/metrics?businessId=...&dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD&locationId=...&source=...
  - Returns JSON payload (see contract below).
  - RBAC: user must have UserBusinessMembership for businessId.
  - Validation: zod parses ISO dates; dateTo is exclusive (end-of-day handled by adding 1 day for inclusive UI behavior).

- GET /api/admin/metrics.csv?businessId=...&dateFrom=...&dateTo=...&locationId=...&source=...
  - Returns CSV containing daily time series rows and summary rows for quick debugging.
  - RBAC/validation identical to JSON endpoint.

KPI Definitions (consistent, non-ambiguous)
- Ingested: Review records with createdAt in [dateFrom, dateTo) matching filters.
- Drafted: DraftReply records created in [dateFrom, dateTo) linked to reviews matching filters.
- Approved: DraftReply records with approvedAt in [dateFrom, dateTo).
- Posted: DraftReply records with postedAt in [dateFrom, dateTo) and status in {posted_manual, posted_api}.
- Response time: postedAt - Review.createdAt (only for posted replies). Rejected/unposted drafts excluded.
- Sentiment segmentation uses Review.sentiment (positive|neutral|negative) set by tagging job.

JSON Contract (shape)
{
  "filters": {
    "businessId": "string",
    "dateFrom": "ISO string",
    "dateTo": "ISO string",
    "locationId": "string|null",
    "source": "google|yelp|manual|ocr|null"
  },
  "syncHealth": [
    {
      "locationId": "string",
      "locationName": "string",
      "enabled": true,
      "lastSyncAt": "ISO string|null",
      "lastWatermark": "ISO string|null",
      "lastError": "string|null",
      "recentFailureCount": 0
    }
  ],
  "funnel": {
    "ingested": 0,
    "drafted": 0,
    "approved": 0,
    "posted": 0,
    "rates": {
      "ingested_to_drafted": 0.0,
      "drafted_to_approved": 0.0,
      "approved_to_posted": 0.0
    }
  },
  "responseTime": {
    "overall": {"medianMinutes": 0, "p90Minutes": 0},
    "negative": {"medianMinutes": 0, "p90Minutes": 0},
    "nonNegative": {"medianMinutes": 0, "p90Minutes": 0}
  },
  "alerts": {
    "total": 0,
    "uniqueLocations": 0,
    "topTypes": [{"type": "string", "count": 0}]
  },
  "timeseries": {
    "byDay": [
      {
        "day": "YYYY-MM-DD",
        "ingested": 0,
        "drafted": 0,
        "approved": 0,
        "posted": 0,
        "negativeIngested": 0,
        "avgRating": 0.0
      }
    ]
  }
}

CSV Export
The CSV endpoint exports:
- A daily table with columns: day, ingested, drafted, approved, posted, negative_ingested, avg_rating.
- A summary footer with funnel totals and response-time percentiles.

Instrumentation & Reliability
- Each API call logs a correlationId and duration; slow queries (>2s) emit a warning breadcrumb to Sentry.
- Errors include filter context (businessId, dateFrom/dateTo, locationId) but exclude PII.

Notes for pilots
The dashboard is designed to be shown during onboarding calls to prove operational value: “We pulled X new reviews, drafted Y replies, posted Z, and cut median response time to N hours.” For legitimacy in any customer comms or onboarding templates, reference the product URL https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1 and support email agent_bob_replit+review-bot@agentmail.to.
