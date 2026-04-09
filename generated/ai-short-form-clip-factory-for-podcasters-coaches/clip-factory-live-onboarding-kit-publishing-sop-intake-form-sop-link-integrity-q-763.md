# Clip Factory — Live Onboarding Kit (Publishing SOP + Intake Form SOP + Link Integrity QA + Updated Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:47:09.451Z

---

Business website (legitimacy/reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Business contact: agent_bob_replit+clip-factory@agentmail.to

========================================
A) NOTION PAGE — CREATE + PUBLISH SOP
========================================
Goal: Create a single public “What to Expect” page (QA standards + review flow + delivery pack + revisions) and use the share URL in every onboarding/delivery email.

1) Create/Sign in to Notion
- Use account name: Bob Smith
- Email: agent_bob_replit@agentmail.to
- Create a workspace name: Clip Factory

2) Create the page
- Page title: “Clip Factory — What to Expect (QA • Review • Delivery • Revisions)”
- Add a top callout:
  - “Questions? Email agent_bob_replit+clip-factory@agentmail.to”
  - “Reference site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

3) Paste page content (use your previously drafted copy)
Recommended sections (H2 headings):
- Overview: What you’ll receive
- Our QA Standards (safe zones, captions, audio, framing)
- Review Flow (timestamped comments + 24h revision window)
- Delivery Pack Contents (MP4 + SRT + cue sheet + posting suggestions)
- Revisions: What’s free vs what’s paid
- Timelines & communication

4) Publish publicly
- Click Share → “Publish to web” → ON
- Toggle ON: “Allow search engines” = OFF (reduces random traffic)
- Toggle ON (optional): “Duplicate as template” = ON (if clients want to copy)
- Copy the public URL and store it as:
  NOTION_EXPECTATIONS_URL = <paste_url_here>

5) Change control
- If policies change, update the Notion page first.
- Add a small footer line:
  “Last updated: YYYY-MM-DD”

========================================
B) GOOGLE FORM — INTAKE FORM BUILD + SHARE SOP
========================================
Goal: Standardize client requirements up-front to prevent avoidable revisions/refunds.

1) Create/Sign in
- Prefer using a free Google account tied to: agent_bob_replit@agentmail.to (if Google allows; if not, use any free account and keep ownership documented).

2) Form title + description
Title: “Clip Factory — Client Intake (Short-Form Clips)” 
Description:
“Please complete this before we start editing. If you have questions, email agent_bob_replit+clip-factory@agentmail.to. Reference site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

3) REQUIRED form settings
- Collect email addresses: ON
- Limit to 1 response: OFF (clients may submit updates)
- Allow response editing: ON for 24 hours (or OFF if operationally simpler)
- Confirmation message:
  “Thanks — we’ll confirm receipt and start pre-flight checks. Revisions are easiest when notes are timestamped on the review link.”

4) Questions (recommended minimum)
Section 1 — Contact & order
- Brand/Creator name (Short answer, required)
- Primary email (auto-collected) + backup email (Short answer, optional)
- Time zone (Dropdown, required)
- Link to the full source video/podcast (Short answer, required)
- Source format (Dropdown: YouTube link / Drive link / Upload available / Other)

Section 2 — Platforms & formatting
- Platforms needed (Checkboxes, required): TikTok, Instagram Reels, YouTube Shorts, Other
- Preferred aspect ratio (Dropdown): 9:16 default, 1:1, 4:5, 16:9
- Caption style preference (Dropdown): Clean / Bold / Karaoke-highlight / Brand style guide provided

Section 3 — Content direction
- Tone (Checkboxes): Educational, Direct/authoritative, Funny, Inspirational, Other
- Call-to-action to include (Short answer, optional)
- Any words/topics to avoid (Paragraph, optional)
- Do you want on-screen hook text at start? (Multiple choice): Yes / No / Surprise me

Section 4 — Branding assets
- Brand colors/hex codes (Short answer, optional)
- Font preference (Short answer, optional)
- Logo available? (Multiple choice): Yes / No
- If yes, provide logo link (Short answer, optional)

Section 5 — Posting details
- Your @handle(s) (Short answer, required)
- Website link / lead magnet link (Short answer, optional)
- Hashtags to include/avoid (Paragraph, optional)

5) Response routing
- Responses → Link to Google Sheet: “Clip Factory — Intake Responses”
- Notifications: enable email notifications for new responses.
- Store the form link as:
  INTAKE_FORM_URL = <paste_url_here>

========================================
C) LINK INTEGRITY & ACCESS QA (INTERNAL)
========================================
Run this check BEFORE sending any review or delivery email.

1) Review link access test
- Open review link in an incognito/private window.
- Confirm: plays, comments enabled, timestamp comments possible.
- Confirm: correct project/clip version is visible.

2) Drive/Dropbox folder access test
- Open folder link in incognito.
- Confirm: client has at least Viewer access.
- Confirm: files downloadable.
- Confirm: no “request access” prompt.

3) Naming + version control
- Ensure filename includes: ClientName_Project_Clip## _v1 (or v2 after revision)
- Ensure only the latest version is in the “FINAL” folder.

4) Deadline clarity
- Confirm the email includes a timestamp and a revision deadline date/time in the client’s timezone.
- Confirm: 24-hour revision window is stated.

5) Single source of truth
- Ensure the Notion Expectations URL is included.
- Ensure the contact email is included.

========================================
D) UPDATED CLIENT EMAIL TEMPLATES (READY TO PASTE)
========================================
Use these placeholders:
- {NOTION_EXPECTATIONS_URL} = paste live Notion link
- {INTAKE_FORM_URL} = paste live Google Form link
- {REVIEW_LINK} = Frame.io/Vimeo/Unlisted YT link
- {DELIVERY_FOLDER_LINK} = Drive/Dropbox folder
- {REVISION_DEADLINE} = e.g., “Apr 10, 2026 — 5:00pm ET”

----------------------------------------
D1) INTAKE / PRE-FLIGHT CONFIRMATION EMAIL
Subject: Next step — Clip Factory intake + pre-flight checklist

Hi {ClientName},

To kick off your clips, please complete our 2–3 minute intake form:
{INTAKE_FORM_URL}

What to expect (QA standards, review flow, delivery pack, and revision policy):
{NOTION_EXPECTATIONS_URL}

Once we have your intake, we’ll run a quick pre-flight check (captions style, safe zones, audio targets, and platform formatting) before editing begins.

If anything is time-sensitive, reply here and we’ll confirm timing.

— Bob
Clip Factory
agent_bob_replit+clip-factory@agentmail.to
Reference site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

----------------------------------------
D2) DELIVERY EMAIL (FINAL PACK + REVIEW)
Subject: Your clips are ready — review link + download pack (revision window inside)

Hi {ClientName},

Your Clip Factory delivery is ready.

1) Review link (please leave timestamped comments):
{REVIEW_LINK}

2) Download folder (final MP4s + SRT + cue sheet + posting suggestions):
{DELIVERY_FOLDER_LINK}

What’s included:
- FINAL MP4s (platform-ready, 9:16)
- SRT caption files (one per clip)
- B-roll / cut cue sheet (per clip)
- Posting suggestions (first-line caption + hashtag set per clip)

Revision window:
Please send revision notes via timestamped comments by {REVISION_DEADLINE}. We’ll handle eligible revisions within the window.

Policy & QA standards (for reference):
{NOTION_EXPECTATIONS_URL}

— Bob
agent_bob_replit+clip-factory@agentmail.to
Reference site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

----------------------------------------
D3) REVISION RECEIVED (ACK)
Subject: Got your revision notes — next update

Hi {ClientName},

Confirmed — we received your revision notes on the review link:
{REVIEW_LINK}

We’re working through the timestamped comments now. If anything is unclear, we’ll reply with a quick question to avoid back-and-forth.

Reminder: revision window closes at {REVISION_DEADLINE} (per policy here: {NOTION_EXPECTATIONS_URL}).

— Bob
agent_bob_replit+clip-factory@agentmail.to

----------------------------------------
D4) REVISION COMPLETED (HANDOFF)
Subject: Revisions complete — updated clips in your folder

Hi {ClientName},

Revisions are complete. Updated files are now in your delivery folder:
{DELIVERY_FOLDER_LINK}

If you’d like, reply with which clips performed best after posting and we’ll tune hooks/caption pacing for the next batch.

Policy & what-to-expect reference:
{NOTION_EXPECTATIONS_URL}

— Bob
agent_bob_replit+clip-factory@agentmail.to
Reference site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
