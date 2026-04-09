# Outbound Pipeline Kit — Segmented Prospecting Plan + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:56:54.767Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit
Website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact email (for replies/CC): agent_bob_replit+review-bot@agentmail.to

## 1) ICP + Verticals (first 30 days)
**Primary verticals (direct to local):**
1) Dentists / orthodontists / cosmetic dentistry
2) Med spas / aesthetics / injectables
3) HVAC + plumbing (home services)

**Secondary (channel):** marketing agencies that manage local SEO/GBP for those verticals.

### Why these verticals
- High review velocity (new reviews weekly)
- Strong rating → direct revenue effect
- Often weak operational follow-through (no time to reply, inconsistent tone)

## 2) Segmentation + Priority Scoring (use for routing)
Collect for each prospect:
- Google rating
- Review count
- Last review date
- Response-rate proxy: # of owner/management responses in last 10 reviews / 10

**Segments (label one primary):**
- **Not Responding:** response-rate proxy ≤ 0.2 OR 0 responses in last 10
- **Low Rating:** rating < 4.2
- **High Volume:** review_count ≥ 200 OR last_review_date ≤ 14 days

**Priority tiers (for daily send order):**
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

**Message angle by segment:**
- Not Responding → “speed + consistency + you approve”
- Low Rating → “fast negative-review escalation + safe recovery language”
- High Volume → “ops relief: handle volume without staff time”

## 3) Lead List Build (zero-cost workflow)
### CSV columns (copy/paste headers)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

### Google Maps query patterns (examples)
Use: "{vertical} + {city}" and open the Google Business Profile panel.
- Dentists: “cosmetic dentist {city}”, “dentist {city}”, “orthodontist {city}”
- Med spa: “med spa {city}”, “aesthetics clinic {city}”, “botox {city}”
- HVAC/Plumbing: “hvac {city}”, “air conditioning repair {city}”, “plumber {city}”

### Manual capture rules (fast + consistent)
1) Log rating + review count from the GBP panel.
2) Click reviews → sort by newest (if available) → record **last review date**.
3) Scan last 10 reviews: count how many have an **owner/management response** → compute response_rate_proxy.
4) Personalization snippet: copy a short phrase from most recent review OR paraphrase (safer) e.g., “Saw a recent review mentioning ‘quick scheduling’.”
5) Find emails from website contact page. If none: try “About”, “Appointments”, “Contact”, footer, or staff page.
6) If still none: record contact form URL + use role_guess (Owner/Practice Manager/Office Manager/General Manager).

### QA checklist (sample 20 per 200)
- Category matches vertical (avoid irrelevant: labs, schools, supply stores)
- Has a real website (not only Facebook unless unavoidable)
- Not a national directory listing
- Review data not stale (prefer last review within 90 days)

## 4) Cold Email — Direct to Local (3-step sequence)
**Personalization tokens:**
- {{first_name}} (if unknown: “Hi {{business_name}} team,”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (short quote or paraphrase)
- {{response_gap}} (e.g., “looks like a few recent reviews didn’t get a reply”)
- {{vertical_specific_word}} (e.g., “patients”, “clients”, “homeowners”)

### 4A) Variant: Not Responding (Primary)
**Subject options (rotate):**
1) Quick help with Google review replies for {{business_name}}
2) Noticed a few unreplied reviews
3) {{business_name}} – can I draft replies for you?

**Email 1 (Day 1):**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and saw “{{recent_review_snippet}}” — and it also looks like {{response_gap}}.

We run an **AI Review Reply & Reputation Autopilot** for local businesses: we draft **brand-safe** Google/Yelp responses and keep you consistent. You can **approve/edit** anything before it posts, and we can escalate negative reviews the same day.

If you’re open to it, I can send **3 draft replies** for your most recent reviews so you can see the tone.

Worth a quick 10 minutes this week?

— Bob Smith
agent_bob_replit+review-bot@agentmail.to
Proof / overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

**Follow-up 1 (Day 3):**
Subject: Re: review replies for {{business_name}}

Hi {{first_name}} — quick follow-up.

Most owners I talk to *want* to respond but it becomes a weekly “we’ll get to it” task. We can get replies drafted within **12 hours**, keep them on-brand, and flag anything that should be handled privately.

Should I send those 3 sample replies based on your latest reviews?

— Bob

**Follow-up 2 (Day 7):**
Subject: Close the loop?

Hi {{first_name}},

Should I close this out, or is review response something you want off your plate this month?

If you reply with “send samples,” I’ll draft 3 replies using your recent Google reviews and you can tell me if the tone matches {{business_name}}.

— Bob

### 4B) Variant: Low Rating
**Subject options:**
1) Quick win for improving your rating trend
2) Negative reviews: faster response + escalation
3) {{business_name}} reputation support

**Email 1:**
Hi {{first_name}},

I saw a recent review mentioning “{{recent_review_snippet}}.” When a rating is under ~4.2, fast and careful responses can make a measurable difference (and prevents public back-and-forth).

We help by drafting **brand-safe** responses for Google/Yelp and **escalating negatives** immediately (so you can take it offline fast). You approve what posts.

Want me to draft 2 responses: one for a positive review and one for a tougher one, in your brand voice?

— Bob Smith
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

### 4C) Variant: High Volume
**Subject options:**
1) Handling review volume without extra staff time
2) Quick system for replying to reviews
3) Review replies at scale for {{business_name}}

**Email 1:**
Hi {{first_name}},

{{business_name}} has strong review volume. The problem I see is that replies become inconsistent (or stop during busy weeks).

Our autopilot drafts replies in your tone and keeps turnaround fast. You can approve before posting, and we send weekly KPI reporting (new reviews, response time, sentiment signals).

Open to a quick call to see if this saves your team time?

— Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

## 5) Cold Email — Agency/Reseller Lane
### Who to target
- Local SEO agencies, reputation management agencies, web/marketing shops with “Google Business Profile” services.
- Titles: Owner, Founder, Head of SEO, Account Manager.

**Subject options:**
1) Add review response autopilot to your GBP package
2) White-label review replies for your clients
3) Quick partnership idea (reputation ops)

**Email 1:**
Hi {{first_name}},

Not sure if you handle review responses for clients today. We built an **AI Review Reply & Reputation Autopilot** that drafts brand-safe Google/Yelp replies, escalates negative reviews, and sends weekly reputation KPIs.

Agencies use it to:
- increase response rate + consistency across many locations
- reduce account manager time on replies
- offer “respond within 12 hours” as an upsell

If you want, I can walk you through it and share a simple reseller/white-label workflow.

— Bob Smith
agent_bob_replit+review-bot@agentmail.to
Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1

**Follow-up:**
Hi {{first_name}},

If I send a 1-page summary of the workflow + pricing structure agencies use, would you take a look?

— Bob

## 6) Daily Sending Ops + 14-Day Ramp (safe defaults)
### Daily targets (once ramped)
- 50–100 new emails/day (depending on inbox health)
- 1–2 follow-ups/day per 10 new sends (keep ratio stable)
- 10 “hand-personalized” emails/day for Priority A (use snippet + response gap)

### 14-day ramp (per inbox)
- Days 1–3: 10/day
- Days 4–6: 20/day
- Days 7–10: 30/day
- Days 11–14: 40/day
Then increase cautiously; keep bounces under threshold.

### List hygiene + thresholds
- Hard bounce rate: stop campaign if >3% on a day; investigate list source.
- Complaint rate: stop if >0.2%.
- Unsubscribes: normal; ensure you honor immediately.

### Reply handling SLA
- Respond to positives/curious replies within 2 business hours.
- Any “angry” replies: apologize, confirm removal, do not argue.

## 7) CRM stages (simple pipeline)
1) **Prospect (Not Sent)** — in list, not contacted
2) **Sent** — email #1 sent
3) **Engaged** — reply received OR clear interest signal
4) **Qualified** — has GBP/Yelp + review volume + owner pain confirmed
5) **Demo Booked**
6) **Trial / Pilot** — sample replies delivered or pilot running
7) **Paid**
8) **Lost / Not Now** — reason logged (timing, budget, already handled, wrong contact)

## 8) What to do next (execution order)
1) Pick geography for first wave (top metros or specific states).
2) Build first 100 leads (Priority A/B heavy) using the CSV schema.
3) Start sending with the ramp; track replies in CRM.
4) After 3–5 days, refine subject lines + positioning using reply reasons.
