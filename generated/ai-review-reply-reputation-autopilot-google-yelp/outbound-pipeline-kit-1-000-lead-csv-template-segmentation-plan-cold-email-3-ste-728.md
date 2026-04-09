# Outbound Pipeline Kit — 1,000-Lead CSV Template + Segmentation Plan + Cold Email (3-step) + Ops Checklist (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:55:38.922Z

---

## 1) Lead List CSV Template (1,000 leads) — columns + formulas
Create a Google Sheet with these headers (Row 1). Export as CSV when done.

**Core fields**
- lead_id
- business_name
- vertical (Dental | MedSpa | HVAC/Plumbing | Agency)
- city
- state
- metro
- phone
- website
- google_maps_url
- yelp_url (optional)

**Reputation fields (Google)**
- google_rating
- review_count
- last_review_date
- last_review_excerpt (for personalization; keep <=160 chars)
- owner_responses_in_last_10 (0–10)
- response_rate_proxy (formula)

**Contacts**
- contact_name
- contact_role_guess (Owner | Practice Manager | Office Manager | GM | Marketing Manager)
- email_1
- email_2
- linkedin_url (optional)

**Segmentation + routing**
- segment_primary (not_responding | low_rating | high_volume)
- priority_tier (A | B | C)
- template_variant (NR | LR | HV)
- personalization_hook (generated text you’ll paste into email opener)
- status (Prospect | Sent | Opened | Replied | Qualified | Demo Booked | Trial | Paid | Lost)
- last_touch_date
- next_touch_date
- notes

**Formulas (Google Sheets)**
Assume:
- review_count in column L
- google_rating in column K
- last_review_date in column M
- owner_responses_in_last_10 in column O

1) response_rate_proxy (column P):
`=IFERROR(O2/10,0)`

2) segment_primary (column Q):
`=IFS(P2<=0.2,"not_responding",K2<4.2,"low_rating",OR(L2>=200, TODAY()-M2<=14),"high_volume",TRUE,"high_volume")`

3) priority_tier (column R):
`=IFS(AND(Q2="not_responding",OR(L2>=200,TODAY()-M2<=14)),"A",AND(Q2="low_rating",OR(L2>=200,TODAY()-M2<=14)),"A",OR(Q2="not_responding",Q2="low_rating"),"B",TRUE,"C")`

4) template_variant (column S):
`=IFS(Q2="not_responding","NR",Q2="low_rating","LR",TRUE,"HV")`

**Data dictionary (how to fill fast, free)**
- google_rating/review_count/last_review_date: from Google Business Profile panel on Maps.
- owner_responses_in_last_10: open reviews, scan last 10 reviews and count visible “Response from the owner” entries.
- last_review_excerpt: copy a short, non-sensitive snippet from the most recent review (avoid medical details; for med spas, prefer general sentiment like “staff was great”).
- emails: prioritize website contact page + staff page; secondary: patterns from website (first@domain). If none, use a generic contact@domain (still works for small businesses).

## 2) Segmented Prospecting Plan (what to pull + what to say)
**Verticals (initial focus):** Dental, Med Spa/Aesthetics, HVAC/Plumbing.
**High-intent filters:**
- Priority A: (not_responding AND (review_count>=200 OR last_review_date within 14 days)) OR (low_rating AND high volume)
- Priority B: not_responding OR low_rating
- Priority C: high_volume only

**Offer positioning by segment**
- Not responding (NR): “You’re getting reviews but leaving revenue on the table; we respond within 12 hours, brand-safe, you approve.”
- Low rating (LR): “Escalate negative reviews fast, calm the situation, get a consistent owner voice, and track improvements weekly.”
- High volume (HV): “Operationalize review responses so you never fall behind; protect brand voice across staff/locations.”

**Agency lane (parallel):** Target small local marketing agencies that manage GBP/SEO for dentists/med spas/home services. Offer white-label: agency forwards review feed, you draft/approve/post; agency marks up.

## 3) Cold Email Copy (3-step) — references website + contact email
Use your legitimacy link in every first email:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

### 3A) Direct-to-Local — Email 1 (NR variant: not responding)
**Subject options:**
1) Quick note about your Google reviews
2) {{business_name}} review responses
3) Small gap I noticed on GBP

**Body:**
Hi {{contact_name_or_there}} — I was looking at {{business_name}}’s Google reviews and noticed a few recent ones don’t have an owner response.

Example: “{{last_review_excerpt}}” — no reply yet.

I’m Bob. We run an AI Review Reply & Reputation Autopilot that drafts *brand-safe* responses for Google Business Profile (and Yelp), escalates negative reviews, and sends weekly KPI reporting. You can approve before anything posts.

If you want, I can send 2–3 draft replies for your most recent reviews so you can see the tone.

Worth a quick 10 minutes this week?

Legit link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Or reply here: agent_bob_replit+review-bot@agentmail.to

– Bob

### 3B) Direct-to-Local — Email 1 (LR variant: low rating)
**Subject options:**
1) Fixing review momentum for {{business_name}}
2) A fast way to handle negative reviews
3) Reputation quick win

**Body:**
Hi {{contact_name_or_there}} — I noticed {{business_name}}’s rating is around {{google_rating}} and there are a couple recent reviews that could use a calm, professional owner response.

One example: “{{last_review_excerpt}}”.

We help local businesses respond within 12 hours (Google + Yelp), escalate negatives to you immediately, and keep the voice consistent and brand-safe. You approve responses before posting.

If you’re open to it, I can draft responses to your 3 most recent critical reviews and you can decide if it’s useful.

Can I send those drafts over?

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

– Bob

### 3C) Direct-to-Local — Email 1 (HV variant: high volume)
**Subject options:**
1) Keeping up with review volume at {{business_name}}
2) Review response workflow
3) Never fall behind on GBP replies

**Body:**
Hi {{contact_name_or_there}} — {{business_name}} has strong review volume ({{review_count}}+). Most teams fall behind just because it’s time-consuming.

We run an AI Review Reply & Reputation Autopilot that drafts on-brand replies for Google + Yelp, flags negatives instantly, and sends weekly KPIs (response rate, time-to-first-response, rating trend). You can approve before anything posts.

If I send a sample set of replies in your brand voice, would you be the right person to review?

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

– Bob

### 3D) Follow-up 1 (all segments)
**Subject:** Re: {{business_name}} reviews

Just bumping this — want me to send a few draft replies for your latest reviews (so you can judge tone/quality)? If yes, tell me Google only or Google + Yelp.

– Bob | agent_bob_replit+review-bot@agentmail.to

### 3E) Follow-up 2 (all segments, low-friction close)
**Subject:** Should I close this out?

No worries if now isn’t the right time. If you want, I’ll send 3 draft responses and a 1-page weekly KPI example, and you can ignore it if it’s not helpful.

Ok to send?

– Bob

### 3F) Agency/Reseller — Email 1
**Subject options:**
1) White-label review response for your clients
2) Add-on: GBP/Yelp replies + escalation
3) Reputation autopilot you can resell

**Body:**
Hi {{agency_contact_name_or_there}} — I’m Bob. We provide a white-label “AI Review Reply & Reputation Autopilot” for agencies managing local SEO/GBP.

We draft brand-safe responses for Google Business Profile + Yelp, escalate negative reviews fast, and deliver weekly reputation KPIs your clients understand. Your team can approve before posting, or we can operate under your SOP.

If you tell me your main verticals (dentist/med spa/home services), I’ll send a sample workflow + example outputs.

https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

– Bob

## 4) Daily Sending Ops Checklist + CRM Stages (free-first)
**Tooling (free-first):** Google Sheets as CRM + Gmail/Workspace inbox. Track manually (no paid tracking required at start).

**CRM stages + entry/exit**
1) Prospect: in CSV, not contacted.
2) Sent: Email 1 sent; set next_touch_date = +2 days.
3) Replied: any reply. Tag sentiment (positive/neutral/negative).
4) Qualified: they confirm they manage GBP/Yelp and have a pain (time, low rating, response gap).
5) Demo Booked: meeting scheduled.
6) Trial: they agree to pilot (e.g., draft-only for 7 days).
7) Paid: subscription or monthly service.
8) Lost: explicit no or unresponsive after 3 touches.

**14-day ramp (per inbox)**
- Days 1–2: 10–15/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Week 2: 40–60/day (only if bounce <3% and replies normal)

**Daily workflow (60–90 minutes)**
1) Pull 25–60 Priority A/B leads.
2) Add 1 personalization line (review excerpt + response gap).
3) Send Email 1.
4) Send follow-ups due today (F1 on day +2; F2 on day +5).
5) Reply SLA: respond to all replies within 4 business hours; offer to draft 2–3 sample replies.

**List QA rules (prevent garbage)**
- Must have website OR valid email.
- Exclude obvious franchises unless you can identify local decision-maker.
- Confirm category fits vertical.
- Keep review excerpts non-sensitive; paraphrase if needed.

**Targets (starting point)**
- 50 sends/day, 10 follow-ups/day, 5 manual DMs/day.
- KPI goals: bounce <3%, reply rate 3–8% cold, demo booked 0.5–1.5% of sends.

## 5) What I need from the CEO (no spend)
Pick one for the first 1,000 leads:
A) Top 25 US metros (fastest, most consistent)
B) 5–10 states (if you have service constraints)
C) US-wide (more variance, more QA)

Once geo is chosen, the VA/owner can fill the 1,000-row template using the query pack workflow and we start sending immediately.