# Local Lead Response Copilot — MV Compliance + Deliverability Master Handoff (Agency + Engineering)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:28:16.784Z

---

Business proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support email (publish in disclosures): agent_bob_replit+lead-copilot@agentmail.to

1) COPY/PASTE: WEBSITE TERMS OF SERVICE (SMS) (Minimum-Viable)
Title: Terms of Service (SMS)
Effective Date: [DATE]

These Terms of Service (“Terms”) govern your use of the Local Lead Response Copilot service (“Service”), which helps businesses respond to new leads via SMS and qualify/route inquiries. By submitting your phone number and opting in to SMS messages, you agree to these Terms.

1. SMS Program Description
When you submit a lead form or otherwise provide your number to one of our customers (a local service business) and opt in, you may receive SMS messages related to your inquiry such as:
• confirmation of your request,
• short qualification questions,
• appointment/call booking links,
• updates about availability, and
• customer support.

2. Consent & TCPA Disclosure
By opting in, you authorize us and/or our customer to send text messages to the phone number you provide using an automatic dialing system and/or AI-assisted messaging. Consent is not a condition of purchase.

3. Message Frequency
Message frequency varies based on your interaction and request, but is typically 1–6 messages per inquiry.

4. Opt-Out (STOP)
You can opt out at any time by replying STOP. After you opt out, you will receive one confirmation message and no further messages will be sent unless you re-opt in.

5. Help (HELP)
For help, reply HELP or contact us at agent_bob_replit+lead-copilot@agentmail.to.

6. Fees
Message and data rates may apply based on your mobile plan.

7. Carriers
Carriers are not liable for delayed or undelivered messages.

8. Eligibility
You must have permission to use the phone number provided and be able to receive SMS messages.

9. Prohibited Use
You agree not to use the Service for unlawful, abusive, fraudulent, or harassing purposes.

10. Changes
We may update these Terms from time to time by posting a revised version with a new effective date.

11. Contact
Local Lead Response Copilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Email: agent_bob_replit+lead-copilot@agentmail.to


2) COPY/PASTE: PRIVACY POLICY (Minimum-Viable)
Title: Privacy Policy
Effective Date: [DATE]

This Privacy Policy explains how Local Lead Response Copilot (“we,” “us”) collects, uses, and shares information when operating SMS-based lead response and qualification on behalf of local businesses.

1. Information We Collect
We may collect:
• Contact info: name, phone number, email (if provided)
• Lead details: service needed, location, preferred times, and form responses
• Message data: SMS content, timestamps, delivery status, opt-in/opt-out status
• Technical data: IP address and basic device/browser data when you interact with booking links

2. How We Use Information
We use information to:
• respond to your inquiry and route you to the right person/team,
• ask qualification questions to speed scheduling,
• send appointment confirmations and updates,
• provide customer support,
• prevent fraud/abuse, and
• comply with legal obligations (including consent/opt-out requirements).

3. Sharing
We share information with:
• the local business you contacted (our customer),
• service providers (e.g., SMS/telecom providers like Twilio, scheduling/CRM tools),
• law enforcement or regulators when required by law.
We do not sell your personal information.

4. SMS Consent
If you opt in to receive SMS, we maintain records of your consent and opt-out status for compliance. Consent is not a condition of purchase.

5. Data Retention
We retain lead and consent records for as long as needed for business operations and compliance. For TCPA/CTIA dispute readiness, we recommend retaining consent logs for at least 4 years.

6. Your Choices
• Opt out of SMS anytime by replying STOP.
• For help, reply HELP or email agent_bob_replit+lead-copilot@agentmail.to.

7. Security
We use reasonable administrative and technical safeguards to protect data. No system is 100% secure.

8. Contact
Local Lead Response Copilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Email: agent_bob_replit+lead-copilot@agentmail.to


3) COPY/PASTE OPT-IN SNIPPETS (Webflow / Typeform / Generic)
Use these as close as possible to the phone field and submit CTA.

Short (recommended for tight UI)
“By submitting, you agree to receive text messages about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not a condition of purchase. Terms & Privacy: [LINKS].”

Full (recommended)
“By providing your phone number and submitting this form, you consent to receive SMS text messages regarding your inquiry, including appointment scheduling and service updates, sent by Local Lead Response Copilot on behalf of [BUSINESS NAME]. Message frequency varies (typically 1–6 messages per inquiry). Message & data rates may apply. Reply STOP to unsubscribe, HELP for help. Consent is not a condition of purchase. Terms: [TERMS URL] Privacy: [PRIVACY URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”


4) META / FACEBOOK LEAD ADS OPT-IN (Primary Text + Disclaimer)
Primary text (example)
“Need a quote fast? Submit the form and we’ll text you within 60 seconds to confirm details and book your appointment.”

Lead form disclaimer (paste into “Custom disclaimer” / add to intro)
“By submitting, you agree to receive SMS texts about your request (including appointment scheduling). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: [TERMS URL] Privacy: [PRIVACY URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”


5) MESSAGE TEMPLATES (Deliverability-safe)
General rules: keep first message purely transactional about their request; avoid excessive punctuation/ALL CAPS; keep links minimal; no misleading claims.

First message (immediate)
“Hi {first_name}—this is {business_name}. Got your request for {service}. A couple quick questions so we can quote accurately. Reply 1) when do you need this? (today/this week/flexible)” 

Qualification follow-up
“2) What’s the service address or ZIP code?”

Booking prompt
“Thanks—want to book a quick call? Here are times: {booking_link}. Reply with a time if you prefer not to use the link.”

Missed-call textback
“Hi—sorry we missed you. This is {business_name}. What’s the best time to call you back?”

Re-engagement (1 attempt only)
“Hi {first_name}—still want help with {service}? Reply YES and we’ll get you scheduled, or reply STOP to opt out.”


6) STOP / HELP HANDLING (Implementation Spec + Verified Behavior)
Keywords (case-insensitive; ignore punctuation/extra spaces)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP, INFO

State machine
• Default: SUBSCRIBED (or CONSENTED)
• If inbound matches STOP keyword:
  - Set contact.messaging_status = OPTED_OUT
  - Add phone to Global Suppression List (GSL)
  - Log event: opt_out_received {keyword, timestamp, message_sid, from_number, to_number}
  - Send confirmation once: “You’re opted out and will no longer receive texts. Reply START to resubscribe. Help: agent_bob_replit+lead-copilot@agentmail.to”
  - Block all future outbound to that phone across all clients until re-opt-in (except allowed compliance confirmation).

• If inbound matches HELP keyword:
  - Do NOT change subscription status
  - Send: “Local Lead Response Copilot help: messages relate to your service request with {business_name}. Reply STOP to opt out. Msg & data rates may apply. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”
  - Log event: help_requested {timestamp, message_sid}

Re-opt-in
Only allow resubscribe on explicit START (or a new compliant opt-in captured from a form with checkbox + timestamp). If you support START:
• Inbound START -> set status OPTED_IN and log reopt_in {timestamp, source=inbound_start}

Verification test matrix (must pass before pilots)
1) Send any outbound, then inbound “STOP” => outbound blocked thereafter + confirmation sent + GSL entry exists.
2) Inbound “HELP” => help message returned; no status change.
3) Inbound “ stop ” / “Stop.” / “UNSUBSCRIBE” => treated as STOP.
4) After STOP, ensure no qualification/booking messages are sent even if automation triggers.

Required logs (minimum)
• consent_captured: {phone, timestamp, source_form, ip(optional), user_agent(optional), disclosure_version}
• message_outbound_attempted: {to, template_id, timestamp, result=sent|blocked|deferred, block_reason}
• inbound_received: {from, body, timestamp}
• opt_out_received / help_requested / reopt_in


7) QUIET HOURS BY TIME ZONE (Implementation Spec)
Goal: do not send automated SMS outside allowed window, while preserving speed-to-lead during business hours.

Default window
• Allowed: 8:00 AM – 8:00 PM recipient local time (configurable per client)

Timezone resolution order (best-effort)
1) If lead payload includes timezone or state: map to timezone.
2) If address/ZIP present: resolve timezone from ZIP.
3) If area code present: approximate timezone from area code.
4) Fallback: client’s business timezone.

Algorithm
On outbound attempt:
• Determine tz for recipient.
• Compute local_time = now() in tz.
• If local_time within allowed window: send.
• Else: defer message to next allowed start (e.g., 8:05 AM) and log deferred {until_timestamp, tz, reason=quiet_hours}.

Edge cases
• If lead created within quiet hours: send an internal notification email to business (optional) while deferring SMS.
• If multiple messages queued: send only the most relevant “first message” when window opens; drop redundant qualification prompts and re-evaluate conversation state.

Override
Allow manual human-triggered sending outside quiet hours only if the agent explicitly clicks “Send now” and the UI shows a warning + requires confirmation. Log override {user, timestamp}.


8) TWILIO DELIVERABILITY HARDENING (Agency Runbook)
Baseline
• Use a Twilio Messaging Service (not direct-from-number) for sending.
• Enable Smart Encoding, Sticky Sender (if using pool), and opt-out handling via webhook.

A2P 10DLC vs Toll-Free (decision)
• If US long code (10DLC) and any meaningful volume: register Brand + Campaign (A2P). This improves throughput and reduces filtering.
• If using Toll-Free: submit toll-free verification (often easier for early pilots).

Content guardrails
• Avoid “free”, “guarantee”, “act now”, excessive emojis/punctuation, URL shorteners.
• Keep links consistent, branded if possible; limit to 1 link per message.
• Identify business early (“this is {business_name}”), keep messages clearly related to the lead’s request.

Fallback behaviors
• If carrier filtering spikes or errors occur:
  1) throttle sending rate,
  2) remove links from first message,
  3) switch to plain-text booking options (time slots via reply),
  4) optionally rotate to verified toll-free route (if available).

Monitoring
Track: delivery rate, error codes, opt-out rate, spam/complaint indicators, and time-to-first-response.


9) AGENCY IMPLEMENTATION CHECKLIST (Minimum-Viable)
1) Add opt-in language next to phone field + checkbox if possible.
2) Ensure Terms/Privacy links are live and match your posted text.
3) Confirm STOP/HELP works end-to-end and suppression is global.
4) Implement quiet hours by recipient timezone; defer instead of sending.
5) Keep first message transactional and tied to the lead request.
6) Maintain consent logs and export capability for disputes.

If you need help implementing any of the above, contact: agent_bob_replit+lead-copilot@agentmail.to and include the proof URL in your thread: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
