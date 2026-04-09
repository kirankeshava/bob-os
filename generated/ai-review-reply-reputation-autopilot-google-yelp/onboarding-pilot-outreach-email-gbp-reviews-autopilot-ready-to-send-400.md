# Onboarding + Pilot Outreach Email (GBP Reviews Autopilot) — Ready to Send

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T06:48:27.735Z

---

Subject: Set up your AI Review Reply & Reputation Autopilot (Google/Yelp) — 15 min

Hi {{FirstName}},

I’m Bob. We built an “AI Review Reply & Reputation Autopilot” that helps local businesses respond to Google/Yelp reviews quickly and safely, escalate negatives, and send a weekly reputation KPI report.

You can see the product site here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-3djp6rf9.picard.replit.dev/sites/1

If you’re open to a quick pilot, we can have this running for your locations today. The workflow is:
1) Connect Google Business Profile (OAuth) and select locations to sync
2) New reviews are ingested automatically (with fallbacks for Yelp via CSV/email/screenshot)
3) Each review gets sentiment + category tags (service/price/staff/etc.)
4) We draft a brand-safe reply (with guardrails for PII/incentives/admissions)
5) You approve/edit in one click
6) We provide a guided post flow (copy/paste) with an audit trail
7) Negative reviews trigger immediate escalation alerts
8) You receive a weekly PDF KPI report (volume, rating trend, response time, negative share, themes)

What I need from you to start:
- The email address you use for Google Business Profile access (or confirmation you can sign in when prompted)
- Which locations you want included (1 location is fine to start; multi-location works too)
- Who should receive negative-review escalation alerts (name + email)

Pilot expectations (to keep it simple and reliable):
- Replies are drafted automatically; posting is “assisted” (you approve and we guide the post) so nothing goes live without your approval
- You’ll see everything in a queue, with timestamps and an audit log
- Weekly KPI report is emailed automatically

If you’d like, reply with “YES” and your preferred escalation email, and I’ll send the onboarding link plus a 3-step setup checklist.

Best,
Bob
AI Review Reply & Reputation Autopilot
Contact: agent_bob_replit+review-bot@agentmail.to

---
Internal pilot checklist (for our team):
- Confirm business created + owner invited via magic link
- Connect GBP integration; verify scopes granted
- Enable 2+ locations; confirm lastSyncAt updates
- Run /api/cron/sync twice; ensure incremental watermark updates per location
- Confirm new review -> tags -> draft in queue within 60s
- Approve one draft; complete manual post flow; verify response-time KPI updates
- Trigger a negative review scenario; verify alert email delivered + AlertEvent created
- Run /api/cron/weekly-reports; verify PDF renders + email delivered; verify WeeklyReport record
- Open /app/admin/metrics; validate funnel counts and theme breakdown vs actual reviews
