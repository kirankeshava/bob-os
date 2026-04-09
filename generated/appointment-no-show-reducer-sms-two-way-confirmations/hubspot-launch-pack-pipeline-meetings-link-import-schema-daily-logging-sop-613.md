# HubSpot Launch Pack (Pipeline + Meetings Link + Import Schema + Daily Logging SOP)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T08:46:36.863Z

---

Below is a ready-to-implement HubSpot setup pack for the Appointment No-Show Reducer outbound sprint.

1) HUBSPOT PIPELINE (Deals or Leads workflow)
Stages (use as a Deal pipeline or as Lead Status in Contacts):
- New Lead (not touched yet)
- Contacted (email/call attempted)
- Replied (any response)
- Demo Booked (meeting scheduled)
- Demo Held (meeting completed)
- Closed Won (paid location)
- Closed Lost (not buying now)
- Disqualified (wrong fit: too few appointments, no SMS permission, not appointment-based)

2) REQUIRED RECORD FIELDS (store on Contact; optionally mirror on Company)
Contact properties to capture:
- First Name
- Last Name
- Title/Role (Owner, Practice Manager, Office Manager, etc.)
- Email
- Phone
- Company Name
- Website
- City
- State
- Vertical (Chiropractic / Med Spa / Dental / PT / Optometry)
- Appointment Volume / Month (estimate)
- No-show rate (stated/estimated)
- Value per visit ($)
- Scheduler system (e.g., Dentrix, Jane, Mindbody, Acuity, etc.)
- Decision Maker? (Y/N)
- Notes (free text)
- Last Touch (date)
- Next Step (text)
- Next Step Date (date)

3) MEETINGS LINK (single demo scheduler)
Use the HubSpot Meetings link you created as the only booking CTA. Paste it into every reply + email footer.
Suggested meeting name: “15-min No-Show Reduction Demo (Two-way SMS + reschedules + waitlist fill)”
Meeting length: 15 minutes (optionally offer a 30-min deep dive after qualification).

4) OUTBOUND EMAIL SIGNATURE (plain text)
Bob Smith
Appointment No-Show Reducer (Two-way SMS confirmations + reschedules + waitlist fill)
Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Book a quick demo: [PASTE HUBSPOT MEETINGS LINK]
Reply here: agent_bob_replit+no-show-bot@agentmail.to

5) CSV IMPORT HEADER (copy/paste as first row)
Company Name,Website,First Name,Last Name,Title,Email,Phone,City,State,Vertical,Appointment Volume per Month,No-show Rate,Value per Visit,Scheduler System,Decision Maker (Y/N),Lead Stage,Last Touch,Next Step,Next Step Date,Notes,Source

Default values during import:
- Lead Stage = New Lead
- Source = “Manual outbound (Google/Directories)”

6) DAILY LOGGING SOP (fast, minimum viable)
Every touch must update 4 things:
- Lead Stage (New Lead → Contacted → Replied → Demo Booked → Demo Held → Closed Won/Lost)
- Last Touch (today)
- Notes (what happened + key numbers like volume/no-show/value)
- Next Step + Next Step Date (e.g., “Follow up #1”, “Call back Wed 2pm”, “Send Stripe link”, “Onboarding form”)

7) KPI COUNTERS (track daily in a simple note or spreadsheet)
- Emails sent
- Calls placed
- Connects
- Replies
- Demos booked
- Demos held
- Closes won
- Closes lost
- Time to setup (hours)

8) QUALIFICATION MINI-SCRIPT (use on calls + first demo minutes)
- “Roughly how many appointments do you run per week?”
- “What’s your no-show rate right now?”
- “What’s an average visit worth (or first visit)?”
- “Who owns the scheduling system and patient communication?”
If qualified: “If we can confirm/rebook even a small portion with two-way SMS and instant reschedules, would you want us to set this up done-for-you in 24–48 hours?”

All outbound messages should reference legitimacy:
- Website proof link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

Next execution step is to populate the first 200 leads using the CSV schema above and import them so Day-1 sending/calling can begin immediately.