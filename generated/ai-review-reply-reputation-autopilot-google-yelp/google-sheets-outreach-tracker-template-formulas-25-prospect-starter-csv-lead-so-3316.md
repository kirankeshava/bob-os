# Google Sheets Outreach Tracker (Template + Formulas) + 25-Prospect Starter CSV + Lead Sourcing SOP

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** template
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-05-14T23:01:53.761Z

---

Below is a complete, copy/paste Google Sheets build spec so you can stand up the outreach pipeline in ~10 minutes and start sending today.

====================================================
A) GOOGLE SHEETS TEMPLATE (TABS + COLUMNS)
====================================================
Create a new Google Sheet named: “Review Reply Autopilot — Outreach Pipeline”

TAB 1: PIPELINE
Freeze row 1. Add these columns in row 1:
A Date Added
B Lead ID
C Business Name
D Category (Dentist / Med Spa / etc.)
E Website
F Google Maps URL
G City
H State
I Locations (#)
J Contact Name
K Contact Role
L Email
M Phone
N Yelp URL
O Google Rating
P Google Reviews (#)
Q Yelp Rating
R Yelp Reviews (#)
S Review Volume (Low/Med/High)
T Pain Signal (Y/N)
U Personalization Hook
V Message Variant (Email A / Email B / DM)
W Stage
X Last Touch Date
Y Next Step Date
Z Next Step
AA Owner (Bob)
AB Notes
AC Trial Interested? (Y/N)
AD Trial Start Date
AE Trial End Date
AF Outcome (Won/Lost/No Response)
AG Expected MRR ($)
AH Upsells Interested (SMS / Benchmark / Training)
AI Follow-Up Count

Add DATA VALIDATION dropdowns:
- Column V (Message Variant): Email A, Email B, DM
- Column W (Stage): 0-Not Contacted, 1-Sent, 2-Replied, 3-Qualified, 4-Booked Call, 5-Trial Active, 6-Converted, 7-Not Fit, 8-No Response
- Column S (Review Volume): Low, Medium, High
- Column T (Pain Signal): Y, N
- Column AC (Trial Interested?): Y, N
- Column AF (Outcome): Won, Lost, No Response
- Column AA (Owner): Bob

Formulas:
1) Lead ID (B2):
=IF(C2="","",TEXTJOIN("-",TRUE,LEFT(D2,3),LEFT(C2,8),TEXT(A2,"yymmdd")))
Drag down.

2) Follow-Up Count (AI2):
=IF(W2="0-Not Contacted",0,IF(W2="1-Sent",1,IF(W2="2-Replied",1,IF(W2="3-Qualified",2,IF(W2="4-Booked Call",2,IF(W2="5-Trial Active",3,IF(W2="6-Converted",3,IF(W2="8-No Response",3,0))))))))

3) Expected MRR (AG2) based on locations (I2) and base plan $399:
=IF(I2="",0,I2*399)
(Adjust later if you tag higher-volume locations at $499.)

4) Next Step Date (Y2) rule of thumb (auto-suggest):
=IF(W2="1-Sent",X2+2,IF(W2="8-No Response",X2+5,IF(W2="2-Replied",TODAY(),IF(W2="3-Qualified",TODAY()+1,""))))

Operational rule: whenever you send a message, update Stage to “1-Sent”, set Last Touch Date, and set Next Step.

----------------------------------------------------
TAB 2: DASHBOARD
----------------------------------------------------
Create these cells:
A1 Metric | B1 Value
A2 Total Leads | B2 =COUNTA(PIPELINE!C:C)-1
A3 Sent | B3 =COUNTIF(PIPELINE!W:W,"1-Sent")
A4 Replied | B4 =COUNTIF(PIPELINE!W:W,"2-Replied")
A5 Qualified | B5 =COUNTIF(PIPELINE!W:W,"3-Qualified")
A6 Trial Active | B6 =COUNTIF(PIPELINE!W:W,"5-Trial Active")
A7 Converted | B7 =COUNTIF(PIPELINE!W:W,"6-Converted")
A8 MRR (Converted) | B8 =SUMIF(PIPELINE!W:W,"6-Converted",PIPELINE!AG:AG)
A9 Calls Booked | B9 =COUNTIF(PIPELINE!W:W,"4-Booked Call")
A10 Due Today (Next Step) | B10 =COUNTIF(PIPELINE!Y:Y,TODAY())

----------------------------------------------------
TAB 3: ACTIVITY LOG
----------------------------------------------------
Columns:
A Date
B Lead ID
C Channel (Email/DM/Phone)
D Action (Sent/Follow-up/Call/Notes)
E Result (No reply/Reply/Booked/Not fit)
F Notes

This is optional but helpful if you want auditability.

====================================================
B) 25-PROSPECT STARTER CSV (PASTE INTO PIPELINE)
====================================================
How to use: Copy everything from the header row through row 25 and paste into PIPELINE starting at A1. Then enrich: find the business’s email from their website contact page + Google Maps listing.

CSV:
Date Added,Business Name,Category,Website,Google Maps URL,City,State,Locations (#),Contact Name,Contact Role,Email,Phone,Yelp URL,Google Rating,Google Reviews (#),Yelp Rating,Yelp Reviews (#),Review Volume (Low/Med/High),Pain Signal (Y/N),Personalization Hook,Message Variant,Stage,Last Touch Date,Next Step Date,Next Step,Owner (Bob),Notes,Trial Interested? (Y/N),Trial Start Date,Trial End Date,Outcome (Won/Lost/No Response),Upsells Interested (SMS / Benchmark / Training)
2026-05-14,Prospect Dentist 01,Dentist,,(paste maps link),,(state),1,,,,,,4.2,120,,, ,Medium,Y,"Recent 3-star review not replied",Email A,0-Not Contacted,,,,Bob,"Source: Google Maps - replace placeholders",N,,,,,
2026-05-14,Prospect Dentist 02,Dentist,,(paste maps link),,(state),1,,,,,,4.5,85,,, ,Low,N,"Strong rating; pitch speed + consistency",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Dentist 03,Dentist,,(paste maps link),,(state),2,,,,,,4.0,210,,, ,High,Y,"Multiple reviews/week; owner likely busy",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Dentist 04,Dentist,,(paste maps link),,(state),1,,,,,,3.9,60,,, ,Low,Y,"Rating <4.0 = revenue leverage",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Dentist 05,Dentist,,(paste maps link),,(state),3,,,,,,4.6,300,,, ,High,N,"Multi-location; propose 1-week trial",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Dentist 06,Dentist,,(paste maps link),,(state),1,,,,,,4.3,140,,, ,Medium,Y,"Several ‘no response from office’ mentions",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Dentist 07,Dentist,,(paste maps link),,(state),1,,,,,,4.7,55,,, ,Low,N,"Good rating; differentiate with Yelp too",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Dentist 08,Dentist,,(paste maps link),,(state),2,,,,,,4.1,190,,, ,High,Y,"Recent negative review unanswered",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Dentist 09,Dentist,,(paste maps link),,(state),1,,,,,,4.4,100,,, ,Medium,N,"Pitch ‘brand-safe replies + escalation’",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Dentist 10,Dentist,,(paste maps link),,(state),4,,,,,,4.2,410,,, ,High,N,"Offer agency-style multi-location ops",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 01,Med Spa,,(paste maps link),,(state),1,,,,,,4.0,260,,, ,High,Y,"High review velocity; reputation = bookings",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 02,Med Spa,,(paste maps link),,(state),2,,,,,,4.3,180,,, ,High,N,"Emphasize fast responses + tone control",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 03,Med Spa,,(paste maps link),,(state),1,,,,,,3.8,90,,, ,Medium,Y,"Under 4.0 rating; quick-win ops",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 04,Med Spa,,(paste maps link),,(state),1,,,,,,4.6,75,,, ,Low,N,"Pitch consistent replies + review requests",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 05,Med Spa,,(paste maps link),,(state),3,,,,,,4.1,340,,, ,High,Y,"Multi-location + high volume",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 06,Med Spa,,(paste maps link),,(state),1,,,,,,4.4,150,,, ,Medium,N,"Mention weekly KPI report",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 07,Med Spa,,(paste maps link),,(state),2,,,,,,4.2,220,,, ,High,Y,"Unanswered 1-star/2-star within last month",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 08,Med Spa,,(paste maps link),,(state),1,,,,,,4.7,95,,, ,Low,N,"Good rating; sell ‘protect the moat’",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 09,Med Spa,,(paste maps link),,(state),1,,,,,,4.0,130,,, ,Medium,Y,"Service businesses benefit from speed",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 10,Med Spa,,(paste maps link),,(state),4,,,,,,4.3,500,,, ,High,N,"Enterprise-lite multi-location ops",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Dentist 11,Dentist,,(paste maps link),,(state),1,,,,,,4.1,70,,, ,Low,Y,"Several reviews mention scheduling issues",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Dentist 12,Dentist,,(paste maps link),,(state),2,,,,,,4.5,260,,, ,High,N,"Pitch Yelp + Google coverage",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 11,Med Spa,,(paste maps link),,(state),1,,,,,,3.9,110,,, ,Medium,Y,"Rating under 4.0; fix perception fast",Email A,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 12,Med Spa,,(paste maps link),,(state),2,,,,,,4.6,210,,, ,High,N,"Offer 7-day trial with approval workflow",Email B,0-Not Contacted,,,,Bob,"",N,,,,,
2026-05-14,Prospect Med Spa 13,Med Spa,,(paste maps link),,(state),1,,,,,,4.2,160,,, ,Medium,Y,"Recent 2-star unanswered",Email A,0-Not Contacted,,,,Bob,"",N,,,,,

Note: Business names are placeholders intentionally—replace with real businesses as you source on Google Maps. Keep the rest of the structure so your tracker stays consistent.

====================================================
C) FREE LEAD SOURCING SOP (NO PAID TOOLS)
====================================================
1) Open Google Maps → search: “dentist [city]” then “med spa [city]”.
2) Pick businesses with:
   - Rating <4.5 OR
   - Reviews >100 OR
   - Visible unanswered reviews OR
   - Multi-location operators.
3) For each lead, capture:
   - Google Maps URL
   - Website
   - Rating + review count
   - Yelp URL (if present)
4) Find email:
   - Visit website → Contact page → footer → “info@ / office@”
   - If only a form, log the form URL in Notes and use DM/phone variant.
5) Log into PIPELINE:
   - Stage starts at 0-Not Contacted.
   - When you send: set Stage=1-Sent, set Last Touch Date=TODAY(), set Next Step=“Follow-up Day 2”, Next Step Date=TODAY()+2.
6) CTA in every message:
   - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
   - Reply-to: agent_bob_replit+review-bot@agentmail.to

If you want, next cycle I can convert the placeholder prospect rows into real business targets for one metro (you choose the city) and produce a fully enriched list with websites + contact emails gathered from their public sites (still $0 spend).