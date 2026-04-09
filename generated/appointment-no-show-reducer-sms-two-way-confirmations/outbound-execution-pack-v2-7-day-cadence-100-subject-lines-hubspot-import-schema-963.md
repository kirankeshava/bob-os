# Outbound Execution Pack v2 — 7-Day Cadence + 100 Subject Lines + HubSpot Import Schema + KPI Scoreboard (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T11:32:07.343Z

---

Business: Appointment No-Show Reducer (SMS + two-way confirmations + instant reschedules + waitlist fill)
Legitimacy URL (include in outreach when needed): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply/contact inbox: agent_bob_replit+no-show-bot@agentmail.to

========================
A) HUBSPOT-FRIENDLY LEAD IMPORT SCHEMA (200+ LEADS)
========================
Use these columns exactly (CSV). Minimum viable: Company, Website, City, Phone, Contact First Name, Contact Last Name/Role, Email.

1. company_name
2. location_name (if multi-location brand)
3. industry_vertical (Dentist | Chiro | Med Spa | PT | Optometry)
4. website_url
5. google_maps_url
6. street_address
7. city
8. state
9. zip
10. main_phone
11. owner_or_manager_name
12. owner_or_manager_role (Owner | Office Manager | Practice Manager | GM)
13. contact_email
14. secondary_email (optional)
15. scheduling_software (if visible: NexHealth/Doctolib/Square/Acuity/Calendly etc.)
16. appointment_volume_est (Low <50/mo | Med 50–200 | High 200+)
17. notes (free text: hours, services, any no-show language, online booking link)
18. lead_source (Google Maps | Yelp | Directory | Website)
19. first_touch_date
20. last_touch_date
21. touch_count
22. status_stage (Prospect | Contacted | Replied | Demo Booked | Demo Held | Closed Won | Closed Lost)
23. next_step (Call | Email follow-up | Demo | Nurture)
24. next_step_date
25. stop_reason (Do not contact | Wrong person | No appointments | Already solved | Not interested)

Dedupe rules (fast): dedupe by website_url first; if blank, dedupe by main_phone; if blank, dedupe by company_name + city.

========================
B) 7-DAY OUTBOUND CADENCE (EMAIL + CALL + VM + SMS)
========================
Goal: book demos fast and qualify (appointment volume, no-show rate, value/visit, decision maker).

Daily operating blocks:
- Block 1 (AM): 25–50 emails + 10–20 calls
- Block 2 (PM): 25–50 emails + 10–20 calls
Log every touch same day: touch_count, last_touch_date, outcome, next_step_date.

DAY 1 — First touch (Email #1 + call)
1) Send Email #1 to 50–100 leads.
2) Call top 20–40 (prefer those with visible online booking / multiple reviews).
3) If call hits voicemail: leave VM (script below) and send follow-up SMS only where compliant and a business number is clearly published.

DAY 2 — Follow-up #1 + call
1) Send Email Follow-up #1 to all non-responders from Day 1.
2) Call the same top 20–40 again (or next batch if unreachable).

DAY 3 — Pattern interrupt + call
1) Send short “quick question” email (2–3 sentences).
2) Call 20–40.

DAY 4 — Value proof + booking link
1) Send “recovered revenue” framing email + offer 10-min teardown.
2) Call 20–40.

DAY 5 — Breakup / permission
1) Send polite breakup email asking if you should close the loop.
2) Call 10–20 only hottest accounts.

DAY 6–7 — Nurture + recycled leads
1) Recycle leads with new angle (waitlist fill / reschedules / analytics).
2) Post 1–2 helpful FB group comments and 1 Craigslist post per city cluster.

Voicemail script (20 sec):
“Hi, this is Bob. Quick one — we help appointment-based locations cut no-shows using two-way SMS confirmations and instant reschedules, plus a waitlist to fill gaps. If you’re the right person for scheduling, call me back at [NUMBER] or reply to the email I sent — agent_bob_replit+no-show-bot@agentmail.to.”

Compliant SMS (only where appropriate; keep it neutral, include opt-out):
“Hi [Name] — Bob here. Quick question: are you the person who owns appointment scheduling at [Business]? We reduce no-shows with 2-way SMS confirmations + instant reschedules + waitlist fill. If not you, who should I contact? Reply STOP to opt out.”

========================
C) DAY-1 EMAIL PACK (READY TO SEND)
========================
Plain text only. Keep links minimal. Use legitimacy URL only when asked or when trust is needed.

EMAIL #1 (core offer)
Subject: (choose from list below)

Hi [First Name] — Bob here.

We help appointment-based locations reduce no-shows with two-way SMS confirmations + instant reschedules, and we can fill last-minute gaps from a waitlist.

If you’re currently losing even a few appointments/week, this usually pays for itself quickly. We do the setup for you in 24–48 hours.

Open to a 12-minute walkthrough this week?

— Bob
agent_bob_replit+no-show-bot@agentmail.to
(Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2 )

FOLLOW-UP #1 (Day 2)
Subject: Re: [same]

Hi [First Name] — should I talk to you or someone else about appointment reminders/confirmations at [Business]?

If it’s helpful, I can share a quick estimate of recovered revenue based on your weekly appointment volume + typical no-show rate.

— Bob
agent_bob_replit+no-show-bot@agentmail.to

QUICK QUESTION (Day 3)
Subject: quick question, [First Name]

Do you have more trouble with (1) no-shows or (2) late cancellations?

We handle both with two-way SMS confirmations + instant reschedules + waitlist fill.

— Bob

VALUE/PROOF (Day 4)
Subject: recovering missed appointments at [Business]

If you tell me (a) appts/week and (b) avg $ per visit, I’ll calculate what a 20–40% no-show reduction is worth per month.

If it’s meaningful, we can set you up in 24–48 hours.

— Bob
(overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2)

BREAKUP (Day 5)
Subject: close the loop?

Hi [First Name] — I don’t want to be a pest.

Should I (a) close the loop, or (b) is there someone else who owns scheduling/no-show reduction at [Business]?

— Bob

========================
D) 100 SUBJECT LINES (DELIVERABILITY-FRIENDLY)
========================
1. quick question about no-shows
2. reducing no-shows at [Business]
3. appointment confirmations
4. two-way SMS confirmations
5. reschedules + waitlist fill
6. missed appointments
7. last-minute cancellations
8. schedule gaps
9. confirm / cancel by text
10. cut no-shows this month
11. are you the right person?
12. scheduling at [Business]
13. appointment reminders
14. no-show reduction
15. filling gaps from a waitlist
16. quick idea for [Business]
17. about your bookings
18. a small fix for no-shows
19. question on confirmations
20. reschedule automation

(Dentist)
21. dental no-shows
22. hygiene schedule gaps
23. confirmations for hygiene
24. reduce dental cancellations
25. last-minute openings
26. filling chair time
27. chair time recovery
28. 2-way reminders for patients
29. confirm by text (dental)
30. reducing broken appointments

(Chiro)
31. chiro no-shows
32. missed adjustments
33. confirmations for patients
34. fill same-day gaps
35. reschedules by text
36. cut chiro cancellations
37. schedule consistency
38. reduce missed visits
39. two-way text reminders
40. appointment confirmations (chiro)

(Med Spa)
41. med spa no-shows
42. last-minute cancellations (spa)
43. fill openings fast
44. confirmations by text
45. waitlist for cancellations
46. reschedule automation (spa)
47. reduce lost service time
48. keep the book full
49. stop gaps in schedule
50. quick fix for no-shows

(PT)
51. PT no-shows
52. missed sessions
53. confirmations for PT
54. keep patients on schedule
55. reduce late cancels
56. fill cancellations
57. reschedule by text
58. schedule adherence
59. fewer missed visits
60. appointment reminders (PT)

(Optometry)
61. optometry no-shows
62. eye exam reminders
63. confirmations for exams
64. reduce missed appointments
65. last-minute openings (optometry)
66. fill schedule gaps
67. confirm/cancel by text
68. reschedule automation
69. waitlist for cancellations
70. keeping the day full

(Neutral / curiosity)
71. can I send a quick estimate?
72. worth a 12-min look?
73. is this a priority?
74. should I reach out to someone else?
75. who owns scheduling?
76. do you track no-show rate?
77. quick teardown for [Business]
78. reducing missed visits
79. small ops improvement
80. about appointment leakage

(Results framing)
81. recover missed revenue
82. stop losing booked visits
83. reduce no-show %
84. fewer empty slots
85. fill cancellations automatically
86. instant reschedules
87. two-way confirmations + reschedules
88. keep the book full
89. recover 3–10 visits/week?
90. reduce gaps next week

(Soft/low pressure)
91. open to a quick chat?
92. ok to ask a question?
93. right person for this?
94. should I close the loop
95. quick intro
96. about reminders
97. scheduling question
98. appointment flow
99. confirmations + waitlist
100. stop last-minute gaps

========================
E) KPI SCOREBOARD (DAILY + WEEKLY)
========================
Daily (per rep/day):
- New leads added:
- Emails sent:
- Email replies (positive/neutral/negative):
- Calls placed:
- Connects:
- Voicemails left:
- SMS sent (where compliant):
- Demos booked:
- Demos held:
- Closed won:
- Closed lost:
- Notes: top objection, best-performing subject line

Weekly rollup:
- Total sends / reply rate:
- Demo book rate per 100 sends:
- Demo show rate:
- Close rate from demos held:
- Median time to first reply:
- Top vertical + city cluster performance

Use the recovered revenue narrative during demo: appts/week × avg $/visit × no-show rate × expected reduction (20–40%) = monthly recovered revenue per location.
