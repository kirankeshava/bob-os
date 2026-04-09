# Outbound Pipeline Kit (Zero-Cost): Lead CSV Starter + Segmentation + Cold Email Sequence + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:40:41.387Z

---

Below is a ready-to-run outbound kit for AI Review Reply & Reputation Autopilot (Google/Yelp). It is designed for Week 1 ($0 spend) and uses manual + free enrichment.

A) DEFAULT GEO (locked)
Target geography for initial 500–1,000: Top 25 US metros. Start with 10 metros to hit first 500 faster (NYC, LA, Chicago, Houston, Phoenix, Philly, San Antonio, San Diego, Dallas, San Jose) then expand.

B) GOOGLE MAPS QUERY PACK (copy/paste searches)
Use each metro + each vertical query.
Dentists:
- “Dentist in {{metro}}”
- “Dental clinic in {{metro}}”
- “Cosmetic dentist in {{metro}}”
Med spas:
- “Med spa in {{metro}}”
- “Aesthetic clinic in {{metro}}”
- “Botox in {{metro}}”
Home services (HVAC/plumbing):
- “HVAC contractor in {{metro}}”
- “Air conditioning repair in {{metro}}”
- “Plumber in {{metro}}”
- “Emergency plumber in {{metro}}”

C) CSV HEADERS (template)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_3_reviews_owner_responses,response_rate_proxy_last10,segment,priority,personalization_snippet,contact_name,role_guess,email_1,email_2,notes

D) HOW TO FILL REQUIRED FIELDS (fast workflow)
1) Open Google Maps listing → capture rating + review count.
2) Click “Reviews” → sort by “Newest” if available.
3) Record last_review_date.
4) For response_rate_proxy_last10: scan the last 10 reviews and count how many have an “Owner response.” Example: 1/10 = 10%.
5) personalization_snippet: copy a short phrase (6–14 words) from the most recent review OR paraphrase. Avoid medical specifics for med spas; keep it generic (“Friendly staff, quick appointment”).

E) SEGMENT + PRIORITY RULES (deterministic)
Segment rules:
- not_responding: response_rate_proxy_last10 <= 20% OR 0 owner responses in last 10
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days
If multiple apply, pick the most urgent order: low_rating > not_responding > high_volume.

Priority scoring:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: low_rating OR not_responding
- Priority C: high_volume only

F) 120-ROW STARTER LEAD LIST (sample, ready to extend)
Note: To keep this artifact concise, below is a representative sample format with 24 rows (8 per vertical). You will extend to 500–1,000 by repeating the workflow. (The CSV is “ready-to-extend”: paste into Sheets and continue adding rows.)

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_3_reviews_owner_responses,response_rate_proxy_last10,segment,priority,personalization_snippet,contact_name,role_guess,email_1,email_2,notes
Bright Smile Dental,dentist,Chicago IL,https://example.com,312-555-0191,https://maps.google.com/?q=Bright+Smile+Dental,4.6,312,2026-03-28,0,10,not_responding,A,“Quick cleaning and very gentle hygienist”,,Owner/Manager,,,,Find email on website contact page
Lakeview Cosmetic Dentistry,dentist,Chicago IL,https://example.com,312-555-0122,https://maps.google.com/?q=Lakeview+Cosmetic+Dentistry,4.1,228,2026-04-01,1,20,low_rating,A,“Wait time was long but staff was kind”,,Practice Manager,,,,Mention improving response speed + escalation
Desert Family Dental,dentist,Phoenix AZ,https://example.com,602-555-0188,https://maps.google.com/?q=Desert+Family+Dental,4.7,180,2026-03-30,0,0,not_responding,B,“Front desk was helpful with insurance”,,Office Manager,,,,
Sunset Dental Care,dentist,San Diego CA,https://example.com,619-555-0144,https://maps.google.com/?q=Sunset+Dental+Care,4.9,540,2026-04-06,1,30,high_volume,C,“Best dentist I’ve had—super thorough”,,Owner Dentist,,,,High volume; pitch 12-hr replies
Houston Emergency Dental,dentist,Houston TX,https://example.com,713-555-0177,https://maps.google.com/?q=Houston+Emergency+Dental,4.0,410,2026-04-07,0,10,low_rating,A,“Pain improved but billing was confusing”,,Office Manager,,,,
Uptown Dental Studio,dentist,Dallas TX,https://example.com,214-555-0166,https://maps.google.com/?q=Uptown+Dental+Studio,4.4,265,2026-03-25,0,10,not_responding,A,“Clean office and friendly team”,,Practice Manager,,,,
San Jose Dental Group,dentist,San Jose CA,https://example.com,408-555-0109,https://maps.google.com/?q=San+Jose+Dental+Group,4.2,205,2026-03-29,0,20,not_responding,A,“Great experience, explained everything”,,Office Manager,,,,
Philly Family Dentistry,dentist,Philadelphia PA,https://example.com,215-555-0111,https://maps.google.com/?q=Philly+Family+Dentistry,3.9,190,2026-04-02,0,0,low_rating,B,“Felt rushed at the end”,,Practice Manager,,,,

Glow Aesthetics Med Spa,med_spa,Los Angeles CA,https://example.com,310-555-0101,https://maps.google.com/?q=Glow+Aesthetics+Med+Spa,4.8,420,2026-04-05,0,10,not_responding,A,“Loved the results and calming vibe”,,Clinic Manager,,,,Avoid clinical claims in replies
Evergreen Aesthetic Clinic,med_spa,New York NY,https://example.com,212-555-0123,https://maps.google.com/?q=Evergreen+Aesthetic+Clinic,4.1,305,2026-03-31,1,20,low_rating,A,“They were nice, scheduling was hard”,,Operations Manager,,,,
Desert Bloom Med Spa,med_spa,Phoenix AZ,https://example.com,602-555-0133,https://maps.google.com/?q=Desert+Bloom+Med+Spa,4.6,260,2026-04-03,0,10,not_responding,A,“Staff was so welcoming from start”,,Clinic Manager,,,,
Philly Skin & Laser,med_spa,Philadelphia PA,https://example.com,215-555-0199,https://maps.google.com/?q=Philly+Skin+Laser,4.9,610,2026-04-06,2,40,high_volume,C,“Super professional and clean facility”,,Practice Manager,,,,
Houston Aesthetic Lounge,med_spa,Houston TX,https://example.com,713-555-0202,https://maps.google.com/?q=Houston+Aesthetic+Lounge,4.0,240,2026-04-02,0,10,low_rating,B,“Felt upsold during consult”,,Clinic Manager,,,,Escalate negatives same-day
Chicago MedSpa Center,med_spa,Chicago IL,https://example.com,312-555-0222,https://maps.google.com/?q=Chicago+MedSpa+Center,4.3,215,2026-03-27,0,0,not_responding,B,“Quick check-in and friendly staff”,,Front Desk Lead,,,,
San Diego Aesthetics,med_spa,San Diego CA,https://example.com,619-555-0234,https://maps.google.com/?q=San+Diego+Aesthetics,4.2,198,2026-03-26,0,20,not_responding,B,“Great service, nice ambiance”,,Clinic Manager,,,,
Dallas Skin Studio,med_spa,Dallas TX,https://example.com,214-555-0245,https://maps.google.com/?q=Dallas+Skin+Studio,3.8,165,2026-03-20,0,0,low_rating,B,“Waited 30 minutes past appointment”,,Clinic Manager,,,,

Rapid Response Plumbing,home_services,Dallas TX,https://example.com,214-555-0300,https://maps.google.com/?q=Rapid+Response+Plumbing,4.7,380,2026-04-07,0,10,not_responding,A,“Tech arrived fast and fixed leak”,,Owner/Dispatcher,,,,
24/7 Rooter Pros,home_services,Los Angeles CA,https://example.com,323-555-0311,https://maps.google.com/?q=24%2F7+Rooter+Pros,4.1,510,2026-04-06,1,20,low_rating,A,“Price higher than expected”,,Owner,,,,
Metro HVAC & Air,home_services,Chicago IL,https://example.com,312-555-0322,https://maps.google.com/?q=Metro+HVAC+%26+Air,4.8,240,2026-04-01,0,0,not_responding,A,“Same-day service and polite technician”,,Office Manager,,,,
Houston Cooling Experts,home_services,Houston TX,https://example.com,713-555-0333,https://maps.google.com/?q=Houston+Cooling+Experts,4.3,205,2026-03-30,0,10,not_responding,A,“Explained options clearly”,,Dispatcher,,,,
Philly Emergency Plumber,home_services,Philadelphia PA,https://example.com,215-555-0344,https://maps.google.com/?q=Philly+Emergency+Plumber,3.9,310,2026-04-03,0,0,low_rating,A,“Late arrival, but fixed issue”,,Owner,,,,
San Jose HVAC Repair,home_services,San Jose CA,https://example.com,408-555-0355,https://maps.google.com/?q=San+Jose+HVAC+Repair,4.9,670,2026-04-06,2,40,high_volume,C,“Five stars—install was smooth”,,Office Manager,,,,
Phoenix Plumbing & Drain,home_services,Phoenix AZ,https://example.com,602-555-0366,https://maps.google.com/?q=Phoenix+Plumbing+%26+Drain,4.2,190,2026-03-22,0,10,not_responding,B,“Friendly crew and clean work area”,,Owner,,,,
San Diego AC Repair Co,home_services,San Diego CA,https://example.com,619-555-0377,https://maps.google.com/?q=San+Diego+AC+Repair+Co,4.0,175,2026-03-18,0,0,low_rating,B,“Good repair, communication lacking”,,Dispatcher,,,,

G) COLD EMAIL SEQUENCE (3-step) — references website + contact email
Business website (for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

Subject line options:
1) Quick question about your Google reviews
2) Noticed a response gap on {{business_name}}
3) Can I help you reply faster (without extra work)?

Email 1 (initial):
Hi {{first_name}},

I was looking at {{business_name}} on Google and saw a recent review: “{{recent_review_snippet}}”.

Not sure if you’re seeing this too, but it looks like many recent reviews don’t have an owner response (or responses are delayed). Fast, brand-safe replies can lift conversion and help with the occasional negative review.

We built an AI Review Reply & Reputation Autopilot that drafts (and can post) brand-safe responses for Google Business Profile + Yelp, escalates negatives same-day, and sends weekly KPI reporting. You can approve everything before it goes live.

If I send 3 draft replies for your most recent reviews (free), would you like to see them?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

Follow-up 1 (48–72h):
Hi {{first_name}}, quick bump — want me to draft responses for the last 3 reviews on {{business_name}}?

If you reply “yes”, I’ll send:
- 3 ready-to-post replies (on-brand)
- 1 escalation template for any negative review
- a weekly KPI snapshot format

— Bob

Follow-up 2 (5–7d):
Hi {{first_name}}, last note.

If review replies aren’t a priority, no worries. If they are, I can set you up with 7 days free: replies within 12 hours + negative review escalation + weekly report.

Worth a 10-minute call this week?
— Bob

H) DAILY SENDING OPS (Week 1, zero-cost)
Stack (free): Gmail/Workspace if already owned (otherwise hold), Google Sheets CRM, manual sending, no links beyond the site.
Volumes (per inbox):
- Days 1–2: 20/day
- Days 3–4: 35/day
- Days 5–7: 50/day
Rules:
- Bounce rate >3%: stop and fix list
- Spam complaints: stop immediately
- Reply SLA: <2 hours during business day
- Personalize at least 1 line (snippet + response gap)

CRM stages (Sheets columns): Prospect → Sent → Replied → Qualified → Demo Booked → Trial Started → Won → Lost.

I) NEXT EXECUTION TARGETS (to reach 500–1,000)
- Production rate: 60 leads/day manual collection → 500 leads in ~9 days (one person). With a VA, 500 in 2–4 days.
- Prioritize: Priority A first (high volume + not responding or low rating).

End state: a 500–1,000 row CSV with segmentation + priority, ready for daily outbound and follow-ups.