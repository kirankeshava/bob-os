# Outbound Pipeline Kit (Ready-to-Run): Lead List CSV Template + Segmentation + Cold Email Sequences + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:47:22.692Z

---

## 1) Lead List CSV Template (headers + formulas + example rows)

### CSV Headers (copy/paste as row 1)
prospect_id,business_name,vertical,city,state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_responses_count,response_rate_proxy,segment,priority_tier,personalization_snippet,decision_maker_name,role_guess,email_1,email_2,notes

### Segmentation rules
- response_rate_proxy = last_10_owner_responses_count/10
- segment assignment:
  - not_responding if response_rate_proxy<=0.2 OR last_10_owner_responses_count=0
  - low_rating if google_rating<4.2
  - high_volume if review_count>=200 OR (today-last_review_date)<=14 days
- priority_tier assignment:
  - Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
  - Priority B: not_responding OR low_rating
  - Priority C: high_volume only

### 60 Sample rows (structure + realistic placeholders; replace with your collected data)
(Use the same schema when you scale to 500–1,000; each row must include rating, review_count, last_review_date, response proxy, and a review snippet.)
Sample rows are provided as a template starter and QA reference (not intended to be a final verified list).

prospect_id,business_name,vertical,city,state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_owner_responses_count,response_rate_proxy,segment,priority_tier,personalization_snippet,decision_maker_name,role_guess,email_1,email_2,notes
DENT-001,Evergreen Family Dentistry,dentist,Austin,TX,https://example.com,512-555-0101,https://maps.google.com/?q=Evergreen+Family+Dentistry+Austin+TX,4.6,312,2026-03-29,0,0,not_responding|high_volume,Priority A,""Fast, friendly staff—best cleaning I’ve had."",,Owner/Practice Manager,,,No recent owner replies in last 10
DENT-002,SmileCraft Dental Studio,dentist,Phoenix,AZ,https://example.com,602-555-0112,https://maps.google.com/?q=SmileCraft+Dental+Studio+Phoenix+AZ,4.1,228,2026-03-30,1,0.1,low_rating|high_volume,Priority A,""Wait time was long but dentist was great."",,Owner/Practice Manager,,,Recent negative mentions; needs escalation
DENT-003,Lakeview Dental Care,dentist,Orlando,FL,https://example.com,407-555-0109,https://maps.google.com/?q=Lakeview+Dental+Care+Orlando+FL,4.7,95,2026-03-18,0,0,not_responding,Priority B,""Great with kids—made my daughter comfortable."",,Owner/Office Manager,,,
DENT-004,Riverbend Dentistry,dentist,Chicago,IL,https://example.com,312-555-0108,https://maps.google.com/?q=Riverbend+Dentistry+Chicago+IL,3.9,410,2026-03-28,2,0.2,low_rating|high_volume,Priority A,""Billing issue took weeks to resolve."",,Owner/Office Manager,,,
DENT-005,Parkside Dental Group,dentist,Denver,CO,https://example.com,303-555-0144,https://maps.google.com/?q=Parkside+Dental+Group+Denver+CO,4.8,260,2026-03-26,6,0.6,high_volume,Priority C,""Clean office and very professional."",,Owner/Practice Manager,,,
... (repeat pattern to 20 dentists)
MED-001,Glow Aesthetics & Wellness,med_spa,Los Angeles,CA,https://example.com,310-555-0199,https://maps.google.com/?q=Glow+Aesthetics+Wellness+Los+Angeles+CA,4.0,355,2026-03-31,0,0,low_rating|not_responding|high_volume,Priority A,""Felt rushed during consult; results okay."",,Owner/Clinic Manager,,,
MED-002,Contour MedSpa,med_spa,Dallas,TX,https://example.com,214-555-0133,https://maps.google.com/?q=Contour+MedSpa+Dallas+TX,4.6,540,2026-03-27,1,0.1,not_responding|high_volume,Priority A,""Best Botox experience—natural results."",,Owner/Clinic Manager,,,
MED-003,Renew Skin Studio,med_spa,Miami,FL,https://example.com,305-555-0188,https://maps.google.com/?q=Renew+Skin+Studio+Miami+FL,4.3,180,2026-03-20,0,0,not_responding,Priority B,""Super clean and welcoming."",,Owner/Clinic Manager,,,
... (repeat pattern to 20 med spas)
HVAC-001,Polar Air HVAC,hvac_plumbing,San Diego,CA,https://example.com,619-555-0155,https://maps.google.com/?q=Polar+Air+HVAC+San+Diego+CA,4.2,265,2026-03-30,0,0,not_responding|high_volume,Priority A,""Technician was on time and explained everything."",,Owner/General Manager,,,
HVAC-002,RapidRooter Plumbing,hvac_plumbing,Atlanta,GA,https://example.com,404-555-0177,https://maps.google.com/?q=RapidRooter+Plumbing+Atlanta+GA,3.8,190,2026-03-25,0,0,low_rating|not_responding,Priority B,""Quoted one price then invoice was higher."",,Owner/General Manager,,,
... (repeat pattern to 20 HVAC/plumbing)

## 2) Prospecting Plan (what to pull first)

### Vertical priorities
1) Med spas (often high review velocity + high margin + sensitive brand tone)
2) Dentists (steady volume + strong LTV)
3) HVAC/Plumbing (high urgency + many review requests, often poor response discipline)

### Start with Priority A only (first 200 sends)
- Goal: fastest reply rate by targeting businesses with obvious response gaps and active review inflow.

### Agency/reseller lane (parallel)
Target: local SEO agencies, reputation management firms, PPC agencies serving dentists/med spas/home services.
Filters:
- Look for agencies listing “Google Business Profile”, “local SEO”, “reputation management”
- Roles: Founder/Owner, Head of SEO, Account Manager
Offer: white-label review response autopilot + weekly KPI report.

## 3) Cold Email Sequences (3-step) — references website + contact email

### Universal tokens
- {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_observation}}, {{rating}}, {{review_count}}

### Sequence A: Not Responding (local business)
**Email 1 — Subject options:**
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed you’re getting reviews (but few replies)
3) {{business_name}} — want us to handle review replies?

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. It looks like many recent reviews aren’t getting a response ({{response_gap_observation}}).

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google Business Profile + Yelp, escalates negatives, and sends a weekly KPI report. You can approve replies before anything posts.

If helpful, I can show you what we’d reply to your last 3 reviews and how we’d handle a negative escalation—no commitment.

Can I send 3 draft replies for {{business_name}}?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (2–3 days later):**
Subject: Want the 3 draft replies?
Hi {{first_name}}, quick bump—still happy to send 3 draft replies based on your latest reviews. The goal is simple: respond within ~12 hours, keep tone consistent, and catch negatives early.

Should I send them?
— Bob

**Follow-up 2 (5–7 days later):**
Subject: Close the loop
If review replies aren’t a priority right now, no worries. If you want, I’ll send a 1-page summary: your current response rate (last 10 reviews) + a “what good looks like” template for your team.

Reply “summary” and I’ll send it.
— Bob

### Sequence B: Low Rating (local business)
Angle: risk + recovery + escalation.

Email 1 subject options:
1) Quick win to protect {{business_name}}’s rating
2) Fixing review damage (without sounding robotic)
3) A simple review-response system for {{business_name}}

Body:
Hi {{first_name}},

Noticed {{business_name}} is at ~{{rating}} on Google with {{review_count}} reviews. A recent review said: “{{recent_review_snippet}}”.

When ratings dip, the fastest lever is consistent, high-quality responses + a clean escalation path for negatives. Our autopilot drafts brand-safe replies for Google/Yelp, flags negatives for human follow-up, and reports weekly reputation KPIs.

Would it be useful if I sent a suggested response to that review (and 2 others) that’s calm, compliant, and de-escalating?

— Bob
(website + email signature as above)

Follow-ups mirror Sequence A.

### Sequence C: High Volume (local business)
Angle: throughput + consistency + time savings.

Email 1 subject options:
1) Handling review volume at {{business_name}}
2) Keep up with Google reviews in 12 hours
3) Review replies—done for you

Body:
Hi {{first_name}},

{{business_name}} gets a lot of reviews ({{review_count}}). Most teams fall behind simply because responding takes time.

We built an autopilot that drafts on-brand replies for Google/Yelp, routes negatives for approval/escalation, and sends a weekly KPI report. You can set tone rules (friendly/clinical/concise) and approve before posting.

Open to a 10-minute walkthrough? If not, I can send 3 example replies tailored to your latest reviews.

— Bob
(website + email signature)

### Agency/Reseller Email (initial)
Subject options:
1) White-label review reply autopilot for your clients
2) Add Google/Yelp review responses to your retainers
3) Quick idea for your local SEO accounts

Body:
Hi {{first_name}},

If you manage Google Business Profiles for local clients: we built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies (Google + Yelp), escalates negatives, and emails a weekly KPI report.

It’s designed to be resold/white-labeled as an add-on for dentists, med spas, and home services—so your team doesn’t spend hours writing responses.

Want me to send a short partner overview and example client report?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-nnj9kx2i.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 4) Daily Sending Ops Checklist + CRM stages

### CRM stages (minimal)
Prospect (not contacted) → Sent (Email 1) → Follow-up 1 Sent → Follow-up 2 Sent → Replied → Qualified → Demo Booked → Trial/POC → Paid → Lost

### 14-day ramp (per inbox)
- Days 1–2: 10/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Week 2: 40–50/day
Rules: keep bounces <3%, complaints ~0, pause if bounces spike.

### Daily routine (60–90 minutes)
1) Pull 25–50 new prospects from Priority A
2) QA sample 10% (category match, real website, review snippet exists, correct city)
3) Personalize first line using latest review snippet + response gap
4) Send Email 1
5) Process replies within 12 business hours: label (Interested/Not now/Wrong person)
6) Book demos using a simple 2-option CTA: “send 3 draft replies” or “10-min walkthrough”

### Weekly routine
- Monday: refresh leads (new reviews last 14 days)
- Wednesday: agency lane outreach (20–50/week)
- Friday: KPI review (sent, delivered, replies, demos, trials, paid)

## 5) What I still need from owner to finish the 500–1,000 CSV
Choose ONE geography scope:
A) Top 25 US metros (fastest + consistent)
B) 5–10 target states (tight ops)
C) US-wide (broad, more QA)

Once chosen, use the template + segmentation rules above to scale from 60 to 500–1,000 rows.