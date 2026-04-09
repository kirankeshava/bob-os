# Outbound Execution Kit v3 — 7-Day Pilot Outreach Sequences + LinkedIn/SMS + CRM Sheet + First-50 CSV Template

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** template
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-04-09T18:05:13.000Z

---

Business reference (use in every message):
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
Contact: agent_bob_replit+lead-copilot@agentmail.to
Demo booking link: (paste your Calendly 15-min link here)

========================
A) 2-STEP EMAIL SEQUENCE — AGENCIES (FB lead-gen / local)

Email 1 (Day 1)
Subject line options:
1) Quick idea to lift your lead-to-book rate
2) {Company} — speed-to-lead fix for your clients
3) Instant SMS follow-up for new FB leads

Body:
Hi {FirstName} — quick note after seeing {PersonalizationLine}.

If you’re running FB lead-gen for home service clients, the biggest leak is still speed-to-lead (esp. nights/weekends). We built a “Lead Response Copilot” that instantly texts new leads, asks 2–4 qualifying questions, and then books a call/appointment automatically.

7-day pilot (free): we’ll connect one client’s form/FB lead flow, run the SMS qualifier, and track contact rate + booked appointments.

If you want, I can show you a 3-minute walkthrough: {CalendlyLink}
Or reply here and I’ll send the exact flow.

– Bob
{Website}
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (Day 3)
Subject: Re: speed-to-lead at {Company}

Body:
Hi {FirstName} — circling back.

Most agencies we talk to are shocked how many leads go “cold” in <5 minutes. This is a lightweight add-on: instant SMS + short qualification + auto-booking (or handoff to your team).

Would you be open to trying it on one account for 7 days (free) to see if booked calls increase?
{CalendlyLink}

– Bob
{Website}

========================
B) 2-STEP EMAIL SEQUENCE — LOCAL OPERATORS (roofing/HVAC/plumbing/pest/water damage/med spa)

Email 1 (Day 1)
Subject line options:
1) New leads shouldn’t wait (instant text + booking)
2) {Company}: respond to new web leads in <60 seconds
3) Quick fix for missed calls / after-hours leads

Body:
Hi {FirstName} — noticed {PersonalizationLine}.

When a new lead comes in (website form or FB), we can text them instantly, ask a couple quick questions (AI-driven), and then book a call/estimate automatically. It’s designed for businesses like {Niche} where response time drives conversions.

We’re offering a 7-day free pilot: connect your lead source + run the qualifier + measure booked calls.

Want me to set up a quick demo? {CalendlyLink}

– Bob
{Website}
agent_bob_replit+lead-copilot@agentmail.to

Email 2 (Day 3)
Subject: Re: instant response for new leads

Body:
Hi {FirstName} — quick follow-up.

If you’re open to it, we can run the pilot for 7 days and you’ll see:
• faster first response
• higher contact rate
• more booked appointments (or cleaner qualified leads)

Worth a 15-min look?
{CalendlyLink}

– Bob
{Website}

========================
C) LINKEDIN CONNECTION NOTE (send same day as Email 1)

Option 1 (Agency):
Hi {FirstName} — saw you help local/home-service companies with lead gen. We built an instant SMS + qualification + booking copilot to reduce speed-to-lead leakage. Open to connect?

Option 2 (Operator):
Hi {FirstName} — I help local businesses respond to new leads instantly (SMS + quick qualification + auto-booking). Thought it might be relevant for {Company}. Open to connect?

Post-accept message (short):
Thanks for connecting, {FirstName}. If helpful, here’s the overview: {Website}. Want to try a 7-day pilot (free) to see if booked calls increase? {CalendlyLink}

========================
D) OPTIONAL SMS FOLLOW-UP (ONLY where compliant/consented; keep it non-spammy)

SMS (Day 2 or after any prior opt-in/conversation):
Hi {FirstName} — Bob here. Quick question: when a new lead comes in for {Company}, do you respond in under 5 minutes? We built an instant text + short qualifier + booking flow. Happy to share details: {Website} or book: {CalendlyLink}

========================
E) PERSONALIZATION SNIPPETS (60 seconds)

Choose 1 line per prospect:
Agency angles:
• “Saw you run FB lead-gen for {Vertical}—speed-to-lead is usually the biggest silent conversion killer.”
• “Noticed you offer ‘Facebook Ads + Lead Forms’—we plug in right after the form submission to book calls faster.”
• “Your case study on {ClientName} stood out—this would be an easy win to add appointment lift without new ad spend.”

Operator angles:
• “Saw your ‘Request an Estimate’ form—most leads go cold if they don’t hear back fast (esp. evenings).”
• “Noticed you’re advertising {Service}—we can qualify and route those leads automatically.”
• “If you’re missing calls/after-hours leads, instant SMS follow-up usually recovers a chunk immediately.”

========================
F) TRACKING SHEET (GOOGLE SHEETS) — TAB SCHEMA

Tab 1: Leads
Columns:
LeadID | Segment (Agency/Operator) | Company | Niche | City | State | Website | SourceURL | ContactName | Title | Email | Phone | LinkedInURL | PersonalizationLine | Status (New/Sent/Followed/Replying/DemoBooked/NotNow/NoFit) | Owner (Bob) | Notes

Tab 2: Touches
Columns:
LeadID | Date | Channel (Email1/Email2/LinkedIn/SMS) | Subject/Template | Outcome (Sent/Bounced/Opened/Reply) | NextActionDate | Notes

Tab 3: Replies
Columns:
LeadID | Date | ReplyType (Interested/Question/Objection/NotNow/Unsub) | KeyObjection | ProposedNextStep | DemoLinkSent (Y/N) | DemoBooked (Y/N)

Tab 4: Demos
Columns:
LeadID | DemoDateTime | Show (Y/N) | Result (Pilot/Follow-up/Lost) | NextStep | Notes

Daily KPI targets:
• Sends/day: 50 (after warmup)
• Reply rate goal: 10%+
• Demo booked goal: 5%+

========================
G) FIRST-50 CSV TEMPLATE (mail merge)

Columns (exact):
FirstName,LastName,Company,Segment,Niche,Email,LinkedInURL,PersonalizationLine,CalendlyLink,Website,ReplyToEmail

Example row:
John,Doe,Acme Marketing,Agency,Home Services,john@acmemarketing.com,https://linkedin.com/in/johndoe,"Saw your FB lead-gen case study for a roofing client—speed-to-lead is usually the hidden bottleneck.",https://calendly.com/yourlink,https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4,agent_bob_replit+lead-copilot@agentmail.to

Execution rules for deliverability (free/organic):
• Warmup: 10–20 1:1 emails before bulk
• Keep daily volume controlled (start 30–40 then 50)
• No attachments; plain text; vary subject lines
• Log bounces and remove immediately

This kit is ready to paste into Sheets and start sending. Replace {CalendlyLink} with the live link in every template, and always include the website + agent_bob_replit+lead-copilot@agentmail.to in the footer for legitimacy.