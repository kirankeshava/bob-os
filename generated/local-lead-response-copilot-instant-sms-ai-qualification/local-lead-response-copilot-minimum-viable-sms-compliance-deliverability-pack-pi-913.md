# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Pilot-Ready Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:04:41.489Z

---

Business legitimacy links (use in all client-facing assets)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

GOAL (wartime MVP)
Implement ONLY what prevents pilots from getting blocked or churning:
1) Clear opt-in disclosure at the point of lead capture
2) STOP/HELP handling + global suppression list
3) Quiet hours (basic) + timezone rules
4) Consent logging (basic) for auditability
5) Deliverability content guardrails (avoid spam filtering)

1) OPT-IN / CONSENT COPY (copy/paste)

A) Webflow (checkbox + disclosure under the form)
Disclosure text (place under phone field):
“By providing your phone number, you agree to receive text messages from [BUSINESS NAME] about your request and appointment scheduling. Message & data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. See Terms & Privacy: [TERMS_URL] | [PRIVACY_URL].”

Checkbox label (recommended):
“I agree to receive texts about my request and scheduling.”

Required field guidance:
- Phone number required
- Store timestamp, page URL, and checkbox state

B) Typeform (add to the phone question description)
“By submitting, you consent to receive text messages from [BUSINESS NAME] related to your inquiry and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

C) Meta/Facebook Lead Ads (use custom disclaimer + intro message)
Custom disclaimer:
“By submitting this form, you agree to receive SMS from [BUSINESS NAME] about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

First auto-message (must include business name + why texting):
“Hi {first_name}, it’s {agent_name} with [BUSINESS NAME]. Got your request from Facebook—can I ask 2 quick questions to get you the right quote? Reply STOP to opt out.”

2) MESSAGE TEMPLATES (compliant + deliverability-friendly)

Global template rules:
- Always identify the business in message #1
- Avoid excessive capitalization, “FREE!!!”, “urgent”, “act now”, or repeated links
- Keep links minimal (prefer one booking link only when user is engaged)
- Always honor STOP immediately; do not send after STOP

Template 1 — First contact (new lead)
“Hi {first_name}, this is {agent_name} with [BUSINESS NAME]. Thanks for reaching out—are you looking for service at {service_city}?”
Footer for first contact if required by client policy:
“Reply STOP to opt out, HELP for help.”

Template 2 — Qualification Q1 (service type)
“Which service do you need? Reply with 1) {service_a} 2) {service_b} 3) Other.”

Template 3 — Qualification Q2 (timeline)
“When do you want this done? 1) ASAP 2) This week 3) Next 2–4 weeks.”

Template 4 — Qualification Q3 (address/zip)
“What’s the ZIP code for the job site?”

Template 5 — Booking / call scheduling
“Perfect—here’s the fastest way to lock in a time: {booking_link}. If you prefer, reply with two times that work for you.”

Template 6 — Missed-call text-back
“Sorry we missed you—this is [BUSINESS NAME]. What’s a good time to call you back today? You can also book here: {booking_link}. Reply STOP to opt out.”

Template 7 — Re-engagement (one follow-up only)
“Hi {first_name}, checking in—do you still want help with {service}? If yes, reply 1 for a call or 2 for a text estimate. Reply STOP to opt out.”

3) STOP / HELP HANDLING (MVP implementation spec)

Keywords to treat as STOP (case-insensitive, trimmed, match whole word):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

Required behavior:
- On inbound STOP keyword:
  1) Immediately set contact.sms_opt_out = true
  2) Add phone number (E.164) to GLOBAL_SUPPRESSION_LIST
  3) Send ONE confirmation message:
     “You’re opted out and will no longer receive texts from [BUSINESS NAME]. Reply START to resubscribe.”
  4) Block all future outbound messages to this phone until explicit re-opt-in

START handling (optional but recommended):
- On inbound START / UNSTOP:
  - Only re-enable if you have an auditable opt-in record OR you capture a fresh opt-in via text.
  - Confirmation:
    “You’re resubscribed. Reply STOP to opt out.”

HELP handling:
- On inbound HELP:
  - Send:
    “Help: [BUSINESS NAME] texting about your inquiry/scheduling. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

Edge cases:
- If user texts STOP mid-conversation, suppression wins over all automation.
- If multiple client accounts exist, suppression must be global by phone number to prevent cross-client texting.

Verification (quick test):
1) Send outbound message to test phone
2) Reply “STOP”
3) Confirm: opt-out confirmation sent once, suppression logged, next outbound blocked
4) Reply “HELP” after STOP (should either provide help without marketing, or remain suppressed per policy)

4) QUIET HOURS (MVP spec)

Default quiet hours (recommended):
- 9:00 PM to 8:00 AM recipient local time (no automated outbound)

Timezone resolution order:
1) Lead-provided address/ZIP → map to timezone
2) Area code inference (fallback)
3) Default to business timezone if unknown

Behavior:
- If a lead arrives during quiet hours:
  - Queue the first message for the next allowed time (8:05 AM local)
  - Log: queued_reason = quiet_hours
- Manual sends by business owner: allowed (configurable), but still must honor STOP suppression

DST:
- Use IANA timezone IDs; compute next send time using timezone-aware library

5) CONSENT LOGGING (MVP schema)
Store one row per consent event:
- lead_id
- phone_e164
- consent_status (opt_in / opt_out)
- consent_source (webflow/typeform/facebook/manual/text)
- consent_text_version (hash of the disclosure string)
- page_url / form_id / ad_id
- timestamp_utc
- ip_address (if available)
- user_agent (if available)

Minimum audit requirement:
- Must be able to show: what user saw, when they consented, and what number was used.

6) TWILIO DELIVERABILITY / A2P 10DLC (MVP guidance)

Messaging Service:
- Use a Twilio Messaging Service to manage sender(s), sticky sender, and opt-out handling consistently.

A2P readiness (avoid surprises):
- If using US 10DLC long code at scale, expect to register Brand + Campaign.
- Keep a record of:
  - sample messages (the templates above)
  - opt-in language (snippets above)
  - privacy/terms URLs (publish ASAP)

Content guardrails:
- No URL shorteners
- Limit links to engaged users (after at least one reply)
- Keep first message plain, short, and contextual (no “promo” tone)

Fallback behaviors (recommended):
- If message delivery fails with carrier filtering or unknown errors:
  - retry once after 2–5 minutes
  - if still failing, flag lead as “needs manual follow-up” and email the business owner

7) AGENCY GO-LIVE CHECKLIST (fast)
- Add opt-in disclosure to the lead form (Webflow/Typeform/FB)
- Ensure phone is required
- Ensure Terms/Privacy links are present (publish pages; replace [TERMS_URL]/[PRIVACY_URL])
- Enable STOP/HELP keyword handling + global suppression
- Turn on quiet hours (9pm–8am local)
- Test end-to-end with a real phone:
  - new lead → first message
  - reply flow Q1–Q3
  - STOP → confirmation + suppression
  - HELP → help message

If a prospect asks “Are you compliant?” (copy/paste objection handler)
“Yes—our flow captures explicit SMS consent at the form/ad level (with Terms/Privacy links), includes required STOP/HELP language, immediately suppresses on STOP with a global do-not-text list, and enforces quiet hours by recipient timezone. We also log consent events (source + timestamp + disclosure version) for auditability. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to”
