# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Agency + Engineering)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T05:34:32.553Z

---

Purpose (wartime MVP)
This document provides the minimum compliance + deliverability requirements to safely run pilots for Local Lead Response Copilot (instant SMS + AI qualification for local leads). Goal: avoid carrier enforcement, TCPA/CTIA complaints, and churn while moving fast.

Business legitimacy references (use in onboarding)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Compliance checklist (MVP launch blockers)
A. Consent capture required (no consent = do not text)
- Lead form must include explicit SMS consent disclosure.
- Consent must mention: automated texts, that consent is not a condition of purchase, message frequency, STOP to opt out, HELP for help.
- Store proof: timestamp, source, IP/user agent when available, and the exact consent language version.

B. STOP/HELP handling required (must work on day 1)
- Any inbound “STOP” (and common variants) must immediately suppress further messaging.
- “HELP” must return support contact and opt-out reminder.
- A global suppression list must be enforced across all workflows and campaigns.

C. Quiet hours required
- Default: only send messages 8:00am–8:00pm recipient local time.
- Outside window: queue the message and send at next window open (unless explicitly marked “urgent admin,” recommended off by default).

D. Content guardrails (deliverability)
- Avoid URL shorteners, excessive punctuation, ALL CAPS, repeated “free!!!”, “act now,” and misleading claims.
- Identify the business in the first message (or first two) to reduce spam complaints.

2) Copy/paste opt-in language (for forms/ads)
IMPORTANT: Replace {BUSINESS_NAME} and {PRIVACY_URL}/{TERMS_URL} once live pages exist.

2.1 Webflow / website form consent checkbox
Checkbox label:
“I agree to receive text messages from {BUSINESS_NAME} about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”

Recommended implementation notes:
- Use an unchecked checkbox (opt-in) or a required explicit consent toggle.
- Log whether it was checked and store the exact label text (version).

2.2 Typeform consent (statement + required yes/no)
Statement:
“By providing your phone number, you agree to receive automated text messages from {BUSINESS_NAME} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”
Question:
“Do you agree to receive text updates about your request?”
- Choices: “Yes, I agree” / “No”
- If “No”: do not send SMS; route to email/call-only.

2.3 Meta/Facebook Lead Ads (Privacy Policy + custom disclaimer)
- Ensure Privacy Policy URL is set in the Lead Ad.
- Add to the “Custom disclaimer” (or equivalent field):
“{BUSINESS_NAME} may contact you by automated text about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required for purchase. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”

3) Minimum compliant message templates (low-spam)
3.1 First response (immediate)
“Hi {first_name}—this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. What’s the address (or ZIP) for the job? Reply STOP to opt out, HELP for help.”

3.2 Qualification Q2 (after location)
“Thanks. When are you looking to get this done—today/tomorrow, this week, or just pricing? Reply STOP to opt out, HELP for help.”

3.3 Booking prompt
“Perfect. Want to book a quick call or an on-site estimate? Reply 1 for call, 2 for estimate. STOP to opt out, HELP for help.”

3.4 Booking confirmation
“You’re booked for {time_window}. If anything changes, reply here. {BUSINESS_NAME}. STOP to opt out, HELP for help.”

3.5 Missed-call textback (if applicable)
“Sorry we missed you—this is {BUSINESS_NAME}. What’s the best time to call you back? STOP to opt out, HELP for help.”

4) STOP/HELP handling implementation spec (Twilio-style)
4.1 Keywords
Normalize inbound body: trim, uppercase, remove punctuation.
Treat as STOP intent if matches any of:
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Treat as HELP intent if matches:
HELP, INFO
Also support START/UNSTOP for re-subscribe only if you have a compliant re-opt-in policy; otherwise reply directing them to re-submit the form.

4.2 Required behavior
On STOP intent:
- Immediately mark phone as “suppressed=true” in Global Suppression.
- Record event: phone, timestamp, channel, messageSid (if Twilio), rawBody, normalizedBody, source (inbound).
- Send one confirmation message:
“{BUSINESS_NAME}: You’re opted out and will no longer receive texts. Reply HELP for help.”
- Block all future outbound messages to suppressed numbers.

On HELP intent:
- Do NOT suppress.
- Reply:
“{BUSINESS_NAME}: For help, email agent_bob_replit+lead-copilot@agentmail.to or reply with your question. Reply STOP to opt out.”

4.3 Consent + audit logging (minimum schema)
Store these fields per lead:
- lead_id
- phone_e164
- consent_status (opted_in | opted_out | unknown)
- consent_source (webflow | typeform | facebook | manual)
- consent_timestamp
- consent_language_version (hash or stored text)
- consent_capture_metadata (ip, user_agent, page_url where possible)
- opt_out_timestamp (nullable)
- last_inbound_message_at, last_outbound_message_at

5) Quiet hours by timezone implementation spec
5.1 Default window
- Allowed send window: 08:00–20:00 recipient local time.
- If outside window: queue outbound message with “deferred_until” = next allowed window start.

5.2 Timezone resolution order
1) Explicit timezone from lead form (if captured)
2) Area code inference (approximate; treat as fallback)
3) Business timezone default (worst-case fallback)

5.3 Daylight savings
- Use IANA timezone IDs where possible (e.g., America/Chicago) to handle DST automatically.

5.4 Edge cases
- Unknown timezone: default to business timezone and keep messaging conservative.
- Multiple queued messages: send only the latest “current” prompt when window opens (avoid bursts).

6) Twilio deliverability (MVP guidance)
- Use a Messaging Service (instead of a raw number) to manage sender selection, throughput, and compliance features.
- Brand identity: first message should include business name to reduce spam complaints.
- Avoid link shorteners and high-risk terms (e.g., “guaranteed,” “winner,” “credit,” “loan,” “click now”).
- If using long codes at scale, prepare for A2P 10DLC brand/campaign registration; for pilots keep volume low and consent airtight.

7) Agency go-live checklist (copy/paste)
- Confirm consent language is present in the lead source (Webflow/Typeform/FB Lead Ads).
- Confirm Privacy/Terms URLs are set (or temporarily omit links but keep consent language; add links ASAP).
- Send 3 test leads to verify:
  1) First message sent immediately
  2) Reply STOP -> opt-out confirmation + no further texts
  3) Reply HELP -> help message with agent_bob_replit+lead-copilot@agentmail.to
- Verify quiet hours: set a test lead timezone and attempt send outside window; message should queue.

If an agency or customer asks “is this compliant?”
“Yes—our default setup captures explicit opt-in, honors STOP/HELP automatically, enforces quiet hours, and logs consent + opt-out events for auditability. We also follow carrier deliverability best practices (business identification, no spammy phrasing, messaging service configuration) to reduce filtering and account risk.”
