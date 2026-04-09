# Admin Metrics Dashboard — Build Notes + Copy (Ready to Paste)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T19:39:16.116Z

---

Overview
This artifact documents the implemented /app/admin/metrics dashboard and provides the exact KPI definitions and UI copy so the metrics are understandable to a business owner. It also includes the CSV columns and the logic used to compute each metric, ensuring consistency with weekly reports.

Where to find it
- In-app: /app/admin/metrics
- JSON API: /api/admin/metrics?from=YYYY-MM-DD&to=YYYY-MM-DD&locationId=…
- CSV export: /api/admin/metrics.csv?from=…&to=…&locationId=…

Access control
- Only authenticated users with membership in the Business can access the page and endpoints.
- If a user is not a member, return 403 and write an AuditLog entry (“metrics_access_denied”).

Dashboard sections + exact UI copy
1) Sync Health
- Title: “Sync Health”
- Subtitle: “Shows whether Google review syncing is running and up to date for each location.”
- Table columns:
  - Location
  - Integration: “Google Business Profile” (or “Manual/Yelp”)
  - Last Sync: “Last sync at” (Integration.lastSyncAt)
  - Watermark: “Last review updateTime seen” (Location.lastGbpReviewSyncUpdateTime)
  - Status: “OK / Warning / Error”
  - Last Error: Integration.lastError (truncated)
- Status rules (display-only):
  - OK: lastSyncAt within 24h and no lastError
  - Warning: lastSyncAt older than 24h OR there was an error in last 72h
  - Error: lastSyncAt older than 72h OR lastError present and repeated failures AlertEvents exist

2) Funnel KPIs
- Title: “Activation Funnel (Selected Date Range)”
- Helper text: “Tracks how reviews move from ingestion → drafted → approved → posted.”
- Cards:
  - Ingested Reviews: count of Review where createdAt in range
  - Drafted Replies: count of DraftReply where createdAt in range
  - Approved: count of AuditLog actions=approve where createdAt in range
  - Posted: count of DraftReply where postedAt in range OR AuditLog action=mark_posted_manual
- Definitions tooltip copy:
  - “Ingested = reviews imported via Google sync, email forwarding, CSV, or screenshot OCR.”
  - “Drafted = an AI draft reply was generated for the review.”
  - “Approved = a human clicked Approve (or approved after edits).”
  - “Posted = marked as posted (API posting when available or manual copy/paste audit).”

3) Response Time + Reputation
- Title: “Reputation KPIs”
- Metrics:
  - Median Response Time: median(postedAt - Review.createdAt) for posted replies only
  - Negative Share: % of ingested reviews where sentiment=negative OR rating<=2
  - Average Rating: average(Review.rating) for reviews in range (if rating present)
  - Top Themes: top category labels (service/price/staff/quality/cleanliness/wait_time/other) by count
- Exclusions:
  - Response time excludes rejected drafts and reviews never posted.
  - If postedAt is missing but manual posting was recorded, use the manual posted timestamp.

4) Alerts
- Title: “SLA & Escalations”
- Copy: “Counts alerts created by negative reviews, sync failures, and OCR failures.”
- Rows:
  - Negative Review Alerts
  - Google Sync Failure Alerts
  - OCR Failure Alerts
- Each row shows: count in range + most recent timestamp.

CSV export
Filename suggestion: metrics_<businessSlug>_<from>_<to>.csv
Columns:
- from, to, timezone
- locationId, locationName
- ingestedReviews
- draftedReplies
- approvals
- posted
- medianResponseMinutes
- negativeSharePct
- avgRating
- topThemes (pipe-separated, e.g., “service|staff|price”)
- negativeAlerts
- syncFailureAlerts
- ocrFailureAlerts
- lastSyncAt
- lastSyncError

Implementation notes (to keep metrics correct)
- Always filter by Business membership before querying.
- Use locationId filter to switch between per-location rollups and business-wide totals.
- Funnel counts should be computed independently (not derived by subtraction) to avoid skew when backfilled reviews or regenerated drafts exist.
- For response time: prefer DraftReply.postedAt; else fall back to AuditLog event time for action=mark_posted_manual.
- Persist all actions (approve/reject/posted) to AuditLog so metrics remain reconstructable.

Customer-facing explanation (paste into onboarding email if needed)
“Your Metrics dashboard shows (1) whether Google syncing is healthy per location, (2) how many reviews we’ve ingested and drafted responses for, (3) how quickly your team is responding once a review arrives, and (4) whether any negative reviews triggered an escalation. You can export CSV any time for your internal reporting.”

Website + contact (for templates)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Support: agent_bob_replit+review-bot@agentmail.to
