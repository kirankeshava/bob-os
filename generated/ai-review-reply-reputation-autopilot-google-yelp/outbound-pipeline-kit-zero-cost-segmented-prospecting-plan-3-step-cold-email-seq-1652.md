# Outbound Pipeline Kit (Zero-Cost): Segmented Prospecting Plan + 3-Step Cold Email Sequences + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:18:16.387Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Zero-Cost)

## 1) Target verticals (start with these 3)
1) **Dental practices** (high LTV, reviews drive bookings)
2) **Med spas / aesthetic clinics** (high competition; reputation = demand gen)
3) **HVAC + plumbers** (high review velocity; fast revenue impact)

Parallel lane: **Local marketing agencies** serving the above verticals (resell/white-label).

---

## 2) Segmentation rules (simple + operational)
Capture per prospect: rating, review_count, last_review_date, and **response-rate proxy**.

**Response-rate proxy (manual):** open the Google reviews tab, scan the **last 10 reviews**, count how many have an **“Owner response”**.
- `response_rate_proxy = owner_responses_in_last_10 / 10`

**Segments**
- **Not Responding:** response_rate_proxy ≤ 0.2 **OR** 0 owner replies in last 10
- **Low Rating:** Google rating < 4.2
- **High Volume:** review_count ≥ 200 **OR** last_review_date ≤ 14 days

**Priority scoring (for send order)**
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

**Template routing**
- Not Responding → “response gap / lost revenue / we reply in 12h” angle
- Low Rating → “reduce damage / escalation / service recovery” angle
- High Volume → “ops throughput / consistency / brand-safe approvals” angle

---

## 3) Lead list build spec (500–1,000 on $0 budget)
**Recommended geo:** Top 25 US metros. Pull ~20–40 leads per metro per vertical.

**Google Maps queries (examples)**
- Dental: “dentist” + (city) / “cosmetic dentist” + (city) / “dental clinic” + (city)
- Med spa: “med spa” + (city) / “aesthetic clinic” + (city) / “botox” + (city)
- HVAC/Plumbing: “HVAC” + (city) / “air conditioning repair” + (city) / “plumber” + (city)

**CSV columns (copy/paste as headers)**
business_name, vertical, city_state, website, phone, google_maps_url, google_rating, review_count, last_review_date, owner_or_manager_name, role_guess, email_1, email_2, response_rate_proxy, segment, priority_tier, personalization_snippet, notes

**Where to get emails (free methods)**
1) Website contact page (best)
2) “About/Team” page for manager/owner name
3) Facebook page “About” section (often has email)
4) If no email: use contact form URL (track in notes) and send a shorter version via form

**Personalization snippet rule (safe + fast)**
- Use a **recent 5★ review** snippet when available (avoid sensitive details)
- Or paraphrase: “A recent reviewer mentioned quick scheduling and friendly staff”
- Do NOT mention medical details; do NOT quote names beyond first name/initial.

---

## 4) Cold email sequences (3-step) — include legitimacy assets
**Legitimacy links/contacts to include in email footer or P.S.:**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

### 4A) Local business — Not Responding variant (use for any vertical)
**Subject options:**
1) {{business_name}}: quick question about Google review replies
2) Noticed you’re missing replies on recent reviews
3) 12-hour review replies for {{city}}

**Email 1**
Hi {{first_name_or_owner}},

I was looking at {{business_name}} on Google and saw a recent review: “{{recent_review_snippet}}”.

It looks like a few recent reviews don’t have an owner response yet. We run an **AI Review Reply & Reputation Autopilot** that drafts **brand-safe** responses for Google (and Yelp), flags negatives for escalation, and sends a weekly KPI summary.

**Offer:** we respond within **12 hours**. You can **approve/edit** everything before it posts.

Want me to send 3 draft replies for your latest reviews so you can see the tone? If yes, just reply “drafts” and I’ll do it.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (2–3 days later)**
Hi {{first_name_or_owner}},

Quick follow-up—most local businesses see more calls/bookings when they reply consistently (and quickly) to reviews.

If you send me your Google Business Profile link, I’ll draft replies to the latest 3 reviews today. No cost this week.

Should I send drafts?
— Bob

**Follow-up 2 (5–7 days later)**
Hi {{first_name_or_owner}},

Last note—if review replies are already handled internally, no worries.

If not, I can set up a simple workflow: **AI drafts → you approve → we post**, plus negative-review alerts.

Reply with “yes” and your GBP link and I’ll send the first drafts.
— Bob

### 4B) Local business — Low Rating variant
**Subject options:**
1) Quick win for {{business_name}}’s Google rating
2) Negative reviews: escalation + response system
3) Fix review replies without sounding scripted

**Email 1**
Hi {{first_name_or_owner}},

I saw {{business_name}}’s Google rating and a recent comment: “{{recent_review_snippet}}”.

When a negative review sits without a calm, professional response, it can hurt conversions. We help by drafting **brand-safe** replies fast, escalating negatives to you immediately, and keeping responses consistent across Google/Yelp.

This week we’re offering a free trial: I’ll draft responses for your 3 most recent negative/neutral reviews in your brand voice.

Want me to send those drafts today?
— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

(Follow-ups same structure as above; emphasize escalation + service recovery.)

### 4C) Local business — High Volume variant
**Subject options:**
1) Keeping up with {{business_name}}’s review volume
2) Review replies at scale (without sounding robotic)
3) 12-hour SLA for Google/Yelp replies

**Email 1**
Hi {{first_name_or_owner}},

{{business_name}} gets a lot of reviews—nice work. I noticed the pace makes it tough to respond to everything consistently.

We run an AI autopilot that drafts replies in your tone, routes anything negative for escalation, and can keep a **12-hour reply SLA** on Google/Yelp (with approvals).

If you want, I’ll send 5 sample replies based on your latest reviews so you can judge quality.

Interested?
— Bob
(legitimacy URL + email)

---

## 5) Agency / reseller lane (initial email)
**Subject options:**
1) White-label review reply autopilot for your clients
2) Add “review management” to your retainers (no extra headcount)
3) Quick partnership: Google/Yelp responses in 12h

Hi {{first_name}},

If you manage local clients (dentists/med spas/home services), we can help you add a **white-label review response** offer: AI-drafted, brand-safe replies for Google/Yelp, negative-review escalation, and weekly KPI reporting.

You keep the client relationship; we do the drafting + workflow. Free pilot for one client this week.

Open to a 10-minute chat? Here’s the product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
— Bob (agent_bob_replit+review-bot@agentmail.to)

---

## 6) Daily sending ops (14-day ramp; $0 tools)
**Tools (free tiers):**
- Sending: Gmail/Google Workspace if already owned; if not, use existing inbox while volumes are low
- CRM: HubSpot Free or Airtable Free (kanban)
- Tracking: avoid aggressive tracking early; prioritize deliverability + replies

**Ramp schedule (per inbox)**
- Days 1–2: 10/day (highly personalized Priority A)
- Days 3–4: 15/day
- Days 5–7: 20/day
- Week 2: 25–40/day depending on bounce/reply rate

**QA thresholds**
- Bounce rate > 3%: pause, fix list quality
- Spam complaints > 0.1%: stop, revise copy + targeting

**Reply SLA**
- Respond to positives within 2 hours during business day
- Book calls within 24 hours

---

## 7) CRM stages (simple pipeline)
1) **Prospect (Queued)** — lead added + segmented
2) **Sent** — Email 1 sent
3) **Replied** — any reply
4) **Qualified** — has GBP/Yelp + decision-maker + pain confirmed
5) **Demo Booked** — meeting scheduled
6) **Trial Active (7 days free)** — drafting/approval workflow running
7) **Paid** — after week 1 (later)
8) **Lost / Not now** — reason tagged

**Core KPIs (weekly)**
- Sends/day, reply rate, positive reply rate, meetings booked, trials started, time-to-first-reply, bounce rate.
