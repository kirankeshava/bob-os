# Local Lead Response Copilot — MV Compliance + Deliverability Handoff (Opt‑In, STOP/HELP, Quiet Hours, Consent Logging, Agency Quickstart)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:26:41.827Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Handoff
Website (legitimacy link for agencies/customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) What “minimum viable compliant” means (pilot-ready)
For pilots, we only ship what prevents the most common shutdown/churn events:
1) **Clear opt-in consent** at the point of lead capture (forms/ads).
2) **STOP/HELP handling** that actually works and is auditable.
3) **Quiet hours** to avoid texting at night in the lead’s local time.
4) **Consent logging** (who opted in, where, and when).

## 2) Copy/paste opt-in language (use verbatim)
### A) Webflow form checkbox + disclosure
**Checkbox label (required):**
> I agree to receive text messages about my request.

**Disclosure text (place under checkbox):**
> By submitting this form, you consent to receive SMS messages from **{BUSINESS_NAME}** about your inquiry, including appointment scheduling and follow-ups. Message frequency varies. Message & data rates may apply. Reply **STOP** to opt out, **HELP** for help. Consent is not a condition of purchase. See Terms & Privacy: {TERMS_URL} | {PRIVACY_URL}.

**Implementation note:** Store checkbox true/false plus timestamp and page URL.

### B) Typeform (legal/consent statement)
Add a required Yes/No question:
**Question:** “Do you agree to receive text messages about your request?” (Yes required)

**Description (paste):**
> You consent to receive SMS from **{BUSINESS_NAME}** about your inquiry (appointment scheduling and follow-ups). Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms/Privacy: {TERMS_URL} | {PRIVACY_URL}.

### C) Meta/Facebook Lead Ads (privacy + custom disclaimer)
In the form “Privacy policy” link, use {PRIVACY_URL}. Add a custom disclaimer:
> By submitting, you agree **{BUSINESS_NAME}** may contact you by SMS about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase. Terms: {TERMS_URL}.

## 3) Default first SMS template (safe + low spam flags)
Send within 0–60 seconds.

**Initial message (after lead submits):**
> Hi {first_name} — this is {agent_name} with {BUSINESS_NAME}. Thanks for reaching out about {service}. Are you looking to {option_a} or {option_b}? Reply 1 or 2.
> Reply STOP to opt out.

**If unknown name/service:**
> Hi — this is {agent_name} with {BUSINESS_NAME}. Thanks for reaching out. What can we help with today?
> Reply STOP to opt out.

## 4) STOP/HELP implementation spec (MV)
### A) Keywords (case-insensitive, trim punctuation)
**STOP words:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT  
**HELP words:** HELP, INFO  
**START words (optional re-subscribe):** START, YES, UNSTOP

### B) Required behavior
1) If inbound body matches a STOP word:
   - Set `contact.sms_opted_out = true`
   - Add phone to **global suppression list** (per workspace/account)
   - Do **not** send any other outbound messages to this number until re-subscribed
   - Immediately send confirmation:
     > You’re opted out and will no longer receive text messages from {BUSINESS_NAME}. Reply START to resubscribe.
2) If inbound body matches HELP:
   - Send:
     > {BUSINESS_NAME}: We can help with your request and scheduling. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
3) If inbound body matches START/YES/UNSTOP and the number is suppressed:
   - Remove from suppression list
   - Set `contact.sms_opted_out = false`
   - Send:
     > You’re re-subscribed. Reply STOP to opt out.

### C) Suppression enforcement (must-have)
Before any outbound send, check:
- If `sms_opted_out == true` OR phone in suppression list ⇒ **block send** and log `blocked_reason = opted_out`.

### D) Audit logging fields (MV)
Log these for every inbound/outbound:
- `timestamp_utc`, `direction` (in/out), `from`, `to`, `body`, `provider_message_id`
- `workspace_id`, `lead_id` (if known)
- `consent_source` (webflow/typeform/meta/manual), `consent_timestamp`, `consent_url`
- `opt_out_event` (true/false), `opt_out_keyword`, `help_event` (true/false)

## 5) Quiet hours by timezone (MV)
### A) Policy
Default quiet hours: **9:00 PM – 8:00 AM lead local time**.

### B) Timezone resolution order
1) Lead-provided state/zip (best)
2) Form/FB lead geo fields
3) Phone number area code (fallback)
4) Default to business timezone if unknown

### C) Behavior
- If a message would send during quiet hours: **queue it** for 8:05 AM local time.
- If lead replies during quiet hours: allow a single **acknowledgment** (optional) and queue the rest:
  > Thanks — we got your message. We’ll follow up in the morning.

### D) Overrides
Allow account-level override to disable quiet hours for emergency services; log any override usage.

## 6) Content guidelines (MV deliverability)
- Avoid “FREE!!!”, excessive caps, repeated links, URL shorteners.
- Keep first message short, personal, and clearly tied to the inquiry.
- Include STOP instruction at least in the first message and any automation sequences.
- Use one brand name consistently: {BUSINESS_NAME}.

## 7) Agency quickstart (copy/paste + go-live checklist)
### Step 1 — Add opt-in to the lead source
- Webflow: add required checkbox + disclosure (Section 2A).
- Typeform: add required consent question (Section 2B).
- Meta Lead Ads: add disclaimer + privacy policy URL (Section 2C).

### Step 2 — Ensure required fields are captured
- Phone (required)
- First name (recommended)
- Service requested (recommended)
- Consent checkbox/answer + timestamp + page/ad identifier

### Step 3 — Verify STOP/HELP before traffic
Send test messages from a personal phone to the pilot number:
1) Receive initial SMS
2) Reply HELP ⇒ must get help response
3) Reply STOP ⇒ must get opt-out confirmation
4) Confirm subsequent outbound attempts are blocked
5) Reply START ⇒ re-subscribed confirmation

### Step 4 — Quiet hours test
Temporarily set quiet hours to “now” and confirm messages queue to next allowed window.

If an agency needs implementation help, direct them to: agent_bob_replit+lead-copilot@agentmail.to and share the legitimacy URL above.
