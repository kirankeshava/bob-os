# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — v1

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:55:59.717Z

---

Purpose
Validate end-to-end lead handling across 3 sources (Generic Webhook JSON, Jotform, HubSpot) and verify first-response KPI (<60s). Confirm fail-safe behaviors: missing/invalid phone handling, STOP/HELP compliance, after-hours routing, concurrency, calendar link failure, webhook retries, duplicate leads, and HubSpot note formatting.

Systems Under Test (SUT)
- Lead intake endpoints: Webhook receiver (generic JSON) + Jotform webhook + HubSpot form/CRM ingestion.
- Outbound SMS: “first response” message to lead.
- Qualification: AI-driven questions OR deterministic fallback flow.
- Booking: calendar link or appointment booking step.
- CRM logging: HubSpot note creation/update.

Definition of First Response KPI (<60s)
- Start time (T0): Lead submit time recorded by source OR receipt time logged by webhook endpoint (prefer both).
- End time (T1): Timestamp when first SMS is sent (provider log) OR when app marks message “queued/sent”.
- KPI pass: (T1 - T0) <= 60 seconds for >= 95% of trials; no single trial should exceed 120 seconds without a documented external cause.

Evidence to Save (per trial)
1) Source proof: screenshot/export showing submit time + payload (or HubSpot timeline event).
2) App/server log: request received timestamp + correlation id.
3) SMS log: outbound message timestamp + delivery/queued status.
4) CRM proof: HubSpot note content screenshot/copy.
Store in a shared folder as: YYYY-MM-DD_source_trial##_scenario.

Lead Source #1: Generic Webhook JSON (Baseline)
Goal: Prove we can accept a minimal JSON payload and respond <60s with correct parsing + dedupe/retries.

Required fields
- lead_id (string, required for dedupe)
- phone (E.164 preferred, e.g., +14155552671)
- first_name (optional)
- last_name (optional)
- email (optional)
- service (optional)
- zip (optional)
- source (optional)
- timestamp (ISO 8601 optional)

Payloads (copy/paste)
A. Valid lead
{
  "lead_id": "qa-webhook-001",
  "phone": "+14155552671",
  "first_name": "Test",
  "last_name": "Lead",
  "email": "testlead@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "source": "QA-WebHook",
  "timestamp": "2026-04-09T15:00:00Z"
}
Expected
- First SMS within 60s.
- Qualification begins (AI or deterministic).
- CRM note created if configured; otherwise internal log entry created.

B. Missing phone
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "service": "HVAC tune-up",
  "source": "QA-WebHook"
}
Expected
- No SMS attempt.
- System marks lead as “needs phone” and (if email exists) sends an internal alert email to agent_bob_replit+lead-copilot@agentmail.to OR logs prominently.
- No crash; returns 200/202 with error detail depending on design.

C. Invalid phone
{
  "lead_id": "qa-webhook-003",
  "phone": "555-ABCD",
  "first_name": "BadPhone",
  "source": "QA-WebHook"
}
Expected
- No SMS attempt.
- Validation error logged; lead flagged.

D. Duplicate lead_id (dedupe)
Send payload A again with same lead_id.
Expected
- No second outbound SMS.
- System logs “duplicate suppressed”.

E. Webhook retry (idempotency)
Send payload A twice within 5 seconds but with same lead_id; simulate provider retry.
Expected
- Exactly one conversation created; exactly one first SMS.

Lead Source #2: Jotform (Real Form Tool)
Goal: Validate real-world field mapping + webhook delivery.

Jotform setup (free)
1) Create form: “QA Lead Form — Lead Response Copilot”.
2) Fields:
- Name (First/Last)
- Phone Number
- Email
- “Service Needed” (dropdown)
- “Preferred time” (optional)
- Consent checkbox: “I agree to receive texts about my request. Reply STOP to opt out.”
3) Settings → Integrations/Webhooks: add webhook URL to SUT.
4) Configure Jotform to send JSON if possible; otherwise parse form-encoded.

Test scenarios
1) Happy path: valid phone + consent checked
Expected
- First SMS <60s.
- First SMS includes business identification + opt-out language.

2) Missing phone
Expected
- Submission accepted by Jotform.
- SUT flags missing phone; no SMS attempt; internal alert/log.

3) Invalid phone length
Expected
- If Jotform validation blocks: verify form blocks submission.
- If it passes: SUT validation must block SMS and log error.

Lead Source #3: HubSpot (CRM)
Goal: Validate CRM-originating leads and correct note formatting.

HubSpot setup (free dev account)
- Create a test contact pipeline (or use default).
- Decide trigger: new contact created OR form submission OR list workflow calling webhook.

HubSpot note formatting (Canonical Template)
When a lead is received, create/update a Note on the Contact timeline exactly as:

Title: Lead Response Copilot — Qualification Summary
Body:
Source: {{source}}
Lead ID: {{lead_id}}
Received (UTC): {{received_timestamp}}
First SMS Sent (UTC): {{first_sms_timestamp}}
Speed-to-Lead: {{delta_seconds}}s

Contact:
- Name: {{first_name}} {{last_name}}
- Phone: {{phone}}
- Email: {{email}}

Intent & Fit:
- Service: {{service}}
- Zip: {{zip}}
- Timeframe: {{timeframe}}
- Budget (if asked): {{budget}}

Conversation Status:
- State: {{state}} (e.g., QUALIFYING / BOOKED / NEEDS_HUMAN / OPTED_OUT)
- Last question asked: {{last_question}}
- Next action: {{next_action}}

Transcript (latest 5 messages):
1) Agent: …
2) Lead: …
3) Agent: …
4) Lead: …
5) Agent: …

Expected
- No markdown rendering issues; newlines preserved.
- Does not exceed HubSpot note limits; truncate transcript safely with “(truncated)”.

Required QA scenarios (must run at least once each)
1) STOP compliance
Steps
- After first SMS, reply “STOP”.
Expected
- Immediate confirmation message: “You’re opted out. Reply START to resubscribe.”
- No further messages sent for that phone.
- CRM note state becomes OPTED_OUT.

2) HELP compliance
Reply “HELP”.
Expected
- Message with support contact: “Support: agent_bob_replit+lead-copilot@agentmail.to and website https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Reply STOP to opt out.”

3) After-hours routing
Set business hours (example): Mon–Fri 8am–6pm local.
Test lead outside hours.
Expected
- First SMS <60s still, but copy changes: acknowledges after-hours and promises follow-up time; offers booking link if available.
- No aggressive question barrage; max 1 question after-hours.

4) Multiple concurrent leads
Submit 5 leads within 60 seconds (different lead_id and phones).
Expected
- All get first SMS <60s.
- No cross-talk (no message to wrong phone).

5) Calendar link failure
Simulate booking link unreachable/invalid.
Expected
- System detects failure and sends fallback: “Booking link is temporarily down—what day/time works for you?”
- State set NEEDS_HUMAN if cannot proceed.

6) LLM failure → deterministic mode
Force LLM timeout/error (e.g., by toggling a “LLM disabled” flag or using an invalid key in a test env).
Expected
- System continues with deterministic question flow below; no blank responses.

Deterministic Qualification Flow (Fail-safe Spec)
Trigger conditions
- LLM API returns error
- LLM request exceeds 6 seconds (configurable)
- Output fails validation (empty / unsafe)

Global rules
- Always identify business and intent in first message.
- Always include opt-out: “Reply STOP to opt out.”
- Max 2 unanswered prompts; then escalate to human.
- If user asks to stop/complains: immediately STOP handling.

Message 1 (immediate, first response)
“Hi {{first_name}}, thanks for reaching out—this is the scheduling assistant. A couple quick questions so we can help fast. What service do you need? Reply STOP to opt out.”

Branch Q1: Service
If service captured → Q2.
If unclear after 1 attempt → escalate.

Message 2
“Got it. What ZIP code is the job at?”

Message 3
“Thanks. How soon do you need this handled? (Today / This week / Just researching)”

Booking step
If calendar link OK:
“Perfect—here’s a link to book the fastest time: {{calendar_link}}. If you prefer, reply with a day/time window.”
If calendar link not OK:
“Booking link is temporarily unavailable—what day/time window works for you?”

Escalation-to-human
If user provides day/time OR after 2 unclear answers:
“Thanks—someone will confirm shortly. If urgent, reply with the best time to call.”
Set state NEEDS_HUMAN and create CRM note.

Results Capture Table (paste into sheet)
Columns:
Trial# | Source | Scenario | T0 source submit | T0 webhook recv | T1 first SMS sent | Delta(s) | Pass/Fail | Notes | Evidence links

Bug/Fix Log (prioritized)
Fields:
ID | Severity (P0-P3) | Scenario | Steps to reproduce | Expected | Actual | Impact (churn risk) | Suggested fix | Owner | Status

Exit Criteria for Pilot Readiness
- <60s first response achieved in at least 19/20 trials across the 3 sources (no single >120s without external cause).
- STOP and HELP behaviors verified with transcripts saved.
- Missing/invalid phone never triggers SMS attempt; errors visible.
- Dedupe/retry prevents double-texting.
- HubSpot note created with canonical formatting and correct timestamps.

Customer-facing legitimacy references (for any HELP/support messages)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email: agent_bob_replit+lead-copilot@agentmail.to
