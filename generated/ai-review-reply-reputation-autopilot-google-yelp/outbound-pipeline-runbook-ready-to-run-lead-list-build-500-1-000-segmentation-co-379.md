# Outbound Pipeline Runbook (Ready-to-Run): Lead List Build (500–1,000), Segmentation, Cold Email (3-step), Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:53:48.505Z

---

## 1) Targeting: verticals + geography (Top 25 US metros)
**Verticals (direct-to-local):** Dental practices, Med Spas/Aesthetic clinics, HVAC + Plumbers.
**Geography:** Top 25 US metros (use any subset to start): New York, Los Angeles, Chicago, Dallas, Houston, Atlanta, Washington DC, Miami, Philadelphia, Phoenix, Boston, San Francisco, Riverside, Detroit, Seattle, Minneapolis, San Diego, Tampa, Denver, Baltimore, St. Louis, Orlando, Charlotte, San Antonio, Portland.

## 2) Lead list build (500–1,000) — Google Maps zero-cost workflow
### 2.1 CSV columns (copy into Google Sheets header row)
`business_name,vertical,category_guess,city_state,metro,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,notes`

### 2.2 Exact Google Maps query strings (paste into Google Maps)
Run each query, open listings in new tabs, and capture fields.
**Dentists**
- "dentist" + "{metro}"  
- "cosmetic dentist" + "{metro}"  
- "pediatric dentist" + "{metro}"

**Med spas**
- "med spa" + "{metro}"  
- "aesthetic clinic" + "{metro}"  
- "botox" + "{metro}" (filter to clinics)

**HVAC / Plumbers**
- "HVAC" + "{metro}"  
- "air conditioning repair" + "{metro}"  
- "plumber" + "{metro}"  

### 2.3 Data capture steps per business (5–8 minutes per lead)
1) Open Google Business Profile listing (Maps). Copy **business_name**, **phone**, **website**, **maps URL**, **rating**, **review_count**.
2) Click **Reviews** → sort by newest. Capture:
   - **last_review_date** (date of most recent review)
   - **last_review_excerpt** (1–2 sentences max). If unsure about quoting, paraphrase.
3) Compute **response_rate_proxy_last10**: look at the most recent 10 reviews; count how many have an owner/management reply. Proxy = replies/10 (e.g., 0.2).
4) Find email(s):
   - Visit website → Contact page + footer.
   - If none, use About/Team page for manager names.
   - If still none, capture a contact form URL in notes and leave email blank (still usable for calls/DMs).

### 2.4 Segmentation rules (put into sheet as formulas or manual tags)
**Segments (can be multiple; choose primary based on priority rubric):**
- **not_responding:** response_rate_proxy_last10 <= 0.2 OR 0 replies visible in last 10
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count >= 200 OR last_review_date within last 14 days

**Priority rubric (single label):**
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

## 3) Cold email sequences (3-step) — includes legitimacy URL + contact email
**Personalization tokens to fill:** {{first_name}}, {{business}}, {{city}}, {{recent_review_snippet}}, {{gap_note}}, {{vertical_word}}.
**Legitimacy:** Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  | Email: agent_bob_replit+review-bot@agentmail.to

### 3.1 Email #1 (pick opener by segment)
**Subject options (rotate):**
- Quick fix for {{business}}’s reviews
- Noticed a review response gap
- 12-hour review replies for {{business}}

**Body:**
Hi {{first_name}} — quick note after seeing {{business}} on Google.

{{SEGMENT OPENER}}

We run an **AI Review Reply & Reputation Autopilot** that drafts (and can post) brand-safe responses to Google Business Profile + Yelp reviews, escalates negatives, and sends weekly KPI reporting.

**Simple promise:** new reviews get a response within **12 hours**. You can approve everything before it posts.

Worth a 10-minute look? If you reply “yes,” I’ll send 2–3 sample responses using your recent reviews.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Segment openers:**
- **not_responding:** “I noticed several recent reviews don’t have an owner response (e.g., ‘{{recent_review_snippet}}’). That’s usually leaving easy trust on the table.”
- **low_rating:** “I saw your rating is around {{google_rating}}. A lot of businesses recover quickly by responding consistently + escalating the few negatives fast.”
- **high_volume:** “Looks like you’re getting steady review volume. Keeping up with replies is a real ops load — and speed matters for conversions.”

### 3.2 Follow-up #1 (2–3 days later)
**Subject:** Re: {{business}} reviews
Body:
Hi {{first_name}} — circling back.

If it’s helpful, I can send a **before/after** example of how we’d respond to:
- a 5-star review (short + branded)
- a neutral review (repair tone)
- a 1-star review (escalation + resolution language)

Want me to draft those for {{business}} based on your latest reviews?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 3.3 Follow-up #2 (5–7 days later)
**Subject:** Close the loop?
Body:
Hi {{first_name}} — should I close the loop here?

If review management is already handled, no worries. If not, the smallest version of this is:
1) we monitor Google + Yelp,
2) draft replies within 12 hours,
3) you approve (or we auto-post based on rules),
4) weekly KPI email (rating trend, response rate, negative escalations).

Is review response speed a priority for {{business}} this month?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nnuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 4) Daily sending ops (14-day ramp) + QA thresholds
### 4.1 Minimum viable stack (free)
- 1 inbox (existing) + manual sending (Gmail UI) + Google Sheets CRM.
- Track: reply status + next follow-up date.

### 4.2 Ramp schedule (per inbox)
Day 1–2: 20/day (mostly Priority A/B)  
Day 3–4: 30/day  
Day 5–7: 40/day  
Day 8–10: 60/day  
Day 11–14: 80–100/day  

Rules:
- If bounce rate > 3% in a day: pause, clean list.
- If spam complaints/non-delivery warnings: cut volume 50% and remove aggressive subject lines.
- Only send Mon–Fri during local business hours.

### 4.3 List QA sampling (daily)
- Sample 20 leads/day before sending:
  - Website matches business
  - Correct vertical
  - Not a franchise directory listing
  - Email present OR alternate contact path noted
  - Recent review snippet is safe (no medical/legal promises; paraphrase if sensitive)

## 5) CRM stages (Google Sheet columns or CRM pipeline)
Stages + entry criteria:
1) **Prospect** (in list, not contacted)
2) **Sent** (Email #1 sent; date recorded)
3) **Follow-up Due** (timer hit; next email scheduled)
4) **Replied** (any reply)
5) **Qualified** (confirms they manage reviews + pain exists)
6) **Demo Booked** (calendar invite)
7) **Trial** (connected GBP/Yelp or sharing review screenshots)
8) **Paid** (invoice/subscription)
9) **Lost** (no fit/ghost/handled internally)

## 6) Daily activity targets (starting point)
- Send: 40–80/day (ramp) across Priority A/B first
- Follow-ups: 20–40/day
- Personalization: minimum 1 line (review snippet + response gap) for Priority A
- Goal KPI: 3–8% positive reply rate in first 2 weeks; if <2%, tighten targeting to not_responding + high_volume.
