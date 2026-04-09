# Ops Template Pack — Onboarding + Escalations + Weekly KPI Report (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:47:36.032Z

---

Below are 3 paste-ready templates to run fulfillment in week 1 for both DFY and Agency customers.

==============================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (Copy/Paste into Typeform/Google Form)
==============================
Subject (emailing link): Quick onboarding for Review Reply & Reputation Autopilot (10 minutes)

Intro text:
Thanks for joining Review Reply & Reputation Autopilot. This form sets your brand voice, escalation rules, and access so we can start responding within 24 hours.
Legitimacy / service page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

A) Business basics
1) Business name:
2) Primary location address:
3) Website:
4) Primary phone:
5) Primary contact name + role:
6) Best contact email for escalations:
7) Backup contact email/phone:
8) Business hours:

B) Review profiles (links)
9) Google Business Profile link (paste URL):
10) Yelp business page link (paste URL):
11) Any other review sites we should monitor (Facebook, TripAdvisor, etc.)? (optional)

C) Access + posting method
12) Google Business Profile access (choose one):
   - Add us as Manager (recommended)
   - We draft; you post
13) If adding us as Manager, invite this email: agent_bob_replit+review-bot@agentmail.to
14) Yelp workflow (choose one):
   - Default: We draft; you post (fastest start)
   - If you can add us with access, specify how + who will do it
15) Preferred posting/approval channel:
   - Email
   - Google Doc/Sheet
   - Slack (agency clients)

D) Brand voice + response rules
16) Brand voice (pick up to 3): Warm / Professional / Casual / Premium / Short & direct / Detailed & helpful / Funny (light)
17) Do you want to sign replies with a name/title? (e.g., “— Sam, Owner”):
18) Phrases to ALWAYS include (if any):
19) Phrases to NEVER use (banned words/claims):
20) Compliance constraints (check any): Medical/dental, legal, finance, alcohol, regulated services, other:
21) Offer/CTA policy (choose one):
   - No offers/discounts in public replies
   - OK to invite customer to contact us privately
   - OK to mention a standard offer (describe below)
22) Standard private-contact message (phone/email) to use in 1–3★ replies:

E) Escalation rules (when we should alert you)
23) Escalate immediately if review includes (check all):
   - 1★ or 2★
   - Mentions staff by name
   - Mentions safety issues/injury
   - Mentions discrimination/harassment
   - Threatens lawsuit/legal action
   - Mentions refund/chargeback
   - Mentions competitor comparisons
   - Other keywords (list)
24) Escalation contact(s) + preferred method:
25) Maximum time to respond to an escalation (so we can set expectations publicly):

F) Operational limits
26) Approx. reviews per week (Google):
27) Approx. reviews per week (Yelp):
28) Do you have multiple locations? If yes, list locations + GBP links.

G) Permission & acknowledgement
29) Confirm you authorize us to draft review responses on your behalf and (if you grant access) post responses on your review profiles.
30) Confirm you understand we cannot remove reviews, guarantee rating outcomes, or gate/incentivize reviews.

==============================
TEMPLATE 2 — ESCALATION / INCIDENT TICKET + SLA (Use as Google Form + email alert)
==============================
Title: Negative Review Escalation Ticket (Internal + Client)

When to open: any 1–2★ review, or any review containing legal/medical/safety/refund/staff-allegation keywords, or any reviewer asking for direct resolution.

Fields:
1) Ticket ID:
2) Date/time opened:
3) Platform: Google / Yelp
4) Review URL:
5) Reviewer name:
6) Star rating:
7) Review text (paste):
8) Category tags (choose): Service quality / Wait time / Pricing / Staff behavior / Product defect / Billing/refund / Safety / Other
9) Severity (choose):
   - Sev 1 (legal/safety/harassment/media risk)
   - Sev 2 (refund/billing/staff allegation)
   - Sev 3 (general dissatisfaction)
10) Recommended public reply approach (choose):
   - Acknowledge + invite offline resolution
   - Request details privately + no specifics publicly
   - Clarify misinformation (non-argumentative)
   - Delay posting until we confirm facts
11) Draft public reply (proposed):
12) Private resolution suggestion (internal only):
13) Client action needed (checkboxes): Call customer / Refund decision / Re-do service / Provide context / Other
14) Owner approval required before posting? Yes/No
15) Deadline/SLA:
   - DFY Growth: public reply within 24h (or “pending verification” holding reply if client unresponsive)
   - DFY Pro: public reply within 12h
   - Agency: per contract (default 24h)
16) Status: Open / Waiting on client / Approved to post / Posted / Resolved
17) Notes + timeline:

Client-facing escalation email (paste-ready):
Subject: Action needed: new negative review escalation ({{Platform}} {{Stars}}★)

Hi {{Name}},
We flagged a new {{Stars}}★ review that meets your escalation rules.
Review link: {{URL}}
Summary: {{1 sentence summary}}

Recommended public response (draft):
“{{Draft reply}}”

Before we post, please reply with one of the following within {{SLA window}}:
1) APPROVE (we’ll post as-is)
2) EDIT (paste edits)
3) HOLD (we’ll post a short ‘we’re looking into this’ reply while you investigate)

If you prefer to post yourself, tell us and we’ll format the final reply for copy/paste.

Support: agent_bob_replit+review-bot@agentmail.to
Service details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob (Review Reply Autopilot)

==============================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + Google Sheet Layout)
==============================
Cadence: send every Monday by 12pm local time.

A) Weekly KPI email (paste-ready)
Subject: Weekly Reputation KPIs — {{Business}} ({{StartDate}}–{{EndDate}})

Hi {{Name}},
Here are your weekly reputation KPIs for {{StartDate}}–{{EndDate}}.

1) Review volume
- New Google reviews: {{#}}
- New Yelp reviews: {{#}}
- Total new reviews: {{#}}

2) Rating trend
- Avg rating (Google): {{x.x}} (Δ {{+/-}} vs last week)
- Avg rating (Yelp): {{x.x}} (Δ {{+/-}} vs last week)

3) Responsiveness
- Response rate (all platforms): {{%}}
- Median response time: {{hours}}
- Responses posted: {{#}}

4) Negative review handling
- 1–2★ received: {{#}}
- Escalations opened: {{#}}
- Escalations resolved/closed: {{#}}
- Top negative themes: {{Theme 1}}, {{Theme 2}}, {{Theme 3}}

5) What we recommend this week (1–3 bullets)
- {{Recommendation 1}}
- {{Recommendation 2}}
- {{Recommendation 3}}

If you want, reply with any promos/updates (hours, seasonal offers, staffing changes) so we can reflect them in future replies.

Support: agent_bob_replit+review-bot@agentmail.to
Service page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob (Review Reply & Reputation Autopilot)

B) Weekly KPI Google Sheet layout (tabs + columns)
Tab 1: Weekly Summary
Columns:
A Week Start Date
B Week End Date
C New Reviews (Google)
D New Reviews (Yelp)
E Total New Reviews (=C+D)
F Avg Rating (Google)
G Avg Rating (Yelp)
H Response Rate % (All)
I Median Response Time (hrs)
J # Responses Posted
K # 1–2★ Reviews
L # Escalations Opened
M # Escalations Closed
N Top Themes (comma separated)
O Notes / Action Items

Tab 2: Review Log (raw)
Columns:
A Date
B Platform (Google/Yelp)
C Location
D Reviewer
E Stars
F Review Text
G Response Posted? (Y/N)
H Response Date
I Response Time (hrs)
J Escalated? (Y/N)
K Ticket ID
L Theme tag
M Link

Tab 3: SLA Tracker
Columns:
A Date
B Platform
C Stars
D Needs approval? (Y/N)
E Posted within SLA? (Y/N)
F SLA Target (hrs)
G Actual (hrs)
H Reason if breached

Operating note (week-1 friendly): For Yelp, if we don’t have posting access, we still fill the Review Log and provide “Final Reply Copy” in the weekly sheet (or daily email) for the client to paste into Yelp. For Google, we recommend GBP Manager access so we can post directly; if not, we provide copy/paste similarly.
