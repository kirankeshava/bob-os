# Local Lead Response Copilot — Minimum-Viable SMS Compliance + Deliverability Pack (Agency Copy/Paste + Engineering Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:50:33.239Z

---

# Local Lead Response Copilot — Minimum-Viable SMS Compliance + Deliverability Pack

Use this pack to remove the top sales objections and avoid the most common SMS enforcement issues (TCPA/CTIA basics, STOP/HELP, quiet hours, and consent logging). Keep it simple for pilots; harden further after first paid customers.

**Legitimacy links/support (include in proposals and opt-in wherever possible):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Minimum Compliance Checklist (Pilot-Ready)
1. **Explicit opt-in** at the point of lead capture (form or ad). Must disclose automated texts.
2. **STOP/HELP** supported on *every* sending number, immediately.
3. **Consent not required to buy** (include this phrase).
4. **Message frequency disclosure** (even “Msg frequency varies”).
5. **Quiet hours**: don’t initiate texts during local late-night hours; queue instead.
6. **Consent logging**: store timestamp, source, and the exact opt-in text shown.
7. **Content rules**: no “free!!!”, no ALL CAPS blasts, avoid URL shorteners, avoid misleading claims.

---

## 2) Copy/Paste Opt-In Language (by Lead Source)

### A) Webflow / Website Form Checkbox + Disclosure
Place **directly under the phone field** and/or as a required checkbox.

**Checkbox label (recommended):**
> I agree to receive text messages about my request.

**Disclosure text (paste below checkbox):**
> By submitting this form, you agree to receive automated text messages from **[Business Name]** about your request and related service scheduling. Consent is not a condition of purchase. Msg frequency varies. Msg & data rates may apply. Reply **STOP** to opt out, **HELP** for help. See **Privacy Policy**: [PRIVACY_URL] and **Terms**: [TERMS_URL].

**Required fields to capture/store (for consent logging):** phone, checkbox=true, page URL, timestamp, IP/user agent if available.

### B) Typeform
Add a statement on the phone question description and/or final “thank you” screen.

**Phone question description:**
> We’ll text you updates about your request. Reply STOP to opt out.

**Final screen disclosure (stronger):**
> By submitting, you agree to receive automated text messages from **[Business Name]** about your request. Consent is not a condition of purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].

### C) Meta / Facebook Lead Ads (Instant Forms)
Put this in the **Privacy policy / Custom disclaimer** area (wording may need slight shortening to fit).

**Disclaimer:**
> By submitting, you agree to receive automated texts from **[Business Name]** about your request. Consent not required to purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy: [PRIVACY_URL] Terms: [TERMS_URL].

**Important:** Ensure the business name in the ad matches the brand used in the first SMS.

---

## 3) Compliant Message Templates (Low Spam Risk)

### Template 1 — First Response (speed-to-lead)
> Hi {{first_name}}, this is {{agent_name}} with {{business_name}}. Thanks for reaching out about {{service}}. Are you looking to book today or sometime this week?

### Template 2 — Qualification (keep to 1 question at a time)
> Got it—what’s the service address (city is ok) so I can confirm availability?

### Template 3 — Booking Offer
> We can do {{slot_1}} or {{slot_2}}. Which works better?

### Template 4 — Confirmation
> Confirmed for {{date_time}} at {{address}}. If anything changes, reply here. Reply STOP to opt out, HELP for help.

### Template 5 — Missed Call Text-Back
> Sorry we missed you—this is {{business_name}}. What’s the best time today for a quick call, or would you prefer we text to schedule?

### Template 6 — Re-engagement (1 attempt)
> Hi {{first_name}}—still need help with {{service}}? If yes, tell me what day works best and we’ll get you scheduled.

**Guidelines:** keep links minimal; if needed, use full branded domain (no short links). Avoid “urgent”, “guaranteed”, excessive punctuation, or repeated sends.

---

## 4) STOP / HELP Handling — Implementation Spec (Twilio-Compatible)

### Keywords to recognize (case-insensitive, trim punctuation)
- **STOP:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- **HELP:** HELP, INFO
- **START (optional re-subscribe):** START, UNSTOP, YES

### Behavior
1. If inbound matches STOP keyword:
   - Immediately set `contact.sms_opt_out = true`.
   - Add phone to **Global Suppression List** (across all clients/workspaces unless legally segmented).
   - Send **one** confirmation message:
     > You’re opted out and will no longer receive text messages from {{business_name}}. Reply START to re-subscribe.
   - Block all future outbound to that phone unless they reply START.
2. If inbound matches HELP:
   - Send help message:
     > {{business_name}}: For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.
3. If inbound matches START and phone is opted-out:
   - Set `sms_opt_out=false` and record resubscribe event.
   - Send confirmation:
     > You’re re-subscribed. Msg frequency varies. Reply STOP to opt out.

### Audit logging (minimum fields)
- phone_e164, event_type (OPT_IN / OPT_OUT / HELP / RESUBSCRIBE)
- timestamp_utc
- source (webflow/typeform/meta/manual)
- message_body_received
- message_body_sent
- campaign/client_id
- consent_text_version_id (for OPT_IN)

### Verification matrix (what to test)
- Send “STOP” → receives confirmation; subsequent outbound blocked.
- Send “Help” → receives help message.
- Send “START” after STOP → outbound allowed again.

---

## 5) Quiet Hours by Timezone — Implementation Spec

### Goal
Do not initiate new conversations during late-night hours in the lead’s local time. Queue messages to next allowed window.

### Default policy (pilot-safe)
- Allowed window: **8:00 AM – 8:00 PM** lead-local time, Mon–Sun.
- If lead timezone unknown: use business timezone, but **do not send** between 9 PM–8 AM.

### Timezone resolution order
1. Explicit timezone provided by client/account settings.
2. Lead’s ZIP/city/state (geocode) → timezone.
3. Phone number area code (fallback; imperfect).
4. Business default timezone.

### Queueing behavior
- If a lead comes in during quiet hours, send **nothing** immediately.
- Queue the first SMS for **next 8:00 AM** lead-local time.
- If the lead replies during quiet hours, you may respond (consider policy toggle), but keep it minimal.

### Overrides
- Account-level toggle: “Send anyway” for emergencies (default OFF).
- Manual agent override per conversation.

---

## 6) Twilio Deliverability Minimums (No Spend Required)
1. Use a **Messaging Service** (recommended) rather than a single number hard-coded.
2. Enable inbound handling webhook(s) for STOP/HELP.
3. Avoid link shorteners; prefer branded domains.
4. Keep templates consistent; don’t rotate wildly (carriers may flag).
5. If scaling on long code in the US, prepare for **A2P 10DLC** registration (brand + campaign). Gather:
   - Business legal name, EIN (if available), website, privacy/terms URLs, sample messages, opt-in method description.

---

## 7) Agency Handoff (Copy/Paste + Go-Live)
1. Choose lead source (Webflow/Typeform/Meta) and paste the matching **opt-in disclosure**.
2. Ensure the form captures: name, phone, service needed, address/city.
3. Confirm legal links (PRIVACY_URL, TERMS_URL) are live.
4. Turn on STOP/HELP handling and quiet hours.
5. Run the verification matrix with a real phone before sending traffic.

**Support:** agent_bob_replit+lead-copilot@agentmail.to

---

If you want, I can also generate a one-page “Compliance FAQ” agencies can attach to proposals (A2P/10DLC, consent proof, and typical client objections).