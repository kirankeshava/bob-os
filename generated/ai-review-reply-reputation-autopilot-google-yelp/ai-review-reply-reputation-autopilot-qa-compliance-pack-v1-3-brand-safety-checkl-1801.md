# AI Review Reply & Reputation Autopilot — QA/Compliance Pack v1.3 (Brand-Safety Checklist v3 + Escalation Playbook v3 + Approved Templates v3 + Policy Notes)

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:13:12.292Z

---

## 1) Scope & Final QA Status (for sign-off)
Product: **AI Review Reply & Reputation Autopilot (Google Business Profile + Yelp)**
Proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
Support/Contact: agent_bob_replit+review-bot@agentmail.to

### Test suites executed
- Core suite: **45 reviews** across 3 verticals (Dentist, Med Spa, HVAC) with high-risk edge cases.
- Yelp addendum: **6 Yelp-specific edge cases** (removal accusations, competitor comparisons, solicitation/incentive bait, “report to Yelp” threats, discount demands, bait to argue publicly).

### Final results
- Core regression: **45/45 pass (100%)**
- Yelp addendum: **6/6 pass (100%)**
- Key enforced guardrails:
  1) **PHI/medical-record confirmation hard block** (e.g., “we reviewed your chart/records/visit”) → force generic wording and no confirmation of patient relationship.
  2) **Legal-threat detector** (“attorney/lawsuit/sue/legal action”) → **manual-only hold** and escalation_level=Legal; post_status must be **blocked_manual_review**.

### Non-negotiable acceptance criteria (must hold in prod)
- No admission of liability/fault; no “we caused/our mistake” language.
- No PHI confirmation (no acknowledging the reviewer is a patient/client; no appointment/visit details; no “your procedure”).
- No medical outcome guarantees or claims.
- No incentives/discounts in exchange for reviews; no review gating.
- No doxxing or sharing private info; no staff last names; no addresses/phone numbers of individuals.
- No threats/retaliation; no arguing; no harassment.
- Always include a **take-offline CTA** (contact method) for negatives.
- For legal threats, safety incidents, discrimination claims, or PHI: **DO NOT POST** (hold for manual review).

---

## 2) Brand-Safety Checklist v3 (Operational Tick-Box)
Use this checklist for any generated draft BEFORE approval/posting.

### A. Universal “Never do this” (Google + Yelp)
- [ ] Do **not** admit liability/fault (avoid: “we messed up,” “we were negligent,” “our technician damaged…”).
- [ ] Do **not** confirm identity or relationship in sensitive verticals (health/med): avoid “as your dentist,” “during your visit,” “your treatment.”
- [ ] Do **not** include PHI or medical-record references (avoid: “chart,” “records,” “x-rays,” “diagnosis,” “treatment plan,” “procedure details”).
- [ ] Do **not** guarantee outcomes or provide medical advice.
- [ ] Do **not** offer incentives/discounts/refunds in exchange for review edits/removal.
- [ ] Do **not** ask for only positive reviews or screen reviewers (review gating).
- [ ] Do **not** disclose personal data about reviewer or staff (full names, phone, address, email, appointment time).
- [ ] Do **not** threaten, harass, or accuse the reviewer of crimes/scams.
- [ ] Do **not** disparage competitors or compare directly (“unlike XYZ clinic”).
- [ ] Do **not** claim the platform (Google/Yelp) will remove a review.

### B. Required elements for safe, brand-appropriate replies
- [ ] Polite greeting + thanks (even if negative).
- [ ] Acknowledge feelings without confirming facts (e.g., “We’re sorry to hear you felt…”).
- [ ] No inflammatory or argumentative tone.
- [ ] Clear **offline resolution CTA** (call/email) and invite to discuss.
- [ ] If service recovery: offer to investigate internally without implying guilt.

### C. “Auto-hold / Manual-only” triggers (DO NOT POST)
If any are present, the system must set **post_status=blocked_manual_review** and route escalation.
- [ ] Legal threats: “sue,” “lawsuit,” “attorney,” “legal action,” “court.”
- [ ] Safety incident or injury: “hurt,” “injured,” “fire,” “gas leak,” “unsafe,” “assault.”
- [ ] PHI / HIPAA: medical details, records, or reviewer identity confirmation risk.
- [ ] Discrimination/harassment allegations.
- [ ] Extortion or blackmail (“refund or I’ll…”).

### D. Platform-specific notes
**Google Business Profile**
- [ ] No incentives; no manipulation.
- [ ] Keep professional, relevant, and non-personal.

**Yelp**
- [ ] Do not mention Yelp enforcement, removal promises, or pressure to change the review.
- [ ] Avoid anything that looks like soliciting/review gating.

---

## 3) Escalation Playbook v3 (Common Negative Scenarios)

### Escalation levels
- **L0**: Normal (safe to draft + post after quick check)
- **L1**: Needs manager review (billing/service quality)
- **L2**: High risk (safety, discrimination, extortion) → hold + fast routing
- **L3 Legal**: Any legal threat → **manual-only hold** (no posting) + legal same-day

### Routing SLAs (recommended)
- Safety incidents / injury: Owner/GM within **4 hours**
- Discrimination/harassment allegations: Owner/HR within **4 hours**
- Billing disputes/refunds: Billing lead within **24 hours**
- Service quality / missed appointment / rudeness: Ops manager within **24 hours**
- Legal threats: Legal/owner **same day**

### Evidence collection checklist (before responding offline)
- Review URL + screenshot
- Internal job/appointment reference (internal only; not for public response)
- Staff statements + timestamped notes
- Any photos, invoices, call logs
- Prior communications with reviewer

### Scenario guidance + response rules
1) **Billing dispute / “overcharged”** (L1)
- Public reply: empathetic, no admission, invite offline, request invoice/reference via email/phone.
- Never: discuss exact amounts publicly unless the business has verified and chooses to, and even then keep minimal.

2) **Service quality complaint** (L1)
- Public reply: apologize for experience (not fault), commit to investigate, offline CTA.
- Never: blame reviewer; debate facts.

3) **Safety issue (HVAC: gas leak, electrical hazard)** (L2)
- **Hold if active safety risk is alleged**; route immediately.
- Public reply if allowed: focus on safety-first, request immediate direct contact; no technical diagnosis.

4) **Discrimination/harassment allegation** (L2)
- Default: hold for manual review.
- If responding: neutral, take seriously, offline contact with owner/manager; do not argue.

5) **HIPAA/PHI mention (Dentist/Med Spa)** (L2)
- Default: hold if any chance of confirming they were a patient.
- If responding: generic language that does not confirm relationship (“We can’t discuss details here…”), offline CTA.

6) **Legal threat (“my attorney will contact you”)** (L3 Legal)
- Always: **manual-only hold**; do not post.
- Internal: preserve records; route to legal/owner.

7) **Suspected fake review / competitor** (L1)
- Public reply: calm, state you can’t locate the experience, invite offline to verify details.
- Never: accuse competitor, threaten, or mention takedown.

### “DO NOT POST” conditions (hard stop)
- Any legal threat, PHI confirmation risk, active safety incident allegation, harassment/discrimination allegation, extortion/blackmail.

---

## 4) Approved Response Templates v3 (Per Vertical)
**Template rules (apply to all):**
- Allowed variables: {BusinessName}, {SupportEmail}, {SupportPhone}, {ManagerNameFirst}, {City}
- Banned variables: reviewer name if it reveals identity; staff last names; appointment dates/times; procedures; invoices; any medical details.
- Required for negative: offline CTA using {SupportEmail} and/or {SupportPhone}.

### A) Dentist Templates
**DENT-01 Positive (L0)**
“Thanks for taking the time to share this. We’re glad you had a great experience at {BusinessName}. If you ever need anything, please reach us at {SupportPhone}.”

**DENT-02 Neutral/short (L0)**
“Thank you for your feedback. We appreciate you choosing {BusinessName}.”

**DENT-03 Mild negative (L1)**
“Thank you for the feedback. We’re sorry to hear you felt disappointed. We’d like to learn more and see how we can help—please contact us at {SupportPhone} or {SupportEmail}.”

**DENT-04 Strong negative (L2 hold if PHI risk)**
“We’re sorry to hear about your concerns. We can’t discuss details in a public forum, but we’d like to connect and address this directly. Please contact {ManagerNameFirst} at {SupportEmail}.”

**DENT-05 Suspected fake/unrecognized (L1)**
“Thanks for writing. We’re not able to locate a matching experience based on what’s shared here. If you’re open to it, please contact us at {SupportEmail} so we can understand and look into it.”

**DENT-06 Billing/insurance confusion (L1)**
“Thank you for the feedback. Billing questions can be frustrating, and we’d like to review this with you directly. Please reach out at {SupportPhone} or {SupportEmail} so our team can help.”

### B) Med Spa Templates
**MEDSPA-01 Positive (L0)**
“Thank you for the kind words. We’re happy you enjoyed your experience at {BusinessName}. We look forward to seeing you again.”

**MEDSPA-02 Neutral (L0)**
“Thanks for sharing your feedback. We appreciate it and will use it to keep improving.”

**MEDSPA-03 Mild negative (L1)**
“We’re sorry to hear you weren’t fully satisfied. We’d like to learn more and make things right—please contact us at {SupportEmail}.”

**MEDSPA-04 Strong negative (L2 hold if medical/PHI details)**
“Thank you for raising this. We take concerns seriously, but we can’t discuss specifics publicly. Please email {SupportEmail} and we’ll follow up directly.”

**MEDSPA-05 Pricing dispute (L1)**
“Thank you for the feedback. We understand pricing questions are important. Please contact us at {SupportEmail} so we can review what happened and help resolve it.”

**MEDSPA-06 Suspected fake/unrecognized (L1)**
“We appreciate you writing. We’re unable to confirm the situation based on the information here. If you’d like, please email {SupportEmail} so we can look into it.”

### C) HVAC Templates
**HVAC-01 Positive (L0)**
“Thanks for the great review. We’re glad our team could help, and we appreciate you choosing {BusinessName}.”

**HVAC-02 Neutral (L0)**
“Thank you for your feedback. We appreciate your time.”

**HVAC-03 Late/No-show complaint (L1)**
“We’re sorry for the inconvenience and appreciate you letting us know. We’d like to understand what happened and help—please contact us at {SupportPhone}.”

**HVAC-04 Service quality issue (L1)**
“Thanks for the feedback. We’re sorry to hear you’re unhappy with the service. Please contact {ManagerNameFirst} at {SupportEmail} so we can review and work toward a resolution.”

**HVAC-05 Alleged damage (L2 hold recommended)**
“Thank you for bringing this to our attention. We take concerns seriously and want to look into this promptly. Please contact us at {SupportEmail} so we can follow up directly.”

**HVAC-06 Suspected fake/unrecognized (L1)**
“Thanks for writing. We’re unable to locate a matching job from this description. Please call {SupportPhone} so we can understand and investigate.”

---

## 5) Customer Proof + Compliance Statement (paste-ready)
“We use a brand-safety and platform-policy aligned workflow to draft review responses for Google Business Profile and Yelp, with escalation for high-risk situations (e.g., legal threats, safety incidents, and sensitive personal/medical details). You can view our product page here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/1
If you have questions or want to start a free 7-day trial, email us at agent_bob_replit+review-bot@agentmail.to.”

---

## 6) Implementation Notes (QA-to-Engineering reminders)
- Enforce blocks at two points: **pre-generation** (avoid unsafe drafts) and **pre-post** (guarantee nothing unsafe is posted).
- For manual-only holds, UI/API must prevent posting and log: hold_reason, blocked_timestamp, detector_version, unblocker_id.
- Weekly report must reconcile counts: drafted vs approved vs posted vs blocked_manual_review; blocked items must not be counted as “responded/posted.”
