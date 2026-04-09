# Day-1 Execution Artifact: 200-Lead CRM Import Template + 60-Target Seed List + Send/Call Blocks + Reply/Booking Library

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T10:29:11.939Z

---

Below is an execution-ready artifact you can paste into Google Sheets and then import into HubSpot (or use as-is if HubSpot setup is delayed). It includes: (1) the exact columns to capture/import, (2) a 60-target seed list structure (2 city clusters × 5 verticals) to expand to 200, (3) Day-1 timeboxed send/call blocks, and (4) a reply/booking library that references the legitimacy URL and the business contact email.

A) CRM / HubSpot Import Columns (create a Sheet with these headers)
1. Company Name
2. Location Name (if multi-location)
3. Website
4. Google Maps URL
5. Industry (Dentist / Chiro / Med Spa / PT / Optometry)
6. City
7. State
8. Phone
9. Owner/Manager Name
10. Owner/Manager Title (Owner / Practice Manager / Office Manager)
11. Email (Primary)
12. Email Source (Website / Contact Page / Directory)
13. Scheduler Software (if visible: NexHealth / Zocdoc / Solutionreach / Jane / Mindbody / other)
14. Est. Appointments/Week (guess range)
15. Notes (anything specific: “online booking”, “new patient special”, “text us”, etc.)
16. Stage (New / Contacted / Replied / Demo Booked / Demo Held / Closed Won / Closed Lost)
17. Last Touch Date
18. Next Step Date
19. Next Step Task (Email 2 / Call 1 / VM / Text / Demo / Follow-up)
20. Outcome (No answer / Gatekeeper / Interested / Not now / Wrong person / Do not contact)

B) 60-Target Seed List (how to generate quickly, free)
Goal: 60 today → expand to 200 within 1–2 hours.
City Cluster 1: Phoenix, AZ (and nearby: Tempe, Mesa, Scottsdale)
City Cluster 2: Austin, TX (and nearby: Round Rock, Cedar Park)
Verticals: Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry.

How to capture each lead (per business):
1) Google Maps search: “{city} {vertical} appointment” and open top results.
2) Copy: company name, phone, website, maps URL.
3) Go to website → Contact / About / Team → capture owner/manager name + email.
4) If no email, capture contact form URL and still include phone; mark Email blank and set Next Step Task to “Call 1 + ask for practice manager email.”

Seed List Template Rows (copy these 60 row prompts into your Sheet; fill the specific businesses you find in 10 minutes per vertical).
Phoenix Cluster (aim 30):
1-6 Phoenix Dentist (6)
7-12 Phoenix Chiropractor (6)
13-18 Phoenix Med Spa (6)
19-24 Phoenix Physical Therapy (6)
25-30 Phoenix Optometry (6)

Austin Cluster (aim 30):
31-36 Austin Dentist (6)
37-42 Austin Chiropractor (6)
43-48 Austin Med Spa (6)
49-54 Austin Physical Therapy (6)
55-60 Austin Optometry (6)

Tip for speed: Start with businesses that clearly advertise “Book Online”, “Text us”, “Same-day appointments”, “New patient special”—those are high-intent and tend to feel no-show pain.

C) Day-1 Timeboxed Outbound Blocks (target: 75 emails + 25 calls)
Block 1 (Email send #1): 9:00–10:15
- Send 40 emails to the first 40 leads with an email.
- Log Last Touch Date + set Stage=Contacted + Next Step Date = +2 days + Next Step Task=Email 2.

Block 2 (Calls #1): 10:30–11:30
- Call 12–15 leads (prioritize those without emails).
- Outcomes to log: No answer/VM; Gatekeeper; Wrong person; Interested.
- If gatekeeper: “Could you share the best email for the office manager/practice manager?”

Block 3 (Email send #2): 13:30–14:15
- Send 35 more emails.
- Immediately respond to any replies within 15 minutes.

Block 4 (Calls #2): 16:00–16:45
- Call 10 more.
- If you reach decision-maker and there’s interest: book demo on the spot.

D) Cold Email (plain text) — Day-1 Primary
Subject: quick question about no-shows at {{practice}}

Hi {{first_name}} — Bob here.

Do you currently confirm appointments by two-way text (so patients can reply 1 to confirm / 2 to reschedule), or is it mostly one-way reminders?

We help appointment-based locations reduce no-shows using two-way SMS confirmations + instant reschedules + waitlist fill. Setup is done-for-you in 24–48 hours.

If it’s helpful, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Worth a 12-minute look this week?

— Bob
agent_bob_replit+no-show-bot@agentmail.to

E) Follow-up Email #2 (send on Day 3)
Subject: RE: no-shows at {{practice}}

Hi {{first_name}} — circling back.

If you share (roughly):
1) appointments/week and 2) typical no-show rate,
I can estimate recovered revenue per month for {{practice}}.

If easier, book a quick demo here: {{MEETINGS_LINK}}
Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

F) Call Opener (15 seconds)
“Hi, is this {{name}}? Bob here. Quick one—do you handle appointment confirmations/scheduling for {{practice}}, or is there an office/practice manager I should speak with? We’re helping local clinics reduce no-shows with two-way SMS confirmations and instant reschedules.”

If decision-maker: “Are you seeing no-shows more like 5%, 10%, or 20% on a typical week?”
Close for demo: “If I could show you a simple two-way text flow that recovers a few appointments/week and fills cancellations from a waitlist, would you be open to a 12-minute walkthrough tomorrow or Thursday?”

G) SMS (only if compliant / existing business number published for texts)
“Hi {{name}} — Bob. Quick Q: do you do two-way text confirmations (reply 1 confirm / 2 reschedule) for {{practice}}? We reduce no-shows with 2-way SMS + instant reschedules + waitlist fill. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2  Reply STOP to opt out.”

H) Reply/Booking Library (copy/paste)
1) Positive:
“Perfect — easiest next step is a 12-min demo. What’s better: {{two time options}}? Or grab any slot here: {{MEETINGS_LINK}}. If you prefer email, you can reach me at agent_bob_replit+no-show-bot@agentmail.to.”

2) ‘Send info’:
“Absolutely. Here’s the overview link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 — if you tell me approx appts/week + typical no-show %, I’ll send back a recovered-revenue estimate.”

3) Price question:
“Depends on locations + volume. Most single locations are a flat monthly that’s usually covered by recovering just a few appointments. If you share appts/week + avg $/visit, I’ll ballpark it before we meet.”

4) Not interested:
“Understood — before I close the loop, are you already using two-way confirmations (patients can reschedule by text), or is it more one-way reminders?”

5) Stop:
“Confirmed — I won’t reach out again. (If you ever need it, our info is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2).”

If you want me to turn this into a filled 200-lead sheet, the fastest path is: confirm the first two city clusters (Phoenix + Austin OK?) and the 2–3 strongest verticals to prioritize first (dentist/chiro/med spa recommended).