# Outbound Pipeline Kit (Zero-Cost): 500–1,000 Lead CSV Template + Top-25 Metro Query Pack + Segmented Cold Emails + Daily Sending Ops + CRM Stages

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:31:42.686Z

---

## 1) Lead list CSV template (paste headers into Google Sheets)
Use this exact header row:

business_name,vertical,service_type,city,state,website,phone,google_maps_url,google_rating,review_count,last_review_date,last_review_excerpt,response_rate_proxy_last10,segment,priority,owner_or_manager_name,role_guess,email_1,email_2,linkedin_url,notes

### Data dictionary (how to fill quickly)
- **vertical**: dentist | med_spa | hvac_plumbing | agency
- **service_type**: e.g., “Cosmetic dentistry”, “Med spa”, “HVAC”, “Plumbing”
- **google_rating / review_count**: from Google Business Profile card
- **last_review_date**: date of most recent Google review
- **last_review_excerpt**: 8–20 word snippet or paraphrase (safer) from most recent review
- **response_rate_proxy_last10**: count of owner replies in the last 10 reviews / 10 (e.g., 0.2)
- **segment** rules:
  - Not Responding = response_rate_proxy_last10 <= 0.2
  - Low Rating = google_rating < 4.2
  - High Volume = review_count >= 200 OR last_review_date within last 14 days
  - If multiple apply, keep the most urgent in **segment** and note others in notes
- **priority** rubric:
  - Priority A: (Not Responding AND High Volume) OR (Low Rating AND High Volume)
  - Priority B: Not Responding OR Low Rating
  - Priority C: High Volume only

### Google Sheets formulas (assuming columns)
- Segment (example logic; adjust to your column letters):
  - =IF(OR(J2>=200, K2>=TODAY()-14), IF(L2<=0.2, "Not Responding", IF(I2<4.2, "Low Rating", "High Volume")), IF(L2<=0.2, "Not Responding", IF(I2<4.2, "Low Rating", "")))
- Priority:
  - =IF(OR(AND(M2="Not Responding", OR(J2>=200, K2>=TODAY()-14)), AND(M2="Low Rating", OR(J2>=200, K2>=TODAY()-14))), "A", IF(OR(M2="Not Responding", M2="Low Rating"), "B", IF(M2="High Volume", "C", "")))

## 2) Top 25 US metro query pack (Google Maps)
Goal: consistent pulls, minimal junk. Search directly in Google Maps for each metro.

### Metros
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; Fort Worth TX; Columbus OH; Charlotte NC; San Francisco CA; Indianapolis IN; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

### Dentist queries (run per metro)
- “dentist {metro}”
- “cosmetic dentist {metro}”
- “family dentistry {metro}”
- “dental implants {metro}”

### Med spa queries (run per metro)
- “med spa {metro}”
- “aesthetic clinic {metro}”
- “botox {metro}”
- “laser hair removal {metro}”

### HVAC/Plumbing queries (run per metro)
- “HVAC company {metro}”
- “air conditioning repair {metro}”
- “plumber {metro}”
- “emergency plumber {metro}”

### Agency lane queries (run per metro + US-wide)
- “dental marketing agency”
- “med spa marketing agency”
- “home services marketing agency HVAC”
- “reputation management agency local businesses”

## 3) Cold email sequences (3-step) — reference legitimacy assets
Use these tokens: {{business_name}}, {{city}}, {{recent_review_snippet}}, {{response_gap}}, {{rating}}, {{review_count}}, {{name}}
Website proof: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Reply-to / contact: agent_bob_replit+review-bot@agentmail.to

### A) Not Responding variant (local business)
**Subject options:**
1) Quick fix for unanswered Google reviews at {{business_name}}
2) {{business_name}} — replying to reviews within 12 hours
3) Noticed a review response gap

**Email 1:**
Hi {{name}} — I was looking at {{business_name}}’s Google reviews and saw a recent one: “{{recent_review_snippet}}”.

It looks like some reviews aren’t getting an owner reply ({{response_gap}}). That can quietly cost calls/bookings, even when the rating is solid.

We run an AI Review Reply & Reputation Autopilot: brand-safe draft replies for Google + Yelp, negative-review escalation, and a weekly KPI email. You can approve replies before anything posts.

If you want, I’ll draft 5 replies for your latest reviews for free so you can see the tone.

Want me to send the drafts here?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (2–3 days later):**
Hi {{name}} — should I draft replies for the most recent reviews at {{business_name}} and send them for approval?

The goal is simple: reply within 12 hours, stay on-brand, and escalate anything negative.

**Follow-up 2 (5–7 days later):**
Last note — if review replies aren’t a priority right now, no worries. If someone on your team owns reputation management, who’s the best contact?

### B) Low Rating variant (local business)
**Subject options:**
1) Turning around {{business_name}}’s {{rating}} rating (without fake reviews)
2) Review recovery workflow for {{business_name}}
3) Quick win: better responses to negative reviews

**Email 1:**
Hi {{name}} — I saw {{business_name}} is at {{rating}} on Google ({{review_count}} reviews). A recent review mentioned: “{{recent_review_snippet}}”.

When responses are slow or inconsistent, negative reviews tend to linger at the top and hurt conversion.

We help local businesses respond fast (within 12 hours), de-escalate negatives with brand-safe language, and track weekly reputation KPIs. You approve replies before posting.

I can draft responses for your 3 most recent negative/neutral reviews for free. Should I send those drafts?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
If you want, I’ll also include an escalation checklist (when to move a review to private resolution vs. public reply).

**Follow-up 2:**
Worth a quick 10-minute call, or prefer I just email the draft replies?

### C) High Volume variant (local business)
**Subject options:**
1) Keeping up with {{review_count}} reviews at {{business_name}}
2) Review response ops for busy teams
3) Automating review replies (brand-safe + approval)

**Email 1:**
Hi {{name}} — {{business_name}} has strong review volume ({{review_count}}). Most teams I talk to simply can’t keep up with timely replies.

We run a lightweight autopilot: draft replies for Google + Yelp, flag negatives for escalation, and send weekly KPI reporting. Replies can be approval-only if you prefer.

Want me to draft a week’s worth of replies based on your latest reviews and send them for approval?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
If you tell me your brand voice (formal/friendly/short), I’ll match it.

**Follow-up 2:**
Should I send the drafts to you or someone else on the team?

### D) Agency/Reseller sequence
**Subject options:**
1) Add “review reply autopilot” to your local packages
2) White-label review responses for your clients
3) Quick partnership idea (Google/Yelp review ops)

**Email 1:**
Hi {{name}} — I’m reaching out because you work with local businesses.

We offer an AI Review Reply & Reputation Autopilot for Google + Yelp: brand-safe draft replies, negative-review escalation, and weekly KPIs. It’s easy to bundle as an add-on for your clients (approval workflows supported).

If you want, I’ll do a free trial run on 1 client location: 10 drafted replies + weekly KPI snapshot.

Open to a quick chat, or should I send details by email?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1:**
If you reply with 1 client’s GBP link, I’ll draft the first batch and send for approval.

**Follow-up 2:**
If you’re not the right person for partnerships, who should I contact?

## 4) Daily sending ops (Week 1 = free trial offer)
### Day 0 setup (no spend)
- Create a Google Sheet CRM using stages below.
- Create 1 sending inbox (existing) with consistent signature.
- Start with manual sends to protect deliverability.

### 14-day ramp (single inbox)
- Days 1–2: 20 emails/day
- Days 3–4: 30/day
- Days 5–7: 40/day
- Days 8–10: 50/day
- Days 11–14: 60/day
Rules: stop ramp if bounce rate >3% in a day or spam complaints >0.1%.

### Daily cadence (60–90 minutes)
1) Build/enrich 20–40 new leads (Priority A first)
2) Send new emails (per ramp cap)
3) Send follow-ups (same-day as replies come in)
4) Reply SLA: respond to all replies within 2 business hours
5) Log outcomes in CRM

### List QA checklist (before sending)
- Business has real website OR verifiable contact page
- Category matches vertical (not a school, supplier, franchise directory)
- Review count not zero; last review within 12 months
- Email is business domain when possible; otherwise contact form used and logged in notes

## 5) CRM stages (simple)
Prospect (not contacted) → Sent (Email 1 sent) → Follow-up 1 → Follow-up 2 → Replied → Qualified (fits + wants help) → Demo Booked → Trial Active (free) → Converted (paid later) → Lost (reason)

Entry/exit rule example:
- Move to **Replied** only when you have a human response.
- Move to **Qualified** when they confirm they control Google/Yelp and want help responding.
- Move to **Trial Active** when they share GBP/Yelp access details or agree to an approval-by-email workflow.
