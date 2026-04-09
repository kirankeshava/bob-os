# Local Lead Response Copilot — Agency MV Compliance + Deliverability Handoff (Copy/Paste Pack + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:49:40.973Z

---

Overview (what this is)
This handoff lets an agency or local business deploy Local Lead Response Copilot (instant SMS + AI qualification + booking) in a TCPA/CTIA-aligned way, with practical deliverability guardrails for Twilio. Use this with the proof URL https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 and support email agent_bob_replit+lead-copilot@agentmail.to in all customer-facing touchpoints.

1) Minimum-viable compliance checklist (pilot-safe)
A. Consent & disclosure present at point of capture
- Clear statement that the user agrees to receive SMS.
- Identify sender (business/brand) + purpose (lead follow-up/appointment).
- “Msg & data rates may apply.”
- Frequency disclosure (e.g., “up to 4 msgs/month” or “varies”).
- STOP/HELP language.
- Links to Privacy Policy + Terms (publish ASAP; until then link to proof URL page section that contains policies).
- “Consent not a condition of purchase.”

B. Operational requirements
- Maintain a global suppression list (STOP) across all campaigns and numbers.
- Log consent evidence (timestamp, source, IP/UA where possible).
- Quiet hours enforced by recipient timezone.
- No shortened links (bit.ly etc.); use branded/root domain links.

2) Copy/paste opt-in language snippets
Replace bracketed fields. Always keep STOP/HELP + rates language.

2.1 Webflow form (checkbox + disclosure)
Checkbox label:
“I agree to receive text messages about my inquiry and scheduling from [BUSINESS NAME] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

Under the checkbox (small text):
“By submitting, you agree to our Terms and Privacy Policy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4. Support: agent_bob_replit+lead-copilot@agentmail.to”

Implementation notes:
- Make the checkbox required.
- Store checkbox value + submission timestamp.
- If checkbox unchecked, do not text.

2.2 Typeform
Add a Yes/No question before submit:
Question: “SMS updates?”
Description: “Do you agree to receive text messages about your inquiry and scheduling from [BUSINESS NAME]? Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not a condition of purchase.”
If “Yes” → proceed; if “No” → proceed but do not send SMS.
Footer/Ending statement:
“Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 • Support: agent_bob_replit+lead-copilot@agentmail.to”

2.3 Meta/Facebook Lead Ads (higher scrutiny)
Lead form disclaimer (Custom disclaimer or privacy policy section):
“By submitting, you agree to receive text messages from [BUSINESS NAME] about your inquiry, estimates, and appointment scheduling at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not required as a condition of purchase. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.”

3) Message templates (carrier-safe)
Guidelines:
- Keep first message plain, short, identify business, reference their request.
- Avoid ALL CAPS, excessive punctuation, “free”, “cash”, “guarantee”, aggressive urgency.
- Avoid shortened links. Limit links early; add after engagement.

3.1 First message (immediate)
“Hi {first_name}—this is {agent_name} with {business_name}. Got your request for {service}. Are you looking to schedule or just get a quote? Reply 1) Schedule 2) Quote. Reply STOP to opt out.”

3.2 Qualification (simple)
“Thanks—what’s your address or ZIP code so we can confirm service area?”
“What day/time works best? (e.g., Tue 2–5pm)”
“Any details we should know to prepare? (optional)”

3.3 Booking handoff (human or calendar)
“Perfect. Want us to call you now, or book a time? Reply 1) Call now 2) Send times. Reply STOP to opt out.”

3.4 Missed-call textback
“Hi {first_name}—sorry we missed you. This is {business_name}. What’s the best time to call back? Reply STOP to opt out.”

3.5 Re-engagement (7–14 days)
“Hi {first_name}—checking in from {business_name}. Still need help with {service}? Reply YES or NO. Reply STOP to opt out.”

4) STOP / HELP / START handling (implementation spec)
Goal: One inbound keyword instantly suppresses all future marketing/qualification messages until user re-subscribes.

4.1 Keywords (case-insensitive, trim punctuation)
STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP set: HELP, INFO
START set (re-subscribe): START, UNSTOP, SUBSCRIBE

4.2 State machine
- Default state: ACTIVE
- If inbound matches STOP set → state = STOPPED, add phone to global_suppression
- If inbound matches START set and phone previously STOPPED → state = ACTIVE, remove from suppression only if you have prior consent evidence; log re-subscribe event
- HELP does not change state

4.3 Required reply copy (exact or near-exact)
On STOP:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”

On HELP:
“{business_name}: We text about your inquiry/appointments. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.”

On START (if allowed):
“You’re re-subscribed to {business_name} texts. Msg frequency varies. Reply STOP to opt out.”

4.4 Enforcement rules
- If recipient is in global_suppression, block ALL outbound messages except the required STOP/HELP/START confirmations.
- Log every blocked send attempt with reason = SUPPRESSED.

4.5 Verification test matrix (must pass before pilot)
- Send STOP → confirm: (a) STOP reply sent, (b) suppression flag set, (c) next outbound blocked.
- Send HELP while ACTIVE → confirm HELP reply.
- Send HELP while STOPPED → confirm HELP reply, state unchanged.
- Send START after STOP → confirm re-subscribe reply and outbound allowed (only if prior consent exists).

5) Quiet hours by timezone (implementation spec)
Objective: Avoid texting recipients late night/early morning in their local time.

5.1 Default allowed window
Allowed local sending window: 9:00 AM–7:00 PM (recipient local time), Mon–Sat.
Sunday: 10:00 AM–6:00 PM (optional; conservative default: block Sunday unless client requests).

5.2 Timezone resolution order
1) Lead-provided ZIP/postal code → map to timezone
2) Phone number NPA-NXX (area code) approximate timezone
3) If address city/state provided → map
4) Fallback: business timezone (but log “TZ_FALLBACK_USED”)

5.3 Deferral behavior
If message would send outside allowed window:
- Do NOT send.
- Create a deferred_message record with earliest_send_at = next allowed window start in recipient timezone.
- When window opens, send in FIFO order with a jitter (0–120s) to avoid bursts.

5.4 Overrides
- Human operator override allowed only for inbound-initiated conversations (lead texts first) and should be logged.
- Emergency override flag (client-defined) must be off by default.

5.5 Required logs
- QUIET_HOURS_BLOCKED event: phone, tz_used, local_time, message_type, deferred_to
- QUIET_HOURS_SENT event when delivered

6) Consent logging schema (dispute-ready)
Store per lead:
- lead_id (UUID)
- phone_e164
- consent_status: CONSENTED | NOT_CONSENTED | STOPPED
- consent_timestamp_utc
- consent_source: WEBFLOW | TYPEFORM | META_LEAD_AD | MANUAL | IMPORT
- consent_language_version (hash or version string)
- landing_page_url / form_url
- ip_address (if available)
- user_agent (if available)
- checkbox_value or yes_no_value
- last_updated_utc

Store per message:
- message_id, lead_id, direction (IN/OUT), body, segments, status, error_code
- compliance_tags: FIRST_MESSAGE | QUALIFICATION | BOOKING | SYSTEM
- suppression_check_result: ALLOWED | BLOCKED_SUPPRESSED | BLOCKED_NO_CONSENT | BLOCKED_QUIET_HOURS

Retention:
- Keep consent + message logs for minimum 24 months (better: 48 months).
Export:
- One-click CSV export by phone number for disputes.

7) Twilio deliverability hardening (minimum viable)
- Use a Messaging Service (not a single standalone number) to enable features like sticky sender and simplified compliance.
- Decide route:
  - Low volume / simplest: Toll-Free (often faster verification; still must be compliant)
  - Higher scale/local presence: 10DLC (A2P registration strongly recommended/required for US long code)
- Avoid:
  - Link shorteners
  - Repetitive identical messages across many recipients
  - Excessive emojis, ALL CAPS, heavy promo language
- Prefer:
  - Personalization ({first_name}, service)
  - Clear business identification
  - User-driven replies (1/2 choices)

8) Agency setup instructions (no-code friendly)
A. Connect lead source → webhook/Zapier/Make → Copilot
Required fields to pass:
- phone
- first_name
- service_requested (or form name)
- lead_source
- consent = true/false
- consent_timestamp

B. Always gate sending on consent=true.
C. Ensure STOP/HELP inbound webhooks are configured to update suppression globally.
D. Use the templates above unchanged for STOP/HELP lines.

Support and legitimacy references
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

If you want me to verify STOP/HELP end-to-end, provide Twilio console access or the webhook endpoint + a test number so I can run the test matrix and return the exact log evidence required above.