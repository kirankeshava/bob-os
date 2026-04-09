# Ops Templates Packet — Onboarding + Escalation + Weekly KPI Report (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T17:50:50.168Z

---

Below are 3 paste-ready templates to run fulfillment in week 1 with zero paid tools and no Google/Yelp API dependency.

====================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (copy/paste into Google Form or email)
Subject: Quick onboarding for your Review Reply Autopilot (7-day free trial)

Hi {{FirstName}},

To start your 7-day free trial, please reply with the details below (or paste into a doc). This helps us draft brand-safe responses and escalate negatives correctly.

A) Business basics
1) Business name + location(s):
2) Primary website:
3) Primary phone:
4) Best contact name + role:
5) Best email + mobile (for escalations):

B) Review profiles (links)
6) Google Business Profile link(s):
7) Yelp business page link(s):
8) Any other review sites to monitor (optional):

C) Access / posting method (Week-1 options)
9) Google: Can you add us as a Manager on your Google Business Profile? (Yes/No)
   If yes: please invite agent_bob_replit+review-bot@agentmail.to
10) Yelp: Can you add us as a user on Yelp for Business Owners? (Yes/No)
   If no, we’ll use “client-post workflow”: we draft replies daily and you (or staff) posts them.

D) Brand voice + response rules
11) Choose tone: (Warm & grateful / Professional / Funny-light / Luxury / Other)
12) Words/phrases we should NEVER use:
13) Offers we MAY mention (if any):
14) Preferred sign-off name/title (e.g., “—Bob, Owner”):
15) Do you want us to invite reviewers back (Yes/No) and how?

E) Escalation rules (negative reviews)
16) Who should be alerted on 1–2★ reviews? (name + email + mobile)
17) Who can approve responses to sensitive issues? (owner/manager/legal)
18) Topics that require approval before posting (check any): pricing disputes, refunds, staff misconduct, medical/legal, discrimination, safety incidents, other: ____
19) Target resolution window for complaints (e.g., 24–48h):

F) Success criteria
20) What does success look like in 30 days? (e.g., faster replies, fewer negatives unresolved, rating trend)

Legitimacy link (you can share internally): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support email: agent_bob_replit+review-bot@agentmail.to

====================
TEMPLATE 2 — ESCALATION / INCIDENT TICKET + SLA POLICY (internal doc + client-facing excerpt)
Title: Negative Review Escalation Ticket (1–3★ or flagged content)

Ticket ID: {{YYYYMMDD-Client-#}}
Client / Location:
Platform: Google / Yelp
Review link:
Reviewer name (as shown):
Star rating: 1 / 2 / 3
Date/time posted:

A) Classification (choose one)
- Service quality complaint
- Staff behavior complaint
- Pricing/billing dispute
- Wait time / scheduling
- Product issue
- Safety incident
- Medical/legal sensitive
- Suspected fake/competitor
- Other: ______

B) Risk flags (check any)
- Mentions lawsuit/legal action
- Mentions medical outcomes
- Mentions discrimination/harassment
- Mentions injury/safety hazard
- Requests refund/chargeback
- Names an employee

C) Required actions
1) Notify escalation contact(s): {{Name/Email/Mobile}}
2) Proposed resolution steps (client-side):
3) Draft public response (from us):
4) Approval required before posting? (Yes/No) If yes, approver:
5) Posting method: Direct posting (we have access) / Client-post (we send copy)

D) SLA policy (use in your service agreement / expectations)
- Capture cadence: Reviews checked at minimum 1x/day (Mon–Fri) during free trial; upgraded plans can be 2x/day.
- Draft SLA: 4–5★ drafts within 24 business hours; 1–3★ drafts within 12 business hours.
- Approval rule: Any 1–3★ review OR anything with risk flags requires explicit approval before posting.
- Resolution tracking: We track “Acknowledged,” “In progress,” “Resolved,” and “Follow-up requested.”
- Exclusions: We do not promise removal of reviews, do not incentivize reviews, and do not post anything untruthful. Disputes/flags on Google/Yelp are done only with written client authorization.

====================
TEMPLATE 3 — WEEKLY KPI REPORT (EMAIL + SHEET LAYOUT)
Subject: Weekly Reputation KPI Report — {{Business}} ({{StartDate}}–{{EndDate}})

Hi {{FirstName}},

Here’s your weekly reputation snapshot for {{Business}}. Reply “Approved” if you’d like us to continue with the same tone and escalation rules, or share any tweaks.

1) Review volume
- New Google reviews: {{#}}
- New Yelp reviews: {{#}}
- Total new reviews: {{#}}

2) Rating trend
- Avg rating (start of week): {{X.X}}
- Avg rating (end of week): {{X.X}}
- Net change: {{+/-X.X}}

3) Responsiveness
- Reviews responded to: {{#}} / {{# total}} ({{% response rate}})
- Median response time: {{hours}}
- Longest time-to-first-response: {{hours}}

4) Negative review handling (1–3★)
- New negative reviews: {{#}}
- Escalations sent: {{#}}
- Resolved (confirmed by client): {{#}}
- Pending resolution: {{#}}

5) Themes (top 3)
- Theme 1: {{e.g., wait time}} ({{# mentions}})
- Theme 2: {{e.g., staff friendliness}} ({{# mentions}})
- Theme 3: {{e.g., pricing clarity}} ({{# mentions}})

6) Recommended next actions (next 7 days)
- {{Action 1}}
- {{Action 2}}
- {{Action 3}}

Operational note: For Yelp this week we used {{Direct posting / Client-post workflow}}.
Support: agent_bob_replit+review-bot@agentmail.to
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---
Weekly KPI Sheet Layout (columns)
Tab 1: Weekly Summary
- Week start | Week end | Google new reviews | Yelp new reviews | Total new | Avg rating start | Avg rating end | Response rate % | Median response time (hrs) | Neg reviews (1–3★) | Escalations | Resolved | Pending | Notes

Tab 2: Review Log
- Date | Platform | Location | Reviewer | Stars | Review URL | Review text (paste) | Sentiment (pos/neutral/neg) | Drafted response (Y/N) | Posted (Y/N) | Posted by (us/client) | Escalated (Y/N) | Status (Ack/In progress/Resolved) | Owner notes

Tab 3: Response QA
- Date | Platform | Risk flags | Approval required (Y/N) | Approved by | Time to approve | Final posted text
