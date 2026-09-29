export interface CommunityMember {
  id: string;
  name: string;
  roll: string;
  avatar: string;
  dept: string;
  year: string;
  role: "Lead" | "CR" | "Core Member" | "Member" | "Moderator";
}

export interface CommunityResource {
  id: string;
  title: string;
  type: "pdf" | "link" | "doc" | "repo";
  description: string;
  url: string;
  sizeOrDetails: string;
  addedBy: string;
  date: string;
  downloads?: number;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorRoll: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  likes: number;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRoll: string;
  authorAvatar: string;
  authorBadge?: string;
  timeAgo: string;
  content: string;
  tag?: string;
  channel: string;
  likes: number;
  userLiked: boolean;
  replies: CommunityComment[];
  pinned?: boolean;
}

export interface CommunityAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  issuer: string;
  issuerRole: string;
  severity: "urgent" | "info" | "event";
}

export interface Community {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: "Batch" | "Tech" | "Campus" | "Clubs" | "Department";
  memberCount: number;
  activeCount: number;
  isVerified: boolean;
  isPrivate: boolean; // e.g. Roll number verified required
  isJoined: boolean;
  tags: string[];
  bannerGradient: string;
  themeColor: string;
  emblem: string;
  lead: {
    name: string;
    role: string;
    roll: string;
    avatar: string;
  };
  announcements: CommunityAnnouncement[];
  channels: { id: string; name: string; description: string }[];
  posts: CommunityPost[];
  resources: CommunityResource[];
  rules: string[];
}

export const INITIAL_COMMUNITIES: Community[] = [
  {
    id: "batch-2025-2029",
    name: "Batch 2025-2029",
    shortName: "Batch '29",
    tagline: "Official Cohort for Incoming Freshers & 1st Year Engineers",
    description:
      "The designated official collegiate hub for the incoming 2025-2029 engineering cohort at Kalyani Government Engineering College. Covering all 5 engineering branches (CSE, ECE, EE, ME, IT) and MCA freshers. Access official academic timetables, induction notifications, hostel 1 & 2 guidelines, MAKAUT syllabus PDFs, and direct peer mentorship from senior CRs.",
    category: "Batch",
    memberCount: 528,
    activeCount: 94,
    isVerified: true,
    isPrivate: false,
    isJoined: true,
    tags: ["Freshers", "1st Year", "Class Schedules", "Hostels 1 & 2", "MAKAUT 2025"],
    bannerGradient: "from-blue-600 via-indigo-600 to-violet-800",
    themeColor: "indigo",
    emblem: "🎓",
    lead: {
      name: "Rohan Mukherjee",
      role: "Batch General Secretary / CR Coordinator",
      roll: "25/CSE/012",
      avatar: "RM",
    },
    announcements: [
      {
        id: "ann-29-1",
        title: "Official Induction Programme & Document Verification Schedule",
        content:
          "All newly admitted students of Batch 2025-2029 must report to Vidyasagar Sabhagriha (Main Auditorium) with original WBJEE rank cards, allotment slips, and 4 passport photographs.",
        date: "Today, 10:30 AM",
        issuer: "Prof. S. Sengupta (Dean of Students)",
        issuerRole: "Dean's Secretariat",
        severity: "urgent",
      },
      {
        id: "ann-29-2",
        title: "Hostel 1 & 2 Room Allotment Matrix Published",
        content:
          "The first phase of hostel room allocations for outstation 1st-year candidates is now finalized. Check the room allocation PDF in the resources tab.",
        date: "Yesterday",
        issuer: "Hostel Affairs Committee",
        issuerRole: "Warden Office",
        severity: "info",
      },
    ],
    channels: [
      { id: "general", name: "#general-chat", description: "Campus chatter, introductions & questions" },
      { id: "announcements", name: "#announcements", description: "Verified notices from Dean & Batch CRs" },
      { id: "academics", name: "#notes-and-pyqs", description: "Physics, Math-I, Basic Electrical & Graphics" },
      { id: "hostel", name: "#hostel-life", description: "Hostel 1 & 2 queries, mess schedules & laundry" },
    ],
    posts: [
      {
        id: "post-29-1",
        authorName: "Rohan Mukherjee",
        authorRoll: "25/CSE/012",
        authorAvatar: "RM",
        authorBadge: "Batch CR",
        timeAgo: "2 hours ago",
        content:
          "Welcome to KGEC everyone! 🌟 Make sure you download the standard MAKAUT 1st-semester engineering physics & calculus syllabus from the resources tab. We also uploaded the workshop manual and drafter safety guidelines.",
        tag: "Welcome & Syllabus",
        channel: "#general-chat",
        likes: 42,
        userLiked: true,
        replies: [
          {
            id: "c-29-1",
            authorName: "Sneha Roy",
            authorRoll: "25/ECE/041",
            authorAvatar: "SR",
            timeAgo: "1 hour ago",
            content: "Thanks Rohan! When will the engineering drawing instruments (mini drafter) be needed for workshop?",
            likes: 6,
          },
          {
            id: "c-29-2",
            authorName: "Arjun Sen",
            authorRoll: "22/CSE/042",
            authorAvatar: "AS",
            timeAgo: "45 mins ago",
            content: "Hey freshers! Senior here. You'll need drafters by Week 2 for Graphics Lab. You can also pick second-hand ones from the Nexus Marketplace tab at 70% off.",
            likes: 18,
          },
        ],
      },
      {
        id: "post-29-2",
        authorName: "Debjit Das",
        authorRoll: "25/ME/028",
        authorAvatar: "DD",
        authorBadge: "Hostel 1",
        timeAgo: "5 hours ago",
        content:
          "Anyone traveling from Sealdah to Kalyani Main on Monday morning? We are taking the 8:14 AM Shantipur Local together in Compartment 3. Drop a reply if you want to join the group!",
        tag: "Transit Group",
        channel: "#general-chat",
        likes: 19,
        userLiked: false,
        replies: [
          {
            id: "c-29-3",
            authorName: "Tanmoy Pal",
            authorRoll: "25/IT/019",
            authorAvatar: "TP",
            timeAgo: "3 hours ago",
            content: "Count me in! I'll board from Barrackpore station.",
            likes: 3,
          },
        ],
      },
      {
        id: "post-29-3",
        authorName: "Ananya Ghosh",
        authorRoll: "25/EE/008",
        authorAvatar: "AG",
        timeAgo: "1 day ago",
        content:
          "Where can we find the previous 5 years' question papers for BS-M101 (Calculus & Linear Algebra)?",
        tag: "Academics",
        channel: "#notes-and-pyqs",
        likes: 27,
        userLiked: false,
        replies: [
          {
            id: "c-29-4",
            authorName: "Rohan Mukherjee",
            authorRoll: "25/CSE/012",
            authorAvatar: "RM",
            timeAgo: "1 day ago",
            content: "Check the Nexus Vault tab at the top of the site — search 'BS-M101'. All MAKAUT PYQs from 2019-2024 are verified and indexed!",
            likes: 12,
          },
        ],
      },
    ],
    resources: [
      {
        id: "res-29-1",
        title: "MAKAUT 1st Year Universal Syllabus & Lab Manual",
        type: "pdf",
        description: "Official MAKAUT regulation curriculum for all 5 branches covering semester 1 & 2.",
        url: "#",
        sizeOrDetails: "4.8 MB PDF • MAKAUT Exam Cell",
        addedBy: "CR Council",
        date: "Aug 2025",
        downloads: 412,
      },
      {
        id: "res-29-2",
        title: "Freshers Survival Guide 2025-2029 (Campus Map & Contacts)",
        type: "doc",
        description: "Library card process, canteen timings, local dispensary, and railway timing cheatsheet.",
        url: "#",
        sizeOrDetails: "12 Pages • KGEC Student Welfare",
        addedBy: "Dean's Student Council",
        date: "Sep 2025",
        downloads: 380,
      },
      {
        id: "res-29-3",
        title: "Engineering Mechanics & Workshop Safety Guidelines",
        type: "pdf",
        description: "Mandatory protective gear, lathe machine safety protocols, and lab reporting format.",
        url: "#",
        sizeOrDetails: "2.1 MB PDF • Mechanical Dept",
        addedBy: "Prof. B. Roy",
        date: "Sep 2025",
        downloads: 295,
      },
    ],
    rules: [
      "Be respectful to all batchmates, CRs, and seniors.",
      "No spam or unsolicited third-party promotions.",
      "Academic queries and hostel safety announcements only.",
      "Verify all notices against the official college circulars.",
    ],
  },
  {
    id: "dev-community",
    name: "Dev Community",
    shortName: "DC KGEC",
    tagline: "The Official Tech & Open-Source Engineering Guild of KGEC",
    description:
      "Developers Community KGEC (DC KGEC) is the premier collegiate technical organization dedicated to fostering high-impact open-source software, competitive programming, AI/ML research, cloud systems, and hackathon teams. Creators of College Nexus, host of Journey to Mastery, and home to national hackathon winners.",
    category: "Tech",
    memberCount: 1420,
    activeCount: 195,
    isVerified: true,
    isPrivate: false,
    isJoined: true,
    tags: ["Open Source", "Next.js", "Hackathons", "CP", "AI/ML", "DevOps", "College Nexus"],
    bannerGradient: "from-red-600 via-rose-700 to-amber-700",
    themeColor: "red",
    emblem: "💻",
    lead: {
      name: "Sagnik Datta",
      role: "Lead Tech Architect & Open Source Coordinator",
      roll: "22/CSE/004",
      avatar: "SD",
    },
    announcements: [
      {
        id: "ann-dc-1",
        title: "Journey to Mastery 2026 Hackathon Submissions Open!",
        content:
          "The flagship 28-day buildathon enters Sprint 3. Submit your pull requests to the College Nexus repo or Web3 tracking dashboards by Friday midnight.",
        date: "Today, 09:00 AM",
        issuer: "DC KGEC Core Committee",
        issuerRole: "Hackathon Leads",
        severity: "urgent",
      },
      {
        id: "ann-dc-2",
        title: "Weekly Tech Talk: Building Distributed Systems with Golang & Redis",
        content:
          "Join us this Saturday at 6:00 PM on Google Meet for an interactive masterclass by KGEC Alum (SDE II @ Razorpay).",
        date: "2 days ago",
        issuer: "Workshops Wing",
        issuerRole: "DC Outreach",
        severity: "event",
      },
    ],
    channels: [
      { id: "general", name: "#general-dev", description: "Tech banter, news, tools & career chatter" },
      { id: "nexus-build", name: "#contribute-nexus", description: "College Nexus architecture, issues & PRs" },
      { id: "hackathons", name: "#hackathon-squads", description: "Team formations for SIH, EthIndia & Devfolio" },
      { id: "cp-dsa", name: "#cp-and-leetcode", description: "Codeforces contests, problem editorial breakdowns" },
      { id: "showcase", name: "#project-showcase", description: "Demos of side-projects, SaaS tools & mobile apps" },
    ],
    posts: [
      {
        id: "post-dc-1",
        authorName: "Sagnik Datta",
        authorRoll: "22/CSE/004",
        authorAvatar: "SD",
        authorBadge: "Lead Organizer",
        timeAgo: "3 hours ago",
        content:
          "College Nexus Intranet v2.1 is now officially staging! We just added the new dedicated Community module with cohort-specific hubs, interactive discussions, and study resource drives. Check out the pull request and test it out! 🚀",
        tag: "Nexus Release",
        channel: "#contribute-nexus",
        likes: 67,
        userLiked: true,
        replies: [
          {
            id: "c-dc-1",
            authorName: "Priya Sharma",
            authorRoll: "23/IT/014",
            authorAvatar: "PS",
            timeAgo: "2 hours ago",
            content: "The UI looks exceptionally slick! Love the collegiate styling with the Zilla Slab headings.",
            likes: 14,
          },
          {
            id: "c-dc-2",
            authorName: "Subhashis Roy",
            authorRoll: "24/CSE/031",
            authorAvatar: "SR",
            timeAgo: "1 hour ago",
            content: "Testing the real-time join states now. Smooth interactions!",
            likes: 8,
          },
        ],
      },
      {
        id: "post-dc-2",
        authorName: "Aranya Ray",
        authorRoll: "23/ECE/022",
        authorAvatar: "AR",
        authorBadge: "Hackathon Winner",
        timeAgo: "6 hours ago",
        content:
          "Looking for 1 frontend developer (Tailwind/Next.js) and 1 ML engineer for Smart India Hackathon (SIH 2026) Problem Statement #1480 (AI Crop Disease Diagnostic Intranet). We have our backend architecture ready.",
        tag: "Team Formation",
        channel: "#hackathon-squads",
        likes: 31,
        userLiked: false,
        replies: [
          {
            id: "c-dc-3",
            authorName: "Koustav Mondal",
            authorRoll: "24/IT/009",
            authorAvatar: "KM",
            timeAgo: "4 hours ago",
            content: "Interested! I've shipped two PyTorch computer vision apps. Sent you a DM on Nexus Messages.",
            likes: 5,
          },
        ],
      },
    ],
    resources: [
      {
        id: "res-dc-1",
        title: "College Nexus Core Architecture & GitHub Repository",
        type: "repo",
        description: "Official GitHub source code for the College Nexus Intranet PWA platform.",
        url: "https://github.com/Bar-7150/College-Nexus",
        sizeOrDetails: "Next.js 14 • TypeScript • Tailwind",
        addedBy: "DC Core Team",
        date: "Updated Today",
        downloads: 890,
      },
      {
        id: "res-dc-2",
        title: "Competitive Programming & DSA Roadmap (C++ & Striver)",
        type: "doc",
        description: "Curated problem sheet from 800 to 1900 rating on Codeforces with topic-wise tutorials.",
        url: "#",
        sizeOrDetails: "Curated Sheet • 450 Problems",
        addedBy: "CP Wing Leads",
        date: "Jan 2026",
        downloads: 1240,
      },
      {
        id: "res-dc-3",
        title: "Full-Stack Web3 & React Interview Handbooks",
        type: "pdf",
        description: "Comprehensive notes on event loops, React reconciler, database indexing, and system design.",
        url: "#",
        sizeOrDetails: "140 Pages PDF",
        addedBy: "Alumni SDEs",
        date: "Dec 2025",
        downloads: 980,
      },
    ],
    rules: [
      "Keep technical discussions constructive, respectful, and well-documented.",
      "When asking for code debugging, share minimal reproducible code or GitHub Gist.",
      "No piracy of paid courses; encourage open educational resources.",
      "Respect intellectual property and maintain open source spirit.",
    ],
  },
  {
    id: "kgecians",
    name: "KGECians",
    shortName: "KGECians Official",
    tagline: "The Central All-Campus Hub: Connecting Students, CRs, Clubs & Alumni",
    description:
      "The undisputed digital quadrangle of Kalyani Government Engineering College. Connecting current engineering undergrads across all batches, postgrads, faculty representatives, club heads, and illustrious alumni across the globe. From cultural fest teasers (Espektro) to sports tournaments, hostel gossip, canteen reviews, and campus survival stories.",
    category: "Campus",
    memberCount: 4380,
    activeCount: 342,
    isVerified: true,
    isPrivate: false,
    isJoined: true,
    tags: ["Campus Life", "Espektro Fest", "Hostel Affairs", "Sports Meet", "Alumni", "Canteen"],
    bannerGradient: "from-amber-600 via-orange-600 to-red-700",
    themeColor: "amber",
    emblem: "🏛️",
    lead: {
      name: "Debayan Bhattacharya",
      role: "Student Council Convener & General Secretary",
      roll: "22/ME/018",
      avatar: "DB",
    },
    announcements: [
      {
        id: "ann-kg-1",
        title: "Espektro 2026: Official Theme Reveal & Core Volunteer Signups",
        content:
          "Eastern India's largest collegiate annual cultural fest is kicking off in November! Sign up for stage management, graphic design, artist hospitality, and logistics.",
        date: "Yesterday, 04:15 PM",
        issuer: "Fest Steering Committee",
        issuerRole: "General Secretary",
        severity: "event",
      },
      {
        id: "ann-kg-2",
        title: "Central Library Extended Reading Room Hours for Mid-Terms",
        content:
          "By order of the Principal, the Central Library air-conditioned reading hall will stay accessible until 10:00 PM starting this Monday.",
        date: "3 days ago",
        issuer: "Library Advisory Board",
        issuerRole: "Chief Librarian",
        severity: "info",
      },
    ],
    channels: [
      { id: "quadrangle", name: "#campus-pulse", description: "General student discussions, opinions & banter" },
      { id: "espektro", name: "#espektro-cultural-fest", description: "Band nights, EDM, fashion shows & auditions" },
      { id: "sports", name: "#sports-and-tournaments", description: "Inter-departmental cricket, football, chess & table tennis" },
      { id: "alumni", name: "#alumni-connect", description: "Guidance from KGEC graduates at Google, Microsoft, ISRO, PSU" },
    ],
    posts: [
      {
        id: "post-kg-1",
        authorName: "Debayan Bhattacharya",
        authorRoll: "22/ME/018",
        authorAvatar: "DB",
        authorBadge: "GS Cultural",
        timeAgo: "4 hours ago",
        content:
          "Huge congratulations to our KGEC Inter-College Football Squad! 🏆 We defeated Heritage Institute 2-1 in the MAKAUT Inter-Collegiate Finals. Match highlights and award photos are posted in #sports-and-tournaments!",
        tag: "Sports Victory",
        channel: "#sports-and-tournaments",
        likes: 148,
        userLiked: true,
        replies: [
          {
            id: "c-kg-1",
            authorName: "Arkaprava Ghosh",
            authorRoll: "23/EE/045",
            authorAvatar: "AG",
            timeAgo: "3 hours ago",
            content: "What a match! Sourav's header in the 88th minute was pure masterclass!",
            likes: 24,
          },
          {
            id: "c-kg-2",
            authorName: "Sayani Das",
            authorRoll: "24/ECE/015",
            authorAvatar: "SD",
            timeAgo: "2 hours ago",
            content: "KGEC Pride! Celebration at the campus cafeteria today at 5 PM! 🎉",
            likes: 19,
          },
        ],
      },
      {
        id: "post-kg-2",
        authorName: "Aritra Sen",
        authorRoll: "23/CSE/029",
        authorAvatar: "AS",
        timeAgo: "8 hours ago",
        content:
          "Friendly reminder for anyone studying in the Mechanical Block — the water purifier on the 2nd floor has been serviced and is fully operational now. Shoutout to maintenance staff!",
        tag: "Campus Update",
        channel: "#campus-pulse",
        likes: 53,
        userLiked: false,
        replies: [],
      },
      {
        id: "post-kg-3",
        authorName: "Dr. Aniruddha Roy (Alum '16)",
        authorRoll: "Alumni / Senior Staff Engineer",
        authorAvatar: "AR",
        authorBadge: "KGEC Alumni",
        timeAgo: "1 day ago",
        content:
          "Always proud to see the energy on the KGEC campus! Happy to conduct mock interviews for final-year and pre-final year students gearing up for upcoming campus placement drives.",
        tag: "Mentorship",
        channel: "#alumni-connect",
        likes: 112,
        userLiked: true,
        replies: [
          {
            id: "c-kg-3",
            authorName: "Pritam Pal",
            authorRoll: "23/IT/038",
            authorAvatar: "PP",
            timeAgo: "20 hours ago",
            content: "Thank you Sir! Would love guidance on backend systems design rounds.",
            likes: 11,
          },
        ],
      },
    ],
    resources: [
      {
        id: "res-kg-1",
        title: "KGEC Campus Map & Emergency Telephone Directory",
        type: "pdf",
        description: "Official contacts for Principal office, HODs, Medical Officer, Security Gate, and Police Station.",
        url: "#",
        sizeOrDetails: "1.2 MB PDF • Registrar Office",
        addedBy: "Student Affairs",
        date: "Jan 2026",
        downloads: 1820,
      },
      {
        id: "res-kg-2",
        title: "Espektro Legacy Archive & Cultural Rulebook",
        type: "doc",
        description: "Rules for Western Band, Street Play, Classical Solo, Debate, and Robotics Combat.",
        url: "#",
        sizeOrDetails: "Official Fest Committee Archive",
        addedBy: "Espektro 2026 Core",
        date: "Feb 2026",
        downloads: 640,
      },
    ],
    rules: [
      "Maintain the dignity of the KGEC campus and its community members.",
      "Strict zero-tolerance policy against any form of ragging, harassment, or political intimidation.",
      "All event organizers must obtain formal sanction from the Student Welfare Committee before posting fund drives.",
    ],
  },
  {
    id: "batch-2024-2028",
    name: "Batch 2024-2028",
    shortName: "Batch '28",
    tagline: "Sophomore Engineering Guild: Departmental Core & Internships Prep",
    description:
      "Home to the 2nd-year engineers navigating Data Structures & Algorithms, Analog Electronics, Thermodynamics, Circuit Theory, and preparatory rounds for 3rd-year summer internship drives.",
    category: "Batch",
    memberCount: 495,
    activeCount: 68,
    isVerified: true,
    isPrivate: false,
    isJoined: false,
    tags: ["2nd Year", "Data Structures", "Departmental Labs", "Semester 3 & 4"],
    bannerGradient: "from-emerald-600 via-teal-700 to-cyan-800",
    themeColor: "emerald",
    emblem: "⚡",
    lead: {
      name: "Tathagata Sen",
      role: "Batch Representative",
      roll: "24/ECE/018",
      avatar: "TS",
    },
    announcements: [
      {
        id: "ann-28-1",
        title: "Semester 3 Mid-Term Practical Exam Schedule Released",
        content: "Analog Electronics & Data Structures lab assessments commence next Thursday.",
        date: "2 days ago",
        issuer: "Dept Examination Committee",
        issuerRole: "Examination Office",
        severity: "urgent",
      },
    ],
    channels: [
      { id: "general", name: "#general-chat", description: "2nd-year discussions & notes exchange" },
      { id: "internships", name: "#internship-prep", description: "Resume building, DSA sheets & cold emailing" },
      { id: "labs", name: "#lab-manuals", description: "Lab reports, breadboard simulations & oscilloscopes" },
    ],
    posts: [
      {
        id: "post-28-1",
        authorName: "Tathagata Sen",
        authorRoll: "24/ECE/018",
        authorAvatar: "TS",
        authorBadge: "Batch CR",
        timeAgo: "5 hours ago",
        content: "Guys, Analog Circuits Lab assignment 4 write-up has been submitted to Sir. Make sure to get your breadboard circuits signed before 4 PM!",
        channel: "#lab-manuals",
        likes: 22,
        userLiked: false,
        replies: [],
      },
    ],
    resources: [
      {
        id: "res-28-1",
        title: "Data Structures & Algorithms in C/C++ Solved Questions",
        type: "pdf",
        description: "Trees, Graphs, Dynamic Programming & Linked Lists with MAKAUT PYQs.",
        url: "#",
        sizeOrDetails: "6.2 MB PDF",
        addedBy: "CSE/IT Faculty",
        date: "2025",
        downloads: 580,
      },
    ],
    rules: ["Batch members only", "Focus on academic and career development"],
  },
  {
    id: "robocell-kgec",
    name: "RoboCell KGEC",
    shortName: "RoboCell",
    tagline: "Robotics, Embedded Systems, Autonomous Rovers & Drone Society",
    description:
      "The premier hardware innovation hub at KGEC. We design combat robots for IIT techfests (RoboWars), develop autonomous line followers, build quadcopter drones, and experiment with Arduino, ESP32, and ROS2.",
    category: "Clubs",
    memberCount: 680,
    activeCount: 72,
    isVerified: true,
    isPrivate: false,
    isJoined: false,
    tags: ["Robotics", "IoT", "Arduino", "ROS2", "RoboWars", "Embedded"],
    bannerGradient: "from-cyan-600 via-blue-700 to-slate-900",
    themeColor: "cyan",
    emblem: "🤖",
    lead: {
      name: "Ayan Karmakar",
      role: "RoboCell President",
      roll: "22/EE/009",
      avatar: "AK",
    },
    announcements: [
      {
        id: "ann-robo-1",
        title: "Hands-on Workshop: Microcontroller Interfacing & PCB Design",
        content: "Learn KiCad PCB routing and motor driver calibration this Sunday at Electrical Annex.",
        date: "3 days ago",
        issuer: "Technical Directorate",
        issuerRole: "RoboCell Core",
        severity: "event",
      },
    ],
    channels: [
      { id: "general", name: "#general-robotics", description: "Hardware banter, components sourcing & circuit review" },
      { id: "combat", name: "#combat-robotics", description: "RoboWars 15kg & 30kg chassis design and pneumatic weapons" },
      { id: "drones", name: "#drones-and-iot", description: "Flight controllers, telemetry & sensor integration" },
    ],
    posts: [
      {
        id: "post-robo-1",
        authorName: "Ayan Karmakar",
        authorRoll: "22/EE/009",
        authorAvatar: "AK",
        authorBadge: "Club Lead",
        timeAgo: "1 day ago",
        content: "New 12V LiPo battery packs and N20 gear motors just arrived in the Robotics Lab. Team members participating in Kshitij (IIT KGP) can collect components from 4 PM onwards.",
        channel: "#general-robotics",
        likes: 38,
        userLiked: false,
        replies: [],
      },
    ],
    resources: [
      {
        id: "res-robo-1",
        title: "Beginner's Guide to Arduino & Motor Drivers",
        type: "pdf",
        description: "PWM control, H-Bridge L298N circuits, and sensor integration schematics.",
        url: "#",
        sizeOrDetails: "3.4 MB PDF",
        addedBy: "RoboCell Mentors",
        date: "2025",
        downloads: 410,
      },
    ],
    rules: ["Adhere to workshop safety protocols", "Return all borrowing tools to inventory"],
  },
  {
    id: "cp-kgec",
    name: "Competitive Programmers Guild",
    shortName: "CP Guild",
    tagline: "Codeforces, AtCoder, LeetCode & ICPC Regional Aspirants",
    description:
      "A dedicated algorithmic circle for problem solvers striving for Candidate Master & Master on Codeforces. Weekly post-contest editorial discussions, speed drill sessions, and ICPC prelims mocks.",
    category: "Tech",
    memberCount: 890,
    activeCount: 110,
    isVerified: true,
    isPrivate: false,
    isJoined: false,
    tags: ["Codeforces", "ICPC", "Algorithms", "Graph Theory", "Dynamic Programming"],
    bannerGradient: "from-purple-600 via-violet-700 to-indigo-900",
    themeColor: "purple",
    emblem: "⚡",
    lead: {
      name: "Sourish Mukherjee",
      role: "Guild Lead (CF 1950+)",
      roll: "23/CSE/011",
      avatar: "SM",
    },
    announcements: [
      {
        id: "ann-cp-1",
        title: "Weekly Div. 2 Mock Contest Editorial Stream",
        content: "Analyzing Problem D & E from Codeforces Round 998 on Discord tonight at 9:30 PM.",
        date: "Yesterday",
        issuer: "CP Problemsetting Cell",
        issuerRole: "Editorial Lead",
        severity: "event",
      },
    ],
    channels: [
      { id: "general", name: "#daily-problems", description: "PotD solutions and optimization tricks" },
      { id: "editorials", name: "#contest-editorials", description: "In-depth breakdowns of CF/AtCoder matches" },
      { id: "icpc", name: "#icpc-training", description: "3-person team strategy, fast typing & template libraries" },
    ],
    posts: [
      {
        id: "post-cp-1",
        authorName: "Sourish Mukherjee",
        authorRoll: "23/CSE/011",
        authorAvatar: "SM",
        authorBadge: "Candidate Master",
        timeAgo: "6 hours ago",
        content: "Today's LeetCode Daily Challenge on Tree Dynamic Programming had a neat O(N) rerooting trick. Wrote a quick tutorial in the channel for anyone struggling with O(N^2) TLE!",
        channel: "#daily-problems",
        likes: 45,
        userLiked: true,
        replies: [],
      },
    ],
    resources: [
      {
        id: "res-cp-1",
        title: "Standard C++ Competitive Programming Snippet Template",
        type: "repo",
        description: "Fast I/O, Segment Trees with Lazy Propagation, Trie, and DSU templates.",
        url: "#",
        sizeOrDetails: "GitHub Repository",
        addedBy: "Sourish",
        date: "2026",
        downloads: 730,
      },
    ],
    rules: ["No plagiarism during live contests", "Explain the intuition when sharing code"],
  },
];
