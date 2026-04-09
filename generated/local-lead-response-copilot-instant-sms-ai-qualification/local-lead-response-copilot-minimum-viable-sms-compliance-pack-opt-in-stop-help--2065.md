# Local Lead Response Copilot — Minimum Viable SMS Compliance Pack (Opt‑In + STOP/HELP + Quiet Hours + Consent Logging) + Agency Copy/Paste Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:32:09.457Z

---

Purpose (MV Compliance Only)
This pack covers the minimum needed to avoid pilot-killing compliance/deliverability issues (TCPA/CTIA basics + carrier expectations): (1) explicit opt-in language, (2) STOP/HELP handling, (3) quiet hours, (4) consent logging. It is designed for agencies to copy/paste into forms and follow-up flows without touching core product logic beyond webhook handling.

Business legitimacy references (use in proposals / onboarding)
• Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
• Support email: agent_bob_replit+lead-copilot@agentmail.to

1) Copy/Paste Opt‑In Language (use exactly or adapt lightly)
Core requirements:
• Must disclose automated SMS.
• Must disclose msg frequency range.
• Must disclose “Msg & data rates may apply”.
• Must disclose STOP/HELP.
• Must link Terms + Privacy (use your published URLs).

1A) Webflow / Website form checkbox (recommended)
Add a required checkbox next to the phone field:
Checkbox label:
“I agree to receive automated text messages from [BUSINESS NAME] about my request and related services. Msg frequency varies (typically 1–4). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Implementation notes:
• Store checkbox value + timestamp + page URL.
• If unchecked, do not send SMS.

1B) Typeform (phone + consent)
Question copy (Short text / Statement + Yes/No):
“SMS Consent: By checking ‘Yes’, you agree to receive automated text messages from [BUSINESS NAME] about your inquiry. Msg frequency varies (1–4). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Answer options: Yes / No
Routing rule: If No → still accept lead, but disable SMS; email/call only.

1C) Meta / Facebook Lead Ads
A) Use Meta’s SMS consent toggle if available.
B) Add a custom disclaimer (best-effort within Meta constraints):
“By submitting, you agree to receive automated texts from [BUSINESS NAME] about your request. Msg frequency varies (1–4). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

2) First Message Template (compliant + deliverability-friendly)
Send immediately after form submission.
Template:
“Hi {first_name}, it’s {agent_name} with {business_name}. Got your request for {service_requested}. What’s the address (or ZIP) for the job?”
Follow-up line (optional, only if needed for compliance in your flow):
“Reply STOP to opt out, HELP for help.”
Notes:
• Avoid ALL CAPS, excessive punctuation, “FREE!!!”, and URL shorteners.
• Keep it conversational; one question at a time.

3) STOP/HELP Handling (implementation spec)
Scope: Applies to all outbound numbers/campaigns for a given customer account.

3A) Keywords to treat as opt-out (case-insensitive; trim whitespace/punctuation)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

Behavior on inbound STOP keyword:
1) Immediately mark recipient as “suppressed=true” in a global suppression list for that customer.
2) Do not send any more outbound messages to that recipient unless they later re-opt-in.
3) Send ONE confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to opt back in. HELP for help.”
4) Log the event (see Consent Logging below).

3B) HELP keywords
HELP, INFO, SUPPORT
Behavior:
Send:
“{business_name}: We text about your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

3C) START keyword (optional re-opt-in)
START, YES, UNSTOP
Behavior:
• Only re-enable if you have evidence of prior opt-in OR you treat START as a new opt-in.
• Log re-opt-in event with timestamp.
Confirmation:
“You’re opted back in. Reply STOP to opt out, HELP for help.”

3D) Enforcement
Before any outbound send:
• Check suppression list. If suppressed → block send and log “blocked_due_to_optout”.

4) Quiet Hours (minimum viable spec)
Goal: Avoid texting late night/early morning in the lead’s local time. If timezone is unknown, behave conservatively.

4A) Quiet window
Default: Do not initiate new outbound messages between 9:00 PM and 8:00 AM recipient-local time.

4B) Timezone resolution order
1) Lead-provided state/ZIP (if captured) → map to timezone.
2) Business default timezone (configured per customer).
3) If unknown: assume recipient is in business timezone and apply quiet hours.

4C) If message would send during quiet hours
• Queue it and send at next allowed time (8:05 AM local).
• If it’s an operational confirmation triggered by an inbound message (lead texts you first), you may respond immediately (but still include STOP/HELP compliance lines if required).

5) Consent Logging (minimum fields for audit + disputes)
Store these fields per lead/phone number:
• phone_e164
• consent_status: opted_in | opted_out
• consent_source: webflow_form | typeform | meta_lead_ad | manual
• consent_text_version: string (e.g., “v1.0-2026-04-09”)
• consent_timestamp_utc
• consent_page_url (or lead ad id)
• ip_address (if available)
• user_agent (if available)
• last_optout_timestamp_utc (if any)
• stop_keyword_received (raw message)

6) Agency Handoff: 30-minute go-live checklist
A) Update the form/lead source
1) Add the opt-in checkbox/disclaimer (use snippets above).
2) Ensure phone is required and formatted.
3) Capture: first name, service requested, ZIP/state (helps timezone), consent yes/no.

B) Configure the follow-up flow
1) First message = template in Section 2.
2) Qualification = 1 question at a time; no links until user responds.

C) Verify STOP/HELP quickly (before sending real traffic)
Send test inbound texts to the pilot number:
• Text “STOP” → confirm opt-out confirmation message + suppression.
• Attempt outbound send → confirm it is blocked.
• Text “HELP” → confirm help message.
• Text “START” → confirm re-opt-in behavior (if enabled).

D) Reference legitimacy in client comms
Include:
• Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
• Support: agent_bob_replit+lead-copilot@agentmail.to

7) Deliverability Content Guidelines (minimum)
• Keep initial messages under ~160 characters where possible.
• No link shorteners; avoid sending links in the first message.
• Avoid spammy terms: “urgent”, “guaranteed”, “act now”, excessive emojis, ALL CAPS.
• Identify the business in the first message.
• Always honor opt-outs instantly.

Owner/Engineering note (what I need to ‘verify’ STOP/HELP fully)
To validate end-to-end, I need the actual inbound SMS endpoint type in use (Twilio Messaging webhook vs Conversations) and the current data store for suppression/consent. Once confirmed, run the test steps above and save: one inbound payload sample + one log line showing suppression applied + one blocked outbound attempt log.
