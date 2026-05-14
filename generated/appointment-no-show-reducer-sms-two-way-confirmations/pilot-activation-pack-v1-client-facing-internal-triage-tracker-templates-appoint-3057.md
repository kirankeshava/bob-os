# Pilot Activation Pack v1 (Client-Facing) + Internal Triage/Tracker Templates — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:18:08.045Z

---

Appointment No-Show Reducer — Pilot Activation Pack v1

Legitimacy / Website (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support / Contact Email: agent_bob_replit+no-show-bot@agentmail.to

============================
A) CLIENT ONE-PAGER: “FREE 7-DAY PILOT — WHAT YOU GET + WHAT WE NEED”
============================

Goal (what this pilot is for)
We reduce appointment no-shows by sending smart SMS reminders, collecting two-way confirmations, and making it easy to reschedule so your calendar stays full. During this 7-day pilot we measure:
- Confirmation rate
- Reschedules handled (instead of no-shows)
- Waitlist fills (if enabled)
- Estimated revenue recovered

What you get (included in the free 7-day pilot)
1) Two-way SMS confirmations
- Customers can reply YES/NO/RESCHEDULE.
- We track confirmations and flag non-responders.

2) Smart reminders
- Typical cadence (customizable): 48 hours + 24 hours + 2 hours before appointment.

3) Reschedule workflow (concierge or automated)
- If a customer can’t make it, we trigger a reschedule path to save the appointment.

4) Basic weekly outcomes report
- We send a simple weekly summary with the numbers and estimated recovered revenue.

What we need from you (Day 0 checklist)
- Business name + location address
- Timezone and business hours
- Service types + appointment duration(s)
- Your current reminder process (if any)
- Average appointment value (or range)
- Baseline no-show estimate (last 4 weeks if possible)
- Confirmation/reschedule rules (e.g., “same-day reschedules allowed?”)
- A staff contact for escalations (name + email + phone)

Consent & compliance (important)
- You confirm you have consent to text your customers for appointment-related messages (transactional reminders).
- Every message includes opt-out language (“Reply STOP to opt out”).
- If a customer replies STOP, we immediately stop messaging that number.

Pilot success criteria (what “good” looks like)
- Confirmations increase vs baseline
- No-shows decrease OR reschedules increase (saved appointments)
- Staff reports fewer last-minute surprises

What happens after 7 days
- We review results with you on a 15-minute call.
- If it’s working, we continue with a paid plan. If not, we stop and share learnings.

To start
Reply with: (1) your timezone, (2) average appointment value, (3) best staff contact for escalations.
Or email us at agent_bob_replit+no-show-bot@agentmail.to.

============================
B) CLIENT HANDOUT: “DAY 0 SETUP CHECKLIST (15 MINUTES)”
============================

1) Confirm business details
- Location name:
- Address:
- Timezone:
- Business hours:

2) Confirm appointment types
- Service list + typical duration:
- Typical lead time (how far ahead customers book):

3) Reminder timing preferences (choose one; we can adjust)
- Option A: 48h + 24h + 2h
- Option B: 24h + 3h
- Option C: Custom: __________________

4) Confirmation rules
- Treat “YES/Y/CONFIRM” as Confirmed
- Treat “NO/CAN’T/DECLINE” as Cannot attend
- Treat “RESCHEDULE/RS” as Reschedule request

5) Reschedule handling (pick)
- Concierge: we notify staff immediately to reschedule manually
- Automated: we send a link/process to choose a new time (if available)

6) Waitlist (optional)
- Do you maintain a waitlist now? (Y/N)
- If yes, where is it managed? (sheet/software):
- Who approves offering a slot to the waitlist?:

7) Escalation contact
- Name:
- Phone:
- Email:

8) Review message tone (we keep it professional)
- Preferred business name in messages:
- Signature line (optional):

============================
C) CLIENT HANDOUT: “DAY 1–7 WHAT WE MONITOR (SO YOU DON’T HAVE TO)”
============================

Every day (internal checks)
- Reminder send success/failure (delivery errors)
- Reply handling accuracy (YES/NO/RESCHEDULE/STOP)
- Opt-outs honored instantly
- Any timezone/DST drift checks (appointments aligning to your local time)
- Calendar write-back correctness (if connected)

What we alert you about
- A calendar/integration failure (we’ll send an email alert with next steps)
- A high-risk day (many unconfirmed appointments within 24 hours)
- A reschedule request that needs staff action (if concierge mode)

Fail-safes
- If automation fails, we do not “guess”; we switch to manual notification so no one is double-booked.
- STOP/opt-out always wins (we stop messaging that number immediately).

============================
D) INTERNAL TEMPLATE: BUG/DEFECT TRIAGE BOARD (COPY/PASTE)
============================

Use this format for every defect found in QA or live pilots.

Defect ID:
Title:
Date found:
Found by:
Pilot/location:
Environment (prod/stage):
Severity (S0/S1/S2/S3):
- S0: Compliance/security issue, STOP not honored, messages sent at wrong time due to timezone bug
- S1: Core workflow broken (confirmations not recorded, reschedule loop fails)
- S2: Degraded experience (wrong wording, threading confusion, minor analytics mismatch)
- S3: Cosmetic/nice-to-have

Impact:
Steps to reproduce:
Expected result:
Actual result:
Logs/IDs (message ID, appointment ID):
Screenshots (if any):
Owner:
ETA:
Fix notes:
Verification steps:
Verified by:
Verified date:
Status (Open/In progress/Needs review/Done):

============================
E) INTERNAL TEMPLATE: 2–3 PILOT ACTIVATION TRACKER (COPY/PASTE)
============================

Columns:
- Prospect name
- Niche (dental/medspa/PT/salon/etc.)
- City
- Contact name + title
- Email/Phone
- Source (cold email/LinkedIn/referral)
- Status (Prospecting → Replied → Call booked → Onboarded → Live → Week-1 report sent → Converted)
- Date of last touch
- Next action
- Baseline no-show rate (if known)
- Avg appointment value
- Pilot start date
- Notes/risks

============================
F) DAILY OUTREACH OPERATING CADENCE (FREE)
============================

Objective: get 2–3 pilots live ASAP.

Daily (Mon–Fri)
1) Send 10 new cold emails to local appointment-based businesses (use legitimacy URL + support email).
2) Follow up on yesterday’s sends with 5 short replies (“any interest in a free 7-day pilot?”).
3) Post 1 LinkedIn DM batch (5 targets) to owners/managers.
4) Book 1–2 calls/week minimum; push Day 0 checklist immediately after agreement.

Operational rule: do not spend time polishing. The metric is “pilot locations live.”

— End of Pilot Activation Pack v1 —
