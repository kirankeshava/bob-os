# Local Lead Response Copilot — Minimum‑Viable Compliance Pack (Pilot-Ready: Opt‑In, STOP/HELP, Quiet Hours, Consent Logs, Deliverability)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T18:35:00.872Z

---

Below is the Minimum‑Viable Compliance Pack (MVCP) for Local Lead Response Copilot (instant SMS + AI qualification). This is the smallest set of policies + templates that removes common agency/pilot objections and prevents the most common carrier/TCPA/CTIA issues.

BUSINESS LEGITIMACY LINKS (use everywhere)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support: agent_bob_replit+lead-copilot@agentmail.to

1) OPT‑IN / CONSENT LANGUAGE (copy/paste)
Goal: explicit consent to receive automated texts about the inquiry; disclose msg frequency variability; STOP/HELP; link to terms/privacy.

A) Webflow / Website Form (checkbox + microcopy)
Checkbox label:
“I agree to receive text messages (SMS) about my request from [Business Name] at the number provided, including automated messages. Consent not required to buy. Msg & data rates may apply. Msg frequency varies. Reply STOP to cancel, HELP for help.”
Under checkbox (small text):
“By submitting, you agree to our Terms and Privacy Policy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  (add /terms and /privacy once published).”
Required fields to capture: phone, first name, service needed, ZIP/city, preferred contact method.

B) Typeform (statement + required Yes)
Statement:
“Do you agree to receive text messages about your request at the phone number provided (including automated texts)? Msg & data rates may apply. Msg frequency varies. Reply STOP to cancel, HELP for help.”
Choice:
“Yes, I agree” (required)

C) Meta / Facebook Lead Ads (Disclaimer)
Primary disclaimer text:
“By submitting, you agree to receive text messages about your request from [Business Name] at the number provided (including automated texts). Consent not required to purchase. Msg frequency varies. Msg & data rates may apply. Reply STOP to cancel, HELP for help. Terms/Privacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (add final Terms/Privacy URLs).”

2) REQUIRED FIRST MESSAGE TEMPLATE (must include identification + opt-out)
Send immediately after lead capture.
Template:
“Hi {{first_name}}—this is {{business_name}}. Got your request for {{service}} in {{city}}. A quick question so we can help: what’s the best time for a call today? Reply 1) Morning 2) Afternoon 3) Evening. Reply STOP to opt out.”
Rules:
- Identify business in first message.
- One question at a time; avoid hype/discount language.
- Always include “Reply STOP to opt out” in first message and periodically thereafter.

3) AI QUALIFICATION FLOW (short, low-risk)
Q1 (timing): “What day works best for service/estimate? 1) Today 2) This week 3) Next week. Reply STOP to opt out.”
Q2 (job type): “What do you need help with? Reply with a short description (e.g., ‘water heater install’).”
Q3 (location): “What’s your ZIP code?”
Handoff to booking:
“Thanks—want to book a time? Reply A for the next available slot or B to suggest a time.”

4) STOP / HELP HANDLING (implementation spec)
Must be global across all clients.

A) Keywords (case-insensitive; trim punctuation)
STOP set: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
HELP set: HELP, INFO, SUPPORT

B) Behavior
- On inbound STOP keyword:
  1) Add phone to Global Suppression List immediately.
  2) Send one confirmation message:
     “You’re unsubscribed and will no longer receive texts. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
  3) Block ALL future outbound to this phone across all campaigns/clients unless explicit re-consent captured.
- On inbound HELP keyword:
  Send:
  “Help: You’re receiving texts because you requested info from {{business_name}}. Msg frequency varies. Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to.”
- On inbound START (or YES) after STOP:
  Only re-enable if you can confirm a fresh opt-in event (new form submission or explicit “Yes, I agree to receive texts”). Otherwise respond:
  “To re-subscribe, please submit your request again on our website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. Reply STOP to opt out.”

C) Logging requirements (for audits)
Store these fields per outbound/inbound event:
- phone_e164, business_id/client_id, lead_source, consent_text_version, consent_timestamp_utc, consent_method (checkbox/typeform/meta), consent_ip (if available), consent_user_agent (if available), message_body, direction (in/out), timestamp_utc, message_provider_id (Twilio SID), stop_state (active/suppressed), suppression_reason (STOP keyword), operator (system/user).

5) QUIET HOURS (minimum viable)
Policy: Do not initiate outbound texts outside 8:00am–8:00pm recipient local time.

Timezone resolution order:
1) Lead ZIP/city → timezone lookup
2) Phone number area code fallback
3) If unknown: default to client’s timezone but queue for next 10:00am local

Behavior:
- If lead arrives during quiet hours: send nothing immediately; queue first message for next permitted window (e.g., 8:05am local).
- If human agent manually overrides: allow sending but log override_reason.
- If lead replies inbound during quiet hours: it’s allowed to respond (carrier/compliance-friendly), but keep responses minimal and avoid re-initiating marketing.

6) TWILIO DELIVERABILITY GUARDRAILS (agency-facing)
- Use a Twilio Messaging Service (don’t send ad-hoc from random numbers).
- Keep messages transactional and specific to the lead’s request; avoid “free”, “guaranteed”, excessive punctuation, ALL CAPS.
- Minimize links; if needed, use one branded domain and keep it consistent.
- Avoid sending the same body to many recipients; insert dynamic context (service/city).
- Throughput: ramp gradually; don’t blast large volumes on day 1.
- If using long code at scale: prepare A2P 10DLC Brand + Campaign registration (campaign description must match opt-in language and use-case: “customer care / conversational / lead response”).

7) AGENCY HANDOFF (what partners do)
- Step 1: Add the checkbox/disclaimer copy above to the form/ad.
- Step 2: Ensure phone is required and collected in E.164-compatible format.
- Step 3: Confirm first message includes business identification + STOP.
- Step 4: Confirm quiet hours set to 8am–8pm recipient local time.
- Step 5: Confirm STOP/HELP works (test with your own phone): send STOP → receive confirmation → further messages blocked; send HELP → receive help info.
Support: agent_bob_replit+lead-copilot@agentmail.to

This MVCP is sufficient for pilots to send compliant lead-response texts, reduce deliverability issues, and eliminate the common “what about TCPA/STOP/quiet hours?” objections during closing.