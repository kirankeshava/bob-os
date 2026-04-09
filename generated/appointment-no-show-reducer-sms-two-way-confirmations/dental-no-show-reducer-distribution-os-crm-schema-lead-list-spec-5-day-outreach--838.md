# Dental No-Show Reducer — Distribution OS (CRM Schema + Lead List Spec + 5-Day Outreach Cadence + Cold Call Script)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:53:31.537Z

---

## 1) CRM/Pipeline (HubSpot-ready)
**Pipeline stages (left to right):**
1. **Prospect Identified** (location exists; contact not confirmed)
2. **Contact Found** (owner/office manager email/phone captured)
3. **Attempting Contact** (sent email/DM or called once)
4. **Engaged** (replied / asked question / requested info)
5. **Demo Booked** (15-min scheduled)
6. **Proposal Sent** (pricing + guarantees sent)
7. **Closed Won (Paid Setup)**
8. **Live (Location Active)**
9. **Retain/Expand** (month-2 renewal / add locations)

**Required fields per location:**
- Practice name, website
- Location address + city/state
- Phone (front desk)
- Decision-maker(s): owner/dentist partner name; office manager name
- Emails: owner email, office manager email, generic office email
- Appointment volume estimate (new patient + hygiene/day if known)
- Current reminders (none / manual calls / vendor)
- Notes: no-show pain, staffing, software mentioned
- Last touch date; next follow-up date
- Source (Google Maps, Yelp, state dental assoc, etc.)

## 2) Lead List Build Spec (200 leads in 2–3 metros)
**Goal:** 200 dental locations with at least 1 verified decision-maker contact (office manager preferred) in 48 hours.

**Geography (fastest):** pick 2–3 metros within one time zone for calling efficiency (e.g., Dallas–Fort Worth, Phoenix, Atlanta). Mix affluent suburbs + high-density areas.

**Target filters:**
- Single-location practices + small groups (1–5 locations)
- General dentistry + family dentistry + cosmetic add-ons (higher value cases)
- Exclude: Medicaid-only clinics, large corporate DSOs (unless small regional), practices with no public phone

**Where to source (free-first):**
1. **Google Maps** search queries: “dentist”, “family dentistry”, “cosmetic dentist” + city
2. **Yelp** (filter by rating/reviews to find busy practices)
3. **State dental association directories** (public listings)
4. Practice websites: “Team” / “Contact” pages to find office manager names

**Contact titles to capture (priority order):**
1. Office Manager / Practice Manager
2. Front Office Manager / Patient Coordinator
3. Owner Dentist / Managing Partner

**Data QA rules:**
- Must have: practice name, phone, city, website OR Google listing
- Must have at least one of: office manager email OR contact form URL OR generic office email
- If only a contact form exists, capture the form URL and submit using the same message as the cold email (include callback number request)

## 3) 5-Day Outreach Cadence (email + LinkedIn + calls)
**Daily activity targets (per day, 5 days):**
- **Email:** 50–100 new sends/day from **agent_bob_replit+no-show-bot@agentmail.to**
- **Calls:** 20–40 calls/day to front desk to reach office manager
- **LinkedIn DMs:** 20–30/day (when profiles exist)

**Sequence (per lead):**
- **Day 1:** Email #1 + call attempt
- **Day 2:** LinkedIn DM + call attempt
- **Day 4:** Email #2 (short follow-up) + call attempt
- **Day 7:** Breakup email (permission-based)

**KPI targets (weekly):**
- Positive reply rate: 5–10%
- Demos booked: 8–15/week
- Close rate from demo: 20–30% (with concierge setup)

**Offer link + legitimacy (include in all comms):**
- Proof URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Email: agent_bob_replit+no-show-bot@agentmail.to

## 4) Cold Call Script (Office Manager + Owner)
**Objective:** book a 15-minute demo; do not pitch every feature.

**Opener (front desk):**
“Hi — is your office manager available for a quick question about appointment confirmations? It’ll take 20 seconds.”

**If they ask what it’s about:**
“We help dental offices reduce no-shows with two-way SMS confirmations and easy rescheduling. I just need to see if it’s relevant before I send details.”

**When office manager is on:**
“Hi [Name], this is Bob. I’m reaching out because we’re helping dental practices cut no-shows using two-way text confirmations and a simple reschedule link. Quick question: do you currently rely more on manual reminder calls, or do you have an automated text system?”

**Qualifying (pick 2):**
1) “Roughly how many patients do you have on the schedule per day?”
2) “Do no-shows/cancellations tend to hit hygiene, new patients, or both?”
3) “When there’s a same-day cancellation, do you have a waitlist process that reliably fills it?”

**Value line (tie to money):**
“The reason I ask is most offices we talk to are losing a few appointments a week that could be confirmed, rescheduled, or filled from a waitlist. We track recovered appointments and estimate recovered revenue per location so you can see the impact.”

**Call to action:**
“If it’s worth it, I can show you the workflow in 15 minutes. No prep needed. What does your calendar look like tomorrow or Thursday?”

**Legitimacy line (if skeptical):**
“Totally fair — you can see the overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2. Or email me at agent_bob_replit+no-show-bot@agentmail.to and I’ll send the exact details.”

## 5) Objection Handling (tight)
**“We already have reminders.”**
“Got it — most offices do. Is it one-way reminders, or can patients confirm/reschedule by texting back? The lift usually comes from two-way confirmations + making rescheduling frictionless, plus filling gaps from a waitlist.”

**“We don’t have time.”**
“That’s exactly why this works — it reduces manual calls and last-minute scramble. The demo is 15 minutes; if it’s not a fit, I’ll tell you.”

**“How much is it?”**
“It’s $399/month per location plus SMS pass-through, with a limited-time concierge setup so we can launch quickly. If you want, I’ll walk you through it on a 15-minute call and you’ll know immediately if it pencils out.”

**“Send info.”**
“Absolutely — what’s the best email? I’ll send a 1-page overview and a link. Also, should I address it to you as the main point person for scheduling/no-shows?”

## 6) 30-Day Collection Target (operating math)
To collect **$10k+ in 30 days**, aim for:
- **10 locations** closed with **$399 month-1** = **$3,990**
- Plus **10 setup fees** at **$399** = **$3,990**
- Plus **6 additional setups** (or 6 month-1s) = **$2,394**
Total ≈ **$10,374 collected** (setup + first month). This requires ~30–50 demos over 30 days at 20–30% close, which is reachable with the outreach cadence above.