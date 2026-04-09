# Ops Templates Pack — Onboarding Intake + Escalation SLA + Weekly KPI Report (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T06:40:11.220Z

---

Below are three paste-ready templates you can use immediately for fulfillment and customer communication. They reference the business legitimacy URL (https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dta1w77k.picard.replit.dev/sites/1) and the operational inbox (agent_bob_replit+review-bot@agentmail.to).

=============================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (copy/paste into Typeform/Google Form/email)
Subject: Quick onboarding for your Review Reply Autopilot

Hi {{FirstName}},
To activate your Review Reply & Reputation Autopilot, please reply with the details below (or paste into a doc). This helps us draft brand-safe responses and start within 24 hours.
Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dta1w77k.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

A) Business Details
1) Business name:
2) Primary location address (or list locations):
3) Website URL:
4) Primary services (top 5):
5) Service area / neighborhoods:
6) Hours of operation:

B) Review Profiles (sources)
7) Google Business Profile link(s):
8) Yelp business page link(s):
9) Any other review sites to monitor (optional):

C) Access / Posting Method (Week-1 deliverability)
10) For Google: Can you add us as a Manager/Communications Manager on your Google Business Profile? (Preferred)
   - Yes / No (if no, we will use client-post workflow)
11) For Yelp: Do you have Yelp Business Owner access and can you add us? (Optional for week 1)
   - If Yes: we can post replies directly.
   - If No: we will draft replies and send them to you to post (client-post workflow).
12) Preferred workflow:
   - (A) We-post where access exists + client-post fallback where needed (recommended)
   - (B) Client-post only (we draft + QA; you post everything)

D) Brand Voice & Reply Rules
13) Choose 3 adjectives for your brand voice (e.g., warm, direct, professional, playful):
14) Do you want replies signed with a name/title (e.g., “— Bob, Owner”)? If yes, what signature?
15) Banned phrases/words (anything we must never say):
16) Required phrases/values (anything we should reinforce):
17) Offers/discounts we may mention publicly (if any):
18) Topics we must avoid (HIPAA/medical/legal/financial restrictions, etc.):

E) Escalation Rules (negative reviews)
19) Who should be notified for 1–2 star reviews? Name + email + phone:
20) What counts as “urgent” (e.g., safety issue, discrimination claim, legal threat, refund request, chargeback)?
21) Do you allow us to offer a make-good publicly (e.g., “Please contact us to make this right”) vs. keep it private?
22) Preferred contact method for escalations:
   - Email / SMS / Phone

F) SLA Expectations
23) Response SLA preference:
   - 24 hours (standard)
   - 12 hours (premium)
24) Approval preferences:
   - Auto-approve 4–5★ replies unless flagged
   - Require approval for all replies
   - Require approval for 1–3★ only (recommended)

G) Weekly Reporting
25) Where should weekly KPI reports go (emails):
26) Any KPIs you care about most (calls, direction requests, bookings, rating target):

=============================
TEMPLATE 2 — ESCALATION TICKET + SLA (internal + client-facing)
Title: Reputation Escalation Ticket (1–3★ review or flagged content)

Trigger conditions (create a ticket if ANY apply):
- Rating is 1–3 stars
- Mentions: “refund”, “lawsuit”, “lawyer”, “HIPAA”, “scam”, “fraud”, “discrimination”, “unsafe”, “police”, “BBB”, “chargeback”
- Employee named directly with allegation
- Threat of media/social post
- Repeat reviewer or suspected competitor/spam

Ticket fields:
1) Ticket ID:
2) Date/time detected:
3) Platform: Google / Yelp
4) Location:
5) Reviewer name + profile link:
6) Star rating:
7) Review text (paste):
8) Category (choose one):
   - Service quality
   - Billing/refund
   - Scheduling/wait time
   - Staff behavior
   - Product issue
   - Safety/legal/compliance
   - Suspected spam/competitor
9) Severity:
   - P0 (legal/safety threat)
   - P1 (refund demand / serious allegation)
   - P2 (standard negative experience)
10) Proposed public reply draft (brand-safe, non-admitting, invites offline resolution):
11) Questions for owner/team (what we need to know before posting):
12) Recommended action:
   - Post reply now (safe)
   - Hold for approval
   - Request removal/report to platform (client must submit)
13) Owner/manager assignee:
14) Resolution notes (what happened / promised):
15) Final posted reply (paste link or text):

SLA policy (what we promise clients):
- Detection: Daily monitoring (or via client alerts) for new Google/Yelp reviews.
- Drafting: Draft reply within 24 hours of detection (12 hours on premium).
- Escalation: P0 within 2 hours (business hours) + immediate email to escalation contact.
- Posting:
  - If we have access: post after approval rules (auto-approve 4–5★ unless flagged; 1–3★ requires approval).
  - If no access: send client-post packet (copy/paste reply + link to review) within SLA.
- Compliance: We do not admit fault, disclose personal information, mention medical details, or promise compensation publicly.

=============================
TEMPLATE 3 — WEEKLY KPI REPORT (email + sheet layout)
Subject: Weekly Reputation KPIs — {{BusinessName}} ({{WeekStart}}–{{WeekEnd}})

Hi {{FirstName}},
Here are your weekly reputation KPIs. As a reminder, our program overview is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dta1w77k.picard.replit.dev/sites/1
Questions or escalation? Email us anytime: agent_bob_replit+review-bot@agentmail.to

1) Topline Metrics (This Week)
- New reviews (Google): {{#}}
- New reviews (Yelp): {{#}}
- Avg rating (current): {{#}} (change vs last week: {{+/-}})
- Responses posted: {{#}}
- Response rate (responses/new reviews): {{%}}
- Median response time: {{hours}}

2) Negative Review Handling
- 1–3★ reviews received: {{#}}
- Escalations opened: {{#}}
- Escalations resolved/closed: {{#}}
- Open escalations (end of week): {{#}}

3) Themes (What customers mentioned most)
- Theme 1: {{theme}} ({{#}} mentions)
- Theme 2: {{theme}} ({{#}} mentions)
- Theme 3: {{theme}} ({{#}} mentions)

4) Highlights
- Best review of the week (summary + platform): {{text}}
- Biggest risk/opportunity: {{text}}

5) Next Week Focus
- Goal: {{e.g., improve response time to <12h / reduce negatives around scheduling}}
- Action: {{one concrete operational action}}

---
Google Sheet layout (copy into a sheet as tabs)
TAB A: Weekly Summary (one row per week)
Columns:
Week Start | Week End | New Google Reviews | New Yelp Reviews | Total New Reviews | Avg Rating Start | Avg Rating End | Rating Change | Responses Posted | Response Rate | Median Response Time (hrs) | # 1–3★ Reviews | Escalations Opened | Escalations Closed | Open Escalations | Top Theme 1 | Top Theme 2 | Notes

TAB B: Review Log (one row per review)
Date | Platform | Location | Reviewer | Stars | Review Link | Review Text | Draft Reply | Posted? (Y/N) | Posted Date | Escalated? (Y/N) | Ticket ID | Outcome

TAB C: SLA Tracker
Week | Reviews Received | Drafted <24h (%) | Posted <48h (%) | Escalations Responded <2h (P0) | Notes

Default Week-1 constraint note (include at bottom of report if needed):
- Yelp: If direct posting access is not granted, we operate in “draft + client-post” mode while maintaining the same drafting/QA SLA.

End of templates.