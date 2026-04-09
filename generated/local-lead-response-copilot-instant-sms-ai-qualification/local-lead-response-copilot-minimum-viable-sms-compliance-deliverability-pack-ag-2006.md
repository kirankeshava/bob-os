# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:12:46.747Z

---

Business legitimacy references (use in all client-facing assets)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Compliance checklist (minimum viable for pilots)
A. Consent capture (TCPA/CTIA)
- Obtain express written consent at point of lead capture (checkbox or clear disclosure directly next to submit).
- Disclosure must include: automated texts, recurring messages, message/data rates, “not a condition of purchase”, STOP/HELP.
- Store: timestamp, source, form URL/ad ID, IP (if web), user agent (if web), checkbox state/text, phone, and lead identifiers.

B. STOP/HELP handling
- Recognize common opt-out keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT.
- Recognize HELP and INFO.
- Immediately suppress future outbound messages to that phone (global suppression list).
- Send confirmation message for STOP, and an info message for HELP.

C. Quiet hours
- Default: no outbound texts 9pm–8am in recipient’s local timezone.
- If timezone unknown: assume lead’s area code timezone; if unknown, use business timezone but apply stricter window (e.g., 10am–7pm).
- Queue messages during quiet hours; send at next allowed time.

D. Content guardrails (deliverability)
- Avoid “free!!!”, excessive caps, repeated links, URL shorteners, and “urgent/act now” spam phrasing.
- Keep first message plain, contextual (mentions the form/ad), and asks 1 simple question.
- Include business name in first message.
- Include STOP opt-out instruction at least in initial message and periodically in longer conversations.

2) Copy/paste opt-in language snippets (agencies)

2.1 Webflow / website form (recommended: checkbox + disclosure)
Checkbox label (required, unchecked by default):
[ ] I agree to receive automated text messages about my inquiry.

Disclosure text (place directly under checkbox; do not hide behind a link):
“By checking this box, you consent to receive recurring automated SMS messages from [BUSINESS NAME] about your inquiry and related services. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

Implementation notes:
- Log checkbox true/false, disclosure version, page URL, timestamp, and phone number.

2.2 Typeform (no-code friendly)
Add a required “Legal” statement directly before submission:
“By submitting, you agree to receive automated SMS texts from [BUSINESS NAME] regarding your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

If Typeform supports it, add a yes/no question:
Question: “Text me updates about my request (recommended)”
Choices: Yes / No
Only enroll in SMS if “Yes”. Log the response.

2.3 Meta/Facebook Lead Ads (primary + follow-up disclaimer)
Primary disclaimer (within the form, near submit):
“By submitting, you agree to receive automated text messages from [BUSINESS NAME] regarding your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

Follow-up / privacy links (where possible):
“Privacy: [PRIVACY_URL] Terms: [TERMS_URL] Support: agent_bob_replit+lead-copilot@agentmail.to”

3) Compliant message templates (safe defaults)

3.1 First response (immediate)
“Hi {first_name} — this is {rep_name} with {business_name}. Got your request for {service}. What’s the address/ZIP where you need help?”
(If needed for longer threads: “Reply STOP to opt out, HELP for help.”)

3.2 Qualification (short, 1 question at a time)
A) “What’s the main issue you’re dealing with (in a sentence)?”
B) “When would you like us to come out — today, this week, or next week?”
C) “Is this for a home you own, or a rental?” (only if relevant)

3.3 Booking handoff
“Thanks — we can get you scheduled. What’s the best time for a quick call today: {option1} or {option2}?”

3.4 Missed call text-back
“Sorry we missed you — this is {business_name}. Want to book a time for a quick call, or tell me what you need help with?”

3.5 Re-engagement (48–72 hours)
“Hi {first_name}, checking in — do you still need help with {service}? If yes, what day works best?”

4) STOP/HELP implementation spec (Twilio-style inbound webhook)

4.1 Keyword matching
- Normalize inbound body: trim, uppercase.
- Match exact keywords and common variants:
  STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
  HELP, INFO
- If body contains additional text, treat as opt-out if it begins with STOP (e.g., “STOP pls”).

4.2 Behavior
On STOP-class keyword:
1) Add phone number to global suppression list immediately.
2) Mark conversation as “opted_out=true”.
3) Send one (and only one) confirmation message:
   “You’re opted out and will no longer receive texts from {business_name}. Reply HELP for help.”
4) Block all future outbound messages to that phone across all clients/workspaces unless explicitly re-opted-in.

On HELP-class keyword:
- Send:
  “{business_name}: For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

On other messages from suppressed numbers:
- Do not send automated flows.
- Optionally: store inbound for audit only.

4.3 Audit logging (minimum fields)
- event_type: consent_captured | sms_inbound | sms_outbound | opt_out | help_requested | quiet_hours_queued | quiet_hours_sent
- phone_e164, timestamp_utc, client_id, lead_id
- message_body (or hashed), message_sid/provider_id
- consent_source (webflow/typeform/meta/other), consent_text_version
- suppression_reason, suppression_timestamp

5) Quiet hours implementation spec (timezone + queueing)

5.1 Default policy
- Do not initiate outbound messages between 21:00–08:00 recipient local time.
- If message is a response to an inbound message from the lead, you may respond immediately (optional policy), but still avoid marketing-style content.

5.2 Timezone resolution order
1) Explicit lead timezone (if captured)
2) Lead ZIP/postal code -> timezone lookup
3) Phone area code -> timezone heuristic
4) Business timezone fallback with stricter send window (10:00–19:00)

5.3 Queueing rules
- If an outbound message is triggered during quiet hours:
  - Record event quiet_hours_queued
  - Schedule send at next allowed time (08:05 local)
  - If multiple messages queue, collapse into one concise message where possible.

5.4 Overrides
- Admin override flag: allow_after_hours (default false)
- Emergency category (optional): if lead explicitly asks “call me now” you can notify business owner (not the lead) after hours.

6) Twilio deliverability hardening (minimum viable guidance)
- Use a Messaging Service (even for pilots) so you can manage sender pools later.
- Consistent brand identity: business name in first message.
- Keep link usage minimal; prefer no links in the first text.
- Avoid URL shorteners.
- If using 10DLC at scale, complete A2P Brand + Campaign registration before high volume. For pilots, keep volume low and ensure consent capture is clean.

7) Agency handoff: what to do in 15 minutes
1) Choose lead source (Webflow/Typeform/Meta Lead Ads).
2) Paste the relevant opt-in disclosure (Section 2) and add the checkbox/statement.
3) Ensure form captures: first name, phone, service type, ZIP/address, consent checkbox.
4) Set quiet hours expectation with client (default 9pm–8am local).
5) Run verification tests:
   - Submit test lead (with your phone) -> confirm first message content.
   - Reply HELP -> confirm help text.
   - Reply STOP -> confirm opt-out confirmation.
   - Trigger another outbound after STOP -> confirm it is blocked.

If you need to show legitimacy/compliance to a client, provide:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to
- This compliance pack and the consent logging fields list (Section 4.3).