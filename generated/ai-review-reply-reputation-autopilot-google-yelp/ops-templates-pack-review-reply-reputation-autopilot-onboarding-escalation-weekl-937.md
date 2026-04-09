# Ops Templates Pack — Review Reply & Reputation Autopilot (Onboarding + Escalation + Weekly KPI Report) + 30-Day Pipeline Targets

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:16:21.133Z

---

Below are paste-ready templates you can use immediately for delivery and customer communication. Use these with the website URL https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 and contact email agent_bob_replit+review-bot@agentmail.to.

====================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (Copy/paste into Typeform/Google Form/email)
Subject: Quick onboarding — Review Reply Autopilot

Hi {{FirstName}},
To start your Review Reply & Reputation Autopilot, please answer the questions below (5–8 minutes). Once we have this, we can begin drafting replies within 1 business day.

A) Business details
1) Business name:
2) Primary location address (and any additional locations):
3) Website URL:
4) Primary phone number:
5) Business hours (and holiday hours if relevant):

B) Platform access (choose one path per platform)
6) Google Business Profile (GBP):
   - Preferred: Add us as a Manager (email: agent_bob_replit+review-bot@agentmail.to)
   - Alternate: We draft, you post (we’ll send copy/paste replies daily)
7) Yelp:
   - Preferred: Add us as a user in Yelp for Business Owner (same email)
   - Alternate (Week-1 friendly): We draft, you post (we’ll send copy/paste replies daily)

C) Brand voice & compliance
8) Brand voice (pick 2–3): Friendly / Professional / Concierge / Direct / Playful / Luxury / Clinical
9) Words/phrases we should NOT use:
10) Offers/promos we MAY mention (if any):
11) Offers/promos we must NEVER mention:
12) Sensitive topics to avoid (pricing, insurance, refunds, liability, health claims, etc.):
13) Do you want us to sign replies as a person (e.g., “—Sam, Owner”) or as “Team {{BusinessName}}”?

D) Escalation rules & contacts
14) Who should be notified for 1–2★ reviews? Name + email + phone:
15) Who approves responses when needed? Name + email + phone:
16) If a reviewer alleges fraud/safety/illegal activity, who handles it?
17) Preferred escalation channel: Email / SMS / Slack / Other

E) Operating preferences
18) Response policy preference:
   - Auto-approve 4–5★ replies unless flagged
   - Require approval for all replies
19) Business constraints: anything we should know before replying (refund policy, appointment policy, warranty, service area, etc.)

F) Reporting
20) Where should we send the weekly KPI report? (emails)
21) Which day/time do you prefer for the weekly report?

====================================================
TEMPLATE 2 — ESCALATION TICKET + SLA POLICY (Internal + client-facing)
Title: Negative Review Escalation Ticket

Ticket ID: {{YYYYMMDD-Client-###}}
Client: {{BusinessName}}
Platform: Google / Yelp
Review link: {{URL}}
Reviewer name: {{Name}}
Star rating: {{1-5}}
Date/time posted: {{Timestamp}}
Review text (paste):

Classification (check all that apply):
[ ] Service complaint  [ ] Staff behavior  [ ] Pricing/billing  [ ] Wait time
[ ] Product quality    [ ] Safety issue    [ ] Fraud allegation
[ ] Legal/medical claim [ ] Competitor/suspected fake  [ ] Other: ____

Risk flags (forces approval + customized handling):
[ ] Threat of lawsuit  [ ] Mentions specific employee name  [ ] Sensitive info (PHI/PII)
[ ] Discrimination/harassment  [ ] Chargeback/refund dispute

SLA & workflow
- Acknowledgement SLA: Within {{12h or 24h}} we draft a response and notify escalation contacts.
- Posting rule: 1–3★ reviews require client approval before posting (unless client opts into pre-approved templates).
- Resolution tracking: We log whether the customer was contacted, outcome, and whether the reviewer updated the rating.

Client contacts notified:
- Primary: {{Name, email, phone}}
- Backup: {{Name, email, phone}}

Draft response (proposed):
{{Draft}}

Recommended next step (choose one):
[ ] Offer offline resolution + request details
[ ] Apology + policy clarification + invite to contact
[ ] Dispute/report review (client must submit; we provide draft rationale)
[ ] No response recommended (rare; document why)

Outcome notes (filled later):
- Contacted customer? Y/N
- Outcome:
- Updated rating? Y/N

====================================================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + Google Sheet layout)

A) Weekly KPI Email (copy/paste)
Subject: Weekly Reputation Report — {{BusinessName}} ({{WeekStart}}–{{WeekEnd}})

Hi {{FirstName}},
Here’s your weekly reputation snapshot. Full detail is in the attached/linked sheet.

1) New reviews this week
- Google: {{#}} (Avg {{avgStarsGoogle}}★)
- Yelp: {{#}} (Avg {{avgStarsYelp}}★)

2) Ratings & trend
- Current average rating (Google): {{ratingNowGoogle}}★ ({{+/-}} vs last week)
- Current average rating (Yelp): {{ratingNowYelp}}★ ({{+/-}} vs last week)

3) Responsiveness
- Replies posted: {{#}} / {{#NewReviews}} ({{responseRate}}%)
- Median response time: {{medianHours}} hours
- SLA met: {{SLAmet}}% (target {{SLA}})

4) Negative review handling
- 1–3★ reviews: {{#}}
- Escalations sent: {{#}}
- Resolved/closed: {{#}}
- Themes observed: {{theme1}}, {{theme2}}, {{theme3}}

5) Recommended actions (next 7 days)
- {{Action1}}
- {{Action2}}
- {{Action3}}

If you want, reply to this email with any promo/event/service updates you want us to reflect in future replies.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

B) Google Sheet layout (tabs + columns)
Tab 1: Weekly Summary
Columns:
- Week Start | Week End
- New Reviews (Google) | New Reviews (Yelp)
- Avg Stars This Week (G) | Avg Stars This Week (Y)
- Overall Rating (G) | Overall Rating (Y)
- Replies Posted (G) | Replies Posted (Y)
- Response Rate %
- Median Response Time (hrs)
- # 1–3★ Reviews
- # Escalations
- # Resolved
- Top Theme 1 | Top Theme 2 | Top Theme 3
- Notes / Recommendations

Tab 2: Review Log
Columns:
- Date | Platform | Reviewer | Stars | Review Text | Drafted By | Posted? (Y/N)
- Posted Date | Response Text | Escalated? (Y/N) | Ticket ID | Outcome | Link

Tab 3: SLA Tracker
Columns:
- Date | Platform | Review Received Time | Draft Ready Time | Approval Requested Time | Posted Time | Hours to Post | SLA Met? | Reason if not

====================================================
DEFAULT WEEK-1 FULFILLMENT SCOPE (Customer-facing; paste into proposal)

What we do
- Monitor and respond to new reviews on Google Business Profile and Yelp.
- Draft brand-safe replies aligned to your voice and policies.
- Escalate negative reviews to your team with a recommended response and next-step.
- Deliver a weekly KPI report: new reviews, rating trend, response rate, response time, negative review themes, and resolution status.

Response SLAs
- Standard (Growth): draft within 24 hours of detection; negative reviews escalated same day when possible.
- Pro: draft within 12 hours of detection.

Approval rules (human-in-the-loop)
- 4–5★: can be auto-posted if client opts in; otherwise approval available.
- 1–3★: requires client approval before posting (default).
- Always requires approval if legal/medical/safety/harassment/employee-name/PII is present.

Posting method (no API dependency)
- Preferred: client adds us as Manager on GBP and as a user on Yelp Business Owner. We post directly.
- Fallback: we send copy/paste replies daily and the client posts (still meets week-1 deliverability).

Exclusions
- No review gating, incentivizing reviews, or policy-violating requests.
- We do not guarantee removal of reviews; we can provide dispute templates and guidance.

====================================================
30-DAY PIPELINE TARGETS (to hit the recommended $12k mix)
Assumptions (outbound-first): 15% reply rate → 35% book rate from replies → 70% show rate → 25% close rate on shows.
Goal deals: 8 total closes (6 DFY + 2 agency) in 30 days.

Minimum activity targets (30 days)
- Outbound leads: ~1,270 total (≈42/day)
- Replies: ~190 total (≈6–7/day)
- Calls booked: ~66 total (≈2–3/day)
- Shows: ~46 total (≈1–2/day)
- Closes: 8 total (≈2/week)

Stretch targets (+20% buffer)
- Leads/day: 50
- Replies/day: 8
- Calls booked/day: 3
- Shows/day: 2
- Closes/week: 3

KPI dashboard fields (daily)
- Leads sent | Replies | Conversations | Calls booked | Shows | Closes | Cash collected | MRR added
- Delivery: New reviews | Replies posted | SLA met % | Escalations | Resolved | Rating trend

Use these templates as the operational backbone so fulfillment starts in week 1 without engineering or paid tools.