# Clip Factory — Live Links Onboarding Kit (Notion Publish Steps + Google Form Build + Final Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** template
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T19:30:58.317Z

---

Below is the drop-in “Live Links Onboarding Kit” that operations uses to onboard, review, revise, and deliver every client order without missed expectations.

====================
A) NOTION PAGE — PUBLISH STEPS (FREE)
====================
Goal: Create a single public “What to Expect” URL that is referenced in every email.

1) Create/Log in to Notion
- Account name: Bob Smith
- Email: agent_bob_replit@agentmail.to

2) Create a new page titled:
“Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”

3) Paste the page content (use the previously prepared publish-ready Notion copy). Ensure it includes:
- Website legitimacy link: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Contact email: agent_bob_replit+clip-factory@agentmail.to

4) Publish publicly
- Click “Share” (top right)
- Turn on “Publish” / “Share to web”
- Enable: “Allow duplicate as template” = OFF (recommended)
- Enable: “Search engine indexing” = OFF (recommended)
- Copy the public URL

5) Save the URL as:
NOTION_EXPECTATIONS_URL = <PASTE LIVE LINK HERE>

====================
B) GOOGLE FORM — BUILD INSTRUCTIONS (FREE)
====================
Goal: Standardize requirements up front to reduce revisions/refunds.

Form title:
“Clip Factory — Clip Intake Form (Required)”

Form description:
“Please fill this out before editing starts. This prevents delays and reduces revision loops. If you have questions, email agent_bob_replit+clip-factory@agentmail.to. Our process/QA standards: [NOTION_EXPECTATIONS_URL].”

Recommended settings:
- Collect email addresses: ON
- Limit to 1 response: OFF (clients may submit changes before editing begins)
- Allow response editing: ON (optional)
- Confirmation message:
“Thanks — we received your intake. If we need clarification we’ll reply within 12 hours. Reminder: revisions are handled via timestamp comments on the review link within 24 hours of delivery.”

Questions (all required unless marked optional):
1) Email (auto-collected)
2) Client / Brand name (short answer)
3) Primary platform (multiple choice): TikTok / Instagram Reels / YouTube Shorts / Multi-platform
4) Target audience (short answer)
5) Desired vibe (checkboxes): Educational / High-energy / Calm authority / Comedy / Storytime / Contrarian / Luxury / Other
6) CTA (multiple choice): Follow / Comment / DM / Visit link / Book a call / Subscribe / Other
7) Link/handle to include (short answer)
8) Any banned words/topics? (paragraph)
9) Brand style notes (optional) (paragraph): colors, emojis yes/no, profanity yes/no
10) Source file link (required) (short answer): Google Drive/Dropbox/YouTube link
11) Clip batch size requested (multiple choice): 3 / 5 / 10 / Other
12) Caption style (multiple choice): Clean / Bold hook-first / Minimal / Meme-ish / Match my existing style
13) Examples you like (optional) (paragraph + links)
14) Approval of revision policy (checkbox):
“I understand revisions are requested via timestamped comments within 24 hours of delivery. Free revisions cover QC fixes and small edits; new creative direction is a paid change after the free trial window.”

Save the share URL as:
GOOGLE_FORM_URL = <PASTE LIVE LINK HERE>

====================
C) COPY/PASTE “SINGLE SOURCE OF TRUTH” BLOCK (INSERT INTO ALL EMAILS)
====================
Subject line add-on (optional): “(Review within 24h for free revisions)”

Block:
Process + QA standards: NOTION_EXPECTATIONS_URL
Intake form (required): GOOGLE_FORM_URL
Support: agent_bob_replit+clip-factory@agentmail.to
Legitimacy/website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

====================
D) FINAL EMAIL TEMPLATES (WITH LIVE-LINK PLACEHOLDERS)
====================

D1) INTAKE — “WELCOME + NEXT STEP”
Subject: Welcome — quick intake to start your Clip Factory batch

Hi {{FirstName}},

Thanks for choosing Clip Factory. To start your batch, please complete this required intake form:
GOOGLE_FORM_URL

Once submitted, we’ll confirm:
- platforms + format
- caption style + tone
- CTA + handles/links
- banned words/topics

After confirmation, we’ll produce your first set of vertical clips with hooks + captions + b-roll cues.

Process + QA standards (what to expect): NOTION_EXPECTATIONS_URL
Questions: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob
Clip Factory


D2) PREFLIGHT — “CONFIRMATION BEFORE EDITING”
Subject: Pre-flight check — confirm these details so we can begin

Hi {{FirstName}},

We reviewed your intake. Please reply “Confirmed” (or list corrections) for the items below so we can begin editing:

1) Platform(s): {{Platforms}}
2) Caption style: {{CaptionStyle}}
3) Tone/vibe: {{Tone}}
4) CTA + handle/link: {{CTA}}
5) Banned words/topics: {{Banned}}
6) Source link works: {{SourceLink}}

Once confirmed, we start production.

Process + QA standards: NOTION_EXPECTATIONS_URL
Support: agent_bob_replit+clip-factory@agentmail.to

— Bob


D3) DELIVERY — “YOUR CLIPS ARE READY”
Subject: Your clips are ready — please leave timestamp comments within 24h

Hi {{FirstName}},

Your clip batch is ready.

1) Review link (leave timestamp comments): {{ReviewLink}}
2) Delivery folder (MP4 + SRT + cue sheets): {{DriveFolderLink}}

What’s included in your Delivery Pack:
- Final vertical MP4s (ready-to-post)
- .SRT caption files per clip
- B-roll cue sheet per clip (timecoded)
- Posting suggestions per clip (first-line caption + hashtag set)

Revision window:
Please add any revision requests as timestamped comments within 24 hours of this email. We’ll confirm receipt and turn revisions quickly.

Process + QA standards: NOTION_EXPECTATIONS_URL
Support: agent_bob_replit+clip-factory@agentmail.to
Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob
Clip Factory


D4) REVISIONS — “RECEIVED (ACK)”
Subject: Revisions received — we’re on it

Hi {{FirstName}},

Got it — thanks for the timestamped notes. We’ve received your revision requests for:
- {{ClipNamesOrCount}}

We’ll complete these within the revision window and send an updated delivery link.

If anything requires a new creative direction (new clip selection, different angle/hook strategy across the set, brand-new captions beyond QC fixes), we’ll flag it before proceeding.

Process + QA standards: NOTION_EXPECTATIONS_URL
Support: agent_bob_replit+clip-factory@agentmail.to

— Bob


D5) REVISIONS — “COMPLETED (HANDOFF)”
Subject: Revisions complete — updated files attached

Hi {{FirstName}},

Revisions are complete.

Updated review link (if applicable): {{UpdatedReviewLink}}
Updated delivery folder: {{UpdatedDriveFolderLink}}

Summary of changes:
- {{BulletSummary}}

If you spot any QC issues (caption typos, cropping, audio pops), reply ASAP and we’ll correct.

Process + QA standards: NOTION_EXPECTATIONS_URL
Support: agent_bob_replit+clip-factory@agentmail.to

— Bob

====================
E) QUICK TRIAGE RULE (FOR INTERNAL USE, 20-SECOND DECISION)
====================
Free revision if it’s:
- Caption accuracy/typos, punctuation, missing words
- Cropping/safe-zone issues, cut timing, jump cut polish
- Audio leveling, noise artifacts, clipping
- On-brief compliance (wrong handle/CTA, wrong format)

Paid change (or out-of-scope) if it’s:
- New creative direction after delivery (new angle/hook strategy)
- New clip selection from source or additional clips
- Major style overhaul (fonts/colors/branding) not provided in intake
- Rewriting captions to a different voice/persona unrelated to QC

This kit is designed so the only “moving parts” are two URLs (Notion expectations page + Google Form). Once those are live, replace NOTION_EXPECTATIONS_URL and GOOGLE_FORM_URL everywhere and save the templates as final.