# AI Review Reply & Reputation Autopilot — Compliance & Brand-Safety Master Pack v1.3 (Checklist + Escalation Playbook v3 + Approved Templates v3)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T05:45:49.098Z

---

# AI Review Reply & Reputation Autopilot — Compliance & Brand-Safety Master Pack v1.3

Business website (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1  
Business contact email: agent_bob_replit+review-bot@agentmail.to

## 1) Brand-Safety & Policy Master Checklist (Build/QA Gate)

### A. Universal “Must Include” (every response)
- **Polite, calm, non-argumentative** tone; no sarcasm; no shaming.
- **Offline CTA**: invite contact via phone/email/DM; for this MVP: “Please contact us at agent_bob_replit+review-bot@agentmail.to so we can help.”
- **No sensitive specifics**: never include appointment time, treatment details, pricing specifics unless explicitly provided by business user and verified.
- **No admissions of fault**: avoid “we messed up,” “our error,” “we neglected,” “we caused.” Use neutral phrasing: “We’re sorry to hear you had this experience.”

### B. PHI/Privacy (HIPAA-style safety)
Fail if response:
- Confirms the reviewer is/was a patient/customer when review implies medical context (dentist/med spa). 
- References “your chart/records/visit/treatment plan/results/photos.”
Required safe patterns:
- “For privacy reasons, we can’t discuss details here.”
- “Please reach out so we can address this directly.”
Hard-block phrases (trigger manual-only hold or forced generic):
- “chart”, “records”, “visit”, “appointment notes”, “treatment plan”, “before/after”, “we reviewed your file”, “our notes show”.

### C. Medical/Outcome Claims (Dentist/Med Spa)
Fail if response:
- Guarantees outcomes: “permanent”, “guaranteed”, “100%”, “no risk”, “best results.”
- Makes diagnosis/treatment claims about the reviewer.
Safe patterns:
- Thank-you + general commitment to care; no clinical statements.

### D. Incentives / Solicitation / Review Gating (Google & Yelp)
Fail if response:
- Offers discounts, refunds, gifts *in exchange for* reviews or review changes.
- Asks reviewer to “update/edit/remove” their review.
Safe patterns:
- “We appreciate your feedback.”
- “We’d like to learn more and make things right offline.”
Never say:
- “If you change this to 5 stars…” “We’ll give you a discount…” “Contact us for a coupon.”

### E. Competitor Disparagement / Defamation
Fail if response:
- Insults competitor or reviewer; alleges fraud; threatens.
Safe patterns:
- “We can’t verify details here; please contact us to discuss.”

### F. Legal Threats / Safety Incidents
If review contains: “attorney/lawsuit/sue/legal action/report to board” or credible safety harm (“injury”, “fire”, “gas leak”, “infection”), system must:
- Set **response_mode = manual_only_hold**
- Set **escalation_level = Legal** or **Safety**
- **Do not post** any public reply until human approval.

### G. Hallucination Control
Fail if response:
- Invents facts: names, dates, specific services, internal actions not logged.
- Claims investigation steps not actually performed.
Allowed only:
- Generic commitments and invitation to contact.

### H. Audit Trail Requirements (must be logged)
For each review action:
- review_source (Google/Yelp), review_id, business/location_id
- review_text_hash
- detected_risk_flags (array)
- escalation_level + hold_reason (if any)
- response_mode (auto_draft / manual_only_hold)
- draft_version + model/prompt version
- human_approver_id, approval_timestamp
- post_status: posted | blocked_manual_review | failed
- posted_timestamp (if posted)
- final_response_text


## 2) Escalation Playbook v3 (Common Negative Scenarios)

### Severity levels
- **L0**: Standard (auto-draft allowed)
- **L1**: Mild negative (auto-draft allowed; offline CTA required)
- **L2**: Strong negative / refund demand / staff named (auto-draft allowed but add caution; recommend manual approval)
- **L3**: **Manual-only hold** (legal threats, PHI, safety incidents, discrimination/harassment allegations)

### Routing SLAs
- L0/L1: Ops team within 24h
- L2: Owner/GM within 8 business hours
- L3 Legal: Same day
- L3 Safety: Owner/GM <4h

### Do-Not-Post Conditions (automatic block)
- Legal threat language present
- PHI/medical record discussion risk (“chart/records/visit/treatment plan”)
- Safety incident under active investigation
- Reviewer doxxing request or personal data exposure

### Scenario guidance + public-response pattern
1) **Billing dispute / overcharge** (L2)
- Do: acknowledge concern; request offline contact; no pricing breakdown publicly.
- Don’t: admit error; reveal itemized bill.
Public response:
> “Thanks for letting us know. We’re sorry to hear this was frustrating. We’d like to look into what happened and help resolve it—please contact us at agent_bob_replit+review-bot@agentmail.to so we can assist directly.”

2) **Service quality complaint** (L1/L2)
- Do: apologize for experience (not fault), invite offline.
- Don’t: blame customer.
Public response:
> “We’re sorry to hear your experience didn’t meet expectations. We’d appreciate the chance to learn more and make this right—please reach out to agent_bob_replit+review-bot@agentmail.to.”

3) **Alleged damage/injury** (L3 Safety or L3 Legal depending on wording)
- Mandatory hold if injury, hazard, or threat.
Public hold guidance (if allowed to post after review):
> “We’re sorry to hear about your concern. For privacy and safety reasons we can’t discuss details here. Please contact us at agent_bob_replit+review-bot@agentmail.to so we can address this promptly.”

4) **Discrimination/harassment allegations** (L3)
- Hold; internal HR review.
- Never argue publicly.

5) **Suspected fake review / wrong business** (L2)
- Do: polite; state inability to locate details without accusing.
- Don’t: call them a liar.
Public response:
> “Thanks for your feedback. We’re unable to match this experience based on the information here, but we’d like to understand more. Please contact us at agent_bob_replit+review-bot@agentmail.to so we can look into it.”

6) **HIPAA/PHI mention by reviewer** (L3)
- Hold if risk of confirmation.
Public response (only after approval):
> “For privacy reasons, we can’t discuss any details here. Please contact us at agent_bob_replit+review-bot@agentmail.to so we can help directly.”


## 3) Approved Response Templates v3 (Ready to Paste)
Rules for all templates:
- Allowed variables: {business_name}, {generic_service} (non-medical phrasing), {support_email}=agent_bob_replit+review-bot@agentmail.to
- Never include: patient/customer confirmation in medical contexts, staff last names, appointment details, prices, outcomes.

### A) Dentist (Google/Yelp)
DENT-POS-01 (Positive)
> “Thank you for the kind words! We appreciate you taking the time to share your experience with {business_name}. If you ever need anything, please reach us at agent_bob_replit+review-bot@agentmail.to.”

DENT-NEU-02 (Neutral/short)
> “Thanks for your feedback. We’re always working to improve. If you’d like to share more details, please contact us at agent_bob_replit+review-bot@agentmail.to.”

DENT-NEG-03 (Mild negative)
> “We’re sorry to hear your experience didn’t meet expectations. We’d like to learn more and help—please contact us at agent_bob_replit+review-bot@agentmail.to.”

DENT-NEG-STR-04 (Strong negative, no PHI)
> “Thank you for bringing this to our attention. We take concerns seriously, and we’d like the chance to address this directly. Please reach out to agent_bob_replit+review-bot@agentmail.to.”

DENT-FAKE-05 (Suspected fake/wrong office)
> “Thanks for your review. We’re unable to locate details matching this experience from what’s posted here, but we’d like to understand more. Please contact us at agent_bob_replit+review-bot@agentmail.to.”

DENT-HOLD-LEGALPHI-06 (Manual-only hold recommended)
> “For privacy reasons, we can’t discuss details here. Please contact us at agent_bob_replit+review-bot@agentmail.to so we can assist directly.”

### B) Med Spa (Google/Yelp)
MSPA-POST-01 (Positive)
> “Thank you for the great feedback! We appreciate you sharing your experience with {business_name}. If you have any questions, contact us at agent_bob_replit+review-bot@agentmail.to.”

MSPA-NEU-02 (Neutral)
> “Thanks for your feedback. We’re always listening and working to improve. Please contact agent_bob_replit+review-bot@agentmail.to if you’d like to share more.”

MSPA-NEG-03 (Mild negative)
> “We’re sorry to hear this didn’t meet your expectations. We’d like to understand what happened and help—please reach out to agent_bob_replit+review-bot@agentmail.to.”

MSPA-NEG-STR-04 (Strong negative)
> “Thank you for letting us know. We take concerns seriously and would like the opportunity to address this directly. Please contact us at agent_bob_replit+review-bot@agentmail.to.”

MSPA-FAKE-05 (Suspected fake)
> “Thanks for your review. We’re unable to confirm details based on this post, but we’d like to learn more. Please contact agent_bob_replit+review-bot@agentmail.to.”

MSPA-HOLD-OUTCOME-06 (Avoid outcome claims; manual review if baited)
> “We’re sorry to hear you’re disappointed. For privacy reasons we can’t discuss details here. Please contact us at agent_bob_replit+review-bot@agentmail.to so we can help.”

### C) HVAC (Google/Yelp)
HVAC-POS-01 (Positive)
> “Thanks for the review! We’re glad you had a good experience with {business_name}. If we can help again, contact us anytime at agent_bob_replit+review-bot@agentmail.to.”

HVAC-NEU-02 (Neutral)
> “Thank you for your feedback. We’re always working to improve. Please contact us at agent_bob_replit+review-bot@agentmail.to if you’d like to share more details.”

HVAC-NEG-03 (Mild negative)
> “We’re sorry to hear this was frustrating. We’d like to learn more and help resolve it—please reach out to agent_bob_replit+review-bot@agentmail.to.”

HVAC-NEG-STR-04 (Strong negative / missed appointment)
> “Thanks for bringing this to our attention. We understand how important timely service is, and we’d like to look into what happened. Please contact us at agent_bob_replit+review-bot@agentmail.to.”

HVAC-FAKE-05 (Suspected fake)
> “Thanks for your feedback. We’re unable to match this to our records based on the information here, but we’d like to understand more. Please contact us at agent_bob_replit+review-bot@agentmail.to.”

HVAC-SAFETY-HOLD-06 (Gas leak/fire/electrical hazard; manual-only hold)
> “We’re sorry to hear about your concern. For safety reasons, we’d like to address this directly as soon as possible—please contact us at agent_bob_replit+review-bot@agentmail.to.”


## 4) Platform Notes (Google Business Profile vs Yelp)
- Do not promise removal of reviews on either platform.
- Do not mention “Yelp will remove this” or “Google will take this down.”
- Do not ask for review edits/removals.
- Do not offer incentives/discounts tied to reviews.
- Keep responses short, factual, and privacy-preserving.


## 5) Definition of Done (Compliance Release)
A release is “compliance-ready” when:
1) Detectors trigger correctly (PHI/records + legal threats => manual-only hold).
2) Posting gates enforce blocked_manual_review across API + UI.
3) Audit logs contain required fields/events and reconcile with weekly KPIs.
4) Templates v3 are the only selectable defaults per vertical unless manual edit + approval.

End of Master Pack v1.3
