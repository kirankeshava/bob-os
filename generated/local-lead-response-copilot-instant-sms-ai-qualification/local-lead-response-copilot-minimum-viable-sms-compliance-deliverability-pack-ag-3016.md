# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:10:06.222Z

---

## Purpose (minimum viable)
This pack is designed to remove the top onboarding objections that block SMS pilots: unclear consent, missing STOP/HELP handling, after-hours messaging complaints, and weak deliverability setup. It is intentionally minimal—enough to launch safely—while deferring “full hardening” until after pilots.

Business legitimacy links/support (use in all client-facing installs):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Copy/Paste Opt‑In Language (use ONE consistent version)
### 1A) Webflow / Website form checkbox + disclosure (recommended)
**Checkbox label (required, unchecked by default):**
“I agree to receive text messages about my request.”

**Disclosure text (place directly under checkbox):**
“By submitting, you agree that [Business Name] may text you about your request using automated technology. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Terms and Privacy: [TERMS_URL] | [PRIVACY_URL].”

**Implementation notes:**
- Checkbox must be optional only if you have another clear express consent mechanism. Best practice: require it for SMS.
- Store: timestamp, IP (if available), page URL, and checkbox value.

### 1B) Typeform (no custom checkbox UI constraints)
**Add a required “Yes” consent question (recommended):**
Question: “Do you agree to receive text messages about your request?”
Choices: “Yes, text me” / “No”

**Description (below the question):**
“Msgs may be sent using automated technology. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

**Field mapping requirement:** Store the response as `sms_consent=true/false`.

### 1C) Meta/Facebook Lead Ads (High-intent lead gen)
**In the Lead Form ‘Privacy Policy’ / custom disclaimer section:**
“By submitting this form, you agree that [Business Name] may contact you at the number provided via call or text (including automated texts) about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

**Operational requirement:** Only text leads where the lead form captured phone AND the disclaimer is enabled.

---

## 2) Minimum‑Viable Message Templates (compliant + deliverability-friendly)
Keep messages short, specific, and non-promotional. Avoid ALL CAPS, excessive punctuation, and “free/guarantee/winner” language.

### 2A) First message (speed-to-lead)
“Hi {{first_name}}, this is {{agent_name}} with {{business_name}}—got your request for {{service}}. What’s the address (or ZIP) for the work?”

### 2B) Qualification follow-up (if no response)
“Quick check—do you want an appointment this week or next week?”

### 2C) Booking confirmation
“Thanks—you're set for {{day}} at {{time}}. If you need to reschedule, reply here. Reply STOP to opt out.”

### 2D) Missed-call text-back (if applicable)
“Sorry we missed you—this is {{business_name}}. Are you calling about {{service}}? Reply with a good time to call you back.”

### 2E) Re-engagement (one attempt only)
“Still need help with {{service}}? If yes, reply 1 and we’ll get you scheduled. Reply STOP to opt out.”

**Template rule:** Include “Reply STOP to opt out” at least in booking/confirmation and periodic follow-ups; don’t paste STOP/HELP boilerplate into every single text if it makes messages look spammy—use it at key moments.

---

## 3) STOP/HELP Handling — Engineering Spec (Twilio-compatible)
### 3A) Keywords (case-insensitive; trim punctuation)
**STOP set:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
**START set (re-subscribe):** START, YES, UNSTOP
**HELP set:** HELP, INFO

### 3B) Behavior
1) If inbound body matches STOP set:
- Write to `suppression_list` (global, per business/tenant + phone E.164) with reason=STOP and timestamp.
- Immediately send confirmation (single message):
  “You’re opted out and will no longer receive texts from {{business_name}}. Reply START to re-subscribe.”
- Block all future outbound to that phone for that tenant until START received.

2) If inbound matches HELP set:
- Send:
  “{{business_name}}: For help, reply here or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

3) If inbound matches START set:
- Remove from suppression (or set status=ACTIVE with audit trail).
- Send:
  “You’re re-subscribed. Reply STOP to opt out.”

### 3C) Outbound enforcement (must-have)
Before sending ANY SMS, check suppression list:
- If suppressed: do not send; log event `outbound_blocked_suppressed`.
- If not suppressed: send as normal.

### 3D) Audit logging (minimum fields)
- `tenant_id`, `lead_id` (if known), `from_number`, `to_number`, `direction`, `body_raw`, `body_normalized`, `keyword_action` (STOP/HELP/START/NONE), `timestamp_utc`, `provider_message_sid`.

---

## 4) Quiet Hours by Timezone — Minimum Spec
Goal: avoid complaints by not texting late/early in the lead’s local time.

### 4A) Default sending window
- Allowed: 08:00–20:00 lead-local time, Mon–Sat
- Sunday: 10:00–18:00 lead-local time (optional; if unsure, block Sundays)

### 4B) Timezone resolution order
1) Lead-provided ZIP/address → map to timezone
2) If no location: business default timezone
3) If unknown: treat as business timezone and apply stricter window (09:00–18:00)

### 4C) Queue-and-send behavior
- If message is triggered outside allowed window: queue it for next allowed time.
- If lead responds inbound during quiet hours: allow an immediate single reply ONLY if it is clearly transactional (e.g., “Thanks—got it. We’ll reply at 8am.”) otherwise queue.

### 4D) Owner override
Allow tenant admin to mark a conversation “manual takeover” to bypass automation (but still respect STOP suppression).

---

## 5) Consent Logging (what agencies must capture)
Minimum fields to store per lead:
- `consent_status` (granted/denied)
- `consent_text_version` (hash or version string)
- `consent_source` (webflow_form/typeform/fb_lead_ads/manual)
- `consent_timestamp_utc`
- `consent_page_url` (or form name)
- `lead_phone_e164`
- `privacy_terms_urls_shown` (values)

If a lead was imported manually, require a field: `manual_consent_attestation` (who, when, how consent was obtained).

---

## 6) Twilio Deliverability Baseline (no spend assumptions)
Minimum recommended setup for pilots:
1) Use a Twilio Messaging Service (even with one number) to support scaling and features (sticky sender, compliance tools).
2) Enable status callbacks/webhooks for delivery events and inbound messages.
3) Keep URLs limited; avoid link shorteners; if using links, keep domain consistent.
4) Throughput: keep volumes low during pilots; avoid bursts.

**A2P 10DLC note:** If using a US long code at scale, expect to complete A2P Brand + Campaign registration. You can gather details now (legal business name, EIN, address, use case, sample messages) but do not assume any paid carrier fees are approved.

---

## 7) Agency Go‑Live Checklist (copy/paste)
1) Insert opt-in disclosure into form/lead source (Webflow/Typeform/FB) and ensure consent is captured.
2) Confirm Terms/Privacy URLs are live and linked in the disclosure.
3) Verify STOP/HELP:
- Text STOP → receive opt-out confirmation; system blocks future outbound.
- Text HELP → receive help message.
- Text START → re-subscribe confirmation; outbound resumes.
4) Verify quiet hours:
- Trigger a message outside window → queued for next allowed time.
5) Confirm support contact is correct: agent_bob_replit+lead-copilot@agentmail.to and website link is shared when clients ask legitimacy questions.

If any of the above fails, pause automation before launching ads.
