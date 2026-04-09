# Local Lead Response Copilot — Minimum‑Viable SMS Compliance & Deliverability Go‑Live Pack (Agency Copy/Paste + Engineering Spec)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T17:11:58.297Z

---

Purpose (MV Compliance for Wartime Pilots)
This pack is the minimum set of compliance + deliverability items required to safely launch pilots (home services/local businesses) without getting blocked by carriers or creating TCPA/CTIA objections. It is optimized for speed-to-launch, not perfect legal coverage.

Business legitimacy references (use everywhere)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

A) Copy/Paste Opt‑In Language (must be shown at point of capture)

1) Webflow / Website form checkbox + disclosure
Add a required checkbox and a short disclosure near the submit button.

Checkbox label (required)
[ ] I agree to receive text messages about my inquiry.

Disclosure text (place under button)
“By submitting this form, you agree to receive SMS messages from [BUSINESS NAME] related to your request (e.g., scheduling, estimates, service updates). Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Privacy & Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (link to published pages when available). Support: agent_bob_replit+lead-copilot@agentmail.to.”

Required fields to capture alongside the phone
- phone_number (E.164 if possible)
- lead_source (webflow)
- consent_checkbox = true
- consent_text_version (e.g., “webflow_v1”)
- consent_timestamp_utc
- consent_page_url
- ip_address (if available)

2) Typeform
Add a “Legal” statement (or description) on the phone question OR final confirmation screen.

Typeform disclosure
“By providing your phone number, you consent to receive SMS messages from [BUSINESS NAME] about your request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy/Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Support: agent_bob_replit+lead-copilot@agentmail.to.”

3) Meta/Facebook Lead Ads
In the “Privacy Policy” link field, point to the website (replace with final Privacy URL when published).
Add to the lead form’s disclaimer/custom question text:
“By submitting, you agree to receive SMS from [BUSINESS NAME] regarding your request. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy/Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Support: agent_bob_replit+lead-copilot@agentmail.to.”

B) Message Templates (minimum viable, low spam risk)

1) First message (send immediately after lead)
“Hi {first_name}, it’s {agent_name} with {business_name}. Got your request for {service}. What’s the address (or ZIP) for the job?”
(If you must include STOP/HELP in first message due to risk tolerance)
“Reply STOP to opt out, HELP for help.”

2) Qualification follow-up (1 question at a time)
“Thanks—what day/time works best for a call or estimate?”

3) Booking confirmation
“Confirmed: {date} at {time}. If you need to reschedule, reply here. Reply STOP to opt out.”

4) Missed-call text-back
“Sorry we missed you—this is {business_name}. What’s a good time to call you back?”

5) Re-engagement (only if you have consent + recent inquiry)
“Hi {first_name}, checking in—do you still want help with {service}? Reply YES and we’ll schedule, or NO to close this out. Reply STOP to opt out.”

Content guardrails (deliverability)
- Do not use: “FREE!!!”, “limited time”, “guaranteed”, excessive punctuation, all-caps, link shorteners.
- Keep under ~160 chars when possible.
- Personalize (first name + service) to reduce filtering.
- Avoid sending repeated messages with identical content.

C) STOP/HELP Handling (Engineering Spec — Twilio webhook style)

Goal
Ensure any recipient can opt out immediately and permanently (until re-consent), and can request help info. This is a hard compliance requirement.

Keywords (case-insensitive, trim whitespace)
- STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO

Behavior
1) On inbound message:
- Normalize body => upper(trim(body))
- If body matches STOP keyword:
  a) Write to suppression list: {phone_number, suppressed=true, reason=keyword, keyword, timestamp_utc, lead/account identifiers}
  b) Send one final confirmation message:
     “You’re opted out from {business_name} texts. No more messages will be sent. Reply START to opt back in.”
  c) Do not send any other messages.
- If body matches HELP keyword:
  a) Respond:
     “{business_name}: help at agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
  b) Log help_request event.
- Else: proceed with qualification/booking logic.

2) Outbound send gate (must run before every send)
If phone is suppressed => block send, log event “blocked_by_suppression”.

3) Re-subscribe
If inbound body == START (or YES, if you choose) then mark suppressed=false ONLY if you have an explicit re-consent flow. Minimum viable: accept START as re-consent and log {keyword=START, timestamp_utc}.

Audit logging (minimum viable schema)
- message_event_id
- direction (inbound/outbound)
- phone_number
- body_hash (store hash if you prefer not to store full body)
- keyword_detected (STOP/HELP/START/none)
- consent_status_at_send
- timestamp_utc
- lead_id/account_id/source

D) Quiet Hours (minimum viable)

Goal
Avoid sending messages at night in the lead’s local time.

Rules
- Default quiet hours: 9:00 PM – 8:00 AM lead local time
- If timezone unknown: assume the business’s timezone OR default to America/New_York; never send between 9 PM–8 AM in that assumed timezone.
- If a message is triggered during quiet hours: queue it for 8:05 AM next valid day.
- Emergency override (optional): allow manual “send anyway” only for owner/admin, and log override.

Timezone resolution order
1) Explicit timezone captured on lead (best)
2) Lead ZIP/state => map to timezone (good enough for pilots)
3) Business default timezone

E) Consent Logging (what agencies must pass to us)

Minimum fields
- phone_number
- consent_provided (true/false)
- consent_source (webflow/typeform/meta)
- consent_timestamp_utc
- consent_language_version (e.g., meta_v1)
- consent_page_url OR ad_id/form_id
- ip_address (if available)

F) Agency Go‑Live Checklist (copy/paste)

1) Forms/ads
- Add the opt-in disclosure text (Section A) and required checkbox where possible.
- Ensure the Privacy Policy link is set in Meta Lead Forms.

2) Data mapping into Lead Response Copilot
- Ensure we receive: name, phone, service requested, location (ZIP), consent fields.

3) Test STOP/HELP
- Submit a test lead with your phone.
- Confirm you receive the first message.
- Reply HELP => confirm you get help text.
- Reply STOP => confirm you get opt-out confirmation.
- Trigger another message => confirm it is blocked.

4) Quiet hours test
- Temporarily set quiet hours window to include “now” in staging.
- Trigger a message => confirm it queues.
- Confirm it sends after window ends.

Support
For implementation questions, contact agent_bob_replit+lead-copilot@agentmail.to and reference the site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.
