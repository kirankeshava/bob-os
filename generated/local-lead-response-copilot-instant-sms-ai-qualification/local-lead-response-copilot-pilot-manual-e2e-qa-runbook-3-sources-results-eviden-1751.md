# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Sources) + Results Evidence Pack

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:57:42.606Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Sources) + Results Evidence Pack

Business legitimacy reference (include in any comms/screenshots):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

## 1) Goal & KPI
**Goal:** Protect reputation during early pilots by verifying speed-to-lead and safe behavior under failure conditions.
**Primary KPI:** First outbound SMS to a *valid* lead phone is sent in **< 60 seconds** from lead receipt.

### Timestamp definitions (must be recorded)
Record all times in UTC (or explicitly note timezone):
- **T0 (Lead Received):** timestamp when webhook/Jotform/HubSpot event is received by our app (server log, webhook capture log, or integration log).
- **T1 (First SMS Sent):** timestamp when SMS send is initiated (provider log) or marked “sent” by our system.
- **Δ = T1 - T0** must be < 60s for pass.
Evidence required: screenshot or copied log lines showing T0 and T1.

## 2) Lead Sources Under Test (3)
1) **Generic Webhook JSON** (simulates any ad/form tool)
2) **Jotform** (real form tool; free tier)
3) **HubSpot CRM** (real CRM; free tier/test account)

## 3) Preconditions / Configuration Checklist
- One SMS-capable sending number exists in the product (no spend by agent). Confirm message logs are accessible.
- Deterministic fallback (Safe Mode) is available as a toggle OR can be simulated by forcing LLM timeout.
- After-hours window is defined (e.g., 6pm–8am local) and routing behavior is configured.
- Calendar booking step exists (link or API). We must be able to simulate failure (bad link/timeout).

## 4) Deterministic Safe Mode (LLM failure fallback) — REQUIRED
If the LLM errors or times out (>8s), switch to deterministic questions.

### Safe Mode messaging (exact copy)
**Msg 1 (immediate):**
“Hi {first_name}, it’s {business_name}. Thanks for reaching out—quick question so I can get you the right time: what service do you need? Reply 1) Repair 2) Install 3) Quote.”

If reply = 1/2/3 (or text contains intent):
**Msg 2:**
“Got it. What’s your ZIP code?”

If ZIP looks valid (5 digits) OR user replies with city:
**Msg 3:**
“Thanks—when would you like this done? Reply 1) ASAP 2) This week 3) Just researching.”

If reply indicates ASAP/This week:
**Msg 4 (booking handoff):**
“Perfect. Here’s the booking link: {calendar_link}. If that link doesn’t work, reply ‘CALL’ and we’ll contact you shortly.”

If calendar link fails (detected) OR user says link broken:
**Msg 4b (calendar failure):**
“Sorry—our booking link is having trouble. Reply with a good time today/tomorrow and the best email, or reply ‘CALL’ to have us ring you.”

### Compliance: STOP / HELP
At any time:
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”: immediately mark as **opted out** and reply:
  “You’re unsubscribed and will no longer receive messages. Reply HELP for help.”
- If inbound contains “HELP”: reply:
  “Help: This is {business_name} scheduling. Reply STOP to opt out. Email: agent_bob_replit+lead-copilot@agentmail.to”

### Missing/invalid phone rules
- If phone missing: do **not** attempt SMS. Create internal log + CRM note: “No phone provided; cannot SMS. Request phone via email if available.”
- If phone invalid (fails E.164 or local rules): do not SMS; log invalid; attempt secondary channel if configured.

## 5) Concrete Test Payloads & Mappings
### A) Generic Webhook JSON (POST)
Use these payloads to simulate leads.

**Payload A1 (valid lead):**
{
  "source": "webhook_test",
  "lead_id": "qa-001",
  "created_at": "{ISO_TIMESTAMP}",
  "first_name": "Jamie",
  "last_name": "Lee",
  "phone": "+14155552671",
  "email": "jamie.lee@example.com",
  "service": "Water heater repair",
  "zip": "94107"
}

**Payload A2 (missing phone):**
{
  "source": "webhook_test",
  "lead_id": "qa-002",
  "created_at": "{ISO_TIMESTAMP}",
  "first_name": "Sam",
  "last_name": "Patel",
  "phone": "",
  "email": "sam.patel@example.com",
  "service": "Plumbing quote"
}

**Payload A3 (invalid phone):**
{
  "source": "webhook_test",
  "lead_id": "qa-003",
  "created_at": "{ISO_TIMESTAMP}",
  "first_name": "Taylor",
  "phone": "12345",
  "email": "taylor@example.com",
  "service": "HVAC install"
}

**Payload A4 (duplicate lead same ID):** send A1 twice with same lead_id qa-001.
Expected: second event should not send second “Msg 1”; should log “duplicate suppressed”.

**Payload A5 (retry simulation):** send A1, then resend with a header/field like "attempt":2 or same id within 30s.
Expected: idempotent behavior; no duplicate SMS.

### B) Jotform field mapping (build this form)
Create a Jotform named “Lead Copilot QA Form” with fields:
- First Name (first_name)
- Last Name (last_name)
- Phone (phone)
- Email (email)
- Service Needed (service) — dropdown
- ZIP (zip)

Expected mapping into our app:
- first_name <= Jotform First Name
- phone <= Jotform Phone (ensure country code handling)
- lead_id <= Jotform submissionID

### C) HubSpot CRM event / note formatting
We validate that our system writes a readable, consistent note.

**Expected HubSpot note format (exact):**
Title: “Lead Copilot Qualification Transcript”
Body (markdown/plain):
- Lead Source: {source}
- Lead ID: {lead_id}
- Received: {T0}
- First SMS Sent: {T1}
- Outcome: {Booked | Needs Follow-up | Opted Out | Invalid Phone | After-hours Queued}
- Transcript:
  - Outbound: “…”
  - Inbound: “…”
  - Outbound: “…”
- Tags: speed_to_lead, qa_run

Pass criteria: note is attached to the correct contact/deal, timestamps present, transcript lines ordered, and opt-out status clearly recorded.

## 6) Test Cases (Execution Steps + Expected Results)
Run at least 20 trials total across the 3 sources. Minimum distribution: Webhook 8, Jotform 6, HubSpot 6.

1) **Baseline valid lead (<60s)**
- Submit A1 (webhook) or Jotform valid.
- Record T0 and T1.
- Expected: Msg 1 sent <60s; CRM note created.

2) **Missing phone**
- Submit A2.
- Expected: no SMS; CRM note “No phone provided”; no retries.

3) **Invalid phone**
- Submit A3.
- Expected: no SMS; CRM note “Invalid phone”; no retries.

4) **STOP compliance**
- From a test phone, reply STOP after Msg 1.
- Expected: unsubscribe confirmation; no further messages to that number even if lead retriggers.

5) **HELP compliance**
- Reply HELP.
- Expected: help message includes business name and email agent_bob_replit+lead-copilot@agentmail.to.

6) **After-hours routing**
- Trigger lead during configured after-hours.
- Expected: either (a) immediate “We’ll respond at {time}” message OR (b) queued until next business hour (must be consistent and documented). No spam.

7) **Multiple concurrent leads**
- Fire 5 valid leads within 10 seconds (different lead_ids and phones).
- Expected: all get Msg 1; no cross-talk; Δ < 60s for each.

8) **Calendar link failure**
- Use a bad calendar link or simulate failure.
- Expected: system sends Msg 4b with manual scheduling fallback; creates CRM note tagged calendar_failure.

9) **Webhook retries / idempotency**
- Send A1 twice; then again after 2 minutes.
- Expected: only one initial Msg 1 per unique lead_id; later resend behavior should be configurable (default suppress duplicates).

10) **Duplicate lead same phone different IDs (dedupe heuristic)**
- Send two leads with same phone but different lead_id within 5 minutes.
- Expected (recommended): suppress second automation OR send “Are you still looking for help?” once; must not spam.

## 7) Results Capture Tables (paste evidence)
For each run, capture:
- Source | Test Case | lead_id | Phone | T0 | T1 | Δ seconds | Pass/Fail | Evidence link/screenshot | Notes

Also capture at least 3 full transcripts (including STOP/HELP).

## 8) Bug Log (prioritized)
For each issue:
- ID | Severity (P0/P1/P2) | Scenario | Steps to reproduce | Expected | Actual | Impact (churn/reputation) | Suggested fix | Owner | Status

Severity guidance:
- **P0:** STOP not honored, messages sent to invalid/missing phone, duplicate spam, >60s consistently.
- **P1:** after-hours incorrect, calendar failure no fallback, CRM notes missing transcript.
- **P2:** formatting issues, minor copy issues.

## 9) Definition of Done for Pilot QA
- 20 timestamped trials completed across 3 sources.
- ≥ 95% of valid leads meet <60s (or a documented root cause + mitigation exists).
- STOP/HELP verified with transcripts.
- Deterministic Safe Mode verified by forcing LLM failure at least 3 times.
- HubSpot notes verified on at least 6 runs with correct formatting.

(Operator note: keep this runbook internal; share only summarized results with agencies/customers.)