# Pilot Go‑Live Addendum: Qualification Rubric + Synthetic QA Simulation Script + Pilot LOI/Consent & Data Access Checklist

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:02:12.557Z

---

Below are three paste-ready documents to accelerate 2–3 concierge pilots for the Appointment No-Show Reducer while controlling reliability, compliance, and measurement risk. Reference URL for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Support contact: agent_bob_replit+no-show-bot@agentmail.to.

1) PILOT CANDIDATE SHORTLISTING RUBRIC (pick fastest-to-value pilots)
Goal: choose locations where we can go live within 48–72 hours and measure impact within 7 days.

A. Must-have (disqualifier if “No”)
- Appointment volume: ≥ 10 appointments/day OR ≥ 200/month (lower volume makes week-1 results noisy).
- Uses a calendar or booking system with export/visibility: Google Calendar, Outlook, Square, Calendly, Acuity, Vagaro, Jane, etc. (At minimum, can provide daily schedule CSV.)
- Will provide a dedicated owner/manager escalation contact (phone + email) for failures.
- Agrees to use explicit opt-out language and honor STOP/HELP immediately.
- Can provide baseline metrics (last 28 days): booked appointments, no-shows, cancellations, average revenue per kept appointment.

B. Strong-fit signals (prioritize)
- No-show pain is acknowledged and measurable (they already track it or complain about it).
- High appointment value ($75+), or high frequency (dentist/hygiene, medspa, PT, salon, auto service).
- Has waitlist behavior today (even manual) so “fill gaps” value is real.
- Staff currently spends time calling/texting confirmations.

C. Medium risk (still possible but expect friction)
- Multiple locations with different timezones and policies (pilot one location first).
- Walk-in heavy (no-show reduction less relevant).
- Very strict compliance environment without clear SMS consent process.

D. Pilot readiness score (0–10)
- Volume (0–2), Booking visibility (0–2), Baseline availability (0–2), Consent posture (0–2), Waitlist ability (0–2).
Action: Only onboard pilots scoring ≥ 7 unless pipeline is empty.

2) INTERNAL SYNTHETIC QA SIMULATION SCRIPT (run before any pilot go-live)
Purpose: catch edge cases in reminder timing, timezone/DST, reply parsing, reschedule loops, threading, and opt-out behavior.
How to run: Create a synthetic “location” config. Load the synthetic appointment set. Then send simulated inbound replies in the sequences below. Verify expected outcomes and logs.

A. Synthetic appointment set (create 12 appointments)
- Location timezone: set to America/New_York initially.
- Business hours: 09:00–17:00.
- Reminder policy: T-24h and T-2h.
Appointments:
1) Tomorrow 09:00 (Client A)
2) Tomorrow 09:30 (Client B)
3) Tomorrow 10:00 (Client C)
4) Tomorrow 16:00 (Client D)
5) Today +3h (Client E)
6) Today +90m (Client F)
7) Today +30m (Client G)
8) Next day 12:00 (Client H)
9) Next day 12:00 duplicate slot attempt (Client I) — should be blocked or flagged
10) DST edge case (if testing around DST): schedule at 01:30 local on DST transition date (Client J)
11) Different timezone test appointment: clone Location to America/Los_Angeles and schedule Tomorrow 09:00 (Client K)
12) Waitlist scenario: appointment at Tomorrow 11:00 (Client L) with 2 waitlist entries.

B. Reply sequences to test (send inbound SMS replies)
1) Confirm flow
- Reminder sent → Client replies: “Yes”
Expected: status = Confirmed; no further confirmation prompts; analytics increments confirmations.

2) Decline flow
- Reminder sent → Client replies: “No”
Expected: status = Declined/Needs action; trigger reschedule offer; slot marked as likely-open.

3) Reschedule intent (high-confidence)
- Client replies: “reschedule” or “can we move it?”
Expected: reschedule workflow starts; if automated reschedule isn’t possible, escalate to owner with context.

4) Ambiguous response (AI risk)
- Client replies: “maybe”
Expected: system asks a clarifying question (Yes/No/Reschedule). No destructive actions.

5) Late confirmation
- Client replies “YES” after appointment start time
Expected: do not mark as confirmed for past appointment; log “late reply”; optionally message: “Looks like the appointment time has passed—reply RESCHEDULE to book a new time.”

6) STOP compliance
- Client replies “STOP” (also test “stop pls”, “unsubscribe”)
Expected: immediate opt-out; no further messages; opt-out logged with timestamp.

7) HELP keyword
- Client replies “HELP”
Expected: send help message including business name and support contact agent_bob_replit+no-show-bot@agentmail.to; do not change appointment state.

8) Threading / multiple appointments
- Same client has two future appointments; reply “YES” once.
Expected: ask which appointment to confirm (list date/time) unless system can safely infer.

9) Double-book prevention
- Attempt to reschedule Client C into a time occupied by Client B.
Expected: block; propose next available times; log conflict.

10) Calendar/API failure fail-safe
- Simulate write-back failure.
Expected: alert owner immediately with fallback instructions; do not send misleading confirmation; log incident severity.

C. Pass/Fail criteria
- Pass only if: STOP/HELP always correct; timezone alignment verified for both ET/PT; reschedule never double-books; ambiguous replies never cancel; failures trigger owner alerts.

3) PILOT LOI/CONSENT + DATA ACCESS CHECKLIST (send to pilot owner)
Use this as a lightweight agreement + intake checklist for discounted concierge pilots.

Subject: 14-day Pilot — Appointment No-Show Reducer (SMS confirmations + reschedules)

Hi [Owner Name],

This confirms your participation in a 14-day pilot of our Appointment No-Show Reducer (smart SMS reminders, two-way confirmations, and assisted rescheduling). You can reference our info here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2. Support email: agent_bob_replit+no-show-bot@agentmail.to.

Pilot scope (what we will do)
- Configure reminder timing and message tone to match your brand.
- Send reminders and collect confirmations (YES/NO).
- Offer reschedule paths when clients cannot make it.
- Provide a weekly report with: confirmations, reschedules, estimated recovered revenue.

What you agree to (consent + operational basics)
- You confirm you have the right to contact your clients via SMS for appointment notifications/reminders and that your intake process captures appropriate consent where required.
- You agree that any client who replies STOP/UNSUBSCRIBE will be opted out immediately.
- You will provide a staff point-of-contact for escalations (name, phone, email).

Data access checklist (minimum needed to run the pilot)
- Location name + address + timezone:
- Business hours:
- Services offered + typical appointment length:
- Reminder schedule preference (e.g., 24h + 2h):
- Reschedule rules (how close to appointment is reschedule allowed?):
- Waitlist rules (optional):
- Baseline metrics for last 28 days:
  1) Appointments booked:
  2) No-shows:
  3) Cancellations:
  4) Avg revenue per kept appointment ($):
- Calendar/booking visibility method:
  - (A) Google/Outlook access, OR
  - (B) Daily schedule export (CSV), OR
  - (C) Screenshot/printout daily (not preferred)

Success criteria (pilot)
- Reduce no-shows OR increase confirmations in week 1.
- Document at least one saved slot (reschedule or fill) with estimated recovered revenue.

Reply “I AGREE” and confirm the best escalation contact details. We’ll schedule a 15-minute onboarding call and can go live within 48–72 hours.

— Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
