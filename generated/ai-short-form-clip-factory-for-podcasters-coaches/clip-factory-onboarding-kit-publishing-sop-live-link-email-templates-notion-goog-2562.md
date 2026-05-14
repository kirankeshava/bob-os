# Clip Factory — Onboarding Kit Publishing SOP + Live-Link Email Templates (Notion + Google Form)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-05-14T05:33:33.720Z

---

## 0) Canonical references (use in every client-facing asset)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact email: agent_bob_replit+clip-factory@agentmail.to

---

## 1) Notion page: creation + publishing SOP (free tier)
**Goal:** A single public page clients can read any time: QA standards, review process, delivery pack, revision rules.

### A. Create account / workspace
1. Go to Notion and sign up (free) using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2. Create a workspace name: **Clip Factory**.

### B. Create the page (structure)
Create a new page titled: **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**
Use these section headings in this exact order:
1) Overview (what you’ll receive)
2) What we need from you (intake)
3) QA standards (captions, framing, audio, hook, export)
4) Review flow (timestamp comments)
5) Delivery pack contents (MP4/SRT/b-roll cues/posting suggestions)
6) Revisions (24-hour window + what’s included)
7) File naming + versioning (what clients will see)
8) Contact + help

### C. Publish publicly
1. Open Share settings.
2. Toggle **“Publish to web”** ON.
3. Ensure access is **Anyone with the link can view**.
4. Copy the public URL and store it as:
   - **NOTION_ONBOARDING_URL = [PASTE LINK]**

### D. Update cadence
- Only update the Notion doc between client deliveries (avoid changing rules mid-review).
- If policy changes, add a dated note at the top: “Updated: YYYY-MM-DD”.

---

## 2) Google Form: creation + settings SOP (free)
**Goal:** A low-friction intake form that prevents avoidable revisions.

### A. Create the account (if needed)
- If you don’t already have a Google account for Bob, create one using agent_bob_replit@agentmail.to.

### B. Form settings (important)
In Google Forms Settings:
- Collect email addresses: **ON** (reduces confusion)
- Limit to 1 response: **OFF** (clients may submit updates)
- Edit after submit: **ON** (reduces back-and-forth)
- Confirmation message: include next steps + expected timeline

### C. Form build: exact copy to paste
**Form title:** Clip Factory — Clip Intake

**Form description (paste):**
Thanks for using Clip Factory. This intake helps us cut clips that match your style and avoid revisions. If anything changes after submitting, you can edit your response (link at the end) or email us: agent_bob_replit+clip-factory@agentmail.to. Legitimacy/info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

**Questions (with types + required):**
1) *Your name* (Short answer) — Required
2) *Brand / channel name* (Short answer) — Required
3) *Best email for delivery + review* (Short answer; or use collected email) — Required
4) *Link to the full video/podcast episode* (Short answer) — Required
5) *What platforms are these clips for?* (Checkboxes) — Required
   - TikTok
   - Instagram Reels
   - YouTube Shorts
   - LinkedIn
   - Other (short answer)
6) *Desired clip count* (Multiple choice) — Required
   - 3
   - 5
   - 8
   - 10
   - Other (short answer)
7) *Target clip length* (Multiple choice) — Required
   - 15–25s
   - 25–35s
   - 35–60s
   - Mixed
8) *Content tone* (Multiple choice) — Required
   - High energy / punchy
   - Calm / authoritative
   - Educational / structured
   - Storytelling
9) *Primary CTA (call to action)* (Multiple choice) — Required
   - Follow/Subscribe
   - Comment
   - Visit website
   - Book a call
   - Download lead magnet
   - Other (short answer)
10) *Your handle(s) to include on-screen* (Short answer) — Required
11) *Any words/topics to avoid (banned list)* (Paragraph) — Optional
12) *Caption style preference* (Multiple choice) — Required
   - Clean (minimal emojis)
   - Bold/creator style
   - Keyword-highlighted
13) *Brand rules (if any)* (Paragraph) — Optional (fonts/colors/emoji rules)
14) *Examples you like (links)* (Paragraph) — Optional
15) *Must-include moments (timestamps)* (Paragraph) — Optional
16) *Must-avoid moments (timestamps)* (Paragraph) — Optional

**Confirmation message (paste):**
Submitted—thank you. Next, we’ll confirm your requirements and send a review link. During review, leave timestamp comments in the review tool. Revisions are available for 24 hours after delivery. Questions: agent_bob_replit+clip-factory@agentmail.to

After publishing, copy the share link and store it as:
- **GOOGLE_FORM_URL = [PASTE LINK]**

---

## 3) Live-link insertion block (paste once into templates)
Replace placeholders in every template with the live links:
- Onboarding/expectations: **NOTION_ONBOARDING_URL**
- Intake form: **GOOGLE_FORM_URL**

---

## 4) Client email templates (ready to use)
### 4.1 Intake — send immediately after first contact
**Subject:** Clip Factory — quick intake (so we match your style)

Hi {{FirstName}},

To make sure we cut clips that match your tone + platform, please fill out this 2–4 minute intake form:
{{GOOGLE_FORM_URL}}

Here’s what to expect (QA standards, review flow, delivery pack, revisions):
{{NOTION_ONBOARDING_URL}}

If you prefer email, you can reply with the same info instead.

— Bob
Clip Factory
agent_bob_replit+clip-factory@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

### 4.2 Pre-flight confirmation — send after intake is received
**Subject:** Clip Factory — confirmed: platforms + style + delivery format

Hi {{FirstName}},

Confirmed for this batch:
- Platforms: {{Platforms}}
- Clip count / length: {{CountAndLength}}
- Caption style: {{CaptionStyle}}
- CTA: {{CTA}}
- Handles: {{Handles}}
- Avoid list: {{AvoidListOrNone}}

Next step: we’ll cut and QA the clips, then send a single review link for timestamp comments.

If anything above is wrong, reply within {{PreFlightWindow}} so we don’t waste a revision cycle.

— Bob (Clip Factory)
agent_bob_replit+clip-factory@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

### 4.3 Delivery + review link — send when clips are ready
**Subject:** Clip Factory — clips ready for review (24h revisions)

Hi {{FirstName}},

Your clips are ready. Please review here and leave **timestamp comments**:
Review link: {{REVIEW_LINK}}

Delivery pack (download): {{DRIVE_FOLDER_LINK}}
Included:
- Final MP4 clips (vertical)
- Caption files (.SRT)
- B-roll cue sheet (per clip)
- Posting suggestions (first-line caption + hashtags)

Revision window: **24 hours** from now (until {{REVISION_DEADLINE}}). For fastest turnaround, please consolidate feedback into one pass and use timestamped notes.

What to expect / QA / revision policy:
{{NOTION_ONBOARDING_URL}}

— Bob
agent_bob_replit+clip-factory@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

### 4.4 Revision received (ack)
**Subject:** Clip Factory — revision notes received

Hi {{FirstName}},

Got your revision notes—thank you. We’re working through them now.

Reminder: revisions are included for issues tied to the confirmed requirements (captions accuracy, framing/safe zones, audio levels, timing/jump cuts, hook clarity). New creative direction or new clip selection may require a new batch.

We’ll send the updated files as soon as they’re ready, within the revision window ending {{REVISION_DEADLINE}}.

— Bob (Clip Factory)
agent_bob_replit+clip-factory@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

### 4.5 Revision completed (handoff)
**Subject:** Clip Factory — revisions completed (updated files inside)

Hi {{FirstName}},

Revisions are completed.

Updated files:
- Review link (updated): {{REVIEW_LINK_UPDATED}}
- Download folder: {{DRIVE_FOLDER_LINK}}

If anything looks off relative to the confirmed requirements, reply within the remaining window (until {{REVISION_DEADLINE}}) with timestamp notes.

— Bob
agent_bob_replit+clip-factory@agentmail.to
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

---

## 5) Fallback if Notion or Google can’t be used
- Host “What to Expect” as a simple page on the existing Replit site and link that instead of Notion.
- Collect intake via email using the exact Google Form questions (clients can reply inline).