# Local Lead Response Copilot — MVP Compliance Pack (Pilot-Launch Ready): Opt‑In Copy, STOP/HELP, Quiet Hours, Consent Logging, Agency Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T12:04:25.401Z

---

Overview (MVP focus)
This pack covers ONLY the items that commonly block pilots or trigger carrier/TCPA issues: (1) clear opt-in disclosure, (2) STOP/HELP handling with a suppression list, (3) quiet-hours deferral, and (4) consent logging. Anything beyond this (full A2P campaign narrative, advanced content linting, throughput tuning) is intentionally deferred until after first paid pilots.

Public legitimacy references for agencies/clients
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Copy/paste opt-in language (use as-is)

A) Webflow / Website form checkbox (recommended)
Add a required checkbox + short disclosure under the phone field:
Checkbox label:
“I agree to receive text messages about my request.”
Disclosure (small text under checkbox):
“By submitting, you agree that Local Lead Response Copilot (on behalf of <BUSINESS NAME>) may text you about your request (appointment/estimate). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Support: agent_bob_replit+lead-copilot@agentmail.to. More: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
Implementation note: Store checkbox=true, timestamp, page URL, and IP/user-agent if available.

B) Typeform (statement + optional yes/no)
Add a statement right before contact details:
“SMS consent: By providing your phone, you agree we may text you about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Support: agent_bob_replit+lead-copilot@agentmail.to. More: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
Optional question:
“Can we text you about your request?” (Yes/No)
Only enroll in SMS if “Yes”. Log the answer.

C) Meta/Facebook Lead Ads (primary text + disclaimer)
Primary text (short):
“Submit to get a fast text response to schedule or answer questions.”
Lead form disclaimer (longer):
“By submitting, you agree to receive text messages about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Support: agent_bob_replit+lead-copilot@agentmail.to. More: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

2) STOP/HELP handling (implementation-ready spec)
Goal: deterministically honor opt-out and provide help info. MUST work even if conversation state is mid-flow.

A) Keyword matching
Normalize inbound message: trim, lowercase.
STOP keywords (treat as opt-out):
stop, stopall, unsubscribe, cancel, end, quit
HELP keywords:
help, info, support

B) Required behaviors
When inbound matches STOP keyword:
1) Immediately mark recipient as opted_out=true in a GLOBAL suppression list (not per-business only; safest MVP is global to avoid accidental resends).
2) Send confirmation SMS (exact copy below).
3) Block ALL future outbound messages to that number unless they later send explicit re-subscribe keyword (defer resubscribe to v2 unless required).

STOP confirmation message (exact copy):
“You’re opted out and will no longer receive texts. Reply HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to”

When inbound matches HELP keyword:
1) Do NOT change opt-out status.
2) Send help SMS (exact copy below).

HELP response message (exact copy):
“Help: This number is used to follow up on your recent request with <BUSINESS NAME>. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. More: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

Non-STOP/HELP inbound:
- Continue qualification flow as normal IF not opted out.
- If opted out, do not respond (or send a single: “You’re opted out. Reply HELP for help.” only if required for UX; MVP recommendation: no further messages after STOP).

C) Twilio routing notes (common setup)
- Configure one inbound webhook endpoint for the Messaging Service phone numbers.
- Endpoint logic order:
  (1) lookup suppression list → if opted_out, drop
  (2) evaluate STOP/HELP → handle and return
  (3) normal conversation/AI qualification

D) Consent + suppression logging (MVP schema)
For each phone number, store:
- phone_e164
- consent_status: opted_in | opted_out | unknown
- consent_source: webflow | typeform | facebook | manual
- consent_text_snapshot (the disclosure shown)
- consent_timestamp_utc
- consent_page_or_form_id
- last_inbound_message_timestamp_utc
- opt_out_timestamp_utc (if any)
- opt_out_keyword (if any)
- message_sid/provider_id (for audit)

3) Quiet hours by timezone (MVP spec)
Goal: avoid sending messages at night; reduce complaints and carrier scrutiny.

A) Quiet hours window (default)
- Do not initiate outbound SMS between 9:00 PM and 8:00 AM recipient local time.
- Exception: user just texted inbound within last 5 minutes (treat as “active session”)—allowed to respond even during quiet hours.

B) Timezone resolution order
1) If lead has explicit timezone field → use it.
2) Else infer from area code / phone lookup (if available) → use it.
3) Else use business timezone (configured per client).
4) Else fallback to America/New_York.

C) Queued-send behavior
If a message is triggered during quiet hours:
- Queue the message.
- Schedule send for next allowed time at 8:05 AM local time.
- If multiple queued messages exist, collapse into one concise message:
  “Thanks for reaching out—when’s a good time today for a quick call or estimate?”

D) Admin override (MVP)
Allow the business owner to disable quiet-hours per client (default ON). Log overrides.

4) Message content guidelines (MVP deliverability)
- Keep first message short, human, and directly tied to the lead’s request.
- Avoid ALL CAPS, excessive punctuation, and “free/guaranteed/act now” style language.
- Always identify the business in message 1.
- Include STOP/HELP handling in the system even if not appended to every message (opt-in disclosure already states STOP/HELP).

Recommended first-message template (MVP compliant)
“Hi <first name>—this is <agent name> with <BUSINESS NAME>. Got your request for <service>. A couple quick questions so we can give the right time/price—what’s the address or ZIP?”

5) Agency handoff: go-live checklist (copy/paste)
1) Confirm lead source: Webflow / Typeform / Facebook Lead Ads.
2) Add the opt-in disclosure text (Section 1) and (if possible) an explicit checkbox/yes-no.
3) Ensure the form passes: first name, phone, service requested, ZIP/address, and consent=true.
4) In Local Lead Response Copilot, set:
   - Business name
   - Business timezone
   - Quiet hours ON
   - Booking link/call scheduling destination
5) Send verification tests (no paid traffic needed):
   - Submit a test lead → confirm first SMS arrives.
   - Reply HELP → confirm help message.
   - Reply STOP → confirm opt-out confirmation.
   - After STOP, trigger another outbound → must be blocked.
6) Provide client-facing legitimacy info if asked:
   - https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
   - agent_bob_replit+lead-copilot@agentmail.to

6) Deferred (do later; not required for pilot launch)
- Full A2P 10DLC campaign narrative + throughput tuning per vertical
- Automated resubscribe (“START”) handling and double opt-in flows
- Advanced content linting / spam score automation
- Multi-number rotation strategies

Owner/engineering verification matrix (quick)
- STOP: inbound “STOP” → suppression=true; confirmation sent; future outbound blocked.
- HELP: inbound “HELP” → help response sent; suppression unchanged.
- Quiet hours: simulate 10:30 PM local → outbound queued; sent at 8:05 AM.
- Active session exception: inbound at 10:30 PM then system response allowed within 5 minutes.
