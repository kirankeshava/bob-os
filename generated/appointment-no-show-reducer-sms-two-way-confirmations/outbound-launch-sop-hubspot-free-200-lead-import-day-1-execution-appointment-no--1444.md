# Outbound Launch SOP (HubSpot Free + 200-Lead Import + Day-1 Execution) — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T16:16:11.732Z

---

Goal (30 days): 40 demos booked, 25 locations closed. Offer: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

Legitimacy + contact (must be in templates/signature):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Reply/Contact: agent_bob_replit+no-show-bot@agentmail.to

A) HubSpot Free CRM Setup (15–25 min)
1) Create account (free): use Bob Smith, agent_bob_replit@agentmail.to.
2) Create ONE pipeline named: “No-Show Reducer Outbound”.
3) Pipeline stages (in order):
   - New Lead (uncontacted)
   - Emailed 1
   - Emailed 2
   - Called/SMS
   - Replied (Needs Qual)
   - Demo Booked
   - Demo Held
   - Closed Won
   - Closed Lost
   - Nurture / Later
4) Create custom properties (Company or Contact level as noted):
   Contact properties:
   - Role (Owner/Office Manager/Front Desk/GM/Other)
   - Mobile Phone (if different)
   - Best Time to Reach
   - Source (Google Maps/Yelp/Website/Craigslist/Referral)
   - Last Touch Type (Email/Call/Text)
   - Last Touch Date
   - Next Step (free text)
   Company properties:
   - Vertical (Dental/Chiro/Med Spa/PT/Optometry/etc.)
   - City Cluster
   - Scheduling System (Unknown/Squarespace/Calendly/Weave/Thryv/Mindbody/Other)
   - Appts per Week (est.)
   - No-Show % (est.)
   - $ per Visit (est.)
   - Qualified? (Y/N)
   - Recovered Revenue Potential ($) = (Appts per Week × No-Show % × $ per Visit) × 4 (manual calc OK)
5) Views/filters to create:
   - “Today Call List” = Stage in (Emailed 1, Emailed 2, Called/SMS) AND Next Step contains “CALL”
   - “Hot Replies” = Stage = Replied (Needs Qual)
   - “Demos This Week” = Stage = Demo Booked
6) Task queues:
   - Queue 1: “Day-1 Calls” (20–40 tasks)
   - Queue 2: “Reply Handling” (all replies same-day)

B) 200-Lead Build + Import (60–120 min, free sources)
Target ICP (start here): appointment-based, high $/visit, meaningful no-show pain.
Priority vertical order for first 200: Chiropractor, Med Spa, Dental (then PT, Optometry).
City clusters (pick 2 to start): Phoenix AZ + Dallas TX (or any two dense metros).

Lead sources (free):
1) Google Maps: search “{city} chiropractor”, “{city} med spa”, “{city} dentist”.
2) Yelp: same searches; use business site/phone.
3) Business websites: find “Contact” page for emails; if none, use contact form and capture phone.

What to capture (minimum viable):
- Company Name
- Website
- Main Phone
- City + State
- Vertical
- Contact Name (if listed) and Role (Owner/Manager/Office Manager)
- Email (any of: owner, manager, info@) — if no email, leave blank but keep phone.
- Notes (anything useful: “online booking”, “multiple locations”, “mentions no-show policy”, etc.)

Dedupe rules:
- Dedupe by Website domain first; if missing, dedupe by main phone.
- If multi-location, create separate Company records per location (add “Location Name/Address” in Company Name if needed).

CSV columns (ready for HubSpot import):
Company Name, Website, Phone Number, City, State, Vertical, City Cluster, Contact First Name, Contact Last Name, Role, Email, Source, Scheduling System, Appts per Week (est.), No-Show % (est.), $ per Visit (est.), Qualified?, Last Touch Type, Last Touch Date, Next Step, Notes

Import procedure:
- Import Companies + Contacts together.
- If no email, still import as Company only; create a Contact later after you get a name.

C) Day-1 Outreach Execution (same day as import)
Daily volume targets:
- Cold emails: 50–100/day (plain text)
- Calls: 20–40/day
- Optional compliant texts: only to business lines after a call attempt; keep neutral (“can I send details?”)

Day-1 schedule (example):
1) Block 1 (9:00–10:30am): Send Email #1 to 50 leads.
2) Block 2 (11:00am–12:00pm): Call 20 leads (voicemail if no answer).
3) Block 3 (2:00–3:00pm): Send Email #1 to next 25–50 leads OR Email #2 to prior-day leads.
4) Block 4 (4:00–5:00pm): Call 20 leads + handle replies.

Logging rules (non-negotiable):
- Every touch updates: Stage, Last Touch Type, Last Touch Date, Next Step.
- If reply received: move to “Replied (Needs Qual)” and add 1-line summary in Notes.
- If demo booked: move to “Demo Booked” and add date/time + decision-maker attending.

Email #1 (paste-ready, plain text)
Subject options: 
1) quick question about no-shows
2) reduce no-shows at {Business}
3) two-way confirmations for appointments
4) fill last-minute gaps?
5) appointment confirmations
6) reschedules + waitlist fill

Body:
Hi {FirstName} — quick question.

Do you ever deal with last-minute no-shows/cancellations at {BusinessName}?

We help appointment-based locations reduce no-shows using two-way SMS confirmations (patients reply to confirm), instant reschedules, and a waitlist to fill gaps. Done-for-you setup in 24–48 hours.

If it’s helpful, I can show you a 10-minute walkthrough and estimate recovered revenue per month.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Best email to coordinate? You can also reach me at agent_bob_replit+no-show-bot@agentmail.to.

— Bob

Call opener (20–30 seconds)
“Hi, is this {Name}? This is Bob — quick one. I’m reaching out because we help clinics reduce no-shows with two-way SMS confirmations and quick rescheduling. Who’s the best person to talk to about your appointment reminders/scheduling?”

Voicemail
“Hi {Name}, Bob here. We help appointment-based locations cut no-shows using two-way SMS confirmations plus instant reschedules and waitlist fill. If you want, I can share a 10-minute walkthrough. My email is agent_bob_replit+no-show-bot@agentmail.to and the site is https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. I’ll also send a quick email.”

Reply handling (fast qualify)
When they show interest, ask 4 questions (copy/paste):
1) Roughly how many appointments/week per location?
2) What’s your current no-show/cancellation rate?
3) What’s an average visit worth (or first visit)?
4) What system do you use for scheduling/reminders today, and who owns that?

D) Daily KPI report (end of day, 5 min)
- New leads added:
- Emails sent:
- Calls placed:
- Texts sent:
- Replies:
- Demos booked:
- Demos held:
- Closed won:
- Closed lost:
- Biggest objection today:
- Bottleneck to fix tomorrow:

Execution standard: speed > perfection. Get 50 emails + 20 calls done daily, log every outcome, and push every positive reply to a booked demo within 24 hours.