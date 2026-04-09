# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Pack (Pilot-Safe Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:20:18.785Z

---

Below is a pilot-safe, minimum-viable compliance + deliverability pack for Local Lead Response Copilot (Instant SMS + AI Qualification). It’s designed to remove the most common sales objections (TCPA/CTIA, STOP handling, quiet hours) and reduce carrier filtering while keeping implementation lightweight.

BUSINESS LEGITIMACY LINKS (use in all collateral)
- Website (share to prove legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to
- Terms URL: [PUBLISH AND INSERT]
- Privacy URL: [PUBLISH AND INSERT]

1) MINIMUM REQUIRED CONSENT (WHAT WE MUST CAPTURE)
Capture and store, per lead:
- phone_e164, timestamp_utc, source (webflow/typeform/meta/manual), form_url/ad_id
- consent_text_version (hash or version number of the opt-in language)
- ip_address (if available), user_agent (if available)
- proof fields: checkbox_value (true/false) OR ‘by submitting, you agree’ text shown
- any UTM params / gclid (optional but useful)

2) COPY/PASTE OPT-IN SNIPPETS (AGENCY READY)
A) Webflow / Website form (recommended: unchecked checkbox)
Checkbox label (unchecked by default):
“I agree to receive text messages from {Business Name} about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

Under the checkbox (small text):
“By submitting, you agree to our Terms ([Terms URL]) and Privacy Policy ([Privacy URL]).”

Implementation notes:
- Store checkbox boolean + the exact text presented (consent_text_version).
- Do not gate service on marketing consent. This is operational/service messaging.

B) Typeform
Use a required “Yes/No” question (or a statement + ‘I agree’):
Prompt:
“Do you agree to receive text messages from {Business Name} about your request?”
Help text:
“Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [Terms URL] Privacy: [Privacy URL].”

C) Meta/Facebook Lead Ads (Instant Forms)
In the Lead Form “Privacy policy” and “Disclaimer” fields paste:
Disclaimer:
“By submitting this form, you agree to receive text messages from {Business Name} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [Terms URL] Privacy: [Privacy URL].”

Privacy Policy URL:
[Privacy URL]

3) FIRST MESSAGE (SAFE DEFAULT)
Send immediately after lead creation (keep short, avoid link on message #1 if possible):
“Hi {first_name} — this is {agent_name} with {Business Name}. I just got your request. Are you looking to schedule service in the next 7 days? Reply 1) Yes 2) No. Reply STOP to opt out.”

Notes:
- Avoid ALL CAPS, excessive punctuation, “FREE”, “guaranteed”, “act now”.
- Identify the business early; keep it conversational.

4) QUALIFICATION FLOW (AI-DRIVEN, BUT COMPLIANT)
Keep questions directly related to the request. Example 3-step:
Q1: “What’s the address or ZIP for the job?”
Q2: “What’s the main issue? (briefly)”
Q3: “Best time for a call: 1) Morning 2) Afternoon 3) Evening”

Booking handoff message:
“Got it. I can book you. What day works best: 1) Today 2) Tomorrow 3) This week. Reply STOP to opt out.”

If using a booking link, send it only after at least 1 user reply:
“Perfect—use this link to pick a time: {booking_link}. Reply STOP to opt out.”

5) STOP / HELP HANDLING (MUST-HAVE)
A) Keywords to treat as STOP (case-insensitive; trim punctuation):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

B) On receiving STOP keyword:
- Immediately add phone_e164 to GlobalSuppressionList.
- Mark conversation status = opted_out with timestamp.
- Send confirmation (one-time):
“You’re opted out and will no longer receive texts from {Business Name}. Reply START to resubscribe.”
- Block all future outbound messages from any workflow/campaign to that number unless they re-opt in.

C) START / UNSTOP resubscribe:
Only honor if your policy allows and you can log it.
Response:
“You’re resubscribed. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Log resubscribe event.

D) HELP keyword:
Send:
“{Business Name} texting for your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

E) Edge case rules:
- If inbound message contains both a question and “stop”, treat as STOP.
- Don’t send marketing after STOP; only the one confirmation.

6) QUIET HOURS (PILOT-SAFE DEFAULT)
Goal: no automated texts during local quiet hours unless user is actively texting.

Default quiet hours window:
- 9:00 PM to 8:00 AM recipient local time (configurable per client)

Timezone resolution order:
1) Explicit timezone captured from form (rare)
2) Phone number lookup timezone (preferred; if available)
3) Business default timezone (client setting)

Behavior:
- If a message is scheduled to send during quiet hours, queue it for next allowed time (8:05 AM local).
- If the lead texts you during quiet hours (inbound message received), you may respond for the next 15 minutes (conversation window), then revert to queuing.

Failure fallback:
- If timezone unknown, use business default timezone and err toward queuing.

7) CONSENT LOGGING (MINIMUM AUDIT TRAIL)
For every outbound SMS, store:
- message_id, to, from/sender_id, body, timestamp_utc, workflow_name, consent_record_id
For every inbound SMS, store:
- inbound_message_id, from, to, body, timestamp_utc, detected_intent (STOP/HELP/START/normal)
For opt-out events, store:
- phone_e164, opted_out_at_utc, method (keyword/manual), source_message_id

8) TWILIO DELIVERABILITY BASICS (MINIMUM)
- Use a Twilio Messaging Service (not ad-hoc numbers) to centralize compliance features.
- Enable “Smart Encoding” where appropriate; keep messages short.
- Avoid sending links in message #1; prefer after a reply.
- Keep consistent identification: business name in first message.
- Maintain low initial throughput for new numbers; ramp gradually.

A2P 10DLC note (US long code):
- For production scaling, register Brand + Campaign (A2P 10DLC) and use campaign-aligned messaging. This improves deliverability and reduces carrier filtering. Start registration once pilots are converting.

9) AGENCY HANDOFF: GO-LIVE CHECKLIST
1) Choose source: Webflow / Typeform / Meta Lead Ads.
2) Paste the appropriate opt-in snippet exactly (Section 2).
3) Ensure form captures: phone, name, service requested, zip/address (optional), consent checkbox/statement.
4) Configure quiet hours window and business timezone.
5) Turn on STOP/HELP handling globally (Section 5) and verify suppression list blocks outbound.
6) Send test lead → confirm:
   - first message includes business identification + STOP line
   - replying STOP triggers confirmation + blocks follow-ups
   - replying HELP returns support message
   - messages during quiet hours queue correctly
7) Store consent logs (Section 7) for auditability.

10) QUICK “COMPLIANCE OBJECTION” RESPONSE (PASTE INTO PROPOSALS)
“We use explicit SMS consent language on every lead source, include STOP/HELP in messaging, enforce quiet hours by recipient timezone, and maintain a suppression list and consent logs for auditing. The system is designed for service-request follow-up (not spam/blast marketing). Our legitimacy links are here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 and support at agent_bob_replit+lead-copilot@agentmail.to.”

OWNER TODO (TO REMOVE PLACEHOLDERS)
- Publish Terms + Privacy pages on the website and replace [Terms URL]/[Privacy URL] everywhere above. Once live, agencies can copy/paste without edits.
