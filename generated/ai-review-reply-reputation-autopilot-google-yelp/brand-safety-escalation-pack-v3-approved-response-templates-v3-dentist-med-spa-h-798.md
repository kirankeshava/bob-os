# Brand-Safety & Escalation Pack v3 + Approved Response Templates v3 (Dentist / Med Spa / HVAC)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:04:44.449Z

---

## 0) Customer-facing safety positioning (paste into onboarding / sales email)
AI Review Reply & Reputation Autopilot helps you respond to Google Business Profile and Yelp reviews quickly **without risky language**. Responses are designed to be brand-safe: we avoid admitting liability, avoid confirming any personal/medical details, never offer incentives for reviews, and for negative situations we encourage taking the conversation offline. You can review/approve drafts before anything posts. 

Website (for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1 
Support: agent_bob_replit+review-bot@agentmail.to

---

## 1) Brand-Safety Checklist v3 (Google Business Profile + Yelp)
Use this as a **hard gate** before approval/posting.

### A. Universal “Must Not” rules (auto-block or manual-only)
1) **No PHI / personal data confirmation**
- Do not confirm the reviewer is/was a patient/customer (especially in healthcare). 
- Do not reference: “your visit/appointment/chart/records/treatment/X-ray/photos/lab results.”
- Do not mention staff last names, addresses, phone numbers, invoices, or account details.

2) **No admitting fault or liability**
- Block phrases: “we were negligent”, “we messed up”, “our fault”, “we caused”, “we damaged”, “we injured”, “malpractice”, “HIPAA violation” (as an admission).
- Allowed: apologize for experience **without** admitting wrongdoing.

3) **No medical outcome guarantees or clinical claims** (Dentist/Med Spa)
- Block: “guaranteed”, “permanent”, “cure”, “100%”, “no risk”, “FDA-approved for you” (unless verified and appropriate), “you will see results”.
- Allowed: general, non-quantified: “results vary” / “we’d be happy to discuss options privately.”

4) **No incentives / review gating** (Google + Yelp)
- Block: “discount for a review”, “free gift”, “we’ll refund if you change your review”, “contact us and we’ll make it right if you update your rating.”
- Do not ask only happy customers to review.

5) **No doxxing, threats, retaliation, or arguing**
- No profanity, sarcasm, blame, or accusing the reviewer of lying.
- No “we will sue”, “we’ll report you”, “we know who you are.”

6) **No competitor disparagement**
- Block: “unlike [competitor]”, “they’re scammers”, “their work is bad.”

### B. Universal “Must Include” rules (for most responses)
1) **Professional tone + gratitude**
2) **No personal data**
3) **For negative/neutral reviews:**
- Acknowledge generally (no specifics), invite offline resolution.
- Provide a contact path (phone/email) or “please reach out via our office line.”

### C. Mandatory offline-CTA patterns (safe options)
- “We’d like to learn more and help. Please contact our office so we can look into this directly.”
- “For privacy, we can’t discuss details here. Please reach out to our team and we’ll follow up.”

### D. Manual-only hold triggers (do not post automatically)
Set response mode = **blocked_manual_review** and escalation level as noted.
- **Legal threats:** “attorney”, “lawyer”, “lawsuit”, “sue”, “court”, “demand letter” → Escalation=Legal
- **Safety/injury claims:** “injured”, “hurt”, “bleeding”, “fire”, “gas leak”, “carbon monoxide”, “unsafe”, “assault” → Escalation=Safety
- **PHI mention + expectation of confirmation:** “my chart/records/visit/appointment” (healthcare) → Escalation=Privacy
- **Harassment/hate speech/threats:** slurs, threats of violence → Escalation=Safety/HR

### E. Platform-specific notes
**Google Business Profile:** Keep responses helpful and concise; avoid promotional language in direct response to disputes; do not discuss other customers.
**Yelp:** Avoid any language that sounds like you’re asking for reviews, offering incentives, or negotiating rating changes. Do not claim you can remove reviews or influence Yelp moderation.

---

## 2) Escalation Playbook v3 (common negative scenarios)
Each scenario includes: risk, response guidance, internal routing, SLA, and evidence to collect.

### 2.1 Billing / price dispute (all verticals)
- **Risk:** escalates publicly; may invite disclosure of private billing info.
- **Public response guidance:** apologize for frustration; do not quote invoice details; invite offline discussion.
- **Route to:** Billing/Owner.
- **SLA:** First contact < 24h.
- **Evidence:** invoice ID (internal), service date (internal), payment logs, signed estimate (HVAC).

### 2.2 Service quality complaint (all)
- **Risk:** inflammatory back-and-forth.
- **Public response:** acknowledge; commit to listening; invite offline.
- **Route:** Ops Manager / GM.
- **SLA:** < 24h.
- **Evidence:** work order, staff on shift, photos (HVAC), notes.

### 2.3 Alleged damage to property (HVAC)
- **Risk:** liability.
- **Public response:** do not admit fault; state you want to review and resolve; take offline.
- **Route:** Owner + Ops.
- **SLA:** < 4h if safety-related, otherwise < 24h.
- **Evidence:** job photos, technician notes, before/after, any signed waivers.

### 2.4 Injury / safety incident (HVAC + healthcare)
- **Risk:** high legal/safety exposure.
- **Rule:** **Manual-only hold**. Do not post until reviewed by Owner/Legal.
- **Route:** Owner/GM immediately; Legal same-day.
- **SLA:** < 4h.
- **Evidence:** incident report, timestamps, witnesses, any communications.

### 2.5 HIPAA/Privacy mention (Dentist/Med Spa)
- **Risk:** PHI confirmation.
- **Rule:** If review mentions appointment/records/clinical details → **Manual-only hold**.
- **Public response:** privacy-first, generic: cannot discuss; invite direct contact.
- **Route:** Privacy officer / Owner.
- **SLA:** same-day.
- **Evidence:** internal visit lookup performed only by authorized staff (not via public reply), communications log.

### 2.6 Medical outcome dissatisfaction (Dentist/Med Spa)
- **Risk:** medical claims; arguing about results.
- **Public response:** results vary; cannot discuss details; offer follow-up visit consult offline.
- **Route:** Clinical lead + Owner.
- **SLA:** < 24h.
- **Evidence:** consent forms, post-care instructions, treatment notes (internal only).

### 2.7 Suspected fake review / not a customer (all)
- **Risk:** wrongfully accusing; privacy.
- **Public response:** do not call them a liar; state you can’t locate experience and invite them to contact you to clarify.
- **Route:** Owner/Ops.
- **SLA:** < 24h.
- **Evidence:** booking records, call logs; platform flagging procedure (separate from public reply).

### 2.8 Discrimination / harassment allegation (all)
- **Risk:** reputational + HR.
- **Rule:** Manual-only if includes threats/slurs or legal threats.
- **Public response:** take seriously; invite direct contact; avoid debating.
- **Route:** Owner + HR.
- **SLA:** < 4h (serious), else < 24h.
- **Evidence:** staff statements, CCTV if applicable, incident report.

### 2.9 “Report to Yelp/Google” or demands removal (all)
- **Risk:** promising moderation outcomes.
- **Public response:** do not say you can remove; offer to discuss offline.
- **Route:** Owner/Marketing.
- **SLA:** < 24h.

### “DO NOT POST” conditions
- Mentions of chart/records/appointment details (healthcare) + any confirmation language
- Any legal threat keywords
- Any safety/injury/violence threat details
- Any response that contains blocked phrases, incentives, or personal data

---

## 3) Approved Response Templates v3 (versioned, paste-ready)
**Rules for variables:**
- Allowed variables only: {BusinessName}, {City}, {SupportEmailOrPhone}, {TeamName}. 
- Do NOT insert reviewer name, appointment date, procedure name, invoice amount, staff last name, or any private details.
- For Yelp: keep slightly more neutral; never imply incentives or rating change.

### 3A) Dentist templates
**DEN-G-01 Positive (Google/Yelp OK)**
“Thank you for the kind words. We appreciate you taking the time to share your experience with {BusinessName}. Our team is glad we could help, and we look forward to seeing you again.”

**DEN-G-02 Neutral/brief (Google/Yelp OK)**
“Thanks for your feedback. If there’s anything we can do to improve your experience, please contact our office so we can learn more and help.”

**DEN-G-03 Mild negative (offline CTA + privacy-safe)**
“Thank you for sharing this. We’re sorry to hear your experience didn’t meet expectations. For privacy, we can’t discuss details here, but we’d like to learn more and see how we can help—please contact us at {SupportEmailOrPhone}.”

**DEN-G-04 Strong negative (no admission; calm)**
“We’re concerned to hear this and would like the opportunity to address it directly. For privacy reasons we can’t discuss specifics in a public forum. Please reach out to {SupportEmailOrPhone} so a manager can follow up.”

**DEN-G-05 HIPAA/privacy-sensitive mention (use when reviewer shares details; still generic)**
“Thank you for your message. To protect everyone’s privacy, we can’t discuss or confirm any personal or care-related information here. If you contact our office at {SupportEmailOrPhone}, we’ll make sure the appropriate team member follows up.”

**DEN-G-06 Suspected fake/unmatched review**
“Thanks for writing. We take feedback seriously, but we’re not able to identify the situation from what’s posted here. Please contact {BusinessName} at {SupportEmailOrPhone} so we can understand what happened and assist.”

### 3B) Med Spa templates
**SPA-01 Positive**
“Thank you for the review. We appreciate you choosing {BusinessName}, and we’re glad you had a great experience with our team.”

**SPA-02 Neutral**
“Thanks for the feedback. We’re always working to improve, and we’d welcome the chance to learn more—please contact us at {SupportEmailOrPhone}.”

**SPA-03 Mild negative (privacy-forward)**
“We’re sorry to hear this wasn’t what you expected. For privacy, we can’t discuss any details here, but we’d like to connect and help—please reach out to {SupportEmailOrPhone}.”

**SPA-04 Strong negative (no clinical claims)**
“Thank you for sharing your concerns. We take this seriously and would like to speak with you directly. Please contact {SupportEmailOrPhone} so we can understand the situation and discuss next steps.”

**SPA-05 Outcome dissatisfaction (results vary, no guarantees)**
“Thank you for your feedback. Individual results can vary, and we’d like to better understand your concerns. For privacy, we can’t discuss details here—please contact {SupportEmailOrPhone} so we can follow up directly.”

**SPA-06 Suspected fake/unmatched**
“We appreciate you reaching out. We’re not able to confirm the situation from this post, but we’d like to look into it. Please contact {SupportEmailOrPhone} so we can assist.”

### 3C) HVAC templates
**HVAC-01 Positive**
“Thank you for the review. We appreciate you choosing {BusinessName}, and we’re glad our team could help.”

**HVAC-02 Neutral**
“Thanks for your feedback. If there’s anything we can do to improve, please contact {SupportEmailOrPhone} so we can learn more.”

**HVAC-03 Mild negative (service delay / communication)**
“Thanks for letting us know. We’re sorry for the frustration. We’d like to understand what happened and help make things right—please reach out to {SupportEmailOrPhone} so a manager can follow up.”

**HVAC-04 Strong negative (damage allegation-safe, no admission)**
“We’re concerned to hear this. We’d like the opportunity to review the situation and address your concerns directly. Please contact {SupportEmailOrPhone} so we can follow up and work toward a resolution.”

**HVAC-05 Safety concern mention (generic; typically manual-only, but template is safe if approved)**
“Thank you for raising this. We take safety concerns seriously. Please contact {SupportEmailOrPhone} as soon as possible so our team can follow up directly.”

**HVAC-06 Suspected fake/unmatched**
“Thanks for the note. We’re not able to match this to our records from the information provided. Please contact {SupportEmailOrPhone} so we can look into it and assist.”

---

## 4) Yelp vs Google response constraints (operational quick-reference)
- Don’t mention incentives/discounts tied to reviews (both platforms; Yelp especially sensitive).
- Don’t ask for an updated rating or imply outcomes like “if you change your review.”
- Don’t claim you can remove reviews or influence moderation.
- Keep responses factual, calm, and privacy-protective; never confirm customer/patient status in healthcare.

---

## 5) Implementation notes (for engineering/ops)
- Enforce blocked phrases and manual-only hold triggers **twice**: pre-generation (so the model doesn’t get led) and pre-post (hard gate).
- Log every state change: draft_created, flagged, blocked_manual_review, approved, posted, failed.
- Weekly report reconciliation must separate: approved vs posted vs blocked_manual_review to avoid inflated response-rate KPIs.

End of Pack v3.