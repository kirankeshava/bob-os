# Local Lead Response Copilot — MV Compliance + Deliverability Pack (Website Pages + STOP/HELP + Quiet Hours + Agency Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T16:07:48.368Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Pack (Agency + Pilot Ready)

Business proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
Support email: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Website Page (Copy/Paste): Terms of Service — SMS Messaging

**Title:** SMS Messaging Terms

These SMS Messaging Terms (“SMS Terms”) describe how Local Lead Response Copilot (“we,” “us”) sends text messages on behalf of participating local businesses (“Business”) to people who request information or services.

### 1.1 Program description
If you submit your phone number through a Business’s website form, scheduling form, web chat, or lead ad (e.g., Meta/Facebook Lead Ads) and choose to receive text messages, you may receive SMS messages related to:
- Responding to your service inquiry
- Asking a small number of questions to qualify your request
- Confirming appointment times or call scheduling
- Sending reminders, reschedule links, or relevant service information

### 1.2 Consent (opt-in)
By providing your mobile number and selecting/agreeing to the SMS disclosure at the point of capture, you authorize the Business and Local Lead Response Copilot to send you text messages using an automated system. Consent is not a condition of purchase.

### 1.3 Message frequency
Message frequency varies based on your request and responses. Typically 1–6 messages per inquiry.

### 1.4 Costs
Message and data rates may apply.

### 1.5 Opt-out (STOP)
You can opt out at any time by replying **STOP**. After you opt out, you will receive a confirmation message and we will stop sending messages to that number unless you later re-consent.

### 1.6 Help (HELP)
For help, reply **HELP** or contact us at **agent_bob_replit+lead-copilot@agentmail.to**.

### 1.7 Supported carriers & delivery
Carriers are not liable for delayed or undelivered messages. Delivery is subject to carrier policies and network availability.

### 1.8 Prohibited use
You agree not to use the SMS program for unlawful, abusive, or fraudulent purposes. We may suspend messaging to any number that triggers carrier complaints, spam indicators, or compliance concerns.

### 1.9 Changes
We may update these SMS Terms from time to time. The latest version will be available at: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

---

## 2) Website Page (Copy/Paste): Privacy Policy (Lead Intake + SMS)

**Title:** Privacy Policy

This Privacy Policy explains how Local Lead Response Copilot (“we,” “us”) collects, uses, and shares information when powering lead response and SMS qualification on behalf of participating local businesses (“Business”).

### 2.1 Information we collect
Depending on what you submit and how you interact, we may collect:
- Contact details: name, phone number, email
- Inquiry details: service requested, location, preferred time, notes you provide
- Message metadata: timestamps, message content, delivery status, opt-in/opt-out status
- Technical data: form source, landing page URL, ad source, IP address (if provided by the lead source), and consent checkbox status

### 2.2 How we use information
We use information to:
- Respond to your inquiry quickly via SMS
- Ask short qualification questions and route you to the right Business
- Book or propose calls/appointments
- Maintain compliance records (consent logs, STOP/HELP handling)
- Prevent abuse, spam, and fraud; monitor deliverability and performance

### 2.3 Sharing of information
We may share information with:
- The Business you contacted (so they can provide services)
- Messaging providers (e.g., SMS carriers and SMS platforms) to deliver texts
- Scheduling/CRM tools used by the Business (e.g., calendars, CRM, or helpdesk tools)

We do **not** sell personal information.

### 2.4 Data retention
We retain lead and messaging records as needed to provide the service and maintain compliance. Typical retention is 24 months for consent and messaging audit logs unless a longer period is required for dispute resolution or legal obligations.

### 2.5 Your choices
- **Opt-out:** Reply **STOP** to stop SMS messages.
- **Help:** Reply **HELP** or email **agent_bob_replit+lead-copilot@agentmail.to**.
- You may request access, correction, or deletion of your information by emailing support. We may need to retain certain records for compliance.

### 2.6 Security
We use reasonable administrative, technical, and organizational safeguards to protect information. No method of transmission or storage is 100% secure.

### 2.7 Children
This service is not directed to children under 13.

### 2.8 Contact
Questions about this policy: **agent_bob_replit+lead-copilot@agentmail.to**  
Service information: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

---

## 3) Opt-in / Consent Snippets (Copy/Paste)

### 3.1 Webflow / website forms (below phone field)
**Checkbox label (recommended):**
“I agree to receive text messages about my inquiry/appointment from [BUSINESS NAME] via an automated system. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not a condition of purchase. Terms: [TERMS URL] Privacy: [PRIVACY URL].”

**Implementation notes:**
- Make it an unchecked checkbox by default.
- Store the checkbox value + timestamp + page URL.

### 3.2 Typeform
Add a “Legal” or “Statement” block + a required yes/no question:
**Prompt:** “SMS updates?”
**Yes option text:** “Yes, text me about my request.”
**Disclosure text (shown near prompt):**
“By selecting Yes, you agree to receive texts about your inquiry from [BUSINESS NAME] via an automated system. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not a condition of purchase. Terms: [TERMS URL] Privacy: [PRIVACY URL].”

### 3.3 Meta/Facebook Lead Ads (best effort within platform constraints)
In the Lead Form:
- Add a custom question/consent checkbox: “I agree to receive text messages about my inquiry.”
- Add a privacy policy link to your Privacy URL.

**Follow-up message (first SMS must repeat key disclosures):**
“Hi {first_name}—this is {business_name}. You requested info about {service}. I can help—can I ask 2 quick questions to get you a quote? Reply STOP to opt out, HELP for help.”

---

## 4) STOP / HELP Handling (Implementation Spec — Code Ready)

### 4.1 Keywords (case-insensitive, trimmed)
**STOP keywords:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT  
**HELP keywords:** HELP, INFO  
**START/UNSTOP (optional):** START, YES, UNSTOP

### 4.2 State machine
Per phone number (E.164) maintain `sms_status`:
- `active`
- `stopped`

**On inbound STOP keyword:**
1) Set `sms_status=stopped` immediately.
2) Write audit log event `opt_out_received` with raw message, timestamp, campaign/business identifiers.
3) Add number to a **global suppression list** (across all businesses in the workspace unless legally separated).
4) Send exactly one confirmation message:
   - “You’re opted out and will no longer receive messages. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”

**On inbound HELP keyword:**
1) Do not change subscription state.
2) Write audit log event `help_received`.
3) Send help message:
   - “Help: This number sends updates about your service inquiry/appointment. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

**On inbound START/UNSTOP (only if you support re-consent):**
- Only reactivate if you can prove prior opt-in or capture fresh opt-in.
- If reactivated, log `opt_in_restarted` and confirm:
  - “You’re re-subscribed. Reply STOP to opt out.”

### 4.3 Outbound enforcement
Before any outbound send, check:
- If `sms_status=stopped` OR number exists in suppression list ⇒ **block send**.
- Log `blocked_due_to_optout` with attempted message and workflow id.

### 4.4 Required audit log fields
Minimum fields per event:
- `event_type` (opt_in_captured, first_message_sent, opt_out_received, help_received, blocked_due_to_optout, quiet_hours_deferred, message_sent, message_failed)
- `timestamp_utc`
- `phone_e164`
- `business_id` / `location_id`
- `lead_source` (webflow/typeform/meta/manual)
- `consent_checked` (boolean)
- `consent_text_version` (hash or version string)
- `consent_page_url` (where captured)
- `message_body` (inbound/outbound)
- `provider_message_id` (Twilio SID)

---

## 5) Quiet Hours by Timezone (Implementation Spec)

### 5.1 Default rule (recommended for pilots)
Do not send marketing-like or qualification messages outside **8:00am–8:00pm local time**. (Transactional confirmations may be allowed later, but keep MVP simple: defer all non-emergency.)

### 5.2 Timezone resolution order
1) Lead-provided timezone (rare)
2) Business location timezone (if lead is local service area)
3) Infer from lead phone area code (best-effort)
4) Infer from lead ZIP/city/state fields (if present)
5) Fallback to Business timezone

Log which method was used: `timezone_source`.

### 5.3 Deferral behavior
If message is triggered during quiet hours:
- Do **not** send immediately.
- Create a deferred job for the next allowed window at 8:05am local.
- Log `quiet_hours_deferred` with the computed send time.

### 5.4 Overrides
- Admin override flag (per business): `quiet_hours_override=true` for emergency use only.
- If override used, log `quiet_hours_override_used` and who triggered it.

### 5.5 Verification tests (agency checklist)
- Lead enters at 9:30pm local ⇒ first message queued for 8:05am.
- Lead replies STOP at 2:00am ⇒ opt-out processed immediately (inbound is allowed), outbound remains blocked.
- DST transition week ⇒ scheduled sends still occur within 8am–8pm local.

---

## 6) Deliverability Guidance (Minimum Viable)

### 6.1 Content rules
- Keep messages short, conversational, and 1:1.
- Avoid ALL CAPS, excessive punctuation, repeated links, URL shorteners, and “free/guarantee/act now” language.
- Include business name early.
- Include STOP/HELP reminder at least in the first message of a thread.

### 6.2 Links
- Prefer one link max per message.
- Use your own domain when possible.
- Avoid link-only messages.

### 6.3 Cadence
- Do not send more than ~6 messages without a recipient reply.
- If no response, stop after 2 follow-ups (e.g., +15 min, +24 hours).

### 6.4 Twilio setup (no-spend order)
1) Use a Twilio Messaging Service (pool future numbers; enable smart encoding if available).
2) Decide sending route:
   - **10DLC**: best for US local volume; requires A2P registration.
   - **Toll-free**: can work for lower volume; still may require verification.
3) Start A2P Brand/Campaign registration when moving beyond a pilot.

---

## 7) Agency Handoff: Zapier/Make Field Mapping (Consent Logging)

When creating the “Send SMS / Start Qualification” automation, pass these fields into the webhook to the Copilot:
- `lead_phone` (E.164 if possible)
- `lead_first_name`
- `lead_last_name`
- `lead_email`
- `service_requested`
- `consent_sms` (true/false)
- `consent_timestamp` (from form submission time)
- `consent_page_url` (landing page URL)
- `lead_source` (webflow/typeform/meta)
- `ad_id` / `form_id` (if Meta)

Operational rule: **If `consent_sms=false`, do not initiate SMS**. Route lead to email-only or manual call.

---

## 8) STOP/HELP Verification Matrix (Pilot Sign-Off)

Minimum tests to run with a real number before onboarding any paying client:
1) Send first message ⇒ confirm it includes business name + STOP/HELP.
2) Reply HELP ⇒ confirm help response returns (and is logged).
3) Reply STOP ⇒ confirm opt-out confirmation returns and status becomes stopped.
4) Attempt outbound after STOP ⇒ must be blocked and logged.
5) Reply STOPALL / UNSUBSCRIBE ⇒ same behavior as STOP.
6) Quiet hours trigger ⇒ message deferred, not sent; then sent at next window.

Evidence required:
- Provider message IDs (Twilio SIDs)
- Audit log entries for each event type above

---

If you need edits for a specific client niche (plumbing, roofing, med spa, legal intake), send the exact form fields + current ad copy and I’ll tailor the opt-in language and first 3-message flow while keeping compliance intact.
