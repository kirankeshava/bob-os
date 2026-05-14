# Clip Factory — Live Links Launch Kit (Notion Publish SOP + Google Form Build SOP + Updated Client Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T22:52:59.078Z

---

## 1) Notion Publish SOP — “Clip Factory — What to Expect” (Public URL)

**Goal:** Create a single client-facing page that explains QA standards, review flow, delivery pack contents, and revision policy.

**Account + Page Creation**
1) Go to https://www.notion.so and sign up/login using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2) Create a new page titled: **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**.
3) Paste in the previously prepared page copy (sections: Overview, What you send us, What you receive, QA standards, Review flow, Revision policy, Turnaround, Contact).

**Publish Settings (must-do)**
4) Click **Share** (top right).
5) Toggle **Publish** (or **Share to web**) ON.
6) Enable:
   - **Allow duplicate as template** = OFF (keep content controlled)
   - **Search engine indexing** = OFF (avoid random traffic/confusion)
   - **Allow comments** = OFF (feedback should be on review links)
7) Copy the public URL and store it as: **NOTION_ONBOARDING_URL**.

**Published Page QA (2 minutes)**
8) Open the public URL in an incognito/private window:
   - Verify it loads without login
   - Verify the Contact section includes:
     - Website legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
     - Support email: agent_bob_replit+clip-factory@agentmail.to
   - Verify revision window states **24 hours** and that timestamped comments are required

---

## 2) Google Form Build SOP — Client Intake Form (Share URL)

**Goal:** Capture requirements up front to prevent avoidable revisions/refunds.

**Account**
1) Use a free Google account. If none exists, create one with:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to (or closest available alias if Google rejects; document the final address used)

**Form Creation**
2) Go to https://forms.google.com → Blank form.
3) Title: **Clip Factory — Client Intake (Short-Form Clips)**
4) Form description (paste):
   “This form ensures we match your style, platforms, and compliance needs. If anything changes after you submit, email agent_bob_replit+clip-factory@agentmail.to before editing starts.”

**Recommended Form Settings**
5) Settings:
   - Collect email addresses: ON
   - Allow response editing: OFF
   - Limit to 1 response: OFF
   - Confirmation message:
     “Thanks — we’ve received your intake. Next: we’ll confirm ‘Pre-Flight’ and begin editing. Questions? agent_bob_replit+clip-factory@agentmail.to”

**Questions (Required unless noted)**
6) Client + Asset basics
   - Your name (Short answer)
   - Brand/Channel name (Short answer)
   - Best email for delivery (Email)
   - Link to long-form source (YouTube/Vimeo/Drive) (Short answer)
   - Do you have permission to use all audio/music in the long-form? (Multiple choice: Yes / Not sure)

7) Platforms + output
   - Platforms (Checkboxes): TikTok, Instagram Reels, YouTube Shorts, LinkedIn, X, Other
   - Aspect ratio needed (Multiple choice): 9:16 (vertical), 1:1, 16:9, Not sure
   - How many clips do you want from this episode? (Multiple choice): 3, 5, 8, 10, Other
   - Preferred clip length (Multiple choice): 15–30s, 30–45s, 45–60s, 60–90s

8) Style + brand
   - Caption style (Multiple choice): Word-by-word highlight, Line-by-line subtitles, Minimal captions
   - Tone (Checkboxes): Educational, Funny, Contrarian, Inspirational, Sales/CTA, Other
   - Hook preference (Multiple choice): Strong claim, Question, “3 mistakes…”, Story cold open, Other
   - Brand colors (Optional short answer)
   - Brand font (Optional short answer)

9) Compliance + do-not-do
   - Words/phrases to avoid (Paragraph)
   - Topics to avoid (Paragraph)
   - On-screen text constraints (Multiple choice): None, Avoid profanity, Avoid medical claims, Avoid income claims, Other

10) CTA + links
   - Primary call-to-action (Short answer)
   - Link to mention (Short answer)
   - Social handles to display (Paragraph)

11) Review & turnaround
   - Preferred review method (Multiple choice): Frame.io, Vimeo, Unlisted YouTube, Google Drive
   - Anything else we should know? (Paragraph, optional)

**Share Link**
12) Click Send → Link icon → Copy short URL → store as **GOOGLE_FORM_INTAKE_URL**.

---

## 3) Updated Client Email Templates (with live-link placeholders)

> Replace placeholders before sending:
- {NOTION_ONBOARDING_URL}
- {GOOGLE_FORM_INTAKE_URL}
- {REVIEW_LINK}
- {DRIVE_FOLDER_LINK}
- {REVISION_DEADLINE_LOCAL}
- {CLIENT_NAME}
- {PROJECT_NAME}

### A) Intake / Kickoff Email (Send immediately after lead says “yes”)
**Subject:** Clip Factory kickoff — intake form + what to expect ({PROJECT_NAME})

Hi {CLIENT_NAME},

Welcome to Clip Factory. To start, please complete this intake form:
{GOOGLE_FORM_INTAKE_URL}

Here’s our full “What to Expect” page (QA standards, review flow, delivery pack, revision policy):
{NOTION_ONBOARDING_URL}

For legitimacy/overview, our site is here:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

Once we have your intake + the long-form link, we’ll confirm Pre-Flight (format, branding, constraints) and begin editing.

Questions any time: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)


### B) Pre-Flight Confirmation (Send after intake review, before editing begins)
**Subject:** Pre-Flight confirmed — we’re starting edits ({PROJECT_NAME})

Hi {CLIENT_NAME},

Pre-Flight is confirmed based on your intake + source link. We’re starting edits now.

Reminders:
- You’ll review via a timestamp-comment review link (Frame.io/Vimeo/YouTube).
- Revisions: 1 round included if requested within **24 hours** of delivery, using timestamped notes.

What to expect (full details):
{NOTION_ONBOARDING_URL}

Support: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)


### C) Delivery Email (Send with final pack + review link)
**Subject:** Delivery — your clips are ready ({PROJECT_NAME})

Hi {CLIENT_NAME},

Your clips are ready. Review here (timestamp comments only, please):
{REVIEW_LINK}

Download the full Delivery Pack here:
{DRIVE_FOLDER_LINK}

**What’s included**
- Final MP4s (ready-to-post)
- SRT caption files
- B-roll cue sheet
- Posting suggestions (first line caption + hashtags)

**Revision window**
Please send any revision requests by: **{REVISION_DEADLINE_LOCAL}** (24 hours). After that, we’ll consider the delivery accepted.

Process/standards (QA, review, revisions):
{NOTION_ONBOARDING_URL}

Business site:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

Support: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)


### D) Revision Received (Acknowledgment)
**Subject:** Got your revisions — processing now ({PROJECT_NAME})

Hi {CLIENT_NAME},

Received — thanks for the timestamped notes. We’re applying revisions now.

If anything else comes up, please keep it in the same review link thread to avoid misses:
{REVIEW_LINK}

Reminder: revisions are covered within the 24-hour window and for scope that matches the original intake.
Full policy: {NOTION_ONBOARDING_URL}

— Bob (Clip Factory)
agent_bob_replit+clip-factory@agentmail.to


### E) Revision Completed (Handoff)
**Subject:** Revisions complete — updated files posted ({PROJECT_NAME})

Hi {CLIENT_NAME},

Revisions are complete. Updated exports are now available here:
{DRIVE_FOLDER_LINK}

If you’d like one last look, the updated review link is here:
{REVIEW_LINK}

If everything looks good, you’re all set to post.
Posting suggestions are included in the Delivery Pack.

Process/standards: {NOTION_ONBOARDING_URL}
Support: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

---

## 4) Add to Delivery Pack (README snippet)
Include a file named: **README - Start Here.txt** with:

“Review link: {REVIEW_LINK}
Revision deadline: {REVISION_DEADLINE_LOCAL}
What’s included: MP4s + SRT + B-roll cues + posting suggestions.
Questions: agent_bob_replit+clip-factory@agentmail.to
What to expect: {NOTION_ONBOARDING_URL}
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”
