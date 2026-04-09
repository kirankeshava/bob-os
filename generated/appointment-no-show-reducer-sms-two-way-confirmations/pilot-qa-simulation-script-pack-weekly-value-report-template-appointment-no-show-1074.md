# Pilot QA Simulation Script Pack + Weekly Value Report Template (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:46:54.683Z

---

Below is a pilot-ready QA simulation pack (SMS threads) plus a weekly report template you can send every Monday to pilot clients. Use this with 2–3 concierge pilots to validate reliability and produce measurable outcomes.

LEGITIMACY + SUPPORT (include in client comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Support: agent_bob_replit+no-show-bot@agentmail.to

A) QA SIMULATION SCRIPT PACK (copy/paste test cases)

Test Case 1 — Basic confirmation (YES)
Goal: correct threading + confirmation state update.
1. System → Patient: “Reminder: You have an appointment at {Business} on Tue 3:00 PM. Reply YES to confirm, NO to cancel, or R to reschedule.”
2. Patient → System: “Yes”
Expected:
- Appointment status becomes CONFIRMED.
- Confirmation timestamp stored.
- System replies: “Thanks — you’re confirmed for Tue 3:00 PM. Reply R to reschedule.”
- Analytics: confirmation_count +1.

Test Case 2 — Basic cancel (NO)
1. System reminder
2. Patient: “No”
Expected:
- Status becomes CANCELED (or NEEDS_REBOOK per configuration).
- System replies with next step: “Okay — you’re canceled. Reply R if you want to reschedule.”
- If configured: notify owner/staff about slot opening.
- Analytics: cancel_count +1, slot_opened +1.

Test Case 3 — Reschedule request (keyword)
1. System reminder
2. Patient: “Reschedule” (or “R”)
Expected:
- Status becomes RESCHEDULE_REQUESTED.
- System asks for preferred day/time windows: “Sure—what days/times work? Example: ‘Tomorrow after 4’ or ‘Thu morning’.”
- Analytics: reschedule_request +1.

Test Case 4 — Natural language reschedule (intent parsing)
1. System reminder
2. Patient: “Can we do Friday around 2 instead?”
Expected:
- Intent recognized as RESCHEDULE.
- System proposes available slots OR escalates to staff depending on integration.
- If slot offered: “I can do Fri 1:40 or 2:20. Reply 1 or 2.”
- Analytics: reschedule_request +1.
Rule-based override: if message contains “resched”, “another time”, “move it”, treat as RESCHEDULE even if AI confidence is low.

Test Case 5 — Ambiguous reply should ask clarifying question
1. System reminder
2. Patient: “Maybe”
Expected:
- Do NOT confirm.
- System: “No problem—please reply YES to confirm, NO to cancel, or R to reschedule.”
- Analytics: clarification_prompt +1.

Test Case 6 — STOP opt-out compliance
1. System reminder
2. Patient: “STOP”
Expected:
- Opt-out recorded immediately.
- System: “You’re opted out and will no longer receive texts. Reply START to re-subscribe.”
- Ensure future reminders suppressed.
- Analytics: opt_out +1.

Test Case 7 — HELP handling
1. System reminder
2. Patient: “HELP”
Expected:
- System provides support contact: “For help, contact {Business} or email agent_bob_replit+no-show-bot@agentmail.to. Reply STOP to opt out.”
- Analytics: help_count +1.

Test Case 8 — Wrong number
Patient: “Wrong number”
Expected:
- Mark as DO_NOT_CONTACT (or prompt STOP).
- System: “Sorry about that. Reply STOP to opt out.”
- Analytics: wrong_number +1.

Test Case 9 — Late confirmation after appointment time
Setup: appointment at 3:00 PM; patient replies at 3:30 PM “YES”.
Expected:
- Do not mark as confirmed for a past appointment.
- System: “It looks like that time has passed. Reply R to reschedule.”
- Analytics: late_reply +1.

Test Case 10 — Reschedule loop prevention
Goal: avoid infinite back-and-forth.
1. Patient requests reschedule.
2. System offers slots.
3. Patient responds with new request unrelated to offered slots repeatedly.
Expected:
- After N loops (suggest N=2): escalate to staff/owner: “I’ll have the team reach out to finalize a time.”
- Trigger staff alert.
- Analytics: reschedule_escalation +1.

Test Case 11 — Double-booking prevention
Setup: two patients attempt to take the same offered slot.
Expected:
- First acceptance reserves slot.
- Second acceptance gets alternative: “Sorry—that time was just taken. Here are two options…”
- Analytics: slot_conflict +1.

Test Case 12 — Timezone/DST correctness
Setup:
- Business timezone: America/New_York
- Patient phone area code from different timezone (do not rely on area code)
Expected:
- Reminder times align to business timezone rules.
- If DST change week: verify reminders fire at intended local time.
- Log: timezone_used, appointment_local_time.

Test Case 13 — Calendar API failure fail-safe
Simulate calendar read/write failure.
Expected:
- System does not silently fail.
- Staff/owner alert sent: “Calendar integration error—please confirm schedule manually.”
- Patient message: “We’re having trouble accessing scheduling right now; the team will confirm shortly.”
- Analytics: integration_error +1; incident logged with timestamp.

B) DEFECT / INCIDENT LOG TEMPLATE (for pilots)
Fields:
- Incident ID:
- Date/time (business timezone):
- Location:
- Severity (S0 outage / S1 major / S2 minor / S3 cosmetic):
- Customer impact (how many patients affected):
- Trigger (reply type, reminder type, integration):
- Expected behavior:
- Actual behavior:
- Repro steps (exact messages + timestamps):
- Root cause guess:
- Mitigation (immediate):
- Fix owner:
- Fix deployed (Y/N) + date:
- Verification steps + result:

Severity guidance:
- S0: opt-out not honored, mass mis-sends, wrong-day reminders, cannot stop sending, or repeated failures.
- S1: confirmations/reschedules not reflected, threading breaks, calendar write failures without alert.
- S2: confusing copy, delayed messages, edge parsing errors with safe fallback.
- S3: formatting/typos.

C) WEEKLY VALUE REPORT TEMPLATE (send every Monday)
Subject: Weekly No-Show Reduction Report — {Business Name} — Week of {Date Range}

Hi {OwnerName},

Here’s your weekly no-show reduction summary from Appointment No-Show Reducer.
Website (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

1) Top-line outcomes
- Appointments with reminders sent: {reminders_sent}
- Confirmation rate: {confirm_rate}% ({confirmed} confirmed)
- Reschedules saved (would-have-no-show): {reschedules_completed}
- Waitlist fills (gap slots filled): {waitlist_fills}
- Estimated recovered revenue this week: ${recovered_revenue}

2) How “recovered revenue” is calculated (transparent)
Recovered revenue = (reschedules_completed + waitlist_fills) × Avg appointment value (${avg_appt_value}).
Optional: If you prefer, we can use gross margin instead of revenue.

3) Trend vs baseline (pilot proof)
Baseline (last 4 weeks, provided by you):
- Avg weekly appointments: {baseline_weekly_appts}
- Baseline no-show rate: {baseline_no_show_rate}%
This week:
- No-show rate (estimated): {this_week_no_show_rate}%
- Delta: {delta_no_show_rate} percentage points

4) Notable conversations (examples)
- {example_thread_1}
- {example_thread_2}

5) Incidents / reliability
- Incidents: {incident_count}
- Summary + resolution: {incident_summary}

6) Next week optimizations
- {optimization_1} (e.g., reminder timing, wording, adding rule overrides)
- {optimization_2}

Reply to this email if you want any changes to reminder timing, reschedule rules, or waitlist behavior.

— Bob
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

D) PILOT INTAKE + CONSENT CHECKLIST (concierge onboarding)
- Business name + address + timezone
- Services included + avg appointment value
- Appointment types excluded (e.g., first-time consults)
- Reminder schedule (e.g., 24h + 2h)
- Reschedule policy window (e.g., allow reschedule up to 2h before)
- Waitlist rules (who can be offered openings; max offers per slot)
- Opt-in confirmation: patient consent language approved; STOP/HELP included
- Owner escalation contact (phone/email) for integration failures

This pack is ready to use immediately for internal simulation and for live pilots once a pilot location is onboarded.