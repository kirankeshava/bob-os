# Local Lead Response Copilot — MV Compliance + Deliverability Handoff (Opt‑In, STOP/HELP, Quiet Hours, Consent Logs, Agency Go‑Live)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:43:27.511Z

---

## Purpose (MV / Wartime)
This is the **minimum viable** compliance + deliverability package needed to launch paid pilots without getting blocked by carriers, violating TCPA/CTIA expectations, or creating churn.

Business legitimacy references to use in customer-facing materials:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Copy/Paste Opt‑In Snippets (Use One)
### A) Webflow / Website Form (checkbox + disclosure)
**Form disclosure (place near submit button):**
> By submitting this form, you agree to receive text messages from [BUSINESS NAME] about your request, including appointment scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy Policy: [PRIVACY_URL] and Terms: [TERMS_URL].

**Checkbox label (recommended):**
> I agree to receive texts from [BUSINESS NAME] about my request.

**Implementation note:** store the checkbox value + timestamp + page URL + IP/User-Agent (see Consent Logging).

### B) Typeform (short + compliant)
**On the final screen or just above submit:**
> By submitting, you consent to receive SMS from [BUSINESS NAME] related to your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].

### C) Meta/Facebook Lead Ads (primary text + privacy policy link)
**Lead form ‘Privacy policy’ URL:** [PRIVACY_URL]

**Optional disclaimer text (include in form or intro):**
> By submitting, you agree to receive texts from [BUSINESS NAME] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL].

---

## 2) First Message Template (safe, low-spam)
Send immediately after lead capture.

**Template:**
> Hi {first_name} — this is {agent_name} with {business_name}. Thanks for reaching out about {service_category}. Are you looking to schedule service, or just get a quote? Reply 1) schedule 2) quote. Reply STOP to opt out.

**Guidelines (deliverability):**
- Avoid ALL CAPS, excessive punctuation, and “free/guarantee/act now” phrasing.
- Keep links minimal; only include when necessary (booking link after qualification).
- Include “Reply STOP to opt out” at least in the first message and periodically thereafter.

---

## 3) STOP/HELP Handling (MV Implementation Spec)
### Required keywords
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

### Behavior
1) **On inbound STOP keyword:**
   - Immediately mark the phone number as **globally suppressed** for that customer/account.
   - Respond once with confirmation:
     > You’re opted out of texts from {business_name}. No more messages will be sent. Reply START to re‑subscribe.
   - Do **not** send any further outbound messages to that number unless user explicitly opts back in (START).

2) **On inbound HELP keyword:**
   - Respond with:
     > {business_name}: Help desk {support_email}. Msg frequency varies. Reply STOP to opt out.
   - Log the HELP interaction.

3) **On inbound START keyword (optional but recommended):**
   - Remove suppression only if you have a record of prior consent or the user’s re-subscribe message.
   - Respond:
     > You’re re‑subscribed to {business_name} texts. Reply STOP to opt out.

### Enforcement
- Outbound send pipeline must check suppression **before every send**.
- Suppression should be scoped at least per-customer; MV recommendation is “global per customer account” to avoid accidental messaging from multiple campaigns.

### Audit logging (minimum fields)
- phone_e164
- account_id (customer/tenant)
- message_direction (inbound/outbound)
- message_body
- keyword_detected (STOP/HELP/START/none)
- suppression_status_after (suppressed/unsuppressed)
- timestamp_utc
- provider_message_id (Twilio SID or equivalent)

---

## 4) Quiet Hours by Timezone (MV Spec)
### Goal
Prevent messages at night to reduce complaints and improve replies.

### Default rule (MV)
- **Do not initiate outbound messages** between **8:00 PM and 8:00 AM** in the lead’s local timezone.

### Timezone resolution order
1) If lead provides ZIP/postal code → map ZIP to timezone.
2) Else infer from area code (fallback; imperfect).
3) Else use business timezone as default.

### Behavior during quiet hours
- Queue the message and send at next allowed window (8:00 AM local time).
- Exception: if user texts you first during quiet hours, you may respond (transactional) but keep it short and compliant.

### Logging
- Store detected timezone and method (zip/area/business_default).
- Store whether a send was queued due to quiet hours.

---

## 5) Consent Logging (MV Requirements)
To handle disputes and platform enforcement, log:
- consent_text_version (string)
- consent_source (webflow/typeform/fb_lead_ads/manual)
- consent_checkbox (true/false if applicable)
- consent_timestamp_utc
- consent_page_url or ad_id/form_id
- lead_phone_e164
- lead_email (if captured)
- lead_ip + user_agent (web forms)

Retention: keep at least 12 months (prefer 24).

---

## 6) Agency Go‑Live Checklist (Copy/Paste)
1) Add opt-in disclosure + checkbox (where possible) using Section 1.
2) Confirm Privacy + Terms URLs are present in the form/ad.
3) Ensure the first SMS sent uses the Section 2 template and includes STOP language.
4) Confirm STOP/HELP is enabled and verified (Section 7).
5) Enable quiet hours (8pm–8am local) with queuing.
6) Confirm consent logging fields are stored.
7) Use support email in HELP response: agent_bob_replit+lead-copilot@agentmail.to

---

## 7) Quick Verification Test Matrix (Manual)
Run these tests with one internal phone number before sending to real leads:
1) Lead submits form → receive first SMS within 60 seconds.
2) Reply “HELP” → receive help message with support email and STOP instruction.
3) Reply “STOP” → receive opt-out confirmation; verify future outbound sends are blocked.
4) Reply “START” (if supported) → receive resubscribe confirmation; verify outbound sends work again.
5) Trigger a lead during quiet hours → verify the message is queued and delivered at 8:00 AM local.

---

## 8) Twilio Deliverability (MV Guidance, no spend assumed)
- Use a Twilio **Messaging Service** (even at low volume) to centralize compliance features.
- Keep content conversational, short, and personalized; avoid link-heavy first messages.
- Maintain a consistent brand identity in the first message (business name + reason for texting).
- If sending via long code at scale, plan for A2P 10DLC registration; start once a pilot is ready to go live broadly.

---

## Support / Legitimacy
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

(End of MV handoff.)