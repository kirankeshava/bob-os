# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources) + <60s KPI Proof + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:00:59.782Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Packet

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)  
**Website (share for legitimacy):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Support/Contact:** agent_bob_replit+lead-copilot@agentmail.to  

## 1) Goal + Scope (Pilot-Friendly)
This packet validates end-to-end reliability for the first pilots **without building automation**. It focuses on:
- **3 lead sources:** (A) Generic Webhook JSON, (B) Jotform (real form tool), (C) HubSpot CRM
- **Primary KPI:** first outbound SMS to lead within **<60 seconds** of lead creation
- **Reputation protectors:** STOP/HELP compliance, phone validation, after-hours behavior
- **Fail-safe:** deterministic (non-LLM) qualification flow when the LLM errors/times out

**Out of scope (pre-revenue):** load testing, automated e2e suites, synthetic monitoring, paid tooling.

## 2) Definitions + Evidence to Capture
### Timestamp points
Record these per trial:
- **T0 (Lead Created):** time the lead is submitted/created (form submission time, webhook request time, or CRM event time).
- **T1 (Copilot Received):** server log timestamp when webhook/CRM event is received (if available).
- **T2 (First SMS Sent):** messaging provider “sent” timestamp or application “queued/sent” event.
- **T3 (First SMS Delivered):** if delivery receipts exist (optional).

**KPI metric:** `T2 - T0` must be **≤ 60s**.

### Evidence checklist
For each scenario capture one of:
- screenshot of the form submission confirmation w/ timestamp + SMS log timestamp
- webhook request log excerpt (request ID + timestamp) + SMS send log (message SID/time)
- HubSpot contact record with the note/timeline entry + internal logs

Store evidence in a shared folder with filenames: `YYYY-MM-DD_source_scenario_trial#.png/txt`.

## 3) Environment Setup (Free-tier Friendly)
### Required config inputs (fill before testing)
- **Copilot inbound webhook URL** (generic): __________________________
- **Jotform webhook endpoint** (same as above or dedicated): __________
- **HubSpot app/webhook subscription** details: ______________________
- **Sending number** (SMS): __________________________
- **Business hours + timezone** (for after-hours tests): ______________
- **Calendar booking link** (if used): _______________________________
- **Dedup window** (recommended 5–15 min): __________________________

### Test phone numbers
Use at least 3 phones (or 1 phone + aliasing if supported):
- P1: valid mobile capable of receiving SMS
- P2: second valid mobile
- P3: “blocked” test (or a landline/invalid format)

## 4) Deterministic Qualification Fallback (Non-LLM Safe Mode)
When LLM errors, times out, or returns invalid output, the system must **continue qualification deterministically**.

### Trigger conditions (any => deterministic mode)
- LLM request timeout > 8 seconds
- LLM HTTP/network error
- LLM output missing required fields (intent/service/location/timeframe)
- Content safety violation / refusal

### Deterministic question flow (exact copy)
**Message 1 (immediate, <60s):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—can I ask 3 quick questions to get you a fast quote?”

If no reply in 2 minutes:
“Reply YES to continue, or call us at {{business_phone}}.”

If reply indicates opt-out keywords:
- STOP / UNSUBSCRIBE / CANCEL / END / QUIT => follow STOP behavior (below)

**Q1 (Service):**
“What service do you need? Reply with the number: 1) Repair 2) Install 3) Estimate 4) Other”

**Q2 (Location):**
“What city/ZIP is the job in?”

**Q3 (Timeframe):**
“When do you need this done? 1) ASAP 2) This week 3) 1–2 weeks 4) Not sure”

**Routing rules (deterministic):**
- If Timeframe=ASAP => escalate immediately: “Got it—someone will call you shortly. What’s the best time today?”
- If after-hours (see section 6) => “We’re currently closed, but you’re in the queue. What’s a good time tomorrow?”
- If calendar link available => “You can also book a time here: {{calendar_link}}”
- If calendar link fails/unreachable => offer manual scheduling: “Reply with two times that work and we’ll confirm.”

### STOP/HELP compliance (mandatory)
- On STOP: immediately send “You’re opted out and will no longer receive messages. Reply START to re-subscribe.” and set contact status = Opted Out.
- On HELP: send “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
- On START: re-enable messaging and confirm.

## 5) Lead Sources Under Test
### A) Generic Webhook JSON
**Goal:** confirm inbound webhook -> SMS within <60s, validation, retries, dedupe.

**Canonical payload (example):**
```json
{
  "source": "webhook",
  "lead_id": "lead_{{uuid}}",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+15551234567",
  "email": "test@example.com",
  "service": "plumbing",
  "message": "Need estimate",
  "created_at": "{{iso_timestamp}}"
}
```

### B) Jotform
**Goal:** confirm real form submission triggers the same processing + fast SMS.
- Build a Jotform with fields: name, phone, email, city/zip, service needed, notes.
- Configure **webhook** to Copilot endpoint.

### C) HubSpot CRM
**Goal:** confirm CRM-originated leads (new contact / form submission / pipeline) trigger outreach, plus correct **CRM note formatting**.
- Use HubSpot developer/test portal.
- Subscribe to relevant events (contact creation or form submission).  

## 6) Test Cases (Must-Pass for Pilots)
Each test includes: **Steps, Expected result, Evidence**.

### TC1: Valid lead -> first SMS <60s (baseline)
- Source: run once per source (Webhook, Jotform, HubSpot)
- Steps: create lead with valid mobile P1.
- Expected: first SMS copy correct, sent within <60s of T0.
- Evidence: timestamps T0/T2.

### TC2: Missing phone
- Steps: submit lead without phone (or blank field).
- Expected: no SMS attempt; create internal task/flag; optional email to business; response recorded as “Unable to contact—missing phone.”
- Evidence: processing log + no outbound SMS.

### TC3: Invalid phone
- Steps: phone like “123” or landline if detectable.
- Expected: do not send SMS; mark invalid; optionally request correct number via email if available.

### TC4: STOP keyword
- Steps: from P1, reply “STOP”.
- Expected: immediate opt-out confirmation; no further messages.

### TC5: HELP keyword
- Steps: reply “HELP”.
- Expected: help message includes email agent_bob_replit+lead-copilot@agentmail.to and STOP instruction.

### TC6: After-hours routing
- Steps: set business hours; submit lead outside hours.
- Expected: first SMS still <60s but copy acknowledges closure + promises follow-up; optional schedule link.

### TC7: Multiple concurrent leads
- Steps: submit 5 leads within 30 seconds across at least two sources.
- Expected: all receive first SMS <60s; no cross-talk; no blocked queue.

### TC8: Calendar link failure
- Steps: use an intentionally broken calendar URL or simulate 404.
- Expected: system does not crash; offers manual scheduling via text; logs “calendar_down=true”.

### TC9: Webhook retries
- Steps: re-send same webhook with same lead_id 3 times.
- Expected: only one SMS; subsequent attempts deduped; logs note retry.

### TC10: Duplicate leads (different IDs, same phone within window)
- Steps: submit two leads with same phone within 5 minutes.
- Expected: either (a) suppress second SMS and append note “duplicate,” or (b) send a single consolidated message; behavior must be consistent and documented.

### TC11: CRM note formatting (HubSpot)
- Steps: lead qualified through 2–3 questions.
- Expected: HubSpot timeline note is readable, includes:
  - lead source
  - timestamps (T0/T2)
  - qualification answers (service/location/timeframe)
  - status (booked / needs follow-up / opted out)
  - message transcript summary (no giant raw JSON)

**Recommended HubSpot note template:**
```
[Lead Copilot] New lead engaged
Source: {{source}}
Created: {{T0}}
First SMS sent: {{T2}} ({{delta_seconds}}s)
Phone: {{phone}}
Qualification:
- Service: {{service_answer}}
- Location: {{location_answer}}
- Timeframe: {{timeframe_answer}}
Outcome: {{booked|needs_followup|opted_out}}
Transcript (summary): {{1-3 bullet summary}}
```

## 7) Results Capture Tables (Fill During Pilot)
### KPI Results (per trial)
| Trial | Source | Scenario | T0 Lead Created | T2 First SMS Sent | Delta (sec) | Pass/Fail | Evidence link |
|------:|--------|----------|-----------------|------------------|------------:|----------|--------------|
| 1 | Webhook | Baseline | | | | | |
| 2 | Jotform | Baseline | | | | | |
| 3 | HubSpot | Baseline | | | | | | |

### Scenario Results
| Scenario | Source(s) | Pass/Fail | Notes / What happened | Bug ID |
|----------|-----------|----------|------------------------|--------|
| Missing phone | All | | | |
| Invalid phone | All | | | |
| STOP | All | | | |
| HELP | All | | | |
| After-hours | All | | | |
| Concurrency | Webhook+Jotform | | | |
| Calendar fail | Any | | | |
| Retries | Webhook | | | |
| Dedupe | All | | | |
| CRM note format | HubSpot | | | |

## 8) Bug/Fix List (Prioritized)
Use this template during execution.

| Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Likely Root Cause | Recommended Fix |
|-------|----------------------|----------|--------------------|----------|--------|-------------------|-----------------|
| B-001 | P0 | STOP | Reply STOP | Opt-out immediately |  |  | Enforce keyword handler before LLM |
| B-002 | P0 | <60s KPI | Any | SMS <60s |  |  | Queue prioritization + async worker |
| B-003 | P1 | Dedupe | Duplicate lead | Single outreach |  |  | Add dedupe key: phone+window |
| B-004 | P1 | Calendar fail | Broken link | Manual scheduling fallback |  |  | Catch errors + fallback copy |
| B-005 | P2 | CRM note | HubSpot | Readable note |  |  | Format transformer |

## 9) “Verified <60s” Gate for Pilot Readiness
You can claim **Verified <60s** when:
- At least **20 trials** recorded across the 3 sources
- **95%** of trials have `T2-T0 ≤ 60s`
- No **P0** bugs remain open (STOP compliance, missing/invalid phone safety, major duplicate spam, or complete outage)

## 10) Customer/Agency-Facing Reliability Statement (Optional)
“We prioritize speed-to-lead. In pilot QA we verify first SMS outreach typically occurs within 60 seconds of lead creation, and we maintain a safe fallback question flow if AI services are degraded. More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 or agent_bob_replit+lead-copilot@agentmail.to.”
