# Outbound Pipeline Runbook (v1) — Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:56:11.966Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Runbook (v1)

Business proof URL (include in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply/contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Target verticals + why
We run 3 vertical lanes in parallel because they have (a) steady review velocity, (b) meaningful revenue impact from ratings/responsiveness, and (c) high willingness to pay for “done-for-you” operations.
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + plumbers (home services)

## 2) Geography (recommended default)
Recommended for the first 500–1,000 leads: Top US metros to maximize review volume and business density.
Use these 25 metros as the default list:
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; San Francisco CA; Columbus OH; Fort Worth TX; Indianapolis IN; Charlotte NC; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Detroit MI; Nashville TN; Portland OR.

## 3) Google Maps query pack (copy/paste)
Run each query per metro. If results are too broad, append “near {metro}” in the query.

### Dentists
- “dentist {metro}”
- “dental clinic {metro}”
- “cosmetic dentist {metro}”
- “pediatric dentist {metro}”

### Med spas
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}”
- “laser hair removal {metro}”

### HVAC / plumbing
- “HVAC {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”
- “drain cleaning {metro}”

### Agencies (reseller lane)
Goal: agencies who manage local clients (SEO/PPC/reputation). They can resell and bring multiple locations.
- “dental marketing agency {metro}”
- “med spa marketing agency {metro}”
- “home services marketing agency {metro}”
- “reputation management agency {metro}”

## 4) Lead CSV schema (columns)
Use these exact headers:
- business_name
- vertical
- city_state
- phone
- website
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt (short; or paraphrase)
- response_rate_proxy (0–100%)
- owner_or_manager_name (if available)
- role_guess (Owner/Office Manager/Practice Manager/GM)
- email_1
- email_2
- segment (not_responding / low_rating / high_volume)
- priority (A/B/C)
- personalization_hook (1 sentence)
- notes

## 5) How to compute segmentation quickly (rules)
Capture the last 10 reviews on Google (most recent first). Count how many have an “Owner response”.
- response_rate_proxy = (owner_responses_in_last_10 / 10) * 100

Segment rules (apply all that match; then pick the strongest primary segment for messaging):
- not_responding: response_rate_proxy <= 20% OR 0 owner replies in last 10
- low_rating: google_rating < 4.2
- high_volume: review_count >= 200 OR last_review_date within 14 days

Priority scoring (for send order):
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: high_volume only

Messaging route:
- not_responding → “response gap / speed / brand-safe replies” email variant
- low_rating → “escalation / service recovery / protect rating” variant
- high_volume → “ops throughput / consistency / weekly reporting” variant

## 6) Personalization hook (safe pattern)
Use a short, non-sensitive reference. Prefer paraphrase to avoid quoting sensitive content.
Template options:
- “Saw a recent review mentioning {{theme}} and noticed there wasn’t a reply yet.”
- “Noticed you’ve had a steady stream of new reviews lately—looks like responses aren’t consistent.”
- “Congrats on the volume of recent feedback—most owners I talk to can’t keep up without a system.”

Themes by vertical:
- Dental: wait time, billing/insurance confusion, front desk experience, pain/comfort, scheduling
- Med spa: results expectations, follow-up, pricing clarity, staff friendliness
- HVAC/plumbing: timeliness, communication, pricing surprise, cleanliness, warranty

## 7) Cold email sequences (3-step) — ready to send
Sender signature (use in all emails):
Bob Smith
AI Review Reply & Reputation Autopilot
agent_bob_replit+review-bot@agentmail.to
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

### 7A) Local business — Initial email (NOT RESPONDING variant)
Subject options:
1) Quick fix for your Google reviews
2) Noticed a response gap on Google
3) Re: your recent reviews

Body:
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed a few recent reviews didn’t get a response (e.g., {{personalization_hook}}).

We run an AI-assisted “review reply autopilot” for local businesses: brand-safe drafts + posting workflow, negative-review escalation, and a simple weekly KPI report. Typical outcome: replies go out within 12 hours without the owner having to live in Google/Yelp.

Would you be open to a 10-minute call this week? If you prefer, I can send 2–3 example replies in your brand voice first.

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

### 7B) Local business — Initial email (LOW RATING variant)
Subject options:
1) Quick service-recovery system for reviews
2) Protect your rating (without more work)
3) A simple way to handle negative reviews

Body:
Hi {{first_name}},

I saw {{business_name}} has a {{google_rating}} rating on Google and a few reviews mentioning {{theme}}. When replies are delayed (or inconsistent), it can drag on conversions.

We help local businesses respond fast with brand-safe, compliant replies (you can approve first), and we escalate negative reviews immediately so you can do service recovery while it still matters.

Want me to send a couple sample replies for your most recent reviews? If they look good, we can discuss a lightweight setup.

— Bob
agent_bob_replit+review-bot@agentmail.to
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

### 7C) Local business — Initial email (HIGH VOLUME variant)
Subject options:
1) Keeping up with review volume at {{business_name}}
2) Consistent replies for high review volume
3) A system for review responses (12-hour SLA)

Body:
Hi {{first_name}},

Noticed {{business_name}} has {{review_count}} Google reviews and recent activity. Most teams with that volume struggle to keep replies consistent.

We provide a review-response ops layer: AI drafts in your brand voice, an approval workflow (or autopost rules), negative-review escalation, and weekly reputation KPIs.

Open to a quick call? If you tell me your preferred tone, I’ll send 2–3 sample responses today.

— Bob
Proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

### 7D) Follow-up #1 (send +2 days)
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick bump.

If it’s helpful, here’s the simple offer:
- Responses within ~12 hours
- Brand-safe tone + you can approve
- Negative reviews escalated fast
- Weekly KPI email (rating, volume, response rate)

Should I send sample replies for 2 recent reviews?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 7E) Follow-up #2 (send +5–7 days)
Subject: Close the loop?

Hi {{first_name}},

Should I close the loop on this? If review responses are already covered, no worries.

If you want, reply with “samples” and I’ll draft 2–3 replies for your latest reviews and share them along with the proof page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob

## 8) Agency/reseller lane — Initial email
Subject options:
1) White-label review response ops for your clients
2) Add review responses to your retainer (done-for-you)
3) Quick reseller idea for local clients

Body:
Hi {{first_name}},

If you manage local clients (dental/med spa/home services), we can run the review-response “ops layer” for your accounts: fast brand-safe replies, escalation for negatives, and weekly KPIs you can forward to clients.

It’s designed to be reseller-friendly (your branding if you want) and reduces the annoying day-to-day work that clients complain about.

Open to a 10-minute call? Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

## 9) Daily sending ops (14-day ramp)
Assumes 1 inbox. If multiple inboxes, multiply volume but keep per-inbox limits conservative.

Day 1–3: 15–25 new emails/day (mostly Priority A)
Day 4–7: 25–40 new/day
Day 8–14: 40–60 new/day (cap if deliverability drops)
Steady-state target: 50–100/day total across inboxes (only after stable deliverability)

Follow-ups: send F1 to all non-replies at +2 days; F2 at +5 to +7 days.

List QA before sending (every batch):
- Remove franchises/mega chains if not a fit
- Validate website exists (or strong GBP only)
- Avoid role accounts that bounce (info@ ok as backup, prefer owner/manager)
- Skip businesses with obvious “we already respond to everything” (response_rate_proxy >= 80% and recent replies)

Reply handling SLA:
- Same day for positive interest
- Under 2 hours for “pricing?” or “send info”
- Immediate for “remove me” (suppression list)

Bounce/complaint thresholds:
- If hard bounce > 3%: stop and fix list quality
- If spam complaints >= 0.1%: stop and review copy + list targeting

## 10) CRM stages (simple)
1) Prospect (in list, not sent)
2) Sent (initial sent)
3) Replied
4) Qualified (has Google/Yelp presence + review velocity + pain acknowledged)
5) Demo Booked
6) Trial / Pilot (sample replies, approval workflow)
7) Paid
8) Lost (reason tagged)

Minimum fields to track in CRM: vertical, segment, priority, last touch date, next follow-up date, outcome.

## 11) What’s needed next to produce the actual 500–1,000 lead CSV
Decision points:
- Geography scope: Top 25 metros (recommended) vs 5–10 states vs US-wide.
- Lead sourcing method: zero-cost manual/VA workflow vs paid Maps scraper.
Once decided, we can generate 500–1,000 rows with rating/review count/last review date/response proxy + emails and start daily sending immediately.
