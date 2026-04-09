# Local Lead Response Copilot — MV Compliance + Deliverability Pack (Agency Copy/Paste + Verification)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:26:06.664Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Pack (Agency Copy/Paste + Verification)

**Proof URL (share with customers / for legitimacy):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
**Support email (use in all disclosures):** agent_bob_replit+lead-copilot@agentmail.to

---
## 1) Minimum-viable compliance checklist (pilot-ready)
1. **Consent captured before first SMS** (checkbox or explicit written consent on the form/lead ad). No pre-checked boxes.
2. **Required disclosures shown at point of capture:**
   - You agree to receive text messages about your request.
   - Message frequency varies.
   - Msg & data rates may apply.
   - Reply **STOP** to cancel, **HELP** for help.
   - Link to **Terms** and **Privacy**.
3. **STOP handling is immediate and global** (suppression list across all numbers/campaigns for that business).
4. **HELP returns support info** (business name + support email + STOP reminder).
5. **Quiet hours** enforced by recipient timezone; messages deferred not dropped.
6. **Consent logging** stored and exportable (for disputes).
7. **Content hygiene:** no misleading claims, no “spammy” formatting, limit links, avoid URL shorteners.

---
## 2) Copy/paste opt-in language by channel
### A) Webflow / website form (checkbox + disclosure)
**Checkbox label (required):**
> I agree to receive text messages about my request.

**Disclosure text (place under checkbox in small text):**
> By submitting this form, you consent to receive SMS messages from **[Business Name]** related to your inquiry. Message frequency varies. Msg & data rates may apply. Reply **STOP** to opt out, **HELP** for help. See **Terms**: [TERMS_URL] and **Privacy**: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Implementation notes:**
- Checkbox must be unchecked by default.
- Store a boolean field `sms_consent=true` plus timestamp and page URL.

### B) Typeform
**Typeform legal statement (paste into “Legal” / “Terms & Conditions” area):**
> By providing your phone number, you agree to receive SMS messages from **[Business Name]** about your request. Message frequency varies. Msg & data rates may apply. Reply **STOP** to cancel, **HELP** for help. Terms: [TERMS_URL]. Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Recommended additional question (required):**
- “Do you agree to receive text messages about your request?” (Yes/No)

### C) Meta / Facebook Lead Ads
**Lead form disclaimer (add to custom disclaimer or intro):**
> By submitting, you agree to receive SMS messages from **[Business Name]** about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [TERMS_URL] Privacy: [PRIVACY_URL]. Support: agent_bob_replit+lead-copilot@agentmail.to. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Important:** ensure the lead form includes a phone number field and that consent language is visible before submission.

---
## 3) Message templates (compliant, low-filter)
### A) First response (send immediately after lead capture)
> Hi {{first_name}}, this is {{agent_or_business_name}}. Thanks for reaching out about {{service}}. What’s the address/ZIP for the project?

**If you must include disclosure in first SMS (optional):**
> Reply STOP to opt out, HELP for help.

### B) Qualification (2–4 questions max)
1) > What’s the main issue you want help with?  
2) > When do you want this done—today, this week, or flexible?  
3) > Is this for a home you own, rent, or a business location?

### C) Booking (handoff to call / appointment)
> Great—want to book a quick call? Reply 1 for the next available time today, or 2 for tomorrow.

**If using a link:**
> You can also pick a time here: {{booking_link}} (Reply STOP to opt out)

### D) Missed-call text back
> Sorry we missed you—this is {{business_name}}. What’s the best time to call you back today?

### E) Re-engagement (one attempt, then stop)
> Just checking in—do you still want help with {{service}}? Reply YES and we’ll get you scheduled. Reply STOP to opt out.

---
## 4) STOP / HELP handling (implementation spec)
### Keywords
- **STOP:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- **HELP:** HELP, INFO

### Behavior
1. If inbound matches STOP keyword (case-insensitive, trim punctuation):
   - Set `opted_out=true` for that phone **globally for that business**.
   - Add to suppression list.
   - Immediately send confirmation:
     > You’re opted out and will no longer receive texts from {{business_name}}. Reply HELP for help.
   - Block all future outbound to that number unless explicit re-consent is captured.

2. If inbound matches HELP keyword:
   - Send:
     > {{business_name}} support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.

3. If inbound after STOP (any other message):
   - Do **not** resume messaging.
   - Optionally send once:
     > You’re currently opted out. Reply HELP for support.

### Required audit logs (minimum)
- `inbound_received` (body, from, to, timestamp)
- `stop_detected` (keyword matched)
- `suppression_added` (phone, business_id)
- `outbound_blocked_due_to_optout` (attempted send id)
- `help_sent` (timestamp)

---
## 5) Quiet hours by timezone (implementation spec)
**Goal:** don’t send marketing/qualification SMS outside allowed hours in recipient’s local timezone; defer instead.

### Timezone resolution order
1) Lead-provided ZIP/postal → timezone lookup  
2) Property address → timezone lookup  
3) Area code heuristic (fallback)  
4) Default business timezone (last resort)

### Allowed window (default)
- **Mon–Fri:** 9:00 AM – 7:30 PM local time
- **Sat:** 10:00 AM – 5:00 PM local time
- **Sun:** no sends (defer to next allowed window)

### Deferral behavior
- If message would send outside window: enqueue with `defer_until` = next allowed start time.
- Preserve ordering (first-response should go first when window opens).
- Log `quiet_hours_deferred` with computed timezone and defer time.

### Overrides
- If lead explicitly asks “text me now” or responds inbound during quiet hours, allow **one** response within 5 minutes (transactional) and then resume deferral.

---
## 6) Consent logging schema (minimum viable)
Store per lead/phone:
- `phone_e164`
- `business_id`
- `consent_status` (consented/opted_out)
- `consent_source` (webflow/typeform/meta/other)
- `consent_text_version` (hash or version string)
- `consent_timestamp`
- `consent_capture_url` (page/ad/form identifier)
- `consent_ip` (if available)
- `stop_timestamp` (if opted out)
- `message_history` pointers (message ids + timestamps)

Retention: 4 years recommended (or per counsel); must be exportable for disputes.

---
## 7) Twilio deliverability: A2P/10DLC vs Toll-Free (pilot decision)
**Use 10DLC** if you are:
- Primarily US long-code texting (local feel), moderate/high volume, multiple campaigns, or scaling beyond a couple numbers.

**Use Toll-Free** if you are:
- Early pilot and want simpler approvals, often lower filtering vs unregistered long-code, and can accept toll-free number.

**Regardless of route:**
- Use a **Messaging Service** (even for one number) to centralize compliance features.
- Avoid URL shorteners; prefer your domain.
- Keep first message short and directly related to the lead’s request.
- Don’t include repeated “marketing-y” phrasing; personalize with service + city/ZIP.

---
## 8) Verification appendix (agency test script)
### STOP test (required)
1) Send an outbound test message to your phone.  
2) Reply: `STOP`  
3) Confirm you receive opt-out confirmation within 5 seconds.  
4) Trigger another outbound to that number (simulate new lead). It must be **blocked** and logged as blocked due to opt-out.

**Pass criteria:** suppression persists across campaigns/numbers for that business.

### HELP test (required)
1) Reply `HELP`  
2) Confirm response includes support email agent_bob_replit+lead-copilot@agentmail.to and STOP instruction.

### Quiet hours test (required)
1) Set lead timezone to a known zone (e.g., America/Los_Angeles).  
2) Attempt send at 8:00 PM local.  
3) Confirm message is deferred with `defer_until` next valid window and audit log created.

---
## 9) Website publishing checklist (so opt-in snippets have real links)
1) Create **/terms** and **/privacy** pages on the site (or equivalent).  
2) Add business name, support email, and SMS disclosures to Terms.  
3) Add data handling + retention + contact info to Privacy.  
4) Replace [TERMS_URL] and [PRIVACY_URL] in all opt-in snippets with the live URLs.  
5) Re-test forms to ensure disclosure is visible before submission.
