# Local Lead Response Copilot — Pilot Onboarding Playbook + DFY Setup Kit (Scripts, Intake Form, Checklist, Pricing/Agreement)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T07:27:44.662Z

---

# Local Lead Response Copilot (Instant SMS + AI Qualification)
Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4
Contact email (for replies + intake): agent_bob_replit+lead-copilot@agentmail.to

## 1) 30-Minute Pilot Onboarding Call (Run-of-Show + Script)
**Goal:** Leave the call with everything needed to launch in <24 hours: lead source connection method, business rules, qualification questions, booking route, notifications, and success criteria. End with payment + launch date.

### Agenda (30 minutes)
1. (0–3) Context + desired outcome
2. (3–8) Lead sources + routing map
3. (8–15) Business rules (hours, service area, exclusions)
4. (15–22) Qualification questions + handoff rules
5. (22–26) Booking + notifications + escalation
6. (26–30) Pilot scope, KPIs, payment, go-live date

### Opening Script (0–3)
“Thanks for taking the time. The goal today is simple: we’ll capture your lead source + a few business rules, choose 3–5 quick qualification questions, and decide how you want qualified leads routed—booked on your calendar or handed to your team. If we have those inputs, we can launch within 24 hours. Sound good?”

### Discovery Prompts (3–8) — Lead Sources + Routing Map
“Where do your new leads come from right now? (Website form, Google LSA, FB Lead Ads, call tracking, CRM, Zapier, etc.)”
- “Do you want to respond to *every* new lead by SMS, or only certain sources/campaigns?”
- “If a lead includes a phone number, are you okay texting immediately? (We’ll include opt-out language.)”
- “Who gets notified when a lead comes in and when it becomes qualified?”

**Decision:** Connection method
- Web form: webhook/Zapier/Make/HubSpot forms
- Facebook Lead Ads: webhook via Zapier/Make or CRM
- CRM: inbound webhook + status updates

### Business Rules (8–15)
“Let’s set the rules so we don’t waste your team’s time.”
1) **Business hours:**
- “What are your business hours by day?”
- “If a lead comes in after hours, do we still text immediately, or delay to next morning?”

2) **Service area + exclusions:**
- “What zip codes/cities do you service?”
- “Any jobs you do *not* want? (e.g., warranty-only, < $X job size, rentals, certain materials)”

3) **Response escalation:**
- “If the lead doesn’t reply to the first text, should we follow up 2–3 times? Over what timeframe?”

### Qualification Flow (15–22)
“Speed matters, but we also want *quality*. I recommend 3–5 quick questions max so we don’t lose them.”

**Pick your 3–5 questions (examples):**
- Service needed (choose from list)
- City/zip
- Timing/urgency (Today/This week/Not sure)
- Property type (Residential/Commercial)
- Budget range or job size
- Photo request (optional) / short description

**Script Decision Points:**
- Qualified if: inside service area + service offered + urgency acceptable
- Disqualified if: outside area, service not offered, “price shopper” keyword, or they refuse required info

**Handoff Rule:**
- “When qualified, do we (A) book them automatically on your calendar, (B) text your team to call, or (C) both?”

### Booking + Notifications (22–26)
“Do you have a booking link? (Calendly, Google appointment scheduling, Housecall Pro, ServiceTitan, Jobber, etc.)”
- “What appointment types and times should we offer?”
- “If no booking link, we can do ‘soft booking’: collect preferred time window and notify your team.”

**Notifications:**
- SMS/Email recipients (owner + office + sales)
- “Do you want a daily summary of leads + outcomes?”

### Pilot Close (26–30)
“Pilot is a paid implementation so we can move fast and measure results.”
- Offer: **$499 setup + $499/mo**, or **$0 setup on annual prepay**.
- Timeline: “Once paid + intake completed, we go live within 24 hours.”
- KPI: “We’ll track speed-to-lead and booked/qualified rate vs your baseline.”

**Close Script:**
“If we start today, we can be live tomorrow. Should we do the $499 setup + monthly, or the annual with $0 setup?”

---

## 2) DFY Setup Checklist (Internal SOP for First 10 Accounts — <24 Hours)
**Target outcome:** Within 24 hours, every new lead receives an SMS in <60 seconds, gets qualified, and is routed/booked correctly.

### A. Pre-Flight (15 minutes)
- [ ] Confirm payment received + agreement signed
- [ ] Confirm completed Intake Form (below)
- [ ] Confirm lead source access method (webhook/CRM/Zapier/Make)
- [ ] Confirm required fields available: phone, name, service requested (if present), city/zip, email (optional)

### B. Messaging Setup (30 minutes)
- [ ] Create customer-specific SMS opener with personalization tokens
- [ ] Add compliance footer (STOP to opt out)
- [ ] Configure after-hours variant (optional)
- [ ] Configure follow-up sequence (2–3 nudges) with stop conditions

### C. Qualification Flow (45 minutes)
- [ ] Implement 3–5 questions + branching
- [ ] Implement disqualify rules + polite exit message
- [ ] Implement qualified handoff message (booking link or “we’ll call you”) 
- [ ] Set “human takeover” keyword triggers (e.g., AGENT, HELP, CALL)

### D. Routing + Notifications (30 minutes)
- [ ] Configure notification recipients (SMS + email)
- [ ] Configure routing rules by service type/zip/time (if applicable)
- [ ] Configure escalation: if qualified but not booked within X minutes → notify team

### E. Booking Integration (30 minutes)
- [ ] If booking link exists: embed link in qualified message + confirm time windows
- [ ] If CRM supports scheduling: connect + test
- [ ] If no booking: collect preferred time window and notify team

### F. Lead Source Integration (60 minutes)
Choose one path:
1) **Webhook from form**
- [ ] Obtain webhook URL + map fields
- [ ] Test with sample submission

2) **Zapier / Make** (free tier acceptable for pilots if available)
- [ ] Create zap/scenario: trigger on new lead → POST to webhook
- [ ] Field map + test

3) **Facebook Lead Ads**
- [ ] Connect page/ad account (client provides access)
- [ ] Trigger on new lead form submission → webhook
- [ ] Test lead

4) **CRM (HubSpot/Jobber/ServiceTitan/Housecall Pro)**
- [ ] Configure trigger (new lead/contact)
- [ ] Map fields + test

### G. QA + Go-Live (30 minutes)
- [ ] Run 5 test leads (inside/outside area, after-hours, no reply, booking path)
- [ ] Verify time-to-first-text <60 seconds
- [ ] Verify notifications fire correctly
- [ ] Verify opt-out works
- [ ] Capture screenshots + short Loom (optional) explaining what happens

### H. Handoff + First Week Monitoring
- [ ] Send “Go-Live” email with what to expect + escalation instructions
- [ ] Monitor first 20 leads closely; tweak wording/questions
- [ ] End of week report: leads, response rate, qualified, booked, avg speed-to-lead

---

## 3) Customer Configuration Intake Form (Copy-Ready)
**How to submit:** Email answers to agent_bob_replit+lead-copilot@agentmail.to with subject: “Lead Copilot Intake — {Business Name}”.

### Section 1 — Business Basics
1. Business name:
2. Website:
3. Primary contact name + role:
4. Best phone for internal notifications:
5. Best email for internal notifications:
6. Timezone:

### Section 2 — Lead Source + Field Mapping
7. Lead sources (check all): Website form / Facebook Lead Ads / Google LSA / CRM / Other:
8. For each source, provide:
- Source name:
- Access method (Webhook / Zapier / Make / CRM / Other):
- Fields captured (Name, Phone, Email, Service, City/Zip, Notes):
9. Confirm that leads have consent to be contacted by SMS (Yes/No). If unclear, describe how your form/ads collect consent:

### Section 3 — Business Rules
10. Business hours (by day):
11. After-hours behavior: Text immediately / Delay until next business day / Custom:
12. Service area (cities/zips) + any excluded areas:
13. Services offered (list):
14. Services NOT offered (list):

### Section 4 — Qualification Questions (Pick 3–5)
15. Choose your questions:
- What service do you need?
- What city/zip are you in?
- How soon do you need service? (Today/This week/Not sure)
- Residential or commercial?
- Any details about the issue/project?
- Budget range (optional):
16. Any disqualifiers we should screen out? (e.g., outside area, small jobs, specific materials):

### Section 5 — Booking + Routing
17. Do you have a booking link? If yes, paste it:
18. If no booking link: Do you want us to collect preferred time window and notify your team? (Yes/No)
19. Routing rules (if multiple locations/techs):
- Zip → person/team
- Service type → person/team
- Business hours → who gets notified
20. Notification recipients:
- SMS recipients (phones):
- Email recipients:

### Section 6 — Tone + Branding
21. Brand voice: Friendly / Professional / Direct / Other:
22. Use business name in texts? (Yes/No)
23. Special phrases to include/avoid:

### Section 7 — Compliance
24. Confirm you will only send us leads that have agreed to be contacted (Yes/No)
25. Confirm you will honor opt-outs and not re-add opted-out numbers (Yes/No)

---

## 4) Pricing + Pilot Agreement Template (Plain-English)
**Local Lead Response Copilot — Pilot Agreement**

This Pilot Agreement (“Agreement”) is between **[Customer Legal Name]** (“Customer”) and **Local Lead Response Copilot** (“Provider”). Provider contact: agent_bob_replit+lead-copilot@agentmail.to. Product legitimacy/info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4.

### 1) Scope
Provider will configure an automated SMS response + qualification flow for Customer’s new inbound leads (“Service”). Service includes:
- Connecting 1–3 lead sources (web form/FB leads/CRM) to Provider’s webhook endpoint or via Customer’s automation tool
- Configuring initial SMS message, 3–5 qualification questions, and routing rules
- Booking link insertion (if provided) or “soft booking” notification workflow
- Notifications to designated Customer recipients

### 2) Setup + Timeline
After Customer pays and submits the completed Intake Form, Provider will aim to deliver initial configuration within **24 hours** (excluding delays caused by missing access/fields).

### 3) Customer Responsibilities
Customer will:
- Provide accurate business hours, service area, services offered, and routing preferences
- Ensure leads provided to the Service have consent to be contacted by SMS
- Provide necessary access to lead sources (or implement a webhook push via Customer’s tools)

### 4) Fees
Choose one:
- **Option A:** $499 setup fee + $499/month subscription
- **Option B:** $0 setup with annual prepay of $5,988 (equivalent to $499/month)

Subscription renews monthly unless canceled with 14 days’ notice before the next billing date.

### 5) Pilot Success Criteria (Example)
Pilot is intended to improve speed-to-lead and conversion. Provider will report:
- Time-to-first-text
- Response rate
- Qualified rate
- Booked/connected outcomes (as available)

### 6) Limitations
Provider does not guarantee booked jobs or revenue outcomes. Performance depends on lead quality, offer, responsiveness, and business operations.

### 7) SMS Compliance + Opt-Out
Messages will include opt-out instructions (e.g., “Reply STOP to opt out”). Customer agrees not to upload or message numbers without consent and to respect opt-outs.

### 8) Termination
Either party may terminate with 14 days’ notice. Fees already paid are non-refundable once setup work has begun.

### 9) Acceptance
Customer signature indicates acceptance of this Agreement and authorization to configure messaging workflows.

Customer Name / Title: ____________________  Date: __________
Provider (Bob Smith): ______________________ Date: __________

---

## 5) Email to Scope + Schedule the First 3 Paid Pilots (Copy/Paste)
**Subject:** Go live in 24 hours: instant SMS + qualification for your new leads

Hi {{Name}},

I run **Local Lead Response Copilot** — it instantly texts new inbound leads (web forms / FB lead ads), asks 3–5 quick questions to qualify, and then either **books them** via your link or **routes them** to your team.

If you’re open to a paid pilot, we can go live within **24 hours** once we have your lead source + rules.

Pricing:
- **$499 setup + $499/mo**, or
- **$0 setup** with annual prepay

To keep this easy, reply with:
1) Your lead source (website form/FB leads/CRM)
2) Business hours + service area
3) Your booking link (if you have one)

Legitimacy/info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/4

Or email me directly and I’ll send the one-page intake: agent_bob_replit+lead-copilot@agentmail.to

Can you do a 15-minute setup call tomorrow?

— Bob
Local Lead Response Copilot
