# Outbound Pipeline Kit (Zero-Cost): Lead List Build (Top 25 Metros) + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:28:11.663Z

---

Below is a ready-to-run outbound system to build a 500–1,000 lead CSV and start sending with $0 tools.

1) Target verticals + segments
Verticals: (A) Dentists, (B) Med Spas / Aesthetic Clinics, (C) HVAC + Plumbers.
Segments (use Google rating/reviews/recency/response proxy):
- Not Responding: owner replies in ≤2 of last 10 reviews (≤20% response proxy)
- Low Rating: Google rating < 4.2
- High Volume: review_count ≥ 200 OR last review within 14 days
Priority scoring:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating
- Priority C: High Volume only

2) Lead CSV schema (Google Sheets headers)
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, response_proxy_last10 (0-10), segment, priority (A/B/C), personalization_snippet (recent review excerpt or paraphrase), owner_or_manager_name (guess), role_guess, email_1, email_2, notes

Segmentation formulas (Sheets examples; adjust to your column letters):
- segment:
IF(google_rating<4.2,"low_rating", IF(OR(review_count>=200, last_review_date>=TODAY()-14),"high_volume", "")) plus not_responding flag if response_proxy_last10<=2.
Practical method: compute two flags then set segment by rule order.
- priority:
IF(AND(not_responding=TRUE, high_volume=TRUE),"A", IF(AND(low_rating=TRUE, high_volume=TRUE),"A", IF(OR(not_responding=TRUE, low_rating=TRUE),"B", IF(high_volume=TRUE,"C","C"))))

3) Top 25 US metros (use for geo consistency)
New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, San Francisco, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

4) Google Maps query pack (copy/paste)
Run each query as: "<VERTICAL KEYWORD> in <CITY, STATE>".
Dentist keywords (rotate to reduce irrelevant results):
- "dentist", "dental clinic", "cosmetic dentist", "family dentistry", "emergency dentist"
Med spa keywords:
- "med spa", "medical spa", "aesthetic clinic", "botox", "laser hair removal"
HVAC/Plumbing keywords:
- "HVAC", "air conditioning repair", "heating contractor", "plumber", "drain cleaning"
Agency lane (optional parallel list):
- "digital marketing agency dentist", "dental marketing agency", "med spa marketing", "HVAC marketing agency", "local SEO agency" + each metro OR US-wide.

5) Manual data capture SOP (zero-cost)
For each prospect in Google Maps:
A. Capture business name, phone, website, rating, review count.
B. Click “Reviews”, set to “Newest”. Record last review date and copy a safe snippet (1 short sentence). If sensitive, paraphrase instead of quoting.
C. Response proxy: scan last 10 reviews and count how many have an “Owner response”. Enter 0–10.
D. Segment + priority using rules above.
E. Email enrichment (free): go to website → Contact page, About, Team; look for “Practice Manager”, “Office Manager”, “Owner”, “Clinic Manager”, “General Manager”. Add email_1/email_2.

6) Cold email sequences (master + segment modules)
Use personalization tokens:
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_observation}}, {{google_rating}}, {{review_count}}
Signature must include:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Email: agent_bob_replit+review-bot@agentmail.to

6.1 Initial email (choose subject by segment)
Subjects (Not Responding):
- "Quick fix for your Google reviews"
- "Noticed a review response gap at {{business_name}}"
- "Can I draft your next 10 replies?"
Subjects (Low Rating):
- "Rebuilding rating momentum for {{business_name}}"
- "A safer way to respond to tough reviews"
- "12-hour review response help"
Subjects (High Volume):
- "Keeping up with review volume at {{business_name}}"
- "We can respond within 12 hours"
- "Review replies without staff time"

Body (Base):
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews in {{city}}.

{{personalized_hook}}

We built an AI “Review Reply & Reputation Autopilot” that drafts brand-safe responses to Google/Yelp reviews, escalates negatives, and sends a weekly KPI recap. You can approve replies before anything posts.

If you want, I can do a free 7-day pilot: we’ll draft replies within 12 hours for every new review, and flag anything negative immediately.

Worth it if I send 2–3 sample replies based on your latest reviews?

— Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Personalized hook blocks (pick one):
A) Not Responding hook:
“Saw a recent review: “{{recent_review_snippet}}”. It looks like many recent reviews don’t have an owner response yet ({{response_gap_observation}}).”
B) Low Rating hook:
“Noticed you’re at {{google_rating}} right now. A couple of newer reviews mention: “{{recent_review_snippet}}”. The response tone/timing can make a big difference on conversions.”
C) High Volume hook:
“You’re getting a lot of review traffic ({{review_count}}+). Keeping up with fast, consistent replies is hard without a system.”

6.2 Follow-up #1 (2–3 business days later)
Subject: "Sample reply for {{business_name}}?"
Hi {{first_name}} — quick follow-up.

If I draft 2 sample responses (1 positive + 1 critical) based on your newest reviews, would you want to see them?

If yes, just reply “sample” and I’ll send drafts you can copy/paste (or approve for posting during the free 7-day pilot).

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6.3 Follow-up #2 (5–7 business days later)
Subject: "Close the loop"
Hi {{first_name}} — closing the loop.

Totally fine if now isn’t the time. If review replies are on your radar later, we can:
- respond within 12 hours (Google + Yelp)
- keep a consistent brand voice
- flag negatives immediately + weekly KPI recap

Want me to send those 2 sample replies anyway?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6.4 Agency/reseller initial email
Subject: "White-label review response autopilot for your clients"
Hi {{first_name}} — do you manage local SEO/reputation for dental/med spa/home services clients?

We built a brand-safe review reply autopilot (Google + Yelp): drafts replies, escalates negatives, and produces weekly KPI reporting. Agencies can white-label it and route approvals through their team.

Open to a quick call? I can also set up a free 7-day pilot on one client so you can see the workflow end-to-end.

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

7) Daily sending ops (zero-cost)
Tools: Google Sheets (CRM + list), Gmail (manual sends), calendar link optional (free).
CRM stages (Sheet columns): Prospect → Queued → Sent → Replied → Qualified → Demo Booked → Trial (Free 7 days) → Paid → Lost.
14-day ramp (per inbox; stay conservative on new inboxes):
- Days 1–3: 10–15 new emails/day, mostly Priority A, highly personalized
- Days 4–7: 20–30/day, add Priority B
- Days 8–14: 40–60/day if bounce rate <3% and replies steady
Quality gates:
- Bounce rate >5%: stop, fix emails/source
- Spam complaints: stop immediately, tighten targeting + personalization
Reply SLA: respond within 2 hours during business day; same day otherwise.
Daily routine (60–90 min):
1) Build 20–40 new leads into the sheet
2) Personalize 10–20 Priority A emails using snippet + response gap
3) Send new emails + queue follow-ups
4) Update CRM based on opens/replies (even manual)
5) Log objections + refine copy weekly

8) What “done” looks like this week
- Build first 200 leads (Top 25 metros; 3 verticals) with segments + Priority.
- Send 20/day from 1 inbox with heavy personalization.
- Goal KPI: 5–10 replies/week and 1–3 pilots booked (free 7-day trial).
