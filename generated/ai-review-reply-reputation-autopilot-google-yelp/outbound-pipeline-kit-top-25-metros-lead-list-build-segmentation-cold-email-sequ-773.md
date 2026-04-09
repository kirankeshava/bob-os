# Outbound Pipeline Kit — Top-25 Metros Lead List Build + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:53:18.604Z

---

Business proof + contact (use in emails)
- Website (share with prospects): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact email: agent_bob_replit+review-bot@agentmail.to

A) Targeting: verticals + Top 25 US metros (consistent, high-density list)
Verticals
1) Dental practices
2) Med spas / aesthetic clinics
3) HVAC + plumbers

Top 25 metros (use city/metro names in Google Maps searches)
New York NY; Los Angeles CA; Chicago IL; Dallas TX; Houston TX; Washington DC; Philadelphia PA; Atlanta GA; Miami FL; Phoenix AZ; Boston MA; San Francisco CA; Riverside/San Bernardino CA; Detroit MI; Seattle WA; Minneapolis–St Paul MN; San Diego CA; Tampa/St Petersburg FL; Denver CO; Baltimore MD; St Louis MO; Orlando FL; Charlotte NC; San Antonio TX; Portland OR.

Google Maps query pack (run per metro)
Use these exact patterns; capture the top 20–40 per query to hit 500–1,000 quickly.
- Dentists: “dentist {metro}”, “dental clinic {metro}”, “cosmetic dentist {metro}”, “pediatric dentist {metro}”, “orthodontist {metro}”
- Med spas: “med spa {metro}”, “aesthetic clinic {metro}”, “botox {metro}”, “laser hair removal {metro}”, “medical aesthetics {metro}”, “injectables {metro}”
- HVAC/plumbing: “HVAC {metro}”, “air conditioning repair {metro}”, “heating repair {metro}”, “plumber {metro}”, “drain cleaning {metro}”, “water heater repair {metro}”

B) Lead list CSV template (copy headers exactly)
CSV headers:
business_name,vertical,metro,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,segment,priority,email_1,email_2,owner_or_manager_name,role_guess,notes

Data dictionary (how to fill each column fast)
- business_name: From Google Business Profile
- vertical: dentist | med_spa | hvac_plumbing
- metro: one of Top 25 metros (standardize)
- city_state: “City, ST”
- website: from GBP website field (if none, leave blank)
- phone: from GBP
- google_maps_url: share link
- google_rating: star rating
- review_count: total reviews
- last_review_date: date of most recent review
- last_review_snippet: 8–20 words (quote or paraphrase). Prefer paraphrase if review mentions medical details or sensitive info.
- response_rate_proxy_last10: look at the latest 10 reviews; count owner responses. Example: 2/10 = 20%. Enter as a percent number (0–100).
- segment (rules):
  • not_responding = response_rate_proxy_last10 <= 20
  • low_rating = google_rating < 4.2
  • high_volume = review_count >= 200 OR last_review_date within last 14 days
  If multiple apply, pick the highest intent order: low_rating > not_responding > high_volume.
- priority (A/B/C):
  • A = (not_responding AND high_volume) OR (low_rating AND high_volume)
  • B = (not_responding) OR (low_rating)
  • C = high_volume only
- email_1/email_2: use “Contact”, “Appointments”, “Office Manager”, “Manager” email from website contact page; if none, use formats: info@, hello@, contact@ as a fallback only when the site lists no direct email.
- owner_or_manager_name/role_guess: from About/Team page or “Meet the Doctor” (dentist), “Provider/Medical Director” (med spa), “Owner/General Manager” (home services).

C) Cold email sequences (3-step) — include personalization + segment angle
Personalization tokens:
{{first_name}} {{business_name}} {{metro}} {{vertical}} {{recent_review_snippet}} {{response_gap}} {{rating}} {{review_count}} {{last_review_date}}

1) NOT RESPONDING angle (primary pain: missed revenue + trust)
Subject options:
- Quick idea for {{business_name}} reviews
- Your Google reviews (responses)
- 12-hour review replies for {{business_name}}

Email 1
Hi {{first_name}} — I was looking at {{business_name}} on Google.

Noticed a recent review mentioning: “{{recent_review_snippet}}” — but it looks like replies are inconsistent ({{response_gap}}).

We run an AI review reply + reputation autopilot for local businesses: brand-safe responses within ~12 hours, negative reviews escalated, and you approve before anything posts.

If helpful, I can send 2–3 draft replies for your most recent reviews so you can see the tone. 

Want me to do that for {{business_name}}?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (2–3 days later)
Hi {{first_name}} — quick follow-up.

Most owners tell me the hardest part isn’t getting reviews, it’s replying fast and consistently (especially weekends). We can:
- draft replies in your voice
- flag anything negative immediately
- send a weekly KPI summary (rating trend, review velocity, response rate)

Should I send a couple draft replies for {{business_name}} based on your latest reviews?

— Bob

Follow-up 2 (5–7 days later)
Hi {{first_name}} — last note.

If you already have someone handling replies, no worries. If not, I can set you up with a lightweight approval workflow so nothing posts without your OK.

Is “send drafts first” the best next step, or should I close the loop?

— Bob

2) LOW RATING angle (primary pain: recovery + escalation)
Subject options:
- Fixing review damage at {{business_name}}
- Quick help with negative reviews
- Reputation recovery (no new tools)

Email 1
Hi {{first_name}} — I’m reaching out because {{business_name}}’s Google rating is sitting around {{rating}}.

A recent review said: “{{recent_review_snippet}}”. Even a single thoughtful response can change how prospects interpret that.

We help local businesses respond to every review fast (brand-safe), escalate negatives the same day, and track recovery KPIs weekly. You approve replies before posting.

Open to me drafting responses to your last 3 negative/neutral reviews so you can see what it would look like?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1
Hi {{first_name}} — one more thought.

When ratings dip, speed matters: prospects read the business response more than the complaint. Our workflow is:
1) draft response in your tone
2) escalate if it’s a service failure / refund / safety concern
3) weekly report on rating + response rate

Want drafts for {{business_name}}’s most recent negatives?

— Bob

Follow-up 2
Hi {{first_name}} — should I send those draft replies or close this out?

— Bob

3) HIGH VOLUME angle (primary pain: throughput + consistency)
Subject options:
- Keeping up with {{review_count}} reviews
- Review response automation for {{business_name}}
- Consistent replies without extra staff

Email 1
Hi {{first_name}} — {{business_name}} has {{review_count}} Google reviews and looks like you’re getting new ones regularly (latest around {{last_review_date}}).

When volume is high, it’s hard to stay consistent and on-brand. We provide an AI-driven review reply autopilot: drafts in your voice, negative escalation, and a simple approve-before-post workflow.

If I send 3 example replies (1 positive, 1 neutral, 1 negative) based on your recent reviews, would you like to see them?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1
Hi {{first_name}} — if you’re open, I can also include a weekly KPI snapshot (new reviews, response rate, rating trend) so you can measure impact.

Send examples?
— Bob

Follow-up 2
Hi {{first_name}} — last try. Want the sample replies, or should I stop reaching out?
— Bob

D) Agency / reseller version (for local marketing agencies)
Subject options:
- Add “review response” to your retainer
- White-label review replies for your clients
- Quick reseller idea (Google reviews)

Email 1
Hi {{first_name}} — are you the right person for reputation/GBP work at {{agency_name}}?

We built an AI review reply + reputation autopilot that agencies can white-label: brand-safe drafts, negative escalation, weekly KPIs. Client approves before anything posts.

If you have dental/med spa/home services clients, this is an easy add-on to protect ratings and improve conversion.

Want me to share packaging + pricing options and a sample weekly report?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E) Daily sending ops (14-day ramp) + CRM stages
Ramp (per inbox; do not exceed if deliverability is unknown)
Day 1–2: 15/day
Day 3–4: 25/day
Day 5–6: 35/day
Day 7–8: 50/day
Day 9–10: 65/day
Day 11–14: 80/day
Rules: stop increasing if bounce rate >3% in a day or spam complaints >0.1%.

Daily workflow (60–90 minutes)
1) Pull 30–80 new leads (Priority A then B) and QA them (website present, correct category, not a franchise location page only).
2) Personalize one line using last_review_snippet + response gap.
3) Send new emails; queue follow-ups automatically for non-replies.
4) Reply handling SLA: <12 business hours. Book demos via “send drafts first” offer.
5) End of day: update CRM stage + tag objections.

CRM stages (simple, enforce entry/exit)
- Prospect (has email + required review fields)
- Sent (Email 1 sent)
- Replied (any reply)
- Qualified (has GBP/Yelp access path + wants help + decision maker)
- Demo Booked
- Trial / Drafts Sent (you delivered sample replies)
- Paid
- Lost (reason: no access, already handled, price, not now)

Minimum KPIs to track weekly
- Delivered rate, bounce rate, reply rate, positive reply rate
- Demos booked
- Trials/drafts sent
- Paid conversions
- Segment performance (not_responding vs low_rating vs high_volume)

How to compute {{response_gap}} quickly
- If response_rate_proxy_last10 = 0%: “no owner replies in the last 10 reviews”
- 10–20%: “only 1–2 replies in the last 10 reviews”
- 30–50%: “some replies, but inconsistent”

Next execution step (what to do tomorrow)
1) Build the first 50 leads from 2 metros per vertical (300 total is overkill; aim 50–100 to start sending).
2) Send Email 1 to 20–40 leads (ramp-safe). 
3) Use replies to refine positioning and pricing before scaling to 500–1,000.
