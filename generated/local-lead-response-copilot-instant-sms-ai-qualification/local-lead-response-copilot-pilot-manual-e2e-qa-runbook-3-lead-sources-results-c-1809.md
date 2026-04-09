# Local Lead Response Copilot — Pilot Manual E2E QA Runbook (3 Lead Sources) + Results Capture + Bug/Fix List + Deterministic Fallback Flow

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:15:33.210Z

---

## 0) Purpose + Success Criteria
This runbook validates end-to-end lead handling for **Local Lead Response Copilot (Instant SMS + AI Qualification)** across 3 lead sources:
1) **Generic Webhook JSON** (catch-all for ads/forms)
2) **Jotform** (real form tool)
3) **HubSpot** (CRM)

Primary KPI: **First outbound SMS sent within <60 seconds** of lead submission. 
Definition: *T0 = lead submit event created at source; T1 = first SMS “sent” event in SMS provider/app logs.* Pass if **T1 − T0 ≤ 60s**.

Evidence required for credibility with agencies:
- Timestamp table (T0, T1, delta)
- Message transcript screenshots (or copied logs)
- CRM record screenshot showing note formatting and dedupe behavior

Run time target: **<60 minutes** for a full pilot check.

---
## 1) Pre-flight Checklist (5–10 minutes)
**You need:**
- Business site URL for legitimacy reference if asked: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Business contact email (for tool signups / notifications): agent_bob_replit+lead-copilot@agentmail.to
- Access to app logs (or wherever “lead received” and “SMS sent” events are recorded)
- Access to SMS transcripts (provider console or internal conversation log)
- Access to HubSpot contact/activity log for the test contact(s)

**Time sync requirement:** Ensure your computer clock is accurate (auto time). Record timezone.

**Test phone numbers:**
- Use at least 2 real mobile numbers available to the team for receiving SMS.
- Prepare 1 number that will send STOP/HELP responses back.

---
## 2) Lead Sources Setup Summary
### A) Generic Webhook JSON
Goal: confirm the system ingests a POST and immediately sends an SMS.
- Endpoint: (paste your production/test webhook endpoint here)
- Auth: (if any)

### B) Jotform
Goal: confirm real form submission triggers the system.
- Jotform form contains fields:
  - Full Name
  - Phone
  - Email
  - Service Needed (dropdown)
  - ZIP code
  - Preferred time (optional)
- Configure Jotform webhook integration to the app endpoint.

### C) HubSpot CRM
Goal: confirm lead created/updated in HubSpot triggers the system OR that the system writes notes back to HubSpot correctly (depending on integration direction).
- Required: a test contact pipeline or a tag/property that indicates “new lead.”

---
## 3) Test Data + Payloads
### A) Generic Webhook JSON — Canonical Payload
Use this as the baseline request body:
```json
{
  "source": "webhook",
  "lead_id": "qa-001",
  "created_at": "<ISO8601 timestamp>",
  "contact": {
    "full_name": "QA Test",
    "first_name": "QA",
    "last_name": "Test",
    "phone": "+14155550123",
    "email": "qa.test@example.com"
  },
  "context": {
    "business_type": "home_services",
    "service": "water heater repair",
    "zip": "94107",
    "utm_source": "qa",
    "utm_campaign": "e2e"
  }
}
```
**Variations** are listed in Section 5 (missing phone, invalid phone, duplicates, retries).

### B) Jotform Field Mapping (must be verified)
- full_name <= name field (or first + last)
- phone <= phone field (ensure country code handling)
- email <= email field
- service <= service dropdown
- zip <= zip field

**Acceptance:** submission produces a lead record in app logs with correct mapping, then triggers first SMS <60s.

### C) HubSpot Expected Note Format (CRM hygiene)
When the copilot qualifies a lead, it should write a single activity/note on the contact:
**Title:** “Lead Copilot — Qualification Summary”
**Body (plain text, consistent):**
- Source: <source>
- Received: <timestamp>
- First SMS sent: <timestamp> (delta: <seconds>)
- Lead intent: <high/medium/low>
- Service needed: <value>
- ZIP: <value>
- Best time: <value or unknown>
- Outcome: <Booked / Needs follow-up / Disqualified>
- Conversation transcript:
  - Q1: …
  - A1: …
  - Q2: …
  - A2: …

**Acceptance:** note is readable, not duplicated, and attached to the right contact.

---
## 4) KPI Measurement Method (<60s)
For each test run, capture:
- **T0 (Lead Created):** timestamp from the source system (Jotform submission time, webhook request time, HubSpot create time)
- **T1 (SMS Sent):** timestamp from SMS provider/app log event “sent” (not “delivered”).
- **Delta seconds = T1 − T0**

**Sample size target:** 20 trials total across sources:
- Webhook: 8
- Jotform: 8
- HubSpot: 4

**Pass gate:**
- 95% of trials <60s AND
- No single trial >120s without an identified transient cause and documented mitigation.

Results table (copy/paste into sheet):
| Trial | Source | Scenario | T0 | T1 | Delta(s) | Pass/Fail | Evidence link |
|------:|--------|----------|----|----|----------|-----------|---------------|

---
## 5) Required Test Cases (execute across sources where applicable)
### 5.1 Missing phone
- Payload: remove contact.phone OR blank string.
Expected:
- No SMS attempt.
- System logs a validation error.
- If CRM exists, create/update record with note “Missing phone; cannot text; needs manual follow-up.”

### 5.2 Invalid phone
- Payload phone examples: “123”, “+1999”, “(555) ABC-DEFG”.
Expected:
- No SMS attempt.
- Error is visible; lead is flagged.

### 5.3 STOP and HELP compliance
Steps:
1) Submit valid lead and receive first SMS.
2) Reply “HELP”.
3) Reply “STOP”.
4) Submit a new lead for same number.
Expected:
- HELP triggers compliant help response (who we are + how to stop + contact).
- STOP immediately suppresses further outbound texts to that number.
- New lead should NOT message the stopped number; instead log “Suppressed (STOP).”

### 5.4 After-hours routing
Define after-hours window (example): 6pm–8am local.
Steps:
- Submit lead during after-hours.
Expected:
- First SMS still sent quickly but message content acknowledges timing and offers next-slot options.
- Booking attempts (if any) should respect business hours.

### 5.5 Multiple concurrent leads
Steps:
- Submit 5 leads within 30 seconds (mix of sources).
Expected:
- All get first SMS <60s.
- No cross-talk: each conversation tied to correct phone.

### 5.6 Calendar link failures
Simulate:
- Use an invalid calendar URL OR disable calendar service.
Expected:
- System sends fallback: “We’re having trouble with scheduling—what day/time works?”
- Escalate to human notification (email/slack) if configured.

### 5.7 Webhook retries
Send the same webhook payload 3 times within 2 minutes (identical lead_id).
Expected:
- Deduped: only one outbound SMS thread.
- Log indicates duplicate ignored.

### 5.8 Duplicate leads (same phone, different lead_id)
- Submit two separate leads for same phone within 5 minutes.
Expected:
- Either (a) merge into existing conversation with a single greeting OR (b) send a short acknowledgement without repeating full intro.
- Must avoid spamming.

### 5.9 HubSpot note formatting
- After qualification, inspect the contact activity.
Expected:
- Exactly one “Qualification Summary” note per lead event (dedupe by lead_id).
- Transcript formatting readable; no JSON blobs.

---
## 6) Deterministic Fallback Flow (LLM down / timeout safe mode)
Trigger conditions:
- LLM returns error, timeout > 8 seconds, empty output, or non-compliant content.

Fallback goals:
- Keep qualification moving.
- Avoid hallucinations.
- Minimize risk and remain professional.

**Message 1 (immediate, <60s):**
“Hi {{first_name}}, thanks for reaching out to {{business_name}}. I can help get you scheduled. First—what service do you need? Reply with 1) Repair 2) Install 3) Quote 4) Other.”

If reply = 1/2/3/4:
**Message 2:**
“Got it. What’s your ZIP code?”

After ZIP:
**Message 3:**
“What’s the best time for a call/visit? Reply: 1) Morning 2) Afternoon 3) Evening.”

After time:
**Message 4 (booking attempt):**
“If you’d like, you can pick a slot here: {{calendar_link}}. If the link doesn’t work, reply with a day/time that works for you.”

Escalation rules:
- If calendar link fails OR user provides free-text time: create task/notification “Manual scheduling needed” + include transcript.
- If user asks price: respond with safe non-committal template: “Pricing depends on details. If you share a quick description (model/issue), we’ll confirm options and a range.”

Compliance inserts:
- HELP keyword: “You’re chatting with {{business_name}} lead assistant. Reply STOP to opt out. For help email agent_bob_replit+lead-copilot@agentmail.to.”
- STOP keyword: immediate confirmation + suppression.

---
## 7) Bug/Fix List (what to look for + remediation)
1) **STOP not enforced across sources** (Critical): ensure suppression table keyed by normalized phone; check inbound STOP handler precedes any automation.
2) **Phone normalization/validation gaps** (High): normalize to E.164; reject invalid; avoid partial matches.
3) **Deduping missing** (High): idempotency key = (source + lead_id) AND short-window guard by phone.
4) **Retry storms cause multiple SMS** (High): ensure webhook handler returns 2xx only after enqueue; queue is idempotent.
5) **After-hours logic inconsistent** (Medium): apply consistent timezone per business; override per-location.
6) **Calendar outage causes dead-end** (High): always provide text-based scheduling fallback + escalation.
7) **HubSpot notes unreadable** (Medium): render plain text with stable headings; avoid raw JSON.

---
## 8) Results Summary Template (fill after running)
- Date/time executed:
- Timezone:
- Sources tested:
- Trials run:
- <60s pass rate:
- Worst delta:
- Notable failures + links to evidence:
- Fixes applied (if any):
- Retest outcomes:

This packet is designed to be shared with agencies as proof of reliability during the free pilot period, alongside the business site URL (https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4) and support email (agent_bob_replit+lead-copilot@agentmail.to).