# Pilot Launch Kit (QA Fixtures + Defect/Incident Logs + Daily Ops SOP + Baseline Data Capture Pack)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:57:12.358Z

---

# Appointment No-Show Reducer — Pilot Launch Kit

Legitimacy URL (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2  
Support/Contact: agent_bob_replit+no-show-bot@agentmail.to

## 1) 48-hour QA Simulation Fixtures (Message Set)
Use these fixtures to simulate inbound/outbound behavior before and during the first 48 hours of each pilot. Log **Observed** vs **Expected** in the defect log.

### Assumptions (set per pilot)
- Business timezone: (e.g., America/Chicago)
- Business hours: 9a–5p local
- Reminder schedule: T-24h and T-2h
- Default confirmation request wording asks for: “Reply YES to confirm, NO to cancel, or R to reschedule.”

### Fixture A — Simple confirmation
**Outbound (T-24h):** “Reminder: You have an appointment with {Business} on Tue 2:00 PM. Reply YES to confirm, NO to cancel, or R to reschedule. Msg&data rates may apply. Reply STOP to opt out.”
**Inbound:** “YES”
**Expected:** Appointment status => Confirmed; no further reminders (or only a final “See you soon” depending on rules); analytics increment: confirmations +1.

### Fixture B — Lowercase + punctuation
Inbound: “yes!”
Expected: Same as A; thread remains open; no AI ambiguity.

### Fixture C — Decline/cancel
Inbound: “NO”
Expected: Appointment status => Cancel requested; if policy allows, send: “Okay — you’re canceled. Want to reschedule? Reply R.”; analytics: declines +1; if waitlist enabled, trigger waitlist fill workflow.

### Fixture D — Reschedule keyword
Inbound: “R”
Expected: System asks for preferred times OR provides booking link; appointment marked “Reschedule Pending”; analytics: reschedule_requests +1.

### Fixture E — Natural language reschedule
Inbound: “Can we do tomorrow after 3 instead?”
Expected: Parsed as reschedule intent; ask 1 clarifying question if needed (“What time works best?”) OR offer 2–3 slots; do not confirm new time until calendar write succeeds.

### Fixture F — Ambiguous response
Inbound: “maybe”
Expected: Rule-based override does NOT mark confirmed; system asks: “No problem—please reply YES to confirm or R to reschedule.”; analytics: ambiguous +1.

### Fixture G — Multiple patients / wrong person
Inbound: “This isn’t me”
Expected: Apologize + stop appointment-specific messages for this number; alert owner; mark contact mismatch.

### Fixture H — STOP compliance
Inbound: “STOP”
Expected: Immediate opt-out confirmation message; suppress all future messages; analytics: opt_out +1; store opt-out timestamp.

### Fixture I — HELP compliance
Inbound: “HELP”
Expected: Provide business name + contact info + opt-out instructions. Example: “You’re receiving appointment reminders from {Business}. For help contact {phone/email}. Reply STOP to opt out.”

### Fixture J — Timezone/DST edge
Scenario: Appointment at 9:00 AM local on the day DST changes.
Expected: Reminders send at correct local times; no off-by-one-hour. Confirmed appointment time displayed correctly.

### Fixture K — Late confirmation (after reminder window)
Inbound: “YES” received 10 minutes before appointment.
Expected: Still marks confirmed; optionally notify staff; avoid sending further prompts.

### Fixture L — Duplicate/rapid replies
Inbound: “YES” then “NO” within 30 seconds.
Expected: Deterministic final state; preferably latest message wins with audit log; alert owner if flip-flop.

### Fixture M — Double-book prevention
Scenario: Reschedule flow proposes a slot that becomes unavailable before booking.
Expected: System detects conflict on write; apologizes; offers next available slots; incident logged.

### Fixture N — Calendar API failure (hard)
Simulate: Calendar write fails (timeout/401).
Expected: Do NOT claim rescheduled; send: “We’re having trouble updating the calendar. We’ll notify the office and follow up shortly.” Alert owner immediately with instructions; incident severity S1.

### Fixture O — Message threading / multiple appointments
Scenario: Same number has two appointments (e.g., cleaning + follow-up).
Expected: Messages clearly reference date/time; replies map to the correct appointment; if ambiguity, ask to choose (“Reply 1 for Tue 2pm, 2 for Thu 10am”).

### Fixture P — Waitlist fill
Scenario: Appointment canceled; there is a waitlist.
Expected: System offers opening to waitlist contact(s) with first-come confirmation; once filled, stop offering; analytics: waitlist_offers +N, waitlist_fills +1.

## 2) Defect (Bug) Log Template (Copy/Paste as CSV)
Use one row per defect. Keep it brutally specific.

```csv
bug_id,reported_at,location,environment,severity,area,summary,steps_to_reproduce,expected,observed,impact,workaround,owner,fix_version,status,verified_by,verified_at
BUG-001,2026-04-09,Pilot-1,prod,S1,Calendar,Calendar write failure not alerting owner,"1) Trigger reschedule 2) Force calendar API 401",Owner alerted + patient told pending,"Patient told rescheduled; no owner alert",High risk of missed appt,"Manual call patient",Bob,1.0.3,Open,,,
```

### Severity rubric
- **S1**: Could cause missed appointments, compliance breach (STOP ignored), wrong patient data, or silent failures.
- **S2**: Major workflow break but contained; manual workaround exists.
- **S3**: Minor bug/copy issue; no major risk.

## 3) Incident Log Template (Operational Issues)
Use for production anomalies even if not clearly a “bug.”

```csv
incident_id,opened_at,location,trigger,customer_impact,detected_by,immediate_action,owner_notified_at,owner_contacted_via,status,closed_at,postmortem_notes
INC-001,2026-04-09,Pilot-1,Calendar API timeout,Reschedule pending,Monitoring,Paused confirmations + sent pending message,2026-04-09T10:22,email,Open,,"Add retry + owner alert"
```

## 4) Pilot Daily Ops SOP (15 minutes/day)
Goal: keep pilots stable, compliant, and measurable with minimal effort.

### Daily checklist
1. **Thread review (5 min):** Scan all active conversations from last 24h.
   - Tag each as: Confirmed / Declined / Reschedule Pending / Ambiguous / Opted-out / Needs Human.
2. **Exception handling (5 min):**
   - Any “wrong person,” “who is this,” or “stop” => ensure opt-out or suppression executed.
   - Any reschedule pending > 2 hours => follow up or alert owner.
3. **System health (3 min):**
   - Check calendar sync status (success/fail counts).
   - Verify no backlog of unsent reminders.
4. **Owner escalation (2 min):**
   - Send a single daily digest if needed: #confirmed, #reschedule pending, any incidents.

### Owner escalation triggers (send immediately)
- STOP not processed within 1 minute (S1)
- Calendar write failures / auth errors (S1)
- Messages sent at wrong local time (timezone/DST) (S1)
- Suspected wrong-patient thread (S1)
- Repeated ambiguous intent from same patient after 2 attempts (S2)

### Standard owner alert email (copy)
Subject: [Action Needed] Appointment No-Show Reducer — {Issue} at {Location}

Body:
Hi {Owner},
We detected an issue that needs attention:
- Location: {Location}
- Issue: {Plain English}
- Patient impact: {what happened}
- Recommended action: {call patient / confirm slot / update calendar auth}

We’re monitoring and will confirm once resolved.
Support: agent_bob_replit+no-show-bot@agentmail.to
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

## 5) Pilot Baseline Data Capture Pack (Send to each pilot before go-live)
Collect these before Day 0 so recovered revenue calculations are defendable.

### A) Business profile
- Location name:
- Timezone:
- Primary service types (top 3):
- Average appointment value ($):
- Average profit per appointment (optional):
- Typical no-show rate last 4 weeks (%):
- Appointments/week (avg):

### B) Reminder policy preferences
- Reminder timings (choose): T-48h / T-24h / T-2h / custom
- Allow reschedule via text? (Y/N)
- Minimum notice for reschedule: (e.g., 4 hours)
- Waitlist enabled? (Y/N) If yes, rules for offering slots:

### C) Consent + compliance
- Confirmation that customers have opted in to receive appointment texts (Y/N)
- Business phone number displayed publicly (Y/N)
- Who receives escalation alerts (name + email + phone):

### D) Baseline metrics snapshot (for weekly report)
Provide last 4 weeks (or best estimate):
- Total scheduled appointments:
- Total no-shows:
- Total late cancellations (<24h):
- Total reschedules:

## 6) Week-1 Baseline Math (simple, consistent)
- **Baseline no-show rate** = baseline_no_shows / baseline_scheduled
- **Pilot no-show rate** = pilot_no_shows / pilot_scheduled
- **No-show reduction (absolute)** = baseline_rate − pilot_rate
- **Recovered appointments/week (est.)** = (baseline_rate − pilot_rate) × pilot_scheduled
- **Recovered revenue/week (est.)** = recovered_appointments/week × avg_appointment_value

Note: Keep a conservative flag if baseline numbers are estimates.
