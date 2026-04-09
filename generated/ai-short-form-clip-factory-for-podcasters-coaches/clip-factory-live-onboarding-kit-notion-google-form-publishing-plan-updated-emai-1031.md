# Clip Factory — Live Onboarding Kit (Notion + Google Form Publishing Plan) + Updated Email Templates

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:03:38.206Z

---

## 1) Notion Page (Client-Facing) — Final Structure + Paste-Ready Copy

**Page title:** Clip Factory — What to Expect (QA, Review, Delivery, Revisions)

**Top banner (first lines of page):**
Welcome to Clip Factory. This page explains exactly how we edit, how you review, what you receive, and what counts as a revision.

**Legitimacy + contact:**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact: agent_bob_replit+clip-factory@agentmail.to

### A) What you’ll receive (Delivery Pack)
For each batch, you’ll receive a folder containing:
1) **Final vertical MP4 clips** (ready-to-post)
2) **SRT caption files** (one per clip)
3) **B-roll / on-screen cue sheet** (timecoded suggestions)
4) **Posting suggestions** per clip (first-line caption + hashtag set + recommended platform)

### B) Our QA standards (what we check before you ever see it)
We run a final QC pass on every clip:
- **Safe zones:** captions + key text kept within platform-safe areas; no UI overlap risk
- **Framing:** no cropped faces; subject centered; punch-ins don’t cut chins/foreheads
- **Captions:** accuracy prioritized; speaker names/terms spelled correctly; line breaks readable
- **Audio:** voice normalized; no harsh peaks; noise reduction used carefully (no artifacts)
- **Pacing:** clean jump cuts; removed dead air; hook is clear within first 1–2 seconds
- **Platform formatting:** 9:16 vertical; correct bitrate; crisp text rendering

### C) Review process (timestamp comments)
You’ll receive a **review link** (Frame.io / Vimeo / unlisted YouTube) where you can leave **timestamped comments**.
**How to request revisions:**
- Leave comments directly on the video at the exact timestamp
- If multiple changes, number them (1,2,3) to avoid misses
- Confirm whether changes apply to **one clip** or the **whole batch**

### D) Revision window (protects speed + schedule)
- You have **24 hours** after delivery to request revisions via timestamped comments.
- After 24 hours, we can still help, but it may be scheduled as a **paid change** depending on scope.

### E) What counts as a free revision vs. paid change
**Free revisions (included):**
- Fixing caption mistakes (misheard words, typos)
- Small timing tweaks (caption sync, cut timing)
- Audio leveling fixes (if clearly inconsistent)
- Framing/safe-zone corrections (if we missed it)
- Implementing a request that matches the approved intake (brand style, CTA, banned words)

**Paid changes (scope change):**
- Changing the hook concept or rewriting the clip’s angle after delivery
- Swapping to entirely different timestamps/segments not originally selected
- Adding new brand elements not provided at intake (logos/fonts/templates)
- Major style shift (e.g., “make it like X creator”) after work is completed
- Additional aspect ratios/exports beyond what was agreed

### F) Turnaround + communication
- We confirm requirements before editing begins.
- We deliver by the agreed deadline.
- We acknowledge revision requests promptly and close the loop when updates are posted.

---

## 2) Publish Steps — Notion (Free)
Use these steps to generate a live URL that clients can open without requesting access.

1) Create/login Notion account using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2) Create a new page titled: **Clip Factory — What to Expect (QA, Review, Delivery, Revisions)**
3) Paste the copy from Section 1.
4) Click **Share → Publish** (or “Publish to web”).
5) Settings:
   - **Allow search engines:** OFF (recommended early)
   - **Duplicate as template:** OFF
   - **Edit access:** OFF
6) Copy the public URL.
7) Test in an incognito/private window to confirm: no login required, page loads, links visible.

**Link testing checklist:**
- Page loads without a Notion login prompt
- Website + contact email are visible at the top
- Sections A–F are present (no missing policy language)

---

## 3) Google Form — Build Spec (Client Intake)
**Form title:** Clip Factory — Client Intake (Clips + Brand + Platforms)
**Form description:** This form captures everything we need to edit your clips correctly the first time.

### Required fields (exact prompts)
1) **Your name** (short answer) — Required
2) **Your email** (short answer) — Required
3) **Brand / channel name** (short answer) — Required
4) **Primary platforms** (checkboxes) — Required
   - TikTok
   - Instagram Reels
   - YouTube Shorts
   - LinkedIn
   - Other (short answer)
5) **Target audience in 1 sentence** (paragraph) — Required
6) **Your tone** (multiple choice) — Required
   - High-energy / punchy
   - Calm / authoritative
   - Educational
   - Storytelling
   - Other (short answer)
7) **CTA preference** (multiple choice) — Required
   - Follow for more
   - Visit link in bio
   - Comment a keyword
   - DM me
   - None
8) **Your @handles + links to include** (paragraph) — Required
9) **Banned words/topics** (paragraph) — Optional
10) **Caption style** (multiple choice) — Required
   - Clean (minimal emojis)
   - Emoji light
   - Emoji heavy
11) **On-screen text preferences** (checkboxes) — Required
   - Hook text at start
   - Key phrase emphasis
   - None
12) **Brand assets link** (short answer URL) — Optional
   (Logo pack, font, colors, examples)
13) **Source content link(s)** (paragraph) — Required
   (Drive/Dropbox/YouTube link or upload instructions)
14) **Must-include moments (timestamps)** (paragraph) — Optional
15) **Do-not-use moments (timestamps)** (paragraph) — Optional
16) **Examples you like (links)** (paragraph) — Optional

### Form settings (to prevent ops failures)
- Collect email addresses: ON (if available)
- Allow response edits: OFF
- Confirmation message:
  “Thanks—received. If anything is unclear we’ll email you at the address provided. For expectations and revision policy, see our What to Expect page.”

---

## 4) Publish Steps — Google Form (Free)
1) Create/login Google account with:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2) Go to Google Forms → New form → paste questions above.
3) Settings:
   - Responses: ON
   - Limit to 1 response: OFF
   - Restrict to users in org: OFF
4) Send → Link icon → copy URL.
5) Test in incognito: confirm anyone can access and submit.

---

## 5) Updated Client Email Templates (with link placeholders)

### A) Intake Confirmation Email (send after payment/intake started)
Subject: Clip Factory — Intake received + next steps

Hi {{ClientName}},

Thanks—intake received. Before we start editing, please review our process and revision policy here:
{{NOTION_WHAT_TO_EXPECT_LINK}}

If you haven’t filled out the intake form yet, please do so here:
{{GOOGLE_FORM_INTAKE_LINK}}

What happens next:
1) We confirm platforms, tone, CTA, and any banned words/topics
2) We edit your clips using our QA checklist (captions, safe zones, audio, pacing)
3) You’ll receive a review link for timestamped comments

If anything is time-sensitive (launch dates, promos), reply here and we’ll prioritize accordingly.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

—Bob


### B) Delivery Email (review link + delivery pack)
Subject: Your Clip Factory delivery is ready — review link inside

Hi {{ClientName}},

Your clips are ready.

1) Review here (leave timestamped comments):
{{REVIEW_LINK}}

2) Download Delivery Pack folder:
{{DELIVERY_FOLDER_LINK}}

Delivery Pack includes:
- Final MP4 clips (vertical)
- SRT caption files (per clip)
- B-roll / on-screen cue sheet
- Posting suggestions (first-line caption + hashtags)

Revision window:
Please leave all revision requests within **24 hours** using timestamped comments on the review link.
Policy + what to expect:
{{NOTION_WHAT_TO_EXPECT_LINK}}

If you have any trouble accessing links, reply to this email and we’ll fix permissions fast.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

—Bob


### C) Revision Received (Acknowledgment)
Subject: Revisions received — we’re on it

Hi {{ClientName}},

Got your revision notes—thank you. We’ll implement the timestamped comments and reply as soon as the updated version is posted.

Reminder: revisions are handled via timestamped comments on your review link:
{{REVIEW_LINK}}

Policy reference:
{{NOTION_WHAT_TO_EXPECT_LINK}}

—Bob


### D) Revision Completed (Handoff)
Subject: Revisions completed — updated clips posted

Hi {{ClientName}},

Revisions are complete.

Updated review link:
{{REVIEW_LINK}}

Updated Delivery Pack folder (final exports + SRT + cue sheet + posting suggestions):
{{DELIVERY_FOLDER_LINK}}

If you need any additional changes beyond the original scope, reply with details and we’ll quote it before starting.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

—Bob

---

## 6) Final “No Broken Links” QC (do this every time)
Before sending any intake/delivery email:
1) Open {{NOTION_WHAT_TO_EXPECT_LINK}} in incognito → confirm public access
2) Open {{GOOGLE_FORM_INTAKE_LINK}} in incognito → confirm submit works
3) Open {{REVIEW_LINK}} in incognito → confirm can view + comment instructions are clear
4) Open {{DELIVERY_FOLDER_LINK}} in incognito → confirm download permission

This prevents the most common early-stage refund trigger: clients being unable to access what they paid for.
