# Pilot Activation Pack v1 (Recruiting Email + Consent/Opt-in Scripts + 48-Hour Synthetic QA Simulation Plan + Pilot Launch Tracker)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:51:18.977Z

---

# Pilot Activation Pack v1 — Appointment No-Show Reducer (SMS + Two-Way Confirmations)

Business legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

---

## 1) Pilot Recruiting Email (Concierge Pilot Offer)

**Subject options (pick one):**
1) Quick pilot to cut appointment no‑shows (2 weeks, concierge setup)
2) Can we reduce your no‑shows with 2‑way SMS confirmations?
3) I’ll set up SMS confirmations for your appointments (pilot)

**Email body (ready to send):**

Hi {{FirstName}},

I’m Bob from **Appointment No‑Show Reducer**. We help appointment-based businesses reduce no‑shows using **smart SMS reminders + two‑way confirmations**, with automated reschedules and optional waitlist gap-filling.

We’re running **2–3 concierge pilots** right now and I’d like to offer you a spot.

**What you get (pilot):**
- SMS reminders + “Reply YES to confirm / NO to reschedule” (two-way)
- Automated reschedule workflow (rules you approve)
- Optional waitlist fill when someone cancels
- Simple weekly analytics showing confirmations, reschedules, filled gaps, and **estimated recovered revenue**

**What we need (to measure value in week 1):**
1) Your timezone + business hours
2) Approx. appointments/week
3) Typical appointment value (or average ticket)
4) Your rough no‑show rate (last 4 weeks if you have it)
5) Where appointments live (calendar/software name)

If you’re open to it, I can do a **15‑minute call** and we’ll confirm eligibility + opt-in language and get you live quickly.

Legitimacy / product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply with a good time, or send your preferred contact number and I’ll coordinate.

— Bob Smith
Appointment No‑Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

---

## 2) Pilot Consent + Opt-in/Opt-out Compliance Scripts (Concierge Pilots)

### 2.1 Front-desk / Staff Phone Script (getting patient/customer consent)
**Goal:** obtain explicit permission to send appointment SMS and document it.

“Before we finalize your appointment, can we text you appointment reminders and confirmation messages? You can reply STOP any time to opt out. Standard message and data rates may apply.”

**If yes:** “Great—what’s the best mobile number to use?”

**If no:** “No problem. We’ll keep you on phone/email reminders only.”

**Internal note to log (minimum):**
- Consent captured: Yes/No
- Date/time
- Source: phone/in-person/online form
- Mobile number

### 2.2 In-person Script (at checkout / booking)
“Can we text you appointment reminders and ask you to confirm by text? You can opt out any time by replying STOP.”

### 2.3 Online Intake / Booking Form Checkbox Wording (copy/paste)
**Checkbox label:**
“I agree to receive SMS appointment reminders and confirmation texts from {{BusinessName}}. Reply STOP to opt out. Msg & data rates may apply.”

**Required behavior:** unchecked by default (recommended), user must actively check.

### 2.4 First Message (welcome/consent reinforcement)
“{{BusinessName}}: You’re set for SMS appointment reminders/confirmations. Reply STOP to opt out, HELP for help.”

### 2.5 Reminder Message (two-way confirmation)
“{{BusinessName}} reminder: You have an appointment on {{Day}} at {{Time}}. Reply YES to confirm, NO to reschedule. Reply STOP to opt out.”

### 2.6 Reschedule Flow (if they reply NO / RESCHEDULE)
“Thanks—what time works better? Reply with a day/time (e.g., ‘Tomorrow 3pm’) or call {{BusinessPhone}}. Reply STOP to opt out.”

### 2.7 HELP Response (required support path)
“{{BusinessName}}: For help, reply with your question or call {{BusinessPhone}}. Reply STOP to opt out.”

### 2.8 STOP Response (hard opt-out)
“You’re opted out and will no longer receive texts from {{BusinessName}}. Reply START to opt back in.”

**Rule:** STOP must immediately suppress all future sends for that number (except optional START re-opt-in confirmation).

---

## 3) 48-Hour Synthetic QA Simulation Plan (Pre-Pilot Reliability Gate)

**Objective:** catch edge cases before putting a live business on the system. Run in a sandbox/test environment with synthetic appointments and at least 2 test phone numbers.

### 3.1 Test Data Setup
Create synthetic appointments with the following attributes:
- Timezones: America/New_York, America/Chicago, America/Los_Angeles
- One location near DST boundary (simulate DST change week)
- Appointment durations: 15m, 30m, 60m
- Services: “Consult”, “Follow-up”, “Procedure” (vary wording)
- Customers: 
  - Customer A: normal replies
  - Customer B: ambiguous replies and typos
  - Customer C: STOP/HELP behavior

### 3.2 Core Scenarios (Pass/Fail Criteria)
1) **Timezone correctness**
   - Send reminders at configured offsets (e.g., 24h and 2h) in local time.
   - **Pass:** messages arrive in correct local time window; no off-by-one-hour errors.

2) **DST edge**
   - Appointment scheduled during DST shift week.
   - **Pass:** reminder time remains correct; no duplicate reminder.

3) **Two-way confirmation**
   - Reply “YES”, “Yes”, “Y”, “yep”.
   - **Pass:** status becomes Confirmed; no follow-up reminder spam; confirmation logged.

4) **Reschedule intent**
   - Reply “NO”, “can’t make it”, “need to reschedule”, “resched”, “move it”.
   - **Pass:** status becomes Needs Reschedule; customer receives reschedule prompt; staff/owner gets notification if required.

5) **Ambiguous / low-signal replies**
   - Reply “ok”, “maybe”, “idk”, “👍”, “what?”.
   - **Pass:** system asks a clarifying question (“Reply YES to confirm or NO to reschedule”). No incorrect confirmation.

6) **Message threading & multiple appointments**
   - Same number has 2 appointments on different days.
   - **Pass:** confirmation applies to correct appointment (closest upcoming); system can disambiguate if needed (“Reply 1 or 2”).

7) **Opt-out compliance**
   - Reply “STOP”, “Stop”, “unsubscribe”.
   - **Pass:** immediate suppression + confirmation message sent; further reminders blocked.

8) **Re-opt-in**
   - After STOP, reply “START”.
   - **Pass:** number is re-enabled; sends resume; confirmation text sent.

9) **Calendar write-back failure / API outage**
   - Simulate calendar API failure for reschedule/cancel.
   - **Pass:** system does not silently fail; triggers owner alert with appointment + customer details and next steps.

10) **Double-book prevention (reschedule slot conflict)**
   - Attempt reschedule into an occupied slot.
   - **Pass:** system rejects and offers alternatives; no duplicate booking created.

11) **Waitlist fill**
   - Create a cancellation event.
   - **Pass:** waitlist candidates are messaged in order; first YES wins; others get “slot filled” notice.

12) **Rate limiting / spam safety**
   - Rapid back-and-forth messages.
   - **Pass:** no infinite loops; backoff after N attempts; escalation path triggered.

### 3.3 Outputs to Collect (for go/no-go)
- Message send log (timestamp, timezone, template id)
- Reply classification log (rule-based override vs AI)
- Appointment status timeline (Created → Reminded → Confirmed/Reschedule)
- Error log with correlation IDs

**Go/No-Go Gate:** no failures in STOP compliance, timezone/DST correctness, or calendar write failures without alerting.

---

## 4) Pilot Launch Tracker (single-sheet fields)
Use this as columns in a spreadsheet/Notion table:

- Pilot # (1/2/3)
- Business Name
- Niche (med spa, dental, PT, etc.)
- Location / Timezone
- Primary Contact (name + role)
- Phone (for escalation)
- Email
- Appointment system (calendar/software)
- Opt-in capture method (phone/in-person/form)
- Reminder schedule (e.g., 24h + 2h)
- Two-way confirmation enabled (Y/N)
- Reschedule automation level (manual assist / partial / full)
- Waitlist enabled (Y/N)
- Baseline period (dates)
- Baseline appts/week
- Baseline no-show rate
- Avg appt value
- Go-live date
- Week 1 report due date
- Week 1 outcomes: reminders sent, confirmations, reschedules, waitlist fills
- Est. recovered revenue/week
- Issues/Incidents (link)
- Status (Prospecting / Scheduled / Live / Reporting / Converted / Dropped)

---

### Notes
- All client-facing messages should include STOP/HELP language.
- For pilots, prefer “concierge mode” if integration reliability is uncertain: confirmations/reschedules can still be handled safely with owner alerts.
