# Day-1 Outbound Execution Kit (First-50 Batch + CRM Sheet + Sequences + Personalization Library)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T09:06:00.758Z

---

BUSINESS IDENTITY (use in all outreach)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to / contact: agent_bob_replit+lead-copilot@agentmail.to
- Sender: Bob Smith

GOAL (7 days)
- 200 targeted messages sent (email first; LinkedIn layered; SMS only when compliant/appropriate)
- 20 replies
- 10 demos booked

A) CRM / TRACKING SHEET (Google Sheets ready)
Create 4 tabs: Leads | Touches | Replies | Demos

Leads tab columns:
1. Lead_ID (e.g., A001..A999)
2. Segment (Agency / Operator)
3. Company
4. Niche (HVAC/Plumbing/Roofing/Pest/Water Damage/Med Spa/Marketing Agency)
5. Location
6. Contact_Name
7. Contact_Role (Owner/Founder/Head of Growth/Marketing Director)
8. Email
9. LinkedIn_URL (person)
10. Company_URL
11. Source_URL (Clutch/UpCity/Google Maps/LinkedIn/Upwork)
12. Contact_Path (Direct email / Contact form / LinkedIn DM)
13. Personalization_Line (1 sentence)
14. Status (Not Contacted / Emailed 1 / Emailed 2 / LinkedIn Sent / Replied / Demo Booked / Closed Won / Closed Lost)
15. Last_Touch_Date
16. Notes

Touches tab columns:
- Lead_ID | Date | Channel (Email/LinkedIn/SMS) | Step (1/2/3) | Subject | Message_Variant | Outcome (Sent/Bounced/Opened/Clicked/Replied)

Replies tab columns:
- Lead_ID | Date | Reply_Type (Positive/Neutral/Negative/Referral) | Key Objection | Next Step | Owner

Demos tab columns:
- Lead_ID | Date Booked | Date Held | Show (Y/N) | Outcome | Next Action

B) DAY-1 TARGET BATCH (50 PROSPECTS) — STRUCTURE
Note: Below is the exact structure to paste into the Leads tab for the first 50. Populate each row by pulling from Clutch/UpCity/LinkedIn/Google Maps and adding the best contact route.

Fields to fill per lead:
- Segment: Agency (30) / Operator (20)
- Company + URL + Source URL
- Contact_Name + Role (or “Unknown — find owner on LinkedIn”)
- Email if available; otherwise Contact_Path=Contact form + LinkedIn URL
- Personalization_Line: 1 sentence referencing their niche/city/offer (examples below)

Batch composition recommendation:
- Agencies (30): “Facebook Ads”, “Lead Generation”, “Home Services Marketing”, “Local SEO + PPC”, “Pay Per Lead” language in profile.
- Operators (20): businesses advertising aggressively (forms/FB lead ads), after-hours lead leakage likely (HVAC/plumbing/water damage especially).

C) OUTREACH SEQUENCES (READY TO SEND)

SEQUENCE 1 — AGENCIES (2-step email)

Email 1 (Agency) — Subject options:
1) “Speed-to-lead for your FB leads”
2) “Quick win for {AgencyName} clients”
3) “Stop lead leakage (2-min setup)”

Body:
Hi {FirstName} — Bob here.

Noticed {Personalization_Line}.

We built a Local Lead Response Copilot that instantly texts new leads from forms/FB lead ads, asks 2–4 short qualifying questions, and either (a) books the call/appointment or (b) routes the lead to the right tech/rep.

Most home-service advertisers lose a big % of leads in the first 5 minutes. This fixes that without adding headcount.

Offer: I’ll set you up with a 7-day pilot for 1 client. If we don’t lift contact rate / booked calls, you don’t continue.

Can I send a 90-second overview + suggested prompts for one of your home-service clients?

Website (for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Or reply here: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email 2 (Agency) — send 2 business days later
Subject: “Worth piloting on 1 account?”

{FirstName}, quick follow-up.

If you’re already generating leads via FB forms, the fastest revenue lever is speed-to-lead. We can:
- auto-text within ~10 seconds
- qualify with 2–4 questions (service + zip + timeline)
- book directly or alert the rep

Want to try it on one client for 7 days? If yes, tell me the niche (HVAC/plumbing/roofing/etc.) and where leads come in (FB lead form, website, GHL, etc.).

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Email: agent_bob_replit+lead-copilot@agentmail.to

— Bob


SEQUENCE 2 — LOCAL OPERATORS (2-step email)

Email 1 (Operator) — Subject options:
1) “Missing leads after hours?”
2) “Instant text-back for new {Niche} leads”
3) “New leads → booked jobs faster”

Body:
Hi {FirstName} — Bob here.

{Personalization_Line}

If you’re getting leads from your website or Facebook, we can instantly text them (in seconds), ask a few quick questions (job type, zip code, timeframe), and then book the call/appointment automatically.

Speed matters: the first company to respond often wins the job.

I’m offering a 7-day pilot: we connect your lead source, turn on the text-back + qualification, and measure booked calls.

Open to testing this for a week?

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Or email: agent_bob_replit+lead-copilot@agentmail.to

— Bob

Email 2 (Operator) — send 2 business days later
Subject: “Should I close the loop on this?”

{FirstName}, circling back — the main idea is simple:
new lead → instant SMS → 2–4 questions → book or route.

If you tell me where leads come from (website form / FB lead form / Google LSA), I’ll reply with the exact setup and sample questions for {CompanyName}.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Email: agent_bob_replit+lead-copilot@agentmail.to

— Bob


D) LINKEDIN (CONNECT + FOLLOW-UP)

Connect note (max ~200 chars):
Hey {FirstName} — noticed {personalization keyword}. We built an instant SMS + qualification flow to stop lead leakage from FB/forms. Open to a 7-day pilot?

Follow-up after accept:
Thanks for connecting, {FirstName}. If you’re open, I can share a 90-sec overview of our lead response copilot (instant text-back + 2–4 qualifying questions + booking). Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4 — or email me: agent_bob_replit+lead-copilot@agentmail.to

E) OPTIONAL SMS (ONLY WHERE COMPLIANT / EXISTING OPT-IN / YOUR OWN LEADS)
Hi {FirstName} — Bob here. Quick q: are you currently responding to new {niche} leads by text within 1 minute? We can automate instant SMS + qualification + booking. Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

F) PERSONALIZATION LIBRARY (copy/paste openers)
Agencies:
1) “Saw you run FB lead-gen for home services — especially {service}.”
2) “Noticed your case study on {client/niche}; speed-to-lead is usually the biggest unlock there.”
3) “Looks like you offer ‘pay per lead’ / performance lead-gen — instant response protects your margins.”
4) “Your offer mentions Facebook lead forms; we plug in and text new leads in seconds.”

Operators:
HVAC: “Saw you’re booking HVAC service/installs — these leads go cold fast if not answered immediately.”
Plumbing: “Emergency plumbing leads are usually ‘first responder wins’; instant text-back helps.”
Roofing: “Storm roofing leads come in bursts — instant response + triage routes the right jobs.”
Pest: “Pest leads often want same/next-day — qualification questions prevent wasted calls.”
Water damage: “Water damage is urgent; instant response is the difference between winning/losing the job.”
Med spa: “Med spa inquiries often need quick Qs (treatment interest + timeline) to book consults.”

G) DAY-1 SEND PLAN (deliverability + output)
- Day 1: 10–20 warmup 1:1 sends (highest-fit, manual). Log in Touches tab.
- Day 2–4: ramp to 30–50/day depending on bounces/replies.
- Always personalize line 1, keep body consistent.
- If contact email missing: use contact form + LinkedIn; still log as a touch.

Everything above is ready to paste into a sheet and begin sending immediately, while consistently referencing the website URL and agent_bob_replit+lead-copilot@agentmail.to for replies.