# Pilot Activation Pack: Outreach + Kickoff + Reply Parsing Overrides + QA Defect Log (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:46:34.754Z

---

## 1) Pilot Recruitment Email (copy/paste)
**Subject:** Quick pilot: reduce no-shows with 2-way SMS confirmations (setup in 48h)

Hi {{FirstName}},

I’m Bob from Appointment No-Show Reducer. We help appointment-based businesses cut no-shows by sending smart SMS reminders, collecting confirmations (two-way), automating reschedules, and optionally filling gaps from a waitlist.

Legitimacy / overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

We’re onboarding **2–3 pilot locations** this week (concierge setup; discounted after the pilot). The goal is simple: show measurable recovered revenue in 7 days.

If you’re open to a quick pilot, reply with:
1) Your business name + location/timezone
2) Appointment types (e.g., haircut, hygiene, consult) and typical appointment value ($)
3) Rough weekly appointment volume
4) Your current no-show estimate (even a guess)
5) Your preferred reminder timing (e.g., 24h + 2h)

If you’d like, we can do a 15-minute kickoff and go live within 48 hours.

— Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


## 2) Pilot Kickoff Email (after they say “yes”)
**Subject:** Pilot kickoff — next steps + consent + go-live checklist

Hi {{FirstName}},

Awesome—thanks for joining the pilot.

Here’s our overview page (for your records):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

### A) What we need to configure reminders (10 minutes)
1) Location timezone + business hours
2) Reminder schedule (recommended: 24 hours + 2 hours before)
3) Reschedule rules: do you allow same-day reschedules? What cut-off time?
4) Waitlist (optional): do you keep a list of clients who want earlier slots?
5) Your escalation contact (name + phone/email) if a calendar/API issue occurs

### B) Consent / compliance confirmation
Please reply “I CONFIRM” to acknowledge:
- You have permission to message your clients about their appointments.
- Messages will include opt-out instructions (e.g., replying STOP).
- You want us to send appointment reminders/confirmations and handle reschedule requests.

### C) Baseline metrics (for your week-1 ROI report)
Reply with any of the following (estimates OK):
- Last 4 weeks: approx. appointments/week and approx. no-shows/week
- Average revenue per kept appointment ($)

### D) Go-live
Once we have the above, we’ll enable messaging and monitor closely for the first 7 days. You’ll receive a weekly value report summarizing confirmations, reschedules, filled gaps (if waitlist enabled), and estimated recovered revenue.

— Bob


## 3) SMS Templates (compliant + threaded)
**24h reminder:**
“Hi {{FirstName}}—reminder of your appointment at {{BusinessName}} on {{ApptDate}} at {{ApptTime}}. Reply YES to confirm, NO to cancel, or RESCHEDULE to change. Reply STOP to opt out.”

**2h reminder (only if not confirmed):**
“Hi {{FirstName}}—we still have you scheduled for {{ApptTime}} today at {{BusinessName}}. Reply YES to confirm, RESCHEDULE to change, or NO to cancel. STOP to opt out.”

**Confirmation reply:**
“Thanks—you're confirmed for {{ApptDate}} at {{ApptTime}}. If anything changes, reply RESCHEDULE.”

**Cancel reply:**
“Okay—your appointment is canceled. If you want to rebook, reply RESCHEDULE or call {{BusinessPhone}}.”

**Reschedule prompt:**
“Sure—reply with a preferred day/time (e.g., ‘tomorrow afternoon’ or ‘Fri 3pm’). If you prefer to call, use {{BusinessPhone}}.”

**Stop/opt-out confirmation:**
“You’re opted out and will no longer receive texts from {{BusinessName}}. Reply START to opt back in.”

**Help:**
“Help: Reply YES to confirm, NO to cancel, RESCHEDULE to change. STOP opts out. For urgent issues call {{BusinessPhone}}.”


## 4) Rule-based Reply Parsing Overrides (precedence over AI)
**Goal:** Reduce misclassification risk during pilots. Apply these rules before any AI intent parsing.

### 4.1 Normalization
- Lowercase
- Trim spaces
- Remove punctuation except digits and “:”
- Collapse repeated characters (e.g., “yessss” -> “yes”)

### 4.2 Hard-stop compliance (highest priority)
If message contains any of: 
- stop, unsubscribe, cancel texts, end, quit
Then: **INTENT=OPTOUT**
Actions:
- Immediately set opt_out=true for that phone
- Send opt-out confirmation text
- Do not send further reminders

If message contains: 
- help, info
Then: **INTENT=HELP** (send help template; no other action)

### 4.3 High-confidence intents
If exact match or contains token:
- yes, y, yep, yeah, confirm, confirmed, ok, okay, k
Then: **INTENT=CONFIRM**

- no, n, cannot, can’t, wont, won’t, not coming
Then: **INTENT=CANCEL** (or “decline” depending on product rules)

- reschedule, change, move, different time, later, earlier
Then: **INTENT=RESCHEDULE_REQUEST**

### 4.4 Safety rules / ambiguity handling
- If message contains both confirm and reschedule keywords (e.g., “yes but can we move it?”): treat as **RESCHEDULE_REQUEST**.
- If message contains profanity/angry sentiment + any intent: still respect STOP/HELP; otherwise escalate to owner contact.
- If message is empty/unknown: respond once with clarification: “Reply YES to confirm, NO to cancel, or RESCHEDULE to change.” If still unknown after 1 clarification, escalate to owner.

### 4.5 Threading rule
Always attach inbound replies to the most recent upcoming appointment for that phone number **within a configurable window** (e.g., next 30 days). If multiple appointments exist in window, escalate to owner to avoid wrong confirmation.


## 5) 48-hour QA Simulation Defect Log Template (ready to use)
Use one row per defect. Suggested fields:
- Defect ID
- Date/Time Found
- Environment (pilot/internal)
- Severity (S1 Critical / S2 High / S3 Medium / S4 Low)
- Component (Scheduling, SMS, Parsing, Analytics, Calendar API, UI)
- Scenario (e.g., DST shift, duplicate booking)
- Steps to Reproduce
- Expected Result
- Actual Result
- Impact (customer-visible? revenue-risk?)
- Mitigation/Workaround
- Owner
- Status (Open/In progress/Fixed/Verified)
- Verification Steps

### Seeded high-risk scenarios to test (expected outcomes)
1) **Timezone mismatch:** appointment created in local tz but reminders send in UTC. Expected: send at correct local time.
2) **DST boundary:** reminders scheduled across DST change. Expected: still correct local time.
3) **STOP handling:** client texts STOP after first reminder. Expected: immediate opt-out + no further messages.
4) **Threading:** client replies YES to an older thread while a new appt exists. Expected: attach to correct upcoming appt or escalate.
5) **Reschedule loop:** client asks to reschedule repeatedly. Expected: system doesn’t spam; escalates after N turns.
6) **Calendar API failure:** reminder job can’t fetch/update appointment. Expected: alert owner escalation contact; do not send incorrect confirmations.
7) **Double-book prevention:** reschedule suggests slot already taken. Expected: reject + offer alternatives.
8) **Waitlist fill:** cancellation triggers waitlist offer. Expected: offer first-in-line; stop when accepted.


## 6) Baseline Metrics Capture SOP (for measurable outcomes)
For each pilot location, capture BEFORE go-live:
- Timezone
- Avg appointments/week (last 4 weeks)
- Avg no-shows/week (last 4 weeks) OR no-show rate (%)
- Avg kept appointment value ($)
- Cancellation window policy (e.g., 24h)

During pilot (week 1):
- Reminders sent
- Confirmation rate (confirmed / reminders delivered)
- Reschedule saves (# reschedules that avoided a no-show)
- Waitlist fills (#)
- Estimated recovered revenue = (avoided no-shows + waitlist fills) * avg appointment value

This ensures the week-1 report can credibly show baseline vs pilot delta and a dollar estimate.
