"use client";

import { useState, type FormEvent } from "react";
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
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [missingLetters, setMissingLetters] = useState(["", "", "", ""]);
  const [compartmentOpen, setCompartmentOpen] = useState(alreadySolved);
  const [feedback, setFeedback] = useState(
    alreadySolved ? "The hidden compartment stands open." : "",
  );

  function rememberClue(book: ShelfBook) {
    if (!book.goldLetter) return;
    setFoundClues((current) =>
      current.includes(book.id) ? current : [...current, book.id],
    );
    setActiveBook(null);
  }

  function submitWord(event: FormEvent) {
    event.preventDefault();
    const word = `E${missingLetters[0]}${missingLetters[1]}R${missingLetters[2]}${missingLetters[3]}T`;
    if (validateLibrariansShelf(word)) {
      setCompartmentOpen(true);
      setFeedback("A low mechanical click travels through the shelf.");
    } else {
      setFeedback("The word fades from the brass plate. Try another instruction.");
    }
  }

  return (
    <div className="shelf-puzzle">
      <div className="shelf-puzzle__workspace">
        <p className="shelf-puzzle__instruction">
          Inspect the volumes. Three gold-marked pages hold fixed letters from
          an instruction.
        </p>
        <div className={`bookcase ${compartmentOpen ? "is-open" : ""}`}>
          <div className="bookcase__books">
            {shelfBooks.map((book) => (
              <button
                key={book.id}
                className={`book book--${book.color} ${
                  book.goldLetter ? "book--marked" : ""
                } ${foundClues.includes(book.id) ? "is-pulled" : ""}`}
                onClick={() => setActiveBook(book)}
                aria-label={`Inspect ${book.title}`}
                title={book.title}
              >
                <span>{book.title}</span>
                {book.goldLetter && (
                  <i
                    className="book__gold-badge"
                    aria-label={`Gold letter ${book.goldLetter}`}
                  >
                    {book.goldLetter}
                  </i>
                )}
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
        <form className="word-completion" onSubmit={submitWord}>
          <span>
            Complete the instruction
            <small>Gold letters found: {foundClues.length}/3</small>
          </span>
          <div aria-label="Seven-letter instruction">
            <i>{foundClues.includes("history-lanterns") ? "E" : "?"}</i>
            {[0, 1].map((index) => (
              <input
                key={index}
                aria-label={`Missing letter ${index + 1} of 4`}
                maxLength={1}
                value={missingLetters[index]}
                disabled={compartmentOpen}
                onChange={(event) => {
                  const nextLetters = [...missingLetters];
                  nextLetters[index] = event.target.value.replace(/[^a-z]/gi, "").toUpperCase();
                  setMissingLetters(nextLetters);
                }}
              />
            ))}
            <i>{foundClues.includes("atlas-forgotten") ? "R" : "?"}</i>
            {[2, 3].map((index) => (
              <input
                key={index}
                aria-label={`Missing letter ${index + 1} of 4`}
                maxLength={1}
                value={missingLetters[index]}
                disabled={compartmentOpen}
                onChange={(event) => {
                  const nextLetters = [...missingLetters];
                  nextLetters[index] = event.target.value.replace(/[^a-z]/gi, "").toUpperCase();
                  setMissingLetters(nextLetters);
                }}
              />
            ))}
            <i>{foundClues.includes("keepers-ledger") ? "T" : "?"}</i>
          </div>
          {foundClues.length < 3 ? (
            <small>You may fill the blanks now. Find all three gold letters to try the completed word.</small>
          ) : (
            !compartmentOpen && <button type="submit">Try the word</button>
          )}
        </form>
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
              <button className="pull-book-button" onClick={() => rememberClue(activeBook)}>
                Remember this letter
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
