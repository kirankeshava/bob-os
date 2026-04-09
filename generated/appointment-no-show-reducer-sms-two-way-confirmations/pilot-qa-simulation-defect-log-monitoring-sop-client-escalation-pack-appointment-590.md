# Pilot QA Simulation Defect Log + Monitoring SOP + Client Escalation Pack (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:34:05.265Z

---

Business legitimacy URL (share with pilots): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/ops email: agent_bob_replit+no-show-bot@agentmail.to

SECTION A — 48-HOUR QA SIMULATION DEFECT LOG TEMPLATE (copy/paste)
Fields:
- Defect ID:
- Date/Time found (with timezone):
- Environment: (staging/pilot), Messaging provider, Calendar provider
- Severity: S0 (critical outage), S1 (major revenue risk), S2 (moderate), S3 (minor)
- Category: timezone/DST, threading, opt-out, reschedule, waitlist, calendar sync, double-booking, analytics
- Preconditions: (business timezone, reminder schedule, appointment type)
- Steps to reproduce (numbered):
- Expected behavior:
- Actual behavior:
- Evidence: (screenshots/log lines/message IDs)
- Customer impact statement (1 sentence):
- Suggested fix:
- Suggested mitigation (if fix not ready):
- Owner:
- Status: open/in progress/fixed/verified/won’t-fix
- Verification steps:

SECTION B — FILLED EXAMPLE DEFECTS (what we should expect to catch)
DEFECT 001
- Severity: S1
- Category: timezone/DST
- Preconditions: Business timezone America/Los_Angeles; appointment at 9:00 AM local; reminder set “24h before”
- Steps:
  1) Create appointment for tomorrow 9:00 AM PT.
  2) System schedules 24h reminder.
  3) Observe actual scheduled send time.
- Expected: Reminder sends at 9:00 AM PT the prior day.
- Actual: Reminder sends at 9:00 AM UTC (off by 7–8 hours).
- Impact: Reminders arrive at wrong time; confirmations drop; increased no-shows.
- Suggested fix: Normalize all internal scheduling to UTC with explicit business_timezone field; convert at boundaries only.
- Mitigation: Temporarily force business_timezone required at onboarding; add sanity check “send_time_local within business hours” else alert.
- Verification: Repeat steps; confirm send_time equals local 9:00 AM.

DEFECT 002
- Severity: S0
- Category: opt-out
- Preconditions: Any pilot number
- Steps:
  1) Customer replies “STOP”.
  2) System sends another reminder later.
- Expected: Immediate opt-out confirmation + suppression of all future outbound; log opt_out event.
- Actual: Opt-out recorded but next scheduled reminder still sends.
- Impact: Compliance risk and reputational damage.
- Suggested fix: Central suppression check in outbound pipeline; cancel scheduled jobs on opt-out.
- Mitigation: Daily cron to reconcile opt-outs vs scheduled sends; auto-cancel.
- Verification: After STOP, ensure zero sends; confirm opt_out event with timestamp.

DEFECT 003
- Severity: S1
- Category: threading
- Preconditions: Two appointments for same phone on different days
- Steps:
  1) Confirm first appointment (“YES”).
  2) Receive reminder for second appointment.
  3) Reply “NO” intending second.
- Expected: “NO” maps to the most recent pending appointment thread.
- Actual: “NO” cancels first appointment instead.
- Impact: Wrong appointment changes; front desk chaos.
- Suggested fix: Thread by (phone + appointment_id) with last_outbound_message_id mapping; choose most recent pending when ambiguous.
- Mitigation: When ambiguity detected, ask a clarifying question: “Which appointment do you mean: Tue 9am or Fri 2pm?”
- Verification: Run with two appointments; ensure replies apply correctly.

DEFECT 004
- Severity: S1
- Category: reschedule loop
- Preconditions: Reschedule flow enabled
- Steps:
  1) Patient replies “RESCHEDULE”.
  2) System offers times.
  3) Patient replies with time outside business hours (e.g., “8pm”).
- Expected: System rejects politely and re-offers valid times.
- Actual: System accepts and writes invalid time into calendar.
- Impact: Calendar corruption + missed appointments.
- Suggested fix: Validate proposed times against business hours and service duration; never write invalid slots.
- Mitigation: If uncertain, route to owner: “We’ll have the team contact you to reschedule.”
- Verification: Try invalid times; ensure no calendar write.

DEFECT 005
- Severity: S0
- Category: calendar sync failure
- Preconditions: Calendar API token expired
- Steps:
  1) Trigger calendar update (confirm/reschedule).
  2) Observe behavior.
- Expected: System detects failure, does NOT assume success, alerts owner immediately, and replies to customer with safe fallback.
- Actual: System replies “Confirmed!” even though calendar update failed.
- Impact: Double-booking and lost trust.
- Suggested fix: Treat calendar update as transactional; only confirm after success; on failure, create incident + owner alert.
- Mitigation: Temporary: disable auto-write; switch to “notify-only” mode until integration restored.
- Verification: Expire token; ensure owner alert + correct customer response.

DEFECT 006
- Severity: S1
- Category: double-booking prevention
- Preconditions: Two patients attempt to take same waitlist slot
- Steps:
  1) Send waitlist offer to Patient A and B.
  2) Both reply “YES” within 30 seconds.
- Expected: Slot is atomically reserved; second person receives “Slot taken, want next available?”
- Actual: Both get confirmation; calendar ends up with duplicate or overwritten events.
- Impact: Front desk conflict and churn.
- Suggested fix: Implement atomic reservation with TTL lock per slot_id.
- Mitigation: Offer to only one patient at a time until locking is implemented.
- Verification: Repeat; ensure only one wins.

SECTION C — PILOT DAILY MONITORING SOP (CONCIERGE OPS)
Daily checklist (Mon–Sat during business hours):
1) Delivery health
- Check outbound send volume vs expected (appointments tomorrow + same-day reminders).
- Spot-check 5 messages: correct business name, correct time, correct location.
2) Reply handling health
- Review all inbound replies from last 24h.
- Confirm that YES/NO/STOP/RESCHEDULE were classified correctly.
- For any “unknown/ambiguous”, tag and respond with clarification within 1 business hour.
3) Compliance
- Verify STOP opt-outs were honored (no additional sends after STOP).
- Verify HELP responses exist and contain support email agent_bob_replit+no-show-bot@agentmail.to.
4) Calendar integrity
- Audit 10 random appointments: confirmation state matches calendar notes/status.
- Check for any duplicate bookings or reschedule anomalies.
5) Incident triggers (immediate)
- Any calendar API error spike, message delivery failures, or opt-out violation → create S0/S1 incident and notify owner.
6) Metrics capture (5 minutes)
- Record daily counts: reminders sent, delivered, replies, confirmations, cancellations, reschedules completed, waitlist fills, incidents.

Owner alert rules (send email immediately):
- S0: Calendar write failing; STOP not honored; messages sending at wrong local time; mass delivery failures.
- S1: Mis-threading causes wrong appointment modification; duplicate booking; reschedule writes invalid times.

SECTION D — CLIENT-FACING INCIDENT ESCALATION MESSAGE PACK (ready to paste)
1) Email to owner (calendar/API failure)
Subject: Action Needed: Appointment reminder system can’t update your calendar right now
Hi {{OwnerName}},
We detected an issue updating your calendar integration (error: {{error_summary}}). To prevent double-bookings, we’ve temporarily switched to safe mode: reminders can still go out, but we will not auto-confirm/reschedule into the calendar until the connection is restored.

What we need from you:
1) Confirm you still want reminders sent while we fix the integration (recommended).
2) If you have 5 minutes today, we’ll reconnect the calendar securely.

Status page / legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob

2) SMS to customer (safe fallback when reschedule cannot be completed automatically)
“Thanks — we got your message. Our team will confirm the best available reschedule option shortly. If urgent, reply with your preferred day/time window.”

3) SMS HELP response
“Help: Reply YES to confirm, NO to cancel, RESCHEDULE to change. Reply STOP to opt out. Support: agent_bob_replit+no-show-bot@agentmail.to”

SECTION E — MINIMUM INSTRUMENTATION EVENT LIST (to power weekly value reports)
Track these events with properties so pilots are comparable:
- reminder_scheduled {appointment_id, location_id, send_at_utc, send_at_local, reminder_type}
- reminder_sent {provider_message_id, appointment_id, phone_hash, channel}
- reminder_delivered {provider_message_id, delivered_at}
- inbound_received {provider_message_id, phone_hash, raw_text, received_at_local}
- intent_classified {appointment_id, intent, confidence, used_rule_override:true/false}
- confirmed {appointment_id, method:sms, confirmed_at_local}
- cancelled {appointment_id, method:sms}
- reschedule_requested {appointment_id}
- reschedule_completed {old_appointment_id, new_appointment_id}
- waitlist_offer_sent {slot_id, offer_expires_at}
- waitlist_filled {slot_id, appointment_id}
- opt_out {phone_hash, keyword:STOP}
- calendar_update_failed {appointment_id, error_code}
- incident_created {severity, category}

This package is designed to (1) catch pilot-breaking issues within 48 hours, (2) keep pilots stable with daily monitoring and fail-safes, and (3) ensure we can produce credible weekly value reports that quantify confirmations, reschedules saved, waitlist fills, and estimated recovered revenue per location.