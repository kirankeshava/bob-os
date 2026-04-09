# Outbound Runbook v3 — 200 Targeted Outreaches in 4 Days (Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T13:26:12.569Z

---

Business legitimacy URL (include in outreach when needed):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

Primary reply-to / contact email (include in all templates):
agent_bob_replit+lead-copilot@agentmail.to

GOAL (7 days)
- 200 targeted outreaches sent
- 20 replies
- 10 demos booked

SEGMENTS
A) Agencies (60% of sends)
- Local marketing agencies / lead-gen shops running FB lead forms for home services.
- Signals: “Facebook Ads”, “Lead Gen”, “Home Services”, “PPC”, “Funnels”, “GHL”, “Call tracking”, “Booked appointments”.

B) Operators (40% of sends)
- Roofing, HVAC, Plumbing, Pest, Water damage/restoration, Med spa.
- Signals: “Request a quote”, “Schedule”, “Book now”, “Financing”, “Emergency service”, “24/7”, “FB ads” or active paid traffic, slow response indicators.

OUTBOUND STACK (FREE-FIRST)
1) Sending: manual send from chosen inbox (avoid bulk tools initially). Plain-text preferred.
2) Tracking: Google Sheet CRM (schema below).
3) Sequence: 2-step email + LinkedIn touch. SMS only after opt-in/reply.

DELIVERABILITY GUARDRAILS (NON-NEGOTIABLE)
- Manual sends only, 20–60/day per inbox; stop if bounce/reply issues.
- Keep first email <120 words, mostly plain-text.
- Don’t include more than 1 link; if deliverability is uncertain, remove link and just cite the URL as “legitimacy page” or offer to send details.
- Rotate 3–5 subject lines; do not reuse identical copy 200 times.
- Use real personalization in the first sentence (niche + a specific cue).
- Stop-on-reply immediately; move to “Replied” status and handoff to scheduling.

CRM / TRACKING SHEET (copy into Google Sheets)
TAB 1: Targets
Columns:
- TargetID (e.g., A001)
- Segment (Agency/Operator)
- Company
- Niche (HVAC/Roofing/etc or Agency-HomeServices)
- City/State
- Website
- SourceURL (Clutch/UpCity/Google Maps/LinkedIn/Upwork)
- DecisionMakerName
- Title
- Email
- LinkedInURL
- Phone (only if public; for post-opt-in follow-up)
- PersonalizationHook (1 line)
- Status (Not Contacted / Sent-1 / Follow-up Due / Replied / Demo Booked / Closed-Won / Closed-Lost)
- LastTouchDate
- NextTouchDate
- TouchCount
- Notes

TAB 2: Touches Log
Columns:
- Date
- TargetID
- Channel (Email/LinkedIn/SMS)
- Step (E1/E2/L1/L2/S1)
- Subject
- Outcome (Sent/Delivered/Bounced/Replied)
- Notes

TAB 3: Replies
Columns:
- Date
- TargetID
- ReplyType (Positive/Neutral/Objection/Unsubscribe)
- Summary
- NextAction
- Owner (Bob)

TAB 4: Demos
Columns:
- TargetID
- DemoDate
- Show? (Y/N)
- Outcome (Pilot Offered/Pilot Accepted/No Fit/Follow-up)
- $ Potential

TAB 5: Metrics
Cells:
- SentToday: =COUNTIF(Touches!A:A, TODAY())
- RepliesToday: =COUNTIF(Replies!A:A, TODAY())
- DemosBookedThisWeek: count of demo dates within 7 days
- ReplyRate: Replies / Sent
- DemoRate: Demos / Sent

ENRICHMENT WORKFLOW (FREE)
Goal: enrich 60 targets first (40 agencies + 20 operators) to start sending immediately.
Steps per target (2–6 minutes each):
1) Website → About/Team/Contact: capture owner/founder/partner/head of growth + email.
2) If no email: use contact form email or “hello@/info@” as fallback; still send but prioritize targets with direct emails.
3) LinkedIn: find the founder/owner (or agency head of client success). Save profile URL.
4) Write a single-line hook:
   - Agency hook examples: “Saw you run FB lead-gen for roofers / service businesses; speed-to-lead is usually the profit lever.”
   - Operator hook examples: “Noticed ‘24/7’ + web form; most shops miss leads after-hours—text response fixes that.”

SENDING CADENCE (4 DAYS / 200 SENDS)
Day 1: 40 sends (30 agencies, 10 operators)
Day 2: 60 sends (35 agencies, 25 operators)
Day 3: 60 sends (35 agencies, 25 operators)
Day 4: 40 sends (20 agencies, 20 operators)
Follow-up E2 goes out 48–72 hours after E1 (so E2 begins Day 3 onward).
LinkedIn touches run daily for top 30 agencies + top 20 operators.

EMAIL SEQUENCE — AGENCIES (2 steps)
Subject line options (rotate):
1) quick win for your lead-gen clients
2) speed-to-lead for {{client_niche}} leads
3) plug the “missed lead” gap?
4) 7-day pilot idea

E1 (Agency)
Hi {{FirstName}},

{{PersonalizationHook}}.

We built a “Lead Response Copilot” that instantly texts new leads from forms/FB lead ads, asks 2–4 qualifying questions, and either books the call/appointment or hands off a qualified lead — so your clients stop losing the first 5 minutes.

Open to a 15-min look? If it’s not a fit, I’ll share the exact follow-up script we see working.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Or reply here: agent_bob_replit+lead-copilot@agentmail.to

— Bob

E2 (Agency) — send 48–72h later
Subject: Re: speed-to-lead
Hi {{FirstName}},

Quick bump — would a 7-day pilot be useful on one client?

We’ll measure: (1) time-to-first-response, (2) % leads reached, (3) qualified-to-booked rate. If it doesn’t beat their current process, we’ll part friends.

Want me to propose a simple setup based on the niche you focus on?

— Bob (agent_bob_replit+lead-copilot@agentmail.to)

EMAIL SEQUENCE — OPERATORS (2 steps)
Subject line options (rotate):
1) you’re probably missing leads after-hours
2) quick question about your web leads
3) can I help you reach new inquiries faster?
4) 7-day “instant text-back” pilot

E1 (Operator)
Hi {{FirstName}},

{{PersonalizationHook}}.

We help local service businesses respond to new web/FB leads instantly via SMS, qualify them with a few short questions, and get them booked (or routed) automatically. The goal is simple: fewer missed leads when you’re on jobs.

If you want, we can run a 7-day pilot and show the before/after on lead reach + booked jobs.

Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Reply here: agent_bob_replit+lead-copilot@agentmail.to

— Bob

E2 (Operator) — send 48–72h later
Subject: Re: instant text-back
Hi {{FirstName}},

Should I send a 2-minute overview of how the “instant text-back + qualification + booking” flow works for {{Niche}}?

If you’d rather, tell me the best number to reach you *after you opt in* and I’ll keep it brief.

— Bob

LINKEDIN (AGENCY) — CONNECT + FOLLOW-UP
Connection note (300 chars max):
Hi {{FirstName}} — noticed you help {{niche}} businesses with lead gen. We’re working on instant SMS follow-up + AI qualification to improve speed-to-lead. Open to connect?

Follow-up after accept:
Thanks for connecting, {{FirstName}}. Quick question: do your clients ever complain that leads don’t answer when called back (or get contacted too late)? We built an instant SMS + short qualifying flow that books calls/appointments. If useful, happy to share the 7-day pilot outline. (Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4 | agent_bob_replit+lead-copilot@agentmail.to)

LINKEDIN (OPERATOR) — CONNECT + FOLLOW-UP
Connection note:
Hi {{FirstName}} — I work with local {{niche}} companies on faster response to new web/FB leads (instant text-back). Open to connect?

Follow-up:
{{FirstName}}, if you’re open to it, we can run a 7-day “instant text-back + qualification + booking” pilot and show the impact on reached leads + booked calls. If interested, reply here or email me: agent_bob_replit+lead-copilot@agentmail.to (legitimacy page above).

SMS (COMPLIANCE-SAFE) — ONLY AFTER OPT-IN/REPLY
Trigger conditions: they replied via email and gave a number / asked to text / existing relationship / explicit opt-in.
Text:
Hi {{FirstName}} — Bob here. You mentioned {{context}}. Want me to send the 7-day pilot details for instant text-back + qualification + booking? (You can reply STOP anytime.)

REPLY TRIAGE (WHAT TO DO WITH INBOUND)
- Positive: propose 2 times or send Calendly link if available; ask 2 qualifiers (lead volume/week, sources, current response method).
- Neutral (“send info”): send 5-bullet overview + ask one question to keep conversation moving.
- Objection (price/time/tool fatigue): offer the 7-day pilot with clear success metrics; emphasize speed-to-lead ROI.
- Unsubscribe: mark Closed-Lost + do not contact.

FAST PERSONALIZATION LIBRARY (swap into first sentence)
Agencies:
- “Saw you position around FB lead-gen for home services — speed-to-lead is usually the silent conversion killer.”
- “Noticed you run appointment-setting funnels; we plug the gap between ‘lead submitted’ and ‘first contact’.”
- “Looks like you work with roofers/HVAC — those leads go cold in minutes if no text-back.”
Operators:
- “Noticed you offer emergency/24-7 service — most shops miss the first response when crews are on jobs.”
- “Saw the ‘Request a Quote’ form — do you ever see leads submit then never pick up when you call back?”
- “If you’re running FB/Google lead forms, instant SMS tends to lift contact rates fast.”

END STATE CHECKLIST
- [ ] 60 enriched targets (names + emails + hooks)
- [ ] 40 sends completed Day 1 (logged)
- [ ] Daily LinkedIn touches for top accounts
- [ ] E2 follow-ups begin Day 3
- [ ] Daily reply triage → push to demo/pilot
