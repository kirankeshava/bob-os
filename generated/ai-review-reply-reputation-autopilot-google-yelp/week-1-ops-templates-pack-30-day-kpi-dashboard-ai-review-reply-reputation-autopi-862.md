# Week-1 Ops Templates Pack + 30-Day KPI Dashboard (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:05:53.096Z

---

Below are paste-ready templates to run fulfillment immediately. They assume the core offers: DFY Review Reply Autopilot (Growth/Pro) + Weekly KPI report, and White-label Agency (Starter/Pro). They also assume a no-API workflow: Google Business Profile (GBP) via Manager access when possible; Yelp default is “client-post” (we draft responses and send paste-ready copy), with optional upgrade to direct posting once access/API is available.

==============================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (Copy/Paste into Typeform/Google Form)
==============================
Subject (if emailed): 5-minute onboarding for your Review Reply Autopilot

1) Business details
- Business name:
- Primary location address:
- Website URL:
- Phone number:
- Primary contact name + role:
- Best email for review alerts + approvals:
- Best mobile (for urgent escalations):

2) Platforms & access (choose what you have today)
- Google Business Profile access:
  - [ ] I can add you as a Manager (recommended)
  - [ ] I cannot add access; please use client-post workflow (we will paste replies for us to post)
  - If adding: GBP listing URL:
  - Email to invite as Manager (use): agent_bob_replit+review-bot@agentmail.to
- Yelp:
  - [ ] I have Yelp Business Owner login and can add you / provide access
  - [ ] I do NOT have access / prefer client-post (you draft, we post)
  - Yelp business page URL:

3) Brand voice & tone (pick one)
- [ ] Friendly & grateful (default)
- [ ] Professional & concise
- [ ] Warm & detailed
- [ ] Luxury/premium
- [ ] Playful (only if appropriate)
- Notes / examples of replies you like:

4) Words/phrases to avoid (brand safety)
- List any prohibited phrases, claims, or competitor mentions:
- Any compliance constraints (medical/legal/financial):

5) Offer/CTA rules
- Do you want to mention a CTA in positive replies?
  - [ ] No CTA
  - [ ] Yes — call us
  - [ ] Yes — book online
  - CTA text + URL/phone:
- Any promos we should mention (if allowed):

6) Escalation rules (negative reviews)
- Who should be notified for 1–2 star reviews? (name/email/mobile)
- Who can approve public replies to negative reviews?
- Preferred resolution approach:
  - [ ] Move offline ASAP (“Please contact us at…”)
  - [ ] Apologize + acknowledge + invite offline
  - [ ] Case-by-case

7) Response approvals (choose default)
- 4–5★ reviews:
  - [ ] Auto-approve and post
  - [ ] Send for approval first
- 1–3★ reviews:
  - [ ] Always send for approval (recommended)
  - [ ] Post with a conservative template without approval

8) SLA expectations
- Desired response window:
  - [ ] 24 hours (Growth)
  - [ ] 12 hours (Pro)
  - [ ] Other:
- Days we should operate:
  - [ ] Mon–Fri
  - [ ] 7 days/week (additional)

9) Weekly report recipient(s)
- Emails to receive weekly KPI report:
- Preferred day/time:

10) Anything else we should know?
- Common review themes (wait time, pricing, staff, etc.):
- Known issues to be careful about:

==============================
TEMPLATE 2 — ESCALATION TICKET + SLA (Use as Google Form or internal checklist)
==============================
Title: Review Escalation Ticket — Action Required

A) Review details
- Platform: [Google / Yelp]
- Star rating: [1/2/3]
- Reviewer name/handle:
- Review link (URL):
- Date/time posted:
- Review text (paste):

B) Risk flags (check all that apply)
- [ ] Allegation of illegal behavior
- [ ] Medical/legal advice implied
- [ ] Discrimination/harassment
- [ ] Threat of lawsuit / demand letter language
- [ ] Mentions employee by name
- [ ] Mentions refund/chargeback
- [ ] Contains private info (phone/address)
- [ ] Obvious spam / wrong business
- [ ] Other:

C) Proposed response (draft)
- Draft reply v1:
- Tone selected: [Professional / Warm / Firm / De-escalating]
- “Move offline” contact method (phone/email):

D) Required approvals
- Needs approval from (name/email):
- Approval deadline to meet SLA:
  - Growth: within 24 hours of review
  - Pro: within 12 hours of review

E) Internal next steps checklist
- [ ] Notify client contact immediately (email + optional SMS)
- [ ] Ask for context (what happened / order ID / appointment date)
- [ ] Revise reply with facts provided
- [ ] Post reply (or send paste-ready text if client-post workflow)
- [ ] Log as “Escalated” in weekly report
- [ ] If spam/wrong business: suggest dispute steps (client-owned)

F) SLA policy (paste into client-facing docs)
- We will draft an initial proposed response within SLA (Growth 24h / Pro 12h) once the review is detected.
- If client approval is required, SLA applies to draft delivery; posting occurs after approval is received.
- Reviews flagged with legal/medical/compliance risk will not be posted without explicit written approval.

==============================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + Google Sheet Layout)
==============================
Email subject options:
- Weekly Reputation KPIs — {{Business Name}} ({{Week Range}})
- Your reviews summary + response performance ({{Week Range}})

Email body (copy/paste):
Hi {{Name}},

Here are your weekly reputation KPIs for {{Business Name}} covering {{Week Range}}.

1) Volume & rating
- New reviews: {{#}}
- Average star rating (current): {{X.X}}
- Rating change vs last week: {{+/-X.X}}

2) Responsiveness
- Response rate (this week): {{%}} (Goal: 95–100%)
- Median response time: {{X hours}} (Goal depends on plan)
- Positive reviews responded to: {{#}}
- Negative reviews escalated: {{#}} (Resolved: {{#}})

3) Themes we’re seeing (Top 3)
- {{Theme 1}} — {{count}}
- {{Theme 2}} — {{count}}
- {{Theme 3}} — {{count}}

4) Notable wins / risks
- Win: {{short bullet}}
- Risk: {{short bullet}}

Action recommended this week:
- {{1–2 concrete actions}} (e.g., staff coaching note, operational fix, outreach to reviewer)

Link to the live KPI sheet: {{Google Sheet URL}}

If you want us to start sending review-request messages to recent customers to increase review volume, reply “SMS” and we’ll set it up as an add-on.

Thanks,
Bob
AI Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

Google Sheet layout (tabs + columns)
TAB 1: Weekly Summary
Columns:
- Week Start
- Week End
- New Reviews (Google)
- New Reviews (Yelp)
- Total New Reviews
- Avg Rating (Current)
- Avg Rating (Prev)
- Rating Change
- Response Rate %
- Median Response Time (hrs)
- # Escalations
- # Resolved
- Notes / Top themes

TAB 2: Review Log
Columns:
- Date
- Platform
- Reviewer
- Stars
- Review Text (short)
- Category/Theme (dropdown)
- Drafted Reply (link/doc)
- Status (Drafted / Sent for Approval / Posted / Client-Posted / Escalated)
- Posted Date
- Response Time (hrs)
- Escalation Flag (Y/N)
- Outcome/Resolution Notes

TAB 3: Theme Tracker
Columns:
- Theme
- Count (This Week)
- Count (Last 4 Weeks)
- Example review link
- Suggested operational fix

==============================
TEMPLATE 4 — 30-DAY KPI DASHBOARD (Pipeline + Revenue Tracker)
==============================
Use this as a Google Sheet. One row per day. Fill actuals; compare to targets.

Assumptions (edit as needed):
- Target: $12,000 cash collected in 30 days
- Target deal mix (recommended): 6 DFY Growth (setup $500 + $1,250/mo) + 2 Agency Starter (setup $199 + $399/mo) + at least $304 add-on buffer
- Pipeline ratios (baseline): 15% reply rate; 35% call-book from replies; 70% show rate; 25% close rate on shows
- Required totals (approx): 1,270 leads → 190 replies → 66 calls booked → 46 shows → 12 closes (buffer) OR 8 closes (minimum) depending on ACV and upsells

Columns (daily):
- Day (1–30)
- Date
- Leads Sent (target 42/day)
- Replies (target 6/day)
- Calls Booked (target 2/day)
- Calls Showed (target 1–2/day)
- Deals Closed (#)
- DFY Closed (#)
- Agency Closed (#)
- Add-ons Sold ($)
- Cash Collected Today ($)
- MRR Added Today ($)
- Cash-to-Goal ($12,000) — running total
- MRR Running Total
- Notes (objections, channel, what worked)

30-day table (paste into sheet; fill dates manually)
Day,Leads Sent,Replies,Calls Booked,Calls Showed,Deals Closed,DFY Closed,Agency Closed,Add-ons Sold $,Cash Collected $,MRR Added $,Cash Running Total $,MRR Running Total $,Notes
1,42,6,2,1,0,0,0,0,0,0,0,0,
2,42,6,2,1,0,0,0,0,0,0,0,0,
3,42,6,2,1,0,0,0,0,0,0,0,0,
4,42,6,2,1,0,0,0,0,0,0,0,0,
5,42,6,2,1,1,1,0,0,1750,1250,1750,1250,
6,42,6,2,1,0,0,0,0,0,0,1750,1250,
7,42,6,2,1,0,0,0,0,0,0,1750,1250,
8,42,6,2,1,0,0,0,0,0,0,1750,1250,
9,42,6,2,1,1,1,0,0,1750,1250,3500,2500,
10,42,6,2,1,0,0,0,0,0,0,3500,2500,
11,42,6,2,1,0,0,0,0,0,0,3500,2500,
12,42,6,2,1,0,0,0,0,0,0,3500,2500,
13,42,6,2,1,1,1,0,0,1750,1250,5250,3750,
14,42,6,2,1,0,0,0,0,0,0,5250,3750,
15,42,6,2,1,0,0,0,0,0,0,5250,3750,
16,42,6,2,1,0,0,0,0,0,0,5250,3750,
17,42,6,2,1,1,1,0,0,1750,1250,7000,5000,
18,42,6,2,1,0,0,0,0,0,0,7000,5000,
19,42,6,2,1,0,0,0,0,0,0,7000,5000,
20,42,6,2,1,0,0,0,0,0,0,7000,5000,
21,42,6,2,1,1,1,0,304,2054,1250,9054,6250,
22,42,6,2,1,0,0,0,0,0,0,9054,6250,
23,42,6,2,1,0,0,0,0,0,0,9054,6250,
24,42,6,2,1,0,0,0,0,0,0,9054,6250,
25,42,6,2,1,1,1,0,0,1750,1250,10804,7500,
26,42,6,2,1,0,0,0,0,0,0,10804,7500,
27,42,6,2,1,0,0,0,0,0,0,10804,7500,
28,42,6,2,1,0,0,0,0,0,0,10804,7500,
29,42,6,2,1,1,0,1,0,598,399,11402,7899,
30,42,6,2,1,1,0,1,0,598,399,12000,8298,

Note: The above sample table shows one way to pace closes; adjust close days and deal types. Use this dashboard to enforce daily activity regardless of close timing.

==============================
Default Week-1 Deliverability Policy (internal note to keep execution consistent)
==============================
- Google: request GBP Manager access; if not granted, use client-post workflow.
- Yelp: default to client-post workflow immediately (fastest onboarding). We send paste-ready replies with clear posting instructions; optional upgrade to direct posting if access becomes available.
- Approval rules: Auto-approve 4–5★ unless flagged; always require approval for 1–3★ and any review with legal/medical/compliance risk flags.
- Exclusions: no incentives for reviews, no “review gating,” no deletion promises, no disputing reviews without client authorization.
