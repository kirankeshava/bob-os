# Ops Templates Bundle — Onboarding Intake + Escalation/SLA + Weekly KPI Report (Copy-Ready)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:17:51.366Z

---

Below are 3 paste-ready templates to operate the AI Review Reply & Reputation Autopilot service in week 1 without any API build. All customer-facing sections reference the business website and inbox.

TEMPLATE 1 — ONBOARDING QUESTIONNAIRE (CLIENT INTAKE FORM)
Title: Review Reply Autopilot — Onboarding Intake
Intro text to client: Thanks for signing up. This is the fastest way to go live. If you have questions, email agent_bob_replit+review-bot@agentmail.to. Service info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

A) Business basics
1) Business name:
2) Website:
3) Primary location address(es):
4) Hours:
5) Phone:
6) Booking link (if any):
7) Primary services (top 5):
8) Primary differentiators (top 3):

B) Review platforms + access
9) Google Business Profile URL:
10) Do you grant GBP Manager access? (Yes/No)
   If Yes: invite agent_bob_replit+review-bot@agentmail.to as Manager.
11) Yelp Business page URL:
12) Do you grant Yelp Business Owner/Manager access? (Yes/No)
   If No, we will use the Client-Post workflow: we draft replies and you paste/post.
13) Who should receive negative-review alerts? (name, email, phone)
14) Backup contact for escalations:

C) Brand voice + response rules
15) Choose voice (pick one): Warm & grateful / Professional & concise / Upbeat & friendly / Premium & formal
16) Phrases to always include (optional):
17) Phrases to never use (banned phrases list):
18) Do you want to mention offers/discounts in replies? (Never / Only on 5-star / Only on request / Case-by-case)
19) Keywords that require approval before posting (examples: refund, lawsuit, injury, HIPAA/medical, insurance, discrimination, harassment):
20) Your standard customer service resolution policy (refund window, redo policy, etc.):

D) Escalation policy preferences
21) For 1–2 star reviews, should we (pick one):
   a) Always draft + request approval before posting
   b) Draft + post immediately unless flagged
22) For 3-star reviews, should we: Auto-post / Approval required
23) Private resolution preference: Ask for a call / Ask for email / Ask to visit in-person
24) Any legal/compliance notes we must follow:

E) Reporting
25) Weekly report recipient(s) email:
26) Preferred report day/time (e.g., Monday 9am local):
27) Primary goal metric (pick one): More leads / Higher rating / Faster response / Fewer negatives / All

Go-live checklist (internal note): once form is submitted, confirm access, set SLA, create escalation contacts, and send “Live in 24 hours” confirmation.


TEMPLATE 2 — ESCALATION TICKET + SLA (INTERNAL + CLIENT-FACING)
Title: Review Escalation Ticket — Action Required
Send-to: Primary + Backup escalation contacts
From: agent_bob_replit+review-bot@agentmail.to

Subject: Escalation: New {Rating}-Star Review on {Platform} — Approval/Resolution Needed

Body:
Hi {Name},

A new review needs escalation handling under our Autopilot rules.

Business: {Business Name}
Platform: {Google or Yelp}
Rating: {1–3 stars}
Reviewer name: {Name}
Date/time: {Timestamp}
Review link: {URL}
Review text (verbatim):
“{Copy review text}”

Recommended public reply draft (ready to post):
“{Draft response}”

Why this was escalated (check all that apply):
- Rating ≤ 3 stars
- Mentions refund/chargeback
- Mentions safety/injury
- Mentions legal action
- Mentions medical/insurance/privacy
- Contains profanity/hate speech
- Requests direct compensation
- Other: {Reason}

What we need from you (choose one):
A) Approve reply as-is
B) Approve with edits (paste edits)
C) Do not post; handle privately first

SLA (service-level expectations):
- 4–5★ reviews: drafted and posted (or sent for client-post) within 24 hours unless flagged.
- 3★ reviews: drafted within 24 hours; posting depends on approval setting.
- 1–2★ reviews: drafted within 12–24 hours; approval required by default.
- If no approval is received within 48 hours, we will send one reminder. After 5 business days with no response, the item is marked “Pending Client” and excluded from response-time KPI calculations.

Client-post workflow (if you did not grant platform access):
We will send the final reply text. Please paste it into {Google/Yelp} under the review and click Post. Reply to this email “Posted” when done.

Thanks,
Bob
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


TEMPLATE 3 — WEEKLY KPI REPORT (EMAIL + GOOGLE SHEET LAYOUT)
A) Weekly email (client-facing)
Subject: Weekly Reputation Report — {Business Name} — Week of {Date}

Body:
Hi {Name},

Here’s your weekly Reputation Autopilot summary.

Scorecard (last 7 days):
- New reviews: {#}
- Average rating (current): {X.X}
- Average rating (7-day change): {+/- X.X}
- Responses posted: {#}
- Response rate: {#%}
- Median response time: {# hours}
- Negative reviews (1–2★): {#}
- Escalations opened: {#}
- Escalations resolved: {#}

Highlights:
- Top positive themes: {Theme 1}, {Theme 2}, {Theme 3}
- Top friction themes: {Theme 1}, {Theme 2}
- Notable review(s): {1–2 bullets}

Next-week actions (recommended):
1) {Action}
2) {Action}
3) {Action}

If you want, we can also enable add-ons like SMS review requests or competitor benchmarking. Reply “Add-ons” and I’ll send options.

Thanks,
Bob
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

B) Google Sheet layout (tabs + columns)
Tab 1: Weekly Scorecard
Columns:
- Week Start Date
- Week End Date
- Platform (Google/Yelp/Both)
- New Reviews (#)
- Total Reviews (lifetime)
- Avg Rating (current)
- Avg Rating (prev week)
- Avg Rating Δ
- Responses Posted (#)
- Response Rate (%) = Responses Posted / New Reviews (or / Total reviews received that week)
- Median Response Time (hrs)
- Negative Reviews (#1–2★)
- Escalations Opened (#)
- Escalations Resolved (#)
- Open Escalations (#)
- Notes / Themes

Tab 2: Review Log
Columns:
- Date
- Platform
- Reviewer
- Rating
- Review Text
- Drafted Response (Y/N)
- Posted (Y/N)
- Posted By (Autopilot/Client)
- Time to First Draft (hrs)
- Time to Post (hrs)
- Escalated (Y/N)
- Escalation Reason
- Status (Pending/Approved/Posted/Client Pending/Resolved)

Tab 3: Pipeline KPI Dashboard (30-day execution)
Columns (daily rows):
- Date
- Leads sent
- Replies
- Calls booked
- Calls showed
- Closes
- Cash collected ($)
- MRR added ($)
- Notes (objections, wins)

Operating cadence note (internal): update Pipeline tab daily; send Weekly Scorecard every Monday; audit Review Log twice weekly to ensure SLA compliance.
