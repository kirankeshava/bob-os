# Ops Template Pack — Review Reply & Reputation Autopilot (Week-1 Deliverable, No-API)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:32:09.243Z

---

# 1) Client Onboarding Questionnaire (paste into Typeform/Google Form)

**Intro (copy):**
Thanks for starting the AI Review Reply & Reputation Autopilot. This takes ~6 minutes. Once submitted, we’ll start drafting responses within **1 business day**.

Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support: agent_bob_replit+review-bot@agentmail.to

## A) Business details
1. Business name:
2. Primary location address:
3. Website:
4. Primary phone:
5. Main point of contact (name, role):
6. Best escalation contact (name + email + mobile):

## B) Review profiles
7. Google Business Profile link:
8. Do you grant GBP **Manager** access? (Yes/No)
   - If yes: invite **agent_bob_replit+review-bot@agentmail.to** as Manager.
   - If no: we will draft responses and send them to you to post.
9. Yelp business page link:
10. Do you have Yelp Business Owner access? (Yes/No)
   - If yes: add us as a user if possible, or we’ll coordinate posting.
   - If no: default = **client-post workflow** (we draft; you paste/post).

## C) Brand voice & compliance
11. Pick a voice (choose one): Warm & grateful / Professional & concise / Luxury & calm / Friendly & casual / Other (describe)
12. 3 phrases you WANT us to use (optional):
13. 3 phrases you NEVER want us to use (required if regulated):
14. Do-not-mention list (pricing, promos, competitors, staff names, etc.):
15. Regulated or sensitive category? (Medical/Dental/Legal/Financial/Other/No)
16. Required disclaimers (if any):

## D) Service recovery + escalation rules
17. What situations must be escalated (check all):
   - Refund request
   - Safety issue/injury
   - Discrimination/harassment claims
   - Threat of lawsuit
   - HIPAA/PII exposure
   - Competitor attack / fake review suspicion
   - Staff misconduct allegation
   - Other: ____
18. Standard resolution offers allowed (check all):
   - Invite to call manager
   - Offer to re-do service
   - Offer refund (requires approval)
   - Offer credit
   - None—escalate only
19. Escalation response time expectation from your team:
   - Same day / 24h / 48h

## E) Approval preferences
20. Approval mode (choose one):
   - **Auto-post 4–5★** responses (with our brand-safe template); require approval for 1–3★
   - Require approval for all responses
   - We draft everything; you post everything (recommended for Yelp without owner access)
21. Contacts who can approve (emails):

## F) Weekly KPI report
22. Where should the weekly report be sent? (emails)
23. Preferred reporting day/time:
24. Top business goals impacted by reviews (choose up to 2): More calls / More bookings / Higher close rate / Higher ticket / Reduce churn / Better staff morale / Other

---

# 2) Escalation Ticket + SLA (copy into Airtable/Trello/Google Form)

**Ticket title format:** `[Platform] [Star rating] [Theme] [Location] [Date]` e.g., `Google | 1★ | Refund Demand | Main St | 2026-04-09`

## Ticket fields
- Client name:
- Location:
- Platform: Google / Yelp
- Review URL:
- Reviewer name:
- Star rating: 1 / 2 / 3 / 4 / 5
- Posted date/time:
- Detected date/time:
- Category (pick one): Refund/Service failure | Staff issue | Safety | Legal threat | Fake/competitor | Sensitive data | Other
- Summary (2–3 sentences):
- Draft public response status: Not started / Drafted / Needs approval / Posted
- Proposed public response (paste):
- Private outreach recommended? (Yes/No)
- Client action required (bullets):
- Owner/manager assigned:
- Due by (auto):

## SLA rules (paste as policy)
- **Detection:** Checked daily business days (or via platform email alerts when available).
- **Drafting SLA:**
  - 4–5★: draft within **24h**
  - 1–3★: draft within **12–24h** + escalation ticket created
- **Approval:** If client approval required, clock pauses until client responds.
- **Posting:**
  - Google: we post if Manager access granted; otherwise send paste-ready response to client.
  - Yelp: default **client-post workflow** unless owner access granted.
- **Always escalate immediately:** legal threats, safety issues, discrimination claims, HIPAA/PII, blackmail/extortion.

---

# 3) Weekly KPI Report (email template + Google Sheet layout)

## Weekly email (copy/paste)
**Subject:** Weekly Reputation KPI Report — {{Business}} ({{Week Start}}–{{Week End}})

Hi {{Name}},

Here’s your weekly reputation snapshot for **{{Business}}**.

**Topline KPIs**
- New reviews: **{{#}}** (Google: {{#}}, Yelp: {{#}})
- Average rating (current): **{{X.XX}}** (change vs last week: {{+/-X.XX}})
- Responses posted: **{{#}}**
- Response rate: **{{X%}}**
- Median response time: **{{X hrs}}**
- Negative reviews (1–3★): **{{#}}**
- Escalations opened: **{{#}}** | Resolved: **{{#}}**

**Themes we’re seeing (top 3)**
1) {{Theme}} — {{count}}
2) {{Theme}} — {{count}}
3) {{Theme}} — {{count}}

**What we did this week**
- {{Bullet 1}}
- {{Bullet 2}}
- {{Bullet 3}}

**Open items / needs your input**
- {{Escalation link or summary}}

If you need anything, reply here: agent_bob_replit+review-bot@agentmail.to
More about the service: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob

## Google Sheet layout (tabs + columns)
**Tab 1: Reviews_Log**
Columns:
- A Date detected
- B Platform (Google/Yelp)
- C Location
- D Review date
- E Reviewer
- F Stars (1–5)
- G Review text (raw)
- H Theme tag (manual: pricing, wait time, staff, quality, etc.)
- I Sentiment (Pos/Neutral/Neg)
- J Drafted? (Y/N)
- K Draft link (doc/url)
- L Approval required? (Y/N)
- M Approved date
- N Posted? (Y/N)
- O Posted date/time
- P Response time (hrs) =IF(AND(O2<>"",E2<>""),(O2-D2)*24,"")
- Q Escalated? (Y/N)
- R Escalation ticket link
- S Resolved? (Y/N)

**Tab 2: Weekly_Summary**
Rows for each week; columns:
- Week start
- Week end
- New reviews (total)
- New reviews Google
- New reviews Yelp
- Avg rating (this week) =AVERAGEIF(Reviews_Log!D:D,">="&[week start],Reviews_Log!F:F) with week-end filter (can use pivot)
- Response rate = (Responses posted)/(New reviews)
- Median response time (hrs) =MEDIAN(FILTER(Reviews_Log!P:P, Reviews_Log!P:P<>"")) with date filters
- Negative reviews count (1–3★)
- Escalations opened
- Escalations resolved

---

# Discount / Setup Waiver Policy (paste into internal SOP)
- Default pricing uses **setup fee required**.
- Setup fee may be waived ONLY if:
  1) Client has **2+ locations** on DFY, OR
  2) Agency has **5+ locations** committed.
- No other discounts in week 1. Any annual prepay/discount is a post-week-1 option.

# Yelp Week-1 Policy (paste into offer/SOP)
- Yelp posting defaults to **client-post workflow** (we deliver paste-ready replies in a daily email/Doc). If Yelp Business Owner access is granted, we can post directly.
- This avoids any dependency on Yelp API approvals and keeps delivery reliable in week 1.
