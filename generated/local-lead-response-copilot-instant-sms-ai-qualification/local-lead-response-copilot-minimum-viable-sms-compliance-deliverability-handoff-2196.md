# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Agency + Engineering)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:09:44.300Z

---

Business proof links (use in all agency docs + opt-in language)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Goal (minimum viable for pilots)
1) Clear opt-in disclosure at point of capture (TCPA/CTIA-aligned)
2) Functional STOP/HELP handling with suppression + audit logs
3) Quiet hours by lead timezone (or conservative fallback)
4) Messaging content that won’t get filtered/flagged

A) Copy/paste opt-in language (by lead source)

1) Webflow / website form checkbox (recommended)
Field label (checkbox required):
“I agree to receive text messages from [BUSINESS NAME] about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Privacy Policy: [PRIVACY_URL] and Terms: [TERMS_URL].”

Hidden fields to capture (if possible):
- sms_consent = true
- sms_consent_timestamp = {{now}}
- sms_consent_source = webflow
- page_url = {{page.url}}
- ip_address = {{visitor.ip}} (if available)

2) Typeform
Add to form description (above submit):
“By submitting, you consent to receive SMS from [BUSINESS NAME] about your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”
Add a required Yes/No question:
“Do you agree to receive text messages about your request?” (Yes required)

3) Meta / Facebook Lead Ads
In the “Privacy Policy” link field: use [PRIVACY_URL] (must be a live URL).
Add to the custom disclaimer / question text:
“By submitting, you agree to receive SMS from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

B) First-message templates (compliant + deliverability-safe)

Template 1: Immediate response (recommended default)
“Hi {{first_name}}, it’s {{agent_or_business_name}}. Got your request for {{service}} in {{city}}. What’s the address for the job?”
Follow-up (only if no reply after ~2 minutes):
“Also—what’s the best time window for a quick call today?”

Template 2: If business name must be explicit + STOP/HELP line on first touch
“Hi {{first_name}}, {{business_name}} here—thanks for your request. What type of {{service}} do you need? Reply STOP to opt out, HELP for help.”

Avoid in first 1–2 messages (filter risk):
- URL links (especially shortened)
- Excess punctuation (!!!!!) or ALL CAPS
- “FREE”, “GUARANTEED”, “ACT NOW”, “LIMITED TIME”
- Repeated identical messages across many recipients

C) STOP/HELP handling (engineering spec — Twilio)

1) Keywords to detect (case-insensitive, trim whitespace/punctuation)
STOP set: STOP, STOPALL, STOP ALL, UNSUBSCRIBE, CANCEL, END, QUIT
START set: START, UNSTOP
HELP set: HELP, INFO

2) Behavior requirements
- If inbound matches STOP set:
  a) Add phone number (E.164) to a Global Suppression List immediately
  b) Set contact.sms_opt_out = true, contact.sms_opt_out_timestamp = now
  c) Send ONE confirmation message (no marketing):
     “You’re opted out of texts from {{business_name}}. Reply START to resubscribe. HELP for help.”
  d) Block all future outbound SMS to this number across all clients until START is received (global-by-default; if you support per-client later, still ensure Twilio-level opt-out compliance).

- If inbound matches HELP set:
  Send:
  “{{business_name}}: We text about your service request. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

- If inbound matches START set:
  a) Remove from suppression list
  b) Set contact.sms_opt_out = false, contact.sms_resubscribe_timestamp = now
  c) Send confirmation:
     “You’re resubscribed to texts from {{business_name}}.”

3) Logging/audit (minimum fields)
For every inbound message (including STOP/HELP):
- message_sid (provider id)
- from_number, to_number
- body_raw, body_normalized
- detected_intent: stop | help | start | other
- action_taken: suppress_added | suppress_removed | help_sent | none
- timestamp (UTC)
- lead_source + consent_source if known

4) Verification test matrix (run in staging)
- Send “STOP” → confirm suppression + confirmation reply
- Attempt outbound after STOP → confirm blocked + logged
- Send “HELP” → confirm help reply (should work even if suppressed)
- Send “START” → confirm unsuppressed + confirmation reply
- Send “Stop all” / “Unsubscribe” → confirm treated as STOP

D) Quiet hours (timezone-aware) — minimum viable spec

Goal: don’t text people at night; reduce complaints and opt-outs.
1) Default quiet hours: 8:00pm–8:00am recipient local time
2) Timezone resolution order:
  a) Lead provided state/zip → map to timezone
  b) Area code of phone number (coarse) if address unknown
  c) If unknown: assume business timezone and apply conservative window (send only 10:00am–6:00pm)
3) If message would send in quiet hours:
  - queue for next allowed time (next local 8:05am)
  - preserve “speed-to-lead” by sending an internal alert to business user immediately (email/app notification) so they can call if urgent
4) Owner override:
  - allow manual send toggle with confirmation (“This will text outside quiet hours”) and log override_reason

E) Twilio deliverability setup (minimum guidance; no spend)

1) Use a Messaging Service
- Enable: Sticky Sender
- Enable: Smart Encoding
- Add: your sending number(s)
- Add status callbacks for delivery events (delivered/undelivered/failed)

2) A2P 10DLC readiness (initiate when pilots scale)
- Have: business name, EIN (if available), address, website, privacy/terms URLs, use-case description (“conversational customer care / lead response”), sample messages (the templates above)
- Campaign description must match actual content (lead response + appointment booking), include opt-out language, no affiliate/sharing

3) Content guardrails (internal lint rules)
- First touch includes business identification
- STOP/HELP included in first or second message, and always in any “re-engagement” message
- No URL in first message; if needed later, use a full branded domain (avoid shorteners)
- Keep personalization tokens present (first name/city/service) to reduce “mass blast” signatures

F) Agency handoff (30-minute implementation checklist)
1) Add the opt-in checkbox/disclaimer to the form/ad (use the snippets above).
2) Ensure you capture: phone number, first name, service needed, city/zip (for timezone).
3) Paste the first-message template into the autoresponder.
4) Confirm STOP/HELP routes to the inbound handler (or Twilio Studio/Function) and that suppression is global.
5) Turn on quiet hours defaults (8pm–8am local) before sending any traffic.
6) Send a live test lead from the form and verify:
   - First message delivered
   - Reply routes into the qualification flow
   - STOP blocks future messages

If you need help verifying your setup, email agent_bob_replit+lead-copilot@agentmail.to and include the sending number and a test recipient number (no customer PII).