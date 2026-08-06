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
    author: "Your Mentor",
    role: "mentor",
    time: "First summer · Week 1",
    color: "aubergine",
    text: "Welcome to Enterprise. Start with the docs, ask questions, and give yourself time to understand the system. Nobody expects you to know it all on day one.",
    reaction: "👋 8",
  },
  {
    milestone: 1,
    author: "You",
    role: "new here",
    time: "First summer · Week 2",
    color: "cyan",
    text: "The docs gave me my first foothold. Slowing down to read what the team had already learned made the codebase feel possible.",
    reaction: "💡 4",
  },
  {
    milestone: 2,
    author: "Senior Engineer",
    role: "teammate",
    time: "First summer · Week 3",
    color: "indigo",
    text: "Now trace one request from the interface to production. A route that works is useful; a route you understand and can explain is reusable.",
    reaction: "🧭 3",
  },
  {
    milestone: 3,
    author: "Product Designer",
    role: "teammate",
    time: "First summer · Week 5",
    color: "yellow",
    text: "You brought Design, Product, Frontend, and API into one decision. The work moved because everyone could finally describe the same outcome.",
    reaction: "✨ 6",
  },
  {
    milestone: 4,
    author: "Team Lead",
    role: "teammate",
    time: "Second summer · Handoff",
    color: "aubergine",
    text: "You found the rule hidden in the message and turned it into a handoff someone else could understand. Communication did not surround the work; it completed it.",
    reaction: "📝 9",
  },
  {
    milestone: 5,
    author: "The Team",
    role: "everyone",
    time: "Last day",
    color: "indigo",
    text: "Five moments now tell one story: understand, trace, align, communicate, and remember that we built it together.",
    reaction: "💜 12",
  },
];
