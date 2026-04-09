# Outbound Pipeline Kit (Zero-Cost): Lead CSV Template + Sample Rows, 3-Step Cold Email (Segmented), Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T20:18:36.764Z

---

## 1) Initial scope (so we can execute)
**Geography (v1): Top 10 US metros**
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA.

**Verticals:** Dentists, Med Spas/Aesthetic clinics, HVAC/Plumbing (home services)
**Agency lane:** Local SEO / marketing agencies serving these verticals.

---
## 2) Lead list CSV template (headers)
Copy/paste as the first row of your CSV/Google Sheet:

business_name,vertical,segment,priority_tier,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_reviews_owner_replies,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,personalization_type,notes

### Segmentation rules (apply after collection)
- **not_responding** if response_rate_proxy <= 0.2 OR last_10_reviews_owner_replies = 0
- **low_rating** if google_rating < 4.2
- **high_volume** if review_count >= 200 OR (TODAY - last_review_date) <= 14 days
- **agency** if vertical = agency (use segment=agency)

### Priority tier rubric
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only
- **Priority A (agency):** agencies that advertise “reputation management” OR manage GBP for multi-location

---
## 3) Sample dataset (25 rows; replace with real leads as you build)
Note: These are **example rows** to validate workflow; replace with real businesses from Google Maps.

business_name,vertical,segment,priority_tier,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_reviews_owner_replies,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,personalization_type,notes
Example Dental Group,dentist,not_responding,Priority A,"Dallas, TX",https://example.com,(555) 111-0101,https://maps.google.com/?q=Example+Dental+Group,4.6,315,2026-03-28,0.1,1,,,info@example.com,,"Loved the hygienist and quick visit" ,quote,"High volume + low response proxy"
Example Smiles Dentistry,dentist,high_volume,Priority C,"Phoenix, AZ",https://example.org,(555) 111-0102,https://maps.google.com/?q=Example+Smiles+Dentistry,4.8,520,2026-04-02,0.6,6,,,office@example.org,,"Best dentist I’ve had in years" ,quote,"High volume only"
Example Family Dental,dentist,low_rating,Priority B,"Chicago, IL",https://example.net,(555) 111-0103,https://maps.google.com/?q=Example+Family+Dental,3.9,240,2026-03-30,0.3,3,,,admin@example.net,,"Front desk was rude" ,quote,"Low rating + high reviews"
Example Aesthetic Studio,med_spa,not_responding,Priority A,"Los Angeles, CA",https://example.com/aesthetics,(555) 111-0104,https://maps.google.com/?q=Example+Aesthetic+Studio,4.5,410,2026-04-01,0.0,0,,,hello@example.com,,"Results were great but scheduling was hard" ,quote,"No replies in last 10"
Example Med Spa & Skin,med_spa,low_rating,Priority A,"New York, NY",https://example.com/skin,(555) 111-0105,https://maps.google.com/?q=Example+Med+Spa+Skin,4.1,690,2026-04-03,0.2,2,,,contact@example.com,,"Felt rushed during consult" ,quote,"Low rating + high volume"
Example Plumbing Co,home_services,high_volume,Priority C,"Houston, TX",https://example.com/plumbing,(555) 111-0106,https://maps.google.com/?q=Example+Plumbing+Co,4.7,260,2026-03-31,0.5,5,,,service@example.com,,"Tech arrived on time and fixed leak" ,quote,"Great but needs throughput"
Example HVAC & Heating,home_services,not_responding,Priority B,"San Diego, CA",https://example.com/hvac,(555) 111-0107,https://maps.google.com/?q=Example+HVAC+Heating,4.4,180,2026-03-29,0.1,1,,,support@example.com,,"No one called me back after quote" ,quote,"Response gap angle"
Example Rooter Pros,home_services,low_rating,Priority B,"Philadelphia, PA",https://example.org/rooter,(555) 111-0108,https://maps.google.com/?q=Example+Rooter+Pros,4.0,155,2026-03-27,0.3,3,,,help@example.org,,"Price changed from estimate" ,quote,"Low rating"
Example Local SEO Agency,agency,agency,Priority A,"San Jose, CA",https://example.com/agency,(555) 111-0109,https://maps.google.com/?q=Example+Local+SEO+Agency,4.9,85,2026-04-01,, ,,,bizdev@example.com,,"We manage GBP + local SEO for clinics" ,paraphrase,"Pitch reseller margin"
Example Marketing Partners,agency,agency,Priority B,"Dallas, TX",https://example.net/marketing,(555) 111-0110,https://maps.google.com/?q=Example+Marketing+Partners,4.6,40,2026-03-20,, ,,,hello@example.net,,"Reputation management add-on" ,paraphrase,"Smaller agency"

(Continue replacing with real rows until you reach 500–1,000.)

---
## 4) 3-step cold email sequence (with segment-based openers)
Use these tokens: {{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_observation}}, {{google_rating}}, {{review_count}}, {{last_review_date}}, {{your_name}}.

### Email 1 (Initial)
**Subject options (pick 1):**
1) Quick question about {{business_name}} reviews
2) Noticed a response gap on your Google reviews
3) 12-hour review replies for {{business_name}}

**Body:**
Hi {{first_name}} —

I was looking at {{business_name}}’s Google reviews and noticed: {{personalized_opener}}

We run an **AI Review Reply & Reputation Autopilot** for local businesses: brand-safe draft replies to Google/Yelp reviews, negative-review escalation, and a weekly KPI email.

**What you get (free this week):**
- Replies drafted within **12 hours**
- You can **approve/edit** before anything posts
- Escalate 1–2 star issues to you instantly (so you can recover the customer)

If I send you 3 example replies based on your most recent reviews, would you like them sent to this email?

— Bob Smith
AI Review Reply & Reputation Autopilot
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

**Choose the segment opener (paste into {{personalized_opener}}):**
- **Not responding:** “a few recent reviews don’t look like they received an owner response (customers mentioned: ‘{{recent_review_snippet}}’).”
- **Low rating:** “your rating is around {{google_rating}} and a couple recent reviews mention: ‘{{recent_review_snippet}}’ (these are usually recoverable with fast, calm replies + escalation).”
- **High volume:** “you’re getting steady volume (~{{review_count}} reviews) and your newest review was {{last_review_date}} — responding consistently tends to lift conversions.”
- **Agency:** “you already manage local marketing for clients; this can be a white-label add-on so your team isn’t stuck writing replies.”

### Email 2 (Follow-up #1) — 2 days later
**Subject:** Re: {{business_name}} review replies

Hi {{first_name}} — quick follow-up.

If you want, I can draft **5 replies** for {{business_name}} (mix of positive + negative) using your brand voice. You can approve them before posting.

Should I send:
A) Google only
B) Yelp only
C) Both

— Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 3 (Follow-up #2) — 4 days later
**Subject:** Close the loop?

Hi {{first_name}},

Totally fine if now isn’t a priority. Last check: would it be helpful if we:
- respond to every new review within 12 hours,
- flag 1–2 star reviews to you immediately,
- and send a weekly reputation KPI snapshot?

Reply with “yes” and I’ll send the draft-reply examples. Reply with “no” and I’ll close the loop.

— Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---
## 5) Daily sending ops (zero-cost) + 14-day ramp
### Free tool stack
- **Leads + segmentation:** Google Sheets
- **Sending:** Gmail (one inbox)
- **CRM:** HubSpot Free CRM (or a Google Sheet pipeline)

### 14-day ramp (single inbox)
- Days 1–2: 10/day (manual send, personalize first line)
- Days 3–4: 15/day
- Days 5–7: 20/day
- Days 8–10: 25/day
- Days 11–14: 30/day
Hard stop if bounce rate > 5% in a day; clean list before continuing.

### Daily checklist (60–90 minutes)
1) Add 20–30 new leads to sheet (Top 10 metros x one vertical)
2) Fill: rating, review_count, last_review_date; compute response proxy from last 10 reviews
3) Assign segment + Priority tier
4) Send new emails to **Priority A first**, then Priority B
5) Log in CRM: Sent date, template used, follow-up due date
6) Reply handling SLA: respond within 2 hours during business day

### Weekly checklist
- QA sample: 30 leads (wrong category? missing website? franchise? duplicates?)
- KPI: sends, replies, positive replies, demos booked, trials started

---
## 6) CRM stages (simple)
1) **Prospect (Unsent)**
2) **Sent (Email 1)**
3) **Follow-up Scheduled**
4) **Replied – Interested**
5) **Qualified (has GBP/Yelp access + real review volume)**
6) **Demo Booked**
7) **Trial Active (7 days free)**
8) **Won (Paid later)**
9) **Lost / Not now**

Exit criteria example: move to Qualified only if they confirm they control Google Business Profile/Yelp account or can add us as manager.
