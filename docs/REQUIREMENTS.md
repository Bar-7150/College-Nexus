# System Requirements — College Nexus

**Project:** College Nexus  
**Tagline:** One Campus. One Network. Zero Fragmentation.  
**Program:** Journey to Mastery — Level 1: Ronin  
**Author:** Dev Community KGEC  

---

## 1. Functional Requirements

### Module 1: Authentication, Profiles & Identity
- **FR-01:** The system shall allow students to register using their full name, institutional email or standard email, student roll number, department, and graduation year.
- **FR-02:** The system shall validate student roll numbers against departmental format rules to automatically assign users to their official Department and Batch cohort.
- **FR-03:** The system shall support three distinct user roles: `STUDENT`, `CR` (Class Representative), and `ADMIN` (Faculty / System Administrator).
- **FR-04:** The system shall maintain public student profiles displaying name, branch, batch, and posted listings while strictly hiding personal mobile numbers and personal email addresses from public view.

### Module 2: Campus Vault (Academic Resource Repository)
- **FR-05:** The system shall organize all academic materials into a strict 4-level taxonomy: Department $\to$ Semester (1–8) $\to$ Subject Name & Code $\to$ Resource Type.
- **FR-06:** The system shall support four standardized resource types: `Notes`, `Previous Year Questions (PYQ)`, `Books/PDFs`, and `Exam Schedules`.
- **FR-07:** The system shall provide real-time search and multi-criteria filtering by subject code, document title, and year.
- **FR-08:** The system shall calculate the SHA-256 cryptographic hash of any uploaded document before storage and reject the upload if a duplicate file already exists in the repository.
- **FR-09:** The system shall allow authenticated students to upvote helpful documents and sort results by highest upvote count.
- **FR-10:** The system shall provide designated Class Representatives (`CR`) and Administrators with the ability to award a "CR-Verified" badge to trusted documents.

### Module 3: The Board (Official Notices & Lost & Found)
- **FR-11:** The system shall provide an official broadcast feed where only authorized `CR` and `ADMIN` users can publish notices.
- **FR-12:** The system shall allow notice creators to designate priority levels (`URGENT`, `ACADEMIC`, `PLACEMENT`, `GENERAL`) and pin urgent circulars with expiration dates.
- **FR-13:** The system shall allow any authenticated student to report a Lost or Found item with title, category, campus landmark location, photo, and public description.
- **FR-14:** The system shall allow finders of lost items to record a private distinguishing identifier (e.g., sticker mark, engraved initials) that is hidden from public view.
- **FR-15:** The system shall provide a private claim verification workflow where potential owners must submit a descriptive claim explaining unique item markings.
- **FR-16:** The system shall allow finders to review claims and, upon approval, automatically mark the item as `CLAIMED` and initialize an in-app direct communication thread.

### Module 4: Campus Marketplace
- **FR-17:** The system shall provide a peer-to-peer listing board for used textbooks, drawing instruments (mini-drafters), scientific calculators, lab aprons, and electronic kits.
- **FR-18:** The system shall display listing cards containing item title, condition badge (`Like New`, `Good`, `Fair`), price in INR (₹), preferred campus handover spot, and seller avatar.
- **FR-19:** The system shall prohibit in-app monetary transactions and function strictly as a discovery and meeting coordination board.
- **FR-20:** The system shall allow sellers to mark listings as `RESERVED` or `SOLD` to remove completed items from active search results.

### Module 5: Communities & In-App Communication
- **FR-21:** The system shall automatically enroll students into their mandatory Department and Batch community rooms based on their verified roll number.
- **FR-22:** The system shall provide an organized campus clubs directory displaying club descriptions, lead contacts, and links to upcoming events.
- **FR-23:** The system shall route peer communication through an in-app direct messaging system featuring incoming message requests that recipients can accept or decline.
- **FR-24:** The system shall enforce rate limits (maximum 10 new message requests per hour) and provide block/report functionality to prevent harassment.

---

## 2. Non-Functional Requirements

### Performance & Latency
- **NFR-P1 (First Contentful Paint):** The web application shall achieve a First Contentful Paint (FCP) of $< 1.5\text{ seconds}$ on standard 4G mobile connections.
- **NFR-P2 (API Response Time):** Read requests for cached academic resources and notices shall return responses within $\le 150\text{ ms}$ at 95th percentile (P95).
- **NFR-P3 (Lighthouse Score):** The application shall maintain a Google Lighthouse performance audit score of $\ge 90$ on mobile emulation.
- **NFR-P4 (Bundle Size):** The initial JavaScript bundle delivered to mobile browsers shall not exceed $200\text{ KB}$ gzipped.

### Security & Privacy
- **NFR-S1 (Phone Number Concealment):** Under no circumstance shall a student's mobile telephone number be transmitted in public API responses or exposed in the client DOM.
- **NFR-S2 (Row-Level Security):** All database tables storing user data, documents, and messages shall enforce PostgreSQL Row Level Security (RLS) policies at the database layer.
- **NFR-S3 (Encrypted Transit & Storage):** All network communication shall occur over TLS 1.3 (HTTPS and WSS). Cloudinary asset delivery shall enforce authenticated upload and access controls.
- **NFR-S4 (Input Sanitization):** All user-supplied text (markdown notices, item descriptions, chat messages) shall be sanitized against Cross-Site Scripting (XSS) and injection attacks.

### Accessibility & Usability
- **NFR-A1 (Contrast Compliance):** All UI components in both light and dark modes shall meet WCAG 2.1 Level AA color contrast requirements (minimum 4.5:1 ratio for standard text).
- **NFR-A2 (Keyboard & Screen Reader Navigability):** All interactive dialogs, modals, and dropdown menus shall be fully operable via keyboard navigation and include ARIA labels for screen readers.
- **NFR-A3 (Touch Targets):** All interactive elements on mobile viewports shall feature minimum touch target dimensions of $44 \times 44\text{ pixels}$.

### Reliability & Offline Capability
- **NFR-R1 (PWA Offline Access):** The Progressive Web App service worker shall cache previously downloaded syllabus PDFs and basic application shells for offline viewing.
- **NFR-R2 (Service Availability):** The application infrastructure hosted on Vercel and Supabase shall target $\ge 99.9\%$ uptime during the active academic semester.

---

## 3. Assumptions and Constraints

### Time Budget & Program Scope
- The development sprint is strictly bound to a **4-week timeline (28 calendar days)** divided into the four levels: Ronin (Days 1–7), Kenshi (Days 8–14), Samurai (Days 15–21), and Shogun (Days 22–28).
- Scope creep is controlled by strictly excluding payment gateways, native app store deployments, and video chat infrastructure.

### Technical Proficiencies & Learning Curve
- **Proficient Tools (Immediate Velocity):** Next.js 14, React, JavaScript / TypeScript, Tailwind CSS, REST APIs, Git/GitHub.
- **Tools to Learn / Deepen:** Advanced PostgreSQL Row-Level Security (RLS) policies, Service Worker Web Push Notification protocols, and WebRTC/WebSocket realtime messaging.

### Target Environment & Constraints
- **Mobile Predominance:** Over $90\%$ of student interactions on the KGEC campus occur via mobile smartphones (Android and iOS). The user interface must be architected mobile-first with desktop responsiveness as a secondary tier.
- **Campus Connectivity:** Campus Wi-Fi and hostel mobile data fluctuate during peak hours; the application must employ aggressive client-side caching and small asset payloads to maintain usability during bandwidth drops.
- **Free-Tier Infrastructure Limits:** The production system must operate within the free tiers of Vercel (Hobby plan), Supabase (database and auth), and Cloudinary (asset storage and delivery).
