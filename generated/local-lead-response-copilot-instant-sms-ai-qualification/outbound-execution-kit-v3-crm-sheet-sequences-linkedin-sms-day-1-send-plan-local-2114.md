# Outbound Execution Kit v3 — CRM Sheet + Sequences + LinkedIn/SMS + Day-1 Send Plan (Local Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T19:45:55.322Z

---

Below is a copy/paste-ready outbound kit to execute 200 targeted outreaches for Local Lead Response Copilot.

BUSINESS REFERENCES (use in every customer-facing message)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to / support: agent_bob_replit+lead-copilot@agentmail.to

A) CRM / TRACKING SHEET (Google Sheets structure)
Create a Google Sheet with 4 tabs:

TAB 1 — LEADS (one row per prospect)
Columns:
1) LeadID (e.g., A001)
2) Segment (Agency / Operator)
3) Company
4) WebsiteURL
5) Source (Clutch / UpCity / LinkedIn / Google Maps / Upwork / FB Group)
6) City
7) State
8) Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa/Agency)
9) ContactName
10) Role (Owner/Founder/Head of Growth/Marketing Director)
11) Email
12) Phone (optional)
13) LinkedInPersonURL
14) LinkedInCompanyURL
15) ContactRoute (Direct email / Contact form / LinkedIn DM)
16) PersonalizationLine (1 sentence)
17) Speed-to-Lead Signal (after-hours, form-only, ‘request quote’, FB lead ads, etc.)
18) Status (Not Contacted / Warmup Sent / Step1 Sent / Followup Due / Replied / Demo Booked / Not Now / Closed Won / Closed Lost)
19) LastTouchDate
20) NextTouchDate
21) Consent/Compliance Notes (ONLY send SMS where you have consent/relationship; otherwise email/LinkedIn)
22) Notes

TAB 2 — TOUCHES (activity log)
Columns:
1) Date
2) LeadID
3) Channel (Email / LinkedIn / SMS)
4) Step (Warmup / Step1 / Step2 / LinkedIn Connect / LinkedIn Follow-up)
5) Copy Variant (A/B/C)
6) Outcome (Sent / Delivered / Bounced / Opened (if known) / Replied)
7) Reply Summary
8) Next Action

TAB 3 — REPLIES
Columns:
1) Date
2) LeadID
3) Reply Type (Interested / Question / Referral / Not now / Unsubscribe)
4) Objection
5) Your Response Sent? (Y/N)
6) Demo Link Sent? (Y/N)
7) Demo Date/Time

TAB 4 — DASHBOARD
Simple counters (use COUNTIF):
- Total Leads
- Step1 Sent
- Replies
- Reply Rate
- Demos Booked
- Demo Rate
- Unsubscribes

B) EMAIL SEQUENCES (2-step) — AGENCY
Goal: get agencies running FB lead gen for local services to test “instant SMS + AI qualification + booking” for 7 days.

Agency Step 1 (Email) — choose one subject line
Subject options:
A) Quick idea to boost your FB lead-gen close rate
B) Speed-to-lead fix for {{Company}}
C) 7-day pilot for your home-service clients?

Body:
Hi {{FirstName}} — quick question.

When {{Company}} runs FB lead-gen for local/home-service clients, do leads ever sit 5–30 minutes before someone responds (especially nights/weekends)? That delay usually crushes show-rate.

We built Local Lead Response Copilot: it instantly texts new leads, asks 2–4 qualification questions, and routes/bookings automatically.

{{PersonalizationLine}}

Open to a free 7-day pilot on one client? If it doesn’t increase qualified conversations, you keep the playbook.

Details/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Or reply here: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Agency Step 2 (Email) — send +2 business days
Subject: Re: speed-to-lead at {{Company}}
Body:
Hi {{FirstName}} — circling back.

If you’re open to it, I can set up the pilot so your client’s new leads get an instant text + quick qualification, then it either books a call/appointment or routes to your team.

What’s the best place to start?
1) One home service client (HVAC/plumbing/roofing)
2) Your highest CPL campaign where contact rate is lagging

If you prefer, just reply “pilot” and the niche + city, and I’ll propose the exact flow.

— Bob | agent_bob_replit+lead-copilot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

C) EMAIL SEQUENCES (2-step) — LOCAL OPERATOR
Goal: get owners to test instant response + qualification + booking for 7 days.

Operator Step 1 (Email)
Subject options:
A) Missed leads after hours?
B) Quick fix for new web/FB leads at {{Company}}
C) Can I help you respond in under 60 seconds?

Body:
Hi {{FirstName}} — I noticed {{Company}} collects leads via {{PersonalizationLine}}.

Most local businesses lose a lot of booked jobs when leads wait even 5–10 minutes for a reply (especially after hours).

Local Lead Response Copilot instantly texts every new lead, asks a couple quick questions (job type, urgency, location), and then books a call/appointment or routes it to you.

Would you be open to trying it free for 7 days?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Operator Step 2 (Email) — send +2 business days
Subject: Re: responding to new leads at {{Company}}
Body:
Hi {{FirstName}} — should I close the loop?

If you tell me:
- your service area
- the main job types you want
- where leads come from (website form / FB ads)

…I’ll set up a simple qualification + booking flow for a free 7-day pilot.

— Bob
agent_bob_replit+lead-copilot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

D) LINKEDIN MINI-SEQUENCE (connection + 1 follow-up)
Connection note (300 chars-ish):
Hi {{FirstName}} — quick connect. I’m working on an instant speed-to-lead SMS + qualification flow for local/home-service leads. Saw {{Company}} does {{Angle}} and thought it might be relevant.

Follow-up after accepted:
Thanks for connecting, {{FirstName}}. If you ever see leads cooling off before someone replies, we built a simple copilot that instantly texts + qualifies + books. Free 7-day pilot. Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (or email me: agent_bob_replit+lead-copilot@agentmail.to). Want me to outline the flow for {{Company}}?

E) OPTIONAL SMS FOLLOW-UP (ONLY WHERE COMPLIANT)
Use only if (1) explicit opt-in exists, (2) you have an existing business relationship, or (3) you are replying to an inbound text.
SMS:
Hi {{FirstName}} — Bob here. Quick one: if new leads ever wait to hear back, we can instantly text + qualify + book them. Free 7-day pilot. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 (or reply to agent_bob_replit+lead-copilot@agentmail.to).

F) DAY-1 SEND PLAN (to reach 200 in 4 days without deliverability issues)
- Day 1: 15 warmup 1:1 emails (no links, short, plain text) + 35 personalized Step-1 emails (include site link; booking link if already in your Calendly).
- Day 2: 50 Step-1 emails + 20 LinkedIn connection requests.
- Day 3: 50 Step-1 emails + Step-2 follow-ups to Day-1 non-responders.
- Day 4: 50 Step-1 emails + Step-2 follow-ups to Day-2 non-responders.

Warmup email template (no links):
Subject: Quick question {{FirstName}}
Hi {{FirstName}} — are you the right person to ask about how {{Company}} follows up with new leads?
— Bob

PersonalizationLine examples (paste into {{PersonalizationLine}})
- “Noticed you highlight Facebook Lead Ads for contractors on your site—curious how fast those leads get a first response.”
- “Saw your ‘Request a Quote’ form doesn’t mention instant confirmation; do you text leads right away?”
- “Your Google reviews mention ‘quick response’—do you already have an automated text follow-up in place?”
- “Looks like you run multiple service-area campaigns; speed-to-lead usually makes or breaks booking rate.”

This kit is ready to execute: load the Leads tab, send warmups, then Step-1 emails; log every touch; run Step-2 on schedule; track reply/demo KPIs in the Dashboard.
