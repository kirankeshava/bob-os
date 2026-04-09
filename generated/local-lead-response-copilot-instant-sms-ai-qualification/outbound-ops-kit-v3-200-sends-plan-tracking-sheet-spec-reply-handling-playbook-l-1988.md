# Outbound Ops Kit v3 — 200 Sends Plan + Tracking Sheet Spec + Reply-Handling Playbook (Local Lead Response Copilot)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T19:07:49.818Z

---

Business proof link (share in outreach as needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply-to/support email (include everywhere): agent_bob_replit+lead-copilot@agentmail.to

GOAL (7 days): 200 targeted outreaches → 20 replies → 10 demos booked.
Offer: FREE 7-day pilot of “instant SMS + AI qualification + booked appointment” for new leads.

1) DAILY SEND PLAN (deliverability-safe, no spend)
Day 0 (today):
- Pick best-fit 50 (30 agencies, 20 operators). Criteria: clearly running lead gen (FB lead ads/forms), home services focus, visible phone number, active site.
- Prep 15 warmup 1:1 emails (non-automated). Send to the top 15 with high personalization.
- Wait 2–4 hours; respond fast to any replies.

Days 1–4:
- Send 50/day (mix 60% agencies, 40% operators). Keep it manual or mail-merge with heavy throttling.
- Rate limit: 10 sends/hour max; never blast all at once.
- After every 25 sends, check for bounce backs; if bounces >5%, stop and improve email quality.
- Same-day reply SLA: <15 minutes during business hours.

Days 5–7:
- Follow-up #2 to non-responders (the second step of each sequence).
- LinkedIn follow-ups for anyone who accepted connect.

2) TRACKING SHEET / CRM SPEC (Google Sheets)
Create 4 tabs: Leads, Touches, Replies, Demos.

TAB A: Leads (one row per prospect)
Columns:
- Lead_ID (unique)
- Segment (Agency / Operator)
- Company_Name
- Website_URL
- Source_URL (Clutch/UpCity/LinkedIn/Maps/Upwork/FB group link)
- Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa/Agency)
- Location (City, State)
- Decision_Maker_Name
- Role (Owner/Founder/Head of Growth/GM/Marketing)
- Email
- Phone (only if public and compliant to text)
- LinkedIn_URL (person)
- Company_LinkedIn_URL
- Personalization_Line (1 sentence)
- Sending_Identity (dedicated inbox)
- Status (Not contacted / Sent 1 / Replied / Follow-up due / Demo booked / Not now / Closed-lost)
- Last_Touch_Date
- Next_Touch_Date
- Notes

TAB B: Touches (one row per touch)
- Touch_ID
- Lead_ID
- Date
- Channel (Email / LinkedIn / SMS)
- Step (S1 / S2)
- Subject (if email)
- Message_Variant (Agency v1 / Operator v1)
- Result (Sent / Bounced / Delivered / Connected)

TAB C: Replies
- Reply_ID
- Lead_ID
- Date
- Sentiment (Positive/Neutral/Negative)
- Objection_Type (Price/Timing/Already have/Not interested/Need info)
- Next_Action (Book demo / Send 2-liner / Ask qualifying Q / Close)
- Owner (Bob)

TAB D: Demos
- Demo_ID
- Lead_ID
- Date_Booked
- Demo_DateTime
- Outcome (Show/No-show/Reschedule)
- Pilot_Started (Y/N)
- Pilot_Result (Booked jobs / Leads qualified / Other)

Top-of-sheet KPI counters (manual):
- Sends today / total
- Replies today / total
- Demos booked today / total

3) FIRST-50 QUEUE FORMAT (prep checklist + fields)
For each prospect, gather in <60 seconds:
- Confirm they run lead gen: “Facebook Ads”, “Lead Gen”, “Google Ads”, “Forms”, “Book now”, “Schedule”, “Get quote”, “Financing”, “Service area”.
- Pull 1 specificity: service + city OR a review snippet OR a case study headline.
- Personalization_Line formula examples:
  - Agency: “Saw you run lead gen for {vertical}—liked the {case study/recent post} and the focus on {result}.”
  - Operator: “Noticed you serve {city} for {service}; looks like you’re actively driving quote requests from the site.”

Required mail-merge columns:
FirstName | Company | Role | Niche | City | Website | Personalization_Line | Booking_Link

4) OUTREACH SEQUENCES (2-step) — include proof URL + contact email

A) AGENCY SEQUENCE
Email 1 (Step S1)
Subject options:
1) “Speed-to-lead for your home service clients”
2) “Plug-in SMS follow-up for new FB leads”

Body:
Hi {FirstName} — {Personalization_Line}

Quick idea: we built a lightweight “Lead Response Copilot” that instantly texts new leads (forms/FB lead ads), asks 2–4 short qualifying questions, and then routes to booking.

Most local campaigns lose deals simply because nobody responds in the first 1–5 minutes.

Would you be open to a FREE 7-day pilot for one client? If it doesn’t increase booked calls/appointments, you can drop it.

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Book a quick 15-min intro: {Booking_Link}
Or reply here / email: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email 2 (Step S2, 2–3 business days later)
Subject: “Worth testing on 1 client?”
Body:
Hi {FirstName} — quick follow-up.

If you’re already generating leads for home services, we can plug in instant SMS + AI qualification so your client gets contacted immediately (including after-hours), and you get cleaner “qualified vs unqualified” reporting.

Want me to map the flow for one client and run it FREE for 7 days?
{Booking_Link}

B) OPERATOR SEQUENCE
Email 1 (S1)
Subject options:
1) “Instantly text new {HVAC/roofing/etc.} leads in {City}”
2) “Stop losing quote requests after hours”

Body:
Hi {FirstName} — {Personalization_Line}

When someone requests a quote, whoever responds first usually wins.

We built Local Lead Response Copilot: it instantly texts every new lead, asks a couple quick questions (job type/urgency/location), and then books an appointment or call.

I can set this up FREE for 7 days so you can see if it increases booked jobs.

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Grab a 15-min slot: {Booking_Link}
Or email: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email 2 (S2)
Subject: “Should I close the loop on this?”
Body:
Hi {FirstName} — should I send a quick 60-second screen share showing how the instant-text + qualification flow would work for your leads?

If you want to try it, I can run it FREE for 7 days and you keep it only if it books more calls.
{Booking_Link}

5) LINKEDIN CONNECT NOTE (<=300 chars)
“Hey {FirstName} — quick one: we built an instant SMS + AI qualification ‘copilot’ for new local leads (forms/FB). Free 7-day pilot to see if it books more calls. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4”

6) OPTIONAL SMS FOLLOW-UP (only where compliant; keep it permission-based)
“Hi {FirstName}—Bob here. I emailed about a free 7-day pilot that instantly texts + qualifies new leads and can book calls. If you want details, reply YES and I’ll send a 2-liner + link. (Info: agent_bob_replit+lead-copilot@agentmail.to)”

7) REPLY-HANDLING PLAYBOOK (convert to demos)
A) Positive / Interested:
“Great — easiest next step is a 15-min intro so I can see your lead sources + current follow-up. Here’s my link: {Booking_Link}. If easier, send 2 times that work and I’ll confirm.”

B) ‘Send info’:
“Absolutely. In one line: we instantly text every new lead, ask 2–4 qualifying questions, then route to booking—so you win speed-to-lead. Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Worth a quick 15-min to see if it fits? {Booking_Link}”

C) ‘Already have something’:
“Totally fair — most teams do. Quick question: what’s your average time-to-first-contact on a new lead (including nights/weekends)? If it’s >5 minutes, the pilot usually shows lift. Open to a quick compare? {Booking_Link}”

D) ‘Not now’:
“No problem. When should I circle back — 30 or 60 days? Also, if you tell me your biggest lead leak (after-hours, no-shows, unqualified), I’ll send a specific fix.”

E) Negative:
“Understood — I’ll close the loop. If it ever becomes a priority to respond to leads faster, you can reach me at agent_bob_replit+lead-copilot@agentmail.to.”
