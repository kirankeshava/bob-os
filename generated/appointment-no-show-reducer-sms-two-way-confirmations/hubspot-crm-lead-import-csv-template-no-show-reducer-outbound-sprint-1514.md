# HubSpot CRM + Lead Import CSV Template (No-Show Reducer Outbound Sprint)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T16:14:13.607Z

---

Below is an import-ready CSV template (copy into Google Sheets, export CSV, then import into HubSpot). It is designed for fast manual sourcing from Google Maps + practice websites and for clean qualification during the first reply/call.

IMPORT OBJECTS (recommended): Companies + Contacts.
- Company unique key: Company domain (Website). If no website, use phone as unique identifier in a custom field.
- Contact unique key: Email.

CSV HEADERS (copy/paste as first row):
Company Name,Website,Company Phone,Street Address,City,State,Postal Code,Industry/Vertical,Source,Contact First Name,Contact Last Name,Contact Title,Contact Email,Contact Phone,Decision Maker? (Y/N),Scheduler Owner (Owner/Front desk/Office mgr/Other/Unknown),Appts per Week (est),No-Show % (est),Avg $ per Visit (est),Current Reminders (None/Manual/Automated/Unknown),Waitlist? (Y/N/Unknown),SMS Consent Status (Unknown/Has opt-in process/No opt-in),Last Touch Date,Last Touch Channel (Email/Call/Text),Last Touch Outcome (No answer/Left VM/Sent email/Replied/Booked),Next Step,Next Step Date,Notes

EXAMPLE ROWS (delete before import):
Bright Smile Dental,https://brightsmiledental.com,555-555-0101,123 Main St,Austin,TX,78701,Dentist,Google Maps,Alex,,Office Manager,alex@brightsmiledental.com,555-555-0102,Y,Office mgr,120,7,180,Automated,Y,Unknown,,Email,Sent email,Follow up #1,2026-04-10,"High volume hygiene; front desk mentioned occasional gaps"
Riverbend Chiropractic,https://riverbendchiro.com,555-555-0201,77 Oak Ave,Phoenix,AZ,85001,Chiropractor,Website,Jamie,,Owner,jamie@riverbendchiro.com,555-555-0202,Y,Owner,80,10,90,Manual,N,Unknown,,Call,Left VM,Send email + call back,2026-04-10,"Owner answers on Tue/Thu mornings"

DEDUPING RULES (use before import):
1) If Website matches an existing company in HubSpot, update the existing record instead of importing a duplicate.
2) If no Website, treat Company Phone as the dedupe key.
3) If Contact Email exists already, never import a second contact—append notes and update fields.

MINIMUM VIABLE DATA (if you’re moving fast):
- Company Name, Website (or Phone), City/State, Vertical, Source
- At least one of: Contact Email OR a dialable phone number
- Notes about who answers scheduling + any mention of no-shows/cancellations

OUTREACH FIELD USAGE (how this template maps to qualification):
- Appts/Week + No-Show% + Avg$/Visit → used to compute ‘Recovered revenue’ in the demo.
- Scheduler Owner + Decision Maker → determines whether to pitch front desk vs owner and how to book the right meeting.
- Current Reminders + Waitlist → determines which feature angle to lead with (two-way confirmation, instant reschedule, waitlist fill).

KPI TAGGING (simple):
- Last Touch Channel/Outcome + Next Step/Date are the minimum needed to run daily KPI reports: Sends, Calls, Replies, Demos booked, Demos held, Closes.

Legitimacy references to include in emails when needed:
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Contact inbox: agent_bob_replit+no-show-bot@agentmail.to

Once the first 200 are imported, we run Day-1 blocks: 50–100 emails + 20–40 calls/texts, logging outcomes directly into HubSpot using the fields above so follow-ups and demo booking are systematic.