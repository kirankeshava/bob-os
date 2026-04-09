# Local Lead Response Copilot — Minimum Viable SMS Compliance Pack (Agency Copy/Paste + Implementation Spec)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:59:18.449Z

---

Purpose (MVC for pilots)
This pack contains the minimum viable compliance + deliverability items required to safely run paid pilots for Local Lead Response Copilot (instant SMS response + AI qualification). It is designed to remove common onboarding objections (TCPA/CTIA, STOP handling, quiet hours) without over-engineering.

Business legitimacy links (use everywhere)
- Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to
- Privacy Policy URL: [PUBLISH THIS + INSERT URL]
- Terms URL: [PUBLISH THIS + INSERT URL]

1) Copy/paste opt-in language (required)
A. Webflow / Website form checkbox (recommended)
Add a required checkbox with this label:
“By checking this box, I agree to receive text messages about my request from {Business Name} at the phone number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy: {PRIVACY_URL} and Terms: {TERMS_URL}.”
Implementation notes:
- Checkbox must NOT be pre-checked.
- Store: timestamp, page URL, checkbox value, and submitted phone number.

B. Typeform (consent statement)
Add a required ‘Yes/No’ question before submission:
Question: “Text message updates?”
Yes option text:
“Yes — I agree to receive texts about my request from {Business Name}. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”
No option text:
“No — email/call only.”
Routing rule:
- If “No”, do not start SMS flow.

C. Meta/Facebook Lead Ads (privacy + custom disclaimer)
In the Lead Form:
- Add Privacy Policy link: {PRIVACY_URL}
- Add this Custom Disclaimer (one paragraph):
“By submitting this form, you agree to receive text messages from {Business Name} about your request at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL}.”

2) Default compliant SMS templates (ready to use)
Tone rules: short, transactional, no ALL CAPS, no “free/guarantee/act now”, no link shorteners.

Template 1 — First response (immediate)
“Hi {firstName}, this is {agentName} with {Business Name}. Got your request for {service}. What’s the address or ZIP for the job? Reply STOP to opt out, HELP for help.”

Template 2 — Qualification (1–2 questions max)
“Thanks—when do you want this done: ASAP, this week, or just pricing? Reply STOP to opt out.”

Template 3 — Book call/appointment (no calendar link required)
“Great. We can get you a quick quote. What time works today: {slot1} or {slot2}? Reply STOP to opt out.”

Template 4 — Missed call text-back
“Sorry we missed you—this is {Business Name}. Are you looking for help with {service}? Reply with 1) quote 2) schedule 3) question. Reply STOP to opt out.”

Template 5 — Nudge (only if opted-in; 1 follow-up max)
“Checking in—do you still need help with {service}? Reply YES and I’ll line up times. Reply STOP to opt out.”

HELP response (required)
“{Business Name} text support: agent_bob_replit+lead-copilot@agentmail.to. Msg frequency varies. Reply STOP to opt out.”

STOP confirmation (required)
“You’re opted out and will no longer receive texts from {Business Name}. Reply START to resubscribe.”

START confirmation (recommended)
“You’re opted back in to {Business Name} texts. Msg frequency varies. Reply STOP to opt out.”

3) STOP/HELP implementation spec (provider-agnostic; Twilio compatible)
Inbound keyword matching (case-insensitive; match whole message after trimming punctuation/spaces):
- STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO
- START keywords: START, YES (optional)
Rules:
1) If message matches STOP keyword:
- Immediately add phone number (E.164) to Global Suppression List.
- Send STOP confirmation text exactly once.
- Block all future outbound messages to that number unless START received.
2) If message matches HELP:
- Do NOT change subscription status.
- Send HELP response with support email.
3) If message matches START (or YES if enabled):
- Remove from suppression list ONLY if you have a prior opt-in record (recommended). If no opt-in record exists, reply: “We can’t text you until you opt in. Please submit the form again at {website URL}.”

Logging (minimum fields to store per event)
- lead_id (internal)
- phone_e164
- event_type (OPT_IN, MSG_OUT, MSG_IN, STOP, HELP, START, BLOCKED_SUPPRESSED)
- timestamp_utc
- source (webflow/typeform/meta/import)
- consent_text_version (string)
- consent_capture_url
- message_body (in/out)
- provider_message_id (e.g., Twilio SID)
This is enough for carrier/TCPA dispute handling and to prove suppression.

4) Quiet hours (minimum spec)
Default quiet hours window:
- 9:00pm–8:00am lead’s local time (recommended baseline)
Timezone resolution order:
1) If lead provided ZIP/address → resolve timezone from ZIP/address.
2) Else if area code mapping available → approximate timezone.
3) Else default to business timezone.
Behavior:
- If a lead submits during quiet hours: send nothing immediately; queue the first message for 8:05am local time.
- If the lead messages you during quiet hours: you may respond (they initiated), but keep it minimal.
- Admin override: allow manual send with an “override=true” flag (log it).

5) Twilio deliverability minimums (no spend assumed)
If using Twilio:
- Use a Messaging Service (not raw numbers) for better routing and compliance controls.
- Enable Advanced Opt-Out (if available) OR implement STOP/HELP via webhook as above.
- Avoid link shorteners; use full domain links.
- Keep initial message under ~240 chars.
- Don’t include promotional language; keep it clearly transactional (“about your request”).
A2P 10DLC note:
- For US long-code at scale, expect A2P Brand + Campaign registration. Start registration when the first pilot is ready; don’t block sales on it unless Twilio restricts sending.

6) Agency go-live checklist (30 minutes)
1) Add opt-in language to the form/lead source using the snippets above.
2) Ensure the lead payload includes: phone, name, service, ZIP/address (preferred), source.
3) Confirm Privacy/Terms URLs are live and inserted in disclosures.
4) Turn on STOP/HELP handling and confirm suppression list is global.
5) Turn on quiet hours (9pm–8am local) with queueing.
6) Run tests:
- Submit test lead → confirm first text sent.
- Reply HELP → confirm help message.
- Reply STOP → confirm opt-out + future messages blocked.
- Reply START → confirm re-opt-in (if allowed).
For support, contact: agent_bob_replit+lead-copilot@agentmail.to and reference the product site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
