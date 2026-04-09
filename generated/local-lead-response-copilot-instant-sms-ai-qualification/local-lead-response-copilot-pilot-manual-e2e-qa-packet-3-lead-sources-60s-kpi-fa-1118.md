# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources, <60s KPI, Fail-safe Deterministic Mode) — Test Plan + Results + Bug/Fix List

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:43:41.746Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Packet

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Goal (pilot-stage):** Protect reputation with agencies by proving (1) first SMS response <60 seconds for new leads, (2) compliant STOP/HELP handling, and (3) safe, deterministic qualification when the LLM or downstream tools fail.

**Business legitimacy refs (use in customer comms):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

---

## 0) Scope & Lead Sources Covered
Run end-to-end checks for **three lead sources**:
1) **Generic Webhook JSON** (any ads/form tool posting JSON)
2) **Jotform** (real form tool)
3) **HubSpot CRM** (real CRM target)

**Out of scope (for now):** automated test harness, load testing at scale, paid monitoring. Manual evidence collection only.

---

## 1) Definitions / KPI
### Primary KPI: first-response time
**Requirement:** First outbound SMS to the lead is sent within **<60 seconds** of lead submission/arrival.

**Timestamp points (record all):**
- **T0:** Lead submitted (form submit timestamp, webhook received timestamp, or CRM record created timestamp)
- **T1:** First outbound SMS “sent” timestamp (from messaging logs / provider event / app log)
- **Δ = T1 - T0** must be **<60s**.

**Evidence required:** screenshot/export/log snippet for each run showing T0 and T1.

**Sample size target (pilot):**
- Minimum **20 total** trials across all sources.
- At least **5 trials per source**.
- At least **1 trial per edge case** listed below.

---

## 2) Preflight Checklist (5 minutes)
1. Confirm SMS sending number is configured and can send/receive.
2. Confirm opt-out keywords are configured: **STOP**, **UNSUBSCRIBE**, **CANCEL**, **END**, **QUIT**.
3. Confirm help keyword behavior: **HELP**.
4. Confirm business hours configured (example used in tests): **Mon–Fri 9am–6pm local time**.
5. Confirm calendar/booking link configuration (or booking API) is present.
6. Confirm dedupe window (recommended): **24 hours** by phone.
7. Confirm deterministic fallback mode is available (toggle or automatic on LLM error/timeout).

---

## 3) Deterministic Fallback Qualification Flow (LLM-safe mode)
Trigger fallback mode when:
- LLM returns error, timeout (e.g., >5s), empty content, or policy refusal.
- Confidence/parse failure (if app expects structured JSON and it fails).

### Fallback principles
- Ask **short**, **deterministic**, closed-ended questions.
- Stop after **3 questions** max before escalation.
- Always provide clear opt-out + help.
- Avoid collecting sensitive data.

### Fallback Script (exact messages)
**Message 1 (immediate):**
“Hi {first_name}, this is {business_name}. Thanks for reaching out—quick questions so we can help fast. Reply with the number:
1) Service needed
2) Estimate/price
3) Schedule a visit
4) Other
Reply STOP to opt out.”

**If reply = 1/2/3/4 (within 15 min):**
“Got it. What’s your ZIP code?”

**If ZIP looks invalid (not 5 digits US or configured locale):**
“Thanks—please reply with a 5-digit ZIP code (example: 90210).”

**Then:**
“Are you looking for help **today or this week**?
Reply 1) Today 2) This week 3) Not sure”

**Decisioning:**
- If business hours AND calendar link works: send booking link
  - “Perfect—book the fastest time here: {calendar_link}. If you prefer, reply with a good time window.”
- If after-hours: set expectation + capture preference
  - “Thanks—our team is currently offline. We’ll text you back when we open. What time works best tomorrow (morning/afternoon/evening)?”
- If calendar link fails: human escalation
  - “Thanks—our booking link is temporarily down. Reply with your best time window and we’ll confirm ASAP.”

**Escalation rule:**
If no valid response after **2 follow-ups** or user gives free-text confusion:
- “No problem—someone will reach out shortly. What’s the best time to call?”

### STOP/HELP deterministic behaviors
- If inbound contains STOP keywords: immediately mark opted-out and send confirmation:
  - “You’re opted out and will no longer receive texts. Reply HELP for help.”
- If inbound contains HELP: send help text:
  - “Help: You’re receiving texts because you requested info from {business_name}. Reply STOP to opt out. Contact: agent_bob_replit+lead-copilot@agentmail.to”

---

## 4) Test Matrix (Manual E2E)
Each test: capture T0, T1, Δ, transcript, and any CRM notes created.

### A) Lead Source 1 — Generic Webhook JSON
**Setup:** Identify webhook endpoint URL in product (or test endpoint).

**Base payload (valid):**
```json
{
  "source": "webhook_test",
  "lead": {
    "first_name": "Test",
    "last_name": "Lead",
    "phone": "+14155550123",
    "email": "test.lead@example.com",
    "service": "Plumbing",
    "message": "Need help with a leak"
  },
  "meta": {
    "submitted_at": "<ISO8601 timestamp>",
    "campaign": "QA_PILOT",
    "external_id": "whk-001"
  }
}
```

**Tests:**
1. **Happy path**: valid phone → first SMS <60s.
2. **Missing phone**: omit phone field → no SMS sent; system should create internal task/alert; response via email (if supported).
3. **Invalid phone**: phone=“123” → rejected; no SMS; error logged; lead not retried endlessly.
4. **Webhook retries**: send same external_id 3 times → only one conversation started; subsequent events deduped.
5. **Duplicate lead new external_id but same phone within 24h** → dedupe rules applied (either suppress or append note; no spam).
6. **Concurrency**: send 5 unique leads in <10s → all get first SMS <60s; no cross-talk.

### B) Lead Source 2 — Jotform
**Setup:** Create Jotform with fields: First name, Last name, Phone, Email, Service dropdown, Message.
**Integration:** Jotform → Webhook to product endpoint.

**Tests:**
1. Happy path (submit form) → SMS <60s.
2. Missing phone (leave blank) → submission accepted by form but product should not attempt SMS; log “missing phone.”
3. Invalid phone formatting (e.g., “(415) ABC-DEFG”) → product rejects + logs.
4. After-hours submission (submit outside hours) → immediate acknowledgement SMS allowed, but booking/qualification should follow after-hours rules.

### C) Lead Source 3 — HubSpot CRM
**Setup options:**
- HubSpot form submission creates Contact (preferred)
- Or pipeline/deal creation triggers workflow → webhook

**Tests:**
1. HubSpot new contact with phone → SMS <60s.
2. Duplicate contact update (same phone) → dedupe prevents repeat intro.
3. CRM note formatting: verify note includes:
   - Source (HubSpot)
   - Timestamp
   - First message sent time
   - Qualification answers transcript (sanitized)
   - Booking status + link or failure reason

**Expected note format (copy/paste template):**
“Lead Response Copilot Summary
- Source: HubSpot
- Lead created: {T0}
- First SMS sent: {T1} (Δ {seconds}s)
- Status: {Qualified | Unqualified | Pending | Opted-out}
- Answers:
  - Need: {answer}
  - ZIP: {zip}
  - Timing: {timing}
- Booking:
  - {Booked at … | Sent link … | Calendar failed …}
- Transcript (latest 5 messages):
  1) OUT: …
  2) IN: …
  3) OUT: …”

---

## 5) Edge Case Scenarios (Required)
Run at least once each; record evidence.
1. **STOP** inbound after first SMS → confirm opt-out; no further outbound.
2. **HELP** inbound → help message includes contact email.
3. **After-hours** lead → correct expectation setting + no aggressive follow-ups.
4. **Calendar link failure** (simulate by using invalid link) → fallback to “reply with time window,” escalate to human.
5. **LLM failure** (simulate by forcing timeout/offline) → deterministic flow engages and completes 3-question path.
6. **Webhook retry storm** (3–5 repeats) → idempotency works; no duplicate SMS.
7. **Multiple concurrent leads** → no cross-thread mixing.

---

## 6) Results Capture Table (fill during execution)
For each run:
- Run ID
- Lead source (Webhook/Jotform/HubSpot)
- Scenario
- T0 (submission/created)
- T1 (first SMS sent)
- Δ seconds
- Pass/Fail
- Evidence link (screenshot/log)
- Notes

Pass criteria: **≥95%** of trials meet <60s, and **100%** of STOP requests honored immediately.

---

## 7) Bug/Fix List (Prioritized for churn risk)
### P0 (must fix before agency rollout)
1. **STOP not honored immediately** → compliance/reputation risk.
   - Fix: keyword detection at ingress; hard block outbound; confirmation message.
2. **Duplicate SMS on webhook retries** → spam risk.
   - Fix: idempotency key (external_id) + phone+timestamp dedupe.
3. **LLM failure causes no response** → lost leads.
   - Fix: deterministic fallback auto-engages on timeout/error.

### P1 (should fix during pilot)
4. **Invalid phone causes repeated retries** → wasted ops.
   - Fix: strict E.164 validation; dead-letter queue.
5. **After-hours behavior too aggressive** → bad CX.
   - Fix: after-hours throttling + next-business-day scheduling.
6. **Calendar link outage drops booking** → lost revenue.
   - Fix: detect 4xx/5xx; switch to “time window” capture + human task.

### P2 (nice-to-have)
7. **CRM note formatting inconsistent** → agency trust issue.
   - Fix: standardized template (above) + sanitize transcript.

---

## 8) How to Use This Packet in a Pilot
1. Pick one test phone number you control (and can reply STOP/HELP from).
2. Run 5 happy-path trials per source first to establish baseline Δ.
3. Run the edge-case scenarios.
4. Export screenshots/logs into a shared folder labeled by Run ID.
5. Present summary to agency: median Δ, worst-case Δ, STOP compliance proof, fallback proof.
