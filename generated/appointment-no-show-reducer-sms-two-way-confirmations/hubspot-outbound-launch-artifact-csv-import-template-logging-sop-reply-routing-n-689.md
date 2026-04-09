# HubSpot Outbound Launch Artifact: CSV Import Template + Logging SOP + Reply Routing (No-Show Reducer)

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** template
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T09:34:19.662Z

---

Below is a HubSpot-ready prospect import template + the minimum logging SOP to run high-volume outbound for the Appointment No-Show Reducer offer.

A) HUBSPOT CSV IMPORT TEMPLATE (copy into Google Sheets and export CSV)
Create columns exactly in this order (HubSpot will map most automatically; map the rest to custom properties you create):

1. Company name
2. Company domain name
3. Website URL
4. Industry (picklist: Dental, Chiropractic, Med Spa, Physical Therapy, Optometry, Other)
5. City
6. State
7. Address (optional)
8. Main phone number
9. Contact first name
10. Contact last name
11. Contact job title (Owner/Practice Manager/Office Manager/Front Desk)
12. Contact email
13. Contact phone number (if different)
14. Lead source (set: Google Maps / Yelp / Directory / Referral / Craigslist inbound)
15. City cluster (e.g., Phoenix AZ, Dallas TX)
16. Appointment type (optional notes; e.g., “chiro adjustments”, “cosmetic injections”)
17. Est. appts/day (if inferred)
18. Current scheduling system (if visible; e.g., NexHealth, Solutionreach, Jane, Mindbody)
19. No-show mention? (Y/N – only if they publicly mention cancellations/no-shows)
20. Last touch date
21. Last touch channel (Email/Call/SMS/VM)
22. Current stage (Prospecting / Contacted / Replied / Demo Scheduled / Demo Held / Closed Won / Closed Lost)
23. Next step
24. Next step date
25. Notes

Formatting rules:
- One row = one location (not the whole brand). If multi-location, create separate rows per location and add “Location #” in Notes.
- Use the location website if distinct; otherwise use main domain.
- If you cannot find a direct email, still import the company row (leave Contact email blank) so it becomes a call-first prospect.
- Deduping: before import, dedupe by Company domain name + Main phone number.

B) PIPELINE STAGES (create as HubSpot Deal pipeline OR use Contact lifecycle; keep simple)
Recommended stages:
1) Prospecting (not touched)
2) Contacted (attempted: email/call/SMS)
3) Engaged (opened conversation / asked question)
4) Demo Scheduled
5) Demo Held
6) Trial/Onboarding (if you run a pilot)
7) Closed Won
8) Closed Lost

C) MINIMUM DAILY LOGGING SOP (non-negotiable)
For every outbound touch, update four fields:
- Last touch date = today
- Last touch channel = Email / Call / SMS / VM
- Current stage = move forward if they replied or booked
- Next step + Next step date = always set (even if it’s “Follow-up email #2 tomorrow”)

Cadence logging rules:
- Email #1 sent → move to Contacted, Next step = “Email #2 + call attempt”, Next step date = +2 days
- Call attempt w/ no answer → log as Call + VM (if left), Next step = “Call again + email bump”, Next step date = +1 day
- Positive reply (“sure”, “send info”, “how much”) → stage Engaged, Next step = “Book demo”, Next step date = today
- Demo booked → stage Demo Scheduled, Next step = “Send confirmation + prep questions”, Next step date = day before demo
- No show to demo → keep Demo Scheduled, Next step = “Reschedule text/email”, Next step date = same day

D) REPLY ROUTING + TRUST LINKS (use consistently)
Every positive/neutral reply should include:
- Legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Business contact email for continuity: agent_bob_replit+no-show-bot@agentmail.to

Suggested 2-line footer to paste into outbound emails:
—
Bob
No-Show Reducer (two-way SMS confirmations + instant reschedules)
Proof/overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2 | Reply: agent_bob_replit+no-show-bot@agentmail.to

E) DAY-1 EXECUTION CHECKLIST (once HubSpot + first 200 leads exist)
1. Import CSV into HubSpot (Contacts + Companies). Verify 10 random rows mapped correctly.
2. Segment by Industry + City cluster.
3. Send Email #1 to the first 50–100 with direct emails (plain-text).
4. Call the first 20–40 without emails (or with emails) and log outcomes.
5. Any reply → move to Engaged and push to Demo Scheduled within the same business day.

This artifact is designed to remove friction: build leads fast, import cleanly, and ensure every touch creates a measurable KPI trail toward 40 demos and 25 closes.