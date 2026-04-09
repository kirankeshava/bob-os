# Local Lead Response Copilot — Manual E2E QA Runbook (3 Lead Sources) + Results Protocol + Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:40:08.042Z

---

## Purpose (Week 1: free pilots, no automation)
Validate end-to-end lead capture → first SMS response in under 60 seconds across 3 lead sources, and validate fail-safe behaviors that protect agency reputation when LLM, calendar, or downstream systems fail.

**Product legitimacy link (share with pilot agencies/customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Pilot contact email:** agent_bob_replit+lead-copilot@agentmail.to

---
## Lead Sources Covered (minimum 3)
1) **Generic Webhook JSON** (simulates any form/ad tool)
2) **Jotform** (real form tool, free tier)
3) **HubSpot CRM** (real CRM, free tier)

---
## KPI to Verify
**Speed-to-lead:** First outbound SMS must be sent **< 60 seconds** after lead receipt.

### Timestamp Evidence Protocol (required for every run)
Capture four timestamps per run:
- **T0 Lead Sent**: time you submit form / trigger webhook / create CRM lead
- **T1 Product Received**: server log time (or inbound request log) when webhook hits the app
- **T2 SMS Queued**: log time when SMS is queued to provider (or internal send event)
- **T3 SMS Delivered/Seen**: provider delivery time if available, otherwise device receipt time

**Pass condition for KPI:** (T2 − T1) < 60s (preferred). If only user-visible is available, use (T3 − T0) < 60s and note the limitation.

**Sample size:** 20 total runs minimum:
- Webhook: 8 runs
- Jotform: 6 runs
- HubSpot: 6 runs
Include at least: 2 invalid phone, 2 missing phone, 2 after-hours, 2 duplicates, 2 concurrency.

---
## Test Data (use consistently)
### Phone numbers
- Valid US: +14155550123
- Invalid: +1415555 (too short)
- Missing: null / empty string

### Business hours assumptions
- Default hours: Mon–Fri 9am–6pm local
- After-hours test: run outside that window OR set config temporarily to force after-hours mode.

---
## Generic Webhook JSON — Copy/Paste Payloads
Use these with curl/Postman to the product’s webhook endpoint (replace URL when available):

### A) Happy path
```json
{
  "source": "webhook",
  "lead": {
    "first_name": "Jamie",
    "last_name": "Rivera",
    "phone": "+14155550123",
    "email": "jamie.rivera@example.com",
    "service": "Water heater repair",
    "zip": "94107",
    "notes": "No hot water since this morning"
  },
  "metadata": {
    "lead_id": "wh_0001",
    "submitted_at": "2026-04-09T18:00:00Z"
  }
}
```
Expected:
- First SMS <60s
- Uses normal (LLM) flow unless forced to fallback
- Creates/updates CRM note (if enabled)

### B) Missing phone
```json
{
  "source": "webhook",
  "lead": {
    "first_name": "Sam",
    "last_name": "Lee",
    "phone": "",
    "email": "sam.lee@example.com",
    "service": "Roof leak"
  },
  "metadata": {"lead_id": "wh_0002"}
}
```
Expected:
- **No SMS attempt**
- Create internal alert / log: “missing phone”
- Optional: email to agent_bob_replit+lead-copilot@agentmail.to with lead details for manual follow-up

### C) Invalid phone
```json
{
  "source": "webhook",
  "lead": {
    "first_name": "Taylor",
    "last_name": "Ng",
    "phone": "+1415555",
    "email": "taylor.ng@example.com",
    "service": "HVAC tune-up"
  },
  "metadata": {"lead_id": "wh_0003"}
}
```
Expected:
- Validate E.164; reject and do not send
- Log with reason: invalid phone

### D) Duplicate lead (same lead_id)
Send payload A twice with same metadata.lead_id.
Expected:
- Second submission is deduped (no duplicate SMS thread)
- CRM note indicates “duplicate suppressed” (optional)

### E) Webhook retry (same payload, different request id)
Same lead but new metadata.request_id; expect idempotency by lead_id+phone+time window (e.g., 5–15 min).

---
## Jotform — Manual Setup + Tests (free tier)
**Setup:**
1. Create a Jotform with fields: First name, Last name, Phone, Email, Service needed, Zip, Notes.
2. Configure webhook integration to product inbound endpoint.
3. Confirm Jotform sends JSON including phone.

**Execute (6 runs):**
- 2 happy path submissions
- 1 missing phone (leave blank)
- 1 invalid phone
- 1 after-hours (force after-hours or submit outside hours)
- 1 duplicate (submit same exact data twice within 2 minutes)

**Expected:** same as webhook expectations; additionally confirm Jotform’s phone formatting is normalized to E.164 before send.

---
## HubSpot CRM — Manual Setup + Tests (free tier)
**Goal:** confirm lead creation/update triggers and CRM note formatting is readable, consistent, and includes timestamps and transcript.

**Execute (6 runs):**
- Create a new contact with phone and “Service needed” property → confirm SMS sends
- Update same contact with new form submission → confirm no duplicate intro spam (dedupe)
- Missing phone contact → no SMS
- Invalid phone contact → no SMS
- After-hours contact → after-hours message (see fallback/messages below)
- Calendar link failure simulation (set booking link to invalid URL) → verify fallback escalation wording

### Canonical HubSpot Note Format (expected)
Single note per lead interaction, appended as thread events:

**Title:** Lead Copilot — Qualification Session

**Body (example):**
- Lead Source: Jotform (form: Water Heater)
- Lead ID: wh_0001
- Received (T1): 2026-04-09 11:02:10 PT
- First SMS queued (T2): 2026-04-09 11:02:22 PT (12s)
- Status: Qualified → Booking link sent

Transcript:
[11:02:22] Copilot → Lead: Hi Jamie — thanks for reaching out about Water heater repair. A couple quick questions so we can get you scheduled. Is this for a home or business?
[11:02:40] Lead → Copilot: Home
[11:02:41] Copilot → Lead: Got it. What’s the ZIP code for the job?
...

System flags:
- STOP/HELP: none
- LLM mode: deterministic_fallback=false
- Dedupe: false

---
## STOP/HELP Compliance Tests (must pass)
### STOP
If lead replies “STOP”, “UNSUBSCRIBE”, “CANCEL”, etc.
Expected:
- Immediate confirmation: “You’re opted out and will no longer receive texts. Reply HELP for help.”
- Set internal flag: opted_out=true
- No further messages unless HELP

### HELP
Expected:
- Provide business identity and contact: “This is Lead Response Copilot on behalf of [Business Name]. For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to.”

---
## Deterministic Fallback Flow (LLM down / timeout / error)
**When to trigger fallback:**
- LLM call errors, timeout > 3s (configurable), or returns empty/unsafe output.

**Fallback message templates (exact copy):**
1) **Initial (immediate):**
“Hi {first_name} — thanks for reaching out about {service}. I can help get you scheduled. First, is this for a home or a business? Reply 1 for Home, 2 for Business.”

2) **If no reply in 2 minutes:**
“Quick follow-up: reply 1 for Home or 2 for Business and I’ll get you booked.”

3) **Q2 (after answer):**
“What ZIP code is the job in?”

4) **Q3:**
“What’s the best day/time window for a call or appointment? (e.g., ‘today 3–6pm’ or ‘tomorrow morning’)”

5) **Booking step:**
- If calendar link works: “Perfect — you can grab a time here: {calendar_link}. If you prefer, reply with a time window and we’ll confirm.”
- If calendar link fails/unreachable: “Our booking link is temporarily unavailable. Reply with your preferred time window and a human will confirm ASAP.”

6) **Escalation to human (after 3 questions or any ambiguity):**
“Thanks — I’m handing this to a human coordinator now. If this is urgent, reply URGENT.”

**After-hours deterministic variant:**
“Thanks for reaching out — we’re currently closed. Reply with 1) the service you need and 2) your ZIP code, and we’ll text you first thing when we open.”

---
## High-Risk Scenarios Checklist (pass/fail)
1) Missing phone → no SMS + internal alert
2) Invalid phone → no SMS + logged validation failure
3) STOP/HELP → correct compliance behavior; no further outreach
4) After-hours → after-hours template used; no booking promises
5) Concurrency (5 leads in 60s) → all receive first SMS <60s; no cross-talk between threads
6) Calendar link failure → fallback wording + escalation; no dead-end
7) Webhook retries → idempotent handling; no double-SMS
8) Duplicate leads → dedupe; no repeated intro spam
9) CRM note formatting → canonical note appears, readable transcript, includes timestamps

---
## Results Table (fill during pilot)
For each run record: Source | Scenario | T0 | T1 | T2 | T3 | KPI pass? | Transcript saved? | CRM note ok? | Bugs

---
## Bug Log (minimum fields)
- Bug ID
- Severity (P0 reputational/compliance, P1 revenue loss, P2 annoyance)
- Source (Webhook/Jotform/HubSpot)
- Steps to reproduce
- Expected vs Actual
- Evidence (timestamps, screenshot, transcript)
- Suggested fix

---
## Definition of “Verified <60s”
Verified when you have (a) at least 20 runs total, (b) median (T2−T1) < 30s and (c) 95th percentile (T2−T1) < 60s with no P0 compliance failures (STOP/HELP). If only device receipt time is available, record that and note provider visibility limitations.
