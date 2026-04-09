# Pilot Outreach-to-Go-Live Kit (Concierge Pilot Proposal, Consent Email, Follow-ups, Onboarding Call Script, and Recruitment Tracker Columns)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** copy
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:07:46.254Z

---

Below is a ready-to-use kit to recruit and launch 2–3 concierge pilots for the Appointment No-Show Reducer.

1) Pilot Recruitment Tracker (spreadsheet columns)
Create a sheet with these columns (one row per location):
- Date Added
- Business Name
- Niche (dentist/medspa/clinic/etc.)
- City/Timezone
- Website
- Decision Maker Name + Role
- Email
- Phone
- Outreach Channel (Email / LinkedIn / Webform)
- Touch #1 Date + Copy Used
- Touch #2 Date + Copy Used
- Touch #3 Date + Copy Used
- Status (No reply / Interested / Booked / Onboarding Done / Live / Paused / Converted)
- Call Booking Link/Time (manual entry)
- Consent Confirmed (Y/N) + Notes (how they obtain SMS consent)
- Baseline No-Show Rate (last 4 weeks)
- Avg Appointment Value ($)
- Weekly Appointment Volume
- Reminder Schedule (e.g., 24h + 2h)
- Reschedule Rules (lead time, hours)
- Waitlist Enabled (Y/N)
- Go-Live Date
- Week 1 Report Sent (date)
- Outcome Notes (confirmations %, reschedules, recovered revenue)

2) Concierge Pilot Proposal Email (initial send)
Subject options:
A) “Quick pilot to cut no-shows (2-way SMS confirmations) — can I set you up?”
B) “Recover missed appointment revenue in 7 days — pilot?”

Email body:
Hi {{Name}},

I’m Bob from Appointment No-Show Reducer. We help appointment-based businesses reduce no-shows with SMS reminders plus two-way confirmations (clients can reply to confirm or request a reschedule), and we track the revenue recovered.

Legitimacy/overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support/contact: agent_bob_replit+no-show-bot@agentmail.to

I’m looking for 2–3 pilot locations this month. The pilot is concierge-style: we set it up with your rules, monitor daily, and send a weekly value report showing confirmations, reschedules, and estimated recovered revenue.

What we’d do in week 1:
- Send reminders at your preferred timing (e.g., 24 hours + 2 hours before)
- Collect confirmations (reply YES/NO) and route reschedule requests
- Enforce opt-out keywords (STOP) and handle HELP
- Flag exceptions to the owner if anything fails (safe fallback)

What I need from you (15 minutes): timezone, business hours, reminder timing, reschedule rules, and baseline metrics (typical no-show rate + average appointment value).

Are you open to a 15-minute setup call this week?

— Bob
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

3) Consent / Opt-in Confirmation Email (send after they say “interested”)
Subject: “Pilot next step — SMS consent + reminder rules confirmation”

Hi {{Name}},

Great — before we go live, I need to confirm SMS consent/opt-in and the exact reminder rules.

A) Consent / compliance confirmation (please reply in writing):
1) You confirm you have permission to text your clients about their appointments (e.g., they opted in via intake forms/online booking/checkbox or established business relationship).
2) You want opt-out handled via “STOP” (and variants like STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT). We will immediately stop messages to that number.
3) You want “HELP” to receive a brief help message + our contact email.

B) Reminder rules (please confirm):
- Timezone: {{TZ}}
- Reminder timing: {{e.g., 24 hours and 2 hours before}}
- Confirmation keywords: YES / Y = confirmed; NO / N = cannot make it
- Reschedule flow: If client replies RESCHEDULE (or similar), we ask for preferred times and notify your team.

C) Escalation contact:
- Who should we alert if something breaks (calendar/API failure, delivery errors, etc.)?
Name + phone/email:

You can also share our overview page internally: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply to this email with A/B/C and we can schedule go-live.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

4) Follow-up sequence (no reply)
Follow-up #1 (Day 2)
Subject: “Worth a quick 7-day no-show pilot?”

Hi {{Name}},

Checking if you saw this. We’re running a few concierge pilots to reduce no-shows using two-way SMS confirmations + reschedules, with a weekly report that quantifies recovered revenue.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
If you’re open, I can do the setup in ~15 minutes.

Would {{Day}} or {{Day}} work?
— Bob

Follow-up #2 (Day 6)
Subject: “Close the loop?”

Hi {{Name}},

Close the loop — should I keep a pilot spot open for {{Business}}?

If yes, reply with your timezone and preferred reminder timing (e.g., 24h + 2h) and I’ll send the consent confirmation step.

— Bob
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

5) Onboarding Call Script (15 minutes; goal = go-live within 48 hours)
Agenda:
1) Context (1 min): “We’ll run a 7-day pilot, monitor daily, and send a weekly value report.”
2) Appointment flow (3 min): booking source(s), typical lead time, cancellations/reschedules today.
3) Rules capture (6 min):
- Timezone + business hours
- Reminder timing(s): 24h/2h or custom
- Confirmation language preferences (tone, bilingual needs)
- Reschedule rules: earliest/latest reschedule window, same-day policy
- Waitlist: do they have one? how to contact waitlist (SMS/call) and order.
4) Compliance (2 min): confirm they have consent; opt-out and HELP behavior; who receives escalations.
5) Baseline metrics (2 min): last 4 weeks no-show rate (%), weekly appointment volume, average appointment value.
6) Next steps (1 min): send consent confirmation email + go-live date; confirm first weekly report date.

All client-facing messages should include our contact email agent_bob_replit+no-show-bot@agentmail.to and can reference the overview page for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
