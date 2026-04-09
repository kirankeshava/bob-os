# Local Lead Response Copilot — MV Compliance Pack (Terms/Privacy Draft + STOP/HELP Rules + Quiet Hours Algorithm + Agency Opt-in Snippets)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:39:02.406Z

---

Below is minimum-viable compliance content and implementation guidance for pilots. It is written to be copy/pasted into website pages and agency client forms, and to be implemented in webhook/Zapier/Make + Twilio (or equivalent).

BUSINESS ID (use everywhere)
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/Contact: agent_bob_replit+lead-copilot@agentmail.to

1) TERMS OF SERVICE (SMS) — DRAFT (COPY/PASTE)
Title: Terms of Service (SMS)
Effective Date: [Month Day, Year]

Local Lead Response Copilot (“we,” “us,” “our”) provides an SMS-based lead response and qualification service on behalf of participating local businesses (“Business Clients”). By providing your phone number and opting in, you agree to receive text messages related to your inquiry, including appointment scheduling, follow-up questions to qualify your request, and service updates.

Consent to Receive Messages
- By submitting your phone number through a web form, scheduling form, or lead ad that includes an SMS consent disclosure, you authorize us and/or the Business Client to send text messages to the number provided.
- Consent is not a condition of purchase.

Message Types and Frequency
- Message types may include: first-response to a request, questions to gather details, appointment confirmations, reminders, and limited follow-up if we do not receive a reply.
- Message frequency varies based on your interaction and the nature of your request.

STOP / Opt-Out
- You can opt out at any time by replying STOP.
- After you send STOP, you will receive a confirmation message and no further texts will be sent unless you re-opt in.

HELP
- Reply HELP for assistance.

Carrier and Fees
- Message and data rates may apply.
- Carriers are not liable for delayed or undelivered messages.

Eligibility and Phone Numbers
- You represent that you are the subscriber or customary user of the phone number provided and that you can receive text messages at that number.

Prohibited Use
- You agree not to use our service to send unlawful, abusive, or deceptive messages.

Privacy
- Our Privacy Policy describes how we collect and use information, including phone numbers and conversation metadata.

Changes
- We may update these Terms from time to time. Updates will be posted on this page with a revised Effective Date.

Contact
Questions about these Terms: agent_bob_replit+lead-copilot@agentmail.to

2) PRIVACY POLICY — DRAFT (COPY/PASTE)
Title: Privacy Policy
Effective Date: [Month Day, Year]

Local Lead Response Copilot (“we,” “us,” “our”) operates an SMS-based lead response and qualification workflow on behalf of local businesses. This Privacy Policy explains what we collect, how we use it, and your choices.

Information We Collect
- Contact information: phone number, name (if provided), and email (if provided).
- Lead source information: form/ad source, timestamp, page URL (if available), and any fields you submit (e.g., service type, address, job details).
- Messaging data: message content exchanged for qualification/scheduling, delivery status, timestamps.
- Technical/log data: consent records, opt-out records, and system logs needed for compliance and troubleshooting.

How We Use Information
- To respond to your inquiry quickly, ask qualifying questions, and schedule appointments.
- To provide customer support and troubleshoot delivery/opt-out issues.
- To maintain compliance with messaging policies (e.g., logging consent and honoring STOP).

Sharing
- We may share information with the Business Client you contacted to fulfill your request.
- We may use service providers (e.g., SMS/telecom, scheduling, automation tools) to operate the service.
- We do not sell personal information.

Retention
- We retain consent logs and opt-out records as needed for compliance and auditing.

Your Choices
- Opt out of SMS at any time by replying STOP.
- For help, reply HELP or email agent_bob_replit+lead-copilot@agentmail.to.

Security
- We take reasonable measures to protect information but cannot guarantee absolute security.

Contact
Privacy questions: agent_bob_replit+lead-copilot@agentmail.to

3) STOP/HELP HANDLING — IMPLEMENTATION RULESET (ENGINEERING/AGENCY)
Goal: guarantee immediate opt-out compliance (STOP) and assistance response (HELP) across all numbers, sources, and flows.

3.1 Keywords (case-insensitive, ignore leading/trailing punctuation/whitespace)
- STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO, SUPPORT

3.2 State machine
- Subscriber states: ACTIVE, OPTED_OUT
- Transition:
  - If inbound matches STOP keyword: set state=OPTED_OUT immediately, record timestamp/source, and block all future outbound messages to that number across all campaigns/workflows until re-opt-in.
  - If inbound matches HELP keyword (and state=ACTIVE or OPTED_OUT): send HELP response (below). Do not change opt-out status.
  - If inbound matches other content:
    - If state=OPTED_OUT: do not send any marketing/qualification messages; optionally send a single compliance-safe notice: “You’re opted out. Reply START to re-subscribe.” (Only if your policy allows and carrier guidelines permit; safest is: send nothing.)

3.3 Confirmation copy (must be single message, no links required)
- STOP confirmation: “You’re opted out and will no longer receive texts. Reply START to re-subscribe. Msg&data rates may apply.”
- HELP response: “Local Lead Response Copilot support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Msg&data rates may apply. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

3.4 Re-opt-in
- Re-opt-in keyword: START (optionally YES)
- Only transition OPTED_OUT -> ACTIVE if inbound matches START/YES AND you can associate it to a prior opt-in context OR you immediately send a confirmation: “You’re re-subscribed. Reply STOP to opt out.”

3.5 Global suppression list requirements
- Store at minimum: phone_e164, opted_out_at, opted_out_source (keyword), last_message_sid (if Twilio), client_id (if multi-tenant), and raw_inbound_text hash.
- Enforcement point: BEFORE enqueueing any outbound SMS. If opted out, do not call provider API.

3.6 Required log events (for audits)
- consent.recorded (lead_id, phone, timestamp, source, disclosure_text_version)
- sms.inbound.received (phone, body, timestamp, provider_message_id)
- sms.optout.applied (phone, keyword, timestamp)
- sms.outbound.blocked_optout (phone, attempted_template, timestamp)
- sms.help.sent (phone, timestamp)

4) QUIET HOURS — IMPLEMENTATION ALGORITHM (TIMEZONE-AWARE)
Goal: avoid sending messages at night in the lead’s local time while preserving speed-to-lead via scheduled queue.

4.1 Default windows
- Allowed send window (lead local time): 08:00–20:00 (8am–8pm)
- If outside window: defer until next allowed time.

4.2 Timezone resolution order (best-effort)
1) Explicit timezone field captured on form (if present)
2) Lead phone number area code -> timezone (fallback mapping)
3) Business Client default timezone (account setting)
If timezone cannot be resolved, use Business Client default.

4.3 Scheduling rules
- If lead arrives outside window:
  - Send NOTHING immediately (except if Business Client toggles “After-hours allowed” for emergencies).
  - Create a scheduled job for next window start (08:00 local).
  - Preserve original “first response” template, but prepend a short acknowledgement when sending later (example): “Thanks for reaching out—just seeing this. Quick question:”
- If lead arrives inside window: send instantly.

4.4 Edge cases
- If multiple deferred leads exist: send in FIFO order at window start with a small jitter (e.g., 5–20 seconds) to reduce burst filtering.
- If user replies during quiet hours: you may respond (conversational) if the user initiated the message; still avoid repeated outbound sequences.

4.5 Required logs
- quiet_hours.deferred (lead_id, phone, local_time, timezone, scheduled_for)
- quiet_hours.sent_after_deferral (lead_id, sent_at)

5) AGENCY COPY/PASTE OPT-IN SNIPPETS (WEBFLOW / TYPEFORM / FB LEAD ADS)
Use these snippets verbatim or minimally customized. Do not remove STOP/HELP + rates language.

5.1 Universal checkbox label (recommended)
“By checking this box, I agree to receive text messages (SMS) about my request, including appointment scheduling and follow-up questions, from [Business Name] via Local Lead Response Copilot. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

5.2 If checkbox not possible (disclosure text near submit button)
“By submitting, you agree to receive texts about your request from [Business Name] via Local Lead Response Copilot. Msg&data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

5.3 Meta/Facebook Lead Ads (Short)
“I agree to receive SMS about my inquiry from [Business Name] via Local Lead Response Copilot. Msg&data rates may apply. Reply STOP to opt out.”

5.4 First SMS template (must include business identification)
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—can I ask 2 quick questions to get you the right quote? Reply STOP to opt out.”

5.5 Qualification question examples (keep short; avoid spam words)
1) “What service do you need? (e.g., repair, install, estimate)”
2) “What’s your ZIP code?”
3) “When would you like to schedule?”

6) DELIVERABILITY CONTENT GUIDELINES (MINIMUM)
- Avoid: ALL CAPS, excessive punctuation, repeated links, ‘free!!!’, ‘urgent’, ‘act now’, crypto/loan language.
- Keep links minimal; if needed, use one consistent branded domain once.
- Always identify the business in the first message.
- Keep templates conversational and specific to the inquiry.

Owner/Agency note: Once Terms/Privacy pages are published on the proof site, replace [TERMS_URL] and [PRIVACY_URL] everywhere. For assistance, contact agent_bob_replit+lead-copilot@agentmail.to and reference the proof URL above when clients ask for legitimacy.