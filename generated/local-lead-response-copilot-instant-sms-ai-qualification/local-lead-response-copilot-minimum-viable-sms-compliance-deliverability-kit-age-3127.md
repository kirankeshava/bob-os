# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Kit (Agency Handoff + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:28:47.026Z

---

Business legitimacy (include in agency comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

GOAL (minimum viable): Launch pilots with SMS that (1) has clear opt-in, (2) honors STOP/HELP immediately, (3) respects quiet hours, (4) logs consent for audits, and (5) avoids common carrier spam triggers.

1) Copy/Paste Opt‑In Language (use ONE everywhere)
A) Website / Webflow / embedded form checkbox (recommended)
Checkbox label (unchecked by default):
“I agree to receive text messages from [Company Name] about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Small print under submit button:
“By submitting, you confirm you are the subscriber/primary user of this number and consent to receive calls/texts about your inquiry. View Terms: [TERMS_URL] and Privacy: [PRIVACY_URL].”

B) Typeform (add as ‘Legal’ or below phone question)
“By providing your phone number, you agree to receive text messages from [Company Name] regarding your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

C) Meta/Facebook Lead Ads (Primary + disclaimer)
Primary text:
“Get a fast response by text. By submitting, you agree we may text you about your request. Reply STOP to opt out.”
Disclaimer (in ‘Privacy Policy’ link and/or custom disclaimer field):
“Msg frequency varies. Msg & data rates may apply. HELP for help, STOP to cancel. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Minimum required fields to capture on every lead:
- Phone number (E.164 preferred), timestamp, lead source, IP/user agent if available (web), consent text version (store the exact snippet used), and the URL/form identifier.

2) Default Message Templates (carrier-safe, compliant)
Rules:
- Keep under ~300 chars when possible.
- No ALL CAPS, no excessive punctuation, no misleading urgency, no link shorteners.
- Identify the business early; ask 1 question at a time.

Template 1 — Instant first response (sent immediately)
“Hi {firstName}, this is {agentName} with {businessName}. Thanks for reaching out about {service}. What’s the address/ZIP for the job? Reply STOP to opt out, HELP for help.”

Template 2 — Qualification follow-up (if ZIP/address provided)
“Got it. What’s the best day/time for an estimate or call? (e.g., today after 4pm, tomorrow morning). Reply STOP to opt out, HELP for help.”

Template 3 — Booking confirmation
“Confirmed: {date} at {time}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

Template 4 — No response nudge (after 30–60 min, only once)
“Just checking—do you still want help with {service}? Reply with a good time for a quick call/estimate. STOP to opt out, HELP for help.”

3) STOP/HELP Handling (Engineering Spec — Twilio-style)
Objective: The moment an inbound message matches a STOP keyword, we must (a) send a confirmation, (b) suppress future outbound, and (c) log the event.

A) Keywords (case-insensitive, trim punctuation/whitespace)
STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP set: HELP, INFO

B) Behavior
On inbound STOP keyword:
1) Write to suppression list: {phone, suppressed=true, reason=’STOP’, timestamp, source=’inbound_sms’, messageSid/providerId}
2) Send confirmation (one time):
“You’re opted out and will no longer receive texts from {businessName}. Reply START to resubscribe.”
3) Block all future outbound to this phone across ALL customers/workspaces unless there is explicit resubscribe logic per tenant (recommended: global suppression at sending layer).

On inbound HELP keyword:
Send:
“{businessName} support: {supportEmail}. Msg frequency varies. Reply STOP to opt out.”
Also log {phone, type=HELP, timestamp, providerId}.

Optional START handling (only if you support re-opt-in)
If inbound is START/YES and you have a prior opt-in record (or you treat START as re-opt-in):
- Clear suppression, log resubscribe event, reply:
“You’re subscribed again. Reply STOP to opt out.”

C) Where to enforce suppression
- Enforce at the send function BEFORE provider API call.
- If suppressed, do not attempt send; log “blocked_due_to_optout”.

D) Audit log fields (minimum)
lead_id, tenant_id, phone_e164, event_type (opt_in, outbound_sent, inbound_received, stop, help, blocked), timestamp_utc, timezone_assumed, source (webflow/typeform/meta), message_body_hash (optional), provider_message_id.

4) Quiet Hours by Timezone (Engineering Spec)
Policy (minimum viable, conservative):
- Only send outbound messages 8:00am–8:00pm recipient local time, Mon–Sat.
- Sunday: 10:00am–6:00pm (or block entirely if client prefers).
- If timezone unknown: assume lead’s area code timezone; if unknown, default to business timezone and queue until next window.

Timezone resolution order:
1) Lead-provided address/ZIP → geocode timezone
2) Area code lookup
3) Fallback to tenant’s configured timezone

Behavior:
- If a message is triggered during quiet hours, queue it with “send_at_next_open_window”.
- If lead messages inbound during quiet hours, allow immediate auto-reply ONLY if it is a direct response and you include a short acknowledgment; otherwise queue.
Suggested acknowledgment (optional):
“Thanks—got it. We’ll follow up first thing in the morning. STOP to opt out, HELP for help.”

5) Twilio Deliverability Minimums (no-spend guidance)
- Use a Messaging Service (not individual numbers) so you can add numbers, set sticky sender, and centralize settings.
- Avoid shortened links; use full domain links.
- Keep content consistent with the opted-in purpose (service inquiry → scheduling/quote).
- Don’t include promotional blasts; this product is transactional/conversational.
- If scaling beyond a few numbers or running ads, plan for A2P 10DLC registration (Brand + Campaign) to reduce filtering.

A2P 10DLC readiness (what agencies need to provide later)
- Legal business name, EIN/registration if applicable, business address, website/Privacy/Terms URLs, use-case description, sample messages (use the templates above), opt-in capture description and screenshots.

6) Agency Go-Live Checklist (copy/paste)
1) Add opt-in checkbox + disclosure to form or lead ad (use snippets above).
2) Ensure Privacy + Terms URLs are live and linked.
3) Confirm lead payload includes: phone, timestamp, source, consent text version.
4) Turn on STOP/HELP handling and confirm suppression is enforced at sending layer.
5) Set quiet hours + timezone resolution; verify queued messages send next window.
6) Run tests:
- Submit a test lead → confirm instant first response.
- Reply HELP → receive help message.
- Reply STOP → receive opt-out confirmation; then attempt outbound → must be blocked.
7) Save evidence: screenshots/log exports of opt-in capture + STOP test results.

If you need implementation support, email agent_bob_replit+lead-copilot@agentmail.to and include your lead source (Webflow/Typeform/Meta), your SMS provider, and a sample lead payload (with phone redacted).