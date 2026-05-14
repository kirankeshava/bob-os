# Local Lead Response Copilot — Minimum‑Viable SMS Compliance & Deliverability Pack (Agency Copy/Paste + STOP/HELP + Quiet Hours)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:00:59.671Z

---

Below is the minimum-viable compliance/deliverability pack to get pilots live fast while reducing carrier enforcement and TCPA/CTIA objections. Use with: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

1) REQUIRED DATA TO CAPTURE (FORM/AD)
- Phone number (required)
- First name (recommended)
- Service requested / job type (recommended)
- ZIP code or service area (recommended)
- Consent checkbox OR built-in platform consent field (required)
- Timestamp, source URL/form name/ad id, IP/user agent if available (recommended)

2) COPY/PASTE OPT‑IN LANGUAGE (USE ONE)
A) Webflow / Website Form (checkbox)
[ ] I agree to receive text messages from {Business Name} about my request. Message/data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

B) Typeform (statement + Yes/No)
Statement: By providing your phone number, you consent to receive SMS updates from {Business Name} regarding your inquiry. Msg frequency varies. Msg/data rates may apply. Reply STOP to opt out, HELP for help. Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Question: “Do you agree to receive text messages about your request?” (Yes/No)

C) Meta/Facebook Lead Ads (primary text)
“By submitting, you agree {Business Name} may contact you by SMS about your request. Msg frequency varies. Msg/data rates may apply. Reply STOP to opt out, HELP for help. Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

3) FIRST MESSAGE TEMPLATE (SEND IMMEDIATELY)
Hi {first_name} — this is {agent_name} with {Business Name}. Got your request for {service}. Quick question so we can help fast: what’s the address or ZIP code for the job?
Reply STOP to opt out, HELP for help.

4) QUALIFICATION FLOW (KEEP IT SHORT)
Q1 (location): What’s the address or ZIP code?
Q2 (timing): When do you want this done? (Today/This week/Date)
Q3 (scope): Briefly, what needs to be done?

If qualified:
Thanks — we can help. Want to book a quick call or appointment? Reply 1 for call, 2 for appointment.

Booking confirmation:
You’re set for {time_window}. If anything changes, reply here. Reply STOP to opt out, HELP for help.

5) STOP/HELP HANDLING — IMPLEMENTATION SPEC (MINIMUM)
A) Keywords
- STOP/UNSUBSCRIBE/CANCEL/END/QUIT = opt-out
- START/UNSTOP = opt-in back (only if prior opt-out exists)
- HELP/INFO = help response
- Also treat common variants case-insensitively and trimmed.

B) Behavior
- If inbound matches STOP keywords:
  1) Add phone to Global Suppression List immediately.
  2) Send one confirmation message: “You’re opted out and will no longer receive texts from {Business Name}. Reply START to opt back in.”
  3) Block all future outbound (including automation, reminders, campaigns) unless START received.

- If inbound matches HELP keywords:
  Send: “{Business Name}: We text about your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

- If inbound matches START and number is suppressed:
  1) Remove from suppression list.
  2) Send: “You’re opted back in. Reply STOP to opt out.”

C) Logging (for audits)
For every STOP/HELP/START event, log:
- phone_e164
- keyword_received
- timestamp_utc
- source (sms_inbound)
- conversation_id / lead_id if known
- action_taken (suppressed/unsuppressed/help_sent)

6) QUIET HOURS — IMPLEMENTATION SPEC (MINIMUM)
Goal: reduce complaints by avoiding texts during late night/early morning.

A) Default quiet window
- No automated outbound between 9:00 PM and 8:00 AM recipient local time.

B) Timezone resolution order
1) Lead ZIP/postal code → timezone lookup
2) Area code heuristic (fallback)
3) If unknown: assume business timezone (config) and apply quiet hours conservatively.

C) Behavior during quiet hours
- If a new lead arrives during quiet hours: send nothing immediately.
- Queue first message for 8:05 AM local time.
- If human/manual override is enabled, allow owner to send manually but show warning.

D) Edge cases
- DST: use IANA timezone IDs when possible (e.g., America/Chicago).
- If lead replies during quiet hours: allow responses (recipient-initiated), but keep automation muted unless explicitly allowed.

7) DELIVERABILITY GUIDELINES (PILOT-SAFE)
- Always identify business in first message.
- Avoid link shorteners; keep links minimal.
- Avoid “FREE”, “WIN”, “GUARANTEED”, excessive punctuation, ALL CAPS.
- Keep messages under ~320 chars when possible.
- Don’t send repetitive nudges; max 1 follow-up if no response.

8) BASIC VERIFICATION TEST MATRIX (10 MIN)
- Test 1: New lead submits form → receives first SMS immediately (outside quiet hours)
- Test 2: Lead texts “STOP” → receives opt-out confirmation; system blocks next outbound
- Test 3: Same lead texts “HELP” → receives help message with support email
- Test 4: Same lead texts “START” → receives opt-in confirmation; outbound allowed again
- Test 5: Lead submits during quiet hours → message queued for morning; no immediate SMS sent

9) AGENCY HANDOFF — WHAT TO DO NOW
Step 1: Paste the opt-in language into the form/ad (Section 2).
Step 2: Ensure consent is required (checkbox or explicit Yes).
Step 3: Ensure the webhook payload includes timestamp + source + consent value.
Step 4: Confirm STOP/HELP keywords are enabled and tested (Section 8).
Step 5: Confirm quiet hours are turned on (Section 6).

If an agency/customer asks “Are you compliant?” use this one-liner:
“We capture explicit SMS consent at the form/ad, include STOP/HELP in messaging, honor quiet hours by timezone, and log consent + opt-outs for audit. See: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 or email agent_bob_replit+lead-copilot@agentmail.to.”
