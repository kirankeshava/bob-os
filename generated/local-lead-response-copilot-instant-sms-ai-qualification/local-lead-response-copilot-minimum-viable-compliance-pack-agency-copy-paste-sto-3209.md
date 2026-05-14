# Local Lead Response Copilot — Minimum Viable Compliance Pack (Agency Copy/Paste + STOP/HELP + Quiet Hours + Consent Logging)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:42:53.524Z

---

## Purpose (MVC for pilots)
This pack covers the minimum required to launch pilots safely without getting blocked by carriers or failing basic TCPA/CTIA expectations:
1) Clear opt-in language at the point of capture
2) STOP/HELP handling + global suppression list
3) Quiet hours by recipient timezone (or safe fallback)
4) Consent logging (who/when/where/what they agreed to)

Business legitimacy references (use in proposals + forms):
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---
## A) Copy/paste opt-in language (point-of-capture)
### 1) Webflow (checkbox + short disclosure)
**Checkbox label (required):**
“I agree to receive text messages about my request from {BUSINESS_NAME}.”

**Disclosure text (place under checkbox):**
“By submitting, you consent to receive SMS messages from {BUSINESS_NAME} about your inquiry, including appointment scheduling and service updates. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Terms & Privacy: {TERMS_URL} | {PRIVACY_URL}.”

**Form requirements:**
- Phone field required
- Checkbox required
- Store timestamp + page URL + IP (if available)

### 2) Typeform (statement + required ‘I agree’)
**Question:** “SMS consent” (Yes/No)
**Prompt:** “Do you agree to receive text messages about your request?”
**Description:**
“By selecting Yes, you agree {BUSINESS_NAME} may text you about your inquiry (scheduling, updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms/Privacy: {TERMS_URL} {PRIVACY_URL}.”

### 3) Meta/Facebook Lead Ads (privacy policy link + custom disclaimer)
**Add Privacy Policy URL:** {PRIVACY_URL}

**Custom disclaimer (paste):**
“By submitting this form, you agree to receive text messages from {BUSINESS_NAME} regarding your request (scheduling and service updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL}.”

**Meta note:** Use Meta’s built-in consent checkbox if available; otherwise include the disclaimer as above and ensure the first SMS repeats STOP/HELP.

---
## B) First-message templates (keep short, non-spammy)
**Initial response (immediate):**
“Hi {first_name}—this is {agent_name} with {BUSINESS_NAME}. Got your request for {service}. A couple quick questions so we can schedule you. Reply STOP to opt out.”

**Qualification Q1 (high intent):**
“What’s the address/ZIP for the work?”

**Qualification Q2:**
“When would you like this done—today, this week, or later?”

**Booking handoff:**
“Thanks—want to book a quick call or get a time on the calendar? Reply 1 for a call, 2 for an appointment time by text. Reply STOP to opt out.”

**HELP response (required):**
“{BUSINESS_NAME} support: agent_bob_replit+lead-copilot@agentmail.to. You can reply STOP to stop texts. Msg & data rates may apply.”

---
## C) STOP/HELP handling (Twilio inbound webhook spec)
### Keywords to detect (case-insensitive, trim whitespace)
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT → opt-out
- START, YES, UNSTOP → opt back in (only if prior opt-in exists; otherwise treat as request to restart and send confirmation)
- HELP, INFO → help message

### Behavior
1) If inbound matches an opt-out keyword:
   - Immediately add phone to Global Suppression List (GSL)
   - Send single confirmation:
     “You’re opted out from {BUSINESS_NAME} texts. No more messages will be sent. Reply START to opt back in.”
   - Log event (see Consent Logging)
   - Block any further outbound to that number unless they re-opt-in

2) If inbound matches HELP/INFO:
   - Send HELP template (above)
   - Do NOT change subscription state

3) If inbound matches START/YES/UNSTOP:
   - If number is in GSL and you have prior consent record: remove from GSL, send:
     “You’re opted back in to {BUSINESS_NAME} texts. Msg frequency varies. Reply STOP to opt out.”
   - If no prior consent record: keep opted-out and request explicit consent:
     “To restart texts, please reply YES to confirm you want SMS updates from {BUSINESS_NAME}. Reply STOP to cancel.”

### Engineering notes (Twilio)
- Implement on the inbound SMS webhook endpoint receiving MessageSid/From/Body.
- Suppression check must run BEFORE any outbound send in the workflow.
- Maintain suppression at the account (global) level, not per-client, to prevent accidental messaging.

---
## D) Quiet hours by timezone (minimum safe spec)
### Default policy (recommended MVC)
- Allowed send window: 8:00am–8:00pm recipient local time (can be client-configurable)
- Outside window: queue the message for next allowed time (do not drop)

### Timezone resolution order
1) If lead source provides timezone (best)
2) Else derive from phone number area code (approx)
3) Else derive from ZIP/postal (if collected)
4) Else fallback to business timezone with safe quiet hours (treat as unknown; default queue)

### Unknown timezone fallback (MVC)
If timezone is unknown, assume “quiet hours ON” unless current time in business timezone is between 10am–6pm. Outside that, queue.

### Queueing rules
- If queued, send a single internal note to the business (email/slack) that lead is waiting due to quiet hours.
- When window opens, send queued message in FIFO order.

---
## E) Consent logging (what to store)
Minimum fields to log per lead (for audits and agency confidence):
- lead_id
- phone_e164
- consent_status: opted_in | opted_out | pending
- consent_source: webflow | typeform | meta | manual
- consent_timestamp_utc
- consent_capture_text (exact disclosure shown)
- consent_page_url (or ad/form id)
- ip_address (if available)
- user_agent (if available)
- opt_out_timestamp_utc (if applicable)
- opt_out_keyword (STOP/END/etc)

---
## F) Agency “Launch in 30 minutes” checklist
1) Paste opt-in disclosure into the form (Webflow/Typeform/Meta) and make consent required.
2) Ensure first SMS includes “Reply STOP to opt out” (use template above).
3) Turn on STOP/HELP webhook logic and verify GSL blocks outbound.
4) Enable quiet hours (8am–8pm local) and queue outside window.
5) Run the 5-text verification test:
   - Send lead → confirm initial SMS received
   - Reply HELP → confirm help message
   - Reply STOP → confirm opt-out confirmation
   - Trigger another outbound → confirm it is blocked
   - Reply START → confirm opt-in confirmation and outbound allowed

If agencies need proof of legitimacy in their proposal/onboarding email, include:
“Local Lead Response Copilot info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to”
