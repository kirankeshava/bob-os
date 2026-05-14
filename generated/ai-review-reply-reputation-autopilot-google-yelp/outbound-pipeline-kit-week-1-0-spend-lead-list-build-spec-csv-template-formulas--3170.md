# Outbound Pipeline Kit (Week 1 $0 Spend): Lead List Build Spec + CSV Template/Formulas + 3-Step Cold Email Sequences + Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:36:09.263Z

---

## 1) ICP + Vertical Focus (Week 1)
Target local businesses with (a) high review velocity, (b) clear revenue impact from trust, and (c) owners who ignore reviews.
Primary verticals:
- Dentists (incl. cosmetic, implant, family)
- Med spas / aesthetic clinics
- HVAC + plumbing (home services)
Secondary lane:
- Local marketing agencies that serve these verticals (resell/white-label)

## 2) Geography + Query Pack (Zero-cost, Google Maps)
Use Top US metros to keep results dense and relevant: New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Nashville, Oklahoma City, El Paso, Boston, Portland.

Google Maps search queries (run each metro):
Dentists
- "dentist" + {metro}
- "cosmetic dentist" + {metro}
- "dental implants" + {metro}
- "family dentistry" + {metro}
Med spas
- "med spa" + {metro}
- "aesthetic clinic" + {metro}
- "botox" + {metro}
- "laser hair removal" + {metro}
HVAC/Plumbing
- "HVAC" + {metro}
- "air conditioning repair" + {metro}
- "plumber" + {metro}
- "water heater repair" + {metro}
Agency lane
- "marketing agency" + {metro} + (dentist OR med spa OR HVAC)
- "SEO agency" + {metro} + (dentist OR med spa OR plumber)

Production target (manual, $0 tools):
- 25 leads/hour per researcher after first hour.
- 2 hours/day = ~50/day. 10 days = 500 leads.

## 3) Lead CSV Template (Headers)
Copy these headers into Google Sheets, then export CSV.

business_name,vertical,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,owner_response_in_last_10,response_rate_proxy,segment,priority,contact_name,role_guess,email_1,email_2,notes

How to fill quickly (no paid enrichment):
- website: from Google Business Profile
- emails: website contact page + footer + privacy policy + about page; if none, leave blank and use contact form later
- last_review_excerpt: 10–25 words (or paraphrase if safer)
- owner_response_in_last_10: count owner replies in most recent 10 reviews (0–10)

## 4) Segmentation Rules + Priority Scoring (Google Sheets formulas)
Assume columns:
- google_rating in G
- review_count in H
- last_review_date in I (date)
- owner_response_in_last_10 in K

Response rate proxy:
- response_rate_proxy = K/10

Segments (can be multiple; choose primary using order below):
1) Not Responding: response_rate_proxy <= 0.2 OR owner_response_in_last_10 = 0
2) Low Rating: google_rating < 4.2
3) High Volume: review_count >= 200 OR (TODAY()-last_review_date) <= 14

Primary segment logic (Sheets example):
=IF(OR($K2=0,($K2/10)<=0.2),"not_responding",IF($G2<4.2,"low_rating",IF(OR($H2>=200,(TODAY()-$I2)<=14),"high_volume","other")))

Priority scoring:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

Priority formula (based on primary segment + flags):
=IF(OR(AND($L2="not_responding",OR($H2>=200,(TODAY()-$I2)<=14)),AND($L2="low_rating",OR($H2>=200,(TODAY()-$I2)<=14))),"A",IF(OR($L2="not_responding",$L2="low_rating"),"B",IF($L2="high_volume","C","D")))

## 5) Cold Email Sequences (3-step) — Include legitimacy links
Use from: agent_bob_replit+review-bot@agentmail.to
Legitimacy URL to include in footer or P.S.: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 5A) Local Business — Not Responding (general, then tweak by vertical)
Subject options:
1) Quick fix for your Google reviews
2) {{business_name}}: replies are missing (easy win)
3) 12-hour review replies (you approve)

Email 1:
Hi {{contact_name_or_owner}},

I was looking at {{business_name}} on Google and noticed a few recent reviews like: “{{last_review_excerpt}}” — but there aren’t owner replies on many of the latest posts.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses (Google + Yelp) and escalates anything negative. You can approve everything before it posts.

Offer (free this week): we’ll respond to your next 10 reviews within 12 hours and send a weekly KPI snapshot (rating trend, response rate, negative-review alerts).

Worth a 10-min call to set the tone/voice and connect your profiles?

— Bob
agent_bob_replit+review-bot@agentmail.to
P.S. What it is / legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Follow-up 1 (2–3 days later):
Subject: Re: {{business_name}} reviews
Hi {{name}}, quick nudge — do you want us to start by replying to only 5 reviews so you can see the tone/quality? No cost this week.

If yes, reply with “5” and the name of whoever should approve responses.

— Bob

Follow-up 2 (4–6 days later):
Subject: Close the loop?
Hi {{name}}, should I close this out or is review replies something you want handled?

If you send a Google Maps link, we’ll draft 3 sample replies for recent reviews and you can judge if it matches your brand.

— Bob

Vertical tweak lines:
- Dentist: “new patient trust” / “chair time is valuable; we handle the reputation hygiene.”
- Med spa: “high-intent leads compare ratings heavily; fast replies convert.”
- HVAC/Plumbing: “urgent buyers scan responsiveness; replies reduce price-shopping.”

### 5B) Local Business — Low Rating angle
Subject options:
1) Raising {{business_name}} above 4.2
2) Quick reputation triage
3) Prevent 1-star surprises

Email 1:
Hi {{name}},

I saw {{business_name}} is at {{google_rating}} on Google. That’s fixable, but usually the fastest lever is (1) fast, calm public replies to negatives + (2) an escalation workflow so issues get handled offline.

We run an AI-assisted review reply system (Google + Yelp): brand-safe drafts, negative-review escalation, and weekly KPIs. You approve before anything posts.

Free this week: we’ll set up the workflow and draft replies for your last 5 negative reviews (you choose whether to post).

Want me to send 2–3 sample replies first?

— Bob
agent_bob_replit+review-bot@agentmail.to
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Follow-up 1:
If you tell me which response style you prefer (formal / friendly / short), I’ll tailor the samples.

Follow-up 2:
Should I close the loop, or is someone else the right person for reputation/reviews?

### 5C) Local Business — High Volume angle
Subject options:
1) Keeping up with review volume
2) {{business_name}}: review ops in 12 hours
3) Weekly reputation KPIs

Email 1:
Hi {{name}},

You’re getting a steady stream of reviews ({{review_count}} total). Most teams fall behind because replying consistently is tedious.

We draft and post brand-safe review responses (Google + Yelp), escalate negatives, and send weekly reputation KPIs. Everything can be approval-based.

Free this week: we’ll handle replies for 7 days and send a before/after report (response rate + sentiment flags).

Open to a quick setup call?

— Bob
agent_bob_replit+review-bot@agentmail.to
Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4n6u

## 6) Agency/Reseller Version (initial email)
Subject options:
1) White-label review replies for your clients
2) Add-on offer for dentists/med spas/home services
3) Reputation ops you can resell

Hi {{name}},

If you manage local SEO/GBP for clients, review replies are one of the easiest retention levers — but it’s annoying to deliver consistently.

We built an AI Review Reply & Reputation Autopilot (Google + Yelp): brand-safe drafts, negative escalation, weekly KPI reporting. Approval-based, and we can white-label.

Free this week: we’ll run it for 1 client for 7 days so you can evaluate quality + workflow.

Want to pilot it on a dentist/med spa/HVAC account you already manage?

— Bob
agent_bob_replit+review-bot@agentmail.to
More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 7) Daily Sending Ops (Week 1, conservative deliverability)
Day 1–2: 20 new emails/day (no links in body except PS legitimacy link), verify formatting, watch bounces.
Day 3–4: 30/day
Day 5–7: 50/day
Rules:
- Bounce rate > 5%: stop new sends, fix list quality.
- Any spam/complaint signals: reduce volume and simplify copy.
- Reply SLA: < 2 hours during business day.
- Personalization: use last_review_excerpt + response gap (or rating) in first 2 lines.

## 8) CRM Pipeline (Google Sheet works)
Stages:
1) Prospects (not contacted)
2) Sent (E1)
3) Follow-up 1 sent
4) Follow-up 2 sent
5) Replied
6) Qualified (has GBP/Yelp access path + agrees to trial)
7) Trial active (7 days free)
8) Converted (paid after week 1 ends)
9) Lost (reason)

Track per lead: last touch date, next follow-up date, segment, priority, reply status, meeting link, objections.

## 9) What to do next (execution)
1) Build first 200 leads using the query pack + template; prioritize A then B segments.
2) Send E1 to 20–30/day following the ramp.
3) Book 10-min calls; offer “we draft 3 sample replies first” as the lowest-friction CTA.
4) Add agency lane: 10 agency emails/day in parallel (higher leverage).