"use client";

import { useState } from "react";
import { HintPanel } from "../../game/HintPanel";
import {
  librariansShelfHints,
  shelfBooks,
  type ShelfBook,
} from "./puzzleData";
import { validateLibrariansShelf } from "./validator";

export function LibrariansShelf({
  hintCount,
  onUseHint,
  onCollectReward,
  alreadySolved,
}: {
  hintCount: number;
  onUseHint: () => void;
  onCollectReward: () => void;
  alreadySolved: boolean;
}) {
  const [activeBook, setActiveBook] = useState<ShelfBook | null>(null);
  const [sequence, setSequence] = useState<string[]>([]);
  const [compartmentOpen, setCompartmentOpen] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The hidden compartment stands open." : "",
  );

  function pullBook(book: ShelfBook) {
    if (!book.goldLetter || compartmentOpen) return;
    const next = [...sequence, book.id];
    setActiveBook(null);
    setSequence(next);
    if (next.length === 4) {
      if (validateLibrariansShelf(next)) {
        setCompartmentOpen(true);
        setFeedback("A low mechanical click travels through the shelf.");
      } else {
        setFeedback("The shelf settles back into place. The order matters.");
        window.setTimeout(() => {
          setSequence([]);
          setFeedback("");
        }, 1500);
      }
    }
  }

  return (
    <div className="shelf-puzzle">
      <div className="shelf-puzzle__workspace">
        <p className="shelf-puzzle__instruction">
          Inspect the volumes. Pull any that seem meaningful, in the order you
          believe the shelf expects.
        </p>
        <div className={`bookcase ${compartmentOpen ? "is-open" : ""}`}>
          <div className="bookcase__books">
            {shelfBooks.map((book) => (
              <button
                key={book.id}
                className={`book book--${book.color} ${
                  book.goldLetter ? "book--marked" : ""
                } ${sequence.includes(book.id) ? "is-pulled" : ""}`}
                onClick={() => setActiveBook(book)}
                aria-label={`Inspect ${book.title}`}
              >
                <span>{book.title}</span>
                {book.orderMark && <i aria-label={`Gold mark ${book.orderMark}`}>{book.orderMark}</i>}
              </button>
            ))}
          </div>
          <div className="hidden-compartment">
            <div className="feather-reward">
              <div className="feather-icon feather-icon--large" aria-hidden="true">
                <i />
              </div>
              <p>Something pale rests inside.</p>
              {!alreadySolved ? (
                <button onClick={onCollectReward}>Take the bookmark</button>
              ) : (
                <small>The compartment is empty.</small>
              )}
            </div>
          </div>
        </div>
        <div className="pull-sequence" aria-live="polite">
          <span>Books pulled</span>
          <div>
            {Array.from({ length: 4 }, (_, index) => {
              const book = shelfBooks.find((item) => item.id === sequence[index]);
              return <i key={index}>{book?.goldLetter ?? "·"}</i>;
            })}
          </div>
          {sequence.length > 0 && !compartmentOpen && (
            <button onClick={() => setSequence([])}>Reset selection</button>
          )}
        </div>
        <p className="shelf-feedback" aria-live="polite">{feedback}</p>
      </div>

      <HintPanel
        hints={librariansShelfHints}
        revealedCount={hintCount}
        onReveal={onUseHint}
      />

      {activeBook && (
        <div className="book-inspection" role="dialog" aria-modal="true" aria-label={activeBook.title}>
          <div className="book-inspection__page">
            <button onClick={() => setActiveBook(null)} aria-label="Close book">×</button>
            <p className="book-inspection__folio">{activeBook.orderMark ? `Gold folio ${activeBook.orderMark}` : "Archive folio"}</p>
            <h3>{activeBook.title}</h3>
            <p>{activeBook.passage}</p>
            {activeBook.highlightedLine && (
              <blockquote>{activeBook.highlightedLine}</blockquote>
            )}
            {activeBook.goldLetter && (
              <div className="gold-letter" aria-label={`Embossed gold letter ${activeBook.goldLetter}`}>
                {activeBook.goldLetter}
              </div>
            )}
            {activeBook.goldLetter ? (
              <button className="pull-book-button" onClick={() => pullBook(activeBook)}>
                Pull this book
              </button>
            ) : (
              <button className="pull-book-button" onClick={() => setActiveBook(null)}>
                Return book
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
