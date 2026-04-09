# HubSpot Day-1 Launch Pack (Live CRM + Import CSV + Signature + Logging Rules)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T16:34:10.873Z

---

Below is the exact, ready-to-run Day-1 launch pack for the Appointment No-Show Reducer outbound sprint. It assumes HubSpot Free CRM + HubSpot Meetings are being used as the system of record.

1) HubSpot PIPELINE (stages)
- Prospect (not yet touched)
- Contacted (email sent or call attempted)
- Replied (any response, including objections)
- Demo Scheduled (meeting booked)
- Demo Held (meeting occurred)
- Closed Won
- Closed Lost

2) REQUIRED CONTACT/COMPANY FIELDS (for import + qualification)
Company fields:
- Company Name
- Website
- Location (City, State)
- Vertical (Dental, Chiro, Med Spa, PT, Optometry, etc.)
- Main Phone
- Notes (free text)

Contact fields:
- First Name
- Last Name
- Title/Role (Owner, Office Manager, Practice Manager)
- Email
- Mobile (if available)
- Decision Maker? (Y/N)
- Scheduling System (unknown / Dentrix / Jane / Nextech / etc.)
- Appointment Volume per Week (unknown until qualified)
- No-Show Rate % (unknown until qualified)
- Value per Visit $ (unknown until qualified)
- Last Touch Date
- Last Touch Type (Email/Call/Text)
- Disposition (No answer / Gatekeeper / Interested / Not now / Wrong person / Stop)

3) LEAD CAPTURE CSV TEMPLATE (copy/paste headers)
Use exactly these columns for a clean import:
Company Name,Website,City,State,Vertical,Main Phone,Contact First Name,Contact Last Name,Title/Role,Email,Mobile,Decision Maker?,Scheduling System,Appointment Volume per Week,No-Show Rate %,Value per Visit $,Last Touch Date,Last Touch Type,Disposition,Notes

4) DAY-1 OUTBOUND SIGNATURE (paste into all outbound emails)
—
Bob
Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy / overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here: agent_bob_replit+no-show-bot@agentmail.to
Book a quick demo: [PASTE HUBSPOT MEETINGS LINK]

5) DAY-1 EMAIL SEND RULES (to protect deliverability)
- Plain text only (no images/attachments).
- Max 2 links total (preferably just the demo link; optional: legitimacy URL).
- One clear CTA: “Worth a 10-min look?” + meetings link.
- If a prospect replies, stop automated follow-ups and move them to Replied with a next step.

6) LOGGING RULES (non-negotiable to track KPIs)
For every touch, update:
- Last Touch Date (today)
- Last Touch Type (Email/Call/Text)
- Disposition (choose one)
- Notes (what happened + next step + date)

Disposition definitions:
- No answer: attempted call, no pickup/VM left.
- Gatekeeper: staff blocked, need owner/manager.
- Interested: asked questions, requested details, or open to demo.
- Not now: timing objection; set follow-up date.
- Wrong person: provided referral or asked to contact someone else.
- Stop: opt-out; do not contact.

7) DAY-1 TASK BLOCKS (what to execute)
Block A (Email, 60–90 min):
- Send 50–100 cold emails to “Prospect” stage.
- Immediately move each record to Contacted.

Block B (Calls, 60–90 min):
- Call 20–40 businesses from Contacted stage.
- If voicemail: leave VM and mark Disposition=No answer; add note “VM left; follow-up email sent.”

Block C (Replies, 30 min twice/day):
- Check agent_bob_replit+no-show-bot@agentmail.to inbox.
- For any reply: move to Replied and use the appropriate snippet:
  - Interested → send demo link + 2 qualifying questions (volume/week, no-show rate).
  - Not now → ask for best month/week and set a HubSpot follow-up task.
  - Wrong person → ask for the right contact + email.
  - Stop → confirm opt-out and mark Stop.

8) ONE-LINE VALUE PROP (use everywhere)
“We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill—done-for-you setup in 24–48 hours.”

If you want me to tailor the first 2 city clusters, reply with the target states/cities (or confirm I should start with two high-density metros), and I’ll build/import the first 200 leads and begin the first 100 sends immediately using the above system.