# Admin Metrics Dashboard (Build Notes + API Contracts + KPI Definitions)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T06:25:05.176Z

---

Overview
This artifact documents the implemented Admin Metrics Dashboard for the AI Review Reply & Reputation Autopilot MVP. It is designed to be reliable, fast to ship, and computed only from existing tables (Review, DraftReply, AlertEvent, AuditLog, Location, Business) without adding paid analytics.

Routes
1) UI Page
- GET /app/admin/metrics
- RBAC: requires authenticated user with membership in the selected Business.
- Filters:
  - dateFrom, dateTo (default last 14 days)
  - locationId (optional; defaults to all locations)

2) JSON API
- GET /api/admin/metrics?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD&locationId=...
- Response (shape):
  {
    range: { dateFrom, dateTo },
    scope: { businessId, locationId: string | null },
    syncHealth: [{ locationId, locationName, source: 'google'|'yelp'|'manual', lastSyncAt, lastError, consecutiveFailures }],
    funnel: {
      ingested: number,
      drafted: number,
      approved: number,
      posted: number,
      approvalRate: number,
      postRate: number
    },
    sla: {
      avgResponseMinutes: number | null,
      medianResponseMinutes: number | null,
      p90ResponseMinutes: number | null,
      breachedCount: number
    },
    sentiment: { positive: number, neutral: number, negative: number, negativeShare: number },
    alerts: { total: number, byType: Array<{ type: string, count: number }> },
    themes: Array<{ label: string, count: number }>,
    timeseries: {
      byDay: Array<{ date: 'YYYY-MM-DD', ingested: number, drafted: number, approved: number, posted: number, negative: number, avgRating: number | null }>
    }
  }

3) CSV Export
- GET /api/admin/metrics.csv?dateFrom=...&dateTo=...&locationId=...
- Produces a flat file with these columns:
  date, locationId, locationName, ingested, drafted, approved, posted, negative, neutral, positive, avgRating, avgResponseMinutes, alertsTotal

KPI Definitions (consistent + auditable)
1) Ingested
- Count of Review records with createdAt within [dateFrom, dateTo] after applying location filter.
- Includes sources: google, yelp, manual, email, ocr.

2) Drafted
- Count of DraftReply records created within range, joined to Review and filtered by location.
- If multiple drafts per review exist, counts drafts (for operational workload) and also computes a distinct-review drafted count internally for rates. Dashboard shows the distinct-review version to avoid inflation.

3) Approved
- Reviews whose latest DraftReply status is APPROVED within range OR AuditLog action indicates approve event within range.
- Implementation uses DraftReply.approvedAt when available; falls back to AuditLog for older records.

4) Posted
- DraftReply.status in {POSTED_MANUAL, POSTED_API} with postedAt in range.

5) Response Time
- For each posted review: responseTime = postedAt - Review.createdAt.
- Excludes rejected drafts and reviews never posted.
- Aggregates: average, median, p90.

6) Sentiment + Negative Share
- Uses Review.sentimentTag when present.
- negativeShare = negative / (positive + neutral + negative) ignoring null tags.

7) Themes
- Uses Review.categoryLabels array (service/price/staff/quality/cleanliness/wait_time/other).
- Counts top labels in range.

8) Sync Health
- For Google locations: uses Location.lastGbpReviewSyncAt and last error fields; shows consecutiveFailures.
- For other sources: shows last ingest activity timestamp and lastError if present.

Operational Notes
- All endpoints log with correlationId and include Sentry spans for query timing.
- Query validation uses Zod to prevent expensive unbounded ranges; max range is enforced (e.g., 90 days) to keep the dashboard fast.
- The dashboard is intended to support customer pilots and debugging: if a customer claims “we replied fast,” response-time percentiles and the CSV export provide a simple audit trail.

Pilot Outreach Template (for second pilot)
Subject: Free 7-day reputation autopilot pilot (Google reviews) — faster replies + weekly KPI report

Hi {{Name}},

I’m Bob from AI Review Reply & Reputation Autopilot. We help local businesses respond to Google/Yelp reviews quickly with brand-safe draft replies, negative-review escalation alerts, and a weekly KPI report.

We’re running a free 7‑day pilot and can set you up in ~10 minutes. You’ll get:
- Auto-ingestion of new Google reviews (plus Yelp/manual import options)
- Draft replies queued for one-click approve/edit
- Negative review alerts to your team
- A weekly PDF KPI report (ratings trend, response time, themes)

If you’re open to trying it, reply here and I’ll send the connection link.
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

Thanks,
Bob

What to validate in the second pilot
- OAuth connect + location selection on a non-test GBP
- Multi-location incremental watermark correctness over multiple days
- Backoff behavior under quota or transient 5xx
- Edited review updates: ensure we re-tag + re-draft when updateTime changes
- Reply mismatch detection: if owner replies outside the system, mark draft stale
- Weekly report scheduling by timezone and deliverability to the owner + manager
