# Local Lead Response Copilot — Minimum Viable Compliance (MVC) Pack for Paid Pilots (Opt‑In + STOP/HELP + Quiet Hours + Consent Logging + Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T16:28:40.114Z

---

Purpose (wartime MVC)
This pack contains the minimum compliance + deliverability requirements to launch paid pilots safely without carrier enforcement or customer complaints. It is designed for agencies to copy/paste into forms and follow-ups and for engineering to implement quickly. For legitimacy/support, reference the live site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 and support: agent_bob_replit+lead-copilot@agentmail.to.

1) Required: Opt-in / Consent Capture (copy/paste snippets)
A. Webflow / Website form checkbox (recommended)
Checkbox label:
“I agree to receive SMS text messages from {Business Name} about my request, including appointment scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Below checkbox (small text):
“By submitting, you confirm you are the owner/authorized user of the phone number provided and agree to our Terms and Privacy: {TERMS_URL} | {PRIVACY_URL}.”
Implementation notes:
- Checkbox must be unchecked by default.
- Store timestamp, page URL, and full checkbox text version.

B. Typeform (consent statement)
Add a “Legal”/“Statement” block immediately before submit:
“Consent to text messages: By submitting this form, you agree that {Business Name} may text you about your request and scheduling. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
Add a required Yes/No field:
“Do you agree to receive SMS texts about your request?” (Yes required)

C. Meta/Facebook Lead Ads (form disclaimer)
Add to “Privacy policy” link: {PRIVACY_URL}
Add custom disclaimer (short):
“By submitting, you agree to receive SMS from {Business Name} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL}.”

2) Required: First Message Template (compliant + high deliverability)
Send immediately after lead creation.
Template:
“Hi {first_name}—this is {agent_name} with {Business Name}. Got your request for {service}. What’s the address/ZIP for the job?”
If you must include opt-out line, keep it short and not repeated in every message:
“Reply STOP to opt out.”
Deliverability rules:
- Identify the sender/business in message 1.
- Avoid all-caps, excessive punctuation, and “FREE/URGENT/ACT NOW”.
- Prefer one short link max, no link shorteners.

3) Required: STOP / HELP Handling (engineering spec, Twilio-oriented)
Inbound keyword detection (case-insensitive, trimmed). Treat as STOP:
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Treat as HELP:
HELP, INFO
A. STOP behavior
When inbound matches STOP keyword:
1) Mark contact as “sms_opted_out=true” globally (across all client locations unless you support separate brands).
2) Immediately send a single confirmation (no marketing):
“You’re opted out and will no longer receive texts from {Business Name}. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
3) Block all future outbound messages to that number (including automated sequences and manual sends) unless user explicitly re-consents.
4) Log event with fields below.

B. START (optional re-subscribe)
If inbound matches START / YES:
- Only re-enable if you have prior opt-in record OR you re-confirm:
“Confirm re-subscribe to texts from {Business Name} about your request? Reply YES to confirm.”

C. HELP behavior
Reply:
“{Business Name} help: We text about your service request and scheduling. Msg&data rates may apply. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

D. Audit logging (minimum fields)
Store for each inbound/outbound:
- phone_e164, message_sid (provider id), direction, timestamp_utc
- message_body (or hashed body if you must), keyword_detected (STOP/HELP/none)
- consent_status_before, consent_status_after
- suppression_reason (STOP, manual, etc.)
- lead_source (webflow/typeform/fb/etc.)
- consent_record_id (points to opt-in capture record)

4) Required: Quiet Hours (minimum viable)
Goal: prevent texts at night, reduce complaints.
Default schedule (local time of the lead):
Allowed send window: 8:00am–8:00pm, Mon–Sat. Sunday: 9:00am–6:00pm.
Timezone resolution order:
1) If lead has ZIP/address: map to timezone.
2) Else if area code maps confidently: use that.
3) Else default to business location timezone.
Queueing rule:
- If message would be sent outside allowed window, queue it for the next allowed time (send at next window start) and note “queued_due_to_quiet_hours=true” in logs.
Exceptions:
- Manual human-initiated messages can override with an “override_quiet_hours=true” flag (still discouraged).

5) Agency Handoff: Go-live checklist (minimum)
For each client/location:
- Confirm exact business name displayed in texts.
- Install opt-in language in form/ad (Section 1).
- Ensure Terms/Privacy links are real URLs (not placeholders).
- Verify STOP/HELP works end-to-end using two real test numbers:
  1) Submit lead → receive first SMS.
  2) Reply HELP → receive help response.
  3) Reply STOP → receive opt-out confirmation.
  4) Trigger another outbound → must be blocked.
- Confirm quiet-hours queueing by setting a test lead outside window.

6) Twilio deliverability minimums (no spend assumed)
- Use a Messaging Service (not ad-hoc from numbers) to manage sender pooling and compliance.
- Avoid URL shorteners and repeated identical messages at high volume.
- Maintain consistent brand identification in first message.
- If using 10DLC long code at scale, plan for A2P registration; if not registered, keep volume low and watch error codes and filtering.

Sales objection closer (one paragraph agencies can paste)
“We’re TCPA/CTIA-aligned out of the box: forms include explicit SMS consent language with STOP/HELP, our system automatically honors STOP globally (hard suppression) and logs consent + opt-out events for audit, and we enforce quiet hours by lead timezone with queued sends. This reduces carrier filtering and protects your ad spend by ensuring leads actually receive and reply to texts.”
