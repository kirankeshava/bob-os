# Local Lead Response Copilot — MV SMS Compliance + Deliverability SOP (Agency Copy/Paste Pack + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:11:55.692Z

---

Business proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/Compliance email: agent_bob_replit+lead-copilot@agentmail.to

Purpose
This SOP makes pilot deployments “minimum viable compliant” (TCPA/CTIA-aligned) while improving deliverability and reducing Twilio/carrier enforcement risk. It is designed for agencies and operators implementing Local Lead Response Copilot for home services/local businesses (HVAC, plumbing, roofing, cleaning, pest, med spa, legal intake, etc.).

Non-legal note: This is operational guidance, not legal advice. Each client remains responsible for their own TCPA compliance.

1) What you must have BEFORE sending any SMS
A. Express written consent (opt-in) for marketing/automation texts
- Must be captured on the lead form/ad, not implied.
- Must disclose: automated texts, frequency, “Msg & data rates may apply”, STOP/HELP keywords, and link to Privacy/Terms.
- Consent cannot be a condition of purchase.

B. Clear identification
- First message must identify the business (“This is {BusinessName}”).
- If the message is triggered by an ad/form, mention that context.

C. Opt-out + help handling
- STOP/UNSUBSCRIBE etc. must immediately suppress.
- HELP must return support contact + opt-out instructions.

D. Quiet hours
- Do not send outside allowed local hours (recommended 8am–8pm lead’s local time) unless the user explicitly requests contact “now” (and you have proof).

2) Copy/paste opt-in language (use one of these)
Replace {BusinessName}, {BusinessPhone}, and policy URLs.
Policy link targets (recommended):
- {PrivacyURL} = https://<your-domain>/privacy
- {TermsURL} = https://<your-domain>/terms
If you do not have a domain yet, publish these pages wherever the client can link them consistently.

2.1 Webflow / website form (checkbox + disclosure)
Checkbox label (unchecked by default):
“I agree to receive text messages from {BusinessName} about my inquiry.”

Disclosure under checkbox (small text):
“By checking this box, you consent to receive automated SMS messages from {BusinessName} at the number provided about your request. Consent is not a condition of purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: {PrivacyURL} Terms: {TermsURL}.”

2.2 Typeform (statement + required yes/no)
Question: “Text message consent” (Required)
Choices: “Yes, text me” / “No”
Description:
“By selecting ‘Yes’, you consent to receive automated SMS from {BusinessName} about your request. Consent is not a condition of purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: {PrivacyURL} Terms: {TermsURL}.”

Mapping rule: Only trigger SMS if the answer == “Yes, text me”. Log the exact timestamp and form version.

2.3 Meta/Facebook Lead Ads (Higher Intent form)
Add to the lead form “Privacy policy” and “Custom disclaimer” fields:
Custom disclaimer:
“By submitting, you agree {BusinessName} may contact you by automated text at the number provided about your inquiry. Consent not required to purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: {PrivacyURL} Terms: {TermsURL}.”

2.4 Appointment request / “Call me now” variant
“By submitting, you request that {BusinessName} contact you by text and/or phone about your request. You consent to receive automated texts. Consent not required to purchase. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: {PrivacyURL} Terms: {TermsURL}.”

3) First-message templates (compliant + deliverable)
Rules:
- Keep first SMS under ~240 chars when possible.
- Avoid ALL CAPS, excessive punctuation, misleading claims, or “free!!!” language.
- Prefer one short link, ideally branded domain. Avoid link shorteners.

3.1 “New lead from website form”
“Hi {FirstName} — this is {BusinessName}. Got your request for {Service}. Are you looking to schedule an estimate or ask a quick question? Reply 1=Estimate 2=Question. Reply STOP to opt out.”

3.2 “New lead from Facebook/Instagram”
“Hi {FirstName}, {BusinessName} here — thanks for your request on Facebook. What can we help with? Reply 1=Quote/Estimate 2=Schedule 3=Just a question. Reply STOP to opt out.”

3.3 “Missed-call text back”
“Hi {FirstName} — sorry we missed your call, this is {BusinessName}. What do you need help with? Reply with a short description and your ZIP. Reply STOP to opt out.”

3.4 “After-hours deferral (sent next morning at allowed time)”
“Hi {FirstName} — {BusinessName} here. We received your request and will help first thing today. What service do you need? Reply with a short description. Reply STOP to opt out.”

4) AI qualification flow (short, low-risk)
Keep to 2–4 questions, then offer booking or callback.
Recommended questions:
Q1 Service category: “Which do you need? 1=Repair 2=Install 3=Estimate/Quote 4=Other”
Q2 Location gating: “What ZIP code is the job in?”
Q3 Timeframe: “When do you need it? 1=Today 2=This week 3=Next week 4=Just pricing”
Q4 Contact preference: “Prefer a call or text? 1=Call 2=Text”

Booking offer:
“Thanks — want to book a time? Reply 1=Earliest available 2=Choose a time. Or share availability.”

5) STOP/HELP handling (implementation spec)
Goal: Immediate compliance + provable suppression.

5.1 Keywords
Opt-out keywords (case-insensitive, trim punctuation/whitespace):
STOP, STOPALL, STOP ALL, UNSUBSCRIBE, CANCEL, END, QUIT

Help keywords:
HELP, INFO

Edge handling:
- If message contains “STOP” as a standalone token or exact match to the opt-out list, treat as opt-out.
- Do NOT try to “clarify” opt-out. One STOP = suppress.

5.2 State machine
Contact states per (tenant/client_id, phone_e164):
- ACTIVE (can send)
- OPTED_OUT (cannot send)

Transitions:
- ACTIVE + inbound OPT_OUT => OPTED_OUT immediately.
- OPTED_OUT + inbound START/UNSTOP (optional) => ACTIVE only if client policy allows re-opt-in; otherwise require manual re-consent.

5.3 Required responses
When receiving OPT_OUT:
Send once (immediate):
“{BusinessName}: You’re opted out and will no longer receive texts. Reply START to resubscribe (if applicable).”
Then stop all further messages.

When receiving HELP:
Send:
“{BusinessName}: For help, contact {BusinessPhone} or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Msg frequency varies.”

5.4 Suppression enforcement
- Maintain a global suppression list per tenant (client).
- Before ANY outbound send, check suppression. If OPTED_OUT, block send and log “blocked_optout”.
- Suppression must apply across all campaigns, numbers, and workflows.

5.5 Logging (for disputes + platform audits)
Log events with immutable timestamps:
- inbound_message_received (body, from, to, msg_sid)
- optout_detected (keyword_matched, normalized_body)
- optout_confirmation_sent (msg_sid)
- help_detected / help_sent
- outbound_blocked (reason=opted_out)
Store for minimum 24 months recommended (aligns with typical dispute windows).

6) Quiet hours by timezone (implementation spec)
Objective: Do not send outside allowed window in lead’s local time.

6.1 Default policy
Allowed send window: 08:00–20:00 local time, 7 days/week (configurable per tenant).

6.2 Timezone resolution order (best-effort)
1) Explicit lead timezone field (e.g., from form)
2) Lead ZIP -> timezone lookup (US)
3) Lead state -> timezone (fallback)
4) Tenant default timezone
If none resolved, use tenant default and flag “tz_fallback_used=true”.

6.3 Deferral algorithm
When an outbound message is ready:
- Compute lead_local_time.
- If within allowed window: send now.
- Else: schedule next_allowed_time (next day at 08:00 local; if before 08:00, schedule same day 08:00).
- Place message in a deferral queue with idempotency key (lead_id + workflow_step + day).

6.4 Overrides
- Do NOT override quiet hours for marketing.
- Allow override only if: lead explicitly asks “text me now/call now” AND you store that message as evidence.
- Manual agent sends should still warn and require confirm.

6.5 Logging
- quiet_hours_blocked (original_time_utc, lead_tz, next_send_time_utc)
- quiet_hours_sent (scheduled=true/false)

7) Consent logging schema (minimum viable)
Store per lead:
- lead_id, tenant_id
- phone_e164
- consent_status (opted_in/opted_out)
- consent_source (webflow/typeform/meta/manual)
- consent_text_version (hash or version id)
- consent_capture_timestamp_utc
- consent_capture_ip (if available)
- consent_form_url or ad_id/form_id
- checkbox_checked (true/false) or consent_answer
- policy_urls_shown (privacy, terms)
- evidence_blob (raw webhook payload stored securely)

Dispute export must be one-click: CSV/PDF showing consent evidence + message timeline + opt-out.

8) Twilio deliverability hardening (runbook)
8.1 Messaging Service
- Use a Twilio Messaging Service per tenant (or per client account).
- Enable: sticky sender (if multiple numbers), smart encoding, and opt-out tracking if relying on Twilio’s tools (still keep your own suppression list).
- Set a “friendly name” that matches the brand.

8.2 A2P 10DLC vs Toll-Free decision tree (US)
Use 10DLC if:
- You need local presence and moderate/high volume.
- You want highest deliverability for local long codes.
Use Toll-Free if:
- You need faster setup sometimes (but verification still recommended).
- You want a single number across regions.
Regardless: avoid running unregistered high-volume traffic.

8.3 Content guidelines (reduce filtering)
- Identify the business early.
- Avoid excessive links; use one stable domain.
- Avoid spam terms: “act now”, “guaranteed”, “free gift”, “click here” (use sparingly).
- Avoid URL shorteners.
- Keep templates consistent; don’t rotate copy aggressively.
- Don’t send images/MMS unless necessary.

8.4 Fallback behaviors
- If message fails with carrier filtering/undelivered: retry once after 2–5 minutes (not repeatedly).
- If still failing: switch channel (email) or create a task for human call.
- If phone invalid: mark lead unreachable and stop.

8.5 Monitoring
Track:
- delivered rate, carrier failures, opt-out rate, complaint signals
- time-to-first-text (SLA target: < 60 seconds)

9) Agency implementation steps (no-code friendly)
A. Put opt-in language in the form/ad (Section 2). Do not skip.
B. Send lead webhook to your automation tool (Zapier/Make) or direct webhook.
C. Only trigger SMS if consent captured == true.
D. Before sending, enforce quiet hours (Section 6) and suppression list (Section 5).
E. Use templates from Section 3 and keep them stable.
F. Run verification tests (below) before going live.

10) Verification test matrix (must pass)
STOP tests:
1) Lead replies “STOP” -> receive confirmation -> no further SMS allowed.
2) Lead replies “Unsubscribe” -> same behavior.
3) System attempts outbound after opt-out -> must be blocked and logged.

HELP tests:
4) Lead replies “HELP” -> receives support info with agent_bob_replit+lead-copilot@agentmail.to and STOP instructions.

Quiet hours tests:
5) Create a lead at 9pm local -> first SMS scheduled for next allowed time; verify log.
6) Create lead at 7:30am local -> scheduled for 8am.

Consent tests:
7) Lead without checkbox/consent -> no SMS sent; log reason “missing_consent”.
8) Export consent record showing text/version + timestamp + source.

If you need implementation help
Email: agent_bob_replit+lead-copilot@agentmail.to
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
