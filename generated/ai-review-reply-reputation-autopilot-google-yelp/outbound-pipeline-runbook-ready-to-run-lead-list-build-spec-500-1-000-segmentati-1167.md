# Outbound Pipeline Runbook (Ready-to-Run): Lead List Build Spec (500–1,000) + Segmentation + Cold Email Sequences + Daily Ops + CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:05:52.945Z

---

## 1) Scope (so the list is consistent and send-ready)
**Initial geography (recommended): Top 25 US metros**
New York, Los Angeles, Chicago, Dallas–Fort Worth, Houston, Washington DC, Miami, Philadelphia, Atlanta, Phoenix, Boston, San Francisco, Riverside–San Bernardino, Detroit, Seattle, Minneapolis–St Paul, San Diego, Tampa–St Petersburg, Denver, Baltimore, St Louis, Orlando, Charlotte, San Antonio, Portland.

**Verticals:**
1) Dentists (general + cosmetic; exclude orthodontist-only unless needed)
2) Med spas / aesthetic clinics
3) HVAC + plumbers (home services)

## 2) Lead List CSV Template + Data Dictionary
**CSV headers (copy/paste into Sheets):**
- business_name
- vertical
- city_state
- metro
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt
- response_rate_proxy_last10 (0–100%)
- segment (not_responding | low_rating | high_volume)
- priority (A | B | C)
- owner_or_manager_name
- role_guess
- email_1
- email_2
- personalization_hook (1 line)
- notes

**Definitions:**
- **last_review_date**: date of the most recent Google review visible.
- **last_review_excerpt**: max ~160 characters; paraphrase if sensitive.
- **response_rate_proxy_last10**: count owner replies among the last 10 reviews / 10.
- **personalization_hook**: “Saw a recent review mentioning {{snippet}}—noticed responses are {{gap}}.”

## 3) Google Maps Query Pack (per metro)
Run these in Google Maps for each metro; open listings, capture rating/review count/URL/phone/website, then inspect last 10 reviews for response proxy.

**Dentists:**
- “dentist {{metro}}”
- “cosmetic dentist {{metro}}”
- “family dentistry {{metro}}”

**Med spas:**
- “med spa {{metro}}”
- “aesthetic clinic {{metro}}”
- “botox {{metro}}”

**HVAC/Plumbing:**
- “HVAC {{metro}}”
- “air conditioning repair {{metro}}”
- “plumber {{metro}}”

**Exclusions (QA):** skip franchises with centralized support if you can’t find a local decision-maker; skip listings with no website (unless you plan phone-first).

## 4) Segmentation Rules + Priority Scoring
**Segments:**
- **Not Responding**: response_rate_proxy_last10 ≤ 20% OR zero replies in last 10.
- **Low Rating**: google_rating < 4.2.
- **High Volume**: review_count ≥ 200 OR last_review_date within 14 days.

**Priority:**
- **A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **B:** not_responding OR low_rating (but not A)
- **C:** high_volume only

## 5) Cold Email Sequences (include legitimacy links)
**Credibility line to include in every email footer:**
“Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | Contact: agent_bob_replit+review-bot@agentmail.to”

### 5A) Local Business — Not Responding (use for Dentists/Med Spas/Home Services)
**Email 1**
Subject options: 
1) Quick question about your Google reviews
2) Noticed a gap in review replies
3) {{business_name}} review responses

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{last_review_excerpt}}”. I also noticed you’re not able to reply to many reviews (or consistently).

We run an AI Review Reply & Reputation Autopilot that drafts **brand-safe** responses and posts them (or sends for approval), so every review gets a reply within ~12 hours. Negative reviews get escalated with suggested next steps.

Would you be open to a 10-minute call this week to see what it would look like for {{business_name}}?

– Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | Contact: agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (2–3 days later)**
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

If it helps, the typical quick win is: reply to the last 10–20 reviews (especially the newest ones) with consistent tone + keywords, then keep up with new reviews daily.

Do you prefer:
A) We draft + you approve, or
B) We draft + post automatically with brand guardrails?

– Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | Contact: agent_bob_replit+review-bot@agentmail.to

**Follow-up 2 (5–7 days later)**
Subject: Close the loop?

Hi {{first_name}},

Should I close the loop, or is review response automation worth revisiting next month?

Either way—if you share a preferred email, I can send a 1-page summary of what we’d automate (reply SLA, escalation, weekly KPI report).

– Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | Contact: agent_bob_replit+review-bot@agentmail.to

### 5B) Local Business — Low Rating (more sensitive)
**Email 1**
Subject options:
1) Idea to protect {{business_name}}’s rating
2) Quick fix for negative reviews
3) Review follow-up process

Body:
Hi {{first_name}},

I saw a recent review for {{business_name}} mentioning: “{{last_review_excerpt}}”. When ratings are under pressure, speed + tone of the owner response can make a big difference (both for the customer and future readers).

We run an AI Review Reply & Reputation Autopilot: brand-safe draft replies, fast escalation for negatives, and a weekly KPI report so nothing slips.

If you want, I can show a sample response for that review and what the escalation workflow would look like. Open to a 10-minute call?

– Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | Contact: agent_bob_replit+review-bot@agentmail.to

(Follow-ups: same cadence as 5A, but keep tone focused on “protecting reputation” and “fast escalation.”)

### 5C) Local Business — High Volume (ops/throughput)
**Email 1**
Subject: Keeping up with review volume at {{business_name}}

Body:
Hi {{first_name}},

{{business_name}} gets a lot of review activity (nice work). The usual pain point is consistency—reviews come in daily, but responses lag when the team is busy.

We automate review responses with brand-safe drafts, optional approval, and a weekly KPI report (response time, response rate, sentiment flags). We can keep replies within ~12 hours.

Worth a quick look this week?

– Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | Contact: agent_bob_replit+review-bot@agentmail.to

### 5D) Agency/Reseller Version (marketing agencies)
**Email 1**
Subject: Add “review response autopilot” to your local packages?

Hi {{first_name}},

If you manage Google Business Profiles for local clients (dentists/med spas/home services), review response is one of the easiest retention levers—but it’s tedious to do manually.

We offer an AI Review Reply & Reputation Autopilot you can resell: brand-safe draft replies, optional client approval, escalation for negatives, and weekly KPI reporting. You keep margin; we do the ops.

Open to a quick call to see if this fits your packages?

– Bob Smith
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 | Contact: agent_bob_replit+review-bot@agentmail.to

## 6) Personalization Rules (to stay brand-safe)
- Quote only short excerpts (≤160 chars). Prefer paraphrasing negatives.
- Never mention protected attributes or medical outcomes; keep neutral.
- Don’t imply the reviewer is a patient/customer if unclear.
- If negative review suggests a serious issue: propose “escalate to manager” and “invite offline resolution.”

## 7) Daily Sending Ops + Targets
**14-day ramp (per inbox):** Day 1–2: 10/day, Day 3–4: 15/day, Day 5–7: 20/day, Day 8–10: 30/day, Day 11–14: 40/day. Add inboxes only after replies/complaints are stable.

**Daily activity targets (single operator):**
- 50–100 cold emails/day (depending on inbox count)
- 10 follow-ups/day minimum (never skip follow-ups)
- 10 owner/manager DMs/day (optional lane)
- Reply handling SLA: <4 business hours

**Hard thresholds:**
- Bounce rate >3%: stop and fix list hygiene.
- Spam complaints: any spike → pause sends and review copy + targeting.

## 8) CRM Stages (simple, enforceable)
1. **Prospect (Queued)**: in CSV, not yet emailed.
2. **Sent**: Email 1 sent.
3. **Engaged**: replied OR asked a question.
4. **Qualified**: confirmed they manage reviews + have volume/pain.
5. **Demo Booked**: meeting scheduled.
6. **Trial/Onboarding**: access + settings in progress.
7. **Paid**: converted.
8. **Lost**: not now / wrong contact / no pain.

**Minimum fields in CRM:** business_name, vertical, metro, segment, priority, last_touch_date, next_step, owner_email.

---
### What you do next (fastest path)
1) Pick 5 metros from the Top 25 and build the first 50 leads (any vertical mix). 
2) Send 30–50 Email 1 messages using the Not Responding variant (highest response rates). 
3) Track replies and refine offer/CTA before scaling to 500–1,000.
