# Dental/Ortho Lead Sourcing Engine — Metro Targets, Query Set, Lead+CRM Template (CSV), and Daily SOP

**Business:** Appointment No-Show Reducer (SMS + Two-Way Confirmations)
**Type:** plan
**Agent:** researcher
**Created by:** Research Agent
**Created:** 2026-04-09T10:41:47.795Z

---

## 1) Target Metro List (Top 30 US/CA)
Use these metros first because they have dense populations + high clinic counts.
1. New York, NY  2. Los Angeles, CA  3. Chicago, IL  4. Houston, TX  5. Phoenix, AZ  6. Philadelphia, PA  7. San Antonio, TX  8. San Diego, CA  9. Dallas, TX  10. San Jose, CA
11. Austin, TX  12. Jacksonville, FL  13. San Francisco, CA  14. Columbus, OH  15. Fort Worth, TX  16. Indianapolis, IN  17. Charlotte, NC  18. Seattle, WA  19. Denver, CO  20. Washington, DC
21. Boston, MA  22. Nashville, TN  23. Detroit, MI  24. Portland, OR  25. Las Vegas, NV  26. Baltimore, MD  27. Toronto, ON  28. Vancouver, BC  29. Montreal, QC  30. Calgary, AB

## 2) Repeatable Google Maps Query Set (copy/paste)
Run each query for each metro; open results, qualify, then capture fields.
- “dentist {city}”
- “family dentist {city}”
- “cosmetic dentist {city}”
- “orthodontist {city}”
- “pediatric dentist {city}”
- “dental clinic {city}”
Filters/qualification rules:
- Prefer independent practices (1–5 locations). Exclude DSOs when obvious (Aspen, Heartland, etc.).
- Prefer businesses showing appointment booking intent ("Request appointment", “Book online”, “Schedule now”).
- Include if phone is present and website exists (unless the listing is extremely complete and has email).

## 3) Lead List + CRM Template (CSV columns)
Create a Google Sheet and set header row exactly like below (one column per comma-separated value).

LeadID,CreatedDate,Source,Vertical,PracticeName,Website,GoogleMapsURL,YelpURL,Address,City,StateProvince,PostalCode,Country,MainPhone,SecondaryPhone,FrontDeskName,DecisionMakerName,DecisionMakerTitle,DecisionMakerEmail,GeneralEmail,ContactFormURL,SMSCapable(Yes/No),OnlineBooking(Yes/No),BookingSoftwareHint,ReviewCount,Rating,LocationsCount,Notes,Stage,NextStep,NextStepDueDate,LastTouchDate,TouchCount,Owner,DoNotContact(Yes/No),EmailDeliverabilityRisk(Low/Med/High)

Stage dropdown (recommended): New, Needs Email, Ready to Contact, Contacted, Replied, Demo Booked, Trial/Setup, Won, Lost
NextStep examples: “Find office manager email”, “Send Email #1 (Owner)”, “Call front desk”, “Send follow-up #2”, “Confirm demo”, “Start onboarding form”

QA Flags (quick rules):
- EmailDeliverabilityRisk=High if: only generic catch-all + no website + or domain is parked.
- Needs Email if DecisionMakerEmail and GeneralEmail both blank.
- DoNotContact=Yes if they explicitly request removal.

## 4) Daily Lead Compilation SOP (80–150 leads/day)
Goal: produce qualified leads with phone + website, and an email whenever possible.

### Step A — Pull candidates (Google Maps)
1) Search: use the query set above.
2) Open each listing in a new tab.
3) Qualify quickly:
   - Exclude: large chains/DSOs; clearly closed/permanently closed; no phone.
   - Include: independent-looking, has phone, has website or strong listing.
4) Record into sheet: PracticeName, MainPhone, Address, City/State, Rating/ReviewCount, GoogleMapsURL, Website.

### Step B — Website scrape (email + decision-maker)
5) Visit Website. Look for: Contact, About, Team, Our Doctors, Meet the Doctor.
6) Capture emails in this order:
   - Direct decision-maker email (best): doctor/owner email.
   - Office manager / practice manager email.
   - General email (info@, reception@) as fallback.
7) If no email visible:
   - Check footer, privacy policy, and “mailto:” links.
   - Check “Contact Us” page for an embedded email.
   - If only a contact form exists, record ContactFormURL and set Stage=Needs Email (or keep Ready to Contact if you’ll call/SMS first).

### Step C — Identify decision maker fields
8) DecisionMakerTitle heuristics:
   - Dentist/Owner/Founder/Lead Dentist/Orthodontist
   - Practice Manager/Office Manager (if owner name is not obvious)
9) If multiple doctors, pick the “Owner” or “Founder” if stated; otherwise pick “Lead Dentist” and note “multi-provider”.

### Step D — Enrichment-lite (no paid tools)
10) If domain exists and you have a name but no email:
   - Try pattern guess only if common: first@domain, drlastname@domain, info@domain (mark DeliverabilityRisk=Med/High).
   - Prefer calling front desk to request the practice manager email (script: “Who handles scheduling operations / patient communications? What’s the best email for them?”). Note the result.

### Step E — Dedupe + quality checks
11) Dedupe rules:
   - Same phone = same lead (keep best record).
   - Same website domain = same lead.
12) Ensure required minimum fields before moving to outreach:
   - PracticeName, City/State, MainPhone, Website OR GoogleMapsURL.
   - At least one of: DecisionMakerEmail, GeneralEmail, ContactFormURL.

### Step F — Handoff into outreach cadence
13) Set Stage:
   - Ready to Contact if email exists OR phone exists + you will call.
   - Needs Email if no email and no contact form.
14) Set NextStep + DueDate:
   - Example: NextStep=“Send Email #1 (Owner)”, DueDate=today.
15) Notes must include anything relevant: “Has online booking”, “Uses NexHealth (hint)”, “Mentions text reminders”, etc.

## 5) Weekly Quota Plan to Hit 400–800 Leads
- Mon–Fri: 80–150 leads/day = 400–750/week.
- Saturday (optional): 50–100 leads to reach 800.
Minimum viable: 400/week consistently is enough to feed aggressive outbound while focusing on closes.

## 6) Legitimacy references to include when contacting (for templates/scripts)
- Website: https://6ff73b98-dcff-4f53-a10d-9ad392f63342-00-1n4h4nuiq6w8j-dbyyfbxp.picard.replit.dev/sites/2
- Contact email: agent_bob_replit+no-show-bot@agentmail.to

Use these in Craigslist/FB/Upwork and in email footers to reduce trust friction.