# Local Lead Response Copilot — Outbound Execution Playbook (200 Sends / 7 Days)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** playbook
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T13:14:32.876Z

---

Business legitimacy URL (include in every thread): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Reply-to contact email: agent_bob_replit+lead-copilot@agentmail.to

GOAL (7 days): 200 targeted outreaches → 20 replies → 10 demos booked.
Primary segments:
A) Agencies: local marketing agencies running FB lead-gen for home services.
B) Operators: HVAC, plumbing, roofing, pest, water damage, med spa (high-intent, lead-driven).

1) TRACKING SHEET / LIGHTWEIGHT CRM (Google Sheets structure)
Create a sheet with these tabs.

TAB 1 — Targets (one row per company)
- TargetID (e.g., A-001)
- Segment (Agency/Operator)
- Company
- Niche (e.g., HVAC, Roofing, Home Services FB Leads)
- City/State
- Website
- Source (Clutch/UpCity/LinkedIn/Google Maps/Upwork)
- SourceURL
- DecisionMakerName
- Role (Owner/Founder/Director of Marketing)
- Email
- LinkedInURL
- Phone (only if public + relevant)
- PersonalizationHook (1 line: what you noticed)
- Status (Not Contacted / Sent-1 / Follow-up Due / Replied / Demo Booked / Closed Won / Closed Lost)
- LastTouchDate
- NextTouchDate
- Notes

TAB 2 — Touches Log (every email/LI touch gets a row)
- Timestamp
- TargetID
- Channel (Email/LinkedIn)
- Step (1/2)
- Subject/MessageVariant
- Outcome (Sent/Bounced/Delivered/Opened/Clicked/Reply)
- Notes

TAB 3 — Replies
- Timestamp
- TargetID
- ReplyType (Positive/Neutral/Objection/Not Now/Unsubscribe)
- Key Objection / Ask
- Next Step (Book demo / Send info / Follow-up date)

TAB 4 — Demos
- TargetID
- DemoDate
- Attendees
- Outcome (No-show/Completed)
- Next Step (Pilot/Proposal/Close Lost)
- Pilot Start Date

TAB 5 — Metrics (daily)
- Date
- EmailsSent
- Replies
- PositiveReplies
- DemosBooked
- DemoHeld
- ReplyRate
- DemoRate

2) DAILY EXECUTION WORKFLOW (manual but fast)
Day 1: Enrich 60 targets → send 50 (25 agencies, 25 operators).
Day 2: Enrich + send 50 more → send follow-up step 2 to Day-1 non-responders.
Day 3-4: Send remaining 100 (50/day). Keep follow-ups rolling daily.
Rules:
- Personalize only the first line + 1 proof point (hook). Keep the rest standardized.
- Avoid cold SMS unless you have opt-in/reply or a prior relationship. Use LinkedIn as the second channel.
- Log every touch immediately (Targets + Touches Log).

3) OUTREACH SEQUENCES (paste-ready)

SEQUENCE A — AGENCIES (FB lead-gen for home services)

EMAIL 1 (Agency)
Subject options (pick one):
1) Quick idea for your {Niche} lead gen
2) Are your leads getting a <60s response?
3) Speed-to-lead fix for {AgencyName}

Body:
Hi {FirstName} — {PersonalizationHook}.

If you’re running FB lead forms for local home services, you’re probably losing a chunk of leads in the first 5–15 minutes (especially nights/weekends). We built a “Lead Response Copilot” that texts new leads instantly, asks 2–4 qualifying questions, and then books a call/appointment automatically.

7-day pilot offer: we’ll plug into one client’s form/FB leads, define the qualifier questions + routing, and track booked calls + response time improvement. If it doesn’t lift contact/booking rate, you don’t keep it.

Want me to show you in 15 minutes? You can reply here or grab a slot.
Legitimacy: {WebsiteURL}
Reply-to: agent_bob_replit+lead-copilot@agentmail.to

— Bob

EMAIL 2 (Agency) — send 2 business days later
Subject: Re: speed-to-lead for {Niche} leads

Hi {FirstName} — checking if this is worth testing on one active FB lead client.

Most agencies already drive the lead; the drop-off is the first reply. This just ensures every lead gets a text in <60 seconds, qualifies (budget/timeline/service area), then routes to a booked call.

If you tell me which vertical you’re pushing hardest (HVAC/roofing/plumbing/etc.), I’ll send 3 sample qualifier questions + the exact booking flow.
Legitimacy: {WebsiteURL}
Reply-to: agent_bob_replit+lead-copilot@agentmail.to


LINKEDIN (Agency) — connection note
{FirstName}, I help agencies improve speed-to-lead on FB lead forms (instant SMS + quick qualification + booking). Thought it might fit your home services work—open to connect?

LINKEDIN FOLLOW-UP (after accept)
Thanks for connecting. If you’re running FB lead forms, do your clients respond in under 1 minute consistently (including after-hours)? If not, we built a lightweight copilot that auto-texts + qualifies + books. Happy to share a 2-min walkthrough: {WebsiteURL} (or reply to agent_bob_replit+lead-copilot@agentmail.to).


SEQUENCE B — LOCAL OPERATORS (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa)

EMAIL 1 (Operator)
Subject options:
1) Missing leads after hours?
2) {CompanyName}: faster response to new leads
3) Quick fix for lead-to-booking

Body:
Hi {FirstName} — {PersonalizationHook}.

When a new lead comes in (website form / FB ad), the first 5 minutes decide who wins the job. We built a simple “Lead Response Copilot” that texts new leads instantly, asks a couple questions (job type, timeline, zip code), and then books the call/appointment automatically.

7-day pilot: we connect it to your form/leads, set your qualifying questions and booking rules, and you judge it on booked calls and response time.

Want to see it live? Reply here and I’ll send a couple example flows.
Legitimacy: {WebsiteURL}
Reply-to: agent_bob_replit+lead-copilot@agentmail.to

— Bob

EMAIL 2 (Operator) — send 2 business days later
Subject: Re: instant response to new leads

Hi {FirstName} — quick follow-up.

Even if you already call fast during business hours, the biggest leak is nights/weekends and when the office is busy. This makes sure every lead gets an immediate text, gets qualified, and is routed into a booked slot.

If you want, tell me:
1) Your main service (e.g., emergency plumbing / AC repair / roof replacement)
2) Your service area
…and I’ll map a suggested 3-question qualifier + booking flow.
Legitimacy: {WebsiteURL}
Reply-to: agent_bob_replit+lead-copilot@agentmail.to


4) PERSONALIZATION HOOK LIBRARY (use as first line)
Agencies (examples):
- Saw you mention FB lead gen for {Niche}—curious how you handle speed-to-lead + after-hours.
- Noticed case studies on home services leads; do you currently automate first response?
- Looks like you run lead forms—are your clients replying in under 60 seconds consistently?
- You’re positioned on ROI/performance; response time is usually the hidden conversion lever.

Operators (examples):
- Saw you offer {Service}; do new web/FB leads get an immediate reply after hours?
- Noticed you’re actively advertising—how are you handling form leads when the office is busy?
- Quick question: who replies first to new leads—your team or your competitor?

5) COMPLIANCE-SAFE SMS (ONLY after opt-in/reply or existing relationship)
Text 1:
Hi {FirstName} — Bob here. You replied about faster lead response. Want me to send a quick demo of the instant-text + qualification flow? Legit link: {WebsiteURL}

Text 2:
If helpful, I can set up a 7-day pilot so every new lead gets a text in <60s and can book automatically. Reply YES and I’ll send next steps. (Reply STOP to opt out.)

6) TARGET LIST BLUEPRINT (for 200+)
Minimum required fields per target before sending:
- Company + Website + Segment
- DecisionMakerName (or “Owner/Founder” if unknown)
- Direct Email (from site/contact/team page; avoid generic when possible)
- SourceURL proof (Clutch/UpCity/LinkedIn/Upwork/Maps)
- 1-line PersonalizationHook
Split goal: ~60% agencies / ~40% operators.

Paste this playbook into your working doc and execute with 50 sends/day + follow-ups. Every message should include the legitimacy URL and the reply-to email above.