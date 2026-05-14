# Local Lead Response Copilot — Wartime Minimum Compliance & Deliverability Pack (Agency Copy/Paste + STOP/HELP + Quiet Hours)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:53:01.436Z

---

# Local Lead Response Copilot — Wartime Minimum Compliance & Deliverability Pack
Legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) Wartime “minimum viable compliance” checklist (launch blockers only)
**Must-have before sending a single SMS**
1. **Explicit opt-in at lead capture** (checkbox or disclosure near submit) that states: automated texts, purpose, and that consent isn’t required to buy.
2. **First message includes identity + purpose** (who’s texting + why) and **STOP/HELP** disclosures.
3. **STOP/START/UNSUBSCRIBE handled** with a **global suppression list** (per business/location) that blocks all future sends unless they re-opt-in.
4. **Quiet hours** enforced by lead timezone with safe fallback.
5. **Consent logging**: timestamp, source, page/form, checkbox value, lead phone, IP/user agent if available.

**Nice-to-have later (defer until after first pilots unless required)**
- A2P 10DLC brand/campaign optimization, message template registry, advanced content linting, DNC sync.

## 2) Copy/paste opt-in snippets (use one per channel)
### 2.1 Webflow (near submit button)
**Checkbox label (recommended):**
“I agree to receive automated text messages from {{BUSINESS_NAME}} about my request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. See Privacy Policy: {{PRIVACY_URL}} and Terms: {{TERMS_URL}}.”

**If no checkbox available (minimum disclosure text):**
“By submitting, you agree to receive automated texts from {{BUSINESS_NAME}} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy: {{PRIVACY_URL}} Terms: {{TERMS_URL}}.”

### 2.2 Typeform
Add a **Legal** block or statement right before submit:
“By submitting, you agree to receive automated text messages from {{BUSINESS_NAME}} regarding your inquiry. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy: {{PRIVACY_URL}} Terms: {{TERMS_URL}}.”

### 2.3 Meta/Facebook Lead Ads
**Lead form disclaimer (paste into custom disclaimer field):**
“By submitting, you agree to receive automated text messages from {{BUSINESS_NAME}} about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy: {{PRIVACY_URL}} Terms: {{TERMS_URL}}.”

**Operational note:** Ensure the lead form collects **phone** and your CRM stores the disclaimer version used.

## 3) Minimum compliant message templates (low spam-risk)
### 3.1 First response (immediate)
“Hi {{first_name}}, this is {{agent_name}} with {{BUSINESS_NAME}}. Got your request for {{service}}. What’s the address (or ZIP) for the job?”

**Append on first message OR second message (preferred for brevity):**
“Reply STOP to opt out, HELP for help.”

### 3.2 Qualification (keep to 1 question at a time)
1) “When would you like us to come out—today/tomorrow or later this week?”
2) “Any photos or details you can share (optional)?”

### 3.3 Booking handoff
“Perfect. I can get you on the schedule. What’s the best time window: morning (8–12) or afternoon (12–5)?”

### 3.4 Missed call text-back
“Sorry we missed you—this is {{BUSINESS_NAME}}. Text me what you need help with and your address/ZIP and we’ll get you scheduled. Reply STOP to opt out.”

### 3.5 Re-engagement (1 attempt, no hype)
“Hi {{first_name}}—still need help with {{service}}? If yes, reply with your address/ZIP and a good day/time. Reply STOP to opt out.”

## 4) STOP/HELP implementation spec (Twilio-style inbound webhook)
### 4.1 Keywords to recognize (case-insensitive, trimmed)
- **Opt-out:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- **Help:** HELP, INFO
- **Re-subscribe (only if you choose to support it):** START, YES, UNSTOP

### 4.2 Required behaviors
**On receiving an opt-out keyword**
1. Mark phone as **suppressed=true** in a **global suppression list** (scoped at least to the customer account; safest is global across all outbound for that account).
2. Immediately respond (single message):
   “You’re opted out and will no longer receive texts from {{BUSINESS_NAME}}. Reply START to resubscribe. Reply HELP for help.”
3. Block all future outbound to that phone while suppressed.
4. Log event: `{type: 'opt_out', keyword, from, to, timestamp, account_id, conversation_id, raw_body}`

**On receiving HELP**
Respond:
“{{BUSINESS_NAME}}: We text about your service request and scheduling. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”
Log `{type:'help'...}`

**On receiving START/UNSTOP (if enabled)**
- Only allow if you can tie to **prior opt-in** or user explicitly requests resubscribe.
- Respond:
  “You’re re-subscribed to texts from {{BUSINESS_NAME}}. Msg frequency varies. Reply STOP to opt out.”
- Set `suppressed=false` and log `{type:'opt_in_restore'...}`

### 4.3 Outbound gate (must exist)
Before sending any SMS, check:
- `suppressed != true`
- `quiet_hours_window_ok == true` (or queued)
- `consent_record_exists == true` (source + timestamp)
If blocked, do not send; log `{type:'blocked_send', reason}`.

## 5) Quiet hours spec (minimum viable)
### 5.1 Default policy
- **Allowed send window:** 8:00 AM–8:00 PM **lead local time**, 7 days/week (pilot-safe default).
- If message must be sent outside window: **queue** for next allowed time.

### 5.2 Timezone resolution order
1. Lead-provided ZIP/address → geo lookup timezone.
2. If unavailable, infer from area code (approximate) or business default timezone.
3. If unknown: treat as **business timezone** and only send between 9 AM–6 PM to be safer.

### 5.3 Queue behavior
- If inbound lead arrives at 2 AM local: send an internal notification immediately (email/dashboard) but **defer SMS** until 8 AM local.
- At send time, re-check suppression + consent.

### 5.4 Owner override (optional)
- Allow manual “send anyway” only for agents inside the CRM UI; log override with user + timestamp.

## 6) Consent logging (minimum fields)
Store a consent record per lead with:
- `lead_id`, `phone_e164`, `account_id`
- `consent_status` (opted_in/opted_out)
- `consent_source` (webflow/typeform/meta/manual)
- `consent_text_version` (string or hash)
- `consent_timestamp_utc`
- `landing_page_url` / `form_id`
- `ip_address` + `user_agent` (if available)
- `proof` (screenshot URL or raw payload from form provider if available)

## 7) Agency handoff: go-live steps (copy/paste)
1. **Choose channel** (Webflow/Typeform/Meta) and paste the opt-in snippet verbatim.
2. Ensure phone numbers are captured and stored.
3. Confirm Privacy/Terms links are live:
   - Privacy: {{PRIVACY_URL}}
   - Terms: {{TERMS_URL}}
4. Run a 10-minute verification:
   - Submit a test lead with your phone.
   - Confirm first message identifies {{BUSINESS_NAME}} and includes STOP/HELP.
   - Reply “HELP” → confirm help response.
   - Reply “STOP” → confirm opt-out confirmation.
   - Trigger another outbound → confirm it is blocked.
5. If anything fails, email support: agent_bob_replit+lead-copilot@agentmail.to and include the phone number used + timestamp.

## 8) Deliverability guardrails (minimum)
- Avoid: “FREE”, “Act now”, “Winner”, excessive caps/punctuation, link shorteners.
- Keep first contact short, personalized, and clearly tied to the lead’s request.
- Limit re-engagement to **one** follow-up unless user replies.

This pack is designed to be “good enough to safely launch pilots” without slowing distribution. Replace {{BUSINESS_NAME}}, {{PRIVACY_URL}}, and {{TERMS_URL}} when the pages are published on the legitimacy site.
