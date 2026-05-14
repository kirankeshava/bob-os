# Local Lead Response Copilot — Outreach Execution Pack (Send Sheet + Reply Handling + Pipeline Tracker)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** playbook
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T22:57:37.401Z

---

Below is a ready-to-use execution pack to start outbound today. Every template includes the legitimacy URL and contact email.

LEGITIMACY BLOCK (append to any message)
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply here: agent_bob_replit+lead-copilot@agentmail.to

A) SEND SHEET — OWNER (EMAIL)
Subject: Missing leads because you’re slow to respond?
Body:
Hey {FirstName} — Bob here.

If someone fills out your site/FB form and waits 10–30 minutes, most of those leads never pick up again. Local Lead Response Copilot texts new leads instantly, asks 3–5 quick questions, then books a call/appointment (or routes to your team) automatically.

If I can show you a 7-minute demo tailored to {Trade} (HVAC/plumbing/roofing/etc.), would you be open to trying a paid pilot?

If yes, reply with:
1) your best number to receive a test lead text
2) your booking link (if you have one)

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply: agent_bob_replit+lead-copilot@agentmail.to

— Bob

B) SEND SHEET — OWNER (WEBSITE CONTACT FORM)
Subject/Topic (if field exists): Instant text-back for new leads (book more jobs)
Message:
Hi — Bob here. I help local {Trade} companies respond to new web/FB leads instantly via SMS, ask a few qualifying questions, and then book calls/appointments automatically.

Can I send a 60-second overview + a 7-minute demo link?
If yes, who should I speak with and what’s the best number/email?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply: agent_bob_replit+lead-copilot@agentmail.to

C) SEND SHEET — OWNER (SMS, <= 320 chars)
Hi {FirstName} — Bob. When new leads hit your form/FB, we text them instantly, ask 3–5 quick questions, then book calls automatically. Want a 7-min demo for {Trade}? Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  Email: agent_bob_replit+lead-copilot@agentmail.to

D) SEND SHEET — AGENCY (EMAIL)
Subject: White-label “speed-to-lead” add-on for your clients
Body:
Hey {FirstName} — Bob here.

If your clients run FB/Google lead gen, the biggest leak is response time. We provide an instant SMS responder + AI qualification that captures intent and books calls (or routes leads) automatically.

You can resell it or refer it. Setup is DFY (<24h) per client.
Open to a 10-minute partner chat?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Reply: agent_bob_replit+lead-copilot@agentmail.to

E) FOLLOW-UP CADENCE (48 HOURS)
Day 0 (same day): Initial touch
+4 hours: bump
“Circling back — if you want, I can send a test SMS to your phone so you can see the experience end-to-end. What number should I use?”
Day 1: value bump
“One missed call = one lost job. Instant text-back typically increases booked appointments because the lead is still ‘hot’. Want the 7-min demo?”
Day 2: last bump + permission
“Should I close the loop, or is this worth a quick look this week? If it’s not you, who handles leads/ads?”

F) REPLY-HANDLING PLAYBOOK (TURN REPLY → DEMO → PAID PILOT)
1) If they say “Interested / tell me more”
Reply:
“Perfect. Two quick options:
A) 7-minute demo (fastest)
B) I can run a live test by texting you a sample lead flow.
Which do you prefer? Also, what trade are you (HVAC/plumbing/roofing/etc.)?”
Include:
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Email: agent_bob_replit+lead-copilot@agentmail.to

2) If they ask “Price?”
Reply:
“DFY setup is $499 and it’s $499/mo. If you prefer annual, setup is $0.
If you want, we can do a 7-minute demo first and I’ll show exactly how it would route/qualify your leads. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  Email: agent_bob_replit+lead-copilot@agentmail.to”

3) If they say “Call me”
Reply:
“Absolutely — what’s the best number and two time windows today/tomorrow? After the call I’ll send a short config form so we can go live in <24 hours. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  Email: agent_bob_replit+lead-copilot@agentmail.to”

4) Close language (no paid e-sign required; reply-to-accept)
“Reply ‘I ACCEPT’ and confirm:
• Business name
• Best notification phone/email
• Billing email
Then I’ll send the intake form and schedule the 30-minute onboarding. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  Email: agent_bob_replit+lead-copilot@agentmail.to”

G) PIPELINE TRACKER (GOOGLE SHEETS-READY)
Create columns:
1. Date Added
2. Company
3. Vertical (HVAC/Plumbing/Roofing/Other)
4. Website
5. Contact Name
6. Role (Owner/GM/Marketing/Agency)
7. Email
8. Phone
9. Channel Used (Email/Contact Form/SMS/LinkedIn)
10. Last Touch Date
11. Status (Contacted / Replied / Demo Booked / Demo Done / Closed Won / Intake Submitted / Onboarding Scheduled / Live / Week-1 Results / Closed Lost)
12. Next Step (free text)
13. Demo Date/Time
14. Offer Chosen ($499 setup + $499/mo OR annual)
15. Objections/Notes
16. Intake Link Sent? (Y/N)
17. Onboarding Date/Time
18. Go-Live Date
19. Week-1 Results (reply rate, booked calls, notes)

Definitions:
- “Replied” = any response from a human.
- “Demo Booked” = scheduled time confirmed.
- “Closed Won” = acceptance + payment method confirmed by owner.
- “Live” = webhook connected + SMS flow tested end-to-end.

If you want, the very next operational step is: take the existing 40-target list, paste it into this tracker, then send 40 touches using templates A–D and log the channel + last touch date so follow-ups happen on time.