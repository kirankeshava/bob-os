# Day-1 Launch Packet — HubSpot Setup + Lead Sheet + 7-Touch Cadence + KPI Report (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T05:42:55.094Z

---

Below is a single packet you can use to start outbound TODAY (no paid tools). It assumes offer: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

A) HUBSPOT FREE CRM SETUP (copy exactly)
1) Create account (free): use Bob / agent_bob_replit@agentmail.to.
2) Pipeline name: “No-Show Reducer Outbound”.
3) Deal stages:
   - New Lead (not contacted)
   - Contacted (touch 1 sent)
   - Engaged (replied / connected)
   - Demo Booked
   - Demo Held
   - Trial / Pilot (7-day free)
   - Closed Won (Location live)
   - Closed Lost
4) Custom contact properties (minimum viable):
   - Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
   - City
   - Scheduling System (unknown/ChiroTouch/Dentrix/Square/Acuity/etc.)
   - Appts per week (estimate)
   - No-show rate (estimate)
   - $ value per visit (estimate)
   - Decision maker (Owner/Office manager/GM)
   - Best phone
   - Best email
   - Lead Source (Google Maps/Yelp/Directory/Craigslist/FB Group)
   - Last touch date
   - Next step (text)
5) Activity logging rule: every email/call/text = Log Activity note with: “Touch #, channel, result, next step + date”. Speed > perfection.

B) LEAD CAPTURE SHEET (Google Sheets columns)
Use these columns in this order so import is clean:
- Business Name
- Website
- Main Phone
- Contact First Name
- Contact Last Name
- Contact Role (Owner/Manager/Office Manager)
- Email
- City
- State
- Vertical
- Notes (hours, #locations, scheduling tool hints)
- Source URL
- Lead Source
- Status (New/Contacted/Engaged/Demo Booked/etc.)

Free sourcing (2 clusters to start): pick 2 nearby metros. For each vertical, pull 20 businesses per city (goal: 200 leads total).
Search patterns:
- “city dentist appointment”
- “city chiropractic clinic”
- “city med spa book online”
- “city physical therapy clinic”
- “city optometry appointment”
Use Google Maps: open listing → copy website/phone. If email not listed, use Contact page. If still missing, capture phone only and route to call/SMS.

C) 7-TOUCH CADENCE (14 days)
Touch 1 (Day 1): Email #1
Touch 2 (Day 2): Call + voicemail
Touch 3 (Day 4): Email #2
Touch 4 (Day 6): Call + (optional) compliant text if business line accepts texts
Touch 5 (Day 8): Email #3 (short)
Touch 6 (Day 11): Call
Touch 7 (Day 14): Breakup email

Compliance note: only text business numbers where reasonable and include opt-out language (“Reply STOP to opt out”). If unsure, call only.

D) READY-TO-SEND EMAILS (plain text)
Include legitimacy URL in every thread:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply-to/Contact: agent_bob_replit+no-show-bot@agentmail.to

Email #1 (Touch 1)
Subject: quick question about appointment confirmations
Body:
Hi {{FirstName}} — quick question. Do you currently use two-way SMS confirmations (patients reply Y/N) to cut no-shows?

We help appointment-based locations reduce no-shows by sending smart reminders, collecting confirmations, automating reschedules, and filling gaps from a waitlist. Setup is done-for-you in 24–48 hours.

If I can ask two numbers, I can tell you if it’s worth a 10-min demo:
1) approx appointments per week?
2) typical no-show rate?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Or reply here: agent_bob_replit+no-show-bot@agentmail.to
— Bob

Email #2 (Touch 3)
Subject: {{BusinessName}} — simple way to recover missed visits
Body:
Hi {{FirstName}} — most locations we talk to are losing revenue from (1) no-shows and (2) late cancels that don’t get refilled.

Our system:
- SMS reminders + two-way confirmation
- “Need to reschedule?” link that books immediately
- waitlist fill to plug gaps
- basic analytics showing recovered visits/revenue

If you tell me your avg $/visit and rough no-show %, I’ll send a quick estimate of what you could recover per month.

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to
— Bob

Email #3 (Touch 5, very short)
Subject: worth a 10-min look?
Body:
{{FirstName}} — should I (a) send over an estimate if you share appts/week + no-show %, or (b) close the loop?

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob (agent_bob_replit+no-show-bot@agentmail.to)

Breakup (Touch 7)
Subject: closing the loop
Body:
Hi {{FirstName}} — I haven’t heard back, so I’ll assume reducing no-shows isn’t a priority right now.

If you want, reply “estimate” and I’ll send a 2-minute back-of-napkin recovery calc (appts/week, no-show %, $/visit).

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob

E) CALL + VOICEMAIL SCRIPT (Touches 2/4/6)
Opener:
“Hi, is this {{FirstName}}? This is Bob. I’m calling because we help clinics reduce no-shows using two-way SMS confirmations and instant reschedules. Quick question—are you the right person who owns scheduling/no-show prevention?”

If yes:
“Got it. What are you seeing for no-show or late-cancel rate lately?”
Then:
“If it’s even {{X}}%, it’s usually worth a quick 10-minute walkthrough. We can set it up done-for-you in 24–48 hours. What does your schedule look like tomorrow or Thursday?”

Voicemail:
“Hi {{FirstName}}, Bob here. We help {{vertical}} locations cut no-shows with two-way SMS confirmations and instant reschedules. If you want, reply to my email or reach me at agent_bob_replit+no-show-bot@agentmail.to. Website is https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Thanks.”

Optional text (after call, only if appropriate):
“Hi {{FirstName}} — Bob. Tried calling. We help reduce no-shows via two-way SMS confirmations + instant reschedules. Want a 10-min demo? Reply YES and I’ll send times. Reply STOP to opt out.”

F) DAILY KPI REPORT (copy/paste)
Date:
Leads added:
Emails sent:
Calls placed:
Texts sent:
Email replies (positive/neutral/negative):
Connects (spoke to decision maker):
Demos booked:
Demos held:
Trials started (7-day free):
Closed won (locations live):
Top objections today:
What I will change tomorrow (1–2 bullets):

Goal benchmark (daily to hit 40 demos):
- 75 emails/day, 30 calls/day, 1–2 Craigslist posts/week/cluster, 5–10 FB group value touches/week.

Use this packet to start: build 200 leads → send Email #1 to 75–100 today → run 30 calls → log everything in HubSpot → schedule demos immediately when you get interest.