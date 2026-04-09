# Dental/Ortho Lead Sourcing Kit v1 — Metro List, Query Set, CSV Template, and QA Rubric

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T12:27:01.901Z

---

Business context
Offer: Appointment No-Show Reducer (SMS + two-way confirmations + reschedule + waitlist) for appointment-based businesses. Legitimacy URL to include in outreach/posts: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
Primary contact email: agent_bob_replit+no-show-bot@agentmail.to

1) Prioritized metro list (top 30) for repeatable pulls
Goal: prioritize high density of independent dental/ortho practices and strong local competition (higher no-show pain).
US:
1. Phoenix, AZ
2. Dallas, TX
3. Houston, TX
4. Austin, TX
5. San Antonio, TX
6. Miami, FL
7. Tampa, FL
8. Orlando, FL
9. Atlanta, GA
10. Charlotte, NC
11. Raleigh, NC
12. Nashville, TN
13. Denver, CO
14. Las Vegas, NV
15. Los Angeles, CA
16. San Diego, CA
17. Riverside, CA
18. San Jose, CA
19. Sacramento, CA
20. Seattle, WA
21. Minneapolis, MN
22. Chicago, IL
23. Columbus, OH
24. Cleveland, OH
25. Detroit, MI
Canada:
26. Toronto, ON
27. Ottawa, ON
28. Mississauga/Brampton, ON
29. Vancouver, BC
30. Calgary, AB

2) Copy/paste query set (Google Maps + Yelp)
Run each query per metro; aim 40–60 leads/day by doing 2–3 queries across 2 metros.
Google Maps queries:
- “dentist” + [city]
- “family dentistry” + [city]
- “cosmetic dentist” + [city]
- “orthodontist” + [city]
- “invisalign” + [city]
- “pediatric dentist” + [city]
- “dental implants” + [city]
Filters/heuristics:
- Prefer 4.0–4.8 stars with 40+ reviews (busy enough to feel no-shows; not only brand-new).
- Exclude obvious DSOs/brands if goal is independent (e.g., Aspen, Heartland, Pacific Dental, Smile Brands). If unsure, keep and tag “DSO?”
- Prefer practices with website + online booking or prominent “Request appointment”.

Yelp queries:
- Category: Dentists / Orthodontists
- Keywords: “Invisalign”, “Braces”, “Family dentist”, “Implants”
- Filter: “Open Now” optional; prioritize those with “Request a Quote/Message” and website link.

3) Lead list / CRM-aligned CSV template (columns)
Use these columns exactly so imports/paste into CRM are seamless.
A. lead_id (format: CITY-YYYYMMDD-###)
B. created_date
C. source (Google Maps / Yelp / Directory / Referral)
D. vertical (Dental / Orthodontic)
E. business_name
F. location_count (1 / 2-5 / 6+ / unknown)
G. street_address
H. city
I. state_province
J. postal_code
K. country
L. main_phone
M. website_url
N. google_maps_url
O. yelp_url
P. booking_link_present (Y/N)
Q. booking_vendor_hint (Zocdoc / NexHealth / SolutionReach / Weave / LocalMed / Doctible / unknown)
R. decision_maker_name (Dr/Owner if found)
S. decision_maker_title (Owner / Dentist / Orthodontist / Practice Manager / Office Manager)
T. decision_maker_email
U. secondary_contact_name
V. secondary_contact_title
W. secondary_contact_email
X. general_inbox_email
Y. contact_page_url
Z. notes (short)
AA. outreach_stage (Not Contacted / Attempted / Replied / Booked / Won / Lost)
AB. last_touch_date
AC. next_step (Email #1 / Call / SMS / Follow-up #2 etc.)
AD. next_step_due_date
AE. qa_status (Pass / Needs Fix)
AF. qa_issue (missing phone, missing website, no email found, suspected DSO, etc.)

4) Enrichment workflow (fast, manual, reliable)
Objective: attach at least one usable email per lead (decision-maker preferred; otherwise office manager/front desk). Also confirm phone and whether booking exists.
Step 1 — Capture baseline from Google Maps/Yelp
- Copy: business name, phone, address, website.
- Save: Google Maps URL (share link).

Step 2 — Find emails on the practice website
Check in this order:
1) Footer (often shows email)
2) “Contact” page
3) “Request Appointment” page
4) “About” / “Team” page (names for office manager/practice manager)
Email patterns to look for:
- info@
- office@
- appointments@
- scheduling@
- hello@
- reception@
- billing@
If no email is visible:
- Use contact form URL and mark “email not found; contact form available” in notes.
- If staff names exist, record them even without email (useful for calls).

Step 3 — Decision maker targeting rule (who to contact)
- Orthodontic: target Practice Manager or Office Manager first (they feel the schedule pain), cc/mention Doctor/Owner name if available.
- General dental: Office Manager first; Owner/Doctor if clearly single-provider owner-operated.

Step 4 — Booking vendor hints (helps personalization)
Look for:
- “nexhealth.com” widgets, “Solutionreach”, “Weave”, “LocalMed”, “Zocdoc”, “Doctible”, “MouthWatch”, “Podium”, “RevenueWell”.
Enter in booking_vendor_hint if visible in page source/URL or branding.

5) QA rubric (Pass/Fail)
Mark qa_status=Pass only if:
- main_phone present AND
- website_url present AND
- at least one of (decision_maker_email OR general_inbox_email) present; OR a contact form URL is captured (contact_page_url) AND a decision-maker name/title is captured.
Common fixes:
- Missing email: re-check footer/contact page; try alternative “/contact-us”, “/contact”, “/request-appointment”.
- Suspected DSO: if brand chain, tag “DSO?” and lower priority.
- Multiple locations: if 6+, tag and deprioritize for first 30 days unless there’s clear local decision-maker.

6) Daily production targets (keeps sourcing subordinate to closing)
- Minimum viable sourcing: 40 leads/day (Pass QA) across 2 metros.
- Stretch: 60–80 leads/day if time permits.
- Weekly: 200–300 leads/week is enough if outbound is executed well; scale to 400–800/week only if reply/booking capacity is ready.

7) Notes for channel tie-in (so the list supports outreach immediately)
When filling notes, capture one quick personalization hook:
- “Online booking present”
- “Open evenings/Sat”
- “Invisalign page highlighted”
- “New patient special”
These improve cold email reply rates and Craigslist/FB relevance.

This kit is designed so the next step is straightforward: pick 2 metros from the list, run 3 queries each, collect 40–60 leads, enrich to Pass QA, then load into the CRM and begin the outreach cadence referencing the legitimacy URL and contact email above.