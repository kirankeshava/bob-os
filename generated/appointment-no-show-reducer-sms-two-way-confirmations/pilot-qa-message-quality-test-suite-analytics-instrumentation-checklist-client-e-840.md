# Pilot QA Message-Quality Test Suite + Analytics Instrumentation Checklist + Client Emails (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:53:46.491Z

---

## 1) Pilot QA Message-Quality Test Suite (copy/paste scenarios)

**Goal:** Validate real-world SMS behavior (tone, clarity, compliance, threading) and reliability (timezones, reschedule loops, failure modes) before scaling beyond 2–3 pilots.

**Assumptions to standardize for tests**
- Business timezone set (e.g., America/New_York). Confirm appointments are created in business local time.
- Reminder schedule for pilot test: T-24h and T-2h (adjust per client later).
- Default reply intents supported: CONFIRM, CANCEL, RESCHEDULE, QUESTION, STOP/HELP.
- Rule-based overrides are enabled for high-confidence keywords:
  - Confirm: YES, Y, CONFIRM, CONFIRMED, OK, K, SURE
  - Decline/cancel: NO, N, CANCEL, CAN’T, CANT, WON’T, WONT
  - Reschedule: RESCHEDULE, MOVE, CHANGE, LATER, DIFFERENT TIME, DIFFERENT DAY
  - Opt-out: STOP, UNSUBSCRIBE, END, QUIT
  - Help: HELP, INFO

### A. Outbound reminder message quality (10 tests)
1. **T-24h reminder tone**: Ensure message includes business name, appointment date/time (local), and a clear CTA (“Reply YES to confirm, NO to cancel, or RESCHEDULE”).
   - Pass: readable in <160 chars if possible, no jargon.
2. **T-2h reminder tone**: Must be shorter; avoid sounding spammy.
3. **Name handling**: If client name missing, message should not show blank variable (e.g., “Hi ,”).
4. **Service/provider handling**: If service/provider missing, omit gracefully.
5. **Multi-location**: Message must identify correct location if client has >1 location.
6. **Link policy**: If including a link, ensure it’s short and not required to confirm.
7. **After-hours send guard**: If reminder would fire outside business rules, delay to next allowed window.
8. **Language clarity**: Avoid ambiguity like “confirm or reschedule” without specific reply instructions.
9. **Compliance footer**: If required, include “Reply STOP to opt out.” (At least on first message thread or per policy.)
10. **Thread continuity**: Verify the second reminder appears in the same thread on typical devices/carriers.

### B. Inbound reply intent + threading (18 tests)
11. Reply: “YES” → marks confirmed; system sends confirmation acknowledgement.
12. Reply: “Yep” → confirm via NLP; if uncertain, ask a clarifying question.
13. Reply: “No” → cancel flow; send acknowledgement + optional reschedule prompt.
14. Reply: “Can’t make it” → cancel flow.
15. Reply: “Reschedule” → reschedule flow asks for preferred times/days.
16. Reply: “Tomorrow instead” → reschedule; capture intent + propose slots.
17. Reply: “What’s the address?” → classify as question; respond with location info.
18. Reply: “Who is this?” → respond with business identification and legitimacy.
19. Reply: “STOP” → opt-out immediately; confirm opt-out; no further reminders.
20. Reply: “Stop” after already confirmed → opt-out still wins; suppress future messages.
21. Reply: “HELP” → send help message (what this is, how to opt out, support email).
22. Reply: “Yes but running late” → treat as confirmed + notify business/flag.
23. Reply: Emoji only “👍” → attempt confirm; if low confidence, ask “Please reply YES to confirm.”
24. Reply: “Y” → confirm.
25. Reply: “N” → cancel.
26. Reply: “Wrong number” → opt-out + mark number invalid; stop future.
27. Reply: Multiple messages quickly (“Reschedule” then “Actually YES”) → last message wins; log both.
28. Reply: Mixed intent (“Yes, need to reschedule”) → reschedule wins; ask for preferred time.

### C. Reschedule loop safety + double-book prevention (7 tests)
29. Reschedule request → offer 3 slots; user picks one → appointment moves; old slot freed.
30. User proposes a time that’s not available → respond with alternatives.
31. User goes silent after reschedule prompt → send 1 follow-up, then stop.
32. Two patients attempt to take the same newly freed slot → first-confirmed gets it; second receives alternatives.
33. Provider blocks time after reminder sent → reschedule flow should not offer blocked slot.
34. Appointment canceled by business after reminders scheduled → suppress remaining reminders.
35. Appointment rescheduled multiple times → ensure no duplicate reminders from prior instances.

### D. Timezone / DST / timing (5 tests)
36. Business timezone differs from patient phone area code → use business timezone in messages.
37. DST transition week appointment (spring forward/fall back) → reminder times remain correct.
38. Same-day booking (<2h) → only send appropriate reminder (or immediate confirmation request) without spamming.
39. Appointment created/edited close to reminder send → dedupe so only 1 reminder goes out.
40. Overnight appointments (e.g., 12:30am) → confirm day/date is unambiguous.

### E. Failure modes + fail-safes (5 tests)
41. Calendar API read fails → trigger owner alert (email/SMS) and pause automated actions; log incident.
42. Calendar API write fails during reschedule → inform patient “We’re having trouble updating—someone will contact you,” alert owner.
43. SMS delivery error/bounce → mark number invalid; alert owner if high volume.
44. Analytics write fails → do not affect patient experience; queue retry; alert if persistent.
45. Opt-out race condition (STOP arrives while reminder queued) → STOP must suppress queued sends.

**Execution note:** For each test, record: date/time, business timezone, appointment ID, outbound text, inbound text, observed behavior, expected behavior, pass/fail, and incident link if any.

---

## 2) Pilot Instrumentation + Analytics Event Checklist

**Objective:** Every pilot must produce comparable week-1 proof: confirmation rate, reschedule saves, waitlist fills, and **estimated recovered revenue/week**.

### Required entities/fields
- **Location**: location_id, timezone, average appointment value (AOV), business hours
- **Appointment**: appointment_id, location_id, start_time_local, created_at, status (scheduled/confirmed/canceled/rescheduled/no-show), value (if available)
- **Message**: message_id, appointment_id, direction (outbound/inbound), timestamp_utc, carrier_status (sent/delivered/failed), thread_id
- **Patient** (minimal): patient_id, phone_hash, opt_out (bool), opt_out_timestamp

### Events to log (minimum)
1. `reminder_scheduled` (fields: appointment_id, send_time_utc, reminder_type T-24/T-2)
2. `reminder_sent` (message_id, appointment_id)
3. `reminder_failed` (message_id, error_code)
4. `inbound_received` (message_id, raw_text, normalized_text)
5. `intent_classified` (message_id, intent, confidence, override_used bool)
6. `confirmed` (appointment_id, method=sms, timestamp)
7. `canceled` (appointment_id, reason=sms_reply)
8. `reschedule_requested` (appointment_id)
9. `rescheduled` (old_appointment_id/new_appointment_id, timestamp)
10. `waitlist_offered` (slot_id, count_offered)
11. `waitlist_filled` (slot_id, appointment_id)
12. `opt_out` (patient_id, source=STOP)
13. `owner_alert_sent` (type=calendar_fail/sms_fail/unknown_intent, channel=email)

### Weekly rollups (per location)
- Total appointments in scope
- Reminder coverage rate = reminders_sent / appointments
- Confirmation rate = confirmed / appointments
- Reschedule save count = rescheduled_count (where appointment would otherwise be canceled/no-show)
- Waitlist fill count
- Opt-out rate
- Estimated recovered revenue/week:
  - `recovered = (no_show_rate_baseline - no_show_rate_pilot) * appointments * AOV`
  - If baseline not available, use conservative proxy: `confirmed_count * AOV * 0.05` (label as estimate)

---

## 3) First-pass Bug List (highest risk) + Mitigation

1. **Timezone drift** (Severity 1): reminders fire in UTC or patient timezone.
   - Mitigation: store timezone at location; convert only at render/send; add tests 36–40.
2. **Duplicate reminders after reschedule** (S1): old reminders still send.
   - Mitigation: on appointment update, cancel queued jobs by appointment_id; idempotency key per (appointment_id, reminder_type).
3. **STOP not suppressing queued messages** (S1 compliance risk).
   - Mitigation: check opt_out at send time; central suppression list.
4. **Ambiguous replies misclassified** (S2): “Ok” vs “Ok cancel”.
   - Mitigation: rule overrides + clarifying question when mixed intent.
5. **Calendar API write failure during reschedule** (S1): patient told it’s moved but it’s not.
   - Mitigation: only confirm reschedule after calendar write success; else apology + owner alert.
6. **Threading breaks across numbers** (S2): responses not tied to appointment.
   - Mitigation: include short identifier in message (“Reply YES to confirm for Tue 3pm”); map inbound by patient + nearest upcoming appointment.

---

## 4) Client Emails (ready to send; includes legitimacy URL + support email)

### A) Week-0 Baseline Request (before go-live)
Subject: Quick baseline numbers needed (so we can prove recovered revenue)

Hi {{OwnerName}},

To make the pilot measurable, can you reply with the last 4 weeks (or best estimate) for:
1) Total appointments per week (avg)
2) Typical no-show rate (%)
3) Average appointment value ($)
4) Any existing reminder workflow (none / calls / manual texts / software)

We’ll use this to generate a simple weekly value report showing confirmations, reschedules saved, waitlist fills, and estimated recovered revenue.

For reference/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob

### B) Week-1 Check-in (send after first 5–7 days)
Subject: Pilot check-in + first weekly report on {{Day}}

Hi {{OwnerName}},

Quick check-in on week 1:
- Are the reminder timings working for your schedule?
- Any patient complaints/confusion about the messages?
- Any special cases we should handle (same-day bookings, multiple providers, etc.)?

I’ll send the first weekly value report on {{Day}} with:
- Confirmation rate
- Reschedules saved
- Waitlist fills
- Estimated recovered revenue
- Any incidents (and what we changed)

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Best,
Bob
