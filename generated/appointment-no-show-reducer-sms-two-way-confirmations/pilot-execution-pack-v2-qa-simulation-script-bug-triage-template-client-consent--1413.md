# Pilot Execution Pack v2 — QA Simulation Script + Bug Triage Template + Client Consent Email (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:12:47.697Z

---

Below is a pilot-ready execution pack you can use immediately for internal QA simulation and for the first 2–3 concierge pilots.

==============================
A) INTERNAL QA SIMULATION SCRIPT (SYNTHETIC DATA)
==============================
Goal: Prove reliability and catch edge cases before/while pilots run. Record each test as PASS/FAIL with notes.

Pre-reqs (fill in):
- Pilot location name: __________________________
- Location timezone (IANA): ______________________ (e.g., America/Los_Angeles)
- Business hours: ________________________________
- Reminder schedule: _____________________________ (e.g., 24h + 2h before)
- Reschedule rule: _______________________________ (e.g., offer next 5 slots within 7 days)
- Waitlist enabled? Y/N  | Waitlist size target: ___
- Owner escalation contact (email/phone): _________
- Support email: agent_bob_replit+no-show-bot@agentmail.to
- Legitimacy URL to share if asked: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Test Data Setup (create 12 synthetic appointments):
1) Create 4 appointments tomorrow in the morning (2 new clients, 2 existing).
2) Create 4 appointments 7 days out (mix durations).
3) Create 2 appointments straddling DST change (if applicable in your TZ, choose the next DST boundary; otherwise simulate by temporarily switching timezone).
4) Create 2 overlapping appointments intentionally (to test double-booking prevention).

Core Tests:
T1 — Timezone correctness
- Action: Schedule an appointment at 10:00 local time.
- Expect: All reminder timestamps match local business timezone; message copy references correct time.
- Fail-safes: If timezone unknown, system should default to configured location timezone and log a warning.

T2 — Reminder send timing
- Action: Force-run reminders (or wait for schedule) for 24h and 2h reminders.
- Expect: Exactly one message per configured reminder step; no duplicate sends.

T3 — YES confirmation (high-confidence keyword)
- Action: Reply “YES”.
- Expect: Appointment marked confirmed; confirmation acknowledged in-thread; analytics increments confirmations.

T4 — NO / cancel intent
- Action: Reply “NO”.
- Expect: Appointment marked unconfirmed/cancel requested; workflow offers reschedule or cancellation path; owner notified if configured.

T5 — RESCHEDULE intent
- Action: Reply “RESCHEDULE”.
- Expect: System offers next available options; selection updates calendar; old slot released; analytics increments reschedules.

T6 — Natural language reschedule
- Action: Reply “Can we do Thursday afternoon instead?”
- Expect: Intent classified as reschedule; options offered; if ambiguity remains, ask a single clarifying question (not a loop).

T7 — Late confirmation
- Action: Reply “YES” after appointment start time.
- Expect: System responds with a safe message (e.g., “Looks like your appointment time has passed—reply RESCHEDULE to find a new time.”). No calendar edits.

T8 — Double-booking prevention
- Action: Attempt to reschedule into a slot that’s already booked (use the intentional overlap).
- Expect: System refuses that slot and offers alternatives. No duplicate bookings.

T9 — Threading / multiple appointments per patient
- Action: Use one phone number with two upcoming appointments; reply “YES”.
- Expect: System asks “Which appointment are you confirming?” with options; does not confirm the wrong one.

T10 — STOP opt-out compliance
- Action: Reply “STOP”.
- Expect: Opt-out immediately; confirmation of opt-out sent; no further messages sent; logged for compliance.

T11 — HELP handling
- Action: Reply “HELP”.
- Expect: Provide simple instructions + support email agent_bob_replit+no-show-bot@agentmail.to; do not expose internal jargon.

T12 — Calendar API failure fail-safe
- Action: Simulate calendar write failure (disconnect integration or force error mode if available).
- Expect: System does NOT silently fail. It alerts owner (“Calendar update failed; please confirm manually”) and logs incident with appointment ID, timestamp, and attempted action.

T13 — Waitlist fill
- Action: Cancel a prime slot; ensure waitlist has at least 3 contacts.
- Expect: System offers the slot to waitlist in order; stops once accepted; analytics increments waitlist_fills.

T14 — Message quality / tone QA
- Action: Review 10 message samples.
- Expect: Short, polite, no spam tone; includes business name; includes STOP language where required.

Test Result Logging (copy/paste per test):
- Test ID:
- Date/time run:
- Input:
- Expected:
- Actual:
- PASS/FAIL:
- Notes:
- Screenshot/record link (if any):

==============================
B) BUG/DEFECT TRIAGE TEMPLATE (COPY-PASTE)
==============================
Use this as a Notion/Sheet/Jira-equivalent table.

Columns:
- Bug ID (NSR-001…)
- Date found
- Found by
- Pilot location
- Severity (S0/S1/S2/S3)
  - S0 = Compliance/data loss (STOP not honored, wrong person messaged, PII leak)
  - S1 = Revenue-impacting (missed reminders, wrong confirmation state, double-book)
  - S2 = Degraded experience (confusing copy, slow responses, minor analytics mismatch)
  - S3 = Cosmetic/edge (typos, formatting)
- Component (SMS, Intent Parsing, Calendar, Waitlist, Analytics, Reporting)
- Steps to reproduce
- Expected result
- Actual result
- Logs/IDs (message SID, appointment ID, user phone hash)
- Workaround (if any)
- Owner
- Status (New / In progress / Needs info / Fixed / Verified / Won’t fix)
- Fix commit/link
- Verification steps
- Verified by + date

Definition of Done for a Fix:
1) Repro case passes in QA simulation script.
2) No regression in STOP/HELP compliance.
3) Analytics counters update correctly (if applicable).
4) If calendar write involved, verify read-after-write matches.

==============================
C) CLIENT CONSENT + PILOT ACCEPTANCE EMAIL (READY TO SEND)
==============================
Subject: Pilot Confirmation — Two-way SMS reminders + opt-out + escalation contacts

Hi {{OwnerName}},

Thanks for agreeing to the Appointment No-Show Reducer pilot. This email confirms what we’re enabling and the safeguards we’ll use during the pilot.

What we’ll run during the pilot
- SMS appointment reminders (timing: {{ReminderTiming}})
- Two-way confirmations (clients can reply YES to confirm)
- Reschedule automation (clients can reply RESCHEDULE; we’ll offer available times based on your rules)
- Optional waitlist gap-fill (if enabled)
- Weekly results report (confirmations, reschedules, waitlist fills, and estimated recovered revenue)

Opt-in / opt-out and compliance
- Clients can reply STOP at any time to opt out of texts.
- Clients can reply HELP for assistance. We’ll direct them to agent_bob_replit+no-show-bot@agentmail.to.
- You confirm you have permission to contact your clients for appointment-related reminders (transactional messaging).

Fail-safes (important)
- If a calendar update fails (integration issue), we will NOT silently proceed. We’ll alert you immediately and provide the appointment details so you can handle it manually.
- If a reply is ambiguous (e.g., multiple upcoming appointments), we’ll ask one clarifying question instead of guessing.

Escalation contacts
- Best contact for urgent issues (name/phone): {{EscalationPhone}}
- Best contact for non-urgent issues (email): {{EscalationEmail}}

If you’d like to share legitimacy details internally, here’s our live page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply “I CONFIRM” to approve the pilot configuration above, and we’ll schedule go-live for {{GoLiveDate}}.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
