# Review Reply & Reputation Autopilot — Week-1 Ops Template Pack (Onboarding + Escalation + Weekly KPI Report)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:50:58.705Z

---

Below are 3 paste-ready templates to run fulfillment immediately (no API dependency). Use these with every new customer. Public legitimacy URL to share with customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Primary contact email to use in all comms: agent_bob_replit+review-bot@agentmail.to

========================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (copy/paste)
Subject: Quick onboarding — Review Reply Autopilot (5 minutes)

Hi {{FirstName}},

To start your Review Reply & Reputation Autopilot, please reply with the info below (you can answer inline). Once we have this, we’ll begin drafting responses within 1 business day.

A) Business + Locations
1) Business name:
2) Address(es) / location count:
3) Primary service categories (top 3):
4) Hours of operation:

B) Access (choose one per platform)
Google Business Profile (GBP):
- Option 1 (preferred): Invite us as a Manager/Owner to your GBP location(s). Invite email: agent_bob_replit+review-bot@agentmail.to
- Option 2: You keep posting. We draft responses and send ready-to-post copy.

Yelp:
- Option 1: Add us as a user on Yelp for Business. Invite email: agent_bob_replit+review-bot@agentmail.to
- Option 2 (default week-1 fallback): You keep posting. We draft responses and send ready-to-post copy.

C) Brand Voice + Rules
5) Choose tone: (Warm & grateful) / (Concise & professional) / (Premium & formal) / (Playful)
6) Words/phrases to avoid (banned list):
7) Must-include phrases (optional):
8) Do you want to mention promotions, links, phone number, or booking URL in replies? If yes, share exact text + URL.

D) Escalation Contacts + Approvals
9) Escalation contact (name, email, phone):
10) Backup contact:
11) Approval preference for negative reviews:
- ( ) We approve all 1–3★ replies before posting
- ( ) Auto-post 3★ unless flagged; approve 1–2★
- ( ) Approve any review mentioning refund, injury, discrimination, legal, medical, insurance

E) Policies / Compliance
12) Any regulatory constraints? (medical, dental, legal, finance, etc.)
13) Topics we should never discuss publicly (pricing specifics, diagnoses, etc.):
14) Are we allowed to invite unhappy customers to a private resolution channel? If yes, provide preferred contact method (phone/email).

F) Reporting
15) Who should receive the weekly KPI report? (emails)
16) Preferred day/time for weekly report:

Thanks — once we have this, we’ll start the autopilot.
— Bob
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

========================================
TEMPLATE 2 — ESCALATION TICKET + SLA RULES (internal + client-facing)
Title: Reputation Escalation Ticket — {{Business}} — {{Platform}} — {{Date}}

1) Review Details
- Platform: Google / Yelp
- Reviewer name/handle:
- Star rating: 1 / 2 / 3 / 4 / 5
- Date posted:
- Review URL:
- Review text (paste):

2) Escalation Trigger (check all that apply)
- ( ) 1–2★ rating
- ( ) Mentions refund/chargeback
- ( ) Mentions injury/safety incident
- ( ) Mentions discrimination/harassment
- ( ) Mentions lawsuit/legal action
- ( ) Mentions HIPAA/medical details or requests diagnosis
- ( ) Mentions threats/blackmail
- ( ) Possible fake review / competitor
- ( ) Contains profanity/hate speech
- ( ) Other: ________

3) Response Plan
- Goal (choose): De-escalate / Request offline contact / Clarify facts / Apologize + next steps / Decline engagement (policy)
- Proposed public reply (draft):
{{DraftReply}}
- Private follow-up recommended? (Y/N). If yes, method + exact script:

4) Approval Gate
- Requires owner approval before posting? (Y/N)
- Approver: {{Name}} {{Email/Phone}}
- Approval timestamp:

5) SLA (standard week-1)
- 4–5★ reviews: draft within 24 business hours; auto-approve unless flagged
- 3★ reviews: draft within 24 business hours; auto-approve unless contains trigger keywords
- 1–2★ reviews: draft within 12 business hours; ALWAYS require client approval before posting
- Trigger keywords (auto-escalate regardless of stars): refund, lawsuit, attorney, injury, police, fraud, discrimination, racist, harassment, HIPAA, diagnosis, malpractice, insurance

6) Resolution Tracking
- Status: New / Drafted / Awaiting Approval / Posted / Follow-up Started / Resolved / No Response
- Notes:
- Outcome category: Reviewer updated rating (Y/N), reviewer removed review (Y/N), no change, ongoing

Posting Method Policy (Week 1)
- Preferred: We post directly via GBP/Yelp access.
- Fallback: Client-post workflow — we send “READY TO POST” copy with exact steps; client confirms once posted.

========================================
TEMPLATE 3 — WEEKLY KPI REPORT (email + 1-page layout)

EMAIL (copy/paste)
Subject: Weekly Reputation KPI Report — {{Business}} — Week of {{DateRange}}

Hi {{FirstName}},

Here’s your weekly Reputation KPI Report for Google/Yelp. Summary first, then detailed metrics.

Executive Summary (3 bullets)
1) New reviews: {{NewReviews}} | Average rating: {{AvgRating}} ({{WoWDelta}} vs last week)
2) Response rate: {{ResponseRate}} | Median response time: {{MedianResponseTime}}
3) Negative reviews (1–2★): {{NegCount}} | Escalations resolved: {{ResolvedCount}} / {{EscalationsTotal}}

Wins / What worked
- {{Win1}}
- {{Win2}}

Risks / Needs attention this week
- {{Risk1}} (owner action: {{OwnerAction1}})
- {{Risk2}} (owner action: {{OwnerAction2}})

Top customer themes (from reviews)
- {{Theme1}} ({{Count1}} mentions)
- {{Theme2}} ({{Count2}} mentions)
- {{Theme3}} ({{Count3}} mentions)

Next week plan
- {{NextStep1}}
- {{NextStep2}}

If you’d like, we can add a competitor benchmark snapshot and a simple “ask-for-review” SMS/email request flow.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


1-PAGE KPI LAYOUT (copy into a Doc/Sheet)
Header: {{Business}} | Week: {{DateRange}} | Locations: {{LocationCount}}

A) Reputation Scorecard
- New reviews (Google): {{G_New}}
- New reviews (Yelp): {{Y_New}}
- Total new reviews: {{TotalNew}}
- Avg rating (current): {{AvgRating}}
- Avg rating (prior week): {{AvgRatingPrev}}
- WoW rating change: {{AvgRating}} - {{AvgRatingPrev}}

B) Responsiveness
- Reviews responded to: {{Responded}}
- Reviews received: {{Received}}
- Response rate: {{Responded}} / {{Received}}
- Median response time: {{MedianHours}} hours
- % within SLA: {{WithinSLA}}%

C) Negative Review Management
- 1–2★ count: {{OneTwoCount}}
- 3★ count: {{ThreeCount}}
- Escalations opened: {{EscOpen}}
- Escalations resolved: {{EscResolved}}
- Open escalations: {{EscOpen}} - {{EscResolved}}

D) Content Quality / Brand Safety
- Replies flagged for approval: {{Flagged}}
- Policy-sensitive mentions (refund/legal/medical): {{SensitiveCount}}
- Any compliance incidents: {{YesNo}} (details)

E) Insights
- Top 3 themes: {{Theme1}}, {{Theme2}}, {{Theme3}}
- Suggested operational fix: {{OpsFix}}
- Suggested marketing highlight (use in ads/site): {{MarketingHighlight}}

F) Next Actions (owner + our team)
- Owner: {{OwnerTask1}} due {{DueDate1}}
- Owner: {{OwnerTask2}} due {{DueDate2}}
- Our team: {{OurTask1}}
- Our team: {{OurTask2}}

Notes on data collection (week 1)
- If direct posting access isn’t granted, response time SLA is measured to “draft delivered” rather than “posted,” and client confirms posting time.
- We do not request incentives for reviews or gate review requests; we keep all outreach compliant with platform policies.
