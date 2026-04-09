# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack (Agency Handoff + Copy/Paste + Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:21:10.780Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack

**Proof URL (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
**Support email:** agent_bob_replit+lead-copilot@agentmail.to

## 1) Minimum-Viable Compliance Checklist (Pilot Ready)
1. **Express written consent captured** on every lead source before first SMS (form checkbox or equivalent Lead Ads disclaimer). No purchased lists.
2. **Disclosure includes:** “By providing your number, you agree to receive text messages… Msg & data rates may apply… Msg frequency varies… Reply STOP to opt out, HELP for help.”
3. **Business identity in first message** (brand/company/service name) + reason they’re being texted.
4. **STOP/HELP implemented** with immediate compliance behavior (see specs below) + global suppression list.
5. **Quiet hours enabled** by recipient timezone (see specs below) + deferral queue.
6. **Consent logging enabled** (who/when/where/how; include lead source + form text version).
7. **Content guardrails**: no deceptive language, no “free!!!” spammy patterns, minimize URL shorteners.
8. **Twilio setup**: use a Messaging Service; evaluate A2P 10DLC vs Toll-Free; keep message templates consistent.

---

## 2) Copy/Paste Opt-In Language (Lead Sources)
### A) Webflow / Website Form (checkbox + short disclosure)
**Checkbox label (recommended):**
> I agree to receive text messages about my inquiry from **{Your Business Name}**.

**Disclosure text (place under checkbox):**
> By checking this box, you consent to receive SMS messages from **{Your Business Name}** related to your request (e.g., scheduling, quotes, and reminders). Message frequency varies. Msg & data rates may apply. Reply **STOP** to opt out, **HELP** for help. View terms & privacy: **{Terms URL}** | **{Privacy URL}**. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Required form fields to log:** phone, name, timestamp, IP (if available), page URL, checkbox=true, disclosure version.

### B) Typeform (statement + required Yes consent)
**Question:** “SMS consent” (required)
- Yes, text me about my request
- No

**Description text:**
> By selecting “Yes,” you consent to receive SMS messages from **{Your Business Name}** about your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {Terms URL} Privacy: {Privacy URL}. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

### C) Meta/Facebook Lead Ads (disclaimer text)
**Lead form custom disclaimer (where available):**
> By submitting, you agree to receive texts from **{Your Business Name}** about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {Terms URL} Privacy: {Privacy URL}. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Operational note:** ensure the ad copy + form context makes it clear they’re requesting contact (quote/schedule). Don’t run “cold” lead gen to SMS without clear intent.

---

## 3) Compliant Message Templates (Ready to Paste)
### A) First response (speed-to-lead)
> Hi {first_name} — this is {agent_name} with {business_name}. You just requested info about {service}. What’s the best time to help you: now or later today? Reply STOP to opt out.

### B) Qualification flow (short, high intent)
1) 
> Quick question: what’s your address/ZIP so we can confirm availability?

2)
> Thanks. When are you looking to get this done? (1) ASAP (2) This week (3) 2+ weeks

3)
> Got it—what’s the best email to send your estimate/confirmation?

### C) Booking handoff
> Perfect. Want to book a quick call? Reply with a time window (e.g., 2–4pm) and we’ll confirm. Reply STOP to opt out.

### D) Missed-call textback (optional)
> Sorry we missed you—this is {business_name}. What can we help with? You can reply here to schedule. Reply STOP to opt out.

### E) Re-engagement (after quiet hours / next day)
> Hi {first_name}, checking back—still need help with {service}? If yes, reply 1 for “book a call” or 2 for “get a quote by text.” Reply STOP to opt out.

**Content guardrails:** avoid excessive punctuation, ALL CAPS, “act now,” “free!!!”, misleading claims. Prefer one link max and avoid link shorteners.

---

## 4) STOP / HELP Handling — Implementation Spec (Code-Ready)
### A) Keyword normalization
- Normalize inbound body: trim, lowercase, remove punctuation, collapse whitespace.

### B) STOP keywords (global unsubscribe)
If normalized message equals any of:
- stop, stopall, unsubscribe, cancel, end, quit

**Behavior (must happen immediately):**
1. Set `contact.sms_status = "unsubscribed"`.
2. Add phone to **Global Suppression List** (applies across all subaccounts/clients if you centrally manage sending).
3. Log event (see logging section).
4. Send confirmation message **once**:
   > You’re unsubscribed and will no longer receive text messages from {business_name}. Reply START to resubscribe.
5. Block any further outbound SMS to that phone unless they later explicitly resubscribe.

### C) START keyword (resubscribe)
If message equals: start, yes, unstop
- Only allow resubscribe if you can tie this phone to a known lead OR capture fresh consent context.
- Set `sms_status = "subscribed"` and log.
- Send confirmation:
  > You’re re-subscribed to {business_name} texts. Msg frequency varies. Reply STOP to opt out.

### D) HELP keyword
If message equals: help, info
Send:
> {business_name} SMS help: Reply STOP to opt out. Msg frequency varies. Msg & data rates may apply. Support: agent_bob_replit+lead-copilot@agentmail.to Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

### E) Edge cases
- If inbound contains STOP plus other words (e.g., “stop texting”): treat as STOP.
- If already unsubscribed and receives normal message: do not respond (unless it’s START/HELP).
- If message is abusive/unknown: no automated escalation beyond normal lead workflow.

### F) Required audit logs (minimum fields)
For every inbound/outbound:
- `timestamp_utc`, `direction` (in/out), `from`, `to`, `body_hash`, `message_body_redacted` (optional), `lead_id`, `client_id`, `source` (webflow/typeform/meta), `consent_status_at_send`, `quiet_hours_deferred` (bool), `delivery_provider` (twilio), `provider_message_id`, `event_type` (STOP_RECEIVED, HELP_RECEIVED, OUTBOUND_BLOCKED_SUPPRESSION, etc.).

---

## 5) Quiet Hours by Timezone — Implementation Spec
### A) Goal
Never send automated SMS outside the allowed window in the **lead’s local timezone**, unless a human user explicitly overrides.

### B) Default allowed window (recommended)
- **Mon–Sat:** 8:00am–8:00pm local
- **Sun:** 9:00am–6:00pm local
(Adjust per client; keep conservative for pilots.)

### C) Timezone resolution order
1. **Explicit timezone** on lead record (if captured).
2. **Lead ZIP/state** → map to timezone.
3. **Phone number NPA-NXX lookup** (approximate) if no address.
4. **Client’s default timezone** as a fallback (log that fallback was used).

### D) Deferral algorithm
When an outbound message is requested:
1. Compute recipient local time.
2. If within window: send immediately.
3. If outside window:
   - Enqueue message with `defer_until_local = next_allowed_time`.
   - Set `quiet_hours_deferred=true`.
   - Do not send any additional reminders that night (avoid stacking).
4. At `defer_until_local`, re-check suppression + consent, then send.

### E) Overrides
- If a human user presses “Send now,” allow immediate send but log `override=true`.
- If lead **initiates** an inbound SMS during quiet hours, you may respond (transactional) but keep it minimal and still honor STOP/HELP.

---

## 6) Consent Logging (Dispute-Ready)
Minimum fields to store:
- Lead: name, phone, email, address/ZIP (if available)
- Consent: `consent_timestamp_utc`, `consent_source` (webflow/typeform/meta), `form_url` or `lead_ad_id`, `consent_text_version_id`, `checkbox_value` (true/false), `ip_address` (if available), `user_agent` (if available)
- Messaging: first outbound timestamp, templates used, provider message IDs
- Unsubscribe: STOP timestamp + confirmation sent

**Export requirement:** ability to export a single lead’s consent + message log to CSV/PDF within 24 hours.

---

## 7) Twilio Deliverability Hardening (Pilot Minimum)
1. Use a **Twilio Messaging Service** (sticky sender optional; set to optimize deliverability).
2. Decide sending route:
   - **Low volume / single location**: Toll-Free can be simpler.
   - **Local scale / higher volume**: A2P 10DLC is usually required.
3. Avoid URL shorteners; use branded domains when possible.
4. Keep templates consistent; reduce variance; avoid “marketing blast” tone.
5. Rate-limit initial outreach; don’t send multiple messages in <60 seconds unless in an active conversation.
6. Monitor Twilio errors (21610 unsubscribed; filtering; blocked) and automatically suppress.

---

## 8) Website Pages — Ready-to-Paste Content
### A) Terms of Service (SMS Terms) — MV Draft
**Title:** Terms of Service

**Overview**
Local Lead Response Copilot (“we,” “us”) helps businesses respond to customer inquiries via text message. These Terms govern your use of our website and messaging services.

**SMS Messaging Terms (Important)**
By providing your mobile number through our forms, ads, or other lead sources and opting in, you agree to receive text messages related to your inquiry (e.g., scheduling, confirming details, reminders, quotes). Message frequency varies. Msg & data rates may apply.

**Opt-Out**
You can opt out at any time by replying **STOP**. After you opt out, you will no longer receive text messages unless you later choose to resubscribe by replying **START**.

**Help**
For help, reply **HELP** or contact us at agent_bob_replit+lead-copilot@agentmail.to.

**Consent**
Consent to receive text messages is not a condition of purchase. You must be authorized to use the phone number provided.

**Prohibited Use**
You agree not to use our service to send unlawful, misleading, or abusive messages, or to contact numbers without proper consent.

**Service Availability**
Message delivery is subject to carrier availability and limitations; we cannot guarantee that messages will be delivered or read.

**Contact**
Support: agent_bob_replit+lead-copilot@agentmail.to  
Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

### B) Privacy Policy — MV Draft
**Title:** Privacy Policy

We collect information you submit such as name, phone number, email, and details about your service request. We use this information to respond to your inquiry, provide scheduling/quote communications, and improve service quality.

**SMS Data**
If you opt in to receive text messages, we may store message content and metadata (timestamps, delivery status) for compliance, auditing, and support. Carriers may apply standard messaging fees.

**Sharing**
We may share information with service providers necessary to deliver messages (e.g., SMS platform providers) and with the business you contacted. We do not sell your personal information.

**Retention**
We retain consent records and messaging logs for compliance and dispute resolution, then delete or anonymize data when no longer needed.

**Your Choices**
You can opt out of SMS at any time by replying STOP. You may request access or deletion by emailing agent_bob_replit+lead-copilot@agentmail.to.

**Contact**
agent_bob_replit+lead-copilot@agentmail.to  
Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

---

## 9) Verification Test Matrix (Agency Sign-Off)
**STOP tests:** send “STOP”, “stopall”, “Stop texting” → confirm suppression + confirmation text + outbound blocked thereafter.
**HELP tests:** send “HELP” → confirm help response contains support email + STOP instruction.
**Quiet hours tests:** attempt outbound at 11pm local → confirm deferred; sends next window; log shows `quiet_hours_deferred=true`.
**Consent tests:** create lead without consent → confirm outbound blocked + log `OUTBOUND_BLOCKED_NO_CONSENT`.

If agencies want implementation help, have them email agent_bob_replit+lead-copilot@agentmail.to and share the proof URL above.
