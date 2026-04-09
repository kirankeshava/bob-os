# Clip Factory — Onboarding Links Activation SOP (Notion + Google Form) + Finalized Email Templates (Link Placeholders Included)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T17:09:39.593Z

---

## Clip Factory — Onboarding Links Activation SOP (Notion + Google Form)

### Goal
Publish (1) a client-facing “What to Expect” page and (2) a Client Intake Form, then insert those live links into the standardized email templates so every order has the same expectations, review workflow, and revision boundaries.

### Canonical business references (include everywhere)
- Website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact email: agent_bob_replit+clip-factory@agentmail.to

---

## A) Publish the Notion client page (free)
**Output:** a public Notion URL to paste into emails.

1) Create/login to Notion
- Sign up/login using:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to
- Choose “Personal” plan (free).

2) Create the page
- New Page title: **Clip Factory — What to Expect (QA, Review, Delivery, Revisions)**
- Paste the approved page copy (from the prior artifact) into the page.
- Add two callouts near the top:
  - “Primary contact: agent_bob_replit+clip-factory@agentmail.to”
  - “Proof of business: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

3) Publish & permissions
- Click **Share** → toggle **Publish to web** = ON
- Turn ON (recommended):
  - **Allow comments** (so clients can leave notes if they don’t use Frame.io/Vimeo timestamps)
- Keep OFF (recommended):
  - **Allow edit**
  - **Allow duplicate as template** (optional; enable only if you want clients to duplicate for internal sharing)

4) Copy the live link
- Copy the public URL and store it as:
  - **NOTION_ONBOARDING_URL = <paste_here>**

QA check before using the link:
- Open the Notion link in an incognito window.
- Confirm it loads without a login.
- Confirm the “Review Flow” + “24-hour revision window” sections are visible.

---

## B) Create the Client Intake Form (Google Forms, free)
**Output:** a shareable Google Form link to paste into emails.

1) Create/login Google account (if needed)
- Use:
  - Name: Bob Smith
  - Email: agent_bob_replit@agentmail.to (if available)

2) Build the form
- In Google Drive → New → More → Google Forms
- Form title: **Clip Factory — Client Intake (Clips from Long-Form)**
- Form description (paste):
  “This form collects everything we need to produce ready-to-post vertical clips with captions and platform formatting. If something changes after you submit, reply to our email and we’ll confirm before editing.”

3) Add questions (minimum set)
(Use the previously drafted spec. Key required fields should include: source link/upload method, platform targets, clip count, tone/voice, CTA, handles/links, brand constraints, banned words, caption style, examples.)

4) Confirmation message
Set confirmation message to:
“Thanks — we received your intake. Next: we’ll send a pre-flight confirmation summarizing your requirements before editing begins.”

5) Share settings
- Settings:
  - Collect email addresses: ON (recommended)
  - Allow response editing: OFF (recommended)
  - Limit to 1 response: OFF
- Click Send → Link icon → Shorten URL (optional) → Copy
- Store it as:
  - **GOOGLE_INTAKE_FORM_URL = <paste_here>**

QA check before using the link:
- Open in incognito; verify form is accessible.
- Submit a test response; verify required fields enforce properly.

---

## C) Insert links into templates (single source of truth)
Once you have the two URLs, replace placeholders everywhere:
- {NOTION_ONBOARDING_URL}
- {GOOGLE_INTAKE_FORM_URL}

Recommended locations:
1) Intake email: include both links (Notion page + Intake form)
2) Delivery email: include Notion page for policy reminders + next-steps
3) Revision emails: include Notion page for review instructions + window

---

# Final Email Templates (with link placeholders)

## 1) Intake / Start-Order Email (send immediately after client says “yes”)
**Subject:** Quick intake to start your Clip Factory order (takes 3–5 minutes)

Hi {FirstName},

To start your Clip Factory order, please complete our intake form here:
{GOOGLE_INTAKE_FORM_URL}

What to expect (QA standards, review flow, delivery pack, revision policy):
{NOTION_ONBOARDING_URL}

If you prefer, you can also reply to this email with:
1) Your long-form video/podcast link or upload method
2) Platforms (TikTok / Reels / Shorts)
3) Any must-include CTA and handles/links
4) Any banned words/topics and brand constraints

Proof of business: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Primary contact: agent_bob_replit+clip-factory@agentmail.to

Thanks,
Bob
Clip Factory


## 2) Pre-Flight Confirmation Email (send after intake, before editing)
**Subject:** Pre-flight check — confirm these clip requirements before we edit

Hi {FirstName},

Before we begin editing, please confirm the following (reply “Confirmed” or list edits):

- Source content: {SourceLink}
- Clip count / length targets: {ClipCount} / {Length}
- Platforms: {Platforms}
- Caption style: {CaptionStyle}
- Tone/voice: {Tone}
- CTA + links/handles: {CTA}
- Brand constraints / banned words: {Constraints}

Process reference (QA + review + revisions):
{NOTION_ONBOARDING_URL}

Once confirmed, we’ll proceed to editing.

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to


## 3) Delivery Email (send with review link + delivery folder)
**Subject:** Your clips are ready — review link + delivery pack inside

Hi {FirstName},

Your Clip Factory delivery is ready.

1) Review link (timestamp comments preferred):
{ReviewLink}

2) Delivery pack folder (MP4 + SRT + cue sheet + posting suggestions):
{DriveFolderLink}

**Revision window:** Please submit revision notes within **24 hours** of this email.
- Best method: leave timestamp comments in the review link
- Alternative: reply with a list like “00:12 change X; 00:27 change Y”

What’s included in your delivery pack:
- Final vertical MP4s (platform-safe framing)
- Caption files (SRT)
- B-roll cue sheet (timecoded)
- Posting suggestions (first line caption + hashtags)

Process + revision policy reference:
{NOTION_ONBOARDING_URL}

Proof of business: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Primary contact: agent_bob_replit+clip-factory@agentmail.to

Thanks,
Bob
Clip Factory


## 4) Revision Received (Acknowledgment)
**Subject:** Revision notes received — we’re on it (24h window)

Hi {FirstName},

Got your revision notes — thank you.

We’ll apply the requested changes that fall within the included revision scope and send an updated delivery.

Reminder: revision scope + review instructions are here:
{NOTION_ONBOARDING_URL}

If anything in the notes changes the clip direction (new hook/topic, different clip selection, new branding request), we’ll reply first to confirm scope before proceeding.

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to


## 5) Revision Completed (Handoff)
**Subject:** Revisions complete — updated clips uploaded

Hi {FirstName},

Revisions are complete.

Updated files:
- Review link: {UpdatedReviewLink}
- Delivery folder: {DriveFolderLink}

If you spot anything that doesn’t match the confirmed pre-flight requirements, reply within the remaining 24-hour revision window and we’ll correct it.

Reference (QA + policy):
{NOTION_ONBOARDING_URL}

Thanks,
Bob
Clip Factory


# Notes: Free vs paid change triage (paste into internal SOP or Notion)
Free revision (included): caption typos, timing fixes, minor audio leveling, small crop/reframe adjustments to keep faces safe, removing filler words, swapping B-roll within same topic, fixing exported settings.

Not free (scope change): new clip selection from different segment, new hook/topic direction, new branding package, new CTA strategy, adding new languages, adding complex motion graphics beyond the standard style, re-cutting structure due to changed intent after approval.

---
End of SOP.
