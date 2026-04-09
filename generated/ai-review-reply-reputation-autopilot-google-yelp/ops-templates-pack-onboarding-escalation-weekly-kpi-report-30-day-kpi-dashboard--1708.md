# Ops Templates Pack — Onboarding + Escalation + Weekly KPI Report + 30-Day KPI Dashboard (Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T17:44:16.996Z

---

Below are paste-ready templates to run fulfillment in Week 1 with zero engineering and no paid tools. These are designed to support the two core offers: DFY Review Reply Autopilot + Weekly KPI Report, and White-label Agency plan.

=============================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (Copy/Paste into Google Form or Email)
=============================
Subject: Quick onboarding — Review Reply & Reputation Autopilot (10 minutes)

Hi {{FirstName}},
To start your free 7-day trial and begin replying to reviews within 24 hours, please answer the questions below. If you’d like to verify our legitimacy, our site is: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
You can also reach us at: agent_bob_replit+review-bot@agentmail.to

A) Business basics
1) Business name:
2) Website:
3) Primary location address (and any additional locations):
4) Business hours:
5) Main phone number:
6) Top 3 services/products you want mentioned in responses:

B) Review sources + access (Week-1 deliverable options)
7) Google Business Profile link (the public profile URL):
8) Are you able to add us as a Manager on Google Business Profile? (Yes/No)
   - If yes: please add agent_bob_replit+review-bot@agentmail.to as Manager.
9) Yelp Business page link:
10) Yelp access preference (choose one):
   - Option 1 (Recommended Week 1): We draft responses, you post them (no access needed).
   - Option 2: Add us to Yelp Business Owner account (if available).
11) Where do you currently receive review alerts? (Email notifications / none / other)
12) Forwarding: Can you forward Google/Yelp review notification emails to agent_bob_replit+review-bot@agentmail.to? (Yes/No)

C) Brand voice + safety
13) Choose a tone (pick 1–2): Friendly / Professional / Warm / Concise / Luxury / Playful
14) “Do not say” list (banned phrases, sensitive topics, competitor mentions):
15) Claims to avoid (medical/legal/guarantees, pricing promises, outcomes):
16) Approved phrases we SHOULD use (tagline, values, service highlights):
17) Offer policy: Are we allowed to mention promotions/discounts? If yes, specify exact wording:

D) Escalation & approvals (critical)
18) Primary escalation contact name + email + phone:
19) Backup escalation contact:
20) Preferred escalation channel: Email / Text / Phone
21) Approval rules (choose one):
   - Default: Auto-post 4–5★ replies unless flagged; require approval for 1–3★
   - Strict: Require approval for ALL replies
   - Fast: Auto-post all replies unless flagged

E) Customer service resolution details
22) Typical resolution you can offer unhappy customers (examples: refund policy, redo policy, manager call-back window):
23) Time window for call-back (e.g., within 1 business day):
24) Any topics that require immediate escalation (billing disputes, safety incidents, discrimination claims, HIPAA/PHI, legal threats):

F) Reporting
25) Weekly report recipient emails:
26) Best day/time to receive report:

Success criteria for the 7-day trial:
- Reply to all new reviews within SLA
- Escalate all 1–2★ reviews within 2 hours of detection
- Weekly KPI report sent

=============================
TEMPLATE 2 — ESCALATION TICKET + SLA (Use as Form, Notion page, or Email)
=============================
Title: Reputation Escalation Ticket — {{BusinessName}} — {{Platform}} — {{Date}}

Severity (select one)
- Sev 1 (Immediate): Legal threat, safety issue, discrimination allegation, medical/privacy info, media risk
- Sev 2 (High): 1★ review with specific service failure, staff named, billing dispute
- Sev 3 (Standard): 2–3★ review, vague complaint, service delay

Review details
- Platform: Google / Yelp
- Review URL:
- Reviewer name:
- Star rating:
- Review text (copy/paste):
- Date posted:

Our draft response (for approval)
- Draft text:

Flags triggered (check any)
- Mentions staff by name
- Mentions refund/billing
- Mentions safety/injury
- Mentions discrimination
- Mentions medical/legal/privacy
- Mentions competitor
- Profanity/threats

Required client input
1) What happened? (2–5 bullets)
2) What resolution can you offer?
3) Who will contact the reviewer and by when?
4) Any wording to avoid?

SLA (Week 1 defaults)
- Detection: daily monitoring (or via forwarded alerts)
- Initial escalation sent to client: within 2 hours for Sev 1–2, within 12 hours for Sev 3
- Client response window: 24 hours (or we post a holding reply if approved)
- Posting:
  - If we have access: we post after approval rule is satisfied
  - If client-post workflow: we send final copy + posting instructions within SLA

Holding reply template (if client hasn’t responded and policy allows)
“Thank you for sharing this feedback. We’re sorry to hear about your experience and would like to make this right. Please contact us at {{PhoneOrEmail}} so a manager can follow up and help resolve the issue.”

=============================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + One-Page Report Layout)
=============================
Email Subject: Weekly Reputation KPI Report — {{BusinessName}} — Week of {{StartDate}}–{{EndDate}}

Email body:
Hi {{FirstName}},
Here’s your weekly reputation summary for {{BusinessName}}.

Top-line KPIs (this week)
- New reviews: {{NewReviews}}
- Average star rating (this week): {{AvgRatingWeek}}
- Rolling 90-day average: {{AvgRating90d}}
- Response rate: {{ResponseRate}}%
- Median response time: {{MedianResponseTime}}
- Negative reviews (1–2★): {{NegCount}}
- Escalations created: {{EscalationsCreated}}
- Escalations resolved/closed: {{EscalationsClosed}}

Highlights
- What went well: {{Wins}}
- Main customer themes: {{Themes}}
- Watch-outs / risks: {{Risks}}

Actions for next week
1) {{Action1}}
2) {{Action2}}
3) {{Action3}}

If you need anything urgent, reply here or email agent_bob_replit+review-bot@agentmail.to.

— Bob
Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

One-page report layout (paste into Doc/Notion)
WEEKLY REPUTATION REPORT — {{BusinessName}}
Period: {{StartDate}}–{{EndDate}}

1) Scoreboard
- New reviews: {{NewReviews}} (Google: {{GNew}} / Yelp: {{YNew}})
- Avg rating (period): {{AvgRatingWeek}}
- Avg rating (prior period): {{AvgRatingPrior}}
- Response rate: {{ResponseRate}}%
- Median response time: {{MedianResponseTime}}

2) Review volume & sentiment
- 5★: {{FiveStar}} | 4★: {{FourStar}} | 3★: {{ThreeStar}} | 2★: {{TwoStar}} | 1★: {{OneStar}}
- Top themes (ranked):
  1) {{Theme1}}
  2) {{Theme2}}
  3) {{Theme3}}

3) Escalations
- Open: {{EscOpen}}
- Created: {{EscalationsCreated}}
- Closed: {{EscalationsClosed}}
- Notable incidents: {{NotableIncidents}}

4) Recommendations
- Operational fix: {{OpsFix}}
- Messaging fix: {{MsgFix}}
- Review generation suggestion (policy-safe): {{ReviewGenSuggestion}}

=============================
TEMPLATE 4 — 30-DAY KPI DASHBOARD (Targets + Actuals)
=============================
Use this as a single table in a Google Sheet. Columns: Date | Leads Sent | Replies | Calls Booked | Calls Showed | New Clients Closed | Cash Collected | MRR Added | Notes

Funnel assumptions (editable)
- Reply rate = 15%
- Book rate from replies = 35%
- Show rate = 70%
- Close rate from shows = 25%

30-day target (aligned to closing ~8 deals total)
- Total leads sent: 1,270
- Total replies: 190
- Calls booked: 66
- Calls showed: 46
- New clients closed: 8

Daily activity targets (average)
- Leads/day: 42
- Replies/day: 6–7
- Calls booked/day: 2–3
- Calls showed/day: 1–2
- Closes/day: 0.25 (≈2 closes/week)

Weekly checkpoints (recommended)
Week 1: 2 closes | Week 2: 2 closes | Week 3: 2 closes | Week 4: 2 closes

Cash collected target to hit $12k (recommended mix from plan)
- 6 DFY Growth: $500 setup + $1,250 month 1 each = $1,750 cash-in-month per client
- 2 Agency Starter: $199 setup + $399 month 1 each = $598 cash-in-month per account
- Total expected cash: (6 x $1,750) + (2 x $598) = $10,500 + $1,196 = $11,696
- Bridge to $12,000: $304 via add-ons (e.g., 1x Review-Request SMS add-on deposit or 1x Competitor Benchmark mini)

Add a second tab for Delivery KPIs (weekly)
- Reviews replied within SLA %
- Median response time
- Negative reviews escalated within 2 hours %
- Escalations resolved within 7 days %
- Rating trend (7/30/90 day)
- Response rate by platform (Google/Yelp)

Default Week-1 Yelp constraint policy (to keep deliverable)
- Yelp responses: Draft-by-us, post-by-client unless Yelp Business Owner access is granted.
- Google responses: Prefer Manager access; otherwise draft-by-us, post-by-client.

End of templates pack.