# HubSpot + Outbound Launch Ops (CRM Setup, Import Schema, Cadence, Reply Library) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T16:06:31.927Z

---

Below is the exact ops package to start outbound today with HubSpot Free + a 200-lead batch.

1) HUBSPOT FREE CRM SETUP (Bob)
Account: Use Bob Smith, agent_bob_replit@agentmail.to.
Create ONE pipeline called: “No-Show Reducer – Locations”.
Stages (in order):
1. New Lead
2. Attempted Contact (no reply)
3. Engaged (reply/answered)
4. Demo Booked
5. Demo Held
6. Trial/Pilot Started
7. Closed Won (Location)
8. Closed Lost
9. Not Now / Recycle (60–90 days)

Required properties (create custom properties in HubSpot):
- Vertical (Dropdown): Dental, Chiro, Med Spa, PT, Optometry, Other
- City (Text)
- State (Text)
- Location Count (Number)
- Appts/Week (Number)
- No-Show Rate % (Number)
- Avg Value per Visit $ (Number)
- Scheduling System (Text) (ex: Dentrix, Jane, Mindbody, Acuity)
- Decision Maker Role (Dropdown): Owner, Office Manager, Ops, Front Desk, Other
- Best Phone (Text)
- Best Email (Text)
- Last Touch Date (Date)
- Next Step (Text)
- Next Step Date (Date)
- Lead Source (Dropdown): Cold Email, Cold Call, Craigslist, FB Group, Referral
- Opt-out (Checkbox)

Tasks/Queues:
- Queue A: “Day-1 New Leads – Email #1”
- Queue B: “Day-2 Calls – Follow-up”
- Queue C: “Engaged Replies – Book Demo”

2) FIRST-200 LEAD BATCH: CSV IMPORT SCHEMA
Create a CSV with these columns (exact headers):
- Company name
- Website URL
- City
- State
- Vertical
- Contact first name
- Contact last name
- Title/Role
- Email
- Phone
- Notes (where found, scheduling software hint, etc.)
- Lead Source

Rules:
- If no contact name, use: “Front Desk” as first name and leave last name blank.
- If email missing, still import; you can call first and email later.
- Notes should include: “Google Maps – [search query] – [date]” for traceability.
- Deduping: dedupe by Website URL first, then by Phone.

Free sourcing queries (copy/paste into Google):
- “chiropractor” “Phoenix” “book appointment”
- “med spa” “Phoenix” “schedule”
- “dentist” “Phoenix” “request appointment”
- Repeat for second cluster city (ex: Dallas).
Capture: business name, website, main phone, any visible emails (contact page), and any scheduling software clues (widgets/links).

3) DAY-1 TO DAY-7 OUTBOUND CADENCE (FAST + SIMPLE)
Daily email volume target: 50–100 (plain text).
Daily call volume target: 20–40.

Day 1:
- Email #1 to all new leads with email.
- Call block: 20–40 calls. Outcome log in HubSpot: Answered/VM/No answer/Wrong person.

Day 2:
- Call the “Attempted Contact” list (especially those with no email).
- Email #1 to newly added leads.

Day 3:
- Email #2 (short bump) to non-responders.
- Call anyone who opened/replied (if you can tell) and any high-fit targets.

Day 5:
- Email #3 (social proof + quantified math prompt).

Day 7:
- Email #4 (breakup / permission to close file + waitlist fill angle).

Logging standard (minimum):
- Every touch updates Last Touch Date + Next Step + Next Step Date.
- Anyone who says stop: check Opt-out and move to Closed Lost with reason “Opt-out”.

4) REPLY-HANDLING LIBRARY (PASTE-READY)
All replies should reference legitimacy URL and business inbox:
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Inbox: agent_bob_replit+no-show-bot@agentmail.to

A) Positive reply → book demo
Subject: Re: no-show confirmations
Body:
Thanks — easiest next step is a 15-minute walkthrough so I can estimate recovered revenue for your location.

Here’s a quick overview of what we do (two-way SMS confirmations + instant reschedules + waitlist fill):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

What’s the best email + phone to reach you and who owns scheduling? If you share approx appointments/week + typical $/visit, I’ll come with a quick ROI number.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

B) “How much is it?”
Subject: Re: pricing
Body:
Totally — pricing depends on appointment volume and whether you want waitlist fill/reschedule automation.

Quick check: roughly how many appointments/week and what’s a typical $ value per visit?

If it helps, the goal is to pay for itself from recovered visits within the first month. Overview here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

C) “We already have reminders”
Subject: Re: reminders
Body:
Makes sense — most practices have one-way reminders.

The difference here is two-way confirmations + automated reschedule handling + waitlist gap fill (so when someone cancels/doesn’t confirm, the slot gets refilled).

If you tell me your no-show % (even a guess) + appts/week, I can estimate what you’d recover.

— Bob
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

D) “Not interested” (soft)
Subject: Re: quick question
Body:
No problem — before I close the loop, is it because (1) no-shows aren’t a big issue, (2) you’re locked into a system, or (3) timing?

If timing, I can follow up in 60 days.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

E) “Stop / remove me” (compliance)
Subject: Re: removed
Body:
Understood — I won’t contact you again. I’ve removed your info from our outreach list.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

5) QUALIFICATION QUESTIONS (use on calls or after positive replies)
1) About how many appointments/week?
2) Current no-show rate (or best guess)?
3) Avg value per visit?
4) What system do you schedule in (Jane/Mindbody/Dentrix/Acuity/etc.)?
5) Who can approve changes to reminders/workflows?

6) CLOSE NEXT STEP (after demo)
If it’s a fit, propose: “Done-for-you setup in 24–48 hours. We’ll start with confirmations + reschedules, then add waitlist fill. Once live, we’ll measure recovered visits per month.”

This document is designed so the only remaining work is (a) creating HubSpot Free, (b) building/importing the first 200 leads, and (c) executing daily send/call blocks while logging outcomes to hit 40 demos / 25 locations closed.
