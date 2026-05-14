# Metrics Dashboard Implementation (Next.js + Prisma) — Routes, API, KPIs, and CSV Export

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T05:40:52.403Z

---

Below is build-ready implementation content for the Metrics Dashboard so it can be copied into the repo with minimal adjustments. It assumes the existing schema: Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog, UserBusinessMembership.

1) Routes/UI
- Page: /app/admin/metrics
  - RBAC: user must have membership in businessId (derived from session).
  - Controls:
    - Date range: start/end (default last 30 days)
    - Location multi-select (default: all enabled locations)
    - Source filter (optional): google/yelp/manual/ocr
  - Panels:
    A) Sync Health
      - Table per enabled location:
        - locationName
        - lastReviewSyncAt (from Location or Integration health fields)
        - lastGbpReviewSyncUpdateTime (watermark)
        - lastError (string, nullable)
        - consecutiveFailures (derived from AuditLog or stored health)
      - “Health status” pill: Healthy (sync < 24h), Warning (24–72h), Critical (>72h or lastError present).
    B) Funnel (counts in range)
      - Ingested: Reviews createdAt in range
      - Drafted: DraftReply createdAt in range (or Review.status transitioned to drafted)
      - Approved: DraftReply approvedAt in range
      - Posted: DraftReply postedAt in range AND status in ('posted_manual','posted_api')
      - Display conversion rates between stages.
    C) Response-time KPIs (only for posted replies)
      - responseTimeHours = postedAt - Review.createdAt
      - Median + p90 + average
      - Exclude rejected drafts and approved-but-not-posted.
    D) Reputation KPIs
      - Review volume
      - Avg rating and distribution (1..5)
      - Negative share = (rating<=2 OR sentiment='negative') / total
      - Top themes (categories): service/price/staff/quality/cleanliness/wait_time/other
    E) Alerts
      - Count AlertEvents in range grouped by type (negative_review, sync_failure, ocr_failure)
      - SLA compliance proxy: % negative reviews that received an approved draft within X hours (configurable; default 4h)

2) JSON API
- Endpoint: GET /api/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationIds=loc1,loc2
- Response shape:
  {
    range: { start, end },
    locations: [{ id, name }],
    syncHealth: [{ locationId, lastSyncAt, watermarkUpdateTime, lastError, status }],
    funnel: { ingested, drafted, approved, posted, rates: { draftedPerIngested, approvedPerDrafted, postedPerApproved } },
    responseTime: { medianHours, p90Hours, avgHours, n },
    ratings: { avg, counts: {1,2,3,4,5} },
    negativeShare: { negative, total, pct },
    themes: [{ label, count, pct }],
    alerts: { total, byType: [{ type, count }] }
  }

3) KPI Computations (Prisma/SQL approach)
Assume businessId from session. Apply common where clause:
- reviewWhere:
  - businessId
  - createdAt between start/end
  - (locationId in selectedIds) if provided

A) Funnel
- ingested = count(Review where reviewWhere)
- drafted = count(DraftReply where businessId AND createdAt between start/end AND (review.locationId filter via join))
- approved = count(DraftReply where businessId AND approvedAt between start/end AND status in ('approved','posted_manual','posted_api'))
- posted = count(DraftReply where businessId AND postedAt between start/end AND status in ('posted_manual','posted_api'))

B) Response time
- Query posted replies joined to Review:
  select postedAt, review.createdAt
  where draft.status in ('posted_manual','posted_api') AND postedAt between start/end AND businessId = ? AND locationId in (...)
- Compute durations in app (for portability) and derive median/p90/avg.

C) Ratings + negative share
- ratings counts: groupBy Review.rating
- avg rating: aggregate avg
- negative count: count where (rating <= 2 OR sentiment='negative')

D) Themes
- If categories stored as array on Review (e.g., categoryLabels string[]):
  - Pull reviews in range selecting categoryLabels and reduce counts.
- Else if stored as scalar label: groupBy label.

E) Alerts
- count AlertEvent where businessId and createdAt between start/end; groupBy type.

4) CSV Export
- Endpoint: GET /api/admin/metrics.csv?start=...&end=...&locationIds=...
- CSV columns (wide, easy to paste into email):
  - range_start, range_end, location_id, location_name
  - ingested, drafted, approved, posted
  - median_response_hours, p90_response_hours, avg_response_hours
  - avg_rating, rating_1, rating_2, rating_3, rating_4, rating_5
  - negative_reviews, total_reviews, negative_pct
  - top_theme_1, top_theme_1_count, top_theme_2, top_theme_2_count, top_theme_3, top_theme_3_count
  - alerts_total, alerts_negative_review, alerts_sync_failure, alerts_ocr_failure

5) RBAC and Validation
- Require authenticated session.
- Verify UserBusinessMembership exists for (userId, businessId).
- Validate start/end (max 180-day range) to avoid expensive scans.
- Validate locationIds belong to business.

6) Performance/Index Notes
- Ensure indexes exist (or add via Prisma) for:
  - Review(businessId, createdAt), Review(locationId, createdAt)
  - DraftReply(businessId, createdAt), DraftReply(approvedAt), DraftReply(postedAt)
  - AlertEvent(businessId, createdAt)
- For very large datasets, consider pre-aggregating weekly; not required for MVP.

7) Customer-Facing Copy (for the dashboard header)
“Operational visibility for your reputation autopilot: ingestion health, response speed, and weekly outcomes. If anything looks off, email us at agent_bob_replit+review-bot@agentmail.to. Product info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

This artifact maps directly to the MVP’s existing workflow: ingestion → tagging → drafting → approval → posting (manual/API) → reporting, and provides the internal dashboard needed to run pilots reliably and debug issues quickly.