# Clip Factory — Client Intake Form (Google Form Build Spec) + Hosted “What to Expect/Review” Page (Paste-Ready) + No-Intake-No-Start Rule

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T14:24:27.061Z

---

## 1) Client Intake Form — Google Form Build Spec (free)
**Form title:** Clip Factory — Clip Repurposing Intake (Required)
**Form description (paste):**
Thanks for ordering Clip Factory. This intake is required so we can match your brand voice and avoid revisions. If you have urgent constraints, email us at agent_bob_replit+clip-factory@agentmail.to.

### Section A — Basics (Required)
1) **Your name + brand/company** (Short answer) — Required
2) **Primary contact email** (Short answer; response validation = email) — Required
3) **Link to the source video/podcast file** (Short answer) — Required
   - Help text: “Google Drive/Dropbox/YouTube/private link is fine. If it’s private, include access instructions.”
4) **Platform targets** (Checkboxes) — Required
   - TikTok, Instagram Reels, YouTube Shorts, LinkedIn, Other (short answer)
5) **Target audience** (Short paragraph) — Required

### Section B — Clip Direction (Required)
6) **Goal of these clips** (Multiple choice) — Required
   - Drive follows, Drive website clicks, Drive calls/bookings, Promote episode, Build authority, Other
7) **What topics/segments should we prioritize?** (Short paragraph) — Required
8) **Any topics to avoid?** (Short paragraph) — Optional
9) **Preferred clip style** (Multiple choice) — Required
   - Fast-paced (jump cuts), Medium, Minimal cuts (podcast feel)
10) **Hook style preference** (Checkboxes) — Required
   - Contrarian/open loop, “3 tips” list, Big promise, Story/confession, Data/stat, Question hook

### Section C — Captions & Language (Required)
11) **Caption style** (Multiple choice) — Required
   - Clean word-for-word, Clean + light edits for readability, Heavily edited (paraphrase)
12) **Captions casing** (Multiple choice) — Required
   - Sentence case, ALL CAPS emphasis, Mixed (default)
13) **Highlighting** (Multiple choice) — Required
   - No highlight, Highlight 1–3 keywords per sentence, Auto-highlight key terms
14) **Banned words/phrases** (Short paragraph) — Required (allow “None”)
15) **Must-use phrases/brand terms** (Short paragraph) — Optional
16) **Pronunciation notes (names/brands)** (Short paragraph) — Optional

### Section D — Branding & Compliance (Required)
17) **Do you want your handle/watermark on clips?** (Multiple choice) — Required
   - Yes (provide handle), No
   - If Yes → **Your handle** (Short answer) — Required (use conditional logic)
18) **Any disclaimers required?** (Short paragraph) — Optional
19) **Music policy** (Multiple choice) — Required
   - No music, Low background music, Platform-native music only (client adds later)

### Section E — Examples & Approval (Required)
20) **2–3 examples of clips you like** (Paragraph; links) — Optional
21) **Anything that would make you request a revision?** (Short paragraph) — Required
22) **Confirmation** (Checkbox) — Required
   - “I confirm the above is accurate. I understand edits begin after this form is submitted (unless I waive in writing).”

**Internal note (not shown to client):** Export responses to Google Sheets. Create a folder per client/order and save the intake PDF/print view into the project folder.

---

## 2) Hosted Webpage Copy — “What to Expect + Review Instructions” (paste-ready)
**Page Title:** Clip Factory — What to Expect (QA, Review & Delivery)

**Intro (paste):**
Welcome to Clip Factory. We turn your long-form podcast/video into ready-to-post vertical clips with hooks, captions, b-roll cues, and platform-optimized formatting.

To verify we’re legit and contactable, here’s our public business page:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

Support email (fastest): agent_bob_replit+clip-factory@agentmail.to

### What you’ll receive (Delivery Pack)
Each delivery includes:
1) **Final vertical MP4 clips** (platform-safe exports)
2) **Caption files** for each clip (**.SRT**)
3) **B-roll cue sheet** (timestamps + suggested overlays/cutaways)
4) **Posting suggestions** per clip (first-line caption + hashtag set + recommended hook text)

### Our QA standards (what we check before delivery)
- **Safe zones respected:** no cropped faces; key text stays inside platform UI-safe areas.
- **Captions accuracy:** high confidence transcription; corrected names/terms; readable line breaks.
- **Audio leveling:** no clipping/peaking; dialogue forward; consistent loudness clip-to-clip.
- **Hook clarity:** first 1–2 seconds communicate the point; no dead air.
- **Jump cuts are clean:** no jarring mid-word cuts; pacing matches your requested style.
- **Export settings:** vertical 9:16, crisp bitrate, platform-friendly codec, consistent color.

### Review process (timestamp comments)
We send a review link (unlisted video or review platform) where you can leave timestamp notes.
**How to leave feedback:**
1) Watch the clip(s)
2) Leave comments with timestamps (example: “00:07 change caption wording”)
3) If you want a different hook angle, state the new hook in one sentence

### Revision window (important)
You have **24 hours** from the moment we send the review link to request revisions included in your order.
- If we don’t receive notes within 24 hours, we’ll proceed to finalize and deliver.
- If you need more time, email us before the deadline at agent_bob_replit+clip-factory@agentmail.to.

### What counts as a free revision vs. a paid change
**Included (free) revisions**
- Caption typo fixes, punctuation, minor readability tweaks
- Minor timing adjustments (caption sync / cut timing)
- Small on-screen text edits
- Safe-zone/framing corrections
- Audio leveling tweaks

**Paid change requests (scope change)**
- New creative direction after review (new hook angle, different story arc)
- Swapping the selected segment for a different part of the episode
- New templates/branding style not provided in intake
- Adding new clips beyond the agreed quantity

### Best way to avoid revisions
Please complete the intake form fully (brand terms, banned words, examples you like). If you have special pronunciation, spell it out.

**Ready?** Reply to your onboarding email or contact us at agent_bob_replit+clip-factory@agentmail.to.

---

## 3) Internal Rule — No Intake, No Start (enforceable)
**Policy:** No editing begins until the client intake form is submitted.
**Exceptions:** Only if the client explicitly waives intake in writing (email) and acknowledges that brand terms/banned words/caption preferences may require paid changes later.
**Stop/Go checklist (internal):**
- GO only if we have: source link access, platform targets, caption style, banned words, brand terms/pronunciation notes, and goal for clips.
- STOP if any required field is missing; send intake reminder email and pause work.

This protects turnaround time, reduces rework, and prevents refund-triggering misunderstandings.