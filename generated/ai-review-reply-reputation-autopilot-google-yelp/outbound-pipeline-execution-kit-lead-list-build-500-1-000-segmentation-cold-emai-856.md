# Outbound Pipeline Execution Kit — Lead List Build (500–1,000) + Segmentation + Cold Email (3-step) + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:03:32.098Z

---

## 1) Target verticals + geo (lock for first 30 days)
**Verticals:** (1) Dentists, (2) Med spas/aesthetic clinics, (3) HVAC + plumbers (home services)

**Geography (initial pull): Top 25 US metros** to maximize review volume and ability to scale repeatably.
Metro list: New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, San Francisco, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

**Agency lane (parallel): US-wide** (marketing agencies that manage local SEO/GBP for these verticals).

---
## 2) Lead list CSV schema (copy/paste headers)
Recommended headers:
- business_name
- vertical
- metro
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt (1–2 sentences)
- response_rate_proxy_last10 (0–100)
- segment (not_responding | low_rating | high_volume | combo)
- priority (A | B | C)
- owner_or_manager_name
- role_guess
- email_1
- email_2
- linkedin_url (optional)
- notes

**Minimum viable fields** if time-constrained: business_name, vertical, metro, website/phone, google_maps_url, rating, review_count, last_review_date, response_rate_proxy_last10, segment, priority, email_1.

---
## 3) Zero-cost lead sourcing SOP (Google Maps workflow)
### Step A — Pull candidates (queries)
Open Google Maps and use: **{vertical keyword} + {metro}**.
Use these keyword sets:
- Dentists: “dentist”, “dental clinic”, “cosmetic dentist”, “family dentist”
- Med spas: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”, “medical aesthetics”
- Home services: “HVAC”, “air conditioning repair”, “plumber”, “drain cleaning”

For each metro, collect 10–20 businesses per vertical (aim: 25 metros × ~15 results × 3 verticals ≈ 1,125 raw; QA down to 500–1,000).

### Step B — Capture Google metrics
From the GBP panel:
- Rating + review count
- Copy the **Google Maps URL**
- Click **Reviews** → sort by **Newest** → record **last review date** and copy 1–2 sentences into **last_review_excerpt**.

### Step C — Compute response_rate_proxy_last10
Open the newest reviews and check the last **10** reviews:
- Count how many have an **Owner response**.
- response_rate_proxy_last10 = (owner_responses / 10) × 100.

### Step D — Find contact emails (free-first)
1) Visit website → look for Contact / Footer emails.
2) Try common patterns on the site domain:
- info@, support@, hello@, admin@, contact@, office@, appointments@ (dental), scheduling@ (med spa), service@ (HVAC)
3) If no email visible, use contact form URL and record it in notes.

**Note:** If only a form exists, you can still outbound via form + phone follow-up, but prioritize leads with email.

---
## 4) Segmentation + priority scoring (operational rules)
### Segments
- **not_responding:** response_rate_proxy_last10 ≤ 20
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count ≥ 200 OR last_review_date within 14 days

If multiple apply, set segment as combo (e.g., “low_rating+high_volume”).

### Priority
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating (but not A)
- **Priority C:** high_volume only

Routing:
- A → send same day + follow-ups + optional phone call
- B → send within 48 hours
- C → send only after A/B are in-flight

---
## 5) Cold email copy (3-step sequence)
**Personalization tokens:** {{business_name}}, {{metro}}, {{recent_review_excerpt}}, {{response_rate_proxy}}, {{vertical}}

### Email 1 (Initial)
**Subject options (pick 1):**
1) Quick idea for {{business_name}} reviews
2) Noticed a review response gap
3) {{business_name}} — faster, brand-safe review replies

**Body:**
Hi {{first_name}},

I was looking at {{business_name}} on Google and saw a recent review: “{{recent_review_excerpt}}”. It looks like replies aren’t consistent (roughly ~{{response_rate_proxy}}% of the last 10 reviews have an owner response).

We built an **AI Review Reply & Reputation Autopilot** that drafts (and can post) **brand-safe** responses for Google Business Profile + Yelp, escalates negative reviews, and sends a weekly KPI summary.

Offer: we respond within **12 hours**, and you can set it to **approve-before-post**.

If you want, I’ll send 3 example replies for your latest reviews so you can judge quality. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Worth trying for {{business_name}}?

— Bob
agent_bob_replit+review-bot@agentmail.to


### Email 2 (Follow-up #1 — segment-specific nudge)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}},

Quick follow-up. Most {{vertical}} businesses we talk to either:
- miss replies because it’s a time sink, or
- reply inconsistently and lose the “we care” signal to new customers.

If you reply with “yes”, I’ll draft **3 on-brand responses** using your current tone (no posting unless you approve).

— Bob
agent_bob_replit+review-bot@agentmail.to


### Email 3 (Follow-up #2 — low-friction close)
**Subject:** Close the loop?

Hi {{first_name}},

Should I (a) send the 3 sample replies, or (b) not bother you again?

If (a), just tell me: **friendly vs formal tone**, and whether you want **approve-before-post**.

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1


### Agency/reseller version (Email 1)
**Subject:** White-label review reply autopilot for your clients

Hi {{first_name}},

If you manage Google Business Profiles for local clients: we built an **AI Review Reply & Reputation Autopilot** (Google + Yelp) that drafts/posts on-brand replies, escalates negatives, and emails weekly KPIs.

You can run it **white-label / under your agency**, with approve-before-post for safety. Quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

Want to test it on 1 client this week?

— Bob
agent_bob_replit+review-bot@agentmail.to

---
## 6) Daily sending ops + 14-day ramp (free-first)
**CRM stages:** Prospect → Sent → Opened → Replied → Qualified → Demo Booked → Trial → Paid → Lost

**Daily activity targets (once warmed):**
- 50–100 new emails/day
- 50–100 follow-ups/day (automated or manual)
- 10 manual DMs/day (optional: LinkedIn)
- Reply SLA: under 2 hours during business day

**Ramp (single inbox):**
- Days 1–3: 10–15/day
- Days 4–7: 20–30/day
- Days 8–14: 40–60/day
Then add inboxes if needed (keeping per-inbox caps conservative).

**Hygiene + QA rules:**
- Bounce rate >3%: stop and clean list
- Spam complaints >0.1%: stop and adjust copy/list
- Always include clear identity (Bob) + contact email

---
## 7) What’s needed to produce the actual 500–1,000 CSV
Option 1 (no spend): VA/human follows SOP above; expected throughput 80–150 leads/day depending on email availability.
Option 2 (paid, faster): Google Maps extractor + enrichment (requires owner approval before spending).