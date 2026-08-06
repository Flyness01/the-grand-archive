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
    author: "Senior Engineer",
    role: "teammate",
    time: "First summer · Week 7",
    color: "aubergine",
    text: "With the problem aligned, you turned experience, service, and reliability constraints into one design the whole system could support.",
    reaction: "🏗️ 5",
  },
  {
    milestone: 5,
    author: "Product Designer",
    role: "teammate",
    time: "First summer · Final sprint",
    color: "yellow",
    text: "You compared the intended experience with the build and separated meaningful defects from harmless visual differences.",
    reaction: "👀 6",
  },
  {
    milestone: 6,
    author: "Your Mentor",
    role: "mentor",
    time: "Second summer · First release",
    color: "indigo",
    text: "You moved the tested change through every release gate, deployed carefully, and remembered that shipping includes staying for the live metrics.",
    reaction: "🌱 7",
  },
  {
    milestone: 7,
    author: "You",
    role: "teammate",
    time: "Second summer · Release day",
    color: "cyan",
    text: "I stayed after the release and compared the timeline, service health, and logs. The growing worker queue turned a vague alert into a finding we could investigate.",
    reaction: "📈 5",
  },
  {
    milestone: 8,
    author: "You",
    role: "teammate",
    time: "Second summer · Incident 14",
    color: "red",
    text: "When production failed, the earlier evidence mattered. I followed the timeline backward through the dependency cascade and documented what we learned.",
    reaction: "🛠️ 5",
  },
  {
    milestone: 9,
    author: "Team Lead",
    role: "teammate",
    time: "Second summer · Final handoff",
    color: "aubergine",
    text: "You turned the incident finding into a handoff another engineer could act on. Communication did not surround the implementation; it completed it.",
    reaction: "📝 9",
  },
  {
    milestone: 10,
    author: "The Team",
    role: "everyone",
    time: "Last day",
    color: "indigo",
    text: "Ten moments now tell one story: learn the context, trace the system, align, design, test, ship, observe, recover, communicate, and share what the work meant.",
    reaction: "💜 12",
  },
];
