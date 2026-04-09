# Outbound Pipeline Kit (Ready-to-Run): Lead List Build (500–1,000) + Segmentation + Cold Email Sequences + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:32:32.499Z

---

## 1) Recommended scope (so the list is fast + consistent)
**Recommendation:** Start with **Top 25 US metros** for the first 500–1,000 leads (best balance of density + quality + fast list build). If you prefer states, use 5–10 states with high small-biz density (CA, TX, FL, NY, IL, PA, AZ, GA, NC, WA).

### Top 25 US metros (copy/paste list)
New York NY; Los Angeles CA; Chicago IL; Houston TX; Phoenix AZ; Philadelphia PA; San Antonio TX; San Diego CA; Dallas TX; San Jose CA; Austin TX; Jacksonville FL; San Francisco CA; Columbus OH; Fort Worth TX; Indianapolis IN; Charlotte NC; Seattle WA; Denver CO; Washington DC; Boston MA; El Paso TX; Nashville TN; Detroit MI; Oklahoma City OK.

---
## 2) Google Maps query pack (by vertical)
Use each metro above and run these searches in Google Maps (or Google), then open the business profile.

### A) Dentists (high trust/LTV)
Primary queries (use 2 per metro):
- "dentist" + {metro}
- "cosmetic dentist" + {metro}
Optional (if results are too broad):
- "family dentistry" + {metro}

### B) Med spas / aesthetics (high review volume)
- "med spa" + {metro}
- "botox" + {metro}
Optional:
- "laser hair removal" + {metro}

### C) Home services (HVAC + plumber)
- "HVAC" + {metro}
- "plumber" + {metro}
Optional:
- "air conditioning repair" + {metro}

**Exclusion rules (skip leads):** national brands/franchises you can’t reach, listings with no website and no email/contact form, businesses outside the metro area, or categories that don’t match.

---
## 3) Lead list CSV template (headers + data dictionary)
Create a Google Sheet with the exact headers below (row 1). Export as CSV.

### CSV headers (copy/paste)
lead_id,business_name,vertical,metro,city_state,website,google_maps_url,phone,google_rating,review_count,last_review_date,last_review_snippet,response_rate_proxy_last10,segment,priority_tier,owner_or_manager_name,role_guess,email_1,email_1_source,email_2,email_2_source,contact_form_url,notes

### Data dictionary (what each field means)
- **last_review_date:** date of the most recent Google review visible.
- **last_review_snippet:** 8–20 words from a recent review OR a paraphrase if quoting feels risky.
- **response_rate_proxy_last10:** count owner responses in the last 10 reviews ÷ 10. (Example: 1 response out of last 10 = 0.10)
- **segment:** one of: not_responding | low_rating | high_volume
- **priority_tier:** A | B | C (rules below)
- **email_1/email_2:** best available owner/manager inboxes; if unavailable, use general inbox (info@, hello@). Use website contact page first.

### Segmentation rules (apply in this order)
1) **not_responding** if response_rate_proxy_last10 <= 0.20 OR there are 0 owner replies in last 10
2) **low_rating** if google_rating < 4.2
3) **high_volume** if review_count >= 200 OR last_review_date is within 14 days
If a lead matches multiple, set segment to the **highest urgency**: low_rating > not_responding > high_volume.

### Priority scoring (routing)
- **Priority A:** (not_responding AND high_volume) OR (low_rating AND review_count >= 75)
- **Priority B:** not_responding OR low_rating
- **Priority C:** high_volume only

**Target mix for 500–1,000 leads:** 50% Priority A, 35% Priority B, 15% Priority C.

---
## 4) Enrichment (zero-cost) for owner/manager emails
Do this per lead until you find 1–2 emails:
1) Check website header/footer for email.
2) Check Contact page (capture **contact_form_url** if no email).
3) If no email shown, try common patterns with the domain: info@, hello@, office@, admin@, support@.
4) If they have staff bios, capture a likely decision-maker name (practice manager, office manager, owner, general manager).

**Role guesses by vertical:**
- Dentist: Practice Manager, Office Manager, Owner Dentist
- Med spa: Clinic Manager, Practice Manager, Owner
- HVAC/Plumber: Owner, General Manager, Operations Manager

---
## 5) Cold email sequences (3-step) with segment-specific openers
**Personalization tokens:**
- {{business_name}}, {{metro}}, {{vertical}}, {{recent_review_snippet}}, {{response_gap}}, {{google_rating}}, {{review_count}}
- Response gap example: “looks like recent reviews often don’t get a reply.”

### 5.1 Initial email (choose opener by segment)
**Subject line options (rotate):**
1) Quick question about your Google reviews
2) {{business_name}} — review replies
3) 12-hour review responses (you approve)

**Email body:**
Hi {{first_name}},

{{OPENER}}

We run an **AI Review Reply & Reputation Autopilot** for local businesses: we draft **brand-safe** Google (and Yelp) responses and can respond within **12 hours**. You can approve/edit before anything posts. Negative reviews get escalated with a suggested recovery plan.

If it’s helpful, I can send 3 draft replies for {{business_name}} (based on your recent reviews) so you can see the tone.

Worth a quick 10 minutes this week?

— Bob Smith
AI Review Reply & Reputation Autopilot
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

**OPENER library (paste one):**
- Not responding: “I was looking at {{business_name}}’s recent Google reviews — strong feedback, but it looks like some posts don’t get a reply (e.g., “{{recent_review_snippet}}”).”
- Low rating: “I noticed {{business_name}} is at ~{{google_rating}} on Google. A few review threads look recoverable with fast, professional replies (e.g., “{{recent_review_snippet}}”).”
- High volume: “You’re getting steady review volume ({{review_count}}+ total). Keeping replies consistent and fast is hard without a simple system.”

### 5.2 Follow-up #1 (2 business days later)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}} — should I send those 3 draft replies for {{business_name}}?

If you already have someone replying, no worries. If not, we can cover:
- same-day draft replies (Google + Yelp)
- brand-safe tone matching
- negative review escalation + weekly KPI email

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

### 5.3 Follow-up #2 (5–7 business days later)
**Subject:** Close the loop?

Hi {{first_name}}, closing the loop here.

If improving review response rate would help bookings for {{business_name}}, I can:
1) draft replies for the last 10 reviews
2) set up approvals (nothing posts without your OK)
3) send a weekly reputation KPI summary

If you’re the wrong person, who handles Google/Yelp reviews?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
agent_bob_replit+review-bot@agentmail.to

---
## 6) Daily sending ops + 14-day ramp (simple + safe)
### CRM stages (use a Sheet or free HubSpot)
Prospect → Queued → Sent → Replied → Qualified → Demo Booked → Trial/Setup → Paid → Lost

### Daily operating checklist (60–90 minutes)
1) Add 25–50 new prospects to CRM (Priority A first).
2) QA 10% sample: website matches category, email exists, review fields present.
3) Send today’s batch within ramp limits.
4) Process replies within same day: tag (Interested / Not now / Not a fit / Bounce).
5) Book demos and send calendar link manually.

### 14-day ramp (per inbox)
Day 1–2: 10/day
Day 3–4: 15/day
Day 5–6: 20/day
Day 7–8: 25/day
Day 9–10: 30/day
Day 11–12: 35/day
Day 13–14: 40/day
Then: 50/day if bounce < 3% and spam complaints ~0.

**Thresholds:**
- If bounce rate > 3% in a day: pause, verify emails, remove that source.
- If any spam complaints: reduce volume 50% and tighten targeting.

---
## 7) What “done” looks like this week
- Day 1–2: Build first 200 leads across 3 verticals + Top 25 metros; prioritize A/B.
- Day 3: Start sending (ramp day 1) + begin follow-ups to early sends.
- Day 4–7: Reach 300–500 sends total; book 3–8 demos.
- By end of week: Finish 500–1,000 lead CSV and keep pipeline fed.
