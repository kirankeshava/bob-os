# Local Lead Response Copilot — Pilot E2E QA Execution Pack (Unblock Emails + Evidence Protocol + Deterministic Fallback Transcript)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:33:39.512Z

---

## 1) Objective
Run manual end-to-end (E2E) checks across 3 lead sources and capture evidence that:
- First response SMS is sent in <60 seconds from lead submission (KPI).
- Safe fallbacks occur for high-risk scenarios (missing/invalid phone, STOP/HELP, after-hours, retries, duplicates, concurrency, calendar failure).
- CRM (HubSpot) logging/note formatting is correct and readable.

Lead sources in scope:
1) Generic Webhook JSON (direct POST)
2) Jotform (real form tool)
3) HubSpot (CRM)

Business legitimacy references for any external communication:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

---

## 2) Evidence Protocol (How we prove <60s and correctness)
For each trial, capture:
- T0: Lead submission timestamp (source UI time + screenshot OR request timestamp from a webhook logger).
- T1: First outbound SMS timestamp (provider log screenshot OR app log screenshot OR phone screenshot if visible with time).
- Delta = T1 - T0 in seconds.
- Transcript evidence for STOP/HELP and fallback mode.
- CRM evidence: screenshot of HubSpot contact record and the exact note content.

Where to store evidence (no paid tools):
- A shared Google Drive folder (or Replit project folder) with subfolders:
  - /evidence/jotform/
  - /evidence/webhook/
  - /evidence/hubspot/
  - /evidence/stop-help/
File naming convention:
- YYYY-MM-DD_source_case#_T0.png
- YYYY-MM-DD_source_case#_T1.png
- YYYY-MM-DD_source_case#_CRMnote.png

Pass/Fail KPI:
- PASS if Delta <= 60 seconds for 19/20 trials and no single trial exceeds 90 seconds without a documented provider outage.
- FAIL if >=2 trials exceed 60 seconds, or any STOP request is not honored immediately.

---

## 3) Deterministic Fallback Transcript (LLM down / timeout safe mode)
Trigger conditions:
- LLM call errors, times out (>5s), returns empty response, or confidence flag indicates failure.

Fallback goal:
- Still qualify minimally and route the lead, without hallucination.

System messages (exact copy):

Message 1 (immediate):
“Hi {{first_name}}, this is {{business_name}}. Thanks for reaching out—quick question so we can help fast: what service do you need? Reply 1) Repair 2) Install 3) Quote 4) Other.”

If reply is missing after 2 minutes:
“No worries—reply with 1, 2, 3, or 4 and we’ll get you booked.”

After selection, Message 2:
“Got it. What’s your ZIP code?”

After ZIP, Message 3:
“When would you like service? Reply 1) ASAP 2) This week 3) Next week.”

After timing, Message 4 (booking path):
“Perfect—here’s the booking link: {{calendar_link}}. If it doesn’t open, reply ‘CALL’ and we’ll contact you.”

Calendar link failure behavior:
- If link generation fails OR calendar endpoint errors, send:
“Thanks—our scheduling link is temporarily down. Reply with a good time window (e.g., ‘tomorrow 2-4pm’) and we’ll confirm by text.”

Escalation to human (deterministic):
- If user replies “CALL” OR provides a time window, create a task/notification to owner and respond:
“Got it—someone will text/call you shortly to confirm.”

STOP/HELP compliance (always-on, overrides everything):
- If inbound contains “STOP”, “UNSUBSCRIBE”, “CANCEL”, “END”, “QUIT” (case-insensitive):
Reply: “You’re opted out and will no longer receive messages. Reply START to re-subscribe.” and mark number DNC.
- If inbound contains “HELP”:
Reply: “Help: Reply STOP to opt out. For support email agent_bob_replit+lead-copilot@agentmail.to.”

After-hours deterministic behavior:
- If outside business hours: send immediately (still within <60s):
“Thanks for reaching out. We’re currently closed but will follow up first thing tomorrow. If urgent, reply URGENT.”
- If URGENT: notify owner and respond:
“Thanks—flagged as urgent. Someone will reach out as soon as possible.”

---

## 4) Outreach/Unblock Emails (ready to send)

### A) Email to Jotform Support (free-tier feasibility + webhooks)
Subject: Webhook setup question (free plan) for lead-to-SMS response testing

Hi Jotform Support,

I’m Bob Smith and I’m testing a lead-response product that sends an instant SMS when a form is submitted.

Can you confirm the best way to send form submission data to a webhook endpoint on the free tier? Specifically:
1) Can a Jotform form (free plan) POST submission payloads to a custom webhook URL?
2) Are there any restrictions on headers/JSON payload format we should be aware of?
3) Is there a recommended way to include hidden fields (e.g., campaign/source) in the webhook payload?

We’re validating response-time (<60s from submit to first SMS) and need a simple, reliable webhook trigger.

Business site for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to

Thanks,
Bob Smith


### B) Email to HubSpot Support (developer/test account + notes formatting)
Subject: HubSpot test account + API guidance for creating contact notes in a sandbox

Hi HubSpot Support,

I’m Bob Smith. I’m testing an integration that:
- receives a new lead,
- sends an instant SMS,
- and writes a structured note back to the lead’s HubSpot contact record.

Can you point me to the best free/sandbox approach for testing note creation and contact updates?
1) Is a developer test account the recommended path for this kind of QA?
2) What is the preferred object/endpoint for writing a “note” to a contact record (so it appears cleanly in the timeline)?
3) Any formatting best practices (line breaks, bullet lists) to ensure readability?

We’re validating <60s response-time and safe fallback behavior, and want to ensure the CRM logging is agency-ready.

Business site for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to

Thanks,
Bob Smith


### C) Generic partner/vendor email (webhook JSON lead source)
Subject: Quick question: sending lead payloads to a webhook URL

Hi {{Name}},

I’m Bob Smith. We run Local Lead Response Copilot, which instantly texts new leads and asks a couple of qualification questions.

For testing, can your system POST new-lead events to a webhook URL in real time? If yes, can you share:
- Example payload
- Retry behavior (on 4xx/5xx)
- Whether you include a unique lead ID (for dedupe)

Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to

Thanks,
Bob Smith

---

## 5) HubSpot Note Formatting Spec (what we expect to see)
When a lead is created/updated, the note should be human-readable and consistent:

Title line:
“Lead Copilot Qualification — {{timestamp}}”

Body (example):
Source: Jotform (Kitchen Remodel Form)
Lead ID: {{lead_id}}
Name: {{first_name}} {{last_name}}
Phone: {{phone_e164}}
Service: {{service_choice}}
ZIP: {{zip}}
Timing: {{timing_choice}}
Status: {{Booked | Pending | Needs Human}}
Booking Link: {{calendar_link_or_N/A}}
Opt-Out: {{Yes/No}}
Transcript (last 4 messages):
- Outbound: “…"
- Inbound: “…"
- Outbound: “…"
- Inbound: “…"

Acceptance criteria:
- Line breaks preserved.
- No JSON blobs dumped into the note.
- Lead ID present for dedupe investigations.

---

## 6) Test Execution Matrix (20 trials recommended)
Run at least:
- 6 trials Generic Webhook JSON (including retry + duplicate)
- 7 trials Jotform (including missing phone + invalid phone)
- 7 trials HubSpot (including note formatting)
And cover:
- STOP + HELP (2 trials)
- After-hours (1 trial)
- Concurrency: submit 3 leads within 30 seconds (1 trial)
- Calendar failure (simulate invalid link / endpoint down) (1 trial)

Each trial records T0/T1 and screenshots per Evidence Protocol.

---

## 7) Known High-Risk Bug Checklist (what to watch)
- Phone normalization: accepts junk like “123” or fails on valid formats.
- STOP not persisting (lead receives another message later).
- Retry storms: webhook retries create multiple SMS threads.
- Dedupe: same lead submitted twice creates double outreach.
- After-hours: sends booking link when business is closed without expectation setting.
- Calendar errors: user receives broken link with no alternate path.
- CRM notes: unreadable, missing lead ID, transcript missing, or multiple notes per retry.

This execution pack is designed to protect reputation during first pilots without building automation and to produce timestamped evidence for agencies that we respond in under 60 seconds with safe, compliant messaging even when the LLM fails.