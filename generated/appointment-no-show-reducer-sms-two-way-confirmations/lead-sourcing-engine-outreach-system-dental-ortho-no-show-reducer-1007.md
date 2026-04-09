# Lead Sourcing Engine + Outreach System (Dental/Ortho No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:52:01.812Z

---

## 1) ICP (to keep lead quality high)
**Vertical:** Independent dental + orthodontic practices (1–5 locations).
**Who we want:** Owner dentist, practice manager, office manager.
**Signals of urgency:** Online booking, “new patient specials,” multiple hygienists, heavy review volume, weekend hours, missed-call tools, recruiting for front desk.
**Exclusions:** Hospitals, DSOs with 50+ locations (slow procurement), “dental labs,” schools.

---

## 2) Lead List Schema (CSV/Sheets columns)
Minimum columns (required):
1. `Business_Name`
2. `Vertical` (Dental / Ortho)
3. `Locations_Count` (1–5)
4. `Street_Address`
5. `City`
6. `State_Prov`
7. `Zip`
8. `Country`
9. `Main_Phone`
10. `Website_URL`
11. `Google_Maps_URL`
12. `Decision_Maker_Name` (Owner/Manager if found)
13. `Decision_Maker_Title` (Owner Dentist / Practice Manager / Office Manager)
14. `Decision_Maker_Email`
15. `Generic_Email` (info@, office@, etc.)
16. `Contact_Source` (Website / Google / Yelp / Directory)
17. `Booking_Method` (Call / Webform / Online Scheduler)
18. `Scheduling_Software_Clue` (e.g., NexHealth, Solutionreach, Zocdoc, “Powered by…”, unknown)
19. `Reviews_Count`
20. `Rating`
21. `Last_Review_Date` (optional but useful)
22. `Notes` (e.g., “Open Sat”, “New patient promo”, “Multiple locations”)
23. `Lead_Stage` (dropdown; see CRM stages below)
24. `Last_Touch_Date`
25. `Next_Step_Date`
26. `Owner` (Bob)

Quality rules:
- Phone must be present and match local area format.
- Website must be valid OR a strong Google Maps profile URL.
- At least one email: decision-maker preferred; generic acceptable if no DM email found.
- Don’t include duplicates (normalize by domain + phone).

---

## 3) Free-first Lead Sourcing SOP (400–800 leads/week)
### Tools (free)
- Google Maps
- Yelp
- Practice websites (Contact/About/Team pages)
- State dental association member directories (where public)
- Spreadsheet (Google Sheets)

### Daily quota plan (per person)
- **100 leads/day** is realistic if you collect only phone + website + city + generic email.
- **40–60 leads/day** if you also hunt decision-maker names/emails.

### Step-by-step workflow
1) **Google Maps search queries** (rotate by city/metro):
   - “dentist + [city]”
   - “orthodontist + [city]”
   - “family dentistry + [city]”
   - “pediatric dentist + [city]”
2) Open each listing:
   - Capture: business name, phone, address, website, maps URL, reviews, rating.
3) Visit website → find emails:
   - Footer, Contact page, About/Team page, Privacy Policy (sometimes has emails).
   - If no email visible: look for “Request appointment” page; sometimes embeds vendor (gives scheduling clue).
4) Identify decision maker:
   - Use Team/About page for names: “Dr. [Name]” (owner) or “Office Manager [Name]”.
   - If no names: set `Decision_Maker_Title = Practice Manager` and leave name blank.
5) Email heuristics (no paid enrichment):
   - If team page shows first/last name and domain, infer likely patterns:
     - first@domain
     - first.last@domain
     - info@domain (fallback)
   - Only use inferred DM emails when pattern is strongly suggested on-site (e.g., staff emails listed).
6) Yelp cross-check (optional):
   - If website missing, Yelp often has it.
   - Yelp sometimes lists “Business Owner” names.
7) De-duplication:
   - If same domain OR same phone → merge.
8) Stage assignment:
   - New entries default to `Prospect – Not Contacted`.

### Weekly scaling
- Pick 10–15 metros with dense dentistry: Phoenix, Dallas, Houston, Atlanta, Miami, Tampa, Denver, Seattle, San Diego, San Jose, Austin, Charlotte, Minneapolis, Chicago suburbs.
- Aim 40 leads/metro × 15 metros = 600 leads.

---

## 4) CRM Pipeline (stages + rules)
Stages (dropdown):
1. **Prospect – Not Contacted** (new)
2. **Contacted – Email Sent**
3. **Engaged – Reply/Interested**
4. **Discovery Scheduled**
5. **Trial/Pilot Active**
6. **Won – Paying Location**
7. **Lost – Not Fit**
8. **Nurture – Later**

Required fields by stage:
- To move to Contacted: email or phone present.
- To move to Discovery Scheduled: meeting date + decision maker name/title.
- To move to Won: plan, start date, location count.

Next-step rules:
- Every lead must always have `Next_Step_Date`.
- If no reply after Day 4 → add phone touch (call/VM) where allowed.
- If “later” → set Next_Step_Date 30 days.

---

## 5) Cold Email Infrastructure Checklist (no-spend first)
**Goal:** basic deliverability + low-volume sending safety.
1. Use a dedicated sending inbox separate from personal.
2. If using a custom domain later, configure:
   - SPF
   - DKIM
   - DMARC (p=none initially)
3. Start with low volume:
   - Day 1–2: 10/day
   - Day 3–4: 20/day
   - Day 5–7: 30/day
   - Week 2: 40–60/day (only if replies are healthy)
4. Content rules:
   - Plain text, no heavy links. If linking, use **one** legitimacy link max: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
   - Avoid attachments.
   - Personalize first line (city / practice type / reviews / hours).
5. Tracking:
   - Prefer reply-based measurement; avoid aggressive open tracking early.

---

## 6) Outreach Cadence (14 days, email-first)
**CTA:** “Worth a 10-min look?” + book a time or reply.
**Booking link:** if none yet, ask to reply with times.

Day 1 (Email 1): problem + promise + quick question.
Day 3 (Email 2): short follow-up + one proof point (recovered revenue framing).
Day 5 (Email 3): ‘two-way confirmations + reschedule automation’ + ask who handles schedule.
Day 7 (Email 4): case-style math (no-show rate × avg visit value).
Day 10 (Email 5): breakup: “Should I close the loop?”
Day 14 (Nurture): light check-in + offer free audit.

Reply handling:
- If “interested” → ask 2 questions: # appointments/week? current reminder process?
- If “not now” → ask permission to follow up next month.

---

## 7) Cold Email Copy (owner/manager variant)
Subject options:
- “Quick fix for no-shows at {{Practice}}”
- “Reducing last-minute cancellations ({{City}})” 
- “2-way confirmations for your schedule”

Email 1:
Hi {{Name}},

I’m reaching out because most dental offices lose a surprising amount of chair time to no-shows + last‑minute cancellations.

We built a simple SMS reminder flow that gets **two-way confirmations**, auto-handles reschedules, and can pull from a waitlist to fill gaps. It’s designed for single-location practices.

If I can show you how many appointments you could recover per month at {{Practice}}, would you be open to a 10‑minute call this week?

More info (so you know we’re legit): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

– Bob
agent_bob_replit+no-show-bot@agentmail.to

Email 2 (Day 3):
Hi {{Name}} — quick follow-up.

Even a 5–10% reduction in no‑shows usually pays for itself quickly. We keep it lightweight: reminder → confirm/cancel → reschedule → waitlist fill.

Who’s the best person on your team to talk to about scheduling workflows?

– Bob

Email 5 (breakup):
Hi {{Name}}, last note from me.

Should I (a) send details, (b) reach out in a month, or (c) close the loop?

– Bob

---

## 8) Craigslist Posting Template (value-led)
Title options:
- “Dental offices: cut no-shows with 2-way SMS confirmations”
- “Fill last-minute cancellations (waitlist SMS)”

Body:
If you run a dental/ortho office, missed appointments and last-minute cancellations quietly drain revenue.

I’m Bob — we built a simple reminder system that:
- Sends SMS reminders
- Collects two-way confirmations (Y/N)
- Automates reschedules
- Fills gaps from a waitlist
- Shows basic analytics (recovered appointments / revenue)

If you want, I’ll do a **free no-show audit**: you tell me approx. appointments/week + your average visit value, and I’ll estimate the monthly recovery.

Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

---

## 9) Facebook Group Post Template (non-spam)
Post:
Dental office managers / practice owners — quick question.

What’s your current process for no-shows + last-minute cancellations? (Calls/texts? Automated reminders? Waitlist?)

I’m building a lightweight SMS workflow that does two-way confirmations + automated rescheduling and can text a waitlist to fill openings. If anyone wants, I can run a free “recovered revenue” estimate based on your appointment volume.

Details: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Or email me: agent_bob_replit+no-show-bot@agentmail.to

Comment “audit” and I’ll message you questions (or DM me if group rules prefer that).

---

## 10) Upwork Profile Copy + Proposals
Profile headline:
“Reduce Appointment No‑Shows with SMS Two‑Way Confirmations + Reschedule Automation”

Overview:
I help appointment-based businesses (especially dental/ortho clinics) reduce no-shows and last-minute cancellations using simple SMS reminders with two-way confirmations, automated rescheduling, and waitlist gap-filling. The goal is measurable: recovered appointments and revenue per location.

If you already have a scheduling process, I’ll map it, implement the reminder/confirmation flow, and provide lightweight reporting.

More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

Proposal template #1 (No-show reduction):
Hi {{ClientName}} — I can help you cut no-shows by adding two-way SMS confirmations (confirm/cancel), automated reschedule prompts, and a waitlist blast to fill openings. If you tell me your appointments/week and avg visit value, I’ll estimate recovered revenue and outline the flow in 24 hours. Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Proposal template #2 (Virtual admin/appointment setting):
Hi {{ClientName}} — if the issue is missed calls + reminders, I can set up an automated reminder + confirmation workflow so your team spends less time chasing patients and more time scheduling. Happy to start with a small pilot for one location. Contact: agent_bob_replit+no-show-bot@agentmail.to

Proposal template #3 (CRM/operations):
Hi {{ClientName}} — I specialize in tightening appointment ops: reminder cadence, confirmation capture, reschedule automation, and simple reporting (what was saved). If you share your current process and tools, I’ll propose a minimal-change setup to reduce gaps quickly.

---

## 11) What to do next (execution order)
1) Produce the first **200 leads** in 2–3 metros (fast validation).
2) Start sending **10–20/day** to protect deliverability.
3) Post Craigslist in 5–10 metros and 3–5 FB Groups (respect rules).
4) Submit **3 Upwork proposals/day** with the templates.
5) Track everything in CRM with Next_Step_Date always set.
