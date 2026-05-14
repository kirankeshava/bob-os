# Local Lead Response Copilot — Minimum‑Viable SMS Compliance Pack (Agency Copy/Paste + MVP Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:38:59.554Z

---

Business legitimacy links (use in forms/ads/templates)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) Minimum‑Viable Compliance (MVC) Checklist (for pilots)
A. Consent capture
- Must be explicit: user agrees to receive SMS about their inquiry.
- Must disclose: “Msg & data rates may apply”, frequency disclosure (“up to X/msg per …” or “varies”), STOP/HELP instructions.
- Must capture timestamp + source (form name/ad) + page URL (if available).

B. STOP/HELP handling
- Must honor STOP immediately and block all future sends (global suppression).
- Must support HELP with clear instructions + support email.
- Must log STOP/START/HELP events and keep an audit trail.

C. Quiet hours
- Must not send first outreach or automated follow-ups during quiet hours.
- Queue messages to next local business window.

D. Content guardrails
- No “free”, “guarantee”, “act now”, excessive punctuation/caps.
- Prefer one link max; use your own domain when possible.
- Identify the business in the first message.

2) Copy/Paste Opt‑In Language Snippets (Agencies)

2.1 Webflow (checkbox below the form submit)
Add a checkbox (unchecked by default) labeled:
“I agree to receive text messages about my request.”

Add this disclosure text under the checkbox:
“By checking this box, you consent to receive SMS messages from [Business Name] about your inquiry, including appointment scheduling and request updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. See Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (support: agent_bob_replit+lead-copilot@agentmail.to).”

Required fields to capture (hidden fields OK):
- phone
- first_name
- service_requested (or job type)
- consent_checkbox = true
- consent_text_version (e.g., “webflow_v1”)
- page_url
- submitted_at (ISO timestamp)

2.2 Typeform
Add a Yes/No question (required):
“Do you agree to receive text messages about your request?”

Add description (small text):
“By selecting Yes, you consent to receive SMS from [Business Name] related to your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”

Store:
- answer (Yes)
- timestamp
- form name/id

2.3 Meta/Facebook Lead Ads
In the lead form “Privacy policy” link field, use:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Add to “Custom disclaimer” (or questions/description if disclaimers unavailable):
“By submitting, you consent to receive SMS from [Business Name] about your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to.”

3) Default Message Templates (MVC-safe)

3.1 First response (immediate)
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. What’s the address (or ZIP) for the job?”

3.2 Qualification follow-up
“Thanks. When would you like us to come out: {option_1} or {option_2}?”

3.3 Booking confirmation
“Confirmed for {day} at {time}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

3.4 Missed-call text back
“Hi {first_name} — sorry we missed you. This is {business_name}. What’s the best time today to call you back?”

3.5 Re-engagement (1x only, 3–7 days later)
“Hi {first_name} — still need help with {service}? If yes, reply 1 and we’ll schedule. Reply STOP to opt out.”

4) STOP/HELP/START Handling — MVP Implementation Spec (Twilio-compatible)

4.1 Keywords to recognize (case-insensitive, trim punctuation)
- STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO
- START keywords: START, YES, UNSTOP

4.2 Behavior
On STOP keyword:
1) Add phone number (E.164) to global suppression list immediately.
2) Send one confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
3) Block all future outbound messages to that number across all workflows and clients until START.
4) Log event: type=STOP, timestamp, source=inbound_sms, message_sid, raw_body.

On HELP keyword:
1) Do not suppress.
2) Send:
“{business_name} SMS support: reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
3) Log event: type=HELP.

On START keyword:
1) Remove from suppression list.
2) Send:
“You’re resubscribed to {business_name} texts. Msg frequency varies. Reply STOP to opt out.”
3) Log event: type=START.

4.3 Outbound send gate
Before sending any outbound SMS:
- If number is suppressed => do not send; log “blocked_suppressed”.
- If within quiet hours => queue to next window; log “queued_quiet_hours”.

5) Quiet Hours — MVP Implementation Spec

5.1 Default quiet hours (pilot-safe)
- Do not send automated SMS between 8:00 PM and 8:00 AM recipient local time.
- If timezone is unknown: default to the business’s timezone (config), and only send between 9:00 AM–6:00 PM business local time.

5.2 Timezone resolution order
1) Explicit timezone captured on lead (if form has it).
2) Phone number area-code mapping (best-effort).
3) Default business timezone.

5.3 Queue behavior
- If a message is triggered during quiet hours, schedule it for next allowed window (e.g., 8:05 AM local).
- If multiple queued messages exist, send only the newest contextual one (avoid bursts).

6) Twilio Deliverability Runbook (Pilot)

6.1 Messaging Service
- Use a Messaging Service (even for small volume) to centralize opt-out/advanced features.
- Enable Smart Encoding.
- Avoid URL shorteners; use full domain links.

6.2 Content do/don’t
- Do: include business name early; keep messages under 320 chars; one clear question.
- Don’t: all-caps, repeated exclamation marks, aggressive sales language, multiple links, “free/guaranteed/act now”.

6.3 If filtering occurs (symptoms: delivered but no replies; sudden delivery failures)
- Reduce link usage; remove marketing phrasing.
- Slow down follow-ups; keep 1 re-engagement max.
- Verify opt-in text present on the lead source.
- Escalate with: example Message SIDs + opt-in proof + website URL.

7) Agency “Launch in 30 Minutes” Handoff Steps
1) Paste the opt-in disclosure (section 2) into the client’s form/lead source.
2) Ensure consent checkbox/question is required (or the strongest available equivalent on FB forms).
3) Confirm the system stores: phone, consent=true, timestamp, source.
4) Turn on STOP/HELP handling exactly as in section 4.
5) Turn on quiet hours as in section 5.
6) Send a test lead to yourself and verify:
   - Immediate first message
   - Reply STOP => receive opt-out confirmation; further messages blocked
   - Reply HELP => receive help text
   - Trigger a message during quiet hours => queued to next window
7) For any compliance questions, forward screenshots and timestamps to agent_bob_replit+lead-copilot@agentmail.to and reference the website URL above.

Verification mini-matrix (quick)
- Inbound “STOP” => suppressed=true, confirmation sent, outbound blocked.
- Inbound “HELP” => help response sent, suppressed=false.
- Inbound “START” after STOP => suppressed=false, confirmation sent.
- Outbound send at 9:30 PM local => queued, not sent.
