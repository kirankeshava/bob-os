# Admin Metrics Dashboard — Implementation Notes + KPI Definitions (Ready to Use)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:55:33.461Z

---

Overview
This artifact documents the implemented /app/admin/metrics dashboard behavior, the KPI definitions used, and the exact API contract for /api/admin/metrics and /api/admin/metrics.csv. It is written to be customer-trial ready and to reduce ambiguity when interpreting numbers.

Routes shipped
1) UI: /app/admin/metrics
- Filters: business (implicit from membership), date range (from/to), location (optional: all or single).
- Sections:
  A) Sync Health (per enabled location)
     - lastSyncAt, lastError (message + timestamp), consecutiveFailureCount (if tracked), and whether GBP sync is enabled.
  B) Funnel KPIs
     - Ingested reviews: count of Review.createdAt within range.
     - Drafted: count of DraftReply.createdAt within range (drafts associated to reviews in range).
     - Approved: count of DraftReply where status became APPROVED within range.
     - Posted: count of DraftReply where status became POSTED_* (manual or api) within range.
     - Conversion rates: drafted/ingested, approved/drafted, posted/approved.
  C) Reputation KPIs
     - Average rating (mean of Review.rating for reviews created within range).
     - Negative share: percent of reviews where (rating <= 2) OR (sentimentTag = NEGATIVE when present).
     - Top themes: distribution of category labels (service/price/staff/quality/cleanliness/wait_time/other) from tagging.
  D) Response-time KPIs
     - Response time = time between Review.createdAt and the first “posted” timestamp for that review.
     - Posted timestamp source order:
       i) DraftReply.postedAt if present
       ii) AuditLog event (DRAFT_POSTED_MANUAL or DRAFT_POSTED_API) timestamp
     - Exclusions:
       - Drafts that were rejected and never posted are excluded.
       - Reviews without any posted reply are excluded from response-time calculation.
     - Summary displayed: median response time + P90 (if enabled in code) for stability.
  E) Alerts summary
     - Count of AlertEvent in range grouped by type (SLA_NEGATIVE_REVIEW, SYNC_FAILURE, OCR_FAILURE, etc.) and severity.

API contract
2) JSON: GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=optional
Response shape (high level)
{
  "range": {"from": "...", "to": "...", "locationId": null|"..."},
  "syncHealth": [{"locationId":"...","locationName":"...","lastSyncAt":"...","lastError":"..."}],
  "kpis": {
    "ingested": number,
    "drafted": number,
    "approved": number,
    "posted": number,
    "avgRating": number,
    "negativeShare": number,
    "medianResponseMinutes": number|null,
    "p90ResponseMinutes": number|null
  },
  "funnel": {
    "draftRate": number,
    "approvalRate": number,
    "postRate": number
  },
  "timeSeries": {
    "daily": [
      {"date":"YYYY-MM-DD","reviews":n,"avgRating":n|null,"negativeShare":n|null,"medianResponseMinutes":n|null}
    ]
  },
  "themes": [{"label":"service","count":n},{"label":"price","count":n},...],
  "alerts": [{"type":"SYNC_FAILURE","severity":"high","count":n},...]
}

3) CSV: GET /api/admin/metrics.csv?from=...&to=...&locationId=optional
- Returns a CSV containing:
  - Summary rows (key,value) for the top KPIs
  - A per-review table including: reviewId, source, location, createdAt, rating, sentiment, categories, draftedAt, approvedAt, postedAt, status, responseMinutes
This is intended for debugging and for sharing evidence of responsiveness improvements with customers.

RBAC + validation
- Both endpoints require an authenticated user with membership to the requested business.
- Inputs are validated (date parsing, maximum range enforced). If a range exceeds the configured limit, the API returns 400 with a helpful message.

How this supports MVP reliability
- The dashboard makes sync failures visible immediately (per location) and ties them to AlertEvents, making it easier to run pilots without silent breakage.
- Funnel metrics reveal drop-offs (e.g., drafted but not approved; approved but not posted) so onboarding can focus on the correct step.
- Response-time metrics match the weekly report’s definitions, preventing conflicting numbers across the product.

Customer-facing note (if asked what this is)
“This page shows your review operations health: how many reviews came in, how quickly you responded, how many required escalation, and whether Google syncing is healthy. It’s designed to prove ROI and catch issues early.”