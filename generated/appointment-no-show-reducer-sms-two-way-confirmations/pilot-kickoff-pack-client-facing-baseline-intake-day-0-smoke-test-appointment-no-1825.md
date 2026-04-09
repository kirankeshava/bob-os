# Pilot Kickoff Pack (Client-Facing) + Baseline Intake + Day-0 Smoke Test — Appointment No-Show Reducer

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:20:04.875Z

---

Subject: Quick 7-day pilot to reduce no-shows (two-way SMS confirmations)

Hi {{FirstName}},

I’m Bob from Appointment No-Show Reducer. We’re running a few concierge pilots to help appointment-based businesses cut no-shows using smart SMS reminders + two-way confirmations + easy rescheduling.

Legitimacy link (what it is + how it works): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support email: agent_bob_replit+no-show-bot@agentmail.to

If you’re open to a free 7-day pilot, here’s how we run it (fast + low lift):

1) What we set up (concierge)
- SMS reminders for upcoming appointments (timing based on your preference)
- Two-way confirmations (patients/clients reply YES/NO)
- If NO / reschedule request: we prompt for a new time window and route to your team (or automate if your workflow supports it)
- Optional waitlist: when a slot opens, we text waitlist contacts to fill gaps

2) What we need from you (10 minutes)
Please reply with the Baseline Intake below (copy/paste), or we can cover it in a 15-minute call.

3) Success criteria (what we’ll measure)
- Confirmations (# and %)
- Reschedules saved (#)
- Open slots filled from waitlist (#)
- Estimated recovered revenue/week (based on your average appointment value)

4) Compliance and consent (simple)
- We only message people who have provided their number for appointment communications.
- Every message includes opt-out language: “Reply STOP to opt out.”
- If someone replies STOP, we immediately stop all messages to that number.

If you want to pilot this week, send (1) the Baseline Intake, and (2) two times that work for a 15-min kickoff.

— Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2


============================
BASELINE INTAKE (copy/paste)
============================
Business name:
Primary contact name + role:
Preferred email for alerts:
Timezone (e.g., America/Chicago):
Business hours (days/times):

Appointment types (top 1–3):
Typical lead time (same-day / next-day / 1 week out):
Average appointment value ($):

Current no-show estimate (last 4 weeks):
- Total scheduled appointments:
- No-shows:
- Late cancels (within 24h):

Reminder preferences:
- Send 1st reminder: (e.g., 24 hours before)
- Send 2nd reminder: (e.g., 2 hours before)
- Confirmation question wording preference (optional):

Reschedule policy:
- Minimum notice required:
- If client says “NO”: (A) offer reschedule options by text, (B) route to staff, (C) both
- Any times that should NEVER be offered (lunch, blocked hours):

Waitlist (optional):
- Do you have a waitlist today? (yes/no)
- If yes, approx size:
- How quickly should we offer openings? (immediately / same-day only / within 48h)

Escalation contact (for failures):
- Name:
- Email:
- Phone (optional):

Consent confirmation:
- “We confirm we have consent to send appointment-related SMS to customers who provided their phone number.” (yes)


============================
DAY-0 SMOKE TEST (run after go-live)
============================
Purpose: Validate the core workflow before real volume.

A) Timezone + timing
1. Create a test appointment for today/tomorrow.
2. Confirm the reminder timestamp matches the business timezone in the intake.
Pass/Fail:

B) Two-way confirmation parsing
Send test reminder text to a test number and reply with:
- “YES” (should mark confirmed)
- “No” (should mark not confirmed / trigger reschedule flow)
- “reschedule” (should offer reschedule or route)
Pass/Fail:

C) Threading + duplicate prevention
1. Reply YES twice.
Expected: second YES does not create duplicate confirmations; system responds politely or stays silent.
Pass/Fail:

D) STOP / HELP compliance
1. Reply “STOP”. Expected: immediate opt-out confirmation; no further reminders to that number.
2. Reply “HELP”. Expected: support/help response including agent_bob_replit+no-show-bot@agentmail.to.
Pass/Fail:

E) Failure alert fail-safe
Simulate an integration failure condition (e.g., disconnect calendar token / block API call in test env).
Expected: owner alert email is sent to the preferred email from intake with clear next steps.
Pass/Fail:

F) Reschedule guardrails (no double-book)
Attempt to reschedule into a blocked/busy slot.
Expected: system rejects and offers alternate options.
Pass/Fail:


============================
PILOT OUTREACH EXECUTION PLAN (internal)
============================
Goal: 2–3 pilots live within 7 days.

Target niches (highest no-show pain + fast decision):
- Dental (independent), chiropractic, physical therapy, med spas, salons with high ticket services, IV therapy, optometry, psychotherapy group practices, auto service with appointments.

Daily send volume (organic):
- Day 1: 15 emails + 5 LinkedIn DMs
- Day 2: 15 emails + follow-ups to Day 1 opens/replies
- Day 3: second touch to non-responders (short + direct)

Cadence:
- Touch 1: Pilot intro + legitimacy URL + 15-min ask
- Touch 2 (48h): “Worth a quick 7-day test?” + 2 bullet benefits + ask
- Touch 3 (96h): “Can I close the loop?” + 1-line CTA

Booking CTA:
- “Reply with two times that work for a 15-min kickoff, or paste the Baseline Intake.”

Qualification gates (don’t pilot if these fail):
- Cannot confirm consent for SMS appointment messaging
- No ability to provide baseline no-show estimate and average appointment value
- No stable appointment source of truth (calendar/PMS) or no willingness to run concierge manual routing during pilot
