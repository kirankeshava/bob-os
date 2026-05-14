# AI Review Reply & Reputation Autopilot — Compliance Ops Pack v3 (Brand-Safety Checklist + Escalation Playbook + Approved Templates + Customer Intake)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:37:03.863Z

---

# AI Review Reply & Reputation Autopilot — Compliance Ops Pack v3
Contact: agent_bob_replit+review-bot@agentmail.to  
Product page (share for legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

## 1) Brand-Safety Checklist v3 (Operator Tick-Box)
Use before approving any response (Google Business Profile or Yelp).

### A. Always required
- [ ] Tone is calm, professional, non-argumentative, non-sarcastic.
- [ ] Thanks the reviewer (even if negative) without sounding performative.
- [ ] Includes an offline CTA (phone/email) and invites details privately.
- [ ] Does not request the reviewer to change/remove their review.
- [ ] Does not mention platform enforcement (e.g., “Yelp will remove this”).

### B. Prohibited: PHI/HIPAA + personal data
- [ ] Response does NOT confirm the person is/was a patient/client/customer when healthcare-related.
- [ ] Response does NOT reference “chart/records/visit/appointment/date/time/provider name/treatment.”
- [ ] Response does NOT include personal data (addresses, phone numbers, emails, last names, staff schedules).
- **Hard-block phrases (examples):** “your chart/records,” “we reviewed your file,” “during your visit,” “when you came in on,” “as your dentist/doctor,” “your treatment plan.”
- **Safe alternative:** “We can’t discuss any private details here, but we’d like to learn more and help. Please contact [OFFLINE CONTACT].”

### C. Prohibited: Medical claims & guarantees (Dentist/Med Spa)
- [ ] No outcome guarantees (“permanent,” “guaranteed results,” “100%”).
- [ ] No medical promises (“will heal,” “cure,” “no side effects”).
- [ ] No diagnosing the reviewer.
- **Safe alternative:** “Results and experiences can vary. We’d like to understand what happened and address concerns offline.”

### D. Prohibited: Liability admission / fault statements
- [ ] Do not admit negligence or confirm wrongdoing (“we messed up,” “our fault,” “we damaged,” “we injured”).
- [ ] Avoid definitive causation language.
- **Safe alternative:** “We’re sorry to hear this happened and want to look into it. Please contact [OFFLINE CONTACT] so we can review and make it right where appropriate.”

### E. Prohibited: Incentives, review gating, manipulation (Google/Yelp)
- [ ] No offering discounts, refunds, gifts, credits in exchange for reviews.
- [ ] No “contact us first before leaving a review” language.
- [ ] No directing only happy customers to review.
- **Hard-block phrases:** “discount,” “coupon,” “gift card,” “in exchange for,” “leave us 5 stars,” “we’ll refund if you update.”

### F. Prohibited: Harassment, discrimination, threats, retaliation
- [ ] No threats (legal, financial, immigration, job threats).
- [ ] No insults or attacking the reviewer.
- [ ] If review includes slurs/threats: response stays neutral + moves offline; consider reporting via platform tools.

### G. Competitor disparagement / defamation risk
- [ ] Do not accuse reviewer of being a competitor publicly.
- [ ] Do not name competitors or compare.
- **Safe alternative for suspected fake review:** “We can’t locate this experience. Please contact [OFFLINE CONTACT] with details so we can investigate.”

### H. Legal threats trigger (Manual-only hold)
- [ ] If review mentions: “attorney,” “lawyer,” “lawsuit,” “sue,” “legal action,” “demand letter,” “court” → **DO NOT POST**.
- [ ] Escalate to Legal level immediately; require manual approval by owner/legal.

---

## 2) Escalation Playbook v3 (Scenarios, SLAs, Do/Don’t)

### Escalation levels
- **L0 (Auto-OK):** Positive/neutral; minor issues with no safety/legal/PHI content.
- **L1 (Ops Follow-up):** Service quality complaints, delays, staff rudeness (no threats/PHI).
- **L2 (Sensitive):** Billing disputes, refund demands, alleged damage (non-injury), discrimination allegations (no threats), suspected fake review patterns.
- **L3 (Safety/PHI):** Mentions injury, unsafe conditions, infection, “HIPAA,” or includes private details.
- **L4 (Legal Hold):** Any legal threat language. **Manual-only hold. Do not post publicly.**

### Routing SLAs (internal)
- L0: can post after standard checklist.
- L1: Ops/GM acknowledgment within 24h; attempt offline contact same day.
- L2: Owner/GM within 12–24h; Billing lead within 24h if billing.
- L3: Owner/GM within 4h; compliance lead same day; gather incident facts.
- L4: Owner + Legal same day; preserve evidence; no public response until cleared.

### Evidence to collect (minimum)
- Review URL + platform + timestamp
- Internal job/appointment lookup attempt result (found/not found) WITHOUT putting details in the public response
- Any relevant photos, invoices, service notes (internal only)
- Staff involved (internal)
- Proposed remediation options (internal)

### Do-not-post conditions (absolute)
- PHI/private info present and cannot be safely neutralized
- Active legal threat / litigation
- Ongoing safety investigation (injury, alleged assault, police involvement)
- Reviewer posts doxxing info; respond only with a neutral “please contact us” and report via platform as needed

### Scenario guidance (public response goals)
1) **Billing dispute / price surprise (L2)**
- Goal: acknowledge concern, invite offline resolution, avoid debating line items publicly.
- Don’t: quote invoice details unless the business explicitly confirms and approves.

2) **Service quality / “poor job” (L1)**
- Goal: apologize for experience (not for wrongdoing), offer to fix, move offline.

3) **Alleged damage/injury (L3)**
- Goal: express concern, avoid fault/cause, move offline urgently.
- Consider: manual review.

4) **Discrimination claim (L2/L3 depending on content)**
- Goal: take seriously, state commitment to respectful service, invite offline contact to investigate.
- Don’t: argue facts publicly.

5) **Suspected fake review (L2)**
- Goal: neutral, no accusations, invite details.

6) **Legal threat (L4)**
- Action: block posting; escalate to Legal; draft internal-only suggested response for counsel.

---

## 3) Approved Response Templates v3 (IDs, Variables, Platform Notes)

### Allowed variables (all templates)
- {BUSINESS_NAME}
- {OFFLINE_PHONE}
- {OFFLINE_EMAIL}
- {OFFLINE_HOURS}
- {SIGNOFF_NAME} (first name/role only; no last names)

### Disallowed variables (never insert)
- Reviewer full name, patient/client status confirmations (healthcare)
- Appointment dates/times, treatment names, provider names, invoice numbers
- Promises of discounts/refunds in exchange for review updates

### Universal CTA block (recommended)
“Please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} (hours: {OFFLINE_HOURS}) so we can learn more and help.”

### Dentist (Google/Yelp)
**DEN-01 Positive**
“Thanks for the kind words and for choosing {BUSINESS_NAME}. We’re glad you had a great experience. If you ever need anything, please reach us at {OFFLINE_PHONE}.”

**DEN-02 Neutral/short**
“Thank you for the feedback. If there’s anything we can do to improve your experience, please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL}.”

**DEN-03 Mild negative (service/communication)**
“Thank you for sharing this. We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and address your concerns—please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} (hours: {OFFLINE_HOURS}).”

**DEN-04 Strong negative (no PHI; no admission)**
“We’re sorry to hear this and appreciate you bringing it to our attention. We can’t discuss details here, but we want to look into what happened and help. Please contact {BUSINESS_NAME} at {OFFLINE_PHONE} or {OFFLINE_EMAIL}.”

**DEN-05 PHI-adjacent / mentions “HIPAA,” “records,” “my treatment” (L3 wording)**
“Thanks for your message. For privacy reasons, we can’t discuss any personal or health-related details here. We’d like to help—please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} so we can follow up.”

**DEN-06 Suspected fake review**
“Thank you for the feedback. We’re unable to locate the experience based on the information here. Please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} with details so we can investigate.”

### Med Spa (Google/Yelp)
**SPA-01 Positive**
“Thank you for the great review. We’re glad you enjoyed your visit with {BUSINESS_NAME}. We appreciate you taking the time to share your experience.”

**SPA-02 Neutral**
“Thanks for your feedback. If you’re open to sharing more, please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} so we can improve.”

**SPA-03 Mild negative**
“We’re sorry to hear this wasn’t the experience you expected. We’d like to learn more and see how we can help—please reach us at {OFFLINE_PHONE} or {OFFLINE_EMAIL}.”

**SPA-04 Strong negative (no outcome promises)**
“Thank you for letting us know. We take feedback seriously and want to address your concerns. Please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} so we can follow up directly.”

**SPA-05 Medical outcome complaint (“burn,” “infection,” “scar”) (L3)**
“We’re sorry to hear you’re concerned. For privacy and safety reasons, we can’t discuss details here, but we want to connect promptly. Please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} (hours: {OFFLINE_HOURS}).”

**SPA-06 Suspected fake review**
“Thanks for the note. We can’t confirm details in a public forum, and we’re unable to identify the experience from this post. Please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} so we can investigate.”

### HVAC (Google/Yelp)
**HVAC-01 Positive**
“Thank you for the review and for choosing {BUSINESS_NAME}. We’re glad the team could help. If you need anything else, call {OFFLINE_PHONE}.”

**HVAC-02 Neutral**
“Thanks for your feedback. If there’s anything we can do better, please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL}.”

**HVAC-03 Scheduling/late arrival (L1)**
“Thanks for sharing this. We’re sorry for the inconvenience and want to learn more. Please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} so we can follow up.”

**HVAC-04 Billing dispute (L2)**
“Thank you for the feedback. We’d like to review your concern and clarify options, but we can’t discuss billing details publicly. Please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL}.”

**HVAC-05 Alleged damage (L3)**
“We’re sorry to hear this and take it seriously. We’d like to look into what happened—please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} so we can follow up directly.”

**HVAC-06 Suspected fake review (L2)**
“Thanks for the feedback. We’re unable to locate the service experience from this post. Please contact us at {OFFLINE_PHONE} or {OFFLINE_EMAIL} with details so we can investigate.”

Platform notes (Google vs Yelp):
- Never mention incentives, discounts, or compensation in exchange for review changes.
- Do not claim the platform will remove a review.
- Do not ask for personal info publicly; request offline contact.

---

## 4) Customer Onboarding + Compliance Intake Questionnaire (Send to New Customers)
Send from agent_bob_replit+review-bot@agentmail.to.

Subject: Quick setup to reply to your Google/Yelp reviews safely

Body:
Hi — I’m Bob. We help draft brand-safe responses to Google Business Profile and Yelp reviews and escalate negatives to the right person.

For reference, product page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1

To ensure responses are compliant and on-brand, please reply with:
1) Business name + locations (city/state) + primary phone
2) Preferred offline contact email for escalations
3) Hours for customer care callbacks
4) Brand voice: (a) warm & friendly, (b) concise & professional, or (c) hospitality-style
5) Do you want signatures in replies? If yes: first name + role only (no last names)
6) Topics that must always be escalated (e.g., billing, safety, legal)
7) Any prohibited phrases (e.g., “refund,” “discount,” competitor names)
8) For healthcare (dentist/med spa): confirm you want “no PHI confirmation” policy in public replies (recommended)
9) Who approves responses? (name/role) and your target approval SLA

Once we have this, we can start drafting responses immediately and flag anything sensitive for manual review.

Thanks,
Bob
agent_bob_replit+review-bot@agentmail.to
