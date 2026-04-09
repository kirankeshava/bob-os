# Outbound Tracking Sheet + First-Batch Send Pack (Fields, Statuses, and Ready-to-Paste Templates)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** template
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T10:56:56.711Z

---

Below is a ready-to-paste tracking/CRM structure plus the exact outbound templates to use for the first 50–60 sends.

BUSINESS LINKS (use in every touch)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to/support: agent_bob_replit+lead-copilot@agentmail.to
- Demo booking link: (insert your Calendly 15-min link)

A) GOOGLE SHEETS / CRM STRUCTURE (tabs)
TAB 1: LEADS
Columns (in order):
1) LeadID
2) Segment (Agency | Operator)
3) Company
4) Niche (HVAC/Plumbing/Roofing/Pest/WaterDamage/MedSpa | Agency: Home Services/Local)
5) City
6) State
7) Country
8) DecisionMakerName
9) Role (Owner | Founder | CEO | Head of Growth | Marketing Director)
10) Email
11) Phone (optional)
12) LinkedIn Person URL
13) LinkedIn Company URL
14) Website URL
15) Source (Clutch/UpCity/GoogleMaps/LinkedIn/Upwork/FB Group)
16) Source URL
17) PersonalizationLine (1 sentence)
18) Offer (7-day pilot)
19) Status (Not Sent | Warmup Sent | Sent-1 | Sent-2 | Replied | Interested | Demo Booked | Closed Won | Closed Lost | Do Not Contact)
20) Last Touch Date
21) Next Follow-up Date
22) Notes

TAB 2: TOUCHES (one row per touch)
Columns:
1) LeadID
2) Date
3) Channel (Email | LinkedIn | SMS)
4) Touch # (1 | 2 | 3)
5) Template Used (Agency-Email-1, Operator-Email-1, etc.)
6) Subject (if email)
7) Outcome (Sent | Bounced | Replied | Connected | Not Delivered)
8) Reply Summary
9) Next Step

TAB 3: PIPELINE SUMMARY
Metrics to compute daily:
- Emails sent today / total
- Reply rate (Replies / Sent)
- Positive rate (Interested+DemoBooked / Sent)
- Demos booked
- No-response count (needs follow-up)

B) DAILY SENDING RULES (to protect deliverability)
Day 1: 10–20 warmup 1:1 sends (manual, no links in 50% of messages). 
Day 2–4: 40–60/day max. Keep a 60/40 split: 60% agencies, 40% operators.
If bounce rate > 5% in any batch, pause and switch to contact forms/LinkedIn for the remaining.

C) SEQUENCE TEMPLATES (copy/paste)

1) AGENCY SEQUENCE

Agency Email #1 (Touch 1)
Subject options:
- Quick idea to lift your FB lead ROI (speed-to-lead)
- Are your leads getting a 60-second text?
- 7-day speed-to-lead pilot for your home service clients

Body:
Hi {{FirstName}} — {{PersonalizationLine}}

If you’re running FB lead gen for local/home service clients: the biggest leak I see is speed-to-lead (leads sit 5–30 mins, after-hours, weekends).

We built Local Lead Response Copilot: it instantly texts new leads, asks 2–4 qualifying questions, and books a call/appointment automatically.

Would you be open to a 7-day pilot on one client? We’ll measure:
- time-to-first-response
- contact rate
- qualified appointments booked

Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
If easier, book 15 mins here: {{CalendlyLink}}
Or reply here: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Agency Email #2 (Touch 2, +2 days)
Subject: Re: speed-to-lead pilot

Hi {{FirstName}} — quick bump.

If you already have automation, the difference is we qualify via short AI-driven questions and route/book the right leads immediately (especially after-hours).

Worth testing on 1 account for 7 days? {{CalendlyLink}}

— Bob

LinkedIn Connect Note (Agency)
{{FirstName}} — saw you work on FB lead gen for local businesses. We built an instant SMS + AI qualification flow to prevent speed-to-lead leakage. Open to a 7-day pilot on one client?


2) OPERATOR SEQUENCE

Operator Email #1 (Touch 1)
Subject options:
- Missed leads after-hours?
- 60-second text-back for {{Niche}} leads
- Quick way to book more estimates from your form leads

Body:
Hi {{FirstName}} — {{PersonalizationLine}}

When a new lead comes in (website/FB), we send an immediate text, ask a couple quick questions (service needed, urgency, zip code, etc.), then book the right next step.

It’s called Local Lead Response Copilot. The goal is simple: respond in under 60 seconds and turn more of your leads into booked jobs.

Here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book 15 mins: {{CalendlyLink}}
Or reply: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Operator Email #2 (Touch 2, +2 days)
Subject: Re: instant text-back

Hi {{FirstName}} — if I could show you a 7-day pilot where every new lead gets an instant text + qualification (and you only talk to qualified leads), would that be worth a quick look?

{{CalendlyLink}}

— Bob

Optional SMS Follow-up (only where compliant/opt-in or existing business relationship)
Hi {{FirstName}}, Bob here — quick one: we help {{Company}} respond to new leads in <60 seconds via instant SMS + 2–4 questions, then book appointments. Want me to send details? Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

D) PERSONALIZATION LINE FORMULA (fast)
Pick ONE:
- “Saw you specialize in FB lead gen for {{Niche}} companies.”
- “Noticed you mention ‘we run Facebook ads’ on your site — curious how fast leads get contacted.”
- “Saw your Google reviews are strong — guessing you’re getting lead volume; speed-to-lead is usually the constraint.”
- “Looks like you serve {{City}}; after-hours leads are usually where bookings get lost.”

E) FIRST-BATCH DATA FIELDS (for CSV/mail-merge)
Headers:
FirstName,Company,Segment,Niche,City,PersonalizationLine,Email,LinkedInURL,WebsiteURL,CalendlyLink

Populate 50–60 rows from your prioritized list. For any lead missing an email, put Contact Form URL in the Email field and send the same copy via the form (adjust greeting to “Hi there —”).

This pack is ready for immediate use to send the warmup batch and first 50 outreaches while tracking every touch and outcome.