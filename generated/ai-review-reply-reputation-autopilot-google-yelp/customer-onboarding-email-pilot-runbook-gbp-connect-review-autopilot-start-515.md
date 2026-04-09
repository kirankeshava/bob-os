# Customer Onboarding Email + Pilot Runbook (GBP Connect + Review Autopilot Start)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:48:53.383Z

---

Subject: Get your reviews on autopilot in 15 minutes (Google + Yelp)

Hi {FirstName},

I’m Bob from AI Review Reply & Reputation Autopilot. We help local businesses respond to Google/Yelp reviews faster, escalate negatives instantly, and send a weekly KPI report.

You can see the app here (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

To get started, reply to this email with:
1) Your business name + best contact
2) Whether you want replies to be “Approve-first” (recommended) or “Auto-draft only”
3) The email(s) that should receive negative-review alerts

Onboarding checklist (10–15 minutes):

A) Connect Google Business Profile (recommended)
1. Log in to the app.
2. Go to Integrations → Google → Connect.
3. Choose the Google account that manages your Google Business Profile.
4. Approve permissions.
5. Select which locations you want synced.

What happens next:
- New reviews sync into your “Draft Queue.”
- Each review gets sentiment + category tags (service/price/staff/etc.).
- A brand-safe draft reply is generated.
- You approve/edit with one click.
- If you’re not using API posting yet, we provide a copy/paste posting step and record an audit trail.

B) Yelp ingestion (fastest reliable options)
Option 1 (recommended): Forward Yelp notification emails to your intake address (we’ll provide a forwarding rule).
Option 2: Upload CSV export (we provide a template).
Option 3: Upload screenshots (OCR import) if email/CSV isn’t available.

C) Set your escalation rules (2 minutes)
- Define what counts as “negative” (e.g., rating ≤ 2 OR sentiment = negative).
- Set alert recipients (owner, manager, shared inbox).
- Optional: set business hours so after-hours alerts route differently.

D) Weekly KPI report (automatic)
Every week you’ll receive a PDF + email summary including:
- Review volume and rating trend
- Response time stats (median/avg)
- Negative share
- Top themes by category
- Per-location breakdown

Pilot runbook (internal execution steps):

1) Before connecting GBP
- Confirm business has admin access to Google Business Profile.
- Confirm locations count (single vs multi-location).
- Confirm desired reply tone (warm/professional, short/long, sign-off name).
- Collect escalation recipients and SLA expectations (e.g., negatives within 2 hours).

2) Connect + initial sync validation (Day 0)
- Connect Google integration.
- Select locations.
- Trigger first sync (cron or manual “sync now”).
- Verify:
  - Reviews are ingested (correct rating, author, text, createdAt).
  - Duplicates are not created across reruns.
  - Edited reviews update rather than duplicating.
  - Drafts are generated only for new/changed reviews.
- Approve 1–3 draft replies and walk through manual posting audit.

3) Alert validation (Day 0)
- Create/identify a negative review in the queue.
- Confirm alert email is delivered to recipients.
- Confirm alert contains: location, rating/sentiment, excerpt, direct link, and SLA guidance.

4) 48-hour stability check (Day 1–2)
- Monitor:
  - Sync health per location (lastSyncAt/lastError)
  - Quota/backoff behavior (no repeated hard failures)
  - Any parsing anomalies (missing author/text)
- Log edge cases:
  - Deleted reviews
  - Replies posted outside the app
  - Duplicate author entries

5) Weekly report verification (End of week)
- Confirm PDF renders correctly in Gmail + Outlook.
- Validate KPI numbers against in-app data.
- Confirm report is branded and includes the right locations.

If you want, I can set this up with you over a quick call—otherwise just reply with the three items above and we’ll get you live.

Best,
Bob Smith
AI Review Reply & Reputation Autopilot
Contact: agent_bob_replit+review-bot@agentmail.to
App: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
