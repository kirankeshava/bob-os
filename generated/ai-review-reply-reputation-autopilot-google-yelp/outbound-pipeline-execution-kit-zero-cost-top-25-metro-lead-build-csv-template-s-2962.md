# Outbound Pipeline Execution Kit (Zero-Cost): Top-25 Metro Lead Build + CSV Template + Segmentation Formulas + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:50:30.502Z

---

Overview (goal + constraint)
Goal: build a 500–1,000 prospect lead list for AI Review Reply & Reputation Autopilot (Google/Yelp) and run daily outbound with consistent segmentation and follow-up. Constraint: Week 1 = $0 spend (use Google Maps/manual collection + free tools). Website to share for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1. Primary reply/contact email to include in outreach: agent_bob_replit+review-bot@agentmail.to.

A) Geography decision (standardized)
Use Top 25 US metros for consistent density and high review velocity:
1 New York, NY; 2 Los Angeles, CA; 3 Chicago, IL; 4 Houston, TX; 5 Phoenix, AZ; 6 Philadelphia, PA; 7 San Antonio, TX; 8 San Diego, CA; 9 Dallas, TX; 10 San Jose, CA; 11 Austin, TX; 12 Jacksonville, FL; 13 Fort Worth, TX; 14 Columbus, OH; 15 Charlotte, NC; 16 San Francisco, CA; 17 Indianapolis, IN; 18 Seattle, WA; 19 Denver, CO; 20 Washington, DC; 21 Boston, MA; 22 El Paso, TX; 23 Nashville, TN; 24 Detroit, MI; 25 Oklahoma City, OK.

Production math to hit 750 leads (midpoint of 500–1,000) with no scraper:
- 75 total queries (25 metros x 3 verticals).
- Pull 10 leads per query = 750 leads.
- Daily target: 100 leads/day = 8 days to 800 leads.
- QA sampling: every 20 leads, verify website + category match + reviews present.

B) Google Maps query pack (75 queries)
Run each query in Google Maps. Collect top results with (a) active recent reviews and (b) visible website/phone.

Vertical 1: Dentists
Use query format: “dentist in {metro}” and “dental clinic in {metro}” if results are thin.
Example set (run for each of the 25 metros):
- dentist in New York NY
- dentist in Los Angeles CA
- dentist in Chicago IL
… (repeat for each metro)

Vertical 2: Med spas / aesthetic clinics
Use query format: “med spa in {metro}” and “aesthetic clinic in {metro}”.
- med spa in New York NY
- med spa in Los Angeles CA
- med spa in Chicago IL
… (repeat)

Vertical 3: HVAC / Plumbers (home services)
Use query format: “HVAC in {metro}” and “plumber in {metro}” (alternate each metro to diversify).
- HVAC in New York NY
- plumber in Los Angeles CA
- HVAC in Chicago IL
… (repeat)

Inclusion rules (to keep quality high)
Include a business if:
1) It has a Google rating + review count visible, AND
2) Review count >= 30 (or if <30, last review within 30 days), AND
3) Has a website OR a clear contact path, AND
4) Not a national chain location page unless it’s a single-location operator.

Exclusion rules
Exclude if:
- No website and no clear contact email route.
- Category mismatch (e.g., “cosmetics store” instead of “med spa”).
- Clearly a directory/listing-only page.

C) CSV/Google Sheets template (headers)
Create a Google Sheet with these columns in Row 1 (copy/paste exactly):
prospect_id,vertical,priority_tier,segment_primary,business_name,city_state,metro,phone,website_url,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,owner_response_in_last_10,response_rate_proxy,contact_name,contact_role_guess,email_1,email_2,source_query,notes

How to fill key fields (manual workflow)
1) From Google Maps listing: capture business_name, phone, website_url, google_maps_url, google_rating, review_count.
2) Click “Reviews”, sort by “Newest” when available:
   - last_review_date = date of most recent review.
   - last_review_excerpt = 8–20 words (quote exactly) OR paraphrase if sensitive.
   - For response proxy: scan last ~10 reviews and count owner responses.
     owner_response_in_last_10 = integer 0–10.
3) Find email:
   - Check website footer/contact page.
   - If none, check “About/Team” or “Request appointment/quote”.
   - If still none, leave email_1 blank and mark notes = “no email found; call/contact form.”

D) Segmentation + priority scoring formulas (Google Sheets)
Assume columns:
- google_rating in column K
- review_count in column L
- last_review_date in column M (as a date)
- owner_response_in_last_10 in column O

1) response_rate_proxy (column P) formula:
=IFERROR(O2/10,0)
Format as percent.

2) segment_primary (column D) rules (use nested IF). Paste into D2:
=IF(K2<4.2,"low_rating",IF(P2<=0.2,"not_responding",IF(OR(L2>=200,TODAY()-M2<=14),"high_volume","baseline")))

3) priority_tier (column C) formula. Paste into C2:
=IF(OR(AND(D2="not_responding",OR(L2>=200,TODAY()-M2<=14)),AND(D2="low_rating",OR(L2>=200,TODAY()-M2<=14))),"A",IF(OR(D2="not_responding",D2="low_rating"),"B",IF(D2="high_volume","C","D")))

Interpretation:
- Priority A: urgent + high impact (lots of reviews or very recent activity) AND poor response/low rating.
- Priority B: clear pain (not responding or low rating) but not huge volume.
- Priority C: strong volume/velocity; pitch “we handle throughput.”
- Priority D: deprioritize.

E) Daily sending ops (Week 1, free offer)
Tooling (free tiers only):
- CRM: HubSpot Free (pipeline stages below)
- Mail sending: one inbox (existing) agent_bob_replit+review-bot@agentmail.to for initial low-volume.
- Tracking: avoid link trackers in Week 1; include the plain website URL.

Daily activity targets (starting point, conservative for deliverability):
- Day 1–2: 20 new cold emails/day + 20 follow-ups/day (if any)
- Day 3–4: 30 new/day
- Day 5–7: 40–50 new/day
- Always keep follow-ups separate and manual if needed.

List hygiene rules:
- Do not send to role accounts that bounce repeatedly (info@, sales@ are ok; but track bounces).
- If bounce rate > 5% in a day, stop new sends and fix list quality.

Reply-handling SLA:
- Respond to all replies within 4 business hours.
- If someone asks “is this legit?” send: website URL + offer summary + opt-out.

F) CRM pipeline stages (HubSpot free)
Stages (exact):
1 Prospect (has email)
2 Sent – Initial
3 Sent – Follow-up 1
4 Sent – Follow-up 2
5 Replied
6 Qualified (has GBP/Yelp + decision maker identified)
7 Demo Booked
8 Trial – Free (7 days)
9 Converted – Paid (post Week 1)
10 Lost (Not now / No fit / No response)

Entry/exit criteria:
- Move to Replied once any response is received (positive or negative).
- Move to Qualified only if they confirm they manage Google Business Profile/Yelp access or can introduce who does.

G) Reply macros (copy/paste)
1) “Yes interested — what is this?”
Subject: Re: review responses
Thanks — we’re a small team running an AI-assisted review reply + reputation workflow for local businesses. We draft brand-safe responses to Google/Yelp reviews, flag negatives for escalation, and send weekly KPI summaries.
You can see the overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
If you share your Google Business Profile link, I can send 3 sample replies to your most recent reviews today. If it looks good, we can run it free for 7 days.
— Bob
agent_bob_replit+review-bot@agentmail.to

2) “Do you post automatically?”
We can operate either way: (1) draft-only with your approval, or (2) post-on-your-behalf once access is granted. Week 1 is free; we’ll start with draft-only if you prefer.
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

3) Opt-out
No problem — I won’t reach out again. If you ever want help catching up on review replies, you can reach me at agent_bob_replit+review-bot@agentmail.to.

H) What the VA/human should deliver back after list build
Export a CSV of 500–1,000 rows with:
- At minimum: business_name, vertical, city_state/metro, website_url, google_maps_url, google_rating, review_count, last_review_date, owner_response_in_last_10, last_review_excerpt, email_1.
Then we’ll (a) QA 5–10% sample, (b) confirm segmentation accuracy, and (c) start daily sends by Priority A then B.
