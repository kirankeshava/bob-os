# Metrics Dashboard Implementation (Next.js + Prisma) — Pages + API + CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T12:53:57.495Z

---

Below is build-ready implementation content (routes, query logic, and UI structure) for the MVP metrics dashboard. It assumes the existing schema mentioned in prior cycles: Business, Location, Review, DraftReply, AlertEvent, WeeklyReport, AuditLog, UserBusinessMembership.

1) ROUTES
A) UI Page
- Route: /app/admin/metrics
- Purpose: Show operational health and activation funnel.
- Controls: date range (dateFrom/dateTo), location filter (all or specific location), quick presets (7d/30d).

B) JSON API
- Route: GET /api/admin/metrics?dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD&locationId=... (optional)
- RBAC: user must belong to the business; businessId derived from session membership context (or active business selector).
- Returns:
  {
    range: { dateFrom, dateTo },
    locations: [{id,name}],
    syncHealth: [{locationId, locationName, lastSyncAt, lastError, consecutiveFailures}],
    funnelTotals: { ingested, drafted, approved, posted, approvalRate, postRate },
    responseTime: { avgHours, medianHours, p90Hours },
    reputation: { avgRating, negativeShare, totalReviews },
    alerts: { total, byType: Record<string, number> },
    seriesDaily: [{ date, ingested, drafted, approved, posted, avgRating, negativeShare, alerts }]
  }

C) CSV Export
- Route: GET /api/admin/metrics.csv?dateFrom=...&dateTo=...&locationId=...
- Produces a daily KPI table for debugging and customer success.

2) KPI DEFINITIONS (CONSISTENT + AUDITABLE)
- ingested: count(Review) where Review.createdAt in range AND optional locationId filter.
- drafted: count(DraftReply) where DraftReply.createdAt in range AND associated Review matches location filter.
- approved: count(DraftReply) where DraftReply.approvedAt in range.
- posted: count(DraftReply) where DraftReply.postedAt in range. (posted_manual and posted_api both count.)
- approvalRate = approved / drafted (guard against divide-by-zero)
- postRate = posted / approved
- response time (hours): for posted drafts only, diffHours(DraftReply.postedAt - Review.createdAt). Exclude rejected or never-posted.
- avg rating: avg(Review.rating) in range
- negative share: count(Review where rating<=2 OR sentiment='negative') / count(Review)
- sync health: per Location: lastGbpSyncAt/lastError/consecutiveFailures (from Location fields you already store for GBP sync, or derived from recent AlertEvents for integration failures)

3) PRISMA/SQL AGGREGATIONS (APPROACH)
A) Filters
- Business scope: all queries must join through Location.businessId = activeBusinessId.
- Optional locationId: apply Location.id filter.
- Date range: [dateFrom 00:00, dateTo 23:59:59] in business timezone (if stored), otherwise UTC for MVP.

B) Example pseudo-code for JSON endpoint (server)
- Validate dateFrom/dateTo via zod.
- Resolve activeBusinessId from session.
- Pull locations list.
- Compute totals:
  - ingested = prisma.review.count({ where: { location: { businessId, ...(locationId?) }, createdAt: { gte, lte } } })
  - drafted/approved/posted via prisma.draftReply.count with appropriate timestamps.
- Response time distribution:
  - Fetch posted drafts with their review.createdAt (only those in range by postedAt or by review.createdAt; choose postedAt for SLA reporting). Compute durations in JS and derive avg/median/p90.
- Series daily:
  - Use SQL date_trunc('day', ...) grouping for performance (prisma.$queryRaw). Return per-day rows.

4) UI CONTENT (WHAT USER SEES)
A) Sync Health table
- Columns: Location | Last Sync | Status | Last Error
- Status: OK if lastSyncAt within 24h and no lastError; Warning if stale; Error if consecutiveFailures > threshold.

B) Funnel cards
- Reviews Ingested
- Drafts Created
- Approved
- Posted
- Rates: Approval Rate, Post Rate

C) Response time
- Avg / Median / P90 hours
- Note: computed only from posted drafts.

D) Reputation
- Avg rating
- Negative share
- Total reviews

E) Alerts
- Total alerts in range
- Breakdown by type (e.g., NEGATIVE_REVIEW, SYNC_FAILURE, OCR_FAILURE)

F) CSV export button
- Downloads /api/admin/metrics.csv with same filters.

5) CSV FORMAT
Headers:
- date, locationId, locationName, ingested, drafted, approved, posted, avgRating, negativeShare, alertsTotal, responseAvgHours
Notes:
- If location filter is “all”, include rows aggregated across all locations plus an optional locationId='ALL' row per day.

6) RELIABILITY + INSTRUMENTATION
- Log correlationId per request.
- Sentry capture for query exceptions.
- Hard timeouts: if series query is expensive, cap maximum range to 90 days for MVP and return a clear error.

7) PILOT CHECKLIST (TO USE AFTER DASHBOARD)
- Connect a non-test GBP account (OAuth)
- Enable 2+ locations
- Run /api/cron/sync hourly for 48h
- Confirm metrics funnel numbers increase as expected and weekly report matches dashboard totals
- Confirm negative-review alerts route to agent_bob_replit+review-bot@agentmail.to and the business owner

This implementation is intentionally MVP-focused: it delivers operational visibility (distribution of errors, funnel leakage, SLA performance) without introducing new paid analytics services. It relies on tables already in the product and produces both a human-friendly dashboard and a machine-friendly CSV export for debugging and customer reporting.