# Local Lead Response Copilot — MVP Compliance + Deliverability Handoff (Copy/Paste + STOP/HELP + Quiet Hours + Go‑Live Checklist)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:47:15.177Z

---

This document is the **minimum viable compliance + deliverability** package to launch pilots safely (reduce carrier enforcement risk, reduce agency objections) without overbuilding.

Business legitimacy links (use everywhere):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

========================
1) MVP COMPLIANCE CHECKLIST (what must be true before sending)
========================
A. Consent capture (TCPA/CTIA-aligned)
- Lead form must include **explicit disclosure** that the prospect agrees to receive texts.
- Disclosure must name the business/brand (or “the business you’re contacting”) and include: “Msg & data rates may apply”, frequency, and “Reply STOP to opt out, HELP for help.”
- Consent must be logged with timestamp + source + form/ad identifier.

B. STOP/HELP handling (must work even if AI is down)
- Any inbound STOP-like keyword triggers immediate opt-out confirmation and adds number to a **global suppression list**.
- Any inbound HELP keyword triggers a help message with support email + opt-out instructions.
- Suppressed numbers must never be messaged again unless they re-opt-in (new consent event).

C. Quiet hours guardrail
- Do not send marketing/lead follow-up texts outside local quiet hours. MVP recommended window: **8:00am–8:00pm lead local time**.
- If lead comes in during quiet hours: queue the first message for next allowed window.

D. Content guardrails (deliverability)
- Keep first message short, conversational, and clearly tied to the lead’s request.
- Avoid spam triggers: excessive caps, repeated emojis, “FREE!!!”, URL shorteners, misleading claims.
- Include business identifier and a context anchor (“you requested a quote/estimate”).

========================
2) COPY/PASTE OPT-IN SNIPPETS (Webflow / Typeform / Meta Lead Ads)
========================
IMPORTANT: Replace [BUSINESS NAME] and (if available) [PRIVACY_URL] + [TERMS_URL]. If you don’t have published URLs yet, link to the website above for now.

2.1 Webflow / Website Form Consent Checkbox (recommended)
Label (checkbox required):
“I agree to receive text messages from [BUSINESS NAME] about my request.”

Disclosure text below checkbox (small text):
“By submitting, you consent to receive SMS messages about your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. See Privacy: [PRIVACY_URL] and Terms: [TERMS_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

Field requirement:
- Phone number field must be required for SMS follow-up.

2.2 Typeform Consent (add as a statement + checkbox)
Statement:
“Text updates: If you provide a phone number, we may text you about your request.”

Checkbox (required):
“I agree to receive text messages from [BUSINESS NAME].”

Footer disclosure:
“Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

2.3 Meta/Facebook Lead Ads (use disclaimer/custom question)
Add a custom question or disclaimer text:
“By submitting this form, you agree to receive SMS messages from [BUSINESS NAME] regarding your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].”

========================
3) FIRST MESSAGE + QUALIFICATION TEMPLATES (deliverability-safe)
========================
3.1 First text (send immediately within allowed hours)
“Hi {first_name} — this is {agent_name} with [BUSINESS NAME]. Got your request for {service}. What’s the address (or zip code) for the job?”

3.2 If no name
“Hi — this is {agent_name} with [BUSINESS NAME]. You just requested info about {service}. What’s the address or zip code?”

3.3 Qualification (keep to 2–4 questions max)
Q1: “When are you looking to start — ASAP, this week, or later?”
Q2: “Any photos you can share? If yes, reply with 1–3 pics.”
Q3 (optional): “What’s a good time today for a quick call — morning/afternoon/evening?”

3.4 Booking handoff (if using a scheduler link)
“Perfect — want to lock a time? Here’s the calendar: {booking_link}. If you’d rather, reply with 2 times that work and I’ll confirm.”

3.5 Missed call text-back
“Hi {first_name} — sorry we missed you. This is [BUSINESS NAME]. Are you calling about {service}? Reply 1) New quote 2) Existing job 3) Other”

(Include STOP/HELP in later messages if you need, but do not bloat every message; the opt-in disclosure covers it. STOP/HELP must always function.)

========================
4) STOP/HELP IMPLEMENTATION (Twilio-ready behavior)
========================
4.1 Keyword matching (case-insensitive, trim punctuation)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

4.2 On inbound STOP (any STOP keyword)
System actions:
1) Add phone number to GlobalSuppressionList with reason=“STOP”, timestamp, source=“sms_inbound”.
2) Immediately respond (single message):
“You’re opted out and will no longer receive texts from [BUSINESS NAME]. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
3) Mark any open conversation as status=“do_not_contact”.
4) Block all future outbound to this number unless a new consent event occurs (or START keyword if you support it).

4.3 On inbound HELP
Respond:
“Help: You’re receiving messages because you requested info from [BUSINESS NAME]. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

4.4 START handling (optional but recommended)
If inbound START:
- If previously suppressed, remove from suppression list ONLY if you can associate this as explicit re-opt-in.
- Reply: “You’re resubscribed. Reply STOP to opt out.”

4.5 Audit logging (minimum fields)
Store for each inbound message:
- lead_id (if known), phone_e164, message_body, received_at_utc, provider_message_sid, keyword_detected, action_taken (opt_out/help/none), suppression_state_after

========================
5) QUIET HOURS SPEC (MVP)
========================
Default allowed window: 08:00–20:00 in lead local time.

Timezone resolution order:
1) Lead-provided address/zip -> map to timezone.
2) Area code inference (fallback).
3) Business timezone as last resort.

Behavior:
- If lead arrives outside window: queue first message for next 08:00 local.
- If queued, send immediately at start of window.
- If timezone unknown: treat as business timezone and stay conservative.
- Always allow manual human override (owner sending) but still warn if outside window.

========================
6) AGENCY “GO-LIVE IN 30 MINUTES” CHECKLIST
========================
Step 1 — Update the lead form
- Add the consent checkbox + disclosure (Section 2).
- Make phone required.

Step 2 — Confirm data passed into Copilot
- Must pass: first name (if available), phone, service requested, and lead source.

Step 3 — Turn on STOP/HELP handling
- Verify suppression list exists.
- Verify inbound keyword triggers the correct auto-reply.

Step 4 — Turn on quiet hours
- Set allowed window 8am–8pm.
- Confirm queue behavior works.

Step 5 — Run verification (5-minute test)
From your own phone:
1) Submit the form with your phone number during allowed hours -> confirm first message arrives.
2) Reply “HELP” -> confirm help response.
3) Reply “STOP” -> confirm opt-out confirmation.
4) Trigger another outbound attempt -> confirm it is blocked/suppressed.
5) Submit a lead during quiet hours -> confirm message is queued.

Support and legitimacy for prospects:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Email: agent_bob_replit+lead-copilot@agentmail.to

If any item above fails, do not launch paid traffic; fix STOP/HELP + opt-in first (these are the most common causes of carrier complaints and account issues).