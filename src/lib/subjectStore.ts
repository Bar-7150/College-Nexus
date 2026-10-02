import { MOCK_VAULT_ITEMS, VaultItem } from "@/data/mockData";

export interface SubjectNode {
  department: "CSE" | "ECE" | "EE" | "ME" | "IT";
  semester: number;
  name: string;
  code: string;
  description: string;
}

export interface VaultResourceItem {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  department: "CSE" | "ECE" | "EE" | "ME" | "IT";
  semester: number;
  type: "Notes" | "PYQ" | "Syllabus";
  year: string;
  contributor: string;
  contributorRoll: string;
  verified: boolean;
  sha256?: string;
  downloads: number;
  pages: number;
  date: string;
  fileUrl?: string;
  status?: string;
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
  reportType?: "LOST" | "FOUND";
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

export const SEED_SUBJECTS: SubjectNode[] = [
  {
    department: "CSE",
    semester: 3,
    name: "Analog And Digital Electronics",
    code: "ESC 301",
    description: "Student-created subject workspace ready for notes, PYQs, and syllabus resources.",
  },
  {
    department: "CSE",
    semester: 3,
    name: "Computer Organization",
    code: "PCC-CS302",
    description: "Student-created subject workspace ready for notes, PYQs, and syllabus resources.",
  },
  {
    department: "CSE",
    semester: 5,
    name: "Computer Networks",
    code: "CS501",
    description: "OSI and TCP/IP protocol suites, network routing, switching, and socket programming notes.",
  },
  {
    department: "CSE",
    semester: 4,
    name: "Design & Analysis of Algorithms",
    code: "CS402",
    description: "Asymptotic notation, divide-and-conquer, greedy heuristics, dynamic programming, and graph algorithms.",
  },
  {
    department: "ECE",
    semester: 3,
    name: "Analog Electronic Circuits",
    code: "EC302",
    description: "BJT and MOSFET small-signal models, op-amp feedback systems, and frequency response analysis.",
  },
  {
    department: "EE",
    semester: 6,
    name: "Electric Power Systems",
    code: "EE601",
    description: "Transmission line parameters, power flow analysis, fault calculation, and grid stability.",
  },
  {
    department: "ME",
    semester: 4,
    name: "Fluid Mechanics",
    code: "ME401",
    description: "Continuity and Navier-Stokes equations, boundary layer theory, and dimensional analysis.",
  },
  {
    department: "IT",
    semester: 5,
    name: "Database Management Systems",
    code: "IT502",
    description: "Relational algebra, normal forms 1NF to BCNF, transaction management, and indexing strategies.",
  },
];

export const SEED_NOTICES: NoticeItem[] = [
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
    expiresIn: "Expires in 48 hours",
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
];

export const SEED_LOST_FOUND: LostFoundItem[] = [
  {
    id: "lf-1",
    itemName: "Casio fx-991EX ClassWiz Calculator",
    category: "Calculators",
    locationFound: "Drawing Hall 2, Desk #44",
    dateTime: "Today, 15:45 IST",
    finderAlias: "Kenshi_Guard_42",
    status: "Unclaimed",
    imageType: "calculator",
    hiddenClue: "Has a custom silver anime sticker on the slipcase backside",
    reportType: "FOUND",
  },
  {
    id: "lf-2",
    itemName: "Omega Mini-Drafter with 360° Proportional Scale",
    category: "Drafters",
    locationFound: "Mechanical Workshop Block, Hall B",
    dateTime: "Yesterday, 17:10 IST",
    finderAlias: "ME_Senior_88",
    status: "Pending Claim",
    imageType: "drafter",
    hiddenClue: "Engraved initials 'S.D.' in white marker near pivot knob",
    reportType: "FOUND",
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
    reportType: "FOUND",
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
    reportType: "FOUND",
  },
];

export const SEED_MARKETPLACE: MarketplaceItem[] = [
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
];

const SUBJECTS_KEY = "nexus_created_subjects";
const RESOURCES_KEY = "nexus_vault_resources";
const NOTICES_KEY = "nexus_campus_notices";
const LOST_FOUND_KEY = "nexus_lost_found";
const MARKETPLACE_KEY = "nexus_marketplace";

/* ================= SUBJECTS ================= */
export function getStoredSubjects(): SubjectNode[] {
  if (typeof window === "undefined") return SEED_SUBJECTS;
  try {
    const raw = window.localStorage.getItem(SUBJECTS_KEY);
    if (!raw) {
      window.localStorage.setItem(SUBJECTS_KEY, JSON.stringify(SEED_SUBJECTS));
      return SEED_SUBJECTS;
    }
    const parsed: any[] = JSON.parse(raw);
    const codeMap = new Map<string, SubjectNode>();
    
    SEED_SUBJECTS.forEach((s) => codeMap.set(s.code.toUpperCase(), s));
    parsed.forEach((s) => {
      if (s?.code && s?.name) {
        codeMap.set(s.code.toUpperCase(), {
          department: (s.department || "CSE").toUpperCase(),
          semester: Number(s.semester || 1),
          name: s.name,
          code: s.code.toUpperCase(),
          description: s.description || "",
        });
      }
    });

    return Array.from(codeMap.values());
  } catch {
    return SEED_SUBJECTS;
  }
}

export function saveSubject(subject: SubjectNode): SubjectNode[] {
  if (typeof window === "undefined") return SEED_SUBJECTS;
  const current = getStoredSubjects();
  const normalized: SubjectNode = {
    ...subject,
    code: subject.code.trim().toUpperCase(),
    department: subject.department.toUpperCase() as SubjectNode["department"],
    semester: Number(subject.semester || 1),
  };
  const filtered = current.filter((s) => s.code.toUpperCase() !== normalized.code);
  const updated = [normalized, ...filtered];
  try {
    window.localStorage.setItem(SUBJECTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("nexus_storage_updated"));
  } catch {}
  return updated;
}

export function findSubjectByCode(code: string): SubjectNode | undefined {
  const subjects = getStoredSubjects();
  const target = code.trim().toUpperCase().replace(/[-_ ]/g, "");
  return subjects.find((s) => s.code.toUpperCase().replace(/[-_ ]/g, "") === target);
}

/* ================= VAULT RESOURCES ================= */
export function getStoredResources(): VaultResourceItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RESOURCES_KEY);
    const parsed: VaultResourceItem[] = raw ? JSON.parse(raw) : [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveResource(resource: VaultResourceItem): VaultResourceItem[] {
  if (typeof window === "undefined") return [];
  const current = getStoredResources();
  const updated = [resource, ...current.filter((r) => r.id !== resource.id)];
  try {
    window.localStorage.setItem(RESOURCES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("nexus_storage_updated"));
  } catch {}
  return updated;
}

/* ================= NOTICES (ADMIN CAN ADD) ================= */
export function getStoredNotices(): NoticeItem[] {
  if (typeof window === "undefined") return SEED_NOTICES;
  try {
    const raw = window.localStorage.getItem(NOTICES_KEY);
    if (!raw) {
      window.localStorage.setItem(NOTICES_KEY, JSON.stringify(SEED_NOTICES));
      return SEED_NOTICES;
    }
    const parsed: NoticeItem[] = JSON.parse(raw);
    const map = new Map<string, NoticeItem>();
    SEED_NOTICES.forEach((n) => map.set(n.id, n));
    parsed.forEach((n) => map.set(n.id, n));
    return Array.from(map.values());
  } catch {
    return SEED_NOTICES;
  }
}

export function saveNotice(notice: NoticeItem): NoticeItem[] {
  if (typeof window === "undefined") return SEED_NOTICES;
  const current = getStoredNotices();
  const updated = [notice, ...current.filter((n) => n.id !== notice.id)];
  try {
    window.localStorage.setItem(NOTICES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("nexus_storage_updated"));
  } catch {}
  return updated;
}

export function deleteNotice(id: string): NoticeItem[] {
  if (typeof window === "undefined") return SEED_NOTICES;
  const current = getStoredNotices();
  const updated = current.filter((n) => n.id !== id);
  try {
    window.localStorage.setItem(NOTICES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("nexus_storage_updated"));
  } catch {}
  return updated;
}

/* ================= LOST & FOUND (ANYONE CAN ADD) ================= */
export function getStoredLostFound(): LostFoundItem[] {
  if (typeof window === "undefined") return SEED_LOST_FOUND;
  try {
    const raw = window.localStorage.getItem(LOST_FOUND_KEY);
    if (!raw) {
      window.localStorage.setItem(LOST_FOUND_KEY, JSON.stringify(SEED_LOST_FOUND));
      return SEED_LOST_FOUND;
    }
    const parsed: LostFoundItem[] = JSON.parse(raw);
    const map = new Map<string, LostFoundItem>();
    SEED_LOST_FOUND.forEach((item) => map.set(item.id, item));
    parsed.forEach((item) => map.set(item.id, item));
    return Array.from(map.values());
  } catch {
    return SEED_LOST_FOUND;
  }
}

export function saveLostFound(item: LostFoundItem): LostFoundItem[] {
  if (typeof window === "undefined") return SEED_LOST_FOUND;
  const current = getStoredLostFound();
  const updated = [item, ...current.filter((i) => i.id !== item.id)];
  try {
    window.localStorage.setItem(LOST_FOUND_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("nexus_storage_updated"));
  } catch {}
  return updated;
}

export function deleteLostFound(id: string): LostFoundItem[] {
  if (typeof window === "undefined") return SEED_LOST_FOUND;
  const current = getStoredLostFound();
  const updated = current.filter((i) => i.id !== id);
  try {
    window.localStorage.setItem(LOST_FOUND_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("nexus_storage_updated"));
  } catch {}
  return updated;
}

/* ================= MARKETPLACE (EVERYONE CAN ADD) ================= */
export function getStoredMarketplace(): MarketplaceItem[] {
  if (typeof window === "undefined") return SEED_MARKETPLACE;
  try {
    const raw = window.localStorage.getItem(MARKETPLACE_KEY);
    if (!raw) {
      window.localStorage.setItem(MARKETPLACE_KEY, JSON.stringify(SEED_MARKETPLACE));
      return SEED_MARKETPLACE;
    }
    const parsed: MarketplaceItem[] = JSON.parse(raw);
    const map = new Map<string, MarketplaceItem>();
    SEED_MARKETPLACE.forEach((item) => map.set(item.id, item));
    parsed.forEach((item) => map.set(item.id, item));
    return Array.from(map.values());
  } catch {
    return SEED_MARKETPLACE;
  }
}

export function saveMarketplace(item: MarketplaceItem): MarketplaceItem[] {
  if (typeof window === "undefined") return SEED_MARKETPLACE;
  const current = getStoredMarketplace();
  const updated = [item, ...current.filter((i) => i.id !== item.id)];
  try {
    window.localStorage.setItem(MARKETPLACE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("nexus_storage_updated"));
  } catch {}
  return updated;
}

export function deleteMarketplace(id: string): MarketplaceItem[] {
  if (typeof window === "undefined") return SEED_MARKETPLACE;
  const current = getStoredMarketplace();
  const updated = current.filter((i) => i.id !== id);
  try {
    window.localStorage.setItem(MARKETPLACE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("nexus_storage_updated"));
  } catch {}
  return updated;
}
