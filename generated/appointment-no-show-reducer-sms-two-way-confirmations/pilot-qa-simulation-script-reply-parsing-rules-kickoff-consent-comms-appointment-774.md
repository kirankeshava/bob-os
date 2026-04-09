# Pilot QA Simulation Script + Reply Parsing Rules + Kickoff/Consent Comms (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:19:36.712Z

---

Business legitimacy URL (share with clients): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/Contact: agent_bob_replit+no-show-bot@agentmail.to

=================================================================
A) 48-HOUR INTERNAL QA SIMULATION SCRIPT (EXECUTABLE)
Purpose: Catch high-risk edge cases before any live pilot. Run as a desk-check first, then in staging/sandbox with real message threading.

How to run:
1) Create 12 synthetic appointments across: same-day, next-day, weekend, DST boundary, and multi-provider.
2) For each case below, send the “Inbound SMS” exactly as written (from the simulated patient number) and confirm the system behavior matches “Expected Outcome”.
3) Log defects using the Defect Template (Section D) with screenshots, timestamps, and full message thread.

Test Case 1 — Basic confirmation
- Setup: Appointment Tue 10:00 AM local time; reminder at T-24h.
- Outbound reminder (system): “Reminder: you have an appointment with {Business} on Tue at 10:00 AM. Reply YES to confirm, NO to cancel, or RESCHEDULE to change.”
- Inbound SMS: “YES”
- Expected outcome:
  - Appointment marked Confirmed.
  - No further confirmation prompts.
  - Analytics: confirmation_count +1; confirmation_rate updated.
  - Threading: subsequent messages stay in same thread.

Test Case 2 — Lowercase + punctuation confirmation
- Inbound SMS: “yes!”
- Expected outcome: Same as Test Case 1.

Test Case 3 — Explicit cancel
- Inbound SMS: “NO”
- Expected outcome:
  - Appointment marked Canceled (or “pending cancel” if policy requires staff approval).
  - Offer: “Okay—your appointment is canceled. Reply RESCHEDULE if you’d like a new time.”
  - Analytics: cancel_count +1.

Test Case 4 — Reschedule intent (keyword)
- Inbound SMS: “RESCHEDULE”
- Expected outcome:
  - System replies with either (a) available slots list, or (b) concierge handoff message depending on pilot mode.
  - If slots are offered: selecting slot updates calendar and sends confirmation.
  - Analytics: reschedule_attempt +1.

Test Case 5 — Natural language reschedule
- Inbound SMS: “Can we do Thursday afternoon instead?”
- Expected outcome:
  - Intent detected as RESCHEDULE.
  - If rule-based confidence < threshold: ask clarifying question: “Sure—what time range works (e.g., 1–3pm)?” OR handoff to staff.
  - No calendar mutation until confirmed.

Test Case 6 — Ambiguous reply
- Inbound SMS: “maybe”
- Expected outcome:
  - System does not confirm/cancel.
  - Sends clarification: “No problem—reply YES to confirm, NO to cancel, or RESCHEDULE to change.”
  - Analytics: ambiguous_reply_count +1.

Test Case 7 — STOP compliance (hard requirement)
- Inbound SMS: “STOP”
- Expected outcome:
  - Opt-out is immediate.
  - System sends compliant confirmation: “You’re opted out and will no longer receive messages.”
  - No further messages to this number.
  - Analytics: opt_out_count +1.

Test Case 8 — HELP compliance
- Inbound SMS: “HELP”
- Expected outcome:
  - System replies with: business name, support email (agent_bob_replit+no-show-bot@agentmail.to), and opt-out instructions.
  - No state change to appointment.

Test Case 9 — Threading with multiple appointments (same patient)
- Setup: Two appointments for same phone number (e.g., dental cleaning + follow-up).
- Inbound SMS after reminder: “YES”
- Expected outcome:
  - If only one appointment is within next 72h, confirm that one.
  - If two are within same window, system asks: “Which appointment are you confirming: Tue 10am or Wed 2pm?”
  - Prevents confirming wrong appointment.

Test Case 10 — Double-booking prevention
- Setup: Patient attempts to reschedule into a slot already taken.
- Inbound SMS: “Move me to Tue 10am” (slot is booked)
- Expected outcome:
  - System refuses and offers alternatives.
  - No calendar overwrite.
  - Defect if any overwrite occurs.

Test Case 11 — Timezone/DST correctness
- Setup: Business timezone differs from server timezone; include a DST transition week.
- Expected outcome:
  - Reminder send time matches business local time.
  - Displayed appointment time matches what’s on calendar for that timezone.
  - No off-by-one-hour errors.

Test Case 12 — Calendar API failure fail-safe
- Setup: Simulate calendar write failure during reschedule.
- Inbound SMS: “RESCHEDULE” then select a slot.
- Expected outcome:
  - System does NOT claim booking succeeded.
  - Sends: “We’re having trouble updating the schedule right now—someone will confirm shortly.”
  - Owner/staff alert is triggered (email or dashboard alert) with patient name/number, requested slot, and error detail.
  - Incident logged as P0 if silent failure.

Pass/Fail Gate (must pass before live pilot):
- STOP/HELP compliance passes (Test 7–8)
- No wrong-appointment confirmations (Test 9)
- No overwrites/double-booking (Test 10)
- Timezone/DST correct on at least 3 varied scenarios (Test 11)
- Calendar failure produces an owner alert and safe customer message (Test 12)

=================================================================
B) RULE-BASED SMS REPLY PARSING MATRIX (OVERRIDES)
Goal: Reduce reliance on AI for high-stakes intents. Apply these rules BEFORE any LLM call.

Precedence (highest to lowest):
1) STOP/UNSUBSCRIBE intent
2) HELP intent
3) CONFIRM intent
4) CANCEL intent
5) RESCHEDULE intent
6) WAITLIST/“fill gap” intent
7) Anything else => ambiguous

Normalization:
- Trim whitespace, lowercase, remove surrounding punctuation.
- Keep original message for audit logging.

High-confidence patterns (examples; implement as regex/contains):
1) OPT-OUT (immediate)
- Keywords: stop, unsubscribe, cancel texts, end, quit
- Regex example: /\b(stop|unsubscribe|end|quit|cancel\s*texts?)\b/
- Action: set opted_out=true; send opt-out confirmation; suppress future messages.

2) HELP
- Keywords: help, support
- Regex: /\b(help|support)\b/
- Action: send help response containing business name, support email agent_bob_replit+no-show-bot@agentmail.to, and “Reply STOP to opt out.”

3) CONFIRM
- Keywords: yes, y, yep, yeah, confirm, confirmed, ok, okay
- Regex: /\b(yes|yep|yeah|y|confirm|confirmed|ok|okay)\b/
- Guardrail: if multiple upcoming appointments within window => ask which one.

4) CANCEL
- Keywords: no, n, cancel, can’t make it, cannot make it
- Regex: /\b(no|n|cancel|can\x27t\s*make\s*it|cannot\s*make\s*it)\b/
- Guardrail: if policy requires staff confirmation, set state “cancel_requested” and notify staff.

5) RESCHEDULE
- Keywords: reschedule, change, move, different time, another time
- Regex: /\b(reschedule|change|move|different\s*time|another\s*time)\b/
- Guardrail: never write calendar until slot selection confirmed.

6) WAITLIST
- Keywords: waitlist, earlier, sooner, if anything opens
- Regex: /\b(waitlist|sooner|earlier|if\s*anything\s*opens)\b/
- Action: add to waitlist preferences; confirm receipt.

Ambiguity handling:
- If message contains both confirm and reschedule keywords (e.g., “yes but can we reschedule?”), treat as RESCHEDULE.
- If message contains profanity/irrelevant content, reply once with clarification and then stop after 1 follow-up to avoid loops.
- After 2 ambiguous replies, escalate to staff/owner alert.

Audit fields to log per inbound:
- raw_text, normalized_text, matched_rule, confidence=1.0 (rules), appointment_id resolved?, action_taken, timestamp, thread_id.

=================================================================
C) CLIENT-FACING PILOT KICKOFF + CONSENT/OPT-IN EMAIL (READY TO SEND)
Subject: Quick kickoff for your no-show reduction pilot (consent + setup)

Hi {FirstName},

Thanks for agreeing to run a short pilot of our Appointment No-Show Reducer (SMS reminders + two-way confirmations).

Legitimacy/overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

To launch safely and stay compliant, please reply to confirm:
1) Your business timezone and hours of operation.
2) Your reminder schedule preference (common default: 24h before + 2h before).
3) Your consent approach:
   - You confirm you only message clients/patients who have provided consent to receive appointment-related SMS, and you will honor STOP/opt-out immediately.
4) If a client texts STOP, we will opt them out and they will no longer receive messages.

Optional (improves results):
- Average appointment value ($)
- Your current estimated no-show rate (%)
- Whether you want a waitlist (we can message people who asked for earlier slots when cancellations happen)

Once I have the items above, we can go live in 24 hours and you’ll receive a simple weekly value report showing confirmations, saves from reschedules, waitlist fills, and estimated recovered revenue.

Best,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

=================================================================
D) DEFECT / INCIDENT TEMPLATE (FOR PILOT + QA)
ID:
Date/Time (local + UTC):
Environment (staging/live):
Business/location:
Severity: P0 (data loss/compliance), P1 (core flow broken), P2 (degraded), P3 (cosmetic)
Summary:
Steps to reproduce:
Expected result:
Actual result:
Message thread transcript (copy/paste):
Appointment IDs affected:
Calendar provider/API response (if available):
Immediate mitigation (what we did now):
Owner/client impact:
Fix owner:
Fix deployed (Y/N) + date:
Verification steps + result:

=================================================================
E) DAY-0 PATIENT/CLIENT SMS (IF NEEDED FOR TRANSPARENCY)
“{Business}: We’ll text appointment reminders and let you confirm by replying YES. Reply STOP to opt out at any time.”
