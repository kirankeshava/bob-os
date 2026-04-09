# Local Lead Response Copilot — Minimum Viable SMS Compliance Pack (Agency Copy/Paste + MVP Specs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T19:38:11.916Z

---

## Purpose (MVP, wartime)
This pack covers only what prevents pilot failures and carrier/TCPA/CTIA issues: (1) explicit opt-in language at the lead source, (2) STOP/HELP handling + suppression, (3) quiet hours, and (4) consent logging. It is designed for agencies to copy/paste into Webflow/Typeform/Meta Lead Ads and to configure follow-up safely.

**Business legitimacy references (include in agency materials):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Copy/Paste Opt‑In Language (lead source)
### A) Webflow form (add under phone field)
**Checkbox label (required):**
“I agree to receive text messages about my request from [BUSINESS NAME] at the phone number provided, including automated messages. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

**Hidden fields to capture (recommended):**
- `consent_checkbox=true/false`
- `consent_text_version=2026-04-09_mvp`
- `lead_source=webflow`
- `page_url={{current_page_url}}`

### B) Typeform (add as required “Legal” / statement + yes/no)
**Statement:**
“By submitting, you agree to receive text messages from [BUSINESS NAME] about your request, including automated messages. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”

**Question (required):**
“Do you agree to receive text messages at the number provided?” Yes/No (must be Yes to submit).

### C) Meta/Facebook Lead Ads
Use Meta’s built-in “SMS consent” option when available.

**Custom disclaimer (paste into ‘Privacy Policy / Disclaimer’ field):**
“By submitting this form, you agree to receive text messages from [BUSINESS NAME] about your request, including automated messages. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

**Important:** If the lead form does not capture explicit SMS consent, do not start SMS automation. Send email only until consent exists.

---

## 2) First Message Template (MVP compliant, low-spam)
Send immediately after lead submits (within ~60 seconds).

**Template (business-owned number):**
“Hi {{first_name}} — this is {{agent_name}} with {{business_name}}. Got your request for {{service}}. A quick question so I can help: what’s your address (or ZIP)?”

**If you must include opt-out in first message (recommended on first or second msg):**
“Reply STOP to opt out.”

**Avoid (spam triggers):** “FREE!!!”, “limited time”, “act now”, excessive links, ALL CAPS, repeated emojis.

---

## 3) STOP/HELP Handling (MVP implementation spec)
### Keyword sets
- **STOP intent:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
- **HELP intent:** HELP, INFO, SUPPORT

### Behavior
1. On inbound message, normalize text: trim, uppercase, remove punctuation.
2. If matches STOP intent:
   - Mark phone number as **suppressed_globally=true** immediately.
   - Send one confirmation (single message):
     “You’re opted out and will no longer receive texts from {{business_name}}. Reply HELP for help.”
   - Block all future outbound SMS to this number across all workflows/campaigns until user reconsents.
3. If matches HELP intent:
   - Send:
     “{{business_name}}: help line {{support_email}}. To stop texts reply STOP. Msg frequency varies. Msg&data rates may apply. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”
4. If suppressed user sends any non-HELP message:
   - Do not send marketing/qualification flows.
   - Optionally send a single informational response (recommended: none, to avoid re-engagement without consent).

### Logging requirements (for audit)
For every inbound STOP/HELP:
- timestamp_utc
- from_number
- to_number
- keyword_detected
- action_taken (suppressed / help_sent)
- lead_id (if known)
- source (twilio_webhook)
- raw_message_body

---

## 4) Quiet Hours (MVP spec)
### Default sending window
- **Allowed:** 8:00 AM – 8:00 PM **recipient local time**
- **Disallowed:** outside window → queue message

### Timezone resolution order
1. Lead-provided state/ZIP → map to timezone
2. Area code lookup (phone) → approximate timezone
3. Business timezone fallback (config)

### Queue behavior
- If message is triggered during quiet hours, queue to send at next allowed time (8:05 AM local).
- Preserve ordering: initial message should send before any follow-ups.

### Emergency override
- Admin-only manual send allowed (logged with `override=true` and reason).

---

## 5) Agency Go‑Live Checklist (MVP)
1. Lead source has explicit SMS consent (checkbox/statement + required Yes).
2. Store consent fields: consent=true, timestamp, lead_source, page/ad identifier.
3. STOP/HELP tested with a real device:
   - Send STOP → receive opt-out confirmation; ensure future outbound is blocked.
   - Send HELP → receive help message.
4. Quiet hours tested by forcing a lead trigger outside the window → message queued.
5. Messaging content:
   - No shortened links on first contact.
   - Use plain, conversational language.
6. Support references present in materials:
   - https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
   - agent_bob_replit+lead-copilot@agentmail.to

---

## What we deliberately deferred (post-pilot)
- Full A2P 10DLC campaign taxonomy and throughput tuning (do once send volume is proven)
- Multi-language disclosures, advanced reconsent flows, detailed DNC ingestion automation
- Deep content linting automation and carrier feedback-loop dashboards

This MVP pack is sufficient to remove the most common compliance objections and prevent opt-out/quiet-hours issues from killing deliverability during first pilots.