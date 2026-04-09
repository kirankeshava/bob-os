# Pilot Onboarding Email + Checklist (Use for 2nd Pilot) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T16:19:56.288Z

---

Subject: Set up your Review Reply Autopilot (Google/Yelp) — 10 minutes

Hi {{first_name}},

I’m Bob from AI Review Reply & Reputation Autopilot. We help local businesses respond to Google/Yelp reviews quickly and safely (drafts + approval), escalate negatives fast, and send a weekly KPI report.

You can view the product site here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Support/contact email (goes directly to our inbox):
agent_bob_replit+review-bot@agentmail.to

If you’d like to pilot it this week, here’s the quickest setup:

1) Connect Google Business Profile (preferred)
- In the app: Integrations → Google → Connect
- Sign in to the Google account that manages your locations
- Select the locations you want synced
- We’ll automatically pull in new reviews and draft replies

2) Yelp (if you want it)
- Option A: Forward Yelp review notification emails to the ingestion address shown in the app
- Option B: Import CSV (we provide a template)
- Option C: Upload a screenshot (OCR import) and confirm fields

3) Choose escalation rules
- Set what counts as “negative” (e.g., rating ≤ 2 or sentiment=negative)
- Add who should be emailed immediately (owner/manager)

4) Approve replies
- Open Reviews → Draft Queue
- Edit if needed → Approve
- Post via the guided copy/paste step (until API posting is enabled for your account)

5) Weekly KPI report
- Pick your report day + timezone
- You’ll get a PDF + email summary: review volume, avg rating trend, response time, negative share, and top themes

What we need from you for the pilot:
- A contact name + best email(s) for escalation alerts
- Confirmation of which locations to include
- Your preferred response tone (friendly/professional/concise) and any “do-not-say” phrases

If you reply with: (1) your business name, (2) which platform(s) you want first (Google, Yelp, or both), and (3) the escalation email list, I can get you live same day.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to

---

Pilot onboarding checklist (internal)

A. Business setup
- [ ] Create Business record + add primary contact email
- [ ] Add at least one Location (or sync from Google)
- [ ] Invite owner user via magic link

B. Google Business Profile integration
- [ ] OAuth connect successful; tokens stored; scopes verified
- [ ] Locations discovered; user selected enabled locations
- [ ] Cron sync endpoint run once manually; confirm new Review rows created
- [ ] Confirm per-location watermark updates after sync

C. Yelp ingestion (choose one)
- [ ] Email forward parsing: send a sample Yelp notification; verify parse fields
- [ ] CSV import: import 5–20 rows; validate dedupe and dates
- [ ] Screenshot OCR: upload 2 screenshots; confirm extraction + manual confirm flow

D. Drafting + guardrails
- [ ] Tagging completed: sentiment + category labels present
- [ ] DraftReply generated for each new review
- [ ] Attempt approval of a draft with PII/incentive phrasing; ensure approval is blocked and audit logged

E. Alerts
- [ ] Configure escalation threshold (rating ≤2 or sentiment negative)
- [ ] Trigger a test negative review (manual import) and verify alert email delivered
- [ ] Verify AlertEvent persisted and visible in dashboard

F. Posting + audit
- [ ] Approve one draft and mark as posted (manual guided step)
- [ ] Verify postedAt + postedByUserId + AuditLog entry

G. Weekly report
- [ ] Set timezone and weekday
- [ ] Trigger /api/cron/weekly-reports manually; verify PDF email delivered
- [ ] Verify WeeklyReport record created and metrics look correct

H. Metrics dashboard validation
- [ ] /app/admin/metrics loads for owner user (RBAC)
- [ ] Date-range filter changes results; location filter works
- [ ] CSV export downloads and matches on-screen totals

Success criteria for pilot
- [ ] New reviews ingested within SLA window
- [ ] Negatives trigger alert within minutes of sync/ingest
- [ ] Draft queue used daily; at least 10 approved replies posted
- [ ] Weekly KPI report received and understood by owner