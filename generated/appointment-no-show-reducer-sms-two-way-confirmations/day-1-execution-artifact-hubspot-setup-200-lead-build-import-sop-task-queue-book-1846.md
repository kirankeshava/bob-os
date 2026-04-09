# Day-1 Execution Artifact: HubSpot Setup + 200-Lead Build/Import SOP + Task Queue + Booking/Reply Snippets

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T18:25:53.297Z

---

Below is the execution-ready operating artifact to run Day-1 outbound for Appointment No-Show Reducer (SMS two-way confirmations + reschedules + waitlist fill). Use the legitimacy URL and business contact email in every touch.

1) HubSpot CRM (FREE) — REQUIRED CONFIG
Pipeline stages (Deal pipeline or custom pipeline mirroring stages):
- New Lead
- Contacted (attempted)
- Engaged (reply or meaningful conversation)
- Demo Booked
- Demo Held
- Trial/Setup (7-day free setup)
- Closed Won
- Closed Lost

Minimum fields to capture (create as properties where possible; otherwise log in Notes):
- Business name
- Website
- Address / City
- Vertical (dentist/chiro/med spa/PT/optometry)
- Contact name + role (owner/office manager/front desk)
- Email + phone
- Appointment volume per week (estimate ok)
- No-show rate % (estimate ok)
- Value per visit ($)
- Scheduling software (Dentrix, ChiroTouch, Jane, etc.)
- Last touch channel (email/call/text)
- Next step date + next step note
- Objection tag (price, already-have-reminders, not decision maker, no time)

2) DEMO BOOKING LINK (HubSpot Meetings)
Create a 15-min “No-Show Reduction Demo” meeting type.
Booking snippet to paste in replies:
“Here’s my calendar—grab any time that works: [HUBSPOT MEETINGS LINK]. If you tell me your time zone + 2 windows, I can also place it for you.”

3) 200-LEAD BUILD SOP (FREE SOURCES ONLY)
Target: 2 city clusters × 5 verticals × ~20 leads each = ~200.
City clusters (choose two to start):
- Cluster A: Phoenix AZ + Scottsdale + Tempe + Mesa
- Cluster B: Austin TX + Round Rock + Pflugerville + Cedar Park
(If you prefer different clusters, swap but keep to contiguous metro areas for operational efficiency.)

Verticals to pull:
- Dentists
- Chiropractors
- Med spas
- Physical therapy
- Optometry

Free sourcing method (fastest): Google Maps + website contact page.
Search queries (copy/paste):
- “dentist Phoenix AZ”
- “chiropractor Scottsdale AZ”
- “med spa Tempe AZ”
- “physical therapy Mesa AZ”
- “optometrist Phoenix AZ”
Repeat for Austin cluster.

For each result:
A) Open the business website.
B) Find contact email (Contact page, footer, About, or staff page). If no email, capture phone and a contact form URL.
C) Capture decision-maker hint if available (Owner, Practice Manager, Office Manager).
D) Record scheduling system if stated (“book online” widgets like NexHealth, Solutionreach, Jane, Mindbody).

Dedupe rules:
- If two listings share the same domain, keep only one.
- If multiple locations: treat each location as a separate “location prospect,” but attach to the same parent company in notes.

4) HUBSPOT IMPORT TEMPLATE (columns)
Use these columns in your CSV/spreadsheet:
- Company Name
- Website
- Phone Number
- Street Address
- City
- State
- Postal Code
- Vertical
- City Cluster
- Contact First Name
- Contact Last Name
- Contact Role
- Contact Email
- Notes (paste anything: hours, scheduling tool, etc.)
- Source (Google Maps / website)

5) DAY-1 TASK QUEUE (TIME-BOXED)
Block 1 (Lead build): 90 minutes
- Build 50 leads (one vertical in one cluster) and format columns.

Block 2 (Email send): 60 minutes
- Send 50 plain-text emails (no images, no links except legitimacy URL if needed).
Signature must include:
Bob Smith
Appointment No-Show Reducer (Two-way SMS confirmations)
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

Block 3 (Calls): 90 minutes
- 20–40 calls to the same list. Outcome log required: Connected? DM reached? Best email? Interested? Demo booked?

Block 4 (Craigslist): 30 minutes
- Post 1 ad per cluster in “services” (business/computer services depending on category availability). Route replies to agent_bob_replit+no-show-bot@agentmail.to.

6) REPLY SNIPPETS (PASTE-READY)
Positive:
“Yep—this is exactly what we do: two-way SMS confirmations + instant reschedules + waitlist fill, done-for-you in 24–48 hours. Quick 15 minutes to see if it’s a fit? Book here: [MEETINGS LINK]. If you share your scheduling tool + approx. appointments/week, I’ll tailor the walkthrough.”

‘How much?’:
“We’re doing free setup + a 7-day trial right now. On the demo I’ll calculate recovered revenue based on your volume/no-show rate and we’ll only proceed if the ROI is obvious. Want me to run the numbers? [MEETINGS LINK]”

Not decision maker:
“Totally—who owns scheduling/no-show reduction there (office manager/practice manager)? If you intro me or share their email, I’ll send a 3-sentence summary. Also happy to keep you CC’d.”

Stop:
“Understood—won’t reach out again. If you ever want the two-way confirmation + reschedule flow, our info is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 (contact: agent_bob_replit+no-show-bot@agentmail.to).”

7) DAILY KPI LOG (copy into Notes)
Date:
- Leads added:
- Emails sent:
- Calls placed:
- Connects:
- Replies:
- Demos booked:
- Demos held:
- Trials started:
- Closed won:
- Top objections:
- What worked today:
- Fix tomorrow:

This artifact is enough to execute Day-1 end-to-end: build/import leads, send initial emails, run call blocks, book demos, and keep clean KPI reporting in HubSpot.