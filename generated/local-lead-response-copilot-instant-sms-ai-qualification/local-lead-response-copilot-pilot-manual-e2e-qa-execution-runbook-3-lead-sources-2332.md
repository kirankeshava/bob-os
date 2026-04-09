# Local Lead Response Copilot — Pilot Manual E2E QA Execution Runbook (3 Lead Sources + <60s KPI + Fail-safes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T20:52:15.290Z

---

## Purpose (Pilot-stage, no automation)
Validate end-to-end lead intake → first SMS → qualification → handoff/booking across **3 lead sources** while protecting reputation during early agency pilots. This runbook produces (1) timestamped proof of **<60s first response**, (2) a bug list prioritized by churn risk, and (3) verified fail-safe behaviors (STOP/HELP, after-hours, retries/dedupe, LLM failure deterministic mode).

**Business proof link (share with customers):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
**Business contact email (use in templates/alerts):** agent_bob_replit+lead-copilot@agentmail.to

---

## Lead Sources Under Test (Minimum 3)
1) **Generic Webhook JSON** (baseline for any ad/form tool)
2) **Jotform** (real form tool; free tier)
3) **HubSpot** (CRM; free/dev account)

Each source must map into the same internal pipeline and trigger: 
- immediate first SMS
- qualification (LLM or deterministic fallback)
- CRM note/log entry
- optional booking link sent (or escalation)

---

## KPI: First Response Time (<60s)
### Definition
**First Response Time (FRT)** = time from **Lead Received Timestamp** (server receives webhook / integration event) to **First SMS Sent Timestamp** (provider “sent/queued” event).

### Evidence Required (per trial)
For each lead trial, capture:
- T0: lead submitted time (form submit or webhook POST time)
- T1: webhook received time (server log/event log)
- T2: SMS queued/sent time (messaging log)
- Screenshot or log snippet showing T1 and T2

### Pass/Fail
- **PASS**: median FRT < 30s and 95th percentile FRT < 60s across at least **20 trials** (10+10 across two sources minimum; ideally spread across all three)
- **FAIL**: any systemic delay >60s on clean inputs OR inability to prove timestamps

---

## Test Data (Standard Lead Fields)
Use these canonical fields across all sources.
- first_name: Test
- last_name: Lead
- phone_valid: +14155550123 (E.164 format)
- phone_invalid: 415-555 (too short)
- phone_missing: null/empty
- email: test.lead@example.com
- service: Plumbing
- zip: 94107
- message: “Need help today. Please text me.”
- consent: true (if captured)

### Generic Webhook JSON Payload (copy/paste)
**Valid lead:**
{
  "source": "webhook",
  "lead_id": "qa-webhook-001",
  "first_name": "Test",
  "last_name": "Lead",
  "phone": "+14155550123",
  "email": "test.lead@example.com",
  "service": "Plumbing",
  "zip": "94107",
  "message": "Need help today. Please text me.",
  "consent": true,
  "submitted_at": "2026-04-09T12:00:00Z"
}

**Missing phone:** set "phone": "" (or remove key)
**Invalid phone:** set "phone": "415-555"

---

## Deterministic Fallback Mode (LLM down/timeout)
### When to activate
Activate deterministic mode when:
- LLM call errors OR times out (>6s) OR returns empty/unparseable output
- confidence/quality guard fails (e.g., missing required slot extraction)

### Safety goals
- Never spam
- Respect STOP/HELP immediately
- Keep messages short, businesslike, and consent-aware
- Always provide a human handoff path

### Deterministic Question Flow (Exact Copy)
**SMS #1 (immediate, within 60s):**
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—what service do you need? (Reply with 1) Plumbing 2) HVAC 3) Electrical 4) Other)” 

If no reply in 3 minutes:
**Nudge:** “Just checking—reply 1-4 so I can get you to the right person. Text STOP to opt out.”

**If reply 1-4:**
“Got it. What’s your ZIP code?”

**If ZIP provided (5 digits):**
“Thanks. Is this urgent? Reply 1) Today 2) This week 3) Just price info”

**If urgent=Today:**
“Understood. What’s the best time for a quick call? Reply 1) ASAP 2) In 1 hour 3) Later today”

**If user asks for booking:**
“I can schedule you. Here’s the link: {{calendar_link}}. If that link doesn’t work, reply ‘CALL ME’ and we’ll reach out.”

**Escalation rule:**
- If user replies “CALL ME” OR provides urgency=Today and time preference: create internal task + notify agent via email to agent_bob_replit+lead-copilot@agentmail.to with transcript and lead fields.

### STOP/HELP Compliance (Must Override All)
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT”: 
  - Immediately respond: “You’re opted out and will no longer receive texts. Reply START to opt back in.”
  - Mark lead as DNC/opted out. No further messages.
- If inbound contains “HELP”:
  - Respond: “Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

---

## Scenario Matrix (Run These Manually)
Run each scenario on each lead source where possible.

### 1) Missing phone
**Steps:** submit lead with empty phone.
**Expected:** no SMS attempt; CRM note created: “Missing phone—cannot text. Email follow-up queued or flagged.”
**Fail-safe:** notify agent email with lead details.

### 2) Invalid phone
**Steps:** submit with invalid phone.
**Expected:** phone validation fails; no SMS; CRM note includes original value and error.

### 3) STOP
**Steps:** submit valid lead → receive first SMS → reply “STOP”.
**Expected:** immediate opt-out confirmation; no further sends.

### 4) HELP
**Steps:** reply “HELP”.
**Expected:** support message includes agent_bob_replit+lead-copilot@agentmail.to.

### 5) After-hours
Define after-hours window (e.g., 6pm–8am local).
**Steps:** simulate lead during after-hours.
**Expected:** first SMS still within 60s, but copy changes:
“Thanks—our team is currently offline. Reply with what you need and we’ll follow up at {{next_open_time}}. If urgent, reply URGENT.”

### 6) Multiple concurrent leads
**Steps:** submit 5 leads within 30 seconds.
**Expected:** all get first SMS <60s; no cross-talk; correct transcript per phone.

### 7) Calendar link failures
**Steps:** configure an invalid calendar link.
**Expected:** message includes fallback: “If link doesn’t work reply CALL ME”; CRM note flags booking link failure.

### 8) Webhook retries
**Steps:** send same lead_id payload 3 times.
**Expected:** dedupe prevents duplicate SMS; CRM note indicates “duplicate event ignored.”

### 9) Duplicate leads (same phone, new lead_id)
**Steps:** submit two leads with same phone within 10 minutes.
**Expected:** either (a) merge thread, or (b) send a single new opener with context; never spam >1 opener in 2 minutes. CRM note must reference both lead_ids.

### 10) CRM note formatting (HubSpot)
**Expected note template (single block, readable):**
Title: “Lead Copilot Qualification Transcript”
Body:
- Source: {{source}}
- Lead ID: {{lead_id}}
- Received: {{timestamp}}
- Phone: {{phone}}
- First response sent: {{sms_sent_timestamp}}
- Mode: LLM | Deterministic
- Answers:
  - Service: …
  - ZIP: …
  - Urgency: …
- Outcome: Booked link sent | Escalated | Opted out
- Transcript:
  [time] Outbound: …
  [time] Inbound: …

---

## Results Capture Table (fill during pilot)
For each trial, record:
- Trial #
- Source (Webhook/Jotform/HubSpot)
- lead_id
- Phone type (valid/invalid/missing)
- T1 webhook received
- T2 SMS sent
- FRT seconds
- Scenario tags (STOP/HELP/after-hours/etc.)
- Pass/Fail
- Evidence link (screenshot/log path)

---

## Bug Log Template (Prioritized by churn risk)
Fields:
- Bug ID
- Severity (S0 compliance, S1 churn, S2 annoyance)
- Scenario
- Source
- Steps to reproduce
- Expected vs actual
- Evidence
- Suggested fix
- Owner + ETA

S0 examples: STOP not honored, sending after opt-out, wrong recipient.
S1 examples: first SMS >60s, duplicate SMS spam, calendar failure with no fallback.

---

## Execution Checklist (60-minute run)
1) Confirm you have a test sending number + access to message logs (no spend changes).
2) Run 5 baseline valid-lead trials via Generic Webhook; record FRT.
3) Run 5 Jotform submissions; record FRT.
4) Run 5 HubSpot-originated leads; record FRT.
5) Run STOP + HELP once each on a valid thread.
6) Run missing phone + invalid phone once each per source (where possible).
7) Run a 5-lead concurrency burst (any one source).
8) Run webhook retry + duplicate phone test.
9) Produce a short summary: median/95p FRT, total fails, top 3 fixes.

This runbook is intentionally manual and pilot-friendly so we can protect agency reputation immediately without building automation pre-revenue.