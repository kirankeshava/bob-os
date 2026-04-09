# Day-1 Outbound Launch Artifact: HubSpot Import Sheet + Lead Build Queries + Send/Call/SMS Scripts (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T14:45:02.970Z

---

Below is a ready-to-copy lead capture sheet format + HubSpot import mapping, followed by exact free lead sourcing queries and the Day-1 send/call/SMS scripts. All messaging references the legitimacy URL and routes replies to agent_bob_replit+no-show-bot@agentmail.to.

A) LEAD CAPTURE SHEET (CSV/Sheet columns)
Use exactly these columns (left to right) to avoid import issues and to keep logging fast:
1. Company Name
2. Vertical (Chiro / Med Spa / Dental)
3. City
4. State
5. Website
6. Google Business Profile URL
7. Main Phone
8. Location Count (1 if unknown)
9. Decision Maker Name (Owner/Manager/Office Manager)
10. Decision Maker Title
11. Decision Maker Email
12. Secondary Email (optional)
13. Notes (hours, booking link, “accepting new patients”, etc.)
14. Source (Google Maps / Directory name)
15. Last Touch Date
16. Next Step (Call / Email follow-up / Booked demo)
17. Stage (Prospect / Contacted / Replied / Demo Booked / Closed Won / Closed Lost)

Import mapping for HubSpot:
- Company Name -> Company name
- Website -> Company domain
- Main Phone -> Company phone number
- City/State -> Company city/state
- Notes -> Company description OR custom property “Sourcing notes”
- Decision Maker fields -> Contact properties (First name/Last name if available; otherwise store full name in First name)
- Decision Maker Email -> Contact email
- Stage -> Deal stage (create a deal per location OR track in contact stage if moving fast; recommend deal per location for reporting)

B) FIRST 200 LEADS: FREE SOURCING QUERIES (2 city clusters)
City Cluster 1: Phoenix, AZ (and nearby: Scottsdale, Tempe, Mesa)
City Cluster 2: Dallas, TX (and nearby: Plano, Frisco, Irving)

Vertical 1: Chiropractors
- Google query: site:google.com/maps "chiropractic" "Phoenix" "AZ"
- Google query: "Chiropractor" "Phoenix, AZ" "Book" "appointment"
- Directory query: "Phoenix chiropractor" + "office manager" (to find names/emails on About/Team pages)

Vertical 2: Med Spas
- Google query: site:google.com/maps "med spa" "Scottsdale"
- Google query: "medical spa" "Dallas" "book" "consultation"
- Directory query: "best med spa" + city (often list pages with many businesses)

Vertical 3: Dental
- Google query: site:google.com/maps "dentist" "Plano" "TX"
- Google query: "family dentistry" "Phoenix" "request appointment"
- Directory query: "dentist" + city + "insurance" (often leads to practice sites with contact forms/emails)

Dedupe rule (fast):
- Normalize company names by removing LLC/Inc/"Family" etc. If website domain matches an existing row, skip.
- If the phone matches an existing row, skip.

Email capture rule:
- If no email is listed, open the website and look for Contact page/footer (info@, hello@, appointments@).
- If none, use the contact form URL and log it in Notes. Still call.

C) DAY-1 SEND PLAN (50–100 emails)
Timing: 2 send blocks
- Block 1: 9:00–11:00 local time (25–50 emails)
- Block 2: 1:30–3:30 local time (25–50 emails)
Format rules:
- Plain text only
- No attachments
- One link max (use the legitimacy URL)
- Always include reply-to: agent_bob_replit+no-show-bot@agentmail.to

Email 1 (initial)
Subject options (rotate):
1) quick fix for no-shows at {{Practice}}
2) two-way SMS confirmations for {{City}} appointments
3) reduce last-minute cancellations?
4) question about your appointment reminders
5) waitlist fill when people cancel
6) {{Practice}} – missed appointments

Body:
Hi {{FirstName}} — Bob here.

We help appointment-based practices reduce no-shows with two-way SMS confirmations (patients confirm/cancel), instant reschedules, and waitlist fill to backfill gaps.

If you’re seeing even a few missed appointments/week, this usually pays for itself fast. We do the setup for you in 24–48 hours.

Are you the right person to talk to about scheduling + reminders at {{Practice}}?

Legitimacy/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Reply here: agent_bob_replit+no-show-bot@agentmail.to

— Bob

Email 2 (bump, +2 days)
Subject: Re: no-shows at {{Practice}}
Body:
{{FirstName}} — quick bump.

If you tell me (1) appointments/week and (2) your rough no-show rate, I can estimate recovered revenue per location.

Worth a 12-minute walkthrough this week?

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

Email 3 (objection pre-handle, +4 days)
Subject: is this already covered by your current system?
Body:
Totally fair if your PMS already sends reminders.

The difference: we collect confirmations (Y/N), automate reschedules when someone cancels, and use a waitlist to fill openings—so you actually recover slots, not just remind.

Who handles scheduling ops there?

Email 4 (breakup, +7 days)
Subject: should I close the loop?
Body:
If reducing no-shows isn’t a priority right now, no worries—tell me and I’ll close the loop.

If you want, reply with “send details” and I’ll forward a 3-bullet overview + pricing.

D) CALL SCRIPT (20–40/day)
Goal: identify decision maker, quantify pain, book demo.

Opener:
“Hi, is this {{Practice}}? This is Bob. Quick question—who handles appointment reminders/scheduling operations there?”

If decision maker comes on:
“Calling because we help practices cut no-shows using two-way SMS confirmations + instant reschedules + waitlist fill. Quick couple questions to see if it’s relevant?”

Qualifiers (keep fast):
1) “About how many appointments do you run per week?”
2) “Roughly what % no-show or late-cancel do you see?”
3) “What’s an average visit value?”
4) “What system do you schedule in today?”

Close to demo:
“Based on that, it’s likely leaving real revenue on the table. I can show you how the two-way confirmations + waitlist backfill works in ~12 minutes. Want to do today or tomorrow?”

If they ask for legitimacy:
“Absolutely—here’s our info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 and you can email me at agent_bob_replit+no-show-bot@agentmail.to.”

Voicemail:
“Hi {{FirstName}}, Bob. We help {{vertical}} practices reduce no-shows with two-way SMS confirmations plus automated reschedules and waitlist fill. If you want to see it, reply to my email or reach me at agent_bob_replit+no-show-bot@agentmail.to. Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. Thanks.”

E) SMS (only where compliant / existing relationship / explicit opt-in)
“Hi {{FirstName}}—Bob here. We help practices reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Open to a 12-min walkthrough? Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 Reply: agent_bob_replit+no-show-bot@agentmail.to”

F) DAILY KPI LOG (paste into HubSpot notes or Sheet)
Date:
- Emails sent:
- Calls placed:
- Connects:
- SMS sent (compliant):
- Replies (positive/neutral/negative):
- Demos booked:
- Demos held:
- Closed won (# locations):
- Closed lost:
- Key objections heard today:
- One improvement to test tomorrow:

This artifact is designed so the next execution step is purely mechanical: create HubSpot, build/import the first 200 leads, and begin day-1 sending/calling while tracking everything consistently.