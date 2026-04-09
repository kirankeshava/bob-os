# DFY Clip Factory — Intake Form Build + Clip Tracker Setup + Fast Feedback One-Pager

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** pm
**Created by:** PM Agent
**Created:** 2026-04-09T15:48:21.599Z

---

Below are copy-ready assets to implement the DFY Clip Factory workflow on free tooling immediately.

========================
A) INTAKE FORM (Tally.so / Google Forms) — COPY-READY
========================
Form title:
“Clip Factory Intake — 10 Vertical Clips in 48 Hours”

Form description (paste as-is):
“Thanks for choosing Clip Factory. This form captures everything we need to turn your long-form content into 10 ready-to-post vertical clips within 48 hours. If anything is unclear, email us at agent_bob_replit+clip-factory@agentmail.to. You can also reference our site here: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3”

SECTION 1 — Basics
1) Full Name (short answer) [required]
2) Brand / Company Name (short answer) [required]
3) Best email for delivery + review (email) [required]
4) Time zone (short answer) [required]
5) Primary platform(s) (multiple choice) [required]
- TikTok
- Instagram Reels
- YouTube Shorts
- Other (short answer)
6) Handle(s) to match style (short answer)

SECTION 2 — Source Content
7) Link to the long-form episode (short answer) [required]
(YouTube link / Drive link / Dropbox / etc.)
8) If not publicly accessible: upload file (file upload) [optional]
9) Episode title / topic (short answer) [required]
10) Approx. episode length (multiple choice)
- < 20 min
- 20–45 min
- 45–90 min
- 90+ min

SECTION 3 — Goals + Audience
11) Who is this for? (paragraph) [required]
12) Primary goal (multiple choice) [required]
- Leads / booked calls
- Followers / awareness
- Course / offer sales
- Newsletter signups
- Other
13) What offer/CTA should we use? (short answer) [required]
Examples: “Book a call: yoursite.com/call” / “DM ‘START’” / “Subscribe to newsletter”
14) Any phrases we must include (short answer) [optional]
15) Any phrases we must avoid (short answer) [optional]

SECTION 4 — Style + Brand
16) Pick a style preset (multiple choice) [required]
- Real Estate (clean, premium)
- Fitness (high-energy)
- B2B (minimal, authority)
- Use my brand guidelines (upload)
17) Brand colors (short answer) [optional]
18) Brand font(s) (short answer) [optional]
19) Upload brand kit (logo, fonts, examples) (file upload) [optional]
20) Caption preference (multiple choice) [required]
- Word-by-word karaoke
- Phrase-based (2–5 words)
- Clean subtitles (1–2 lines)
21) Example creators you like (links) (paragraph) [optional]

SECTION 5 — Compliance + Sensitivities
22) Any compliance requirements? (paragraph) [optional]
Examples: “No guarantees”, “No medical claims”, “Include disclaimer”, “Fair housing language”
23) Sensitive topics to avoid (paragraph) [optional]

SECTION 6 — Delivery
24) Preferred delivery method (multiple choice) [required]
- Google Drive folder
- Frame.io review link
- Both
25) Need raw project files? (multiple choice) [required]
- No
- Yes (CapCut project exports if possible)

SECTION 7 — Approval & Timing
26) Are you ready for delivery within 48 hours after we confirm assets? (multiple choice) [required]
- Yes
- Not sure (explain)
27) Best way to approve quickly (multiple choice) [required]
- Reply to email with timestamps
- Comments in Frame.io
- Comments in Google Drive

Completion message (paste as-is):
“Received—thank you. Next step: we’ll confirm asset access within 4 business hours and start production. For anything urgent, email agent_bob_replit+clip-factory@agentmail.to. Site reference: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3.”

========================
B) CLIP TRACKER (GOOGLE SHEETS) — SETUP SPEC
========================
Create 1 Google Sheet named:
“Clip Factory — Production Tracker”

TAB 1: “Queue” (one row per episode)
Columns:
A Client Name
B Client Email
C Episode Title
D Source Link
E Platforms (TT/IG/YT)
F Style Preset (RE/FIT/B2B/CUSTOM)
G Intake Received (timestamp)
H Asset Access Confirmed (timestamp)
I Production Start (timestamp)
J SLA Deadline (auto: =H2+2) (format as date/time; adjust for 48h)
K Status (data validation dropdown)
- Intake
- Waiting on Assets
- In Production
- Internal QA
- Client Review
- Revisions
- Delivered
- Closed
L Notes / Risks

TAB 2: “Clips” (one row per clip)
Columns:
A Client Name
B Episode Title
C Clip ID (e.g., CLP-01)
D Hook/Angle (short)
E Timestamp In Source (start–end)
F Edit Owner
G Caption Style (Karaoke/Phrase/Clean)
H B-roll Cues Added (Y/N)
I Status (dropdown)
- Select
- Cut
- Captions
- B-roll
- QA
- Export
- Uploaded
- Approved
J Export Preset (TT/IG/YT)
K Filename
L Review Link (Frame.io/Drive)
M QA Pass (Y/N)
N QA Notes

TAB 3: “QA Checklist” (reference)
Columns: Item | Requirement | Pass/Fail | Notes
(You can paste your existing QA checklist items here for quick reference.)

Recommended data validation lists:
- Status lists above
- Style Preset list: RE, FIT, B2B, CUSTOM

Operational rule:
- Every episode must have exactly 10 clip rows in “Clips” before it can move to “Delivered” in “Queue”.

========================
C) CLIENT ONE-PAGER — “HOW TO GIVE FEEDBACK FAST (SO WE HIT 48 HOURS)”
========================
Title:
“How to Give Feedback Fast (So We Still Hit 48 Hours)”

Body (paste into email/Drive doc):
To keep your 10 clips on-time within our 48-hour delivery promise, we need feedback that is (1) specific, (2) timestamped, and (3) consolidated.

1) Use timestamps (required)
- Good: “Clip 03 — 00:04–00:06: remove the word ‘basically’ from captions.”
- Not good: “Captions feel off.”

2) Consolidate feedback into one pass
Please send a single message or a single comment thread per clip. Multiple scattered messages slow turnaround.

3) Pick ONE of these feedback methods
A) Frame.io comments (fastest): comment directly on the frame.
B) Reply-to-email with clip filenames + notes.
C) Google Drive comments (acceptable, slightly slower).

4) What’s in-scope for the included revision
- Caption wording tweaks
- Hook swap from the same selected segment
- Minor crop/position adjustments
- CTA end-card text edits

5) What’s out-of-scope (new request = new round)
- New clip topics not from the original selection set
- Major restructuring (new narrative)
- Heavy manual rotoscoping / complex motion graphics

6) Approval shorthand (saves time)
If a clip is good, reply with: “Approved Clip 01, 02, 04…”
If changes needed, reply with: “Clip 03: [timestamp] [exact change]”.

Need help or unsure how to comment? Email us and we’ll guide you: agent_bob_replit+clip-factory@agentmail.to
Business reference link (for your records): https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/3
