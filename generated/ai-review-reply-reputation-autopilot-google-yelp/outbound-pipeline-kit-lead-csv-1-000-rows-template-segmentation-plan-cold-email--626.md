# Outbound Pipeline Kit — Lead CSV (1,000 rows template), Segmentation Plan, Cold Email Sequences (3-step), and Daily Sending Ops (with Website + Contact Email)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:34:22.394Z

---

Below is a single, ready-to-run outbound kit for AI Review Reply & Reputation Autopilot.

A) LEAD LIST CSV — COLUMN HEADERS (paste into a CSV / Google Sheet)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_reviews_responded_count,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,response_gap_note,notes

B) SEGMENTATION RULES (apply per row)
1) Compute response_rate_proxy = last_10_reviews_responded_count / 10
2) Segment tags (can be multiple; pick primary based on priority):
- not_responding: response_rate_proxy <= 0.20 OR last_10_reviews_responded_count = 0
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR (TODAY - last_review_date) <= 14 days
3) Priority tiers:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only
4) Personalization snippet rule (safe): use a short 8–20 word excerpt OR paraphrase from the most recent review (no sensitive info). If uncomfortable quoting, paraphrase: “a recent review mentioned {{theme}}”.

C) 1,000-ROW CSV TEMPLATE (with segment distribution plan)
Use this distribution so you end with 1,000 total prospects:
- Dentists: 350 rows (150 Priority A, 120 Priority B, 80 Priority C)
- Med spas/aesthetic clinics: 350 rows (150 A, 120 B, 80 C)
- HVAC/Plumbing: 250 rows (110 A, 90 B, 50 C)
- Agencies (reseller lane): 50 rows (focus: local SEO/reputation agencies)

To help you start immediately, here are 24 SAMPLE ROWS (copy/paste; replace with real businesses as you build). These illustrate formatting, not actual targets:
Bright Smile Dental,dentist,Austin TX,https://example.com,512-555-0101,https://maps.google.com/?q=Bright+Smile+Dental,4.6,312,2026-03-28,0.10,1,not_responding,Priority A,,,info@brightsmiledental.com,,"Recent review praised staff but asked about appointment wait times","No owner responses on most recent reviews",
Northside Family Dentistry,dentist,Charlotte NC,https://example.com,704-555-0133,https://maps.google.com/?q=Northside+Family+Dentistry,4.1,265,2026-03-31,0.20,2,low_rating,Priority A,,,contact@northsidefamilydentistry.com,,"Recent review mentioned billing confusion and follow-up","Rating <4.2 and high volume",
Sunset Aesthetics,med_spa,Scottsdale AZ,https://example.com,480-555-0144,https://maps.google.com/?q=Sunset+Aesthetics,4.7,540,2026-04-02,0.00,0,not_responding,Priority A,,,hello@sunsetaesthetics.com,,"A recent review mentioned results were great but scheduling was hard","No responses in last 10 reviews",
Blue River Med Spa,med_spa,Nashville TN,https://example.com,615-555-0119,https://maps.google.com/?q=Blue+River+Med+Spa,4.0,210,2026-03-20,0.10,1,low_rating,Priority A,,,support@bluerivermedspa.com,,"Recent review said service felt rushed and pricing unclear","Low rating + high volume",
RapidRooter Plumbing,hvac_plumbing,Orlando FL,https://example.com,407-555-0199,https://maps.google.com/?q=RapidRooter+Plumbing,4.8,410,2026-04-01,0.10,1,not_responding,Priority A,,,service@rapidrooterplumbing.com,,"Recent review thanked tech but noted no follow-up on invoice","High review velocity; low response rate",
EverCool HVAC,hvac_plumbing,Denver CO,https://example.com,303-555-0188,https://maps.google.com/?q=EverCool+HVAC,4.2,205,2026-03-27,0.20,2,high_volume,Priority C,,,dispatch@evercoolhvac.com,,"Recent review mentioned fast arrival and clear explanation","High volume only",
Local Growth Partners,agency,Chicago IL,https://example.com,312-555-0166,https://maps.google.com/?q=Local+Growth+Partners,4.9,120,2026-03-25,0.50,5,high_volume,Priority B,Alex Taylor,Owner,alex@localgrowthpartners.com,,"Saw you offer local SEO—reviews are a big lever for retention","Agency lane; reseller pitch",

D) COLD EMAIL — 3-STEP SEQUENCE (LOCAL BUSINESSES)
Use sender: Bob (agent_bob_replit+review-bot@agentmail.to)
Legitimacy link (include in every email footer): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

TOKENS:
{{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_note}}, {{google_rating}}, {{review_count}}, {{last_review_date}}, {{cal_link}}

EMAIL 1 (Not Responding angle)
Subject options:
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a response gap on your reviews
3) Can I draft replies for you (you approve)?

Body:
Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap_note}}. One recent review said: “{{recent_review_snippet}}”.

We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses (Google + Yelp), escalates negatives, and helps you respond within ~12 hours. You can approve everything before it posts.

If I send 3 draft replies based on your latest reviews, would you like to see them?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

EMAIL 1 (Low Rating angle)
Subject options:
1) Idea to lift your rating (without incentives)
2) Reputation quick win for {{business_name}}
3) Responding to negatives faster

Body:
Hi {{first_name}} — Bob here.

I noticed {{business_name}} is around {{google_rating}} on Google, and a recent review mentioned: “{{recent_review_snippet}}”. When negative reviews don’t get a thoughtful response quickly, it can drag conversion.

We draft brand-safe replies for Google/Yelp, flag urgent issues, and send a weekly KPI summary (rating trend, response rate, negative themes). You approve before posting.

Open to a quick 10-minute call to see if this would help? Or I can send 3 sample replies first.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

EMAIL 1 (High Volume angle)
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Same-day review replies (without extra staff)
3) Operational help for Google/Yelp reviews

Body:
Hi {{first_name}} — Bob here.

{{business_name}} has ~{{review_count}} reviews and it looks like new ones are coming in frequently (last one on {{last_review_date}}). That’s great—but replying consistently is a time sink.

We help teams stay responsive with an autopilot that drafts on-brand replies for Google + Yelp, routes negatives for escalation, and reports weekly reputation KPIs. You can approve before anything posts.

Should I send a quick before/after example using one of your recent reviews?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 1 (2–3 business days later)
Subject: Re: {{business_name}} reviews
Body:
Hi {{first_name}} — quick follow-up.

If you’re open to it, I can draft 3 replies for your most recent Google/Yelp reviews (including a negative one if there is one). You can say “yes” and I’ll send them over—no login needed.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP 2 (5–7 business days later)
Subject: close the loop?
Body:
Hi {{first_name}}, closing the loop.

Is review management a priority right now for {{business_name}}? If not, no worries—just reply “later” and I’ll reach back next month.

If it is: do you prefer (A) I send 3 draft replies first, or (B) a 10-min call?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

E) AGENCY / RESELLER EMAIL (INITIAL + 1 FOLLOW-UP)
INITIAL
Subject options:
1) White-label review reply autopilot for your clients
2) Add-on offer for your local SEO clients
3) Reputation management deliverable (done-for-you)

Body:
Hi {{first_name}} — Bob here.

If you manage local SEO for {{vertical}} clients, reviews are one of the easiest retention levers: responsiveness + sentiment trends.

We built an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe drafted replies, negative-review escalation, and weekly KPI reporting. It can be offered white-label or as a partner add-on.

Would it be useful if I sent a 1-page partner overview + example weekly report?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

FOLLOW-UP
Subject: Re: partner add-on
Body:
Quick follow-up—should I send the partner overview + a sample report? If you tell me your top client vertical (dentist/med spa/home services), I’ll tailor the example.

– Bob

F) DAILY SENDING OPS (14-DAY RAMP)
Goal: protect deliverability while building replies/conversations.
- Day 1–2: 15–20 new emails/day/inbox; verify bounces; no links in first 10 sends if deliverability is unknown.
- Day 3–4: 25/day/inbox; add follow-up 1.
- Day 5–7: 35/day/inbox; add follow-up 2; keep complaints <0.1%.
- Day 8–10: 50/day/inbox; begin agency lane (5–10/day).
- Day 11–14: 70–100/day/inbox if bounce rate <3% and replies steady.

List QA rules (before sending):
1) Must have valid website OR valid Google Maps URL + phone.
2) Exclude franchises with corporate-only contact unless targeting multi-location.
3) Ensure category matches vertical (dentist/med spa/HVAC/plumbing).
4) Sample 10% rows: confirm rating/review count/last review date accuracy.

Reply handling SLA:
- Positive interest: respond within 2 hours during business day.
- Negative response: tag “Not a fit” and stop.
- Out-of-office: snooze follow-up.

CRM stages (minimum viable):
Prospect → Sent → Replied → Qualified → Demo Booked → Trial/Proof (3 sample replies delivered) → Paid → Lost

KPIs (weekly):
- Delivery rate, bounce rate, reply rate, positive reply rate, demos booked, trials started, paid conversions.

If you confirm geography, this kit becomes executable immediately: build the first 200 leads in that geo, send to Priority A first, and iterate copy based on replies.
