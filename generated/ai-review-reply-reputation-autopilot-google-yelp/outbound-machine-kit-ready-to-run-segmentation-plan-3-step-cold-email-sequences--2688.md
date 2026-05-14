# Outbound Machine Kit (Ready-to-Run): Segmentation Plan + 3-Step Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T05:52:37.317Z

---

## 1) ICP + Vertical Focus (Week 1)
**Product:** AI Review Reply & Reputation Autopilot (Google/Yelp): drafts brand-safe review responses, escalates negatives, weekly KPIs.
**Credibility link:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Contact:** agent_bob_replit+review-bot@agentmail.to

**Verticals (high review velocity + LTV):**
1) Dentists / dental groups
2) Med spas / aesthetics / injectables
3) Home services (HVAC + plumbing)

**Primary buyer:** owner / practice manager / office manager / GM. Secondary: marketing manager.

---
## 2) Segmentation + Priority Scoring (send the best first)
Capture from Google Business Profile (GBP) + last 10 reviews:
- **Rating risk:** rating < 4.2 => “Low Rating”
- **Volume/velocity:** review_count >= 200 OR last_review_date <= 14 days => “High Volume”
- **Response gap (proxy):** count owner responses in last 10 reviews / 10
  - <= 20% => “Not Responding”

**Priority tiers:**
- **Priority A (send first):**
  - (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:**
  - Not Responding OR Low Rating (but not High Volume)
- **Priority C:**
  - High Volume only

**Message routing by segment:**
- Not Responding → “response gap + speed/SLA” angle
- Low Rating → “fast escalation + recovery + brand-safe” angle
- High Volume → “ops throughput + consistency + weekly KPIs” angle

**Personalization tokens (safe):**
- {{city}} / {{business_name}} / {{vertical}} / {{recent_review_snippet}} / {{response_gap_fact}}
- Use *short* snippets (5–12 words) or paraphrase. Avoid mentioning health details; never imply patient identity. When in doubt, paraphrase: “a recent review mentioned wait time and follow-up.”

---
## 3) Cold Email Sequences (3-step) — Direct to Local Businesses
### Universal footer (use in all emails)
- Link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Reply-to: agent_bob_replit+review-bot@agentmail.to

### 3.1 Dentist — Not Responding (Priority A/B)
**Subject options:**
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a response gap on your reviews
3) Can I draft replies for you (you approve)?

**Email 1 (Day 1):**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews in {{city}}. A recent one mentioned “{{recent_review_snippet}}” — but it looks like many reviews don’t get a reply ({{response_gap_fact}}).

We run a simple review-reply autopilot for local practices: we draft brand-safe responses to new Google/Yelp reviews within 12 hours, flag negatives for escalation, and send a weekly KPI recap. You can approve replies before anything posts.

Would you like me to send 3 draft responses for your most recent reviews (free) so you can see the tone?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (Day 3):**
Hi {{first_name}},

Quick nudge—review responses are one of the few “marketing” tasks that directly improves conversion from Maps.

If you reply with the best email for whoever handles Google reviews at {{business_name}}, I’ll send:
- 3 draft replies (1 positive, 1 neutral, 1 negative)
- a quick note on response gaps I saw

– Bob

**Follow-up 2 (Day 7):**
{{first_name}}, should I close this out?

If you want, I can just draft replies for the last 5 reviews and you can decide if it’s worth continuing. No setup cost this week.

– Bob

### 3.2 Dentist — Low Rating (Priority A/B)
**Subject options:**
1) Quick reputation recovery for {{business_name}}
2) A few 1-star reviews—can we help?
3) 12-hour response SLA for new reviews

**Email 1:**
Hi {{first_name}},

I noticed {{business_name}}’s Google rating is around {{google_rating}}. A recent review mentioned “{{recent_review_snippet}}.” When negatives sit unanswered, prospects assume the worst.

We help by drafting calm, brand-safe responses fast (12 hours), escalating negative reviews into an internal “action list,” and reporting weekly KPIs so you can see progress. You approve replies before posting.

Want me to draft responses for your 2 most recent negative reviews (free) so you can review tone and approach?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
If you’d rather not change your workflow, we can do “approve-only”: we email drafts, you paste them. Takes 2 minutes/day.

Open to a 10-min call this week?

**Follow-up 2:**
Last try—if you reply “draft,” I’ll send sample replies for the last 3 reviews (with a consistent voice) and you can decide from there.

### 3.3 Dentist — High Volume (Priority A/C)
**Subject options:**
1) Keeping up with review volume at {{business_name}}
2) Consistent replies without adding staff time
3) Weekly reputation KPIs (Google + Yelp)

**Email 1:**
Hi {{first_name}},

Looks like {{business_name}} gets steady Google review volume (last review: {{last_review_date}}). Most teams can’t keep up without sounding copy/paste.

We draft on-brand replies for every new review (Google/Yelp), escalate negatives, and send a weekly KPI report. You can approve before posting.

Want a free “reply pack” for your last 5 reviews so you can see if it matches your voice?

– Bob

---
## 4) Med Spa — Segment Variants (swap language)
**Med spa positioning notes:** focus on trust, safety, consistency, and “service recovery.” Avoid clinical claims.

### Med Spa — Not Responding
Subject: Quick fix for {{business_name}}’s reviews

Hi {{first_name}},

I saw a recent Google review for {{business_name}} mentioning “{{recent_review_snippet}}.” It also looks like many reviews don’t receive a response ({{response_gap_fact}}).

We draft brand-safe replies within 12 hours for Google/Yelp, flag negative reviews for escalation, and send a weekly KPI summary. You approve before anything posts.

Want me to draft 3 replies for recent reviews (free) so you can check tone?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Med Spa — Low Rating
Subject: Reputation recovery for {{business_name}}

Hi {{first_name}},

Noticed your Google rating is ~{{google_rating}} and a recent review mentioned “{{recent_review_snippet}}.” Fast, calm responses can prevent churn and protect bookings.

We draft replies (you approve), escalate negatives, and track weekly KPIs.

If you send the link to your GBP, I’ll draft replies to your 2 newest negative reviews (free).

– Bob

### Med Spa — High Volume
Subject: Keep up with reviews without sounding canned

Hi {{first_name}},

{{business_name}} has strong review volume. We help teams respond consistently without copy/paste by drafting on-brand replies for every new review (Google/Yelp), with escalation + weekly KPIs.

Want a free reply pack for your last 5 reviews?

– Bob

---
## 5) HVAC/Plumbing — Segment Variants
**Home services positioning notes:** emphasize response time, reliability, “we take issues seriously,” and scheduling friction.

### Home Services — Not Responding
Subject: Response gap on {{business_name}}’s reviews

Hi {{first_name}},

Saw a recent Google review for {{business_name}} mentioning “{{recent_review_snippet}}.” It looks like a lot of reviews don’t get a response ({{response_gap_fact}}).

We draft fast, professional replies within 12 hours (Google/Yelp), escalate negatives so you can follow up, and send a weekly KPI report. You approve drafts before anything posts.

Want me to draft 3 replies for recent reviews (free)?

– Bob

### Home Services — Low Rating
Subject: Quick fix for low-star reviews

Hi {{first_name}},

Noticed {{business_name}} is around {{google_rating}} on Google and a recent review mentioned “{{recent_review_snippet}}.” Unanswered negatives can cost booked calls.

We draft calm responses fast + escalate issues to your team. You approve everything.

If you reply with your GBP link, I’ll draft responses for your 2 most recent negative reviews (free).

– Bob

### Home Services — High Volume
Subject: Helping you keep up with review volume

Hi {{first_name}},

You’re getting steady review volume (last review: {{last_review_date}}). We keep responses consistent by drafting on-brand replies for every review, escalating negatives, and reporting weekly KPIs.

Want a free reply pack for your last 5 reviews?

– Bob

---
## 6) Agency / Reseller Lane (initial email)
**Target agencies:** local SEO, PPC for dentists/med spas/home services, reputation management shops.

**Subject options:**
1) White-label review responses for your clients
2) Add a reputation deliverable in 7 days
3) Quick win for GBP conversion

Hi {{first_name}},

If you manage Google Business Profiles for local clients: we offer a white-label “review reply autopilot” that drafts brand-safe responses for Google/Yelp, escalates negatives, and produces a weekly KPI summary.

It’s easy to bundle as a retention deliverable—your team can approve everything before posting. Details + sample workflow:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want me to generate a free sample reply pack for one of your clients so you can see quality and turnaround?

– Bob
agent_bob_replit+review-bot@agentmail.to

---
## 7) Daily Sending Ops (Zero-cost stack) + 14-day ramp
**Tooling (free-first):**
- Sending: Gmail/Google Workspace trial if available; otherwise existing mailbox. (No spend week 1.)
- Tracking: avoid link tracking initially (deliverability). Track manually in Sheets/CRM.
- CRM: Google Sheets pipeline or free HubSpot.

**Compliance & deliverability rules:**
- Plain text emails; no attachments; 1 link max (use the website link above).
- Keep daily sends low at first; no mass blasting; personalize first line.
- Hard bounce threshold: stop list/source if >3% hard bounces.
- Complaint/unsubscribe: immediate suppression.

**14-day ramp (per inbox):**
- Days 1–2: 15/day
- Days 3–4: 25/day
- Days 5–6: 35/day
- Days 7–8: 45/day
- Days 9–10: 60/day
- Days 11–14: 75/day (only if bounces <3% and replies healthy)

**Daily activity targets (operator checklist):**
1) Build/QA 25–50 new leads (or enrich/segment)
2) Send new emails (per ramp cap)
3) Follow-ups due today (aim 30–50% of new volume)
4) Handle replies within 4 business hours
5) Book demos/trials (goal: 1–3/week early)

**Reply handling SLA:**
- Interested → propose 10-min call + ask for GBP/Yelp links
- Not now → set reminder for 30–60 days
- Wrong person → ask for correct contact
- Negative reply → polite close + suppress

---
## 8) CRM Stages (simple + strict entry/exit)
1) **Prospect (Unsent)**: record complete enough to personalize
2) **Sent (Step 1)**: initial sent
3) **Follow-up 1 Sent**
4) **Follow-up 2 Sent**
5) **Replied – Interested**: asked a question, wants info
6) **Qualified**: has GBP/Yelp + volume + decision-maker confirmed
7) **Demo Booked**
8) **Trial – Active (Free Week 1)**
9) **Converted (post-week 1)**
10) **Lost / No Fit**

**Qualification questions (email-friendly):**
- Who currently responds to reviews?
- Do you want approve-before-posting or we post directly?
- Any brand voice guidelines?
- Priority: speed, rating recovery, or consistency?

---
## 9) Lead List Build Notes (to reach 500–1,000 with zero spend)
- Use Google Maps searches by metro + vertical keyword (e.g., “dentist Miami FL”, “med spa Scottsdale AZ”, “HVAC repair Charlotte NC”, “plumber Austin TX”).
- Collect: rating, review count, last review date, last 10 response count, website, phone.
- Find emails: website contact page, “team” page (practice manager), or general inbox (info@). Keep 1–2 emails per lead.
- Segment + priority assign immediately to build daily send queues (A first).

This kit is ready for immediate use once geography is selected and the first lead batch is compiled into CSV/Sheets.