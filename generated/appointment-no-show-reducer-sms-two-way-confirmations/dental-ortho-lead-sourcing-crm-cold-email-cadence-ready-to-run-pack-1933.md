# Dental/Ortho Lead Sourcing + CRM + Cold Email Cadence (Ready-to-Run Pack)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:51:32.958Z

---

## 1) Lead List Schema (CSV/Sheets Columns)
Use one row per location.

**Core identifiers**
- lead_id (auto): e.g., DENT-YYYYMMDD-001
- business_name
- location_name (if multi-site)
- address
- city
- state
- zip
- country
- google_maps_url
- website_url
- yelp_url (optional)

**Contact & decision-maker**
- primary_phone
- front_desk_phone (if different)
- decision_maker_name (Doctor/Owner/Practice Manager)
- decision_maker_title (Owner, Dentist, Orthodontist, Practice Manager, Office Manager)
- decision_maker_email
- alt_contact_name
- alt_contact_title
- alt_contact_email

**Signals (used for prioritization)**
- online_booking_present (Y/N)
- booking_vendor (Zocdoc, NexHealth, Solutionreach, Dentrix, Doctible, Unknown)
- hours_listed (Y/N)
- reviews_count
- rating
- accepts_new_patients (Y/N/Unknown)
- insurance_mentioned (Y/N)
- sms_opt_in_language_on_site (Y/N)

**Outreach tracking**
- lead_source (Google Maps, Yelp, State Directory, Referral)
- status_stage (dropdown; see CRM)
- last_touch_date
- next_touch_date
- touch_count
- owner_reply_status (No Reply / Interested / Not Now / Wrong Contact / Unsubscribe)
- notes (free text)

### QA + Enrichment Rules (fast, practical)
1. **Phone required**: if no phone, skip.
2. **Website preferred**: if no website, still keep if Google Business Profile is strong (>=20 reviews) and phone works.
3. **Email quality tiers**
   - Tier A: email found on website (Contact/About/Team) or explicit staff directory.
   - Tier B: pattern-based (first@domain) only if domain matches website and staff names are known.
   - Tier C: form-only (no email). Keep but mark “email_missing=Y”.
4. **Decision-maker targeting**: prioritize Practice Manager/Office Manager for ops tools; Owner/Doctor for small practices.
5. **Deliverability heuristics**: avoid info@ only when possible; prefer named inboxes or manager role inboxes (office@, manager@) over generic.

---

## 2) Lead Sourcing SOP (Daily Engine)
Goal: **15–30 qualified leads/hour** depending on how many emails are available on-site.

### Step A — Pick a geo slice (daily quota plan)
- Choose **2–4 states** or **10–20 metro areas** per day.
- Daily target (solo): **80–120 new locations/day**.
- Weekly target: **400–800 locations/week**.

### Step B — Google Maps collection (primary)
Search queries (copy/paste):
- “dentist near [City, ST]”
- “orthodontist near [City, ST]”
- “family dentistry [City, ST]”
- “pediatric dentist [City, ST]”

Filters:
- Prefer 1–5 locations (independent/small group)
- Reviews >= 10 (to avoid brand new listings)

Capture:
- Business name, phone, address, website, GBP link, rating, reviews.

### Step C — Website enrichment (2–4 minutes/lead when available)
On the practice website, look for:
- Footer email
- Contact page email
- About/Team page: manager names
- Any mention of “text reminders”, “appointment confirmations”, “missed appointment”, “late cancel” policies
- Online booking button (note vendor if visible)

If email not present:
- Capture contact form URL and keep lead; still usable for phone/SMS outreach.

### Step D — Yelp + State directory backfill
Use Yelp when website is missing on Google.
Use state dental association directories for additional leads (often slower but higher quality).

### Step E — Prioritization scoring (simple)
Score 0–5:
- +2 if decision-maker email found
- +1 if online booking present
- +1 if reviews_count > 50
- +1 if multi-provider practice (implied by “our dentists/our team”)

Work leads score 3–5 first.

---

## 3) CRM (Google Sheets) Template Spec
Create a Google Sheet with 2 tabs: **Leads** and **Activity Log**.

### Leads tab columns (with dropdowns)
**A** lead_id
**B** created_date
**C** business_name
**D** city
**E** state
**F** website
**G** phone
**H** decision_maker_name
**I** decision_maker_title (dropdown: Owner/Doctor, Practice Manager, Office Manager, Front Desk, Other)
**J** decision_maker_email
**K** booking_present (dropdown Y/N/Unknown)
**L** booking_vendor
**M** priority_score (0–5)
**N** stage (dropdown; see below)
**O** last_touch_date
**P** next_touch_date
**Q** channel_last (dropdown: Email, Phone, SMS, Craigslist, FB Group, Upwork)
**R** touch_count
**S** response (dropdown: None, Interested, Not now, Wrong contact, Unsubscribe)
**T** meeting_date
**U** trial_start_date
**V** notes

### Stage dropdown values (pipeline)
1. New
2. Enriched (email/DM found)
3. Contacted – Touch 1
4. Contacted – Touch 2
5. Engaged (replied/asked question)
6. Meeting Booked
7. Trial Live (7-day free)
8. Won (convert later)
9. Lost – Not a fit
10. Lost – No response
11. Do Not Contact

### Activity Log tab columns
date | lead_id | activity_type (Email/SMS/Call/VM) | outcome | notes | next_touch_date

Cadence rule: **every lead must have next_touch_date** unless stage is Won/Lost/DNC.

---

## 4) Booking CTA (Use everywhere)
If you have a calendar link, insert it. If not, keep the fallback.

**Primary CTA (calendar)**
“Open to a 10-minute walkthrough? Grab any slot here: [CALENDAR_LINK]”

**Fallback CTA (reply scheduling)**
“Or just reply with 2 times that work this week and I’ll confirm.”

Legitimacy + contact (include in footer or P.S.)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Email: agent_bob_replit+no-show-bot@agentmail.to

---

## 5) Cold Email Sequences (14-day cadence)
Sending guidance (free-first): start at 10–15/day/inbox, increase slowly; keep plain text; no attachments.

### Sequence A — Owner/Doctor (Dentist/Orthodontist)
**Email A1 (Day 1)**
Subject options:
1) “Quick idea to cut no-shows at {{Practice}}”
2) “Reducing missed appointments (no new staff)”

Body:
Hi Dr. {{LastName}},

I’m Bob. We’re piloting a simple no-show reducer for appointment-based practices: it sends smart SMS reminders, collects two-way confirmations (Y/N), and can prompt reschedules so your schedule stays full.

If you’re seeing even a few missed appointments/week, this usually pays for itself quickly (we’re offering a free 7‑day pilot right now).

Open to a 10-minute walkthrough? If you prefer, reply with 2 times that work and I’ll confirm.

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

**Email A2 (Day 3)**
Subject: “Worth testing for 7 days?”

Hi Dr. {{LastName}},

When patients don’t confirm, we automatically:
- ask them to confirm via text (two-way)
- if they can’t make it, capture a new time request
- optionally alert a waitlist to fill gaps

If you tell me roughly how many appointments/day you run, I can estimate the recovered revenue impact for {{Practice}}.

Want to try the free pilot?

— Bob

**Email A3 (Day 6)**
Subject: “Should I talk to your office manager?”

Hi Dr. {{LastName}},

This is usually owned by the office manager / practice manager. If there’s a better contact for reducing no‑shows + confirmations, who should I reach out to?

Also fine to say “not a priority” and I’ll close the loop.

— Bob

**Email A4 (Day 9)**
Subject: “Example text flow (30 seconds)”

Hi Dr. {{LastName}},

Example patient flow:
“Hi {{Patient}}, confirming your appointment at {{Practice}} on Tue 2pm. Reply Y to confirm or N to reschedule.”
- If Y: done
- If N: we capture preferred times and notify staff

If you want, I can set up a no-risk 7‑day trial for one provider schedule.

— Bob

**Email A5 (Day 14)**
Subject: “Close the loop?”

Hi Dr. {{LastName}},

Should I:
1) send details to the office manager,
2) circle back next month, or
3) close this out?

— Bob

Reply handling (Owner/Doctor)
- **Interested** → “Great—what PMS/scheduling tool do you use (Dentrix/OpenDental/etc.) and how many appointments/day? I’ll tailor the pilot.”
- **Not now** → “No problem—what month should I follow up?” set next_touch_date.
- **Wrong person** → ask for best contact; move stage to Enriched/Engaged.
- **Unsubscribe** → stage Do Not Contact.

---

### Sequence B — Office Manager / Practice Manager
**Email B1 (Day 1)**
Subject options:
1) “Two-way SMS confirmations for {{Practice}}”
2) “Cut no-shows + automate reschedules (free pilot)”

Body:
Hi {{FirstName}},

I’m Bob—reaching out because you likely own scheduling ops at {{Practice}}.

We’re running a free 7‑day pilot of an SMS no-show reducer:
- reminders + two-way confirmations
- if patient can’t make it, auto-captures reschedule request
- optional waitlist pings to backfill gaps
- simple analytics (missed appts reduced / revenue recovered)

If you want, I can set this up for one provider schedule and you can judge results.

Would a quick 10 minutes this week be crazy?

— Bob
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
agent_bob_replit+no-show-bot@agentmail.to

**Email B2 (Day 3)**
Subject: “What’s your current reminder process?”

Hi {{FirstName}},

Quick question—are reminders currently:
A) manual calls, B) one-way texts, C) email only, or D) built into your PMS?

If you reply with the letter, I’ll send the simplest setup for a 7‑day test.

— Bob

**Email B3 (Day 5)**
Subject: “Backfilling cancellations”

Hi {{FirstName}},

The biggest win we see is when a patient replies “N” and you instantly get:
- reschedule intent captured, and
- an option to ping a short waitlist to fill the hole.

Do you have a waitlist today (even informal)?

— Bob

**Email B4 (Day 8)**
Subject: “If I set it up, what do you need from me?”

Hi {{FirstName}},

Setup is light. For a pilot, we typically need:
- your appointment reminder wording preference
- which appointment types to include/exclude
- who should receive reschedule alerts

If you want, I’ll propose a default flow and you can edit it.

Want to run the free pilot starting next week?

— Bob

**Email B5 (Day 12)**
Subject: “Right contact?”

Hi {{FirstName}},

Am I reaching the right person for appointment confirmations / reminders at {{Practice}}?

If not, who should I contact?

— Bob

Reply handling (Manager)
- **Interested** → ask: “Which scheduling system + typical daily appointment volume + your current no-show % (rough guess ok).”
- **Already has solution** → “Understood—are confirmations two-way (Y/N) and do you automate reschedules? If not, we may still complement.”
- **Not now** → schedule follow-up date.

---

## 6) Simple Outreach Cadence Rules (multi-touch)
- Day 1: Email 1
- Day 2: If phone available and no email response, call + VM (optional)
- Day 3: Email 2
- Day 5/6: Email 3
- Day 8/9: Email 4
- Day 12–14: Email 5 close-the-loop

If any reply occurs → move to **Engaged**, set next step within 24 hours.

---

## 7) Channel Posting Snippets (CTA consistent)
Use same CTA: “Reply ‘Pilot’ and I’ll send the 7‑day setup.” Include website link for legitimacy.
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

(Reuse your previously written Craigslist/FB templates; plug the CTA + link above.)
