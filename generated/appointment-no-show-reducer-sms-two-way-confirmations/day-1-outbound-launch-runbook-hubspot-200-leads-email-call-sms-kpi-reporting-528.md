# Day-1 Outbound Launch Runbook (HubSpot + 200 Leads + Email/Call/SMS + KPI Reporting)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T07:58:09.308Z

---

Goal (30-day sprint): Book 40 demos and close 20–25 locations for Appointment No-Show Reducer (two-way SMS confirmations + reschedules + waitlist fill). Legitimacy URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. Reply/contact email: agent_bob_replit+no-show-bot@agentmail.to.

A) HubSpot CRM Free — setup (30–45 minutes)
1) Create account (free): use Name Bob Smith, email agent_bob_replit@agentmail.to.
2) Create pipeline “No-Show Reducer – Outbound” with stages:
   - New Lead (not touched)
   - Emailed #1
   - Called #1
   - Replied / Engaged
   - Demo Booked
   - Demo Held
   - Closed Won
   - Closed Lost
   - Nurture (later)
3) Required properties (create custom where needed):
   - Vertical (Chiro / Med Spa / Dental / PT / Optometry)
   - City Cluster (Phoenix / Dallas / other)
   - Role Targeted (Owner / Office Manager / Practice Manager / Front Desk)
   - Source (Google Maps / Website / Yelp / Directory / Referral)
   - Appointment Volume (est.)
   - No-Show Rate (est.)
   - Value per Visit (est.)
   - Scheduling System (unknown / paper / Dentrix / ChiroTouch / Jane / Square / etc.)
   - Next Step Date
   - Last Touch Type (email/call/sms)
   - Outcome (no answer / left VM / interested / not now / wrong person / do-not-contact)
4) Activity logging rules (speed standard):
   - Every touch gets a note with: date, channel, 1-line outcome, next step.
   - If engaged, always capture: appointment volume, no-show %, value per visit, who owns scheduling.

B) Lead list build — first 200 prospects (free sources only)
Target two city clusters to start: Phoenix, AZ and Dallas, TX.
Top 3 verticals (fastest fit): Chiropractors, Med Spas, Dentists.

Data fields to capture per row (for HubSpot import):
Business Name | Website | Phone | City | State | Vertical | Contact Name (if found) | Role | Email | Notes (e.g., “online booking”, “multiple locations”) | Source URL.

How to pull leads quickly (repeatable workflow):
1) Google Maps searches (copy business name/phone/website):
   - “chiropractor Phoenix AZ”
   - “med spa Phoenix AZ”
   - “dentist Phoenix AZ”
   - “chiropractor Dallas TX”
   - “med spa Dallas TX”
   - “dentist Dallas TX”
Open each listing → capture website + phone.
2) Website email capture (fast):
   - Look for Contact/Book/Locations/Footer.
   - Prefer role emails: office@, info@, hello@, appointments@.
   - If no email present, capture contact form URL in Notes and still import (call-first).
3) Dedupe: before adding, check if the phone or domain already exists in your sheet.
4) Minimum viable quantity targets:
   - Phoenix: 35 chiro, 35 med spa, 30 dental = 100
   - Dallas: 35 chiro, 35 med spa, 30 dental = 100

C) Day-1 outbound schedule (daily operating blocks)
Email blocks (plain text):
- Block 1: 9:00–10:30 local time: send 25–50 emails
- Block 2: 2:00–3:30 local time: send 25–50 emails
Calls/text blocks:
- Block 3: 11:00–12:30: 10–20 calls
- Block 4: 4:00–5:30: 10–20 calls
KPI targets Day-1:
- 75 emails sent, 25 calls completed (or attempted with VM)
- 3–8 positive replies
- 1–3 demos booked

D) Cold email sequence (4 steps) — ready to paste (always include legitimacy URL)
From/reply handling: use agent_bob_replit+no-show-bot@agentmail.to.
Signature: “Bob | No-Show Reducer | (your phone if available)”.

Subject options (rotate):
1) Quick question about confirmations
2) Reducing no-shows at {{Business}}
3) Two-way SMS confirmations
4) Fill last-minute cancellations?
5) {{City}} appointment no-shows
6) 24–48h setup to reduce no-shows

Email #1 (Day 1):
Hi {{FirstName or there}} — I’m Bob.

We help appointment-based clinics reduce no-shows using two-way SMS reminders (patients confirm/cancel), instant reschedules, and waitlist fill to plug gaps.

If you’re the right person for scheduling at {{Business}}, could I ask: roughly how many appointments/week do you run, and what % no-show/cancel late?

If it’s material, we can usually get this live in 24–48 hours (done-for-you).
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Open to a 12-minute call this week?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

Email #2 (Day 3):
Hi {{Name}} — quick follow-up.

If you had a simple way to (1) get confirmations by text and (2) automatically reschedule cancellations and offer the slot to a waitlist, would that be useful at {{Business}}?

If yes, what calendar/booking system do you use today?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

Email #3 (Day 6):
{{Name}}, not sure if this lands with you.

We’re seeing many clinics recover real revenue just by reducing no-shows a few points and filling same-day gaps from a waitlist. If you tell me your avg visit value and approx no-show rate, I’ll estimate monthly revenue recovered for {{Business}}.

Worth it?
— Bob
agent_bob_replit+no-show-bot@agentmail.to

Email #4 (Day 10):
Last note — should I close the loop or is there someone else who owns confirmations/reminders at {{Business}}?

— Bob

E) Cold call opener + voicemail
Opener:
“Hi, is this {{Name}}? Hey {{Name}}, Bob here. I’m calling because we help clinics reduce appointment no-shows with two-way SMS confirmations and instant reschedules. Quick question — are you the person who owns scheduling/reminders, or is that your office manager?”

If decision maker:
“Totally. In a typical week, about how many appointments do you run — and what % no-show or cancel late?”
Then: “If we could reduce that and fill gaps from a waitlist with done-for-you setup in 24–48 hours, would you be open to a 12-minute demo?”

Voicemail:
“Hi {{Name}}, Bob. We help reduce no-shows using two-way SMS confirmations plus instant reschedules and waitlist fill. If no-shows are an issue, I can show you how it works in 12 minutes. You can also see an overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. Call back at {{your number}} or reply to my email at agent_bob_replit+no-show-bot@agentmail.to.”

F) SMS follow-up (only where compliant; keep it non-spammy)
1) After missed call/VM:
“Hi {{Name}}—Bob here. Quick one: do you handle appointment confirmations at {{Business}}? We help reduce no-shows with two-way SMS confirmations + easy reschedules. If helpful, overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. Reply YES and I’ll send times.”
2) If wrong person:
“Thanks—who’s best to talk to about scheduling/reminders? (owner/office manager?)”

G) Qualification checklist (must capture on first live convo)
- Appointments/week (or per day)
- No-show % and late-cancel %
- Avg $ value per visit
- Current reminder method (none/manual/software)
- Who controls scheduling and can approve vendor
- Timeline (urgent vs later)

H) Daily KPI report (copy/paste)
Date:
Emails sent:
Calls attempted:
Calls connected:
SMS sent (compliant):
Positive replies:
Neutral replies:
Negative replies:
Demos booked:
Demos held:
Closed won:
Closed lost:
Pipeline notes (top 5 deals + next step/date):
Blockers (deliverability, list quality, decision maker access):

Execution rule: Distribution first. If list is thin, spend the first hour each day adding 30–50 new leads before sending. Always log next steps in HubSpot the same day to avoid losing momentum.