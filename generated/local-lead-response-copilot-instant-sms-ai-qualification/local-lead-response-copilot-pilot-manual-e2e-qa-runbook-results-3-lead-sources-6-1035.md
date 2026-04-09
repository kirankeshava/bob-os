# Local Lead Response Copilot — Pilot Manual E2E QA Runbook + Results (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:05:31.217Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook + Results

Business proof URL to share with pilots/agencies: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Business contact email for pilot comms/escalations: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal + Scope (manual, revenue-friendly)
Validate end-to-end lead response across 3 sources **without building automation**.

**Lead sources covered:**
1) Generic Webhook JSON (any form/ads tool)
2) Jotform (real form tool)
3) HubSpot (CRM)

**Core KPI:** first SMS response **< 60 seconds** from lead creation/submit.

**Required scenarios:** missing phone, invalid phone, STOP/HELP, after-hours, multiple concurrent leads, calendar link failures, webhook retries, duplicate leads, CRM note formatting.

**Definition of “first response”**
Timestamp delta between:
- T0: lead submit/creation time (webhook received time OR form submit time OR CRM record create time)
- T1: first outbound SMS send time (provider log) OR first SMS delivered time (if available)

Pass if **T1 – T0 ≤ 60s** for ≥ 95% of trials in normal conditions (network OK), and never exceeds 120s.

---
## 1) Preconditions / Setup Checklist
- You have access to the product’s:
  - inbound webhook URL (for generic JSON)
  - Jotform integration endpoint (webhook receiver)
  - HubSpot private app token (or integration credentials)
  - SMS sending logs (Twilio/other) OR internal message log with timestamps
- You have a test phone number that can receive SMS (use a real device).
- Decide a test business profile (example): “Ace Plumbing” timezone America/Chicago.
- After-hours window configured (example): after 6pm–8am local.

Evidence storage (required for agency trust):
- A single folder “Pilot QA Evidence — YYYY-MM-DD” with:
  - screenshots of form submit confirmation timestamps
  - exported message logs showing timestamps
  - HubSpot record screenshots (notes/timeline)
  - completed Results table (below)

---
## 2) Deterministic (Non-LLM) Fallback Qualification Mode (Safe Mode)
**Trigger Safe Mode when:** LLM call errors, times out (>3s), returns empty/invalid JSON, or downstream tools fail.

### 2.1 SMS compliance baseline (applies in all modes)
- First message must identify business + purpose.
- Include HELP/STOP support.
- If user texts STOP: immediately confirm opt-out and suppress future messages.
- If user texts HELP: provide contact email and a simple explanation.

### 2.2 Deterministic question flow (exact copy)
**Message 1 (immediate):**
“Hi {first_name}, this is {business_name}. Thanks for reaching out—what can we help you with today? Reply with 1) New quote 2) Schedule service 3) Other. (Reply STOP to opt out, HELP for help)”

If reply = 1 (New quote):
**Q2:** “Got it. What service do you need? (e.g., water heater, drain, HVAC, roofing)”
**Q3:** “What’s your address or ZIP code?”
**Q4:** “When would you like it done? 1) ASAP 2) This week 3) Just researching”
**Book/Escalate:**
- If calendar link available: “Thanks—book a time here: {calendar_link}. Or reply with a good time window and we’ll confirm.”
- If calendar link fails/unavailable: “Thanks—our scheduling link is temporarily down. Reply with a good time window today/tomorrow and a human will confirm shortly. If urgent call {business_phone}.”

If reply = 2 (Schedule service):
**Q2:** “What issue are we coming out for?”
**Q3:** “What’s the best day/time window? (e.g., today 2–4pm)”
**Confirm:** “Thanks—someone will confirm your appointment shortly. If urgent call {business_phone}. (STOP to opt out)”

If reply = 3 (Other):
**Q2:** “Tell us a bit more about what you need.”
**Then:** route to human or continue with ZIP/time window as needed.

### 2.3 After-hours behavior
If outside business hours:
- Send immediate acknowledgement (<60s):
“Hi {first_name}, thanks for reaching out to {business_name}. We’re currently closed, but I can take details now and have someone follow up first thing at {next_open_time}. What do you need help with? (STOP to opt out)”
- Do NOT promise an exact call time unless configured.

### 2.4 STOP/HELP handlers (exact copy)
STOP received:
“You’re opted out and won’t receive more texts. If this was a mistake, reply START.”

HELP received:
“Help: This is {business_name} lead follow-up. Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to.”

---
## 3) Test Execution — 3 Lead Sources

### Source A: Generic Webhook JSON (copy/paste payloads)
**Objective:** Ensure webhook ingestion triggers SMS <60s; retries + dedupe behave.

#### A1. Happy-path payload
POST to inbound webhook URL with JSON:
{
  "source": "webhook_test",
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+1XXXXXXXXXX",
  "email": "test@example.com",
  "service": "drain cleaning",
  "created_at": "{ISO_TIMESTAMP_NOW}",
  "utm": {"campaign": "qa", "medium": "webhook"}
}
Expected:
- Message 1 sent <60s.
- Internal record created.
- No crash if optional fields missing.

#### A2. Missing phone
Same as A1 but omit phone.
Expected:
- No SMS attempt.
- Create task/flag: “Missing phone” for human follow-up.
- If email exists, optional email fallback allowed, but must not block.

#### A3. Invalid phone
phone: “1234”
Expected:
- Fail validation.
- No SMS.
- Log clearly: invalid phone + lead_id.

#### A4. Webhook retry behavior
Send A1 payload 3 times:
- same lead_id, same phone, within 2 minutes.
Expected:
- Only 1 conversation started (dedupe by lead_id and/or phone+time window).
- System returns 200 OK idempotently.

#### A5. Duplicate lead (different lead_id but same phone)
Send two leads with different lead_id but same phone within 2 minutes.
Expected:
- Either: (a) merge into existing open conversation, or (b) create second lead but do NOT spam; must send only one “Message 1” within a configured cooldown (recommended 5–15 min).

#### A6. Concurrency
Fire 5 leads rapidly (different phones) within 10 seconds.
Expected:
- No cross-talk. Each phone gets its own thread.
- All first messages <60s.


### Source B: Jotform (real form tool)
**Objective:** Ensure real-world form submit triggers SMS <60s; missing/invalid phone tested.

**Form fields to create:** First name, Last name, Phone, Email, Service Needed (dropdown), ZIP.

#### B1. Happy path
Submit form with valid E.164 phone.
Expected:
- SMS <60s.
- Collected fields appear in internal lead record.

#### B2. Missing phone (leave blank)
Expected:
- Form may allow empty; if so, ingestion should create lead but not send SMS.
- Log: missing phone.

#### B3. Invalid phone format
If Jotform validation can be bypassed (e.g., “(000)000-0000”):
Expected:
- App validates and blocks SMS send.

#### B4. After-hours
Submit form after-hours.
Expected:
- Immediate acknowledgement SMS with after-hours copy.


### Source C: HubSpot (CRM)
**Objective:** Creating/updating a contact/lead triggers SMS; notes written correctly.

#### C1. New contact created (valid phone)
Create HubSpot contact with:
- firstname=Test
- lastname=HubSpot
- phone=+1XXXXXXXXXX
- lifecycle stage/lead status set (as required)
Expected:
- SMS <60s.
- HubSpot timeline shows an engagement/note: “SMS sent: <message text>”

#### C2. CRM note formatting requirements
Expected note template (single block, readable):
“Lead Copilot Summary
- Source: HubSpot
- Created: {timestamp}
- Phone: {E.164}
- First SMS sent: {timestamp} (Δ {seconds}s)
- Qualification:
  - Intent: {quote/schedule/other}
  - Service: {value}
  - ZIP: {value}
  - Urgency: {ASAP/this week/research}
- Next step: {booked link / pending reply / escalated}
Transcript:
1) OUT: …
2) IN: …”

#### C3. Duplicate contact updates
Update the same contact twice (or import duplicate).
Expected:
- No second “Message 1” within cooldown.
- Dedupe logged.

---
## 4) Failure-mode Test Cases (apply across sources)

### STOP
From test phone, reply “STOP”.
Expected:
- Immediate opt-out confirmation.
- Suppression list updated; no more SMS on new lead from same phone unless “START”.

### HELP
Reply “HELP”.
Expected:
- Help message includes opt-out + support email agent_bob_replit+lead-copilot@agentmail.to.

### Calendar link failure
Simulate calendar down (remove link or force error).
Expected:
- User receives alternate path: “Reply with time window; human confirm.”
- No dead-end.

### LLM failure
Force safe mode (toggle config or simulate timeout).
Expected:
- Deterministic Message 1 + question flow still proceeds.
- Log indicates safe mode activated.

---
## 5) Results Table (fill during execution)
For each trial capture T0, T1, delta, and evidence.

Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (happy/missing phone/STOP/etc.)
- T0 (lead created/submit)
- T1 (first SMS sent)
- Δ seconds
- Pass/Fail
- Evidence link (screenshot/log)
- Notes

Minimum recommended sample:
- 20 total trials across sources
- at least 5 concurrency trials
- at least 3 after-hours trials

---
## 6) Bug/Fix List (prioritized for churn risk)
P0 (must-fix before charging):
- SMS sent to invalid phone or missing phone not handled (risk: carrier flags, wasted spend)
- STOP not respected across sources (risk: compliance)
- Dedupe missing causing multiple first messages (risk: spam complaints)
- After-hours copy absent (risk: poor experience)

P1:
- Calendar link failure causes dead-end
- Webhook retries create duplicate conversations
- HubSpot note formatting unreadable or missing timestamps

P2:
- Minor copy issues, field mapping inconsistencies, non-critical logging gaps

---
## 7) Verified <60s First Response — How to Claim It (Pilot-ready)
To state “<60s first response” credibly to an agency, store:
1) A CSV/export from SMS provider log showing send timestamps
2) Form submit timestamps (Jotform submissions list) / webhook request logs / HubSpot create timestamps
3) The completed Results table with Δ seconds

Claim rule:
- If ≥ 19/20 trials are ≤ 60s and worst-case ≤ 120s, you can say: “Typically under 60 seconds; verified across webhook, Jotform, and HubSpot in pilot testing.”

End of runbook.