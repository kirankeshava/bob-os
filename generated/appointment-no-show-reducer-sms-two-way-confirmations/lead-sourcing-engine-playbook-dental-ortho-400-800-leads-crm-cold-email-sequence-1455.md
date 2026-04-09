# Lead Sourcing Engine Playbook — Dental/Ortho (400–800 Leads) + CRM + Cold Email Sequences

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T15:38:17.890Z

---

## 1) Target ICP (for fastest close + easiest sourcing)
**Vertical:** Independent dental + orthodontic practices (1–5 locations) in the US.
**Who hurts most:** Practices with high new-patient value, scheduled hygiene/ortho adjustment blocks, and a front desk team that spends time chasing confirmations.
**Decision makers to contact (in order):** Owner/Dentist/Orthodontist → Practice Manager/Office Manager → Front Desk Lead.

## 2) Lead List Schema (CSV / Google Sheets columns)
Use these exact columns. Anything marked (REQ) is required.
1. **Lead_ID (REQ):** e.g., DENT-CA-SD-0001
2. **Business_Name (REQ)**
3. **Vertical (REQ):** Dental | Orthodontics
4. **Locations_Count (REQ):** 1–5
5. **Address (REQ)**
6. **City (REQ)**
7. **State (REQ)**
8. **ZIP**
9. **Phone (REQ):** formatted +1XXXXXXXXXX
10. **Website_URL (REQ)**
11. **Google_Maps_URL (REQ)**
12. **Yelp_URL**
13. **Primary_Contact_Name**
14. **Primary_Contact_Role (REQ):** Owner | Practice Manager | Office Manager | Front Desk
15. **Primary_Email (REQ if available)**
16. **Secondary_Email**
17. **Contact_Source:** Website | Google | Yelp | Directory | LinkedIn
18. **Booking_Method_Observed:** Phone | Web Form | Online Scheduler | Unknown
19. **Software_Clue:** Dentrix | Eaglesoft | OpenDental | SimplePractice | NexHealth | Weave | Unknown (only if visible)
20. **No_Show_Pain_Clue:** “Confirm appt by text” | “Missed appt fee” | “Waitlist” | None observed
21. **Last_Contacted_Date**
22. **Stage (REQ):** New → Researched → Contacted → Replied → Booked → Won → Lost
23. **Next_Step (REQ):** Email 1 | Email 2 | Call | SMS | Follow-up | Close | Nurture
24. **Notes**

### QA rules (non-negotiable)
- **Phone must match website or Google listing** (avoid wrong numbers).
- **Website must load** (no parked domains).
- **At least one of:** Primary_Email OR a contact form URL OR a named decision maker.
- If no email found, mark **Primary_Email = ""** and set **Next_Step = Call**.
- Deduplicate by **Phone + Website**.

## 3) Sources + How to Pull Leads (SOP)
Goal: 400–800 leads in 3–5 working days (or ~80–150/day).

### Source A — Google Maps (fastest)
1. Search queries (copy/paste):
   - "dentist" + City, State
   - "orthodontist" + City, State
   - "family dentistry" + City, State
2. Filters/selection:
   - Prioritize practices with websites and clear phone.
   - Avoid large DSOs/hospital systems when obvious.
3. Capture into sheet: Business name, address, phone, website, maps URL.
4. Click website → find email/contact:
   - Look for pages: /contact, /about, /team, /staff.
   - Common email patterns: info@, office@, scheduling@.
   - If staff listed, capture Practice Manager/Office Manager name.

### Source B — Yelp (backup + extra contact signals)
1. Search: Dentists/Orthodontists by city.
2. Capture Yelp URL and any “Request Appointment” signals.
3. Use Yelp mainly for cross-checking phone/website and finding newer practices.

### Source C — State dental association / directory (high quality, slower)
1. Google: "[State] dental association member directory" or "find a dentist [state] directory".
2. Pull practice names + city; then resolve phone/website via Google Maps.

### Email enrichment heuristics (free-first)
- If the site lists a contact form only, still capture it and mark **Primary_Email blank**.
- If a dentist name is known and domain is known, note likely patterns in **Notes** (do NOT guess-send at scale without verification):
  - first@domain.com, firstname.lastname@domain.com, info@domain.com.
- Prefer role inboxes for deliverability: **office@, info@, appointments@**.

### Daily quotas (single operator)
- **New leads captured:** 120/day
- **Leads enriched with email/contact:** 60/day
- **Leads QA’d + deduped:** 120/day (quick checks)
This hits 600 leads in ~5 days while keeping quality.

## 4) CRM Pipeline (Google Sheets spec)
Create a Google Sheet with these tabs:
1. **Leads** (all columns from schema)
2. **Activity_Log** columns: Date | Lead_ID | Channel | Action | Outcome | Next step date
3. **Dashboard** metrics: New leads/day, contacts/day, replies, booked, won, lost.

### Stage definitions + next-step rules
- **New:** scraped but not enriched → next: enrich email/role.
- **Researched:** has phone + website + contact method → next: Email 1.
- **Contacted:** Email 1 sent (or call made) → next: follow cadence.
- **Replied:** any response → next: qualify + book demo.
- **Booked:** meeting scheduled → next: show-up reminder + prep.
- **Won:** paid location → next: onboarding.
- **Lost:** not a fit/no response after 14 days → next: quarterly nurture.

### Simple formulas (optional)
- Reply rate = Replied/Contacted
- Booking rate = Booked/Contacted
- Win rate = Won/Booked

## 5) Cold Email Sequences (include legitimacy URL + contact email)
**Sender signature (use consistently):**
Bob Smith
Appointment No-Show Reducer (SMS + 2-way confirmations)
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

### Sequence A — Owner/Dentist/Orthodontist (4 touches / 10 days)
**Email 1 (Day 1)**
Subject options:
1) Quick question about no-shows at {{Practice}}
2) Cutting missed appointments for {{Practice}}
3) 2-way text confirmations (small question)

Body:
Hi Dr. {{LastName}} — I’m Bob.

I’m reaching out because a lot of independent dental/ortho practices are losing revenue to last-minute cancellations and no-shows, and the front desk ends up spending hours chasing confirmations.

We built a lightweight SMS system that:
- sends smart reminders,
- collects a simple YES/NO confirmation (two-way),
- auto-handles reschedules, and
- can fill gaps from a waitlist.

If you want, I can show you what it looks like and estimate recovered revenue per month for {{Practice}}.

Open to a 10-minute walkthrough this week?

— Bob Smith
Appointment No-Show Reducer
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3)**
Subject: Re: no-shows at {{Practice}}
Body:
Dr. {{LastName}}, quick follow-up.

Do you currently confirm appointments by phone, text, or email? If you tell me which, I’ll reply with the simplest way we’ve seen practices reduce no-shows without adding work for the team.

If it’s easier, I can coordinate with your office manager.

— Bob

**Email 3 (Day 6)**
Subject: Example result (dental schedule gaps)
Body:
One common issue: a patient cancels the day before, the opening stays unfilled, and production drops for that block.

Our approach is: two-way confirmations + reschedule link + waitlist ping so the schedule repairs itself.

Worth a 10-min look? If yes, reply with a good time window and who should join (you vs office manager).

— Bob

**Email 4 (Day 10)**
Subject: Should I close the loop?
Body:
Should I close the loop on this, or is reducing missed appointments a priority at {{Practice}} right now?

Either way is fine—just reply “yes” (priority) or “no” (not now).

— Bob

### Sequence B — Office Manager / Practice Manager (5 touches / 12 days)
**Email 1 (Day 1)**
Subject options:
1) Reducing no-shows without more front-desk calls
2) Two-way text confirmations for {{Practice}}

Body:
Hi {{FirstName}} — I’m Bob.

We help dental/ortho practices reduce no-shows using two-way SMS confirmations (patients reply YES/NO), automated reschedule handling, and waitlist gap-filling.

It’s designed to *reduce* front desk workload (fewer manual confirmation calls) while giving simple analytics on recovered appointments.

If you’re the right person, could we do a 10-minute walkthrough? If not, who owns scheduling workflow improvements?

— Bob Smith
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

**Email 2 (Day 3)**
Subject: What’s your current confirmation process?
Body:
Quick question: are confirmations currently done by phone calls, one-way texts, or email?

If you share the current workflow, I’ll reply with a simple “before/after” flow that usually cuts no-shows and last-minute cancels.

— Bob

**Email 3 (Day 5)**
Subject: Waitlist gap-filling
Body:
If you keep a waitlist, we can automatically offer newly opened slots by text (first-come, first-served) so cancellations don’t leave holes.

Want to see a sample message flow?

— Bob

**Email 4 (Day 8)**
Subject: Can I send a 2-minute demo?
Body:
I can send a 2-minute demo link + the exact reminder/confirmation templates we use.

Where should I send it? (Or I can email it here.)

— Bob

**Email 5 (Day 12)**
Subject: Close the loop
Body:
Should I close the loop, or would you like to test two-way confirmations for a week to see if it reduces no-shows?

— Bob

## 6) Outreach Cadence Rules (channel-agnostic)
- Day 1: Email 1
- Day 2: If no email, call front desk → ask for office manager email; log outcome.
- Day 3: Email 2
- Day 5: Call (short) + voicemail (if possible)
- Day 6: Email 3
- Day 10: Email 4
- Day 12: Final email (manager sequence)
Stop when: booked, explicit no, wrong contact (reroute), or after 14 days no engagement.

## 7) Booking CTA (no spend version)
Until a scheduling tool exists, use a simple CTA:
- “Reply with 2–3 times that work and I’ll confirm.”
- Or: “Reply ‘demo’ and I’ll send options.”

(If later adding a booking link requires paid Calendly, that would be a separate approval request.)

## 8) Output expectations (what ‘done’ looks like)
A 600-lead sheet is considered production-ready when:
- 95% have validated phone + website.
- 60%+ have a usable email OR named manager OR contact form.
- Stages populated (New/Researched) and Next_Step set for every row.

This playbook is designed so a single operator (or VA) can reliably generate and work 400–800 dental/ortho location leads per month, while outbound execution drives daily booked calls and revenue.