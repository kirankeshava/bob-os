# Pilot QA + Monitoring Kit (48-hour Simulation, Baseline Capture, Incident Triage, 14-day Concierge SOP)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:40:44.414Z

---

Appointment No-Show Reducer — Pilot QA + Monitoring Kit

Legitimacy URL (share with prospects/clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/Contact email: agent_bob_replit+no-show-bot@agentmail.to

A) 48-HOUR INTERNAL QA SIMULATION SCRIPT (Run before any pilot goes live)
Goal: Validate reliability + message quality + measurable event tracking for confirmations/reschedules/waitlist fills.

Setup (Hour 0)
1) Create a synthetic location profile: timezone (test America/New_York and America/Los_Angeles), business hours, reminder schedule (e.g., T-24h + T-2h), reschedule rules (allow within 48h), waitlist enabled.
2) Generate 20 synthetic appointments across 3 days:
   - 6 appointments within next 24h (to trigger T-24h quickly)
   - 6 appointments near DST boundary or timezone edge cases (if feasible)
   - 4 double-book attempts (same time slot)
   - 4 “late-night” appointments (e.g., 7–9pm local)
3) Prepare 8 synthetic patient phone numbers (include one shared family number) to test threading.

Test Cases (Hour 1–36)
T1 Timezone/DST correctness
- Expected: reminder send times match location timezone; no reminders sent in quiet hours if configured.
- Pass/Fail: any reminder timestamp deviates >10 minutes from expected local time = FAIL.

T2 Two-way confirmation parsing (rule overrides)
Send replies to reminder threads:
- “YES”, “Yes”, “Y”, “Confirm”, “I’ll be there” => Confirmed
- “NO”, “Nope”, “Can’t make it” => Not coming
- “RESCHEDULE”, “Need to reschedule”, “Can we move to Friday?” => Reschedule intent
- “STOP” => Opt-out (no further messages)
- “HELP” => Help response (instructions + support email)
Expected: high-confidence keywords should override AI; ambiguous replies should be flagged for manual review.

T3 Reschedule loop protection
- User replies: “reschedule” -> system offers options -> user picks time -> confirm.
- Then user replies “actually reschedule again” within same thread.
Expected: no infinite loop; cap at N attempts (recommend N=3) then escalate to owner.

T4 Double-booking prevention
- Attempt to confirm/reschedule into an already-occupied slot.
Expected: system denies and offers next available times OR escalates.

T5 Opt-out compliance
- After STOP, send any subsequent reminder event.
Expected: zero outbound messages to that number; log opt-out event.

T6 Threading correctness (shared number)
- Two appointments for same phone number on different days.
Expected: messages clearly reference appointment date/time; confirmation applies to correct appointment.

T7 Calendar API failure fail-safe
- Simulate calendar read/write failure.
Expected: system alerts owner (email/SMS depending on config) within 5 minutes; outbound messaging pauses for affected appointments; incident logged.

T8 Analytics instrumentation
- Confirmed/rescheduled/opt-out/waitlist fill events recorded.
Expected: dashboard/DB contains event rows with: location_id, appointment_id, patient_hash, event_type, timestamp_utc, channel, message_id/thread_id.

Exit Criteria (Hour 36–48)
- All FAIL items either fixed or have a documented mitigation (manual SOP) acceptable for pilot.
- Produce a defect list with severity and recommended fix.


B) INCIDENT / BUG TRIAGE LOG (Use during pilots)
Fields (copy into a sheet/board):
- Incident ID
- Date/Time detected (UTC + local)
- Location
- Severity (S0–S3)
  S0: Compliance/Safety (STOP ignored, wrong recipient, privacy risk)
  S1: Revenue-impacting (missed reminders, wrong confirmation, double-book)
  S2: Degradation (late send, confusing copy, minor threading)
  S3: Cosmetic/Ideas
- Symptom (what happened)
- Expected behavior
- Steps to reproduce
- Impact (# appointments affected + estimated $)
- Mitigation (immediate manual step)
- Owner escalation sent? (Y/N + time)
- Root cause hypothesis
- Fix implemented (link/notes)
- Verification steps + result (PASS/FAIL)


C) WEEK-0 BASELINE CAPTURE EMAIL (send immediately after pilot agrees)
Subject: Quick baseline so we can prove recovered revenue (2 minutes)

Hi {{OwnerName}},

Excited to get your no-show reduction pilot live. To make sure we can quantify results from Week 1, could you reply with these 3 baseline numbers (last 4 weeks if possible)?

1) Total scheduled appointments (last 4 weeks): ____
2) No-shows / late cancels (last 4 weeks): ____
3) Average revenue per completed appointment (or typical ticket): $____

If it’s easier, you can paste a screenshot from your booking system.

For reference, here’s our product overview page you can share with staff: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Any questions or if you want me to pull this from exports, email me here: agent_bob_replit+no-show-bot@agentmail.to

Thanks,
Bob


D) 14-DAY CONCIERGE MONITORING SOP (for 2–3 pilots)
Objective: Prevent failures, ensure message quality, and produce weekly proof.

Daily (Days 1–14) — 20 minutes per location
1) Delivery health check
- Confirm reminders sent for next 24h window.
- Spot-check 5 random messages: correct date/time, clear CTA, correct location.

2) Reply review + overrides
- Review all replies from last 24h.
- Ensure YES/NO/RESCHEDULE/STOP/HELP classified correctly.
- If ambiguous, mark “Needs human follow-up” and notify owner.

3) Exception queue
- Look for: failed calendar writes, double-book conflicts, repeated reschedule attempts.
- For any exception, open an incident in the triage log and apply mitigation.

4) Opt-out audit
- Confirm any STOP resulted in suppression; verify no further sends scheduled.

5) Metrics capture
Record daily counts:
- Reminders sent
- Confirmations
- Reschedules completed
- Cancellations
- Opt-outs
- Waitlist fills
- Incidents by severity

Day 3 checkpoint
- Send owner a 3-bullet update: early confirmation rate, any issues, copy tweaks.

Day 7 checkpoint (Weekly Value Report)
- Compute: no-show reduction estimate, recovered revenue/week, notable saves (reschedules + waitlist fills), incident summary.
- Email report and request testimonial if results are strong.

Escalation rules (immediate)
- S0 or S1 incident: notify owner within 15 minutes + pause automation for affected segment if needed.
- STOP/HELP anomalies: treat as S0 until verified.

Outcome: At end of Day 14, we should have baseline + two weekly reports + a clean defect log demonstrating reliability improvements and quantified recovered revenue for sales proof.
