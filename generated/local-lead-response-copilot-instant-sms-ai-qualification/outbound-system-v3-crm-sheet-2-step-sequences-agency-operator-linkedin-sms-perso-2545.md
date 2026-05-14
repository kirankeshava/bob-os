# Outbound System v3 — CRM Sheet + 2-Step Sequences (Agency/Operator) + LinkedIn/SMS + Personalization Bank + 200-Send Operating Plan

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T05:32:13.998Z

---

Business references to use in every message:
- Website (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to/support email: agent_bob_replit+lead-copilot@agentmail.to

============================
A) GOOGLE SHEETS CRM / TRACKING (copy these columns)
============================
Tab 1: LEADS
Columns:
- Lead ID
- Segment (Agency | Operator)
- Company
- Website
- LinkedIn Company URL
- Decision Maker Name
- Title/Role
- Decision Maker LinkedIn URL
- Email
- Phone
- City/State
- Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa/Marketing Agency)
- Source (Clutch/UpCity/Google Maps/LinkedIn/Upwork/FB group)
- Source URL
- Personalization Note (1 line)
- Offer Angle (Speed-to-lead | After-hours | Lead qualification | Booking automation)
- Status (Not Contacted | Sent 1 | Sent 2 | Replied | Booked | No Fit | Bounce)
- Last Touch Date
- Next Touch Date
- Owner (Bob)
- Notes

Tab 2: TOUCH LOG
Columns:
- Date
- Lead ID
- Channel (Email | LinkedIn | SMS)
- Step (1 | 2 | 3)
- Template Used (A1/A2/O1/O2/L1/L2/SMS1)
- Subject/Message Variant
- Result (Sent | Delivered | Opened-if-known | Replied | Bounced)
- Reply Summary
- Next Action

Tab 3: REPLIES / DEMOS
Columns:
- Lead ID
- Reply Type (Interested | Not now | Already have system | Price | Wrong person)
- Objection
- Response Sent (Y/N)
- Demo Booked (Y/N)
- Demo Date/Time
- Outcome (Pilot | Closed Won | Closed Lost | Follow-up)

============================
B) 200-SEND OPERATING PLAN (0$ spend)
============================
Day 0 (today):
1) Warm inbox: send 15 true 1:1 emails (not identical) to a mixed set of leads (10 agencies + 5 operators). Avoid links in 50% of them; keep under 120 words.
2) Watch for bounces/auto-spam signals. If bounce rate > 3%, pause and fix addresses (use contact forms/LinkedIn instead of guessing emails).

Days 1–4: 50/day sending cadence
- Daily volume: 50 Email Step 1s (25 agencies + 25 operators OR 30/20 depending on list strength).
- LinkedIn: same-day connect request to the same 50 decision makers (short note below).
- Log every send in TOUCH LOG same day.

Follow-ups:
- Email Step 2: send 2 business days after Step 1 (to non-responders).
- LinkedIn follow-up: 1 day after connect accepted OR 3 days after request (if pending, do nothing).
- Optional SMS: only for operators where number is clearly a business line from their website/Google profile and message is strictly informational; send after Step 2 if no response.

Daily KPI targets (Week 1):
- 200 total sends
- 20+ replies (10% reply rate)
- 10 demos booked (5% booking rate)

============================
C) OUTREACH SEQUENCES (READY TO SEND)
============================

--- SEQUENCE 1: AGENCIES (FB lead-gen for home services/local) ---

A1 — Email Step 1 (Agency)
Subject options (pick 1):
1) Quick win for your {niche} lead-gen clients
2) Speed-to-lead fix for {company}
3) {city} leads: respond in 10 seconds (pilot)

Body:
Hi {first_name} — {personalization_note}

If you’re running FB lead-gen for local/home-service clients, the biggest leak I keep seeing is speed-to-lead (especially nights/weekends). We built a lightweight “Lead Response Copilot” that instantly texts new leads, asks 2–4 qualifying questions, and routes to booking/call scheduling.

7-day pilot (free): we’ll plug it into one client’s form/FB lead flow and measure lift in contact rate + booked calls.

If you’re open, grab a quick time here: {booking_link}
Or just reply and I’ll send a 2-min overview + how it works: {website_url}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

A2 — Email Step 2 (Agency follow-up)
Subject: Re: speed-to-lead for your clients

Hi {first_name} — checking if this is relevant.

Two questions:
1) Are you currently sending SMS within 60 seconds for new leads?
2) Do you want a free 7-day pilot on one account to prove lift in contact rate/appointments?

If yes, easiest is to book 15 mins: {booking_link}
If not you, who owns lead response/automation at {company}?

— Bob
agent_bob_replit+lead-copilot@agentmail.to

LinkedIn — Connect note (Agency) (L1-A)
Hi {first_name} — saw you work with local lead-gen. We’re piloting an instant SMS + qualification flow that boosts speed-to-lead (esp. after-hours). Open to a quick chat?

LinkedIn — After connect (Agency) (L2-A)
Thanks for connecting, {first_name}. If you have any FB lead clients where response time is slipping, we’ll run a free 7-day pilot: instant text → 2–4 qualifying Qs → booking. Quick overview: {website_url}. Want me to suggest a simple pilot setup for one client?


--- SEQUENCE 2: OPERATORS (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa) ---

O1 — Email Step 1 (Operator)
Subject options:
1) Missed leads after hours at {company}?
2) 10-second response for new {niche} leads
3) Quick question about your new lead response

Body:
Hi {first_name} — {personalization_note}

Quick one: when a new lead comes in from your website/FB, how fast do they get a text back?

We built a “Lead Response Copilot” for local businesses that instantly texts new leads, asks a couple quick questions (job type/urgency/zip), and routes them to booking or a call—so you stop losing ready-to-buy leads when you’re on a job.

I can set up a free 7-day pilot for {company}. If it’s useful, book 15 mins: {booking_link}
You can also see the overview here: {website_url}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

O2 — Email Step 2 (Operator follow-up)
Subject: Re: new lead response time

Hi {first_name} — just bumping this.

If you’re already responding in under a minute, ignore me. If not, we can typically increase contact rate by simply texting instantly + qualifying before your team calls.

Want the free 7-day pilot set up on your existing form/FB leads? {booking_link}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

LinkedIn — Connect note (Operator) (L1-O)
Hi {first_name} — quick idea to reduce missed leads: instant SMS response + 2–4 qualifying questions + booking. I can show a free 7-day pilot.

LinkedIn — After connect (Operator) (L2-O)
{first_name}, if you want, I’ll map a simple workflow for {company}: lead comes in → instant text → quick qualification → book/call. Overview: {website_url}. If you want it live this week, grab a time: {booking_link}.


--- OPTIONAL SMS FOLLOW-UP (COMPLIANCE-FRIENDLY) ---
Use ONLY where the number is clearly a business line from public sources and message is informational (no misleading claims). Keep it short.

SMS1 (after Email Step 2, non-responder):
Hi {first_name} — Bob here. Quick check: do you want a free 7-day pilot of instant SMS response + lead qualification for {company}? If yes, book here: {booking_link}. If not, reply STOP and I won’t text again.

============================
D) PERSONALIZATION SNIPPET BANK (copy/paste building blocks)
============================
Rules: 1 line, prove you looked, don’t compliment generically. Examples:

For Agencies:
- “Noticed you’re running lead gen for {niche} and mention Facebook Ads on your site.”
- “Saw your case study for {client_name}—curious how you handle speed-to-lead after hours.”
- “Your UpCity profile lists ‘Lead Generation’ + ‘Marketing Automation’—this fits that gap.”
- “Looks like you drive leads to a form—do your clients have instant SMS + qualification on submit?”

For Operators:
- “Saw you offer {service} in {city}; do you text new leads automatically when they submit the form?”
- “Your site has ‘Request an Estimate’—curious how fast those requests get a response.”
- “Noticed you run FB ads (from your page/CTA). Do leads get a text back within 60 seconds?”
- “If calls go to voicemail during jobs, instant SMS usually recovers a chunk of those leads.”

Angle selection cheat-sheet:
- HVAC/Plumbing/Roofing/Water Damage: after-hours + on-job responsiveness + urgency routing
- Pest: quick qualification + zip/service area + booking
- Med spa: appointment booking + lead qualification (service interest, budget range)
- Agencies: retention + better ROI + fewer wasted leads + differentiator

============================
E) REPLY HANDLING (SHORT)
============================
If “We already have SMS/CRM automations”:
“Totally fair. Most setups still miss (1) instant qualification and (2) routing to booking with minimal staff time. If you’re open, I’ll run the free 7-day pilot on one lead source and we’ll compare contact/booking rate. Worth a quick 15 mins? {booking_link}”

If “Not interested / busy”:
“No problem—should I follow up in 60 days, or is this a permanent no for {company}?”

If “Who are you / legitimacy”:
“Fair question. Here’s the overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 and you can reach me at agent_bob_replit+lead-copilot@agentmail.to. Happy to send a 2-minute loom-style walkthrough via email if you prefer.”
