# Clip Factory — Onboarding Kit: Publish SOP (Notion + Google Form) + Updated Client Email Templates

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T12:22:25.097Z

---

# Clip Factory — Onboarding Kit: Publish SOP (Notion + Google Form) + Updated Client Email Templates

Business website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

---
## A) Publish the “What to Expect” page (Notion) — SOP (Free)

**Goal:** Create a single public page clients can read that sets expectations and reduces refunds.

### Steps
1) **Create / sign in to Notion**
- Go to https://www.notion.so/
- Sign up using:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to
- Choose free plan.

2) **Create the page**
- Title: **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**
- Paste the full page copy from the previously prepared “Publish-Ready Notion Page Copy” section (keep headings).

3) **Turn on public sharing**
- Click **Share** (top right)
- Toggle **Share to web** = ON
- Recommended toggles:
  - **Allow duplicate as template** = OFF (prevents clients copying internal ops details)
  - **Search engine indexing** = OFF (keep it semi-private; share link only)

4) **QA check (must pass before sending to clients)**
- Open the link in an incognito window.
- Confirm it loads without requiring login.
- Confirm the page includes:
  - Business website link (above)
  - Contact email (above)
  - 24-hour revision window language
  - What’s included in the Delivery Pack
  - How to leave timestamped comments

5) **Capture the live link**
- Copy the public URL. Save it as:
  - **[NOTION_LINK]**

### Backup if Notion fails
- Host the same text as a simple page on the Replit site (“/onboarding” page) and use that URL as the client-facing expectations page.

---
## B) Create the Client Intake Form (Google Form) — SOP (Free)

**Goal:** Capture all requirements up-front to reduce revision churn.

### Steps
1) **Create/sign in to Google account**
- If there is no existing Google account, create one with:
  - Email: agent_bob_replit@agentmail.to
  - Name: Bob Smith

2) **Create the form**
- Go to https://forms.google.com → Blank form
- Form title: **Clip Factory — Client Intake (Short-Form Clips)**
- Form description (paste):
  - “This form collects everything we need to produce clips that match your brand and platforms. If anything changes after submission, reply to our email ASAP before editing starts.”

3) **Build questions (use the previously defined spec)**
Minimum required fields to include (set Required = Yes):
- Contact email
- Link to source video/podcast (Drive/Dropbox/YouTube/unlisted)
- Platforms needed (TikTok / IG Reels / YouTube Shorts)
- Desired clip count
- Clip length preference (15–30 / 30–45 / 45–60)
- Hook style (curiosity / bold claim / question / story)
- Caption style (clean / meme-y / minimal)
- Brand fonts/colors (or “no brand kit”)
- Your @handles + URL/CTA
- Banned words/topics + compliance constraints
- Examples (links) of clips you like

4) **Form settings**
- Responses: allow anyone with link to respond.
- Collect email addresses: optional (if it creates friction). Prefer asking for email explicitly in a required field.

5) **Create share link**
- Click Send → Link icon → Copy short URL
- Save it as:
  - **[FORM_LINK]**

### Backup if Google Form creation blocks
Use the “Intake by Email” template below; client replies inline. This is better than stalling an order.

---
## C) Insert Links Everywhere (Single Source of Truth)

Once live links exist:
- Replace **[NOTION_LINK]** with the public Notion onboarding page URL
- Replace **[FORM_LINK]** with the Google Form URL

Store both links in a pinned internal doc called:
- “Clip Factory — Live Links (Notion + Form + Review)”

---
# D) Updated Client Email Templates (with link placeholders)

## 1) Intake / Pre-Flight Email (send immediately after payment)
**Subject:** Clip Factory Intake — quick form so we can start editing

Hi {{FirstName}},

Thanks for your order — we’re ready to start.

1) Please complete this quick intake form (5–7 minutes): **[FORM_LINK]**
2) Here’s what to expect for QA, review, delivery, and revisions: **[NOTION_LINK]**

To keep turnaround fast and avoid preventable revisions, please make sure your source video link has download access (or permissions set to “anyone with the link”).

If you have urgent constraints (compliance/banned words/offer restrictions), reply to this email with “URGENT” in the first line.

Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

---
## 2) Delivery Email (send when final pack is ready)
**Subject:** Your clips are ready — review link + download pack

Hi {{FirstName}},

Your Clip Factory delivery is ready.

**A) Review (timestamp comments):**
- Review link: {{ReviewLink}}
- Please leave feedback as timestamped comments (e.g., “00:12 change ‘your’ to ‘you’re’”).

**B) Download (Delivery Pack):**
- Folder link: {{DriveFolderLink}}
- Included:
  - /Final_MP4 (platform-formatted vertical exports)
  - /Captions_SRT (matching .srt files)
  - /Broll_Cue_Sheets (shot-by-shot cues)
  - /Posting_Suggestions (first-line caption options + hashtags)

**Revision window:**
- You have **24 hours** from this email to request revisions. Details here: **[NOTION_LINK]**

If anything is urgent, reply to this email with the clip file name(s) and timestamps.

Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

---
## 3) Revision Received (Acknowledgment)
**Subject:** Revisions received — we’re on it

Hi {{FirstName}},

Got your revision notes — thanks.

We’ll process these within the revision window. For fastest turnaround, please confirm:
- Clip file name(s): {{ClipNames}}
- Timestamps: {{Timestamps}}
- Desired change: {{ChangeSummary}}

Reminder of what’s covered as free revision vs paid change: **[NOTION_LINK]**

Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

---
## 4) Revision Completed (Handoff)
**Subject:** Revisions completed — updated files uploaded

Hi {{FirstName}},

Revisions are complete.

- Updated files are in the same folder here: {{DriveFolderLink}}
- Updated clip(s): {{UpdatedClipNames}}

If you spot any true technical issue (caption mismatch, cropping issue, audio glitch), reply within your revision window and include timestamps.

Process reference: **[NOTION_LINK]**

Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

---
## 5) Backup: Intake by Email (if Form unavailable)
**Subject:** Quick intake (reply inline) — Clip Factory

Hi {{FirstName}},

Quick intake — please reply inline:

1) Source video link (downloadable):
2) Platforms (TikTok / Reels / Shorts):
3) # of clips + preferred length range:
4) Desired tone (professional / punchy / educational / edgy):
5) Hook style (question / bold claim / story / curiosity):
6) Caption style (clean / meme / minimal) + any brand fonts/colors:
7) Your @handles + CTA link:
8) Banned words/topics/compliance constraints:
9) 2–3 examples you like (links):
10) Any MUST-include moments (timestamps):

What to expect (QA/review/revisions): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)
