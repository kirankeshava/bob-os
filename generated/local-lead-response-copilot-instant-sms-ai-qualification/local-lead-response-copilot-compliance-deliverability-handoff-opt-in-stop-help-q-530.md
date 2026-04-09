# Local Lead Response Copilot — Compliance + Deliverability Handoff (Opt‑In, STOP/HELP, Quiet Hours, Twilio, Agency Instructions)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:55:50.005Z

---

# Local Lead Response Copilot — Compliance + Deliverability Handoff

**Business legitimacy links (use in all customer-facing templates)**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) Compliance checklist (minimum viable to avoid churn/account issues)
1. **Consent capture is explicit** (no pre-checked boxes). Consent text includes: autodialer/automated texts, purpose, “msg & data rates may apply”, frequency, and STOP/HELP.
2. **STOP/HELP implemented** with immediate responses, suppression, and permanent opt-out until re-consent.
3. **Quiet hours** enforced by lead timezone; messages are queued and sent next allowable window.
4. **Consent logging** stored per lead: source, timestamp, IP/user agent (if web), form version, consent text shown, and phone number.
5. **Sender identity**: first message identifies the business and reason for text.
6. **No prohibited content** (SHAFT) and avoid aggressive urgency/spam phrasing.
7. **Twilio Messaging Service** configured (sticky sender, opt-out handling strategy, status callbacks).
8. **A2P 10DLC readiness** (if using long code): brand + campaign registration; campaign description matches actual messages.

## 2) Copy/paste opt-in language (by lead source)
### 2.1 Webflow / Website forms (recommended checkbox)
Add a required checkbox with this label:
> **Text me updates** about my request. By checking this box, I agree to receive **automated SMS** from **{Business Name}** about my inquiry and scheduling. Msg frequency varies. Msg & data rates may apply. Reply **STOP** to opt out, **HELP** for help. See Terms & Privacy: {TermsURL} | {PrivacyURL}

**Notes**
- Do not pre-check.
- Store: checkbox true/false, timestamp, page URL, and the exact consent text version.

### 2.2 Typeform (statement + required Yes)
Add a statement:
> By continuing, you agree {Business Name} may text you about your request using automated technology. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TermsURL} Privacy: {PrivacyURL}

Then add a required question:
- “Do you agree to receive text messages about your request?” (Yes/No). Only proceed if **Yes**.

### 2.3 Meta/Facebook Lead Ads (primary text + privacy policy link)
In the Lead Form **Disclaimer/Consent** area, use:
> By submitting, you agree to receive automated text messages from **{Business Name}** about your inquiry and scheduling. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.

Add privacy policy URL: {PrivacyURL}

**Important**: Ensure the FB form field explicitly collects phone and user submits the form; do not import scraped lists.

## 3) First-message templates (compliant + deliverable)
### 3.1 Instant lead response (default)
> Hi {FirstName} — this is {AgentNameOrBiz} at {BusinessName}. Got your request for {Service}. Can I ask 2 quick questions to get you an accurate quote? Reply STOP to opt out.

### 3.2 Qualification question 1 (keep short)
> What’s the service address (ZIP is fine if you prefer)? Reply STOP to opt out.

### 3.3 Qualification question 2 (timing)
> When do you want this done? (Today/This week/Next week/Not sure) Reply STOP to opt out.

### 3.4 Booking prompt
> Perfect — want to book a quick call or an on-site estimate? Reply 1=Call 2=On-site. Reply STOP to opt out.

### 3.5 Missed-call textback
> Sorry we missed you — this is {BusinessName}. Want to book a quick call/estimate? Reply with a good time, or STOP to opt out.

### 3.6 Re-engagement (1 follow-up)
> Still want help with {Service}? If yes, reply with your ZIP and preferred day/time. Reply STOP to opt out.

## 4) STOP/HELP handling — implementation spec (Twilio)
### 4.1 Required behaviors
- **STOP keywords** (case-insensitive; trim punctuation/whitespace): `STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`.
- On receiving STOP keyword:
  1. Mark lead as **opted_out=true** immediately.
  2. Add phone to a **global suppression list** (account-wide) with timestamp and keyword.
  3. Send a single confirmation:
     > You’re opted out from {BusinessName} texts. No more messages. Reply START to re-subscribe or email agent_bob_replit+lead-copilot@agentmail.to.
  4. Block all future outbound unless re-consent is captured.
- **HELP keywords**: `HELP`, `INFO`.
  - Respond:
    > {BusinessName}: We text about your inquiry/scheduling. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to {WebsiteURL}
- **START keywords**: `START`, `YES`, `UNSTOP`.
  - Only re-enable if you have a re-consent policy. Safer default: reply with instruction to re-submit the form for consent.

### 4.2 Twilio webhook routing
- Configure inbound SMS webhook to your `/sms/inbound` endpoint.
- Parse:
  - `From` (E.164)
  - `To`
  - `Body`
  - `MessageSid`
  - `SmsStatus` (callbacks)
- Perform keyword check **before** any AI qualification.

### 4.3 Consent + compliance logs (minimum schema)
Store an append-only log record for:
- `event_type`: consent_captured | outbound_sent | inbound_received | opt_out | help_request | quiet_hours_queued | delivery_failed
- `phone_e164`, `lead_id`, `business_id`
- `timestamp_utc`
- `source`: webflow | typeform | facebook | manual
- `consent_text_version`, `landing_page_url`
- `ip` and `user_agent` (if web)
- `message_body` (redact if needed)
- `twilio_message_sid`

## 5) Quiet hours (timezone-aware) — implementation spec
### 5.1 Default policy (recommended)
- Allow outbound only **8:00 AM–8:00 PM** in the lead’s local timezone.
- If message would send outside window: **queue** and send at next local 8:00 AM.

### 5.2 Timezone resolution order
1. If lead provided address/ZIP → map ZIP to timezone.
2. Else if form captured state/city → infer timezone.
3. Else fallback: business timezone (configurable).

### 5.3 DST + edge cases
- Use IANA tz database identifiers (e.g., `America/Chicago`).
- Recompute next send time at queue processing time to handle DST shifts.

### 5.4 Emergency override
- Admin setting: `quiet_hours_override=true` for a single thread, with audit log entry.

## 6) Twilio deliverability hardening (minimum viable)
1. Use a **Messaging Service** (not ad-hoc numbers). Enable:
   - Sticky sender
   - Status callbacks
2. Keep messages short, specific, and conversational. Avoid:
   - “FREE!!!”, excessive caps, multiple links, URL shorteners, cryptocurrency, misleading claims.
3. Include business identification early (first message).
4. Maintain list hygiene: only text users who just opted in; no cold lists.
5. If using long code at scale: prepare **A2P 10DLC** Brand + Campaign registration. Campaign description must match: “lead response + scheduling/qualification for service inquiries”.

## 7) Agency handoff: how to implement without code changes
### Step-by-step
1. Add the opt-in checkbox language to the client’s form (Webflow/Typeform) or Meta Lead Form disclaimer.
2. Ensure the form sends: first name, phone, service requested, ZIP/address (for timezone), and consent=true.
3. In Copilot settings (or onboarding sheet), set:
   - Business name
   - Support email: agent_bob_replit+lead-copilot@agentmail.to
   - Quiet hours window (default 8a–8p)
4. Go-live verification:
   - Submit a test lead with your phone → confirm first SMS includes business identity + STOP.
   - Reply HELP → confirm help response.
   - Reply STOP → confirm opt-out confirmation and no further outbound.
   - Test after-hours lead → confirm message queues and sends next morning.

### What agencies can say (objection handler)
> We capture explicit SMS consent (TCPA/CTIA-aligned), include STOP/HELP in messages, enforce quiet hours by timezone, and log consent + opt-outs for auditability. Twilio deliverability is handled via Messaging Services and A2P 10DLC readiness to reduce carrier filtering.
