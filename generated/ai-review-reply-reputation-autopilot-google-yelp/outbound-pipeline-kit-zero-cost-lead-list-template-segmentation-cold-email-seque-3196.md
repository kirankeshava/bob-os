# Outbound Pipeline Kit (Zero-Cost): Lead List Template + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T22:40:56.956Z

---

## 1) ICP + Vertical Focus (Week 1 free trial)
**Offer:** AI Review Reply & Reputation Autopilot for Google/Yelp: drafts brand-safe responses, escalates negative reviews, weekly KPIs. Free for 7 days.
**Proof URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Contact:** agent_bob_replit+review-bot@agentmail.to

**Primary verticals (high review velocity + high LTV):**
1) Dentists / dental clinics
2) Med spas / aesthetics
3) HVAC + plumbing (home services)

**High-intent triggers:**
- Owner isn’t responding to reviews (revenue leakage + customer trust issue)
- Rating below 4.2 (urgent reputation triage)
- High review volume / recent reviews (needs operational throughput)

---
## 2) Lead List CSV Template (copy/paste headers)
lead_id,business_name,vertical,city,state,phone,website,google_maps_url,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy,last_10_responses_count,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

### Data dictionary (how to fill fast)
- **google_rating / review_count:** from Google Maps listing header.
- **last_review_date:** open “Reviews” sort by “Newest”, capture the date of the top review.
- **last_review_snippet:** 8–20 words max. Safer: paraphrase; don’t include health info or sensitive details.
- **last_10_responses_count:** count how many of the most recent 10 reviews have an “Owner response”.
- **response_rate_proxy:** =last_10_responses_count/10 (0.0–1.0).
- **website:** from listing; if missing, skip or mark blank.
- **emails:** from website Contact page + About page; if none, use generic contact@, info@, hello@. (No paid enrichment in Week 1.)

---
## 3) Segmentation + Priority Scoring (rules)
Compute **segment** (choose the highest urgency that applies):
1) **low_rating** if google_rating < 4.2
2) **not_responding** if response_rate_proxy <= 0.2 OR last_10_responses_count = 0
3) **high_volume** if review_count >= 200 OR last_review_date within last 14 days
4) else **baseline**

Priority tiers (used to decide who gets emailed first):
- **Priority A:** (low_rating AND high_volume) OR (not_responding AND high_volume)
- **Priority B:** low_rating OR not_responding
- **Priority C:** high_volume only
- **Priority D:** baseline (deprioritize)

Routing to email variant:
- low_rating → “reputation triage + escalation” angle
- not_responding → “response gap + missed conversions” angle
- high_volume → “throughput + 12-hour response ops” angle

---
## 4) Zero-Cost Lead Sourcing Workflow (to reach 500–1,000)
### Step A — Pick geography (recommended for speed)
Choose **Top 25 US metros** OR **5–10 states**. Keep consistent so messaging + pain points match.

### Step B — Google Maps query pack (examples)
For each metro/state, run these queries and capture the top relevant businesses:
- Dentists: “dentist”, “cosmetic dentist”, “family dentistry”, “dental implants”
- Med spas: “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”
- HVAC/Plumbing: “HVAC”, “air conditioning repair”, “plumber”, “water heater repair”

### Step C — Production targets (human/VA)
- 50 leads/day per collector is realistic with the fields above.
- 2 collectors × 5 days = ~500 leads.

### Step D — QA rules (prevent garbage)
Reject leads if:
- No website AND no usable email path
- Franchise location pages with no decision-maker path (unless local GM email exists)
- Category mismatch (e.g., “dental lab” vs “dentist”)
- Reviews disabled / no review recency available

---
## 5) Cold Email Sequences (3 steps) — DIRECT TO LOCAL BUSINESSES
Personalization tokens:
- {{first_name}} (if unknown use: “Hi {{business_name}} team,”)
- {{business_name}}, {{city}}
- {{recent_review_snippet}} (short paraphrase)
- {{response_gap}} (e.g., “looks like several recent reviews don’t have an owner reply”)

### Variant A (Not Responding) — Email 1
**Subject options:**
1) Quick win for {{business_name}} reviews
2) Noticed a response gap on Google
3) Can I help with your review replies?

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s recent Google reviews in {{city}} — I noticed {{response_gap}} (ex: a few of the newest reviews don’t have an owner response).

We run an AI-assisted “review reply autopilot” that drafts **brand-safe** responses to Google/Yelp reviews and gets them out **within 12 hours**. You can approve/edit everything before it posts.

If you want to see what this looks like, I can send 3 draft replies based on your latest reviews (free). More details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a 10-min call this week?
— Bob
agent_bob_replit+review-bot@agentmail.to

### Follow-up 1 (2–3 days later)
Subject: Re: review replies for {{business_name}}

Hi {{first_name}},

Want me to draft replies for these two reviews?
- “{{recent_review_snippet}}…”
- (another short paraphrase)

No setup needed—I’ll email drafts back, and if you like them we can run a **free 7-day trial**.

— Bob
agent_bob_replit+review-bot@agentmail.to

### Follow-up 2 (4–6 days later)
Subject: Close the loop?

Hi {{first_name}},

Should I (a) send draft replies for your newest reviews, or (b) leave this for now?

Either way, here’s the overview link again: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob

---
## 6) Cold Email Variant B (Low Rating) — reputation triage
Email 1:
Subject: Quick reputation triage for {{business_name}}

Hi {{first_name}},

I saw {{business_name}}’s Google rating is around {{google_rating}}. One recent theme I noticed was: “{{recent_review_snippet}} …”

We help local businesses respond fast and safely to negative feedback: draft a calm, on-brand reply, **escalate** to the right person, and track weekly reputation KPIs.

If you want, I’ll send a “best-practice” reply draft for your latest 1–2 negative reviews (free). Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a quick 10-min chat?
— Bob
agent_bob_replit+review-bot@agentmail.to

Follow-ups mirror Variant A but emphasize: de-escalation, consistency, and internal escalation.

---
## 7) Cold Email Variant C (High Volume) — throughput
Email 1:
Subject: Keeping up with review volume at {{business_name}}

Hi {{first_name}},

Noticed {{business_name}} is getting reviews pretty consistently ({{review_count}} total). Many teams fall behind because replying is operationally annoying, not because they don’t care.

We draft and schedule brand-safe responses to Google/Yelp reviews and report simple weekly KPIs—so you stay responsive without burning staff time. You approve before anything posts.

Want me to send 3 example replies based on your newest reviews? Free to try for 7 days.
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

---
## 8) Agency/Reseller Lane (marketing agencies)
**Who:** local SEO agencies, PPC shops, reputation management consultants serving dentists/med spas/home services.
**Hook:** add-on retention + “done-for-you review response” without hiring.

Agency Email 1:
Subject: White-label review replies for your clients

Hi {{first_name}},

If you manage local SEO for dentists/med spas/home services, review responses are one of the easiest retention wins—but they’re tedious.

We provide a simple white-label workflow: we draft brand-safe replies within 12 hours for Google/Yelp, flag negatives for escalation, and send weekly reputation KPIs. Your team can approve before posting.

Can I send a 1-page overview + a sample client workflow? https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

---
## 9) Daily Sending Ops (Week 1 = free, low volume, high quality)
**Day 1–2:** 20 emails/day (Priority A only). Manual sending via Gmail/Workspace you already have (no paid tools). Track in Sheet/CRM.
**Day 3–5:** 40 emails/day (A + B). Add Follow-up 1 for Day 1 batch.
**Day 6–7:** 60 emails/day (A + B + select C). Add Follow-up 2 for earliest batches.

Quality gates:
- Keep bounce rate < 5% (if higher: tighten QA; avoid guessed emails).
- Reply SLA: respond to any positive interest within 2 hours during business day.
- If they ask “price”: reply with “7-day free trial; then simple monthly, based on review volume. Happy to quote after we see your average weekly review count.”

---
## 10) CRM Stages (simple pipeline)
1) **Prospect (Unsent)** — validated lead with email + segment.
2) **Sent** — Email 1 sent.
3) **Engaged** — replied or asked a question.
4) **Qualified** — has Google/Yelp presence + agrees review responses matter + confirms decision-maker.
5) **Demo/Walkthrough Booked** — time scheduled.
6) **Trial (7 days free)** — started; weekly KPI report promised.
7) **Conversion** — ready for paid post-week-1.
8) **Lost / Nurture** — not now; set 30–60 day follow-up.

KPI targets (early):
- 40–60/day sends by end of week
- 3–8% positive reply rate on Priority A/B
- 5–10 demos/week once list volume hits 500+
