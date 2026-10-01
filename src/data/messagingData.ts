import { StudentProfile, INITIAL_PROFILES } from "./profileData";

export interface MessageAttachment {
  id: string;
  type: "pyq" | "code" | "collab" | "file" | "voice";
  title: string;
  subtitle?: string;
  fileSize?: string;
  codeSnippet?: string;
  codeLang?: string;
  actionText?: string;
  badge?: string;
}

export interface DirectMessage {
  id: string;
  senderId: string; // "arjun-sen" or peer id
  senderName: string;
  senderAvatar: string;
  senderAvatarBg: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  isCode?: boolean;
  codeLanguage?: string;
  isVoiceNote?: boolean;
  voiceDuration?: string;
  attachments?: MessageAttachment[];
  reactions?: { emoji: string; count: number; reactedByMe?: boolean }[];
}

export interface Conversation {
  id: string;
  peerId: string;
  peer: StudentProfile;
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
  groupMembersCount?: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  subnetLocation: string; // e.g. "DevCom Lab (Room 304)", "Library 2nd Floor", "Hostel 3 Subnet"
  isPinned?: boolean;
  tags: ("mentors" | "hackathons" | "projects" | "batch" | "starred" | "classmates")[];
  messages: DirectMessage[];
}

export const INITIAL_CONVERSATIONS: Conversation[] = process.env.NEXT_PUBLIC_USE_DEMO_DATA === "true" ? [
  {
    id: "conv-priya-sharma",
    peerId: "priya-sharma",
    peer: INITIAL_PROFILES.find((p) => p.id === "priya-sharma") || INITIAL_PROFILES[1],
    lastMessage: "I've uploaded the Azure Microservices architecture notes for our SIH prep. Take a look!",
    lastMessageTime: "10:42 AM",
    unreadCount: 2,
    isOnline: true,
    subnetLocation: "DevCom Innovation Lab (CS-302)",
    isPinned: true,
    tags: ["mentors", "hackathons", "starred"],
    messages: [
      {
        id: "msg-p1",
        senderId: "priya-sharma",
        senderName: "Priya Sharma",
        senderAvatar: "PS",
        senderAvatarBg: "from-emerald-600 to-teal-700",
        text: "Hey Arjun! Huge congratulations on the Smart India Hackathon finalist presentation yesterday! The telemetry pipeline was super slick 🔥",
        timestamp: "Yesterday, 4:15 PM",
        status: "read",
        reactions: [{ emoji: "❤️", count: 2, reactedByMe: true }],
      },
      {
        id: "msg-p2",
        senderId: "arjun-sen",
        senderName: "Arjun Sen",
        senderAvatar: "AS",
        senderAvatarBg: "from-blue-600 to-indigo-700",
        text: "Thank you so much Priya! Your mock interview on distributed state replication helped us handle the jury's grilling on edge cache synchronization.",
        timestamp: "Yesterday, 4:22 PM",
        status: "read",
      },
      {
        id: "msg-p3",
        senderId: "priya-sharma",
        senderName: "Priya Sharma",
        senderAvatar: "PS",
        senderAvatarBg: "from-emerald-600 to-teal-700",
        text: "Glad it paid off! By the way, are you guys planning to integrate the MAKAUT campus past exam papers into the College Nexus database this weekend?",
        timestamp: "10:30 AM",
        status: "read",
      },
      {
        id: "msg-p4",
        senderId: "arjun-sen",
        senderName: "Arjun Sen",
        senderAvatar: "AS",
        senderAvatarBg: "from-blue-600 to-indigo-700",
        text: "Yes! We just indexed CS501, CS602 and the 2024 operating systems end-sem papers. Pushing the schema migrations today.",
        timestamp: "10:35 AM",
        status: "read",
      },
      {
        id: "msg-p5",
        senderId: "priya-sharma",
        senderName: "Priya Sharma",
        senderAvatar: "PS",
        senderAvatarBg: "from-emerald-600 to-teal-700",
        text: "Awesome! I've uploaded the Azure Microservices architecture notes and interview cheatsheets for our SIH prep. Take a look!",
        timestamp: "10:42 AM",
        status: "read",
        attachments: [
          {
            id: "att-p1",
            type: "pyq",
            title: "Azure_Cloud_Microservices_Interview_Prep.pdf",
            subtitle: "Curated for SDE-1 & SIH Mentorship • 4.8 MB",
            fileSize: "4.8 MB",
            actionText: "Download PDF",
            badge: "VERIFIED MENTOR",
          },
        ],
        reactions: [{ emoji: "🚀", count: 3, reactedByMe: false }],
      },
    ],
  },
  {
    id: "conv-debayan-paul",
    peerId: "debayan-paul",
    peer: INITIAL_PROFILES.find((p) => p.id === "debayan-paul") || INITIAL_PROFILES[2],
    lastMessage: "Here is the CAN bus telemetry parser snippet for the STM32H7 flight controller.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isOnline: true,
    subnetLocation: "ECE Embedded Hardware Lab (EC-104)",
    isPinned: true,
    tags: ["projects", "hackathons"],
    messages: [
      {
        id: "msg-d1",
        senderId: "debayan-paul",
        senderName: "Debayan Paul",
        senderAvatar: "DP",
        senderAvatarBg: "from-amber-600 to-orange-700",
        text: "Arjun, we tested the 4-layer rover PCB in the robotics workshop today. Power rails are clean at 3.3V and 5V isolated!",
        timestamp: "Yesterday, 2:10 PM",
        status: "read",
        reactions: [{ emoji: "🙌", count: 2, reactedByMe: true }],
      },
      {
        id: "msg-d2",
        senderId: "arjun-sen",
        senderName: "Arjun Sen",
        senderAvatar: "AS",
        senderAvatarBg: "from-blue-600 to-indigo-700",
        text: "That is huge news! Can we pipe the telemetry stream over WebSocket into our College Nexus live dashboard?",
        timestamp: "Yesterday, 2:15 PM",
        status: "read",
      },
      {
        id: "msg-d3",
        senderId: "debayan-paul",
        senderName: "Debayan Paul",
        senderAvatar: "DP",
        senderAvatarBg: "from-amber-600 to-orange-700",
        text: "Here is the CAN bus telemetry parser snippet for the STM32H7 flight controller. Plug this into your Node.js gateway:",
        timestamp: "Yesterday, 2:20 PM",
        status: "read",
        isCode: true,
        codeLanguage: "typescript",
        attachments: [
          {
            id: "att-d1",
            type: "code",
            title: "canTelemetryGateway.ts",
            subtitle: "STM32 CAN-to-WebSocket Frame Parser • 64 lines",
            codeLang: "typescript",
            codeSnippet: `// KGEC Rover Telemetry Stream Protocol
export function parseCanFrame(buffer: Buffer): TelemetryPayload {
  const frameId = buffer.readUInt16LE(0);
  const velocity = buffer.readFloatLE(2);
  const batteryVoltage = buffer.readFloatLE(6);
  const cpuTemp = buffer.readInt8(10);
  
  return { frameId, velocity, batteryVoltage, cpuTemp, timestamp: Date.now() };
}`,
            actionText: "Copy Code",
            badge: "ECE LAB CODE",
          },
        ],
      },
    ],
  },
  {
    id: "conv-sneha-chakraborty",
    peerId: "sneha-chakraborty",
    peer: INITIAL_PROFILES.find((p) => p.id === "sneha-chakraborty") || INITIAL_PROFILES[3],
    lastMessage: "Sent you a quick voice note explaining the responsive drawer animations.",
    lastMessageTime: "2 days ago",
    unreadCount: 1,
    isOnline: false,
    subnetLocation: "Kalyani Central Library Subnet",
    tags: ["batch", "projects"],
    messages: [
      {
        id: "msg-s1",
        senderId: "sneha-chakraborty",
        senderName: "Sneha Chakraborty",
        senderAvatar: "SC",
        senderAvatarBg: "from-purple-600 to-pink-700",
        text: "Hi Arjun! Loved the UI design in the College Nexus profile hub. The serif headings with modern dot-grid looks so aesthetic ✨",
        timestamp: "2 days ago, 11:15 AM",
        status: "read",
      },
      {
        id: "msg-s2",
        senderId: "arjun-sen",
        senderName: "Arjun Sen",
        senderAvatar: "AS",
        senderAvatarBg: "from-blue-600 to-indigo-700",
        text: "Thanks Sneha! Would love your help tweaking the mobile drawer interactions. You won 1st at Makaut HackSprint for accessibility right?",
        timestamp: "2 days ago, 11:24 AM",
        status: "read",
      },
      {
        id: "msg-s3",
        senderId: "sneha-chakraborty",
        senderName: "Sneha Chakraborty",
        senderAvatar: "SC",
        senderAvatarBg: "from-purple-600 to-pink-700",
        text: "Sent you a quick voice note explaining the responsive drawer animations and tactile haptics:",
        timestamp: "2 days ago, 11:35 AM",
        status: "read",
        isVoiceNote: true,
        voiceDuration: "0:42",
        attachments: [
          {
            id: "att-s1",
            type: "voice",
            title: "Voice Note: Drawer UX & A11y Guidelines.m4a",
            subtitle: "Recorded on Campus Subnet • 42 seconds",
            fileSize: "680 KB",
            actionText: "Play Voice Note",
            badge: "VOICE NOTE",
          },
        ],
      },
    ],
  },
  {
    id: "conv-aniket-roy",
    peerId: "aniket-roy",
    peer: INITIAL_PROFILES.find((p) => p.id === "aniket-roy") || INITIAL_PROFILES[4],
    lastMessage: "Would love to invite your team to collaborate on our IEEE micro-grid telemetry paper.",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
    isOnline: false,
    subnetLocation: "Electrical Machines Research Wing",
    tags: ["mentors", "projects"],
    messages: [
      {
        id: "msg-a1",
        senderId: "aniket-roy",
        senderName: "Aniket Roy",
        senderAvatar: "AR",
        senderAvatarBg: "from-cyan-600 to-blue-800",
        text: "Hey Arjun! Connecting from the Electrical Engineering department. Saw your updates on the campus intranet architecture.",
        timestamp: "3 days ago, 3:30 PM",
        status: "read",
      },
      {
        id: "msg-a2",
        senderId: "aniket-roy",
        senderName: "Aniket Roy",
        senderAvatar: "AR",
        senderAvatarBg: "from-cyan-600 to-blue-800",
        text: "Would love to invite your team to collaborate on our IEEE micro-grid telemetry paper. We need someone strong in cloud dashboards.",
        timestamp: "3 days ago, 3:35 PM",
        status: "read",
        attachments: [
          {
            id: "att-a1",
            type: "collab",
            title: "Research Project Collaboration: IEEE Powercon 2026",
            subtitle: "Role: Cloud & Telemetry Lead • KGEC EE + CSE Joint Effort",
            actionText: "Accept & Join Project",
            badge: "RESEARCH COLLAB",
          },
        ],
      },
    ],
  },
  {
    id: "conv-devcom-core",
    peerId: "group-devcom",
    isGroup: true,
    groupName: "Developers Community KGEC (Core)",
    groupAvatar: "結",
    groupMembersCount: 14,
    peer: {
      ...INITIAL_PROFILES[0],
      id: "group-devcom",
      name: "Developers Community KGEC (Core)",
      department: "CSE",
      headline: "Official DevCom Engineering Squad • 14 Active Contributors",
      location: "KGEC Campus, DevCom Lab CS-304",
      avatarText: "結",
      avatarBg: "from-red-600 to-red-800",
      rollNumber: "SQUAD/DEVCOM/01",
    },
    lastMessage: "Priya: Next sprint meeting scheduled for 5:30 PM at the DevCom lab. See you all there!",
    lastMessageTime: "Just now",
    unreadCount: 0,
    isOnline: true,
    subnetLocation: "Intranet Subnet Core 10.14.0.1",
    isPinned: true,
    tags: ["hackathons", "projects", "batch", "starred"],
    messages: [
      {
        id: "msg-g1",
        senderId: "priya-sharma",
        senderName: "Priya Sharma",
        senderAvatar: "PS",
        senderAvatarBg: "from-emerald-600 to-teal-700",
        text: "Team! The traffic for College Nexus exam vault hit 1,200 concurrent student downloads this morning during mid-sems! 🚀",
        timestamp: "11:00 AM",
        status: "read",
        reactions: [{ emoji: "🔥", count: 6, reactedByMe: true }],
      },
      {
        id: "msg-g2",
        senderId: "debayan-paul",
        senderName: "Debayan Paul",
        senderAvatar: "DP",
        senderAvatarBg: "from-amber-600 to-orange-700",
        text: "The server CPU usage is sitting comfortably at 18%. Redis cache hit ratio is above 94%.",
        timestamp: "11:05 AM",
        status: "read",
      },
      {
        id: "msg-g3",
        senderId: "arjun-sen",
        senderName: "Arjun Sen",
        senderAvatar: "AS",
        senderAvatarBg: "from-blue-600 to-indigo-700",
        text: "Pushed the updated student network profiles and direct messaging subsystem. Testing real-time message routing now!",
        timestamp: "11:12 AM",
        status: "read",
      },
      {
        id: "msg-g4",
        senderId: "priya-sharma",
        senderName: "Priya Sharma",
        senderAvatar: "PS",
        senderAvatarBg: "from-emerald-600 to-teal-700",
        text: "Next sprint meeting scheduled for 5:30 PM at the DevCom lab. See you all there!",
        timestamp: "Just now",
        status: "read",
      },
    ],
  },
] : [];

// Helper to generate dynamic responses per student
export const PEER_SMART_RESPONSES: Record<string, string[]> = {
  "priya-sharma": [
    "That sounds great, Arjun! Let's connect at the DevCom lab after 5th period.",
    "I just checked the PR for the College Nexus schema. Looks super clean and well typed!",
    "Definitely! Let's do a 20-minute mock interview on distributed databases this Thursday.",
    "Make sure to keep the latency under 100ms for campus subnet requests. Proud of your progress!",
  ],
  "debayan-paul": [
    "Got it! I will flash the new firmware build onto the STM32 board and test the CAN transceiver.",
    "Can you share the WebSocket payload format? I will adapt the FreeRTOS C++ serial bridge.",
    "Awesome! Let's hook it up to the campus intranet antenna tomorrow morning.",
    "The 3.3V logic line is steady. We can test live rover motor telemetry during lunch break!",
  ],
  "sneha-chakraborty": [
    "I love that layout idea! I'll test it across mobile screens and check high-contrast readability.",
    "Tailwind classes look super crisp. I'm adding micro-animations for message delivery checkmarks!",
    "Great catch on accessibility! I've updated the ARIA attributes on the message search drawer.",
  ],
  "aniket-roy": [
    "Thanks for the prompt response! Dr. Sengupta approved our joint project proposal with CSE.",
    "Let me send over the 33kV substation load telemetry datasets from our MATLAB simulation run.",
    "Sounds like a plan! Let's meet at the Electrical Machines lab after tomorrow's lab class.",
  ],
  "group-devcom": [
    "Arjun: Understood! Syncing local repository now.",
    "DevCom Bot: Deployment webhook triggered successfully on KGEC Intranet node-01.",
    "Priya: Great work everyone, keep pushing forward!",
  ],
};
