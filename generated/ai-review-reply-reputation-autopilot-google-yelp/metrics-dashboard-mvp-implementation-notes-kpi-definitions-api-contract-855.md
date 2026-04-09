# Metrics Dashboard MVP — Implementation Notes + KPI Definitions + API Contract

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:03:28.598Z

---

Overview
This document describes the shipped MVP metrics dashboard for the AI Review Reply & Reputation Autopilot (Google/Yelp). It is designed to help us (1) confirm ingestion and sync reliability, (2) measure activation from review ingest to posted reply, and (3) debug SLA/alerts and weekly report correctness during pilots.

Where it lives
- UI: /app/admin/metrics
- JSON API: GET /api/admin/metrics
- CSV export: GET /api/admin/metrics.csv
Access is restricted to authenticated users with membership to the Business (and admin role for cross-business views).

KPI Definitions (canonical)
All metrics are computed for a selected Business, optional Location filter, and a date range [from, to]. We treat “ingestedAt” as Review.createdAt in our DB (time we first saw it).

1) Ingested
- Definition: Count of Review records created within date range.
- Filter: Review.businessId = X AND (optional Review.locationId = Y) AND Review.createdAt between from/to.

2) Drafted
- Definition: Reviews that have at least one DraftReply created (draft exists).
- Computation: Count distinct Review.id where DraftReply.reviewId exists and Review.createdAt between from/to.

3) Approved
- Definition: Reviews with a DraftReply that reached approved status.
- Computation: Count distinct Review.id where DraftReply.status = 'approved' (or 'posted_manual' / 'posted_api' if your enum collapses approvals into posted states).

4) Posted
- Definition: Reviews with a draft that was marked posted (manual or API).
- Computation: Count distinct Review.id where DraftReply.postedAt is not null OR DraftReply.status in ('posted_manual','posted_api').

5) Response Time (core KPI)
- Definition: Time from Review.createdAt (ingested) to DraftReply.postedAt (first posted reply).
- Exclusions: Exclude reviews with no postedAt, exclude drafts that were rejected/never posted.
- Output: average, p50, p90 in hours.

6) Negative Share
- Definition: % of ingested reviews in period that are negative.
- Computation: negativeCount / totalIngested where Review.sentiment = 'negative' OR Review.rating <= 2 (matching escalation rule defaults).

7) Top Themes
- Definition: Most frequent category labels assigned by tagging.
- Computation: Count occurrences across reviews in period by Review.categoryLabels array (service/price/staff/etc.). Return top N.

8) Sync Health
- Definition: Per Location last successful sync timestamp and last error.
- Sources:
  - Location.lastGbpReviewSyncAt (or derived from AuditLog “google_sync_success”)
  - Location.lastGbpReviewSyncUpdateTime watermark
  - Integration.lastError + lastErrorAt (and per-location failure counts if present)

9) Alerts Volume
- Definition: Count of AlertEvent created in range, grouped by day and severity.
- Output: total alerts, negative-review alerts, sync-failure alerts.

API Contract: GET /api/admin/metrics
Query params
- businessId (required unless single-business membership auto-resolves)
- locationId (optional)
- from (ISO date, required)
- to (ISO date, required)
- tz (IANA timezone, optional; affects daily grouping)

Response shape (high level)
{
  "range": {"from": "...", "to": "...", "tz": "..."},
  "syncHealth": [
    {"locationId": "...", "locationName": "...", "source": "google", "enabled": true,
     "lastSyncAt": "...", "lastError": "...", "watermark": "..."}
  ],
  "funnel": {
    "ingested": 120,
    "drafted": 110,
    "approved": 85,
    "posted": 70,
    "conversion": {"draftRate": 0.92, "approveRate": 0.77, "postRate": 0.64}
  },
  "responseTimeHours": {
    "avg": 17.2,
    "p50": 6.4,
    "p90": 41.8,
    "n": 70
  },
  "reputation": {
    "avgRating": 4.38,
    "negativeShare": 0.08,
    "totalReviews": 120
  },
  "themes": [
    {"label": "staff", "count": 31},
    {"label": "service", "count": 24}
  ],
  "alerts": {
    "total": 9,
    "byDay": [{"day": "2026-04-01", "count": 2, "severity": "high"}],
    "byType": [{"type": "negative_review", "count": 5}]
  }
}

CSV Export: GET /api/admin/metrics.csv
Two modes:
1) Summary export (default)
- One row per day containing: ingested, drafted, approved, posted, negativeCount, avgRating, alertsCount.
2) Per-review export (includeReviews=1)
- One row per review containing: source, location, rating, sentiment, categories, ingestedAt, draftedAt, approvedAt, postedAt, responseTimeHours.
This mode is paginated with cursor/limit to prevent timeouts.

UI: /app/admin/metrics
Layout (MVP)
- Filters bar: date range picker, location dropdown, export CSV buttons
- Cards/Tables:
  1) Sync Health table: location, enabled, last sync, watermark, last error
  2) Funnel table: ingested/drafted/approved/posted + conversion %
  3) Response time: avg/p50/p90 + n
  4) Reputation: avg rating + negative share
  5) Top themes list
  6) Alerts table: by type + by day

Instrumentation
- Each API request logs businessId, locationId, from/to, query duration, and row counts.
- Sentry spans: metrics.query.funnel, metrics.query.responseTime, metrics.query.alerts.
- If any query exceeds a threshold (e.g., 3s), we log a warning with suggested index or pagination.

Pilot Usage Notes
During pilots, use metrics to answer:
- Are we syncing reliably? (sync health)
- Are drafts generating quickly after ingestion? (ingested -> drafted gap via per-review export)
- Are negative reviews being escalated within SLA? (alerts volume and response-time p90)

Customer-facing legitimacy references (for outreach or support)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

This dashboard completes the MVP observability loop so we can safely onboard real businesses, prove responsiveness improvements, and quickly debug any sync or workflow failures.