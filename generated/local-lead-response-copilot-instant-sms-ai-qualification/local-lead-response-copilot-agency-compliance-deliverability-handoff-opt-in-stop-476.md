# Local Lead Response Copilot — Agency Compliance + Deliverability Handoff (Opt-in, STOP/HELP, Quiet Hours, Twilio A2P/10DLC)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:26:11.958Z

---

Purpose
This handoff lets an agency (or the client’s ops team) deploy Local Lead Response Copilot compliantly and with high deliverability. It includes: (1) copy/paste opt-in language for common lead sources, (2) SMS templates that avoid carrier spam triggers, (3) STOP/HELP behavior requirements, (4) quiet-hours logic by timezone, (5) Twilio setup runbook (Messaging Service + A2P 10DLC), and (6) a test plan to verify everything.

Business references (use in customer-facing materials)
- Proof/legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Support/Compliance contact: agent_bob_replit+lead-copilot@agentmail.to

1) Non-negotiables (TCPA/CTIA-aligned operational rules)
1. You must obtain express written consent before sending automated SMS. Consent must be clear, unbundled from purchase, and logged.
2. Every initial message must identify the business and include STOP and HELP info (directly or within the first 1–2 messages depending on flow length). Best practice: include it in the first.
3. STOP must immediately suppress future messages (global across all campaigns/services under that customer account).
4. HELP must provide support instructions and the support email.
5. Quiet hours must be honored in the lead’s local timezone (recommended default: 8:00am–8:00pm).

2) Copy/paste opt-in language snippets
Replace [BUSINESS NAME] with the client’s business name, and add links to Terms/Privacy once published.

2.1 Webflow form (checkbox + short disclosure)
Checkbox label:
“Text me about my request (recommended).”

Disclosure text (place directly under checkbox, visible):
“By checking this box, you agree to receive SMS messages from [BUSINESS NAME] about your request, including appointment scheduling and updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. Privacy: [PRIVACY URL] Terms: [TERMS URL]. For support email agent_bob_replit+lead-copilot@agentmail.to.”

Implementation note:
- Store a boolean field: sms_opt_in=true/false
- Store timestamp, page URL, and the exact disclosure version ID (see Consent Logging section).

2.2 Typeform
Use a Yes/No question: “Do you agree to receive text messages about your request?”
If Yes, show this statement before submit (Statement/Legal block):
“By submitting, you agree to receive SMS from [BUSINESS NAME] about your request (appointment scheduling and updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. Privacy: [PRIVACY URL] Terms: [TERMS URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

2.3 Meta / Facebook Lead Ads
Add to the Lead Form “Custom disclaimer” (or “Privacy policy” + “Website URL” fields).
Short disclaimer (fits character limits in many placements):
“By submitting, you agree to receive texts from [BUSINESS NAME] about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy: [PRIVACY URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.”

Best practice:
- Use Meta’s checkbox if available for SMS consent.
- Ensure the form asks for phone number and clearly indicates it is for texting.

3) Message templates (carrier-safe, high-converting)
Guidelines
- Avoid ALL CAPS, excessive punctuation, “free”, “guaranteed”, urgency spam language, link shorteners, and multiple links.
- Keep messages under ~300 characters when possible.
- Use the client’s brand name; include a human-like tone.

3.1 First message (sent immediately after lead submission)
“Hi {firstName}, this is {agentName} with [BUSINESS NAME]. Got your request for {service}. A couple quick questions so we can help—are you looking to schedule in the next 7 days? Reply 1) Yes 2) No. Reply STOP to opt out, HELP for help.”

3.2 Qualification follow-up (based on response)
If “Yes”:
“Great—what’s the address or zip code for the job?”
Then:
“Thanks. What’s the best time for a quick call: 1) Morning 2) Afternoon 3) Evening?”
Then booking:
“Perfect. I can book you for {slotOption1} or {slotOption2}. Reply 1 or 2. If you prefer, share another time.”

If “No”:
“No problem—when are you thinking? Reply with a timeframe (e.g., next week / this month).”

3.3 Missed-call textback (optional trigger)
“Hi {firstName}, sorry we missed you—this is [BUSINESS NAME]. Want to book a quick time to talk about {service}? Reply with a good time, or call us at {phone}. Reply STOP to opt out.”

3.4 Re-engagement (after 24–72 hours, only if consent exists)
“Hi {firstName}, checking in—do you still want help with {service}? Reply 1) Yes 2) No. Reply STOP to opt out.”

4) STOP / HELP handling (implementation requirements)
4.1 Keywords
Treat these (case-insensitive, with punctuation/whitespace) as STOP:
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Treat these as HELP:
HELP, INFO, SUPPORT

4.2 STOP behavior (must)
- Immediately mark the phone number as opted_out=true in a global suppression list for that customer.
- Send confirmation once:
“You’re opted out and will no longer receive texts from [BUSINESS NAME]. Reply START to resubscribe.”
- Block ALL future outbound SMS to that number unless the user explicitly re-subscribes.

4.3 START behavior (optional but recommended)
If user sends START/YES/UNSTOP:
“You’re re-subscribed. Reply STOP to opt out, HELP for help.”
Then allow messages again.

4.4 HELP response
“Help: You’re receiving messages from [BUSINESS NAME] about your request. Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

4.5 Edge cases
- If a user replies STOP during an active qualification flow, suppression overrides everything.
- If a user sends profanity/unknown message, do not loop. Send a single clarification:
“Sorry—I didn’t catch that. Reply 1 or 2, or reply HELP for options. Reply STOP to opt out.”
Then pause automation after 1–2 failures.

5) Quiet hours (timezone-aware) implementation spec
Default window (recommended): 8:00am–8:00pm lead-local time.

5.1 Timezone resolution order
1) Lead-provided ZIP/postal code → timezone lookup
2) Phone number area code (approximate) → timezone
3) If unknown, fallback to customer’s business timezone (configured)
Log which method was used.

5.2 Sending rules
- If lead arrives inside quiet hours: send immediately.
- If lead arrives outside quiet hours: queue the first message for next allowed time (e.g., 8:05am local) and mark as “delayed_quiet_hours=true”.
- For queued messages: if the lead responds during quiet hours, you may respond only within the allowed window unless the lead initiated and local rules allow immediate response; safest default is still to wait until allowed window.

5.3 Owner/agent override
Allow a manual “send anyway” toggle for human agents, but log override=true with agent identifier.

6) Consent logging (audit-proof)
Store these fields per lead:
- lead_id
- phone_e164
- sms_opt_in (boolean)
- opt_in_timestamp_utc
- opt_in_source (webflow/typeform/meta/manual)
- opt_in_form_url
- opt_in_ip (if collected)
- opt_in_user_agent (if available)
- opt_in_disclosure_text (exact text snapshot) OR disclosure_version_id referencing a stored template
- proof_of_submission_id (Typeform response ID / Webflow submission ID / Meta lead ID)
- suppression_status (active/opted_out)
- suppression_timestamp_utc (if opted out)

7) Twilio deliverability setup runbook (agency steps)
7.1 Messaging Service (recommended)
- Create a Twilio Messaging Service.
- Enable Smart Encoding.
- Configure inbound handling to your webhook so STOP/HELP are processed centrally.
- Add phone numbers to the Messaging Service (do not send ad hoc from random numbers).

7.2 A2P 10DLC (US long code) readiness
If using US 10DLC:
- Create Twilio Business Profile (brand).
- Create A2P campaign appropriate to use case (customer care / conversational / lead follow-up as applicable).
- Ensure opt-in language exactly matches use (appointment scheduling + service updates).
- Maintain consent logs (section 6). Carriers may request proof.

Note: Registration may involve Twilio pass-through fees depending on account. Do not spend without owner approval.

7.3 Content policy to reduce filtering
- Do not include shortened links. Use full domain when linking (ideally the client’s domain).
- Avoid “free”, “winner”, “act now”, “limited time”, and excessive emojis/symbols.
- Keep templates consistent; sudden changes can hurt trust scores.
- Keep frequency low; stop after a few attempts if no response.

7.4 Fallback behaviors
- If message fails with “unreachable” or carrier block: retry once after 5–10 minutes; then mark as failed and notify admin.
- If lead is opted out: block silently and log “blocked_optout”.

8) Verification test plan (what to screenshot/log)
Before go-live, run this matrix using a test phone:
A) Opt-in flow
- Submit form with consent → verify first SMS sends; verify consent log fields populated.
- Submit form without consent → verify NO SMS sends; log shows sms_opt_in=false.

B) STOP
- Reply STOP after first message → verify confirmation sent; verify future outbound blocked.
- Attempt to trigger new lead message to same number → must be blocked.

C) HELP
- Reply HELP → verify help message includes support email agent_bob_replit+lead-copilot@agentmail.to and STOP instructions.

D) Quiet hours
- Simulate lead at 10pm local → verify queued for next allowed time; log includes lead timezone and delayed flag.

Evidence to collect
- Message logs (inbound/outbound timestamps, statuses)
- Consent log record
- Suppression list entry

9) Agency implementation notes (Zapier/Make/webhooks)
Minimum payload required to trigger Copilot:
- first_name
- phone (normalize to E.164)
- service/category
- consent flag (sms_opt_in)
- lead_source + submission_id

Routing rules
- If sms_opt_in != true: do not call SMS send endpoint.
- If phone invalid: route to email-only follow-up.

Support
For compliance questions or audits, contact: agent_bob_replit+lead-copilot@agentmail.to and include the lead_source + submission_id + phone number.

End of handoff