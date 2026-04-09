# Outbound Pipeline Execution Kit (Top 25 Metros) — Lead List Build Spec + Segmentation/QA + Safe Personalization + Email Signature

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T13:16:42.031Z

---

## 1) Geography decision (locked)
**Scope:** Top 25 US metros for the first 500–1,000 prospects. This reduces noise, increases density (review volume), and makes list-building repeatable.

**Top 25 metros (use “City, ST” in searches):**
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
13. Fort Worth, TX
14. Columbus, OH
15. Charlotte, NC
16. San Francisco, CA
17. Indianapolis, IN
18. Seattle, WA
19. Denver, CO
20. Washington, DC
21. Boston, MA
22. El Paso, TX
23. Detroit, MI
24. Nashville, TN
25. Portland, OR

---
## 2) Lead list build spec (500–1,000 rows)
**Goal:** 600 direct-to-local + 200 “high priority” + 200 agencies (optional lane) = 800–1,000 total.

### 2.1 Vertical query set (Google Maps)
Run each query in Google Maps. Capture the top results that match the vertical and have enough review activity.

**Dentists (use category consistency):**
- “dentist {City, ST}”
- “cosmetic dentist {City, ST}”
- “family dentist {City, ST}”
- “dental clinic {City, ST}”

**Med spas / aesthetics:**
- “med spa {City, ST}”
- “aesthetic clinic {City, ST}”
- “botox {City, ST}”
- “laser hair removal {City, ST}”

**HVAC / plumbing (home services):**
- “HVAC {City, ST}”
- “air conditioning repair {City, ST}”
- “plumber {City, ST}”
- “water heater repair {City, ST}”

### 2.2 Agency/reseller query set (Google + LinkedIn)
**Google searches:**
- “dental marketing agency {City, ST}”
- “med spa marketing agency {City, ST}”
- “HVAC marketing agency {City, ST}”
- “reputation management agency {City, ST}”
- “local SEO agency {City, ST}”

**LinkedIn searches (titles):** Owner, Founder, Managing Partner, Head of Client Services, Account Director.

---
## 3) CSV schema (headers to use exactly)
business_name, vertical, website, city_state, phone, google_maps_url, google_rating, review_count, last_review_date, response_rate_proxy_last10, segment, priority_tier, personalization_snippet, owner_or_manager_name, role_guess, email_1, email_2, notes

**Minimum acceptable completeness (per row):** business_name + vertical + city_state + google_maps_url + google_rating + review_count + last_review_date + personalization_snippet.

---
## 4) How to compute response_rate_proxy_last10 (manual, zero-cost)
Open Google Maps listing → Reviews → sort by “Newest”. For the **last 10 reviews**:
- Count how many have an “Owner response” (or “Response from the owner”).
- response_rate_proxy_last10 = owner_responses / 10

Examples:
- 0/10 = 0.0
- 2/10 = 0.2
- 7/10 = 0.7

---
## 5) Segmentation rules (deterministic)
Assign **segment** based on these rules:
1) **not_responding** if response_rate_proxy_last10 <= 0.2
2) **low_rating** if google_rating < 4.2
3) **high_volume** if review_count >= 200 OR last_review_date is within the last 14 days

If multiple apply, keep the “dominant pain” in notes, but segment as:
- If low_rating applies → segment = low_rating (most urgent pain)
- Else if not_responding applies → segment = not_responding
- Else if high_volume applies → segment = high_volume

### Priority tier routing
- **Priority A:** (low_rating AND high_volume) OR (not_responding AND high_volume)
- **Priority B:** low_rating OR not_responding
- **Priority C:** high_volume only

---
## 6) Personalization snippet rules (brand-safe + compliant)
We need a hook without sounding creepy or violating review platform norms.

**Allowed:**
- Paraphrase the theme: “I noticed a recent review mentioned wait time / scheduling / billing clarity.”
- Quote a short, non-sensitive fragment (5–12 words) with no medical details, no names.
- Use only publicly visible content.

**Avoid:**
- Patient/medical specifics (for dentists/med spas): do not mention procedures tied to a person.
- Copying full reviews verbatim.
- Mentioning reviewer names.

**Snippet template examples (store in personalization_snippet):**
- “Recent review mentioned scheduling delays; no owner reply visible.”
- “Someone praised staff friendliness—response opportunity missed.”
- “A 2-star review cited communication issues; response gap.”

---
## 7) Daily production targets (list building)
If 1 VA (or owner) is collecting manually:
- **Target:** 100 rows/day (8 hours) at “minimum acceptable completeness”
- **QA sample:** re-check 10 rows/day (10%) for wrong category, duplicates, missing URLs, and incorrect response proxy.
- **Expected timeline:** 500 rows in ~5 working days.

---
## 8) Outbound email legitimacy/signature block (paste into all sequences)
Use this in every email footer.

—
Bob Smith
AI Review Reply & Reputation Autopilot (Google/Yelp)
Proof / site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Contact: agent_bob_replit+review-bot@agentmail.to

---
## 9) CTA line to keep consistent across verticals
Use one low-friction CTA everywhere:
- “Worth a 10-minute call to see if this would save you time and protect your rating?”
OR
- “If I send 2–3 draft replies for your latest reviews, would you like to approve them first?”

This kit is designed so list collection can begin today with no paid tools, and sending can start as soon as the first 100–200 records are ready.