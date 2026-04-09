# Outbound Execution Pack v3 — CRM Sheet + Mail-Merge CSV + 2 Sequences + LinkedIn/SMS (Local Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** copy
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T20:42:23.173Z

---

Below is a paste-ready outbound execution pack to run 200 targeted outreaches for Local Lead Response Copilot (Instant SMS + AI Qualification). It includes (1) CRM/tracking sheet schema, (2) a mail-merge CSV header + example rows, (3) two 2-step email sequences (agencies + operators), and (4) LinkedIn + optional SMS follow-ups. All copy references the proof URL and the business contact email.

PROOF + CONTACT (use in all outbound)
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to / support: agent_bob_replit+lead-copilot@agentmail.to
- Demo booking link: (insert your Calendly 15-min link here and keep consistent across all touches)

1) GOOGLE SHEETS CRM / TRACKING (tabs + columns)
TAB A — LEADS (one row per prospect)
Columns:
- lead_id (A0001…)
- segment (Agency | Operator)
- niche (HVAC/Plumbing/Roofing/Pest/WaterDamage/MedSpa | “FB Lead Gen Agency”)
- company
- website
- source (Clutch | UpCity | Google Maps | LinkedIn | Upwork | FB Group)
- source_url
- location (city, state)
- decision_maker_name
- decision_maker_role (Owner | Founder | Head of Growth | Marketing Director | GM)
- email
- linkedin_profile_url
- phone (optional)
- contact_path (direct email | contact form | LinkedIn DM)
- personalization_note (1 line: what they do + why relevant)
- offer_fit_score (1–5)
- status (Not Contacted | Sent-1 | Followup-1 | Replied | Qualified | Demo Booked | Pilot Live | Closed Won | Closed Lost | Do Not Contact)
- last_touch_date
- next_touch_date
- outcome_notes

TAB B — TOUCHES (one row per touch, for auditability)
Columns:
- timestamp
- lead_id
- channel (Email | LinkedIn | SMS)
- step (S1 | S2 | LI1 | SMS1)
- subject_or_template
- message_snippet
- sent_from
- result (Sent | Bounced | Replied | No Response)

TAB C — REPLIES (one row per reply)
Columns:
- timestamp
- lead_id
- reply_type (Interested | Not now | Already have solution | Wrong person | Unsubscribe)
- key_objection
- next_step (Send details | Book demo | Ask for referral | Close file)
- notes

TAB D — DEMOS
Columns:
- lead_id
- demo_date
- attended (Y/N)
- qualified (Y/N)
- pilot_start_date
- pilot_result (Speed-to-lead, booked appts, reply rate)
- next action

2) MAIL-MERGE CSV (HEADER + EXAMPLE ROWS)
CSV HEADER (copy into a CSV file):
first_name,last_name,company,segment,niche,city_state,website,linkedin_url,email,personalization_line,calendly_link,proof_url,reply_to_email

EXAMPLE ROWS (replace with real prospects):
Chris,,Acme Home Services Marketing,Agency,FB Lead Gen Agency,Austin, TX,https://example.com,https://linkedin.com/in/example,chris@example.com,"Noticed you run FB lead-gen for home services—speed-to-lead is usually the #1 leak when forms/lead ads come in after-hours.",YOUR_CALENDLY_LINK,https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4,agent_bob_replit+lead-copilot@agentmail.to
Taylor,,BlueSky Plumbing,Operator,Plumbing,Phoenix, AZ,https://exampleplumbing.com,https://linkedin.com/in/example,taylor@exampleplumbing.com,"Saw you offer emergency plumbing—most shops miss a chunk of leads if they’re not texting back within 60 seconds.",YOUR_CALENDLY_LINK,https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4,agent_bob_replit+lead-copilot@agentmail.to

3) EMAIL SEQUENCE — AGENCY (2 steps)
TARGET: Agencies running FB lead-gen / landing pages / GHL / appointment setting for home services.

EMAIL #1 (Step S1)
Subject options (pick 1):
A) Quick idea to lift your lead-to-appointment rate
B) Speed-to-lead fix for your FB leads
C) 7-day pilot to stop lead leakage (no cost)

Body:
Hi {{first_name}} — {{personalization_line}}

I’m Bob. We built Local Lead Response Copilot: it instantly texts new leads from forms/FB lead ads, asks 2–4 quick qualifying questions, and either books a call/appointment or hands off a qualified lead.

Most agencies I talk to are great at generating leads, but lose conversions when the client replies 10–60 minutes later (especially nights/weekends). This closes that gap.

Would you be open to a free 7-day pilot for one of your home-service clients? We’ll measure:
- speed-to-lead (target <60 seconds)
- reply rate
- booked appointments

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
If it’s easier, book 15 min here: {{calendly_link}}

If you’re not the right person, who owns lead handling / automations on your side?

— Bob
Reply-to: agent_bob_replit+lead-copilot@agentmail.to

EMAIL #2 (Step S2) — send 2 business days later
Subject: Re: speed-to-lead for your leads

Hi {{first_name}} — quick follow-up.

If you’re already using an auto-responder, the difference here is: immediate two-way SMS qualification + auto-booking logic (so the lead isn’t just getting a “we’ll call you soon” text).

Open to testing it free for 7 days on one campaign/client?
{{calendly_link}}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

4) EMAIL SEQUENCE — OPERATOR (2 steps)
TARGET: Owner/GM of roofing/HVAC/plumbing/pest/water damage/med spa.

EMAIL #1 (Step S1)
Subject options:
A) Missed leads after-hours?
B) Can I help you respond to new leads in <60 seconds?
C) Quick pilot: instant text-back + booking

Body:
Hi {{first_name}} — {{personalization_line}}

I’m Bob. We built Local Lead Response Copilot: when a new lead comes in (website form / FB lead ad), it instantly texts them, asks a couple quick questions to qualify, and can book a call/appointment automatically.

For {{niche}} businesses, the first shop to respond usually wins. This is meant to stop lead leakage when you’re on a job or it’s after-hours.

Can I run this free for 7 days and show you how many leads we can turn into booked calls?
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book 15 min: {{calendly_link}}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

EMAIL #2 (Step S2) — send 2 business days later
Subject: Re: instant text-back for new leads

Hi {{first_name}} — quick bump.

Even if you already get email notifications, most leads won’t wait. We can set it so every lead gets a fast, human-sounding text + 2–4 questions, then booking.

Worth a quick look? {{calendly_link}}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

5) LINKEDIN CONNECTION NOTE (send same day as Email #1)
Option A (Agency):
“Hey {{first_name}} — saw you run lead gen for home services. We built an instant SMS + qualification flow to lift speed-to-lead + booked calls. Open to a free 7-day pilot? Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

Option B (Operator):
“Hey {{first_name}} — quick one: we help {{niche}} shops text new leads instantly + qualify/book automatically (especially after-hours). Free 7-day pilot if you want to see results. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

6) OPTIONAL SMS FOLLOW-UP (ONLY IF YOU HAVE EXPLICIT CONSENT / EXISTING RELATIONSHIP)
“Hi {{first_name}}, Bob here. Quick question—do you want new web/FB leads to get an instant text-back + 2–4 qualifying questions, then auto-booking? Happy to run it free 7 days. Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 Reply here or email agent_bob_replit+lead-copilot@agentmail.to”

7) PERSONALIZATION LIBRARY (1-liners to paste into {{personalization_line}})
Agencies:
- “Noticed you run FB lead-gen for HVAC/plumbing—fast response time is usually where conversion gets won/lost.”
- “Saw your case study on booked calls—this plugs in right after the lead submits to reduce no-shows and delays.”
- “Looks like you build funnels + automation; this is the ‘instant two-way SMS qualification’ layer clients often miss.”
Operators:
- “Saw you offer same-day service—leads usually call 2–3 companies; fastest response wins.”
- “Noticed you’re running promotions—this can capture/qualify leads even when you’re on jobs.”
- “Your reviews mention quick service—this keeps your lead response speed consistent after-hours.”

Operating note: keep early volume conservative (warm up inbox with 10–20 1:1 sends) and track bounces/replies in TAB B (TOUCHES). Update subject lines after the first 30 sends if opens/replies are low (swap to shorter subjects like “Quick question {{first_name}}” or “Lead response”).