# Pilot Reporting Workflow Pack — Event Tracking Schema + Kickoff Email + Weekly Value Report (Copy-Ready)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:10:58.342Z

---

Below is a copy-ready workflow pack to run 2–3 concierge pilots with consistent measurement and a strong weekly “value proof” narrative. All client communications reference the legitimacy URL and support email.

1) PILOT VALUE TRACKING SCHEMA (EVENTS + REQUIRED FIELDS)
Use these events in your database/logs/analytics. Even if the product is concierge/manual, record them the same way so pilots are comparable.

Global required properties (every event):
- location_id, location_name
- patient_id (or hashed identifier), appointment_id
- timestamp_utc
- location_timezone (IANA, e.g., America/Chicago)
- channel (sms)
- message_id (if applicable), thread_id (if applicable)
- source (system | human_override)

Core events:
A. appointment_imported
- props: start_time_local, provider_id (optional), service_name (optional), appointment_value_est (number)

B. reminder_sent
- props: reminder_type (initial | followup | last_chance), scheduled_send_time_local, actual_send_time_local, template_version

C. reply_received
- props: raw_text, normalized_text, intent_class (confirm | cancel | reschedule | question | stop | unknown), intent_confidence (0-1), override_rule_hit (string|null)

D. confirmation_recorded
- props: confirmation_method (reply_yes | link_click | manual), confirmed_at_local

E. reschedule_requested
- props: requested_at_local, reason_bucket (timing | sick | conflict | price | unknown)

F. reschedule_completed
- props: old_start_time_local, new_start_time_local, reschedule_latency_minutes, calendar_writeback (success|failed)

G. waitlist_offer_sent
- props: slot_start_time_local, offer_expires_minutes

H. waitlist_slot_filled
- props: filled_by_patient_id, fill_latency_minutes, slot_value_est

I. opt_out
- props: keyword (STOP|UNSUBSCRIBE|CANCEL), opt_out_at_local

J. help_request
- props: keyword (HELP|INFO), routed_to (owner|staff|auto)

K. integration_error
- props: integration (calendar|sms_provider), error_code, error_message, severity (sev1|sev2|sev3), fallback_action (notify_owner|pause_sends|manual_mode)

Outcome rollups (computed weekly per location):
- total_appointments
- reminders_sent
- confirmation_rate = confirmations / total_appointments
- reschedule_rate = reschedule_completed / total_appointments
- waitlist_fill_count
- opt_out_rate = opt_out / unique_patients_messaged
- recovered_revenue_est = (incremental_shows * avg_appt_value) + (waitlist_fill_count * avg_appt_value)
Where incremental_shows = (baseline_no_show_rate - pilot_no_show_rate) * total_appointments.


2) CLIENT EMAIL — PILOT KICKOFF + CONSENT CONFIRMATION (SEND AFTER ONBOARDING)
Subject: Pilot kickoff — Two-way SMS confirmations start [DATE]

Hi [Owner/Manager Name],

Thanks for starting the no-show reduction pilot. This message confirms our go-live details and consent items.

What starts on: [Go-live date]
Location: [Location name + address]
Timezone we will use: [e.g., America/Chicago]
Reminder schedule (relative to appointment):
- [e.g., 24 hours before] + [e.g., 2 hours before if unconfirmed]

Two-way replies supported:
- “YES” to confirm
- “NO” to cancel
- “RESCHEDULE” to move the appointment
- “STOP” to opt out of texts

Consent/Compliance confirmation (please reply “CONFIRMED”):
1) Your customers have provided consent to receive appointment-related SMS messages (or you will collect consent going forward).
2) You want us to include opt-out language in messages (STOP to opt out).
3) Best escalation contact if anything looks wrong: [name + phone/email].

During the pilot we’ll send you a simple weekly report quantifying confirmations, reschedules, waitlist fills, and estimated recovered revenue.

Legitimacy link (overview): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

Reply with “CONFIRMED” (and any edits to reminder timing) and we’ll begin.

— Bob


3) WEEKLY PILOT RESULTS REPORT (COPY-READY EMAIL)
Subject: Weekly results — [Location Name] no-show reduction pilot (Week of [DATE])

Hi [Owner/Manager Name],

Here’s your weekly pilot results summary for [Location Name] (Week of [DATE] to [DATE]).

A) Activity
- Total scheduled appointments: [#]
- Reminder messages sent: [#]
- Unique patients messaged: [#]

B) Customer responses (two-way SMS)
- Confirmations: [#]  ([%] of scheduled)
- Reschedules completed: [#] ([%] of scheduled)
- Cancellations captured early: [#]
- Waitlist fills (open slots filled): [#]
- Opt-outs: [#] ([%] of patients messaged)

C) Reliability / message quality notes
- Calendar write-backs: [success %] (errors: [#], resolved: [yes/no])
- Timezone/DST issues observed: [none / describe]
- Threading/duplicate messages: [none / describe]
- Any manual interventions performed: [none / list]

D) Estimated recovered revenue (simple math)
Baseline (from your last [4] weeks):
- Baseline no-show rate: [x%]
- Average appointment value: $[x]

This week:
- Pilot no-show rate: [y%]
- Incremental shows recovered: [(x%-y%)*total appointments] ≈ [#]
- Revenue recovered from incremental shows: [#] * $[avg] = $[amount]
- Revenue recovered from waitlist fills: [#] * $[avg] = $[amount]

Estimated recovered revenue this week: $[total]

E) Next week tuning (optional)
- Recommendation 1: [e.g., shift 2nd reminder from 2 hours → 3 hours]
- Recommendation 2: [e.g., add “Reply RESCHEDULE” line to first reminder]

If you’d like to continue after the pilot, reply “CONTINUE” and we’ll convert you to the paid plan and keep the same setup.

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob


4) INTERNAL DAILY PILOT OPS CHECK (USE DURING LIVE PILOTS)
Daily checklist (per active location):
1) Timezone sanity: confirm next 24h appointments are scheduled in correct local time.
2) Send log: verify reminders_sent count matches expected for upcoming appointments; spot-check 3 threads.
3) Reply parsing: review all reply_received with intent_class=unknown OR intent_confidence<0.7; apply override if obvious.
4) Calendar integrity: verify all reschedule_completed have calendar_writeback=success; if failed, trigger integration_error(sev1) and notify owner.
5) Opt-outs: confirm STOP keywords created opt_out event and suppressed further messages.
6) Incident log: record any anomalies + resolution steps + whether rollback/pause was needed.

This pack is designed so pilots produce comparable week-1 proof (confirmation rate, reschedules, waitlist fills, recovered revenue estimate) while also catching reliability edge cases early.
