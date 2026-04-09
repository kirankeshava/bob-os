# Clip Factory — Publish + Link + Use Playbook (Notion Onboarding Page + Google Intake Form + Updated Email Link Insertions)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** plan
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T11:24:31.117Z

---

# Clip Factory — Publish + Link + Use Playbook

This playbook turns the already-written onboarding copy + intake form spec into **live share links** and ensures those links are used consistently in every client message. It is designed to reduce refunds by preventing confusion, missed requirements, and unclear revision boundaries.

**Business legitimacy link (include in emails/onboarding):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

**Support/ops email:** agent_bob_replit+clip-factory@agentmail.to

---

## A) Publish the Client “What to Expect” Page (Notion) — Step-by-step

### A1) Create/Sign in to Notion (free)
1. Go to https://www.notion.so/
2. Click **Sign up**.
3. Use:
   - **Name:** Bob Smith
   - **Email:** agent_bob_replit@agentmail.to
4. Choose the **Free** plan (do not enter payment info).

### A2) Create the page
1. In Notion sidebar, click **New page**.
2. Title the page exactly:
   **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**
3. Paste the full onboarding page copy (from the previously created “Publish-Ready Notion Page Copy”).
4. Confirm the page contains:
   - Review flow + timestamp comment instructions
   - 24-hour revision window language
   - Delivery pack contents (MP4 + SRT + cue sheet + posting suggestions)
   - Revision triage boundaries (what’s free vs paid)
   - The legitimacy link + support email above

### A3) Publish and generate a public URL
1. Open the page.
2. Click **Share** (top right).
3. Toggle **Share to web** → ON.
4. Optional (recommended): toggle **Allow duplicate as template** → OFF (prevents clients copying internal formatting).
5. Copy the public URL. This becomes:
   - **NOTION_ONBOARDING_URL**

### A4) Quick QA on the Notion page before using it
- Open the Notion URL in an incognito/private window.
- Confirm it loads without login.
- Click any links inside; verify they work.
- Ensure the contact email is correct: agent_bob_replit+clip-factory@agentmail.to

---

## B) Create the Client Intake Form (Google Forms) — Step-by-step

### B1) Create/Sign in to Google (free)
1. Go to https://accounts.google.com/signup
2. Create account using:
   - **First name:** Bob
   - **Last name:** Smith
   - **Email:** (use agent_bob_replit@agentmail.to if Google allows; if not, create a Gmail and forward messages to agent_bob_replit+clip-factory@agentmail.to)
3. Do **not** add payment methods.

### B2) Build the form
1. Go to https://forms.google.com
2. Click **Blank form**.
3. Title:
   **“Clip Factory — Clip Intake Form”**
4. Description (paste):
   “This form captures everything we need to produce your short-form clips fast and accurately. If anything is time-sensitive, note it below. Support: agent_bob_replit+clip-factory@agentmail.to | Info: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

### B3) Questions to add (minimum viable intake)
Set **Required = Yes** unless noted.

1) **Your name** (Short answer)
2) **Brand / Channel name** (Short answer)
3) **Email for delivery + review notifications** (Short answer)
4) **Link to long-form source** (Short answer)
   - “YouTube link / Drive link / uploaded file link”
5) **Primary platform** (Multiple choice)
   - TikTok
   - Instagram Reels
   - YouTube Shorts
   - LinkedIn
   - Other (short answer)
6) **Secondary platforms (optional)** (Checkboxes)
   - TikTok / Reels / Shorts / LinkedIn
7) **Clip goal** (Multiple choice)
   - Drive profile visits
   - Drive website clicks
   - Get DMs/leads
   - Grow followers
   - Promote an offer
8) **CTA to include (exact words)** (Paragraph)
9) **Tone** (Multiple choice)
   - Educational
   - High-energy
   - Calm/premium
   - Funny
   - Direct/contrarian
10) **Caption style** (Multiple choice)
   - Clean minimal
   - Bold kinetic
   - Word-by-word highlights
11) **Brand constraints** (Paragraph)
   - Fonts/colors (if any), logo usage, “do not use” phrases
12) **Banned words/topics** (Paragraph, optional)
13) **Your handle(s) to display** (Short answer)
14) **Any examples you like** (Short answer, optional)
15) **Must-include moments / timestamps** (Paragraph, optional)
16) **Must-avoid moments / timestamps** (Paragraph, optional)
17) **Deadline (if any)** (Date)

### B4) Form settings (to reduce friction)
- Settings → Responses:
  - Turn **Collect email addresses** ON (recommended) to prevent typos.
  - Turn **Limit to 1 response** OFF (clients may submit again if updated).
- Do NOT require sign-in if possible (reduces drop-off).

### B5) Get the share link
1. Click **Send** (top right).
2. Click the **link icon**.
3. Enable “Shorten URL”.
4. Copy link. This becomes:
   - **GOOGLE_INTAKE_FORM_URL**

---

## C) Paste the live links into client communications

Once you have the two URLs:
- NOTION_ONBOARDING_URL
- GOOGLE_INTAKE_FORM_URL

Replace placeholders in your templates.

### C1) Intake / Welcome Email — Link insertion block
Add this block near the top:

**Start here (2 minutes):**
1) Intake form: **GOOGLE_INTAKE_FORM_URL**
2) What to expect (QA + review + delivery + revisions): **NOTION_ONBOARDING_URL**

For reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Support: agent_bob_replit+clip-factory@agentmail.to

### C2) Delivery Email — Link insertion block
Add:
- Review link (Frame.io/Vimeo/YouTube): [REVIEW_LINK]
- Delivery folder link: [DELIVERY_FOLDER_LINK]
- Onboarding/expectations: **NOTION_ONBOARDING_URL**

### C3) Revision Received + Revision Completed Emails — Link insertion
Include:
- “Please leave timestamped comments here: [REVIEW_LINK]”
- “Policy/expectations: **NOTION_ONBOARDING_URL**”

---

## D) Operational guardrails (prevents refunds)

1) **Never start editing until intake form is submitted** OR the client explicitly confirms in writing: platform, CTA, caption style, and banned words.
2) **Always deliver a review link before final exports** for new clients (reduces subjective rework).
3) **Revision window**: 24 hours from delivery of review link or final pack (state this in writing every time).
4) **Scope control**: If a client requests new clips, new aspect ratio set, new branding, or content not in the source, classify it as **paid change**.

---

## E) Definition of “live system is ready”
The delivery system is considered live when:
- You have a public Notion URL that works in incognito.
- You have a Google Form link that can be submitted without errors.
- You have replaced placeholders in the intake + delivery + revision templates with the two live URLs.

Owner/ops can then send a single onboarding email that reliably collects requirements, sets expectations, and reduces churn.
