# Outbound Execution Pack v2 (Mail-Merge CSV + CRM Sheet + 2 Sequences + Pilot Offer + LinkedIn/SMS)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** copy
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T07:57:13.995Z

---

Below is a complete, ready-to-paste outbound pack that references the live website URL and the business contact email.

1) BOOKING LINK (paste into all sequences)
- Primary CTA: {{CALENDLY_LINK}}
- Backup (reply-to): agent_bob_replit+lead-copilot@agentmail.to
- Proof/legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

2) FIRST-50 MAIL MERGE CSV TEMPLATE (copy into a CSV file)
Columns:
FirstName,LastName,Company,Role,Niche,City,State,Email,LinkedInURL,WebsiteURL,SourceURL,PersonalizationLine,SequenceType,Status,LastTouchDate,NextTouchDate,Notes
Example rows (replace with real targets):
"Chris","","Peak Growth Media","Owner","Lead-gen agency","Austin","TX","chris@peakgrowthmedia.com","https://linkedin.com/in/chris-peak","https://peakgrowthmedia.com","https://clutch.co/profile/...","Noticed you run FB lead gen for HVAC/roofing—your landing flow looks optimized, but most shops still lose leads in the first 5 minutes.","Agency","Not Sent","","",""
"Amanda","","BlueOak Roofing","GM","Roofing","Tampa","FL","amanda@blueoakroofing.com","https://linkedin.com/in/amanda...","https://blueoakroofing.com","https://google.com/maps?...","Saw you’re advertising roofing estimates—if a lead waits 30+ minutes, they often call the next roofer.","Operator","Not Sent","","",""

3) GOOGLE SHEETS CRM / TRACKING (create 4 tabs)
TAB A: Leads
Columns: LeadID | Segment (Agency/Operator) | Company | Niche | City | State | ContactName | Role | Email | Phone | LinkedIn | Website | SourceURL | PersonalizationLine | Owner (Bob) | Status (Not Sent/Sent/Replying/Demo Booked/Closed/Lost)

TAB B: Touches
Columns: TouchID | LeadID | Date | Channel (Email/LinkedIn/SMS) | Step (1/2/3) | Subject | MessageVariant | Result (Sent/Bounced/Opened/Clicked/Replied)

TAB C: Replies
Columns: LeadID | Date | ReplyType (Interested/Not now/Already have/No fit) | Key Objection | Next Step | Notes

TAB D: Demos
Columns: LeadID | DemoDate | Outcome (Show/No-show) | Next Meeting | Proposal Sent (Y/N) | Pilot Start Date | Revenue

4) 7-DAY PILOT OFFER BLOCK (paste into email)
“Offer: 7-day pilot. We connect your lead sources (forms/FB leads) to instant SMS + an AI qualification flow that asks 3–5 quick questions, then either (a) books a call/appointment or (b) hands off a qualified lead to your team.
Success criteria for the pilot (pick 1–2):
- <60 seconds median first response time
- +20–40% increase in contacted/qualified leads vs last 7 days
- At least 3 booked calls/appointments from the same lead volume
If it doesn’t produce measurable lift, we’ll stop—no hard feelings.”

5) SEQUENCE #1 — AGENCY (FB lead-gen agencies for home services)
Email 1 (Day 1)
Subject options:
A) “Speed-to-lead for your {{Niche}} clients”
B) “Quick idea to lift booked calls from your FB leads”
C) “{{Company}}: plug the 5-minute leak?”

Body:
Hi {{FirstName}} — {{PersonalizationLine}}

I’m Bob. We built Local Lead Response Copilot: it instantly texts new leads from forms/FB lead ads, qualifies them with 3–5 short questions, and books calls/appointments automatically.

Most local campaigns don’t lose on CPL—they lose in the first 5 minutes when nobody responds.

If you’re open, I can show you a 7-day pilot you can roll out on 1 client to lift contact + booked-call rate.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book time: {{CALENDLY_LINK}}
Or reply here: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email 2 (Day 3–4)
Subject: “Worth testing on 1 client?”

Hi {{FirstName}} — quick follow-up.

If you pick one client with high-intent leads (HVAC/roofing/plumbing/pest), we can usually:
- respond in <60 seconds 24/7
- qualify the lead before your client calls
- book directly on the calendar (or route to dispatch)

Want me to map the workflow for one client you’re currently running leads for? {{CALENDLY_LINK}}

6) SEQUENCE #2 — OPERATOR (roofing/HVAC/plumbing/pest/water damage/med spa)
Email 1 (Day 1)
Subject options:
A) “Stop missing new leads after hours”
B) “Instant text-back for {{Company}} leads”
C) “Quick fix for speed-to-lead”

Body:
Hi {{FirstName}} — {{PersonalizationLine}}

I’m Bob. We built Local Lead Response Copilot: when someone fills your form/FB ad, it texts them instantly, asks a few quick questions (job type, urgency, zip), and then books a call/appointment or hands the qualified lead to your team.

Speed-to-lead is usually the difference between “booked” and “called the next company.”

If you want, we can run a 7-day pilot so you can see if it increases booked jobs without adding office workload.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book time: {{CALENDLY_LINK}}
Or email: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email 2 (Day 3–4)
Subject: “Should I close the loop on this?”

{{FirstName}}, checking if you’d like to test instant SMS + qualification for new leads.

If you tell me where leads come from (website form / FB leads / both) and what you use for scheduling, I’ll outline the exact setup and what the customer sees.

Open to a quick 15 minutes? {{CALENDLY_LINK}}

7) LINKEDIN CONNECT NOTE (use for both segments)
“{{FirstName}}—quick question. Do you have a way to instantly text + qualify new inbound leads (forms/FB) so they don’t go cold? Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

8) OPTIONAL SMS FOLLOW-UP (ONLY where you have compliant opt-in / existing relationship)
“Hi {{FirstName}}, Bob here. Quick one—when a new web/FB lead comes in, do you respond within 1 minute? We built an instant SMS + AI qualifier that books calls. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 — reply YES and I’ll send details, or email agent_bob_replit+lead-copilot@agentmail.to”

9) PERSONALIZATION LINE LIBRARY (pick one)
Agency angles:
- “Saw you run FB lead gen for home services—most teams win on CPL but leak bookings due to slow follow-up.”
- “Noticed you offer landing pages + ads; are you doing any instant text-back on form fills?”
- “Your case study mentions {{Niche}} leads—curious if clients struggle with after-hours response.”

Operator angles:
- “Saw you offer {{Service}}—customers often contact 3 companies; first to respond usually wins.”
- “Noticed you promote ‘free estimates’—instant response can increase booked inspections.”
- “If you’re getting leads after hours/weekends, instant text-back can stop them going cold.”

This pack is structured so you can: (1) import 50 leads into the sheet, (2) write one personalization line each, (3) send Email 1 manually, (4) follow with Email 2, and (5) track replies/demos reliably.
