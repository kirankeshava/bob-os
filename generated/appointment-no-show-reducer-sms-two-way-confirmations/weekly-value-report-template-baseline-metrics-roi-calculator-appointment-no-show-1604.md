# Weekly Value Report Template + Baseline Metrics & ROI Calculator (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:50:11.002Z

---

Subject: Your Weekly No‑Show Reduction Report (Week of {{WEEK_START}}–{{WEEK_END}})

Hi {{OWNER_NAME}},

Here’s your weekly performance summary from Appointment No‑Show Reducer. This report is designed to show clear operational impact and estimated recovered revenue.

Legitimacy / overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

====================
1) Executive Summary
====================
Location: {{LOCATION_NAME}}
Time zone: {{TIMEZONE}}
Reporting period: {{WEEK_START}} to {{WEEK_END}}

Top-line outcomes:
- Appointments with reminders sent: {{REMINDERS_SENT}}
- Confirmation rate: {{CONFIRMATION_RATE}}% ({{CONFIRMED_COUNT}} confirmed)
- Reschedules processed: {{RESCHEDULED_COUNT}}
- Cancellations captured early (vs. last-minute no-show): {{CANCEL_EARLY_COUNT}}
- Waitlist fills completed: {{WAITLIST_FILLS}}

Estimated recovered revenue (this week): ${{RECOVERED_REVENUE_EST}}

Notes (plain-English):
{{2_3_SENTENCE_NARRATIVE}} 
Example narrative: “This week, confirmations were strong and we captured {{CANCEL_EARLY_COUNT}} early cancellations, allowing {{WAITLIST_FILLS}} slots to be refilled. That prevented idle time and reduced last-minute surprises at the front desk.”

====================================
2) Funnel Metrics (What happened)
====================================
A) Reminder delivery
- Total reminder messages sent: {{REMINDERS_SENT}}
- Delivery failures (if known): {{DELIVERY_FAILURES}}  (Action: verify phone numbers / carrier blocks)

B) Patient responses
- Confirmed (YES): {{CONFIRMED_COUNT}}
- Declined (NO): {{DECLINED_COUNT}}
- Reschedule intents: {{RESCHEDULE_INTENTS}}
- Unknown/needs review: {{NEEDS_REVIEW_COUNT}}
- Opt-outs (STOP): {{OPTOUT_COUNT}}

C) Operational outcomes
- Appointments successfully rescheduled (new slot booked): {{RESCHEDULED_COUNT}}
- Same-day gap fills from waitlist: {{WAITLIST_FILLS}}
- Appointments flagged to staff (manual follow-up): {{STAFF_FOLLOWUPS}}

=============================================
3) Estimated Recovered Revenue (How we compute)
=============================================
We estimate recovered revenue from (1) prevented no-shows due to confirmations and (2) salvaged capacity due to early cancellations + waitlist fills.

Inputs (baseline):
- Avg appointment value (AOV): ${{AVG_APPT_VALUE}}
- Historical no-show rate (last 4 weeks): {{BASELINE_NOSHOW_RATE}}%
- Historical weekly appointment volume: {{BASELINE_WEEKLY_APPTS}}

Week calculation:
1) Expected no-shows without the system:
   Expected_NoShows = {{REMINDERS_SENT}} * ({{BASELINE_NOSHOW_RATE}} / 100)

2) Prevented no-shows (conservative):
   Prevented_NoShows = min( {{CONFIRMED_COUNT}} * {{CONFIRM_SAVE_FACTOR}}, Expected_NoShows )
   - Suggested CONFIRM_SAVE_FACTOR (conservative): 0.25 to 0.40 depending on niche.

3) Salvaged slots from waitlist fills:
   Salvaged_From_Waitlist = {{WAITLIST_FILLS}}

4) Total recovered appointments:
   Recovered_Appts = Prevented_NoShows + Salvaged_From_Waitlist

5) Estimated recovered revenue:
   Recovered_Revenue_Est = Recovered_Appts * ${{AVG_APPT_VALUE}}

This week’s estimate:
- Expected_NoShows: {{EXPECTED_NOSHOWS}}
- Prevented_NoShows (conservative): {{PREVENTED_NOSHOWS}}
- Salvaged_From_Waitlist: {{WAITLIST_FILLS}}
- Recovered_Appts: {{RECOVERED_APPTS}}
- Estimated recovered revenue: ${{RECOVERED_REVENUE_EST}}

=================================================
4) Exceptions, Risks, and Fixes (Reliability section)
=================================================
- Calendar/API errors: {{CALENDAR_ERRORS}} ({{CALENDAR_ERRORS_DETAILS}})
- Double-book prevention triggers: {{DOUBLE_BOOK_BLOCKS}}
- Messages needing manual review: {{NEEDS_REVIEW_COUNT}} (common causes: ambiguous replies, multi-appointment families)
- Opt-out compliance check: {{OPTOUT_COMPLIANCE_STATUS}} (All STOP requests suppressed within {{OPTOUT_SUPPRESSION_SLA}} minutes)

Actions taken / next steps:
- {{ACTION_ITEM_1}}
- {{ACTION_ITEM_2}}

=================================
5) Recommendations for Next Week
=================================
Based on this week’s results, recommended tweaks:
1) Reminder timing: {{RECOMMEND_REMINDER_TIMING}} (e.g., “24h + 2h before”)
2) Confirmation wording tweak: {{RECOMMEND_COPY_CHANGE}}
3) Waitlist rules: {{RECOMMEND_WAITLIST_RULES}}
4) Escalation thresholds: {{RECOMMEND_ESCALATION}} (e.g., “If no reply within 6h, staff call”) 

If you want, reply to this email with “OK” and we’ll apply the changes.

— Bob
Appointment No‑Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2


==============================
Appendix A — Baseline Intake Form (Copy/Paste)
==============================
Use this once per location before pilot starts.

Location name:
Primary contact name + role:
Time zone:
Business hours:
Appointment types (top 3) + typical duration:
Average appointment value (AOV) $:
Weekly appointment volume (last 4 weeks avg):
No-show count per week (last 4 weeks avg):
No-show rate % (if known):
Current reminder method (none / manual calls / SMS / email) + timing:
Reschedule policy constraints:
Waitlist available? (Y/N). If yes: how many on average and how to contact?
Escalation contact (for failures): name + phone + email:
Compliance note: confirm you have consent to text customers per your booking intake language (Y/N)


==============================
Appendix B — Instrumentation Checklist (Minimum Fields)
==============================
To produce the weekly report reliably, log these events with these minimum fields.

Event: reminder_sent
- appointment_id, location_id, patient_phone_hash, scheduled_start_utc, scheduled_start_local, timezone, message_id, channel, template_version

Event: patient_reply_received
- appointment_id (if matchable), location_id, patient_phone_hash, inbound_message_id, thread_id, raw_text, parsed_intent (yes/no/reschedule/stop/help/unknown), confidence, rule_override_used (true/false)

Event: confirmation_recorded
- appointment_id, location_id, confirmed_at_utc, method (sms), source (rule/ai/manual)

Event: reschedule_initiated / reschedule_completed
- old_appointment_id, new_appointment_id, location_id, outcome (success/fail), failure_reason

Event: waitlist_offered / waitlist_filled
- location_id, slot_time_utc, offers_sent_count, fill_success (true/false), filled_appointment_id

Event: opt_out
- patient_phone_hash, location_id, received_at_utc, suppressed_at_utc, confirmation_sent (true/false)

Event: system_error
- location_id, component (calendar/sms/parser), severity, error_code, error_message, occurred_at_utc, resolved_at_utc, owner_alerted (true/false)

Rollups (weekly): reminders_sent, confirmed_count, declined_count, rescheduled_count, waitlist_fills, optout_count, needs_review_count, delivery_failures, calendar_errors.
