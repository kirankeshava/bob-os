# Customer-Facing Brand Safety & Compliance Summary (1-pager) + Hallucination Control Policy v1.0

**Business:** AI Review Reply & Reputation Autopilot (Google/Yelp)
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:32:22.588Z

---

AI Review Reply & Reputation Autopilot — Brand Safety, Compliance, and Hallucination-Control Summary (v1.0)

Product overview
AI Review Reply & Reputation Autopilot drafts brand-safe responses to Google Business Profile and Yelp reviews, routes sensitive reviews for human handling, and reports weekly reputation KPIs. The system is designed to reduce risk by default: it prioritizes de-escalation, privacy, and accuracy over “clever” replies.

Official website & contact
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/1
Support/Compliance contact: agent_bob_replit+review-bot@agentmail.to

Platform policy alignment (Google Business Profile + Yelp)
We explicitly avoid behaviors that violate common platform rules, including:
1) Incentives & solicitation: No offers of discounts, refunds, freebies, gifts, contests, or “we’ll make it right if you change/remove your review.” No review gating.
2) Fake/astroturfing: The system does not generate reviews—only responses.
3) Competitor disparagement: No attacks or comparisons to competitors.
4) Removal promises: No statements implying we can remove reviews or influence Yelp/Google moderation (“we’ll get this taken down”).
5) Sensitive personal data: No doxxing, no staff personal details, and no pressure for the reviewer to reveal identifying info publicly.

Privacy and HIPAA/PHI safety (health-related businesses)
For dentists and med spas (and any health-adjacent business), responses are constrained to avoid confirming any person is a patient/client or referencing any visit details. The assistant will NOT:
- Confirm a relationship (“we saw you last Tuesday,” “your appointment,” “your chart/records”)
- Discuss procedures, outcomes, or diagnoses for an identifiable person
- Ask for PHI in public replies
Instead, it uses privacy-preserving language and moves the conversation offline (phone/email), e.g., “We can’t discuss details here, but we’d like to connect privately to help.”

Brand safety rules (tone + liability)
All drafts must be:
- Non-inflammatory, non-argumentative, and non-retaliatory
- Free of admissions of fault or liability (no “we were negligent,” “we caused,” “our technician broke…”) unless the business explicitly provides approved wording
- Focused on resolution steps and an offline contact channel
- Free of threats, harassment, or shaming language

Escalation and “manual-only hold” controls
Certain reviews trigger automatic escalation and may be blocked from posting until a human approves.
Manual-only hold categories include:
- Legal threats (e.g., “lawsuit,” “attorney,” “sue”)
- Safety incidents or alleged injury
- PHI/medical record references or attempts to force public disclosure
- Discrimination/harassment allegations
- Extortion or bribery attempts
When held, the system should set a status like blocked_manual_review and record hold_reason in the audit trail.

Hallucination control & evidence policy (no new facts)
The assistant is not allowed to invent facts. It must not add:
- Specific dates/times, appointment details, staff names, pricing, policy terms, diagnostic or treatment details, or promises of refunds/discounts
- Claims about investigations performed (“we reviewed camera footage/records”) unless a human explicitly confirms this wording is approved

Allowed variables (only when provided/verified by the business)
- Business name, location name, public phone number, public email, public website URL
- A general support prompt (“Please contact our team at [phone/email] so we can help.”)

Required offline CTA
Every neutral/negative response must include a clear invitation to resolve privately (phone/email), without requesting sensitive details publicly.

Audit trail and accountability
For each review response, the system should retain an audit trail sufficient for internal review and dispute handling, including:
- Platform/source (Google/Yelp), review ID, timestamps
- Original review text hash, detected risk flags, escalation level
- Draft text/version, human approver ID (if applicable)
- Posted/blocked status, error codes, and final posted response

What customers can expect
- Fast, consistent, brand-safe drafts that protect privacy
- Automatic routing of high-risk reviews for human handling
- Weekly KPI reporting aligned to what matters (response rate, response time, rating trend, escalation counts)

For compliance questions, evidence requests, or policy concerns, contact: agent_bob_replit+review-bot@agentmail.to