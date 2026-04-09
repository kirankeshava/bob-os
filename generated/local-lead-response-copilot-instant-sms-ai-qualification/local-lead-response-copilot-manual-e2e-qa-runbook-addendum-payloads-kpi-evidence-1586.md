# Local Lead Response Copilot — Manual E2E QA Runbook Addendum (Payloads + KPI Evidence + Deterministic Fallback + HubSpot Notes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T16:44:41.351Z

---

# Purpose
Run manual, revenue-friendly end-to-end checks during early pilots (no automation) to protect agency reputation: confirm <60s first-response, confirm safe behavior on compliance/edge cases, and capture a prioritized bug list.

**Business proof/legitimacy to reference in comms:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Contact:** agent_bob_replit+lead-copilot@agentmail.to

---

# Lead Sources Covered (3)
1) **Generic Webhook JSON** (any form/ads tool that can POST JSON)
2) **Jotform** (real form tool; use Webhooks/Integrations to POST to endpoint)
3) **HubSpot** (CRM: create/update contact + timeline note)

---

# KPI: <60s First Response — Evidence Method
## What to capture (each trial)
- **T0 (Lead created):** timestamp at form submit / webhook sent (tool timestamp or manual stopwatch)
- **T1 (Webhook received):** server log timestamp when request received (if available)
- **T2 (First SMS sent):** SMS provider log timestamp (Twilio/MessageBird/etc.)
- **T3 (SMS delivered):** delivery callback timestamp (if available)
- **Delta:** T2 - T0 must be **< 60 seconds**

## Minimum sample (pilot)
- **20 total trials** across the 3 sources; include at least 5 edge-case trials (invalid/missing phone, after-hours, dedupe, retry, calendar failure).

## Results capture table (copy/paste)
| Trial ID | Source | Scenario | T0 Lead Created | T2 First SMS Sent | Delta (sec) | Pass/Fail | Evidence link (log screenshot / export) | Notes |
|---|---|---|---|---|---:|---|---|---|

Pass gate: 95% of trials meet <60s; any single >60s requires bug entry if reproducible.

---

# Generic Webhook JSON — Test Payloads
Assume endpoint expects JSON; adjust field names to product requirements. Use `lead_id` or `idempotency_key` for dedupe.

## A) Happy-path payload
```json
{
  "source": "webhook",
  "lead_id": "qa-001",
  "created_at": "2026-04-09T12:00:00Z",
  "contact": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550123",
    "email": "test.lead@example.com"
  },
  "service": "Plumbing",
  "location": {"zip": "94107"},
  "intent": "Emergency leak",
  "utm": {"campaign": "qa"}
}
```
Expected: first SMS within 60s; qualification begins.

## B) Missing phone (must NOT attempt SMS)
```json
{
  "source": "webhook",
  "lead_id": "qa-002",
  "created_at": "2026-04-09T12:01:00Z",
  "contact": {"first_name": "NoPhone", "last_name": "Lead", "email": "nophone@example.com"},
  "service": "HVAC",
  "location": {"zip": "78701"}
}
```
Expected: mark lead as **needs manual follow-up**; optionally send internal alert/email; create CRM note stating “No phone provided.” No outbound SMS.

## C) Invalid phone (must validate + fail safe)
```json
{
  "source": "webhook",
  "lead_id": "qa-003",
  "created_at": "2026-04-09T12:02:00Z",
  "contact": {"first_name": "BadPhone", "last_name": "Lead", "phone": "12345"},
  "service": "Roofing",
  "location": {"zip": "30301"}
}
```
Expected: no SMS; CRM note “Invalid phone”; internal alert.

## D) Duplicate lead (same lead_id)
Send payload A twice with same `lead_id: qa-001`.
Expected: **only one** outbound SMS thread created; second request is idempotent (logged as duplicate).

## E) Webhook retry simulation
Send payload A three times rapidly with same `lead_id` and explicit retry metadata:
```json
{ "source":"webhook","lead_id":"qa-004","retry_count":2, "contact": {"first_name":"Retry","phone":"+14155550124"}, "service":"Plumbing" }
```
Expected: no duplicate SMS; system returns 200/OK quickly to stop retries.

---

# Jotform — Manual Setup + Scenarios
## Form fields to create
- First Name (required)
- Last Name
- Phone (required, with intl formatting if possible)
- Email
- Service Needed (dropdown)
- ZIP
- “Preferred time” (optional)

## Scenarios
1) Normal submit with valid +1 number
2) Submit with phone omitted (if tool allows) OR phone field present but blank
3) Submit with malformed phone (e.g., 555-abc)
4) Duplicate submit: same phone + same name twice within 60 seconds
5) After-hours submit (change system “business hours” setting or run test at night)

Expected: same as webhook expectations; all first responses <60s for valid numbers.

---

# HubSpot — CRM Note Formatting Spec + Validation
## Required behavior
For each lead, create/update a HubSpot Contact. Then append a **single** Timeline Note per qualification session:

**Note title:** `Lead Copilot Qualification (Source: <source>)`

**Note body format (strict):**
- Lead ID: <lead_id>
- Source: <webhook|jotform|hubspot>
- Received At (T0): <timestamp>
- First SMS Sent (T2): <timestamp>
- Status: <Qualified | Unqualified | Needs Human | After-hours queued>
- Answers:
  - Q1 Service: <...>
  - Q2 Urgency: <...>
  - Q3 Zip/Area: <...>
  - Q4 Preferred time: <...>
- Booking:
  - Booking link offered: <url or “none”>
  - Outcome: <Booked | Link failed | No response>
- Transcript (last 6 messages max):
  - Lead: “...”
  - Copilot: “...”

## Validation checks
- Note renders as readable plain text (no broken JSON blobs)
- No PII beyond what’s necessary (avoid dumping full payload)
- Transcript truncation works (max 6 messages)

---

# Deterministic Fallback Flow (LLM failure / timeout / safety)
Trigger deterministic mode if:
- LLM call errors, times out (>3s), or returns empty/unsafe output
- Confidence below threshold (if implemented)

## Global rules
- Always identify business/agent clearly.
- Keep to **max 3 questions** before offering booking or human handoff.
- Respect STOP/HELP immediately.
- If any downstream service fails (calendar/booking), offer alternate: “reply with best time” + human follow-up.

## SMS Copy (exact)
**Message 1 (immediate):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out — I can help get you scheduled. What service do you need? (Reply 1) Plumbing 2) HVAC 3) Electrical 4) Other)"

**Message 2 (after reply or if unclear):**
“Got it. How urgent is this? Reply: 1) Emergency today 2) This week 3) Just researching"

**Message 3 (qualify location):**
“Thanks — what ZIP code is the job in?”

**Booking offer (if qualified and during business hours):**
“Perfect. Here’s a quick link to pick a time: {{calendar_link}}. If that link doesn’t work, just reply with your best time window (e.g., ‘tomorrow 2–4pm’)."

**After-hours variant (outside hours):**
“Thanks — we’re currently closed, but I’ve got your request. Reply with your ZIP + best time tomorrow, and we’ll confirm first thing when we open. If it’s an emergency, reply ‘EMERGENCY’.”

**Human escalation (any time):**
“Thanks — I’m looping in a specialist to follow up shortly. If you can, reply with the best callback time.”

## STOP/HELP compliance
- If inbound contains `STOP`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`:
  - Respond once: “You’re unsubscribed and won’t receive more texts. Reply START to resubscribe.”
  - Set contact `sms_opt_out=true` and block future sends.
- If inbound contains `HELP`:
  - Respond: “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to unsubscribe.”

---

# Bug Log (pilot)
| Bug ID | Scenario | Severity (P0-P2) | Steps | Expected | Actual | Evidence | Suggested fix |
|---|---|---|---|---|---|---|---|

Severity guide:
- **P0:** compliance risk (STOP ignored), spamming duplicates, >60s consistently
- **P1:** booking failures without fallback, CRM notes unreadable
- **P2:** copy/formatting, minor delays

---

# Verification Statement Template (<60s)
After running trials, fill:
- Trials run: __
- Trials <60s: __ (__%)
- Worst-case delta: __ seconds (Trial ID __)
- Evidence location: __ (logs/screenshots)
- Decision: PASS/FAIL for pilot onboarding
