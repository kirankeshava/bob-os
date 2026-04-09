# Local Lead Response Copilot — SMS Compliance + Deliverability Hardening Pack (Opt-in, STOP/HELP, Quiet Hours, Twilio 10DLC, Agency Handoff)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T07:16:13.087Z

---

Business: Local Lead Response Copilot (Instant SMS + AI Qualification) 
Business contact email (for HELP + compliance): agent_bob_replit+lead-copilot@agentmail.to

DISCLAIMER (internal): This document is operational guidance, not legal advice. For high scale or regulated verticals, have counsel review TCPA/CTIA/telecom requirements.

====================================================
1) COMPLIANCE CHECKLIST (TCPA/CTIA/CARRIER-ALIGNED)
====================================================
A. Consent & disclosure (must-have)
- Capture EXPRESS WRITTEN CONSENT for marketing/promotional messaging when applicable. For purely transactional/appointment messages, still obtain express consent to text.
- Disclose: (1) you will text, (2) what it’s for (updates/quotes/scheduling), (3) approximate frequency, (4) “Msg & data rates may apply”, (5) “Reply STOP to opt out, HELP for help”, (6) not required as a condition of purchase.
- Store consent record: timestamp, source (Webflow/Typeform/FB), form URL/ad id, IP/user agent when available, phone number, and the exact disclosure text shown at time of consent (versioned).

B. Identity & transparency
- First message should identify the business/service provider (the client brand) and why you’re texting (“You requested a quote / submitted a form”).
- Provide a clear support contact: agent_bob_replit+lead-copilot@agentmail.to and (optionally) a phone number.

C. Opt-out handling (STOP)
- Honor opt-out immediately. Once STOPped, block all future outbound from all campaigns/workflows unless the user re-subscribes with clear opt-in.
- Accept common opt-out keywords: STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT.
- Send a single confirmation message: “You’re unsubscribed. No more texts. Reply START to resubscribe.” Then stop.

D. HELP handling
- Accept HELP keyword. Respond with who you are + how to opt out + support email.

E. Quiet hours
- Avoid messaging during typical quiet hours (recommended 8pm–8am local recipient time) unless purely transactional and time-sensitive.
- Enforce time by recipient timezone where possible.

F. Content rules (reduce carrier filtering)
- Avoid spam-like phrasing: “FREE”, “Act now”, “Guaranteed”, excessive caps, repeated exclamation, misleading urgency.
- Minimize use of link shorteners; use branded domain.
- Do not include sensitive content. Don’t ask for SSN/credit card.
- Keep early messages short and conversational.

G. Data handling
- Store phone numbers securely; ensure suppression lists are global.
- Retain consent + opt-out logs for at least 4 years (TCPA litigation risk) or per counsel.

=================================
2) OPT-IN / CONSENT COPY TEMPLATES
=================================
Use these snippets verbatim where possible. Replace bracketed items with the client’s business name, website URL, and links to Privacy/Terms.

2.1 Webflow / website form checkbox (recommended)
Checkbox label:
“I agree to receive text messages from [Business Name] about my request (quotes, scheduling, and updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

Under-checkbox microcopy (optional):
“By submitting, you confirm you are the owner/user of this phone number. See Privacy: [Privacy URL] and Terms: [Terms URL].”

2.2 Typeform (consent statement + yes/no)
Add a required “Yes, text me” question:
Prompt:
“Can we text you about your request?”
Options:
- “Yes — text me”
- “No — email/call only”
Description (small text):
“By selecting Yes, you agree to receive text messages from [Business Name] related to your request (quotes, scheduling, updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent not required to purchase. Privacy: [Privacy URL].”

2.3 Facebook/Meta Lead Ads (higher scrutiny)
In the Lead Form “Privacy Policy” and “Custom Disclaimer” fields, use:
Custom disclaimer:
“By submitting this form, you agree to receive text messages from [Business Name] about your request (quotes, scheduling, and appointment updates). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Consent is not a condition of purchase.”

Add link to Privacy Policy:
[Privacy URL]
(Optional) Add Terms link:
[Terms URL]

2.4 For existing customers (transactional)
“If you’d like, we can text you appointment reminders and updates. Reply YES to opt in. Msg & data rates may apply. Reply STOP to opt out, HELP for help.”

========================================
3) MESSAGE TEMPLATES (COMPLIANT + DELIVERABLE)
========================================
Guidelines:
- Include business name quickly.
- Mention the user action (“you requested…”) in the first message.
- Always support STOP/HELP.
- Keep links minimal and branded.

3.1 Initial speed-to-lead message (after form submit)
“Hi {first_name} — this is {agent_name} with {business_name}. Got your request for {service}. A couple quick questions so we can get you an exact quote. Reply STOP to opt out.”

If no name:
“Hi — this is {agent_name} with {business_name}. We received your request for {service}. Quick questions to get you pricing. Reply STOP to opt out.”

3.2 Qualification Q1 (service scope)
“Which of these best describes what you need? 
1) Repair 
2) Replace 
3) New install 
Reply 1, 2, or 3.”

3.3 Qualification Q2 (timeline)
“When are you looking to start? 
A) ASAP 
B) This week 
C) Next 2–4 weeks 
Reply A, B, or C.”

3.4 Qualification Q3 (location)
“What’s the job address or ZIP code?”

3.5 Booking handoff (call booking)
“Thanks — we can get you on the schedule. What’s the best time for a quick call? 
1) Morning 
2) Afternoon 
3) Evening”

If you have a booking link (recommended branded domain):
“Easiest is to pick a time here: {booking_link}. If you’d rather text, tell me 1) morning 2) afternoon 3) evening. Reply STOP to opt out.”

3.6 Missed call text-back (inbound call missed)
“Hi — sorry we missed you. This is {business_name}. What service do you need help with? Reply here and we’ll get you scheduled. Reply STOP to opt out.”

3.7 Re-engagement (after no response, 24–48 hrs)
“Just checking in — still want help with {service}? Reply YES and we’ll get you booked, or NO and we’ll close this out. Reply STOP to opt out.”

3.8 Payment-sensitive avoidance
Do NOT ask: “Send card info.” Instead:
“If you’d like to pay by card, we can take payment securely over the phone. What time works?”

============================
4) STOP / HELP IMPLEMENTATION
============================
4.1 Keywords to treat as OPT-OUT (case-insensitive, trim punctuation)
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT

4.2 Opt-out confirmation message (send once)
“You’re unsubscribed and will no longer receive texts from {business_name}. Reply START to resubscribe. Reply HELP for help.”

4.3 HELP message (send on HELP)
“{business_name}: texting about your request (quotes/scheduling/updates). Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to.”

4.4 START / RESUBSCRIBE handling
- If user texts START (or YES in a resubscribe flow), mark them resubscribed only if you can log it as a new consent event with timestamp + message content.
- Send confirmation:
“You’re resubscribed. Msg frequency varies. Reply STOP to opt out.”

4.5 Enforcement rules (critical)
- Maintain a GLOBAL suppression list per end-customer (and ideally across all tenants if you share numbers) so STOP applies across all flows.
- Any outbound attempt to a suppressed number should be blocked at send-time and logged as “blocked_suppressed”.

4.6 Logging requirements (audit-ready)
Store events:
- consent_captured: {phone, timestamp, source, disclosure_version, disclosure_text, ip, user_agent, form_url, ad_id}
- inbound_message: {phone, timestamp, body, channel, message_sid}
- opt_out: {phone, timestamp, keyword, message_sid}
- help_request: {phone, timestamp, message_sid}
- outbound_message: {phone, timestamp, template_id, body, status, message_sid}

===============================
5) QUIET HOURS (TIMEZONE) SPEC
===============================
Goal: prevent late-night texts that trigger complaints/blocks while preserving fast response.

5.1 Default policy
- Quiet hours: 8:00 PM to 8:00 AM recipient local time (configurable per tenant).
- If lead arrives during quiet hours:
  - Send nothing immediately OR send a single ultra-transactional acknowledgement if client chooses (recommended default: queue).
  - Queue the first outreach for next allowed window (e.g., 8:05 AM).

5.2 Timezone resolution (best-to-worst)
1) If form captures ZIP/address: map to timezone.
2) Else if area code mapping: approximate timezone (with DST considerations).
3) Else default to tenant timezone.
Always store resolved_timezone and resolution_method.

5.3 Queue behavior
- If lead submits at 7:58 PM local: send immediately.
- If lead submits at 8:01 PM local: schedule to next day 8:05 AM local.
- If multiple messages would send during quiet hours: coalesce to a single first message at open.

5.4 Override rules
- Allow tenant toggle: “Transactional after-hours allowed” for true appointment reminders/confirmed jobs.
- Never override for marketing blasts.

============================================
6) TWILIO DELIVERABILITY HARDENING (10DLC)
============================================
6.1 Use a Messaging Service
- Create a Twilio Messaging Service per tenant (or per vertical) and attach:
  - One or more A2P-registered 10DLC numbers (or toll-free as alternative).
  - Compliance features: advanced opt-out (if using Twilio’s), sticky sender (recommended), smart encoding.
- Route all outbound through the Messaging Service (not direct-from-number).

6.2 A2P 10DLC registration (as needed)
- For US long codes at scale, register:
  - Business Profile
  - Brand
  - Campaign (use-case: “Customer Care” or “Mixed” depending on content)
- Provide accurate sample messages including STOP language.
- Ensure campaign description matches actual flows (lead response + scheduling).

6.3 Content + throughput tips
- Early messages should be low-risk, low-link. Add links only after engagement.
- Avoid URL shorteners.
- Avoid repeated identical messages across many recipients in short windows.

6.4 Fallback behaviors
- If message fails with carrier filtering or blocked:
  - Retry once after 2–5 minutes (only for transactional).
  - If still fails: attempt email (if captured) and/or create a task for manual call.
  - Log failure reason codes.

6.5 Monitoring
- Track: delivery rate, carrier error codes, spam/blocked indicators, opt-out rate.
- Alert thresholds (suggested): opt-out > 4% in a day, delivery < 85% over 200 msgs, spike in “unknown handset”.

================================================
7) AGENCY HANDOFF: COPY/PASTE + IMPLEMENT STEPS
================================================
What agencies need to do (minimum):
1) Add consent disclosure to the lead capture source (Webflow/Typeform/FB Lead Ad) using the snippets above.
2) Ensure the phone field is required and formatted to E.164 if possible.
3) Pass to Lead Response Copilot:
   - phone, first name, service requested, address/ZIP, and lead source.
4) Confirm Quiet Hours policy (default 8pm–8am local) and whether after-hours acknowledgement is allowed.
5) Confirm STOP/HELP keywords are supported and that the first message includes business identity.
6) Provide working links for Privacy Policy + Terms (hosted on client site). If unavailable, agencies must create basic pages before scaling ads.

Agency FAQ (ready to paste into onboarding email):
- “Will this be TCPA compliant?”
  - “We require explicit consent language on the form/ad, we honor STOP immediately, and we log consent/opt-out events for auditing. Your ads/forms must include the provided disclosure text.”
- “Do we text at night?”
  - “By default no—quiet hours are enforced by the lead’s timezone.”
- “Can we send promos?”
  - “Not until marketing consent language is in place and your messaging use-case matches your A2P campaign registration.”

====================================
8) INTERNAL VERIFICATION (WHAT ‘VERIFIED’ MEANS)
====================================
STOP handling verified checklist:
- Send inbound “STOP” from a test phone.
- System logs opt_out event and adds phone to suppression list.
- System sends opt-out confirmation once.
- Any subsequent outbound attempt to that phone is blocked (and logged as blocked_suppressed).
- Send inbound “HELP”; system replies with HELP message including agent_bob_replit+lead-copilot@agentmail.to.

If any of the above fails, do not scale traffic.
