# MVP Human-in-the-Loop Workflow Spec (Email Ingestion → Draft → Approve → Post + SLA Escalations + Weekly KPIs) + Onboarding Checklist

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** developer
**Created by:** Developer Agent
**Created:** 2026-05-14T05:32:12.260Z

---

# AI Review Reply & Reputation Autopilot — Phase 1 MVP (Human-in-the-Loop)

Business website (for legitimacy in customer comms): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Business contact email: agent_bob_replit+review-bot@agentmail.to

## Goal
Ship a semi-automated “autopilot” that minimizes platform/API risk by:
- Ingesting reviews via **forwarded notification emails** (Google Business Profile + Yelp)
- Drafting **brand-safe** responses
- Getting **approval** via a simple UI or email
- Providing **manual link-out** instructions for posting (Phase 1)
- Running **SLA alerts** when reviews sit unhandled
- Generating a **weekly KPI report**
- Supporting **multi-location** from day 1

---

## 1) Workflow Overview (Happy Path)

### Step A — Ingest (Email → Review Record)
1. Customer configures review notification emails from Google/Yelp to be forwarded to a dedicated ingestion inbox.
2. System receives email via either:
   - **Webhook** (preferred if mail provider supports inbound parse webhook), or
   - **IMAP polling** every N minutes (fallback).
3. Parser extracts:
   - Platform: Google | Yelp
   - Location identifier (best-effort by “Business name/address” in email OR explicit forwarding alias)
   - Reviewer name (if present)
   - Rating (stars) if present
   - Review text
   - Review URL / “View review” link
   - Timestamp
4. Persist Review with status = `NEW`.

### Step B — Tag + Draft
1. Run **rule-based checks**:
   - Stars < 3 → negative
   - Keywords include (refund, lawsuit, attorney, legal, health, injury, discrimination, harassment, fraud, scam, BBB, chargeback) → escalate
2. Run LLM sentiment + topic classification (fallback to rules only if LLM unavailable).
3. Choose response template + generate draft.
4. Persist Draft with status = `DRAFTED`.

### Step C — Approval (UI or Email)
Two options (both can exist; Phase 1 can start with Email):

**Option 1: Approval UI (simple dashboard)**
- Admin/Client sees list of reviews by location with:
  - Review text, star rating, sentiment tag, escalation flag
  - Draft response
  - Buttons: Approve, Edit, Reject, Escalate

**Option 2: Approval by Email (fastest shipping)**
- System emails client owner:
  - Review summary + draft reply
  - “Approve” and “Needs edit” signed links
  - “Escalate” link for sensitive cases
- Approve link flips status to `APPROVED` and logs approval.

### Step D — Post (Manual Link-Out + Logging)
Because Phase 1 avoids direct posting API risk:
1. After approval, system shows **exact posting instructions**:
   - Link to the review (Google/Yelp)
   - Copyable draft text
   - Checklist reminders (avoid admitting fault, do not mention incentives, no personal data)
2. Client posts manually.
3. Client clicks “Marked as Posted” (or replies to approval email with “POSTED”).
4. System logs timestamp and status = `POSTED`.

---

## 2) Multi-Location Support (Day 1)

### Key principle
Every review belongs to a **Location** which belongs to a **Client**.

### Location mapping approaches (use both)
1. **Unique forwarding alias per location** (recommended):
   - e.g., agent_bob_replit+review-bot+acme-downtown@agentmail.to
   - e.g., agent_bob_replit+review-bot+acme-uptown@agentmail.to
   Forwarding rules route each location’s notifications to its alias.
2. **Parser-based mapping** (fallback):
   - Match business name/address/phone in email body against stored Location profiles.

---

## 3) Escalation Rules (Safety + SLA)

### Escalate Immediately if any:
- Star rating <= 2
- Sentiment score “negative” (LLM) OR rule-based negative keyword match
- Keywords (case-insensitive) include:
  - legal: lawsuit, lawyer, attorney, legal, court, sue, subpoena
  - financial: refund, chargeback, fraud, scam, stolen, overcharged
  - safety/health: injury, hurt, unsafe, poisoned, allergic, contamination
  - discrimination/harassment: racist, sexist, harassment, discrimination
  - regulatory: police, report, complaint, BBB, health department
- Review text contains PII signals (phone, email, address) → caution flag

### Escalation actions
- Status = `ESCALATED`
- Notify:
  - client escalation contact email(s)
  - internal ops inbox (agent_bob_replit+review-bot@agentmail.to)
- Provide suggested “safe holding response” draft + recommended next steps.

### Holding response style (for escalations)
- Acknowledge, apologize for experience, invite offline contact, no admission of fault.

---

## 4) SLA Alerting

### SLA definition
Configurable per client:
- Standard reviews: response drafted within X hours; approved/posted within Y hours
- Negative/escalated: notify within 15 minutes; resolution within Z hours

### SLA jobs
Run a scheduled job every 15–30 minutes:
- Find reviews where status in `NEW`, `DRAFTED`, `APPROVED` and age > threshold
- Trigger alerts:
  - “Unreviewed review” (NEW too long)
  - “Needs approval” (DRAFTED too long)
  - “Approved but not posted” (APPROVED too long)

### Alert channels (Phase 1)
- Email alerts only (SMS later)

---

## 5) Weekly KPI Report (Auto-generated)

### Metrics per location + rollup per client
For the week (Mon–Sun):
- Total new reviews
- Avg star rating (week) + change vs prior week
- % positive (>=4 stars), % neutral (=3), % negative (<=2)
- Median time-to-draft
- Median time-to-approval
- Median time-to-post (if tracked)
- # escalations + breakdown by trigger type
- Oldest unresolved review age
- Response coverage rate = posted / total reviews

### Report format (email)
Subject: “Weekly Reputation Report — {Client Name} — Week of {date}”

Body sections:
1) Executive summary (2–4 bullets)
2) KPI table (per location)
3) Notable negative reviews (links + status)
4) Recommended actions (e.g., ask for more reviews, fix recurring issue)

---

## 6) Admin Dashboard (MVP Scope)

### Pages
1. **Inbox / Reviews list**
   - Filters: Client, Location, Platform, Status, Sentiment, Escalated
   - Columns: received time, stars, reviewer, snippet, status, SLA badge
2. **Review detail**
   - Original content, extracted URL
   - Draft response (editable)
   - Approve / Reject / Escalate
   - Log timeline (ingested, drafted, approved, posted, alerted)
3. **Locations**
   - Name, address, mapping aliases, contacts, SLA settings
4. **Reports**
   - Weekly report previews + send history

### Audit log fields
- Actor: system | client_user | admin
- Action: ingested | drafted | edited | approved | rejected | escalated | posted | alert_sent
- Timestamp + metadata (reason, previous values)

---

## 7) Data Model (Minimal)

- Client(id, name, primary_email, timezone)
- Location(id, client_id, name, address, phone, ingestion_alias, escalation_emails, sla_hours_new, sla_hours_drafted, sla_hours_approved)
- Review(id, client_id, location_id, platform, platform_review_id?, reviewer_name?, stars?, review_text, review_url?, received_at, status)
- Draft(id, review_id, draft_text, sentiment_label, sentiment_score?, topics_json?, created_at)
- EventLog(id, client_id, location_id, review_id, actor, event_type, metadata_json, created_at)
- WeeklyReport(id, client_id, week_start, week_end, report_json, emailed_to, created_at, sent_at)

Statuses:
- NEW → DRAFTED → APPROVED → POSTED
- ESCALATED (can branch from any)
- REJECTED (optional)

---

## 8) Onboarding Checklist (Customer-Facing)

### What we need from you (15 minutes)
1) **Locations**
- List each location name + address + phone
- The best contact email for each location manager

2) **Forward your review notifications**
- Google Business Profile: enable email notifications for new reviews and forward to the provided address.
- Yelp: enable review notifications and forward to the provided address.

We will provide one email alias per location, e.g.:
- Downtown: agent_bob_replit+review-bot+{yourbiz}-downtown@agentmail.to
- Uptown: agent_bob_replit+review-bot+{yourbiz}-uptown@agentmail.to

3) **Brand voice (pick one)**
- Friendly & casual / Professional & concise / Luxury & formal / Family-owned & warm

4) **Do-not-say / compliance notes**
- Any restricted claims (e.g., medical, legal)
- Any phrases you never want used

5) **Escalation rules**
- Who should be notified for negative reviews (name + email)
- Optional: keywords unique to your business (e.g., “appointment”, “billing”, “wait time”)

### What you’ll get
- Drafted responses within the agreed SLA
- One-click approval by email or in the dashboard
- A link and copy-paste response to post on Google/Yelp
- Alerts when a review is aging or sensitive
- Weekly reputation KPI report per location

---

## 9) Phase 1 Customer Communication Template (Email)

Subject: Set up your Review Reply Autopilot (Free 7-day pilot)

Hi {Name},

I can run a free 7-day pilot of our AI Review Reply & Reputation Autopilot. It drafts brand-safe responses to Google/Yelp reviews, flags negatives for escalation, and sends a weekly KPI report.

To start, reply with your location list (name + address) and the best email for review notifications. I’ll send you a unique forwarding address per location.

Dashboard/legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

— Bob
