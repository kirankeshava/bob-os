# Clip Factory — Onboarding Kit (Publish Steps + Live-Link Slots + Final Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:39:59.595Z

---

Below is the exact “last-mile” onboarding kit to publish and operationalize the QA/review/delivery system with live links.

BUSINESS LEGITIMACY LINKS (include in all client comms)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
- Support/Contact: agent_bob_replit+clip-factory@agentmail.to

A) PUBLISH THE CLIENT-FACING ‘WHAT TO EXPECT’ PAGE (NOTION, FREE)
Goal: a single public page that explains QA standards, review flow, delivery pack contents, and revision policy.
1) Go to Notion and create/login account using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
2) Create a new page titled:
   “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”
3) Paste the previously drafted page copy (from the prior cycle artifact) into this page.
4) Add a top section called “Official Links” and include:
   - Website URL (above)
   - Support email (above)
5) Enable sharing:
   - Click “Share” → toggle “Publish” (public) → “Copy link”
6) Save the live URL here (to insert into templates):
   - NOTION_EXPECTATIONS_URL = [PASTE LIVE LINK]

B) CREATE CLIENT INTAKE FORM (GOOGLE FORMS OR FALLBACK)
Primary option: Google Forms (free)
1) Sign in / create Google account with:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to (if Google blocks, use fallback below)
2) Google Drive → New → Google Forms → Blank
3) Title: “Clip Factory — Client Intake (Short-Form Clips)”
4) Build questions per spec (below). Mark starred items Required.
5) Settings: allow anyone with link to respond; collect email address ON.
6) Send → Link icon → Copy link
7) Save the live URL here:
   - INTAKE_FORM_URL = [PASTE LIVE LINK]

Fallback option: Tally.so (free, no Google required)
1) Create Tally account using Bob / agent_bob_replit@agentmail.to
2) Create a form with the same questions below
3) Publish and copy share link
4) Use that link as INTAKE_FORM_URL

INTAKE FORM QUESTIONS (BUILD SPEC)
Client + Account Basics
1) Email (required; collect automatically if platform supports)
2) Brand/Channel name (required)
3) Primary social platforms for these clips (required; checkbox): TikTok, Instagram Reels, YouTube Shorts, LinkedIn, Other
4) Social handle(s) + link(s) (required)
5) Preferred tone (required; multiple choice): Educational, Punchy/energetic, Calm/premium, Funny, Motivational, Other

Content + Editing Preferences
6) Content topic/niche (required)
7) Goal of these clips (required; multiple choice): Followers, Leads, Course sales, Podcast listens, Brand awareness
8) Call-to-action to include (required): (short paragraph)
9) Any banned words/topics or compliance constraints? (required; yes/no)
   - If yes: list them (required)
10) Caption style preference (required; multiple choice): Bold key words, Sentence case, All caps hooks, Minimal captions
11) On-screen branding (optional): logo file link, brand colors, fonts

Source Media + Selection
12) Link to long-form video/podcast (required)
13) Best moments/time ranges (optional): “00:12:10–00:13:05” etc.
14) Competitors/creators you like (optional)

C) INTERNAL PRE-FLIGHT CHECK (RUN BEFORE EDITING STARTS)
Use this to confirm the intake is actionable and prevent avoidable revisions.
- Platform targets confirmed
- Handle/links confirmed
- CTA confirmed
- Banned words/topics confirmed
- Caption style confirmed
- Branding assets received (if applicable)
- Source link accessible + downloadable
If anything is missing → send “Pre-Flight Confirmation” email (template below) and pause editing until answered.

D) FINAL EMAIL TEMPLATES (WITH LIVE-LINK SLOTS)
IMPORTANT: Replace NOTION_EXPECTATIONS_URL and INTAKE_FORM_URL once published.

1) INTAKE / WELCOME EMAIL (send immediately after lead says yes)
Subject: Welcome to Clip Factory — quick intake to start your clips
Hi {{FirstName}},

Thanks for jumping in. To kick off your free Clip Factory trial, please complete this short intake form:
{{INTAKE_FORM_URL}}

What to expect (QA standards, review flow, delivery format, revisions):
{{NOTION_EXPECTATIONS_URL}}

Official site (for reference):
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

If you have any issues with links or access, reply here:
agent_bob_replit+clip-factory@agentmail.to

— Bob

2) PRE-FLIGHT CONFIRMATION / CLARIFYING QUESTIONS (send if intake incomplete)
Subject: Quick confirmation before we start editing
Hi {{FirstName}},

We’re ready to start, but we need 1–3 quick confirmations to avoid avoidable revisions:

1) {{Question1}}
2) {{Question2}}
3) {{Question3}}

Once you reply, we’ll begin editing immediately.

Reference: What to expect + QA/review/delivery
{{NOTION_EXPECTATIONS_URL}}

— Bob
agent_bob_replit+clip-factory@agentmail.to

3) DELIVERY EMAIL (send with final delivery pack + review link)
Subject: Your clips are ready — review link inside (24h revision window)
Hi {{FirstName}},

Your Clip Factory delivery is ready.

Review link (leave timestamped comments):
{{REVIEW_LINK}}

Delivery folder (MP4s + SRT + cue sheets):
{{DRIVE_FOLDER_LINK}}

What’s included in this delivery pack:
- Final vertical MP4 clips (ready to post)
- Captions file(s) in SRT format
- B-roll cue sheet (timecoded)
- Posting suggestions (first-line caption + hashtags + platform notes)

Revision window: Please leave all timestamped feedback within 24 hours (by {{REVISION_DEADLINE_DATE_TIME}}). We’ll turn around fixes fast.

Process + QA standards (for reference):
{{NOTION_EXPECTATIONS_URL}}

Support:
agent_bob_replit+clip-factory@agentmail.to
Official site:
https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob

4) REVISION RECEIVED (ACK)
Subject: Got your revision notes — we’re on it
Hi {{FirstName}},

Received your timestamped notes — thank you. We’re implementing the requested fixes now.

If you want to add anything else, please reply with additional timestamped comments by {{REVISION_DEADLINE_DATE_TIME}} so we can batch changes in one pass.

Reference process:
{{NOTION_EXPECTATIONS_URL}}

— Bob
agent_bob_replit+clip-factory@agentmail.to

5) REVISION COMPLETED (HANDOFF)
Subject: Revisions completed — updated clips uploaded
Hi {{FirstName}},

Revisions are complete. Updated files are here:
- Review link (updated): {{REVIEW_LINK_UPDATED}}
- Delivery folder: {{DRIVE_FOLDER_LINK}}

If anything looks off relative to the original scope/QA expectations, reply within the revision window and we’ll correct it.

Reference process:
{{NOTION_EXPECTATIONS_URL}}

— Bob
agent_bob_replit+clip-factory@agentmail.to

E) FILE/FOLDER NAMING (FOR CONSISTENT DELIVERY)
ClientFolder/
  01_Final_MP4/
    ClientName_EpXX_Clip01_9x16_v1.mp4
  02_Captions_SRT/
    ClientName_EpXX_Clip01_v1.srt
  03_Broll_Cue_Sheets/
    ClientName_EpXX_Clip01_broll_cues_v1.csv
  04_Posting_Suggestions/
    ClientName_EpXX_Clip01_posting_notes_v1.txt
  05_Review/
    Review_Link.txt

Once the two live URLs are created (Notion + Intake Form), paste them into all templates and save the final version as the single source of truth for onboarding and delivery.