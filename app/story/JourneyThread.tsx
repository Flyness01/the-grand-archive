"use client";

import { journeyMessages } from "./journeyData";

export function JourneyThread({
  completedMilestones,
  onClose,
}: {
  completedMilestones: number;
  onClose: () => void;
}) {
  const visibleMessages = journeyMessages.filter(
    (message) => message.milestone <= completedMilestones,
  );

  return (
    <div className="journey-backdrop" onMouseDown={onClose}>
      <section
        className="journey-thread"
        role="dialog"
        aria-modal="true"
        aria-labelledby="journey-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="journey-thread__header">
          <div>
            <small>Team workspace</small>
            <h2 id="journey-title"># two-summers</h2>
            <p>The story behind each lesson on the Project Board.</p>
          </div>
          <button onClick={onClose} aria-label="Close field notes">×</button>
        </header>

        <div className="journey-thread__progress">
          <span style={{ width: `${Math.min(100, completedMilestones * 10)}%` }} />
          <b>{completedMilestones}/10 milestones</b>
        </div>

        <div className="journey-thread__messages">
          <div className="journey-date"><span />The thread begins with your first week<span /></div>
          {visibleMessages.map((message) => (
            <article className="journey-message" key={message.milestone}>
              <div className={`journey-avatar journey-avatar--${message.color}`}>
                {message.author.charAt(0)}
              </div>
              <div>
                <h3>
                  {message.author}
                  <span>{message.role}</span>
                  <time>{message.time}</time>
                </h3>
                <p>{message.text}</p>
                {message.reaction && <span className="journey-reaction">{message.reaction}</span>}
              </div>
            </article>
          ))}
          {completedMilestones < 10 && (
            <div className="journey-thread__next">
              <span>🔒</span>
              The next message appears when you complete another milestone.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
