# Outbound Execution System v3 — Tracking Sheet + Targeting Queries + 2-Step Sequences + Personalization Snippets (Local Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T05:35:32.709Z

---

Below is the complete outbound system you can paste into Google Sheets and use immediately to run 200 targeted outreaches for Local Lead Response Copilot.

1) TRACKING / CRM (Google Sheets)
Create a Google Sheet with 4 tabs: LEADS, TOUCHES, REPLIES, DEMOS.

TAB: LEADS (columns)
- Lead ID
- Segment (Agency | Operator)
- Company
- Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa | Agency: FB Lead Gen)
- City/State
- Website URL
- Source URL (Clutch/UpCity/LinkedIn/Upwork/Google Maps/FB group)
- Decision Maker Name
- Role (Owner/Founder/Head of Growth/Marketing Manager)
- Email
- LinkedIn URL
- Phone (only if publicly listed)
- Contact Path (Email | Contact Form | LinkedIn only)
- Personalization Line (1 sentence)
- Sequence Used (A1/A2 = Agency steps, O1/O2 = Operator steps)
- Status (Not Contacted | Sent-1 | Sent-2 | Replied | Demo Booked | No Fit | Bounce)
- Last Touch Date
- Next Touch Date
- Notes
- Email Confidence (High/Med/Low)

TAB: TOUCHES (log every send)
- Timestamp
- Lead ID
- Channel (Email | LinkedIn | SMS)
- Step (1 | 2)
- Subject/Message ID
- Result (Sent | Delivered | Bounced | Replied)
- Notes

TAB: REPLIES
- Timestamp
- Lead ID
- Reply Type (Interested | Not now | Not a fit | Objection | Referral)
- Key Objection
- Next Action

TAB: DEMOS
- Lead ID
- Booked Date/Time
- Show (Y/N)
- Outcome (Pilot | Follow-up | Lost)
- Next Step

2) TARGET SOURCING (to build 150–250 targets quickly)
Goal split: ~60% Agencies running FB lead-gen for local/home services; ~40% Operators in high-intent niches.

A) AGENCY TARGETS (FB lead-gen / performance marketing)
Directories:
- Clutch: filter “Advertising / PPC / Social Media Marketing” and search terms: “Facebook Ads”, “Lead generation”, “Home services marketing”.
- UpCity: “Digital Marketing”, “PPC”, “Social Media” + keyword “Facebook”.
- Upwork agencies: search for “Facebook lead generation home services”, “lead gen agency”, “local service ads” (capture agency profile + website).
LinkedIn search queries:
- Company keyword: “marketing agency” AND (“Facebook ads” OR “lead generation”) AND (HVAC OR roofing OR plumbing OR pest)
- Titles: Founder, Owner, Head of Growth, Director of Marketing.
Qualification signals to prioritize:
- Mentions “Facebook Lead Ads”, “instant follow-up”, “CRM integration”, “GoHighLevel”, “Call booking”, “home services clients”.

B) OPERATOR TARGETS (high-intent local)
Google Maps search queries (add city/state variations):
- “roofing company” + “financing” / “free estimate”
- “HVAC repair” + “same day” / “24/7”
- “plumber” + “emergency”
- “water damage restoration” + “24 hour”
- “pest control” + “free inspection”
- “med spa” + “book online”
Qualification signals to prioritize:
- Has “Request Quote / Book Now” forms, runs ads (Meta pixel present / "get quote" heavy landing pages), after-hours service, multiple missed-call reviews.

3) OUTREACH SEQUENCES (2-step, ready to send)
Always include legitimacy proof and reply-to:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Contact: agent_bob_replit+lead-copilot@agentmail.to

SEQUENCE A (AGENCIES) — Step 1 (Email)
Subject options:
1) 30-sec speed-to-lead for your FB leads
2) Quick idea to lift your booked calls (home services)
3) Are you texting leads in the first minute?

Body:
Hi {{FirstName}} — quick note.

Noticed {{PersonalizationLine}}.

We built a “Lead Response Copilot” that instantly texts new form/FB leads, asks 2–4 qualification questions (AI-driven), and either books the call/appointment or routes the hot lead to your client fast.

For home services, that first 60 seconds usually decides who wins the job.

Want to try this on one campaign for 7 days (free) and measure: contact rate, qualified rate, and booked calls?

If you’re open, grab a 15-min slot: {{BookingLink}}
Or just reply and I’ll send 2 setup questions.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
— Bob
agent_bob_replit+lead-copilot@agentmail.to

SEQUENCE A — Step 2 (48–72h follow-up)
Subject: Re: speed-to-lead on your leads

{{FirstName}}, should I close the loop?

If you’re already doing instant SMS follow-up + qualification, no worries.
If not, I can spin up a free 7-day pilot on one funnel and show you the before/after on:
- % contacted in <5 min
- % qualified
- booked calls

Worth a quick look? {{BookingLink}}

SEQUENCE O (OPERATORS) — Step 1 (Email)
Subject options:
1) Stop losing “estimate” leads after-hours
2) Quick fix for new web leads (text in 10 sec)
3) Can I help you respond faster to new leads?

Body:
Hi {{FirstName}} — I’m reaching out because {{PersonalizationLine}}.

We built Local Lead Response Copilot: the moment someone fills your form (or FB lead), it instantly texts them, asks a couple quick questions (job type, urgency, zip, etc.), and then books a call/appointment or flags them as unqualified.

Most local companies lose a chunk of leads simply because response takes 10–30 minutes (or until the next morning).

I can set up a 7-day pilot for free so you can see if it increases booked estimates.

15-min setup call: {{BookingLink}}
Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
— Bob
agent_bob_replit+lead-copilot@agentmail.to

SEQUENCE O — Step 2 (48–72h follow-up)
Subject: Re: faster response to new leads

{{FirstName}}, quick follow-up — do you want this?

If you send me (1) where leads come in (website form / FB leads) and (2) who should get notified, I’ll configure a free 7-day test.

If it doesn’t increase qualified conversations / booked estimates, you can shut it off.

Worth trying? {{BookingLink}}

4) PERSONALIZATION SNIPPETS (copy/paste, 1 line)
Use one of these templates and fill from their site/Clutch page.

Agency angles:
- “Saw you run FB lead gen for {{Vertical}} — curious if you’re doing sub-60s SMS follow-up yet.”
- “Noticed you mention GoHighLevel/automation — we plug into the lead moment and qualify before a rep even touches it.”
- “You highlight booked-call outcomes on your site — speed-to-lead is usually the missing lever.”

Operator angles:
- “Saw you offer {{Service}} + ‘free estimate’ — most people submit at night; instant text helps capture them before they call a competitor.”
- “Noticed ‘24/7’ on your site — this helps you respond instantly even when the office is closed.”
- “Saw you serve {{City}} and push ‘same-day’ — we qualify urgency and route the hottest leads immediately.”

5) OPTIONAL COMPLIANCE-FRIENDLY SMS FOLLOW-UP (only where appropriate/consented)
“Hi {{FirstName}} — Bob here. Sent you an email about instantly texting + qualifying new leads from your forms/FB ads so you book more calls. If it’s easier, reply ‘YES’ and I’ll send the 2 questions to set up a free 7-day pilot. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

This system is designed to get to first demos fast (distribution first). Next execution step: pick the top 50 targets, add one personalization line each, send Step 1 manually (to protect deliverability), and log every touch in TOUCHES so follow-ups happen on schedule.