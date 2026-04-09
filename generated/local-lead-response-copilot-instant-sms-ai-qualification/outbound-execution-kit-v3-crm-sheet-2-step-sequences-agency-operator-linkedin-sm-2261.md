# Outbound Execution Kit v3 — CRM Sheet + 2-Step Sequences (Agency/Operator) + LinkedIn/SMS + Personalization Prompts (with Website + Email)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T20:30:07.572Z

---

Below is the complete, copy/paste-ready outbound kit for Local Lead Response Copilot (Instant SMS + AI Qualification). Use the legitimacy URL and contact email in every touch:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply/Support: agent_bob_replit+lead-copilot@agentmail.to

========================
A) TRACKING / CRM (Google Sheets Structure)
========================
Create a Google Sheet with 3 tabs: Leads, Touches, Dashboard.

TAB 1: Leads (one row per account)
Columns:
- lead_id (e.g., A001)
- segment (Agency | Operator)
- company
- niche (HVAC/Plumbing/Roofing/Pest/WaterDamage/MedSpa/MarketingAgency)
- city
- state
- website_url
- source_url (Clutch/UpCity/LinkedIn/GoogleMaps/Upwork/FB group)
- decision_maker_name
- decision_maker_title
- email
- linkedin_person_url
- linkedin_company_url
- phone (optional)
- personalization_note (1 line)
- status (Not Contacted | Contacted | Replied | Qualified | Demo Booked | No Fit | Closed Won)
- last_touch_date
- next_step
- notes

TAB 2: Touches (every message counts toward the “200 outreaches” KPI)
Columns:
- touch_id (T0001)
- lead_id
- date
- channel (Email | LinkedIn | SMS)
- step (1 | 2 | 3)
- template (Agency-1 | Agency-2 | Operator-1 | Operator-2 | LI-Connect | SMS-Followup)
- subject (if email)
- message_snippet (first ~120 chars)
- outcome (Sent | Delivered | Bounced | Opened | Clicked | Replied)
- reply_category (Interested | Not Now | No Fit | Wrong Person | Unsubscribe)

TAB 3: Dashboard
Metrics (formula-driven):
- Total Touches Sent (count Touches outcome=Sent)
- Total Unique Leads Contacted (count unique lead_id in Touches)
- Reply Rate (replies / unique leads)
- Demo Booked (count Leads status=Demo Booked)
- Segment Breakdown (Agency vs Operator)

========================
B) 2-STEP EMAIL SEQUENCE — AGENCIES (FB Lead Gen / Home Services)
========================
TARGET: Owners, Heads of Growth, Media Buyers at agencies running lead gen.
OFFER: 7-day free pilot. Outcome-based: faster response → more booked jobs.

EMAIL 1 (Day 1)
Subject options:
1) quick idea to lift your lead-to-appointment rate
2) speed-to-lead add-on for your {Niche} campaigns
3) can I plug a 60-second “instant response” layer into your funnels?

Body:
Hi {FirstName} — saw {Company} works with {Niche/home services} lead gen.

Quick question: when a new lead comes in (form/FB lead ad), are they getting a text back in under 60 seconds 24/7?

We built a lightweight “Local Lead Response Copilot” that:
- instantly texts new leads,
- asks 2–4 short qualification questions (AI-driven),
- then routes to booking/call scheduling.

It’s designed for local/high-intent services where response time drives conversion.
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

If you’re open, I’ll run a 7-day free pilot on one client campaign and report:
(1) speed-to-lead, (2) qualified rate, (3) appointments booked.

Worth a 15-min look? {CalendlyLink}
Or reply here and I’ll send details. (contact: agent_bob_replit+lead-copilot@agentmail.to)

— Bob

EMAIL 2 (Day 3)
Subject options:
1) should I close the loop?
2) free pilot for one client funnel

Body:
Hi {FirstName} — following up.

I can set this up as a simple add-on layer on top of your existing forms/FB lead ads: instant SMS + 2–4 qualifying questions + booking handoff.

If you want, reply with:
1) the niche (HVAC/plumbing/roofing/etc.),
2) where leads come from (FB lead ad / form),
3) who currently calls/texts them.

I’ll tell you if it’s a fit and we can spin the 7-day pilot.
Link again: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book: {CalendlyLink}

— Bob (agent_bob_replit+lead-copilot@agentmail.to)

========================
C) 2-STEP EMAIL SEQUENCE — LOCAL OPERATORS (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa)
========================
TARGET: Owner/GM/Office Manager.
OFFER: 7-day free pilot; focus on missed leads + after-hours.

EMAIL 1 (Day 1)
Subject options:
1) do you text new web leads within 60 seconds?
2) quick fix to stop leads from going cold
3) {City} question about your lead response time

Body:
Hi {FirstName} — quick question.

When someone fills out a form / requests a quote, do they get a text back in under 60 seconds (even after hours)?

We built Local Lead Response Copilot to stop leads from going cold:
- instant SMS to every new lead,
- 2–4 quick questions to qualify (AI-driven),
- then it books a call/appointment or hands off to your team.

You can see the overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

I’m offering a 7-day free pilot for one lead source. If it doesn’t increase booked calls/appointments, you can drop it.

Open to a 15-min setup call? {CalendlyLink}
Or reply and I’ll email the 3 things I need. (agent_bob_replit+lead-copilot@agentmail.to)

— Bob

EMAIL 2 (Day 3)
Subject options:
1) want me to set this up for free this week?
2) last nudge — instant text + qualification

Body:
Hi {FirstName} — circling back.

Most local businesses lose the lead in the first 5 minutes. This just ensures every new inquiry gets an immediate text, gets qualified, and gets pushed to booking.

If you want the free 7-day pilot, reply with:
- your website/form link (or where leads come in),
- your booking link (if you have one),
- best number for notifications.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book: {CalendlyLink}

— Bob | agent_bob_replit+lead-copilot@agentmail.to

========================
D) LINKEDIN CONNECT NOTE (for same prospects)
========================
Message (<=300 chars):
Hi {FirstName} — I help teams cut speed-to-lead to ~60s by auto-texting + qualifying new form/FB leads, then routing to booking. Quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

(If character limit is tight, remove last sentence or just keep the URL.)

========================
E) OPTIONAL SMS FOLLOW-UP (ONLY WHERE COMPLIANT / OPT-IN / EXISTING BUSINESS RELATIONSHIP)
========================
SMS:
Hey {FirstName} — Bob here. Quick check: do you respond to new {niche} web/FB leads within 60 seconds? We built an instant text + qualification + booking layer. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  Reply YES and I’ll share the 7-day free pilot details.

========================
F) PERSONALIZATION PROMPTS (1 line; fast research)
========================
Pick ONE of these and fill it from their site/Clutch/LinkedIn:
- “Noticed you run FB lead ads for {niche} (saw {proof: ‘Lead Ads’ mention / funnel page / testimonial}).”
- “Saw you offer {service: ‘Facebook Ads’, ‘Lead Gen’, ‘GHL automations’} — this slots in right after the form submit.”
- “Looks like you serve {city/region} and do {emergency/24-7}. After-hours leads are usually the leakiest.”
- “I saw {specific page}: {URL slug}. Quick idea to increase booked calls without increasing ad spend.”

Operational note: every sent email/LI message must create a Touches row so we can truthfully report “200 outreaches sent” and correlate which segment (agency vs operator) is booking demos.
