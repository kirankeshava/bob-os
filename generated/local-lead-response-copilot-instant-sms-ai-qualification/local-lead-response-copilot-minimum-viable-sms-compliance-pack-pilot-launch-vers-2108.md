# Local Lead Response Copilot — Minimum‑Viable SMS Compliance Pack (Pilot Launch Version)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:44:30.097Z

---

# Local Lead Response Copilot — Minimum‑Viable SMS Compliance Pack (Pilot Launch Version)

**Use case:** Instant SMS to new leads from forms/FB ads, AI qualification, and booking for local/home-service businesses.

**Legitimacy link to share:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Support email (include in HELP and footer):** agent_bob_replit+lead-copilot@agentmail.to

---
## 1) Minimum compliance checklist (what must be true before sending)
1. **Express written consent captured** at the point of lead capture (checkbox or clear disclosure near submit).
2. **Disclosure includes:** “automated texts”, “msg & data rates may apply”, “msg frequency varies”, and **STOP/HELP**.
3. **Stop handling is enforced**: any STOP-family keyword triggers global suppression for that recipient across all future sends.
4. **Help handling works**: HELP returns business identification + support email + STOP instruction.
5. **Quiet hours are respected**: no outbound SMS during local nighttime window (default 8pm–8am lead local time) unless manually overridden for an active conversation.
6. **Consent logging exists**: store timestamp, source, IP/user agent (if available), and the exact disclosure text shown.

---
## 2) Copy/paste opt-in language (by lead source)
### A) Webflow form (checkbox + disclosure)
**Checkbox label (recommended):**
> I agree to receive automated text messages about my request.

**Disclosure text (place directly under checkbox or submit button):**
> By submitting this form, you consent to receive **automated SMS** messages from 
> **[BUSINESS NAME]** about your request, including appointment scheduling and service updates. 
> **Msg frequency varies. Msg & data rates may apply.** Reply **STOP** to opt out, **HELP** for help. 
> See Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Implementation note:** Make the checkbox required. Store a boolean like `sms_consent=true`.

### B) Typeform
**Add a “Legal” statement and/or required yes/no question.**

**Yes/No question prompt:**
> Do you agree to receive automated text messages about your request?

**Yes option:** Yes, I agree

**Legal / description (below):**
> Consent to receive **automated SMS** from **[BUSINESS NAME]**. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Routing rule:** only enroll in SMS if the answer = Yes.

### C) Meta/Facebook Lead Ads
In the Lead Form, add a **custom disclaimer**.

**Disclaimer text:**
> By submitting, you agree to receive **automated text messages** from **[BUSINESS NAME]** about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms & Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Operational note:** If Meta’s layout truncates, prioritize: automated SMS + STOP/HELP + msg/data rates.

---
## 3) Message templates (pilot-ready, low-risk)
### Initial speed-to-lead (first message)
> Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. Got your request for {{service}} in {{city}}. Are you looking to book **today or this week**? Reply STOP to opt out.

### Qualification (short)
> Great—what’s the address (or nearest cross street) for the job? Reply STOP to opt out.

### Booking prompt
> Thanks. What time works best for a quick call/estimate: **morning**, **afternoon**, or **evening**? Reply STOP to opt out.

### Confirmation
> You’re set for {{time_window}}. If anything changes, reply here. Reply STOP to opt out, HELP for help.

### Missed-call text back
> Sorry we missed you—this is {{business_name}}. Want to schedule your {{service}} estimate? Reply with a good time. Reply STOP to opt out.

**Content guardrails (reduce carrier filtering):**
- Avoid “FREE!!!”, “limited time”, heavy punctuation, ALL CAPS, URL shorteners, and repeated links.
- Do not include unrelated promos; keep messages strictly tied to the lead’s request.
- Always identify the business early.

---
## 4) STOP / HELP handling (implementation spec)
### Keywords to treat as STOP (case-insensitive, trimmed)
`STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT`

**Behavior on STOP:**
1. Immediately set `sms_opt_out=true` for that phone number (global suppression).
2. Log event: `event_type=STOP`, `timestamp`, `from_number`, `to_number`, `message_body`, `campaign/source`.
3. Send one confirmation message (exactly once):
> You’re opted out and will no longer receive texts from {{business_name}}. Reply HELP for help.
4. Block all future outbound messages to that number unless they later re-consent through a new form opt-in.

### HELP keyword
`HELP`

**Behavior on HELP:**
- Do not opt-out.
- Reply:
> {{business_name}}: We text about your service request and scheduling. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to

### Other keywords
- Ignore random profanity/typos; do not treat as STOP unless it matches STOP-family exactly.

---
## 5) Quiet hours (minimum viable)
**Default rule:** Do not send outbound SMS between **8:00pm and 8:00am** in the **lead’s local timezone**.

### Timezone resolution order
1. Lead-provided state/ZIP → map to timezone.
2. Business service area default timezone.
3. If unknown: assume business timezone and err on the side of not sending.

### Queue behavior
- If message would be sent during quiet hours, queue it for **8:05am local time**.
- If the lead texts inbound during quiet hours, it is acceptable to respond (conversational exception) but keep it minimal.

---
## 6) Consent logging (what to store)
Store a `consent_record` per lead:
- `phone_e164`
- `consent_status` (true/false)
- `consent_timestamp`
- `consent_source` (webflow/typeform/meta)
- `consent_text_version` (exact disclosure text)
- `landing_page_url` (if available)
- `ip_address` + `user_agent` (if available)

Also store messaging events:
- outbound/inbound body, timestamps, delivery status
- STOP/HELP events as separate event types

---
## 7) Agency handoff: go-live checklist (copy/paste)
1. Add the opt-in disclosure + required checkbox/yes-no question to the form.
2. Ensure the form sends: first name, phone, service requested, city/ZIP, and consent flag.
3. Confirm initial message template includes business identification + STOP.
4. Test STOP end-to-end:
   - Send “STOP” from a test phone.
   - Verify you receive the opt-out confirmation.
   - Verify the system blocks all future outbound messages to that phone.
5. Test HELP:
   - Send “HELP” and confirm support email returns.
6. Test quiet hours:
   - Set a test lead timezone and ensure after-hours messages are queued.

**If an agency asks “are you compliant?”**
- We capture express consent at lead capture with automated SMS disclosure.
- Every message supports STOP/HELP.
- STOP triggers global suppression and blocks future sends.
- Quiet hours enforced by lead timezone with safe fallback.
- Consent and message events are logged for audit.

---
## 8) Twilio deliverability minimum notes (no spend actions)
- Use a **Messaging Service** (recommended) to manage sender(s), sticky sender, and compliance features.
- Keep templates consistent; avoid frequent template churn.
- If using 10DLC at scale, prepare for **A2P registration** (brand + campaign) to prevent filtering.

If you need help implementing any of the above, contact: agent_bob_replit+lead-copilot@agentmail.to and reference https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
