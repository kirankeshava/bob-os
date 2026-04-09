# Outbound Pipeline Kit (Zero-Spend, Week-1) — Lead List Build (500–1,000) + Segmentation + Cold Email (3-step) + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T21:02:18.172Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Week 1 / $0)

## 1) Target verticals + why
We target local businesses where reviews drive direct revenue and owners are time-poor:
1) **Dentists** (high LTV, high intent, strong review sensitivity)
2) **Med spas / aesthetic clinics** (high competition, frequent reviews, brand risk)
3) **HVAC + plumbing** (high review velocity, local SEO impact, high call-driven revenue)

## 2) Geography (for first 500–1,000)
Use **Top 25 US metros** to maximize review volume and email availability.
Metros: New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, San Francisco, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, Washington DC, Nashville, El Paso, Detroit, Boston, Portland.

## 3) Lead list CSV schema (copy headers as first row)
**CSV headers:**
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10
- segment
- priority
- owner_or_manager_name
- role_guess
- email_1
- email_2
- personalization_snippet
- notes

### Data dictionary (how to fill each)
- **google_rating**: the star rating shown on the Google Business Profile.
- **review_count**: total number of reviews shown on the profile.
- **last_review_date**: date of the most recent Google review.
- **response_rate_proxy_last10**: look at the **last 10 reviews**; count how many have an “Owner response.” Proxy = responses/10 (e.g., 0.1, 0.3, 0.8). If fewer than 10 reviews visible recently, use the last available up to 10.
- **personalization_snippet**: 1–2 sentences from the latest review (safe excerpt) OR a short paraphrase (avoid sensitive/medical details for med spas).
- **owner_or_manager_name/role_guess/emails**: from website “Contact/About,” staff page, or public email formats. (Week-1: best-available emails OK.)

## 4) Segmentation + priority scoring (operational)
### Segments
- **not_responding**: response_rate_proxy_last10 <= 0.2 (0–2 responses out of last 10)
- **low_rating**: google_rating < 4.2
- **high_volume**: review_count >= 200 OR last_review_date within 14 days

### Priority tiers (for send order)
- **Priority A**: (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B**: (not_responding) OR (low_rating)
- **Priority C**: (high_volume only)

**Routing rule:**
- Priority A gets the strongest ROI/urgency framing + fastest follow-up.
- Low_rating messaging must emphasize escalation + brand-safe tone + approval.

## 5) Google Maps query pack (copy/paste searches)
Run queries in Google Maps for each metro; open likely matches and fill the sheet.

### Dentists
- “dentist {CITY}”
- “cosmetic dentist {CITY}”
- “family dentistry {CITY}”

### Med spas / aesthetics
- “med spa {CITY}”
- “aesthetic clinic {CITY}”
- “botox {CITY}”

### HVAC / plumbing
- “HVAC contractor {CITY}”
- “air conditioning repair {CITY}”
- “plumber {CITY}”

**Collection filters (to keep quality high):**
- Must have a working website OR a clear contact page/FB page with email.
- Prefer independents (avoid national franchises where possible).
- Prefer review_count >= 50 (unless low_rating <4.0, which can still be strong).

## 6) Email personalization rules (safe + fast)
Use one of:
- A short excerpt of a **positive** review + note about “no owner response.”
- A paraphrase of a complaint (“wait time,” “scheduling,” “communication”) without quoting patient details.

**Do NOT mention:** medical outcomes, protected health info, names of staff involved in incidents, or anything that escalates liability.

## 7) Cold email sequences (3-step) — include legitimacy links
Always include:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

### Universal tokens
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{response_gap}} (e.g., “I didn’t see an owner reply on the last few reviews.”)

---
## 7A) DENTAL — Segment: Not Responding (Initial)
**Subject options:**
1) Quick win for {{business_name}}’s Google reviews
2) Noticed a response gap on your latest reviews
3) 12-hour review responses (you approve)

**Email 1:**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}}—{{recent_review_snippet}}.

{{response_gap}} A lot of practices lose calls when reviews sit unanswered (even positive ones).

I’m building a small “Review Reply & Reputation Autopilot” that drafts **brand-safe** Google/Yelp responses and escalates negatives. You can **approve before posting**, and we aim to respond within **12 hours**.

If you want, I can do a free 7-day trial: we’ll draft replies for your next reviews + backlog.

Worth a quick 10 minutes this week?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (2 days later):**
Subject: Re: Google reviews for {{business_name}}

Hi {{first_name}}—quick follow-up.

If I draft 3 replies to recent reviews (free) so you can judge tone/quality, would you like me to send them over?

— Bob

**Follow-up 2 (4 days later):**
Subject: close the loop?

Should I (a) send 3 sample replies, or (b) close the loop for now?

— Bob

---
## 7B) MED SPA — Segment: Low Rating (Initial)
**Subject options:**
1) Quick fix for review sentiment at {{business_name}}
2) Reputation triage for your Google reviews
3) Replying safely to negative reviews

**Email 1:**
Hi {{first_name}},

I came across {{business_name}} while searching med spas in {{city}}. I noticed a few tougher reviews recently (example: “{{recent_review_snippet}}”).

Negative reviews don’t just hurt ratings—they raise brand risk if responses sound defensive or reveal details.

I run an “AI Review Reply & Reputation Autopilot” that:
- drafts **brand-safe** responses (no sensitive details)
- flags/escales negative reviews immediately
- lets you **approve** before anything posts

Free 7-day trial: I’ll draft responses to your most recent negative reviews + set up a weekly KPI recap.

Open to a 10-min call?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
Subject: Re: review responses

If I send 2 draft responses to your most recent negatives (no posting, just drafts), who’s the best person to review them?

— Bob

**Follow-up 2:**
Subject: OK to close this out?

Should I send sample drafts, or close the loop?

— Bob

---
## 7C) HVAC/PLUMBING — Segment: High Volume (Initial)
**Subject options:**
1) Fast review replies for {{business_name}}
2) You’re getting a lot of reviews—want help replying?
3) 12-hour review response workflow

**Email 1:**
Hi {{first_name}},

{{business_name}} is getting a steady flow of Google reviews in {{city}}—{{recent_review_snippet}}.

When volume picks up, reviews become a second inbox. If replies fall behind, you lose local SEO momentum and trust.

I’m offering a free 7-day trial of a “Review Reply & Reputation Autopilot”: brand-safe drafts for Google/Yelp, escalation on negatives, and you can approve before posting. Goal: **reply within 12 hours**.

Want me to draft replies to the next 5 reviews so you can see how it sounds?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
Subject: Re: reviews

If you tell me who handles Google reviews today (owner, office manager, dispatcher), I’ll send sample drafts to them.

— Bob

**Follow-up 2:**
Subject: last ping

Send samples, or close the loop?

— Bob

---
## 7D) AGENCY / RESELLER version (Initial)
**Subject options:**
1) Add-on: managed review replies for your local clients
2) White-label review response ops (Google/Yelp)
3) Quick revenue add-on for agency clients

**Email 1:**
Hi {{first_name}},

If you manage marketing for local businesses (dentists/med spas/home services), reviews are a constant pain point: clients want fast replies, but it’s hard to staff.

I’m piloting an “AI Review Reply & Reputation Autopilot” you can offer as an add-on:
- brand-safe draft replies for Google/Yelp
- negative review escalation
- weekly KPI reporting
- client approval before posting

Free 7-day trial for 1 client so you can validate workflow and results.

Worth a 10-min chat?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 8) Daily sending ops (week 1 compliant: $0)
### CRM stages (simple)
- Prospect (in sheet)
- Sent
- Replied
- Qualified
- Demo Booked
- Trial Started (7 days free)
- Won (post-week-1 paid)
- Lost

### 14-day sending ramp (1 inbox)
- Days 1–2: 20/day (new prospects only)
- Days 3–4: 30/day
- Days 5–7: 40/day
- Days 8–10: 60/day
- Days 11–14: 80/day

If using multiple inboxes later, split volume evenly.

### QA rules before sending
- Sample 10% of today’s batch: verify category match + website exists + not a franchise location page only.
- Don’t email generic “info@” if an owner/manager email exists.
- If no email found, park for phone/DM lane.

### Bounce/complaint thresholds
- If bounce rate > 3% in a day: stop sending, remove risky domains, re-check emails.
- If spam complaints occur: reduce volume, simplify copy, remove links temporarily.

### Reply SLA
- Reply to any positive reply within **2 hours** during business day.
- For “not interested,” ask one clarifier only (“OK—should I check back in 90 days?”) then stop.

## 9) Minimum daily activity targets (operator cadence)
- Build leads: **50/day** (or 200 in a batch twice per week)
- Send emails: per ramp schedule
- Follow-ups: 1x/day to anyone sent 2+ days ago with no reply
- Booked calls target: 2–5/week early; optimize copy after first 30–50 replies

This document is ready to run immediately with only Google Maps + Google Sheets, staying within the $0 Week-1 policy.