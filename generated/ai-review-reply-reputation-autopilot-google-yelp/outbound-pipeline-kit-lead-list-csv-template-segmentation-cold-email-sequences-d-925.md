# Outbound Pipeline Kit — Lead List CSV Template + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:10:13.468Z

---

Business website (use in outreach for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Business contact email (use in templates/signatures): agent_bob_replit+review-bot@agentmail.to

==============================
A) GEO + LIST BUILD TARGET (RECOMMENDED)
==============================
Recommended initial scope: Top 25 US metros (high density, high review velocity, predictable categories).
Lead target: 900–1,000 total prospects.
- Dentists: 330
- Med spas / aesthetics: 330
- HVAC + Plumbing: 330
Optional agency lane: 100 agencies (separate tab/list).

Prioritization mix goal (so sending starts with highest intent):
- Priority A (send first): ~40% of list
- Priority B: ~40%
- Priority C: ~20%

Metros (example Top 25): New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

==============================
B) LEAD LIST CSV TEMPLATE (HEADERS)
==============================
Create a CSV/Sheet with exactly these columns (copy/paste header row):
lead_id,business_name,vertical,category_on_maps,city,state,metro,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_author,personalization_snippet,owner_response_in_last_10,owner_responses_last_10,response_rate_proxy,segment_not_responding,segment_low_rating,segment_high_volume,priority_tier,contact_name,contact_role_guess,email_1,email_2,linkedin_url,notes,source,added_date

Data dictionary (quick):
- vertical: Dentist | MedSpa | HVAC/Plumbing
- personalization_snippet: either a short quote (<=160 chars) OR paraphrase from most recent review.
- owner_response_in_last_10: Y/N
- owner_responses_last_10: integer 0–10
- response_rate_proxy: owner_responses_last_10/10

==============================
C) SEGMENTATION + PRIORITY FORMULAS (GOOGLE SHEETS)
==============================
Assume columns map like:
- google_rating in column K
- review_count in column L
- last_review_date in column M
- response_rate_proxy in column S

1) segment_not_responding (T):
=IF(OR($S2<=0.2,$Q2="N"),TRUE,FALSE)

2) segment_low_rating (U):
=IF($K2<4.2,TRUE,FALSE)

3) segment_high_volume (V):
=IF(OR($L2>=200, TODAY()-$M2<=14),TRUE,FALSE)

4) priority_tier (W):
=IF(OR(AND($T2=TRUE,$V2=TRUE),AND($U2=TRUE,$V2=TRUE)),"A",IF(OR($T2=TRUE,$U2=TRUE),"B",IF($V2=TRUE,"C","C")))

Operational interpretation:
- Not Responding: response_rate_proxy <= 20% or no owner replies in last 10 reviews.
- Low Rating: rating < 4.2.
- High Volume: 200+ reviews OR new review in last 14 days.

==============================
D) SAFE PERSONALIZATION RULES (SO YOU DON’T SOUND CREEPY)
==============================
Use ONE of:
1) Paraphrase: “I noticed a recent review mentioned a long wait time / scheduling confusion / billing question.”
2) Short quote <= 160 chars with no sensitive info.
Avoid:
- Mentioning reviewer names.
- Mentioning medical specifics (especially med spas/dentists).
- Mentioning exact star rating in the email subject.

==============================
E) COLD EMAIL — 3-STEP SEQUENCES (DIRECT-TO-LOCAL)
==============================
Use tokens:
{{business_name}}, {{city}}, {{service_type}}, {{personalization_snippet}}, {{response_gap_observation}}, {{sender_name}} (= Bob)

---------------------------------
E1) DENTAL — Not Responding Variant
---------------------------------
Subject options:
1) Quick fix for un-replied reviews at {{business_name}}
2) Noticed a response gap on your Google reviews
3) 12-hour review replies (you approve)

Email 1:
Hi {{first_name_or_team}},

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap_observation}}.

We run a simple “Review Reply & Reputation Autopilot” for dental practices: brand-safe replies drafted within 12 hours, you can approve/edit, and we escalate negative reviews the same day so they don’t sit unanswered.

If helpful, I can send 2–3 draft replies for your most recent reviews so you can see the tone.

Want me to do that for {{business_name}}?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later):
Subject: Re: review replies for {{business_name}}
Hi {{first_name_or_team}},

Still open to me drafting a couple replies for your latest Google reviews?

Even just closing the response gap typically lifts “trust” for new patients who read the newest reviews first.

— Bob

Follow-up 2 (4–6 days later):
Subject: Should I close the loop?
Hi {{first_name_or_team}},

If review responses aren’t a priority right now, no worries—should I check back next month?

If you want, reply “draft” and I’ll send 2 sample responses for {{business_name}}.

— Bob

---------------------------------
E2) DENTAL — Low Rating Variant
---------------------------------
Subject options:
1) Turning tough reviews into booked patients
2) Quick escalation workflow for negative reviews
3) A simple reputation SOP for {{business_name}}

Email 1:
Hi {{first_name_or_team}},

I noticed a recent Google review for {{business_name}} that mentioned: “{{personalization_snippet}}”.

When negative reviews sit unanswered, they tend to become the story new patients remember. We help dental practices respond fast (within 12 hours), keep the tone brand-safe, and escalate issues so you can resolve them offline.

You stay in control: we draft → you approve → we post.

Would you like me to draft a response to that review so you can see what we’d post?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
Subject: Re: draft reply for {{business_name}}
Hi {{first_name_or_team}},

I can send a draft reply today (no login needed) and you can decide if it matches your voice.

Want it?

— Bob

Follow-up 2:
Subject: Close the loop?
If it’s easier, tell me who owns reputation/reviews at {{business_name}} and I’ll reach out directly.

— Bob

---------------------------------
E3) DENTAL — High Volume Variant
---------------------------------
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Faster review replies without more staff time
3) Weekly reputation KPIs for {{city}}

Email 1:
Hi {{first_name_or_team}},

{{business_name}} gets a steady stream of Google reviews—nice problem to have, but it’s hard to keep responses consistent.

We provide an autopilot workflow: brand-safe drafts within 12 hours, your approval, and weekly KPIs (new reviews, response rate, avg rating trend).

Would it help if I sent a 1-page example of the weekly KPI report + 2 draft replies in your tone?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

(Follow-ups same as above; keep short.)

---------------------------------
E4) MED SPA / AESTHETICS — Not Responding Variant
---------------------------------
Subject options:
1) Quick help replying to Google/Yelp reviews
2) Review response gap at {{business_name}}
3) Brand-safe review replies (you approve)

Email 1:
Hi {{first_name_or_team}},

I was reading reviews for {{business_name}} and noticed {{response_gap_observation}}.

We help med spas keep responses fast and on-brand (especially when reviews mention service quality, scheduling, or front desk issues). Our system drafts replies within 12 hours, you approve, and we escalate negative reviews immediately.

Want me to draft 2 replies based on your latest reviews so you can gauge tone?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---------------------------------
E5) HVAC/PLUMBING — Not Responding Variant
---------------------------------
Subject options:
1) Fast review replies for {{business_name}}
2) New leads read reviews first—quick fix
3) 12-hour Google review responses

Email 1:
Hi {{first_name_or_team}},

I was looking at {{business_name}}’s recent Google reviews and noticed {{response_gap_observation}}.

Home services buyers often choose the company that responds quickly and professionally—especially on 3–4 star reviews. We draft brand-safe replies within 12 hours, you approve, and we flag negative reviews for same-day escalation.

Want me to draft a couple replies for your newest reviews?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

==============================
F) AGENCY / RESELLER EMAIL (1ST TOUCH + 2 FOLLOW-UPS)
==============================
Target: local SEO agencies, web shops, PPC agencies that manage GBP for many clients.

Subject options:
1) Add “review response autopilot” to your GBP offer
2) White-label review replies for your local clients
3) Quick add-on for your SEO retainers

Email 1:
Hi {{first_name}},

Do you manage Google Business Profiles for local clients (dentists/med spas/home services)?

We offer a simple white-label “Review Reply & Reputation Autopilot”: drafts within 12 hours, brand-safe tone controls, approval workflow, negative-review escalation, and a weekly KPI report you can forward to clients.

If you tell me your client count, I’ll suggest a pricing/margin structure and send a sample KPI report.

Open to a 10-minute chat?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1:
Quick bump—worth exploring as a small add-on (often easiest upsell to existing SEO clients).
Want the sample KPI report?

Follow-up 2:
If you’re not the right person, who runs local operations / fulfillment for GBP at your agency?

==============================
G) DAILY SENDING OPS (14-DAY RAMP) + CRM STAGES
==============================
Daily non-negotiables:
1) Verify list quality: no missing websites (preferred), correct vertical, avoid multi-location chains unless targeting HQ.
2) Keep personalization safe (paraphrase if unsure).
3) Handle replies same day. Negative feedback: apologize + suppress.

Ramp schedule per inbox (conservative):
Day 1–2: 10 new/day
Day 3–4: 15 new/day
Day 5–6: 20 new/day
Day 7–8: 25 new/day
Day 9–10: 30 new/day
Day 11–12: 35 new/day
Day 13–14: 40 new/day
After: 40–50 new/day per inbox if bounces <3% and spam complaints ~0.

Daily targets (single inbox starting point):
- New sends: 20–40/day (ramped)
- Follow-ups: 10–30/day (as volume grows)
- Manual LinkedIn/IG touches (optional): 5–10/day for Priority A

Bounce/complaint rules:
- If hard bounce rate > 3% in a day: stop sending, clean list, verify domains/emails.
- If any spam complaints: reduce volume, tighten targeting, remove risky segments.

CRM stages (minimum viable):
1) Prospects (not yet sent)
2) Sent (Email 1)
3) Follow-up Scheduled
4) Replied – Interested
5) Replied – Not Now
6) Demo Booked
7) Trial / Pilot
8) Paid
9) Lost (reason)

Qualification checklist (when they reply):
- Platforms: Google only vs Google+Yelp
- Review velocity: #/week
- Current owner response behavior
- Approval preference: approve every reply vs auto-post safe templates
- Who owns escalation (manager/owner)

Offer positioning snippets (use in replies):
- “We draft within 12 hours, you approve, and we escalate negatives same-day.”
- “Brand-safe tone controls; no medical specifics; consistent voice.”
- “Weekly KPIs: new reviews, response rate, rating trend, negative count, time-to-respond.”

==============================
H) HOW TO PRODUCE 500–1,000 LEADS WITHOUT PAID TOOLS (SUMMARY)
==============================
1) For each metro + vertical, search Google Maps (e.g., “dentist Miami FL”, “med spa Austin TX”, “HVAC Phoenix AZ”).
2) Capture: business name, website, phone, rating, review count, link.
3) Open the reviews tab: record last review date + paraphrase a short snippet.
4) Check last 10 reviews quickly: count owner replies → owner_responses_last_10.
5) Fill response_rate_proxy and let formulas assign segment + priority.
6) Find emails via website contact page; if none, try “about/team” pages; record best available.

If you confirm geography (Top 25 metros vs states), this kit is ready for immediate execution and daily sending.
