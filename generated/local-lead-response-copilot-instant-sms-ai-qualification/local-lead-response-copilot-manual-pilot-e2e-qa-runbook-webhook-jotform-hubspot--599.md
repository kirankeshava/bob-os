# Local Lead Response Copilot — Manual Pilot E2E QA Runbook (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:38:10.218Z

---

## Purpose
Protect agency/customer reputation during first 1–3 paid pilots by validating: (1) first response speed (<60s), (2) safe behavior under common failures (LLM, calendar, retries), and (3) clean CRM logging. This is intentionally manual (no automation) to keep focus on revenue while still preventing early churn.

**Product/legitimacy URL to share if needed:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
**Support/contact email:** agent_bob_replit+lead-copilot@agentmail.to

---

## Lead Sources Under Test (3)
1) **Generic Webhook JSON** (direct POST into our ingestion endpoint)
2) **Jotform** (real form tool; submission -> webhook/connector -> ingestion)
3) **HubSpot** (CRM; lead created/updated -> workflow/webhook -> ingestion AND/OR we write notes back)

---

## KPI Definition: “<60s First Response”
**Pass criterion:** First outbound SMS is *queued/sent* within 60 seconds of the system receiving the lead.

### Required timestamps to capture (per lead)
- **T0 (Lead Received):** Server receive timestamp (or integration “delivered at”).
- **T1 (SMS Queued/Sent):** Provider send timestamp (or our log time when message request is made).
- **T2 (Handset Delivery):** Phone screenshot timestamp or carrier delivery receipt if available.

### KPI calculation
- **Primary:** T1 − T0 (must be <= 60s)
- **Secondary (nice-to-have):** T2 − T0 (informational; carrier delays shouldn’t fail the KPI)

---

## Pre-Flight Checklist (Do before running test cases)
1) Confirm a test phone can receive SMS and can reply.
2) Confirm we can view logs (ingestion logs + outbound SMS logs).
3) Confirm timezone + after-hours window configured (e.g., business hours 9am–5pm local time).
4) Confirm calendar booking link configured (or intentionally set to a known-bad URL for failure tests).
5) Confirm dedupe rules (phone/email/lead_id) are enabled and documented.

---

## Deterministic No-LLM Fallback Qualification Flow (Exact Script)
**Trigger fallback when:** LLM times out, returns error, tool call fails, or confidence/guardrail fails.

### Fallback SMS Script
**Message 1 (immediate):**
“Hi {first_name} — thanks for reaching out to {business_name}. Quick question so we can help fast: what service do you need? Reply: 1) Repair 2) Install 3) Quote 4) Other”

**Branch A (Repair):**
“Got it. What’s the issue? Reply with a short description.”

**Branch B (Install):**
“Great. What are you looking to install, and when are you hoping to do it?”

**Branch C (Quote):**
“Sure — what’s the address/zip and what are we quoting?”

**Branch D (Other):**
“No problem—tell me what you need and your preferred time for a call.”

**Booking handoff (if calendar works):**
“Thanks. You can grab the fastest time here: {calendar_link}. If you prefer, reply with 2 times that work today/tomorrow.”

**If after-hours:**
“Thanks — we’re currently closed. We’ll text you back first thing at {next_open_time}. If urgent, reply URGENT and we’ll try to route it.”

**If calendar link failure detected:**
“Sorry—our booking link is having trouble. Reply with 2 times that work for you and we’ll confirm an appointment by text.”

### STOP/HELP Compliance (must be deterministic)
- If inbound body contains **STOP** (case-insensitive, exact word match):
  - Immediately set opt-out flag
  - Respond once: “You’re opted out and will no longer receive messages. Reply HELP for assistance.”
  - Do not send further messages.
- If inbound body contains **HELP**:
  - Respond: “Help: This number texts about your inquiry with {business_name}. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

---

## Test Cases (Run across sources as applicable)
For each test, record T0/T1/T2 and whether expected behavior happened.

### A) Missing phone
**Input:** lead payload/form submission without phone.
**Expected:**
- No SMS sent.
- Create CRM record or internal log marked “missing_phone”.
- Optional: email alert to operator.

### B) Invalid phone
**Input:** phone like “123”, “+1 (555) 555-555” (bad), or non-E.164 if required.
**Expected:**
- No SMS sent.
- Error stored with reason “invalid_phone”.
- Dedupe should not create repeated error spam.

### C) STOP
**Input:** lead receives SMS, replies “STOP”.
**Expected:** opt-out immediately, confirmation response, no further messages.

### D) HELP
**Input:** reply “HELP”.
**Expected:** help response includes support email and STOP instructions.

### E) After-hours
**Input:** submit lead outside business hours.
**Expected:** either (1) immediate acknowledgement + “we’ll reply at open”, or (2) queue first message at open. Must be consistent and documented.

### F) Multiple concurrent leads
**Input:** 5–10 leads submitted within 60 seconds.
**Expected:**
- All get first response within KPI.
- No cross-talk (wrong names/services).
- Rate limits respected; if throttled, queue with clear logs.

### G) Calendar link failures
**Input:** configure a broken calendar link and run a booking prompt.
**Expected:** system detects failure (or operator flags) and uses alternate “reply with two times” flow; logs “calendar_failure”.

### H) Webhook retries
**Input:** same lead_id resent 3x within 2 minutes (simulate provider retries).
**Expected:** idempotency/dedupe prevents multiple SMS starts; only first creates active conversation.

### I) Duplicate leads
**Input:** same phone/email submitted from different sources within 10 minutes.
**Expected:** one conversation thread; CRM updated/merged; no double texting.

### J) HubSpot CRM note formatting
**Input:** normal lead + conversation + outcome.
**Expected:** note appended in strict template (below), no broken markdown, includes timestamps + opt-out status.

---

## Ready-to-Paste Webhook JSON Payloads
> Use these as POST bodies for the ingestion endpoint.

### 1) Valid lead
{
  "source": "webhook_test",
  "lead_id": "lead-001",
  "first_name": "Test",
  "last_name": "User",
  "phone": "+14155550100",
  "email": "test.user@example.com",
  "service": "Quote",
  "message": "Need an estimate for a small job",
  "created_at": "2026-04-09T12:00:00Z"
}

### 2) Missing phone
{
  "source": "webhook_test",
  "lead_id": "lead-002",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "nophone@example.com",
  "service": "Repair",
  "message": "My unit stopped working",
  "created_at": "2026-04-09T12:01:00Z"
}

### 3) Invalid phone
{
  "source": "webhook_test",
  "lead_id": "lead-003",
  "first_name": "Bad",
  "last_name": "Phone",
  "phone": "123",
  "email": "badphone@example.com",
  "service": "Install",
  "message": "Looking for an install",
  "created_at": "2026-04-09T12:02:00Z"
}

### 4) Duplicate lead ID (idempotency)
{
  "source": "webhook_test",
  "lead_id": "lead-001",
  "first_name": "Test",
  "last_name": "User",
  "phone": "+14155550100",
  "email": "test.user@example.com",
  "service": "Quote",
  "message": "Retry payload should not re-text",
  "created_at": "2026-04-09T12:03:00Z"
}

### 5) Retry scenario (same payload resent)
{
  "source": "webhook_test",
  "lead_id": "lead-004",
  "first_name": "Retry",
  "last_name": "Case",
  "phone": "+14155550101",
  "email": "retry@example.com",
  "service": "Repair",
  "message": "Simulate provider retry",
  "created_at": "2026-04-09T12:04:00Z",
  "attempt": 1
}

---

## HubSpot Note Formatting (Strict Template)
**Title:** Lead Copilot — Qualification Transcript

**Body (paste as plain text):**
Lead Source: {source}
Lead ID: {lead_id}
Name: {first_name} {last_name}
Phone: {phone}
Email: {email}
Received At (T0): {t0}
First SMS Sent (T1): {t1}
First Response KPI: {t1_minus_t0_seconds}s
Opt-Out Status: {opt_out_status}
After-Hours: {true_false}
Booking Outcome: {booked|not_booked|calendar_failed|requested_times}
Appointment Time: {appointment_time_or_na}

Transcript:
- System: {message_1}
- Lead: {reply_1}
- System: {message_2}
- Lead: {reply_2}

Internal Flags:
- dedupe_hit: {true_false}
- llm_fallback_used: {true_false}
- errors: {none|list}

---

## Results Table (Copy into sheet/doc)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (normal/missing_phone/STOP/etc.)
- T0
- T1
- T2
- T1−T0 (seconds)
- Pass KPI? (Y/N)
- Pass Behavior? (Y/N)
- Notes / Bug link

Target: **20 total leads**, with at least:
- 6 normal (2 per source)
- 2 missing phone
- 2 invalid phone
- 2 STOP
- 2 HELP
- 2 after-hours
- 2 duplicates/retries
- 2 calendar failures

---

## Bug Log Template (High-signal for engineering)
For each bug:
- Bug ID
- Severity (P0 reputational / P1 conversion / P2 cosmetic)
- Source
- Steps to reproduce (exact payload or form fields)
- Expected vs actual
- Evidence (timestamps, screenshots)
- Proposed smallest fix/workaround
- Retest result

---

## Current Status / Results
**Execution results not yet recorded in this document** because we have not run live submissions through Jotform/HubSpot sandboxes in this cycle. Next step is to create the free accounts and run the 20-lead timed pass to populate the Results table and confirm <60s KPI empirically.
