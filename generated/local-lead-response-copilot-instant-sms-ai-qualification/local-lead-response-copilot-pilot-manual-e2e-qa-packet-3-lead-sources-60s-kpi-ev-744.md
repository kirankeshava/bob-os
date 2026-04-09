# Local Lead Response Copilot — Pilot Manual E2E QA Packet (3 Lead Sources) + <60s KPI Evidence + Deterministic Fallback

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:37:18.899Z

---

## 1) Purpose (Pilot-first, revenue-safe)
Validate that **every new lead gets the first SMS in <60 seconds** and that the system behaves safely under common failures (missing phone, STOP/HELP, LLM errors, retries, duplicates). This is designed to run manually during the **first agency pilots** without building automation.

**Legitimacy links for pilots:**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

## 2) Lead sources covered (minimum 3)
1) **Generic Webhook JSON** (represents any ad/form tool)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

## 3) KPI definition + measurement method
**KPI:** First outbound SMS must be sent **< 60 seconds** after the lead is received.

**Timestamp capture points (record all three):**
- T0 = Lead submitted time at source (Jotform submission time / webhook request time / HubSpot create time)
- T1 = Copilot “lead received” log time (app log/event)
- T2 = First SMS “sent” time (provider log) OR “queued” if that’s the only available reliable timestamp

**Compute:**
- Response latency = T2 - T0 (primary), and also T2 - T1 (system-only)

**Evidence to store:** screenshot or exported logs for T0, T1, T2 for each trial.

**Sample size target:** 20 total trials minimum across sources.
- Recommended distribution: Webhook 10, Jotform 5, HubSpot 5.

## 4) Preconditions / setup checklist
- Confirm sending number is active and message logging is accessible.
- Confirm deterministic fallback mode can be toggled or is auto-triggered when LLM errors/timeout.
- Confirm after-hours window is set (e.g., 6pm–8am local time).
- Confirm dedupe key policy exists (phone+source+time window) and is logged.
- Confirm calendar link (or booking endpoint) exists and can be intentionally broken for testing.

## 5) Deterministic fallback qualification flow (LLM-safe mode)
**Trigger conditions (any):**
- LLM request errors (5xx), times out (>8s), returns empty/invalid JSON, or confidence below threshold.

**Behavior:** Switch to deterministic Q&A; do not block first SMS.

**Message 0 (immediate, always <60s):**
“Hi {first_name}, it’s {business_name}. Got your request for {service}. Quick questions so we can book you fast—what’s the job address (city is fine)?”

**Q1: Location**
- If user provides city/zip/address: proceed
- If blank/garbled after 2 minutes: “No worries—what city are you in?” (retry once)

**Q2: Service type**
“Thanks. What do you need help with?
1) Repair  2) Install/Replace  3) Quote/Estimate  4) Other”
- If user replies with text not matching: accept free-text and proceed.

**Q3: Timeframe**
“When would you like this done?
A) Today/ASAP  B) This week  C) Next 2–4 weeks”

**Q4: Preferred contact**
“Best time for a quick call?
1) Morning  2) Afternoon  3) Evening”

**Booking handoff:**
- If calendar/booking works: “Perfect—grab a time here: {calendar_link}. If you’d rather, reply with 2 times that work.”
- If calendar fails: “Our booking link is acting up—reply with 2 times that work and we’ll confirm.”

**Escalation to human:**
- If user asks complex question, expresses frustration, or message count >6 without booking: “Got it—I’m looping in a person to help. You’ll hear back shortly.” Create a task/notification.

**Compliance footers (optional depending on policy):**
- HELP: “Reply HELP for help.”
- Opt-out: “Reply STOP to opt out.”

## 6) Test cases (pass/fail criteria included)
### A) Missing phone number (all sources)
**Input:** lead payload has no phone.
**Expected:** No SMS attempted. Lead marked “needs phone” with clear internal note. Optional email alert to agent.
**Fail:** Any SMS attempt; or silent drop.

### B) Invalid phone number
**Input:** phone = “123”, “+1 (000) 000-0000”, letters, too short.
**Expected:** Validation error, no send, internal note shows invalid phone and source.

### C) STOP / HELP compliance
**Steps:** After first message, reply STOP.
**Expected:** Immediate confirmation of opt-out (or compliant behavior), no further messages to that number.
**HELP:** Reply HELP.
**Expected:** returns help/support text including agent_bob_replit+lead-copilot@agentmail.to.

### D) After-hours behavior
**Steps:** Submit lead during after-hours window.
**Expected:** Either (1) immediate SMS acknowledging after-hours + next steps, or (2) queued message at open—must match configured policy and be consistent.
**Fail:** Messages that promise immediate call when closed; or no follow-up next business day.

### E) Multiple concurrent leads
**Steps:** Fire 5 leads within 10 seconds.
**Expected:** Each lead gets its own conversation state, no cross-contamination of names/needs, and each first response <60s.

### F) Calendar link failures
**Steps:** Use a broken calendar link / force booking API error.
**Expected:** fallback message asking for 2 time options; internal alert flagged.

### G) Webhook retries
**Steps:** Send same webhook event 3 times (same event_id).
**Expected:** Only one conversation created; subsequent are ignored/logged as duplicate.

### H) Duplicate leads (same phone, short window)
**Steps:** Submit two leads from same phone within 2 minutes.
**Expected:** Dedupe merges or appends; does not send duplicate “first message” twice.

### I) HubSpot note formatting
**Steps:** Ensure lead activity is written back.
**Expected CRM note format (example):**
Title: “Lead Copilot Qualification — {contact_name}”
Body includes:
- Source: HubSpot Form/Workflow/Webhook
- First response latency: {seconds}
- Answers: Location / Service / Timeframe / Preferred time
- Booking status: booked / pending / escalated
- Opt-out status
**Fail:** unreadable blob, missing key fields, or broken markdown.

## 7) Exact payloads / inputs for repeatable tests
### Generic Webhook JSON (baseline)
Use these fields (others ignored):
{
  "event_id": "evt_001",
  "source": "webhook_test",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test@example.com",
  "service": "plumbing",
  "created_at": "2026-04-09T12:00:00Z"
}

**Invalid phone variant:** phone = "123"
**Missing phone variant:** omit phone key
**Duplicate variant:** resend same event_id

### Jotform
- Create a form with fields: First Name, Last Name, Phone, Email, Service Needed.
- Configure submission webhook to Copilot endpoint.
- Submit test responses matching the webhook payload above.

### HubSpot
- Create test contact (phone required) and trigger Copilot via workflow/webhook.
- Verify contact timeline note formatting matches Section 6I.

## 8) Results capture tables (paste into doc/spreadsheet)
**Table: KPI trials**
Columns: Trial ID | Source | Scenario | T0 | T1 | T2 | Latency T2-T0 (s) | Pass/Fail | Evidence link

**Table: Bug log**
Columns: Bug ID | Severity (Blocker/High/Med/Low) | Scenario | Steps to reproduce | Expected | Actual | Impact on churn | Suggested fix | Owner | Status

## 9) Exit criteria (what “verified” means)
- At least **20 trials** executed with stored evidence.
- **>= 95%** of trials show **T2 - T0 < 60s** (and any failures are explained by carrier outage or non-systemic issues).
- STOP prevents all future sends; HELP returns support instructions.
- Deterministic fallback successfully completes Q1–Q3 without LLM.
- HubSpot notes readable and consistent.

## 10) Known likely bugs/fixes to watch (pre-filled priorities)
1) Phone normalization/validation edge cases (E.164 formatting).
2) Dedupe key missing (event_id not persisted).
3) After-hours messaging promises the wrong behavior.
4) Concurrency: shared state leaks answers between leads.
5) Calendar failures not handled gracefully.
6) HELP message missing support email or business identifier.

---
If you want, I can convert this into a 1-page operator checklist (pre-flight + execute + evidence upload) for agencies, but this packet is already runnable for the first pilots and produces timestamped proof + a prioritized fix list.