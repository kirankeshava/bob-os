# Outbound Pipeline Kit (Ready-to-Run): Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:33:10.868Z

---

## 1) Targeting: verticals + geography
**Primary verticals (high review velocity + LTV):**
1) Dentists (incl. cosmetic dentistry, orthodontists)
2) Med Spas / Aesthetic clinics
3) HVAC + Plumbers (home services)

**Recommended geography for first 500–1,000 leads:** Top 25 US metros. Rationale: dense prospects, high review volume, easier category consistency.

Top metros list (use as "city" tokens): New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; El Paso TX; Detroit MI; Oklahoma City OK.

## 2) Lead list CSV template (copy/paste headers)
Paste these as row 1 in Google Sheets or a CSV file:

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_reviews_responses,response_rate_proxy,segment,priority_tier,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

### Data dictionary (what to collect)
- **google_rating**: star rating shown on Google Business Profile (GBP)
- **review_count**: total number of Google reviews
- **last_review_date**: date of most recent review
- **last_10_reviews_responses**: count of owner/manager replies among the last 10 reviews (0–10)
- **response_rate_proxy**: last_10_reviews_responses/10
- **personalization_snippet**: 6–20 words from a recent review OR a paraphrase (safer)
- **owner_or_manager_name / role_guess / emails**: best available from website (contact page), Google “Website”, LinkedIn, or public footer

## 3) Segmentation + priority scoring rules (Google Sheets formulas)
Assume these columns:
- google_rating in H
- review_count in I
- last_review_date in J
- last_10_reviews_responses in K
- response_rate_proxy in L

### 3.1 Response rate proxy
In L2:
=IF(K2="","",K2/10)

### 3.2 Segment (Not Responding / Low Rating / High Volume)
Definitions:
- **Not Responding**: response_rate_proxy <= 0.2 OR K is 0
- **Low Rating**: google_rating < 4.2
- **High Volume**: review_count >= 200 OR last_review_date within 14 days

In M2 (segment):
=TEXTJOIN(";",TRUE,
 IF(OR(L2<=0.2,K2=0),"not_responding",""),
 IF(H2<4.2,"low_rating",""),
 IF(OR(I2>=200,AND(J2<>",",TODAY()-J2<=14)),"high_volume","")
)

### 3.3 Priority tier (A/B/C)
- **Priority A**: (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B**: not_responding OR low_rating
- **Priority C**: high_volume only

In N2 (priority_tier):
=IF(OR(AND(REGEXMATCH(M2,"not_responding"),REGEXMATCH(M2,"high_volume")),AND(REGEXMATCH(M2,"low_rating"),REGEXMATCH(M2,"high_volume"))),"A",
 IF(OR(REGEXMATCH(M2,"not_responding"),REGEXMATCH(M2,"low_rating")),"B",
 IF(REGEXMATCH(M2,"high_volume"),"C","C")))

## 4) Zero-cost lead sourcing SOP (Google Maps manual)
Goal: 500–1,000 rows in 5–10 workdays by one person; faster with VA.

### 4.1 Google Maps query pack (copy/paste searches)
For each metro, run each query below. Open promising listings in new tabs.

**Dentists**
- "cosmetic dentist" + {city}
- "dentist" + {city}
- "orthodontist" + {city}

**Med spas**
- "med spa" + {city}
- "botox" + {city}
- "laser hair removal" + {city}

**HVAC / Plumbing**
- "HVAC" + {city}
- "air conditioning repair" + {city}
- "plumber" + {city}

**Filtering rules (to avoid junk):**
- Prefer businesses with a real website (not only Facebook)
- Avoid multi-location chains/franchises unless location pages have unique managers
- Prefer review_count >= 50 (unless very recent + fast review velocity)

### 4.2 What to capture per lead (fast sequence)
1) Copy business name, phone, website, and Google Maps URL
2) Record rating + review count
3) Click reviews → identify most recent review date
4) For last 10 reviews: count owner responses (0–10)
5) Capture a safe personalization snippet:
   - Safer: paraphrase sentiment: “saw a recent review praising your front desk team”
   - If quoting: keep it short and public; don’t include health info; don’t mention full customer name

### 4.3 Email finding (free-first)
- Website: Contact page, About page, footer (admin@, info@, office@)
- If dentist/med spa: look for “Practice Manager”, “Office Manager”
- If HVAC/plumbing: “Owner”, “General Manager”, “Service Manager”
- Optional free sources: Google Business Profile sometimes has contact email via website; LinkedIn company page.

## 5) Segmented prospecting plan (what to send to who)
### 5.1 Priority A (fastest likely buyers)
- **A1: not_responding + high_volume** → angle: “reviews are coming in fast; we reply within 12 hours; you approve.”
- **A2: low_rating + high_volume** → angle: “triage negative reviews; escalate; consistent tone; weekly KPI report.”

### 5.2 Priority B
- **not_responding only** → angle: missed revenue from unanswered reviews + responsiveness as ranking/consumer trust
- **low_rating only** → angle: stabilize reputation + reduce damage; fast response + escalation workflow

### 5.3 Priority C
- **high_volume only** → angle: operational burden; autopilot replies; brand-safe; weekly reporting

### 5.4 Agency / reseller lane
Target: local marketing agencies, SEO agencies, website agencies servicing dentists/med spas/home services.
Where to find (searches):
- “dental marketing agency”
- “med spa marketing agency”
- “HVAC marketing agency”
- “local SEO agency” + {city}
Offer: white-label or reseller margin; agencies add it as a retention product.

## 6) Cold email sequence (3-step) — references website + contact email
Sender signature (use in all):
— Bob Smith
AI Review Reply & Reputation Autopilot (Google/Yelp)
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 6.1 Template tokens
- {{first_name}} (if unknown, omit)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (short quote or paraphrase)
- {{response_gap}} (e.g., “looks like the last few reviews didn’t get an owner reply”)
- {{vertical_specific_line}} (dentist/med spa/HVAC)

### 6.2 Email 1 (Initial) — Not Responding angle
**Subject options:**
1) Quick fix for unanswered reviews at {{business_name}}
2) Review replies (done within 12 hours)
3) {{business_name}}: quick review-response help

**Body:**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw {{recent_review_snippet}} — but {{response_gap}}.

We run a simple “review reply autopilot” for local businesses: brand-safe draft replies to Google/Yelp, negative-review escalation, and a weekly KPI recap. You can approve responses (or set auto-post rules).

If it’s helpful, I can send 2–3 example replies for your most recent reviews so you can judge tone/quality first.

Worth a quick 10 minutes this week?

— Bob Smith
AI Review Reply & Reputation Autopilot (Google/Yelp)
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 6.3 Email 1b (Initial) — Low Rating angle
**Subject options:**
1) Helping {{business_name}} turn around Google reviews
2) Quick triage process for negative reviews
3) Reputation workflow for {{business_name}}

**Body:**
Hi {{first_name}},

Noticed {{business_name}} has a solid number of reviews, but the rating looks a bit suppressed. I also saw {{recent_review_snippet}}.

We help businesses respond faster and more consistently (Google/Yelp), escalate negative reviews to the right person, and track weekly reputation KPIs. Replies are brand-safe and you can approve before anything posts.

If you want, I can draft responses to your last 2 negative reviews so you can see the approach.

Open to a quick call?

— Bob Smith
(links/signature as above)

### 6.4 Email 2 (Follow-up #1) — send 2 days later
**Subject:** Re: {{business_name}} review replies

Hi {{first_name}},

Quick follow-up — do you have someone on the team who handles Google/Yelp replies?

If you forward me the last 2–3 reviews you want handled (or just point me at the profile), I’ll send draft replies today. If the tone matches your brand, we can set up a lightweight workflow.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 6.5 Email 3 (Follow-up #2) — send 5–7 days later
**Subject:** Close the loop?

Hi {{first_name}},

Should I close the loop on this?

If review replies aren’t a priority right now, no worries. If they are, the offer still stands: I’ll draft a few brand-safe replies based on your recent reviews and you can decide if it’s worth automating.

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nnuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 7) Agency/reseller cold email (initial)
**Subject options:**
1) Add-on offer for your local SEO clients (reviews)
2) White-label review replies for your clients
3) Quick reseller idea: Google/Yelp review response

**Body:**
Hi {{first_name}},

If you work with local businesses ({{vertical}} especially), we built a simple add-on you can bundle: brand-safe Google/Yelp review replies + negative-review escalation + weekly KPI reporting.

Your clients get faster responses and cleaner reputation management; you get a retention lever. We can run it white-label or as a partner.

Want me to send pricing + a 1-page overview? You can also see the product here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

## 8) Daily sending ops checklist + CRM stages
### 8.1 CRM stages (simple)
1) Prospect (in sheet; not contacted)
2) Queued (cleaned + email verified if possible)
3) Sent (Email 1 sent)
4) Follow-up 1 sent
5) Follow-up 2 sent
6) Replied – Interested
7) Replied – Not now
8) Replied – Unsubscribe
9) Qualified (fits ICP; has Google/Yelp; pain confirmed)
10) Demo booked
11) Trial / Pilot
12) Paid
13) Lost (reason)

### 8.2 14-day ramp (per inbox)
- Days 1–2: 10/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Week 2: 40–60/day
Only scale if bounce rate < 3% and spam complaints ~0.

### 8.3 Daily workflow (60–90 minutes)
1) Pull 25–50 new Priority A/B leads into “Queued”
2) Personalize first line with {{recent_review_snippet}} + {{response_gap}}
3) Send Email 1
4) Process replies twice daily (morning/afternoon)
5) Book calls; tag objections; update CRM stage
6) Add follow-ups for Day+2 and Day+5/7

### 8.4 QA + compliance
- Remove role accounts only if you have no alternative (info@ is fine if that’s all available)
- Honor unsubscribe immediately; keep a suppression list
- Keep personalization to publicly available review content; avoid sensitive/medical specifics

## 9) KPI targets (early stage)
- Open rate: 35–60% (lower indicates deliverability/list quality issue)
- Reply rate: 4–10%
- Positive reply rate: 1–3%
- Meetings booked: 0.5–1% of sends

---
If you confirm geography (Top 25 metros vs specific states), this kit can be executed immediately to build the 500–1,000 lead CSV and begin sending the same week.