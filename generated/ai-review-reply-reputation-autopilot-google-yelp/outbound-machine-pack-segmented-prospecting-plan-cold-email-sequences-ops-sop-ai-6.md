# Outbound Machine Pack — Segmented Prospecting Plan + Cold Email Sequences + Ops SOP (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T00:53:19.894Z

---

## 1) Segmented Prospecting Plan (who to target, how to segment, what to say)

### Target verticals (initial 30-day sprint)
1) **Dental practices** (high trust, high competition, steady review velocity)
2) **Med spas / aesthetic clinics** (very review-driven, high LTV, frequent reputation issues)
3) **HVAC + plumbers** (high review volume, rapid response expectations, phone-call revenue impact)

### Core ICP (local business)
- 1–20 locations, owner/operator or office manager is decision maker.
- Actively receiving reviews (signals demand), but inconsistent or slow responses.
- Ratings sensitive: consumers compare top 3 map results.

### Agency / reseller ICP
- Local SEO agencies, small marketing agencies, web dev shops managing 10–100+ SMB clients.
- Value: adds an “always-on reputation layer” without staffing responses.

---

## 2) List build spec (for the 500–1,000 lead CSV)

### Required CSV columns (final)
- business_name
- vertical (Dental / Med Spa / HVAC-Plumbing)
- website
- city_state
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy (owner responses in last 10 reviews / 10)
- segment_primary (Not Responding / Low Rating / High Volume)
- priority (A/B/C)
- contact_name (if found)
- contact_role (Owner/Manager/Office Manager/Marketing)
- email_1
- email_2
- personalization_snippet (short excerpt from most recent review)
- notes (e.g., “multi-location”, “franchise”, “has chatbot”, “review mentions staff name”, etc.)

### Segmentation rules (apply consistently)
- **Not Responding**: response_rate_proxy ≤ 0.20 OR 0 owner responses in last 10
- **Low Rating**: google_rating < 4.2
- **High Volume**: review_count ≥ 200 OR last_review_date within 14 days

### Priority scoring (operational)
- **Priority A**: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B**: (Not Responding) OR (Low Rating)
- **Priority C**: High Volume only

### Messaging map (segment → angle)
- Not Responding → “response gap” + speed/SLA + brand-safe approvals
- Low Rating → “recover trust” + escalation workflow + reduce 1-star damage
- High Volume → “throughput” + consistency + weekly KPI reporting

### Geo plan (recommended if US-only)
Start with **top metros** where these verticals cluster and competition is intense:
- Dental/Med spa: NYC, LA, Chicago, Dallas, Houston, Phoenix, Miami, Atlanta, DC, Seattle, Denver
- HVAC/Plumbing: Dallas, Houston, Phoenix, Atlanta, Charlotte, Tampa, Orlando, Nashville, Austin, Denver

List size recommendation for a 30-day sprint:
- 400 local businesses (mixed verticals) + 100–200 agencies/resellers.

---

## 3) Cold email sequences (3-step) — Local Businesses

### Universal personalization tokens
- {{first_name}} (or fallback: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (8–18 words)
- {{last_review_date}}
- {{response_gap}} (e.g., “looks like the last ~10 reviews have 0 owner replies”)
- {{vertical_specific_value}} (e.g., “new patient calls”, “bookings”, “service calls”)

### Sequence A: Not Responding (best for Priority A/B)

**Email 1 (Day 1)**
Subject: Quick idea for {{business_name}} reviews

Hi {{first_name}},

I was looking at {{business_name}} on Google and saw a recent review: “{{recent_review_snippet}}”.

{{response_gap}} — totally normal when the team is busy, but it can quietly cost {{vertical_specific_value}} because prospects look for active owner responses.

We built a simple **Review Reply Autopilot**: brand-safe drafts in your voice, **responses within 12 hours**, and you can approve/edit before anything posts. Negative reviews get **escalated** with suggested make-good language.

Open to a 10-minute chat this week? I can also send 2–3 sample replies for your last reviews.

– {{your_name}}

**Email 2 (Day 3)**
Subject: Want me to draft 3 replies for you?

Hi {{first_name}},

If you want, reply with “yes” and I’ll draft responses to 3 of your latest Google reviews (including the one that says “{{recent_review_snippet}}”).

No login needed to start—just want to show what “fast + brand-safe” looks like.

Should I send them over?

– {{your_name}}

**Email 3 (Day 7)**
Subject: Close the loop on review responses

Hi {{first_name}},

Last note—if responding to reviews keeps slipping, we can take it off your plate:
- draft + post on Google (and Yelp if you want)
- 12-hour SLA
- negative-review escalation + weekly KPI email

If it’s not a priority, no worries—should I close the loop?

– {{your_name}}

---

### Sequence B: Low Rating (Priority A/B)

**Email 1 (Day 1)**
Subject: Fixing the review “story” for {{business_name}}

Hi {{first_name}},

I noticed {{business_name}} is at **{{google_rating}}** on Google, and one recent review mentioned: “{{recent_review_snippet}}”.

Even a few unaddressed negatives can dominate what prospects remember. We help businesses respond quickly with brand-safe language, and we **escalate** sensitive reviews so you can recover the customer (and show future customers you care).

Would it be helpful if I sent 2 draft responses you could post today?

– {{your_name}}

**Email 2 (Day 3)**
Subject: Escalation workflow for 1–2 star reviews

Hi {{first_name}},

Most owners don’t need “more software”—they need a simple workflow:
1) draft reply in your tone
2) flag risk (HIPAA/claims/arguments)
3) escalate to you with a recommended response
4) weekly report on rating trend + response time

If you’re open, I can walk you through it in 10 minutes.

– {{your_name}}

**Email 3 (Day 7)**
Subject: Should I send sample replies?

Hi {{first_name}},

I can send sample replies for:
- 1 negative review (de-escalation)
- 1 neutral review (service recovery)
- 1 positive review (referral-friendly)

Want me to draft those for {{business_name}}?

– {{your_name}}

---

### Sequence C: High Volume (Priority A/C)

**Email 1 (Day 1)**
Subject: Keeping up with review volume at {{business_name}}

Hi {{first_name}},

{{business_name}} is getting a steady flow of reviews (last one on {{last_review_date}}). That’s great—until responses fall behind and the profile looks unattended.

We run a lightweight **review response ops layer**: drafts + posting, 12-hour SLA, and weekly KPIs (response time, sentiment, unresolved negatives). You stay in control with approval rules.

Worth a quick call to see if it fits your process?

– {{your_name}}

**Email 2 (Day 3)**
Subject: Response SLA + weekly KPI report

Hi {{first_name}},

If you’re curious, our weekly email report is simple:
- new reviews count
- avg response time
- % responded
- flagged negatives + status

Want to see an example report?

– {{your_name}}

**Email 3 (Day 7)**
Subject: 12-hour responses, without hiring

Hi {{first_name}},

If your team doesn’t have time to respond consistently, we can take it on with guardrails (templates, do-not-say list, approval rules).

Is this something you’d like to revisit next month, or should I close it out?

– {{your_name}}

---

## 4) Cold email — Agency/reseller (initial + 2 follow-ups)

**Email 1 (Day 1)**
Subject: Add “review responses” to your local SEO retainers

Hi {{first_name}},

If you manage Google Business Profiles for local clients: are you also handling review responses?

We provide a white-label-ish **Review Reply Autopilot**: brand-safe drafts, fast SLAs, escalation for 1–2 star reviews, and a weekly KPI report you can forward to clients.

If you tell me your client verticals (dental/med spa/home services/etc.), I’ll share a simple pricing model and an SOP your team can run.

Open to a quick call?

– {{your_name}}

**Email 2 (Day 3)**
Subject: 2-week pilot for 5 clients?

Hi {{first_name}},

Easiest way to test: pick 3–5 clients with review velocity, and we’ll run replies + KPI reporting for 2 weeks.

If it’s helpful, I can send the exact client-facing blurb you can paste into an upsell email.

– {{your_name}}

**Email 3 (Day 7)**
Subject: Close the loop?

Hi {{first_name}},

Should I:
A) send the reseller SOP + pricing model, or
B) close the loop for now?

– {{your_name}}

---

## 5) Outbound ops SOP (daily sending + CRM + KPIs)

### Tooling principles (no-spend first)
- Start with 1 domain + 1–2 inboxes, low volume, clean list.
- Track manually in a spreadsheet/CRM if needed.

### 14-day sending ramp (per inbox)
- Days 1–2: 10–15/day (mostly Priority A)
- Days 3–4: 20/day
- Days 5–7: 30/day
- Week 2: 40–50/day if bounce < 3% and reply rate healthy

Hard stop rules:
- Bounce rate > 5% in a day: pause and clean list.
- Spam complaints: pause immediately and review copy/targeting.

### Daily cadence (operator checklist)
1) Pull 25–50 new prospects from Priority A/B
2) QA 10% sample: correct category, active website, not a franchise HQ, valid city
3) Add personalization_snippet (latest review excerpt) + response_gap observation
4) Send new emails (cap per ramp)
5) Process replies within 4 business hours:
   - Interested → book demo
   - Not now → set follow-up in 30 days
   - Wrong person → ask for owner/manager contact
6) Send follow-ups (Day 3 and Day 7 cohorts)
7) Log metrics: sent, delivered, replies, positive replies, bounces

### Weekly cadence
- Monday: refresh lead pull (new review activity), add 100–200 leads
- Wednesday: run “non-responders” segment push
- Friday: agency batch (20–40) + nurture replies

### KPI targets (initial benchmarks)
- Delivery rate: > 95%
- Bounce rate: < 3%
- Reply rate: 4–8% (cold)
- Positive reply rate: 1–3% (cold)
- Meetings booked: 0.3–1% of sends initially

---

## 6) CRM pipeline stages (simple + enforceable)
1) **Prospect (Unsent)** – in list, QA’d, has snippet + email
2) **Sent (Initial)** – Email 1 sent, awaiting engagement
3) **Follow-up Scheduled** – queued for Day 3 / Day 7
4) **Replied** – any reply received
5) **Qualified** – correct vertical + has review pain + decision maker
6) **Demo Booked** – date/time confirmed
7) **Trial / Pilot** – running sample replies or 2-week pilot
8) **Paid** – converted
9) **Lost** – not a fit / no response after sequence / do-not-contact

Entry/exit criteria example:
- Replied → Qualified only if they confirm they manage the GBP/Yelp and have ongoing reviews.
- Qualified → Demo Booked only when calendar is set.

---

## 7) What I need from the owner to execute next
- Confirm: target geography (top metros vs specific states)
- Choose lead sourcing method (scraper/Apify/vendor/VA/manual)
- Confirm if you want to include **Yelp** contacts now or phase 2 (Yelp is trickier for email discovery)

Once approved, I’ll provide: (a) the exact Google Maps query list by metro + vertical, (b) the final CSV template with formulas for segment/priority, and (c) a 30-minute QA checklist so list quality stays high.