export interface JobStatusInfo {
  status: "Actively Looking" | "Open to Offers" | "Interning" | "Placed" | "Researching";
  targetRoles: string[];
  preferredLocations: string[];
  jobTypes: ("Full-time" | "Internship" | "Part-time" | "Research")[];
  startDate: string;
  customNote?: string;
  isOpenToWork: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
  activities?: string;
  description?: string;
  logoColor?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  employmentType: "Full-time" | "Internship" | "Part-time" | "Freelance" | "Campus Leadership";
  location: string;
  locationType: "On-site" | "Hybrid" | "Remote";
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  skills: string[];
  companyLogoBg?: string;
}

export interface ReactionCounts {
  like: number;
  celebrate: number;
  insightful: number;
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorRoll: string;
  authorAvatar: string;
  authorHeadline: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface AchievementPost {
  id: string;
  authorId: string;
  authorName: string;
  authorHeadline: string;
  authorAvatar: string;
  authorDept: "CSE" | "ECE" | "EE" | "ME" | "IT";
  authorRoll: string;
  timestamp: string;
  category: "Hackathon" | "Internship" | "Research" | "Academic" | "Certification" | "Project";
  badgeText: string;
  title: string;
  content: string;
  tags: string[];
  reactions: ReactionCounts;
  userReaction?: "like" | "celebrate" | "insightful" | null;
  comments: CommentItem[];
  shares: number;
  mediaUrl?: string;
  mediaType?: "image" | "certificate";
}

export interface SkillItem {
  id: string;
  name: string;
  category: "Core Engineering" | "Web & Cloud" | "Languages & Tools" | "AI & Systems" | "Hardware & Embedded";
  endorsements: number;
  hasEndorsed?: boolean;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingOrg: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  rollNumber: string;
  department: "CSE" | "ECE" | "EE" | "ME" | "IT";
  batchYear: string;
  semester: number;
  headline: string;
  pronouns: string;
  location: string;
  avatarText: string;
  avatarBg: string;
  bannerGradient: string;
  jobStatus: JobStatusInfo;
  about: string;
  connectionCount: number;
  followerCount: number;
  mutualConnections: { name: string; avatar: string }[];
  connectionStatus: "self" | "connected" | "pending" | "received" | "none";
  education: EducationItem[];
  experience: ExperienceItem[];
  achievements: AchievementPost[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  stats: {
    profileViews: number;
    postImpressions: number;
    searchAppearances: number;
  };
}

export interface ConnectionRequestItem {
  id: string;
  senderId: string;
  senderName: string;
  senderHeadline: string;
  senderAvatar: string;
  senderAvatarBg: string;
  senderDept: string;
  senderRoll: string;
  timestamp: string;
  mutualCount: number;
  note?: string;
}

export const INITIAL_PROFILES: StudentProfile[] = [
  {
    id: "arjun-sen",
    name: "Arjun Sen",
    rollNumber: "22/CSE/042",
    department: "CSE",
    batchYear: "2022 - 2026 (3rd Year)",
    semester: 6,
    headline: "Full-Stack Engineer & Cloud Enthusiast | 3rd Year CSE @ KGEC | Smart India Hackathon '25 Finalist | Ex-Winter Intern @ TCS iON",
    pronouns: "He/Him",
    location: "Kalyani, West Bengal, India",
    avatarText: "AS",
    avatarBg: "from-blue-600 to-indigo-700",
    bannerGradient: "from-slate-900 via-indigo-950 to-red-950",
    jobStatus: {
      status: "Actively Looking",
      isOpenToWork: true,
      targetRoles: ["Software Development Engineer (SDE)", "Full Stack Developer", "Cloud Solutions Intern"],
      preferredLocations: ["Bengaluru", "Kolkata", "Remote", "Hyderabad"],
      jobTypes: ["Internship", "Full-time"],
      startDate: "Summer 2026 / 6-Month Jan 2027",
      customNote: "Available for 2-month summer internship and 6-month placement sem internships. Strong in Next.js, Go, PostgreSQL & Docker.",
    },
    about: "Passionate Computer Science undergraduate at Kalyani Government Engineering College with a strong foundation in distributed systems, modern full-stack web architectures, and algorithms. Winner of 3 inter-college hackathons and active core member of Developers Community KGEC. Love building low-latency systems and developer tools for campus communities.",
    connectionCount: 486,
    followerCount: 1240,
    mutualConnections: [
      { name: "Priya Sharma", avatar: "PS" },
      { name: "Debayan Paul", avatar: "DP" },
      { name: "Sneha Chakraborty", avatar: "SC" },
    ],
    connectionStatus: "self",
    education: [
      {
        id: "edu-1",
        institution: "Kalyani Government Engineering College (MAKAUT)",
        degree: "Bachelor of Technology - B.Tech",
        fieldOfStudy: "Computer Science and Engineering",
        startDate: "Aug 2022",
        endDate: "Jun 2026",
        grade: "8.94 / 10.0 CGPA (Top 5% of Department)",
        activities: "Developers Community KGEC (Tech Lead), Espektro Hackathon Organizing Committee, Algorithmic Coding Guild.",
        description: "Focus on Operating Systems, Database Management Systems, Computer Networks, and Object-Oriented System Design. Consistent departmental rank holder.",
        logoColor: "bg-red-600 text-white",
      },
      {
        id: "edu-2",
        institution: "Kalyani University Experimental High School",
        degree: "Higher Secondary (Class XII - WBCHSE)",
        fieldOfStudy: "Pure Science (PCMB)",
        startDate: "2020",
        endDate: "2022",
        grade: "96.4% Aggregate (Distinction in Math & Physics)",
        activities: "Science Club President, State Math Olympiad Rank 14.",
        logoColor: "bg-slate-700 text-white",
      },
    ],
    experience: [
      {
        id: "exp-1",
        title: "Software Engineering Intern",
        company: "TechNova Cloud Solutions",
        employmentType: "Internship",
        location: "Kolkata, WB",
        locationType: "Hybrid",
        startDate: "Jun 2025",
        endDate: "Aug 2025",
        isCurrent: false,
        description: "Engineered scalable REST microservices handling 25k+ daily requests using Node.js and Redis caching. Reduced query latencies by 42% on PostgreSQL cluster. Integrated CI/CD pipelines with GitHub Actions and Docker.",
        skills: ["TypeScript", "Node.js", "PostgreSQL", "Docker", "Redis", "REST APIs"],
        companyLogoBg: "bg-blue-600 text-white",
      },
      {
        id: "exp-2",
        title: "Full-Stack Project Lead",
        company: "Developers Community KGEC (DevCom)",
        employmentType: "Campus Leadership",
        location: "KGEC Campus",
        locationType: "On-site",
        startDate: "Aug 2024",
        endDate: "Present",
        isCurrent: true,
        description: "Leading an engineering squad of 8 developers building College Nexus — the unified collegiate intranet platform for 1,800+ KGEC engineers. Designed high-performance Next.js 14 architecture with SSR caching and roll verification security.",
        skills: ["Next.js", "React", "Tailwind CSS", "Architecture Spec", "Mentorship"],
        companyLogoBg: "bg-red-600 text-white",
      },
    ],
    achievements: [
      {
        id: "post-1",
        authorId: "arjun-sen",
        authorName: "Arjun Sen",
        authorHeadline: "Full-Stack Engineer & Cloud Enthusiast | 3rd Year CSE @ KGEC",
        authorAvatar: "AS",
        authorDept: "CSE",
        authorRoll: "22/CSE/042",
        timestamp: "2 hours ago",
        category: "Hackathon",
        badgeText: "🏆 1st Runner Up — Smart India Hackathon (SIH 2025)",
        title: "Thrilled to share that our team 'Nexus Innovators' secured 1st Runner Up at SIH 2025!",
        content: "After 36 hours of non-stop coding, architectural sprints, and intense jury rounds, we built an AI-assisted telemetry and disaster-response coordination platform for rural Himalayan clinics. Huge thanks to our mentors Prof. S. Banerjee and the Developers Community KGEC for backing us!",
        tags: ["#SmartIndiaHackathon", "#SIH2025", "#KGEC", "#FullStack", "#Innovation", "#Engineering"],
        reactions: { like: 142, celebrate: 89, insightful: 24 },
        userReaction: null,
        comments: [
          {
            id: "c-1",
            authorName: "Priya Sharma",
            authorRoll: "21/CSE/007",
            authorAvatar: "PS",
            authorHeadline: "Incoming SDE @ Microsoft | President DevCom",
            content: "Phenomenal performance team! KGEC represents at national stage once again 🚀👏",
            timestamp: "1 hour ago",
            likes: 14,
          },
          {
            id: "c-2",
            authorName: "Prof. S. Banerjee",
            authorRoll: "Faculty/CSE",
            authorAvatar: "SB",
            authorHeadline: "Head of Dept, Computer Science & Engineering",
            content: "Proud moment for the entire department. Congratulations Arjun and team!",
            timestamp: "45 mins ago",
            likes: 28,
          },
        ],
        shares: 18,
      },
      {
        id: "post-2",
        authorId: "arjun-sen",
        authorName: "Arjun Sen",
        authorHeadline: "Full-Stack Engineer & Cloud Enthusiast | 3rd Year CSE @ KGEC",
        authorAvatar: "AS",
        authorDept: "CSE",
        authorRoll: "22/CSE/042",
        timestamp: "3 days ago",
        category: "Certification",
        badgeText: "📜 AWS Certified Cloud Practitioner (CLF-C02)",
        title: "Officially AWS Certified Cloud Practitioner!",
        content: "Passed with a score of 874/1000. Spent the last 3 weeks diving deep into AWS architecture, VPCs, IAM policies, and serverless architectures with Lambda and DynamoDB. Excited to implement these in our upcoming campus microservices.",
        tags: ["#AWS", "#CloudComputing", "#DevOps", "#Certification", "#ContinuousLearning"],
        reactions: { like: 98, celebrate: 44, insightful: 12 },
        userReaction: null,
        comments: [
          {
            id: "c-3",
            authorName: "Debayan Paul",
            authorRoll: "22/ECE/018",
            authorAvatar: "DP",
            authorHeadline: "Embedded Systems & IoT Enthusiast @ KGEC",
            content: "Congrats Arjun! Let's hook up our IoT sensors to AWS IoT Core soon.",
            timestamp: "2 days ago",
            likes: 6,
          },
        ],
        shares: 7,
      },
    ],
    skills: [
      { id: "s-1", name: "Next.js & React", category: "Web & Cloud", endorsements: 48, hasEndorsed: false },
      { id: "s-2", name: "TypeScript", category: "Languages & Tools", endorsements: 41, hasEndorsed: false },
      { id: "s-3", name: "Data Structures & Algorithms", category: "Core Engineering", endorsements: 53, hasEndorsed: false },
      { id: "s-4", name: "PostgreSQL & Database Design", category: "Web & Cloud", endorsements: 36, hasEndorsed: false },
      { id: "s-5", name: "Docker & Containerization", category: "Web & Cloud", endorsements: 29, hasEndorsed: false },
      { id: "s-6", name: "System Design & Microservices", category: "Core Engineering", endorsements: 33, hasEndorsed: false },
      { id: "s-7", name: "Git & GitHub Collaboration", category: "Languages & Tools", endorsements: 62, hasEndorsed: false },
    ],
    certifications: [
      {
        id: "cert-1",
        name: "AWS Certified Cloud Practitioner",
        issuingOrg: "Amazon Web Services (AWS)",
        issueDate: "Sep 2025",
        credentialId: "AWS-CCP-9482019",
        skills: ["AWS", "Cloud Architecture", "Security", "Serverless"],
      },
      {
        id: "cert-2",
        name: "Meta Front-End Developer Professional Certificate",
        issuingOrg: "Meta (Coursera)",
        issueDate: "Jan 2025",
        credentialId: "META-FED-83921",
        skills: ["React", "UI/UX", "JavaScript", "Responsive Design"],
      },
    ],
    stats: {
      profileViews: 384,
      postImpressions: 4820,
      searchAppearances: 126,
    },
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    rollNumber: "21/CSE/007",
    department: "CSE",
    batchYear: "2021 - 2025 (Final Year)",
    semester: 8,
    headline: "Incoming Software Engineer @ Microsoft | Ex-Intern @ Amazon | President @ Developers Community KGEC",
    pronouns: "She/Her",
    location: "Kalyani / Kolkata, India",
    avatarText: "PS",
    avatarBg: "from-emerald-600 to-teal-700",
    bannerGradient: "from-slate-900 via-emerald-950 to-teal-900",
    jobStatus: {
      status: "Placed",
      isOpenToWork: false,
      targetRoles: ["Software Development Engineer"],
      preferredLocations: ["Hyderabad", "Bengaluru"],
      jobTypes: ["Full-time"],
      startDate: "July 2025",
      customNote: "Accepted offer as SDE-1 at Microsoft Hyderabad. Happy to mentor KGEC juniors on DSA, interview prep & system design!",
    },
    about: "Final year Computer Science student at KGEC with hands-on experience in cloud infrastructure, large-scale distributed systems, and backend optimization. Passionate about empowering women in tech and fostering a strong competitive programming culture in campus.",
    connectionCount: 920,
    followerCount: 3100,
    mutualConnections: [
      { name: "Arjun Sen", avatar: "AS" },
      { name: "Debayan Paul", avatar: "DP" },
    ],
    connectionStatus: "connected",
    education: [
      {
        id: "edu-ps-1",
        institution: "Kalyani Government Engineering College",
        degree: "Bachelor of Technology - B.Tech",
        fieldOfStudy: "Computer Science and Engineering",
        startDate: "2021",
        endDate: "2025",
        grade: "9.32 / 10.0 CGPA (Department Gold Medalist Nominee)",
        activities: "President Developers Community KGEC, ACM ICPC Regionalist 2024.",
        logoColor: "bg-emerald-600 text-white",
      },
    ],
    experience: [
      {
        id: "exp-ps-1",
        title: "Software Development Engineer Intern",
        company: "Amazon",
        employmentType: "Internship",
        location: "Bengaluru, Karnataka",
        locationType: "On-site",
        startDate: "May 2024",
        endDate: "Jul 2024",
        isCurrent: false,
        description: "Optimized inventory forecasting pipelines processing 2M+ records daily using Java Spring Boot and AWS SQS. Earned Pre-Placement Offer (PPO recommendation).",
        skills: ["Java", "Spring Boot", "AWS SQS", "DynamoDB", "Distributed Systems"],
        companyLogoBg: "bg-amber-600 text-white",
      },
      {
        id: "exp-ps-2",
        title: "President & Technical Lead",
        company: "Developers Community KGEC",
        employmentType: "Campus Leadership",
        location: "KGEC",
        locationType: "On-site",
        startDate: "2023",
        endDate: "Present",
        isCurrent: true,
        description: "Spearheaded 14 technical bootcamps, mentored 400+ junior engineers, and organized Eastern India's premier student hackathon Espektro.",
        skills: ["Leadership", "DSA Mentorship", "System Design"],
        companyLogoBg: "bg-red-600 text-white",
      },
    ],
    achievements: [
      {
        id: "post-ps-1",
        authorId: "priya-sharma",
        authorName: "Priya Sharma",
        authorHeadline: "Incoming SDE @ Microsoft | President DevCom",
        authorAvatar: "PS",
        authorDept: "CSE",
        authorRoll: "21/CSE/007",
        timestamp: "1 week ago",
        category: "Internship",
        badgeText: "💼 Placed @ Microsoft (SDE-1)",
        title: "Beyond thrilled to announce that I will be joining Microsoft as a Software Engineer!",
        content: "Grateful to my professors at KGEC, my wonderful peers at DevCom, and everyone who conducted mock interviews with me. Looking forward to joining the Azure Cloud team in July 2025!",
        tags: ["#Microsoft", "#SDE", "#CampusPlacements", "#KGEC", "#WomenInTech"],
        reactions: { like: 412, celebrate: 285, insightful: 48 },
        userReaction: null,
        comments: [],
        shares: 42,
      },
    ],
    skills: [
      { id: "s-ps-1", name: "Java & Spring Boot", category: "Web & Cloud", endorsements: 82, hasEndorsed: true },
      { id: "s-ps-2", name: "Data Structures & Algorithms", category: "Core Engineering", endorsements: 96, hasEndorsed: true },
      { id: "s-ps-3", name: "System Design", category: "Core Engineering", endorsements: 71, hasEndorsed: false },
      { id: "s-ps-4", name: "AWS Cloud", category: "Web & Cloud", endorsements: 64, hasEndorsed: true },
    ],
    certifications: [
      {
        id: "cert-ps-1",
        name: "Oracle Certified Professional: Java SE 11 Developer",
        issuingOrg: "Oracle",
        issueDate: "2023",
        skills: ["Java", "OOP", "Concurrency"],
      },
    ],
    stats: {
      profileViews: 1240,
      postImpressions: 14200,
      searchAppearances: 540,
    },
  },
  {
    id: "debayan-paul",
    name: "Debayan Paul",
    rollNumber: "22/ECE/018",
    department: "ECE",
    batchYear: "2022 - 2026 (3rd Year)",
    semester: 6,
    headline: "Embedded Systems Developer | VLSI & IoT Enthusiast | 3rd Year ECE @ KGEC | Hardware Lab Assistant",
    pronouns: "He/Him",
    location: "Kalyani, West Bengal",
    avatarText: "DP",
    avatarBg: "from-amber-600 to-orange-700",
    bannerGradient: "from-slate-900 via-amber-950 to-orange-950",
    jobStatus: {
      status: "Actively Looking",
      isOpenToWork: true,
      targetRoles: ["Embedded Software Engineer", "VLSI Verification Intern", "IoT Firmware Engineer"],
      preferredLocations: ["Bengaluru", "Hyderabad", "Noida", "Kolkata"],
      jobTypes: ["Internship"],
      startDate: "May 2026",
      customNote: "Seeking summer 2026 internship in chip design, ARM Cortex firmware, or FPGA prototyping.",
    },
    about: "Electronics & Communication undergrad passionate about bridging hardware and low-level firmware. Experienced in Verilog HDL, STM32 microcontrollers, CAN bus telemetry, and high-frequency PCB routing in KiCad.",
    connectionCount: 312,
    followerCount: 680,
    mutualConnections: [
      { name: "Arjun Sen", avatar: "AS" },
      { name: "Sneha Chakraborty", avatar: "SC" },
    ],
    connectionStatus: "none",
    education: [
      {
        id: "edu-dp-1",
        institution: "Kalyani Government Engineering College",
        degree: "Bachelor of Technology - B.Tech",
        fieldOfStudy: "Electronics and Communication Engineering",
        startDate: "2022",
        endDate: "2026",
        grade: "8.65 / 10.0 CGPA",
        activities: "Robotics Society KGEC (Hardware Lead), Texas Instruments Innovation Challenge.",
        logoColor: "bg-amber-600 text-white",
      },
    ],
    experience: [
      {
        id: "exp-dp-1",
        title: "IoT Firmware Intern",
        company: "RoboEdge Automation",
        employmentType: "Internship",
        location: "Kolkata, WB",
        locationType: "On-site",
        startDate: "Dec 2024",
        endDate: "Jan 2025",
        isCurrent: false,
        description: "Implemented FreeRTOS tasks on ESP32 microcontrollers for industrial sensor data aggregation. Reduced packet drops by 35% using MQTT QoS 1.",
        skills: ["Embedded C", "FreeRTOS", "ESP32", "MQTT", "KiCad"],
        companyLogoBg: "bg-orange-600 text-white",
      },
    ],
    achievements: [
      {
        id: "post-dp-1",
        authorId: "debayan-paul",
        authorName: "Debayan Paul",
        authorHeadline: "Embedded Systems Developer | 3rd Year ECE @ KGEC",
        authorAvatar: "DP",
        authorDept: "ECE",
        authorRoll: "22/ECE/018",
        timestamp: "5 days ago",
        category: "Project",
        badgeText: "🚀 4-Layer High Speed PCB Prototype Deployed",
        title: "Designed and fabricated our campus autonomous rover mainboard!",
        content: "Thrilled to share that our STM32H7 dual-core flight controller PCB successfully powered up with zero trace rework! Features redundant CAN transceivers and isolated power rails.",
        tags: ["#Hardware", "#PCBDesign", "#KiCad", "#STM32", "#Robotics", "#ECE"],
        reactions: { like: 76, celebrate: 52, insightful: 31 },
        userReaction: null,
        comments: [],
        shares: 11,
      },
    ],
    skills: [
      { id: "s-dp-1", name: "Embedded C / C++", category: "Languages & Tools", endorsements: 34, hasEndorsed: false },
      { id: "s-dp-2", name: "Verilog & Digital Design", category: "Hardware & Embedded", endorsements: 29, hasEndorsed: false },
      { id: "s-dp-3", name: "KiCad PCB Layout", category: "Hardware & Embedded", endorsements: 27, hasEndorsed: false },
    ],
    certifications: [
      {
        id: "cert-dp-1",
        name: "ARM Cortex-M Architecture & RTOS Programming",
        issuingOrg: "NPTEL / IIT Madras",
        issueDate: "2024",
        skills: ["ARM Cortex", "RTOS", "Embedded Systems"],
      },
    ],
    stats: {
      profileViews: 195,
      postImpressions: 1840,
      searchAppearances: 78,
    },
  },
  {
    id: "sneha-chakraborty",
    name: "Sneha Chakraborty",
    rollNumber: "23/IT/014",
    department: "IT",
    batchYear: "2023 - 2027 (2nd Year)",
    semester: 4,
    headline: "Frontend Architect & Open Source Contributor | 2nd Year IT @ KGEC | SIH '25 Winner (Junior Category) | GSOC '26 Aspirant",
    pronouns: "She/Her",
    location: "Kalyani / Howrah, West Bengal",
    avatarText: "SC",
    avatarBg: "from-purple-600 to-pink-700",
    bannerGradient: "from-slate-900 via-purple-950 to-pink-950",
    jobStatus: {
      status: "Open to Offers",
      isOpenToWork: true,
      targetRoles: ["Frontend Developer Intern", "Open Source Fellow", "React / UI Engineer"],
      preferredLocations: ["Remote", "Bengaluru", "Kolkata"],
      jobTypes: ["Internship", "Part-time"],
      startDate: "Immediate / Summer 2026",
      customNote: "Keen to contribute to production frontend codebases, accessibility, and interactive design systems.",
    },
    about: "Second-year IT student focused on modern web engineering, SVG animations, and accessibility. Contributing to prominent open source design systems and winner of the MAKAUT Intra-University Hackathon 2024.",
    connectionCount: 245,
    followerCount: 520,
    mutualConnections: [
      { name: "Arjun Sen", avatar: "AS" },
      { name: "Priya Sharma", avatar: "PS" },
    ],
    connectionStatus: "pending",
    education: [
      {
        id: "edu-sc-1",
        institution: "Kalyani Government Engineering College",
        degree: "Bachelor of Technology - B.Tech",
        fieldOfStudy: "Information Technology",
        startDate: "2023",
        endDate: "2027",
        grade: "9.18 / 10.0 CGPA",
        activities: "Web Development Club, Women in Tech Chapter.",
        logoColor: "bg-purple-600 text-white",
      },
    ],
    experience: [
      {
        id: "exp-sc-1",
        title: "Frontend Contributor",
        company: "Open Campus Tools",
        employmentType: "Freelance",
        location: "Remote",
        locationType: "Remote",
        startDate: "Oct 2024",
        endDate: "Present",
        isCurrent: true,
        description: "Built accessible component primitives and dark-mode themes for university exam revision portals used by 5,000+ students.",
        skills: ["React", "Tailwind CSS", "Accessibility (a11y)", "Vite"],
        companyLogoBg: "bg-purple-600 text-white",
      },
    ],
    achievements: [
      {
        id: "post-sc-1",
        authorId: "sneha-chakraborty",
        authorName: "Sneha Chakraborty",
        authorHeadline: "Frontend Architect | 2nd Year IT @ KGEC",
        authorAvatar: "SC",
        authorDept: "IT",
        authorRoll: "23/IT/014",
        timestamp: "4 days ago",
        category: "Hackathon",
        badgeText: "🏆 1st Prize — MAKAUT Intra-University HackSprint",
        title: "Won 1st Place for our accessible collegiate study companion app!",
        content: "Built an offline-first PWA for campus students with low internet connectivity. Huge thanks to everyone who tested our beta build!",
        tags: ["#Frontend", "#PWA", "#React", "#HackathonWinner", "#KGEC"],
        reactions: { like: 88, celebrate: 64, insightful: 15 },
        userReaction: null,
        comments: [],
        shares: 9,
      },
    ],
    skills: [
      { id: "s-sc-1", name: "React & Next.js", category: "Web & Cloud", endorsements: 31, hasEndorsed: false },
      { id: "s-sc-2", name: "Tailwind CSS", category: "Web & Cloud", endorsements: 28, hasEndorsed: false },
      { id: "s-sc-3", name: "JavaScript / TypeScript", category: "Languages & Tools", endorsements: 25, hasEndorsed: false },
    ],
    certifications: [],
    stats: {
      profileViews: 142,
      postImpressions: 1200,
      searchAppearances: 56,
    },
  },
  {
    id: "aniket-roy",
    name: "Aniket Roy",
    rollNumber: "21/EE/029",
    department: "EE",
    batchYear: "2021 - 2025 (Final Year)",
    semester: 8,
    headline: "Smart Grid Researcher & Power Systems Engineer | Final Year EE @ KGEC | Makaut Merit Scholar | Placed @ Tata Power",
    pronouns: "He/Him",
    location: "Kalyani, WB",
    avatarText: "AR",
    avatarBg: "from-cyan-600 to-blue-800",
    bannerGradient: "from-slate-900 via-cyan-950 to-blue-950",
    jobStatus: {
      status: "Placed",
      isOpenToWork: false,
      targetRoles: ["Graduate Engineer Trainee - Power Systems"],
      preferredLocations: ["Kolkata", "Mumbai", "Jamshedpur"],
      jobTypes: ["Full-time"],
      startDate: "August 2025",
      customNote: "Placed at Tata Power. Currently completing research paper on micro-grid load optimization.",
    },
    about: "Electrical Engineering scholar interested in renewable energy integration, battery management systems, and MATLAB Simulink power modeling.",
    connectionCount: 410,
    followerCount: 950,
    mutualConnections: [
      { name: "Arjun Sen", avatar: "AS" },
      { name: "Priya Sharma", avatar: "PS" },
    ],
    connectionStatus: "received",
    education: [
      {
        id: "edu-ar-1",
        institution: "Kalyani Government Engineering College",
        degree: "Bachelor of Technology - B.Tech",
        fieldOfStudy: "Electrical Engineering",
        startDate: "2021",
        endDate: "2025",
        grade: "9.05 / 10.0 CGPA",
        activities: "IEEE Student Branch Secretary, Electrical Tech Society.",
        logoColor: "bg-cyan-600 text-white",
      },
    ],
    experience: [
      {
        id: "exp-ar-1",
        title: "Power Systems Research Intern",
        company: "WBSETCL State Load Despatch Centre",
        employmentType: "Internship",
        location: "Howrah, WB",
        locationType: "On-site",
        startDate: "Jun 2024",
        endDate: "Jul 2024",
        isCurrent: false,
        description: "Analyzed grid frequency regulation datasets across 33kV substations during peak monsoon demand.",
        skills: ["MATLAB", "Simulink", "Power Systems", "Grid Telemetry"],
        companyLogoBg: "bg-cyan-700 text-white",
      },
    ],
    achievements: [
      {
        id: "post-ar-1",
        authorId: "aniket-roy",
        authorName: "Aniket Roy",
        authorHeadline: "Smart Grid Researcher | Final Year EE @ KGEC",
        authorAvatar: "AR",
        authorDept: "EE",
        authorRoll: "21/EE/029",
        timestamp: "6 days ago",
        category: "Research",
        badgeText: "📄 Research Paper Accepted at IEEE Powercon",
        title: "Our research on AI-based inverter fault detection got accepted!",
        content: "Grateful to Dr. P. Sengupta for his relentless guidance through 8 months of simulation runs and bench testing at our KGEC Electrical Machines Lab.",
        tags: ["#IEEE", "#ResearchPaper", "#PowerSystems", "#Renewables", "#KGEC"],
        reactions: { like: 120, celebrate: 84, insightful: 41 },
        userReaction: null,
        comments: [],
        shares: 16,
      },
    ],
    skills: [
      { id: "s-ar-1", name: "MATLAB & Simulink", category: "Languages & Tools", endorsements: 44, hasEndorsed: false },
      { id: "s-ar-2", name: "Power System Analysis", category: "Core Engineering", endorsements: 39, hasEndorsed: false },
    ],
    certifications: [],
    stats: {
      profileViews: 280,
      postImpressions: 2900,
      searchAppearances: 110,
    },
  },
];

export const INITIAL_CONNECTION_REQUESTS: ConnectionRequestItem[] = [
  {
    id: "req-1",
    senderId: "aniket-roy",
    senderName: "Aniket Roy",
    senderHeadline: "Smart Grid Researcher & Power Systems Engineer | Final Year EE @ KGEC",
    senderAvatar: "AR",
    senderAvatarBg: "from-cyan-600 to-blue-800",
    senderDept: "EE",
    senderRoll: "21/EE/029",
    timestamp: "1 day ago",
    mutualCount: 14,
    note: "Hi Arjun, saw your updates on the College Nexus architecture! Would love to connect and see if we can integrate the EE department power labs.",
  },
  {
    id: "req-2",
    senderId: "debayan-paul",
    senderName: "Debayan Paul",
    senderHeadline: "Embedded Systems Developer | 3rd Year ECE @ KGEC",
    senderAvatar: "DP",
    senderAvatarBg: "from-amber-600 to-orange-700",
    senderDept: "ECE",
    senderRoll: "22/ECE/018",
    timestamp: "3 days ago",
    mutualCount: 9,
    note: "Hey Arjun! Connecting from ECE batch. Let's discuss connecting IoT devices to your Next.js telemetry dashboard.",
  },
];
