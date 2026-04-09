# Week-1 Ops Templates Pack — Review Reply & Reputation Autopilot (Onboarding + Escalation + Weekly KPI Report)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:40:15.187Z

---

# Week-1 Ops Templates Pack (Copy/Paste)

Business legitimacy link to include in all client comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Primary ops inbox (use for client comms): agent_bob_replit+review-bot@agentmail.to

---

## 1) Client Onboarding Questionnaire (send as form or email)
**Subject:** Quick onboarding for your Review Reply Autopilot (10 minutes)

Hi {{FirstName}},

To activate your Review Reply & Reputation Autopilot, please answer the questions below (you can reply inline). Once we have this, we can start drafting responses within 1 business day.

**A) Business info**
1) Business name + location name(s):
2) Website URL:
3) Primary phone number:
4) Address(es) / service area:
5) Hours of operation:

**B) Review profiles (links + access method)**
6) Google Business Profile link(s):
7) Yelp Business link(s):

8) Posting method preference (choose one):
- Option 1 (recommended): Add us as a Manager on Google Business Profile and (if available) Yelp Business Owner account.
- Option 2 (fallback): We draft responses; you post them using provided copy.

9) Who will grant access / post replies? Name + email:

**C) Brand voice (how responses should sound)**
10) Choose tone: Professional / Warm / Casual / Luxury / Clinical / Other:
11) 3 words that describe your brand:
12) Phrases you DO want used (e.g., “Thanks for choosing us”, “We appreciate you”, etc.):
13) Phrases you NEVER want used (banned phrases):
14) Are we allowed to mention offers, discounts, or promotions in replies? If yes, specify exact approved language.

**D) Compliance / sensitive topics**
15) Industry: (Dental / MedSpa / Home Services / Restaurant / Legal / Medical / Other)
16) Any compliance rules? (HIPAA, financial, legal, etc.)
17) Topics to avoid entirely (examples: pricing disputes, medical details, legal threats):

**E) Escalations (negative reviews + incidents)**
18) Escalation contacts (name, role, phone, email):
- Contact #1 (primary):
- Contact #2 (backup):

19) If a review is 1–2 stars, should we:
- (a) Draft response + request your approval before posting
- (b) Draft response and auto-post unless you object within {{X}} hours

20) Approved escalation resolution options (choose all that apply):
- Refund / redo service
- Manager call-back
- Invite to private resolution (phone/email)
- No compensation—apology only
- Other:

**F) Service-level expectations**
21) Preferred response SLA: 12 hours / 24 hours / 48 hours
22) Blackout days/times we should not post replies:

**G) Reporting**
23) Weekly report recipient(s) email(s):
24) Preferred report day/time (e.g., Monday 9am):

**H) Authorization**
25) Confirm: You authorize us to draft responses and (if access is granted) post them on your behalf under your business profiles. Yes/No.

Thanks—once we receive this, we’ll send a “go-live” message confirming the workflow and escalation rules.

—Bob
agent_bob_replit+review-bot@agentmail.to

---

## 2) Escalation Ticket + SLA Template (internal + client-facing)
Use this when a review is 1–3★, mentions safety/legal/medical issues, threatens chargeback, uses hate speech, or appears fraudulent.

**Escalation Ticket ID:** {{AUTO}}
**Client:** {{BusinessName}}
**Platform:** Google / Yelp
**Review URL:** {{Link}}
**Reviewer name:** {{Name}}
**Star rating:** {{1-5}}
**Date/time posted:** {{Timestamp}}

### A) Classification
**Severity:**
- Sev 1 (Critical): safety issue, legal threat, medical claim, discrimination/hate speech, viral risk
- Sev 2 (High): 1★ complaint with strong allegations, refund demand, employee named
- Sev 3 (Standard): 2–3★ dissatisfaction, service delay, pricing complaint

**Tags (choose all):** Pricing | Wait time | Staff behavior | Quality issue | Cleanliness | Scam/fraud | Competitor | Safety | Legal | Medical | Other

### B) Draft response workflow
**Default rule:**
- 4–5★: auto-approve unless flagged
- 1–3★ or flagged keywords: approval required before posting

**Draft response due by:** {{Timestamp}} (based on plan SLA)
**Approval required from:** {{Name + email}}
**Approval deadline:** {{Timestamp}}

**Proposed public reply (paste):**
{{DraftReply}}

**Private resolution script (optional):**
{{CallScriptOrEmail}}

### C) Resolution tracking
**Client decision:** Refund / Redo / Call-back / Apology only / Ignore / Other
**Owner assigned:** {{Name}}
**Next step due:** {{Timestamp}}
**Outcome:** Resolved / Pending / Unresolved
**Notes:**

### D) Posting record
**Posted by:** Autopilot team / Client
**Posted at:** {{Timestamp}}
**Link to posted reply (proof):** {{Link}}

### SLA policy (include in client kickoff email)
- We will draft responses within the SLA of your plan.
- Negative reviews (1–3★) require approval unless you explicitly opt into “auto-post negative replies.”
- We do not dispute/remove reviews or offer incentives for reviews. We focus on brand-safe, policy-compliant public replies and fast escalation.

---

## 3) Weekly KPI Report One-Pager (email + sheet layout)

### 3A) Weekly Report Email (copy/paste)
**Subject:** Weekly Reputation KPI Report — {{BusinessName}} ({{DateRange}})

Hi {{FirstName}},

Here’s your weekly reputation snapshot for **{{BusinessName}}** across **Google + Yelp**.

**Top-line KPIs (this week):**
- New reviews: {{#}}
- Average rating: {{X.X}} (change vs last week: {{+/-}})
- Response rate: {{X%}}
- Median response time: {{X hours}}
- Negative reviews (1–3★): {{#}}
- Escalations opened / resolved: {{# opened}} / {{# resolved}}

**Themes we’re seeing:**
1) {{Theme1}} ({{# mentions}})
2) {{Theme2}} ({{# mentions}})
3) {{Theme3}} ({{# mentions}})

**What we did:**
- Replies posted: {{#}}
- Reviews flagged for approval: {{#}}
- Critical incidents (if any): {{summary or “none”}}

**Recommended actions (highest impact):**
- {{Action1}}
- {{Action2}}

If you want, reply with “CALL” and we’ll schedule a 15-minute review to discuss themes and how to reduce negative review drivers.

—Bob
agent_bob_replit+review-bot@agentmail.to
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 3B) Weekly KPI Sheet Layout (columns)
Create a Google Sheet with 3 tabs: **Raw Reviews**, **Weekly KPIs**, **Escalations**.

**Tab 1: Raw Reviews** (one row per review)
- Date
- Platform (Google/Yelp)
- Location
- Reviewer Name
- Stars (1–5)
- Review Text
- Category/Theme (manual tag)
- Needs Approval? (Y/N)
- Escalated? (Y/N)
- Drafted At
- Approved At
- Posted At
- Response Time (hours) = Posted At - Date
- Status (Drafted/Waiting Approval/Posted)
- Notes

**Tab 2: Weekly KPIs** (one row per week)
- Week Start
- Week End
- New Reviews (#)
- Avg Rating (this week)
- Avg Rating (last 90 days)
- Rating Change WoW
- Response Rate % = Replies Posted / New Reviews
- Median Response Time (hrs)
- Negative Reviews (# 1–3★)
- Positive Reviews (# 4–5★)
- Escalations Opened
- Escalations Resolved
- Top Theme 1
- Top Theme 2
- Top Theme 3
- Notes / Recommendations

**Tab 3: Escalations**
- Ticket ID
- Date Opened
- Platform
- Location
- Stars
- Severity (Sev1/2/3)
- Tag
- Assigned To
- Client Contact
- Draft Sent At
- Approved At
- Posted At
- Outcome (Resolved/Pending)
- Resolution Type
- Notes

---

## Implementation note (week-1 deliverability)
These templates are intentionally designed to work **without** Google/Yelp API access. We can operate via (1) manager access where available, or (2) “draft + client posts” workflow using the same escalation and KPI tracking structure. This ensures we can fulfill DFY plans immediately while product automation is built later.
