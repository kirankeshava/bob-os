# Batch-1 Outreach Pack (Mail-Merge CSV Fields + Email/LinkedIn Scripts + Logging Rules)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** copy
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T10:46:21.519Z

---

Below is the ready-to-paste outreach pack to send Batch-1 and continue ramping to 200 sends. It references the live site and support email.

1) Mail-merge CSV columns (exact headers)
- FirstName
- LastName
- Company
- Role
- Segment (Agency|Operator)
- Niche (HVAC|Plumbing|Roofing|Pest|Water Damage|Med Spa|Local Marketing)
- City
- State
- Email (leave blank if using contact form)
- ContactPath (email or URL to contact form)
- LinkedInURL (person)
- CompanyURL
- SourceURL (Clutch/UpCity/Google Maps/Upwork/LinkedIn)
- PersonalizationLine (1 sentence)
- SubjectVariant (A|B)
- BookingLink (Calendly 15-min intro)
- ProofURL (https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4)
- ReplyTo (agent_bob_replit+lead-copilot@agentmail.to)

2) Email Sequence — Agencies (2 steps)
Subject A: Quick idea to boost your FB lead conversion
Subject B: Speed-to-lead for {Company}’s client campaigns

Email 1:
Hi {FirstName} — {PersonalizationLine}

If you’re running FB lead-gen for home services, speed-to-lead is usually the biggest hidden lever: most leads go cold in minutes.

I’m piloting Local Lead Response Copilot: it instantly texts new leads, asks 2–4 qualifying questions, and hands you a booked call/appointment (or a qualified lead) automatically.

7-day pilot: we’ll plug into one client form/FB lead flow, define qualifying questions, and measure lift in contacted + booked rates.

Want me to map this to one of your active campaigns? Here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book a quick 15-min intro: {BookingLink}
Or just reply and I’ll send 2–3 questions I’d use for your niche.

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (48–72 hours later):
Hi {FirstName} — quick follow-up.

If you point me to a client niche (HVAC/plumbing/roofing/pest/etc.), I can send a draft qualifier flow + the exact “first text” that tends to lift bookings.

Still open to a 7-day pilot on one campaign? {BookingLink}

— Bob

3) Email Sequence — Operators (2 steps)
Subject A: Are you replying to new leads within 2 minutes?
Subject B: Missed leads after hours at {Company}

Email 1:
Hi {FirstName} — {PersonalizationLine}

When someone fills a form for {Niche}, whoever responds first usually wins. Local Lead Response Copilot instantly texts new leads, asks a few quick questions, and routes to a booked call/appointment (or a “qualified + ready” lead).

If you want, we can run a 7-day pilot on your existing form/FB lead flow. You’ll see: response time, % contacted, and % booked.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book 15 minutes: {BookingLink}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (48–72 hours later):
Hi {FirstName} — should I close the loop?

If you tell me where your leads come from (website form vs FB), I’ll outline a simple 3-question qualifier that filters out tire-kickers and gets real jobs booked faster.

Open to trying it for 7 days? {BookingLink}

— Bob

4) LinkedIn scripts (connect + follow-up)
Connect note (<=300 chars):
Hi {FirstName} — saw {Company} and your work in {niche/service}. I’m testing an instant SMS + AI qualifier that helps convert inbound leads faster. Mind if I connect? (overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4)

Post-accept message:
Thanks for connecting, {FirstName}. Quick one: are you (or your clients) replying to new leads in under 2 minutes? We’re running a 7-day pilot that auto-texts + qualifies + books. If you want, I’ll send a draft qualifier flow for your niche.

5) Optional SMS follow-up (only where compliant/opt-in exists)
“Hi {FirstName}—Bob here. Quick check: do you want to test instant SMS responses for new leads (qualify + book automatically) for 7 days? Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  Reply STOP to opt out.”

6) Logging rules (so we can hit 20 replies / 10 demos)
- Every send gets a row update: DateSent, Channel (Email/LI), Step (1/2), SubjectVariant (A/B), Status (Sent/Delivered/Reply/Demo/No-fit).
- Reply handling tags: Interested | Not now | Already have system | Wrong person | Unsubscribe.
- Booked demo: log date/time + notes (lead source, niche, current response time, existing tools).

This pack is ready for immediate sending and consistent tracking while we ramp to 200 outreaches.