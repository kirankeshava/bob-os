# Local Lead Response Copilot — Manual Pilot E2E Test Plan + Results (3 Lead Sources, <60s KPI, Deterministic Fail-safe)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:20:28.406Z

---

## Purpose
Protect reputation and reduce churn during the first month by validating end-to-end behavior (lead capture → first SMS → qualification → booking/hand-off → CRM logging) across 3 lead sources, while proving speed-to-lead (<60 seconds) and safe fallback behavior when the LLM, calendar, or downstream systems fail.

**Product/legitimacy link to share with agencies/customers:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Support/contact email:** agent_bob_replit+lead-copilot@agentmail.to

---

## Scope
### Lead sources (minimum 3)
1) **Generic Webhook JSON** (any form/ad platform that can POST JSON)  
2) **Jotform** (real form tool)  
3) **HubSpot CRM** (CRM ingestion + note/timeline formatting)

### High-risk scenarios to validate
- Missing phone
- Invalid phone (too short, non-E.164, landline if disallowed)
- STOP / HELP compliance
- After-hours routing
- Multiple concurrent leads
- Calendar link failures
- Webhook retries
- Duplicate leads (same phone/email)
- CRM note formatting (HubSpot timeline readability)

---

## KPI + Evidence Standard
### Primary KPI: First response time
**Requirement:** First outbound SMS sent **< 60 seconds** after lead receipt.

### How to measure (manual, repeatable)
For each trial, capture these timestamps in a results table:
- **T0 (Lead Received):** timestamp when webhook/form submit/CRM event is received by the app (server log, inbound request log, or integration log).
- **T1 (SMS Sent):** timestamp when SMS send request is made (provider log or app outbound log).
- **T2 (SMS Delivered) [optional]:** timestamp when provider marks delivered.

**Compute:** Δ = T1 − T0. Pass if Δ < 60s.

### Sample size target
- Minimum **20 trials total** across the three lead sources before declaring “KPI verified.”
- Include at least **5 trials** with concurrency (2–5 leads within the same minute).

### Evidence to store (screenshots or exports)
- One screenshot/export per lead source showing T0.
- One screenshot/export per lead source showing T1.
- Message transcript screenshots for STOP and HELP.
- HubSpot record timeline screenshots showing the formatted note.

---

## Preconditions / Test Data
Use realistic but test-safe identities.
- Test phone numbers (prefer provider-approved test numbers; otherwise real devices used by internal team):
  - Valid mobile: +1XXXXXXXXXX
  - Invalid: 12345, +1 (missing digits), alphabetic
  - Duplicate lead: same phone + email repeated
- Business hours assumption (configurable):
  - Mon–Fri 9:00am–5:00pm local time
  - After-hours behavior defined below

---

## Deterministic Fail-safe (LLM Down Mode)
### When to enter deterministic mode
Switch to deterministic mode for a lead if any occurs:
- LLM request times out (e.g., >8 seconds) OR errors
- LLM returns empty/invalid JSON OR fails validation
- System health flag indicates degraded AI service

### Deterministic SMS qualification flow (exact copy + branching)
**SMS #1 (immediate, always under 60s):**
“Hi {first_name}, it’s {business_name}. Thanks for reaching out—what can we help you with today? Reply with 1) Service/Repair 2) Quote/Install 3) Other”

If reply = 1:
**SMS #2:** “Got it. What’s the main issue? (Reply in one sentence)”

If reply = 2:
**SMS #2:** “Great—what are you looking to install/quote? (Reply in one sentence)”

If reply = 3:
**SMS #2:** “No problem—tell us what you need help with.”

Then (all branches):
**SMS #3:** “What’s the service address or ZIP code?”

**SMS #4:** “When would you like help? 1) ASAP 2) Next 1–2 days 3) This week”

**Escalation rule (human handoff):**
After collecting SMS #2–#4 OR if the user asks for a call/price immediately, send:
“Thanks—someone will reach out shortly to confirm details. If you prefer, book a time here: {calendar_link}”

**Timeout rule:**
If no response after 5 minutes:
“Just checking—do you still need help? Reply YES and we’ll get you scheduled.”

If no response after 60 minutes:
“Last note—reply anytime and we’ll jump on it. If urgent, call us at {business_phone}.”

### STOP / HELP compliance (must override everything)
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT” (case-insensitive):
  - Immediately mark as opted-out.
  - Reply once: “You’re opted out and will no longer receive texts. Reply HELP for help.”
  - Do **not** send further messages.
- If inbound contains “HELP”:
  - Reply: “Help: This is {business_name} lead follow-up. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to”

---

## After-hours Behavior (safe default)
If lead arrives outside business hours:
1) Still send **SMS #1 immediately** (<60s):
   “Hi {first_name}, thanks for reaching out to {business_name}. We’re currently closed, but I can grab details now and we’ll follow up first thing in the morning. What can we help with? Reply 1) Service/Repair 2) Quote/Install 3) Other”
2) Tag lead as AFTER_HOURS.
3) If user indicates emergency language (e.g., “leak”, “no heat”, “flood”, “gas”, “urgent”):
   - Send escalation: “If this is urgent, please call {business_phone}. Otherwise reply with your ZIP and we’ll schedule you ASAP.”

---

## Test Execution Overview (do this in one sitting)
### Step A — Prepare logging + timing
- Ensure app logs show inbound webhook receipt timestamps and outbound SMS send timestamps.
- Open a results table (provided below) and record each trial.

### Step B — Run lead-source trials
Perform at least:
- 8 trials via Generic Webhook JSON
- 6 trials via Jotform
- 6 trials via HubSpot
Include concurrency and duplicates.

### Step C — Run edge cases
Execute STOP/HELP, invalid/missing phone, after-hours, calendar failure, retries.

---

## Test Cases (with pass/fail)
### 1) Generic Webhook JSON — happy path
**Input:** POST JSON with name, phone, email, service, source.
**Expected:** SMS #1 sent <60s; qualification continues; booking link offered; CRM note created if configured.
**Pass if:** Δ(T1−T0) < 60s and message content matches template.

### 2) Jotform — happy path
**Input:** Submit Jotform with same fields.
**Expected:** Same as above.

### 3) HubSpot — lead created/updated
**Input:** Create contact/lead or deal (depending on integration trigger).
**Expected:** SMS #1 sent <60s; HubSpot timeline updated with clean note.

### 4) Missing phone
**Input:** Lead without phone.
**Expected:** No SMS attempt; lead flagged NEEDS_PHONE; optional email notification to business.
**Pass if:** No outbound SMS is sent; record shows reason.

### 5) Invalid phone
**Input:** Phone not parseable to E.164.
**Expected:** No SMS; lead flagged INVALID_PHONE; no repeated retries.

### 6) STOP
**Input:** User replies STOP.
**Expected:** Immediate confirmation + opt-out stored; no further texts.

### 7) HELP
**Input:** User replies HELP.
**Expected:** Help message with STOP + support email.

### 8) After-hours
**Input:** Submit lead outside defined hours.
**Expected:** Immediate closed-hours variant of SMS #1; AFTER_HOURS tag.

### 9) Multiple concurrent leads
**Input:** Submit 3–5 leads within 60 seconds.
**Expected:** Each receives correct first SMS <60s; no cross-talk; logs show correct correlation per lead.

### 10) Calendar link failure
**Input:** Simulate calendar booking link returning 404/timeout.
**Expected:** App sends alternative: “We’ll call/text to schedule” and/or offers manual time slots; no broken-link loop.

### 11) Webhook retries (idempotency)
**Input:** Send same webhook payload 3 times with same event_id.
**Expected:** Only one outbound SMS thread starts; duplicates are ignored and logged as DUPLICATE_EVENT.

### 12) Duplicate leads (same phone)
**Input:** Two separate submissions with same phone within 24h.
**Expected:** Second lead either (a) continues existing thread and updates CRM, or (b) suppresses first SMS and notifies internal—based on configured dedupe policy. Must not spam.

### 13) HubSpot note formatting
**Input:** Any qualified lead.
**Expected note format (single block, readable):**
- Source: {source}
- Lead name: {name}
- Phone: {phone}
- Intent: {service/need}
- ZIP/address: {zip}
- Timing: {ASAP/Next 1–2 days/This week}
- Conversation transcript (last 6 messages)
- Status tags: AFTER_HOURS / STOPPED / NEEDS_PHONE / AI_FALLBACK
**Pass if:** Note uses consistent labels, no raw JSON, no markdown that renders poorly.

---

## Results Capture Tables (paste into a sheet)
### Table 1 — KPI timing
Columns:
- Trial ID
- Lead Source (Webhook/Jotform/HubSpot)
- Scenario (Happy/Missing Phone/STOP/etc.)
- T0 Lead Received (timestamp)
- T1 SMS Sent (timestamp)
- Δ seconds (T1−T0)
- Pass/Fail (<60s)
- Evidence link (screenshot/log ref)
- Notes

### Table 2 — Message/content validation
Columns:
- Trial ID
- Expected template version (Normal/After-hours/Deterministic)
- Actual SMS #1 text
- Pass/Fail
- Notes

### Table 3 — HubSpot formatting check
Columns:
- Trial ID
- HubSpot object (Contact/Deal)
- Note present (Y/N)
- Fields present (Source/Intent/ZIP/Timing/Transcript/Tags)
- Readability (1–5)
- Pass/Fail

---

## Bug / Fix Log (prioritized)
For each issue found:
- Bug ID
- Severity (P0 reputational/compliance, P1 revenue loss, P2 annoyance)
- Source (Webhook/Jotform/HubSpot)
- Steps to reproduce
- Expected vs actual
- Evidence
- Suggested fix
- Owner + status

### Default P0 list to watch (stop-ship for pilots)
- STOP does not suppress future messages
- SMS #1 sent >60s consistently
- Dedupe missing causes spam on retries
- After-hours sends incorrect promises (e.g., “we’ll call now” at 2am)
- Calendar outage sends broken link without alternative

---

## What “Verified <60s” means for agencies
We can claim: “We respond in under 60 seconds” only after:
- 20 total trials recorded
- 0 failures on Δ(T1−T0) >= 60s in happy-path cases
- Any failures have documented root cause + mitigation (e.g., queue delay under load) and a re-test.

This plan is intentionally manual to protect speed to revenue while still creating defensible reliability evidence during the first pilots.