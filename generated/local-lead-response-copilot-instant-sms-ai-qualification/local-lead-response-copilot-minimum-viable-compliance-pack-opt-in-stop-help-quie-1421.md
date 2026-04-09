# Local Lead Response Copilot — Minimum-Viable Compliance Pack (Opt‑In, STOP/HELP, Quiet Hours, Consent Logging) + Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:16:49.567Z

---

Business legitimacy references (use in proposals, onboarding, and opt-in links)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Minimum-viable compliance checklist (what must exist before any pilot sends texts)
A. Consent capture (TCPA/CTIA-aligned)
- Lead form must include an unchecked checkbox (recommended) or clear written disclosure immediately adjacent to the submit button.
- Must state: (1) automated texts, (2) purpose (lead response/booking), (3) message frequency (e.g., “up to 4 msgs”), (4) “Msg & data rates may apply”, (5) STOP to opt out / HELP for help, (6) not a condition of purchase.
- Must link (or at least reference) Terms + Privacy pages.

B. STOP/HELP handling
- Recognize STOP keywords and immediately: (1) confirm opt-out, (2) suppress future outbound, (3) log the event.
- HELP must return business identity + support email + STOP instructions.
- START/UNSTOP should re-enable only if there is prior consent on record; log resubscribe.

C. Quiet hours
- Default: do not initiate texts outside 8:00am–8:00pm recipient local time.
- If lead arrives during quiet hours: queue first text for next window; log queued timestamp.

D. Consent logging (minimum fields)
- Store: phone (E.164), timestamp, source (Webflow/Typeform/Meta), page/form name, IP (if available), user agent (if available), consent text shown, and any checkbox state.
- Store message history + STOP/HELP events with timestamps.

2) Copy/paste opt-in language snippets (agency-ready)

2.1 Webflow (checkbox + disclosure)
Add a checkbox labeled:
“I agree to receive automated text messages from [Business Name] about my request, scheduling, and service updates. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”
Under the submit button, add:
“By submitting, you agree to our Terms and Privacy Policy. Message frequency varies (typically 1–4 messages).”
Link “Terms” to: (publish and replace) [TERMS_URL]
Link “Privacy Policy” to: (publish and replace) [PRIVACY_URL]

2.2 Typeform (statement + optional checkbox)
If using a statement:
“By providing your phone number, you agree to receive automated text messages from [Business Name] about your request, qualification questions, and scheduling. Consent is not required to purchase. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
If using a Yes/No question, make “Yes” required to proceed.

2.3 Meta/Facebook Lead Ads (custom disclaimer)
Add to the form disclaimer:
“By submitting, you consent to receive automated text messages from [Business Name] about your request and appointment scheduling. Consent is not a condition of purchase. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Message frequency varies (typically up to 4). Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

3) Message templates (MVCP safe defaults)
Guidelines baked in: identify the business, state reason, short, no ALL CAPS, avoid spammy language (“FREE!!!”, “WINNER”, “urgent”), include STOP/HELP line in first message.

3.1 First response (immediate)
“Hi {first_name}, this is {business_name}. Got your request for {service}. A couple quick questions to get you the right estimate—ok?”
If required by your policy, append (recommended for initial contact):
“Reply STOP to opt out, HELP for help.”

3.2 Qualification Q1 (service type)
“Great—what best describes what you need? 1) {option1} 2) {option2} 3) Other”

3.3 Qualification Q2 (timing)
“When are you looking to get this done? 1) ASAP 2) This week 3) Next 2–4 weeks”

3.4 Booking offer
“Thanks. Want to grab a quick call to confirm details and give you an exact price? Reply 1 for the next available time, or share a good time window.”

3.5 Missed-call textback (if applicable)
“Hi {first_name}, sorry we missed you—this is {business_name}. What can we help with? Reply with a quick description and we’ll get you scheduled.”

3.6 Re-engagement (one follow-up, low risk)
“Hi {first_name}, just checking—do you still need help with {service}? If yes, reply 1 and we’ll line up a time.”

4) STOP/HELP implementation spec (Twilio-agnostic, works with Twilio webhooks)

4.1 Keywords to match (case-insensitive, trim punctuation)
STOP keywords (treat as opt-out): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO
Resubscribe: START, YES, UNSTOP

4.2 Behavior
On STOP keyword:
- Immediately mark number as “globally suppressed” for that client/location.
- Send confirmation (single message):
  “You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe.”
- Block any further outbound to that number unless resubscribed.
- Log event: {phone, client_id, keyword, timestamp, channel, message_sid/provider_id}

On HELP keyword:
- Send:
  “{business_name} texting support. For help email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
- Do not change subscription state.
- Log HELP event.

On START/UNSTOP:
- Only re-enable if you have a prior consent record OR you re-capture consent via a confirmation prompt.
- Send:
  “You’re resubscribed to {business_name} texts. Reply STOP to opt out.”
- Log resubscribe.

4.3 Outbound gate (must exist)
Before sending any outbound SMS:
- Check suppression table. If suppressed, do not send. Log “blocked_due_to_optout”.

5) Quiet hours implementation spec (minimum)

5.1 Default window
- Allowed send times: 8:00am–8:00pm recipient local time, 7 days/week.

5.2 Timezone resolution order
1) If lead contains postal code/state/city: map to timezone.
2) Else use phone number area code to infer timezone.
3) Else fallback to business timezone.
Store inferred timezone + confidence.

5.3 Behavior
- If inbound lead arrives outside window: queue the first outbound for next local 8:00am.
- If a user texts inbound during quiet hours: it is permitted to respond if it’s a direct reply thread (optional conservative rule: still queue unless human override).
- Log: {queued=true, scheduled_send_at, tz_used, tz_confidence}.

6) Deliverability hardening (minimum, non-paid steps)
- Use a single consistent sending number per client/location where possible.
- Keep first messages short; no URL in the first message unless necessary.
- Always include clear business identification in initial message.
- Avoid high-risk content: excessive punctuation, “guaranteed”, “act now”, “limited time”, all-caps, misleading claims.
- If using Twilio: use a Messaging Service and enable smart encoding; monitor deliverability errors and opt-out rates.

7) Agency handoff: exact steps to implement (copy/paste)

Step 1 — Add consent language
- Choose your source (Webflow/Typeform/Meta Lead Ads) and paste the snippet from Section 2.
- Ensure Terms + Privacy URLs are live (replace placeholders).

Step 2 — Confirm required lead fields
- Required: first name, phone, service category, zip/city, preferred contact method.

Step 3 — Configure follow-up behavior
- First SMS uses template 3.1.
- Qualification uses templates 3.2–3.4.
- One re-engagement only (template 3.6) after 24–48 hours.

Step 4 — Verify STOP/HELP and quiet hours before launch
- Text “HELP” and confirm the help message.
- Text “STOP” and confirm opt-out + suppression.
- Submit a test lead after-hours and confirm message queues until the next window.

Step 5 — Support + legitimacy
- If a prospect asks who is texting: provide website link and support email:
  https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
  agent_bob_replit+lead-copilot@agentmail.to

Owner TODO (to finish in <30 minutes)
- Publish Terms + Privacy pages on the website and provide final URLs to replace [TERMS_URL] and [PRIVACY_URL] everywhere.
- Confirm whether Twilio is the provider and which inbound webhook endpoint receives incoming SMS so STOP/HELP can be tested end-to-end.
