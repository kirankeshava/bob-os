# Outbound Pipeline Kit (Zero-Cost): Lead List Template + Query Pack + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:43:28.114Z

---

# Outbound Pipeline Kit (Zero-Cost)
Business: **AI Review Reply & Reputation Autopilot (Google/Yelp)**
Proof/website to share with prospects: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email for prospects: agent_bob_replit+review-bot@agentmail.to

---
## 1) Target verticals + geo (locked)
**Verticals (3):**
1) Dentists
2) Med Spas / Aesthetics
3) HVAC + Plumbing (home services)

**Geography:** Top 25 US metros for consistent TAM + repeatable Google Maps queries.
Use these metros (copy/paste): New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

---
## 2) Lead list CSV / Google Sheet template (copy headers)
Create a Google Sheet with the following columns (Row 1 headers). Export CSV when done.

**Core identity**
- business_name
- vertical
- category_on_google (as shown)
- city_state
- metro
- website
- phone
- google_maps_url

**Review / reputation fields**
- google_rating
- review_count
- last_review_date
- last_review_stars
- response_rate_proxy_last10 (0–100)
- last10_reviews_owner_responses_count (0–10)

**Contact fields**
- owner_or_manager_name
- role_guess (Owner/Office Manager/Practice Manager/GM)
- email_1
- email_2
- contact_page_url

**Personalization + segmentation**
- personalization_snippet (<= 160 chars; paraphrase if needed)
- response_gap_note (e.g., “No owner reply on last 8/10 reviews”)
- segment (not_responding | low_rating | high_volume | combo)
- priority (A | B | C)
- template_variant (NR | LR | HV)
- notes

### Segmentation rules (apply in Sheet)
Define these thresholds:
- **Not Responding (NR):** response_rate_proxy_last10 <= 20 OR last10_reviews_owner_responses_count <= 2
- **Low Rating (LR):** google_rating < 4.2
- **High Volume (HV):** review_count >= 200 OR last_review_date within last 14 days

Set **segment** as:
- If NR and LR and HV → combo
- Else if NR and HV → combo
- Else if LR and HV → combo
- Else if NR → not_responding
- Else if LR → low_rating
- Else if HV → high_volume
- Else → (leave blank or “general”)

### Priority scoring (simple routing)
- **Priority A:** (NR AND HV) OR (LR AND HV) OR (LR AND NR)
- **Priority B:** NR OR LR
- **Priority C:** HV only

### Template routing
- If LR → template_variant = LR
- Else if NR → template_variant = NR
- Else if HV → template_variant = HV

---
## 3) Zero-cost Google Maps query pack (copy/paste)
Goal: pull businesses with strong review signals and clear response gaps.

### Dentists
- “dentist {metro}”
- “cosmetic dentist {metro}”
- “family dentistry {metro}”
- “dental implants {metro}”

### Med spas / aesthetics
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}”
- “laser hair removal {metro}”

### HVAC / plumbing
- “hvac {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”
- “drain cleaning {metro}”

### Agency/reseller lane (parallel)
Find small agencies already serving these verticals:
- “dental marketing agency {metro}”
- “med spa marketing agency {metro}”
- “hvac marketing agency {metro}”
- “local seo agency {metro}”

What to capture for agencies: agency_name, website, city, decision-maker (founder/owner), email, niche focus, case studies page.

---
## 4) Manual collection workflow (fast + consistent)
For each prospect on Google Maps:
1) Open listing → record business_name, phone, website, rating, review_count, google_maps_url.
2) Click “Reviews” → set sort to “Newest” → record last_review_date and last_review_stars.
3) For response proxy: scan the **last 10 reviews** and count owner responses (0–10). Compute response_rate_proxy_last10 = responses/10*100.
4) Capture a personalization snippet:
   - Prefer: short paraphrase of the most recent review topic (avoid quoting names/medical details).
   - Example: “Saw a recent review mentioning long wait time + front desk confusion.”
5) Find email:
   - Website → Contact page / footer → email.
   - If no email shown: look for “info@”, “office@”, “support@” patterns on Contact/About pages.
   - Record contact_page_url.

**QA rule:** skip chains/franchises with corporate-only contact forms unless you can find a local manager email.

---
## 5) Cold email sequences (3-step) — include legitimacy link + contact email
Use tokens: {{first_name}}, {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap_note}}, {{google_rating}}, {{review_count}}

### 5.1 Local business — Initial email (NR variant: not responding)
**Subject options:**
- Quick fix for unanswered reviews at {{business_name}}
- {{business_name}}: review replies (done within 12 hrs)
- Noticed a response gap on your Google reviews

**Body:**
Hi {{first_name}} — quick note.

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap_note}}. There’s also a recent comment about: “{{recent_review_snippet}}”.

We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses for Google + Yelp, escalates negatives, and keeps you consistent. You can approve everything (or set rules) and we aim to respond within **12 hours**.

If I send 2–3 sample replies for your latest reviews, would you want to see them?

Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob Smith
agent_bob_replit+review-bot@agentmail.to


### 5.2 Local business — Initial email (LR variant: low rating)
**Subject options:**
- {{business_name}} rating recovery (without extra staff time)
- Quick help with negative reviews
- Turning 1–2 star reviews into resolution threads

**Body:**
Hi {{first_name}},

I saw {{business_name}} is at **{{google_rating}}** on Google with {{review_count}} reviews. One recent review mentioned: “{{recent_review_snippet}}”.

We help local teams respond in a way that’s calm, compliant, and resolution-focused (and we flag anything that should be escalated privately). The goal is to protect conversion from Maps and show future customers you’re on top of issues.

Open to a quick look if I draft a few responses you can use this week?

Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob Smith
agent_bob_replit+review-bot@agentmail.to


### 5.3 Local business — Initial email (HV variant: high volume)
**Subject options:**
- Keeping up with {{review_count}} reviews at {{business_name}}
- Review reply throughput for {{business_name}}
- 12-hour review response coverage

**Body:**
Hi {{first_name}},

{{business_name}} has {{review_count}} Google reviews and you’re getting fresh feedback regularly. If you ever want to keep response times tight without adding admin load, we can help.

Our autopilot drafts brand-safe replies for Google + Yelp, escalates negative reviews, and sends a weekly KPI recap (new reviews, response time, sentiment, unresolved issues).

Want me to draft 3 sample replies for your newest reviews so you can judge quality?

Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob Smith
agent_bob_replit+review-bot@agentmail.to


### 5.4 Follow-up #1 (2 business days later)
**Subject:** Re: {{business_name}} review replies

Hi {{first_name}} — should I send over those sample replies for your latest Google reviews?

If helpful, tell me which you prefer:
1) You approve every reply before posting, or
2) We auto-post positive/neutral and only request approval on negative.

— Bob
agent_bob_replit+review-bot@agentmail.to


### 5.5 Follow-up #2 (4–5 business days later)
**Subject:** Last try — sample replies for {{business_name}}?

Hi {{first_name}}, last note from me.

If reviews are on your radar this month, I can draft a small set of ready-to-post replies for {{business_name}} (Google + Yelp) based on your tone and policies.

Worth sending 2–3 examples?
— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


### 5.6 Agency/reseller initial email
**Subject options:**
- Add review response automation to your client stack
- White-label review replies for {{agency_name}} clients
- Quick revenue add-on: Google/Yelp replies

**Body:**
Hi {{first_name}},

I’m Bob — we built an **AI Review Reply & Reputation Autopilot** for Google Business Profile + Yelp (brand-safe drafts, escalation for negatives, weekly KPI reporting).

If you manage local clients (dental / med spa / home services), this is an easy add-on: you keep the relationship, we handle reply ops, and you can white-label the weekly report.

Open to a 10-minute chat? Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob Smith
agent_bob_replit+review-bot@agentmail.to

---
## 6) Daily sending ops + CRM stages (zero-cost stack)
### Daily activity targets (starting)
- Day 1–2: 20 new emails/day
- Day 3–4: 30/day
- Day 5–7: 40/day
- Week 2: 50/day steady (split 60% new, 40% follow-ups)

### CRM stages (minimum viable)
1) Prospect (in sheet)
2) Sent
3) Replied — Interested
4) Replied — Not now
5) Qualified (has GBP/Yelp + wants help + has volume/pain)
6) Demo booked
7) Trial (7 days free per Week 1 policy)
8) Paid
9) Lost

### QA checklist (before sending)
- Website present OR valid contact email (no-contact leads get deprioritized)
- Category matches vertical (no “school”, “supply store”, “training center”)
- Rating + review_count populated
- last_review_date populated
- response_rate_proxy_last10 computed
- personalization_snippet present and compliant (no PHI/medical specifics; no patient names)

### Personalization safety rules
- Prefer paraphrase over direct quotes.
- Don’t mention sensitive services or diagnoses.
- Don’t imply the business did anything wrong; keep it operational (“response time”, “consistency”).

---
## 7) Output requirement (what ‘done’ looks like)
- 500–1,000 rows in CSV with the headers above.
- Each row has rating, review count, last review date, response proxy, at least one email (or explicit “no email found”), and segment + priority assigned.
- Priority A leads sent first (highest pain + highest ROI).