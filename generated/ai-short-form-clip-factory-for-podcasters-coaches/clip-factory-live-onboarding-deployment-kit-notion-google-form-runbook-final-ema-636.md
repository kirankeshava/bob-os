# Clip Factory — Live Onboarding Deployment Kit (Notion + Google Form Runbook + Final Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T08:40:09.596Z

---

## 1) Notion: Publish “Clip Factory — What to Expect” as a public page (Runbook)

**Goal:** Create a single public onboarding/expectations URL you can send to every client.

**Account / identity:**
- Name: Bob Smith
- Email: agent_bob_replit@agentmail.to

**Steps (no paid plan required):**
1. Go to Notion and create/login to an account using **agent_bob_replit@agentmail.to**.
2. Create a new page titled: **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**.
3. Paste in the finalized page copy (from the prior “publish-ready Notion copy” artifact). Keep the headings intact so clients can scan.
4. Add a short top block (first thing on the page):
   - **Business website (legitimacy):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   - **Support email:** agent_bob_replit+clip-factory@agentmail.to
5. **Pre-share QA check (60 seconds):**
   - Does the page clearly state: review method (timestamp comments), revision window (24h), and what’s included in delivery pack?
   - Are there any placeholders like “[LINK]” left inside the page? Remove them.
6. Click **Share** → enable **Share to web / Publish**.
7. Turn ON:
   - **Allow duplicate as template:** OFF (recommended; prevents clients from cloning internal policy docs)
   - **Search engine indexing:** OFF (recommended early; reduces random traffic/support)
8. Copy the public URL. Store it as:
   - **NOTION_ONBOARDING_URL = {paste URL}**
9. Final verification (incognito window):
   - Page opens without login.
   - Links to website + email are visible.
   - Policy sections render correctly on mobile.

**Operational rule:** This Notion URL becomes the canonical “source of truth.” Update it if policy changes, instead of updating 10 different PDFs.

---

## 2) Google Form: Build the “Clip Factory Client Intake Form” (Runbook)

**Goal:** Collect requirements before editing starts to prevent avoidable revisions/refunds.

**Account / identity:**
- Use a free Google account created with **agent_bob_replit@agentmail.to** (if Google requires Gmail, create a free Gmail and forward to agentmail; do not spend money).

**Form settings (critical):**
- Collect email addresses: **ON** (so you can match submissions to orders)
- Limit to 1 response: **OFF** (some clients have multiple episodes)
- Allow response editing: **OFF** (reduces moving targets; clients can email changes)
- Confirmation message:
  "Thanks — we’ve received your Clip Factory Intake. If you need to add anything, email agent_bob_replit+clip-factory@agentmail.to. We’ll confirm your ‘Pre-Flight’ checklist before editing begins."

**Form structure (recommended sections):**
**A) Client + Project Basics**
1. Your name (required)
2. Brand / Channel name (required)
3. Email (required)
4. Order / invoice ID (optional)
5. Link to long-form source (required) — Google Drive / Dropbox / YouTube unlisted / etc.

**B) Platforms + Output**
6. Platforms needed (checkboxes, required): TikTok, Instagram Reels, YouTube Shorts, LinkedIn, Other
7. Output count desired (required): 3 / 5 / 10 / Other
8. Aspect ratio (required): 9:16 vertical (default) / 1:1 / 16:9

**C) Style + Captions**
9. Caption style (required): Word-by-word / Sentence-based / Mixed
10. Caption tone (required): Clean/Professional / High-energy / Minimal
11. Emojis in captions? (required): Yes / No
12. Profanity handling (required): Keep / Bleep / Remove

**D) Branding + Safety**
13. Brand colors (optional)
14. Font preferences (optional)
15. On-screen handle(s) to show (optional)
16. Website/CTA link (optional)
17. Banned words/topics (optional)

**E) Clip Direction**
18. Target audience (short answer, required)
19. Primary CTA (required): Follow / Comment / DM / Book call / Visit site / Other
20. Must-include moments (optional; timestamps)
21. Must-avoid moments (optional; timestamps)

**F) Approval + Deadlines**
22. Desired deadline (date/time + timezone) (required)
23. You confirm you have rights to use this content and any included music/assets (required checkbox)

**Post-build:**
- Copy share link and store as **GOOGLE_INTAKE_FORM_URL = {paste URL}**
- Create a Google Sheet response destination (optional but recommended) named: “Clip Factory Intake Responses”.

---

## 3) Standard “Link Block” (paste into every client email)

**Links (save for reference):**
- What to Expect (QA/Review/Delivery/Revisions): **{NOTION_ONBOARDING_URL}**
- Client Intake Form: **{GOOGLE_INTAKE_FORM_URL}**
- Business website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support: agent_bob_replit+clip-factory@agentmail.to

---

## 4) Final Client Email Templates (with placeholders for live URLs)

### 4.1 Intake / Pre-Flight Confirmation Email
**Subject:** Clip Factory — Intake + Pre-Flight Confirmation (Next Steps)

Hi {{ClientName}},

To start your clips, please complete our quick intake form so we match your platforms, caption style, CTAs, and any do-not-use topics.

1) Fill out the intake form: **{GOOGLE_INTAKE_FORM_URL}**
2) Send/confirm your long-form source link (Drive/Dropbox/YouTube unlisted). If it’s already included in the form, you’re set.

Once we receive the intake, we run a **Pre-Flight checklist** (platform specs, safe zones, caption rules, branding) and reply with confirmation before editing begins.

**What to expect (QA/review/delivery/revisions):** {NOTION_ONBOARDING_URL}

— Bob (Clip Factory)
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Support: agent_bob_replit+clip-factory@agentmail.to


### 4.2 Delivery Email (Final Files + Review Link)
**Subject:** Your Clip Factory Clips Are Ready — Review Link + Downloads

Hi {{ClientName}},

Your clips are ready.

**Review link (timestamp comments preferred):** {{ReviewLink}}
- Please leave comments with timestamps (e.g., 00:12 “Caption typo”, 00:18 “Tighten pause”).
- **Revision window:** 24 hours from now (until {{RevisionDeadline}}).

**Download / Delivery Folder:** {{DeliveryFolderLink}}
Included:
- /Final_MP4/ (ready-to-post vertical videos)
- /Captions_SRT/ (matching .srt files)
- /Broll_Cue_Sheets/ (moment-by-moment b-roll/overlay suggestions)
- /Posting_Suggestions/ (first-line caption + hashtag set per clip)

If you hit any access issues, email us immediately: agent_bob_replit+clip-factory@agentmail.to

What to expect (QA/review/delivery/revisions): {NOTION_ONBOARDING_URL}
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)


### 4.3 Revision Received (Acknowledgment)
**Subject:** Revisions Received — We’re On It

Hi {{ClientName}},

Got it — thank you for the timestamped notes. We’re making the requested adjustments now.

We’ll deliver the revision update by {{RevisionETA}}.

Reminder: The revision window is **24 hours** from initial delivery (until {{RevisionDeadline}}). If any new requests come in after that window, we’ll confirm scope and timing first.

Support: agent_bob_replit+clip-factory@agentmail.to
What to expect: {NOTION_ONBOARDING_URL}
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob


### 4.4 Revision Completed (Handoff)
**Subject:** Revisions Completed — Updated Files Attached/Uploaded

Hi {{ClientName}},

Revisions are complete.

**Updated review link / version:** {{UpdatedReviewLinkOrNote}}
**Updated download folder:** {{DeliveryFolderLink}}

Summary of changes made:
- {{Change1}}
- {{Change2}}

If anything still looks off, reply with timestamps and we’ll confirm whether it’s within the remaining revision window (until {{RevisionDeadline}}).

Support: agent_bob_replit+clip-factory@agentmail.to
What to expect: {NOTION_ONBOARDING_URL}
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)
