# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability (Agency Handoff, Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T21:05:53.786Z

---

Purpose (MVC): This is the minimum compliance + deliverability pack required to launch pilots safely (reduce carrier blocks + TCPA/CTIA objections) without overbuilding. Use this for home services/local high-intent businesses. Company proof links: Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 | Support: agent_bob_replit+lead-copilot@agentmail.to

1) Required Opt‑In (what MUST be true)
A) Consent must be collected on the lead form/ad before first text. No purchased lists. No scraped numbers.
B) Disclosure must include: (i) automated texts, (ii) msg frequency, (iii) STOP/HELP, (iv) links to Terms + Privacy (can be the business site pages or client’s).
C) Consent must be logged (who/when/where/what the user saw).

2) Copy/Paste Opt‑In Snippets
2.1 Webflow / Website form checkbox (recommended)
Label (checkbox required):
“I agree to receive automated text messages about my request (quotes/scheduling) at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
Implementation notes: make checkbox required; store a boolean plus the exact label text version in your form submission.

2.2 Typeform (statement + required question)
Add a “Legal” statement above submit:
“By submitting, you consent to receive automated text messages about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
Add required yes/no:
“Do you agree to receive text messages about your request at the number provided?” (Yes required).

2.3 Meta/Facebook Lead Ads (higher friction but acceptable)
In the “Privacy Policy” field: {PRIVACY_URL}
In custom disclaimer / question text:
“By submitting, you agree to receive automated text messages about your inquiry. Msg frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. Terms: {TERMS_URL} Privacy: {PRIVACY_URL}.”
If possible add a required custom question: “Do you agree to receive texts?” (Yes).

3) First Message Templates (carrier-safe)
Goals: identify business, reference the request, short, no ALL CAPS, no excessive punctuation, no “FREE!!!”, avoid URL in first message when possible.

3.1 Initial response (send immediately)
“Hi {first_name}—this is {business_name}. Got your request for {service}. What’s the address or ZIP for the job?”
Optional compliance footer (if you didn’t show it clearly on form):
“Reply STOP to opt out.”

3.2 Qualification (keep to 1 question per message)
“Thanks—when would you like us to come out? (Today/Tomorrow/This week)”
“Any photos you can share? Reply YES and we’ll send a link.” (Only send link after YES.)

3.3 Booking handoff
“I can book you with {rep_name}. What time works best: {slot1} or {slot2}?”

4) STOP/HELP Handling (implementation rules)
Treat STOP/HELP as GLOBAL across all client numbers (shared suppression list) unless each client has separate subaccounts.

4.1 Keywords (case-insensitive; trim punctuation)
STOP keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP keywords: HELP, INFO
Optional: START, YES (opt-back-in) only if you have prior consent + user opted out and is explicitly opting back in.

4.2 STOP behavior (required)
On inbound STOP keyword:
A) Immediately add number to Suppression List with timestamp, source="sms_inbound", reason="stop".
B) Send ONE confirmation message:
“You’re opted out and will no longer receive texts from {business_name}. Reply HELP for help.”
C) Block all future outbound messages to that number across campaigns/clients (or per-client if architected that way). Do not send marketing or follow-ups.

4.3 HELP behavior
On inbound HELP keyword:
Send:
“{business_name}: For help, reply with your question or email agent_bob_replit+lead-copilot@agentmail.to. Reply STOP to opt out.”
Do not include extra links unless necessary.

4.4 Non-keyword messages from suppressed numbers
If number is suppressed, do not send normal flow messages. Either:
Option A (strict): Send nothing.
Option B (allowed): Send one reminder only once per 30 days:
“You’re currently opted out. Reply START to opt back in.”
(Only if your counsel allows START opt-in semantics.)

5) Quiet Hours (minimum viable)
Default quiet hours: 8pm–8am recipient local time (recommended for home services). If unknown timezone, use client’s timezone.
Rules:
- If a lead arrives during quiet hours, queue the first message for next allowed time.
- Do not “burst” queued messages. Send the first message at opening, then continue conversationally.
- Emergency override only for true emergencies and only if customer explicitly requested “ASAP” during quiet hours (log this).

Timezone resolution order:
1) Lead-provided ZIP/postal -> map to timezone
2) Client/service area timezone default
3) Phone number area code heuristic (fallback)
Always store the chosen timezone + method used.

6) Consent Logging (what to store for audits)
Store these fields per lead:
- lead_id
- phone_e164
- consent_status (opted_in/opted_out)
- consent_timestamp
- consent_source (webflow/typeform/meta/manual)
- consent_text_version (exact snippet displayed)
- terms_url + privacy_url used at time of consent
- ip_address (if available)
- user_agent (if available)
- form_url or ad_id
- suppression_timestamp + suppression_reason (if opted out)
Retention: minimum 24 months recommended for TCPA defense (adjust to counsel).

7) Deliverability Guardrails (pilot-grade)
- Avoid URL in very first text unless necessary. If sending a link, use one branded domain consistently (later); for now keep links minimal.
- Avoid spammy words: “free”, “cash”, “guarantee”, “act now”, excessive emojis/punctuation.
- Keep messages under 160 chars when possible.
- Use a Messaging Service (Twilio) with proper sticky sender and opt-out keywords enabled.
- Throughput: don’t blast; keep to conversational cadence. If bulk follow-ups exist, throttle.

8) Agency Go‑Live Checklist (10 minutes)
1) Add the opt-in snippet to the form/ad (Section 2) with real Terms/Privacy URLs.
2) Ensure checkbox/yes-no is required and captured in submission payload.
3) Turn on STOP/HELP handling via inbound webhook rules (Section 4).
4) Set quiet hours window and client timezone default (Section 5).
5) Confirm consent logging fields are stored (Section 6).
6) Run test: submit a lead -> verify first message; reply HELP -> verify help text; reply STOP -> confirm opt-out + suppression; try sending again -> must be blocked.

If you need support or a compliance note for clients, point them to the product site (URL above) and email agent_bob_replit+lead-copilot@agentmail.to.
