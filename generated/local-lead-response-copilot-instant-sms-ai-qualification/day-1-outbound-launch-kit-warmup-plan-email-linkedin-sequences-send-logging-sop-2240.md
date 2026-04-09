# Day-1 Outbound Launch Kit (Warmup Plan + Email/LinkedIn Sequences + Send/Logging SOP)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** playbook
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T20:23:31.043Z

---

## Assets to reference in every message
- Website (legitimacy/proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
- Reply-to / contact: agent_bob_replit+lead-copilot@agentmail.to
- Booking link: (use your Calendly 15-min intro link created in prior cycle)

---
## 0) Day-1 warmup → ramp plan (so we don’t nuke deliverability)
**Goal today:** 10–20 warmups + (if deliverability looks fine) 30–50 additional sends.

**Warmup rules (first 10–20 emails):**
1) Send 1:1 (no mail merge), one every ~10–20 minutes.
2) Keep each under ~120 words.
3) Use high-personalization (mention a specific page, service, or ad angle).
4) No attachments. One link max (either website OR booking link; not both on warmups).
5) Mix recipients: ~60% agencies, ~40% operators.

**Ramp rules (after warmup):**
- Next 30–50 sends can include both links (site + Calendly), but keep copy tight.
- Randomize subject lines across 3 variants.
- Log every send in the sheet immediately (don’t “send then log later”).

---
## 1) Agency sequence (Email 1 + Email 2)
### Email 1 (Agency) — Subject options
A) Quick win for your FB leads
B) Speed-to-lead fix for {{ClientType}}
C) 7-day pilot to lift show rate

**Body (copy/paste template):**
Hi {{FirstName}} — saw {{AgencyName}} runs lead gen for {{NicheOrClientType}}.

If you’re using FB Lead Ads / landing pages, the biggest leak is still speed-to-lead (esp. evenings/weekends). We built a lightweight “Lead Response Copilot” that **texts a new lead instantly**, asks 2–4 qualifying questions, and **hands off to booking**.

I put a quick overview here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

Want to try a **free 7-day pilot** on one client? If it doesn’t improve contact/qualified rate, you can drop it.

If you’re open, grab 15 min: {{CalendlyLink}}
Or just reply “pilot” and I’ll send the setup checklist.

— Bob
agent_bob_replit+lead-copilot@agentmail.to

### Email 2 (Agency follow-up, 48–72h)
Subject: Re: speed-to-lead for {{ClientType}}

Hey {{FirstName}} — quick nudge.

Most agencies we talk to already have the leads; they’re just losing the first 5 minutes (missed calls, slow form follow-up, after-hours).

If you send me:
1) lead source (FB form / website form)
2) the niche (HVAC/roofing/etc.)
I’ll reply with a **2-question qualification flow** you can run in the 7-day pilot.

Still easiest to talk here: {{CalendlyLink}}
— Bob

---
## 2) Operator sequence (Email 1 + Email 2)
### Email 1 (Operator) — Subject options
A) Stop losing leads after hours
B) Instant text-back for new inquiries
C) Quick question about your lead follow-up

**Body (copy/paste template):**
Hi {{FirstName}} — I’m reaching out because {{PersonalizationLine}}.

When a new lead comes in (form/FB), we can **text them instantly**, ask a couple quick questions (job type/urgency/zip), then **push them to book** or route to your team.

Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

I’m offering a **free 7-day pilot** for local operators this week. If it doesn’t produce more qualified conversations, you keep the learnings and walk away.

Open to a 15-min setup call? {{CalendlyLink}}
— Bob
agent_bob_replit+lead-copilot@agentmail.to

### Email 2 (Operator follow-up, 48–72h)
Subject: Re: instant text-back

Hey {{FirstName}} — checking back.

If you tell me where leads come from (website form vs FB) and your main service ({{Service}}), I’ll send a recommended **2–4 question** script that qualifies and routes/bookings automatically.

Want me to map it for you? {{CalendlyLink}}
— Bob

---
## 3) LinkedIn: connection note + DM follow-up
### Connection note (<= 300 chars)
Hi {{FirstName}} — quick one: we help {{NicheOrClientType}} respond to new leads instantly via SMS + short qualification to booking. Free 7-day pilot. Mind if I send details?

### DM after accept (same day)
Thanks {{FirstName}}. Here’s the overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

If you want, I can set up a free 7-day pilot on one funnel (FB form or website form). If it doesn’t improve contact/qualified rate, you can drop it.

15-min to confirm the flow? {{CalendlyLink}}
Or reply with your lead source + niche and I’ll suggest the exact questions.

---
## 4) Optional SMS follow-up (ONLY if compliant / existing permission)
“Hi {{FirstName}} — Bob here. Saw you handle {{Niche}} leads. We built an instant text-back + quick qualification → booking flow. Overview: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  Want a free 7-day pilot? Reply YES and I’ll send details. (Or email me: agent_bob_replit+lead-copilot@agentmail.to)”

---
## 5) Send/Logging SOP (non-negotiable)
**For every prospect:**
1) Assign LeadID (e.g., A001…A126 for agencies; O001…O084 for operators).
2) Choose sequence (Agency/Operator).
3) Add a 1-line personalization note from their site/Clutch/LinkedIn.
4) Send email.
5) Immediately log in sheet:
   - LeadID, Company, ContactName, Channel=Email, Touch#=1, SubjectVariant (A/B/C), Timestamp, Status=Sent.
6) Send LinkedIn connect (if profile exists) and log Channel=LinkedIn, Touch#=1.
7) If reply:
   - Status=Replied, ReplyType (positive/neutral/negative), NextAction (booked / follow-up / close-lost).
8) If booked:
   - Status=Demo Booked, DemoDate, Notes.

**Daily operating cadence (15 minutes morning + 15 minutes afternoon):**
- Morning: send follow-ups due today + book demos.
- Afternoon: send new outbound + LinkedIn connects.

---
## 6) Personalization line examples (copy/paste)
- “I noticed you’re running FB lead ads for HVAC/plumbing and pushing to a form.”
- “Saw your site has a ‘Request a Quote’ form but no instant confirmation beyond email.”
- “Looks like you serve {{City}} and offer 24/7 emergency service—speed-to-lead is usually the difference on those.”
- “Noticed you mention ‘free estimate’ prominently; instant SMS follow-up tends to lift contact rate.”

If you want, I can also generate 3 alternative subject lines based on early reply data and convert the Day-1 list into a strict mail-merge CSV format (FirstName, Company, PersonalizationLine, CalendlyLink, SequenceType).