# Metrics Dashboard Implementation (Build Notes + API/CSV Contract + KPI Definitions)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T20:28:28.271Z

---

Overview
This artifact documents the shipped MVP metrics dashboard for the AI Review Reply & Reputation Autopilot. It includes what the UI shows, how KPIs are defined, and the contracts for the JSON and CSV endpoints so the owner can verify output or extend it.

Routes & Access
1) UI: /app/admin/metrics
- Access: authenticated user must be a member of the Business (UserBusinessMembership).
- Filters: dateFrom, dateTo (default last 14 days), locationId (optional; “All locations” default).
- Sections:
  A. Sync Health: per-location last sync time, last error (if any), enabled/disabled, and a “Needs attention” indicator if last sync > 24h or lastError present.
  B. Funnel KPIs: counts and rates for ingested → drafted → approved → posted, plus response-time metrics and negative share.
  C. Alerts: alert counts by type/severity and a simple time series (daily buckets) for negative-review alerts.

2) JSON API: GET /api/admin/metrics
Query params:
- businessId (required)
- dateFrom (optional ISO)
- dateTo (optional ISO)
- locationId (optional)

Response shape (high level):
{
  range: { dateFrom, dateTo },
  filters: { locationId|null },
  syncHealth: [{ locationId, name, enabled, lastSyncAt, lastError, lastErrorAt }],
  funnel: {
    ingestedCount,
    draftedCount,
    approvedCount,
    postedCount,
    draftRate, approvalRate, postRate,
    responseTime: { avgHours, p50Hours, p90Hours },
    negativeShare,
    avgRating,
    ratingTrend: [{ weekStart, avgRating, reviewCount }],
    topThemes: [{ label, count }]
  },
  alerts: {
    total,
    byType: [{ type, count }],
    bySeverity: [{ severity, count }],
    daily: [{ date, count }]
  }
}

3) CSV Export: GET /api/admin/metrics.csv
- Same query params as JSON.
- CSV is “flat” to make it easy to paste into Sheets.
Columns (example):
range_start,range_end,location_id,location_name,ingested_count,drafted_count,approved_count,posted_count,draft_rate,approval_rate,post_rate,avg_rating,negative_share,response_avg_hours,response_p50_hours,response_p90_hours,top_theme_1,top_theme_1_count,top_theme_2,top_theme_2_count,alerts_total,alerts_negative,alerts_sync_failures,last_sync_at,last_error

KPI Definitions (Important)
1) Ingested
- Count of Review records createdAt within [dateFrom, dateTo].
- If locationId is provided, filter Review.locationId.

2) Drafted
- Count of DraftReply createdAt within range OR (for stricter coupling) count of reviews with >=1 draft created. MVP uses DraftReply.createdAt.

3) Approved
- Count of DraftReply where approvedAt is within range.

4) Posted
- Count of DraftReply where postedAt is within range OR status in (posted_manual, posted_api). MVP uses postedAt.

5) Response Time
- Computed only for posted drafts: postedAt - Review.createdAt in hours.
- Excludes rejected or never-posted drafts.
- Provides avg, p50, p90.

6) Negative Share
- Share of ingested reviews in range that are negative, defined as (sentiment == 'negative' OR rating <= 2).

7) Avg Rating + Trend
- Avg rating over ingested reviews in range.
- Trend uses weekly buckets (weekStart) across the selected range.

8) Top Themes
- Uses Review.categoryLabels (service/price/staff/etc.) counted across ingested reviews in range.

Operational Notes
- All endpoints are RBAC protected; non-members receive 403.
- Query validation enforces sane date ranges and defaults.
- Instrumentation: logs include businessId, locationId, dateFrom/dateTo, durationMs; Sentry spans wrap the aggregation.
- No paid tooling required; charts are minimal (bar summaries) to keep reliability high.

Pilot Usage
During a real-business pilot, the metrics dashboard is the fastest way to confirm:
- Sync is running (lastSyncAt advancing, no repeated lastError)
- Reviews are flowing into drafts (draftRate)
- The team is approving and posting quickly (postRate + response time)
- Negative reviews are being escalated (alerts daily)

If a pilot shows draftedCount = 0 while ingestedCount > 0, check: tagging/draft job queue logs (Sentry), guardrail blocks, and Integration health (/api/health/integrations).