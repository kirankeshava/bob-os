# Local Lead Response Copilot — Pilot Manual E2E Test Runbook + Results (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:23:51.860Z

---

# Purpose
Protect reputation during first pilots by validating end-to-end lead capture → first SMS → qualification → booking/escalation behavior across 3 lead sources, while proving speed-to-lead (<60s) and safe fallbacks when the LLM or downstream systems fail.

**Business website (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Business contact email:** agent_bob_replit+lead-copilot@agentmail.to

---
# Scope (3 lead sources)
1) **Generic Webhook JSON** (any form/ad platform that can POST JSON)
2) **Jotform** (real form tool, free tier)
3) **HubSpot CRM** (real CRM, free tier)

---
# KPI & Acceptance Criteria
## KPI: first response < 60 seconds
**Definition:** Time from *lead received by our system* to *first outbound SMS successfully queued/sent*.
- **T0 (Lead Received):** timestamp when webhook endpoint receives payload OR when Jotform/HubSpot trigger fires (as shown in our inbound logs).
- **T1 (First SMS Sent/Queued):** timestamp in outbound SMS log/provider status (“queued/sent”).
- **Pass:** T1 - T0 ≤ 60s for ≥ 95% of trials (minimum 20 trials total). Any single failure must have documented reason.

## Safety/Compliance gates (must pass 100%)
- STOP must immediately suppress further messages and send a single confirmation.
- HELP must return a help message with contact email.
- Missing/invalid phone must not attempt SMS; must log and route to fallback (email/CRM note) without repeated retries.
- After-hours must not book or spam; must send one after-hours message and queue for next business window or escalate.

---
# Test Data Standards
Use these consistent lead identities to detect duplicates, dedupe errors, and CRM formatting issues.
- **Lead A (valid):** Name: “Test A”, Phone: +14155550101, Email: testA@example.com, Service: “Water heater repair”, ZIP: 94107
- **Lead B (invalid phone):** Name: “Test B”, Phone: “1234”, Email: testB@example.com
- **Lead C (missing phone):** Name: “Test C”, Phone: (blank), Email: testC@example.com
- **Lead D (duplicate of A):** same phone as Lead A, new submission within 2 minutes

**Concurrency set:** 5 leads submitted within 10 seconds (A1–A5 with unique phones +14155550102..106).

---
# Deterministic Fallback Qualification (LLM-down safe mode)
Trigger deterministic mode when:
- LLM call errors/timeouts > configured threshold (e.g., 3s) OR
- LLM returns empty/invalid response OR
- System is in “Safe Mode” toggle (manual override during incidents).

## Fallback Flow: “Service Quote” (home services)
**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—can I ask 3 quick questions to get you an exact quote?”

If **YES** or any response that is not STOP/HELP:
1) Q1: “What service do you need? (e.g., clogged drain, AC not cooling, water heater, etc.)”
2) Q2: “What’s your address or ZIP code?”
3) Q3: “When would you like help? Reply 1) ASAP 2) Today 3) This week”

**Routing rules (deterministic):**
- If reply contains “ASAP” or “emergency” → tag **High urgency**, notify human/escalate.
- If ZIP missing after 2 attempts → ask once more, then escalate.
- If user doesn’t respond after 10 minutes → send one reminder: “Just checking—still need help? Reply with your ZIP and best time.” Then stop.

**Escalation message (if needed):**
“Got it—someone will follow up shortly. If you prefer, you can email us at agent_bob_replit+lead-copilot@agentmail.to.”

## Fallback Flow: “Schedule Call / Estimate”
**Message 1:**
“Hi {{first_name}}—want to schedule a quick call to get you a quote? Reply 1) Yes 2) Not now”

If **1 / Yes**:
- Ask: “What day works best? Reply: 1) Today 2) Tomorrow 3) This week”
- Then: “Great—what time window? Reply: 1) Morning 2) Afternoon 3) Evening”
- Then provide booking link. If booking link fails, use backup:
  - “Our calendar link is having trouble. Reply with a good callback number + best time, and we’ll confirm by text.”

**After-hours behavior:**
If outside business hours:
“Thanks—our team is offline right now, but we’ll text you first thing tomorrow. If urgent, reply ‘ASAP’.”

## STOP / HELP global behavior
- If inbound equals/contains “STOP” (case-insensitive):
  - Send: “You’re opted out and will no longer receive texts. Reply START to resubscribe.”
  - Set contact status = **Do Not Text**.
- If inbound contains “HELP”:
  - Send: “Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to.”

---
# End-to-End Manual Test Runs (Step-by-step)
## A) Generic Webhook JSON
### Setup
- Ensure you have the webhook endpoint URL (from product settings).
- Ensure SMS outbound logging is visible (provider log or internal log).

### Test payloads (copy/paste)
**A1 Valid lead (Lead A):**
```json
{
  "source": "webhook_test",
  "lead_id": "whk-A-001",
  "first_name": "Test",
  "last_name": "A",
  "phone": "+14155550101",
  "email": "testA@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "submitted_at": "{{NOW_ISO}}"
}
```
**A2 Missing phone (Lead C):**
```json
{
  "source": "webhook_test",
  "lead_id": "whk-C-001",
  "first_name": "Test",
  "last_name": "C",
  "phone": "",
  "email": "testC@example.com",
  "service": "Plumbing",
  "zip": "94107",
  "submitted_at": "{{NOW_ISO}}"
}
```
**A3 Invalid phone (Lead B):**
```json
{
  "source": "webhook_test",
  "lead_id": "whk-B-001",
  "first_name": "Test",
  "last_name": "B",
  "phone": "1234",
  "email": "testB@example.com",
  "service": "HVAC",
  "zip": "94107",
  "submitted_at": "{{NOW_ISO}}"
}
```

### Execution
1. Send POST to webhook endpoint (use curl/Postman).
2. Record **T0** from inbound webhook log.
3. Confirm first SMS attempt and record **T1** from outbound log.
4. Validate message content (correct name, no hallucinated claims, no sensitive data).

### Retry & dedupe
- Re-send A1 payload with same `lead_id` within 30 seconds.
  - **Expected:** no second SMS; system logs “duplicate lead suppressed.”
- Re-send A1 with different `lead_id` but same phone within 2 minutes.
  - **Expected:** dedupe by phone window (configurable). Should not spam; either suppress or merge.

---
## B) Jotform
### Setup
1. Create a free Jotform with fields: First name, Last name, Phone, Email, Service, ZIP.
2. Configure webhook integration to our endpoint (or use Zapier-like equivalent only if free; otherwise webhook directly).
3. Submit the form as each test lead.

### Tests
- Submit Lead A, record T0 at our inbound log (not the Jotform UI time).
- Submit Lead C (missing phone): verify no SMS, create CRM note/email route.
- Submit Lead B (invalid phone): verify validation failure path.
- Concurrency: submit 5 leads rapidly (A1–A5).
  - **Expected:** all get first SMS ≤ 60s; no cross-talk; each conversation thread remains isolated.

---
## C) HubSpot CRM
### Setup
1. Use HubSpot free account.
2. Create a test form OR a workflow trigger that sends contact creation/update to our system.
3. Ensure we can write back a **Timeline Note** or **Contact Note**.

### Tests
- Create contact Lead A in HubSpot → trigger → first SMS.
- Verify CRM note formatting (see below).
- Duplicate behavior: create same phone again or update contact.

### Required HubSpot note formatting (expected)
**Title:** “Lead Response Copilot — Qualification Summary”
**Body (example):**
- Source: HubSpot
- Lead Received (T0): 2026-04-09T15:02:10Z
- First SMS (T1): 2026-04-09T15:02:25Z (15s)
- Status: In qualification / Booked / Needs human
- Answers:
  - Service: Water heater repair
  - ZIP: 94107
  - Timeframe: ASAP
- Compliance:
  - STOP honored: N/A
  - HELP handled: N/A
- Errors/Fallback:
  - LLM: Used deterministic mode (reason: timeout)
  - Calendar: OK / Failed

**Pass criteria:** readable bullets, no JSON blobs, timestamps included, and one note per lead event (deduped).

---
# Edge Case Test Matrix (Must Execute)
1) **Missing phone**: no SMS attempt; log + route to CRM/email.
2) **Invalid phone**: no SMS attempt; log validation error.
3) **STOP**: send opt-out confirm; suppress all future.
4) **HELP**: send help message with agent_bob_replit+lead-copilot@agentmail.to.
5) **After-hours**: send after-hours message; do not book; queue/escalate.
6) **Multiple concurrent leads**: no cross-threading; all ≤60s.
7) **Calendar link failure**: detect failure; send backup message; avoid loop.
8) **Webhook retries**: idempotency by lead_id; no duplicate SMS.
9) **Duplicate leads**: dedupe by phone+window; single conversation.
10) **CRM note formatting**: matches template; timestamps + summary.

---
# Results Capture (paste into sheet)
Columns:
- Run ID | Source | Scenario | T0 (lead received) | T1 (first SMS) | Delta (sec) | Pass/Fail | Evidence link (screenshot/log ID) | Notes

**Minimum:** 20 total runs across sources, including at least 3 per edge case category.

---
# Bug/Fix Log (prioritized)
Fields:
- Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Customer Impact | Suggested Fix | Owner | Status

**P0 examples:** STOP not honored, duplicate SMS spam, >60s routinely, wrong lead gets wrong thread.

---
# Evidence Checklist (store for agencies)
- Screenshot or exported log showing T0 and payload ID
- Screenshot/log showing T1 with message SID/status
- Transcript for STOP/HELP tests
- Screenshot of HubSpot Timeline Note
- One-page KPI summary: % under 60s, median, p95
