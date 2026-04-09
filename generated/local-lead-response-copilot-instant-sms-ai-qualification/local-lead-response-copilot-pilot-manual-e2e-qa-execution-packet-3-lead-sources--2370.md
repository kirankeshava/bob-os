# Local Lead Response Copilot — Pilot Manual E2E QA Execution Packet (3 Lead Sources, <60s KPI, Deterministic Fallback)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T21:04:40.058Z

---

## Purpose
Protect early pilot reputation by validating end-to-end lead capture → first SMS → qualification → booking/hand-off across 3 lead sources, while proving the speed-to-lead KPI (<60s first response) and ensuring safe fallbacks (deterministic flow) when LLM/automation fails.

**Legitimacy link to share with pilots:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Business contact for test coordination:** agent_bob_replit+lead-copilot@agentmail.to

---

## Scope: Lead Sources (3)
1) **Generic Webhook JSON** (any form/ads platform hitting our endpoint)
2) **Jotform** (real form tool, free tier)
3) **HubSpot CRM** (real CRM; validate note formatting + dedupe)

---

## KPI & Evidence Requirements
### KPI
- **First response time (FRT):** time from **lead_received_ts** (system receives lead) to **sms_sent_ts** (first outbound SMS queued/sent).
- **Target:** P95 < 60s (pilot target). For initial pilot evidence: **20 trials** total, with **0 trials > 60s** preferred; any outlier must have documented reason (carrier delay vs queue vs downstream failure).

### Evidence to capture (per trial)
- lead source
- lead payload snapshot (redact phone digits except last 2)
- lead_received_ts (server log timestamp)
- sms_sent_ts (messaging log timestamp)
- computed FRT seconds
- transcript (first 3 messages each direction)
- outcome (qualified? booked? escalated?)

**Tools (no spend):** browser devtools/network, server logs, spreadsheet (Google Sheets), screenshots.

---

## Deterministic Fallback Mode (LLM-safe)
**Trigger conditions** (any):
- LLM error/timeout > 6s
- tool/function call failure
- confidence below threshold (if supported)
- upstream payload missing required fields

### Safe-mode behavior
- Send deterministic questions (below) with strict validation.
- Do not hallucinate availability/pricing.
- If user requests human, STOP, or confusion detected → escalate.

### Deterministic question flow (copy/paste)
**Message 1 (immediate):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—can I ask 2 quick questions to get you the fastest quote? Reply YES to continue.”

If YES → Q1.
If no response after 3 minutes → Reminder: “Just reply YES and I’ll get you to the right option.”
If still no response after 15 minutes → close: “No worries—reply YES anytime and we’ll jump back in.”

**Q1 (service type):**
“What do you need help with? Reply with 1, 2, or 3:
1) Repair
2) Install/Replace
3) Other”

**Q2 (timing):**
“When do you want this done?
1) ASAP / emergency
2) This week
3) Flexible”

**Q3 (location / zip):**
“What’s the job ZIP code?”
- Validate: 5 digits (US). If invalid: “Please reply with a 5-digit ZIP code.”

**Hand-off / booking:**
- If calendar is available: “Perfect—grab a time here: {{calendar_link}}. If you prefer, reply CALL and we’ll ring you.”
- If calendar link fails: “Looks like our booking link is temporarily down—reply with the best time window today (e.g., 2–4pm) and we’ll confirm by text.”

**Escalation-to-human:**
“Got it—looping in a human now. If this is urgent, reply URGENT.”

### Compliance keywords
- **STOP**: immediately confirm opt-out: “You’re opted out and won’t receive more texts. Reply START to opt back in.” Tag contact as DNC.
- **HELP**: “You can reply STOP to opt out. For help, contact us at agent_bob_replit+lead-copilot@agentmail.to or see https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

---

## Test Matrix (Must-pass)
Run all tests at least once per lead source where applicable.

### A) Data validation
1. **Missing phone**: payload has no phone.
   - Expected: no SMS attempt; create task/CRM note “Missing phone”; email alert to agent_bob_replit+lead-copilot@agentmail.to.
2. **Invalid phone**: phone has letters/too short.
   - Expected: no SMS attempt; logged validation error; CRM note includes raw input.

### B) Messaging compliance
3. **STOP** keyword at any point.
   - Expected: immediate opt-out confirmation; suppress further outbound.
4. **HELP** keyword.
   - Expected: help response with opt-out instructions + contact email + website.

### C) Routing logic
5. **After-hours** (define window in config).
   - Expected: message sets expectation: “We’ll text you at {{next_open_time}}”; still collects Q1-Q3 optionally OR defers.

### D) Reliability / edge cases
6. **Multiple concurrent leads** (5 leads within 10 seconds).
   - Expected: each lead receives first SMS; no cross-talk; logs show distinct conversation IDs.
7. **Webhook retries** (same event delivered 3 times).
   - Expected: dedupe by lead_id or (phone + source + time bucket); only one conversation created; CRM has single note.
8. **Duplicate leads** (same phone submits twice within 2 minutes).
   - Expected: second event attaches to existing thread; no second “Message 1” unless configured; CRM note appended with “Duplicate submission detected”.
9. **Calendar link failure** (simulate 404/timeout).
   - Expected: system falls back to manual scheduling prompt; no dead-end.
10. **LLM failure** (force timeout).
   - Expected: deterministic flow triggers; qualification continues; escalation path works.

### E) CRM formatting (HubSpot)
11. **Note formatting**
   - Expected note template:
     - Header: “Lead Copilot Summary”
     - Source + timestamp
     - Contact fields (name/phone/email)
     - Qualification answers (Q1-Q3)
     - Status: booked/escalated/opted-out
     - Transcript snippet (first inbound + first outbound)

---

## Exact Generic Webhook JSON Payloads (ready to send)
### 1) Valid lead
{
  "source": "webhook_test",
  "lead_id": "qa-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "install",
  "created_at": "2026-04-09T12:00:00Z"
}

### 2) Missing phone
{
  "source": "webhook_test",
  "lead_id": "qa-002",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "created_at": "2026-04-09T12:01:00Z"
}

### 3) Invalid phone
{
  "source": "webhook_test",
  "lead_id": "qa-003",
  "first_name": "BadPhone",
  "phone": "555-ABCD",
  "created_at": "2026-04-09T12:02:00Z"
}

### 4) Retry/duplicate (send same as qa-001 three times)
Use the exact qa-001 body; verify dedupe.

---

## Results Table (copy into Sheets)
Columns:
- Trial ID
- Lead Source (Webhook/Jotform/HubSpot)
- Scenario (valid/missing phone/STOP/etc)
- lead_received_ts (UTC)
- sms_sent_ts (UTC)
- FRT (sec)
- Pass/Fail
- Evidence link (screenshot/log URL)
- Notes / Bug ID

---

## Bug/Fix Log Rubric (prioritized)
Severity definitions:
- **S0 (Blocker):** compliance breach (STOP ignored), wrong recipient texted, or no first SMS on valid lead.
- **S1 (Critical):** FRT > 60s reproducible, dedupe broken (spam), after-hours misroutes, calendar failure dead-ends.
- **S2 (Major):** CRM note missing key fields, formatting unreadable, qualification logic inconsistent.
- **S3 (Minor):** copy/typos, non-blocking UX issues.

Bug log fields:
- Bug ID
- Severity
- Source
- Steps to reproduce
- Expected vs actual
- Logs/screens
- Suggested fix
- Retest status

---

## “Verified <60s” Sign-off Criteria (for pilots)
We can claim “verified <60s first response” for a pilot environment when:
- 20 timestamped trials completed across 3 lead sources
- 0 S0/S1 open bugs related to first response, compliance, dedupe
- P95 FRT < 60 seconds (report computed in the results sheet)

If any S0/S1 bug exists, do not expand to more leads until fixed or a manual backstop is in place (human monitoring + deterministic mode forced).