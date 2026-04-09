# Metrics Dashboard MVP — Implementation Notes + KPI Definitions + CSV Schema

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T17:37:36.963Z

---

Overview
This artifact documents the shipped Metrics Dashboard MVP for the AI Review Reply & Reputation Autopilot. It includes KPI definitions, data sources, API contracts, and the CSV export schema so the dashboard can be validated during pilots and used to troubleshoot customer outcomes.

Where it lives (UI + APIs)
- UI: /app/admin/metrics
- JSON API: GET /api/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=optional
- CSV Export: GET /api/admin/metrics.csv?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=optional
All routes are RBAC protected (user must be a member of the Business).

Dashboard sections
1) Sync Health
- Per location:
  - Location name
  - Integration/source (Google, Yelp, Manual)
  - Last reviews sync time (Location.lastGbpReviewSyncAt where applicable)
  - Last error string (Location.lastGbpReviewSyncError or latest AlertEvent with type=integration_error)
  - Reviews ingested in range
Purpose: quickly confirm data is flowing and locate broken integrations.

2) Funnel KPIs (Activation Funnel)
Definitions are computed consistently for the selected date range:
- Ingested: count of Review where createdAt is within [start, end]
- Drafted: count of DraftReply created within [start, end] (or linked to reviews in range if configured). Current implementation uses DraftReply.createdAt.
- Approved: count of DraftReply where status=approved AND approvedAt within [start, end]
- Posted: count of DraftReply where postedAt is NOT NULL within [start, end] (includes posted_manual and any future API posting)
- Approval rate: approved / drafted
- Posting rate: posted / approved
Purpose: shows where customers are getting stuck (no drafts, no approvals, or not posting).

3) Response Time
- Metric: avgResponseMinutes
- Definition: for posted replies only, postedAt - Review.createdAt (in minutes)
- Exclusions: DraftReply rejected OR never posted are excluded; response time is only meaningful for posted replies.
Purpose: responsiveness is a key driver of review conversion/retention and a strong “value proof” metric.

4) Reputation Mix
- Avg rating: average(Review.rating) over ingested reviews in range
- Negative share: count(negative) / count(all)
- Negative definition: sentiment=negative OR rating <= 2
- If a location/business has a custom escalation threshold (e.g., rating<=3), negative share respects the configured threshold where available.
Purpose: validates the system is focusing effort on high-risk reviews.

5) Alerts
- alertCount: count of AlertEvent created within [start, end]
- timeToAck (if tracked): avg time between alert createdAt and acknowledgedAt
Purpose: shows whether escalation is working and whether SLA is being met.

Data sources (no new tables required)
- Review: rating, author, text, createdAt, source, sentiment, categories
- DraftReply: status, createdAt, approvedAt, postedAt, postedMethod
- Location: last sync metadata (GBP watermarks and last sync timestamps)
- AlertEvent: escalation/ingestion/integration failures
- AuditLog: action trail for approvals/posts and debugging

API response shape (JSON)
GET /api/admin/metrics returns:
- range: { start, end }
- totals:
  - ingested, drafted, approved, posted
  - approvalRate, postingRate
  - avgRating
  - negativeCount, negativeShare
  - avgResponseMinutes
  - alertCount
- byLocation: array of per-location objects with the same KPI subset
- syncHealth: array summarizing lastSyncAt/lastError per location

CSV export schema
The CSV endpoint outputs one row per location plus a final TOTAL row:
Columns:
- locationId
- locationName
- source
- startDate
- endDate
- ingested
- drafted
- approved
- posted
- approvalRate
- postingRate
- avgRating
- negativeCount
- negativeShare
- avgResponseMinutes
- alertCount
Notes:
- Rates are exported as decimals (0–1) for easy spreadsheet formatting.
- avgResponseMinutes is blank when posted=0.

Reliability + instrumentation
- Each metrics request logs businessId, locationId filter, and date range.
- Each aggregation runs inside guarded try/catch with partial results returned if a sub-query fails.
- Sentry spans wrap the expensive queries to identify slowdowns during pilots.

Pilot validation checklist (how to confirm it works)
1) Ingest at least 5 reviews (GBP sync + one manual/Yelp import).
2) Confirm drafted count increases after tagging/drafting jobs run.
3) Approve at least 2 drafts and mark 1 as posted via manual flow.
4) Confirm posted count=1 and avgResponseMinutes > 0.
5) Trigger a negative review to verify alertCount increments.

Customer-facing reference
For legitimacy and onboarding links in communications:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to
