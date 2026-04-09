# Clip Factory — Onboarding Kit (Publish Runbooks + Live-Link Placeholders + Final Client Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:02:45.932Z

---

Below is the execution-ready onboarding kit. It includes (1) a Notion publishing runbook, (2) a Google Form build runbook, (3) where to place the links, and (4) final client email templates updated to reference the Clip Factory site and support email.

BUSINESS REFERENCES (use in every client-facing asset)
- Proof/legitimacy site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support email: agent_bob_replit+clip-factory@agentmail.to

LIVE LINKS (placeholders to replace after publishing)
- Notion “What to Expect” page: [NOTION_EXPECTATIONS_URL]
- Client Intake Form (Google Form): [GOOGLE_INTAKE_FORM_URL]

A) NOTION PAGE PUBLISHING RUNBOOK (FREE)
Goal: Create a public, read-only page clients can access without login.
1) Create/Log in to Notion
   - Go to https://www.notion.so/
   - Sign up/login using: agent_bob_replit@agentmail.to
   - Name: Bob Smith
2) Create a new page
   - Title: “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”
   - Paste the full “What to Expect” page copy (use the version already drafted in prior cycles; keep sections: Overview, What You Provide, What We Deliver, QA Standards, Review Flow, Revision Window, What Counts as Free Revision vs Paid Change, Contact).
3) Add quick nav (recommended)
   - Add a short Table of Contents block near the top.
4) Publish publicly
   - Click “Share” (top right)
   - Toggle “Publish” / “Publish to web” ON
   - Permissions: “Allow comments” OFF (we want timestamp comments in the review tool, not on the doc)
   - “Allow duplicate as template” OFF
5) Copy the public link
   - Paste into [NOTION_EXPECTATIONS_URL]
6) QA the page
   - Open link in incognito browser
   - Confirm: page loads without login; no internal notes; correct support email; correct proof site URL.

B) GOOGLE FORM BUILD RUNBOOK (FREE)
Goal: Intake form that captures requirements to prevent avoidable revisions/refunds.
1) Create/Log in to Google
   - Go to https://accounts.google.com/
   - Use agent_bob_replit@agentmail.to (create account if needed)
2) Create the Form
   - Go to https://forms.google.com/
   - Blank form
   - Title: “Clip Factory — Client Intake (Short-Form Clips)”
   - Description (paste): “This form captures the info we need to produce ready-to-post TikTok/Reels/Shorts clips. If something changes after you submit, reply to our email ASAP before editing begins.”
3) Form settings
   - Collect email addresses: ON (if appropriate)
   - Limit to 1 response: OFF
   - Allow response editing: ON (optional)
   - Confirmation message: “Thanks — we received your intake. Next: we’ll confirm scope + send the review link once the first cut is ready.”
4) Add questions (suggested minimum; mark required where noted)
   Client + Project
   - Q1 (Required): Full name
   - Q2 (Required): Email
   - Q3 (Required): Brand/Channel name
   - Q4: Website (optional)

   Source Media
   - Q5 (Required): Link to long-form video/podcast file (Drive/Dropbox/YT/etc.)
   - Q6 (Required): Episode title / internal name
   - Q7 (Required): Timezone + ideal posting times (optional but helpful)

   Platforms + Output
   - Q8 (Required, checkboxes): Platforms needed: TikTok / Instagram Reels / YouTube Shorts / Other
   - Q9 (Required): Number of clips requested (e.g., 3, 5, 10)
   - Q10 (Required, multiple choice): Clip length target: 15–30s / 30–45s / 45–60s / 60–90s

   Style + Brand
   - Q11 (Required): Tone keywords (e.g., bold, calm, comedic, authoritative)
   - Q12: Captions style preference: Single-line / Two-line / Karaoke highlight / No preference
   - Q13: Brand kit link (logo/fonts/colors) (optional)
   - Q14: On-screen handle + URL to display (exact text)

   Messaging
   - Q15 (Required): Call-to-action (CTA) to include (e.g., “Book a call”, “Follow for part 2”, “Download the guide”)
   - Q16: Topics to avoid / banned words (optional)
   - Q17: Compliance notes (optional): e.g., “no medical claims”, “no income claims”, etc.

   Review + Contact
   - Q18 (Required): Best contact method for revisions: Email / Other
   - Q19: Anything else we should know? (optional)

5) Share settings
   - Click Send → Link icon → Copy link
   - Paste into [GOOGLE_INTAKE_FORM_URL]
6) Connect to ops
   - In Responses tab: Create Spreadsheet (optional) for tracking.
   - Internal step: editor/ops uses the form response to run the “Pre-flight checklist” before starting.

C) PRE-FLIGHT CHECK (run on every order before editing starts)
Use the form response to confirm:
- Source link access works (no permission errors)
- Platforms + clip count + length targets are clear
- Handles/URLs and CTA exact text confirmed
- Banned words/compliance notes captured
- Caption style preference captured
If anything is missing/unclear: send the Pre-Flight Confirmation email below and pause editing until client confirms.

D) FINAL CLIENT EMAIL TEMPLATES (WITH LIVE-LINK PLACEHOLDERS)

1) Intake Received + Next Steps
Subject: We got your intake — next steps for your Clip Factory order
Hi [Client First Name],

Thanks — we received your Clip Factory intake.

Next steps:
1) Please review “What to Expect” (QA standards, review process, delivery pack, revisions):
[NOTION_EXPECTATIONS_URL]
2) If you need to update requirements, reply ASAP before editing starts.

For legitimacy/portfolio reference, here’s our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

If anything is time-sensitive, email us: agent_bob_replit+clip-factory@agentmail.to

— Bob, Clip Factory


2) Pre-Flight Confirmation (when something is missing/unclear)
Subject: Quick confirmation needed before we start your clips
Hi [Client First Name],

Before we begin editing, we need to confirm a couple items to make sure the first cut matches your expectations:
- [Question 1]
- [Question 2]
- [Question 3]

Once you reply with confirmation, we’ll start production.

What to expect (review + revisions + deliverables): [NOTION_EXPECTATIONS_URL]
Support: agent_bob_replit+clip-factory@agentmail.to
Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob, Clip Factory


3) First Cut Ready (Review Link + How to Comment)
Subject: Your clips are ready for review (timestamp notes)
Hi [Client First Name],

Your first cut is ready. Please review here:
Review link: [REVIEW_LINK]

How to request revisions (fastest):
- Leave timestamped comments directly on the review link (preferred), OR
- Reply to this email with timestamps + exact change requested.

Revision window: Please send revision notes within 24 hours so we can keep your turnaround fast.

Policy reminder (free vs paid changes): [NOTION_EXPECTATIONS_URL]
Support: agent_bob_replit+clip-factory@agentmail.to

— Bob, Clip Factory


4) Revision Received (Acknowledgment)
Subject: Revision notes received — we’re on it
Hi [Client First Name],

Got your revision notes — thank you.

We’ll apply these updates:
- [Bullet summary of requested changes]

We’ll send the revised clips back via the same review link as soon as they’re ready. If anything in the notes conflicts with the original intake/scope, we’ll flag it before proceeding.

Support: agent_bob_replit+clip-factory@agentmail.to
— Bob, Clip Factory


5) Revision Completed (Back to Review)
Subject: Revisions completed — updated clips ready
Hi [Client First Name],

Revisions are complete. Please review the updated versions here:
[REVIEW_LINK]

If everything looks good, we’ll deliver the final Delivery Pack immediately.

Support: agent_bob_replit+clip-factory@agentmail.to
— Bob, Clip Factory


6) Final Delivery Email (Delivery Pack + Posting Suggestions)
Subject: Final delivery — your Clip Factory clips + captions + posting notes
Hi [Client First Name],

Final delivery is ready.

Delivery folder:
[DELIVERY_FOLDER_LINK]

What’s included (Delivery Pack):
1) Final MP4s (vertical 9:16)
2) Captions files (SRT) for each clip
3) B-roll cue sheet (what/when to overlay)
4) Posting suggestions for each clip (first-line caption + hashtags)

Posting suggestions (quick start):
- Clip 1: First-line caption: “[FIRST_LINE_1]” | Hashtags: [#tag1 #tag2 #tag3]
- Clip 2: First-line caption: “[FIRST_LINE_2]” | Hashtags: [#tag1 #tag2 #tag3]
- Clip 3: First-line caption: “[FIRST_LINE_3]” | Hashtags: [#tag1 #tag2 #tag3]

If you need anything, reply here or email: agent_bob_replit+clip-factory@agentmail.to
About Clip Factory: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob, Clip Factory

E) LINK + PERMISSIONS CONVENTION (to prevent access-related refunds)
- Review links: always “Unlisted” + allow comments (Frame/Vimeo/YT). Test in incognito.
- Delivery folder: Google Drive folder with “Anyone with the link can view” (or client email-specific access if requested). Put all final assets inside a single top-level folder named:
  “ClientName_Project_EpXX_Delivery_YYYY-MM-DD”
- Never email large attachments; always link to the delivery folder.

This kit is now ready for execution. Once the Notion page and Google Form are created and the two live URLs are known, replace [NOTION_EXPECTATIONS_URL] and [GOOGLE_INTAKE_FORM_URL] everywhere and the system is fully operational.