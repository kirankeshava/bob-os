# Admin Metrics Dashboard — Implementation Pack (Routes, Queries, CSV, UI Copy)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:39:16.670Z

---

## Goal
Ship a lightweight in-app metrics dashboard that proves ROI and surfaces operational issues for the AI Review Reply & Reputation Autopilot MVP (Google/Yelp/manual). Must use existing DB tables and work reliably without new infrastructure.

Website to reference in customer-facing contexts: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

## IA / Routes
- **Page:** `/app/admin/metrics`
  - Tabs: **Funnel**, **Sync Health**, **Alerts**
  - Filters (top bar): Business (implicit from membership), Location (All + multi-select), Date range (last 7/30/90/custom), Source (google/yelp/manual/all)
  - Secondary actions: “Export CSV” (per tab)

- **API:** `GET /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationIds=...&source=...`
  - Returns JSON payload with all tab data.

- **CSV:** `GET /api/admin/metrics.csv?tab=funnel|sync|alerts&from=...&to=...&locationIds=...&source=...`
  - Streams CSV for the selected tab.

RBAC: require authenticated user with membership in the Business. If multi-business users exist, require `businessId` selection or derive from session’s active business.

---

## KPI Definitions (use in tooltips)
These definitions must be consistent across UI, weekly reports, and CSV exports.

### Funnel
- **Ingested Reviews:** count of `Review` createdAt within range (regardless of later deletion). For Google sync updates, count as ingested when record first appears (createdAt in DB).
- **Drafted:** count of reviews with at least 1 `DraftReply` createdAt within range.
- **Approved:** count of `DraftReply` where status becomes `approved` within range.
- **Posted:** count of `DraftReply` with `postedAt` within range (covers `posted_manual` and any future API posting).
- **Approval Rate:** approved / drafted.
- **Post Rate:** posted / approved.
- **Median Response Time:** median of (postedAt - review.createdAt) for posted replies (exclude rejected / never-posted drafts).

### Reputation
- **Avg Rating:** average of `Review.rating` over ingested reviews in range.
- **Negative Share:** % of reviews where (rating <= 2) OR sentimentTag == 'negative'.
- **Top Themes:** category counts derived from stored tags (service/price/staff/quality/cleanliness/wait_time/other).

### Sync Health
- **Last Sync:** per location and integration, show `lastSyncAt` and `lastError` (from Integration or Location sync fields).
- **Staleness:** now - lastSyncAt.
- **Failures (7d):** count of `AlertEvent` where type indicates sync failure.

### Alerts
- Count and list of negative-review SLA alerts and OCR failures:
  - `AlertEvent.type` in {NEGATIVE_REVIEW, SYNC_FAILED, OCR_FAILED}.
  - Include createdAt, location, source, and resolution status if tracked.

---

## Suggested DB Fields Used
- Review: id, businessId, locationId, source, rating, sentiment, categories (or tags), createdAt, rawPayload, reviewUrl
- DraftReply: id, reviewId, status, approvedAt, postedAt, createdAt
- Location: id, name, gbpLocationId, lastGbpReviewSyncUpdateTime, enabled
- Integration: id, provider, lastSyncAt, lastError
- AlertEvent: id, businessId, locationId, type, createdAt, payload

If `approvedAt` doesn’t exist but audit logs record approval: use AuditLog to derive (see next section). Same for posted if only audit exists.

---

## Aggregation Approach (Prisma + SQL-friendly)

### Time Range Handling
- Parse `from/to` as inclusive start, exclusive end (`toPlusOneDay` if dates).
- Always apply filters: businessId, optional locationIds, optional source.

### Funnel Counts (preferred using DraftReply columns)
1) Ingested:
- Prisma: `prisma.review.count({ where: { businessId, createdAt: { gte: from, lt: to }, ...(location/source filters) } })`

2) Drafted:
- Count distinct reviewIds with DraftReply created in range:
  - Prisma groupBy DraftReply reviewId OR raw SQL `COUNT(DISTINCT "reviewId")`.

3) Approved:
- If DraftReply has approvedAt: count where approvedAt in range.
- Else derive from AuditLog:
  - Filter AuditLog where action = 'draft_approved' (or your constant) and createdAt in range; count distinct draftId.

4) Posted:
- Count where postedAt in range.
- If manual posting uses status only, ensure postedAt is set at time of marking posted.

5) Median Response Time:
- Query posted drafts with join to Review:
  - `SELECT EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/3600 AS hours FROM "DraftReply" d JOIN "Review" r ON r.id=d."reviewId" WHERE d."postedAt" BETWEEN from/to ...`
  - Compute median in app code (sort) for small N; for larger N use percentile_cont if Postgres: `percentile_cont(0.5) within group (order by ...)`.

### Rating Trend
- Simple: avg rating for range + previous equal-length window for WoW/period-over-period.

### Top Themes
- If Review has array categories: explode in app code.
- If stored as JSON: raw SQL using `jsonb_array_elements_text`.

Example raw SQL (Postgres JSONB categories array):
```sql
SELECT theme, COUNT(*)
FROM (
  SELECT jsonb_array_elements_text(r."categories") AS theme
  FROM "Review" r
  WHERE r."businessId" = $1
    AND r."createdAt" >= $2 AND r."createdAt" < $3
) t
GROUP BY theme
ORDER BY COUNT(*) DESC
LIMIT 10;
```

### Sync Health Table
- Join Location + Integration summary. If per-location sync stored on Location, show those fields directly.
- Failures(7d): count AlertEvent by location.

---

## API Response Shape (JSON)
```json
{
  "range": {"from":"2026-04-01","to":"2026-04-08"},
  "filters": {"locationIds":[],"source":"all"},
  "funnel": {
    "ingested": 42,
    "drafted": 40,
    "approved": 35,
    "posted": 28,
    "approvalRate": 0.875,
    "postRate": 0.8,
    "medianResponseHours": 12.4
  },
  "reputation": {
    "avgRating": 4.42,
    "negativeShare": 0.12,
    "topThemes": [{"theme":"service","count":14},{"theme":"staff","count":9}]
  },
  "syncHealth": {
    "locations": [
      {
        "locationId":"...",
        "name":"Downtown",
        "provider":"google",
        "enabled": true,
        "lastSyncAt":"2026-04-08T10:00:00Z",
        "stalenessMinutes": 35,
        "lastError": null,
        "failures7d": 0
      }
    ]
  },
  "alerts": {
    "counts": {"negative": 3, "syncFailed": 1, "ocrFailed": 0},
    "recent": [
      {"id":"...","type":"NEGATIVE_REVIEW","createdAt":"...","location":"Downtown","source":"google","summary":"2-star: slow service"}
    ]
  }
}
```

---

## CSV Export Schemas

### funnel.csv
Columns:
- from,to,location,source,ingested,drafted,approved,posted,approval_rate,post_rate,median_response_hours,avg_rating,negative_share

### sync.csv
Columns:
- location_id,location_name,provider,enabled,last_sync_at,staleness_minutes,last_error,failures_7d

### alerts.csv
Columns:
- alert_id,type,created_at,location_id,location_name,source,review_id,draft_id,severity,status,summary

Implementation note: for alerts, not all fields exist for all types; leave blank where not applicable.

---

## UI Copy (tooltips / helper text)
- **Ingested**: “Reviews imported from Google/Yelp/manual during this period.”
- **Drafted**: “Reviews that received at least one drafted response.”
- **Approved**: “Draft replies approved by a human (ready to post).”
- **Posted**: “Replies recorded as posted (manual or API).”
- **Median response time**: “Median hours from review arrival to reply posted. Excludes rejected or unposted drafts.”
- **Negative share**: “% of reviews rated 1–2 stars or tagged as negative sentiment.”
- **Sync staleness**: “Time since the last successful sync. High staleness may indicate a disconnected integration or API errors.”

---

## Implementation Notes (fast + reliable)
1) Keep charts optional: start with tables + headline KPIs; add sparklines later.
2) Prefer server components + server actions for the page; API endpoints still useful for CSV and possible client chart libraries.
3) Use the existing structured logs/correlationId to debug any mismatched counts.
4) Ensure all numbers are computed with identical filters (businessId/locationIds/source/from/to) to avoid confusing discrepancies.

This pack is designed so the owner can implement /app/admin/metrics in 1–2 focused dev sessions and immediately use it to validate activation (ingest → draft → approve → post) and detect operational issues (sync failures, SLA alerts).