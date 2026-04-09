# Dental/Ortho Lead Sourcing Engine + CRM + Cold Email Sequences (Ready-to-Run)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:28:21.240Z

---

## 1) Target ICP (to keep lead quality high)
**Vertical:** Independent dental + orthodontic practices (1–5 locations)
**Geo:** US + Canada (start with 10–20 metro areas)
**Must have:** Appointments (cleanings, braces consults, etc.) and a front desk/office manager
**High intent signals (prioritize):** Online booking button, “Request Appointment” forms, multiple hygienists/doctors, open evenings/weekends, active Google reviews.

---
## 2) Lead list schema (copy/paste column headers)
Use one row per location.
1. Lead ID (auto: CITY-STATE-BIZNAME)
2. Business Name
3. Location Name (if multi-location)
4. Address
5. City
6. State/Province
7. ZIP/Postal
8. Country
9. Phone (main)
10. Secondary Phone (if listed)
11. Website
12. Google Maps URL
13. Yelp URL (optional)
14. Primary Contact Name (Owner/Doctor/Office Manager)
15. Contact Title (Owner / Dentist / Orthodontist / Practice Manager / Office Manager)
16. Contact Email (direct)
17. Email Type (Direct / Role-based / Contact-form-only)
18. Contact Form URL (if no email)
19. Booking Link Present? (Y/N)
20. Booking Vendor (Zocdoc / NexHealth / LocalMed / Solutionreach / Weave / other / unknown)
21. Practice Management Software (if visible)
22. Hours (note if evenings/weekends)
23. Review Count (Google)
24. Rating (Google)
25. Notes (signals, pain hints)
26. Source (GMaps / Yelp / Directory)
27. Date Added
28. Outreach Owner (Bob/VA)

**Minimum viable lead =** Business Name + City/State + Phone + Website or Google Maps URL.
**High-quality lead =** includes Contact Email + Contact Title.

---
## 3) QA + enrichment rules (so the list is actually usable)
**A) De-dupe rules**
- De-dupe by (Website domain) first, then (Phone), then (Address).
- If multiple locations share the same domain, keep each location as separate row but link via “Location Name.”

**B) Email capture hierarchy (fastest → best)**
1) Website header/footer (often has office@ / info@)
2) “Contact” page (sometimes lists office manager)
3) “Meet the Team” page (names to target)
4) If no email: capture contact form URL and use that channel.

**C) Decision-maker targeting rules**
- Prefer Office Manager/Practice Manager for operational issues (no-shows).
- If only doctor email exists, use it; otherwise role-based is acceptable.

**D) Validity heuristics (before sending)**
- Domain must resolve (website loads) OR have active Google Business listing.
- If email is role-based (info@), still send, but personalize subject/body to office manager.
- If only contact form exists, treat as separate channel (do not email blast forms).

---
## 4) Daily lead sourcing SOP (400–800/month; scalable to 400–800/week with help)
### Step 1 — Pick metros for the day (30 minutes)
Choose 5–10 metros (example list): Phoenix, Dallas, Houston, Tampa, Orlando, Denver, Charlotte, Nashville, San Diego, San Jose.

### Step 2 — Google Maps harvesting (core list)
Search queries (rotate):
- “dentist {city}”
- “family dentistry {city}”
- “orthodontist {city}”
- “dental clinic {city}”
Filters:
- Skip hospitals/university clinics
- Prefer 4.0+ rating and 30+ reviews (signal of volume)
Capture per listing:
- Business name, address, phone, website, GMaps URL, rating/reviews

**Quota guidance:** 15–25 leads per metro in 20–30 minutes once practiced.

### Step 3 — Yelp augmentation (optional but fast)
Search: “Dentists” in {city}
Capture: website/phone if missing on GMaps; sometimes better contact page.

### Step 4 — Website enrichment (decision-maker email)
For each lead, open website:
- Find email in header/footer/contact.
- If none, capture contact form URL.
- Look for “Team” page for office manager name.
- Note online booking + vendor if obvious (Zocdoc/NexHealth/LocalMed etc.).

**Speed rule:** Spend max 3 minutes per lead. If no email found by then, mark as “Contact-form-only” and move on.

### Step 5 — Stage into CRM
Every lead added must be assigned an Outreach Owner and placed into stage “New → Not Contacted.”

---
## 5) CRM pipeline (stages + rules)
**Stages (dropdown):**
1. New (Not Contacted)
2. Contacted – Email 1 Sent
3. Contacted – Follow-up Running
4. Replied – Interested
5. Replied – Not Now
6. Replied – Not a Fit
7. Meeting Booked
8. No-Show (Meeting)
9. Closed Won (Pilot)
10. Closed Won (Monthly)
11. Closed Lost

**Required fields before moving to “Contacted”:** Phone + email or contact form + city/state.
**Next-step rule:** Every record must have a “Next Action Date” (even if it’s “close out”).

**Suggested additional columns for CRM execution:**
- Last Touch Date
- Next Action Date
- Touch Count
- Channel (Email/SMS/Phone/Contact Form)
- Outcome Notes

---
## 6) Outreach cadence (14 days; works for cold email + optional SMS)
**Day 1:** Email #1
**Day 3:** Email #2
**Day 5:** Email #3
**Day 7:** Email #4 + optional call
**Day 10:** Email #5 (case/ROI)
**Day 14:** Breakup email

If you have a public phone number and local compliance is handled, optional SMS can be used *after a reply* or when they explicitly request texting.

---
## 7) Cold email sequence A — Owner/Doctor (copy/paste)
Send from: agent_bob_replit+no-show-bot@agentmail.to
Legitimacy URL to include when helpful: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

### Email 1 (Day 1)
**Subject options:**
- “Quick question about no-shows at {PracticeName}”
- “Reducing last-minute cancels in {City}”
- “Simple SMS confirmations for {PracticeName}”

**Body:**
Hi Dr. {LastName} — I’m Bob.

I’m reaching out because most dental/ortho practices I talk to are losing a surprising amount of chair time to no-shows and late cancellations.

We built a lightweight appointment no-show reducer: it sends smart SMS reminders, collects two-way confirmations (Y/N), and routes “can’t make it” into an automatic reschedule + optional waitlist fill.

If I could help you recover even 2–5 appointments/month, would you be open to a 10-minute walkthrough?

You can see what it is here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email 2 (Day 3)
**Subject:** “Is this handled by your office manager?”

Hi Dr. {LastName} — should I be speaking with your office/practice manager about reducing no-shows + filling last-minute gaps?

If you point me to the right person, I’ll send a 3-bullet summary and leave you alone if it’s not relevant.

– Bob

### Email 3 (Day 5)
**Subject:** “What are you doing when patients don’t confirm?”

Curious how you handle reminders today:
1) Manual calls/texts?
2) One-way reminder texts?
3) Two-way confirmations + automated reschedule?

If you’re already doing (3), you can ignore this. If not, I can show a simple flow that typically reduces no-shows without adding front-desk workload.

Want me to send the 60-second overview?

– Bob

### Email 4 (Day 7)
**Subject:** “Worth testing for 14 days?”

If you’re open to it, I’d like to set up a small pilot for {PracticeName} and measure recovered appointments.

No long implementation—just reminders + confirmations + reschedule routing. If it doesn’t move the needle, we stop.

Do you have 10 minutes this week?

– Bob

### Email 5 (Day 10)
**Subject:** “Recovered revenue per location”

The reason practices like this is it’s measurable: confirmed vs. unconfirmed, recovered appointments, and estimated revenue saved per location.

If you tell me roughly how many appointments/day you run, I’ll estimate the upside and you can decide if it’s worth a quick look.

– Bob

### Breakup (Day 14)
**Subject:** “Close the loop?”

I haven’t heard back—totally fine.

Should I:
1) Reach out to your office manager instead,
2) Check back in 60 days, or
3) Close the loop?

– Bob

---
## 8) Cold email sequence B — Office Manager / Practice Manager
### Email 1 (Day 1)
**Subject options:**
- “Cut no-shows without more front-desk work”
- “Two-way confirmations + auto-reschedule”

Hi {FirstName} — I’m Bob.

Quick note: we built a simple no-show reducer for appointment-based clinics. It sends SMS reminders, gets a two-way confirmation, and when someone can’t make it, it triggers an automated reschedule and can fill gaps from a waitlist.

The goal is to recover chair time without adding work for your team.

Open to a 10-minute look? Here’s the overview page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

### Email 2 (Day 3)
**Subject:** “What reminder system are you using today?”

Are reminders currently:
- manual calls/texts,
- one-way texts,
- or two-way confirmations?

If you tell me which, I’ll reply with the simplest workflow I’ve seen to reduce no-shows for that setup.

– Bob

### Email 3 (Day 5)
**Subject:** “When someone replies ‘NO’ — what happens?”

Most systems remind patients, but don’t handle the moment they say they can’t come.

We route “NO” into: reschedule options + optional waitlist fill. That’s usually where the recovered appointments come from.

Want the flow diagram?

– Bob

### Email 4 (Day 7)
**Subject:** “Pilot idea for {PracticeName}”

If you’re open, we can run a short pilot and track:
- confirmation rate,
- recovered appointments,
- estimated revenue saved.

If it’s not clearly positive, we stop.

What does your schedule look like for a quick walkthrough?

– Bob

### Breakup (Day 14)
**Subject:** “Should I close this out?”

No worries if timing’s off. Want me to close this out or check back later?

– Bob

---
## 9) Reply handling snippets (fast)
**If Interested:**
“Great — what’s the best number of appointments/day and your typical no-show rate (roughly)? I’ll estimate the upside, and we can pick a 10-min slot. Also, who manages reminders/reschedules today?”

**If ‘We already have reminders’:**
“Makes sense. Are yours two-way confirmations (Y/N) and do you automatically route ‘can’t make it’ into reschedule + waitlist fill? That’s the gap we usually fix.”

**If ‘Not now’:**
“No problem—what month is better? I can also send a 1-page overview and follow up then.”

---
## 10) Free-first cold email setup checklist (operational)
- Use a dedicated sending inbox (start with the AgentMail address).
- Add SPF/DKIM/DMARC once a custom domain is acquired (avoid sending volume from a dev subdomain).
- Warm-up plan (no spend): 10/day for 3 days → 20/day for 3 days → 30/day for 4 days; keep replies genuine; stop if bounce rate > 3%.
- Tracking: avoid heavy link tracking pixels at first; prefer plain-text and one legitimacy link max.

This pack is sufficient to (a) produce leads consistently and (b) start outbound immediately while keeping quality and deliverability under control.