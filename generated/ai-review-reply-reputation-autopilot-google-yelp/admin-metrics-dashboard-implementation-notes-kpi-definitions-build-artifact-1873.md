# Admin Metrics Dashboard — Implementation Notes + KPI Definitions (Build Artifact)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T18:34:50.342Z

---

Overview
This artifact documents the implemented /app/admin/metrics dashboard and the exact KPI definitions used so pilots and future iteration stay consistent with the weekly report and the operational workflow (ingest → tag → draft → approve → post/manual).

Routes & Access
1) Page: /app/admin/metrics
- Requires authenticated user with membership in the active Business.
- Supports filters: startDate, endDate (ISO dates), locationId (optional), and timezone derived from Business.timezone.

2) API (JSON): GET /api/admin/metrics?start=YYYY-MM-DD&end=YYYY-MM-DD&locationId=...
- Validates inputs with zod (date range max window enforced to prevent abuse).
- Scopes all queries to businessId from session.
- Returns: syncHealth, funnel, responseTime, sentimentBreakdown, alerts, topThemes.

3) API (CSV): GET /api/admin/metrics.csv?start=...&end=...&locationId=...
- Produces a flat export with daily rollups plus per-location summary.
- Intended for debugging and customer success analysis.

KPI Definitions (Canonical)
A) Ingested Reviews
- Count of Review records createdAt within [start, end] (business timezone).
- Source can be google/yelp/manual/email/ocr; export includes source breakdown.

B) Drafted
- Count of reviews with at least one DraftReply created within the window OR a DraftReply tied to a Review ingested earlier but drafted during the window.
- Dashboard uses DraftReply.createdAt to reflect work performed.

C) Approved
- Count of DraftReply where status transitioned to APPROVED within the window.
- Derived from DraftReply.approvedAt when available; falls back to AuditLog action ‘draft.approve’ timestamp.

D) Posted
- Count of DraftReply where status is POSTED_MANUAL (or POSTED_API in future) and postedAt within the window.
- This aligns with the “guided copy/paste” workflow and ensures response-time metrics reflect real posting.

E) Response Time
- For posted replies only: median and average of (postedAt - Review.createdAt).
- Excludes rejected drafts and approved-but-not-posted drafts.

F) Negative Share
- Percentage of ingested reviews in the window where (rating <= 2) OR sentiment = NEGATIVE.
- Uses the tagged sentiment if present; if tagging pending, rating rule still applies.

G) Sync Health
- Per enabled location: lastSyncAt, lastError, consecutiveFailures.
- Highlights “stale” locations where lastSyncAt > 24h (configurable) and shows any AlertEvent created by sync failures.

H) Alerts
- Count of AlertEvent records created within the window grouped by type (negative_review, sync_failure, ocr_failure, sla_breach).
- Also lists the latest 10 alert events with timestamps and affected location.

I) Top Themes
- Uses stored category labels on Review (service/price/staff/quality/cleanliness/wait_time/other).
- Returns top categories by count, optionally split by sentiment.

UI Modules
1) KPI Cards: Ingested, Drafted, Approved, Posted, Median Response Time, Negative Share.
2) Funnel Table: stage counts + conversion rates (Drafted/Ingested, Approved/Drafted, Posted/Approved).
3) Sync Health Table: location name, source (GBP), last sync, status badge, last error.
4) Alerts Summary: by type + recent list.
5) Theme Breakdown: simple bar list (fast, no heavy chart libs required).

Instrumentation
- Each metrics request includes a correlationId; server logs include businessId, locationId, date window.
- Sentry spans wrap: reviews query, drafts query, audit query, alerts query.

Operational Notes for Pilots
- If a business does not connect GBP, metrics still function from manual/email/ocr imports.
- If posting remains manual, ensure staff actually clicks “Mark as posted” so response-time and posted counts are accurate.
- During the 48h stability pilot, compare:
  1) /api/health/integrations output (sync freshness)
  2) Metrics dashboard posted counts
  3) Weekly report totals
These should match within expected timing differences (timezone and weekly cutoff).

Customer-Facing Explanation Snippet (for the dashboard help drawer)
“Posted responses are counted when you mark a reply as posted (manual copy/paste) or when API posting is enabled. Response time measures how quickly you posted a response after the review was created, so approved-but-not-posted replies don’t affect it.”
