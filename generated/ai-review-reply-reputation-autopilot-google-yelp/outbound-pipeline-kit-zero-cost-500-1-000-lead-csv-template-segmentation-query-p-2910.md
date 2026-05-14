# Outbound Pipeline Kit (Zero-Cost): 500–1,000 Lead CSV Template + Segmentation, Query Pack, Cold Email Sequences, Daily Ops + CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T06:38:11.997Z

---

## 1) Lead List CSV Template (copy/paste headers)
Use this header row exactly in a CSV/Google Sheet. Each row = 1 location.

business_name,vertical,subvertical,city,state,zip,website,phone,google_maps_url,google_place_id(optional),google_rating,review_count,last_review_date,last_review_snippet,owner_response_present_in_last_review(Y/N),responses_in_last_10_reviews(#),response_rate_proxy(%),segment_primary(not_responding|low_rating|high_volume|mixed),priority(A|B|C),owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes,source_query

### Data validation (dropdowns)
- vertical: Dental | Med Spa | Home Services
- segment_primary: not_responding | low_rating | high_volume | mixed
- priority: A | B | C

### Segmentation rules (Google Sheets formulas)
Assume:
- Rating in column K, Review Count in column L, Last Review Date in column M, Responses in last 10 in column Q.
- Put these formulas in the appropriate columns and copy down.

**Response rate proxy (column R):**
=IF(Q2="","",ROUND((Q2/10)*100,0))

**Segment (column S):**
=IF(OR(R2<=20,R2=""),"not_responding",
 IF(K2<4.2,"low_rating",
 IF(OR(L2>=200, TODAY()-M2<=14),"high_volume","")))

**Priority (column T):**
=IF(OR(AND(S2="not_responding",OR(L2>=200,TODAY()-M2<=14)),AND(S2="low_rating",OR(L2>=200,TODAY()-M2<=14))),"A",
 IF(OR(S2="not_responding",S2="low_rating"),"B",
 IF(S2="high_volume","C","C")))

### QA sampling rules (do daily)
- Check 10% of rows for: correct category, correct city/state, valid website, rating/review_count not blank, last_review_date within last 12 months.
- Remove: franchises with corporate-only contact forms (unless you can find the local GM), businesses with no website (optional), and categories that don’t match the vertical.

---

## 2) Prospecting Plan (verticals + who/why + segment routing)
### Default geo scope (recommended): Top 25 US metros
Reason: higher review velocity, higher LTV, better owner sophistication, faster reply rates.

### Verticals (initial 30 days)
1) **Dental practices** (general, cosmetic, implant, orthodontics)
- Why: high LTV per patient, strong correlation between ratings/responsiveness and bookings.
- Best segments: Not Responding + High Volume (Priority A), Low Rating + High Volume (Priority A).

2) **Med spas / aesthetics** (Botox, filler, laser, body contouring)
- Why: extremely review-driven, frequent new reviews, strong social proof effect.
- Best segments: High Volume (Priority A/C), Low Rating (Priority A/B).

3) **HVAC + Plumbing (home services)**
- Why: high inbound call value, local pack visibility matters, many reviews, owners too busy to respond.
- Best segments: Not Responding (Priority A/B), High Volume (Priority C).

### Segment → angle routing
- **Not Responding:** “response gap” + “we respond within 12 hours, you approve.”
- **Low Rating:** “recovery + escalation workflow” + “turn 1-star situations into retention.”
- **High Volume:** “ops throughput” + “weekly KPI report + consistent brand voice at scale.”

---

## 3) Google Maps Query Pack (copy/paste searches)
Use these with the city appended, e.g., “cosmetic dentist Austin TX”.

### Dental
- cosmetic dentist {city} {state}
- dentist {city} {state}
- dental implants {city} {state}
- orthodontist {city} {state}

### Med Spa
- med spa {city} {state}
- botox {city} {state}
- laser hair removal {city} {state}
- aesthetics clinic {city} {state}

### Home Services
- hvac contractor {city} {state}
- air conditioning repair {city} {state}
- plumber {city} {state}
- emergency plumber {city} {state}

### Agency lane (resellers)
- “dental marketing agency” {state}
- “med spa marketing agency” {state}
- “home services marketing agency” {state}
- “reputation management agency” {state}

---

## 4) Cold Email Sequences (3-step) 
Sender: Bob (agent_bob_replit+review-bot@agentmail.to)
Legitimacy URL to include when needed: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### Personalization tokens
- {{business}} {{city}} {{recent_review_snippet}} {{rating}} {{review_count}} {{last_review_date}} {{response_gap_observation}} {{vertical_specific}}


## 4A) Local Business — NOT RESPONDING variant (Initial + FU1 + FU2)
**Subject options:**
1) Quick win for {{business}} reviews
2) Noticed a response gap on Google
3) 12-hour review replies (you approve)

**Email 1 (Initial):**
Hi {{first_name_or_owner}},

I was looking at {{business}} on Google and saw a recent review: “{{recent_review_snippet}}”. I also noticed {{response_gap_observation}} (it looks like many recent reviews don’t have an owner response).

We built a simple “review reply autopilot” for busy local operators: brand-safe draft replies within 12 hours, negative reviews escalated, and a weekly KPI summary. You can approve everything before it posts.

If helpful, I can do a free 7-day trial: we’ll draft responses for every new Google/Yelp review and send them for approval.

Want me to set that up for {{business}}?

– Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Email 2 (Follow-up 1, 2–3 days later):**
Hi {{first_name_or_owner}},

Still happy to run the free 7-day trial. The main goal is consistency: Google rewards active profiles, and customers notice when feedback gets acknowledged.

If you reply with “yes”, I’ll send a 2-minute onboarding checklist (links + brand voice notes). Or if you prefer, tell me who handles reviews and I’ll reach out to them.

– Bob

**Email 3 (Follow-up 2, 4–7 days later):**
Hi {{first_name_or_owner}},

Last try — should I close the loop? 

If review replies are already handled internally, no worries. If not, I can start by drafting responses to the last 3 Google reviews for {{business}} so you can see the quality (free).

Want that?

– Bob


## 4B) Local Business — LOW RATING variant
**Subject options:**
1) Idea to help lift {{business}}’s rating
2) Quick review recovery workflow
3) Turning negatives into retention

**Email 1:**
Hi {{first_name_or_owner}},

I came across {{business}} while searching for {{vertical_specific}} in {{city}}. I noticed the Google rating is {{rating}} and a recent review said: “{{recent_review_snippet}}”.

We help local businesses respond fast and safely: empathetic replies, escalation of unhappy customers, and a weekly KPI report so you can see what’s improving.

Free 7-day trial: we draft/post (with your approval) and flag anything that needs a personal touch.

Open to trying it for a week?

– Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Follow-up 1:**
If you want, I’ll draft a response to that latest negative review in your brand voice so you can see the approach before you commit to anything.

– Bob

**Follow-up 2:**
Should I send over 2–3 draft replies for your most recent reviews and you can decide from there?

– Bob


## 4C) Local Business — HIGH VOLUME variant
**Subject options:**
1) Handling review volume at {{business}}
2) Keeping up with Google reviews
3) Weekly reputation KPIs

**Email 1:**
Hi {{first_name_or_owner}},

{{business}} has {{review_count}} Google reviews — impressive. With that kind of volume, replying consistently becomes an ops problem.

We run an AI-assisted workflow that drafts brand-safe replies within 12 hours, escalates negatives, and sends a weekly KPI snapshot (new reviews, rating trend, response rate). You approve before anything posts.

Want a free 7-day trial so you can see it working on your live reviews?

– Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Follow-up 1:**
If I send a sample weekly KPI report format (with dummy data), would that help you evaluate quickly?

– Bob

**Follow-up 2:**
Worth a quick 10 minutes to see whether this would save your team time each week?

– Bob


## 4D) Agency/Reseller version (Initial)
**Subject options:**
1) Add “review replies” to your retainer (no extra headcount)
2) White-label review response workflow
3) Reputation ops add-on for your clients

Hi {{first_name}},

I’m Bob — we built an AI-assisted review reply + escalation workflow for Google/Yelp that agencies can resell as a simple add-on: fast brand-safe drafts, negative review escalation, and weekly KPI reporting.

If you manage local clients (dentists/med spas/home services), this usually improves response rate quickly without adding headcount. We can start with a free 7-day trial on one client to prove value.

If you’re open, tell me your niche and I’ll suggest a packaging + delivery model.

– Bob
agent_bob_replit+review-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

---

## 5) Daily Sending Ops Checklist (14-day ramp, $0 tools)
### Free tool stack (week 1)
- Gmail/Workspace you already have (1 inbox to start)
- Google Sheets as CRM + list
- Manual sending (no tracking pixels needed initially)

### 14-day ramp (per inbox)
- Days 1–2: 20/day
- Days 3–4: 30/day
- Days 5–7: 40/day
- Days 8–10: 60/day
- Days 11–14: 80/day
Rules: stop/ramp down if bounce rate > 5% in a day.

### Daily workflow (60–90 minutes)
1) Pull 10–20 new leads into Sheet; assign segment + priority.
2) Personalize first line using {{recent_review_snippet}} + {{response_gap_observation}}.
3) Send today’s batch (mix verticals/segments).
4) Log each send in CRM sheet.
5) Reply handling (same day): if interested, offer “free 7-day trial” and send onboarding checklist.

### Reply-handling SLA
- Positive replies: respond within 2 hours during business day.
- Objections: respond within 12 hours.
- Unsubscribe: confirm immediately and mark “Do Not Contact”.

---

## 6) CRM Pipeline Stages (Google Sheet columns)
Stages:
1) Prospect (in list, not contacted)
2) Sent (Email 1)
3) Follow-up 1 sent
4) Follow-up 2 sent
5) Replied – Interested
6) Replied – Not now
7) Qualified (has Google/Yelp + review volume + decision maker)
8) Demo booked
9) Trial active (free 7-day)
10) Converted (post-week-1 paid later)
11) Lost / Not a fit

Entry/exit criteria:
- Move to Qualified when decision maker identified + they confirm they want help.
- Trial active when they provide GBP/Yelp access method and brand voice notes.

---

## 7) What I need from the owner to start execution
Pick ONE geography scope for the first 500–1,000 leads:
A) Top 25 US metros (recommended) 
B) 5–10 states you want to win 
C) US-wide (slower to segment; more noisy)

Once chosen, the query pack above becomes your production line for building 200 leads in 48 hours, then scaling to 1,000.