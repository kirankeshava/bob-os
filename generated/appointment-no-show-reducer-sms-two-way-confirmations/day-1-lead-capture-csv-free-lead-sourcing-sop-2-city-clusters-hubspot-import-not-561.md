# Day-1 Lead Capture CSV + Free Lead Sourcing SOP (2 City Clusters) + HubSpot Import Notes

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T08:15:33.269Z

---

Below is a paste-ready CSV header row (copy into Google Sheets row 1, then export CSV for HubSpot import). This matches the fields we will track for fast qualification and ROI math.

CSV HEADERS (Row 1):
Business Name,Website,Main Phone,City,State,Address,Vertical,Decision Maker Name,Decision Maker Role,Email 1,Email 2,Scheduling Software,Locations Count,Appts Per Week,Estimated No-Show %,Avg $ Per Visit,Waitlist (Y/N/Unknown),Notes,Lead Source,First Touch Date,Last Touch Date,Status,Next Step Date,Recovered Revenue Estimate

STATUS values to use (keep consistent for sorting): New Lead, Contacted, Replied, Demo Booked, Demo Held, Trial/Setup, Closed Won, Closed Lost

FREE LEAD SOURCING SOP (build first 100 leads today):
Goal: 2 city clusters × 5 verticals × ~10 businesses each = ~100 leads.

City Cluster A (example): Phoenix + Scottsdale
City Cluster B (example): Tampa + St. Petersburg
(If you want different cities, swap them; the workflow is identical.)

Verticals (priority order): Dentist, Chiropractor, Med Spa, Physical Therapy, Optometry.

Step-by-step (no paid tools):
1) Google Maps search query (copy/paste):
   - “dentist Phoenix AZ”, “chiropractor Scottsdale AZ”, “med spa Tampa FL”, “physical therapy St Petersburg FL”, “optometrist Tampa FL”.
2) Open each listing in a new tab. Capture: Business Name, Main Phone, Address, Website URL.
3) On the business website, find an email using only on-site pages first:
   - Check footer, Contact page, About page, Team page, Book Appointment page.
   - Common emails: info@, hello@, appointments@, office@.
4) If no email is visible, use a role-based guess ONLY when the site shows a domain contact form and the decision maker’s name exists (e.g., Dr. Patel). Otherwise leave email blank and keep for calling.
5) Decision maker role rules:
   - Dental/Optometry/PT: Practice Manager / Office Manager (best), or Owner/Doctor.
   - Chiro: Owner/Chiropractor often answers.
   - Med Spa: Owner / Clinic Manager.
6) Scheduling software capture (quick tells):
   - “Powered by” on booking page (NexHealth, Solutionreach, Weave, JaneApp, PracticeMojo, Zocdoc, etc.). If unknown, mark Unknown.
7) Quick qualification estimates (fast placeholders; refine on call):
   - Appts Per Week: Small 40, Medium 80, Large 150 (choose based on reviews/size/clinic count).
   - Estimated No-Show %: default 7% dental/optometry, 10% PT/chiro, 12% med spa.
   - Avg $/visit: default $200 dental, $90 chiro, $250 med spa, $140 PT, $180 optometry.
8) Recovered Revenue Estimate (simple calc for prioritization):
   - Appts/week × No-show % × Avg $/visit × 4 (monthly).
   Example: 80 × 10% × $140 × 4 = $4,480/month recoverable.
9) Import to HubSpot:
   - Create a Company and associated Contact when you have an email; otherwise create Company-only and log phone outreach.
   - Set Status = New Lead on import.

DAY-1 OUTREACH INSERTS (reference these in templates):
Legitimacy URL to include: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/2
Reply-to / contact email: agent_bob_replit+no-show-bot@agentmail.to

HubSpot fields mapping tip:
- If HubSpot doesn’t have a matching property yet, keep the column anyway; HubSpot will prompt to create a new custom property during import.

Minimum viable logging rule (so KPIs stay accurate):
- Every email batch: update Last Touch Date and set Status = Contacted.
- Every reply: set Status = Replied and schedule Next Step Date.
- Every booked meeting: set Status = Demo Booked; after it happens, set Demo Held.

This artifact is the exact capture format + SOP to generate the first 100–200 prospects using only free sources, import cleanly into HubSpot, and prioritize the biggest revenue-recovery opportunities first.