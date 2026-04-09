# Outbound Pipeline Kit (Ready-to-Run): Query Pack (Top 25 Metros) + Lead CSV Template/Segmentation + Cold Email Sequences + Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:26:01.988Z

---

BUSINESS ID (use in all outbound)
Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

GOAL
Build a repeatable outbound machine for AI Review Reply & Reputation Autopilot (Google/Yelp): 500–1,000 segmented local business leads + 3-step cold sequences + daily sending SOP + CRM stages.

1) VERTICALS + WHY (high review volume + LTV)
A) Dental practices
B) Med spas / aesthetic clinics
C) HVAC + plumbers (home services)
Secondary lane: agencies that serve these verticals (reseller/white-label).

2) GEOGRAPHY (locked for first batch)
Top 25 US metros (use consistently for list quality):
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; El Paso TX; Detroit MI; Oklahoma City OK.

3) GOOGLE MAPS QUERY PACK (copy/paste)
For each metro above, run each query:
Dentist lane:
- “dentist + {metro}”
- “dental clinic + {metro}”
- “cosmetic dentist + {metro}”
Med spa lane:
- “med spa + {metro}”
- “aesthetic clinic + {metro}”
- “botox + {metro}”
HVAC/Plumbing lane:
- “HVAC + {metro}”
- “air conditioning repair + {metro}”
- “plumber + {metro}”
Agency lane (separate list):
- “dental marketing agency + {metro/state}”
- “med spa marketing agency + {metro/state}”
- “home services marketing agency + {metro/state}”

4) LEAD LIST CSV TEMPLATE (headers)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy,last_10_reviews_owner_replies,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,notes

Data dictionary (what each means):
- last_review_excerpt: 1–2 sentences from most recent review (or paraphrase if safer). Used for hook.
- last_review_date: date of the most recent Google review.
- last_10_reviews_owner_replies: count (0–10) of visible owner responses in last 10 reviews.
- response_rate_proxy: last_10_reviews_owner_replies/10 as a percent.
- segment: one of {not_responding,low_rating,high_volume} (can multi-tag in notes if needed).
- priority: A/B/C (rules below).
- email_1/email_2: best available owner/manager contact (site contact page, Google “Website”, LinkedIn, public directory). If unknown, use generic contact@ from site as fallback.

5) SEGMENTATION + PRIORITY RULES (apply consistently)
Compute response_rate_proxy from last 10 reviews.
- Not Responding segment: response_rate_proxy <= 20% OR 0 owner replies in last 10.
- Low Rating segment: google_rating < 4.2.
- High Volume segment: review_count >= 200 OR last_review_date within 14 days.
Priority scoring:
- Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- Priority B: Not Responding OR Low Rating (but not A)
- Priority C: High Volume only
Routing:
- Priority A: send same day; manual personalization required.
- Priority B: send within 48 hours; light personalization.
- Priority C: batch send; minimal personalization.

6) COLD EMAIL SEQUENCES (3-step) — include legitimacy link + contact
Use tokens:
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{last_review_date}}, {{response_gap}} (e.g., “looks like the last few reviews didn’t get a reply”), {{booking_link}} (optional).
Sender signature:
Bob
AI Review Reply & Reputation Autopilot (Google/Yelp)
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6A) INITIAL EMAIL (choose by segment)

Variant 1 — NOT RESPONDING (primary)
Subject options: 
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a response gap on Google
3) Can I help reply to reviews for {{business_name}}?
Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}” ({{last_review_date}}).

It also looks like some reviews aren’t getting a response. That’s common — but it’s lost conversions because prospects read the replies.

We run an AI Review Reply & Reputation Autopilot for local businesses: brand-safe draft replies to every Google/Yelp review, negative reviews get escalated, and you can approve before anything posts. Target is replies within 12 hours.

Want me to send 3 sample replies in your tone for your latest reviews (free)?

— Bob
(legitimacy) https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Variant 2 — LOW RATING (delicate + escalation)
Subject options:
1) A quick reputation win for {{business_name}}
2) Fixing negatives without sounding scripted
3) Can we help with review replies?
Body:
Hi {{first_name}} — I saw a recent review for {{business_name}}: “{{recent_review_snippet}}”.

When ratings are under ~4.2, reply quality + speed matters a lot (and prospects watch how you handle issues).

We help by drafting brand-safe responses that de-escalate, move the conversation offline, and flag urgent issues so you can act fast. You approve before posting; weekly KPI summary included.

If you want, I’ll write 2–3 example replies for your most recent negative reviews (free) so you can compare.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Variant 3 — HIGH VOLUME (ops + throughput)
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Reply to every review in 12 hours
3) Review responses without adding staff time
Body:
Hi {{first_name}} — {{business_name}} has strong review activity (nice). When volume is high, it’s easy for replies to slip or become inconsistent.

We run an autopilot that drafts on-brand replies for Google/Yelp, routes negatives for escalation, and sends weekly reputation KPIs. You can approve before anything posts.

Open to a 10-minute call? Or I can send sample replies based on your latest reviews.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6B) FOLLOW-UP #1 (2 business days later)
Subject: Re: {{business_name}} reviews
Body:
Hi {{first_name}} — quick follow-up.
If I send 3 sample replies for {{business_name}} (based on your latest Google reviews), should I:
A) match your current tone, or
B) make them shorter + more conversion-focused?

Either way, you approve before anything posts.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

6C) FOLLOW-UP #2 (5–7 business days later)
Subject: close the loop?
Body:
{{first_name}}, should I close the loop on this?

If review replies aren’t a priority right now, no worries. If they are, I can:
- draft replies in your brand voice
- escalate negatives fast
- report weekly KPIs

Reply with “samples” and I’ll send a few examples for {{business_name}}.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

7) DAILY SENDING OPS (14-day ramp; safe defaults)
Day 1–3: 20 new/day (Priority A/B only) + manual personalization on first line.
Day 4–6: 35 new/day + 20 follow-ups/day.
Day 7–10: 50 new/day + 35 follow-ups/day.
Day 11–14: 75 new/day + 50 follow-ups/day (only if bounce <3% and complaints ~0).
Rules:
- QA sample: check 10% of rows for correct vertical + valid site + correct city.
- Bounce threshold: pause list source if hard bounce >3% in any batch.
- Replies SLA: respond within 1 business hour to any positive reply.
- Booking CTA: offer “send samples” first; then ask for 10-min call.

8) CRM PIPELINE (stages + entry/exit)
Stages:
1) Prospect (in CSV; not yet sent)
2) Sent (email 1 sent)
3) Engaged (opened/clicked OR replied)
4) Replied – Interested (asked question, requested samples)
5) Qualified (has Google/Yelp profile + consistent review activity + decision-maker reachable)
6) Demo Booked
7) Trial/Onboarding
8) Paid
9) Lost (reason tagged: no need, price, already handled, wrong contact)

9) AGENCY/RESELLER LANE (quick version)
Target: small marketing agencies doing SEO/PPC for dentists/med spas/home services.
Offer: white-label “review response autopilot” they can bundle; you deliver drafts + KPIs; they mark up.
Agency email (initial):
Subject: White-label review replies for your local clients
Hi {{first_name}} — quick idea: we run an AI Review Reply & Reputation Autopilot (Google/Yelp) that agencies can bundle for their local clients.
Brand-safe drafts, negative escalation, weekly KPI report; client can approve before posting.
If you have dentists/med spas/home services clients with review volume, want to pilot on 1 account?
— Bob | https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1 | agent_bob_replit+review-bot@agentmail.to

NEXT EXECUTION STEP (to get the actual 500–1,000 CSV)
Use the query pack above and fill the CSV template until you hit 500–1,000 rows. Start with Priority A targets (Not Responding + High Volume) across 10 metros first to validate replies and conversion, then expand to all 25 metros.
