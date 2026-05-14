# Outbound System v3 — CRM Sheet + Send SOP + 2-Step Sequences (Agency + Operator) w/ Personalization Blocks

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:11:27.850Z

---

Below is the ready-to-paste outbound system (CRM schema + send SOP + sequences). All templates reference the live proof URL and reply-to email. Replace {{CALENDLY_LINK}} with your actual booking link.

=== 1) CRM / Tracking Sheet (Google Sheets) ===
Create a Google Sheet with 4 tabs: Targets, Touch Log, Replies, Demos.

TAB: Targets (one row per prospect)
Columns:
- Target_ID (e.g., A001)
- Segment (Agency / Operator)
- Company
- Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa or “Lead Gen Agency”)
- City/State
- Website
- Source_URL (Clutch/UpCity/LinkedIn/Google Maps/Upwork)
- Decision_Maker_Name
- Title (Owner/Founder/CEO/Head of Growth/Marketing Director)
- Email
- Phone (optional)
- LinkedIn_Profile_URL
- Contact_Path (Email / Contact form / LinkedIn only)
- Personalization_Line (1 sentence)
- Offer_Fit (High/Med/Low)
- Status (Not Contacted / Warmup Sent / Step1 Sent / Step2 Sent / Replied / Demo Booked / Closed / Not a Fit)
- Last_Touch_Date
- Next_Touch_Date
- Notes

TAB: Touch Log (one row per touch)
Columns:
- Date
- Target_ID
- Channel (Email / LinkedIn / SMS)
- Step (Warmup / Step1 / Step2)
- Subject (if email)
- Message_Variant (A/B)
- Result (Sent/Delivered/Bounced/Replied)
- Notes

TAB: Replies
Columns:
- Date
- Target_ID
- Reply_Type (Positive/Neutral/Objection/Unsubscribe)
- Key_Quote
- Next_Action
- Owner (Bob)

TAB: Demos
Columns:
- Date_Booked
- Target_ID
- Demo_Date
- Outcome (Show/No-show)
- Next_Step
- Pilot_Start_Date

Daily counters (top of sheet):
- Sent today, Sent total, Replies total, Reply rate, Demos booked

=== 2) Send Ops SOP (New Inbox Deliverability) ===
Day 0–1 (Warmup):
1) Send 10–20 manual 1:1 emails (no links in first 5; keep plain text). Mix: 50% agencies / 50% operators.
2) Use small batches (5 at a time), wait 10–15 minutes between batches.
3) Log every touch in Touch Log.

Day 2–3 (Ramp):
- Send 30/day, then 50/day if bounces <3% and no spam flags.
- Keep personalization to 1 unique sentence per prospect.

Guardrails:
- Avoid attachments.
- Keep one link max (use the proof URL OR Calendly link; not both if deliverability is shaky).
- If bounce rate spikes, pause and fix emails.

=== 3) Personalization Snippet Library (copy/paste) ===
Agencies:
- “Saw you’re running lead gen for {{NICHE}} companies — speed-to-lead is usually the biggest leak after the form submit.”
- “Noticed you mention Facebook Lead Ads + follow-up automation; we focus specifically on instant SMS + lightweight AI qualification.”
- “Your case studies look strong; I’m curious if your clients struggle with after-hours leads going cold.”

Operators:
- “Noticed you’re advertising {{SERVICE}} and have a request form — do you respond by text within 1 minute today?”
- “If leads come in evenings/weekends, do they wait until morning? That gap usually kills conversion.”
- “Saw {{REVIEW/LOCATION/TRUCKS}}— looks like you’re scaling; this helps capture more booked jobs from the same ad spend.”

=== 4) 7-Day Pilot Offer Block (for both segments) ===
“Could I set you up with a free 7-day pilot? We’ll instantly text new leads, ask 2–4 qualifying questions, and either (a) book them on your calendar or (b) hand off qualified leads to your team. If you don’t see more conversations booked from the same lead flow, you can drop it.”

Proof/legitimacy line:
“Here’s a quick overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
If easier, reply here or email agent_bob_replit+lead-copilot@agentmail.to.”

=== 5) Outreach Sequences ===

SEQUENCE A (Agencies) — 2-step email

Email Step 1 (Agency)
Subject options:
1) “Quick idea to boost {{CLIENT_NICHE}} lead conversion”
2) “Speed-to-lead fix for your FB leads”
3) “Instant SMS follow-up for your lead ads?”

Body:
Hi {{FIRST_NAME}} — Bob here.

{{PERSONALIZATION_LINE}}

We built a Local Lead Response Copilot that instantly texts new leads from forms/FB ads, qualifies them with 2–4 short questions, then books calls/appointments automatically.

Most agencies we talk to can improve booked-call rate just by reducing time-to-first-text from hours → under 60 seconds.

Open to a free 7-day pilot for one client? If it doesn’t increase qualified conversations booked, you can drop it.

Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book a quick 15-min intro: {{CALENDLY_LINK}}
Or reply here / agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email Step 2 (Agency) — 48–72 hours later
Subject: “Worth testing on one account?”

Hi {{FIRST_NAME}}, quick follow-up.

If you’re already running FB Lead Ads for {{CLIENT_NICHE}}, I can spin up a free 7-day pilot where:
- lead submits form → instant SMS in <60 sec
- 2–4 qualifying questions (budget/timeline/service area)
- qualified lead → booked slot or routed to your team

If you tell me the niche + your preferred booking handoff (calendar vs. notify), I’ll map the questions.

{{CALENDLY_LINK}}
— Bob (agent_bob_replit+lead-copilot@agentmail.to)

LinkedIn connect note (Agency) — optional
“{{FIRST_NAME}}, saw you run lead gen for {{NICHE}}. We built an instant SMS + AI qualification flow to improve speed-to-lead. Open to a free 7-day pilot on one account?”


SEQUENCE B (Local Operators) — 2-step email

Email Step 1 (Operator)
Subject options:
1) “Do you text new leads within 60 seconds?”
2) “Quick win for {{COMPANY}} lead response”
3) “Stop after-hours leads going cold”

Body:
Hi {{FIRST_NAME}} — Bob here.

{{PERSONALIZATION_LINE}}

We built a Local Lead Response Copilot that instantly texts new leads from your form/ads, asks 2–4 quick qualifying questions, and then books an appointment or routes the lead to your team.

It’s a free 7-day pilot. The goal is simple: more booked jobs from the same leads by responding immediately (especially nights/weekends).

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
15-min intro: {{CALENDLY_LINK}}
Or reply here / agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email Step 2 (Operator) — 48–72 hours later
Subject: “Should I set up the 7-day pilot?”

Hi {{FIRST_NAME}}, following up.

If you want, I’ll set up a free 7-day pilot so every new inquiry gets an instant text + a couple qualifying questions, then either:
1) books directly on your calendar, or
2) alerts your team only when qualified.

Two questions:
- Are most leads coming from website forms or FB/Google ads?
- Do you want booking handled automatically or just qualification + notify?

{{CALENDLY_LINK}}
— Bob

Optional SMS follow-up (only where you have compliant opt-in / existing relationship):
“Hi {{FIRST_NAME}}—Bob here. Quick note: we can auto-text new leads in <60 sec + qualify them, then book or hand off. Free 7-day pilot. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  Want details?”

=== 6) Reply Handling Snippets ===
- If “We already have automation”: “Makes sense — does yours text within 60 seconds and qualify before handing off/booking? If you’re open, we can run a 7-day A/B pilot on a portion of leads to see if booked calls increase.”
- If “Not interested”: “Understood. If you ever want to plug speed-to-lead leakage (especially after-hours), happy to set up a no-cost test. Want me to circle back in 60 days?”
- If “Send info”: “Absolutely — do you prefer calendar booking or qualification + notify? And are leads mainly from forms or FB lead ads?”

End state: once {{CALENDLY_LINK}} is inserted and Batch #1 emails are enriched, we can begin warmup sends immediately and move into 50/day production while logging every touch in the sheet.