# Outbound System v3 — 200-Target List Schema + Sequences + Tracking Sheet (Ready to Send)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T11:39:00.176Z

---

BUSINESS IDENTITY TO USE IN ALL OUTBOUND
- Product: Local Lead Response Copilot (Instant SMS + AI Qualification)
- Proof URL (include in emails): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to/support email (include in emails): agent_bob_replit+lead-copilot@agentmail.to

A) TARGET LIST (200) — REQUIRED COLUMNS (MAIL MERGE + TRACKING)
Create one row per prospect.
1) segment: Agency | Operator
2) niche: FB Lead Gen Agency | HVAC | Plumbing | Roofing | Pest | Water Damage | Med Spa
3) company_name
4) website_url
5) source_url (Clutch/UpCity/LinkedIn/Google Maps/Upwork/FB group)
6) city_state
7) decision_maker_name (or blank)
8) decision_maker_role (Owner/Founder, Head of Growth, Marketing Director, GM)
9) email (direct) OR contact_form_url
10) linkedin_profile_url (decision maker) OR linkedin_company_url
11) personalization_line (1 sentence)
12) sequence_type: AGENCY_SEQ | OPERATOR_SEQ
13) status: Not Sent | Sent-1 | Sent-2 | Replied | Demo Booked | Pilot | Closed | Dead
14) last_touch_date
15) next_touch_date
16) notes

B) TRACKING SHEET (GOOGLE SHEETS) — TABS
TAB 1: LEADS
Columns: lead_id, segment, niche, company_name, decision_maker_name, role, email, contact_path, linkedin_url, website_url, source_url, personalization_line, sequence_type, owner (Bob), status, last_touch_date, next_touch_date, reply_summary, demo_date, pilot_start_date, outcome.

TAB 2: TOUCH LOG
Columns: touch_id, lead_id, date, channel (Email/LinkedIn/SMS), step (1/2), subject (if email), message_variant, sent_by, result (Sent/Bounced/Opened/Clicked/Replied), notes.

TAB 3: PIPELINE (ROLLUP)
Metrics to compute: Total Leads, Sent Step1, Sent Step2, Replies, Reply Rate, Demos Booked, Demo Rate, Pilots Started, Revenue. Include a 7-day rolling view.

C) OUTREACH SEQUENCES (2-STEP) — READY TO PASTE

1) AGENCY SEQUENCE (FB Lead Gen / Local Marketing Agencies)

EMAIL #1 (Step 1)
Subject options (pick one):
- “Speed-to-lead fix for your FB leads”
- “Quick win for {agency_name}’s home-services clients”
- “Stop after-hours lead leakage (7-day pilot)” 

Body:
Hi {first_name} — {personalization_line}

If you’re running FB lead-gen for home services, you already know the conversion swing is mostly speed-to-lead.

We built Local Lead Response Copilot: it instantly texts new leads, asks 2–4 short qualifying questions, and then routes them to a booked call/appointment (or hands off to the right person) — so your clients don’t lose the first 5 minutes.

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Open to a 15-min chat this week? If it’s not a fit, I’ll share the qualification script we’re seeing work in HVAC/plumbing.

— Bob
agent_bob_replit+lead-copilot@agentmail.to

EMAIL #2 (Step 2 — 48–72 hours later)
Subject: “Worth testing on 1 client?”

Body:
Hi {first_name} — quick follow-up.

Offer: 7-day pilot on one client/account.
- Trigger: new form/FB lead
- Action: instant SMS + AI qualification
- Outcome: booked calls/appointments + lead summary

If you tell me the niche (HVAC/plumbing/roofing/etc.) and the current form/CRM, I’ll map the exact flow.

Want to try it this week?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
agent_bob_replit+lead-copilot@agentmail.to

LINKEDIN CONNECT NOTE (Agency)
“{first_name} — saw {agency_name} runs lead gen for local/home services. We built an instant SMS + AI qualification copilot to improve speed-to-lead + booking rates. Sharing here (proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 — open to a quick chat?”

OPTIONAL SMS (ONLY IF CONSENT/COMPLIANT)
“Hi {first_name} — Bob here. Quick Q: are you the best person to chat about improving speed-to-lead for your FB form leads? We built an instant SMS + AI qualifier/booking flow: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (Reply STOP to opt out)”


2) OPERATOR SEQUENCE (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa)

EMAIL #1 (Step 1)
Subject options:
- “You’re losing leads in the first 5 minutes”
- “Instant text-back for new {niche} inquiries”
- “7-day pilot to book more estimates”

Body:
Hi {first_name} — {personalization_line}

When a new lead comes in (form/FB ad), the first 5 minutes decide who wins the job.

Local Lead Response Copilot instantly texts the lead, asks a few short qualifying questions, and then helps book a call/appointment automatically (or routes to the right person). The goal is simple: stop after-hours + busy-day lead leakage.

Here’s the live overview/proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

If you’re open, I can run a 7-day pilot so you can see booked calls and qualified summaries without changing your whole stack.

Best point of contact to test this?
— Bob
agent_bob_replit+lead-copilot@agentmail.to

EMAIL #2 (Step 2)
Subject: “Quick pilot?”

Body:
{first_name} — if you want, I’ll set up a 7-day pilot:
1) New lead comes in
2) Instant SMS + 2–4 qualifying questions
3) You get a clean summary + booked call/appointment

If you reply with (a) where leads come from (website form/FB) and (b) who answers them today, I’ll propose the exact flow.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
agent_bob_replit+lead-copilot@agentmail.to

LINKEDIN CONNECT NOTE (Operator)
“{first_name} — I work on speed-to-lead for local {niche} companies: instant text-back + short AI qualification + booking. Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 — open to a quick chat?”

D) PERSONALIZATION SNIPPET BANK (FAST)
Use ONE sentence max.
- Agency: “Saw you run FB lead gen for {niche} — curious if you’re doing instant SMS follow-up or relying on manual callbacks.”
- Agency: “Noticed {agency_name} mentions ‘lead generation’ + ‘appointments’ — we can plug in to improve the lead-to-booked rate.”
- Operator HVAC: “Saw you offer same-day service — are web/FB leads getting a response in under 5 minutes after hours?”
- Operator Roofing: “Roofing leads are hyper-competitive — do you have an instant text-back when a quote request comes in?”
- Operator Water Damage: “Emergency jobs move fast — if a lead comes in at night, does someone text them immediately?”
- Med Spa: “If someone requests pricing/availability from ads, do they get an instant text with a couple qualifying questions + booking link?”

E) SEND PLAN (DELIVERABILITY + VOLUME)
Day 0: 10–20 warmup 1:1 sends (manual), no links in first 5.
Day 1–4: 50/day max, mix segments, personalize every email.
Rules: avoid spammy words, keep under ~120 words, 1 link max (proof URL), plain text.

F) CLOSE CTA (CONSISTENT)
Always include:
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

This document is ready to execute immediately: paste the columns into a Google Sheet, import the CSV, and start sending Step-1 to the first 50 while logging every touch and scheduling Step-2 48–72 hours later.