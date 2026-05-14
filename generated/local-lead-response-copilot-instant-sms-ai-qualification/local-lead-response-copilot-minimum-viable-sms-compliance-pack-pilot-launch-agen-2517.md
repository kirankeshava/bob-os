# Local Lead Response Copilot — Minimum‑Viable SMS Compliance Pack (Pilot Launch + Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T05:29:45.816Z

---

Purpose (wartime scope)
This is the minimum viable compliance + deliverability bundle required to (1) remove the most common sales objections, (2) prevent carrier/Twilio enforcement issues, and (3) safely run free pilots. It intentionally avoids heavy legal/process overhead.

Business legitimacy links (use everywhere)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

1) Opt‑in / consent language (copy/paste)
Goal: explicit consent to receive texts about the lead’s inquiry; disclose frequency, STOP/HELP, and link to privacy/terms.

A) Webflow form (under submit button)
“By submitting this form, you agree to receive text messages from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

B) Typeform (final screen / disclaimer)
“Consent: By providing your phone number, you agree to receive text messages from [BUSINESS NAME] related to your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

C) Meta/Facebook Lead Ads (custom disclaimer)
“By submitting, you consent to receive SMS from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

D) If lead source cannot show links (short version)
“By submitting, you consent to receive texts about your request. Msg & data rates may apply. Reply STOP to opt out.”
(Then ensure the FIRST SMS includes Privacy/Terms links.)

2) Message templates (compliant + deliverable)
Rules: no ALL CAPS, no excessive punctuation, no “free!!!”, no link shorteners, keep it conversational, include business identifier early.

Template 1 — First response (after lead submits)
“Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. Got your request for {{service}}. A couple quick questions so we can help: what’s the address or ZIP? Reply STOP to opt out.”

Template 2 — Qualification (2–3 short questions)
“Thanks. What day/time works best for an estimate—today, tomorrow, or later this week?”
“Any photos you can share of the issue? If not, no problem.”

Template 3 — Booking handoff
“Perfect. We can do {{slot_1}} or {{slot_2}}. Which do you prefer?”
(After selection)
“Booked for {{confirmed_time}}. If anything changes, reply here. Reply STOP to opt out.”

Template 4 — Missed call text-back
“Hi {{first_name}}, saw you tried calling {{business_name}}—can I help you book an estimate? What’s the best time today? Reply STOP to opt out.”

Template 5 — Re-engagement (1 attempt only)
“Hi {{first_name}}, checking in—do you still want help with {{service}}? If yes, tell me your ZIP and a good time. Reply STOP to opt out.”

3) STOP / HELP handling (implementation spec)
Goal: immediate compliance, global suppression, auditable logs.

Keywords
STOP keywords (case-insensitive, trim punctuation): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

Behavior
A) On inbound STOP keyword:
1. Immediately set contact.sms_status = “opted_out”
2. Add phone number to Global Suppression List (GSL) so it blocks all future outbound across all clients/workspaces unless manually removed.
3. Send confirmation (exact copy):
“You’re opted out and will no longer receive texts from {{business_name}}. Reply START to re-subscribe.”
4. Log event (see consent logging below).

B) On inbound HELP keyword:
Send:
“{{business_name}}: We use texts to follow up on your request. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to {{privacy_url}}”

C) On outbound attempt to a suppressed number:
Do not send. Record an audit log: blocked_reason = “opted_out”.

D) Optional START handling (only if you support re-subscribe)
If inbound START and previously opted_out, set sms_status = “active” and remove from GSL; then send:
“You’re re-subscribed. Reply STOP to opt out anytime.”

4) Quiet hours (timezone-based) — minimum spec
Policy (pilot-safe default)
Send messages only 8:00am–8:00pm lead-local time, 7 days/week.
If outside window: queue the message for next allowed time (8:05am local) and mark queued_reason = “quiet_hours”.

Timezone resolution order
1) Lead-provided ZIP → map to timezone
2) Lead state/city (if present)
3) Area code fallback
4) If unknown: default to business timezone, but still restrict to 9am–7pm to reduce risk

Edge cases
- DST: rely on IANA timezone names (e.g., America/Chicago).
- If user replies inbound during quiet hours: it is acceptable to process inbound, but outbound responses should still respect the window unless message is purely transactional/confirmation that they initiated (conservative approach: still queue).

5) Consent logging (auditable minimum schema)
Store per lead/contact:
- consent_status: active | opted_out | unknown
- consent_source: webflow | typeform | meta_lead_ads | manual | other
- consent_text_snapshot: exact opt-in disclaimer text shown
- consent_timestamp_utc
- consent_ip (if available)
- consent_page_url (landing/form URL)
- form_submission_id / lead_id
- last_stop_timestamp_utc
- last_help_timestamp_utc
- message_history pointers (message_sid, direction, timestamps)

6) Twilio deliverability hardening (minimum viable)
- Use a Twilio Messaging Service (not a single number hardcoded) to manage sender selection and compliance.
- Enable “Advanced Opt-Out” (or implement your own suppression list if not available).
- Do not use URL shorteners; use full domain links.
- Keep first message short, identify the business, and avoid “marketing” language.
- If using 10DLC long code at scale: be ready for A2P registration (Brand + Campaign) once pilots convert; for pilots, keep volume low and messaging strictly conversational/transactional.

7) Agency handoff (what to do in 30 minutes)
1) Pick lead source (Webflow/Typeform/Meta) and paste the opt-in snippet.
2) Ensure the first SMS template includes business identifier + STOP.
3) Confirm quiet hours policy with client (default 8am–8pm local).
4) Confirm where Privacy/Terms live; until published, include website link and support email in HELP message.
5) Go-live test:
   - Submit a test lead → verify first SMS arrives.
   - Reply HELP → verify help response.
   - Reply STOP → verify opt-out confirmation AND no further outbound can be sent.

If an agency needs proof of legitimacy, share:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

This pack is sufficient for pilots; deeper items (A2P campaign vetting, throughput tuning, multi-number pools, detailed legal review) can be deferred until paid conversions justify it.