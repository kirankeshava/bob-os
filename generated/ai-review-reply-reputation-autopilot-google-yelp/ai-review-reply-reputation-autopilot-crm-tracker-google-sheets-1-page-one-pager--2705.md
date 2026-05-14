# AI Review Reply & Reputation Autopilot — CRM Tracker (Google Sheets), 1-Page One-Pager, and 10 Vertical Demo Example Packs

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** sales
**Created by:** Sales Agent
**Created:** 2026-05-14T05:55:17.120Z

---

# 1) CRM + KPI Funnel Tracker (Google Sheets) — copy/paste spec

## Sheet setup
Create a Google Sheet with 3 tabs:
1) **Pipeline** (row-level deal tracking)
2) **Weekly Rollup** (auto rollups by week)
3) **Reputation KPIs (Client)** (per-location weekly report log)

---

## Tab 1: Pipeline (headers)
Paste these headers in row 1:

- Date Added
- Lead Source (Inbound/Outbound/Referral/Partner)
- Business Name
- Primary Contact Name
- Email
- Phone
- City/State
- Industry
- Locations (#)
- Platforms (GBP/Yelp/Both)
- Reviews per Month (est.)
- Current Reply Rate (% est.)
- Avg Response Time (days)
- Rating (GBP)
- Rating (Yelp)
- Pain Trigger (missed calls/complaints/no time/brand risk)
- Decision Maker? (Y/N)
- Access Owner (owner/manager/agency)
- Stage (dropdown)
- Stage Date (last updated)
- Next Step
- Next Step Date
- Qualified? (Y/N)
- Deal Amount Monthly ($)
- Setup Fee ($)
- Target Start Date
- Proposal Sent (Y/N)
- Payment Status (Not sent/Sent/Paid)
- Activation Status (Not started/Waiting access/Live)
- Notes

### Stage dropdown values
- New
- Contacted
- Discovery Booked
- Discovery Completed
- Demo Scheduled
- Demo Completed
- Proposal Sent
- Closed Won (Verbal)
- Paid
- Access Granted
- Activated (Live)
- Closed Lost
- Nurture

### Required pipeline discipline (operator rules)
- Every row must always have: **Stage, Stage Date, Next Step, Next Step Date**.
- After every call, update: **Qualified?**, **Reviews per Month**, **Current Reply Rate**, **Avg Response Time**, and **Decision Maker?**.
- Definition of “Activated (Live)”: access granted + brand voice rules submitted + first 10 replies approved or auto-approved.

---

## Tab 2: Weekly Rollup (layout)
Row 1 headers:
- Week Start (Mon)
- New Leads
- Discovery Booked
- Discovery Completed
- Demos Completed
- Proposals Sent
- Closed Won
- Paid
- Activated
- Close Rate (Qualified → Paid)
- Activation Rate (Paid → Activated)
- Notes

### Rollup formula guidance (simple, manual-friendly)
If you want zero-maintenance rollups, use a pivot table on the Pipeline tab:
- Rows: Week (group Date Added by week)
- Columns: Stage
- Values: COUNTA of Business Name

If staying manual: update weekly counts every Friday in <5 minutes.

---

## Tab 3: Reputation KPIs (Client) (headers)
- Week Start
- Client Name
- Location Name / GBP Listing
- Platform (GBP/Yelp)
- New Reviews (#)
- Replies Posted (#)
- Reply Rate (%)
- Median Response Time (hrs)
- Avg Star Rating (week)
- Rolling 90-day Avg Rating
- Negative Reviews (1–2⭐) (#)
- Escalations Sent (#)
- Resolutions Logged (#)
- Notes / Highlights

---

# 2) 1-Page One-Pager (send after calls)

**AI Review Reply & Reputation Autopilot (Google + Yelp)**  
Brand-safe review replies. Faster responses. Fewer fires. Weekly reputation KPIs.

**Legitimacy / info:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
**Contact:** agent_bob_replit+review-bot@agentmail.to

## The problem (what this fixes)
Most local businesses lose revenue quietly because:
- Reviews go unanswered for days/weeks (or never)
- Negative reviews aren’t triaged fast enough
- Responses sound defensive, generic, or off-brand
- No one is tracking reputation performance week to week

## The solution
We draft and post **brand-safe, on-voice responses** to Google Business Profile and Yelp reviews, **escalate negatives instantly**, and send a **weekly KPI report**.

## What you get
- **Reply autopilot:** Drafts responses that match your brand voice and compliance rules
- **Negative review escalation:** 1–2⭐ reviews trigger an escalation note to your team (with suggested next action)
- **Weekly KPI report:** New reviews, reply rate, response time, rating trend, negatives + resolutions
- **Approval mode (optional):** You can approve replies first, or we auto-post within agreed guardrails

## How activation works (live in <48h)
Day 0: Intake form (voice, do/don’t, escalation contacts) + access request for GBP/Yelp  
Day 1: We run sample replies for approval + confirm escalation rules  
Day 2: We go live and begin responding + weekly KPI reporting

## Pricing (per location)
- **Monthly retainer:** $299–$499 / location (depends on review volume + platforms)
- **One-time setup:** $199 / location (voice profile + workflows + reporting baseline)

## Next step
Reply to this email with:
1) # of locations  
2) Google/Yelp (or both)  
3) Best start date (we can usually start within 48h)

---

# 3) 10 Industry-Specific Demo Example Packs (copy/paste)
Use these during the 5-minute demo: show 1 positive + 1 negative reply + escalation note.

## A) Dentist
**Positive review:** “Best cleaning I’ve had—super gentle and friendly staff.”
**Reply draft:** “Thank you for the kind words. We’re glad your visit was comfortable and that our team helped you feel at ease. We appreciate you choosing us for your care and look forward to seeing you at your next appointment.”

**Negative review (1⭐):** “Waited 45 minutes past my appointment time. No apology.”
**Reply draft:** “Thank you for the feedback, and I’m sorry your visit didn’t run on time. That’s not the experience we aim to provide. We’d like to understand what happened and make it right—please email us with your appointment date/time and the best number to reach you, or call the office so we can follow up directly.”
**Escalation note (internal):** 1⭐ delay complaint. Ask front desk to check schedule that day + offer priority rebook or partial courtesy credit per policy.

## B) Med Spa
**Positive:** “Laser results are amazing and the clinic is spotless.”
**Reply:** “We’re so happy you’re loving your results. Thank you for noticing the care we put into a clean, comfortable experience. We appreciate your trust and can’t wait to see you again.”

**Negative (2⭐):** “Felt pressured to buy a package. Not relaxing.”
**Reply:** “Thank you for sharing this. We’re sorry you felt pressured—our goal is always a supportive, no-pressure experience. We’d like to learn more and address this with our team. Please email us with the date of your visit and who you worked with so we can follow up privately.”
**Escalation:** Potential sales-pressure issue. Route to clinic manager; review staff scripting + offer consult redo.

## C) Restaurant
**Positive:** “Food was incredible and service was fast.”
**Reply:** “Thank you for dining with us. We’re thrilled you enjoyed the food and had quick, friendly service. We look forward to welcoming you back soon.”

**Negative (1⭐):** “Cold food and server disappeared. Won’t be back.”
**Reply:** “We’re sorry to hear this and appreciate you letting us know. Cold food and inattentive service are not acceptable. We’d like a chance to make this right—please email us with the date/time of your visit and any details about your order so a manager can follow up directly.”
**Escalation:** Urgent ops issue. Notify GM; comp/remake policy; check expo line + staffing that shift.

## D) HVAC
**Positive:** “Tech arrived on time, explained everything, fair price.”
**Reply:** “Thank you for the review. We’re glad the technician arrived on time and walked you through the options clearly. We appreciate your business and are here anytime you need us.”

**Negative (2⭐):** “Quoted one price then invoice was higher.”
**Reply:** “Thank you for bringing this to our attention, and I’m sorry for the confusion. Pricing transparency matters to us. Please email us your invoice number (or the service date and address) so we can review the quote vs. final invoice and resolve this promptly.”
**Escalation:** Billing discrepancy. Route to office manager; pull call notes/estimate; correct invoice if mismatch.

## E) Plumber
**Positive:** “Emergency leak fixed quickly. Professional and clean.”
**Reply:** “We’re glad we could help fast. Thanks for trusting us with the emergency—our team works hard to be professional and respectful of your home. Please reach out anytime.”

**Negative (1⭐):** “No-show. Took the day off work for nothing.”
**Reply:** “I’m very sorry about this—missing an appointment is not acceptable. We’d like to investigate what happened and make it right. Please email us your name and appointment date/time so we can follow up immediately.”
**Escalation:** No-show claim. Route to dispatch lead; check scheduling system + call logs; offer priority slot + fee waiver.

## F) Law Firm
**Positive:** “Clear communication and got my case resolved.”
**Reply:** “Thank you for the feedback. We’re glad we could provide clear communication and help you reach a resolution. We appreciate the opportunity to support you.”

**Negative (2⭐):** “Hard to reach. Took days to get a call back.”
**Reply:** “Thank you for letting us know, and we’re sorry you had trouble reaching us. Timely communication is important. Please email us your case name (or the best number to reach you) so our team can follow up directly and address the delay.”
**Escalation:** Comms delay risk. Route to office admin + assigned attorney; review intake SLA.

## G) Auto Repair
**Positive:** “Honest shop. Explained repairs and didn’t upsell.”
**Reply:** “Thanks for the great review. We’re glad you felt informed and never pressured—honesty and clarity are core to how we operate. We appreciate your business.”

**Negative (1⭐):** “Car came back with the same issue. Waste of money.”
**Reply:** “We’re sorry to hear this and appreciate you telling us. We want to make it right. Please email us your invoice number and the symptoms you’re still experiencing so we can schedule a re-check and review the original repair.”
**Escalation:** Comeback repair. Route to service manager; set re-diagnosis; warranty/guarantee policy.

## H) Salon
**Positive:** “Color turned out perfect and the stylist listened.”
**Reply:** “Thank you. We’re so happy you loved the color and felt heard—great consultations matter. We appreciate you and look forward to seeing you again.”

**Negative (2⭐):** “Not what I asked for. Too dark and rushed.”
**Reply:** “Thank you for the feedback, and I’m sorry we missed the mark. We’d like the chance to fix this. Please email us with your appointment date and a photo of your current color so we can coordinate a corrective service with a manager.”
**Escalation:** Potential redo. Route to salon manager; schedule correction; review consult notes.

## I) Gym
**Positive:** “Clean, great equipment, friendly staff.”
**Reply:** “Thank you for the review. We’re glad you’re enjoying the facility and team. Cleanliness and a welcoming experience are top priorities—see you at your next workout.”

**Negative (1⭐):** “Canceled membership but still got charged.”
**Reply:** “We’re sorry for the billing frustration. That’s not the experience we want. Please email us your name and the date you requested cancellation so we can review the account and resolve any incorrect charges promptly.”
**Escalation:** Billing/cancellation dispute. Route to membership admin; check cancellation form + refund policy.

## J) Home Cleaning
**Positive:** “Crew was thorough and respectful. House looks amazing.”
**Reply:** “Thank you for the kind words. We’re glad the team delivered a thorough clean and treated your home with care. We appreciate your business and look forward to helping again.”

**Negative (2⭐):** “Missed spots and arrived late.”
**Reply:** “Thank you for sharing this, and we’re sorry for the late arrival and missed areas. We want every clean to meet a high standard. Please email us your service date and the areas that were missed so we can make this right.”
**Escalation:** Quality + lateness. Route to ops lead; offer touch-up clean; review crew checklist and routing.
