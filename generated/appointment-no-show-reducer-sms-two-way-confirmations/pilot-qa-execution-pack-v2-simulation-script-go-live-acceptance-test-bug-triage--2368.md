# Pilot QA Execution Pack v2 (Simulation Script + Go-Live Acceptance Test + Bug Triage List + Client Consent Template)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:03:32.380Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (share with prospects/clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support/Contact: agent_bob_replit+no-show-bot@agentmail.to

1) INTERNAL QA SIMULATION SCRIPT (run before any live pilot)
Goal: validate reliability + message quality + safe failover. Run end-to-end using synthetic appointments and test phones.

Pre-req setup (10 min)
- Choose one test timezone (e.g., America/New_York) and one contrasting timezone (America/Los_Angeles).
- Create 6 synthetic appointments:
  A1: Tomorrow 10:00 (NY)
  A2: Tomorrow 10:30 (NY)
  A3: Today + 2 hours (NY)
  A4: Tomorrow 09:00 (LA)
  A5: Tomorrow 16:00 (LA)
  A6: DST edge case (if not available now, simulate by shifting appointment across 1-hour boundary and verifying displayed times)
- Ensure each appointment has: client name, phone, service type, location, and appointment value.
- Define reminder schedule for test: T-24h and T-2h (or whatever the pilot will use).

Simulation steps (record pass/fail for each)
S1 Timezone correctness
- Trigger reminder for A1 (NY). Expected: message states correct local time and date for NY.
- Trigger reminder for A4 (LA). Expected: message states correct local time and date for LA.
- Failure condition: reminder time is correct but displayed appointment time is wrong, or vice versa.

S2 Threading / conversation continuity
- Reply to A1 reminder from the client phone: “Yes”.
Expected: system marks confirmed; subsequent messages maintain the same thread/context; no duplicate confirmation prompts.

S3 High-confidence intent overrides (rule-based)
Send replies to A2 reminder in this exact order:
1) “YES” (all caps)
2) “y”
3) “confirm”
Expected: all are treated as CONFIRM, even if AI confidence is low.
Send replies to A3:
1) “no”
2) “can’t make it”
Expected: treated as NOT CONFIRMED / needs reschedule flow.

S4 Reschedule loop prevention
- Reply to A3 reminder: “reschedule” then “tomorrow at 3” then “actually 4pm”.
Expected: system offers available slots, updates appointment once, prevents infinite back-and-forth, and confirms final selection. If multiple attempts happen, system should respond with a bounded option set (“Here are 3 times… Reply 1/2/3”).

S5 Double-booking prevention
- Attempt to reschedule A3 into the exact time of A1.
Expected: system refuses and offers alternatives; no calendar write that creates overlap.

S6 Calendar write-back verification
- After confirming A1, verify calendar event status/notes reflect “Confirmed”.
- After rescheduling A3, verify old slot freed + new slot created/updated correctly.
Expected: only one active appointment instance; no duplicate events.

S7 Opt-out compliance (STOP) and HELP behavior
- Reply “STOP” to any reminder.
Expected: immediate opt-out confirmation, no further reminders. Store opt-out flag.
- Reply “HELP”.
Expected: returns brief help text with support email agent_bob_replit+no-show-bot@agentmail.to and instructions to stop.

S8 Failure alert + safe fallback (calendar API failure)
- Simulate calendar API failure (disconnect integration or use a mocked failure mode).
- Trigger a reschedule attempt.
Expected: system does NOT claim reschedule succeeded. It should:
  (a) tell client: “We’re having trouble updating the schedule right now—someone will confirm shortly.”
  (b) alert owner/operator via email/SMS (whatever configured) with appointment ID, client, requested time, error details.

S9 Quiet hours / business hours compliance
- Attempt to trigger a reminder outside business hours.
Expected: system defers to next allowed time, unless appointment is imminent and rules permit.

S10 Idempotency / duplicate send protection
- Trigger the same reminder job twice (or replay webhook).
Expected: only one message sent to client; second run is safely ignored or logged as duplicate.

Output: Save results as a dated QA log with pass/fail and screenshots (if possible). Any “fail” becomes a bug ticket in section 3.


2) GO-LIVE PILOT ACCEPTANCE TEST (20–30 minutes per location)
Run immediately after onboarding but before enabling full reminder volume.

A. Compliance + identity
[ ] Reminder message includes business name/location and does not misrepresent.
[ ] STOP opt-out works and is honored.
[ ] HELP response works and includes agent_bob_replit+no-show-bot@agentmail.to.

B. Time + timezone
[ ] Message shows correct local appointment time for this location.
[ ] Reminder timing aligns with agreed schedule (e.g., 24h/2h).

C. Two-way confirmation
[ ] Reply “YES” sets appointment to Confirmed and prevents further confirm nags.
[ ] Reply “NO” or “RESCHEDULE” routes to reschedule flow or flags staff follow-up.

D. Calendar integrity
[ ] Reschedule does not double-book.
[ ] Calendar event updates exactly once (no duplicates).

E. Fail-safes
[ ] If calendar update fails, client is told “pending confirmation” (not “confirmed”).
[ ] Owner/operator receives an alert with enough detail to act.

Go/No-Go rule: any failure in Compliance, Timezone, or Calendar Integrity = NO-GO until fixed.


3) PILOT BUG / EDGE-CASE TRIAGE LIST (prioritized)
Use severity rubric:
- SEV-0: Compliance/legal risk (STOP ignored), sends wrong business, sends outside consent.
- SEV-1: Revenue-impacting core failure (wrong time/timezone, double-booking, reschedule writes wrong slot).
- SEV-2: Degrades experience but workaround exists (threading oddities, unclear wording).
- SEV-3: Cosmetic/analytics-only.

Top expected issues to watch (with reproduction + fix verification)
B1 (SEV-0) STOP not honored
Repro: user replies STOP; system sends any further reminder.
Verify fix: opt-out flag stored; subsequent jobs skip; audit log shows suppression.

B2 (SEV-1) Timezone mismatch
Repro: create appointment in location tz; message displays server tz.
Verify fix: event time rendered in location tz; automated test covers 2 timezones.

B3 (SEV-1) Calendar duplicate events
Repro: reschedule creates a new event without cancelling/updating old.
Verify fix: only one event exists; old slot freed; idempotency key used.

B4 (SEV-1) Double-booking on reschedule
Repro: reschedule to an occupied slot; system allows.
Verify fix: availability check enforced; conflicts rejected.

B5 (SEV-2) Intent misclassification on short replies
Repro: “k”, “sure”, “yep”, “cant”, “nope”.
Verify fix: rule-based overrides cover high-confidence; unknown routes to clarification prompt.

B6 (SEV-2) Reschedule loop / too many questions
Repro: user changes mind 3 times; system continues indefinitely.
Verify fix: bounded-choice flow after N turns; offers staff callback after threshold.

B7 (SEV-2) Poor wording causes confusion
Repro: client asks “what’s the address?” and bot repeats confirmation prompt.
Verify fix: FAQ intents/quick replies OR route to staff with capture.

B8 (SEV-3) Analytics undercount due to missing event IDs
Repro: messages sent but not attributed to appointment.
Verify fix: require appointment_id in message metadata; backfill mapping.


4) CLIENT-FACING PILOT COMMUNICATION + CONSENT MICRO-TEMPLATE (paste-ready)
Subject: Appointment reminders + easy confirmations (pilot)

Hi {{OwnerName}},

As discussed, we’ll run a short free pilot of our Appointment No-Show Reducer to reduce no-shows by sending smart SMS reminders and collecting two-way confirmations/reschedule requests.

What your clients will see (example wording):
“Hi {{ClientName}}—this is a reminder of your appointment at {{BusinessName}} on {{Date}} at {{Time}}. Reply YES to confirm, NO if you can’t make it, or RESCHEDULE to change the time. Reply STOP to opt out.”

Consent/opt-out:
- Only clients who have provided a mobile number for appointment communication will be messaged.
- Every message includes STOP to opt out. Opt-outs are honored immediately.
- If anyone replies HELP, they’ll receive basic instructions and our support contact.

If you ever want to pause the pilot, reply to this email and we’ll disable messaging within the same business day.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

— Bob
Appointment No-Show Reducer
