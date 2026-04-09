# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Results + Bug/Fix Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:01:57.401Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Packet
Website (share to prove legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

## 0) Goal (what “done” looks like)
Validate *end-to-end* that new leads from **3 sources** receive the **first SMS in <60 seconds**, get qualified safely, and are routed/handed off correctly in high-risk scenarios.

### Lead sources covered
1) **Generic Webhook JSON** (any form/ads tool that can POST JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM)

### KPIs / acceptance
- **Speed-to-lead:** First outgoing SMS is sent within **<60s** of lead submission/webhook receipt.
- **Compliance:** STOP halts messages; HELP provides correct info.
- **Safety:** If LLM fails/timeouts, system switches to deterministic questions and still reaches a booking/hand-off outcome.
- **Correctness:** No duplicate SMS blasts on retries/duplicates; CRM notes are readable and correctly formatted.

## 1) Evidence + timing method (how to prove <60s)
Record timestamps for each trial (store screenshots/log lines if possible).

### Timestamp points to capture
- **T0 Lead submitted**
  - Jotform: form submission timestamp (Jotform Submission ID + time)
  - Webhook: terminal timestamp when POST is sent (or server receipt time)
  - HubSpot: form submission time or contact creation time
- **T1 Webhook received by Copilot** (server logs/event log)
- **T2 First SMS sent** (Twilio message log timestamp OR internal “message queued/sent” timestamp)
- **T3 First SMS delivered (optional)** (Twilio delivery status)

### KPI calculation
- Response-time KPI = T2 − T0 (primary) and T2 − T1 (secondary).
- Pass if **T2 − T0 < 60 seconds** for ≥ 19/20 trials (95%) and never exceeds 90s.

### Sample size
Minimum **20 total trials** across 3 sources:
- 8 Generic webhook
- 6 Jotform
- 6 HubSpot
Include edge cases below within those 20.

## 2) Deterministic fallback qualification mode (LLM safe mode)
Trigger deterministic mode when:
- LLM returns error, times out (e.g., >6s), rate-limits, or produces invalid JSON/tool output.
- Downstream tools (calendar/CRM write) fail twice.

### Deterministic message sequence (copy/paste spec)
**Message 1 (immediate, within <60s):**
“Hi {{first_name}}, it’s {{biz_name}}. Thanks for reaching out—can I ask 2 quick questions to get you the fastest quote?”

If YES/anything other than STOP:
**Q1:** “What service do you need? Reply with 1) Repair 2) Install 3) Estimate 4) Other”
- If 4/Other: “Briefly describe what you need.”

**Q2:** “What’s your ZIP code?”
- If invalid/empty: “No worries—what city are you in?”

**Booking/hand-off:**
- If calendar is available: “Great—here’s the fastest way to book: {{calendar_link}}. Want morning or afternoon?”
- If calendar fails/unavailable: “Our scheduling link is temporarily down. Reply with a good time window today/tomorrow and a callback number if different from this one.”

**Escalation-to-human rule:**
If user answers Q1 + Q2 OR requests to talk to a person: create a task/notification: “CALL BACK REQUEST” and send:
“Got it—someone will call you shortly. If urgent, reply ‘URGENT’.”

### Guardrails
- Never mention “AI”.
- Never ask more than 2 questions before offering booking/hand-off.
- If user is angry/confused: “Sorry about that—want a call back? Reply YES and best time.”

## 3) Test matrix (scenarios + expected results)

### A) Baseline (all sources)
**A1 Normal lead**
- Input: valid name + valid US phone + service need
- Expected: first SMS <60s; qualification begins; CRM note created; no errors.

### B) Phone validation
**B1 Missing phone**
- Input: no phone field OR blank
- Expected: no SMS attempt; create CRM note/tag “MISSING_PHONE”; (optional) email notification to agent_bob_replit+lead-copilot@agentmail.to; status visible in logs.

**B2 Invalid phone**
- Input: “12345” or “+1(000)000-0000”
- Expected: no SMS; log “INVALID_PHONE”; CRM note created; no retries that spam.

### C) Compliance
**C1 STOP**
- Action: user replies “STOP”
- Expected: immediate confirmation (if applicable) and suppression on that number; no further marketing/qualification messages.

**C2 HELP**
- Action: user replies “HELP”
- Expected: response includes business name and support email agent_bob_replit+lead-copilot@agentmail.to and opt-out instructions.

### D) After-hours behavior
**D1 After-hours lead**
- Condition: lead arrives outside configured hours
- Expected: first SMS still <60s but message is after-hours safe:
  “Thanks—our office opens at {{open_time}}. Want the first appointment tomorrow? Reply MORNING or AFTERNOON.”
- No promise of immediate call.

### E) Concurrency
**E1 Multiple concurrent leads**
- Action: submit 5 leads within 30 seconds
- Expected: all get first SMS <60s; no cross-talk (messages mapped to correct lead); CRM notes attach to correct contacts.

### F) Calendar failures
**F1 Calendar link unreachable**
- Simulate: calendar endpoint returns 500 / link missing
- Expected: fallback booking copy triggers; create internal alert “CALENDAR_DOWN”; no dead-end.

### G) Webhook retries + duplicates
**G1 Webhook retry**
- Simulate: same payload resent 3 times with same lead_id
- Expected: dedupe prevents multiple outbound first SMS; only one conversation thread.

**G2 Duplicate lead (new id but same phone within 10 min)**
- Expected: either merge or send a single “continuation” message:
  “Still looking for help with {{service}}?”
- No spamming.

### H) CRM note formatting (HubSpot)
**H1 Note formatting**
- Expected note template (exact):
  - Title: “Lead Copilot Conversation”
  - Body includes:
    - Lead source (Webhook/Jotform/HubSpot)
    - Submission fields (service/zip)
    - Conversation transcript (timestamped)
    - Qualification outcome (Qualified / Not qualified / Needs callback)
    - Booking link + whether booked
- Must be readable (new lines preserved), no JSON blobs.

## 4) Setup steps (free-tier friendly)

### Generic Webhook JSON
- Use curl/Postman to POST JSON to the Copilot inbound endpoint.
- Required test payload fields:
```json
{
  "lead_id": "test-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "Estimate",
  "zip": "94107",
  "source": "webhook"
}
```

### Jotform
- Create a simple form (Name, Phone, Email, Service dropdown, Zip).
- Configure webhook integration to Copilot endpoint.
- Ensure phone is sent in E.164 if possible; otherwise validate normalization.

### HubSpot
- Create test portal (developer or free).
- Configure: form submission OR workflow to call webhook.
- Verify writeback: contact creation/update + note creation.

## 5) Results capture table (fill during pilot)
For each trial, capture:
- Trial ID
- Source (Webhook/Jotform/HubSpot)
- Scenario (A1/B1/etc.)
- T0 submitted
- T1 received
- T2 first SMS sent
- Delta (T2−T0)
- Pass/Fail
- Notes + evidence link/screenshot

## 6) Bug/Fix log template (prioritize by churn risk)
Fields:
- Bug ID
- Severity: P0 (churn/legal), P1 (blocks booking), P2 (annoying), P3 (cosmetic)
- Scenario + Source
- Steps to reproduce
- Expected vs Actual
- Evidence (logs/screens)
- Likely cause
- Proposed fix
- Regression check (how to retest quickly)

### Default P0/P1 candidates to watch
- STOP not honored (P0)
- SMS delayed >60s repeatedly (P1)
- Duplicate messages on retry (P1)
- LLM failure causes dead-end/no handoff (P1)
- Calendar outage causes lead loss (P1)

## 7) Minimal “pilot sign-off” checklist
- ≥20 trials completed
- 95% <60s (none >90s)
- STOP/HELP verified
- After-hours verified
- Dedupe verified (retries + duplicates)
- Calendar failure fallback verified
- HubSpot note formatting verified
- Deterministic safe mode verified by forcing LLM failure at least once

## 8) Notes for customer-facing credibility
If an agency/client requests evidence of process, share:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to
- Provide redacted timestamp table proving speed-to-lead under 60 seconds.
