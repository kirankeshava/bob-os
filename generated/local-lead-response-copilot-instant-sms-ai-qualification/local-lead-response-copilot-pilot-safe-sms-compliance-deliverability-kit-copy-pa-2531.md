# Local Lead Response Copilot — Pilot-Safe SMS Compliance + Deliverability Kit (Copy/Paste + Specs + Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T05:32:04.641Z

---

# Local Lead Response Copilot — Pilot-Safe SMS Compliance + Deliverability Kit

**Business proof URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Support:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (Minimum Viable Compliance)
Get pilots live **without carrier enforcement, filtering spikes, or TCPA/CTIA objections**. This kit focuses on the minimum set agencies/clients ask for:
1) Clear opt-in language at lead capture.
2) Immediate first message that identifies the business + purpose.
3) STOP/HELP handling + suppression list.
4) Quiet hours (local time) with queueing.
5) Consent logging (basic audit trail).

---

## 1) Copy/Paste Opt‑In Snippets
Use one of these at the point of lead capture (form/lead ad). Keep it **adjacent to the submit button**.

### 1A) Webflow / Website Form (recommended)
**Checkbox label (unchecked by default):**
> I agree to receive text messages about my request (appointment scheduling and service updates) from **[BUSINESS NAME]** at the phone number I provide. Msg & data rates may apply. Msg frequency varies. Reply **STOP** to opt out, **HELP** for help. Consent is not a condition of purchase.

**Small print under button (if no checkbox):**
> By submitting, you agree to receive texts from **[BUSINESS NAME]** about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. See Terms & Privacy: **[TERMS URL]** and **[PRIVACY URL]**.

### 1B) Typeform
Add a **Legal** or **Statement** field near the phone question:
> By providing your number, you agree **[BUSINESS NAME]** may text you about your request (appointment scheduling & service updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Terms: **[TERMS URL]** Privacy: **[PRIVACY URL]**.

### 1C) Meta/Facebook Lead Ads (high leverage)
In the Lead Form:
- **Questions:** include Phone Number.
- **Privacy policy URL:** set to **[PRIVACY URL]**.
- **Custom disclaimer (paste):**
> By submitting, you agree to receive text messages from **[BUSINESS NAME]** regarding your inquiry (scheduling & service updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.

**Note:** For FB lead ads, also ensure your follow-up text includes business identification in message 1.

---

## 2) Message Templates (Compliant + Deliverability-Safe)
**Rules:**
- Avoid ALL CAPS, excessive punctuation, “FREE!!!”, “Act now”, link shorteners, and repeated links.
- Personalize with {first_name} and reference the service requested.
- Include STOP/HELP language **at least in the first message** and periodically in longer flows.

### 2A) First Message (speed-to-lead)
> Hi {first_name} — this is {agent_name} with **{business_name}**. Thanks for reaching out about {service}. Are you looking to get this done **today, this week, or just pricing**? Reply STOP to opt out.

### 2B) Qualification (2–3 short questions)
1) 
> Got it. What’s the address/ZIP for the job?
2) 
> Any photos you can share (optional), or a quick description of the issue?
3) 
> What time window is best for a call/visit: morning, afternoon, or evening?

### 2C) Booking / Handoff
> Perfect — I can get you on the schedule. Does **{day} at {time}** work? If not, what’s a better time? Reply STOP to opt out.

### 2D) Missed Call Textback
> Sorry we missed you — this is **{business_name}**. Are you calling about {service}? Reply with a good time to call back. Reply STOP to opt out.

### 2E) Re-engagement (one message only)
> Hi {first_name} — checking in from **{business_name}**. Do you still need help with {service}? If yes, what’s a good time today? Reply STOP to opt out.

### 2F) HELP Response (must be accurate)
> {business_name} support: reply STOP to opt out. For help, email agent_bob_replit+lead-copilot@agentmail.to. Msg & data rates may apply.

### 2G) STOP Confirmation (required)
> You’re opted out and will no longer receive messages from {business_name}. Reply START to opt back in.

---

## 3) STOP/HELP Implementation Spec (Twilio-Compatible)
### 3A) Keyword Handling
Normalize inbound body: trim, lowercase, remove punctuation.
- **STOP keywords:** stop, stopall, unsubscribe, cancel, end, quit
- **HELP keywords:** help, info, support
- **START keywords:** start, yes, unstop

### 3B) Behavior
1) If inbound matches STOP keyword:
- Write suppression record immediately.
- Send STOP confirmation message (2G).
- Block all future outbound unless user sends START.

2) If inbound matches HELP keyword:
- Send HELP response (2F).
- Do **not** change subscription status.

3) If inbound matches START keyword:
- Remove suppression (or mark resubscribed).
- Send confirmation:
  > You’re re-subscribed to {business_name} texts. Msg frequency varies. Reply STOP to opt out.

### 3C) Global Suppression
Maintain a **global suppression list per customer account** (or per sending number/service) keyed by E.164 phone.
- On every outbound send: check suppression first; if suppressed, do not send.
- Store: phone, status (suppressed/active), reason (STOP), timestamp, source (inbound keyword), messageSid (if Twilio).

### 3D) Required Logs (Consent + Compliance)
Log at minimum:
- lead_id, phone (E.164), created_at
- consent_source (webflow/typeform/meta/manual)
- consent_text_version (string)
- consent_timestamp
- ip/user_agent (if available)
- initial_message_timestamp + content
- STOP/HELP/START events (timestamp, raw_body, normalized_body)

---

## 4) Quiet Hours (By Timezone) Implementation Spec
### 4A) Default Window
Default sending window: **8:00am–8:00pm recipient local time**, 7 days/week.

### 4B) Timezone Resolution Order
1) Lead-provided ZIP/address → map to timezone.
2) Area code fallback (less accurate).
3) Business timezone default if unknown.

### 4C) Queueing Behavior
If message trigger occurs during quiet hours:
- Queue message for next allowed send time (next 8:00am local).
- If multiple queued, send only the **most recent** context message (avoid bursts).

### 4D) Owner Override
Allow an account-level override flag (for emergencies) to send outside quiet hours **only for transactional messages** (e.g., “tech arriving now”), not marketing.

### 4E) DST
Use IANA timezone IDs and a real timezone library. Do not hardcode offsets.

---

## 5) Twilio Deliverability Hardening (Minimum)
1) Use a **Messaging Service** with:
- Sticky sender enabled (keeps a lead on one number)
- Validity period (e.g., 4 hours)
- Smart encoding

2) Content guardrails:
- Identify business in message 1.
- Avoid link shorteners; use full branded domain if linking.
- Avoid spammy words, excessive urgency, or repeated links.

3) A2P 10DLC readiness (if using local long code at scale):
- Brand registration details ready (legal name, EIN if applicable, address).
- Campaign use case aligned with “customer care / conversational”.
- Sample messages exactly like templates above.

---

## 6) Agency Handoff (What to Do in 20 Minutes)
1) Paste the opt-in snippet into the client’s form/lead ad.
2) Ensure the client’s first SMS uses template 2A and includes business identification.
3) Confirm STOP/HELP are enabled per spec (Section 3) and suppression is enforced on outbound.
4) Enable quiet hours per spec (Section 4).
5) Run verification tests:
- Send STOP from a test phone → confirm immediate confirmation + outbound blocked.
- Send HELP → confirm help text.
- Trigger an after-hours lead → confirm queued send at 8am local.

If anything fails, email **agent_bob_replit+lead-copilot@agentmail.to** and reference the proof URL above.
