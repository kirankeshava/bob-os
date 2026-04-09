# Day-1 Outbound Package (60-target batch + email/LinkedIn scripts + logging rules) — Local Lead Response Copilot

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** copy
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T19:33:14.740Z

---

Below is a ready-to-execute Day-1 outbound package: (1) scripts to send, (2) LinkedIn notes, and (3) the exact fields/rules to log each outreach so we can hit 200 total messages with measurable outcomes.

A) EMAIL SEQUENCE — AGENCY (FB lead-gen / home services)
Subject options (pick 1):
1) “Speed-to-lead for your {{client_niche}} leads”
2) “Quick question re: your FB lead ads”
3) “Stop losing after-hours leads (7-day pilot)” 

Email #1 (send as plain text)
Hi {{first_name}} — saw {{agency_name}} runs lead gen for {{client_niche}}.

When new leads hit a form/FB Lead Ad, most local businesses lose them in the first 5 minutes. We built a small “lead response copilot” that instantly texts the lead, asks 2–4 qualifying questions, then books a call/appointment automatically.

If helpful, we’ll set up a free 7-day pilot for one of your accounts (no charge) so you can show higher contact + booked-call rate.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Want me to set the pilot up for one client this week?

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Opt-out: reply “no” and I won’t follow up.

Email #2 (48 hours later)
Subject: “Worth piloting on 1 account?”
{{first_name}}, quick follow-up — if you’re already doing fast lead response, totally understand.

If not: we can plug into your existing form/FB lead flow and handle instant SMS + qualification + booking for 7 days so you can compare results.

Is there a client where speed-to-lead is currently a problem (HVAC/plumbing/roofing/pest/etc.)?
— Bob
agent_bob_replit+lead-copilot@agentmail.to

B) EMAIL SEQUENCE — LOCAL OPERATOR (HVAC/roofing/plumbing/pest/water damage/med spa)
Subject options:
1) “Do you text new leads in <60 seconds?”
2) “More booked jobs from the same leads (free 7-day pilot)”
3) “Quick fix for missed leads”

Email #1
Hi {{first_name}} — I’m reaching out because {{company_name}} looks like it’s actively generating new leads.

Most local businesses miss a chunk of inbound leads because response is slow (especially nights/weekends). We set up an instant SMS responder that contacts the lead immediately, asks a couple quick questions, and then books a call/appointment.

We’re doing a free 7-day pilot right now:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

If you tell me where leads come from (website form / FB ads), I’ll outline the simplest setup.
— Bob
agent_bob_replit+lead-copilot@agentmail.to

Opt-out: reply “no” and I won’t follow up.

Email #2 (48 hours later)
{{first_name}}, should I close the loop?
If you’re open, I can set up the 7-day pilot so every new lead gets a text in under a minute + basic qualification + booking.

What’s the best number/email to route new leads to?
— Bob

C) LINKEDIN CONNECTION NOTES (keep to ~250 characters)
Agency owner note:
“{{first_name}} — saw {{agency_name}} runs lead gen for {{client_niche}}. We built an instant SMS + AI qualifier that boosts speed-to-lead + booking. Free 7-day pilot for one account. Open to connect?”

Operator note:
“{{first_name}} — quick Q: do your new leads get a text in the first minute? We help {{niche}} companies instantly respond + qualify + book. Free 7-day pilot. Open to connect?”

D) PERSONALIZATION LINE FORMULA (use 1 per send)
Pick one:
1) “Noticed you mention {{service}} on your site — speed-to-lead tends to be biggest for {{service}} requests.”
2) “Saw you’re running {{platform}} lead gen — are leads going to a form or straight to a calendar?”
3) “Looks like you serve {{city/area}} — do leads come in after-hours/weekends?”

E) CRM LOGGING RULES (minimum fields per touch)
For each prospect row, log:
- Prospect Type: Agency / Operator
- Company / Website / Source URL
- Contact Name + Role (or ‘Unknown’)
- Email (or ‘Contact form’)
- LinkedIn URL
- Niche + Location
- Personalization line used
- Touch 1 Date/Time + Channel (Email/LI)
- Subject line used (if email)
- Status: Queued / Sent-1 / Sent-2 / Replied / Demo Booked / Not Fit
- Reply summary (paste key sentence)
- Next step date

This package is designed so we can send 20 warmup 1:1 emails immediately, then ramp to 60 on Day 1 and continue daily until we complete 200 total outreaches with consistent tracking.