# Metrics Dashboard Copy + KPI Definitions (In-App + Customer-Facing)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T20:09:24.510Z

---

Below is build-ready copy for /app/admin/metrics that explains each KPI in plain language, plus the exact metric definitions used by the MVP so the dashboard, weekly report, and internal debugging stay consistent.

PAGE TITLE
Reputation Metrics

PAGE SUBTITLE
Track review volume, response performance, and sync health across Google Business Profile and Yelp. Export CSV for auditing.

FILTERS (UI LABELS)
Date range
Locations
Include sources: Google, Yelp, Manual (default: all)

SECTION 1 — Sync Health
Title: Sync health
Helper text: Confirms we’re successfully pulling new reviews from each source/location.
Table columns:
- Location
- Source (Google/Yelp/Manual)
- Enabled (Yes/No)
- Last successful sync
- Last error (if any)
- Failure streak
- Next action

Next action (logic copy):
- If enabled + last sync < 24h: “Healthy”
- If enabled + last sync >= 24h: “Check connection”
- If error present: “View error details”

SECTION 2 — Activation Funnel
Title: Review handling funnel
Helper text: Shows how many reviews are flowing from ingestion to drafted replies to approvals and posted outcomes.
KPIs and definitions:
- Ingested reviews: Count of Review records with createdAt in date range.
- Drafted replies: Count of reviews that have at least one DraftReply created in date range OR have an AuditLog event ‘draft_created’ in range.
- Approved replies: Count of DraftReply records approvedAt in date range OR AuditLog ‘draft_approved’ in range.
- Posted replies: Count of DraftReply records with status in {posted_manual, posted_api} where postedAt is in date range OR AuditLog ‘posted_manual’/‘posted_api’ in range.

Response time KPIs (definitions):
- Median response time: Median hours from Review.createdAt → DraftReply.postedAt for posted replies only. Rejected drafts and never-posted drafts are excluded.
- SLA breach rate (if enabled): % of negative reviews not posted within SLA window (e.g., 24h), computed as (negative reviews with no posted reply within SLA) / (negative reviews ingested).

SECTION 3 — Reputation KPIs
Title: Reputation KPIs
Helper text: High-level indicators that correlate with local revenue: rating trend, negative share, and the themes driving feedback.
KPIs and definitions:
- Review volume: Count of reviews ingested in date range.
- Average rating: Average Review.rating for reviews that include a rating (1–5).
- Rating trend (WoW): Avg rating this period minus avg rating previous equal-length period.
- Negative share: % of reviews tagged sentiment=negative OR rating <= 2 (configurable). Default rule: sentiment=negative OR rating<=2.
- Top themes: Most frequent category labels from tagging (service, price, staff, quality, cleanliness, wait_time, other), counted per review.

SECTION 4 — Alerts
Title: Alerts & escalations
Helper text: Tracks negative-review escalations and sync failures so nothing slips.
KPIs and definitions:
- Negative review alerts: Count of AlertEvent where type=negative_review within date range.
- Sync failure alerts: Count of AlertEvent where type=integration_sync_failed within date range.
- Avg time-to-acknowledge (optional): If you record acknowledgement events, compute from AlertEvent.createdAt to first ‘alert_acknowledged’ AuditLog.

EXPORT COPY
Button: Export CSV
Helper text: Downloads a CSV of the selected date range and locations for auditing and sharing.

CUSTOMER-FACING BLURB (for onboarding email / help modal)
“This dashboard is your reputation command center. We ingest new reviews (Google/Yelp/manual), tag sentiment + themes, draft brand-safe replies, and route negatives for escalation. The funnel shows whether reviews are getting handled end-to-end; Sync Health confirms your integrations are still connected. For questions or help connecting accounts, email agent_bob_replit+review-bot@agentmail.to and reference the app link https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1.”

INTERNAL NOTE (consistency rules)
- A review counts as “Posted” only when we have a postedAt timestamp + posted status (manual or API). Approval alone does not count.
- Response-time metrics exclude rejected and unposted drafts to avoid inflating time-to-respond.
- Negative share uses the same rule as SLA alerts to keep reporting consistent.
