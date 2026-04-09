# In‑App Metrics Dashboard (Build Artifact): Routes, Queries, API Contract, CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T05:07:07.745Z

---

Overview
Add an admin-only metrics dashboard that answers 3 questions for each Business: (1) Is syncing healthy? (2) Are reviews moving through the funnel (ingested→drafted→approved→posted)? (3) Are negative reviews being escalated and handled within SLA?

Public/Customer legitimacy reference
If you add a “Help / About” link in the dashboard footer, point to the product website URL for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Routes
1) UI
- GET /app/admin/metrics
  - Date range picker (default: last 30 days)
  - Location filter (All locations + individual)
  - Sections: Sync Health, Funnel KPIs, Response Time, Alerts & Escalations, Top Themes
  - Button: “Export CSV” (hits /api/admin/metrics.csv with same query params)

2) APIs
- GET /api/admin/metrics?businessId=...&from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=optional
  - Returns JSON (schema below)
- GET /api/admin/metrics.csv?businessId=...&from=...&to=...&locationId=optional
  - Returns text/csv with a flattened row format

RBAC
- Require authenticated user
- Require membership in the Business (UserBusinessMembership)
- Only allow admin role to view /app/admin/metrics (or allow owners + members; but keep “sync now” admin-only if you add it)

KPI Definitions (consistent and computable from existing tables)
Time window: filter by Review.createdAt between [from, to] unless otherwise stated.

A) Sync Health (per Location)
- lastSyncAt: Integration.lastSyncAt OR Location.lastGbpSyncAt if you store per-location; if not, derive from latest AuditLog action ‘gbp.sync.complete’ (recommended)
- lastSyncError: most recent failure from AuditLog/AlertEvent
- syncFailureCount7d: count AlertEvent where type='sync_failure' in last 7 days
- newReviews7d: count Reviews created in last 7 days

B) Funnel KPIs
For selected time window (Reviews.createdAt in range):
- ingested: count Reviews
- drafted: count Reviews that have at least 1 DraftReply created (DraftReply.createdAt not null)
- approved: count DraftReply where status='approved' (or Review.status='approved' if you mirror it)
- posted: count DraftReply where status in ('posted_manual','posted_api')
- rejected: count DraftReply where status='rejected'
Rates:
- draftRate = drafted/ingested
- approvalRate = approved/drafted
- postRate = posted/approved

C) Response Time
Compute only for posted replies (manual or API).
- responseTimeHours = postedAt - Review.createdAt
- avgResponseTimeHours, medianResponseTimeHours, p90ResponseTimeHours
Also show “time to first action”:
- firstActionAt = min(DraftReply.createdAt, first AuditLog action related to the review)

D) Alerts & Escalations
- negativeReviews: count Reviews where rating<=2 OR sentiment='negative'
- escalationsTriggered: count AlertEvent where type='negative_review_alert'
- escalationsAcknowledged: count AlertEvent where acknowledgedAt not null (if field exists; if not, add minimal field later)
- SLA breaches: count negative reviews where now - Review.createdAt > configured SLA and no posted reply

E) Top Themes
Use persisted category labels on Review (service/price/staff/etc.)
- topCategories: group by category label; return counts and percentages

API JSON Response (example shape)
{
  "range": {"from": "2026-03-10", "to": "2026-04-09"},
  "filters": {"businessId": "...", "locationId": null},
  "syncHealth": [
    {"locationId":"...","locationName":"Downtown","lastSyncAt":"...","lastError":null,"syncFailureCount7d":0,"newReviews7d":12}
  ],
  "funnel": {
    "ingested": 120,
    "drafted": 110,
    "approved": 85,
    "posted": 70,
    "rejected": 10,
    "draftRate": 0.92,
    "approvalRate": 0.77,
    "postRate": 0.82
  },
  "responseTime": {"avgHours": 18.2, "medianHours": 12.4, "p90Hours": 41.0},
  "alerts": {"negativeReviews": 14, "alertsTriggered": 14, "slaBreaches": 3},
  "themes": [{"label":"service","count":33},{"label":"staff","count":21},{"label":"price","count":9}]
}

Query Plan (Prisma-friendly; use raw SQL only for percentiles if needed)
Inputs: businessId, from, to, optional locationId
Where clause shared: { businessId, ...(locationId? {locationId}: {}), createdAt: {gte: from, lte: to} }

1) Funnel counts
- ingested: prisma.review.count({ where })
- drafted: prisma.review.count({ where: {...where, draftReplies: { some: {} } } })
- approved: prisma.draftReply.count({ where: { businessId, ...(locationId? {locationId}: {}), status: 'approved', review: { createdAt: {gte: from, lte: to} } } })
- posted: prisma.draftReply.count({ where: { businessId, ...(locationId? {locationId}: {}), status: { in: ['posted_manual','posted_api'] }, review: { createdAt: {gte: from, lte: to} } } })
- rejected: prisma.draftReply.count({ where: { businessId, ...(locationId? {locationId}: {}), status: 'rejected', review: { createdAt: {gte: from, lte: to} } } })

2) Response time (avg/median/p90)
Recommended approach:
- Fetch posted drafts with select { postedAt, review: { select: { createdAt: true } } }
- Compute durations in JS for avg/median/p90 (fast enough for MVP volumes). Add cap (e.g., max 5k rows) with pagination; if above, fallback to SQL percentile.

3) Negative reviews and SLA breaches
- negativeReviews: prisma.review.count({ where: {...where, OR:[{rating:{lte:2}},{sentiment:'negative'}]} })
- slaBreaches:
  - fetch negative reviews within window with no posted draftReply
  - compute: now - createdAt > slaHours (from Location or EscalationRule)

4) Themes
If Review has categoryLabels array/json:
- If stored as separate table: groupBy.
- If stored as JSON array: do application-level counting by fetching minimal fields (categoryLabels) for reviews in range.

5) Sync health
- For each enabled location in business:
  - lastSyncAt: prefer Location.lastGbpReviewSyncAt; else read Integration.lastSyncAt
  - lastError: latest AlertEvent for that location where type in ('sync_failure','gbp_error')
  - syncFailureCount7d: count AlertEvent last 7d
  - newReviews7d: count Reviews created last 7d

CSV Export
Endpoint: /api/admin/metrics.csv
Return single CSV with multiple sections separated by blank lines OR a flattened “daily rollup” table.
MVP simplest: single-row summary + per-location table appended.

CSV format (recommended)
Section 1: summary
columns:
- from,to,businessId,locationId
- ingested,drafted,approved,posted,rejected,draftRate,approvalRate,postRate
- avgResponseHours,medianResponseHours,p90ResponseHours
- negativeReviews,alertsTriggered,slaBreaches

Section 2: sync_health
columns:
- locationId,locationName,lastSyncAt,lastError,syncFailureCount7d,newReviews7d

UI Components (minimal)
- Summary cards row: Ingested, Posted, Avg response time, Negative reviews, SLA breaches
- Funnel table: counts + rates
- Sync health table: location rows with status badges (OK/Warning/Error)
- Themes bar list: label + count
- Alerts list: last 10 AlertEvents with timestamp/type/location

Validation
Use zod on query params:
- from/to required, ISO date, max range 365 days
- locationId optional

Instrumentation
Log each metrics request with correlationId and total compute time; send to Sentry if >2s or error.

Acceptance criteria (owner can test in <15 minutes)
1) Navigate to /app/admin/metrics as an invited admin member; page loads without errors.
2) Change date range; counts update.
3) Filter by location; per-location tables and summary reflect filter.
4) Export CSV downloads and opens cleanly.
5) If a location has sync failures, it surfaces in sync health with lastError.
