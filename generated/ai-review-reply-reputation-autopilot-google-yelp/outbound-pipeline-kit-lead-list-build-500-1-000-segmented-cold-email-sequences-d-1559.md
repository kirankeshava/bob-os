# Outbound Pipeline Kit — Lead List Build (500–1,000) + Segmented Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T16:38:00.706Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Contact email (from): agent_bob_replit+review-bot@agentmail.to

## 1) ICP + Vertical Focus (start with 3)
**Verticals:** (1) Dentists, (2) Med spas/aesthetic clinics, (3) HVAC + plumbers.  
**Why these:** high review velocity, high LTV per customer, and responsiveness visibly impacts bookings.

### Required fields for each lead (CSV columns)
business_name, vertical, city_state, phone, website, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy_last10, segment, priority_tier, owner_or_manager_name, role_guess, email_1, email_2, personalization_snippet, notes

**Response-rate proxy definition:** count of owner/management responses in the last 10 reviews ÷ 10.

## 2) Segmentation + Priority Rules (use for routing)
### Segments
- **not_responding:** response_rate_proxy_last10 ≤ 0.2 OR 0 owner replies in last 10
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count ≥ 200 OR last_review_date within last 14 days

### Priority tiers
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** (not_responding) OR (low_rating)
- **Priority C:** (high_volume only)

### Template routing
- not_responding → “Response gap / speed” variant
- low_rating → “Brand-safe + escalation” variant
- high_volume → “Ops/throughput + weekly KPI reporting” variant

## 3) Lead List Build SOP (zero-cost, repeatable)
### Step-by-step workflow (per lead)
1) Open Google Maps search for the query (examples below).  
2) Open business profile → capture: rating, review count, website, phone, profile URL.  
3) Click reviews → note **last review date** and copy a short **review snippet** (or paraphrase if safer).  
4) Scan last 10 reviews → count owner responses → compute response_rate_proxy_last10.  
5) Assign segment + priority tier using rules above.  
6) Find contact emails (free sources first): website footer/contact page, staff page, “Appointments,” “Contact us,” privacy policy, or domain WHOIS where available.

### Google Maps query pack (by vertical)
Use: "{vertical keyword} in {city, state}" and confirm category matches.

**Dentists**
- “dentist in {CITY}”
- “cosmetic dentist in {CITY}”
- “family dentistry in {CITY}”
- “dental implants in {CITY}”

**Med spas**
- “med spa in {CITY}”
- “aesthetic clinic in {CITY}”
- “botox in {CITY}”
- “laser hair removal in {CITY}”

**HVAC/Plumbing**
- “HVAC in {CITY}”
- “air conditioning repair in {CITY}”
- “plumber in {CITY}”
- “water heater repair in {CITY}”

### QA rules (to avoid junk)
- Exclude: franchises with corporate review teams (unless clearly local owner-run), businesses with no website, and listings with < 20 reviews (unless very recent high velocity).
- Verify category matches vertical.
- Ensure last_review_date is present.
- Ensure google_maps_url works.

### Production targets (manual)
- 1 person can do ~30–60 leads/day depending on email availability.
- For 500 leads: plan 10–15 workdays at 35–50/day, or split across verticals.

## 4) Cold Email — 3-Step Sequence (with vertical + segment variants)
**From:** Bob (agent_bob_replit+review-bot@agentmail.to)

### Personalization tokens
- {{first_name}} (optional)
- {{business_name}}
- {{city}}
- {{vertical}}
- {{recent_review_snippet}} (quote or paraphrase)
- {{response_gap}} (e.g., “looks like only 1 of the last 10 reviews has a reply”)

### 4.1 Initial Email (core) — Not Responding Variant
**Subject options:**
1) Quick question about replying to reviews at {{business_name}}  
2) Noticed a review response gap  
3) {{business_name}} reviews (12-hour replies)

**Body:**
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”.

It also looks like there’s a response gap ({{response_gap}}). That’s common when the team is busy, but it leaves revenue on the table because prospects read both the review and the owner reply.

We built an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses for Google + Yelp, escalates negatives for human handling, and sends weekly KPI reporting. You can **approve before anything posts**, and we aim to respond within **12 hours**.

If I send 2–3 drafted replies for {{business_name}} based on your latest reviews (no charge), would you want to see them?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 4.2 Initial Email — Low Rating Variant
**Subject options:**
1) Idea to protect your rating (without sounding canned)  
2) Handling negative reviews at {{business_name}}  
3) Quick fix for reputation follow-up

**Body:**
Hi {{first_name}} — I noticed a recent review mentioning: “{{recent_review_snippet}}”.

When ratings dip (or when a few negatives stack up), the fastest win is usually **tight, brand-safe responses** + an internal escalation loop so the right person can resolve issues quickly.

Our AI Review Reply & Reputation Autopilot drafts replies for Google/Yelp, flags high-risk reviews for escalation, and reports weekly reputation KPIs. **Nothing posts without your approval** if you prefer.

Open to a quick look? I can draft responses to your latest 3 reviews so you can compare tone/quality.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 4.3 Initial Email — High Volume Variant
**Subject options:**
1) Keeping up with review volume at {{business_name}}  
2) 12-hour review replies (Google/Yelp)  
3) Ops question: review response SLA

**Body:**
Hi {{first_name}} — {{business_name}} has strong review volume, and I saw: “{{recent_review_snippet}}”.

If you’re getting steady reviews, the operational challenge becomes consistency: responding fast, staying on-brand, and not missing negatives.

We built an autopilot that drafts Google/Yelp replies, escalates negatives, and sends weekly KPIs (response rate, response time, sentiment flags). You can run it as **approve-then-post** or fully automated once you’re comfortable.

Worth seeing a sample? I can send a few drafted replies for your latest reviews.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

### 4.4 Follow-up 1 (2–3 business days later)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

If I generate a small pack of **ready-to-post** replies for your most recent reviews (Google/Yelp), would you prefer:
1) **Approve-first** (you click yes/no), or  
2) **Auto-post** for 4–5 star reviews + escalate anything negative?

Either way, we’re focused on **12-hour response speed** and brand-safe tone.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 4.5 Follow-up 2 (5–7 business days after follow-up 1)
**Subject:** Should I close the loop?

Hi {{first_name}} — last note from me.

If reviews matter for bookings at {{business_name}}, we can take “replying consistently” off your plate: draft + (optional) post, escalate negatives, and email weekly KPIs.

If it’s not a priority right now, tell me “later” and I’ll circle back in a month.

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 5) Agency/Reseller Lane (marketing agencies)
### Who to target
- Local SEO agencies, web shops, PPC agencies serving dentists/med spas/home services.
- Roles: Owner, Head of SEO, Account Manager.

### Agency initial email
**Subject options:**
1) Add-on offer for your local SEO clients (reviews)  
2) White-label review response autopilot  
3) Quick reseller idea

**Body:**
Hi {{first_name}} — quick idea for your local clients.

We built an **AI Review Reply & Reputation Autopilot** for Google Business Profile + Yelp: brand-safe draft responses, negative-review escalation, and weekly KPI reporting. It’s designed to be **white-labeled** or positioned as your managed service.

If you have clients (dentists/med spas/HVAC) with lots of reviews and low response rates, this is an easy retention + upsell lever.

Want me to send a one-pager + a sample “reply pack” you can show a client?

– Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 6) Daily Sending Ops + 14-Day Ramp
### CRM stages (minimal)
Prospect → Sent → Replied → Qualified → Demo Booked → Trial/Onboarding → Paid → Lost

### Daily activity targets (starting point)
- New emails/day: 30–80 (ramp below)
- Follow-ups/day: 20–60 (as volume grows)
- Optional: 10 owner/manager DMs/day (LinkedIn or Facebook page message if appropriate)

### 14-day ramp (per inbox)
- Days 1–2: 10/day
- Days 3–4: 15/day
- Days 5–6: 20/day
- Days 7–8: 25/day
- Days 9–10: 30/day
- Days 11–14: 35–40/day

### Hygiene + thresholds
- Keep bounce rate < 3%. If >3%: stop, clean list, verify domains.
- Spam/complaints: if any spike occurs, reduce volume and adjust copy.
- Reply SLA: respond to interested replies within 2 hours during business day.

### Personalization safety rule (reviews)
- Prefer short, non-sensitive quotes. If review includes medical details or sensitive info, **paraphrase** and avoid specifics.
- Never imply you’re the owner; write as “team at {{business_name}}” in replies.

## 7) What I need from the Owner to finalize the list build
Choose ONE geography scope for the first 500–1,000 leads:
- **Option A:** Top 25 US metros (fastest to source and high density)
- **Option B:** 5–10 states where you want customers
- **Option C:** US-wide (more variance, slower QA)

Once chosen, run the SOP to produce the CSV and we’ll QA, finalize Priority A/B/C, and start daily sends.
