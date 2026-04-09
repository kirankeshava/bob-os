# Local Lead Response Copilot — MV Terms (SMS) + Privacy Policy + Implementation Specs (STOP/HELP + Quiet Hours) — Agency Paste-Ready

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:14:42.459Z

---

Below is paste-ready content for (A) Terms of Service (SMS) and (B) Privacy Policy, plus (C) implementation specs for STOP/HELP handling and quiet hours. Replace bracketed placeholders (e.g., [Client Business Name]) when deploying for a specific end-customer.

A) TERMS OF SERVICE (SMS) — MINIMUM VIABLE COMPLIANT (PILOTS)

Title: Local Lead Response Copilot — Terms of Service (including SMS Terms)

Last updated: [DATE]

1) Who we are
Local Lead Response Copilot provides automated lead-response and qualification messaging on behalf of participating businesses (“Clients”). Our service helps Clients respond to inbound inquiries quickly via SMS and route qualified leads to scheduling/calls.

Service proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

2) SMS messaging program — important disclosures
When you submit your phone number through a Client’s website form, booking form, or lead form (including platforms like Meta/Facebook Lead Ads), you may receive text messages related to your inquiry. Messages may include:
- Confirmation that your request was received
- Short questions to qualify your request (e.g., service type, location, timing)
- Scheduling links or appointment confirmations
- Follow-ups related to your inquiry

Consent: By providing your number and checking any required consent box (or otherwise explicitly consenting where required), you agree to receive text messages from the Client, sent via Local Lead Response Copilot, to the number you provided.

Not a condition of purchase: Consent to receive texts is not a condition of purchase.

Message frequency: Message frequency varies based on your interaction and the nature of your request.

Carrier disclosures: Message and data rates may apply. Carriers are not liable for delayed or undelivered messages.

3) Opt-out and help
STOP: Reply STOP to opt out of text messages at any time. After opting out, you will receive a one-time confirmation of your opt-out and no further messages will be sent unless you re-consent.

HELP: Reply HELP for help. You will receive instructions and a support contact.

4) Eligibility
You must be at least 18 years old and authorized to use the phone number you provide.

5) Service limitations
We do not guarantee message delivery. Delivery may be affected by carrier filtering, device settings, network availability, and compliance requirements.

6) Prohibited use
You agree not to use our service or allow its use for spam, fraud, harassment, or sending messages without required consent. We may suspend service to any Client account that appears to violate applicable laws or carrier policies.

7) Privacy
Our collection and use of information is described in our Privacy Policy (see below).

8) Contact
For questions about these Terms, contact: agent_bob_replit+lead-copilot@agentmail.to


B) PRIVACY POLICY — MINIMUM VIABLE COMPLIANT (PILOTS)

Title: Local Lead Response Copilot — Privacy Policy

Last updated: [DATE]

1) Overview
This Privacy Policy explains how Local Lead Response Copilot collects, uses, and shares information when we help businesses (“Clients”) respond to inbound leads by SMS and related channels.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to

2) Information we collect
We may collect or process the following categories of information, depending on what you submit and how Clients configure their forms/ads:
- Contact information: phone number, name, email
- Inquiry details: service requested, address/ZIP, timing/availability, job notes
- Messaging data: SMS content, timestamps, delivery status, opt-out status
- Scheduling data: appointment preferences, booking confirmations (if enabled)
- Technical/log data: consent event logs, webhook event logs, error logs

3) How we use information
We use information to:
- Respond to your inquiry and facilitate communication with the Client
- Ask short qualifying questions to route your request appropriately
- Provide scheduling/booking links or appointment confirmations (if enabled)
- Maintain compliance records (consent logs, opt-out logs)
- Monitor and improve deliverability and reliability
- Prevent fraud and abuse

4) SMS consent and opt-out
If you consented to SMS, you can opt out at any time by replying STOP. You can request help by replying HELP.

5) How we share information
We share information in limited ways:
- With the Client you contacted (so they can provide the requested service)
- With service providers who help us operate the platform (e.g., SMS delivery providers such as Twilio)
- If required by law, legal process, or to protect rights and safety

No sale of personal information: We do not sell your personal information.

6) Data retention
We retain information as needed to provide the service and to maintain compliance and audit records. Retention periods may vary by Client and legal requirements. Opt-out and consent logs are retained to support dispute handling.

7) Security
We use reasonable administrative and technical safeguards designed to protect information. No method of transmission or storage is 100% secure.

8) Your choices
- Opt out of SMS: Reply STOP
- Help: Reply HELP
- Contact: Email agent_bob_replit+lead-copilot@agentmail.to with questions or requests.

9) Updates
We may update this policy from time to time. The “Last updated” date will reflect changes.


C) IMPLEMENTATION SPECS — STOP/HELP + QUIET HOURS (CODE/WORKFLOW READY)

C1) STOP/UNSUBSCRIBE HANDLING (required)

Goal: immediate, reliable opt-out enforcement across all clients/campaigns for the recipient number.

Recognized opt-out keywords (case-insensitive; ignore surrounding whitespace and punctuation):
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

Recognized help keywords:
- HELP, INFO

Recommended additional keywords (optional but useful):
- START, YES (to re-consent only when compliant in your flow)

State machine per phone number (global at Messaging Service/account level):
- State: ACTIVE (default)
- State: OPTED_OUT (after STOP-family keyword)

Inbound processing rules:
1) On inbound message, normalize body.
2) If matches STOP-family keyword:
   - Set recipient state to OPTED_OUT immediately.
   - Write audit log event: type=opt_out, source=inbound_sms, keyword=[matched], timestamp, messaging_service_sid/number, lead_id (if known).
   - Send one confirmation message exactly once (if not already confirmed within last 24h):
     "You’re opted out and will no longer receive texts. Reply HELP for help."
   - Do not send any additional messages afterward.
3) If matches HELP keyword:
   - Send help message (even if opted out is allowed; recommended to still allow HELP response):
     "Local Lead Response Copilot: We text about your service inquiry. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4"
   - Write audit log event: type=help, source=inbound_sms, timestamp.

Outbound enforcement rules:
- Before sending any outbound SMS, check suppression list:
  - If OPTED_OUT: block send; write audit log event type=blocked_send_opted_out.
  - If no consent record exists (when required by your use case): block send; write audit log event type=blocked_send_no_consent.

Required audit log fields (minimum):
- event_id, event_type, phone_e164, client_id, lead_id (nullable), timestamp_utc, message_direction, message_body_hash (or redacted body), provider_message_id (if any), suppression_state_after, consent_id (nullable), source (form/meta/typeform/webflow/manual), ip/user_agent (if available at consent time).

C2) QUIET HOURS BY TIMEZONE (required)

Goal: avoid sending texts during restricted local hours; improve compliance posture and reduce complaints.

Default allowed window (recommended for pilots):
- 8:00 AM to 8:00 PM local time of the lead (configurable per Client)

Timezone resolution order:
1) Lead-provided ZIP/postal code → map to timezone
2) Lead-provided address/city/state → map to timezone
3) Client’s business timezone fallback
4) If unknown: assume Client’s business timezone and log timezone_source=fallback

Sending logic:
- When an outbound message is triggered:
  1) Determine lead_timezone and local_now.
  2) If local_now within allowed window: send immediately.
  3) If outside allowed window:
     - Defer message into a queue with scheduled_send_time = next allowed start (e.g., next day 8:00 AM local).
     - Write audit log event type=deferred_quiet_hours including scheduled_send_time and timezone_source.

Edge cases:
- If a lead explicitly initiates a conversation by texting first outside quiet hours, you may respond (transactional) but still avoid long sequences; log source=inbound_initiated.
- If an appointment is imminent (configurable, e.g., within 2 hours) and the lead previously consented, allow a single transactional reminder even if near quiet hours boundary; log override_reason=appointment_critical.

Admin overrides:
- Per Client setting: allow manual override for urgent operational texts.
- All overrides must be logged with: override_user, override_reason, timestamp.


AGENCY HANDOFF NOTES (copy/paste guidance)
- Publish the Terms page and Privacy page on the Client’s site (e.g., /terms and /privacy). Then update every form/ad consent snippet to link to those URLs.
- Ensure the first outbound message contains: business identification, why they’re being texted (their inquiry), and STOP/HELP instructions.
- Do not include shortened links; prefer full domains or the Client’s domain. Avoid heavy punctuation, ALL CAPS, and spammy phrases.
- Use the support email consistently for HELP and compliance contacts: agent_bob_replit+lead-copilot@agentmail.to and include the proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

Verification checklist (minimum):
1) Send test lead → first message received within 60 seconds (inside quiet hours).
2) Reply HELP → help message returned with support email + URL.
3) Reply STOP → receive opt-out confirmation; further sends blocked.
4) Attempt outbound after STOP → blocked + audit log created.
5) Trigger message outside allowed window → deferred and delivered at next window start; log shows timezone_source and scheduled time.
