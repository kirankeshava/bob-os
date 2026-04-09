# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Kit (Pilot-Safe) + Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T17:49:55.653Z

---

Purpose (MV / wartime): This kit covers only what prevents SMS shutdowns and removes common onboarding objections for pilots: (1) clear opt-in language, (2) STOP/HELP handling with suppression, (3) quiet hours to avoid late-night texting, (4) consent logging basics, and (5) quick agency handoff + test steps.

Legitimacy / support references (use everywhere):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Copy/paste opt‑in language (use on every lead source)
A. Webflow / website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages about my request from [BUSINESS NAME] at the number provided. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase.”
Required microcopy under form submit button (or near checkbox):
“By submitting, you confirm you’re the owner/authorized user of this phone number and consent to receive texts about your request. Privacy/Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 • Support: agent_bob_replit+lead-copilot@agentmail.to”
Implementation notes:
- Checkbox should be unchecked by default.
- Store: checkbox value (true/false), timestamp, page URL, and a snapshot of the label text.

B. Typeform consent block (minimal)
Add a yes/no question (required):
Question: “Can we text you about your request?”
Description:
“By selecting Yes, you agree to receive text messages from [BUSINESS NAME] at the number provided about your request. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase.”
If Yes → proceed. If No → do not send SMS; send email only.

C. Meta/Facebook Lead Ads (instant form)
In the form’s disclaimer (or custom question description), paste:
“By submitting, you agree to receive text messages from [BUSINESS NAME] about your request at the number provided. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy/Support: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 • agent_bob_replit+lead-copilot@agentmail.to”
Operational note: For FB leads, maintain a field “lead_source=meta” and store the lead ad form ID + submission time.

2) Message templates (MV, deliverability-safe)
Rules: keep short, no ALL CAPS, no misleading urgency, no link on first message if avoidable, always include STOP/HELP at least in the first or second message.

Template 1 — First response (immediate speed-to-lead)
“Hi {{first_name}}, it’s {{agent_name}} with {{business_name}}. We got your request for {{service}}. Are you looking to schedule an estimate today or this week? Reply 1=today 2=this week. Reply STOP to opt out.”

Template 2 — Qualification (1 question at a time)
“Got it—what’s the address/zip code for the job? Reply STOP to opt out.”

Template 3 — Booking handoff
“Thanks. We can do {{slot1}} or {{slot2}}. Which works? Reply STOP to opt out, HELP for help.”

Template 4 — Missed-call textback (if call not answered)
“Sorry we missed you—this is {{business_name}}. What’s a good time to call you back? Reply STOP to opt out.”

Template 5 — Re-engagement (24–72h later, single touch)
“Hi {{first_name}}—do you still need help with {{service}}? Reply YES and we’ll get you scheduled. Reply STOP to opt out.”

3) STOP/HELP handling (implementation spec: minimum required)
Inbound keyword matching (case-insensitive, ignore punctuation/whitespace):
- STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP keywords: HELP, INFO
Behavior:
A) On STOP keyword:
1. Immediately add phone number to Global Suppression List (do-not-text).
2. Send confirmation message (exact copy):
“You’re opted out and will no longer receive texts from {{business_name}}. Reply HELP for help.”
3. Block any future outbound messages to that number (hard fail with reason “suppressed”).
B) On HELP keyword:
Send message (exact copy):
“{{business_name}}: We text about your recent request. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”
C) For any suppressed number:
- Do not send. Log an event “outbound_blocked_suppressed”.

Logging requirements (minimum viable audit):
Store per lead:
- consent_status: opted_in / opted_out / unknown
- consent_source: webflow / typeform / meta / manual
- consent_timestamp_utc
- consent_text_snapshot (the exact disclosure shown)
- last_stop_timestamp_utc (if any)
- message_event_log: {direction, body_hash, timestamp_utc, status}

4) Quiet hours MVP (timezone + queueing)
Goal: prevent late-night messages that trigger complaints while keeping speed-to-lead during daytime.
Default rule (MVP): only send between 8:00am–8:00pm in the lead’s local timezone.
Timezone resolution order:
1) If lead provides zip/postal code → map to timezone.
2) Else if area code mapping available → approximate timezone.
3) Else default to the business timezone (configured per client account) and treat as “unknown_tz”.
If message is triggered during quiet hours:
- Queue message and send at next allowed window start (8:00am local).
- Exception: If lead texts inbound first during quiet hours, you may respond once with a minimal acknowledgment (no marketing):
  “Thanks—got it. We’ll follow up in the morning. Reply STOP to opt out.”

5) Deliverability minimums (Twilio/general)
- Use a single Messaging Service per client account (keeps numbers/policies consistent).
- Avoid URL links in the first message when possible; if needed, use a single branded domain later (post-week-1).
- No “free”, “guaranteed”, “limited time”, excessive punctuation, or repeated identical blasts.
- One lead = one short conversation thread; do not batch-send to lists.
- Ensure STOP works even if the user replies to any message in the thread.

6) Agency handoff (10-minute go-live checklist)
A) Before turning on SMS:
1. Add opt-in disclosure to the lead form (Webflow/Typeform/Meta) using the snippets above.
2. Ensure phone field is required and normalized to E.164 (+1XXXXXXXXXX).
3. Confirm the client’s business name and agent name tokens are correct.

B) Test in 10 minutes (no paid traffic):
1. Submit a test lead with your own phone number (opt-in = yes).
2. Confirm you receive Template 1 within 60 seconds.
3. Reply “HELP” → confirm HELP response.
4. Reply “STOP” → confirm opt-out confirmation.
5. Trigger another outbound attempt → confirm it is blocked (suppressed).
6. Submit a test lead during quiet hours (or temporarily set quiet hours window to force) → confirm message queues and sends at next window.

C) If anything fails:
- Pause outbound sending.
- Email support with timestamps + your phone number used for the test: agent_bob_replit+lead-copilot@agentmail.to
- Reference the product page for legitimacy/context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

This MV kit is intentionally short. Once pilots are active and replying reliably, expand into full A2P 10DLC registration, richer consent evidence, branded links, and per-client compliance exports.