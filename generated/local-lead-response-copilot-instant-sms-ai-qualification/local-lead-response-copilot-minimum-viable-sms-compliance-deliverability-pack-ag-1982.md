# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Pack (Agency Handoff + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:06:35.076Z

---

Purpose
This pack provides the minimum viable compliance + deliverability setup needed to safely run pilots for Local Lead Response Copilot (instant SMS + AI qualification). It is intentionally scoped to remove sales objections and prevent carrier/TCPA/CTIA issues that block distribution.

Official business references (include in customer comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) Minimum viable compliance checklist (pilot-ready)
A. Consent capture (required)
- Lead must provide their phone number directly (form field or FB lead form).
- Lead must see disclosure at the point of capture that they agree to receive SMS from the business.
- Disclosure must include: message frequency, “Msg&data rates may apply”, STOP to opt out, HELP for help, and links to Terms/Privacy.
- Store proof of consent (timestamp, source, page/form name, IP/user agent when available, the exact opt-in text version shown).

B. STOP/HELP (required)
- STOP keywords must immediately suppress further messages.
- HELP must respond with support instructions.
- Suppression must be global per client account (do not re-message even if they re-enter a form unless they explicitly re-consent).

C. Quiet hours (recommended default; required for many verticals)
- Default quiet hours: no outbound texts between 9pm–8am recipient local time.
- If a lead arrives during quiet hours, queue the first message for next allowed time.

D. Content guardrails (deliverability)
- Avoid spam trigger patterns: excessive ALL CAPS, repeated emojis, aggressive urgency (“ACT NOW”), URL shorteners, overly generic “claim your offer” phrasing.
- Identify the business clearly in the first message.
- Keep first message short; ask 1 question.

2) Copy/paste opt-in snippets (agencies)
Replace bracketed fields: [BusinessName], [PrivacyURL], [TermsURL]. If Terms/Privacy pages are not yet published, use the website root above temporarily and update ASAP.

2.1 Webflow / website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages from [BusinessName] about my request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TermsURL] Privacy: [PrivacyURL]”

Under the phone field (if no checkbox available):
“By providing your phone number, you agree to receive text messages from [BusinessName] regarding your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TermsURL] Privacy: [PrivacyURL]”

2.2 Typeform (statement + required ‘I agree’ field)
Add a Statement block right before phone collection:
“Consent to Text Messages: By submitting, you agree that [BusinessName] may text you about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TermsURL] Privacy: [PrivacyURL]”
Then add a Yes/No question required:
“Do you agree to receive text messages about your request?”
- Yes (continue)
- No (continue, but do NOT text)

2.3 Meta/Facebook Lead Ads (Privacy Policy + custom disclaimer)
- Set Privacy Policy URL to: [PrivacyURL]
- Add custom disclaimer (one line):
“By submitting, you agree to receive texts from [BusinessName] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TermsURL] Privacy: [PrivacyURL]”

3) Message templates (MVP, compliant)
Rules for all templates:
- Always identify the business.
- Keep message count minimal.
- Include opt-out reminder at least in the first message and any re-engagement.

3.1 First response (immediate)
“Hi {first_name}, this is {agent_name} with [BusinessName]. Reaching out about your request—what service do you need help with? Reply STOP to opt out, HELP for help.”

3.2 Qualification Q2 (only after they answer)
“Got it—what’s the address or zip code for the job?”

3.3 Qualification Q3 (optional)
“When would you like us to come out? (Today / This week / Next week)” 

3.4 Booking / handoff
“Thanks. We can get you scheduled—what’s the best time for a quick call? Or book here: {booking_link}”

3.5 Missed-call text back (if applicable)
“Hi {first_name}, sorry we missed you—this is [BusinessName]. Text me what you need help with and we’ll get you scheduled. Reply STOP to opt out.”

3.6 Re-engagement (after 3–7 days, 1 attempt max)
“Hi {first_name}, this is [BusinessName] checking back—still need help with {service}? Reply YES and we’ll set it up. Reply STOP to opt out.”

4) STOP/HELP implementation spec (engineering)
4.1 Keywords
- STOP set (case-insensitive, trimmed): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO
- Optional START set (if you support re-subscribe): START, YES (only if you explicitly state it in policies)

4.2 Inbound handling behavior
On inbound message:
1) Normalize: uppercase, trim whitespace, remove punctuation.
2) If keyword in STOP set:
   - Mark recipient as opted_out=true in a global suppression table scoped to the client account.
   - Send confirmation: “You’re opted out of texts from [BusinessName]. No more messages will be sent. Reply HELP for help.”
   - Do not send any additional automated flow messages.
3) If keyword in HELP set:
   - Send: “[BusinessName] support: email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
4) Else process through normal AI qualification flow.

4.3 Outbound gating
Before every outbound send:
- Check suppression list. If opted_out=true => block send and log “blocked_opt_out”.

4.4 Consent + messaging audit log (minimum fields)
Store per lead/contact:
- phone_e164
- consent_status: opted_in / opted_out / unknown
- consent_timestamp_utc
- consent_source: webflow/typeform/meta/manual
- consent_text_version_id (hash of the exact snippet)
- lead_source_url or form_id
- ip_address (if available)
- user_agent (if available)
Store per message:
- direction (in/out)
- timestamp_utc
- body
- provider_message_id
- status (sent/delivered/failed/blocked_opt_out/queued_quiet_hours)

5) Quiet hours implementation spec (engineering)
Default policy (recommended): 8:00am–9:00pm recipient local time.

5.1 Timezone resolution order
1) If lead provides zip/address => geocode to timezone.
2) Else infer from area code (best-effort mapping).
3) Else fall back to client’s business timezone.

5.2 Behavior
- If outbound message is triggered during quiet hours: queue it for next allowed time (8:00am local).
- If multiple messages are queued: send only the latest “first touch” message to avoid flooding.
- Always allow immediate sends for explicit user replies (inbound message from lead can trigger an outbound response even during quiet hours, but keep it minimal and transactional).

5.3 DST
Use IANA timezone (e.g., America/Chicago) and compute local time with DST-aware library.

6) Twilio deliverability hardening (MVP)
- Use a Messaging Service (not ad-hoc numbers) to centralize settings and compliance.
- Enable Advanced Opt-Out (if available in your Twilio plan) OR enforce your own suppression logic as above.
- Avoid URL shorteners; use full domain URLs.
- Keep first message under ~240 characters.
- Monitor error codes and filtering signals; if you see frequent “undelivered” or carrier filtering, tighten content and confirm consent capture.

7) Agency go-live checklist (copy/paste)
1) Add the opt-in disclosure (Webflow/Typeform/Meta) and verify it is visible before submission.
2) Confirm phone numbers are collected in E.164 format (or normalized server-side).
3) Confirm Privacy/Terms links are live and correct (publish pages if needed).
4) Send a test lead submission and verify:
   - First SMS includes business identification + STOP/HELP.
   - Reply STOP => confirmation + no further messages.
   - Reply HELP => support instructions.
   - Submit lead at 10:30pm local => message queued for next morning.
5) Save screenshots of the opt-in disclosure and export one consent log row for compliance evidence.

Notes / minimal positioning for objections
“We’re TCPA/CTIA-aligned by design: explicit opt-in at capture, consent logging, STOP/HELP handling with global suppression, and quiet-hours queueing by recipient timezone. The system identifies the business in the first text and avoids spammy language patterns to reduce carrier filtering.”
