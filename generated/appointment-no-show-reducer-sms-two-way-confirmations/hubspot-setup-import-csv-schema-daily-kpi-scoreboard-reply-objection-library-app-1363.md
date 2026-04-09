# HubSpot Setup + Import CSV Schema + Daily KPI Scoreboard + Reply/Objection Library (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T15:25:02.848Z

---

Below is the operational package to stand up HubSpot (free) and run daily outbound with consistent logging.

1) HUBSPOT PIPELINE (Sales Pipeline)
Pipeline name: No-Show Reducer (Outbound)
Stages (in order):
1. New Lead (unworked)
2. Attempted Contact (Email 1 / Call 1)
3. Connected (two-way conversation)
4. Qualified (fit confirmed)
5. Demo Scheduled
6. Demo Held
7. Proposal/Checkout Sent
8. Closed Won (Location Live)
9. Closed Lost
10. Nurture (Not now)

Required deal properties (create as custom properties if needed):
- Vertical (Dental/Chiro/Med Spa/PT/Optometry/Other)
- City/State
- Locations Count (number)
- Appts per Week (estimate)
- No-Show Rate % (estimate)
- Avg Value per Visit ($)
- Scheduling System (e.g., Dentrix, Jane, Nextech, Acuity)
- Decision Maker Role (Owner/GM/Office Manager)
- Demo Date/Time
- Next Step (free text)
- Lead Source (Google Maps / Yelp / Directory / Referral / Craigslist / FB)
- Consent Notes (if texting; free text)

2) CONTACT/COMPANY IMPORT: CSV SCHEMA (copy as header row)
Use one row per location (company) and optional one primary contact.

Company fields:
Company Name,Website,Phone,Street Address,City,State,ZIP,Google Maps URL,Category/Vertical,Locations Count

Contact fields:
First Name,Last Name,Title,Email,Mobile Phone,LinkedIn URL

Tracking fields:
Lead Source,Owner/Manager Identified (Y/N),Last Touch Date,Last Touch Type (Email/Call/SMS/FB/CL),Status (New/Attempted/Connected/Qualified/Demo Scheduled/etc.),Notes

Formatting rules:
- Phone: store as +1XXXXXXXXXX if possible; otherwise standard US format.
- Last Touch Date: YYYY-MM-DD
- Status must match the pipeline stage names exactly for clean reporting.

3) DAILY KPI SCOREBOARD (paste into Sheet/Notion; one row per day)
Date | Leads Added | Emails Sent | Email Replies | Positive Replies | Calls Placed | Connections | Texts Sent | Demos Booked | Demos Held | Checkouts Sent | Closed Won (Locations) | Closed Lost | Top Objection | Notes / What to Fix Tomorrow

Daily targets (starting baseline):
- Emails Sent: 50–100
- Calls Placed: 20–40
- Demos Booked: 1–3/day once list is flowing

4) REPLY + OBJECTION LIBRARY (copy/paste)
All replies should include legitimacy link and reply-to inbox.
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Inbox: agent_bob_replit+no-show-bot@agentmail.to

A) Positive reply → book demo
Subject: Re: quick question
Body:
Thanks — easiest next step is a 12–15 min walkthrough. We’ll estimate no-show reduction + recovered revenue for your location and show the two-way SMS confirmations + instant reschedules + waitlist fill.

What’s the best email/number to send the invite to? Or grab a time that works and reply here.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

B) “How much does it cost?”
Body:
It depends on appointment volume + number of locations, but most single locations are in a simple monthly range that’s usually covered by recovering just a few missed visits.

If you tell me (1) appts/week and (2) average value per visit, I’ll give a straight estimate before we even meet. Or we can do a 12-min demo and I’ll calculate it live.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

C) “We already send reminders / our software does this”
Body:
Makes sense. The difference is two-way confirmations + automatic reschedules + waitlist fill (so cancellations/no-shows turn into kept appointments). Most reminder tools notify, but don’t actively recover the slot.

If you share your current system name, I’ll tell you whether we integrate/overlay cleanly. Quick overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

D) “Not interested / stop”
Body:
Understood — I won’t follow up again. If it’s helpful later, details are here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

E) “Send info”
Body:
Absolutely — here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Two quick questions so I send the most relevant details:
1) About how many appointments/week?
2) Which scheduling system do you use?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

5) MINIMUM QUALIFICATION CHECKLIST (ask on call or via email)
- How many appointments/week per location?
- Current no-show rate (rough)?
- Average revenue per kept visit?
- Who controls scheduling/reminders?
- What scheduling system + how do you currently remind?
If appts/week is low (<30/week) or no-shows already <3–4%, deprioritize unless multi-location.

This package is ready to implement today: create HubSpot, add the pipeline + properties, import first 200 leads using the schema, then start daily sends/calls and track everything in the KPI scoreboard.