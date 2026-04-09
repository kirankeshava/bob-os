# Pilot QA Checklist + Weekly Value Report Template (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T07:14:01.263Z

---

## 1) Rapid Pilot QA Checklist (run before + during each location pilot)

### A. Configuration & Data Integrity
1. **Location profile created**: business name, address, primary contact, escalation phone/email.
2. **Timezone** set explicitly (IANA format e.g., `America/New_York`). Confirm it matches the location.
3. **Business hours** entered; confirm reminders are not sent outside configured quiet hours.
4. **SMS sender identity**: verify number/brand name in message copy and that replies thread correctly.
5. **Patient/customer fields**: first name, mobile number present; missing phone → exclude + alert.

### B. Appointment Lifecycle Coverage
6. **Creation**: new appointment triggers correct reminder schedule.
7. **Update**: time/provider/service change updates all pending reminders.
8. **Cancellation**: canceled appointment stops future reminders immediately.
9. **No duplicate reminders**: repeated calendar sync events must not schedule duplicates.
10. **Past appointments**: ensure no reminders are sent for appointments in the past.

### C. Timezones, DST, and Edge Timing
11. **Same-day bookings**: if appointment is within the next reminder window, send an immediate “short notice” reminder.
12. **DST transitions**: test an appointment that falls around DST changes; confirm send time is correct.
13. **Multi-location**: if one business has multiple locations, verify per-location timezone rules.

### D. Two-Way Reply Parsing (AI + Rule Overrides)
14. **High-confidence keyword overrides** (apply before AI):
   - Confirm: `YES`, `Y`, `CONFIRM`, `CONFIRMED`, `I'LL BE THERE`, `OK`, `K`.
   - Decline/Cancel intent: `NO`, `N`, `CAN'T`, `CANNOT`, `WON'T MAKE IT`, `CANCEL`.
   - Reschedule intent: `RESCHEDULE`, `MOVE`, `CHANGE TIME`, `DIFFERENT TIME`, `LATER`, `EARLIER`.
   - Stop/Opt-out: `STOP`, `UNSUBSCRIBE`, `CANCEL SMS`, `END`, `QUIT`.
   - Help: `HELP`.
15. **Ambiguous replies**: route to manual review (concierge mode) rather than guessing.
16. **Multiple messages**: ensure message threading keeps context (latest appointment reference).
17. **Out-of-scope** (e.g., “How much is it?”): respond with safe default + notify owner.

### E. Reschedule Workflow & Double-Booking Prevention
18. **Reschedule offer**: when reschedule intent detected, send 2–5 next available slots.
19. **Slot selection**: confirm chosen slot is still available at the moment of booking.
20. **Atomic booking**: prevent double-booking by locking slot or re-checking availability right before finalizing.
21. **If slot taken**: apologize + present new slots, never silently fail.
22. **Customer confirmation**: send a final “You’re set for DATE/TIME” after reschedule succeeds.

### F. Waitlist & Gap-Filling
23. **Waitlist opt-in** captured explicitly.
24. **Gap event** (cancellation/no confirmation) triggers waitlist broadcast per rules.
25. **Fairness**: contact waitlist in order or by priority; prevent spamming.
26. **First-come claim**: ensure slot is held briefly (e.g., 5 minutes) when someone replies YES.

### G. Compliance, Opt-Out, and Safety
27. **STOP handling**: immediate opt-out, confirm opt-out message sent, suppress all future texts.
28. **HELP handling**: provide short instructions and contact email.
29. **Rate limits**: avoid rapid-fire messages; enforce minimum interval.
30. **PII**: no sensitive medical details; messages should only reference appointment basics.

### H. Failure Modes & Alerts (must-have for pilots)
31. **Calendar API failure**: if sync fails, trigger alert to owner at agent_bob_replit+no-show-bot@agentmail.to and show dashboard incident.
32. **SMS delivery failure**: log + retry policy; if repeated failures for a patient, alert owner.
33. **Parsing failure**: if AI confidence low or exception occurs, fall back to human/concierge queue.
34. **Idempotency**: retries must not create duplicate bookings/cancellations.

### I. Analytics Instrumentation (baseline + ongoing)
35. Track per location weekly:
   - Total appointments
   - Reminders sent
   - Unique patients messaged
   - Confirmations (count + rate)
   - Reschedules completed
   - Cancellations captured early
   - Waitlist offers sent
   - Waitlist fills completed
   - Estimated recovered revenue = (saved no-shows + fills) × avg appointment value
36. **Baseline capture**: record prior 2–4 weeks no-show rate (or last month) + avg appointment value.

### J. Pilot Success Criteria (7–14 days)
37. Confirmation rate ≥ 50% of messaged appointments (or +20% vs baseline).
38. Measurable reduction in no-shows or late cancellations.
39. At least 1–3 reschedules or waitlist fills attributable to the system.
40. Zero compliance incidents; opt-outs honored immediately.

---

## 2) Weekly Client Value Report Template (email + plain-text)

**Subject:** Weekly No‑Show Reducer Report — {Location Name} — {Week Start} to {Week End}

Hi {Owner Name},

Here’s your weekly No‑Show Reducer summary for **{Location Name}** ({Week Start}–{Week End}). Dashboard/legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### 1) Outcomes (this week)
- Appointments scheduled: **{A}**
- Patients messaged: **{B}**
- Confirmations received: **{C}** (**{C/B}%** of messaged)
- Reschedules completed: **{D}**
- Early cancellations captured (before appointment time): **{E}**
- Waitlist fills completed: **{F}**

### 2) Estimated Revenue Impact
- Avg appointment value (your estimate): **${AvgValue}**
- Estimated recovered revenue from saves/fills: **${Recovered}**
  - Notes on calculation: ({SavedNoShows} saved no‑shows + {F} waitlist fills) × ${AvgValue}

### 3) Operational Notes
- Top patient response reasons: {TopReasons}
- Any delivery/automation incidents: {Incidents} (0 is ideal)
- Recommended tweak for next week: {Recommendation}

### 4) Next Week’s Goal
- Target confirmation rate: **{TargetConfirmRate}%**
- Target additional fills/reschedules: **{TargetFills}**

If you want to adjust reminder timing, wording, or which appointment types are included, reply here and we’ll tune it.

Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob
Appointment No‑Show Reducer

---

## 3) Pilot Deployment Plan (concierge-first)

### What we need from each pilot location (Day 0)
1. Location name + timezone + business hours.
2. Appointment source: calendar system name + access method (API or exported schedule).
3. Average appointment value (or by service tier).
4. Baseline metrics: last 2–4 weeks total appointments and no-shows/cancellations.
5. Preferred reminder cadence (default: 24h + 2h before, plus same-day short notice).
6. Escalation contact for failures.

### Day 1–2: Soft launch
- Enable reminders for a subset (e.g., 20–40 appointments) while monitoring logs.
- Keep reschedule actions in “confirm-before-finalize” mode to prevent double booking.

### Day 3–7: Full pilot
- Expand to all eligible appointments.
- Daily check: opt-outs, failed deliveries, any appointment mismatches.
- Start capturing weekly metrics for report.

### Day 7+: Convert to paid
- Send weekly report + recovered revenue estimate.
- Propose next-step: add waitlist fills, expand to additional providers/locations.
