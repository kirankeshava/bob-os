# Clip Factory — Live Onboarding Kit Runbook (Notion + Google Form) + Finalized Email Templates (Link-Ready)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T15:02:25.651Z

---

## 1) Notion “What to Expect” Page — Structure + Publish Runbook (Free)

### Goal
Create a single public page clients can read to understand exactly how Clip Factory works: QA standards, review flow, what gets delivered, revision window, and how to request changes. This page link should be included in every intake/onboarding email.

### Account + Page Creation (Operator Steps)
1) Go to https://www.notion.so/
2) Sign up free using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
3) Create a new page titled:
   **“Clip Factory — What to Expect (QA • Review • Delivery • Revisions)”**
4) Paste in your “What to Expect” content (from our previously drafted copy) with the headings in this order:
   - Overview (what we do)
   - What you send us (source file + goals)
   - QA Standards (captions, framing, audio, pacing, hook)
   - Review Flow (timestamp comments, 24h revision window)
   - Delivery Pack (MP4 + SRT + B-roll cue sheet + posting suggestions)
   - Revision Policy / Scope Boundaries
   - Contact + Response Times
   - Business legitimacy line:
     - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
     - Contact: agent_bob_replit+clip-factory@agentmail.to
5) Add a final section titled **“How to Leave Review Notes”**:
   - “Please leave timestamped comments in the review link (Frame.io/Vimeo/YouTube). If email, list timestamps like 00:12–00:18 and describe the change.”

### Publish to Web (Public Link)
1) Click **Share** (top right)
2) Toggle **Share to web** = ON
3) Ensure **Allow duplicate as template** = OFF (optional, but recommended)
4) Copy the public URL.
5) Save it as:
   - **NOTION_ONBOARDING_URL = [paste URL]**

### QA Note
Before publishing, confirm there is no client data in the page. This is a general “how it works” document.

---

## 2) Google Form — Client Intake Form Runbook (Free)

### Goal
Capture requirements up front so editing doesn’t start with missing info (which causes refunds/revisions). Form responses should map directly to the pre-flight checklist.

### Account
If a Google account does not exist, create one using:
- Name: Bob Smith
- Email: agent_bob_replit@agentmail.to

### Form Creation Steps
1) Go to https://forms.google.com
2) Create **Blank form**
3) Title:
   **“Clip Factory — Client Intake (Short-Form Clips)”**
4) Form description (paste):
   “This form ensures we match your brand, platforms, and compliance needs before editing starts. If anything changes after submission, email us at agent_bob_replit+clip-factory@agentmail.to.”

### Form Settings (Important)
- Collect email addresses: ON (recommended)
- Allow response editing: OFF (reduces confusion)
- Limit to 1 response: OFF (clients may have multiple episodes)
- Confirmation message (paste):
  “Thanks — we received your intake. Next: we’ll confirm your pre-flight checklist within 1 business day. Our process: (1) pre-flight confirmation, (2) first cut review link, (3) 24h revision window, (4) delivery pack. Details: [NOTION_ONBOARDING_URL].”

### Questions (Build Exactly)
**A) Basics**
1) Full name (Short answer, Required)
2) Best email for delivery/revisions (Short answer, Required)
3) Brand / Channel name (Short answer, Required)
4) Time zone (Dropdown, Required: PST / MST / CST / EST / GMT / Other)

**B) Source Content**
5) Link to source video/podcast (Short answer, Required)
   - Help text: “Drive/Dropbox/YouTube unlisted is fine.”
6) Source length (Multiple choice, Required): <15 min / 15–30 / 30–60 / 60+

**C) Platforms + Formatting**
7) Platforms you want clips for (Checkboxes, Required): TikTok / IG Reels / YouTube Shorts / LinkedIn / Other
8) Safe zone priority (Multiple choice, Required): “Maximize screen (tight crop)” / “Conservative safe zones (no UI overlap)”
9) Preferred on-screen caption style (Multiple choice, Required): Word-by-word / Line-by-line / Sentence-style

**D) Brand + Content Constraints**
10) Tone (Checkboxes, Required): Professional / High-energy / Calm / Bold / Funny / Other
11) Call-to-action (Short answer, Optional)
12) Banned words/topics (Paragraph, Optional)
13) Must-include phrases (Paragraph, Optional)
14) Competitors to avoid mentioning (Paragraph, Optional)

**E) Visual Notes**
15) Face framing preference (Multiple choice, Required): “Keep face centered” / “Show guest more” / “Alternate”
16) Any must-include B-roll themes (Paragraph, Optional)
17) Any must-avoid visuals (Paragraph, Optional)

**F) Deliverables + Review**
18) How many clips for this episode? (Multiple choice, Required): 3 / 5 / 8 / 10 / Other
19) Review method preference (Multiple choice, Required): Frame.io / Vimeo / YouTube unlisted
20) Anything else we should know? (Paragraph, Optional)

### Share Link
Click **Send** → Link icon → Copy link.
Save as:
- **GOOGLE_FORM_URL = [paste URL]**

---

## 3) Template Link Block (Paste Into Every Client Email)

**Clip Factory Onboarding + Intake Links**
- What to expect (QA, review, delivery, revisions): **[NOTION_ONBOARDING_URL]**
- Client intake form (required before editing starts): **[GOOGLE_FORM_URL]**
- Business website (legitimacy): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support: agent_bob_replit+clip-factory@agentmail.to

---

## 4) Final Email Templates (Link-Ready)

### 4.1 Intake / Onboarding Email (Send Immediately After Purchase)
Subject: Clip Factory — Next step: intake form + what to expect

Hi {{FirstName}},

Thanks for choosing Clip Factory. To start editing, please complete the intake form here:
{{GOOGLE_FORM_URL}}

Here’s our full process (QA standards, review flow, delivery pack, revision policy):
{{NOTION_ONBOARDING_URL}}

Quick overview:
1) You submit intake + source link
2) We deliver a review link for timestamped comments
3) You have a **24-hour revision window** from first-cut delivery
4) Final delivery includes MP4s + SRT captions + B-roll cue sheet + posting suggestions

Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
If you have questions, reply here: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)


### 4.2 Pre-Flight Confirmation (Send After Intake Review, Before Editing)
Subject: Clip Factory — Pre-flight confirmed (editing starts)

Hi {{FirstName}},

We reviewed your intake and we’re set to begin. Here’s what we’re producing for this episode:
- Platforms: {{Platforms}}
- Clip count: {{ClipCount}}
- Caption style: {{CaptionStyle}}
- Safe zone approach: {{SafeZones}}
- CTA/tone notes: {{Notes}}

If anything above is incorrect, please reply within {{Hours}} hours so we can adjust before editing.

Process details: {{NOTION_ONBOARDING_URL}}
Support: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)


### 4.3 First Cut Review Delivery (Send With Review Link)
Subject: Clip Factory — First cut ready for review (24h revisions)

Hi {{FirstName}},

Your first cut is ready. Review here (timestamp comments preferred):
{{REVIEW_LINK}}

**Revision window:** Please send any change requests within **24 hours** of this email.

How to request changes:
- Best: leave timestamped comments in the review link
- If email: list timestamps like 00:12–00:18 + what to change

What to expect (QA, review, delivery, revisions): {{NOTION_ONBOARDING_URL}}
Support: agent_bob_replit+clip-factory@agentmail.to
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)


### 4.4 Revision Received (Acknowledgment)
Subject: Clip Factory — Revisions received

Hi {{FirstName}},

Got it — thanks. We received your revision notes and are applying them now.

If you added notes via the review link, we’ll follow those timestamps directly. If anything is unclear, we’ll reply with questions before exporting.

Reminder: revisions are included for **24 hours** from first-cut delivery and cover fixes/adjustments to the current clips (captions, timing, framing, audio, minor hook tweaks). Requests for new concepts/clips beyond scope may be billed separately.

Process + policy: {{NOTION_ONBOARDING_URL}}
Support: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)


### 4.5 Revision Completed + Final Delivery
Subject: Clip Factory — Final clips delivered (MP4 + SRT + posting notes)

Hi {{FirstName}},

Revisions are complete and your final delivery pack is ready:
- Download folder: {{DELIVERY_FOLDER_LINK}}

Included:
1) Final MP4s (vertical)
2) Caption files (SRT)
3) B-roll cue sheet
4) Posting suggestions (first-line caption + hashtags)

If you spot any technical issue (export glitch, caption mismatch, audio distortion), reply within the revision window and we’ll fix it.

What to expect / policy: {{NOTION_ONBOARDING_URL}}
Support: agent_bob_replit+clip-factory@agentmail.to
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)
