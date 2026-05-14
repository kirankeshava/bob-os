# Local Lead Response Copilot — Pilot Manual E2E QA Packet (vNext): 3 Lead Sources, <60s KPI Evidence, Deterministic Fail-safe State Machine + Agency Email

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T06:19:01.867Z

---

# Local Lead Response Copilot — Pilot Manual E2E QA Packet (vNext)

Business proof URL (share with agencies): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Business contact email: agent_bob_replit+lead-copilot@agentmail.to

Owner: Bob Smith

## 0) Goal (why we run this)
Protect reputation in early pilots by verifying:
1) **Speed-to-lead:** first outbound SMS is sent in **<60 seconds** from lead creation (target p95 <60s; for pilots we accept >=20 trials with 0 failures).
2) **Safety:** compliant STOP/HELP handling, after-hours routing, dedupe/retry correctness.
3) **Reliability under failure:** if LLM/calendar/CRM steps fail, qualification continues via **deterministic** flow and escalates cleanly.

This is manual by design (no automation until revenue), designed to run in ~45–60 minutes.

---

## 1) Lead sources under test (3)
A. **Generic Webhook JSON** (any form/ads tool posting to our endpoint)
B. **Jotform** (real form tool; webhook integration)
C. **HubSpot CRM** (contact create/update; validate note formatting)

---

## 2) KPI definition and measurement method (<60s first response)
### 2.1 KPI definition
**First response time (FRT)** = timestamp when lead is created/received (T0) → timestamp when first SMS is *sent* (T1).

Pass criteria for pilot:
- Each test trial: **T1 - T0 < 60 seconds**
- Across ≥20 trials total (mix across sources): **0 failures**

### 2.2 Required evidence
For each trial store:
- Lead source
- Lead identifier (email/phone or source submission ID)
- **T0**: lead created timestamp (source system timestamp or HTTP request time)
- **T1**: first SMS “sent” timestamp (provider log or app log)
- Transcript of first message
- Any errors/timeouts

Evidence storage checklist (minimum):
- Screenshot or exported log entry showing T0
- Screenshot or exported message log showing T1 and content
- Link to the stored transcript file (Google Doc/Notion/CRM note) used for the pilot

### 2.3 Results table template (copy/paste)
| Trial # | Source (Webhook/Jotform/HubSpot) | Lead ID | Phone | T0 (lead received) | T1 (SMS sent) | FRT seconds | Pass <60s? | Notes (errors/transcript link) |
|---:|---|---|---|---|---|---:|---|---|
| 1 |  |  |  |  |  |  |  |  |

---

## 3) Test data: sample payloads + expected parsing
Use these to standardize manual tests.

### 3.1 Generic Webhook JSON — sample payload
**POST** /inbound/leads (example endpoint name) with JSON:
```json
{
  "source": "webhook",
  "lead": {
    "first_name": "Jamie",
    "last_name": "Rivera",
    "phone": "+14155550123",
    "email": "jamie.rivera@example.com",
    "service": "AC Repair",
    "zip": "94107",
    "preferred_time": "Today",
    "message": "My AC stopped blowing cold air"
  },
  "meta": {
    "submitted_at": "2026-05-14T18:01:05Z",
    "campaign": "fb-ac-repair",
    "ad_id": "123",
    "ip": "203.0.113.1"
  }
}
```
Expected:
- Phone is normalized to E.164 (+14155550123)
- Missing fields do not crash; they become blanks in CRM note
- A dedupe key exists (recommended): (normalized_phone + service + date bucket)

### 3.2 Jotform — sample submission mapping
Jotform provides either field-labeled payloads or question IDs. Example conceptual mapping:
- name → first_name/last_name
- phone → phone
- email → email
- service needed → service
- message → message

Expected:
- If phone is missing/invalid, system **does not** send SMS; it should email/CRM-log “missing phone” and request follow-up.

### 3.3 HubSpot — expected CRM note format
When a lead is created/updated, append a note (or timeline event) that is readable for sales.

**Expected note template (exact formatting):**
Title: `Lead Copilot — New Lead Qualified`
Body:
- `Name: {first} {last}`
- `Phone: {phone_e164 or "(missing)"}`
- `Email: {email or "(missing)"}`
- `Source: {source} / {campaign}`
- `Service: {service}`
- `Intent: {Hot/Warm/Cold or "Unqualified"}`
- `Answers:`
  - `Q1: ...` / `A1: ...`
  - `Q2: ...` / `A2: ...`
- `Next Step: {Booked link / Call now / Needs human}`
- `Transcript Link: {url if available}`

Pass criteria:
- Consistent labels, no JSON blobs, no markdown that breaks HubSpot rendering.

---

## 4) Core scenario test cases (what to run)
Run across sources where applicable.

### 4.1 Missing phone
Input: omit phone or set phone = "".
Expected:
- No SMS attempt.
- System logs: “Missing phone” with lead identifier.
- Fallback outreach: email to business or CRM task created.
- CRM note includes `(missing)` and recommended follow-up.

### 4.2 Invalid phone
Input: phone = "123" or "(555) BAD-NUM".
Expected:
- No SMS attempt.
- Error is user-friendly in logs/CRM note.
- If email exists, send email asking for correct phone.

### 4.3 STOP and HELP compliance
Steps:
1) Lead receives first SMS.
2) Reply “STOP”.
Expected:
- Immediate confirmation message (provider-managed or app-managed).
- Lead is marked do-not-text.
3) Reply “HELP”.
Expected:
- Help message includes business name and contact email: agent_bob_replit+lead-copilot@agentmail.to

### 4.4 After-hours routing
Define after-hours window for pilot (example): 6pm–8am local.
Expected:
- Message acknowledges after-hours and offers booking link or “we’ll call first thing at 8am”.
- Does not spam multiple follow-ups overnight.

### 4.5 Multiple concurrent leads
Trigger 5–10 leads within 1 minute.
Expected:
- All get first SMS <60s.
- No cross-talk (answers from lead A do not attach to lead B).

### 4.6 Calendar link failures
Simulate booking link error (broken URL) or calendar API timeout.
Expected:
- System apologizes and offers alternative: “Reply with 2 times that work” and escalates to human.
- CRM note flags calendar failure.

### 4.7 Webhook retries
Send identical payload 3 times within 30 seconds.
Expected:
- Only 1 SMS conversation starts.
- CRM note indicates duplicates ignored with reason and dedupe key.

### 4.8 Duplicate leads
Same phone submits again 10 minutes later.
Expected:
- Either continue existing thread or start new thread with context; never double-book.
- CRM note groups attempts.

### 4.9 CRM note formatting
Verify note uses the exact template above, no raw JSON.

---

## 5) Deterministic fail-safe qualification (LLM down / timeout)
### 5.1 When to enter deterministic mode
Enter deterministic mode if any of the following happens:
- LLM call errors (non-200)
- LLM timeout > 3 seconds (pilot default)
- Response is empty/unparseable

### 5.2 State machine (deterministic)
**State S0: First Contact**
Outbound SMS #1 (send immediately):
“Hi {first_name}, it’s {Business}. Thanks for reaching out about {service}. To get you help fast: what’s the address or ZIP?”

Transition:
- If user replies with zip/address → S1
- If no response in 5 minutes → Nudge1

**Nudge1 (after 5 minutes):**
“Quick question so I can route you: what ZIP code is the job in?”
If no response in 30 minutes → CloseDormant

**State S1: Job Type / Urgency**
“Got it. Is this an emergency (needs help today) or can it wait?”
Answers:
- “Emergency/today” → tag HOT, go S2
- “Can wait” → tag WARM, go S2

**State S2: Scheduling preference**
“Great. What’s the best time for a call or appointment: (1) ASAP, (2) Today afternoon, (3) Tomorrow morning, or reply with a time.”

If calendar link is available, offer it after capturing preference:
“I can also send a booking link—want that? Reply YES for the link.”

If calendar fails: reply
“Booking link is having trouble. Reply with 2 times that work and we’ll confirm ASAP.”

**Escalation rule (human handoff):**
Escalate if:
- User asks a complex question (price estimate, detailed troubleshooting)
- User is angry/complaining
- Calendar failure
- Any delivery error

Escalation message:
“Thanks — I’m looping in a team member to confirm this with you shortly.”

### 5.3 Safety defaults
- Never claim a booking is confirmed unless calendar confirmation received.
- Never continue texting after STOP.
- If phone invalid/missing: do not attempt SMS.

---

## 6) Bug log template (pilot)
| Bug ID | Severity (P0/P1/P2) | Scenario | Steps to Reproduce | Expected | Actual | Evidence link | Suggested Fix | Owner | Status |
|---|---|---|---|---|---|---|---|---|---|

Severity rubric:
- P0: compliance breach (STOP ignored), double-texting spam, wrong-person texting, >60s consistently
- P1: booking failures without fallback, dedupe broken, CRM notes unreadable
- P2: copy issues, minor formatting

---

## 7) Agency/customer communication template (pilot verification window)
Subject: 30-min verification for <60s lead response (Local Lead Response Copilot)

Hi {AgencyName/ClientName},

I’m Bob. Before we turn this on for live leads, I’d like to run a short 30-minute verification to prove two things:
1) Every new lead gets a first text in under 60 seconds.
2) If anything fails (AI/calendar/CRM), we fall back to a safe deterministic question flow so no lead is dropped.

We’ll test three sources during the session:
- A generic webhook JSON post (represents FB lead ads / any form)
- A real form submission (Jotform)
- A CRM writeback check (HubSpot note formatting)

Here’s our site for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

If you can share a time today or tomorrow, I’ll run the verification and send you the timestamped results table + transcripts.

Best,
Bob Smith
agent_bob_replit+lead-copilot@agentmail.to

---

## 8) What “done” looks like for pilots
- ≥20 trials executed across the 3 sources
- Documented evidence shows **all** first responses <60s
- STOP/HELP and after-hours verified with transcripts
- Any defects logged with clear reproduction steps and priority
- Deterministic fallback proven by forcing an LLM error/timeout and observing state-machine behavior
