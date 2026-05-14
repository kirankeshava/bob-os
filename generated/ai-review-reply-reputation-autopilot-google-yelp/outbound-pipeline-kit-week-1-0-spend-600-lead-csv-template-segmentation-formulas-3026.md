# Outbound Pipeline Kit (Week 1, $0 Spend): 600-Lead CSV Template + Segmentation Formulas + Lead-Build SOP + Cold Email Sequences (with website/email)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:12:42.640Z

---

BUSINESS REFERENCES (use in all outreach)
- Website (proof/legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to
- Offer (Week 1): FREE 7-day “Review Reply & Reputation Autopilot” trial (draft responses within 12 hours, brand-safe, you approve; escalate negatives).

A) VERTICALS + GEO (locked for list-building)
Target verticals (3):
1) Dentists (general + cosmetic dentistry)
2) Med spas / Aesthetic clinics
3) HVAC + Plumbing (home services)

Geo scope: Top 25 US metros (example set): New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, San Francisco, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.
(If you want fewer metros, just use the top 10 to start and still hit 500+ leads.)

B) 600-LEAD CSV TEMPLATE (HEADERS) + HOW TO USE
Create a Google Sheet with the headers below (Row 1). Then pre-fill 600 blank rows. Export as CSV when done.

REQUIRED COLUMNS (copy/paste exactly as headers):
lead_id,vertical,metro,city_state,business_name,google_maps_url,website,phone,google_rating,review_count,last_review_date,last_review_snippet,owner_response_count_last10,response_rate_proxy,segment_not_responding,segment_low_rating,segment_high_volume,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,contact_source,notes

SEGMENTATION + PRIORITY FORMULAS (Google Sheets)
Assumptions: owner_response_count_last10 is a number 0–10 you count manually from the last 10 reviews.
- response_rate_proxy (Row 2):
=IFERROR(owner_response_count_last10/10,"")
- segment_not_responding (Row 2):
=IF(OR(response_rate_proxy="",response_rate_proxy<=0.2),TRUE,FALSE)
- segment_low_rating (Row 2):
=IF(AND(google_rating<>"",google_rating<4.2),TRUE,FALSE)
- segment_high_volume (Row 2):
=IF(OR(AND(review_count<>"",review_count>=200),AND(last_review_date<>"",TODAY()-last_review_date<=14)),TRUE,FALSE)
- priority_tier (Row 2):
=IFS(OR(AND(segment_not_responding,segment_high_volume),AND(segment_low_rating,segment_high_volume)),"A",OR(segment_not_responding,segment_low_rating),"B",segment_high_volume,"C",TRUE,"C")

C) ZERO-COST LEAD-BUILD SOP (GOOGLE MAPS ONLY)
Goal: 500–1,000 rows with rating, review count, last review date, response proxy, and at least one email per lead when possible.

Step 1 — Pull candidates (Google Maps)
For each metro + vertical, search Google Maps with one of:
- Dentist: “dentist near [metro]”, “cosmetic dentist [metro]”, “dental clinic [metro]”
- Med spa: “med spa [metro]”, “aesthetic clinic [metro]”, “botox [metro]”
- HVAC/Plumbing: “HVAC [metro]”, “air conditioning repair [metro]”, “plumber [metro]”

Open each listing in a new tab and capture:
- business_name
- google_rating, review_count
- phone
- website (if present)
- google_maps_url (share link)

Step 2 — Capture review recency + snippet
Click Reviews → sort by “Newest”.
- last_review_date: the date of the newest review.
- last_review_snippet: copy 8–20 words max OR paraphrase. Rule: avoid health details or sensitive info; never quote a patient/client’s full story. Example: “mentioned long wait time + front desk confusion”.

Step 3 — Compute response-rate proxy (last 10)
Still in Reviews (Newest): look at the most recent 10 reviews.
Count how many have an “Owner response”. Put number in owner_response_count_last10.
Sheet will calculate response_rate_proxy and segments automatically.

Step 4 — Find email (free methods)
Priority order:
1) Website contact page: look for “@” email.
2) Footer/legal pages: privacy policy/terms sometimes include an email.
3) For dentists/med spas: check “Book online” or “Patient forms” pages.
4) If none: use a best-guess role email pattern only if it’s explicitly listed (do NOT invent emails). Otherwise leave email blank and use phone/LinkedIn as fallback.
Fill:
- email_1 (primary), email_2 (secondary if found)
- contact_source (e.g., “website contact page”, “GBP website link”, “Facebook page”) 

Step 5 — QA rules (fast)
Discard leads if:
- franchise/location pages without local decision maker (unless you want multi-location later)
- no website AND no email found (unless you plan phone outreach)
- category mismatch (e.g., “Dental lab” instead of “Dental clinic”)

Daily throughput targets (1 person): 40–60 leads/day once practiced (each lead 2–4 minutes).

D) OUTREACH ROUTING (BY PRIORITY/SEGMENT)
Priority A (send first):
- Not responding + High volume OR Low rating + High volume
Priority B:
- Not responding OR Low rating
Priority C:
- High volume only

Template mapping:
- Not responding angle: “response gap” + trust/revenue impact + offer to respond within 12 hours.
- Low rating angle: “negative review escalation + brand-safe replies” + show you prevent pile-on.
- High volume angle: “operational throughput + approval flow” + weekly KPI report.

E) 3-STEP COLD EMAIL SEQUENCE (DIRECT-TO-LOCAL)
Use personalization tokens:
{{business_name}}, {{metro}}, {{vertical}}, {{recent_review_snippet}}, {{response_rate_proxy}}, {{google_rating}}, {{review_count}}, {{last_review_date}}

Email 1 (Not Responding / response gap)
Subject options:
1) Quick help with Google reviews for {{business_name}}
2) Noticed a response gap on your recent reviews
3) {{business_name}} — replying to reviews (12-hr SLA)

Body:
Hi {{first_name_or_team}},

I was looking at {{business_name}} on Google and saw a recent review that mentioned “{{recent_review_snippet}}”. It also looks like many recent reviews don’t have an owner reply.

We run an AI-assisted “Review Reply & Reputation Autopilot” for local businesses: brand-safe draft responses to every Google/Yelp review within 12 hours, with a simple approve/edit flow and escalation for negative reviews.

Week 1 is free (7-day trial). You can see what we mean here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want me to draft replies for your next 10 reviews so you can judge quality? If yes, reply “YES” and tell me whether you prefer friendly or formal tone.

– Bob
agent_bob_replit+review-bot@agentmail.to

Email 2 (follow-up, value + proof)
Subject: Re: replies for {{business_name}} reviews

Hi {{first_name_or_team}},

Following up—most local customers read the owner replies almost as much as the star rating.

If you want, I’ll send 3 sample responses (1 positive, 1 neutral, 1 negative-style) based on your real reviews. No login needed—just reply with “samples”.

– Bob
agent_bob_replit+review-bot@agentmail.to

Email 3 (breakup + micro-CTA)
Subject: Close the loop?

Hi {{first_name_or_team}},

Should I (a) send the sample replies, (b) check back next month, or (c) stop reaching out?

Either way—if reviews are piling up, we can respond within 12 hours and escalate negatives so nothing slips.

– Bob
agent_bob_replit+review-bot@agentmail.to

F) AGENCY/RESELLER VERSION (Email 1)
Subject: White-label review reply autopilot for your clients

Hi {{agency_name_or_first_name}},

Do you manage local clients (dentists/med spas/home services) who get frequent Google reviews but don’t respond consistently?

We provide a brand-safe review reply autopilot: draft responses within 12 hours for Google/Yelp, negative-review escalation, and a weekly KPI summary. Agencies can resell it as a managed add-on.

Week 1 is free so you can test quality on a real client account. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute chat to see if it fits 3–5 of your accounts?

– Bob
agent_bob_replit+review-bot@agentmail.to

G) DAILY SENDING OPS (WEEK 1 FREE OFFER)
- Day 1–2: send 20/day (Priority A only)
- Day 3–4: 30/day (A then B)
- Day 5–7: 50/day (A+B, sprinkle C)
Rules:
- Stop on reply; respond within 1 business hour.
- If bounce rate > 5% in a batch, pause and clean list.
- Track outcomes in CRM stages: Prospect → Sent → Replied → Qualified → Trial Started → Active Trial → Converted / Lost.

What you need to execute next (owner/VA):
1) Use this SOP to collect the first 200 leads in 48 hours (start with dentists + med spas in top 10 metros).
2) Export CSV and begin daily sends with Priority A first using Email 1 + follow-ups.
3) Keep a running log of positive replies and objections so we can tighten targeting and copy.