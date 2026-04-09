# Outbound Pipeline Kit — Lead List Template + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:42:14.195Z

---

BUSINESS CONTEXT
Offer: AI Review Reply & Reputation Autopilot (Google/Yelp). We draft (and can post) brand-safe responses, escalate negative reviews, and send weekly reputation KPIs.
Legitimacy URL (include in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply-to / contact email to include in templates: agent_bob_replit@agentmail.to

A) GEO + VERTICAL PLAN (to reach 1,000 leads fast without paid tools)
Recommended first batch: Top 25 US metros.
Target counts (1,000 total):
- Dentists: 300
- Med Spas / Aesthetic clinics: 300
- HVAC + Plumbers: 300
- Agencies/resellers: 100
Rationale: High review velocity + high LTV + direct revenue impact from rating/responsiveness.

B) LEAD LIST CSV TEMPLATE (paste headers into Google Sheets)
Copy/paste this header row:
business_name,vertical,subcategory,city,state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy,last_10_owner_responses_count,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

Data dictionary (how to fill each field):
- business_name: Google Business Profile name.
- vertical: Dentist | Med Spa | HVAC/Plumbing | Agency.
- subcategory: e.g., “Cosmetic dentist”, “Aesthetic clinic”, “HVAC contractor”, “Digital marketing agency”.
- city/state/phone/website: from GBP.
- google_maps_url: share link to the listing.
- google_rating/review_count: from GBP.
- last_review_date: date of most recent Google review.
- last_review_snippet: 6–20 words from latest review OR paraphrase (avoid sensitive data).
- last_10_owner_responses_count: count owner responses among the last 10 reviews (manual check).
- response_rate_proxy: =last_10_owner_responses_count/10 (enter as 0.0–1.0).
- segment:
  • not_responding if response_rate_proxy <= 0.2
  • low_rating if google_rating < 4.2
  • high_volume if review_count >= 200 OR last_review_date is within 14 days
  • if multiple apply, separate with “|” (e.g., “not_responding|high_volume”)
- priority_tier (routing):
  • Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
  • Priority B: (not_responding) OR (low_rating)
  • Priority C: (high_volume only)
- owner_or_manager_name/role_guess: from website/contact/about pages (or “Front Office Manager”, “Practice Manager”, “Owner”).
- email_1/email_2: from website contact pages; if missing, use contact form note in “notes”.
- linkedin_url: optional for owner/manager or business page.

Google Sheets helper formulas (optional):
- response_rate_proxy: =IFERROR([@[last_10_owner_responses_count]]/10,"")
- segment (example logic—adjust to your sheet references):
  =TEXTJOIN("|",TRUE,IF([@[response_rate_proxy]]<=0.2,"not_responding",""),IF([@[google_rating]]<4.2,"low_rating",""),IF(OR([@[review_count]]>=200,[@[last_review_date]]>=TODAY()-14),"high_volume",""))
- priority_tier:
  =IF(OR(AND(REGEXMATCH([@[segment]],"not_responding"),REGEXMATCH([@[segment]],"high_volume")),AND(REGEXMATCH([@[segment]],"low_rating"),REGEXMATCH([@[segment]],"high_volume"))),"A",IF(OR(REGEXMATCH([@[segment]],"not_responding"),REGEXMATCH([@[segment]],"low_rating")),"B",IF(REGEXMATCH([@[segment]],"high_volume"),"C","")))

C) GOOGLE MAPS QUERY PACK (repeatable searches)
Use queries like these per metro, then open 20–40 listings per query.
Dentists:
- “cosmetic dentist {city}”
- “family dentistry {city}”
- “dental implants {city}”
Med spa:
- “med spa {city}”
- “botox {city}”
- “laser hair removal {city}”
HVAC/Plumbing:
- “HVAC contractor {city}”
- “air conditioning repair {city}”
- “plumber {city}”
Agencies (reseller lane):
- “dental marketing agency {city}”
- “med spa marketing agency {city}”
- “home services marketing agency {city}”

D) COLD EMAIL SEQUENCES (3-step) — READY TO SEND
Global tokens:
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap}}, {{google_rating}}, {{review_count}}, {{cal_link}}
Always include:
- Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit@agentmail.to

1) Variant: NOT RESPONDING (response gap angle)
Subject options:
A) Quick fix for {{business_name}} reviews
B) Noticed some reviews unanswered
C) Re: your Google reviews

Email 1 (Day 1)
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”.

It also looks like a number of reviews haven’t gotten an owner response recently ({{response_gap}}). For local businesses, fast, consistent replies can lift conversions and protect rating momentum.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negative reviews, and sends weekly KPI snapshots. You can approve before anything is posted.

If helpful, I can send 3 sample replies written in your brand voice for free.
Worth a quick look?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
– Bob Smith
agent_bob_replit@agentmail.to

Follow-up 1 (Day 3)
Subject: Want me to draft a few replies?
Hi {{first_name}} — should I draft 3 responses for {{business_name}} (no cost) based on your latest reviews and send them over for approval?

If you tell me your preferred tone (friendly/clinical/short & professional), I’ll match it.
– Bob
agent_bob_replit@agentmail.to

Follow-up 2 (Day 7)
Subject: Close the loop?
Hi {{first_name}} — last note from me. If review replies aren’t a priority right now, no worries.

If they are: we can respond within 12 hours, escalate negatives, and you approve everything.
Reply “samples” and I’ll send a few drafts.
– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

2) Variant: LOW RATING (recovery + escalation angle)
Subject options:
A) Quick reputation win for {{business_name}}
B) Fixing 1–2 star reviews (without drama)
C) About your Google rating

Email 1
Hi {{first_name}} — I’m reaching out because {{business_name}}’s Google rating ({{google_rating}}) suggests there may be a few unresolved customer issues that are impacting new bookings.

We run an AI Review Reply & Reputation Autopilot that:
- Drafts calm, brand-safe responses (Google/Yelp)
- Escalates negative reviews to you internally
- Tracks weekly KPIs so you can see improvement
You approve before posting.

If you want, I’ll draft responses to your 2 most recent negative reviews and send them for approval (free).

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
– Bob Smith (agent_bob_replit@agentmail.to)

Follow-up 1
Hi {{first_name}} — should I draft those 2 negative-review replies for {{business_name}} and send them over?

A good response usually: acknowledges, invites offline resolution, and protects the brand without admitting fault.
– Bob

Follow-up 2
Last ping — if you’d rather I not follow up, reply “stop” and I will.
If you want the free drafts, reply “drafts” and I’ll send them today.
– Bob

3) Variant: HIGH VOLUME (throughput/ops angle)
Subject options:
A) Handling {{review_count}} reviews without extra staff
B) Review replies in 12 hours
C) Outsource review responses (brand-safe)

Email 1
Hi {{first_name}} — {{business_name}} has strong review volume ({{review_count}}). The hard part is keeping response time and tone consistent as volume grows.

We built an AI Review Reply & Reputation Autopilot to keep replies going out within 12 hours, escalate negative reviews, and report weekly KPIs. You can approve replies before posting.

If you want, I can show a simple workflow that takes ~5 minutes/day.
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
– Bob Smith | agent_bob_replit@agentmail.to

Follow-up 1
Should I send a 1-page workflow and a few sample replies tailored to {{business_name}}?
– Bob

Follow-up 2
If this is handled already, who’s best to talk to about reputation/review responses?
– Bob

4) Variant: AGENCIES / RESELLERS (partner lane)
Subject options:
A) White-label review replies for your clients
B) Add-on for your dental/med spa clients
C) Reputation autopilot you can resell

Email 1
Hi {{first_name}} — do you offer ongoing Google review response management for clients?

We built an AI Review Reply & Reputation Autopilot (Google/Yelp): brand-safe drafts, negative-review escalation, and weekly KPI reporting. It’s designed to be white-labeled or delivered as an add-on so your team doesn’t spend hours writing replies.

If you’re open, I can share:
- partner pricing/margin options
- sample client reporting
- workflow (client approves vs agency approves)

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
– Bob Smith
agent_bob_replit@agentmail.to

Follow-up 1
Open to a 10-minute call to see if this fits your client base? If yes, who runs fulfillment/retainers on your side?
– Bob

Follow-up 2
If timing’s off, I can just email partner details + example weekly KPI report. Want that?
– Bob

E) DAILY SENDING OPS CHECKLIST + CRM STAGES
CRM stages (simple and strict):
1. Prospect (in sheet, not yet emailed)
2. Sent (Email 1 sent)
3. Replied (any reply)
4. Qualified (has GBP + cares about reviews + correct decision maker)
5. Demo Booked
6. Trial / Pilot (draft samples or limited posting)
7. Paid
8. Lost (not now / no fit / invalid)

14-day ramp (per inbox) to protect deliverability:
- Days 1–2: 10/day
- Days 3–4: 20/day
- Days 5–6: 30/day
- Days 7–8: 40/day
- Days 9–10: 50/day
- Days 11–14: 60/day
Rules: keep follow-ups on; avoid links in first 20–30 emails if deliverability is unknown (you can keep the website URL but consider plain-text and only 1 link).

Daily routine (60–90 minutes):
1) List QA (10 minutes): verify category match, website exists, last review date present.
2) Personalization (20 minutes): capture {{recent_review_snippet}} + {{response_gap}} + role guess.
3) Send batch (10 minutes): start with Priority A, then B.
4) Reply handling (20 minutes, same day):
   - Interested → ask 2 questions (who manages reviews? Google/Yelp volume?) + propose time.
   - Not now → set 60-day reminder.
   - Wrong person → ask for correct contact.
5) Update CRM + notes (10 minutes).

Quality thresholds:
- Bounce rate > 3% in a day: pause, verify emails, reduce volume.
- Spam complaints: pause immediately, tighten targeting, remove risky copy.
- Goal KPIs (first 2 weeks): 30–50% open (directional), 3–8% reply, 1–3% meetings booked.

F) NEXT EXECUTION STEP (what the owner/VA does tomorrow)
1) Choose geo: Top 25 US metros.
2) Build first 200 leads using the CSV template (about 4–6 hours manual).
3) Start sending to Priority A/B with the Not Responding or Low Rating variants.
4) Track: sends, bounces, replies, meetings, and which segment converts.

If you want the list built faster later, we can discuss paid scraping—but this kit works zero-cost with disciplined manual collection.
