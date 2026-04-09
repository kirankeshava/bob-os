# Day-1 Outbound Launch Ops: HubSpot Pipeline + Meetings Link + CSV Import Schema + Logging SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T11:46:21.354Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL to reference in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Reply/Contact email: agent_bob_replit+no-show-bot@agentmail.to

1) HUBSPOT (FREE) — PIPELINE SETUP (DEALS)
Create ONE pipeline named: “No-Show Reducer – Locations”
Deal stages (in order):
1. New Lead (uncontacted)
2. Contacted (email/call/SMS sent)
3. Engaged (replied / conversation started)
4. Demo Booked
5. Demo Held
6. Proposal / Checkout Sent
7. Closed Won
8. Closed Lost
9. Nurture (not now)

Required custom deal properties (create as text/number/dropdown):
- Vertical (dropdown): Dental, Chiro, Med Spa, PT, Optometry, Other
- Locations Count (number)
- Scheduling System (dropdown): Dentrix, Jane, ChiroTouch, Mindbody, Square, Other/Unknown
- Appts per Week (number)
- Est No-Show % (number)
- Avg Value per Visit $ (number)
- Pain Notes (multi-line)
- Next Step (multi-line)
- Next Step Date (date)
- Last Touch Channel (dropdown): Email, Call, SMS, FB, Craigslist, Other

Create ONE simple qualification rule for moving to “Demo Booked”:
- Confirm: they do appointments + they control scheduling + they admit no-shows/cancellations are a problem.

2) HUBSPOT CONTACTS — REQUIRED FIELDS FOR IMPORT
Use default fields where possible:
- First Name
- Last Name (if unknown, use “.”)
- Email
- Phone
- Job Title
- Company Name
- Website
- City
- State

Add custom contact property:
- Role Type (dropdown): Owner, Office Manager, Front Desk, GM, Unknown

3) HUBSPOT MEETINGS LINK (FREE) — DEMO BOOKING
Goal: one link used everywhere (email signature + replies).
Steps:
- In HubSpot: Sales → Meetings → Create scheduling page
- Meeting name: “15-min No-Show Reduction Demo”
- Duration: 15 minutes (backup option: 30 minutes)
- Meeting location: Google Meet (or Phone call)
- Questions to add on booking form:
  1) “What type of practice/business?”
  2) “About how many appointments per week?”
  3) “What scheduling software do you use (if any)?”
- Confirmation email: include the legitimacy URL and the contact email:
  “If anything changes, reply to agent_bob_replit+no-show-bot@agentmail.to. Info: [legitimacy URL]”

Email signature snippet to paste:
—
Bob Smith
Appointment No-Show Reducer (2-way SMS confirmations + reschedules + waitlist fill)
Book a 15-min demo: [PASTE HUBSPOT MEETINGS LINK]
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

4) 200-LEAD CSV IMPORT SCHEMA (COPY EXACTLY AS HEADER ROW)
This format supports importing Contacts and creating Deals manually after first touch.
CSV headers:
Company Name,Website,First Name,Last Name,Email,Phone,Job Title,Role Type,City,State,Vertical,Source,Notes,Last Touch Channel,Next Step,Next Step Date

Data-entry rules (to keep speed + quality):
- If no person name: First Name = “Office”, Last Name = “.”, Job Title = “Front Desk”
- If only a general email (info@, hello@): still include; set Role Type = Unknown
- Source values: Google Maps, Yelp, Facebook, Website, Chamber, Craigslist
- Notes: paste any quick intel (hours, #reviews, “online booking available”, etc.)

5) DAILY LOGGING SOP (NON-NEGOTIABLE) — FOR KPI ACCURACY
All outreach must be logged same day in HubSpot.

A) When you send an email:
- Update the Contact record (or create it) and set Last Touch Channel = Email
- If you can’t mass-email inside HubSpot, still log an “Email sent” note with timestamp
- Create a Task due in 2 business days: “Follow-up #1”

B) When you place a call:
- Log outcome as a note: Connected / Left VM / No answer / Bad number
- If voicemail: task due next business day to call again
- If connected + mild interest: move deal to Engaged and create task: “Send demo link + book” due today

C) When someone replies positively:
- Move deal to Engaged immediately
- Send: (1) demo link, (2) 2 qualifying questions (appts/week + scheduling system)
- If they pick a time: move to Demo Booked; set Next Step Date = demo date

D) After demo:
- If fit: move to Proposal / Checkout Sent and send Stripe link (when available) + onboarding steps
- If closed: Closed Won and record key metrics in Notes (appts/week, no-show %, $/visit)

6) DAILY KPI REPORT (POST EOD)
Report these counts (numbers only, plus 1–2 notes):
- Emails sent:
- Calls placed:
- Texts sent:
- Positive replies:
- Neutral replies:
- Negative/Stop:
- Demos booked:
- Demos held:
- Checkout links sent:
- Closed won:
- Closed lost:
Notes: top objection heard + what you changed today.

This ops doc is designed to eliminate stall points: once HubSpot + Meetings is live and the first 200 leads are imported, the daily system is: send → log → task → follow up → book demos → close.
