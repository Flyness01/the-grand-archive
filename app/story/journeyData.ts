export type JourneyMessage = {
  milestone: number;
  author: string;
  role: string;
  time: string;
  color: string;
  text: string;
  reaction?: string;
};

export const journeyMessages: JourneyMessage[] = [
  {
    milestone: 0,
    author: "Your Recruiter",
    role: "recruiter",
    time: "Before the first summer",
    color: "cyan",
    text: "Welcome to Enterprise. We’re excited to have you here, and there are people ready to help whenever you need them.",
    reaction: "🎉 6",
  },
  {
    milestone: 0,
    author: "Your Manager",
    role: "manager",
    time: "First summer · Day 1",
    color: "indigo",
    text: "Take time to learn how the team works, ask questions, and build understanding.",
    reaction: "🌱 4",
  },
  {
    milestone: 0,
    author: "Your Mentor",
    role: "mentor",
    time: "First summer · Week 1",
    color: "aubergine",
    text: "Start with the docs, then we’ll trace the system together. Give yourself time; unfamiliar code becomes manageable one piece at a time.",
    reaction: "👋 8",
  },
  {
    milestone: 1,
    author: "Flyness",
    role: "reflection",
    time: "First summer · Week 2",
    color: "cyan",
    text: "I learned that joining an unfamiliar codebase begins with slowing down, reading, and asking better questions.",
    reaction: "💡 4",
  },
  {
    milestone: 2,
    author: "Flyness",
    role: "reflection",
    time: "First summer · Week 3",
    color: "indigo",
    text: "Tracing one request taught me that getting something to work is different from understanding why it works.",
    reaction: "🧭 3",
  },
  {
    milestone: 3,
    author: "Flyness",
    role: "reflection",
    time: "First summer · Week 5",
    color: "yellow",
    text: "I learned that engineering decisions become useful only when Design, Product, Frontend, and API understand the same outcome.",
    reaction: "✨ 6",
  },
  {
    milestone: 4,
    author: "Flyness",
    role: "reflection",
    time: "Second summer · Returning",
    color: "aubergine",
    text: "By my second summer, I had learned that finishing the work also meant explaining it clearly enough for someone else to carry it forward.",
    reaction: "📝 9",
  },
  {
    milestone: 5,
    author: "Flyness",
    role: "to the team",
    time: "Last day",
    color: "indigo",
    text: "Looking back, the most important lessons were not only technical. They came from reviews, conversations, patient explanations, and people who made room for me to grow.",
    reaction: "💜 12",
  },
];
