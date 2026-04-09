# Outbound Pipeline Execution Kit (Lead List Template + Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops) — AI Review Reply & Reputation Autopilot

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T01:46:28.767Z

---

BUSINESS / LEGITIMACY LINK (include in outreach when helpful)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

1) LEAD LIST CSV TEMPLATE (READY HEADERS)
Copy/paste as the first row of your CSV/Google Sheet:
business_name,vertical,category_on_maps,city,state,full_address,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,owner_response_in_last_10 (Y/N),responses_in_last_10 (0-10),response_rate_proxy (0-1),segment_not_responding (Y/N),segment_low_rating (Y/N),segment_high_volume (Y/N),priority_tier (A/B/C),contact_name,contact_role,contact_email_1,contact_email_2,contact_source (website/about/gbp/yelp/linkedin),personalization_hook,notes

Data dictionary (how to fill fast):
- google_rating, review_count: from Google Business Profile panel.
- last_review_date: date of most recent review visible.
- last_review_excerpt: first 8–20 words; OK to paraphrase if safer.
- responses_in_last_10: count owner replies in the latest 10 reviews.
- response_rate_proxy = responses_in_last_10 / 10.
- segment rules:
  • not_responding = response_rate_proxy <= 0.2 OR responses_in_last_10 = 0
  • low_rating = google_rating < 4.2
  • high_volume = review_count >= 200 OR last_review_date within 14 days
- priority_tier:
  • A = (not_responding AND high_volume) OR (low_rating AND high_volume)
  • B = not_responding OR low_rating
  • C = high_volume only
- personalization_hook: combine a snippet + the gap. Example: “Saw a recent review mentioning ‘front desk wait time’ and noticed there aren’t replies on most recent reviews.”

2) SEGMENTED PROSPECTING PLAN (WHO TO PULL + WHY)
Verticals (start with 2 for speed; keep 3rd as overflow):
A) Dental practices (high value per patient, reputation-sensitive)
B) Med spas/aesthetic clinics (review velocity + competition)
C) HVAC/Plumbing (calls driven by ratings + rapid review cadence)

Recommended initial geo scope if undecided: Top metros only (quality + density) — New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, Austin, San Jose, Jacksonville, San Francisco, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, Washington DC, Nashville, Oklahoma City, El Paso, Boston, Las Vegas.

Google Maps query footprints (copy/paste into Google Maps):
- Dental: “dentist in {CITY}”, “cosmetic dentist in {CITY}”, “dental implants in {CITY}”, “orthodontist in {CITY}”
- Med spa: “med spa in {CITY}”, “aesthetic clinic in {CITY}”, “botox in {CITY}”, “laser hair removal in {CITY}”
- HVAC/Plumbing: “HVAC in {CITY}”, “air conditioning repair in {CITY}”, “plumber in {CITY}”, “drain cleaning in {CITY}”

Daily lead production targets (zero-cost/manual):
- 1 researcher/VA: 40–60 complete rows/day (with response proxy + snippet)
- 2 researchers/VAs: 80–120 rows/day
- Goal: first 200 rows in 48 hours; then scale to 500–1,000 within 7–10 working days.

List QA rules (avoid junk leads):
- Exclude: franchises with corporate review teams (unless franchisee-owned), businesses with no website, categories that don’t match the vertical, duplicates, businesses outside geo.
- Prefer: independent locations, recent reviews in last 30 days, review_count >= 50.

3) COLD EMAIL SEQUENCES (3-STEP) — DIRECT TO LOCAL BUSINESSES
IMPORTANT: Insert the legitimacy URL when you anticipate skepticism (especially first-touch). Keep personalization short.

Tokens:
{{FirstName}} {{BusinessName}} {{City}} {{Vertical}} {{RecentSnippet}} {{ResponseGap}} {{Rating}} {{ReviewCount}} {{LegitimacyURL}}
Use: {{LegitimacyURL}} = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

3A) DENTAL — Not Responding (Priority A/B)
Subject options:
1) Quick help replying to Google reviews for {{BusinessName}}
2) {{BusinessName}}: you’ve got reviews coming in (reply gap)
3) Re: Google review responses for your practice

Email 1:
Hi {{FirstName}} — I was looking at {{BusinessName}}’s Google reviews in {{City}} and noticed {{ResponseGap}}.

Example: one recent review said “{{RecentSnippet}}” and there wasn’t a response.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies to Google (and Yelp), escalates negative reviews, and sends weekly reputation KPIs. You can approve before anything posts.

If you want, I can show you 3 ready-to-post replies for your most recent reviews and the workflow (12-hour response SLA).

Want me to send the 3 drafts?

(If helpful for legitimacy: {{LegitimacyURL}})

— {{YourName}}

Follow-up 1 (Day 3):
Hi {{FirstName}} — still happy to send 3 draft replies for {{BusinessName}}’s newest reviews.

Most practices see more calls/bookings simply by responding consistently (and calmly) to concerns.

Should I send the drafts here, or is there someone else who owns reputation/reviews?

— {{YourName}}

Follow-up 2 (Day 7):
{{FirstName}}, should I close the loop?

If replying is already handled internally, no worries. If not, we can take it over with approval + escalation for negatives.

Reply “drafts” and I’ll send the 3 suggested responses.

— {{YourName}}

3B) DENTAL — Low Rating (Priority A/B)
Subject: {{BusinessName}} — quick reputation win (before next reviews)

Email 1:
Hi {{FirstName}} — noticed {{BusinessName}} is at {{Rating}} on Google with {{ReviewCount}} reviews.

When a practice gets even a few unresolved negatives, prospective patients often bounce.

We help by drafting brand-safe responses (Google + Yelp), escalating negatives, and reporting weekly KPIs. You approve responses before posting.

If you share the last 3 negative reviews you want handled first, I’ll draft responses that de-escalate and protect the brand.

Open to a 10-min walkthrough?

(Reference: {{LegitimacyURL}})

— {{YourName}}

Follow-ups: same timing as above; CTA is “Want the 3 draft responses for your toughest reviews?”

3C) MED SPA — High Volume / Not Responding
Subject: Keeping up with new reviews at {{BusinessName}}

Email 1:
Hi {{FirstName}} — looks like {{BusinessName}} gets frequent reviews in {{City}} ({{ReviewCount}} total).

I saw a recent one: “{{RecentSnippet}}” — and noticed {{ResponseGap}}.

We run an AI review-reply autopilot for Google + Yelp: drafts on-brand responses, flags negatives for escalation, and sends a weekly KPI report. You can approve before anything posts.

Want me to send 3 draft replies for your latest reviews so you can see tone/quality?

{{LegitimacyURL}}

— {{YourName}}

3D) HVAC/PLUMBING — Not Responding (speed angle)
Subject: Replying to reviews fast = more calls ({{BusinessName}})

Email 1:
Hi {{FirstName}} — quick note: I saw “{{RecentSnippet}}” on {{BusinessName}}’s Google reviews and noticed {{ResponseGap}}.

For home services, fast, professional responses tend to improve conversion (people read how you handle issues).

Our autopilot drafts brand-safe replies for Google/Yelp, escalates negatives, and sends weekly reputation KPIs. You approve before posting; we can respond within 12 hours.

Want 3 draft responses for your newest reviews?

{{LegitimacyURL}}

— {{YourName}}

4) AGENCY / RESELLER LANE (BULK DEALS)
Target: local marketing agencies, SEO shops, website studios serving dentists/med spas/home services.
Search footprints:
- “dental marketing agency {city/state}”
- “med spa marketing agency”
- “HVAC marketing agency”
- “local SEO agency {city}”
Roles: owner, account director, client success, ops.

Agency Email 1:
Subject: Add review responses as an easy upsell for your clients

Hi {{FirstName}} — do you manage Google Business Profile / local SEO for any dentists, med spas, or home service companies?

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe Google + Yelp responses, escalates negatives, and sends weekly reputation KPIs. It’s designed to be resold (you keep margin) or used as a fulfillment layer.

If you tell me your client vertical mix, I’ll share:
1) a white-label workflow,
2) suggested pricing, and
3) a sample weekly KPI report.

Reference page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 15-min chat this week?

— {{YourName}}

5) DAILY SENDING OPS + CRM STAGES (OWNER EXECUTION)
CRM stages (minimum):
1) Prospects Loaded (has email + segment)
2) Sent (E1)
3) Follow-up 1 Sent
4) Follow-up 2 Sent
5) Replied — Positive
6) Replied — Not Now
7) Replied — Unsubscribe/Negative
8) Qualified (meets ICP + has review pain)
9) Demo Booked
10) Trial/Proof (you draft 3 replies)
11) Paid
12) Lost

14-day sending ramp (per inbox; keep conservative if new):
- Days 1–2: 10–15/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day
If multiple inboxes, multiply totals. Stop/rate-limit if bounce rate >3% or spam complaints >0.1%.

Daily checklist:
- Pull 50–100 new prospects from sheet (prioritize Priority A)
- QA sample 10% rows (website present, correct vertical, no duplicates)
- Send Email 1 to new prospects
- Send Follow-up 1 to Day-3 cohort; Follow-up 2 to Day-7 cohort
- Reply SLA: respond to positive replies same day; offer “I’ll send 3 draft replies” immediately
- Log outcomes in CRM (Positive/Not now/Unsub)

Reply handling playbook:
- If they ask price: respond with simple tiering and offer a short call.
- If they say “we do it ourselves”: ask if you can send 3 drafts for comparison + offer overflow coverage.
- If negative review crisis: propose escalation workflow + approval gate.

Owner action needed to start execution today:
- Decide geography for the first list pull.
- Build first 200 leads using the template.
- Start sending to Priority A first using the matching segment email.
