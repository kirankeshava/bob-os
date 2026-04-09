# Outbound Pipeline Execution Pack (Top 25 Metros) — Lead List Template + Query Pack + Segmentation Formulas + SOP (Zero-Cost)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T16:02:28.658Z

---

# AI Review Reply & Reputation Autopilot — Outbound Lead List Build + Sending Ops (Execution Pack)

**Business proof URL (include in emails when appropriate):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
**Reply/Contact email:** agent_bob_replit+review-bot@agentmail.to

---
## 1) Geography (locked) — Top 25 US metros
Use this metro list for consistent pulls and enough density to reach 500–1,000 quickly:
1. New York, NY
2. Los Angeles, CA
3. Chicago, IL
4. Houston, TX
5. Phoenix, AZ
6. Philadelphia, PA
7. San Antonio, TX
8. San Diego, CA
9. Dallas, TX
10. San Jose, CA
11. Austin, TX
12. Jacksonville, FL
13. San Francisco, CA
14. Columbus, OH
15. Fort Worth, TX
16. Indianapolis, IN
17. Charlotte, NC
18. Seattle, WA
19. Denver, CO
20. Washington, DC
21. Boston, MA
22. El Paso, TX
23. Detroit, MI
24. Nashville, TN
25. Portland, OR

---
## 2) Google Maps Query Pack (copy/paste)
Run searches in Google Maps for each metro. Open each promising listing in a new tab.

### A) Dentists
Use 2–3 queries per metro (avoid overly broad “dentist” only if results are noisy):
- “cosmetic dentist {city}”
- “family dentistry {city}”
- “dental implants {city}”
- “pediatric dentist {city}”

### B) Med spas / aesthetics
- “med spa {city}”
- “aesthetic clinic {city}”
- “botox {city}”
- “laser hair removal {city}”

### C) HVAC / Plumbing (home services)
- “HVAC {city}”
- “air conditioning repair {city}”
- “plumber {city}”
- “water heater repair {city}”

### D) Agency/Reseller lane (local marketing agencies)
- “digital marketing agency {city} local business”
- “SEO agency {city} dentists”
- “marketing agency {city} med spa”
- “reputation management agency {city}”

**Exclusions (skip):** franchises with corporate-only contact forms, directories (Yelp listing pages, Healthgrades), listings with no website, and businesses outside target categories.

---
## 3) CSV / Google Sheet Template (headers)
Create a Google Sheet with exactly these columns (row 1). Export as CSV later.

**Core identifiers**
- business_name
- vertical (dentist | med_spa | hvac_plumbing | agency)
- city
- state
- website
- phone
- google_maps_url

**Google review metrics**
- google_rating
- review_count
- last_review_date (YYYY-MM-DD)
- last_review_excerpt (<= 180 chars; or paraphrase)
- owner_response_rate_proxy (0–1; % of last 10 reviews with owner reply)

**Contact enrichment**
- contact_name (if found)
- role_guess (Owner | Practice Manager | Office Manager | GM | Marketing Manager)
- email_1
- email_2
- contact_page_url

**Segmentation outputs**
- segment_primary (not_responding | low_rating | high_volume | mixed)
- priority_tier (A | B | C)
- personalization_hook (what you’ll reference in line 1)
- notes

---
## 4) Data Dictionary (how to fill each field)
- **google_rating / review_count:** from Google business panel.
- **last_review_date:** open “Reviews” → sort by “Newest” → capture date of most recent review.
- **last_review_excerpt:** copy a short snippet OR paraphrase. Keep it generic; do not include health details.
- **owner_response_rate_proxy:** open the last ~10 reviews; count how many have an “Owner response.” `proxy = responses/10`.
- **website:** from listing. If none, skip the lead.
- **emails:**
  1) Look for footer/contact page emails on the website.
  2) If none, use a standard pattern guess ONLY if domain is clear (e.g., info@, hello@, contact@, office@). Put guessed emails in email_2 and add note “guessed.”

---
## 5) Segmentation + Priority Formulas (Google Sheets)
Assume:
- Rating in column H, review_count in I, last_review_date in J, owner_response_rate_proxy in L.

### A) segment_primary
In **segment_primary** cell (row 2), use:
```
=IFS(
  $L2<=0.2,"not_responding",
  $H2<4.2,"low_rating",
  $I2>=200,"high_volume",
  TRUE,"mixed"
)
```

### B) priority_tier (A/B/C)
Priority A = (not responding AND high volume) OR (low rating AND high volume) OR (rating < 4.0).  
Priority B = not responding OR low rating.  
Priority C = high volume only or mixed.

Use:
```
=IFS(
  OR(AND($L2<=0.2,$I2>=200),AND($H2<4.2,$I2>=200),$H2<4.0),"A",
  OR($L2<=0.2,$H2<4.2),"B",
  OR($I2>=200,TRUE),"C"
)
```

---
## 6) Daily Production Targets (to reach 500–1,000)
**Goal:** 1,000 rows in ~10 working days with 1 VA.
- Target 100 completed rows/day (minimum 50/day).
- QA sample: 10 rows/day checked by owner (wrong vertical, missing website, fake email, franchise).

**Per-lead time budget (4–6 minutes):**
1) Maps listing metrics (1–2 min)
2) Last review date + response proxy (2 min)
3) Website + email capture (1–2 min)

---
## 7) CRM Stages + Tags (import-ready)
Stages:
1. Prospect (new)
2. Sent — Step 1
3. Sent — Follow-up 1
4. Sent — Follow-up 2
5. Replied — Interested
6. Replied — Not now
7. Qualified
8. Demo booked
9. Trial
10. Paid
11. Lost

Tags to apply:
- vertical:dental | vertical:medspa | vertical:home
- seg:not_responding | seg:low_rating | seg:high_volume
- prio:A | prio:B | prio:C

---
## 8) Sending Ops (minimum viable cadence)
Once the first 200 leads are built:
- Day 1–2: 30 new sends/day
- Day 3–4: 50 new sends/day
- Day 5+: 80–100 new sends/day (only if bounce rate <3%)

**Follow-ups:**
- Follow-up 1: +2 business days
- Follow-up 2: +5 business days

**Reply handling SLA:** respond within 2 hours during business day. If negative sentiment: acknowledge + ask for best contact/time.

---
## 9) Personalization Hook Rules (safe + fast)
Use **one** of these per email:
- “Noticed you’ve gotten a few new reviews lately (last one on {date})…”
- “Saw a recent review mentioning {paraphrased theme}…”
- “Noticed many recent reviews don’t have an owner response…”

Avoid quoting sensitive/medical details; paraphrase instead (especially for dental/med spa).

---
## 10) What the offer is (for consistency in outbound)
One-sentence offer to reuse:
> “We draft and post brand-safe Google/Yelp review replies within 12 hours, flag negatives for escalation, and send a weekly KPI recap — you can approve replies or let it run on autopilot.”

Optional proof link line:
> “If helpful, here’s our product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 (we’re small, so we keep it simple).”

---
### Immediate next execution (48 hours)
1) Build **200 leads** (80 dental, 60 med spa, 60 HVAC/plumbing) across top 10 metros.
2) Start sending to Priority A first.
3) Track replies + objections; adjust template phrasing based on real responses.
