# Dental/Ortho Lead Sourcing + CRM + Outreach Engine (SOP, Schemas, Cadence, Copy)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:12:11.473Z

---

## 1) ICP + Targeting (single vertical to scale)
**Primary ICP:** Independent Dental + Orthodontic practices (1–5 locations) in US/Canada with a front desk/office manager and recurring scheduled appointments.
**Exclude:** Dental labs, suppliers, schools, DSOs/corporate brands (Smile Brands, Aspen, Heartland), emergency-only clinics, mobile-only providers.
**Priority signals:** Online booking widget, clear scheduling phone number, new-patient intake, multiple hygienists, “request appointment” forms.

---
## 2) Lead List Schema (Google Sheets/CSV columns)
**Required columns (minimum for outreach):**
1. Lead ID (auto)  
2. Practice Name  
3. Vertical (Dental/Ortho)  
4. City  
5. State/Prov  
6. Country  
7. Phone (main scheduling line)  
8. Website URL  
9. Google Maps URL (or Yelp URL)  
10. Decision Maker Name (Owner/Dentist/Practice Manager/Office Manager)  
11. Role (Owner / Office Manager / Practice Manager)  
12. Email (best)  
13. Email Source (Website / Contact page / Staff page / Directory / Guess)  
14. Email Confidence (High/Med/Low)  
15. Booking Software/Widget (Zocdoc, NexHealth, Solutionreach, LocalMed, Weave, Doctible, unknown)  
16. Notes (e.g., “mentions missed appts”, “accepting new patients”)  

**Outreach tracking columns (CRM fields; see section 4):**
17. Stage  
18. Last Touch Date  
19. Next Step Date  
20. Touch Count  
21. Channel (Email/SMS/Call/CL/FB/Upwork)  
22. Outcome/Reply Tag (Interested / Not now / Wrong contact / Unsubscribe / Bounced)  
23. Demo Booked? (Y/N + date)  
24. Est. Monthly Appts (if learned)  
25. Est. No-Show % (if learned)  
26. Est. Revenue Recovered (calc placeholder)  

**Validation rules (QA):**
- Phone must be 10 digits (US/CA) and match website contact page if possible.
- Website must load (no dead domain). If no website, keep but mark “No site”.
- Email Confidence:
  - **High:** email appears on practice domain (e.g., info@practice.com) on contact page.
  - **Med:** directory email or staff email on domain but not clearly DM.
  - **Low:** guessed pattern (first@domain) without confirmation.
- Do not add leads with only generic corporate contact forms unless phone exists.

---
## 3) Lead Sourcing SOP (repeatable, 400–800/week)
### A) Google Maps sourcing (fastest baseline)
**Search queries (copy/paste):**
- “dentist near me” + set location city/state
- “family dentistry” + city
- “cosmetic dentist” + city
- “orthodontist” + city
- “pediatric dentist” + city

**Process (per city):**
1. Open Google Maps, search query.
2. Filter by rating count (prefer 20+ reviews for active practices).
3. For each practice, capture: name, phone, website, maps URL.
4. Open website → find Contact / About / Team page.
5. Capture best email:
   - Priority order: office manager/practice manager email > scheduling email > info@ > contact@.
6. Note any booking software/widget visible (footer badges, embedded widgets).
7. Log into sheet with confidence score.

**Quota:** ~25–40 leads/hour depending on email availability.

### B) Yelp sourcing (fills gaps; often has direct site links)
**Search:** Yelp → “Dentists” in city → capture phone/website.
**Rule:** If Yelp has no website, keep only if phone is strong + practice looks independent.

### C) State dental association directories (higher quality for owner names)
**Search queries:**
- “{State} dental association member directory”
- “{Province} dental college register”
- “licensed dentist lookup {State}”
**Use:** Pull owner/dentist names; then match to practice website for email.

### D) Decision-maker enrichment (no-paid-tools method)
1. Check website Team/About for “Office Manager”, “Practice Administrator”.
2. If no email shown:
   - Use contact form only as a last resort; prioritize phone + generic email.
   - If the domain is present, create a **Low confidence** guess only if pattern is obvious (e.g., first.last@domain seen elsewhere).
3. Always keep phone; SMS/Call follow-ups can convert even with generic emails.

---
## 4) CRM in Google Sheets (template structure)
**Tab 1: Leads** (all columns in Section 2)
**Tab 2: Pipeline Views**
- Filter views by Stage (New, Contacted, Engaged, Demo Booked, Trial, Won, Lost)
**Tab 3: Daily Work Queue**
- Formula pulls rows where Next Step Date = TODAY()
- Columns: Practice, Contact, Channel, Next Action, Link to record

**Stage dropdown values + rules:**
1. **New** (not touched)
2. **Contacted – Email 1 Sent**
3. **Contacted – Email 2 Sent**
4. **Attempting – Call/SMS**
5. **Engaged (Reply received)**
6. **Qualified** (has appointment volume + scheduling pain)
7. **Demo Booked**
8. **Trial/Setup**
9. **Won (Paying)**
10. **Lost (Not fit / Unresponsive / Competitor / No consent)**

**Required fields to move to Qualified:** phone + website + contact role + at least one reply.

---
## 5) Outreach Cadence (14 days; multi-touch; dentist + office manager variants)
**CTA for all:** “Can I show you a 10-minute walkthrough?” + legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
**Reply email:** agent_bob_replit+no-show-bot@agentmail.to

### Sequence A — Owner/Dentist (focus: recovered production)
**Day 1 – Email 1**
Subject options:
1) “Quick idea to cut no-shows at {{Practice}}”
2) “Recovering missed chair time (no new staff)”

Body:
Hi Dr. {{LastName}},

I’m reaching out because most practices quietly lose a few appointments/week to no-shows or last-minute cancels. We built a simple SMS reminder + two-way confirmation flow that reduces no-shows and helps fill gaps from a waitlist.

If I can show you a 10-minute walkthrough and estimate recovered revenue for {{Practice}}, would you be open to it?

Details/legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

**Day 3 – Email 2 (value + question)**
Subject: “Worth reducing confirmations by phone tag?”

Hi Dr. {{LastName}},

Do you currently rely on manual confirmation calls/texts, or does your system do two-way confirmations automatically?

If you tell me what you’re using (Weave/Doctible/Solutionreach/etc.), I’ll reply with the simplest way we’ve seen practices reduce no-shows without adding workload.

– Bob

**Day 6 – Email 3 (social proof without making up logos)**
Subject: “Typical result: fewer last-minute gaps”

Hi Dr. {{LastName}},

What we’re implementing is straightforward:
- smart reminders timed to the appointment type
- patient replies confirm/reschedule
- cancelled slots trigger waitlist outreach
- simple analytics to quantify recovered chair time

If no-shows/cancels are even a small headache, want me to run through it quickly?

– Bob

**Day 9 – Email 4 (breakup)**
Subject: “Close the loop?”

Hi Dr. {{LastName}},

Should I talk to your office manager about reminders/confirmations, or is this not a priority right now?

– Bob

### Sequence B — Office Manager/Practice Manager (focus: less front-desk work)
**Day 1 – Email 1**
Subject options:
1) “Two-way confirmations for {{Practice}} (less phone tag)”
2) “Front desk time-saver: confirmations + reschedules”

Body:
Hi {{FirstName}},

We help practices reduce no-shows by sending SMS reminders that patients can reply to (confirm / need to reschedule). When someone cancels, we can automatically message a waitlist to fill the gap.

If you’re the right person for scheduling/confirmations, can we do a 10-minute walkthrough?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

**Day 2 – Email 2 (one question)**
Subject: “What are you using now?”

Quick question: are confirmations mostly manual right now, or through a tool (Weave/Doctible/Solutionreach/etc.)?

– Bob

**Day 5 – Email 3 (pain-oriented)**
Subject: “Filling last-minute cancels”

If you get same-day cancels, do you keep a waitlist, or does the slot usually stay empty?

We can show a simple flow that texts the waitlist automatically when a cancellation happens.

– Bob

**Day 8 – Email 4 (hand-off)**
Subject: “Wrong person?”

If scheduling/confirmations isn’t you, who should I reach out to?

– Bob

### Reply-handling snippets
- **If interested:** “Great—what does your appointment volume look like per week and what system do you schedule in? I’ll tailor the walkthrough.”
- **If objection (already have reminders):** “Totally—does yours support two-way confirmation + automated waitlist fill? If yes, ignore me. If not, that’s the gap we cover.”
- **If not now:** “Understood—when should I follow up? Also, is no-show reduction a top 3 issue or more minor?”

---
## 6) Craigslist + FB Groups Posting Schedule + Compliance
**Craigslist:** rotate across 10–20 metros/week (Services → Business/Medical/Small Biz support depending on city categories). Post 1/day; do not repost same copy within 48–72 hours; vary titles.
**FB Groups:** only post where rules allow promo; lead with educational mini-audit offer (e.g., ‘I’ll estimate your no-show cost’). Comment-first strategy in strict groups.

**Compliance checklist:**
- No ALL CAPS, no repeated links, no “guarantees”, no spam blasts.
- Always include legitimacy URL (above) + contact email agent_bob_replit+no-show-bot@agentmail.to.
- Offer value (audit/checklist), not “buy now”.

---
## 7) Seed-list build plan (execution)
**Goal:** Build 150–200 seed leads first to validate QA and response rates, then scale to 400–800.
1. Pick 8–12 cities with dense dental inventory (e.g., Phoenix, Dallas, Atlanta, Tampa, Denver, Charlotte, Nashville, San Diego).
2. Pull 20–30 leads/city from Maps + Yelp.
3. Enrich emails from websites; log confidence.
4. Start outreach only to High/Med confidence leads; keep Low for call/SMS.
5. Track bounce/reply rates; adjust sourcing rules.

This package is ready to implement directly in Google Sheets and begin compiling the seed list immediately.