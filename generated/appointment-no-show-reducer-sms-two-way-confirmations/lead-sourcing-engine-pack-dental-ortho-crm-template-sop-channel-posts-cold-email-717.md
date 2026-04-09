# Lead Sourcing Engine Pack (Dental/Ortho) — CRM Template + SOP + Channel Posts + Cold Email Setup + Upwork Copy

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:21:50.524Z

---

## 1) CRM PIPELINE (Google Sheets-ready)

**Create a Google Sheet with these columns (left to right):**
1. Lead ID (auto): e.g., DENT-0001
2. Date Added
3. Practice Name
4. Vertical (Dental / Ortho)
5. Locations Count (1–5)
6. Address
7. City
8. State/Prov
9. Country
10. Main Phone
11. Website
12. Booking Link (if any)
13. Scheduling Tool (if visible: NexHealth, Weave, Solutionreach, LocalMed, Zocdoc, etc.)
14. Decision Maker Name (Owner/Dentist/Practice Manager)
15. Role (Owner / Practice Manager / Office Manager)
16. Email 1 (primary)
17. Email 1 Source (Website contact page / staff page / directory / guess)
18. Email 1 Confidence (High/Med/Low)
19. Email 2 (backup)
20. Email 2 Source
21. Email 2 Confidence
22. LinkedIn URL (optional)
23. Notes (hours, specialties, current reminder system, etc.)
24. Stage (dropdown)
25. Last Touch Date
26. Next Touch Date
27. Next Step (call/email/SMS/FB message/Upwork)
28. Cadence Day # (0–14)
29. Outcome (Interested / Not now / Wrong contact / No response / Bounced)
30. Estimated Appts/Week (if stated)
31. Estimated No-show Rate (if stated)
32. Potential $/Month Recovered (rough)
33. Owner Priority (A/B/C)
34. Assigned To

**Stage dropdown values (exact):**
- New (Uncontacted)
- Enriched (Has Email + Phone)
- Contacted (Day 1 Sent)
- Engaged (Replied)
- Qualified (Has pain + decision maker)
- Demo Booked
- Trial/Setup
- Won (Paying)
- Lost
- Nurture

**Stage rules:**
- A lead cannot move to “Contacted” without Phone + at least 1 email.
- “Qualified” requires: correct role confirmed + at least one pain signal (no-shows, cancellations, open slots, staff time).
- “Demo Booked” requires calendar invite/time confirmed.

**Daily activity targets (to reach 20–25 closes/30 days):**
- Add/enrich: 50–100 new leads/day
- Send: 100–200 emails/day (ramp up slowly per warmup plan)
- Calls/SMS: 20–40/day to non-responders with valid phone
- Bookings goal: 2–4 demos/day

---

## 2) LEAD SOURCING SOP (Dental + Ortho, 1–5 locations)

### Inclusion criteria
- Independent dental or orthodontic practice (not a giant DSO brand unless location-level decision maker is identifiable)
- 1–5 locations (ideal: 1–2)
- Has online booking OR clearly takes appointments by phone
- Has a real website (preferred) and published phone number

### Exclusion criteria
- Emergency-only clinics with no appointment model
- Very large multi-state brands (unless local manager email is visible)
- Practices without any contact channel beyond a generic form AND no phone

### Sources (free-first)
1. **Google Maps** (primary)
2. **Yelp** (secondary)
3. **State dental association directories** (supplement)
4. Practice websites (contact/team pages)

### Exact Google Maps queries (copy/paste)
Use in Google Maps search bar:
- “dentist near me” + filter by city
- “family dentistry [CITY]”
- “cosmetic dentist [CITY]”
- “orthodontist [CITY]”
- “pediatric dentist [CITY]”

Prioritize metros with high density (examples): Phoenix, Dallas, Houston, Austin, Miami, Orlando, Atlanta, Charlotte, Nashville, Denver, Seattle, San Diego, LA suburbs, Chicago suburbs.

### What to capture from Google Maps listing
- Practice name, address, phone, website
- Hours (optional)
- Whether booking is offered via “Book online” button

### Enrichment steps to find owner/manager email (fast)
1. Visit website → look for:
   - /contact, /about, /team, /staff, /our-team
   - Footer email
2. If no direct email:
   - Look for “Office Manager” name on team page; capture name even if no email.
3. Email patterns (use only when pattern is strongly suggested by site):
   - info@domain.com, contact@domain.com, office@domain.com
   - firstname@domain.com (if staff emails appear elsewhere)
4. If only a form exists, still capture it but mark **Email Confidence = Low** and add a secondary generic inbox guess (info@/office@) only if domain is valid.

### QA rules
- Phone must be formatted E.164-ready (e.g., +1XXXXXXXXXX)
- Website must resolve (not a dead page)
- Email confidence:
  - High = explicitly shown on site
  - Med = directory listing OR clearly implied pattern on site
  - Low = guessed generic with no confirmation

### Output quota
- Day 1: 150–200 enriched leads
- Day 2–4: scale to 400–800 by repeating across 8–15 metros

---

## 3) CRAIGSLIST POST TEMPLATE (Value-led, non-spam)

**Category:** services > small biz ads / or computer services (varies by city rules)

**Title options (rotate):**
1) “Stop appointment no-shows (2-way SMS confirmations + reschedule links)” 
2) “Dental/Ortho offices: fill cancellations automatically (waitlist text-back)”
3) “Reduce no-shows without hiring more front-desk help”

**Body:**
Hi — if you run an appointment-based office (dental/ortho especially), no-shows and last-minute cancellations quietly drain revenue.

I’m offering a simple SMS system that:
- Sends smart reminders
- Collects YES/NO confirmations (two-way)
- Automatically offers reschedule links when someone can’t make it
- Can text a waitlist to fill gaps
- Shows basic analytics so you can quantify recovered revenue

If you want to see exactly how it works, here’s our live page (for legitimacy):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Reply with your clinic name + best number, or email:
agent_bob_replit+no-show-bot@agentmail.to

No pressure — happy to share a quick 10-minute walkthrough and a no-show reduction estimate.

---

## 4) FACEBOOK GROUP POST TEMPLATE (Compliant, discussion-first)

**Post (ask-first):**
Question for practice owners/office managers: what’s your current process for reducing no-shows?

I’m building a lightweight reminder + confirmation flow for appointment-based offices:
- 2-way SMS confirmations (patients reply YES/NO)
- Auto-reschedule link if they can’t make it
- Optional waitlist texts to backfill cancellations
- Simple reporting so you can see recovered revenue

If you want, I can show the exact workflow (10 minutes). Live page here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

If it’s allowed, comment “workflow” and I’ll DM details, or email me: agent_bob_replit+no-show-bot@agentmail.to

**DM follow-up (after they comment):**
Thanks — what software do you use today (Dentrix/OpenDental/etc.) and roughly how many appointments/week? I’ll send a workflow tailored to your setup and a quick estimate of no-show savings.

---

## 5) COLD EMAIL SETUP CHECKLIST (Free-first)

**Goal:** deliverability + basic tracking without spending money.

1. **Domain:** Use the existing website URL for legitimacy in copy. If you later buy a sending domain, do it only with approval.
2. **SPF/DKIM/DMARC:**
   - If using a custom domain email provider: publish SPF + DKIM records provided by the provider.
   - Add DMARC: start with p=none; rua mailbox optional.
3. **Sending plan (warmup without paid tools):**
   - Days 1–3: 10–20 emails/day
   - Days 4–7: 25–40/day
   - Days 8–14: 50–100/day
   - Keep replies manual; avoid links-heavy emails early.
4. **Tracking:** Prefer minimal tracking early. If needed, use plain-text emails and track in CRM manually (Sent/Reply/Bounce).
5. **Content rules:**
   - 1 clear CTA (book a quick walkthrough)
   - Include legitimacy URL + email signature
   - Avoid spammy words, too many links, or attachments

---

## 6) UPWORK PROFILE COPY + 3 PROPOSAL TEMPLATES

### Profile headline
“Reduce appointment no-shows with 2-way SMS confirmations + reschedule automation (Dental/Medical/Services)”

### Overview
I help appointment-based businesses reduce no-shows and last-minute cancellations using simple SMS reminder flows that collect confirmations (YES/NO), automate rescheduling, and optionally text a waitlist to fill gaps.

Typical outcomes:
- Fewer empty slots
- Less front-desk time spent on reminder calls
- Clear reporting on recovered revenue per location

If you want to see the workflow, here’s the live page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Contact: agent_bob_replit+no-show-bot@agentmail.to

### Proposal #1 (No-show reduction / reminders)
Hi {Name} — I can implement a two-way SMS confirmation flow that reduces no-shows by prompting patients/clients to reply YES/NO and automatically offering a reschedule link if they can’t make it. If you have a waitlist, we can also text it to backfill cancellations.

If you share your industry + approx appointments/week + current scheduling tool, I’ll outline a simple rollout plan and what metrics we’ll track.

Live workflow page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Proposal #2 (Appointment setting/admin)
Hi {Name} — if your goal is fewer no-shows and less admin time, I can set up automated reminders + two-way confirmations so your team doesn’t have to chase confirmations manually. It’s lightweight and designed for appointment-based operations.

What system do you use today (e.g., Google Calendar, CRM, practice software)? I’ll tailor the flow.

Details:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Proposal #3 (SMS automation)
Hi {Name} — I specialize in SMS automation for appointment businesses: reminders, confirmations, rescheduling, and waitlist fills. The focus is measurable impact (recovered revenue) and minimal disruption to your existing scheduling process.

If you want, I can do a 10-minute walkthrough and then implement the first version quickly.

Live page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

---

## 7) Outreach cadence rules (operational)
- Day 1: Email #1
- Day 2: Call (if phone) OR short follow-up email
- Day 4: Email #2 (case/ROI)
- Day 7: Call + voicemail drop (if possible)
- Day 10: Email #3 (breakup + offer to send workflow)
- Day 14: Final ping + move to Nurture if no response

Signature line for all channels:
Bob
agent_bob_replit+no-show-bot@agentmail.to
Legitimacy page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
