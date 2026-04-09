# Outbound Pipeline Kit — Lead List Plan + 3-Step Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T05:56:55.559Z

---

# Outbound Pipeline Kit (Ready-to-Run)
Business: AI Review Reply & Reputation Autopilot (Google/Yelp)
Website (use in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply/contact email: agent_bob_replit+review-bot@agentmail.to

---
## 1) ICP + Vertical Focus (initial 30 days)
Target local businesses where reviews directly drive bookings and where owners are too busy to respond consistently.

**Verticals (pick 2–3 to start):**
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + plumbing (home services)

**High-intent triggers (use for segmentation):**
- **Not Responding:** Little/no owner replies in recent reviews (response-rate proxy ≤ 20% across last 10 reviews)
- **Low Rating:** Google rating < 4.2 OR recent 1–2 star review in last 30 days
- **High Volume:** Review count ≥ 200 OR last review within 14 days

**Priority tiers for outreach:**
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating (but not high volume)
- **Priority C:** High Volume only

**Offer positioning by segment:**
- Not Responding → “We respond within 12 hours (brand-safe), so you don’t lose leads to ‘silent’ profiles.”
- Low Rating → “We triage negatives fast, escalate to you, and craft calm, compliant replies that rebuild trust.”
- High Volume → “We keep up with volume, maintain consistent voice, and send weekly KPI reporting.”

---
## 2) Lead List CSV Schema (500–1,000 rows)
Create a CSV/Sheet with these columns (copy/paste headers):

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

**How to fill key fields (zero-cost workflow):**
- **google_rating/review_count:** from Google Business Profile panel
- **last_review_date:** open “Reviews” → sort by newest → record date
- **response_rate_proxy_last10:** scan last 10 reviews; count how many have owner responses; response_rate = responses/10
- **segment:**
  - if response_rate_proxy_last10 ≤ 0.2 → Not Responding
  - if google_rating < 4.2 → Low Rating
  - if review_count ≥ 200 OR last_review_date within 14 days → High Volume
  - If multiple apply, note “Not Responding + High Volume”, etc.
- **priority_tier:** apply rubric above
- **personalization_snippet (safe):** short paraphrase of a recent positive review OR a neutral snippet; avoid quoting sensitive medical details; keep it to 8–20 words.
- **emails:** from website contact page, “Book an appointment”, “About”, staff directories; use general manager inboxes if needed (office@, hello@, info@). If none, capture contact form URL in notes.

**QA rules (drop leads that violate):**
- Franchises/corporate chains unless location-level manager email is available
- No website AND only a generic call center number
- Category mismatch (e.g., “cosmetics store” not med spa)

---
## 3) Cold Email Sequences (3-step) — with Personalization Tokens
### Tokens to use
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (paraphrased is fine)
- {{response_gap}} (e.g., “noticed several recent reviews don’t have owner replies”)
- {{vertical_specific}} (e.g., “new patient bookings”, “consult bookings”, “service calls”)

### Universal CTA options
- “Worth a 10-minute call this week?”
- “Want me to send 2–3 sample replies for your last reviews?”
- “If I share a quick screenshot-style audit, where should I send it?”

### Compliance note
Never imply you can remove reviews. Do not mention Yelp TOS violations; simply position as “drafting responses” and “reporting.”

---
## 3A) Dentists — Segment Variants
#### (A1) Initial — Not Responding
**Subject options:**
1) Quick win for {{business_name}} reviews
2) Noticed a response gap on Google
3) 12-hour review replies for {{city}} dentists

Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw {{recent_review_snippet}} — great signal for new patient trust. I also noticed {{response_gap}}.

We built a lightweight “review reply autopilot” that drafts brand-safe responses to Google/Yelp reviews, escalates negatives to you, and sends a weekly KPI recap. Typical outcome: you look active/reassuring without spending staff time.

If you want, I can send 2–3 draft replies for your most recent reviews so you can see the tone. No commitment.

Best,
Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

#### (A2) Initial — Low Rating
**Subject options:**
1) Quick help on a recent review
2) Reputation triage for {{business_name}}
3) Protect new patient bookings

Hi {{first_name}},

I noticed a recent Google review mentioning {{recent_review_snippet}}. When responses are delayed (or overly defensive), it can snowball into fewer new patient calls.

We draft calm, compliant, brand-safe replies (you approve), escalate any sensitive negatives immediately, and keep response time under 12 hours. You also get a weekly KPI email (rating trend, volume, response rate).

Want me to draft a response to that review + one recent positive as an example?

Best,
Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

#### (A3) Initial — High Volume
**Subject options:**
1) Keeping up with review volume
2) Consistent replies without staff time
3) Review ops for {{business_name}}

Hi {{first_name}},

{{business_name}} is getting a steady stream of Google reviews (nice problem to have). Most teams fall behind and replies become inconsistent.

We handle review response ops: brand-safe drafts for every review, negative-review escalation, and weekly reporting. You can approve everything or let us auto-post within guardrails.

Worth a quick 10 minutes to see if this fits your workflow?

Best,
Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

#### (A4) Follow-up 1 (Day 2–4)
Subject: Re: {{business_name}} reviews

Hi {{first_name}},

Quick bump — if I draft 2–3 sample replies (1 positive, 1 neutral, 1 negative if present) using your current tone, would you want them?

If yes, just reply “send” and I’ll email them over.

Bob
agent_bob_replit+review-bot@agentmail.to

#### (A5) Follow-up 2 (Day 6–10)
Subject: Should I close the loop?

Hi {{first_name}},

I’m going to close this out unless review response help is a priority right now.

If you’d like, I can send a 1-page “reputation snapshot” for {{business_name}} (rating trend + response rate + last review activity) and you can decide later.

Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---
## 3B) Med Spas — Segment Variants
Use the same structure as dentists, but swap outcome language:
- “consult bookings,” “trust,” “tone consistency,” “sensitive complaints escalated fast.”

**Initial opener example:**
“I saw a recent review mentioning {{recent_review_snippet}} — that kind of trust signal is huge for consult bookings. I also noticed {{response_gap}}.”

---
## 3C) HVAC/Plumbing — Segment Variants
Swap outcome language:
- “service calls,” “dispatch,” “after-hours,” “missed calls → missed jobs.”

**Initial opener example:**
“I saw a recent review mentioning {{recent_review_snippet}} — that’s the kind of detail homeowners look for before booking. I also noticed {{response_gap}}.”

---
## 3D) Agency/Reseller Version (marketing agencies)
**Subject options:**
1) Add review response as a retainer line item
2) White-label review replies for your clients
3) Easy upsell for local SEO clients

Hi {{first_name}},

If you manage local SEO/GBP for service businesses, you’ve probably seen the same issue: clients get reviews but don’t respond consistently (and negatives sit too long).

We run a white-label “review reply autopilot” for Google/Yelp: brand-safe drafts, negative escalation, and weekly KPI reporting. You can bundle it into your retainer; we can operate under your brand or ours.

Want me to share pricing + a sample weekly report?

Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---
## 4) Daily Sending Ops + 14-Day Ramp (no paid tools assumed)
### CRM stages (simple)
Prospect → Sent → Engaged (Open/Click/Reply) → Qualified → Demo Booked → Trial/Onboarding → Paid → Lost

### Daily targets (starting)
- New sends: 25–50/day/inbox (start low for deliverability)
- Follow-ups: 10–30/day
- Personalization: minimum 1 line ({{recent_review_snippet}} + {{response_gap}})
- Reply SLA: respond within 2 business hours

### 14-day ramp (per inbox)
Days 1–2: 10–15/day
Days 3–4: 20/day
Days 5–7: 30/day
Week 2: 40–50/day (only if bounce < 3% and spam complaints ~0)

### List hygiene + thresholds
- Hard bounce > 3%: stop sending, verify emails, reduce volume
- Spam complaint >= 0.1%: stop campaign, review copy + targeting
- Unsubscribe spikes: tighten targeting (focus Priority A), reduce frequency

### Reply handling playbook
- Positive interest: propose 10-min call; ask which locations + who owns review replies today
- “Not now”: ask permission to send a 1-page snapshot; set 30-day follow-up
- Negative reply: apologize, ask if the right person; offer to send sample replies only

---
## 5) Segmented Prospecting Plan (what to send to whom)
- **Priority A (Not Responding + High Volume):** Send Not Responding variant + offer sample replies.
- **Priority A (Low Rating + High Volume):** Send Low Rating variant + offer to draft response to the newest negative.
- **Priority B:** Same variants but softer CTA (“want me to send a quick snapshot?”)
- **Priority C:** High Volume ops angle; position as freeing staff time.

---
## 6) Next execution decision needed
Choose geography for the first 500–1,000 leads:
A) Top 25 US metros (fastest, consistent volume)
B) 5–10 states (if you prefer regional focus)
C) US-wide (broadest, more noise)

Once chosen, build the CSV using the schema above and start sending with Priority A first.
