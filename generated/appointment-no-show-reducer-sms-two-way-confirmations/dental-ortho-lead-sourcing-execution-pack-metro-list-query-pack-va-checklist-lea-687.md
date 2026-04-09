# Dental/Ortho Lead Sourcing Execution Pack (Metro List + Query Pack + VA Checklist + Lead Schema v2)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T09:33:12.493Z

---

## Goal
Generate a steady daily pipeline of qualified dental + orthodontic practices (1–5 locations) with phone + website + at least one decision-maker contact path, sized to support closing 20–25 locations in 30 days. All outreach should reference the legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 and contact email: agent_bob_replit+no-show-bot@agentmail.to.

---
## A) Prioritized Metro List (Top 30 US/CA)
Use these metros first to maximize density of practices and likelihood of established appointment volume:
1. New York, NY
2. Los Angeles, CA
3. Chicago, IL
4. Houston, TX
5. Dallas, TX
6. San Francisco Bay Area, CA
7. Miami, FL
8. Atlanta, GA
9. Washington, DC
10. Philadelphia, PA
11. Boston, MA
12. Phoenix, AZ
13. Seattle, WA
14. Denver, CO
15. San Diego, CA
16. Austin, TX
17. Minneapolis, MN
18. Detroit, MI
19. Tampa, FL
20. Orlando, FL
21. Charlotte, NC
22. Raleigh-Durham, NC
23. Nashville, TN
24. St. Louis, MO
25. Kansas City, MO
26. Las Vegas, NV
27. Portland, OR
28. Toronto, ON
29. Vancouver, BC
30. Montreal, QC

Rotation rule: pull 20–40 leads per metro before moving to the next; revisit metros weekly.

---
## B) Copy/Paste Query Pack (Google Maps + Yelp)
### Google Maps queries (paste into Google Maps search)
- "dentist" + {city} + {state}
- "orthodontist" + {city} + {state}
- "cosmetic dentist" + {city} + {state}
- "pediatric dentist" + {city} + {state}
- "family dentistry" + {city} + {state}
- "dental clinic" + {city} + {state}
- "orthodontics" + {city} + {state}

Filters/selection rules:
- Prefer businesses with websites listed, >10 reviews (signal of stable ops), and visible phone.
- Skip: DSOs/brands with many locations (e.g., corporate chains) unless location manager contact is obvious.
- Prefer: practices that mention Invisalign/braces/implants (higher ticket = higher urgency to reduce no-shows).

### Yelp queries
- Category: Dentists / Orthodontists
- Location: {city}
- Sort: Yelp Sort (or Highest Rated)
- Pull fields: business name, phone, website, address, Yelp URL.

---
## C) VA/Agent Execution Checklist (From Listing → Decision Maker Contact)
For each practice, complete in this order (timebox 4–6 minutes/lead):
1) Capture core listing data
- Business Name (exact)
- Address (street + city + state/province)
- Phone
- Website URL (if none, mark “No website”)
- Source URL (Google Maps share link or Yelp profile)

2) Website scrape (fast)
- Find “Contact” page: capture any emails shown.
- Find “Team/Our Doctors/Providers” page:
  - Identify owner/lead dentist/orthodontist name(s).
  - Identify office manager/practice manager name(s) if listed.
- Look for booking software hints (optional but valuable): “NexHealth, Solutionreach, Weave, Zocdoc, Doctible, Simplifeye, Dentrix, Eaglesoft, OpenDental” etc.

3) Email discovery heuristics (no paid tools)
If no email visible, try these steps:
- Check footer + privacy policy + terms pages for an email.
- If site has staff directory, try common formats:
  - info@domain.com
  - office@domain.com
  - contact@domain.com
  - scheduling@domain.com
- If only a form exists: record “Contact Form Only = Yes” and capture form URL.

4) Decision maker targeting priority
Log contacts in this order of preference:
- Office/Practice Manager (usually owns scheduling process)
- Lead dentist/orthodontist/owner
- Front desk/scheduling coordinator (if explicitly listed)
If you cannot find a name, keep it generic ("Office Manager") but still log phone + website.

5) QA + dedupe
Before marking complete:
- Confirm phone has 10 digits (US/CA) and is not a call center (if suspected, note it).
- Dedupe key: normalize by (website domain) OR (phone) OR (name+address).

6) CRM next-step assignment
Every lead must have a “Next Action Date” set to today or tomorrow.
- If email found → next step: “Email Day 1” today.
- If no email but phone exists → next step: “Call/SMS attempt” today.
- If only contact form → next step: “Submit form + call” today.

---
## D) Lead List Schema v2 (CSV/Sheets columns)
### Required columns (minimum viable for outreach)
1. Lead ID (auto)
2. Practice Name
3. Vertical (Dental / Ortho)
4. City
5. State/Province
6. Country
7. Address
8. Phone
9. Website
10. Source (Google Maps / Yelp / Directory)
11. Source URL
12. Contact Type (Owner/Doctor / Office Manager / Front Desk / Generic)
13. Contact First Name
14. Contact Last Name
15. Contact Title
16. Contact Email
17. Contact Form URL (if no email)
18. Booking Software Hint (text)
19. Notes (free text)
20. Lead Status (New / Researched / Ready to Contact / Contacted / Replied / Booked / Closed-Won / Closed-Lost)
21. Next Action Date

### Optional columns (helpful for prioritization)
- Review Count
- Rating
- “Multi-location?” (Y/N)
- “Online booking?” (Y/N)
- Best time to call (if stated)
- Time zone

Validation rules:
- Phone: must match (###) ###-#### or ###-###-####
- Website: must start with http
- Country: US or CA for this sprint

---
## E) Daily Quotas (to hit 400–800 in a month)
- Target: 25–40 researched leads/day (with phone+website) per operator.
- Stretch: 50/day if metro density is high.
- Quality KPI: ≥40% of leads have either a direct email OR a named decision maker OR a contact form URL + phone.

---
## F) Outreach compliance note (Craigslist/FB Groups)
When posting, keep it value-led and avoid spam triggers:
- No exaggerated claims.
- Offer a quick audit + demo.
- Always include legitimacy URL and the contact email agent_bob_replit+no-show-bot@agentmail.to.

This pack is designed so lead sourcing immediately translates into same-day outreach, preventing pipeline rot and enabling consistent booking volume.