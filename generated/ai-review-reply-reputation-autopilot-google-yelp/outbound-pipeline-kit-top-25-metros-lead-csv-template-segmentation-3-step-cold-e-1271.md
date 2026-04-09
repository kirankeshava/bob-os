# Outbound Pipeline Kit (Top-25 Metros): Lead CSV Template + Segmentation, 3-Step Cold Email (Segmented), Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:53:23.846Z

---

## 1) Default geography for first 500–1,000 leads
**Recommendation:** Top 25 US metros. Why: highest density of multi-provider practices and higher review velocity; less “dead” rural listings; easier to keep list quality high.

**Top 25 metros to use for queries (copy/paste):**
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Detroit MI; Nashville TN; Portland OR.

Vertical queries per metro (Google Maps search strings):
- **Dentist:** “dentist”, “dental clinic”, “cosmetic dentist”, “family dentist”
- **Med spa:** “med spa”, “aesthetic clinic”, “botox”, “laser hair removal”
- **HVAC/Plumbing:** “hvac contractor”, “air conditioning repair”, “plumber”, “drain cleaning”

## 2) Lead list CSV template (headers + formulas)
Create a Google Sheet with these columns (Row 1 headers). Export as CSV.

**Required columns:**
A business_name
B vertical (dentist | med_spa | hvac_plumbing | agency)
C city
D state
E metro
F website
G phone
H google_maps_url
I google_rating
J review_count
K last_review_date
L last_review_snippet (1–2 sentences max; or paraphrase)
M response_rate_proxy_last10 (0–1) = (# owner/management responses in last 10 reviews)/10
N segment (not_responding | low_rating | high_volume | combo)
O priority (A | B | C)
P owner_or_manager_name (if found)
Q role_guess (Owner | Practice Manager | Office Manager | GM | Marketing)
R email_1
S email_2
T contact_source (website | facebook | linkedin | directory)
U notes

**Segmentation rules (paste into N2 and fill down):**
IF(AND(I2<4.2, J2>=200),"combo_low_rating_high_volume",
 IF(AND(M2<=0.2, J2>=200),"combo_not_responding_high_volume",
  IF(I2<4.2,"low_rating",
   IF(M2<=0.2,"not_responding",
    IF(OR(J2>=200, K2>=TODAY()-14),"high_volume","other")))))

**Priority scoring (paste into O2 and fill down):**
IF(OR(N2="combo_low_rating_high_volume",N2="combo_not_responding_high_volume"),"A",
 IF(OR(N2="low_rating",N2="not_responding"),"B",
  IF(N2="high_volume","C","C")))

**How to compute response_rate_proxy_last10 (M):** open the Google reviews panel → scan the most recent ~10 reviews → count how many have an owner response. If 1/10 responded, enter 0.1.

## 3) Segmented cold email sequences (references included)
Use these tokens:
- {{first_name}} (if unknown, use “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}} (or paraphrase)
- {{response_gap}} (e.g., “looks like a few recent reviews haven’t gotten a reply”)
- {{vertical_specific}} (dentistry/aesthetics/HVAC)

Always include legitimacy references:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Contact: agent_bob_replit+review-bot@agentmail.to

### 3.1 Initial email (choose ONE variant by segment)

#### Variant A — NOT RESPONDING (works for any vertical)
**Subject options:**
1) Quick fix for your Google reviews at {{business_name}}
2) Replying to reviews (12-hour turnaround)
3) {{business_name}} reviews — response gap

**Body:**
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}}.

We run an **AI Review Reply & Reputation Autopilot** that drafts (and can post) **brand-safe** responses to Google Business Profile + Yelp reviews. You can set an approval workflow so nothing goes live unless you approve.

What you get:
- Responses drafted within **12 hours** (new reviews)
- Negative reviews escalated immediately (so you can recover issues fast)
- Weekly KPI email: rating trend, review velocity, response rate

If you want to sanity-check us first, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute call this week? If you reply with “yes”, I’ll send 2 times.

— Bob
agent_bob_replit+review-bot@agentmail.to

#### Variant B — LOW RATING (recovery + escalation)
**Subject options:**
1) Quick reputation recovery plan for {{business_name}}
2) Turning negative reviews into wins
3) {{business_name}} rating — quick help

**Body:**
Hi {{first_name}} — I saw a recent review mentioning: “{{recent_review_snippet}}”.

When ratings dip (or negative reviews cluster), **fast, professional responses** can materially change call volume and bookings. We help by drafting consistent, brand-safe replies on Google + Yelp and escalating negatives immediately so you can resolve issues before they spread.

Workflow is simple:
1) We draft replies in your tone (HIPAA-safe / policy-safe language)
2) You approve (or auto-approve positives)
3) You get a weekly KPI report and an “at-risk” list

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want me to draft 3 example replies for {{business_name}} (free) so you can see the quality? Just reply “draft 3”.

— Bob
agent_bob_replit+review-bot@agentmail.to

#### Variant C — HIGH VOLUME (ops + throughput)
**Subject options:**
1) Keeping up with review volume at {{business_name}}
2) Automated review responses (with approval)
3) Review throughput in {{city}}

**Body:**
Hi {{first_name}} — noticed {{business_name}} gets steady review volume.

Most teams fall behind because replying is repetitive and time-consuming. Our **AI Review Reply & Reputation Autopilot** drafts replies in your brand voice for Google + Yelp, routes negative reviews for fast escalation, and reports weekly KPIs.

Common setup:
- Auto-approve 5-star reviews
- Manual approve anything <4 stars
- Escalate “refund / rude staff / no-show / billing” keywords to a manager

If I send a 60-second overview + 2 sample replies tailored to {{business_name}}, would you take a look?

— Bob
agent_bob_replit+review-bot@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

### 3.2 Follow-up #1 (2 days later)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}} — quick nudge.

If it helps, I can draft replies to your 3 most recent reviews (including any negative) in your preferred tone, and you can decide if it’s worth automating.

Should I do that for {{business_name}}?

— Bob
agent_bob_replit+review-bot@agentmail.to

### 3.3 Follow-up #2 (5–7 days later)
**Subject:** Close the loop?

Hi {{first_name}} — last note from me.

If review replies aren’t a priority right now, no worries. If they are, we typically improve response rate within 7–10 days by making it “approve-in-2-minutes” instead of “write-from-scratch”.

Reply with either:
1) “send samples” (I’ll send 2–3 drafted replies)
2) “later” (and I’ll check back next quarter)

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

## 4) Agency/reseller initial email (parallel lane)
**Subject options:**
1) Add review response automation to your retainers
2) White-label reputation autopilot for local clients
3) Quick partnership?

Hi {{first_name}} — I’m reaching out because you work with {{vertical}} clients.

We offer an **AI Review Reply & Reputation Autopilot** for Google + Yelp: drafts brand-safe replies, escalates negatives, and sends weekly KPI reporting. It’s easy to white-label or bundle into an existing reputation/SEO retainer.

If you want, I can:
- Provide a client-facing one-pager
- Set up an approval workflow per client (you or the client approves)
- Offer partner pricing for multiple locations

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Open to a 15-minute partner call?

— Bob
agent_bob_replit+review-bot@agentmail.to

## 5) Daily sending ops + 14-day ramp (no paid tools assumed)
**CRM stages:**
Prospect (not contacted) → Sent → Replied → Qualified → Demo booked → Trial/pilot → Paid → Lost/No fit.

**Daily targets (solo operator):**
- New prospects added to sheet: 25–50/day
- Emails sent (new): start 20/day and ramp to 80–100/day
- Follow-ups: 1:1 ratio with new sends once volume grows
- Same-day reply SLA: within 2 hours during business day

**14-day ramp (per inbox):**
Days 1–2: 20/day
Days 3–4: 30/day
Days 5–7: 40/day
Days 8–10: 60/day
Days 11–14: 80/day
(If using multiple inboxes later, split volume evenly.)

**QA rules before sending:**
- Business category matches vertical (no “training school” disguised as dentist, etc.)
- Rating/review count captured; last review date within last 90 days preferred
- No obvious franchises with corporate review teams (unless multi-location deal)
- Website present OR Facebook page present (needed for email discovery)

**Compliance + safety:**
- Use review snippets carefully: prefer paraphrase; do not include patient-identifying info (healthcare). Avoid making claims.
- Include a simple opt-out line if you add an email footer (“Reply ‘opt out’ and I won’t email again.”)

**Reply handling:**
- Interested → propose 2 meeting times + ask which platforms (Google only vs Google+Yelp) and whether they want approval workflow.
- Not now → set follow-up in 60–90 days.
- Objection: “we already respond” → offer KPI reporting + negative escalation + consistency/coverage.

## 6) Production plan to reach 500–1,000 leads (zero-cost)
Assuming 1 person, 2–3 hours/day:
- Day 1–2: build 100–150 leads (Priority A/B first)
- Day 3–5: build additional 250–400 leads
- Day 6–10: build remaining to 500–1,000 while outbound is running

Start sending as soon as first 50–100 leads are ready; don’t wait for 1,000.
