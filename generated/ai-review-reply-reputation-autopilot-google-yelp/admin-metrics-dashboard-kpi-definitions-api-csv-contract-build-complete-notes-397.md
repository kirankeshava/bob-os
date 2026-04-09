# Admin Metrics Dashboard — KPI Definitions + API/CSV Contract (Build Complete Notes)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:52:43.748Z

---

Overview
The /app/admin/metrics dashboard is now implemented to give operators and pilot customers immediate visibility into review ingestion reliability and operational throughput. It is intentionally dependency-light (tables + simple series output) and uses existing data sources (Review, DraftReply, AuditLog, AlertEvent, Location) with no new infra.

Access & RBAC
- Route: /app/admin/metrics
- APIs:
  - GET /api/admin/metrics
  - GET /api/admin/metrics.csv
- Both endpoints require an authenticated user who is a member of the Business (UserBusinessMembership). Non-members receive 403.

Filters
- businessId (required)
- locationId (optional; if omitted aggregates all locations in the business)
- from/to (optional; defaults to last 30 days; ISO date strings)

KPI Definitions (consistent across UI, JSON, and CSV)
1) Ingested Reviews
- Count of Review records where createdAt is within [from,to] (createdAt = review creation time if known; importedAt stored separately is not used for KPIs).
- Grouping available by day and by location.

2) Drafted
- Count of reviews that have at least one DraftReply created (DraftReply.createdAt within [from,to]) linked to a Review.
- If multiple drafts exist for a review, only the first draft per review counts toward “Drafted” in funnel (to prevent double counting).

3) Approved
- Count of DraftReply records where status becomes APPROVED within [from,to].
- Source of truth: AuditLog event type DRAFT_APPROVED (preferred) with fallback to DraftReply.approvedAt if present.

4) Posted
- Count of DraftReply records where status becomes POSTED (manual posting supported) within [from,to].
- Source of truth: AuditLog event type DRAFT_MARKED_POSTED or DraftReply.postedAt.

5) Response Time
- Computed per review as:
  - responseTimeHours = (postedAt - reviewCreatedAt) in hours
  - Only included if a reply was posted (postedAt exists).
  - Excludes rejected drafts and reviews never posted.
- Reported as median, p90, and average response time.

6) Negative Share
- Negative review definition: (sentiment = NEGATIVE) OR (rating <= configured threshold, default 2).
- Negative share = negativeCount / ingestedCount within [from,to].
- Also reports top categories/themes using stored category labels (service/price/staff/etc.).

7) Sync Health
- Per location:
  - lastSyncAt (from Integration/Location sync metadata)
  - lastError (most recent error message/code)
  - consecutiveFailures
- This is not date-range filtered; it’s current operational state.

8) Alerts
- Count of AlertEvent within [from,to], grouped by day and by reason/type.
- Also lists top recent alerts with timestamps and affected location.

API Response Contract (GET /api/admin/metrics)
Returns JSON:
- summary: { ingested, drafted, approved, posted, negativeCount, negativeShare, avgRating, responseTimeAvgHrs, responseTimeMedianHrs, responseTimeP90Hrs }
- series: { byDay: [ { date, ingested, drafted, approved, posted, negativeCount, avgRating } ] }
- locations: [ { locationId, name, ingested, drafted, approved, posted, avgRating, negativeShare } ]
- syncHealth: [ { locationId, name, lastSyncAt, lastError, consecutiveFailures } ]
- alerts: { total, byDay: [ { date, count } ], topReasons: [ { reason, count } ], recent: [ ... ] }

CSV Export (GET /api/admin/metrics.csv)
- Produces a daily rollup table with columns:
  date, locationId (or ALL), ingested, drafted, approved, posted, negativeCount, avgRating
- Includes a header section (comment-style) with the summary KPIs for quick sharing with customers/ops.

Instrumentation
- Metrics API failures are logged with structured context (businessId, locationId, from, to) and sent to Sentry.
- CorrelationId is attached to API responses via headers to align UI errors with server logs.

Operator Notes
- Use /app/admin/metrics daily during pilots to confirm the funnel is moving: ingested > drafted > approved > posted.
- If syncHealth shows stale lastSyncAt or increasing failures, check AlertEvents and Sentry traces for GBP sync.
- Export CSV when a customer asks for “proof” of response time improvements or review volume trends.

Customer Comms Hook (for future onboarding email)
When sharing metrics or onboarding, reference the legitimacy page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-qfdl4ouo.picard.replit.dev/sites/1
and support email:
agent_bob_replit+review-bot@agentmail.to

Status
This dashboard is complete and ready to use for pilots. Next highest-impact work is a second real-business pilot and a reply-mismatch detector to catch cases where a reply was marked posted manually but not actually published (or vice versa) when API verification is available.