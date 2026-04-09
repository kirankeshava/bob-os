# Outbound Machine (Ready-to-Run): Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T08:12:09.590Z

---

# AI Review Reply & Reputation Autopilot — Outbound Machine (Ready-to-Run)

Business website (for trust/legitimacy link in outbound): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Reply/contact email to use in templates: agent_bob_replit+review-bot@agentmail.to

## 1) ICP + Vertical Focus (2–3 lanes)
**Lane A — Dental Practices** (high LTV, steady review velocity, reputation directly impacts new patients)
- Titles to reach: Practice Owner, Office Manager, Practice Manager

**Lane B — Med Spas / Aesthetic Clinics** (high review velocity + competitive local search)
- Titles: Owner, Clinic Manager, Med Spa Director

**Lane C — Home Services (HVAC + Plumbing)** (high intent local search; reviews are conversion-critical)
- Titles: Owner, GM, Service Manager

**Lane D (parallel) — Agencies/Resellers** (marketing/web agencies serving these verticals)
- Titles: Founder, Account Manager, Client Success

## 2) Lead Segmentation + Priority Scoring (what to chase first)
Collect these fields for each prospect (minimum viable): business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy (owner replies in last 10 reviews / 10), personalization_snippet (recent review excerpt or paraphrase), segment, priority.

### Segments
**Not Responding**
- Criteria: response_rate_proxy ≤ 0.2 OR 0 owner replies in last 10 reviews
- Angle: “response gap” + speed + brand-safety + approvals

**Low Rating**
- Criteria: google_rating < 4.2
- Angle: “damage control” + escalation workflow + consistent professional replies

**High Volume**
- Criteria: review_count ≥ 200 OR last_review_date within 14 days
- Angle: “throughput/ops” + SLA (“within 12 hours”) + weekly KPI reporting

### Priority rubric
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

Routing rule: Priority A gets the most personalized email (review snippet + clear gap). Priority B uses light personalization. Priority C uses volume/ops framing.

## 3) Prospecting Plan (how to pull and work the market)
### Direct-to-local weekly plan (per vertical)
**Week 1:** 200 prospects total (to validate messaging + deliverability)
- Dental: 80
- Med Spa: 70
- HVAC/Plumbing: 50

**Week 2:** 300–500 prospects
- Double down on vertical with highest reply → demo conversion.

### Agency lane weekly plan
- 50–100 agencies/week (web/SEO/PPC/local marketing agencies) that serve dentists/med spas/home services.
- Offer: white-label/reseller pricing + “we respond in 12 hours” SLA + weekly client report.

## 4) Cold Email Copy (3-step sequence)
Usage notes:
- Always include the website trust link once (Email #1 or #2): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Always send from / reply-to: agent_bob_replit+review-bot@agentmail.to
- Personalization tokens:
  - {{first_name}} (or “there”)
  - {{business_name}}
  - {{city}}
  - {{recent_review_snippet}} (quote ≤ 1 sentence OR paraphrase)
  - {{response_gap}} (e.g., “looks like the last few reviews didn’t get an owner reply”)

### 4A) DENTAL — Email #1 (Not Responding / High Volume)
**Subject options (pick 1):**
1) Quick idea for {{business_name}} reviews
2) Noticed a review response gap for {{business_name}}
3) Helping dental offices reply in under 12 hrs

**Body:**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw: “{{recent_review_snippet}}”. {{response_gap}}.

We built an **AI Review Reply & Reputation Autopilot** that drafts brand-safe responses for Google/Yelp, flags negatives for escalation, and sends a weekly KPI report. Typical setup is:
- responses drafted within **12 hours**
- you can **approve/edit** before anything posts
- negatives get escalated with suggested next steps

If you want, I can send 3 sample replies (based on your latest reviews) so you can see the tone.

Worth a quick look this week?

— Bob
agent_bob_replit+review-bot@agentmail.to
More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 4B) DENTAL — Follow-up #1 (2–3 days later)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

Most offices we talk to don’t need “more reviews” as much as **consistent replies**, especially when a patient mentions wait time, billing, or staff experience.

Want me to draft 2–3 example responses for {{business_name}} (no commitment)?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4C) DENTAL — Follow-up #2 (5–7 days later)
**Subject:** Close the loop?

Hi {{first_name}},

Should I close the loop on this, or is someone else best to talk to about reputation/reviews for {{business_name}}?

If it helps, we can start with a lightweight trial: draft replies + approval flow + weekly KPI email.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

### 4D) MED SPA — Email #1 (Low Rating angle)
**Subject options:**
1) Quick win for {{business_name}} reputation
2) Saw a couple tough reviews for {{business_name}}
3) Med spa review replies (brand-safe)

**Body:**
Hi {{first_name}},

I came across {{business_name}} and noticed a recent review: “{{recent_review_snippet}}”. When ratings dip even slightly in a competitive market, it can affect booking volume.

We run an **AI Review Reply & Reputation Autopilot** for Google/Yelp:
- consistent, brand-safe replies in your voice
- negative reviews escalated (refund/redo/manager follow-up suggestions)
- weekly KPI report (rating trend, reply rate, time-to-reply)
- optional **approval before posting**

Want me to draft a response to that review (and two others) so you can see how it sounds?

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 4E) MED SPA — Follow-up #1
**Subject:** Re: {{business_name}}

Hi {{first_name}},

If you already have someone “monitoring” reviews, the gap is usually speed + consistency.

We aim for **same-day drafts**, and you can keep approvals on until you’re comfortable.

Open to a 10-min call, or should I just email a few sample replies?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4F) MED SPA — Follow-up #2
**Subject:** Who owns reviews at {{business_name}}?

Hi {{first_name}},

Quick one — who’s the right person for Google/Yelp review responses at {{business_name}}?

If you point me to them, I’ll send a 3-reply sample pack using your latest reviews.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

### 4G) HVAC/PLUMBING — Email #1 (High Volume / speed)
**Subject options:**
1) Faster review replies for {{business_name}}
2) 12-hour review response SLA?
3) Keeping up with Google reviews in {{city}}

**Body:**
Hi {{first_name}},

Saw a recent review for {{business_name}}: “{{recent_review_snippet}}”. {{response_gap}}.

For home services, quick, professional replies help conversions (people compare 2–3 providers fast). We built an **AI Review Reply & Reputation Autopilot**:
- drafts responses for Google/Yelp within **12 hours**
- escalates negatives to you with recommended next steps
- sends a weekly KPI email (reply rate, time-to-reply, rating trend)
- approvals optional

Want me to send a few example replies in your brand voice?

— Bob
agent_bob_replit+review-bot@agentmail.to
More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 4H) HVAC/PLUMBING — Follow-up #1
**Subject:** Re: review replies

Hi {{first_name}},

We usually see two quick wins:
1) reply consistently to recent reviews (signals trust)
2) handle negatives with a tight escalation workflow (refund/redo/manager call)

If you want, I’ll send 3 sample replies using your most recent reviews.

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4I) HVAC/PLUMBING — Follow-up #2
**Subject:** Close this out?

Hi {{first_name}},

Should I close this out, or is there someone else who handles Google/Yelp reviews for {{business_name}}?

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 5) Agency/Reseller Version (Email #1)
**Subject options:**
1) White-label review response for your local clients
2) Add “review replies in 12 hrs” to your packages
3) Quick partner idea (dentist/med spa/home services)

**Body:**
Hi {{first_name}},

If you manage local SEO/reputation for clients, we can take **review response execution** off your plate.

We run an **AI Review Reply & Reputation Autopilot** for Google/Yelp:
- brand-safe drafts within **12 hours**
- optional client approval flow
- negative review escalation + suggested remediation steps
- weekly KPI report you can forward to clients

If you have 5–20 clients in dentists/med spas/home services, this is easy to bundle as a line item.

Want a quick overview + sample report? 

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 6) Outbound Ops (Daily sending + CRM)
### CRM stages (minimum viable)
1) Prospects (not sent)
2) Sent (Email #1)
3) Replied
4) Qualified (pain confirmed: time, negative reviews, competition, no owner replies)
5) Demo Booked
6) Trial/POC
7) Paid
8) Lost (no need / wrong contact / timing)

### 14-day sending ramp (safe default)
- Days 1–2: 20/day
- Days 3–4: 30/day
- Days 5–7: 40/day
- Week 2: 50–80/day (only if bounce rate < 3% and complaints ~0)

### Daily activity targets (starting point)
- New emails sent: 30–80/day (depending on ramp)
- Follow-ups: 1.5–2x new sends (automated sequence)
- Manual personalization: 10–20/day for Priority A accounts
- Replies handled: same day (SLA: < 4 business hours)

### List QA rules (prevent garbage)
- Must have: Google rating + review count + last review date + maps URL
- Prefer: website present (for contact email capture)
- Exclude: national franchises (unless owner-operated), businesses with no reviews, closed/permanently closed
- Personalization snippet: quote ≤ 1 sentence; if sensitive, paraphrase

### Deliverability guardrails
- Stop a campaign if: bounce rate > 5% in a day or any spam/abuse warnings.
- Remove any “role accounts” that bounce (info@) and re-enrich.

## 7) What I need from the owner to unlock the 500–1,000 CSV
Pick one geography scope for the first build:
- Option A: Top 25 US metros (fastest learning, broad)
- Option B: 5–10 target states (tighter operations)
- Option C: US-wide (largest, most noise)

Once chosen, use the list-build workflow (Google Maps pulls + website contact capture + response-rate proxy) to generate the CSV, then we’ll QA and start sends immediately.