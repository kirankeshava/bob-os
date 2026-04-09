# Outbound Machine (Ready-to-Run): Lead CSV Template + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:18:53.814Z

---

## 1) Lead List CSV (500–1,000) — Headers (copy/paste into CSV/Sheets)

business_name,vertical,city,state,zip,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,segment,priority_tier,contact_name,contact_role_guess,email_1,email_2,linkedin_url,notes

### Data dictionary (what to collect)
- **vertical**: dentist | med_spa | hvac_plumbing | agency
- **google_rating**: number shown on Google (e.g., 4.3)
- **review_count**: total reviews shown
- **last_review_date**: date of most recent review (YYYY-MM-DD)
- **last_review_excerpt**: 8–20 words from the most recent review (or paraphrase if it contains sensitive info)
- **response_rate_proxy_last10**: % of last 10 reviews that have an owner response (0–100). If you can’t compute, leave blank and still segment by rating/review velocity.
- **segment** (rules below)
- **priority_tier**: A/B/C (rules below)

### Segmentation rules (use in Sheets)
Define three booleans:
- **Not Responding** if response_rate_proxy_last10 <= 20 OR blank AND you visually see “no responses” on recent reviews.
- **Low Rating** if google_rating < 4.2
- **High Volume** if review_count >= 200 OR last_review_date within last 14 days

Then set **segment**:
- if Low Rating => low_rating
- else if Not Responding => not_responding
- else if High Volume => high_volume
- else => baseline

Priority tiers:
- **Priority A**: (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B**: not_responding OR low_rating
- **Priority C**: high_volume only

### QA rules (reject leads)
Reject if: no website and no clear contact path; franchise locations with centralized reviews you can’t manage; category mismatch (e.g., “dental lab” when targeting dentists); business permanently closed; non-local-only service with no GBP.

---

## 2) Segmented Prospecting Plan (what to send to whom)

### Verticals
1) **Dentists**: high LTV, frequent reviews, reputation drives bookings.
2) **Med spas/aesthetic clinics**: high review sensitivity, high competition, lots of “shopping” behavior.
3) **HVAC/plumbing**: high lead velocity, reviews = trust, frequent negative reviews during peak seasons.

### Segment → offer angle mapping
- **Not Responding**: “You’re getting reviews but leaving revenue on the table; we respond within 12 hours, brand-safe, you approve.”
- **Low Rating**: “We escalate negatives, draft de-escalation replies, and create a closed-loop process to recover trust.”
- **High Volume**: “We handle throughput: queue + approvals + weekly KPI report so you don’t fall behind.”

### Agency lane (parallel)
Target agencies who serve these verticals (local SEO, PPC, web). Offer: white-label review response + KPI reporting, done-for-you, agency margin.

---

## 3) Cold Email Copy (3-step) — include personalization tokens

**Personalization tokens**
- {{business_name}}, {{city}}, {{vertical_word}}, {{recent_review_snippet}}, {{response_gap_fact}}, {{rating}}, {{review_count}}, {{last_review_date}}

Use this “response gap fact” pattern:
- “I noticed a few recent reviews haven’t gotten an owner reply yet.” (safe)
- Avoid: quoting sensitive health details; do not mention patient/client specifics.

### 3.1 Initial email — Not Responding (local business)
**Subject options:**
1) Quick win for {{business_name}}’s Google reviews
2) Noticed a response gap on your reviews
3) 12-hour review replies (you approve)

Hi {{contact_name or "there"}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”. I also noticed some recent reviews don’t have an owner response yet.

We built an **AI Review Reply & Reputation Autopilot** that drafts brand-safe replies for Google + Yelp, **escalates negative reviews**, and sends a **weekly KPI report** (rating trend, response rate, volume). You can keep it “approve-first” so nothing posts without you.

If I send 2–3 draft replies for your latest reviews as a sample, who’s the right person to approve them?

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Or reply here: agent_bob_replit+review-bot@agentmail.to

— Bob

### Follow-up 1 — Not Responding
Subject: Re: {{business_name}} review replies

Hi {{contact_name or "there"}},

Still happy to send a few **ready-to-post** draft replies for {{business_name}} (Google/Yelp). It’s designed to keep tone consistent and help you respond fast—especially when you’re busy.

Do you want this **approve-first** (nothing posts without you), or **auto-post** for 4–5 star reviews only?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Follow-up 2 — Not Responding
Subject: close the loop on reviews?

Hi {{contact_name or "there"}},

Last try—should I:
A) send 2–3 sample replies for your most recent reviews, or
B) circle back next month?

— Bob (agent_bob_replit+review-bot@agentmail.to)

---

### 3.2 Initial email — Low Rating (local business)
**Subject options:**
1) Quick help recovering from negative reviews
2) Fixing the “public reply” side of {{business_name}}
3) Simple escalation process for bad reviews

Hi {{contact_name or "there"}},

I saw {{business_name}}’s Google rating is around {{rating}} and you’re getting steady review volume ({{review_count}} total). One recent review mentioned: “{{recent_review_snippet}}”.

We run an AI-assisted review response workflow that:
- drafts calm, brand-safe public replies
- flags negative reviews for **same-day escalation**
- tracks weekly KPIs so you can see if reputation is improving

If you want, I can send 2 sample replies: one for a positive review and one for a negative review (you can edit/approve).

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply: agent_bob_replit+review-bot@agentmail.to

— Bob

### Follow-up 1 — Low Rating
Subject: Re: {{business_name}} review workflow

Hi {{contact_name or "there"}},

Most businesses don’t need “more reviews” first—they need a consistent public response + escalation loop so prospects see professionalism.

Open to a 10-minute call this week to see if this fits {{business_name}}?

— Bob

### Follow-up 2 — Low Rating
Subject: should I send the samples?

Hi {{contact_name or "there"}},

Want me to send the 2 sample replies (approve-first), or should I close the loop?

— Bob

---

### 3.3 Initial email — High Volume (local business)
**Subject options:**
1) Keeping up with {{business_name}}’s review volume
2) Review reply backlog → handled
3) Weekly reputation KPI report

Hi {{contact_name or "there"}},

{{business_name}} has strong review activity ({{review_count}} total; latest on {{last_review_date}}). When volume is high, replies tend to slip—even for great teams.

Our autopilot drafts Google/Yelp replies in your voice, routes negatives for escalation, and sends a weekly KPI snapshot (response rate, rating trend, volume). You can choose approve-first.

Who handles customer experience / reviews on your side?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Follow-up 1 — High Volume
Subject: Re: review reply backlog

Hi {{contact_name or "there"}},

If you forward me a link to your Google profile, I’ll send a quick snapshot: estimated response rate on recent reviews + 2 example replies.

— Bob

### Follow-up 2 — High Volume
Subject: ok to close this?

Hi {{contact_name or "there"}},

Should I send the snapshot + sample replies, or close this out for now?

— Bob

---

## 4) Agency/Reseller Email (one-lane) — initial + 2 follow-ups

### Initial (agency)
Subject: White-label Google/Yelp review replies for your clients

Hi {{first_name}},

If you manage local SEO/PPC for {{vertical_word}} clients: we built a white-label **review response autopilot** for Google Business Profile + Yelp.

It drafts brand-safe replies, escalates negatives, and generates a weekly KPI report you can drop into your client reporting. Delivery can be approve-first, and we can operate under your agency brand.

Can I send a 1-page overview and suggested pricing/margin model?

Overview/proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob (agent_bob_replit+review-bot@agentmail.to)

### Follow-up 1 (agency)
Subject: Re: white-label review replies

Hi {{first_name}},

Typical agencies position it as “Reputation Management Lite”:
- weekly KPI report
- reply SLAs
- negative review escalation

Worth a quick chat to see if it fits your client base?

— Bob

### Follow-up 2 (agency)
Subject: close the loop?

Hi {{first_name}},

Should I send the 1-pager + margin model, or close this?

— Bob

---

## 5) Daily Sending Ops Checklist + CRM Stages

### 14-day ramp (per inbox)
- Days 1–3: 10–15/day (mostly Follow-ups are fine if you have them; otherwise new sends only)
- Days 4–7: 20–35/day
- Days 8–14: 40–60/day
Guardrails: pause if bounce rate > 3% in a day or spam complaints > 0.1%.

### Daily routine (60–90 minutes)
1) Pull 25–50 new leads (Priority A first), verify website/contact.
2) Personalize 1 line using {{recent_review_snippet}} + response gap.
3) Send new emails (per ramp cap).
4) Process replies within 4 business hours:
   - Interested → book demo
   - Not now → set follow-up date
   - Wrong person → ask for correct contact
5) Queue Follow-up 1 to non-replies after 2 business days; Follow-up 2 after 4–5 business days.

### CRM stages (simple)
- Prospect (qualified lead in CSV)
- Sent (Email 1 sent)
- Replied
- Qualified (pain confirmed: low response rate / low rating / high volume)
- Demo Booked
- Trial/Proof (sample replies sent; approval workflow shown)
- Paid
- Lost (reason tagged)

### Minimum KPI targets
- Delivery rate > 97%
- Reply rate 3–8% (cold), meeting-book rate 0.5–2%
- 5–10 demos/week once volume reaches 250–500 sends/week

---

## 6) What I still need from the owner to finalize list-building
Pick one for the first 500–1,000 leads:
- **Top 25 US metros** (fastest, consistent)
- **5–10 states** (if you want regional density)
- **US-wide** (broadest, more QA time)

Once geography is chosen, the query pack can be locked and the first 50 leads can be built in a single sprint to validate segmentation before scaling to 500–1,000.
