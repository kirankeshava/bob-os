# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:47:03.492Z

---

Purpose (wartime / pilots): This is the minimum viable compliance + deliverability package to launch free pilots without carrier/TCPA surprises. It focuses on (1) clear opt-in language, (2) mandatory STOP/HELP handling, (3) quiet hours, and (4) basic deliverability hygiene. Business legitimacy links/support: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to

1) Copy/paste opt-in language (forms)
Use this near the phone field + on the submit button area.
• Short (when space is tight):
“By submitting, you agree to receive texts from [Company] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
• Standard (preferred):
“By providing your phone number, you consent to receive SMS messages from [Company] regarding your inquiry, scheduling, and service updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Typeform: Put the Standard language in the “Legal” / “Disclaimer” text and add a required checkbox: “I agree to receive text messages as described above.” Store checkbox=true.
Webflow: Add a required checkbox input named “sms_consent” with the same label; store timestamp + page URL.

2) Meta/Facebook Lead Ads (copy/paste)
• Lead form “Disclaimer” (custom):
“By submitting, you agree to receive SMS from [Company] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
• Intro/description line (optional): “We’ll text you right away to confirm details and scheduling.”

3) Required first outbound SMS (must include business identity + STOP)
Send immediately after lead capture.
Template A (service request):
“Hi {first_name}, this is {agent_name} with {business_name}. Got your request for {service}. What’s the address/zip for the job? Reply STOP to opt out.”
Template B (missed call text-back):
“Hi {first_name} — missed your call. This is {agent_name} with {business_name}. What can we help with and what’s the job address/zip? Reply STOP to opt out.”

4) STOP / HELP handling (engineering spec)
Keywords (case-insensitive, trim punctuation):
• STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
• HELP set: HELP, INFO, SUPPORT
Behavior:
A) On inbound STOP keyword:
1. Immediately mark phone as opted_out=true in a GLOBAL suppression list (applies across all client subaccounts/locations unless separate legal entities).
2. Log event: type=opt_out, source=inbound_sms, keyword, timestamp_utc, messaging_provider_message_sid.
3. Send one final confirmation (required):
“You’re unsubscribed from {business_name} texts. No more messages will be sent. Reply HELP for help.”
4. Block all future outbound to that phone unless/until explicit re-consent is captured (new consent record).

B) On inbound HELP keyword:
Send:
“{business_name}: For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Msg & data rates may apply.”
Log event: type=help_request, timestamp_utc.

C) Keyword precedence:
If message contains STOP + other text, treat as STOP. If HELP + other text (no STOP), treat as HELP.

5) Quiet hours (minimum viable spec)
Goal: avoid texting consumers at night while preserving “speed-to-lead.”
Default quiet hours window (local recipient time): 8:00 PM – 8:00 AM.
Timezone resolution order:
1) If lead includes state/zip → map to timezone.
2) Else if business/location timezone known → use that.
3) Else default to America/New_York (and flag unknown_tz=true).
Rules:
• If lead arrives during allowed hours: send immediately.
• If lead arrives during quiet hours: queue initial SMS for next allowed time (8:05 AM local). Do not send repeated retries overnight.
• Owner override: if lead_source is “emergency” (optional toggle) allow sending until 9:30 PM local; otherwise respect quiet hours.
Logging: store computed_timezone, local_send_time, queued=true/false.

6) Consent logging (minimum required fields)
Store on lead creation:
• phone_e164
• consent_status: opted_in | opted_out
• consent_source: webform | typeform | fb_lead_ad | inbound_text | manual
• consent_text_shown (the exact disclaimer string)
• consent_checkbox (true/false if used)
• consent_timestamp_utc
• consent_page_url (or lead_form_id)
• ip_address (if available)
Store opt-out events similarly (see STOP spec).

7) Deliverability guardrails (pilot-safe)
• Always identify the business in message 1.
• Avoid spam phrasing: “free”, “act now”, “urgent offer”, “click here”, excessive ALL CAPS, multiple exclamation marks.
• Keep links minimal; prefer a single branded domain link when necessary.
• Frequency cap (pilot default): max 4 outbound messages within 24 hours per lead unless the lead is actively replying.
• If no response: 1 follow-up at +15 min, then +4 hrs (within quiet hours), then stop.

8) Go-live checklist (agency)
1) Add opt-in language + required checkbox (where possible).
2) Ensure first SMS template includes “Reply STOP to opt out.”
3) Confirm STOP/HELP logic is active and uses a global suppression list.
4) Turn on quiet hours queueing by timezone.
5) Run verification tests:
• Send inbound “STOP” → receive confirmation; outbound attempts blocked.
• Send inbound “HELP” → receive help text.
• Create lead at 10 PM local → initial SMS queued to 8:05 AM.

Notes on A2P 10DLC (non-blocking for early pilots): If using US long code (10DLC) at scale, register Brand + Campaign in Twilio to protect deliverability. For pilots, keep volume low and content compliant; move to registration once scaling requires it.
