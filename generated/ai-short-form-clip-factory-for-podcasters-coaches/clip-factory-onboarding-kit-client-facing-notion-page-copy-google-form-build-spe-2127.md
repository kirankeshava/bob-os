# Clip Factory — Onboarding Kit (Client-Facing Notion Page Copy + Google Form Build Spec + Pre-Flight Mapping + Links Block)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:49:48.278Z

---

# Clip Factory — What to Expect (QA, Review, Delivery, Revisions)

**Business website (legitimacy link):** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3  
**Contact:** agent_bob_replit+clip-factory@agentmail.to

## 1) What you’ll receive (Delivery Pack)
For each clip, you’ll receive a **Delivery Pack** containing:
1. **Final vertical MP4** (ready to post)
2. **Caption file (.SRT)** (matches the final MP4)
3. **B-roll / on-screen cue sheet** (simple, timestamped suggestions)
4. **Posting suggestions** (first-line caption options + hashtag set + platform notes)

**Typical output format:** 9:16 vertical, crisp subtitles, strong hook, clean pacing.

## 2) Quality Standards (QA checklist we run before delivery)
We run a final QA pass on every clip. Highlights:

### A) Safe zones & framing
- No cropped faces (especially top of head / chin)
- Subject stays inside safe areas (keeps UI overlays from blocking text)
- On-screen text and captions avoid bottom UI areas and right-side buttons (TikTok/Reels)
- If source footage is wide, we use smart reframing or punch-ins to keep the speaker centered

### B) Captions accuracy & readability
- Captions match spoken words (no meaning changes)
- Proper nouns/brand terms corrected when provided
- Line breaks readable; no long single-line walls of text
- Consistent styling: casing, punctuation, emphasis
- Offensive/flagged terms handled per your “banned words” list

### C) Audio leveling & clarity
- Speech is clear and intelligible; minimal background noise
- Loudness is normalized (no huge volume jumps)
- No clipping, peaking, or harsh sibilance

### D) Edit pacing: jump cuts & hook clarity
- Hook is clear within the first 1–2 seconds
- Dead air removed; jump cuts feel intentional, not jarring
- Clip has a single clear point (no rambling)
- CTA and end beat feel natural (no awkward cutoffs)

### E) Export & platform formatting
- Vertical 9:16 export
- Clean encode (no stutter, no weird artifacts)
- File names consistent so you can post quickly

## 3) Review flow (fast, timestamped, minimal back-and-forth)
We deliver a **review link** (Frame.io / Vimeo / unlisted YouTube) where you can leave **timestamp comments**.

**How to review efficiently:**
1. Watch each clip once without pausing.
2. Second pass: add timestamp comments only for changes that matter.
3. If you want a wording fix, paste the exact replacement text.

## 4) Revisions: 24-hour window
You have a **24-hour revision window** starting from the moment we send the review/delivery link.

Why: this keeps your content moving and protects turnaround speed.

**Best practice:** consolidate all revision notes into a single message/thread.

## 5) What counts as a free revision vs. a paid change
We want you happy, but we also prevent scope creep.

### Free revisions (included)
We fix anything that is:
- A **QA miss** (cropped face, incorrect safe zones, export issue)
- **Caption mismatch** or clear transcription errors (assuming terms were provided)
- **Minor timing tweaks** to captions (readability/placement)
- **Small audio adjustments** (leveling, minor cleanup)
- **Small edit adjustments** that keep the same concept (tighten a pause, swap a take if available)

### Paid changes (out of scope)
These are new creative direction or new work after delivery, such as:
- New clip topic selection or completely different hook angle
- Adding brand-new b-roll sourcing beyond cues (researching/collecting assets)
- Major restructuring (turning a clip into a different narrative)
- New captions style package after approving the original style
- Requesting multiple alternative versions per clip (A/B variants) unless agreed upfront

If something is borderline, we’ll tell you before we do the work.

## 6) What we need from you (Intake)
To avoid preventable revisions, we ask for:
- Your target platforms (TikTok / Reels / Shorts)
- Handles, links, CTA preference
- Brand terms + banned words
- Caption style preference (clean vs. bold/emphasis)
- Content constraints (topics to avoid)

---

# Google Form — Client Intake (Build Spec)
**Form title:** Clip Factory — Client Intake (Short-Form Clips)

### Section 1: Contact + Links
1) **Name** (Short answer, required)  
2) **Email** (Short answer, required)  
3) **Primary channel / brand name** (Short answer, required)  
4) **Link to long-form source** (Short answer, required; allow multiple links separated by commas)  
Prompt: “Paste the YouTube link, Google Drive link, Dropbox link, or podcast episode link.”

### Section 2: Platforms + Output
5) **Where are you posting?** (Checkboxes, required)
- TikTok
- Instagram Reels
- YouTube Shorts
- Other (short answer)

6) **How many clips do you want from this source?** (Multiple choice, required)
- 3
- 5
- 7
- 10
- Other (short answer)

7) **Preferred clip length** (Multiple choice, required)
- 15–30s
- 30–45s
- 45–60s
- 60–90s

### Section 3: Style + Tone
8) **Editing vibe** (Multiple choice, required)
- Clean & minimal (podcast style)
- High-energy (fast cuts, punch-ins)
- Story-driven (more context)
- Authority/coach style (clear teaching beats)

9) **Caption style** (Multiple choice, required)
- Standard subtitles (clean)
- Emphasis captions (highlight key words)
- Mixed (mostly clean + occasional emphasis)

10) **Emoji usage in captions** (Multiple choice, required)
- None
- Light
- Moderate

### Section 4: CTA + Links
11) **Primary CTA** (Multiple choice, required)
- Follow for more
- Comment a keyword
- Visit website
- Book a call
- Download freebie
- Other (short answer)

12) **CTA link / handle** (Short answer, required)
Prompt: “Website URL, booking link, or handle we should reference.”

### Section 5: Brand Terms + Safety
13) **Brand/product names that must be spelled exactly** (Paragraph, optional)  
14) **Banned words/topics** (Paragraph, optional)
Prompt: “Any words we should avoid in captions/on-screen text?”

15) **Topics to avoid** (Paragraph, optional)

### Section 6: Clip Selection Guidance
16) **Do you want us to pick the best moments, or do you have timestamps?** (Multiple choice, required)
- You pick the best moments
- I’ll provide timestamps

17) **If providing timestamps, paste them here** (Paragraph, optional)
Prompt: “Example: 12:14–12:55 ‘pricing objection’.”

### Section 7: Approval + Deadline
18) **Any hard deadline?** (Multiple choice, required)
- No hard deadline
- Yes (enter date)

19) **If yes, deadline date** (Date, optional)

20) **Confirm: You’ll review within 24 hours of delivery to fit the revision window.** (Checkbox, required)
- Yes, I understand.

---

# Pre-Flight Mapping Checklist (Ops/Internal)
Use this checklist immediately after intake is submitted.

1) **Source link works + permissions verified** (view/download)  
2) **Platforms chosen** → confirm export assumptions (9:16 always; UI-safe text)  
3) **Clip count + length** → confirm feasible from source duration  
4) **Vibe + caption style selected** → apply preset style  
5) **Emoji setting** → apply consistently  
6) **CTA chosen + CTA link/handle provided** → add to posting suggestions  
7) **Brand terms** → add to “spellcheck list” for captions  
8) **Banned words/topics** → flag editor; avoid in captions/on-screen  
9) **Timestamps?** If yes, confirm format is clear; if no, editor selects  
10) **Deadline** → set internal due time buffer to avoid late delivery  
11) **Review agreement (24h)** confirmed  

If any required field is missing or unclear, send “Intake Clarification” email before editing begins.

---

# Onboarding Links + How to Use (Copy for Emails / Drive Folder)
**Start here:**
- What to Expect (QA + review + delivery + revisions): [PASTE NOTION LINK]
- Client Intake Form: [PASTE GOOGLE FORM LINK]

**How it works:**
1) Fill out the intake form (platforms, tone, CTA, brand terms).  
2) We edit and run QA.  
3) You get a review link for timestamp comments.  
4) You have **24 hours** for revision notes (consolidated is best).  
5) Final delivery pack includes MP4 + SRT + b-roll cues + posting suggestions.

**Need help?** Email us: agent_bob_replit+clip-factory@agentmail.to  
**Business site:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
