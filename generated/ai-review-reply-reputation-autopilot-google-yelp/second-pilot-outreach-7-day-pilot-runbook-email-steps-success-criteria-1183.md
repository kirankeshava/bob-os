# Second Pilot Outreach + 7-Day Pilot Runbook (Email + Steps + Success Criteria)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T13:12:42.464Z

---

Below is a ready-to-send pilot outreach email plus a 7-day pilot runbook to onboard 1–2 local businesses and validate the MVP in production.

---
SUBJECT OPTIONS
1) “We’ll reply to your Google reviews for you (pilot—free setup)” 
2) “Improve review response time in 7 days—can we test with your business?”
3) “Quick pilot: brand-safe AI replies for Google/Yelp reviews (you approve)”

EMAIL (SEND FROM: agent_bob_replit+review-bot@agentmail.to)
Hi {{FirstName}},

I’m Bob. I’m running a small pilot for an “AI Review Reply & Reputation Autopilot” that helps local businesses respond to Google (and Yelp) reviews faster—without losing brand voice.

How it works:
• We ingest your new reviews (Google Business Profile integration; Yelp via email/CSV/screenshot if needed)
• The system drafts brand-safe replies (no incentives, no PII, no admissions of fault)
• You approve/edit in one click, then we provide a guided post flow (and audit trail)
• Negative reviews trigger escalation alerts and we send a weekly KPI report (rating trend, response time, top themes)

I’d like to run a 7-day pilot with {{BusinessName}}. Setup takes ~15 minutes.

Proof / product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you’re open to it, reply with:
1) Best email for alerts + weekly report
2) Your preferred reply tone (friendly/professional/short)
3) Any “must-avoid” phrases

—Bob
agent_bob_replit+review-bot@agentmail.to

---
7-DAY PILOT RUNBOOK (INTERNAL)

Goal: Prove measurable operational value (faster responses + fewer missed negatives) and produce an executive weekly KPI report that the owner cares about.

Day 0 (Prep)
1) Choose pilot vertical (best: restaurants, dentists, med spas, home services). They care about ratings and have frequent reviews.
2) Create Business + user invite in admin.
3) Prepare escalation recipients (owner + manager).

Day 1 (Onboarding, 15–30 min)
1) Have owner log in via magic link.
2) Connect Google Business Profile integration.
3) Select locations to enable sync.
4) Configure negative thresholds:
   • Escalate if rating <= 2 OR sentiment=negative
   • Recipients: owner + ops manager
5) Set brand voice:
   • Tone (friendly/professional)
   • Signature line
   • Policies: no discounts, no legal admissions, no medical/financial claims

Day 2 (Baseline + first approvals)
1) Run cron sync or manual sync; verify “last sync < 1h”.
2) Ensure new reviews appear in queue.
3) Approve/edit the first 5–10 drafted replies.
4) Use guided copy/paste posting to create audit trail (postedAt).

Day 3–4 (SLA + escalation validation)
1) Confirm negative review alert fires (use a historical negative review if available).
2) Confirm escalations go to correct recipients.
3) Validate guardrails: PII redaction and banned-phrase block should prevent risky approvals.

Day 5 (Operational habit)
1) Target operating rhythm:
   • Owner spends 5 minutes/day approving replies.
   • Negative reviews: same-day response.
2) Check metrics dashboard:
   • Funnel: ingested → drafted → approved → posted
   • Median response time trending down

Day 6 (Report quality check)
1) Generate weekly report preview; confirm tables are correct:
   • Volume
   • Avg rating trend
   • Negative share
   • Response time
   • Top themes
2) Ensure email renders in Gmail mobile + desktop.

Day 7 (Success review + conversion)
Success criteria (hit at least 2 of 3):
1) Response time improved by ≥50% vs baseline week (or median < 24h)
2) 0 negative reviews left un-escalated beyond SLA
3) Owner reports “time saved” and wants it to continue

Close / conversion questions:
• “Do you want replies drafted + queued daily going forward?”
• “Who else should receive escalations/reports?”
• “Which locations should be included?”

Data to capture for case study (with permission):
• Before/after response time
• Review volume
• Examples of safe replies
• Weekly report screenshot/PDF

---
NOTES
• If GBP API posting is not available, keep guided copy/paste with audit trail as the reliable default.
• If Yelp ingestion is weak, prioritize email forwarding of Yelp notifications or screenshot OCR + confirm.
• Use the metrics dashboard as the operator control panel: if last sync is stale or posting is lagging, fix that before adding features.
