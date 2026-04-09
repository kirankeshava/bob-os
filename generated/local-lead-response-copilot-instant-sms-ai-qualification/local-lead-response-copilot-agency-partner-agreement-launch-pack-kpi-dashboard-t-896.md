# Local Lead Response Copilot — Agency Partner Agreement + Launch Pack + KPI Dashboard Template (Copy/Paste)

**Business:** Local Lead Response Copilot (Instant SMS + AI Qualification)
**Type:** template
**Agent:** copywriter
**Created by:** Copywriter Agent
**Created:** 2026-04-09T10:55:15.878Z

---

# 1) Agency Partner Agreement (Plain-Language, Non-Legal Template)

**Product:** Local Lead Response Copilot (Instant SMS + AI Qualification)

**Business legitimacy URL (shareable):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4  
**Partner contact:** agent_bob_replit+lead-copilot@agentmail.to

**Parties**  
This Agency Partner Agreement (“Agreement”) is between **Local Lead Response Copilot** (“Provider”) and **____________________________** (“Agency Partner”).

**1) Purpose (White-Label / Resale)**  
Agency Partner is authorized to resell the Product to Agency Partner’s clients (“End Clients”) under Agency Partner’s branding or as a co-branded service. Provider supplies the underlying software, configuration, and support per the selected tier.

**2) Program Basics**  
- Provider invoices Agency Partner per active End Client account (“Account”) at the agreed wholesale rate.  
- Agency Partner sets its own retail pricing to End Clients and owns the End Client relationship.  
- Provider may be introduced to End Clients only if Agency Partner requests (optional).

**3) Pricing, Commitments, and Volume Tiers**  
Wholesale rates (per Account / month):  
- **1–2 Accounts:** $499/account  
- **3–9 Accounts:** $399/account (requires **3-account minimum commitment**)  
- **10–24 Accounts:** $349/account (requires **10-account minimum commitment**)  
- **25+ Accounts:** $299/account (requires **25-account minimum commitment**)  

**Minimum Commitment for Priority Support:** Any tier discounted below $499 requires the stated minimum active Accounts for **at least 60 days**.

**4) Billing & Payment Terms**  
- Billing is monthly in advance (Net 0 by default unless otherwise agreed).  
- Agency Partner is responsible for all charges incurred for active Accounts during a billing period.  
- If an Account is paused/canceled mid-cycle, it remains billable until the next renewal date unless Provider agrees in writing.

**5) What’s Included (Provider Responsibilities)**  
Provider will, for each Account:  
- Configure instant SMS follow-up and AI qualification flow based on Agency Partner’s inputs.  
- Configure routing rules (e.g., call booking link, calendar, notify sales rep, tags/statuses).  
- Provide a monthly KPI report (or data for Agency Partner to report) including: median response time, contact rate, qualified rate, booked rate, and lead status breakdown.  
- Provide support via email: **agent_bob_replit+lead-copilot@agentmail.to**.

**6) Agency Partner Responsibilities**  
Agency Partner will:  
- Provide accurate onboarding inputs and ensure End Clients have rights to contact their leads.  
- Handle End Client billing, contracts, and primary communications.  
- Maintain compliance with applicable laws and carrier rules (TCPA, A2P messaging requirements, consent, opt-out language).  
- Ensure each End Client’s lead forms and ad platforms collect proper consent for SMS.

**7) Data, Privacy, and Lead Ownership**  
- End Client lead data remains the property of the End Client (or Agency Partner if contracted that way).  
- Provider processes lead data only to deliver the Product (follow-up, qualification, routing, reporting).  
- Agency Partner is responsible for ensuring End Client has a compliant privacy policy and consent language.

**8) Messaging Compliance (Critical)**  
Agency Partner acknowledges that SMS/MMS/voice communications require proper consent. Provider may refuse service, pause campaigns, or require changes if compliance is unclear (e.g., no opt-out instructions, questionable lead sources).

**9) Support & SLA (Simple, Realistic)**  
- Standard support: email support during business days; target response within 1 business day.  
- Priority support (requires minimum commitment per Section 3): target response within 4 business hours on business days.  
- Uptime is best-effort; Provider will communicate known incidents and remediation.

**10) Acceptable Use**  
No spam, purchased lists without consent, deceptive messaging, prohibited content, or unlawful campaigns. Provider may suspend any Account that risks carrier violations or legal exposure.

**11) Term, Cancellation, and Offboarding**  
- Agreement starts on the effective date and continues month-to-month.  
- Either party may terminate with 14 days written notice.  
- If Agency Partner is on a discounted tier, early termination before the 60-day minimum commitment may convert prior discounted invoices to the $499/account rate for the committed Accounts (prorated as reasonable).

**12) Confidentiality**  
Both parties will keep confidential any non-public business information, pricing, implementation details, and client lists.

**13) Limitation of Liability (Plain Language)**  
Provider is not liable for indirect damages (lost profits, loss of business). Total liability is limited to fees paid to Provider in the prior 30 days for the affected Accounts.

**14) Signatures**  
Agency Partner: ___________________________  Date: ____________  
Provider (Bob Smith): _______________________ Date: ____________


---

# 2) Partner Launch Pack — Implementation Checklist (Agency → Provider → End Client)

Use this checklist to launch an Account in **24–72 hours**.

## A) Agency Partner → Provider (required)
1) **End Client Info**  
- Business name, website, service area (cities/zip), business hours  
- Primary contact name + email + phone (for routing/notifications)

2) **Lead Sources (choose all)**  
- Website form (URL + form tool: Webflow/WP/Gravity/Elementor/etc.)  
- Facebook Lead Ads (business manager access details)  
- Google Local Services Ads (LSA)  
- Other (specify)

3) **Offer + Qualification Rules**  
- What is the End Client selling? (e.g., “Same-week AC repair”, “Roof replacement estimates”)  
- What counts as “Qualified”? (job types, minimum ticket, service area, timeframe)  
- Disqualifiers (e.g., “Not in service area”, “Looking for employment”, “Price-only shoppers”)  
- 3–6 qualification questions (short, SMS-friendly)

4) **Booking / Handoff Method (pick one)**  
- Calendar link (Calendly/Google Calendar booking page)  
- Call transfer (ring a sales rep)  
- “Text-to-call” prompt (ask lead for best time, then notify rep)

5) **Routing Rules**  
- Who gets notified? (name + phone + email)  
- After-hours behavior (collect info + schedule next day vs. emergency routing)

6) **Branding**  
- Business display name for messages  
- Tone: friendly / direct / premium  
- Any required disclaimers

7) **Compliance Inputs**  
- Proof of consent language used on form/ad (“By submitting, you agree to receive texts…”)  
- Opt-out language to include (“Reply STOP to opt out”)

## B) End Client → Agency Partner (required)
Provide these in one email thread:
- Admin access to form tool or permission to add webhook/Zapier/lead forwarding  
- If FB Lead Ads: add Agency Partner as partner OR grant access to the page/ad account  
- If using call booking: confirm calendar availability rules + appointment duration  
- Confirm business hours + after-hours policy  
- Confirm service area + top 3 job types

## C) Provider Build Steps (what Provider does)
- Create Account + connect lead intake  
- Set instant SMS response message  
- Configure AI qualification flow (questions + branching rules)  
- Configure lead statuses: New → Contacted → Qualified → Booked → Not Qualified → No Response  
- Configure booking/handoff + notifications  
- QA test with 3 test leads (daytime + after-hours)  
- Go-live + first 7-day optimization check

## D) Go-Live QA (must pass)
- Lead receives SMS in under 60 seconds  
- STOP opt-out works  
- Routing notifications reach the right rep  
- Booking link works and confirmations are received  
- Status updates appear in reporting


---

# 3) Monthly KPI Dashboard Template (Google Sheets Layout + Formulas)

Create a Google Sheet with the following tabs:

## Tab 1: `Leads_Raw`
Columns (row 1 headers):
- A: Lead_ID  
- B: Lead_Source (Web / FB / LSA / Other)  
- C: Created_At (timestamp)  
- D: First_Message_Sent_At (timestamp)  
- E: First_Lead_Response_At (timestamp; blank if never)  
- F: Status (New, Contacted, Qualified, Booked, Not Qualified, No Response)  
- G: Qualified (TRUE/FALSE)  
- H: Booked (TRUE/FALSE)  
- I: Notes

### Helper columns
- J: `Response_Time_Sec`  
Formula (J2):
```
=IF(D2="","", (D2-C2)*86400)
```
- K: `Contacted` (TRUE if lead responded at least once)  
Formula (K2):
```
=IF(E2="",FALSE,TRUE)
```

## Tab 2: `KPIs`
Cells:
- B2: Date range start  
- C2: Date range end

### Core counts
- Total leads (B5):
```
=COUNTIFS(Leads_Raw!C:C,">="&$B$2,Leads_Raw!C:C,"<="&$C$2)
```
- Contacted leads (B6):
```
=COUNTIFS(Leads_Raw!C:C,">="&$B$2,Leads_Raw!C:C,"<="&$C$2,Leads_Raw!K:K,TRUE)
```
- Qualified leads (B7):
```
=COUNTIFS(Leads_Raw!C:C,">="&$B$2,Leads_Raw!C:C,"<="&$C$2,Leads_Raw!G:G,TRUE)
```
- Booked leads (B8):
```
=COUNTIFS(Leads_Raw!C:C,">="&$B$2,Leads_Raw!C:C,"<="&$C$2,Leads_Raw!H:H,TRUE)
```

### Rates
- Contact rate (C6):
```
=IFERROR(B6/B5,0)
```
- Qualified rate (C7):
```
=IFERROR(B7/B5,0)
```
- Booked rate (C8):
```
=IFERROR(B8/B5,0)
```

### Speed metrics
- **Median response time to first message sent** (B11) in seconds:
```
=MEDIAN(FILTER(Leads_Raw!J:J,Leads_Raw!C:C>=$B$2,Leads_Raw!C:C<=$C$2,Leads_Raw!J:J<>""))
```
- Convert to minutes (C11):
```
=IFERROR(B11/60,0)
```

## Tab 3: `Status_Breakdown`
Pivot-style table (or formulas):
- Column A: Status  
- Column B: Count

Example formula for Booked count (B2 if A2 has “Booked”):
```
=COUNTIFS(Leads_Raw!C:C,">="&KPIs!$B$2,Leads_Raw!C:C,"<="&KPIs!$C$2,Leads_Raw!F:F,$A2)
```
Repeat for each status.

## Tab 4: `Client_Summary` (paste into monthly email)
Template text block:

**Reporting Period:** [Start] – [End]  
**Median speed-to-lead:** [X] minutes  
**Total leads:** [#]  
**Contact rate:** [#%]  
**Qualified rate:** [#%]  
**Booked rate:** [#%]  

**Status breakdown:**
- New: [#]
- Contacted: [#]
- Qualified: [#]
- Booked: [#]
- Not Qualified: [#]
- No Response: [#]

**Notes / Next actions:**
- [1 optimization to improve contact rate]
- [1 optimization to improve qualified → booked]


---

## Optional: Partner-Facing Footer (for all shared docs)
Questions or onboarding requests: **agent_bob_replit+lead-copilot@agentmail.to**  
Product legitimacy link (shareable): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/4
