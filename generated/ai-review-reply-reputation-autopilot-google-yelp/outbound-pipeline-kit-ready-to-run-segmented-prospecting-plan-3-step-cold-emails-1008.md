# Outbound Pipeline Kit (Ready-to-Run): Segmented Prospecting Plan + 3-Step Cold Emails + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:15:53.307Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit
Business website (include in outreach): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Reply/contact email (include in outreach): agent_bob_replit+review-bot@agentmail.to

## 1) ICP + Verticals + Offer (what we’re selling)
**Offer (core):** “We draft and post brand-safe responses to your Google Business Profile + Yelp reviews, escalate negative reviews, and send weekly reputation KPI reports. Responses within 12 hours. You can approve before posting.”

**Chosen verticals (high review velocity + high LTV):**
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + plumbers (home services)

**High-intent triggers (prioritize accounts that feel pain today):**
- **Not Responding:** business has recent reviews but few/no owner responses (proxy from last 10 reviews)
- **Low Rating:** rating < 4.2 (especially with recent negatives)
- **High Volume:** 200+ reviews OR last review within last 14 days

## 2) Segmentation + Priority Scoring (routing rules)
### Required fields (for segmentation)
- google_rating
- review_count
- last_review_date
- response_rate_proxy (0–100%) = # of owner responses within last 10 reviews / 10

### Segment tags
- **not_responding:** response_rate_proxy <= 20% OR 0 responses in last 10
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count >= 200 OR (today - last_review_date) <= 14 days

### Priority tiers (used to decide who gets emailed first)
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

### Message angle by segment
- **Not responding:** “response gap” + conversion impact + “we respond within 12 hours”
- **Low rating:** “reputation recovery + escalation” + reduce future negatives + “owner-approved”
- **High volume:** “ops throughput” + consistent voice + weekly KPI reporting

## 3) Lead List Build Spec (CSV schema + QA)
### CSV columns (copy/paste headers)
business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy,segment,priority,personalization_snippet,owner_or_manager_name,role_guess,email_1,email_2,notes

### Personalization snippet rules (safe)
- Use 8–20 words from the most recent review OR paraphrase.
- Avoid quoting medical outcomes, pricing, sensitive traits; for med spas/dentists prefer paraphrase.
- Format suggestion: “Recent review mentioned: ‘{{snippet}}’ (no reply yet).”

### 30-minute QA checklist (for every 100 leads)
- 10 random rows: verify category matches vertical (no schools, suppliers, franchises if avoiding)
- Websites load + match the business name
- Google rating/review count not blank
- last_review_date within last 6 months for Priority A/B pools
- Emails: at least one valid business domain email where possible (avoid generic if you can)

## 4) Cold Email — 3-Step Sequence Pack
Notes:
- Keep first email ~90–130 words.
- Personalize 1 line using {{personalization_snippet}} and {{response_gap}}.
- Always include legitimacy link (website URL) and reply email.

### Global tokens
- {{first_name}} (or “there”)
- {{business_name}}
- {{city}}
- {{vertical}}
- {{recent_review_snippet}}
- {{response_gap}} (e.g., “looks like a few recent reviews didn’t get a reply”)
- {{signature}} = “Bob”


## A) DENTAL — Not Responding (Priority A/B)
**Subject options:**
1) Quick win for {{business_name}} reviews
2) Noticed a reply gap on Google reviews
3) Can I help with review replies?

**Email 1 (Initial):**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}}. One recent review said: “{{recent_review_snippet}}.”

We built a small “review reply autopilot” for local businesses: brand-safe draft replies for Google + Yelp, negative-review escalation, and a weekly reputation KPI report. We can respond within ~12 hours, and you can approve before anything posts.

Open to a 10-minute chat this week to see if this would save you time and protect your rating?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Email 2 (Follow-up #1, 2–3 days later):**
Subject: Re: {{business_name}} review replies

Hi {{first_name}} — quick follow-up.

Most dental offices we talk to don’t need “marketing”; they just need consistent replies so prospects see an attentive practice (and unhappy patients get handled fast).

If I send 2–3 sample replies in your tone for recent reviews, would you tell me if they’re on-brand?

— Bob
(website + email)

**Email 3 (Follow-up #2, 5–7 days later):**
Subject: Should I close this out?

Hi {{first_name}},

Should I close the loop, or is someone else best to handle Google/Yelp review responses for {{business_name}}?

If it’s helpful, I can share a 1-page weekly KPI snapshot template (rating trend, response rate, negative-review alerts).

— Bob
(website + email)


## B) DENTAL — Low Rating (Priority A/B)
**Subject options:**
1) Help recovering {{business_name}}’s rating
2) Quick reputation fix (owner-approved replies)
3) Reducing future 1-star reviews

**Email 1:**
Hi {{first_name}},

I’m reaching out because {{business_name}}’s Google rating is currently {{google_rating}}. A recent reviewer mentioned: “{{recent_review_snippet}}.”

We help practices respond quickly and consistently on Google + Yelp (brand-safe drafts, negative-review escalation, and weekly KPI reporting). You can approve replies before posting, and we flag issues that need a human follow-up.

Would it be crazy to test this for 14 days and see if response speed + tone consistency helps stabilize reviews?

— Bob
(website + email)


## C) DENTAL — High Volume (Priority C/A)
**Subject options:**
1) Too many reviews to keep up with?
2) Review ops for {{business_name}}
3) Consistent replies in 12 hours

**Email 1:**
Hi {{first_name}},

{{business_name}} has a strong review footprint ({{review_count}} reviews). When volume is high, consistency becomes the hard part.

Our system drafts and posts brand-safe Google/Yelp replies, escalates negative reviews instantly, and sends weekly KPIs (response rate, rating trend, unresolved negatives). Replies can go out within ~12 hours and you can approve before posting.

Want me to show you what this looks like using 2 of your recent reviews?

— Bob
(website + email)


## D) MED SPA — Not Responding
**Subject options:**
1) Med spa review replies (brand-safe)
2) Quick fix for Google/Yelp reviews
3) Noticed a few reviews without replies

**Email 1:**
Hi {{first_name}},

I was checking {{business_name}}’s reviews and noticed {{response_gap}}. One recent review mentioned {{recent_review_snippet}}.

We run an AI-assisted review reply workflow designed for clinics: brand-safe drafts for Google + Yelp, fast escalation for unhappy guests, and a weekly reputation KPI report. You approve replies before they post.

Open to a quick call to see if this would reduce the “review admin” load while keeping your tone consistent?

— Bob
(website + email)


## E) MED SPA — Low Rating
**Subject options:**
1) Reputation recovery for {{business_name}}
2) Lowering negative review impact
3) Owner-approved review replies

**Email 1:**
Hi {{first_name}},

Reaching out because {{business_name}} is at {{google_rating}} on Google. Recent feedback referenced {{recent_review_snippet}}.

We help med spas respond quickly and consistently (Google + Yelp), escalate negatives the same day, and report weekly KPIs so nothing slips through. Replies are drafted brand-safe and can be approved before posting.

Would a 10-minute walkthrough be worth it to see if we can prevent future negatives from going unanswered?

— Bob
(website + email)


## F) HVAC/PLUMBING — Not Responding
**Subject options:**
1) Missed review replies = missed calls
2) Quick win: respond to reviews in 12 hours
3) Helping {{business_name}} with reviews

**Email 1:**
Hi {{first_name}},

I found {{business_name}} on Google and noticed {{response_gap}}. A recent customer said: “{{recent_review_snippet}}.”

We set up a review reply autopilot for home-service companies: brand-safe replies on Google + Yelp, negative review escalation, and weekly KPIs. We can respond within ~12 hours (and you can approve before posting).

Want me to send 2 sample replies written in your company voice?

— Bob
(website + email)


## G) HVAC/PLUMBING — Low Rating
**Subject options:**
1) Fixing review damage (fast)
2) Bringing {{business_name}} back above 4.2
3) Negative reviews: escalation + replies

**Email 1:**
Hi {{first_name}},

I’m reaching out because {{business_name}}’s Google rating is {{google_rating}} and there are recent complaints like: “{{recent_review_snippet}}.”

We help respond fast, escalate negatives to a human right away, and keep a consistent tone across Google + Yelp. You can approve before anything posts, and we send weekly KPIs so the team sees what’s improving.

Is it worth a 10-minute call to see if we can stop negatives from sitting unanswered?

— Bob
(website + email)


## 5) Agency/Reseller Lane (marketing agencies)
### Positioning
- “White-label review response ops” for their local clients
- Agency gets margin; we do fulfillment + reporting

**Subject options:**
1) White-label Google/Yelp review replies for your clients
2) Add a retention offer (done-for-you review responses)
3) Quick partnership idea

**Email 1 (Agency):**
Hi {{first_name}},

Do you offer Google Business Profile + Yelp review response management for your local clients?

We built a lightweight review reply + reputation reporting system: brand-safe drafts, negative-review escalation, and weekly KPIs. It’s easy to white-label: your team approves, we handle the operational throughput.

If you have 5–20 clients who struggle to respond to reviews, I can show how agencies package this as a monthly add-on.

Open to a quick chat?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to


## 6) Daily Sending Ops + 14-Day Ramp
### Tooling (free-first principles)
- Use 1 inbox initially (existing mailbox) until deliverability proves stable.
- Track in Google Sheets CRM (Prospect → Sent → Replied → Qualified → Demo Booked → Trial → Paid → Lost).
- Avoid link overload; include only the website URL.

### 14-day ramp (per inbox)
- Days 1–2: 15/day (high personalization, Priority A only)
- Days 3–4: 25/day
- Days 5–7: 35/day
- Week 2: 50/day (if bounce <3% and complaint ~0)

### Daily checklist (45–75 minutes)
1) Pull 25–50 new prospects (Priority A then B)
2) Personalize first line with review snippet + response gap
3) Send new emails (per ramp cap)
4) Send follow-ups to non-replies (5–20/day)
5) Log outcomes in CRM (Replied/Qualified/Lost)
6) Same-day handling: negative signals get a human reply within 2 hours

### Safety thresholds
- Bounce rate > 3%: pause, verify emails, tighten sourcing
- Spam complaints: stop sending immediately, reduce volume, remove tracking pixels (if any)
- Unsubscribes: honor within 24 hours; add to suppression list

## 7) CRM Stages (definition)
- **Prospect:** in list, not yet contacted
- **Sent:** initial email sent
- **Replied:** any reply
- **Qualified:** expressed pain/interest, right role, has Google/Yelp presence
- **Demo Booked:** calendar set
- **Trial:** onboarding / first week running
- **Paid:** converted
- **Lost:** not a fit / no budget / competitor / no response after 3 touches

## 8) What’s needed next to produce the 500–1,000 CSV
1) Choose initial geography scope (top 25 metros vs 5–10 states vs US-wide)
2) Decide list sourcing method: manual (zero-cost) vs paid scraper (faster)
3) Build/export CSV using schema above; then run QA + final segmentation
