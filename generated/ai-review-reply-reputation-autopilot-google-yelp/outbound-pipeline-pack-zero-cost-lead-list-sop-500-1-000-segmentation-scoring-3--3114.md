# Outbound Pipeline Pack (Zero-Cost): Lead List SOP (500–1,000) + Segmentation/Scoring + 3-Step Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:26:46.710Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Pack (Week 1 / $0)

Business proof URL (include in emails): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Reply/contact email (include in emails): agent_bob_replit+review-bot@agentmail.to

## 1) Vertical focus + who we target
**Verticals (high review velocity + high LTV):**
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + Plumbers (home services)

**Buyer personas:** owner, practice manager, office manager, operations manager, marketing manager.

## 2) Lead list build SOP (zero-cost, 500–1,000 rows)
### 2.1 CSV columns (copy into Google Sheets header row)
`business_name, vertical, city_state, phone, website, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy_last10, segment, priority_tier, personalization_snippet, owner_or_manager_name, role_guess, email_1, email_2, notes`

### 2.2 Google Maps query pack (repeatable)
Pick **10–15 metros** (or 5–10 states) and run these queries per metro:
- Dentist: “dentist in {city}”, “cosmetic dentist in {city}”, “family dentistry in {city}”
- Med spa: “med spa in {city}”, “aesthetic clinic in {city}”, “botox in {city}”, “laser hair removal in {city}”
- Home services: “HVAC in {city}”, “air conditioning repair in {city}”, “plumber in {city}”, “drain cleaning in {city}”

**Collection rules:**
- Prefer independent/local brands; skip obvious national chains/franchises unless location-level marketing is clearly controlled locally.
- Prefer listings with **>= 30 reviews** (enough signal). For “High Volume” segment, prioritize **>= 200**.

### 2.3 How to capture required review fields (fast manual)
For each listing:
1) Record rating + review count from the main listing panel.
2) Click reviews, sort by “newest” and record **last review date**.
3) For **response_rate_proxy_last10**: scan the latest 10 reviews; count how many have an “Owner response”.
   - Example: 2 owner responses out of last 10 => 20%.
4) **personalization_snippet:** copy a short excerpt (8–20 words) from the newest review OR paraphrase it safely.
   - Use only what is publicly visible; avoid PHI-sensitive content (esp. dental/med spas). If health-related, paraphrase rather than quote.

### 2.4 Find emails (no paid tools)
**Primary method (fast):** business website → Contact page → footer → “Book/Contact” forms.
- Capture 1–2 emails. If no email is visible, use contact form (log URL in notes).

**Secondary method:** Google Business Profile “Website” + “Appointments” links; sometimes an email appears in site schema.

**Role guess:** if the email is generic (info@, hello@), set role_guess = “Front desk/Office”. If it’s name@, use the name.

### 2.5 QA sampling (prevents garbage lists)
For every batch of 50 leads, QA 5 rows:
- Website matches business name/location
- Category fits the vertical
- Rating/review count are filled
- Last review date is present
- response_rate_proxy_last10 computed
- Email present OR contact form URL present

## 3) Segmentation + priority scoring (operational)
### 3.1 Segment definitions
- **Not Responding:** response_rate_proxy_last10 <= 20% (0–2 responses in last 10)
- **Low Rating:** google_rating < 4.2
- **High Volume:** review_count >= 200 OR last_review_date within last 14 days

### 3.2 Priority tiers
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating (but not High Volume)
- **Priority C:** High Volume only

### 3.3 Variant routing
- If Low Rating → use “repair + escalation” angle
- If Not Responding → use “response gap + speed + approval workflow” angle
- If High Volume only → use “throughput + consistency + weekly KPIs” angle

## 4) Cold email sequences (3-step) — include proof URL + contact email
**Personalization tokens:**
- {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_rate_proxy_last10}}, {{last_review_date}}, {{vertical}}

### 4.1 DENTAL — Not Responding (Sequence A)
**Email 1 (Day 1)**
Subject options:
1) {{business_name}} — quick win on Google reviews
2) Noticed a response gap on your recent reviews
3) Can I draft replies for you (you approve)?

Body:
Hi {{first_name_or_team}},

I was looking at {{business_name}}’s Google reviews in {{city}}. I noticed recent feedback like: “{{recent_review_snippet}}” — and a few reviews haven’t had an owner reply.

We built a lightweight “Review Reply & Reputation Autopilot” that drafts brand-safe responses and helps you reply within 12 hours. You approve everything before posting. Negative reviews get escalated with a suggested fix + calm de-escalation response.

If you want to sanity-check us, here’s our info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want me to draft replies to your last 3 Google reviews for free and send them back (no login needed)?

— Bob
agent_bob_replit+review-bot@agentmail.to

**Email 2 (Day 3)**
Subject: Re: replies for {{business_name}}

Hi {{first_name_or_team}},

Totally understand reviews aren’t fun. The pattern I’m seeing is: reviews keep coming in (last one on {{last_review_date}}), but replies are sporadic.

If you forward me 3 review links (or just confirm it’s OK), I’ll send:
- 3 draft replies (HIPAA-safe tone)
- 1 “negative-review escalation” template your team can reuse

Should I send drafts to this email?

— Bob
agent_bob_replit+review-bot@agentmail.to

**Email 3 (Day 7)**
Subject: Close the loop?

Hi {{first_name_or_team}},

Last note—if responding faster isn’t a priority, no worries. If it is, I can run this as a weekly autopilot: drafts within 12 hours + weekly KPI snapshot (new reviews, response rate, rating trend).

Reply “drafts” and I’ll send the free sample for {{business_name}}.

— Bob

### 4.2 DENTAL — Low Rating (Sequence B)
**Email 1**
Subject options: 1) Quick reputation repair plan for {{business_name}} 2) About your Google rating 3) De-escalating negative reviews

Body:
Hi {{first_name_or_team}},

I’m reaching out because {{business_name}}’s Google rating is currently {{google_rating}}. That’s often a revenue lever in dental (new patients comparison-shop).

We help by drafting calm, brand-safe responses (you approve), and escalating negative reviews into a simple internal playbook: what to say publicly + what to do offline.

If helpful, I can draft responses to your 2 most recent negative reviews for free and include an escalation script.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want me to send the drafts?

— Bob
agent_bob_replit+review-bot@agentmail.to

(Follow-ups mirror the structure above: Day 3 offer + Day 7 close-the-loop.)

### 4.3 MED SPA — Not Responding (Sequence A)
**Email 1**
Subject: {{business_name}} — replying to reviews without it eating your day

Hi {{first_name_orteam}},

Saw a recent review for {{business_name}}: “{{recent_review_snippet}}”. Looks like some reviews don’t get an owner reply.

We run a “Reputation Autopilot” for med spas: brand-voice replies drafted within 12 hours, you approve, and anything negative gets escalated with a suggested fix.

Want a free sample? I’ll draft replies to your last 3 Google reviews and send them here.

Proof/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4.4 HVAC/PLUMBING — High Volume (Sequence C)
**Email 1**
Subject: Keeping up with {{business_name}}’s review volume

Hi {{first_name_or_team}},

{{business_name}} is getting steady Google reviews (last one {{last_review_date}}). When volume is high, reply consistency usually slips—totally normal.

We draft and organize brand-safe replies so you can respond fast (within 12 hours), with an approval workflow and a weekly KPI recap (new reviews, response rate, rating trend).

Want me to draft replies to the latest 3 reviews for free?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4.5 Agency/Reseller lane (single email + follow-up)
**Email 1**
Subject: White-label review replies for your local clients

Hi {{first_name}},

If you manage local SEO/reputation for dentists/med spas/home services: we can white-label an “AI Review Reply & Reputation Autopilot” that drafts brand-safe review responses (Google + Yelp), escalates negatives, and sends a weekly KPI snapshot.

You keep the client relationship; we deliver drafts within 12 hours. You can route approvals through your team.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-min chat? If you reply with 1 client URL, I’ll send a free sample pack of replies.

— Bob
agent_bob_replit+review-bot@agentmail.to

## 5) Daily sending ops (Week 1 free / Gmail-safe)
### 5.1 Daily targets + ramp (per inbox)
- Day 1–2: 20 new/day + 10 follow-ups/day
- Day 3–4: 30 new/day + 15 follow-ups/day
- Day 5–7: 40–60 new/day + 20 follow-ups/day

(Keep personalization manual for Priority A: include snippet + mention response gap.)

### 5.2 List hygiene + compliance
- Do not blast; keep bounce rate < 3% (if >3%, pause and fix list)
- If someone says stop, mark “Do Not Contact” immediately
- Use plain text emails, no heavy tracking pixels in week 1

### 5.3 Reply handling SLA
- Reply to positives within 2 hours during business day
- If interested: offer free sample (3 drafts) + ask for Google Business Profile link + preferred brand voice

## 6) CRM stages (Google Sheet pipeline)
Columns: `stage, last_touch_date, next_step_date, thread_link, owner, notes`
Stages with entry/exit:
1) **Prospect** → ready with email + segment + priority
2) **Sent** → first email sent
3) **Replied** → any reply (incl. OOO)
4) **Qualified** → confirms they manage reviews + has problem (time/consistency/low rating)
5) **Sample Sent (Free)** → 3 drafts delivered
6) **Trial Active (7 days)** → you’re producing drafts on live incoming reviews
7) **Closed Won (Paid later)** / **Closed Lost** / **Do Not Contact**

## 7) What to do next (execution order)
1) Choose geography (Top 25 metros recommended for speed/quality).
2) Build 200 Priority A/B leads in 48 hours using the SOP; start sending immediately.
3) Continue building to 500–1,000 while follow-ups run.
4) Track KPI: sent/day, reply rate, qualified rate, samples sent, trials started.
