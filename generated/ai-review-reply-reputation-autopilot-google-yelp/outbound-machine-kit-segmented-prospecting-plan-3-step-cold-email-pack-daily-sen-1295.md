# Outbound Machine Kit — Segmented Prospecting Plan + 3-Step Cold Email Pack + Daily Sending Ops (AI Review Reply & Reputation Autopilot)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T14:03:18.031Z

---

## 1) Offer (what we’re selling)
**AI Review Reply & Reputation Autopilot (Google/Yelp)**
- Drafts brand-safe responses to new reviews (Google + Yelp)
- Escalates negative reviews fast (internal alert + suggested make-good)
- Weekly KPI report: rating trend, response rate, time-to-respond, negative review alerts
- Promise: **responses within 12 hours** (business hours), **you approve** (or “auto-post after approval window” later)

**Legitimacy link:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
**Contact:** agent_bob_replit+review-bot@agentmail.to

---

## 2) ICP + Verticals (start here)
Pick 2–3 verticals for the first 30 days:
1) **Dentists** (high LTV, steady review flow)
2) **Med spas / aesthetics** (very review-sensitive; high competition)
3) **HVAC + Plumbers** (high call intent; fast response matters)

### High-intent triggers (prioritize)
- **Not responding:** owner responses in last 10 reviews ≤ 20% (or none)
- **Low rating:** rating < 4.2
- **High volume:** review_count ≥ 200 OR last_review_date within last 14 days

### Priority scoring (simple routing)
- **Priority A:** (Not responding AND High volume) OR (Low rating AND High volume)
- **Priority B:** Not responding OR Low rating
- **Priority C:** High volume only

**Template routing:**
- Not responding → “response gap” angle (speed + consistency)
- Low rating → “recovery + escalation” angle (contain damage)
- High volume → “ops + throughput” angle (you’re too busy to keep up)

---

## 3) Lead list CSV schema (headers)
Create a CSV with these columns (copy/paste headers):
- business_name
- vertical
- city_state
- website
- phone
- google_maps_url
- google_rating
- review_count
- last_review_date
- response_rate_proxy_last10 (0–100)
- segment (not_responding | low_rating | high_volume | multi)
- priority (A | B | C)
- owner_or_manager_name (best guess)
- role_guess (Owner | Practice Manager | Office Manager | GM | Marketing)
- email_1
- email_2
- personalization_snippet (recent review excerpt OR paraphrase)
- notes

**Segmentation rules:**
- not_responding = response_rate_proxy_last10 <= 20
- low_rating = google_rating < 4.2
- high_volume = (review_count >= 200) OR (TODAY - last_review_date <= 14 days)
- segment = “multi” if more than one condition is true

**Personalization safety:** If the review contains sensitive personal info, **paraphrase** (don’t quote names/conditions). Keep it to one sentence.

---

## 4) Cold email — 3-step sequence (Local business)
Use one of the segment variants below for Email 1. Follow-ups are shared.

### Common personalization tokens
- {{first_name}} (if unknown: “Hi there,”)
- {{business_name}}
- {{city}}
- {{recent_review_snippet}}
- {{response_gap}} (example: “looks like the last few reviews didn’t get a reply”)
- {{vertical_specific}} (e.g., “new patient calls”, “bookings”, “service calls”)

### SUBJECT LINES (rotate)
- “Quick question about your Google reviews”
- “{{business_name}} — review replies”
- “Small fix that protects your rating”
- “12-hour review responses for {{business_name}}”

---

### EMAIL 1A (Segment: NOT RESPONDING) — Dental
**Subject:** {{business_name}} — review replies

Hi {{first_name}},

I was looking at {{business_name}}’s Google reviews and noticed {{response_gap}} — for example: “{{recent_review_snippet}}”.

We run a small **Review Reply & Reputation Autopilot** for dental practices: we draft **brand-safe** responses for Google (and Yelp if you use it), route negative reviews for quick escalation, and send a weekly KPI summary. You can **approve every reply**.

If you want, I can show you what this would look like for {{business_name}} (including a few drafted replies) and the workflow. Info here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute call this week? Or reply “drafts” and I’ll email 3 sample responses.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

### EMAIL 1B (Segment: LOW RATING) — Med Spa
**Subject:** Small fix that protects your rating

Hi {{first_name}},

I saw a recent review for {{business_name}} that mentioned: “{{recent_review_snippet}}”. When reviews skew negative, the **response quality + speed** often makes the biggest difference in whether the situation gets contained (and whether the reviewer updates).

We provide a **brand-safe review response autopilot** for med spas/aesthetics: draft replies within 12 hours, flag anything negative for escalation, and track weekly reputation KPIs. You approve before posting.

If I send 2–3 example replies tailored to your brand voice, would that be helpful? (Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

— Bob
agent_bob_replit+review-bot@agentmail.to

---

### EMAIL 1C (Segment: HIGH VOLUME) — HVAC/Plumbing
**Subject:** 12-hour review responses for {{business_name}}

Hi {{first_name}},

{{business_name}} is getting steady review volume (nice problem to have). The hard part is keeping up so prospects see quick, professional replies—especially when they’re choosing who to call.

We handle this with an **AI-assisted, brand-safe review reply workflow** for HVAC/plumbing: draft responses within 12 hours, escalate negatives immediately, and send a weekly KPI report. You can approve everything.

Worth a quick chat to see if it fits your workflow? You can also reply “sample” and I’ll send a few drafted replies based on your recent reviews.

— Bob
agent_bob_replit+review-bot@agentmail.to
(overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1)

---

### FOLLOW-UP 1 (Day 3–4)
**Subject:** Re: {{business_name}} reviews

Hi {{first_name}},

Quick follow-up—do you have someone actively replying to Google/Yelp reviews right now?

If you tell me your preferred tone (friendly/short/clinical/premium), I’ll send **3 sample responses** for {{business_name}} based on recent reviews. No setup required.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

### FOLLOW-UP 2 (Day 7–9)
**Subject:** Should I close this out?

Hi {{first_name}},

Should I close the loop here?

If review replies are already covered, no worries. If not, we can usually improve:
- response rate (last 10 reviews)
- time-to-respond
- handling of negatives (escalation + consistent tone)

Reply “drafts” and I’ll send examples, or suggest who owns reviews at {{business_name}}.

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 5) Cold email — Agency/reseller lane (initial)
**Subject:** White-label review reply autopilot for your clients?

Hi {{first_name}},

If you manage local business marketing (dentists/med spas/home services), reviews are one of the few levers that directly affects conversion.

We provide a **white-label friendly Review Reply & Reputation Autopilot** (Google/Yelp): brand-safe drafts within 12 hours, negative review escalation, and weekly KPI reporting. Your team can approve everything, and you can resell it as an add-on.

If you want, I can share a simple workflow + sample report: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

Open to a 10-minute chat?

— Bob
agent_bob_replit+review-bot@agentmail.to

---

## 6) Daily sending ops (14-day ramp + guardrails)
### Minimum viable sending stack (free-first)
- 1 inbox (existing provider) + basic spreadsheet CRM
- Track opens optionally (avoid heavy tracking early if deliverability issues)

### Daily targets (starting)
- Day 1–2: 20/day (new prospects)
- Day 3–4: 30/day
- Day 5–7: 40/day
- Week 2: 50–80/day (if bounces < 3% and spam complaints = 0)

### Follow-up discipline
- Send follow-up 1 to non-replies at Day 3–4
- Send follow-up 2 to non-replies at Day 7–9
- Stop after 3 total touches unless they engage

### Deliverability guardrails
- Bounce rate target: < 3% (pause list if > 5%)
- Spam complaints: 0 (pause immediately if any; review copy + list)
- Reply SLA: respond within 2 business hours to interested leads

### Reply handling
- Positive: ask 2 qualifying questions (platforms used? approval preference?) + propose 2 time slots
- Neutral: offer “3 drafted replies” deliverable
- Negative: polite opt-out confirmation; add to suppression list

---

## 7) CRM stages (simple)
1) **Prospect (Ready)** → validated email + segment + snippet
2) **Sent** → Email 1 sent
3) **Follow-up 1 Sent**
4) **Follow-up 2 Sent**
5) **Replied**
6) **Qualified** (has Google/Yelp presence + wants help + decision maker)
7) **Demo Booked**
8) **Trial/Proof** (sample replies + workflow)
9) **Paid**
10) **Lost / Not now** (with reason)

**KPI targets (weekly):**
- 8–15% reply rate on Priority A
- 1–3% meeting booked rate overall
- <3% bounces

---

## 8) Next action required (to unlock the 500–1,000 CSV)
Choose the initial geography scope:
- Option A: **Top 25 US metros** (fastest to pull, high density)
- Option B: **5–10 states** (more consistent licensing/service areas)
- Option C: **US-wide** (largest, but messier)

Once chosen, use the CSV schema above + segmentation rules to build the first 200 leads, then scale to 500–1,000.

Contact for coordination: agent_bob_replit+review-bot@agentmail.to
