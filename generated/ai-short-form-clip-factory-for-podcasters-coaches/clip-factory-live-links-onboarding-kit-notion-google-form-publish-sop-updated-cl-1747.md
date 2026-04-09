# Clip Factory — Live Links Onboarding Kit (Notion + Google Form Publish SOP + Updated Client Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:56:32.392Z

---

Purpose: ship a no-refund, low-friction onboarding + delivery system with (1) a public “What to Expect” page and (2) an intake form link, then (3) standardized emails that always include the business legitimacy URL and the support email.

Business legitimacy + support (must appear in every client-facing message)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support email: agent_bob_replit+clip-factory@agentmail.to

A) NOTION: Create + Publish the “What to Expect” Page (Free Plan)
Account identity to use:
- Name: Bob Smith
- Email: agent_bob_replit@agentmail.to

Steps (exact):
1) Go to https://www.notion.so/ and choose “Sign up”. Use agent_bob_replit@agentmail.to.
2) Create workspace name: “Clip Factory”. Name: Bob Smith.
3) Create a new page titled exactly: “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”.
4) Paste in the full page copy you already have (from the prior artifact). Ensure it includes:
   - QA standards (captions, safe zones, framing, audio leveling)
   - Review flow (timestamp comments, 24h revision window)
   - Delivery pack contents (MP4 + SRT + b-roll cue sheet + posting suggestions)
   - Revision policy + scope boundaries
   - Support email + website URL at top and bottom
5) Publish the page: top-right “Share” → toggle “Publish” / “Share to web” ON.
6) Under publish settings:
   - Allow duplicate: OFF
   - Search engine indexing: OFF (optional, recommended early)
7) Copy the public URL (this becomes: {NOTION_ONBOARDING_LINK}).
8) Quick QA: open the URL in an incognito/private window to confirm it loads without login.

B) GOOGLE FORM: Create Client Intake Form (Free)
If you can create a Google account with agent_bob_replit@agentmail.to, do so; otherwise use any available internal Google account later. Goal: produce {GOOGLE_FORM_LINK}.

Steps (exact):
1) Go to https://forms.google.com and sign in.
2) Click “Blank form”. Title: “Clip Factory — Client Intake”. Description line 1: “This helps us generate clips that match your brand and platform.”
3) Settings (gear icon):
   - Responses: Collect email addresses = ON
   - Require sign-in = OFF (important)
   - Limit to 1 response = OFF
   - Allow response editing = ON (optional)
   - Show link to submit another response = OFF
4) Build sections (recommended):

Section 1 — Basics
Q1 (Required): Your name
Q2 (Required): Brand / Channel name
Q3 (Required): Primary email (if not same as collected)
Q4 (Optional): Website URL

Section 2 — Source Content
Q5 (Required, multiple choice): Content type
- Podcast (audio)
- Podcast (video)
- YouTube video
- Webinar/training
- Interview
- Other
Q6 (Required): Link to source file or folder (Drive/Dropbox/etc.)
Q7 (Optional): Episode title + time range to focus (e.g., 12:40–18:10)

Section 3 — Platforms & Formatting
Q8 (Required, checkboxes): Platforms you want clips for
- TikTok (9:16)
- Instagram Reels (9:16)
- YouTube Shorts (9:16)
Q9 (Required, multiple choice): Caption style
- Word-by-word (karaoke)
- Sentence/phrase chunks
- Minimal captions
Q10 (Required, multiple choice): Caption placement preference
- Lower third
- Center (mid)
- Dynamic (varies)

Section 4 — Brand Voice & CTA
Q11 (Required, multiple choice): Tone
- Educational
- High-energy
- Calm/authority
- Funny/light
- Direct/contrarian
Q12 (Required): Call-to-action (CTA) you want included (e.g., “Follow for more”, “Link in bio”, “Comment ‘GUIDE’”)
Q13 (Optional): Offer / lead magnet URL

Section 5 — Compliance / Do-Not-Do
Q14 (Required): Words/phrases to avoid (or “None”)
Q15 (Required): Topics to avoid (or “None”)
Q16 (Optional): Competitors to avoid mentioning

Section 6 — Handles & Hashtags
Q17 (Required): Your @handles for each platform (TikTok/IG/YT)
Q18 (Optional): Hashtags to include (or “None”)

Section 7 — Review & Deadline
Q19 (Required, multiple choice): Preferred review method
- Unlisted YouTube review link
- Vimeo review link
- Frame.io review link
Q20 (Optional): Deadline (date/time + timezone)
Q21 (Required, checkbox): Agreement
- “I understand there is a 24-hour revision window after first delivery, and revisions cover fixes (captions/framing/audio) not new creative direction.”

5) Click “Send” → Link icon → copy short URL. This becomes {GOOGLE_FORM_LINK}.
6) QA: open link in incognito and confirm:
   - no login required
   - required questions enforce correctly

C) Paste Live Links into Client Emails (replace placeholders)
Replace:
- {NOTION_ONBOARDING_LINK} with public Notion URL
- {GOOGLE_FORM_LINK} with public Google Form URL

Email Template 1 — Intake / Next Steps (Send immediately after prospect says “yes”)
Subject: Clip Factory — next step: quick intake (5 min)

Hi {ClientName},

Welcome — excited to spin up your first batch of short-form clips.

To keep turnaround fast and avoid back-and-forth, please fill out this quick intake form (5 minutes):
{GOOGLE_FORM_LINK}

What to expect (QA standards, review flow, delivery pack, revisions):
{NOTION_ONBOARDING_LINK}

For legitimacy/overview, here’s our site:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

If anything breaks or you want to add context, reply here or email: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

Email Template 2 — Pre-Flight Confirmation (Send when intake received, before editing starts)
Subject: Clip Factory — pre-flight check (please confirm)

Hi {ClientName},

Got your intake — thank you. Here’s what we’re producing for this batch:
- Platforms: {Platforms}
- Caption style/placement: {CaptionStyle}/{Placement}
- Tone: {Tone}
- CTA: {CTA}
- Avoid list: {AvoidWords}
- Source link: {SourceLink}

Quick confirm (reply with “Approved” or edits):
1) Any required branding colors/fonts/logo placement?
2) Any “do-not-clip” segments/timecodes?
3) Any compliance notes (medical/financial claims, etc.)?

What to expect + revision window details:
{NOTION_ONBOARDING_LINK}

Support: agent_bob_replit+clip-factory@agentmail.to | Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob

Email Template 3 — Delivery Email (First delivery + review link)
Subject: Your clips are ready — review link inside (24h revisions)

Hi {ClientName},

Your clips are ready for review.

1) Review link (timestamp comments):
{ReviewLink}

2) Delivery pack (download folder):
{DriveFolderLink}

Included in the delivery pack:
- Final MP4 clips (vertical 9:16)
- Captions file(s) (.SRT)
- B-roll cue sheet (timecoded suggestions)
- Posting suggestions (first-line caption ideas + hashtags)

Revision window: 24 hours from now ({RevisionDeadlineTimezone}). Please leave timestamp comments in the review link for fastest turnaround.

Process details (QA standards + what revisions cover):
{NOTION_ONBOARDING_LINK}

Support: agent_bob_replit+clip-factory@agentmail.to
Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob

Email Template 4 — Revision Received (Acknowledgment)
Subject: Revisions received — we’re on it

Hi {ClientName},

Received your revision notes — thank you. We’re working through the timestamp comments now.

If anything is unclear, we’ll reply with a quick question before changing the edit.

Reminder: the revision window is 24 hours from initial delivery, and it covers fixes like caption accuracy, timing, framing/safe zones, audio leveling, and small pacing adjustments.

Support: agent_bob_replit+clip-factory@agentmail.to | Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob

Email Template 5 — Revision Completed (Handoff)
Subject: Revisions complete — updated files delivered

Hi {ClientName},

Revisions are complete. Updated files are now in your delivery folder:
{DriveFolderLink}

If you’re reviewing via the same link, the latest versions are:
- {UpdatedClipNames}

Anything else within the revision window, just drop timestamp comments and we’ll handle it.

Support: agent_bob_replit+clip-factory@agentmail.to
Site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob

Operational Notes (internal):
- Always verify public accessibility: Notion page opens in incognito; Google Form opens without sign-in.
- Store the two live links in a pinned internal doc + as canned snippets for fast insertion.
- Start the 24-hour revision timer at the moment Delivery Email is sent.
- If client asks for new creative direction after approval (new hooks/topics, new clip selection, new brand style), route to “paid change” (week 2+). During free launch week, treat as “defer to next batch” unless it’s tiny and protects relationship.
