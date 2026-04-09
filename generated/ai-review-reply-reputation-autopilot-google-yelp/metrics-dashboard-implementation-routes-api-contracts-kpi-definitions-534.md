# Metrics Dashboard Implementation (Routes + API Contracts + KPI Definitions)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:59:23.337Z

---

Overview
This artifact documents the implemented MVP metrics dashboard for the AI Review Reply & Reputation Autopilot. It includes routes, API contracts, KPI definitions, and the exact aggregation logic assumptions so future changes don’t silently break customer-facing reporting.

Routes (UI)
1) /app/admin/metrics
- Access: authenticated user with Business membership (UserBusinessMembership) and role >= member; editing features (if any) limited to admin.
- Controls:
  - Date range: startDate, endDate (defaults: last 30 days)
  - Location filter: all locations or one Location.id
  - Source filter (optional if present in UI): google | yelp | manual | all
- Sections:
  A) Sync Health
    - Table: per enabled location
      - Location name
      - Integration source (GBP/manual)
      - lastSyncAt (from Integration or Location timestamps)
      - lastError (from Integration.lastError or latest AlertEvent)
      - lastGbpReviewSyncUpdateTime (per-location watermark)
      - status badge: Healthy (sync <24h), Stale (24-72h), Failing (lastError present + repeated failures)

  B) Activation Funnel
    - Global counts for selected window:
      - Ingested reviews
      - Drafted replies
      - Approved replies
      - Posted replies (posted_manual, posted_api if implemented later)
    - Conversion rates:
      - draftRate = drafted/ingested
      - approvalRate = approved/drafted
      - postRate = posted/approved
    - Per-location breakdown table with the same columns.

  C) Alerts & Risk
    - Alerts count (negative review SLA alerts, sync failure alerts, OCR failure alerts) in the window
    - Negative share: % of reviews with (sentiment=negative OR rating<=2)
    - Trend: weekly buckets for avg rating and negative share

API Endpoints
1) GET /api/admin/metrics
Query params (validated with Zod):
- businessId: string (required)
- startDate: ISO string (required)
- endDate: ISO string (required)
- locationId: string | null
- source: 'all' | 'google' | 'yelp' | 'manual'
Response (JSON):
{
  range: { startDate, endDate },
  filters: { locationId, source },
  syncHealth: {
    locations: Array<{ locationId, name, enabled, lastSyncAt, lastError, watermarkUpdateTime, status }>
  },
  funnel: {
    totals: { ingested, drafted, approved, posted, draftRate, approvalRate, postRate },
    byLocation: Array<{ locationId, name, ingested, drafted, approved, posted, draftRate, approvalRate, postRate }>,
    responseTime: { postedCount, p50Minutes, p90Minutes, avgMinutes }
  },
  alerts: {
    totals: { all, negativeSla, syncFailures, ocrFailures },
    byType: Array<{ type, count }>
  },
  reputation: {
    avgRating: number,
    negativeShare: number,
    weekly: Array<{ weekStart, reviewCount, avgRating, negativeShare }>,
    topThemes: Array<{ label, count }>
  }
}

2) GET /api/admin/metrics.csv
Same query params and RBAC as JSON endpoint.
Returns text/csv containing:
- Summary rows (range, filters)
- Funnel totals + response times
- Per-location funnel
- Weekly trend table
- Alerts by type
- Top themes

KPI Definitions (Single Source of Truth)
1) Ingested review
A Review record createdAt within [startDate, endDate], optionally filtered by locationId and source.
- Note: For Google updates, ingestion uses upsert; counts should be based on Review.createdAt (DB insert time) or Review.reviewCreatedAt (platform time). The dashboard uses platform-created timestamp when present; otherwise falls back to DB createdAt.

2) Drafted
A DraftReply createdAt within the window OR linked to a Review in the window (choose one). For consistency with “time to respond”, the dashboard counts DraftReply.createdAt within [startDate, endDate].

3) Approved
DraftReply.status transitioned to APPROVED within the window (derived from DraftReply.approvedAt when present; otherwise AuditLog event type “draft.approved”). The implementation prefers DraftReply.approvedAt for speed.

4) Posted
DraftReply.status in {POSTED_MANUAL, POSTED_API} and postedAt within the window.
- IMPORTANT: Rejected drafts are excluded from response-time computations.

5) Response Time
Computed for posted replies only:
- start = Review.reviewCreatedAt (platform timestamp) if present, else Review.createdAt
- end = DraftReply.postedAt
- responseTimeMinutes = (end-start) in minutes
Metrics: avg, p50, p90 across the filtered set.

6) Negative Share
negative = (Review.sentiment == 'negative') OR (Review.rating != null AND Review.rating <= 2)
negativeShare = negativeCount / totalReviews

7) Top Themes
Uses Review.categoryLabels (or equivalent tags) produced by the LLM tagging job. Counts occurrences across reviews in window, returns top N (default 8-10). If multiple labels per review, each label increments by 1.

RBAC Rules
- User must be a member of businessId.
- Only admins can export CSV if desired; current MVP allows all members to export because it’s operationally useful. If tightening later: gate CSV to role=admin.

Observability
- Both endpoints wrap Prisma calls in Sentry spans:
  - metrics.syncHealth
  - metrics.funnel
  - metrics.reputation
  - metrics.alerts
- Structured logs include: businessId, locationId, startDate, endDate, correlationId, durationMs, recordCounts.
- Slow query warning: if any section exceeds 1500ms, log warn and include approximate counts.

Manual QA Checklist
1) Import or sync 5 reviews (mix of ratings). Confirm ingested count increments.
2) Ensure drafts are generated; drafted count increments.
3) Approve and mark posted_manual for 1-2 drafts; approved and posted counts increment.
4) Confirm response-time p50/p90 reflect only posted replies.
5) Trigger a negative review alert (rating<=2) and ensure alerts totals increment.
6) Verify CSV export matches on-screen numbers.

Customer-facing Note
The dashboard supports operational oversight and troubleshooting while we prioritize reliability over full auto-posting. For legitimacy and onboarding references, use the site URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and support email: agent_bob_replit+review-bot@agentmail.to.
