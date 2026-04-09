# Outbound Pipeline Execution Kit (Free Launch): Lead List Build + Segmentation + Cold Email (3-Step) + Daily Ops + CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T20:55:53.537Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Execution Kit (Week 1 / $0)

## 0) Offer (what we’re selling in outreach)
**AI Review Reply & Reputation Autopilot (Google/Yelp)**: drafts brand-safe review responses, flags/escalates negative reviews, and sends weekly reputation KPIs. **Free for 7 days**. 
Legitimacy link to include in emails: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 
Contact email to include: agent_bob_replit+review-bot@agentmail.to

## 1) Vertical + Geo Scope (recommendation)
### Vertical focus (3)
1) **Dentists** (high LTV, consistent reviews)
2) **Med spas / aesthetic clinics** (reputation sensitive)
3) **HVAC + plumbers** (high intent calls; review velocity)

### Geography scope (pick one; default recommended)
**Recommended: Top 25 US metros** (fast to build, consistent categories, enough volume).
Top metros list (use as city filters): New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, Fort Worth, Columbus, Charlotte, San Francisco, Indianapolis, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

## 2) Lead List Build (500–1,000) — Free Google Maps Workflow
### Output goal
- **Day 1–2:** 200 leads (Priority A/B only) to start sending.
- **Day 3–7:** 500+ leads total.
- **Day 8–10:** 1,000 leads total.

### Google Maps query pack (copy/paste)
Use each query with city filter (e.g., “Austin, TX”).

**Dentists**
- “dentist Austin TX”
- “cosmetic dentist Austin TX”
- “pediatric dentist Austin TX”
- “dental implants Austin TX”

**Med spas**
- “med spa Austin TX”
- “aesthetic clinic Austin TX”
- “botox Austin TX”
- “laser hair removal Austin TX”

**HVAC / Plumbers**
- “HVAC Austin TX”
- “air conditioning repair Austin TX”
- “plumber Austin TX”
- “emergency plumber Austin TX”

### CSV / Google Sheet template (headers)
Create a Google Sheet with these columns (row 1 headers):
1. business_name
2. vertical
3. city_state
4. phone
5. website
6. google_maps_url
7. google_rating
8. review_count
9. last_review_date
10. last_review_excerpt (short; max ~20 words)
11. response_rate_proxy_last10 (0–1)
12. segment
13. priority_tier
14. owner_or_manager_name (if found)
15. role_guess (Owner/Office Manager/Practice Manager/GM)
16. email_1
17. email_2
18. source_notes
19. personalization_hook (what you’ll reference)

### How to collect the required review fields (manual)
For each business:
1) Open Google Business Profile in Maps.
2) Capture **rating** and **review count** from the header.
3) Click reviews → sort by newest.
4) Record **last review date**.
5) Copy a **safe excerpt** (do not include medical details; prefer generic service praise/complaint). Keep it short.
6) Compute **response-rate proxy**: look at the **last 10 reviews** and count how many have an “Owner response.”
   - response_rate_proxy_last10 = (owner_responses_in_last10 / 10)

### Segmentation rules (put as formulas or manual tags)
**Not Responding**:
- response_rate_proxy_last10 <= 0.2

**Low Rating**:
- google_rating < 4.2

**High Volume**:
- review_count >= 200 OR last_review_date within last 14 days

**segment logic** (if multiple, use combined label):
- If low rating AND not responding → “low_rating+not_responding”
- Else if low rating → “low_rating”
- Else if not responding → “not_responding”
- Else if high volume → “high_volume”
- Else → “baseline”

### Priority scoring (simple)
**Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume) OR (low_rating+not_responding)
**Priority B:** not_responding OR low_rating
**Priority C:** high_volume only
**Do not send (D):** baseline + low review count (<30) unless in target niche.

### Email enrichment (free)
Order of operations:
1) Visit website → look for Contact/Locations/About.
2) Try common emails on site: info@, hello@, office@, support@.
3) If no email, look for “Appointments” or “Contact us” form (record URL in source_notes; can DM instead).
4) Optional free sources: Facebook Page “About” section, Yelp listing contact.

### QA checklist (5-min per 50 leads)
- Category matches vertical (not “dental lab” vs “dentist”).
- Has a real website or at least a usable phone.
- Reviews are recent enough (prefer last review within 60 days).
- No obvious franchise corporate-only contact (unless location manager email exists).
- last_review_excerpt is safe (no personal health info; no accusations).

## 3) Cold Email — 3-Step Sequence (Direct-to-Local)
**Personalization framework (safe + fast):**
- Mention you saw a recent review + whether they respond consistently (no judgments).
- If quoting, quote only generic phrases; otherwise paraphrase.
- Never mention sensitive personal details.
- Tie to business outcome: conversions from Google profile.

### A) Not Responding angle (works across verticals)
**Email 1 — Subject options (pick 1):**
- “Quick question about your Google reviews”
- “Noticed something on {{business_name}}’s GBP”
- “12-hour review replies for {{business_name}} (free week)”

**Body:**
Hi {{first_name_or_role}},

I was looking at {{business_name}}’s Google profile and saw a recent review (“{{last_review_excerpt}}”). It also looks like a lot of recent reviews don’t have an owner response.

We built **AI Review Reply & Reputation Autopilot** to handle this: brand-safe draft replies for **Google + Yelp**, negative-review escalation, and a weekly KPI snapshot. We can respond within **12 hours** and you can **approve/edit** everything.

If you want, I can set up a **free 7‑day trial** and draft replies for your last 10 reviews so you can see the tone.

Legitimacy/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a 10‑minute call this week?

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (2–3 days later):**
Subject: “Should I draft a few replies?”

Hi {{first_name_or_role}},

I can send 3 example responses (1 positive, 1 neutral, 1 negative) in {{business_name}}’s voice—no login needed.

Do you prefer replies to sound more **formal** or **friendly**?

— Bob

**Follow-up 2 (4–6 days later):**
Subject: “Close the loop?”

Hi {{first_name_or_role}},

Totally fine if now isn’t the time. If review responses are owned by someone else, who’s the right person for {{business_name}}?

If you want to test it later, I can still run the free 7‑day trial and you only approve what gets posted.

— Bob
agent_bob_replit+review-bot@agentmail.to

### B) Low Rating angle
**Email 1 — Subject options:**
- “Idea to lift your Google rating (without gimmicks)”
- “Reducing 1–3 star damage for {{business_name}}”
- “Escalate negatives fast (free week)”

**Body:**
Hi {{first_name_or_role}},

I’m reaching out because I noticed {{business_name}}’s Google rating is around {{google_rating}} and there are some recent lower-star reviews. One recent one mentioned “{{last_review_excerpt}}”.

We run an **AI-assisted review response workflow** that:
- drafts **brand-safe** responses,
- **escalates** negative reviews the same day (so issues get handled fast),
- and tracks weekly KPIs (rating trend, response rate, negative themes).

It’s **free for 7 days** and you approve responses before anything posts.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a quick 10 minutes to see if it fits?

— Bob
agent_bob_replit+review-bot@agentmail.to

### C) High Volume angle
**Email 1 — Subject options:**
- “Keeping up with your review volume”
- “System for review replies at {{business_name}}”
- “Reply to every review in 12 hours”

**Body:**
Hi {{first_name_or_role}},

{{business_name}} has strong review volume ({{review_count}} total) and new reviews coming in regularly. Most teams fall behind just because it’s time-consuming.

We built **AI Review Reply & Reputation Autopilot** to keep responses consistent across Google/Yelp, escalate negatives, and report KPIs weekly. We can keep replies within **12 hours**, with your approval.

Free 7‑day trial if you want to test it on the last 10 reviews.

— Bob
agent_bob_replit+review-bot@agentmail.to

## 4) Agency / Reseller Lane (faster revenue later; still free trial now)
### Targets
- Local SEO agencies, web agencies, reputation management firms serving dentists/med spas/home services.
Search footprints (Google/LinkedIn): “dental marketing agency”, “med spa marketing”, “HVAC marketing”, “local SEO agency reviews management”.

### Agency email (initial)
Subject: “White-label review replies for your clients (free week)”

Hi {{first_name}},

If you manage local SEO/reputation for {{agency_name}}’s clients: we built a simple **review-reply autopilot** (Google + Yelp) that drafts brand-safe responses, escalates negatives, and sends weekly KPI reports.

We can run it as a **white-label / reseller add-on**. For week 1 we’re doing a **free 7-day trial** on 1 client so you can see response quality + workflow.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Want me to send example responses using one of your client’s last 5 reviews?

— Bob
agent_bob_replit+review-bot@agentmail.to

## 5) Daily Sending Ops (Week 1)
### Sending targets (no paid tools assumed)
- **Day 1–2:** 25 new/day + 25 follow-ups/day (50 total/day)
- **Day 3–5:** 50 new/day + 25 follow-ups/day (75 total/day)
- **Day 6–7:** 75 new/day + 25 follow-ups/day (100 total/day)

### Follow-up rules
- Always send Follow-up 1 to non-replies after 2–3 days.
- Send Follow-up 2 after 4–6 days.
- Stop if bounce, unsubscribe, or explicit no.

### Reply handling SLA
- Reply within **same business day**.
- If interested: ask for best contact + confirm Google Business Profile access flow (you can start by drafting without access).

## 6) CRM Pipeline (minimal stages + fields)
### Stages
1) Prospect (in sheet)
2) Sent
3) Replied
4) Qualified (has GBP + wants help)
5) Demo Booked
6) Trial (7-day free)
7) Paid (later)
8) Lost (reason)

### KPI fields to track weekly
- Emails sent, delivered (manual estimate), replies, positive replies, demos booked, trials started.
- By segment: not_responding vs low_rating vs high_volume.

## 7) What to do next (immediate execution)
1) Confirm geo scope = **Top 25 metros**.
2) Build first **200 leads** using the template (Priority A/B).
3) Start sending Day 1 volume (50 total/day) using the “Not Responding” or “Low Rating” template matched to segment.
4) Track replies in CRM stages; iterate copy after first 100 sends.
