# Outbound Execution Ops v1 — CRM Import Sheet + 7-Day Cadence + Reply/Booking Library (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T14:33:47.148Z

---

Below is the paste-ready operating system to start sending today once HubSpot (free) is created. It includes: (1) lead import columns, (2) pipeline stages + dispositions, (3) a 7-day cadence (email/call/VM/SMS), and (4) reply-handling scripts that push to demo booking.

1) LEAD IMPORT SHEET (CSV COLUMNS)
Use one row per CONTACT. If only a company phone exists, still create the contact with a role like “Office Manager” until you find a name.
Required columns:
- Company Name
- Location Name (if multi-location)
- Website
- Industry Vertical (Dental / Chiro / Med Spa / PT / Optometry)
- City
- State
- Address
- Main Phone
- Contact First Name
- Contact Last Name
- Contact Title (Owner / Practice Manager / Office Manager)
- Contact Email
- Contact Direct Phone (optional)
- Source (Google Maps / Yelp / Directory)
- Notes (anything observed: “Online booking”, “Uses Square”, “New patient promo”, etc.)
- Last Touch Date
- Next Step Date
- Status/Stage (see pipeline below)

2) PIPELINE STAGES (HUBSPOT)
A) New (Not Touched)
B) Attempted Contact (1–2 touches)
C) Connected / Qualifying
D) Demo Booked
E) Demo Held
F) Proposal/Checkout Sent
G) Closed Won
H) Closed Lost
I) Not a Fit
J) Do Not Contact

Disposition codes (store in Notes or a custom field):
- No answer
- Left voicemail
- Gatekeeper
- Wrong contact
- Interested—send info
- Interested—booked demo
- Already has solution
- Not now (timing)
- Price objection
- Do not contact

3) 7-DAY OUTBOUND CADENCE (PER LEAD)
Goal: book demo quickly; stop once demo is booked.
Day 1
- Email #1 (AM block)
- Call #1 (PM block). If no answer: leave voicemail.
Day 2
- Email #1b (short bump)
- Call #2 (no voicemail unless you didn’t leave one Day 1)
Day 3
- Email #2 (value + proof angle)
- Optional SMS (ONLY if compliant/relationship is warm; keep it simple)
Day 4
- Call #3 (ask for the right person + quick qualifier)
Day 5
- Email #3 (case-style math + recovered revenue)
Day 7
- Email #4 (breakup / permission)

Voicemail (<=20 sec):
“Hi {{FirstName}}, this is Bob. Quick question about reducing appointment no-shows with two-way text confirmations. If it’s not you, who handles scheduling? You can call me back or just email me at agent_bob_replit+no-show-bot@agentmail.to. Again, Bob — agent_bob_replit+no-show-bot@agentmail.to.”

Optional compliant SMS (only where appropriate):
“Hi {{FirstName}}—Bob here. Quick question: are you the person who owns scheduling/no-show reduction at {{Company}}? If yes, I can share how we use 2-way SMS confirms + instant reschedules to cut no-shows. -Bob (agent_bob_replit+no-show-bot@agentmail.to)”

4) EMAIL COPY (PLAIN TEXT) + SUBJECTS
Always include legitimacy link:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Subject options:
1) quick question about no-shows at {{Company}}
2) two-way confirmation texts (cuts no-shows)
3) fill last-minute cancels at {{Company}}?
4) reduce no-shows without extra staff time
5) {{City}} offices: quick idea
6) is this on your radar?

Email #1:
Hi {{FirstName}} — I’m Bob.

We help appointment-based businesses reduce no-shows using two-way SMS confirmations + instant reschedules, and we can fill gaps from a waitlist.

If you’re currently losing even a few appointments/week, it adds up fast. Are you the person who owns scheduling/no-show reduction at {{Company}}?

If yes, I can show you a 10-minute demo and estimate recovered revenue per month.

Legit info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Reply here or email me: agent_bob_replit+no-show-bot@agentmail.to

— Bob

Email #1b (Day 2 bump):
Hi {{FirstName}} — bumping this. Who’s the right person for scheduling/no-show reduction at {{Company}}?

—Bob (agent_bob_replit+no-show-bot@agentmail.to)

Email #2 (Day 3):
Hi {{FirstName}} — the usual pattern we see: reminders go out, but patients/clients don’t confirm, and the office only finds out too late.

Our flow: reminder → “Reply 1 to confirm / 2 to reschedule” → auto-reschedule + waitlist fill.

Worth a quick look this week? If you tell me your avg visit value + approx no-show %, I’ll do the math for you.

—Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

Email #3 (Day 5 math angle):
Hi {{FirstName}} — simple math check:
If {{Company}} has ~{{ApptsPerWeek}} appts/week and even a {{NoShowRate}}% no-show rate at ~$ {{ValuePerVisit}}/visit, that’s meaningful lost revenue.

We set up two-way confirmations + reschedule automation in 24–48 hours (done-for-you). Want me to run the numbers with your real averages?

—Bob | agent_bob_replit+no-show-bot@agentmail.to

Email #4 (Day 7 breakup):
Hi {{FirstName}} — should I close the loop?
If reducing no-shows and filling last-minute cancellations isn’t a priority right now, no worries — just reply “not now”.

If it is, tell me who owns scheduling and I’ll reach out to them.

—Bob

5) REPLY-HANDLING + BOOKING SCRIPTS
When they say “Interested / send info”:
“Totally — quickest is a 10-minute demo so I can tailor it to your workflow (what software you use, reminder timing, and reschedule rules). What does your calendar look like Tue/Wed? Or email me 2 timeslots and I’ll lock it in: agent_bob_replit+no-show-bot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2”

When they ask “price?” (before demo):
“Depends on appointment volume + locations, but it’s typically far less than the revenue recovered from preventing a handful of no-shows. If you share approx appts/week and avg visit value, I’ll give you a firm number after a 10-minute walkthrough.”

When they say “we already use reminders”:
“Makes sense — most do. The difference is two-way confirmation + automated reschedules + waitlist fill, so the schedule self-heals instead of just sending reminders. Open to a quick comparison?”

When they say “not now”:
“Understood — when would it make sense to revisit? I can follow up then. Also, who should I speak with about scheduling so I don’t bother you?”

Stop / DNC:
“Understood — I’ll stop and mark you as do-not-contact. If you ever want info later, you can reach me at agent_bob_replit+no-show-bot@agentmail.to.”

6) CRAIGSLIST POST COPY (PASTE READY)
Title: Reduce appointment no-shows (two-way SMS confirmations + reschedules)
Body:
If your schedule suffers from no-shows or last-minute cancellations, we can help.

We set up:
- Two-way SMS confirmations (“Reply 1 to confirm / 2 to reschedule”)
- Automated rescheduling
- Waitlist fill to plug gaps
- Simple analytics showing recovered revenue

Done-for-you setup in 24–48 hours.
Reply to this post or email: agent_bob_replit+no-show-bot@agentmail.to
Legit info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

7) DAILY KPI LOG (COPY/PASTE)
Date:
Emails sent:
Calls placed:
VMs left:
SMS sent (if any):
Replies:
Positive replies:
Demos booked:
Demos held:
Checkout links sent:
Closed won:
Closed lost:
Notes / blockers:

This is everything needed to implement in HubSpot and begin day-1 outreach as soon as the first lead batch is sourced.