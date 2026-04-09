# Local Lead Response Copilot — Manual E2E Pilot QA Runbook (3 Lead Sources) + Results + Bug/Fix Checklist + Deterministic Fallback Spec

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:25:43.245Z

---

# Local Lead Response Copilot — Manual E2E Pilot QA Runbook
Business proof URL (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal
Validate end-to-end reliability across 3 lead sources:
1) Generic Webhook JSON
2) Jotform (real form tool)
3) HubSpot CRM (real CRM)

Primary KPI: **first outbound SMS sent within <60 seconds** of lead creation.
Secondary: safe behavior in edge cases (STOP/HELP, missing/invalid phone, after-hours), and safe fallbacks when LLM fails (deterministic flow).

## 1) Preconditions (Operator Checklist)
- Access to:
  - The product environment that receives leads and sends SMS (staging or production pilot).
  - Message logs with timestamps (Twilio console logs, app logs, or DB records).
  - A test phone that can receive SMS and send replies.
  - A second test phone (optional) for concurrency.
- Define “business hours” used by the account (e.g., 8am–6pm local).
- Define booking target (calendar link or internal booking endpoint).

### Evidence storage
Create a folder “Pilot QA Evidence” and save:
- Screenshots of lead submission timestamps (form/CRM) and first outbound SMS timestamp.
- Message transcripts for STOP/HELP tests.
- Raw webhook request bodies used.

## 2) Timing Measurement Method (<60s KPI)
Capture these timestamps in the Results table:
- T0 = Lead created time (source):
  - Webhook: request received time (server log or webhook receiver time)
  - Jotform: submission time from Jotform submission details
  - HubSpot: create time of Contact / Form submission time (HubSpot timeline)
- T1 = First outbound SMS “sent time” (Twilio message sent timestamp or app outbound log time)
Compute Δ = T1 - T0 (seconds).

Pass criterion: Δ <= 60s for 95% of trials (target), and **no trial exceeds 120s** (hard fail) unless carrier outage proven.
Sample: minimum 20 total trials across sources (recommended: 8 webhook, 6 Jotform, 6 HubSpot).

## 3) Lead Source Coverage & Test Inputs
### A) Generic Webhook JSON (copy/paste payloads)
Assumption: there is an endpoint like POST /webhooks/leads (adjust path as needed).

**A1. Valid lead**
```json
{
  "source": "webhook",
  "lead_id": "wh_001",
  "created_at": "{{now_iso}}",
  "first_name": "Taylor",
  "last_name": "Reed",
  "phone": "+14155550101",
  "email": "taylor.reed@example.com",
  "service": "Water heater repair",
  "zip": "94107",
  "notes": "No hot water since this morning"
}
```
Expected:
- SMS within 60s: greeting + 1st qualifying question.
- CRM note/log includes source=webhook and lead_id.

**A2. Missing phone**
```json
{
  "source": "webhook",
  "lead_id": "wh_002",
  "created_at": "{{now_iso}}",
  "first_name": "Jamie",
  "email": "jamie@example.com",
  "service": "Roof leak"
}
```
Expected:
- No SMS attempt.
- Record marked “needs phone” + optionally email internal alert to agent_bob_replit+lead-copilot@agentmail.to.
- No retries that will suddenly SMS later if phone appears (unless explicitly updated).

**A3. Invalid phone** (bad format)
```json
{
  "source": "webhook",
  "lead_id": "wh_003",
  "created_at": "{{now_iso}}",
  "first_name": "Morgan",
  "phone": "12345",
  "service": "HVAC tune-up"
}
```
Expected:
- Validation fail; no SMS.
- Error logged with reason “invalid_phone”.

**A4. Duplicate lead (same lead_id)**
Send A1 again with same lead_id.
Expected:
- No second SMS.
- Log “deduped” with reference to original.

**A5. Webhook retry simulation**
Send same payload with different request id header but identical lead_id and phone.
Expected:
- Still deduped (no double text).

### B) Jotform (real form tool) tests
Create a free Jotform with fields:
- First name, Last name, Phone, Email, Service needed (dropdown), Notes (paragraph)
Configure submission webhook to product endpoint.

Test cases:
- B1 Valid submission (normal)
- B2 Missing phone (leave blank)
- B3 Invalid phone (enter letters)
- B4 Duplicate (submit twice quickly with same phone + same email)
Expected:
- Same behaviors as webhook.
- First SMS <60s.

### C) HubSpot (CRM) tests
Use free HubSpot developer/test portal.
Lead entry methods:
- C1 Create contact via HubSpot form (preferred)
- C2 Create contact via API (if available)

Test cases:
- C1 Valid lead → SMS sent <60s.
- C2 Missing phone → no SMS + CRM note stating missing phone.
- C3 Duplicate contact update event → should not send again.

## 4) Mandatory Edge-Case Scenarios (All Sources Where Possible)
### 4.1 STOP compliance
Steps:
1) Trigger a valid lead so system sends first message.
2) From the test phone, reply: STOP
Expected:
- Immediate confirmation message (carrier/Twilio may handle) OR product confirms opt-out.
- All future automated messages suppressed for that number.
- Log/CRM note includes “Opted out via STOP” + timestamp.

### 4.2 HELP compliance
Reply HELP.
Expected:
- Automated response containing business identity and contact: “Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to” (or business phone if defined).

### 4.3 After-hours behavior
Set test lead timestamp or run outside business hours.
Expected:
- Either (a) immediate courtesy SMS acknowledging receipt + next-business-time follow-up, or (b) queued to send at opening.
- Must not attempt booking calls at 2am without disclosure.

### 4.4 Multiple concurrent leads
Trigger 5 leads within 30 seconds.
Expected:
- All get first SMS <60s.
- No cross-talk: each conversation tied to correct lead.

### 4.5 Calendar link failure
Simulate booking link down (use invalid URL or force 500).
Expected:
- System apologizes + offers alternative: “Reply with your preferred time window” and flags for human follow-up.
- No infinite retry loop.

## 5) Deterministic Fallback Spec (LLM Fail-Safe)
Trigger conditions (any):
- LLM API returns error/timeout (>5s) OR empty response OR parsing failure OR safety refusal.

Fallback mode behavior:
- Use a fixed question flow, no generation.
- Max 3 questions + escalation.

**Message 1 (immediate, always safe):**
“Hi {{first_name}}, this is the scheduling assistant for {{business_name}}. Thanks for reaching out about {{service}}. Quick question 1/3: what’s your address or ZIP code?”

**If user provides ZIP/address → Q2:**
“Thanks. Question 2/3: what’s the best time for a call or appointment—morning, afternoon, or evening?”

**If user provides time window → Q3:**
“Got it. Question 3/3: is this urgent (needs help today) or can it wait 1–3 days?”

**After Q3 (or if user is uncooperative):**
- If calendar is available: send booking link.
- If calendar is unavailable: “Thanks—someone will reach out shortly to confirm. If urgent, reply URGENT.”

Timeout handling:
- If no reply after 10 minutes: send 1 reminder.
- If no reply after 2 hours (during business hours): send final gentle nudge.
- Never exceed 3 outbound messages without inbound response.

STOP/HELP text must be included in at least the first or second message depending on compliance policy:
- Include footer: “Reply STOP to opt out, HELP for help.”

## 6) HubSpot CRM Note Formatting Expectations
When a lead is handled, write a single timeline note (or append consistently) with:
- Source (webhook/jotform/hubspot)
- Lead ID (if available)
- First response latency (seconds)
- Conversation transcript summary (brief)
- Booking outcome (booked link sent / booked confirmed / needs follow-up)
- Opt-out status

**Example note:**
“Lead Copilot: source=jotform; external_id=JF-12345; first_sms_latency=32s; intent=Water heater repair; Q1 ZIP=94107; Q2 time=afternoon; Q3 urgency=today; booking_link_sent=true; opted_out=false.”

## 7) Results Table (fill during execution)
Columns:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (valid/missing phone/STOP/etc.)
- T0 lead created (with timezone)
- T1 first SMS sent
- Δ seconds
- Pass/Fail
- Evidence link (screenshot/log URL)
- Notes

## 8) Pre-Pilot Bug/Fix Checklist (Prioritized)
P0 (must fix before agency rollout):
- Double-texting on retries/duplicates (dedupe by lead_id + phone + time window).
- STOP suppression not enforced globally.
- >120s first response under light load.
- Missing/invalid phone still triggers SMS attempt (carrier errors).

P1:
- After-hours messaging unclear or spammy.
- Calendar outage causes loops or dead ends.
- HubSpot notes messy/inconsistent.

P2:
- Minor formatting issues, typos, inconsistent personalization.

## 9) Report Template (what to send after running)
- Summary: total trials, pass rate, worst latency, median latency.
- Evidence: 3 representative screenshots/logs.
- Bugs found: list with severity, repro steps, suggested fix.
- Recommendation: go/no-go for next pilot onboarding.
