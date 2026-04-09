# Outbound Machine (Ready-to-Run) — Lead List SOP + Segmentation + Cold Email (3-Step) + Daily Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T06:13:58.637Z

---

## 1) ICP + Vertical Focus (first 30 days)
Target local businesses where (a) reviews drive conversion, (b) reviews arrive weekly, (c) owners don’t respond consistently:
- Dental practices
- Med spas / aesthetic clinics
- HVAC + plumbing (home services)
Parallel lane: small marketing agencies managing 10–50 local clients.

## 2) Lead List: CSV Columns (paste into Google Sheets)
Required columns:
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt (or paraphrase)
- owner_response_last_10 (count)
- reviews_last_10 (always 10 unless <10)
- response_rate_proxy (=owner_response_last_10 / reviews_last_10)
- segment (not_responding / low_rating / high_volume)
- priority (A/B/C)
- contact_name (if found)
- role_guess (owner/manager/front desk/marketing)
- email_1
- email_2
- notes

## 3) Zero-Cost Lead Build SOP (Google Maps/GBP)
Goal: 500–1,000 rows in 7–14 days without paid scrapers.
1) Choose metro/state (see Section 9). Work one geography at a time.
2) Google Maps search query examples:
   - "dentist" + "{city}" (filter by top results; avoid DSOs if possible)
   - "med spa" + "{city}" / "aesthetic clinic" + "{city}"
   - "HVAC" + "{city}" / "plumber" + "{city}"
3) For each business, capture:
   - Rating + review count from listing
   - Click Reviews → sort by Newest → record last review date
   - Take a short excerpt (6–12 words) OR paraphrase (safer) from the most recent review
   - Response proxy: look at the last 10 reviews; count how many have an owner response
4) Find best email(s) (free methods first):
   - Website footer/contact page
   - Google Business “Website” + “Appointments” links
   - If no email: use contact form URL in notes; optionally use generic patterns only when obvious (info@, contact@)
5) QA rules (skip if): no website, franchise directory pages, irrelevant category, no reviews, or clearly enterprise chain unless you want multi-location later.

## 4) Segmentation Rules (deterministic)
- not_responding: response_rate_proxy <= 0.20 OR 0 responses in last 10 reviews
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within last 14 days

Priority tiers:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

## 5) Personalization Rules (brand-safe, not creepy)
Use ONE light detail:
- Option 1: paraphrase: “I saw a recent review mentioning wait time…"
- Option 2: short excerpt (6–12 words max) with quotes
Avoid: patient-specific language, sensitive medical details, exact names, or anything that feels like surveillance.

## 6) Cold Email — Master 3-Step Sequence (tokens included)
Sender: Bob (Bob Smith)
Contact email for replies: agent_bob_replit+review-bot@agentmail.to
Legitimacy URL to include when asked or in P.S.: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Email 1 (Initial)
Subject options (rotate):
1) Quick question about your reviews
2) {{business_name}} — review replies
3) 12-hour review responses for {{business_name}}?

Body:
Hi {{contact_name_or_team}},

I was looking at {{business_name}}’s Google reviews and noticed {{personalization_snippet}}.

Quick question: do you currently have a process to respond to new reviews quickly and consistently?

We built an AI Review Reply & Reputation Autopilot that drafts brand-safe replies for Google/Yelp, flags negatives for escalation, and sends a weekly KPI report. You can approve replies before anything posts.

If it’s helpful, I can show you what “respond within 12 hours” looks like for a business like yours (takes ~10 minutes).

Open to a quick call this week?

— Bob
agent_bob_replit+review-bot@agentmail.to
P.S. If you want to see what we’re building: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Email 2 (Follow-up, Day 2–3)
Subject: Re: {{business_name}} reviews

Hi {{contact_name_or_team}},

The reason I’m reaching out is that many {{vertical}} businesses lose leads when (a) recent reviews aren’t answered or (b) negative reviews sit for days.

If you tell me which matters more right now:
1) saving time (high volume)
2) fixing response consistency (not responding)
3) protecting rating + recovery (low rating)
…I’ll send a 3-bullet plan tailored to {{business_name}}.

Worth it?

— Bob
agent_bob_replit+review-bot@agentmail.to

### Email 3 (Follow-up, Day 6–8)
Subject: Should I close the loop?

Hi {{contact_name_or_team}},

Should I close the loop here, or is review response automation something you want to revisit later?

If you’re open, I can do a no-pressure mini-audit:
- response rate on last 10 reviews
- 2 example replies (brand-safe)
- what we’d escalate vs auto-respond

Reply with “audit” and I’ll send it over.

— Bob
agent_bob_replit+review-bot@agentmail.to

## 7) Segment-Specific Hook Lines (swap into Email 1)
- not_responding: “I noticed several recent reviews don’t have an owner response yet.”
- low_rating: “I noticed your rating is around {{google_rating}} and a few recent reviews mention {{issue_paraphrase}}.”
- high_volume: “You’re getting steady review volume—keeping up with replies is a lot week to week.”

## 8) Daily Sending Ops + 14-Day Ramp (simple + safe)
Assuming 1 inbox initially.
- Day 1–2: 15/day (new prospects only)
- Day 3–4: 25/day
- Day 5–7: 40/day
- Week 2: 60–80/day (only if bounce < 3% and spam complaints ~0)
Daily activity targets:
- New sends: 40–80/day (ramp)
- Follow-ups: 20–60/day (as volume grows)
- Manual personalization: 15–25/day for Priority A
- Reply handling SLA: same day; negative-interest replies get a polite close
List hygiene:
- Do not email roles that look like personal consumer addresses if uncertain; prefer business domain emails.
- Stop on: hard bounce, unsubscribe, explicit “no”.

## 9) CRM Stages (minimal pipeline)
Stages + exit criteria:
1) Prospects Loaded (has email + segment + priority)
2) Sent
3) Replied
4) Qualified (pain confirmed + right person)
5) Demo Booked
6) Trial Started
7) Paid
8) Lost (reason coded)
KPIs to track weekly:
- Deliverability: bounce %, spam complaints
- Performance: open rate (optional), reply rate, positive reply rate, demos booked
- Revenue: trials started, paid conversions

## 10) Geography Decision Needed (to start the 500–1,000 lead build)
Choose ONE for the first list so the queries are consistent:
A) Top 25 US metros (fast scaling, broad)
B) 5–10 states (tighter focus, easier messaging)
C) Single-region wedge (e.g., TX + FL) to build density and referrals
Once chosen, build 200 leads first, QA, then scale to 500–1,000 using the exact same workflow.
