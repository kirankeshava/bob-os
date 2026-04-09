# Pilot Measurement & Weekly Value Report Kit (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:15:49.558Z

---

Business legitimacy link (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support/contact email: agent_bob_replit+no-show-bot@agentmail.to

============================================================
A) WEEKLY VALUE REPORT TEMPLATE (copy/paste into email or PDF)
============================================================
Subject: Weekly No‑Show Reduction Report — {{BusinessName}} — Week of {{StartDate}}–{{EndDate}}

Hi {{OwnerFirstName}},

Here’s your weekly no‑show reduction summary from Appointment No‑Show Reducer for {{LocationName}}.

1) Executive Summary (1 minute)
- Total appointments monitored: {{appts_total}}
- Confirmed by text (two‑way): {{appts_confirmed}} ({{confirm_rate}}%)
- Rescheduled (saved appointments): {{appts_rescheduled}} ({{resched_rate}}%)
- Waitlist fills (gaps filled): {{appts_waitlist_filled}}
- Opt‑outs: {{opt_outs}} ({{optout_rate}}% of messages)
- Estimated revenue recovered this week: ${{revenue_recovered_week}}

2) Baseline vs Pilot (proof)
Baseline period: {{baseline_start}}–{{baseline_end}} ({{baseline_weeks}} weeks)
- Baseline no‑show rate: {{baseline_noshow_rate}}%
- Baseline weekly appointments: {{baseline_weekly_appts}}
- Avg appointment value: ${{avg_appt_value}}

This week (pilot):
- No‑show rate: {{pilot_noshow_rate}}%
- No‑show rate change: {{delta_noshow_pp}} percentage points
- No‑shows avoided (est.): {{noshow_avoided}}

Recovered revenue calculation (simple + transparent):
- No‑shows avoided × avg appointment value = {{noshow_avoided}} × ${{avg_appt_value}} = ${{revenue_from_noshow_avoided}}
- Plus waitlist fills × avg appointment value = {{appts_waitlist_filled}} × ${{avg_appt_value}} = ${{revenue_from_waitlist}}
- Total estimated recovered revenue = ${{revenue_recovered_week}}

3) Customer Reply Insights (what clients said)
Top reply reasons (from two‑way texting):
- “Running late”: {{reason_late}}
- “Need to reschedule”: {{reason_reschedule}}
- “Cancel”: {{reason_cancel}}
- Other: {{reason_other}}

Operational notes:
- Most reschedules requested within: {{median_reschedule_notice_hours}} hours of appointment time
- Best performing reminder timing: {{best_timing_window}} (example: 24h + 2h)

4) Deliverability & Compliance
- Messages sent: {{msgs_sent}}
- Replies received: {{msgs_replied}}
- STOP/opt‑out honored within: immediate (confirmed)
- Any message delivery issues: {{delivery_issues_yesno}}. Details: {{delivery_issues_details}}

5) Incidents / Exceptions (if any)
{{incident_table_or_none}}

6) Next Week’s Optimization (1–2 changes max)
- Change #1: {{next_change_1}} (expected impact: {{impact_1}})
- Change #2: {{next_change_2}} (expected impact: {{impact_2}})

If you want to review in 10 minutes, reply to this email or reach us at agent_bob_replit+no-show-bot@agentmail.to.

— Bob
Appointment No‑Show Reducer
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

============================================================
B) PILOT KPI + EVENT TRACKING SPEC (standardize across all pilots)
============================================================
Goal: Make pilot outcomes comparable across 2–3 locations and remove ambiguity when calculating ROI.

Core entities
1) Appointment (required fields)
- appointment_id (unique)
- location_id
- customer_id (or hashed phone)
- scheduled_start_utc
- scheduled_start_local
- timezone
- status (scheduled | confirmed | rescheduled | cancelled | completed | no_show)
- source_system (calendar/provider)
- value_estimate (optional; else use avg_appt_value)

2) Message (required fields)
- message_id
- appointment_id
- direction (outbound|inbound)
- channel (sms)
- sent_at_utc
- delivered_at_utc (if available)
- body
- template_name (24h_reminder | 2h_reminder | followup | waitlist_offer)

3) Event (for analytics; append-only)
- event_id
- location_id
- appointment_id (nullable for waitlist broadcast)
- event_type (see below)
- occurred_at_utc
- metadata (JSON)

Event types (minimum viable)
- reminder_sent {timing_window: "24h"|"2h"|"custom"}
- reminder_delivered
- reply_received {raw_text}
- intent_classified {intent: confirm|cancel|reschedule|late|question|stop|unknown, confidence, method: rules|ai}
- confirmed
- reschedule_requested
- rescheduled {old_time, new_time}
- cancel_requested
- cancelled
- waitlist_offer_sent {slot_time}
- waitlist_offer_accepted
- waitlist_fill_completed {appointment_id_new}
- opt_out {keyword: STOP|UNSUBSCRIBE|...}
- help_requested
- escalation_to_owner {reason}
- integration_error {system, error_code}
- fallback_mode_enabled {mode: "manual_confirm"|"owner_alert_only"}

Weekly rollups (computed)
- appts_total = count(appointments scheduled in week)
- appts_confirmed = count(status confirmed at least once before start)
- appts_rescheduled = count(rescheduled events where new_time exists)
- appts_waitlist_filled = count(waitlist_fill_completed)
- opt_outs = count(opt_out)
- no_show_count = count(status no_show)

============================================================
C) BASELINE CAPTURE + ROI CALCULATOR (fill on onboarding call)
============================================================
Inputs (collect from owner)
- Location name / ID: {{location_id}}
- Timezone: {{tz}}
- Baseline period dates: {{baseline_start}} to {{baseline_end}}
- Baseline weeks included: {{baseline_weeks}}
- Baseline weekly appointments (avg): {{baseline_weekly_appts}}
- Baseline no‑show rate (%): {{baseline_noshow_rate}}
- Average appointment value ($): {{avg_appt_value}}
- Typical lead time for booking: {{lead_time_days}}
- Can you refill cancellations same-day? (Y/N): {{refill_same_day}}

Pilot week outputs (from tracking)
- Pilot weekly appointments: {{pilot_weekly_appts}}
- Pilot no‑show rate (%): {{pilot_noshow_rate}}
- Waitlist fills: {{appts_waitlist_filled}}

Calculations
- Baseline expected no‑shows/week = baseline_weekly_appts × baseline_noshow_rate
- Pilot no‑shows/week = pilot_weekly_appts × pilot_noshow_rate
- No‑shows avoided (est.) = max(0, baseline expected no‑shows/week − pilot no‑shows/week)
- Revenue from no‑shows avoided = no‑shows avoided × avg_appt_value
- Revenue from waitlist fills = appts_waitlist_filled × avg_appt_value
- Total recovered revenue/week (est.) = Revenue from no‑shows avoided + Revenue from waitlist fills

Notes / assumptions section (must be explicit in report)
- If avg_appt_value varies by service, use weighted average or highest-volume service average.
- If baseline data is rough, label it as “owner-estimated” and update after 2 weeks.

============================================================
D) 15-MINUTE PILOT GO-LIVE QA SMOKE TEST (before enabling reminders)
============================================================
1) Timezone sanity
- Confirm location timezone matches calendar timezone.
- Create a test appointment tomorrow at 10:00 local; verify scheduled_start_local renders correctly.

2) Reminder schedule
- Verify reminder timing rules (e.g., 24h + 2h) generate two outbound reminders.
- Ensure quiet hours enforced (no sends outside business-defined window).

3) Two-way confirmations
- Send test reminder; reply “YES”. Expected: appointment marked confirmed, confirmation message returns, threaded properly.
- Reply “NO”. Expected: reschedule flow offered (or cancel flow per rules), no double-book created.

4) Reschedule loop guard
- Reply “RESCHEDULE”. Expected: system proposes options OR escalates to owner; does not create duplicate appointments.

5) Opt-out compliance
- Reply “STOP”. Expected: opt-out event logged; no further messages sent; a confirmation of opt-out is returned.
- Reply “HELP”. Expected: returns support text including agent_bob_replit+no-show-bot@agentmail.to.

6) Failure alerts / fallbacks
- Simulate calendar write failure (or disable integration in staging). Expected: escalation_to_owner fired and fallback_mode_enabled logged; system does not keep retrying silently.

7) Analytics check
- Confirm at least these events appear for test: reminder_sent, reply_received, intent_classified, confirmed/opt_out.

Pass/Fail signoff
- Go-live approved by: {{name}} at {{timestamp}}
- Issues found (if any): {{issues_list}}

End of kit.
