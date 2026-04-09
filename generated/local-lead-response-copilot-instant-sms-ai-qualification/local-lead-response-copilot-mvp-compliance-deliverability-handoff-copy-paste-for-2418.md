# Local Lead Response Copilot — MVP Compliance + Deliverability Handoff (Copy/Paste for Agencies)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T21:18:35.622Z

---

Overview (what this is)
This document is the minimum viable compliance + deliverability setup for Local Lead Response Copilot (Instant SMS + AI Qualification). It’s designed to remove the most common sales objections and prevent carrier enforcement during pilots. Use this website URL to establish legitimacy in client comms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

1) What you MUST have to launch (MVP)
A) Express written consent at point of lead capture (form/lead ad) for SMS.
B) Clear STOP/HELP language (at signup + in at least first message).
C) Functional STOP handling: immediate opt-out + no further messages.
D) Quiet hours: avoid sending during late-night/early-morning in the lead’s timezone.
E) Consent logging: store proof of opt-in (source + timestamp + IP/metadata where possible).

2) Copy/paste opt-in snippets (use one)
Important: Place the snippet directly near the submit button.

2.1 Webflow / Website forms (checkbox recommended)
Checkbox label:
“By checking this box, you agree to receive text messages (SMS) from [BUSINESS NAME] about your request, including appointment scheduling and follow-ups. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy Policy: [PRIVACY_URL] and Terms: [TERMS_URL].”

Required fields to log (minimum):
- consent_checked=true/false
- form_name
- page_url
- timestamp (UTC)
- lead_phone
- lead_email (if collected)
- ip_address (if available)

2.2 Typeform
Add a required “Legal” statement right before submission:
“By submitting, you consent to receive text messages (SMS) from [BUSINESS NAME] regarding your inquiry, including scheduling and follow-ups. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL]. Terms: [TERMS_URL].”

If Typeform supports it, add a Yes/No question:
“SMS consent: Yes, I agree to receive SMS about my request.” (Required = Yes)

2.3 Meta/Facebook Lead Ads
In the “Custom disclaimer” / “Consent” section (or as close as possible to the call-to-action), paste:
“By submitting, you agree to receive text messages (SMS) from [BUSINESS NAME] about your request (scheduling/follow-ups). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL]. Terms: [TERMS_URL].”

3) Compliant first-message templates (low spam risk)
Guidelines: keep it short, relevant, no ALL CAPS, no ‘free!!!’, no misleading claims, avoid URL shorteners.

3.1 Immediate speed-to-lead opener (recommended)
“Hi {first_name}—this is {agent_name} with {business_name}. Thanks for reaching out about {service}. Are you looking to schedule an estimate today or this week? Reply STOP to opt out.”

3.2 If you need permission confirmation (optional safety)
“Hi {first_name}, {business_name} here following up on your request. Is it OK to text you about scheduling? Reply YES to continue or STOP to opt out.”

3.3 Qualification question (keep it 1 question at a time)
“Got it—what’s the address/ZIP for the project?”
Then:
“Thanks. When would you like us to come out—weekday or weekend?”

3.4 Booking / handoff to calendar
“Perfect. I can book you for {slot_1} or {slot_2}. Which works? Reply STOP to opt out.”

3.5 Missed call text-back
“Sorry we missed you—this is {business_name}. Want to book a time for your {service}? Reply with a day/time. Reply STOP to opt out.”

4) STOP / HELP handling (implementation spec)
Goal: One STOP must suppress all future outbound messages to that phone across all campaigns.

4.1 Keywords (case-insensitive, trimmed)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

4.2 On inbound STOP
- Immediately mark phone as opted_out=true in a global suppression list.
- Send a single confirmation message:
“You’re opted out and will no longer receive messages from {business_name}. Reply START to re-subscribe.”
- Block ALL subsequent outbound messages unless the user explicitly re-subscribes.

4.3 On inbound HELP
Send:
“{business_name}: We text about your request/appointments. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

4.4 Re-subscribe (optional)
If inbound = START (or UNSTOP), set opted_out=false only if your policy allows re-consent. Send:
“You’re re-subscribed. Reply STOP to opt out at any time.”

4.5 Logging requirements (audit trail)
Store an event row for every inbound message:
- phone_e164
- keyword_detected (STOP/HELP/START/none)
- raw_body
- timestamp_utc
- messaging_provider_message_id
- lead_id (if mapped)
Store consent separately:
- consent_source (webform/typeform/fb)
- consent_text_version
- consent_timestamp_utc
- ip_address (if available)
- landing_page_url

5) Quiet hours (timezone) — MVP rules
Goal: Don’t text in the middle of the night; queue messages until morning.

5.1 Default send window (recommended MVP)
Allowed: 8:00 AM – 8:00 PM lead-local time, 7 days/week.

5.2 Timezone resolution order
1) Lead-provided ZIP/postal code → map to timezone.
2) Lead state/city (if available) → approximate timezone.
3) Area code (NANP) → likely timezone.
4) Fallback: the business timezone.
Log the chosen timezone + resolution method.

5.3 Behavior
- If a message is triggered outside the window: queue it.
- Next send time: 8:05 AM local time (small offset prevents carrier spikes exactly on the hour).
- If multiple queued messages exist: send only the latest relevant step, or throttle to 1 message per 2–3 minutes.

5.4 Emergency override (optional)
Allow an internal flag “override_quiet_hours=true” for manual sends only (not automated sequences), and log who used it.

6) Deliverability guardrails (agency rules)
- Use a consistent brand identifier in first message (business name).
- Avoid repeated identical messages across many numbers in a short time.
- Avoid link shorteners; prefer full domain links. Do not include links in the very first message unless necessary.
- Keep frequency reasonable (MVP: 1 immediate + 2 follow-ups max over 48 hours if no response).
- Never imply affiliation with carriers, government, or guarantees.

7) Twilio-specific deliverability notes (if Twilio is the provider)
- Use a Messaging Service (not a single random number) so you can manage sender pool, compliance, and sticky sender.
- A2P 10DLC: if using long code at scale in the US, prepare Brand + Campaign details (use-case: “Customer care / appointment scheduling”). Registration may introduce fees later; do not pay during free launch.
- Enable inbound handling webhook for STOP/HELP and ensure suppression applies across all senders in the Messaging Service.

8) Go-live checklist (agency)
- [ ] Opt-in language added to form/ad and captured consent logged.
- [ ] First message includes business name + STOP line.
- [ ] STOP keyword tested: user receives confirmation, and subsequent outbound is blocked.
- [ ] HELP keyword tested: user receives support + STOP instructions.
- [ ] Quiet hours tested: trigger message at 11pm lead-local; verify it queues to morning.
- [ ] Consent evidence stored (timestamp + source + text version).

9) Verification test matrix (quick)
Test 1: New lead submits form → receives first message within 60 seconds.
Test 2: Lead replies STOP → receives opt-out confirmation; no further texts.
Test 3: Lead replies HELP → receives help message with support email.
Test 4: Trigger automation during quiet hours → message queued and delivered next morning.
Test 5: Opted-out lead triggers automation again → blocked + logged as suppressed.

Notes for pilots
During Week 1 free launch, this is intentionally “minimum viable”: it prevents the fastest ways SMS programs get shut down (no consent, no STOP, sending at night). As volume grows, revisit A2P registration, message throughput, and more granular consent versioning.
