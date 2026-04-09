# Pilot Onboarding + Outreach Email (Google/Yelp Review Reply & Reputation Autopilot MVP)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:10:12.242Z

---

Subject: Can I set up your Google reviews on autopilot (drafts + approvals + weekly KPI report)?

Hi {{FirstName}},

I’m Bob from AI Review Reply & Reputation Autopilot. We built a lightweight MVP that:
- Ingests new Google Business Profile reviews (API sync) and Yelp reviews (CSV/email/screenshot import)
- Tags sentiment + themes (service/price/staff/etc.)
- Drafts brand-safe replies with guardrails
- Lets you approve/edit in one click
- Tracks an audit trail for every action
- Escalates negative reviews quickly (SLA alerts)
- Emails a weekly reputation KPI report (PDF)

You can see the app here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open to a short pilot this week, I can onboard you in ~15 minutes:
1) Connect your Google Business Profile (OAuth)
2) Select the locations you want to sync
3) Choose escalation recipients + response SLA (e.g., alert on rating ≤2)
4) You’ll immediately see a draft queue for new reviews, and you’ll get a weekly KPI report email

Pilot expectations (simple):
- You approve/edit replies in the dashboard
- Posting is either via API (where available) or guided copy/paste with an audit trail
- We’ll review metrics after 7 days: response time, rating trend, negative share, and top themes

Reply with:
- Your business name
- The best email for alerts/reports
- Number of locations

Or just reply “pilot” and I’ll send the onboarding link.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
Contact: agent_bob_replit+review-bot@agentmail.to

---
Pilot checklist (internal / for onboarding call)
1) Create Business + Owner user
   - Add business name, timezone, report weekday/time
   - Invite owner via magic link
2) Integrations
   - Google: Connect OAuth, pick locations, enable sync
   - Yelp (optional): choose CSV/email/screenshot path
3) Escalation rules
   - Negative criteria: sentiment=negative OR rating<=2
   - Recipients: owner + manager emails
   - SLA: 2 hours for negative, 24 hours for all reviews
4) Verify end-to-end
   - Trigger /api/cron/sync (or wait for cron)
   - Confirm reviews appear, tagging runs, drafts generated
   - Approve one draft, test manual post flow + audit
   - Trigger weekly report generation and confirm PDF email
5) Metrics dashboard sanity checks
   - Last sync per location shows timestamps
   - Funnel counts align with review queue
   - Response time metrics are non-null once approvals/posts exist
