# Outbound Pipeline Kit (Runbook): Lead List Build (500–1,000) + Segmentation/Priority + Cold Email Sequences + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:13:35.900Z

---

BUSINESS
Product: AI Review Reply & Reputation Autopilot (Google/Yelp)
Website (use in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
Contact email (use in outreach): agent_bob_replit+review-bot@agentmail.to

GOAL (30-day outbound machine)
Build a targeted lead list (500–1,000) and run daily cold email to book demos/trials with local businesses + agencies. Target: businesses with high review velocity and low/no owner responses (direct revenue impact).

A) GEOGRAPHY (LOCKED RECOMMENDATION)
Start with Top 20 US metros to maximize review volume and operational consistency:
NYC, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC.
Reason: enough density for each vertical to generate 500–1,000 prospects quickly without widening to low-signal rural areas.

B) VERTICALS
1) Dentists (high LTV, steady review flow)
2) Med spas / aesthetic clinics (high ticket, reputation-sensitive)
3) HVAC + Plumbing (local intent, competitive, review velocity)
Plus parallel lane: Marketing agencies that serve these verticals (reseller)

C) LEAD LIST CSV TEMPLATE (COPY/PASTE HEADERS)
Columns:
prospect_id,business_name,vertical,subtype,city,state,metro,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_reviews_owner_responses,response_rate_proxy,segment,priority,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

Data dictionary (what each column means):
- prospect_id: unique ID you assign (e.g., DENT-NYC-0001)
- vertical: dentist | med_spa | hvac_plumbing | agency
- subtype: e.g., “cosmetic dentist”, “aesthetic clinic”, “plumber”, “HVAC contractor”
- metro: one of the Top 20 metros above
- google_rating/review_count: from Google Business Profile panel
- last_review_date: date of most recent Google review (or Yelp if that’s where you found them)
- last_10_reviews_owner_responses: integer 0–10 (count of owner responses visible in the last 10 reviews)
- response_rate_proxy: =last_10_reviews_owner_responses/10 (0.0–1.0)
- personalization_snippet: 1 sentence excerpt OR paraphrase from the most recent review (keep it respectful; no sensitive info)
- role_guess: owner | practice manager | office manager | marketing manager | GM
- email_1/email_2: best available contact emails (from website contact/about/team pages)

Segmentation rules (apply after collecting review data):
- Not Responding: response_rate_proxy <= 0.2 (0–2 replies out of last 10)
- Low Rating: google_rating < 4.2
- High Volume: review_count >= 200 OR last_review_date within last 14 days

Segment assignment (single label for routing; pick the strongest):
1) If Low Rating AND High Volume → segment=low_rating
2) Else if Not Responding AND High Volume → segment=not_responding
3) Else if Low Rating → segment=low_rating
4) Else if Not Responding → segment=not_responding
5) Else if High Volume → segment=high_volume
6) Else segment=baseline

Priority scoring (A/B/C):
- Priority A: (segment=not_responding AND High Volume true) OR (segment=low_rating AND High Volume true)
- Priority B: segment=not_responding OR segment=low_rating
- Priority C: segment=high_volume only

D) GOOGLE MAPS QUERY PACK (EXACT SEARCH STRINGS)
Use each metro and paste these into Google Maps search. Open each result, capture rating/reviews/last review date, then click reviews to count owner responses in the last 10.

Dentists:
- “dentist + {metro}”
- “cosmetic dentist + {metro}”
- “family dentistry + {metro}”
- “dental implants + {metro}”

Med spas:
- “med spa + {metro}”
- “aesthetic clinic + {metro}”
- “botox + {metro}”
- “laser hair removal + {metro}”

HVAC/Plumbing:
- “HVAC contractor + {metro}”
- “air conditioning repair + {metro}”
- “plumber + {metro}”
- “drain cleaning + {metro}”

Agency/reseller lane:
- “digital marketing agency + {metro} dental”
- “marketing agency + {metro} med spa”
- “seo agency + {metro} hvac”
- “reputation management agency + {metro}”

Exclusion/QA guidance while collecting:
- Skip national directories (Yelp listing pages, Healthgrades, Zocdoc) as “website”
- Avoid obvious franchises unless you want multi-location deals
- Prefer businesses with a real website and visible contact page

E) EMAIL ENRICHMENT (ZERO-COST)
For each business:
1) Website → Contact/About/Team pages: capture practice manager/office manager/owner email when available.
2) If only a form exists, use the best general email (info@ / hello@) and note “form-only” in notes.
3) Optional free lookups: Google “\"@domain.com\" + (manager OR marketing OR owner)” to surface staff emails.

F) COLD EMAIL COPY (3-STEP SEQUENCE)
Rules:
- Personalize with: {{business_name}}, {{recent_review_snippet}}, {{response_gap}}, {{metro}}
- Keep snippet short and non-sensitive; paraphrase if needed.
- Mention legitimacy assets (website + contact email) in signature line.

1) LOCAL BUSINESS — INITIAL (Not Responding angle)
Subject options:
A) Quick question about review replies at {{business_name}}
B) Noticed something on your Google reviews
C) Can I help with responses for {{business_name}}?

Body:
Hi {{first_name_or_team}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}.”

It also looks like many reviews aren’t getting an owner response yet ({{response_gap}}). That’s common—just hard to keep up.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, escalates negatives fast, and sends a weekly KPI summary. You can approve replies before anything posts.

If I send 2–3 sample replies for your latest reviews, would you like to see them?

— Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

2) FOLLOW-UP #1 (Low Rating / Reputation recovery angle)
Subject options:
A) Quick win for your rating
B) About your recent reviews
C) Response playbook for {{business_name}}

Body:
Hi {{first_name_or_team}},

Following up—when a business has a few tough reviews, timely responses can stop the bleeding and sometimes win customers back.

We can:
- Draft replies within 12 hours (Google + Yelp)
- Flag 1–2 star reviews for escalation
- Keep tone compliant/brand-safe (no admissions, no HIPAA issues, no arguing)
- Share weekly KPIs (rating trend, response rate, volume)

Want me to mock up replies for the last 3 reviews at {{business_name}} so you can compare vs. what’s there today?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

3) FOLLOW-UP #2 (High volume / Ops angle + simple CTA)
Subject options:
A) Should I close the loop?
B) Worth a 10-min look?
C) I can take review replies off your plate

Body:
Hi {{first_name_or_team}},

If review volume is steady at {{business_name}}, the simplest system is:
1) New review comes in
2) Draft response created immediately
3) You approve (or auto-approve safe positives)
4) Weekly KPI email

Is the right person for this you, or someone like a practice/office manager?
If it’s you: can we do a quick 10-minute call this week?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

G) AGENCY/RESELLER VERSION (INITIAL)
Subject: White-label review response automation for your clients?

Hi {{first_name}},

I’m reaching out because you work with local businesses ({{vertical_focus}}). Many of them struggle to respond to Google/Yelp reviews consistently.

We built an AI Review Reply & Reputation Autopilot: brand-safe draft replies, negative-review escalation, and weekly reputation KPIs. Agencies can run it as a done-for-you add-on (you keep margin).

If you want, I can share a simple white-label workflow + pricing options.

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-8l0kit1p.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

H) DAILY SENDING OPS (14-DAY RAMP)
Day 1–3: 20 new emails/day (Priority A only). Verify bounces, adjust copy.
Day 4–7: 35 new/day + follow-up #1 to Day 1–3 non-replies.
Day 8–10: 50 new/day + follow-up #2 to earlier cohort.
Day 11–14: 75–100 new/day if bounce rate <3% and spam complaints ~0.

Hygiene thresholds:
- Bounce rate >3%: stop sending, fix list quality.
- Spam complaints: stop and revise targeting/copy.
- Always include a simple opt-out line if required by your compliance standard.

I) CRM STAGES (SIMPLE)
Prospect → Sent → Replied → Qualified → Demo Booked → Trial/Onboarding → Paid → Lost
Entry/exit rules:
- Sent: first email delivered
- Qualified: confirmed decision maker + acknowledges review-response pain
- Demo Booked: meeting on calendar
- Trial/Onboarding: access granted / review sources connected

J) 48-HOUR EXECUTION SPRINT (HOW TO START)
1) Pick 5 metros from the Top 20 list.
2) Pull 15 dentists + 15 med spas + 15 HVAC/plumbing per metro (225 leads).
3) Fill rating/reviews/last review date + owner responses (last 10).
4) Segment + prioritize (A/B/C).
5) Start sending to Priority A first with Not Responding or Low Rating email.

If you want me to tailor the query pack to 5 specific states instead of Top 20 metros, tell me which states and I’ll regenerate the exact query list and production targets.