# Clip Factory — Live Onboarding Assets Publishing SOP + Link-Ready Client Email Templates

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T13:38:28.810Z

---

## 1) Publish the client-facing “What to Expect” page (Notion, free)

**Goal:** Create a single public URL you can reuse in every onboarding + delivery email.

**Account + workspace setup (free):**
1) Go to https://www.notion.so/signup
2) Sign up with:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
3) Choose “Personal” (free) workspace.

**Create + publish the page:**
1) Click **New page** → title it exactly:
   **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**
2) Paste the full page copy you already have (from the prior artifact) into the page body.
3) Add a short header line at the top:
   - **Business site (legitimacy link):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   - **Support:** agent_bob_replit+clip-factory@agentmail.to
4) Click **Share** (top right) → toggle **Publish** (or “Publish to web”).
5) Ensure these settings:
   - **Allow duplicate as template:** OFF (unless you want clients to duplicate)
   - **Search engine indexing:** OFF (recommended early)
6) Copy the public URL → save it as:
   **NOTION_ONBOARDING_URL = <paste link>**

**QA check before sending to clients:**
- Open the public link in an incognito window to confirm it loads.
- Confirm the website URL + support email appear near the top.

---

## 2) Create the client intake form (Google Forms, free)

**Goal:** One intake form link per client to reduce revisions/refunds.

**Create a Google account (only if you don’t already have one):**
1) Go to https://accounts.google.com/signup
2) Use:
   - First name: Bob
   - Last name: Smith
   - Email: (create a Gmail tied to Bob; if you must use agent_bob_replit@agentmail.to as recovery, do so)
3) Skip paid Google Workspace. Use free Gmail.

**Build the form:**
1) Go to https://forms.google.com → **Blank form**
2) Title:
   **Clip Factory — Client Intake (Short-Form Clips)**
3) Form description (paste):
   “This intake ensures your clips match your brand, platforms, and requirements. If anything changes after editing begins, it may count as a paid change. Need help? agent_bob_replit+clip-factory@agentmail.to — legitimacy: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”
4) Build questions exactly per the prior “Google Form build spec” (required fields on where noted).
5) Settings:
   - Collect email addresses: **ON** (recommended)
   - Allow response editing: OFF
   - Limit to 1 response: OFF
6) Click **Send** → copy link → save as:
   **GOOGLE_INTAKE_FORM_URL = <paste link>**

**Internal ops note:** Add the Form link to your pre-flight checklist process so no editing begins until the form is completed.

---

## 3) Insert live links into ALL client templates (single source of truth)

Once you have the two URLs, replace placeholders everywhere:
- {NOTION_ONBOARDING_URL} → the Notion published page link
- {GOOGLE_INTAKE_FORM_URL} → the Google Form link

Keep these two links pinned in your internal ops doc and paste them into:
- Intake email
- Pre-flight confirmation email
- Delivery email
- Revision received ack
- Revision completed

---

# 4) Link-Ready Client Communication Templates (copy/paste)

## A) Intake Email (send immediately after order)
**Subject:** Quick intake to start your Clip Factory edits (link inside)

Hi {ClientName},

To start your clips, please complete this intake form (2–4 minutes):
{GOOGLE_INTAKE_FORM_URL}

What to expect (QA standards, review steps, delivery pack, revisions):
{NOTION_ONBOARDING_URL}

If you have questions, reply here: agent_bob_replit+clip-factory@agentmail.to
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

Thanks,
Bob

---

## B) Pre-Flight Confirmation (send after intake is received, before editing)
**Subject:** Confirming specs before we edit — please reply “Approved”

Hi {ClientName},

Thanks — we received your intake. Before we begin editing, please confirm these specs:
- Platforms: {Platforms}
- Aspect ratio: 9:16 vertical
- Caption style: {CaptionStyle}
- Tone/keywords to include: {ToneKeywords}
- Banned words/topics: {BannedWords}
- CTA + links/handles: {CTA}

Reply with **“Approved”** (or corrections). Once approved, we start production.

Process reference (QA/review/delivery/revisions): {NOTION_ONBOARDING_URL}
Support: agent_bob_replit+clip-factory@agentmail.to

Thanks,
Bob

---

## C) Delivery Email (final files + review link + revision window)
**Subject:** Your clips are ready — review link + 24h revision window

Hi {ClientName},

Your Clip Factory delivery is ready.

**Review link (timestamp comments):** {ReviewLink}
**Delivery folder (MP4/SRT/cue sheet):** {DriveFolderLink}

**What’s included:**
- Final vertical MP4 clips (ready to post)
- SRT caption files (one per clip)
- B-roll cue sheet (timestamps + suggestions)
- Posting suggestions (first-line caption + hashtag set)

**Revision window:** Please leave timestamp comments in the review link within **24 hours** (by {RevisionDeadline}).

Reference process (QA + how to request revisions): {NOTION_ONBOARDING_URL}
Support: agent_bob_replit+clip-factory@agentmail.to
Legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

Thanks,
Bob

---

## D) Revision Received (acknowledgment)
**Subject:** Revisions received — we’re on it

Hi {ClientName},

Got your revision notes — thank you.

We’ll process the timestamped comments from: {ReviewLink}

Expected turnaround: {RevisionETA}
Reminder: revisions are handled within the 24-hour window per policy: {NOTION_ONBOARDING_URL}

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to

---

## E) Revision Completed (handoff)
**Subject:** Revisions complete — updated files inside

Hi {ClientName},

Revisions are complete.

**Updated review link:** {ReviewLink}
**Updated delivery folder:** {DriveFolderLink}

If anything is still off, please leave timestamp comments and we’ll confirm whether it’s a free revision item or a paid change request per the policy:
{NOTION_ONBOARDING_URL}

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to

---

## Internal reminder (do not send to clients)
- Do not start editing until Intake form is submitted + Pre-flight “Approved” is received.
- Always include both the legitimacy URL and support email in intake + delivery comms.
- When revision notes come in, classify them using the revision triage rules already defined (free correction vs paid change) before promising changes.