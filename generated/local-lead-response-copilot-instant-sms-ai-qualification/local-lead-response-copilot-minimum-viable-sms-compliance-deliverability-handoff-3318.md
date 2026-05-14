# Local Lead Response Copilot — Minimum-Viable SMS Compliance + Deliverability Handoff (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T23:02:24.911Z

---

Purpose (wartime): Launch pilots safely with the minimum compliance/deliverability pieces that prevent shutdowns, carrier filtering, and client objections. This doc is designed for agencies and operators to copy/paste into forms/ads and for engineers to implement STOP/HELP + quiet hours + consent logging.

Business legitimacy references
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

A) Opt-in language (copy/paste)
1) Webflow / website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages from [Company Name] about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Below checkbox (small text):
“By submitting, you consent to be contacted at the number provided (including via automated texts) for the purpose of responding to your inquiry and scheduling service. See Privacy Policy: [PRIVACY_URL] and Terms: [TERMS_URL].”
Implementation notes:
- Checkbox must be unchecked by default.
- Store a timestamp + page URL where consent occurred.

2) Typeform (consent statement)
Add a required “Legal” or “Statement” + yes/no question:
Prompt:
“SMS Consent: I agree to receive text messages about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Choices: “Yes, I agree” / “No” (If no, do not text.)
Footer text:
“Privacy: [PRIVACY_URL] Terms: [TERMS_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to”

3) Meta/Facebook Lead Ads (custom disclaimer)
Add to ‘Privacy policy’ field: [PRIVACY_URL]
Add to ‘Custom disclaimer’:
“By submitting, you agree [Company Name] may contact you at the number provided via automated text for your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL].”

B) Message templates (carrier-safe, non-spammy)
1) First response (immediate)
“Hi {{first_name}}—this is {{biz_name}}. Got your request for {{service}}. What’s the address/ZIP for the job?”
(If you must include opt-out line, keep it short on message #1 or #2)

2) Qualification
“Thanks. When would you like us to come out—today, tomorrow, or later this week?”

3) Booking handoff
“Perfect. Here’s the link to pick a time: {{booking_link}}. If you prefer, reply with 2 times that work.”

4) Missed-call text back
“Hi—sorry we missed you. This is {{biz_name}}. What service do you need help with?”

5) Re-engagement (1 follow-up only)
“Hi {{first_name}}—checking in. Do you still need help with {{service}}? Reply YES and we’ll get you scheduled.”

Content guidelines to avoid filtering
- Avoid: “FREE!!!”, “GUARANTEED”, “act now”, excessive caps/punctuation, URL shorteners, vague affiliate language.
- Prefer: specific service context, location, appointment scheduling, plain language.
- Keep links consistent (same domain), and don’t send multiple links in one message.

C) STOP/HELP handling (implementation spec)
Goal: Immediate compliance and suppression.
1) Keywords
- STOP triggers (case-insensitive, trimmed): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP triggers: HELP, INFO, SUPPORT
2) Behavior
- On STOP trigger: (a) mark contact as “suppressed_sms=true” globally for that business account, (b) immediately respond once:
“You’re opted out and will no longer receive texts from {{biz_name}}. Reply START to re-subscribe.”
- On HELP trigger: respond:
“{{biz_name}} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
- On any outbound attempt to a suppressed number: block send, log event “blocked_suppressed”.
- If START received after STOP: optional re-subscribe only if your policy allows; if enabled, log “resubscribe_start” and confirm:
“You’re opted back in for texts from {{biz_name}}. Reply STOP to opt out.”
3) Logging (minimum fields)
- contact_phone (E.164), business_id, message_direction (inbound/outbound), message_body, timestamp_utc
- stop_event: keyword, timestamp_utc, source (“sms_inbound”), raw_payload_id
- suppression_list status change history (who/what changed it)

D) Quiet hours by timezone (implementation spec)
Goal: Reduce complaints and carrier enforcement.
1) Default sending window
- 8:00am–8:00pm recipient local time (adjustable per business).
2) Timezone resolution order
- (1) Lead-provided ZIP/postal → map to TZ
- (2) Lead-provided address/city/state → map to TZ
- (3) Business default timezone
- If unknown: use business default, but be conservative (e.g., delay until 10am local business time).
3) Behavior
- If message would send outside window: queue it for next allowed time (next day at 8:05am local).
- Exception: purely transactional user-initiated replies (lead texts first) may be allowed for a short period, but still avoid late-night automation.
4) DST
- Use an IANA TZ database approach (e.g., “America/Chicago”) and compute send eligibility at runtime.

E) Twilio deliverability essentials (minimum viable)
- Use a Messaging Service (not individual numbers) for consistent sender behavior and compliance settings.
- Set up inbound webhook to your STOP/HELP handler endpoint.
- Maintain a per-business suppression list and ensure it is checked before every send.
- A2P 10DLC: if using long code at scale, you’ll need Brand + Campaign registration. Don’t promise “instant approval”; set expectation with agencies that registration may be required as volume increases.

F) Agency go-live checklist (5 minutes)
1) Add consent checkbox/statement to the form (use section A).
2) Ensure lead payload includes: phone, consent=true/false, timestamp, source (web/FB), and page URL.
3) Turn on STOP/HELP automation (section C).
4) Confirm quiet-hours window (section D).
5) Run verification test:
- Submit test lead → receive message.
- Reply HELP → receive help message.
- Reply STOP → receive confirmation, then ensure no further texts deliver.

Where to send questions
- Support email: agent_bob_replit+lead-copilot@agentmail.to
- Website for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
