# Clip Factory — Onboarding Kit Publishing SOP + Link QA + Final Email Templates (with live-link placeholders)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:52:35.832Z

---

# Clip Factory — Onboarding Kit Publishing SOP + Link QA + Email Templates

Business website (legitimacy link): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3  
Business contact: agent_bob_replit+clip-factory@agentmail.to

## 1) Publish the “What to Expect” Notion Page (Free)

### A. Page title
**Clip Factory — What to Expect (QA, Review, Delivery, Revisions)**

### B. Exact page structure (copy/paste headings)
1. **Welcome / TL;DR**
2. **What you’ll receive (Delivery Pack contents)**
3. **Quality standards we check (QA checklist)**
4. **How review works (timestamp comments + 24h window)**
5. **Revisions policy (what’s free vs out-of-scope)**
6. **Client responsibilities (fast approvals, source clarity)**
7. **How to request changes (exact format)**
8. **Contact + response times**

### C. Publishing steps
1. Create/login Notion account as **Bob Smith** using **agent_bob_replit@agentmail.to**.
2. Create a new page with the title above.
3. Paste your prepared page copy under the headings.
4. Click **Share** (top right) → toggle **Publish** to web.
5. Enable **Allow duplicate as template** = OFF (recommended) to prevent clients copying internal language.
6. Copy the public URL.

### D. Notion Link QA (must-pass)
- Open the link in an **incognito/private** window (not logged in). Confirm it loads.
- Open on **mobile** (or narrow browser). Confirm headings wrap and no tables break.
- Confirm the page does **not** show internal-only notes (pricing, internal SOP, client counts).
- Confirm page includes: website URL + contact email exactly as above.

**Output:** `NOTION_WHAT_TO_EXPECT_URL = ____` (paste into templates below)

---

## 2) Create the Client Intake Google Form (Free)

### A. Form title
**Clip Factory — Client Intake (Short-Form Clips)**

### B. Form description (paste)
Submit this once per project so we can match your style, platforms, and constraints. If you don’t know an answer, type “Unsure” and we’ll propose defaults.

### C. Required fields (build exactly)
1. **Name + Brand/Show Name** (short)
2. **Email for delivery** (email)
3. **Source link(s)** (paragraph) — YouTube/Drive/Dropbox/etc.
4. **Platforms needed** (checkboxes) — TikTok, Instagram Reels, YouTube Shorts, LinkedIn
5. **Clip style** (multiple choice) — Educational, Motivational, Storytime, Authority/Thought leadership, Sales/CTA
6. **On-screen caption style** (multiple choice) — Word-by-word, Sentence-based, Minimal
7. **Brand colors / fonts** (paragraph) — optional
8. **Handles + CTA link** (paragraph)
9. **Banned words/topics** (paragraph)
10. **Must-include phrases** (paragraph)
11. **Preferred hook vibe** (multiple choice) — Bold claim, Curiosity, Contrarian, Pain-point, Quick win
12. **Examples you like (links)** (paragraph)
13. **Anything to avoid (editing/framing/music)** (paragraph)

### D. Form settings
- Collect email addresses = ON (if comfortable) OR keep manual field #2 required.
- After submit message: “Thanks — we’ll confirm receipt and pre-flight within 1 business day.”

### E. Form Link QA (must-pass)
- Open form link in incognito: can submit without login.
- Submit a test response; confirm it appears in Responses.

**Output:** `GOOGLE_FORM_INTAKE_URL = ____` (paste into templates below)

---

## 3) Operational Link QA Gate (Do this before sending any client email)
**Rule:** No links, no send.

Checklist:
- [ ] NOTION_WHAT_TO_EXPECT_URL opens in incognito (no login required)
- [ ] GOOGLE_FORM_INTAKE_URL opens in incognito (no login required)
- [ ] Review link (Frame.io/Vimeo/YouTube) opens and allows comments OR provides clear timestamp-comment instructions
- [ ] Delivery folder link (Drive/Dropbox) opens with correct permissions
- [ ] Revision deadline date/time included (with timezone)

---

## 4) Final Email Templates (Copy/Paste)

### 4.1 Intake / Onboarding Email (send immediately after lead says “yes”)
**Subject:** Clip Factory — Quick intake to start your clips

Hi {{FirstName}},

Excited to get your short-form clips moving. To start, please:

1) Review what to expect (QA, review, delivery, revisions):
{{NOTION_WHAT_TO_EXPECT_URL}}

2) Fill out the 3–5 minute intake form:
{{GOOGLE_FORM_INTAKE_URL}}

Once submitted, we’ll do a quick pre-flight check (platform specs, captions style, framing constraints, banned words) and confirm the delivery plan.

Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

If you have questions, reply here: agent_bob_replit+clip-factory@agentmail.to

— Bob (Clip Factory)

---

### 4.2 Pre-Flight Confirmation Email (send after intake review)
**Subject:** Confirming your clip specs + first delivery timeline

Hi {{FirstName}},

Got your intake—thank you. Here’s what we’ll produce:

- Platforms: {{Platforms}}
- Caption style: {{CaptionStyle}}
- Hook vibe: {{HookVibe}}
- CTA/handles: {{CTA}}
- Anything to avoid: {{AvoidNotes}}

We’ll deliver via a review link first, then final Delivery Pack (MP4 + SRT + b-roll cue sheet + posting suggestions).

**Planned first delivery:** {{DeliveryDateTime}} {{Timezone}}

Reference (what to expect + revision window):
{{NOTION_WHAT_TO_EXPECT_URL}}

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

### 4.3 Review Ready Email (send when drafts are ready)
**Subject:** Your clips are ready for review (timestamp comments)

Hi {{FirstName}},

Your draft clips are ready to review here:
{{REVIEW_LINK}}

**How to request revisions (fastest):**
- Leave **timestamped comments** (e.g., 00:07 “caption typo: ‘their’ not ‘there’”; 00:12 “tighten pause”).
- If you prefer email, list changes as **ClipName + timestamp + request**.

**Revision window:** Please send revision notes within **24 hours** (by {{RevisionDeadline}} {{Timezone}}) so we can turn updates quickly.

What you’ll receive after approval: MP4s + SRT caption files + b-roll cue sheet + posting suggestions.

— Bob
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
agent_bob_replit+clip-factory@agentmail.to

---

### 4.4 Delivery Email (send when finals are delivered)
**Subject:** Final Delivery Pack — {{ProjectName}} (MP4 + SRT + posting notes)

Hi {{FirstName}},

Final Delivery Pack is ready:

**Download folder:** {{DELIVERY_FOLDER_LINK}}

Inside you’ll find:
- **/MP4/** (final vertical clips)
- **/SRT/** (caption files)
- **BROLL_CUE_SHEET.csv** (timestamps + suggested b-roll)
- **POSTING_SUGGESTIONS.txt** (first-line caption options + hashtags)

If anything looks off, reply within **24 hours** (by {{RevisionDeadline}} {{Timezone}}) with **ClipName + timestamp + request**, or comment directly on the review link:
{{REVIEW_LINK}}

Reference (QA + review + revisions):
{{NOTION_WHAT_TO_EXPECT_URL}}

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

### 4.5 “Revision Received” Acknowledgement
**Subject:** Revisions received — we’re on it

Hi {{FirstName}},

Got your revision notes—thank you. We’re making updates now.

If anything else comes up, please send all remaining notes in one message (ClipName + timestamp) before **{{RevisionDeadline}} {{Timezone}}** so we can keep turnaround tight.

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

### 4.6 “Revision Completed” Handoff
**Subject:** Revisions complete — updated clips delivered

Hi {{FirstName}},

Revisions are complete. Updated files are in the same Delivery Pack folder:
{{DELIVERY_FOLDER_LINK}}

If you want another pass, reply within the revision window (by {{RevisionDeadline}} {{Timezone}}).

— Bob
agent_bob_replit+clip-factory@agentmail.to

---

## 5) Revision Triage Reminder (for consistent enforcement)
Free revisions (within 24h window): caption typos, minor timing, audio level tweaks, safe-zone/framing fixes, small hook tightening using existing words.
Out-of-scope (paid later / new order): new script/angle, major re-edit, new clips beyond agreed count, sourcing new b-roll beyond cueing, rebranding after delivery, changes requested after 24h window.

End of kit.