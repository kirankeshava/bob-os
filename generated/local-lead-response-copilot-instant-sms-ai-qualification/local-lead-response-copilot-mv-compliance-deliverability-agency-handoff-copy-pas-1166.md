# Local Lead Response Copilot — MV Compliance + Deliverability Agency Handoff (Copy/Paste Pack + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:31:40.361Z

---

## 0) Business identifiers (use consistently)
**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Proof URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
**Support email:** agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Minimum-viable compliant SMS disclosures (standard text)
Use this disclosure wherever leads submit a phone number for follow-up.

**Short disclosure (tight UI):**
> By providing your phone number, you agree to receive text messages from [BUSINESS NAME] about your request, including automated messages. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms & Privacy: [TERMS_URL] | [PRIVACY_URL]

**Long disclosure (best practice):**
> By submitting this form, you consent to receive SMS/text messages from [BUSINESS NAME] about your inquiry, scheduling, and service updates. Messages may be sent using an autodialer/automated system. Consent is not a condition of purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out at any time; reply HELP for help. See Terms: [TERMS_URL] and Privacy: [PRIVACY_URL].

**Required notes:**
- Replace [BUSINESS NAME] with the advertiser/client’s business name.
- Do **not** hide the disclosure behind a link; show it near the submit button when possible.
- Always include Terms/Privacy links. If you haven’t published them yet, publish the pages first.

---

## 2) Copy/paste opt-in snippets by lead source

### 2.1 Webflow form (under phone field or near submit)
**Label text:**
> SMS Consent

**Consent checkbox (recommended):**
- Checkbox label:
> I agree to receive text messages from [BUSINESS NAME] about my request (automated messages may be sent). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]

If you can’t add a checkbox, use the **short disclosure** from Section 1 directly above the submit button.

### 2.2 Typeform
Place in the form description or confirmation screen.

**Typeform disclosure:**
> By providing your phone number, you consent to receive SMS from [BUSINESS NAME] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out; HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]

**Confirmation screen (recommended add-on):**
> Thanks — we’ll text you shortly from [BUSINESS NAME]. Reply STOP to opt out.

### 2.3 Meta/Facebook Lead Ads
Add to the lead form disclaimer and (if available) custom disclaimer.

**Meta disclaimer text:**
> By submitting, you agree to receive texts from [BUSINESS NAME] about your request, including automated messages. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]

**Follow-up note for sales team/agency:** Ensure the ad’s business identity matches the sending brand. Misalignment increases complaints and filtering.

---

## 3) Message templates (deliverability-safe)
Guidelines: avoid excessive punctuation, ALL CAPS, “free!!!”, repeated links, and URL shorteners. Keep the first message identity-forward.

### 3.1 First message (immediate response)
> Hi {{first_name}} — this is {{agent_name}} with {{business_name}}. Got your request for {{service}} in {{city}}. Are you looking to schedule service in the next 1–3 days?
> Reply 1) Yes  2) Not sure  3) Later

### 3.2 Qualification follow-up (if “Yes”)
> Great — what’s the service address (street + zip)?

### 3.3 Qualification follow-up (collect availability)
> What day/time works best for a call or appointment? (e.g., today after 4pm, tomorrow morning)

### 3.4 Booking confirmation
> You’re set. {{business_name}} will contact you {{confirmed_time}}. If anything changes, reply here.
> Reply STOP to opt out.

### 3.5 Missed call text-back (if call attempt fails)
> Hi {{first_name}} — tried calling re: your request with {{business_name}}. What’s a better time to reach you today?
> Reply STOP to opt out.

### 3.6 Re-engagement (48–72 hours, only if consent exists)
> Hi {{first_name}} — checking in from {{business_name}}. Do you still want help with {{service}}?
> Reply YES or NO. Reply STOP to opt out.

---

## 4) STOP / HELP handling (implementation spec)
### 4.1 Keywords (case-insensitive, trimmed)
**STOP set (opt-out):** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
**HELP set:** HELP, INFO, SUPPORT

### 4.2 Behavior (state machine)
Each phone number has a messaging state per sending brand/client:
- **ACTIVE**: can send messages
- **OPTED_OUT**: must not send messages

**On inbound STOP-set keyword:**
1) Mark number as OPTED_OUT immediately (for that client/brand; optionally also add to a global suppression list).
2) Send one final confirmation message:
> You’re opted out from {{business_name}} texts. No more messages will be sent. Reply HELP for help.
3) Block all future outbound messages to that number unless they re-opt-in via a compliant form/ad.

**On inbound HELP-set keyword:**
Send help message (do not change subscription state):
> {{business_name}} support: reply STOP to opt out. For assistance email agent_bob_replit+lead-copilot@agentmail.to. More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**On other inbound messages while OPTED_OUT:**
- Do not send marketing/qualification.
- If message indicates re-opt-in, require fresh explicit opt-in (recommended: send one response asking them to submit the form again).

### 4.3 Audit logging (required events)
Log these events with timestamps and IDs:
- consent.created (source=webflow/typeform/meta, ip/userAgent if available, formId/adId)
- message.sent (templateId, to, from, campaign/flow)
- message.delivered (carrier status)
- message.inbound (body, keywordMatched)
- optout.received (keyword, rawBody)
- optout.confirmation.sent
- help.received
- help.sent
- outbound.blocked_due_to_optout (attemptedTemplateId)

Retention: minimum 24 months recommended; exportable CSV for disputes.

### 4.4 Verification test matrix (staging/production)
From a test handset:
1) Receive first message, reply STOP → verify confirmation text + suppression.
2) After STOP, attempt outbound send → verify blocked + audit log.
3) Reply HELP (either before or after STOP) → verify help text.
4) Edge: “Stop ” with whitespace / “STOP
” / “unsubscribe” → verify normalized match.

---

## 5) Quiet hours by timezone (implementation spec)
Goal: don’t text people at night; reduce complaints and filtering.

### 5.1 Timezone resolution order
Determine lead timezone in this order:
1) Lead-provided timezone field (if captured)
2) Service address → geocode zip/state → timezone
3) Phone number area code (NPA-NXX) → approximate timezone
4) Fallback: client/business timezone

Store: lead.timezone, confidence score, resolution source.

### 5.2 Allowed send window (default)
Default local-time window: **8:00 AM – 8:00 PM**, lead’s timezone.

### 5.3 Deferral behavior
If an outbound message is triggered outside the window:
- Queue it with earliest_send_at = next allowed window start (8:00 AM).
- If multiple messages queue, send only the newest/most relevant (dedupe) to avoid bursts.
- Log: quiet_hours.deferred (original_time, scheduled_time).

### 5.4 Exceptions / overrides
- **Transactional/critical** (optional flag): allowed until 9:00 PM.
- Manual agent override: allow one-off send, but log quiet_hours.override_used (who, why).

### 5.5 Edge cases
- Daylight savings changes: compute using timezone database.
- If timezone confidence is low, be conservative (use client timezone and narrower window 9am–7pm).

---

## 6) Twilio deliverability setup (runbook-level guidance)
### 6.1 Messaging Service
- Use a Twilio Messaging Service per client/brand when possible.
- Enable sticky sender (keeps a consistent number per lead) if using a pool.
- Configure status callbacks for delivery receipts and error monitoring.

### 6.2 A2P 10DLC vs Toll-Free (decision guidance)
- **10DLC**: best for long-term local numbers and higher throughput; requires Brand + Campaign registration.
- **Toll-Free**: simpler for early pilots; may require verification for best deliverability.

Do not send significant volume before registration/verification; it increases filtering risk.

### 6.3 Content & linking guidelines
- Prefer 0–1 links per message. Avoid link shorteners.
- Include business identity in first message.
- Avoid spam terms (FREE!!!, GUARANTEED, ACT NOW) and repeated identical blasts.
- Keep qualification conversational; ask one question at a time.

### 6.4 Fallback behaviors
- If message fails with policy/carrier error: stop retrying blindly; notify operator.
- If user opts out: immediately suppress across all flows.

---

## 7) Agency handoff instructions (how to implement fast)
1) Add the opt-in disclosure (Section 1) to the lead capture surface (Webflow/Typeform/Meta).
2) Ensure phone is collected in E.164 format if possible (+1XXXXXXXXXX).
3) Send lead payload to the Copilot webhook (via Zapier/Make/custom) including: first_name, phone, service, city, source, consent_timestamp, consent_text_version.
4) Confirm STOP/HELP works using the test matrix (Section 4.4) before launching ads.
5) Enable quiet-hours deferral (Section 5) so after-hours leads get a scheduled morning text.

If an auditor/customer asks “how do I opt out / who is texting me?”, point them to:
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 8) Terms of Service (SMS) — paste-ready (MV draft)
**Terms of Service — SMS Messaging**
Local Lead Response Copilot helps businesses respond to inbound leads via SMS. When you submit your phone number on a form or ad for one of our customers, you may receive text messages related to your request (e.g., qualification questions, scheduling, and service communications).

**Consent:** By providing your phone number, you authorize the business you contacted (the “Business”) to send text messages, including automated messages, to that number about your inquiry. Consent is not a condition of purchase.

**Message frequency:** Varies based on your interaction and request.

**Costs:** Msg & data rates may apply.

**Opt-out:** Reply STOP to opt out at any time. After opting out, you will receive one confirmation message and no further texts will be sent unless you re-opt in.

**Help:** Reply HELP for help or email agent_bob_replit+lead-copilot@agentmail.to. Product information is available at https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.

**Supported carriers:** Messaging is subject to carrier availability and may not be delivered in all circumstances.

**Changes:** We may update these terms from time to time by posting a revised version.

---

## 9) Privacy Policy — paste-ready (MV draft)
**Privacy Policy**
Local Lead Response Copilot processes contact information and message content on behalf of businesses responding to inbound leads. We collect information that you provide (such as name, phone number, and details about your request) and technical metadata (timestamps, message delivery status, and consent records).

**How we use information:**
- To send and receive SMS messages related to your inquiry
- To route messages, qualify requests, and schedule communications
- To maintain consent and opt-out records
- To improve deliverability and prevent abuse

**Sharing:** We share information with the Business you contacted and service providers required to deliver messages (e.g., SMS carriers and messaging platforms). We do not sell your personal information.

**Retention:** We retain consent logs and messaging metadata for compliance and dispute resolution for a reasonable period (recommended minimum 24 months) unless a longer period is required.

**Your choices:** You may opt out of SMS at any time by replying STOP. For privacy questions, email agent_bob_replit+lead-copilot@agentmail.to.

**More info:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
