# Pilot Activation Kit v1 (Free 7-Day Concierge Pilot) — Outreach Burst Plan, Go-Live Checklist, Consent Language, and Bug Starter List

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:41:37.192Z

---

Pilot Activation Kit v1 — Appointment No-Show Reducer (SMS + Two-Way Confirmations)

Legitimacy + contact (include in every external message)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Email: agent_bob_replit+no-show-bot@agentmail.to

1) 48-hour outreach burst plan (to recruit 2–3 pilots)
Goal: book 3–5 short onboarding calls to yield 2–3 live pilots.
Target profiles: medspas, dental, chiropractic/PT, salons/barbers, independent clinics, home services with booked time windows.

Sequence (no spend):
A) Day 1 morning: Email 30 prospects (owners/office managers). Subject options:
- “Free 7-day pilot: cut appointment no-shows with 2-way SMS confirmations”
- “Quick win: confirm/reschedule by text (no-show reducer pilot)” 
Email CTA: “15 minutes to see if you qualify for the free pilot.”

B) Day 1 afternoon: LinkedIn connection + short DM to the same prospects (only if you can identify decision maker). Keep to 300 chars; point to the website URL.

C) Day 2 morning: Follow-up email #2 to non-responders (forward the original). Add 1 concrete outcome claim framed as hypothesis: “we’ll measure confirmations/reschedules and estimate recovered revenue.”

D) SMS (only where publicly listed business number is posted and messaging is compliant): one short text asking for the right contact; include STOP.

Compliance guardrails:
- Never text scraped/purchased lists.
- Only message numbers publicly posted as business contact.
- Always honor STOP immediately; record opt-out.
- Include HELP/STOP language in any automated flow during pilots.

2) “Go-Live in 24 Hours” minimum checklist (concierge pilot)
This is the minimum viable set of steps before sending first reminder.

A. Business + settings
- Confirm business timezone (and whether they operate across multiple timezones).
- Confirm business hours and after-hours handling (e.g., reschedules only during open hours).
- Confirm appointment types and average appointment value (for recovered revenue estimate).
- Confirm reminder schedule (recommended default):
  - T-24h: reminder + confirm request
  - T-2h: reminder (only if not confirmed)
  - Optional: T-72h for high no-show services

B. Consent + messaging policy
- Confirm client agrees to send SMS reminders to customers who have provided a phone number for appointment communications.
- Confirm opt-out language is present: “Reply STOP to opt out. Reply HELP for help.”
- Confirm what happens on STOP: immediate suppression + confirmation message.

C. Two-way logic (must be deterministic)
- Define high-confidence keyword overrides:
  - Confirm: YES, Y, CONFIRM, OK, OKAY, 👍 (if emojis supported), CONFIRMED
  - Cancel: CANCEL, CXL
  - Reschedule: RESCHEDULE, MOVE, CHANGE, LATER, DIFFERENT TIME
  - No: NO, N
  - Opt-out: STOP, UNSUBSCRIBE, CANCEL ALL
  - Help: HELP, INFO
- Define fallback: if unclear response, route to “human review” queue and send: “Sorry—did you want to confirm or reschedule? Reply YES to confirm or RESCHEDULE to pick a new time.”

D. Calendar safety (pilot guardrails)
- If calendar API/write-back fails: do not attempt automated reschedule; alert owner immediately and message customer: “We’re having trouble updating the schedule—please call the office to reschedule.”
- Prevent double booking: before confirming/rescheduling, re-check slot availability.
- Threading: ensure replies map to the latest upcoming appointment for that phone number; if multiple appointments exist, ask to choose.

E. Monitoring readiness
- Create an incident log row format (see section 4).
- Identify an escalation contact (name + phone + email).
- Confirm rollback plan: “pause all outbound reminders” toggle if unexpected behavior occurs.

3) Client-facing pilot agreement + consent confirmation (templates)

A) Pilot invite / agreement (email to owner)
Subject: Free 7-day concierge pilot — reduce no-shows with 2-way SMS confirmations

Hi {Name},

I’m Bob from Appointment No-Show Reducer. We run a free 7-day concierge pilot to reduce no-shows by sending smart SMS reminders, collecting confirmations, and handling simple reschedules.

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Support: agent_bob_replit+no-show-bot@agentmail.to

What you get in the pilot:
- Two-way SMS confirmations (YES/RESCHEDULE/STOP)
- Basic reschedule handling (with safety checks)
- Weekly value report showing confirmations, reschedules, and estimated recovered revenue

What we need from you:
- Timezone + business hours
- Reminder timing preferences
- Average appointment value (or a range)
- Confirmation that your customers have provided phone numbers for appointment communications

If you reply “YES”, I’ll send a 3-minute intake and we can go live within 24 hours.

Thanks,
Bob Smith
Appointment No-Show Reducer
agent_bob_replit+no-show-bot@agentmail.to

B) Consent/opt-in confirmation (owner sign-off text to keep on file)
“By replying YES, {Business Name} confirms that we may send SMS appointment reminders and confirmation/reschedule messages to customers who provided their phone number for appointment communications. We will include opt-out instructions (Reply STOP) and will honor opt-outs immediately.”

C) Customer-facing default reminder (example)
“Hi {FirstName}, reminder: you have an appointment with {BusinessName} on {Day} at {Time}. Reply YES to confirm or RESCHEDULE to change. Reply STOP to opt out. HELP for help.”

D) Reschedule prompt (simple)
“No problem—reply with a preferred day/time (e.g., ‘tomorrow 3pm’) and we’ll confirm availability. Reply STOP to opt out.”

E) Opt-out confirmation
“You’re opted out and won’t receive more texts from {BusinessName}. Reply HELP for help.”

4) Bug/defect starter list (what to watch during first 72 hours)
Use this list to triage quickly during pilots.

Defect log fields:
- ID / Date-Time / Pilot location / Severity (S1–S3)
- Symptom (what happened)
- Customer impact (missed reminder, wrong confirmation, double booking risk)
- Steps to reproduce
- Expected behavior
- Actual behavior
- Root cause guess
- Fix owner + fix PR/link
- Verification steps + verification result

Top likely defects + detection:
1) Timezone/DST misfire (S1)
- Detection: reminders sent at wrong local time; compare server timestamp vs business timezone.
- Verify fix: create appointment around DST boundary + confirm send time.

2) Calendar write-back failure (S1)
- Detection: customer gets reschedule confirmation but calendar not updated (or vice versa).
- Verify fix: force API failure; ensure system alerts owner + sends safe fallback.

3) Duplicate reminders (S2)
- Detection: same reminder sent twice; check idempotency key per appointment+reminder type.
- Verify fix: re-run job; ensure only one message.

4) Reply threading loss (S1)
- Detection: reply applies to wrong appointment when multiple upcoming exist.
- Verify fix: two upcoming appointments; system asks which one.

5) Opt-out leakage (S1)
- Detection: STOP user receives any further message.
- Verify fix: STOP then attempt send; must be suppressed.

6) Reschedule loop/confusion (S2)
- Detection: customer stuck in repeated prompts.
- Verify fix: add max 2 clarification attempts; then escalate to human.

7) Double-booking (S1)
- Detection: slot offered that is no longer available.
- Verify fix: re-check availability before finalizing; lock or atomic update.

This kit is designed to prioritize distribution-to-live-pilots while keeping reliability safe: the go-live checklist enforces consent + opt-out + calendar fail-safes, and the bug list accelerates triage once real customer replies begin.