"use client";

import type { CSSProperties } from "react";

const lanternLessons = ["Context", "Questions", "Docs", "Trace", "Systems", "Signals", "Design", "Product", "Frontend", "API", "Reviews", "PRs", "1:1s", "Mentorship", "Patience", "Kindness", "Trust", "Growth", "Learning", "Handoffs", "Support", "Curiosity", "Confidence", "Teamwork", "Trails", "Pets", "Laughter", "Summer One", "Summer Two", "Enterprise", "Memories", "Lessons", "People", "Gratitude", "Care", "Heart"];

export function FinalLanternScene({ replay = false }: { replay?: boolean }) {
  return (
    <div className="reward-moment reward-moment--manuscript" role="status" aria-label={replay ? "Replaying the final lantern scene" : "The final lantern scene"}>
      <div className="project-lantern-burst" aria-hidden="true">
        {lanternLessons.map((lesson, index) => (
          <span style={{ "--card-index": index } as CSSProperties} key={lesson}><i>{String(index + 1).padStart(2, "0")}</i><b>{lesson}</b></span>
        ))}
      </div>
      <div className="retrospective-icon retrospective-icon--large" aria-hidden="true"><i /></div>
      <p>We Built It Together</p>
      <blockquote>“Five moments. Two summers. One very full heart.”</blockquote>
      <small>{replay ? "A quiet replay of the moments that made the journey." : "The lanterns are carrying the story into the Debrief Room."}</small>
    </div>
  );
}
