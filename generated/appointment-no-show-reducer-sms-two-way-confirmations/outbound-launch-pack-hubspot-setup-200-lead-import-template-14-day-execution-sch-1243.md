# Outbound Launch Pack (HubSpot Setup + 200-Lead Import Template + 14-Day Execution Schedule + Daily KPI Report) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T14:11:03.326Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Reply-to / contact: agent_bob_replit+no-show-bot@agentmail.to

1) HUBSPOT FREE CRM SETUP (15–25 minutes)
Account: Create HubSpot free using Bob Smith, agent_bob_replit@agentmail.to.
Pipeline name: “No-Show Reducer Outbound”.
Stages (in order):
1. New Lead (Uncontacted)
2. Contacted (Attempted)
3. Engaged (Reply/Connected)
4. Demo Scheduled
5. Demo Held
6. Trial/Setup In Progress
7. Closed Won (Location Live)
8. Closed Lost
9. Nurture (Not Now)

Custom properties (minimal but sufficient):
- Vertical (dropdown): Dental, Chiro, Med Spa, PT, Optometry, Other
- City/Cluster (text)
- Appointment volume / week (number)
- Estimated no-show rate % (number)
- Avg value per visit ($) (number)
- Scheduling system (text) (e.g., NexHealth, Solutionreach, Jane, Mindbody, Acuity, “manual”)
- Decision maker (dropdown): Owner, Office Manager, Practice Manager, Front Desk, Unknown
- Best phone (text)
- Best email (text)
- Last touch date (date)
- Next step (text)
- Objection tag (dropdown): Price, Timing, Already using reminders, No texting, Low no-shows, Other

Task queues (create saved views):
- “Call Today” = Stage in New Lead/Contacted AND Next step contains “call”
- “Email Follow-ups” = Engaged AND Next step contains “email”
- “Demo Pipeline” = Demo Scheduled/Demo Held/Trial In Progress

Logging standard (fast): Every touch must have (a) channel, (b) 1-line outcome, (c) next step + date.
Example note: “Called—front desk; owner not in. Sent email w/ 2-way confirm + waitlist fill; follow up Thu 10am.”

2) 200-LEAD IMPORT TEMPLATE (COPY INTO GOOGLE SHEET THEN IMPORT)
Create columns exactly (HubSpot will map):
- Company name
- Website
- City
- State
- Vertical
- Contact first name
- Contact last name
- Title/Role
- Best email
- Best phone
- Source URL (Google Maps / directory link)
- Notes (1 line: #locations, hours, anything notable)
- Appointment volume / week (blank if unknown)
- Estimated no-show rate % (blank if unknown)
- Avg value per visit ($) (blank if unknown)
- Decision maker (Owner/Manager/Unknown)
- Stage (set all to “New Lead (Uncontacted)” on import)
- Next step (default: “Email 1 + Call 1”)

Data capture rules:
- Prefer single-location and small multi-location (2–10) first.
- If no email found, still capture phone + website; you can call and request best email for reminders vendor.
- Dedupe by website + phone.

Free sourcing queries (repeatable):
- “chiropractor near [CITY]”
- “med spa [CITY]”
- “dentist [CITY]”
- “physical therapy [CITY]”
- “optometrist [CITY]”
For each result: capture name, site, phone. Find email via contact page (look for “office@”, “info@”, “appointments@”).

3) 14-DAY EXECUTION SCHEDULE (VOLUME TARGETS)
Goal: 40 demos booked / 25 closes in 30 days. Leading indicator: booked demos/day.
Daily minimum (Mon–Fri): 75 emails sent + 25 calls (or 20 calls + 10 compliant texts).
Weekly minimum: 2 Craigslist posts per city cluster + 5–10 FB group value comments/posts.

Day 1:
- Build/import first 200 leads (2 city clusters × 3 verticals).
- Send Email #1 to 75–100.
- Call 20–30 (same-day follow-up on top accounts).
- Post 1 Craigslist ad per cluster.

Day 2:
- Add 50–100 new leads.
- Send Email #1 to new leads.
- Call block: yesterday’s non-answers + today’s top 10.
- FB: 1 value post + 2 comments (no pitch; offer checklist).

Day 3:
- Send follow-up Email #2 to Day-1 non-replies.
- New Email #1 to new leads.
- Call 25–40.

Day 4:
- Send follow-up Email #2 to Day-2 non-replies.
- Book demos; confirm time windows.
- Call 25–40.

Day 5:
- Send follow-up Email #3 (short) to Day-1 non-replies.
- Craigslist refresh (1 cluster).
- Call 25–40.

Week 2 (Days 6–10):
- Maintain daily: 75–100 sends/day + 25–40 calls/day.
- Run follow-up cadence: Day+2 and Day+4 nudges.
- Hold demos; close with Stripe link after demo; schedule concierge onboarding within 24–48h.

Days 11–14:
- Double down on responders + call-only leads (no email).
- Add “Nurture” bucket for “not now” and set 30-day follow-up task.

Core offer line to use everywhere:
“We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

4) DAILY KPI REPORT (COPY/PASTE EACH DAY)
Date:
Leads added today:
Total active leads in CRM:

Email:
- Emails sent:
- Replies (total):
- Positive replies:
- Unsub/stop:
- Bounce count:

Calls/SMS:
- Calls placed:
- Connects:
- Decision maker conversations:
- Texts sent (where compliant):

Pipeline:
- Demos booked today:
- Demos held today:
- Trials/setups started today:
- Closed won today (# locations):
- Revenue won today ($):

Notes (what worked / objections):
Top 3 deals + next step (date/time):

Prospect-facing proof + routing (include in signature/snippets):
- Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Email: agent_bob_replit+no-show-bot@agentmail.to

If you want the fastest close path: qualify on 4 numbers during first live convo—appointments/week, no-show %, $/visit, and who controls scheduling—then propose a recovered-revenue estimate and ask for a 14-day pilot + concierge setup window.