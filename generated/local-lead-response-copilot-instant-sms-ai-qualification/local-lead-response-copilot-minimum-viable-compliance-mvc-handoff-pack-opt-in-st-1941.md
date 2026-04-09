# Local Lead Response Copilot — Minimum Viable Compliance (MVC) Handoff Pack (Opt‑In + STOP/HELP + Quiet Hours + Consent Logging)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:53:31.964Z

---

Purpose (wartime MVC)
This pack covers only the minimum needed to (1) remove common compliance objections during pilots, (2) prevent account enforcement/blocks, and (3) keep deliverability stable. Scope is intentionally narrow: Opt‑in language, STOP/HELP handling, quiet hours, and consent logging.

Business legitimacy references (include in agency communications)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) MVC OPT‑IN LANGUAGE (copy/paste)

A) Webflow / Website form checkbox + microcopy
Checkbox label (recommended):
“I agree to receive text messages about my request.” (required)

Under-submit disclosure (small text):
“By submitting this form, you consent to receive SMS messages from [Business Name] about your request, including appointment scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy Policy and Terms: [PASTE LINKS].”

Hidden fields to capture (minimum):
- phone
- consent_checkbox = true/false
- consent_timestamp (UTC)
- consent_source = “webflow_form”
- page_url
- ip_address (if available)
- user_agent (if available)

B) Typeform
Add a required “Statement” + required Yes/No question.
Statement:
“Consent to SMS: We can text you about your request (scheduling/updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Question (required):
“Do you agree to receive text messages about your request?”
Choices: Yes / No
If No → still accept lead, but DO NOT text.

C) Meta/Facebook Lead Ads (recommended text)
In the “Privacy policy” and “Custom disclaimer” area:
“By submitting, you agree that [Business Name] may contact you by SMS about your request (appointment scheduling and service updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy/Terms: [PASTE LINKS].”

2) MVC MESSAGE TEMPLATES (carrier-safe)

Template 1 — First response (immediate)
“Hi {first_name}, this is {agent_name} with {business_name}. Got your request for {service}. Are you looking to get this done in the next (A) 0–7 days, (B) 1–4 weeks, or (C) just researching? Reply A, B, or C. Reply STOP to opt out.”

Template 2 — Qualification follow-up
“Thanks—what’s the address or ZIP where the work is needed? Reply with ZIP/address. Reply STOP to opt out.”

Template 3 — Booking (handoff to call)
“Great. Want to book a quick call? Reply 1 for the next available time today, or 2 for tomorrow. Reply STOP to opt out.”

Template 4 — HELP response
“Help: You’re receiving texts because you requested info from {business_name}. Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

Content guardrails (MVC)
- Avoid ALL CAPS, excessive punctuation, “FREE!!!”, “act now”, link shorteners, and heavy link usage.
- Keep first message under ~300 chars; include business identifier.
- Include “Reply STOP to opt out” at least in the first message and any campaign-style re-engagement.

3) STOP/HELP HANDLING (MVC implementation spec)

Keywords to detect (case-insensitive, trim whitespace, strip punctuation):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP, INFO

STOP behavior (required)
1) On inbound message matching STOP keywords:
   - Mark contact as “sms_opted_out=true” immediately.
   - Add phone to a Global Suppression List (tenant-level or system-wide).
   - Send ONE confirmation message:
     “You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe.”
   - Log event: {phone, keyword, timestamp_utc, source, message_sid/provider_id}.

2) Outbound enforcement:
   - Before any send, check suppression list. If suppressed, block send and log “blocked_due_to_optout”.

HELP behavior (required)
- Reply with the HELP template above.
- Do not change opt-in status.

START behavior (optional but recommended)
- If inbound is START/UNSTOP and there is prior opt-in evidence (checkbox/lead ad consent), allow resubscribe and send:
  “You’re resubscribed. Msg frequency varies. Reply STOP to opt out.”
- If no opt-in evidence exists, do NOT resubscribe automatically; route to human or ask to confirm consent.

4) QUIET HOURS (MVC)

Goal
Avoid sending texts during late-night hours in the lead’s local timezone.

Default quiet window
- 9:00 PM to 8:00 AM (lead local time)

Timezone resolution order (MVC)
1) Explicit lead timezone captured from form/CRM (if available)
2) Area code to timezone mapping (best-effort)
3) Business timezone fallback (configured per account)

Behavior
- If a message is triggered during quiet hours: queue it for next allowed send time (8:05 AM local).
- If multiple messages are queued, send in order with at least 30 seconds spacing.
- Log: {queued_at, scheduled_for, sent_at, lead_timezone_source}.

Edge cases
- Unknown timezone: use business timezone and queue if within quiet window.
- DST: rely on IANA tz database (e.g., America/Chicago).

5) CONSENT LOGGING (MVC schema)
Store the following per lead (minimum):
- phone (E.164)
- consent_status: opted_in / opted_out / unknown
- consent_source: webflow_form / typeform / fb_lead_ad / manual
- consent_text_snapshot: the exact disclosure shown at time of capture (string)
- consent_timestamp_utc
- page_url (or lead ad id)
- ip_address (if available)
- user_agent (if available)
- optout_timestamp_utc (if applicable)
- optout_keyword (if applicable)

6) AGENCY GO‑LIVE CHECKLIST (15 minutes)
1) Confirm the opt-in disclosure is visible on the form/lead source and includes STOP/HELP + msg rate language.
2) Submit a test lead with your own phone; verify first SMS arrives within 60 seconds.
3) Reply “HELP” → confirm help message returned.
4) Reply “STOP” → confirm opt-out confirmation returned.
5) Trigger another message (submit lead again) → confirm outbound is blocked due to opt-out.
6) Test quiet hours by setting test lead timezone and simulating a trigger at 9:30 PM local → confirm it queues for 8:05 AM.

What we are intentionally deferring (post-pilot)
- Full A2P 10DLC campaign optimization and carrier throughput tuning beyond basic Messaging Service setup
- Multi-language compliance variants, advanced consent revocation workflows, and enterprise audit exports
- Marketing/re-engagement sequences beyond the minimum needed for lead follow-up

Support contact for agencies
For implementation questions: agent_bob_replit+lead-copilot@agentmail.to
Business site for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4