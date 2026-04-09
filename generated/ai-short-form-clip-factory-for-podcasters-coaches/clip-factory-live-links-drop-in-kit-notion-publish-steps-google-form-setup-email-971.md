# Clip Factory — Live Links Drop‑In Kit (Notion Publish Steps + Google Form Setup + Email Link Injection)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** plan
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:35:03.613Z

---

Below is the exact execution kit to publish your client onboarding assets and wire them into your communication flow. This is designed to prevent delivery confusion, missed requirements, and refund-triggering misunderstandings.

1) NOTION PAGE — CREATE + PUBLISH (FREE)
Goal: Turn “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)” into a public link you can send to every client.

A. Account + workspace
- Go to https://www.notion.so/
- Sign up with:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to
- Create a workspace name: Clip Factory

B. Create the page (structure)
Create a page titled:
“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”
Then paste in your previously written one-pager content (the consolidated copy).
Suggested page sections (in this order):
1) Welcome + Contact
   - Include: Business website URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   - Include: Business contact email: agent_bob_replit+clip-factory@agentmail.to
2) What you’ll receive (Delivery Pack)
3) QA standards (captions, framing, audio, hook clarity)
4) Review flow (timestamp comments) + 24-hour revision window
5) Revision policy (free vs paid changes)
6) Timeline + next steps

C. Publish settings (critical)
- Click “Share” (top right)
- Toggle: “Publish to web” ON
- Toggle: “Allow duplicate as template” OFF (unless you want clients to copy it)
- Toggle: “Search engine indexing” OFF (recommended early-stage)
- Copy the public URL and store it as:
  NOTION_ONBOARDING_URL = [PASTE LINK HERE]

D. Quick QA on the published page
- Open the link in an incognito/private window
- Confirm:
  - No login required
  - Contact email is correct
  - Website URL is present
  - Revision window is clearly stated


2) GOOGLE FORM — CREATE + CONFIGURE (FREE)
Goal: A single intake form that captures platforms, tone, CTA, handles/links, banned words, and upload permissions.

A. Account
- If you already have a Google account for the business, use it.
- If not, create one using:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to

B. Form creation steps
- Go to https://forms.google.com → Blank form
- Title: “Clip Factory — Client Intake Form”
- Description: “Please complete this before editing starts. This ensures correct formatting, tone, and posting details.”

C. Required form settings (to reduce missing info)
In Settings:
- Responses:
  - Collect email addresses: ON (ensures we can reach the right person)
  - Allow response editing: ON (optional)
  - Limit to 1 response: OFF (clients may submit updates)
- Presentation:
  - Show progress bar: ON (optional)

D. Minimum required questions (must be Required = ON)
1) Email (auto-collected if enabled)
2) Full name
3) Brand/Channel name
4) Primary platform(s): TikTok / Instagram Reels / YouTube Shorts / Other
5) Target audience (1 sentence)
6) Tone: Educational / High-energy / Calm authority / Comedic / Other
7) CTA preference: Follow / Subscribe / Book a call / Visit link / Comment keyword / Other
8) Handle(s) + link(s) to include
9) Banned words/topics (if any)
10) Caption style: Clean (no profanity) / Raw (keep as spoken) / Light cleanup
11) On-screen captions style: Word-by-word / Sentence-based
12) Hook preference: Bold claim / Question / Curiosity gap / Statistic / Story opener
13) Upload link to source video/podcast OR confirm we already have access
   - If link: Google Drive/Dropbox/YouTube unlisted URL
14) Brand guidelines upload (optional) OR “None”

E. Capture share link
- Click “Send” → link icon → Copy
- Store as:
  GOOGLE_INTAKE_FORM_URL = [PASTE LINK HERE]

F. Form QA
- Submit a test response yourself
- Confirm you receive the response email and it appears in the Responses tab


3) EMAIL TEMPLATE LINK INJECTION (PASTE-READY)
Once you have the two live URLs, update your emails with these exact fields.

A. Intake / Start Confirmation Email (insert links)
- Replace:
  [NOTION_ONBOARDING_URL]
  [GOOGLE_INTAKE_FORM_URL]
With your live URLs.

Add this block verbatim near the top:
“Start here (2 links):
1) What to expect (QA, review, delivery, revisions): [NOTION_ONBOARDING_URL]
2) Quick intake form (required before editing): [GOOGLE_INTAKE_FORM_URL]
If you have questions, email us anytime: agent_bob_replit+clip-factory@agentmail.to
Proof/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

B. Delivery Email (insert links)
Include:
- Review link (Frame.io/Vimeo/YouTube unlisted)
- Folder link (Drive/Dropbox)
- Reminder: 24-hour revision window
- Add the onboarding link again for policy clarity:
  “Revision policy + QA standards: [NOTION_ONBOARDING_URL]”

C. Revision Received / Completed Emails
- Add one line:
  “For reference on what qualifies as a free revision vs a change request: [NOTION_ONBOARDING_URL]”


4) OPTIONAL BACKUP: HOST ON REPLIT SITE
If Notion is not desired, the same copy can be pasted into a simple “/onboarding” page on the existing site:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
This keeps everything under one domain for legitimacy.


Success criteria (definition of done)
- You have two live links:
  - NOTION_ONBOARDING_URL
  - GOOGLE_INTAKE_FORM_URL
- Every client-facing email contains both links (or the Replit onboarding page link).
- Clients can complete intake + understand review/revision rules without back-and-forth.

This activation step is what turns the QA/review/delivery policy from “internal docs” into a real reputation-protection system clients actually see and follow.