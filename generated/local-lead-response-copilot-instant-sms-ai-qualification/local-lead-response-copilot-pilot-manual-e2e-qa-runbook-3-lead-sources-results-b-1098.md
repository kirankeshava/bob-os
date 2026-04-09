# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results + Bug Log + Deterministic Fallback (LLM Safe Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:33:01.063Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

**Product/Legitimacy URL (shareable):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Ops/QA Contact:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (what we must prove in pilots)
1) **First response time KPI:** first outbound SMS sent **< 60 seconds** from lead creation for each lead source.  
2) **Safety/reputation:** correct handling for missing/invalid phone, STOP/HELP, after-hours, duplicates, retries, concurrency, calendar link failures.  
3) **Fail-safe qualification:** if the LLM fails/latency spikes, the system flips to a **deterministic scripted flow** (below) without sending confusing messages.

## 1) Lead sources under test (minimum 3)
A) **Generic Webhook JSON** (any form tool / ad platform can POST).  
B) **Jotform** (real form tool, free tier).  
C) **HubSpot** (CRM ingestion + note logging).

## 2) Evidence to capture (required)
For every test case row, capture:
- **Lead submit timestamp** (T0): from form submission UI / webhook request time / HubSpot create time.
- **Inbound received timestamp** (T1): server logs/webhook receipt log if available.
- **First outbound SMS timestamp** (T2): SMS provider log / app message log.
- **Delta:** T2 − T0 (must be < 60s).
- **Transcript:** first 3 outbound messages + user reply.
- **Screenshots:** Jotform submission receipt, HubSpot contact/note, message log.

**Pass/Fail gate:** if >5% of trials exceed 60 seconds, treat as **release blocker for that source** in pilots.

## 3) Standard test data set (use consistently)
Use these canonical “leads” across all 3 sources.

### Phones
- **Valid US mobile:** +14155550101
- **Valid US mobile 2:** +14155550102
- **Invalid (too short):** 415555
- **Invalid (letters):** +1ABCDEF
- **Missing phone:** null / empty string

### Names / metadata
- First/Last: Test / LeadA, LeadB, LeadC
- Service interest: “Water heater repair” (high intent)
- Zip: 94107
- UTM/source tags:
  - webhook: source=webhook_test
  - jotform: source=jotform_test
  - hubspot: source=hubspot_test

### Hours assumption
Define business hours for test:
- **Business hours:** 9:00am–5:00pm local
- **After hours:** outside window

## 4) Deterministic fallback (LLM Safe Mode) — exact script
Trigger Safe Mode when:
- LLM returns error OR timeout > 3 seconds OR empty response OR policy refusal.
- Any downstream dependency is degraded (calendar API errors, CRM write errors) AND we must continue conversation.

### Safe Mode message templates (copy/paste)
**Message 1 (immediate):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out — I can help get you scheduled. What service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other”

**If reply missing/unclear (after 2 minutes):**
“Quick question so I can route you: what’s the address or ZIP code for the job?”

**Qualification step 2 (after service identified):**
“Got it. When do you want service? Reply 1) ASAP 2) This week 3) Next week”

**Qualification step 3:**
“Best email to send confirmation (optional)? You can reply ‘skip’.”

**Scheduling attempt:**
- If calendar link OK: “Here’s the fastest way to pick a time: {{calendar_link}}. If you prefer, reply with 2 time windows that work.”
- If calendar link FAILS: “Our scheduling link is temporarily down. Reply with **two times** that work (e.g., Tue 2–4pm, Wed 9–11am) and we’ll confirm by text.”

**Escalation to human (if user asks complex question or after 3 turns without resolution):**
“Thanks — looping in a human to confirm details. If urgent, call {{business_phone}}. Otherwise we’ll text back shortly.”

### STOP/HELP compliance (must override everything)
- If inbound contains **“STOP”** (case-insensitive, exact word):
  - Immediately reply: “You’re unsubscribed and will no longer receive messages. Reply START to resubscribe.”
  - Mark contact as **DNC** and block future sends.
- If inbound contains **“HELP”**:
  - Reply: “Help: reply STOP to opt out. For assistance email agent_bob_replit+lead-copilot@agentmail.to and visit https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.”

## 5) Test cases (minimum set) with steps + expected results

### 5.1 Missing phone (all sources)
**Steps:** submit lead without phone.  
**Expected:** no SMS attempt; system logs “missing_phone”; if CRM enabled, create note: “Lead missing phone — manual follow-up required.”  
**Pass:** no provider error spam; no repeated retries.

### 5.2 Invalid phone (all sources)
**Steps:** submit lead with invalid phone (415555 or +1ABCDEF).  
**Expected:** phone validation fails; no send; CRM note records invalid phone; UI/admin shows validation reason.  
**Pass:** no SMS provider hard-bounce loops.

### 5.3 STOP
**Steps:** use valid phone; once first SMS arrives, reply “STOP”.  
**Expected:** immediate unsubscribe confirmation; all further sends blocked; dedupe prevents re-enrollment from duplicate lead.  
**Pass:** no subsequent marketing/qualification messages.

### 5.4 HELP
**Steps:** reply “HELP” after first SMS.  
**Expected:** HELP response includes opt-out instructions + support email + website URL.  
**Pass:** message sent <60s.

### 5.5 After-hours routing
**Steps:** submit lead outside business hours.  
**Expected:** first SMS acknowledges timing: “We received your request and will confirm first thing at 9am. If urgent reply ASAP.” Optionally collect intent in 1 question.  
**Pass:** still sends <60s; no booking offered if policy says no after-hours booking.

### 5.6 Multiple concurrent leads (cross-talk prevention)
**Steps:** submit 5 leads in 10 seconds with unique phone numbers.  
**Expected:** each lead gets correct first SMS; replies stay within the correct conversation; no leakage of names/services.  
**Pass:** 5/5 <60s.

### 5.7 Calendar link failures
**Steps:** force calendar endpoint failure (disable integration or use invalid URL).  
**Expected:** Safe Mode calendar-failure script used; asks for two time windows; creates CRM note “calendar_down”.  
**Pass:** user still progresses; no dead end.

### 5.8 Webhook retries / idempotency
**Steps:** send same webhook payload 3x with same event_id.  
**Expected:** only one SMS thread created; others logged as duplicate; CRM note not duplicated.  
**Pass:** exactly 1 outbound SMS.

### 5.9 Duplicate leads (same phone, different source)
**Steps:** submit via Jotform then via webhook with same phone within 5 minutes.  
**Expected:** dedupe merges or attaches to same contact; does not restart qualification; at most one “first message” within dedupe window.  
**Pass:** avoids spam.

### 5.10 HubSpot note formatting
**Steps:** create lead that qualifies and attempts booking.  
**Expected:** a single note appended to contact with canonical format below.  

**Canonical HubSpot note body (expected):**
“Lead Copilot Summary\n- Source: {{source}}\n- Name: {{full_name}}\n- Phone: {{phone_e164}}\n- Service: {{service_choice}}\n- Urgency: {{urgency_choice}}\n- ZIP/Address: {{zip_or_address}}\n- Outcome: {{booked|requested_times|handoff}}\n- Calendar: {{link_ok|link_failed}}\n- First response time: {{delta_seconds}}s\n- Transcript (last 6 msgs):\n  1) …\n  2) …\n  …”

**Pass:** newlines preserved, readable bullets, transcript included, no HTML garbage.

## 6) Generic Webhook JSON payloads (copy/paste)
Use `Content-Type: application/json`.

### 6.1 Valid lead
```json
{
  "event_id": "evt_001_valid",
  "source": "webhook_test",
  "created_at": "2026-04-09T17:00:00Z",
  "lead": {
    "first_name": "Test",
    "last_name": "LeadA",
    "phone": "+14155550101",
    "email": "test.leada@example.com",
    "service": "Water heater repair",
    "zip": "94107"
  },
  "meta": {
    "utm_source": "qa",
    "utm_campaign": "speed_to_lead"
  }
}
```

### 6.2 Missing phone
```json
{
  "event_id": "evt_002_missing_phone",
  "source": "webhook_test",
  "created_at": "2026-04-09T17:01:00Z",
  "lead": {
    "first_name": "Test",
    "last_name": "LeadB",
    "phone": "",
    "email": "test.leadb@example.com",
    "service": "Water heater repair",
    "zip": "94107"
  }
}
```

### 6.3 Invalid phone
```json
{
  "event_id": "evt_003_invalid_phone",
  "source": "webhook_test",
  "created_at": "2026-04-09T17:02:00Z",
  "lead": {
    "first_name": "Test",
    "last_name": "LeadC",
    "phone": "415555",
    "email": "test.leadc@example.com",
    "service": "Water heater repair",
    "zip": "94107"
  }
}
```

### 6.4 Retry/duplicate (send same as 6.1 three times)
Keep `event_id` the same: `evt_001_valid`.

## 7) Results table (fill during execution)
For each run, create a row:
- TestID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- T0 submit
- T2 first SMS
- Delta seconds
- Pass/Fail
- Evidence link (screenshot/transcript)
- Notes

Minimum sample for KPI claim: **20 total trials** across the 3 sources, with at least 5 trials per source.

## 8) Bug/Fix log (prioritize by churn risk)
Fields:
- BugID
- Severity (Blocker/High/Med/Low)
- Scenario
- Steps to reproduce
- Expected vs Actual
- Impact (reputation/legal/revenue)
- Suggested fix
- Owner
- Status

**Severity guidance:**
- **Blocker:** STOP not honored, duplicate spam, cross-talk, >60s systemic delays.
- **High:** invalid phone causes retries, after-hours wrong messaging, calendar down dead-ends.

## 9) “Verified <60s” statement rules
We can claim “<60s first response” only if:
- 20+ timestamped trials show **95%+ under 60s**, and
- Worst-case under 90s (otherwise phrase as “typically under 60s”).

---
If you want me to run this immediately, I need the current inbound endpoints/log access (no paid spend required) and a test sending number already configured in the product so we can collect T2 timestamps and transcripts.