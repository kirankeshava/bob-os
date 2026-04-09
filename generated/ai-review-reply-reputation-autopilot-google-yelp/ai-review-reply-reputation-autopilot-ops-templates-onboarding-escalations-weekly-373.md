# AI Review Reply & Reputation Autopilot — Ops Templates (Onboarding + Escalations + Weekly KPI Report + 30-Day Sprint Tracker)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T06:33:26.653Z

---

Below are paste-ready templates to fulfill DFY and agency plans in week 1 without relying on Google/Yelp APIs.

========================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (copy/paste into Typeform/Google Form/email)
========================
Subject: Onboarding — Review Reply & Reputation Autopilot (10 minutes)

Hi {{FirstName}},

To start your Review Reply & Reputation Autopilot, please reply with the details below (or fill as a form). Once we have access + your brand rules, we can start replying within 1 business day.

A) Business basics
1) Business name:
2) Primary location address:
3) Website:
4) Primary service categories (top 3):
5) Business hours:

B) Review profiles + access (Week-1 deliverable approach)
6) Google Business Profile link:
7) Add us as a Manager/Communications Manager on Google Business Profile.
   - Invite this email: agent_bob_replit+review-bot@agentmail.to
   - Preferred: “Manager” role (posting responses)
8) Yelp business page link:
9) Yelp workflow choice (pick one):
   - Option 1 (recommended week 1): Client-post fallback (we draft responses; you paste-post in Yelp)
   - Option 2: Add us to Yelp Business Owner account (if available in your account)
10) Any other review sources to monitor? (Facebook, TripAdvisor, etc.)

C) Brand voice + compliance
11) Brand voice (pick up to 2): Friendly / Professional / Premium / Warm / Direct / Playful
12) Words/phrases we should NEVER use:
13) Offers/guarantees we should NEVER mention:
14) If regulated (medical/legal/financial): list compliance requirements + disclaimers.
15) Preferred sign-off name/title (e.g., “— Sarah, Owner” or “— Team {{Brand}}”):

D) Response policy preferences
16) Do you want us to invite happy customers to call/book again in responses? (Yes/No)
17) Do you want us to mention specific staff names when praised? (Yes/No)
18) Compensation/refunds policy (one sentence we can use when appropriate):
19) Private resolution channel: preferred phone/email for escalations:

E) Negative review escalation (who/when)
20) Escalation contacts (name + email + phone):
21) Escalate immediately if review contains (check any):
   - Safety issue/injury
   - Discrimination/harassment
   - Fraud/chargeback threat
   - Legal threat
   - HIPAA/medical privacy mention
   - Competitor sabotage claim
22) Approval rules (pick one):
   - Default: Auto-post 4–5★ unless flagged; require approval for 1–3★
   - Conservative: Require approval for all reviews

F) Weekly reporting
23) Report recipients (emails):
24) Best day/time to send weekly report:
25) Any KPI you care about most (calls, bookings, foot traffic, etc.)?

Proof of service URL (optional to share internally):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

========================
TEMPLATE 2 — ESCALATION TICKET + SLA (internal form + client-facing acknowledgement)
========================
Escalation Ticket (create as a Google Form / Airtable)

1) Client / Location:
2) Platform: Google / Yelp / Other
3) Review URL:
4) Star rating:
5) Reviewer name:
6) Review text (paste):
7) Reason for escalation (pick):
   - 1–2★ negative feedback
   - Safety issue/injury
   - Legal threat
   - Refund/chargeback threat
   - Discrimination/harassment
   - Privacy/HIPAA concern
   - Spam/competitor suspicion
   - Other
8) Recommended response type (pick):
   - Public apology + invite offline
   - Clarify misunderstanding + invite offline
   - Policy-based refusal + invite offline
   - No public reply recommended (await client)
9) Urgency:
   - P0: must respond within 4 business hours
   - P1: within 12 business hours
   - P2: within 24 business hours
10) Assigned to (client contact):
11) Notes / suggested next step:
12) Status: New / Waiting on client / Approved / Posted / Closed

Client-facing escalation acknowledgement (email/SMS)
Subject: Action needed: new negative review on {{Platform}} ({{Stars}}★)

Hi {{Name}},
A new {{Stars}}★ review came in on {{Platform}} and we recommend handling it as an escalation.

Review link: {{URL}}
Suggested public response (draft):
“{{Draft}}”

Please reply with:
1) APPROVE (we will post if we have access), or
2) EDITS (tell us what to change), or
3) HANDLE INTERNALLY (we will mark as resolved once you confirm).

SLA: If we don’t hear back within {{SLA Window}}, we will follow your approval rules from onboarding.

— Bob
agent_bob_replit+review-bot@agentmail.to

========================
TEMPLATE 3 — WEEKLY KPI REPORT (email + dashboard layout)
========================
Weekly KPI Report Email (send every week)
Subject: Weekly Reputation KPI Report — {{Business}} ({{DateRange}})

Hi {{FirstName}},

Here’s your weekly Reputation KPI snapshot for {{DateRange}}.

1) Review volume
- New reviews: {{NewReviews}} (Google: {{GNew}} / Yelp: {{YNew}})
- Total reviews (lifetime): {{TotalReviews}}

2) Rating performance
- Average rating (current): {{AvgRating}}
- Change vs last week: {{AvgRatingDelta}}
- 1–2★ reviews this week: {{NegCount}}

3) Responsiveness (key revenue proxy)
- Response rate: {{ResponseRate}}%
- Median response time: {{MedianResponseTime}}
- SLA compliance: {{SLACompliance}}%

4) Escalations
- Escalations created: {{EscCreated}}
- Escalations resolved/closed: {{EscClosed}}
- Open escalations: {{EscOpen}}

5) Themes (what customers are saying)
Top positives: {{TopPosThemes}}
Top issues: {{TopNegThemes}}

Actions recommended next week:
- {{Action1}}
- {{Action2}}

If you want, we can add competitor benchmarking or a negative-review playbook for your staff.

— Bob
agent_bob_replit+review-bot@agentmail.to
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1

Weekly KPI Dashboard Layout (Google Sheet tabs)
TAB A: Overview (Week)
Columns:
- Week Start / Week End
- New Reviews (Total)
- New Reviews (Google)
- New Reviews (Yelp)
- Avg Rating (Current)
- Avg Rating (Prev Week)
- Avg Rating (Delta)
- # 1–2★ Reviews
- Response Rate %
- Median Response Time (hrs)
- # Responses Posted
- SLA Compliance %
- Escalations Opened
- Escalations Closed
- Escalations Open (EOW)
- Notes / Key incidents

TAB B: Review Log
- Date
- Platform
- Reviewer
- Stars
- Review URL
- Theme tag (manual)
- Drafted (Y/N)
- Approved (Y/N)
- Posted (Y/N)
- Response time (hrs)
- Escalated (Y/N)
- Resolution notes

TAB C: Themes
- Theme
- Count (week)
- Example review link
- Suggested operational fix

========================
TEMPLATE 4 — 30-DAY SPRINT TRACKER (daily scoreboard aligned to $12k plan)
========================
Create as a simple sheet called “30-Day Sprint”. One row per day.

Daily columns (Pipeline)
- Date
- New leads added
- Follow-ups sent
- Positive replies
- Calls booked
- Calls held (shows)
- Proposals sent
- Deals closed (#)
- Cash collected ($)
- MRR added ($)

Daily columns (Delivery health — once clients start)
- New reviews monitored
- Responses drafted
- Responses posted
- Median response time (hrs)
- Escalations opened
- Escalations closed

Targets to hit $12k cash-in-month (baseline)
- Leads/day: 40–45
- Positive replies/day: 6–7
- Calls booked/day: 2–3
- Shows/day: 1–2
- Closes/week: 2

How to use:
- Every morning: set today’s lead target and call blocks.
- Midday: check replies + book calls.
- End of day: update scoreboard; if behind, increase leads/day by +20% until caught up.

Default week-1 deliverability policy (important)
- Google: require GBP Manager access for us to post replies.
- Yelp: default to client-post fallback (we draft; client posts) unless they can grant posting access. This avoids API dependency and prevents fulfillment delays.

All client communications can reference proof URL:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-93ks6vt9.picard.replit.dev/sites/1
and contact email:
agent_bob_replit+review-bot@agentmail.to
