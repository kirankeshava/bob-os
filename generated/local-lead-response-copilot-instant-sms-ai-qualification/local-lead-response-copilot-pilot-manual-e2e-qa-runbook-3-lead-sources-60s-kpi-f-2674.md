# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Results + Bug Log + Copy/Paste Payloads

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:49:28.106Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to

## 1) Goal
Manually validate end-to-end lead capture → first SMS response → qualification → booking/escalation across **3 lead sources**:
1) **Generic Webhook JSON** (any ads/forms)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

Verify:
- **KPI:** first outbound SMS **< 60 seconds** from lead creation.
- **Safety:** compliant STOP/HELP behavior, after-hours routing, dedupe/retry handling.
- **Reliability:** deterministic fallback qualification when LLM errors/timeouts.

## 2) Preconditions / Setup Checklist (10 minutes)
- You have access to:
  - The product’s inbound webhook endpoint (or lead intake endpoint) and logs.
  - The SMS sending number logs (Twilio/other) and delivery timestamps.
  - Jotform free account + a test form.
  - HubSpot developer/free account + a test pipeline/contact record.
- Decide “business hours” for test: e.g., Mon–Fri 9am–5pm local.
- Confirm the system has **two modes**:
  - Normal: LLM-driven qualification.
  - Safe Mode: deterministic question flow (defined in section 6).

## 3) Measurement Method for <60s KPI (required)
For each trial, capture 3 timestamps:
- **T0 (Lead Created):** when lead is submitted/created at source (Jotform submission time, webhook request time, HubSpot form/record create time).
- **T1 (System Ingested):** time system logs show the lead accepted/processed (webhook received / job enqueued).
- **T2 (First SMS Sent):** time SMS provider shows outbound message created/sent.

**Response time = T2 − T0**. Pass if < 60s.
Evidence to store: screenshot or copied log lines for T0/T2, plus message transcript.

Sample size target for pilot proof: **20 total trials**, with at least:
- 8 webhook JSON
- 6 Jotform
- 6 HubSpot

## 4) Lead Sources: How to Trigger
### A) Generic Webhook JSON
Use curl/Postman to POST to the product’s inbound endpoint.

**Payload A1 (valid lead):**
```json
{
  "source": "webhook_test",
  "lead_id": "qa-001",
  "first_name": "Sam",
  "last_name": "Rivers",
  "phone": "+14155550123",
  "email": "sam.rivers@example.com",
  "service": "HVAC repair",
  "zip": "94107",
  "message": "AC stopped working; need today",
  "created_at": "2026-05-14T12:00:00Z"
}
```

**Payload A2 (missing phone):**
```json
{
  "source": "webhook_test",
  "lead_id": "qa-002",
  "first_name": "Jamie",
  "email": "jamie@example.com",
  "service": "Plumbing",
  "message": "Leaking pipe",
  "created_at": "2026-05-14T12:05:00Z"
}
```

**Payload A3 (invalid phone):**
```json
{
  "source": "webhook_test",
  "lead_id": "qa-003",
  "first_name": "Taylor",
  "phone": "12345",
  "service": "Roofing",
  "created_at": "2026-05-14T12:10:00Z"
}
```

### B) Jotform
Create a simple form:
- Name
- Phone
- Service Needed (dropdown)
- Notes
Configure Jotform to send submission via webhook (or Zapier-style webhook) to the product.

### C) HubSpot
Two acceptable triggers:
- HubSpot Form submission → webhook to product
- New Contact creation in HubSpot → workflow/webhook to product

Required mapping (minimum): first name, last name, phone, email, service interest, source.

## 5) Core Pass/Fail Acceptance Criteria
### Phone handling
- Missing phone: **NO SMS attempt**, create internal task/CRM note: “Missing phone — cannot text”, optionally email fallback.
- Invalid phone: **NO SMS attempt**, mark invalid and log validation failure.

### STOP/HELP compliance
- Any inbound “STOP”: system must **immediately stop** further texts to that number and record opt-out.
- Any inbound “HELP”: system responds with a help message (business identity + how to opt out + contact email).

### After-hours
If lead arrives outside business hours:
- Still send first SMS (if policy allows) but with after-hours expectation, OR queue to next opening. Must match configured policy.
- Must not spam: max 1–2 messages until next business window.

### Concurrency
For 5 leads created within 30 seconds:
- Each gets its own conversation state.
- No cross-contamination of names/services.
- First response for each still targets <60s.

### Calendar link failure
If booking link returns error/unreachable:
- System offers fallback: “Reply with 1) ASAP 2) Today PM 3) Tomorrow AM” and escalates to human.

### Retries and duplicate leads
- Webhook retries (same lead_id): must not send duplicate first SMS.
- Duplicate lead (same phone within short window, e.g., 10 minutes): must dedupe or merge conversation state; no spam.

### HubSpot note formatting
A single CRM note must be created/updated with:
- Lead source
- Timestamp T0
- First SMS sent timestamp T2
- Transcript snippets and qualification answers
- Booking outcome / escalation reason

## 6) Deterministic Fallback Qualification (LLM Down / Timeout)
Trigger safe mode when:
- LLM API error OR timeout > 6 seconds OR malformed response.

**Message 1 (immediate, within <60s):**
“Hi {first_name}, it’s {Company}. Thanks for reaching out about {service}. I can help get you scheduled. What’s the address or ZIP code for the job?”

If no response in 3 minutes, send one follow-up:
“Just checking—what ZIP code is the service needed in?”

**Branching (deterministic):**
1) If ZIP provided → ask urgency:
“Thanks. Is this 1) Emergency (today) 2) Soon (1–3 days) 3) Just getting a quote?”
2) Then ask job type details:
“Got it. Briefly, what’s going on (1 sentence)?”
3) Then booking attempt:
“Perfect. Here’s the quickest way to book: {calendar_link}. If the link doesn’t work, reply with two time windows that work for you.”

**Escalation rules:**
- If user says “emergency” OR contains keywords (gas leak, flooding, no heat in winter, etc.) → immediate human escalation note + SMS:
“Understood—this sounds urgent. I’m flagging this for the team now. If you can share the address, we’ll prioritize you.”

**STOP/HELP always overrides** (no further qualification).

## 7) Test Matrix (run and record)
Run each scenario at least once per source where applicable.

1) Valid lead (baseline)
2) Missing phone
3) Invalid phone
4) STOP inbound after first message
5) HELP inbound after first message
6) After-hours lead
7) 5 concurrent leads
8) Calendar link failure simulation
9) Webhook retry (same lead_id, repeated POST)
10) Duplicate lead (same phone, new lead_id)
11) CRM note formatting check (HubSpot)

## 8) Results Table (fill during execution)
Columns:
- Trial #
- Source (Webhook/Jotform/HubSpot)
- Scenario
- Lead ID
- Phone
- T0
- T1
- T2
- Response Time (sec)
- Pass/Fail (<60s)
- Transcript link/snippet
- Notes

## 9) Bug/Fix Log Template
Fields:
- Bug ID
- Severity (P0 revenue risk / P1 churn risk / P2 cosmetic)
- Source/Scenario
- Steps to Reproduce
- Expected
- Actual
- Evidence (logs/screenshots)
- Suggested Fix
- Owner
- Status

## 10) Minimal “Pilot Evidence Pack” to Share with Agencies
After first pilot run, compile:
- Screenshot/log proof of at least 20 trials with response time <60s.
- STOP/HELP transcript demonstrating compliance.
- One example HubSpot note showing clean formatting and full context.
- A statement of deterministic safe-mode behavior (section 6) and when it triggers.

---
If you want, I can also generate a one-page customer-facing reliability note (non-technical) that references the website and support email, but the above is the internal QA packet to execute first.