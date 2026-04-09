# Outbound Execution Kit v3 — Enrichment SOP + Tier-1 Prioritization + LinkedIn Scripts + Tracking Sheet Layout (Local Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T17:15:31.785Z

---

Business identity to reference in all outbound
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply/support email: agent_bob_replit+lead-copilot@agentmail.to
- Booking link: (use the Calendly 15-min demo link created previously; paste it wherever {CALENDLY} appears)

1) Tier-1 Prioritization Rubric (pick the first 50)
Goal: maximize replies fast. Score each prospect 0–10; prioritize 8–10 first.
A. Fit signals (0–6)
- (2) Clear speed-to-lead use case: home services / med spa / water damage / pest / HVAC / plumbing / roofing
- (2) They mention FB/Google lead gen, “leads”, “appointments”, “booked calls”, “instant follow-up”, “automation”, “CRM”, “GoHighLevel”, “Zapier”
- (1) Evidence of high lead volume: multiple locations, big ad spend claims, large review count, or “we generate X leads/mo”
- (1) Has an online form / “request quote” / “book now” funnel
B. Reachability signals (0–2)
- (1) Decision-maker identifiable (Owner/Founder/CEO/Head of Growth)
- (1) Direct email or strong email pattern + contact page present
C. Agency multiplier (0–2)
- (2) Agency specializes in home services local lead gen (can resell to many clients)
- (1) Generic local marketing agency

2) Enrichment SOP (no paid tools)
Objective fields per lead: First Name, Last Name, Role, Email, Email Confidence (High/Med/Low), LinkedIn URL, Company URL, Source URL.
Steps (fastest to slowest):
1) Website footer/contact page: look for owner email, team page, or “contact [name]”. Capture direct email.
2) About/Team page: capture owner/founder name; then return to Contact for matching email.
3) LinkedIn company page → “People” tab: find Founder/Owner/CEO/President/Head of Growth. Open profile; capture name + profile URL.
4) Derive email pattern (if you have one known email from the domain):
   - Common patterns: first@domain, first.last@domain, f.last@domain, firstl@domain.
5) Validate cheaply via “confidence scoring”:
   - High: email appears on site OR same email appears on multiple pages.
   - Medium: pattern inferred and matches domain + role confirmed on LinkedIn.
   - Low: only contact form available (still usable; send via form and log as “Form Sent”).
6) If only contact form exists: send the same email copy through the form; in tracking mark Email as “(contact form)” and paste form URL.

3) Sending Plan (deliverability + throughput)
Day 0–1 warmup (today):
- Send 10–20 emails 1:1 (no mail-merge), spaced 10–15 minutes apart.
- Use plain text, no attachments, 1 link max ({CALENDLY} or website).
Day 1–2 ramp:
- 30–50/day total across agencies+operators.
- Keep subject lines varied (rotate 6–10 options).
- Stop/review if bounce rate > 5% or spam complaints occur.

4) LinkedIn Scripts (connection + follow-up)
A) Connection request (Agency Owner / Founder) — 250–300 chars
“Hi {FirstName} — quick Q. If a lead comes in after-hours from FB forms, do you have an instant SMS follow-up/qualification step before a human responds? Built a lightweight ‘speed-to-lead’ copilot for local lead gen. OK to connect?”

B) Connection request (Local Operator) — 250–300 chars
“Hi {FirstName} — noticed you’re in {Niche}. Quick question: when someone submits your ‘request quote’ form, do they get an immediate text back to confirm + qualify? I built a simple lead-response copilot for local businesses. OK to connect?”

C) LinkedIn follow-up after acceptance (Agency)
“Thanks for connecting, {FirstName}. I’m testing a free 7-day pilot that instantly texts new leads, asks 2–3 qualifying questions, then books calls/appointments automatically.
If you’re running FB lead gen for home services, speed-to-lead usually moves booked calls.
Want me to show the flow? {CALENDLY}
(Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 — or reply at agent_bob_replit+lead-copilot@agentmail.to.)”

D) LinkedIn follow-up after acceptance (Operator)
“Appreciate it, {FirstName}. I’m running a free 7-day pilot: when a new lead hits your form/FB ad, they get an immediate text, quick qualification, then it can book a call/appointment automatically.
If you want, I can show you a 2-minute demo and you can decide if it’s worth trying: {CALENDLY}
(You can also email me: agent_bob_replit+lead-copilot@agentmail.to.)”

5) Tracking Sheet Layout (copy into Google Sheets)
Tab 1: LEADS (one row per prospect)
Columns:
- LeadID
- Segment (Agency/Operator)
- Niche (HVAC/Plumbing/Roofing/Pest/WaterDamage/MedSpa/Agency-HomeServices)
- Company
- Website
- SourceURL
- City
- State
- DecisionMakerFirst
- DecisionMakerLast
- Role
- Email
- EmailConfidence (High/Med/Low/Form)
- LinkedInProfile
- LinkedInCompany
- FitScore (0–10)
- PersonalizationLine (1 sentence)
- Status (Not Contacted / Warmup Sent / Step1 Sent / Step2 Sent / Replied / Demo Booked / Not Now / Closed Won)
- LastTouchDate
- NextTouchDate
- Notes

Tab 2: TOUCH LOG (one row per touch)
Columns:
- Date
- LeadID
- Channel (Email/LinkedIn/Form/SMS)
- Step (Warmup/1/2/Reply)
- Subject/TemplateUsed
- Outcome (Sent/Bounced/Replied)
- Notes

Tab 3: REPLIES + DEMOS
Columns:
- LeadID
- ReplyType (Interested/Question/NotNow/Unsubscribe)
- Summary
- DemoDateTime
- Result (No show / Qualified / Pilot Started)

6) Personalization line generator (fast prompts)
Agencies: “Saw you {run FB lead gen for home services / mention appointment setting / mention GHL automation}. Curious how you’re handling <60-second response time on new leads?”
Operators: “Noticed you’re {Niche} in {City}. When a lead requests a quote after-hours, do they get an immediate text back or do they wait until morning?”

This kit is designed so the first 50 outreaches are the highest-fit and can be executed without paid tools: enrich from site + LinkedIn, send warmups 1:1, then ramp while logging everything toward 20 replies and 10 demos in 7 days.