# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (Webhook + Jotform + HubSpot) | <60s KPI Proof + Fail-safes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:53:34.847Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

Product: **Local Lead Response Copilot (Instant SMS + AI Qualification)**  
Legitimacy URL (share with agencies/customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4  
Ops contact: **agent_bob_replit+lead-copilot@agentmail.to**

## 1) Goal + KPI
**Primary KPI:** First outbound SMS to a new lead is **sent within 60 seconds** of lead receipt for each lead source.

**Success definition:** For ≥ 20 total tests across 3 sources, **p95** (or if small sample, “all but 1”) first-response time is < 60s. Any misses must have a logged cause + mitigation.

## 2) Lead Sources Under Test (3)
1) **Generic Webhook JSON** (POST to ingestion endpoint)  
2) **Jotform** (real form tool) via webhook integration to the app  
3) **HubSpot CRM** (real CRM) using “new contact” or “form submission” trigger into the app

### Minimum required fields (normalized)
- `lead_id` (string; source unique id)
- `first_name` (string)
- `last_name` (string, optional)
- `phone` (E.164 preferred, US 10-digit acceptable)
- `email` (optional)
- `service` (optional)
- `zip` (optional)
- `message` (optional)
- `source` (webhook|jotform|hubspot)
- `created_at` (source timestamp if available)

## 3) Pre-Flight Setup Checklist
Before running tests:
1. **SMS number ready** (test handset available to receive messages).
2. **After-hours window defined** (e.g., 6pm–8am local). Set current time to within business hours for baseline tests; repeat after-hours tests later.
3. **Calendar/booking handoff** configured (or a dummy booking link). If not configured, calendar failure tests still run.
4. Ensure you can observe timestamps:
   - App logs: “Lead received” timestamp
   - App logs: “SMS queued/sent” timestamp
   - Handset: message received time (screenshot acceptable)

## 4) Execution Script (Operator Run)
Run tests in this order to reduce confusion.

### 4.1 Baseline timing tests (prove <60s)
Perform 3 baseline tests per source (9 total):
- Submit a valid lead.
- Record three times: T0 (received), T1 (SMS sent/queued), T2 (handset received).
- Compute: `T1-T0` (system response time) and `T2-T0` (experienced response time).

### 4.2 Edge-case battery (must not harm reputation)
Across sources, run the following scenarios at least once each (11+ tests). The goal is “safe behavior” + correct logging.

## 5) Test Cases (Steps + Expected)

### A) Valid lead (baseline)
**Input:** Valid US mobile phone, name, optional service.
**Expected:**
- First SMS sent in <60s.
- Message content is friendly, identifies business, asks Q1.
- If LLM available: AI qualification begins.
- If LLM fails: deterministic fallback flow begins (see Section 6).
- CRM (HubSpot) gets a note within 2 minutes containing transcript + metadata.

### B) Missing phone
**Input:** phone field absent or empty.
**Expected:**
- **No SMS attempt.**
- Create CRM note/task: “Missing phone — cannot text. Request phone/email follow-up.”
- If email exists, optionally send a non-SMS fallback (only if configured). Otherwise log.
- Mark lead status = “needs_contact_info”.

### C) Invalid phone
**Input:** `phone="123"` or non-phone string.
**Expected:**
- No SMS attempt; validation error logged.
- CRM note indicates “Invalid phone provided: <raw>”.
- Lead status = “bad_phone”.

### D) STOP compliance
**Input:** Lead replies “STOP”.
**Expected:**
- Immediately stop sending messages to that number.
- Send confirmation: “You’re opted out and will no longer receive texts.”
- Add CRM note: `opt_out=true`, time, and keyword.

### E) HELP compliance
**Input:** Lead replies “HELP”.
**Expected:**
- Reply with help text including business identification and how to opt out.
- Continue flow only after help is delivered (or pause until next user message, depending on policy).

### F) After-hours behavior
**Input:** Lead submitted during after-hours.
**Expected:**
- Either (a) immediate acknowledgment + set expectation (“We’ll follow up at 8am”), OR (b) queue first outreach for opening time. Policy must be consistent.
- No aggressive back-and-forth at 2am.
- CRM note includes after-hours handling decision.

### G) Multiple concurrent leads
**Input:** Submit 5 leads within 30 seconds.
**Expected:**
- All receive first SMS within 60s (or a documented capacity limit with graceful degradation).
- No cross-talk: transcript for lead A never appears in lead B.
- CRM notes map to correct contacts.

### H) Calendar/booking link failure
**Input:** Force invalid booking link or simulate provider downtime.
**Expected:**
- Do not loop or spam.
- Offer fallback: “I’m having trouble with scheduling right now—what day/time works best?”
- Create CRM task for human follow-up.

### I) Webhook retries
**Input:** Send identical webhook payload twice with same `lead_id` (simulate retry), within 2 minutes.
**Expected:**
- Deduped: only 1 SMS conversation started.
- Second event logged as duplicate with reference to original.

### J) Duplicate leads (same phone, different lead_id)
**Input:** Two leads from different sources, same phone, within 10 minutes.
**Expected:**
- Either merge into single active conversation OR start new conversation with clear rules.
- Must not send two separate “intro” messages back-to-back.
- CRM note documents dedupe/merge decision.

### K) CRM note formatting (HubSpot)
**Input:** A full conversation including at least 3 Q/A turns.
**Expected:** A single note or timeline event formatted exactly per template in Section 7.

## 6) Deterministic Fallback Qualification Flow (No LLM)
**Trigger conditions:** LLM timeout, error, or disabled flag.

### Fallback intro (first SMS)
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—quick question so we can help faster.”

### Q1: Service category
“What do you need help with? Reply 1) Repair 2) Install 3) Quote 4) Other”
- If reply 1/2/3/4 → proceed.
- If unclear → “Got it—can you reply with a short description?” then proceed.

### Q2: Timing urgency
“How soon do you need this? Reply 1) ASAP 2) This week 3) Next 2+ weeks”

### Q3: Location
“What ZIP code is the job in?”
- Validate 5 digits; if invalid ask once more; if still invalid, proceed but mark `zip_unknown=true`.

### Q4: Booking handoff
“Want to book a quick call/appointment now? Reply YES and I’ll send times, or NO and tell me a good day/time.”
- If YES → send booking link (if available). If link fails → ask for preferred times.
- If NO → collect preferred day/time and confirm.

### Global rules (fallback)
- If user says STOP at any time → stop and confirm opt-out.
- If user says HELP → send help text.
- If after-hours and policy is “ack now, schedule later” → stop at Q1 and set expectation.

## 7) HubSpot CRM Note Format (Strict)
Create a note titled: **“Lead Copilot SMS Qualification — {{date}}”**

Body:
- **Source:** {{source}}  
- **Lead ID:** {{lead_id}}  
- **Name:** {{first_name}} {{last_name}}  
- **Phone:** {{phone}}  
- **Email:** {{email or “(none)”}}  
- **First response time:** {{T1-T0}} seconds (sent), {{T2-T0}} seconds (delivered if available)  
- **Status:** {{qualified|unqualified|needs_followup|opted_out}}  
- **Opt-out:** {{true|false}}  
- **After-hours:** {{true|false}}  
- **Booking:** {{booked|link_sent|link_failed|requested_callback}}  

**Transcript (chronological):**
1. System: <message>
2. Lead: <message>
3. System: <message>
...

**Extracted answers:**
- Service: <value>
- Urgency: <value>
- ZIP: <value>
- Preferred time: <value>

## 8) Results Capture Table (Copy/Paste)
For each test submission fill a row.

| Test # | Source | Scenario | Lead ID | Phone | T0 Lead Received | T1 SMS Sent/Queued | T2 Handset Received | T1-T0 (sec) | T2-T0 (sec) | Pass/Fail | Notes |
|---:|---|---|---|---|---|---|---|---:|---:|---|---|
| 1 | webhook | valid | | | | | | | | | |

**Evidence to attach:** handset screenshots for at least 5 baseline tests, and log excerpts showing T0/T1 for all.

## 9) Bug Log (Minimal but Actionable)
For every failure create an entry:
- ID: BUG-001
- Title: “Webhook retry creates duplicate SMS conversation”
- Severity: P0 (reputation/compliance), P1 (revenue), P2 (polish)
- Source: webhook/jotform/hubspot
- Steps to reproduce (exact payload or form submission)
- Expected vs actual
- Timestamps/log excerpts
- Proposed fix (smallest change first): e.g., dedupe on (lead_id) and (phone+time window)

## 10) Known High-Risk Areas (Watch Closely)
- Phone validation + E.164 normalization
- STOP/HELP compliance and permanent opt-out storage
- Deduplication logic (retries vs true new lead)
- Concurrency (mixing transcripts across sessions)
- Calendar link failure loops
- After-hours messaging policy consistency

---
If you need to share legitimacy during pilot onboarding, use: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 and route any test coordination to agent_bob_replit+lead-copilot@agentmail.to.
