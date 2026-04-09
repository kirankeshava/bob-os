# Outbound Execution Pack v3 — Tracking Sheet + 2-Step Sequences + Personalization Snippets (Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T13:42:23.462Z

---

Below is a complete, paste-ready outbound execution pack you can use to send 200 targeted outreaches and track them cleanly.

====================
A) TRACKING SHEET (Google Sheets) — TABS + COLUMNS
====================
Create 4 tabs: Leads, Touches, Replies, Demos.

TAB 1: LEADS (one row per prospect)
Columns:
- Lead ID (e.g., A001)
- Segment (Agency | Operator)
- Company
- Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa | Agency-Home Services)
- Location
- Website URL
- Source URL (Clutch/UpCity/LinkedIn/Google Maps/Upwork/FB Group)
- Decision Maker Name
- Decision Maker Role (Owner/Founder/GM/Head of Growth)
- Email
- LinkedIn URL
- Phone (only if already public and compliant to text)
- Personalization 1-liner (proof: “saw you run FB lead ads for HVAC”, “after-hours booking”, “GHL forms”, etc.)
- Offer Fit Note (1 phrase: “speed-to-lead”, “after-hours”, “qualification + booking”)
- Status (Not Contacted | E1 Sent | E2 Sent | LI Sent | Replied | Demo Booked | Closed/Won | Closed/Lost)
- Next Follow-up Date
- Notes

TAB 2: TOUCHES (every outreach attempt)
Columns:
- Date
- Lead ID
- Channel (Email | LinkedIn | SMS)
- Step (E1 | E2 | LI-Connect | LI-Followup | SMS)
- Subject/Message Variant (A/B label)
- Sent By (sending inbox identity)
- Result (No response | Reply | Bounce | OOO)
- Notes

TAB 3: REPLIES (only when they respond)
Columns:
- Date
- Lead ID
- Reply Type (Interested | Not now | Wrong person | Price | Info request | Objection)
- Key Quote
- Next Action (book demo, send details, ask for intro)
- Owner (Bob)

TAB 4: DEMOS
Columns:
- Date Booked
- Lead ID
- Date/Time
- Showed? (Y/N)
- Outcome (Pilot yes/no)
- Follow-up date
- Proposal sent (Y/N)

====================
B) ENRICHMENT CHECKLIST (per lead, 90–120 seconds)
====================
1) Find decision-maker: website About/Team OR LinkedIn company page → People → Owner/Founder/Marketing.
2) Capture direct email if listed; if not, capture best contact path (contact form) and keep LinkedIn.
3) Write a single personalization line using a verifiable signal:
   - Agency: “Saw you run FB lead gen for {home service} and mention {GHL/booking/lead forms} on your site.”
   - Operator: “Noticed you’re running lead forms/booking online; speed-to-lead is usually the difference between 1st vs 3rd callback.”
4) Set Offer Fit Note: speed-to-lead / after-hours / qualification / auto-booking.
5) Assign Lead ID and set Status = Not Contacted.

====================
C) OUTREACH SEQUENCE #1 — AGENCIES (FB Lead Gen / Home Services)
====================
Goal: partner channel; agencies resell/white-label; faster lead response improves their ROI.

EMAIL 1 (E1)
Subject options:
A) “Speed-to-lead for your home service clients”
B) “Quick win for your FB lead ads accounts”
C) “Question about your lead follow-up”

Body:
Hi {FirstName} — {PersonalizationLine}

I’m reaching out because we built a simple “Lead Response Copilot” that texts new leads instantly (from forms/FB leads), asks 2–4 qualifying questions, and then books a call/appointment automatically.

Most home service accounts lose a chunk of leads in the first 5–15 minutes (or after-hours). This fixes that without adding more ad spend.

Would you be open to a 15-minute walkthrough? Here’s our site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

If you’d rather reply by email: agent_bob_replit+lead-copilot@agentmail.to

7-day pilot idea: we plug into 1 client’s lead source, measure contact rate + booked appointments, and you keep it only if it lifts conversions.

— Bob

EMAIL 2 (E2) — send 2 business days later
Subject:
“Worth testing on one client?”

Body:
Hi {FirstName} — quick follow-up.

If you’re already driving leads via FB forms/landing pages, we can usually improve results just by winning the first minute: instant SMS + lightweight AI qualification + auto-booking.

Open to running the 7-day pilot on one home service account (HVAC/plumbing/roofing/pest)? I can share setup steps and success criteria.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Email: agent_bob_replit+lead-copilot@agentmail.to

— Bob

OPTIONAL LINKEDIN CONNECT NOTE (send same day as E1)
“Hi {FirstName} — saw you work with home service lead gen. We built an instant SMS + qualification + booking flow to improve speed-to-lead. Mind if I connect?”

OPTIONAL SMS (ONLY where compliant + public business number)
“Hi {FirstName}, Bob here. Quick q — are you the right person to discuss improving speed-to-lead for your FB lead gen clients? (instant SMS + qualification + booking). Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 Reply STOP to opt out.”

====================
D) OUTREACH SEQUENCE #2 — LOCAL OPERATORS (HVAC/Plumbing/Roofing/Pest/etc.)
====================
Goal: direct pilots; fix missed calls and slow follow-up.

EMAIL 1 (E1)
Subject options:
A) “Quick question about new leads at {Company}”
B) “Do you text new leads in under 60 seconds?”
C) “Reduce missed leads (especially after-hours)”

Body:
Hi {FirstName} — {PersonalizationLine}

When a new lead comes in (form/FB ad), we can text them instantly, ask a couple quick questions (job type, urgency, zip, etc.), and then book a call/appointment automatically.

Most local service businesses win simply by responding first—especially nights/weekends.

If you want to see what it looks like, here’s the product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Or reply here: agent_bob_replit+lead-copilot@agentmail.to

Would you be open to a 7-day pilot? We connect one lead source and track: (1) contact rate, (2) qualified conversations, (3) booked jobs/calls.

— Bob

EMAIL 2 (E2) — send 2 business days later
Subject:
“Should I close the loop?”

Body:
Hi {FirstName} — just checking if you’re the right person for lead follow-up/booking.

We set up instant SMS + short qualification + automated booking so new inquiries don’t go cold. It’s designed for high-intent local services.

Worth a quick look this week?
Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Email: agent_bob_replit+lead-copilot@agentmail.to

— Bob

OPTIONAL LINKEDIN CONNECT NOTE
“Hi {FirstName} — I help local service businesses respond to new leads instantly (SMS + quick qualification + booking). Thought it might be relevant for {Company}. Mind if I connect?”

OPTIONAL SMS (ONLY where compliant + public number)
“Hi {FirstName}, Bob here. We help {niche} companies respond to new web/FB leads instantly via SMS + quick qualification + booking. Want details? https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 Reply STOP to opt out.”

====================
E) PERSONALIZATION SNIPPET LIBRARY (copy/paste)
====================
Agency angles:
1) “Saw you run FB lead gen for HVAC/plumbing and highlight appointment booking on your site.”
2) “Noticed you specialize in home services—speed-to-lead is usually the easiest conversion lift without raising CPL.”
3) “Looks like you manage lead forms + follow-up automations; we focus specifically on instant SMS + qualification to prevent lead decay.”

Operator angles:
1) “Noticed you’re promoting {service} and collecting leads online—do you respond within the first minute?”
2) “Saw your site pushes ‘request a quote’—we can auto-text and qualify those leads instantly, especially after-hours.”
3) “If you’re running FB lead ads, we can text new leads immediately and book the call before they shop competitors.”

====================
F) SEND RULES (to protect deliverability)
====================
- Warmup: 10–20 1:1 emails first (no links in first 5 if you want to be extra cautious).
- Ramp: 25/day → 50/day, mixed segments.
- Personalize the first line every time; keep the rest consistent.
- Log everything in Touches; schedule E2 automatically (manual reminders are fine).

This pack is ready to paste into a doc/sheet and run. Next execution step is enriching the top 50 leads with direct emails + decision-maker names and sending the warmup batch, then the first 50-message run while logging outcomes daily.