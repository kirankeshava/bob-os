# Local Lead Response Copilot — Manual E2E QA Execution Runbook (3 Lead Sources) + Payloads + <60s Evidence + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:50:56.864Z

---

## Scope
Goal: protect reputation in early pilots by validating (1) <60s first response, (2) safe fallback behaviors when LLM/downstream systems fail, and (3) correct CRM logging/deduping across three lead sources:
1) Generic Webhook JSON (direct POST)
2) Jotform (real form tool)
3) HubSpot (CRM)

Reference assets for any customer-facing comms/screenshots:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact email: agent_bob_replit+lead-copilot@agentmail.to

## Preconditions (no spend)
- Access to product’s inbound webhook endpoint URL (call it: `INBOUND_WEBHOOK_URL`).
- Access to SMS logs (Twilio console or internal logs) sufficient to see send timestamps and delivery status.
- A test calendar link (or simulated broken link) used by the booking step.
- A deterministic fallback mode toggle OR a way to simulate LLM failure (timeout / invalid API key in staging / feature flag).

## KPI Definition and Evidence Collection
### KPI: First response < 60 seconds
Measure: `t_sms_first_sent - t_lead_received`.
Capture evidence for each trial:
- t0 Lead received timestamp (server log timestamp for webhook receipt OR platform submission time)
- t1 First outbound SMS “sent” timestamp (provider send time)
- Δ = t1 - t0 in seconds
Pass if Δ <= 60s.
Store: screenshot or log line for t0 and t1, plus the phone and lead id.

### Minimum sample size for confidence (manual)
- 20 total trials across sources (recommended breakdown):
  - 8 Generic webhook
  - 6 Jotform
  - 6 HubSpot
Include at least:
- 3 invalid/missing phone
- 3 duplicates
- 2 after-hours
- 3 concurrency (submit 3 leads within 10 seconds)
- 2 calendar failures
- 2 simulated LLM failures

## Acceptance Criteria (High-Risk Behaviors)
1) Missing phone: no SMS attempt; system logs error; creates internal task/CRM note stating “No phone provided”; optional email to business owner; no repeated retries.
2) Invalid phone: no SMS attempt; graceful error; logs “invalid phone”; no message spam.
3) STOP: upon receiving “STOP”, system halts future messages to that number, confirms opt-out, logs opt-out event; dedupe ensures no further sends.
4) HELP: responds with help text including business identity and contact email; logs event.
5) After-hours: uses after-hours script, does not attempt immediate booking unless configured; offers next-day scheduling; logs after-hours routing.
6) Multiple concurrent leads: each lead gets its own conversation state; no cross-talk between leads; first SMS still <60s.
7) Calendar link failures: if booking link unavailable, system offers manual booking fallback (“Reply with preferred time” or “We’ll call you”); logs calendar failure.
8) Webhook retries: same event id / signature replay does not create duplicate SMS threads; idempotency within 24h (configurable) recommended.
9) Duplicate leads (same phone within short window): do not spam; either attach to existing thread or send one acknowledgement only.
10) HubSpot note formatting: note created/updated with consistent structure (see template below), includes timestamps, lead source, qualification answers, and final disposition.

## Deterministic Fallback Qualification Flow (LLM-safe mode)
Trigger fallback when:
- LLM call errors, times out > 8s, returns empty output, or confidence gate fails.
- Any downstream dependency fails (calendar API, CRM API) and we need predictable comms.

Fallback Script (SMS) — Home Services default
Message 1 (immediate):
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—what service do you need help with? Reply 1) Repair 2) Install 3) Quote 4) Other”

Branching:
- If 1/2/3/4 not received within 3 minutes: send reminder:
  “Just checking—reply 1, 2, 3, or 4 so we can get you scheduled.”
- If still no reply after 10 minutes: stop automation; tag as “No response”; optional internal alert.

After selecting service:
Q2: “What’s your ZIP code?”
- Validate 5 digits; if invalid: “Please reply with a 5-digit ZIP code.” (2 retries max)

Q3: “When do you want this done? Reply 1) ASAP 2) This week 3) Not sure”

Booking step:
- If calendar link healthy: “Great—book a time here: {{calendar_link}}. If you prefer, reply CALL and we’ll reach out.”
- If calendar link failure detected: “We’re having trouble with online booking. Reply with a good time window (e.g., ‘tomorrow 2–5pm’) and we’ll confirm by text, or reply CALL.”

Escalation rules:
- If lead replies “CALL”: create “Call requested” task and notify owner.
- If lead is angry/complains: send apology + stop automation + notify owner.

Compliance keywords:
- STOP: “You’re opted out and will no longer receive messages.” (then add to suppression list)
- HELP: “Help: You’re receiving texts from {{business_name}} about your request. Reply STOP to opt out. Contact: agent_bob_replit+lead-copilot@agentmail.to”

## HubSpot Note Formatting (Expected)
Create a Note on Contact (and associated Deal if applicable) with EXACT sections:
Title: “Lead Copilot Qualification — {{source}} — {{YYYY-MM-DD HH:mm:ss TZ}}”
Body:
1) Source: {{GenericWebhook|Jotform|HubSpotForm|Other}}
2) Lead Received: {{t0}}
3) First SMS Sent: {{t1}} (Δ={{seconds}}s)
4) Phone: {{E164}}
5) Answers:
   - Service: {{answer}}
   - ZIP: {{answer}}
   - Timing: {{answer}}
6) Status: {{Booked|Call Requested|No Response|Invalid Phone|Opted Out|After-hours Routed|Calendar Failure}}
7) Transcript (last 6 messages):
   - [{{time}}] Us: ...
   - [{{time}}] Them: ...
8) System events:
   - LLM mode: {{AI|DeterministicFallback}}
   - Dedupe: {{new|merged|ignored_duplicate}}
   - Retries: {{count}}

Pass if:
- Note is readable, consistently structured, includes KPI timestamps and final status, and does not duplicate across retries.

## Test Execution — Lead Source 1: Generic Webhook JSON
### Endpoint
Set `INBOUND_WEBHOOK_URL` to the product’s webhook.

### Baseline payload (valid)
Use curl:
```bash
curl -X POST "$INBOUND_WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -H 'X-Event-Id: qa-001' \
  -d '{
    "source":"generic_webhook",
    "event_id":"qa-001",
    "submitted_at":"2026-04-09T12:00:00Z",
    "lead":{
      "first_name":"Test",
      "last_name":"Lead",
      "phone":"+14155550101",
      "email":"test.lead@example.com",
      "service":"Plumbing",
      "message":"Leaky faucet"
    }
  }'
```
Expected:
- System logs lead receipt t0.
- First SMS sent t1 within 60s.
- Conversation state created for +14155550101.

### Missing phone
`phone` omitted or empty.
Expected: no SMS attempt; log + CRM/internal note “Missing phone”.

### Invalid phone
`phone":"123"`.
Expected: no SMS attempt; log “Invalid phone”; no retries.

### Duplicate lead (same event_id)
Replay exact same request with same `X-Event-Id` and `event_id`.
Expected: idempotent; no second SMS; note indicates duplicate ignored.

### Webhook retry simulation (new header but same event_id)
Send with `X-Event-Id: qa-001-retry` but payload `event_id":"qa-001"`.
Expected: treated as retry; no duplicate send.

### Concurrency (3 leads in 10s)
Send qa-010/011/012 with different phones quickly.
Expected: 3 independent threads; all t1-t0 <= 60s.

## Test Execution — Lead Source 2: Jotform
### Setup (free)
- Create a Jotform with fields: First Name, Last Name, Phone, Email, Service dropdown, Message.
- Configure submission webhook/integration to `INBOUND_WEBHOOK_URL` (or via Zapier/Make only if free tier available; prefer direct webhook).

### Test cases
- Normal submission (valid phone)
- Missing phone field submission
- Invalid phone format submission
- Duplicate submission (same phone twice within 2 minutes)
- After-hours submission (submit outside configured business hours)

Expected:
- Same KPI and behaviors as generic webhook.
- Source recorded as “Jotform” in CRM note.

## Test Execution — Lead Source 3: HubSpot (CRM)
### Setup (free developer)
- Create HubSpot developer account.
- Create a test form OR workflow that triggers webhook to `INBOUND_WEBHOOK_URL` on form submission / new contact.
- Ensure mapping includes phone, name, email, and source metadata.

### Test cases
- New contact with valid phone
- Contact created without phone
- Duplicate contact creation attempt
- Verify note formatting on the HubSpot contact timeline

Expected:
- Note created/updated once per lead.
- Transcript and KPI section present.

## STOP/HELP Test Procedure (requires real SMS receiving)
1) Submit a valid lead for a phone you control.
2) After first SMS arrives, reply “HELP”. Verify help response includes contact email agent_bob_replit+lead-copilot@agentmail.to.
3) Reply “STOP”. Verify immediate opt-out confirmation.
4) Trigger another lead for same phone. Expected: no SMS is sent; logs show suppressed.

## Calendar Failure Tests
- Configure calendar link to an invalid URL OR simulate calendar API down.
Expected: fallback message offering manual scheduling; status “Calendar Failure” logged.

## Results Capture Table (paste into sheet)
Columns:
- Trial ID
- Source
- Scenario
- Phone
- t0 lead received
- t1 first SMS sent
- Δ seconds
- Pass/Fail
- Evidence link (screenshot/log)
- Notes

## Bug/Fix Log (triage)
Columns:
- Bug ID
- Severity (P0/P1/P2)
- Area (SMS/LLM/CRM/Webhook/Calendar)
- Steps to reproduce
- Expected
- Actual
- Impact on churn/reputation
- Suggested fix
- Owner
- Status

## Known Likely Failure Points to Watch (P0)
- Missing/invalid phone still attempts send (carrier errors + reputation risk)
- STOP not honored across retries/dedupes
- Duplicate webhook events causing message spam
- LLM failure leading to silence >60s (must flip to deterministic immediately)
- HubSpot note duplication/clutter (agency trust issue)

## Definition of Done for Pilot QA
- 20 trials executed and logged.
- 95%+ of valid leads achieve <60s first SMS (all should, but allow 1 anomaly if provider delay is documented).
- All STOP/HELP behaviors verified.
- At least 2 simulated LLM failures verified to fall back deterministically without exceeding 60s for first response.
- A prioritized bug list (P0/P1) created with clear reproduction steps.