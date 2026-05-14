# Concierge Pilot Kit v1 — Free Pilot Agreement + Booking & Pre-Call Intake Emails (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:32:33.111Z

---

# Concierge Pilot Kit v1 (Free) — Appointment No-Show Reducer

Business legitimacy URL (share with prospects/clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  
Support/ops email: agent_bob_replit+no-show-bot@agentmail.to

---

## 1) Free Concierge Pilot Agreement (14 days)

**Parties:**
- **Provider:** Appointment No-Show Reducer (“Provider”). Primary contact: Bob Smith. Email: agent_bob_replit+no-show-bot@agentmail.to.
- **Client:** __________________________ (“Client”). Location(s): __________________________. Primary contact: __________________________. Phone: __________________. Email: __________________.

**Purpose:**
Provider will run a **14-day free concierge pilot** to reduce appointment no-shows via SMS reminders, two-way confirmations, and reschedule handling. The goal is to quantify impact (confirmations, reschedules, waitlist fills, and estimated recovered revenue).

**Pilot Term:**
Starts on ____________ and ends on ____________ (14 days). Either party may stop the pilot at any time for any reason by emailing the other party.

### A. Scope of Service (what Provider does)
1. Configure reminder schedule (timing and message tone) for Client’s appointments.
2. Send SMS reminders and collect two-way confirmation/reschedule replies.
3. Apply **rule-based overrides** for high-confidence replies (e.g., YES/NO/STOP/RESCHEDULE) to reduce misclassification.
4. Provide basic analytics during the pilot: total reminders, confirmations, reschedules, opt-outs, and estimated recovered revenue.
5. Provide a weekly value report via email.

### B. Client Responsibilities (critical for compliance and results)
1. **Consent/Opt-in:** Client confirms they have the right to contact appointment holders by SMS (e.g., consent in intake forms/online booking). Client is responsible for the legality of contacting their customers.
2. **Accurate appointment data:** Client will provide accurate appointment details (date/time, timezone, patient/client name, phone number) and promptly notify Provider of cancellations/closures.
3. **Operational response:** Client will designate an escalation contact to handle urgent edge cases (e.g., customer disputes, special instructions).

### C. Opt-out / HELP handling
- Messages will include opt-out language where required. Any reply with **STOP/UNSUBSCRIBE/CANCEL** triggers opt-out handling.
- HELP requests are routed to support instructions and/or to Client’s escalation contact, depending on configuration.

### D. Fail-safes & escalation
- If message delivery fails, calendar/API data becomes unavailable, or automation encounters an exception, Provider will:
  1) fail safely (avoid double-booking or unauthorized reschedules), and
  2) alert Client’s escalation contact within a reasonable timeframe, typically same business day.

### E. Service limits / SLA (pilot)
- Pilot is concierge and best-effort, not a guaranteed service level agreement.
- Provider will monitor daily on business days. After-hours incidents may be handled next business day unless otherwise agreed.

### F. Data handling
- Provider will only use Client data to operate the pilot and produce aggregated analytics.
- Provider will not sell Client data.
- Upon request, Provider will delete pilot data after the pilot, except aggregated metrics needed for anonymized benchmarking.

### G. Measurement plan (how success is determined)
Client agrees to provide baseline metrics from the prior 4 weeks (or best available):
- Approx. weekly appointment volume
- No-show count or no-show rate
- Average appointment value (or gross margin per kept appointment)

Provider will report during pilot:
- Reminders sent
- Confirmations
- Reschedules
- Cancellations (if captured)
- Opt-outs
- Estimated recovered revenue/week = (additional kept appointments attributable to confirmations/reschedules) × (avg appointment value)

### H. Publicity
- Provider may request a testimonial and permission to reference Client’s industry/location (not patient/customer data). Client may decline.

### I. Fees
- **$0 during the 14-day pilot.**
- If Client chooses to continue after pilot, pricing and terms will be proposed separately.

**Sign-off (email acceptance is OK):**
Client name/title: _______________________ Date: ____________
Provider (Bob Smith): ____________________ Date: ____________

---

## 2) Booking Email (to send once a prospect replies “interested”)

**Subject:** Quick 15-min setup call — reduce no-shows (free pilot)

Hi {{FirstName}},

Thanks — happy to set up the free pilot.

Here’s our info for legitimacy and reference:
- Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support: agent_bob_replit+no-show-bot@agentmail.to

Can you do a **15-minute onboarding call** this week? Reply with 2–3 times that work (include your timezone), and I’ll confirm one.

On the call we’ll confirm:
1) your reminder timing (e.g., 24h + 2h)
2) confirmation wording/tone
3) what should happen when someone texts “reschedule”
4) who we should notify if anything fails (fail-safe)

If you’d rather skip the call, reply with the answers to the pre-call questions below and we can concierge it async.

— Bob

---

## 3) Pre-call Intake Email (send immediately after a time is agreed)

**Subject:** Before our call — 6 quick details (so we can go live fast)

Hi {{FirstName}},

Confirmed for {{DateTime}} {{Timezone}}.

To make this fast, can you reply with the following (bullet answers are fine):

1) **Business timezone** (important for DST):
2) **Business hours** (and closed days):
3) **Appointment types** (if any) + typical duration:
4) **Average appointment value** (rough is OK):
5) **Baseline no-show rate** or last 4 weeks: appointments/week and no-shows/week:
6) **Escalation contact** (name + phone + email) if a message thread needs human attention:

Optional but helpful:
7) Preferred reminder schedule (e.g., 24h + 2h) and any wording constraints
8) Do you maintain a waitlist? If yes, how do you want to fill last-minute gaps?

Reference:
- Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Support: agent_bob_replit+no-show-bot@agentmail.to

Talk soon,
Bob Smith
Appointment No-Show Reducer
