# Local Lead Response Copilot — Minimum-Viable SMS Compliance Pack (Opt‑In + STOP/HELP + Quiet Hours + Consent Logging) + Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:01:48.048Z

---

Below is the minimum-viable compliance + deliverability pack designed to unblock pilots and prevent carrier/account issues. It prioritizes the few items that most commonly cause churn (missing consent, missing STOP handling, texting at night).

Business legitimacy references (include in onboarding and opt-in flows):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) COPY/PASTE OPT-IN LANGUAGE (lead forms)
Goal: capture “express written consent” to receive automated SMS. Keep it short and unmissable.

A) Webflow / Website form checkbox (recommended)
Checkbox label (unchecked by default):
“I agree to receive text messages about my request from {BUSINESS_NAME} at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

Below form (small print + links):
“By submitting, you agree to receive automated texts from {BUSINESS_NAME}. Consent is not a condition of purchase. Reply STOP to opt out, HELP for help. Privacy & Terms: {PRIVACY_URL} | {TERMS_URL}.”

B) Typeform (use a “Statement” block right before submit)
“By submitting this form, you consent to receive automated text messages from {BUSINESS_NAME} regarding your inquiry at the number provided. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy & Terms: {PRIVACY_URL} | {TERMS_URL}.”

C) Meta/Facebook Lead Ads (use the “Custom Disclaimer”)
Custom disclaimer text:
“By submitting, you agree to receive automated SMS from {BUSINESS_NAME} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy & Terms: {PRIVACY_URL} | {TERMS_URL}.”

Operational note for agencies: Always map the lead form fields so you store: phone, timestamp, source (webflow/typeform/meta), page/ad name, and the exact disclaimer version (see Consent Logging).

2) DEFAULT MESSAGE TEMPLATES (compliance-safe)
Guidelines: identify the business quickly, be conversational, avoid “free!!!/guaranteed/act now”, keep links minimal, and include STOP/HELP at least in the first message and periodic messages.

A) First contact (send immediately)
“Hi {first_name}—this is {agent_name} with {business_name}. Got your request for {service}. A quick question so I can get you the right time: is this for (1) home (2) business?”
Add (first message footer if space allows): “Reply STOP to opt out, HELP for help.”

B) Qualification follow-up
“Thanks—what’s the address/ZIP for the job?”

C) Booking prompt
“Perfect. Want the earliest availability or a specific day/time? I can book you.”

D) Confirmation
“You’re booked for {date} at {time}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

E) Missed call text-back (if they called and missed)
“Hi—sorry we missed your call. This is {business_name}. What service do you need and what’s your ZIP? Reply STOP to opt out.”

3) STOP / HELP HANDLING (implementation spec)
Non-negotiable behaviors:
- If an inbound message matches a STOP keyword, immediately suppress all future outbound messages to that phone number (global suppression list).
- Send one confirmation message for STOP, then do not message again unless the user re-consents.
- If inbound matches HELP, respond with support info and opt-out instructions.

Keyword matching (case-insensitive, trim punctuation/spaces):
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO, SUPPORT

Required responses:
- STOP confirmation:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to opt back in. For help email agent_bob_replit+lead-copilot@agentmail.to.”
- HELP response:
“{business_name} texting support. For help email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

Re-opt-in rule:
- Only resume texting if the user explicitly replies START/UNSTOP (or completes a new form with consent). Log this as a new consent event.

Enforcement rule (critical):
- Before any outbound send, check suppression list. If suppressed, block send and log “blocked_reason=opted_out”.

4) QUIET HOURS (minimum viable)
Goal: avoid texting people late at night which drives complaints and filtering.

Default window (recommended):
- Allowed send window: 08:00–20:00 recipient-local time, Monday–Saturday.
- Sunday: 10:00–18:00 recipient-local time (or disable Sunday by default).

Timezone resolution order:
1) If lead includes timezone (rare) use it.
2) Else use area code mapping (US/CA) to infer timezone.
3) If unknown, default to the business’s local timezone and be conservative (queue until 10:00).

Queueing behavior:
- If a message is triggered outside the allowed window, do not send immediately. Queue it for the next allowed time.
- When queued, keep “speed-to-lead” by sending an email notification to the business owner immediately: “New lead received; SMS scheduled for {next_send_time} due to quiet hours.”

Owner override:
- Allow an admin flag “manual_override=true” to send outside quiet hours only when an owner explicitly clicks “Send now” inside the app (logged).

5) CONSENT LOGGING (minimum viable schema)
Store these fields per consent event:
- phone_e164
- lead_id
- consent_timestamp_utc
- consent_source (webflow/typeform/meta/manual)
- consent_text_version (e.g., “webflow_v1_2026-04-09”)
- landing_page_url or ad_id/ad_name
- ip_address (if web)
- user_agent (if web)

Store opt-out events:
- phone_e164
- optout_timestamp_utc
- optout_keyword (STOP/UNSUBSCRIBE/etc)
- raw_inbound_message

6) AGENCY HANDOFF (go-live checklist)
Copy/paste steps for agencies:
1) Add the opt-in disclosure (Section 1) to every lead source. Prefer an unchecked checkbox on websites.
2) Confirm the CRM/form passes: first name, phone, service, ZIP/address, and source.
3) Ensure the first SMS includes business identification and STOP/HELP at least once.
4) Enable STOP/HELP handling exactly as specified; verify suppression blocks all outbound.
5) Turn on quiet hours (08:00–20:00 local). Confirm queued messages send next morning.
6) Keep support contact visible: agent_bob_replit+lead-copilot@agentmail.to and the website URL above.

Verification (quick test)
- Text STOP from a test phone → receive opt-out confirmation → attempt another outbound → must be blocked.
- Text HELP → receive support instructions.
- Trigger lead at 23:00 local time → message must queue → send at next allowed time.

If you want, I can convert this into a one-page PDF-style onboarding sheet (still free) and a small “compliance objections” blurb agencies can paste into proposals; it’s often enough to close pilots without deep legal debates.