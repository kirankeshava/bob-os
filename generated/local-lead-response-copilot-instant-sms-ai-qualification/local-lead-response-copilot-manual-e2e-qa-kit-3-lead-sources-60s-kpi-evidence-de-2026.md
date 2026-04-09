# Local Lead Response Copilot — Manual E2E QA Kit (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback (Copy-Ready)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:19:14.545Z

---

## Goal
Protect early pilot reputation (agencies + local service businesses) by verifying end-to-end behavior across 3 lead sources and proving speed-to-lead: **first outbound SMS sent < 60 seconds** from lead receipt. Provide deterministic fail-safe behavior when LLM fails/timeouts.

## Lead Sources in Scope
1) **Generic Webhook JSON** (any form/ads tool that can POST JSON)
2) **Jotform** (real form tool) – use Webhook integration to POST lead data
3) **HubSpot** (CRM) – validate logging/notes formatting and dedupe/idempotency

## KPI & Evidence Requirements (<60s)
Record these timestamps for each trial:
- **T0 (Lead Received):** server/webhook receipt time (request log) OR Jotform submission time OR HubSpot form submission time.
- **T1 (First SMS Sent):** message creation time (provider log) or app outbound log.
- **Delta = T1 - T0** must be **<= 60 seconds**.
Evidence to store per trial:
- Screenshot/export of inbound request log showing T0
- Screenshot/export of outbound SMS log showing T1
- Copy of the SMS transcript (first 4 messages max)

Suggested sample size for pilot proof: **20 trials total** (minimum 5 per source, remaining focused on high-risk cases).

---

## Standard Data Contract (Normalized Fields)
All sources should map into these canonical fields:
- first_name
- last_name
- phone
- email
- service (e.g., “water heater repair”)
- zip
- lead_source (webhook|jotform|hubspot)
- consent (true/false/unknown)
- event_id (unique id per submission; used for idempotency)

### Phone Validation Rules (Acceptance)
- Missing phone: **no SMS sent**, create internal alert/CRM note: “Missing phone; cannot text.”
- Invalid phone (fails E.164 conversion or length): **no SMS sent**, log reason; if email present send fallback email (optional) or CRM note.

---

## Copy-Paste Test Payloads — Generic Webhook JSON
Use POST with Content-Type: application/json.

### A) Valid lead (baseline)
{
  "event_id": "qa-webhook-001",
  "first_name": "Jamie",
  "last_name": "Test",
  "phone": "+14155550101",
  "email": "jamie.test@example.com",
  "service": "AC repair",
  "zip": "94107",
  "lead_source": "webhook",
  "consent": "true"
}
Expected:
- First SMS sent within 60s.
- Qualification starts (LLM OR deterministic fallback if configured).

### B) Missing phone
{
  "event_id": "qa-webhook-002",
  "first_name": "Jamie",
  "last_name": "Test",
  "email": "jamie.test@example.com",
  "service": "AC repair",
  "zip": "94107",
  "lead_source": "webhook",
  "consent": "true"
}
Expected:
- No SMS.
- CRM note/alert created: missing phone.

### C) Invalid phone
{
  "event_id": "qa-webhook-003",
  "first_name": "Jamie",
  "last_name": "Test",
  "phone": "12345",
  "email": "jamie.test@example.com",
  "service": "AC repair",
  "zip": "94107",
  "lead_source": "webhook",
  "consent": "true"
}
Expected:
- No SMS.
- CRM note/alert: invalid phone.

### D) Duplicate lead (same event_id)
Send payload A twice.
Expected:
- Only one conversation started.
- Second attempt is idempotent: no second outbound SMS; log “duplicate event_id ignored.”

### E) Webhook retry (new event_id but same phone within 2 minutes)
{
  "event_id": "qa-webhook-004",
  "first_name": "Jamie",
  "last_name": "Test",
  "phone": "+14155550101",
  "email": "jamie.test@example.com",
  "service": "AC repair",
  "zip": "94107",
  "lead_source": "webhook",
  "consent": "true"
}
Expected:
- Deduping rule triggers (phone + time window + service match): do not spam; append note to existing thread/CRM.

---

## Jotform Test Setup (Free Tier)
Form fields:
- First Name, Last Name, Phone, Email, Service Needed (dropdown), ZIP
Webhook integration:
- POST raw submission JSON to product webhook.
Test cases in Jotform:
1) Baseline submit (valid phone)
2) Missing phone
3) Invalid phone format
4) Rapid double-submit (duplicate)
Expected: same as webhook acceptance + <60s.

---

## HubSpot CRM Verification (Free/Dev)
### Required CRM Write Behavior
For each lead, create/update contact and append **one structured timeline note** per conversation start.

### HubSpot Note Formatting (Exact Spec)
Title: “Lead Copilot Qualification Started”
Body (plain text, stable keys for scanning):
- Source: {lead_source}
- Event ID: {event_id}
- Received At (UTC): {T0}
- First SMS Sent At (UTC): {T1}
- First Response SLA (sec): {delta_seconds}
- Status: {started|after_hours|invalid_phone|missing_phone|opted_out|handoff}
- Service: {service}
- ZIP: {zip}
- Opt-out: {true|false}
- Conversation Link/Thread ID: {internal_id}

Idempotency requirement:
- If note exists with same Event ID, do not create a second note.

---

## High-Risk Scenario Test Cases (Acceptance)
### 1) STOP / HELP (Compliance)
- When user texts “STOP”: immediately confirm opt-out (“You’re opted out. No more messages.”) and set opt-out flag; no further automated messages.
- When user texts “HELP”: return help message with business identity and support email.
Include support email: agent_bob_replit+lead-copilot@agentmail.to

### 2) After-hours behavior
Define business hours (example): Mon–Fri 8am–6pm local.
If lead arrives after-hours:
- Send 1 message acknowledging and setting expectation: “We’ll follow up at {next_open_time}.”
- Offer emergency option if applicable.
- Do not attempt booking flow if calendar is closed.

### 3) Concurrency
Submit 3 leads within 30 seconds (different phones).
Expected: all receive first SMS under 60s; no cross-thread leakage.

### 4) Calendar link failure
If scheduling link/booking API fails:
- Send fallback: offer 2 manual time windows and escalate to human.
- Log error; create CRM note “calendar_failure=true”.

---

## Deterministic Fallback Qualification Flow (LLM Down / Timeout)
Trigger fallback when:
- LLM call errors, times out (>5s), or returns empty.

Message 1 (immediate):
“Hi {first_name}, this is the scheduling assistant for {Business}. Thanks for reaching out about {service}. What’s the address or ZIP for the job?”

If ZIP/address provided → Message 2:
“Got it. Is this an emergency that needs service today? Reply 1) Yes today 2) No, flexible”

If “1” → Message 3:
“Understood. What’s the best time window today? Reply 1) Morning 2) Afternoon 3) Evening”

If “2” → Message 3 alt:
“What day works best? Reply 1) ASAP 2) This week 3) Next week”

Then Message 4 (handoff):
“Thanks — a team member will confirm the exact time shortly. If you need to reach us, email agent_bob_replit+lead-copilot@agentmail.to.”

Timeout handling:
- If no reply within 10 minutes: send one nudge: “Just checking — do you still need help with {service}? Reply YES to continue.”
- If no reply after 24 hours: stop automation; log “no_response_24h”.

STOP/HELP overrides:
- At any point, if inbound contains STOP: opt-out immediately.
- If inbound contains HELP: send help message and pause.

---

## Results Table (Paste Into Notion/Sheet)
Columns:
Trial ID | Source | Scenario | Event ID | Phone | T0 | T1 | Delta(s) | Pass/Fail | Transcript Saved (Y/N) | CRM Note Verified (Y/N) | Bugs Found

---

## Bug/Fix Log (Prioritized)
Fields:
Bug ID | Severity (P0–P3) | Scenario | Steps to Reproduce | Expected | Actual | Evidence Link | Suggested Fix | Owner | Status

P0 examples:
- Sends SMS to invalid/missing phone
- STOP does not fully suppress future sends
- >60s first response on baseline lead

---

## Customer-Facing Legitimacy Link (for pilot comms)
If asked to verify the product during pilots, share:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

This QA kit is designed to run manually during first pilots (no automation) and still produce hard evidence (<60s SLA) plus a prioritized defect list before onboarding additional agencies.