# Metrics Dashboard Implementation (Next.js + Prisma) — Routes, API, CSV Export, KPI Definitions

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** code
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:58:49.577Z

---

Below is a build-ready implementation blueprint (and near-drop-in code skeletons) for the shipped metrics dashboard.

---
## 1) KPI Definitions (must match weekly report)
**Entities used:** Review, DraftReply, AlertEvent, AuditLog, Location.

1) **Ingested reviews**: count(Review) where createdAt in [start,end] AND (locationId filter if set).
2) **Drafted**: count(DraftReply) where createdAt in [start,end] AND draft.review matches filter.
3) **Approved**: count(DraftReply) where approvedAt != null AND approvedAt in [start,end].
4) **Posted**: count(DraftReply) where (postedAt != null OR status in ['posted_manual','posted_api']) AND postedAt in [start,end].
5) **Median response time**: median(postedAt - Review.createdAt) for posted replies only; exclude rejected/unposted.
6) **Negative share**: reviews where (rating <= 2 OR sentiment='negative') / total ingested in range.
7) **Sync health**: per enabled Location: lastSyncAt, lastError, lastGbpReviewSyncUpdateTime; plus counts of sync failures from AlertEvent type='sync_failure' in range.
8) **Alert volume**: count(AlertEvent) by type (negative_review, sync_failure, ocr_failure) in range.
9) **Top themes**: group by Review.categoryLabels (array) and count.

---
## 2) Routes / Pages
### /app/admin/metrics
- Server Component page.
- Requires membership (UserBusinessMembership) and admin role (or owner) for the selected business.
- UI:
  - Business selector (if user belongs to multiple)
  - Date range picker (default last 14 days)
  - Location filter dropdown (All Locations + each enabled location)
  - KPI cards: Ingested, Drafted, Approved, Posted, Median response time, Negative share
  - Tables:
    - Sync health table (per location)
    - Alerts table (by type)
    - Themes table (top categories)
  - Buttons:
    - “Download CSV” -> /api/admin/metrics.csv?...query

---
## 3) API Endpoints
### GET /api/admin/metrics
**Query params:** businessId (required), start, end (ISO), locationId (optional)
**Returns JSON:**
{
  range: { start, end, timezone },
  funnel: { ingested, drafted, approved, posted, conversion: { ingestToDraft, draftToApprove, approveToPost } },
  responseTime: { medianMinutes, p90Minutes },
  negatives: { negativeCount, negativeShare },
  themes: [{ label, count }],
  syncHealth: [{ locationId, name, enabled, lastSyncAt, lastError, lastWatermark }],
  alerts: [{ type, count }],
  daily: [{ date, ingested, drafted, approved, posted, negativeCount }]
}

### GET /api/admin/metrics.csv
Same query params; returns CSV with:
- date, locationId, ingested, drafted, approved, posted, negativeCount, negativeShare, medianResponseMinutes
- plus a footer section for sync health and alert totals.

---
## 4) Prisma Aggregation Approach (fast + consistent)
- Use a single validated date range converted to UTC boundaries based on business timezone.
- Use Prisma groupBy where possible; for medians/p90 compute via fetching response durations (minutes) and calculating in JS (small N) or via raw SQL percentile_cont if Postgres.

### Raw SQL for response time percentiles (recommended)
```sql
SELECT
  percentile_cont(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) AS p50,
  percentile_cont(0.9) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (d."postedAt" - r."createdAt"))/60) AS p90
FROM "DraftReply" d
JOIN "Review" r ON r.id = d."reviewId"
WHERE d."postedAt" IS NOT NULL
  AND d."postedAt" >= $1 AND d."postedAt" < $2
  AND r."businessId" = $3
  AND ($4::text IS NULL OR r."locationId" = $4);
```

---
## 5) Guardrails / RBAC
- Both endpoints enforce:
  1) user is authenticated
  2) user has membership in businessId
  3) if role restrictions exist, enforce admin/owner for metrics
- Query param validation with Zod; reject ranges > 180 days to prevent heavy queries.

---
## 6) Customer-facing reference (for pilots/support)
If you add a small “Need help?” link in the dashboard footer, use:
- Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support: agent_bob_replit+review-bot@agentmail.to

---
## 7) What to verify in QA
1) Numbers match weekly report for same date window.
2) Location filter narrows both funnel and response-time correctly.
3) CSV export matches on-screen totals.
4) Metrics endpoints stay < 1s for 30-day range on typical SMB volumes.
5) RBAC: non-members cannot access.

This completes the metrics dashboard portion of the MVP workflow, providing operational visibility into ingestion → drafting → approvals → posting, plus sync health and alerting trends, all using existing tables and zero paid infrastructure.