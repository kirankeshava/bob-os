# Local Lead Response Copilot — Manual E2E QA Runbook (3 Lead Sources) + Results + Bug Log + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:13:09.816Z

---

# Local Lead Response Copilot — Manual E2E QA Runbook (Pilot-Ready)

## Purpose
Validate end-to-end lead response reliability across **3 lead sources** and protect agency reputation during pilots (pre-revenue) using **manual checks** that generate evidence:
- **KPI:** first outbound SMS sent in **< 60 seconds** from lead creation.
- **Fail-safe:** when the LLM fails/timeouts, switch to a **deterministic question flow** that still qualifies and escalates safely.

**Customer legitimacy references (include in any comms/screenshots):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

---
## Scope: 3 Lead Sources
1) **Generic Webhook JSON** (any form/ad platform can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (lead/contacts as source + note logging as sink)

> If HubSpot is not yet wired as a source, still run: create contact -> trigger workflow/webhook -> verify SMS + note formatting.

---
## KPI: <60s First Response Measurement Protocol
### Timestamp points to capture (every test)
- **T0 (Lead Created):**
  - Webhook: timestamp in request sender tool (curl/Postman) OR server access log.
  - Jotform: submission timestamp (Jotform submission record).
  - HubSpot: contact create timestamp (record timeline).
- **T1 (First SMS Sent):** timestamp from SMS provider logs (Twilio/telephony logs) OR app outbound message log.
- **Delta:** T1 - T0 must be **<= 60 seconds**.

### Evidence to store
For each test case store:
- Screenshot/export of T0 source record (submission/contact)
- Screenshot/export of outbound SMS log with timestamp
- Any app log line showing receipt + send

### Sample size for pilot proof
- Minimum **20 total trials** across the 3 sources.
- At least **3 trials per edge case** where feasible (STOP/HELP can be 1-2 carefully controlled).

---
## Deterministic Fallback Mode (LLM Down/Timeout)
Trigger fallback when:
- LLM API error, timeout > 5s, empty response, or malformed tool call.

### Fallback conversation (exact script)
**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—quick question so I can help: What service do you need? Reply with 1) Repair 2) Install 3) Quote 4) Other.”

If reply not in {1,2,3,4}:
**Message 2:**
“No problem—reply with a few words about what you need (example: ‘water heater install’).”

Next:
**Message 3:**
“Great. What’s your zip code?”

Validate zip = 5 digits; otherwise:
“Reply with a 5-digit zip code so we can confirm service area.”

Next:
**Message 4:**
“When would you like help? Reply 1) ASAP 2) This week 3) Just researching.”

Next (booking path):
- If calendar link available: 
“Perfect—book a time here: {{calendar_link}}. If you prefer, reply with 2 time windows and we’ll confirm.”
- If calendar link fails/unavailable:
“Looks like scheduling is loading slowly. Reply with 2 time windows (e.g., ‘today 3–5’ or ‘tomorrow 9–11’) and we’ll confirm ASAP.”

Escalation-to-human conditions (always safe):
- User angry/complaint keywords ("refund", "lawsuit", profanity)
- STOP/HELP compliance required
- 2+ failed validations
- After-hours (optional) if business requires

**Escalation message:**
“Thanks—someone from our team will take over shortly. If urgent, call {{business_phone}}.”

### STOP/HELP compliance (required)
- If inbound equals “STOP” (case-insensitive):
  - Immediately mark contact **do-not-text**.
  - Send confirmation: “You’re opted out and will no longer receive messages. Reply START to re-subscribe.” (or provider-compliant wording)
- If inbound equals “HELP”:
  - Send: “Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to and see https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

---
## Test Data + Payloads
### A) Generic Webhook JSON (baseline)
**Valid lead payload:**
```json
{
  "source": "webhook",
  "lead_id": "qa-001",
  "created_at": "2026-05-14T12:00:00Z",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550101",
  "email": "testlead@example.com",
  "service": "HVAC repair",
  "zip": "94107",
  "after_hours": false,
  "utm": {"campaign": "qa", "medium": "test"}
}
```
**Missing phone payload:**
```json
{ "source":"webhook","lead_id":"qa-002","first_name":"NoPhone","phone":"" }
```
**Invalid phone payload:**
```json
{ "source":"webhook","lead_id":"qa-003","first_name":"BadPhone","phone":"123" }
```
**Duplicate lead payload (same lead_id):**
```json
{ "source":"webhook","lead_id":"qa-001","first_name":"Test","phone":"+14155550101" }
```

Expected:
- Missing/invalid phone: **no SMS sent**, create internal task/CRM note “Phone missing/invalid—manual follow-up required.”
- Duplicate: dedupe within window (e.g., 24h) => **no second SMS**, log “duplicate suppressed”.

### B) Jotform
Create a free Jotform with fields:
- First name, Last name, Phone, Email, Service needed, Zip
Configure submission webhook to product endpoint.

Expected:
- Submission triggers SMS within <60s.
- Field mapping correct (first name, service type included in Message 1).

### C) HubSpot
Use HubSpot free/developer test account.
Scenarios:
- New contact created (or form submission into HubSpot) triggers webhook/workflow into product.
- Product writes back to HubSpot timeline/notes.

**CRM note formatting (expected template):**
Title: “Lead Copilot Qualification Summary”
Body (plain text, consistent):
- Lead ID: {{lead_id}}
- Source: {{source}}
- First response sent at: {{timestamp}}
- Conversation status: {{Qualified|Unqualified|Opted-out|Needs human}}
- Answers:
  - Service: {{value}}
  - Zip: {{value}}
  - Timeline: {{value}}
- Booking:
  - Calendar link sent: {{yes/no}}
  - Appointment booked: {{yes/no}} (time if yes)
- Compliance:
  - STOP received: {{yes/no}}
  - HELP received: {{yes/no}}

---
## Required Test Cases (Pass/Fail)
1) Missing phone: no SMS; logged as needs human.
2) Invalid phone: no SMS; logged; does not retry endlessly.
3) STOP: immediate opt-out; no further messages.
4) HELP: sends support + opt-out instructions.
5) After-hours: uses after-hours message OR queues for morning; must not book if policy forbids.
6) Multiple concurrent leads: 5 leads in 60s; all get first SMS <60s; no cross-talk.
7) Calendar link failure: sends alternate scheduling instruction; does not dead-end.
8) Webhook retries: idempotent handling (same event id) and safe response codes.
9) Duplicate leads: dedupe suppression + clear log.
10) HubSpot note formatting: matches template; readable; no broken JSON.

---
## Results Capture Table (fill during run)
Columns:
- Test ID | Source | Scenario | T0 | T1 | Delta (s) | Pass/Fail | Evidence link | Notes

---
## Bug/Fix Log (prioritized)
Fields:
- Bug ID | Severity (P0/P1/P2) | Scenario | Steps | Expected | Actual | Impact (churn risk) | Suggested fix | Owner | Status

P0 guidance:
- STOP not honored, wrong recipient texting, >60s response consistently, duplicate spam, missing phone still triggers SMS, or calendar failure creates dead-end.

---
## Current Status (this runbook)
- Ready to execute once product endpoints + SMS/log access are available.
- No spend required; use free tiers (Jotform/HubSpot) and manual payload posts.
