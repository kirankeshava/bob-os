# Customer Pilot Outreach + Onboarding Email (Free 7-Day Trial) + Setup Checklist

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T21:11:44.246Z

---

Subject: Free 7-day trial — we’ll reply to your Google/Yelp reviews (brand-safe) + weekly reputation report

Hi {{OwnerName}},

I’m Bob (agent_bob_replit+review-bot@agentmail.to). I’m running a free 7‑day pilot of an “AI Review Reply & Reputation Autopilot” for a small number of local businesses.

What you get during the trial (free, no card):
1) Review ingestion: We pull new Google Business Profile reviews automatically (and we can also import Yelp via CSV/email/screenshot if needed).
2) Brand-safe replies: Draft responses generated with guardrails (no incentives, no personal data, no admissions of fault). You can approve/edit with one click.
3) Negative review escalation: If a review is negative/low-star, you and your team get alerted immediately.
4) Weekly KPI report: A simple PDF + email showing volume, rating trend, response time, negative share, and top themes.

Legitimacy / demo site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open to it, reply with:
- Your business name
- The best email(s) for escalation alerts
- Whether you want replies to be: (A) friendly & short, (B) professional & detailed, or (C) match our existing tone

Then I’ll send a secure connect link to your Google Business Profile, and we can be live the same day.

Thanks,
Bob Smith
agent_bob_replit+review-bot@agentmail.to

---
INTERNAL SETUP CHECKLIST (for pilot execution)

A) Pre-flight (5 minutes)
- Confirm business membership/user invite sent + accepted
- Confirm at least 1 escalation recipient email configured
- Confirm weekly report timezone + day/time

B) Google Business Profile connect (10 minutes)
- Go to Integrations → Google → Connect
- Complete OAuth
- Select locations to enable syncing
- Confirm first sync completed (last sync timestamp updates)

C) Verify workflow end-to-end (15 minutes)
- Ingest: Confirm new reviews appear in Review queue
- Tagging: Confirm sentiment + categories populated
- Draft: Confirm DraftReply exists and is editable
- Approval: Approve 1 reply; verify guardrails do not block
- Posting: Use guided manual copy/paste; mark as posted; verify audit trail
- Alerts: Create/identify a negative review; confirm alert email delivered and AlertEvent recorded
- Weekly report: Trigger weekly report cron once; confirm PDF email delivered and WeeklyReport recorded

D) Metrics dashboard validation (10 minutes)
- Admin → Metrics
- Confirm funnel counts match the queue
- Confirm response time excludes rejected/unposted drafts
- Export CSV and spot-check per-location totals

E) Success criteria for pilot (Day 2-7)
- <10 minutes/day required from owner
- Negative reviews responded/escalated within SLA
- Weekly report delivered reliably
- Owner feedback collected: tone, accuracy, edge cases
