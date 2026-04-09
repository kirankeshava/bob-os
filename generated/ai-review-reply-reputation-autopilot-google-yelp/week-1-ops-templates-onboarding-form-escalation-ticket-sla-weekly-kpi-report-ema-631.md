# Week-1 Ops Templates — Onboarding Form, Escalation Ticket/SLA, Weekly KPI Report (Email + Sheet Layout)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:59:00.005Z

---

Below are 3 paste-ready templates for immediate fulfillment of the AI Review Reply & Reputation Autopilot.

====================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (Copy/Paste into Google Form or email)
Subject: Quick onboarding — Review Reply & Reputation Autopilot

Hi {{FirstName}},

To start your Review Reply & Reputation Autopilot, please reply to this email (or paste into a doc) with the details below. This lets us respond in your brand voice, stay policy-safe, and escalate negatives quickly.

Business + Locations
1) Business name + primary location address:
2) Website URL:
3) Phone number to display (if any):
4) Hours (if relevant):

Access / Posting Method
5) Google Business Profile (GBP): Can you add us as a Manager? (Preferred)
   - Email to invite: agent_bob_replit+review-bot@agentmail.to
6) Yelp: Which workflow do you prefer?
   A) We draft replies and you (or staff) post them in Yelp (default, fastest)
   B) You grant Yelp Business Owner/Manager access so we can post (if available)

Brand Voice + Guardrails
7) Describe your brand voice in 3–5 adjectives (e.g., warm, direct, premium, playful):
8) Any phrases we should ALWAYS use? (tagline, sign-off, etc.)
9) Any phrases/topics we should NEVER mention? (discounts, politics, medical claims, guarantees, etc.)
10) Standard sign-off name/title (e.g., “— Sam, Owner”):

Policies + Escalations
11) Who should we notify for negative reviews (name + email + phone)?
12) What counts as urgent? (examples: safety issue, discrimination claim, refund dispute, legal threat)
13) Approved remedy language (choose one):
   - We can invite them to call/ email to make it right
   - We can offer to re-do service
   - We can mention refunds (only if you approve)
14) Do you want us to request removal/dispute reviews? (We can guide; we won’t file disputes without explicit written approval.)

Offer/Promotions (Optional)
15) Any current offer we can mention in positive-review replies? (Optional)

Service Level
16) Target response window you want us to hit (12h / 24h / 48h):
17) Do you want approvals?
   - Auto-approve 4–5★ replies unless flagged (recommended)
   - Require approval on all replies

Confirmation
18) Reply “CONFIRMED” to authorize us to draft review responses on your behalf following the above guardrails.

Our service details page (for reference/legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to

====================================================
TEMPLATE 2 — NEGATIVE REVIEW ESCALATION TICKET + SLA (Copy/Paste into email or a Notion/Jira/Trello card)
Title: Escalation — New {{StarRating}}★ Review on {{Platform}} (Response due by {{DueTime}})

Client: {{BusinessName}}
Platform: Google / Yelp
Location: {{Location}}
Review Link: {{URL}}
Reviewer Name: {{ReviewerName}}
Star Rating: {{StarRating}}
Review Date/Time: {{Timestamp}}

Review Text (paste verbatim):
{{ReviewText}}

Auto-Detected Flags (check all that apply):
[ ] Refund/chargeback request
[ ] Safety issue / injury
[ ] Legal threat / lawsuit
[ ] Discrimination / harassment claim
[ ] HIPAA/medical privacy risk
[ ] Competitor / suspicious review
[ ] Profanity / hate speech
[ ] Staff named directly
[ ] Other: {{Other}}

Proposed Public Reply (brand-safe draft):
{{DraftReply}}

Private Resolution Plan (internal only):
- Goal (e.g., move offline, gather details, offer remedy):
- Contact method (call/email):
- Who owns it client-side:

SLA RULES (Default)
1) 4–5★ reviews: respond within 24 hours; auto-approve unless flagged.
2) 3★ reviews: respond within 24 hours; approval required.
3) 1–2★ reviews: respond within 12–24 hours; approval required.
4) Any flagged review above: immediate notify + approval required.

Posting Method
- Google Business Profile: we post if Manager access is granted; otherwise client posts.
- Yelp: default is “we draft, client posts” unless Yelp Business Owner access is granted.

Client Approval Request (copy/paste)
Subject: Approval needed — response draft for {{StarRating}}★ review
Body:
Hi {{ClientFirstName}},
A new {{StarRating}}★ review came in on {{Platform}}. Here’s a brand-safe response draft:

“{{DraftReply}}”

Reply APPROVE to post as-is, or reply with edits.
— Bob (agent_bob_replit+review-bot@agentmail.to)

====================================================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + Google Sheet layout)

A) EMAIL (send every Monday)
Subject: Weekly Reputation KPIs — {{BusinessName}} ({{WeekStart}}–{{WeekEnd}})

Hi {{FirstName}},

Here are your weekly reputation KPIs for {{WeekStart}}–{{WeekEnd}}.

1) New Reviews
- Google: {{G_New}} ({{G_5}}x5★ / {{G_4}}x4★ / {{G_3}}x3★ / {{G_2}}x2★ / {{G_1}}x1★)
- Yelp: {{Y_New}} ({{Y_5}}x5★ / {{Y_4}}x4★ / {{Y_3}}x3★ / {{Y_2}}x2★ / {{Y_1}}x1★)

2) Rating Trend
- Current Google rating: {{G_RatingNow}} (Δ {{G_Delta}} vs last week)
- Current Yelp rating: {{Y_RatingNow}} (Δ {{Y_Delta}} vs last week)

3) Responsiveness
- Response rate (Google): {{G_ResponseRate}}%
- Response rate (Yelp): {{Y_ResponseRate}}%
- Median response time: {{MedianResponseTime}}

4) Negative Review Handling
- New 1–2★ reviews: {{NegCount}}
- Escalations opened: {{EscOpened}}
- Escalations resolved/closed: {{EscClosed}}
- Open escalations still pending: {{EscOpen}}

5) Top Themes This Week (from review text)
- {{Theme1}}
- {{Theme2}}
- {{Theme3}}

6) Recommended Action (1–2 items)
- {{Action1}}
- {{Action2}}

If you want, we can also add an optional review-request SMS flow to increase review volume (helps ratings stabilize faster). Reply “SMS” and we’ll send setup details.

Reference (service page): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to


B) GOOGLE SHEET LAYOUT (tabs + columns)
Tab 1: Weekly Summary
Columns:
A Week Start
B Week End
C Google New Reviews
D Yelp New Reviews
E Google Rating (Start)
F Google Rating (End)
G Yelp Rating (Start)
H Yelp Rating (End)
I Total Responses Posted
J Google Response Rate
K Yelp Response Rate
L Median Response Time (hrs)
M 1–2★ Count
N Escalations Opened
O Escalations Closed
P Notes / Top Themes

Tab 2: Review Log
Columns:
A Date
B Platform (Google/Yelp)
C Location
D Reviewer
E Stars
F Review Text (short)
G Reply Drafted (Y/N)
H Reply Posted (Y/N)
I Posted By (Us/Client)
J Time to Respond (hrs)
K Escalated (Y/N)
L Escalation ID
M Outcome (Resolved/Pending)

Tab 3: Escalations
Columns:
A Escalation ID
B Date Opened
C Platform
D Stars
E Issue Type (refund/safety/staff/etc.)
F Owner (client)
G Status
H Date Closed
I Resolution Notes

Tab 4: Pipeline (optional if you want one sheet for business ops)
Columns:
A Date
B Leads Sent
C Replies
D Calls Booked
E Shows
F Closes
G Cash Collected
H MRR Added

All templates above are designed to work without any Google/Yelp API work in week 1 by using: (1) GBP Manager access where possible, and (2) Yelp “draft + client posts” as the default.
