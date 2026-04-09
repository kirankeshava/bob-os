# In‑App Metrics Dashboard — Implementation Blueprint (Next.js + Prisma) for AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T03:46:10.307Z

---

## Goal
Ship /app/admin/metrics that answers: (1) Is review ingestion working? (2) Are we responding fast enough? (3) Where are reviews getting stuck? (4) Are negative reviews being escalated? Must use existing tables: Review, DraftReply, AlertEvent, AuditLog, Location, Business, Integration.

Website for legitimacy (include in any customer comms about metrics/screenshots): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-cm2c2899.picard.replit.dev/sites/1

---
## KPIs & Definitions (canonical)
All metrics filterable by: businessId (required), optional locationId, date range [start,end].

### Sync Health
- **Last Sync At (per location)**: Location.lastGbpReviewSyncAt (or most recent AuditLog where action='GBP_SYNC_SUCCESS').
- **Last Sync Error (per location)**: Location.lastGbpReviewSyncError (or most recent AuditLog where action='GBP_SYNC_ERROR').
- **New Reviews Ingested (period)**: count(Review where createdAt in range). Also break down by source (google/yelp/manual/email/ocr).

### Funnel (Activation + Throughput)
Counts are based on Review IDs in the selected period.
- **Ingested**: reviews created in range.
- **Drafted**: reviews with at least one DraftReply created within 24h of review.createdAt OR any draft exists (pick one and stick to it; recommended: any draft exists).
- **Approved**: reviews whose latest DraftReply status == 'approved'.
- **Posted**: reviews whose latest DraftReply status in ['posted_manual','posted_api'].
- **Median Time to First Draft**: median(DraftReply.createdAt - Review.createdAt) for first draft per review.
- **Median Time to Approval**: median(ApprovedAt - Review.createdAt) where approved.
- **Median Time to Post**: median(PostedAt - Review.createdAt) where posted.

### Negative Review SLA
- **Negative Review Definition**: (review.rating <= 2) OR (review.sentiment == 'negative').
- **SLA breach**: negative review not posted within X hours (config from EscalationRule or Location setting; fallback 24h).
- **Open negatives**: negative reviews with no posted draft.

### Alerts
- **Alerts Sent (period)**: count(AlertEvent where createdAt in range) grouped by type (negative_review, sync_failure, ocr_failure).
- **Alert Resolution** (optional later): time between alert and first subsequent action (approve/post) on that review.

### Themes
- **Top Categories (period)**: from Review.categoryLabels (array) count occurrences. Also show top negative categories only.

---
## Routes / Pages
### Page: /app/admin/metrics
Server component with client subcomponents for charts.

**Header**
- Business selector (if user is member of multiple businesses)
- Date range picker (default last 7 days)
- Location dropdown (All locations default)
- Export CSV button → /api/admin/metrics.csv?start=&end=&locationId=

**Section A: Sync Health**
- Table per location: Location name | source (GBP enabled?) | lastSyncAt | lastError | reviews ingested (period)
- Badge: OK / Needs attention (if lastSyncAt older than 24h and GBP enabled OR lastError present)

**Section B: Funnel**
- Funnel counts: Ingested → Drafted → Approved → Posted
- Conversion % between steps
- Median times (draft/approve/post)

**Section C: Negatives & SLA**
- Counters: Negative reviews (period), Open negatives, SLA breaches
- Table of most urgent open negatives: rating, snippet, createdAt, age, assigned escalation recipients (from EscalationRule)

**Section D: Alerts**
- Bar list: alerts by type + last 5 alert events

**Section E: Themes**
- Top categories overall and for negatives

Empty states:
- No reviews in range: explain how to ingest (Google connect, CSV, email forward, screenshot OCR) and link to /app/reviews/import.

---
## API Endpoints
### GET /api/admin/metrics
Returns JSON for the dashboard.

Query params:
- start (ISO date) required
- end (ISO date) required
- locationId optional

RBAC:
- Must be authenticated and have UserBusinessMembership for selected business.
- businessId derived from session (or explicit param if you support multi-business switch; recommended: businessId in query with membership check).

Response shape:
{
  "range": {"start":"...","end":"..."},
  "filters": {"locationId": "..." | null},
  "syncHealth": {
    "locations": [
      {"locationId":"...","name":"...","gbpEnabled":true,"lastSyncAt":"..."|null,"lastError":"..."|null,"ingestedCount":123}
    ]
  },
  "funnel": {
    "ingested": 0,
    "drafted": 0,
    "approved": 0,
    "posted": 0,
    "medianMinutesToDraft": null,
    "medianMinutesToApprove": null,
    "medianMinutesToPost": null
  },
  "negatives": {
    "negativeCount": 0,
    "openNegativeCount": 0,
    "slaBreaches": 0,
    "urgent": [
      {"reviewId":"...","locationName":"...","rating":1,"createdAt":"...","ageHours":52,"snippet":"...","status":"drafted|approved|none"}
    ]
  },
  "alerts": {
    "total": 0,
    "byType": {"negative_review":0,"sync_failure":0,"ocr_failure":0},
    "recent": [{"id":"...","type":"sync_failure","createdAt":"...","message":"..."}]
  },
  "themes": {
    "topCategories": [{"label":"service","count":10}],
    "topNegativeCategories": [{"label":"staff","count":4}]
  }
}

### GET /api/admin/metrics.csv
Produces a single CSV export suitable for quick debugging.
Recommended CSV tabs are hard; instead include multiple sections separated by blank lines OR provide multiple endpoints. Fastest: one CSV with a “recordType” column.

Rows examples:
recordType=location_sync (one row per location)
recordType=funnel_summary (one row)
recordType=alert_event (many rows)
recordType=negative_urgent (many rows)

---
## Prisma Query Plan (pseudocode)
Assumptions:
- Review has fields: businessId, locationId, source, rating, sentiment, categoryLabels (string[]), createdAt.
- DraftReply has: reviewId, status, createdAt, approvedAt?, postedAt?
- AlertEvent has: businessId, locationId?, type, createdAt, message.
- Location has: id, businessId, name, gbpEnabled, lastGbpReviewSyncAt?, lastGbpReviewSyncError?

### Base review filter
const reviewWhere = {
  businessId,
  createdAt: { gte: start, lte: end },
  ...(locationId ? { locationId } : {})
}

### Ingested
ingested = prisma.review.count({ where: reviewWhere })

### Drafted
Drafted definition (fast): review IDs with at least one draft.
- Get draftedReviewIds via prisma.draftReply.findMany({ where: { review: reviewWhere }, select: { reviewId: true }, distinct: ['reviewId'] })
- drafted = draftedReviewIds.length

### Approved/Posted
We need latest draft per review. Fastest reliable approach in Postgres: query raw SQL using DISTINCT ON.

Raw SQL example (parameterized):
SELECT DISTINCT ON (d."reviewId") d."reviewId", d."status", d."createdAt", d."approvedAt", d."postedAt"
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE r."businessId" = $1 AND r."createdAt" BETWEEN $2 AND $3
  AND ($4::text IS NULL OR r."locationId" = $4)
ORDER BY d."reviewId", d."createdAt" DESC;

Then:
approved = count where status='approved'
posted = count where status in ('posted_manual','posted_api')

### Median times
Compute arrays of minutes:
- firstDraftAt per review: MIN(draft.createdAt)
- approvalAt per review: from latest status approved (or MAX(approvedAt))
- postedAt per review: MAX(postedAt) where status posted

Given MVP speed: compute medians in JS after fetching times via raw SQL aggregations.
Example:
SELECT d."reviewId", MIN(d."createdAt") as "firstDraftAt"
FROM "DraftReply" d JOIN "Review" r ON r.id=d."reviewId"
WHERE ... GROUP BY d."reviewId";

Then join to reviews (createdAt) in memory and median().

### Negatives & SLA
negativeWhere extends reviewWhere with OR:
{ OR: [{ rating: { lte: 2 } }, { sentiment: 'negative' }] }
negativeCount = prisma.review.count({ where: negativeWhere })

Open negatives: negatives whose latest draft not posted.
Use latest-draft query restricted to negative reviews; treat “no draft” as open.
urgent list: order by createdAt asc for open negatives.

SLA breaches: open negatives with ageHours > slaHours.
SLA hours source: Location.escalationSlaHours or EscalationRule default. For MVP, pick: business.escalationSlaHours default 24 unless location override exists.

### Alerts
alertsTotal = prisma.alertEvent.count({ where: { businessId, createdAt: {gte:start,lte:end}, ...(locationId?{locationId}: {}) } })
byType = prisma.alertEvent.groupBy({ by:['type'], _count:true, where: same })
recent = prisma.alertEvent.findMany({ where: same, orderBy:{createdAt:'desc'}, take: 10 })

### Themes
If categoryLabels is a Postgres text[] column, use raw SQL UNNEST for counts.
Example overall:
SELECT label, COUNT(*) as count
FROM (
  SELECT UNNEST(r."categoryLabels") as label
  FROM "Review" r
  WHERE r."businessId"=$1 AND r."createdAt" BETWEEN $2 AND $3
    AND ($4::text IS NULL OR r."locationId"=$4)
) t
GROUP BY label
ORDER BY count DESC
LIMIT 8;

Negative only: add AND (r."rating"<=2 OR r."sentiment"='negative').

---
## UI Component Structure (suggested)
- MetricsPage (server): loads initial metrics JSON by calling internal function fetchMetrics(businessId, start, end, locationId)
- MetricsFilters (client): updates URL query params
- SyncHealthTable
- FunnelCards
- NegativesTable
- AlertsPanel
- ThemesList

Use existing Tailwind components from review queue for consistent design.

---
## Instrumentation
- Log metrics endpoint timing + counts (not review text) with correlationId.
- Sentry capture only on errors; avoid sending PII (review body) in metrics payload.

---
## Acceptance Checklist
- With data: dashboard loads <2s for last 7 days, shows correct counts, location table renders, CSV downloads.
- With no data: shows guided empty state linking to import/connect flows.
- RBAC: user without membership cannot access endpoints.
- Works with location filter and ‘All locations’.

---
## Optional customer-facing note (for later)
If you share a metrics screenshot with prospects, include: “Powered by AI Review Reply & Reputation Autopilot — https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-cm2c2899.picard.replit.dev/sites/1”.