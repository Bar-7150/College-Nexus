# System Architecture — College Nexus

**Project:** College Nexus  
**Tagline:** One Campus. One Network. Zero Fragmentation.  
**Program:** Journey to Mastery — Level 1: Ronin  
**Author:** Dev Community KGEC  

---

## 1. System Diagram

The system diagram is maintained in the supplied Excalidraw sketch:
[View the live architecture sketch](https://excalidraw.com/#json=ZdbV_98_QA8lBqWh4aku1,nrO2Iy2e8zKlIU-QbdszBA)

Static backup: [sketch.png](./sketch.png)

```
+--------------------------------------------------------------------------------+
|                         COLLEGE NEXUS ARCHITECTURE                             |
+--------------------------------------------------------------------------------+
| DATA SOURCES & VALIDATION                                                      |
| Students / college onboarding | Inbuilt messaging | Student contributions      |
| AI checks: fake-news detection, uploaded-content checks, and source approval   |
+-----------------------------------------+--------------------------------------+
                                          |
                                          v
+------------------+       +-------------+-------------------+       +-----------+
| Next.js Client   | <---> | Next.js Gateway / Backend       | <---> | Supabase  |
| Student dashboard|       | /api/upload       /api/auth    |       | Database  |
| PWA experience   |       | /api/marketplace  /api/profile |       | Auth/RLS  |
+------------------+       +-------------+-------------------+       +-----------+
                                          |
                         +----------------+----------------+
                         v                                 v
                +------------------+              +------------------+
                | Cloudinary       |              | AI / ML Model    |
                | PDFs and other   |              | Content checks,  |
                | uploaded assets  |              | study assistance |
                +------------------+              +------------------+
                                          |
                                          v
                +------------------+     +------------------+
                | Schedule planner |     | Realtime layer   |
                | College routine, |     | WebRTC/WebSocket |
                | Google Classroom,|     | live messaging   |
                | MAR history      |     +------------------+
                +--------+---------+
                         |
                         v
+--------------------------------------------------------------------------------+
| OUTPUTS: dashboard, study assistance, MAR point tracker, Campus Vault, events |
| calendar, notices, Lost & Found, Marketplace messaging, jobs/internships,      |
| community spaces, push notifications, and verified-source answers              |
+--------------------------------------------------------------------------------+
```

---

## 2. Planned Tech Stack

Each technology is selected to maximize reliability, developer velocity, zero-cost development tier limits, and low-latency access on campus Wi-Fi networks:

| Layer | Selected Technology | Why (Architectural Rationale) |
|---|---|---|
| **Framework** | **Next.js 14 App Router (React + TypeScript)** | Delivers server-side rendering for instant First Contentful Paint, modular API routes without separate server maintenance, and seamless PWA manifest integration for mobile installability. |
| **Database** | **PostgreSQL (hosted on Supabase)** | Enforces strict relational foreign keys across departmental hierarchies and natively supports Row Level Security (RLS) for privacy. |
| **Authentication** | **Supabase Auth** | Provides turnkey JWT session handling, secure HTTP-only cookies, and customizable metadata claims for institutional roll numbers and role-based permissions (Student, CR, Admin) without rolling custom crypto code. |
| **Hosting** | **Vercel (Edge CDN + Serverless)** | Guarantees zero-config CI/CD deployments directly from GitHub, automatic SSL certificate provisioning, and globally distributed edge caching to minimize latency on local Indian ISPs. |
| **Object Storage** | **Cloudinary** | Stores PDFs and other uploaded assets while keeping media delivery separate from application and relational data. |
| **Realtime Engine** | **WebRTC / WebSockets** | Supports live messaging and real-time updates for campus communication workflows. |
| **AI / ML** | **Content validation and study assistance model** | Checks uploaded content and approved sources, then powers study assistance and verified-source answers. |

---

## 3. Data Flow

### Flow A: Onboarding and contributing campus content
1. **Student onboarding:** A student creates an account and supplies identity and college information.
2. **College routing:** The system joins an existing college server when one exists; otherwise it opens a new college space for review.
3. **Gateway request:** Uploads, notices, notes, lost items, profiles, and marketplace actions pass through the Next.js gateway and API routes.
4. **Validation:** Authentication, source checks, content approval, and AI/ML checks run before content becomes visible.
5. **Persistence:** Supabase stores users, permissions, metadata, messages, and activity while Cloudinary stores PDFs and other uploaded assets.
6. **Presentation:** The approved content appears in the dashboard, Campus Vault, notices, Lost & Found, Marketplace, or community spaces.
7. **Response:** The API returns the authorized result to the Next.js client, which renders the updated dashboard, card, message, or notification state.

### Flow B: Study assistance and schedule planning
1. The student selects an approved document, note, or question from Campus Vault.
2. The AI/ML layer checks the approved source and returns study assistance with a source reference.
3. The schedule planner combines college routine, Google Classroom information, and MAR history to produce planning updates.
4. Push notifications and realtime messaging deliver urgent updates and live collaboration to the relevant students.

### Flow C: Claiming a Lost Item on The Board
1. **Finder Posting:** Finder uploads an item photo ("Casio Scientific Calculator found in Lab 3"), chooses category `Instruments`, and inputs a public description ("Black calculator found on bench 4"). In a private field, the finder notes the secret identifier ("Has an anime sticker and scratched initials 'SM' on the back slider").
2. **Data Storage:** The record is saved to `lost_found_items` table with `status = 'OPEN'`. The secret identifier is stored with an RLS policy that only allows the creator (`finder_id`) to read it.
3. **Claim Submission:** A claimant sees the public card, clicks "Claim Item", and submits their private description ("Has an Eren Yeager sticker on the back cover and initials SM").
4. **Notification & Verification:** A new row is inserted into `claim_requests`. The realtime WebRTC/WebSocket layer notifies the finder's client.
5. **Approval & Resolution:** The finder reviews the claimant's description in their dashboard, verifies the match, and clicks "Approve Claim". The item status updates to `CLAIMED`, and an in-app message channel opens between the finder and claimant to coordinate safe campus handover.

---

## 4. Key Entities & Data Model

The application revolves around 10 core domain entities:

```
  +------------------+         1:N         +-------------------+
  |    Department    |-------------------->|      Subject      |
  +------------------+                     +-------------------+
           |                                         |
           | 1:N                                     | 1:N
           v                                         v
  +------------------+         1:N         +-------------------+
  |     Profile      |-------------------->|   VaultDocument   |
  | (Student/CR/Adm) |                     +-------------------+
  +------------------+                               |
      |          |                                   | 1:N
      | 1:N      | 1:N                               v
      |          |                         +-------------------+
      |          |                         |   DocumentUpvote  |
      |          |                         +-------------------+
      |          v
      |    +-------------------+         1:N         +-------------------+
      |    |   LostFoundItem   |-------------------->|   ClaimRequest    |
      |    +-------------------+                     +-------------------+
      |
      | 1:N
      +---------> +---------------------+
      |           | MarketplaceListing  |
      |           +---------------------+
      |
      | 1:N
      +---------> +---------------------+
      |           |    NoticeBroadcast  |
      |           +---------------------+
      |
      | 1:N
      +---------> +---------------------+         1:N         +-------------------+
                  |    MessageThread    |-------------------->|      Message      |
                  +---------------------+                     +-------------------+
```

### Entity Definitions

#### 1. `Profile`
- Represents a verified campus member.
- **Attributes:** `id` (UUID, PK referencing `auth.users`), `roll_number` (Unique institutional roll number), `full_name`, `avatar_url`, `department_id` (FK), `batch_year` (e.g., 2026), `role` (`STUDENT`, `CR`, `ADMIN`), `bio`, `phone_number` (Private, never exposed in public queries), `created_at`.

#### 2. `Department` & `Subject`
- Hierarchical academic taxonomy.
- **Department:** `id` (PK, e.g. `CSE`), `full_name` ("Computer Science & Engineering").
- **Subject:** `id` (PK), `code` (e.g. `CS501`), `name` ("Operating Systems"), `semester` (1–8), `department_id` (FK).

#### 3. `VaultDocument`
- Academic resource stored in the repository.
- **Attributes:** `id` (UUID, PK), `title`, `subject_id` (FK), `contributor_id` (FK $\to$ `Profile`), `resource_type` (`NOTES`, `PYQ`, `BOOK_PDF`, `EXAM_SCHEDULE`), `file_url`, `file_hash` (SHA-256 hash for deduplication), `file_size_bytes`, `page_count`, `is_cr_verified` (Boolean), `upvote_count` (Integer), `created_at`.

#### 4. `NoticeBroadcast`
- Official circular or broadcast.
- **Attributes:** `id` (UUID, PK), `author_id` (FK $\to$ `Profile`, must have `CR` or `ADMIN` role), `title`, `body_markdown`, `priority` (`URGENT`, `ACADEMIC`, `PLACEMENT`, `GENERAL`), `target_department_id` (FK, Nullable for all-campus), `target_batch_year` (Nullable), `expiry_date`, `created_at`.

#### 5. `LostFoundItem` & `ClaimRequest`
- Recovery tracking on campus.
- **LostFoundItem:** `id` (UUID, PK), `reporter_id` (FK $\to$ `Profile`), `type` (`LOST`, `FOUND`), `title`, `description_public`, `description_private_identifier`, `category` (`INSTRUMENTS`, `ELECTRONICS`, `DOCUMENTS`, `KEYS`, `OTHER`), `location_landmark`, `image_url`, `status` (`OPEN`, `CLAIM_PENDING`, `RESOLVED`), `created_at`.
- **ClaimRequest:** `id` (UUID, PK), `item_id` (FK $\to$ `LostFoundItem`), `claimant_id` (FK $\to$ `Profile`), `claim_description`, `status` (`PENDING`, `ACCEPTED`, `REJECTED`), `created_at`.

#### 6. `MarketplaceListing`
- Peer-to-peer used gear listing.
- **Attributes:** `id` (UUID, PK), `seller_id` (FK $\to$ `Profile`), `title`, `description`, `category` (`TEXTBOOK`, `DRAFTER`, `CALCULATOR`, `LAB_COAT`, `COMPONENT`), `condition` (`LIKE_NEW`, `GOOD`, `FAIR`), `price_inr` (Integer), `preferred_handover_spot`, `image_urls` (Text Array), `is_sold` (Boolean), `created_at`.

#### 7. `MessageThread` & `Message`
- Secure, phone-masked communication channels.
- **MessageThread:** `id` (UUID, PK), `participant_1_id` (FK), `participant_2_id` (FK), `context_type` (`MARKETPLACE`, `CLAIM`, `GENERAL`), `context_id` (UUID, FK to item), `status` (`PENDING_REQUEST`, `ACCEPTED`, `BLOCKED`), `created_at`.
- **Message:** `id` (UUID, PK), `thread_id` (FK $\to$ `MessageThread`), `sender_id` (FK $\to$ `Profile`), `content_text`, `is_read` (Boolean), `created_at`.

#### 8. `JobListing` & `JobBookmark`
- Career and internship postings prioritized by deadline.
- **JobListing:** `id` (UUID, PK), `posted_by_id` (FK $\to$ `Profile`), `company_name`, `role_title`, `stipend_ctc`, `application_deadline` (Timestamp, B-Tree indexed for urgency sorting), `min_cgpa` (Numeric), `eligible_batches` (Integer Array), `eligible_departments` (Text Array), `application_url`, `created_at`.
- **JobBookmark:** `id` (UUID, PK), `student_id` (FK $\to$ `Profile`), `job_id` (FK $\to$ `JobListing`), `created_at`.

#### 9. `CampusEvent` & `EventRSVP`
- Scheduled events displayed in calendar agenda.
- **CampusEvent:** `id` (UUID, PK), `organizer_club_id` (FK $\to$ `Community`), `created_by_id` (FK $\to$ `Profile`), `title`, `description`, `venue_landmark`, `start_time`, `end_time`, `banner_url`, `registration_url`, `created_at`.
- **EventRSVP:** `id` (UUID, PK), `event_id` (FK $\to$ `CampusEvent`), `student_id` (FK $\to$ `Profile`), `status` (`GOING`, `INTERESTED`), `created_at`.

#### 10. `StudentAchievement` & `Endorsement`
- Campus portfolio showcase (campus LinkedIn).
- **StudentAchievement:** `id` (UUID, PK), `student_id` (FK $\to$ `Profile`), `title`, `description`, `achievement_type` (`PROJECT`, `HACKATHON_WIN`, `COMPETITIVE_CODING`, `RESEARCH_PAPER`, `CERTIFICATION`), `media_urls` (Text Array), `github_url`, `demo_url`, `endorsement_count` (Integer), `created_at`.
- **Endorsement:** `id` (UUID, PK), `achievement_id` (FK $\to$ `StudentAchievement`), `endorser_id` (FK $\to$ `Profile`), `created_at`.
