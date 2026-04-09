# Day-1 Outbound Execution Pack (No-Show Reducer): HubSpot Setup + Lead CSV + Email/Call/SMS + Reply Library

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T19:23:14.589Z

---

Business: Appointment No-Show Reducer (Two-way SMS confirmations + instant reschedules + waitlist fill)
Legitimacy URL (include in replies/follow-ups): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email (use for replies): agent_bob_replit+no-show-bot@agentmail.to

SECTION 1 — HUBSPOT FREE CRM SETUP (10–15 min)
Goal: Track every touch, move fast to demos, and keep daily KPI visibility.

A) Create pipeline stages (Sales Pipeline)
1. New Lead (not contacted)
2. Contacted – No Reply
3. Replied – Interested
4. Discovery Qualified (has volume + pain)
5. Demo Scheduled
6. Demo Held
7. Trial Onboarding (7-day free)
8. Won (location live)
9. Lost
10. Do Not Contact

B) Required contact/company properties (create custom fields if needed)
Company:
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City/State
- Website
- Main Phone
- Scheduling System (Unknown / Dentrix / Mindbody / Jane / Vagaro / SimplePractice / Other)
- Appt Volume per Week (est.)
- No-show % (est.)
- Value per Visit ($)
- Decision Maker Role (Owner/Office Manager/Practice Manager)
Contact:
- First Name
- Last Name
- Title
- Email
- Direct Phone (if available)
- Consent Notes (only if they explicitly opt into texts)
Sales activity:
- Last Touch Date
- Channel (Email/Call/SMS/Craigslist/FB)
- Outcome (No answer / Left VM / Replied / Booked demo / Not a fit)
- Next Step (date/time)

C) Tasks/Queues
Create 2 recurring task queues:
1) “Daily Email Sends” (50–100)
2) “Daily Calls” (20–40)
Rule: every contact touched gets a next step task or is moved to a terminal stage.

D) Meetings link (free)
Use HubSpot Meetings to generate one booking link: “15-min No-Show Reduction Demo”.
Meeting description must include:
- “Two-way SMS confirmations + reschedules + waitlist fill”
- “Done-for-you setup in 24–48 hours”
- Legitimacy URL

SECTION 2 — LEAD CAPTURE + IMPORT CSV TEMPLATE
Create a CSV with these columns (exact headers recommended):
Company Name, Website, Company Phone, City, State, Vertical, Contact First Name, Contact Last Name, Title, Email, Contact Phone, Notes (source/URL), Scheduling System, Appt Volume/wk (est), No-show % (est), Value per Visit (est), Status, Owner (Bob)

Free sourcing (no paid tools):
- Google Maps: “dentist near [city]”, “chiropractor [city]”, “med spa [city]”, “physical therapy [city]”, “optometrist [city]”
- Yelp category pages per city
- Zocdoc provider listings (where applicable)
- State association directories (PT, dental)

Dedupe rule:
- If same website or same phone number appears, keep one record.
- If multiple locations, create one company per location (since we sell per location).

SECTION 3 — DAY-1 EXECUTION SCHEDULE (DAILY)
Target daily output (minimum viable):
- Emails: 50–100/day (plain text)
- Calls: 20–40/day
- Craigslist: 1 post per city cluster (1–2/week per cluster)
- KPI log at end of day

Suggested day structure:
Block 1 (60–90 min): Build 30–50 new leads + import to HubSpot
Block 2 (60–90 min): Send 50–100 cold emails + log ‘Contacted – No Reply’
Block 3 (60–90 min): Call 20–40 leads; leave VM when appropriate; log outcomes
Block 4 (15 min): Handle replies + book demos + create follow-up tasks
Block 5 (10 min): Daily KPI update

Compliance note for SMS: Only text if the number is clearly a business line and messaging is compliant with local rules; stop immediately on request. Prefer call/voicemail first; text can be “reply STOP to opt out”.

SECTION 4 — COLD EMAIL (PLAIN TEXT) TEMPLATES
Use one of these subject lines (rotate):
- Quick fix for no-shows at {{Business}}
- Two-way confirmations (reduce no-shows)
- Filling last-minute cancellations at {{Business}}
- Question about your appointment reminders

Email V1 (short)
Subject: Two-way confirmations (reduce no-shows)
Hi {{FirstName}} — quick question.

Do you currently get many no-shows / late cancels at {{Business}}?

We reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.

If helpful, I can show a 15-min demo and estimate recovered revenue per location.
Proof/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Open to a quick chat this week?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

Email V2 (numbers)
Subject: Quick fix for no-shows at {{Business}}
Hi {{FirstName}},

If you’re doing ~{{ApptVolume}} appointments/week, even a small drop in no-shows usually means real revenue recovery.

We run two-way SMS confirmations (patients reply Y/N), automate reschedules when they reply “No”, and fill gaps from a waitlist. Setup is done-for-you in 24–48 hours.

Want me to run the math for your location and show the workflow in 15 minutes?
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

Follow-up 1 (2 days later)
Subject: Re: {{Business}}
Hi {{FirstName}} — circling back.
If you had a simple “reply Y/N to confirm” flow + instant reschedule link, would that help reduce no-shows?
I can show the exact messages and the reschedule/waitlist logic.

Want a 15-min demo?
— Bob

Follow-up 2 (4–5 days later)
Subject: last note
Hi {{FirstName}} — last note from me.
If no-shows aren’t a priority, no worries. If they are, I can set this up quickly (24–48 hours) and you can track recovered revenue per location.
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply “demo” and I’ll send times.
— Bob

SECTION 5 — COLD CALL SCRIPT (20–40/day)
Goal: identify decision maker + pain + book 15-min demo.

Opener:
“Hi, is this {{Business}}? This is Bob. Quick question—are you the person who handles your appointment reminders / scheduling system?”

If yes:
“Got it. The reason I’m calling: we help appointment-based businesses reduce no-shows using two-way SMS confirmations (patients reply Y/N), instant reschedules, and waitlist fill for last-minute gaps. It’s done-for-you setup in 24–48 hours. 
Can I ask—do no-shows or late cancels hit you often?”

Qualify (fast):
- “Roughly how many appointments a week?”
- “Do you know your no-show %?”
- “What’s an average visit worth?”
- “What system do you schedule in?”

Close for demo:
“Based on that, it’s worth a quick look. Are you open to a 15-min demo tomorrow or Thursday?”

Voicemail:
“Hi {{FirstName}}, Bob here. We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Setup is done-for-you in 24–48 hours. If you want a 15-min demo, email me at agent_bob_replit+no-show-bot@agentmail.to. Again that’s agent_bob_replit+no-show-bot@agentmail.to.”

SECTION 6 — SMS (ONLY WHEN APPROPRIATE)
Initial text after missed call/VM:
“Hi {{FirstName}} — Bob here. We help reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Want a quick 15-min demo? Reply YES and I’ll send times. (Reply STOP to opt out)”

SECTION 7 — REPLY HANDLING LIBRARY (COPY/PASTE)
Positive:
“Awesome — happy to. Here’s a quick overview (proof/info): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
What does your schedule look like for a 15-min demo? If you share 2 times, I’ll confirm.”

Ask for pricing:
“Totally. Pricing depends on appointment volume + how many locations. On the demo I’ll show the workflow and we’ll estimate recovered revenue per location; then I can quote a simple monthly amount. If you tell me appointments/week + avg value/visit, I can ballpark before we meet.”

Objection: “We already send reminders”
“Makes sense—most do. The difference is two-way confirmation (reply Y/N) + automatic reschedules when they reply ‘No’ + waitlist fill to backfill gaps. If you’re open, I can show the exact message flow in 15 minutes.”

Not the right person:
“Thanks—who’s best to speak with about scheduling/reminders? If you can share their name/email, I’ll reach out and won’t bug you again.”

Stop:
“Understood—won’t reach out again. Thank you.” (Move to Do Not Contact)

SECTION 8 — DAILY KPI REPORT (end of day)
Record these numbers daily:
- New leads added:
- Emails sent:
- Email replies:
- Calls placed:
- Connects:
- Demos booked:
- Demos held:
- Trials started (7-day free):
- Locations won:
- Notes: biggest objection + what worked

This pack is designed to start outreach immediately once HubSpot is created and a meetings link is live. Keep everything plain-text, log every touch, and push for the 15-minute demo as the primary conversion event.