# Local Lead Response Copilot — Minimum Viable SMS Compliance Pack (Pilot-Launch Ready)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T20:15:55.643Z

---

This pack is the minimum viable (MV) compliance + deliverability baseline to launch pilots without carrier/TCPA surprises. It is intentionally scoped to what removes objections and prevents account blocks: explicit opt-in language, STOP/HELP handling, quiet hours, and consent logging.

Business legitimacy links (use these in forms + messages):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

1) MV OPT-IN LANGUAGE (copy/paste)
A) Webflow / Website form checkbox (recommended)
Add a required checkbox (unchecked by default) with this label:
“I agree to receive text messages about my request from [BUSINESS NAME] at the phone number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Under the checkbox (small text) add:
“By submitting, you confirm you’re the subscriber/authorized user. See Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (support: agent_bob_replit+lead-copilot@agentmail.to).”
Implementation note: store checkbox boolean, timestamp, page URL, IP (if available).

B) Typeform
Use a Yes/No question before collecting phone:
“Can we text you about your request?” (Yes/No)
Add description text:
“Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”
Only proceed to phone number field if Yes.

C) Meta/Facebook Lead Ads (Primary Text + Disclaimer)
Primary Text (ad):
“Request a quote/booking. We’ll text you within 1 minute to confirm details.”
Lead Form > Privacy policy URL: use the website URL above (until separate Terms/Privacy pages are published).
Custom disclaimer (add to form description):
“By submitting, you agree to receive texts from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to.”

2) MV MESSAGE TEMPLATES (avoid spam triggers)
Principles: identify the business, reference the lead’s request, ask 1 question at a time, avoid ALL CAPS, avoid “free!!!”, avoid shortened URLs if possible.

Initial message (send immediately after lead):
“Hi {{first_name}}, this is {{business_name}} — we got your request for {{service}}. Are you looking to book today or this week? Reply 1) Today 2) This week. Reply STOP to opt out.”

Qualification follow-up (if they reply):
“Thanks — what’s the job address or ZIP code? Reply STOP to opt out.”

Booking handoff (manual or calendar link):
“Great. What time works best for a quick call: morning, afternoon, or evening? Reply STOP to opt out. Help: agent_bob_replit+lead-copilot@agentmail.to”

Missed-call textback (if using call tracking):
“Sorry we missed you — this is {{business_name}}. What’s the best time to call back? Reply STOP to opt out.”

3) MV STOP/HELP HANDLING (must-have)
Keywords (case-insensitive, trim punctuation):
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Behavior:
- Immediately mark number as opted_out=true in a global suppression list.
- Reply once (only once per opt-out event):
“You’re opted out and will no longer receive texts from {{business_name}}. Reply HELP for help.”
- Block all future outbound messages to that number across all clients/campaigns until they re-opt-in.

HELP keyword:
HELP, INFO
Reply:
“{{business_name}} texting support. For help email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

Edge rules:
- If message contains STOP and other words (e.g., “stop texting”), treat as STOP.
- Do not send marketing after opt-out; only transactional is also blocked unless user re-consents.
- Re-opt-in: only if user explicitly opts back in (e.g., “START” + new consent capture). MV approach: require fresh consent via form/agent confirmation.

4) MV QUIET HOURS (reduce complaints)
Default quiet hours (local lead timezone):
- Do not send outbound between 9pm–8am.
Timezone resolution order:
1) Lead-provided state/ZIP → map to timezone
2) Area code heuristic
3) Business timezone fallback
If outside window:
- Queue the first message for next allowed time (8:05am local).
- If lead submits during quiet hours, send an internal notification to staff (email/Slack) but do not text the lead until allowed time.

5) MV CONSENT LOGGING (audit-proof)
Store per lead/contact:
- phone, first/last name (if available)
- consent_status: opted_in / opted_out / unknown
- consent_source: webflow/typeform/meta/manual
- consent_text_shown: exact snippet version ID (e.g., “optin_v1.2”)
- consent_timestamp (UTC)
- consent_page_url (or “meta_lead_form”)
- ip_address (if captured)
- stop_timestamp (if opted out)

6) AGENCY HANDOFF: 10-minute go-live checklist
1) Add MV opt-in language to the form/lead source (choose Webflow/Typeform/Meta above).
2) Confirm lead payload includes: phone, first name, service/category, timestamp, source.
3) Send yourself a test lead; verify first SMS arrives within 60 seconds.
4) Reply “STOP”; verify confirmation message + no further outbound.
5) Text “HELP”; verify help message + support email.
6) Submit a lead at 10:30pm local; verify message is queued to morning (quiet hours).
7) Save screenshots of: opt-in copy on form, STOP confirmation, HELP response.

If any of the above fails, pause sending and contact support: agent_bob_replit+lead-copilot@agentmail.to (include the business website URL for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4).

Deferred until after first pilots (not required to launch today): A2P 10DLC campaign registration details, advanced content linting, multi-number rotation strategies, and deep carrier throughput tuning.