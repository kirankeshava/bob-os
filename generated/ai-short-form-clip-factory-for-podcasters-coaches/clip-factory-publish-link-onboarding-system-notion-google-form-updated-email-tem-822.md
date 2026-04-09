# Clip Factory — Publish & Link Onboarding System (Notion + Google Form + Updated Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T10:19:59.511Z

---

# Clip Factory — Publish & Link Onboarding System
Business legitimacy URL: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3  
Support email: agent_bob_replit+clip-factory@agentmail.to

## 1) Publish the Client “What to Expect” Page (Notion, free)
**Goal:** A single public URL that explains QA standards, review flow, delivery pack, and revision policy.

**Account credentials to use**
- Name: Bob Smith
- Email: agent_bob_replit@agentmail.to

**Steps (10–15 minutes):**
1. Go to Notion → Sign up (free).
2. Create a new page titled: **“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”**
3. Paste the page content from your existing “What to Expect” copy (the consolidated version) into the Notion page.
4. Add a short header block at the top:
   - “Website: [business URL]”
   - “Support: [support email]”
5. Click **Share** → toggle **Publish to web** → enable **Allow duplicate as template** (optional, helpful for scaling).
6. Copy the public URL.

**Resulting link label (use consistently everywhere):**
- **Onboarding & Review Guide (Notion):** {NOTION_ONBOARDING_URL}

---

## 2) Create the Clip Factory Client Intake Form (Google Forms, free)
**Goal:** Collect requirements before editing starts to prevent scope creep and refund-triggering mismatches.

**Account options (both free):**
- Preferred: Create a Google account with agent_bob_replit@agentmail.to (if possible)
- Alternative: If Google requires a different address, create a new free Gmail but keep the *client-facing* contact email as agent_bob_replit+clip-factory@agentmail.to.

**Steps (15–25 minutes):**
1. Go to forms.google.com → Blank form.
2. Title: **“Clip Factory — Client Intake Form”**
3. Description (paste):
   “This form captures your formatting, style, and posting requirements so we can deliver clips that are ready to post with minimal revisions. If anything is time-sensitive, note it in the final question.”
4. Build the questions using your existing build spec (platform targets, handles, CTA, banned words, caption style, brand terms, examples/links, pronunciation notes, etc.).
5. Turn on:
   - Collect email addresses (recommended)
   - Required fields for platform + aspect ratio + handles + CTA + any brand/banned words
6. Settings: allow editing after submit (optional) if you want clients to update.
7. Click **Send** → Link icon → copy the share URL.

**Resulting link label:**
- **Client Intake Form:** {GOOGLE_FORM_URL}

---

## 3) Standard Link Block (paste into every onboarding/delivery message)
Paste this as a consistent footer in emails, DMs, and delivery notes:

**Clip Factory Links**
- Onboarding & Review Guide: {NOTION_ONBOARDING_URL}
- Client Intake Form: {GOOGLE_FORM_URL}
- Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support: agent_bob_replit+clip-factory@agentmail.to

---

## 4) Updated Client Email Templates (with live-link placeholders)
Replace {NOTION_ONBOARDING_URL} and {GOOGLE_FORM_URL} once published.

### A) Onboarding / Intake Request (send immediately after purchase)
**Subject:** Next step: Clip Factory intake form + what to expect

Hi {{FirstName}},

Thanks for your order — to start editing, please complete the intake form here:
{GOOGLE_FORM_URL}

This guide explains our QA standards, review flow, delivery pack contents, and revision window:
{NOTION_ONBOARDING_URL}

Once we receive your form, we’ll confirm:
- target platforms + formatting
- caption style + any banned words
- CTA + links/handles

**Clip Factory Links**
- Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support: agent_bob_replit+clip-factory@agentmail.to

— Bob, Clip Factory


### B) Pre-Flight Confirmation (send after intake is reviewed, before editing starts)
**Subject:** Confirming specs for your clips (please reply “approved”)

Hi {{FirstName}},

Quick pre-flight check before we begin editing. Based on your intake form, we’re producing:
- Platforms: {{Platforms}}
- Format: {{9x16 / safe zones}}
- Caption style: {{Style}}
- CTA: {{CTA}}
- Banned words/topics: {{Banned}}

If everything above is correct, reply **“approved”** and we’ll start. If you need changes, reply with the update (or add a note here: {GOOGLE_FORM_URL}).

Reference guide: {NOTION_ONBOARDING_URL}

— Bob, Clip Factory


### C) Review Link Email (first cut)
**Subject:** Your clips are ready for review (timestamp comments)

Hi {{FirstName}},

Your first cut is ready. Please review here and leave timestamped comments:
{{REVIEW_LINK}}

**Revision window:** Please send revision notes within **24 hours** of this email so we can turn them around quickly.

To make revisions fast, please:
1) comment at the exact timestamp
2) say what to change (caption wording / cut / framing / mute / remove)
3) confirm the intended meaning if a phrase is unclear

Guide: {NOTION_ONBOARDING_URL}

— Bob, Clip Factory


### D) Final Delivery Email (MP4 + SRT + cue sheet + posting suggestions)
**Subject:** Final delivery — MP4s + captions (SRT) + posting notes

Hi {{FirstName}},

Final clips are delivered here:
{{FOLDER_LINK}}

**What’s included**
- /MP4_Final — ready-to-post vertical MP4s
- /Captions_SRT — matching .srt files
- /Broll_Cue_Sheets — b-roll cues + on-screen text notes
- /Posting_Suggestions — first-line caption + hashtag set per clip

If you spot any issues covered under our free revisions (caption typos, audio pops, cropping/safe-zone issues, missed timestamp notes), reply within **24 hours** and we’ll fix.

Guide: {NOTION_ONBOARDING_URL}
Support: agent_bob_replit+clip-factory@agentmail.to

— Bob, Clip Factory


### E) Revision Received (acknowledgment)
**Subject:** Got your revision notes — updating now

Hi {{FirstName}},

Received your revision notes — thank you. We’re making the updates now.

If anything else comes up, please add it as a timestamp comment on the same review link to keep everything in one place:
{{REVIEW_LINK}}

We’ll deliver the revised files as soon as the pass is complete (within the active revision window).

— Bob, Clip Factory


### F) Revision Completed (handoff)
**Subject:** Revisions completed — updated files delivered

Hi {{FirstName}},

Revisions are complete. Updated files are here:
{{FOLDER_LINK}}

Summary of changes:
- {{Change1}}
- {{Change2}}

If you confirm everything looks good, we’ll mark this delivery complete.

Support: agent_bob_replit+clip-factory@agentmail.to
Business site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob, Clip Factory

---

## 5) Internal “No Excuses” Link Checklist (to prevent access issues)
Before sending any email with a link:
- Review link opens in incognito
- Folder link permissions set to “Anyone with the link can view” (or client email explicitly added)
- File names match (Clip_01 matches Clip_01.srt)
- The Notion page is public and loads without login
- Google Form accepts submissions and confirms receipt

This publish-and-link system is the final layer that prevents confusion, missed expectations, and refund-driven disputes.