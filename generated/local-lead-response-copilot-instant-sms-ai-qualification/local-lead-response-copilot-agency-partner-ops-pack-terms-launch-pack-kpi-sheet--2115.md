# Local Lead Response Copilot — Agency Partner Ops Pack (Terms + Launch Pack + KPI Sheet Template)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** document
**Agent:** copywriter
**Created by:** Copywriter Agent
**Created:** 2026-04-09T19:45:55.809Z

---

# 1) Agency Partner Terms (Plain-Language, Non-Legal)

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Partner Contact:** agent_bob_replit+lead-copilot@agentmail.to  
**Legitimacy / Product URL:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4

## A. Parties & Purpose
This Partner Terms document describes how an agency (“Partner”) may resell Local Lead Response Copilot (“Copilot”) to its clients (“End Clients”) on a white-label basis.

## B. White-Label & Positioning
- Partner may market Copilot under Partner’s brand.
- Partner may describe Copilot as a “white-label lead response + SMS qualification + booking automation system.”
- Partner must not claim Copilot is proprietary software written solely by Partner unless true.

## C. Pricing, Margins, Volume Tiers
**Suggested reseller economics (monthly, per End Client account):**
- Partner pays Copilot: **$299–$499/account** depending on tier/volume.
- Partner charges End Client: **$499–$999/account** depending on scope.

**Volume discount tiers (billed monthly):**
- **1–3 accounts:** $499/account
- **4–9 accounts:** $399/account
- **10–24 accounts:** $349/account
- **25+ accounts:** $299/account

## D. Minimum Commitment & Priority Support
To qualify for **Priority Support**, Partner agrees to:
- Maintain **a minimum of 3 active accounts**, and
- Keep accounts in good standing (no repeated overdue invoices).

If Partner drops below minimum, support moves to Standard Support until minimum is met again.

## E. What’s Included (Baseline)
Included per active End Client account:
- Instant SMS response to new leads (supported sources defined during setup)
- AI-driven qualification flow (short Q&A)
- Routing logic (qualified → booking/call; unqualified → nurture or close)
- Basic appointment/call booking handoff (calendar link or booking workflow)
- Monthly KPI report output (per template)

## F. What’s Not Included (Unless Added)
Not included unless explicitly agreed:
- Ad management, landing page build, or CRM migration
- Full custom app development
- Copywriting beyond standard script templates
- Complex multi-location routing without scoping

## G. Implementation Responsibilities
**Partner responsibilities:**
- Collect End Client intake info (see Launch Pack)
- Ensure End Client has consent-compliant SMS language on forms/ads
- Provide access/credentials needed for forms, CRM/webhook endpoints, calendars

**Copilot responsibilities:**
- Configure the automation flow per approved intake
- QA test lead capture → SMS → qualification → booking handoff
- Provide go-live confirmation and baseline KPI tracking fields

## H. Support & Response Times
- **Standard Support:** email support via agent_bob_replit+lead-copilot@agentmail.to; response target **within 2 business days**.
- **Priority Support:** response target **within 1 business day**.

## I. Service Levels (Practical)
- Copilot aims for high uptime; occasional outages can occur due to upstream providers (SMS carriers, form tools, etc.).
- If an outage is confirmed and within Copilot control, Copilot will work to restore service as soon as possible.
- Credits/refunds are not guaranteed in week 1 free-launch; post-launch commercial terms can define credits.

## J. Data Handling & Privacy
- Partner/End Client owns their lead data.
- Copilot processes data only to deliver the service (respond/qualify/route/report).
- Partner must not share sensitive data beyond what’s required.
- End Client must follow applicable SMS consent rules; Partner is responsible for ensuring opt-in language is present.

## K. Billing & Cancellations
- Billing is monthly per active End Client account.
- Cancellation request must be made **at least 7 days before renewal** to avoid next cycle billing.
- If an End Client cancels, Partner should notify Copilot to deactivate automations and stop messaging.

## L. Non-Circumvention (Simple)
- Copilot will not directly market to Partner’s End Clients that Partner introduces during the partnership.
- Partner will not attempt to reverse engineer or replicate Copilot’s workflow in a way that violates confidentiality.

## M. Acceptance
By using Copilot as a reseller and activating End Client accounts, Partner accepts these terms.

---

# 2) Partner Launch Pack (Send to End Clients)

**Subject:** Quick setup checklist — go live with Instant Lead Response + SMS Qualification

Hi [Client Name],  
We can usually go live quickly once we have the items below. If you want to verify the product, here’s the live legitimacy page:  
**https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4**

If you have questions during setup, our implementation inbox is: **agent_bob_replit+lead-copilot@agentmail.to**

## A) Your Lead Sources (Pick all that apply)
- Website form(s): [URL(s)]
- Facebook/Instagram Lead Ads
- Google Local Services / Call-only / other
- Other: __________

## B) Routing + Booking
1) **Where should qualified leads go?**
- Call now to: [phone number]
- Book a time: [calendar link] (Calendly/other)
- CRM pipeline: [CRM name]

2) **Hours + coverage**
- Business hours: [days/times]
- After-hours handling: (text nurture / next-day booking / emergency call)

## C) Qualification Questions (3–6 max)
We’ll ask short questions to confirm fit and urgency. Examples:
- “What service do you need?”
- “What’s your ZIP code?”
- “When do you want this done?”
- “Is this for residential or commercial?”

Provide your preferred questions + disqualifiers:
- Disqualify if: [out of area / wrong service / budget / timeline]

## D) Brand Voice & Compliance
- Company name as it should appear in texts: ________
- Tone: (friendly/pro / concise / premium)
- **SMS consent language** on your form/ad (required). Paste your current opt-in text here: ________
- If you don’t have opt-in text, we’ll provide a standard line you can add.

## E) Notifications
Who gets notified?
- Name + email/phone of owner/dispatcher: ________
- Backup contact: ________

## F) Go-Live Criteria (QA Checklist)
We will run tests and confirm:
- Lead submits form/ad → confirmation event received
- SMS sends in under 60 seconds
- Lead replies → qualification completes
- Qualified lead → booking/call handoff works
- Status updates record correctly for reporting

**Target go-live date:** ________

---

# 3) Monthly KPI Report Template (Google Sheets Layout)

## Tabs
**Tab 1: Summary (Monthly)**  
**Tab 2: Lead Log (Raw)**  
**Tab 3: Status Breakdown**

## Tab 2: Lead Log (Raw) — columns
A: Lead ID  
B: Lead Date (YYYY-MM-DD)  
C: Lead Time (HH:MM)  
D: Source (Web/FB/LSA/etc.)  
E: Name  
F: Phone  
G: First SMS Sent Time  
H: First Lead Reply Time  
I: Connected? (Y/N)  
J: Qualified? (Y/N)  
K: Booked? (Y/N)  
L: Lead Status (dropdown)  
M: Notes

**Lead Status dropdown options (suggested):**
- New (unreplied)
- Contacted (no reply)
- Replied
- Qualified
- Unqualified (out of area)
- Unqualified (wrong service)
- Unqualified (no response)
- Booked
- No-show
- Won
- Lost

## Calculations (place in Tab 1: Summary)
Assume Lead Log data starts on row 2.

### 1) Median Response Time (seconds or minutes)
Create a helper column in Lead Log:
N: Response Time (minutes) =IF(OR(G2="",H2=""),"",(H2-G2)*1440)

Then in Summary:
**Median Response Time (min):**  
=MEDIAN(FILTER('Lead Log (Raw)'!N:N,'Lead Log (Raw)'!N:N<>""))

### 2) Contact Rate
Definition: % of leads that replied (or connected).
**Contact Rate:**  
=COUNTIF('Lead Log (Raw)'!I:I,"Y") / COUNTA('Lead Log (Raw)'!A:A)

(Alternative using “Replied” status)
=COUNTIF('Lead Log (Raw)'!L:L,"Replied") / COUNTA('Lead Log (Raw)'!A:A)

### 3) Qualified Rate
**Qualified Rate:**  
=COUNTIF('Lead Log (Raw)'!J:J,"Y") / COUNTA('Lead Log (Raw)'!A:A)

### 4) Booked Rate
**Booked Rate:**  
=COUNTIF('Lead Log (Raw)'!K:K,"Y") / COUNTA('Lead Log (Raw)'!A:A)

### 5) Lead Status Breakdown (Tab 3)
Column A: Status  
Column B: Count  
Column C: %

B2 example:
=COUNTIF('Lead Log (Raw)'!L:L,A2)

C2 example:
=B2 / COUNTA('Lead Log (Raw)'!A:A)

## Suggested Monthly Summary Narrative (paste into email)
- **Median response time:** X min (goal: < 1 min)
- **Contact rate:** X% (replied/connected)
- **Qualified rate:** X%
- **Booked rate:** X%
- **Top disqualifier:** [out of area / wrong service / no response]
- **Action for next month:** [adjust Qs, routing, follow-ups, after-hours rules]
