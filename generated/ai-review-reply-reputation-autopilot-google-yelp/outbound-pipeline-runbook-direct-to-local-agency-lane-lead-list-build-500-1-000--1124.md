# Outbound Pipeline Runbook (Direct-to-Local + Agency Lane): Lead List Build (500–1,000), Segmentation, Cold Emails (3-step), and Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:46:39.091Z

---

Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Legitimacy links to use in outreach:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) TARGETING (START HERE)
Recommended geo for first 500–1,000: Top US metros (consistent review volume + enough businesses per category).
Top 25 metros list: New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

Verticals:
1) Dentists (high LTV, frequent reviews)
2) Med spas / aesthetics (high margin, reputation sensitive)
3) HVAC + Plumbers (urgent demand, high review velocity)

B) GOOGLE MAPS QUERY PACK (COPY/PASTE)
Use format: "<query> in <city, state>" then filter/verify category.
Dentists queries:
- "dentist" in {metro}
- "cosmetic dentist" in {metro}
- "dental implants" in {metro}
Med spa queries:
- "med spa" in {metro}
- "aesthetic clinic" in {metro}
- "botox" in {metro}
Home services queries:
- "hvac" in {metro}
- "air conditioning repair" in {metro}
- "plumber" in {metro}

Rules to avoid junk:
- Skip franchises where corporate controls reviews (unless local owner email is clear)
- Skip businesses with no website and no email contact path
- Prefer independent local operators with 30+ reviews (or clear growth)

C) LEAD LIST CSV (HEADERS)
Use these exact columns:
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_reviews_owner_replies,segment,priority,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

How to collect key fields fast (manual/zero-cost):
- google_rating + review_count: visible in Maps panel
- last_review_date + personalization_snippet: open Reviews → sort “Newest” → capture date + 8–20 word excerpt (or paraphrase)
- response proxy: open the newest 10 reviews; count how many have an “Owner response” → last_10_reviews_owner_replies; response_rate_proxy = replies/10
- emails: website footer/contact page, Google “Website” button, Facebook page, LinkedIn, or staff directory

D) SEGMENTATION + PRIORITY RULES (PUT INTO SHEETS)
Segments:
- not_responding: response_rate_proxy <= 0.2 OR last_10_reviews_owner_replies <= 2
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR (TODAY()-last_review_date)<=14
Priority scoring:
Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
Priority B: not_responding OR low_rating
Priority C: high_volume only

Suggested Sheets formulas (assuming columns):
- response_rate_proxy: =IFERROR([@[last_10_reviews_owner_replies]]/10,"")
- segment:
=TEXTJOIN(";",TRUE,
IF([@[response_rate_proxy]]<>"",IF([@[response_rate_proxy]]<=0.2,"not_responding",""),""),
IF([@[google_rating]]<>"",IF([@[google_rating]]<4.2,"low_rating",""),""),
IF([@[review_count]]<>"",IF([@[review_count]]>=200,"high_volume",IF(TODAY()-[@[last_review_date]]<=14,"high_volume","")),"")
)
- priority:
=IF(OR(AND(ISNUMBER(SEARCH("not_responding",[@segment])),ISNUMBER(SEARCH("high_volume",[@segment]))),AND(ISNUMBER(SEARCH("low_rating",[@segment])),ISNUMBER(SEARCH("high_volume",[@segment])))),"A",
IF(OR(ISNUMBER(SEARCH("not_responding",[@segment])),ISNUMBER(SEARCH("low_rating",[@segment]))),"B",
IF(ISNUMBER(SEARCH("high_volume",[@segment])),"C","")))

E) COLD EMAILS (3-STEP) — DIRECT TO LOCAL BUSINESSES
Personalization tokens you must fill:
{{business_name}}, {{city}}, {{recent_review_snippet}}, {{last_review_date}}, {{response_gap_fact}}, {{vertical}}
Response gap fact examples:
- “I didn’t see owner replies on most of the newest reviews.”
- “Looks like only ~1–2 of the last 10 reviews have a reply.”

1) INITIAL EMAIL (use one of these subject lines)
Subject options:
- Quick help with your Google reviews ({{business_name}})
- Noticed a review response gap for {{business_name}}
- Can I draft replies for you (you approve)?

Body:
Hi {{first_name}} — I’m Bob.

I was looking at {{business_name}}’s Google reviews in {{city}} and noticed: “{{recent_review_snippet}}” ({{last_review_date}}).

{{response_gap_fact}}. For local businesses, fast, brand-safe responses tend to lift conversion (people read the replies).

We built an AI Review Reply & Reputation Autopilot that:
- Drafts brand-safe responses to Google + Yelp reviews
- Escalates negative reviews so you can intervene fast
- Sends a weekly KPI summary (rating trend, response rate, review velocity)
- Optional: you approve replies before posting

You can see what we are here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a 10-minute chat to see if we can cover your reviews within 12 hours?
— Bob
agent_bob_replit+review-bot@agentmail.to

2) FOLLOW-UP #1 (2–3 business days later)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

If I draft 3 example replies for your most recent reviews (free), would you want to see them?

No commitment — just to show tone/brand-fit. If useful, we can set up auto-drafting + weekly reporting.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

3) FOLLOW-UP #2 (5–7 business days later)
Subject: Should I close the loop?

Hi {{first_name}} — last note.

Most owners tell me they either:
A) want “drafts only / approval required” (safest), or
B) want “autopost standard positives + escalate negatives.”

Which would you prefer for {{business_name}}?

— Bob
agent_bob_replit+review-bot@agentmail.to

F) AGENCY / RESELLER LANE (INITIAL EMAIL)
Target: local marketing agencies (SEO/PPC/web) that serve dentists, med spas, HVAC/plumbing.
Subject options:
- Add-on your clients will pay for: review response autopilot
- White-label review replies for your local clients

Body:
Hi {{first_name}} — Bob here.

If you manage local clients (dentists/med spas/home services), review response is one of the most visible “daily ops” gaps.

We built an AI Review Reply & Reputation Autopilot (Google/Yelp): drafts brand-safe replies, escalates negatives, weekly KPI reporting. You can sell it as an add-on or bundle it into your retainer.

Quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 15-min chat? If it’s a fit, we’ll set you up with a simple workflow + margin.
— Bob
agent_bob_replit+review-bot@agentmail.to

G) DAILY SENDING OPS (14-DAY RAMP, 1 INBOX)
Goals: protect deliverability, keep replies high, iterate fast.
Day 1–2: 15–20 emails/day (Priority A only)
Day 3–4: 25/day
Day 5–7: 35/day
Week 2: 50/day (split 70% Priority A/B direct, 30% agencies)

List hygiene + QA (daily):
- QA 10% sample: verify category, website works, email not generic catchall-only when possible
- Remove role accounts that bounce (info@ can work, but track)
- Keep bounce rate < 3%. If >3%, pause and fix list.
- Keep spam complaints ~0. If any complaint, tighten targeting + reduce volume.

Reply handling SLA:
- Respond to any positive reply within 1 business hour.
- For “not interested”: ask one question (timing / who handles reviews) then stop.

H) CRM PIPELINE (SIMPLE)
Stages:
1) Prospects (new rows)
2) Sent
3) Replied
4) Qualified (pain confirmed: review volume + response gap)
5) Demo booked
6) Trial / Pilot (draft 3 sample replies or 7-day coverage)
7) Paid
8) Lost (no fit, wrong contact, franchise, etc.)

KPIs to track weekly:
- Delivery rate, bounce rate
- Open rate (directional), reply rate
- Qualified rate (replies that confirm need)
- Demos booked
- Trials started
- Paid conversions

I) WHAT YOU NEED TO DECIDE (TO START LIST BUILD TODAY)
Pick one:
- Option 1 (recommended): Top 25 metros (list above)
- Option 2: Provide 5–10 states to focus
Once decided, build first 200 leads (about 1–2 days of focused work or a VA), QA, then scale to 500–1,000.

End of runbook.