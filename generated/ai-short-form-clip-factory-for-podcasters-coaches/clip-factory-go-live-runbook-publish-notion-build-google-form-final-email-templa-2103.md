# Clip Factory — Go-Live Runbook (Publish Notion + Build Google Form + Final Email Templates w/ Link Slots)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:43:19.272Z

---

## 1) Go-Live Checklist (15 minutes total)
**Goal:** Generate two live links (Notion “What to Expect” + Google Form Intake) and insert them into all customer templates.

### Required business references (must appear on the Notion page + emails)
- Website (legitimacy proof): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact email: agent_bob_replit+clip-factory@agentmail.to

### Links to create
- **NOTION_EXPECTATIONS_URL:** public Notion page link
- **INTAKE_FORM_URL:** Google Form link

---

## 2) Publish the Notion “What to Expect” Page (Free)
**Account identity:** Bob Smith, email: agent_bob_replit@agentmail.to

### Steps
1) Go to Notion and create a free account using **agent_bob_replit@agentmail.to**.
2) Create a new page titled: **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**.
3) Paste in the full “What to Expect” content (from the prior onboarding artifact). Confirm it includes:
   - The business website URL
   - The Clip Factory contact email
   - Review instructions (timestamp comments)
   - Delivery pack contents (MP4 + SRT + cue sheet + posting suggestions)
   - Revision window (24 hours)
4) Add a short top block called **“Quick Links”** with placeholders:
   - Client Intake Form: [INTAKE_FORM_URL]
   - Contact: agent_bob_replit+clip-factory@agentmail.to
5) Click **Share → Publish** (public web).
6) Copy the public URL and store it as **NOTION_EXPECTATIONS_URL**.

### QA for the Notion page (before sharing)
- Opens in incognito/private browsing
- No edit permissions exposed
- Links are clickable
- The revision policy is unambiguous (24-hour window)
- Contact email is visible near the top and bottom

---

## 3) Build the Google Form Intake (Free)
**Account identity:** Bob Smith, email: agent_bob_replit@agentmail.to

### Steps
1) Go to Google Forms. If prompted, create a free Google account with **agent_bob_replit@agentmail.to** (no paid workspace).
2) Create a new form titled: **“Clip Factory — Client Intake (Short-Form Clips)”**.
3) Paste/build questions exactly per the previously defined spec (platforms, tone, CTA, handles, banned words, etc.).
4) In **Settings**:
   - Collect email addresses: **ON** (if available)
   - Allow response editing: **OFF** (reduces midstream scope changes)
   - Limit to 1 response: **OFF** (some clients have multiple shows)
5) Create a **Confirmation message**:
   “Thanks! We’ve received your intake. If you need to update anything urgently, email agent_bob_replit+clip-factory@agentmail.to. We’ll confirm pre-flight requirements before editing starts.”
6) Click **Send → Link icon → Copy**. Store it as **INTAKE_FORM_URL**.

### QA for the Form (before using)
- Submit a test response
- Confirm required fields are actually required
- Confirm the confirmation message includes the contact email

---

## 4) Insert Live Links into Email Templates (Final Versions)
Replace:
- [NOTION_EXPECTATIONS_URL] with the live Notion link
- [INTAKE_FORM_URL] with the live Google Form link


### 4A) Intake / Welcome Email (Template)
**Subject:** Welcome to Clip Factory — quick intake + what to expect

Hi {{FirstName}},

Excited to help you turn your long-form content into ready-to-post vertical clips.

1) **Client Intake Form (required):** [INTAKE_FORM_URL]
2) **What to Expect (QA, review, delivery, revisions):** [NOTION_EXPECTATIONS_URL]

Legitimacy / business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

If anything is time-sensitive (deadlines, compliance constraints, or “do not mention” topics), reply here: agent_bob_replit+clip-factory@agentmail.to

— Bob


### 4B) Pre-Flight Confirmation Email (Template)
**Subject:** Pre-flight check — confirming clip settings before we edit

Hi {{FirstName}},

Thanks for the intake. Before editing starts, please confirm these pre-flight items:
- Target platforms: {{Platforms}}
- Branding/handles/links: {{HandlesAndLinks}}
- Tone + CTA: {{ToneCTA}}
- Banned words/topics: {{BannedWords}}
- Any “must include” moments: {{MustIncludeTimestamps}}

Process + standards: [NOTION_EXPECTATIONS_URL]

Reply “Confirmed” (or list changes) within {{X}} hours so we can hit your timeline.

— Bob | agent_bob_replit+clip-factory@agentmail.to


### 4C) Review Link Email (Template)
**Subject:** Clips ready for review — please leave timestamped notes (24h window)

Hi {{FirstName}},

Your clips are ready for review.

**Review link:** {{ReviewLink}}
**How to comment:** Please leave timestamped notes directly on the video (e.g., 00:12 “replace caption”, 00:19 “tighten pause”).

**Revision window:** Please submit all revision notes within **24 hours** so we can turn revisions fast and keep your posting schedule on track.

What’s included in delivery and our QA standards: [NOTION_EXPECTATIONS_URL]

Questions or edge cases? agent_bob_replit+clip-factory@agentmail.to

— Bob


### 4D) Final Delivery Email (Template)
**Subject:** Final delivery — MP4s + SRT captions + posting suggestions

Hi {{FirstName}},

Final files are delivered here:
**Folder link:** {{DriveOrDropboxLink}}

**Delivery pack includes:**
- Final vertical MP4s (platform-safe export)
- Caption files (.SRT)
- B-roll cue sheet (optional overlays + insert suggestions)
- Posting suggestions (first-line caption + hashtags + recommended posting notes)

If anything looks off versus the agreed pre-flight settings, reply within **24 hours** and include timestamps.

Process + revision policy: [NOTION_EXPECTATIONS_URL]
Business page: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob | agent_bob_replit+clip-factory@agentmail.to


### 4E) Revision Received (Acknowledgment) Email (Template)
**Subject:** Revision notes received — starting updates now

Hi {{FirstName}},

Got your revision notes—thank you.

We’re applying updates now. If you have any additional notes, please send them all at once (with timestamps) so we can keep turnaround tight.

Reference process: [NOTION_EXPECTATIONS_URL]

— Bob | agent_bob_replit+clip-factory@agentmail.to


### 4F) Revision Completed Email (Template)
**Subject:** Revisions complete — updated files delivered

Hi {{FirstName}},

Revisions are complete.

**Updated folder/link:** {{UpdatedLink}}
Summary of changes:
- {{Change1}}
- {{Change2}}

If anything else is needed within the 24-hour revision window, reply with timestamps.

Process + revision policy: [NOTION_EXPECTATIONS_URL]

— Bob | agent_bob_replit+clip-factory@agentmail.to

---

## 5) Operational Safeguard (Issue Triage Reminder)
When a client requests changes, classify before responding:
- **Free revision:** caption typos, cropping/safe-zone miss, audio leveling issue, minor timing cut consistent with original brief.
- **Scope change:** new hook angle, new CTA, different platform strategy, adding new source footage, additional clips beyond the agreed count. Acknowledge politely and offer a new scope/timeline (Week 1: free trial terms may still apply, but label clearly as “additional request” so it doesn’t become an assumed entitlement).

This keeps delivery consistent and protects marketplace reputation by preventing endless revisions and missed deadlines.