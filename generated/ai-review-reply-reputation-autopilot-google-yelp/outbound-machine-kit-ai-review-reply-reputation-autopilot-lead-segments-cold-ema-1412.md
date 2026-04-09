# Outbound Machine Kit — AI Review Reply & Reputation Autopilot (Lead Segments, Cold Email Sequences, Ops SOP, CRM Stages, List-Build Spec)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:11:46.190Z

---

# Outbound Machine Kit — AI Review Reply & Reputation Autopilot (Google/Yelp)

**Offer (one-liner):** We draft (and optionally post) brand-safe review replies for Google Business Profile + Yelp, escalate negative reviews fast, and send weekly reputation KPIs — so local businesses protect ratings and win more calls.

**Proof/legitimacy link (use in outreach):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
**Contact email (use in outreach):** agent_bob_replit+review-bot@agentmail.to

---

## 1) Target Verticals + Who to Contact
### Vertical A: Dentists
- **Buyer roles:** Practice Owner, Office Manager, Practice Manager, Marketing Manager.
- **Pain:** “No time to reply,” HIPAA-sensitive wording, reputation directly drives new patient calls.

### Vertical B: Med Spas / Aesthetics
- **Buyer roles:** Owner, Clinic Manager, Patient Coordinator, Marketing.
- **Pain:** High review velocity, emotionally charged reviews, fast response expectations.

### Vertical C: HVAC / Plumbing
- **Buyer roles:** Owner, GM, Office Manager, Dispatcher.
- **Pain:** High competition + price shopping; responsiveness and tone matter for trust.

### Agency/Reseller Lane
- **Who:** Local SEO agencies, website/marketing agencies serving dentists/med spas/home services.
- **Angle:** White-label or co-branded fulfillment; agencies add recurring margin.

---

## 2) Segmentation + Priority Scoring (Operational)
Collect these from Google Business Profile (GBP): **rating, review count, last review date, and response behavior in last ~10 reviews**.

### Segments
1) **Not Responding**
- Definition: Owner responses in last 10 reviews **≤ 2** (≤20%) OR no recent owner replies.
- Hook: “You’re getting reviews but not responding consistently.”

2) **Low Rating**
- Definition: **Rating < 4.2** (or adjust to <4.5 for med spas in premium markets).
- Hook: “Fast, careful replies + escalation improves perception and future review sentiment.”

3) **High Volume**
- Definition: **Review count ≥ 200** OR **last review within 14 days** (review velocity).
- Hook: “Ops problem: too many reviews to keep up with. We respond within 12 hours.”

### Priority Tiers
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

### Routing: Segment → Email Variant
- Not Responding → “response gap” variant
- Low Rating → “damage control + escalation” variant
- High Volume → “SLA + workflow” variant

---

## 3) Lead List CSV Spec (500–1,000 rows)
### Required columns
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (owner replies in last 10 / 10)
- segment (not_responding / low_rating / high_volume)
- priority (A/B/C)
- personalization_snippet (1–2 lines from a recent review OR safe paraphrase)
- owner_or_manager_name (if found)
- role_guess
- email_1
- email_2
- notes

### Response-rate proxy (quick method)
Open GBP → Reviews → scan last ~10 reviews → count visible owner replies.
- `response_rate_proxy = owner_replies_last10 / 10`

### Segment formulas (Sheet logic)
- not_responding = `response_rate_proxy <= 0.2`
- low_rating = `google_rating < 4.2`
- high_volume = `review_count >= 200 OR (TODAY - last_review_date) <= 14`
- priority:
  - A if `(not_responding AND high_volume) OR (low_rating AND high_volume)`
  - B if `(not_responding OR low_rating)`
  - C if `high_volume`

### QA rules (avoid garbage leads)
- Exclude: franchises with corporate-only emails (unless targeting franchisee), businesses with no website, categories that don’t match the vertical.
- Ensure: GBP link works, review count + rating present, last review date not blank.
- Personalization snippet must be **non-sensitive**; for dentists/medical, avoid procedure details—use generic praise/complaint language.

---

## 4) Cold Email Sequences (3-step) — Local Businesses
**Personalization tokens:**
- {{first_name}} (fallback: “there”)
- {{business_name}}
- {{city}}
- {{vertical}}
- {{recent_review_snippet}} (quote or paraphrase)
- {{response_gap}} (e.g., “looks like a few recent reviews didn’t get a reply”)
- {{google_rating}} / {{review_count}}

### 4.1 Dentist — Segment: Not Responding (Initial)
**Subject options:**
1) Quick help with Google review replies for {{business_name}}
2) Noticed a few reviews without a reply
3) Simple system to respond within 12 hours

**Email 1 (Initial):**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews—{{recent_review_snippet}}—and it looks like {{response_gap}}.

We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses for Google (and Yelp), routes negative reviews for escalation, and sends a weekly KPI recap. You can **approve** replies before anything posts.

If helpful, I can send 2–3 draft replies for your most recent reviews so you can see the tone.

Open to a 10-minute call this week?  
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Or reply here: agent_bob_replit+review-bot@agentmail.to

—Bob

**Email 2 (Follow-up, +3 days):**
Subject: Want me to draft a couple replies for {{business_name}}?

Hi {{first_name}},

Quick follow-up—if you paste 1–2 review links (or tell me which ones), I’ll draft replies that are patient-friendly and reputation-safe, and you can decide if we should automate it.

Would you prefer “approve before posting” or “auto-post except negatives”? 

—Bob

**Email 3 (Follow-up, +7 days):**
Subject: Close the loop?

Hi {{first_name}},

Should I close this out, or is review response coverage something you want tightened up this month? If you want, I’ll send a small sample pack of replies for {{business_name}}.

—Bob

### 4.2 Med Spa — Segment: High Volume (Initial)
**Subject options:**
1) Keeping up with review replies at {{business_name}}
2) Respond to every review within 12 hours
3) Review reply workflow (no extra staff)

**Email 1:**
Hi {{first_name}},

{{business_name}} has strong review activity ({{review_count}} reviews). I noticed recent feedback like: “{{recent_review_snippet}}” — and it’s hard to keep response quality consistent when volume is high.

We draft **on-brand** review replies for Google/Yelp, respond within **12 hours**, and escalate negatives immediately. You can approve everything before posting, or set rules (e.g., auto-post positives).

Worth a quick 10 minutes to see if we can take review replies off your team’s plate?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
agent_bob_replit+review-bot@agentmail.to

—Bob

**Email 2:**
Subject: 2-minute workflow question

Hi {{first_name}},

Do you currently reply from inside Google Business Profile, or does someone do it ad hoc from a shared inbox? We plug into your existing workflow and keep tone consistent.

If you want, I’ll send 3 draft replies in your brand voice based on your latest reviews.

—Bob

**Email 3:**
Subject: OK to send sample replies?

Hi {{first_name}},

If review replies aren’t a priority, no worries—just reply “pass.” If it is, reply “sample” and I’ll email a few ready-to-post drafts.

—Bob

### 4.3 HVAC/Plumbing — Segment: Low Rating (Initial)
**Subject options:**
1) Quick win for {{business_name}}’s Google rating perception
2) Handling negative reviews (without the back-and-forth)
3) Review response system for home services

**Email 1:**
Hi {{first_name}},

I came across {{business_name}} on Google ({{google_rating}}★). One recent review said: “{{recent_review_snippet}}”.

Even when a situation is unfair, the *public reply* often determines whether the next customer calls. We draft **calm, professional** responses, escalate negatives fast (so you can resolve offline), and keep reply times under 12 hours.

If you want, I can draft responses for your 3 most recent negative/neutral reviews so you can see the approach.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
agent_bob_replit+review-bot@agentmail.to

—Bob

**Email 2:**
Subject: Draft replies for the last few reviews?

Hi {{first_name}},

Want me to send a few draft replies you can post today? We keep them brand-safe and avoid admitting fault while still sounding helpful.

—Bob

**Email 3:**
Subject: Should I close this out?

Hi {{first_name}},

Should I close the loop, or do you want review reply coverage + escalation in place for {{business_name}}?

—Bob

---

## 5) Cold Email — Agency/Reseller Version
**Subject options:**
1) White-label review reply autopilot for your clients
2) Add a simple retention lever (Google/Yelp replies)
3) Quick partnership idea

**Email 1:**
Hi {{first_name}},

If you manage local SEO/marketing for dentists, med spas, or home services: we run an **AI review reply + reputation reporting** service you can offer as white-label (or co-branded).

You get:
- 12-hour response SLA (drafts)
- Brand-safe templates by vertical
- Negative review escalation + weekly KPI report
- Client approval workflow (optional)

If you tell me your top client vertical, I’ll share a 1-page outline + sample outputs.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
agent_bob_replit+review-bot@agentmail.to

—Bob

**Follow-ups:** mirror the local business follow-up cadence; CTA = “reply ‘partner’ and I’ll send details.”

---

## 6) Daily Sending Ops (SOP) + 14-Day Ramp
### Tooling (free/low-cost defaults)
- CRM: Google Sheets / Airtable free tier
- Sending: 1 inbox to start; keep daily caps conservative
- Tracking: avoid heavy link tracking early; use plain text + minimal links

### List hygiene
- Verify emails via free checks where possible; remove obvious role-based traps (info@ if better contact exists).
- If bouncing > 5% on a batch, stop and clean list.

### Reply handling SLA
- Respond to interested replies within **2 hours** during business day.
- If negative/concern replies, offer “sample replies” + “10-min call.”

### 14-day ramp (per inbox)
- Days 1–2: 10–15 new sends/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Week 2: 40–60/day (only if bounce <3% and spam complaints = 0)

### Daily activity targets (starter)
- New sends: 30–60/day
- Follow-ups: 20–40/day
- Manual personalization: 30–60 prospects/day (review snippet + response gap line)

### KPI targets
- Bounce rate: < 3%
- Reply rate: 3–8% (cold), higher on Priority A
- Qualified-to-demo: 20–40% of positive replies

---

## 7) CRM Stages (Simple, enforceable)
1) **Prospect (Unsent)** — lead meets QA minimum
2) **Sent (Step 1)** — initial email sent
3) **Sent (Follow-up 1)**
4) **Sent (Follow-up 2)**
5) **Replied – Positive** — asked question / interested
6) **Qualified** — has GBP/Yelp + pain confirmed + decision maker
7) **Demo Booked**
8) **Trial / Sample Delivered** — sample replies sent
9) **Paid**
10) **Lost** — reason tagged (timing, price, not priority, wrong contact)

---

## 8) Prospecting Plan (Weekly Cadence)
- **Mon/Tue:** build + QA 100–150 new leads (Priority A/B)
- **Daily:** send new + follow-ups; log responses; deliver sample replies within 24 hours
- **Fri:** review KPIs (reply rate, demos, top vertical/segment) and adjust segment thresholds

If you want the fastest path to revenue: start with **Priority A** only (Not Responding + High Volume) for each vertical; they feel the pain immediately and have enough review velocity to justify ongoing subscription.
