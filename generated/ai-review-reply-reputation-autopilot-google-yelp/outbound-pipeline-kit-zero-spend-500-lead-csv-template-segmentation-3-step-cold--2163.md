# Outbound Pipeline Kit (Zero-Spend): 500-Lead CSV Template + Segmentation + 3-Step Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:59:50.094Z

---

Below is a ready-to-run outbound kit to build and send to 500–1,000 local business prospects (dentists, med spas/aesthetic clinics, HVAC/plumbing) plus an agency lane. It is designed for Week 1 ($0 spend): manual lead collection from Google Maps + manual sending.

1) TARGETING: INITIAL GEOGRAPHY (Top 25 US Metros)
Use these metros to keep review velocity high and categories consistent:
New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

2) GOOGLE MAPS QUERY PACK (copy/paste into Google Maps)
Dentists:
- “dentist + {metro}”
- “cosmetic dentist + {metro}”
- “family dentistry + {metro}”
Med spas:
- “med spa + {metro}”
- “aesthetic clinic + {metro}”
- “botox + {metro}”
HVAC/Plumbing:
- “HVAC + {metro}”
- “air conditioning repair + {metro}”
- “plumber + {metro}”
Agency lane:
- “dental marketing agency + {metro}”
- “med spa marketing agency + {metro}”
- “home services marketing agency + {metro}”

3) CSV / GOOGLE SHEETS TEMPLATE (500 rows)
Create a Google Sheet with these columns (row 1 headers exactly):
prospect_id,vertical,priority_tier,segment,company_name,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes,personalization_hook,template_variant,send_status,first_sent_date,last_touch_date,next_touch_date

4) HOW TO FILL KEY FIELDS (manual workflow)
A) Find lead in Google Maps, open their Google Business Profile.
B) Capture:
- google_rating (e.g., 4.1)
- review_count (e.g., 287)
- last_review_date (most recent review)
- last_review_snippet (copy 10–25 words; if it includes sensitive info, paraphrase)
- website + phone
- google_maps_url (share link)
C) Response-rate proxy (last 10 reviews):
- Count owner responses in the last 10 reviews. If 2/10 responded → 0.2
- Enter as a decimal (0 to 1): response_rate_proxy_last10

5) SEGMENTATION RULES (paste into your sheet as formulas)
A) Segment (choose ONE):
- not_responding: response_rate_proxy_last10 <= 0.2 OR 0 responses in last 10
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within last 14 days

If multiple apply, set segment to the most urgent in this order:
low_rating > not_responding > high_volume

B) Priority tier:
Priority A:
- (segment = not_responding AND review_count >= 200) OR (segment = low_rating AND review_count >= 100)
Priority B:
- segment = not_responding OR segment = low_rating
Priority C:
- segment = high_volume only

C) Template variant routing:
- segment=not_responding → use “NR” email variant
- segment=low_rating → use “LR” email variant
- segment=high_volume → use “HV” email variant

6) COLD EMAIL COPY (3-step sequence) — include legitimacy links
Use tokens:
{{company_name}}, {{metro}}, {{recent_review_snippet}}, {{response_gap}}, {{vertical_word}}
Suggested response_gap phrasing:
- Not responding: “I noticed a few recent reviews don’t have an owner reply yet.”
- Low rating: “I noticed the rating is sitting around {{google_rating}} and a couple recent reviews look unresolved.”
- High volume: “You’re getting a lot of reviews consistently—replying quickly is hard to keep up with.”

FROM/FOOTER (use in every email):
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

6.1) INITIAL EMAIL — NOT RESPONDING (NR)
Subject options:
1) Quick note about your Google reviews
2) Owner replies missing on a few reviews
3) {{company_name}} — review responses

Body:
Hi {{first_name}},

I was looking at {{company_name}}’s Google reviews and noticed a few recent ones don’t have an owner reply yet (ex: “{{recent_review_snippet}}”). {{response_gap}}

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negatives, and keeps replies consistent. You can approve everything (or we run in “auto-approve” for positives).

Offer (free this week): we’ll draft replies to your next 10 reviews and get your response time to <12 hours.

Worth a quick look? If you reply “yes”, I’ll send 2 sample responses in your tone.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6.2) INITIAL EMAIL — LOW RATING (LR)
Subject options:
1) Idea to lift {{company_name}}’s rating
2) Quick win on review replies
3) Helping with negative reviews (no extra staff)

Body:
Hi {{first_name}},

Saw {{company_name}} on Google and noticed the rating is around {{google_rating}} with some recent feedback like: “{{recent_review_snippet}}”.

One fast lever is replying quickly + consistently (and escalating negatives to a human before they spiral). Our Reputation Autopilot drafts brand-safe replies for Google/Yelp and flags anything sensitive so you can handle it personally.

Free this week: we’ll draft responses to your next 10 reviews + give you a weekly KPI snapshot (rating trend, response rate, response time).

Open to me sending 2 example replies to that review (one public + one private-style follow-up message)?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6.3) INITIAL EMAIL — HIGH VOLUME (HV)
Subject options:
1) Keeping up with review replies at {{company_name}}
2) 12-hour review response SLA
3) Scale review replies without extra staff

Body:
Hi {{first_name}},

{{company_name}} gets a steady flow of reviews (nice work). The hard part is keeping reply time consistent when things get busy.

We built an AI Review Reply & Reputation Autopilot for Google/Yelp: it drafts on-brand responses, escalates negatives, and sends a weekly KPI report. You can approve before posting, or we can auto-post positives only.

Free this week: we’ll respond-ready draft your next 10 reviews and set you up with a simple “approve/deny” workflow.

Should I send a 60-second overview + 2 sample replies in your style?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6.4) FOLLOW-UP 1 (Day 2–3)
Subject: Re: {{company_name}} reviews

Hi {{first_name}},

Quick bump—want me to send 2 sample replies based on your recent review “{{recent_review_snippet}}”? 

If it’s not you, who handles Google/Yelp review responses at {{company_name}}?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6.5) FOLLOW-UP 2 (Day 6–7) — “breakup”
Subject: Should I close the loop?

Hi {{first_name}},

Last note from me. If review replies aren’t a priority right now, no worries.

If you want, I can still send a quick 3-bullet audit:
- response rate on last 10 reviews
- estimated missed replies
- a suggested reply template in your tone

Reply “audit” and I’ll send it over.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

7) AGENCY / RESELLER VERSION (initial)
Subject options:
1) White-label review replies for your clients
2) Add-on offer for {{vertical_word}} clients
3) Quick partner idea (review response SLA)

Body:
Hi {{first_name}},

If you work with {{vertical_word}} clients: we built an AI Review Reply & Reputation Autopilot that drafts brand-safe Google/Yelp responses, escalates negatives, and reports weekly KPIs.

It’s an easy add-on: you keep client ownership, we provide the reply workflow + reporting. Free this week: we’ll run it for 1 client for 7 days and hand you the weekly KPI report.

Want me to send the partner workflow + example KPI report?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

8) DAILY SENDING OPS (WEEK 1, NO SPEND)
Tooling: 1 inbox (AgentMail) + Google Sheets pipeline tracker.
- Day 1: 10 emails (Priority A only)
- Day 2: 15 emails + follow-ups to Day 1 non-replies
- Day 3: 20 emails + FU1
- Day 4: 25 emails + FU1
- Day 5: 30 emails + FU1
- Day 6: 35 emails + FU2
- Day 7: 40 emails + FU2
Rules:
- Stop if bounce rate > 5% in a day; fix list quality.
- Reply SLA: within 2 hours during business day.
- Every positive reply gets: (a) 2 sample replies + (b) offer to run free 7-day trial.

9) LIGHTWEIGHT CRM STAGES (Google Sheet dropdown)
Prospect → Sent → Replied → Qualified → Demo Booked → Trial Started (Free) → Active Trial → Paid (post-week-1) → Lost
Entry criteria:
- Qualified = they confirm they manage reviews + agree to see samples
- Trial Started = they provide GBP/Yelp access or paste reviews for drafting

This kit is enough to start tomorrow: build 25 Priority A leads/day from Google Maps, send within the ramp limits, and log every touch in the sheet. Once replies come in, use the free-week offer to convert into trials immediately.