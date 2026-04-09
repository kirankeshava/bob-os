# Local Lead Response Copilot — MV Compliance + Deliverability Handoff (Agency Copy/Paste + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:42:30.195Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Handoff (Agency Copy/Paste + Implementation Specs)

**Product proof URL (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
**Support/Compliance email:** agent_bob_replit+lead-copilot@agentmail.to

This handoff lets an agency deploy “minimum viable compliant” SMS lead-response + AI qualification for local businesses (home services, med spa, legal intake, etc.) while reducing carrier filtering and TCPA/CTIA risk.

---

## 1) Minimum-Viable Compliance Checklist (Pilot-Ready)

**Consent & disclosures (required):**
1. Clear opt-in language at the point of lead capture (form or ad).
2. Explicit disclosure that messages are automated and can include AI-driven questions.
3. “Msg & data rates may apply.”
4. Estimated frequency (“Up to X msgs/week” or “1–6 msgs per lead” — choose one and be consistent).
5. STOP/HELP instructions.
6. Link to Terms & Privacy (if you don’t have them yet, publish simple pages ASAP; placeholders are acceptable only for internal pilots).

**Behavioral compliance (required):**
1. Honor STOP immediately (suppress all future messages for that phone across the client account).
2. Provide HELP instructions.
3. Quiet hours by the lead’s local timezone.
4. Consent logging retained and exportable for disputes.

---

## 2) Copy/Paste Opt-In Snippets (Use One Per Lead Source)

### A) Webflow / Website Form (checkbox + disclosure)
**Add a required checkbox + disclosure under it:**

**Checkbox label (required):**
> I agree to receive text messages about my request from {BUSINESS NAME}.

**Disclosure text (below checkbox):**
> By submitting this form, you consent to receive automated text messages from {BUSINESS NAME} about your request (including scheduling and service updates). Consent is not a condition of purchase. Msg & data rates may apply. Message frequency varies (typically 1–6 per request). Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}. Support: agent_bob_replit+lead-copilot@agentmail.to. Product info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Implementation note:** store a boolean field like `sms_consent=true` plus timestamp + page URL.

### B) Typeform (statement + yes/no)
Add a **Yes/No** question:
**Question:**
> Can we text you about your request?

**Description:**
> We’ll send automated texts about scheduling and next steps. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}

**Answer mapping:** only message if **Yes**.

### C) Meta/Facebook Lead Ads (custom disclaimer)
Use Lead Ads “Custom Disclaimer” (or add to the form description):
> By submitting, you agree to receive automated text messages from {BUSINESS NAME} about your request. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}. Support: agent_bob_replit+lead-copilot@agentmail.to. Product info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

---

## 3) Message Templates (Low-Risk, Carrier-Friendly)

### First response (immediate)
> Hi {first_name} — it’s {agent_name} with {business_name}. Got your request for {service}. A couple quick questions to get you a fast quote. What’s your address (or ZIP)? Reply STOP to opt out.

### Qualification Q2 (after ZIP)
> Thanks. When would you like this done? 1) ASAP 2) This week 3) Next week

### Booking prompt
> Perfect — want to book a quick call or an appointment? Reply 1) Call 2) Appointment

### Confirmation
> You’re set. {business_name} will contact you at {scheduled_time}. If you need to change it, reply here. Reply STOP to opt out.

### Missed call text-back (if applicable)
> Sorry we missed you — this is {business_name}. Are you looking for help with {service}? Reply 1) Yes 2) No. Reply STOP to opt out.

**Content guardrails (deliverability):**
- Avoid ALL CAPS, excessive punctuation, “free!!!”, “act now”, “guaranteed”, “risk-free”.
- Keep links minimal; prefer your own domain when possible.
- Always include brand/business name early in conversation.
- Do not include sensitive personal data; avoid medical/legal specifics.

---

## 4) STOP / HELP / START Handling (Implementation Spec)

### Keywords (normalize)
Normalize inbound text by trimming whitespace and uppercasing.

**STOP triggers (exact or begins-with):**
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

**HELP triggers:**
- HELP, INFO

**START/UNSTOP triggers (optional):**
- START, UNSTOP, YES (only if previously opted out)

### State machine
- `subscribed` (default if consent exists)
- `unsubscribed` (set immediately upon STOP)

### Required behavior
1. **On STOP:**
   - Set `subscription_status=unsubscribed` immediately.
   - Add phone to **global suppression list** for that client/workspace.
   - Send confirmation once:
     > You’re opted out and will no longer receive texts from {business_name}. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.
   - Block all future outbound messages unless START received.

2. **On HELP:**
   - Do **not** change subscription state.
   - Respond:
     > {business_name}: automated texts about your request (scheduling/updates). Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Product info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

3. **On START (if previously STOPped):**
   - Set `subscription_status=subscribed` only if you can prove prior consent (consent record exists).
   - Send confirmation:
     > You’re re-subscribed to {business_name} texts. Msg frequency varies. Reply STOP to opt out.

### Required audit logs (minimum fields)
Log events with:
- `timestamp_utc`
- `workspace_id/client_id`
- `lead_id` (if known)
- `from_phone` / `to_phone`
- `direction` (inbound/outbound)
- `message_body`
- `normalized_body`
- `event_type` (STOP_RECEIVED, HELP_RECEIVED, OPT_OUT_CONF_SENT, OUTBOUND_BLOCKED_SUPPRESSED, START_RECEIVED, OPT_IN_RESTORED)
- `decision_reason` (e.g., “matched STOP keyword”, “suppressed due to unsubscribed”)

---

## 5) Quiet Hours by Timezone (Implementation Spec)

### Default quiet hours (pilot-safe)
- **Allowed sending window:** 8:00 AM – 8:00 PM **lead-local time**
- Outside window: defer to next allowed time.

### Timezone resolution order
1. If lead has `timezone` explicitly (from form): use it.
2. Else if lead has `postal_code`/`address`: geocode -> timezone.
3. Else infer from phone number area code (best-effort).
4. Else fall back to business timezone.

### Scheduling algorithm
When an outbound message is about to send:
1. Determine `lead_local_time`.
2. If within allowed window: send now.
3. If outside window: enqueue message with `deferred_until` = next day at 8:00 AM local time (or same day if before 8:00 AM).
4. If lead replies inbound during quiet hours: you may send **one** minimal transactional response acknowledging receipt, then defer the rest.

### Overrides (controlled)
- Admin/owner override can bypass quiet hours only for:
  - explicit “customer requested now” scenarios (log reason)
  - emergency service categories (if client policy allows)

### Required logs
- `quiet_hours_evaluated` (true/false)
- `lead_timezone`
- `decision` (sent/deferred)
- `deferred_until`

---

## 6) Consent Logging (Dispute-Ready)

Store (per lead/phone):
- `consent_status` (granted/denied/unknown)
- `consent_timestamp_utc`
- `consent_source` (webflow/typeform/meta/zapier/manual)
- `consent_text_version` (hash or version id)
- `landing_page_url` or `ad_id/form_id`
- `ip_address` (if captured)
- `user_agent` (if captured)
- `proof` (screenshot url or raw payload snapshot)

Retention: **at least 4 years** recommended for TCPA disputes (MV pilots can start with 12–24 months but plan to extend).

---

## 7) Twilio Deliverability Hardening (MV)

### Recommended baseline
- Use a **Messaging Service** with:
  - Sticky sender (per-recipient)
  - Smart encoding
  - Valid callback URL for inbound
- Decide route:
  - **10DLC**: best for consistent throughput; requires A2P registration for US.
  - **Toll-Free**: can work for pilots; verification still recommended; may have different filtering.

### A2P 10DLC decision tree (practical)
- If sending to US numbers and volume is meaningful (or multiple clients): assume **A2P is required**.
- If ultra-low volume internal test only: you can test functionality, but don’t scale without registration.

### Content rules to avoid filtering
- Don’t send the same exact first message to every lead; add light personalization.
- Avoid repeated short links; if linking, use branded domain and keep frequency low.
- Keep message length reasonable; avoid “promo blast” language.

### Fallback behaviors
- If message fails with carrier violation / blocked:
  - Stop retries.
  - Flag conversation for manual follow-up.
  - Notify admin (email agent_bob_replit+lead-copilot@agentmail.to).

---

## 8) Verification: End-to-End Test Matrix (Must Pass Before Pilot)

**STOP tests (inbound):**
1. Lead sends “STOP” -> confirm opt-out message -> subsequent outbound blocked.
2. Lead sends “Unsubscribe” -> same behavior.
3. Lead sends “STOP please” -> treat as STOP (begins-with).

**HELP tests:**
1. Lead sends “HELP” -> returns help info; subscription unchanged.

**START tests (optional):**
1. After STOP, lead sends “START” -> re-subscribe only if consent exists; confirm message.

**Quiet hours tests:**
1. Attempt outbound at 9 PM lead-local -> deferred with correct `deferred_until`.
2. Attempt outbound at 7:59 AM -> deferred until 8 AM.

**Evidence required:**
- Screenshot or exported logs showing event types + suppression decisions.

---

## 9) Agency Implementation Notes (Zapier/Make/Webhooks)

Minimum payload fields to pass into the copilot:
- `first_name`
- `phone`
- `service` (or lead reason)
- `postal_code`/`address` (recommended for timezone)
- `sms_consent` (true/false)
- `source` (webflow/typeform/meta)

If `sms_consent != true`, do not message.

For support or compliance questions: **agent_bob_replit+lead-copilot@agentmail.to**. Product proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
