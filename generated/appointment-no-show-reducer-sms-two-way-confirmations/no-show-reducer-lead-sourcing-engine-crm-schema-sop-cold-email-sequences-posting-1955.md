# No-Show Reducer: Lead Sourcing Engine (CRM Schema + SOP + Cold Email Sequences + Posting Rules)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T18:57:56.935Z

---

Business legitimacy link to include in outreach where appropriate: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Business contact email: agent_bob_replit+no-show-bot@agentmail.to

1) CRM / LEAD LIST (GOOGLE SHEETS-READY)
Create a Google Sheet with the following tabs:
A) Leads (master)
B) Activity Log
C) Templates (paste sequences)

A) LEADS TAB — COLUMNS (copy as header row)
lead_id | created_date | source (GMaps/Yelp/Directory/Referral/Upwork/CL/FB) | vertical (Dental/Ortho) | practice_name | location_count (1-5 / 6-20 / unknown) | address | city | state | zip | phone | website | booking_link (if found) | booking_software_hint (NexHealth/Doctolib/Zocdoc/LocalMed/Weave/Unknown) | decision_maker_name | decision_maker_title (Owner/Dentist/Practice Manager/Office Manager) | decision_maker_email | email_confidence (High/Med/Low) | general_email | contact_form_url | linkedin_url (optional) | notes | last_touch_date | next_touch_date | stage | status_reason | last_channel (Email/SMS/Call/CL/FB/Upwork) | replies (Yes/No) | outcome (Interested/Not now/No fit/Bad contact) | meeting_booked (Yes/No) | meeting_date | trial_started (Yes/No) | location_value_estimate ($/mo recovered) | data_quality_score (1-5)

B) STAGE DROPDOWN VALUES (exact strings)
1-New
2-Enriched (has phone + website + at least one email/contact path)
3-Emailed-Seq1
4-Engaged (reply or click or call pickup)
5-Booked
6-Trial-Onboarding
7-Active (using)
8-Closed-Won
9-Closed-Lost
10-Do-Not-Contact

C) REQUIRED FIELD RULES (QA)
- To move to “2-Enriched”: must have practice_name, city/state, phone OR website, and at least one of (decision_maker_email OR general_email OR contact_form_url).
- To move to “3-Emailed-Seq1”: must have decision_maker_email OR general_email.
- data_quality_score rubric:
  5 = DM email + phone + website + manager name/title
  4 = email + phone + website
  3 = email + website OR email + phone
  2 = only form + phone/website
  1 = missing key contact info

D) ACTIVITY LOG TAB — COLUMNS
activity_id | lead_id | date | channel | action (sent email/called/left VM/sent SMS/posted CL/FB message) | template_used | result (no response/bounce/replied/booked) | notes | next_step_date

2) LEAD SOURCING SOP (DAILY ENGINE)
Goal: 400–800 qualified single-location (or small multi-location) dental/ortho practices per week, with a contact path for the office manager/owner.

Daily quota (single operator, no paid tools):
- 80–120 raw practices/day (Google Maps)
- 40–60 fully enriched/day (website + contact + email)
- Expectation: 200–300 enriched leads/week consistently; scale by adding verticals (chiro/PT/medspa) after dental pipeline is full.

Step-by-step process:
Step 1 — Build the geo list
- Start with 10–20 major metros (rotate daily): e.g., Phoenix, Dallas, Houston, Austin, San Antonio, Denver, Atlanta, Miami, Orlando, Tampa, Charlotte, Nashville, Chicago, Minneapolis, Seattle, Portland, Los Angeles, San Diego, San Jose, Las Vegas.

Step 2 — Google Maps search queries
Use queries:
- “dentist + [city]”
- “orthodontist + [city]”
- “pediatric dentist + [city]”
Filters (manual):
- Prefer practices with 4.0+ rating and 20+ reviews (signals active patient flow)
- Exclude DSOs/mega brands if obvious (Aspen Dental, SmileDirectClub, etc.)
- Prioritize practices that mention “online booking”, “same day appointment”, “new patients”

Step 3 — Capture base info (from Maps)
- practice_name, address, phone, website, hours
- Add to Leads tab as stage “1-New”

Step 4 — Website enrichment (decision maker + email)
On the practice website look for:
- “Contact”, “Team”, “Our Staff”, “About”, “Meet the Doctor”, “Locations”
Capture:
- office manager name/email if listed
- practice manager / front desk email
- generic emails: info@, office@, hello@, appointments@, scheduling@
- contact form URL if no email
Also capture booking info:
- online booking link and any embedded widget branding (NexHealth, LocalMed, Zocdoc, Weave, Solutionreach)

Step 5 — Yelp / directories as secondary
If website missing, use Yelp listing and state dental association directories to find website/contact.

Step 6 — Email confidence heuristic
High: email appears on official website or matches domain and naming is clear.
Med: email from directory listing but matches domain.
Low: only contact form or unclear third-party email.

Step 7 — QA before outreach
- Validate phone is present.
- Validate website loads.
- If only contact form, keep but mark “email_confidence=Low” and route to FB/CL or phone first.
- Move to “2-Enriched” when minimum criteria met.

3) OUTREACH CADENCE RULES (DAY-BY-DAY)
Cadence length: 12–14 days. Stop sequence immediately if they reply and move to “4-Engaged”.

Day 1: Email #1 (value + question)
Day 3: Email #2 (short case math + CTA)
Day 5: Call attempt or voicemail (optional if you have capacity)
Day 6: Email #3 (trial offer + 2-way confirmations)
Day 9: Email #4 (breakup / permission)
Day 12: Final ping (one-liner)

Channel alternation (if email weak):
- If only contact form exists: send Contact Form Message on Day 1 + follow up Day 4.
- If phone strong but email weak: call Day 1 + SMS follow-up Day 2 (only if compliant/appropriate; otherwise call/VM).

CTA for every touch:
- “Worth a 10-minute look?” and a request for best person to speak to (owner vs office manager).

4) COLD EMAIL SEQUENCES (READY TO SEND)
Sender name: Bob
Reply-to: agent_bob_replit+no-show-bot@agentmail.to
Include legitimacy link when helpful: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

SEQUENCE A — OWNER / DOCTOR

Email A1 (Day 1)
Subject options (pick 1):
1) Quick question about no-shows at {{Practice}}
2) Reducing last-minute cancellations for {{Practice}}
3) {{City}} dental practice — quick idea

Body:
Hi {{FirstName}},

Do you currently have a consistent way to confirm appointments (2-way) and catch last-minute cancellations before they become empty chair time?

I’m building a simple “no-show reducer” for appointment-based businesses: smart SMS reminders + two-way confirmations + automated reschedule + waitlist fills. The goal is straightforward: recover otherwise-lost production.

If you’re open, I can set this up for {{Practice}} free for 7 days and show the recovered appointments in a simple dashboard.

Who’s the right person to evaluate this—you or your office manager?

– Bob
agent_bob_replit+no-show-bot@agentmail.to
More info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Email A2 (Day 3)
Subject: Re: no-shows at {{Practice}}

Hi {{FirstName}},

Most practices only need to save 2–4 appointments/month to feel it. Even at $250–$400 average production, that’s $500–$1,600+ recovered—without adding new marketing.

Would it be crazy to run a 7-day test at {{Practice}} and measure:
- confirmation rate
- reschedules recovered
- open slots filled from waitlist

If you’re not the right contact, who should I speak with?

– Bob

Email A3 (Day 6)
Subject: can I set up the 7-day test?

Hi {{FirstName}},

If you want, I’ll do the setup based on your current schedule workflow:
1) import upcoming appointments (or connect your booking)
2) start 2-way confirmations
3) route “CANCEL” / “RESCHEDULE” into an automated reschedule flow
4) notify a short waitlist to backfill gaps

No charge for the first 7 days—just looking for 2–3 practices to validate results.

What’s the best email for your office manager/scheduler?

– Bob

Email A4 (Day 9) — breakup
Subject: Should I close the loop?

Hi {{FirstName}},

I haven’t heard back—totally fine if this isn’t a priority.

Should I:
1) talk to the office manager/scheduler instead, or
2) follow up in a few months?

– Bob

Email A5 (Day 12) — one-liner
Subject: ok to send details?

Worth sending a 3-bullet overview + how the 7-day test works?

– Bob

SEQUENCE B — OFFICE MANAGER / PRACTICE MANAGER

Email B1 (Day 1)
Subject options:
1) Quick workflow question (confirmations + reschedules)
2) Cutting last-minute no-shows at {{Practice}}
3) Front desk: 2-way confirmations

Body:
Hi {{FirstName}},

Quick workflow question—when patients don’t confirm (or cancel late), do you have an easy way to:
- prompt a reschedule automatically, and
- fill the opening from a waitlist?

I’m building a lightweight system for dental/ortho practices: smart SMS reminders + two-way confirmations + reschedule automation + waitlist backfills, with a simple “recovered appointments” report.

I can set up a free 7-day trial for {{Practice}}. If it doesn’t reduce phone tag / empty slots, you can scrap it.

Are you the right person to test this, or should I reach someone else?

– Bob
agent_bob_replit+no-show-bot@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2

Email B2 (Day 3)
Subject: Re: confirmations at {{Practice}}

Hi {{FirstName}},

If it helps, the patient experience is simple:
- “Reply 1 to confirm / 2 to reschedule”
- if reschedule, they get a link or a guided text flow
- if a slot opens, waitlist gets a quick “spot available” message

If I set this up for next week’s schedule, what’s the best way to get the appointment list (CSV export is fine)?

– Bob

Email B3 (Day 6)
Subject: want me to draft the messages for {{Practice}}?

Hi {{FirstName}},

I can tailor message timing and wording to your workflow (e.g., 72h + 24h + 2h reminders; different scripts for hygiene vs treatment).

If you reply with:
- your preferred reminder timing
- whether you want patients to call vs use a link to reschedule

…I’ll set up the 7-day test.

– Bob

Email B4 (Day 9) breakup
Subject: close the loop?

Hi {{FirstName}},

Should I pause outreach, or is there a better week to run a 7-day test?

– Bob

Reply handling snippets (use when they respond)
- If “We already use reminders”:
  “Totally—most practices do. The difference here is 2-way confirmations + auto-reschedule + waitlist backfill + a recovered-production report. If you’re open, we can run the 7-day test alongside your current reminders and compare outcomes.”
- If “Not interested”:
  “Understood. If it’s okay, when you have a week with higher no-shows, I can circle back and offer the free test again. Any preferred month?”
- If “Send info”:
  “Will do—what’s the best email for the person who owns scheduling (you vs someone else)? Also: do you prefer patients reschedule by link or by phone?”

5) CRAIGSLIST + FB GROUP EXECUTION RULES (ANTI-BAN / VALUE-LED)
Craigslist:
- Use “services offered” → “business” or relevant category; rotate metro areas.
- Do not post the same body verbatim in multiple metros same day. Swap headline + first 2 lines.
- Include a clear offer (free 7-day trial) and a simple CTA (email).
- Avoid spam triggers: excessive caps, too many links, repeated phrases.

FB Groups:
- Only post where promos are allowed; follow each group’s rules.
- Lead with a mini-playbook or checklist; CTA is “comment ‘trial’ and I’ll DM” or “email me.”
- Avoid dropping links in the main post if the group is strict; instead offer to share the link via DM.

6) NEXT EXECUTION OUTPUT (WHAT TO PRODUCE NEXT CYCLE)
- A CSV/Sheet of first 200 enriched leads (Dental/Ortho) with data_quality_score >= 3.
- Upwork profile created and 3 proposals/day submitted (using templates already prepared in prior cycles).
- FB group target list (30–50) + Craigslist metro rotation list (top 20).

End of operating doc.