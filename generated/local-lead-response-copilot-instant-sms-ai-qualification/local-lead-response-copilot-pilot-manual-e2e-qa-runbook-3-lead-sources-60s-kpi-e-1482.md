# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + <60s KPI Evidence + Fail-Safe Deterministic Mode

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:57:31.666Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Runbook

## Purpose
Protect first-month reputation and reduce churn by validating: (1) speed-to-lead (<60s first SMS), (2) safe qualification/booking behavior, and (3) compliant fail-safes (STOP/HELP + deterministic flow when LLM fails). This is designed to be run manually during early pilots (no automation).

**Product legitimacy link (share with agencies/customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

**Support contact:** agent_bob_replit+lead-copilot@agentmail.to

## Lead sources covered (minimum 3)
1) **Generic Webhook JSON** (any form/ads tool that can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM)

---

## Success Criteria (Gates)
### KPI Gate: First response time
- **Pass:** First outbound SMS attempt occurs **< 60 seconds** after lead received.
- **Fail:** ≥60 seconds (P0 if repeatable).

### Safety/compliance gate
- STOP immediately suppresses further messages; HELP returns help text; both logged.
- No messaging to missing/invalid phone.
- After-hours behavior matches configured policy (either “ack now + book later” or “queue until open”).

### Reliability gate
- Webhook retries don’t create duplicate conversations.
- Duplicate lead events dedupe on phone + time window.
- Calendar/booking failure triggers fallback: send booking link or request preferred times; escalate when needed.

---

## Evidence Protocol (How to prove <60s)
For every test run, record these timestamps:
1. **T0 (Lead received):**
   - Webhook: timestamp from request sent in client (Postman/curl) + server log receipt timestamp if available.
   - Jotform: submission timestamp from Jotform “Submissions” table.
   - HubSpot: contact creation time or workflow enrollment time.
2. **T1 (First SMS attempt):**
   - timestamp from SMS provider log (or app outbound message log).
3. **Δ = T1 - T0**

**Minimum sample size:** 20 total trials across the 3 sources (recommend 8 webhook, 6 Jotform, 6 HubSpot).

**Store proof:** screenshot/export of logs + results table filled below.

### Results Table (copy/paste)
| Trial # | Source | Scenario | Phone | T0 Lead Received | T1 First SMS Attempt | Δ seconds | Pass/Fail | Notes/Link to Evidence |
|---:|---|---|---|---|---|---:|---|---|

---

## Deterministic Fail-Safe Qualification Mode (LLM down/timeout)
Trigger deterministic mode when:
- LLM returns error, times out >8s, or produces empty/unsafe output.
- Downstream booking integration fails 2x.

### Deterministic state machine
**Message 0 (immediate, always within 60s):**
“Hi {{first_name}}, thanks for reaching out to {{business_name}}. I can help get you scheduled. Quick question—what service do you need? Reply with 1) Repair 2) Install 3) Quote 4) Other.”

**If user replies 1/2/3/4 (or text):**
**Q2:** “Got it. What’s your ZIP code?”

**Q3:** “When would you like service? Reply 1) ASAP 2) This week 3) Next week.”

**Q4 (booking intent):**
- If calendar link is healthy: “Perfect—grab a time here: {{calendar_link}}. If you prefer, reply with two time windows and we’ll confirm.”
- If calendar link fails: “Our scheduling link is temporarily down. Reply with two time windows (e.g., Tue 2–4pm, Wed 9–11am) and we’ll confirm by text.”

**Escalation rule:**
- If user provides time windows OR asks for human: create task “Call ASAP” and send: “Thanks—someone from our team will confirm shortly. If urgent, reply URGENT.”

**Max attempts/timeouts:**
- If no reply after 5 minutes: send one follow-up: “Just checking—what service do you need? Reply 1, 2, 3, or 4.”
- If no reply after 30 minutes: stop automation; mark as “No response.”

### STOP/HELP compliance text
- On STOP (or unsubscribe keywords): “You’re opted out and will no longer receive messages. Reply START to resubscribe.”
- On HELP: “Help: You’re receiving messages about your service request with {{business_name}}. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

---

## Test Scenarios (Run across sources)
Each scenario includes Expected Behavior + What to Record.

### 1) Missing phone number (P0)
**Setup:** Submit lead without phone.
**Expected:** No SMS sent. Lead marked “Missing phone” and routed to manual follow-up (email/task). No crashes.
**Record:** T0 + absence of T1; CRM note/task created.

### 2) Invalid phone format (P0)
Examples: “123”, “555-ABC-7890”, international without country code (if unsupported).
**Expected:** No SMS sent; validation error recorded; manual task created.

### 3) STOP + HELP keywords (P0)
**Setup:** After first SMS, reply STOP.
**Expected:** Immediate opt-out confirmation; future messages suppressed for that phone.
Then send HELP.
**Expected:** Help response; no marketing content; includes support email.

### 4) After-hours routing (P1/P0 depending on promise)
**Setup:** Force system time or set business hours outside current time.
**Expected policy A (recommended):** Still send immediate acknowledgment (<60s) + set expectation: “We’ll follow up at 8am.”
**OR policy B:** queue first message until open (only if explicitly sold that way).
**Record:** message content and timestamps.

### 5) Multiple concurrent leads (P1)
**Setup:** Submit 5 leads within 10 seconds.
**Expected:** Each gets correct first SMS; no cross-talk; no mixed names/services.

### 6) Calendar link failure (P1)
**Setup:** Use an invalid calendar URL or simulate 500.
**Expected:** System falls back to “reply with two time windows” + creates internal task.

### 7) Webhook retries (P1)
**Setup:** Send same webhook payload 3 times (same event_id) or with “retry_count”.
**Expected:** Idempotency: one conversation; subsequent retries acknowledged but do not duplicate texts.

### 8) Duplicate leads (P1)
**Setup:** Same phone submits twice within 10 minutes.
**Expected:** Dedupe rule: do not restart qualification; append note “duplicate lead within window”; optionally send: “We got your request—still a good time to chat?”

### 9) CRM note formatting (HubSpot) (P2/P1)
**Expected:** Notes include:
- Lead source, timestamp, response time Δ
- Transcript summary
- Booking status + link/time windows
- Consent/opt-out status

**Suggested HubSpot note template:**
“Lead Copilot\nSource: {{source}}\nReceived: {{T0}}\nFirst SMS: {{T1}} (Δ={{delta}}s)\nStatus: {{qualified_status}}\nService: {{service}} | ZIP: {{zip}} | Timing: {{timing}}\nBooking: {{booking_status}} {{calendar_link_if_any}}\nTranscript: {{last_5_messages}}\nCompliance: STOP={{stop_status}} HELP={{help_status}}”

---

## Concrete Test Payloads / Mappings
### A) Generic Webhook JSON (example)
POST to your inbound webhook endpoint:
```json
{
  "event_id": "evt_qa_0001",
  "source": "webhook",
  "submitted_at": "2026-04-09T15:00:00Z",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+15555550123",
    "email": "test.lead@example.com",
    "service": "AC Repair",
    "zip": "94107"
  },
  "meta": {"campaign": "qa", "adset": "qa1"}
}
```
**Expected mapping:** name/phone/email/service/zip captured; event_id used for idempotency.

### B) Jotform mapping (minimum fields)
Create a form with:
- Name
- Phone
- Email
- Service dropdown
- ZIP
Enable webhook/redirect integration to your endpoint.
**Expected:** Submission ID available for idempotency + stored in CRM note.

### C) HubSpot CRM trigger (two options)
1) New contact created with lifecycle stage = lead
2) New form submission captured by HubSpot
**Expected:** Copilot starts SMS within 60s and writes the formatted note back to the contact/timeline.

---

## Bug/Fix Log (copy/paste)
| Bug ID | Severity (P0/P1/P2) | Title | Steps to Reproduce | Expected | Actual | Evidence Link | Suggested Fix |
|---|---|---|---|---|---|---|---|

### Severity definitions
- **P0:** Compliance/legal risk, texting wrong person, spamming, broken core flow, or consistent >60s.
- **P1:** Booking/qualification reliability issues, duplicates, after-hours broken, calendar failure not handled.
- **P2:** Formatting, copy issues, edge-case polish.

---

## Operator checklist (run in <60 minutes)
1) Confirm business hours + calendar link configured.
2) Run 3 baseline trials (1 per source) and verify Δ<60s.
3) Run STOP/HELP on one number and verify suppression.
4) Run missing phone + invalid phone.
5) Run concurrency (5 leads quickly).
6) Run calendar failure.
7) Run webhook retry + duplicate lead tests.
8) Export evidence + fill bug log + summarize pass/fail.

## Summary output to hand to CEO/agency
- Results table (20 trials) with Δ seconds
- Any P0/P1 bugs + recommended fixes
- Screenshot exports proving STOP behavior and <60s response
- Confirmation deterministic mode works end-to-end
