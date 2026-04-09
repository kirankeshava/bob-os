# Local Lead Response Copilot — Minimum-Viable Compliance + Deliverability Handoff (Pilot-Ready)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T14:50:46.747Z

---

# Local Lead Response Copilot — Minimum‑Viable Compliance + Deliverability Handoff (Pilot‑Ready)

Legitimacy links for agencies/prospects:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) What we must have for the first paid pilots (MVCC)
This is the minimum to avoid carrier blocks, TCPA/CTIA issues, and onboarding churn:
1) **Explicit opt‑in language at lead capture** (form or ad), including automated texts + STOP/HELP + message rates disclaimer.
2) **STOP handling** that immediately suppresses future texts to that number (global suppression list).
3) **HELP handling** that provides identity + contact channel.
4) **Quiet hours** to avoid sending late-night automated texts (by recipient timezone where possible).
5) **Consent logging**: timestamp + source + text of disclosure shown + lead phone.

## 2) Copy/paste opt‑in snippets (agencies can deploy today)
Use one of the following depending on lead source. Keep the language close to this; do not “optimize it away.”

### 2.1 Webflow / Website form (under the phone field)
**Checkbox label (recommended):**
“I agree to receive automated text messages about my request from [BUSINESS NAME] at the number provided. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

**Micro text below checkbox (optional):**
“By submitting, you agree to our Terms and Privacy Policy: [TERMS_URL] | [PRIVACY_URL].”

**Implementation notes (minimum fields to store):**
- phone_number
- consent_checked (true/false)
- consent_timestamp (ISO)
- consent_source = “webflow_form”
- consent_language_version (e.g., “mvcc-v1”) + the exact text shown

### 2.2 Typeform
Add a **Yes/No** question before submission:
**Question:** “Do you agree to receive automated text messages from [BUSINESS NAME] about your request?”
**Description (paste):**
“Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

Store: response, timestamp, typeform form ID.

### 2.3 Meta/Facebook Lead Ads (Instant Forms)
In the **Privacy Policy / custom disclaimer** section, paste:
“By submitting this form, you agree to receive automated text messages from [BUSINESS NAME] about your request at the number provided. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL].”

**Reminder:** Ensure the ad account’s privacy policy URL points to the same privacy page.

## 3) Message templates (safe defaults)
Principles:
- Identify the business quickly.
- No misleading urgency (“FINAL NOTICE”), no all caps, no excessive punctuation.
- Keep links minimal; prefer branded domain when available.
- Include STOP/HELP at least in the **first message** and any **re‑engagement**.

### 3.1 First response (immediate)
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. What’s the address/ZIP for the job?”

(If desired for strictness, append):
“Reply STOP to opt out, HELP for help.”

### 3.2 Qualification follow-up (if no response in ~2–5 min)
“Quick question so I can match you with the right time: is this for {option_a} or {option_b}?”

### 3.3 Booking prompt
“Thanks. Want the soonest available, or a specific day/time window? (e.g., today afternoon / tomorrow morning)” 

### 3.4 Confirmation
“Perfect — you’re set for {day} {time}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

### 3.5 Missed-call textback (if you support it)
“Sorry we missed you — this is {business_name}. What service do you need and what’s your address/ZIP? I can get you scheduled.”

### 3.6 Re-engagement (24–72 hours later, only if consent captured)
“Hi {first_name}, checking in — do you still want help with {service}? Reply 1) Yes 2) No. Reply STOP to opt out, HELP for help.”

## 4) STOP / HELP handling (must-implement behavior)
### 4.1 Keywords to treat as STOP (case-insensitive, trimmed)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

**Behavior:**
- Immediately mark number as **opted_out=true** in a **global suppression list**.
- Send one final confirmation:
  “You’re opted out and will no longer receive texts from {business_name}. Reply START to re-subscribe.”
- Block all future outbound messages to that number across all subaccounts/locations for that customer.

### 4.2 Keywords to treat as HELP
HELP, INFO

**Reply:**
“{business_name}: We text about your service request and scheduling. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

### 4.3 START handling (optional but recommended)
If user texts START (or YES):
- remove from suppression list
- reply: “You’re re-subscribed. Reply STOP to opt out.”

### 4.4 Logging required (for audits/disputes)
For each inbound message:
- from_number, to_number, timestamp
- raw_body
- matched_intent (STOP/HELP/START/OTHER)
- suppression_list_write (true/false)
- outbound_reply_body (if any)
- correlation_id / message_sid (Twilio)

## 5) Quiet hours (pilot-safe policy + implementation spec)
### 5.1 Customer-facing policy text (paste into onboarding docs)
“We avoid texting leads during local quiet hours to protect your brand. Outside allowed hours, the Copilot queues the first response and sends it at the next available time (unless you override).”

### 5.2 Default window (recommended)
- Allowed sends: **8:00am–8:00pm recipient local time**, Monday–Saturday
- Sunday: optional stricter window (e.g., 10:00am–6:00pm) depending on vertical

### 5.3 Timezone resolution order
1) If lead includes ZIP/address → map to timezone.
2) Else if phone number has reliable area code mapping → use that.
3) Else fallback to business timezone.

### 5.4 Queued-send behavior
If a lead arrives during quiet hours:
- Send nothing immediately.
- Create a queued job for next allowed time.
- If the lead replies during quiet hours, you may respond (user-initiated), but still keep content minimal.

## 6) Twilio deliverability hardening (minimum guidance)
Even before full A2P work, reduce filtering risk:
- Use a **Messaging Service** (not ad-hoc numbers) when possible.
- Keep templates consistent; avoid rotating copy too aggressively.
- Avoid spam triggers: “FREE”, “WINNER”, “URGENT”, “ACT NOW”, excessive emojis, ALL CAPS, many exclamation marks.
- Avoid link shorteners; use your own domain when possible.
- Identify the business in the first message.
- Keep message frequency low; do not batch blast.

### A2P 10DLC note (don’t block pilots, but prepare)
If using US 10DLC long codes at scale, registration is typically required. Start collecting:
- Legal business name, address, EIN (if applicable)
- Website + privacy/terms URLs
- Sample messages (use the templates above)
- Opt-in description (use snippets above)

## 7) Verification checklist (what to test before going live)
1) Submit a test lead with consent → confirm first SMS sends.
2) Reply HELP → confirm HELP response includes support email + website.
3) Reply STOP → confirm confirmation message + suppression flag set.
4) After STOP, attempt outbound send → verify it is blocked and logged.
5) Create a lead during quiet hours → verify it queues and sends at next window.
6) Export consent log for that lead → confirm disclosure text + timestamp retained.

## 8) Agency handoff: “paste this into your client onboarding”
To launch your client:
1) Add the opt‑in checkbox/disclaimer to the form (Webflow/Typeform) or FB Instant Form disclaimer.
2) Ensure you store consent fields (timestamp + source + disclosure version).
3) Confirm STOP/HELP works using the verification checklist.
4) Confirm quiet hours window with the client (default 8a–8p local).
5) Use the default templates provided; do not add promotional language.

If a client asks “is this compliant?”
- “We capture explicit opt‑in at submission, send identification in the first message, support STOP/HELP immediately, suppress opted-out numbers globally, and observe quiet hours. Our policies and support contact are available at the website above, and support is agent_bob_replit+lead-copilot@agentmail.to.”
