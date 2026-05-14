# Day-1 Outbound Runbook + CRM/CSV Schema + Multichannel Scripts (Local Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:21:02.427Z

---

## Goal (next 24 hours)
- Send: **50 total touches** (15 warmup 1:1 emails + 35 personalized outreach emails)
- Add: **40 LinkedIn connection requests** to the same people
- Outcome target: **3–5 replies** and **1–2 demos booked**

## Sending identity + legitimacy anchors
- Website (include in follow-ups and/or signature): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Support / reply-to reference: agent_bob_replit+lead-copilot@agentmail.to

## Deliverability-safe Day-1 plan
### Throttling
- Hour 1: send **5** warmups (plain text, no links)
- Hour 2: send **5** warmups (plain text, 1 question)
- Hour 3: send **5** warmups (include site link in signature only)
- After warmups: send **35** personalized emails over 3–5 hours (max 10/hr)

### Subject line rotation (use evenly)
1) “Quick question about new leads”
2) “Speed-to-lead for {{Company}}”
3) “Do you text leads instantly?”
4) “7-day pilot (no cost)?”

### Logging rule
Every send gets a row in the CRM with:
- Touch #, date/time, channel, subject variant, sequence type (Agency/Operator), next step date.

## CRM (Google Sheets) structure
Create 3 tabs:
1) **Leads** columns:
- LeadID
- Segment (Agency/Operator)
- Company
- Website
- Location
- Niche
- ContactName
- Role
- Email
- ContactFormURL
- LinkedInURL
- PersonalizationLine
- Status (Not Contacted / Sent-1 / Followup-1 / Replied / Demo Booked / Closed Lost)
- LastTouchDate
- NextTouchDate
- Notes

2) **Touches** columns:
- LeadID
- Date
- Channel (Email/LinkedIn/SMS)
- Step (Warmup / S1 / S2)
- Subject
- MessageVariant
- Outcome (Sent/Delivered/Replied/Bounced)

3) **Demos** columns:
- LeadID
- DemoDate
- Outcome
- NextStep

Suggested formula (Leads tab):
- LastTouchDate = MAXIF(Touches!Date, Touches!LeadID=Leads!LeadID)

## CSV mail-merge schema (Batch #1)
Headers:
FirstName,Company,Role,Segment,Niche,Email,ContactFormURL,LinkedInURL,PersonalizationLine,WebsiteURL,SupportEmail,BookingLink

## EMAIL SEQUENCE — AGENCY (FB lead gen for home services)
### Step 1 (Email)
Subject: Speed-to-lead for {{Company}}

Hi {{FirstName}} — {{PersonalizationLine}}

I’m reaching out because a lot of FB lead-gen campaigns leak revenue in the first 5 minutes (missed calls, after-hours, slow follow-up).

We built **Local Lead Response Copilot**: it instantly texts new leads, asks 2–4 short qualifying questions, and then books a call/appointment (or routes to the right team). 

Want to try a **7-day free pilot** on one client/account? If it doesn’t lift contact rate + booked calls, we’ll shut it off.

You can see what it is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

If you’d rather reply by email, we’re at agent_bob_replit+lead-copilot@agentmail.to.

Open to a quick 15-min chat this week?
— Bob

### Step 2 (Email follow-up, +2 days)
Subject: Re: Speed-to-lead for {{Company}}

Hi {{FirstName}} — should I close the loop?

If you’re running FB lead forms for home services, we can usually improve outcomes just by:
1) texting instantly (0–30 sec),
2) qualifying with 2–4 questions,
3) pushing straight into booking.

If you want, I’ll set up the 7-day pilot for one account and share results.

(If easiest, reply here or email agent_bob_replit+lead-copilot@agentmail.to.)

— Bob

## EMAIL SEQUENCE — OPERATOR (HVAC/Plumbing/Roofing/Pest/Water damage/Med spa)
### Step 1 (Email)
Subject: Do you text new leads instantly?

Hi {{FirstName}} — {{PersonalizationLine}}

When someone requests a quote online, whoever responds first usually wins.

Local Lead Response Copilot instantly texts new leads, asks a couple quick questions (job type, urgency, zip), and then **books the call/appointment automatically**.

We’re offering a **7-day free pilot** for local businesses right now.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Support: agent_bob_replit+lead-copilot@agentmail.to

Worth testing on your next batch of leads?
— Bob

### Step 2 (Email follow-up, +2 days)
Subject: Re: Do you text new leads instantly?

Hi {{FirstName}}, checking back.

If you’re already getting leads from forms/FB, the pilot is simple:
- connect the form source,
- set 3–4 qualifying questions,
- route/book based on answers.

Want me to set it up free for 7 days?
— Bob

## LINKEDIN — connection note (keep under ~300 chars)
Hey {{FirstName}} — quick one: we help local lead-gen teams respond in <60 seconds via SMS + AI qualification + auto-booking. Pilot is free for 7 days. Mind if I connect?

## LINKEDIN — follow-up after connect
Thanks for connecting. If you’re open, I can set up a 7-day pilot: instant SMS to new leads → 2–4 questions → booked call/appointment. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 or email agent_bob_replit+lead-copilot@agentmail.to. 

## SMS (use only where compliant / opted-in / existing relationship)
Hi {{FirstName}} — Bob here. Quick one: we help teams respond to new leads instantly via SMS + short qualification and then auto-book calls. Want to test a 7-day pilot? Reply YES and I’ll send details. Reply STOP to opt out.

## Personalization line generator (use 1)
Agencies:
- “Saw you run lead gen for {{Niche}} businesses — looks like you focus on Facebook lead forms.”
- “Noticed you mention ‘lead generation’ + ‘appointment setting’— curious how you handle after-hours leads.”
Operators:
- “Saw {{Company}} serves {{Location}} — do you get most new inquiries via web forms or Facebook?”
- “Looks like you offer {{Service}} — are you currently calling leads back within 5 minutes?”

## Definition of success (pilot)
- Under 60-second first response for >80% of leads
- Higher contact rate (lead replies)
- More booked calls/appointments from same lead volume

This runbook is ready to execute today: warmup 15 emails, send 35 personalized emails, push 40 LinkedIn connection requests, and log everything in the CRM so we can iterate copy daily toward 20 replies / 10 demos in 7 days.