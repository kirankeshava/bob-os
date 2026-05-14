# Local Lead Response Copilot — MV Compliance Pack (Opt‑In + STOP/HELP + Quiet Hours) + Agency Copy/Paste Handoff

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:29:49.288Z

---

# Local Lead Response Copilot — MV Compliance Pack (Pilot-Ready)
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
Support: agent_bob_replit+lead-copilot@agentmail.to

## 1) The minimum we must have to launch pilots safely
This is the “wartime” compliance set: enough to avoid carrier blocks, TCPA objections, and churn.
1) Clear opt-in disclosure at the point of capture (form / lead ad).  
2) STOP handling (immediate confirmation + global suppression).  
3) HELP handling (how to get help + who is messaging).  
4) Quiet hours (don’t text at night in the lead’s timezone).  
5) Consent logging (timestamp, source, IP if available, language shown).

If any of the above is missing, pilots can get shut down or lose replies.

---

## 2) Copy/Paste Opt‑In Language (by lead source)
Use ONE of these blocks verbatim wherever the lead enters their phone number.

### A) Webflow / Website form checkbox (recommended)
**Checkbox label (must be unchecked by default):**
> I agree to receive text messages from {BUSINESS NAME} about my request. Message & data rates may apply. Reply STOP to opt out, HELP for help.

**Under the form submit button (small text):**
> By submitting, you confirm you are the subscriber/owner of this number and consent to receive texts about your request. Msg frequency varies. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}

**Required fields to store (for audit):** phone, timestamp, page URL, form name, checkbox=true.

### B) Typeform (no-checkbox fallback)
If you cannot add a checkbox, place this immediately before the phone field:
> Consent: By providing your phone number, you agree to receive text messages from {BUSINESS NAME} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}

Log: phone, timestamp, form ID/name, form URL.

### C) Meta/Facebook Lead Ads (recommended language)
**In the lead form “Disclaimer” / “Privacy Policy” section:**
> By submitting this form, you agree to receive automated text messages from {BUSINESS NAME} about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help.

**Add URLs:**
Privacy Policy URL: {PRIVACY_URL}  
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Internal note for agencies:** ensure the client’s business name appears as the advertiser identity and in the first SMS.

---

## 3) Default First Message Templates (carrier-safe)
Principles: no excessive caps, no “free!!!”, no link shorteners, identify sender, include STOP/HELP.

### Template: immediate first text (speed-to-lead)
> Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. What’s the address (or ZIP) for the job? Reply STOP to opt out, HELP for help.

### Template: qualification follow-up (if no reply after 3–5 min)
> Just checking — do you need {service} (1) today/ASAP, (2) this week, or (3) just pricing? Reply STOP to opt out.

### Template: booking handoff
> Thanks. Want the soonest available call, or an on-site estimate? If call: what time works today? Reply STOP to opt out.

### Template: missed call text-back (if using call forwarding)
> Sorry we missed you — this is {business_name}. What’s the best time today to call you back about {service}? Reply STOP to opt out.

---

## 4) STOP / HELP Handling (implementation spec)
### Keywords to treat as STOP (case-insensitive, trim punctuation)
STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

**On receiving STOP keyword:**
1) Immediately mark phone as “suppressed=true” in a GLOBAL suppression list (applies across all subaccounts/clients if you operate multi-tenant).  
2) Send one final confirmation message:
> You’re unsubscribed and will no longer receive texts from {business_name}. Reply START to resubscribe.
3) Block all future outbound messages to that number unless they text START.

### Keywords to treat as HELP
HELP, INFO

**On receiving HELP keyword:**
Send:
> {business_name}: help is available at agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.

### Keywords to treat as START (resubscribe)
START, YES, UNSTOP

**On receiving START:**
1) Remove suppression for that specific business/tenant (or globally if you only have one brand).  
2) Send confirmation:
> You’re re-subscribed. Msg frequency varies. Reply STOP to opt out.

### Audit log fields (minimum)
- phone_e164
- tenant_id / business_id
- inbound_message_body
- keyword_classification (STOP/HELP/START/OTHER)
- action_taken (suppressed/unsubscribed/help_sent/resubscribed)
- timestamp_utc
- provider_message_sid (e.g., Twilio SID)

---

## 5) Quiet Hours by Lead Timezone (implementation spec)
Goal: avoid texting late night/early morning to reduce complaints and carrier filtering.

### Default quiet hours
No outbound texts between **8:00 PM and 8:00 AM** lead-local time.

### Timezone resolution order
1) If lead has explicit timezone stored (from form) → use it.
2) Else if ZIP/address available → map to timezone.
3) Else infer from area code (best-effort).
4) Else fallback to business timezone.

### Behavior if message would be sent during quiet hours
- Queue message for the next allowed time (8:05 AM local).  
- If lead messages inbound during quiet hours: you may respond immediately **only if** the lead initiated the conversation within the last 5 minutes (to reduce perceived spam). Otherwise queue.

### Override rules
- Admin toggle: “allow after-hours for emergencies” (off by default).
- Transactional-only override (e.g., “tech arriving now”) allowed if the lead is already an active customer and opted in.

Log quiet-hours decisions: attempted_send_time, lead_timezone, queued_until.

---

## 6) Deliverability guidelines (minimum)
- Use a consistent “from” number per business (Messaging Service recommended if using Twilio).  
- Avoid link shorteners; use full domains.  
- Keep first message under ~240 chars when possible.  
- Always identify the business in the first message.  
- Don’t mention “loan”, “debt”, “crypto”, “cash” (common filters) unless the vertical requires it.

A2P/10DLC note (US): if using long codes at scale, carriers may filter without registration. We can initiate A2P setup when Twilio account details are confirmed.

---

## 7) Agency go-live checklist (copy/paste)
1) Add opt-in disclosure (Section 2) to the capture source (Webflow/Typeform/FB).  
2) Ensure business name in first message (Section 3).  
3) Confirm STOP/HELP handling is enabled (Section 4).  
4) Set quiet hours (Section 5).  
5) Confirm legal links: Terms {TERMS_URL}, Privacy {PRIVACY_URL}.  
6) Send test lead to verify: first message, reply flow, STOP confirmation, HELP response.

For support, email agent_bob_replit+lead-copilot@agentmail.to and include business name + phone number used for testing.
