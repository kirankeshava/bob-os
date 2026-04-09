# Day-1 Outbound Launch Bundle (HubSpot Setup + 200-Lead Import Schema + Reply/Booking Library)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T10:30:17.894Z

---

## 1) HubSpot Free CRM Setup Checklist (Appointment No-Show Reducer)

**Account**
- Sign up for HubSpot Free CRM using:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to
  - Company: Appointment No-Show Reducer

**Pipeline (Deals) – create these stages in order**
1. New Lead (not contacted)
2. Attempted Contact (email/call #1)
3. Connected (two-way convo started)
4. Qualified (meets minimum criteria)
5. Demo Booked
6. Demo Held
7. Closed Won
8. Closed Lost
9. Nurture (timing not right)

**Minimum qualification criteria (move to Qualified only if ≥2 are true)**
- Appointments/week: 30+ (or multi-provider)
- No-show rate: 5%+ (or “it’s a problem”)
- Value per visit: $100+
- Prospect has influence over scheduling/CRM/front desk workflow

**Custom properties (Contacts or Deals; keep it simple)**
- Vertical (Dental / Chiro / Med Spa / PT / Optometry / Other)
- City
- State
- Website
- Phone
- Appointment software (Zocdoc, NexHealth, Dentrix, Jane, Mindbody, Square, Other/Unknown)
- Appointments per week (numeric)
- No-show rate % (numeric or Unknown)
- Avg $ per visit (numeric or Unknown)
- Decision maker role (Owner / Office Manager / Front Desk / Marketing / Other)
- Primary objection (Price / Already have reminders / Not a priority / Compliance / Other)
- Next step date (date)
- Last touch channel (Email / Call / Text / Craigslist / FB)

**Views / Queues**
- Create a saved view: “Call Today” where Next step date = today OR Stage = Attempted Contact
- Create a saved view: “Reply Needed” where Stage = Connected and no Next step date set
- Create tasks: 
  - Task queue A: “Calls AM block (20)”
  - Task queue B: “Calls PM block (20)”

**Logging standard (fast)**
- Every touch = 1 note line: date + channel + outcome + next step.
  - Example: “2026-04-09 Email1 sent. No reply. Next: Call tomorrow 10am.”
  - Example: “2026-04-10 Call connected. OM interested. Demo booked Tue 2pm.”

---

## 2) 200-Lead Import Spreadsheet Schema (copy/paste into Google Sheets)

Create columns exactly like this (row 1 headers):
1. Company Name
2. Location Name (if multi-location)
3. Vertical
4. First Name
5. Last Name
6. Title/Role
7. Email
8. Phone
9. Website
10. Street Address
11. City
12. State
13. ZIP
14. Google Rating (optional)
15. Notes (source + any context)
16. Stage (default: New Lead)
17. Last Touch Date
18. Last Touch Channel
19. Next Step Date
20. Next Step (Call/Email/Text)

**Rules**
- One row = one location (not one brand). Multi-location brands get multiple rows.
- If you don’t have a contact name, put:
  - First Name: “Front”
  - Last Name: “Desk”
  - Title/Role: “Front Desk”
- Notes field must include the source URL or source type.
  - Example: “Source: Google Maps (keyword: chiropractor phoenix). Has ‘Book Online’.”

**City clusters to start (suggestion; adjust anytime)**
- Cluster A: Phoenix, AZ
- Cluster B: Dallas, TX

**Vertical focus order (best fit)**
1) Chiropractors 2) Med Spas 3) Dental

---

## 3) Reply + Booking Library (12 canned responses)

Use these from **agent_bob_replit+no-show-bot@agentmail.to**. Always include legitimacy URL:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

### A) Positive reply → Book demo
Subject: Re: no-show reduction

Thanks — easiest next step is a quick 12-minute demo.

Two questions so I tailor it:
1) About how many appointments/week do you run per location?
2) What system do you schedule in today (Jane/Mindbody/Dentrix/Square/etc.)?

Here’s the overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

If you prefer, reply with 2 times that work Tue–Thu and I’ll lock it in.
— Bob
agent_bob_replit+no-show-bot@agentmail.to

### B) “Send info” reply
Subject: Re: can you send details?

Yes — here’s the 60-second overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

In short: two-way SMS confirmations, instant reschedule links, and optional waitlist fill to plug gaps.

If you tell me your weekly appointment volume + current no-show %, I’ll estimate recovered revenue before we talk.
— Bob
agent_bob_replit+no-show-bot@agentmail.to

### C) Objection: “We already send reminders”
Totally — most places do. The difference here is **two-way confirmation + automated reschedules + waitlist fill** so the schedule doesn’t just “remind” people—it stays full.

Quick check: do your reminders let patients text back “confirm/cancel” and automatically open the slot for someone else?
If not, a 12-minute demo usually makes it obvious.
— Bob

### D) Objection: “Not a priority / busy”
Understood. If you can answer one question, I’ll tell you if it’s even worth revisiting:
Roughly how many no-shows/cancels do you see per week?

If it’s <2/week, probably not worth your time. If it’s 5+/week, it’s usually meaningful revenue.
— Bob

### E) Objection: “How much?”
It depends on location volume, but it’s typically priced per location/month and is designed to pay for itself from a small reduction in no-shows.

If you share:
1) appointments/week and 2) avg $ per visit,
I’ll send a simple ROI estimate and the best-fit tier.
— Bob

### F) Objection: “Compliance / TCPA”
Good question. We only message existing clients/patients for appointment-related notifications (transactional), and you control opt-out language and timing windows.

If you tell me your state and the system you schedule in, I’ll outline the safest configuration.
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob

### G) Gatekeeper: “Send to our office manager”
Happy to. What’s the best email for your office manager, and should I reference you?

Also: roughly how many appointments/week do you run?
— Bob

### H) “We’re a multi-location brand”
Great — we support multi-location rollouts and reporting per location.

How many locations and which scheduling system? If you share that, I’ll propose a fast pilot at 1–2 locations first.
— Bob

### I) Reschedule request (they want later)
Works for me. What timing is best — next week or next month?

If you reply with a date window, I’ll follow up then. In the meantime, here’s the overview:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
— Bob

### J) No response after interest (bump)
Subject: quick bump

Bumping this — should we do a quick 12-minute demo, or is no-show reduction not a focus right now?

If you prefer async, reply with appointments/week + current no-show rate and I’ll send an ROI estimate.
— Bob

### K) Breakup email (polite close)
Subject: close the loop

I didn’t hear back — closing the loop.

If reducing no-shows becomes a priority later, here’s the overview page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Reply “later” and I’ll follow up in 60 days.
— Bob

### L) STOP / Unsubscribe confirmation
Thanks — understood. I won’t reach out again.
— Bob

---

## Day-1 KPI Targets (log daily)
- Emails sent: 50–100
- Calls placed: 20–40
- Positive replies: 2–6
- Demos booked: 1–3/day after day 2–3
- Demos held: 70%+ of booked
- Close rate goal: 30–40% with fast setup offer (24–48 hours)
