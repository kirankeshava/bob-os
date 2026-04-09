# Ops Templates Pack — Review Reply & Reputation Autopilot (Onboarding + Escalation + Weekly KPI Report)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:09:55.945Z

---

Below are paste-ready templates you can use immediately to onboard clients, manage negative-review escalations, and send weekly KPI reports. These templates reference the live website for legitimacy (https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1) and the business inbox (agent_bob_replit+review-bot@agentmail.to).

============================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (Copy/Paste into Google Form / Typeform / Email)
Subject: 5-minute setup for your Review Reply Autopilot

Hi {{FirstName}},

To activate your AI Review Reply & Reputation Autopilot, please answer the questions below. This ensures every response matches your brand voice and escalation rules.

Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

A) Business Profile
1) Business name:
2) Website:
3) Primary category (e.g., dentist, medspa, HVAC):
4) # of locations to cover now:
5) Location addresses + phone numbers (one per line):

B) Review Sources (Access)
6) Google Business Profile: can you add us as a Manager? (Yes/No)
   - If yes: invite agent_bob_replit+review-bot@agentmail.to as Manager for each location.
7) Yelp: do you have Yelp Business Owner access? (Yes/No)
   - If yes: add agent_bob_replit+review-bot@agentmail.to (or provide collaborator access).
   - If no: we will use the “client-post workflow” (we draft; you paste/post).
8) Preferred backup method if access is delayed:
   - ( ) Client-post workflow (we draft in email/Slack; you paste/post)
   - ( ) Provide login credentials (not preferred; only if you insist)

C) Brand Voice & Policy Guardrails
9) Pick a tone (choose up to 2): Friendly / Professional / Warm / Direct / Premium / Playful / Clinical
10) Words/phrases we should never use:
11) Any offers or guarantees we must NOT mention:
12) Approved phrases you want included (optional):
13) Do you want us to invite customers to call/text after negative reviews? (Yes/No). If yes, provide contact line + hours.

D) Escalation Rules (Negative Reviews)
14) Who should be notified for 1–3 star reviews? (Name + email + phone)
15) Escalate immediately if review contains (check all that apply):
   - ( ) Safety issue
   - ( ) Discrimination/harassment
   - ( ) Legal threat
   - ( ) Medical/health claim
   - ( ) Refund/chargeback
   - ( ) Staff member named
   - ( ) Competitor/fake review suspected
16) Preferred escalation channel:
   - ( ) Email
   - ( ) SMS/text
   - ( ) Slack
17) Do you want approval required before posting replies?
   - ( ) Auto-approve 4–5★ unless flagged; approval required for 1–3★
   - ( ) Approval required for all reviews
   - ( ) Auto-approve all unless flagged

E) Response SLA Expectations
18) Desired response window:
   - ( ) within 24 hours
   - ( ) within 12 hours
   - ( ) same business day
19) Blackout windows/holidays (if any):

F) Weekly Reporting
20) Weekly report recipient(s) email:
21) Preferred report day/timezone:

Confirmation
22) Please confirm you understand: We do not delete reviews, do not incentivize reviews, and do not “gate” review requests. We provide brand-safe draft responses and (when access is granted) can post responses on your behalf. (Yes/No)

============================================================
TEMPLATE 2 — ESCALATION / INCIDENT TICKET (For 1–3★ Reviews or Flagged Content)
Use this in email, Slack, or a simple form.

Title: Escalation — {{Business}} — {{Platform}} — {{StarRating}}★ — {{Date}}

1) Review Details
- Platform: Google / Yelp
- Location: {{LocationName}}
- Star rating: {{1-3}}
- Reviewer name/handle: {{Name}}
- Review date/time: {{Timestamp}}
- Review URL (direct link): {{URL}}
- Review text (paste exact):
  “{{ReviewText}}”

2) Risk Flags (check)
- ( ) Legal threat
- ( ) Safety issue
- ( ) Medical/health claim
- ( ) Refund/chargeback request
- ( ) Profanity/hate speech
- ( ) Staff member named
- ( ) Suspected fake/competitor

3) Draft Response (brand-safe)
Draft A (default):
“{{DraftA}}”

Draft B (more direct / problem-solving):
“{{DraftB}}”

4) Recommended Next Action
- Public reply recommendation: ( ) Post Draft A ( ) Post Draft B ( ) Hold pending internal investigation
- Private follow-up recommendation: Call / Email / Refund policy reminder / Invite to return

5) Approval Needed
- Approver: {{Name}}
- Approval deadline: {{Time}} (SLA)
- Approve which draft? A / B / Edit request
- Notes from approver:

SLA (internal)
- Acknowledgement sent to client: within 2 hours of flag
- Draft response delivered: within 6 hours (Pro) / 12 hours (Growth)
- Posting: after approval OR per auto-approval policy

============================================================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + Sheet Layout)

A) Weekly Email (send as plain text)
Subject: Weekly Reputation KPI Report — {{Business}} — Week of {{StartDate}}–{{EndDate}}

Hi {{FirstName}},

Here’s your weekly Reputation KPI snapshot across Google Business Profile and Yelp.

1) Review Volume & Rating
- New reviews: {{NewReviewsTotal}} (Google: {{GNew}}, Yelp: {{YNew}})
- Average star rating (current): {{AvgRating}}
- Rating trend vs last week: {{TrendUpDown}}

2) Responsiveness
- Responses posted: {{ResponsesPosted}}
- Response rate (posted / new): {{ResponseRate}}%
- Median response time: {{MedianResponseTime}} hours

3) Negative Review Handling
- 1–3★ reviews this week: {{NegCount}}
- Escalations created: {{Escalations}}
- Resolved (customer contacted / issue addressed): {{ResolvedCount}}
- Open escalations: {{OpenCount}}

4) Themes (Top 3)
- {{Theme1}} ({{Theme1Count}} mentions)
- {{Theme2}} ({{Theme2Count}} mentions)
- {{Theme3}} ({{Theme3Count}} mentions)

5) Next Week Recommendations (1–3 actions)
- {{Rec1}}
- {{Rec2}}
- {{Rec3}}

If you want, we can also add competitor benchmarking or an SMS/email review-request workflow (no gating/incentives) to increase review volume.

Dashboard reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Questions/support: agent_bob_replit+review-bot@agentmail.to

— Bob

B) Weekly KPI Sheet Layout (tabs + columns)
Tab 1: “Weekly Summary” (one row per week)
Columns:
- Week Start
- Week End
- Location
- Platform Mix (G/Y)
- New Reviews (Total)
- New Reviews (Google)
- New Reviews (Yelp)
- Avg Rating (Current)
- Avg Rating (Prev Week)
- Rating Change
- Responses Posted
- Response Rate
- Median Response Time (hrs)
- Negative Reviews (1–3★)
- Escalations Created
- Escalations Resolved
- Open Escalations
- Top Theme 1
- Top Theme 2
- Top Theme 3
- Notes / Actions

Tab 2: “Review Log” (one row per review)
Columns:
- Date
- Platform
- Location
- Reviewer Name
- Stars
- Review Text
- Flagged? (Y/N)
- Escalated? (Y/N)
- Draft Sent (timestamp)
- Approved (timestamp)
- Posted (timestamp)
- Response Text
- Outcome / Resolution Notes

Tab 3: “SLA Tracking”
Columns:
- Review ID/URL
- Stars
- Received Time
- Draft Time
- Posted Time
- Draft SLA Met? (Y/N)
- Post SLA Met? (Y/N)
- Reason if missed

============================================================
WEEK-1 DELIVERY RULES (Embed into SOP / internal doc)
- No API dependency required in week 1.
- Google: preferred method is adding agent_bob_replit+review-bot@agentmail.to as GBP Manager for each location. If not available, use client-post workflow.
- Yelp: preferred method is Yelp Business Owner access/collaborator access. If not available, default to client-post workflow.
- Auto-approval policy (recommended): 4–5★ replies auto-post unless keyword-flagged; 1–3★ always require approval unless client opts into full autopost.
- Hard exclusions: review gating, incentivizing reviews, misrepresenting identity, disputing reviews without explicit authorization, requesting deletion in public replies.

These templates are sufficient to onboard and deliver for the first paying clients immediately while keeping brand safety and policy compliance.
