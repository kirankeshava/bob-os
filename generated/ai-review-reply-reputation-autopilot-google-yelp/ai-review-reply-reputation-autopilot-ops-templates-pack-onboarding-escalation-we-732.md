# AI Review Reply & Reputation Autopilot — Ops Templates Pack (Onboarding + Escalation + Weekly KPI Report + 30-Day Scoreboard)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:58:13.477Z

---

Below are paste-ready templates to run the service immediately.

============================
TEMPLATE 1 — ONBOARDING QUESTIONNAIRE (Client Intake)
Send from: agent_bob_replit+review-bot@agentmail.to
Include legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Subject: Quick onboarding for your Review Reply Autopilot (5–7 minutes)

Hi {{FirstName}},

To activate your AI Review Reply & Reputation Autopilot, please reply with answers (you can be brief). If you prefer, paste this into a doc.

A) Locations & links
1) Business name(s) + address(es):
2) Google Business Profile link(s):
3) Yelp business page link(s):
4) Other review sites we should watch (Facebook/TripAdvisor/etc):

B) Access & posting preference (week-1 deliverability)
5) Google: can you add us as a Manager/Owner to your GBP? (Yes/No)
   If yes: invite agent_bob_replit+review-bot@agentmail.to
6) Yelp: do you have Yelp Business Owner access? (Yes/No)
   If yes: invite/add agent_bob_replit+review-bot@agentmail.to or confirm the best way to grant access.
   If no: we will use the client-post workflow (we draft, you paste/post). Who should receive daily/weekly drafts?

C) Brand voice & guardrails
7) Brand voice (pick 2–3): Friendly / Professional / Warm / Direct / Luxury / Playful / Clinical / Other:
8) Words/phrases we should NEVER use (e.g., “cheap”, “discount”, competitor names):
9) Words/phrases we SHOULD use (taglines, service names, neighborhood names):
10) Compliance constraints (medical/legal/financial claims to avoid):

D) Offers & routing
11) Your top 3 services/products to mention when relevant:
12) Any current promo we can mention (optional):
13) Preferred call-to-action for happy reviewers:
   - Call us at {{Phone}}
   - Book link: {{URL}}
   - Email: {{Email}}

E) Escalation & reputation policy
14) Who handles unhappy customers? Name + phone + email:
15) What warrants escalation? (examples)
16) Do you want us to offer a remedy in replies? (e.g., “Please call us to make it right”): Yes/No
17) Are there topics that require approval before posting? (refunds, pricing disputes, safety incidents, staff names, etc.)

F) Reporting
18) Weekly report recipient(s) email(s):
19) Best day/time to send weekly KPI report:

G) Optional (helps response quality)
20) Link to website/menu/pricing/service pages:
21) FAQs or policies (returns, cancellations, warranties):

Thanks — once we have this, we can start replying within 24 hours (or faster if on Pro).

— Bob
AI Review Reply & Reputation Autopilot
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to


============================
TEMPLATE 2 — ESCALATION TICKET + SLA (Internal + Client-Facing)

Purpose: ensure negative reviews are handled safely, quickly, and with a documented loop.

ESCALATION TRIGGERS (auto-flag)
- Any 1–2★ review
- Any 3★ review with negative sentiment (rude staff, billing, delays, damaged property, “never again”)
- Mentions of: refund/chargeback, discrimination, harassment, injury/safety, legal threat, HIPAA/medical privacy, “scam/fraud”, police, lawsuit, BBB, news, fire, bed bugs/pests, food poisoning, malpractice
- Mentions a staff member by name + accusation
- Reviewer requests money back publicly

SLA RULES
- Response drafting: within 12 business hours of detection (Pro) / 24 business hours (Growth)
- Escalation notification to client: within 2 business hours of flag
- Posting rule: DO NOT AUTO-POST escalations. Require explicit client approval.

ESCALATION TICKET (copy/paste)
Ticket ID: {{YYYYMMDD}}-{{Business}}-{{Platform}}-{{ReviewID}}
Business/Location:
Platform: Google / Yelp
Reviewer name/handle:
Star rating:
Date/time posted:
Review text (paste):
Category (pick 1): Billing/Price | Service quality | Delay/No-show | Staff behavior | Product issue | Safety/Legal | Other
Severity (pick 1): Low | Medium | High (legal/safety)
Proposed public response (draft):
Private resolution suggestion (not public):
Client approval required? Yes (default for 1–3★) / No
Client contact for approval:
Status: Drafted | Sent for approval | Approved | Posted | Resolved offline | Follow-up requested
Follow-up notes:

SAFE RESPONSE GUIDELINES (for negative reviews)
- Acknowledge + apologize for experience (without admitting legal fault)
- Invite offline resolution with direct contact
- Avoid arguing facts, exposing private info, or discussing sensitive details
- Keep it short, calm, and brand-safe


============================
TEMPLATE 3 — WEEKLY KPI REPORT (Email + Sheet Layout)

WEEKLY REPORT EMAIL (paste-ready)
Subject: Weekly Reputation KPIs — {{Business}} — Week of {{DateRange}}

Hi {{FirstName}},

Here are your weekly reputation KPIs for {{DateRange}} across Google (+ Yelp if applicable):

1) New reviews
- Google: {{#}}
- Yelp: {{#}}
- Total: {{#}}

2) Rating movement
- Avg rating (start → end): {{X.X}} → {{X.X}}
- Net sentiment: {{Improving / Flat / Declining}} (top drivers below)

3) Responsiveness
- Responses posted: {{#}} / {{# reviews}} ({{% response rate}})
- Median response time: {{X}} hours
- SLA compliance: {{% within SLA}}

4) Risk & recovery
- Negative reviews (1–2★): {{#}}
- Escalations opened: {{#}}
- Resolved offline: {{#}}
- Outstanding escalations: {{#}} (listed below)

5) Themes we saw this week (top 3)
- {{Theme 1}} ({{# mentions}})
- {{Theme 2}} ({{# mentions}})
- {{Theme 3}} ({{# mentions}})

6) Suggested action (one thing to improve next week)
- {{Single highest leverage suggestion}}

Open items:
- {{Ticket ID}} — {{status}} — owner: {{name}}

If you want, we can also add competitor benchmarking or a negative-review playbook.

— Bob
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

SHEET LAYOUT (tabs)
TAB A: Weekly Summary
Columns:
- Week start
- Week end
- New reviews (Google)
- New reviews (Yelp)
- Total new reviews
- Avg rating start
- Avg rating end
- Responses posted
- Response rate %
- Median response time (hrs)
- # escalations
- # resolved
- Notes

TAB B: Review Log
Columns:
- Date
- Platform
- Reviewer
- Stars
- Review text
- Draft response
- Posted? (Y/N)
- Posted date
- SLA met? (Y/N)
- Escalated? (Y/N)
- Ticket ID
- Theme tag

TAB C: Escalations
Columns:
- Ticket ID
- Date opened
- Platform
- Stars
- Category
- Severity
- Owner (client)
- Status
- Next action
- Due date


============================
TEMPLATE 4 — 30-DAY PIPELINE + DELIVERY SCOREBOARD (Daily KPI Dashboard)

Goal: $12,000 cash collected in 30 days.
Recommended close plan: 6 DFY Growth + 2 Agency Starter + at least $304 in add-ons OR 1 DFY Pro upgrade.

ASSUMPTIONS (editable)
- Reply rate from outbound leads: 15%
- Call booked rate from replies: 35%
- Show rate: 70%
- Close rate on shows: 25%
- Deals needed: 8 total (6 DFY + 2 Agency)

FUNNEL MATH (monthly)
Needed closes: 8
Needed shows = 8 / 0.25 = 32
Needed booked calls = 32 / 0.70 = 46
Needed replies = 46 / 0.35 ≈ 132
Needed outbound leads = 132 / 0.15 = 880
Daily leads (30 days) ≈ 30/day

BUFFER (stretch +20%)
- Leads/day: 36
- Replies/day: 5
- Calls booked/day: 2
- Shows/week: 9
- Closes/week: 2–3

DAILY SCOREBOARD (copy into a sheet)
Columns:
- Date
- Leads sent
- Replies received
- Conversations started
- Calls booked
- Calls held (shows)
- Deals closed
- Cash collected today ($)
- MRR added today ($)
- Notes / objections

DELIVERY SCOREBOARD (to prevent churn)
- Reviews monitored today (Y/N)
- Drafts created (#)
- Posted (#)
- Median response time (hrs)
- Escalations opened (#)
- Escalations resolved (#)
- SLA breaches (#) + reason

POLICY: YELP WEEK-1 DELIVERABILITY (NO API REQUIRED)
Default: We strongly prefer Yelp Business Owner access.
If client cannot grant access in week 1: we switch to “Draft + Client-Post” workflow.
- We send a daily email with ready-to-paste responses (labeled per review).
- Client posts and confirms via quick reply (“Posted ✅”).
- We still include Yelp activity in weekly KPIs using screenshots/links the client shares, or manual checks.

These templates are designed to let you sell and fulfill immediately while engineering/API work catches up later.
