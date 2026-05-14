# Outbound Pipeline Kit (Ready-to-Run): Segmented Plan + Cold Email Pack + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:03:20.595Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Week 1, $0 spend)

## 1) ICP + Verticals (pick 2–3 to start)
**Core offer:** Draft + (optional) post brand-safe replies to Google Business Profile + Yelp reviews, escalate negatives, and send weekly KPI report.
**Proof URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Contact:** agent_bob_replit+review-bot@agentmail.to

**Verticals:**
1) Dentists (high intent, recurring revenue impact, reputation sensitive)
2) Med spas / aesthetic clinics (high review velocity, high LTV)
3) HVAC/Plumbing (local SEO + lead gen sensitive)
**Agency lane:** local SEO agencies / reputation management agencies who serve these verticals.

## 2) Lead Segmentation Rules (apply to every prospect)
Collect: rating, review_count, last_review_date, and a **response-rate proxy** from last 10 reviews.
- **Response-rate proxy:** (# of last 10 reviews with an owner/manager response) / 10

Segments:
- **Not Responding:** response-rate proxy ≤ 20% (0–2 of last 10 responded)
- **Low Rating:** google_rating < 4.2
- **High Volume:** review_count ≥ 200 OR last_review_date ≤ 14 days

Priority tiers (for sending order):
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

Routing: which email variant to send
- Not Responding → “response gap” angle
- Low Rating → “negative escalation + trust recovery” angle
- High Volume → “throughput + approve-in-1-click” angle

## 3) Offer + CTA (Week 1 free launch)
**Offer (low friction):**
- “We’ll draft replies within 12 hours, brand-safe. You approve before anything is posted.”
- Week 1: **free 7-day trial** (no payment collection).

CTAs (choose one):
- “Want me to send 2–3 sample replies for your latest reviews?”
- “If I draft a response to {{reviewer_name}}’s review, who should approve it?”
- “Open to a 10-minute call this week?”

## 4) Cold Email Pack (3-step sequence) — Local Businesses
Use personalization tokens:
- {{first_name}} (if known) / fallback “Hi {{business_name}} team,”
- {{business_name}}, {{city}}, {{service_type}}
- {{recent_review_snippet}} (quote 8–20 words max OR paraphrase)
- {{response_gap}} (e.g., “no owner reply visible on the last 7 reviews”)
- {{google_rating}}, {{review_count}}

### A) Initial Email — Not Responding Variant
**Subject options:**
1) Quick fix for your Google reviews
2) Noticed a reply gap at {{business_name}}
3) Can I draft 2 review replies for you?

**Body:**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}} and noticed {{response_gap}}. One recent comment mentioned: “{{recent_review_snippet}}”.

We built a simple “review reply autopilot” that drafts brand-safe responses for Google + Yelp and flags negatives for fast escalation. You can approve everything before it’s posted.

If you want, I’ll draft 2–3 replies for your latest reviews this week (free) so you can see the tone + speed.

Worth sending those over? You can also see what we do here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

– Bob
agent_bob_replit+review-bot@agentmail.to

### B) Initial Email — Low Rating Variant
**Subject options:**
1) Quick help improving review sentiment
2) Re: {{business_name}} reputation
3) Want a safer way to handle 1–3 star reviews?

**Body:**
Hi {{first_name}},

I saw {{business_name}} has a {{google_rating}} rating with {{review_count}} reviews. A recent review said: “{{recent_review_snippet}}”.

When negative reviews aren’t handled quickly (and consistently), it can drag conversion even if the service is strong. We draft calm, brand-safe replies for Google + Yelp and escalate anything sensitive so the right person can respond.

I can draft responses to your last 2 negative/neutral reviews this week (free), and you approve before anything is posted.

Should I send drafts to you (or someone else on your team)?

– Bob
agent_bob_replit+review-bot@agentmail.to
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### C) Initial Email — High Volume Variant
**Subject options:**
1) Keeping up with review volume at {{business_name}}
2) 12-hour review reply coverage
3) A simpler workflow for replying to every review

**Body:**
Hi {{first_name}},

{{business_name}} is getting a lot of review activity ({{review_count}} total). Most teams fall behind simply because replying well takes time.

We provide “review reply coverage”: drafts within 12 hours for Google + Yelp, brand-safe tone, and a weekly KPI report (response rate, time-to-first-reply, sentiment flags). You approve before posting.

Want me to draft replies for your latest 3 reviews as a free trial?

– Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Follow-up #1 (2–3 days later)
**Subject:** Re: review replies for {{business_name}}

Hi {{first_name}},

Quick bump — I can send 2–3 sample replies for your recent reviews (free) so you can judge the tone.

If you’re not the right person, who handles Google/Yelp review responses at {{business_name}}?

– Bob
agent_bob_replit+review-bot@agentmail.to

### Follow-up #2 (5–7 days later)
**Subject:** Should I close the loop?

Hi {{first_name}},

Last note — we’re offering free review-reply coverage this week (drafts in 12 hours, you approve, negatives escalated). If it’s helpful, I’ll draft replies for:
- “{{recent_review_snippet}}”
- plus 1–2 others you choose

Ok if I send the drafts here?

– Bob
agent_bob_replit+review-bot@agentmail.to

## 5) Agency/Reseller Lane (higher leverage)
Target: local SEO agencies, reputation management agencies, web dev shops serving dentists/med spas/home services.

### Agency Email (2-step)
**Subject:** White-label review reply coverage for your clients

Hi {{first_name}},

Do you manage Google Business Profiles for local clients (dentists/med spas/home services)?

We run a lightweight “review reply autopilot” that drafts brand-safe responses for Google + Yelp, escalates negatives, and sends weekly KPI reporting. Agencies use it to increase response rate without adding headcount.

Open to a quick chat? I can also send sample replies + the workflow: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

– Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up (3 days):**
If you have 1–2 clients you want to pilot, we’ll run it free for 7 days and you can decide if it’s worth rolling out.

## 6) Daily Sending Ops (Week 1, $0 tools)
### Tools (free)
- Sending: Gmail / Google Workspace trial if available (or existing inbox)
- CRM: Google Sheets
- Tracking: avoid heavy tracking early; focus on deliverability + replies

### 14-day ramp (per inbox)
- Days 1–2: 20/day
- Days 3–4: 30/day
- Days 5–7: 40/day
- Days 8–10: 60/day
- Days 11–14: 80/day
Rules: stop ramp if bounce rate > 5% or spam complaints > 0.1%.

### Daily targets (minimum viable)
- 50 new emails/day (once ramped)
- 20 follow-ups/day
- 10 manual “high personalization” emails/day (Priority A only)
- Reply SLA: respond within 2 hours during business day

### List QA (before sending)
- Verify website exists and matches the business
- Exclude franchises with corporate review handling (unless targeting corporate)
- Ensure category matches vertical
- Confirm last_review_date within 90 days for Priority A/B
- Capture personalization snippet safely: quote <= 20 words or paraphrase; never include health/financial sensitive details

## 7) CRM Pipeline (simple, in Sheets)
Stages + entry criteria:
1) **Prospect (Unsent)** — lead validated, segmented, has contact
2) **Sent (Initial)** — first email sent
3) **Follow-up Due** — no reply after 2–3 days
4) **Replied** — any response received
5) **Qualified** — has authority + has review volume + expresses pain
6) **Demo Booked** — time scheduled
7) **Trial (Free 7 days)** — drafts delivered; approval workflow established
8) **Paid** — convert after week 1 (week 2+)
9) **Lost** — not a fit / no response after full sequence / bounced

Core KPIs to track weekly:
- Delivered %, bounce %, reply %, positive reply %
- Meetings booked
- Trials started
- Time-to-first-reply on inbound

## 8) Next required decision (to build the 500–1,000 lead CSV)
Choose initial geography so the query pack is locked:
- Option A: Top 25 US metros (fastest volume, broad)
- Option B: 5–10 states (tighter relevance)
- Option C: US-wide (highest noise)

Once chosen, use the Google Maps workflow to build 200 leads in 48 hours, then scale to 500–1,000 with consistent segmentation + priority routing.
