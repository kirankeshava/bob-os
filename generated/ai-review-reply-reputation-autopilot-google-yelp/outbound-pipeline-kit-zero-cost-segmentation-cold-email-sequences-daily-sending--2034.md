# Outbound Pipeline Kit (Zero-Cost): Segmentation + Cold Email Sequences + Daily Sending Ops + CRM Stages (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T19:22:02.825Z

---

## 1) ICP + Verticals (Week 1: free offer)
**Product:** AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp). Drafts and (optionally) posts brand-safe replies, escalates negative reviews, weekly KPI report.
**Proof URL to include in outreach:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Contact email to include:** agent_bob_replit+review-bot@agentmail.to

**Target verticals (high review velocity + high LTV):**
1) Dentists / orthodontists (appointments sensitive to rating/recentness)
2) Med spas / aesthetic clinics (high competition; reviews drive bookings)
3) HVAC + plumbing (high local intent; review response matters)
**Agency lane:** local SEO / web agencies serving these verticals.

## 2) Lead CSV schema (minimum fields to collect)
Columns (Google Sheets / CSV):
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10 (0–100%; count owner replies in last 10 reviews)
- segment (not_responding | low_rating | high_volume)
- priority (A | B | C)
- recent_review_snippet (1–2 sentences, or paraphrase)
- response_gap_note (e.g., “no owner replies in last 10 reviews”)
- owner_or_manager_name (if found)
- role_guess (Owner / Office Manager / Practice Manager)
- email_1
- email_2
- notes

## 3) Segmentation + Priority Rules
Compute segment (can be multiple; choose primary by priority order below):
1) **Not Responding** if response_rate_proxy_last10 ≤ 20% OR 0 owner replies in last 10
2) **Low Rating** if google_rating < 4.2
3) **High Volume** if review_count ≥ 200 OR last_review_date ≤ 14 days

Priority routing:
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

Template routing:
- Not Responding → “responsiveness gap” angle
- Low Rating → “recovery + escalation” angle
- High Volume → “throughput + consistency” angle

## 4) Personalization rules (brand-safe + compliant)
Use personalization tokens:
- {{business_name}}, {{city}}, {{vertical}}, {{recent_review_snippet}}, {{last_review_date}}, {{response_gap_note}}, {{google_rating}}, {{review_count}}

Rules:
- Prefer paraphrasing review content; if quoting, keep it short (≤ 15 words) and avoid sensitive details.
- Never mention protected health info (dentists/med spas) or imply medical outcomes.
- Never shame; keep tone neutral: “noticed” / “looks like” / “might help.”

## 5) Cold email sequences (3-step) — MASTER (use segment-specific variant)
All emails should include:
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Reply-to: agent_bob_replit+review-bot@agentmail.to
- Week 1 offer: “free for 7 days” (no credit card)

### 5A) Initial email — Not Responding variant
**Subject options (pick 1):**
1) Quick win for {{business_name}} reviews
2) Noticed a review-response gap
3) 12-hour review replies for {{business_name}}?

**Body:**
Hi {{first_name_or_role}},

I was looking at {{business_name}} on Google and noticed recent reviews like: “{{recent_review_snippet}}”. It also looks like {{response_gap_note}}.

We built a small “reputation autopilot” that drafts brand-safe replies for Google/Yelp and escalates negatives so nothing sits unanswered. Typical promise: **reply within 12 hours**, consistent voice, and **you approve before anything posts**.

If you’re open to it, I can set up a **free 7-day trial** for {{business_name}} and send the first batch of suggested replies this week.

Want me to run it for your listings? If yes, who’s the right person to coordinate (you or an office manager)?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


### 5B) Initial email — Low Rating variant
**Subject options:**
1) Helping {{business_name}} recover from tough reviews
2) Quick idea to improve review outcomes
3) Review response system for {{business_name}}

**Body:**
Hi {{first_name_or_role}},

I noticed {{business_name}} is sitting around {{google_rating}} on Google. A recent review mentioned: “{{recent_review_snippet}}”.

We help local businesses respond quickly and consistently on Google/Yelp: brand-safe drafts, negative review escalation, and a weekly KPI snapshot (response rate, avg rating trend, themes).

No pressure—would you like a **free 7-day trial** where we draft responses for every new review (and any backlog you choose), with **approval before posting**?

If you reply “yes,” I’ll send a 3-question intake and we can start within 24 hours.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


### 5C) Initial email — High Volume variant
**Subject options:**
1) Keeping up with {{review_count}} reviews
2) Review reply workflow for {{business_name}}
3) Can I take review responses off your plate?

**Body:**
Hi {{first_name_or_role}},

{{business_name}} has ~{{review_count}} Google reviews and it looks like you’re getting new ones frequently (last one on {{last_review_date}}). That volume is great—but it’s hard to keep replies consistent.

We run an “AI + human-in-the-loop” workflow: draft brand-safe replies for Google/Yelp, flag negatives for escalation, and deliver a weekly report (response rate, themes, ops notes). You can **approve before posting**, or we can just draft and send.

Open to a **free 7-day trial**? I can start by drafting replies for the last 10 reviews so you can judge tone/quality.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


### 5D) Follow-up 1 (Day 2–3) — universal
**Subject:** Re: {{business_name}} reviews

Hi {{first_name_or_role}},

Quick follow-up—if I draft 5 sample replies for {{business_name}} (based on your most recent reviews) and send them over, would that be useful?

If you want, I can run the **free 7-day trial** and you can approve everything before it goes live.

— Bob
agent_bob_replit+review-bot@agentmail.to


### 5E) Follow-up 2 (Day 6–7) — universal “close the loop”
**Subject:** Should I close this out?

Hi {{first_name_or_role}},

Should I close the loop on this, or is someone else best for review responses at {{business_name}}?

If you’d like, reply with “drafts” and I’ll send a few example replies + the 7-day free trial details.

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1


## 6) Agency/reseller version (initial email)
**Subject options:**
1) White-label review response for your clients
2) Add a reputation autopilot offer (no extra headcount)
3) Quick partnership idea

Hi {{first_name}},

You work with local businesses—are reviews a pain point for your clients? We run a lightweight “review reply + escalation + KPI report” autopilot for Google/Yelp.

This is easy to white-label: we draft brand-safe responses within ~12 hours, flag negatives, and send a weekly KPI summary. You can position it as an add-on retainer without adding fulfillment burden.

Want me to pilot it **free for 7 days** for one client (dentist/med spa/home services) so you can see the workflow?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


## 7) Daily sending ops (zero-cost stack)
**Tools (free):**
- 1 sending inbox (existing) + manual sending
- Google Sheets for CRM + list
- Optional: Airtable free as CRM UI

**14-day ramp (per inbox):**
- Day 1–2: 15–20 new emails/day
- Day 3–4: 25/day
- Day 5–7: 35/day
- Day 8–10: 50/day
- Day 11–14: 60–80/day (only if bounce < 3% and replies steady)

**Daily activity targets (starting today):**
- 30 new emails/day + 15 follow-ups/day (by Day 7)
- 10 owner/manager DMs/day (LinkedIn/Facebook) using the same hook
- Reply SLA: < 2 hours during business day

**List QA rules (every 50 leads):**
- 5 random rows: verify category matches vertical, phone/website valid, rating/review count correct
- Remove: franchises with corporate review teams, locations without websites, duplicates, businesses with “permanently closed”

**Bounce/complaint thresholds:**
- If hard bounce > 3% in a day: stop sending, clean list, reduce volume
- If any spam complaint: pause, tighten targeting + personalization, lower volume

## 8) CRM stages (Google Sheet columns)
Stages:
1) Prospect (not yet sent)
2) Sent (E1 sent)
3) Follow-up 1 sent
4) Follow-up 2 sent
5) Replied – Interested
6) Replied – Not now
7) Qualified (has GBP/Yelp + wants help + decision maker)
8) Demo booked (or onboarding call)
9) Trial (7 days free)
10) Paid (post-week-1)
11) Lost

Entry/exit criteria:
- Prospect → Sent when E1 delivered
- Sent → Replied when any reply
- Replied – Interested → Qualified when they confirm they own/operate listing and want help
- Qualified → Trial when they agree to start + provide listing links/permissions/process

## 9) Zero-cost lead list build (how to reach 500–1,000)
**Geography recommendation:** Top 25 US metros to start (highest density, faster sampling).
**Google Maps search strings (examples):**
- “dentist in {{metro}}” + “cosmetic dentist in {{metro}}”
- “med spa in {{metro}}” + “aesthetic clinic in {{metro}}”
- “HVAC contractor in {{metro}}” + “plumber in {{metro}}”

For each lead, capture:
- rating, review_count, last_review_date
- open last 10 reviews: count owner replies for response_rate_proxy_last10
- grab a short snippet (or paraphrase)
- find emails: website Contact page + About page; if missing, use generic role emails (info@, office@) only as fallback

Output: export to CSV and run segmentation rules above.

If you want me to QA and finalize segmentation, send the CSV export and I’ll return: (a) cleaned list, (b) Priority A/B/C distribution, (c) template routing sheet for mail merge.
