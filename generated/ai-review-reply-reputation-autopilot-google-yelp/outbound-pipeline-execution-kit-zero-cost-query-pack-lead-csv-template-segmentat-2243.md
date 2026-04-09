# Outbound Pipeline Execution Kit (Zero-Cost): Query Pack + Lead CSV Template/Segmentation + Cold Email (3-step) + Daily Sending Ops/CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T20:24:47.772Z

---

## 1) Scope (so we can move fast with $0)
**Initial geography (15 metros):** New York NY, Los Angeles CA, Chicago IL, Houston TX, Phoenix AZ, Philadelphia PA, San Antonio TX, San Diego CA, Dallas TX, San Jose CA, Austin TX, Jacksonville FL, San Francisco CA, Columbus OH, Charlotte NC.

**Verticals:**
1) Dental practices (dentist, cosmetic dentist, dental clinic)
2) Med spas / aesthetics (medical spa, med spa, aesthetics clinic, botox clinic)
3) Home services (HVAC contractor, plumber)

**Goal:** pull **600–1,200 raw prospects**, then QA/filter down to **500–1,000 sendable**.

---
## 2) Google Maps Query Pack (copy/paste)
For each metro above, run these searches in Google Maps:

### Dentists
- “dentist in {CITY}”
- “cosmetic dentist in {CITY}”
- “dental clinic in {CITY}”

### Med spas
- “medical spa in {CITY}”
- “med spa in {CITY}”
- “aesthetics clinic in {CITY}”
- “botox clinic in {CITY}”

### HVAC / Plumbing
- “HVAC contractor in {CITY}”
- “air conditioning repair in {CITY}”
- “plumber in {CITY}”

### Agency lane (parallel list)
- “digital marketing agency dental in {CITY}”
- “medical spa marketing agency in {CITY}”
- “HVAC marketing agency in {CITY}”
- “local SEO agency in {CITY}”

**Quick QA while searching:** skip hospitals/universities; skip mega-franchises unless independently owned; prefer businesses with **active review velocity** (last review in last 30 days).

---
## 3) Lead List CSV Template (headers)
Create a Google Sheet with these exact columns (Row 1):

business_name, vertical, city, state, metro, website, phone, google_maps_url, google_rating, review_count, last_review_date, last_review_excerpt, owner_response_in_last_10 (0-10), response_rate_proxy, segment, priority, contact_name, contact_role, email_1, email_2, notes

### How to fill key fields (zero-cost)
- **google_rating / review_count / last_review_date:** from the Google Business Profile panel.
- **last_review_excerpt:** copy 8–20 words from the most recent review *or paraphrase* (preferred) to avoid quoting anything sensitive.
- **owner_response_in_last_10 (0–10):** open reviews → skim last 10 → count how many have an owner response.
- **website:** from the “Website” link in GBP; if missing, mark blank and deprioritize.
- **emails:** pull from the website Contact page, footer, or About. Use role inboxes if needed (info@, hello@, office@, support@). If no email, leave blank and deprioritize (or use contact form separately).

### Sheets formulas
Assuming:
- Column I = google_rating
- Column J = review_count
- Column K = last_review_date
- Column M = owner_response_in_last_10

**response_rate_proxy (Column N):**
=IFERROR(M2/10, "")

**segment (Column O):**
=IFS(
  AND(I2<4.2, J2>=200), "low_rating+high_volume",
  I2<4.2, "low_rating",
  AND(N2<=0.2, J2>=200), "not_responding+high_volume",
  N2<=0.2, "not_responding",
  OR(J2>=200, TODAY()-K2<=14), "high_volume",
  TRUE, "baseline"
)

**priority (Column P):**
=IFS(
  OR(O2="not_responding+high_volume", O2="low_rating+high_volume"), "A",
  OR(O2="not_responding", O2="low_rating"), "B",
  O2="high_volume", "C",
  TRUE, "D"
)

**Send order:** Priority A → B → C. D only if you need volume.

---
## 4) Cold Email Sequence (3-step) — uses review + response gap
**Legitimacy/footer to include in every email:**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
- Reply-to/contact: agent_bob_replit+review-bot@agentmail.to

### Personalization tokens
- {{BusinessName}}
- {{City}}
- {{Vertical}} (dentist / med spa / HVAC / plumbing)
- {{RecentReview}} (paraphrased snippet)
- {{ResponseGap}} (e.g., “looks like a few recent reviews didn’t get a response”)
- {{Rating}} and {{ReviewCount}} (optional)

### Email 1 (Initial) — variant by segment
**Subject options (pick 1):**
1) Quick question about {{BusinessName}} reviews
2) Noticed your recent Google reviews
3) {{BusinessName}}: review replies (12-hour turnaround)

**Body (base):**
Hi {{FirstNameOrTeam}},

I was looking at {{BusinessName}} on Google and saw a recent review mentioning “{{RecentReview}}”. {{ResponseGap}}.

We built a simple **AI Review Reply & Reputation Autopilot** that drafts brand-safe replies to Google/Yelp reviews, escalates negative ones, and sends weekly reputation KPIs. You can **approve replies before anything posts**, and we aim to respond within **12 hours**.

We’re offering it **free for 7 days** to a small number of local businesses.

Worth a quick 10 minutes to see if it would save you time and protect ratings?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Segment add-ons (insert after paragraph 1):**
- **Not responding:** “Totally get it—review replies fall to the bottom of the list. The main thing we help with is consistent, fast replies so prospects see you’re responsive.”
- **Low rating:** “If any reviews are unhappy, we can route them for escalation first and keep replies calm/brand-safe (no arguments, no PHI, no oversharing).”
- **High volume:** “If you’re getting frequent reviews, we can keep up with volume and ensure nothing sits unanswered for weeks.”

### Email 2 (Follow-up #1 — 2–3 business days later)
**Subject:** Re: {{BusinessName}} reviews

Hi {{FirstNameOrTeam}},

Just bumping this—if you want, I can send **2 sample replies** (in your tone) for two of your recent reviews so you can see the quality.

If it looks good, we can run the **7-day free trial** and you approve everything before it posts.

Should I send the samples? If yes, Google or Yelp first?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### Email 3 (Follow-up #2 — 5–7 business days later)
**Subject:** Close the loop?

Hi {{FirstNameOrTeam}},

Last note from me. If review replies aren’t a priority right now, no worries.

If they are, we can:
- draft replies within 12 hours
- escalate negative reviews
- send weekly KPIs (rating trend, response rate, avg response time)
- keep everything brand-safe with approval

Want me to set up the free 7-day trial for {{BusinessName}}?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---
## 5) Daily Sending Ops (free-first)
### CRM stages (simple spreadsheet works)
Prospect → Ready to Send → Sent → Replied → Qualified → Demo Booked → Trial (7 days free) → Closed Won → Closed Lost

### 14-day ramp (single inbox, conservative)
- Days 1–2: 10/day (new contacts only)
- Days 3–4: 20/day
- Days 5–7: 30/day
- Week 2: 40–60/day (only if bounces <3% and replies are normal)

If using 2 inboxes, split volume evenly.

### List QA rules (before sending)
- Must have: business_name, website or verifiable contact channel, city/state, google_maps_url
- Prefer: last_review_date ≤ 30 days; review_count ≥ 50
- Skip: no website + no email + franchise directory-only listings
- Bounce target: **<3%**; if >5%, stop and clean list

### Reply handling SLA
- Any positive reply: respond within **2 hours** during business day
- Any negative reply/unsubscribe: confirm removal same day

### Daily activity targets (starting point)
- Build/QA: 30–50 new leads/day
- Send: per ramp (10→60/day)
- Follow-ups: 1–2 follow-ups per new send (automate in your email client if possible)

---
## 6) What you do next (today)
1) Pick 2 metros + 1 vertical and collect the first **50 leads** using the template.
2) Prioritize **A then B** segments.
3) Send Email #1 manually (copy/paste) to start; track replies in the CRM sheet.
4) Once you have 200 leads compiled, we batch them into A/B/C campaigns and tighten the pitch based on real replies.
