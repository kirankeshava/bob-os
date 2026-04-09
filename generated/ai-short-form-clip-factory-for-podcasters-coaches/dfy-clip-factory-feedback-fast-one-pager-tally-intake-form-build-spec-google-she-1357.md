# DFY Clip Factory — Feedback Fast One-Pager + Tally Intake Form Build Spec + Google Sheets Tracker Build Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:21:29.965Z

---

# 1) Client One-Pager: How to Give Feedback Fast (So We Hit 48 Hours)

**Clip Factory Contact:** agent_bob_replit+clip-factory@agentmail.to  
**Proof/Website:** https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3

## The goal
We deliver **10 vertical clips within 48 hours**. The fastest way to keep the timeline is to collect feedback that is:
- Timestamped
- Objective (what to change)
- Minimal (only what matters)

## Where to leave feedback
We’ll send a review link (Frame.io or Google Drive). Please comment **directly on the clip** when possible.

## The format that gets changes done fastest
When you request changes, use **this exact format**:
- **Clip Name:** (example: `CLIP_03_ColdOpen_R2`)  
- **Timestamp:** `00:04–00:07`  
- **Change:** “Replace caption line with: ‘If you’re buying in 2026, do this first.’”  
- **Reason (optional):** “Compliance / clearer claim / brand tone.”

### Examples
1) “**CLIP_05** — **00:02–00:03** — Change hook text to: ‘3 mistakes new buyers make’.”
2) “**CLIP_02** — **00:12** — Remove the word ‘guarantee’ from captions.”
3) “**CLIP_07** — **00:00–00:01** — Swap opening frame to second camera angle if available.”

## What counts as a revision (and what doesn’t)
**Included (fast edits):**
- Caption wording tweaks
- Hook swap (from same clip moment)
- Minor cut tightening (±1–2 seconds)
- CTA end-card text edits
- Basic emoji/underline emphasis adjustments

**Not included (scope change):**
- Changing the selected highlight to a totally different segment
- Rebuilding the clip to match a new style preset after delivery
- Adding new b-roll sourcing that wasn’t in the original assets
- Re-cutting 10 clips because strategy changed

If you need scope changes, we’ll quote it, but we’ll always try to keep you inside the 48-hour window.

## Feedback deadline to keep the 48-hour SLA
To guarantee on-time delivery:
- Please send revision notes within **12 hours** of receiving the draft review link.

## The “one decision” rule
If you’re unsure, choose one:
- **Option A:** “Make it punchier” (we tighten pacing + increase pattern interrupts)
- **Option B:** “Make it clearer” (we simplify captions + add clarifying b-roll cue)

That single direction is enough for us to execute quickly.

---

# 2) Tally.so Intake Form — Build Spec (Free Tier)

Create a Tally form titled: **“Clip Factory Intake — 10 Clips / 48 Hours”**

## Form settings
- Collect submissions: ON
- Send respondent a copy: optional
- Notification email to: **agent_bob_replit+clip-factory@agentmail.to**
- Confirmation message (shown after submit):
  
**“Thanks — we’ve received your intake. We’ll confirm receipt within 2 business hours and start production. Proof/site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3. Questions: agent_bob_replit+clip-factory@agentmail.to”**

## Sections + questions (copy/paste)
### A) Contact + brand
1. **Full name** (Short text) — Required
2. **Email** (Email) — Required
3. **Brand / Company name** (Short text) — Required
4. **Primary social handle(s)** (Short text) — Optional

### B) Source content
5. **Upload source file OR paste link** (Add both fields)
   - **Source file upload** (File upload) — Optional (if Tally free tier limits uploads, keep optional)
   - **Source link** (Long text) — Required (Drive/Dropbox/YouTube unlisted/etc.)
6. **Source type** (Multiple choice) — Required
   - Podcast video
   - Zoom recording
   - YouTube video
   - Webinar
   - Other
7. **Length of the full video** (Multiple choice) — Required
   - < 20 min
   - 20–60 min
   - 60–120 min
   - 2+ hours

### C) Output targets
8. **Platforms** (Checkboxes) — Required
   - TikTok
   - Instagram Reels
   - YouTube Shorts
9. **Preferred clip length** (Multiple choice) — Required
   - 15–25s
   - 25–45s
   - 45–60s
10. **Topic focus / themes to prioritize** (Long text) — Required
11. **Words/phrases to avoid (compliance/brand)** (Long text) — Optional

### D) Style presets
12. **Choose a style preset** (Multiple choice) — Required
   - Real Estate
   - Fitness
   - B2B / Consulting
   - “Use my brand (I’ll upload brand kit)”

**Conditional logic:** If “Use my brand” selected → show brand kit upload questions:
13. **Upload brand kit (logo, font, colors, examples)** (File upload) — Optional
14. **Paste links to 2 example clips you love** (Long text) — Required

### E) Hooks + CTA
15. **CTA to include** (Multiple choice) — Required
   - Follow
   - Comment (keyword)
   - Book a call
   - Download lead magnet
   - Subscribe
16. **CTA link (if relevant)** (Short text) — Optional
17. **Any required on-screen disclaimer** (Long text) — Optional

### F) Delivery + turnaround
18. **Delivery email** (Email) — Required
19. **Timezone** (Short text) — Optional
20. **Any hard deadline in next 48 hours?** (Multiple choice) — Required
   - No
   - Yes (describe)
21. **If yes, deadline details** (Long text) — Conditional

### G) Approvals + permissions
22. **I confirm I have rights to use this content and music assets provided** (Checkbox) — Required
23. **I agree to the 48-hour delivery + revision policy** (Checkbox) — Required

---

# 3) Google Sheets Clip Tracker — Build Spec (Free)

Create a Google Sheet named: **“Clip Factory — Production Tracker (Master)”**

## Tabs
1) **Tracker** (main)  
2) **Lists** (dropdown sources)  
3) **SLA Dashboard** (simple metrics)

## Tab: Lists
Create these columns:
- **Status** (one per row): `Intake Received`, `Queued`, `Selecting Highlights`, `Editing`, `Captions`, `QA`, `Client Review`, `Revision`, `Delivered`, `Blocked`
- **Platform**: `TikTok`, `IG Reels`, `YT Shorts`
- **Preset**: `Real Estate`, `Fitness`, `B2B`, `Custom`
- **Priority**: `P0`, `P1`, `P2`

## Tab: Tracker (columns)
Add these columns in row 1:
- A: **Client**
- B: **Project ID** (example `CLF-2026-0412-ACME01`)
- C: **Episode/Asset Name**
- D: **Source Link**
- E: **Preset** (dropdown)
- F: **Platform** (dropdown)
- G: **Clip #** (1–10)
- H: **Clip Name** (auto or manual)
- I: **Hook Text (draft)**
- J: **Highlight Timestamp (in/out)**
- K: **Editor Owner**
- L: **Status** (dropdown)
- M: **Draft Link** (Frame.io/Drive)
- N: **QA Pass?** (checkbox)
- O: **Client Notes**
- P: **Revision Count** (number)
- Q: **Final Export Link**
- R: **Intake Timestamp** (date/time)
- S: **Delivery Due** (date/time)
- T: **Delivered Timestamp** (date/time)
- U: **SLA Met?** (formula)
- V: **Blocker Reason**

### Useful formulas
- **Clip Name (H2)** suggestion:
  `=TEXTJOIN("_",TRUE,$B2,"CLIP"&TEXT($G2,"00"),$F2,$E2)`
- **Delivery Due (S2)** (48 hours after intake):
  `=$R2+2`
- **SLA Met? (U2)**:
  `=IF($T2="","",IF($T2<=$S2,"YES","NO"))`

## Data validation
- Preset (E): range from Lists!Preset
- Platform (F): Lists!Platform
- Status (L): Lists!Status
- Priority (optional column): Lists!Priority

## Tab: SLA Dashboard (simple)
- Total clips in progress: `=COUNTIF(Tracker!L:L,"<>Delivered")-1`
- Delivered on time: `=COUNTIF(Tracker!U:U,"YES")`
- Delivered late: `=COUNTIF(Tracker!U:U,"NO")`
- Blocked count: `=COUNTIF(Tracker!L:L,"Blocked")`

## Views (manual filters)
- Filter view: **“Needs QA”** where Status = QA
- Filter view: **“Client Review”** where Status = Client Review
- Filter view: **“Due in 12h”** where Delivery Due within next 12 hours

---

# 4) Client Comms Cadence Micro-SOP (48-hour safe)

1. **Within 2 business hours of intake:** Send “Intake received + kickoff” email. Include: next steps, expected delivery timestamp, and reminder that revision notes are due within 12 hours of draft review to keep SLA. Include site + contact: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3 and agent_bob_replit+clip-factory@agentmail.to.
2. **At ~24-hour mark:** Send “Midpoint check-in” with what’s done (e.g., highlight selection complete, editing in progress) and confirm CTA + preset.
3. **Delivery:** Send “10 clips delivered” email with links + the feedback-fast one-pager.
4. **If revisions requested:** Acknowledge within 2 hours, confirm scope fits policy, and provide revised delivery timestamp.
