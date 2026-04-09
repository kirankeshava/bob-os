# Outbound Pipeline Kit (Zero-Cost): Lead List Build (500–1,000) + Segmentation/Priority + 3-Step Cold Email Sequences + Daily Sending Ops/CRM

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:13:01.295Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Zero-Cost)

Business website (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Business contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Target verticals + who to contact
**Verticals (high review velocity + LTV):**
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + plumbing (home services)

**Best contact roles:** Owner, Practice Manager, Office Manager, General Manager, Operations Manager, Marketing Manager.

## 2) Geography plan (Top 25 US metros)
Use the same vertical queries across these metros to rapidly reach 500–1,000 prospects.
- New York, NY
- Los Angeles, CA
- Chicago, IL
- Houston, TX
- Phoenix, AZ
- Philadelphia, PA
- San Antonio, TX
- San Diego, CA
- Dallas, TX
- San Jose, CA
- Austin, TX
- Jacksonville, FL
- Fort Worth, TX
- Columbus, OH
- Charlotte, NC
- San Francisco, CA
- Indianapolis, IN
- Seattle, WA
- Denver, CO
- Washington, DC
- Boston, MA
- El Paso, TX
- Nashville, TN
- Detroit, MI
- Oklahoma City, OK

## 3) Google Maps query pack (copy/paste)
Run each query in Google Maps, open the business profile, and collect fields into the CSV.

### Dental queries
- “dentist {CITY}”
- “cosmetic dentist {CITY}”
- “family dentistry {CITY}”
- “dental implants {CITY}”

### Med spa queries
- “med spa {CITY}”
- “aesthetic clinic {CITY}”
- “botox {CITY}”
- “laser hair removal {CITY}”

### HVAC / Plumbing queries
- “HVAC {CITY}”
- “air conditioning repair {CITY}”
- “plumber {CITY}”
- “water heater repair {CITY}”

**Filters/QA (to avoid junk):**
- Avoid national call-center listings and pure lead-gen sites.
- Prefer businesses with a real website and local phone.
- Skip businesses without reviews unless you need more volume.

## 4) Lead list CSV template (headers)
Create a Google Sheet with exactly these columns:
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- last_review_excerpt
- owner_reply_in_last_review (Y/N)
- replies_in_last_10 (0–10)
- response_rate_proxy (replies_in_last_10/10)
- segment (not_responding / low_rating / high_volume)
- priority (A/B/C)
- contact_name
- contact_role_guess
- email_1
- email_2
- personalization_hook (1 sentence)
- notes

### How to capture response_rate_proxy (fast method)
Open the Reviews tab → scan the most recent **10 reviews** and count how many have an “Owner response.”
- replies_in_last_10 = count of owner responses
- response_rate_proxy = replies_in_last_10 / 10

## 5) Segmentation rules (deterministic)
Assign segments based on these rules:
- **not_responding:** response_rate_proxy <= 0.2 (0–2 replies out of last 10)
- **low_rating:** google_rating < 4.2
- **high_volume:** review_count >= 200 OR last_review_date within 14 days

If multiple apply, keep the “segment” as the *primary* outreach angle:
1) low_rating (most urgent)
2) not_responding
3) high_volume

### Priority scoring
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND high_volume)
- **Priority B:** (not_responding) OR (low_rating)
- **Priority C:** high_volume only

## 6) Cold email sequences (3-step) — Local businesses
**Personalization tokens:**
- {{business_name}}, {{city}}, {{vertical}}, {{google_rating}}, {{review_count}}
- {{recent_review_snippet}} (quote or paraphrase 8–15 words)
- {{response_gap}} (“I didn’t see an owner reply on a few recent reviews.”)
- {{website_url}} = business website above
- Reply-to: agent_bob_replit+review-bot@agentmail.to

### A) Initial email (base) — use segment-specific first line
**Subject options:**
1) Quick question about {{business_name}} reviews
2) Noticed something on your Google reviews
3) Re: {{business_name}} reputation

**Email:**
Hi {{first_name}},

{{SEGMENT_OPENER}}

I run a simple “review reply autopilot” for local businesses: we draft brand-safe responses to Google/Yelp reviews, escalate negatives the same day, and send a weekly KPI recap. You can approve replies (or we can follow your guidelines).

If I send 2–3 draft replies based on your latest reviews, would you like to see them? Free for the first 7 days.

Website (so you know I’m real): {{website_url}}

— Bob
agent_bob_replit+review-bot@agentmail.to

**Segment openers (pick one):**
- **not_responding:** “I was looking at {{business_name}} on Google and saw a few recent reviews without an owner response (example: “{{recent_review_snippet}}”).”
- **low_rating:** “I noticed {{business_name}} is around {{google_rating}}★ on Google and a recent review mentioned “{{recent_review_snippet}}.” These are usually fixable with fast, calm responses + internal escalation.”
- **high_volume:** “You’re getting steady review volume ({{review_count}} total). Keeping responses consistent is hard when things get busy—especially on weeks with lots of new reviews.”

### B) Follow-up #1 (48–72 hours)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}},

Quick bump—do you want me to send draft replies for the last 3 reviews?

The idea is simple: respond within 12 hours, keep tone consistent, and flag any negative review so it gets handled before it spreads.

If “yes,” reply with “drafts” and I’ll send them over.

— Bob
{{website_url}}
agent_bob_replit+review-bot@agentmail.to

### C) Follow-up #2 (5–7 days)
**Subject:** Should I close the loop?

Hi {{first_name}},

Should I close the loop on this?

If review replies aren’t a priority, no worries. If they are, I can run a free 7-day trial where you:
1) get draft responses, 2) approve (or set rules), 3) see a weekly KPI snapshot.

Want to try it for {{business_name}}?

— Bob
{{website_url}}
agent_bob_replit+review-bot@agentmail.to

## 7) Agency/reseller lane (marketing agencies)
### Agency initial email
**Subject options:**
1) Add-on for your local clients: review replies
2) White-label: Google/Yelp review response autopilot

Hi {{first_name}},

Do you support any dental / med spa / home service clients who struggle to keep up with Google/Yelp reviews?

We provide a lightweight white-label “review reply & reputation autopilot”: brand-safe drafts, fast turnaround, negative-review escalation, and weekly KPI reporting. You can resell it as part of your package—free to pilot for 7 days with one client.

If you tell me your top 1–2 client verticals, I’ll send a quick workflow + sample outputs.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

## 8) Daily sending ops (14-day ramp, $0 tools)
**Goal:** consistent sending without burning deliverability.

**Day 1–2:** 20 emails/day (manual personalization, Priority A only)
**Day 3–4:** 30/day
**Day 5–7:** 40/day
**Day 8–10:** 60/day
**Day 11–14:** 80–100/day (only if bounce rate <3% and replies are healthy)

**Daily checklist (owner/operator):**
1) Pull 20–100 prospects from Priority A/B.
2) Personalize 1 line using last_review_excerpt + response gap.
3) Send initial emails (avoid attachments, keep links minimal: website only).
4) Log each send in CRM stage = Sent.
5) Handle replies twice/day (target SLA: <4 business hours).
6) For interested replies: offer “I’ll draft 2–3 replies today—want Google or Yelp first?”

**List QA rules (before sending):**
- Website present OR a clear contact email on GBP/website.
- Not a duplicate / not same parent brand.
- Review snippet is non-sensitive and short (or paraphrase).

**Health thresholds:**
- Bounce rate: stop if >5% in a day; fix list.
- Spam complaints: if any, reduce volume and tighten targeting.

## 9) CRM stages (simple pipeline)
Use Trello/Airtable/Sheet columns:
1) Prospect (not contacted)
2) Sent (initial)
3) Follow-up 1 queued
4) Follow-up 2 queued
5) Replied
6) Qualified (pain confirmed)
7) Demo booked
8) Trial (7 days free)
9) Paid (post-week-1)
10) Lost / Not now

**Entry/exit criteria:**
- Move to Qualified when they confirm: “too busy,” “bad reviews,” “no time,” or ask pricing/how it works.
- Move to Trial when they provide GBP link and approve response guidelines.

## 10) Production target to reach 500–1,000 leads (no spend)
- One person can reliably collect **50–80 leads/day** with this template once practiced.
- 500 leads ≈ 7–10 workdays; 1,000 leads ≈ 14–20 workdays.
- Shortcut: prioritize **Priority A** first; you’ll get higher reply rates with fewer leads.
