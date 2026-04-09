# Pilot QA Simulation Script + Bug Backlog (v1) + Weekly Value Report + Outreach Micro-Sequence

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:21:52.523Z

---

## 1) 48-Hour Internal QA Simulation Script (Run Before Pilot #1)

**Purpose:** Validate reliability and edge cases for Appointment No-Show Reducer (SMS + two-way confirmations) prior to live pilots. Capture defects, mitigations, and measurable behavior.

**System assumptions:** The product sends reminders, accepts inbound SMS replies, updates appointment status (confirmed/cancel/rescheduled), offers reschedule links/workflows, supports waitlist fills, and tracks analytics.

### A. Pre-flight setup (T-0)
1. Set a test business profile with:
   - Business timezone: **America/Los_Angeles**
   - Business hours: 9am–5pm
   - Reminder schedule: 24h + 2h before appointment
   - Escalation contact: owner email/phone (test)
2. Create 12 synthetic appointments across 3 days:
   - 4 appointments in same day, 2 overlapping (intentional conflict)
   - 2 appointments near midnight boundary (11:30pm / 12:15am)
   - 2 appointments on DST boundary week (simulate) and one in different timezone
   - 2 appointments with same patient phone number (repeat client)
3. Ensure test patient phones are in a sandbox environment (or mock inbound webhook replay).

### B. Timezone + DST tests
**Test TZ-1: business timezone respected**
- Create appointment: tomorrow 10:00am PT.
- Expected: 24h reminder sends at 10:00am PT today; 2h reminder at 8:00am PT tomorrow.
- Pass/Fail: logs show scheduled times in PT; message timestamps align.

**Test TZ-2: client phone in different timezone**
- Appointment: 10:00am PT, client located in ET.
- Expected: message copy should mention local appointment time in business timezone (or clearly state timezone). Must be consistent.
- Pass/Fail: no mismatch between stated time and actual appointment time.

**Test DST-1: daylight savings transition**
- Create appointment on DST transition day.
- Expected: reminder timing remains correct (no off-by-one-hour).
- Fail-safe: if DST ambiguity detected, send owner alert.

### C. Two-way confirmation parsing (rule overrides + AI)
**Golden rule:** High-confidence keyword overrides must win.

**Test PARSE-YES variants**
Inbound messages (in reply to reminder):
1) “YES”
2) “Yes”
3) “y”
4) “confirm”
5) “I’ll be there”
- Expected: mark confirmed; send acknowledgement; update analytics: confirmations++.

**Test PARSE-NO/CANCEL variants**
1) “NO”
2) “cancel”
3) “can’t make it”
- Expected: mark canceled (or needs reschedule prompt depending config); offer reschedule/waitlist path.

**Test PARSE-RESCHEDULE variants**
1) “reschedule”
2) “move it”
3) “different time”
- Expected: send reschedule options/link; do not cancel until user selects a new slot (unless policy says cancel-first).

**Test PARSE-AMBIGUOUS**
1) “Maybe”
2) “Running late”
3) “What’s the address?”
- Expected: do NOT incorrectly confirm/cancel. Reply with clarifying prompt and/or provide info; flag for human review if needed.

### D. STOP/HELP compliance
**Test STOP-1:** inbound “STOP”
- Expected: immediate opt-out confirmation; suppress all future messages; record opt-out event.

**Test STOP-2:** inbound “Unsubscribe”
- Expected: same as STOP.

**Test HELP-1:** inbound “HELP”
- Expected: provide business name, support email, and instructions.
Include support email: **agent_bob_replit+no-show-bot@agentmail.to**

### E. Message threading + idempotency
**Test THR-1:** duplicate inbound webhook delivery
- Replay the same inbound message event twice.
- Expected: system processes once; no double-confirmations or duplicate appointment writes.

**Test THR-2:** rapid-fire replies
- User sends: “reschedule” then “YES” within 20 seconds.
- Expected: system chooses latest coherent state; avoids contradictory final status.

### F. Calendar updates + double-book prevention
**Test CAL-1:** reschedule to an already-booked slot
- Expected: system rejects and offers next available options.

**Test CAL-2:** two clients attempt same slot (race)
- Simulate two reschedule confirmations to same time within 5 seconds.
- Expected: only one is booked; second receives alternative options.

### G. Failure modes + fail-safes
**Test FAIL-1:** calendar API failure (timeout/500)
- Expected: no silent failure; send owner alert within SLA (e.g., <5 min). Mark appointment as “update_pending” and retry.

**Test FAIL-2:** SMS delivery failure
- Expected: retry policy; if repeated, owner alert; do not spam.

### H. Analytics integrity
Verify counters and revenue math:
- Confirmations count increments once per appointment.
- Reschedules count increments once per completed reschedule.
- Waitlist fill counts only when a canceled slot is re-filled.
- Recovered revenue calculation uses appointment value and delta no-show rate.

**Exit criteria (48-hour):**
- 0 Sev-1 defects open.
- Sev-2 defects have mitigations or manual SOP.
- STOP/HELP and timezone correctness pass.

---

## 2) Pilot QA Bug Backlog (v1) — Severity + Mitigation

**Severity definitions**
- **Sev-1 (Blocker):** compliance risk, duplicate charges/appointments, STOP not honored, wrong-day reminders.
- **Sev-2 (High):** wrong status updates, frequent misparses, owner not alerted on failures.
- **Sev-3 (Medium):** copy quality, minor analytics mismatch, edge-case confusion.
- **Sev-4 (Low):** cosmetic/report formatting.

### Bug candidates to validate/fix
1. **TZ/DST off-by-one-hour reminder scheduling** (Sev-1)
   - Risk: missed appointments or spam.
   - Mitigation: store all times in UTC + business timezone; add DST unit tests.

2. **STOP keyword not globally suppressing all future messages** (Sev-1)
   - Risk: TCPA/compliance.
   - Mitigation: centralized opt-out check at send-time; audit log.

3. **Duplicate booking during reschedule race condition** (Sev-1)
   - Risk: double-booking.
   - Mitigation: atomic slot reservation / transaction lock; idempotency keys.

4. **Inbound webhook replay causes double state transitions** (Sev-2)
   - Mitigation: dedupe by message SID + timestamp window.

5. **AI misclassifies ambiguous replies as confirmations** (Sev-2)
   - Mitigation: rule-based overrides for YES/NO/RESCHEDULE/STOP; require explicit confirmation keywords; fallback to clarifying question.

6. **Calendar API failure silently drops updates** (Sev-1)
   - Mitigation: owner alert + retry queue + “pending” state.

7. **Message threading confusion with multiple upcoming appointments for same number** (Sev-2)
   - Mitigation: include appointment date/time in every message; if multiple, ask user to choose “Reply 1 or 2”.

8. **Reschedule loop: user asks to reschedule repeatedly without resolution** (Sev-3)
   - Mitigation: cap attempts; escalate to staff after N loops.

9. **Analytics counters mismatch due to cancellations after confirmation** (Sev-3)
   - Mitigation: event-sourcing model; weekly report based on events not final state only.

10. **Waitlist fill not attributed to a specific canceled slot** (Sev-3)
   - Mitigation: link fill event to canceled slot ID.

---

## 3) Weekly Value Report Template (Email to Client)

**Subject:** Weekly No-Show Reduction Report — {Business Name} — Week of {Date}

Hi {Owner Name},

Here’s your weekly Appointment No-Show Reducer summary for {Business Name}.

Legitimacy link (overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

### 1) Top-line outcomes
- Appointments monitored: {#}
- Confirmations received (two-way): {#} ({% of monitored})
- Reschedules completed: {#}
- Same-week waitlist fills: {#}
- Opt-outs (STOP): {#}

### 2) Estimated recovered revenue (weekly)
- Baseline no-show rate (pre-pilot): {baseline_no_show%}
- This week no-show rate: {this_week_no_show%}
- Improvement: {delta%} points
- Avg appointment value: ${avg_value}
- Estimated recovered appointments: {appointments_monitored} × {delta%}
- **Estimated recovered revenue:** ${recovered_revenue}

### 3) Notable saves (examples)
- {Date/Time}: Client replied “YES” → confirmed
- {Date/Time}: Client rescheduled instead of canceling → slot retained
- {Date/Time}: Canceled slot re-filled from waitlist

### 4) Reliability / incident summary
- Incidents: {0/1/2…}
- Details (if any): {brief}
- Preventative fix/mitigation applied: {brief}

### 5) Next-week optimization
- Recommended reminder timing tweak: {e.g., add 48h reminder for high-ticket}
- Reschedule rule tweak: {e.g., require new time selection before canceling}

Reply to this email with any questions or if you want us to adjust reminder timing, wording, or escalation rules.

— Bob
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

---

## 4) Outreach Micro-Sequence (3 Emails) — Recruit 2–3 Pilots

### Email 1 (initial)
**Subject:** Quick question — reducing no-shows at {Business Name} with 2-way SMS confirmations

Hi {First Name},

I’m Bob. We’re piloting a simple SMS workflow that reduces appointment no-shows by sending smart reminders and collecting two-way confirmations (plus easy reschedules + waitlist fills).

Overview (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

We’re onboarding 2–3 local pilots right now (concierge setup, discounted after pilot). If you’re open, I can set up a 15-minute call and we’ll estimate what no-shows cost you weekly and track recovered revenue during the pilot.

Worth a quick chat this week?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email 2 (follow-up, 2–3 days later)
**Subject:** Re: reducing no-shows with confirmations + automated reschedules

Hi {First Name},

Just following up. The pilot is straightforward: we start with your reminder timing + confirmation keywords, then send you a weekly report with confirmations, reschedules, waitlist fills, and estimated recovered revenue.

If it’s helpful, reply with:
1) your average appointment value, and
2) your rough no-show rate,
…and I’ll send a quick estimate.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob

### Email 3 (breakup)
**Subject:** Should I close the loop?

Hi {First Name},

Should I close the loop on this, or is reducing no-shows something you want to revisit later?

If you’d like, I can run a 7-day pilot and send a weekly value report (confirmations/reschedules/waitlist fills + recovered revenue estimate).

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

— Bob
