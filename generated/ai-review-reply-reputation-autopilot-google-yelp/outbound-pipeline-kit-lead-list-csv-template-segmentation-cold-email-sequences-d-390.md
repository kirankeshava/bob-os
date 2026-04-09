# Outbound Pipeline Kit — Lead List CSV Template + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:40:08.672Z

---

BUSINESS LEGITIMACY LINKS (use in outreach)
- Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
- Contact email (reply-to): agent_bob_replit+review-bot@agentmail.to

A) LEAD LIST CSV TEMPLATE (paste as header row)
account_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_responses,response_rate_proxy,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,response_gap_note,notes

B) DATA DICTIONARY (what to capture + how)
1) account_name: GBP business name exactly as shown in Google.
2) vertical: one of {Dentist, MedSpa, HVAC/Plumbing}.
3) city_state: e.g., “Austin, TX”.
4) website: from GBP; if missing, leave blank (still usable for outreach via contact form/phone).
5) phone: from GBP.
6) google_maps_url: share link to the GBP.
7) google_rating: star rating.
8) review_count: total reviews.
9) last_review_date: date of most recent review (or “YYYY-MM-DD” if possible; otherwise month/day).
10) last_10_owner_responses: integer 0–10 (count responses by owner in the most recent 10 reviews).
11) response_rate_proxy: =last_10_owner_responses/10 (as a decimal) OR percent.
12) segment:
   - not_responding if response_rate_proxy <= 0.2 OR 0 responses in last 10
   - low_rating if google_rating < 4.2
   - high_volume if review_count >= 200 OR last_review_date within last 14 days
   (If multiple apply, keep the “most painful” first in notes; segment field can be multi-tag like “low_rating;high_volume”.)
13) priority:
   - Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
   - Priority B: not_responding OR low_rating
   - Priority C: high_volume only
14) owner_or_manager_name: best guess from website/team page/LinkedIn/GBP “from the business” if shown.
15) role_guess: Owner, Office Manager, Practice Manager, GM, Marketing Manager.
16) email_1/email_2: from website contact page, booking page, or staff directory; use role-based emails if direct not found.
17) personalization_snippet: 1–2 lines from the most recent review OR a paraphrase (safer) that mentions service and sentiment.
18) response_gap_note: e.g., “No owner response on last 8 reviews” or “Last response was 3 months ago”.
19) notes: anything helpful (multiple locations, franchise, uses agency, etc.).

C) SEGMENTATION FORMULAS (Google Sheets examples)
Assume columns:
- google_rating in G
- review_count in H
- last_review_date in I
- last_10_owner_responses in J

1) response_rate_proxy (K2): =J2/10
2) not_responding flag: =IF(K2<=0.2,TRUE,FALSE)
3) low_rating flag: =IF(G2<4.2,TRUE,FALSE)
4) high_volume flag (simplified if date is valid): =IF(OR(H2>=200, I2>=TODAY()-14),TRUE,FALSE)
5) priority (example):
=IF(OR(AND(K2<=0.2,OR(H2>=200,I2>=TODAY()-14)),AND(G2<4.2,OR(H2>=200,I2>=TODAY()-14))),"A",IF(OR(K2<=0.2,G2<4.2),"B",IF(OR(H2>=200,I2>=TODAY()-14),"C","")))

D) GEO + QUERY PACK (recommended)
Recommended geography for first 500–1,000: Top 25 US metros to keep density high and reduce edge-case categories.
How to search (Google Maps):
- Dentists: “dentist in {metro}” and “cosmetic dentist in {metro}”
- Med spas: “med spa in {metro}”, “aesthetic clinic in {metro}”, “botox in {metro}”
- HVAC/Plumbing: “HVAC in {metro}”, “plumber in {metro}”, “AC repair in {metro}”
Sorting rule (manual): prioritize businesses with (a) high review count, (b) recent reviews, (c) visible lack of responses.

E) COLD EMAIL SEQUENCE (3-step) — MASTER TEMPLATE
Rules:
- Keep under ~120 words.
- Always include website URL for legitimacy and reply-to email.
- Personalize using {{personalization_snippet}} + {{response_gap_note}}.
- Choose the variant based on segment.

E1) INITIAL EMAIL — NOT RESPONDING VARIANT
Subject options:
1) Quick question about your Google reviews
2) Noticed a response gap on recent reviews
3) 12-hour review replies for {{account_name}}?

Body:
Hi {{first_name_or_role}},

I was looking at {{account_name}}’s Google reviews and noticed: “{{personalization_snippet}}” — and it looks like {{response_gap_note}}.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negatives to you, and can reply within 12 hours (you approve before anything posts).

If I send 2–3 example replies in your tone using your latest reviews, would you like to see them?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E2) INITIAL EMAIL — LOW RATING VARIANT
Subject options:
1) Quick win for your Google rating
2) Reducing damage from negative reviews
3) Review response help for {{account_name}}

Body:
Hi {{first_name_or_role}},

I saw a recent Google review for {{account_name}}: “{{personalization_snippet}}”. When negatives sit without a timely reply, it can keep hurting calls and bookings.

We provide brand-safe review responses for Google + Yelp, with an escalation flow for negatives and a simple approval step (nothing posts without you). Typical SLA is <12 hours.

Open to a quick look? I can draft example replies to your last 3 reviews and you can decide if it’s useful.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E3) INITIAL EMAIL — HIGH VOLUME VARIANT
Subject options:
1) Keeping up with review volume at {{account_name}}
2) Review replies without more staff time
3) Simple reputation reporting weekly

Body:
Hi {{first_name_or_role}},

{{account_name}} is getting steady review volume (nice work). Most teams fall behind responding consistently, which leaves revenue on the table.

Our Autopilot drafts on-brand responses for Google + Yelp, routes sensitive reviews for approval, and sends a weekly KPI summary (rating trend, response rate, negative themes).

Want me to show what a “week of replies” would look like for your latest reviews?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E4) FOLLOW-UP #1 (2–3 business days later)
Subject: Re: {{account_name}} reviews

Hi {{first_name_or_role}},

Should I put together a few example replies for {{account_name}} using your recent reviews (Google/Yelp)?

If you reply with “yes”, I’ll send 3 drafts in your tone + a simple weekly KPI view. No commitment.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E5) FOLLOW-UP #2 (5–7 business days after initial)
Subject: Close the loop?

Hi {{first_name_or_role}},

Closing the loop—do you want help responding to reviews more consistently at {{account_name}}?

If now’s not a priority, tell me “later” and I’ll stop. If you’re open, I can send example replies + how the approval/escalation works.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

F) AGENCY / RESELLER VERSION (INITIAL)
Subject options:
1) White-label review response ops for your clients
2) Add “review replies in 12h” to your retainers
3) Google/Yelp response fulfillment

Body:
Hi {{first_name}},

If you manage local clients (dental/med spa/home services): we provide a white-label Review Reply & Reputation Autopilot for Google + Yelp—drafts in the brand voice, escalates negatives, and includes weekly KPI reporting.

You keep the client relationship; we handle fulfillment. Happy to share a sample workflow + pricing that leaves room for margin.

Open to a 10-min chat?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

G) DAILY SENDING OPS CHECKLIST + 14-DAY RAMP (single inbox)
Pre-flight (one-time):
- Set reply-to as agent_bob_replit+review-bot@agentmail.to
- Ensure plain-text first (no images), one link max (website), no attachments.
- List QA: remove duplicates, verify domain exists, avoid generic directories.

Daily (Mon–Fri):
1) Add 30–50 new leads/day (Priority A first).
2) Personalize first line with {{personalization_snippet}} + {{response_gap_note}}.
3) Send volume ramp (per inbox):
   - Days 1–3: 15/day
   - Days 4–6: 25/day
   - Days 7–10: 35/day
   - Days 11–14: 50/day
4) Follow-ups: queue FU#1 on day 3; FU#2 on day 7.
5) Reply SLA: respond within 2 hours during business day; same-day otherwise.
6) Bounce threshold: if bounces >3% in a day, pause new sends and clean list.

KPIs to track weekly:
- Delivered %, bounce %, reply %, positive reply %, demos booked, cost per demo (if any), segment performance (A/B/C).

H) SIMPLE CRM STAGES (spreadsheet or free CRM)
1) Prospect (has email + segment + priority)
2) Sent (date stamped)
3) Replied
4) Qualified (has GBP + review volume pain + decision maker)
5) Demo Booked
6) Trial / Pilot
7) Paid
8) Lost (reason)

Entry/exit rules:
- Prospect→Sent once initial email goes out.
- Sent→Replied only when a human response arrives.
- Replied→Qualified if they confirm they control Google/Yelp responses and have pain/urgency.
- Qualified→Demo Booked when time is scheduled.

NEXT STEP REQUIRED FROM OWNER
Pick the geography for V1 list. Recommendation: Top 25 US metros. Once confirmed, a human/VA can build 500–1,000 rows using the CSV template and segmentation rules above; then we begin sending with the segment-matched variant and ramp schedule.