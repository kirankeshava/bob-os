# Local Lead Response Copilot — Minimum‑Viable SMS Compliance & Deliverability Pack (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:32:52.761Z

---

Purpose (MV scope)
This pack covers only what prevents pilot churn, carrier blocks, and common sales objections: (1) explicit SMS consent language, (2) STOP/HELP handling, (3) quiet hours, (4) consent logging, and (5) safe message templates. It is designed for agencies launching quickly for home services/local businesses.

Legitimacy / Support (include in partner materials)
• Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
• Support: agent_bob_replit+lead-copilot@agentmail.to

1) Copy/Paste Opt‑In Language (Forms / Ads)
A. Webflow / Website Form Checkbox + Disclosure (recommended)
Add a required checkbox field:
[ ] “I agree to receive text messages about my request.”
Add below the submit button (or near phone field):
“By submitting, you agree to receive text messages about your request from {BUSINESS NAME} at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy Policy: {PRIVACY_URL} and Terms: {TERMS_URL}.”
Implementation notes:
• The checkbox must not be pre-checked.
• Store timestamp, page URL, and checkbox value (true/false).

B. Typeform (no true checkbox enforcement for all designs; use statement + required question)
1) Add a required Yes/No question:
Question: “Do you agree to receive text messages about your request?” (Required)
Choices: “Yes, I agree” / “No”
2) Add statement text near phone capture:
“Texts relate to your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”
Gating rule: If “No” → end form or route to email-only follow-up.

C. Meta/Facebook Lead Ads (lead form disclaimer)
In the “Disclaimer” / “Privacy Policy” section include:
“By submitting, you agree to receive text messages about your request from {BUSINESS NAME} at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Link the form’s Privacy Policy URL to {PRIVACY_URL} (and include Terms link if Meta allows in your flow).

2) Minimum‑Viable Message Templates (safe phrasing; include STOP/HELP early)
General rules:
• Identify the business in message 1.
• Keep it transactional: reference the user’s request.
• Avoid “free”, “guaranteed”, excessive caps, repeated links, and URL shorteners.
• If including a link, use a branded/owned domain when possible (or omit link for MV).

Template 1 — First Response (within 0–60 seconds)
“Hi {first_name}, this is {agent_name} with {business_name}. I got your request for {service}. What’s the address or zip code for the job?”
(If you must include disclosure in message 1 for some flows)
“Reply STOP to opt out, HELP for help.”

Template 2 — Qualify (2–3 quick questions)
“Thanks. When would you like us to come out—today, this week, or next week?”
“Any photos or details you can share about the issue?”

Template 3 — Booking Prompt
“I can get you on the schedule. What’s a good time for a quick call: {time_window_1} or {time_window_2}?”

Template 4 — Confirmation
“Perfect—scheduled for {appt_day} at {appt_time}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

Template 5 — Missed Call / Text-Back
“Hi {first_name}, sorry we missed you—this is {business_name}. Are you still looking for help with {service}? If yes, what’s the address or zip code?”

Template 6 — Re-engagement (48–72 hours, one attempt)
“Hi {first_name}, checking in—do you still need help with {service}? If yes, what day works best?”

3) STOP/HELP Handling (Engineering Spec — MV)
Goal: immediate opt-out, prevent further sends, and provide help info.

A. Keywords (case-insensitive, trimmed; match whole message)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

B. Behavior
On inbound message:
1) Normalize inbound_body = uppercase(trim(body))
2) If inbound_body in STOP_KEYWORDS:
   • Set contact.sms_opt_out = true
   • Add contact to global_suppression_list with reason = “STOP”
   • Log event: type=“sms_opt_out”, channel=“sms”, provider_message_id, from_number, to_number, timestamp
   • Send confirmation (one final message allowed):
     “You’re opted out and will no longer receive text messages from {business_name}. Reply HELP for help.”
   • Block all future outbound SMS to this contact unless they later explicitly opt back in (do not auto-opt-in on random inbound texts).
3) If inbound_body in HELP_KEYWORDS:
   • Send help message:
     “{business_name} texting help: Messages relate to your request. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
   • Log event: type=“sms_help”
4) Else: proceed with normal AI qualification flow.

C. Outbound send guard (hard block)
Before every outbound SMS:
• If contact.sms_opt_out == true OR number in global_suppression_list → do not send; log “blocked_send_optout”.

D. Opt-back-in (MV)
Only allow opt-back-in via explicit consent capture in a form/CRM update (recommended), not by interpreting “START” texts unless your legal policy and flow supports it.

4) Quiet Hours (Engineering Spec — MV)
Goal: avoid messages during local night hours to reduce complaints and risk.

A. Default quiet hours window
• Do not send outbound SMS from 8:00 PM to 8:00 AM recipient local time (configurable per customer).

B. Timezone resolution order (MV, low complexity)
1) If lead includes state/zip → map to timezone (zip->tz table or lightweight service)
2) Else if customer account has a default timezone → use it
3) Else fallback to America/New_York (log “tz_fallback_used”)

C. Queued-send behavior
If message would be sent during quiet hours:
• Queue it for the next allowed time (e.g., 8:05 AM local)
• If multiple messages are queued, send only the most recent “next step” message (avoid burst at 8 AM)

D. Exceptions (MV)
• Manual human send override: allowed only for numbers with documented consent and only if user last engaged within 24 hours.

5) Consent Logging (MV schema)
Store per lead/contact:
• phone_e164
• consent_status: opted_in | opted_out | unknown
• consent_source: webform | typeform | meta_lead_ads | manual
• consent_text_snapshot: the exact disclosure shown (string)
• consent_timestamp_utc
• consent_page_url (or form name)
• ip_address (if available)
• user_agent (if available)
• opt_out_timestamp_utc (if applicable)
• opt_out_source: STOP | admin_action

6) Agency Go‑Live Checklist (copy/paste)
1) Add explicit SMS consent disclosure + checkbox (or required yes/no) to the lead source.
2) Ensure Privacy/Terms links are present: {PRIVACY_URL}, {TERMS_URL} (publish these pages before scaling).
3) Turn on STOP/HELP handling and verify:
   • Text STOP → receives opt-out confirmation → further sends are blocked.
   • Text HELP → receives help info.
4) Enable quiet hours 8pm–8am local time and confirm queued behavior.
5) Send a test lead through the full flow (first response, 2 questions, booking prompt, confirmation).
6) Keep message content transactional (reference the request; avoid heavy promos).

Owner note: Once you confirm the provider/webhook (Twilio Messaging vs Conversations) I can map the STOP/HELP logic to the exact parameters/events and produce a final “verified” test log example set.
