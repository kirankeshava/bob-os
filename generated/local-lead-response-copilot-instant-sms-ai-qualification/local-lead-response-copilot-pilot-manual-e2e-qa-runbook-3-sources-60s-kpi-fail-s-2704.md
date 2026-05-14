# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Sources, <60s KPI, Fail-safe Deterministic Mode) + Results + Bug Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:55:12.319Z

---

## 0) Context / Why this exists (pilot-stage)
This runbook is a manual (non-automated) end-to-end QA checklist designed for early agency/customer pilots of **Local Lead Response Copilot (Instant SMS + AI Qualification)**. Goal: protect reputation and reduce churn risk by proving **speed-to-lead (<60 seconds)** and by ensuring **safe failovers** when AI/LLM, SMS delivery, calendar links, or integrations fail.

Business proof/legitimacy link to share with agencies/customers during pilots:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/contact for test coordination:
- Email: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Systems under test (SUT)
### Lead sources (minimum 3)
1) **Generic Webhook JSON** (any form/ad platform that can send JSON)
2) **Jotform** (real form tool, free tier)
3) **HubSpot CRM** (real CRM; use free/developer account)

### Core behaviors validated
- First SMS response time from lead submission: **< 60 seconds**
- AI qualification via short questions OR deterministic fallback when AI fails
- Booking handoff (calendar/call booking) and graceful degradation when booking link fails
- Compliance behaviors: STOP/HELP
- Safety behaviors: missing/invalid phone, after-hours, retries, dedupe, concurrency
- CRM logging (HubSpot note formatting + idempotency)

---

## 2) KPI: “First response < 60 seconds” — measurement method
### Definition
**First response time** = time from **lead created** (form submit / webhook received / CRM lead created) to **first outbound SMS successfully queued/sent**.

### Timestamp capture points (record all)
- T0 = Lead creation time (source system timestamp: Jotform submission time / webhook request received time / HubSpot contact created time)
- T1 = Copilot ingestion time (server logs timestamp if available; otherwise use webhook request log timestamp)
- T2 = SMS queued time (provider log if available)
- T3 = SMS delivered time (if available)
- KPI is measured as: **T2 - T0** (preferred) or **T3 - T0** (secondary)

### Evidence to store (per trial)
- Screenshot or exported log line for T0 (source)
- Screenshot or log line for T2/T3 (SMS provider or application log)
- Message transcript (content not sensitive; redact phone)

### Sample size targets (pilot)
- Minimum: **20 total trials** across the 3 sources (e.g., 8 webhook, 6 Jotform, 6 HubSpot)
- Pass gate: **95% of trials under 60 seconds**; no single trial over 120 seconds without documented cause (carrier delay etc.)

---

## 3) Pre-flight checklist (run before any tests)
1) Confirm a test phone number you control (mobile) for receiving SMS.
2) Confirm sending number is configured and can send at least 1 SMS.
3) Confirm a unique test tag for this run: e.g., `QA_RUN_YYYYMMDD`.
4) Confirm after-hours window configured (for after-hours tests) OR set a temporary window.
5) Confirm booking link target configured (real or dummy) and define expected behavior if link fails.
6) Confirm CRM logging enabled for HubSpot tests.

---

## 4) Deterministic “LLM down” fallback mode (must be available)
### When to activate fallback
Activate fallback if any of the following occur:
- LLM API timeout > 5 seconds
- LLM returns error/empty response
- LLM confidence below threshold (if implemented)
- Any parsing/formatting error in LLM output

### Fallback messaging principles
- Short, friendly, explicit, and deterministic
- Collect only what’s needed to route/qualify
- Always provide a human escalation path
- Never claim a booking is confirmed unless it is

### Exact fallback question flow (copy-paste spec)
**Message 1 (immediate first response):**
“Hi {{first_name}}, thanks for reaching out about {{service}}. Quick question so we can help fast: what’s the job address (city is ok)?”

**If they answer with location:**
**Message 2:**
“Got it. What’s the best time for a quick call or appointment? Reply 1) ASAP 2) Today 3) Tomorrow 4) This week”

**If they pick a time option:**
**Message 3 (booking handoff):**
“Perfect — you can grab a time here: {{calendar_link}}. If the link doesn’t work, reply with 2 times that work for you and we’ll confirm.”

**If calendar link fails (detected by monitoring or user says it doesn’t work):**
**Message 3b (calendar failure fallback):**
“Sorry about that — the booking link is having trouble. Reply with two times that work (include day), and we’ll confirm by text.”

**If user asks for pricing immediately:**
**Message P (pricing-safe fallback):**
“Prices depend on the details, but we can get you an accurate quote fast. What’s the address/city and what’s the main issue?”

**Escalation trigger (any time):**
- User is angry/confused
- STOP/HELP messages
- Repeated non-answers
- After-hours + urgent

**Escalation message:**
“Thanks — I’m looping in a human to help. If you prefer, share the best callback time.”

### Timeouts
- If no reply after 5 minutes: send one nudge
- Nudge copy: “Just checking — what city is the job in? (So we can route you correctly.)”
- If no reply after 30 minutes: stop automated follow-up (avoid spam)

---

## 5) Test matrix (execute across 3 lead sources)
### Legend
- P0 = must pass for pilots
- P1 = important

### A) Generic Webhook JSON (P0)
**Setup:** Use any HTTP client (curl/Postman) to POST to the ingestion endpoint.

**Test A1 — Valid lead baseline (P0)**
- Input: valid E.164 phone, name, service, source
- Expected: SMS sent <60s; qualification begins; CRM note created (if enabled)

**Test A2 — Missing phone (P0)**
- Input: no phone field
- Expected: no SMS attempt; lead flagged “missing phone”; create internal alert/log entry; if email present send a single email (optional) or store for manual follow-up

**Test A3 — Invalid phone (P0)**
- Input: `555` or malformed
- Expected: no SMS; mark invalid; do not retry endlessly

**Test A4 — Duplicate lead idempotency (P0)**
- Send same payload twice with same `lead_id`
- Expected: only 1 SMS conversation; second request returns 200/202 but does not re-text

**Test A5 — Webhook retries (P0)**
- Simulate provider retry by resending same payload after 5–30 seconds
- Expected: dedupe prevents re-text; logs show “duplicate suppressed”

**Test A6 — Concurrency burst (P0)**
- Fire 5 valid leads within 60 seconds
- Expected: all receive first SMS <60s; no cross-talk; correct personalization


### B) Jotform (P0)
**Setup:** Create a Jotform with fields: First Name, Last Name, Phone, Service Needed, Zip/City, Consent checkbox.

**Test B1 — Baseline submission (P0)**
- Submit form normally
- Expected: SMS <60s; first question appropriate; source tag indicates Jotform

**Test B2 — No consent (P0 if you require consent)**
- Uncheck consent
- Expected: no SMS; lead stored for manual follow-up; compliance note logged

**Test B3 — Field mapping issues (P0)**
- Put phone in unusual format `(555) 123-4567`
- Expected: normalization to E.164 (or clear invalid handling)


### C) HubSpot CRM (P0)
**Setup:** Free/developer HubSpot portal. Define how the Copilot receives leads (workflow/webhook, form, or contact-created event).

**Test C1 — New contact created (P0)**
- Create contact with phone + service interest
- Expected: SMS <60s; contact timeline gets a note logged

**Test C2 — Duplicate contact update (P0)**
- Update same contact again or re-trigger workflow
- Expected: dedupe prevents re-text within dedupe window (define e.g., 24h or until conversation closed)

**Test C3 — CRM note formatting (P0)**
- Expected note format (example below) appears consistently and includes timestamps + transcript snippet

**Expected HubSpot note format (copy spec):**
Title: “Lead Copilot — Speed-to-Lead + Qualification Transcript”
Body:
- Source: {{source}}
- Lead ID: {{lead_id}}
- Received: {{T0}}
- First SMS queued: {{T2}} ({{delta_seconds}}s)
- Status: {{qualified/unqualified/needs_followup/stopped}}
- Key answers:
  - Location: {{location}}
  - Timing: {{timing}}
  - Job type: {{service}}
- Transcript (last 6 messages):
  - {{timestamp}} Inbound: “...”
  - {{timestamp}} Outbound: “...”


---

## 6) Compliance & safety tests (run at least once per source)
### STOP (P0)
- User replies “STOP” after first message
- Expected: immediate confirmation like “You’re opted out and will no longer receive messages.” No further outbound messages.

### HELP (P0)
- User replies “HELP”
- Expected: returns help message with business identity + contact email: agent_bob_replit+lead-copilot@agentmail.to

### After-hours routing (P0)
- Trigger lead during after-hours window
- Expected: message acknowledging hours and offering next steps:
  “Thanks — we’re currently closed. Reply with your availability and we’ll follow up first thing. If urgent, reply URGENT.”
- If URGENT: escalate to human/on-call path or mark for immediate callback.

---

## 7) Booking link failure tests (P0)
**Test:** Use an intentionally invalid calendar link OR simulate outage.
- Expected: system does not loop; offers alternative scheduling by collecting two times and escalating.

---

## 8) Results capture tables (paste into a sheet)
### Table 1 — KPI timing evidence
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (baseline/missing phone/etc.)
- T0 Lead created (timestamp)
- T2 SMS queued (timestamp)
- Delta seconds (T2-T0)
- Pass (<60s)?
- Evidence link (screenshot/log)
- Notes

### Table 2 — Transcript/compliance evidence
Columns:
- Trial ID
- Keyword tested (STOP/HELP)
- Inbound text
- Expected outbound
- Actual outbound
- Pass?
- Evidence link

---

## 9) Bug/fix log template (use during pilots)
Fields:
- Bug ID
- Date
- Severity (P0/P1/P2)
- Source (Webhook/Jotform/HubSpot)
- Scenario
- Steps to reproduce
- Expected behavior
- Actual behavior
- Impact (conversion/compliance/reputation)
- Suspected root cause
- Suggested fix
- Owner
- Status

### Prioritized “watch list” (likely churn drivers)
P0:
- SMS not sent or >60s frequently
- STOP not honored immediately
- Deduping fails causing double texting
- Missing/invalid phone causes crashes or repeated retries
- After-hours messages misleading or spammy
- Calendar link failures with no fallback
- HubSpot notes malformed or missing critical KPI delta

---

## 10) Execution sequence (1-hour pilot run)
1) Run 1 baseline trial per source (3 trials)
2) Run missing phone + invalid phone (Webhook) (2 trials)
3) Run dedupe + retry (Webhook + HubSpot) (2–4 trials)
4) Run STOP/HELP once (any source; real number) (2 trials)
5) Run after-hours scenario once (1 trial)
6) Run calendar failure scenario once (1 trial)
7) Run concurrency burst (Webhook) (5 trials)
8) Summarize results: % under 60s, list P0 bugs, confirm fallback mode works

---

## 11) Exit criteria (pilot-ready)
- Documented evidence of <60s first response in at least 20 trials with >=95% pass rate
- STOP/HELP compliant with transcripts saved
- Deterministic fallback mode demonstrated at least once (forced LLM failure) and does not block qualification
- No P0 bugs open (or P0 mitigations documented for pilot)

---

## 12) Notes for agencies/customers (if they ask about reliability)
“We measure speed-to-lead on every inbound and log the time delta to the first SMS. If our AI ever fails, we automatically fall back to a deterministic question flow so leads still get handled quickly and safely. For compliance, STOP/HELP are honored immediately and are tested during onboarding.”

(Share proof URL if needed: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4)
