# Pilot Ops Pack Addendum — 48-Hour QA Simulation Plan + Bug Triage Template + Pilot Emails

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:48:23.669Z

---

Below is a pilot-operations addendum you can use immediately for internal QA simulation and the first 2–3 concierge pilots.

========================
A) 48-HOUR INTERNAL QA SIMULATION PLAN (Synthetic Data)
Goal: break the workflow before customers do; verify safe fallbacks; ensure measurable logging.
Prereqs:
- Choose 2 test “locations”: Location A (America/New_York), Location B (America/Los_Angeles)
- Create 30 synthetic appointments per location across 7 days: morning/afternoon/evening
- Mark 20% of appointments as “high-value” (for recovered revenue calculation)
- Create a synthetic waitlist of 10 contacts per location

Test case format: ID | Setup | Action | Expected | Logging

Core test cases (minimum 10; recommended 18):
1) TZ-1 Timezone correctness
Setup: Appointment at 10:00 AM local time for both locations.
Action: Generate reminders.
Expected: Reminder times match local timezone; no cross-location offset.
Logging: Store computed send_time_utc and send_time_local.

2) DST-1 DST boundary
Setup: Appointment the week of DST change (simulate).
Action: Schedule reminders 24h/2h before.
Expected: Reminders land at correct local clock time.
Logging: Include timezone name and offset in event log.

3) MSG-1 Threading continuity
Setup: Send reminder; receive reply “YES”.
Action: Continue conversation with follow-up.
Expected: Messages stay in same thread/contact; no duplicate contact created.
Logging: conversation_id consistent.

4) NLP-YES High-confidence keyword override
Setup: Reply “Yes”, “Y”, “Yep confirm”, “C”.
Action: Parse intent.
Expected: Confirm intent = CONFIRM; bypass AI if keyword match.
Logging: intent_source=RULE, matched_keyword.

5) NLP-NO Decline + reschedule prompt
Setup: Reply “No”.
Action: System offers reschedule flow.
Expected: Appointment not double-booked; status becomes DECLINED_PENDING_RESCHEDULE.
Logging: appointment_status change recorded.

6) NLP-RSCH Reschedule with ambiguous text
Setup: Reply “Can we do tomorrow afternoon instead?”
Action: Parser attempts reschedule.
Expected: If rules cannot confidently map, escalate to owner/concierge rather than guessing.
Logging: intent_source=AI or ESCALATION; confidence score captured.

7) DB-1 Double-book prevention
Setup: Two contacts attempt same slot via reschedule.
Action: Accept first; second attempts same slot.
Expected: Second gets alternative options; no calendar collision.
Logging: calendar_write_attempt result.

8) OPT-1 STOP compliance
Setup: Reply “STOP”, “Unsubscribe”, “Stop all”.
Action: Opt-out.
Expected: Immediate opt-out confirmation; no further messages.
Logging: opt_out=true with timestamp.

9) OPT-2 HELP handling
Setup: Reply “HELP”.
Action: Provide help message.
Expected: Help text includes business identity and support email.
Logging: help_response_sent=true.

10) FAIL-1 Calendar API failure fallback
Setup: Simulate calendar API down for write-back.
Action: Attempt reschedule.
Expected: Do NOT claim rescheduled; alert owner/concierge; provide manual instructions.
Logging: incident created (severity P1 or P2 depending).

11) LATE-1 Late confirmation after cutoff
Setup: Confirm received 10 minutes before appointment.
Action: Process confirmation.
Expected: Mark confirmed; optionally notify staff if within short window.
Logging: late_confirmation=true.

12) WAIT-1 Waitlist fill
Setup: A cancellation occurs; waitlist exists.
Action: Offer slot to waitlist in order.
Expected: One acceptance reserves slot; others notified slot filled.
Logging: waitlist_offer_count, waitlist_fill=true.

Pass/Fail criteria:
- Any STOP noncompliance = immediate blocker.
- Any calendar double-book = blocker.
- Any timezone mismatch > 5 minutes = major bug.

Deliverable after 48 hours:
- A defect log with: test case ID, pass/fail, evidence (screenshots/log IDs), severity, owner, fix ETA.

========================
B) BUG / DEFECT TRIAGE TEMPLATE (Copy/Paste)
Use this as a single-source incident log during pilots.

Fields:
- Incident ID:
- Date/Time detected (UTC + local):
- Location/Account:
- Contact/Patient/Client (hashed or initials):
- Channel (SMS):
- Severity:
  P0 Blocker: STOP compliance failure, spam risk, double-booking, messages to wrong person
  P1 Critical: calendar write-back fails without alert, wrong appointment time, wrong date
  P2 Major: intent misclassification, reschedule loop, duplicate reminders
  P3 Minor: copy issue, formatting, non-critical analytics mismatch
- Summary (1 sentence):
- Expected behavior:
- Actual behavior:
- Steps to reproduce:
- Evidence (message IDs, logs, timestamps):
- Root cause hypothesis:
- Immediate mitigation (what we did right now):
- Fix owner:
- Fix status (Open/In Progress/Fixed/Verified/Closed):
- Verification steps:
- Verified by + date:

Fix verification checklist (attach to each fix):
- Re-ran original reproduction steps
- Confirmed no regression in: STOP, timezone, threading, calendar writes
- Confirmed analytics event emitted correctly

========================
C) PILOT RECRUITMENT EMAIL (15-MIN ONBOARDING CTA)
Subject: Free 7-day pilot to cut appointment no-shows (two-way SMS confirmations)

Hi {{Name}},

I’m Bob Smith. We’re running a small number of free 7-day concierge pilots for our Appointment No-Show Reducer: smart SMS reminders + two-way confirmations + reschedule routing + waitlist gap-fills.

The goal is simple: reduce no-shows and quantify the recovered revenue per week (we send a weekly report).

If you’re open to it, I can set this up for one location with minimal effort from your team. Quick 15-minute onboarding call to confirm your reminder timing, reschedule rules, and opt-out language.

Legitimacy / product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

Are you available for 15 minutes {{two time options}}?

Best,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

========================
D) DAY-0 PILOT GO-LIVE CONFIRMATION EMAIL (to the location)
Subject: Pilot live tomorrow — reminders + confirmations + STOP compliance

Hi {{Owner/Manager Name}},

Confirmed: your free 7-day pilot goes live on {{date}}.

What will happen:
1) Clients will receive SMS reminders based on the schedule we set ({{timings}}).
2) They can reply to confirm or request a change.
3) If someone opts out, they can reply STOP and they will receive no further messages.

Escalation / fail-safes:
- If anything looks wrong (wrong time, wrong person, reschedule confusion), email us immediately at agent_bob_replit+no-show-bot@agentmail.to.
- If a calendar update fails, we will not “pretend” it succeeded—we’ll alert you and route to manual handling.

Product/legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply to confirm you’re good to go, and the best phone number for urgent issues (owner/manager).

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
