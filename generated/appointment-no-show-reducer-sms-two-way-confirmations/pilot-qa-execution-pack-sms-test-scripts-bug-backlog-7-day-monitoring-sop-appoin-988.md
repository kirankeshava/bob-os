# Pilot QA Execution Pack: SMS Test Scripts + Bug Backlog + 7-Day Monitoring SOP (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:07:29.299Z

---

This document is the pilot-ready QA execution pack for the Appointment No-Show Reducer (SMS + two-way confirmations). It is designed to catch edge cases quickly in a concierge pilot and to produce clean, comparable metrics for sales proof. Legitimacy URL to share with pilot prospects/clients: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. Support email: agent_bob_replit+no-show-bot@agentmail.to.

A) Copy/Paste QA SMS Test Script Pack (run in staging or with a test phone number)
For each test: record (1) appointment timezone, (2) scheduled time, (3) when reminders are configured to send, (4) message thread ID, (5) observed system action.

1) Confirmation — simple YES
- Outbound reminder (T-24h): “Reply YES to confirm, NO to cancel, or R to reschedule.”
- Patient reply: “YES”
- Expected: appointment status = Confirmed; confirmation timestamp saved; no further confirmation prompts; optional “Thanks, you’re confirmed” reply.

2) Confirmation — noisy YES
- Reply: “Yep I’ll be there” / “Y” / “Sure”
- Expected: classify as CONFIRM with high confidence (rule-based overrides); mark confirmed; respond accordingly.

3) Cancellation — NO
- Reply: “NO” / “Can’t make it”
- Expected: classify as CANCEL; cancel or mark as cancelled-pending (based on business rule); trigger owner notification if policy requires manual approval; optionally offer reschedule link.

4) Reschedule — keyword
- Reply: “reschedule” / “R” / “different time”
- Expected: classify as RESCHEDULE; send next-step prompt (e.g., “What day/time works?”) or provide reschedule link; ensure old slot is released only when reschedule is confirmed (double-book prevention).

5) Ambiguous reply — low confidence
- Reply: “maybe” / “not sure”
- Expected: do NOT auto-cancel; respond with clarification (“Please reply YES to confirm, NO to cancel, or R to reschedule.”); log as LowConfidenceReply; if second ambiguous reply, escalate to owner.

6) STOP compliance
- Reply: “STOP” / “unsubscribe” / “cancel texts”
- Expected: immediate opt-out; confirmation message (“You’re opted out…”); suppress all future messages; log opt-out event with timestamp.

7) HELP compliance
- Reply: “HELP”
- Expected: return help text with business name/contact and support email agent_bob_replit+no-show-bot@agentmail.to; do not change appointment state.

8) Threading integrity
- Patient replies to an older reminder (e.g., T-24h) after T-2h reminder has already been sent.
- Expected: reply still maps to the correct upcoming appointment; no duplicate confirmations; no state flip-flopping.

9) Multiple patients share a phone number
- Two appointments exist for the same number different names.
- Patient replies “YES”.
- Expected: system requests disambiguation (“Reply 1 for Alex 2pm, 2 for Sam 3pm”) OR routes to owner; must not confirm/cancel both.

10) Timezone/DST correctness
- Appointment in a different timezone than business default.
- Expected: reminders send at correct local time; message displays correct local appointment time; no off-by-one-hour during DST transitions.

11) Calendar sync failure fail-safe
- Simulate calendar API outage on status update.
- Expected: message flow does not silently fail; owner alert is generated with appointment identifiers; system retries with backoff; incident logged.

12) Reschedule loop protection
- Patient: “reschedule” → system asks for times → patient replies vague → repeated.
- Expected: after N turns (e.g., 3), escalate to owner with transcript; stop spamming patient.

B) Pilot Bug List + Fix/Mitigation Backlog Template (paste into a sheet)
Columns:
- Bug ID
- Date/Time detected
- Location (pilot site)
- Environment (staging/prod)
- Severity (S0 Critical / S1 High / S2 Medium / S3 Low)
- Category (Timezone/DST, Threading, Opt-out, Calendar Sync, Double-booking, Analytics, Messaging Tone, Other)
- Summary
- Reproduction steps (numbered)
- Expected result
- Actual result
- Impact (appointments affected / compliance risk)
- Workaround/Mitigation (immediate)
- Owner alert required? (Y/N) + alert content sent
- Fix owner (eng)
- Verification steps
- Status (Open/In progress/Fixed/Verified)

Severity guidance:
- S0 Critical: opt-out not honored; wrong appointment updated; messages sent at wrong day/time; double-booking created; failures without owner alert.
- S1 High: threading breaks causing wrong state; frequent misclassification (YES marked as NO); calendar updates delayed.
- S2 Medium: message copy confusing; edge-case misroutes requiring manual cleanup.
- S3 Low: cosmetic copy; minor analytics mismatch not affecting operations.

C) 7-Day Pilot Monitoring SOP (concierge operations)
Goal: ensure reliability and capture measurable outcomes daily.

Daily (Mon–Sun) checks (10–15 minutes per location):
1) Delivery health: confirm last 24h reminders were sent; check for spikes in failures; if failures >2% or any carrier rejection pattern, open S1 incident.
2) Reply processing: sample 10 recent replies; verify correct intent classification; log any misclassifications with transcript; add rule-based override keywords if repeated.
3) Opt-out audit: confirm STOP requests are logged and suppressed; any violation is S0.
4) Calendar update audit: verify last 10 confirmations/reschedules/cancels reflected in calendar/customer system; if API failure occurred, confirm owner was alerted.
5) Timezone sanity: confirm today’s first reminder send time matches business timezone; during DST weeks, do an extra check.
6) Waitlist (if enabled): verify any openings generated a waitlist offer; confirm acceptance logic doesn’t double-book.
7) Incident log update: document issues, mitigations, and whether client/owner was notified.

Alert thresholds (trigger owner notification + incident):
- Any STOP not honored within 1 minute (S0)
- Any wrong appointment updated (S0)
- Calendar sync failures affecting >=3 appointments/day or any failure without alert (S0/S1)
- Misclassification rate observed >5% in sampled replies (S1)
- Reminder send failure rate >2% over 24h (S1)

D) Baseline Metrics Capture Questionnaire (collect before go-live)
Ask the owner/manager to reply to this email with answers (or fill during kickoff call):
1) Location name + address + primary timezone
2) Appointment types included in pilot (e.g., consults, cleanings, haircuts)
3) Avg appointments per week (last 4 weeks)
4) No-show rate % (last 4 weeks) OR counts (no-shows / total)
5) Average revenue per kept appointment ($)
6) Current reminder process (none / manual calls / one-way SMS / email)
7) Current cancellation window and any fees
8) Preferred reminder schedule (e.g., 48h + 24h + 2h) and quiet hours
9) Reschedule policy: do we offer link, or collect preferred times via SMS?
10) Waitlist available? (Y/N) If yes, how many contacts typically on waitlist?
11) Escalation contact for edge cases (name + phone/email)

This QA execution pack is intended to be run before and during the first week of each pilot. It standardizes how we detect reliability issues, ensures compliance (STOP/HELP), prevents double-booking, and produces defensible baseline vs. pilot metrics for weekly value reporting.