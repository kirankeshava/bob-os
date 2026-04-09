# AI Review Reply & Reputation Autopilot — Ops Templates + 30-Day Scoreboard (Ready to Use)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:52:56.340Z

---

Below are paste-ready templates to fulfill the DFY Review Reply Autopilot + Weekly KPI Report and the White-Label Agency plan in week 1 without relying on Google/Yelp APIs.

========================================
TEMPLATE 1 — ONBOARDING QUESTIONNAIRE + ACCESS CHECKLIST (send as form or email)
========================================
Subject: Quick onboarding for your Review Reply Autopilot (10 minutes)

Hi {{FirstName}},

To get your Review Reply & Reputation Autopilot live, please reply to this email or complete the questions below. This helps us draft brand-safe replies and start responding within SLA.

Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

A) Business details
1) Business name + primary location address:
2) Website URL:
3) Primary phone number:
4) Hours of operation:

B) Review profiles to manage
5) Google Business Profile link (or name as shown in Google Maps):
6) Yelp business page link:
7) Any other sources you want included (Facebook, TripAdvisor, etc.) — optional:

C) Brand voice + compliance
8) Choose your default tone: Friendly / Professional / Warm & empathetic / Short & direct / Premium & concierge
9) Phrases we should use often (e.g., “free estimate”, “family-owned”, “same-day appointments”):
10) Phrases we must never use (banned words/claims):
11) Regulated industry notes (medical/legal/financial). Anything we should avoid saying?
12) Any offers/promotions allowed in replies? (Yes/No). If yes, exact wording + terms:

D) Escalation contacts (for 1–3★ or sensitive issues)
13) Primary escalation contact name + email + phone:
14) Backup escalation contact name + email + phone:
15) Preferred escalation method: Email / Text / Call

E) Approvals (choose one)
16) Approval mode:
   ( ) Standard: We auto-post 4–5★ unless flagged; you approve 1–3★ before posting.
   ( ) Strict: You approve all replies before posting.

F) Access checklist (Week-1 deliverability: human-in-the-loop supported)
17) Google Business Profile access (preferred): Add agent_bob_replit+review-bot@agentmail.to as a Manager on your GBP.
   Instructions: Google Business Profile → Menu → Business Profile settings → Managers → Add.

18) Yelp workflow (default): We draft replies and send them to you to post.
   Optional upgrade: If you can grant Yelp Business Owner access or delegate response permissions, we can post directly.

G) Operational preferences
19) Response SLA you want (we’ll match your plan): 12 hours / 24 hours / 48 hours
20) Anything that should always trigger escalation (keywords like “refund”, “lawsuit”, “injury”, “food poisoning”, “discrimination”, etc.)?

Once we have the above, we’ll send a test set of 3 draft replies for approval and then go live.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to


========================================
TEMPLATE 2 — ESCALATION TICKET + SLA RULES (internal + client-facing)
========================================
Escalation Ticket ID: {{AUTO}}
Client: {{BusinessName}}
Location: {{Location}}
Platform: Google / Yelp
Review link: {{URL}}
Reviewer name: {{Name}}
Star rating: {{1-5}}
Date/time received: {{Timestamp}}

Category (select one):
[ ] Service quality complaint
[ ] Billing/refund dispute
[ ] Staff conduct / discrimination
[ ] Safety/health issue
[ ] Legal threat / lawsuit
[ ] Competitor / suspected fake review
[ ] Other: {{Describe}}

Risk level:
[ ] Low (tone issue, minor dissatisfaction)
[ ] Medium (refund request, repeated complaint, reputational risk)
[ ] High (legal/medical/safety/discrimination allegations)

Proposed response approach (draft notes):
- Acknowledge + apologize without admitting fault
- Move offline: provide contact method
- Offer next step (investigate, manager contact)
- No incentives, no review gating
- Avoid prohibited claims

SLA rules (week-1, no API required):
1) 4–5★ reviews: draft within 24h (or plan SLA). Auto-approve unless flagged for compliance.
2) 3★ reviews: draft within 12–24h; requires client approval before posting.
3) 1–2★ reviews: draft within 6–12h; ALWAYS requires client approval; escalate ticket opened immediately.
4) High-risk keywords (lawsuit, injury, fraud, discrimination, harassment, food poisoning, HIPAA, etc.): do not post. Escalate immediately; wait for client instruction.

Posting method:
- Google: If GBP Manager access granted → we post directly.
- Yelp: Default client-post workflow → we send final copy/paste response + link.

Resolution tracking:
Client contacted at: {{Timestamp}}
Client decision: [ ] Approve draft [ ] Edit requested [ ] Do not respond [ ] Contacted reviewer offline
Final response posted at: {{Timestamp}}
Outcome notes: {{FreeText}}


========================================
TEMPLATE 3 — WEEKLY KPI REPORT (email + Google Sheet layout)
========================================
Weekly report email (send every Monday)
Subject: Weekly Reputation KPIs — {{BusinessName}} ({{DateRange}})

Hi {{FirstName}},

Here are your weekly reputation KPIs for {{BusinessName}} for {{DateRange}}.

1) Review volume
- New reviews this week: {{#}}
- Total reviews: {{#}} (if available)

2) Rating trend
- Average star rating (this week): {{#}}
- Average star rating (last 30 days): {{#}}
- Change vs last week: {{+/-}}

3) Responsiveness
- Responses posted this week: {{#}}
- Response rate on new reviews: {{#}}%
- Median response time: {{#}} hours
- SLA compliance: {{#}}% within plan SLA

4) Negative review handling
- 1–3★ reviews received: {{#}}
- Escalations opened: {{#}}
- Escalations resolved (client confirmed action taken): {{#}}

5) Themes we’re seeing (top 3)
- {{Theme1}} ({{#}} mentions)
- {{Theme2}} ({{#}} mentions)
- {{Theme3}} ({{#}} mentions)

6) Next-week recommendations (1–3 actions)
- {{Action1}}
- {{Action2}}
- {{Action3}}

If you’d like, reply to this email with any policy or tone changes for next week.

Support: agent_bob_replit+review-bot@agentmail.to
Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Thanks,
Bob Smith


Google Sheet layout (tabs + columns)
TAB 1: Weekly Summary
Columns:
- Week Start
- Week End
- New Reviews (Google)
- New Reviews (Yelp)
- Total New Reviews
- Avg Rating (Week)
- Avg Rating (30D)
- Response Rate %
- Median Response Time (hrs)
- # Responses Posted
- # Escalations Opened
- # Escalations Resolved
- SLA Compliance %
- Top Theme 1
- Top Theme 2
- Top Theme 3
- Notes / Recommendations

TAB 2: Review Log
Columns:
- Date
- Platform
- Review Link
- Reviewer Name
- Stars
- Review Text
- Drafted Response (Y/N)
- Posted Response (Y/N)
- Posted By (Us/Client)
- Time to First Draft (hrs)
- Time to Post (hrs)
- Escalated (Y/N)
- Escalation ID
- Status (Open/Waiting/Resolved)
- Tags/Themes

TAB 3: SLA Tracker
Columns:
- Date
- Platform
- Stars
- SLA Target (hrs)
- Actual Time to Post (hrs)
- Met SLA (Y/N)
- Reason Missed (if any)


========================================
30-DAY SCOREBOARD — $12K CASH-IN-MONTH TARGET (PIPELINE + SALES KPIs)
========================================
Revenue target (cash collected in 30 days): $12,000
Recommended deal mix:
- 6 DFY Growth @ $1,250/mo + $500 setup = $1,750 cash collected each → $10,500 cash
- 2 Agency Starter @ $399/mo + $199 setup = $598 cash collected each → $1,196 cash
Subtotal: $11,696 cash
Bridge to $12k: +$304 via (a) 1x SMS add-on ($249/mo) + 1 small one-time playbook ($199) OR (b) 1 overage/location OR (c) 1 DFY Pro upgrade

Conversion assumptions (outbound-first baseline):
- Reply rate from outbound leads: 15%
- Calls booked per reply: 35%
- Show rate: 70%
- Close rate on shows: 25%

Math to close 8 deals in 30 days:
- Deals needed: 8
- Shows needed = 8 / 0.25 = 32
- Calls booked needed = 32 / 0.70 ≈ 46
- Replies needed = 46 / 0.35 ≈ 132
- Outbound leads needed = 132 / 0.15 ≈ 880
Daily activity targets (30 days):
- New outbound leads/day: 30
- Replies/day: 4–5
- Calls booked/day: 1–2
- Shows/day: 1
- Closes/week: 2

Daily KPI dashboard fields (track every day):
- Leads sent
- Replies
- Qualified conversations
- Calls booked
- Calls held (shows)
- Deals closed
- Cash collected today
- MRR added today
- Pipeline value (weighted)
- Notes/blocks

Delivery KPIs (weekly):
- Response rate % on new reviews
- Median response time
- SLA compliance %
- Rating trend (week + 30D)
- Escalations opened/resolved

Default week-1 Yelp policy (to reduce friction):
- We do NOT require Yelp access to start. We draft replies and send client copy/paste instructions + links. If client grants Yelp Business Owner access later, we switch to direct posting.

All client communications should reference:
- Website legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact/support email: agent_bob_replit+review-bot@agentmail.to
