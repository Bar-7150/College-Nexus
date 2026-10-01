export interface VaultItem {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  department: "CSE" | "ECE" | "EE" | "ME" | "IT";
  semester: number;
  type: "PYQ" | "Notes" | "Syllabus" | "Lab Manual";
  year: string;
  contributor: string;
  contributorRoll: string;
  verified: boolean;
  sha256: string;
  downloads: number;
  pages: number;
  date: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: "URGENT" | "PLACEMENT" | "ACADEMIC" | "EVENT";
  issuer: string;
  date: string;
  expiresIn: string;
  department: string;
  summary: string;
  pinned: boolean;
}

export interface LostFoundItem {
  id: string;
  itemName: string;
  category: "Calculators" | "Drafters" | "Instruments" | "Keys" | "Electronics";
  locationFound: string;
  dateTime: string;
  finderAlias: string;
  status: "Unclaimed" | "Pending Claim" | "Recovered";
  imageType: "calculator" | "drafter" | "multimeter" | "keys" | "idcard";
  hiddenClue: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: "Tools" | "Books" | "Apparel" | "Electronics";
  price: number;
  originalPrice: number;
  condition: "Like New" | "Good" | "Fair";
  pickupLandmark: string;
  sellerYear: string;
  sellerDept: string;
  sellerMaskedId: string;
  dateListed: string;
}

export interface QuestLevel {
  level: string;
  kanji: string;
  title: string;
  subTitle: string;
  phase: string;
  status: "Completed" | "Current Quest" | "Locked" | "Final Boss";
  description: string;
  milestones: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Auth & Privacy" | "Campus Vault" | "Lost & Found" | "Marketplace";
}

export const KGEC_DEPARTMENTS = [
  { code: "ALL", name: "All Departments", kanji: "全", count: "0 Resources" },
  { code: "CSE", name: "Computer Science & Engg", kanji: "計", count: "0 Resources" },
  { code: "ECE", name: "Electronics & Comm. Engg", kanji: "電", count: "0 Resources" },
  { code: "EE", name: "Electrical Engineering", kanji: "力", count: "0 Resources" },
  { code: "ME", name: "Mechanical Engineering", kanji: "機", count: "0 Resources" },
  { code: "IT", name: "Information Technology", kanji: "通", count: "0 Resources" },
];

export const MOCK_VAULT_ITEMS: VaultItem[] = process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true" ? [
  {
    id: "v-1",
    title: "Computer Networks CS501 — 2023 MAKAUT End-Sem Solved Solutions",
    subjectCode: "CS501",
    subjectName: "Computer Networks",
    department: "CSE",
    semester: 5,
    type: "PYQ",
    year: "2023",
    contributor: "Rohan Mukherjee",
    contributorRoll: "22/CSE/042",
    verified: true,
    sha256: "7f8a92e1...d40c",
    downloads: 384,
    pages: 28,
    date: "Sep 14, 2026",
  },
  {
    id: "v-2",
    title: "Analog Electronic Circuits — Comprehensive Lecture Modules & Viva Questions",
    subjectCode: "EC302",
    subjectName: "Analog Electronics",
    department: "ECE",
    semester: 3,
    type: "Notes",
    year: "2024",
    contributor: "Ananya Roy (CR)",
    contributorRoll: "23/ECE/018",
    verified: true,
    sha256: "3c1b489a...90f2",
    downloads: 276,
    pages: 64,
    date: "Sep 12, 2026",
  },
  {
    id: "v-3",
    title: "Electric Power Systems & Grid Analysis (EE601) — Mid-Term Bank",
    subjectCode: "EE601",
    subjectName: "Electric Power Systems",
    department: "EE",
    semester: 6,
    type: "PYQ",
    year: "2023",
    contributor: "Subhadip Paul",
    contributorRoll: "21/EE/029",
    verified: true,
    sha256: "99e410bc...712a",
    downloads: 198,
    pages: 36,
    date: "Sep 08, 2026",
  },
  {
    id: "v-4",
    title: "Heat Transfer & Fluid Dynamics Hand-Derived Formula Compilation",
    subjectCode: "ME401",
    subjectName: "Fluid Mechanics",
    department: "ME",
    semester: 4,
    type: "Notes",
    year: "2024",
    contributor: "Arghya Banerjee",
    contributorRoll: "22/ME/055",
    verified: true,
    sha256: "45f8e312...ee88",
    downloads: 215,
    pages: 42,
    date: "Sep 05, 2026",
  },
  {
    id: "v-5",
    title: "Database Management Systems (IT502) — Normalization & B+ Trees Primer",
    subjectCode: "IT502",
    subjectName: "DBMS",
    department: "IT",
    semester: 5,
    type: "Notes",
    year: "2024",
    contributor: "Tathagata Sen",
    contributorRoll: "22/IT/011",
    verified: true,
    sha256: "aa91e450...33bd",
    downloads: 310,
    pages: 52,
    date: "Sep 02, 2026",
  },
  {
    id: "v-6",
    title: "Design & Analysis of Algorithms — Dynamic Programming Master Vault",
    subjectCode: "CS402",
    subjectName: "Algorithms",
    department: "CSE",
    semester: 4,
    type: "PYQ",
    year: "2022",
    contributor: "Sayan Bhattacharya",
    contributorRoll: "23/CSE/007",
    verified: true,
    sha256: "88ab126c...11a0",
    downloads: 512,
    pages: 34,
    date: "Aug 29, 2026",
  },
] : [];

export const MOCK_NOTICES: NoticeItem[] = process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true" ? [
  {
    id: "n-1",
    title: "T&P Cell: Google & Microsoft Summer SDE Internship Pre-Assessment Registration",
    category: "PLACEMENT",
    issuer: "Training & Placement Cell",
    date: "Today, 08:30 AM",
    expiresIn: "Closing in 6 hours",
    department: "All Engineering Branches (2026 Batch)",
    summary:
      "Eligible CGPA >= 7.5. Direct assessment link dispatched to verified roll numbers. Strictly no third-party sharing.",
    pinned: true,
  },
  {
    id: "n-2",
    title: "URGENT: MAKAUT Odd-Semester Examination Form Regularization Deadline",
    category: "URGENT",
    issuer: "Office of the Controller of Examinations",
    date: "Yesterday",
    expiresIn: "Expires Sep 25",
    department: "All Semesters",
    summary:
      "All students must complete subject code verification on MAKAUT portal before 17:00 IST. Failure incurs late fine.",
    pinned: true,
  },
  {
    id: "n-3",
    title: "Central Academic Library: 24x7 Night Reading Hall Operational for Mid-Sem",
    category: "ACADEMIC",
    issuer: "Chief Librarian, Central Library",
    date: "Sep 19, 2026",
    expiresIn: "Valid through Oct 10",
    department: "Campus Intranet",
    summary:
      "Hall-2 & 3 air-conditioned reading bays unlocked. Access via digital student roll QR badge.",
    pinned: false,
  },
  {
    id: "n-4",
    title: "Robowars 2026: Autonomous Combat & Line Follower Championship Open",
    category: "EVENT",
    issuer: "KGEC Robotics & Automation Society",
    date: "Sep 18, 2026",
    expiresIn: "Registration closes Oct 01",
    department: "Student Life & Societies",
    summary:
      "Inter-department robotics tournament with ₹50,000 cash pool. Hardware component lab sponsorship provided.",
    pinned: false,
  },
] : [];

export const MOCK_LOST_FOUND: LostFoundItem[] = process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true" ? [
  {
    id: "lf-1",
    itemName: "Casio fx-991EX ClassWiz Calculator",
    category: "Calculators",
    locationFound: "Drawing Hall 2, Desk #44",
    dateTime: "Sep 21, 15:45 IST",
    finderAlias: "Kenshi_Guard_42",
    status: "Unclaimed",
    imageType: "calculator",
    hiddenClue: "Has a custom silver anime sticker on the slipcase backside",
  },
  {
    id: "lf-2",
    itemName: "Omega Mini-Drafter with 360° Proportional Scale",
    category: "Drafters",
    locationFound: "Mechanical Workshop Block, Hall B",
    dateTime: "Sep 20, 17:10 IST",
    finderAlias: "ME_Senior_88",
    status: "Pending Claim",
    imageType: "drafter",
    hiddenClue: "Engraved initials 'S.D.' in white marker near pivot knob",
  },
  {
    id: "lf-3",
    itemName: "Mastech MAS830L Digital Multimeter with Probes",
    category: "Instruments",
    locationFound: "ECE Hardware & Embedded Systems Lab",
    dateTime: "Sep 19, 11:20 IST",
    finderAlias: "Lab_Assistant_ECE",
    status: "Unclaimed",
    imageType: "multimeter",
    hiddenClue: "Yellow protective holster with red probe tape repair",
  },
  {
    id: "lf-4",
    itemName: "Hostel Hall-1 Dormitory Room Key Ring",
    category: "Keys",
    locationFound: "Main Canteen Lawn Bench",
    dateTime: "Sep 18, 19:30 IST",
    finderAlias: "Shogun_Patrol_19",
    status: "Recovered",
    imageType: "keys",
    hiddenClue: "Attached to black leather carabiner and brass #314 fob",
  },
] : [];

export const MOCK_MARKETPLACE: MarketplaceItem[] = process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true" ? [
  {
    id: "m-1",
    title: "Omega Engineering Drafter Set + Hard Travel Case",
    category: "Tools",
    price: 260,
    originalPrice: 650,
    condition: "Like New",
    pickupLandmark: "KGEC Main Canteen Patio",
    sellerYear: "4th Year Senior",
    sellerDept: "ME",
    sellerMaskedId: "Roll 21/**/052",
    dateListed: "2 hours ago",
  },
  {
    id: "m-2",
    title: "Thomas & Finney: Calculus and Analytic Geometry (9th Ed)",
    category: "Books",
    price: 320,
    originalPrice: 890,
    condition: "Good",
    pickupLandmark: "Central Library Steps",
    sellerYear: "3rd Year",
    sellerDept: "CSE",
    sellerMaskedId: "Roll 22/**/014",
    dateListed: "Yesterday",
  },
  {
    id: "m-3",
    title: "100% Cotton Workshop Apron (Size L) + Safety Goggles",
    category: "Apparel",
    price: 140,
    originalPrice: 380,
    condition: "Good",
    pickupLandmark: "Mechanical Block Gate",
    sellerYear: "2nd Year",
    sellerDept: "EE",
    sellerMaskedId: "Roll 23/**/037",
    dateListed: "2 days ago",
  },
  {
    id: "m-4",
    title: "Arduino Uno R3 Starter Kit + Breadboard & 40+ Sensors",
    category: "Electronics",
    price: 490,
    originalPrice: 1200,
    condition: "Like New",
    pickupLandmark: "Hostel 2 Entrance Arch",
    sellerYear: "4th Year Senior",
    sellerDept: "ECE",
    sellerMaskedId: "Roll 21/**/003",
    dateListed: "Sep 18, 2026",
  },
] : [];

export const QUEST_LEVELS: QuestLevel[] = process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true" ? [
  {
    level: "LEVEL I",
    kanji: "浪人",
    title: "RONIN",
    subTitle: "The Architecture Pioneer",
    phase: "Week 1: Ideation & Foundation",
    status: "Completed",
    description:
      "Formulated problem statement, compiled KGEC user personas, created Excalidraw system architecture, PRD, and database schema specification.",
    milestones: [
      "Product Requirements Document (PRD)",
      "System Architecture & Data Flow",
      "API & Cryptographic Spec",
      "Journey to Mastery Submission",
    ],
  },
  {
    level: "LEVEL II",
    kanji: "剣士",
    title: "KENSHI",
    subTitle: "The PWA Frontend Builder",
    phase: "Week 2: Frontend & Mock Engine",
    status: "Current Quest",
    description:
      "Deliver a pixel-perfect, responsive Next.js 14 and Tailwind CSS Progressive Web App client styled in the Journey to Mastery Japanese editorial aesthetic.",
    milestones: [
      "Hierarchical Campus Vault UI",
      "The Board Dual-Stream Feed",
      "Marketplace Listings & Drawer",
      "Responsive PWA Shell & Theme",
    ],
  },
  {
    level: "LEVEL III",
    kanji: "侍",
    title: "SAMURAI",
    subTitle: "The Full-Stack Warrior",
    phase: "Week 3: Supabase & Realtime",
    status: "Locked",
    description:
      "Hook the interface to Supabase PostgreSQL, authenticate institutional roll numbers via Supabase Auth, enforce strict RLS, and integrate Cloudinary asset storage.",
    milestones: [
      "Supabase PostgreSQL + RLS",
      "Client SHA-256 Hashing Gate",
      "WebSockets Realtime Claims",
      "Verified CR Broadcast Engine",
    ],
  },
  {
    level: "LEVEL IV",
    kanji: "将軍",
    title: "SHOGUN",
    subTitle: "The Campus Master",
    phase: "Week 4: Campus Production",
    status: "Final Boss",
    description:
      "Battle-tested production deployment on Vercel and Supabase Cloud, onboarding 25+ verified KGEC students across CSE and ECE with active resource exchanges.",
    milestones: [
      "Production Vercel Edge Deployment",
      "Onboard 25+ Verified KGEC Students",
      "Live Demo Day & Final Pitch",
      "Journey to Mastery Graduation",
    ],
  },
] : [];

export const MOCK_TIMELINE = process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true" ? [
  {
    week: "WEEK I",
    dates: "SEP 01 – SEP 07",
    kanji: "始",
    title: "FOUNDATION",
    focus: "Ideation & Architecture",
    tasks: ["Project Blueprint & PRD", "Taxonomy & Excalidraw Sketch", "Mentor Kickoff Review"],
  },
  {
    week: "WEEK II",
    dates: "SEP 08 – SEP 14",
    kanji: "創",
    title: "DEVELOPMENT",
    focus: "PWA Frontend & Mock Vault",
    tasks: ["Next.js 14 + Tailwind Engine", "Campus Vault Taxonomy Filtering", "The Board & Marketplace UI"],
  },
  {
    week: "WEEK III",
    dates: "SEP 15 – SEP 21",
    kanji: "磨",
    title: "EXECUTION",
    focus: "Backend & Roll Security",
    tasks: ["Supabase Auth & PostgreSQL", "SHA-256 Duplicate Guard", "Private Claim Recovery Flow"],
  },
  {
    week: "WEEK IV",
    dates: "SEP 22 – SEP 28",
    kanji: "極",
    title: "MASTERY",
    focus: "Demo Day & Production Launch",
    tasks: ["Live KGEC Student Onboarding", "50+ Verified Vault Resources", "Final Showcase & Evaluation"],
  },
] : [];

export const MOCK_MENTORS = process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true" ? [
  {
    name: "Sayan Chatterjee",
    role: "Software Engineer & Sensei",
    kanji: "師",
    bio: "Guiding product architecture, clean frontend abstractions, and production deployment resilience.",
    github: "https://github.com/sayanChaterjee",
    linkedin: "https://www.linkedin.com/in/sayan-chatterjee-devch/",
  },
  {
    name: "Shatakshi Saha",
    role: "SDE & Mentor",
    kanji: "創",
    bio: "Specializing in intuitive UI/UX design systems, component reusability, and accessibility.",
    github: "https://github.com/ShatakshiSaha19",
    linkedin: "https://www.linkedin.com/in/shatakshisaha",
  },
  {
    name: "Ananya Ghosh",
    role: "SDE & Mentor",
    kanji: "基",
    bio: "Advising on state management, asynchronous data flows, and relational database integrity.",
    github: "https://github.com/Ananya9304",
    linkedin: "https://www.linkedin.com/in/ananya-ghosh-014b00290",
  },
  {
    name: "Ishita Mukherjee",
    role: "SDE & Mentor",
    kanji: "美",
    bio: "Focusing on visual refinement, responsive layouts, and performance optimization.",
    github: "https://github.com/Ishitamukherjee2004",
    linkedin: "https://www.linkedin.com/in/ishita-mukherjee/",
  },
  {
    name: "Md Kaif Sardar",
    role: "Full Stack Developer & Mentor",
    kanji: "知",
    bio: "Expertise in full-stack integrations, edge infrastructure, and student developer mentorship.",
    github: "https://github.com/MdKaifSardar/",
    linkedin: "https://www.linkedin.com/in/md-kaif-sardar-12aab4290/",
  },
] : [];

export const FAQS: FAQItem[] = process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true" ? [
  {
    id: "faq-1",
    category: "Auth & Privacy",
    question: "How does College Nexus verify that someone is an authentic KGEC student?",
    answer:
      "Students authenticate using their official institutional roll number format (e.g. 22/CSE/042). During onboarding, institutional email verification or CR authorization validates the cohort. External visitors or unverified public users cannot browse private student directories or listings.",
  },
  {
    id: "faq-2",
    category: "Auth & Privacy",
    question: "Are personal student telephone numbers or emails displayed publicly?",
    answer:
      "Never. College Nexus operates with zero telephone number exposure. In the Marketplace and Lost & Found modules, student identities are displayed as anonymized aliases (e.g. 'Roll 22/**/042'). In-app communication requests must be explicitly approved before any direct contact is established.",
  },
  {
    id: "faq-3",
    category: "Campus Vault",
    question: "How does the cryptographic SHA-256 duplicate rejection work in the Vault?",
    answer:
      "When a student or CR uploads a PDF or document, the client-side pre-flight computes a SHA-256 cryptographic hash of the file bytes. If the hash already matches an existing uploaded document, the upload is instantly blocked with a link to the existing copy, preventing redundant duplicate files.",
  },
  {
    id: "faq-4",
    category: "Lost & Found",
    question: "How does the Lost & Found Private Claim workflow prevent fraudulent claims?",
    answer:
      "Finders list items with hidden verification clues (e.g., sticker patterns on scientific calculators, engravings, or keychains). When a student requests to claim an item, they must answer a private verification prompt describing the unique marks. The finder inspects the description before approving an in-person handoff.",
  },
  {
    id: "faq-5",
    category: "Marketplace",
    question: "Does College Nexus charge any commission or fees on student equipment sales?",
    answer:
      "Zero commission, zero transaction fees. College Nexus is strictly a peer-to-peer campus notice and discovery board. All exchanges occur in-person (e.g. at the KGEC Main Canteen or Central Library) using direct cash or student UPI.",
  },
  {
    id: "faq-6",
    category: "Campus Vault",
    question: "Who can upload documents to the Campus Vault?",
    answer:
      "Any verified student can contribute study notes, past papers, or solutions. Class Representatives (CRs) and designated academic curators review contributions, awarding an official 'CR-Verified' seal to guaranteed accurate exam materials.",
  },
] : [];
