# Development Roadmap — College Nexus

**Project:** College Nexus  
**Tagline:** One Campus. One Network. Zero Fragmentation.  
**Program:** Journey to Mastery — Level 1: Ronin  
**Author:** Dev Community KGEC  

---

## 1. Program Level Mapping

The execution of College Nexus is directly mapped to the 4 developmental ranks of the *Journey to Mastery* program and synchronized with the **28-day sprint breakdown from Slide 5 of the College Nexus master plan**:

```
+--------------------------------------------------------------------------------------------------------------------+
|                                             JOURNEY TO MASTERY ROADMAP                                             |
|                                                                                                                    |
|   LEVEL 1: RONIN          LEVEL 2: KENSHI                 LEVEL 3: SAMURAI              LEVEL 4: SHOGUN            |
|   "The Wanderer"           "The Blade"                     "The Warrior"                 "The Master"              |
|   (Week 1: Days 1-7)   (Week 2: Days 8–14)              (Week 3: Days 15–21)           (Weeks 4: Days 22–28)  |
|                                                                                                                    |
|   • Pure Ideation         • Day 8-10: UI Foundation        • Day 15-18: Database, Auth    • Day 22-23: Data Seeding  |
|   • 5 Specs in /docs        & Core Modules                  & Core APIs                   & Verification           |
|   • Miro Wireframes       • Day 11-14: Complete Feature     • Day 19-21: Feature APIs     • Day 24-26: RAG Engine,   |
|   • Architecture & APIs     UI with Mock Data               & System Integration          Push & Go-Live           |
|   • Zero Code Written     • Next.js PWA Shell             • Supabase PostgreSQL & RLS   • Day 27-28: Reach Users   |
|                           • Campus Vault & The Board      • SHA-256 File Deduplication    (25+ Users, CRs & Clubs) |
+--------------------------------------------------------------------------------------------------------------------+
```

---

### Level 1: Ronin — The Wanderer (Week 1: Days 1 to 7 - Ideation & System Blueprints)
**Milestone Focus:** Complete conceptualization, architectural foundation, and interface wireframing before writing a single line of production code.

- **What Ships at Ronin:**
  - Product Requirements Document (`PRD.md`) grounded in real collegiate engineering friction at KGEC.
  - End-to-end System Architecture (`ARCHITECTURE.md`) detailing client-edge-database data flows, ASCII topology diagrams, and entity data models.
  - Standardized API Specification (`API_SPEC.md`) defining routes, RBAC authorization levels, and uniform error schemas.
  - Functional and non-functional engineering requirements (`REQUIREMENTS.md`).
  - Wireframe sketches and interactive flows (`sketch.png`, `tech_approach.png`, and Miro board) illustrating every critical student screen.
  - Root repository navigation hub (`README.md`).

---

### Level 2: Kenshi — The Blade (Week 2: Days 8 to 14 - Frontend & Design System)
**Milestone Focus:** Crafting a responsive, mobile-first Progressive Web App (PWA) client built with Next.js 14 and Tailwind CSS operating on high-fidelity mock data, before connecting real databases.

#### Day 8 – Day 10: UI Foundation and Core Module
- Set up **Next.js 14 PWA architecture** with Tailwind CSS design tokens and responsive layout shell.
- Build **Login / Register**, **Student Dashboard**, and **Profile** interfaces with institutional roll-number input.
- Develop **Campus Vault UI** for Notes, PYQs, Books/PDFs, and Exam Schedules with cascading taxonomy filters (`Department` $\to$ `Semester` $\to$ `Subject Code`).
- Create **The Board UI** featuring dual tabs for official broadcast notices and community Lost & Found cards.
- Build reusable UI component library: cards, search bars, filter chips, badges, and modal dialogs.

#### Day 11 – Day 14: Complete Feature UI
- Develop **Campus Marketplace UI** for used textbooks and drawing instruments (mini-drafters, Casio calculators) with in-app seller messaging drawer.
- Build **Jobs & Internship Hub** interface with CGPA/batch eligibility tags and deadline-prioritized sorting.
- Create **Communities UI** for mandatory department walls, batch rooms, and approved campus clubs (Robotics, Coding Club).
- Develop **Events Calendar UI** with date-picker and event-detail views.
- Build **Notifications**, **Direct Messaging (DM)**, **Message Requests drawer**, and **AI Study Hub preview** interfaces.
- Finalize **Admin & CR Dashboard** and interconnect all pages using comprehensive mock datasets.

---

### Level 3: Samurai — The Warrior (Week 3: Days 15 to 21 — Backend, Database & Integration)
**Milestone Focus:** Establishing a production-grade backend: database schema migrations, row-level security, user authentication, file storage with cryptographic deduplication, and real-time messaging.

#### Day 15 – Day 17: Database, Authentication & Core APIs
- Design and migrate PostgreSQL database schemas for users, profiles, departments, subjects, batches, and communities on Supabase.
- Implement **Supabase Auth** with session persistence, roll-number validation, and Role-Based Access Control (`STUDENT`, `CR`, `ADMIN`).
- Develop core REST API Route Handlers for **Campus Vault**, **The Board**, and **Communities**.
- Configure secure **Supabase Storage buckets** for academic PDFs and item photos.
- Implement document metadata tagging, categorization, and database-level Row Level Security (RLS) policies.

#### Day 18 – Day 21: Feature APIs & System Integration
- Implement **Campus Marketplace APIs** and secure WebSocket direct messaging channels via Supabase Realtime.
- Develop **Jobs & Internship APIs** with dynamic eligibility and earliest-deadline sorting filters.
- Implement **Events and Community discussion APIs** with role-gated publishing.
- Build notification dispatch and incoming message-request authorization services.
- Add admin moderation tools, copyright checks, and CR verification workflows.
- Wire completed backend APIs directly into the Next.js frontend, replacing mock data.
- Perform comprehensive API security, token expiration, and end-to-end integration testing.

---

### Level 4: Shogun — The Master (Week 4: Days 22 to 28 — Data, RAG, Production & Real Users)
**Milestone Focus:** Seeding verified campus academic resources, deploying the AI Study Agent RAG pipeline, launching to production on edge infrastructure, and onboarding 25+ real active students across multiple departments at KGEC.

#### Day 22 – Day 23: Data Collection & Verification
- Collect verified MAKAUT syllabus documents, previous year question papers (PYQs), professor lecture notes, and lab manuals from KGEC departments.
- Gather structured campus data for upcoming club events, placement notices, and academic circulars.
- Organize all academic documents strictly by: $\text{Document} \to \text{Semester} \to \text{Subject} \to \text{Subject Code}$.
- Execute admin and Class Representative (CR) verification workflows to award official badges.
- Perform automated SHA-256 hash checking to detect and reject duplicate files.
- Clean and prepare approved academic documents for the vector retrieval pipeline.

#### Day 24 – Day 26: RAG Engine, Notifications & Final Deployment
- Process verified Vault PDFs through the document ingestion pipeline: **Text Extraction $\to$ Cleaning $\to$ Semantic Chunking $\to$ Embeddings Generation**.
- Build the **AI Study Agent / RAG pipeline** using `pgvector` and an LLM to answer syllabus questions with direct page-level citations.
- Integrate **PWA Web Push Notifications** (Push, Not Pull) with per-category notification toggles and digest modes.
- Deploy the production build to **Vercel Edge Network** and **Supabase Cloud** with SSL and global CDN caching.
- Conduct thorough mobile responsiveness, latency, and cross-browser testing ($< 1.5\text{s}$ First Contentful Paint).
- Prepare live production URL and demonstration assets.

#### Day 27 – Day 28: Reach to Users (Campus Pilot & Community Outreach)
- Connect with all Class Representatives (CRs) across every engineering department at KGEC (CSE, IT, ECE, EE, ME).
- Partner with campus student clubs (Robotics Club, Dev Community KGEC, Sports Club) to onboard their official community hubs onto the platform.
- Reach out to undergraduate students through campus social media and hostel outreach.
- **Hit the 25-User Milestone:** Successfully onboard $\ge 25$ verified active students across at least 2 distinct engineering departments who actively download PYQs, test Lost & Found claims, and interact via Marketplace messaging.
- Collect structured qualitative feedback and telemetry to iterate on search speed and usability.

---

## 2. Chronological Sprint Calendar

| Sprint Period | Calendar Days | Level Alignment | Core Focus Area & Deliverables (Slide 5 Master Plan) |
|---|---|---|---|
| **Week 1 Pre-Build** | Day 1-7 | **Level 1: Ronin** | Architecture, PRD, API spec, Roadmap, Requirements, and Miro wireframe boards. |
| **Week 2 (Part 1)** | Days 8–10 | **Level 2: Kenshi** | **UI Foundation & Core Module:** Next.js PWA setup, Auth UI, Dashboard, Vault & Board components. |
| **Week 2 (Part 2)** | Days 11–14 | **Level 2: Kenshi** | **Complete Feature UI:** Marketplace, Jobs feed, Communities, Calendar, DMs, and Mock Admin. |
| **Week 3 (Part 1)** | Days 15–18 | **Level 3: Samurai** | **Database, Auth & Core APIs:** PostgreSQL schemas, Supabase Auth, RLS, Storage & Vault APIs. |
| **Week 3 (Part 2)** | Days 18–21 | **Level 3: Samurai** | **Feature APIs & System Integration:** Marketplace APIs, Realtime DMs, Deadline engine, integration testing. |
| **Week 4 (Part 1)** | Days 22–23 | **Level 4: Shogun** | **Data Collection & Verification:** Seeding PYQs/notes by Dept/Sem/Subject, CR badge verification. |
| **Week 4 (Part 2)** | Days 24–26 | **Level 4: Shogun** | **RAG Pipeline, Notifications & Deployment:** AI Study Agent, Web Push, Vercel edge deployment. |
| **Week 4** | Days 27–28 | **Level 4: Shogun** | **Reach to Users:** Onboard 25+ real students across 2+ depts, CR outreach, club integration, pilot validation. |
