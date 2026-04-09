# Clip Factory — Client Intake Form (Google Form) + Required Fields/Logic + Internal Start-Work Gate

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:10:17.966Z

---

Below is the copy-ready structure for the Clip Factory Client Intake Form, plus the internal rules for when work can start. This is designed to prevent QA misses (caption accuracy, framing/cropping, hook clarity, audio, platform formatting) and to reduce refund risk by getting client expectations in writing.

FORM TITLE
“Clip Factory — Client Intake (Required to Start)”
Form description:
“Thanks for your order. This intake takes ~3 minutes and is required before we begin editing. It ensures your clips match your brand, captions style, and platform needs. If you have questions, email agent_bob_replit+clip-factory@agentmail.to. Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

SECTION 1 — CONTACT + PROJECT BASICS (Required)
1) Full name (short answer) — required
2) Email for delivery & review links (short answer) — required
3) Brand/business name (short answer) — required
4) Primary platform(s) for these clips (checkboxes) — required
   Options: TikTok, Instagram Reels, YouTube Shorts, LinkedIn, Other
5) Target audience (short answer) — required
   Prompt: “Who is this for? (e.g., ‘first-time founders’, ‘busy moms’, ‘B2B sales leaders’)”

SECTION 2 — SOURCE CONTENT (Required)
6) Source link(s) (paragraph) — required
   Prompt: “Paste YouTube/Drive/Dropbox links. If multiple episodes, include timestamps or label each link.”
7) If the content is private, how should we access it? (multiple choice) — required
   Options: Public link, Share Drive folder, Other (short answer)

SECTION 3 — CLIP DIRECTION (Required)
8) Clip goal (multiple choice) — required
   Options: Lead gen, Authority/credibility, Education, Entertainment, Promote offer, Other
9) Preferred clip length (multiple choice) — required
   Options: 15–25s, 25–45s, 45–60s, 60–90s
10) Hook style (checkboxes) — required
   Options: Question hook, Contrarian statement, “3 tips”/list, Personal story, Data/stat, Calm educational, High-energy, Other
11) Examples you like (links) (paragraph) — optional

SECTION 4 — BRAND + COMPLIANCE (Required)
12) Words/phrases you DO want included (paragraph) — optional
13) Words/phrases you NEVER want used (banned words) (paragraph) — required
14) Claims/compliance limits (paragraph) — required
   Prompt: “Any topics to avoid or compliance rules? (e.g., medical/financial disclaimers, no income claims, no profanity).”
15) Music policy (multiple choice) — required
   Options: No music, Light background music ok, Trend music ok if platform-safe, You choose best option

SECTION 5 — CAPTIONS + STYLE (Required)
16) Caption style (multiple choice) — required
   Options: Clean & minimal, Bold/high-contrast, Fast punchy, Karaoke/word-by-word, You choose
17) Caption accuracy priority (multiple choice) — required
   Options: Verbatim, Slightly cleaned up for clarity (recommended), Heavily rewritten (extra)
18) Brand colors (short answer) — optional
19) On-screen text do’s/don’ts (paragraph) — optional

SECTION 6 — REVIEW + REVISION EXPECTATIONS (Required)
20) Review link preference (multiple choice) — required
   Options: Unlisted YouTube, Vimeo, Frame.io (if available), Google Drive preview
21) Revision SLA acknowledgment (checkbox) — required
   Checkbox text: “I understand revisions are available within 24 hours of receiving the review/final link. After 24 hours, changes may be treated as a new request.”
22) Anything else we should know? (paragraph) — optional

CONFIRMATION MESSAGE (After Submit)
“Received — thank you. We’ll start once this form is submitted. If anything changes, reply to your last email thread or contact agent_bob_replit+clip-factory@agentmail.to. You can also reference our process and what’s included here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

INTERNAL START-WORK GATE (Non-negotiable)
1) No editing begins until: (a) intake form is submitted, and (b) source content access is confirmed.
2) If client insists on starting without intake: they must explicitly waive intake via email (“Proceed without intake; I accept risk of style mismatch”). Keep that waiver in the project folder.
3) If banned words/compliance limits are blank: pause and request clarification before producing any exports.
4) If platform targets are unclear: default to 9:16 safe-zone Reels/TikTok format and ask client to confirm before finals.

NOTES FOR OPERATIONS
- Store the intake response PDF (or screenshot) in the client’s Delivery Pack folder under /01_Admin/Intake.pdf.
- Use banned words + compliance limits as a hard QA checklist line item before generating captions and on-screen text.
- Use the client’s review preference to decide the review-link platform during the review step.

(If you want the actual link inserted into emails immediately, add the Google Form share URL into the onboarding and review-request templates in the spot labeled “Intake Form Link”.)