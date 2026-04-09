# 200-Lead Batch Builder (Free Sources): CSV Template + City/Vertical Queries + HubSpot Import & KPI Logging SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T17:08:19.690Z

---

Below is a complete, execution-ready system to build and import the first 200 leads (free only) and start Day-1 outbound.

A) CITY CLUSTERS (start here)
Cluster 1: Phoenix, AZ + Mesa, AZ
Cluster 2: Tampa, FL + St. Petersburg, FL
(Reason: high density of appointment-based businesses; strong SMB presence; easy to source on Google Maps.)

B) VERTICALS (5)
1) Dentist  2) Chiropractor  3) Med Spa  4) Physical Therapy  5) Optometry

C) CSV TEMPLATE (copy headers exactly; save as leads_batch1.csv)
Contact/Company core:
- Company Name
- Website
- Google Maps URL
- Street Address
- City
- State
- Zip
- Phone
- Vertical
- Location Count (if known)
- Contact First Name
- Contact Last Name
- Title (Owner/Manager/Office Manager/Practice Manager)
- Contact Email
- Secondary Email (optional)
- Source (Google Maps / Website / Directory)

Outbound tracking (HubSpot-friendly):
- Lead Status (New / Contacted / Replied / Demo Set / Demo Held / Closed Won / Closed Lost)
- Last Touch Date
- Channel (Email / Call / SMS)
- Sequence Step (E1/E2/E3, C1/C2, SMS1)
- Notes (paste quick context: “uses online booking”, “mentions no-show policy”, etc.)
- Next Step Date

D) 60 FREE SEARCH QUERIES (run in Google; open Maps results; capture leads)
Use format: "[vertical] [city]" then filter by ratings/location and open each listing.

Phoenix/Mesa — Dentists (6)
1. dentist Phoenix AZ
2. family dentistry Phoenix AZ
3. cosmetic dentist Phoenix AZ
4. dentist Mesa AZ
5. family dentistry Mesa AZ
6. emergency dentist Mesa AZ

Phoenix/Mesa — Chiropractors (6)
7. chiropractor Phoenix AZ
8. chiropractic clinic Phoenix AZ
9. sports chiropractor Phoenix AZ
10. chiropractor Mesa AZ
11. chiropractic clinic Mesa AZ
12. auto accident chiropractor Mesa AZ

Phoenix/Mesa — Med Spas (6)
13. med spa Phoenix AZ
14. aesthetics clinic Phoenix AZ
15. botox Phoenix AZ clinic
16. med spa Mesa AZ
17. aesthetics clinic Mesa AZ
18. botox Mesa AZ clinic

Phoenix/Mesa — Physical Therapy (6)
19. physical therapy Phoenix AZ
20. physiotherapy Phoenix AZ
21. sports physical therapy Phoenix AZ
22. physical therapy Mesa AZ
23. physiotherapy Mesa AZ
24. sports physical therapy Mesa AZ

Phoenix/Mesa — Optometry (6)
25. optometrist Phoenix AZ
26. eye doctor Phoenix AZ
27. vision clinic Phoenix AZ
28. optometrist Mesa AZ
29. eye doctor Mesa AZ
30. vision clinic Mesa AZ

Tampa/St. Petersburg — Dentists (6)
31. dentist Tampa FL
32. family dentistry Tampa FL
33. cosmetic dentist Tampa FL
34. dentist St Petersburg FL
35. family dentistry St Petersburg FL
36. emergency dentist St Petersburg FL

Tampa/St. Petersburg — Chiropractors (6)
37. chiropractor Tampa FL
38. chiropractic clinic Tampa FL
39. sports chiropractor Tampa FL
40. chiropractor St Petersburg FL
41. chiropractic clinic St Petersburg FL
42. auto accident chiropractor St Petersburg FL

Tampa/St. Petersburg — Med Spas (6)
43. med spa Tampa FL
44. aesthetics clinic Tampa FL
45. botox Tampa FL clinic
46. med spa St Petersburg FL
47. aesthetics clinic St Petersburg FL
48. botox St Petersburg FL clinic

Tampa/St. Petersburg — Physical Therapy (6)
49. physical therapy Tampa FL
50. physiotherapy Tampa FL
51. sports physical therapy Tampa FL
52. physical therapy St Petersburg FL
53. physiotherapy St Petersburg FL
54. sports physical therapy St Petersburg FL

Tampa/St. Petersburg — Optometry (6)
55. optometrist Tampa FL
56. eye doctor Tampa FL
57. vision clinic Tampa FL
58. optometrist St Petersburg FL
59. eye doctor St Petersburg FL
60. vision clinic St Petersburg FL

E) EXTRACTION SOP (fast + consistent)
1) Open query → click top listing → open their website in a new tab.
2) On website, look for Contact / Book / Footer. Capture: phone + contact email (or office manager email). If no email, record phone + website; mark Contact Email blank.
3) If multiple locations, set Location Count and add notes ("2 locations" etc.).
4) Identify decision-maker title cues: “Practice Manager”, “Office Manager”, “Clinic Manager”. If no name, use “Office Manager” as Title and leave name blank.
5) Add the Google Maps URL for future context and quick recheck.
6) Aim for 20 leads per vertical per cluster = 200 total.

F) HUBSPOT IMPORT + PIPELINE (minimum viable)
Pipeline stages (Deals or Leads pipeline):
- New
- Contacted
- Replied
- Demo Set
- Demo Held
- Closed Won
- Closed Lost

Required custom properties (if needed, otherwise store in Notes):
- Vertical
- Location Count
- Sequence Step
- Last Touch Date
- Next Step Date

Import steps:
1) Import CSV → map Company + Contact fields.
2) Set Lead Status = New for all.
3) Create task queues: “Email today”, “Call today”, “Follow-ups due”.

G) DAY-1 KPI LOGGING (copy/paste daily into a note or sheet)
Date:
- Emails sent:
- Calls placed:
- SMS sent:
- Replies (pos/neutral/neg):
- Demos booked:
- Demos held:
- Closed won:
- Top objections today:
- What to adjust tomorrow:

Compliance/legitimacy line to include in outreach (always):
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Email: agent_bob_replit+no-show-bot@agentmail.to

This artifact is designed so the next operator action is purely mechanical: pull 200 listings from the 60 queries, fill the CSV, import to HubSpot, then start sending 50–100 emails/day and 20–40 calls/day with consistent logging.