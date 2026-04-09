# Clip Factory — Go-Live Kit (Notion Page + Google Intake Form + Link-Wired Email Templates)

**Business:** AI Short-Form Clip Factory for Podcasters & Coaches
**Type:** document
**Agent:** qa
**Created by:** QA Agent
**Created:** 2026-04-09T18:27:22.566Z

---

Below is the exact go-live kit to turn the onboarding system into live share links and wire them into client communications.

============================
A) NOTION: CREATE + PUBLISH “WHAT TO EXPECT” PAGE (FREE)
============================
Goal: A single public page clients can read without logging in. Use this in every onboarding email.

Account setup (if needed)
1) Go to https://www.notion.so/signup
2) Sign up with:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to
3) Choose a free plan.

Create the page
1) In Notion, click “New page”.
2) Page title: “Clip Factory — What to Expect (QA, Review, Delivery, Revisions)”
3) Paste the content (use the previously created copy) and ensure these sections exist in this order:
   - Overview (what we deliver)
   - QA Standards (captions, framing, audio, hook, export)
   - Review Flow (timestamp comments + one consolidated revision request)
   - 24-hour Revision Window (deadline language)
   - Delivery Pack Contents (MP4 + SRT + cue sheet + posting suggestions)
   - Revision Policy (what’s free vs what’s a change request)
   - Contact + legitimacy
     • Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3
     • Email: agent_bob_replit+clip-factory@agentmail.to

Publish it publicly
1) Click “Share” (top-right).
2) Toggle: “Publish” → ON.
3) Toggle: “Allow search engines” → OFF (recommended early-stage).
4) Copy link. This becomes:
   NOTION_ONBOARDING_URL = <paste the public Notion link>

QA check before sending
- Open the link in an incognito/private window.
- Confirm it loads with no login prompt.
- Confirm the Contact section includes the website URL + contact email.

============================
B) GOOGLE INTAKE FORM: CREATE + PUBLISH (FREE)
============================
Goal: Standardized intake so editors don’t miss requirements; reduces revisions/refunds.

Option 1: Use an existing Google account
- If the business already has a Google account, build the form there.

Option 2: Create a new free Google account
1) Go to https://accounts.google.com/signup
2) Create account using:
   - Name: Bob Smith
   - Email: agent_bob_replit@agentmail.to (if Gmail forces a gmail address, create a Gmail alias like bobsmith.clipfactory@gmail.com but keep the Clip Factory contact email for client comms)
3) No paid Google Workspace.

Create the form
1) Go to https://forms.google.com → Blank form
2) Form title: “Clip Factory — Client Intake (Short-Form Clips)”
3) Form description (paste):
   “Please complete this before we begin editing. This ensures captions, formatting, tone, and branding match your preferences. If you have questions email agent_bob_replit+clip-factory@agentmail.to. Our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3”

Required questions (build exactly; mark Required where indicated)
1) Your name (Short answer) — Required
2) Brand / channel name (Short answer) — Required
3) Email for delivery + review links (Short answer) — Required
4) Platforms you’re posting to (Checkboxes) — Required
   - TikTok
   - Instagram Reels
   - YouTube Shorts
   - LinkedIn
   - Other (short answer)
5) Target audience (Short answer) — Required
6) Clip tone (Multiple choice) — Required
   - Punchy / high-energy
   - Calm / authoritative
   - Educational / tutorial
   - Storytelling
   - Other
7) Your CTA preference (Multiple choice) — Required
   - Follow
   - Comment
   - DM
   - Link in bio
   - Subscribe
   - None
8) On-screen captions style (Multiple choice) — Required
   - Bold / high-contrast
   - Minimal
   - Karaoke highlight
   - Sentence case
9) Brand colors (Short answer) — Optional
10) Font preference (Short answer) — Optional
11) Handle(s) to include (Short answer) — Optional
12) Website / offer link (Short answer) — Optional
13) Words/topics to avoid (Paragraph) — Optional
14) Any required disclaimer text (Paragraph) — Optional
15) Examples you like (Links) (Paragraph) — Optional
16) Examples you dislike (Links) (Paragraph) — Optional
17) Upload/source link for the long video/podcast (Short answer) — Required
18) Anything else we should know? (Paragraph) — Optional

Form settings
- Collect email addresses: OFF (unless you want it on)
- Limit to 1 response: OFF
- Allow response editing: OFF

Publish + capture link
1) Click “Send” → Link icon.
2) Shorten URL → ON.
3) Copy link. This becomes:
   GOOGLE_INTAKE_FORM_URL = <paste the form link>

============================
C) LINK-WIRED CLIENT EMAIL TEMPLATES (PASTE-READY)
============================
Replace these placeholders before sending:
- {{NOTION_ONBOARDING_URL}}
- {{GOOGLE_INTAKE_FORM_URL}}
- {{REVIEW_LINK}}
- {{DELIVERY_FOLDER_LINK}}
- {{REVISION_DEADLINE_DATE_TIME}}
- {{CLIENT_NAME}}
- {{PROJECT_NAME}}

----------------------------
C1) INTAKE / KICKOFF EMAIL
----------------------------
Subject: Clip Factory — quick intake to start {{PROJECT_NAME}}

Hi {{CLIENT_NAME}},

Excited to get your first clips into production.

1) Please complete this intake form (required to begin):
{{GOOGLE_INTAKE_FORM_URL}}

2) Here’s our “What to expect” page (QA standards, review flow, delivery pack, revision policy):
{{NOTION_ONBOARDING_URL}}

If you have any questions, reply here or email us at agent_bob_replit+clip-factory@agentmail.to.

For reference, our site: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j.picard.replit.dev/sites/3

— Bob

----------------------------
C2) DELIVERY + REVIEW EMAIL
----------------------------
Subject: Your clips are ready — review link inside ({{PROJECT_NAME}})

Hi {{CLIENT_NAME}},

Your clip delivery pack is ready.

Review link (please leave timestamp comments):
{{REVIEW_LINK}}

Delivery folder (final exports + extras):
{{DELIVERY_FOLDER_LINK}}

What’s included in the folder:
- Final MP4s (vertical 9:16)
- Captions file(s) (.SRT)
- B-roll cue sheet
- Posting suggestions (first-line caption + hashtag starters)

Revision window:
Please send one consolidated revision request via timestamp comments by {{REVISION_DEADLINE_DATE_TIME}} (24 hours). After that, additional changes are treated as a new request.

Review expectations + revision policy (quick reference):
{{NOTION_ONBOARDING_URL}}

Questions? agent_bob_replit+clip-factory@agentmail.to

— Bob

----------------------------
C3) REVISION RECEIVED (ACK)
----------------------------
Subject: Revisions received — we’re on it ({{PROJECT_NAME}})

Hi {{CLIENT_NAME}},

Got your revision notes—thank you. We’ll apply the changes based on your timestamp comments and update the delivery pack.

If anything is unclear, we’ll reply with 1–2 questions so we don’t miss your intent.

Reference: {{NOTION_ONBOARDING_URL}}

— Bob

----------------------------
C4) REVISION COMPLETED (HANDOFF)
----------------------------
Subject: Revisions completed — updated clips attached ({{PROJECT_NAME}})

Hi {{CLIENT_NAME}},

Revisions are complete. You can review/download the updated files here:
{{DELIVERY_FOLDER_LINK}}

If you’d like additional versions (new hooks, different CTA, new aspect ratios, alternate pacing), send details and we’ll treat it as a new request per the policy here:
{{NOTION_ONBOARDING_URL}}

Thanks,
Bob
agent_bob_replit+clip-factory@agentmail.to

============================
D) QUICK TRIAGE REMINDER (FOR INTERNAL USE)
============================
Free revision (within 24h) examples:
- Caption typo/accuracy fixes
- Minor timing of captions
- Audio leveling tweaks
- Safe-zone repositioning / uncropped face fix
- Minor cut tightening without changing the message

Change request (new work) examples:
- New hook angle, new script, different key points
- Different format/style beyond intake specs
- New b-roll sourcing beyond cues
- New versions for different audiences/platforms beyond original scope

This go-live kit is designed so once the two links exist (Notion onboarding + Google intake), every client interaction is standardized, time-boxed, and auditable—reducing refunds and protecting reputation.