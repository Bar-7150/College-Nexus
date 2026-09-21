# Product Requirements Document (PRD) — College Nexus

**Project:** College Nexus  
**Tagline:** One Campus. One Network. Zero Fragmentation.  
**Program:** Journey to Mastery — Level 1: Ronin  
**Author:** Dev Community KGEC  

---

## 1. Problem Statement

### Who Has This Problem?
Undergraduate and postgraduate engineering students at residential and semi-residential collegiate campuses (specifically modeled on Kalyani Government Engineering College — KGEC, encompassing over 2,000 students across 5 engineering departments: Computer Science & Engineering, Information Technology, Electronics & Communication Engineering, Electrical Engineering, and Mechanical Engineering, plus MCA and M.Tech cohorts).

### How Do We Know It Is Real?
This problem is not an artificial construct for an academic assignment; it is the daily operational friction experienced by every student and faculty representative on campus:

1. **Academic Resource Black Hole:** 48 hours before MAKAUT semester exams, class WhatsApp groups are inundated with panicked queries for previous year question papers (PYQs), lecture slides, and handwritten notes. Because WhatsApp and Telegram store files in unindexed, ephemeral media streams, students spend upwards of 45 minutes digging through gigabytes of chat backups, broken Google Drive links, and expired WeTransfer URLs.
2. **Missing High-Value Laboratory Instruments:** In core engineering branches (EE, ECE, ME), students carry expensive specialized tools every week — Casio fx-991EX scientific calculators (costing ₹1,500+), mini-drafters (₹600+), multimeter kits, and engineering graphics sheet holders. Every semester, dozens of these instruments are forgotten in drawing halls and labs. Without a centralized lost-and-found system, finders have no safe way to return items, and instruments simply disappear.
3. **Official Notices Drowning in Noise:** The Training and Placement Cell (T&P), department heads, and club leads post critical circulars (e.g., internship drive deadlines closing in 4 hours, exam form submission dates) into informal student WhatsApp groups. These life-altering notices routinely get buried under 300+ incoming memes, festival forwards, and casual chatter.
4. **Economic Waste in Academic Equipment:** At the conclusion of every semester, graduating seniors discard or abandon physical textbooks, engineering graphics drafters, lab coats, and breadboards. Meanwhile, incoming juniors purchase identical equipment at full retail price from local vendors. No private, student-exclusive marketplace exists to facilitate hand-to-hand reuse.

---

## 2. Target User Personas

### Primary Persona: The Stressed Exam & Placement Prep Student
- **Identity:** Rohan Mukherjee, 3rd-Year B.Tech Computer Science & Engineering student at KGEC.
- **Context:** Juggling 6 theory courses, 4 weekly lab submissions, coding practice, and upcoming campus placement drive eligibility criteria.
- **Pain Point:** Needs verified 2022 and 2023 Computer Networks PYQ solutions the night before exams; cannot find them because the CR's Drive link from 4 months ago is permission-locked, and the WhatsApp group search yields 80 irrelevant messages. Also missed a registration deadline for an off-campus hackathon because the notice got pushed out of view.
- **Goal:** Open an app, select "CSE $\to$ Semester 5 $\to$ Computer Networks $\to$ PYQ", download the verified PDF in 10 seconds, and see all active placement deadlines sorted by urgency.

### Secondary Persona: The Overburdened Class Representative (CR)
- **Identity:** Ananya Roy, 2nd-Year B.Tech Electronics & Communication Engineering CR.
- **Context:** Liaison between department faculty, college administration, and 65 batchmates.
- **Pain Point:** Has to forward the same timetable updates, lab batch divisions, and syllabus circulars into 4 separate WhatsApp sub-groups. Fields 20+ repetitive direct messages every week asking "Where is the lab syllabus PDF?"
- **Goal:** Upload the syllabus once to the verified departmental vault with an official badge, publish an announcement to "ECE 2026 Batch" that sends an instant push notification, and never answer a repetitive DM again.

### Tertiary Persona: The Lab Student / Campus Buyer & Seller
- **Identity:** Sourav Das, 1st-Year Mechanical Engineering student residing in Hall-1 Hostel.
- **Context:** Limited monthly student budget; needs an engineering drawing drafter, compass set, and workshop apron for the semester.
- **Pain Point:** Unwilling to post his personal mobile number on public college bulletin boards or open social media groups due to privacy and spam concerns.
- **Goal:** Search a campus-only listings board, find a 4th-year senior selling a drafter for ₹250, send an in-app message request without revealing his phone number, and meet outside the college canteen for an in-person handoff.

---

## 3. Core Features for MVP (The Kenshi Feature List)

The MVP represents the smallest complete, functional, and visually coherent surface that delivers immediate utility to a student on day one without requiring complex third-party payment gateways or algorithmic recommendation engines.

### 1. Campus Vault (Hierarchical Academic Archive)
- **Strict Taxonomy Browsing:** Department (CSE, IT, ECE, EE, ME) $\to$ Semester (1 to 8) $\to$ Subject Name & Code $\to$ Resource Type (`Notes`, `PYQ`, `Book/PDF`, `Exam Schedule`).
- **Instant Search & Multi-Tag Filtering:** Client-side real-time filtering by subject code (e.g., `CS501`), resource type, and examination year.
- **Document Preview Cards:** Display title, contributor name, CR-verified badge, page count, upload date, and download button.
- **Upload Modal (UI Flow):** Drag-and-drop file uploader with taxonomy dropdowns and SHA-256 duplicate warning indicator.

### 2. The Board (Dual-Stream Official & Recovery Feed)
- **Official Notices Tab:** Verified broadcast feed filtered by priority (`Urgent`, `Academic`, `Placement`, `Event`). Pinned critical announcements with expiry indicators.
- **Lost & Found Tab:** Community recovery wall displaying item photo cards, location found (e.g., "Library 2nd Floor"), timestamp, and category (`Electronics`, `Instruments`, `Documents`, `Keys`).
- **Private Claim Workflow Modal:** Finder posts an item without exposing private unique identifiers (e.g., sticker pattern on calculator, student ID name); claimant submits a detailed verification description before the finder approves contact.

### 3. Campus Marketplace (Peer-to-Peer Academic Exchange)
- **Listings Feed:** Filtered by category (`Old Textbooks`, `Lab Instruments`, `Engineering Drafters`, `Electronics Kits`) and price range.
- **Item Detail Card:** High-resolution item photos, condition badge (`Like New`, `Good`, `Fair`), price (₹), pickup landmark (e.g., "Main Canteen", "Hostel 2 Gate").
- **Zero-Payment Model:** Strict listings-only design. No payment gateway; transactions happen in-person via cash/UPI.
- **"Chat with Seller" Drawer:** Initiates an in-app message request directly linked to the listing item.

### 4. Department & Batch Communities
- **Cohort Walls:** Dedicated spaces for Department (e.g., "Department of CSE") and Batch (e.g., "Batch of 2026").
- **Campus Clubs Directory:** Overview cards for college clubs (Robotics, Coding Club, Sports, Music) with registration links and upcoming activities.

### 5. Privacy-Preserving Student Profile & Shell
- **Mobile-First Responsive PWA Shell:** Sticky header with search, responsive bottom tab navigation (`Vault`, `The Board`, `Marketplace`, `Communities`, `Profile`).
- **Public Profile View:** Displays student name, branch, graduation year, verified roll number badge, and listed items. Personal phone numbers and personal emails remain completely masked.
- **In-App Message Request Drawer:** Incoming connection requests with "Accept" and "Decline" controls to protect student privacy.

### 6. Campus Planning and Opportunities
- **Jobs & Internships:** Show verified opportunities with eligibility details and the nearest application deadline first.
- **Events Calendar:** Display campus events with organizer, venue, registration link, and RSVP state.
- **Schedule Planner:** Combine the college routine, Google Classroom updates, and MAR history into a student planning view.

### 7. AI Study Assistance Preview
- **Approved-Source Assistance:** Answer study questions from approved Campus Vault material and identify the source used.
- **Content Checks:** Flag questionable or misleading uploaded content for review before it is treated as a verified source.

---

## 4. Out of Scope

To ensure delivery within the Journey to Mastery timeframe and avoid operational or legal failure modes, the following features are explicitly excluded:

| Excluded Feature | Justification & Architectural Rationale |
|---|---|
| **In-App Payment Processing / Escrow (Razorpay / Stripe)** | Introducing financial transactions requires business registration, payment gateway merchant verification, transaction fees (2%), and escrow dispute management. Since all users are physically co-located on the same college campus, cash or direct peer-to-peer UPI upon physical inspection is faster, safer, and legally frictionless. |
| **Native iOS & Android App Store Distribution** | Building native Swift/Kotlin codebases and managing Apple App Store ($99/year fee, strict 2-week review cycles) and Google Play Store policies is unnecessary overhead. A responsive Progressive Web App (PWA) delivers 95% of native benefits (Add to Home Screen, service worker offline caching, push notifications) with immediate edge deployment. |
| **Custom Video Calling & Voice Rooms** | Integrating WebRTC TURN/STUN servers creates heavy server bandwidth costs and complex state synchronization. Students and faculty already utilize enterprise Google Meet and Zoom links; College Nexus will support linking out to meeting URLs rather than hosting native video. |
| **Public Web Search Indexing & Guest Accounts** | Allowing anonymous public access invites spam, unauthorized copyright scraping, and privacy violations. College Nexus is an authenticated intranet platform restricted to students with institutional roll-number or verified email credentials. |
| **Algorithmic Engagement / Viral Social Feed** | Features like algorithmic infinite scrolling, likes leaderboards, and video reels encourage addictive social media behavior and distract from academic focus. The platform is designed purely as an organized utility for finding resources, tracking notices, and recovering items. |
| **Automated Attendance Tracking / Biometric Integration** | Integrating with legacy government college server infrastructure or hardware attendance machines requires institutional bureaucratic approvals and introduces compliance liabilities. |

---

## 5. Success Metrics (Connecting to Shogun 25-User Milestone)

The success of College Nexus is evaluated not by vanity clicks, but by tangible academic and community utility. These metrics directly establish the evidentiary threshold required for the **Shogun** milestone (25+ active users getting verified value):

1. **User Onboarding & Department Diversity:**
   - Onboard **$\ge$ 25 verified active student accounts** across at least **two distinct engineering departments** (e.g., Computer Science & Engineering and Electronics & Communication Engineering) within 14 days of campus pilot release.
2. **Academic Vault Utility:**
   - Achieve **$\ge$ 50 unique downloads/views** of verified semester PYQs and notes across 3 or more subjects during the pre-examination cycle.
   - Achieve **0 duplicate document uploads**, verified by client-side and server-side SHA-256 hash deduplication.
3. **Campus Interaction & Problem Resolution:**
   - Facilitate **$\ge$ 10 active student-to-student transactions or resolutions**, consisting of:
     - At least 5 active items posted in Campus Marketplace or Lost & Found.
     - At least 5 verified in-app message threads or item claim handoffs completed.
4. **Information Retrieval Speed:**
   - Achieve an average time-to-resource of **$<$ 30 seconds** for a student landing on the app to locating and opening a specific subject's PYQ (compared to the baseline 45+ minutes on WhatsApp groups).
5. **User Retention & Satisfaction:**
   - Qualitative satisfaction score of **$\ge$ 80%** on post-use surveys regarding notice clarity and search reliability among the initial cohort of 25 students and 3 Class Representatives.
