# Pilot Outreach + Onboarding Email (GBP Reviews Autopilot) + 15‑Minute Setup Script

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:28:16.953Z

---

Subject: Can we manage your Google reviews for you (draft + approval + weekly report) — free pilot?

Hi {{FirstName}},

I’m Bob from AI Review Reply & Reputation Autopilot. We help local businesses respond to Google (and Yelp) reviews quickly, consistently, and brand-safely—without you spending time writing replies.

What you get in the pilot:
• Automatic review ingestion (Google Business Profile)
• Sentiment + topic tagging (service/price/staff/etc.)
• Drafted replies queued for your approval (one-click approve/edit)
• Negative-review escalation alerts (so nothing slips)
• Weekly KPI report (PDF + email): volume, rating trend, response time, negative share, and themes

This is a functional MVP we’re piloting with a few businesses now. You can see the app here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

If you’re open to it, reply with “yes” and the best email to send an invite to (or just use this one). We’ll set you up and you can start approving responses the same day.

Pilot expectations (simple):
• 15 minutes to connect your Google Business Profile
• 3–5 days of real usage (approve a few replies)
• Quick feedback on what would make this a ‘must-have’

If you’d rather not connect accounts yet, we can start with a zero-integration flow: forward review notification emails or upload a CSV/screenshot and we’ll still generate approval-ready replies.

Best,
Bob Smith
AI Review Reply & Reputation Autopilot
Contact: agent_bob_replit+review-bot@agentmail.to

---

15-Minute Setup Script (for the pilot call or async instructions)

1) Invite + Login
- I send an invite to your email.
- You click the magic link to log in.

2) Connect Google Business Profile (preferred ingestion)
- Go to Integrations → Google → Connect.
- Sign in with the Google account that manages your Business Profile.
- Select the locations you want to sync.

3) Configure escalation + SLA
- Go to Admin → Escalation.
- Add recipients (owner/manager emails).
- Set “Negative” as rating ≤2 and/or sentiment=negative.
- Confirm alert email address.

4) Confirm first sync + draft queue
- Go to Reviews → Queue.
- You should see imported reviews (or they’ll appear on the next scheduled sync).
- Open a review → edit if desired → Approve.

5) Posting workflow (fastest reliable path)
- The app shows a guided copy/paste step (until API posting is enabled).
- Paste into Google reply box and mark “Posted” in the app to keep the audit trail and response-time KPI accurate.

6) Weekly report
- Go to Admin → Metrics / Reports.
- Confirm your report recipients and timezone.
- You’ll receive a weekly PDF summary email.

Troubleshooting / fallback ingestion
- If Google connect isn’t possible, forward review notification emails to agent_bob_replit+review-bot@agentmail.to or upload a CSV/screenshot in Reviews → Import. The system will still tag + draft + alert + report.

Success criteria for the pilot
- Reviews ingested within 24 hours
- Negative reviews trigger an alert
- Drafts generated and approved within SLA
- Weekly report arrives and matches what you see in Google

Reply to this email (agent_bob_replit+review-bot@agentmail.to) with:
- Business name
- Locations count
- Preferred escalation recipients
- Whether you want replies in “Friendly”, “Professional”, or “Concise” tone
and we’ll start onboarding.