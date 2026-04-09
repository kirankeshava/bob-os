# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack (Agency Copy/Paste + Implementation Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T08:04:00.573Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Hardening Pack

**Use this document to launch pilots safely** (minimum-viable compliant) while protecting deliverability and avoiding Twilio/carrier enforcement.

**Business proof URL (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

**Support / compliance contact:** agent_bob_replit+lead-copilot@agentmail.to

---
## 1) Minimum-Viable Compliance Checklist (TCPA/CTIA-aligned)

### Lead capture & consent (must-have)
- **Explicit consent disclosure** at the point of lead capture: user agrees to receive SMS regarding their inquiry.
- **No pre-checked boxes** for SMS consent (where applicable).
- **Message frequency disclosure** (even if approximate, e.g., “up to 4 msgs/week”).
- **STOP/HELP disclosure:** “Reply STOP to opt out, HELP for help.”
- **“Msg & data rates may apply”**.
- **Terms + Privacy links** (use your site URLs; until published, do not claim “view Terms/Privacy” without links).
- Store a **consent record** (see §6).

### Messaging behavior (must-have)
- First outbound message should clearly identify the business and why the user is receiving the message (they submitted an inquiry).
- Always include opt-out instruction in initial + periodic messages.
- Honor STOP immediately: **no further messages** except a single confirmation.
- Respect **quiet hours** and local time (see §5).

### Content restrictions (must-have)
- Avoid deceptive content, “free” spammy phrasing, excessive punctuation, and link shorteners.
- Do not send unrelated marketing unless separate marketing consent exists.

---
## 2) Copy/Paste Opt-In Language (Forms + Ads)

> Replace bracketed fields with the client’s business name and URLs.

### A) Webflow / Website form — checkbox + disclosure (recommended)
**Checkbox label:**
> I agree to receive text messages about my request from **[Business Name]**.

**Disclosure text (beneath form / near submit):**
> By submitting this form, you agree to receive SMS messages from **[Business Name]** regarding your inquiry, appointment scheduling, and updates. Message frequency varies (up to 4 msgs/week). Msg & data rates may apply. Reply **STOP** to opt out, **HELP** for help. View Terms: **[Terms URL]** and Privacy: **[Privacy URL]**. Support: agent_bob_replit+lead-copilot@agentmail.to.

### B) Typeform — statement + required consent field
**Add a required Yes/No question:**
> Do you agree to receive text messages about your request from **[Business Name]**?

**Help text:**
> Msg frequency varies (up to 4 msgs/week). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [Terms URL] Privacy: [Privacy URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.

### C) Meta/Facebook Lead Ads — disclaimer (use both: question + privacy policy)
**Lead form question (custom question / consent):**
> I agree to receive text messages from **[Business Name]** about my inquiry and appointment scheduling.

**Privacy policy field:** use **[Privacy URL]**.

**Optional disclaimer text in the form:**
> By submitting, you agree to receive SMS about your request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: [Terms URL]. Support: agent_bob_replit+lead-copilot@agentmail.to.

---
## 3) Compliant SMS Templates (Copy/Paste)

### 3.1 First message (speed-to-lead)
> Hi {{first_name}} — this is {{agent_name}} with **{{business_name}}**. We got your request for {{service}}. Are you looking to get this done **today**, **this week**, or **just pricing**? Reply 1) Today 2) This week 3) Pricing. Reply STOP to opt out.

### 3.2 Qualification follow-up (keep short)
> Got it. What’s the address/ZIP for the job? Reply STOP to opt out.

> And what’s the best time for a quick call or visit: morning / afternoon / evening? Reply STOP to opt out.

### 3.3 Booking / handoff to call
> Perfect — I can get you on the schedule. What’s a good time for a call today: {{slot_1}} or {{slot_2}}? Reply STOP to opt out.

### 3.4 Missed-call textback (if they called but you missed)
> Sorry we missed your call — this is **{{business_name}}**. What can we help with, and what’s the best time to reach you? Reply STOP to opt out.

### 3.5 Re-engagement (use sparingly)
> Hi {{first_name}} — checking in from **{{business_name}}**. Do you still need help with {{service}}? Reply YES or NO. Reply STOP to opt out.

### 3.6 Opt-out confirmation (mandatory behavior)
> You’re opted out and will no longer receive messages from **{{business_name}}**. Reply START to re-subscribe.

### 3.7 HELP response (mandatory behavior)
> **{{business_name}}** SMS support: agent_bob_replit+lead-copilot@agentmail.to. Msg frequency varies. Reply STOP to opt out.

---
## 4) STOP/HELP Handling — Implementation Spec (Verified Ruleset)

### 4.1 Keywords to recognize (case-insensitive, trimmed, punctuation ignored)
**STOP / opt-out triggers:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

**START / opt-in re-subscribe:** START, YES, UNSTOP

**HELP / info:** HELP, INFO, SUPPORT

### 4.2 State machine
- **Default:** `subscribed=true`
- When inbound matches STOP triggers:
  1) Set `subscribed=false` for the **lead phone number** in a **global suppression list**.
  2) Log event `sms.opt_out` (see §6).
  3) Send **one** confirmation message (template §3.6).
  4) Block all future outbound messages to that number for all campaigns/clients unless re-subscribed.

- When inbound matches HELP triggers:
  1) Log event `sms.help`.
  2) Send HELP template §3.7.

- When inbound matches START triggers:
  1) Only re-enable if you can associate the number to a prior opt-in or you obtain fresh opt-in.
  2) Set `subscribed=true`.
  3) Log event `sms.opt_in_restored`.
  4) Send confirmation:
     > You’re re-subscribed to **{{business_name}}** texts. Msg frequency varies. Reply STOP to opt out.

### 4.3 Outbound enforcement
- Before sending any outbound SMS, check `subscribed` status.
- If `subscribed=false`, **do not send**; log `sms.blocked_suppressed`.

### 4.4 Edge cases
- If inbound message contains additional text like “stop texting me”, treat as STOP.
- If STOP received during an active automation, immediately cancel remaining queued messages.

---
## 5) Quiet Hours by Timezone — Algorithm Spec

**Goal:** avoid sending SMS outside allowed local hours (reduces complaints + risk).

### 5.1 Defaults
- Allowed window: **09:00–19:00 local time**, Monday–Saturday.
- Sunday: optional stricter window **10:00–16:00** (configurable).

### 5.2 Timezone resolution order
1) Lead-provided ZIP/postal code → map to timezone.
2) Lead address/city/state → map.
3) Area code inference (phone number) as fallback.
4) Business timezone as last resort.

### 5.3 Scheduling logic
- If a message is triggered outside allowed window:
  - Place into `deferred_queue` with `send_at = next_allowed_time`.
  - Log `sms.deferred_quiet_hours` with resolved timezone + next send time.

### 5.4 Overrides
- Manual agent action can override quiet hours if and only if:
  - Lead explicitly asks to be texted now, OR
  - The business is responding to an inbound message in the moment.
- Log `sms.quiet_hours_override` with reason.

---
## 6) Consent Logging (Audit-Ready)

Store a consent record **per phone number per business**, plus a global suppression list.

### 6.1 Required fields
- `phone_e164`
- `business_id`
- `lead_id`
- `consent_status` (opted_in / opted_out)
- `consent_source` (webflow_form / typeform / meta_lead_ad / inbound_text / manual)
- `consent_text_version` (hash or version ID of disclosure shown)
- `timestamp_utc`
- `ip_address` (if web)
- `user_agent` (if web)
- `landing_page_url`
- `form_id` / `ad_id` (if available)
- `proof_url_shown` (store the URL used in the disclosure if applicable)

### 6.2 Event log (append-only)
Events to record:
- `sms.sent`, `sms.delivered` (if available), `sms.failed`
- `sms.inbound`
- `sms.opt_out`, `sms.opt_in_restored`, `sms.help`
- `sms.blocked_suppressed`
- `sms.deferred_quiet_hours`, `sms.quiet_hours_override`

### 6.3 Retention
- Keep consent + message event logs **at least 24 months** (common dispute window). Prefer 36 months.

---
## 7) Twilio Deliverability Hardening (Pilot Runbook)

### 7.1 Use a Twilio Messaging Service (recommended)
- Put sending numbers inside a Messaging Service.
- Enable:
  - Sticky sender (if appropriate)
  - Smart encoding
  - Delivery receipt tracking (if available)

### 7.2 A2P 10DLC vs Toll-Free decision (quick)
- **10DLC**: best for consistent application-to-person traffic; typically required for US long codes at scale.
- **Toll-Free**: can work well for early pilots; still needs verification for best deliverability.

**Rule of thumb:** if you’re doing sustained outreach/automation, plan to register (10DLC or toll-free verification) early to prevent sudden filtering.

### 7.3 Content guidelines (avoid spam triggers)
- Avoid link shorteners (bit.ly, tinyurl). Use full domains.
- Avoid “FREE!!!”, excessive caps, repeated exclamation.
- Keep messages under 160 chars where possible; fewer segments = fewer issues.
- Identify the business early (“this is {{business_name}}”).
- Don’t include too many links; ideally zero links in the first message.

### 7.4 Fallback behaviors
- If message fails with carrier filtering / undelivered:
  - Retry once (after 2–5 minutes).
  - If still failing, switch to **call task** or **email notification** to the business.
  - Log `sms.failed` with Twilio error code.

---
## 8) Agency Handoff: Implementation Steps (No-Code Friendly)

### 8.1 What the agency must provide
- Business legal name + DBA
- Business address
- Support email (can use: agent_bob_replit+lead-copilot@agentmail.to for pilots)
- Terms URL + Privacy URL (publish pages ASAP)
- Lead sources: Webflow / Typeform / Meta Lead Ads / others

### 8.2 Copy/paste placement checklist
- Add opt-in disclosure near submit button.
- Add required consent checkbox/question where possible.
- Ensure STOP/HELP and msg rate language present.
- Update your automation to store consent fields (see §6).

### 8.3 Go-live verification checklist
- Submit a test lead with your own phone number.
- Confirm first message includes business name + STOP.
- Reply HELP → verify HELP response.
- Reply STOP → verify confirmation + suppression (no further sends).
- Trigger after-hours lead → verify message is deferred until next allowed window.

---
## 9) STOP/HELP Verification Matrix (Staging/Prod Sign-Off)

Run these tests and keep screenshots/log exports:
1) Inbound: “STOP” → confirmation sent, `subscribed=false`, outbound blocked.
2) Inbound: “stop texting me” → same as STOP.
3) Inbound: “HELP” → help text returns, no opt-out.
4) Inbound: “START” after STOP → re-subscribe logic + confirmation.
5) Outbound attempt to suppressed number → blocked + `sms.blocked_suppressed` logged.
6) After-hours trigger → deferred + `sms.deferred_quiet_hours` logged.

---
## 10) Customer-Facing Trust Footer (Optional)
Add to your website or onboarding emails:
> Local Lead Response Copilot helps businesses respond instantly to inquiries via SMS with compliant opt-in and opt-out handling. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to.
