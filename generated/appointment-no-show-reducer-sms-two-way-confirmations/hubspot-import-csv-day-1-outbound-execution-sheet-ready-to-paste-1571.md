# HubSpot Import CSV + Day-1 Outbound Execution Sheet (Ready to Paste)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T16:41:17.780Z

---

Below is the exact CSV header + data rules you can paste into a Google Sheet, fill quickly while sourcing leads, then export as CSV and import into HubSpot (Contacts). This is optimized for speed and for running 50–100 emails/day + 20–40 calls/day.

A) HUBSPOT CONTACT IMPORT CSV (HEADER ROW)
First Name,Last Name,Email,Phone,Company Name,Website,Street Address,City,State,Postal Code,Country,Job Title,Lead Source,Vertical,City Cluster,Appt Volume per Week,No-Show Rate %,Avg Visit Value $,Scheduling Owner (Name/Role),Current Reminder Method,SMS Vendor,Booking System,Integrations Notes,Last Touch Date,Next Step Date,Lifecycle Stage,Pipeline Stage,Owner,Notes

B) REQUIRED FILL RULES (MINIMUM VIABLE)
1) If you only have one name: put it in First Name, leave Last Name blank.
2) If no direct email exists: leave Email blank BUT still import the record; you can call first and request the best email for the scheduling lead.
3) Phone format: include area code; US numbers only for now.
4) Vertical must be one of: Dentist, Chiropractor, Med Spa, PT, Optometry (exact spelling for filtering).
5) City Cluster examples: “Phoenix AZ”, “Tampa FL”. Use exactly two clusters for the first batch.
6) Pipeline Stage values must match HubSpot stage names exactly: New Lead, Attempted Contact, Engaged, Demo Booked, Demo Held, Trial/Onboarding, Closed Won, Closed Lost.

C) DAY-1 EXECUTION SHEET (COPY INTO NOTES OR TASK LIST)
Goal today: 50–100 emails sent + 20–40 calls placed + 1 Craigslist post per cluster.

1) Inbox + identity
- Send from: agent_bob_replit+no-show-bot@agentmail.to
- Include legitimacy URL in footer (every email): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Signature (plain text):
  Bob
  Appointment No-Show Reducer (Two-way SMS confirmations)
  agent_bob_replit+no-show-bot@agentmail.to
  https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

2) Email send blocks (to protect deliverability)
- Block 1: 25 emails (mix verticals)
- Wait 60–90 minutes; process any replies.
- Block 2: 25 emails
- Optional Block 3: 25–50 emails if bounce/reply rates look normal.
Logging rule: After each block, update Last Touch Date, set Pipeline Stage=Attempted Contact, and add a short note: “E1 sent”.

3) Call blocks
- Block A: 10–15 calls to records missing email
- Block B: 10–15 calls to high-value clinics (multiple locations / extended hours)
Logging rule: If gatekeeper answers, note decision-maker name + best email, and set Next Step Date for follow-up.

4) First-touch email (use as default)
Subject: quick question about no-shows
Body:
Hi {{first_name}} — quick question.

Do you currently send appointment reminders that let patients/customers confirm by text (two-way), and automatically offer an instant reschedule if they can’t make it?

We reduce no-shows for appointment-based businesses with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.

If I can ask 2 questions (appt volume/week and typical no-show %), I can estimate what you’d recover monthly.

Bob
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

5) Positive reply → demo booking reply
“Great — what does your appointment volume look like in a typical week, and roughly what % end up no-show/cancel last-minute?

If you’re open to it, here’s a 15-min demo link: {{MEETINGS_LINK}}. If you reply with 2 times that work, I’ll lock one in.”

D) KPI SNAPSHOT (END OF DAY)
- Emails sent:
- Replies (total / positive):
- Calls placed:
- Conversations:
- Demos booked:
- Demos held:
- Closed won:
- Notes on objections encountered:

This artifact is designed so you can start sourcing leads immediately, import them to HubSpot in one shot, then run day-1 outreach without inventing anything new mid-flight.