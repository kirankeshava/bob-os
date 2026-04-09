# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Results + Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:21:07.358Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Packet

Business reference (for any external comms/screenshots):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

## 1) Goal
Validate that new leads receive a first outbound SMS in **<60 seconds** and that the system behaves safely under failure/edge conditions. This is designed to run during early pilots (manual, no automation) and produce evidence an agency can trust.

## 2) Scope: 3 lead sources
1) **Generic Webhook JSON** (any form/ad tool that can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

## 3) Prereqs (operator checklist)
- Access to product admin/config (webhook URL(s), API keys if any).
- Ability to view logs of inbound leads + outbound SMS timestamps (app logs, provider logs, database, etc.).
- A test phone that can receive SMS.
- Calendar/booking endpoint configured (or a known “broken link” to test failure).
- Defined “business hours” for after-hours tests (example: 9am–5pm local).

## 4) KPI definition and measurement (<60s)
**KPI:** Time from lead ingestion to first outbound SMS.

### Timestamp capture points
- **T0 (Lead Submitted):**
  - Webhook: time request sent (curl timestamp) + server received timestamp (log)
  - Jotform: submission time in Jotform + server received timestamp
  - HubSpot: form/record creation time or workflow trigger time + server received timestamp
- **T1 (First SMS Sent):** outbound message “sent” timestamp from the system (prefer provider “queued/sent” time).
- **T2 (First SMS Delivered):** if available (provider delivery receipt). Use T1 for KPI if delivery receipts aren’t reliable.

### Pass/Fail
- **PASS:** T1 − T0 ≤ 60 seconds for ≥ 90% of trials, and no individual trial exceeds 120 seconds without a logged reason.
- **FAIL:** Any consistent breach, or missing auditability (can’t reconstruct timestamps).

### Evidence to store
For each trial keep:
- Inbound payload (or screenshot), received timestamp, outbound SMS log line/provider log, and transcript.
- Results table row (template below).

## 5) Deterministic “LLM Down” fallback mode (must be safe)
If LLM errors/timeouts occur, switch to deterministic mode automatically.

### Trigger conditions
- LLM call times out after **8 seconds** OR returns non-200/error OR empty output.
- More than **2 consecutive LLM failures** in 5 minutes (circuit breaker) → force deterministic mode for 15 minutes.

### Deterministic question flow (exact copy)
**Message 1 (immediate):**
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out—what can we help with? Reply 1) Quote 2) Schedule 3) Other”

If reply == 1:
“Got it. What service do you need? Reply with: A) {{service_1}} B) {{service_2}} C) {{service_3}} D) Other”

If reply == 2:
“Great—what day works best? Reply: 1) Today 2) Tomorrow 3) This week”

If reply == 3 or “Other”:
“Thanks. Briefly describe what you need, and we’ll connect you with the right person.”

### Qualification minimum fields to capture
- Service category
- Zip code (if not present): “What’s your ZIP code?”
- Time preference

### Escalation rules
- If user asks for a human or replies with frustration keywords (“agent”, “human”, “stop texting”, profanity):
  - Send: “No problem—looping in a team member now.”
  - Create a task/notification to human.
- After **3 unanswered questions** across 30 minutes:
  - Send one final message: “If you’d like, you can book here: {{calendar_link}} or reply with a good time to call.”

### Compliance: STOP/HELP
- If inbound message contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”:
  - Send: “You’re unsubscribed and won’t receive further messages.”
  - Mark phone as DNC immediately; block all future outbound.
- If inbound contains “HELP”:
  - Send: “Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to and see https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

## 6) Test matrix (must run)
Run each scenario across at least 3 trials (unless noted). Total target: **20+ trials**.

### A) Generic Webhook JSON
1. Happy path valid lead (phone + name) → first SMS <60s.
2. Missing phone → lead rejected safely (no SMS), error logged + optional email alert.
3. Invalid phone (letters/too short) → no SMS; validation error logged.
4. Duplicate lead (same phone within 10 min) → no duplicate SMS; dedupe note created.
5. Webhook retry (same payload resent) → idempotent handling (no duplicate outbound).

### B) Jotform
1. Standard submission → first SMS <60s.
2. Jotform field mapping mismatch (swap phone field name) → fails safely; mapping error surfaced.
3. After-hours submission → after-hours behavior enforced (see below).

### C) HubSpot
1. New lead in HubSpot triggers SMS → <60s.
2. CRM note formatting → note added to contact/deal with structured transcript.
3. Concurrency: create 5 leads within 30 seconds → each gets correct first SMS; no cross-talk.

### Cross-cutting edge cases
- STOP compliance (must verify DNC): submit lead → receive SMS → reply STOP → confirm no further SMS.
- HELP compliance: reply HELP → receive correct help message.
- Calendar link failure: booking link 404/unreachable → offer alternative CTA (call back) and alert internally.
- LLM failure simulation: force timeout/error → deterministic mode kicks in and completes minimum qualification.

## 7) After-hours behavior (define and test)
**Expected behavior:**
- If outside business hours, send immediate acknowledgment within <60s:
  “Thanks—our team is currently closed. We’ll text you first thing tomorrow. If urgent, reply URGENT.”
- If user replies URGENT after-hours: alert human on-call (or create task), but do not promise immediate response unless on-call exists.

## 8) Results capture tables

### Results table template
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- T0 (submit/received)
- T1 (first SMS sent)
- Delta seconds
- PASS/FAIL
- Transcript link/screenshot
- Notes

### Bug log template
- Bug ID
- Title
- Severity (S0 Critical: compliance/data leak; S1 KPI breach; S2 functional; S3 cosmetic)
- Impact (conversion/churn/compliance)
- Source + scenario
- Steps to reproduce
- Expected
- Actual
- Evidence (log lines, screenshots)
- Suggested fix
- Owner + status

## 9) HubSpot CRM note formatting (expected)
Create a single note per lead interaction with:
- Lead source + timestamp
- First response time delta
- Conversation transcript (last 10 messages)
- Outcome tags: {Qualified, Unqualified, Booked, Needs human}

**Example note text:**
“Lead Copilot — New lead (Jotform) @ 2026-04-09 14:03:12
First SMS sent: 14:03:38 (26s)
Transcript:
- System: Hi Sam, it’s ACME Plumbing…
- Lead: 1
- System: What service…
Outcome: Qualified; Service=Drain; Time=Tomorrow”

## 10) Acceptance gates (ship/pilot readiness)
- Proven evidence of <60s first SMS across the 3 sources with 20+ trials.
- STOP/HELP compliant with DNC enforcement.
- Missing/invalid phone never triggers outbound SMS.
- Dedupe/idempotency prevents double-texting.
- LLM failure does not break flow; deterministic mode continues and escalates safely.
- HubSpot notes readable and consistent.

## 11) Known high-risk areas (prioritize if bugs found)
1) STOP/DNC (compliance + reputation)
2) Wrong-number texting due to parsing/formatting
3) Dedupe/idempotency (double texting)
4) After-hours promises (trust)
5) Calendar failures (conversion)
6) Cross-talk in concurrency (privacy)

---
Operator instruction: run this packet during the first pilot onboarding and store evidence in a shared folder. If any S0/S1 bug appears, pause rollout to additional leads until fixed or mitigated (e.g., force deterministic mode, disable booking link, tighten validation).