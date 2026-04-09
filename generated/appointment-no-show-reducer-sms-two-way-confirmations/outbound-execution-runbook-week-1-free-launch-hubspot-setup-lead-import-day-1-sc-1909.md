# Outbound Execution Runbook (Week 1 Free Launch) — HubSpot Setup + Lead Import + Day-1 Scripts + Reply Library

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T18:44:52.122Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (include in outreach as proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Primary inbox for replies: agent_bob_replit+no-show-bot@agentmail.to
Core offer line: “We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.”

1) HUBSPOT FREE CRM SETUP (PASTE-READY SPEC)
Pipeline name: No-Show Reducer — Outbound
Stages (in order):
1. New Lead (uncontacted)
2. Attempted — Email 1 Sent
3. Attempted — Call 1
4. Replied — Needs Qualifying
5. Qualified — Demo Scheduled
6. Demo Held — Trial Offered (Week 1 = Free)
7. Closed Won — Location Live
8. Closed Lost
9. Do Not Contact

Required properties (create as custom fields where needed):
- Vertical (Dentist/Chiro/Med Spa/PT/Optometry/Other)
- City Cluster
- Role (Owner/Office Manager/Practice Manager/Front Desk/Other)
- Scheduling System (Dentrix/ChiroTouch/Mindbody/Square/Other/Unknown)
- Appts per week (number)
- No-show rate (%, estimated)
- Value per visit ($)
- Current reminders? (None/Email/SMS/Both)
- Confirmations collected? (Y/N)
- Texting consent process (Unknown/Verbal/Written/Other)
- Best phone
- Best email
- Next step (Free text)
- Last touch date (date)
- Outcome of last touch (No answer/Left VM/Interested/Not now/Stop)

Task queues:
- “Daily Email Sends” (all leads in New Lead)
- “Daily Calls Block” (Attempted — Email 1 Sent)
- “Replies to Handle” (Replied — Needs Qualifying)
- “Demos to Prep” (Qualified — Demo Scheduled)

2) LEAD CAPTURE / IMPORT TEMPLATE (CSV COLUMNS)
Use exactly these columns so HubSpot import is clean:
- Company Name
- Website
- Phone
- City
- State
- Address
- Vertical
- Contact First Name
- Contact Last Name
- Title/Role
- Contact Email
- Notes (source + anything notable)
- City Cluster
- Scheduling System (if known)
- Lead Source (Google Maps / Directory / Website)

Validation rules:
- Deduplicate by Website OR Phone.
- Only import if Company Name + Phone exist (email can be blank; many will use forms).
- Put “Owner” as role if unclear; correct after first call.

3) WEEK 1 DAILY CADENCE (FREE LAUNCH)
Goal: book demos; offer 7-day free trial / free setup (no money collected week 1).
Daily volume targets:
- 50–100 emails/day (plain text)
- 20–40 calls/day
- 0–10 compliant follow-up texts/day (only when a human answered or voicemail identifies mobile as business line; avoid personal cells unless clearly business/public)
- 1 Craigslist post per city cluster (2/week per cluster)
- 5–10 FB group comments/posts per week

Recommended daily blocks:
- Block A (60–90 min): send emails (new leads)
- Block B (90 min): calls (yesterday’s emailed leads)
- Block C (30 min): handle replies + book demos
- Block D (30 min): list building to refill tomorrow

4) COLD EMAILS (PLAIN TEXT) — 3 VARIANTS
Subject options (rotate):
- quick question about no-shows
- reducing no-shows at {Business}
- two-way confirmations for {City}
- can I run numbers with you?

Email v1 (short):
Hi {FirstName} — quick question.
Do you have an issue with appointment no-shows/cancellations at {BusinessName}?
We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours.
If you’re open, I can show you a 10-min demo and estimate recovered visits.
Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Best person to talk to?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

Email v2 (numbers hook):
Hi {FirstName},
Most {Vertical} offices I speak with lose 3–10% of booked visits to no-shows/late cancels.
If your average visit is around ${ValueGuess}, that’s often thousands/month per location.
We use two-way SMS confirmations + auto-reschedule + waitlist fill to recover those visits (setup in 24–48 hours).
Want me to run a quick estimate for {BusinessName}?
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob (agent_bob_replit+no-show-bot@agentmail.to)

Email v3 (manager-forwardable):
Hi {FirstName},
If you’re not the right person: who owns scheduling + reminders at {BusinessName}?
We reduce no-shows using two-way SMS confirmations, instant reschedules, and a waitlist to fill gaps.
Done-for-you setup in 24–48 hours.
Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Thanks,
Bob — agent_bob_replit+no-show-bot@agentmail.to

5) CALL SCRIPT (30–45 seconds)
“Hi, is this {BusinessName}? … I’m trying to reach the person who owns scheduling and appointment reminders.
The reason I’m calling: we help appointment-based businesses reduce no-shows using two-way SMS confirmations and instant rescheduling. Setup is done-for-you in 24–48 hours.
Can I ask: about how many appointments do you book in a typical week, and do you know your no-show rate roughly?”

If gatekeeper: “Totally fine—who would be best to speak with about reducing no-shows and last-minute cancellations?”

Voicemail:
“Hi, this is Bob. Quick note—helping {BusinessName} reduce no-shows with two-way SMS confirmations and instant reschedules. If you handle scheduling, you can reach me at agent_bob_replit+no-show-bot@agentmail.to. Also details here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Thanks.”

6) TEXT (ONLY WHERE APPROPRIATE/COMPLIANT)
“Hi {FirstName}—Bob here. We help reduce no-shows via two-way SMS confirmations + instant reschedules + waitlist fill. Open to a quick 10-min demo this week? Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 (reply STOP to opt out)”

7) REPLY HANDLING LIBRARY (COPY/PASTE)
Positive:
“Great—happy to. What does your appointment volume look like per week, and roughly what % no-show/late cancel? If you share average value per visit, I’ll estimate recovered revenue. Want a 10-min demo tomorrow or Thu?”

Not right person:
“Thanks—who’s best for scheduling/reminders? If you can forward, here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

Price question (Week 1 = free):
“For new locations we’re doing free setup + a 7-day trial so you can see confirmed/rescheduled visits in your own numbers. If it doesn’t move the needle, you don’t continue. Want to see it on a quick demo?”

Objection: “We already send reminders”:
“Makes sense. The difference is two-way confirmations + automated reschedules + waitlist fill, so last-minute gaps get refilled. Are your reminders currently one-way, or do you collect confirmations?”

Not now:
“No problem—when would be better? If you tell me your busiest days, I’ll follow up then. If helpful, here’s the overview link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”

Stop:
“Understood—I'll take you off our list. (Confirming: no further outreach.)”

8) KPI TRACKING (DAILY)
Log daily totals:
- Emails sent
- Calls placed
- Conversations
- Replies (positive/neutral/negative)
- Demos booked
- Demos held
- Trials started (locations)
- Locations live
- Top objections
- List size remaining

If we cannot create accounts/sending infrastructure today, we are default dead. The next execution step is non-negotiable: create HubSpot (free), import 200 leads, and begin day-1 sends/calls immediately using the scripts above.