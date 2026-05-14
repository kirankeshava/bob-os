# Week-1 Ops Templates Pack (Onboarding + Escalations + Weekly KPI Report) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:11:26.222Z

---

Below are paste-ready templates you can use today. They are designed for week-1 delivery with **no API dependency** and support both Google Business Profile (GBP) and Yelp.

==================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE + ACCESS CHECKLIST (copy/paste into email or form)
Subject: Quick onboarding to start your Review Reply Autopilot (15 minutes)

Hi {{FirstName}},

Thanks for starting your free 7-day trial of **AI Review Reply & Reputation Autopilot**.
Legitimacy/overview: {{BusinessWebsiteURL}} 
Support email: agent_bob_replit+review-bot@agentmail.to

To begin replying within 24 hours, please answer the questions below and choose the access option.

A) Business info
1) Business name + primary category:
2) Location(s) covered in this trial (address + phone):
3) Google Business Profile link(s):
4) Yelp business page link(s):

B) Brand voice & style
5) Pick the tone (choose one): Friendly & short / Warm & detailed / Professional & clinical / Playful
6) Do you want replies to include (choose): ( ) thank-you only ( ) mention service ( ) mention team member ( ) invite back ( ) link to website
7) Phrases we MUST use (if any):
8) Phrases we MUST NOT use (banned):
9) Any compliance constraints? (medical/legal/financial disclaimers, HIPAA, etc.)

C) Escalation & approvals
10) Who should we notify for negative reviews? Name + email + phone:
11) Preferred escalation channel: Email / SMS / Slack (if available)
12) Approval preference (choose one):
   Option 1 (Fastest): Auto-post 4–5★ replies; approval required for 1–3★
   Option 2 (Strict): Approval required for all replies before posting

D) Your operating rules
13) Business hours (so we don’t suggest calling at closed times):
14) Do you offer refunds/redo/discounts? If yes, what’s allowed:
15) Any sensitive topics to avoid (pricing, politics, competitors, staff names, etc.):

E) Access method (choose)
Google Business Profile (GBP):
- Preferred: Add us as a Manager on your GBP. Add: agent_bob_replit@agentmail.to
- Fallback: You post; we draft. (We’ll send copy/paste responses.)

Yelp:
- Preferred: Add us as a user in Yelp for Business Owners (if supported) or share access through your account admin.
- Default fallback (recommended if access is hard): You post; we draft. (We’ll send copy/paste responses.)

Once we have the above, we’ll start monitoring reviews daily and responding within SLA.

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to
{{BusinessWebsiteURL}}

==================================================
TEMPLATE 2 — ESCALATION TICKET + SLA (internal or shared with client)
Title: Negative Review Escalation Ticket — {{BusinessName}} — {{Platform}} — {{StarRating}}★

1) Ticket metadata
- Date/time discovered:
- Platform: Google / Yelp
- Review URL:
- Reviewer name/handle:
- Star rating:
- Review text (paste full):
- Location (if multi-location):

2) Classification (check all that apply)
[ ] Service quality complaint
[ ] Billing/refund dispute
[ ] Staff behavior complaint
[ ] Wait time/scheduling complaint
[ ] Suspected fake/spam
[ ] Legal/medical-sensitive allegation
[ ] Competitor/employee/harassment

3) Severity (choose one)
- P0 Critical: legal/medical claims, threats, discrimination, safety issues
- P1 High: explicit demand for refund, severe complaint, viral risk
- P2 Normal: unhappy but non-critical

4) Response rule (week-1 default)
- If 4–5★: Draft + auto-post unless banned keywords flagged.
- If 3★: Draft reply + send for approval (unless client opted into auto-post).
- If 1–2★: Draft reply + always send for approval + open escalation.
- If keywords flagged (lawsuit, HIPAA, fraud, injury, discrimination): treat as P0; do not post until owner approves.

5) SLA targets
- Drafting SLA: within 12 business hours of detection (P0/P1) or 24 hours (P2).
- Client approval window: up to 24 hours (we send reminders at +12h).
- Posting SLA: within 2 hours after approval.

6) Draft response (our proposed public reply)
Draft v1:

7) Private resolution plan (not public)
- Who will contact reviewer (name):
- Channel: phone/email
- Offer/next step allowed (refund/redo/apology/follow-up):
- Target completion date:

8) Outcome tracking
- Posted? Y/N (timestamp)
- Reviewer updated rating? Y/N
- Case closed? Y/N (date)
- Notes/lesson/theme tag:

==================================================
TEMPLATE 3 — WEEKLY KPI REPORT (email + sheet layout)
A) Weekly report email (send every Monday)
Subject: Weekly Reputation KPI Report — {{BusinessName}} ({{StartDate}}–{{EndDate}})

Hi {{FirstName}},

Here’s your weekly Reputation KPI snapshot. If you want us to prioritize specific services (e.g., “roof repair” vs “inspection”), reply with the focus and we’ll reflect it in responses.

Link to dashboard (Google Sheet): {{SheetLink}}
Legitimacy/overview: {{BusinessWebsiteURL}}
Support: agent_bob_replit+review-bot@agentmail.to

Topline KPIs
- New reviews (Google): {{#}}
- New reviews (Yelp): {{#}}
- Average rating (start → end): {{X.X}} → {{X.X}}
- Response rate (last 7 days): {{#%}}
- Median response time: {{#}} hours
- Negative reviews (1–3★): {{#}}
- Escalations opened/closed: {{#}} / {{#}}

Themes we’re seeing (top 3)
1) {{Theme}} — {{count}}
2) {{Theme}} — {{count}}
3) {{Theme}} — {{count}}

Notable wins
- {{Example win: reviewer praised staff; we reinforced and invited return}}

Risks / Action needed
- {{Example: 1 unresolved billing dispute awaiting callback}}

Next week plan
- {{Example: respond within 12h for all 1–2★, tighten messaging around scheduling delays}}

Thanks,
Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to
{{BusinessWebsiteURL}}

B) Google Sheet layout (tabs + columns)
TAB 1: Weekly Summary (one row per week)
Columns:
- Week Start
- Week End
- New Reviews (Google)
- New Reviews (Yelp)
- Total Replies Posted
- Response Rate % (Replies/Reviews)
- Median Response Time (hrs)
- Avg Rating (Start)
- Avg Rating (End)
- # 1★
- # 2★
- # 3★
- # 4★
- # 5★
- Escalations Opened
- Escalations Closed
- Top Theme 1
- Top Theme 2
- Top Theme 3
- Notes / Next actions

TAB 2: Review Log (one row per review)
Columns:
- Date Detected
- Platform (Google/Yelp)
- Location
- Reviewer Name
- Stars
- Review Text
- Drafted Reply (Y/N)
- Posted Reply (Y/N)
- Approval Needed (Y/N)
- Approved By
- Time to Draft (hrs)
- Time to Post (hrs)
- Escalation Ticket Link
- Theme Tag
- Resolution Status (Open/Closed)

TAB 3: Escalations (one row per escalation)
Columns:
- Ticket ID
- Date Opened
- Severity (P0/P1/P2)
- Platform
- Reviewer
- Summary
- Owner Contacted (Y/N)
- Resolution Action
- Closed Date
- Outcome (rating changed? removed? satisfied?)

==================================================
STANDARD WEEK-1 YELP WORKFLOW (how to explain internally + to clients)
Preferred (best experience): Yelp Business Owner access so we can post replies directly.
Default fallback (lowest friction): client-post workflow.
- We monitor reviews (manual check or email alerts) 1–2x/day.
- We draft responses and send copy/paste text in a single daily email (or same-day for 1–2★).
- Client posts replies from their Yelp dashboard.
- We log “posted” once client confirms (screenshot or “posted” reply).

This keeps the offer deliverable immediately while we pursue deeper integrations later.
