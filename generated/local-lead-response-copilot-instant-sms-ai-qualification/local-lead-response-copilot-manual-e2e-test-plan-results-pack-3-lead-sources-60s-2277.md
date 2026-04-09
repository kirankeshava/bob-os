# Local Lead Response Copilot — Manual E2E Test Plan + Results Pack (3 Lead Sources, <60s KPI, Fail-safe Behaviors)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:35:07.465Z

---

# Local Lead Response Copilot — Manual E2E QA Pack (Pilot-Ready)

**Goal:** Protect early agency/customer reputation by proving **<60s first response** and safe behavior across failure modes, without building automation.

**Product legitimacy references (for any external comms):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

---
## 1) Scope & Lead Sources Covered
We test 3 inbound sources end-to-end:
1) **Generic Webhook JSON** (any ads/forms tool that can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM)

For each source we validate: first SMS latency, qualification flow, booking/escalation behavior, and CRM logging.

---
## 2) KPI: “First Response <60s” Verification Method
**Definition:** Time from **lead-created event** (form submit / webhook received timestamp) to **first outbound SMS sent timestamp**.

**Required evidence per trial:**
- T0 = lead submission time (Jotform submission time, HubSpot create time, or webhook request time)
- T1 = first SMS send time (provider log timestamp) OR app event log timestamp (if provider logs unavailable)
- Latency = T1 - T0 (seconds)

**Pass/Fail:**
- PASS: 95% of trials under **60s**, no trial over **120s** unless there is an upstream outage (documented).
- FAIL: Any systemic delay >60s, or message queueing without visibility.

**Sample size (pilot):**
- Minimum **20 total trials** across 3 sources (recommended: 10 Jotform, 5 Webhook JSON, 5 HubSpot)

**How to record quickly:** Use a results table (below) + screenshots of provider log rows for at least 5 representative trials.

---
## 3) Pre-flight Setup Checklist (Operator)
- Confirm environment: staging vs production
- Confirm sending number is configured and can send SMS
- Confirm opt-out keywords are enabled: **STOP**, **HELP**
- Confirm after-hours window configured (e.g., 6pm–8am local + weekends)
- Confirm calendar/booking link configured (or intentionally broken for calendar-failure test)
- Confirm CRM writeback enabled for HubSpot (notes + lead status)

---
## 4) Canonical Lead Data Contract (Used Across Sources)
**Required fields (happy path):**
- full_name
- phone (E.164 preferred)
- service_type (optional but recommended)
- zip (optional)
- source (e.g., "jotform", "webhook", "hubspot")

**Phone validation rules (expected):**
- Accept valid US numbers; normalize to E.164
- Reject clearly invalid inputs (too short, letters)
- If missing/invalid: do **NOT** send SMS; create CRM note + optionally email internal alert

---
## 5) Deterministic Safe-Mode (LLM Failure Fallback)
**Trigger safe-mode when:** LLM returns error, times out (e.g., >5s), or returns non-parseable output.

**Safe-mode objective:** Collect minimum qualification info + route to booking or human.

### Safe-mode SMS Script (exact copy)
**Message 1 (immediate):**
> “Hi {first_name} — thanks for reaching out to {business_name}. Quick question so I can help: what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other.”

**If Reply = 1/2/3/4:**
> “Got it. What’s your address or ZIP code?”

**Then:**
> “Thanks. When would you like service? Reply 1) ASAP 2) This week 3) Just researching.”

**Then booking/escalation:**
- If calendar link healthy:
  > “Perfect — here’s the fastest way to get scheduled: {calendar_link}. If you prefer, reply with 2 times that work.”
- If calendar link fails/unavailable:
  > “Scheduling link is temporarily down — reply with 2 times that work and we’ll confirm ASAP.”

**Escalation rule:** If user replies but we cannot progress after 2 questions, create **high-priority CRM task** and send:
> “Thanks — a specialist will text/call you shortly to confirm details.”

### STOP/HELP compliance (expected)
- If inbound contains **STOP** (or variants): immediately confirm opt-out:
  > “You’re opted out and will no longer receive messages. Reply START to resubscribe.”
- If inbound contains **HELP**:
  > “Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to.”

---
## 6) Test Cases (Steps + Expected Results)

### A) Happy Path (All sources)
**Steps:** Submit lead with valid phone + name.
**Expected:** First SMS within <60s; qualification begins; CRM note created with transcript.

### B) Missing phone
**Steps:** Submit lead without phone.
**Expected:** No SMS attempt; CRM note “Missing phone”; lead flagged “Needs follow-up”; optional email alert.

### C) Invalid phone
**Steps:** Phone = “123”, or “abc1234567”.
**Expected:** No SMS; validation error logged; CRM note.

### D) STOP
**Steps:** After first SMS, reply “STOP”.
**Expected:** Immediate opt-out confirmation; no further outbound texts for that phone; CRM note “Opted out”.

### E) HELP
**Steps:** Reply “HELP”.
**Expected:** Help message includes opt-out instruction + support email.

### F) After-hours
**Steps:** Submit lead during configured after-hours window.
**Expected:** Either (a) still sends immediate acknowledgement with expectations, or (b) holds with documented policy. Must not promise immediate human response if none.

Suggested after-hours auto-reply copy:
> “Thanks — we’re currently closed. We’ll follow up first thing in the morning. If urgent, reply URGENT.”

### G) Multiple concurrent leads
**Steps:** Submit 5 leads within 10 seconds.
**Expected:** Each lead gets its own first SMS <60s; no cross-talk; no queue stall.

### H) Calendar link failure
**Steps:** Break calendar link (invalid URL) and submit lead.
**Expected:** System detects failure (or fails gracefully) and falls back to “reply with 2 times” message; creates CRM task.

### I) Webhook retries
**Steps:** Send same webhook payload with same idempotency key 3 times.
**Expected:** Only one outbound SMS; subsequent retries logged as duplicates.

### J) Duplicate leads
**Steps:** Submit same phone + name twice within 5 minutes.
**Expected:** Dedupe rules prevent double texting OR second event attaches to existing thread with no duplicate intro message (policy must be consistent).

### K) HubSpot note formatting
**Steps:** Drive a full conversation; verify note body.
**Expected:** Note includes: lead source, timestamps, first response latency, transcript, current status, booking link state, and opt-out state if applicable.

---
## 7) Results Capture Tables (Paste into Notion/Sheet)

### 7.1 KPI Timing Table
Columns:
- Trial ID
- Lead Source (Webhook/Jotform/HubSpot)
- Scenario (Happy/Missing phone/etc.)
- T0 Lead Submit (ISO)
- T1 First SMS Sent (ISO)
- Latency (sec)
- Pass (<60s?)
- Evidence link (screenshot/log URL)
- Notes

### 7.2 Conversation/Compliance Table
Columns:
- Trial ID
- STOP tested? (Y/N)
- HELP tested? (Y/N)
- Opt-out enforced? (Y/N)
- After-hours behavior correct? (Y/N)
- CRM note created? (Y/N)
- CRM note quality (1-5)

---
## 8) Bug/Fix Log (Prioritized)
**Severity definitions:**
- P0: Legal/compliance or spam risk (STOP not honored)
- P1: Revenue loss risk (no first SMS, >60s systemic)
- P2: UX/reputation issues (awkward copy, wrong hours)
- P3: Cosmetic

Log fields:
- Bug ID
- Severity
- Title
- Steps to reproduce
- Expected
- Actual
- Impact (churn/revenue)
- Suggested fix
- Owner
- Status

**High-risk likely bugs to watch:**
- Missing/invalid phone still triggers send attempt (P1)
- STOP not globally suppressing future sends (P0)
- Webhook retries cause double-texting (P1)
- LLM timeout causes silent failure instead of safe-mode (P1)
- Calendar failure blocks qualification (P2/P1 depending on volume)

---
## 9) Minimal Acceptance Gate for First Pilots
Ship/enable for agencies only if:
- STOP compliance passes (P0 = 0)
- First response <60s in at least 19/20 trials, none >120s without documented outage
- Dedupe/retry prevents double-texting in all retry tests
- Safe-mode triggers on forced LLM failure and still collects 2 pieces of info + routes
- HubSpot notes are readable and consistently structured
