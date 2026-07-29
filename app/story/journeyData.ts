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
    time: "Week 1 · Monday",
    color: "aubergine",
    text: "Welcome to the team. You are not here because you already know everything. You are here because we believe you can learn what comes next.",
    reaction: "👋 8",
  },
  {
    milestone: 1,
    author: "You",
    role: "new here",
    time: "Week 1 · Thursday",
    color: "cyan",
    text: "I asked my first real question today. It felt small, but it unlocked the context I had been missing.",
    reaction: "💡 4",
  },
  {
    milestone: 2,
    author: "Senior Engineer",
    role: "teammate",
    time: "Week 2",
    color: "indigo",
    text: "Good engineers do not just find a route that works. They learn why the team chose that route—and document it for whoever follows.",
    reaction: "🧭 3",
  },
  {
    milestone: 3,
    author: "Product Designer",
    role: "teammate",
    time: "Week 3",
    color: "yellow",
    text: "You connected pieces from design and engineering that looked unrelated. That is the moment the work started becoming yours.",
    reaction: "✨ 6",
  },
  {
    milestone: 4,
    author: "You",
    role: "new here",
    time: "Week 4",
    color: "red",
    text: "My first bug was not one broken thing. It was a sequence of assumptions. I slowed down, traced the system, and fixed the cause.",
    reaction: "🛠️ 5",
  },
  {
    milestone: 5,
    author: "Your Mentor",
    role: "mentor",
    time: "Midpoint",
    color: "indigo",
    text: "You are doing more than completing tickets now. You are noticing what the work needs before someone tells you.",
    reaction: "🌱 7",
  },
  {
    milestone: 6,
    author: "You",
    role: "teammate",
    time: "Week 6",
    color: "cyan",
    text: "I presented an idea before I was completely certain. The questions did not expose me—they made the idea better.",
    reaction: "🌟 5",
  },
  {
    milestone: 7,
    author: "Team Lead",
    role: "teammate",
    time: "Week 7",
    color: "red",
    text: "Your update was clear, honest, and useful. Communication is not the thing around the work. It is part of the work.",
    reaction: "📝 4",
  },
  {
    milestone: 8,
    author: "Product Designer",
    role: "teammate",
    time: "Week 8",
    color: "yellow",
    text: "You caught the difference between what we intended and what a user would actually experience. Keep protecting that perspective.",
    reaction: "👀 6",
  },
  {
    milestone: 9,
    author: "Senior Engineer",
    role: "teammate",
    time: "Final sprint",
    color: "aubergine",
    text: "The pieces align. Your work is ready to ship—not because it is untouched, but because you listened, revised, tested, and owned it.",
    reaction: "🚀 9",
  },
  {
    milestone: 10,
    author: "The Team",
    role: "everyone",
    time: "Last day",
    color: "indigo",
    text: "You arrived as the newest person in the channel. You leave as someone whose questions, ideas, and care changed the work. Thank you for building with us.",
    reaction: "💜 12",
  },
];
