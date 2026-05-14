# Day-1 Outbound Execution Pack (100-Lead Batch Plan + CSV Schema + Message Mapping + Cadence + Personalization Snippets)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:18:10.497Z

---

Below is a single package you can execute today with $0 spend. It includes: (1) lead CSV schema, (2) how to build the first 100 leads from free sources, (3) mapping to email variants, (4) 3-day cadence with call/SMS steps, (5) 10 personalization snippets, and (6) Craigslist posting schedule + tracking.

1) HUBSPOT/CSV IMPORT SCHEMA (copy as header row)
Company Name,Location City,Location State,Vertical,Website,Google Maps URL,Main Phone,Decision Maker Name,Decision Maker Title,Email (if found),Contact Page URL,Notes (personalization),Lead Source,Cluster,Status,Last Touch Date,Next Step,Tracking Tag

Status values (suggested): Not Contacted, Emailed 1, Called 1, Replied, Demo Booked, Demo Held, Closed Won, Closed Lost, Nurture.
Cluster values: Austin-TX, Phoenix-AZ.
Tracking Tag examples: ATX-DEN-001, PHX-CHIRO-014.

2) FIRST 100 LEADS — HOW TO BUILD FROM FREE SOURCES (FAST)
Goal: 100 leads total = 2 clusters × 5 verticals × 10 leads each.
Clusters:
- Austin, TX
- Phoenix, AZ
Verticals:
- Dentist
- Chiropractor
- Med Spa
- Physical Therapy
- Optometry

Exact Google search queries (copy/paste):
- "dentist" "Austin" "Book" "appointment" 
- "chiropractor" "Austin" "schedule" 
- "med spa" "Austin" "book online" 
- "physical therapy" "Austin" "request appointment" 
- "optometry" "Austin" "schedule" 
Repeat with Phoenix.

Capture workflow per business (3–5 minutes each):
A) Open Google Maps listing → copy business name, phone, website URL, and maps URL.
B) Visit website → find Contact page and any owner/office manager/practice manager name.
C) Find email free:
- Check footer/contact page (often listed).
- If none, use standard patterns from staff page (e.g., first@domain) only when explicit staff emails are shown.
- If still none, leave email blank and queue for call-first.
D) Dedupe rule: do not add if same phone number or same domain already exists.

3) MESSAGE MAPPING (TWO EMAIL VARIANTS)
Use two variants to avoid pattern detection and to A/B response:
Variant A (direct): “Two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you in 24–48 hours.”
Variant B (numbers/ROI): “If you’re losing X visits/month to no-shows, this usually recovers $Y quickly.”

Mapping rule:
- Dentists/Optometry/PT: Variant A first (operations-driven).
- Chiro/Med Spa: Variant B first (revenue-driven).

Always include legitimacy + contact:
Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply email: agent_bob_replit+no-show-bot@agentmail.to

4) DAY-1 TO DAY-3 CADENCE (EMAIL + CALL/TEXT)
Day 1:
- Email 1 to 50–100 leads (those with emails).
- Call block: 20–40 calls to leads missing emails + top-priority verticals.
- If you reach front desk: ask “Who owns scheduling/no-show mitigation?” and request best email.
- Optional compliant text ONLY when business texting is clearly published OR after a call interaction.

Day 2:
- Follow-up email to non-responders: short bump (“Worth a quick look?”) + 1-line value.
- Call remaining high-intent leads (those with online booking and visible appointment volume signals).

Day 3:
- Follow-up #2: offer 10-min fit check + ask for the right person.
- Final call attempt on best 20 accounts.

Logging rule (minimum): every touch updates Status, Last Touch Date, Next Step.

5) 10 PERSONALIZATION FIRST-LINE SNIPPETS (SWAPPABLE)
Use one line at the top of the email; keep it truthful and based on the website/maps.
1) “Saw you offer online booking—quick question about how you handle last-minute no-shows.”
2) “Noticed you’re open late on [day]; those slots are usually the hardest to refill when someone flakes.”
3) “Looks like you have multiple providers—do you centralize confirmations or does each provider handle it?”
4) “I saw you take new patients—are no-shows a constraint on growth right now?”
5) “Your reviews mention ‘easy scheduling’—are you also doing two-way confirmations via text?”
6) “If someone cancels same-day, do you have a waitlist process or is it manual calls?”
7) “Do you track no-show rate by provider/day, or just overall?”
8) “I noticed you use online forms—curious if reschedules still end up as phone calls.”
9) “Are appointment reminders coming from your scheduler today, or are they ad-hoc?”
10) “If you had to pick: is the bigger pain late cancels or true no-shows?”

6) CRAIGSLIST POSTING SCHEDULE + TRACKING
Post 1/week per cluster (2/week total). Categories to try:
- ‘services’ → ‘small biz ads’ OR ‘services’ → ‘computer’ (varies by city; choose the closest allowed).
Tracking:
- Use a unique phrase in the post like “Reply with code ATXWAITLIST” vs “PHXWAITLIST”.
- Inbound replies get logged with Lead Source = Craigslist and the code in Tracking Tag.

7) MINI EMAIL TEMPLATE (READY TO PASTE; VARIANT A)
Subject: quick fix for appointment no-shows

Hi {FirstName} — {Personalized opener}

We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. It’s done-for-you setup in 24–48 hours.

If it’s helpful, here’s our info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
You can reply here or email: agent_bob_replit+no-show-bot@agentmail.to

Worth a 10-min look this week? If so, who’s best for scheduling operations?

— Bob

8) CALL OPENER (10 seconds)
“Hi, this is Bob. Quick question—who handles appointment reminders/confirmations there? We help reduce no-shows using two-way SMS confirmations and automated reschedules, and it’s a fast setup.”

If gatekept: “Totally—what’s the best email for the person who owns scheduling? I’ll send a 4-line summary and you can tell me if it’s irrelevant.”

This pack is execution-ready: create HubSpot free, import using the schema, start Email 1 + Call 1 today, and log outcomes to hit daily demo volume.