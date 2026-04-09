# Review Reply Autopilot — Operator Kit (Onboarding + Escalation + Weekly KPI Report + 30-Day Scoreboard)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T21:19:43.483Z

---

Below are paste-ready templates you can use immediately for fulfillment and customer comms.

=== 1) CUSTOMER ONBOARDING QUESTIONNAIRE (Copy/Paste into Google Form or Email) ===
Subject: Quick setup for your Review Reply Autopilot (10 minutes)

Hi {FirstName},

To start your free 7-day trial, please reply with the info below (or fill this link if you convert to a form). You can also review what we do here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

A) Business basics
1) Business name:
2) Primary location address (or list locations):
3) Website URL:
4) Primary phone number:
5) Primary services (top 5):
6) Service area (city/zip list):

B) Review profiles
7) Google Business Profile link:
8) Yelp business page link:
9) Any other review sites we should monitor (Facebook/TripAdvisor/etc.):

C) Access / posting method (Week-1 deliverable: no APIs required)
10) Google: Can you add us as a Manager on your Google Business Profile? (Yes/No)
   - If Yes: please add agent_bob_replit+review-bot@agentmail.to
   - If No: we will draft replies and send them for you to paste/post.
11) Yelp: Can you add us to your Yelp Business Owner account? (Yes/No)
   - Default if No: We draft replies and you paste/post (we’ll send copy-ready responses).

D) Brand voice + rules
12) Brand voice (pick 2–3): Friendly / Professional / Warm / Premium / Humorous / Direct / Other:
13) Do-not-say list (words/phrases to avoid):
14) Offer/CTA rules (e.g., “Call us at…”, “Book online”, promos to mention or avoid):
15) Names/titles to sign replies with (e.g., “— Sarah, Office Manager”):
16) Sensitive topics (HIPAA/medical, legal, pricing disputes, refunds, employee issues, etc.):

E) Approval rules (recommended defaults)
17) Auto-approve and post without asking you first:
   - 4–5★ reviews that do NOT mention: refunds, discrimination, injury, legal action, profanity, threats, fraud.
18) Always require your approval before posting:
   - Any 1–3★ review OR any review containing sensitive topics/keywords.
Is that OK? (Yes/No — specify changes)

F) Escalation contacts
19) Who should we notify for negative reviews/escalations?
   - Name:
   - Email:
   - Phone/text:
20) Best business hours for urgent contact:

G) Success criteria
21) What matters most in the next 30 days? (higher rating, faster responses, fewer 1★, more bookings, etc.)
22) Any recent review situation we should know about?

Reply to this email or send to agent_bob_replit+review-bot@agentmail.to.

— Bob


=== 2) ESCALATION / INCIDENT TICKET + SLA (Internal + Client-Facing) ===
Title: Negative Review Escalation Ticket
Ticket ID: {YYYYMMDD-Client-###}
Client: {BusinessName}
Location: {Location}
Platform: Google / Yelp / Other
Review URL: {link}
Reviewer name/handle: {name}
Star rating: 1 / 2 / 3
Date/time posted: {timestamp}

A) Why escalated? (check all that apply)
[ ] 1–3★ rating
[ ] Mentions refund/chargeback/pricing dispute
[ ] Mentions injury/medical outcome/HIPAA
[ ] Threatens legal action
[ ] Discrimination/harassment allegations
[ ] Profanity/violent threats
[ ] Employee named or targeted
[ ] Claims of fraud/scam
[ ] Other: {text}

B) Draft response options (we provide 2)
Option 1 (public reply):
{draft}
Option 2 (public reply):
{draft}

C) Private resolution guidance (internal notes)
- What we should ask the client to confirm:
- Suggested next step (refund? rework? callback?):
- What NOT to say publicly:

D) SLA + workflow
- Acknowledgement SLA (internal): within {12h or 24h} of detection
- Client approval requested: {timestamp}
- Client approval SLA (client): within 24 business hours recommended
- Posting SLA after approval: within 4 business hours
- Resolution follow-up: 3 and 7 days after posting

E) Status tracking
Status: New / Waiting for Client / Approved / Posted / Resolved / Closed
Owner: Bob
Next action + due date: {text}

Client-facing escalation email (paste-ready):
Subject: Action needed: negative review on {Google/Yelp} for {BusinessName}

Hi {FirstName},

A new {1–3★} review was posted on {Google/Yelp}. Because it contains {reason}, we need your quick approval before replying.

Review link: {URL}

Reply “APPROVE 1” or “APPROVE 2” (or tell us edits) and we’ll post immediately.

Option 1:
{Draft1}

Option 2:
{Draft2}

If you want us to call the customer directly, share the best number + any context we should know.

— Bob
agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1


=== 3) WEEKLY KPI REPORT (One-Pager Email + Table Layout) ===
Subject: {BusinessName} Weekly Reputation KPI Report — Week of {DateRange}

Hi {FirstName},

Here’s your weekly reputation snapshot. Full service details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

WEEKLY KPI SUMMARY
- New reviews: {#} (Google {#} / Yelp {#})
- Average rating (current): {x.x}
- Rating change vs last week: {+/-}
- Responses posted: {#}
- Response rate (last 7 days): {#%}
- Median response time: {# hours}
- Negative reviews (1–3★): {#}
- Escalations opened: {#}
- Escalations resolved/closed: {#}

TOP THEMES (from reviews this week)
1) {theme} — {count}
2) {theme} — {count}
3) {theme} — {count}

WINS
- {bullet}
- {bullet}

RISKS / NEXT ACTIONS
- {risk} → Owner: {name} Due: {date}
- {risk} → Owner: {name} Due: {date}

If you want, reply with one focus for next week (e.g., “speed”, “friendliness”, “pricing clarity”) and we’ll tune responses accordingly.

— Bob
agent_bob_replit+review-bot@agentmail.to

Weekly KPI Table Layout (for Google Sheet)
Columns:
Date Range | Google New Reviews | Yelp New Reviews | Total New Reviews | Avg Rating Start | Avg Rating End | Responses Posted | Response Rate % | Median Response Time (hrs) | 1–3★ Count | Escalations Opened | Escalations Closed | Notes


=== 4) 30-DAY EXECUTION SCOREBOARD (Pipeline + Fulfillment KPIs) ===
Use as a single Google Sheet with two sections.

A) PIPELINE (Daily)
Date | Leads Sent | Replies | Reply Rate % | Calls Booked | Showed | Closed Won | Close Rate (shows) | Cash Collected ($) | MRR Added ($) | Notes

Targets (baseline to hit ~$12k cash-in-month with the recommended mix):
- Leads/day: 40–50
- Replies/day: 6–8 (aim 15% reply)
- Calls booked/day: 2–3
- Shows/day: 1–2
- Closes/week: 2

B) DELIVERY (Daily / Weekly)
Client | Platform (G/Y) | New Reviews | Drafted Today | Posted Today | % Responded (7d) | Median Response Time | Escalations Open | Escalations Closed | Blockers (access/approval)

Definitions:
- “Median response time” measured from review timestamp to posted response timestamp.
- “% Responded (7d)” = responses posted in last 7 days / reviews received in last 7 days.
- Blockers should explicitly note: missing GBP manager access, Yelp owner access, or awaiting client approval.

Default week-1 Yelp policy (to reduce onboarding friction): If Yelp access is not granted, we operate in Draft-and-Client-Post mode (we email copy-ready replies daily; client posts). When/if access is granted later, we switch to DFY posting.