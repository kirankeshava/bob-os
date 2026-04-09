# Local Lead Response Copilot — Agency Partner Terms + Onboarding Checklist + KPI Success Scorecard (White-Label Kit Addendum)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** copywriter
**Created by:** Copywriter Agent
**Created:** 2026-04-09T11:35:20.920Z

---

# Local Lead Response Copilot — Agency Partner Terms + Onboarding Checklist + KPI Success Scorecard

**Business legitimacy URL (share with prospects):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Partner support email:** agent_bob_replit+lead-copilot@agentmail.to

## 1) Agency Partner Terms (Plain-Language, Non-Legal)
> **Purpose:** This document makes it easy for an agency to resell and implement Local Lead Response Copilot without needing the founder on sales calls.

### 1.1 Parties + Roles
- **“Platform”** = Local Lead Response Copilot (instant SMS + AI qualification + booking workflow).
- **“Partner/Agency”** = you (the reseller/implementer).
- **“Client Account”** = one end-customer location/brand using the Platform.

### 1.2 White-Label + Positioning
- Partner may present the Platform as **“Your Agency’s Instant Lead Response + Qualification”**.
- Partner may use their own brand name in client-facing materials.
- Partner must not claim ownership of carrier relationships, underlying telecom infrastructure, or represent the Platform as a regulated telecom service.

### 1.3 Pricing (Partner Cost) + Minimum Commitment
- Partner cost per **Client Account**: **$299–$499/account/month** (set by tier/volume below).
- **Minimum commitment for priority support:** **10 active client accounts** OR **$2,990/mo minimum** (whichever is greater). If the minimum isn’t met, support moves to standard queue.

### 1.4 Suggested Client Pricing (Agency Sell Price)
- Recommended client retail price: **$499–$999/account/month**.
- Partner may charge more if including additional agency services (lead-gen, ads management, CRM, call answering, etc.).

### 1.5 Volume Discount Tiers (Cost to Agency)
- **1–2 accounts:** $499/account/mo
- **3–9 accounts:** $399/account/mo
- **10–24 accounts:** $349/account/mo (priority support eligible when minimum commitment is met)
- **25+ accounts:** $299/account/mo (priority support + roadmap input)

**Goal plan (“3×10 accounts”):**
- 3 agencies × 10 client accounts each = **30 accounts**.
- Example economics at 30 accounts:
  - Agency cost @ $349 = **$10,470/mo** paid to Platform.
  - Agency bills clients avg $749 = **$22,470/mo**.
  - Gross margin to agency (before ad mgmt labor) ≈ **$12,000/mo**.

### 1.6 Billing + Payment Terms
- Billed **monthly in advance** per active client account.
- New accounts prorate to month-end (or start next cycle—partner choice, must be consistent).
- If a client pauses service, Partner must request pause **before** the next billing cycle.

### 1.7 Setup + Implementation Responsibility
- Partner is responsible for:
  - Gathering client intake details (offer, hours, service area, booking link, lead sources).
  - Updating client forms/FB lead ads/webhooks/CRMs to forward leads to the Platform.
  - Client-facing communication and expectations.
- Platform is responsible for:
  - Building the workflow based on Partner intake.
  - Maintaining platform uptime, logs, and KPI reporting structure.

### 1.8 Support Levels + SLA (Operational Expectations)
- **Standard Support:** email support, response within **2 business days**.
- **Priority Support (requires minimum commitment):** response within **1 business day**; expedited workflow edits.
- Emergencies (system down): best effort; priority partners first.

### 1.9 Acceptable Use + Compliance
- Partner must ensure the Client has the right to contact the lead (lead opted in via form/FB lead ad/etc.).
- No cold outreach, purchased lists, or spam campaigns through the Platform.
- Partner agrees to stop any flow that generates complaints or carrier filtering.

### 1.10 Data Handling + Security (Practical)
- Platform processes contact info and lead responses to perform qualification and booking.
- Partner should not transmit sensitive data (SSNs, credit card numbers, medical info) through qualification flows.
- If a client requests deletion, Partner emails agent_bob_replit+lead-copilot@agentmail.to with account name + deletion request.

### 1.11 Cancellation + Offboarding
- Cancel with **7 days notice** prior to next billing date.
- Upon cancellation: Platform can provide export of conversation logs/KPI summary upon request (reasonable effort).

### 1.12 Marketing/Claims Guidelines
Partner may truthfully claim:
- “Instant SMS response to new leads”
- “AI-driven qualification questions”
- “Books calls/appointments automatically”
- “Track median response time, contact, qualified, booked rate”

Partner should avoid guaranteeing exact revenue outcomes.

---

## 2) Client Account Onboarding Checklist (Agency-Run)
> Use this checklist per client. It prevents launch delays and ensures reporting works.

### 2.1 Intake (must-have)
1. **Client name + location(s):**
2. **Primary service(s):** (e.g., HVAC install, roof repair, pest control)
3. **Service area:** zip codes / counties
4. **Business hours + after-hours policy:** (book vs. callback)
5. **Primary offer:** (e.g., “$49 diagnostic”, “Same-day estimate”)
6. **Qualification goals:** what makes a lead “qualified”? (budget, timeline, location, service type)
7. **Booking destination:**
   - Calendar link (Calendly/GoHighLevel/HubSpot) OR
   - Call booking rule (notify office to call) OR
   - Appointment slots
8. **Fallback contact:** office phone + email for escalations

### 2.2 Lead Source Connections (pick all that apply)
- Website form → send lead payload to Platform
- Facebook Lead Ads → connect lead delivery to Platform
- Google LSA / GBP messages (if applicable)
- CRM (GHL/HubSpot/Jobber/ServiceTitan) → webhook/automation

### 2.3 Conversation Flow Config
- Opening message brand voice (friendly vs. direct)
- Required questions (keep to 2–4):
  1) Service type
  2) Zip code / address area
  3) Timeline (today/this week/quote)
  4) Best time to call OR booking CTA
- Disqualification rules (out-of-area, wrong service)

### 2.4 Compliance + Opt-In Proof
- Confirm the form/lead ad includes consent language to receive texts.
- Confirm client can receive calls/texts during business hours.

### 2.5 Go-Live Acceptance Test (required)
Run **5 test leads** (different scenarios):
1. Qualified + books
2. Qualified + asks question
3. Unqualified (out of area)
4. No response (lead ignores)
5. After-hours lead

**Pass criteria:**
- Median initial response time ≤ **60 seconds** (system)
- Lead status updates correctly (New → Contacted → Qualified/Unqualified → Booked)
- Booking link works and notifications fire

### 2.6 Launch + First 7 Days
- Day 1: verify first real lead end-to-end
- Day 3: review transcripts for confusing questions; tighten flow
- Day 7: deliver first KPI snapshot to client (sets retention expectation)

---

## 3) Monthly KPI Success Scorecard (Agency QBR Template)
> This ties directly to the KPI report template (median response time, contact, qualified, booked, status breakdown). Use it to justify renewal and upsell.

### 3.1 Core KPIs (Report Every Month)
1. **Median response time (seconds):** ____
2. **Contact rate:** Contacted / Total leads = ____%
3. **Qualified rate:** Qualified / Total leads = ____%
4. **Booked rate:** Booked / Total leads = ____%
5. **Lead status breakdown:**
   - New: ____
   - Contacted: ____
   - Qualified: ____
   - Unqualified: ____
   - Booked: ____
   - No response: ____

### 3.2 Scorecard (Green/Yellow/Red)
Set targets by vertical; default targets:
- **Response time**
  - Green: ≤ 60s
  - Yellow: 61–180s
  - Red: > 180s
- **Contact rate**
  - Green: ≥ 55%
  - Yellow: 40–54%
  - Red: < 40%
- **Qualified rate**
  - Green: ≥ 25%
  - Yellow: 15–24%
  - Red: < 15%
- **Booked rate**
  - Green: ≥ 10%
  - Yellow: 5–9%
  - Red: < 5%

### 3.3 Executive Summary (Paste into Email)
- **What improved this month:** (e.g., response time down, more contacts)
- **What we changed:** (flow tweaks, new questions, new booking CTA)
- **What we recommend next month:** (offer tweak, add after-hours rule, speed follow-up)

### 3.4 ROI Narrative (Simple)
Use this when the client asks “is this worth it?”
- “Before: leads waited minutes/hours. Now: leads get an answer instantly.”
- “Instant contact increases the chance we reach them while they’re still shopping.”
- “Booked rate improvements compound because qualified leads are routed faster.”

### 3.5 Partner Escalation Path (for client issues)
If a client complains about lead quality or volume:
1) Confirm lead source targeting (ads/form fields) — agency-owned
2) Confirm qualification rules not too strict
3) Review transcripts for friction points
4) Escalate to Platform support: agent_bob_replit+lead-copilot@agentmail.to with account name + last 10 lead IDs

---

## 4) Quick “Forwardable” Snippet Agencies Can Send Clients
**Subject:** Instant text-back + qualification for new leads (so we stop losing them)

We’re adding an instant response + short qualification flow to every new lead. When someone submits the form/FB lead ad, they get a text in seconds, answer 2–4 questions, and then book (or we route to your office). We’ll report monthly on median response time, contact rate, qualified rate, booked rate, and lead status breakdown.

Live overview/legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
Support: agent_bob_replit+lead-copilot@agentmail.to
