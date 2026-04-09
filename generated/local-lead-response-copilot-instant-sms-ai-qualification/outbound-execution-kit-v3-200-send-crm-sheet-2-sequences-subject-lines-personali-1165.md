# Outbound Execution Kit v3 — 200-Send CRM Sheet + 2 Sequences + Subject Lines + Personalization Library (Local Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** copy
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T13:04:32.342Z

---

Below is a complete, ready-to-paste outbound kit. It references the live site URL and support email as required.

1) ONE-TABLE CRM / TRACKING SHEET (Google Sheets)
Create a sheet with these columns (row 1 headers):
- Lead_ID
- Segment (Agency | Operator)
- Company
- Website_URL
- Source_URL (Clutch/UpCity/Maps/LinkedIn/Upwork)
- City_State
- Niche (HVAC/Plumbing/Roofing/Pest/WaterDamage/MedSpa/MarketingAgency)
- Decision_Maker_Name
- Role
- Email
- LinkedIn_URL
- Phone (optional)
- Personalization_Signal (e.g., “FB Lead Ads”, “Request Quote form”, “24/7 service”, “GHL”, “Calendly”, “Financing”)
- Personalization_Line (1 sentence)
- Score (1-5)
- Status (Queued | Sent_1 | Sent_2 | Replied_Pos | Replied_Neg | Bounce | Booked | No_Show | Closed_Won | Closed_Lost)
- Seq (A-Agency | B-Operator)
- Variant (Subject/Body variant code)
- Last_Touch_Date
- Next_Touch_Date
- Reply_Summary
- Demo_Date
- Notes

2) SUBJECT LINE VARIANTS
AGENCY:
A-S1: “Speed-to-lead for your FB leads (7-day pilot)”
A-S2: “Quick idea to lift your lead-gen close rate”
A-S3: “Do your clients respond in <60 seconds?”

OPERATOR:
O-S1: “Missed calls from new web/Facebook leads?”
O-S2: “Can we text new leads instantly for {{Company}}?”
O-S3: “Booking more jobs by replying in 60 seconds”

3) PERSONALIZATION OPENERS (swap into line 1)
Pick one and make it specific:
- “Noticed you’re running Facebook lead ads for {{niche}}—most teams lose the first contact window after-hours.”
- “I saw the ‘Request a Quote’ form on your site; do those leads get a text in the first minute?”
- “You mention 24/7 service—lead response time usually breaks down nights/weekends.”
- “Looks like you’re using Calendly/booking—if leads don’t book immediately, an SMS qualify flow can recover them.”
- “If you’re using GoHighLevel/CRM, this plugs into the same workflow and just handles instant SMS + qualification.”
- “Your reviews are strong—this is purely about contacting leads faster so you win more of the ones you already pay for.”

4) SEQUENCE A (AGENCY) — 2 STEPS
Goal: get a reply + book a demo.

Email 1 (Day 1)
Subject: {{A-S1/A-S2/A-S3}}
Body:
Hi {{FirstName}},

{{Personalization_Line}}

I’m Bob — we built Local Lead Response Copilot: it instantly texts new leads from forms/FB lead ads, asks 2–4 short qualifying questions, and then books a call/appointment automatically.

Teams usually see higher contact + booking rates just by cutting speed-to-lead from hours to seconds.

Open to a 15-min look? Here’s the site for context: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Or reply here and I’ll send the booking link. If email’s easier, reach me at agent_bob_replit+lead-copilot@agentmail.to.

We’re offering a 7-day pilot on 1 client account: we’ll connect the lead source → SMS qualify → booking, then you judge results.

— Bob

Email 2 (Day 3)
Subject: “Worth testing on one client?”
Body:
Hi {{FirstName}} — quick bump.

If you’re already generating leads, the biggest leak is usually first-response time. Our copilot responds instantly via SMS, qualifies, and routes only sales-ready leads to booking.

Do you want to try the 7-day pilot on one home services client? If you tell me the niche (HVAC/plumbing/roofing/etc.), I’ll outline the exact flow.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply here or email agent_bob_replit+lead-copilot@agentmail.to.

5) SEQUENCE B (OPERATOR) — 2 STEPS

Email 1 (Day 1)
Subject: {{O-S1/O-S2/O-S3}}
Body:
Hi {{FirstName}},

{{Personalization_Line}}

I’m Bob. We built a simple “lead response copilot” for local service businesses: the moment someone fills a form or FB lead ad, it texts them instantly, asks a couple quick questions, and then books a call/appointment.

It’s designed to win the lead while competitors are still calling back later.

If you want, I can set up a 7-day pilot so you can see how many more leads you contact + book.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply here or email agent_bob_replit+lead-copilot@agentmail.to and I’ll send the booking link.

— Bob

Email 2 (Day 3)
Subject: “Should I send the pilot setup details?”
Body:
Hi {{FirstName}} — following up.

Most missed jobs come from slow response (especially evenings/weekends). This just makes sure every new lead gets an instant text + quick qualification, then routes to booking.

Want to try it for 7 days? If yes, tell me where leads come from (website form / Facebook lead ads / both) and your service area.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to

6) LINKEDIN CONNECT NOTE (optional)
“Hi {{FirstName}} — quick question: are you already responding to new FB/form leads in under 60 seconds? We built an instant SMS + qualification copilot for local lead-gen. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

7) OPTIONAL SMS FOLLOW-UP (ONLY WHERE COMPLIANT / EXISTING BUSINESS CONTACT)
“Hi {{FirstName}}, Bob here. Quick one—do your new web/FB leads get a text reply in the first minute? We built a lead response copilot that instantly texts + qualifies + books. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  Reply STOP to opt out.”

8) 7-DAY PILOT POSITIONING (drop-in paragraph)
“7-day pilot: we connect your lead source → instant SMS → 2–4 qualifying questions → booking/hand-off. Success = higher contact rate + more booked calls from the same leads you already pay for. If it doesn’t outperform your current response process, you don’t continue.”
