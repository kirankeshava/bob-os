# Metrics Dashboard Implementation (Build-Complete) — Routes, APIs, Queries, and UI Copy

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T21:18:28.120Z

---

Overview
This artifact documents the completed implementation for the MVP in-app metrics dashboard used by business owners/admins to monitor review ingestion, workflow conversion (draft→approve→post), SLA/alerts, sync health, and weekly report delivery. It is designed to run entirely on existing tables (Business, Location, Integration, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog) with no new infrastructure.

Routes
1) UI Page
- Route: /app/admin/metrics
- Access: must be authenticated and a member of the Business (UserBusinessMembership) with admin role (or equivalent). Non-admin members can be allowed read-only; default is admin-only.
- Filters:
  - Date range (from/to; defaults last 14 days)
  - Location scope (All locations or a specific enabled location)
  - Source scope (optional: google/yelp/manual; default All)

2) JSON API
- Route: GET /api/admin/metrics?businessId=...&from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=...&source=...
- Returns a single JSON payload:
  - syncHealth: lastSyncAt, lastError, per-location lastGbpReviewSyncUpdateTime, stale flags
  - funnel: ingested, drafted, approved, posted, approvalRate, postRate
  - responseTime: avgHours, medianHours, p90Hours (where possible), definition below
  - reputation: avgRating, ratingTrendDelta, negativeShare
  - alerts: total, byType, breachedSlaCount
  - themes: topCategories with counts (service/price/staff/quality/cleanliness/wait_time/other)
  - weeklyReports: lastSentAt, lastStatus

3) CSV Export API
- Route: GET /api/admin/metrics.csv (same query params)
- Exports:
  - A “summary” section (key/value rows)
  - A per-location table (location name, ingested/drafted/approved/posted, avg response time, negative share, last sync)
  - A themes table (category,count)

KPI Definitions (must match what is shown in UI)
- Ingested reviews: count of Review where createdAt within range (or ingestedAt if present; current MVP uses createdAt + insertedAt; use insertedAt for ingestion activity if available).
- Drafted: DraftReply created within range and linked to a Review within scoped filters.
- Approved: DraftReply status transitioned to APPROVED within range (use DraftReply.approvedAt if present; otherwise AuditLog event “draft.approved”).
- Posted: DraftReply postedAt within range with status posted_manual (or posted_api in future).
- Approval rate: approved / drafted (0 if drafted=0).
- Post rate: posted / approved (0 if approved=0).
- Response time: postedAt - Review.createdAt in hours (exclude rejected drafts and exclude approved-but-not-posted). Median is computed from the list of response times in the window.
- Negative share: count(reviews where sentiment=negative OR rating<=2) / ingested.
- Rating trend delta: avgRating(current window) - avgRating(previous window of equal length).

Sync Health
- Integration.lastSyncAt and Integration.lastError are displayed.
- Per location: Location.lastGbpReviewSyncUpdateTime indicates the max updateTime watermark observed on that location.
- Stale sync detection: if lastSyncAt is older than threshold (e.g., 2 hours) mark as stale. Threshold is configurable.

Implementation Notes (how metrics are computed)
- All metrics are computed server-side with Prisma queries and small in-memory aggregation.
- Use location scoping by joining Review.locationId.
- Theme counts come from Review.categoryLabels (array/JSON) produced by the tagging job. If absent, skip.
- For response time distributions, fetch the posted drafts with their review timestamps and compute median/p90 in code.

UI Copy (ready to paste)
Header: “Metrics”
Subheader: “Track review volume, responsiveness, alerts, and sync health. Data updates automatically after each sync.”
Filters:
- Date range: “From” / “To”
- Location: “All locations”
- Source: “All sources”
Cards:
1) Sync Health
- Title: “Sync health”
- Body labels: “Last sync”, “Status”, “Last error”, “Per-location watermark”
- Stale banner: “Sync looks stale. If this persists, reconnect Google or check location permissions.”

2) Funnel
- Title: “Workflow funnel”
- Metrics: Ingested, Drafted, Approved, Posted
- Rates: “Approval rate” and “Post rate”
- Helper text: “Posted includes manual copy/paste posts recorded in the audit trail.”

3) Response Time
- Title: “Response time”
- Metrics: Average, Median
- Helper text: “Measured from review timestamp to posted reply timestamp.”

4) Reputation
- Title: “Reputation KPIs”
- Metrics: Average rating, Rating trend, Negative share

5) Alerts
- Title: “Alerts”
- Metrics: Total alerts, SLA breaches (if enabled), Last alert

6) Themes
- Title: “Top themes”
- Table: Category | Count

CSV Export CTA
Button label: “Export CSV”
Tooltip: “Download summary + per-location breakdown for this date range.”

Pilot Outreach Email (for second pilot)
Subject: Free 7-day trial: we’ll draft your Google/Yelp review replies + weekly KPI report
Body:
Hi {{Name}},

I’m Bob. We’re running a free 7-day pilot of an AI Review Reply & Reputation Autopilot for local businesses.

What you get during the pilot:
- New reviews ingested from Google Business Profile (and Yelp via email/CSV/screenshot)
- Brand-safe draft replies in a queue you can approve/edit in 1 click
- Negative-review escalation alerts by email
- A weekly reputation KPI report (PDF + email)

If you want to try it, reply with:
1) Your Google Business Profile email (or confirm you can connect via OAuth)
2) Which locations to manage (if multiple)
3) Who should receive negative-review alerts and the weekly report

App + legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob Smith
