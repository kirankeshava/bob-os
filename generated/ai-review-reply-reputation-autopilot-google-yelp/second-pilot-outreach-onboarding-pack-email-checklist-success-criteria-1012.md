# Second-Pilot Outreach + Onboarding Pack (Email + Checklist + Success Criteria)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:54:31.336Z

---

Subject: Set up your AI Review Reply & Reputation Autopilot (Google/Yelp) — 15 min onboarding

Hi {{FirstName}},

I’m Bob from AI Review Reply & Reputation Autopilot. We help local businesses respond faster to Google/Yelp reviews with brand-safe drafts, negative-review escalation alerts, and a weekly reputation KPI report.

If you’re open to a short pilot, here’s what we’ll do:
1) Connect your Google Business Profile (OAuth) so we can ingest new reviews automatically.
2) Draft replies for every new review (you approve/edit in one click).
3) Escalate negative reviews instantly to the right person via email.
4) Send a weekly KPI report (PDF + email) showing review volume, rating trend, response time, negative share, and top themes.

To verify legitimacy and see the app: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Reply with:
- The best email(s) to receive negative-review alerts
- Which locations you want included (if you have multiple)
- The day/time you want the weekly report sent + your timezone

Or book a 15-minute setup call by replying with 2 times that work.

Best,
Bob
agent_bob_replit+review-bot@agentmail.to

---
PILOT ONBOARDING CHECKLIST (Operator SOP)

Goal: Fully onboard a real business and validate end-to-end automation (ingest → tag → draft → approve → post (manual guided) → escalation → weekly report), including multi-location stability.

A) Pre-flight (5 minutes)
1. Confirm business member access exists (invite user via email magic link).
2. In Admin → Businesses: confirm business name, timezone, weekly report schedule.
3. In Admin → Escalation: set negative threshold (rating <=2 OR sentiment=negative) and recipients.
4. Confirm deliverability: send a test email to recipients from within the app (alert test).

B) Google Business Profile Connect (5–10 minutes)
1. Navigate to Integrations → Google → Connect.
2. Complete OAuth with the Google account that manages GBP.
3. Select locations to enable syncing.
4. Confirm each enabled location shows lastSyncAt and no lastError.

C) Initial Sync Validation (10 minutes)
1. Trigger cron sync (or run manual sync button if present) and verify:
   - Reviews created/upserted (no duplicates) with raw payload retained.
   - Tagging completed: sentiment + categories present.
   - DraftReply created for new reviews.
2. Verify review update handling:
   - If a review is edited in GBP, ensure upsert updates text/updateTime and re-queues tagging/draft as needed.
3. Verify pagination:
   - For a location with many reviews, confirm all pages fetch without errors.

D) Approval + Posting Workflow (10 minutes)
1. Go to Reviews Queue and filter for new drafts.
2. Open a review, edit draft, and click Approve.
3. Confirm guardrails:
   - Attempt to add a phone number or incentive language; approval should be blocked and logged.
4. Use the guided manual posting flow:
   - Copy response, mark as posted, ensure posted timestamp and actor captured.

E) Negative Review Escalation (10 minutes)
1. Import or wait for a negative review (rating <= 2).
2. Confirm AlertEvent created and escalation email delivered.
3. Confirm SLA expectations:
   - Negative review appears in dashboard and queue with “urgent” flag.

F) Weekly Report Verification (10 minutes)
1. Trigger weekly report generation.
2. Confirm PDF renders, includes:
   - Volume, avg rating trend, response times, negative share
   - Top themes/categories
   - Per-location breakdown
3. Confirm email looks good on mobile and desktop (Gmail + Outlook).

---
SUCCESS CRITERIA (What “Pilot Passed” Means)

Reliability
- Cron sync runs for 48 hours without unhandled errors.
- No missed reviews: compare GBP UI vs ingested count during the window.
- Multi-location: each location maintains its own watermark and lastSyncAt.

Quality & Safety
- 95%+ drafts are usable with minimal edits.
- Guardrails block PII/incentives/admissions-of-fault and log reasons.
- Negative reviews escalate within 2 minutes of ingestion.

Business Value
- Median time-to-first-response decreases vs baseline (even with manual posting).
- Weekly report delivered on schedule with actionable insights.

---
If you want to invite a business owner, send them the app link above and have them reply to agent_bob_replit+review-bot@agentmail.to with their preferred alert recipients + report schedule. Once they connect GBP, everything else is automated.
