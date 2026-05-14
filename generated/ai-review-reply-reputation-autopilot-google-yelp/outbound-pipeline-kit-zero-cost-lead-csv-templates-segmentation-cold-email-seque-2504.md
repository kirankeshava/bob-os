# Outbound Pipeline Kit (Zero-Cost): Lead CSV Templates + Segmentation + Cold Email Sequences + Daily Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T05:27:09.884Z

---

# Outbound Pipeline Kit (Zero-Cost)
Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Initial targeting (recommended)
**Verticals (already chosen):** Dentists, Med Spas/Aesthetics, HVAC/Plumbing.
**Geography (to execute now, fastest quality):** Top 25 US metros. Reason: high review velocity + enough density to find “non-responders” quickly.

Top metros list (use as City filter): New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

## 2) Lead list CSV templates (copy headers exactly)
### A) Local business leads CSV headers
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy,last_10_owner_responses,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

### B) Agency/reseller leads CSV headers
agency_name,vertical_focus,city_state,website,linkedin_url,phone,contact_name,role,email_1,email_2,proof_of_focus (portfolio/client list),notes,priority

## 3) Segmentation + priority (simple rules you can compute in Sheets)
Use these definitions while collecting data from Google reviews:
- **response_rate_proxy** = (last_10_owner_responses / 10). Track last_10_owner_responses as an integer 0–10.
- **Not responding** segment if: response_rate_proxy <= 0.2 OR last_10_owner_responses = 0
- **Low rating** segment if: google_rating < 4.2
- **High volume** segment if: review_count >= 200 OR last_review_date within 14 days

**Segment assignment (single label, choose strongest pain):**
1) If google_rating < 4.2 → segment = low_rating
2) Else if response_rate_proxy <= 0.2 → segment = not_responding
3) Else if review_count >= 200 OR last_review_date <=14 days → segment = high_volume
4) Else segment = baseline

**Priority scoring:**
- Priority A: (segment=not_responding AND (review_count>=200 OR last_review_date<=14)) OR (segment=low_rating AND review_count>=100)
- Priority B: segment in {not_responding, low_rating} but not Priority A
- Priority C: segment=high_volume only

## 4) Google Maps query pack (copy/paste patterns)
For each metro, run these searches in Google Maps and open businesses with strong fit.

### Dentists
- “dentist {CITY}”
- “cosmetic dentist {CITY}”
- “dental clinic {CITY}”

### Med spas / aesthetics
- “med spa {CITY}”
- “aesthetic clinic {CITY}”
- “botox {CITY}”

### HVAC / plumbing
- “HVAC {CITY}”
- “air conditioning repair {CITY}”
- “plumber {CITY}”

Collection rule-of-thumb: prioritize businesses with **recent reviews** and **obvious response gaps** (0–2 owner responses in last 10).

## 5) Personalization hooks (fast, safe)
Store ONE short hook per lead (avoid sensitive info). Prefer paraphrase unless quoting is clearly public and harmless.
Options:
- **Recent review snippet (paraphrase):** “Saw a recent review mention quick scheduling / long wait / front desk…”
- **Response gap:** “Noticed most recent reviews don’t have owner replies.”
- **Ops load:** “Looks like you’re getting multiple reviews per week.”

## 6) Cold email sequences (3-step) — Local businesses
Send from Bob (no attachments). Keep under ~120 words.

### Email 1 (choose by segment)
**Subject options:**
1) Quick idea for your Google reviews
2) Noticed a reply gap on your reviews
3) 12-hour review responses (you approve)

**Body (NOT RESPONDING variant):**
Hi {{first_name_or_owner}},

I was looking at {{business_name}}’s Google reviews and noticed recent reviews like “{{recent_review_excerpt}}” don’t have an owner response.

We built a simple **Review Reply & Reputation Autopilot**: brand-safe responses drafted in your voice, posted fast (within ~12 hours), and we **escalate negatives** so you can fix issues before they spread.

You can see what it is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want me to run a **free 7-day trial** for {{business_name}} (Google + Yelp), with replies requiring your approval?

– Bob
agent_bob_replit+review-bot@agentmail.to

**Body (LOW RATING variant):**
Hi {{first_name_or_owner}},

I’m reaching out because {{business_name}}’s rating is solid but a few recent reviews suggest fixable issues (e.g., “{{recent_review_excerpt}}”). The risk is that unanswered negatives become the “story” for future customers.

We draft brand-safe replies, escalate the ones that need a manager, and send weekly KPI summaries. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a free 7-day trial where you approve every reply before posting?

– Bob
agent_bob_replit+review-bot@agentmail.to

**Body (HIGH VOLUME variant):**
Hi {{first_name_or_owner}},

Looks like {{business_name}} gets a steady flow of Google reviews. That’s great—until replying becomes a weekly time sink.

We run a Review Reply Autopilot: draft responses in your tone, get approval, post quickly, and flag anything negative for fast escalation. Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If I send 3 example replies based on your latest reviews, who should approve them?

– Bob
agent_bob_replit+review-bot@agentmail.to

### Follow-up 1 (Day 2–3)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name_or_owner}}—quick bump.

If you reply here with “yes,” I’ll draft **3 sample responses** to your most recent reviews (Google + Yelp if you have it). No login needed for samples.

If it looks on-brand, we can do a **free 7-day trial** with approval required before anything posts.

– Bob
agent_bob_replit+review-bot@agentmail.to

### Follow-up 2 (Day 6–7)
**Subject:** Close the loop?

Hi {{first_name_or_owner}},

Should I:
1) send 3 sample replies for {{business_name}}, or
2) leave this for now?

Either way is fine—just trying to point out the response gap while it’s easy to fix.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

– Bob
agent_bob_replit+review-bot@agentmail.to

## 7) Cold email — Agency/reseller lane (initial)
**Subject options:**
1) Add-on service for your local clients (reviews)
2) White-label review replies (Google/Yelp)

Hi {{first_name}},

Do you work with local businesses (dentists/med spas/home services) where reviews drive calls?

We run a lightweight **Review Reply & Reputation Autopilot**: brand-safe drafts, approval workflow, fast posting, negative-review escalation, and weekly KPI reporting.

You can resell it as an add-on (we can stay invisible or co-branded). Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you tell me your niche + client count, I’ll propose a simple offer for a free 7-day trial on 1 account.

– Bob
agent_bob_replit+review-bot@agentmail.to

## 8) Daily sending ops (no spend)
### Tooling (free)
- Lead/CRM: Google Sheets
- Sending: one warmed personal inbox (Gmail) with conservative volume
- Tracking: none initially (avoid deliverability risk). Track outcomes in Sheet.

### 14-day ramp (per inbox)
- Days 1–2: 10/day
- Days 3–4: 15/day
- Days 5–6: 20/day
- Days 7–8: 25/day
- Days 9–10: 30/day
- Days 11–14: 35/day
Rules: 1) send only to verified-looking domains, 2) no attachments, 3) plain text, 4) stop if bounce rate >5% or spam complaints >0.2%.

### CRM stages (Sheet column: stage)
Prospect → Queued → Sent → Replied → Qualified → Demo Booked → Trial Active → Converted → Lost

### Daily workflow (60–90 minutes)
1) Build 20–40 new prospects (Priority A first)
2) QA 10% sample (category fit, website present, not a franchise directory listing)
3) Send the day’s cap + log “Sent date”
4) Process replies within 4 business hours: book call, send samples, or disqualify
5) Send follow-ups due today (F/U1 and F/U2 dates)

## 9) Minimum viable KPI targets (Week 1)
- 200 new prospects added
- 150 emails sent
- 8–15 replies (5–10%)
- 3–5 qualified conversations
- 1–3 free trials started
