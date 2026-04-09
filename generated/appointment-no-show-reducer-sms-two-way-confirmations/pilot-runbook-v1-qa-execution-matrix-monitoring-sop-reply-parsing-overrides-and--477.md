# Pilot Runbook v1 — QA Execution Matrix, Monitoring SOP, Reply Parsing Overrides, and Measurement Worksheet (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:25:29.643Z

---

# Pilot Runbook v1 — Appointment No-Show Reducer (SMS + Two-Way Confirmations)

**Legitimacy URL (share with clients):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  
**Support / Pilot Contact:** agent_bob_replit+no-show-bot@agentmail.to

## 1) Pilot goal + definition of “live”
A pilot location is **live** when: (1) appointments are being ingested/created, (2) reminders are sending at agreed offsets, (3) inbound replies are processed into statuses (confirmed/cancel/reschedule/stop/help), (4) reschedule workflow does not create double-bookings, (5) opt-out is honored immediately, and (6) analytics are recording events for weekly value reporting.

## 2) QA Execution Matrix (run pre-go-live + after any major change)
**How to run:** For each test case, record: *timestamp, business timezone, appointment ID, patient/customer phone, expected message, actual message, expected calendar state, actual calendar state, pass/fail, notes.*

### A. Timezone & DST correctness
1. **TZ-01 Basic local time** — Create appointment tomorrow 10:00 local. Reminder offsets: 24h + 2h. **Expected:** reminders land at exactly 10:00-24h and 10:00-2h in local timezone.
2. **TZ-02 Cross-timezone admin** — Admin user in different timezone views schedule. **Expected:** appointment time displayed correctly for location; messages use location timezone.
3. **TZ-03 DST forward gap** — Appointment on DST start date (if applicable). **Expected:** reminders do not shift by ±1h; no duplicate sends.
4. **TZ-04 DST backward repeat hour** — Appointment in repeated hour. **Expected:** only one reminder per offset; no double sends.

### B. Message quality & threading
5. **MSG-01 First reminder copy** — Verify variables (name, date, time, location, reply options). **Expected:** no broken placeholders; concise CTA.
6. **MSG-02 Thread continuity** — Customer replies to older reminder. **Expected:** system associates reply to the correct upcoming appointment or asks clarifying question.
7. **MSG-03 Multi-appointment same number** — Two future appointments for same phone. **Expected:** reminder references correct service/time; reply disambiguation if needed.

### C. Reply parsing & actioning
8. **PARSE-01 YES** — Reply: “Yes”. **Expected:** status=Confirmed; confirmation message returned.
9. **PARSE-02 NO / cancel** — Reply: “No”. **Expected:** status=Cancelled (or “Needs reschedule” per rules) + next-step message.
10. **PARSE-03 Reschedule intent** — Reply: “Can we do Friday afternoon?” **Expected:** status=RescheduleRequested; system proposes available slots or escalates to owner workflow.
11. **PARSE-04 Ambiguous** — Reply: “Maybe” **Expected:** ask for YES/NO or offer reschedule.
12. **PARSE-05 Profanity/irrelevant** — **Expected:** polite fallback + escalation tag if repeated.

### D. Calendar updates & double-booking prevention
13. **CAL-01 Confirm does not modify time** — **Expected:** calendar remains same; only status metadata updated.
14. **CAL-02 Reschedule to free slot** — **Expected:** original slot freed (or marked) and new appointment created/updated; no duplicates.
15. **CAL-03 Reschedule collision** — Attempt reschedule into already-booked slot. **Expected:** reject + offer alternatives; never overwrite existing booking.
16. **CAL-04 Cancel** — **Expected:** appointment cancelled per configured policy (delete vs mark cancelled) and no further reminders.

### E. Opt-out & compliance safeguards
17. **COMP-01 STOP** — Reply: “STOP”. **Expected:** immediate opt-out; send confirmation of opt-out; suppress future messages.
18. **COMP-02 HELP** — Reply: “HELP”. **Expected:** return support message with email agent_bob_replit+no-show-bot@agentmail.to.
19. **COMP-03 Re-opt-in path (manual)** — If client requests, document how to re-enable (explicit consent). **Expected:** no automatic re-enable without consent.

### F. Error handling & fail-safes
20. **ERR-01 Calendar API failure on write** — Simulate failure on reschedule. **Expected:** no partial updates; user receives “we’re checking” message; owner alerted.
21. **ERR-02 SMS provider failure** — Simulate send failure. **Expected:** retry policy; alert if >N failures; analytics records failure.
22. **ERR-03 Webhook delay** — Late inbound reply processing. **Expected:** idempotent processing; no double actions.
23. **ERR-04 Rate limits** — Many appointments. **Expected:** backoff; no dropped events; alert threshold.

**Go/No-Go rule:** Any failure in COMP or double-booking is a **blocker**. Timezone/DST issues are **blockers** if >15 minutes drift. Message copy issues are **major** if misleading; **minor** if stylistic.

## 3) Rule-based Reply Parsing Overrides (applied before AI)
**Precedence order:** STOP/UNSUBSCRIBE > HELP > CONFIRM > CANCEL/NO > RESCHEDULE > OTHER.

### High-confidence keywords
- **STOP / Opt-out:** stop, unsubscribe, cancel texts, end, quit, opt out, do not text, don’t text
- **HELP:** help, support, who is this, what is this
- **CONFIRM / YES:** yes, yeah, yep, y, ok, okay, confirm, confirmed, I’ll be there, see you then
- **CANCEL / NO:** no, n, can’t make it, cannot, won’t, cancel, cancel it, not coming
- **RESCHEDULE:** reschedule, change, move, another time, different time, later, earlier, postpone

### Edge-case rules
- If message contains both CONFIRM and RESCHEDULE keywords (e.g., “Yes but can we move it?”) => **RESCHEDULE**.
- If message contains STOP plus anything else => **STOP**.
- If message is a single character “Y” => **CONFIRM**; “N” => **CANCEL**.
- If message includes a date/time phrase (Friday/3pm/tomorrow) and any uncertainty => **RESCHEDULE**.

### Standard outbound responses (short)
- Confirmed: “You’re confirmed for {DATE} at {TIME}. Reply RESCHEDULE if you need to change it.”
- Cancelled: “Okay — you’re cancelled. Reply RESCHEDULE to pick a new time.”
- Reschedule requested: “Got it — what day/time works? If you prefer, reply with 2–3 options.”
- STOP: “You’re opted out and won’t receive more texts. Reply HELP for support.”
- HELP: “This is appointment reminders. Support: agent_bob_replit+no-show-bot@agentmail.to. Reply STOP to opt out.”

## 4) 7-Day Pilot Monitoring SOP (concierge ops)
### Daily checklist (Days 1–7)
1. **Delivery health:** % reminders sent, failures, retries; investigate any failure clusters.
2. **Reply handling:** confirm/cancel/reschedule/stop counts; sample 10 conversations for quality.
3. **Calendar integrity:** spot-check 10 appointments: status matches, no duplicate bookings, cancellations reflected.
4. **Opt-out compliance:** verify STOP results in suppression; check for any post-STOP sends (must be zero).
5. **Owner escalation queue:** any reschedules needing human action; ensure response within agreed SLA.

### Incident severity rubric
- **SEV-1 (Blocker):** double-booking, messages after STOP, wrong-day reminder, mass send at wrong time, data leak. **Action:** pause sends for location, notify owner immediately, hotfix, document.
- **SEV-2 (Major):** reschedule writes failing, high send failure rate, threading mismatch causing confusion. **Action:** mitigation within same day, add alerting/guardrails.
- **SEV-3 (Minor):** copy tweaks, edge-case phrasing, reporting cosmetic issues. **Action:** batch fix.

### Incident log format (single source of truth)
- Date/time detected:
- Location:
- Severity:
- What happened (1–2 sentences):
- Customer impact:
- Steps to reproduce:
- Expected vs actual:
- Temporary mitigation:
- Root cause (when known):
- Fix deployed (Y/N) + time:
- Verification steps + result:

## 5) Baseline + Outcome Measurement Worksheet (for sales proof)
### Baseline (collect pre-pilot; last 4 weeks if possible)
- Appointments/week:
- No-shows/week:
- Cancellation rate:
- Avg appointment value ($):
- Avg gross margin (% if known; else assume 60% for internal estimate only):
- Current reminder process (none/manual/one-way system):

### During pilot (track weekly)
- Total reminders sent:
- Confirmations (count):
- Confirmation rate = confirmations / reminders delivered:
- Reschedule requests (count):
- Successful reschedules completed (count):
- Waitlist offers sent (count):
- Waitlist fills (count):
- Net no-shows (count):

### Recovered revenue estimate (simple + defensible)
- **No-show reduction (count)** = baseline no-shows/week − pilot no-shows/week
- **Recovered revenue/week ($)** = no-show reduction × avg appointment value
- **Recovered revenue/month ($)** = recovered/week × 4.3

**Note:** Keep estimates conservative. If baseline data is weak, use “minimum confirmed saves”: e.g., number of confirmations that historically were no-shows (if known) or count of same-day reschedules that prevented an empty slot.

## 6) Concierge onboarding call script (15 minutes)
1. “We reduce no-shows via smart SMS reminders and two-way confirmations. Here’s our overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2.”
2. Confirm basics: timezone, business hours, appointment types, typical lead time.
3. Confirm reminder timing: e.g., 24h + 2h, plus same-day if needed.
4. Consent/opt-out: confirm they have customer phone consent and want STOP/HELP handling.
5. Reschedule rules: allowed windows, whether to propose times or route to staff.
6. Metrics: collect baseline (last 4 weeks) + avg appointment value.
7. Next steps: go-live date, who gets escalations, and weekly report recipient.

## 7) Post-call confirmation email (send from agent_bob_replit+no-show-bot@agentmail.to)
Subject: Pilot setup recap + next steps (Appointment No-Show Reducer)

Body:
Hi {Name},

Thanks for the quick pilot call. Recapping what we’re launching:
- Location timezone: {TZ}
- Reminder schedule: {Offsets}
- Reply handling: YES=confirm, NO=cancel, RESCHEDULE=request change, STOP=opt-out, HELP=support
- Escalations go to: {Owner/staff contact}

Overview page (for reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

To start, please reply with:
1) Average appointment value ($):
2) Approx. appointments/week and no-shows/week (last 4 weeks if possible):
3) Any special rules (e.g., “don’t text before 9am”, “no reschedules within 2 hours”):

Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob
