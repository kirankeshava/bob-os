# Pilot Ops Pack Addendum — Daily QA+Outcomes Tracker, Bug Triage Log, and Pilot Client Email Sequence (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:03:58.326Z

---

Below are copy/paste-ready assets for running 2–3 concierge pilots with clear measurement and fast defect resolution. Use with the existing onboarding packet.

=================================================================
A) DAILY PILOT QA + OUTCOMES TRACKER (single table)
=================================================================
Create one tracker per location. Recommended columns (fill daily during pilot).

Location Info (top of sheet)
- Business name:
- Location/branch:
- Timezone (IANA, e.g., America/Chicago):
- Primary contact name + phone:
- Owner escalation email/phone:
- Pilot start date:
- Reminder schedule used (e.g., T-24h + T-2h):
- Reschedule policy (min notice, hours):
- Waitlist enabled? (Y/N) Rules:
- Avg appointment value ($):
- Baseline (last 4 weeks): appointments/week, no-show %, cancellation %, reschedule %:

Daily rows (one row per day):
| Date | Day # | Appts scheduled (from calendar) | Reminders sent | Delivery failures (count) | Confirmed (YES) | Declined/Cancel (NO) | Reschedule requests | Reschedules completed | Waitlist offers sent | Waitlist fills | Net no-shows observed | Notes (edge cases) | Incidents opened (IDs) |

Definitions:
- “Confirmed (YES)” = customer explicitly confirms via SMS.
- “Reschedule requests” = customer message indicates reschedule intent.
- “Reschedules completed” = new time successfully booked and old slot cleared.
- “Waitlist fills” = open slot filled by waitlist customer.
- “Net no-shows observed” = appointments that still no-showed despite reminders.

Weekly rollup (end of week section)
- Total appts scheduled:
- Total reminders sent:
- Confirmations:
- Confirmation rate = Confirmations / Total appts scheduled
- Reschedules completed:
- Slots reopened = Reschedules completed + Cancellations
- Waitlist fills:
- No-shows (pilot week):
- Estimated no-show reduction (pp) = Baseline no-show% - Pilot week no-show%
- Estimated recovered appointments = (Baseline no-show% - Pilot no-show%) * Total appts scheduled
- Estimated recovered revenue ($) = Estimated recovered appointments * Avg appointment value

Note: If baseline is missing, use week 1 as “instrumentation week” and call week 2 “improvement week.”

=================================================================
B) BUG / DEFECT TRIAGE LOG (pilot-specific)
=================================================================
Use this to log every incident/defect during pilots. Keep one log across all pilots so patterns emerge.

Severity rubric
- SEV-0 (Critical): Messages sent to wrong person, opt-out ignored, double-booking caused, PHI/privacy risk, or high-volume failure.
- SEV-1 (High): Confirm/reschedule logic wrong, calendar write-back fails without alert, timezone bug causing wrong reminder time.
- SEV-2 (Medium): Message copy confusing, threading breaks occasionally, analytics miscount.
- SEV-3 (Low): Cosmetic/reporting issues, minor edge-case wording.

Log table columns:
| Incident ID | Date/time detected | Pilot location | Channel (SMS/Calendar/Analytics/Admin) | Severity | Customer impact summary | Steps to reproduce | Expected behavior | Actual behavior | Suspected root cause | Temporary workaround | Owner notified? (Y/N) | Fix owner | Fix PR/commit link | Verification steps | Verified in prod? (Y/N) | Close date |

Fix verification checklist (must be completed before closing SEV-0/SEV-1)
1) Reproduced the issue on test data or sandbox.
2) Implemented fix with guardrails (input validation + safe fallback).
3) Confirmed opt-out/STOP behavior still works end-to-end.
4) Confirmed timezone handling for the pilot’s timezone.
5) Confirmed message threading: reply maps to correct appointment.
6) Confirmed analytics counters update correctly (no double counting).
7) Confirmed owner alert triggers if calendar API fails.

=================================================================
C) PILOT CLIENT EMAIL SEQUENCE (Day 0 + Day 3)
=================================================================
Use these to reduce churn during pilot, set expectations, and keep the operator loop tight.

EMAIL 1 — Day 0 Welcome + What to Expect (send after onboarding/config)
Subject: Your No-Show Reducer pilot is live — what happens next

Hi {{FirstName}},

We’re live for your 7-day pilot of Appointment No-Show Reducer.

What will happen starting today:
1) Customers will receive SMS reminders on the schedule we set ({{ReminderSchedule}}).
2) They can reply to confirm (“YES”), cancel (“NO”), or request a change (“RESCHEDULE”).
3) We’ll monitor replies daily and make sure confirmations/reschedules are captured correctly.

What we need from you (quick):
- If you notice any unusual customer reply or scheduling conflict, forward it to us at agent_bob_replit+no-show-bot@agentmail.to.
- If an urgent issue comes up, reply to this email and we’ll pause messages while we fix it.

Pilot reporting:
At the end of the week, you’ll receive a short value report summarizing confirmations, reschedules, waitlist fills (if enabled), and an estimate of recovered revenue.

For reference, our live product page is here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Thanks — we’ll take great care of the details.

— Bob
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to


EMAIL 2 — Day 3 Mid-Pilot Check-in (send on pilot Day 3)
Subject: Mid-pilot check-in + early results (Day 3)

Hi {{FirstName}},

Quick mid-pilot check-in.

So far (through {{Date}}):
- Reminders sent: {{RemindersSent}}
- Confirmations received: {{Confirmations}} ({{ConfirmationRate}})
- Reschedule requests handled: {{RescheduleRequests}}
- Reschedules completed: {{ReschedulesCompleted}}
- Any opt-outs: {{OptOutCount}}

Two quick questions:
1) Have you seen fewer “silent no-shows” this week compared to normal?
2) Any customer feedback on the reminder wording/timing?

If you want to see the product reference page again, it’s here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

As always, you can reach us at agent_bob_replit+no-show-bot@agentmail.to.

— Bob

=================================================================
How to use this pack in pilots
- Start using the Daily Tracker on Day 1 so the week-1 report is credible and numbers are auditable.
- Open an incident for every anomaly (even “minor”) during first 72 hours; pilots are where edge cases hide.
- Use the email sequence to keep the client engaged and to proactively capture qualitative feedback.
