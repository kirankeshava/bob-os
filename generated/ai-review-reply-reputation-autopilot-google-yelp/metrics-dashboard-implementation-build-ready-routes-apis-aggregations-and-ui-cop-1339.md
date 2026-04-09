# Metrics Dashboard Implementation (Build-Ready) — Routes, APIs, Aggregations, and UI Copy

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T15:10:57.377Z

---

Overview
This artifact documents the shipped Metrics Dashboard for the AI Review Reply & Reputation Autopilot MVP. It includes routes, API contracts, KPI definitions, aggregation logic, CSV format, and UI copy so the system is maintainable and customer-ready.

Primary Goal
Give each Business a single place to understand: (1) whether ingestion/sync is working, (2) how many reviews are flowing through the workflow (ingest → draft → approval → posted), and (3) whether negative reviews are being handled within SLA.

Routes (Next.js App Router)
1) /app/admin/metrics
- Access: RBAC required (User must be a member of the Business; admin role if enforced).
- Filters:
  - Date range: dateFrom, dateTo (defaults: last 14 days)
  - Location: locationId=all or specific location
- Sections:
  A. Sync Health
    - Table: Location Name | Source (Google/manual/email/OCR) | Last Sync At | Last Error | Consecutive Failures
    - Definition: “Last Sync At” is last successful sync timestamp for that location’s integration.
  B. Activation Funnel
    - Stat cards: Ingested Reviews, Drafts Created, Approved Drafts, Posted (Manual/API), Rejected
    - Derived rates: Draft rate = drafts/ingested, Approval rate = approved/drafts, Posting rate = posted/approved
    - Response time: median hours from Review.createdAt → DraftReply.postedAt (excluding rejected and never-posted)
  C. Alerts & SLA
    - Stat cards: Negative Reviews, Alerts Sent, SLA Breaches
    - Table: date | negative_count | alerts_sent | breaches

2) /api/admin/metrics (JSON)
- Method: GET
- Query params:
  - dateFrom (ISO string, optional)
  - dateTo (ISO string, optional)
  - locationId (string | "all", optional)
- Response shape:
{
  "range": {"dateFrom": "...", "dateTo": "...", "tz": "UTC"},
  "syncHealth": [{"locationId":"...","locationName":"...","source":"google","lastSyncAt":"...","lastError":"...","consecutiveFailures":2}],
  "funnel": {"ingested": 120, "drafted": 110, "approved": 80, "posted": 65, "rejected": 10, "draftRate": 0.92, "approvalRate": 0.73, "postingRate": 0.81, "medianResponseHours": 6.4},
  "timeseries": [{"date":"2026-04-01","ingested":10,"posted":6,"avgRating":4.3,"negativeShare":0.10}],
  "alerts": {"negativeReviews": 12, "alertsSent": 9, "slaBreaches": 2}
}
- Validation: Zod enforces valid dates and location membership.
- Instrumentation: Each request logs correlationId, businessId, filters, query latency; Sentry captures thrown errors.

3) /api/admin/metrics.csv (CSV export)
- Method: GET
- Same query params as JSON endpoint.
- CSV headers (daily):
  date,location_id,location_name,ingested,drafted,approved,posted,rejected,avg_rating,negative_share,median_response_hours,alerts_sent,sla_breaches
- Intended use: owner can download and share with customers, or load into Sheets.

KPI Definitions (Important)
- Ingested: count of Review rows created within date range.
- Drafted: count of DraftReply rows created within date range, linked to reviews in scope.
- Approved: DraftReply.status == “approved”.
- Posted: DraftReply.status in {“posted_manual”, “posted_api”}.
- Rejected: DraftReply.status == “rejected”.
- Negative review:
  - sentiment == “negative” OR rating <= 2 (configurable; dashboard uses stored sentiment/rating).
- Response time (hours):
  - For posted drafts only: postedAt - Review.createdAt
  - Excludes rejected and never-posted to avoid distorting SLA metrics.

Aggregation Strategy (No migrations required)
- Use Prisma aggregations grouped by day with safe limits.
- Compute per-location filters by constraining queries to locationId when provided.
- Median response time: pull response durations for posted drafts within range (bounded by max rows/day) and compute median in application code; if dataset is large, switch to approximate percentile in SQL.

UI Copy (Customer-facing)
- Page title: “Reputation Operations Metrics”
- Sync Health helper text: “Shows whether review ingestion is healthy per location. If Last Sync is stale or errors repeat, drafts and alerts may lag.”
- Funnel helper text: “Tracks reviews moving from ingestion → draft → approval → posted. Improve Posting Rate to maximize rating lift from responsiveness.”
- Alerts helper text: “Negative reviews should be addressed quickly. SLA breaches indicate delayed response or missing escalation.”

Support / Customer Communication Template (for pilots)
Subject: Metrics dashboard is live for your Review Autopilot
Body:
Hi — your metrics dashboard is now available inside the app.

You can log in and view:
• Sync Health (per location)
• Review workflow funnel (ingested → drafted → approved → posted)
• Alerts & SLA performance

If you’d like, reply here and we’ll walk through it together and ensure your Google integration is syncing correctly.
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

Operational Notes
- Dashboard is intentionally lightweight: tables first, charts optional.
- All metrics are derived from existing Review/DraftReply/AlertEvent/Location fields to avoid adding risk.
- Any query failures are visible via Sentry and logs, and do not break core ingestion/approval flows.
