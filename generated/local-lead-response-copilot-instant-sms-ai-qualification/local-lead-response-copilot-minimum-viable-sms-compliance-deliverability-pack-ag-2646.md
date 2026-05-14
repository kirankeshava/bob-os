# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Pack (Agency + Engineering)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T05:44:31.195Z

---

# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Pack

**Purpose (wartime MVP):** Prevent pilot launches from getting blocked by the 4 common killers: unclear opt-in, missing STOP handling, texting at night, and missing audit trail. This pack is designed for agencies to copy/paste and for engineering to implement quickly.

**Product legitimacy references for agencies/customers**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Minimum compliance checklist (must-have)
1. **Consent captured at the lead source** (form or ad). Consent language must mention automated texts + marketing, msg frequency, “Msg & data rates may apply,” and STOP/HELP.
2. **STOP handling works globally** (any lead texting STOP is suppressed across all campaigns/clients for that sending number/brand).
3. **HELP handling responds with support info**.
4. **Quiet hours enforced by lead timezone** (default: 8am–8pm local time).
5. **Consent logging**: store proof of opt-in (source, timestamp, IP if available, form/ad copy version, and the exact consent language shown).

If these are done, most agencies can launch pilots safely while deeper A2P/10DLC and deliverability tuning proceeds.

---

## 2) Copy/paste opt-in language (Typeform / Webflow / Meta Lead Ads)

### A) Universal short consent (fits most forms)
**Checkbox label (recommended unchecked by default):**
“I agree to receive automated text messages from {BUSINESS_NAME} about my request, including appointment scheduling and service updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase.”

**Microtext under button:**
“By submitting, you agree to receive texts related to your request. Reply STOP to opt out. See Privacy Policy and Terms: {PRIVACY_URL} | {TERMS_URL}”


### B) Webflow embed-ready snippet (example)
Add directly below your form submit button:

“By clicking Submit, you consent to receive **automated SMS** from {BUSINESS_NAME} regarding your inquiry (appointment scheduling and service updates). **Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.** Consent not required to purchase. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}”


### C) Typeform (field + description)
Add a **Yes/No** field:
- Question: “SMS Updates?”
- Description (paste):
“Select Yes to receive automated texts from {BUSINESS_NAME} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}”

Logic: Only pass leads into SMS if the user selected **Yes**.


### D) Meta/Facebook Lead Ads (higher scrutiny)
In the lead form **disclaimer/custom question** area, include:
“By submitting, you agree to receive automated marketing and informational text messages from {BUSINESS_NAME} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy: {PRIVACY_URL} Terms: {TERMS_URL}”

**Important:** Ensure the language displayed in the ad/form matches what you log as the “consent_text_version”.

---

## 3) Message templates (safe wording)

### Initial speed-to-lead (first message)
“Hi {first_name}, this is {agent_name} with {BUSINESS_NAME}. Saw your request for {service}. Are you looking to get this done **today, this week, or later**?”

Footer (optional if you already disclosed at opt-in):
“Reply STOP to opt out, HELP for help.”

### Qualification follow-up
“Got it—what’s the service address (street + ZIP) so we can confirm availability?”

### Booking CTA
“Thanks. We can do a quick call or book an appointment. What works best?
1) Call now
2) Schedule a time”

### Missed-call textback (if you implement)
“Hi {first_name}—sorry we missed you. Want to book a time for {service}? Reply with a good time window.”

Avoid: excessive caps, multiple links, “free!!!”, “limited time”, “act now”, or repeated identical sends.

---

## 4) STOP / HELP handling (engineering spec)

### Keywords to treat as STOP
Case-insensitive, trim punctuation/spaces. Match whole message after normalization.
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

**Behavior:**
1. Immediately mark the sender phone number as **suppressed** (global suppression list scoped to the sending brand/number/messaging service).
2. Send one confirmation message:
“You’re opted out and will no longer receive text messages from {BUSINESS_NAME}. Reply START to re-subscribe.”
3. Block all future outbound messages to that number unless a resubscribe keyword is received.

### Re-subscribe keywords
- START, YES, UNSTOP

Confirmation:
“You’re re-subscribed. Reply STOP to opt out, HELP for help.”

### HELP keywords
- HELP, INFO

Response:
“{BUSINESS_NAME} SMS support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

### Logging requirements (minimum fields)
For every inbound message event:
- lead_phone, inbound_body, normalized_body, received_at_utc
- action_taken: {none|help_sent|stop_suppressed|start_unsuppressed}
- suppression_state_after
For consent:
- consent_status, consent_timestamp, consent_source (webflow/typeform/meta/etc)
- consent_text_version (exact string shown), privacy_url, terms_url

---

## 5) Quiet hours by timezone (engineering spec)

**Default window:** send messages only between **08:00–20:00** lead local time.

### Timezone resolution order
1. Lead-provided address ZIP → timezone map
2. Area code (phone NPA) → timezone guess
3. IP timezone from form submission (if available)
4. Fallback: business timezone

### Behavior
- If a message would be sent during quiet hours: **queue it** for next allowed time (08:05 local).
- If lead replies during quiet hours: allowed to respond **only if** user initiated the message within the last 15 minutes; otherwise queue.
- Owner/admin override: “send_now” flag for exceptional cases (logged with user + reason).

---

## 6) Agency handoff (10-minute go-live)
1. Paste the correct opt-in snippet into the form/ad (Section 2). Ensure checkbox is present when possible.
2. Confirm the lead source passes: phone number, timestamp, source, and consent=yes.
3. Run verification:
   - Submit test lead with your phone → confirm first SMS arrives within 60 seconds.
   - Reply “HELP” → confirm support response.
   - Reply “STOP” → confirm opt-out confirmation.
   - Trigger another outbound attempt → confirm it is blocked/suppressed.
4. Confirm quiet-hours: set a test lead timezone and simulate send at 21:00 local → confirm queued.

If anything fails, contact: agent_bob_replit+lead-copilot@agentmail.to and include: sending number, test phone, timestamps, and message bodies.
