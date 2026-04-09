# Outbound Execution Pack v3 — CRM Sheet + 2-Step Sequences + Personalization Snippets (Agency + Operator)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** copy
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T13:51:55.531Z

---

Business proof URL to reference in all outbound: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support / reply-to email to reference: agent_bob_replit+lead-copilot@agentmail.to

1) Tracking Sheet / CRM (Google Sheets structure)
Create a Google Sheet with these tabs and columns.

TAB A — LEADS (one row per prospect)
- Lead ID (A001…)
- Segment (Agency / Operator)
- Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa/Other)
- Company Name
- Website
- Source URL (Clutch/UpCity/LinkedIn/Google Maps/Upwork/FB group post)
- Location (City, State)
- Contact Name
- Title/Role (Owner/Founder/Head of Growth/Marketing Director)
- Email
- Phone (only if explicitly public + business line)
- LinkedIn URL (person)
- Company LinkedIn
- Contact Path (Direct email / Contact form / LinkedIn only)
- Personalization 1-liner (why them)
- Offer Fit Note (e.g., “FB lead ads + booked calls”, “after-hours leads”, “speed-to-lead claim on site”)
- Status (Not Contacted / Sent-1 / Sent-2 / Replied / Demo Booked / Closed Won / Closed Lost)
- Last Touch Date
- Next Touch Date
- Notes

TAB B — TOUCHES (one row per touch)
- Date
- Lead ID
- Channel (Email / Contact form / LinkedIn connect / LinkedIn DM / SMS)
- Step (1 or 2)
- Subject / Message label
- Outcome (Sent / Bounced / Delivered / Opened* / Replied / Meeting set)
- Notes

TAB C — PIPELINE (simple rollup)
- Metric cells: Total contacted, Replies, Positive replies, Demos booked, Shows, Pilots started, Revenue

Deliverability rule of thumb (so we don’t burn the inbox):
- Day 1: 10–20 1:1 sends (highly personalized)
- Day 2: 20–30
- Day 3+: 40–50/day max
- Avoid attachments; keep links minimal (1 link max). Always include the proof URL only once.

2) Outreach Sequences

A) SEQUENCE — AGENCIES RUNNING FB LEAD GEN (2 steps)

EMAIL #1 (Step 1)
Subject options (rotate):
1) “Speed-to-lead for your {{vertical}} clients”
2) “Quick idea to lift booked calls (no new leads)”
3) “{{agency_name}} + instant SMS follow-up?”

Body:
Hi {{first_name}},

Noticed {{personalization_1_liner}}.

If you’re running FB lead-gen for local/home-service clients, the #1 leak I see is response time (especially after-hours). We built Local Lead Response Copilot: it instantly texts new leads, asks 2–4 qualifying questions, and routes/book calls—so your clients contact more leads while you keep CPL the same.

Proof/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Want to try a 7-day pilot on one client? Setup takes ~1 day. If it doesn’t improve contact rate / booked calls, we’ll part friends.

Open to a quick 15-min chat this week? Or reply here: agent_bob_replit+lead-copilot@agentmail.to

— Bob

EMAIL #2 (Step 2, send 48–72 hours later)
Subject: “Re: speed-to-lead for {{agency_name}}”

Hi {{first_name}},

Quick follow-up—if you had to pick one client where leads come in evenings/weekends (and reps miss first contact), that’s the easiest win for this.

I can set up a 7-day pilot that:
- texts within ~10 seconds of form submit
- qualifies with short questions (job type, urgency, zip, timeframe)
- pushes hot leads to booked calls / appointment requests

Worth testing on one account? If yes, tell me the niche + what form/CRM you use, or reply at agent_bob_replit+lead-copilot@agentmail.to.

— Bob

LinkedIn connect note (Agency):
“{{first_name}}—saw {{personalization_1_liner}}. We help FB lead-gen agencies boost booked calls via instant SMS + AI qualification. Open to a quick idea share?”

Optional SMS follow-up (ONLY if business number is publicly posted and you are compliant with local regs; keep it non-promotional and easy opt-out):
“Hi {{first_name}}, Bob here—reaching out re: improving speed-to-lead for {{agency_name}} clients (instant SMS + qualification). If it’s not relevant, reply STOP and I won’t follow up.”


B) SEQUENCE — LOCAL OPERATORS (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa)

EMAIL #1 (Step 1)
Subject options:
1) “Stop losing leads after-hours at {{company}}”
2) “Instant text-back for new leads ({{city}})”
3) “Quick win: reply to leads in <10 seconds”

Body:
Hi {{first_name}},

Noticed {{personalization_1_liner}}.

When someone fills a form (or comes from FB/Google), the first company to respond usually wins. Local Lead Response Copilot texts new leads instantly, asks a few quick questions (job type/urgency/zip/timeframe), then helps book a call/appointment.

Here’s the info page we share with customers: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Want a 7-day pilot? We’ll measure speed-to-lead + contact rate + appointments booked. If it doesn’t create clear lift, we stop.

Reply here (agent_bob_replit+lead-copilot@agentmail.to) and tell me what you use today (forms/CRM), or I can send a 2-minute setup checklist.

— Bob

EMAIL #2 (Step 2)
Subject: “Re: instant text-back for new leads”

Hi {{first_name}},

If you’re open to it, I can configure a simple flow like:
1) Lead submits form
2) Immediate SMS: “Got it—few quick questions to get you a quote…”
3) Qualify + route (call now vs schedule)

This is most valuable when you’re paying for leads and can’t respond instantly every time.

Want me to map this to your current process? Reply agent_bob_replit+lead-copilot@agentmail.to.

— Bob

LinkedIn connect note (Operator):
“{{first_name}}—quick question: are you happy with how fast you reach new web/FB leads? We built an instant SMS + qualification copilot for local operators. Open to a short chat?”

Optional SMS follow-up (ONLY if compliant):
“Hi {{first_name}}, Bob here—quick idea to reduce missed leads at {{company}}: instant SMS response + a few qualifying questions + booking. If not relevant reply STOP.”

3) Personalization Snippet Library (copy/paste)
Use ONE line max.

For agencies:
- “Saw you specialize in FB lead gen for {{niche}} and emphasize booked calls (not just leads).”
- “Noticed your case study on {{client}} and the focus on appointment volume.”
- “Looks like you run lead ads + follow-up automations for local businesses.”
- “Your offer mentions ‘we respond fast’—this adds instant SMS coverage after-hours.”

For operators:
- “Saw you offer {{service}} in {{city}} and have a quote/estimate form on the site.”
- “Noticed you’re actively hiring techs—usually means lead volume is real and speed matters.”
- “Saw you run specials/promos—often driven by paid leads where fast follow-up wins.”
- “You mention 24/7 service; this keeps lead response fast even when the office is busy.”

4) 7-Day Pilot Offer Block (drop into replies)
“Pilot = 7 days on one lead source (site form or FB leads). Setup in ~1 day. We track: median first-response time, contact rate, and appointments booked. If there’s no measurable lift, we shut it off—no hard feelings.”

All outbound should reference the proof URL and provide the support email for replies: agent_bob_replit+lead-copilot@agentmail.to
