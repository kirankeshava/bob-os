# Local Lead Response Copilot — Pilot‑Safe SMS Compliance & Deliverability Pack (Copy/Paste + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:16:32.901Z

---

Purpose: This is the minimum viable compliance + deliverability package required to safely launch pilots (home services/local lead gen) without getting blocked by carriers or violating basic TCPA/CTIA expectations. Use this to remove sales objections and to harden onboarding. Business legitimacy links: Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to

1) OPT‑IN / CONSENT LANGUAGE (COPY/PASTE)

A) Webflow / Website Form Checkbox (recommended)
Checkbox label (unchecked by default):
“I agree to receive text messages about my request from {BUSINESS_NAME} at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Below the checkbox (small text):
“By submitting, you confirm you are the subscriber/owner of this number and consent to receive messages (including automated texts) related to your request. Terms: {TERMS_URL} | Privacy: {PRIVACY_URL}.”
Implementation notes:
- Use an explicit checkbox (not pre-checked). Store timestamp, page URL, IP (if available), and the exact consent text version.

B) Typeform (consent statement)
Add a required “Consent” question:
“I consent to receive text messages from {BUSINESS_NAME} about my request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”

C) Meta / Facebook Lead Ads (higher risk; ensure disclaimer)
In the Lead Form ‘Custom Disclaimer’:
“By submitting this form, you agree to receive text messages from {BUSINESS_NAME} about your request at the number provided (automated texts may be used). Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
Operational note: FB leads sometimes contain shared/family numbers; qualification flow must confirm they are the right contact.

2) FIRST MESSAGE + QUALIFICATION TEMPLATES (COMPLIANT & DELIVERABILITY‑SAFER)

Global rules:
- No “FREE!!!”, “guaranteed”, “act now”, excessive punctuation/caps.
- Keep links minimal; if included, use your own domain when possible.
- Always identify the business early.

Template 0 — Immediate first text (upon lead submit)
“Hi {first_name}—this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. A couple quick questions to get you the right time/price—what’s your ZIP code?”
(If you need STOP/HELP disclosure in first message for a new thread, add at end)
“Reply STOP to opt out, HELP for help.”

Template 1 — Confirm job type
“Thanks. What best describes the job? Reply with 1) Repair 2) Install 3) Quote/Estimate 4) Other”

Template 2 — Timing
“When would you like this done? 1) ASAP 2) This week 3) Next week”

Template 3 — Booking handoff
“Perfect—want to book a quick call or appointment? Reply 1) Call me 2) On‑site estimate 3) Just send a ballpark”

Template 4 — If ‘Call me’
“Great. What’s a good time today: 1) Morning 2) Afternoon 3) Evening? (Include timezone if you’re not local.)”

Template 5 — Re‑engagement (after 24–48h, only once)
“Hi {first_name}—still want help with {service}? If yes, reply 1) Yes 2) Not now. Reply STOP to opt out.”

3) STOP / HELP HANDLING (IMPLEMENTATION SPEC)

Keyword matching (case-insensitive, trim punctuation/whitespace):
STOP words: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP words: HELP, INFO

Behavior:
A) On inbound STOP keyword:
- Mark contact as “opted_out=true” immediately.
- Add phone to a global suppression list for that subaccount/workspace.
- Send one confirmation message (only once per opt-out event):
“You’re opted out and will no longer receive texts from {BUSINESS_NAME}. Reply START to resubscribe. Help: agent_bob_replit+lead-copilot@agentmail.to”
- Block all future outbound messages to that phone unless they explicitly resubscribe.

B) On inbound HELP keyword:
Send:
“{BUSINESS_NAME} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
Do not change subscription state.

C) Optional resubscribe:
If inbound START/YES (after opt-out), you may set opted_out=false and respond:
“You’re resubscribed. Reply STOP to opt out.”

Audit logging requirements (store for each inbound STOP/HELP/START):
- phone_e164, workspace/customer_id, keyword_detected, raw_inbound_body, message_sid/provider_id, timestamp_utc, action_taken (opt_out, help_sent, resubscribe), actor (system), and sending_number.

4) QUIET HOURS BY TIMEZONE (IMPLEMENTATION SPEC)

Goal: avoid sending texts at night; queue instead.
Defaults (recommended for pilots):
- Allowed window: 9:00 AM–8:00 PM recipient local time, Mon–Sat. Sunday optional (either block or 12–6 PM).
Timezone resolution order:
1) Lead-provided state/ZIP → timezone lookup
2) Area code lookup for phone
3) Business default timezone (configured per customer)
If timezone unknown: treat as business default AND be conservative (send only 10 AM–6 PM).

Queue behavior:
- If message would send outside window: schedule for next allowed time.
- If multiple queued: send only the newest relevant prompt (drop redundant nudges).
Emergency override:
- Allow manual send by owner/admin with explicit confirmation “outside quiet hours”.

5) CONSENT LOGGING (MINIMUM REQUIRED FIELDS)
For each lead:
- consent_status: granted/denied/unknown
- consent_source: webform/typeform/fb/other
- consent_text_version: store the exact consent language shown
- consent_timestamp_utc
- consent_page_url or form_id
- lead_phone_e164
- lead_ip (if captured)
- user_agent (if captured)
This is what you show if a customer asks “are we covered?” during onboarding.

6) TWILIO / DELIVERABILITY HARDENING (NO-SPEND GUIDANCE)
- Use a Twilio Messaging Service (groups numbers, adds sticky sender, helps scaling).
- Avoid URL shorteners; avoid repeated identical messages across many recipients.
- Keep initial message conversational and contextual (“Got your request for X”).
- If using 10DLC: prepare Brand + Campaign info early; expect that at scale registration may become mandatory. (Do not promise ‘no registration’—instead: “We follow A2P best practices and will register when required.”)

7) AGENCY HANDOFF — “PASTE THIS + GO LIVE” CHECKLIST
Step 1: Add consent language to the lead capture source (use Section 1).
Step 2: Ensure lead payload includes: first name, phone, service, ZIP (or city), and source.
Step 3: Configure first message = Template 0 (Section 2) and ensure STOP/HELP is enabled (Section 3).
Step 4: Enable quiet hours (Section 4) with customer timezone.
Step 5: Verify compliance in 10 minutes (manual tests):
- Submit your own lead → confirm first text arrives.
- Reply HELP → get help response.
- Reply STOP → get opt-out confirmation.
- Attempt another outbound → MUST be blocked.
Legitimacy/support to share with clients: Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to

8) STOP/HELP VERIFICATION MATRIX (FOR INTERNAL QA)
Test cases (record results):
1. Inbound “STOP” → opted_out=true, confirmation sent, outbound blocked.
2. Inbound “Stop.” (punctuation) → same.
3. Inbound “UNSUBSCRIBE” → same.
4. Inbound “HELP” → help response sent, no opt-out.
5. Inbound non-keyword (“please stop texting me”) → optional: treat as STOP via fuzzy matching OR route to human review; for MVP, recommend keyword-only + human review flag.
6. Resubscribe “START” after STOP (if supported) → opted_out=false, confirmation sent.
Log evidence to capture: raw inbound body, detected keyword, action taken, timestamp, and suppression check result.

Owner note: This pack intentionally focuses on “pilot-safe” minimum viable compliance. Full legal hardening can be expanded later, but STOP/HELP + consent capture + quiet hours + suppression logging must exist before scaling any outbound volume.