# AI Review Reply & Reputation Autopilot — Compliance & Brand-Safety Pack v3 (Checklist + Escalation Playbook + Approved Templates + QA Traceability)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:25:50.440Z

---

# Compliance & Brand-Safety Pack v3
Business legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/ops email: agent_bob_replit+review-bot@agentmail.to

## 1) Brand-Safety Checklist v3 (Google Business Profile + Yelp)
Use this checklist **before approving** any response and as acceptance criteria for automated posting.

### A. Non‑negotiable prohibitions (FAIL if violated)
1. **PHI/HIPAA / private customer data**
   - Do not confirm a person is/was a patient/customer where context implies medical treatment.
   - Do not reference: “your chart/records/visit/appointment/treatment plan/X‑ray/results/diagnosis.”
   - Do not restate medical details from the review in a way that sounds verified.
   - Do not include any contact details about staff/customers beyond what’s already public.
2. **Liability admission / fault**
   - Block phrases implying admission: “we were negligent,” “we caused,” “our fault,” “we made a mistake that harmed,” “we broke/damaged your…,” “we injured you.”
   - Allowed: empathy + intent to investigate; never concede facts not verified.
3. **Medical/health outcome guarantees (Dentist/Med Spa)**
   - No: “guaranteed results,” “permanent,” “cure,” “works for everyone,” “no side effects.”
   - Avoid outcomes tied to individuals (“you will…”, “your results will…”).
4. **Incentives / review gating / manipulation (Google + Yelp)**
   - No: discounts, gifts, refunds **in exchange for** reviews.
   - No asking only happy customers to post reviews; no “contact us first before reviewing.”
5. **Harassment, discrimination, retaliation, threats**
   - Never insult reviewer, threaten legal/police, or accuse criminal behavior.
6. **Doxxing / naming individuals**
   - Do not name staff members or customers in a way that escalates conflict.
7. **Competitor disparagement**
   - Do not compare or attack competitors or imply the reviewer is a competitor.

### B. Required response elements (FAIL if missing for negative/neutral)
1. **Professional, calm tone** (no sarcasm, no arguing point-by-point)
2. **Empathy + accountability without admission**
   - Example framing: “We’re sorry to hear this,” “We take concerns seriously,” “We’d like to look into what happened.”
3. **Take it offline**
   - Provide a clear CTA: “Please contact us at [phone/email] so we can help.”
   - Use the ops email if no business phone is provided: agent_bob_replit+review-bot@agentmail.to
4. **Privacy-safe wording**
   - If medical: “For privacy reasons, we can’t discuss details here.”
5. **No promises of removal or platform enforcement**
   - Especially on Yelp: never imply you can remove a review.

### C. Platform-specific constraints
**Google Business Profile (GBP)**
- OK to invite the reviewer to contact you; keep it factual and brief.
- Avoid promotional language that looks like an incentive.

**Yelp** (more sensitive to solicitation/manipulation)
- Do not mention Yelp rules or threaten to report.
- Avoid “please update your review” language; instead: “we’d like to resolve this.”

### D. Hard safety gates (automation rules)
1. **PHI/records gate**: if review includes “chart/records/visit/appointment/results/diagnosis/treatment” → force response mode: **generic privacy-safe** + offline CTA; no confirmation.
2. **Legal-threat gate**: if “attorney/lawyer/lawsuit/sue/legal action” → status **blocked_manual_review**, escalation_level=Legal, DO NOT POST.
3. **Safety incident gate**: if injury/fire/gas leak/electrocution/unsafe premises → status **blocked_manual_review**, escalation_level=Safety, DO NOT POST.

### E. Audit trail requirement (must log)
For every draft/approval/post attempt, log:
- source (Google/Yelp), review_id, business_id/location_id
- review_text_hash
- detected_risk_flags (PHI, LegalThreat, Incentive, Competitor, Doxxing, Hate/Harassment)
- response_mode (auto_draft, auto_post, manual_only_hold)
- escalation_level (None/L1/L2/L3/L4)
- draft_version + prompt/model version
- approver_id + approval_timestamp
- posted_timestamp + post_status + error_code
- final_response_text
- if blocked: hold_reason, blocked_timestamp, unblocker_id


## 2) Escalation Playbook v3 (L0–L4)
Purpose: ensure negative reviews trigger consistent internal routing and safe public responses.

### Severity levels
- **L0: Standard** (positive/neutral)
  - Action: reply with approved template; no escalation.
- **L1: Service issue (mild)** (wait time, communication)
  - Public response: empathy + offline CTA.
  - Routing: Ops Manager within **24h**.
- **L2: Billing/refund dispute**
  - Public: acknowledge concern, no numbers unless verified, take offline.
  - Routing: Billing/Front Desk within **24h**.
  - Evidence: invoice, signed estimate, payment logs.
- **L3: Serious allegation** (damage to property, repeated negligence claims, discrimination claim)
  - Public: privacy-safe, non-admission, offline CTA.
  - Routing: Owner/GM within **4h**.
  - Evidence: job notes, photos, call recordings if lawful, staff statements.
- **L4: DO NOT POST (manual-only hold)**
  - Triggers: PHI confirmation risk, legal threats, threats of violence, safety incidents, ongoing investigation.
  - System: post_status=blocked_manual_review; escalation_level=Legal or Safety.
  - Routing SLAs:
    - Legal threats: Legal same-day
    - Safety incidents: Owner/GM <4h
  - Evidence: preserve review text, timestamps, internal records; do not engage publicly beyond a minimal placeholder only if counsel approves.

### Scenario guidance (common negatives)
1. **“You overcharged me / bait-and-switch” (L2)**
   - Do: “We’d like to review your concerns and make this right.”
   - Don’t: publish itemized charges, accuse reviewer of lying.
2. **“Your staff was rude/discriminatory” (L3)**
   - Do: “We take this seriously and want to investigate.”
   - Don’t: debate details publicly or name staff.
3. **“You harmed me / injury” (L4 Safety)**
   - Do: block; escalate; collect incident report.
   - Don’t: apologize in a way that admits fault.
4. **“I’m contacting my attorney / suing” (L4 Legal)**
   - Do: block; escalate; preserve records.
   - Don’t: argue, threaten countersuit.
5. **“This is a fake review / wrong business” (L1 or L3 depending)**
   - Do: polite, ask to contact privately; optionally note inability to locate record without implying they were/weren’t a customer.
   - Don’t: call them a competitor.


## 3) Approved Response Template Library v3
Rules for all templates:
- Allowed variables: {BusinessName}, {ContactChannel} (phone/email), {SignerRole} (e.g., “Owner” / “Practice Manager”), {GeneralServiceCategory} (broad: “dental care”, “aesthetic services”, “heating and cooling service”).
- BANNED variables: patient name, appointment date/time, clinician name, procedure, diagnosis, pricing unless verified and pre-approved.
- Always keep to 2–5 sentences. Avoid defensiveness.

### A) Dentist (Google/Yelp)
**DENT-POS-01 (Positive)**
“Thank you for the kind words. We’re glad you had a great experience with {BusinessName}. We appreciate you taking the time to share this feedback.”

**DENT-NEU-02 (Neutral/short)**
“Thanks for your feedback. If there’s anything we could have done better, we’d like to hear more—please reach us at {ContactChannel}. We’re always working to improve.”

**DENT-NEG-03 (Mild negative: wait time/communication)**
“We’re sorry to hear your visit didn’t meet expectations. We take feedback seriously and would like to learn more so we can improve. For privacy reasons we can’t discuss details here—please contact us at {ContactChannel}.”

**DENT-NEG-04 (Strong negative: care quality concern without PHI confirmation)**
“Thank you for sharing your concerns. We aim to provide respectful, high-quality care, and we’d like the opportunity to look into what happened. For privacy reasons we can’t address specifics publicly—please contact {BusinessName} at {ContactChannel}.”

**DENT-PHI-05 (PHI risk present in review)**
“Thanks for your message. To protect privacy, we can’t discuss any health-related details in a public forum. We’d like to help—please contact us directly at {ContactChannel} so we can review your concerns.”

**DENT-FAKE-06 (Suspected fake/wrong office)**
“We take reviews seriously and want to make sure we’re addressing the right situation. We’re unable to confirm any details publicly, but we’d like to connect and learn more—please contact us at {ContactChannel}.”

**DENT-DISCR-07 (Discrimination allegation)**
“We’re concerned to hear this and we take these allegations seriously. We’d like to investigate promptly and address your concerns. Please contact {ContactChannel} so our management team can follow up.”

**DENT-LEGAL-08 (Legal threat placeholder—ONLY if counsel allows posting; default is hold)**
“We understand your message. To ensure this is handled appropriately, please contact {ContactChannel} so we can direct it to the right team.”

### B) Med Spa (Google/Yelp)
**SPA-POS-01**
“Thank you for the great review. We’re happy you enjoyed your experience at {BusinessName}. We appreciate your support.”

**SPA-NEU-02**
“Thanks for your feedback. We’re always working to improve, and we’d like to learn more—please reach us at {ContactChannel}.”

**SPA-NEG-03 (Service experience)**
“We’re sorry to hear this wasn’t the experience we aim for. We take your feedback seriously and would like to help. Please contact us at {ContactChannel} so we can follow up—out of respect for privacy, we can’t discuss details here.”

**SPA-NEG-04 (Outcome dissatisfaction without guarantees)**
“Thank you for sharing your concerns. Individual experiences can vary, and we’d like the chance to better understand what happened and discuss options. Please contact {ContactChannel}; we can’t address specifics publicly.”

**SPA-SAFE-05 (No medical claims; set expectations)**
“We appreciate the feedback. Our team focuses on safe, professional care and clear communication. Please contact {ContactChannel} so we can address your concerns directly.”

**SPA-FAKE-06**
“We take this seriously and want to ensure we’re looking at the correct situation. Please contact {ContactChannel} so we can learn more and assist.”

**SPA-HARASS-07 (Harassment language in review)**
“We’re sorry this interaction felt frustrating. We want to address concerns respectfully and privately—please contact {ContactChannel} so we can help.”

**SPA-LEGAL-08 (Counsel-only placeholder; default hold)**
“Please contact {ContactChannel} so we can route this to the appropriate team.”

### C) HVAC (Google/Yelp)
**HVAC-POS-01**
“Thank you for the review. We’re glad our team could help and appreciate you choosing {BusinessName}.”

**HVAC-NEU-02**
“Thanks for the feedback. If there’s anything we could have done better, please contact us at {ContactChannel}—we’d like to learn more.”

**HVAC-NEG-03 (Scheduling/late arrival)**
“We’re sorry about the inconvenience and appreciate you letting us know. We want to understand what happened and improve. Please contact {ContactChannel} so we can follow up.”

**HVAC-NEG-04 (Quality/repair didn’t hold)**
“We’re sorry to hear you’re still having an issue. We’d like to review the situation and help get this resolved—please contact us at {ContactChannel} so we can assist.”

**HVAC-BILL-05 (Pricing dispute)**
“Thanks for raising this. We want pricing and scope to be clear, and we’d like to review your concerns directly. Please contact {ContactChannel} so we can look into it.”

**HVAC-DAMAGE-06 (Alleged property damage—non-admission)**
“We’re concerned to hear this and would like to look into it promptly. Please contact {ContactChannel} so our management team can review what happened and discuss next steps.”

**HVAC-SAFETY-07 (Gas leak/electrical hazard—default hold if active danger)**
“If there is an active safety concern, please prioritize immediate safety and contact the appropriate emergency services/utility provider. We also want to help—please contact {ContactChannel} so we can escalate this internally.”

**HVAC-FAKE-08**
“We take reviews seriously and want to ensure we’re addressing the right situation. Please contact {ContactChannel} so we can learn more and assist.”


## 4) QA Test Report v4 (Executive Summary + Traceability)
### Final results
- Core suite: 45/45 pass (100%) after guardrails: PHI-records hard block + legal-threat manual-only hold.
- Yelp addendum: 6/6 pass; responses do not promise removal, do not mention Yelp enforcement, do not solicit incentives, do not disparage competitors.

### Traceability matrix (risk → control)
- PHI confirmation risk → PHI detector + PHI template (generic privacy-safe) + audit flag PHI + response_mode generic
- Legal threats → LegalThreat detector → post_status blocked_manual_review → escalation_level Legal → log hold_reason + blocked_timestamp
- Incentives/review manipulation → incentive phrase blocklist → template language rules (no discounts/gifts) → audit flag Incentive
- Competitor disparagement → competitor language detector → template restriction (no competitor mention) → audit flag Competitor
- Liability admission → blocked phrase list + tone constraints → audit review_text_hash + final_response_text stored for review

### Launch exit criteria (must be true)
1. Any LegalThreat/Safety/PHI gating event produces **blocked_manual_review** and prevents posting via API and UI.
2. Audit logs contain all required fields and events for 100% of attempts.
3. Weekly KPIs reconcile: approved_count = posted_count + blocked_count + pending_count (per period).

If you need customer-facing comms, reference the legitimacy URL above and use agent_bob_replit+review-bot@agentmail.to as the reply channel when a phone number is not provided.
