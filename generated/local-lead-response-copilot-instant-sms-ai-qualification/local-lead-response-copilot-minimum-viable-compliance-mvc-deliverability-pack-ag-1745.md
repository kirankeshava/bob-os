# Local Lead Response Copilot — Minimum‑Viable Compliance (MVC) + Deliverability Pack (Agency Copy/Paste + Engineering Spec)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T17:56:30.432Z

---

Business legitimacy (use in proposals/onboarding)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Minimum‑Viable Compliance (MVC) Checklist (what must be true to launch pilots)
A. Consent capture (required)
- Lead must knowingly provide phone number AND receive a clear disclosure that they will receive texts.
- Disclosure must include: “automated” or “auto-dialer” language, message frequency, “Msg & data rates may apply”, STOP/HELP instructions.
- Consent must be logged (timestamp, source, IP/user agent if web form, lead form ID for Meta).

B. STOP/HELP handling (required)
- Any inbound STOP keyword immediately blocks all future outbound SMS to that number across the entire account (global suppression).
- HELP returns support contact and link.
- Confirmations are sent once (and only once per event) and contain no marketing content.

C. Quiet hours (required, minimal)
- Default send window: 8:00am–8:00pm in the lead’s local timezone.
- If lead timezone unknown, treat as business timezone; if still unknown, default to US Central.
- If a lead comes in during quiet hours, queue the first response for next allowed window (do not send immediately).

D. Deliverability guardrails (required)
- First message identifies the business and context (“You requested…”).
- Avoid URL shorteners and spammy phrasing (see section 6).
- Consistent sender type (Messaging Service) and stable templates.

2) Copy/Paste Opt‑In Snippets (ready for agencies)
IMPORTANT: Replace bracket fields like [BUSINESS NAME], [PRIVACY URL], [TERMS URL]. If legal pages aren’t published yet, temporarily use the main website URL above.

2.1 Webflow / Website form checkbox text (recommended)
Checkbox label (unchecked by default):
“I agree to receive text messages from [BUSINESS NAME] about my request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

Small print below the submit button:
“By submitting, you consent to receive automated text messages from [BUSINESS NAME] regarding your inquiry and appointment scheduling. Consent is not a condition of purchase. Reply STOP to opt out, HELP for help. Msg frequency varies. Msg & data rates may apply. Privacy: [PRIVACY URL] Terms: [TERMS URL]”

2.2 Typeform (add as a statement + required ‘Yes’ field)
Statement (before phone question):
“We’ll text you about your request and scheduling. By providing your number, you agree to receive automated texts from [BUSINESS NAME]. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY URL] Terms: [TERMS URL].”

Required multiple choice:
- “Yes, I agree”
- “No” (logic: if No, do not collect phone; offer email instead)

2.3 Meta / Facebook Lead Ads (Follow-up consent)
In the Lead Form ‘Privacy Policy’ and ‘Custom Disclaimer’:
Custom Disclaimer:
“By submitting this form, you agree to receive automated text messages from [BUSINESS NAME] about your request and scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

Privacy Policy link: [PRIVACY URL]
(Optional) Add Terms link in the form description: “Terms: [TERMS URL]”

3) Compliant First Message Templates (speed-to-lead safe)
Goal: identify context + ask 1 short question. No links in message #1.

Template A (generic home services)
“Hi {first_name}—this is {agent_name} with [BUSINESS NAME]. You just requested a quote on our website. What service do you need help with? Reply 1) Repair 2) Install 3) Other. Reply STOP to opt out, HELP for help.”

Template B (missed call text-back)
“Hi {first_name}—sorry we missed your call. This is [BUSINESS NAME]. What’s the best time today to reach you? Reply STOP to opt out, HELP for help.”

Template C (Meta lead)
“Hi {first_name}—this is {agent_name} at [BUSINESS NAME]. Thanks for requesting info on Facebook. What’s your ZIP code so we can confirm service area? Reply STOP to opt out, HELP for help.”

4) STOP/HELP Implementation Spec (Twilio-ready)
4.1 Keywords to treat as STOP (case-insensitive; trim punctuation)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Also treat common variants: “stop ”, “stop.”, “please stop”, “stop texts” as STOP if message contains the standalone token.

4.2 HELP keywords
HELP, INFO, SUPPORT

4.3 Behavior
- On inbound STOP:
  1) Create/Update Contact record: sms_status = “opted_out”, opted_out_at timestamp, opted_out_source = “inbound_sms”, opted_out_keyword.
  2) Add phone number to GLOBAL suppression list (applies across all subaccounts/locations unless legally required otherwise).
  3) Send one confirmation SMS (no marketing):
     “You’re opted out from [BUSINESS NAME] texts. No more messages will be sent. Reply HELP for help.”
  4) Block any future outbound attempts to that number (return 400/skip send) and log the blocked reason.

- On inbound HELP:
  Send:
  “[BUSINESS NAME] support: agent_bob_replit+lead-copilot@agentmail.to. You can reply STOP to opt out. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

4.4 Logging (minimum audit fields)
- message_sid (Twilio), direction (inbound/outbound)
- from_e164, to_e164
- received_at, processed_at
- detected_intent: STOP | HELP | OTHER
- suppression_action_taken: true/false
- consent_reference: consent_source, consent_timestamp, consent_text_version

5) Quiet Hours Implementation Spec (minimal, safe)
5.1 Default policy
- Allowed window: 08:00–20:00 lead-local time, 7 days/week.
- If lead timezone is known, use it. Else use business location timezone. Else default to America/Chicago.

5.2 Timezone resolution order
1) Explicit timezone stored on lead record (from prior interactions)
2) Lead ZIP → timezone lookup
3) Area code heuristic (fallback only)
4) Business location timezone
5) America/Chicago

5.3 Behavior rules
- If a send is requested during quiet hours, queue it for next 08:00 local time.
- If multiple messages are queued, send only the latest “current state” message when window opens (avoid bursts).
- Owner override: allow immediate send if user marks conversation as “manual takeover” (human is actively responding) AND the user confirms compliance.

6) Deliverability Content Guidelines (carrier-friendly)
Do:
- Personalize minimally (first name + business name).
- Keep messages short, 1 question at a time.
- Reference the lead’s action: “you requested a quote / filled out our form / asked for pricing”.
- Keep links out of message #1; if needed later, use full domain (no shorteners).

Avoid:
- “FREE”, “GUARANTEED”, excessive punctuation, ALL CAPS.
- Aggressive urgency: “ACT NOW”, “limited time”.
- Link shorteners and too many links.
- Vague intros: “Hi, are you interested?” (higher spam reports).

7) Agency Go‑Live in 30 Minutes (handoff steps)
1) Pick lead source: Webflow/Typeform/Meta. Paste the opt-in disclosure exactly (section 2).
2) Ensure phone field is required (or add explicit Yes/No consent question).
3) Confirm the first SMS template includes business identification + STOP/HELP (section 3).
4) Confirm STOP/HELP handling is enabled globally (section 4). Test with your own phone:
   - Submit test lead → receive first SMS
   - Reply HELP → receive help message
   - Reply STOP → receive opt-out confirmation
   - Trigger another outbound → must be blocked
5) Quiet hours: submit a test lead outside 8a–8p local time; confirm message is queued.
6) Save compliance evidence: screenshot lead form consent + export consent log row.

If anything fails, email agent_bob_replit+lead-copilot@agentmail.to with the lead source, form URL, and time of test so we can trace logs.
