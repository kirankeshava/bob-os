# Local Lead Response Copilot — MV Compliance + Deliverability Agency Handoff (Copy/Paste Pack + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:03:12.826Z

---

Audience: pilot agencies + local service businesses using Local Lead Response Copilot. 
Proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 
Support email (include in all disclosures): agent_bob_replit+lead-copilot@agentmail.to

1) Minimum-Viable Compliance Checklist (launch gate)
A. Consent capture
- Must collect express written consent for SMS when using forms/lead ads. Consent cannot be a condition of purchase.
- Must show disclosures at point of capture: brand name, “automated”/“autodialed” text, message frequency (or “varies”), “Msg & data rates may apply”, STOP/HELP language, and links to Terms + Privacy.
- Must log: timestamp, lead source, IP/user agent if web, form snapshot (the exact opt-in text shown), and phone number.

B. STOP/HELP + suppression
- STOP must immediately stop all non-essential messaging (global suppression). Provide a confirmation.
- HELP must return a help message including business name and support email.
- Suppression must be enforced at send time; if suppressed, do not send, and log the block.

C. Quiet hours
- Do not send between 9pm–8am in the lead’s local timezone (default). If timezone unknown, use area code inference; if ambiguous, default to recipient’s state if known; else default to account timezone.
- If a message triggers during quiet hours, queue it for the next allowed time and log the deferral.

D. Content & deliverability
- No “spammy” content patterns: excessive caps, repeated emojis, multiple shortened links, “FREE!!!”, “act now”, “winner”, etc.
- Identify sender/brand early; keep the first message short; ask 1 question at a time.
- Limit link use; prefer a single trusted domain; avoid link shorteners.

E. Recordkeeping
- Retain consent logs + message logs + opt-out logs at least 24 months (recommend 48) and make them exportable for disputes.

2) Copy/Paste Opt-in Snippets (Webflow / Typeform / Meta Lead Ads)
Important: Replace [BUSINESS_NAME], [TERMS_URL], [PRIVACY_URL]. Until live URLs exist, do not run paid traffic.

2.1 Webflow / Website form checkbox (recommended)
Checkbox label (unchecked by default):
“I agree to receive text messages from [BUSINESS_NAME] about my request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Helper text (optional, below the checkbox):
“Texts may be sent using an automated system. For help email agent_bob_replit+lead-copilot@agentmail.to.”

2.2 Typeform (add as statement + required Yes)
Statement:
“By submitting, you agree that [BUSINESS_NAME] may text you about your request (automated). Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to buy. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”
Required question:
“Do you agree to receive text messages about your request?” (Yes/No; must be Yes to submit)

2.3 Meta/Facebook Lead Ads (disclaimer text)
Add to “Privacy policy” + “Custom disclaimer”:
“By submitting this form, you consent to receive text messages from [BUSINESS_NAME] about your request, including automated texts. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”

3) Message Templates (compliant + deliverability-friendly)
Guidelines:
- Keep under ~240 chars when possible.
- 1 link max; avoid shorteners.
- Start with brand identity.

3.1 First response (after form submit)
“Hi {firstName}—this is {agentName} with [BUSINESS_NAME]. Got your request for {service}. What’s the address/ZIP for the job?”

3.2 Qualification question (1 at a time)
“Thanks. When are you looking to get this done—today/tomorrow, this week, or later?”

3.3 Booking CTA
“Perfect. Want to book a quick call or an on-site estimate? Reply 1 for call, 2 for on-site.”

3.4 Confirmation
“Booked—{date} at {time}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

3.5 Missed-call textback
“Sorry we missed you—this is [BUSINESS_NAME]. What’s the best time today to call you back?”

3.6 Re-engagement (after 24–72h)
“Hi {firstName}—checking in from [BUSINESS_NAME]. Do you still need help with {service}, or should I close this out?”

4) STOP/HELP Implementation Spec (code-ready)
4.1 Keywords (case-insensitive; trim punctuation)
STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP set: HELP, INFO, SUPPORT
START set (optional): START, UNSTOP, RESUME

4.2 State machine
- Default: ACTIVE
- If inbound matches STOP set: set state=OPTOUT, add phone to global_suppression_list, log event=STOP_RECEIVED, and send confirmation:
  “You’re opted out from [BUSINESS_NAME] texts. No more messages will be sent. Reply START to resubscribe. Help: agent_bob_replit+lead-copilot@agentmail.to”
- If inbound matches HELP set: do NOT change state; send:
  “[BUSINESS_NAME] help: reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4”
- If inbound matches START set AND phone is suppressed: remove from suppression list, set state=ACTIVE, log event=START_RECEIVED, send:
  “You’re re-subscribed to [BUSINESS_NAME] texts. Msg frequency varies. Reply STOP to opt out.”

4.3 Enforcement
- At send-time, check suppression first. If suppressed, block send and log event=SEND_BLOCKED_SUPPRESSED.
- STOP applies globally across all workflows/campaigns.

4.4 Audit logs (minimum)
Fields: phone_e164, account_id, lead_id (if any), inbound_body, matched_keyword, action_taken, timestamp_utc, channel_provider (Twilio), message_sid(s), suppression_list_version.

5) STOP/HELP Verification Test Matrix (staging/prod)
Run from a real mobile number.
- Test: send “STOP” -> expect immediate confirmation + suppression set + outbound attempts blocked.
- Test: send “Stop.” (punctuation) -> same.
- Test: send “HELP” -> expect help message with support email + proof URL; no suppression.
- Test: send “START” after STOP -> expect resubscribe message; outbound allowed.
Required evidence: screenshots + exported log rows including message SIDs and SEND_BLOCKED_SUPPRESSED event.

6) Quiet Hours by Timezone — Implementation Spec
6.1 Default policy
- Allowed window: 08:00–21:00 recipient local time, every day.
- If current time is outside window, defer to next 08:00 local.

6.2 Timezone resolution order
1) Lead-provided timezone (explicit field)
2) Address-derived timezone (if address/ZIP captured)
3) Phone area code inference (best-effort)
4) Account default timezone

6.3 Deferral behavior
- Put message into a scheduled queue with target_send_time_utc.
- Re-check suppression at actual send time (in case STOP happened while queued).
- Log events: QUIET_HOURS_DEFERRED, QUIET_HOURS_SENT, QUIET_HOURS_SKIPPED_SUPPRESSED.

6.4 Overrides
- Manual agent override allowed only for purely transactional/reschedule messaging; log OVERRIDE_REASON and actor.

7) Consent Logging Schema (dispute-ready)
Minimum fields:
- consent_id (uuid)
- account_id, lead_id
- phone_e164
- consent_status: CONSENTED | OPTOUT
- consent_timestamp_utc
- consent_source: webflow | typeform | meta_lead_ads | manual
- consent_text_version + full_consent_text_snapshot
- page_url/form_id/ad_id
- ip_address (if web), user_agent (if web)
- proof_url_shown (boolean)
- terms_url, privacy_url
- optout_timestamp_utc (if any) + optout_keyword
Retention: 24+ months; exportable CSV.

8) Twilio Deliverability Setup (zero-spend steps first)
- Use a Messaging Service (group numbers; enable sticky sender; enable opt-out keywords if relying on Twilio’s features, but still enforce suppression in-app).
- Decide sending route:
  * Low volume/local pilots: 10DLC long code (requires A2P registration for US). 
  * Higher trust for mixed traffic: Toll-free (verification recommended).
- Content guidelines:
  * Don’t include repeated links; never use shorteners.
  * Avoid “marketing blasts”; keep messages conversational and clearly tied to the user’s request.
  * Always include brand name in first message.
- Fallback behavior:
  * If send fails due to carrier filtering, retry once after 60–120 seconds.
  * If repeated failures, route to email notification to the business and pause automated texting for that lead; log DELIVERY_DEGRADED.

9) Agency Handoff Instructions (what to do today)
1) Paste the opt-in snippet into the lead capture source (Webflow/Typeform/Meta).
2) Ensure checkbox is unchecked by default (or explicit Yes required).
3) Ensure Terms + Privacy URLs are live and linked.
4) Connect lead source to Copilot (webhook/Zapier/Make) and pass: firstName, phone, service, zip/address, source.
5) Turn on STOP/HELP handling and verify with the test matrix.
6) Turn on quiet hours and verify a message sent at 9:30pm local gets deferred.
Questions/support: agent_bob_replit+lead-copilot@agentmail.to
Proof page for prospects: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
