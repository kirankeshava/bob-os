# Local Lead Response Copilot — Minimum‑Viable SMS Compliance & Deliverability Handoff (Agency Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:59:39.839Z

---

Purpose (MVP, wartime): This pack covers the minimum compliance + deliverability items needed to (1) prevent common carrier/Twilio enforcement issues, (2) remove sales objections during pilots, and (3) enable agencies to launch quickly without engineering work. Product legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Support: agent_bob_replit+lead-copilot@agentmail.to.

1) Non‑negotiables checklist (MVP)
- Explicit SMS consent at point of lead capture (checkbox or clear disclosure near submit).
- Identify the business in the first SMS.
- STOP/UNSUBSCRIBE support: immediately stop all future texts to that number.
- HELP support: return support contact + brief instructions.
- Quiet hours: don’t send marketing/automation texts late night; queue until morning.
- Consent logging: store proof of opt-in (timestamp, source, language shown, IP if available).

2) Copy/paste opt‑in language (use as written)
A) Webflow / website form (recommended with checkbox)
Checkbox label: “I agree to receive text messages about my request.”
Disclosure (small text under checkbox or submit): “By submitting, you agree to receive SMS from {BUSINESS_NAME} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy: {PRIVACY_URL} and Terms: {TERMS_URL}.”

B) Typeform
Add a required ‘Yes’ question before submit:
Question: “Do you agree to receive text messages about your request?” Options: Yes/No (required).
Description: “SMS from {BUSINESS_NAME}. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”

C) Meta/Facebook Lead Ads (primary text + disclaimer)
Primary text (short): “Request a quote. We’ll text to confirm details and schedule.”
Disclaimer/consent line (include in ‘Disclaimer’ field if available): “By submitting, you agree to receive SMS from {BUSINESS_NAME} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}.”

3) Compliant first-message templates (low spam risk)
Initial text (sent immediately after lead): “Hi {first_name} — this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. What’s the address (or zip) for the job?”
Required footer (append if not shown in opt-in UI): “Reply STOP to opt out, HELP for help.”

Qualification follow-up (1 question at a time): “Thanks. When are you looking to start — today, this week, or later?”
Booking: “Want to book a quick call? Reply 1 for the next available time today, or 2 for tomorrow.”
Missed-call text back: “Hi — we missed your call. This is {BUSINESS_NAME}. What service do you need help with?”
Re-engagement (after 48–72h, only if consent logged): “Checking in — do you still want help with {service}? Reply YES and we’ll get you scheduled. Reply STOP to opt out.”

4) STOP/HELP handling (implementation spec)
Keywords (case-insensitive; match whole word):
- STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- HELP set: HELP, INFO, SUPPORT
Behavior:
- If inbound matches STOP set: (a) add phone to Global Suppression List immediately, (b) respond once: “You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply START to resubscribe.” (c) block any future outbound until resubscribed.
- If inbound matches HELP set: respond: “{BUSINESS_NAME} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Msg & data rates may apply.”
- START/UNSTOP resubscribe (optional MVP): if inbound START/UNSTOP and you have prior opt-in evidence, remove from suppression and confirm: “You’re resubscribed. Reply STOP to opt out.”
Audit logging fields (minimum): phone_e164, event_type (opt_in/stop/help/outbound_blocked), timestamp_utc, lead_source (webflow/typeform/meta), consent_text_version, message_body, campaign_id (if any).

5) Quiet hours (MVP spec)
Default quiet hours window: 9:00pm–8:00am recipient local time.
Timezone resolution order:
1) Lead-provided state/zip → map to timezone
2) Business service area default timezone
3) If unknown: treat as business timezone and be conservative
Queueing:
- If message would send during quiet hours, queue for next 8:05am local time.
- If lead arrives during quiet hours, send one message at 8:05am: “Hi {first_name} — this is {BUSINESS_NAME}. Just saw your request. What service do you need help with?”
Emergency override (owner only): allow manual send (logged) for truly urgent cases.

6) Deliverability guardrails (MVP)
- Avoid ALL CAPS, excessive punctuation, shortened links, “FREE!!!”, “act now”, and repeated identical blasts.
- Keep first message under ~240 chars and personalized (first name + service).
- Include business name early.
- Use 1–2 questions max before offering booking.

7) Agency go-live checklist (60 minutes)
- Paste the correct opt-in snippet into the lead source (Webflow/Typeform/Meta).
- Ensure you collect: first name, phone, service needed, zip/address.
- Turn on STOP/HELP handling in the SMS inbound webhook/automation.
- Turn on quiet-hours queue.
- Run verification tests (below) and save logs.

8) Verification test matrix (quick)
- Send “HELP” from a test phone → confirm help response includes support email.
- Send “STOP” → confirm opt-out confirmation + outbound blocked after.
- Simulate lead at 10:30pm local → confirm queued to morning.
- Confirm consent log row exists for each test lead (source + timestamp + consent text version).

Notes: Replace {PRIVACY_URL} and {TERMS_URL} with the final published links once available. If a pilot asks ‘Are you compliant?’ agencies can point to the above opt-in language, STOP/HELP automation, quiet hours, and consent logging, plus the product site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 and support: agent_bob_replit+lead-copilot@agentmail.to.