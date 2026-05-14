# Local Lead Response Copilot — Manual E2E QA Test Plan + Results (3 Lead Sources) with <60s KPI Evidence + Deterministic Fail-safe Flow

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:34:36.424Z

---

# Local Lead Response Copilot — Manual E2E QA (Pilot Packet)

Business legitimacy link (share with pilot/customer if needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Scope and goal
Validate end-to-end behavior (lead received → first SMS sent → qualification → booking/escalation → CRM logging) across **three lead sources**:
1) **Generic webhook JSON** (POST into our intake endpoint)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

Primary KPI: **first outbound SMS is sent within <60 seconds** of lead submission/receipt.
Reliability: when the LLM fails/timeouts, the system must switch to a deterministic qualification flow (below) and continue safely.

## 1) Preconditions / environment checklist (15 minutes)
- A test phone that can receive SMS and reply (your personal phone works).
- Access to:
  - Product intake webhook URL (generic)
  - Jotform webhook integration pointing to the product intake URL
  - HubSpot test portal (or developer account) with a test contact pipeline
- Logging access (any one is sufficient):
  - App logs showing inbound lead received timestamp + outbound SMS queued/sent timestamp, OR
  - SMS provider message log timestamps, OR
  - Database record timestamps for inbound lead + outbound message

**Time source rule:** Use one consistent time source for all measurements (e.g., computer clock + screenshots). Record times in ISO format.

## 2) Evidence collection method (auditable)
For each test, record these timestamps:
- T0 = lead submitted (form submitted / webhook POST made / HubSpot created)
- T1 = product acknowledges lead received (log entry or webhook response time) — optional if not available
- T2 = first SMS sent timestamp (provider log or app log)

Compute: **Δ = T2 − T0**. Pass if Δ < 60s.

Store evidence for each test row:
- Screenshot of submission confirmation OR webhook request log
- Screenshot/export of outbound SMS log with timestamp
- Message transcript (copy/paste)

## 3) Deterministic fail-safe qualification flow (LLM down / timeout)
Trigger conditions:
- LLM API error OR timeout > 8 seconds OR invalid response schema.

Behavior:
1) **Immediately send first SMS (no LLM required):**
   - “Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out — quick question so I can help: what service do you need? (Reply 1-3) 1) Repair 2) Install 3) Quote/Other”
2) If reply contains STOP keywords → handle STOP compliance (see test cases).
3) If no response in 3 minutes → send one follow-up:
   - “Just checking — which one fits best: 1 Repair, 2 Install, 3 Quote/Other?”
4) After reply, ask two deterministic questions (one at a time):
   - Q2: “What’s your address or ZIP code?”
   - Q3: “When would you like us to come out? (A) ASAP (B) This week (C) Next week”
5) Booking step:
   - If calendar link available: “Great — here’s the fastest way to book: {{calendar_link}}. If you prefer, reply with two times that work.”
   - If calendar link failure detected: “Our booking link is having trouble. Reply with 2 time windows that work and we’ll confirm by text.”
6) Escalation:
   - If user asks complex question or provides unclear answers twice: “Got it — I’m looping in a human to help. What’s the best time to call you?”

Hard rules:
- First SMS must be sent even if LLM is down.
- Never hallucinate pricing; use safe language (“estimate”, “confirm details”).
- Always include business identification in first message.

## 4) Test matrix (minimum set)
Run each scenario across sources as noted. Target: **20 total trials** (mix across sources); ensure at least 5 per source.

### Lead Source A: Generic webhook JSON
**A1 Happy path (valid phone)**
- Input: POST JSON with name, phone, service
- Expect: first SMS <60s; qualification proceeds; CRM note created/updated.

**A2 Missing phone**
- Input: omit phone
- Expect: no SMS attempt; lead stored; alert/flag “missing phone”; (optional) email to ops.

**A3 Invalid phone**
- Input: phone = “123” or non-E.164
- Expect: validation error; no SMS; lead flagged; no repeated retries.

**A4 Webhook retries (idempotency)**
- Send same payload 3x with same external_id
- Expect: dedupe; only one conversation started; CRM note updated once.

### Lead Source B: Jotform
**B1 Happy path**
- Submit form with valid phone
- Expect: <60s first SMS; data mapping correct.

**B2 Duplicate lead (user submits twice)**
- Submit same phone twice within 2 minutes
- Expect: second submission deduped or appended as same thread; no double booking spam.

### Lead Source C: HubSpot
**C1 Create/update contact triggers flow**
- Create contact with phone + lifecycle stage
- Expect: first SMS <60s; HubSpot note logged with transcript.

**C2 CRM note formatting**
- Expect note includes:
  - Lead source
  - First response timestamp Δ
  - Answers to Q1-Q3
  - Booking status (booked/link sent/escalated)
  - STOP status (if applicable)

## 5) Universal edge-case scenarios (run at least once each; any source)
1) **STOP**
- User replies: “STOP”
- Expect: immediate confirmation (carrier-compliant), suppression of future messages, log STOP event.

2) **HELP**
- User replies: “HELP”
- Expect: help text including business name + support email agent_bob_replit+lead-copilot@agentmail.to; no qualification questions until user continues.

3) **After-hours routing**
- Set “after-hours” window (e.g., 6pm–8am). Submit lead during after-hours.
- Expect: first SMS acknowledges timing (“We’ll follow up at X”), offers booking link if available; escalation queued for next business day.

4) **Multiple concurrent leads**
- Submit 5 leads within 30 seconds.
- Expect: all receive first SMS <60s; no cross-talk (messages mapped to correct lead).

5) **Calendar link failure**
- Simulate calendar URL timeout/404.
- Expect: fallback message asking for 2 time windows; no dead link loops.

6) **LLM failure / timeout**
- Force LLM error.
- Expect: deterministic flow engages; first SMS still <60s.

## 6) Results capture table (paste into sheet)
Columns:
- Test ID
- Source (Webhook/Jotform/HubSpot)
- Scenario
- Payload/form/contact used
- T0 (submit)
- T2 (first SMS sent)
- Δ seconds
- Pass/Fail (<60s)
- Transcript link/text
- Notes / bug link

## 7) Bug log template (prioritize by churn risk)
Fields:
- Bug ID
- Severity (Blocker/Critical/Major/Minor)
- Scenario/Test ID
- Steps to reproduce
- Expected vs Actual
- Evidence (screenshots/log links)
- Suspected cause
- Suggested fix

Severity guidance:
- Blocker: no SMS sent, STOP non-compliant, wrong recipient, >60s consistently
- Critical: duplicates spam, calendar failure causes dead-end, CRM notes missing
- Major: after-hours messaging wrong, occasional >60s spikes
- Minor: formatting/typos

## 8) Pass/Fail gates for pilot readiness
Pilot-ready if:
- 95%+ of tests have Δ < 60s; no single source consistently breaches.
- STOP and HELP behave correctly and suppress future messaging.
- Missing/invalid phone never triggers outbound SMS attempts.
- Dedupe/idempotency prevents duplicate conversations on retries.
- Deterministic fallback works when LLM fails.
- HubSpot note formatting is readable and includes timestamps + outcomes.

## 9) Known likely fixes (pre-triage list)
- Add strict phone normalization (E.164) and validation before enqueue.
- Implement idempotency key: external_id + source + phone; store hash to dedupe for 10–30 minutes.
- Queue first SMS as a separate step from LLM qualification (LLM must never block first message).
- Calendar failure detection (HTTP status, timeout) → fallback request for time windows.
- CRM note builder: consistent markdown with headings + timestamps + transcript snippet.

---
If you want me to run this end-to-end, I need the actual webhook endpoint, and access to a free Jotform form + free HubSpot portal wired to that endpoint. Once available, I’ll fill the Results table with real timestamps and produce a prioritized bug list with recommended fixes.
