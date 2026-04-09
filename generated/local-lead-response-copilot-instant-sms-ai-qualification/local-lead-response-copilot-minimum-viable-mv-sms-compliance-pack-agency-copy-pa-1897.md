# Local Lead Response Copilot — Minimum Viable (MV) SMS Compliance Pack (Agency Copy/Paste + Verification)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:41:04.780Z

---

This MV pack is designed to remove the top compliance/deliverability objections during pilot closes while keeping scope tight. Use it as a copy/paste handoff for agencies and as an acceptance checklist for engineering.

Business legitimacy links (use in proposals + opt-in language):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

A) REQUIRED (MV) OPT-IN LANGUAGE (copy/paste)

1) Webflow / Website form checkbox + disclosure (recommended)
Add a required checkbox:
[ ] “I agree to receive text messages about my request and appointments.”

Add this disclosure under the checkbox (small text is OK, must be visible):
“By submitting, you agree to receive SMS messages about your request from [BUSINESS NAME] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See our Privacy Policy and Terms: [PRIVACY_URL] | [TERMS_URL].”

2) Typeform (add to description text + required ‘I agree’ field)
“By continuing, you consent to receive SMS messages from [BUSINESS NAME] about your request/appointment at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy/Terms: [PRIVACY_URL] | [TERMS_URL].”

3) Meta/Facebook Lead Ads (Higher intent; keep short but explicit)
In the Lead Form “Privacy policy” and “Custom disclaimer” fields:
Custom disclaimer:
“By submitting, you consent to receive SMS about your request from [BUSINESS NAME]. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Privacy policy URL: [PRIVACY_URL]
(If there’s room, add Terms URL in a second link field or in the disclaimer.)

MV data capture requirements for every lead (must store):
- phone_number (E.164 if possible)
- timestamp
- source (webflow/typeform/meta/etc.)
- consent_text_version (e.g., “mv-optin-v1.0”)
- page/form identifier (URL or form name)
- ip_address (if available)

B) REQUIRED (MV) MESSAGE TEMPLATES (safe defaults)

Rule: Keep messages transactional, relevant to the lead’s request, and avoid spam-trigger language (no ALL CAPS, no “FREE!!!”, no misleading urgency).

1) First message (immediate speed-to-lead)
“Hi {{first_name}}, it’s {{agent_name}} with {{business_name}}—got your request for {{service}}. A quick question so we can help: is this for a home or a business?”
(Do NOT include marketing links in the first message. Keep it conversational.)

2) Qualification follow-up (if no reply in 3–5 minutes)
“Want to make sure we route you right—what city/ZIP is the job in?”

3) Booking handoff (after qualification)
“Thanks. We can get you scheduled. What day/time works best—today or tomorrow? If you prefer, you can call us at {{business_phone}}.”

4) Confirmation (after booking)
“You’re booked for {{appt_day}} at {{appt_time}}. Reply YES to confirm or NO to reschedule. Reply STOP to opt out, HELP for help.”

5) Missed-call text-back (if enabled)
“Hi—sorry we missed your call. This is {{business_name}}. What service do you need help with, and what’s your address/ZIP?”

6) Re-engagement (1 attempt, 24–72 hours later, only if they opted in and no response)
“Hi {{first_name}}—checking in on your request with {{business_name}}. Do you still need help with {{service}}?”
(Only one re-engagement attempt in MV mode.)

C) REQUIRED (MV) STOP/HELP HANDLING (behavior contract)

Keywords (case-insensitive; trim punctuation):
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Action on STOP:
1) Immediately mark contact as opted_out=true in a global suppression list (per sending number/service).
2) Send ONE confirmation message:
“You’re unsubscribed and will no longer receive texts from {{business_name}}. Reply START to resubscribe.”
3) Block all future outbound to that phone unless they explicitly resubscribe.

HELP handling:
On HELP, respond:
“{{business_name}}: For help call {{business_phone}} or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

Resubscribe:
- Accept START / YES (configurable) to set opted_out=false.
- Confirm:
“You’re resubscribed. Reply STOP to opt out.”

Audit logging (MV minimum fields per inbound message):
- from_phone, to_phone, body, timestamp
- parsed_intent (STOP/HELP/START/OTHER)
- suppression_state_before/after
- message_id (Twilio SID or provider id)

D) REQUIRED (MV) QUIET HOURS (reduce complaints + protects deliverability)

Default quiet hours policy (MV):
- Do not send outbound between 8:00 PM and 8:00 AM recipient local time.
- If a lead arrives during quiet hours: queue the first SMS for 8:05 AM local time.
- If timezone cannot be resolved: default to the business timezone and still respect 8pm–8am.

Timezone resolution order (MV):
1) Lead-provided ZIP/city/state (best)
2) Form page context (service area)
3) Phone number area code (fallback; imperfect)
4) Default business timezone

E) VERIFICATION CHECKLIST (acceptance tests)

STOP suppression test:
1) Send outbound “Hi … got your request …” to a test handset.
2) Reply “STOP”.
Expected:
- System logs parsed_intent=STOP
- opted_out=true for that phone
- Confirmation message sent exactly once
3) Trigger any outbound workflow to that phone.
Expected:
- Outbound is blocked (no send attempt OR send attempt prevented with a logged reason “suppressed”).

HELP test:
1) Reply “HELP”.
Expected:
- Help message returned with support email agent_bob_replit+lead-copilot@agentmail.to and STOP instruction.

Quiet hours test:
1) Set recipient timezone to America/Chicago (or derive from ZIP).
2) Trigger lead at 9:30 PM local.
Expected:
- No outbound sent immediately
- Message scheduled/queued for ~8:05 AM local next day

F) DELIVERABILITY CONTENT GUIDELINES (MV)
- Keep first message under ~240 characters, no links.
- Avoid “FREE”, “BUY”, “DISCOUNT”, “URGENT”, excessive punctuation, and repeated templates across many brands without customization.
- Include brand/business name early.
- Keep a human-like cadence (don’t rapid-fire 5 messages).

Agency go-live notes (what to tell clients in one line):
“We only text people who opted in via your form/ad; every message supports STOP/HELP; we suppress opt-outs globally; and we respect quiet hours by recipient timezone.”

Owner/engineering TODO to complete MV (no spend required):
1) Implement keyword parsing and global suppression list.
2) Implement quiet-hours queueing.
3) Ensure consent logging fields are stored.
4) Publish Privacy/Terms URLs on the site and replace [PRIVACY_URL]/[TERMS_URL] in snippets.
