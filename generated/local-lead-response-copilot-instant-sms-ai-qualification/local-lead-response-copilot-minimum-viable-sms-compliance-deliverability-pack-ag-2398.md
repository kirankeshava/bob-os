# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T21:11:57.807Z

---

Purpose (wartime MVP)
This pack contains only what we need to safely launch pilots without carrier/TCPA/CTIA objections: (1) clear opt-in language, (2) STOP/HELP handling, (3) quiet hours, (4) consent logging, and (5) deliverability-safe message templates. Reference site for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

1) Copy/Paste Opt‑In Language (use one)
A) Webflow / Website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages about my request from [BUSINESS NAME] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Under checkbox (small text with links):
“By submitting, you confirm you are the owner/user of this number and consent to SMS about your inquiry/service scheduling. Privacy: [PRIVACY_URL] Terms: [TERMS_URL]”
Required: checkbox must be unchecked by default.

B) Typeform
Add a “Yes/No” question: “Can we text you updates about your request?” (default blank)
If Yes, show statement:
“By providing your number, you agree [BUSINESS NAME] may text you about your request. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL]”

C) Meta/Facebook Lead Ads (disclosure field)
Add to lead form disclaimer:
“By submitting this form, you consent to receive SMS from [BUSINESS NAME] about your request/scheduling. Msg frequency varies. Msg&data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL]”

2) First Message Templates (deliverability-safe)
Rule: first message must identify the business + context + quick CTA + STOP notice.

Template 1 (generic home services):
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. Are you looking to schedule today or this week? Reply 1) Today 2) This week 3) Just pricing. Reply STOP to opt out.”

Template 2 (missed-call textback):
“Hi {first_name} — sorry we missed your call. This is {business_name}. What service do you need help with? Reply with a short description and your ZIP. Reply STOP to opt out.”

Template 3 (re-engagement; only if consent exists):
“Hi {first_name} — checking in from {business_name}. Do you still need help with {service}? Reply YES or NO. Reply STOP to opt out.”

Avoid / reduce spam triggers:
- Avoid ALL CAPS, excessive punctuation, “FREE!!!”, “ACT NOW”, link shorteners.
- Keep links minimal; prefer your primary domain; no more than 1 link per message.
- Don’t mention “loan/credit/debt” etc. unless the business is explicitly in that vertical.

3) STOP/HELP Handling (implementation spec)
Goal: Once a user opts out, we must stop all future messages across all campaigns/numbers.

3.1 Keywords
STOP keywords (case-insensitive; ignore punctuation/whitespace): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO
Optional re-subscribe: START, YES, UNSTOP (only if your policy allows)

3.2 Behavior
On inbound STOP keyword:
- Immediately mark contact as opted_out=true in a GLOBAL suppression list keyed by E.164 phone.
- Send one confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
- Block all outbound messages to that number (hard fail with logged reason “OPTED_OUT”).

On inbound HELP keyword:
- Do NOT change opt-out state.
- Respond:
“{business_name} texts about your request/scheduling. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. More: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

On inbound START (if enabled):
- If previously opted out, set opted_out=false and log resubscribe timestamp/source.
- Respond:
“You’re re-subscribed to {business_name} texts. Msg frequency varies. Reply STOP to opt out.”

3.3 Twilio-style webhook routing (generic)
- Expose an inbound SMS webhook endpoint (POST).
- Parse From/Body.
- Normalize Body: trim, uppercase, remove punctuation.
- If keyword matched: execute rules above.
- Else: proceed with qualification flow ONLY if consent_on_file=true and opted_out=false.

4) Quiet Hours (timezone) — MVP spec
Objective: avoid sending during local night hours to reduce complaints and carrier filtering.

Default windows (can be configured per client):
- Allowed send window: 9:00 AM–7:00 PM recipient local time, Monday–Saturday.
- Sunday: 10:00 AM–6:00 PM (or disabled).

Timezone resolution order:
1) If lead provides ZIP/postal code: map ZIP→timezone.
2) If area code mapping available: infer timezone (lower confidence).
3) If unknown: use client’s business timezone AND queue messages to next window.

Behavior:
- If message is triggered outside window: queue and send at next allowed time.
- Log queued_at, scheduled_for, timezone_source.
- Emergency override (optional): allow immediate send for “inbound lead initiated within last 5 minutes” but still do not send between 9 PM–8 AM local.

5) Consent Logging (MVP fields)
Store per lead/contact:
- phone_e164
- consent_status: granted | denied | unknown
- consent_timestamp
- consent_source: webflow | typeform | meta | inbound_text | manual
- consent_text_version (hash or version string)
- page_url/form_id/ad_id (when available)
- ip_address + user_agent (when available)
- opted_out (bool), opted_out_timestamp, opted_out_source
- message_log: direction, timestamp, template_id, body, delivery_status

6) Agency Handoff — Go‑Live Checklist
What agencies must implement (no code changes needed if using our forms/templates):
1) Add required opt-in disclosure (Section 1) to every form/ad capturing phone numbers.
2) Ensure checkbox is unchecked by default (web forms).
3) Ensure business name is inserted into templates (no generic “we”).
4) Confirm STOP/HELP behavior with the test matrix below.
5) Confirm quiet hours are enabled (or client-approved schedule documented).
6) Confirm links: Privacy/Terms URLs are live; otherwise leave them blank until published.

Verification mini test matrix (5 minutes)
- Send inbound “HELP” → receive HELP response with support email + website.
- Send inbound “STOP” → receive opt-out confirmation; outbound attempts blocked.
- Send inbound “START” (if enabled) → receive resubscribe confirmation.
- Trigger lead outside quiet hours → message is queued, not sent immediately.

Notes on A2P 10DLC (keep simple)
For pilots/low volume, keep content clean and consent strong. If using US long codes at scale, Twilio A2P 10DLC registration will be required; this pack ensures opt-in language and STOP handling are already compliant so registration is not blocked later.
