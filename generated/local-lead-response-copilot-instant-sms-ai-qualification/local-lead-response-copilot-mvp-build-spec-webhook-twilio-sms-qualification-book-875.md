# Local Lead Response Copilot — MVP Build Spec (Webhook → Twilio SMS → Qualification → Booking/CRM Notes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T11:10:52.607Z

---

## Goal
Ship a demo-ready MVP that (1) receives a new lead via webhook, (2) sends the first SMS within 10 seconds, (3) runs 3–5 qualification questions via SMS, (4) classifies the lead hot/warm/cold, (5) routes hot leads to booking (calendar link), and (6) posts a summary/notes to a CRM endpoint (generic webhook) and emails/texts the business.

This MVP prioritizes reliability and speed-to-lead over broad integrations.

---
## Stack (low-cost, shippable)
- Runtime: Node.js + Express
- DB: SQLite (file-based) via better-sqlite3 or sqlite3
- SMS: Twilio Messaging Service (outbound + inbound webhook)
- Optional AI: OpenAI (behind feature flag). Default to rules-based scoring to avoid cost.
- Hosting: Replit / cheap VPS (single region). No paid infra required to demo.

---
## Core Objects (SQLite schema)
### 1) businesses
- id (text, pk)
- name (text)
- timezone (text, default "America/New_York")
- quiet_hours_start (text, e.g. "20:00")
- quiet_hours_end (text, e.g. "08:00")
- calendar_link (text)
- from_messaging_service_sid (text)
- notify_email (text)
- notify_phone (text, nullable)
- opt_in_disclosure (text)
- created_at (datetime)

### 2) lead_events
Stores inbound webhook payloads for audit/debug.
- id (text, pk)
- business_id (text)
- source (text: "generic", "gohighlevel")
- raw_json (text)
- received_at (datetime)

### 3) leads
- id (text, pk)
- business_id (text)
- first_name (text)
- last_name (text)
- phone_e164 (text)
- email (text)
- service (text)
- zip (text)
- source (text)
- created_at (datetime)

### 4) conversations
- id (text, pk)
- business_id (text)
- lead_id (text)
- status (text: "active","completed","stopped")
- step_index (int)
- score (int)
- classification (text: "hot","warm","cold")
- last_inbound_at (datetime)
- last_outbound_at (datetime)
- stop_requested (int 0/1)
- created_at (datetime)

### 5) messages
- id (text, pk)
- conversation_id (text)
- direction (text: "in","out")
- from_number (text)
- to_number (text)
- body (text)
- twilio_sid (text)
- created_at (datetime)

### 6) qualification_answers
- id (text, pk)
- conversation_id (text)
- question_key (text)
- question_text (text)
- answer_text (text)
- created_at (datetime)

### 7) outbound_notes
Queue of CRM note pushes + business notifications.
- id (text, pk)
- business_id (text)
- lead_id (text)
- conversation_id (text)
- destination (text: "crm_webhook")
- endpoint_url (text)
- payload_json (text)
- status (text: "queued","sent","failed")
- attempts (int)
- last_attempt_at (datetime)

---
## Admin Configuration (minimal)
Single-business MVP acceptable; multi-tenant-ready by including business_id.
Config fields:
- Business name
- Timezone + quiet hours
- Calendar link (Calendly / GoHighLevel calendar)
- Qualification questions (3–5) stored as JSON
- Lead scoring rules (simple thresholds)
- CRM note webhook URL (where to POST summary)
- Messaging Service SID + optional “brand” templates

### Example question set (JSON)
1) service_needed: “What service do you need help with?”
2) address_or_zip: “What’s your ZIP code (or neighborhood)?”
3) timeline: “How soon are you looking to get this done? (Today/This week/This month)”
4) decision_maker: “Are you the homeowner/decision maker?”
5) budget_range: “Do you have a rough budget range in mind?”

---
## Endpoints
### 1) POST /webhook/lead (generic)
Purpose: intake lead from Typeform/Webflow/HubSpot/etc.
- Accept JSON; respond 200 quickly.
- Normalize into lead record.
- Immediately trigger outbound SMS (within 10 seconds).

#### Expected input schema (minimum)
{
  "business_id": "demo",
  "first_name": "Jane",
  "last_name": "Doe",
  "phone": "+14155551212",
  "email": "jane@example.com",
  "service": "Roof repair",
  "zip": "94110",
  "source": "webflow"
}

Normalization rules:
- Phone → E.164; reject if missing/invalid.
- Deduplicate: if same phone within last 24h, attach to existing lead/conversation unless stopped.

### 2) POST /webhook/gohighlevel (optional native path)
GHL can send webhooks on “New Lead/Contact Created”. Map fields to generic schema then reuse the same processing.

### 3) POST /twilio/inbound
Twilio Messaging webhook for inbound SMS.
- Validate Twilio signature.
- Parse From/To/Body.
- If Body contains STOP/UNSUBSCRIBE/CANCEL/END/QUIT: mark conversation stopped, store, send confirmation.
- Otherwise route into state machine to ask next question or finalize.

### 4) GET /health
Returns ok.

### 5) GET/POST /admin/config
For MVP, can be protected by a static token header (ADMIN_TOKEN env var). Stores config in businesses table.

---
## Conversation Flow (state machine)
### Trigger (on lead intake)
1) Check quiet hours for business timezone.
2) If within quiet hours: schedule first SMS at next allowed time (store pending state) OR send “We’ll text you first thing at 8am” if allowed.
3) If not quiet hours: send message #1 immediately.

### Message templates
Outbound #1 (within 10 seconds):
“Hi {{first_name}}, it’s {{business_name}}. Thanks for reaching out about {{service}}. I can help—mind if I ask 3 quick questions to get you an accurate quote? Reply YES to continue.”

If YES: ask Q1.
If NO: send: “No problem—what’s the best time to call you? You can also book here: {{calendar_link}}” then classify warm.

### Steps
- step_index = -1 waiting for consent
- step_index 0..N-1 asking questions
- completion: compute score + classification + send routing message

Routing messages:
- HOT: “Great—based on that, best next step is to grab a quick slot here: {{calendar_link}}. If you prefer, reply CALL and we’ll reach out.”
- WARM: “Thanks—someone will follow up shortly. If you want to lock in a time: {{calendar_link}}”
- COLD: “Thanks—this may not be a fit right now. If anything changes, reply HELP and we’ll assist.”

---
## Qualification + Scoring (rules-first)
A simple rules engine avoids LLM cost and is deterministic.

Example scoring:
- timeline: Today(+3), This week(+2), This month(+1), Just researching(+0)
- decision_maker: Yes(+2), Not sure(+0)
- service keywords: emergency ("leak", "no heat", "broken") (+2)
- budget: above minimum (+1)

Thresholds:
- score >= 5 => HOT
- score 3–4 => WARM
- else COLD

Optional LLM (feature flag USE_LLM=true):
- After all answers, send a short prompt to classify and extract structured fields (timeline, urgency, job type, summary). Cache result.

---
## CRM Notes Output (generic)
After classification, create a summary and POST to a configured webhook URL (CRM note sink). Payload:
{
  "business_id": "demo",
  "lead": {
    "first_name": "Jane",
    "last_name": "Doe",
    "phone": "+14155551212",
    "email": "jane@example.com"
  },
  "classification": "hot",
  "score": 6,
  "answers": [
    {"key":"service_needed","q":"What service…","a":"Roof repair"}
  ],
  "summary": "Hot lead. Needs roof repair. Timeline: this week. Decision maker: yes. ZIP: 94110.",
  "booking_link": "https://calendly.com/..."
}

Also notify business via email (SMTP/AgentMail) or SMS (optional) with the same summary.

---
## Compliance: STOP + Opt-in + Quiet Hours
- Always honor STOP keywords: mark stopped, cease messages.
- Include opt-in disclosure in the initial message or at minimum in the form (stored in businesses.opt_in_disclosure).
- Quiet hours enforced per business timezone; do not message outside window.

---
## Minimal Demo Path (what must work)
1) POST /webhook/lead with test JSON creates lead + conversation.
2) Outbound SMS goes out immediately (Twilio).
3) Inbound replies progress through 3–5 questions.
4) System classifies and sends booking link.
5) System posts summary to a configurable webhook (can be a requestbin during demo).

---
## Distribution Support (demo credibility)
When sharing with customers, reference:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

This spec is intentionally narrow to ship fast and support first paid pilots; additional native CRM connectors can be added after closes.