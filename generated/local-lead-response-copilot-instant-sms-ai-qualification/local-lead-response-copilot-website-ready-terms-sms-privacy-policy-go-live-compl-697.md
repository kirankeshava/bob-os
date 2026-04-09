# Local Lead Response Copilot — Website-Ready Terms (SMS) + Privacy Policy + Go-Live Compliance Acceptance Criteria

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:37:52.438Z

---

Below is website-ready copy you can paste into two pages (Terms + Privacy). Once published, agencies should link to these pages from every opt-in snippet. Use the proof site URL for legitimacy and the support email for HELP/support requests.

BUSINESS ID / CONTACT
Service name: Local Lead Response Copilot (Instant SMS + AI Qualification)
Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support email: agent_bob_replit+lead-copilot@agentmail.to

========================
PAGE 1: TERMS OF SERVICE (INCLUDING SMS TERMS)
========================
Last updated: [Enter date]

1) Overview
Local Lead Response Copilot (“we,” “us,” “our”) provides software that helps local businesses respond to inbound leads faster via text message (SMS/MMS), ask short qualification questions, and route qualified leads to booking/calls.

2) Who uses the service
Our customers are businesses (“Business Customers”). End users are prospective customers/leads of those businesses (“Leads”). We process Lead data on behalf of our Business Customers.

3) SMS/Text Messaging Terms (Important)
3.1 Consent / Opt-in
By providing your phone number and checking any consent box or otherwise agreeing to receive text messages, you authorize the Business Customer (and its service providers, including Local Lead Response Copilot) to send you text messages at the number you provided regarding your inquiry, estimate request, appointment, and related follow-ups.

Consent is not a condition of purchase.

3.2 Message frequency
Message frequency varies based on your interaction and the Business Customer’s workflow (for example, follow-up questions to qualify your request and coordinate scheduling).

3.3 Costs
Message and data rates may apply.

3.4 STOP / Opt-out
You can opt out at any time by replying STOP. After you text STOP, you should receive a confirmation message and no further texts will be sent unless you opt back in.

3.5 HELP
For help, reply HELP or contact: agent_bob_replit+lead-copilot@agentmail.to

3.6 Supported carriers / delivery
Carriers are not liable for delayed or undelivered messages. Message delivery can be affected by mobile carrier filtering, device settings, network availability, and other factors.

3.7 No prohibited content
We do not permit the service to be used for: illegal content, hate/harassment, adult content, payday loans, deceptive offers, or any content that violates carrier policies or applicable law.

4) Acceptable Use
You agree not to misuse the service, including attempting to send spam, send messages to people without consent, or circumvent opt-outs/suppression.

5) Third-party services
We may use third-party vendors (for example, SMS providers such as Twilio) to deliver messages. Their terms may also apply.

6) Disclaimers
The service is provided “as is” and “as available.” We do not guarantee lead conversion outcomes.

7) Limitation of liability
To the maximum extent permitted by law, Local Lead Response Copilot will not be liable for indirect, incidental, special, or consequential damages.

8) Changes
We may update these Terms from time to time. Updates will be posted on this page with a new “Last updated” date.

9) Contact
Questions about these Terms: agent_bob_replit+lead-copilot@agentmail.to
Proof of service/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

========================
PAGE 2: PRIVACY POLICY (WITH SMS/LEAD DATA)
========================
Last updated: [Enter date]

1) Scope
This Privacy Policy explains how Local Lead Response Copilot collects, uses, and shares information when operating our website and providing our services to Business Customers. When we process Lead information for a Business Customer, we act as a service provider/processor.

2) Information we collect
A) Lead information (on behalf of Business Customers)
Depending on what you submit through a form/ad or provide via text, we may process:
- Name
- Phone number
- Email
- Service address or ZIP code (if provided)
- Message content and qualification answers
- Appointment preferences
- Metadata such as timestamps, delivery status, and campaign/source fields

B) Website information
If you visit our website, we may collect standard web logs (IP address, user agent, pages viewed) and cookies as applicable.

3) How we use information
We use information to:
- Send and receive SMS/MMS messages related to a Lead’s inquiry
- Ask short qualification questions and route qualified leads
- Facilitate scheduling/booking or call routing
- Provide support and troubleshoot delivery/compliance issues
- Maintain security, prevent fraud/abuse, and enforce opt-outs
- Maintain audit logs for consent and messaging events

4) SMS consent and phone numbers
We use phone numbers to deliver requested communications. We do not sell phone numbers. Business Customers are responsible for obtaining appropriate consent from Leads before messaging.

5) Sharing of information
We may share information with:
- SMS and communications vendors (e.g., Twilio) to deliver messages
- Scheduling/CRM tools connected by the Business Customer (e.g., Calendly, HubSpot), where configured
- Service providers for hosting, analytics, and support

We may also disclose information if required by law or to protect rights/safety.

6) Data retention
We retain Lead data and message logs as needed to provide the service and to maintain compliance/auditability (including consent and opt-out records). Retention periods may be configured per Business Customer.

7) Security
We implement reasonable administrative, technical, and organizational safeguards designed to protect data. No system is 100% secure.

8) Your choices and rights
If you are a Lead and want to access, correct, or delete your information, please contact the Business Customer you interacted with. You can also contact us at agent_bob_replit+lead-copilot@agentmail.to and we will route the request appropriately.

SMS opt-out: Reply STOP to stop receiving text messages.

9) Changes
We may update this Privacy Policy from time to time. Changes will be posted on this page with a new “Last updated” date.

10) Contact
Privacy questions: agent_bob_replit+lead-copilot@agentmail.to
Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

========================
GO-LIVE COMPLIANCE ACCEPTANCE CRITERIA (AGENCY / PILOT QA)
========================
A) Opt-in requirements (must be true before first outbound text)
1. Lead source includes clear disclosure: “By submitting, you agree to receive texts… Msg&data rates may apply… Msg frequency varies… Reply STOP to opt out, HELP for help… Consent not a condition of purchase.”
2. The phone field is not prefilled with someone else’s number.
3. Consent checkbox is unchecked by default (when applicable) and captured.
4. Terms + Privacy links are present and point to the published URLs (not placeholders).

B) STOP handling (must be verifiable)
Inbound keywords treated as opt-out (case-insensitive, trimmed): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT.
Expected behavior:
- Immediately mark recipient as “opted_out=true” in a global suppression list.
- Send confirmation once: “You’re unsubscribed. No more messages. Reply START to re-subscribe.”
- Block all future outbound messages to that number across all campaigns/workflows until re-opt-in.
Required logs:
- inbound_message_received (content=STOP)
- opt_out_applied (scope=global)
- outbound_message_blocked events for any attempted sends after opt-out
- stop_confirmation_sent (with message SID/provider ID)

C) HELP handling
Inbound keywords: HELP, INFO.
Expected behavior:
- Send: “Local Lead Response Copilot: help is available at agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
Required logs:
- inbound_message_received (content=HELP)
- help_response_sent

D) Quiet hours (by recipient timezone)
Minimum rule (pilot-safe): Only send between 8:00am and 8:00pm recipient local time.
Timezone resolution order:
1) Lead-provided timezone
2) Area code mapping
3) ZIP/state mapping (if captured)
4) Default to Business Customer timezone (last resort)
Expected behavior:
- If a lead arrives outside window, queue the first outbound SMS to the next allowed time.
- Do not “stack” multiple queued texts; send the latest relevant message first.
Required logs:
- quiet_hours_deferred (next_send_at, resolved_timezone, local_time)
- quiet_hours_sent (actual_send_at)

E) Content guardrails (deliverability)
- No misleading claims (e.g., “free,” “guaranteed,” “act now”) unless true and supported.
- Avoid link shorteners; prefer clean domains.
- Include business identification early (business name and why you’re texting: “re: your request”).
- Keep first message short; ask 1 question at a time.

F) Consent logging (minimum fields)
Store per lead/message:
- phone, created_at, source (webflow/typeform/meta), ip/user_agent if available
- consent_checkbox (true/false), consent_text_version_id
- timestamp of consent capture
- initial_message_template_id
- message provider IDs and delivery status
- opt-out timestamp + keyword + scope

If these acceptance criteria can’t be met for a lead source, do not launch that source until fixed.