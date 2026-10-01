# College Nexus — Backend API & Cloudinary Server

This is the Node.js / Express backend server for **College Nexus**, providing asset uploads, academic document storage in Campus Vault, and media management powered by **Cloudinary**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd Server
npm install
```

### 2. Configure Environment (`Server/.env`)
Create or edit `Server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Cloudinary Credentials
CLOUDINARY_URL=cloudinary://<API_KEY>:<API_SECRET>@<CLOUD_NAME>
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Unsigned Upload Preset (if using preset-based uploads)
CLOUDINARY_UPLOAD_PRESET=college_nexus
```

### 3. Run the Server
```bash
# Development (with auto-reload on file change)
npm run dev

# Production
npm start
```

The server starts at `http://localhost:5000`.

---

## 📡 API Endpoints

### 1. Health & Cloudinary Ping
- **Endpoint:** `GET /api/health`
- **Description:** Verifies server uptime, Node.js version, and Cloudinary connectivity.
- **Example Response:**
  ```json
  {
    "success": true,
    "server": {
      "status": "online",
      "name": "College Nexus Backend API",
      "uptime": 120.4,
      "timestamp": "2026-10-01T10:00:00.000Z",
      "node_version": "v22.20.0"
    },
    "storage": {
      "provider": "Cloudinary",
      "connected": true,
      "cloud_name": "daybrhbsc",
      "message": "Cloudinary credentials verified successfully."
    }
  }
  ```

---

### 2. Upload Single File (Image / Asset)
- **Endpoint:** `POST /api/upload`
- **Content-Type:** `multipart/form-data`
- **Fields:**
  - `file`: The binary file (Image: JPG, PNG, WEBP, GIF, SVG or Document: PDF, DOCX, ZIP)
  - `folder` *(optional)*: Cloudinary subfolder path (default: `college-nexus/uploads`)
- **cURL Example:**
  ```bash
  curl -X POST http://localhost:5000/api/upload \
    -F "file=@/path/to/avatar.png" \
    -F "folder=college-nexus/profiles"
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "File uploaded successfully to Cloudinary.",
    "data": {
      "url": "https://res.cloudinary.com/.../avatar.png",
      "secure_url": "https://res.cloudinary.com/.../avatar.png",
      "public_id": "college-nexus/profiles/avatar_123",
      "format": "png",
      "bytes": 48210,
      "width": 800,
      "height": 800
    }
  }
  ```

---

### 3. Upload Multiple Files
- **Endpoint:** `POST /api/upload/multiple`
- **Content-Type:** `multipart/form-data`
- **Fields:**
  - `files`: Up to 5 files
  - `folder` *(optional)*: Target folder
- **Response:**
  ```json
  {
    "success": true,
    "count": 3,
    "data": [
      { "secure_url": "...", "public_id": "..." }
    ]
  }
  ```

---

### 4. Upload Academic Document (Campus Vault)
- **Endpoint:** `POST /api/upload/document`
- **Content-Type:** `multipart/form-data`
- **Fields:**
  - `document`: PDF / DOCX file (e.g. Operating Systems PYQ 2024.pdf)
  - `department`: e.g. `CSE`, `ECE`, `ME`, `EE`, `IT`
  - `semester`: e.g. `sem5`, `sem6`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Academic document uploaded to Campus Vault repository.",
    "data": {
      "secure_url": "https://res.cloudinary.com/.../OS_PYQ_2024.pdf",
      "public_id": "college-nexus/vault/CSE/sem5/OS_PYQ_2024",
      "department": "CSE",
      "semester": "sem5"
    }
  }
  ```

---

### 5. Delete Asset
- **Endpoint:** `DELETE /api/upload/:public_id`
- **Query Params:**
  - `resource_type` *(optional)*: `image` (default), `raw`, or `video`
- **cURL Example:**
  ```bash
  curl -X DELETE http://localhost:5000/api/upload/college-nexus/profiles/avatar_123
  ```

---

### 6. Get Upload Signature (Direct Client-to-Cloudinary)
- **Endpoint:** `GET /api/upload/signature?folder=college-nexus/direct`
---

### 7. Supabase Intranet Authentication Status
- **Endpoint:** `GET /api/auth/status`
- **Headers:** Optional `Authorization: Bearer <supabase_jwt>`
- **Description:** Returns the operational status of Supabase authentication and enabled login methods (Google OAuth, GitHub OAuth, Email/Password, Magic Link, Roll Verification).

---

### 8. Verify Institutional Student Token
- **Endpoint:** `GET /api/auth/me`
- **Headers:** `Authorization: Bearer <supabase_jwt>`
- **Description:** Validates Supabase JWT and returns the parsed KGEC institutional student identity (Roll Number, Department, Batch Year).

---

## 🔑 Supabase Authentication Configuration

Add your Supabase project keys to `Server/.env` and the root `.env`:
```env
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5c...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5c...
```

### Supported Authentication Methods:
1. **Google OAuth**: Configure Google Client ID & Secret in Supabase Dashboard ➔ Authentication ➔ Providers ➔ Google.
2. **GitHub OAuth**: Configure GitHub OAuth App Client ID & Secret in Supabase Dashboard ➔ Authentication ➔ Providers ➔ GitHub.
3. **Email + Roll Number**: Direct registration with institutional student metadata (`roll_number`, `department`, `batch_year`).
4. **Passwordless Magic Link**: One-time email login link via Supabase Auth.
5. **KGEC Roll Authentication (Offline/Demo)**: Instant client-side verification for testing without internet or when Supabase keys are pending.

---

## 🔒 Cloudinary Permissions Configuration Note

If you receive `403 Request forbidden due to missing permissions (actions=["create"])`:
1. Log in to your [Cloudinary Console](https://console.cloudinary.com/).
2. Go to **Settings** (gear icon) ➔ **Access Keys**.
3. Locate your API Key (`195498863882221`) and ensure it has **Write / Upload** permissions enabled (or use your primary Account API Key).
4. Alternatively, go to **Settings** ➔ **Upload** ➔ **Upload presets** ➔ **Add upload preset**, name it `college_nexus`, set **Signing Mode** to **Unsigned**, and add `CLOUDINARY_UPLOAD_PRESET=college_nexus` to your `.env`.

