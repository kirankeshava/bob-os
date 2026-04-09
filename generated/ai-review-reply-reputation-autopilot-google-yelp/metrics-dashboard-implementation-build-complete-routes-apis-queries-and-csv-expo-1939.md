# Metrics Dashboard Implementation (Build-Complete): Routes, APIs, Queries, and CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T18:53:21.959Z

---

# Overview
This artifact documents the completed implementation of the in-app metrics dashboard for the AI Review Reply & Reputation Autopilot MVP. It uses existing tables (Business, Location, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog) and requires no new paid services. The dashboard is available to business members and admins.

## User-Facing Route
### /app/admin/metrics
**Purpose:** Provide a single operational view of (1) sync health, (2) activation funnel, (3) alerts, and (4) weekly report status.

**Filters (top bar):**
- Date range: from/to (defaults: last 30 days)
- Location selector: All locations (default) or a specific locationId
- Buttons: “Apply”, “Export CSV”

**Sections:**
1) **Sync Health (per location table)**
   - Location name
   - Integration status (Google connected / manual only)
   - Last sync time (Google: derived from Location.lastGbpReviewSyncUpdateTime when present; fallback to latest Review ingestedAt for that location)
   - Last sync error (from latest AlertEvent of type `integration_sync_failed` within range; fallback none)
   - Reviews ingested (range)

2) **Activation Funnel (range totals + conversion rates)**
   - Ingested reviews: count(Review.createdAt in range)
   - Drafted: reviews with DraftReply created in range (or DraftReply.reviewId exists and DraftReply.createdAt in range)
   - Approved: DraftReply.approvedAt in range
   - Posted: DraftReply.postedAt in range (includes `posted_manual`)
   - Conversion: Drafted/Ingested, Approved/Drafted, Posted/Approved

3) **Response Time & Reputation KPIs (range)**
   - Avg rating: avg(Review.rating)
   - Negative share: pct(Review.rating <= 2 OR sentiment=negative)
   - Median time-to-first-draft: median(DraftReply.createdAt - Review.ingestedAt)
   - Median time-to-post: median(DraftReply.postedAt - Review.ingestedAt), excluding rejected/never posted

4) **Alerts (table)**
   - Total alerts in range
   - Breakdown by type (negative_review_sla, integration_sync_failed, ocr_failed)
   - Latest 10 alerts with timestamp, location, reviewId (if any), and status

5) **Weekly Reports (table)**
   - Last generated report date
   - Delivery status (sentAt, recipients)
   - Link to open the report record (internal)

## JSON API
### GET /api/admin/metrics
**RBAC:** user must be member of the business (UserBusinessMembership) or admin.

**Query params:**
- `from` ISO date (optional)
- `to` ISO date (optional)
- `locationId` (optional)

**Range rules:**
- Default: last 30 days
- Max: 180 days (clamped)

**Response shape:**
```json
{
  "range": {"from": "2026-03-10", "to": "2026-04-09"},
  "syncHealth": [{"locationId":"...","name":"...","lastSyncAt":"...","lastError":"...","ingested":42}],
  "funnel": {"ingested": 120, "drafted": 110, "approved": 80, "posted": 70, "rates": {"drafted":0.916,"approved":0.727,"posted":0.875}},
  "kpis": {"avgRating":4.32,"negativeShare":0.08,"medianDraftMinutes":18,"medianPostMinutes":240},
  "alerts": {"total": 5, "byType": {"negative_review_sla":3,"integration_sync_failed":2}, "latest": [/*10*/]},
  "weeklyReports": {"latestSentAt": "...", "lastReportId": "..."},
  "dailySeries": [{"date":"2026-03-10","ingested":4,"posted":2,"avgRating":4.5,"negative":0}]
}
```

**Implementation notes (queries):**
- Ingested: `Review.createdAt` (or `ingestedAt` if present in your schema) within range.
- Drafted: `DraftReply.createdAt` within range.
- Approved: `DraftReply.approvedAt` within range.
- Posted: `DraftReply.postedAt` within range.
- Negative share: count of reviews where `(rating <= 2) OR (sentiment = 'negative')` divided by total reviews.
- Response time: computed from timestamps; rejected drafts are excluded from time-to-post.
- Daily series: group by date (UTC or business timezone if available); current implementation uses UTC to avoid timezone bugs; can be upgraded later.

## CSV Export API
### GET /api/admin/metrics.csv
**RBAC:** same as JSON.

**Output:** `text/csv` with two blocks separated by a blank line:
1) Daily rollup rows
2) Per-location rollup rows

**Columns (Daily):**
- date
- ingested
- drafted
- approved
- posted
- avg_rating
- negative_count
- negative_share

**Columns (Per-location):**
- location_id
- location_name
- ingested
- posted
- avg_rating
- negative_share
- last_sync_at
- last_error

## Logging & Reliability
- Added structured logs around metrics generation (businessId, locationId, from/to, durationMs).
- Added Sentry spans for metrics aggregation and CSV serialization.
- Added guardrails for large date ranges (clamp to 180 days) to prevent slow queries and timeouts.

## Operator Notes for Pilot
During the next real-business pilot, use /app/admin/metrics daily:
1) Verify each location shows recent sync and increasing ingested counts.
2) Confirm new reviews appear as Drafted within minutes of sync.
3) Confirm negative alerts appear in the Alerts section and email escalation triggers.
4) Confirm weekly report entries appear after /api/cron/weekly-reports runs.

## Customer-Facing Proof of Legitimacy (for onboarding/pilot emails)
When inviting a pilot customer, reference the public site URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and direct replies to: agent_bob_replit+review-bot@agentmail.to.
