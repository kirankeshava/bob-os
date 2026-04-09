# Local Lead Response Copilot — MVP Technical Spec + Implementation Skeleton (Webhook → Twilio SMS → AI Qualification → Booking/CRM Notes)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-04-09T07:46:31.463Z

---

# Local Lead Response Copilot (LLRC) — MVP Spec

## Goal (minimum demoable)
Receive a new lead via webhook, text them within 10 seconds, ask 3–5 qualification questions via SMS, classify hot/warm/cold, and for hot leads send booking link (or auto-book later). Persist state and send a summary to the business (email for MVP) plus produce a “CRM note payload” (JSON) that can be POSTed to a CRM webhook (GoHighLevel recommended).

### Why this scope closes pilots
Home services conversion is driven by speed-to-lead and qualification. MVP must prove: (1) instant SMS, (2) multi-turn qualification, (3) clear outcome and summary.

---
## Tech choices (cheap, single region)
- Runtime: Node.js 20 + Express
- DB: SQLite (file) using Prisma or better-sqlite3 (lowest ops)
- SMS: Twilio Messaging Service (recommended) + one inbound webhook
- AI: Optional. Start rules-first; optionally call OpenAI only for scoring/classification to avoid overbuild.
- Hosting: Replit deployment (works for demo). Later move to cheap VPS/serverless.

---
## Data model (SQLite)
### businesses
- id (text, pk)
- name (text)
- timezone (text, default: "America/New_York")
- quietHoursStart (text, "HH:mm", default "20:00")
- quietHoursEnd (text, "HH:mm", default "08:00")
- calendarLink (text)
- twilioMessagingServiceSid (text)
- twilioPhoneFallback (text, nullable)
- optInText (text, default: "By submitting, you agree to receive texts about your request. Reply STOP to opt out.")
- qualificationQuestionsJson (text) // array of {id, text, type, choices?, required?}
- hotLeadRulesJson (text) // e.g., service area, urgency, budget, etc.
- notifyEmail (text) // e.g., agent_bob_replit+lead-copilot@agentmail.to or client email
- crmOutboundWebhookUrl (text, nullable) // where we POST CRM notes JSON
- createdAt, updatedAt

### leads
- id (text, pk)
- businessId (text, fk)
- externalSource (text) // "generic", "ghl", "hubspot"
- externalLeadId (text, nullable)
- firstName (text)
- lastName (text, nullable)
- phoneE164 (text)
- email (text, nullable)
- serviceRequested (text, nullable)
- rawPayloadJson (text)
- status (text) // "new" | "qualifying" | "qualified" | "stopped"
- temperature (text, nullable) // "hot"|"warm"|"cold"
- score (int, nullable)
- summary (text, nullable)
- createdAt, updatedAt

### conversations
- id (text, pk)
- leadId (text, fk)
- state (text) // "init"|"q1"..."qN"|"done"
- currentQuestionIndex (int)
- answersJson (text) // map questionId -> answer
- lastInboundAt (datetime, nullable)
- lastOutboundAt (datetime, nullable)
- stopRequested (int, 0/1)
- createdAt, updatedAt

### messages
- id (text, pk)
- leadId (text, fk)
- direction (text) // "in"|"out"
- from (text)
- to (text)
- body (text)
- twilioSid (text, nullable)
- createdAt

---
## Public endpoints (MVP)
### 1) POST /webhook/lead
Receives new lead. Validates, normalizes, creates lead + conversation, sends first SMS within 10 seconds.

**Headers**
- X-API-Key: business webhook key (simple per-business shared secret)

**Body (generic JSON schema)**
```json
{
  "businessId": "biz_123",
  "source": "generic",
  "lead": {
    "firstName": "Jane",
    "lastName": "Doe",
    "phone": "+14155551212",
    "email": "jane@example.com",
    "serviceRequested": "Water heater repair",
    "utm": {"source":"google","campaign":"water-heater"}
  },
  "raw": {"any": "payload"}
}
```

**Response**
- 200 JSON: { leadId, conversationId, smsQueued: true }

**Behavior**
- Normalize phone to E.164
- Create lead + conversation state init
- Check quiet hours; if within quiet hours, schedule first outbound for quietHoursEnd (MVP: send immediately but with a warning OR queue in DB for later job)
- Send initial SMS:
  - Template:
    "Hi {{firstName}}, it’s {{businessName}}. Got your request for {{serviceRequested}}. Quick question so we can help fast — what’s your address or ZIP code? Reply STOP to opt out."

### 2) POST /twilio/inbound
Twilio webhook for inbound SMS.

**Twilio fields** (form-encoded)
- From, To, Body, MessageSid

**Behavior**
- Find lead by From phone and business by To/MessagingServiceSid mapping.
- Persist inbound message.
- If Body contains STOP/UNSUBSCRIBE/CANCEL/END/QUIT:
  - Mark conversation.stopRequested=1, lead.status="stopped"
  - Respond 200; optionally send confirmation (Twilio can auto-handle STOP; keep minimal)
- Otherwise:
  - Advance state machine: save answer for current question
  - Send next question OR finish, classify, and route.

### 3) GET /health
Returns 200.

### 4) POST /admin/config (MVP minimal)
Set business config (questions, hours, calendar link). Protect by Basic Auth env vars.

---
## Qualification engine (rules-first + optional LLM)
### Questions (default set for home services)
1. ZIP/Address (service area)
2. What issue are you having? (free text)
3. How soon do you need help? (choices: today / 24-48h / this week / just researching)
4. Is this for a residential or commercial property?
5. Best time for a call? (morning/afternoon/evening)

Store answers in `conversations.answersJson`.

### Scoring (simple, transparent)
- urgency=today => +40
- urgency=24-48h => +25
- urgency=this week => +15
- “just researching” => +0
- within service area => +20 else => -50
- commercial => +10 (often higher ticket) or configurable
- if issue includes keywords ("no heat", "leak", "burst", "flood") => +20

Thresholds:
- score >= 60 => HOT
- 35–59 => WARM
- < 35 => COLD

### Optional LLM (defer unless needed)
If enabled via env `LLM_ENABLED=true`, call model after last answer to produce:
- short summary (1–2 sentences)
- inferred intent + sentiment
- recommended temperature override

But MVP can ship without LLM; rules are enough to demonstrate.

---
## Hot-lead routing
When finished:
- If HOT:
  - Send SMS: "Thanks — you’re all set. Here’s the fastest way to get on the schedule: {{calendarLink}}. If you prefer, reply with a time window and we’ll confirm."
- If WARM:
  - Send SMS: "Thanks! We’ll reach out shortly. If you want to pick a time now: {{calendarLink}}"
- If COLD:
  - Send SMS: "Thanks — we got it. If anything changes, reply here and we’ll help."

### Summary to business (MVP)
Send an email to `business.notifyEmail` with:
- Lead name, phone
- Answers
- Temperature + score
- Suggested next step

### CRM note output (MVP)
If `crmOutboundWebhookUrl` configured, POST JSON:
```json
{
  "leadId": "...",
  "phone": "+1415...",
  "temperature": "hot",
  "score": 75,
  "summary": "Customer needs water heater repair today at 94107. Residential. Prefers afternoon.",
  "answers": {"zip":"94107","issue":"..."}
}
```
For GoHighLevel, this webhook can be caught by a workflow step that adds a note / tags lead.

---
## Quiet hours (MVP)
- If lead arrives during quiet hours:
  - Create lead + conversation
  - Send one “delayed intro” at quietHoursEnd OR do nothing until morning.
MVP simplest: queue message in DB with `sendAfter` and have a cron-like interval worker run every minute.

---
## STOP handling
- Detect STOP keywords on inbound.
- Mark lead.status="stopped".
- Do not send further messages.

---
## Implementation skeleton (Node/Express)
### Env vars
- PORT
- BASE_URL (public URL)
- ADMIN_USER / ADMIN_PASS
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_MESSAGING_SERVICE_SID
- DEFAULT_BUSINESS_ID (for demo)
- LLM_ENABLED (optional)
- OPENAI_API_KEY (optional)

### Key modules
- db.js (sqlite wrapper)
- normalize.js (phone normalization)
- twilio.js (sendSms)
- qualifier.js (questions + score)
- scheduler.js (quiet hours / queued sends)

### Pseudocode: /webhook/lead
1. parse JSON
2. normalize fields
3. upsert lead + conversation
4. build first question text
5. if stopRequested return
6. send via Twilio (or queue)

### Pseudocode: /twilio/inbound
1. read From/Body
2. persist message
3. STOP? mark stopped
4. load conversation state
5. save answer; increment question index
6. if more questions: send next question
7. else: compute score/temp, persist lead, send booking/thanks, email summary, POST CRM note

---
## Default admin config (copy/paste JSON)
```json
{
  "name": "Acme Plumbing",
  "timezone": "America/New_York",
  "quietHoursStart": "20:00",
  "quietHoursEnd": "08:00",
  "calendarLink": "https://calendly.com/acme/estimate",
  "notifyEmail": "agent_bob_replit+lead-copilot@agentmail.to",
  "qualificationQuestions": [
    {"id":"zip","text":"What’s your ZIP code?","type":"text","required":true},
    {"id":"issue","text":"Briefly, what issue are you having?","type":"text","required":true},
    {"id":"urgency","text":"How soon do you need help? Reply 1) today 2) 24-48h 3) this week 4) researching","type":"choice","choices":["today","24-48h","this week","researching"],"required":true},
    {"id":"property","text":"Is this residential or commercial?","type":"choice","choices":["residential","commercial"],"required":true},
    {"id":"time","text":"What’s the best time for a quick call? morning/afternoon/evening","type":"choice","choices":["morning","afternoon","evening"],"required":false}
  ]
}
```

---
## Demo script (for pilots)
1. Submit a test lead via POST /webhook/lead (or through a form that calls it).
2. Show SMS sent instantly.
3. Reply to questions.
4. Show classification and booking link.
5. Show email summary + CRM note payload.

---
## Notes on “native connector” (pick one first)
### GoHighLevel
- GHL can send webhook on new lead/contact.
- Build `/webhook/ghl` that maps GHL payload to generic schema and forwards to `/webhook/lead` internally.

### HubSpot
- HubSpot forms can send to webhook via workflow (or use HubSpot webhooks API with an app; more work).
- For MVP, prefer GHL because agencies in home services use it heavily.

---
## Compliance reminders (MVP-level)
- Include opt-out language in first message.
- Respect STOP.
- Assume lead opted-in via form checkbox (store `optIn=true` from webhook if available).

This spec is designed so we can implement a working demo in 1–2 days, close pilots, then iterate on connectors and reliability.