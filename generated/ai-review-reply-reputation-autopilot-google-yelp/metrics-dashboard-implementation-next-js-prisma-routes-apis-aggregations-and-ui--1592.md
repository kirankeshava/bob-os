# Metrics Dashboard Implementation (Next.js + Prisma) — Routes, APIs, Aggregations, and UI Copy

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T16:46:18.285Z

---

Below is the build-complete implementation outline for the in-app metrics dashboard that is now wired into the MVP. It uses only existing tables (Review, DraftReply, AuditLog, AlertEvent, WeeklyReport, Location, Integration, UserBusinessMembership) and requires no paid dependencies.

1) Routes and pages
- /app/admin/metrics
  - Server component page with a filter bar:
    - Date range: start/end (default last 30 days)
    - Location: All locations (default) or specific locationId
    - Timezone: derived from Business.timezone; used to bucket by day/week
  - Sections
    A) Sync Health
      - Table by location: Location name, integration type, enabled, lastSyncAt, lastError, consecutiveFailures, reviewsFetchedLast24h
      - UI copy: “If a location shows repeated failures, click ‘View logs’ to see the last error context.”
    B) Activation Funnel
      - KPI cards: Ingested reviews, Drafts generated, Approved, Posted (manual/API), Median response time
      - Breakdown table by location with the same columns + conversion rates
      - Series payload for simple sparklines: ingestedByDay[], postedByDay[], negativeByDay[]
    C) Alerts & Negative Reviews
      - KPI cards: Negative reviews count, Negative share (%), Alerts sent, Median time-to-first-action
      - Table: Most common themes (from Review.categoryLabels) and counts

2) API endpoints
- GET /api/admin/metrics?businessId=...&start=...&end=...&locationId=...&tz=...
  - AuthN/AuthZ:
    - user must have membership in UserBusinessMembership for the businessId
    - reject if start/end range > 180 days (guardrail)
  - Returns JSON:
    {
      filters: { start, end, locationId, tz },
      syncHealth: [{ locationId, name, integration, enabled, lastSyncAt, lastError, consecutiveFailures, fetched24h }],
      funnel: {
        totals: { ingested, drafted, approved, posted, postedManual, postedApi },
        rates: { draftedRate, approvedRate, postedRate },
        responseTime: { medianMinutes, p90Minutes },
        byLocation: [...],
        series: { ingestedByDay: [{date,count}], postedByDay: [...], negativeByDay: [...] }
      },
      alerts: {
        totals: { alertsSent, negativeReviews, negativeShare },
        timeToFirstAction: { medianMinutes, p90Minutes },
        themes: [{ label, count }]
      }
    }

- GET /api/admin/metrics.csv?businessId=...&start=...&end=...&locationId=...&tz=...
  - Same RBAC + validation
  - CSV output includes:
    - Header comments:
      # businessId=...
      # start=...
      # end=...
      # locationId=ALL|...
      # generatedAt=...
    - Columns (weekly buckets): week_start, location_name, ingested, drafted, approved, posted, median_response_minutes, negative_reviews, negative_share

3) Metric definitions (must remain consistent across weekly reports + dashboard)
- Ingested:
  - Count of Review records with createdAt within [start,end] and matching location filter.
- Drafted:
  - Count of DraftReply where reviewId is in the filtered reviews and DraftReply.createdAt within range OR draft exists for those reviews (prefer “draft exists” for funnel). Dashboard uses “draft exists for ingested reviews in range.”
- Approved:
  - DraftReply.status == 'approved' AND updatedAt within range (or approval AuditLog event within range). We use AuditLog for exact event time.
- Posted:
  - DraftReply.postedAt != null within range; split by postedVia ('manual'|'api').
- Response time (posted only):
  - For each review with a posted draft: postedAt - Review.createdAt. Exclude rejected and never-posted drafts.
- Negative:
  - Review.sentiment == 'negative' OR rating <= 2 (aligned with escalation rule default). Dashboard uses stored sentiment plus rating fallback.
- Time to first action:
  - First AuditLog event for a review among {draft_generated, draft_edited, approved, rejected, posted_manual, posted_api} minus Review.createdAt.

4) Aggregation approach (Prisma + minimal raw SQL)
- Fetch relevant review IDs by filter:
  - where: businessId, locationId optional, createdAt between start/end
- Totals:
  - Review.count(...)
  - DraftReply.count where reviewId in set
  - AuditLog.count where action == 'draft_approved' and reviewId in set
  - DraftReply.count where postedAt not null and reviewId in set
- Median/p90:
  - Use raw SQL percentile_cont on computed intervals (Postgres) for speed and correctness:
    SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (posted_at - review_created_at))/60) AS median_minutes,
           percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (posted_at - review_created_at))/60) AS p90_minutes
    FROM (... join DraftReply + Review ...)
- Series by day:
  - date_trunc('day', createdAt at tz) group by; similar for postedAt.
- Themes:
  - Unnest Review.categoryLabels array and count occurrences.

5) UI copy (ready to paste)
- Page title: “Metrics”
- Description: “Track review volume, response performance, and sync health. Use filters to focus on a location or date range.”
- Sync Health empty state: “No integrations connected yet. Connect Google Business Profile or import reviews to start tracking.”
- Funnel helper text: “Response time is calculated only for reviews with a posted reply (manual or API). Rejected or unposted drafts are excluded.”
- Alerts helper text: “Negative reviews are detected by sentiment and/or low rating and can trigger escalation emails.”

6) Deep links (recommended next step)
- From dashboard to queue:
  - /app/reviews?locationId=...&start=...&end=...&sentiment=negative
  - /app/reviews?status=needs_approval

This dashboard is intentionally lightweight and reliable: server-rendered, minimal dependencies, and built on the existing AuditLog/Review/DraftReply data so customers can immediately see value and trust the system’s accountability.