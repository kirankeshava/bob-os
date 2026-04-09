# Outbound Execution Playbook (200 Sends in 7 Days) — Targeting, Sequences, Personalization, Tracking, and Reply Triage

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T20:10:59.627Z

---

Business: Local Lead Response Copilot (Instant SMS + AI Qualification)
Proof URL to share: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply-to/support email: agent_bob_replit+lead-copilot@agentmail.to

GOAL (7 days)
- 200 total outbound touches (email + LinkedIn; SMS only where compliant/relationship exists)
- 20 replies, 10 demos booked

1) TARGET SPLIT + PRIORITY
A) Agencies (120 targets)
- Signals: “Facebook Lead Ads”, “Lead generation”, “home services marketing”, “PPC + FB”, “appointment setting”, “GHL”, “HubSpot”, “zapier automations”.
- Buyer: Owner/Founder, Head of Growth, Paid Social Director.
- Why they buy: reduces lead leakage, improves conversion, differentiates their offer, low lift.

B) Operators (80 targets)
- Niches: Roofing, HVAC, Plumbing, Pest, Water Damage/Mold, Med Spa.
- Signals: running “Request estimate” forms, after-hours leads, FB ads visible, call-only phone number with slow response.
- Buyer: Owner/GM/Marketing manager.

2) DAILY CADENCE + DELIVERABILITY (NO SPEND)
Day 1–2 (warmup):
- 10–20 1:1 emails/day (hand-personalized), no links in the first 5 if the inbox is brand new.
- Goal: replies (even “no thanks”) to establish reputation.

Day 3–7 (scale):
- 40–60 emails/day + 30–40 LinkedIn connection requests/day.
- Follow-up (step-2) goes out 48–72 hours after step-1.

Guardrails:
- Keep sending windows consistent (9–11am local + 1–3pm local).
- Use plain text emails.
- Use 1 link max (Calendly) OR 1 proof link (website). Prefer Calendly only after warmup.
- Stop after 2 emails + 1 LinkedIn follow-up unless they engage.

3) 60-SECOND PERSONALIZATION WORKFLOW (PER PROSPECT)
Step A (20 seconds): open their website/Clutch/LinkedIn and capture ONE specific.
Examples:
- “Saw you run FB lead gen for roofers in Phoenix.”
- “Noticed you mention GHL + automations in your offer.”
- “Your site pushes ‘free estimate’ with a form—do leads wait overnight?”

Step B (20 seconds): pick the angle:
- Speed-to-lead: “Text in <60 seconds; qualify + book automatically.”
- After-hours capture: “night/weekend leads answered instantly.”
- Agency differentiation: “adds measurable lift; helps you retain accounts.”

Step C (20 seconds): insert into the template as 1 line, do not over-write.

4) SEQUENCE #1 — AGENCY (2-STEP EMAIL)
Email 1 (Agency)
Subject options:
- “Quick idea to lift your FB lead gen conversions”
- “{AgencyName} — speed-to-lead add-on?”

Body (plain text):
Hi {FirstName} — {PersonalLine}

I’m Bob. We built Local Lead Response Copilot: it instantly texts new form/FB leads, asks 2–4 smart questions to qualify, then books a call/appointment.

For home services, response time is the conversion lever. This is meant to plug lead leakage (especially after-hours) and give you a simple “speed-to-lead” win you can roll into client retainers.

Want to try a free 7-day pilot on one of your accounts? If it doesn’t improve contact rate / booked calls, you can drop it.

Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

If you’re open, grab a time: {CalendlyLink}
Or reply with “pilot” and which niche you focus on.

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (Agency) — 48–72h later
Subject: “Re: speed-to-lead add-on?”

{FirstName}, quick follow-up — do you have any clients where leads come in nights/weekends and the first human response is delayed?

That’s the exact gap this solves (instant SMS + short qualification + booking). Free 7-day pilot.

Worth testing on one account this week?
{CalendlyLink}

— Bob

5) SEQUENCE #2 — OPERATOR (2-STEP EMAIL)
Email 1 (Operator)
Subject options:
- “Missed leads after-hours?”
- “Idea for {CompanyName} lead response time”

Body:
Hi {FirstName} — {PersonalLine}

I’m Bob. We built a lightweight “lead response copilot” for local businesses: when a new lead comes in (form/FB), it texts them instantly, asks a couple quick questions, and then books the job/call automatically.

Most shops lose the highest-intent leads just because response takes hours.

I can set you up on a free 7-day pilot. If you don’t see more conversations/appointments, you keep nothing.

Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book: {CalendlyLink}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (Operator) — 48–72h later
Subject: “Re: faster lead response”

{FirstName}, should I close the loop?

If you’re getting even a few leads/day, texting them in the first minute usually makes a visible difference. Free 7-day pilot; I’ll help you set it up.

Want me to send the 2–3 questions we use to qualify {Niche} leads?

— Bob

6) LINKEDIN SCRIPTS
Connection note (Agency):
“Hi {FirstName} — saw you run lead gen for {Niche/Local}. I’m building an instant SMS + qualification + booking ‘speed-to-lead’ add-on. Open to a free 7-day pilot test?”

Connection note (Operator):
“Hi {FirstName} — quick question: do you ever lose leads after-hours? I’m testing an instant SMS + booking flow (free 7-day pilot).”

Post-accept message:
“Thanks for connecting. If I send a 30-sec overview + the 2–4 qualifying questions we’d ask your leads, would you tell me if it’s useful? Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

7) OPTIONAL SMS FOLLOW-UP (ONLY COMPLIANT CONTEXT)
Use ONLY when: inbound lead opted-in, existing relationship, or prospect explicitly asked to text.
Template:
“Hi {FirstName} — Bob here. Sent you an email about a free 7-day pilot: instant text-back + quick qualification + auto-booking for new leads. Want me to share details? agent_bob_replit+lead-copilot@agentmail.to”

8) TRACKING SHEET / CRM (GOOGLE SHEETS)
Tabs:
A) Leads
Columns:
- LeadID
- Segment (Agency/Operator)
- Company
- Niche
- Location
- Contact Name
- Role
- Email
- LinkedIn URL
- Source URL
- Personalization line
- Confidence (H/M/L)
- Status (Not Contacted / Sent-1 / Sent-2 / Replied / Positive / Demo Booked / Not Now / Closed)
- Last Touch Date
- Notes

B) Touch Log
- Date
- LeadID
- Channel (Email/LI/SMS)
- Template (Agency1/Agency2/etc.)
- Outcome

C) Pipeline
- Replied
- Positive
- Demo booked
- Demo held
- Pilot started

D) Daily Scoreboard
- Date
- Emails sent
- LI connects sent
- Replies
- Positive replies
- Demos booked

9) REPLY TRIAGE (RESPOND IN <5 MIN WHEN POSSIBLE)
If positive:
“Awesome — easiest next step is a 15-min setup call. Here’s the link: {CalendlyLink}. If you prefer, reply with 2 times that work and I’ll confirm.”

If “What is it / how much?” (week 1 is free):
“Totally. It’s a speed-to-lead layer: instant SMS to new leads, 2–4 questions to qualify, then booking. Week-1 pilot is free; if it works we discuss ongoing after. Want to see the exact questions + booking flow for your niche?”

If objection “we already respond fast”:
“Great — then this is mainly for after-hours + peak times and to pre-qualify so your team talks to better leads. Want to run it only nights/weekends for 7 days and compare?”

If not now:
“Understood. When should I circle back — 30 or 60 days? Also, if you want, I can email the sample qualification questions so you have them.”

This playbook is ready to execute immediately: enrich 50, send warmup, then scale to 200 total touches while logging every action and booking demos via {CalendlyLink}.