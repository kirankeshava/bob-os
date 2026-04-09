# Local Lead Response Copilot — Minimum‑Viable SMS Compliance (MVC) Pack (Opt‑In + STOP/HELP + Quiet Hours + Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T13:30:02.065Z

---

Purpose (MVC for first paid pilots)
This document contains only what’s required to (1) remove common compliance objections, (2) reduce carrier enforcement risk, and (3) prevent churn-causing “we got blocked / people can’t opt out” failures.
Legitimacy URL to share with prospects/agencies: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support email to include in flows: agent_bob_replit+lead-copilot@agentmail.to

A) MVC Opt‑In Language (copy/paste)
Goal: Explicit consent + basic disclosures in the place the lead submits their phone number.

A1) Webflow / Embedded form checkbox (recommended)
Add a required checkbox with this label:
“I agree to receive text messages about my request from [Business Name] at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.”
Below the checkbox (or in small text under submit), add:
“By submitting, you confirm you are the subscriber/authorized user of this number. See Privacy/Terms: [insert links when published].”

A2) Typeform (statement + optional checkbox)
Add a Statement block immediately before phone capture:
“Consent: By providing your phone number, you agree [Business Name] may text you about your request. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy/Terms: [insert links when published].”
If Typeform supports a checkbox: add “I agree” as required.

A3) Meta/Facebook Lead Ads (Higher intent + minimal)
In the Lead Form “Privacy policy” and/or custom disclaimer field, paste:
“By submitting this form, you consent to receive text messages from [Business Name] about your request at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy/Terms: [insert links when published].”

B) MVC Message Templates (safe defaults)
Rules: keep messages (1) directly related to the lead’s request, (2) no deceptive urgency, (3) no link shorteners, (4) include opt-out info at least in the first message and any re-engagement.

B1) First message (send immediately)
“Hi {first_name}, this is {agent_name} with {business_name}. Got your request for {service}. What’s the address/ZIP so we can confirm availability? Reply STOP to opt out, HELP for help.”

B2) Qualification follow-up (1–2 questions max)
“Thanks—what’s the best day/time for a call or appointment? (e.g., today 3–5pm, tomorrow morning)”

B3) Booking confirmation
“Confirmed: {date} at {time}. If anything changes, reply here. Reply STOP to opt out, HELP for help.”

B4) Missed-call text back (if using call tracking)
“Sorry we missed you—this is {business_name}. What service do you need and what’s your ZIP? Reply STOP to opt out, HELP for help.”

B5) Re-engagement (only if recent lead; avoid repeated nudges)
“Hi {first_name}—checking in on your {service} request with {business_name}. Do you still want help? Reply YES or NO. Reply STOP to opt out, HELP for help.”

C) STOP/HELP/MORE Handling (Implementation Spec)
Objective: Honor opt-out immediately, globally suppress future sends, and provide help info.

C1) Keywords (case-insensitive; trim punctuation/whitespace)
STOP set (treat as opt-out): STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP set: HELP, INFO
Optional opt-in resubscribe keyword: START (only if previously opted out)
Optional “more” control: MORE (if you use multi-message sequences; reply with next step and include STOP line periodically)

C2) Behavior
When inbound message matches STOP set:
1) Mark recipient as opted_out=true immediately.
2) Add number to a Global Suppression List (GSL) scoped to the customer/workspace (and optionally account-wide for safety).
3) Send a single confirmation:
“You’re opted out and will no longer receive texts from {business_name}. Reply START to resubscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
4) Block all future outbound messages to that number unless explicit START received.

When inbound matches HELP set:
Send:
“Help: {business_name} texts about your service request. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. More: {legitimacy_url}”

When inbound matches START:
1) Only allow if prior opted_out=true.
2) Set opted_out=false; log resubscribe timestamp.
3) Send:
“You’re re-subscribed. Reply STOP to opt out, HELP for help.”

C3) Outbound sending gate (must-have)
Before any outbound SMS attempt:
- If opted_out=true OR present in GSL → do not send. Log “blocked_optout”.

C4) Consent logging (MVC fields)
Store at minimum:
- phone_e164
- consent_status (opted_in/opted_out)
- consent_source (webflow/typeform/meta/manual/import)
- consent_text_version (string hash or version)
- consent_timestamp_utc
- consent_capture_ip (if available)
- consent_page_url (if available)
- last_inbound_message_at
- optout_timestamp_utc (if applicable)
- last_outbound_message_at

D) Quiet Hours (MVC)
Objective: Don’t text people late night; reduce complaints and filtering.

D1) Default window
Only send between 08:00 and 20:00 recipient local time.

D2) Timezone resolution order
1) Lead ZIP/postal code → map to timezone.
2) Lead city/state → map.
3) Phone NPA-NXX (area code) → approximate timezone.
4) Unknown → assume business timezone (configurable) AND apply conservative quiet hours.

D3) Behavior
- If a lead arrives outside the window: queue the first message for next local 08:05.
- If queued, do not drip multiple messages; only send the next required step once the recipient replies.
- Admin override: allow “send anyway” toggle for emergencies (log override_user + timestamp).

E) Twilio Deliverability (MVC guidance)
- Use a Messaging Service (even for pilots) so you can manage sender pools and compliance settings centrally.
- Avoid URL shorteners; use full domain or no link.
- Keep first message clearly tied to the submitted request.
- Avoid “free”, “guarantee”, “act now”, excessive punctuation, ALL CAPS.
- Include STOP/HELP in first message and any re-engagement.
- If you move beyond a handful of daily messages per number: plan A2P 10DLC (or toll-free verification). Start with the compliant content above to avoid campaign rejection.

F) Agency Handoff — 30-minute Go‑Live Checklist
1) Confirm the lead source includes the MVC consent text (Section A).
2) Confirm first message template (Section B1) is enabled and sent immediately.
3) Test STOP:
   - Submit a test lead with your phone.
   - Receive first SMS.
   - Reply “STOP”.
   - Confirm you get the opt-out confirmation.
   - Confirm subsequent outbound attempts are blocked (no more texts).
4) Test HELP:
   - Reply “HELP”.
   - Confirm help response includes support email + opt-out instructions.
5) Test quiet hours:
   - Temporarily set business timezone to a zone where it’s after 8pm OR simulate lead timestamp.
   - Confirm first message is queued, not sent.
6) Keep legitimacy URL handy for prospects: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
7) Escalation/support: agent_bob_replit+lead-copilot@agentmail.to

What this MVC intentionally defers (until after first pilots)
- Full policy publishing + legal link finalization (recommended next)
- Full A2P 10DLC campaign registration details (needed at scale)
- Complex throttling/throughput, multi-number rotation, advanced content linting
- Detailed audit exports and DNC enrichment
