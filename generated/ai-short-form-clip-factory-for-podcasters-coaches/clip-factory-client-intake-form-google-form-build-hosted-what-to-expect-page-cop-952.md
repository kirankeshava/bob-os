# Clip Factory — Client Intake Form (Google Form Build) + Hosted ‘What to Expect’ Page Copy + Onboarding/Review Emails + Internal Gating Rules

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:48:32.776Z

---

Below is a ready-to-implement package to reduce refund risk and missed requirements for Clip Factory.

============================================================
A) CLIENT INTAKE FORM — GOOGLE FORM BUILD (FREE)
Form title: Clip Factory — Clip Preferences + Brand Rules (Required)
Form description:
“Thanks for working with Clip Factory. This intake takes 3–5 minutes and helps us produce clips that match your voice, brand, and platforms. Support: agent_bob_replit+clip-factory@agentmail.to | Legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

SECTION 1 — Contact + Order Basics
1) Email for delivery + review notifications (Short answer, Required)
2) Your name / brand name (Short answer, Required)
3) Links to your channels (Checkboxes + short answers, Required)
   - TikTok URL
   - Instagram URL
   - YouTube Shorts URL
   - Other (text)
4) What are we clipping? (Multiple choice, Required)
   - Podcast episode
   - Coaching call
   - Webinar
   - YouTube video
   - Other
5) Source file link (Short answer, Required)
   Help text: “Google Drive/Dropbox/YouTube link. Ensure access is set to ‘Anyone with the link’.”

SECTION 2 — Clip Direction (Required)
6) Primary goal for these clips (Multiple choice)
   - Leads / bookings
   - Followers / awareness
   - Course / offer sales
   - Podcast listeners
   - Other
7) Target audience (Paragraph)
8) Desired clip vibe (Checkboxes)
   - High energy
   - Calm / authoritative
   - Comedy / edgy
   - Inspirational
   - Educational
   - Other
9) Call-to-action preference (Multiple choice)
   - “Follow for more”
   - “Comment ‘X’ and I’ll send it”
   - “Link in bio”
   - “Book a call”
   - “No CTA”

SECTION 3 — Caption Style + Brand Terms (Required)
10) Caption style (Multiple choice, Required)
   - Clean (minimal emojis)
   - Creator style (bold emphasis, emojis)
   - Corporate (no emojis)
   - Match my existing style (we’ll follow your channel)
11) Words/phrases to ALWAYS spell exactly like this (Paragraph)
   Examples: product names, program names, acronyms.
12) Banned words/phrases (Paragraph)
13) Profanity allowed? (Multiple choice)
   - No profanity
   - Mild profanity ok
   - Anything ok
14) Sensitive topics to avoid (Paragraph)

SECTION 4 — Visuals + Formatting (Required)
15) Platform(s) to optimize for (Checkboxes, Required)
   - TikTok
   - Instagram Reels
   - YouTube Shorts
16) Framing preference (Multiple choice)
   - Face-centered, tight
   - Wider with hands/gestures
   - Mix of both
17) Show subtitles where? (Multiple choice)
   - Lower third
   - Middle
   - Dynamic (varies)
18) Brand kit (File upload OR short answer link)
   - Optional: logo, brand colors, font preferences.

SECTION 5 — Hook + Content Guardrails
19) Hook aggressiveness (Multiple choice)
   - Conservative (accurate, no “clickbait”)
   - Balanced
   - Aggressive (strong curiosity hooks)
20) Must-include topics or moments (Paragraph)
   Help text: “Add timestamps if you have them.”
21) Must-avoid topics or moments (Paragraph)
22) Examples you LOVE (Short answer links)
23) Examples you HATE (Short answer links)

SECTION 6 — Approval + Timing
24) Who approves revisions? (Short answer)
25) Timezone + best contact method (Short answer)
26) Acknowledgement (Checkbox required)
   - “I confirm the above brand rules are accurate. I understand there is a 24-hour revision window after the review link is sent.”

Internal note: Make Q1, Q2, Q3, Q5, Q10, Q15, and Q26 Required at minimum.

============================================================
B) HOSTED “WHAT TO EXPECT + REVIEW INSTRUCTIONS” WEBPAGE COPY (PASTE INTO REPLIT PAGE)
Page Title: Clip Factory — What to Expect (Review + Delivery)

Intro:
“Welcome to Clip Factory. We turn long-form content into ready-to-post vertical clips with hooks, captions, and platform formatting. If you need help, email agent_bob_replit+clip-factory@agentmail.to. Business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3.”

1) Before we start
- Please complete the Intake Form (required unless you explicitly waive it in writing).
- Make sure your source video link has viewing permission enabled.

2) What you’ll receive
Your Delivery Pack includes:
- Final vertical MP4 clips (ready to post)
- Caption file(s) in SRT format
- B-roll cue sheet (where optional cutaways can be inserted)
- Posting suggestions per clip (first line caption + hashtag suggestions)

3) Review process (timestamp comments)
We will send a review link using one of the following (free options):
- Frame.io review link
- Vimeo review link
- Unlisted YouTube link

How to leave feedback:
- Use timestamped comments (e.g., “00:12 change ‘your’ to ‘you’re’”) to speed revisions.
- Consolidate feedback in a single pass where possible.

4) Revision window
- You have 24 hours after the review link is delivered to request included revisions.
- After 24 hours, additional changes may be treated as new work depending on scope.

5) What counts as included (free) revisions
- Caption spelling/punctuation fixes
- Minor timing fixes (subtitle sync)
- Small trims (1–3 seconds) to remove “ums” or tighten pacing
- Reframing fixes if faces or key visuals are cropped incorrectly
- Audio leveling tweaks if something is noticeably too loud/quiet or peaking

6) What counts as paid changes (scope change)
- Changing clip selection direction after approval (new moments/timestamps)
- New hooks or new narrative angle requested after review
- Brand/style changes not provided in the Intake Form
- Major re-edit: restructuring, adding new graphics packages, or creating extra versions per platform

7) Delivery
- Final assets are delivered as a folder link plus (if requested) a zip archive.
- We keep working files for a limited time; please download and back up final exports.

============================================================
C) CUSTOMER EMAIL TEMPLATES (REFERENCE WEBSITE + EMAIL)

EMAIL 1 — INTAKE REQUEST (Send immediately after a client says yes)
Subject: Quick intake (3–5 min) so we can start your clips

Hi {{FirstName}},

To make sure your clips match your brand and platform goals, please complete this 3–5 minute intake before we start:
{{IntakeFormLink}}

Support: agent_bob_replit+clip-factory@agentmail.to
Business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

Once we have the form + your source link access, we’ll begin production and send a review link for timestamp comments.

Thanks,
Bob
Clip Factory

EMAIL 2 — REVIEW LINK (Send when drafts are ready)
Subject: Your clips are ready to review (24-hour revision window)

Hi {{FirstName}},

Your draft clips are ready. Review them here:
{{ReviewLink}}

How to request changes:
- Please leave timestamped comments (example: “00:12 change caption wording”).
- If possible, consolidate feedback into one pass.

Revision window:
- Included revisions are available for 24 hours from this email.

Support: agent_bob_replit+clip-factory@agentmail.to
Business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

Thanks,
Bob
Clip Factory

============================================================
D) INTERNAL GATING RULES (NO-DRAMA, PREVENTS REFUNDS)
1) No intake, no start:
- Do not begin clip selection or editing until the client submits the Intake Form.
- If client refuses, request a written waiver: “Proceed without intake; Clip Factory is not responsible for brand term/caption style mismatches.” Save it in the order folder.

2) Access check before work:
- Verify source link permissions and audio quality within 10 minutes.
- If access is blocked, notify client immediately; pause the clock until access is fixed.

3) QC gate before review link:
- Run the internal QC sign-off (audio peaks, captions sync, no cropped faces, export settings) before sending any review link.

4) Revision boundary enforcement:
- Included revisions only during the 24-hour window unless Clip Factory caused an objective error (e.g., wrong spelling of a provided brand term). Objective errors remain free even after the window.

5) Everything in writing:
- Keep all links (intake, review, delivery) and approvals in email thread for auditability and refund defense.
