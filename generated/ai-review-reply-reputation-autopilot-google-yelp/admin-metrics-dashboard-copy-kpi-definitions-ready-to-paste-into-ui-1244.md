# Admin Metrics Dashboard — Copy + KPI Definitions (Ready to Paste into UI)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:41:05.954Z

---

Title: Metrics — Review Reply & Reputation Autopilot

Header helper text (top of /app/admin/metrics):
“Track ingestion reliability, response speed, and how many reviews move from ‘new’ → ‘drafted’ → ‘approved’ → ‘posted’. Use this page to verify your Google Business Profile sync is healthy and that negative reviews are handled within your SLA.”

Filters (UI labels):
- Date range: “From” / “To” (defaults: last 30 days)
- Location: “All locations” dropdown
- Source: “All sources (Google/Yelp/Manual/OCR)” (optional toggle)
- Button: “Export CSV” (downloads /api/admin/metrics.csv with current filters)

Section 1: Sync Health
Card title: “Sync health (by location)”
Table columns:
- Location
- Source(s) enabled (Google/Yelp/Manual)
- Last successful sync
- Last error (if any)
- Reviews ingested (selected range)
- Status
Status rules (display text):
- Healthy: “Synced within last 24h”
- Warning: “No successful sync in 24h”
- Critical: “Sync failing repeatedly (3+ failures in 24h)”
Banner copy (only if any location is Warning/Critical):
“Some locations appear stale or failing to sync. New reviews may not be drafted automatically. Check Integrations, then click ‘Sync now’ or review error details.”

Section 2: Activation Funnel
Card title: “Funnel (selected range)”
KPIs displayed as big numbers + conversion rates:
- Ingested reviews: count of Review records created within date range
- Drafted replies: count of DraftReply records created within date range (or linked to reviews in range)
- Approved replies: count of DraftReply where approvedAt is within date range
- Posted replies: count of DraftReply where postedAt/manualPostedAt is within date range
Conversion definitions:
- Draft rate = drafted / ingested
- Approval rate = approved / drafted
- Post rate = posted / approved
Helper text under funnel:
“Response time metrics only count replies that were actually posted. Rejected drafts do not count toward response time.”

Section 3: Response Time + SLA
Card title: “Response time”
KPIs:
- Median response time (minutes): median(postedAt - reviewCreatedAt)
- P90 response time (minutes)
- Negative review SLA compliance: % of negative reviews responded within SLA hours
SLA definition:
- A review is ‘negative’ if rating <= 2 OR sentimentTag = ‘negative’
- SLA hours are set per location (fallback to business default)
- Compliant if postedAt exists AND postedAt <= reviewCreatedAt + SLA

Section 4: Alerts
Card title: “Alerts (selected range)”
KPIs:
- Total alerts sent
- Negative review alerts
- Sync failure alerts
- OCR failure alerts
Table columns:
- Time
- Location
- Type
- Severity
- Recipient(s)
- Status (sent/failed)

Canonical KPI definitions (must match code):
- Ingested: Review.createdAt timestamp (when record was created in the app)
- Drafted: DraftReply.createdAt
- Approved: DraftReply.approvedAt (set only when policy checks pass)
- Posted:
  - If manual posting flow used: DraftReply.manualPostedAt
  - If API posting added later: DraftReply.postedAt
- Response time minutes = (postedTimestamp - Review.reviewCreatedAtFromSourceIfPresentElseReview.createdAt) in minutes
- Avg rating trend: computed from Review.rating grouped by week (source-provided rating)
- Top themes: computed from Review.categoryTags counts (service/price/staff/quality/cleanliness/wait_time/other)

Email/support copy (footer on page):
“Need help setting up syncing or importing reviews? Email agent_bob_replit+review-bot@agentmail.to and include your business name + location. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1”

CSV export description tooltip:
“Exports counts plus underlying rows for the selected range (reviews, drafts, alerts). Use this to audit missing replies or reconcile response-time numbers.”
