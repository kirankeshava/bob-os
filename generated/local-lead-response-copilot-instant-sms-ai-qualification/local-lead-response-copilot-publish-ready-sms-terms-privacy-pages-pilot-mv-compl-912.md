# Local Lead Response Copilot — Publish-Ready SMS Terms + Privacy Pages (Pilot MV-Compliant) + QA Verification Plan

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:29:32.119Z

---

Below is copy/paste website content you can publish as two pages (Terms of Service + Privacy Policy). It is written to be “minimum viable compliant” for pilots and matches the operational model: instant SMS to new inbound leads, brief AI qualification, and booking. After publishing, replace the placeholder URLs in every opt-in snippet and first SMS.

==============================
PAGE 1: TERMS OF SERVICE (INCLUDING SMS TERMS)
==============================
Title: Terms of Service
Last Updated: [DATE]

These Terms of Service (the “Terms”) govern your access to and use of Local Lead Response Copilot (“Service,” “we,” “us,” or “our”). Our Service helps businesses respond to new inbound leads via text message, ask a short series of qualification questions, and assist with booking appointments.

By using the Service (as a business customer) or by interacting with messages sent through the Service (as a lead/consumer), you agree to these Terms.

1) Who We Are / Contact
Local Lead Response Copilot
Support email: agent_bob_replit+lead-copilot@agentmail.to
Business proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

2) The Service
The Service automates speed-to-lead outreach by sending text messages (SMS/MMS) to a phone number provided by a lead through a business’s website form, lead ad (e.g., Meta/Facebook), or other lead source. The Service may:
- send an initial response text quickly after a lead submits a form;
- ask a small number of follow-up questions to route or qualify;
- offer available times and assist with booking;
- notify the business team of outcomes.

3) SMS/Text Messaging Disclosures (Consumer/Lead)
If you provide your phone number through a business’s form or lead ad and consent to receive text messages, you may receive SMS messages sent via Local Lead Response Copilot on behalf of that business.

Message frequency: Varies by your interaction (typically a small number of messages around your inquiry).
Message and data rates may apply.
Supported carriers are not liable for delayed or undelivered messages.

Opt-out: Reply STOP to opt out at any time. After you opt out, you will receive a confirmation message and no further messages will be sent unless you re-consent.
Help: Reply HELP for help.

Consent: Your consent to receive text messages is not a condition of purchase.

4) Quiet Hours
Our customers may enable “quiet hours” to reduce late-night or early-morning texting. If enabled, messages may be delayed and sent during the next permitted window based on the lead’s timezone.

5) Acceptable Use
You agree not to use the Service to:
- send unlawful, abusive, deceptive, harassing, or spam content;
- send messages without appropriate consent where required;
- send content that violates carrier policies, TCPA, CTIA guidelines, or applicable laws;
- send sensitive personal information (e.g., full SSNs, financial account numbers, health diagnosis details).

6) Disclaimer of Warranties
The Service is provided “as is” and “as available.” We do not guarantee that messages will be delivered, that response times will always be instantaneous, or that conversions will increase. Carrier filtering, handset settings, network conditions, and other factors outside our control can affect delivery.

7) Limitation of Liability
To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits or revenue, arising from your use of the Service.

8) Changes to These Terms
We may update these Terms from time to time. The “Last Updated” date will change when updates occur.

9) Questions
Email agent_bob_replit+lead-copilot@agentmail.to.

==============================
PAGE 2: PRIVACY POLICY
==============================
Title: Privacy Policy
Last Updated: [DATE]

This Privacy Policy explains how Local Lead Response Copilot (“we,” “us,” “our”) collects, uses, and shares information when operating our Service, which helps businesses respond to inbound leads via SMS and qualification questions.

1) Contact
Support email: agent_bob_replit+lead-copilot@agentmail.to
Business proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

2) Information We Collect
We may collect and process:
A) Lead/Consumer data submitted to a business, including:
- name (if provided), phone number, email (if provided)
- lead source metadata (e.g., form name, campaign, ad ID if provided)
- responses to qualification questions
- timestamps (submission time, message send/receive times)

B) Message data:
- outbound and inbound SMS/MMS content
- delivery status and error codes from messaging providers

C) Business customer data (for our customers using the Service):
- account/admin contact info
- configuration settings (templates, hours, routing)

3) How We Use Information
We use information to:
- send and receive text messages on behalf of the business you contacted
- qualify and route inquiries, including scheduling/booking
- detect and prevent abuse, fraud, or policy violations
- support customers and troubleshoot delivery issues
- maintain logs needed for compliance, opt-outs, and auditing

4) Legal Basis / Consent (SMS)
When required by law, text messages are sent only after the lead/consumer provides consent (e.g., by checking a checkbox or agreeing in a lead form). Consent is not a condition of purchase. You can opt out at any time by replying STOP.

5) How We Share Information
We may share information with:
- Messaging providers (e.g., SMS delivery platforms) to send/receive messages
- Scheduling/calendar providers if enabled by the business customer
- Our business customers (the company you contacted), who receive your inquiry and responses

We do not sell personal information.

6) Data Retention
We retain data as needed to provide the Service and for legitimate business purposes such as compliance (including opt-out logs), dispute handling, and troubleshooting. Retention periods may vary by customer configuration and legal requirements.

7) Your Choices and Rights
- Opt-out of SMS: Reply STOP at any time.
- Help: Reply HELP for help.
- Access/Deletion: You may request access to or deletion of information we control by emailing agent_bob_replit+lead-copilot@agentmail.to. If we process data on behalf of a business customer, we may refer your request to that business.

8) Security
We use reasonable safeguards designed to protect information. No method of transmission or storage is 100% secure.

9) Changes
We may update this Privacy Policy periodically. The “Last Updated” date will reflect changes.

==============================
POST-PUBLISH: UPDATE YOUR OPT-IN SNIPPETS
==============================
Once these pages are published, set:
- Terms URL: [PASTE LIVE TERMS URL]
- Privacy URL: [PASTE LIVE PRIVACY URL]
And update every opt-in snippet to include both links.

==============================
QA VERIFICATION PLAN (STOP/HELP + QUIET HOURS + CONSENT LOGGING)
==============================
Goal: Verify the system is defensible under TCPA/CTIA norms and avoids deliverability/account enforcement risk.

A) STOP/UNSUBSCRIBE HANDLING — REQUIRED TEST CASES
Test from at least 2 different mobile carriers/devices if possible.

A1. Basic STOP
1. Opt-in a test lead number (ensure consent record created).
2. Trigger an outbound SMS.
3. Reply: STOP
Expected:
- Immediate confirmation message: “You’re unsubscribed and will no longer receive messages. Reply START to resubscribe. For help, reply HELP.”
- Lead is added to the global suppression list for that business (or shared suppression if your architecture is global).
- All future outbound sends to that number are blocked (and logged as blocked).
Required logs/evidence:
- inbound message event (keyword=STOP)
- suppression-write event (number hashed + business id)
- outbound blocked event on subsequent attempted sends

A2. STOP Variants
Repeat A1 using: STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Expected: same as A1.

A3. HELP
1. From an opted-in number, reply: HELP
Expected:
- A single informational reply containing: business name, what messages are about, opt-out instruction, and support email.
Example: “Local Lead Response Copilot: We text about your recent inquiry. Reply STOP to opt out. Msg & data rates may apply. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”
Required logs:
- inbound HELP
- outbound HELP response

A4. START (Resubscribe)
1. From a suppressed number, reply START
Expected:
- Confirmation: “You’re resubscribed…”
- suppression removed (or status toggled), with audit log
- subsequent outbound allowed

A5. No Infinite Loops
Send STOP then immediately send HELP, verify only one response per inbound message and no bot loops.

B) QUIET HOURS — REQUIRED TEST CASES
Define quiet hours (example): 8pm–8am lead local time.

B1. In-window send
At 2pm lead local time, trigger message.
Expected: send immediately.
Logs: timezone resolved; send allowed; outbound message.

B2. Out-of-window deferral
At 11pm lead local time, trigger message.
Expected: message NOT sent; placed into deferral queue with scheduled send time at next allowed window.
Logs: timezone resolved; quietHoursBlocked=true; scheduledFor=nextWindowStart.

B3. Daylight savings edge
Simulate on a DST change date in a DST-observing timezone.
Expected: scheduled time still aligns with local window.

B4. Override
Admin/manual override flag set.
Expected: send immediately with “override=true” logged.

C) CONSENT LOGGING — REQUIRED FIELDS (AUDIT-READY)
For every lead that triggers SMS, store:
- phone (E.164) + hashed phone
- consent_status (opted_in/opted_out/pending)
- consent_source (webflow/typeform/meta/manual)
- consent_timestamp (UTC)
- consent_text_snapshot (exact checkbox language or lead ad disclosure at time of consent)
- source_url or form_id/ad_id
- ip_address (if available from form)
- user_agent (if available)
- stop_timestamp (if opted out)
- message_template_version

Pass/Fail standard for pilots:
- PASS if STOP/HELP works reliably, suppression blocks outbound, quiet-hours defers correctly, and consent record is created for every send.
- FAIL if any outbound message is sent after STOP, or if quiet-hours sends during blocked windows without explicit override.
