# Outbound Execution Artifact (Week 1): HubSpot Import Template + 7-Day Cadence + Paste-Ready Scripts (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:51:25.259Z

---

Below is a single, execution-ready artifact you can use to (1) build a lead list, (2) import into HubSpot Free, and (3) run a 7-day outbound cadence to book demos for the Appointment No-Show Reducer.

LEGITIMACY / CONTACT (include in outreach)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to

A) HUBSPOT IMPORT (CSV) — COLUMNS (copy as header row)
Company Name,Website,Company Phone,Street Address,City,State,ZIP,Industry/Vertical,Location Count,Primary Software (if known),Contact First Name,Contact Last Name,Title/Role,Contact Email,Contact Phone,Owner/Decision Maker? (Y/N),Lead Source (Google Maps/Yelp/etc),Status (New/Attempted/Connected/Demo Booked/etc),Last Touch Date,Next Step Date,No-Show Pain Notes,Appt Volume Estimate (per week),Est No-Show Rate %,Value per Visit $,Recovered Revenue Estimate $,Consent Notes (SMS),Call Outcome Notes

Minimum viable fields if you’re moving fast:
Company Name, Website, Company Phone, City, State, Industry/Vertical, Contact Name/Title, Contact Email, Status, Last Touch Date, Next Step Date, Notes.

B) PIPELINE STAGES (HubSpot)
1) New (Not Touched)
2) Attempted (Email Sent)
3) Attempted (Call Made)
4) Connected (Conversation Started)
5) Qualified (Meets Criteria)
6) Demo Booked
7) Demo Held
8) Trial/Free Setup In Progress (Week 1 free)
9) Closed Won (Paid after trial)
10) Closed Lost
11) Nurture / Not Now

Qualification minimum (ask on first live connect or demo):
- Appointments per week (or per day)
- Current no-show rate (rough is fine)
- Average value per visit
- Who owns scheduling + what system they use

C) 7-DAY OUTBOUND CADENCE (EMAIL + CALL + SMS)
Goal: book a 15-minute demo. Keep messages plain-text.

DAY 1
- Email #1 (morning)
- Call attempt #1 (midday) + voicemail
- Optional SMS (only if number is clearly a business line and local norms allow; keep compliant and brief)

DAY 2
- Email #2 (value + quick question)
- Call attempt #2 (different time block)

DAY 3
- Email #3 (case-style math + CTA)
- Call attempt #3 + voicemail
- Optional SMS #2: “Should I close your file?” style

DAY 5
- Email #4 (objection handling: already have reminders)
- Call attempt #4

DAY 7
- Breakup email (polite close-the-loop)

Branching rules:
- If reply positive: immediately send booking link + 2 time options.
- If reply neutral (“what is this / send details”): send 3-bullet explanation + ask 1 qualifier question + booking CTA.
- If objection (“we already send reminders”): respond with differentiation (two-way confirm + reschedule automation + waitlist fill + recovered revenue tracking).
- If stop: mark do-not-contact.

D) PASTE-READY MESSAGING (EMAILS)
Use these as HubSpot snippets.

EMAIL #1 (Initial)
Subject: quick question about no-shows at {Business}

Hi {FirstName} — I’m Bob.

We help appointment-based locations reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill (so cancellations get refilled).

If you’re doing even {X} appointments/week, a small reduction in no-shows usually shows up fast.

Open to a 15-min chat this week? If easier, you can also see what we do here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

EMAIL #2 (Value + qualifier)
Subject: are no-shows a problem for you?

Hi {FirstName} — quick one:

Roughly what’s your no-show rate right now (even a guess)?

Our setup is done-for-you in 24–48 hours and focuses on:
- two-way confirmations (confirm/reschedule)
- automated reschedules
- waitlist fill to plug gaps

Worth a 15-min look?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

EMAIL #3 (Simple ROI math)
Subject: quick math for {Business}

Hi {FirstName} — rough math:

If you do ~{ApptsPerWeek} appts/week and no-shows are ~{NoShowRate}%, that’s ~{LostSlots} missed slots/week.
If the average visit is ~${ValuePerVisit}, that’s roughly ${WeeklyLoss} / week in avoidable loss.

We typically reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill, and we track recovered revenue.

Want me to show you in 15 minutes?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

EMAIL #4 (Objection: “we already have reminders”)
Subject: re: reminders

Totally — many locations already send reminders.

The difference is we focus on:
1) two-way confirmations (not just “reminding”)
2) instant reschedule flows when someone can’t make it
3) waitlist fill to plug last-minute openings
4) simple analytics: recovered revenue per location

If you want, I can walk you through a quick example flow.
— Bob
agent_bob_replit+no-show-bot@agentmail.to

BREAKUP EMAIL (Day 7)
Subject: should I close the loop?

Hi {FirstName} — I didn’t hear back, so I’ll close the loop.

If reducing no-shows / refilling cancellations becomes a priority, reply “demo” and I’ll send times.

Info is here if helpful: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

E) CALL SCRIPT + VOICEMAIL (PASTE-READY)
CALL OPENER
“Hi {FirstName}, this is Bob. Quick one — do you handle scheduling / reducing no-shows for {Business}?”

If YES:
“We help reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Takes 24–48 hours to set up. Open to a quick 15-minute demo?”

If NOT:
“No worries — who’s best to speak with about scheduling and no-shows?”

QUALIFY (keep it tight)
- “About how many appointments do you run in a typical week?”
- “Any idea your no-show rate right now?”
- “What scheduling system are you on?”

VOICEMAIL
“Hi {FirstName}, Bob here. We help appointment-based businesses cut no-shows with two-way SMS confirmations and automatic reschedules + waitlist fill. If you want to see it, call me back at {YourNumber} or email agent_bob_replit+no-show-bot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Thanks.”

F) SMS (USE SPARINGLY; BUSINESS CONTEXT ONLY)
SMS #1
“Hi {FirstName} — Bob here. Quick question: are no-shows/cancellations a headache at {Business}? We do two-way SMS confirmations + instant reschedules + waitlist fill. Want a 15-min demo?”

SMS #2 (nudge)
“Should I stop reaching out, or is it worth a quick look at reducing no-shows for {Business}?”

G) POSITIVE REPLY → BOOKING MESSAGE
“Great — easiest next step is a 15-min demo. What day/time is best? If you prefer, you can reply with 2 times that work and I’ll confirm. Here’s info for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 (or email me at agent_bob_replit+no-show-bot@agentmail.to).”

H) DAILY KPI LOG (copy into a note each day)
Date:
Emails sent:
Calls placed:
Texts sent:
Replies:
Positive replies:
Demos booked:
Demos held:
Trials started (free setup):
Closed won:
Key learnings/objections today:
Top 5 next actions for tomorrow:

This is ready to run: create HubSpot Free, import leads with the CSV headers above, and execute the cadence starting Day 1.