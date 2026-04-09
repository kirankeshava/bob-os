# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Pack (Pilot Launch / Agency Copy-Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T21:24:33.515Z

---

Purpose (wartime / minimum viable): This pack covers only what removes sales objections and prevents common SMS account issues during pilots: (1) explicit opt-in language, (2) STOP/HELP handling + suppression, (3) quiet hours, (4) consent logging, (5) deliverability guardrails. Business legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Support email: agent_bob_replit+lead-copilot@agentmail.to.

1) Opt-in / consent language (copy-paste)
A) Webflow / website form checkbox (recommended)
Checkbox label (unchecked by default): “I agree to receive text messages about my request from [BUSINESS NAME] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Below checkbox small text: “By submitting, you agree to our Terms and Privacy: [TERMS_URL] | [PRIVACY_URL].”
Hidden fields to store: lead_source, page_url, form_name, checkbox_value=true.

B) Typeform (use statement + required Yes)
Add statement: “By continuing, you consent to receive texts from [BUSINESS NAME] about your request at the number provided. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Add required question: “Do you agree to receive text messages about this request?” Yes/No (must be Yes to submit).

C) Meta/Facebook Lead Ads (intro + custom question)
Intro text: “By submitting, you agree to receive text messages from [BUSINESS NAME] about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Add custom question (multiple choice): “SMS consent” → “I agree” / “I do not agree” (route “I do not agree” to thank-you screen without SMS follow-up).

2) First message templates (compliant defaults)
Initial response (send immediately):
“Hi {first_name}, it’s {agent_name} with {business_name}. Got your request for {service}. What’s the address (or ZIP) for the job? Reply STOP to opt out, HELP for help.”
If no response after 5 minutes (one follow-up):
“Just making sure I’m helping the right person—what’s the best time today for a quick call or estimate? STOP to opt out.”
Booking confirmation:
“Confirmed: {date} at {time}. Reply YES to confirm or reply RESCHEDULE to pick a new time. STOP to opt out.”
Missed-call textback (if phone call missed):
“Sorry we missed you—this is {business_name}. What’s the best time to call you back? STOP to opt out.”
Re-engagement (one attempt after 48–72h):
“Still need help with {service}? Reply 1) Yes 2) Not anymore. STOP to opt out.”

3) STOP / HELP handling (implementation spec)
Keyword matching (case-insensitive, trim punctuation/whitespace). STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT. HELP keywords: HELP, INFO, SUPPORT.
Behavior:
- On STOP keyword: immediately set lead.sms_opt_out=true; write suppression record (phone_number, timestamp, keyword, message_sid, source). Send confirmation: “You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe.”
- Block all future outbound to suppressed numbers across all campaigns/clients (global suppression list). Do not send additional messages after confirmation.
- On HELP keyword (even if opted-out): respond with: “{business_name} support: agent_bob_replit+lead-copilot@agentmail.to. You can reply STOP to opt out. Message & data rates may apply.”
- START keyword (optional): if received after STOP, set sms_opt_out=false only if your policy allows re-opt-in via text; log reconsent_event with timestamp and message_sid.
Audit logging required fields per inbound: phone_number, message_body, received_at_utc, provider (Twilio), message_sid, matched_intent (STOP/HELP/OTHER), action_taken, campaign_id/tenant_id.

4) Quiet hours (implementation spec)
Default quiet hours: do not send outbound messages between 8:00 PM and 8:00 AM recipient local time.
Timezone resolution order:
1) Explicit timezone stored on lead record (if collected).
2) Infer from lead ZIP/postal code (US) → timezone lookup.
3) Infer from area code (fallback, less reliable).
4) If unknown, assume business local timezone and apply conservative window (9:00 AM–6:00 PM).
Queued send behavior:
- If a message would send during quiet hours, queue it for next allowed time (next day 8:05 AM local).
- Preserve ordering: queued messages must send in original sequence.
Overrides:
- Manual user-initiated send in UI may override quiet hours only if user checks “Send now” (log override_reason).
- Transactional confirmations for appointments created by the lead (e.g., they replied and booked) may bypass quiet hours if policy allows; otherwise queue.

5) Consent logging (minimum required)
Store a “consent artifact” per lead:
- consent_status: opted_in/opted_out
- consent_timestamp_utc
- consent_source: webflow/typeform/facebook/phone_call/manual
- consent_text_version: hash or version id of the exact opt-in language used
- landing_page_url/form_id
- ip_address (if available)
- proof_field: checkbox=true or meta_lead_form_answer="I agree"
- opt_out_timestamp_utc (if applicable)

6) Deliverability guardrails (pilot-safe)
Content:
- Avoid ALL CAPS, excessive punctuation, “FREE!!!”, “act now”, “limited time”, and link shorteners.
- Keep URLs consistent with your brand domain when possible; avoid many links. Prefer 0–1 link per message.
- Identify the business in the first text (carrier trust).
- Keep message length < 320 chars when possible.
Frequency:
- Cap to 1 immediate + 1 follow-up within first 10 minutes; max 3 total in 24 hours unless recipient is actively responding.
- Stop messaging if no response after last follow-up; wait 48–72h before re-engagement.
Twilio configuration (no spend assumptions):
- Use a Twilio Messaging Service (not direct-from-number) to support pooling, sticky sender, and compliance features.
- Enable message status callbacks and log delivery errors.
A2P 10DLC readiness checklist (for when scaling):
- Business identity details ready (legal name, EIN if applicable, address, website, privacy/terms URLs).
- Clear opt-in language and proof fields (above).
- Campaign use case: “Customer care / lead follow-up” with sample messages from this pack.

7) 10-minute verification checklist (agency / pilot)
1) Submit a test lead with SMS consent checked.
2) Confirm first message includes business name + STOP/HELP.
3) Reply HELP → confirm help response includes support email.
4) Reply STOP → confirm opt-out confirmation and that further outbound is blocked.
5) Test after-hours lead → confirm message is queued to next morning (local time).
6) Confirm consent artifact stored on lead (timestamp, source, text version).

If any step fails, pause outbound and contact support: agent_bob_replit+lead-copilot@agentmail.to with lead phone number + timestamp + channel (Webflow/Typeform/FB).