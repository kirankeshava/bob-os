# Local Lead Response Copilot — Minimum Viable Compliance (MVC) Launch Pack (Agency Copy/Paste + STOP/HELP + Quiet Hours + Consent Logs)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T06:48:11.284Z

---

## Goal (MVC)
Enable agencies/pilots to send compliant, high-deliverability SMS immediately (free pilots) without getting blocked by carriers or triggering TCPA/CTIA issues. This is the *minimum viable* set that removes the most common sales objections and reduces churn.

**Business legitimacy links (use everywhere):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

---

## 1) Opt-in / Consent Requirements (what must be true)
Collect consent at the point of lead capture (form or ad). Store:
- Phone number, timestamp, source (e.g., Webflow form name / Typeform ID / Meta Lead Ad ID)
- Consent checkbox value + exact disclosure text version (store the string or a version hash)
- IP address + user agent (if available)
- Any UTM parameters (recommended)

**Rules:**
- Consent must be unambiguous (checkbox or equivalent).
- Do not require purchase to opt in.
- Identify your business/brand in the disclosure.
- Include STOP/HELP instructions.

---

## 2) Copy/Paste Opt-in Snippets (Agency-ready)
### A) Webflow (add checkbox + help text)
**Checkbox label (required):**
“I agree to receive text messages about my request.”

**Disclosure text (small text under checkbox):**
“By submitting, you agree that Local Lead Response Copilot (and its clients) may text you about your inquiry using automated technology. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to. More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

**Implementation notes:**
- Make checkbox required.
- Do not pre-check.
- If the client brand is the sender, replace “Local Lead Response Copilot (and its clients)” with “{Client Business Name}”.

### B) Typeform
**Add a Yes/No question (required):**
“Can we text you about your request?”
- Yes / No

**Add statement text directly below:**
“By selecting Yes, you agree to receive SMS about your inquiry (automated). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to. https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

**Logic:**
- If “No” → do not send SMS; route to email-only follow-up.

### C) Meta/Facebook Lead Ads
**In the form’s disclaimer/custom question:**
“By submitting, you agree to receive text messages about your request (automated). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to. https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

**If space is tight (short version):**
“Consent to receive SMS about your inquiry. Msg&data rates may apply. Reply STOP to opt out, HELP for help. agent_bob_replit+lead-copilot@agentmail.to”

---

## 3) First Message Template (high deliverability)
Send immediately after lead capture.

**Template:**
“Hi {first_name} — this is {business_name}. Got your request for {service}. What’s the address (or ZIP) for the job? Reply STOP to opt out.”

**Guidelines:**
- No ALL CAPS, no excessive punctuation, no shortened spammy URLs.
- Avoid “free”, “promo”, “guaranteed”, “act now”, “limited time”.
- Keep links rare; only include when necessary.

---

## 4) STOP/HELP Handling (must-implement)
### Keywords to recognize (case-insensitive)
**STOP:** STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
**HELP:** HELP, INFO

### Behavior
**On STOP keyword:**
1) Immediately mark number as “do_not_contact_sms=true” in a *global suppression list*.
2) Send one confirmation message:
   “You’re opted out and won’t receive more texts. Reply HELP for help. Support: agent_bob_replit+lead-copilot@agentmail.to”
3) Block all future outbound SMS to that number across all clients/workspaces unless manually removed with an audited action.

**On HELP keyword:**
Reply:
“Help: You’re receiving texts about your recent inquiry. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

### Logging (audit)
Log events: keyword, timestamp, from_number, to_number/service, lead_id (if found), action taken (suppressed, help response).

---

## 5) Quiet Hours (minimum viable)
**Default quiet hours:** 8:00pm–8:00am *lead’s local time*.

### Timezone resolution order
1) If lead submitted ZIP/address → map to timezone.
2) Else if area code mapping available → use that.
3) Else fallback to business timezone.

### Sending behavior
- If a lead arrives during quiet hours: **queue** first SMS for next allowed time (e.g., 8:05am local).
- If the lead explicitly texts in during quiet hours (inbound message received): allow 1 response (contextual), but avoid marketing language.

---

## 6) Twilio Deliverability (MVC guidance)
Even in pilots, use a Messaging Service where possible:
- Create a Twilio Messaging Service
- Enable Sticky Sender (consistent number per lead)
- Enable Smart Encoding
- Configure inbound webhooks to your STOP/HELP handler

**A2P 10DLC:**
- For low-volume pilots you can start without full registration depending on account status, but assume you will need A2P for scale.
- Keep content transactional/conversational; avoid promotional language.

---

## 7) Agency Go-Live Checklist (copy/paste)
1) Add opt-in checkbox + disclosure to the lead source (Webflow/Typeform/Meta).
2) Confirm the form payload includes: name, phone, service, ZIP/address.
3) Turn on STOP/HELP handling + global suppression.
4) Turn on quiet hours with timezone mapping.
5) Send a test lead and verify:
   - First message sends immediately (if not quiet hours)
   - Reply STOP → confirmation + no further messages
   - Reply HELP → help message
   - During quiet hours → message queued
6) Save evidence: screenshots of form consent + logs for STOP event.

## 8) Verification Test Matrix (minimum)
- Test 1: New lead during business hours → receives first SMS within 60 seconds.
- Test 2: Lead replies STOP → suppression flag set; outbound blocked.
- Test 3: Lead replies HELP → receives help response.
- Test 4: New lead at 10pm local → no immediate send; queued for morning.
- Test 5: Previously STOP’d number re-submits form → no SMS; route to email/phone task.

This MVC pack is the minimum needed to launch pilots safely while keeping focus on distribution and closing.