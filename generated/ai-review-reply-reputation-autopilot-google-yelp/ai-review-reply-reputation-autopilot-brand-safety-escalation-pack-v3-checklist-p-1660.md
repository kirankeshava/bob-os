# AI Review Reply & Reputation Autopilot — Brand Safety & Escalation Pack v3 (Checklist + Playbook + Approved Templates)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:24:07.275Z

---

# AI Review Reply & Reputation Autopilot — Brand Safety & Escalation Pack v3

Website (legitimacy link to share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Support email (for offline resolution CTA): agent_bob_replit+review-bot@agentmail.to

## 1) Brand-Safety Checklist v3 (Tick-box)
Use this checklist for **every** draft before it can be approved/posted. If any item fails, enforce **manual-only hold** or revise.

### A. Universal “Must Include”
- [ ] Thanks/acknowledgment appropriate to sentiment (warm but not over-familiar).
- [ ] **Offline CTA** to resolve: invite to email **agent_bob_replit+review-bot@agentmail.to**.
- [ ] Neutral, non-inflammatory tone; no sarcasm, no blame, no public debate.
- [ ] No promises of outcomes; no guarantees; no “we will” beyond “we’d like to learn more / make it right.”

### B. Universal “Must NOT” (Hard blocks)
- [ ] **No admission of liability**: avoid “our fault,” “we caused,” “we were negligent,” “we messed up,” “we violated,” “we made a mistake that…”
  - Safe alternative: “We’re sorry to hear about your experience and would like to learn more.”
- [ ] **No PHI/medical privacy confirmation** (Dentist/Med Spa especially): do not confirm they were a patient/client, attended an appointment, procedure details, records, or outcomes.
  - Hard-block phrases (examples): “your records/chart,” “your visit,” “your appointment,” “we reviewed your file,” “according to your treatment plan,” “as your provider.”
  - Safe alternative: “To protect privacy, we can’t discuss details here. Please email us so we can look into it.”
- [ ] **No incentives or solicitation**: do not offer discounts, refunds in exchange for review changes, gifts, giveaways, “we’ll comp you if you update,” etc.
- [ ] **No review gating**: do not ask only happy customers to leave reviews.
- [ ] **No doxxing**: no staff last names, no customer names, no phone/email/address unless it’s the business’s official contact.
- [ ] **No competitor disparagement**: do not accuse or insult competitors; do not imply reviewer is a competitor.
- [ ] **No platform enforcement claims**: do not claim “we’ll have Yelp/Google remove this” or “reported to Yelp/Google and it will be taken down.”
- [ ] **No threats/retaliation**: no “defamation,” “we’ll sue,” “you’ll hear from our lawyer,” etc.

### C. Google Business Profile vs Yelp — Compliance Notes
**Applies to both:** no incentives, no fake review manipulation, no harassment, keep it professional.
- **GBP**: Keep responses helpful and concise; avoid sharing personal data; do not discuss medical specifics.
- **Yelp** (extra caution): Do not mention internal moderation, do not argue about Yelp policy, do not imply review removal is imminent, avoid escalating public back-and-forth.

### D. Risk Flags → Mandatory Escalation
If any of the below is detected, the system must set escalation and/or manual-only hold:
- [ ] Legal threat terms: “sue,” “lawsuit,” “attorney/lawyer,” “legal action,” “court,” “settlement.” → **Manual-only hold + Escalation=Legal**
- [ ] Safety incident/injury/alleged harm: “injured,” “hurt,” “unsafe,” “infection,” “fire,” “gas leak,” “electrical hazard.” → **Escalation=Safety (Owner/GM <4h)**
- [ ] Discrimination/harassment: slurs, protected class allegations → **Manual-only hold + Escalation=Owner/HR**
- [ ] PHI/medical details present (even if reviewer reveals) → **Manual-only hold + Escalation=Privacy/Compliance**

---

## 2) Escalation Playbook v3 (Common Negative Scenarios)

### Escalation Levels
- **L0 (Normal)**: postable as-is after standard checklist.
- **L1 (Service Recovery)**: negative experience; postable with careful wording + offline CTA; notify ops.
- **L2 (Sensitive)**: billing dispute, alleged staff misconduct, potential privacy issues; require manager approval.
- **L3 (Safety/Legal/Privacy)**: safety incident, legal threat, PHI/HIPAA risk, harassment/discrimination; **manual-only hold**; do not post until reviewed.

### Routing SLAs
- **L3 Safety**: Owner/GM within **4 hours** (same-day).
- **L3 Legal**: Legal/Owner **same-day**; do not post.
- **L3 Privacy/PHI**: Compliance/Owner **same-day**; do not post.
- **L2 Billing**: Billing lead within **24 hours**.
- **L1 Service Recovery**: Ops manager within **24 hours**.

### Evidence to Collect (internal, not in public reply)
- Review screenshot + URL + timestamp
- Work order/appointment lookup (if applicable)
- Staff schedule / technician dispatch logs
- Any customer communications (email/SMS) from official systems
- Photos (HVAC damage claims), before/after service notes

### “DO NOT POST” Conditions (force manual-only hold)
- Reviewer mentions **attorney/lawsuit** or threatens legal action
- Review contains or requests **private medical details** or claims about specific treatment outcome
- Active safety investigation or injury claim
- Hate speech, harassment, or credible threats

### Scenario Guidance (public response posture)
1) **Billing dispute (L2)**
- Public: acknowledge, invite offline resolution, do not debate line items.
- Avoid: quoting prices, contracts, “you agreed,” “you’re wrong.”

2) **Service quality complaint (L1/L2)**
- Public: apologize for experience (not fault), ask to contact support email, commit to review.
- Avoid: blaming customer, detailed operational excuses.

3) **Alleged damage caused (HVAC) (L2/L3 depending on severity)**
- Public: “We take concerns seriously; please email us so we can investigate.”
- Avoid: admitting damage, discussing insurance, accusing reviewer of lying.

4) **Medical outcome dissatisfaction (Dentist/Med Spa) (L3 if any specifics)**
- Public: privacy-protective generic response only.
- Avoid: confirming patient relationship, discussing procedure details.

5) **Suspected fake review (L1/L2)**
- Public: polite, cannot locate details, invite offline contact; do not accuse.
- Yelp/GBP: never claim platform will remove.

6) **Legal threats (L3)**
- Public: do not post; internal handling only.

---

## 3) Approved Response Templates v3 (Versioned, per Vertical)

### Global Template Rules (all verticals)
**Allowed variables (if verified and safe):** {BUSINESS_NAME}, {CITY}, {SUPPORT_EMAIL}=agent_bob_replit+review-bot@agentmail.to
**Disallowed variables:** reviewer name, staff last names, appointment dates, treatment/service specifics, prices unless reviewer already stated and business has verified it is safe.
**Required element:** offline CTA with support email.


# A) Dentist Templates (GBP/Yelp safe)

**DENT-01 (Positive / 4–5 stars)**
"Thank you for taking the time to share your feedback. We’re glad you had a positive experience with {BUSINESS_NAME}. If there’s ever anything we can do to help, please reach out at {SUPPORT_EMAIL}."

**DENT-02 (Neutral / short comment)**
"Thanks for your feedback. We’re always working to improve the experience at {BUSINESS_NAME}. If you’re open to sharing more details, please email us at {SUPPORT_EMAIL}."

**DENT-03 (Mild negative / wait time, front desk, general)**
"We’re sorry to hear your experience didn’t meet expectations. We take feedback seriously and would like to learn more so we can improve. Please email us at {SUPPORT_EMAIL}."

**DENT-04 (Strong negative, potential PHI risk) — privacy-safe generic**
"We’re sorry to hear this. To protect privacy, we can’t address specifics in a public forum. If you’re willing, please contact us at {SUPPORT_EMAIL} so we can look into your concerns and try to help."

**DENT-05 (Suspected fake / cannot identify reviewer)**
"Thank you for posting. We can’t confirm details publicly, and we’re not able to match this experience from the information here. Please contact us at {SUPPORT_EMAIL} so we can understand what happened and assist."

**DENT-06 (Service recovery / make-it-right without liability)**
"We appreciate you bringing this to our attention. We aim to provide a respectful, high-quality experience, and we’d like the chance to learn more and address your concerns. Please reach us at {SUPPORT_EMAIL}."


# B) Med Spa Templates (GBP/Yelp safe)

**SPA-01 (Positive)**
"Thank you for your kind feedback. We’re happy you enjoyed your experience with {BUSINESS_NAME}. If you ever need anything, contact us at {SUPPORT_EMAIL}."

**SPA-02 (Neutral)**
"Thanks for sharing your feedback. If you’re willing to share more context, please email us at {SUPPORT_EMAIL}."

**SPA-03 (Mild negative: scheduling, service expectation)**
"We’re sorry to hear this wasn’t the experience you hoped for. We’d like to learn more and see how we can help—please email us at {SUPPORT_EMAIL}."

**SPA-04 (Outcome dissatisfaction / do not discuss treatment)**
"We’re sorry to hear you’re disappointed. For privacy reasons, we can’t discuss details here. Please contact us at {SUPPORT_EMAIL} so we can review your concerns and follow up appropriately."

**SPA-05 (Suspected fake / competitor bait)**
"Thank you for your comment. We take feedback seriously, but we can’t address specifics publicly. Please email us at {SUPPORT_EMAIL} so we can understand the situation and assist."

**SPA-06 (Refund demand / billing dispute)**
"We’re sorry to hear about the billing concern. We’d like to look into this and respond directly. Please contact us at {SUPPORT_EMAIL} with any relevant details so we can help."


# C) HVAC Templates (GBP/Yelp safe)

**HVAC-01 (Positive)**
"Thank you for your review. We appreciate you choosing {BUSINESS_NAME} and we’re glad you had a good experience. If we can help again, contact us at {SUPPORT_EMAIL}."

**HVAC-02 (Neutral / short)**
"Thanks for the feedback. If there’s anything we should know to improve, please email us at {SUPPORT_EMAIL}."

**HVAC-03 (Mild negative: late arrival, communication)**
"We’re sorry for the frustration and appreciate you letting us know. We’d like to understand what happened and improve. Please contact us at {SUPPORT_EMAIL}."

**HVAC-04 (Strong negative: poor service, repeated issues)**
"We’re sorry to hear this. We take concerns like this seriously and would like the opportunity to look into the details and follow up. Please email us at {SUPPORT_EMAIL}."

**HVAC-05 (Alleged damage claim — no admission)**
"We’re sorry to hear about this concern. We’d like to investigate and understand what happened. Please contact us at {SUPPORT_EMAIL} so we can review the details and follow up directly."

**HVAC-06 (Suspected fake review)**
"Thank you for posting. We’re not able to verify details from the information here, but we’d like to learn more. Please email us at {SUPPORT_EMAIL} so we can assist."

---

## 4) Quick Policy Reminders (to keep in UI as tooltips)
- Never offer incentives for reviews or for changing reviews.
- Never confirm someone is a patient/client; never discuss medical/treatment details.
- Never admit fault or liability in public replies.
- Never threaten, argue, or claim platform removal.
- When in doubt: generic apology + privacy note (if needed) + take offline to {SUPPORT_EMAIL}; or hold for manual review.
