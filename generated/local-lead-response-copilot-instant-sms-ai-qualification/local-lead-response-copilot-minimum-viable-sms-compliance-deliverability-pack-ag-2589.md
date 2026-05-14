# Local Lead Response Copilot — Minimum‑Viable SMS Compliance & Deliverability Pack (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T05:34:37.409Z

---

Purpose (Wartime / Pilot-Ready)
This pack contains ONLY the minimum items that prevent pilot-killing issues (carrier enforcement, customer complaints, Twilio suspensions, and agency objections). It is designed for fast deployment for Local Lead Response Copilot.
Legitimacy references:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Opt-in / Consent Language (Copy/Paste)
Rule of thumb: consent must be clear, unbundled from other terms, and disclosed BEFORE submission.

A) Webflow / Website form checkbox (recommended)
Add a required checkbox with label:
“I agree to receive text messages from [BUSINESS NAME] about my request, including automated texts. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not a condition of purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL]”
Implementation notes:
- Store checkbox value + timestamp + page URL + IP (if available).
- Capture the phone number field separately; do not pre-check the box.

B) Typeform consent statement
Add a Yes/No question (required). Question:
“Do you agree to receive text messages about your request?”
Description (below):
“By selecting Yes, you agree to receive automated SMS from [BUSINESS NAME]. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not a condition of purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL]”
If No → do not text; route to email-only follow-up.

C) Meta/Facebook Lead Ads disclosure (add to ‘Privacy Policy’/custom disclaimer)
Add custom disclaimer text:
“By submitting, you agree to receive SMS from [BUSINESS NAME] about your inquiry, including automated messages. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy: [PRIVACY_URL] Terms: [TERMS_URL]”
Also ensure the Lead Ad links to your Privacy Policy URL.

2) Message Templates (Compliant + Deliverability-Safe)
Guidelines:
- Identify the business early.
- Ask short questions.
- Avoid spammy words (FREE!!!, GUARANTEED, CLICK NOW), excessive punctuation, all-caps, link shorteners.
- Include STOP/HELP language at least in the first message and periodically (or always, if feasible).

A) First response (speed-to-lead)
“Hi {{first_name}}—this is {{agent_name}} with {{business_name}}. Got your request for {{service}}. A quick question so I can help: is this for {{city}} and when do you want it done? Reply 1) ASAP 2) This week 3) Just pricing. Reply STOP to opt out, HELP for help.”

B) Qualification follow-up (if no reply after 3–5 minutes)
“Just making sure I point you to the right option—what’s the best address/ZIP for the job? Reply STOP to opt out, HELP for help.”

C) Booking push (when qualified)
“Perfect. We can get you on the schedule. What’s a good time for a quick call? 1) Morning 2) Afternoon 3) Evening. Reply STOP to opt out, HELP for help.”

D) Missed-call text back (if call attempt fails)
“Sorry we missed you—this is {{business_name}} following up on your request. Want to book a time? Reply with a time window or call us back at {{callback_number}}. Reply STOP to opt out, HELP for help.”

E) Re-engagement (24–72h later; keep it non-pushy)
“Hi {{first_name}}, should I close out your request or do you still want an estimate for {{service}}? Reply 1) Still interested 2) Not needed. Reply STOP to opt out, HELP for help.”

3) STOP / HELP Handling (Engineering Spec)
Objective: immediate opt-out compliance; no further outbound texts after STOP; maintain audit logs.

A) Keywords (case-insensitive; trim punctuation)
STOP keywords (treat as opt-out): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO, SUPPORT

B) Behavior
On inbound STOP keyword:
1) Add phone to Global Suppression List (GSL) for the workspace/account.
2) Mark all active conversations as “OptedOut=true”.
3) Send ONE confirmation message (and only one):
“You’re opted out and will no longer receive texts from {{business_name}}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
4) Block all future outbound attempts to this number (hard block at send-time).

On inbound HELP keyword:
Send:
“{{business_name}}: We text about your service request. Msg & data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
Do NOT add to suppression.

On inbound START keyword (optional resubscribe):
- Only accept if you have a prior consent record OR you re-confirm consent.
- Send:
“You’re re-subscribed to {{business_name}} texts. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

C) Logging requirements (minimum)
For every inbound message:
- event_type: inbound_message
- from_number, to_number, timestamp (UTC)
- body_raw, body_normalized
- matched_keyword (STOP/HELP/START/none)
For opt-out:
- event_type: opt_out
- opt_out_source: inbound_keyword
- suppression_list_write: success/failure
For blocked outbound:
- event_type: outbound_blocked
- reason: opted_out

4) Quiet Hours (Timezone) Spec (Engineering)
Goal: reduce complaints by not texting at night.

A) Default windows
Local time sending window: 8:00 AM – 8:00 PM (recipient local time), 7 days/week.

B) Timezone resolution order
1) Lead-provided address/ZIP → map to timezone.
2) Phone number area code lookup.
3) If unknown: use business timezone; if still unknown, hold until 9:00 AM business local.

C) Behavior
If a message is triggered outside the allowed window:
- Queue it with “send_at = next allowed time” in recipient’s timezone.
- If multiple messages queue, collapse into one summary message (avoid bursts).
- Exception: manual agent override can send immediately (log event_type=quiet_hours_override).

D) DST handling
Use IANA tz database; compute next allowed time using timezone-aware library.

5) Twilio Deliverability Minimum Setup (No Spend Assumed)
A) Use a Twilio Messaging Service
- Enable “Sticky Sender” (consistent number per recipient).
- Enable “Smart Encoding”.
- Set up inbound webhook to your STOP/HELP handler.
- Add numbers to the Messaging Service pool (avoid constantly changing sender numbers).

B) A2P/10DLC readiness (if using long-code in US)
- Prepare Brand details and Campaign description aligned to “customer care / lead follow-up”.
- Ensure opt-in language matches your campaign use case.
- Keep samples of messages exactly like the templates above.

C) Content lint rules (build into app)
Block or warn on:
- Excessive capitalization/punctuation
- URL shorteners
- Claims like “guaranteed approval”, “risk-free”, “act now”
- Too many links (max 1)

6) Agency Handoff: Go-Live Checklist (Fast)
1) Pick lead source (Webflow/Typeform/FB Lead Ads) and paste the matching opt-in disclosure.
2) Ensure consent capture is stored: phone, checkbox/answer, timestamp, form/page URL.
3) Connect inbound SMS webhook to STOP/HELP endpoint.
4) Turn on quiet-hours queueing.
5) Run verification test matrix:
- Send HELP → receive help response
- Send STOP → receive confirmation; then try outbound → must be blocked and logged
- Trigger message at 10:30 PM local → must queue until next morning
6) Keep proof artifacts for agencies/clients: consent record screenshot/export + opt-out logs.

Owner notes (what’s deferred)
- Publishing Privacy/Terms pages: recommended for maximum trust, but pilots can run with placeholders short-term if needed.
- Full A2P registration completion: do it as soon as you see volume; minimum viable is having correct opt-in + STOP/HELP + message discipline now.

Support / Escalation
If an agency/client asks “Is this compliant?” provide:
“We capture express consent on the form/lead ad, include STOP/HELP and msg rate disclosures, honor opt-outs immediately with a global suppression list, enforce quiet hours by recipient timezone, and maintain consent + opt-out logs. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 Support: agent_bob_replit+lead-copilot@agentmail.to”
