# Clip Factory — Onboarding Kit Publishing SOP + Link-Ready Client Email Templates

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T09:00:41.661Z

---

## 1) Notion publishing SOP (create + publish “What to Expect” as a live URL)

**Goal:** Create a single public page clients can view without logging in. Prevent broken links and permission issues.

**Account**
- Sign up/login to Notion using: **Bob Smith** / **agent_bob_replit@agentmail.to**
- Workspace name: **Clip Factory** (or “Bob – Clip Factory”)

**Page creation**
1. Create a new page titled: **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**
2. Paste the full page copy from the existing “publish-ready Notion page copy” artifact.
3. Add a short top banner line:
   - **Website:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
   - **Support:** agent_bob_replit+clip-factory@agentmail.to

**Public sharing (critical)**
4. Click **Share** (top right).
5. Toggle **“Publish”** (or “Share to web”).
6. Ensure:
   - “Allow duplicate as template” = **OFF** (unless you explicitly want clients to duplicate)
   - “Search engine indexing” = **OFF** (recommended early-stage)
7. Copy the public URL.

**Access QA (do not skip)**
8. Open an **incognito/private** browser window.
9. Paste the Notion link. Confirm:
   - Loads without login
   - Page is readable on mobile width
   - Links to website + email are visible
10. Save the link in a shared internal doc titled: **“Clip Factory — Live Links”**
   - Field: **Notion What-to-Expect URL**


---

## 2) Google Form creation SOP (Clip Factory Intake Form)

**Goal:** One intake form per client/order that standardizes requirements and reduces revision churn.

**Account**
- Preferred: create/use a free Google account tied to **agent_bob_replit@agentmail.to**.
- If Google blocks that domain, use an alternate method:
  - Option A: Use the business contact inbox alias **agent_bob_replit+clip-factory@agentmail.to** (if Google accepts)
  - Option B (owner-run): owner creates form on their Google account; we still provide the exact build.

**Build steps**
1. Go to Google Forms → Blank form.
2. Title: **Clip Factory — Client Intake Form**
3. Description (paste):
   “This form ensures we match your brand, platform specs, and compliance requirements. If anything changes after you submit, email agent_bob_replit+clip-factory@agentmail.to.”
4. Build the questions exactly per the previously delivered “Google Form build spec” (required fields as marked).
5. Settings:
   - Collect email addresses: **ON** (recommended)
   - Allow response editing: **OFF** (to avoid silent changes; request edits by email)
   - Limit to 1 response: **OFF** (clients may have multiple episodes)
6. Confirmation message:
   “Thanks — we received your intake. You’ll get a pre-flight confirmation email once we validate everything.”

**Share link**
7. Click Send → Link icon → Shorten URL = **ON**.
8. Copy link.

**Access QA (do not skip)**
9. Open in incognito/private window and submit a test response.
10. Confirm response appears in Responses tab.
11. Save link in **“Clip Factory — Live Links”**
   - Field: **Google Intake Form URL**


---

## 3) Link-ready client email templates (placeholders included)

> Replace the placeholders once live links exist:
- [NOTION_WHAT_TO_EXPECT_URL]
- [GOOGLE_INTAKE_FORM_URL]

### A) Intake / Next Steps Email (send immediately after payment/order)
**Subject:** Next steps — Clip Factory intake + what to expect

Hi [Client Name],

Thanks for your order — we’re ready to start.

1) **Please complete this intake form (required):** [GOOGLE_INTAKE_FORM_URL]
2) **What to expect (QA standards, review, delivery, revisions):** [NOTION_WHAT_TO_EXPECT_URL]

If you have a preferred style reference (a TikTok/Reel you love), reply with 1–3 links.

Support: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)


### B) Delivery Email (with review link + delivery pack)
**Subject:** Your clips are ready — review link + delivery pack

Hi [Client Name],

Your clips are ready.

**Review link (timestamp comments):** [FRAMEIO/VIMEO/YOUTUBE_REVIEW_LINK]
**Delivery folder (MP4 + SRT + cue sheets):** [GOOGLE_DRIVE_FOLDER_LINK]

**What’s included in the delivery pack**
- Final vertical MP4 clips (platform-ready)
- Caption files (.SRT) per clip
- B-roll / on-screen cue sheet (per clip)
- Posting suggestions (first-line caption + hashtags)

**Revision window:** Please leave timestamped comments within **24 hours** of delivery. After that, additional changes may be billed depending on scope. Revision policy: [NOTION_WHAT_TO_EXPECT_URL]

Support: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)


### C) Revision Received (Acknowledgment)
**Subject:** Revisions received — we’re on it

Hi [Client Name],

Got your revision notes — thanks.

We’ll implement the requested changes that fall within the included revision scope and reply with the updated files. If anything looks like a scope change (new clips, new direction, or major restructuring), we’ll confirm pricing before proceeding.

(If you haven’t already) Please leave notes as **timestamped comments** on the review link so we can match each change exactly:
[FRAMEIO/VIMEO/YOUTUBE_REVIEW_LINK]

Policy reference: [NOTION_WHAT_TO_EXPECT_URL]
Support: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)


### D) Revision Completed (Handoff)
**Subject:** Revisions complete — updated clips attached

Hi [Client Name],

Revisions are complete.

**Updated delivery folder:** [GOOGLE_DRIVE_FOLDER_LINK]
**Updated review link (if applicable):** [FRAMEIO/VIMEO/YOUTUBE_REVIEW_LINK]

If everything looks good, reply “Approved” and we’ll mark the order complete.

Support: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob (Clip Factory)


---

## 4) Link validation checklist (run before sending any link to a client)
1. Open links in **incognito/private mode**:
   - Review link
   - Drive folder link
   - Notion “What to expect” link
   - Intake form link
2. Confirm “Anyone with the link can view” where required.
3. Confirm no login wall.
4. Confirm filenames follow naming convention and match what the email claims.
5. Confirm the client email includes:
   - Support email
   - Website URL
   - Revision window + policy link

This prevents the most common reputation-killers: broken access, missing files, and unclear revision boundaries.
