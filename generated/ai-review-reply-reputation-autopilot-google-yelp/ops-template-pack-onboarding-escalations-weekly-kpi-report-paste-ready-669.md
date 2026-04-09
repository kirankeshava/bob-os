# Ops Template Pack — Onboarding + Escalations + Weekly KPI Report (Paste-Ready)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:22:49.257Z

---

Below are 3 paste-ready templates for immediate operations. They reference the business website (https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1) and contact email (agent_bob_replit+review-bot@agentmail.to).

========================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (copy into Typeform/Google Form)
========================================
Title: Review Reply & Reputation Autopilot — Onboarding

Intro (top of form):
Thanks for choosing AI Review Reply & Reputation Autopilot. We draft brand-safe responses to Google Business Profile and Yelp reviews, escalate negative reviews, and send a weekly KPI report.
Legitimacy/Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Questions:
1) Business name:
2) Primary contact name + role:
3) Best email for alerts/approvals:
4) Best phone number (for urgent escalations only):
5) Locations covered (address + GBP listing link for each):
6) Yelp business page link (if applicable):
7) Review platforms in scope (select): Google / Yelp / Other (specify)

Brand voice & compliance
8) Choose voice (select): Friendly & casual / Professional & concise / Warm & empathetic / Luxury / Other (describe)
9) “Do say” phrases/keywords (e.g., ‘family-owned’, ‘same-day appointments’):
10) “Do NOT say” phrases (banned terms, competitor names, promos, sensitive claims):
11) Regulated industry? (select): Healthcare / Dental / Legal / Financial / Other / None
12) Compliance restrictions (e.g., no medical advice, no diagnosis language, no pricing promises):

Escalation & approvals
13) Who should we notify for negative reviews? (name + email + phone)
14) Negative review definition for your business (select all): 1–2 stars / 3 stars / mentions ‘refund’ / mentions ‘lawsuit’ / mentions discrimination/harassment / safety issue / other keywords (list)
15) Approval preference:
   A) Auto-post 4–5★ responses unless flagged; require approval for 1–3★
   B) Require approval for all responses
   C) Auto-post all unless flagged (not recommended)
16) SLA preference (select): Respond within 24h / 12h / Same-day

Offers & resolution
17) If a reviewer had a bad experience, what is your preferred resolution CTA? (select): call us / email us / visit location / DM (platform)
18) Preferred contact info to include in responses (phone/email):
19) Any current promotions we are allowed to mention? (Yes—details / No)

Access (week-1 deliverable without APIs)
20) Google Business Profile access (select):
   A) Add us as Manager
   B) We will client-post (you post our drafts)
   If A: Provide the email to add: agent_bob_replit+review-bot@agentmail.to
21) Yelp access (select):
   A) Add us as a user on Yelp for Business
   B) We will client-post on Yelp (recommended default for week 1)

Weekly KPI report
22) Weekly report recipients (emails):
23) Preferred day/time to receive weekly report (e.g., Monday 9am):
24) Anything else we should know? (free text)

Compliance acknowledgement (required checkbox):
25) I confirm we are not requesting review gating or incentives, and we understand reviews cannot be deleted by this service. (Checkbox)

========================================
TEMPLATE 2 — ESCALATION TICKET + SLA (copy into Google Form / Notion)
========================================
Title: Negative Review Escalation Ticket

Purpose: Track 1–3★ reviews and sensitive issues end-to-end (response approval, resolution, follow-up).

Fields:
1) Ticket ID (auto):
2) Date/time detected:
3) Platform (Google / Yelp):
4) Location:
5) Reviewer name/handle:
6) Star rating:
7) Review text (paste full text):
8) Link to the review:
9) Category (select): Service quality / Staff behavior / Wait time / Billing / Product / Safety / Discrimination/harassment / Other
10) Sensitivity flags (select all): Legal threat / Refund demand / Injury/safety / Hate/discrimination / Private data disclosed / Media/social threat

Response workflow
11) Draft response prepared by (Bob):
12) Draft response text (paste):
13) Approval required? (Yes/No)
14) Approver name + email:
15) Approval status (Pending / Approved / Changes requested / Rejected)
16) Final response posted? (Yes—timestamp / No)
17) Posting method (select): We posted (GBP Manager access) / Client-posted / Other

Resolution workflow (optional but recommended)
18) Internal action owner (client team member):
19) Proposed resolution steps:
20) Customer contacted offline? (Yes/No)
21) Outcome (select): Resolved / In progress / Unable to contact / Refund issued / Other
22) Follow-up scheduled (date):

SLA policy (paste into the top of the ticket form or SOP doc)
- 4–5★ reviews: response drafted within 24 hours (or 12h on Pro). Auto-post allowed unless flagged.
- 1–3★ reviews or any flagged content: escalation ticket created within 4 business hours; draft prepared within 24 hours; posting only after approval (unless client opts out).
- Emergency flags (legal threat/safety/discrimination/private data): notify client within 1 hour during business hours; do not post until explicit written approval.

========================================
TEMPLATE 3 — WEEKLY KPI REPORT (email + Google Sheet layout)
========================================
A) Weekly KPI Email (copy/paste)
Subject: Weekly Reputation KPI Report — {Business Name} — Week of {DATE}

Hi {Name},

Here’s your weekly Reputation KPI snapshot (Google + Yelp). Full details are tracked in our internal sheet; reply to this email if you want any wording updates to your brand voice.

1) Review volume & rating
- New reviews this week: Google {#} | Yelp {#}
- Average rating (current): Google {x.x} | Yelp {x.x}
- Rating trend vs last week: {up/down/flat}

2) Responsiveness
- Responses posted: {#}
- Response rate: {#}%
- Median response time: {#} hours
- SLA met: {Yes/No} (notes if no)

3) Risk & escalations
- Negative reviews (1–3★): {#}
- Escalations created: {#}
- Resolved escalations: {#}
- Open escalations: {#}
- Top issues mentioned: 1) {theme} 2) {theme} 3) {theme}

4) Next week focus
- Recommended operational fix: {one sentence}
- Suggested response tweak (brand voice): {one sentence}

Access/Support
If you need to add/remove approvers or update escalation rules, email us: agent_bob_replit+review-bot@agentmail.to
Service info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob
AI Review Reply & Reputation Autopilot

B) Weekly KPI Sheet Layout (create in Google Sheets; copy headers)
Tab 1: Weekly Summary
Columns:
- Week Start Date
- Location
- Platform (Google/Yelp)
- New Reviews
- Avg Rating (Start of Week)
- Avg Rating (End of Week)
- Rating Change
- Responses Posted
- Response Rate (%)
- Median Response Time (hrs)
- # Escalations Created
- # Escalations Resolved
- # Escalations Open
- Top Theme 1
- Top Theme 2
- Top Theme 3
- Notes / Actions

Tab 2: Review Log
Columns:
- Date
- Platform
- Location
- Reviewer Name
- Stars
- Review Text
- Review URL
- Draft Response
- Approval Needed? (Y/N)
- Approved By
- Posted? (Y/N)
- Posted Timestamp
- Escalated? (Y/N)
- Escalation Ticket ID
- Category
- Theme Tag

Tab 3: Escalations
Columns:
- Ticket ID
- Date Detected
- Platform
- Location
- Stars
- Category
- Sensitivity Flags
- Draft Prepared (Y/N)
- Approval Status
- Posted (Y/N)
- Resolution Owner
- Status (Open/In Progress/Resolved)
- Outcome
- Follow-up Date

Operational constraints (paste into footer of sheet)
- We do not offer review gating or incentives.
- We do not impersonate staff; responses are posted via authorized access or client-post workflow.
- Yelp API access may be limited; week-1 default is: we draft; client posts (unless access granted).
