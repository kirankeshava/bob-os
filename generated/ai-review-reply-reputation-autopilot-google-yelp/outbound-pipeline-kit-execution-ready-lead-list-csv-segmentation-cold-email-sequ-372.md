# Outbound Pipeline Kit (Execution-Ready): Lead List CSV + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:46:59.841Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Execution-Ready)

**Offer (1 sentence):** We draft and (optionally) post brand-safe responses to Google Business Profile + Yelp reviews, escalate negatives fast, and send weekly KPI reporting—so busy local businesses protect revenue without spending owner time.

**Legitimacy link to include in outreach:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
**Business contact email:** agent_bob_replit+review-bot@agentmail.to

---

## 1) Verticals to target (high review velocity + high LTV)
1) **Dental practices** (general + cosmetic; high competition; reviews directly affect new patient bookings)
2) **Med spas / aesthetic clinics** (high ticket; reputation-sensitive; frequent review inflow)
3) **HVAC + plumbing** (urgent intent; strong effect from rating + fast replies)

Secondary lane (higher deal size): **Local marketing agencies** that manage SEO/GBP for these verticals (resell/white-label).

---

## 2) Segmentation + priority rubric (used to route messaging)
You will tag each lead with **segment** and **priority**.

### Segments
- **not_responding**: response-rate proxy ≤ 20% (≤2 owner replies in last 10 reviews) OR clearly no owner replies recently.
- **low_rating**: Google rating < 4.2 (or any recent 1–2★ trend in last 30 days).
- **high_volume**: review_count ≥ 200 OR last_review_date within 14 days (fresh review velocity).

### Priority tiers (what you work first)
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

### Message angle mapping
- not_responding → “response gap / speed / brand-safe drafts / owner approval”
- low_rating → “escalation workflow / calm tone / recover reputation / prevent public pile-on”
- high_volume → “ops throughput / consistency / weekly KPI report / less owner time”

---

## 3) Lead list CSV schema (copy/paste headers)
Use exactly these columns (CSV header row):

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,last_10_owner_replies,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

### Data dictionary (how to fill each field)
- **google_rating / review_count:** from Google Business Profile panel.
- **last_review_date:** date of most recent review visible.
- **last_10_owner_replies:** count owner responses across the most recent 10 reviews.
- **response_rate_proxy:** `last_10_owner_replies / 10` (0.0–1.0). If fewer than 10 reviews visible, use replies/visible_reviews.
- **personalization_snippet:** 10–25 words from a recent review OR a safe paraphrase (avoid sensitive health details). Example: “Saw a few reviews mention ‘quick scheduling’ and ‘front desk was helpful’.”
- **emails:** from website contact page, “About,” footer, or staff directory. Prefer role emails: office@, info@, manager@, support@. For dentists: “practice manager” is ideal. For HVAC: “owner” or “service manager.”

---

## 4) Zero-cost lead list build workflow (to reach 500–1,000)
This is the fastest no-paid-tools approach.

### Step-by-step (per lead, 2–4 minutes once practiced)
1) **Google Maps search** using a consistent query (examples below).
2) Open business profile → capture **rating**, **review_count**, **phone**, **website**, **Maps URL**.
3) Click **Reviews** → capture **last_review_date** and count **owner replies in last 10**.
4) Copy a short **personalization_snippet** (or paraphrase safely).
5) Open the **website** → find emails on Contact/About/Privacy Policy/footer.
6) Fill segment + priority based on rules above.

### Query pack template (choose your geo first)
Use: `[vertical keyword] + [city] + [state]`

**Dental keywords:** “dentist”, “cosmetic dentist”, “family dentistry”  
**Med spa keywords:** “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”  
**Home services keywords:** “HVAC”, “air conditioning repair”, “plumber”, “drain cleaning”

**Production targets:**
- 50 leads/day (one person) → 10 business days = 500 leads
- 100 leads/day (two people or one fast VA) → 5 business days = 500 leads

### QA rules (avoid garbage leads)
Exclude:
- National call-center directories without a local operator
- Businesses with no website AND no reachable email/contact form (unless very high volume)
- Duplicates/franchises where outreach should go to regional HQ (unless location manager email exists)

QA sample: every 50 rows, check 5 randomly for correct category, valid website, and correct Maps URL.

---

## 5) Cold email sequence (3-step) — master version (tokenized)
**Tokens used:**
- {{first_name}} (if unknown, omit)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{response_gap_fact}} (example: “Looks like most reviews haven’t gotten a response in the last few weeks.”)
- {{vertical_specific_value}} (dentist/med spa/HVAC)

### Email 1 — personalized hook + offer
**Subject options (rotate):**
1) Quick question about {{business_name}} reviews
2) Noticed a response gap on Google
3) 12-hour review replies (you approve)

**Body:**
Hi {{first_name}},

I was looking at {{business_name}} in {{city}} and noticed {{recent_review_snippet}}. {{response_gap_fact}}

We run an **AI Review Reply & Reputation Autopilot** for local businesses: brand-safe draft responses for Google + Yelp, negative-review escalation, and a weekly KPI summary. You can **approve replies before anything posts**, and we aim to respond within **12 hours**.

If helpful, I can send 2–3 drafted replies for your latest reviews so you can see the tone/quality. Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth trying on a few reviews this week?

— Bob Smith
agent_bob_replit+review-bot@agentmail.to


### Email 2 (Follow-up) — low-friction proof
**Subject:** Want me to draft a couple replies?

Hi {{first_name}},

If I draft responses for the last 3 reviews at {{business_name}} (including one that needs a careful tone), do you want them:

A) ultra-short and friendly, or  
B) more detailed and trust-building?

If you reply “A” or “B,” I’ll send drafts you can copy/paste (or we can set approval-based autopilot).

— Bob
agent_bob_replit+review-bot@agentmail.to


### Email 3 (Follow-up) — clear close
**Subject:** Close the loop?

Hi {{first_name}},

Should I close the loop here, or is review response coverage something you want handled?

If you’re open, I can do a quick 10-min walkthrough of how we:
- keep responses brand-safe,
- escalate negatives fast, and
- track weekly KPIs (rating trend, response rate, review velocity).

Either way, link for reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 6) Segment-specific opening lines (paste into Email 1)
Choose one based on segment:

### not_responding
- “I noticed several recent reviews haven’t gotten a response yet (last 10 reviews show little/no owner response).”

### low_rating
- “I noticed the rating is around {{google_rating}} and there are a couple recent low-star reviews—those are often where a calm, professional response makes a big difference.”

### high_volume
- “You’re getting reviews frequently (most recent was {{last_review_date}}), which is great—but it also makes consistent responses hard to keep up with.”

---

## 7) Agency/reseller lane (short email)
**Subject:** White-label review response for your GBP clients

Hi {{first_name}},

Do you manage Google Business Profiles for dental/med spa/home services clients?

We provide a white-label **review response autopilot**: brand-safe drafts (Google + Yelp), negative escalation, and weekly KPI reporting. Your client can approve before posting, or you can manage approvals.

If you want, tell me your vertical focus and typical client count, and I’ll outline pricing + workflow.

— Bob Smith
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

## 8) Daily sending ops (14-day ramp + guardrails)
**Goal:** consistent delivery + replies without burning inbox reputation.

### Day-by-day ramp (per inbox)
- Days 1–2: 10/day (new + replies)
- Days 3–4: 20/day
- Days 5–7: 30/day
- Days 8–10: 40/day
- Days 11–14: 50/day

If using 2 inboxes, split volume evenly.

### List hygiene + deliverability rules
- Keep bounce rate **< 3%** (pause sends if above).
- Complaints/spam reports: **any spike = stop and review copy/list**.
- Use plain text; minimal links (one legitimacy link is fine); no attachments.
- Always include a human signature and the contact email: agent_bob_replit+review-bot@agentmail.to

### Reply handling SLA
- Respond to interested replies within **2 hours** during business day.
- If negative/angry reply: acknowledge + offer to stop, do not argue.

---

## 9) CRM stages (simple pipeline)
1) **Prospect** (in list, not contacted)
2) **Sent** (Email 1 sent)
3) **Replied** (any reply)
4) **Qualified** (has GBP/Yelp activity + pain confirmed)
5) **Demo booked** (date/time set)
6) **Trial / Sample drafts sent**
7) **Paid**
8) **Lost** (no fit / no response / wrong contact)

**Minimum daily activity targets (starting point):**
- New emails/day: 50 (ramp up per schedule)
- Follow-ups/day: 25–50 (depending on reply rate)
- Agency lane: 10 new/day (manual, higher personalization)

---

## 10) What I need from the owner to start producing the 500–1,000 CSV immediately
Choose one geography scope (so queries are consistent):
- **Option A:** Top 25 US metros (highest density, fastest list build)
- **Option B:** 5–10 target states (good if you want regional focus)
- **Option C:** US-wide (more variety, slower QA)

Once geo is chosen, the list build can start the same day using the workflow above, and outreach can begin as soon as the first 50–100 leads are ready.
