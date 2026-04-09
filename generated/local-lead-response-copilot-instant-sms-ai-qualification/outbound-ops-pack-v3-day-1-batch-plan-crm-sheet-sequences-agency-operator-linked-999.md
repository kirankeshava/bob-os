# Outbound Ops Pack v3 — Day-1 Batch Plan + CRM Sheet + Sequences (Agency/Operator) + LinkedIn Notes

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T11:48:17.435Z

---

Below is a paste-ready outbound ops pack to execute the first 50 sends (Day-1), then scale to 200 sends by Day-4. It includes: (1) a CRM/tracking sheet structure, (2) Day-1 batch plan, (3) two 2-step email sequences (Agency + Operator) that reference the live website URL and business contact email, and (4) LinkedIn connect notes.

1) CRM / Tracking Sheet (Google Sheets layout)
Create 4 tabs: LEADS, TOUCHES, REPLIES, DEMOS.

TAB: LEADS (one row per prospect)
Columns:
- LeadID (e.g., A001)
- Segment (Agency / Operator)
- Company
- Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa/Lead Gen Agency)
- Location
- ContactName
- Title/Role (Owner, Founder, Head of Growth, GM, Office Manager)
- Email
- EmailConfidence (Verified / Likely / Unknown)
- LinkedInURL (person)
- CompanyURL
- SourceURL (Clutch/UpCity/Google Maps/Upwork/LinkedIn)
- PersonalizationLine (1 sentence)
- Status (Not Contacted / E1 Sent / E2 Sent / Replied / Demo Booked / Not Now / Bad Fit)
- LastTouchDate
- NextActionDate
- Notes

TAB: TOUCHES (one row per touch)
Columns:
- Date
- LeadID
- Channel (Email/LinkedIn)
- TouchType (E1/E2/LI-Connect/LI-Followup)
- Subject/TemplateName
- Outcome (Sent/Bounced/Replied)
- Notes

TAB: REPLIES
Columns:
- Date
- LeadID
- ReplyType (Interested / Question / Not now / Unsubscribe)
- Key Objection
- Next Step

TAB: DEMOS
Columns:
- DateBooked
- LeadID
- DateTime
- Showed? (Y/N)
- Result (Pilot / Lost / Follow-up)
- PilotStartDate

2) Day-1 Batch Plan (50 total touches)
Goal: 20 warmup 1:1 emails + 30 normal personalized emails.
- Warmup (20): keep copy short; include website URL in only ~10 of them; no Calendly link in warmup. CTA = “reply yes” to see a 60-second outline.
- Normal (30): include website URL + booking option OR “reply yes” CTA (your choice). Recommend: include booking link for the 30 normal sends.
Mix: 60% agencies / 40% operators.

Day-1 execution checklist:
A) Send warmup 20 manually (spaced across the day).
B) Send normal 30 manually (or via mail merge if your inbox is warmed).
C) Send LinkedIn connection requests to the same 50 (10–15/day if account is new).
D) Log every touch in TOUCHES tab immediately.

3) Email Sequence — AGENCY (FB lead-gen / home services)
Use when the company is a marketing agency generating leads for contractors.

EMAIL 1 (Agency) — Subject options:
- “Speed-to-lead fix for your FB leads”
- “Quick idea to lift booked calls (no extra ad spend)”
- “{{Company}}: instant SMS follow-up for form/FB leads”

Body:
Hi {{FirstName}} — {{PersonalizationLine}}

If you’re running FB lead-gen for home services, the biggest leak I see is response time: leads sit 5–30 minutes (or overnight) and booking rates crater.

We built Local Lead Response Copilot: it instantly texts new leads, asks 2–4 qualifying questions, and routes them to a booked call/appointment automatically.

Live page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Want to try a 7-day pilot on one client account? If it doesn’t increase qualified conversations, you pay $0.

Reply “pilot” and I’ll send the exact setup steps + the question flow.
Or email me directly: agent_bob_replit+lead-copilot@agentmail.to

— Bob

EMAIL 2 (Agency) — send 2 business days later
Subject: “Worth testing on 1 account?”

Hi {{FirstName}} — quick follow-up.

If you can share:
1) what vertical you’re strongest in (HVAC/plumbing/roofing/etc.)
2) where leads land today (GHL, HubSpot, Sheets, email)

…I’ll map a simple ‘instant text → qualify → book’ flow you can deploy in under 30 minutes.

Same link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Should I send the flow?
— Bob (agent_bob_replit+lead-copilot@agentmail.to)

4) Email Sequence — OPERATOR (HVAC/plumbing/roofing/pest/water damage/med spa)

EMAIL 1 (Operator) — Subject options:
- “You’re paying for leads—do they get an instant text?”
- “Missed calls → missed jobs (quick fix)” 
- “{{Company}}: instant response to new leads”

Body:
Hi {{FirstName}} — {{PersonalizationLine}}

When a new lead comes in (site form or FB ad), whoever responds first usually wins.

Local Lead Response Copilot instantly texts the lead in under 10 seconds, asks a couple quick questions (job type, urgency, location), and then helps book a call/appointment.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Open to a 7-day pilot so you can see how many leads you’re currently losing after-hours/weekends? If it doesn’t create more qualified conversations, you pay $0.

Reply “yes” and I’ll send the exact setup and example texts.
Or reach me here: agent_bob_replit+lead-copilot@agentmail.to

— Bob

EMAIL 2 (Operator) — send 2 business days later
Subject: “Should I close the loop on this?”

Hi {{FirstName}}, following up.

Two quick questions:
1) Do you respond to new leads in under 2 minutes today?
2) Do you get leads after-hours that sit until morning?

If either is “no,” a simple instant-text + qualification flow usually lifts booked calls without spending more on ads.

Want me to draft your exact question flow (2–4 questions) based on {{Niche}}?
— Bob (agent_bob_replit+lead-copilot@agentmail.to)

5) LinkedIn Connection Notes
Keep under ~300 characters.

Agency LI Connect:
“Hi {{FirstName}} — noticed {{PersonalizationLine}}. I’m building an instant SMS + AI qualification layer for FB/form leads (home services). If you’re open, I can share a 7-day pilot idea for one client. — Bob”

Operator LI Connect:
“Hi {{FirstName}} — quick question: do your new web/FB leads get an instant text reply? I’m working on a lightweight SMS qualification + booking copilot for local service businesses. Happy to share a 7-day pilot. — Bob”

Operational note: Every message should include either (A) the website URL or (B) the direct contact email agent_bob_replit+lead-copilot@agentmail.to. For the first 20 warmups, vary link usage to protect deliverability; for the remaining 180 sends, include the website link consistently for legitimacy.
