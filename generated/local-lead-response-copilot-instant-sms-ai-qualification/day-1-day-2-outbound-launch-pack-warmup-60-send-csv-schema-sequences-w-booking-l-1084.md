# Day-1/Day-2 Outbound Launch Pack (Warmup + 60-send CSV schema + Sequences w/ Booking Link)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T12:26:06.133Z

---

Below is the ready-to-run launch pack to begin sending immediately (warmup today, ramp tomorrow). It includes (1) the warmup plan, (2) a mail-merge CSV schema for the first 60 sends, and (3) final outreach sequences (Agency + Operator) that reference the proof URL and support email.

1) Deliverability-first warmup + ramp plan
Today (Warmup — 15 total 1:1 emails)
- Send 15 plain-text emails manually (no links in first sentence; 1 link max per email).
- Mix 10 agencies + 5 operators.
- Stagger: 1 email every 6–10 minutes over ~2 hours.
- Goal: generate at least 2–3 replies (even “not interested” helps mailbox reputation).
- If any bounces occur, stop and remove that domain/pattern.

Tomorrow (Ramp — 45 personalized emails)
- Send 45 total (30 agencies, 15 operators) in 3 blocks of 15.
- Keep subject lines varied (rotate 4 subjects).
- Keep to plain text, no images, no attachments.
- CTA is “Worth a quick look?” + booking link.

2) Mail-merge CSV schema (copy headers exactly)
FirstName,LastName,Company,Role,Segment,Niche,Location,Email,LinkedInURL,WebsiteURL,PersonalizationLine,Sequence,SubjectLine,BookingLink,ProofURL,ReplyToEmail,Status,LastTouchDate,Notes

Field defaults to use:
- BookingLink: (your Calendly 15-min link)
- ProofURL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- ReplyToEmail: agent_bob_replit+lead-copilot@agentmail.to
- Sequence: Agency-2Step or Operator-2Step
- Status: Queued / Sent / Replied / Demo Booked / Not a Fit / Bounce

3) Final outreach sequences (ready to paste)

A) AGENCY SEQUENCE (2-step)

Email 1 (Day 0)
Subject options (rotate):
1) Speed-to-lead for your FB leads
2) Quick idea for {Company}’s lead gen
3) Cut lead leakage (home services)
4) 7-day pilot for faster bookings

Body:
Hi {FirstName} — {PersonalizationLine}

I’m Bob. We built Local Lead Response Copilot: it instantly texts new leads from forms/FB ads, asks 2–4 short qualifying questions, then books the call/appointment automatically.

Agencies use it to improve speed-to-lead (especially after-hours) and lift booked-call rate without adding staff.

If you want, I can set up a 7-day pilot for one client: same-day install, your questions, your calendar, and we’ll track response time + booked appointments.

Worth a quick look? Here’s the live info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book 15 min: {BookingLink}

— Bob
Reply here or email: agent_bob_replit+lead-copilot@agentmail.to

Email 2 (Day 2)
Subject: Re: speed-to-lead

{FirstName}, quick nudge — the main win we see is capturing leads that otherwise go cold in the first 5 minutes.

If you tell me one niche you’re running lead gen for (HVAC, roofing, plumbing, pest, water damage, med spa), I’ll send back a tight 4-question qualification flow you can deploy.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
15-min link: {BookingLink}

— Bob (agent_bob_replit+lead-copilot@agentmail.to)

Optional LinkedIn connect note (same day as Email 1)
“{FirstName} — saw {Company} runs lead gen for home services. We built an instant SMS + AI qualification + auto-booking flow to improve speed-to-lead. Shared details here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 — open to connect?”

B) OPERATOR SEQUENCE (2-step)

Email 1 (Day 0)
Subject options:
1) Missing leads after hours?
2) Faster response to web/FB leads
3) Can I help you book more calls?
4) 7-day pilot: instant SMS follow-up

Body:
Hi {FirstName} — {PersonalizationLine}

I’m Bob. We built Local Lead Response Copilot: when someone fills your form or FB lead ad, it instantly texts them, asks a couple quick questions (job type, urgency, location), then books them on your calendar.

Most local shops lose conversions just from slow response (especially evenings/weekends). This fixes that without hiring an extra admin.

I can set up a 7-day pilot so you can see booked calls/appointments from the same leads you already pay for.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
15-min intro: {BookingLink}

— Bob
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (Day 2)
Subject: Re: instant text-back

{FirstName}, if you’re already paying for leads, the fastest win is replying in under 60 seconds.

If you reply with:
1) your niche (HVAC/roofing/plumbing/etc.), and
2) whether you want calls or appointments,
I’ll send back the exact 3–4 question flow we’d use for your pilot.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4n2uiq6w8j.picard.replit.dev/sites/4
Book: {BookingLink}

— Bob (agent_bob_replit+lead-copilot@agentmail.to)

Compliance-friendly optional SMS follow-up (ONLY to existing business numbers or prior opt-in lists)
“Hi {FirstName} — Bob here. Quick question: do you want new web/FB leads to auto-book calls/appointments within 60 seconds? Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 Reply STOP to opt out.”

Execution note: Once the first 15 warmup emails are sent, immediately log outcomes and adjust subject lines if bounce rate >3% or if replies are <1/15. The goal is simply replies + demos; keep the CTA frictionless (15 minutes).