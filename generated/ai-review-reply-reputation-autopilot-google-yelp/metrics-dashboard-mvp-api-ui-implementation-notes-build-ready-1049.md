# Metrics Dashboard MVP — API + UI Implementation Notes (Build-Ready)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T12:35:39.336Z

---

Overview
This MVP adds an RBAC-protected metrics dashboard at /app/admin/metrics plus two endpoints:
- GET /api/admin/metrics: JSON payload for all dashboard widgets
- GET /api/admin/metrics.csv: CSV export for debugging and client reporting

Audience/Goal
Local business owners and internal admins need a fast, reliable view of: (1) integration sync health, (2) the review-response activation funnel, (3) response-time SLAs, (4) alert volume, and (5) top themes. This is built using existing tables (Review, DraftReply, Location, Integration, AlertEvent, AuditLog) and requires no new infra.

RBAC
All routes require an authenticated user who is a member of the Business (UserBusinessMembership). The businessId comes from the session context or explicit selection for super-admin; the API validates membership before returning any data.

Query params (both endpoints)
- businessId: string (required unless derived from session)
- locationId: string (optional)
- from: ISO date string (required)
- to: ISO date string (required)
Validation uses Zod:
- from < to
- range max 365 days (to avoid heavy scans)

KPI Definitions (consistent across UI + CSV)
1) Ingested reviews: Review.createdAt within [from, to] (or Review.reviewCreatedAt if you prefer source time; MVP uses createdAt to measure system throughput).
2) Drafted: reviews that have at least one DraftReply created within the range OR associated to a Review created in range (MVP uses DraftReply.createdAt in range, filtered by Review within business/location).
3) Approved: DraftReply.status == 'approved' and updatedAt within range (or approvedAt if you have it). MVP treats status transition time via DraftReply.updatedAt.
4) Posted: DraftReply.postedAt within range AND status in ('posted_manual','posted_api').
5) Time-to-first-draft: DraftReply.createdAt - Review.createdAt (first draft per review).
6) Time-to-post: DraftReply.postedAt - Review.createdAt (for posted only; excludes rejected/unposted).
7) Negative share: reviews with (rating <= 2 OR sentiment == 'negative') / total.
8) Avg rating: average of Review.rating (non-null).
9) Sync health: per Location, show lastSyncAt/lastError and consecutive failure counts derived from Integration/Location fields and recent AlertEvents.

API Response Shape (JSON)
{
  range: { from, to },
  filters: { businessId, locationId?: string },
  summary: {
    ingested: number,
    drafted: number,
    approved: number,
    posted: number,
    conversion: { draftedRate, approvedRate, postedRate },
    avgRating: number | null,
    negativeShare: number,
    responseTime: {
      medianToDraftMinutes: number | null,
      p90ToDraftMinutes: number | null,
      medianToPostMinutes: number | null,
      p90ToPostMinutes: number | null
    }
  },
  trends: {
    byWeek: Array<{ weekStart: string, reviewCount: number, avgRating: number | null, negativeShare: number }>
  },
  themes: {
    topCategories: Array<{ category: string, count: number }>,
    topKeywords: Array<{ keyword: string, count: number }>
  },
  alerts: {
    total: number,
    byType: Array<{ type: string, count: number }>
  },
  syncHealth: Array<{
    locationId: string,
    locationName: string,
    source: 'google'|'yelp'|'manual',
    enabled: boolean,
    lastSyncAt: string | null,
    lastError: string | null,
    consecutiveFailures: number
  }>
}

Prisma Aggregations (practical MVP approach)
- Funnel counts use count queries with where clauses on businessId + optional locationId + date filters.
- First-draft per review is computed using groupBy on DraftReply.reviewId with _min(createdAt), then join back to Reviews to compute deltas.
- Posted deltas use DraftReply where postedAt != null.
- Trends by week can be computed using a raw SQL date_trunc('week', ...) group or computed in JS after fetching daily aggregates; MVP uses raw SQL for correctness.

UI Components (minimal, fast)
- Filters bar: date range + location dropdown (All locations default)
- Summary stat cards: Ingested, Drafted, Approved, Posted, Avg rating, Negative share, Median response time
- Tables:
  - Sync Health table (location rows)
  - Funnel table (counts + conversion rates)
  - Alerts table (counts by type)
- Themes: top categories list
- Export: “Download CSV” button that hits /api/admin/metrics.csv with same query params

Instrumentation
- Every API handler wraps with try/catch and logs a correlationId.
- Errors go to Sentry with tags: businessId, route, integration=metrics.
- Slow query logging: if total handler time > 2s, log warn with breakdown.

Customer-facing context
This dashboard supports onboarding calls and weekly QBRs. When sending any customer instructions or pilot setup email, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

Pilot Validation Checklist (next)
1) Connect GBP OAuth, enable 2+ locations, run /api/cron/sync repeatedly.
2) Confirm no duplicates: gbpReviewId unique upsert works.
3) Confirm edited reviews update: updateTime watermark per location catches edits.
4) Confirm dashboard counts: ingested matches actual new reviews; posted reflects manual audit timestamps.
5) Export CSV and reconcile against UI numbers.

This is intentionally “good enough” for MVP: it makes the system observable, reduces support burden, and enables fast iteration without adding new paid analytics products.