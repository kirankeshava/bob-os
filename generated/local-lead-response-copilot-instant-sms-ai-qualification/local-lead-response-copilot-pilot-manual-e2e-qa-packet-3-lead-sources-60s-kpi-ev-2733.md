# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources) + <60s KPI Evidence + Deterministic Fail-safe Flow

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:00:32.569Z

---

# 1) Scope + Goal
Validate end-to-end lead response and qualification for **Local Lead Response Copilot** across **3 lead sources** with a measurable KPI: **first outbound SMS sent < 60 seconds** from lead creation. Also validate **fail-safe behaviors** that protect brand/compliance when the LLM, calendar, or integrations fail.

**Product legitimacy link to share with agencies/pilots:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Support contact used in customer-facing messages:** agent_bob_replit+lead-copilot@agentmail.to

## Lead Sources Under Test (minimum 3)
1) **Generic Webhook JSON** (any form/ad platform)  
2) **Jotform** (real form tool; free tier OK)  
3) **HubSpot CRM** (CRM ingestion + note logging)

# 2) Environments + Preconditions
- A functioning SMS sending number exists (Twilio or equivalent) and the app can send SMS.
- The app has either:
  - a **single inbound webhook endpoint** for lead creation, and/or
  - dedicated connectors for Jotform/HubSpot.
- Ability to view logs (app logs + SMS provider logs) for timestamp evidence.

**Time synchronization:** tester device time must be accurate (auto time). Record times in ISO format.

# 3) KPI Definition + Evidence Capture
## KPI
**First Response Time (FRT)** = timestamp of lead creation event received by our system → timestamp first outbound SMS is sent (provider accepted) or delivered.

**Pass threshold:** FRT ≤ 60 seconds for ≥ 95% of trials.  
**Hard fail:** Any trial with FRT > 120 seconds or no first SMS for a valid lead.

## Evidence required per trial
- Lead source (Webhook / Jotform / HubSpot)
- Lead unique key (lead_id / email / phone)
- Timestamp A: when lead submitted (source time) OR when webhook received (server time)
- Timestamp B: when first SMS send was initiated (app log) and/or provider accepted (Twilio message SID time)
- FRT in seconds
- Transcript of messages exchanged (esp. STOP/HELP)
- Outcome: Qualified? Booked? Escalated?

## Results Table Template (copy/paste)
| Trial # | Source | Lead ID | Phone input | Valid? | A: Lead time | B: First SMS time | FRT(s) | Scenario tag | Expected | Actual | Pass/Fail | Notes |
|---|---|---|---|---|---|---|---:|---|---|---|---|---|

Scenario tags: baseline, missing_phone, invalid_phone, stop, help, after_hours, concurrency, calendar_fail, webhook_retry, duplicate, crm_note_format.

# 4) Canonical Lead Payloads (Generic Webhook JSON)
## 4.1 Baseline valid payload
```json
{
  "lead_id": "web-001",
  "source": "generic_webhook",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test.lead@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "message": "Need help today",
  "timestamp": "2026-05-14T12:00:00Z"
}
```

## 4.2 Missing phone
```json
{
  "lead_id": "web-002",
  "source": "generic_webhook",
  "first_name": "NoPhone",
  "email": "nophone@example.com",
  "service": "Roof leak",
  "timestamp": "2026-05-14T12:00:00Z"
}
```

## 4.3 Invalid phone (non-E.164)
```json
{
  "lead_id": "web-003",
  "source": "generic_webhook",
  "first_name": "BadPhone",
  "phone": "555-12",
  "email": "badphone@example.com",
  "service": "AC repair",
  "timestamp": "2026-05-14T12:00:00Z"
}
```

## 4.4 Duplicate lead (same lead_id)
Resend payload from web-001 unchanged.

## 4.5 Webhook retry simulation
Send same payload with header or field:
```json
{ "lead_id": "web-004", "retry_count": 1, "phone": "+14155550124", "first_name": "Retry", "service": "Plumbing" }
```
Expected: system idempotency prevents double-texting (see §6.7).

# 5) Jotform Setup + Test Steps
## Setup
- Create a Jotform with fields: First Name, Last Name, Phone, Email, Service Needed, Zip.
- Configure Jotform integration to POST submission to our **generic webhook endpoint**.
- Map fields to payload keys above.

## Execution
Run 6 trials:
1) Baseline valid phone.
2) Missing phone (leave blank).
3) Invalid phone (e.g., “123”).
4) After-hours (submit outside business hours or set business hours temporarily to force).
5) Duplicate (resubmit same phone/email quickly).
6) Concurrency (open 3 tabs and submit within 10 seconds).

Evidence: screenshot Jotform submission time + app/SMS log time.

# 6) HubSpot CRM Setup + Test Steps
## Setup assumptions (one of two patterns)
A) HubSpot → our webhook on new contact/form submission; or  
B) Our system creates/updates HubSpot contact + logs a note.

## Required formatting standard for CRM note
Every lead interaction should create/update a note with:
- Lead source + campaign (if available)
- First response time measured (if available)
- Qualification answers
- Booking outcome / next step

**Example note (expected):**
```
[Lead Response Copilot]
Source: Jotform
Lead ID: jot-0192
Phone: +14155550123
First SMS sent: 2026-05-14T12:00:35Z (FRT: 35s)
Answers:
- Service: Water heater repair
- Timeline: Today
- Address/ZIP: 94107
Outcome: Qualified — sent booking link
Conversation transcript:
1) LRC: Hi Test — thanks for reaching out...
2) Lead: Today
...
Support: agent_bob_replit+lead-copilot@agentmail.to
```

## Execution (HubSpot)
- Trial 1–3: create 3 contacts (valid phone), confirm single first SMS and note creation.
- Trial 4: duplicate contact update event (same phone) should not trigger a second initial SMS within dedupe window.
- Trial 5: invalid phone should create a CRM note “Invalid phone—no SMS sent” (no attempt to text).
- Trial 6: calendar failure scenario should log “booking link unavailable—escalated”.

# 7) High-Risk Scenario Test Cases (with Expected Behavior)
## 7.1 Missing phone
**Input:** no phone.
**Expected:**
- No SMS attempted.
- Lead marked “needs phone”.
- If email exists, send a fallback email (if supported) OR create CRM note “No phone; cannot text.”
- Never error-loop or retry SMS.

## 7.2 Invalid phone
**Input:** phone not parseable or not E.164.
**Expected:**
- No SMS attempted.
- CRM note/log includes validation error.

## 7.3 STOP compliance
**Input:** lead replies “STOP”.
**Expected:**
- Immediately stop all messaging to that number.
- Confirm opt-out message (carrier/Twilio standard) if applicable.
- Persist opt-out across sources.
- Any future lead with same phone should not be texted; create CRM note “Previously opted out”.

## 7.4 HELP behavior
**Input:** lead replies “HELP”.
**Expected:** send help text including business identification and support email:
“Local Lead Response Copilot: We help route your request to the business. For help email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

## 7.5 After-hours
**Expected:**
- First SMS still sent quickly (<60s) but content acknowledges hours and sets expectation.
- Offer to schedule.

## 7.6 Multiple concurrent leads
**Expected:**
- Each lead receives correct first SMS within KPI.
- No cross-talk (answers tied to correct lead thread).

## 7.7 Calendar link failures
**Expected:**
- If booking link cannot be generated/reached, system sends alternate CTA: “Reply with best time window” and escalates to human.
- CRM note includes failure reason.

## 7.8 Webhook retries
**Expected:** idempotent processing using (lead_id) or (source + external_submission_id) or (phone + timestamp bucket). No duplicate initial SMS.

## 7.9 Duplicate leads
**Expected:** within a dedupe window (suggest 30–120 minutes), do not resend the initial greeting; optionally send: “We’re already on it—anything else to add?”

## 7.10 CRM note formatting
**Expected:** notes are readable, consistently structured, include transcript and outcome, no JSON blobs dumped raw.

# 8) Deterministic Fail-safe Qualification Flow (LLM-down Safe Mode)
Trigger safe mode when:
- LLM call errors, times out (>3–5s), returns empty, or confidence below threshold.

## 8.1 First SMS (always deterministic)
“Hi {{first_name}}, it’s the scheduling assistant for {{business_name}}. I can help fast—what service do you need? Reply with 1) {{serviceA}} 2) {{serviceB}} 3) Other.”

## 8.2 Branching rules (no LLM)
- If reply contains “1” → set service=serviceA.
- If reply contains “2” → set service=serviceB.
- Else → service=Other; ask free-text “What’s the issue?”

Next questions:
1) “How soon do you need help? Reply: 1) Today 2) This week 3) Just pricing”
2) “What ZIP code is the job at?”
3) “Great—want to book a time? Reply 1) Yes 2) Not yet”

If 1) Yes and calendar link works → send booking link.
If calendar fails → “Booking is temporarily unavailable—reply with a preferred day/time window and we’ll confirm ASAP.”

Escalation trigger:
- User expresses urgency/safety issue OR 2+ unrecognized replies OR no response after 2 nudges.
Escalation message:
“Got it—looping in a human to confirm details. If urgent, call the office directly.” (office number inserted by customer config).

STOP/HELP overrides apply at any point.

# 9) Bug/Fix Log Template (prioritized)
| ID | Severity (P0-P3) | Scenario | Steps to Reproduce | Expected | Actual | Evidence (links/logs) | Suggested Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|

**Severity guidance:**
- P0: compliance (STOP), double-texting, no response to valid lead, >120s FRT.
- P1: calendar failure not handled, wrong lead thread, CRM notes missing.
- P2: minor copy issues, edge parsing.
- P3: formatting/nice-to-have.

# 10) Known Likely Failure Points + Recommended Fixes
1) **No global dedupe key** → implement idempotency by (source, lead_id) and fallback (normalized_phone, floor(timestamp/5min)).
2) **Phone normalization** → enforce E.164 formatting and reject invalid early.
3) **STOP persistence** → store opt-out in DB keyed by normalized phone; check before any send.
4) **LLM hard dependency** → safe-mode deterministic flow above.
5) **Calendar brittleness** → detect link-generation failure and swap to “time window” capture + human escalation.
6) **Concurrency/thread mixups** → enforce per-phone conversation state + per-lead session ID.
7) **CRM notes unreadable** → implement structured note template (see §6).

# 11) How to Declare ‘Verified <60s’
After ≥20 trials across the 3 sources:
- Compute p50 and p95 FRT.
- Provide evidence references (log export, SMS provider timestamps).
- If p95 ≤ 60s → VERIFIED.
- If not, open P0 bug with top contributors (cold start, queueing, provider delays) and re-run.
