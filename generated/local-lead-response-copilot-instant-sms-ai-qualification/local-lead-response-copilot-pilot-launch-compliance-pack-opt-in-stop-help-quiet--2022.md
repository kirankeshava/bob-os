# Local Lead Response Copilot — Pilot Launch Compliance Pack (Opt‑In, STOP/HELP, Quiet Hours, Consent Logs, Twilio Deliverability, Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:18:06.879Z

---

# Local Lead Response Copilot — Pilot Launch Compliance Pack
Website (legitimacy link to share): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) Minimum viable compliance checklist (pilot-ready)
**Must-have before sending any automated SMS:**
1) **Express written consent captured** at lead capture (checkbox or explicit disclosure in form) for marketing/autodialed texts.
2) **Opt-in disclosure includes**: brand/entity name, purpose (respond/qualify/schedule), message frequency (“Msg frequency varies”), “Msg & data rates may apply,” and **STOP/HELP** instructions.
3) **STOP handling**: immediate opt-out confirmation and global suppression (no further texts unless user re-consents).
4) **HELP handling**: support instructions + website link.
5) **Quiet hours**: do not initiate texts outside 8am–8pm recipient local time (default); queue until next window.
6) **Consent logging**: store lead’s consent timestamp, source, IP (if available), consent text version, and phone.

## 2) Copy/paste opt-in snippets (use as-is)
### A) Webflow form (checkbox)
**Checkbox label (required):**
“I agree to receive text messages from {{BUSINESS_NAME}} about my inquiry, scheduling, and service updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

**Under-submit disclosure (optional but recommended):**
“By submitting, you confirm your consent to receive texts/calls from {{BUSINESS_NAME}} at the number provided, including via automated technology. Reply STOP to cancel, HELP for help. View terms/privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

### B) Typeform
**Add as a statement + required yes/no or checkbox:**
“Text consent: By continuing, you agree that {{BUSINESS_NAME}} may text you about your request and appointment options. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms/privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

### C) Meta/Facebook Lead Ads
**Special ad category not required; use ‘Privacy Policy’ field + custom disclaimer:**
**Disclaimer (paste into lead form disclaimer/custom question):**
“By submitting, you agree {{BUSINESS_NAME}} may contact you by text/call about your inquiry and scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase.”

**Privacy Policy URL:**
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

## 3) Default compliant message templates (pilot-safe)
**Important content rules:** keep short, avoid ALL CAPS, avoid “free!!!”, avoid link shorteners, avoid “guaranteed/instant approval,” avoid heavy emoji use.

### Initial speed-to-lead (sent immediately after form)
“Hi {{first_name}} — it’s {{agent_name}} with {{business_name}}. Got your request for {{service}} in {{city}}. A couple quick questions so I can get you the right time: 1) Is this for a home or business? 2) When are you hoping to schedule? Reply STOP to opt out, HELP for help.”

### Qualification follow-up (if no reply in 3–5 min)
“Just checking — are you available {{option1}} or {{option2}}? If neither, tell me a better day/time. STOP to opt out, HELP for help.”

### Booking confirmation (after time chosen)
“Perfect — I can book {{date}} at {{time}}. What’s the best address for the visit? STOP to opt out, HELP for help.”

### Missed-call textback
“Sorry we missed you — this is {{business_name}}. Want to book a time for {{service}}? Reply with 1) your address and 2) preferred day/time. STOP to opt out, HELP for help.”

### Re-engagement (24–72 hours later; single attempt)
“Hi {{first_name}}, do you still want help with {{service}}? Reply 1 for Yes, 2 for No. STOP to opt out, HELP for help.”

## 4) STOP / HELP handling (implementation spec)
### Keywords
- **STOP set** (case-insensitive; trim punctuation): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT.
- **HELP set**: HELP, INFO, SUPPORT.

### Behavior
1) On inbound message matching STOP set:
   - Immediately mark the phone as **opted_out=true** (global suppression).
   - Send one confirmation SMS:
     “You’re opted out and will no longer receive texts from {{business_name}}. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
   - Block any further outbound messages to that phone across all clients/workspaces unless re-consented.

2) On inbound message matching HELP set:
   - Do **not** change subscription status.
   - Reply:
     “{{business_name}}: We text about your inquiry and scheduling. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

3) START re-subscribe (optional):
- If inbound is START/YES and you have previous opt-out, require **explicit re-consent** or documented process (at minimum, record a “resubscribe” event and allow messaging again).

### Audit logging (required fields)
- phone_e164, event_type (opt_in/opt_out/help), timestamp_utc, source (inbound_sms/form), message_body, client_id/workspace_id, consent_text_version (for opt-ins), ip_address (if from web), user_agent (if from web).

## 5) Quiet hours by timezone (implementation spec)
**Default rule:** Only initiate automated outreach 8:00am–8:00pm in recipient local time.

### Timezone resolution order
1) If lead has **postal code/address**, map to timezone.
2) Else infer from **area code** (best-effort).
3) Else use **account default timezone** (client setting) and mark tz_confidence=low.

### Behavior
- If current local time is outside window: **queue** the message for next allowed time (e.g., 8:05am next day) and record a “delayed_for_quiet_hours” event.
- Human/manual sends may override (logged as manual_override=true).
- Daylight Savings: use IANA timezone IDs (e.g., America/Chicago) not raw offsets.

## 6) Twilio deliverability hardening (minimum viable)
1) Use a **Messaging Service** (not individual numbers directly) so Twilio can manage features and scale.
2) Enable **Advanced Opt-Out** (if available) OR implement suppression at app level per STOP spec.
3) Maintain stable templates; avoid frequent random wording changes that look like spam.
4) Avoid link shorteners; use your real domain/URL.
5) If using long code at scale: prepare for **A2P 10DLC** Brand/Campaign registration (often required for US). For pilots, start with compliant content and low volume; be ready to register as soon as you see scaling.

## 7) Agency handoff: go-live steps (copy/paste)
1) Pick lead source (Webflow/Typeform/FB).
2) Paste the **opt-in snippet** exactly as provided and ensure it’s required or clearly disclosed.
3) Confirm you capture: first name, phone, service type, city/zip, consent checkbox (or disclosure).
4) Configure default message templates (Section 3) in the Copilot.
5) Verify STOP/HELP in staging:
   - Send STOP -> confirm opt-out message + no further sends.
   - Send HELP -> confirm help message.
6) Quiet hours test: set lead timezone and attempt send outside window -> confirm queued.
7) For any compliance question, email: agent_bob_replit+lead-copilot@agentmail.to and share the legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
