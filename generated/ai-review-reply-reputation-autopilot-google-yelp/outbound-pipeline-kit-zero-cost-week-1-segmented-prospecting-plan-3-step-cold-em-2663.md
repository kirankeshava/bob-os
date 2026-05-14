# Outbound Pipeline Kit (Zero-Cost Week 1) — Segmented Prospecting Plan + 3-Step Cold Email Sequences + Ops Checklist + CRM Stages + Lead List CSV Template

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T05:47:10.402Z

---

# AI Review Reply & Reputation Autopilot — Outbound Pipeline Kit (Week 1: $0 spend)

## 0) Offer (what we’re selling in outbound)
**Free 7-day trial (Week 1):** We draft (and optionally post, where permitted) brand-safe responses to your new Google/Yelp reviews within **12 hours**, escalate negative reviews to the owner/manager, and send a weekly KPI recap (rating trend, response rate, response time, negative-review alerts). 

**Legitimacy link (include in emails):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

**Contact email:** agent_bob_replit+review-bot@agentmail.to

---

## 1) Choose verticals (2–3) + why
We run 3 vertical lanes in parallel because they have (a) lots of reviews, (b) real revenue impact from ratings, (c) owners who ignore review ops.
1) **Dentists** (high LTV per patient, competitive local SERP)
2) **Med spas / aesthetic clinics** (high review velocity + brand sensitivity)
3) **HVAC + plumbers** (high lead-gen dependence on Google Local + lots of “urgent” reviews)

Optional 4th lane (B2B bulk): **Agencies** serving those verticals.

---

## 2) Segmentation + Priority scoring (how we decide who gets emailed first)
Collect: rating, review count, last review date, and **response-rate proxy** from last 10 reviews.

### Segment rules
- **Not Responding:** response-rate proxy ≤ 20% OR 0 owner replies in last 10 reviews.
- **Low Rating:** Google rating < 4.2.
- **High Volume:** review_count ≥ 200 OR last_review_date within last 14 days.

### Priority tiers (routing)
- **Priority A:** (Not Responding AND High Volume) OR (Low Rating AND High Volume)
- **Priority B:** Not Responding OR Low Rating
- **Priority C:** High Volume only

### Messaging angle by segment
- **Not Responding:** “response gap” + speed + brand-safe approvals.
- **Low Rating:** “recovery + escalation” + turn negatives into wins.
- **High Volume:** “throughput + consistency” + weekly KPIs.

---

## 3) Lead list build (500–1,000) — zero-cost method
### 3.1 Geo plan (pick one)
A) **Top 25 US metros** (fastest, consistent density)
B) **5–10 target states** (if you want local concentration)
C) **US-wide** (slower QA; more variance)

### 3.2 Google Maps query pack (examples)
Use Google Maps search with city + category. For each metro/state, run:
- **Dentist lane:** “Dentist”, “Cosmetic dentist”, “Pediatric dentist”, “Orthodontist”
- **Med spa lane:** “Med spa”, “Medical spa”, “Aesthetic clinic”, “Botox”, “Laser hair removal”
- **Home services lane:** “HVAC”, “Air conditioning repair”, “Plumber”, “Drain cleaning”

**Agency lane queries (Google + LinkedIn):**
- “dental marketing agency”, “med spa marketing agency”, “HVAC marketing agency”, “local SEO agency dentist”

### 3.3 Required CSV columns (copy/paste headers)
priority_tier,segment,business_name,vertical,city_state,website,phone,google_maps_url,google_rating,review_count,last_review_date,response_rate_proxy_last10,personalization_snippet,last_negative_review_date,owner_or_manager_name,role_guess,email_1,email_2,notes

### 3.4 How to compute response_rate_proxy_last10 (manual)
Open the Google reviews tab → scan last 10 reviews → count how many have “Response from the owner” → divide by 10.

### 3.5 Personalization snippet rules (safe + fast)
- Prefer **paraphrase**, not direct quotes, unless the snippet is short and non-sensitive.
- Do **not** mention protected health info; for dentists/med spas avoid treatment details.
- Good: “I saw a recent review mentioning long wait times” (paraphrase)
- Avoid: patient names + specific procedures.

### 3.6 QA checklist (spot-check 10% of rows)
- Correct category (not a supply store, school, franchise directory)
- Has website or workable email path (contact form ok)
- Review count and rating match
- Last review date not stale (prefer last 60 days)
- Segment + priority computed correctly

---

## 4) CRM stages (simple pipeline)
Use a Google Sheet with these stages (single-select column):
1) **Prospect (Unsent)**
2) **Sent – Email 1**
3) **Sent – Follow-up 1**
4) **Sent – Follow-up 2**
5) **Replied – Interested**
6) **Replied – Not now**
7) **Replied – Objection**
8) **Booked call**
9) **Trial started (7 days free)**
10) **Converted (paid after trial)**
11) **Lost**

Rules:
- Move to “Lost” if: hard bounce, explicit unsubscribe, hostile reply.
- Move to “Trial started” only after they confirm locations + preferred approval workflow.

---

## 5) Daily activity targets (Week 1, 1 inbox, $0)
Assuming one warmed inbox (basic Gmail) and conservative sending:
- **Day 1:** 20 new emails (Priority A only)
- **Day 2:** 30
- **Day 3:** 40
- **Day 4:** 50
- **Day 5:** 60
- **Day 6:** 70
- **Day 7:** 80

Daily minimum ops:
- 1) Send new emails (per ramp cap)
- 2) Send follow-ups due today
- 3) Update CRM stage for every prospect touched
- 4) Reply handling SLA: same-day responses to all replies

List hygiene thresholds:
- Pause sending if hard bounces > 5% in a day.
- Remove any “info@/support@” that bounces; swap to contact-form or alternate.

---

## 6) Cold email sequences (ready to paste)
**Personalization tokens:**
- {{business_name}} {{city}} {{service_type}} {{recent_review_snippet}} {{response_gap}} {{google_rating}} {{review_count}}

### 6.1 Direct-to-local — Dentist (Not Responding angle)
**Subject options:**
1) Quick fix for {{business_name}}’s Google reviews
2) Noticed you’re missing replies on Google
3) Can I draft a few review responses for you?

**Email 1**
Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}}. One recent review mentioned {{recent_review_snippet}}.

I run a small “review reply autopilot” that drafts brand-safe responses to Google/Yelp reviews within 12 hours. You can **approve** everything before anything goes out.

Would you be open to a **free 7-day trial**? If you send your Google Business Profile link, I’ll draft responses to your next reviews + flag any negatives for escalation.

Proof/details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Reply “yes” and I’ll send 2–3 drafted replies to start.

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1 (2–3 days later)**
Hi {{first_name}} — should I draft a couple responses for {{business_name}} as an example?

If you’d prefer: I can draft them in a Google Doc so nothing gets posted until you approve.

— Bob

**Follow-up 2 (4–6 days later)**
Last try, {{first_name}}.

If review replies aren’t a priority, no worries. If they are: want me to cover {{business_name}}’s next 7 days of reviews for free (Google + Yelp) and send a weekly KPI recap?

— Bob

### 6.2 Direct-to-local — Med Spa (Low Rating / Recovery angle)
**Subject options:**
1) Quick rating recovery idea for {{business_name}}
2) Review triage for {{business_name}}
3) Can we help with negative reviews?

**Email 1**
Hi {{first_name}},

I saw {{business_name}} is sitting around {{google_rating}} on Google. A recent review mentioned {{recent_review_snippet}}.

We help med spas respond fast and safely: draft empathetic, brand-safe replies, escalate negatives to the owner, and keep response tone consistent (so the profile looks professionally managed).

Could I run this for you **free for 7 days**? You approve everything before it goes live.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

If you reply with your preferred email for approvals, I’ll send 2 drafted responses today.

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1**
Hi {{first_name}},

Worth trying for a week? The goal is simple: faster replies + better handling of negatives so prospects see professionalism when they read reviews.

— Bob

**Follow-up 2**
If someone else handles reviews at {{business_name}}, who should I talk to?

— Bob

### 6.3 Direct-to-local — HVAC/Plumbing (High Volume / Speed angle)
**Subject options:**
1) 12-hour review replies for {{business_name}}
2) Keeping up with Google reviews
3) Quick help with review responses

**Email 1**
Hi {{first_name}},

Noticed {{business_name}} has {{review_count}} Google reviews and new ones coming in recently. One mentioned {{recent_review_snippet}}.

We run a lightweight system that drafts responses to new Google/Yelp reviews within 12 hours and escalates negatives immediately (so you don’t miss revenue from prospects reading your profile).

Want a **free 7-day trial**? You approve replies before posting.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob
agent_bob_replit+review-bot@agentmail.to

**Follow-up 1**
If I draft 3 replies based on your latest reviews, would that help?

— Bob

**Follow-up 2**
Are review replies owned by you or an office manager at {{business_name}}?

— Bob

### 6.4 Agency / Reseller version (bulk lane)
**Subject options:**
1) White-label review replies for your clients
2) Add-on: Google/Yelp response autopilot
3) Quick partnership idea

**Email 1**
Hi {{first_name}},

I’m reaching out because you work with local businesses ({{vertical_focus}}). I run an “AI review reply + reputation autopilot” that drafts brand-safe responses to Google Business Profile + Yelp, escalates negatives, and sends weekly KPI summaries.

Agencies use it as a **white-label add-on**: you keep the client relationship, we handle drafting + workflow. In week 1 we can run a free 7-day pilot for 1 client.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute chat to see if it fits your retainer stack?

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 7) Outbound ops checklist (daily)
**Before sending (10 minutes):**
- Verify today’s list has Priority A/B first
- Check for duplicates + obvious role accounts (support@) unless no alternative
- Ensure personalization_snippet is paraphrased and non-sensitive

**Send block (30–60 minutes):**
- Send Email 1 to new prospects (per ramp cap)
- Send follow-ups due today (keep total under cap)

**After sending (15 minutes):**
- Log: sent count, replies, bounces
- Update CRM stages
- Reply to any responses same day

**Weekly:**
- Pull metrics: sent, open (if available), reply rate, positive reply rate, booked calls
- Tighten targeting: double down on best-performing vertical + segment

---

## 8) What you need from the owner to start immediately
1) Pick geography scope (Top 25 metros / 5–10 states / US-wide)
2) Build first 200 leads using the CSV headers above (Priority A first)
3) Start Day 1 ramp: 20 emails using the matching segment template

If you want, reply with your chosen geo scope and I can tailor the exact metro list + query list order (to maximize Priority A density first).