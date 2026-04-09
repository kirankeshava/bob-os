# Outbound Execution Pack v3 — CRM Sheet + Target List Schema + 2-Step Sequences (Agency/Operator) + LinkedIn/SMS Copy

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T12:07:21.980Z

---

Below is a complete, paste-ready outbound pack for Local Lead Response Copilot (Instant SMS + AI Qualification). Use it to (1) build/maintain the 200-target list, (2) run a 2-step outbound sequence, and (3) track every touch to reach 20 replies / 10 demos.

BUSINESS LEGITIMACY LINKS (include in outreach)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to/support email: agent_bob_replit+lead-copilot@agentmail.to

A) TRACKING SHEET / CRM (Google Sheets structure)
Create a Google Sheet with 4 tabs:

TAB 1 — LEADS (one row per prospect)
Columns:
1) LeadID (unique)  2) Segment (Agency/Operator)  3) Company  4) Niche (HVAC/Plumbing/etc or “Lead Gen Agency”)  5) City  6) State/Region  7) Country
8) Website URL  9) Source URL (Clutch/UpCity/LinkedIn/Google Maps/Upwork/FB group)
10) Decision Maker First Name  11) Last Name  12) Role (Owner/Founder/Head of Growth/Marketing Director)
13) Email  14) Email Confidence (High/Med/Low)  15) LinkedIn (person)  16) LinkedIn (company)
17) Phone (only if publicly listed)  18) Notes (1-line personalization)
19) Status (New / Enriched / E1 Sent / E2 Sent / Replied / Demo Booked / Closed-Won / Closed-Lost)
20) Last Touch Date  21) Next Step Date  22) Owner (Bob)

TAB 2 — TOUCHES (one row per activity)
Columns:
1) LeadID  2) Date  3) Channel (Email/LinkedIn/SMS)  4) Step (E1/E2/LI1/SMS1)
5) Subject (if email)  6) Message Snippet  7) Result (Sent/Bounced/Opened/Replied)
8) Reply Type (Positive/Neutral/Negative)  9) Follow-up Due (date)

TAB 3 — REPLIES
Columns:
1) LeadID  2) Date  3) Channel  4) Reply Text  5) Objection Category
(“Already fast”, “We call immediately”, “Not interested”, “Price”, “Use CRM automation”, “Need info”)
6) Next Action  7) Outcome

TAB 4 — DEMOS
Columns:
1) LeadID  2) Date Booked  3) Showed? (Y/N)  4) Next Meeting
5) Pilot Started? (Y/N)  6) Pilot Result (leads contacted %, booked appts)
7) Proposal Sent? (Y/N)  8) Closed? (Y/N)  9) MRR

B) PERSONALIZATION SNIPPETS (copy/paste blocks)
Pick ONE line max for the first email.

Agency angles:
- “Saw you run FB lead gen for {home service niche}; most of your clients are bleeding leads in the first 5 minutes—this fixes that automatically.”
- “Noticed you offer {service} + CRM setup—this slots in as the ‘instant response + qualification’ layer your clients feel immediately.”
- “Your Clutch/UpCity profile mentions {keyword like ‘Facebook ads’/‘lead gen’}; we turn form fills into live conversations in under 60 seconds.”

Operator angles:
- “Noticed you advertise {service} and have a ‘Request a Quote’ form—if leads wait even 10 minutes, they call the next company.”
- “If you miss leads after-hours/weekends, we instantly text, qualify, and book a call without you lifting a finger.”
- “You’re in {city}; competitive market—speed-to-lead is usually the cheapest ‘conversion rate’ win.”

C) 7-DAY PILOT OFFER (include in Email 1 or Email 2)
“Offer: 7-day pilot. We’ll connect your lead sources (form/FB leads) and run instant SMS + short AI qualification. Success = (1) <60 sec first response on new leads, (2) capture intent + job type, (3) book calls/appointments automatically or hand off qualified leads to your team. If it doesn’t create measurable lift, you don’t continue.”

D) 2-STEP OUTBOUND SEQUENCES

SEQUENCE 1 — AGENCIES (FB lead gen / local marketing)

Email 1 (E1)
Subject options (choose 1):
1) “Quick win for your {niche} lead-gen clients”
2) “Instant SMS follow-up for your new leads?”
3) “Reduce lead leakage in the first 5 minutes”

Body:
Hi {FirstName} — {PersonalizationLine}

I’m Bob. We built Local Lead Response Copilot: it instantly texts new leads from forms/FB lead ads, asks 2–4 short qualifying questions (AI-driven), and then books a call/appointment or routes the qualified lead.

Most agencies can’t fix speed-to-lead consistently across clients—this gives you a productized layer you can deploy fast.

Website for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Open to a 15-min chat to see if we can run a 7-day pilot on one client?
If easier, reply here: agent_bob_replit+lead-copilot@agentmail.to

Thanks,
Bob

Email 2 (E2) — send 2 business days later
Subject: “Worth a 7-day pilot?”

Hi {FirstName} — circling back.

If you’re already running ads for home services/local clients, the cheapest lift is usually response speed + qualification.

7-day pilot idea: we connect one lead source, run instant SMS + qualification, and route/book automatically. If it doesn’t move contact rate or booked calls, you don’t continue.

Want me to send 2–3 setup questions, or should I close the loop?
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

— Bob (agent_bob_replit+lead-copilot@agentmail.to)


SEQUENCE 2 — LOCAL OPERATORS (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa)

Email 1 (E1)
Subject options:
1) “Missed leads after-hours in {City}?”
2) “Instant text-back for new {niche} leads”
3) “Faster response → more booked jobs”

Body:
Hi {FirstName} — {PersonalizationLine}

I’m Bob. We built Local Lead Response Copilot: when someone fills your form or comes in from FB/Google leads, it instantly texts them, asks a few quick questions to qualify, and can book a call/appointment automatically.

In local services, the first company to respond usually wins.

If you want, we can run a 7-day pilot so you can see whether faster response + qualification increases booked calls.
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply here: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email 2 (E2) — send 2 business days later
Subject: “Should I close this out?”

Hi {FirstName} — quick follow-up.

If you’re getting leads from forms/ads, we can usually improve conversion by responding instantly and collecting job details via SMS (even after-hours).

Want to try a 7-day pilot, or should I close this out?
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

— Bob
agent_bob_replit+lead-copilot@agentmail.to

E) LINKEDIN CONNECTION NOTE (same day as E1 or day after)
“Hey {FirstName} — I work on instant SMS follow-up + AI qualification for new form/FB leads (speed-to-lead). Thought it might help {Company} / your clients. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

F) COMPLIANCE-FRIENDLY OPTIONAL SMS (only to publicly listed business numbers; no automation without consent)
“Hi {FirstName}, Bob here — quick Q: do you want new web/FB leads texted back instantly (with a couple qualifying questions) so you book more calls? Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 Reply STOP to opt out.”

G) DAILY SENDING PLAN (deliverability-safe)
Day 1–2: 10–20 1:1 warm-up emails + 20–30 personalized E1s.
Day 3–7: 40–60/day (cap based on bounce rates). Avoid attachments; keep links limited (website + booking link only).
Every send gets logged in TOUCHES; every reply categorized in REPLIES; demos tracked in DEMOS.

This pack is ready to run immediately: fill LEADS, write one personalization line per prospect, send E1, log, then send E2 to non-replies after ~2 business days, plus LinkedIn connects to the same cohort.