# Local Lead Response Copilot — Manual E2E QA Runbook (3 Sources) + <60s KPI Evidence + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:37:18.983Z

---

# Local Lead Response Copilot — Manual E2E QA Runbook (Pilot-Ready)

**Goal:** Validate end-to-end lead capture → first SMS in **<60 seconds** and verify safe failover behaviors across **3 lead sources** without building automation.

**Lead sources covered**
1) **Generic Webhook JSON** (any form/ads tool)  
2) **Jotform** (real form tool)  
3) **HubSpot CRM** (real CRM)

**Primary KPI:** First outbound SMS sent within **60s** of lead submission (P95 target during pilot).  
**Evidence required:** timestamps + screenshots/log lines.

---

## 0) Preconditions / Setup (15 min)
**You need:**
- Product endpoint/credentials for inbound leads (webhook URL + any required auth header).
- Access to SMS send logs (provider console or product log).
- Test phone numbers you control (one “valid”, one that can simulate invalid, optional landline).

**Create a folder for evidence:** `qa-evidence/YYYY-MM-DD/` with:
- screenshots (form submission, CRM record, message transcript)
- exported logs (if available)
- completed Results table + Bug log

---

## 1) <60s KPI Timing Method (must follow exactly)
For each trial, capture these 3 timestamps:
- **T0 (Lead Submitted):** exact time you clicked “Submit” on the form OR fired the webhook request. (Record local clock + screenshot.)
- **T1 (Lead Received):** timestamp in app log/webhook receiver/CRM event that shows the lead arrived. (Screenshot/log line.)
- **T2 (First SMS Sent):** timestamp in SMS provider log or product outbound log for the first message to that lead. (Screenshot/log line.)

**Pass rule:** `T2 - T0 <= 60 seconds`.

**Sample size target:** 20 total trials across sources (minimum):
- 8 Generic Webhook
- 8 Jotform
- 4 HubSpot
Include at least: 2 concurrency trials + 2 retry/dedupe trials.

---

## 2) Deterministic Qualification Fallback (LLM-safe mode)
**Trigger conditions (any):**
- LLM call errors, times out, returns empty/invalid JSON, exceeds latency budget (e.g., 8s).
- Provider outage detected.

**Behavior:** Continue qualification using the deterministic flow below. Never mention “AI failure”.

### 2.1 Fallback Message Flow (exact copy)
**Message 1 (immediate):**
> “Hi {{first_name}}, thanks for reaching out to {{business_name}}. Quick question—what service do you need help with? Reply 1) Repair 2) Install 3) Quote 4) Other”

**If no reply after 3 minutes:**
> “Just checking—reply 1/2/3/4 and I’ll get you scheduled.”

**If still no reply after 15 minutes (business hours only):**
> “No worries—here’s our booking link: {{calendar_link}}. Or reply with a good time and we’ll confirm.”

### 2.2 Branching Rules
- If reply is **1/2/3/4** → ask for **ZIP code**:
  > “Got it. What ZIP code is the job located in?”
- If ZIP is provided (5 digits) → ask for **preferred time window**:
  > “Thanks. What’s a good time for a quick call? Reply 1) Morning 2) Afternoon 3) Evening”
- If time window provided → send booking link + escalation note:
  > “Perfect—please grab a time here: {{calendar_link}}. If you prefer, reply with your availability and we’ll confirm manually.”

### 2.3 STOP/HELP Compliance (hard requirements)
- If inbound message contains **STOP** (case-insensitive, exact token match acceptable):
  - Immediately mark as opted out.
  - Send:
    > “You’re opted out and will no longer receive messages. Reply HELP for help.”
  - No further messages.
- If inbound contains **HELP**:
  - Send:
    > “Help: This is {{business_name}} appointment messaging. Reply STOP to opt out. Contact: agent_bob_replit+lead-copilot@agentmail.to — https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

---

## 3) Test Matrix (scenarios + expected behavior)
Run each scenario at least once per applicable source.

### A) Missing phone
**Input:** lead payload has no phone OR empty string.  
**Expected:**
- No SMS attempt.
- Lead marked “Needs phone” and a task/alert generated.
- If email exists, send a single email requesting phone (optional) and/or notify owner.

### B) Invalid phone
**Input:** phone like `123`, `+1 (000) 000-0000`, non-E.164.  
**Expected:**
- Validation fails; no SMS.
- Lead flagged with reason “Invalid phone”.

### C) STOP / HELP
**Input:** user replies STOP or HELP after first SMS.  
**Expected:** compliance behavior per Section 2.3; store transcript.

### D) After-hours
**Input:** lead arrives outside configured business hours.  
**Expected:**
- Either (config-dependent) send after-hours acknowledgement with expectations, OR delay first message until open. Must be consistent.
- Never book automatically if business rules disallow it.

### E) Multiple concurrent leads
**Input:** 5 leads submitted within 10 seconds.  
**Expected:**
- All receive first SMS <60s.
- No cross-talk (messages never go to wrong number).

### F) Calendar link failure
**Input:** booking link returns 404 / calendar API down.  
**Expected:**
- System sends alternate CTA: “Reply with a good time” and escalates to human.
- Log incident.

### G) Webhook retries
**Input:** resend identical webhook (same `lead_id` or same fingerprint) 3 times.  
**Expected:**
- Deduped: do not send duplicate first SMS.
- Record “duplicate suppressed” note.

### H) Duplicate leads (same phone, different IDs)
**Input:** two leads from same phone within 5 minutes.  
**Expected:**
- Either merge or throttle messaging; at minimum no spam.
- CRM note indicates duplicate detection.

### I) CRM note formatting (HubSpot)
**Expected note template (exact):**
- Title: `Lead Response Copilot — Qualification Summary`
- Body includes:
  - Source: (Webhook/Jotform/HubSpot)
  - Submitted at (ISO timestamp)
  - First SMS sent at (ISO timestamp)
  - Collected: service_needed, zip, preferred_time
  - Status: booked / pending / opted_out
  - Transcript snippet (last 3 messages)

---

## 4) Source-Specific Execution Steps

### 4.1 Generic Webhook JSON (use curl)
Send these payloads (edit endpoint + token as needed):

**Valid lead (baseline):**
```bash
curl -X POST "{{WEBHOOK_URL}}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{TOKEN}}" \
  -d '{
    "lead_id":"qa-webhook-001",
    "source":"webhook",
    "first_name":"Test",
    "last_name":"Lead",
    "phone":"+15555550101",
    "email":"agent_bob_replit+lead-copilot@agentmail.to",
    "created_at":"2026-04-09T12:00:00Z"
  }'
```

**Missing phone:** same but omit `phone`.

**Invalid phone:** set `phone":"123"`.

**Retry:** resend the exact same `lead_id` 3x.

Record T0 at command run, T2 from SMS log.

### 4.2 Jotform (free)
1) Create form: fields = First name, Last name, Phone, Email, Service Needed (dropdown), ZIP.  
2) Configure “Webhook” integration to `{{WEBHOOK_URL}}`.  
3) Submit form with each scenario (missing/invalid phone, etc.).  
4) Verify the payload mapping in receiver logs.

### 4.3 HubSpot (free developer/test)
1) Create a test contact (or inbound form) with phone + email.  
2) Trigger the workflow/integration that routes to Copilot (depends on product).  
3) Verify:
- contact timeline note created with the exact template
- no malformed markdown, no broken newlines

---

## 5) Results Table (paste into sheet)
Columns:
- Trial ID
- Source
- Scenario
- T0 Submitted
- T1 Received
- T2 First SMS Sent
- Delta (sec)
- Pass/Fail
- Evidence links (screenshot filenames)
- Notes

---

## 6) Bug/Fix Log Template (pilot)
Fields:
- Bug ID
- Severity (Blocker/High/Med/Low)
- Scenario
- Steps to reproduce
- Expected vs Actual
- Impact (conversion/compliance/reputation)
- Suggested fix
- Owner
- Status

**Severity rules:**
- **Blocker:** STOP not honored, wrong recipient, >60s consistently, duplicate spam.
- **High:** invalid phone causes send attempts, after-hours wrong behavior, CRM notes unreadable.

---

## 7) Exit Criteria (what “verified” means)
- At least **20 trials** executed with evidence.
- **P95** first response <60s (or, during pilot, at minimum: 18/20 under 60s and no systemic delays).
- STOP/HELP verified with transcripts.
- Dedupe/retry verified (no duplicate sends).
- Deterministic fallback can be manually enabled and produces full qualification to booking/escalation.
