# Local Lead Response Copilot — Pilot Manual E2E QA Protocol (3 Lead Sources) + Results/Evidence Template + Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:49:37.971Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Protocol (3 Lead Sources)

Business proof URL (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal & Scope (pre-revenue pilot QA)
Goal: Manually validate end-to-end reliability for early pilots without automation.

Success criteria:
1) **First response KPI**: first outbound SMS is sent **<60 seconds** from lead submission for normal cases.
2) Fail-safes: safe, deterministic behavior when (a) LLM fails/timeouts, (b) calendar link or booking fails, (c) SMS delivery is blocked/invalid.
3) Compliance behaviors: STOP/HELP.
4) Source coverage: **(1) Generic Webhook JSON**, **(2) Jotform**, **(3) HubSpot CRM**.

## 1) Definitions & Evidence to Capture
### Timestamp points (must record all):
- **T0 Lead Submit**: exact time lead is submitted (form submit time, webhook request time, or CRM create time). Use ISO time with timezone.
- **T1 Webhook Received** (if visible in app logs): time system receives payload.
- **T2 First SMS Attempted**: time app initiates SMS send (provider request).
- **T3 First SMS Delivered** (if delivery receipts available) or **T3 Received on test handset**.

KPI measurement:
- Primary: T2 - T0 (system reaction time)
- Secondary: T3 - T0 (user-perceived speed)

Evidence artifacts per test run (store in a folder):
- Screenshot/export of app log showing T1/T2
- Screenshot of phone showing received SMS with timestamp
- Raw payload used (JSON) or form submission record
- If CRM involved: screenshot of contact record + notes

Sample size target for KPI proof:
- Minimum **20 trials** across all sources (recommend split: 8 webhook, 6 Jotform, 6 HubSpot).

## 2) Environment/Prereqs Checklist
- One test mobile number to receive SMS (and optionally send replies).
- Access to product logs for inbound webhook and outbound SMS attempt timestamps.
- Deterministic fallback mode available as a toggle OR simulated by forcing LLM failure (timeout/invalid key in test).
- Calendar/booking link configured (or a known-bad link to test failure mode).

## 3) Lead Source Setup & Payload Specs
### A) Source 1 — Generic Webhook JSON
Endpoint: (fill in when known) ______________________

**Baseline payload (happy path):**
```json
{
  "source": "webhook_test",
  "lead_id": "lead_{{uuid}}",
  "created_at": "2026-04-09T12:00:00Z",
  "contact": {
    "first_name": "Jamie",
    "last_name": "Taylor",
    "phone": "+14155552671",
    "email": "jamie.taylor@example.com"
  },
  "service": {
    "category": "HVAC",
    "requested_service": "AC not cooling",
    "zip": "94107"
  },
  "consent": {
    "sms_opt_in": true,
    "opt_in_source": "web_form"
  }
}
```

**Missing phone payload:**
```json
{
  "source": "webhook_test",
  "lead_id": "lead_{{uuid}}",
  "created_at": "2026-04-09T12:00:00Z",
  "contact": {"first_name": "Jamie", "last_name": "Taylor", "email": "jamie.taylor@example.com"},
  "consent": {"sms_opt_in": true}
}
```

**Invalid phone payload:**
```json
{
  "source": "webhook_test",
  "lead_id": "lead_{{uuid}}",
  "created_at": "2026-04-09T12:00:00Z",
  "contact": {"first_name": "Jamie", "phone": "1234"},
  "consent": {"sms_opt_in": true}
}
```

Expected mapping:
- contact.phone → SMS destination
- contact.first_name → personalization token
- service.* → context token for qualification questions

### B) Source 2 — Jotform
Create a free Jotform with fields:
- First name (required)
- Phone number (required)
- Service needed (dropdown)
- ZIP code
- Preferred time (optional)
- Consent checkbox (required) “I agree to receive texts about my request.”

Integration: Jotform → Webhook POST to product endpoint.

Expected behaviors:
- If consent unchecked: do not send SMS; create internal alert/log.
- Phone formatting: normalize to E.164 if possible; otherwise reject with clear log.

### C) Source 3 — HubSpot (CRM)
Trigger method (choose one available):
- New contact created with lifecycle stage = lead AND phone exists
- Or form submission creating contact

Expected CRM writeback:
- Create/update contact with normalized phone
- Add a **Note** or engagement with qualification transcript

**Expected HubSpot note formatting (must be consistent):**
Title line: `Lead Copilot Qualification — {{date_time}}`
Body:
- Lead source: {{source}}
- First response sent: {{T2}}
- Transcript:
  - Copilot: …
  - Lead: …
- Outcome: (Booked / Needs follow-up / Disqualified)
- Booking link used (if any): {{url}}
- Fail-safe used: (LLM / Deterministic) + reason if deterministic

## 4) Deterministic Fallback Qualification Flow (LLM-safe mode)
Trigger deterministic mode when:
- LLM API error OR timeout > 8s
- LLM returns empty/invalid output
- Rate limit or downstream AI unavailable

**Rules:**
- Never mention “AI failed”. Say: “Quick questions to help schedule you.”
- Max 3 questions before escalation.
- Always provide STOP/HELP compliance footer at least once.

**Deterministic script (exact messages):**
1) Immediately after lead received (first SMS):
   - “Hi {{first_name}}, thanks for reaching out about {{requested_service}}. I can help get you scheduled. What’s the service address or ZIP code?”
2) If answered:
   - “Got it. What’s the best time window for a call/visit? Reply 1) ASAP 2) Today 3) Tomorrow 4) This week.”
3) If answered:
   - “Thanks. Last question: is this an emergency (no heat/AC, leak, no power)? Reply YES or NO.”

**Escalation behavior:**
- If any answer is missing after 2 minutes: send one reminder:
  - “Just checking—reply with your ZIP or address so we can route the right tech.”
- If still no response after 10 minutes OR emergency=YES:
  - Create task/alert for human follow-up and send:
  - “Understood. A team member will reach out shortly. If urgent, call us now.” (Insert phone if available.)

STOP/HELP handling (global):
- If inbound contains “STOP”: immediately stop all future messages; confirm:
  - “You’re opted out and will no longer receive texts. Reply HELP for help.”
- If inbound contains “HELP”: respond:
  - “Help: This number texts about your service request. Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

After-hours rule:
- Define business hours (e.g., 8am–6pm local). If outside:
  - Send first SMS anyway (speed matters) but set expectation:
  - “Thanks—it's after hours. We’ll confirm first thing in the morning. Reply with your ZIP and preferred time.”

## 5) Test Cases (Steps + Expected Results)
For each test, record: Source, Payload/Form link, T0/T1/T2/T3, outcome, evidence links.

### 5.1 Happy path (all sources)
Steps: Submit lead with valid phone + consent.
Expected:
- First SMS attempted <60s (T2-T0)
- Proper personalization + service context
- CRM note created (HubSpot tests)

### 5.2 Missing phone
Steps: submit without phone.
Expected:
- No SMS attempt
- Log contains clear reason “missing phone”
- Optional: email/internal alert created

### 5.3 Invalid phone
Steps: phone=1234 or malformed.
Expected:
- No SMS attempt OR SMS provider rejects and app marks failed safely
- Lead flagged for manual follow-up

### 5.4 STOP/HELP
Steps: Lead replies STOP then HELP.
Expected:
- STOP: immediate opt-out confirmation; no more marketing/qualification texts
- HELP: returns help text including support email + proof URL

### 5.5 After-hours
Steps: submit outside business hours.
Expected:
- SMS still sent quickly (<60s) with after-hours expectation
- Booking attempt deferred or allowed depending on configuration

### 5.6 Multiple concurrent leads
Steps: submit 5 leads within 30 seconds.
Expected:
- All receive first SMS <60s
- No cross-talk (messages/notes must map to correct lead)

### 5.7 Calendar link failures
Steps: configure broken booking link or simulate outage.
Expected:
- Copilot offers alternate: “Reply with preferred time window and we’ll confirm.”
- CRM note includes “calendar_failed=true”

### 5.8 Webhook retries
Steps: resend identical payload 3 times; or use webhook tool that retries.
Expected:
- Dedupe: only one conversation started
- Log indicates duplicate suppressed

### 5.9 Duplicate leads (same phone within 24h)
Steps: submit same phone twice.
Expected:
- System either (a) continues existing thread, or (b) starts new with explicit rule; must not spam
- CRM note references prior interaction

### 5.10 CRM note formatting
Steps: run HubSpot scenario.
Expected:
- Note title/body exactly follows formatting spec above
- Transcript lines preserved (no JSON dump into note)

## 6) Results Table (paste into sheet)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- T0
- T2
- T2-T0 (sec)
- T3 (optional)
- Pass/Fail
- Evidence links (logs/screenshot)
- Bug ID (if fail)

## 7) Bug/Fix Log (severity tied to churn risk)
Severity definitions:
- P0: compliance issue (STOP not honored), sending to wrong lead, repeated spam, >60s consistently
- P1: calendar failure not handled, dedupe fails causing double texts, missing phone not blocked
- P2: formatting issues, minor copy, occasional >60s spike

Bug template:
- Bug ID:
- Scenario:
- Steps to reproduce:
- Expected:
- Actual:
- Evidence:
- Severity:
- Suggested fix:

## 8) What “Verified <60s First Response” Means (acceptance)
We can claim “<60s first response” after:
- At least 20 trials across the 3 sources
- 95%+ of trials have T2-T0 <60s
- Any outliers have a documented root cause (provider outage, intentional after-hours delay, etc.)

## 9) Quick Customer-Facing Reliability Note (for agencies)
If asked about reliability during pilots:
- “We run a manual E2E reliability checklist across webhook, Jotform, and HubSpot, and we record timestamps from lead submit to first SMS. We also have a deterministic fallback question flow if the LLM times out so leads still get handled safely.”
- Proof/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to
