# API Specification — College Nexus

**Project:** College Nexus
**Tagline:** One Campus. One Network. Zero Fragmentation.
**Program:** Journey to Mastery — Level 1: Ronin
**Author:** Dev Community KGEC

---

## 1. Authentication Strategy

### Provider & Architecture
College Nexus standardizes on **Supabase Auth** backed by JSON Web Tokens (JWT) and HTTP-only encrypted session cookies.

### Why Supabase Auth?
1. **Zero Crypto Maintenance:** Eliminates the vulnerability of rolling custom JWT signing, refresh token rotation, and password hashing algorithms.
2. **PostgreSQL RLS Integration:** The extracted JWT claims (`sub`, `role`, `app_metadata`) pass directly into PostgreSQL session variables (`auth.uid()`), allowing Row Level Security (RLS) policies to enforce access control directly at the database engine level.
3. **Institutional Verification:** Enables email magic links alongside custom onboarding metadata validation (verifying institutional roll numbers against departmental regex patterns).

### Role-Based Access Control (RBAC)
User accounts are classified into three immutable hierarchical roles:

| Role | Permissions & Scope |
|---|---|
| **`STUDENT`** | Default role. Browse verified Vault documents, download notes/PYQs, post Lost & Found items, create Marketplace listings, publish project/competition achievements to the campus showcase feed, RSVP to events, bookmark job postings, initiate peer-to-peer message requests, and vote on community resources. |
| **`CR` (Class Representative)** | All Student permissions + ability to publish official batch announcements, review student uploads for CR-verification badges, post verified T&P job circulars, and schedule departmental academic events. |
| **`ADMIN` (Faculty / Superadmin)** | All CR permissions + ability to post campus-wide urgent circulars, manage departmental taxonomies, approve student club event requests, moderate marketplace/showcase feeds, resolve disputed claims, and suspend abusive accounts. |

### Request Authorization Header
Authenticated client requests must supply the bearer token:
```http
Authorization: Bearer <supabase_jwt_token>
```

---

## 2. Standardized Error Response Shape

All API route handlers return a uniform error envelope when HTTP status code $\ge 400$. This prevents ambiguous error parsing across frontend components.

### Schema Definition
```json
{
  "success": false,
  "error": {
    "code": "STRING_ERROR_CODE",
    "message": "Human-readable explanation of what went wrong.",
    "details": [],
    "timestamp": "2026-09-20T13:30:00.000Z",
    "path": "/api/vault/documents/upload"
  }
}
```

### Standard HTTP Status Codes & Error Codes
- **`400 Bad Request`** (`INVALID_INPUT`, `MISSING_REQUIRED_FIELD`): The request body failed schema validation. Field-level details are provided in `details`.
- **`401 Unauthorized`** (`AUTH_REQUIRED`, `TOKEN_EXPIRED`): The request lacked a valid bearer token or the session has expired.
- **`403 Forbidden`** (`INSUFFICIENT_PERMISSIONS`): A student attempted to post an official notice, publish a T&P job drive, or perform an action restricted to a `CR` or `ADMIN`.
- **`404 Not Found`** (`RESOURCE_NOT_FOUND`): The requested document, notice, job, event, or listing ID does not exist.
- **`409 Conflict`** (`DUPLICATE_FILE_HASH`, `ALREADY_CLAIMED`, `ALREADY_REGISTERED`): An uploaded document has a matching SHA-256 hash already present in the Vault, or a duplicate action occurred.
- **`429 Too Many Requests`** (`RATE_LIMIT_EXCEEDED`): The client exceeded the allowed rate limit (e.g. max 10 message requests per hour).
- **`500 Internal Server Error`** (`INTERNAL_SERVER_ERROR`): An unexpected server-side exception occurred.

### Example: Duplicate File Error (409 Conflict)
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_FILE_HASH",
    "message": "This document already exists in the Campus Vault under Subject CS501 ('Operating Systems PYQ 2023.pdf'). Duplicate uploads are automatically rejected.",
    "details": [
      {
        "field": "file_hash",
        "existing_document_id": "7f8b9e12-45a6-4b8c-9012-3def456789ab"
      }
    ],
    "timestamp": "2026-09-20T13:31:12.104Z",
    "path": "/api/vault/documents/upload"
  }
}
```

---

## 3. Planned Endpoints Table

### Module 1: Authentication & Profiles

| HTTP Method | Route | Auth Required | Authorized Roles | Description |
|---|---|---|---|---|
| **POST** | `/api/auth/register` | No | Public | Register new account with name, email, password, student roll number, and department. |
| **POST** | `/api/auth/login` | No | Public | Authenticate user credentials and return session token with role metadata. |
| **GET** | `/api/profile/me` | Yes | All Roles | Fetch currently authenticated student profile, assigned cohorts, and saved resources. |
| **PATCH** | `/api/profile/me` | Yes | All Roles | Update profile bio, avatar, and notification preferences (phone number remains hidden). |
| **GET** | `/api/profile/[id]` | Yes | All Roles | View public profile of a peer (displays name, branch, batch, achievements, listings; phone hidden). |

### Module 2: Campus Vault (Academic Resource Repository)

| HTTP Method | Route | Auth Required | Authorized Roles | Description |
|---|---|---|---|---|
| **GET** | `/api/vault/taxonomy` | No | Public | Return all departments, semesters, and subjects for cascading filter dropdowns. |
| **GET** | `/api/vault/documents` | Yes | All Roles | List documents filtered by query parameters (`department`, `semester`, `subject`, `type`, `search`). |
| **POST** | `/api/vault/documents/upload` | Yes | Student, CR, Admin | Upload file metadata and SHA-256 hash. Verifies uniqueness before issuing a Cloudinary upload URL. |
| **POST** | `/api/vault/documents/[id]/upvote` | Yes | All Roles | Upvote an academic document or revoke an existing upvote (toggle). |
| **PATCH** | `/api/vault/documents/[id]/verify` | Yes | CR, Admin | Grant or revoke the CR-Verified checkmark on an academic document. |

### Module 3: The Board (Official Notices & Lost & Found)

| HTTP Method | Route | Auth Required | Authorized Roles | Description |
|---|---|---|---|---|
| **GET** | `/api/board/notices` | Yes | All Roles | List broadcast notices with pagination, priority filter (`URGENT`, `PLACEMENT`), and batch filter. |
| **POST** | `/api/board/notices/create` | Yes | CR, Admin | Publish a new official circular with priority badge, target department/batch, and expiry date. |
| **GET** | `/api/board/lost-found` | Yes | All Roles | List open and resolved lost & found items with photo thumbnails and category filters. |
| **POST** | `/api/board/lost-found/create` | Yes | Student, CR, Admin | Create a lost or found report with public details and hidden identifier notes. |
| **POST** | `/api/board/lost-found/[id]/claim` | Yes | Student, CR, Admin | Submit a private descriptive claim verifying ownership of a found item. |
| **PATCH** | `/api/board/lost-found/claims/[id]/resolve` | Yes | Student (Finder) | Approve or decline a claim request. On approval, updates item to `RESOLVED` and spawns a direct chat. |

### Module 4: Campus Marketplace (Used Books & Instruments)

| HTTP Method | Route | Auth Required | Authorized Roles | Description |
|---|---|---|---|---|
| **GET** | `/api/marketplace/listings` | Yes | All Roles | Browse active used books, calculators, and drafters filtered by category and price range. |
| **POST** | `/api/marketplace/listings/create` | Yes | Student, CR, Admin | Create a marketplace listing with photo URLs, condition badge, price (₹), and pickup spot. |
| **PATCH** | `/api/marketplace/listings/[id]/status` | Yes | Student (Seller) | Mark an item as `RESERVED` or `SOLD`. |

### Module 5: Jobs & Internships Hub (Earliest-Deadline-First Engine)

| HTTP Method | Route | Auth Required | Authorized Roles | Description |
|---|---|---|---|---|
| **GET** | `/api/careers/jobs` | Yes | All Roles | List job and internship drives sorted strictly by earliest closing deadline; filter by CGPA, batch, and branch. |
| **POST** | `/api/careers/jobs/create` | Yes | CR, Admin | Publish a verified campus drive or internship with company, role, stipend/CTC, deadline, criteria, and link. |
| **GET** | `/api/careers/jobs/[id]` | Yes | All Roles | Retrieve full job specification, eligibility rules, and outbound application tracking. |
| **POST** | `/api/careers/jobs/[id]/bookmark` | Yes | All Roles | Bookmark a job/internship to student's personal application tracker (toggle). |

### Module 6: Events Calendar (Campus Event Hub)

| HTTP Method | Route | Auth Required | Authorized Roles | Description |
|---|---|---|---|---|
| **GET** | `/api/events` | Yes | All Roles | Retrieve campus events for calendar view (month/week); filter by club, department, and category. |
| **POST** | `/api/events/create` | Yes | CR, Admin | Publish a structured campus event with organizer, venue (hall/lab), start/end time, and registration URL. |
| **GET** | `/api/events/[id]` | Yes | All Roles | Get event details, venue map landmark, agenda, and confirmed attendee count. |
| **POST** | `/api/events/[id]/rsvp` | Yes | All Roles | Register RSVP attendance for an event to receive scheduled reminder push notifications. |

### Module 7: Student Achievements & Showcase Feed (Campus LinkedIn)

| HTTP Method | Route | Auth Required | Authorized Roles | Description |
|---|---|---|---|---|
| **GET** | `/api/showcase/achievements` | Yes | All Roles | Browse campus showcase feed displaying student project launches, hackathon wins, research, and certificates. |
| **POST** | `/api/showcase/achievements/create` | Yes | Student, CR, Admin | Upload a showcase post with title, project description, demo/GitHub links, photos, and team member tags. |
| **GET** | `/api/profile/[id]/achievements` | Yes | All Roles | Fetch all verified portfolio achievements and competition wins belonging to a specific student. |
| **POST** | `/api/showcase/achievements/[id]/endorse` | Yes | All Roles | Peer-endorse an achievement to highlight student talent and elevate visibility to faculty and recruiters. |

### Module 8: Communities & Cohorts

| HTTP Method | Route | Auth Required | Authorized Roles | Description |
|---|---|---|---|---|
| **GET** | `/api/communities/my-cohorts` | Yes | All Roles | Fetch the student's automatically assigned Department and Batch community rooms. |
| **GET** | `/api/communities/clubs` | Yes | All Roles | List verified campus clubs (Robotics, Coding Club, Sports, Cultural) and join public discussions. |

### Module 9: Direct Messaging & Handover (Phone-Masked Channels)

| HTTP Method | Route | Auth Required | Authorized Roles | Description |
|---|---|---|---|---|
| **GET** | `/api/messages/threads` | Yes | All Roles | List all active direct message threads and pending message requests for the user. |
| **POST** | `/api/messages/threads/request` | Yes | All Roles | Initiate a message request linked to a Marketplace listing or Lost & Found claim. |
| **POST** | `/api/messages/[threadId]/send` | Yes | Thread Participants | Send a text message inside an approved thread. Triggers real-time WebSocket delivery. |
| **POST** | `/api/messages/[threadId]/block` | Yes | Thread Participants | Block peer and report conversation for administrative review. |

### Module 10: Push Notifications

| HTTP Method | Route | Auth Required | Authorized Roles | Description |
|---|---|---|---|---|
| **POST** | `/api/notifications/subscribe` | Yes | All Roles | Register a Web Push subscription endpoint for category-specific PWA alerts. |
| **GET** | `/api/notifications/preferences` | Yes | All Roles | Get student's category-level notification toggle preferences (PYQs, Placement, DMs). |
| **PATCH** | `/api/notifications/preferences` | Yes | All Roles | Update per-category push alert toggles and digest schedule. |
