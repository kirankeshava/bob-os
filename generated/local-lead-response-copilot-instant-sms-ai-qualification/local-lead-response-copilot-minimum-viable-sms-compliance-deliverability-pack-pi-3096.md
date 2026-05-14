# Local Lead Response Copilot — Minimum Viable SMS Compliance + Deliverability Pack (Pilot Launch)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T22:24:05.788Z

---

Purpose (wartime scope)
This document is the minimum viable set of compliance + deliverability assets required to safely run free pilots for Local Lead Response Copilot (instant SMS + AI qualification) without triggering common carrier enforcement issues or TCPA/CTIA objections. It is designed for agencies to copy/paste and for engineering to implement quickly.

Legitimacy + support references (use everywhere)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support email: agent_bob_replit+lead-copilot@agentmail.to

A) Copy/paste opt-in language (required)
1) Webflow / embedded form checkbox (recommended)
Add a required checkbox label:
“I agree to receive SMS texts about my request (quotes, scheduling, and follow-ups) at the number provided. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. See Privacy Policy and Terms: [PRIVACY_URL] [TERMS_URL].”
Store fields: phone, timestamp, page URL, checkbox=true, IP (if available), and form name.

2) Typeform (statement + checkbox)
Statement (near phone field):
“By providing your phone number, you consent to receive text messages about your request (quotes/scheduling). Msg & data rates may apply. Reply STOP to opt out, HELP for help. Privacy/Terms: [PRIVACY_URL] [TERMS_URL].”
Add yes/no: “I agree to receive SMS about my request.” (must be Yes)

3) Meta/Facebook Lead Ads (higher risk—use explicit disclaimer)
In the lead form ‘Custom disclaimer’ or intro text:
“By submitting, you agree to receive SMS texts about your request (quotes, scheduling, follow-ups). Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help. Privacy/Terms: [PRIVACY_URL] [TERMS_URL].”
Operational note: ensure the ad/account is configured so the phone number collected is the same number messaged. Do not append purchased lists.

B) STOP/HELP handling (must-implement)
Supported keywords (case-insensitive, trim punctuation):
- STOP, STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT
Behavior on inbound STOP-like keyword:
1) Immediately mark recipient as “suppressed=true” in a global suppression list keyed by E.164 phone.
2) Send one confirmation message (only once per opt-out event):
“You’re opted out and will no longer receive texts. Reply START to re-subscribe. For help email agent_bob_replit+lead-copilot@agentmail.to.”
3) Block all future outbound messages to suppressed numbers across all clients/campaigns.

HELP keyword:
- On inbound HELP, respond:
“Help: This number sends updates about your request (quotes/scheduling). Reply STOP to opt out. Support: agent_bob_replit+lead-copilot@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

START keyword (optional but recommended):
- If suppressed=true and inbound START/YES, set suppressed=false and send:
“You’re re-subscribed. Reply STOP to opt out anytime.”

Required audit logs (minimum)
For every inbound/outbound event store: timestamp (UTC), to/from E.164, message body, message SID/provider id, lead source, consent record id, suppression state before/after.

C) Quiet hours (minimum viable)
Default sending window: 8:00am–8:00pm recipient local time, 7 days/week.
Timezone resolution order:
1) Lead-provided timezone (if captured)
2) Business/service-area timezone configured per client account
3) Phone number area-code inference (fallback)
4) Final fallback: client account timezone
If message would send during quiet hours:
- Queue the message for next allowed window start (8:00am local) and mark status=queued_quiet_hours.
Emergency override (optional): allow manual send by owner role, but never for marketing blasts—only for active request handling.

D) Message templates (pilot-safe)
1) First response (immediate)
“Hi {{first_name}}, it’s {{business_name}}—got your request. A couple quick questions so I can get you the right option. What city is the job in?”

2) Qualification (2–4 questions max)
“Thanks. What service do you need? (Reply 1) Repair 2) Install 3) Estimate)”
“Great—when are you looking to start? (Today/This week/This month)” 

3) Booking handoff
“I can get you scheduled. What day/time works best for a quick call? Reply with 2 options.”

4) Missed call text-back
“Sorry we missed you—this is {{business_name}}. Texting is fastest. What can we help with?”

Always avoid:
- ALL CAPS, excessive punctuation, repeated links, “free!!!”, “limited time”, “act now”, URL shorteners.

E) Twilio deliverability minimums (pilot)
- Use a Twilio Messaging Service (even for low volume) so you can manage sender pool, sticky sender, and opt-out handling consistently.
- Keep templates consistent; minimize link usage; if linking, use the business’s primary domain when available.
- A2P 10DLC: if using US long code at scale, plan to register Brand + Campaign before ramping volume. For pilots with low volume you can begin with best-practice content + consent logging; move to registration as soon as you see consistent outbound volume or carrier filtering.

F) Agency go-live checklist (copy/paste)
1) Install opt-in language in the lead capture source (Webflow/Typeform/FB).
2) Ensure phone is required and consent checkbox is captured when possible.
3) Confirm STOP/HELP works and suppression blocks future sends.
4) Confirm quiet-hours queueing works.
5) Send test lead through and confirm first response arrives within 60 seconds.
6) Confirm support details appear in HELP response: agent_bob_replit+lead-copilot@agentmail.to and website URL.

Owner action required (to remove placeholders)
Publish Privacy Policy + Terms pages on the website and replace [PRIVACY_URL]/[TERMS_URL] in all snippets. Until live URLs exist, do not claim specific legal page links in ads—use the website URL as an interim reference.