# Day-1 Outbound Operations Artifact: HubSpot Setup + Lead Capture CSV + Free Lead Sourcing SOP + Email Set (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T20:38:55.612Z

---

BUSINESS CONTEXT (use in every touch)
- Legitimacy URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Reply-to / business contact: agent_bob_replit+no-show-bot@agentmail.to
- Offer: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

A) HUBSPOT FREE CRM SETUP (do this first)
1) Create HubSpot Free account
- User: Bob Smith
- Email: agent_bob_replit@agentmail.to

2) Create a pipeline named: “No-Show Reducer – Outbound”
Stages (in order) with definitions:
1. Prospect Identified — lead exists, not contacted yet
2. Contacted (Email 1 sent) — first email sent
3. Contacted (Call/Text Attempted) — at least one call attempt logged
4. Engaged — replied / picked up / asked question
5. Demo Booked — meeting scheduled
6. Demo Held — demo completed
7. Trial/Setup In Progress — opted into free setup / trial
8. Won — converted location
9. Lost — not a fit / no response after cadence / explicit no

3) Required properties (create as custom properties if needed)
Contact-level:
- Role (Owner/Manager/Front Desk/Scheduler/Unknown)
- Best Phone
- Best Email
- Preferred Contact Method
Company-level:
- Vertical (Dental/Chiro/Med Spa/PT/Optometry/Other)
- City
- Location Count (1 / 2–5 / 6+)
- Scheduling System (Zocdoc, Mindbody, Dentrix, Jane, Google Calendar, Other, Unknown)
- Est. Appointments/Week (number)
- Est. No-Show Rate % (number)
- Avg $/Visit (number)
- Pain Trigger Notes (text)
- Qualification Score (Hot/Warm/Cold)
- Next Step (text)
Deal-level:
- Potential Monthly Recovered Revenue (calc/manual)
- Target Go-Live Date

4) Task queues
- “Daily Email Follow-ups” (due today)
- “Daily Call Block” (due today)
- “Demos to Confirm” (due 24h prior)

B) LEAD CAPTURE TEMPLATE (CSV COLUMNS)
Copy these columns into Google Sheets; export CSV for HubSpot import.

Columns:
1. Company Name
2. Website
3. Google Maps URL
4. Vertical
5. City
6. State
7. Phone
8. Contact First Name
9. Contact Last Name
10. Title/Role
11. Email
12. Secondary Email
13. Notes (source + quick context)
14. Scheduling System (if visible)
15. Est. Appointments/Week
16. Est. No-Show Rate %
17. Avg $/Visit
18. Qualification Score (Hot/Warm/Cold)
19. Last Touch Date
20. Next Step

Row formatting rules (speed + consistency):
- If no email found, leave Email blank but still add Phone and mark Next Step = “Call to find scheduler email”
- Notes must include source (“Google Maps”, “Yelp”, “Directory”) and 1 personalization token (e.g., “offers Invisalign”, “open late Tue/Thu”, “5 providers”).

C) FREE LEAD SOURCING SOP (200 LEADS IN 1 DAY)
Goal: Build 200 leads across 2 city clusters × 5 verticals (= ~20 per vertical per city).

1) Choose 2 city clusters (examples)
- Cluster A: Phoenix, AZ metro (Phoenix/Scottsdale/Tempe/Mesa)
- Cluster B: Dallas, TX metro (Dallas/Plano/Frisco/Irving)
(You can swap to any metros with dense appointment businesses.)

2) Verticals (pick 5)
- Dental (dentist, orthodontist)
- Chiropractor
- Med spa (aesthetics)
- Physical therapy
- Optometry

3) Where to pull leads (free)
Primary: Google Maps listings (fastest)
Secondary: Yelp category pages
Tertiary: Niche directories (examples)
- Dental: local dental society member directory (if public), “top dentists in [city]” lists
- PT: clinics on insurer directories (often show phone)
- Med spa: local “aesthetics” directories

4) Exact search queries (copy/paste)
Use these in Google:
- site:google.com/maps "dentist" "Phoenix, AZ"
- site:google.com/maps "chiropractor" "Phoenix, AZ"
- site:google.com/maps "medical spa" "Phoenix, AZ"
- site:google.com/maps "physical therapy" "Phoenix, AZ"
- site:google.com/maps "optometrist" "Phoenix, AZ"
Repeat for second city.

5) Data capture steps (per lead)
- Open listing → capture Company Name, Phone, Website, Google Maps URL.
- Open website → find “Contact”, “About”, “Team” pages.
- Grab best email (priority order): owner/manager/scheduler/frontdesk; otherwise use general inbox.
- Add 1 personalization token to Notes.
- If no email on site: check footer, privacy policy, booking page; then use contact form to identify format (e.g., firstname@domain) if staff names are present.
- If still no email: keep the lead (phone-only) and mark Next Step = Call.

6) Dedupe rules
- Dedupe by Website domain first; if no website, dedupe by Phone.
- If multi-location brand, create separate rows by location if scheduling is per location.

D) DAY-1 EMAIL SET (READY TO SEND)
Plain-text only; keep under ~120 words; send from agent_bob_replit+no-show-bot@agentmail.to.

Email 1 (two-way confirmations + reschedules)
Subject: quick fix for no-shows at {{Company}}

Hi {{FirstName}} — Bob here.

If {{Company}} deals with last-minute no-shows/cancellations, we built a simple SMS system that:
1) sends smart reminders,
2) gets a YES/NO confirmation (two-way),
3) auto-offers reschedule options, and
4) fills gaps from a waitlist.

We do the setup for you in 24–48 hours (free trial week).

Worth a 12-minute demo? If yes, reply with a good time.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

Follow-up 1 (bump + simple qualifying question)
Subject: Re: no-shows at {{Company}}

Hi {{FirstName}} — quick bump.

Two questions to see if this is worth your time:
- Roughly how many appointments/week per location?
- What’s a typical no-show % (even a guess)?

If you share those, I’ll estimate recovered revenue and show the exact reminder/confirmation flow on a short demo.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Follow-up 2 (social proof style without claims)
Subject: last try — should I close your file?

Hi {{FirstName}},

Should I close the loop on this? We’re offering a free setup + 7-day trial for a few locations and tracking how many visits are recovered from confirmations/reschedules/waitlist fills.

If someone else owns scheduling, who’s best to loop in?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

E) MINIMUM DAILY KPI LOG (paste into notes)
Date:
- New leads added:
- Emails sent:
- Calls placed:
- Texts sent (where compliant):
- Replies:
- Positive replies:
- Demos booked:
- Demos held:
- Trials started:
- Won:
- Notes (what vertical/city performed best):

Execution order for Day-1:
1) Build 50 leads → send 50 emails.
2) Build next 50 leads → send next 50 emails.
3) Call block on phone-only leads + anyone who opened/replied (if known).
4) Log everything in HubSpot same day (no backlog).