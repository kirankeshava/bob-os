# Outbound Pipeline Kit (Execution-Ready): Segmentation Plan + 3-Step Cold Email Pack + Daily Sending Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:33:34.628Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit

## 0) Offer (used across all outreach)
**What it is:** AI-assisted, brand-safe review response autopilot for Google Business Profile + Yelp. Drafts responses, routes negative reviews for escalation, and sends weekly reputation KPIs.
- **Speed:** responses drafted within 12 hours (or next business morning)
- **Safety:** brand-safe templates + human approval option
- **Outcome:** higher response rate → better conversion from Maps/Yelp + improved trust

**Legitimacy link (include in email):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Reply/contact:** agent_bob_replit+review-bot@agentmail.to

## 1) ICP + Vertical Focus
Primary verticals (high review velocity + high LTV):
1) **Dentists / dental clinics**
2) **Med spas / aesthetic clinics**
3) **HVAC + plumbing (home services)**

Secondary lane (faster bulk deals):
- **Agencies** managing local clients (SEO, PPC, web, reputation management, local marketing).

## 2) Segmentation + Priority Scoring
You segment every prospect into one or more buckets, then assign Priority.

### Required fields for segmentation
- Google rating
- Review count
- Last review date
- Response-rate proxy (manual): **# owner responses in last 10 reviews / 10**

### Segment rules
- **Not Responding:** response-rate proxy ≤ 20% (0–2 responses in last 10) OR no owner replies visible recently
- **Low Rating:** rating < 4.2
- **High Volume:** review_count ≥ 200 OR last_review_date within 14 days

### Priority routing (who to email first)
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** (Not Responding) OR (Low Rating)
- **Priority C:** High Volume only

### Message angle mapping
- Not Responding → “response gap + speed + brand-safe approval”
- Low Rating → “escalation + recovery + consistent replies + sentiment trend”
- High Volume → “ops load reduction + consistency + weekly KPIs”

## 3) Lead List CSV Schema (headers)
Use exactly these columns:
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy
- segment
- priority (A/B/C)
- owner_or_manager_name (if found)
- role_guess (Owner/Office Manager/Practice Manager/GM)
- email_1
- email_2
- personalization_snippet (recent review excerpt OR paraphrase)
- notes

## 4) Cold Email Pack (3-step) — Direct to Local Businesses
**Personalization tokens**
- {{first_name}} (if unknown: “there”) 
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (quote small excerpt or paraphrase)
- {{response_gap}} (e.g., “looks like many recent reviews don’t have a response”)
- {{vertical_specific_hook}} (dentist: “new patient trust”; med spa: “high-ticket consults”; HVAC: “emergency calls + trust”)

### 4A) Initial Email — Not Responding (works across verticals)
**Subject options (pick 1):**
1) Quick question about replying to Google reviews
2) {{business_name}} reviews — can I help?
3) Noticed a response gap on Google

**Body:**
Hi {{first_name}},

I was looking at {{business_name}} on Google and noticed {{response_gap}} (ex: recent feedback like “{{recent_review_snippet}}”).

We built **AI Review Reply & Reputation Autopilot** to draft brand-safe responses for Google + Yelp and keep you consistently responsive—without someone on your team living in the inbox.

How it works:
- We draft a reply within ~12 hours
- You can approve/edit (or set it to auto-post with guardrails)
- Negative reviews get escalated so you can recover the situation fast
- Weekly KPI email (rating trend, response rate, review velocity)

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a 10-minute chat to see if we can handle replies for {{business_name}}?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4B) Initial Email — Low Rating (recovery angle)
**Subject options:**
1) Idea to lift rating at {{business_name}}
2) Quick win on negative reviews
3) Review recovery process

**Body:**
Hi {{first_name}},

I saw {{business_name}}’s Google rating is around {{google_rating}} and there are a few recent reviews like “{{recent_review_snippet}}.”

One fast lever (besides ops changes) is a **consistent, professional response process**: acknowledge, offer a resolution path, and move the conversation offline—every time. Most businesses stop doing it because it’s time-consuming.

Our **AI Review Reply & Reputation Autopilot** drafts brand-safe replies for Google + Yelp, escalates negatives, and sends weekly KPIs so you can track recovery.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a quick call this week? If you forward 3–5 reviews you want handled first, we’ll draft responses as a sample.

— Bob
agent_bob_replit+review-bot@agentmail.to

### 4C) Initial Email — High Volume (ops/throughput angle)
**Subject options:**
1) Handling review volume at {{business_name}}
2) Keeping up with Google/Yelp replies
3) System for review responses

**Body:**
Hi {{first_name}},

{{business_name}} gets a lot of reviews (nice job). The downside is it becomes a recurring ops task to respond quickly and consistently.

We built an autopilot that drafts and can post brand-safe responses for Google + Yelp, escalates negative reviews, and sends weekly reputation KPIs.

If I send over 2–3 sample replies based on your latest reviews (“{{recent_review_snippet}}”), would you want to see what that would look like in your brand voice?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

### Follow-up 1 (Day 2–3) — simple bump + value
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}},

Just bumping this—do you have anyone currently responsible for replying to Google/Yelp reviews?

If not, we can:
- draft replies within 12 hours
- escalate negatives
- send weekly KPIs

Want me to draft 3 sample responses for {{business_name}} (no commitment)?

— Bob
agent_bob_replit+review-bot@agentmail.to

### Follow-up 2 (Day 6–8) — close-the-loop + two-choice CTA
**Subject:** Should I close this out?

Hi {{first_name}},

Should I close this out, or is review response help relevant for {{business_name}} right now?

If it’s relevant, reply with **“samples”** and I’ll draft a few replies based on your most recent reviews.

— Bob
agent_bob_replit+review-bot@agentmail.to

## 5) Agency/Reseller Email (Initial + 1 follow-up)
### Agency Initial
**Subject options:**
1) White-label review replies for your local clients
2) Add-on service for SEO/PPC clients
3) Quick reseller idea (Google + Yelp)

**Body:**
Hi {{first_name}},

If you manage local clients (dental/med spa/home services), one easy retention add-on is **fast, consistent review responses**. Most owners don’t do it, and it impacts conversion from Maps.

We built **AI Review Reply & Reputation Autopilot** (Google + Yelp):
- brand-safe drafted replies in ~12 hours
- negative review escalation workflow
- weekly reputation KPI reporting
- can be delivered white-label or co-branded

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a quick chat? If you tell me how many clients you manage, I’ll suggest a simple packaging + margin.

— Bob
agent_bob_replit+review-bot@agentmail.to

### Agency Follow-up
**Subject:** Re: white-label review replies

Hi {{first_name}},

If you want, I can send:
1) a one-page “service blurb” you can paste into proposals
2) suggested pricing tiers for 10/25/50+ locations

Interested?

— Bob
agent_bob_replit+review-bot@agentmail.to

## 6) Daily Sending Ops Checklist (14-day ramp)
**Core rules (deliverability):**
- Start low; increase slowly.
- Keep spam complaint rate ~0; if complaints happen, stop and review copy/list.
- If bounce rate > 3% in a batch, pause and clean.

### Day-by-day ramp (per inbox)
- Days 1–2: 10/day (mostly Priority A)
- Days 3–4: 15/day
- Days 5–6: 20/day
- Days 7–8: 25/day
- Days 9–10: 30/day
- Days 11–14: 35–40/day

If running 2 inboxes, double totals (still keep personalization quality).

### Daily workflow (60–90 minutes)
1) Pull 25–50 prospects from Priority A/B.
2) QA: category match, has website, not a mega-franchise location, review snippet available.
3) Personalize line 1 with {{response_gap}} + {{recent_review_snippet}}.
4) Send initial emails.
5) Process replies within **4 business hours**:
   - “Interested” → ask 2 questions (locations? approval preference?) + propose 10-min slot.
   - “Not now” → ask permission to follow up in 60 days.
   - “Unsubscribe” → mark Do Not Contact immediately.
6) Log in CRM.

### Weekly workflow
- Monday: refresh 100–200 new leads; re-score Priority.
- Wednesday: review KPIs (sent, replies, positive reply rate, bounces).
- Friday: iterate subject lines and first-line personalization based on best performers.

## 7) CRM Stages (simple pipeline)
1) **Prospect (Unsent)** — validated lead, segment + priority assigned
2) **Sent (Step 1)** — initial email sent
3) **Sent (Follow-up 1)**
4) **Sent (Follow-up 2)**
5) **Replied** — any reply received
6) **Qualified** — meets ICP + has review volume / pain confirmed
7) **Demo Booked** — time scheduled
8) **Trial / Sample Drafts Delivered** — sample replies sent
9) **Paid** — subscription or monthly service started
10) **Lost / Not a Fit** — reason tagged (timing, price, in-house, wrong vertical)

## 8) Prospecting Plan (what to build first)
**Goal:** first 500–1,000 leads split across verticals, weighted to Priority A.
Suggested split:
- 40% dentists
- 30% med spas
- 30% HVAC/plumbing
Plus 50–100 agencies in parallel.

**First week send focus:**
- Priority A only (response gap + high volume) to maximize fast replies.

## 9) Compliance + personalization safety notes
- Do not paste full negative reviews verbatim if sensitive; paraphrase (“a recent customer mentioned delays…”).
- Never claim affiliation with Google/Yelp.
- Offer opt-out in practice (honor unsubscribe requests immediately).

---
If you confirm the geography (Top 25 metros vs specific states), I can lock the query pack format so list-building starts immediately.