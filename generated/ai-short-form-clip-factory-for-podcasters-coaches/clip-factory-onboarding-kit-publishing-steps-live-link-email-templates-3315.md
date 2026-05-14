# Clip Factory — Onboarding Kit (Publishing Steps + Live-Link Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T23:01:49.518Z

---

# Clip Factory — Onboarding Kit (Publishing Steps + Live-Link Email Templates)

Business proof URL (share with customers): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3  
Business contact email: agent_bob_replit+clip-factory@agentmail.to

---

## 1) Publish the “What to Expect” page on Notion (free)

### Goal
Create a single public page clients can read anytime that explains QA standards, review flow, delivery pack contents, and revisions—so expectations are locked before editing and refunds drop.

### Steps (exact)
1. Go to https://www.notion.so/ and create/login to an account using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2. Create a new page titled:
   - **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**
3. Paste in the previously prepared page copy (from the existing artifact) and ensure these items are included:
   - Review method (timestamp comments)
   - 24-hour revision window
   - Delivery pack contents (MP4 + SRT + b-roll cue sheet + posting suggestions)
   - Revision triage rules (free vs paid changes)
   - Business proof URL + contact email
4. Publish:
   - Click **Share** → toggle **Publish to web** ON
   - Enable **Allow comments** OFF (we want timestamped comments on the video review link, not on Notion)
   - Enable **Search engine indexing** OFF (optional; keep private/unlisted)
5. Copy the public URL. This becomes:
   - **{NOTION_WHAT_TO_EXPECT_LINK}**

### Where to use
Add {NOTION_WHAT_TO_EXPECT_LINK} to:
- Intake email
- Pre-flight confirmation
- Delivery email
- Revision acknowledgment emails

---

## 2) Create the Client Intake Form in Google Forms (free)

### Goal
Standardize requirements before editing to prevent avoidable revisions (branding, cropped faces, banned words, CTA mismatches, platform specs).

### Steps (exact)
1. Create/login to a Google account using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to (if available) or a Google-compatible alias for Bob under the same inbox.
2. Go to https://forms.google.com → **Blank form**
3. Form title:
   - **“Clip Factory — Client Intake (Short-Form Clips)”**
4. Build questions (set Required = Yes unless noted):

**A) Contact & Links**
1) Your name (Short answer)
2) Your email for delivery (Short answer)
3) Link to the long-form source (Google Drive/Dropbox/YouTube/Vimeo) (Short answer)
4) Are there multiple episodes/files? (Multiple choice: Yes / No)
5) If yes, list links (Paragraph) (Required only if #4 = Yes)

**B) Platforms & Formatting**
6) Primary platforms (Checkboxes): TikTok, Instagram Reels, YouTube Shorts, LinkedIn, Other
7) Output ratio (Multiple choice): 9:16 only (recommended) / Also want 1:1 / Also want 16:9
8) Safe area preference (Multiple choice): Keep text within “Reels safe zones” / Aggressive (bigger captions OK)

**C) Brand & Style**
9) Brand handles to include (Short answer) (Optional)
10) Website/CTA link (Short answer) (Optional)
11) Tone (Multiple choice): Clean & professional / High-energy creator / Minimalist / Other (with short answer)
12) Caption style (Multiple choice): Word-by-word karaoke / Sentence chunks / Mixed

**D) Content Constraints**
13) Banned words/topics (Paragraph) (Optional)
14) Must-include phrases (Paragraph) (Optional)
15) Competitors to avoid mentioning (Paragraph) (Optional)

**E) Clip Strategy**
16) Primary goal (Multiple choice): Leads / Followers / Sales / Podcast growth / Authority
17) CTA style (Multiple choice): Soft (follow/learn more) / Medium (DM/comment) / Hard (book a call/buy)
18) Hook aggressiveness (Multiple choice): Conservative / Standard / Bold
19) Number of clips requested (Short answer)
20) Preferred clip length (Multiple choice): 15–30s / 30–45s / 45–60s / 60–90s

**F) Approval**
21) I confirm I own rights / have permission to edit and publish this content (Checkbox)
22) I understand the standard revision window is 24 hours after delivery (Checkbox)

5. Settings:
   - Collect email addresses: ON (optional if you already ask email)
   - Limit to 1 response: OFF
6. Send:
   - Click **Send** → Link icon → Shorten URL → Copy.
   - This becomes **{GOOGLE_INTAKE_FORM_LINK}**

---

## 3) Onboarding Kit Links Block (paste into emails)

**Quick Links (Clip Factory)**
- What to Expect (QA, review, delivery, revisions): {NOTION_WHAT_TO_EXPECT_LINK}
- Client Intake Form (required to start): {GOOGLE_INTAKE_FORM_LINK}
- Business proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact: agent_bob_replit+clip-factory@agentmail.to

---

## 4) Email Templates (link-ready)

### 4.1 Intake / Start Here (send immediately after agreement)
Subject: Clip Factory — intake form + what to expect

Hi {{FirstName}},

To start your Clip Factory batch, please complete the intake form here:
{GOOGLE_INTAKE_FORM_LINK}

Here’s exactly what to expect (QA standards, review flow, delivery pack, and revision policy):
{NOTION_WHAT_TO_EXPECT_LINK}

Business proof page (for your records):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

If you have any constraints (banned words, branding rules, “do not crop faces,” etc.), please include them in the intake form so we can lock them in before editing.

— Bob
agent_bob_replit+clip-factory@agentmail.to


### 4.2 Pre-Flight Confirmation (send after intake review, before editing)
Subject: Clip Factory — pre-flight check (please confirm)

Hi {{FirstName}},

We’ve reviewed your intake and are ready to begin. Please confirm these items so we don’t lose time to avoidable revisions:

1) Platforms: {{Platforms}}
2) Caption style: {{CaptionStyle}}
3) CTA: {{CTA}}
4) Any banned words/topics: {{BannedWordsOrNone}}
5) Branding/handles: {{HandlesOrNone}}

Once you reply “Confirmed,” we start editing.

Reference: {NOTION_WHAT_TO_EXPECT_LINK}

— Bob
agent_bob_replit+clip-factory@agentmail.to


### 4.3 Delivery Email (final pack + review link + revision deadline)
Subject: Your clips are ready — review link + delivery pack

Hi {{FirstName}},

Your Clip Factory delivery is ready.

1) Review link (leave timestamp comments on the video): {{REVIEW_LINK}}
2) Delivery folder (MP4 + SRT + cue sheet + posting suggestions): {{DELIVERY_FOLDER_LINK}}

What’s included:
- Final vertical MP4s (ready to post)
- Caption files (SRT)
- B-roll cue sheet (per clip)
- Posting suggestions (first-line caption + hashtags + hook notes)

Revision window:
Please send any revision notes within **24 hours** (by {{REVISION_DEADLINE_LOCAL_TIME}}). Use timestamp comments on the review link to keep revisions fast and unambiguous.

Policy reference (QA/review/revisions): {NOTION_WHAT_TO_EXPECT_LINK}
Business proof page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob
agent_bob_replit+clip-factory@agentmail.to


### 4.4 Revision Received (ack)
Subject: Revisions received — we’re on it

Hi {{FirstName}},

Got your revision notes—thank you.

We’re applying the requested changes now. If anything is unclear, we’ll reply with specific questions tied to timestamps so we don’t waste your time.

Reminder: the standard revision window is 24 hours after delivery (policy here):
{NOTION_WHAT_TO_EXPECT_LINK}

— Bob
agent_bob_replit+clip-factory@agentmail.to


### 4.5 Revision Completed (handoff)
Subject: Revisions complete — updated files delivered

Hi {{FirstName}},

Revisions are complete.

Updated review link: {{UPDATED_REVIEW_LINK_OR_SAME}}
Updated delivery folder: {{DELIVERY_FOLDER_LINK}}

If everything looks good, you’re ready to post. If you want help choosing posting order or batching strategy, reply with your preferred schedule and we’ll suggest an order.

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

## 5) Internal rule: when to request a new scope (protect reputation)
Use this quick rule during review:
- If client requests fixes to errors vs spec (caption typos, missed safe zones, audio clipping, mis-synced captions): treat as **free correction**.
- If client requests style changes not specified in intake (new fonts, new branding, new structure, different hook style) after delivery: treat as **scope change**. In Week 1 we can still do it as a “one-time courtesy,” but label it clearly to prevent expectation-setting.

---

## 6) Final checklist before sending any delivery email
- Review link opens without login and allows timestamp comments (or instructions provided).
- Delivery folder permissions: “Anyone with link can view” (or client’s email explicitly added).
- File names consistent (Clip01_Title_platform_9x16.mp4, matching .srt).
- Delivery pack contains MP4s + SRTs + cue sheet + posting suggestions.
- Revision deadline included in email (with local time zone if possible).

This completes the operational handoff layer; once {NOTION_WHAT_TO_EXPECT_LINK} and {GOOGLE_INTAKE_FORM_LINK} are real URLs, the system is live.
