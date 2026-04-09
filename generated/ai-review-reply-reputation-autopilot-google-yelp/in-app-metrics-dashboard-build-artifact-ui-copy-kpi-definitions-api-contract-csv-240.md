# In-App Metrics Dashboard (Build Artifact): UI Copy, KPI Definitions, API Contract, CSV Export Spec

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T04:48:17.232Z

---

# In-App Metrics Dashboard — Build Artifact

## Goal
Ship **/app/admin/metrics** to help operators and customers understand:
1) **Sync health** (is ingestion working?)
2) **Activation funnel** (ingest → draft → approve → posted)
3) **Risk & workload** (negative reviews + SLA alerts)

This uses existing tables: **Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog**.

---

## Route + Data Flow
- Page: `GET /app/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=...|all`
- API JSON: `GET /api/admin/metrics?start=...&end=...&locationId=...|all`
- API CSV export: `GET /api/admin/metrics.csv?start=...&end=...&locationId=...|all`

RBAC: user must have membership in the Business currently selected (your existing `UserBusinessMembership`).

Date handling: 
- Use Business timezone if stored; otherwise default to `America/New_York`.
- Treat `start` inclusive 00:00:00 and `end` inclusive 23:59:59 in that timezone.

---

## KPI Definitions (canonical — do not change without migration)
### Funnel Stages
All counts are within date range, filtered to selected location(s).

1. **Ingested Reviews**
   - Definition: number of `Review` createdAt in range.
   - Source breakdown: group by `Review.source` (google/yelp/manual/email/ocr).

2. **Drafted**
   - Definition: number of **distinct reviews** that have at least one `DraftReply` createdAt in range.
   - Note: if multiple drafts per review, count once.

3. **Approved**
   - Definition: number of **distinct reviews** with a `DraftReply.approvedAt` in range.
   - If your schema uses status instead: `status='approved'` AND `updatedAt in range` is NOT reliable; prefer explicit timestamps.

4. **Posted**
   - Definition: number of **distinct reviews** with `DraftReply.postedAt` in range OR `status in ('posted_manual','posted_api')` with timestamp.

### Operational KPIs
5. **Median Response Time (hours)**
   - Definition: for reviews that were posted (manual or API), compute hours between `Review.createdAt` and `DraftReply.postedAt`.
   - Exclusions: do not include rejected / never-posted drafts.
   - Provide p50 + p90.

6. **Negative Share**
   - Definition: percent of ingested reviews where (`Review.sentiment='negative'` OR `Review.rating <= 2`).

7. **Avg Rating + Trend**
   - Definition: average rating of ingested reviews in range.
   - Trend: compare avg rating of current range vs previous equal-length range immediately preceding.

8. **Top Themes**
   - Definition: group by `Review.categories[]` (service/price/staff/quality/cleanliness/wait_time/other) and return top 5 by count.

### Sync Health
9. **Last Sync per Location (Google Integration)**
   - `Location.lastGbpSyncAt` (or derived from Integration/AuditLog if that’s where you store it).
   - Show last success, last error message, and consecutive failure count (if tracked) or infer from recent AlertEvents.

10. **Ingestion Errors (last 7 days)**
   - Definition: count of AlertEvents where type in (`gbp_sync_failed`, `ocr_failed`, `email_parse_failed`) grouped by type.

---

## UI: Page Structure + Exact Copy
### Header
**Title:** Metrics
**Subtitle:** “Track review ingestion, response workflow, and reputation risk across your locations.”

### Filters (top bar)
- Date range: Start / End
- Location dropdown: “All locations” + specific locations
- Primary buttons:
  - “Apply”
  - “Export CSV”

**Tooltip (date range):** “Metrics are calculated using your business timezone. Posted metrics include only replies marked as posted (manual or API).”

### Section A — Sync Health
Card title: “Sync health”

Table columns:
- Location
- Source
- Last sync
- Status
- Last error

Status copy:
- Healthy: “Healthy”
- Warning: “Delayed” (if last sync > 24h)
- Error: “Failing” (if last error within 24h OR failure count threshold)

Empty state:
- “No integrations connected yet. Connect Google Business Profile to enable automatic review sync.”

CTA button text (if not connected): “Connect Google Business Profile” (links to `/app/integrations/google/connect`)

### Section B — Funnel
Card title: “Workflow funnel”

Display 4 KPIs as tiles:
- Ingested
- Drafted
- Approved
- Posted

Helper text:
- Ingested: “New reviews received in the selected range.”
- Drafted: “Reviews with at least one draft reply generated.”
- Approved: “Draft replies approved by a human.”
- Posted: “Replies marked as posted (manual or API).”

### Section C — Response Time
Card title: “Response time”

KPIs:
- Median (p50) hours
- p90 hours

Helper text:
“Calculated from review creation → posted reply. Excludes rejected and unposted drafts.”

### Section D — Reputation Risk
Card title: “Reputation risk”

KPIs:
- Negative share
- Avg rating
- Avg rating trend

Trend copy:
- Up: “↑ vs previous period”
- Down: “↓ vs previous period”
- Flat: “— vs previous period”

### Section E — Top Themes
Card title: “Top themes”

List rows:
- Theme label + count + percent

Empty state:
- “No theme data yet. Once reviews are tagged, top themes will appear here.”

### Section F — Alerts
Card title: “Alerts”

Table columns:
- Time
- Location
- Type
- Severity
- Message

Empty state:
- “No alerts in this period.”

---

## API Contract
### GET /api/admin/metrics
Response JSON:
```json
{
  "range": {"start": "2026-04-01", "end": "2026-04-07", "timezone": "America/New_York"},
  "filters": {"locationId": "all"},
  "syncHealth": [
    {
      "locationId": "loc_...",
      "locationName": "Downtown",
      "source": "google",
      "lastSyncAt": "2026-04-07T12:34:00Z",
      "status": "healthy",
      "lastError": null
    }
  ],
  "funnel": {
    "ingested": 42,
    "drafted": 39,
    "approved": 30,
    "posted": 28,
    "bySource": {"google": 35, "yelp": 5, "manual": 2}
  },
  "responseTimeHours": {"p50": 6.2, "p90": 23.8, "n": 28},
  "reputation": {
    "avgRating": 4.41,
    "avgRatingPrev": 4.18,
    "avgRatingDelta": 0.23,
    "negativeShare": 0.095
  },
  "themes": [
    {"theme": "staff", "count": 12, "share": 0.286},
    {"theme": "service", "count": 9, "share": 0.214}
  ],
  "alerts": {
    "total": 3,
    "byType": {"gbp_sync_failed": 1, "negative_review_sla": 2}
  }
}
```

Error behavior:
- 401 if not authenticated
- 403 if user not member of business
- 400 for invalid date params

---

## Prisma Query Pseudocode (server)
Assumptions: `businessId` from session context.

1) Resolve location filter:
- If `locationId !== 'all'`, verify location belongs to business.

2) Ingested:
- `Review.count({ where: { businessId, locationId?, createdAt: { gte, lte } } })`
- `Review.groupBy({ by: ['source'], _count: true, where: sameWhere })`

3) Drafted distinct reviews:
- Query DraftReply within range, join reviews, count distinct reviewId.

4) Approved distinct reviews:
- `DraftReply.findMany({ where: { approvedAt: { gte, lte }, businessId, locationId? }, select: { reviewId: true }, distinct: ['reviewId'] })`

5) Posted distinct reviews:
- postedAt in range (preferred). If legacy, map status+updatedAt carefully.

6) Response time p50/p90:
- Fetch posted replies in range with associated review createdAt.
- Compute durations in code, sort, percentile.

7) Reputation:
- Avg rating: `Review.aggregate({ _avg: { rating: true }, where: sameWhere })`
- Prev period: compute `prevStart = start - (end-start+1)` and same length.
- Negative share: `negativeCount / ingested` where negative = sentiment negative OR rating<=2.

8) Themes:
- If categories stored as string[] on Review: fetch in range and count occurrences; or use SQL unnest if Postgres array.

9) Sync health:
- For each location, read last sync fields (or last success AuditLog entry for type `gbp_sync_success`).

10) Alerts summary:
- `AlertEvent.count({ where: { businessId, locationId?, createdAt: { gte, lte } } })`
- `AlertEvent.groupBy({ by: ['type'], _count: true, where: sameWhere })`

---

## CSV Export Spec
Endpoint: `/api/admin/metrics.csv`

Single-row summary + optional second section for per-location sync. Keep it simple.

Columns (summary row):
- start_date
- end_date
- timezone
- location_filter
- ingested
- drafted
- approved
- posted
- ingested_google
- ingested_yelp
- ingested_manual
- response_time_p50_hours
- response_time_p90_hours
- negative_share
- avg_rating
- avg_rating_prev
- avg_rating_delta
- alerts_total
- alerts_gbp_sync_failed
- alerts_negative_review_sla
- top_theme_1
- top_theme_1_count
- top_theme_2
- top_theme_2_count
- top_theme_3
- top_theme_3_count

If you add per-location section, output a blank line then header:
- location_name, source, last_sync_at, status, last_error

---

## Implementation Notes
- Prefer tables first; charts can be added later (simple sparkline for rating trend).
- Ensure metric computations use the same filtering logic as weekly report so numbers align.
- Link from dashboard to existing review queue filtered views:
  - Clicking “Negative share” opens `/app/reviews?sentiment=negative`.
  - Clicking “Failing” sync status opens location admin.

This artifact is ready to implement without new services. It uses the existing website for legitimacy when sharing with pilots: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-zsng1spf.picard.replit.dev/sites/1
