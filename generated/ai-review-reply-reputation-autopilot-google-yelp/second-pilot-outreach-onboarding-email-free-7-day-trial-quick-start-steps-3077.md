# Second-Pilot Outreach + Onboarding Email (Free 7-Day Trial) + Quick Start Steps

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** copy
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T22:20:52.259Z

---

Subject: Free 7‑day trial — we’ll draft your Google/Yelp review replies + weekly reputation report

Hi {{FirstName}},

I’m Bob from AI Review Reply & Reputation Autopilot. We’re running a small free pilot for local businesses to help you respond to Google (and Yelp) reviews faster and more consistently — without spending staff time.

What you get (free for 7 days):
- New reviews are ingested (Google via connect; Yelp via email/CSV/screenshot)
- Each review is auto‑tagged (positive/neutral/negative + topic like staff/service/price)
- Brand‑safe reply drafts are generated with guardrails (no PII, no incentives, no admissions of fault)
- You approve/edit with one click
- Negative reviews trigger escalation alerts (so nothing slips)
- Weekly KPI report (PDF + email): volume, rating trend, response time, negative share, top themes

If you’re open to trying it, here’s the secure app link (live preview):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Reply to this email with:
1) Your business name
2) The best email(s) to receive alerts/reports
3) Whether you want Google only or Google + Yelp

And I’ll get you onboarded the same day.

— Bob
agent_bob_replit+review-bot@agentmail.to

------------------------------
QUICK START (for the pilot)

1) Create your login / get invited
- I’ll send you a magic-link invite to access your dashboard.

2) Connect Google Business Profile (recommended)
- In the app: Integrations → Google → Connect
- Choose the location(s) you want to sync.
- Reviews will start syncing automatically; you’ll see them appear in the Review Queue.

3) Add Yelp (choose one)
A) Forward Yelp notification emails
- Forward Yelp “New review” emails to: agent_bob_replit+review-bot@agentmail.to
- The system will parse rating/text/link and create a review record.

B) Import Yelp CSV
- In the app: Reviews → Import → Yelp CSV
- Upload your CSV and confirm the mapping.

C) Screenshot OCR (fast fallback)
- In the app: Reviews → Import → Screenshot
- Upload a screenshot of the review; confirm extracted fields if needed.

4) Approve replies
- Go to Reviews → Queue
- Open a review, edit if needed, then click Approve.
- If API posting isn’t available for that platform, the app provides guided copy/paste and records an audit trail (timestamp + who posted).

5) Negative review escalation
- In Admin → Escalation Rules, set:
  - Negative criteria (e.g., rating ≤ 2 and/or sentiment=negative)
  - Alert recipients (owner/manager emails)
- Alerts are sent immediately when a matching review arrives.

6) Weekly report
- You’ll receive a weekly PDF report by email with KPIs and top themes.
- You can also view metrics in-app: Admin → Metrics (sync health + funnel + alerts).

PILOT SUCCESS CRITERIA (what we’ll confirm during the week)
- Sync reliability (no missed reviews, stable cron runs)
- Draft quality + policy safety
- Response-time improvement (drafts ready quickly; approvals easy)
- Visibility via weekly report + metrics dashboard

If you want to proceed, reply with the 3 items above and I’ll send your invite.