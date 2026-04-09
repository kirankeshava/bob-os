# Day-1 Execution SOP (Free Lead Build → CRM Import → Send/Call → Book Demos)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T09:44:33.551Z

---

Objective: build 200 prospects (free sources), import to CRM, send 50–100 cold emails/day + 20–40 calls/day, and convert replies into booked demos for the Appointment No-Show Reducer.

A) Tools (free)
1) CRM: HubSpot Free (or use the CSV below if HubSpot setup is delayed).
2) Email sending: agent_bob_replit+no-show-bot@agentmail.to (plain text only; no images).
3) Legitimacy URL to include in replies + footer when helpful: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2

B) ICP + priority (build list in this order)
1) Chiropractors (high repeat visits, frequent no-shows).
2) Med spas (high $/visit; short booking windows).
3) Dental practices (higher admin burden; measurable recovered revenue).
City clusters (start): Phoenix AZ + Dallas TX.

C) Free lead sourcing workflow (repeat until you hit 200)
1) Google Maps search queries (copy/paste):
- “chiropractor Phoenix AZ”
- “med spa Phoenix AZ”
- “dentist Phoenix AZ”
- “chiropractor Dallas TX”
- “med spa Dallas TX”
- “dentist Dallas TX”
2) For each result, capture:
- Business name, website, main phone.
3) Find email (free methods):
- Check website footer/contact page for email.
- If none: look for “Contact”, “About”, “Team”, “Book” pages.
- If still none: use the contact form URL and log it (still callable).
4) Identify decision maker fields (when visible): owner, practice manager, office manager.
5) Dedupe rules:
- Dedupe by website domain; if duplicate, keep the location with the best direct email.

D) CRM/CSV import schema (use as column headers)
Company Name | Location Name | Vertical | City | State | Website | Main Phone | Contact First | Contact Last | Contact Title | Contact Email | Source URL | Notes (scheduler used, hours, #locations) | Stage | Last Touch Date | Next Step | Next Step Date | Owner
Stage values: New, Emailed-1, Emailed-2, Called, Replied, Demo Booked, Demo Held, Won, Lost, Nurture.

E) Daily execution schedule (Day-1 template)
Block 1 (9:00–10:30am local):
- Send 50 emails (Step 1 template). Log Stage=Emailed-1.
Block 2 (11:00am–12:30pm):
- 20 calls. Outcome log: No answer/Left VM/Spoke/Not decision maker/Bad number. If spoke: ask who owns scheduling and capture best email.
Block 3 (2:00–3:30pm):
- Send 25–50 more emails OR send follow-ups to replies within 15 minutes.
Block 4 (4:00–5:30pm):
- 20 more calls + 5–10 polite follow-up texts ONLY to businesses (where compliant) referencing that you called and offering the demo link.

F) Reply-handling micro-scripts (paste-ready)
1) Positive: “Yes interested”
Reply: “Great — quickest way is a 12-min walkthrough. We reduce no-shows with two-way SMS confirmations + instant reschedules + waitlist fill. Done-for-you setup in 24–48 hours. What’s the best email to send the booking link to? You can also see an overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 — if you share your weekly appointment count + typical no-show %, I’ll estimate recovered revenue per month.”

2) “Not now / later”
Reply: “Totally fine — is 30–60 days better? If you tell me your avg appointments/week and no-show %, I’ll send a 1-minute estimate of what you’re losing to no-shows and you can decide if it’s worth revisiting. If you need to verify us: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2.”

3) “We already have reminders”
Reply: “Makes sense — most systems send one-way reminders. The lift usually comes from two-way confirmations + automated reschedule links + waitlist gap fill (so cancellations don’t create dead time). If you’re open, I can show the flow in 10–12 minutes and you can compare. What’s a good time this week?”

4) “Price?”
Reply: “Depends mainly on appointment volume + number of locations. Typical ROI is one recovered appointment/week covers it. If you share (1) appointments/week and (2) avg $ per visit, I’ll give you a firm number and an ROI estimate. Quick overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2.”

5) “Who are you / remove me”
Reply: “Understood — I’ll remove you from our outreach list. If you ever want the no-show ROI calculator or workflow, email us anytime at agent_bob_replit+no-show-bot@agentmail.to.”

G) KPI logging (end of day)
Record: emails sent, calls placed, connects, replies, demos booked, demos held, wins, losses, and top 3 objections. If demos booked < 2/day by day 3, tighten ICP to highest volume clinics and increase call blocks.

H) Compliance + deliverability basics
- Use plain-text emails, minimal links (only include legitimacy URL when needed).
- Honor “stop/remove” immediately.
- For texting: only business numbers; keep it short; stop if asked.

This SOP is designed to be executed today without paid tools: build 200 leads via Google Maps, import, send/call in blocks, reply within 15 minutes, and drive every positive interaction to a booked demo and fast setup.