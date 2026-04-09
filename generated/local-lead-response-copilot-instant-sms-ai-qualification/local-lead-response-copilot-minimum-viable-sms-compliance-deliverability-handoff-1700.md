# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Copy/Paste + Go‑Live Checklist)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T17:42:56.839Z

---

Audience: agencies + operators launching Local Lead Response Copilot for home services/local high-intent lead gen.
Proof-of-legitimacy link to share with clients: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

========================================
1) MINIMUM REQUIRED FORM/AD OPT‑IN (COPY/PASTE)
========================================
Goal: clear express written consent (TCPA/CTIA aligned) that will survive carrier reviews and reduce disputes.

A) Webflow / Website form checkbox (recommended)
Field label (checkbox):
“I agree to receive text messages about my request.”

Checkbox help text (paste under checkbox):
“By checking this box, you consent to receive SMS messages from {Business Name} about your inquiry, including appointment scheduling and updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

Required implementation rules:
- Checkbox must be unchecked by default.
- Store: checkbox boolean + timestamp + page URL + IP + user agent.

B) Typeform (single line you can paste into the form description)
“By submitting, you agree to receive SMS from {Business Name} regarding your request (appointment scheduling/updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase.”

C) Meta/Facebook Lead Ads (paste into the “Privacy policy”/disclaimer area)
“By submitting this form, you consent to receive text messages from {Business Name} about your request (scheduling/updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

If Meta requires URLs:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to
- If Terms/Privacy URLs are not yet published, do NOT invent links—publish pages first, then update.

========================================
2) FIRST MESSAGE TEMPLATE (COMPLIANT + HIGH RESPONSE)
========================================
Send within 0–60 seconds of lead capture.

Template (initial):
“Hi {first_name}—it’s {agent_name} with {Business Name}. Got your request for {service}. What’s the address or ZIP for the job? Reply STOP to opt out.”

Notes:
- Keep it human, specific to the service, and ask 1 short question.
- Avoid: ALL CAPS, excessive punctuation (!!!), link-only messages, “free”, “guaranteed”, “act now”.

Optional HELP footer (only when user asks HELP; don’t add to every message):
“{Business Name} texting about your request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Msg & data rates may apply.”

========================================
3) STOP/HELP HANDLING (MUST‑HAVE)
========================================
A) Keywords to treat as STOP (case-insensitive, trim punctuation/whitespace)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

B) Keywords to treat as HELP
HELP, INFO, SUPPORT

C) Behavior
When inbound message matches STOP keyword:
1) Immediately set contact.opted_out_sms=true
2) Add phone number to Global Suppression List (shared across all clients/subaccounts)
3) Log event: {timestamp, phone, keyword, conversation_id, client_id, message_sid/provider_id}
4) Send ONE confirmation (no marketing content):
“You’re unsubscribed and will no longer receive texts. Reply START to resubscribe.”
5) Block all future outbound SMS to that phone unless resubscribed.

When inbound message matches HELP keyword:
1) Do NOT opt out.
2) Send:
“{Business Name} help: You’re receiving texts about your request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Msg & data rates may apply.”
3) Log event.

START resubscribe (optional but recommended)
If inbound equals START/UNSTOP:
- Set opted_out_sms=false ONLY if you can prove prior consent exists in logs for that client.
- Send confirmation:
“You’re re-subscribed. Reply STOP to opt out.”

========================================
4) QUIET HOURS (MINIMUM VIABLE)
========================================
Objective: reduce complaints + comply with common “reasonable hours” expectations.

Default quiet hours (local recipient time):
- Do not send SMS between 8:00 PM and 8:00 AM.

Timezone resolution order:
1) Explicit timezone on lead record (if captured)
2) Business/service-area default timezone (agency config)
3) Phone number area code lookup (fallback)
4) If unknown: treat as business default timezone and be conservative.

Queueing rules:
- If a lead arrives during quiet hours, queue the first outbound SMS for 8:05 AM local time.
- If a live human is responding inside the product, show a warning: “Quiet hours—message will be queued unless override is enabled.”

========================================
5) CONSENT LOGGING (MINIMUM EVIDENCE)
========================================
Store these fields per lead:
- consent_sms: true/false
- consent_source: webflow | typeform | meta | manual
- consent_text_version: string (store the actual opt-in disclosure shown)
- consent_timestamp_utc
- consent_page_url (or lead-ad form id)
- ip_address, user_agent (web forms)
- provider_message_ids (for sent messages)

Why: if a carrier, Twilio, or a consumer complains, you can show who opted in, when, and what language was shown.

========================================
6) GO‑LIVE CHECKLIST (AGENCY: 60 MINUTES)
========================================
1) Confirm every lead source includes the opt-in disclosure above (and checkbox on web forms if possible).
2) Ensure the lead payload includes: phone, first name (or fallback), service type, and timezone or ZIP.
3) Send a test lead from each source and verify:
   - First SMS arrives within 60 seconds
   - STOP triggers suppression immediately (and blocks further sends)
   - HELP returns the help message
   - Lead created during quiet hours gets queued to the morning
4) Screenshot or export logs for the test (consent fields + STOP event + first outbound SID).
5) Share support contact with client: agent_bob_replit+lead-copilot@agentmail.to and legitimacy URL above.

========================================
7) DELIVERABILITY QUICK RULES (NO-DEEP-DIVE)
========================================
- Use consistent brand identification in message 1 ("it’s {agent} with {Business}").
- Keep links rare; if used, send after the recipient replies (improves filtering).
- One question per message; avoid long paragraphs.
- Do not run re-engagement blasts until A2P/10DLC posture is confirmed and opt-ins are clean.

This is intentionally “minimum viable” to ship pilots fast while preventing the common failures that cause churn: unclear opt-in, missing STOP/HELP, texting at night, and no consent evidence.