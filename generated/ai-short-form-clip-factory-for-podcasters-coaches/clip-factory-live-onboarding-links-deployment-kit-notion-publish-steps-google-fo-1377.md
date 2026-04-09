# Clip Factory — Live Onboarding Links Deployment Kit (Notion Publish Steps + Google Form Setup + Link-Inserted Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:49:17.665Z

---

## 1) Notion Page: Build + Publish Checklist (Free)

### Goal
Create one public “single source of truth” page clients can read any time: QA standards, review flow, delivery pack contents, and revision policy.

### Account + Page Creation
1. Create/login to Notion using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2. Create a new page titled:
   **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**
3. Paste in the full page copy (from the prior artifact) exactly as-is.

### Structure (Recommended Headings)
- What Clip Factory Delivers (per clip)
- QA Standards (what we check)
- Review Flow (how to leave notes)
- Delivery Pack (what you receive)
- Revision Policy (24-hour window + what’s free vs paid)
- Turnaround & Deadlines
- Contact
  - Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
  - Email: agent_bob_replit+clip-factory@agentmail.to

### Publish Settings (Critical)
1. Click **Share** → toggle **Publish to web** → ON
2. Enable **Allow duplicate as template** → OFF (reduces clients copying internal SOP sections)
3. Enable **Search engine indexing** → OFF (keeps it “unlisted” but shareable)
4. Copy the public URL.

### QA for the Notion Page Itself (pre-send)
- Open the public URL in an incognito/private window.
- Confirm it loads without login.
- Confirm website URL + contact email appear correctly.
- Confirm revision policy is explicit (24-hour window; scope boundaries).

Deliverable after publishing:
- **NOTION_PUBLIC_URL = [paste URL]**

---

## 2) Google Form: Build + Settings Checklist (Free)

### Goal
Capture all clip preferences upfront to prevent revisions/refunds and ensure editors have platform, CTA, tone, and constraints before work begins.

### Account
Create/login to Google using:
- Name: Bob Smith
- Email: agent_bob_replit@agentmail.to

### Form Title
**“Clip Factory — Client Intake (Short-Form Clips)”**

### Form Settings (Must-Set)
- Collect email addresses: **ON** (for traceability)
- Limit to 1 response: **OFF** (some clients submit multiple episodes)
- Allow response editing: **OFF** (prevents silent scope drift; revisions should be tracked via review notes)
- Required questions: **ON** for all critical fields

### Confirmation Message (Paste)
“Thanks — we received your intake. Next steps:
1) We’ll confirm your pre-flight details via email.
2) You’ll receive a review link for timestamped comments.
Contact: agent_bob_replit+clip-factory@agentmail.to
Legitimacy/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

### Share Settings
- Use the standard share link (not editable by others).
- Copy URL.

Deliverable after publishing:
- **GOOGLE_FORM_URL = [paste URL]**

---

## 3) Email Templates (Ready to Use Once Links Exist)

### 3A) Intake / Kickoff Email (Send immediately after purchase)
Subject: Clip Factory Intake — next step (please fill this form)

Hi [Client Name],

Thanks for choosing Clip Factory.

Please complete our short intake form so we can match your platforms, tone, CTA, and any “do not use” words before editing begins:
- Intake Form: GOOGLE_FORM_URL

What to expect (QA standards, review flow, delivery pack, revisions):
- Guide: NOTION_PUBLIC_URL

If you have any questions, reply here.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

---

### 3B) Pre-Flight Confirmation Email (Send after intake is reviewed)
Subject: Pre-flight confirmed — we’re starting your clips

Hi [Client Name],

We reviewed your intake and we’re starting production.

Confirmed:
- Platforms/format: [TikTok/Reels/Shorts], 9:16
- Tone: [value/coach/high-energy/etc.]
- CTA + link/handle: [CTA]
- Constraints/banned words: [list]

Review + revision policy (24h window):
NOTION_PUBLIC_URL

We’ll send a review link when the first draft is ready.

Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
Contact: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

---

### 3C) Review Ready Email (Send with Frame.io/Vimeo/YouTube review link)
Subject: Your clips are ready to review (timestamp comments please)

Hi [Client Name],

Your draft clips are ready.

Review link (leave timestamped comments):
- [REVIEW_LINK]

How to review:
- Please leave notes as timestamped comments (e.g., “00:07 change caption wording”).
- Group changes in a single pass if possible to keep turnaround fast.

Revision window:
- You have **24 hours** from this email to request free revisions for issues covered in our policy.

What to expect + revision policy:
NOTION_PUBLIC_URL

Contact: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)

---

### 3D) Delivery Email (Send with final Drive/Dropbox folder)
Subject: Final delivery — MP4s + SRT + b-roll cues + posting suggestions

Hi [Client Name],

Final delivery is ready:
- Delivery folder: [DELIVERY_FOLDER_LINK]

Included in your Delivery Pack:
1) Final MP4s (ready-to-post vertical)
2) Caption files (.SRT) per clip
3) B-roll cue sheet (time-coded suggestions)
4) Posting suggestions (first-line caption + hashtags)

If anything looks off relative to our QA standards, reply within **24 hours** with timestamp notes:
NOTION_PUBLIC_URL

Contact: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)

---

### 3E) Revision Received (Acknowledgment)
Subject: Revisions received — next update soon

Hi [Client Name],

Got your revision notes — thank you.

We’ll implement the requested fixes that fall within the free revision policy and return an updated version.
If any requested changes are outside scope (new selects, new style direction, major rewriting), we’ll reply with a quick quote before proceeding.

Policy reference:
NOTION_PUBLIC_URL

Contact: agent_bob_replit+clip-factory@agentmail.to
— Bob (Clip Factory)

---

### 3F) Revision Completed (Handoff)
Subject: Revisions complete — updated files inside

Hi [Client Name],

Revisions are complete.

Updated delivery folder:
- [DELIVERY_FOLDER_LINK]

If you spot anything that contradicts the agreed QA standards, reply within **24 hours** with timestamp notes:
NOTION_PUBLIC_URL

Contact: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)
