# Outbound Pipeline Runbook (Week 1 $0 Spend): Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:14:56.337Z

---

## 0) What we’re selling (1 sentence)
AI Review Reply & Reputation Autopilot: we draft (and optionally post) brand-safe responses to Google Business Profile + Yelp reviews, escalate negatives fast, and send weekly KPI reporting. Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/1  | Reply-to: agent_bob_replit+review-bot@agentmail.to

---

## 1) Vertical focus + who to target
**Verticals (start):** Dentists, Med Spas/Aesthetics, HVAC/Plumbing.
**Decision-maker roles:** Owner, Practice Manager, Office Manager, Operations Manager, GM, Marketing Manager.
**High-intent triggers:** many recent reviews but low response rate, rating under 4.2, or high review volume (200+).

---

## 2) Geography (choose ONE for first 500–1,000)
Pick one so the list is consistent.
- Option A: **Top 25 US metros** (fast volume, broad)
- Option B: **5–10 states** (tighter ops, better personalization)
- Option C: **US-wide** (harder QA; more junk)

Recommended for Week 1: **Top 10–15 metros** first, then expand.

---

## 3) Lead list build (zero-cost) — Google Maps workflow
### 3.1 Query pack (copy/paste patterns)
Use Google Maps search. For each metro, run 2–3 category queries per vertical to reduce irrelevant results.

**Dentist:**
- “dentist {metro}”
- “cosmetic dentist {metro}”
- “family dentistry {metro}”

**Med Spa / Aesthetics:**
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}”

**HVAC/Plumbing:**
- “HVAC company {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”

**Agencies lane (separate list of 100–200):**
- “dental marketing agency {metro}”
- “med spa marketing agency {metro}”
- “home services marketing agency {metro}”

### 3.2 CSV/Sheet columns (header row)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_10_response_count,response_rate_proxy,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

### 3.3 How to capture fields quickly (per lead)
1) Open the Google Business Profile panel.
2) Copy: business name, phone, website, Maps URL.
3) Record rating + review count.
4) Click **Reviews** → sort by **Newest**.
5) Grab **last review date**.
6) For the **last 10 reviews**, count how many have an “Owner response” (or equivalent).
   - Enter that count as `last_10_response_count`.
   - Compute `response_rate_proxy = last_10_response_count/10` (or percent).
7) Copy a short **personalization_snippet** from the newest review (8–20 words). If it’s sensitive, paraphrase (don’t include patient info).

### 3.4 Segmentation rules
- **not_responding**: response_rate_proxy <= 0.2 (2/10 or fewer) OR 0/10
- **low_rating**: google_rating < 4.2
- **high_volume**: review_count >= 200 OR last_review_date within 14 days

If multiple apply, keep the strongest primary segment in `segment` and note others in `notes`.

### 3.5 Priority scoring (routes which email variant to send)
- **Priority A**: (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B**: not_responding OR low_rating
- **Priority C**: high_volume only

Suggested formula logic in Sheets:
- response_rate_proxy: `=IFERROR(last_10_response_count/10,"")`
- segment (simple):
  `=IFS(response_rate_proxy<=0.2,"not_responding", google_rating<4.2,"low_rating", OR(review_count>=200, last_review_date>=TODAY()-14),"high_volume", TRUE,"other")`
- priority_tier:
  `=IFS(AND(segment="not_responding", OR(review_count>=200,last_review_date>=TODAY()-14)),"A", AND(segment="low_rating", OR(review_count>=200,last_review_date>=TODAY()-14)),"A", OR(segment="not_responding",segment="low_rating"),"B", segment="high_volume","C", TRUE,"C")`

---

## 4) Email finding (Week 1 $0 spend)
Order of operations:
1) Use the business website “Contact” page (best).
2) Look for: office manager, practice manager, owner emails.
3) If none, use general: info@, office@, hello@.
4) If still none, capture contact form URL and use phone for backup.

Keep `email_1` best guess; `email_2` fallback.

---

## 5) Cold email sequences (3-step) — with personalization + legitimacy link
### Tokens
- {{first_name}} (optional)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (short quote or paraphrase)
- {{response_gap}} (e.g., “looks like many recent reviews don’t have owner replies yet”)
- {{vertical_specific_value}} (e.g., “new patient calls”, “bookings”, “service calls”)

### 5.1 LOCAL BUSINESSES — Variant 1: Not Responding
**Subject options:**
1) Quick help responding to your Google reviews
2) {{business_name}}: replies to recent reviews?
3) 12-hour review responses (you approve)

**Email 1 (Day 1):**
Hi {{first_name}} — I’m reaching out because I saw a recent Google review for {{business_name}} mentioning “{{recent_review_snippet}}”.

Not sure if it’s intentional, but {{response_gap}}. For local businesses, fast, thoughtful replies can lift conversion (calls/bookings) and defuse negatives.

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google + Yelp, flags negatives for escalation, and sends weekly KPI reporting. You can see us here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/1

Week 1 offer: we’ll draft replies within 12 hours for 7 days, and you approve before anything posts.

Want me to send 3 sample replies using your recent reviews so you can judge quality?
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3):**
Subject: 3 sample replies for {{business_name}}?

Hi {{first_name}} — quick bump. If I draft 3 on-brand replies to your most recent reviews (including one that mentions “{{recent_review_snippet}}”), would you want them?

If yes, just reply “send” and I’ll email the drafts back. 
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 2 (Day 7):**
Subject: close the loop

Hi {{first_name}} — should I close this out, or is review response coverage something you want to improve this month?

If you want, I can run a 7-day free trial: draft replies within 12 hours + flag any negative review for immediate escalation.
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/1

### 5.2 LOCAL BUSINESSES — Variant 2: Low Rating
**Subject options:**
1) Quick win to protect your rating
2) {{business_name}} reviews (idea)
3) Reduce damage from negative reviews

**Email 1:**
Hi {{first_name}} — I noticed {{business_name}} has a few tough reviews recently (including one mentioning “{{recent_review_snippet}}”).

One practical lever: fast, calm owner responses + an escalation workflow so the team can address issues before they stack up.

We run an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe drafts, negative-review escalation, and weekly KPI reporting. You can verify us here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/1

Week 1: free 7-day trial. You approve drafts before anything posts.

Would it help if I draft responses to your 2 most recent negative reviews (so you can compare tone/quality)?
— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
If you reply with the name/title you prefer in responses (e.g., “Owner” vs “Practice Manager”), I’ll draft 2 options per review.

**Follow-up 2:**
If now isn’t the time, who owns review responses at {{business_name}}?

### 5.3 LOCAL BUSINESSES — Variant 3: High Volume
Angle: throughput + consistency.

**Subject:** Keeping up with review volume at {{business_name}}

**Email 1:**
Hi {{first_name}} — looks like {{business_name}} gets a steady flow of new Google reviews (latest mentions “{{recent_review_snippet}}”).

When volume is high, consistency matters: same voice, fast replies, and a clear escalation path for negatives.

We built an AI Review Reply & Reputation Autopilot (Google/Yelp): drafts in hours, brand-safe tone, you approve, plus weekly KPI reporting. Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/1

Want a 7-day free trial where we keep you fully caught up?
— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 6) Agency/reseller email (for marketing agencies)
**Subject:** White-label review response for your local clients

Hi {{first_name}} — do you support any dental/med spa/home services clients who struggle to keep up with Google/Yelp review replies?

We provide a white-label-friendly “AI Review Reply & Reputation Autopilot”: brand-safe drafts, negative escalation, weekly KPI reporting. You can see the product overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-eronacta.picard.replit.dev/sites/1

Week 1: free pilot for 1 client so you can judge quality + workflow (you/your client approves drafts before posting).

Open to a 10-minute call, or should I send sample replies and a simple reseller margin structure by email?
— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 7) Daily sending ops (Week 1, no spend)
### 7.1 CRM stages (Google Sheet or free HubSpot)
Prospect → Sent → Follow-up 1 Sent → Follow-up 2 Sent → Replied → Qualified → Demo Booked → Trial Active → Converted/Paid (later) → Lost

### 7.2 14-day ramp (per inbox)
Day 1–2: 20/day
Day 3–4: 30/day
Day 5–7: 40–50/day
Day 8–10: 60/day
Day 11–14: 80–100/day

Week 1 target (one inbox): 250–400 total sends with 2 follow-ups.

### 7.3 QA + compliance
- No attachments.
- Personalize first line with real review snippet/paraphrase.
- If asked to remove, mark “Do Not Contact”.
- Bounce threshold: pause if >5% bounces in a day; fix emails.
- Reply SLA: respond within 2 hours during business day.

### 7.4 Daily checklist (60–90 minutes)
1) Pull 25 new Priority A/B leads.
2) Verify email (website/contact page).
3) Add snippet + response gap.
4) Send new emails (within daily cap).
5) Send follow-ups due today.
6) Log replies and schedule demos.

---

## 8) What I need from the owner to start list-building immediately
Reply with: (1) geography choice (Top 25 metros / 5–10 states / US-wide) and (2) whether to prioritize direct-to-local first or agency lane first.

Once chosen, this runbook can produce 500–1,000 segmented rows and start sending the same day the first 100–200 leads are captured.