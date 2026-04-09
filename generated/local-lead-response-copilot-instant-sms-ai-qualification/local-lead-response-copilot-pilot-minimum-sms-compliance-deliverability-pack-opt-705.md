# Local Lead Response Copilot — Pilot-Minimum SMS Compliance + Deliverability Pack (Opt‑In, STOP/HELP, Quiet Hours, Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T09:15:14.084Z

---

## Purpose (wartime / pilot-minimum)
This pack is the minimum set of compliance + deliverability safeguards required to run pilots without triggering carrier enforcement or TCPA/CTIA objections. It prioritizes: (1) explicit opt-in language, (2) working STOP/HELP, and (3) basic quiet-hours.

**Business site (legitimacy link for customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Support email:** agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Copy/paste opt-in language (use as-is)
### A) Webflow / website form checkbox (recommended)
Add a required checkbox with this label:
> **SMS Consent:** By checking this box and submitting, you agree to receive text messages about your request from **[Company Name]** at the phone number provided. Msg & data rates may apply. Msg frequency varies. Reply **STOP** to cancel, **HELP** for help.

Under the checkbox (small text) add:
> See Privacy/Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Required fields to capture:** phone number, timestamp, page URL, checkbox=true, IP (if available), and form name.

### B) Typeform (consent statement)
Add a “Statement” block before submit:
> By submitting, you consent to receive text messages about your request from **[Company Name]** at the number provided. Msg & data rates may apply. Msg frequency varies. Reply **STOP** to cancel, **HELP** for help. Privacy/Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Add a required yes/no question:
> Do you agree to receive SMS updates about your request?
Answers: Yes (required)

### C) Meta/Facebook Lead Ads (disclaimer)
In the Lead Form “Privacy Policy” / “Custom Disclaimer” section:
> By submitting, you agree to receive text messages regarding your request from **[Company Name]** at the number provided. Msg & data rates may apply. Msg frequency varies. Reply **STOP** to cancel, **HELP** for help. Privacy/Terms: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Note:** Ensure the lead form collects phone number. Do not text leads if phone is missing or clearly invalid.

---

## 2) Message templates (pilot-minimum, carrier-safe)
**First message (send immediately after lead):**
> Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. Got your request for {{service}}. What’s the address (or ZIP) for the work? Reply STOP to opt out.

**Qualification follow-up (if no reply in 3–5 minutes):**
> Quick question so we can help: is this for today/tomorrow, or later this week? Reply STOP to opt out.

**Booking offer (after basic qualification):**
> Thanks—want to book a quick call or set an appointment? Reply 1) Call me 2) Text estimate 3) Schedule a visit. Reply STOP to opt out.

**HELP response (must be immediate):**
> Help: You’re receiving texts because you requested info from {{business_name}}. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to

**STOP confirmation (must be immediate):**
> You’re opted out and will no longer receive texts from {{business_name}}. Reply START to opt back in.

**Re-opt-in (START) confirmation (optional but recommended):**
> You’re opted back in. What can we help you with?

---

## 3) STOP/HELP handling — implementation spec (Twilio-compatible)
### Keywords to detect (case-insensitive, trim whitespace)
- **STOP set:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- **HELP set:** HELP, INFO
- **START set (re-opt-in):** START, YES, UNSTOP

### Rules
1) If inbound message matches STOP set:
- Immediately send STOP confirmation template.
- Add the phone number to a **global suppression list** for that customer account (and optionally for the workspace).
- Block all future outbound messages to that number unless a START message is received.
- Log an audit record (see consent logging below).

2) If inbound message matches HELP set:
- Immediately send HELP response template.
- Do **not** change opt-in status.
- Log the HELP event.

3) If inbound message matches START set:
- If number is suppressed due to STOP, mark as re-opted-in.
- Send re-opt-in confirmation.
- Log event.

### Twilio wiring (most common)
- Configure Twilio to POST inbound messages to: `/sms/inbound` (or existing inbound route).
- Parse `From`, `To`, `Body`, `MessageSid`, `AccountSid`.
- Run keyword logic before any AI/qualification logic.
- If STOP/HELP handled, short-circuit and do not forward to AI.

### Required outbound guard
Before sending any outbound SMS:
- Check suppression list for `to_phone`.
- If suppressed: do not send; log `blocked_reason=opted_out`.

---

## 4) Quiet hours (pilot-minimum)
Goal: avoid texting at obviously inappropriate times. For pilots, implement a simple rule that can be explained to customers.

**Default window:** send only between **8:00 AM and 8:00 PM local time**.

**Timezone resolution order (best available):**
1) Lead-provided ZIP/address → map to timezone
2) Area code of phone number → approximate timezone
3) Business timezone (account default)

**Behavior if outside quiet hours:**
- Queue message and send at next allowed time (8:00 AM local).
- If lead is marked “emergency/after-hours allowed” by business settings, allow override.

**Minimum required disclosure (internal):** document that quiet hours are enforced and configurable per customer account.

---

## 5) Consent logging (minimum viable audit trail)
Store a record per lead:
- `lead_id`, `phone_e164`, `source` (webflow/typeform/meta), `opt_in_text` (exact disclaimer shown), `opt_in_checked` (true/false), `timestamp_utc`, `ip` (if captured), `form_url`, `referrer`, `user_agent` (if captured)
- Messaging events: inbound/outbound message id, timestamp, template name, STOP/HELP/START events, suppression changes

This is what you need if a customer asks “prove consent” or if Twilio requests evidence.

---

## 6) Agency handoff — go-live checklist (copy/paste)
1) Add the opt-in checkbox/disclaimer to the lead source (Webflow/Typeform/Meta) using the snippets above.
2) Ensure phone number is required and collected.
3) Confirm your first message includes at least “Reply STOP to opt out.”
4) Confirm STOP/HELP works:
   - Text STOP from a test phone → you receive opt-out confirmation and future texts are blocked.
   - Text HELP → you receive support/help message.
5) Confirm quiet-hours:
   - Submit a test lead outside 8am–8pm local → message is queued, not sent immediately.
6) For any issues, contact: agent_bob_replit+lead-copilot@agentmail.to and reference the product site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

---

## 7) Deliverability basics (don’t get filtered)
- Avoid ALL CAPS, excessive punctuation, shortened links from unknown domains, and “free/guarantee/urgent” style spam wording.
- Keep the first text directly tied to the user’s request (service + context).
- Include business name early.
- Don’t send high volume from a brand-new number; ramp gradually per account.

If using Twilio long code at scale, A2P 10DLC registration may be required; start it once sending route is confirmed (no spend assumed to start, but carriers may impose fees later).