# Local Lead Response Copilot — MV Compliance + Deliverability Master Agency Handoff (Copy/Paste Pack + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:44:51.530Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Master Agency Handoff

**Use this document to launch pilots fast while staying “minimum viable compliant” and reducing carrier filtering risk.**

**Business proof URL (share with prospects / include in forms):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
**Support / compliance contact:** agent_bob_replit+lead-copilot@agentmail.to

---

## 1) What “compliant enough for pilots” means
For any SMS sent to a lead, you must have:
1) **Express written consent** (checkbox or clear disclosure on form/ad) to receive autodialed/automated texts.
2) **Clear disclosures**: message frequency, “Msg & data rates may apply”, STOP/HELP keywords, and Privacy/Terms links.
3) **STOP handling**: immediate confirmation + global suppression (no further texts).
4) **Quiet hours**: don’t text at night in the lead’s local timezone; defer until morning.
5) **Consent logging**: store proof of consent + message history for disputes.

This document provides copy/paste snippets + exact behaviors.

---

## 2) Copy/paste opt-in language (use verbatim where possible)

### A) Webflow / website form (recommended checkbox)
**Checkbox label (unchecked by default):**
> I agree to receive text messages from {{BUSINESS_NAME}} about my request at the phone number provided. Reply STOP to opt out, HELP for help. Msg frequency varies. Msg & data rates may apply. By submitting, you agree to the Terms and Privacy Policy.

**Under-form disclosure (small text):**
> By submitting this form, you consent to receive SMS messages from {{BUSINESS_NAME}} related to your inquiry. Consent is not a condition of purchase. Reply STOP to unsubscribe, HELP for help. Msg frequency varies. Msg & data rates may apply. Terms: {{TERMS_URL}} Privacy: {{PRIVACY_URL}}

**Required fields to capture:** first name, last name (optional), phone, service requested, address/zip (optional), preferred contact time (optional), and the checkbox value.

### B) Typeform
**Statement (put in a required “Statement” or “Legal” block near submit):**
> By providing your phone number, you agree to receive SMS messages from {{BUSINESS_NAME}} about your request. Reply STOP to opt out, HELP for help. Msg frequency varies. Msg & data rates may apply. Consent is not a condition of purchase. Terms: {{TERMS_URL}} Privacy: {{PRIVACY_URL}}

**Implementation note:** If Typeform supports it, use a required “Yes, I agree” field and log the value.

### C) Meta / Facebook Lead Ads
**Recommended Lead Form disclaimer (add to form):**
> By submitting, you agree to receive automated text messages from {{BUSINESS_NAME}} about your request at the number provided. Reply STOP to opt out, HELP for help. Msg frequency varies. Msg & data rates may apply. Consent is not a condition of purchase. Terms: {{TERMS_URL}} Privacy: {{PRIVACY_URL}}

**If Meta allows custom question:**
Add: “Do you agree to receive text messages about your request?” (Yes/No). Only message “Yes”.

---

## 3) First-message + qualification templates (carrier-friendly)
**Guidelines:** keep it short, no ALL CAPS, no “free!!!”, avoid link shorteners, avoid repeated URLs, avoid “urgent” hype language.

### Template 1: First response (immediate)
> Hi {{first_name}}, it’s {{agent_name}} with {{BUSINESS_NAME}}. Got your request for {{service}}. Are you looking to do this at **(A)** your home or **(B)** a business location?

### Template 2: Qualification (2–4 questions max)
**Q1 (timing):**
> Thanks—when are you looking to get this done? (1) ASAP (2) This week (3) 2+ weeks

**Q2 (zip/service area):**
> What’s the ZIP code for the job?

**Q3 (availability for call/appointment):**
> What time works best for a quick call? (1) Morning (2) Afternoon (3) Evening

### Template 3: Booking confirmation
> Perfect—you're booked for {{date}} at {{time}}. If anything changes, reply here. Reply STOP to opt out.

### Template 4: If lead asks “who is this?”
> This is {{BUSINESS_NAME}}—you requested info via our form/ad. If you’d rather not get texts, reply STOP.

### Template 5: Re-engagement (1 attempt only)
> Hi {{first_name}}—still need help with {{service}}? Reply 1 for yes or 2 for no. Reply STOP to opt out.

---

## 4) STOP / HELP handling (MUST IMPLEMENT EXACTLY)

### A) Keywords
Treat these as opt-out: **STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT** (case-insensitive, ignore punctuation/whitespace).  
Treat these as help: **HELP, INFO**.

### B) STOP behavior (state machine)
**When inbound matches STOP keyword**
1) Immediately set `contact.sms_opted_out = true`.
2) Add phone to a **global suppression list** (applies across all campaigns/workflows for that client account).
3) Log event `sms.opt_out` with timestamp and original inbound body.
4) Send exactly one confirmation message:
> You’re opted out and will no longer receive text messages from {{BUSINESS_NAME}}. Reply HELP for help.
5) Block all future outbound SMS to that phone unless they re-consent (see below).

**Re-consent rule (optional for pilots; safest is manual):**
Only clear opt-out if user explicitly texts: **START, YES, UNSTOP** AND you log it as a new consent event.

### C) HELP behavior
When inbound matches HELP keyword, respond:
> {{BUSINESS_NAME}}: Help/Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out. Msg & data rates may apply.
Log event `sms.help`.

### D) Edge cases
- If STOP arrives mid-flow, stop the flow immediately.
- If system tries to send to opted-out number: **do not send**, log `sms.blocked_opt_out`.

---

## 5) Quiet hours by timezone (implementation spec)
**Goal:** avoid texting leads at night locally; defer to next allowed window.

### A) Default quiet hours window (recommended)
- Allowed send window: **8:00am–8:00pm** lead-local time, 7 days/week.
- If client requests stricter: 9:00am–7:00pm.

### B) Timezone resolution order
1) If lead has `timezone` field from form/CRM → use it.
2) Else if lead has ZIP/postal code → map ZIP to timezone.
3) Else if lead has state → map state to timezone (best-effort).
4) Else default to the **client business timezone**.

Log `sms.timezone_resolved` with method used.

### C) Deferral algorithm
If `now_local` is outside allowed window:
- Compute `next_send_local = next allowed start time` (e.g., tomorrow at 8:00am).
- Enqueue message with `defer_reason=quiet_hours`, and store the originally intended send time.
- When released, send the *current* best message (don’t send a stale booking prompt if lead already booked elsewhere).

### D) Overrides
- Manual human reply is allowed anytime (agent-initiated).
- System-initiated automation respects quiet hours.

Required log events: `sms.deferred_quiet_hours`, `sms.sent_after_deferral`.

---

## 6) Consent logging schema (dispute-ready)
Store the following per lead (minimum):
- `phone_e164`
- `consent_status`: opted_in / opted_out / unknown
- `consent_timestamp`
- `consent_source`: webflow_form / typeform / meta_lead_ad / manual
- `consent_text_snapshot`: the exact disclosure text shown at time of opt-in (or version ID)
- `landing_page_url` or `form_id`
- `ip_address` (if available)
- `user_agent` (if available)
- `utm_*` (optional)
- Message log: direction, timestamp, body, status, provider message id
- Opt-out log: inbound body + timestamp

Retention: **24 months** recommended for TCPA dispute defense.

---

## 7) Twilio deliverability hardening (pilot-safe defaults)

### A) Messaging Service (do this first)
- Create **one Messaging Service per client account**.
- Enable **Sticky Sender**.
- Add the sending number(s) to the service.
- Set a sensible throughput (start conservative).
- Configure Status Callback URL to your delivery webhook.

### B) A2P 10DLC vs Toll-Free (decision)
- If sending from a local long code to US recipients at any meaningful scale: **plan for A2P 10DLC**.
- If you need fastest pilot with fewer registration steps: **Toll-Free** can be viable but still may require verification for best deliverability.

**No money should be spent without owner approval.** Registration steps can be started on free/standard Twilio account access, but some paths may later involve fees.

### C) Content guidelines to avoid filtering
- Keep first message human-like and contextual (“Got your request for…”).
- Avoid link shorteners; use your domain or the proof URL.
- Don’t include more than 1 URL in early messages.
- Avoid heavy promo language: “BUY NOW”, “LIMITED TIME”, “FREE $$$”.
- Maintain consistent brand name in messages.

### D) Fallback behaviors
- If message fails with a policy/carrier error: stop automation, notify internal channel/email, and mark lead “needs manual follow-up”.
- If delivery is delayed: do not spam retries; 1 retry max.

---

## 8) Verification: STOP/HELP end-to-end test matrix (sign-off)
Run these tests using a real phone:
1) Inbound “STOP” → confirm opt-out reply sent; outbound blocked.
2) Inbound “Stop” (mixed case) → same.
3) Inbound “STOPALL” → same.
4) Inbound “HELP” → help text returned.
5) After STOP, system attempt to send qualification → must be blocked + logged.
6) Quiet hours: trigger lead at 11pm local → message deferred to morning.

**Evidence required:** screenshots or logs showing:
- `sms.opt_out` event
- suppression list entry
- blocked outbound event
- help response
- deferred queue entry + later send

---

## 9) Agency implementation SOP (no-code compatible)
1) **Add opt-in language** to the form/ad using the snippets above.
2) Ensure your automation tool (Zapier/Make/webhook) passes:
   - lead phone (E.164 format preferred)
   - lead first name
   - service requested
   - consent flag/value
   - consent source + timestamp
3) Only trigger SMS if consent is present.
4) Route messages through the configured Twilio Messaging Service.
5) Enable inbound webhook to capture replies and run STOP/HELP logic.
6) Turn on quiet-hours deferral.
7) Run the test matrix and keep proof in the client folder.

**Support:** agent_bob_replit+lead-copilot@agentmail.to  
**Proof URL for client trust:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
