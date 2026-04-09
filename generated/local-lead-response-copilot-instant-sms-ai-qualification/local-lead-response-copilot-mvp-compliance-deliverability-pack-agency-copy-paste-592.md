# Local Lead Response Copilot — MVP Compliance + Deliverability Pack (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:31:24.861Z

---

Business legitimacy link (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

GOAL (MVP): Remove pilot blockers fast. Must-have: (1) explicit SMS consent language at the lead capture point, (2) STOP/HELP handling + suppression, (3) quiet hours, (4) consent logging.

1) AGENCY OPT-IN SNIPPETS (COPY/PASTE)

A) Webflow / Website Form Checkbox (recommended)
Label text (checkbox required):
“I agree to receive text messages (SMS) from [BUSINESS NAME] about my inquiry, including appointment scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to cancel, HELP for help.”
Under form (small text):
“By submitting, you confirm you are the subscriber/owner of this number and consent to receive texts. Terms: [TERMS_URL] • Privacy: [PRIVACY_URL]”
Implementation notes:
- Use an unchecked checkbox by default (no pre-check).
- Log checkbox value + timestamp + page URL.

B) Typeform (ending screen / legal text)
Add to form description or ending screen:
“By submitting, you consent to receive SMS from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Implementation notes:
- Add a required “I agree” statement field if possible.
- Capture source=typeform and form_id in your lead payload.

C) Meta/Facebook Lead Ads (follow-up + disclaimer)
In the Lead Form “Disclaimer” / “Custom Disclaimer”:
“By submitting, you agree to receive text messages from [BUSINESS NAME] regarding your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Implementation notes:
- Ensure your first outbound message references the lead’s request and business name.

2) MESSAGE TEMPLATES (MVP-SAFE)

A) First message (immediate)
“Hi {first_name}, this is {business_name}. Thanks for requesting {service}. Are you looking to get this done in the next (A) 0–7 days, (B) 1–4 weeks, or (C) just researching? Reply A/B/C. Reply STOP to opt out.”

B) Qualification follow-up
“Got it—what’s the address/ZIP where you need {service}? Reply with ZIP (or full address). Reply STOP to opt out.”

C) Booking handoff (human or calendar)
“Thanks. Want to book a quick call? Reply 1 for a call today, 2 for tomorrow, or share a good time window. Reply STOP to opt out.”

D) HELP response (auto)
“{business_name}: You’re receiving texts because you requested info on our site/ads. For help email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

E) STOP confirmation (auto)
“{business_name}: You’re opted out and will no longer receive texts. Reply START to re-subscribe.”

3) STOP/HELP IMPLEMENTATION SPEC (ENGINEERING)

Keywords (case-insensitive, trim punctuation/whitespace):
- STOP commands: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP commands: HELP, INFO
- Re-subscribe: START, YES, UNSTOP

Behavior:
A) On inbound message:
1. Normalize body: uppercase; remove leading/trailing whitespace; collapse multiple spaces; strip common punctuation.
2. If body matches STOP keyword:
   - Add phone E.164 to GlobalSuppressionList with reason=USER_STOP, timestamp.
   - Log event: type=STOP, provider_message_sid, from, to, body_raw, body_norm, campaign/service_id, lead_id (if found).
   - Send STOP confirmation message (template E) once.
   - Block all future outbound to that number unless re-subscribed.
3. If body matches HELP keyword:
   - Send HELP response (template D).
   - Log event type=HELP.
4. If body matches START/YES/UNSTOP:
   - Remove from GlobalSuppressionList (or set status=RESUBSCRIBED).
   - Send confirmation: “{business_name}: You’re re-subscribed. Reply STOP to opt out.”
   - Log event type=START.

Outbound guardrail:
- Before sending ANY SMS: check GlobalSuppressionList. If suppressed, do not send; log blocked_outbound.

Twilio webhook mapping (typical):
- Inbound SMS hits /sms/inbound with fields: From, To, Body, MessageSid.
- Respond with TwiML or send async via API; ensure STOP/HELP responses return 200 fast.

4) QUIET HOURS SPEC (MVP)

Objective: Don’t text leads during local night hours unless explicitly permitted.

Default quiet window (recommended):
- No outbound between 9:00 PM and 8:00 AM lead-local time.

Timezone resolution order:
1) If lead has explicit timezone stored (from form), use it.
2) Else if lead has ZIP/address, derive timezone via lookup.
3) Else infer from area code (best-effort).
4) Else fallback to business timezone.

Send scheduling logic:
- If an outbound would occur in quiet hours, queue it for next allowed time (8:05 AM lead-local) and log queued_due_to_quiet_hours.
- If lead replies inbound during quiet hours, you may send a single transactional response acknowledging receipt:
  “Thanks—got it. We’ll follow up in the morning. Reply STOP to opt out.”

Override rules (MVP):
- Admin toggle per account: allow_after_hours=false by default.
- If allow_after_hours=true, still block 11PM–7AM local.

5) CONSENT LOGGING (MVP DATA SCHEMA)

Store per lead:
- consent_sms: true/false
- consent_timestamp_utc
- consent_source: webflow/typeform/meta/manual
- consent_text_version (hash or version id)
- form_url/page_url
- ip_address (if available)
- user_agent (if available)
- legal_links: terms_url, privacy_url values at time of consent

Store per message:
- direction (inbound/outbound)
- from_e164 / to_e164
- body_raw
- template_id (if outbound)
- timestamp_utc
- provider (twilio)
- provider_message_sid
- delivery_status (queued/sent/delivered/failed)
- blocked_reason (suppressed/quiet_hours/no_consent)

6) DELIVERABILITY GUIDELINES (MVP)

Content:
- Always include business name in first message.
- Avoid URL shorteners; prefer full branded domain when available.
- Avoid “FREE!!!”, “Act now”, excessive caps, repeated punctuation.
- Keep messages short; 1 CTA per message.

Sending behavior:
- Reply fast to inbound (reduces carrier suspicion).
- Keep initial sequence to 1–3 messages max unless lead engages.
- If no engagement after 2–3 attempts, stop.

7) GO-LIVE CHECKLIST (AGENCY)

Before turning on SMS:
- Add opt-in language to lead form (one of the snippets above).
- Confirm fields captured: first name, phone, service, location (ZIP).
- Confirm legal links: Terms + Privacy live (replace [TERMS_URL]/[PRIVACY_URL]).
- Confirm STOP/HELP works in a test number.

Verification (10 minutes):
1) Submit a test lead; confirm first message arrives.
2) Reply HELP; confirm HELP response.
3) Reply STOP; confirm opt-out confirmation.
4) Trigger another outbound; verify it is blocked.
5) Reply START; verify re-subscribe and outbound allowed.

If anything fails: email agent_bob_replit+lead-copilot@agentmail.to with the phone number used, timestamps, and (if Twilio) MessageSid values.
