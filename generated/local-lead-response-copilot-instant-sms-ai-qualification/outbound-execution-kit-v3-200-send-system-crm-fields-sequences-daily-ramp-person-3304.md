# Outbound Execution Kit v3 — 200-Send System (CRM Fields + Sequences + Daily Ramp + Personalization Blocks)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:58:59.694Z

---

Below is the ready-to-run outbound system for Local Lead Response Copilot (Instant SMS + AI Qualification). Use this exactly to send 200 targeted outreaches and track replies/demos.

BUSINESS PROOF + CONTACT (include in emails)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to/support: agent_bob_replit+lead-copilot@agentmail.to
- Booking link: (your Calendly 15-min link) — paste into {booking_link}

A) CRM / TRACKING SHEET (columns)
Leads tab (one row per target):
1) Lead_ID 2) Segment (Agency/Operator) 3) Company 4) Niche 5) Location 6) Website 7) Source_URL 8) Decision_Maker_Name 9) Role 10) Email 11) LinkedIn_URL 12) Contact_Path (Email/Form/LI) 13) Personalization_Line 14) Offer (7-day pilot) 15) Sending_Inbox 16) Verification_Confidence (High/Med/Low) 17) Status (Queued/Sent1/Sent2/Replied/Demo/Closed/Lost)
Touches tab (multiple rows per lead):
- Lead_ID, Date, Channel (Email/LinkedIn/SMS), Step (1/2), Subject, Message_Variant, Outcome (Sent/Bounced/Replied/Connected), Notes
Pipeline tab (rollup):
- Replies count, Positive replies, Demos booked, No-shows, Active pilots

B) DAILY SENDING RAMP (deliverability-safe)
Day 0 (today): 15 warmup 1:1 sends (high personalization, plain text, no attachments). Goal: replies, not volume.
Day 1: 50 total sends (15 warmup already done + 35 campaign). Keep mix ~70% agencies / 30% operators.
Day 2: 50 sends + Step-2 follow-ups to Day-0 warmups.
Day 3: 50 sends + Step-2 follow-ups to Day-1 sends.
Day 4: 50 sends + Step-2 follow-ups to Day-2 sends.
Hard rules:
- Stop and fix list if bounce rate > 5% in any day.
- Personalize every email with 1 real line from their site/Clutch/ads angle.
- Keep links to only {booking_link} + optionally website proof (above). No images.

C) OFFER (7-DAY FREE PILOT — paste block)
“7-day free pilot: we connect your lead form/FB leads and instantly text the lead in under 60 seconds, ask 2–4 quick qualifying questions, and either (a) book directly to your calendar or (b) hand off a qualified lead summary. If it doesn’t increase contact rate / booked calls, you keep the playbook and walk away.”

D) SEQUENCE 1 — AGENCY (FB lead-gen for home services)
Email Step 1
Subject options:
1) “Quick add-on for your {client_niche} lead gen”
2) “Speed-to-lead wins (pilot?)”
3) “Your FB leads: text them in <60s?”
Body:
Hi {first_name} — {personalization_line}

If you’re running FB lead gen for home services, you’ve probably seen this: the lead fills the form, then gets called 10–60 minutes later and conversion tanks.

Local Lead Response Copilot fixes speed-to-lead: it instantly texts the new lead, asks 2–4 short qualifying questions (AI-driven), and either books straight to the calendar or sends a qualified summary to your team.

I can set up a 7-day free pilot for one client (no new software for them; we handle the workflow). Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Open to a 15-min chat this week? {booking_link}
Or reply here and I’ll send a 3-question qualifier you can forward to a client.

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Email Step 2 (48–72h later)
Subject: “Worth testing on one account?”
Body:
Hi {first_name} — circling back.

If you have even one client where leads sit after-hours or missed calls happen, this usually pays off fast because it’s purely a speed-to-lead / qualification layer.

Want me to set up a free 7-day pilot on a single funnel and report back contact rate + booked calls? {booking_link}

— Bob
(If you’re not the right person, who owns lead follow-up automation on your side?)

LinkedIn connect note (Agency)
“Hey {first_name} — saw you help {niche} companies with lead gen. I’m testing a speed-to-lead copilot that texts new leads in <60s, qualifies, and books calls. Can I share a 7-day pilot idea?”

E) SEQUENCE 2 — OPERATOR (roofing/HVAC/plumbing/pest/water damage/med spa)
Email Step 1
Subject options:
1) “Text new leads in <60 seconds (free pilot)”
2) “Missed calls = lost jobs (quick fix)”
3) “After-hours lead capture for {company}”
Body:
Hi {first_name} — {personalization_line}

When someone requests a quote/appointment, the first company to respond usually wins. If your team misses a call or waits 15+ minutes, that lead often books someone else.

Local Lead Response Copilot instantly texts every new lead from your form/ads, asks a few quick questions (job type, urgency, zip code, photos if needed), and then books an appointment or hands you a qualified summary.

I can run a 7-day free pilot for {company}. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

If you want, grab a quick slot here: {booking_link}
Or reply “pilot” and I’ll send the exact questions we’d ask your leads.

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Email Step 2 (48–72h later)
Subject: “Should I close this out?”
Body:
Hi {first_name} — should I close this out?

If you’re getting leads from your website/FB/Google and want faster response + basic qualification, I can set up the 7-day pilot in a day.

15 mins to see if it fits? {booking_link}

— Bob

Optional compliant SMS follow-up (ONLY where you have explicit opt-in / existing business relationship)
“Hi {first_name}, Bob here. Quick one — we help businesses text new leads in <60s, qualify, and book calls. Want a 7-day free pilot? Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 — reply YES and I’ll send times.”

F) PERSONALIZATION SNIPPETS (copy/paste starters)
Agencies:
- “Noticed you highlight FB lead gen for {home_service} — curious how you handle speed-to-lead after the form fill.”
- “Saw your case study on {client} / {city}; do you have an automation layer between lead and first call?”
- “Your offer mentions ‘appointment setting’— is that human-only or any SMS qualification?”
Operators:
- “Saw you offer {service} in {city}; do website leads go to a shared inbox or straight to a tech/dispatcher?”
- “Noticed your site has a ‘Request Estimate’ form — do you respond after-hours?”
- “Your Google reviews mention fast service; we help keep that speed even when the phone’s missed.”

G) FIRST 60 SEND QUEUE (how to pick)
- Agencies: prioritize those explicitly mentioning FB lead ads, home services, appointment setting, or “lead follow-up.”
- Operators: prioritize those spending on ads (Google/FB), with multiple locations, or with “request quote” forms and after-hours gaps.

This kit is ready for immediate execution: paste targets into the CRM, add one personalization line each, send warmups, then ramp to 200 while logging every touch and booking demos via {booking_link}.