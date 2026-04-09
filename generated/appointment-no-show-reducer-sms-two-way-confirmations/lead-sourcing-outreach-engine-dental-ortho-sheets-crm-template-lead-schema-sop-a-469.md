# Lead Sourcing + Outreach Engine (Dental/Ortho) — Sheets CRM Template, Lead Schema, SOP, and Cold Email Sequences

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T07:21:15.925Z

---

## 1) Lead List Schema (CSV/Google Sheets)
Create a sheet named **Leads_Master** with these columns (left→right). Use data validation where noted.

**Core identifiers**
1. Lead ID (YYYYMMDD-###)
2. Vertical (dropdown: Dental, Ortho)
3. Practice Name
4. Location Count (1 / 2–5 / 6+)
5. City
6. State/Province
7. Country
8. Address
9. Google Maps URL
10. Yelp URL (optional)
11. Website URL
12. Main Phone (E.164 if possible)
13. Textable? (Yes/No/Unknown)

**Decision maker + contacts**
14. Owner/Doctor Name
15. Owner/Doctor Role (Owner/Doctor/Partner)
16. Owner/Doctor Email
17. Office Manager Name
18. Office Manager Email
19. Scheduling/Front Desk Email (e.g., info@, scheduling@)
20. Contact Page URL
21. Best Contact Method (dropdown: Email, Phone, Both)

**Operations signals (qualifiers)**
22. Online Booking Present? (Yes/No)
23. Booking Tool (Zocdoc, NexHealth, Solutionreach, Weave, Unknown)
24. Reviews Count
25. Rating
26. Hours Listed (Yes/No)
27. Waitlist Mentioned? (Yes/No)
28. Notes (free text)

**Outreach tracking**
29. Stage (dropdown: New, Validated, Contacted-Email1, Contacted-Email2, Contacted-Email3, Replied, Discovery Booked, No-Show Risk Audit Sent, Won, Lost, Nurture)
30. Last Touch Date
31. Next Touch Date
32. Channel (Cold Email, Phone, SMS, Craigslist, FB Group, Upwork)
33. Email Status (Unknown/Valid/Risky/Bounced)
34. Outcome Notes

### QA rules (quick)
- **Must-have before outreach:** Practice Name, City/State, Website OR Google Maps URL, Main Phone.
- **Target quality bar:** at least one email (Owner/OM/Front desk). If none found, keep but mark Email Status=Unknown and prioritize phone.
- **Avoid chains:** if Location Count=6+ mark as “Lower Priority” in Notes.

---

## 2) Google Sheets CRM Template (tabs + columns)
Create 3 tabs: **Leads_Master**, **Pipeline**, **Activity_Log**.

### Tab: Pipeline (owner-facing)
Columns:
- Practice Name
- Primary Contact (Name)
- Primary Email
- Phone
- City/State
- Stage (dropdown above)
- Deal Value (Recovered $ estimate)
- Last Touch
- Next Step (dropdown: Send Email, Call, SMS, Send Audit, Book Demo, Follow-up)
- Next Touch Date
- Notes

Stage definitions (rules):
- **New:** scraped, not yet checked.
- **Validated:** website/phone verified; at least 1 plausible email OR phone confirmed.
- **Contacted-Email1/2/3:** sequence steps sent; set Next Touch automatically (manual entry ok).
- **Replied:** any reply; must set Next Step within 24h.
- **Discovery Booked:** call scheduled; confirm via email + SMS if possible.
- **No-Show Risk Audit Sent:** sent mini-audit (see below note) and asked for 10-min review.
- **Won/Lost/Nurture:** terminal states.

### Tab: Activity_Log
- Date
- Practice Name
- Channel
- Action
- Result
- Follow-up date

---

## 3) Lead Sourcing SOP (Daily engine)
Goal: **80–150 validated leads/day per researcher** (scales to 400–800/week).

### Step A — Pull targets from Google Maps (fastest)
1. Search queries (rotate by city):
   - “dentist + [city]”
   - “orthodontist + [city]”
   - “family dentistry + [city]”
2. Open top results; prioritize:
   - Independent practices (not Aspen/DentalCorp etc.)
   - Has a website + listed phone
   - Reviews > 20 (signals active operations)
3. Capture: name, address, phone, website, maps URL, rating/reviews.

### Step B — Website contact capture (decision-maker emails)
1. Visit website → look for “Contact”, “Team”, “About”, “Meet the Doctor”, footer.
2. Pull emails in this order:
   - Office manager/direct email if listed
   - Scheduling/front desk email
   - Owner/doctor email
   - Generic info@ as fallback
3. If no email on site:
   - Check Facebook page link from site
   - Check “Privacy Policy” / “Terms” pages (often contains email)
   - If still none, mark Email Status=Unknown and keep phone-first.

### Step C — Enrichment heuristics (no paid tools)
- Identify booking tool: look for “Schedule Online” button (Zocdoc/NexHealth/Solutionreach/Weave widgets).
- Identify waitlist potential: look for “call for cancellations”, “same-day appointments”, “emergency visits”.

### Step D — Validation
- Ensure phone matches Google listing.
- Ensure website is live.
- Remove duplicates (same phone/address).

Daily quota suggestion:
- 120 scraped → 90 validated → 60 with at least one email.

---

## 4) Cold Email Sequences (2 variants)
**Legitimacy URL (include in every email):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
**Contact email:** agent_bob_replit+no-show-bot@agentmail.to

### Sequence A: Owner/Doctor (3 touches)
**Email 1 (Day 1)**
Subject options:
- “quick question about no-shows at {{Practice}}”
- “reducing last‑minute cancellations in {{City}}”

Body:
Hi Dr. {{LastName}},

I’m Bob. I help appointment-based practices reduce no-shows by sending 2-way SMS confirmations + smart reminders and making it easy for patients to reschedule (instead of disappearing).

If you’re open to it, I can show you a simple setup that typically recovers a few appointments/month without changing your scheduling workflow.

Would you like me to run a quick no-show risk check for {{Practice}} and send back the key gaps + an estimate of recovered revenue?

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3)**
Subject: “worth a look?”

Hi Dr. {{LastName}},

Common pattern I see in dental/ortho: patients intend to show, but they miss the reminder or can’t confirm quickly. Two-way confirmation + a “reschedule now” path cuts that.

If I send 3 questions, can you (or your office manager) answer them and I’ll reply with an estimate of what you’d recover monthly?

— Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

**Email 3 (Day 7)**
Subject: “close the loop”

Hi Dr. {{LastName}},

Should I close this out, or is reducing no-shows/cancellations a priority at {{Practice}} right now?

Either way, if you want the short overview, I’m here:
agent_bob_replit+no-show-bot@agentmail.to

— Bob

Reply handling (Owner):
- If “already have reminders”: Ask what tool; offer gap-fill (2-way confirmations + reschedule + waitlist fill) and propose a 10-min comparison.
- If “send info”: Send 5-bullet overview + ask for preferred time for 10-min walkthrough.
- If “not interested”: mark Lost; ask permission to check back in 60 days.


### Sequence B: Office Manager/Front Desk (4 touches)
**Email 1 (Day 1)**
Subject options:
- “2-way SMS confirmations for {{Practice}}?”
- “cut no-shows without more calls”

Body:
Hi {{FirstName}},

I’m Bob. I work with dental/ortho offices to reduce no-shows by automating 2-way SMS confirmations and making reschedules easy (so you’re not chasing patients by phone).

If you tell me roughly how many appointments/day you run and your typical no-show rate, I can estimate what you’d recover monthly.

Legitimacy/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 2)**
Subject: “quick estimate?”

Hi {{FirstName}},

Most offices don’t need a new system—just a better confirmation loop:
- reminder → patient replies CONFIRM or RESCHEDULE
- if reschedule/no response → office gets a clean action list
- optional: waitlist fill for cancellations

Want me to send the 3-question estimate?

— Bob

**Email 3 (Day 5)**
Subject: “who owns reminders?”

Hi {{FirstName}},

Who’s the right person to evaluate no-show reduction tools—office manager, practice owner, or the scheduling lead?

If you point me to them I’ll keep it brief.

— Bob

**Email 4 (Day 9)**
Subject: “last try”

Hi {{FirstName}},

Last try from me—should I close this out for now?

If you want the overview later, here’s the info page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob
agent_bob_replit+no-show-bot@agentmail.to

---

## 5) Craigslist + FB Groups templates (value-led)
### Craigslist post (Services > Small Biz / Biz Ads)
Title: “Reduce appointment no‑shows (2‑way SMS confirmations + easy reschedules)”

Body:
If you run a dental/ortho/clinic schedule, no-shows and last‑minute cancellations quietly cost thousands/month.

I’m Bob. I’m offering a simple setup that:
- sends smart SMS reminders
- asks patients to CONFIRM or RESCHEDULE (2-way)
- routes reschedules cleanly so your team doesn’t chase people
- optional: fill gaps from a waitlist
- includes basic analytics so you can quantify recovered revenue per location

If you want, I can do a quick “no‑show risk check” and estimate what you’d recover each month.

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

### FB Group post
Post:
Dental/ortho office managers: quick question—are no-shows/late cancels still a top headache?

I’m Bob and I’m piloting a lightweight no‑show reducer: 2‑way SMS confirmations + easy rescheduling (so patients don’t vanish and your team does fewer outbound calls).

Happy to run a quick no‑show estimate for anyone who comments “estimate” (I’ll DM 3 questions). Info page for legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

### FB Group DM script (to commenters)
Hi {{Name}}—thanks. If you answer these 3 questions I’ll send back a rough recovered-$ estimate:
1) appointments/day (avg)?
2) no-show % (or best guess)?
3) average production/visit (or hygiene vs procedures mix)?

If easier, reply with ranges. Also, here’s the info page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

— Bob (agent_bob_replit+no-show-bot@agentmail.to)
