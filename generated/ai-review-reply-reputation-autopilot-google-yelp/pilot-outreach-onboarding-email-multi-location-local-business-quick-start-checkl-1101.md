# Pilot Outreach + Onboarding Email (Multi-location Local Business) + Quick Start Checklist

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T12:34:35.878Z

---

Subject: Set up your Review Reply & Reputation Autopilot (Google/Yelp) — 10 minutes

Hi {{FirstName}},

I’m Bob from AI Review Reply & Reputation Autopilot. We help local businesses respond faster to Google/Yelp reviews with brand-safe drafted replies, negative-review escalation alerts, and a weekly KPI report.

You can see the app here (legitimacy/preview link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open to a quick pilot, we can get you live in ~10 minutes. Reply to this email with:
1) Your business name
2) The best email(s) to receive negative-review alerts and weekly reports
3) Whether you have multiple locations we should track separately

Pilot onboarding steps (what we’ll do together):

A) Connect Google Business Profile
- You’ll click “Connect Google” in the Integrations screen.
- Sign in with the Google account that manages your Google Business Profile.
- Select the location(s) you want us to sync.

B) Choose your response workflow
- Reviews are ingested and tagged (positive/neutral/negative + themes like staff/service/price).
- The system drafts a brand-safe reply.
- You approve/edit with one click.
- Posting is either (1) via API when allowed, or (2) guided copy/paste with an audit trail (so nothing posts without your approval).

C) Set escalation rules (recommended)
- Any review with rating ≤2 or sentiment=negative can trigger an alert.
- Alerts go to the emails you choose (owner/manager/front desk).
- We’ll also track SLA (time-to-first-response) so nothing sits unattended.

D) Weekly KPI report
- Every week you’ll receive a PDF + email summary showing: review volume, average rating trend, negative share, response time, and top themes by location.

What you’ll see immediately after connecting:
- Your last synced time per location (sync health)
- A queue of reviews with drafts ready for approval
- A Metrics dashboard: ingested→drafted→approved→posted funnel, response-time percentiles, and alert volume

Security / safety notes
- Drafts are generated with guardrails (no incentives, no admissions of fault, no PII). If a draft violates policy, approval is blocked and you’ll see why.
- All actions are logged (who approved/edited/marked posted).

If you’d like to proceed, reply here and I’ll send a short magic-link invite and the onboarding steps.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
Contact: agent_bob_replit+review-bot@agentmail.to
App: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

Quick Start Checklist (internal)

Goal: Validate MVP on a real, multi-location GBP for 48 hours.

1) Business setup
- Create Business record
- Invite owner via magic link
- Add escalation recipients (owner + manager)
- Confirm timezone and weekly report send day/time

2) Google integration
- Connect OAuth
- Select locations
- Verify each Location has gbpLocationId set

3) Ingestion verification
- Trigger /api/cron/sync manually once
- Confirm reviews appear (new and updated)
- Confirm raw payload saved

4) Draft workflow verification
- Ensure tagging ran (sentiment + categories)
- Ensure draft generated for each new review
- Approve/edit at least 3 drafts (1 positive, 1 neutral, 1 negative)
- Use manual posting audit step for at least 1 review

5) Alerts + SLA
- Confirm negative review triggers email alert
- Confirm alert recipient routing is correct
- Confirm alert events logged

6) Weekly report
- Trigger /api/cron/weekly-reports once for the business
- Verify PDF renders correctly and email is readable on mobile

7) Metrics dashboard
- Validate funnel counts align with reality
- Validate response-time calculation excludes rejected/unposted
- Export CSV and spot-check

8) Reliability watch
- Monitor sync lastError/lastSyncAt per location
- Ensure backoff is working (no repeated hammering)
- Capture edge cases: edited reviews, deleted reviews, duplicate author/text, pagination
