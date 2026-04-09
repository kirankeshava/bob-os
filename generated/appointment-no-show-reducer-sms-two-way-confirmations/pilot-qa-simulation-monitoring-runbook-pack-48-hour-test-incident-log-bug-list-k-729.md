# Pilot QA Simulation + Monitoring Runbook Pack (48-hour test, incident log, bug list, kickoff email)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:56:57.107Z

---

## 1) 48-Hour Pre-Pilot QA Simulation Script (Concierge)

**Goal:** Verify reliability and message quality before turning on for a real location. This is designed to be run in ~2–4 hours and repeated for each new pilot location with their timezone and rules.

**Pre-reqs / Inputs to record (top of test doc):**
- Location name:
- Location timezone (IANA, e.g., America/Chicago):
- Business hours:
- Reminder schedule (e.g., T-24h, T-2h):
- Reschedule policy (allowed windows, cutoff time):
- Waitlist enabled? (Y/N):
- Owner escalation contact (email + phone):
- Legitimacy URL shared with client: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support email: agent_bob_replit+no-show-bot@agentmail.to

### Test Set A — Timezone + DST correctness
1. **A1: Basic timezone send time**
   - Create an appointment tomorrow at 10:00 AM local time.
   - Expected: T-24h reminder sends at 10:00 AM local time (not UTC drift).
   - Pass criteria: timestamp aligns to location timezone.

2. **A2: DST boundary (if applicable)**
   - Create an appointment on the next DST change date (or simulate by changing location timezone to one with upcoming shift).
   - Expected: reminder times remain correct in local time.
   - Fail-safe: if any ambiguity, system flags for manual review.

### Test Set B — Two-way confirmations + threading
3. **B1: Confirm YES**
   - Reply: “Yes” then “yep” then “Y”.
   - Expected: all map to CONFIRMED; system does not send further nag reminders.

4. **B2: Decline / NO**
   - Reply: “No” / “can’t make it”.
   - Expected: status becomes DECLINED; system offers reschedule flow.

5. **B3: Thread hygiene**
   - Send multiple reminders; reply to an older message.
   - Expected: message threads still associate to the correct upcoming appointment (or the most recent one for that patient).

### Test Set C — Reschedule loops + double-book prevention
6. **C1: Reschedule keyword override**
   - Reply: “reschedule” / “change time” / “move it”.
   - Expected: system enters reschedule flow immediately (rule-based override beats AI ambiguity).

7. **C2: Reschedule choose a new slot**
   - User selects a new time.
   - Expected: calendar update succeeds; old slot is released; new slot is booked; user receives confirmation.

8. **C3: Double-book prevention**
   - Attempt to book the same slot for a second test patient while first reschedule is in progress.
   - Expected: second booking blocked; user offered alternate times.

9. **C4: Reschedule loop guard**
   - User repeatedly asks for different times (3+ cycles).
   - Expected: after N attempts (recommend N=3), system escalates: “A team member will help you” + owner alert.

### Test Set D — Opt-out / HELP compliance
10. **D1: STOP**
    - Reply: “STOP”.
    - Expected: immediate opt-out confirmation; no further messages sent. Opt-out recorded.

11. **D2: START after STOP (if supported)**
    - Reply: “START”.
    - Expected: opt-in restored only if policy allows; otherwise instruct to contact office.

12. **D3: HELP**
    - Reply: “HELP”.
    - Expected: returns support instructions including business identity + support email (agent_bob_replit+no-show-bot@agentmail.to).

### Test Set E — Calendar/API failure fail-safes
13. **E1: Simulate calendar API failure (forced)**
    - Disable API key / block outbound call / use invalid token in test environment.
    - Trigger a reschedule attempt.
    - Expected: user gets a safe message (“We’re having trouble updating the schedule; we’ll follow up shortly.”). Owner escalation is sent within 2 minutes.

14. **E2: Partial failure (message sent but appointment not updated)**
    - Simulate success response to user but fail write.
    - Expected: reconciliation job detects mismatch; owner alerted; system stops further automation for that appointment until resolved.

### Test Set F — Analytics instrumentation sanity
15. **F1: Event counters**
    - Trigger: confirmed, declined, rescheduled, opt-out.
    - Expected: each event increments correct counters for the location/week.

16. **F2: Recovered revenue estimate**
    - Provide avg appointment value (AAV).
    - Expected: report computes: (saved confirmations + successful reschedules + waitlist fills) * AAV.

**Exit criteria (must pass before go-live):**
- Timezone test A1 passes
- STOP/HELP compliance passes
- Reschedule does not double-book
- Calendar failure produces owner alert + safe customer message
- Analytics counters increment correctly

---

## 2) Daily Monitoring + Incident Log Template (copy/paste into Sheet)

**Tab: Daily Checks (one row per day per location)**
| Date | Location | Timezone | Total reminders sent | Replies received | Confirmations | Reschedules completed | Opt-outs | Waitlist fills | Errors flagged | Manual interventions | Notes |

**Tab: Incident Log (one row per incident)**
| Incident ID | Date/Time (local) | Location | Severity (S1-S4) | Category (Calendar/API, Messaging, AI/Intent, Compliance, Data) | Customer impact | Detection source (alert/user/owner) | Steps to reproduce | Expected | Actual | Mitigation applied (Y/N) | Owner notified (Y/N) | Status (Open/In progress/Resolved) | Fix verification steps | Resolution notes |

**Severity definitions:**
- **S1:** Compliance risk (STOP ignored), double-booking, wrong patient messaged, or calendar corruption.
- **S2:** Reschedule fails; confirmations not recorded; repeated wrong intent mapping.
- **S3:** Minor message quality issues; delayed reminders; report mismatch.
- **S4:** Cosmetic/report formatting.

**SLA:**
- S1 acknowledge ≤15 min, mitigate ≤60 min.
- S2 acknowledge ≤60 min, mitigate same business day.

---

## 3) Pilot Bug List v0 (Edge Cases + Mitigations)

1. **Timezone drift if location timezone missing**
   - Risk: reminders sent at wrong hour.
   - Mitigation: onboarding requires IANA timezone; block go-live without it.

2. **Ambiguous confirmations (“sure”, “ok”, “k”) misclassified**
   - Risk: false confirmed.
   - Mitigation: rule-based high confidence list only; ambiguous tokens prompt a clarification: “Reply YES to confirm or RESCHEDULE”.

3. **Multiple upcoming appointments for same number**
   - Risk: reply attaches to wrong appointment.
   - Mitigation: include date/time in message; if >1 upcoming, ask: “Reply 1 for Tue 10am, 2 for Wed 2pm”.

4. **STOP after confirmation still receives future reminders**
   - Risk: TCPA issues.
   - Mitigation: global opt-out flag checked before every send; nightly audit: any sends to opted-out numbers => alert.

5. **Reschedule loop / indecisive user**
   - Risk: infinite automation; poor UX.
   - Mitigation: cap attempts; escalate to staff after 3 back-and-forth.

6. **Calendar write succeeds but confirmation SMS fails**
   - Risk: user unaware of new time.
   - Mitigation: detect SMS failure; send owner alert with patient + new time; attempt alternate channel (email) if available.

7. **Calendar/API outage**
   - Risk: automation causes confusion.
   - Mitigation: safe message to user + immediate owner alert + pause automations for affected location until API healthy.

---

## 4) Client Email: Week 0 Baseline Request + Pilot Kickoff (ready to send)

**Subject:** Quick kickoff + baseline numbers (No-Show Reducer pilot)

Hi {{OwnerName}},

Excited to get your no-show reduction pilot live. Here’s the legitimacy link for our Appointment No-Show Reducer and where you can always reach us:
- Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support: agent_bob_replit+no-show-bot@agentmail.to

To make sure the pilot is measurable (and to quantify recovered revenue in the weekly report), can you reply with the following for the last 4 weeks:
1) Total appointments scheduled (approx is fine)
2) No-shows (count or %)
3) Average appointment value (or average revenue per visit)
4) Your business timezone + business hours

Pilot plan (simple):
- We’ll send reminders + collect confirmations via two-way SMS.
- If someone can’t make it, we’ll guide them to reschedule (and optionally fill gaps from a waitlist).
- Every Monday we’ll email you a 1-page report: confirmations, reschedules saved, waitlist fills, opt-outs, and estimated recovered revenue.

Before we turn anything on, we will confirm your preferred reminder timing and opt-out/HELP wording to keep everything compliant.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
