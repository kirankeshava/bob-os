# No-Show Reducer: Lead Sourcing SOP + CRM Template + Cold Email Sequences (Dental/Ortho)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T17:01:18.860Z

---

## 1) Target ICP (for fastest close)
**Vertical:** Independent dental + orthodontic practices (1–5 locations) in US/Canada
**Strong-fit signals (prioritize):**
- Online booking OR prominent “Request appointment” flow
- Mentions “missed appointments/cancellation policy” or “24-hour notice”
- Reviews mentioning wait times / scheduling issues
- Uses practice software/booking widgets (NexHealth, LocalMed, Solutionreach, Weave, Demandforce, etc.)

---
## 2) Lead List Schema (columns you must capture)
Use these exact columns so outreach + tracking works at scale.

**Business & location**
1. lead_id (YYYYMMDD-city-initials-#)
2. business_name
3. location_name (if multi-location)
4. address
5. city
6. state_province
7. postal_code
8. country
9. google_maps_url
10. yelp_url (optional)
11. website_url
12. main_phone

**Decision maker contact**
13. primary_contact_name
14. primary_contact_role (Owner/Dentist/Practice Manager/Office Manager)
15. primary_contact_email
16. email_source (website/staff page/contact form/guess+pattern)
17. confidence (High/Med/Low)
18. secondary_contact_name (optional)
19. secondary_contact_email (optional)

**Operations / fit notes**
20. booking_method (phone / online form / online calendar)
21. software_hint (if visible: Weave/Demandforce/etc.)
22. open_hours (optional)
23. review_count
24. rating
25. notes (1–2 lines max; anything relevant)

**Outreach tracking**
26. stage (dropdown: New, Researched, Contacted, Engaged, Booked, No-Show, Closed-Won, Closed-Lost, Nurture)
27. last_touch_date
28. next_touch_date
29. channel (Email/Phone/SMS/Upwork/CL/FB)
30. sequence (Owner-v1 / Manager-v1)
31. replies_summary

---
## 3) QA Rules (so the list is usable)
- **Must-have:** business_name + city/state + phone + website OR google_maps_url.
- **Email quality:**
  - High confidence = email appears on site OR staff directory OR exact match on contact page.
  - Medium = email pattern found (e.g., firstname@domain) with named staff.
  - Low = generic (info@) only.
- **No duplicates:** dedupe by website_url OR phone.
- **Relevance filter:** exclude DSOs/large chains (>10 locations) unless they have clearly autonomous location managers.

---
## 4) Lead Sourcing SOP (daily engine)
Goal: **150–200 leads/day per researcher** (scales to 400–800/day with 2–4 reps).

### Step A — Pull targets (Google Maps)
Search queries (rotate):
- “dentist near me” + [City]
- “family dentistry” + [City]
- “orthodontist” + [City]
- “cosmetic dentist” + [City]

Process:
1. Open Google Maps results list.
2. For each practice: open profile → capture name, phone, address, website, maps link.
3. Add to sheet as **stage=New**.

### Step B — Enrich decision-maker email (website)
On the practice website, check in order:
1. **Team / About / Our Doctors** pages (best for names)
2. **Contact** page (emails sometimes hidden)
3. **Footer** (sometimes shows email)

Email heuristics:
- If you find names but no emails: capture name + role, then infer pattern:
  - common patterns: firstname@domain, firstinitiallastname@domain, firstname.lastname@domain
- If only generic emails exist, still capture them (info@/hello@) and mark confidence Low.

### Step C — Verify quickly (lightweight)
- Ensure domain in email matches website domain.
- If unsure, keep but mark **confidence=Low**.

### Step D — Prioritize
Sort for outreach priority:
1. High confidence email + online booking
2. Medium confidence email + high review volume
3. Low confidence but good fit (keep for later)

---
## 5) CRM Pipeline (Sheets-ready)
Create a Google Sheet with:
- Tab 1: Leads (all columns above)
- Tab 2: Activity Log (date, lead_id, channel, message_type, outcome, next_touch_date)

**Stage definitions + next-step rules**
- New → must be researched within 48h
- Researched → must be contacted same day
- Contacted → next_touch within 2 business days
- Engaged (replied/asked Qs) → next_touch within 24h
- Booked → send calendar confirmation + SMS confirmation prompt
- No-Show → re-engage within 2h, offer reschedule
- Closed-Won → onboarding checklist
- Closed-Lost → reason captured + 30-day nurture
- Nurture → monthly value email

---
## 6) Cold Email Sequences (reference legitimacy URL + business email)
Use these from **agent_bob_replit+no-show-bot@agentmail.to**. Keep personalization to 1 line.
Legitimacy URL to include when relevant: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Sequence A (Owner/Dentist) — 4 touches
**Subject options:**
1) “Quick question about missed appointments”
2) “Reducing no-shows at {{Practice}}”
3) “Filling last-minute gaps (waitlist)?”

**Email 1 (Day 1)**
Hi {{FirstName}} — quick one.

Do you have a consistent system to reduce no-shows and last-minute cancellations at {{Practice}}?

We run a lightweight SMS reminder + two-way confirmation flow (patients confirm/cancel, then it auto-offers reschedules and can ping a waitlist to fill gaps). We also show simple analytics on recovered appointments/revenue.

If you’re open, I can share a 10-minute walkthrough and a ballpark estimate of what you could recover per month.

Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Best,
Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3)**
Hi {{FirstName}} — following up.

Most practices we talk to don’t need “more marketing”; they need fewer holes in the schedule.

If you tell me roughly:
1) appointments/day and 2) typical no-show %,
I’ll reply with a simple recovered-revenue range.

Want me to run that math for {{Practice}}?
— Bob

**Email 3 (Day 6)**
Hi {{FirstName}}, would it be better to coordinate with your office manager/practice manager for scheduling workflows?

If yes, who’s best to loop in?

— Bob

**Email 4 (Day 10)**
Last note — if reducing no-shows isn’t a priority right now, no problem.

If you want, I can send a 1-page outline of the reminder/confirmation/reschedule flow we implement (and what data we track) so you can compare it to your current process.

Reply “flow” and I’ll send it.
Bob

### Sequence B (Office Manager/Practice Manager) — 4 touches
**Subject options:**
1) “Cutting no-shows (two-way confirmations)”
2) “Idea to fill last-minute cancellations”
3) “Question about your reminder process”

**Email 1 (Day 1)**
Hi {{FirstName}} — I’m reaching out because you likely own scheduling operations at {{Practice}}.

We help clinics reduce no-shows with:
- SMS reminders
- two-way confirmations (patients confirm/cancel)
- automated reschedule prompts
- optional waitlist pings to fill gaps
- basic reporting on appointments recovered

If I asked you: “How many holes did we have last week from same-day cancels/no-shows?” would you know quickly? If not, that’s exactly what our reporting makes visible.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Open to a quick 10-minute call to see if it fits your current workflow?

Thanks,
Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3)**
Hi {{FirstName}} — quick follow-up.

What are you using today for reminders/confirmations (calls, Weave, Demandforce, Solutionreach, texts, something else)?

If you reply with the tool, I’ll tell you the most common no-show failure point we see with it and how to patch it without adding staff time.

— Bob

**Email 3 (Day 6)**
If you’re the right person: would you be open to piloting this for 14 days on one provider’s schedule?

We measure: confirmations, cancels captured early, reschedules booked, and gaps filled.

— Bob

**Email 4 (Day 10)**
Should I close the loop, or is there a better time next month to revisit no-show reduction?

— Bob

---
## 7) Reply handling snippets (paste-ready)
**If interested:**
“Great — what does your typical week look like for (a) # of appointments and (b) no-shows/cancels? Also, what are you using for reminders today? I’ll tailor the walkthrough. You can also email me here: agent_bob_replit+no-show-bot@agentmail.to and I’ll send next steps + the overview link.”

**If ‘we already use texts/Weave/etc.’:**
“Makes sense. The gap we usually see is two-way confirmations that automatically trigger reschedules + waitlist fills, plus a simple recovered-revenue view per location. If I asked for a 10-minute comparison, who’s best to include?”

**If not now:**
“No worries—what month should I follow up? I can also send the 1-page flow if helpful.”

---
## 8) Craigslist + FB Groups ops checklist (anti-ban)
- Post **value-first** (tips/checklist) and offer the tool as an optional follow-up.
- Do not paste the same exact text across metros; rotate 3 variants.
- Limit Craigslist: 1 post/metro every 48–72h; rotate categories (services → business; small biz ads depending on city rules).
- FB Groups: read rules; avoid links in first post if disallowed—offer to DM the overview; keep legitimacy URL ready.

---
## 9) Daily quotas to reach 400–800 leads
- 1 researcher: 150–200 leads/day with 30–40% having at least a generic email.
- With enrichment focus (DM names + direct emails): 80–120/day but higher close rate.
- Recommended split (per day):
  - 120 fast-collect leads (phone+site)
  - 50 deep-enriched leads (named manager + best-guess email)

This pack is ready for execution: build the sheet, start sourcing from top metros, and run Sequence A/B immediately using the legitimacy URL and contact email.
