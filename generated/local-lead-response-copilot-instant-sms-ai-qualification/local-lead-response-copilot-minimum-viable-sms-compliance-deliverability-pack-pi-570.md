# Local Lead Response Copilot — Minimum‑Viable SMS Compliance & Deliverability Pack (Pilot‑Launch Ready)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:19:16.553Z

---

Purpose: remove the top pilot launch blockers (carrier enforcement + TCPA/CTIA objections) with the minimum set of compliant behaviors and copy. This is not legal advice.

Business legitimacy references (use in proposals/onboarding):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) Required behaviors (MVP)
A. Consent capture: store timestamp, source (Webflow/Typeform/FB), page/form name, IP/user agent when possible, and the exact opt-in text shown.
B. STOP/HELP compliance: recognize standard keywords, confirm opt-out, and block future sends until re-subscribed.
C. Quiet hours: do not send marketing/qualification messages outside local-time window; queue to next allowable time.
D. Content hygiene: no link-shorteners, no “FREE!!!/ACT NOW”, avoid all-caps, avoid repeated identical messages, include brand name early.

2) Copy/paste opt-in snippets (Agencies)
Replace [BUSINESS NAME] and add real Terms/Privacy URLs when published.

2.1 Webflow / website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages from [BUSINESS NAME] about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. See Terms: [TERMS_URL] and Privacy: [PRIVACY_URL].”

Hidden fields to add (if possible):
- sms_opt_in=true
- sms_opt_in_source=webflow
- sms_opt_in_text_version=v1

2.2 Typeform (include as statement + yes/no)
Statement:
“By providing your phone number and selecting ‘Yes’, you consent to receive automated text messages from [BUSINESS NAME] about your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Question: “Do you agree to receive texts about your request?” (Yes/No)
Only text leads who answered “Yes”.

2.3 Meta/Facebook Lead Ads (follow-up disclosure)
In the Lead Form ‘Privacy Policy’ link, use your published Privacy URL.
Add a custom disclaimer field (or intro text):
“By submitting, you agree [BUSINESS NAME] may contact you by text/phone about your request, including automated texts. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

3) Message templates (MVP compliant)
Guidelines: keep <160 chars when possible, include business name, be specific, avoid multiple links.

3.1 First response (immediate)
“Hi {first_name}, it’s {rep_name} at {business_name}. Got your request for {service}. What’s the address/ZIP for the job?”

3.2 Qualification (1–3 questions max)
“Thanks. When would you like service—ASAP, this week, or next week?”
“Any photos you can share? (Optional) Reply YES and I’ll send a link.” (Send link only after YES.)

3.3 Booking push
“I can get you on the schedule. Want a quick call or a text quote? Reply CALL or TEXT.”

3.4 Missed-call text back
“Hi {first_name}, sorry we missed you—this is {business_name}. Are you looking for help with {service}? Reply YES and your ZIP.”

3.5 Required compliance footer (use sparingly; include at least once early in longer threads)
“Reply STOP to opt out, HELP for help.”

4) STOP/HELP handling (implementation spec)
4.1 Keywords (case-insensitive, trim punctuation)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO, SUPPORT
START keywords (resubscribe): START, YES, UNSTOP

4.2 STOP behavior
- On inbound STOP keyword: immediately mark recipient as opted_out=true (global across all campaigns/clients within the same sending number/service).
- Send one final confirmation message:
“You’re opted out of {business_name} texts. No more messages will be sent. Reply START to resubscribe.”
- After confirmation, block all outbound messages to that number (except responses required by law, if any).

4.3 HELP behavior
On inbound HELP keyword, send:
“{business_name}: We text about your service request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

4.4 Resubscribe (START/UNSTOP)
If inbound START/UNSTOP/YES and previously opted out:
- Set opted_out=false, log resubscribe event.
- Reply:
“You’re re-subscribed to {business_name} texts. Reply STOP to opt out, HELP for help.”

4.5 Audit logging (minimum fields)
- event_type: opt_in | message_sent | inbound_message | stop | help | resubscribe | blocked_send
- phone_e164
- timestamp_utc
- source (webflow/typeform/fb/manual)
- message_body (for inbound) OR template_id (for outbound)
- consent_text_version (for opt_in)
- suppression_reason (for blocked_send)

5) Quiet hours (timezone) spec
Goal: avoid late-night messages that increase complaints and opt-outs.

5.1 Default quiet hours window
Allowed send window: 8:00 AM – 8:00 PM local recipient time (configurable per client).

5.2 Timezone resolution order
1) Lead-provided ZIP/postal code → map to timezone
2) Lead-provided state/city (less reliable) → map
3) Area code mapping (fallback)
4) If unknown: use client’s business timezone and behave conservatively.

5.3 Behavior
- If lead arrives outside window: queue first message to next local 8:00 AM.
- If in active conversation and user texts first: you may respond immediately (transactional/response) but still keep messages minimal.

5.4 Owner override
Allow a per-client flag: “ignore quiet hours for inbound-initiated threads” (default ON) and “ignore quiet hours entirely” (default OFF).

6) Twilio deliverability readiness (minimum)
- Use a Twilio Messaging Service (even with one number) to centralize compliance settings.
- Enable Advanced Opt-Out (or implement your own suppression list as above).
- If using 10DLC long code at scale: prepare for A2P 10DLC Brand + Campaign registration; keep sample opt-in language and logs ready.
- Avoid URL shorteners; use your domain. Keep consistent sending identity.

7) Agency go-live checklist (1 page)
1) Add opt-in checkbox/disclaimer to the lead source (Webflow/Typeform/FB).
2) Confirm the client’s business name and service categories for template personalization.
3) Verify STOP/HELP:
   - Text STOP → confirm opt-out message received; subsequent outbound is blocked.
   - Text HELP → help message received with support email.
   - Text START → resubscribe confirmed.
4) Verify quiet hours by simulating an after-hours lead → confirm message is queued.
5) Confirm consent logging is storing: timestamp, source, and opt-in text version.

If agencies need an email contact for compliance/deliverability questions: agent_bob_replit+lead-copilot@agentmail.to.
