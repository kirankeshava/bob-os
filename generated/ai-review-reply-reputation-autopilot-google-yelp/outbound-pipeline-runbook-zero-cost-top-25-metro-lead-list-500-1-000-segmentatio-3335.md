# Outbound Pipeline Runbook (Zero-Cost): Top-25 Metro Lead List (500–1,000) + Segmentation + 3-Step Cold Email + Daily Sending Ops

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-05-14T23:05:17.744Z

---

## 0) Offer (what we’re selling in Week 1)
AI Review Reply & Reputation Autopilot (Google/Yelp): we draft brand-safe replies to reviews, escalate negatives, and send weekly KPI reporting. Week 1 is FREE (7-day trial). Legitimacy link to include in outreach: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Primary contact email to include: agent_bob_replit+review-bot@agentmail.to

---

## 1) Initial list scope (fast + dense)
Target geography for first 500–1,000 leads: Top 25 US metros.
Suggested metros (pick 25): New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, San Jose, Austin, Jacksonville, San Francisco, Columbus, Fort Worth, Indianapolis, Charlotte, Seattle, Denver, Washington DC, Boston, El Paso, Nashville, Detroit, Oklahoma City.

Verticals:
1) Dentists / dental clinics
2) Med spas / aesthetic clinics
3) HVAC + Plumbing (home services)
Parallel lane: marketing agencies offering local SEO/reputation management.

---

## 2) CSV schema (copy/paste headers)
Use exactly these columns (order matters for sending + segmentation):
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10 (0–100%)
- segment_primary (not_responding | low_rating | high_volume)
- priority_tier (A | B | C)
- owner_or_manager_name
- role_guess (Owner | Practice Manager | Office Manager | GM | Marketing Manager)
- email_1
- email_2
- personalization_snippet (short quote or paraphrase from most recent review)
- response_gap_note (e.g., “No owner reply seen in last 10 reviews”)
- notes

---

## 3) How to build 500–1,000 leads with $0 tools (manual/VA workflow)
### Step A — Pull candidates from Google Maps (per metro x vertical)
For each metro, run these queries in Google Maps:
- Dentists: “dentist {city}”, “dental clinic {city}”, “cosmetic dentist {city}”, “family dentistry {city}”
- Med spa: “med spa {city}”, “aesthetic clinic {city}”, “botox {city}”, “laser hair removal {city}”
- Home services: “HVAC {city}”, “air conditioning repair {city}”, “plumber {city}”, “drain cleaning {city}”

Collection rule: capture the top ~10–15 relevant results per query (skip obvious national chains/franchises unless locally owned).

### Step B — Capture the GBP fields
From each Google Business Profile:
- business_name, phone, website, google_rating, review_count, google_maps_url
- Open reviews → set sort to “Newest” → capture last_review_date

### Step C — Compute response_rate_proxy_last10 (fast method)
Open the last 10 reviews (newest). Count how many have an “Owner response.”
response_rate_proxy_last10 = (owner_responses / 10) * 100.

### Step D — Personalization snippet
Take a short excerpt (5–12 words) from the newest review OR paraphrase:
- Safe: “squeezed me in same day” / “staff was very kind”
- Avoid: medical details, sensitive personal data, or anything that implies a diagnosis.

### Step E — Find owner/manager email (free enrichment)
1) Website → Contact / About / Team pages.
2) Look for staff names and emails.
3) If no email listed: use common formats with domain (info@, hello@, office@, admin@, manager@, support@). Prefer role-based addresses to reduce bounce.
4) Check Facebook page “About” for email.
5) Check LinkedIn company page for the practice/clinic; capture manager names (even if no email, store name for personalization).

QA rule: if you cannot find any email and the site has no contact form, deprioritize (or keep as phone-follow-up list).

---

## 4) Segmentation + priority scoring (apply consistently)
Segment rules (primary tag):
- not_responding: response_rate_proxy_last10 ≤ 20% OR 0/10 responses
- low_rating: google_rating < 4.2
- high_volume: review_count ≥ 200 OR last_review_date within last 14 days

Priority tiers:
- Priority A: (not_responding AND high_volume) OR (low_rating AND high_volume)
- Priority B: (not_responding) OR (low_rating)
- Priority C: high_volume only

Routing to copy:
- not_responding → “response gap” email variant
- low_rating → “protect rating + escalation” variant
- high_volume → “ops + 12-hour SLA” variant

---

## 5) Cold email pack (3-step sequence)
All variants include legitimacy link + reply-to email.

### 5.1 Master tokens
- {{first_name}} (if unknown: “there”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{rating}}
- {{review_count}}
- {{response_gap_note}}
- {{vertical_word}} (dental practice / med spa / HVAC company / plumbing company)


### 5.2 Email 1 — Not Responding variant
Subject options (rotate):
1) Quick win for {{business_name}} reviews
2) Are you replying to Google reviews?
3) Small review gap I noticed

Body:
Hi {{first_name}} — I was looking at {{business_name}}’s Google reviews and noticed {{response_gap_note}}.

One of the recent reviews mentioned “{{recent_review_snippet}}”. Those are great moments to reinforce trust, but it’s hard to keep up when you’re busy.

I’m Bob. We run an AI Review Reply & Reputation Autopilot that drafts brand-safe responses for Google/Yelp, escalates negatives, and sends a weekly KPI recap. During the free 7‑day trial, we can respond within 12 hours and you approve everything.

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10‑minute setup this week? If you reply with “yes,” I’ll send 2–3 example replies in your brand voice.

— Bob
agent_bob_replit+review-bot@agentmail.to


### 5.3 Email 1 — Low Rating variant
Subject options:
1) Quick fix to protect your rating
2) Review follow-up for {{business_name}}
3) Can I help with negative reviews?

Body:
Hi {{first_name}} — I’m reaching out because {{business_name}} is at {{rating}} on Google, and recent feedback like “{{recent_review_snippet}}” can really impact new patient/customer calls.

We help local {{vertical_word}} respond fast and consistently: brand-safe drafts, negative-review escalation, and a weekly KPI email. Free 7‑day trial: replies drafted within 12 hours, and you approve before anything posts.

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Would you like me to draft replies to your last 3 reviews (free) so you can see the tone and process?

— Bob
agent_bob_replit+review-bot@agentmail.to


### 5.4 Email 1 — High Volume variant
Subject options:
1) Handling {{review_count}}+ reviews without extra staff
2) Review response SLA for {{business_name}}
3) Keeping up with new reviews

Body:
Hi {{first_name}} — {{business_name}} has {{review_count}} reviews and it looks like new ones come in regularly. Keeping response times tight is a real ops problem.

We run an AI Review Reply & Reputation Autopilot for Google/Yelp: brand-safe reply drafts, negative-review escalation, and weekly KPI reporting. Free 7‑day trial includes a 12‑hour drafting SLA and approval-before-posting.

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Worth a quick 10 minutes to set it up? If you tell me who owns review replies today (you vs staff), I’ll recommend the simplest workflow.

— Bob
agent_bob_replit+review-bot@agentmail.to


### 5.5 Follow-up 1 (Day 2–3) — same for all segments
Subject: Re: {{business_name}} reviews

Hi {{first_name}} — quick bump. Want me to send 2 example replies (in your tone) for “{{recent_review_snippet}}” so you can judge quality before any setup?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

— Bob (agent_bob_replit+review-bot@agentmail.to)


### 5.6 Follow-up 2 (Day 6–7) — same for all segments
Subject: Should I close the loop?

Hi {{first_name}} — if review responses aren’t a priority right now, no worries.

If you want, I can still draft replies for the last 3 reviews (free) and send them over email. If it’s useful, we can talk about the 7‑day autopilot trial.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 6) Agency/reseller lane (faster LTV)
Targets: local SEO agencies, reputation management agencies, web design shops serving dentists/med spas/home services.
Where to find (free): Google searches “dental marketing agency {city}”, “med spa marketing agency”, “local SEO agency {city} reputation management”.
Offer: white-label or co-branded reply autopilot + weekly KPI report. Agency gets margin; we provide fulfillment.

Agency Email 1:
Subject: Add review-reply autopilot to your packages?

Hi {{first_name}} — do you offer reputation management for local clients?

We built an AI Review Reply & Reputation Autopilot for Google/Yelp (brand-safe drafts, negative escalation, weekly KPIs). Agencies use it to improve response rate and protect ratings without adding headcount.

Info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a quick call? I can also send a sample weekly KPI report and the approval workflow.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 7) Daily sending ops (zero-cost stack)
### Tools (free)
- Sending: Gmail (or existing Workspace). Keep volume conservative.
- CRM: Trello (free) or Google Sheets.
- Tracking: none initially (avoid links beyond the legitimacy page). Measure via replies + booked calls.

### 14-day ramp (per inbox)
- Days 1–2: 10 emails/day
- Days 3–4: 20/day
- Days 5–7: 30/day
- Week 2: 40–50/day if bounce < 3% and complaint = 0

Rules:
- Plain text only, 1 link max (the legitimacy page), no attachments.
- Stop sending to a list if bounces exceed 5% in any 50-email window.
- Reply handling SLA: respond to any positive reply within 2 hours during business day.

### Daily workflow (60–90 minutes)
1) Add 25–50 new leads to CRM (Priority A first).
2) Send Email 1 to new leads.
3) Send Follow-up 1 to leads sent 2–3 days ago with no reply.
4) Send Follow-up 2 to leads sent 6–7 days ago with no reply.
5) Log outcomes: Interested / Not now / Wrong contact / Bounce.

---

## 8) CRM stages (simple and strict)
- Prospect (in list, not contacted)
- Sent E1
- Follow-up queued
- Replied — Interested
- Replied — Not now
- Qualified (has Google/Yelp + volume + clear owner)
- Demo Booked
- Trial Active (7 days free)
- Converted (post-week-1 paid later)
- Lost (no fit / hostile / unreachable)

Exit criteria:
- Move to “Qualified” only if they confirm they control review responses and have Google Business Profile access (or can invite).

---

## 9) Production targets to hit 500–1,000 leads without paid tools
- 1 trained VA/human can collect ~80–120 leads/day if focusing on GBP fields + basic emails.
- Plan: 5 days × 120/day ≈ 600 leads.
- QA sampling: every 50 leads, sample 5 for correctness (category match, real website, email present, last review date captured).

If you want the fastest path: build first 200 leads (Priority A/B heavy) and start sending immediately while the rest of the list is still being built.
