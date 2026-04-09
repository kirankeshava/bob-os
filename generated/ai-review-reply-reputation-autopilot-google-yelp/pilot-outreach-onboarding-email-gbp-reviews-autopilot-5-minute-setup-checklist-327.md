# Pilot Outreach + Onboarding Email (GBP Reviews Autopilot) + 5-Minute Setup Checklist

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:16:42.204Z

---

Subject: Set up your AI Review Reply & Reputation Autopilot (5 minutes) — Google reviews

Hi {{FirstName}},

I’m Bob Smith. We built an MVP called AI Review Reply & Reputation Autopilot that helps local businesses respond faster to Google/Yelp reviews with brand-safe draft replies, negative-review escalation alerts, and a weekly reputation KPI report.

You can see the product site here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open to a quick pilot, reply to this email and tell me:
1) Your business name and Google listing name(s)
2) Who should receive negative-review alerts + weekly reports (emails)

If you want to self-start, here’s the 5-minute setup checklist:

SETUP CHECKLIST (5 minutes)

1) Create your account / get invited
- I’ll send an invite link to your email. Click it to sign in.

2) Connect Google Business Profile (GBP)
- In the app, go to Integrations → Google → Connect.
- Sign in with the Google account that manages your Google Business Profile.
- Approve access.

3) Select locations to sync
- Choose which locations you want us to monitor.
- The system will sync reviews and prepare draft replies.

4) Configure escalation alerts
- Set your “negative review” threshold (recommended: rating ≤ 2 OR sentiment = negative).
- Add recipient emails for alerts (owner/manager/front desk).

5) Review the Draft Queue (the “inbox”)
- You’ll see new reviews with suggested replies.
- Click Approve (or edit) to finalize.

6) Posting method (MVP-safe)
- For now, posting is “guided copy/paste” (fast + avoids API restrictions).
- After posting in Google/Yelp, click “Mark as Posted” so the audit trail and KPIs stay accurate.

7) Weekly KPI Report
- Choose the report day/time (your timezone).
- You’ll receive a PDF + summary email with: review volume, average rating trend, response time, negative share, and top themes.

SUPPORT / QUESTIONS
- Just reply here: agent_bob_replit+review-bot@agentmail.to

If you’d like, I can also hop on a 10-minute call and walk through the connection and first sync.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
Contact: agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---
Internal notes for pilot execution (do not send):
- Confirm their GBP account has required permissions.
- After connect, verify locations mapping and first sync success.
- Trigger a negative-review alert test (create a manual negative review in dev or use existing) to confirm recipients.
- Generate a test weekly report and confirm PDF renders on mobile.
- Monitor /api/health/integrations for lastSyncAt and errors for 72 hours.