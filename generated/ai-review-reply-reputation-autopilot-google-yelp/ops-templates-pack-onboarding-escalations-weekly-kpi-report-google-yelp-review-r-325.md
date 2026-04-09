# Ops Templates Pack — Onboarding + Escalations + Weekly KPI Report (Google/Yelp Review Reply Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T05:57:52.209Z

---

Below are paste-ready templates to run delivery in week 1 without relying on Google/Yelp APIs. Use these as Google Forms / Typeform / Notion pages or as email + Google Sheet.

====================================================
TEMPLATE 1 — CLIENT ONBOARDING QUESTIONNAIRE (COPY/PASTE)
====================================================
Title: Review Reply & Reputation Autopilot — Onboarding (5–8 minutes)

Intro text (client-facing):
Thanks for choosing the AI Review Reply & Reputation Autopilot. We draft brand-safe responses to your Google Business Profile and Yelp reviews, escalate negatives, and send weekly reputation KPIs. To speed up launch, please complete this onboarding form. If you want to verify our business: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Support/contact: agent_bob_replit+review-bot@agentmail.to

A) Business details
1) Business name:
2) Primary location address:
3) Website URL:
4) Primary contact name + role:
5) Best email + phone:
6) Hours of operation:

B) Review profiles (links)
7) Google Business Profile link (paste URL):
8) Yelp business page link (paste URL):
9) Any other review sites to monitor? (Facebook, TripAdvisor, Healthgrades, etc.) + links:

C) Access & posting preferences (week-1 deliverable)
10) Google Business Profile access (choose one):
   ☐ Add us as Manager (recommended)
   ☐ We draft; you post
11) Yelp posting workflow (choose one):
   ☐ We draft; you post (default / fastest)
   ☐ Add us as Yelp Business Owner/Manager (if available)

D) Brand voice & policy
12) Choose voice style:
   ☐ Warm + friendly
   ☐ Professional + concise
   ☐ Luxury/white-glove
   ☐ Playful
13) 3 words you want customers to feel after reading responses:
14) Banned phrases / compliance constraints (e.g., no discounts, no medical claims, no admitting fault):
15) Approved phrases (tagline, sign-off, how to name staff):
16) Customer service policy in 1–2 sentences (refunds/returns/guarantees):

E) Escalation rules
17) Who should be alerted for negative reviews? (name + email + phone)
18) What counts as “urgent”? (check all)
   ☐ 1-star review
   ☐ Mentions of safety
   ☐ Mentions of discrimination/harassment
   ☐ Legal threat
   ☐ Medical/clinical complaint
   ☐ Media/viral risk
19) Preferred escalation channel:
   ☐ Email
   ☐ SMS
   ☐ Slack (if applicable)
20) Desired response SLA:
   ☐ 24 hours (standard)
   ☐ 12 hours (premium)

F) Offer context (helps replies convert)
21) Top 5 services/products (bullet list):
22) Common customer objections or complaints:
23) Approved “next step” CTA (e.g., call us at…, book link, email):
24) Any current promotions? (optional) + allowed wording:

G) Approval settings
25) Approval preference:
   ☐ Auto-post 4–5★ responses after QA; require approval for 1–3★ (recommended)
   ☐ Require approval for all responses
26) If approval required: who is the approver + best contact method?

Closing:
When complete, we’ll confirm launch within 1 business day and begin drafting responses.

====================================================
TEMPLATE 2 — ESCALATION TICKET + SLA (COPY/PASTE)
====================================================
Title: Negative Review Escalation Ticket (Internal + Client)

Purpose:
Used when a review is 1–3★, contains sensitive keywords, or appears high-risk. Tracks response draft, client approval, resolution outcome, and prevents missed SLAs.

Ticket fields:
1) Ticket ID:
2) Client name + location:
3) Platform:
   ☐ Google Business Profile
   ☐ Yelp
4) Review link (URL):
5) Reviewer name/handle:
6) Star rating:
7) Date/time review posted:
8) Category (check all):
   ☐ Service quality
   ☐ Pricing/billing
   ☐ Staff behavior
   ☐ Wait time
   ☐ Product issue
   ☐ Safety concern
   ☐ Legal threat
   ☐ Discrimination/harassment
   ☐ Other: _______
9) Severity level:
   ☐ L1 (standard negative) — respond within 24h
   ☐ L2 (sensitive) — respond within 12h + client approval
   ☐ L3 (high risk) — immediate notify + hold public response until approved
10) Summary of complaint (2–3 sentences):
11) Key facts needed from client (bullet list):
12) Draft public response (version 1):
13) Private outreach suggestion (optional):
14) Client decision:
   ☐ Approve as-is
   ☐ Approve with edits
   ☐ Do not post; investigate
15) Final public response posted? (Y/N)
16) Posting method:
   ☐ Posted by us (access granted)
   ☐ Client-post workflow (client pasted response)
17) Date/time posted:
18) Outcome after 7 days:
   ☐ No change
   ☐ Reviewer updated rating
   ☐ Reviewer removed review (if applicable)
   ☐ Additional follow-up needed
19) Notes + learnings (for playbook):

SLA rules (include in ticket footer):
- 4–5★ reviews: draft within 24h (or 12h on premium); can auto-approve if configured.
- 1–3★ reviews: draft within 12–24h depending on plan; approval required by default.
- L3 high risk: notify client immediately; hold posting until explicit approval.

====================================================
TEMPLATE 3 — WEEKLY KPI REPORT (EMAIL + SHEET LAYOUT)
====================================================
A) Weekly email (client-facing)
Subject: Weekly Reputation KPI Report — {{Business}} ({{Week of}})

Hi {{Name}},

Here’s your weekly reputation snapshot for {{Business}}. If you ever want to validate who we are, our info is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
You can reach us at agent_bob_replit+review-bot@agentmail.to.

1) New reviews this week
- Google: {{#}} (avg {{x.x}}★)
- Yelp: {{#}} (avg {{x.x}}★)

2) Rating trend
- Current average rating: {{x.x}}★ (vs last week {{+/-}})

3) Response performance
- Response rate: {{%}}
- Median response time: {{hours}}
- Reviews responded within SLA: {{%}}

4) Negatives & escalations
- 1–3★ reviews: {{#}}
- Escalations opened: {{#}}
- Escalations resolved: {{#}}
- Open items needing your input: {{list or “none”}}

5) Top themes (what customers are talking about)
- {{Theme 1}} — {{count}}
- {{Theme 2}} — {{count}}
- {{Theme 3}} — {{count}}

Recommended action this week (1–2 bullets):
- {{Recommendation 1}}
- {{Recommendation 2}}

Reply “OK” to confirm you’ve seen this, or send any context you want us to incorporate into future responses.

Thanks,
Bob
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to

B) Google Sheet layout (tabs + columns)
Tab 1: Reviews_Log
Columns:
- Date
- Platform (Google/Yelp)
- Location
- Reviewer Name
- Stars (1–5)
- Review Text (paste)
- Category/Theme (manual tag)
- Drafted Response (final text)
- Needs Approval? (Y/N)
- Approved By
- Posted? (Y/N)
- Date Posted
- Response Time (hrs)
- Escalation Level (None/L1/L2/L3)
- Escalation Status (Open/Waiting/Resolved)
- Notes

Tab 2: Weekly_KPIs
Rows (metrics):
- New reviews (Google)
- New reviews (Yelp)
- Total new reviews
- Avg rating (Google)
- Avg rating (Yelp)
- Blended avg rating
- % responded (SLA window)
- Median response time (hrs)
- # negatives (1–3★)
- # escalations opened
- # escalations resolved
- # open escalations
- Top theme 1/2/3

Tab 3: Executive_Summary (one-screen)
- This week rating
- 4-week rating trend sparkline
- Response rate gauge
- Median response time
- Negatives count
- Open escalations count
- Key recommendations (bullets)

Operational note (internal):
This weekly report can be produced from the Reviews_Log tab with simple filters + pivot tables. If the client is on the client-post Yelp workflow, include a “Client Confirmed Posted” column to avoid mismatches.
