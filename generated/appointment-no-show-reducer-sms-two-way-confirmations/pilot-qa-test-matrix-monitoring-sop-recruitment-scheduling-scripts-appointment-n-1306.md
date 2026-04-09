# Pilot QA Test Matrix + Monitoring SOP + Recruitment/Scheduling Scripts (Appointment No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:46:35.528Z

---

Business: Appointment No-Show Reducer (SMS + Two-Way Confirmations)
Legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Support/Contact: agent_bob_replit+no-show-bot@agentmail.to

==============================
A) PILOT QA TEST MATRIX (EXECUTION-GRADE)
==============================
How to use: For each pilot location, run P0 tests before go-live, then P1 tests in the first 48 hours. Log results with timestamp, tester, and evidence (screenshots/SMS transcripts).

TEST RECORD FIELDS
- Test ID / Priority (P0/P1/P2)
- Preconditions
- Input data (appointment time, timezone, customer phone)
- Steps
- Expected outcome
- Actual outcome
- Pass/Fail
- Notes / SMS transcript

P0-01 Timezone correctness (business timezone)
Preconditions: Business timezone set (e.g., America/Los_Angeles). Appointment created at 10:00 AM local.
Steps: Trigger reminder schedule (e.g., 24h + 2h before). Observe send timestamps.
Expected: Messages send at correct local offsets (e.g., 24h and 2h prior in business timezone), not server timezone.
Fail-safes: If timezone missing, system blocks go-live and alerts owner.

P0-02 DST boundary behavior
Preconditions: Create appointments around DST transition date/time (one before, one after).
Steps: Schedule reminders; verify offsets.
Expected: Reminder offset remains correct relative to local appointment time; no duplicate or skipped reminders.

P0-03 Consent/opt-in present and logged
Preconditions: Pilot location confirms they have consent to text customers (or uses approved intake language).
Steps: Send kickoff consent message to internal test number and store consent.
Expected: Consent recorded; outbound reminders only to consented contacts.

P0-04 STOP opt-out compliance
Steps: Reply STOP to any reminder.
Expected: Immediate confirmation of opt-out (or silent suppression per policy), contact flagged DNC, no future messages.
Edge: Variants: STOP, Stop, UNSUBSCRIBE, CANCEL, END.

P0-05 HELP handling
Steps: Reply HELP.
Expected: Returns support instructions including support email agent_bob_replit+no-show-bot@agentmail.to.

P0-06 Threading and state (YES)
Steps: Customer replies YES to reminder.
Expected: Appointment marked confirmed; no additional “please confirm” prompts; analytics increments confirmations.
Keyword override: YES/Y/CONFIRM/OK/OKAY.

P0-07 Threading and state (NO)
Steps: Customer replies NO.
Expected: System asks if they want to reschedule/cancel; appointment marked “needs reschedule” (not confirmed).
Keyword override: NO/N/CAN’T/CANNOT.

P0-08 Reschedule intent loop protection
Steps: Customer replies “reschedule” then provides multiple times (“tomorrow 3”, “actually next week”).
Expected: System maintains a single reschedule thread; does not create multiple tentative appointments; asks clarifying question if ambiguous.
Fail condition: Multiple new events created.

P0-09 Double-booking prevention
Preconditions: Slot A exists 2:00–2:30.
Steps: Attempt reschedule into 2:15.
Expected: System rejects/conflicts and offers nearest available times; never confirms overlapping slot.

P0-10 Calendar update correctness (create/update/cancel)
Steps: (1) Confirm appointment (2) Reschedule appointment (3) Cancel appointment.
Expected: Calendar event status updates accurately; customer receives correct new time; analytics increments reschedules/cancellations.

P0-11 Calendar API failure fail-safe
Preconditions: Simulate calendar API error/timeout.
Steps: Attempt reschedule.
Expected: Customer is told “We’re having trouble updating the schedule; staff will confirm shortly.” System alerts owner immediately (email/SMS) with context; does not promise a time.

P0-12 SMS delivery failure fail-safe
Preconditions: Use invalid number or simulate provider error.
Steps: Send reminder.
Expected: Error logged; owner alerted if failure rate exceeds threshold; contact suppressed until fixed.

P0-13 Quiet hours / business hours
Preconditions: Business hours set.
Steps: Create appointment that would trigger reminder at 6am.
Expected: Reminder is delayed to next allowed time window and still preserves meaningful notice.

P0-14 Waitlist gap-fill (single opening)
Preconditions: Waitlist has 3 people with preferences.
Steps: Cancellation occurs; system messages waitlist sequentially.
Expected: Offers slot to best match first; if no response in X minutes, next; once accepted, stops outreach.

P1-01 Natural language YES variants
Inputs: “Yep”, “sounds good”, “I’ll be there”, “see you then”.
Expected: Classified as confirm with high confidence; rule-based overrides for clear positives; otherwise ask one clarification.

P1-02 Natural language NO/Reschedule variants
Inputs: “can’t make it”, “running late”, “move it to Friday”, “need to change”.
Expected: Reschedule flow; if “running late” route to late policy message.

P1-03 Ambiguous reply
Input: “maybe” / “not sure”.
Expected: Ask a single clarifying question: “Please reply YES to confirm or RESCHEDULE to change.” No repeated nagging.

P1-04 Multi-language STOP
Input: “alto”, “parar”, “detener”.
Expected: If not supported, at minimum route to manual review and suppress future until reviewed. (Mark as known limitation if needed.)

P1-05 Duplicate reminders prevention
Preconditions: Appointment edited multiple times.
Steps: Update appointment 3x.
Expected: Only one reminder schedule active per appointment; old schedules cancelled.

P2-01 Analytics reconciliation
Steps: Compare counts (appointments, confirmed, rescheduled, cancelled) vs. calendar ground truth for 24h window.
Expected: Within 1–2% variance; any mismatch flagged.

==============================
B) PILOT MONITORING + ALERTING SOP (CONCIERGE)
==============================
Goal: Keep pilots reliable and catch failures before they cost the client.

Daily (Mon–Fri) checklist (10 minutes per location)
1) Delivery health
- Check SMS send errors, bounce/undelivered count.
- Threshold: if >2% of messages fail in last 24h OR any hard failure on confirmations, escalate.
2) Calendar sync health
- Confirm last successful calendar read/write timestamp.
- If last success >2 hours during business hours: escalate.
3) Stuck conversations
- List conversations awaiting staff action >30 minutes (e.g., reschedule requests awaiting slot).
- Resolve or notify location.
4) Opt-outs and complaints
- Review STOP/HELP volume. Ensure STOP contacts are suppressed.
- Any complaint triggers immediate owner alert.
5) Integrity spot-check
- Randomly sample 5 appointments: verify reminder sent time, reply status, calendar event correctness.

Escalation rules
- P0 Incident (immediate): calendar write failing, double-book created, STOP not honored, reminders sending at wrong times, mass delivery failure.
- P1 Incident (same day): misclassification rate noticeable, minor timing drift, threading confusion for edge phrases.
- P2 (weekly): copy improvements, analytics formatting, minor UX tweaks.

Owner alert template (email)
Subject: [No-Show Reducer] Action needed: {{INCIDENT_TYPE}} for {{LOCATION}} ({{SEVERITY}})
Body:
- Location: {{LOCATION}}
- Severity: {{P0/P1/P2}}
- What happened: {{1-2 sentences}}
- Impact: {{# affected appointments/customers}}
- Customer-facing message sent? {{Yes/No + text}}
- Next action: {{what we need from owner/location}}
- Evidence: {{logs/transcript}}

Customer-safe fallback messaging (when system cannot confirm)
“Thanks — we’re having trouble updating the schedule automatically right now. Our team will confirm your appointment time shortly. If urgent, reply with your preferred times.”

==============================
C) PILOT RECRUITMENT + SCHEDULING SCRIPT PACK
==============================
Use for outreach replies and booking a 15-minute kickoff.

C1) Phone opener (to owner/manager)
“Hi, this is Bob. I run a small tool that reduces appointment no-shows using two-way SMS confirmations and quick reschedules. It’s designed for appointment-based businesses like yours. We’re running 2–3 concierge pilots right now, and I can set everything up with you in about 15 minutes. 
If you want, I can send a link with details — it’s here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 — and my email is agent_bob_replit+no-show-bot@agentmail.to.
Would you be open to a quick 15-minute call today or tomorrow to see if it fits?”

C2) Voicemail (30 seconds)
“Hi, this is Bob. I’m reaching out because we help appointment-based businesses reduce no-shows with two-way SMS reminders, confirmations, and reschedules. We’re onboarding a couple pilot locations now. Details are here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. You can reach me at agent_bob_replit+no-show-bot@agentmail.to. If you’d like, reply with a good time for a 15-minute call and I’ll work around your schedule.”

C3) Email reply when prospect shows interest
Subject: Quick 15-min setup call for no-show reduction pilot
Hi {{Name}},

Thanks — happy to set up a concierge pilot. Here’s the overview link for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

To start, we just need:
1) Your business timezone + hours
2) Which calendar you use (and a way to connect it)
3) Reminder timing (e.g., 24h + 2h) and your reschedule rules
4) Confirmation on customer texting consent language/process

Can we do a 15-minute kickoff call {{two time windows}}? If easier, reply with 2–3 times that work.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

==============================
D) WEEK-0 BASELINE CAPTURE + WEEK-1 SUCCESS CRITERIA (ONE-PAGER)
==============================
Baseline (collect before go-live)
- Last 4 weeks total appointments:
- Last 4 weeks no-shows:
- Avg appointment value ($):
- Current reminder method (none/manual/one-way):
- Typical lead time for bookings:

Week-1 success criteria (minimum viable proof)
- Confirmation rate: >= 40% of reminded appointments confirm (or an agreed target)
- Reschedule saves: measurable count of “would-have-no-showed” converted to reschedule
- Opt-out compliance: 100% STOP honored
- Timing accuracy: 0 reminders sent outside business rules (timezone/hours)
- Recovered revenue estimate: (no-show reduction * avg value) is positive and explainable in a weekly report

If any P0 fails, pause automation and switch to fallback messaging + owner alerting until fixed.
