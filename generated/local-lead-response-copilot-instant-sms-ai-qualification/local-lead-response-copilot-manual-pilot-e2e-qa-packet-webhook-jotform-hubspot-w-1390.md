# Local Lead Response Copilot — Manual Pilot E2E QA Packet (Webhook + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug/Fix Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:43:46.753Z

---

# Local Lead Response Copilot — Manual Pilot E2E QA Packet
**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Proof/legitimacy URL to share:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
**Support/contact email:** agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal + Pass Criteria
### Goal
Validate end-to-end lead ingestion and first-response SMS across **3 lead sources** and ensure safe behavior under failure/edge cases, to protect agency reputation and reduce churn.

### Lead sources covered
1) **Generic Webhook JSON** (POST to our endpoint)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

### Pass criteria
- **KPI:** First outbound SMS (or WhatsApp, if configured) is **sent within <60 seconds** of lead submission for ≥ 95% of tests.
- **Compliance:** STOP/HELP handled correctly and immediately.
- **Fail-safe:** If LLM fails/timeout/empty, system uses deterministic question flow (below) and still produces a sane outcome (handoff/booking link/notify).
- **Data:** CRM logging is readable and consistent (strict note format).

---
## 1) Test Environment Checklist (Pre-flight)
- Confirm SMS provider connected (Twilio or equivalent).
- Confirm sending number is SMS-capable.
- Confirm working **test handset** available (can receive SMS; keep a stopwatch ready).
- Confirm business hours configuration exists (for after-hours test).
- Confirm booking/calendar link configured (even if dummy) and that “calendar down” scenario can be simulated (use a known-bad URL or temporarily remove link).
- Confirm dedupe key policy (recommended): `lead_id` if present, else `source + phone + date_bucket`.

**Evidence to capture:** screenshot or copy of settings (hours, number, booking link).

---
## 2) KPI Timing Measurement (How to prove <60s)
For each test, capture 3 timestamps:
1) **T0 Lead Submitted**
   - Webhook: timestamp from your local clock at POST click (or curl output time).
   - Jotform: submission confirmation time (or browser DevTools time).
   - HubSpot: time lead/contact created (HubSpot record timeline).
2) **T1 Outbound SMS Requested/Queued**
   - From app logs if available OR provider console message create time.
3) **T2 SMS Delivered to handset**
   - Time you see the message appear on phone.

**KPI metric:** `T1 - T0` must be **<60s** (primary). Track `T2 - T0` as secondary (carrier dependent).

### Results table (paste into ticket)
| Test ID | Source | Scenario | T0 Submit | T1 SMS Queued | T2 Delivered | T1-T0 (sec) | Pass? | Notes |
|---|---|---|---|---|---|---:|---|---|

---
## 3) Deterministic No-LLM Fallback Qualification Flow (Exact Copy)
**Trigger fallback if:** LLM returns error, times out (e.g., >5s), returns empty output, or confidence below threshold.

### Universal rules
- Always identify business and provide opt-out language.
- If user texts STOP: stop immediately.
- If after-hours: set expectation and offer booking link / next-day callback.

### Message 1 (sent immediately on lead capture)
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out — quick question so we can help fast: what service do you need? (Reply 1) Repair  2) Install/Replace  3) Quote/Other”

### Branching
- If reply == 1/2/3 OR free text:
  - **Message 2:** “Got it. What’s your address or ZIP code?”
  - **Message 3:** “How soon do you need help? Reply 1) Today  2) This week  3) Just researching”
  - **Message 4 (handoff):**
    - If business hours: “Perfect. Want to grab a time now? Here’s the booking link: {{calendar_link}} — or reply with a good time and we’ll confirm.”
    - If after-hours: “Thanks — we’re currently closed, but we’ll follow up first thing. If you want, you can book here: {{calendar_link}}.”

### STOP/HELP compliance
- If inbound == “STOP” (case-insensitive, allow phrases like “stop texts”):
  - Reply once: “You’re opted out and will no longer receive messages. Reply START to opt back in.”
  - Set `opt_out=true` and suppress all future sends.
- If inbound == “HELP”:
  - Reply: “For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

---
## 4) Source-Specific Setup + Execution

### A) Generic Webhook JSON
**Purpose:** Validate minimal integration; validate retries/dedupe.

**Required fields (recommended):**
- `lead_id` (string, stable)
- `first_name` (string)
- `last_name` (string, optional)
- `phone` (E.164 preferred, e.g., +14155552671)
- `email` (optional)
- `source` (string)
- `created_at` (ISO)
- `message` (optional)

**Test payloads (copy/paste):**
1) Valid lead
```json
{
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155552671",
  "email": "test@example.com",
  "source": "webhook",
  "created_at": "2026-04-09T12:00:00Z",
  "message": "Need a quote"
}
```
2) Missing phone
```json
{
  "lead_id": "qa-webhook-002",
  "first_name": "NoPhone",
  "source": "webhook",
  "created_at": "2026-04-09T12:00:10Z"
}
```
**Expected:** No SMS attempt; create internal/CRM note “missing phone” + alert email.

3) Invalid phone
```json
{
  "lead_id": "qa-webhook-003",
  "first_name": "BadPhone",
  "phone": "12345",
  "source": "webhook",
  "created_at": "2026-04-09T12:00:20Z"
}
```
**Expected:** No SMS send; normalize/validation error logged; internal note + alert.

4) Duplicate lead_id (dedupe)
- Re-send payload 1 with same `lead_id`.
**Expected:** No second SMS; record dedupe event.

5) Webhook retry simulation
- Send same payload as (1) but with header `X-Retry-Count: 1` (if supported) or re-send within 10 seconds.
**Expected:** Idempotent behavior (no duplicate SMS).


### B) Jotform (Real Form Tool)
**Purpose:** Validate real form submission + mapping.

**Jotform form fields required:**
- First name
- Phone (require; set formatting)
- Service needed (dropdown)
- ZIP
- Preferred time (optional)
- Hidden field: `lead_id` (generate via Jotform unique submission id if possible)

**Test execution (10 submissions):**
- 5 normal submissions (vary service + ZIP)
- 1 missing phone attempt (ensure form blocks; verify we never receive event)
- 1 invalid phone format (ensure form blocks)
- 1 after-hours submission
- 1 duplicate (resubmit same phone + same hidden lead_id if possible)
- 1 concurrency test: submit 3 forms within 30 seconds

**Expected:** Immediate SMS Message 1 within <60s; correct personalization; correct dedupe if lead_id repeats.


### C) HubSpot (CRM)
**Purpose:** Validate CRM-triggered lead source and note formatting.

**Setup:**
- Create a test pipeline or tag “QA Copilot”.
- Ensure a workflow (or webhook) triggers on new Contact or Form Submission.

**Test execution (10 leads):**
- Create/import contacts with phone (valid E.164) and confirm SMS triggers.
- Update a contact’s phone to invalid; ensure no SMS send.
- Create two contacts with same phone; ensure dedupe policy is respected and notes explain behavior.

---
## 5) Fail-safe Behavior Matrix (Must Not Embarrass Agency)
| Scenario | Expected Behavior | Evidence to capture |
|---|---|---|
| Missing phone | Do not send SMS; log error; create CRM note; alert to agent_bob_replit+lead-copilot@agentmail.to | Screenshot of note + alert email |
| Invalid phone | Do not send SMS; log validation failure; note + alert | Provider console shows no send |
| STOP | Immediate opt-out confirmation; suppress future sends | Transcript + opt_out flag |
| HELP | Provide help message + email; keep compliant language | Transcript |
| After-hours | Acknowledge closed; offer booking link; schedule follow-up next business day | Transcript + scheduled task |
| Calendar link failure | Detect 4xx/5xx or missing link; send alternate: “Reply with a time” + notify internal | Transcript + internal alert |
| Webhook retries | Idempotent: do not send duplicate SMS; log retry | Logs showing dedupe |
| Duplicate leads | Same lead_id/phone within window: no duplicate SMS; update CRM note “duplicate suppressed” | CRM note |
| Multiple concurrent leads | No queue meltdown; each lead gets first message <60s; ordering may vary but all within SLA | KPI table |
| CRM note formatting | Notes are readable, consistent, and include transcript + outcome | CRM screenshot |

---
## 6) Strict HubSpot Note Format (Paste-Ready)
**Title:** “Lead Copilot — Qualification Transcript”

**Body template:**
```
[Lead Copilot]
Source: {{source}}
Lead ID: {{lead_id}}
Submitted At (T0): {{t0}}
First Response Queued (T1): {{t1}}
First Response Delivered (T2): {{t2}}
Response SLA (T1-T0): {{sla_seconds}} sec
Opt-out Status: {{opt_out_status}}
After-hours: {{yes_no}}
Booking Outcome: {{booked/attempted/link_failed/manual_followup}}
Calendar Link Used: {{calendar_link_or_none}}

Transcript:
- OUT ({{t1}}): {{msg1}}
- IN  ({{t_in_1}}): {{reply1}}
- OUT ({{t_out_2}}): {{msg2}}
- IN  ({{t_in_2}}): {{reply2}}
- OUT ({{t_out_3}}): {{msg3}}
- IN  ({{t_in_3}}): {{reply3}}
- OUT ({{t_out_4}}): {{handoff_msg}}

Errors/Warnings:
- {{none_or_list}}
```

---
## 7) Bug/Fix Log (Smallest Fix First)
Use this format so engineering can fix fast.

| Bug ID | Severity | Source | Scenario | Steps to Reproduce | Expected | Actual | Likely Cause | Smallest Fix | Retest Cases |
|---|---|---|---|---|---|---|---|---|---|

### Known high-risk bug candidates to watch for
1) **Phone normalization**: numbers without country code failing silently.
   - Fix: normalize to E.164; if missing, infer default based on customer locale; else block + alert.
2) **STOP not global**: opt-out stored per conversation but not per phone.
   - Fix: global phone-level suppression.
3) **LLM timeout stalls**: no message sent while waiting.
   - Fix: send deterministic Message 1 immediately; LLM can enhance later.
4) **Deduping missing**: webhook retries cause double texts.
   - Fix: idempotency key on `lead_id` with TTL.
5) **Calendar link failure not handled**.
   - Fix: link health check + alternate handoff copy.
6) **HubSpot note formatting inconsistent**.
   - Fix: single function renders notes; escape newlines; cap transcript length.

---
## 8) Minimal “Test Run” Script (Operator Steps)
1) Pick a 30-minute window, open stopwatch, prepare handset.
2) Run 5 webhook tests (IDs 001–005). Fill KPI table live.
3) Run 10 Jotform submissions (including concurrency and after-hours if possible).
4) Run 10 HubSpot lead triggers.
5) For any fail, create Bug row immediately with exact timestamps.
6) Summarize: % within <60s (T1-T0), list of failures, and whether fallback triggered.

---
## 9) Reporting Summary Template (Send to agency / internal)
“Ran 25 E2E lead tests across Webhook + Jotform + HubSpot. **First-response SLA (<60s) achieved in X/Y tests** (primary metric T1-T0). STOP/HELP compliance verified. Deterministic fallback flow verified under simulated LLM failure. Noted issues: (1)… (2)… Full evidence and timestamps available. For legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 — support: agent_bob_replit+lead-copilot@agentmail.to.”
