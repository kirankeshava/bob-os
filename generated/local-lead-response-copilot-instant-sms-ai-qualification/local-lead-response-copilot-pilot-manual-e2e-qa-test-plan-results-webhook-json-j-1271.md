# Local Lead Response Copilot — Pilot Manual E2E QA Test Plan + Results (Webhook JSON + Jotform + HubSpot) with <60s KPI Proof, Fail-safes, and Bug/Fix Log

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:27:11.000Z

---

Overview
This is the operator-run end-to-end QA runbook for Local Lead Response Copilot (Instant SMS + AI Qualification). It is designed to be executed during early agency pilots (first 1–3 customers) without building automated tests. It verifies: (1) first-response time KPI (<60 seconds from lead submission to first SMS delivery), (2) correct handling across 3 lead sources (Generic Webhook JSON, Jotform, HubSpot), and (3) safe fail-safes when the LLM fails (deterministic question flow).

Business legitimacy references for customers/agencies
Website URL (shareable proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Support/ops email: agent_bob_replit+lead-copilot@agentmail.to

Scope and success criteria
A. <60s KPI: For at least 18/20 test leads, first outbound SMS is delivered to handset within 60 seconds of lead submission.
B. Fail-safe behaviors: 100% compliance for STOP/HELP; safe no-send for missing/invalid phone; deterministic fallback flow used when LLM timeout/error occurs.
C. Source coverage: At least 5 successful submissions per source: Webhook JSON, Jotform, HubSpot.
D. CRM notes: HubSpot note formatting is consistent, readable, and includes required metadata + transcript.

Definitions / timestamps to capture
T0 = Lead submitted time (form submit time, webhook received time, or CRM lead create time)
T1 = SMS queued/sent time (from app logs/provider console if available)
T2 = SMS delivered time (handset screenshot time or message details)
KPI = T2 - T0 (primary) and T1 - T0 (secondary)

Tools needed (no paid tools required)
1) A real phone number you control for receiving SMS (for testing STOP/HELP). If you cannot use a real number, run “send disabled / dry run” mode and validate T1 only.
2) Stopwatch or time.is (or phone clock + screenshots)
3) Access to product logs (even basic console/log view) to confirm T0/T1
4) Jotform free account (test form)
5) HubSpot free/developer test account

Lead Sources: setup checklists

Source 1: Generic Webhook JSON (baseline)
Purpose: verify the core ingestion + response pipeline independent of 3rd-party form/CRM.
Setup:
- Ensure there is a publicly reachable webhook endpoint in the product.
- Confirm required fields: lead_id (or external_id), name, phone, email (optional), service (optional), source label.
- Confirm idempotency key behavior: lead_id should dedupe.

Source 2: Jotform (real form tool)
Purpose: validate a real-world form submission path agencies use.
Free setup checklist:
1) Create Jotform account with:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2) Create form: “Lead Copilot QA Form”. Include fields:
   - Full Name (text)
   - Phone Number (phone)
   - Email (email)
   - Service Needed (dropdown: Plumbing, HVAC, Roofing, Cleaning)
   - ZIP Code (text)
   - Preferred Time (dropdown: ASAP, Today, This Week)
   - Consent checkbox (text: “I agree to receive SMS regarding my inquiry”)
3) Integrate submission to product:
   - Use Jotform “Webhooks” integration (Settings -> Integrations -> Webhooks) pointing to the product ingestion URL.
4) Confirm test mode: submissions should be real webhooks.

Source 3: HubSpot (CRM)
Purpose: validate CRM-originated leads and note formatting.
Free setup checklist:
1) Create HubSpot test account with:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2) Create test pipeline or use default.
3) Create a test Contact property mapping list:
   Required: firstname/lastname OR fullname, phone, email.
   Optional: lead source, lifecycle stage, service type.
4) Determine event trigger:
   - Either: “New Contact created” webhook to product
   - Or: “Form submission creates Contact” then workflow triggers webhook
5) Confirm where notes will be written:
   - Contact -> Notes activity OR a custom property storing last transcript.

Deterministic fallback qualification flow (No-LLM)
Trigger conditions:
- LLM API timeout (>8 seconds)
- LLM returns error/empty output
- LLM output fails validation (non-JSON, missing required keys)
- Safety mode explicitly enabled for the account

Fallback question script (exact messages)
Message 1 (immediate, within KPI):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out — can I ask 2 quick questions to get you the fastest quote?”
If YES/OK/blank reply: proceed.
If STOP: stop all.
If HELP: send help.

Q1:
“What service do you need? Reply 1) Plumbing 2) HVAC 3) Roofing 4) Cleaning 5) Other”
Capture service_choice.

Q2:
“When do you need help? Reply 1) ASAP 2) Today 3) This week 4) Just researching”
Capture urgency_choice.

Handoff:
- If during business hours: “Got it. Here’s the booking link to pick a time: {{calendar_link}}. Or reply with a good time window and we’ll confirm.”
- If after-hours: “Thanks — we’re currently closed. We’ll text you at {{next_open_time}}. If it’s urgent, reply ASAP and we’ll try to prioritize.”

STOP/HELP compliance
- STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
  Behavior: Immediately set opt_out=true, do not send anything except the required confirmation: “You’re opted out and will no longer receive texts. Reply START to resubscribe.”
- HELP keywords: HELP, INFO
  Behavior: “Support: agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”

Fail-safe behavior matrix (expected outcomes)
1) Missing phone: no SMS sent; create internal event “missing_phone”; if email exists send email fallback (optional) or create CRM note “Phone missing — cannot SMS”.
2) Invalid phone: no SMS; mark invalid; create CRM note; do not retry repeatedly.
3) STOP: immediate opt-out; suppress future messages; write CRM note “Opted out”.
4) HELP: send help text; keep conversation open.
5) After-hours: first message still allowed (if compliant/desired), but booking/call routing deferred; no repeated pings overnight.
6) Multiple concurrent leads: each lead isolated; no cross-talk; no shared state errors.
7) Calendar link failures (404/timeout): send fallback: “Booking link is temporarily down — reply with your best time window and we’ll confirm.” Log incident.
8) Webhook retries: ingestion is idempotent by lead_id/external_id; do not send duplicate initial SMS.
9) Duplicate leads (same phone + same day): either dedupe or send only one initial message with “We got your request” and attach both lead refs in CRM note.
10) CRM note formatting: consistent template below; no broken JSON; no missing fields.

Manual execution: 20-lead test dataset (copy/paste)
Run these in order; record T0/T1/T2 and outcome.

A) Webhook JSON (8 tests)
A1 Valid baseline
{"lead_id":"qa-webhook-001","full_name":"Test One","phone":"+1XXXXXXXXXX","email":"test1@example.com","service":"HVAC","source":"webhook"}
Expected: SMS #1 within 60s. Qualification starts.

A2 Missing phone
{"lead_id":"qa-webhook-002","full_name":"No Phone","email":"nophone@example.com","service":"Plumbing","source":"webhook"}
Expected: no SMS; internal/CRM note created.

A3 Invalid phone
{"lead_id":"qa-webhook-003","full_name":"Bad Phone","phone":"123","email":"badphone@example.com","service":"Roofing","source":"webhook"}
Expected: no SMS; invalid phone recorded.

A4 STOP compliance
Submit valid lead then reply STOP from handset.
Expected: opt-out confirmation only; no further texts.

A5 HELP compliance
Submit valid lead then reply HELP.
Expected: help message with support email.

A6 After-hours routing
Submit during configured after-hours window.
Expected: safe message; defer booking/escalation.

A7 Webhook retry (same lead_id)
Re-send payload from A1 (same lead_id).
Expected: no duplicate first SMS.

A8 Concurrency
Fire 3 payloads within 5 seconds: qa-webhook-010/011/012.
Expected: all 3 get first SMS <60s; no swapped names.

B) Jotform (6 tests)
B1 Normal submission (HVAC)
B2 Missing phone (leave phone blank if allowed)
B3 Invalid phone (if Jotform blocks, simulate by editing webhook payload via Jotform tools or use webhook source to cover)
B4 Duplicate submission (submit same details twice)
B5 After-hours submission
B6 STOP (submit then reply STOP)

C) HubSpot (6 tests)
C1 Create new contact with valid phone
C2 Create contact missing phone
C3 Duplicate contact creation attempt (same email/phone)
C4 Update existing contact to trigger workflow (ensure it doesn’t re-text unexpectedly)
C5 Note formatting verification (open contact -> activity -> note)
C6 Calendar failure simulation (temporarily set calendar link to invalid in config; then create lead)

Results table (fill during run)
For each test ID:
- Source (Webhook/Jotform/HubSpot)
- T0 (submission time)
- T1 (SMS queued/sent time)
- T2 (SMS delivered time)
- KPI met? (Y/N)
- Behavior correct? (Y/N)
- Evidence (screenshot filename / log line)
- Notes

Bug / Fix log template
For any failure, log:
- Bug ID:
- Severity: P0 (compliance/KPI-breaking), P1 (major), P2 (minor)
- Test ID(s):
- Summary:
- Steps to reproduce:
- Expected vs actual:
- Logs/screenshots:
- Proposed fix (smallest first):
- Owner:
- Retest date/result:

HubSpot CRM note formatting (strict template)
Title: “Lead Copilot Qualification — {{lead_id}}”
Body:
Lead metadata:
- Lead ID: {{lead_id}}
- Source: {{source}}
- Created: {{T0}}
- Name: {{full_name}}
- Phone: {{phone}} (validated: {{true/false}})
- Email: {{email}}
- Opt-out: {{true/false}}

Conversation transcript:
1) System: {{message_1}}
2) Lead: {{reply_1}}
3) System: {{question_1}}
4) Lead: {{reply_2}}
...

Qualification outcome:
- Service: {{service}}
- Urgency: {{urgency}}
- After-hours: {{true/false}}
- Booking link offered: {{url}} (status: {{ok/fail}})
- Appointment booked: {{true/false}} (when: {{time}})

Operational flags:
- Missing phone: {{true/false}}
- Invalid phone: {{true/false}}
- Calendar failure: {{true/false}}
- Dedupe triggered: {{true/false}} (key: {{lead_id/phone}})

KPI proof procedure (<60s)
1) Before each submission, open phone clock and be ready to screenshot.
2) Submit lead (T0) and immediately note exact time.
3) When SMS arrives, screenshot showing message + time (T2).
4) In product logs (if available), record T1 “SMS queued/sent”.
5) Compute KPI: T2-T0. Mark pass if <60s.

Exit criteria / sign-off
- Run 20 tests above.
- Provide a filled Results table and a Bug/Fix list with at least: compliance (STOP/HELP), missing/invalid phone handling, dedupe behavior, and CRM note formatting.
- If any P0 occurs (STOP noncompliance, repeated texts after STOP, or KPI consistently >60s), halt pilot rollout until mitigated via configuration or hotfix.

Operator handoff note
This runbook is designed so an agency onboarding specialist can execute it during pilot setup without touching code. If agencies request proof, share: (1) filled KPI table (timestamps), (2) sample HubSpot note screenshot, (3) website URL above, and (4) support email agent_bob_replit+lead-copilot@agentmail.to for escalation.
