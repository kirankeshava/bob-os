# Local Lead Response Copilot — MVP Compliance + Deliverability Handoff (Pilot-Ready)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:11:59.639Z

---

Business legitimacy URL (share with prospects/agencies): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email: agent_bob_replit+lead-copilot@agentmail.to

GOAL (wartime MVP)
Launch paid pilots without carrier/TCPA/CTIA surprises by implementing only what removes objections and prevents shutdowns: (1) express written consent language where leads are captured, (2) STOP/HELP handling + suppression, (3) quiet hours, (4) consent logging, (5) basic Twilio deliverability hygiene.

1) COPY/PASTE OPT‑IN LANGUAGE (express written consent)
Use ONE of the following blocks directly under the phone field + near the submit button.

A) Webflow / website form snippet
“By providing your phone number and submitting this form, you agree to receive SMS messages from [Business Name] about your request, including appointment scheduling and service updates. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. See Privacy Policy: [PASTE PRIVACY URL] and Terms: [PASTE TERMS URL].”

B) Typeform snippet (form description or phone field description)
“Consent: I agree to receive text messages from [Business Name] regarding my inquiry (message frequency varies; msg & data rates may apply). Reply STOP to opt out, HELP for help. Privacy: [PRIVACY URL] Terms: [TERMS URL].”

C) Meta/Facebook Lead Ads (recommended fields)
Add to the ‘Privacy policy’ link field: [PRIVACY URL]
Add to the custom disclaimer text:
“By submitting, you agree to receive SMS from [Business Name] about your request (msg frequency varies; msg & data rates may apply). Reply STOP to opt out, HELP for help. Terms: [TERMS URL].”

Agency note: Do NOT use pre-checked boxes for SMS consent. If you use a checkbox, label it clearly and make it optional unless SMS is required for service.

2) FIRST MESSAGE TEMPLATE (speed-to-lead, compliant, low-spam)
Send within 0–60 seconds of lead creation.
“Hi {{first_name}}, this is {{agent_or_business_name}}. Thanks for reaching out about {{service}}. Are you looking for service at {{address_or_city}}? Reply 1) Yes 2) No. Reply STOP to opt out.”

Alternative (if you have strong business branding):
“Hi {{first_name}}—{{business_name}} here. We received your request for {{service}}. What’s the best time for a quick call today? Reply with a time window. STOP to opt out.”

3) AI QUALIFICATION (keep to 2–4 short questions)
Q1: “What’s the service you need? (e.g., repair, install, quote)”
Q2: “When do you need it? 1) ASAP 2) This week 3) Just pricing”
Q3: “Is this for a home you own? 1) Yes 2) No” (only if relevant)
Booking prompt:
“Got it. Want to book a quick call? Reply 1) Yes 2) No. STOP to opt out.”

4) STOP/HELP HANDLING (implementation spec)
Required keywords (case-insensitive, ignore punctuation/extra whitespace):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

Behavior:
- On inbound STOP-keyword:
  1) Immediately mark the phone number as ‘suppressed’ (global across all customers/tenants unless you have strict tenant isolation; MVP: global suppression).
  2) Send ONE confirmation message and then send nothing else:
     “You’re opted out and will no longer receive texts from {{business_name}}. Reply START to opt back in. For help email agent_bob_replit+lead-copilot@agentmail.to.”
  3) Block all future outbound messages to that number unless explicit opt-back-in is captured.

- On inbound HELP-keyword (only if not suppressed):
  “{{business_name}}: automated texts about your service request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to.”

- On inbound START/UNSTOP (opt-back-in):
  1) Remove suppression ONLY if you can associate the number to a new or existing consent event.
  2) Reply:
     “You’re opted back in. Reply STOP to opt out. How can we help with your request?”

Logging (audit trail; store at least 24 months recommended, MVP store indefinitely):
- lead_id, tenant_id, phone_e164
- consent_source (webflow/typeform/fb/other), consent_text_version, consent_timestamp_utc, consent_ip (if available), landing_url/form_id
- message_direction (in/out), message_body, provider_message_id, status (queued/sent/delivered/failed)
- stop_event_timestamp_utc, stop_keyword

5) QUIET HOURS (MVP by timezone)
Default rule (MVP): Do not send outbound SMS between 8:00pm–8:00am in the lead’s local timezone.
Timezone resolution order:
1) If lead has state/postal/city → infer timezone via lookup table (MVP: US only mapping by state; edge states use major metro if city known).
2) Else if phone number is US/CA → infer timezone by area code (fallback).
3) Else default to account timezone.

Behavior:
- If a lead arrives during quiet hours: queue the first message for the next allowed window (8:05am local).
- If a human overrides (manual send): still warn but allow (audit log “override=true”).
- If appointment is scheduled by the lead via inbound SMS during quiet hours: allow confirmation (inbound-triggered transactional), but do not start new marketing sequences.

6) TWILIO DELIVERABILITY HYGIENE (MVP)
- Use a Twilio Messaging Service (even for one number) so you can:
  • add multiple numbers later, manage throughput, attach compliance settings.
- Do not use URL shorteners in early pilots. If links are required, use the business domain or trusted scheduling links.
- Avoid spam triggers: excessive caps, repeated exclamation, “FREE!!!”, “guaranteed”, “click now”, heavy emojis.
- Keep initial messages under 160 chars when possible; be conversational and contextual.
- Include business name early and STOP in the first message.

A2P 10DLC notes (US long code):
- If sending at scale or from local long codes, expect A2P registration to be required to prevent filtering.
- Registration usually requires brand + campaign details and may involve carrier fees later. Do not pay anything without approval.

7) AGENCY GO‑LIVE CHECKLIST (what to verify in 30 minutes)
1) Form/Lead ad has opt-in text present + Privacy/Terms links (or placeholders replaced).
2) Submit a test lead with your own phone number.
3) Confirm first SMS arrives within 60 seconds.
4) Reply “HELP” → receive help message.
5) Reply “STOP” → receive opt-out confirmation and suppression is logged.
6) Attempt to trigger another outbound message → should be blocked.
7) Test quiet hours by temporarily setting tenant timezone and window to ‘closed now’ → confirm message queues.

If an agency asks “Are you compliant?” answer:
“We use explicit opt-in language at the point of capture, include STOP/HELP in messaging, honor opt-outs globally via a suppression list, enforce quiet hours by timezone, and log consent + message events for audit. See product info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 or email agent_bob_replit+lead-copilot@agentmail.to.”
