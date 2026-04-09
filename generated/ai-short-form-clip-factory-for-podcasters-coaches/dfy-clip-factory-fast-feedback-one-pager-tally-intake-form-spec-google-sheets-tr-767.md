# DFY Clip Factory — Fast Feedback One-Pager + Tally Intake Form Spec + Google Sheets Tracker Spec

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T10:15:49.838Z

---

## 1) Client One-Pager: How to Give Feedback Fast (So We Still Hit 48 Hours)

**Clip Factory Contact**
- Website (legitimacy + details): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
- Email: agent_bob_replit+clip-factory@agentmail.to

### The goal
We deliver **10 ready-to-post vertical clips in 48 hours**. The only way this works consistently is **fast, specific feedback**.

### When to send feedback
- **Best:** within **6 hours** of receiving the review link.
- **Latest:** within **12 hours**.
- If feedback arrives after 12 hours, delivery may shift because we keep the pipeline moving.

### How to format feedback (copy/paste)
Send feedback in this format for each clip:
- **Clip ID:** (example: C03)
- **Timestamp:** (example: 00:12–00:18)
- **Change request:** (example: “Remove the word ‘basically’ from captions and tighten the pause.”)
- **Priority:** Must-have / Nice-to-have

**Examples of “good” feedback**
- “C04 — 00:00–00:02: Hook text should be ‘3 mistakes first-time buyers make’ (not ‘tips’). Must-have.”
- “C07 — 00:09: Add b-roll cue: ‘on-screen: MLS screenshot blur’ Nice-to-have.”

**Examples of “slow” feedback (please avoid)**
- “Make it more engaging.”
- “The vibe feels off.”
These require guesswork and extra cycles.

### What counts as a revision (so we stay fast)
Included revisions are **tight, surgical changes**:
- Caption typos, punctuation, minor rewording
- Hook text swap (same idea)
- Small trim (±3 seconds)
- Change one b-roll cue
- Adjust caption position/size within the chosen template

Not included (new scope / new order):
- New clip selection (different moment)
- Full re-edit with different structure
- New style system / new fonts/colors beyond selected preset
- Rebuilding all captions due to new transcript source

### Revision policy (quick version)
- **Included:** 1 revision round per batch (up to **10 clips**), max **15 minutes of edit time per clip**.
- **Additional revisions:** treated as a new mini-batch or billed separately (we will confirm before doing any extra work).

### Approval rule
If you reply: **“Approved—post-ready”** (or react/approve in the review tool), we finalize exports immediately.

### If you’re busy: the “minimum viable feedback” option
If you only have 2 minutes:
1) Approve the best **7 clips**.
2) For the remaining **3**, tell us “Keep / Replace” and give 1 sentence why.
We’ll make the fastest possible fixes while preserving the SLA.

---

## 2) Tally Intake Form (Free Tier) — Build Spec (Field-by-Field)

**Form title:** Clip Factory Intake — 10 Clips in 48 Hours

**Intro text (top of form):**
“Thanks for choosing Clip Factory. This form collects everything we need to deliver 10 vertical clips in 48 hours. If anything is missing, we’ll email you at the address below. Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3 | Contact: agent_bob_replit+clip-factory@agentmail.to”

### Section A — Client & project basics
1) **Name** (short text) — required
2) **Email** (email) — required
3) **Brand / Channel name** (short text) — required
4) **Time zone** (dropdown) — required
5) **Primary platform** (multiple choice) — TikTok / Instagram Reels / YouTube Shorts
6) **Secondary platform(s)** (checkboxes) — optional

### Section B — Source content
7) **Upload link** (long text) — required (Drive/Dropbox/YouTube unlisted/Riverside/Zoom)
8) **File type** (multiple choice) — Video / Audio-only / YouTube link
9) **Episode title** (short text) — required
10) **Episode length** (number, minutes) — required
11) **Any “do not use” segments?** (long text) — optional

### Section C — Style & brand
12) **Choose a style preset** (multiple choice) — Real Estate / Fitness / B2B / “Use my brand kit”
13) **Brand kit link** (long text) — conditional required if “Use my brand kit”
14) **On-screen name/title** (short text) — optional (e.g., “Dr. Jane Smith | PT, DPT”)
15) **Preferred caption vibe** (multiple choice) — Clean / Bold / High-energy

### Section D — Content goals (helps clip selection)
16) **Who is the audience?** (long text) — required
17) **Primary CTA** (multiple choice) — Follow / Book a call / Download lead magnet / DM keyword / Subscribe
18) **CTA link or DM keyword** (short text) — optional
19) **Topics to prioritize** (long text) — required
20) **Topics to avoid** (long text) — optional

### Section E — Compliance & permissions
21) **I confirm I have rights to use this content and any included music/assets** (checkbox) — required
22) **Sensitive claims?** (checkbox) — Finance / Health / Legal / None
23) **Mandatory disclaimer text** (long text) — optional

### Section F — Delivery
24) **Preferred delivery method** (multiple choice) — Google Drive / Frame.io
25) **Destination email(s) for delivery** (long text) — required
26) **Anything else we should know?** (long text) — optional

**End screen message:**
“Submitted. We’ll confirm receipt within 2 business hours. For urgent updates email: agent_bob_replit+clip-factory@agentmail.to”

---

## 3) Google Sheets Clip Tracker — Build Spec (Tabs, Columns, Statuses)

**Sheet name:** Clip Factory — Production Tracker

### Tab 1: Dashboard (optional but useful)
- KPI cells (manual or formula):
  - Client name
  - Episode
  - Due date/time (48h)
  - # clips target (10)
  - # clips approved
  - # clips exported
  - SLA risk flag (On track / At risk)

### Tab 2: Clips (core production table)
**Columns (left to right):**
1) Client
2) Episode ID
3) Episode Title
4) Source Link
5) Clip ID (C01–C10)
6) Timestamp In
7) Timestamp Out
8) Hook Text (first line)
9) Topic/Angle
10) Preset (Real Estate/Fitness/B2B/Brand Kit)
11) Caption Style (Clean/Bold/High-energy)
12) B-roll cues (short)
13) Editor Owner
14) Status (data validation dropdown)
15) QA Pass (checkbox)
16) Client Review Status (dropdown)
17) Revision Notes (short)
18) Export Link
19) Final Delivery Link
20) Notes

**Status dropdown values (production):**
- Intake Received
- Source Downloaded
- Highlights Selected
- Edit In Progress
- Captions Styled
- QA Pending
- QA Passed
- Sent to Client Review
- Revisions In Progress
- Approved
- Exported
- Delivered

**Client Review Status dropdown values:**
- Not sent
- Waiting
- Feedback received
- Approved

### Tab 3: Clients (light CRM)
- Client
- Contact email
- Preferred platform
- Preset
- Last delivery date
- Notes

**Sharing/permissions recommendation:**
- Internal team: Editor access
- Client: View-only to the Delivery folder, not the tracker (prevents confusion and scope creep)

---

If you want, I can convert the above specs into the *actual* live Tally form + Google Sheet and then update the onboarding doc and delivery email with the share links (free tiers only).