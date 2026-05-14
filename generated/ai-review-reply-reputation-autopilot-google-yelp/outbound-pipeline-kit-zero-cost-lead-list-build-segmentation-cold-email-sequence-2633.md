# Outbound Pipeline Kit (Zero-Cost): Lead List Build + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T05:42:17.846Z

---

## 1) ICP + Verticals (focus)
**Core offer:** AI Review Reply & Reputation Autopilot for Google Business Profile + Yelp. Drafts brand-safe replies, escalates negative reviews, posts quickly, and sends weekly KPI reporting.
**Proof/legitimacy link (use in outreach):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Primary contact email:** agent_bob_replit+review-bot@agentmail.to

**Verticals (high review velocity + meaningful LTV):**
1) Dentists / Dental clinics
2) Med spas / Aesthetic clinics
3) HVAC + Plumbers (home services)

**Why these work:** they’re highly local, reviews directly affect conversion, and many owners stop responding when busy.

---

## 2) Segments + Priority Routing (operational)
Capture for every prospect: rating, review_count, last_review_date, and a **response-rate proxy**.

### Segments
- **Not Responding:** response_rate_proxy ≤ 20% OR 0 owner responses in last 10 reviews
- **Low Rating:** google_rating < 4.2
- **High Volume:** review_count ≥ 200 OR last_review_date ≤ 14 days

### Priority Score (use to decide who gets emailed first)
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

### Message angle mapping
- Not Responding → “response gap / speed / consistency / brand-safe”
- Low Rating → “escalation workflow / win-backs / fast owner visibility” (avoid sounding accusatory)
- High Volume → “throughput / time saved / 12-hour SLA”

---

## 3) Lead List CSV Template (copy/paste headers)
Use this exact header row:

business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,personalization_snippet,notes

### Data dictionary (quick)
- **last_review_date:** date of most recent Google review shown
- **response_rate_proxy_last10:** (# of owner responses among last 10 reviews) / 10
- **personalization_snippet:** 10–25 words from the most recent review OR a paraphrase (safer) like “A customer mentioned fast scheduling + friendly staff.”

---

## 4) Zero-Cost Lead Sourcing Workflow (Google Maps → Sheets)
Goal: 500–1,000 leads without paid scrapers.

### Step A — Pick geography (recommended)
Choose either:
- **Top 25 US metros** (fastest volume + higher LTV), or
- **5–10 target states** (if you want tighter operations and better deliverability)

### Step B — Google Maps query pack (examples)
Run each query in Google Maps; open profiles that match; capture fields into the sheet.

**Dentists:**
- “dentist in Austin TX”
- “cosmetic dentist in Miami FL”
- “family dentistry in Phoenix AZ”

**Med spas:**
- “med spa in Dallas TX”
- “aesthetic clinic in Los Angeles CA”
- “botox in Chicago IL”

**HVAC / Plumbing:**
- “HVAC company in Atlanta GA”
- “air conditioning repair in Tampa FL”
- “plumber in Denver CO”

### Step C — Capture review responsiveness quickly
Open the Google reviews panel → scan last ~10 reviews → count owner replies.
- If you see 0–2 replies → response_rate_proxy likely ≤ 20% → mark **Not Responding**
- Capture **last_review_date** from the topmost review

### Step D — Find emails (free)
Prioritize website contact page first.
- Website → Contact page / footer email
- If missing: LinkedIn company page or “About” page
- If still missing: use a role email guess (info@, hello@, office@) ONLY if the domain is verified from website

### Step E — QA rules (to avoid junk)
- Exclude franchises with corporate-only contact (unless you can reach the local manager)
- Exclude businesses with no website and no email (unless phone outreach is planned)
- Ensure category matches vertical (not “dental lab”, not “beauty salon” unless clearly med spa)

Production targets (manual):
- 25–40 solid leads/hour after you get rhythm
- Build first 200 leads to validate, then scale to 500–1,000

---

## 5) Cold Email Sequences (3-step) — Local Businesses
All templates include personalization tokens:
- {{first_name}} (optional)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (quote or paraphrase)
- {{response_gap}} (e.g., “I didn’t see an owner reply on the last few reviews.”)

### 5.1 Email #1 (Not Responding angle)
**Subject options:**
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed a review reply gap at {{business_name}}
3) 12-hour review responses (you approve)

**Body:**
Hi {{first_name}} — Bob here.

I was looking at {{business_name}}’s Google reviews in {{city}} and saw: “{{recent_review_snippet}}”. {{response_gap}}

We run a small **AI Review Reply & Reputation Autopilot** that drafts brand-safe responses for Google + Yelp and gets them posted fast. You can **approve/edit** everything, and we escalate negatives so they don’t sit unanswered.

Offer: **free setup + 7-day trial**. We’ll respond to new reviews within **12 hours** and send a weekly KPI snapshot.

Want me to send 2–3 draft replies for your most recent reviews to show how it would sound? 

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

### 5.2 Email #1 variant (Low Rating angle; softer)
**Subject options:**
1) Helping {{business_name}} protect bookings from reviews
2) Quick win on review responses (Google + Yelp)
3) A simple escalation workflow for reviews

**Body:**
Hi {{first_name}} — Bob here.

I saw a recent review for {{business_name}} mentioning “{{recent_review_snippet}}”. When reviews come in quickly, it’s hard to respond consistently—especially to the tough ones.

We built an **AI Review Reply & Reputation Autopilot**: brand-safe drafts, escalation of negative reviews to the owner/manager, and weekly KPI reporting. You stay in control (approve/edit), but the work gets done.

If you want, I can draft responses for your latest 3 Google reviews (free) so you can compare tone and speed.

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to trying it for 7 days?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 5.3 Email #1 variant (High Volume angle)
**Subject options:**
1) Too many reviews to keep up with?
2) Review replies for {{business_name}} (12-hour SLA)
3) We handle Google + Yelp replies (you approve)

**Body:**
Hi {{first_name}} — Bob.

{{business_name}} gets a lot of review activity. I saw “{{recent_review_snippet}}” and noticed it’s tough to respond to every review quickly and consistently.

We run an **AI Review Reply & Reputation Autopilot** that drafts replies for Google + Yelp, routes negatives for escalation, and sends weekly KPIs. You can approve everything, but we remove the daily workload.

Can I send a few draft replies for your most recent reviews to show the tone?

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

### 5.4 Follow-up #1 (2 days later)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}} — quick follow-up.

If I draft replies for 3 recent Google reviews at {{business_name}} (free), would you prefer:
A) friendly/short, or
B) warmer + more detailed?

Either way, you approve before anything posts.

— Bob
agent_bob_replit+review-bot@agentmail.to

### 5.5 Follow-up #2 (5–7 days later)
**Subject:** Should I close the loop?

Hi {{first_name}} — last note.

If review responses aren’t a priority right now, no worries. If they are, we can run a **7-day free trial**: replies within 12 hours, negative review escalation, and weekly KPI report.

Worth testing on Google only first (no Yelp) to keep it simple?

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 6) Agency/Reseller Lane (higher leverage)
Target: local marketing agencies managing GBP/SEO/PPC for dentists, med spas, home services.

### Agency Email #1
**Subject options:**
1) Add-on for your local clients: review replies in 12 hours
2) White-label review response autopilot
3) Quick partnership idea (Google + Yelp)

**Body:**
Hi {{first_name}} — Bob here.

Quick idea for your local clients: we run an **AI Review Reply & Reputation Autopilot** for Google + Yelp—brand-safe drafts, negative escalation, weekly KPIs. Agencies use it to boost responsiveness without adding headcount.

We can run it white-label (or co-branded) and your team can approve/edit before posting.

Want to pilot it free for 7 days on 1–2 client accounts?

Proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 7) Daily Sending Ops (Week 1, $0)
### Targets
- Day 1–2: 20–30 new emails/day
- Day 3–4: 40–60/day
- Day 5–7: 80–100/day (only if bounce rate < 3%)
- Follow-ups daily: 1 follow-up for every 1 new email once pipeline builds

### List hygiene + thresholds
- Bounce rate target: < 3% (pause list source if > 5%)
- Complaints: any spike → slow down and tighten targeting
- Avoid spammy words; keep emails short; 1–2 links max (use proof page only)

### Reply handling SLA
- Reply within 2 hours during business day
- If negative reply: apologize + offer to stop + ask best contact (keep compliant)

---

## 8) CRM Stages (simple + measurable)
Use Google Sheets columns: stage, last_touch_date, next_step, notes.
Stages:
1) Prospect (not yet emailed)
2) Sent (Email #1)
3) Engaged (reply or clear interest)
4) Qualified (has GBP/Yelp + review activity + decision-maker)
5) Demo Booked
6) Trial Started (7 days free)
7) Converted (post-trial paid)
8) Lost (no fit / no response after sequence)

Entry/exit rules:
- Sent → Engaged when any reply arrives
- Engaged → Qualified once you confirm they manage GBP/Yelp and you have right contact
- Trial Started requires access method agreed (they forward reviews, or you integrate later)

---

## 9) What to do next (execution order)
1) Choose geography (top metros or states)
2) Build first 200 leads and run QA (category match, email present, segment tags)
3) Start sending to Priority A first using the matching segment variant
4) Track replies + book demos; iterate subject lines weekly

This kit is designed so you can start outreach immediately on $0 spend and tighten targeting as replies come in.