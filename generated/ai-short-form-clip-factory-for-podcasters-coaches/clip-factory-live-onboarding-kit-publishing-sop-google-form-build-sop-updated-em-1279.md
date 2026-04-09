# Clip Factory — Live Onboarding Kit (Publishing SOP + Google Form Build SOP + Updated Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:57:25.371Z

---

# Clip Factory — Live Onboarding Kit (Go-Live Instructions)

Business website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3  
Business contact email: agent_bob_replit+clip-factory@agentmail.to

## 1) Publish the client “What to Expect” page (Notion) — SOP
**Goal:** A single public URL you can paste into every onboarding and delivery email.

**Account & page creation**
1. Go to Notion and sign up/login using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2. Create a new page titled: **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**.
3. Paste the full “What to Expect” copy (from the previous Notion-ready draft) into the page.

**Publishing**
4. Click **Share** → toggle **Publish** / **Share to web** (wording varies).
5. Settings:
   - Enable: **Share to web** / public access
   - Disable (recommended): “Allow duplicate as template” (prevents clients copying your SOP)
   - Disable (recommended): Search engine indexing (keeps it discoverable only by link)
6. Copy the public URL and save it as:
   - **LIVE_NOTION_EXPECTATIONS_URL = [PASTE LINK]**

**Quick QA before using the link**
7. Open the link in an incognito/private window and confirm:
   - Page loads without login
   - The revision window is clearly stated: **24 hours**
   - The review method is clear: **timestamped comments**
   - Contact email is present: agent_bob_replit+clip-factory@agentmail.to

## 2) Create the Client Intake Form (Google Forms) — SOP
**Goal:** Standardized inputs so editing starts with clear requirements (reduces refunds).

**If no Google account exists yet**
1. Create a free Google account using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to (if Google requires a Gmail, create one and forward notifications to the AgentMail inbox)

**Build the form**
2. Go to Google Forms → Blank form.
3. Form title: **Clip Factory — Client Intake (Short-Form Clips)**
4. Form description (paste):
   “Use this to tell us exactly what you want so we can deliver clips that match your brand. If anything changes after editing starts, it may count as a paid change request. Questions? Email agent_bob_replit+clip-factory@agentmail.to.”

**Required settings**
5. Settings:
   - Collect email addresses: ON (recommended)
   - Restrict to users in org: OFF
   - Allow edit after submit: OFF (prevents silent scope drift)
   - Confirmation message: “Thanks—received. We’ll confirm your specs and start editing.”

**Questions to add (minimum set; all required unless marked optional)**
6. Client + project
   - “Brand / Channel name” (Short answer)
   - “Primary contact email” (Short answer)
   - “Link to the full episode/video (YouTube/Drive/etc.)” (Short answer)
   - “What are we clipping?” (Multiple choice: Podcast video, Webinar, Coaching call, Talking-head, Interview, Other)

7. Platforms + formatting
   - “Target platforms” (Checkboxes: TikTok, Instagram Reels, YouTube Shorts, LinkedIn, Other)
   - “Preferred aspect ratio” (Multiple choice: 9:16 vertical, 1:1 square, 16:9 horizontal)
   - “Safe-zone preference” (Multiple choice: Platform-safe (recommended), Full-frame)

8. Style + captions
   - “Caption style” (Multiple choice: Clean (1–2 lines), Bold/highlighted keywords, Karaoke-style word-by-word)
   - “Caption tone” (Multiple choice: Professional, Energetic, Minimalist, Other)
   - “Banned words/topics (if any)” (Paragraph)
   - “Must-use spelling (names/brands/terms)” (Paragraph)

9. Hooks + CTA
   - “Primary goal” (Multiple choice: Follows/subscribers, Leads, Book calls, Course sales, Brand awareness)
   - “Call-to-action to include (exact text)” (Short answer)
   - “Link/handle to show (if any)” (Short answer)

10. Brand assets (optional but recommended)
   - “Brand colors (hex codes if known)” (Short answer)
   - “Logo link (Drive/URL)” (Short answer)
   - “Example clips you like (URLs)” (Paragraph)

**Publish link**
11. Click Send → Link icon → Copy link.
12. Save as:
   - **LIVE_GOOGLE_FORM_URL = [PASTE LINK]**

## 3) Internal pre-flight check (run BEFORE editing starts)
Use the intake response to confirm:
- Platform targets + aspect ratio match
- Caption style chosen
- CTA text provided (or explicitly “no CTA”)
- Banned words/topics noted
- Names/brands spelling provided
- Source video link works and has adequate audio
If anything is missing, send the “Pre-Flight Clarification” email (below) and pause work.

---

# 4) Updated Client Email Templates (insert live links)
**IMPORTANT:** Replace placeholders before sending:
- {{LIVE_NOTION_EXPECTATIONS_URL}}
- {{LIVE_GOOGLE_FORM_URL}}
- {{WEBSITE_URL}} = https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- {{CONTACT_EMAIL}} = agent_bob_replit+clip-factory@agentmail.to

## A) Intake / Onboarding Email (send immediately after payment/order)
**Subject:** Next step: Clip Factory intake (so we can start editing)

Hi {{ClientName}},

Thanks for working with Clip Factory. To start editing, please complete our 2-minute intake form:
{{LIVE_GOOGLE_FORM_URL}}

What to expect (QA standards, review, delivery pack, revisions):
{{LIVE_NOTION_EXPECTATIONS_URL}}

If you want to sanity-check we’re legit, here’s our site: {{WEBSITE_URL}}

Once you submit the form, we’ll confirm specs and begin.

—Bob (Clip Factory)  
{{CONTACT_EMAIL}}

## B) Pre-Flight Clarification Email (only if intake is incomplete/unclear)
**Subject:** Quick clarification before we begin clipping

Hi {{ClientName}},

We’re ready to start, but we need 1–2 quick clarifications to avoid revisions:
- {{Question1}}
- {{Question2}}

Reply here with the answers (or update your intake form):
{{LIVE_GOOGLE_FORM_URL}}

Process + revision policy reminder:
{{LIVE_NOTION_EXPECTATIONS_URL}}

—Bob  
{{CONTACT_EMAIL}}

## C) Delivery Email (includes review link + revision deadline)
**Subject:** Your clips are ready — review link + download

Hi {{ClientName}},

Your Clip Factory delivery is ready.

**1) Review link (timestamp comments):** {{ReviewLink}}
Please leave notes as timestamped comments directly on the video.

**2) Download folder:** {{DriveFolderLink}}
Inside you’ll find:
- Final vertical MP4s
- Caption files (SRT)
- B-roll cue sheet
- Posting suggestions (first line + hashtags)

**Revision window:** Please submit any revision notes within **24 hours** (by {{RevisionDeadlineDateTime}} {{ClientTimeZone}}). Notes received after that window may be treated as a new paid change request.

Process details: {{LIVE_NOTION_EXPECTATIONS_URL}}

—Bob  
{{CONTACT_EMAIL}} | {{WEBSITE_URL}}

## D) Revision Received (acknowledgment)
**Subject:** Got your revision notes — we’re on it

Hi {{ClientName}},

Received your revision notes—thank you. We’ll apply the requested changes and send an updated review link.

Reminder: to keep turnaround fast, please keep additional notes in the same review link as timestamped comments.

—Bob  
{{CONTACT_EMAIL}}

## E) Revision Completed (handoff)
**Subject:** Revision complete — updated clips ready

Hi {{ClientName}},

Revisions are complete.

Updated review link: {{UpdatedReviewLink}}  
Updated download folder (same location unless noted): {{DriveFolderLink}}

If anything else comes up, reply with timestamped notes within the remaining 24-hour window.

—Bob  
{{CONTACT_EMAIL}} | {{WEBSITE_URL}}

---

## 5) Operational rule: do not start work until links are live
Before onboarding the next client, confirm you have:
- LIVE_NOTION_EXPECTATIONS_URL saved
- LIVE_GOOGLE_FORM_URL saved
- Email templates updated with live links (no placeholders)

This prevents the #1 early-stage reputation failure mode: unclear expectations → endless revisions → refunds.
