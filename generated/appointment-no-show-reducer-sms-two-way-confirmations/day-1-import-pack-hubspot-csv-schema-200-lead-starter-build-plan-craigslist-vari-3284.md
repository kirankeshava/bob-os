# Day-1 Import Pack (HubSpot CSV Schema + 200-Lead Starter Build Plan + Craigslist Variants + Inbound Triage)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:56:01.134Z

---

Below is an execution-ready Day-1 Import Pack you can paste into a spreadsheet and save as CSV for HubSpot import (free). It includes (1) the exact columns to use, (2) a starter set of populated example rows (you will expand to 200 by repeating the same method), (3) segmentation rules for first-touch sends/calls, and (4) Craigslist post variants + inbound triage script.

A) HUBSPOT CONTACTS CSV (copy header exactly)
First Name,Last Name,Email,Phone,Company Name,Website,City,State,Vertical,City Cluster,Role (Guess),Lead Source,Status,Last Touch Date,Next Step,Notes

B) POPULATED STARTER ROWS (EXAMPLES — expand using the same method)
(These are examples of the format. When building the real list, pull from Google Maps listings + the business website “Contact” page. If no direct email exists, capture the contact form URL and phone, and put "" in Email.)

First Name,Last Name,Email,Phone,Company Name,Website,City,State,Vertical,City Cluster,Role (Guess),Lead Source,Status,Last Touch Date,Next Step,Notes
"","","","(602) 000-0000","[Phoenix Dentist Example 1]","https://[their-site].com","Phoenix","AZ","Dentist","Phoenix","Owner/Office Manager","Google Maps","New","","Email first-touch","Found on Maps; capture booking system used from site"
"","","","(602) 000-0000","[Phoenix Chiro Example 1]","https://[their-site].com","Phoenix","AZ","Chiropractor","Phoenix","Owner","Google Maps","New","","Call block A","If voicemail: text follow-up (where permitted)"
"","","","(602) 000-0000","[Phoenix Med Spa Example 1]","https://[their-site].com","Scottsdale","AZ","Med Spa","Phoenix","Manager","Google Maps","New","","Email first-touch","Check if they advertise 'text us' on site"
"","","","(480) 000-0000","[Phoenix PT Example 1]","https://[their-site].com","Tempe","AZ","Physical Therapy","Phoenix","Clinic Director","Google Maps","New","","Email first-touch","Look for online scheduling vendor"
"","","","(602) 000-0000","[Phoenix Optometry Example 1]","https://[their-site].com","Phoenix","AZ","Optometry","Phoenix","Practice Manager","Google Maps","New","","Call block B","Ask who owns scheduling + reminder process"
"","","","(512) 000-0000","[Austin Dentist Example 1]","https://[their-site].com","Austin","TX","Dentist","Austin","Owner/Office Manager","Google Maps","New","","Email first-touch","Ask no-show rate + value per visit"
"","","","(512) 000-0000","[Austin Chiro Example 1]","https://[their-site].com","Austin","TX","Chiropractor","Austin","Owner","Google Maps","New","","Call block A","If using JaneApp/ChiroHD note it"
"","","","(737) 000-0000","[Austin Med Spa Example 1]","https://[their-site].com","Austin","TX","Med Spa","Austin","Manager","Google Maps","New","","Email first-touch","Prioritize if they run promos (higher no-show risk)"
"","","","(512) 000-0000","[Austin PT Example 1]","https://[their-site].com","Round Rock","TX","Physical Therapy","Austin","Front Desk Lead","Google Maps","New","","Email first-touch","Look for 'text reminders' claim"
"","","","(512) 000-0000","[Austin Optometry Example 1]","https://[their-site].com","Austin","TX","Optometry","Austin","Practice Manager","Google Maps","New","","Call block B","Ask: do you confirm 24–48h before?"

How to expand from 10 examples to 200 in ~2–3 hours (free method):
1) Google search: "Phoenix AZ dentist" then open Google Maps list.
2) For each listing: capture business name, website, phone, city.
3) Click website → Contact page → extract direct email if available. If no email, leave blank and rely on calls + contact form.
4) Tag Vertical + City Cluster. Put Status=New.
5) Repeat: 20 businesses per vertical per cluster = 2 clusters x 5 verticals x 20 = 200.

C) SEGMENTATION (so day-1 sends/calls are efficient)
Tier A (call first): Businesses showing “Text us”, online booking widgets, multiple locations, or high review volume. Goal: 20–30 calls/day.
Tier B (email first): Has a visible email address + office manager name. Goal: 50–100 emails/day.
Tier C (form-only): No email; use phone + web form, keep in CRM for later.

Personalization tokens to add in first-touch emails:
- {City}: Phoenix/Austin
- {BusinessName}
- {Observation}: “noticed online booking on your site” / “saw you offer same-week appointments” / “you’re open Saturdays”

D) CRAIGSLIST POSTS (1 per cluster per week; rotate titles)

Phoenix Title Options:
1) “Reduce appointment no-shows (two-way SMS confirmations + reschedules) — free setup”
2) “Stop losing revenue to no-shows — automated SMS confirmations (free trial)” 

Phoenix Body (paste-ready):
If you run an appointment-based business in Phoenix (dental, chiro, med spa, PT, optometry, etc.), no-shows quietly kill revenue.

We built a simple system that:
• Sends SMS reminders
• Collects two-way confirmations (YES/NO)
• Auto-offers reschedule links when someone can’t make it
• Fills gaps from a waitlist
• Shows basic analytics so you can quantify recovered revenue

Offer: Done-for-you setup in 24–48 hours. Free for early locations (7-day trial).

See the product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply here or email: agent_bob_replit+no-show-bot@agentmail.to
Include: business name, scheduling software (if any), appointments/week.

Austin Title Options:
1) “Austin clinics: cut no-shows with two-way SMS confirmations (free setup)”
2) “Appointment reminder system that reschedules + fills cancellations (free trial)”

Austin Body: (same as Phoenix; swap city name)

E) INBOUND TRIAGE SCRIPT (for email or Craigslist replies)
Subject: Re: reducing no-shows
“Thanks — quick question so I can tell you if we’re a fit:
1) About how many appointments per week?
2) Rough no-show rate (%), even if it’s a guess?
3) Average value per visit ($)?
4) Who owns scheduling/confirmations today (front desk, office manager, owner)?

If you reply with those, I’ll estimate the monthly revenue you could recover and we can do a 12-minute demo.
Product page (for reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
— Bob | agent_bob_replit+no-show-bot@agentmail.to”

This pack is designed to remove all blockers: you can create the CRM, import, and start day-1 outreach immediately with consistent tagging, follow-up, and KPI logging.