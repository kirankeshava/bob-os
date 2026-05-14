# Concierge Pilot Pack v1 — Agreement + SMS Consent Language + Go‑Live QA Smoke Test + Onboarding Email

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:36:50.179Z

---

## Concierge Pilot Pack v1 (Appointment No‑Show Reducer)

**Product:** Appointment No‑Show Reducer (SMS + Two‑Way Confirmations)

**Legitimacy URL (share with staff/owners):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

**Support / contact:** agent_bob_replit+no-show-bot@agentmail.to

---

# 1) Concierge Pilot Agreement (Free Week / Trial)

## Parties
This Concierge Pilot Agreement (“Agreement”) is between:
- **Provider:** Appointment No‑Show Reducer (contact: agent_bob_replit+no-show-bot@agentmail.to)
- **Client:** ______________________________ (Business name)
- **Primary Contact:** ______________________ (Owner/Manager name, phone, email)

## Purpose
The purpose of this pilot is to validate workflows that reduce appointment no‑shows via SMS reminders, two‑way confirmations, automated rescheduling, and optional waitlist fills, and to measure outcomes (confirmations, reschedules, and estimated recovered revenue).

## Term
Pilot term: **7 days** from go‑live date: ____/____/______.

## Price
During Week 1, service is provided **free of charge**. At the end of the pilot, Client may elect to continue under a paid plan (to be discussed separately). No payment method is collected during the pilot.

## Client Responsibilities (to succeed in 7 days)
Client agrees to:
1) Provide accurate business details (timezone, hours, services) and appointment value assumptions.
2) Confirm that Client has the right to contact customers who have scheduled appointments and to send them reminder/confirmation texts.
3) Provide one escalation contact (phone/email) for urgent issues.
4) Notify Provider of any special rules: lead time, cancellation policy, reschedule constraints.

## Provider Responsibilities
Provider agrees to:
1) Configure reminders and two‑way confirmations according to Client preferences.
2) Monitor performance daily during the pilot and respond to incidents.
3) Provide a weekly summary report including key counts and estimated recovered revenue.

## Consent & Compliance
Client is responsible for ensuring customers have provided consent to receive SMS related to their appointments. Provider will include clear opt‑out messaging (“Reply STOP to opt out”) and provide help instructions (“Reply HELP for help”).

## Data Handling
Provider will use appointment/customer contact information only to deliver appointment-related messages and to generate aggregate analytics for Client. Provider will not sell Client data.

## Service Limitations / Fail‑Safes
- If an integration fails (e.g., calendar write-back or appointment sync), Provider will attempt safe fallback behavior (e.g., stop automated reschedule and notify Client).
- Provider may temporarily pause outbound messaging if STOP/HELP compliance, threading, or timezone correctness is uncertain.

## Success Criteria (measured weekly)
Pilot success is evaluated by:
- Confirmation rate (%)
- Reschedule completions (#)
- Waitlist fills (#, if enabled)
- Estimated recovered revenue/week (based on Client’s average appointment value)

## Sign-off
Client authorized representative: _______________________ Date: ____/____/______

Provider representative (Bob Smith): ___________________ Date: ____/____/______

---

# 2) SMS Consent + Opt‑Out Language (Copy/Paste)

## A) Booking Form / Intake Form Checkbox Text
“I agree to receive text messages about my appointment (reminders, confirmations, and rescheduling). Message & data rates may apply. Reply STOP to opt out, HELP for help.”

## B) Staff Script (when booking by phone)
“Can I text you appointment reminders and a quick confirmation request? You can reply STOP anytime to opt out.”

## C) First Message Footer (always include)
“Reply STOP to opt out. Reply HELP for help.”

## D) HELP Auto-Reply (recommended)
“You’re receiving appointment messages from {BUSINESS}. For help call {BUSINESS_PHONE}. Reply STOP to opt out.”

## E) STOP Auto-Reply (recommended)
“You’re opted out and will no longer receive texts from {BUSINESS}. If this was a mistake, reply START.”

## F) START Auto-Reply (recommended)
“You’re re-subscribed to appointment texts from {BUSINESS}. Reply STOP to opt out.”

---

# 3) Go‑Live QA Smoke Test (≤ 30 minutes per location)

**Goal:** Catch the highest-risk issues before any real customers are affected.

## Inputs needed (from Client)
- Business timezone: __________________
- Business hours: ______________________
- Escalation contact (owner/manager): __________________ phone/email
- Reminder schedule preferences (example): 24h + 2h before
- Reschedule policy: allowed window + minimum notice

## Smoke Test Steps

### 1) Timezone & DST correctness (5 min)
- Set a test appointment for tomorrow at a known local time.
- Verify the system stores and displays appointment time in the **Client’s local timezone**.
- Confirm reminder send times align with local time.
**Pass if:** reminder schedule is correct in local time; no UTC drift.

### 2) Message threading / identity (3 min)
- Send a test reminder to a test number.
- Reply “YES”.
- Confirm the system associates the reply with the correct appointment.
**Pass if:** reply maps to the correct appointment without ambiguity.

### 3) High-confidence keyword overrides (3 min)
From test phone, reply with:
- “YES” (confirm)
- “NO” (decline)
- “RESCHEDULE”
- “STOP”
- “HELP”
**Pass if:** actions trigger correct flow; STOP immediately halts future texts.

### 4) Double-booking prevention (5 min)
- Attempt to reschedule to an already-occupied slot (create a dummy appointment at that time).
**Pass if:** system rejects/redirects to available times; no overwrite.

### 5) Calendar write-back / update verification (5 min)
- Perform a reschedule via reply (“RESCHEDULE”) and choose a new time.
- Verify the appointment is updated in the calendar/system of record.
**Pass if:** calendar reflects the new time and old slot is freed.

### 6) Failure handling / owner alert (5 min)
- Simulate failure (e.g., disable calendar access or use an invalid token in test env).
- Trigger a reschedule.
**Pass if:** automation pauses safely and an alert is generated for the owner/manager; no confusing customer loop.

### 7) Quiet hours / business hours guardrail (2 min)
- Confirm system will not send messages outside agreed hours (if configured).
**Pass if:** sends are deferred to allowed hours.

## Go/No-Go Decision
- **GO** if Steps 1–4 pass and no compliance issues (STOP/HELP) are observed.
- **NO-GO** if timezone is wrong, STOP fails, or threading maps replies incorrectly.

---

# 4) Client Onboarding Email (send after “yes”)

Subject: Quick 15‑min setup to reduce no‑shows (free 7‑day pilot)

Hi {Name},

Thanks — we can get your location live in 24 hours. This is a **free 7‑day concierge pilot** of our Appointment No‑Show Reducer (smart SMS reminders + two‑way confirmations + rescheduling).

Legitimacy URL (overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

To start, please reply with:
1) Business timezone + hours
2) Average appointment value (rough is fine)
3) Your preferred reminder timing (example: 24h + 2h)
4) The best escalation contact if something looks off (phone/email)
5) Any rules (minimum notice to cancel/reschedule, closed days)

We’ll then run a quick go‑live smoke test (timezone, STOP/HELP compliance, reply threading, and reschedule updates) to ensure reliability before any customers are impacted.

If you’d like, propose 2–3 times for a 15‑minute onboarding call this week.

— Bob Smith
Appointment No‑Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

---

# 5) 15‑Minute Onboarding Call Agenda (concierge)
1) Confirm services + appointment types + average value
2) Confirm timezone, business hours, and quiet hours
3) Agree reminder schedule and wording tone (friendly/professional)
4) Confirm reschedule policy + allowed windows
5) Confirm consent workflow and opt-out handling expectations
6) Choose go-live date/time + confirm escalation contact

End state: Client can say “yes” to go live with confidence; we can measure outcomes within 7 days.
