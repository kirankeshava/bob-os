# Outbound Execution System v3 — Tracker + Day-1 Batch + Sequences (Agency & Operator) + LinkedIn/SMS

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T13:33:13.939Z

---

Below is the complete, ready-to-use outbound system for Local Lead Response Copilot (Instant SMS + AI Qualification).

BUSINESS REFERENCES (use in every message)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to/support email: agent_bob_replit+lead-copilot@agentmail.to

A) TRACKING SHEET / CRM (Google Sheets schema)
Create a sheet with 4 tabs:

TAB 1: Leads
Columns:
1) Lead ID (A001…)
2) Segment (Agency | Operator)
3) Company
4) Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa/Marketing Agency)
5) Location
6) Decision Maker Name
7) Role (Owner/Founder/GM/Head of Growth)
8) Email
9) LinkedIn URL (person)
10) Company URL
11) Source (Clutch/UpCity/Google Maps/LinkedIn/Upwork/FB group)
12) Source URL
13) Personalization Line (1 sentence)
14) Offer (7-day pilot)
15) Status (Not Started | Warmup Sent | Sent Step 1 | Sent Step 2 | Replied | Interested | Demo Booked | No Fit | Closed Won | Closed Lost)
16) Last Touch Date
17) Next Touch Date
18) Notes

TAB 2: Touches (one row per touch)
Columns: Lead ID | Date | Channel (Email/LinkedIn/SMS) | Step (1/2) | Message Variant | Outcome (Sent/Reply/No deliverable) | Notes

TAB 3: Replies
Columns: Lead ID | Date | Reply Type (Positive/Neutral/Objection/Unsubscribe) | Key details | Next step | Owner

TAB 4: Demos
Columns: Lead ID | Demo date/time | Show? | Result | Follow-up date | Pilot started? | $ outcome

Status rules:
- Every send gets logged in Touches.
- Leads tab is the single source of truth for current status + next touch date.

B) DAY-1 BATCH (50 PROSPECTS) — STRUCTURE TO FILL + EXAMPLES
Use this exact row format in your Leads tab. Below are 10 examples (5 agencies, 5 operators) showing the level of specificity required; extend to 50 by continuing the same pattern.

Example rows (copy format):
1) Segment: Agency | Company: {Agency Name} | Role: Founder/Owner | Source: Clutch/UpCity | Source URL: {link}
   Personalization line: “Noticed you run FB lead gen for home services—speed-to-lead is usually the biggest leak point.”
2) Segment: Agency | Company: {Agency Name} | Role: Head of Growth | Source: LinkedIn | Source URL: {link}
   Personalization line: “Saw your case studies on lead ads—curious if you’re automating first-response + qualification after form fills.”
3) Segment: Agency | Company: {Agency Name} | Role: Owner | Source: Upwork Agency Profile | Source URL: {link}
   Personalization line: “Your profile highlights Facebook Lead Ads—our tool texts leads instantly and filters tire-kickers before the client calls.”
4) Segment: Agency | Company: {Agency Name} | Role: Founder | Source: UpCity | Source URL: {link}
   Personalization line: “You focus on local service businesses; we’ve been solving the ‘lead comes in, nobody responds fast’ problem.”
5) Segment: Agency | Company: {Agency Name} | Role: CEO | Source: Clutch | Source URL: {link}
   Personalization line: “You specialize in home services—instant SMS + AI qualification can lift booked calls without changing ad spend.”

6) Segment: Operator | Company: {Roofing Co} | Niche: Roofing | Role: Owner/GM | Source: Google Maps | Source URL: {link}
   Personalization line: “You’re getting inbound quote requests—instant text response is the fastest way to stop competitors from winning the lead.”
7) Segment: Operator | Company: {HVAC Co} | Niche: HVAC | Role: Owner | Source: Google Maps | Source URL: {link}
   Personalization line: “After-hours leads are brutal in HVAC—this texts and qualifies in under a minute, then books a call.”
8) Segment: Operator | Company: {Plumbing Co} | Niche: Plumbing | Role: Owner | Source: Google Maps | Source URL: {link}
   Personalization line: “If you’re buying leads or running forms, speed-to-lead usually decides who gets the job.”
9) Segment: Operator | Company: {Pest Control Co} | Niche: Pest | Role: GM | Source: Google Maps | Source URL: {link}
   Personalization line: “Pest leads are high intent—an instant text + a few questions can convert more before your office calls back.”
10) Segment: Operator | Company: {Med Spa} | Niche: Med Spa | Role: Owner/Director | Source: Google Maps/Instagram | Source URL: {link}
   Personalization line: “For med spas, fast follow-up on FB/IG leads is everything—this auto-texts and pre-qualifies so you only call serious people.”

C) 2-STEP EMAIL SEQUENCES (MAIL-MERGE READY)

SEQUENCE 1 — AGENCIES (FB lead-gen for home services)

Email 1 (Step 1)
Subject options (rotate):
1) Quick idea to lift booked calls from your lead ads
2) Speed-to-lead fix for your home services clients
3) Are your leads getting contacted in under 60 seconds?

Body:
Hi {{FirstName}} — quick one.

{{PersonalizationLine}}

We built Local Lead Response Copilot: it instantly texts new form/FB leads, asks 2–4 short AI-driven questions, and then either books a call/appointment or routes the lead to the right place.

Most agencies we talk to are paying for leads that don’t get a fast first response (especially after-hours). This closes that gap without changing your ads.

Would you be open to a 15-min look? If it’s a fit, I’ll set you up with a 7-day pilot you can run on one client.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Or reply here: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email 2 (Step 2, send 48 hours later)
Subject: Re: speed-to-lead for your lead ads

Hi {{FirstName}} — following up.

If you have even one client where leads sit for 5–30 minutes before anyone responds, this usually increases booked calls just by responding instantly and filtering out low-intent leads.

Do you want to test it on a single campaign for 7 days? I can share the exact question flow + booking setup.

Best link to grab 15 mins? (Or I can send times.)
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
agent_bob_replit+lead-copilot@agentmail.to

— Bob

SEQUENCE 2 — OPERATORS (roofing/HVAC/plumbing/pest/water damage/med spa)

Email 1 (Step 1)
Subject options:
1) New leads → instant text follow-up (so you win more jobs)
2) Quick question about your incoming leads
3) Stop losing jobs to faster callbacks

Body:
Hi {{FirstName}} — I’ll be brief.

{{PersonalizationLine}}

We built Local Lead Response Copilot to solve the biggest leak in local services: slow response.
It instantly texts new leads from your forms/FB ads, asks a few short questions to qualify, then books a call/appointment (or routes urgent jobs).

If you’re open, I can set you up with a 7-day pilot so you can see if it increases booked calls without adding ad spend.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email 2 (Step 2)
Subject: Re: instant text follow-up

Hi {{FirstName}} — checking back.

If you’re getting leads from a form/FB ad/website, the first company to respond usually wins.
Want me to show you the 2–4 questions we use to qualify and then auto-book calls?

If you reply with your lead source (website form, FB lead ads, or both), I’ll suggest the simplest pilot setup.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
agent_bob_replit+lead-copilot@agentmail.to

— Bob

D) LINKEDIN SCRIPTS

Connection note (≤300 chars):
“{{FirstName}} — noticed you work with {{niche/home services}} leads. We built an instant SMS + AI qualification flow that boosts speed-to-lead + booked calls. Open to connect?”

Post-accept follow-up:
“Thanks for connecting. If you’re open, I can share a 7-day pilot to auto-text + qualify new leads and book calls. Here’s the quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 — easiest to reply at agent_bob_replit+lead-copilot@agentmail.to”

E) OPTIONAL SMS FOLLOW-UP (ONLY WHERE YOU HAVE PROPER CONSENT/EXISTING RELATIONSHIP)
“Hi {{FirstName}} — Bob here. Quick one: we help {{agency/operators}} respond to new leads instantly via SMS + short qualification, then auto-book calls. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 — ok to share details?”

F) SENDING SOP (DELIVERABILITY-SAFE)
Day 0–1: Send 10–20 true 1:1 emails (no links in a few; vary wording) to warm the inbox.
Day 1: Send up to 50 total (including warmups). Keep personalization to 1 sentence.
Day 2–4: 40–60/day until 200 total. Avoid spammy formatting; keep to plain text.
Follow-ups: Step 2 at +48 hours to non-responders.
Logging: Every send gets a Touches row + Next Touch Date.

This system is ready to execute immediately: fill the Day-1 list to 50 with direct emails, send warmups, then run the full 200 with tracking and follow-ups.