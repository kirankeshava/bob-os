# Dental/Ortho Lead Sourcing Engine + Lead List Schema + Cold Email Sequences (Owner & Office Manager)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T20:07:34.406Z

---

Goal: build a steady daily pipeline capable of closing 20–25 locations in 30 days for the Appointment No-Show Reducer (SMS + two-way confirmations + reschedules + waitlist fill + simple analytics).

A) Lead list schema (CSV / Google Sheets columns)
Required columns (minimum viable for outreach):
1) Lead_ID (auto: METRO-####)
2) Vertical (Dental / Ortho)
3) Practice_Name
4) Location_Name (if multi-location)
5) Street_Address
6) City
7) State
8) ZIP
9) Country
10) Phone_Main (E.164 if possible)
11) Website_URL
12) Booking_URL (if visible)
13) Scheduling_Software (if detectable: NexHealth, Weave, Solutionreach, Doctible, ModMed, etc.)
14) Google_Maps_URL
15) Yelp_URL
16) Decision_Maker_Name (Owner/Doctor/Practice Manager/Office Manager)
17) Decision_Maker_Title (Owner, Practice Manager, Office Manager, Operations)
18) Email_Primary (best)
19) Email_Secondary
20) Email_Source (Website / Directory / Whois / Contact page)
21) Confidence_Email (High/Med/Low)
22) Last_Contacted_Date
23) Channel_Last (Email/SMS/Call/Upwork)
24) Stage (dropdown; see CRM section)
25) Next_Step
26) Next_Step_Due
27) Notes (e.g., “online booking present”, “new patient form”, “hours”, “2 chairs”, etc.)

Validation rules (fast QA):
- Phone must be on the practice website OR Google Business listing.
- Email “High confidence” only if it appears on the practice domain website (Contact page/footer) or on an official directory listing.
- If no email is available, still include lead (phone-first) but mark Email_Primary blank and Confidence_Email = Low.
- Exclude: corporate DSOs with >10 locations, locations without reachable phone, practices clearly closed.

B) Lead sourcing SOP (free tools only)
Target ICP: Independent dental + orthodontic practices, 1–5 locations, that book appointments by phone and/or have online booking.

Daily quota plan:
- Researcher quota: 60–120 leads/day raw capture.
- Enrichment quota: 30–60 leads/day with email found.
- QA quota: 50 leads/day spot-checked (phone + website + at least one contact method).
Weekly target: 400–800 leads added to CRM.

Step 1 — Pick metros (speed wins):
Choose 5–10 high-density metros/week (e.g., Phoenix, Dallas, Atlanta, Tampa, Denver, Charlotte, San Diego, Seattle, Chicago, Minneapolis). Rotate to avoid list exhaustion.

Step 2 — Google Maps capture (primary source):
Search queries:
- “dentist in {city}”
- “orthodontist in {city}”
- “family dentistry {city}”
Open each listing → collect: Practice name, phone, website, address, Google Maps URL.
Rule: prioritize listings with (a) website present, (b) open hours, (c) reviews >10.

Step 3 — Website enrichment (decision maker + email):
Open website → check:
- Contact page (emails, contact form)
- Footer (practice email)
- Team/About (owner doctor name)
- “Request Appointment” (booking/scheduling vendor)
Capture: Decision maker name/title if present; Email(s) if shown; Booking URL if present.
Heuristic: office manager emails often appear as info@, hello@, frontdesk@, office@, scheduling@.

Step 4 — Yelp backup:
If Google listing lacks website/email, search Yelp for the practice and capture website/phone and any contact links.

Step 5 — State dental directories (owner name):
Use state dental association “Find a dentist” directories to confirm practice legitimacy and sometimes dentist-of-record names. Add decision-maker name even if email absent.

Step 6 — Record scheduling software signal (optional but useful):
Look for page scripts/badges like NexHealth, Weave, Solutionreach, Doctible, LocalMed, ModMed, etc. Even “Text us” widgets matter.

Step 7 — QA spot check:
Randomly check 10% of new leads/day:
- Website loads
- Phone matches Google listing
- Email not obviously generic personal (gmail) unless it’s the only option and shown publicly.

C) CRM pipeline (stages + rules)
Stage dropdown values:
1) New (uncontacted)
2) Enriched (email/DM identified)
3) Contacted – Email 1
4) Contacted – Follow-up
5) Two-way engaged (reply/answered)
6) Demo booked
7) Trial active (7-day free)
8) Closed-won (paid later)
9) Closed-lost
10) Nurture

Next-step rules:
- Every record must always have Next_Step + Next_Step_Due.
- If Contacted – Email 1 with no reply in 48h → move to Contacted – Follow-up.
- If any positive reply → Two-way engaged and set Next_Step to “Send booking link + 2 questions”.

D) Outreach cadence (14 days, multi-touch)
Day 1: Email 1
Day 3: Email 2 follow-up
Day 5: Call (or voicemail) + short email “tried calling”
Day 7: Email 3 (case-style math)
Day 10: Email 4 (breakup / permission)
Day 14: Nurture tag if no response

(If phone/SMS is used, only message numbers that are clearly business lines and keep it compliance-safe: identify business + opt-out language.)

E) Cold email sequences (ready to paste)
Always include legitimacy + contact:
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
- Reply-to / contact: agent_bob_replit+no-show-bot@agentmail.to

Sequence 1: Owner/Doctor
Email 1 (Day 1)
Subject options:
1) Quick way to cut no-shows at {{Practice}}
2) {{City}} dental no-shows — quick fix
3) 7-day pilot for reminders + confirmations

Body:
Hi Dr. {{LastName}} — Bob here.

If {{Practice}} is like most dental/ortho offices, last-minute no-shows and “forgot the appointment” gaps quietly cost a few thousand/month.

I’m testing a lightweight system that:
- texts smart reminders
- collects two-way confirmations (Y/N)
- auto-handles reschedule requests
- optionally pings a waitlist to fill openings
- shows simple analytics: recovered appointments → recovered revenue

Could I run this for {{Practice}} as a free 7-day pilot and show you the numbers?

If you’re open, reply with:
1) your average new patient exam value (rough is fine)
2) how many appointments you book per day

Legitimacy/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Or email me directly: agent_bob_replit+no-show-bot@agentmail.to

– Bob

Email 2 (Day 3) — nudge
Subject: Re: cut no-shows at {{Practice}}

Hi Dr. {{LastName}} — quick follow-up.

Even a small drop in no-shows (e.g., 1–2 saved appointments/week) usually pays for itself fast. I’m offering the 7-day pilot free to prove impact.

Worth trying at {{Practice}}? If yes, who’s best to coordinate with—your office manager or front desk lead?

– Bob
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Email 3 (Day 7) — simple math
Subject: math on {{Practice}} no-shows

Dr. {{LastName}},

If {{Practice}} books ~{{X}} appts/day and even 2/week no-show, that’s ~8/month.
At ${{Y}}/visit, that’s ${{Y*8}} in recoverable revenue.

The pilot is free for 7 days; if it doesn’t save real appointments, you drop it.

Should I send a 2-minute setup checklist?

– Bob (agent_bob_replit+no-show-bot@agentmail.to)

Email 4 (Day 10) — breakup/permission
Subject: close the loop?

Dr. {{LastName}},

Should I (a) send details to your office manager, (b) circle back next month, or (c) close this out?

– Bob

Sequence 2: Office Manager / Practice Manager
Email 1 (Day 1)
Subject options:
1) Reduce no-shows + confirm by text (free 7-day pilot)
2) Front desk time-saver for confirmations
3) Fill last-minute openings from a waitlist

Body:
Hi {{FirstName}} — Bob here.

I’m reaching out because many dental/ortho offices spend a lot of front desk time on:
- reminder calls/texts
- tracking confirmations
- rescheduling requests
- trying to fill last-minute holes

I built a simple SMS workflow that does two-way confirmations and routes “reschedule” requests automatically, with basic analytics on saved appointments.

Could I run a free 7-day pilot for {{Practice}} so you can see whether it reduces no-shows and saves staff time?

If you reply “yes,” I’ll send:
1) what number you want texts to come from (or use your main line)
2) what your confirmation window is (24/48 hours)
3) your appointment types (e.g., hygiene, new patient, ortho adjustment)

Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Contact: agent_bob_replit+no-show-bot@agentmail.to

– Bob

Follow-up (Day 3)
Subject: Re: free pilot for {{Practice}}

Hi {{FirstName}} — checking if you’re the right person for reducing no-shows / confirmations.

If not, who owns scheduling operations at {{Practice}}?

– Bob

Reply-handling macros (copy/paste)
1) Positive reply:
“Great — thanks. To set up the 7-day pilot, can you share (a) your main scheduling phone number, (b) typical reminder timing (24/48 hrs), and (c) top 3 appointment types? I’ll send back a one-page plan and we can start within 24 hours.”

2) ‘We already use reminders’:
“Totally — most offices do. The difference here is two-way confirmations + automated reschedules + waitlist fill + a simple recovered-revenue report. If you’re open, we can run it alongside your current process for 7 days (free) and compare no-shows.”

3) Not interested:
“Understood — thanks. If it helps later, I can share a checklist to reduce no-shows without changing your scheduling software. Want that?”

F) Booking link (free-first)
For now (no spend): use a Google Calendar appointment schedule or a simple ‘reply with 2 times’ workflow. Once allowed to spend later, move to a dedicated booking tool + calendar routing.

Operating note: This engine is designed so a single operator can source 60–120 leads/day and still run outreach, while QA keeps bounce/garbage low. Next step is compiling a seed list of 50–100 leads in 2–3 metros to validate the real-world speed and email availability rate.