# Lead Sourcing Execution Pack (Dental/Ortho) — Metro List + Search Queries + Lead Sheet Template + Seed SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T11:04:33.426Z

---

## 1) Prioritized Metro List (Top 30 US/CA)
Use these metros first to maximize practice density (more leads/hour) and higher appointment volume.

**USA (24):**
1. New York, NY
2. Los Angeles, CA
3. Chicago, IL
4. Houston, TX
5. Phoenix, AZ
6. Philadelphia, PA
7. San Antonio, TX
8. San Diego, CA
9. Dallas, TX
10. San Jose, CA
11. Austin, TX
12. Jacksonville, FL
13. San Francisco, CA
14. Columbus, OH
15. Charlotte, NC
16. Indianapolis, IN
17. Seattle, WA
18. Denver, CO
19. Washington, DC
20. Boston, MA
21. Nashville, TN
22. Las Vegas, NV
23. Detroit, MI
24. Miami, FL

**Canada (6):**
25. Toronto, ON
26. Montreal, QC
27. Vancouver, BC
28. Calgary, AB
29. Ottawa, ON
30. Edmonton, AB

---

## 2) Repeatable Search Query Set (Google Maps + Yelp)
Goal: quickly pull a list of practices, then open each website to find contact info.

### Google Maps queries (copy/paste)
Run each query for each metro above:
- `dentist in {CITY, STATE}`
- `cosmetic dentist in {CITY, STATE}`
- `pediatric dentist in {CITY, STATE}`
- `orthodontist in {CITY, STATE}`
- `family dentistry in {CITY, STATE}`
- `dental clinic in {CITY, STATE}`

**Optional add-ons to find higher volume practices:**
- `invisalign provider in {CITY, STATE}`
- `emergency dentist in {CITY, STATE}`

### Yelp queries
On Yelp, search the same terms:
- Category: Dentists / Orthodontists
- Sort by: Recommended (then also try Highest Rated)
- Filter: “Open Now” is optional (not required)

---

## 3) Lead List Template (CSV/Google Sheets Columns)
Create a Google Sheet with these exact columns. Anything marked **Required** must be filled before importing to CRM.

### A) Business identity
1. **Lead ID** (Required) — format: `CITY-ST-###`
2. **Business Name** (Required)
3. **Category** (Required) — Dentist | Orthodontist | Pediatric Dentist | Multi-specialty
4. Locations Count — 1 | 2–5 | 6+
5. Street Address
6. City (Required)
7. State/Prov (Required)
8. ZIP/Postal

### B) Contact & decision-maker
9. **Main Phone** (Required)
10. Secondary Phone
11. Website URL (Required)
12. Contact Page URL
13. **Best Email Found** (Required if available) — prioritize role-based/manager
14. Email Type — Owner | Office Manager | Front Desk | General | Unknown
15. Decision Maker Name (if listed)
16. Title/Role (if listed)

### C) Qualification signals
17. Online Booking? — Yes | No | Unknown
18. Software Mentioned — Dentrix | OpenDental | NexHealth | Doctible | Solutionreach | Weave | Unknown
19. Appointment Volume Proxy — High | Med | Low (use reviews count / multi-provider site cues)
20. Reviews Count (Google)

### D) Outreach ops
21. Source — Google Maps | Yelp | Directory | Referral
22. Source Link (GMaps/Yelp listing URL)
23. Outreach Status — Not Contacted | Attempted | Replied | Booked | Closed Won | Closed Lost
24. Next Step Date
25. Notes (gatekeeper notes, best call times, etc.)

---

## 4) QA Rules (to keep list usable for outbound)
Use these quick checks before marking a row “Ready”:
1. **Phone present** and matches website footer/contact page.
2. **Website loads** (not parked) and appears to be the same practice.
3. **Email rule:**
   - Prefer: office manager/front desk emails (e.g., `office@`, `admin@`, `appointments@`, `manager@`).
   - If only a form exists, put `FORM_ONLY` in Best Email Found and paste the contact page URL.
4. Exclude: corporate DSOs with 20+ locations unless clearly locally managed.
5. Capture **Online Booking** if a “Book Now / Request Appointment” button exists.

---

## 5) Seed Batch SOP (150–200 leads in 1–2 days)
This is the fastest path to start outbound while the list scales to 400–800.

### Step-by-step
1. Pick **3 metros** from the list (start with high density: Los Angeles, Chicago, Houston).
2. On **Google Maps**, run: `dentist in {metro}`.
3. Open listings in new tabs and collect for each:
   - Business Name, Phone, Website, Address, Reviews Count, Listing URL.
4. Click Website → find one of:
   - Header/footer email
   - Contact page email
   - “Team” page (office manager name)
   - If none, mark `FORM_ONLY` and capture contact page URL.
5. Repeat for `orthodontist in {metro}` to mix in ortho.
6. Stop after **50–70 leads per metro** (3 metros = 150–200).
7. Import to CRM and start outreach immediately (don’t wait for 800).

### Timebox targets
- 1 lead fully captured with website + phone + contact page: ~2–4 minutes.
- Expected throughput: **20–30 leads/hour** once in rhythm.

---

## 6) Booking Link Standard (to insert everywhere)
**Preferred (best for closing):** Calendly (paid may be needed later for routing/round-robin).
**Free alternatives:** Google Calendar appointment schedule, TidyCal lifetime deal (paid), Zoho Bookings free tier.

**Where to insert the booking link:**
- Cold email sequences: every email ends with a single CTA line: “Book a 12-min walkthrough: {BOOKING_LINK}”
- Craigslist/FB posts: one CTA line + business email: agent_bob_replit+no-show-bot@agentmail.to
- Upwork proposals: include legitimacy URL + booking link for a quick call.

**Legitimacy references (include in templates when posting):**
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact: agent_bob_replit+no-show-bot@agentmail.to
