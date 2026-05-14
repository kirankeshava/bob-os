# Day-1 Outbound Kit (Ready to Paste): HubSpot Pipeline + Lead Import Template + 3 Vertical Sequences + KPI Scoreboard

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T06:16:25.081Z

---

## 1) HubSpot Free CRM Setup (fast, minimum viable)

### Account
- Sign up: HubSpot CRM Free
- User: Bob Smith
- Email: agent_bob_replit@agentmail.to

### Pipeline (Deals) — name: “No-Show Reducer – Outbound”
1. **Prospect Identified** (lead exists, not contacted)
2. **Attempted – Email 1 Sent**
3. **Engaged – Replied** (any reply)
4. **Qualified** (has appointments + decision maker identified)
5. **Demo Booked** (meeting scheduled)
6. **Demo Held**
7. **Trial/Setup Started (Free 7-day)**
8. **Closed Won**
9. **Closed Lost**

### Required fields (Contacts/Companies or custom properties)
Create these fields so we can qualify in <2 minutes:
- Vertical (Dentist / Chiro / PT / Med Spa / Optometry / Other)
- City Cluster (e.g., “Dallas–Fort Worth”)
- Scheduling System (Unknown / Squarespace / Acuity / Calendly / NexHealth / Solutionreach / Weave / Other)
- Appointment volume per week (number)
- No-show rate % (number/estimate)
- Avg value per visit ($)
- Decision maker (Owner/Manager/Front Desk/Operations)
- Best phone (main line)
- Best email
- Last touch (date)
- Next step (short text)

### Task queues (so nothing drops)
- Queue A: “Send Email 1 (50/day)”
- Queue B: “Call Block (20/day)”
- Queue C: “Follow-up replies within 15 min”


## 2) Lead Capture + Import Template (Google Sheet columns)
Copy these columns exactly (row 1 headers). This sheet can be imported to HubSpot.

- Company Name
- Website
- Google Maps URL
- Address
- City
- State
- ZIP
- Phone
- Contact First Name
- Contact Last Name
- Title (Owner/Manager/Front Desk)
- Contact Email
- Vertical
- City Cluster
- Notes (anything useful like “online booking” / “reviews mention missed appts”)
- Dedupe Key (use: website OR phone)

Dedupe rule: If website matches, keep the record with a real email. If no website, dedupe by phone.


## 3) Outbound Messaging (references legitimacy URL + contact email)
Legitimacy URL to include when asked: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply-to / contact: agent_bob_replit+no-show-bot@agentmail.to

### Universal positioning (1 sentence)
“We reduce appointment no-shows using two-way SMS confirmations + instant reschedules + waitlist fill, with done-for-you setup in 24–48 hours.”


### Sequence A — Dentists
**Subject options (rotate):**
1) “Cut no-shows at {Practice}?”
2) “Quick idea to confirm/reschedule by SMS”
3) “Filling last-minute gaps (dentistry)”

**Email 1 (Day 1)**
Hi {FirstName} — Bob here.

If {Practice} deals with last‑minute cancels/no‑shows, we can help reduce them with **two‑way SMS confirmations** (patients tap 1 to confirm, 2 to reschedule). When someone cancels, we can also **offer the slot to a waitlist** so chairs don’t sit empty.

It’s a micro‑SaaS with **done‑for‑you setup in 24–48 hours** and simple analytics that quantify recovered revenue per location.

Open to a 12‑minute demo this week? If easier, reply with your appointment volume/week + typical value per visit and I’ll estimate ROI.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Bump (Day 3)**
Hi {FirstName} — should I talk to whoever owns scheduling for {Practice}?

Most offices see the biggest lift from: (1) two-way confirm, (2) frictionless reschedule link, (3) waitlist fill for same-day holes.

Worth a quick look?
— Bob

**Breakup (Day 7)**
Hi {FirstName} — closing the loop. If reducing no‑shows isn’t a priority right now, no worries.

If you want, reply “later” and I’ll check back next month.
— Bob


### Sequence B — Chiropractors / PT
**Subject options:**
1) “No-shows for recurring visits”
2) “2-way confirm + easy reschedule”
3) “Stop gaps in the schedule”

**Email 1 (Day 1)**
Hi {FirstName} — Bob here.

For clinics with recurring appointments, no‑shows add up fast. We reduce them using **two‑way SMS reminders** + **instant rescheduling** so patients don’t disappear when timing changes.

Setup is done-for-you in 24–48 hours, and you get basic analytics showing recovered visits/revenue.

Do you handle scheduling for {Practice}, or is there an ops manager I should speak with?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob (agent_bob_replit+no-show-bot@agentmail.to)

**Bump (Day 2/3)**
If you tell me (a) appts/week and (b) rough no‑show %, I’ll send back a quick ROI estimate.
— Bob

**Breakup (Day 6/7)**
Okay to close this out? If you want to see it later, reply “demo” and I’ll send times.
— Bob


### Sequence C — Med Spas
**Subject options:**
1) “Prevent last-minute cancellations”
2) “Waitlist fill for openings”
3) “Two-way SMS confirmations for {Practice}”

**Email 1 (Day 1)**
Hi {FirstName} — Bob here.

Med spas get hit hard by last‑minute cancels. We reduce no‑shows with **two‑way SMS confirmations** + **reschedule automation**, and when someone drops, we can **text a waitlist** to fill the opening.

Done‑for‑you setup in 24–48 hours. Would you be open to a quick demo?

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Bump (Day 3)**
Quick yes/no: worth exploring reducing no‑shows by even 10–20% this month?
— Bob

**Breakup (Day 7)**
No worries if timing’s off. Who’s the right person for scheduling/ops?
— Bob


## 4) Cold Call + Voicemail + SMS (compliant, concise)

### Cold call opener (20 seconds)
“Hi, is this {Name}? Bob here. Quick one—do you handle scheduling/operations for {Practice}? We help appointment-based businesses reduce no‑shows with two‑way SMS confirmations and instant reschedules. If I can show you in 10 minutes how it fills last‑minute gaps, would you be open to a quick demo?”

### Voicemail (15 seconds)
“Hi {Name}, Bob calling for {Practice}. We reduce appointment no‑shows with two‑way SMS confirmations and easy reschedules. If you’re the right person, call/text me back at {YourNumber}. Or email agent_bob_replit+no-show-bot@agentmail.to. Thanks.”

### SMS follow-up (only after contact/where permitted)
“Hi {FirstName}—Bob here. Sent a note about reducing no‑shows via two‑way SMS confirmations + reschedules + waitlist fill. Want a 10–12 min demo? Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2”


## 5) Qualification (2-minute checklist)
Ask these on reply or on the call:
1) Appointments/week?
2) Estimated no-show %?
3) Average value per visit?
4) Who owns scheduling tool / patient comms?
5) Current reminder method (manual calls? single SMS? system reminders?)

If they meet minimum: 50+ appts/week OR high $/visit and frequent cancels → book demo.


## 6) Daily KPI Scoreboard + pacing to goal
Track daily (paste into a sheet):
- Emails sent
- Calls placed
- Connects
- Replies
- Demos booked
- Demos held
- Trials started
- Closed won
- Closed lost

Pacing assumption (adjust as data arrives):
- 100 emails/day → 5–10 replies/day (5–10%)
- 5–10 replies/day → 1–2 demos booked/day
- 1–2 demos booked/day → 20–40 demos in 20 working days

Minimum Day-1 target:
- 50 emails + 20 calls logged with outcomes in HubSpot.

---
If you want, I can also generate a one-page “demo agenda + ROI calculator questions” to keep demos tight and close-ready, but the above is sufficient to start sending immediately once HubSpot is created and the first 200 leads are captured.