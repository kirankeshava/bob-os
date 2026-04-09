# Clip Factory — Live Links Execution Kit (Notion Publish + Google Form Build + Final Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:19:27.890Z

---

Below is the execution-ready kit to go from “copy exists” → “live links inserted into emails” with minimal failure risk.

BUSINESS REFERENCES (use in all client comms)
- Legitimacy URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support/ops email: agent_bob_replit+clip-factory@agentmail.to

1) NOTION: PUBLISH THE CLIENT ONBOARDING PAGE (FREE)
Goal: Create a public share URL for “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)” and confirm it works for non-Notion users.

A. Account + workspace setup
1. Go to https://www.notion.so/
2. Sign up with:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
3. Create a workspace name: “Clip Factory” (or “Clip Factory Ops”).
4. Skip paid prompts; stay on free tier.

B. Create the page
1. Click “New page”. Title it exactly:
   “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”
2. Paste the full onboarding copy (from the prior artifact) into the page.
3. Add a short header block at the very top:
   - “Official site: [business URL]”
   - “Support: agent_bob_replit+clip-factory@agentmail.to”

C. Publish publicly + permissions
1. Click “Share” (top right).
2. Toggle on “Publish to web”.
3. Ensure settings:
   - Allow comments: OFF (clients should comment on Frame.io/Vimeo/YouTube timestamps instead)
   - Allow duplicate as template: OFF
   - Search engine indexing: OFF (optional, but safer early)
4. Copy the public URL.

D. Notion link QA (must do before sending)
1. Open an Incognito/Private window.
2. Paste the Notion public URL.
3. Confirm:
   - Loads without login
   - Displays the business URL and support email correctly
   - No sensitive internal notes included
4. If it requires login: re-check “Publish to web” toggle and re-copy link.

Deliverable output: NOTION_ONBOARDING_URL = <paste the live Notion URL>

2) GOOGLE FORM: BUILD THE CLIENT INTAKE FORM (FREE)
Goal: Create a shareable intake form link to collect requirements before editing begins.

A. Google account
Option 1 (preferred): Use a Google account tied to agent_bob_replit@agentmail.to.
1. Go to https://accounts.google.com/signup
2. Create account with:
   - First name: Bob
   - Last name: Smith
   - Email: agent_bob_replit@agentmail.to (if allowed) OR create a Gmail alias (e.g., bobsmith.clipfactory@gmail.com) and set the form’s “Response notification” to agent_bob_replit+clip-factory@agentmail.to.

B. Create the form
1. Go to https://forms.google.com
2. Blank form → Title:
   “Clip Factory — Client Intake (Clips & Posting Preferences)”
3. Form description (paste):
   “This intake ensures your clips match your brand, platforms, and compliance needs. If you have questions, email agent_bob_replit+clip-factory@agentmail.to. Official site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

C. Questions (build exactly; mark Required where indicated)
SECTION 1 — Basics
1) Contact email (Short answer) — REQUIRED
2) Brand/Channel name (Short answer) — REQUIRED
3) Links to source video(s) (Short answer) — REQUIRED
   Help text: “Paste Google Drive/Dropbox/YouTube link(s). If multiple episodes, paste each on a new line.”
4) Number of clips requested (Multiple choice: 3 / 5 / 10 / Other) — REQUIRED
5) Primary goal (Multiple choice) — REQUIRED
   - Grow followers
   - Drive leads to call/DM
   - Sell offer/product
   - Promote episode
   - Other

SECTION 2 — Platforms + Specs
6) Platforms to publish (Checkboxes) — REQUIRED
   - TikTok
   - Instagram Reels
   - YouTube Shorts
   - LinkedIn
7) Preferred aspect ratio (Multiple choice) — REQUIRED
   - 9:16 vertical (default)
   - 1:1 square
   - 16:9 horizontal
8) On-screen captions style (Multiple choice) — REQUIRED
   - Clean (minimal)
   - Bold (high-contrast)
   - Karaoke/highlight words
   - Match my current style (link below)
9) Link to reference style (Short answer) — Optional

SECTION 3 — Branding + Compliance
10) Brand colors (Short answer) — Optional
11) Font preference (Short answer) — Optional
12) Include logo/handle watermark? (Multiple choice) — REQUIRED
   - Yes (I will provide)
   - Yes (use my handle text)
   - No
13) Handle(s) to display (Short answer) — Optional
14) Banned topics/words (Paragraph) — Optional
15) Compliance notes (Checkboxes) — Optional
   - Avoid medical claims
   - Avoid income claims
   - Avoid profanity
   - Avoid competitor mentions
   - Other (explain)

SECTION 4 — Hook + CTA
16) Target audience (Short answer) — REQUIRED
17) CTA preference (Multiple choice) — REQUIRED
   - Follow for more
   - Comment keyword
   - DM me
   - Link in bio
   - Book a call
   - None
18) Offer/lead magnet link (Short answer) — Optional
19) Tone (Multiple choice) — REQUIRED
   - High energy
   - Calm/professional
   - Funny
   - Direct/educational

SECTION 5 — Final confirmation
20) Must-include phrases (Paragraph) — Optional
21) Must-avoid edits (Paragraph) — Optional
22) Approval checkbox (Checkbox) — REQUIRED
   - “I confirm the provided links/media are licensed/owned for editing and reposting.”

D. Form settings
1. Settings → Responses:
   - Collect email addresses: ON
   - Limit to 1 response: OFF (clients may update)
2. Presentation:
   - Confirmation message:
     “Thanks — we received your intake. If anything changes, submit again and email agent_bob_replit+clip-factory@agentmail.to with the update. Next step: we’ll confirm pre-flight and start editing.”
3. Notifications:
   - Add-on not required. At minimum: set Google Forms to email you on new response (if available) or manually check before starting edits.

E. Google Form link QA
1. Click “Send” → Link icon → Copy.
2. Open Incognito and test:
   - Form loads
   - Required fields enforce
   - Confirmation message appears

Deliverable output: INTAKE_FORM_URL = <paste Google Form link>

3) FINAL EMAIL TEMPLATES (WITH LIVE LINKS PLACEHOLDERS)
Replace placeholders after links are created:
- {{NOTION_ONBOARDING_URL}}
- {{INTAKE_FORM_URL}}

A) Intake / Welcome + Next Steps Email
Subject: Next step: Clip Factory intake + what to expect

Hi {{ClientName}},

Excited to produce your short-form clips. To ensure we match your platforms, captions style, and CTA, please complete this quick intake form:
{{INTAKE_FORM_URL}}

Here’s our “What to Expect” page (QA standards, review flow, delivery pack, and revision policy):
{{NOTION_ONBOARDING_URL}}

Official site (for reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

Once the intake is in, we’ll confirm pre-flight (platforms/format/branding) and begin editing.

If anything is time-sensitive, reply here: agent_bob_replit+clip-factory@agentmail.to

— Bob, Clip Factory

B) Delivery Email (Pack + Review Instructions)
Subject: Your clips are ready — review link + download pack

Hi {{ClientName}},

Your clips are ready for review.

1) Review link (leave timestamped comments): {{ReviewLink}}
2) Download folder (Delivery Pack): {{DriveFolderLink}}

What’s included in the Delivery Pack:
- Final MP4s (ready-to-post)
- Captions file(s): .SRT
- B-roll cue sheet (what/when to overlay)
- Posting suggestions (first-line caption + hashtag set per clip)

Revision window:
- Please send revision notes within 24 hours of this email.
- Best method: timestamp comments directly on the review link.

What to expect (QA/revisions policy):
{{NOTION_ONBOARDING_URL}}

Support: agent_bob_replit+clip-factory@agentmail.to
Official site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob, Clip Factory

C) Revision Received (Acknowledgment)
Subject: Revisions received — update within 24h

Hi {{ClientName}},

Got your revision notes — thank you.

We’ll apply the requested changes and send the updated files within 24 hours. If you added notes in the review tool, we’ll follow the timestamped comments exactly.

Quick reminder of revision scope (what’s included vs. paid changes):
{{NOTION_ONBOARDING_URL}}

If anything is urgent, reply here: agent_bob_replit+clip-factory@agentmail.to

— Bob, Clip Factory

D) Revision Completed (Handoff)
Subject: Revisions completed — updated clips attached/in folder

Hi {{ClientName}},

Revisions are complete.

Updated review link (if applicable): {{ReviewLink}}
Updated download folder: {{DriveFolderLink}}

If you spot anything technical (caption typos, cropping, audio artifacts), reply within the remaining revision window and we’ll fix it.

Support: agent_bob_replit+clip-factory@agentmail.to
Official site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob, Clip Factory

4) FINAL “LINK QA” BLOCK (RUN EVERY DELIVERY)
Before sending any intake/delivery email, confirm:
- Notion page opens in Incognito without login
- Google Form opens in Incognito and accepts responses
- Review link permissions allow comments (Frame.io/Vimeo/YouTube unlisted)
- Drive folder permissions set correctly (viewer/download allowed)
- All links pasted into email match the right client/project

This kit is designed to prevent the most common refund triggers: unclear expectations, broken links, missing assets, and revision-scope disputes.