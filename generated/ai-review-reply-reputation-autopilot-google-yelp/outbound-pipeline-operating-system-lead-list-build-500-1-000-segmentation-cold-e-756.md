# Outbound Pipeline Operating System — Lead List Build (500–1,000), Segmentation, Cold Email (3-step), Daily Sending Ops + CRM (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:43:59.335Z

---

## 0) What we’re selling (one sentence)
AI Review Reply & Reputation Autopilot drafts (and can post) brand-safe replies to Google Business Profile + Yelp reviews, escalates negative reviews fast, and reports weekly reputation KPIs—so local businesses protect ratings and revenue without spending staff time.
Proof URL to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email to include: agent_bob_replit+review-bot@agentmail.to

---

## 1) Vertical + geography focus (for fastest traction)
**Verticals (3):** Dentists, Med Spas/Aesthetic Clinics, HVAC/Plumbing.
**Recommended geography (initial list):** **Top 25 US metros**. Rationale: consistent review volume + enough density to pull 500–1,000 relevant prospects without spending on scrapers.

Top metros list (use any 10–25 depending on capacity): New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; Nashville TN; El Paso TX; Detroit MI; Portland OR.

---

## 2) Lead list CSV: required columns (copy/paste headers)
**CSV headers (exact):**
business_name,vertical,city_state,phone,website,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,segment,priority_tier,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

### Data dictionary (how to fill)
- **google_rating / review_count:** from Google business panel.
- **last_review_date:** open reviews; record date of the most recent review.
- **response_rate_proxy_last10:** look at the last 10 reviews, count how many have an “Owner response.” Example: 1/10 = 10%.
- **personalization_snippet:** 6–20 words from the most recent review OR a safe paraphrase (avoid health claims; don’t mention sensitive services).
- **owner_or_manager_name/role_guess:** from website About/Team, LinkedIn, or “Contact” page.
- **email_1/email_2:** best available: contact@, info@, office@, hello@; or named email if found.

---

## 3) Segmentation + priority scoring (apply during collection)
**Segments (choose one primary):**
1) **not_responding** if response_rate_proxy_last10 ≤ 20% (0–2 replies out of last 10)
2) **low_rating** if google_rating < 4.2
3) **high_volume** if review_count ≥ 200 OR last_review_date ≤ 14 days

**Priority tiers:**
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** (not_responding) OR (low_rating)
- **Priority C:** high_volume only

**Routing rule:**
- not_responding → send “response gap” email variant
- low_rating → send “recovery + escalation” email variant
- high_volume → send “ops/throughput” email variant

---

## 4) Zero-cost lead sourcing workflow (VA-ready)
### Step-by-step (per lead, 3–6 minutes once practiced)
1) Google Maps search using the query pack (below).
2) Open listing → copy business name, phone, website, rating, review count, Maps URL.
3) Click reviews → record last_review_date and count owner responses in last 10 → compute proxy.
4) Copy a short personalization_snippet (or paraphrase safely).
5) Visit website → find contact email(s); optionally find owner/manager name.
6) Tag segment + priority.

### QA rules (prevent garbage leads)
- Exclude: franchises with corporate review teams (unless location-managed and clearly local), businesses without a website (optional rule), businesses with < 30 reviews (low urgency), duplicates.
- Include: active listings with recent reviews, independent operators, multi-location brands where each location manages reviews.
- QA sampling: review 10% of rows daily; bounce risk check: make sure every row has at least one email.

---

## 5) Google Maps query pack (copy/paste)
Use this format: **"{vertical keyword} {metro}"**

### Dentists
- “dentist {metro}”
- “family dentist {metro}”
- “cosmetic dentist {metro}”

### Med spas / aesthetics
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}” (use carefully; verify they’re clinics, not individual injectors only)

### HVAC / Plumbing
- “HVAC {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”

**Tip:** prioritize listings with (a) 200+ reviews or (b) most recent review within 14 days.

---

## 6) Cold email — 3-step sequences (direct to local business)
**Global personalization tokens:**
- {{first_name}} (optional)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{response_gap}} (e.g., “looks like most recent reviews don’t have owner replies”) 
- {{proof_url}} = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- {{contact_email}} = agent_bob_replit+review-bot@agentmail.to

### A) Variant: NOT RESPONDING (best default)
**Email 1 (Day 1)**
Subject options:
1) Quick note about your Google reviews
2) {{business_name}} review replies
3) A simple way to reply faster (without extra staff)

Body:
Hi {{first_name}}—

I was looking at {{business_name}}’s recent Google reviews (saw: “{{recent_review_snippet}}”). It also looks like there aren’t owner replies on a lot of the recent posts ({{response_gap}}).

We built an **AI Review Reply & Reputation Autopilot** that drafts brand-safe responses for Google + Yelp, escalates negatives fast, and sends a weekly KPI recap. You can keep control: **approve/edit first**, and we aim to respond within **~12 hours**.

If you want, I can generate **5 sample replies** for your most recent reviews so you can judge tone/quality.

Worth a quick 10 minutes this week?

—Bob
{{proof_url}}
{{contact_email}}

**Follow-up 1 (Day 3–4)**
Subject: Re: {{business_name}} review replies
Hi {{first_name}}—checking if you want me to send the 5 sample replies.

Two common wins we see:
- more reviews mention “they actually respond” (trust signal)
- fewer situations where a negative review sits unanswered for days

Reply “yes” and I’ll send them, or tell me who manages reviews for {{business_name}}.

—Bob
{{proof_url}}
{{contact_email}}

**Follow-up 2 (Day 7)**
Subject: Close the loop?
Hi {{first_name}}—last note.

If review replies aren’t a priority right now, no worries. If they are, I can:
1) draft replies in your brand voice,
2) flag anything negative for escalation,
3) provide a weekly reputation KPI email.

Should I send the sample replies, or close this out?

—Bob
{{proof_url}}
{{contact_email}}

### B) Variant: LOW RATING (recovery + escalation)
**Email 1 (Day 1)**
Subject options:
1) Quick idea to protect your rating
2) Review response recovery for {{business_name}}
3) Handling negatives faster

Body:
Hi {{first_name}}—

I noticed {{business_name}}’s Google rating is sitting around {{google_rating}} and there are a few recent tough reviews (e.g., “{{recent_review_snippet}}”). When those go unanswered, prospects assume the worst.

We built an **AI Review Reply & Reputation Autopilot** for Google/Yelp: brand-safe drafts, **fast escalation for negatives**, and a weekly KPI recap so nothing slips.

If you share 1–2 examples of how you like to respond, I can generate a set of replies in that voice (you approve first).

Open to a quick call?

—Bob
{{proof_url}}
{{contact_email}}

(Follow-ups same structure as Variant A; keep it short, offer sample replies.)

### C) Variant: HIGH VOLUME (ops/throughput)
**Email 1 (Day 1)**
Subject options:
1) Keeping up with review volume
2) {{business_name}}: faster review replies
3) Review reply workflow (Google/Yelp)

Body:
Hi {{first_name}}—

{{business_name}} gets a lot of reviews ({{review_count}}). Most teams don’t have a clean workflow to respond quickly and consistently—especially across Google + Yelp.

Our **AI Review Reply & Reputation Autopilot** drafts brand-safe replies, escalates negatives, and sends a weekly KPI recap. You can set guardrails (tone, do-not-say list) and **approve** before posting.

Want me to send 5 sample replies based on your latest reviews?

—Bob
{{proof_url}}
{{contact_email}}

---

## 7) Agency/reseller lane (bulk deals)
### Who to target
Local SEO agencies, reputation management firms, web design shops serving dentists/med spas/home services.

### Agency Email 1
Subject options:
1) White-label review reply autopilot?
2) Add-on for your local SEO clients
3) Faster review responses for your clients

Body:
Hi {{first_name}}—

Do you manage Google Business Profiles for local clients?

We built an **AI Review Reply & Reputation Autopilot** (Google + Yelp) that drafts brand-safe replies, escalates negatives, and sends weekly KPI recaps. It’s designed to be easy for an agency workflow: approvals, guardrails, consistent tone.

If you want, I can run a quick test on one client location and send sample replies + a simple KPI report format.

Worth exploring as a white-label add-on?

—Bob
{{proof_url}}
{{contact_email}}

---

## 8) Daily sending ops + 14-day ramp (no paid tools assumed)
### Minimum viable setup
- 1 inbox to start (warm carefully)
- Send **plain text** emails, minimal links (only include proof URL when needed)
- Track manually in a Google Sheet CRM if no CRM yet

### Ramp schedule (per inbox)
Days 1–2: 10–15/day
Days 3–4: 20/day
Days 5–7: 30/day
Week 2: 40–60/day (only if bounce < 3% and replies are healthy)

### List hygiene thresholds
- Hard bounce > 3%: pause, clean list, verify emails.
- Spam complaints: stop immediately, reduce volume, simplify copy.
- Keep follow-ups: 2 follow-ups max per prospect in first pass.

### Reply handling SLA
- Respond to positive replies within 2 hours during business day.
- If prospect asks “price?”: offer 2 simple tiers and a short call.

---

## 9) CRM stages (simple, enforceable)
1) **Prospect (Unsent)** → meets criteria + has email
2) **Sent (Email 1)** → date stamped
3) **Follow-up 1 Sent**
4) **Follow-up 2 Sent**
5) **Replied** (positive/neutral/negative)
6) **Qualified** (has GBP + review volume + decision maker)
7) **Demo Booked**
8) **Trial/Proof** (sample replies delivered)
9) **Paid**
10) **Lost** (reason)

---

## 10) Daily activity targets (starting tomorrow)
- Build: 25–50 new leads/day (VA) until 500–1,000 reached.
- Send: 20–60 emails/day (depending on inbox age), 2 follow-ups/day per 10 new sends.
- KPI tracking (weekly): sends, reply rate, positive reply rate, demos booked, trials delivered, paid conversions.

This system is designed so a VA can build the list while you focus on replies/demos and closing revenue.