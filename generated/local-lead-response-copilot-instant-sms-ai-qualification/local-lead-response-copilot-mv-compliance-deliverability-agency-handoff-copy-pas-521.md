# Local Lead Response Copilot — MV Compliance + Deliverability Agency Handoff (Copy/Paste Pack)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:52:04.292Z

---

Business proof URL (share with customers/agencies):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/Compliance email: agent_bob_replit+lead-copilot@agentmail.to

Purpose
This document lets an agency deploy Local Lead Response Copilot SMS follow-ups in a “minimum viable compliant” way for initial pilots, with guardrails to protect deliverability (carriers) and compliance (TCPA/CTIA norms). It includes opt-in language, message templates, STOP/HELP requirements, quiet hours behavior, consent logging requirements, and Twilio setup guidance.

1) Minimum Viable Compliance Checklist (pilot-ready)
A. Consent/Opt-in
- Clear disclosure at point of lead capture that the consumer agrees to receive SMS.
- Must state: message purpose (responses + scheduling), that message/data rates may apply, and how to stop (STOP) and get help (HELP).
- Must link to Privacy Policy + Terms (or include a short URL). Until the website pages are published, use the proof URL above plus “Privacy/Terms available upon request” and route requests to the support email.

B. Sender identification
- First outbound message must identify the business (the local provider) and/or the purpose (“Responding to your request”).

C. Opt-out and help
- STOP must immediately suppress further messages.
- HELP must return support info and opt-out instructions.
- Maintain a global suppression list per sending number (and ideally per business account).

D. Quiet hours
- Don’t send marketing-like SMS overnight. For pilots: enforce quiet hours 8pm–8am recipient local time (recommended), unless the user explicitly continues a conversation.

E. Consent logging
- Store proof: timestamp, source, IP/user agent (if available), form text shown, and the phone number.

2) Copy/Paste Opt-in Language Snippets
Use one of the following verbatim blocks.

2.1 Webflow / Website form checkbox (recommended)
Add an unchecked checkbox with required validation:
Checkbox label:
“I agree to receive text messages about my request, including appointment scheduling and service updates, from [Business Name] via Local Lead Response Copilot. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. See Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 (request full Terms/Privacy at agent_bob_replit+lead-copilot@agentmail.to).”

Hidden fields to include in the form submission (if possible):
- consent_sms = true
- consent_source = webflow
- consent_timestamp = {{now}} (or captured server-side)
- consent_copy_version = v1
- page_url
- ip_address (if available)

2.2 Typeform (recommended)
Add a Yes/No question: “Do you agree to receive text messages about your request?”
Description text (paste into Typeform description):
“By selecting Yes, you agree to receive text messages from [Business Name] via Local Lead Response Copilot about your request and appointment scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 (request full Terms/Privacy at agent_bob_replit+lead-copilot@agentmail.to).”
Typeform mapping requirement:
- Only trigger SMS workflow if the user selected “Yes.”

2.3 Meta/Facebook Lead Ads (higher risk; use the disclaimer)
In the Lead Form “Custom disclaimer” (or equivalent):
“By submitting this form, you agree to receive text messages about your request and appointment scheduling from [Business Name] via Local Lead Response Copilot. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 (request full Terms/Privacy at agent_bob_replit+lead-copilot@agentmail.to).”
Operational note: If Meta form cannot enforce checkbox consent, do not send SMS unless your form includes this disclosure and you log the disclaimer text/version.

3) Message Templates (compliant + deliverability-friendly)
Guidelines:
- Keep messages short, human, and specific.
- Avoid ALL CAPS, excessive punctuation, “free!!!”, “guarantee”, and URL shorteners (bit.ly) if possible.
- Identify the business early; avoid misleading language.

3.1 First message (immediate)
“Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. Got your request for {{service_requested}} in {{city}}. A couple quick questions so we can help—what’s the address (or nearest cross-street)?”
Footer for first message if needed (optional, recommended for colder sources):
“Reply STOP to opt out, HELP for help.”

3.2 Qualification (2–3 short questions max)
Q1: “When would you like this done—today, this week, or just pricing?”
Q2: “Any photos you can share, or a quick description of the issue?”
Q3 (only if needed): “What’s the best time for a call—morning/afternoon/evening?”

3.3 Booking prompt
“Thanks—want to book a quick call? Here are two times: {{slot_1}} or {{slot_2}}. Reply 1 or 2.”

3.4 Confirmation
“Booked ✅ You’re set for {{confirmed_time}}. If anything changes, reply here. Reply STOP to opt out.”

3.5 Missed call text-back (if enabled)
“Hi {{first_name}}—sorry we missed you. This is {{business_name}}. Text me what you need help with and we’ll get you scheduled.”

3.6 Re-engagement (1 attempt only, 24–72h later)
“Hi {{first_name}}—still need help with {{service_requested}}? If yes, reply with a good time for a quick call. Reply STOP to opt out.”

4) STOP/HELP Handling (implementation spec — must-do)
4.1 Keywords
- STOP keywords (case-insensitive, trimmed): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO
- START/UNSTOP (optional): START, UNSTOP, SUBSCRIBE

4.2 State machine
- Default state: SUBSCRIBED
- Upon receiving STOP keyword:
  1) Set state = STOPPED for (recipient_phone, sending_service/business) immediately.
  2) Add to suppression list (hard block outbound).
  3) Send one confirmation message (exactly once):
     “You’re opted out and will no longer receive texts from {{business_name}}. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
- Upon receiving HELP keyword:
  - Do not change subscription state.
  - Send:
    “{{business_name}} SMS help: replies about your request and scheduling. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”
- Upon receiving START/UNSTOP:
  - If previously STOPPED, set state = SUBSCRIBED and send:
    “You’re re-subscribed to texts from {{business_name}}. Reply STOP to opt out.”

4.3 Outbound enforcement
- Before sending any outbound SMS, check suppression list.
- If STOPPED, do not send; log “blocked_opt_out”.

4.4 Required audit logs (minimum)
For each inbound message:
- message_sid, from, to, timestamp, body_normalized, detected_intent (STOP/HELP/START/OTHER), resulting_state
For each outbound:
- message_sid, to, from/svc, timestamp, template_id, consent_id, send_decision (sent/deferred/blocked_opt_out/blocked_quiet_hours)

5) Quiet Hours (timezone-based) — implementation spec
Goal: Prevent outbound SMS during 8:00pm–8:00am recipient local time (recommended pilot defaults). Inbound messages can be received anytime; outbound replies should be queued if quiet hours apply.

5.1 Timezone resolution order
1) Lead-provided timezone field (if captured)
2) Zip/postal code → timezone lookup
3) Area code heuristic (fallback)
4) Default to business timezone if unknown, but mark tz_confidence=low

5.2 Rules
- Allowed window: 08:00–20:00 recipient local time.
- If an outbound message is triggered during quiet hours:
  - Queue for next allowed time (08:05 local recommended) with jitter (0–7 minutes).
  - Log send_decision=deferred_quiet_hours.
- Conversation override (optional for pilots): if recipient sent an inbound message within last 15 minutes, allow a single reply even during quiet hours (still avoid repeated sequences).

6) Consent Logging Schema (minimum fields)
Store a Consent record per phone number per business:
- consent_id
- phone_e164
- business_id
- consent_status (granted/revoked)
- consent_timestamp
- consent_source (webflow/typeform/meta/zapier/manual)
- consent_text (exact disclosure shown)
- consent_copy_version
- page_url / form_id
- ip_address, user_agent (if available)
- proof_url = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

7) Twilio Deliverability Hardening (runbook — no-spend steps)
7.1 Messaging Service
- Use a Twilio Messaging Service (instead of sending from raw numbers).
- Enable Smart Encoding.
- Configure sticky sender (recommended for conversations).
- Add opt-out keywords in Twilio AND enforce in app (belt-and-suspenders).

7.2 A2P 10DLC / Toll-free routing (pilot guidance)
- If using US long code at any scale, plan A2P 10DLC Brand + Campaign registration.
- If you need faster approval for early pilots, toll-free verification can be considered; still maintain opt-in/STOP/HELP.
- Regardless of route, keep templates consistent and avoid link shorteners.

7.3 Content do/don’t
DO:
- Include business name early.
- Ask 1 question per message.
- Keep links rare; use full domain when needed.
DON’T:
- “Free”, “Act now”, “Limited time”, excessive emojis, repeated punctuation, ALL CAPS.
- Multiple links in a single message.

7.4 Fallback behaviors
- If send fails with carrier error: retry once after 2–5 minutes.
- If repeated failures: mark lead as “sms_undeliverable” and notify via email (agent_bob_replit+lead-copilot@agentmail.to) and/or switch to email/call task.

8) Agency Implementation Steps (Zapier/Make/Webhook)
1) Ensure the lead source includes opt-in disclosure (Section 2) and captures consent=true.
2) Map fields to the Copilot trigger:
- phone, first_name, last_name, service_requested, city/zip, consent_sms, lead_source
3) Only trigger the SMS sequence if consent_sms=true.
4) Validate STOP/HELP:
- Send STOP from your phone → confirm opt-out message → attempt an outbound send → must be blocked.
- Send HELP → must receive help message.
5) Validate quiet hours:
- Trigger after 8pm local → must queue and send after 8am.

Sign-off test evidence (what to screenshot/log)
- One STOP event log: inbound STOP, state changed, suppression entry created, outbound blocked.
- One HELP event log: inbound HELP, help response sent.
- One quiet-hours deferral log: outbound deferred with scheduled send time.

If you need assistance or a compliance request from a consumer comes in, route to: agent_bob_replit+lead-copilot@agentmail.to and include the proof URL in your response: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
