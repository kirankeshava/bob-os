# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Agency Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:10:05.870Z

---

Purpose: enable fast pilot launches without carrier shutdowns or TCPA/CTIA friction. This is the minimum set of compliance + deliverability steps agencies must implement before sending any SMS.

Business legitimacy references (include wherever possible):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) REQUIRED OPT‑IN LANGUAGE (copy/paste)
A) Webflow / Website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages from [BUSINESS NAME] about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Under checkbox (small text):
“By submitting, you consent to receive SMS related to your inquiry at the number provided. See Terms & Privacy: [TERMS_URL] | [PRIVACY_URL].”
Implementation notes:
- Checkbox must be unchecked by default.
- Store: timestamp, IP (if available), form URL, checkbox value, phone, and consent language version.

B) Typeform
Add a required “Yes/No” question before submission:
Question: “Do you agree to receive texts about your request?”
Yes option text:
“Yes — I consent to receive SMS from [BUSINESS NAME]. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
No option: “No” (If “No”, do not text; route to email-only follow up.)

C) Meta / Facebook Lead Ads (primary text + disclaimer)
Primary text (ad):
“Request a quote. We’ll text you within 1 minute to confirm details.”
Lead form disclaimer (custom disclaimer or completion screen):
“By submitting, you agree to receive text messages from [BUSINESS NAME] about your request at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

2) FIRST MESSAGE TEMPLATE (compliant, low-spam)
Send immediately after lead submission (or missed call). Keep it plain and specific.
Template:
“Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. We got your request for {{service_type}}. What’s the address for the job?”
Follow-up line (include in same message or next message if you prefer brevity):
“Reply STOP to opt out, HELP for help.”
Guidelines:
- Avoid: “FREE”, “WIN”, “URGENT”, excessive punctuation/emoji, all caps, shortened links.
- Keep under ~320 chars when possible.

3) STOP / HELP HANDLING (must work before any pilot)
A) Keyword matching (case-insensitive; trim whitespace/punctuation)
STOP keywords (minimum): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO
Recommended: also handle START / UNSTOP to resubscribe.

B) Required behaviors
On inbound STOP keyword:
1) Add phone number to a GLOBAL suppression list (across all subaccounts/clients if using shared sender).
2) Immediately send confirmation:
“You’re unsubscribed from {{business_name}} texts. No more messages will be sent. Reply START to resubscribe or email agent_bob_replit+lead-copilot@agentmail.to.”
3) Block all future outbound sends to that number unless they explicitly re-opt-in or text START.

On inbound HELP keyword:
Send:
“{{business_name}}: We text about your recent request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

On inbound START/UNSTOP:
1) Remove from suppression list only if you have an opt-in record OR treat START as a new opt-in event and log it.
2) Confirm:
“You’re re-subscribed to {{business_name}} texts. Reply STOP to opt out.”

C) Logging (for audits + disputes)
Log an immutable event record for each inbound STOP/HELP/START:
- phone_e164, keyword, message_sid/provider_id, timestamp_utc, client_id, sender_id, raw_body (redact if needed)
- suppression_status_after (true/false)

4) QUIET HOURS (minimum viable)
Goal: do not send marketing/lead follow-up texts during late-night hours in the lead’s local timezone.
Default rule (recommended): Do not send outbound SMS 8:00 PM–8:00 AM lead-local time.
Timezone resolution order:
1) If lead provides ZIP/address → map to timezone.
2) Else infer from area code (best effort).
3) Else default to the business’s timezone.
Behavior:
- If a lead arrives during quiet hours, enqueue the first message to send at 8:05 AM local time.
- Exception: If the lead texts you first during quiet hours, you may respond in-session (log as “user-initiated”).

5) DELIVERABILITY MINIMUMS (Twilio-friendly)
- Use a Messaging Service (if on Twilio) so you can manage sender(s), compliance features, and throughput.
- Keep content consistent: identify the business, reference the specific request, ask 1 short question.
- Avoid URL shorteners; avoid sending links in the first message unless necessary.
- Keep daily volume low during pilots; ramp gradually.

6) AGENCY GO-LIVE CHECKLIST (fast)
Before launch:
[ ] Opt-in language added to the form/ad (Section 1)
[ ] Consent captured + stored (timestamp + source)
[ ] STOP/HELP auto-handling enabled (Section 3)
[ ] Quiet hours enabled (Section 4)
[ ] First message template installed (Section 2)
[ ] Support contact included in HELP response: agent_bob_replit+lead-copilot@agentmail.to

Verification test (takes 10 minutes):
1) Submit a test lead with your phone.
2) Confirm first SMS received.
3) Reply “HELP” → confirm HELP message returned.
4) Reply “STOP” → confirm unsubscribe confirmation.
5) Trigger another outbound message → confirm it is blocked.
6) Reply “START” → confirm resubscribe and outbound resumes (only if policy allows).

Owner note: Replace [TERMS_URL] and [PRIVACY_URL] with the final published links once available. Until then, use the website URL above as a temporary placeholder and avoid launching paid traffic at scale.
