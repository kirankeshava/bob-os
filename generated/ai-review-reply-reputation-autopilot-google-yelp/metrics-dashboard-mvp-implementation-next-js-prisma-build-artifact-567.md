# Metrics Dashboard MVP — Implementation (Next.js + Prisma) Build Artifact

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T08:20:18.079Z

---

Below is build-ready implementation content for the metrics dashboard (routes, API handlers, Prisma query strategy, CSV export). It assumes the existing tables mentioned in prior cycles: Business, Location, Integration, Review, DraftReply, AlertEvent, AuditLog, WeeklyReport, plus memberships for RBAC.

1) Routes/UI
- Page: /app/admin/metrics
  - Controls:
    - Date range: start, end (defaults: last 14 days)
    - Location filter: all locations or a single locationId
    - Buttons: Apply, Export CSV
  - Sections:
    - Sync Health (per location): lastSyncAt, lastError, consecutiveFailures (if tracked), enabled flag
    - Activation Funnel (totals + rate):
      - Ingested reviews: count of Review.createdAt in range
      - Drafted: count of DraftReply where createdAt in range OR linked Review in range (choose one; recommended: Review in range)
      - Approved: count where DraftReply.status transitioned to APPROVED in range (from AuditLog) OR DraftReply.approvedAt if present
      - Posted: count where DraftReply.postedAt in range (manual posting sets postedAt)
      - Median response time: median(postedAt - review.createdAt) for posted
    - Alerts (totals + daily series): count of AlertEvent.createdAt in range, grouped by type/severity
    - Top themes: group by Review.categoryLabels (or stored tags) and count
    - Rating trend: avg rating per day + overall average

2) API: /api/admin/metrics (JSON)
- Query params:
  - start=YYYY-MM-DD
  - end=YYYY-MM-DD
  - locationId=(optional)
- Validation (zod): ensure end>=start, range <= 90 days, locationId belongs to business.
- RBAC: require logged-in user and membership in selected business.
- Output shape:
  {
    range: {start, end},
    totals: {
      ingested, drafted, approved, posted,
      avgRating, negativeShare,
      medianResponseMinutes,
      slaBreaches
    },
    series: {
      daily: [{date, ingested, posted, avgRating, negativeCount, alertsCount}],
    },
    breakdowns: {
      byLocation: [{locationId, name, ingested, posted, avgRating, lastSyncAt, lastError}],
      themes: [{label, count}],
      alertsByType: [{type, count}]
    }
  }

3) CSV Export: /api/admin/metrics.csv
- Same query params and RBAC.
- CSV includes two sections separated by a blank line:
  - Summary rows: key,value
  - Daily rows: date,ingested,posted,avg_rating,negative_count,alerts_count
  - Location rows: location_id,location_name,ingested,posted,avg_rating,last_sync_at,last_error

4) KPI Definitions (enforced consistently in code)
- Ingested: Review.createdAt within [start,end]
- Drafted: DraftReply.createdAt within [start,end] AND linked review in range OR (recommended for funnel alignment) count of reviews in range that have >=1 DraftReply
- Approved:
  - Preferred: AuditLog eventType='DRAFT_APPROVED' within range
  - Fallback: DraftReply.status='approved' and approvedAt within range
- Posted: DraftReply.postedAt within range (manual flow sets postedAt and status 'posted_manual')
- Response time:
  - For posted drafts only: postedAt - Review.createdAt
  - Exclude drafts with status rejected or never posted
  - Use median (p50) to reduce outlier impact
- Negative:
  - sentiment='negative' OR rating<=2
  - If location has override threshold (e.g., rating<=3), apply that.
- SLA breaches:
  - negative reviews where (now - createdAt) > SLA hours AND no approved/posted draft exists

5) Prisma/SQL Aggregation Strategy
- Daily series: generate date buckets in app code (start..end) then fill with grouped query results.
- Aggregations:
  - Reviews grouped by day:
    - Prisma groupBy on createdAt truncated is limited; easiest is raw SQL:
      SELECT date_trunc('day', "createdAt")::date as day, COUNT(*) as count, AVG(rating) as avg_rating,
             SUM(CASE WHEN sentiment='negative' OR rating<=2 THEN 1 ELSE 0 END) as negative_count
      FROM "Review"
      WHERE "businessId"=$1 AND "createdAt">=$2 AND "createdAt"<=$3
      AND ($4::text IS NULL OR "locationId"=$4)
      GROUP BY day ORDER BY day;
  - Posted drafts grouped by day:
      SELECT date_trunc('day', d."postedAt")::date as day, COUNT(*) as posted_count
      FROM "DraftReply" d
      JOIN "Review" r ON r.id=d."reviewId"
      WHERE r."businessId"=$1 AND d."postedAt" IS NOT NULL
      AND d."postedAt">=$2 AND d."postedAt"<=$3
      AND ($4::text IS NULL OR r."locationId"=$4)
      GROUP BY day ORDER BY day;
  - Median response time:
      SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt"-r."createdAt"))/60.0) as median_minutes
      FROM "DraftReply" d JOIN "Review" r ON r.id=d."reviewId"
      WHERE r."businessId"=$1 AND d."postedAt" IS NOT NULL
      AND d."postedAt">=$2 AND d."postedAt"<=$3
      AND ($4::text IS NULL OR r."locationId"=$4);
  - Alerts grouped by day/type:
      SELECT date_trunc('day', "createdAt")::date as day, COUNT(*) as alerts_count
      FROM "AlertEvent"
      WHERE "businessId"=$1 AND "createdAt">=$2 AND "createdAt"<=$3
      AND ($4::text IS NULL OR "locationId"=$4)
      GROUP BY day ORDER BY day;

6) UI Wiring Notes
- Use server components for initial load (fast, secure), then client component for filters that updates search params.
- Export CSV button points to /api/admin/metrics.csv?start=...&end=...&locationId=...
- Include a small “Data definitions” accordion at bottom so customers understand metrics.

7) Pilot Checklist (for next step)
- Connect GBP via /app/integrations/google/connect for a real business.
- Enable 2+ locations; run /api/cron/sync.
- Confirm new reviews appear, drafts created, negative reviews trigger email to agent_bob_replit+review-bot@agentmail.to.
- Approve 1-2 drafts; perform manual post audit.
- Visit /app/admin/metrics and verify funnel counts and response-time median update.
- Generate weekly report via /api/cron/weekly-reports and confirm PDF email delivery.

Customer-facing templates (for pilot outreach) should reference the website URL https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1 and contact agent_bob_replit+review-bot@agentmail.to for onboarding and support.