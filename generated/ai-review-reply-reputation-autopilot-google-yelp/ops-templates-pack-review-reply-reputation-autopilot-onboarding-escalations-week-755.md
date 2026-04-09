# Ops Templates Pack — Review Reply & Reputation Autopilot (Onboarding + Escalations + Weekly KPI Report)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:09:27.995Z

---

Below are 3 paste-ready templates you can use immediately to fulfill the DFY Review Reply Autopilot + Weekly KPI Report and the White-label Agency plan in week 1 (no API dependency). All customer comms reference the website and contact email.

============================
TEMPLATE 1 — ONBOARDING QUESTIONNAIRE (send as email or form)
============================
Subject: Quick onboarding for Review Reply Autopilot (10 minutes)

Hi {{FirstName}},

To get your Review Reply & Reputation Autopilot live this week, please reply with the info below (bullet answers are perfect). If you prefer, you can paste answers into a doc.

Proof/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support email: agent_bob_replit+review-bot@agentmail.to

A) Locations + review sources
1) Business name + location address(es):
2) Primary review sources to manage (check): Google Business Profile / Yelp
3) Link(s) to your Google listing(s):
4) Link(s) to your Yelp page(s):

B) Access (choose your preferred workflow)
Google Business Profile (GBP):
- Preferred: add us as a Manager to your GBP (recommended for fastest posting)
- Alternative: we draft; you post (copy/paste)

Yelp:
- Default week-1 workflow: we draft; you post (copy/paste)
- Optional: if you have Yelp Business Owner access you can add us or enable collaboration

C) Brand voice + compliance
1) Brand voice (choose): Friendly & warm / Professional / Playful / Luxury / Clinical / Other:
2) Do/Don’t list for tone (e.g., “no exclamation points”, “avoid slang”, “use ‘we’ not ‘I’”):
3) Banned phrases/claims (e.g., “best in town”, “guarantee”, medical/legal claims):
4) If regulated (medical/legal/financial), any required disclaimers?

D) Offers + resolution options (used in replies)
1) Best contact method for unhappy customers: phone/email/text?
2) Customer service contact info to include publicly (if any):
3) Approved make-good options (choose what’s allowed): refund / redo / discount / manager callback / none / other:
4) Hours + typical response expectations:

E) Escalation contacts
1) Who should be alerted for 1–3 star reviews? Name + email + phone:
2) Backup escalation contact:
3) Timezone:

F) Approval rules (default settings)
- 4–5★: auto-approve + post (unless flagged by keywords)
- 1–3★: require approval OR post a safe “take it offline” response (choose):
Your choice: ( ) Require approval before posting ( ) Post safe response immediately + escalate internally

G) Reporting
1) Weekly report recipient(s) email:
2) Preferred report day/time:
3) Any KPIs you care most about (calls, bookings, foot traffic, etc.)?

Thanks — once we have this, we’ll begin drafting within 24 hours.

— Bob
agent_bob_replit+review-bot@agentmail.to

============================
TEMPLATE 2 — ESCALATION TICKET + SLA RULES (internal + shared)
============================
Title: Review Escalation Ticket (1–3★, policy risk, or sensitive topics)

Create a ticket whenever a review meets ANY trigger below.

A) Triggers (any = escalate)
- Rating: 1★, 2★, or 3★
- Mentions: refund, lawsuit, lawyer, fraud, scam, discrimination, HIPAA/PHI, injury, accident, police, chargeback
- Employee named directly + accusation
- Safety issue, harassment, threats
- Potential confidentiality breach (health/financial/legal details)
- Competitor/spam suspicion

B) Ticket fields (copy/paste)
1) Business / location:
2) Platform: Google / Yelp
3) Review link:
4) Reviewer name + rating + date:
5) Full review text (paste):
6) Internal context (what happened):
7) Desired outcome (refund/call/redo/etc.):
8) Who is owner for resolution (name + phone/email):
9) Public reply approach (choose one):
   - Option 1: Acknowledge + apologize + take offline (safe default)
   - Option 2: Clarify policy + take offline (no blame)
   - Option 3: Decline details publicly + take offline (for sensitive cases)
10) Approval required before posting? (Y/N)
11) Deadline/SLA:

C) SLA rules (week-1 deliverable)
- 4–5★ reviews: draft within 24 hours; post same day once approved/auto-approved.
- 1–3★ reviews: draft within 12 business hours; escalation ticket created same day.
- Sensitive/policy-risk reviews: do not post until client approves.

D) Default safe response (for 1–3★ if client chooses “post immediately”)
“Hi {{Name}}, thank you for the feedback — we’re sorry to hear about your experience. We’d like to learn more and make this right. Please contact {{ContactMethod}} at {{ContactInfo}} so a manager can help directly. — {{BusinessName}}”

============================
TEMPLATE 3 — WEEKLY KPI REPORT (email + Google Sheet layout)
============================
A) Weekly KPI email (paste-ready)
Subject: Weekly Reputation KPIs — {{BusinessName}} ({{WeekStart}}–{{WeekEnd}})

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{BusinessName}}:

1) New reviews
- Google: {{#}} new ({{avgRating}} avg)
- Yelp: {{#}} new ({{avgRating}} avg)

2) Ratings + trends
- Current average rating: {{rating}}
- Change vs last week: {{+/-}}
- 1–3★ received: {{#}}

3) Responsiveness
- Response rate: {{%}} (goal: 95%+)
- Median response time: {{hours}} (goal: <24h)

4) Escalations & resolutions
- Escalations created: {{#}}
- Resolved this week: {{#}}
- Open escalations: {{#}} (oldest: {{date}})

5) Top themes we’re seeing (from reviews)
- {{Theme1}} ({{#}} mentions)
- {{Theme2}} ({{#}} mentions)
- {{Theme3}} ({{#}} mentions)

Actions we recommend this week:
- {{Action1}}
- {{Action2}}

If you want, we can also add (optional): review-request SMS, competitor benchmarking, and a negative-review playbook.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

B) Weekly KPI sheet layout (tabs + columns)
Tab 1: Weekly Summary
Columns:
- Week Start
- Week End
- Google New Reviews
- Yelp New Reviews
- Avg Rating (Google)
- Avg Rating (Yelp)
- Overall Avg Rating (weighted optional)
- 1★ Count
- 2★ Count
- 3★ Count
- 4★ Count
- 5★ Count
- Response Rate % (posted responses / total new reviews)
- Median Response Time (hrs)
- Escalations Created
- Escalations Resolved
- Open Escalations
- Notes / Actions

Tab 2: Review Log (operational)
Columns:
- Date
- Platform
- Location
- Reviewer Name
- Star Rating
- Review Text (short)
- Category/Theme
- Drafted (Y/N)
- Approved (Y/N)
- Posted (Y/N)
- Response Time (hrs)
- Escalated (Y/N)
- Escalation ID
- Resolution Status

Tab 3: Theme Tracker
Columns:
- Theme
- Mentions This Week
- Mentions Last Week
- Trend (up/down)
- Example Review Link
- Suggested Fix

============================
DEFAULT WEEK-1 YELP POLICY (for deliverability)
============================
- Google: require GBP Manager access OR client-post workflow.
- Yelp: default to client-post workflow in week 1 (we draft responses within SLA; client posts). If client grants Yelp Business Owner access later, we can post directly.
- No claims of “automatic posting” unless direct access is granted.

============================
MINIMUM DAILY PIPELINE TARGETS (to support $12k plan)
============================
Assumptions: 15% reply rate, 35% book rate from replies, 70% show rate, 25% close rate on shows.
- Outbound leads/day: ~42
- Replies/day: ~6
- Calls booked/day: ~2
- Shows/day: ~1–2
- Closes/week target: 2 (to reach ~8 closes in 30 days)

Use these templates to onboard and start fulfilling immediately while sales runs in parallel.
