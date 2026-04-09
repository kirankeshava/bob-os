# Clip Factory — Live Onboarding Kit (Publishing Runbooks + Final Email Templates w/ Link QA)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:29:58.547Z

---

Below is the final “Live Onboarding Kit” your ops/editor team uses every time. It includes (1) how to publish the Notion onboarding page and get a public URL, (2) how to build/publish the Google Form intake and get a share URL, (3) final client email templates with the required business website + contact email, and (4) a mandatory link/permission QA to prevent access-related refunds.

==============================
A) NOTION: PUBLISH “WHAT TO EXPECT” PAGE (FREE)
==============================
Goal: Create one public, view-only page clients can read without requesting access.

Steps (Bob / agent_bob_replit@agentmail.to):
1) Go to https://www.notion.so/ and create/login to an account.
2) Create a new page titled: “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”.
3) Paste in the pre-written page copy (from the prior artifact) and keep headings intact.
4) Add the business legitimacy block near top or bottom:
   - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   - Contact: agent_bob_replit+clip-factory@agentmail.to
5) Publish:
   - Click “Share” (top right)
   - Toggle: “Publish to web” = ON
   - Permissions: ensure “Allow editing” = OFF, “Allow comments” = OFF (clients should comment in Frame.io/Vimeo/YouTube timestamps, not on the doc)
   - If Notion shows “Search engine indexing”: set OFF (optional, reduces random traffic)
6) Copy the public URL. This becomes:
   {{NOTION_ONBOARDING_URL}}

Notion Publish QA (must do before sending to client):
- Open the URL in an incognito/private browser window.
- Confirm it loads with no login prompt.
- Confirm the page is view-only (no edit controls).
- Confirm website + contact email are visible on the page.

==============================
B) GOOGLE FORM: BUILD CLIENT INTAKE + GET SHARE LINK (FREE)
==============================
Goal: One intake form that prevents avoidable revisions by capturing platforms, style, CTA, banned words, handles, and formatting constraints.

Steps (Bob / agent_bob_replit@agentmail.to):
1) Create/login Google account at https://accounts.google.com/ (free).
2) Go to https://forms.google.com/ → “Blank form”.
3) Title: “Clip Factory — Client Intake (Short-Form Clips)”.
4) Description (paste):
   “This intake helps us match your tone, formatting, and platform needs. After you submit, we’ll confirm requirements before editing begins. If you have questions, email agent_bob_replit+clip-factory@agentmail.to. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”
5) Build questions (use required toggles as noted). Use the previously defined spec; minimum required fields:
   REQUIRED:
   - Name
   - Brand/Channel name
   - Email
   - Primary platform(s): TikTok / IG Reels / YouTube Shorts / LinkedIn / Other
   - Clip goal: leads / awareness / followers / webinar / sales / other
   - Tone: punchy / educational / empathetic / premium / high-energy / other
   - CTA + link destination
   - On-screen captions style preference (or “choose for me”)
   - Banned words/topics + compliance constraints
   - Handles to tag (IG/TikTok/YouTube)
   - Source content link upload option (Drive link) and/or “We will provide files separately”
   OPTIONAL but recommended:
   - Example creators you like (links)
   - Brand colors/fonts (if applicable)
   - Pronunciation notes for names/terms
6) Go to “Responses” tab → enable “Link to Sheets” (optional but recommended) to track submissions.
7) Click “Send” → Link icon → copy share URL. This becomes:
   {{GOOGLE_FORM_URL}}

Google Form Publish QA:
- Open the link in incognito/private window.
- Submit a test response.
- Verify you can see the submission in Responses/Sheet.

==============================
C) LINK/PERMISSION QA (MANDATORY BEFORE ANY CLIENT EMAIL)
==============================
Refund-risk failure mode: client can’t access review link or delivery folder.

Before sending any onboarding or delivery email, confirm:
1) Notion onboarding URL opens in incognito without login.
2) Google Form opens in incognito and submits successfully.
3) Review link (Frame.io/Vimeo/YouTube) opens without requesting access OR the client’s email is explicitly invited.
4) Delivery folder permissions:
   - If Google Drive: set to “Anyone with the link can view” OR invite client email as Viewer.
   - Verify in incognito: you can view and download at least one MP4.
5) All links in the email are clickable and correct.

==============================
D) FINAL CLIENT EMAIL TEMPLATES (READY TO PASTE)
==============================

D1) Onboarding / Intake Email (send immediately after purchase)
Subject: Next step — Clip Factory intake + what to expect

Hi {{ClientName}},

Thanks for working with Clip Factory. To make sure your clips match your tone and platform requirements (and to avoid preventable revisions), please complete this intake form:
{{GOOGLE_FORM_URL}}

Here’s our “What to Expect” guide (QA standards, review process, delivery pack contents, and revision window):
{{NOTION_ONBOARDING_URL}}

If you have any questions, reply here or email us at agent_bob_replit+clip-factory@agentmail.to.

Website (for reference): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob
Clip Factory


D2) Pre-Flight Confirmation (send after intake is reviewed, before editing starts)
Subject: Confirming specs before we start editing (please reply)

Hi {{ClientName}},

Quick pre-flight confirmation before we begin:
- Platforms: {{Platforms}}
- Caption style: {{CaptionStyle}}
- Tone: {{Tone}}
- CTA + link: {{CTA}}
- Handles to tag: {{Handles}}
- Banned words/topics: {{Banned}}

Please reply “Confirmed” or send any changes within {{Hours}} hours so we can lock specs and start.

Questions anytime: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob


D3) Delivery Email (with review link + folder + revision deadline)
Subject: Your clips are ready — review link + downloads (24h revision window)

Hi {{ClientName}},

Your Clip Factory delivery is ready.

1) Review link (please leave timestamped comments):
{{REVIEW_LINK}}

2) Download folder (MP4s + SRT + cue sheets):
{{DELIVERY_FOLDER_LINK}}

What’s included in your Delivery Pack:
- Final vertical MP4 clips (ready-to-post)
- Caption files (SRT)
- B-roll cue sheet (where/why to add visuals)
- Posting suggestions (first-line caption + hashtag set per clip)

Revision window:
Please send revision notes within 24 hours using timestamped comments on the review link. After 24 hours, we can still help, but it may be treated as a new change request depending on scope.

Contact: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob
Clip Factory


D4) Revision Received (acknowledgment)
Subject: Revision notes received — we’re on it

Hi {{ClientName}},

Got your revision notes—thanks. We’re working through the timestamped comments now.

If anything is unclear, we’ll reply with 1–2 questions to confirm intent before updating.

Reminder: the fastest way to resolve revisions is timestamped notes on the review link:
{{REVIEW_LINK}}

Contact: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob


D5) Revision Completed (handoff)
Subject: Revisions completed — updated clips attached/posted

Hi {{ClientName}},

Revisions are complete.

Updated review link (if applicable):
{{REVIEW_LINK_UPDATED_OR_SAME}}

Updated download folder:
{{DELIVERY_FOLDER_LINK}}

Summary of changes:
- {{Change1}}
- {{Change2}}

If everything looks good, reply “Approved” and we’ll close out this delivery.

Contact: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob

==============================
E) WHERE THIS PROTECTS REPUTATION
==============================
- Clear intake → fewer preventable revisions.
- Public onboarding doc → fewer expectation gaps.
- Mandatory link QA → fewer “can’t access” complaints.
- Timestamped review requirement + 24h window → faster closes, fewer scope fights.

End of kit.
