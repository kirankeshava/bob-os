# Local Lead Response Copilot — Minimum-Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Verification)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:02:55.645Z

---

Business legitimacy links (use everywhere)
- Website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email (use in HELP and forms): agent_bob_replit+lead-copilot@agentmail.to

Goal (wartime/MVP): be compliant enough to (1) avoid Twilio/carrier enforcement, (2) avoid TCPA/CTIA objections during pilot sales, (3) preserve reply rates.

1) Minimum viable opt-in language (copy/paste)
A) Webflow / website form checkbox + disclaimer (recommended)
Checkbox label:
[ ] I agree to receive text messages about my request.

Disclaimer (place under the checkbox and near the submit button):
“By submitting, you agree to receive SMS messages about your request from [Company Name] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not a condition of purchase. See Privacy Policy and Terms: [PASTE LINKS].”

Implementation notes:
- Default the checkbox to unchecked.
- Store timestamp, page URL, and the exact disclaimer text shown (see Consent Logging).

B) Typeform (use a required statement screen before submit)
Add a “Statement” block near the end (required acknowledgement):
“By continuing, you agree to receive SMS messages about your request from [Company Name] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not a condition of purchase. Privacy/Terms: [PASTE LINKS].”

C) Meta/Facebook Lead Ads (Primary text + questions)
Primary text (short):
“Request a quote. By submitting, you agree to receive texts about your request. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy/Terms: [PASTE LINKS].”

Lead form question (add custom question or description where possible):
“Mobile number for text updates (SMS). Reply STOP to opt out.”

2) Compliant first-message templates (carrier-safe)
Rules for first outbound SMS:
- Identify the business.
- Reference the user’s request.
- Include STOP/HELP disclosure.
- Avoid link shorteners and “free!!!/act now” style spam words.

Template 1: Immediate lead acknowledgment + first qualifier
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. What’s the address or ZIP code for the job? Reply STOP to opt out, HELP for help.”

Template 2: If you must include a link (use only your own domain)
“Hi {first_name} — {business_name} here. I can get you scheduled. What day works best? You can also book here: {booking_link}. Reply STOP to opt out, HELP for help.”

Template 3: Missed-call text back (high intent)
“Sorry we missed you — this is {business_name}. What can we help with (repair, install, or quote)? Reply STOP to opt out, HELP for help.”

3) STOP / HELP handling (implementation spec)
A) Keywords (case-insensitive, trim punctuation)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

B) Behavior requirements
On inbound STOP keyword:
1) Immediately mark recipient as opted_out=true in a global suppression list (per sending number or per messaging service, but enforced globally across the account).
2) Send one (1) final confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe.”
3) Block any future outbound messages to this recipient unless they send START.

On inbound HELP keyword:
Respond:
“{business_name}: We text about your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to {website_url}”

On inbound START keyword (optional but recommended):
- Mark opted_out=false and log resubscribe.
- Respond:
“You’re resubscribed. Reply STOP to opt out.”

C) Enforcement
- Outbound send pipeline MUST check suppression first.
- If suppressed, do not send; instead log event: outbound_blocked_reason=opted_out.

D) Logging (minimum)
Log these for audit:
- event_type: opt_out | help | opt_in_start
- phone_e164, timestamp_utc, source (inbound_sms), raw_message
- business_id / client_id
- suppress_applied=true/false

4) Quiet hours (minimum viable spec)
Purpose: reduce complaints and align with “reasonable hours.”

Default quiet hours policy (recommended MVP):
- Only send messages 8:00am–8:00pm recipient local time, Mon–Sat.
- On Sundays: 10:00am–6:00pm local time.

Timezone resolution order:
1) If lead has postal code/address → map to timezone.
2) Else use area code → timezone (best-effort).
3) Else default to client’s timezone.

Behavior:
- If lead arrives during quiet hours: send an immediate internal notification to business (optional) and queue the first SMS for next allowed window.
- Exception: If the lead explicitly requested “call/text now” AND time is between 8am–9pm local, allow.

Required logs:
- queued_due_to_quiet_hours=true
- scheduled_send_time_local and scheduled_send_time_utc
- timezone_used and resolution_method

5) Consent logging (what agencies must capture)
Minimum fields to store per lead:
- lead_id
- phone_e164
- consent_status (granted/denied)
- consent_timestamp_utc
- consent_source (webflow_form | typeform | meta_lead_ad | manual)
- consent_language_version (hash or full text)
- form_url / ad_id
- ip_address (if available)

Why: if a carrier/Twilio review happens, or a consumer complains, you can prove opt-in.

6) Deliverability hardening rules (MVP)
- Use consistent business identification in first message.
- Keep first SMS under ~240 chars.
- Avoid ALL CAPS, repeated punctuation, “FREE,” “WIN,” “GUARANTEED,” and heavy salesy language.
- Avoid URL shorteners (bit.ly). Use your own domain booking link.
- Avoid attaching media (MMS) until engagement is established.
- Keep message frequency low: no more than 1 follow-up if no reply (e.g., +15 min, then next day).

Safe follow-up example:
“Just checking in — do you want a quote for {service} this week or next? Reply STOP to opt out.”

7) Agency handoff (copy/paste steps)
Step 1 — Add opt-in language to the lead source
- Webflow: add unchecked SMS consent checkbox + disclaimer (Section 1A).
- Typeform: add required statement block (Section 1B).
- Meta Lead Ads: add primary text + disclaimer (Section 1C).

Step 2 — Ensure phone is collected and formatted
- Require mobile number.
- Normalize to E.164 (+1XXXXXXXXXX).

Step 3 — Configure initial SMS template
- Use Template 1 from Section 2.
- Ensure STOP/HELP line is present.

Step 4 — Confirm STOP/HELP works (verification checklist)
- Text HELP to the number: verify info + support email + website appears.
- Text STOP: verify confirmation + no further outbound messages can send.
- Text START: verify resubscribe (if enabled).

Step 5 — Confirm quiet hours
- Set a test lead timestamp inside quiet hours; verify the send is queued and delivered at next allowed window.

8) Verification matrix (what “verified” means)
A) STOP test
Input: inbound “STOP” from a test phone
Expected:
- opt_out log created
- suppression applied
- confirmation message sent once
- any subsequent outbound attempt blocked and logged

B) HELP test
Input: inbound “HELP”
Expected:
- help response sent with: business name + STOP instruction + support email agent_bob_replit+lead-copilot@agentmail.to + website link

C) Quiet hours test
Input: lead created at 11:30pm local
Expected:
- first SMS queued
- scheduled for next allowed window
- logs include timezone resolution method

If any of A/B/C fails, do not launch paid traffic; fix before scaling.
