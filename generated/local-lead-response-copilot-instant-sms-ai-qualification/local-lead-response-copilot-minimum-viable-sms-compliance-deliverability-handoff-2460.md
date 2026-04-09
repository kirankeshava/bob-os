# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Handoff (Agency + Engineering)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T21:30:57.349Z

---

Purpose
This handoff provides minimum-viable compliance + deliverability hardening for Local Lead Response Copilot (instant SMS + AI qualification + booking). Goal: prevent carrier blocks, reduce TCPA/CTIA objections, and make pilots safe to launch fast. Reference URL for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Support: agent_bob_replit+lead-copilot@agentmail.to.

1) Compliance Checklist (MV)
A. Consent capture is explicit (checkbox or clear disclosure near submit button). Not pre-checked.
B. Disclosure includes: “By submitting, you agree to receive texts… Msg & data rates may apply. Reply STOP to opt out, HELP for help.”
C. Link to Terms + Privacy (live URLs strongly preferred).
D. Every first outbound message includes business identifier + STOP instruction.
E. STOP handling is immediate and permanent until re-consent (global suppression list).
F. Quiet hours enforced by lead timezone (recommended 8am–8pm local). If unknown, default to business timezone.
G. Consent logging retained: timestamp, IP (if available), source (FB/Typeform/Webflow), form text shown, and phone.

2) Copy/Paste Opt‑In Snippets
2.1 Webflow (near phone field + submit)
“By clicking Submit, you agree that [Company Name] may contact you at the number provided by SMS/text messages to provide quotes, schedule service, and follow up on your request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

2.2 Typeform (add as statement before submit)
“Consent: By submitting this form, you agree to receive SMS/text messages from [Company Name] about your request. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

2.3 Meta/Facebook Lead Ads (custom disclaimer)
“By submitting, you consent to receive SMS texts from [Company Name] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

3) Compliant Message Templates (MV)
3.1 First message (immediate speed-to-lead)
“Hi {{first_name}}, this is {{business_name}}—got your request for {{service}}. A couple quick questions so we can help: what’s the address/ZIP for the job? Reply STOP to opt out.”

3.2 Qualification follow-up
“Thanks—when are you looking to get this done: today/tomorrow, this week, or later? Reply STOP to opt out.”

3.3 Booking CTA
“Perfect. Want to book a quick call or an on-site estimate? Reply 1 for call, 2 for on-site. Reply STOP to opt out.”

3.4 Missed-call text back
“Sorry we missed you—this is {{business_name}}. Are you looking for help with {{service}}? Reply with a good time today. Reply STOP to opt out.”

3.5 Re-engagement (low frequency)
“Hi {{first_name}}—checking in from {{business_name}}. Do you still need help with {{service}}? Reply YES or NO. Reply STOP to opt out.”

Content guardrails (deliverability)
- Avoid: “free”, “guaranteed”, “act now”, excessive caps, excessive punctuation, shortened links, and repeated identical messages.
- Include business identifier early.
- Keep to 1 link max; prefer branded domain when available.

4) STOP/HELP Handling — Engineering Spec (Twilio-style)
Keywords
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT.
- HELP set: HELP, INFO.
Processing rules
1. Normalize inbound body: trim, uppercase, remove punctuation.
2. If body matches STOP set:
   a) Add phone (E.164) to global suppression list immediately.
   b) Log event: type=STOP, timestamp, messageSid, from, to, source.
   c) Send confirmation once: “You’re opted out from {{business_name}} texts. No more messages. Reply START to opt back in.”
   d) Block all future outbound messages to suppressed numbers (hard fail with log).
3. If body matches HELP set:
   a) Do not change suppression.
   b) Reply: “{{business_name}}: For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
4. Optional START handling (only if you support re-consent): require explicit re-consent record OR treat START as re-opt-in and log type=START.

Data model (minimum)
- consent_log: {phone, consent_status (opted_in/opted_out), consent_source, consent_text_hash, timestamp, ip(optional), form_url(optional)}
- message_log: {direction(in/out), phone_from, phone_to, body, provider_id, status, timestamp}
- suppression_list: {phone, reason(STOP), timestamp, last_message_id}

Verification test matrix (run in staging)
- Inbound “STOP” ⇒ suppression created + confirm message sent.
- After STOP: any outbound attempt ⇒ blocked + logged.
- Inbound “HELP” ⇒ help message returns.
- Inbound “stop ” / “Stop.” ⇒ still triggers.

5) Quiet Hours by Timezone — Implementation Spec
Default policy
- Allowed send window: 08:00–20:00 lead local time (configurable per customer).
Timezone resolution order
1) Lead-provided ZIP/postal code ⇒ map to timezone.
2) Lead-provided city/state ⇒ timezone.
3) Area code inference (best-effort) ⇒ timezone.
4) Fallback: customer business timezone.
Behavior
- If message is scheduled outside allowed window: queue to next allowed time.
- Queue must preserve ordering per lead.
- DST: use IANA timezones (e.g., America/Chicago) not fixed offsets.
Overrides
- Manual human send override allowed (with audit log) if lead explicitly requests after-hours.

6) Agency Go‑Live Checklist (Copy/Paste)
1) Add opt-in snippet to the lead form/ad and ensure it’s visible near submit.
2) Ensure you collect: phone, first name, service needed, ZIP/address (for timezone).
3) Confirm Terms/Privacy URLs are live and match the snippet.
4) Confirm STOP/HELP handling is enabled and tested using the matrix above.
5) Confirm quiet hours are set (8am–8pm lead local) and queueing works.
6) Send yourself a test lead from the live form/ad and verify: first SMS includes business name + STOP.

Sales objection rebuttal (for proposals)
“We capture explicit SMS consent at the form/ad level with STOP/HELP disclosures and log the consent record (timestamp + source). Every conversation supports automatic STOP/HELP handling and a global suppression list. We also enforce quiet hours based on lead timezone and use deliverability-safe templates to reduce carrier filtering.”
