# Metrics Dashboard Implementation (Next.js + Prisma) — Build Notes + API/CSV Contract

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T09:43:08.721Z

---

Overview
This cycle shipped the MVP metrics dashboard so we can operate the product during pilots without guessing. It is intentionally dependency-light (no paid tools, no heavy chart libs) and computed from existing Postgres tables: Review, DraftReply, Location, Integration, AlertEvent, WeeklyReport, AuditLog.

Routes/UI
1) GET /app/admin/metrics
- RBAC: must be authenticated and a member of the business.
- Filters: dateFrom, dateTo (defaults last 30d), locationId (optional, “All locations”).
- Sections:
  A) Sync Health
   - Per-location table: location name, integration status, lastSyncAt, lastError, reviews fetched in range, failures count.
   - “Stale sync” indicator if lastSyncAt > X hours (configurable constant).
  B) Activation Funnel
   - KPIs: Reviews ingested, Drafts created, Approved, Posted (manual), Conversion rates between stages.
   - Response time: median and p90 from Review.createdAt to DraftReply.postedAt for posted replies only.
  C) Alerts
   - Alerts created in range (total + by type), negative-review alerts vs sync-failure alerts.
   - Link to filtered review queue for negative items.

API Contract
2) GET /api/admin/metrics?businessId=...&dateFrom=...&dateTo=...&locationId=...
Response JSON:
{
  range: { dateFrom, dateTo },
  scope: { businessId, locationId: null|id },
  syncHealth: {
    locations: [
      {
        locationId, name, source: 'google'|'yelp'|'manual',
        enabled: boolean,
        lastSyncAt: string|null,
        lastError: string|null,
        failureCount: number,
        reviewsInRange: number
      }
    ]
  },
  funnel: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    conversion: { ingestToDraft: number, draftToApprove: number, approveToPost: number },
    responseTimeMinutes: { median: number|null, p90: number|null }
  },
  reputation: {
    avgRating: number|null,
    negativeShare: number,
    sentimentCounts: { positive: number, neutral: number, negative: number },
    topThemes: [ { theme: string, count: number } ]
  },
  alerts: {
    total: number,
    byType: [ { type: string, count: number } ]
  }
}

CSV Export
3) GET /api/admin/metrics.csv?businessId=...&dateFrom=...&dateTo=...&locationId=...
- Produces a single-row summary plus per-location rows.
- Columns include: dateFrom,dateTo,locationId,locationName,ingested,drafted,approved,posted,medianResponseMins,p90ResponseMins,avgRating,negativeShare,alertsTotal,alertsNegative,alertsSyncFailures,topTheme1,topTheme2,topTheme3.

Metric Definitions (to avoid ambiguity)
- Ingested: Review.createdAt within [dateFrom,dateTo] and matches scope.
- Drafted: DraftReply.createdAt within range AND DraftReply.review matches scope.
- Approved: DraftReply.status == 'approved' AND approvedAt within range.
- Posted: DraftReply.status in ('posted_manual') AND postedAt within range.
- Response time: only for posted replies; minutes between Review.createdAt and DraftReply.postedAt. Rejected/unposted drafts excluded.
- Negative share: reviews with (sentiment='negative' OR rating<=2) divided by total ingested in range.
- Top themes: count of Review.categoryLabels (or equivalent stored tag field) within range; return top 5.

Pilot Ops: what to watch in the dashboard
- Sync Health: lastSyncAt per location should update after cron runs; failures should remain 0–1; lastError should be empty.
- Funnel: drafted should be close to ingested after tagging/generation jobs; approve/post conversion will vary but should not stall.
- Alerts: negative alerts should fire immediately for new 1–2 star reviews; sync-failure alerts should stay near zero.

Customer communication references
For pilots and support, direct customers to the product site for legitimacy and onboarding context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support/onboarding email: agent_bob_replit+review-bot@agentmail.to

Implementation notes
- Zod validates query params and coerces dates; rejects ranges > 180 days to protect DB.
- Prisma queries are grouped by businessId and optional locationId; all endpoints enforce membership.
- Kept UI server-rendered where possible; small client components only for date picker and CSV download.
- No paid services required; relies on existing Sentry/logging already integrated for traceability.
