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
    author: "You",
    role: "new here",
    time: "First summer · Final sprint",
    color: "red",
    text: "When production failed, the earlier system trace mattered. I followed the timeline, reversed the dependency cascade, and documented what we learned.",
    reaction: "🛠️ 5",
  },
  {
    milestone: 5,
    author: "Your Mentor",
    role: "mentor",
    time: "Second summer · First release",
    color: "indigo",
    text: "Recovery was only half the job. You turned it into a release runbook, tested in order, deployed carefully, and stayed for the live metrics.",
    reaction: "🌱 7",
  },
  {
    milestone: 6,
    author: "You",
    role: "teammate",
    time: "Second summer · Midpoint",
    color: "cyan",
    text: "I stayed after the release and compared the timeline, service health, and logs. The growing worker queue and repeated attempts turned a vague alert into a finding the team could act on.",
    reaction: "🌟 5",
  },
  {
    milestone: 7,
    author: "Team Lead",
    role: "teammate",
    time: "Second summer · Week 6",
    color: "red",
    text: "You turned the pattern into a handoff another engineer could act on. Communication was not around the implementation; it completed it.",
    reaction: "📝 4",
  },
  {
    milestone: 8,
    author: "Product Designer",
    role: "teammate",
    time: "Second summer · Week 8",
    color: "yellow",
    text: "With shared context, QA could separate harmless layout changes from defects that changed meaning, behavior, or access for users.",
    reaction: "👀 6",
  },
  {
    milestone: 9,
    author: "Senior Engineer",
    role: "teammate",
    time: "Second summer · Final sprint",
    color: "aubergine",
    text: "Those QA findings became design constraints. You aligned experience, services, and reliability into one decision the whole system could support.",
    reaction: "🚀 9",
  },
  {
    milestone: 10,
    author: "The Team",
    role: "everyone",
    time: "Last day",
    color: "indigo",
    text: "Ten moments now tell one story: learn the context, trace the system, align, recover, ship, observe, communicate, test, design, and share what the work meant.",
    reaction: "💜 12",
  },
];
