# Local Lead Response Copilot — Minimum Viable SMS Compliance & Deliverability Pack (Agency + Engineering Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:54:16.696Z

---

Business legitimacy links (use in all agency/customer materials)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Goal (wartime/minimum viable): Remove the top objections that block pilots and keep messaging online:
1) explicit opt-in language, 2) STOP/HELP handling + suppression, 3) quiet hours, 4) basic consent logging, 5) safe message templates that avoid carrier filtering.

A) COPY/PASTE OPT-IN LANGUAGE (use ONE of these per source)

A1) Webflow / custom form checkbox (recommended)
Add a required checkbox + disclosure under phone field:
Checkbox label:
“I agree to receive text messages about my request.”
Disclosure text (small):
“By submitting, you agree to receive SMS from [BUSINESS NAME] about your inquiry, including appointment scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
Implementation note: Store a boolean field (sms_consent=true) and capture the exact disclosure text version (see Consent Logging).

A2) Typeform (field description under phone number + required yes/no)
Question: “Can we text you about your request?” (Yes/No, required)
Description:
“By selecting Yes, you consent to receive SMS from [BUSINESS NAME] about your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
If answer is No: do not send SMS; optionally send email instead.

A3) Meta/Facebook Lead Ads (form disclaimer)
In “Custom disclaimer” / privacy policy section:
“By submitting this form, you agree to receive text messages from [BUSINESS NAME] about your request, including scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
Operational note: Because Lead Ads may prefill phone, treat the lead form submission timestamp + lead_id as the consent event.

B) DEFAULT MESSAGE TEMPLATES (carrier-safe, low-spam)
Rules:
- Identify business early. Keep short. No ALL CAPS, no “FREE!!!”, no link shorteners, no excessive punctuation.
- Include STOP/HELP info at least in the first message of a new conversation (or in every 3–5 messages).

B1) First message (immediate speed-to-lead)
“Hi {first_name} — this is {biz_name}. Got your request for {service}. Quick question: what’s your address or ZIP so we can confirm availability? Reply STOP to opt out, HELP for help.”

B2) Qualification follow-up
“Thanks. What day/time works best for you — today, tomorrow, or later this week?”

B3) Booking confirmation
“Great — you’re booked for {day} at {time}. If anything changes, reply here or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

B4) Missed-call text back
“Hi — missed your call. This is {biz_name}. What can we help with? Reply STOP to opt out, HELP for help.”

B5) Re-engagement (one attempt)
“Just checking in — do you still need help with {service}? If yes, reply with your ZIP and best time. Reply STOP to opt out.”

C) STOP/HELP HANDLING (must implement)
C1) Keywords (case-insensitive, trim punctuation)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO

C2) Behavior
- On inbound STOP keyword:
  1) Immediately add phone number to global suppression list (tenant-scoped + optionally master suppression).
  2) Send ONE confirmation message:
     “You’re opted out and will no longer receive texts from {biz_name}. Reply HELP for help.”
  3) Block all future outbound messages to that number unless/until explicit re-consent is captured (new opt-in event).
- On inbound HELP keyword:
  Send:
  “{biz_name}: We text about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

C3) Edge cases
- If user sends STOP and later asks a question: do not respond by SMS; optionally send a single message instructing to re-opt-in via form (safer: no outbound at all after opt-out, except the confirmation + HELP response).
- If STOP arrives mid-flow, halt the AI qualification immediately.

D) QUIET HOURS (minimum viable)
Objective: Avoid messaging at night to reduce complaints and carrier scrutiny.
Default quiet hours window: 8:00pm–8:00am in the lead’s local timezone.

D1) Timezone resolution order
1) Lead-provided state/ZIP → map to timezone.
2) If form includes city/state, infer timezone.
3) Else use business timezone.
4) If unknown: treat as business timezone and apply quiet hours conservatively.

D2) Sending behavior
- If a message is triggered during quiet hours: queue it and send at 8:05am local time.
- If multiple queued messages exist: collapse to a single “morning check-in” message to avoid bursts.

D3) Emergency override (optional)
Admin flag “ignore_quiet_hours” for specific conversations only (default OFF). Log any override.

E) CONSENT LOGGING (minimum viable fields)
Store one immutable consent event per opt-in:
- lead_id
- phone_e164
- consent_source (webflow/typeform/fb_lead_ads/manual)
- consent_timestamp_utc
- consent_text_version (store the exact disclosure text shown)
- landing_page_url or form_id
- ip_address (if available)
- user_agent (if available)
- checkbox_value / yes-no value
- proof pointer (screenshot URL or platform lead_id)

Also store:
- opt_out_timestamp_utc
- opt_out_keyword (STOP/END/etc)
- opt_out_message_sid (if Twilio)

F) TWILIO DELIVERABILITY HARDENING (minimum viable)
- Use a Messaging Service (not direct from a single number) so you can:
  - attach A2P/10DLC campaign,
  - manage number pool,
  - centralize opt-outs.
- Enable “Advanced Opt-Out” (or equivalent) so STOP is enforced even if app misses a webhook.
- Avoid URL shorteners; use full domains.
- Keep first contact messages human, short, and directly tied to the user’s request.
- If scaling on long code (10DLC), complete A2P Brand + Campaign registration before volume ramps; otherwise expect filtering.

G) AGENCY GO-LIVE CHECKLIST (copy/paste)
1) Implement opt-in language (Section A) in the lead source.
2) Ensure the lead payload includes: first_name, phone, service, zip/city/state (for timezone), consent=true, consent_timestamp.
3) Confirm STOP/HELP works:
   - Text STOP → receive opt-out confirmation → no more texts.
   - Text HELP → receive help message.
4) Confirm quiet hours:
   - Trigger a lead at 9pm local → message is queued → sends after 8am.
5) Save proof:
   - Screenshot of form with opt-in disclosure.
   - Sample conversation log showing STOP confirmation.

If an agency needs compliance reassurance, share:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

Owner/Engineering open items to finalize:
- Confirm live Terms/Privacy URLs (publish pages) so all disclaimers point to permanent links.
- Confirm Twilio webhook endpoints used (Messaging vs Conversations) and wire STOP/HELP logic accordingly.
