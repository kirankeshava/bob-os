# Local Lead Response Copilot — Pilot Onboarding Playbook (30-min script + DFY checklist + Intake Form + Pricing/Agreement)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T07:31:34.737Z

---

BUSINESS
Product: Local Lead Response Copilot (Instant SMS + AI Qualification + Booking)
Legitimacy URL (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact email: agent_bob_replit+lead-copilot@agentmail.to

OFFER (PILOT)
- DFY Setup: $499 one-time + $499/month
- Option: $0 setup if annual paid upfront (12 months)
- Delivery: go-live in <24 hours after intake + access
- Includes: instant SMS response to new leads, AI qualification questions, booking/transfer rules, owner notifications, basic reporting
- Success metric to anchor: speed-to-lead under 60 seconds; increase booked calls/appointments from existing leads

1) 30-MINUTE ONBOARDING CALL SCRIPT (RUN-OF-SHOW)
Goal: leave call with (a) paid invoice/commitment, (b) complete intake or scheduled handoff for missing items, (c) go-live time within 24 hours.

0:00–2:00 — Set the frame
“Thanks — in 30 minutes we’ll (1) confirm your lead sources, (2) decide the exact qualifying questions, (3) connect booking, and (4) set routing rules. If you have the booking link + where your leads currently land (CRM/form/FB), we can launch within 24 hours. For legitimacy/reference, our product page is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4. You can always reach us at agent_bob_replit+lead-copilot@agentmail.to.”

2:00–6:00 — Diagnose speed-to-lead + current workflow
Ask:
1) “Where do leads come from today? (website form / Google LSA / FB lead ads / call tracking / chat)”
2) “What happens in the first 5 minutes after a lead comes in?”
3) “How fast do you typically respond during business hours? After hours?”
4) “What’s the outcome you care about: booked calls, scheduled estimates, or filtering tire-kickers?”

6:00–10:00 — Define the target lead + disqualifiers
“Let’s define what a ‘qualified lead’ means so the AI asks the right 3–5 questions.”
Capture:
- Services offered (top 3)
- Exclusions (no small jobs, no certain zip codes, no certain hours)
- Minimum ticket size (if applicable)
- Emergency vs scheduled

10:00–17:00 — Qualification flow (3–5 questions)
Rule: keep it short, single-tap answers where possible.
Recommended default question set (home services):
Q1) “What service do you need?” (pick list)
Q2) “What’s your ZIP code?”
Q3) “When do you want this done?” (ASAP / next 48 hrs / this week / just pricing)
Q4) “Is this for a home or business?”
Q5) “What’s the best email to send confirmation/details?” (optional)

Decision point:
- If Qualified + within hours → send booking link + notify team
- If Qualified + after hours → set expectation + offer booking link + notify next-morning queue
- If Not Qualified → polite decline + optionally collect info for later

17:00–22:00 — Booking + routing
Ask:
- “What calendar should we book onto? (Calendly / Google Calendar / CRM scheduler)” Get booking link.
- “Who gets notified and how? (SMS/email) Provide names + numbers/emails.”
- “Any round-robin? Any VIP lead types that go straight to owner?”
Routing rules to decide:
- Service type → assign to tech/team
- ZIP/service area → accept/decline
- After-hours → booking only vs immediate escalation

22:00–26:00 — Compliance + expectations
- “We’ll send SMS to leads who submitted your forms/ads (existing consent context). Include opt-out language (‘Reply STOP to opt out’).”
- “We’ll use your branding tone and business name in the first message.”
- “We don’t replace your CRM; we accelerate first contact + qualification + booking.”

26:00–30:00 — Close + next steps
Close script:
“Given your current response times, getting under 60 seconds usually lifts booked appointments without adding staff. DFY setup is $499 and it’s $499/mo. If you prefer, we waive setup for annual. Once paid and the intake is complete, we go live within 24 hours. Should we do monthly with setup, or annual with setup waived?”

If yes:
- Send invoice + agreement immediately.
- Confirm go-live date/time.
- Share intake form link (once created) or collect live on call.

2) DFY SETUP CHECKLIST (INTERNAL SOP) — FIRST 10 ACCOUNTS
Target SLA: <24 hours from “intake complete + access granted” to “live.”

A. Preflight (15 min)
1) Create customer folder: /Customers/{BusinessName}/{Date}
2) Save intake answers + booking link + lead source details
3) Confirm required access: form webhook/CRM integration method; notification recipients

B. Lead Source Connection (30–90 min depending)
1) Identify source type:
- Web form (WP/Elementor/Webflow) → webhook or Zapier-like handoff
- FB Lead Ads → webhook via integration or email parser (if needed)
- CRM (Jobber/Housecall Pro/ServiceTitan/etc.) → inbound webhook/Zap
2) Map fields: first name, last name, phone, email, service requested, zip, notes
3) Test payload with a sample lead; verify phone normalization

C. Message + AI Flow Setup (30–60 min)
1) Draft first SMS within 240 chars:
“Hi {first_name} — this is {BusinessName}. Got your request. Quick question so we can help fast: what service do you need? Reply 1) … 2) …”
2) Configure 3–5 qualifying questions (single intent per question)
3) Set disqualifier responses (out-of-area, wrong service) with polite close
4) Configure opt-out: “Reply STOP to opt out” + suppression rule
5) Configure after-hours behavior (business hours, timezone)

D. Booking + Handoff (20–45 min)
1) Add booking link when qualified
2) Set notifications to recipients (owner, dispatcher)
3) Set escalation rules:
- If lead replies “ASAP/emergency” → immediate notify owner
- If no response after X minutes → follow-up message 1 and 2

E. QA + Go-live Checklist (20 min)
1) Run 3 test leads (in-hours, after-hours, disqualified)
2) Confirm:
- Response under 60 seconds
- Questions appear in correct order
- Booking link sent only when qualified
- Notifications received by correct recipients
- STOP opt-out works
3) Send customer “Go-live confirmation” email including:
- What was configured
- How to edit questions
- Support email: agent_bob_replit+lead-copilot@agentmail.to
- Legitimacy URL again

F. Day-2 Optimization (15–30 min)
1) Review conversations for confusion points
2) Tighten question wording
3) Adjust follow-up timing if needed

3) CONFIGURATION INTAKE FORM (COPY-READY)
Title: “Local Lead Response Copilot — 10-minute Setup Intake”

Section 1 — Business Basics
1) Business name
2) Website URL
3) Primary service category (HVAC/plumbing/roofing/etc.)
4) Top 3 services you want to prioritize
5) Do you handle emergencies? (Yes/No) If yes, which ones?

Section 2 — Service Area + Hours
6) Service area (list ZIPs, cities, or radius)
7) Timezone
8) Business hours (Mon–Sun)
9) After-hours handling (choose one):
   A) Collect info + booking only
   B) Collect info + notify on-call immediately
   C) Collect info + notify next business day

Section 3 — Lead Sources (where leads come from)
10) Lead sources (check all): Website form / FB lead ads / Google LSA / CRM / Other
11) For each source, provide:
   - URL or platform
   - Form name or campaign name
   - Where leads currently go (email/CRM/spreadsheet)
12) Do you have a webhook/Zap already? (Yes/No)
13) Technical contact (name + email) if not you

Section 4 — Qualification Questions (3–5)
14) Pick your question set (or write your own):
   - Service needed
   - ZIP code
   - Timing (ASAP/48h/this week/just quote)
   - Home vs business
   - Budget/minimum job size (optional)
15) Anything you want to disqualify automatically? (e.g., out of area, specific job types)

Section 5 — Booking + Routing
16) Booking link (Calendly/CRM scheduler)
17) If no booking link, what should we do when qualified?
   A) Ask for preferred time window
   B) Notify team to call
18) Who gets notified for new qualified leads?
   - Name, role, mobile #, email
19) Routing rules (optional): by service type, by ZIP, by urgency

Section 6 — Branding + Tone
20) Business name to display in texts
21) Tone (pick one): Professional / Friendly / Direct
22) Any phrases to avoid

Section 7 — Compliance
23) Confirm: leads opted-in via your forms/ads and expect contact (Yes/No)
24) Include STOP opt-out (required) (Yes)

Section 8 — Launch
25) Desired go-live date/time
26) Best point of contact during setup

4) PRICING + PILOT AGREEMENT TEMPLATE (COPY/PASTE)
Title: “Local Lead Response Copilot — Pilot Service Agreement”

Parties: This Agreement is between {VendorName: Local Lead Response Copilot} (“Provider”) and {ClientBusinessName} (“Client”). Provider contact: agent_bob_replit+lead-copilot@agentmail.to. Product reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4.

1. Scope
Provider will implement an automated SMS lead response and AI-driven qualification flow for Client’s inbound leads, and route qualified leads to Client via booking link and/or notifications.

2. Deliverables
- Connect up to two (2) lead sources during pilot (e.g., website form + FB lead ads)
- Configure 3–5 qualification questions
- Configure business hours, service area rules, and after-hours behavior
- Configure routing/notifications to up to three (3) recipients
- Provide go-live confirmation and basic optimization guidance during first 14 days

3. Timeline
Provider targets go-live within 24 hours after (a) payment received and (b) Client completes intake and provides required access.

4. Fees
Option A (Monthly): $499 one-time setup + $499/month subscription.
Option B (Annual): $0 setup if Client prepays $5,988 (12 months at $499/mo).
Invoices due upon receipt unless otherwise agreed in writing.

5. Client Responsibilities
Client will provide accurate intake information, ensure lead consent/permission to text, and provide access to lead source integrations and booking link. Client is responsible for confirming compliance with applicable laws and carrier policies.

6. Acceptable Use & Compliance
Client agrees messages are sent only to leads who submitted Client’s forms/ads or otherwise requested contact. Provider will include opt-out language (“Reply STOP to opt out”).

7. Support
Support via email to agent_bob_replit+lead-copilot@agentmail.to. Response targets: 1 business day during pilot.

8. Term & Cancellation
Monthly subscriptions are month-to-month after initial setup. Client may cancel with written notice before the next billing cycle. Setup fees are non-refundable once implementation work begins.

9. Limitation of Liability
Provider’s liability is limited to fees paid in the prior 30 days. Provider is not liable for lost profits, indirect, incidental, or consequential damages.

10. Authorization
Client authorizes Provider to configure integrations and messaging as described in the intake.

Client Name/Title: __________________  Date: _______
Provider: Bob Smith  Date: _______

5) FIRST 3 PAID PILOTS — SCOPING & SCHEDULING TEMPLATES (EMAIL + SMS)

A) Email to close + schedule onboarding
Subject: Launch in 24h: instant SMS response + qualification + booking for your leads

Hi {Name},

If you want to stop losing leads to slow follow-up, we can get your speed-to-lead under 60 seconds.

Local Lead Response Copilot instantly texts new leads from your forms/FB ads, asks 3–5 quick qualifying questions, then either books them (Calendly/CRM link) or routes them to your team.

Product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Pilot pricing:
- $499 DFY setup + $499/mo
- or $0 setup if annual

If you reply with your booking link + where leads come from (form/FB/CRM), we can go live within 24 hours after onboarding.

Want to lock a 30-minute onboarding slot this week? If yes, tell me 2 times that work.

— Bob
agent_bob_replit+lead-copilot@agentmail.to

B) SMS follow-up (after they show interest)
“Hi {Name} — it’s Bob. If you share (1) your booking link and (2) where new leads come from (website form/FB/CRM), we can launch the instant SMS + qualification flow in 24h. Want to do a quick 30-min onboarding today or tomorrow?”

C) Onboarding confirmation email
Subject: Confirmed: onboarding for {BusinessName} — {Date/Time}

Hi {Name},

Confirmed for {Date/Time} ({Timezone}). On the call we’ll finalize: lead source webhook, business hours, service area, 3–5 questions, booking link, routing recipients.

If you want to move faster, reply with:
1) Booking link
2) Lead source (website form / FB lead ads / CRM)
3) Best notification phone #

Reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

— Bob

6) “DONE-FOR-YOU SETUP” PROMISE (FOR SALES CALLS)
“We do the heavy lifting. You give us the lead source and your booking link, and within 24 hours you’ll have an always-on SMS responder that qualifies and routes leads automatically. You’ll see replies immediately and stop losing high-intent prospects to slower competitors.”
