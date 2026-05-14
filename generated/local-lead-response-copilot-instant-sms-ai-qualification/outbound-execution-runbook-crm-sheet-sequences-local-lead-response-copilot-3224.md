# Outbound Execution Runbook + CRM Sheet + Sequences (Local Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:44:21.900Z

---

Below is an execution-ready outbound package to send 200 targeted outreaches in 7 days for Local Lead Response Copilot.

1) BOOKING + LEGITIMACY LINKS (use in every outreach)
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to/support email: agent_bob_replit+lead-copilot@agentmail.to
- Calendly: use your live 15-min demo link (paste into the {booking_link} token everywhere below).

2) CRM / TRACKING SHEET (Google Sheets)
Create 3 tabs: Leads, Touches, Dashboard.

TAB: Leads (columns)
- lead_id (e.g., A001)
- segment (Agency | Operator)
- company
- niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa | or “FB Lead Gen Agency”)
- location
- website_url
- source_url (Clutch/UpCity/LinkedIn/Google Maps/Upwork/FB group)
- decision_maker_name
- decision_maker_title (Owner/Founder/CEO/Head of Growth/Marketing Director)
- email
- linkedin_profile_url
- contact_path (direct email | contact form | LinkedIn DM)
- personalization_note (1 line)
- status (Not Started | Enriched | Sent-1 | Sent-2 | Replied | Demo Booked | Closed/Won | Closed/Lost)
- last_touch_date
- next_step
- notes

TAB: Touches (columns)
- lead_id
- date
- channel (Email | LinkedIn | SMS)
- template (Agency-1 | Agency-2 | Op-1 | Op-2 | LI-Connect | LI-FU)
- subject
- outcome (Sent | Bounced | Opened* | Replied | No response)
- reply_summary

TAB: Dashboard
- Daily KPI rows: date, emails_sent, replies, reply_rate, demos_booked
- Targets: 200 sent / 20 replies / 10 demos
- Segment split: agencies vs operators

3) DAY-1 TO DAY-7 SENDING RUNBOOK (deliverability-safe)
Day 1:
- Warmup: send 10–20 1:1 emails (no links in first 5; then introduce 1 link max).
- Then send 25 personalized emails from the sequence (mix 60% agencies / 40% operators).
- Send LinkedIn connection requests to the same 25.
Day 2:
- Send 50 emails total (include follow-up #2 to Day-1 nonresponders as applicable).
- 50 LinkedIn connects.
Day 3–4:
- Send 50/day until you hit 200 total sent.
Daily rules:
- Keep personalization to 1 honest line tied to their niche/offer.
- Avoid attachments.
- Keep links to max 1 (website OR booking link). If worried, use “Happy to send the link.”
- Log every touch in Touches tab.

4) EMAIL SEQUENCES (copy/paste)

A) AGENCY SEQUENCE (FB lead gen agencies for home services)

Email 1 (Agency-1)
Subject options:
1) Quick add-on for your FB lead gen clients
2) Speed-to-lead fix for {company}
3) 7-day pilot: instant SMS qualification

Body:
Hi {first_name} — quick question.

Noticed {personalization_note}.

We built a lightweight “Lead Response Copilot” that instantly texts new leads (forms/FB leads), asks 2–4 qualifying questions, and then books a call/appointment automatically.

Teams using it mainly want one thing: faster speed-to-lead (especially after-hours) without adding admin work.

Open to a 7-day free pilot on one client? If it doesn’t increase contacted/qualified leads, you keep the setup.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
If you want, grab 15 min here: {booking_link}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (Agency-2) — send 48–72h later
Subject: Re: speed-to-lead for your clients

Hi {first_name} — circling back.

If you’re already running FB lead gen for home services, this usually plugs in fast:
- New lead submits → instant SMS in ~5–15 seconds
- 2–4 questions (job type, urgency, ZIP, photos)
- Booked call/appointment or clean handoff to your client

Worth testing on 1 account for 7 days free?
{booking_link}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

B) LOCAL OPERATOR SEQUENCE (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa)

Email 1 (Op-1)
Subject options:
1) Missed leads after-hours at {company}?
2) Can I help you text new leads instantly?
3) 7-day free pilot: faster lead response

Body:
Hi {first_name} — I was looking at {company} and noticed {personalization_note}.

If you’re getting leads from your site or Facebook, response speed is usually the #1 conversion lever. We built a simple Lead Response Copilot that:
- texts new leads instantly,
- asks a couple quick questions to qualify,
- then books a call/appointment (or routes to your team).

I can run a 7-day free pilot so you can see if it increases booked jobs.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
15-min intro: {booking_link}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (Op-2) — send 48–72h later
Subject: Re: instant SMS to new leads

Hi {first_name} — quick follow-up.

Most local operators lose a chunk of leads simply because the first reply comes too late (especially evenings/weekends). This replies in seconds and captures:
- job type + urgency
- location/ZIP
- preferred time
…and can book directly.

Want me to set up the 7-day free pilot on one lead source?
{booking_link}

— Bob

5) LINKEDIN MICRO-SEQUENCE (optional, same prospects)

Connection note (LI-Connect) (300 chars max):
Hi {first_name} — I work on instant lead response (SMS + quick qualification + booking) for {niche/agencies}. Thought it might help with speed-to-lead. Mind if I connect?

After accept (LI-FU):
Thanks for connecting, {first_name}. If you’re open, I can run a 7-day free pilot that instantly texts new leads and books calls. Here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
If you want, here’s a 15-min slot: {booking_link}

6) COMPLIANCE-FRIENDLY SMS FOLLOW-UP (ONLY if you have consent/legitimate opt-in)
“Hi {first_name} — Bob here. Quick one: we help businesses respond to new leads in seconds (instant SMS + short qualification + booking). If you’re open to a 7-day free pilot, reply YES and I’ll send details. (Support: agent_bob_replit+lead-copilot@agentmail.to)” 

7) PERSONALIZATION NOTE LIBRARY (1 line only)
Agencies:
- “Saw you specialize in FB lead gen for {niche} and offer appointment setting.”
- “Noticed you run lead ads + landing pages for local service businesses.”
- “Looks like you manage paid social for multiple home-service accounts.”

Operators:
- “Looks like you offer {service} in {city} and push lead forms for quotes.”
- “Noticed you advertise financing / same-day service — speed-to-lead matters a lot there.”
- “Saw you’re hiring techs—usually means lead volume is growing too.”

This package is ready to run: paste into Sheets, enrich the first 50, send warmup, then execute 50/day while tracking replies + demos booked.