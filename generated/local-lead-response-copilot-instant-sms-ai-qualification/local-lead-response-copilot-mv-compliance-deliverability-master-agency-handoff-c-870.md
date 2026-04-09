# Local Lead Response Copilot — MV Compliance + Deliverability Master Agency Handoff (Copy/Paste Pack)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T11:08:55.276Z

---

# Local Lead Response Copilot — MV Compliance + Deliverability Master Agency Handoff

**Proof URL (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
**Support:** agent_bob_replit+lead-copilot@agentmail.to

## 1) Minimum-Viable Compliance Checklist (Pilot-Ready)
1. **Clear opt-in at capture** (unchecked checkbox where possible). Must disclose: automated texts, msg/data rates, frequency estimate, STOP/HELP, and links to Terms/Privacy.
2. **Document consent** (timestamp, source, form/ad context, IP/user agent if web, phone, and disclosure version).
3. **STOP/HELP handling** (immediate compliance + global suppression).
4. **Quiet hours** by lead timezone with deferral.
5. **Sender identity**: first message includes business name + purpose.
6. **Avoid prohibited content** (SHAFT: sex, hate, alcohol, firearms, tobacco/cannabis) and misleading claims.
7. **No link shorteners** (bit.ly, tinyurl). Prefer first-party domain links.
8. **Rate limiting + retry** on carrier errors; respect opt-outs.
9. **A2P readiness**: if using US 10DLC at scale, ensure brand/campaign registration.

## 2) Copy/Paste Opt-In Language (Forms + Ads)
### A) Webflow / Website Form (recommended checkbox)
Add a required checkbox with this label (or similar):

> **SMS Consent (optional):** By checking this box, I agree to receive **automated text messages** from **[BUSINESS NAME]** about my request and appointment scheduling. Consent is not a condition of purchase. Msg frequency varies. Msg & data rates may apply. Reply **STOP** to opt out, **HELP** for help. Terms: **[TERMS URL]** Privacy: **[PRIVACY URL]**.

Also add near the submit button (small print acceptable):

> By submitting, you agree to be contacted about your request. If you opted into SMS, you may receive automated texts. Reply STOP to cancel.

### B) Typeform (if checkbox available)
Use a “Yes, I agree” statement with explicit disclosure:

> I agree to receive automated SMS from **[BUSINESS NAME]** about my request. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: **[TERMS URL]** Privacy: **[PRIVACY URL]**.

If Typeform cannot capture checkbox cleanly, add a required question:

**Question:** “Do you agree to receive text messages about your request?”  
**Choices:** Yes / No  
**If Yes (show):** disclosure text above.

### C) Meta / Facebook Lead Ads (Higher risk, use explicit disclaimer)
In the Lead Form “Privacy Policy” and “Custom Disclaimer” areas, paste:

> By submitting this form, you agree to receive **automated** SMS from **[BUSINESS NAME]** regarding your request and scheduling. Consent not required to purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: **[TERMS URL]** Privacy: **[PRIVACY URL]**.

**Important:** Ensure the client’s Meta lead form includes a link to Privacy Policy and the disclaimer text is visible before submit.

## 3) Message Templates (Compliant, Deliverability-Friendly)
### First response (immediate; no links if possible)
> Hi {{first_name}}, this is {{agent_name}} with **{{business_name}}**. Got your request for **{{service}}** in **{{city}}**. To confirm—what’s the address (or nearest cross-street) for the work?

### Qualification question (short, 1 question at a time)
> Thanks. When would you like us to come out—**today/tomorrow** or **this week**?

### Booking prompt
> Great—are you available **{{slot1}}** or **{{slot2}}** for a quick call/visit? Reply 1 or 2.

### Confirmation
> Confirmed for {{confirmed_time}}. If anything changes, reply here. Reply STOP to opt out.

### Missed-call text-back
> Missed your call—this is **{{business_name}}**. What service do you need help with (e.g., repair/replace/install)? Reply STOP to opt out.

### Re-engagement (after 24–72h; max 1–2 attempts)
> Checking in—do you still want help with **{{service}}**? Reply YES and we’ll get you scheduled. Reply STOP to opt out.

## 4) STOP / HELP Handling (Implementation Spec)
### Keywords
- **STOP keywords:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT (case-insensitive; trim punctuation).
- **HELP keywords:** HELP, INFO, SUPPORT.

### State machine
- **Default:** `subscribed`
- On inbound STOP keyword → set `opted_out_at=now`, `opt_out_source=inbound_sms`, add phone to **Global Suppression List**.
- While opted out: block all outbound messages except **opt-in confirmation** if user later re-subscribes.
- Re-subscribe only on explicit opt-in event (form checkbox/ad consent) OR inbound “START/UNSTOP” *if you choose to support it* (optional; only if allowed by your policy).

### Required STOP auto-reply (immediate)
> You’re opted out and will no longer receive texts from {{business_name}}. Reply HELP for help.

### Required HELP auto-reply
> {{business_name}}: We text about your request/appointments. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. More: {{proof_url}}

### Audit log events (must record)
- `sms_inbound_received` (from, to, body, timestamp)
- `sms_opt_out_triggered` (keyword matched, normalized keyword, timestamp)
- `sms_suppression_enforced` (message_id blocked, reason=opted_out)
- `sms_help_sent` (timestamp)

### Verification test matrix (minimum)
1. Send STOP → confirm opt-out reply + suppression list entry.
2. Attempt outbound after STOP → message must be blocked + logged.
3. Send HELP → receives help reply.
4. Edge cases: “Stop.” “ STOP ” “cancel” mixed-case.

## 5) Quiet Hours by Timezone (Implementation Spec)
### Default policy (pilot-safe)
- **Allowed send window:** 8:00 AM–8:00 PM **lead local time** (configurable per client).
- Outside window: do not send; **queue** and send at next allowed time.

### Timezone resolution order
1. Lead-provided timezone (if captured).
2. Lead zip/postal → map to timezone.
3. Lead phone NPA/NXX lookup → approximate timezone.
4. Client’s business timezone fallback.

### Scheduling rules
- If lead submits at 9:30 PM local: enqueue first message for 8:05 AM next day.
- If multiple queued messages exist: send only the newest relevant step (avoid “burst” at 8 AM).
- Log `quiet_hours_deferred` with original send time, scheduled send time, tz used, resolution method.

### Override
- Manual agent override allowed only if lead has engaged (replied within last X hours) and client opts in to override policy.

## 6) Consent Logging (Dispute-Ready Schema)
Store per phone number and per consent event:
- `phone_e164`, `lead_id`
- `consent_status` (subscribed/opted_out)
- `consented_at`, `consent_source` (webflow/typeform/meta/import)
- `consent_text_version` (hash or version id of disclosure copy)
- `landing_page_url` / `form_id` / `ad_id`
- `ip_address`, `user_agent` (web)
- `proof_url_shown` (boolean) and `terms_url`, `privacy_url`
- `opted_out_at`, `opt_out_source`, `opt_out_keyword`
**Retention:** keep at least 24 months (TCPA litigation window risk).

## 7) Twilio Deliverability Setup (Agency Runbook)
1. Create **Messaging Service** per client (or per brand) and attach the sending number(s).
2. Enable **Smart Encoding** and set status callback URL for delivery events.
3. Decide route:
   - **Low volume pilots:** one local 10DLC may work but still often needs A2P registration.
   - **Higher volume / scaling:** complete **A2P 10DLC Brand + Campaign** early.
4. Content guardrails:
   - Keep messages short, conversational, and personalized.
   - Avoid ALL CAPS, excessive punctuation, repeated identical blasts.
   - Avoid link shorteners; use your domain.
   - Include business name early; include STOP language at least in first or confirmation messages.
5. Fallback behaviors:
   - If SMS fails with carrier block: mark as `delivery_failed` and optionally attempt voice call or email (if captured).

## 8) Terms of Service (SMS) — Paste-Ready Page
**Title:** Terms of Service (SMS)

Local Lead Response Copilot helps businesses respond to inquiries by sending text messages related to service requests, scheduling, and updates.

### SMS Program
If you opt in to receive SMS from a participating business using Local Lead Response Copilot, you agree to receive automated text messages about your inquiry, scheduling, and related service communications. Message frequency varies. Msg & data rates may apply.

### Opt-Out
Reply **STOP** at any time to stop receiving SMS messages. After you opt out, you may receive a one-time confirmation of your opt-out.

### Help
Reply **HELP** for help or contact us at **agent_bob_replit+lead-copilot@agentmail.to**. Proof of service: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

### Consent
Consent to receive SMS is not a condition of purchase. You represent that you are the authorized user of the phone number provided.

### Carrier Disclaimer
Carriers are not liable for delayed or undelivered messages.

### Prohibited Use
You may not use the service for unlawful, deceptive, or abusive messaging, or for content restricted by carriers.

### Changes
We may update these Terms periodically. Continued use after changes constitutes acceptance.

## 9) Privacy Policy — Paste-Ready Page
**Title:** Privacy Policy

Local Lead Response Copilot processes contact information submitted through forms/ads to help businesses respond to customer inquiries.

### Information We Collect
- Contact details (name, phone number, email if provided)
- Inquiry details (service requested, notes)
- Messaging metadata (timestamps, delivery status)
- Consent records (opt-in source, consent time, disclosure version)

### How We Use Information
- To send messages related to your request and scheduling
- To maintain suppression lists for opt-outs
- To improve reliability and prevent abuse

### Sharing
We share information with the business you contacted and service providers that enable messaging (e.g., SMS carriers/platform providers) solely to provide the service.

### Data Retention
We retain consent and messaging records for compliance and dispute resolution purposes.

### Your Choices
You can opt out of SMS anytime by replying **STOP**. For questions, contact **agent_bob_replit+lead-copilot@agentmail.to**.

### Contact
Support: agent_bob_replit+lead-copilot@agentmail.to  
Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
