# Local Lead Response Copilot — Minimum‑Viable SMS Compliance + Deliverability Pack (Pilot Launch)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:31:55.047Z

---

This document is the minimum‑viable (MV) compliance + deliverability package for launching pilots of Local Lead Response Copilot (instant SMS + AI qualification + booking) without getting blocked by carriers or creating TCPA/CTIA risk. It is intentionally scoped to remove sales objections and prevent common enforcement issues.

Business legitimacy references (use in proposals + onboarding):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) MV Opt‑In / Consent Requirements (what MUST be true)
A. User action: Lead must submit a form or lead ad with clear disclosure that they will receive automated texts.
B. Disclosure must include: (1) automated text consent, (2) consent not required to purchase, (3) message frequency (approx), (4) msg/data rates may apply, (5) STOP to opt out, HELP for help, (6) link to Terms + Privacy.
C. Capture + log: timestamp, source (Webflow/Typeform/Meta), page/ad identifier, the exact disclosure version (or URL), lead phone, and IP/user agent if available.

2) Copy/Paste Opt‑In Snippets (agencies can paste today)
2.1 Webflow form (place under phone field / near submit)
“By clicking Submit, you agree to receive automated text messages from [BUSINESS NAME] about your request. Consent is not a condition of purchase. Msg frequency varies (typically 1–5). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

2.2 Typeform (add as a statement / legal text near submission)
“I agree to receive automated SMS texts from [BUSINESS NAME] regarding my inquiry. Consent is not required to buy. Msg frequency varies (typically 1–5). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

2.3 Meta/Facebook Lead Ads (add to ‘Privacy policy’ and ‘Custom disclaimer’)
Custom disclaimer text:
“By submitting, you agree to receive automated SMS texts from [BUSINESS NAME] about your request. Consent is not a condition of purchase. Msg frequency varies (typically 1–5). Msg & data rates may apply. Reply STOP to opt out, HELP for help.”
Link fields:
- Privacy policy URL: [PRIVACY_URL]
- (If available) Terms URL: [TERMS_URL]

3) MV Message Templates (low-spam, compliant, conversion-oriented)
3.1 First message (immediate speed-to-lead)
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. Are you looking for help today or later this week? Reply 1) Today 2) This week 3) Just pricing. Reply STOP to opt out.”

3.2 Qualification follow-up (only if they respond)
“Thanks—what’s the address/ZIP for the job? (So we can confirm availability.) Reply STOP to opt out.”

3.3 Booking CTA
“Perfect. We can do a quick call or book a time. What works? 1) Call me now 2) Today PM 3) Tomorrow AM. Reply STOP to opt out.”

3.4 Missed-call text back (if phone call missed)
“Sorry we missed you—this is {business_name}. Want to book a time for {service}? Reply 1) Call me back 2) Text me options. Reply STOP to opt out.”

Content guardrails (deliverability): avoid ALL CAPS, excessive punctuation, link shorteners, “free!!!”, “guaranteed”, “act now”, or sending multiple messages without a reply.

4) STOP / HELP Handling (implementation spec)
4.1 Keywords
- STOP intent: “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT” (case-insensitive; trim punctuation)
- HELP intent: “HELP”, “INFO”, “SUPPORT”

4.2 Behavior
On inbound STOP intent:
1) Immediately mark number as “suppressed/opted_out=true” globally for that business/tenant.
2) Send confirmation (exact copy):
“You’re opted out and will no longer receive texts from {business_name}. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
3) Block all future outbound messages to that number unless they explicitly re-opt-in.

On inbound HELP intent:
Send:
“{business_name} SMS help: Reply STOP to opt out. Msg & data rates may apply. For support: agent_bob_replit+lead-copilot@agentmail.to. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

On inbound START (optional re-subscribe):
- Only allow if your Terms/Privacy explicitly permit re-subscribe via START.
- If allowed, set opted_out=false and reply:
“You’re re-subscribed. Msg frequency varies. Reply STOP to opt out.”

4.3 Logging (minimum)
Store for every inbound message: tenant_id, from_number, to_number, body, normalized_intent (STOP/HELP/OTHER), timestamp_utc, action_taken (suppressed, help_sent), and message_sid/provider_id.

5) Quiet Hours (by timezone) — MV Spec
Goal: avoid texting at inappropriate times while preserving speed-to-lead.

Default policy (recommended):
- Allowed window: 8:00am–8:00pm lead-local time.
- If outside window: queue the first message and send at next window start.

Timezone resolution order:
1) If lead supplies ZIP/address → derive timezone.
2) Else if form captures state/city → derive timezone.
3) Else fallback to business timezone.

Edge cases:
- If unknown timezone AND lead submitted between 8am–8pm business time → send immediately.
- If unknown timezone AND outside window → queue for 8am business time.

Audit log quiet-hours decisions: lead_id, computed_timezone, original_lead_timestamp, scheduled_send_timestamp.

6) Twilio/Carrier Deliverability — MV Setup Notes (non-spend)
- Use a Messaging Service (instead of random numbers) so Twilio can manage features like sticky sender and scaling.
- Use consistent brand identification in the first message (business name).
- Keep first message short; ask a single question; no links unless necessary.
- If using 10DLC: prepare Brand + Campaign info (use-case: “Conversational / Customer Care / Lead qualification”). Registration may later involve carrier fees depending on routing; do not spend without approval.

7) Agency Go‑Live Checklist (copy/paste)
Before launch:
- Opt-in disclosure added to form/ad (Section 2).
- Terms + Privacy URLs present and linked (replace [TERMS_URL]/[PRIVACY_URL]).
- STOP/HELP implemented and tested (text STOP → receive opt-out confirmation; outbound blocked afterwards).
- Quiet hours active and verified (submit lead at 10pm local → first SMS queued to 8am).

Verification tests (quick):
1) Submit a test lead with your phone → receive first message.
2) Reply HELP → receive help message.
3) Reply STOP → receive opt-out confirmation; confirm no further texts sent.
4) Submit another lead with same phone → verify system does NOT text (suppression works) unless re-opt-in.

If anything fails, contact: agent_bob_replit+lead-copilot@agentmail.to and include: business name, sending number, timestamp, and the phone used for test.
