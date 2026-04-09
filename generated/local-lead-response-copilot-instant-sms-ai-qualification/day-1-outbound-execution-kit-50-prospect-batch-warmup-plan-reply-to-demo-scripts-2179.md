# Day-1 Outbound Execution Kit (50-prospect batch + warmup plan + reply-to-demo scripts)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T20:04:39.223Z

---

Below is the complete Day-1 execution kit to send the first outreach wave for Local Lead Response Copilot.

1) Mail-merge fields (CSV headers)
Use these exact columns so every email can be personalized quickly and logged cleanly:
- first_name
- company
- role
- segment (Agency/Operator)
- niche
- city
- personalization_line (single sentence)
- website_url (always use: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4)
- booking_link (Calendly 15-min intro)
- reply_email (always include: agent_bob_replit+lead-copilot@agentmail.to)
- source_url
- status (Queued/Sent/Replied/Booked/Not fit)
- last_touch_date
- next_touch_date

2) Day-1 50 prospect batch structure (what to include per row)
Split: 30 Agencies + 20 Operators.
For each row, your personalization_line must reference a real signal:
- Agencies: “Saw you run FB lead gen for [home service niche]—curious how you handle <60 sec speed-to-lead + after-hours?”
- Operators: “Noticed you’re advertising for [service] in [city]; if a lead sits 10 minutes, it often gets claimed elsewhere—want instant SMS qualification + booking?”

3) Sending schedule (deliverability-safe)
- Hour 0–6: Send 10–20 warmup emails (manual, 1:1) to the highest-fit agencies. Use plain text, no links in the first 5; then add the website URL from email #6 onward.
- Day 1 total cap: 25 emails.
- Day 2: 35 emails.
- Day 3+: 50/day until 200 total.
Operational rules:
- Keep each email under ~120 words.
- Use only one link (either the booking link OR the website URL). If you include both, make one plain text (not hyperlinked).
- Log every send immediately in the CRM with next_touch_date = +2 days.

4) Sequence A (Agency) — copy/paste
Subject options:
A) “Quick idea for your FB leads (speed-to-lead)”
B) “Plugging the 5-minute lead leak”

Email #1:
Hi {{first_name}} — {{personalization_line}}

We built Local Lead Response Copilot: when a new lead hits a form/FB ad, it instantly texts them, asks 2–4 short qualifying questions, and routes them to book a call/appointment automatically.

If you’re open to it, I’ll set up a free 7-day pilot for one client (or your agency) so you can measure lift in booked calls.

Worth a 15-min look? {{booking_link}}

— Bob
{{website_url}}
Reply: {{reply_email}}

Email #2 (48–72h later):
{{first_name}}, should I close the loop?

If you want, I can record a 2-min walkthrough showing exactly how the instant SMS + qualification flow would plug into your current FB lead forms.

If easier, book here: {{booking_link}}
— Bob
Reply: {{reply_email}}

5) Sequence B (Operator) — copy/paste
Subject options:
A) “Catching leads in <60 seconds for {{company}}”
B) “Question about your new leads”

Email #1:
Hi {{first_name}} — {{personalization_line}}

Local Lead Response Copilot instantly texts new leads, qualifies them with a few quick questions, then books them (or routes to your team) automatically—so you don’t lose the ‘ready now’ leads to faster competitors.

I can run it free for 7 days on your current form/ads and show: response time, qualified rate, and booked appointments.

Want me to set it up? {{booking_link}}
— Bob
{{website_url}}
Reply: {{reply_email}}

Email #2 (48–72h later):
{{first_name}}, are you the right person for lead follow-up at {{company}}?

If yes, I can get a pilot live in <30 minutes. If not, who should I talk to?

— Bob
Reply: {{reply_email}}

6) Reply-handling scripts (convert replies to demos)
If they reply “Interested / tell me more”:
“Awesome — quickest is 15 min. Here’s my link: {{booking_link}}. Before we meet: what’s your main lead source (FB, Google LSA, website) and do you use any CRM (Jobber/ServiceTitan/HubSpot)?”

If they reply “We already respond fast”:
“Makes sense. The pilot is mainly to prove whether instant SMS + pre-qual questions increases booked rate (not just response time). If we don’t move booked appointments in 7 days, we stop. Want to test on a small slice of leads?”

If they reply “Send info”:
“Will do. 3 bullets: instant text in <60 sec, 2–4 qualifying questions, auto-booking + handoff. Site: {{website_url}}. If you want, I’ll tailor it to your flow on a 15-min call: {{booking_link}}.”

7) LinkedIn connection note (optional, short)
“{{first_name}} — quick question: are you handling FB/form leads at {{company}}? We built an instant SMS + AI qualification + booking copilot to improve speed-to-lead. Open to a 7-day free pilot?”

This kit is ready to execute immediately: create the CSV with the headers above, fill 50 rows (30 agencies/20 operators), and begin warmup sends today while logging each touch for follow-up discipline and demo booking.