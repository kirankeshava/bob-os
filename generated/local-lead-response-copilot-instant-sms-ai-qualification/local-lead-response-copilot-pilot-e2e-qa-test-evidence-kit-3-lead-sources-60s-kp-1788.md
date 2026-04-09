# Local Lead Response Copilot — Pilot E2E QA Test Evidence Kit (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:09:26.671Z

---

## Purpose
Run a fast, manual end-to-end QA sweep during the first pilots (no automation). Prove speed-to-lead (<60s first outbound SMS) across three lead sources and confirm safe behavior under common failure conditions.

**Business proof URL (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Contact email:** agent_bob_replit+lead-copilot@agentmail.to

## Systems Under Test (Lead Sources)
1) **Generic Webhook JSON** (any form/ads tool posting JSON)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

## KPI & Evidence Standard (must capture)
### KPI
- **First response time:** time from lead creation event to first outbound SMS sent.
- **Pass threshold:** <60 seconds.
- **Sampling:** minimum **20 trials** total across the 3 sources (recommended split: 8 webhook, 6 Jotform, 6 HubSpot).

### Timestamp Capture Points (write down all 3)
1) **T0 Lead Created**
   - Webhook: timestamp of POST request (terminal time) + server log receipt time.
   - Jotform: form submission time (Jotform submission log).
   - HubSpot: form submission time or contact creation time (HubSpot timeline timestamp).
2) **T1 Copilot Accepted Lead**
   - app log line “lead_received/queued” with timestamp.
3) **T2 First SMS Sent**
   - app log line “sms_sent” with timestamp OR messaging provider log (if available).

**Compute:** T2 - T0. Record per trial plus median and p95.

### Evidence to Save
- Screenshot (or copy) of:
  - Lead source submission record (Jotform submission; HubSpot contact timeline)
  - App log lines showing lead received + SMS sent
  - SMS transcript from test phone

## Deterministic Fallback Mode (LLM failure safe mode)
Use this when the LLM errors, times out, rate-limits, or returns invalid output. Goal: still qualify and route without hallucinations.

### Trigger Conditions
- LLM API error/timeout > 8s
- LLM returns empty/invalid JSON
- LLM confidence below threshold (if implemented)

### Deterministic State Machine (exact copy)
**Message 1 (immediate):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out — what can we help you with today? Reply with:
1) Repair
2) Install/Replace
3) Quote/Estimate
4) Other”

**If reply = 1/2/3/4:**
**Message 2:**
“Got it. What’s your ZIP code?”

**If ZIP valid (5 digits):**
**Message 3:**
“Thanks. When do you need help?
1) ASAP (today/next 24h)
2) This week
3) Flexible”

**If user chooses timeframe:**
**Message 4 (booking intent):**
“Perfect — would you like to book a quick call or appointment?
1) Yes
2) Not yet”

**If Yes:**
- If calendar link is healthy: send booking link.
- If calendar link fails: send manual fallback.

**Calendar healthy message:**
“Here’s the booking link: {{calendar_link}}. If you prefer, reply with two times that work and we’ll confirm.”

**Calendar failure message (fail-safe):**
“Scheduling link is temporarily unavailable. Reply with two times that work (include day/time), and we’ll confirm ASAP.”

**If Not yet:**
“ No problem. What’s the best email for sending options and pricing?”

### STOP/HELP Compliance (deterministic)
- On inbound “STOP” (or STOP variants):
  “You’re opted out and will no longer receive messages. Reply START to opt back in.”
  - System must mark contact as **do_not_text=true**.
- On inbound “HELP”:
  “For help, reply with your question or email us at agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

### After-hours Routing
Define business hours (pilot default): Mon–Fri 8am–6pm local.
- If lead arrives after hours:
  **Immediate SMS:**
  “Thanks for reaching out — we’re currently closed, but we got your message. Reply with what you need and we’ll follow up first thing tomorrow morning.”
- Still run deterministic questions; set status “after_hours_pending”.

## Test Matrix (must run)
Run each scenario at least once per lead source where applicable.

### A) Missing Phone
**Input:** lead payload without phone.
**Expected:** no SMS attempt; create lead record flagged “missing_phone”; if email exists, send email asking for phone; otherwise alert internal queue.
**Pass:** zero SMS sends; clear error reason captured.

### B) Invalid Phone
**Input:** phone = “123”, “+1 (000) 000-0000”, non-E.164.
**Expected:** validation fails; no send; log reason “invalid_phone”; if email present request correct number.

### C) STOP / HELP
**Input:** user replies STOP, then later START; user replies HELP.
**Expected:** STOP blocks any further automated sends; START re-enables; HELP returns help message with email.

### D) After-hours
**Input:** lead created outside business hours.
**Expected:** immediate after-hours acknowledgment (<60s) + no calendar booking push; marks follow-up.

### E) Multiple Concurrent Leads
**Input:** send 5 leads within 30 seconds (same source).
**Expected:** each gets first SMS <60s; no cross-talk; correct contact mapping.

### F) Calendar Link Failure
**Input:** simulate calendar endpoint 500 / invalid link / timeout.
**Expected:** fallback message asking for two times; lead marked “needs_manual_booking”.

### G) Webhook Retries
**Input:** same webhook payload posted 3 times with same event_id.
**Expected:** dedupe prevents duplicate SMS; idempotency key stored.

### H) Duplicate Leads (same phone)
**Input:** create lead twice within 10 minutes with same phone.
**Expected:** second lead either merges or creates new record but **does not** restart qualification if active thread exists; add CRM note “duplicate_detected”.

### I) CRM Note Formatting (HubSpot)
**Expected note template (copy/paste):**
Title: “Lead Copilot Qualification Summary”
Body (exact fields):
- Source: {{source}} (Webhook/Jotform/HubSpot)
- Received: {{t0_timestamp}}
- First SMS sent: {{t2_timestamp}} ({{seconds_to_first_sms}}s)
- Phone: {{phone_e164}}
- Contact name: {{first_name}} {{last_name}}
- Service requested: {{service_category}}
- ZIP: {{zip}}
- Timeframe: {{timeframe}}
- Booking: {{booked_yes_no}}
- Booking link: {{calendar_link_or_manual}}
- Status: {{status}}
- Transcript (last 3 msgs):
  1) {{msg1}}
  2) {{msg2}}
  3) {{msg3}}

**Pass:** note renders cleanly in HubSpot timeline; line breaks preserved; no markdown artifacts.

## Copy/Paste Test Payloads
### 1) Generic Webhook JSON (valid)
POST /lead
{
  "event_id": "evt_001",
  "source": "webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test.lead@example.com",
  "service": "HVAC repair",
  "message": "AC stopped cooling",
  "timestamp": "{{now_iso}}"
}

### 2) Generic Webhook JSON (missing phone)
{
  "event_id": "evt_002",
  "source": "webhook",
  "first_name": "NoPhone",
  "last_name": "Lead",
  "email": "nophone@example.com",
  "service": "Plumbing",
  "message": "Need estimate",
  "timestamp": "{{now_iso}}"
}

### 3) Generic Webhook JSON (invalid phone)
{
  "event_id": "evt_003",
  "source": "webhook",
  "first_name": "BadPhone",
  "last_name": "Lead",
  "phone": "123",
  "email": "badphone@example.com",
  "service": "Roofing",
  "message": "Leak repair",
  "timestamp": "{{now_iso}}"
}

### 4) Webhook Retry (same event_id)
Re-send payload for evt_001 2 more times.
**Expected:** only 1 qualification thread and 1 initial SMS.

## Results Table (fill during pilot)
For each trial record:
- Trial #
- Source (Webhook/Jotform/HubSpot)
- Scenario (happy path / missing phone / etc.)
- T0 lead created
- T1 accepted
- T2 first SMS sent
- T2-T0 seconds
- Pass/Fail
- Evidence link (screenshot/log snippet location)
- Notes

## Bug/Fix List (pre-seeded, prioritize)
P0 (must fix before scaling):
1) Any case where STOP does not prevent further sends.
2) Duplicate/retry sends multiple SMS blasts.
3) >60s median first response under normal load.
4) Wrong contact receives messages (thread mix-up).

P1:
1) After-hours message missing/incorrect.
2) Calendar failure does not trigger manual fallback.
3) HubSpot note formatting unreadable or missing key fields.

P2:
1) Edge-case phone parsing issues.
2) Non-critical copy tweaks.

## Exit Criteria
- 20 trials completed with evidence.
- Median first response <60s; p95 ideally <60s (or documented bottlenecks + mitigation).
- Deterministic fallback verified in at least 3 trials (LLM simulated fail/timeout).
- STOP/HELP verified with transcript evidence.
- Dedupe/idempotency verified for retries and duplicates.

If any P0 fails, pause onboarding new customers until fixed; this is reputation-critical for agencies selling speed-to-lead.