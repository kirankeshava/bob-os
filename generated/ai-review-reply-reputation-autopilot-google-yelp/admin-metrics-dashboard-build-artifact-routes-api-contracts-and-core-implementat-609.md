# Admin Metrics Dashboard (Build Artifact): Routes, API Contracts, and Core Implementation (Next.js + Prisma)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T08:44:30.680Z

---

Below is the concrete, build-ready implementation content for the MVP in-app metrics dashboard. It assumes the existing schema described in prior cycles (Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog) and membership-based RBAC already in place.

1) ROUTES
- UI Page: /app/admin/metrics
- JSON API: /api/admin/metrics?start=2026-04-01&end=2026-04-08&locationId=all&tz=America/Los_Angeles
- CSV Export: /api/admin/metrics.csv?start=...&end=...&locationId=...

2) METRICS DEFINITIONS (CONSISTENT, CUSTOMER-LEGIBLE)
A) Activation Funnel (counts)
- Ingested: Reviews createdAt within date range.
- Drafted: DraftReply createdAt within date range.
- Approved: DraftReply approvedAt within date range.
- Posted: DraftReply postedAt within date range AND status in {posted_manual, posted_api}.
B) Response Time (time-to-first-response)
- For posted replies only: postedAt - Review.createdAt.
- Provide median + p90 to avoid outlier distortion.
C) Reputation KPIs
- Avg rating by day; overall avg rating for range.
- Negative share: reviews where sentiment='negative' OR rating<=2.
- Top themes: category labels aggregated (service/price/staff/quality/cleanliness/wait_time/other).
D) Sync Health
- Per location: lastGbpReviewSyncUpdateTime and last sync attempt time (if stored), plus a “stale” boolean when last sync is older than threshold (e.g., 6h).
- Per integration: Integration.lastSyncAt, Integration.lastError (if present), and recent AlertEvents of type sync_failure.
E) Alerts
- Count by type in range (negative_review_alert, sync_failure, ocr_failure, sla_breach) + last 10 events.

3) API CONTRACT (JSON)
Return shape (example):
{
  range: { start, end, tz },
  filters: { locationId },
  funnel: { ingested, drafted, approved, posted, approvalRate, postRate },
  responseTime: { medianMinutes, p90Minutes },
  ratings: { avgRating, byDay: [{ date, avgRating, count }] },
  sentiment: { positive, neutral, negative, negativeShare },
  themes: [{ label, count }],
  syncHealth: { locations: [{ id, name, lastSyncAt, stale, lastError }], integrations: [{ id, provider, lastSyncAt, lastError }] },
  alerts: { total, byType: [{ type, count }], recent: [{ id, type, createdAt, summary }] }
}

4) SERVER IMPLEMENTATION (PSEUDO-CODE YOU CAN PASTE/ADAPT)
A) /api/admin/metrics (Next.js route handler)
- Validate query with zod (start/end required; optional locationId, tz).
- Determine businessId from session membership.
- Compute time window boundaries in tz then convert to UTC for DB comparisons.
- Prisma aggregations:
  - Review.count where businessId, createdAt in range, and (locationId filter if set).
  - DraftReply.count with createdAt/approvedAt/postedAt in range.
  - Ratings by day: group by DATE_TRUNC('day', Review.createdAt at tz) via $queryRaw for Postgres.
  - Response time median/p90: $queryRaw percentile_cont on EXTRACT(EPOCH FROM (postedAt - reviewCreatedAt))/60.
  - Themes: aggregate from Review.categoryLabels (array/json) using unnest in SQL or store normalized counts.
  - Alerts: AlertEvent.count and groupBy type; recent list ordered desc.

B) /api/admin/metrics.csv
- Use same query params and business scoping.
- Emit CSV with headers:
  date,location,ingested,drafted,approved,posted,avg_rating,negative_share,median_response_min,p90_response_min,top_theme
- Ensure content-type text/csv and content-disposition attachment.

5) UI PAGE (/app/admin/metrics)
Layout:
- Header with DateRangePicker (last 7/30/custom) + Location dropdown (All + each location).
- Cards row: Ingested, Drafted, Approved, Posted, Avg Rating, Negative Share, Median Response.
- Sync Health table: Location | Last Sync | Stale? | Last Error.
- Funnel chart/table: show counts and conversion rates.
- Ratings sparkline or simple table by day.
- Alerts section: counts + recent events.
- “Export CSV” button linking to /api/admin/metrics.csv with current filters.

6) RBAC + SAFETY
- Both API endpoints must verify user is member of the business.
- Validate date range length (e.g., max 180 days) to prevent expensive queries.
- Add basic caching: Cache-Control: private, max-age=60.
- Log correlationId and query params; add Sentry breadcrumbs on errors.

7) CUSTOMER-FACING VALUE (WHY THIS MOVES REVENUE)
This dashboard makes the MVP credible for paying pilots: owners can see (a) reviews are being ingested reliably, (b) drafts are being produced, (c) response speed is improving, and (d) negative reviews are escalated with documented handling. It also reduces churn risk because sync/alert failures become visible immediately, not weeks later.

If we need an outreach-ready snippet to send prospects for proof-of-legitimacy, direct them to the live site URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1 and the contact email agent_bob_replit+review-bot@agentmail.to.