# Second Pilot Onboarding Email + Setup Checklist (Google Business Profile) — Ready to Send

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T08:56:39.827Z

---

Subject: Set up your AI Review Reply & Reputation Autopilot (Google/Yelp) in 10 minutes

Hi {{FirstName}},

I’m Bob from AI Review Reply & Reputation Autopilot. This is the short setup to start drafting (and optionally posting) brand-safe replies to your Google reviews, escalating negatives, and sending a weekly KPI report.

Dashboard / legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support / contact: agent_bob_replit+review-bot@agentmail.to

What you’ll get once connected
1) New reviews automatically ingested from Google Business Profile (GBP)
2) Sentiment + category tagging (service/price/staff/etc.)
3) Draft reply queue with safety guardrails + your approval
4) Negative-review SLA alerts (email escalation)
5) Weekly KPI report (PDF + email): volume, avg rating trend, response time, negative share, top themes

Step-by-step setup (Google)
1) Create your login
   - I’ll send you a magic link invite. Click it to create access.

2) Connect Google Business Profile
   - In the app: Integrations → Google → Connect
   - Sign in with the Google account that manages your Business Profile.
   - Approve requested permissions.

3) Select locations to sync
   - You’ll see a list of locations from Google.
   - Toggle ON the locations you want to manage first.

4) Set negative-review escalation
   - Admin → Escalation
   - Confirm who should be alerted (owner/manager emails)
   - Default trigger: rating ≤ 2 OR sentiment = negative

5) Start approving replies
   - Reviews → Queue
   - Open a review → edit draft if needed → Approve
   - Posting options:
     - If API posting is enabled for your account: the system can post automatically.
     - Otherwise: use “Copy & Mark Posted” (guided copy/paste with an audit trail).

Optional: import additional reviews (Yelp or older history)
- CSV import: Reviews → Import → CSV
- Screenshot import (OCR): Reviews → Import → Screenshot (upload a screenshot; confirm extracted text)
- Forward notification emails: forward review notification emails to your assigned inbound address (we’ll provide this per account), and the system will ingest them.

Pilot success criteria (what we’ll verify together)
- Reviews sync every day via cron without missing updates
- Drafts are generated within minutes of ingestion
- Negative reviews trigger an alert within the SLA window
- Weekly report arrives on schedule and matches what you see in Google

If you’d like, reply with:
- Your preferred escalation recipients (emails)
- Your brand voice (friendly/professional/short/empathetic)
- Any phrases you never want used

Once you reply, I’ll send your invite link and we can complete setup the same day.

Thanks,
Bob
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---
Internal pilot run checklist (operator only)
- Confirm business timezone + weekly report schedule configured
- Connect GBP integration; select 2+ locations
- Force a manual /api/cron/sync run; verify lastSyncAt + per-location watermark updates
- Verify new Review rows created with gbpReviewId; raw payload stored
- Confirm tagging + draft generation jobs ran; DraftReply.status = DRAFT
- Approve 1 positive + 1 negative draft; ensure guardrails block PII/incentives
- Mark posted (manual) and confirm response-time KPI updates
- Trigger a negative review alert (or simulate) and confirm AlertEvent stored + email delivered
- Run /api/cron/weekly-reports; verify PDF renders, email body mobile-friendly, KPIs correct
- Check /app/admin/metrics for funnel counts and sync health; export CSV for record
