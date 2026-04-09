# Admin Metrics Dashboard (MVP) — Implementation Spec + API Contracts (Next.js App Router + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T01:34:26.420Z

---

Goal
Ship /app/admin/metrics so an operator (you) and business owners can quickly validate the system is working: reviews are syncing, drafts are being approved/posted, response SLAs are met, and alerts are firing. Use only existing data: Review, DraftReply, Location, AlertEvent, AuditLog, WeeklyReport.

Primary views (single page with tabs)
1) Sync Health
- Table per Location: location name, source (Google/manual/email/OCR/Yelp), lastSyncAt, lastSyncStatus (OK/ERROR), lastErrorMessage, reviewsInLast7d, failuresInLast7d.
- KPI cards: locations enabled, locations failing (last sync error within 24h), total reviews ingested last 7d.

2) Activation Funnel (date range)
Definitions (consistent and auditable):
- Ingested: Review.createdAt in range.
- Drafted: DraftReply.createdAt in range (first draft per review), or DraftReply where review.createdAt in range (choose one; recommended: count drafts created in range).
- Approved: DraftReply.status transitioned to APPROVED in range (prefer AuditLog event), fallback to DraftReply.approvedAt.
- Posted: DraftReply.status transitioned to POSTED_* in range (prefer AuditLog), fallback to DraftReply.postedAt.

KPIs:
- Counts + conversion rates: drafted/ingested, approved/drafted, posted/approved.
- Median time-to-first-draft: DraftReply.createdAt - Review.createdAt.
- Median time-to-approval: approvedAt - DraftReply.createdAt.
- Median time-to-post: postedAt - approvedAt.
- Median time-to-first-response (overall): postedAt - Review.createdAt. Exclude rejected/never-posted.

3) Alerts
- Table: time, location, type (NEGATIVE_REVIEW, SYNC_FAILURE, OCR_FAILURE, POLICY_BLOCK), severity, status (open/ack), recipient(s).
- KPI cards: alerts last 7d, negative-review alerts last 7d, sync failure alerts last 7d.

Route & RBAC
- Page: GET /app/admin/metrics
- Must require authenticated user with Business membership and role in {OWNER, ADMIN}. (Reuse existing membership checks.)
- Query string filters:
  - businessId (if multi-business admin), else derive from session
  - locationId (optional)
  - from (ISO date) default: now-7d
  - to (ISO date) default: now

API Endpoints
1) GET /api/admin/metrics?from&to&locationId
Returns JSON for cards/tables.

Response shape (suggested)
{
  "range": {"from": "2026-04-02", "to": "2026-04-09"},
  "syncHealth": {
    "locations": [
      {
        "locationId": "...",
        "name": "Downtown",
        "source": "google",
        "enabled": true,
        "lastSyncAt": "...",
        "lastSyncStatus": "OK"|"ERROR"|"NEVER",
        "lastErrorMessage": "..."|null,
        "reviewsLast7d": 12,
        "syncFailuresLast7d": 1
      }
    ],
    "summary": {"enabledLocations": 3, "failingLocations": 1, "reviewsLast7d": 41}
  },
  "funnel": {
    "counts": {"ingested": 41, "drafted": 39, "approved": 30, "posted": 22},
    "rates": {"draftedPerIngested": 0.95, "approvedPerDrafted": 0.77, "postedPerApproved": 0.73},
    "durationsMs": {
      "p50_timeToDraft": 1800000,
      "p50_timeToApprove": 7200000,
      "p50_timeToPost": 3600000,
      "p50_timeToFirstResponse": 10800000
    }
  },
  "alerts": {
    "summary": {"total": 6, "negative": 3, "sync": 2, "policy": 1},
    "items": [
      {"id":"...","createdAt":"...","type":"NEGATIVE_REVIEW","severity":"HIGH","locationName":"Downtown","status":"OPEN","message":"2-star review ingested","recipients":["owner@..." ]}
    ]
  }
}

2) GET /api/admin/metrics.csv?from&to&locationId
Purpose: quick export for debugging and sharing with customers.
CSV sections (single file, separated by blank lines):
- Funnel summary
- Location sync health rows
- Alerts rows

Implementation details
Validation
- Use zod to validate from/to/locationId. Ensure from<=to and range max 90 days to avoid heavy queries.
- Default range: last 7 days.

Data sourcing & queries (Prisma-first, raw SQL optional)
A) Sync Health
- Source tables: Location (enabled flags + last sync watermark/time if present), Integration health endpoint fields if persisted, AlertEvent for sync failures.
- If you already store integration lastSyncAt/lastError on Integration/Location: read those directly.
- ReviewsLast7d per location:
  Prisma:
  - groupBy Review by locationId with where createdAt in [from,to]
- SyncFailuresLast7d:
  - count AlertEvent where type='SYNC_FAILURE' AND createdAt in range AND locationId matches

B) Funnel counts
Counts should be location-filterable.
- ingested:
  prisma.review.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to } } })
- drafted:
  prisma.draftReply.count({ where: { businessId, locationId?, createdAt: { gte: from, lte: to } } })
- approved:
  Prefer AuditLog events to avoid missing approvals that changed status without timestamps.
  - AuditLog where action='DRAFT_APPROVED' and createdAt in range.
  Fallback: DraftReply.approvedAt in range.
- posted:
  AuditLog action in ('DRAFT_POSTED_MANUAL','DRAFT_POSTED_API') in range.
  Fallback: DraftReply.postedAt in range.

C) Funnel durations (p50)
Use raw SQL for percentile; Prisma doesn’t do percentile well.
Postgres example (time-to-first-response):
WITH rows AS (
  SELECT EXTRACT(EPOCH FROM (dr."postedAt" - r."createdAt"))*1000 AS ms
  FROM "DraftReply" dr
  JOIN "Review" r ON r.id = dr."reviewId"
  WHERE r."businessId" = $1
    AND ($2::uuid IS NULL OR r."locationId" = $2)
    AND dr."postedAt" IS NOT NULL
    AND dr."postedAt" >= $3 AND dr."postedAt" <= $4
)
SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY ms) AS p50_ms FROM rows;
Repeat for:
- timeToDraft: dr.createdAt - r.createdAt (for first draft per review; if multiple drafts exist, pick MIN(dr.createdAt) per review)
- timeToApprove: approvedAt - dr.createdAt
- timeToPost: postedAt - approvedAt

If you want to avoid raw SQL for MVP: compute approximate p50 in Node by fetching ms list capped to N=5000 rows and sorting; acceptable for MVP if range limited.

D) Alerts table
- Source: AlertEvent with joins to Location
Prisma:
prisma.alertEvent.findMany({
  where: { businessId, locationId?, createdAt: { gte: from, lte: to } },
  orderBy: { createdAt: 'desc' },
  take: 200
})

UI Implementation (fast path)
- /app/admin/metrics/page.tsx (Server Component)
  - Reads searchParams; calls internal fetch to /api/admin/metrics (or directly calls shared server function getMetrics()).
- Components:
  - <DateRangePicker/> (simple from/to inputs)
  - <LocationSelect/>
  - <KpiCard/>
  - <SyncHealthTable/>
  - <FunnelTable/> (counts + rates)
  - <AlertsTable/>
  - Export button linking to /api/admin/metrics.csv?...
- Charts (optional, MVP-light): use simple sparkline with SVG or a tiny chart lib only if already present. Otherwise keep it table + KPIs.

Instrumentation
- Log request correlationId + businessId + range to structured logs.
- Sentry: capture exceptions for query failures; add breadcrumb with filters.

Customer-facing note (optional snippet for onboarding)
If you later add a “Share metrics” view, include legitimacy link:
“Dashboard provided by AI Review Reply & Reputation Autopilot: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

Acceptance criteria
- Metrics page loads in <2s for 7-day range on a typical small business.
- Location filter works.
- CSV export downloads and matches on-screen values.
- No new paid services required.
- RBAC enforced: only Business members with admin privileges can access.
